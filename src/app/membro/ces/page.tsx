'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Gauge, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Resposta {
  id: string
  nota: number
  quantidade: number
}

export default function CESPage() {
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState({
    touchpoint: 'Suporte ao Cliente',
    periodo: 'Ultimo mes'
  })

  const [respostas, setRespostas] = useState<Resposta[]>([
    { id: '1', nota: 1, quantidade: 5 },
    { id: '2', nota: 2, quantidade: 10 },
    { id: '3', nota: 3, quantidade: 15 },
    { id: '4', nota: 4, quantidade: 25 },
    { id: '5', nota: 5, quantidade: 30 },
    { id: '6', nota: 6, quantidade: 40 },
    { id: '7', nota: 7, quantidade: 25 },
  ])

  const atualizarResposta = (id: string, quantidade: number) => {
    setRespostas(respostas.map(r =>
      r.id === id ? { ...r, quantidade: Math.max(0, quantidade) } : r
    ))
  }

  // Calculos
  const totalRespostas = respostas.reduce((sum, r) => sum + r.quantidade, 0)
  const somaNotas = respostas.reduce((sum, r) => sum + (r.nota * r.quantidade), 0)
  const cesScore = totalRespostas > 0 ? somaNotas / totalRespostas : 0

  // Distribuicao
  const baixoEsforco = respostas.filter(r => r.nota >= 5).reduce((sum, r) => sum + r.quantidade, 0)
  const altoEsforco = respostas.filter(r => r.nota <= 3).reduce((sum, r) => sum + r.quantidade, 0)
  const neutro = respostas.filter(r => r.nota === 4).reduce((sum, r) => sum + r.quantidade, 0)

  const percentBaixoEsforco = totalRespostas > 0 ? (baixoEsforco / totalRespostas) * 100 : 0
  const percentAltoEsforco = totalRespostas > 0 ? (altoEsforco / totalRespostas) * 100 : 0

  const getCorCES = (score: number) => {
    if (score >= 5.5) return 'text-green-400'
    if (score >= 4.5) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getClassificacao = (score: number) => {
    if (score >= 6) return 'Excelente'
    if (score >= 5) return 'Bom'
    if (score >= 4) return 'Aceitavel'
    return 'Precisa Melhorar'
  }

  const escalaLabels = [
    'Muito dificil',
    'Dificil',
    'Um pouco dificil',
    'Neutro',
    'Um pouco facil',
    'Facil',
    'Muito facil'
  ]

  const gerarRelatorio = () => {
    return `
ANALISE DE CUSTOMER EFFORT SCORE (CES)
═══════════════════════════════════════════════════════════════

CONFIGURACAO
─────────────────────────────────────────────────────────────
Touchpoint: ${config.touchpoint}
Periodo: ${config.periodo}
Total de Respostas: ${totalRespostas}

CES SCORE
─────────────────────────────────────────────────────────────
Score: ${cesScore.toFixed(2)} / 7.0
Classificacao: ${getClassificacao(cesScore)}

DISTRIBUICAO
─────────────────────────────────────────────────────────────
${respostas.map(r => `${r.nota} - ${escalaLabels[r.nota - 1]}: ${r.quantidade} (${totalRespostas > 0 ? ((r.quantidade / totalRespostas) * 100).toFixed(1) : 0}%)`).join('\n')}

RESUMO
─────────────────────────────────────────────────────────────
Baixo Esforco (5-7): ${baixoEsforco} respostas (${percentBaixoEsforco.toFixed(1)}%)
Neutro (4): ${neutro} respostas (${totalRespostas > 0 ? ((neutro / totalRespostas) * 100).toFixed(1) : 0}%)
Alto Esforco (1-3): ${altoEsforco} respostas (${percentAltoEsforco.toFixed(1)}%)

INTERPRETACAO
─────────────────────────────────────────────────────────────
• CES >= 6.0: Experiencia com baixissimo esforco - excelente!
• CES 5.0-5.9: Boa experiencia, pequenas melhorias possiveis
• CES 4.0-4.9: Esforco moderado - analise pontos de friccao
• CES < 4.0: Alto esforco - acao urgente necessaria

BENCHMARK
─────────────────────────────────────────────────────────────
Media do mercado SaaS: 5.0-5.5
Top performers: > 6.0
Correlacao com lealdade: CES alto = maior retencao

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

      <div className="max-w-4xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Gauge className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Customer <span className="gold-text">Effort Score</span>
          </h1>
          <p className="text-[var(--gray)]">Meca o esforco do cliente em interagir com voce</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Touchpoint / Ponto de Contato</label>
              <input
                type="text"
                value={config.touchpoint}
                onChange={(e) => setConfig({ ...config, touchpoint: e.target.value })}
                placeholder="Ex: Suporte, Onboarding, Checkout"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Periodo</label>
              <input
                type="text"
                value={config.periodo}
                onChange={(e) => setConfig({ ...config, periodo: e.target.value })}
                placeholder="Ex: Janeiro 2024"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Score Principal */}
        <div className="glass card mb-8 text-center py-8">
          <p className="text-sm text-[var(--gray)] mb-2">Customer Effort Score</p>
          <p className={`font-display text-6xl ${getCorCES(cesScore)}`}>
            {cesScore.toFixed(2)}
          </p>
          <p className="text-lg text-[var(--gray)] mt-2">{getClassificacao(cesScore)}</p>
          <p className="text-xs text-[var(--gray)] mt-1">Escala de 1 a 7</p>
        </div>

        {/* Distribuicao */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Distribuicao de Respostas</h2>
          <p className="text-sm text-[var(--gray)] mb-4">
            "O quanto foi facil resolver seu problema/completar sua tarefa?"
          </p>

          <div className="space-y-3">
            {respostas.map((r) => {
              const percent = totalRespostas > 0 ? (r.quantidade / totalRespostas) * 100 : 0
              const cor = r.nota >= 5 ? 'bg-green-500' : r.nota === 4 ? 'bg-yellow-500' : 'bg-red-500'
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="w-6 text-center font-semibold">{r.nota}</span>
                  <span className="w-32 text-xs text-[var(--gray)]">{escalaLabels[r.nota - 1]}</span>
                  <div className="flex-1 h-8 bg-black/30 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${cor} transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <input
                    type="number"
                    value={r.quantidade}
                    onChange={(e) => atualizarResposta(r.id, Number(e.target.value))}
                    className="input-field text-sm w-20 text-center"
                    min="0"
                  />
                  <span className="w-12 text-xs text-[var(--gray)] text-right">
                    {percent.toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Metricas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Respostas</p>
            <p className="font-display text-2xl text-[var(--gold)]">{totalRespostas}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Baixo Esforco</p>
            <p className="font-display text-2xl text-green-400">{percentBaixoEsforco.toFixed(0)}%</p>
            <p className="text-xs text-[var(--gray)]">notas 5-7</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Alto Esforco</p>
            <p className="font-display text-2xl text-red-400">{percentAltoEsforco.toFixed(0)}%</p>
            <p className="text-xs text-[var(--gray)]">notas 1-3</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Benchmark</p>
            <p className="font-display text-2xl text-[var(--gray)]">5.0-5.5</p>
            <p className="text-xs text-[var(--gray)]">media SaaS</p>
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
          <h3 className="font-display text-lg gold-text mb-4">Sobre o CES</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Por que medir</h4>
              <ul className="space-y-1">
                <li>• Melhor preditor de lealdade que NPS</li>
                <li>• Identifica pontos de friccao</li>
                <li>• Correlacao direta com churn</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Quando aplicar</h4>
              <ul className="space-y-1">
                <li>• Apos interacao com suporte</li>
                <li>• Pos-onboarding</li>
                <li>• Apos uso de feature especifica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
