'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ClipboardCheck, Copy, Check } from 'lucide-react'

interface Meta {
  descricao: string
  peso: number
  atingimento: number
}

export default function AvaliacaoDesempenhoPage() {
  const [copied, setCopied] = useState(false)

  const [avaliacao, setAvaliacao] = useState({
    colaborador: '',
    cargo: '',
    departamento: '',
    gestor: '',
    periodo: '',
    dataAvaliacao: new Date().toISOString().split('T')[0],

    metas: [
      { descricao: 'Atingir meta de vendas trimestral', peso: 30, atingimento: 95 },
      { descricao: 'Reduzir tempo de resposta ao cliente', peso: 25, atingimento: 110 },
      { descricao: 'Implementar novo processo de onboarding', peso: 20, atingimento: 100 },
      { descricao: 'Aumentar NPS da equipe', peso: 15, atingimento: 85 },
      { descricao: 'Completar certificacoes planejadas', peso: 10, atingimento: 100 },
    ] as Meta[],

    competencias: [
      { nome: 'Comunicacao', nota: 4 },
      { nome: 'Trabalho em Equipe', nota: 4 },
      { nome: 'Resolucao de Problemas', nota: 3 },
      { nome: 'Proatividade', nota: 5 },
      { nome: 'Gestao do Tempo', nota: 3 },
      { nome: 'Lideranca', nota: 4 },
    ],

    pontosFortes: '',
    pontosDesenvolvimento: '',
    feedbackGestor: '',
    planosAcao: '',
    notaFinal: ''
  })

  const calcularNotaMetas = () => {
    const totalPeso = avaliacao.metas.reduce((sum, m) => sum + m.peso, 0)
    if (totalPeso === 0) return 0
    return avaliacao.metas.reduce((sum, m) => sum + (m.atingimento * m.peso / 100), 0) / totalPeso * 100
  }

  const calcularMediaCompetencias = () => {
    if (avaliacao.competencias.length === 0) return 0
    return avaliacao.competencias.reduce((sum, c) => sum + c.nota, 0) / avaliacao.competencias.length
  }

  const notaMetas = calcularNotaMetas()
  const mediaCompetencias = calcularMediaCompetencias()
  const notaFinalCalculada = (notaMetas * 0.6 + mediaCompetencias * 20 * 0.4) / 100 * 5

  const atualizarMeta = (index: number, campo: keyof Meta, valor: string | number) => {
    setAvaliacao({
      ...avaliacao,
      metas: avaliacao.metas.map((m, i) =>
        i === index ? { ...m, [campo]: valor } : m
      )
    })
  }

  const atualizarCompetencia = (index: number, nota: number) => {
    setAvaliacao({
      ...avaliacao,
      competencias: avaliacao.competencias.map((c, i) =>
        i === index ? { ...c, nota } : c
      )
    })
  }

  const getCorNota = (nota: number) => {
    if (nota >= 4) return 'text-green-400'
    if (nota >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCorAtingimento = (valor: number) => {
    if (valor >= 100) return 'text-green-400'
    if (valor >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getClassificacao = (nota: number) => {
    if (nota >= 4.5) return 'Excepcional'
    if (nota >= 4) return 'Acima das Expectativas'
    if (nota >= 3) return 'Atende Expectativas'
    if (nota >= 2) return 'Abaixo das Expectativas'
    return 'Insatisfatorio'
  }

  const gerarAvaliacao = () => {
    return `
AVALIACAO DE DESEMPENHO
═══════════════════════════════════════════════════════════════

INFORMACOES
─────────────────────────────────────────────────────────────
Colaborador: ${avaliacao.colaborador || '[NOME]'}
Cargo: ${avaliacao.cargo || '[CARGO]'}
Departamento: ${avaliacao.departamento || '[DEPARTAMENTO]'}
Gestor: ${avaliacao.gestor || '[GESTOR]'}
Periodo: ${avaliacao.periodo || '[PERIODO]'}
Data: ${avaliacao.dataAvaliacao}

═══════════════════════════════════════════════════════════════
                    RESULTADOS (60%)
═══════════════════════════════════════════════════════════════

METAS E ATINGIMENTO
─────────────────────────────────────────────────────────────
${avaliacao.metas.map((m, i) => `${i + 1}. ${m.descricao}
   Peso: ${m.peso}% | Atingimento: ${m.atingimento}%`).join('\n\n')}

NOTA DE RESULTADOS: ${notaMetas.toFixed(1)}%

═══════════════════════════════════════════════════════════════
                    COMPETENCIAS (40%)
═══════════════════════════════════════════════════════════════

${avaliacao.competencias.map(c => {
  const barra = '█'.repeat(c.nota) + '░'.repeat(5 - c.nota)
  return `${c.nome.padEnd(25)} ${barra} ${c.nota}/5`
}).join('\n')}

MEDIA COMPETENCIAS: ${mediaCompetencias.toFixed(1)}/5

═══════════════════════════════════════════════════════════════
                    NOTA FINAL
═══════════════════════════════════════════════════════════════

NOTA: ${notaFinalCalculada.toFixed(2)}/5 - ${getClassificacao(notaFinalCalculada)}

Formula: (Resultados × 60%) + (Competencias × 40%)

PONTOS FORTES
─────────────────────────────────────────────────────────────
${avaliacao.pontosFortes || '[Pontos fortes identificados]'}

PONTOS DE DESENVOLVIMENTO
─────────────────────────────────────────────────────────────
${avaliacao.pontosDesenvolvimento || '[Areas de melhoria]'}

FEEDBACK DO GESTOR
─────────────────────────────────────────────────────────────
${avaliacao.feedbackGestor || '[Comentarios do gestor]'}

PLANO DE ACAO
─────────────────────────────────────────────────────────────
${avaliacao.planosAcao || '[Acoes para o proximo periodo]'}

═══════════════════════════════════════════════════════════════
ESCALA DE AVALIACAO
─────────────────────────────────────────────────────────────
5 - Excepcional (4.5-5.0)
4 - Acima das Expectativas (4.0-4.4)
3 - Atende Expectativas (3.0-3.9)
2 - Abaixo das Expectativas (2.0-2.9)
1 - Insatisfatorio (0-1.9)

═══════════════════════════════════════════════════════════════
Avaliacao gerada em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarAvaliacao = () => {
    navigator.clipboard.writeText(gerarAvaliacao())
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
            <ClipboardCheck className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Avaliacao de <span className="gold-text">Desempenho</span>
          </h1>
          <p className="text-[var(--gray)]">Performance review estruturada</p>
        </div>

        {/* Nota Final */}
        <div className={`glass card mb-8 text-center border-2 ${
          notaFinalCalculada >= 4 ? 'border-green-500/50 bg-green-500/5' :
          notaFinalCalculada >= 3 ? 'border-yellow-500/50 bg-yellow-500/5' :
          'border-red-500/50 bg-red-500/5'
        }`}>
          <p className="text-sm text-[var(--gray)]">Nota Final</p>
          <p className={`font-display text-5xl ${getCorNota(notaFinalCalculada)}`}>
            {notaFinalCalculada.toFixed(2)}
          </p>
          <p className={`text-lg ${getCorNota(notaFinalCalculada)}`}>
            {getClassificacao(notaFinalCalculada)}
          </p>
        </div>

        {/* Info */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Colaborador</label>
              <input
                type="text"
                value={avaliacao.colaborador}
                onChange={(e) => setAvaliacao({ ...avaliacao, colaborador: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cargo</label>
              <input
                type="text"
                value={avaliacao.cargo}
                onChange={(e) => setAvaliacao({ ...avaliacao, cargo: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Departamento</label>
              <input
                type="text"
                value={avaliacao.departamento}
                onChange={(e) => setAvaliacao({ ...avaliacao, departamento: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Gestor</label>
              <input
                type="text"
                value={avaliacao.gestor}
                onChange={(e) => setAvaliacao({ ...avaliacao, gestor: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Periodo</label>
              <input
                type="text"
                value={avaliacao.periodo}
                onChange={(e) => setAvaliacao({ ...avaliacao, periodo: e.target.value })}
                className="input-field"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={avaliacao.dataAvaliacao}
                onChange={(e) => setAvaliacao({ ...avaliacao, dataAvaliacao: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Metas */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Metas e Resultados (60%)</h2>
            <span className={`font-display text-xl ${getCorAtingimento(notaMetas)}`}>
              {notaMetas.toFixed(1)}%
            </span>
          </div>
          <div className="space-y-4">
            {avaliacao.metas.map((meta, index) => (
              <div key={index} className="bg-black/20 rounded-xl p-4">
                <div className="grid md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--gray)]">Meta</label>
                    <input
                      type="text"
                      value={meta.descricao}
                      onChange={(e) => atualizarMeta(index, 'descricao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Peso (%)</label>
                    <input
                      type="number"
                      value={meta.peso}
                      onChange={(e) => atualizarMeta(index, 'peso', Number(e.target.value))}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Atingimento (%)</label>
                    <input
                      type="number"
                      value={meta.atingimento}
                      onChange={(e) => atualizarMeta(index, 'atingimento', Number(e.target.value))}
                      className={`bg-black/30 border border-white/10 rounded px-3 py-2 w-full ${getCorAtingimento(meta.atingimento)}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competencias */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Competencias (40%)</h2>
            <span className={`font-display text-xl ${getCorNota(mediaCompetencias)}`}>
              {mediaCompetencias.toFixed(1)}/5
            </span>
          </div>
          <div className="space-y-3">
            {avaliacao.competencias.map((comp, index) => (
              <div key={index} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>{comp.nome}</span>
                  <span className={`font-display ${getCorNota(comp.nota)}`}>{comp.nota}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={comp.nota}
                  onChange={(e) => atualizarCompetencia(index, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Feedback Qualitativo</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Pontos Fortes</label>
              <textarea
                value={avaliacao.pontosFortes}
                onChange={(e) => setAvaliacao({ ...avaliacao, pontosFortes: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Pontos de Desenvolvimento</label>
              <textarea
                value={avaliacao.pontosDesenvolvimento}
                onChange={(e) => setAvaliacao({ ...avaliacao, pontosDesenvolvimento: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Feedback do Gestor</label>
              <textarea
                value={avaliacao.feedbackGestor}
                onChange={(e) => setAvaliacao({ ...avaliacao, feedbackGestor: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Plano de Acao</label>
              <textarea
                value={avaliacao.planosAcao}
                onChange={(e) => setAvaliacao({ ...avaliacao, planosAcao: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarAvaliacao} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Avaliacao'}
          </button>
        </div>
      </div>
    </main>
  )
}
