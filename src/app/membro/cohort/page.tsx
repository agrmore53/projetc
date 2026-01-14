'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Copy, Check } from 'lucide-react'

export default function CohortPage() {
  const [copied, setCopied] = useState(false)

  // Dados de exemplo - usuarios que iniciaram em cada mes e permaneceram ativos
  const [cohorts, setCohorts] = useState([
    { mes: 'Jan', inicial: 100, retencao: [100, 68, 52, 45, 40, 38] },
    { mes: 'Fev', inicial: 120, retencao: [100, 72, 58, 48, 42, 0] },
    { mes: 'Mar', inicial: 150, retencao: [100, 65, 50, 43, 0, 0] },
    { mes: 'Abr', inicial: 130, retencao: [100, 70, 55, 0, 0, 0] },
    { mes: 'Mai', inicial: 180, retencao: [100, 75, 0, 0, 0, 0] },
    { mes: 'Jun', inicial: 200, retencao: [100, 0, 0, 0, 0, 0] },
  ])

  const meses = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5']

  const atualizarRetencao = (cohortIndex: number, mesIndex: number, valor: number) => {
    setCohorts(cohorts.map((c, i) => {
      if (i !== cohortIndex) return c
      const novaRetencao = [...c.retencao]
      novaRetencao[mesIndex] = Math.min(100, Math.max(0, valor))
      return { ...c, retencao: novaRetencao }
    }))
  }

  const atualizarInicial = (cohortIndex: number, valor: number) => {
    setCohorts(cohorts.map((c, i) =>
      i === cohortIndex ? { ...c, inicial: Math.max(0, valor) } : c
    ))
  }

  const atualizarMes = (cohortIndex: number, valor: string) => {
    setCohorts(cohorts.map((c, i) =>
      i === cohortIndex ? { ...c, mes: valor } : c
    ))
  }

  // Calcula media de retencao por mes
  const mediaRetencao = meses.map((_, mesIndex) => {
    const valoresValidos = cohorts
      .map(c => c.retencao[mesIndex])
      .filter(v => v > 0)
    return valoresValidos.length > 0
      ? valoresValidos.reduce((a, b) => a + b, 0) / valoresValidos.length
      : 0
  })

  // Cor baseada na retencao
  const getCorRetencao = (valor: number) => {
    if (valor === 0) return 'transparent'
    if (valor >= 70) return 'rgba(34, 197, 94, 0.6)'
    if (valor >= 50) return 'rgba(234, 179, 8, 0.6)'
    if (valor >= 30) return 'rgba(249, 115, 22, 0.6)'
    return 'rgba(239, 68, 68, 0.6)'
  }

  const gerarAnalise = () => {
    return `
ANALISE DE COHORT
═══════════════════════════════════════════════════════════════

RETENCAO POR COHORT (%)
─────────────────────────────────────────────────────────────
Cohort    | Usuarios | ${meses.join('   | ')}
${'-'.repeat(70)}
${cohorts.map(c =>
  `${c.mes.padEnd(9)} | ${c.inicial.toString().padEnd(8)} | ${c.retencao.map(r => r > 0 ? r.toString().padEnd(4) : '-   ').join(' | ')}`
).join('\n')}
${'-'.repeat(70)}
MEDIA     |          | ${mediaRetencao.map(m => m > 0 ? m.toFixed(0).padEnd(4) : '-   ').join(' | ')}

INSIGHTS
─────────────────────────────────────────────────────────────
• Retencao M1 (1o mes): ${mediaRetencao[1]?.toFixed(0) || 0}%
• Retencao M3 (3o mes): ${mediaRetencao[3]?.toFixed(0) || 0}%
• Drop-off principal: M0 para M1 (${(100 - (mediaRetencao[1] || 0)).toFixed(0)}% de perda)

BENCHMARKS SAAS
─────────────────────────────────────────────────────────────
M1: >70% (Bom) | 50-70% (Ok) | <50% (Ruim)
M3: >50% (Bom) | 30-50% (Ok) | <30% (Ruim)
M6+: >40% (Excelente) | 25-40% (Bom) | <25% (Precisa melhorar)

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarAnalise = () => {
    navigator.clipboard.writeText(gerarAnalise())
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
            <BarChart3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Analise de <span className="gold-text">Cohort</span>
          </h1>
          <p className="text-[var(--gray)]">Visualize retencao de usuarios ao longo do tempo</p>
        </div>

        {/* Metricas Resumo */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Retencao M1</p>
            <p className="font-display text-3xl" style={{ color: getCorRetencao(mediaRetencao[1]) }}>
              {mediaRetencao[1]?.toFixed(0) || 0}%
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Retencao M3</p>
            <p className="font-display text-3xl" style={{ color: getCorRetencao(mediaRetencao[3]) }}>
              {mediaRetencao[3]?.toFixed(0) || 0}%
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Drop M0→M1</p>
            <p className="font-display text-3xl text-red-400">
              -{(100 - (mediaRetencao[1] || 0)).toFixed(0)}%
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Usuarios</p>
            <p className="font-display text-3xl text-[var(--gold)]">
              {cohorts.reduce((sum, c) => sum + c.inicial, 0)}
            </p>
          </div>
        </div>

        {/* Tabela de Cohort */}
        <div className="glass card mb-8 overflow-x-auto">
          <h2 className="font-display text-lg mb-4">Tabela de Retencao (%)</h2>

          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-white/10">Cohort</th>
                <th className="text-center p-2 border-b border-white/10">Usuarios</th>
                {meses.map(m => (
                  <th key={m} className="text-center p-2 border-b border-white/10">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort, cIndex) => (
                <tr key={cIndex}>
                  <td className="p-2 border-b border-white/10">
                    <input
                      type="text"
                      value={cohort.mes}
                      onChange={(e) => atualizarMes(cIndex, e.target.value)}
                      className="bg-transparent border-none w-16 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] rounded px-1"
                    />
                  </td>
                  <td className="p-2 border-b border-white/10 text-center">
                    <input
                      type="number"
                      value={cohort.inicial}
                      onChange={(e) => atualizarInicial(cIndex, Number(e.target.value))}
                      className="bg-black/30 border border-white/10 rounded w-16 text-center py-1"
                    />
                  </td>
                  {cohort.retencao.map((ret, mIndex) => {
                    const podeEditar = mIndex <= cohorts.length - cIndex
                    return (
                      <td key={mIndex} className="p-2 border-b border-white/10 text-center">
                        {podeEditar ? (
                          <input
                            type="number"
                            value={ret || ''}
                            onChange={(e) => atualizarRetencao(cIndex, mIndex, Number(e.target.value))}
                            className="border rounded w-14 text-center py-1 font-semibold"
                            style={{
                              backgroundColor: getCorRetencao(ret),
                              borderColor: getCorRetencao(ret) || 'rgba(255,255,255,0.1)'
                            }}
                            min="0"
                            max="100"
                          />
                        ) : (
                          <span className="text-[var(--gray)]">-</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
              {/* Linha de Media */}
              <tr className="bg-white/5">
                <td className="p-2 font-semibold">MEDIA</td>
                <td className="p-2 text-center">-</td>
                {mediaRetencao.map((media, i) => (
                  <td key={i} className="p-2 text-center font-semibold text-[var(--gold)]">
                    {media > 0 ? `${media.toFixed(0)}%` : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grafico Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Curva de Retencao Media</h2>
          <div className="h-48 flex items-end justify-around gap-2">
            {mediaRetencao.map((media, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t transition-all"
                  style={{
                    height: `${media * 1.8}px`,
                    backgroundColor: getCorRetencao(media),
                    minHeight: media > 0 ? '20px' : '0'
                  }}
                />
                <span className="text-xs mt-2">{meses[i]}</span>
                <span className="text-xs text-[var(--gray)]">{media > 0 ? `${media.toFixed(0)}%` : '-'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarAnalise} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Analise'}
          </button>
        </div>

        {/* Benchmarks */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks de Retencao SaaS</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-500/10 p-4 rounded-xl text-center">
              <p className="text-green-400 font-semibold mb-2">Excelente</p>
              <p className="text-[var(--gray)]">M1: {'>'} 70%</p>
              <p className="text-[var(--gray)]">M3: {'>'} 50%</p>
            </div>
            <div className="bg-yellow-500/10 p-4 rounded-xl text-center">
              <p className="text-yellow-400 font-semibold mb-2">Aceitavel</p>
              <p className="text-[var(--gray)]">M1: 50-70%</p>
              <p className="text-[var(--gray)]">M3: 30-50%</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-xl text-center">
              <p className="text-red-400 font-semibold mb-2">Precisa Melhorar</p>
              <p className="text-[var(--gray)]">M1: {'<'} 50%</p>
              <p className="text-[var(--gray)]">M3: {'<'} 30%</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
