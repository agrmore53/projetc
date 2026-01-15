'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Wallet, Copy, Check } from 'lucide-react'

interface MesFluxo {
  mes: string
  receitasOperacionais: number
  outrasReceitas: number
  custoFixo: number
  custoVariavel: number
  investimentos: number
  emprestimos: number
}

export default function FluxoCaixaPage() {
  const [copied, setCopied] = useState(false)
  const [saldoInicial, setSaldoInicial] = useState(50000)

  const [meses, setMeses] = useState<MesFluxo[]>([
    { mes: 'Janeiro', receitasOperacionais: 80000, outrasReceitas: 5000, custoFixo: 25000, custoVariavel: 30000, investimentos: 10000, emprestimos: 0 },
    { mes: 'Fevereiro', receitasOperacionais: 85000, outrasReceitas: 3000, custoFixo: 25000, custoVariavel: 32000, investimentos: 5000, emprestimos: 0 },
    { mes: 'Marco', receitasOperacionais: 90000, outrasReceitas: 4000, custoFixo: 25000, custoVariavel: 35000, investimentos: 8000, emprestimos: 0 },
    { mes: 'Abril', receitasOperacionais: 95000, outrasReceitas: 2000, custoFixo: 26000, custoVariavel: 38000, investimentos: 5000, emprestimos: 0 },
    { mes: 'Maio', receitasOperacionais: 100000, outrasReceitas: 5000, custoFixo: 26000, custoVariavel: 40000, investimentos: 10000, emprestimos: 0 },
    { mes: 'Junho', receitasOperacionais: 105000, outrasReceitas: 3000, custoFixo: 27000, custoVariavel: 42000, investimentos: 5000, emprestimos: 0 },
  ])

  const atualizarMes = (index: number, campo: keyof MesFluxo, valor: number) => {
    setMeses(meses.map((m, i) => i === index ? { ...m, [campo]: valor } : m))
  }

  const calcularFluxo = (mes: MesFluxo) => {
    const entradas = mes.receitasOperacionais + mes.outrasReceitas
    const saidas = mes.custoFixo + mes.custoVariavel + mes.investimentos + mes.emprestimos
    return entradas - saidas
  }

  const calcularSaldoAcumulado = (index: number) => {
    let saldo = saldoInicial
    for (let i = 0; i <= index; i++) {
      saldo += calcularFluxo(meses[i])
    }
    return saldo
  }

  const totalEntradas = meses.reduce((sum, m) => sum + m.receitasOperacionais + m.outrasReceitas, 0)
  const totalSaidas = meses.reduce((sum, m) => sum + m.custoFixo + m.custoVariavel + m.investimentos + m.emprestimos, 0)
  const fluxoTotal = totalEntradas - totalSaidas
  const saldoFinal = saldoInicial + fluxoTotal

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
PROJECAO DE FLUXO DE CAIXA
═══════════════════════════════════════════════════════════════

Saldo Inicial: ${formatarMoeda(saldoInicial)}

FLUXO MENSAL
─────────────────────────────────────────────────────────────
${meses.map((m, i) => {
  const entradas = m.receitasOperacionais + m.outrasReceitas
  const saidas = m.custoFixo + m.custoVariavel + m.investimentos + m.emprestimos
  const fluxo = entradas - saidas
  const saldo = calcularSaldoAcumulado(i)
  return `${m.mes}:
  Entradas: ${formatarMoeda(entradas)}
  Saidas: ${formatarMoeda(saidas)}
  Fluxo: ${formatarMoeda(fluxo)}
  Saldo Acumulado: ${formatarMoeda(saldo)}`
}).join('\n\n')}

CONSOLIDADO
─────────────────────────────────────────────────────────────
Total Entradas: ${formatarMoeda(totalEntradas)}
Total Saidas: ${formatarMoeda(totalSaidas)}
Fluxo Liquido: ${formatarMoeda(fluxoTotal)}
Saldo Final: ${formatarMoeda(saldoFinal)}

ANALISE
─────────────────────────────────────────────────────────────
${meses.filter((_, i) => calcularSaldoAcumulado(i) < 0).length > 0
  ? `⚠️ ALERTA: Saldo negativo previsto em: ${meses.filter((_, i) => calcularSaldoAcumulado(i) < 0).map(m => m.mes).join(', ')}`
  : '✓ Fluxo de caixa saudavel - sem previsao de saldo negativo'}

Media mensal de entradas: ${formatarMoeda(totalEntradas / meses.length)}
Media mensal de saidas: ${formatarMoeda(totalSaidas / meses.length)}
Margem de seguranca: ${((saldoFinal / (totalSaidas / meses.length)) || 0).toFixed(1)} meses

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarRelatorio = () => {
    navigator.clipboard.writeText(gerarRelatorio())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Projecao <span className="gold-text">Fluxo de Caixa</span>
          </h1>
          <p className="text-[var(--gray)]">Planeje suas entradas e saidas</p>
        </div>

        {/* Saldo Inicial */}
        <div className="glass card mb-6">
          <div className="flex items-center gap-4">
            <label className="input-label mb-0">Saldo Inicial:</label>
            <input
              type="number"
              value={saldoInicial}
              onChange={(e) => setSaldoInicial(Number(e.target.value))}
              className="input-field w-48"
            />
          </div>
        </div>

        {/* Tabela de Fluxo */}
        <div className="glass card mb-8 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-[var(--gray)]">Mes</th>
                <th className="text-right p-3 text-green-400">Receitas Op.</th>
                <th className="text-right p-3 text-green-400">Outras Rec.</th>
                <th className="text-right p-3 text-red-400">Custo Fixo</th>
                <th className="text-right p-3 text-red-400">Custo Var.</th>
                <th className="text-right p-3 text-red-400">Investimentos</th>
                <th className="text-right p-3 text-[var(--gold)]">Fluxo</th>
                <th className="text-right p-3 text-[var(--gold)]">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {meses.map((mes, index) => {
                const fluxo = calcularFluxo(mes)
                const saldo = calcularSaldoAcumulado(index)
                return (
                  <tr key={mes.mes} className="border-b border-white/5">
                    <td className="p-2 font-medium">{mes.mes}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={mes.receitasOperacionais}
                        onChange={(e) => atualizarMes(index, 'receitasOperacionais', Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 text-right text-green-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={mes.outrasReceitas}
                        onChange={(e) => atualizarMes(index, 'outrasReceitas', Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 text-right text-green-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={mes.custoFixo}
                        onChange={(e) => atualizarMes(index, 'custoFixo', Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 text-right text-red-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={mes.custoVariavel}
                        onChange={(e) => atualizarMes(index, 'custoVariavel', Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 text-right text-red-400"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={mes.investimentos}
                        onChange={(e) => atualizarMes(index, 'investimentos', Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 text-right text-red-400"
                      />
                    </td>
                    <td className={`p-2 text-right font-display ${fluxo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatarMoeda(fluxo)}
                    </td>
                    <td className={`p-2 text-right font-display ${saldo >= 0 ? 'text-[var(--gold)]' : 'text-red-400'}`}>
                      {formatarMoeda(saldo)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Resumo */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Entradas</p>
            <p className="font-display text-xl text-green-400">{formatarMoeda(totalEntradas)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Saidas</p>
            <p className="font-display text-xl text-red-400">{formatarMoeda(totalSaidas)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Fluxo Liquido</p>
            <p className={`font-display text-xl ${fluxoTotal >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatarMoeda(fluxoTotal)}
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Saldo Final</p>
            <p className={`font-display text-xl ${saldoFinal >= 0 ? 'text-[var(--gold)]' : 'text-red-400'}`}>
              {formatarMoeda(saldoFinal)}
            </p>
          </div>
        </div>

        {/* Alerta */}
        {meses.some((_, i) => calcularSaldoAcumulado(i) < 0) && (
          <div className="glass card mb-8 border border-red-500/50 bg-red-500/10">
            <p className="text-red-400 font-semibold">⚠️ Atencao: Saldo negativo previsto</p>
            <p className="text-sm text-[var(--gray)] mt-2">
              Meses com saldo negativo: {meses.filter((_, i) => calcularSaldoAcumulado(i) < 0).map(m => m.mes).join(', ')}
            </p>
          </div>
        )}

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Projecao'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Gestao de Fluxo de Caixa</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Reserva de Emergencia</h4>
              <ul className="space-y-1">
                <li>• Minimo 3-6 meses de custos</li>
                <li>• Considere sazonalidade</li>
                <li>• Revise mensalmente</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Otimizacao</h4>
              <ul className="space-y-1">
                <li>• Antecipe recebiveis</li>
                <li>• Negocie prazos com fornecedores</li>
                <li>• Evite compras a vista</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Sinais de Alerta</h4>
              <ul className="space-y-1">
                <li>• Saldo negativo previsto</li>
                <li>• Dependencia de emprestimos</li>
                <li>• Custos fixos maiores que 60% receita</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
