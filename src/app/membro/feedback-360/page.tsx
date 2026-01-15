'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users2, Copy, Check } from 'lucide-react'

interface Avaliador {
  id: string
  nome: string
  relacao: string
}

interface Competencia {
  nome: string
  nota: number
  comentario: string
}

export default function Feedback360Page() {
  const [copied, setCopied] = useState(false)

  const [feedback, setFeedback] = useState({
    avaliado: '',
    cargo: '',
    departamento: '',
    periodo: '',
    avaliadores: [
      { id: '1', nome: '', relacao: 'gestor' },
      { id: '2', nome: '', relacao: 'par' },
      { id: '3', nome: '', relacao: 'par' },
      { id: '4', nome: '', relacao: 'subordinado' },
    ] as Avaliador[],
    competencias: [
      { nome: 'Comunicacao', nota: 4, comentario: '' },
      { nome: 'Trabalho em Equipe', nota: 4, comentario: '' },
      { nome: 'Lideranca', nota: 3, comentario: '' },
      { nome: 'Resolucao de Problemas', nota: 4, comentario: '' },
      { nome: 'Orientacao a Resultados', nota: 4, comentario: '' },
      { nome: 'Adaptabilidade', nota: 3, comentario: '' },
      { nome: 'Gestao do Tempo', nota: 3, comentario: '' },
      { nome: 'Conhecimento Tecnico', nota: 4, comentario: '' },
    ] as Competencia[],
    pontosFortes: '',
    areasDesenvolvimento: '',
    acoes: ''
  })

  const relacoes = [
    { value: 'gestor', label: 'Gestor' },
    { value: 'par', label: 'Par/Colega' },
    { value: 'subordinado', label: 'Subordinado' },
    { value: 'cliente', label: 'Cliente' },
    { value: 'auto', label: 'Autoavaliacao' },
  ]

  const atualizarCompetencia = (index: number, campo: keyof Competencia, valor: string | number) => {
    setFeedback({
      ...feedback,
      competencias: feedback.competencias.map((c, i) =>
        i === index ? { ...c, [campo]: valor } : c
      )
    })
  }

  const atualizarAvaliador = (id: string, campo: keyof Avaliador, valor: string) => {
    setFeedback({
      ...feedback,
      avaliadores: feedback.avaliadores.map(a =>
        a.id === id ? { ...a, [campo]: valor } : a
      )
    })
  }

  const mediaGeral = feedback.competencias.reduce((sum, c) => sum + c.nota, 0) / feedback.competencias.length

  const getCorNota = (nota: number) => {
    if (nota >= 4) return 'text-green-400'
    if (nota >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getDescricaoNota = (nota: number) => {
    switch (nota) {
      case 5: return 'Excepcional'
      case 4: return 'Acima do Esperado'
      case 3: return 'Atende Expectativas'
      case 2: return 'Abaixo do Esperado'
      case 1: return 'Insatisfatorio'
      default: return ''
    }
  }

  const gerarFeedback = () => {
    return `
FEEDBACK 360 GRAUS
═══════════════════════════════════════════════════════════════

INFORMACOES DO AVALIADO
─────────────────────────────────────────────────────────────
Nome: ${feedback.avaliado || '[NOME]'}
Cargo: ${feedback.cargo || '[CARGO]'}
Departamento: ${feedback.departamento || '[DEPARTAMENTO]'}
Periodo: ${feedback.periodo || '[PERIODO]'}

AVALIADORES
─────────────────────────────────────────────────────────────
${feedback.avaliadores.filter(a => a.nome).map(a => {
  const relLabel = relacoes.find(r => r.value === a.relacao)?.label || ''
  return `• ${a.nome} (${relLabel})`
}).join('\n')}

═══════════════════════════════════════════════════════════════
                    RESULTADOS
═══════════════════════════════════════════════════════════════

MEDIA GERAL: ${mediaGeral.toFixed(1)}/5 - ${getDescricaoNota(Math.round(mediaGeral))}

AVALIACAO POR COMPETENCIA
─────────────────────────────────────────────────────────────
${feedback.competencias.map(c => {
  const barra = '█'.repeat(c.nota) + '░'.repeat(5 - c.nota)
  return `${c.nome.padEnd(25)} ${barra} ${c.nota}/5 (${getDescricaoNota(c.nota)})${c.comentario ? `\n   → ${c.comentario}` : ''}`
}).join('\n\n')}

PONTOS FORTES
─────────────────────────────────────────────────────────────
${feedback.pontosFortes || `• [Ponto forte 1]
• [Ponto forte 2]
• [Ponto forte 3]`}

AREAS DE DESENVOLVIMENTO
─────────────────────────────────────────────────────────────
${feedback.areasDesenvolvimento || `• [Area 1]
• [Area 2]
• [Area 3]`}

PLANO DE ACAO
─────────────────────────────────────────────────────────────
${feedback.acoes || `1. [Acao] - Prazo: [Data]
2. [Acao] - Prazo: [Data]
3. [Acao] - Prazo: [Data]`}

═══════════════════════════════════════════════════════════════
ESCALA DE AVALIACAO
═══════════════════════════════════════════════════════════════
5 - Excepcional: Supera consistentemente as expectativas
4 - Acima do Esperado: Frequentemente supera expectativas
3 - Atende Expectativas: Cumpre o que e esperado
2 - Abaixo do Esperado: Precisa melhorar
1 - Insatisfatorio: Nao atende expectativas minimas

═══════════════════════════════════════════════════════════════
Avaliacao gerada em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarFeedback = () => {
    navigator.clipboard.writeText(gerarFeedback())
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
            <Users2 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Feedback 360</span>
          </h1>
          <p className="text-[var(--gray)]">Avaliacao de multiplas perspectivas</p>
        </div>

        {/* Media Geral */}
        <div className="glass card mb-8 text-center">
          <p className="text-sm text-[var(--gray)]">Media Geral</p>
          <p className={`font-display text-5xl ${getCorNota(mediaGeral)}`}>{mediaGeral.toFixed(1)}</p>
          <p className={`text-lg ${getCorNota(mediaGeral)}`}>{getDescricaoNota(Math.round(mediaGeral))}</p>
        </div>

        {/* Info do Avaliado */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Avaliado</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Nome</label>
              <input
                type="text"
                value={feedback.avaliado}
                onChange={(e) => setFeedback({ ...feedback, avaliado: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cargo</label>
              <input
                type="text"
                value={feedback.cargo}
                onChange={(e) => setFeedback({ ...feedback, cargo: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Departamento</label>
              <input
                type="text"
                value={feedback.departamento}
                onChange={(e) => setFeedback({ ...feedback, departamento: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Periodo</label>
              <input
                type="text"
                value={feedback.periodo}
                onChange={(e) => setFeedback({ ...feedback, periodo: e.target.value })}
                className="input-field"
                placeholder="Q1 2024"
              />
            </div>
          </div>
        </div>

        {/* Avaliadores */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Avaliadores</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {feedback.avaliadores.map(avaliador => (
              <div key={avaliador.id} className="flex gap-2">
                <input
                  type="text"
                  value={avaliador.nome}
                  onChange={(e) => atualizarAvaliador(avaliador.id, 'nome', e.target.value)}
                  className="input-field flex-1"
                  placeholder="Nome do avaliador"
                />
                <select
                  value={avaliador.relacao}
                  onChange={(e) => atualizarAvaliador(avaliador.id, 'relacao', e.target.value)}
                  className="input-field w-36"
                >
                  {relacoes.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Competencias */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Competencias</h2>
          <div className="space-y-4">
            {feedback.competencias.map((comp, index) => (
              <div key={index} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{comp.nome}</span>
                  <span className={`font-display text-xl ${getCorNota(comp.nota)}`}>
                    {comp.nota}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={comp.nota}
                  onChange={(e) => atualizarCompetencia(index, 'nota', Number(e.target.value))}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-xs text-[var(--gray)] mb-2">
                  <span>Insatisfatorio</span>
                  <span>Excepcional</span>
                </div>
                <input
                  type="text"
                  value={comp.comentario}
                  onChange={(e) => atualizarCompetencia(index, 'comentario', e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full text-sm"
                  placeholder="Comentario (opcional)"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Resumo e Plano de Acao</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Pontos Fortes</label>
              <textarea
                value={feedback.pontosFortes}
                onChange={(e) => setFeedback({ ...feedback, pontosFortes: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Ponto forte 1&#10;• Ponto forte 2"
              />
            </div>
            <div>
              <label className="input-label">Areas de Desenvolvimento</label>
              <textarea
                value={feedback.areasDesenvolvimento}
                onChange={(e) => setFeedback({ ...feedback, areasDesenvolvimento: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Area 1&#10;• Area 2"
              />
            </div>
            <div>
              <label className="input-label">Plano de Acao</label>
              <textarea
                value={feedback.acoes}
                onChange={(e) => setFeedback({ ...feedback, acoes: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="1. Acao - Prazo"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarFeedback} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Feedback'}
          </button>
        </div>
      </div>
    </main>
  )
}
