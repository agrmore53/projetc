'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, Plus, Trash2, Copy, Check, ChevronDown, ChevronUp, Flag, TrendingUp } from 'lucide-react'

interface KeyResult {
  id: string
  descricao: string
  metrica: string
  atual: number
  meta: number
}

interface Objective {
  id: string
  titulo: string
  descricao: string
  keyResults: KeyResult[]
  expandido: boolean
}

export default function OKRsPage() {
  const [copied, setCopied] = useState(false)
  const [trimestre, setTrimestre] = useState('Q1')
  const [ano, setAno] = useState(new Date().getFullYear())

  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: '1',
      titulo: 'Aumentar receita recorrente',
      descricao: 'Crescer o MRR de forma sustentavel',
      expandido: true,
      keyResults: [
        { id: '1', descricao: 'Aumentar MRR', metrica: 'R$', atual: 50000, meta: 80000 },
        { id: '2', descricao: 'Reduzir churn', metrica: '%', atual: 5, meta: 3 },
        { id: '3', descricao: 'Aumentar ticket medio', metrica: 'R$', atual: 500, meta: 700 },
      ]
    }
  ])

  const adicionarObjective = () => {
    const novo: Objective = {
      id: Date.now().toString(),
      titulo: 'Novo Objetivo',
      descricao: 'Descreva o objetivo',
      expandido: true,
      keyResults: [
        { id: Date.now().toString() + '1', descricao: 'Key Result 1', metrica: '', atual: 0, meta: 100 }
      ]
    }
    setObjectives([...objectives, novo])
  }

  const removerObjective = (id: string) => {
    setObjectives(objectives.filter(o => o.id !== id))
  }

  const atualizarObjective = (id: string, campo: keyof Objective, valor: unknown) => {
    setObjectives(objectives.map(o =>
      o.id === id ? { ...o, [campo]: valor } : o
    ))
  }

  const toggleExpand = (id: string) => {
    setObjectives(objectives.map(o =>
      o.id === id ? { ...o, expandido: !o.expandido } : o
    ))
  }

  const adicionarKeyResult = (objectiveId: string) => {
    setObjectives(objectives.map(o => {
      if (o.id === objectiveId) {
        return {
          ...o,
          keyResults: [...o.keyResults, {
            id: Date.now().toString(),
            descricao: 'Novo Key Result',
            metrica: '',
            atual: 0,
            meta: 100
          }]
        }
      }
      return o
    }))
  }

  const removerKeyResult = (objectiveId: string, krId: string) => {
    setObjectives(objectives.map(o => {
      if (o.id === objectiveId) {
        return {
          ...o,
          keyResults: o.keyResults.filter(kr => kr.id !== krId)
        }
      }
      return o
    }))
  }

  const atualizarKeyResult = (objectiveId: string, krId: string, campo: keyof KeyResult, valor: string | number) => {
    setObjectives(objectives.map(o => {
      if (o.id === objectiveId) {
        return {
          ...o,
          keyResults: o.keyResults.map(kr =>
            kr.id === krId ? { ...kr, [campo]: valor } : kr
          )
        }
      }
      return o
    }))
  }

  const calcularProgressoKR = (kr: KeyResult) => {
    if (kr.meta === 0) return 0
    // Para metricas onde menor e melhor (como churn)
    if (kr.meta < kr.atual && kr.descricao.toLowerCase().includes('reduzir')) {
      const progresso = ((kr.atual - kr.meta) / kr.atual) * 100
      return Math.max(0, 100 - progresso)
    }
    return Math.min((kr.atual / kr.meta) * 100, 100)
  }

  const calcularProgressoObjective = (obj: Objective) => {
    if (obj.keyResults.length === 0) return 0
    const soma = obj.keyResults.reduce((acc, kr) => acc + calcularProgressoKR(kr), 0)
    return soma / obj.keyResults.length
  }

  const progressoGeral = objectives.length > 0
    ? objectives.reduce((acc, obj) => acc + calcularProgressoObjective(obj), 0) / objectives.length
    : 0

  const getCorProgresso = (progresso: number) => {
    if (progresso >= 70) return '#22c55e'
    if (progresso >= 40) return '#eab308'
    return '#ef4444'
  }

  const copiarOKRs = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    OKRs - ${trimestre} ${ano}
═══════════════════════════════════════════════════════════════
Progresso Geral: ${progressoGeral.toFixed(0)}%

${objectives.map((obj, i) => `
───────────────────────────────────────────────────────────────
OBJETIVO ${i + 1}: ${obj.titulo}
${obj.descricao}
Progresso: ${calcularProgressoObjective(obj).toFixed(0)}%

Key Results:
${obj.keyResults.map((kr, j) => `  ${j + 1}. ${kr.descricao}
     Atual: ${kr.atual}${kr.metrica} | Meta: ${kr.meta}${kr.metrica} | Progresso: ${calcularProgressoKR(kr).toFixed(0)}%`).join('\n')}
`).join('\n')}

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
            <Target className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">OKRs</span>
          </h1>
          <p className="text-[var(--gray)]">Objetivos e Resultados-Chave</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Trimestre</label>
              <select
                value={trimestre}
                onChange={(e) => setTrimestre(e.target.value)}
                className="input-field"
              >
                <option value="Q1">Q1 (Jan-Mar)</option>
                <option value="Q2">Q2 (Abr-Jun)</option>
                <option value="Q3">Q3 (Jul-Set)</option>
                <option value="Q4">Q4 (Out-Dez)</option>
              </select>
            </div>
            <div>
              <label className="input-label">Ano</label>
              <select
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
                className="input-field"
              >
                {[2024, 2025, 2026, 2027].map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="input-label">Progresso Geral</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progressoGeral}%`,
                      backgroundColor: getCorProgresso(progressoGeral)
                    }}
                  />
                </div>
                <span className="font-display text-lg" style={{ color: getCorProgresso(progressoGeral) }}>
                  {progressoGeral.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Acoes */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={adicionarObjective} className="btn-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Objetivo
          </button>
          <button onClick={copiarOKRs} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar OKRs'}
          </button>
        </div>

        {/* Objectives */}
        <div className="space-y-6">
          {objectives.map((obj, index) => {
            const progresso = calcularProgressoObjective(obj)
            return (
              <div key={obj.id} className="glass card">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExpand(obj.id)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg"
                      style={{
                        backgroundColor: `${getCorProgresso(progresso)}20`,
                        color: getCorProgresso(progresso)
                      }}
                    >
                      O{index + 1}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={obj.titulo}
                        onChange={(e) => {
                          e.stopPropagation()
                          atualizarObjective(obj.id, 'titulo', e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-transparent border-none text-xl font-display focus:outline-none w-full"
                      />
                      <input
                        type="text"
                        value={obj.descricao}
                        onChange={(e) => {
                          e.stopPropagation()
                          atualizarObjective(obj.id, 'descricao', e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-transparent border-none text-sm text-[var(--gray)] focus:outline-none w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-display text-lg" style={{ color: getCorProgresso(progresso) }}>
                        {progresso.toFixed(0)}%
                      </p>
                      <p className="text-xs text-[var(--gray)]">{obj.keyResults.length} KRs</p>
                    </div>
                    {obj.expandido ? (
                      <ChevronUp className="w-5 h-5 text-[var(--gray)]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[var(--gray)]" />
                    )}
                  </div>
                </div>

                {obj.expandido && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Flag className="w-4 h-4 text-[var(--gold)]" />
                        Key Results
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => adicionarKeyResult(obj.id)}
                          className="text-[var(--gold)] hover:opacity-80 text-sm flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Adicionar KR
                        </button>
                        <button
                          onClick={() => removerObjective(obj.id)}
                          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Remover
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {obj.keyResults.map((kr, krIndex) => {
                        const krProgresso = calcularProgressoKR(kr)
                        return (
                          <div key={kr.id} className="bg-black/30 rounded-xl p-4">
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-[var(--gold)] font-semibold">KR{krIndex + 1}</span>
                              <input
                                type="text"
                                value={kr.descricao}
                                onChange={(e) => atualizarKeyResult(obj.id, kr.id, 'descricao', e.target.value)}
                                className="bg-transparent border-none flex-1 focus:outline-none"
                                placeholder="Descreva o key result..."
                              />
                              <button
                                onClick={() => removerKeyResult(obj.id, kr.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div>
                                <label className="text-xs text-[var(--gray)]">Atual</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={kr.atual}
                                    onChange={(e) => atualizarKeyResult(obj.id, kr.id, 'atual', Number(e.target.value))}
                                    className="input-field text-sm"
                                  />
                                  <input
                                    type="text"
                                    value={kr.metrica}
                                    onChange={(e) => atualizarKeyResult(obj.id, kr.id, 'metrica', e.target.value)}
                                    className="w-12 bg-white/10 rounded px-2 py-2 text-sm text-center"
                                    placeholder="un"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-[var(--gray)]">Meta</label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={kr.meta}
                                    onChange={(e) => atualizarKeyResult(obj.id, kr.id, 'meta', Number(e.target.value))}
                                    className="input-field text-sm"
                                  />
                                  <span className="w-12 text-center text-sm text-[var(--gray)]">{kr.metrica}</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-[var(--gray)]">Progresso</label>
                                <p className="font-display text-lg" style={{ color: getCorProgresso(krProgresso) }}>
                                  {krProgresso.toFixed(0)}%
                                </p>
                              </div>
                            </div>

                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full transition-all duration-300"
                                style={{
                                  width: `${krProgresso}%`,
                                  backgroundColor: getCorProgresso(krProgresso)
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {objectives.length === 0 && (
          <div className="glass card text-center py-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-[var(--gray)] opacity-50" />
            <p className="text-[var(--gray)]">Nenhum objetivo criado</p>
            <p className="text-sm text-[var(--gray)]">Clique em "Novo Objetivo" para comecar</p>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Criar Bons OKRs</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Objectives (O)</h4>
              <ul className="space-y-1">
                <li>• Inspiradores e ambiciosos</li>
                <li>• Qualitativos (sem numeros)</li>
                <li>• Alcancaveis em 1 trimestre</li>
                <li>• 3-5 objetivos por trimestre</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Key Results (KR)</h4>
              <ul className="space-y-1">
                <li>• Mensuraveis e quantitativos</li>
                <li>• 2-5 KRs por objetivo</li>
                <li>• Desafiadores (70% e otimo)</li>
                <li>• Resultados, nao tarefas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
