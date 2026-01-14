'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Copy, Check, Plus, Trash2, DollarSign, Users, ArrowUpRight, Percent } from 'lucide-react'

interface Expansion {
  id: string
  cliente: string
  tipo: 'upsell' | 'crosssell' | 'seats' | 'addon'
  mrrAnterior: number
  mrrNovo: number
  data: string
}

export default function ExpansionPage() {
  const [copied, setCopied] = useState(false)
  const [mesAtual, setMesAtual] = useState(new Date().toISOString().slice(0, 7))

  const [expansions, setExpansions] = useState<Expansion[]>([
    { id: '1', cliente: 'Empresa Alpha', tipo: 'upsell', mrrAnterior: 500, mrrNovo: 1200, data: '2024-01-15' },
    { id: '2', cliente: 'Empresa Beta', tipo: 'seats', mrrAnterior: 800, mrrNovo: 1200, data: '2024-01-12' },
    { id: '3', cliente: 'Empresa Gamma', tipo: 'addon', mrrAnterior: 300, mrrNovo: 450, data: '2024-01-10' },
    { id: '4', cliente: 'Empresa Delta', tipo: 'crosssell', mrrAnterior: 1000, mrrNovo: 1800, data: '2024-01-08' },
  ])

  // MRR Base para calculo de Net Revenue Retention
  const [mrrBaseInicio, setMrrBaseInicio] = useState(50000)
  const [churnMes, setChurnMes] = useState(2500)
  const [contractionMes, setContractionMes] = useState(1000)

  const adicionarExpansion = () => {
    const nova: Expansion = {
      id: Date.now().toString(),
      cliente: '',
      tipo: 'upsell',
      mrrAnterior: 0,
      mrrNovo: 0,
      data: new Date().toISOString().split('T')[0]
    }
    setExpansions([nova, ...expansions])
  }

  const removerExpansion = (id: string) => {
    setExpansions(expansions.filter(e => e.id !== id))
  }

  const atualizarExpansion = (id: string, campo: keyof Expansion, valor: string | number) => {
    setExpansions(expansions.map(e =>
      e.id === id ? { ...e, [campo]: valor } : e
    ))
  }

  const tiposExpansion = [
    { value: 'upsell', label: 'Upsell', desc: 'Upgrade de plano' },
    { value: 'crosssell', label: 'Cross-sell', desc: 'Produto adicional' },
    { value: 'seats', label: 'Seats', desc: 'Mais usuarios' },
    { value: 'addon', label: 'Add-on', desc: 'Funcionalidade extra' },
  ]

  // Calculos
  const expansionMRR = expansions.reduce((sum, e) => sum + (e.mrrNovo - e.mrrAnterior), 0)
  const totalExpansions = expansions.length
  const ticketMedioExpansion = totalExpansions > 0 ? expansionMRR / totalExpansions : 0

  // Expansion por tipo
  const expansionPorTipo = tiposExpansion.map(tipo => ({
    ...tipo,
    total: expansions.filter(e => e.tipo === tipo.value).reduce((sum, e) => sum + (e.mrrNovo - e.mrrAnterior), 0),
    count: expansions.filter(e => e.tipo === tipo.value).length
  }))

  // Net Revenue Retention (NRR)
  const mrrFinal = mrrBaseInicio - churnMes - contractionMes + expansionMRR
  const nrr = mrrBaseInicio > 0 ? (mrrFinal / mrrBaseInicio) * 100 : 0

  // Gross Revenue Retention (GRR)
  const grr = mrrBaseInicio > 0 ? ((mrrBaseInicio - churnMes - contractionMes) / mrrBaseInicio) * 100 : 0

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getCorNRR = (nrr: number) => {
    if (nrr >= 120) return '#22c55e'
    if (nrr >= 100) return '#84cc16'
    if (nrr >= 90) return '#eab308'
    return '#ef4444'
  }

  const copiarAnalise = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                ANALISE DE EXPANSION REVENUE
═══════════════════════════════════════════════════════════════
Periodo: ${mesAtual}

RESUMO
───────────────────────────────────────────────────────────────
Total Expansion MRR: ${formatCurrency(expansionMRR)}
Quantidade de Expansions: ${totalExpansions}
Ticket Medio Expansion: ${formatCurrency(ticketMedioExpansion)}

POR TIPO DE EXPANSION
───────────────────────────────────────────────────────────────
${expansionPorTipo.map(t => `${t.label}: ${formatCurrency(t.total)} (${t.count} clientes)`).join('\n')}

NET REVENUE RETENTION
───────────────────────────────────────────────────────────────
MRR Base (inicio): ${formatCurrency(mrrBaseInicio)}
(-) Churn: ${formatCurrency(churnMes)}
(-) Contraction: ${formatCurrency(contractionMes)}
(+) Expansion: ${formatCurrency(expansionMRR)}
(=) MRR Final: ${formatCurrency(mrrFinal)}

NRR: ${nrr.toFixed(1)}%
GRR: ${grr.toFixed(1)}%

DETALHAMENTO
───────────────────────────────────────────────────────────────
${expansions.map(e => {
  const delta = e.mrrNovo - e.mrrAnterior
  return `${e.cliente}
  Tipo: ${tiposExpansion.find(t => t.value === e.tipo)?.label}
  ${formatCurrency(e.mrrAnterior)} → ${formatCurrency(e.mrrNovo)} (+${formatCurrency(delta)})`
}).join('\n\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
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
            <TrendingUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Expansion Revenue</span>
          </h1>
          <p className="text-[var(--gray)]">Cresca sua receita com clientes existentes</p>
        </div>

        {/* Metricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <ArrowUpRight className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-[var(--gray)]">Expansion MRR</p>
            <p className="font-display text-2xl text-green-400">{formatCurrency(expansionMRR)}</p>
          </div>
          <div className="glass card text-center">
            <Users className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-sm text-[var(--gray)]">Expansions</p>
            <p className="font-display text-2xl text-[var(--gold)]">{totalExpansions}</p>
          </div>
          <div className="glass card text-center">
            <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-[var(--gray)]">Ticket Medio</p>
            <p className="font-display text-2xl text-blue-400">{formatCurrency(ticketMedioExpansion)}</p>
          </div>
          <div className="glass card text-center" style={{ borderColor: getCorNRR(nrr), borderWidth: 2 }}>
            <Percent className="w-6 h-6 mx-auto mb-2" style={{ color: getCorNRR(nrr) }} />
            <p className="text-sm text-[var(--gray)]">NRR</p>
            <p className="font-display text-2xl" style={{ color: getCorNRR(nrr) }}>{nrr.toFixed(1)}%</p>
          </div>
        </div>

        {/* NRR Calculator */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-[var(--gold)]" />
            Net Revenue Retention (NRR)
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="input-label">MRR Base (inicio do mes)</label>
              <input
                type="number"
                value={mrrBaseInicio}
                onChange={(e) => setMrrBaseInicio(Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Churn MRR (clientes perdidos)</label>
              <input
                type="number"
                value={churnMes}
                onChange={(e) => setChurnMes(Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Contraction MRR (downgrades)</label>
              <input
                type="number"
                value={contractionMes}
                onChange={(e) => setContractionMes(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>

          {/* Formula Visual */}
          <div className="bg-black/30 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              <div className="px-3 py-2">
                <p className="text-xs text-[var(--gray)]">MRR Base</p>
                <p className="font-display text-lg">{formatCurrency(mrrBaseInicio)}</p>
              </div>
              <span className="text-red-400 text-xl">−</span>
              <div className="px-3 py-2">
                <p className="text-xs text-red-400">Churn</p>
                <p className="font-display text-lg text-red-400">{formatCurrency(churnMes)}</p>
              </div>
              <span className="text-red-400 text-xl">−</span>
              <div className="px-3 py-2">
                <p className="text-xs text-orange-400">Contraction</p>
                <p className="font-display text-lg text-orange-400">{formatCurrency(contractionMes)}</p>
              </div>
              <span className="text-green-400 text-xl">+</span>
              <div className="px-3 py-2">
                <p className="text-xs text-green-400">Expansion</p>
                <p className="font-display text-lg text-green-400">{formatCurrency(expansionMRR)}</p>
              </div>
              <span className="text-[var(--gold)] text-xl">=</span>
              <div className="px-3 py-2 bg-[var(--gold)]/20 rounded-lg">
                <p className="text-xs text-[var(--gold)]">MRR Final</p>
                <p className="font-display text-lg text-[var(--gold)]">{formatCurrency(mrrFinal)}</p>
              </div>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-[var(--gray)]">
                NRR = MRR Final / MRR Base = <span className="font-semibold" style={{ color: getCorNRR(nrr) }}>{nrr.toFixed(1)}%</span>
                {' | '}
                GRR = (Base - Churn - Contraction) / Base = <span className="font-semibold">{grr.toFixed(1)}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Por Tipo */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {expansionPorTipo.map((tipo) => (
            <div key={tipo.value} className="glass card text-center">
              <p className="font-semibold mb-1">{tipo.label}</p>
              <p className="text-xs text-[var(--gray)] mb-2">{tipo.desc}</p>
              <p className="font-display text-xl text-green-400">{formatCurrency(tipo.total)}</p>
              <p className="text-xs text-[var(--gray)]">{tipo.count} clientes</p>
            </div>
          ))}
        </div>

        {/* Lista de Expansions */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Expansions do Periodo</h2>
            <div className="flex gap-2">
              <input
                type="month"
                value={mesAtual}
                onChange={(e) => setMesAtual(e.target.value)}
                className="input-field text-sm"
              />
              <button onClick={adicionarExpansion} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Adicionar
              </button>
              <button onClick={copiarAnalise} className="btn-primary text-sm flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {expansions.map((exp) => {
              const delta = exp.mrrNovo - exp.mrrAnterior

              return (
                <div key={exp.id} className="bg-black/30 rounded-xl p-4">
                  <div className="grid md:grid-cols-6 gap-4 items-center">
                    <input
                      type="text"
                      value={exp.cliente}
                      onChange={(e) => atualizarExpansion(exp.id, 'cliente', e.target.value)}
                      placeholder="Nome do cliente"
                      className="input-field text-sm"
                    />
                    <select
                      value={exp.tipo}
                      onChange={(e) => atualizarExpansion(exp.id, 'tipo', e.target.value)}
                      className="input-field text-sm"
                    >
                      {tiposExpansion.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <div>
                      <label className="text-xs text-[var(--gray)]">MRR Anterior</label>
                      <input
                        type="number"
                        value={exp.mrrAnterior}
                        onChange={(e) => atualizarExpansion(exp.id, 'mrrAnterior', Number(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[var(--gray)]">MRR Novo</label>
                      <input
                        type="number"
                        value={exp.mrrNovo}
                        onChange={(e) => atualizarExpansion(exp.id, 'mrrNovo', Number(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>
                    <div className="text-center">
                      <label className="text-xs text-[var(--gray)]">Expansion</label>
                      <p className={`font-display text-lg ${delta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {delta >= 0 ? '+' : ''}{formatCurrency(delta)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={exp.data}
                        onChange={(e) => atualizarExpansion(exp.id, 'data', e.target.value)}
                        className="input-field text-sm flex-1"
                      />
                      <button onClick={() => removerExpansion(exp.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {expansions.length === 0 && (
            <div className="text-center py-8 text-[var(--gray)]">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhuma expansion registrada</p>
            </div>
          )}
        </div>

        {/* Benchmarks */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Benchmarks de NRR</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { min: 130, label: 'Best-in-class', cor: '#22c55e', desc: 'Twilio, Snowflake' },
              { min: 120, label: 'Excelente', cor: '#84cc16', desc: 'Top SaaS B2B' },
              { min: 100, label: 'Bom', cor: '#eab308', desc: 'Expansion cobre churn' },
              { min: 0, label: 'Atencao', cor: '#ef4444', desc: 'Base encolhendo' },
            ].map((bench) => (
              <div
                key={bench.label}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: `${bench.cor}15`, border: nrr >= bench.min ? `2px solid ${bench.cor}` : '2px solid transparent' }}
              >
                <p className="font-display text-xl" style={{ color: bench.cor }}>{bench.min}%+</p>
                <p className="font-semibold" style={{ color: bench.cor }}>{bench.label}</p>
                <p className="text-xs text-[var(--gray)]">{bench.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Estrategias de Expansion</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Upsell Baseado em Uso</h4>
              <p>Clientes usando 80%+ do plano sao candidatos naturais. Aborde proativamente.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Expansion em Renovacao</h4>
              <p>Momento de renovacao e ideal para propor upgrade. Prepare-se com antecedencia.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Land and Expand</h4>
              <p>Entre pequeno em uma area e expanda para outros times/departamentos.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">NRR como Prioridade</h4>
              <p>NRR acima de 100% significa que voce cresce mesmo sem novos clientes. E o sonho de todo SaaS.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
