'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, PiggyBank, Copy, Check } from 'lucide-react'

interface LinhaOrcamento {
  id: string
  categoria: string
  descricao: string
  jan: number
  fev: number
  mar: number
  abr: number
  mai: number
  jun: number
  jul: number
  ago: number
  set: number
  out: number
  nov: number
  dez: number
}

export default function OrcamentoAnualPage() {
  const [copied, setCopied] = useState(false)
  const [ano, setAno] = useState(new Date().getFullYear())

  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'] as const

  const [linhas, setLinhas] = useState<LinhaOrcamento[]>([
    { id: '1', categoria: 'Receita', descricao: 'Vendas', jan: 50000, fev: 55000, mar: 60000, abr: 58000, mai: 62000, jun: 65000, jul: 68000, ago: 70000, set: 72000, out: 75000, nov: 80000, dez: 90000 },
    { id: '2', categoria: 'Receita', descricao: 'Servicos', jan: 10000, fev: 12000, mar: 11000, abr: 13000, mai: 14000, jun: 15000, jul: 16000, ago: 15000, set: 17000, out: 18000, nov: 20000, dez: 22000 },
    { id: '3', categoria: 'Custo', descricao: 'CMV', jan: 20000, fev: 22000, mar: 24000, abr: 23000, mai: 25000, jun: 26000, jul: 27000, ago: 28000, set: 29000, out: 30000, nov: 32000, dez: 36000 },
    { id: '4', categoria: 'Despesa', descricao: 'Folha de Pagamento', jan: 15000, fev: 15000, mar: 15000, abr: 16000, mai: 16000, jun: 16000, jul: 17000, ago: 17000, set: 17000, out: 18000, nov: 18000, dez: 18000 },
    { id: '5', categoria: 'Despesa', descricao: 'Marketing', jan: 5000, fev: 6000, mar: 7000, abr: 6000, mai: 8000, jun: 9000, jul: 10000, ago: 10000, set: 11000, out: 12000, nov: 15000, dez: 18000 },
    { id: '6', categoria: 'Despesa', descricao: 'Infraestrutura', jan: 3000, fev: 3000, mar: 3000, abr: 3000, mai: 3000, jun: 3500, jul: 3500, ago: 3500, set: 3500, out: 4000, nov: 4000, dez: 4000 },
  ])

  const categorias = ['Receita', 'Custo', 'Despesa', 'Investimento']

  const adicionarLinha = () => {
    setLinhas([...linhas, {
      id: Date.now().toString(),
      categoria: 'Despesa',
      descricao: '',
      jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0,
      jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
    }])
  }

  const removerLinha = (id: string) => {
    if (linhas.length > 1) {
      setLinhas(linhas.filter(l => l.id !== id))
    }
  }

  const atualizarLinha = (id: string, campo: keyof LinhaOrcamento, valor: string | number) => {
    setLinhas(linhas.map(l => l.id === id ? { ...l, [campo]: valor } : l))
  }

  const calcularTotalMes = (mes: typeof meses[number], categoria?: string) => {
    return linhas
      .filter(l => !categoria || l.categoria === categoria)
      .reduce((sum, l) => {
        const valor = l[mes]
        if (l.categoria === 'Receita') return sum + valor
        return sum - valor
      }, 0)
  }

  const calcularTotalLinha = (linha: LinhaOrcamento) => {
    return meses.reduce((sum, mes) => sum + linha[mes], 0)
  }

  const totalReceitas = linhas.filter(l => l.categoria === 'Receita').reduce((sum, l) => sum + calcularTotalLinha(l), 0)
  const totalCustos = linhas.filter(l => l.categoria === 'Custo').reduce((sum, l) => sum + calcularTotalLinha(l), 0)
  const totalDespesas = linhas.filter(l => l.categoria === 'Despesa').reduce((sum, l) => sum + calcularTotalLinha(l), 0)
  const totalInvestimentos = linhas.filter(l => l.categoria === 'Investimento').reduce((sum, l) => sum + calcularTotalLinha(l), 0)
  const resultadoAnual = totalReceitas - totalCustos - totalDespesas - totalInvestimentos

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarOrcamento = () => {
    return `
ORCAMENTO ANUAL ${ano}
═══════════════════════════════════════════════════════════════

RESUMO EXECUTIVO
─────────────────────────────────────────────────────────────
Total Receitas: ${formatarMoeda(totalReceitas)}
Total Custos: ${formatarMoeda(totalCustos)}
Total Despesas: ${formatarMoeda(totalDespesas)}
Total Investimentos: ${formatarMoeda(totalInvestimentos)}
─────────────────────────────────────────────────────────────
RESULTADO PROJETADO: ${formatarMoeda(resultadoAnual)}

DETALHAMENTO POR CATEGORIA
─────────────────────────────────────────────────────────────
${categorias.map(cat => {
  const itens = linhas.filter(l => l.categoria === cat)
  if (itens.length === 0) return ''
  return `
${cat.toUpperCase()}
${itens.map(l => `  ${l.descricao}: ${formatarMoeda(calcularTotalLinha(l))}`).join('\n')}`
}).filter(Boolean).join('\n')}

FLUXO MENSAL
─────────────────────────────────────────────────────────────
${meses.map(mes => {
  const resultado = calcularTotalMes(mes)
  return `${mes.charAt(0).toUpperCase() + mes.slice(1)}: ${formatarMoeda(resultado)}`
}).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarOrcamento = () => {
    navigator.clipboard.writeText(gerarOrcamento())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCorCategoria = (categoria: string) => {
    switch (categoria) {
      case 'Receita': return 'text-green-400'
      case 'Custo': return 'text-red-400'
      case 'Despesa': return 'text-orange-400'
      case 'Investimento': return 'text-blue-400'
      default: return 'text-white'
    }
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <PiggyBank className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Orcamento <span className="gold-text">Anual</span>
          </h1>
          <p className="text-[var(--gray)]">Planejamento financeiro anual</p>
        </div>

        {/* Ano */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="input-label mb-0">Ano:</label>
              <input
                type="number"
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
                className="input-field w-28"
              />
            </div>
            <button onClick={adicionarLinha} className="btn-secondary text-xs">+ Adicionar Linha</button>
          </div>
        </div>

        {/* Tabela */}
        <div className="glass card mb-8 overflow-x-auto">
          <table className="w-full text-xs min-w-[1200px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2 w-24">Categoria</th>
                <th className="text-left p-2 w-32">Descricao</th>
                {meses.map(m => (
                  <th key={m} className="text-right p-2 w-20">{m.charAt(0).toUpperCase() + m.slice(1)}</th>
                ))}
                <th className="text-right p-2 w-24">Total</th>
                <th className="p-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {linhas.map(linha => (
                <tr key={linha.id} className="border-b border-white/5">
                  <td className="p-1">
                    <select
                      value={linha.categoria}
                      onChange={(e) => atualizarLinha(linha.id, 'categoria', e.target.value)}
                      className={`bg-black/30 border border-white/10 rounded px-1 py-1 text-xs w-full ${getCorCategoria(linha.categoria)}`}
                    >
                      {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-1">
                    <input
                      type="text"
                      value={linha.descricao}
                      onChange={(e) => atualizarLinha(linha.id, 'descricao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs w-full"
                      placeholder="Descricao"
                    />
                  </td>
                  {meses.map(mes => (
                    <td key={mes} className="p-1">
                      <input
                        type="number"
                        value={linha[mes]}
                        onChange={(e) => atualizarLinha(linha.id, mes, Number(e.target.value))}
                        className="bg-black/30 border border-white/10 rounded px-1 py-1 text-xs w-full text-right"
                      />
                    </td>
                  ))}
                  <td className={`p-2 text-right font-semibold ${getCorCategoria(linha.categoria)}`}>
                    {formatarMoeda(calcularTotalLinha(linha))}
                  </td>
                  <td className="p-1">
                    <button onClick={() => removerLinha(linha.id)} className="text-red-400 hover:text-red-300">✕</button>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-[var(--gold)]/50 font-semibold">
                <td colSpan={2} className="p-2">RESULTADO MENSAL</td>
                {meses.map(mes => {
                  const resultado = calcularTotalMes(mes)
                  return (
                    <td key={mes} className={`p-2 text-right ${resultado >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatarMoeda(resultado)}
                    </td>
                  )
                })}
                <td className={`p-2 text-right ${resultadoAnual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatarMoeda(resultadoAnual)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resumo */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Receitas</p>
            <p className="font-display text-lg text-green-400">{formatarMoeda(totalReceitas)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Custos</p>
            <p className="font-display text-lg text-red-400">{formatarMoeda(totalCustos)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Despesas</p>
            <p className="font-display text-lg text-orange-400">{formatarMoeda(totalDespesas)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Investimentos</p>
            <p className="font-display text-lg text-blue-400">{formatarMoeda(totalInvestimentos)}</p>
          </div>
          <div className={`glass card text-center border-2 ${resultadoAnual >= 0 ? 'border-green-500/50' : 'border-red-500/50'}`}>
            <p className="text-xs text-[var(--gray)]">Resultado</p>
            <p className={`font-display text-lg ${resultadoAnual >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatarMoeda(resultadoAnual)}
            </p>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarOrcamento} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Orcamento'}
          </button>
        </div>
      </div>
    </main>
  )
}
