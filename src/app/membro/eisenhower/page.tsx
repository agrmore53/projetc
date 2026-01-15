'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Grid2X2, Copy, Check, Plus, Trash2, GripVertical } from 'lucide-react'

interface Tarefa {
  id: string
  texto: string
  quadrante: 'urgente_importante' | 'nao_urgente_importante' | 'urgente_nao_importante' | 'nao_urgente_nao_importante'
}

export default function EisenhowerPage() {
  const [copied, setCopied] = useState(false)
  const [novaTarefa, setNovaTarefa] = useState('')
  const [quadranteSelecionado, setQuadranteSelecionado] = useState<Tarefa['quadrante']>('urgente_importante')

  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', texto: 'Resolver bug critico em producao', quadrante: 'urgente_importante' },
    { id: '2', texto: 'Reuniao com cliente estrategico', quadrante: 'urgente_importante' },
    { id: '3', texto: 'Planejar roadmap do proximo trimestre', quadrante: 'nao_urgente_importante' },
    { id: '4', texto: 'Estudar nova tecnologia', quadrante: 'nao_urgente_importante' },
    { id: '5', texto: 'Responder emails operacionais', quadrante: 'urgente_nao_importante' },
    { id: '6', texto: 'Reuniao de alinhamento semanal', quadrante: 'urgente_nao_importante' },
    { id: '7', texto: 'Organizar arquivos antigos', quadrante: 'nao_urgente_nao_importante' },
    { id: '8', texto: 'Revisar relatorios historicos', quadrante: 'nao_urgente_nao_importante' },
  ])

  // Persistencia
  useEffect(() => {
    const saved = localStorage.getItem('eisenhower_tarefas')
    if (saved) {
      setTarefas(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('eisenhower_tarefas', JSON.stringify(tarefas))
  }, [tarefas])

  const quadrantes = {
    urgente_importante: {
      titulo: 'Fazer Agora',
      subtitulo: 'Urgente + Importante',
      cor: 'border-red-500',
      bgCor: 'bg-red-500/10',
      textCor: 'text-red-400',
      descricao: 'Crises, deadlines, problemas criticos'
    },
    nao_urgente_importante: {
      titulo: 'Agendar',
      subtitulo: 'Nao Urgente + Importante',
      cor: 'border-green-500',
      bgCor: 'bg-green-500/10',
      textCor: 'text-green-400',
      descricao: 'Planejamento, desenvolvimento, prevencao'
    },
    urgente_nao_importante: {
      titulo: 'Delegar',
      subtitulo: 'Urgente + Nao Importante',
      cor: 'border-yellow-500',
      bgCor: 'bg-yellow-500/10',
      textCor: 'text-yellow-400',
      descricao: 'Interrupcoes, reunioes, alguns emails'
    },
    nao_urgente_nao_importante: {
      titulo: 'Eliminar',
      subtitulo: 'Nao Urgente + Nao Importante',
      cor: 'border-gray-500',
      bgCor: 'bg-gray-500/10',
      textCor: 'text-gray-400',
      descricao: 'Distracao, tempo perdido, trivialidades'
    }
  }

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, {
        id: Date.now().toString(),
        texto: novaTarefa.trim(),
        quadrante: quadranteSelecionado
      }])
      setNovaTarefa('')
    }
  }

  const removerTarefa = (id: string) => {
    setTarefas(tarefas.filter(t => t.id !== id))
  }

  const moverTarefa = (id: string, novoQuadrante: Tarefa['quadrante']) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, quadrante: novoQuadrante } : t
    ))
  }

  const getTarefasPorQuadrante = (quadrante: Tarefa['quadrante']) => {
    return tarefas.filter(t => t.quadrante === quadrante)
  }

  const gerarMatriz = () => {
    return `
MATRIZ DE EISENHOWER
═══════════════════════════════════════════════════════════════

                    URGENTE              NAO URGENTE
              ─────────────────────────────────────────────────
              │                        │                      │
  IMPORTANTE  │    FAZER AGORA         │      AGENDAR         │
              │                        │                      │
              │ ${getTarefasPorQuadrante('urgente_importante').map(t => t.texto).join('\n              │ ') || '(vazio)'}
              │                        │ ${getTarefasPorQuadrante('nao_urgente_importante').map(t => t.texto).join('\n              │                        │ ') || '(vazio)'}
              │                        │                      │
              ─────────────────────────────────────────────────
              │                        │                      │
  NAO         │      DELEGAR           │      ELIMINAR        │
  IMPORTANTE  │                        │                      │
              │ ${getTarefasPorQuadrante('urgente_nao_importante').map(t => t.texto).join('\n              │ ') || '(vazio)'}
              │                        │ ${getTarefasPorQuadrante('nao_urgente_nao_importante').map(t => t.texto).join('\n              │                        │ ') || '(vazio)'}
              │                        │                      │
              ─────────────────────────────────────────────────

RESUMO
─────────────────────────────────────────────────────────────
Fazer Agora: ${getTarefasPorQuadrante('urgente_importante').length} tarefas
Agendar: ${getTarefasPorQuadrante('nao_urgente_importante').length} tarefas
Delegar: ${getTarefasPorQuadrante('urgente_nao_importante').length} tarefas
Eliminar: ${getTarefasPorQuadrante('nao_urgente_nao_importante').length} tarefas
Total: ${tarefas.length} tarefas

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarMatriz = () => {
    navigator.clipboard.writeText(gerarMatriz())
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
            <Grid2X2 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Matriz de <span className="gold-text">Eisenhower</span>
          </h1>
          <p className="text-[var(--gray)]">Priorize tarefas por urgencia e importancia</p>
        </div>

        {/* Adicionar Tarefa */}
        <div className="glass card mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && adicionarTarefa()}
              placeholder="Nova tarefa..."
              className="input-field flex-1"
            />
            <select
              value={quadranteSelecionado}
              onChange={(e) => setQuadranteSelecionado(e.target.value as Tarefa['quadrante'])}
              className="input-field md:w-48"
            >
              {Object.entries(quadrantes).map(([key, q]) => (
                <option key={key} value={key}>{q.titulo}</option>
              ))}
            </select>
            <button onClick={adicionarTarefa} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>

        {/* Matriz 2x2 */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {(Object.entries(quadrantes) as [Tarefa['quadrante'], typeof quadrantes[keyof typeof quadrantes]][]).map(([key, q]) => (
            <div key={key} className={`glass card border-2 ${q.cor} ${q.bgCor}`}>
              <div className="mb-4">
                <h2 className={`font-display text-xl ${q.textCor}`}>{q.titulo}</h2>
                <p className="text-xs text-[var(--gray)]">{q.subtitulo}</p>
                <p className="text-xs text-[var(--gray)] italic mt-1">{q.descricao}</p>
              </div>

              <div className="space-y-2 min-h-[120px]">
                {getTarefasPorQuadrante(key).map((tarefa) => (
                  <div key={tarefa.id} className="flex items-center gap-2 bg-black/30 rounded-lg p-2 group">
                    <span className="flex-1 text-sm">{tarefa.texto}</span>
                    <select
                      value={tarefa.quadrante}
                      onChange={(e) => moverTarefa(tarefa.id, e.target.value as Tarefa['quadrante'])}
                      className="opacity-0 group-hover:opacity-100 bg-black/50 border border-white/20 rounded text-xs px-1 py-0.5 transition-opacity"
                    >
                      {Object.entries(quadrantes).map(([k, v]) => (
                        <option key={k} value={k}>{v.titulo}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removerTarefa(tarefa.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {getTarefasPorQuadrante(key).length === 0 && (
                  <p className="text-sm text-[var(--gray)] text-center py-4 italic">
                    Nenhuma tarefa
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="text-xs text-[var(--gray)]">
                  {getTarefasPorQuadrante(key).length} tarefa(s)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarMatriz} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Matriz'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Usar a Matriz</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Regras de Ouro</h4>
              <ul className="space-y-1">
                <li>• Foque 80% do tempo no Q2 (Agendar)</li>
                <li>• Q1 deve ser minimizado com planejamento</li>
                <li>• Delegue ou automatize o Q3</li>
                <li>• Elimine implacavelmente o Q4</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Perguntas Chave</h4>
              <ul className="space-y-1">
                <li>• Isso me aproxima dos meus objetivos?</li>
                <li>• O que acontece se eu nao fizer?</li>
                <li>• Outra pessoa pode fazer isso?</li>
                <li>• Isso realmente precisa ser feito?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
