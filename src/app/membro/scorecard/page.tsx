'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ClipboardList, Copy, Check, Plus, Trash2, Star } from 'lucide-react'

interface Criterio {
  id: string
  nome: string
  peso: number
  nota: number
  observacoes: string
}

interface Candidato {
  nome: string
  vaga: string
  data: string
  entrevistador: string
  criterios: Criterio[]
  pontosFortes: string
  pontosAtencao: string
  decisao: 'aprovar' | 'reprovar' | 'pendente'
  comentarioFinal: string
}

export default function ScorecardPage() {
  const [copied, setCopied] = useState(false)

  const criteriosPadrao: Criterio[] = [
    { id: '1', nome: 'Competencia Tecnica', peso: 25, nota: 0, observacoes: '' },
    { id: '2', nome: 'Experiencia Relevante', peso: 20, nota: 0, observacoes: '' },
    { id: '3', nome: 'Fit Cultural', peso: 20, nota: 0, observacoes: '' },
    { id: '4', nome: 'Comunicacao', peso: 15, nota: 0, observacoes: '' },
    { id: '5', nome: 'Motivacao/Energia', peso: 10, nota: 0, observacoes: '' },
    { id: '6', nome: 'Potencial de Crescimento', peso: 10, nota: 0, observacoes: '' },
  ]

  const [candidato, setCandidato] = useState<Candidato>({
    nome: '',
    vaga: '',
    data: new Date().toISOString().split('T')[0],
    entrevistador: '',
    criterios: criteriosPadrao,
    pontosFortes: '',
    pontosAtencao: '',
    decisao: 'pendente',
    comentarioFinal: ''
  })

  const atualizarCriterio = (id: string, campo: keyof Criterio, valor: string | number) => {
    setCandidato({
      ...candidato,
      criterios: candidato.criterios.map(c =>
        c.id === id ? { ...c, [campo]: valor } : c
      )
    })
  }

  const adicionarCriterio = () => {
    const novo: Criterio = {
      id: Date.now().toString(),
      nome: 'Novo Criterio',
      peso: 10,
      nota: 0,
      observacoes: ''
    }
    setCandidato({
      ...candidato,
      criterios: [...candidato.criterios, novo]
    })
  }

  const removerCriterio = (id: string) => {
    setCandidato({
      ...candidato,
      criterios: candidato.criterios.filter(c => c.id !== id)
    })
  }

  const calcularNotaFinal = () => {
    const totalPeso = candidato.criterios.reduce((sum, c) => sum + c.peso, 0)
    if (totalPeso === 0) return 0
    const notaPonderada = candidato.criterios.reduce((sum, c) => sum + (c.nota * c.peso), 0)
    return notaPonderada / totalPeso
  }

  const notaFinal = calcularNotaFinal()

  const getCorNota = (nota: number) => {
    if (nota >= 4) return '#22c55e'
    if (nota >= 3) return '#eab308'
    if (nota >= 2) return '#f97316'
    return '#ef4444'
  }

  const getRecomendacao = (nota: number) => {
    if (nota >= 4) return 'Forte Recomendacao para Contratar'
    if (nota >= 3.5) return 'Recomendacao para Contratar'
    if (nota >= 3) return 'Contratar com Ressalvas'
    if (nota >= 2) return 'Nao Recomendado'
    return 'Forte Nao Recomendacao'
  }

  const copiarScorecard = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    SCORECARD DE ENTREVISTA
═══════════════════════════════════════════════════════════════

CANDIDATO: ${candidato.nome || '[Nome]'}
VAGA: ${candidato.vaga || '[Vaga]'}
DATA: ${candidato.data}
ENTREVISTADOR: ${candidato.entrevistador || '[Entrevistador]'}

AVALIACAO POR CRITERIO
───────────────────────────────────────────────────────────────
${candidato.criterios.map(c => `
${c.nome} (Peso: ${c.peso}%)
Nota: ${'★'.repeat(c.nota)}${'☆'.repeat(5 - c.nota)} (${c.nota}/5)
${c.observacoes ? `Obs: ${c.observacoes}` : ''}
`).join('')}

NOTA FINAL: ${notaFinal.toFixed(1)}/5
RECOMENDACAO: ${getRecomendacao(notaFinal)}

PONTOS FORTES
───────────────────────────────────────────────────────────────
${candidato.pontosFortes || '[Nao preenchido]'}

PONTOS DE ATENCAO
───────────────────────────────────────────────────────────────
${candidato.pontosAtencao || '[Nao preenchido]'}

DECISAO: ${candidato.decisao === 'aprovar' ? '✅ APROVAR' : candidato.decisao === 'reprovar' ? '❌ REPROVAR' : '⏳ PENDENTE'}

COMENTARIO FINAL
───────────────────────────────────────────────────────────────
${candidato.comentarioFinal || '[Nao preenchido]'}

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

      <div className="max-w-4xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Scorecard</span> de Entrevista
          </h1>
          <p className="text-[var(--gray)]">Avalie candidatos de forma estruturada</p>
        </div>

        {/* Info Basica */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Candidato</label>
              <input
                type="text"
                value={candidato.nome}
                onChange={(e) => setCandidato({ ...candidato, nome: e.target.value })}
                placeholder="Nome completo"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Vaga</label>
              <input
                type="text"
                value={candidato.vaga}
                onChange={(e) => setCandidato({ ...candidato, vaga: e.target.value })}
                placeholder="Titulo da vaga"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data da Entrevista</label>
              <input
                type="date"
                value={candidato.data}
                onChange={(e) => setCandidato({ ...candidato, data: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Entrevistador</label>
              <input
                type="text"
                value={candidato.entrevistador}
                onChange={(e) => setCandidato({ ...candidato, entrevistador: e.target.value })}
                placeholder="Seu nome"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Nota Final */}
        <div className="glass card mb-8 text-center" style={{ borderColor: getCorNota(notaFinal), borderWidth: 2 }}>
          <p className="text-sm text-[var(--gray)] mb-2">Nota Final</p>
          <p className="font-display text-5xl mb-2" style={{ color: getCorNota(notaFinal) }}>
            {notaFinal.toFixed(1)}/5
          </p>
          <p className="font-semibold" style={{ color: getCorNota(notaFinal) }}>
            {getRecomendacao(notaFinal)}
          </p>
        </div>

        {/* Criterios */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Criterios de Avaliacao</h2>
            <button onClick={adicionarCriterio} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>

          <div className="space-y-6">
            {candidato.criterios.map((criterio) => (
              <div key={criterio.id} className="bg-black/30 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <input
                        type="text"
                        value={criterio.nome}
                        onChange={(e) => atualizarCriterio(criterio.id, 'nome', e.target.value)}
                        className="input-field text-sm font-semibold"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-[var(--gray)]">Peso:</label>
                        <input
                          type="number"
                          value={criterio.peso}
                          onChange={(e) => atualizarCriterio(criterio.id, 'peso', Number(e.target.value))}
                          className="input-field text-sm w-20"
                          min="0"
                          max="100"
                        />
                        <span className="text-xs text-[var(--gray)]">%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((nota) => (
                          <button
                            key={nota}
                            onClick={() => atualizarCriterio(criterio.id, 'nota', nota)}
                            className="p-1 transition-all"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                nota <= criterio.nota
                                  ? 'fill-[var(--gold)] text-[var(--gold)]'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm font-semibold" style={{ color: getCorNota(criterio.nota) }}>
                          {criterio.nota}/5
                        </span>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={criterio.observacoes}
                      onChange={(e) => atualizarCriterio(criterio.id, 'observacoes', e.target.value)}
                      placeholder="Observacoes sobre este criterio..."
                      className="input-field text-sm w-full"
                    />
                  </div>
                  {candidato.criterios.length > 1 && (
                    <button onClick={() => removerCriterio(criterio.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pontos Fortes e Atencao */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass card">
            <label className="input-label text-green-400">Pontos Fortes</label>
            <textarea
              value={candidato.pontosFortes}
              onChange={(e) => setCandidato({ ...candidato, pontosFortes: e.target.value })}
              placeholder="O que se destacou positivamente..."
              className="input-field min-h-[120px]"
            />
          </div>
          <div className="glass card">
            <label className="input-label text-yellow-400">Pontos de Atencao</label>
            <textarea
              value={candidato.pontosAtencao}
              onChange={(e) => setCandidato({ ...candidato, pontosAtencao: e.target.value })}
              placeholder="O que precisa ser desenvolvido ou validado..."
              className="input-field min-h-[120px]"
            />
          </div>
        </div>

        {/* Decisao */}
        <div className="glass card mb-8">
          <label className="input-label">Decisao</label>
          <div className="flex gap-4 mb-4">
            {[
              { value: 'aprovar', label: 'Aprovar', cor: '#22c55e' },
              { value: 'pendente', label: 'Pendente', cor: '#eab308' },
              { value: 'reprovar', label: 'Reprovar', cor: '#ef4444' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCandidato({ ...candidato, decisao: opt.value as Candidato['decisao'] })}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  candidato.decisao === opt.value
                    ? 'text-black'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: candidato.decisao === opt.value ? opt.cor : undefined
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <label className="input-label">Comentario Final</label>
          <textarea
            value={candidato.comentarioFinal}
            onChange={(e) => setCandidato({ ...candidato, comentarioFinal: e.target.value })}
            placeholder="Resumo da sua avaliacao e recomendacao..."
            className="input-field min-h-[100px]"
          />
        </div>

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarScorecard} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Scorecard Copiado!' : 'Copiar Scorecard'}
          </button>
        </div>

        {/* Legenda */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Escala de Avaliacao</h3>
          <div className="grid grid-cols-5 gap-4 text-sm text-center">
            <div><span className="text-red-400 font-bold">1</span><br/>Insuficiente</div>
            <div><span className="text-orange-400 font-bold">2</span><br/>Abaixo</div>
            <div><span className="text-yellow-400 font-bold">3</span><br/>Adequado</div>
            <div><span className="text-lime-400 font-bold">4</span><br/>Bom</div>
            <div><span className="text-green-400 font-bold">5</span><br/>Excelente</div>
          </div>
        </div>
      </div>
    </main>
  )
}
