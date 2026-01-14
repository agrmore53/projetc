'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Copy, Check, Calculator, TrendingUp, DollarSign } from 'lucide-react'

export default function AfiliadosPage() {
  const [copied, setCopied] = useState(false)

  const [programa, setPrograma] = useState({
    nomePrograma: '',
    ticketMedio: 200,
    comissaoPrimeira: 30,
    comissaoRecorrente: 20,
    duracaoRecorrencia: 12,
    taxaConversao: 5,
    churnMensal: 5,
    custoPlataforma: 100,
    metaAfiliados: 50,
    leadsporAfiliado: 20
  })

  // Calculos
  const comissaoPrimeiraValor = programa.ticketMedio * (programa.comissaoPrimeira / 100)
  const comissaoRecorrenteValor = programa.ticketMedio * (programa.comissaoRecorrente / 100)

  // Vida media do cliente em meses
  const vidaMediaCliente = programa.churnMensal > 0 ? 1 / (programa.churnMensal / 100) : 24

  // LTV do cliente
  const ltvCliente = programa.ticketMedio * Math.min(vidaMediaCliente, programa.duracaoRecorrencia)

  // Comissao total por cliente (primeira + recorrentes)
  const mesesRecorrencia = Math.min(vidaMediaCliente, programa.duracaoRecorrencia) - 1
  const comissaoTotalCliente = comissaoPrimeiraValor + (comissaoRecorrenteValor * Math.max(0, mesesRecorrencia))

  // Margem por cliente apos comissoes
  const margemPorCliente = ltvCliente - comissaoTotalCliente

  // Projecao mensal
  const leadsTotal = programa.metaAfiliados * programa.leadsporAfiliado
  const conversoes = leadsTotal * (programa.taxaConversao / 100)
  const receitaBruta = conversoes * programa.ticketMedio
  const comissoesMes = conversoes * comissaoPrimeiraValor
  const receitaLiquida = receitaBruta - comissoesMes - programa.custoPlataforma

  // ROI do programa
  const investimentoTotal = comissoesMes + programa.custoPlataforma
  const roi = investimentoTotal > 0 ? ((receitaBruta - investimentoTotal) / investimentoTotal) * 100 : 0

  // Projecao anual
  const projecaoAnual = () => {
    const meses = []
    let afiliadosAtivos = 0
    let clientesAtivos = 0
    let receitaAcumulada = 0
    let comissoesAcumuladas = 0

    for (let mes = 1; mes <= 12; mes++) {
      // Crescimento gradual de afiliados
      afiliadosAtivos = Math.min(programa.metaAfiliados, Math.round(programa.metaAfiliados * (mes / 6)))

      // Novos clientes do mes
      const leadsDoMes = afiliadosAtivos * programa.leadsporAfiliado
      const novosClientes = Math.round(leadsDoMes * (programa.taxaConversao / 100))

      // Churn de clientes existentes
      const clientesPerdidos = Math.round(clientesAtivos * (programa.churnMensal / 100))
      clientesAtivos = clientesAtivos - clientesPerdidos + novosClientes

      // Receita do mes
      const receitaMes = clientesAtivos * programa.ticketMedio

      // Comissoes (primeira venda + recorrentes)
      const comissoesPrimeiras = novosClientes * comissaoPrimeiraValor
      const comissoesRecorrentes = (clientesAtivos - novosClientes) * comissaoRecorrenteValor
      const comissoesMes = comissoesPrimeiras + comissoesRecorrentes

      receitaAcumulada += receitaMes
      comissoesAcumuladas += comissoesMes

      meses.push({
        mes,
        afiliados: afiliadosAtivos,
        novosClientes,
        clientesAtivos,
        receita: receitaMes,
        comissoes: comissoesMes,
        lucro: receitaMes - comissoesMes - programa.custoPlataforma
      })
    }

    return { meses, receitaAcumulada, comissoesAcumuladas }
  }

  const { meses, receitaAcumulada, comissoesAcumuladas } = projecaoAnual()

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
CALCULADORA DE PROGRAMA DE AFILIADOS
═══════════════════════════════════════════════════════════════
${programa.nomePrograma ? `Programa: ${programa.nomePrograma}\n` : ''}
ESTRUTURA DE COMISSOES
─────────────────────────────────────────────────────────────
Ticket Medio: ${formatarMoeda(programa.ticketMedio)}
Comissao Primeira Venda: ${programa.comissaoPrimeira}% (${formatarMoeda(comissaoPrimeiraValor)})
Comissao Recorrente: ${programa.comissaoRecorrente}% (${formatarMoeda(comissaoRecorrenteValor)}/mes)
Duracao da Recorrencia: ${programa.duracaoRecorrencia} meses

METRICAS POR CLIENTE
─────────────────────────────────────────────────────────────
LTV do Cliente: ${formatarMoeda(ltvCliente)}
Comissao Total por Cliente: ${formatarMoeda(comissaoTotalCliente)}
Margem por Cliente: ${formatarMoeda(margemPorCliente)}
Vida Media: ${vidaMediaCliente.toFixed(1)} meses

PROJECAO MENSAL (com ${programa.metaAfiliados} afiliados)
─────────────────────────────────────────────────────────────
Leads Gerados: ${leadsTotal}
Conversoes (${programa.taxaConversao}%): ${conversoes.toFixed(0)} clientes
Receita Bruta: ${formatarMoeda(receitaBruta)}
Comissoes: ${formatarMoeda(comissoesMes)}
Custo Plataforma: ${formatarMoeda(programa.custoPlataforma)}
Receita Liquida: ${formatarMoeda(receitaLiquida)}
ROI: ${roi.toFixed(0)}%

PROJECAO ANUAL
─────────────────────────────────────────────────────────────
Mes  | Afiliados | Clientes | Receita      | Comissoes    | Lucro
${'-'.repeat(70)}
${meses.map(m =>
  `${m.mes.toString().padStart(3)}  | ${m.afiliados.toString().padStart(9)} | ${m.clientesAtivos.toString().padStart(8)} | ${formatarMoeda(m.receita).padStart(12)} | ${formatarMoeda(m.comissoes).padStart(12)} | ${formatarMoeda(m.lucro).padStart(12)}`
).join('\n')}
${'-'.repeat(70)}
TOTAL ANUAL
Receita: ${formatarMoeda(receitaAcumulada)}
Comissoes Pagas: ${formatarMoeda(comissoesAcumuladas)}

BENCHMARKS DE PROGRAMAS DE AFILIADOS
─────────────────────────────────────────────────────────────
Comissao SaaS: 20-30% primeira venda, 10-20% recorrente
Comissao Infoprodutos: 30-50% por venda
Taxa de Conversao: 2-10% (media 5%)
Payout minimo recomendado: R$ 100

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

      <div className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Afiliados</span>
          </h1>
          <p className="text-[var(--gray)]">Projete a rentabilidade do seu programa de afiliados</p>
        </div>

        {/* Nome do Programa */}
        <div className="glass card mb-8">
          <label className="input-label">Nome do Programa (opcional)</label>
          <input
            type="text"
            value={programa.nomePrograma}
            onChange={(e) => setPrograma({ ...programa, nomePrograma: e.target.value })}
            placeholder="Ex: Programa de Parceiros Premium"
            className="input-field"
          />
        </div>

        {/* Estrutura de Comissoes */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[var(--gold)]" />
            Estrutura de Comissoes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Ticket Medio (R$)</label>
              <input
                type="number"
                value={programa.ticketMedio}
                onChange={(e) => setPrograma({ ...programa, ticketMedio: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Comissao 1a Venda (%)</label>
              <input
                type="number"
                value={programa.comissaoPrimeira}
                onChange={(e) => setPrograma({ ...programa, comissaoPrimeira: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">Comissao Recorrente (%)</label>
              <input
                type="number"
                value={programa.comissaoRecorrente}
                onChange={(e) => setPrograma({ ...programa, comissaoRecorrente: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">Duracao Recorrencia (meses)</label>
              <input
                type="number"
                value={programa.duracaoRecorrencia}
                onChange={(e) => setPrograma({ ...programa, duracaoRecorrencia: Number(e.target.value) })}
                className="input-field"
                min="1"
                max="36"
              />
            </div>
          </div>
        </div>

        {/* Metricas do Negocio */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--gold)]" />
            Metricas do Negocio
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Taxa de Conversao (%)</label>
              <input
                type="number"
                value={programa.taxaConversao}
                onChange={(e) => setPrograma({ ...programa, taxaConversao: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
                step="0.5"
              />
            </div>
            <div>
              <label className="input-label">Churn Mensal (%)</label>
              <input
                type="number"
                value={programa.churnMensal}
                onChange={(e) => setPrograma({ ...programa, churnMensal: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
                step="0.5"
              />
            </div>
            <div>
              <label className="input-label">Custo Plataforma (R$/mes)</label>
              <input
                type="number"
                value={programa.custoPlataforma}
                onChange={(e) => setPrograma({ ...programa, custoPlataforma: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Meta de Afiliados</label>
              <input
                type="number"
                value={programa.metaAfiliados}
                onChange={(e) => setPrograma({ ...programa, metaAfiliados: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <label className="input-label">Leads por Afiliado/mes</label>
              <input
                type="number"
                value={programa.leadsporAfiliado}
                onChange={(e) => setPrograma({ ...programa, leadsporAfiliado: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Metricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Comissao 1a Venda</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(comissaoPrimeiraValor)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Comissao Total/Cliente</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(comissaoTotalCliente)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Margem por Cliente</p>
            <p className={`font-display text-2xl ${margemPorCliente > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatarMoeda(margemPorCliente)}
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">ROI do Programa</p>
            <p className={`font-display text-2xl ${roi > 100 ? 'text-green-400' : roi > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
              {roi.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Projecao Mensal */}
        <div className="glass card mb-8 border border-green-500/30 bg-green-500/5">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Projecao Mensal (com {programa.metaAfiliados} afiliados ativos)
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-sm text-[var(--gray)]">Leads Gerados</p>
              <p className="font-display text-2xl">{leadsTotal}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Conversoes</p>
              <p className="font-display text-2xl">{conversoes.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Receita Bruta</p>
              <p className="font-display text-2xl text-green-400">{formatarMoeda(receitaBruta)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Comissoes</p>
              <p className="font-display text-2xl text-yellow-400">{formatarMoeda(comissoesMes)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Receita Liquida</p>
              <p className={`font-display text-2xl ${receitaLiquida > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatarMoeda(receitaLiquida)}
              </p>
            </div>
          </div>
        </div>

        {/* Grafico Anual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Projecao de Lucro Anual</h2>
          <div className="h-48 flex items-end gap-1">
            {meses.map((m) => {
              const maxLucro = Math.max(...meses.map(x => Math.abs(x.lucro)))
              const altura = maxLucro > 0 ? (Math.abs(m.lucro) / maxLucro) * 100 : 0
              return (
                <div key={m.mes} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t transition-all ${m.lucro >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ height: `${altura * 1.8}px`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] mt-1">M{m.mes}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-[var(--gray)] mt-2">
            <span>Receita Anual: {formatarMoeda(receitaAcumulada)}</span>
            <span>Comissoes: {formatarMoeda(comissoesAcumuladas)}</span>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Programas de Afiliados</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Estrutura de Comissao</h4>
              <ul className="space-y-1">
                <li>• SaaS: 20-30% primeira + 10-20% recorrente</li>
                <li>• Infoprodutos: 30-50% por venda</li>
                <li>• Ecommerce: 5-15% por venda</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Boas Praticas</h4>
              <ul className="space-y-1">
                <li>• Payout minimo baixo (R$ 50-100)</li>
                <li>• Cookie de 30-90 dias</li>
                <li>• Materiais de divulgacao prontos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
