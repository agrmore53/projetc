'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Layers, Copy, Check, Plus, Trash2, Play, Pause, CheckCircle2, Circle } from 'lucide-react'

interface Task {
  id: string
  titulo: string
  responsavel: string
  pontos: number
  status: 'todo' | 'doing' | 'done'
}

interface Sprint {
  numero: number
  dataInicio: string
  dataFim: string
  meta: string
  capacidade: number
  tasks: Task[]
}

export default function SprintPlannerPage() {
  const [copied, setCopied] = useState(false)

  const [sprint, setSprint] = useState<Sprint>({
    numero: 1,
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    meta: '',
    capacidade: 40,
    tasks: [
      { id: '1', titulo: 'Implementar autenticacao', responsavel: 'Dev 1', pontos: 5, status: 'done' },
      { id: '2', titulo: 'Criar tela de dashboard', responsavel: 'Dev 2', pontos: 8, status: 'doing' },
      { id: '3', titulo: 'Integrar API de pagamentos', responsavel: 'Dev 1', pontos: 8, status: 'todo' },
      { id: '4', titulo: 'Escrever testes unitarios', responsavel: 'Dev 2', pontos: 3, status: 'todo' },
    ]
  })

  const adicionarTask = () => {
    const nova: Task = {
      id: Date.now().toString(),
      titulo: '',
      responsavel: '',
      pontos: 1,
      status: 'todo'
    }
    setSprint({ ...sprint, tasks: [...sprint.tasks, nova] })
  }

  const removerTask = (id: string) => {
    setSprint({ ...sprint, tasks: sprint.tasks.filter(t => t.id !== id) })
  }

  const atualizarTask = (id: string, campo: keyof Task, valor: string | number) => {
    setSprint({
      ...sprint,
      tasks: sprint.tasks.map(t =>
        t.id === id ? { ...t, [campo]: valor } : t
      )
    })
  }

  const moverTask = (id: string, novoStatus: Task['status']) => {
    atualizarTask(id, 'status', novoStatus)
  }

  // Metricas
  const pontosTotal = sprint.tasks.reduce((sum, t) => sum + t.pontos, 0)
  const pontosDone = sprint.tasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.pontos, 0)
  const pontosDoing = sprint.tasks.filter(t => t.status === 'doing').reduce((sum, t) => sum + t.pontos, 0)
  const progresso = pontosTotal > 0 ? (pontosDone / pontosTotal) * 100 : 0
  const velocidade = pontosDone

  const getCorStatus = (status: Task['status']) => {
    switch (status) {
      case 'done': return '#22c55e'
      case 'doing': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const tasksPorStatus = (status: Task['status']) => sprint.tasks.filter(t => t.status === status)

  const copiarSprint = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    SPRINT ${sprint.numero}
═══════════════════════════════════════════════════════════════

PERIODO: ${sprint.dataInicio} a ${sprint.dataFim}
META: ${sprint.meta || '[Nao definida]'}
CAPACIDADE: ${sprint.capacidade} pontos

PROGRESSO
───────────────────────────────────────────────────────────────
Comprometido: ${pontosTotal} pontos
Concluido: ${pontosDone} pontos (${progresso.toFixed(0)}%)
Em andamento: ${pontosDoing} pontos
A fazer: ${pontosTotal - pontosDone - pontosDoing} pontos

BACKLOG DA SPRINT
───────────────────────────────────────────────────────────────
${['done', 'doing', 'todo'].map(status => `
${status.toUpperCase()}:
${tasksPorStatus(status as Task['status']).map(t =>
  `  [${t.pontos}pts] ${t.titulo} - ${t.responsavel}`
).join('\n') || '  (vazio)'}
`).join('')}

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

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Sprint</span> Planner
          </h1>
          <p className="text-[var(--gray)]">Planeje e acompanhe suas sprints</p>
        </div>

        {/* Config Sprint */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="input-label">Sprint</label>
              <input
                type="number"
                value={sprint.numero}
                onChange={(e) => setSprint({ ...sprint, numero: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <label className="input-label">Inicio</label>
              <input
                type="date"
                value={sprint.dataInicio}
                onChange={(e) => setSprint({ ...sprint, dataInicio: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Fim</label>
              <input
                type="date"
                value={sprint.dataFim}
                onChange={(e) => setSprint({ ...sprint, dataFim: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Capacidade (pts)</label>
              <input
                type="number"
                value={sprint.capacidade}
                onChange={(e) => setSprint({ ...sprint, capacidade: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div className="flex items-end">
              <button onClick={copiarSprint} className="btn-primary w-full flex items-center justify-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="input-label">Meta da Sprint</label>
            <input
              type="text"
              value={sprint.meta}
              onChange={(e) => setSprint({ ...sprint, meta: e.target.value })}
              placeholder="O que queremos entregar nesta sprint?"
              className="input-field"
            />
          </div>
        </div>

        {/* Metricas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Comprometido</p>
            <p className="font-display text-3xl text-[var(--gold)]">{pontosTotal}</p>
            <p className="text-xs text-[var(--gray)]">de {sprint.capacidade} pts</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Concluido</p>
            <p className="font-display text-3xl text-green-400">{pontosDone}</p>
            <p className="text-xs text-[var(--gray)]">{progresso.toFixed(0)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Em Andamento</p>
            <p className="font-display text-3xl text-blue-400">{pontosDoing}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">A Fazer</p>
            <p className="font-display text-3xl text-gray-400">{pontosTotal - pontosDone - pontosDoing}</p>
          </div>
        </div>

        {/* Burndown Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Progresso da Sprint</h2>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progresso}%` }}
            />
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${pontosTotal > 0 ? (pontosDoing / pontosTotal) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--gray)] mt-2">
            <span>0%</span>
            <span>{progresso.toFixed(0)}% concluido</span>
            <span>100%</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { status: 'todo' as const, label: 'A Fazer', icon: Circle },
            { status: 'doing' as const, label: 'Em Andamento', icon: Play },
            { status: 'done' as const, label: 'Concluido', icon: CheckCircle2 },
          ].map((col) => {
            const Icon = col.icon
            const tasks = tasksPorStatus(col.status)
            const pontosCol = tasks.reduce((sum, t) => sum + t.pontos, 0)

            return (
              <div key={col.status} className="glass card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" style={{ color: getCorStatus(col.status) }} />
                    <h3 className="font-display">{col.label}</h3>
                  </div>
                  <span className="text-sm text-[var(--gray)]">{pontosCol} pts</span>
                </div>

                <div className="space-y-3 min-h-[200px]">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-black/30 rounded-xl p-3"
                      style={{ borderLeft: `3px solid ${getCorStatus(task.status)}` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <input
                          type="text"
                          value={task.titulo}
                          onChange={(e) => atualizarTask(task.id, 'titulo', e.target.value)}
                          placeholder="Titulo da tarefa"
                          className="bg-transparent border-none text-sm font-semibold focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => removerTask(task.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <input
                          type="text"
                          value={task.responsavel}
                          onChange={(e) => atualizarTask(task.id, 'responsavel', e.target.value)}
                          placeholder="Responsavel"
                          className="bg-white/10 rounded px-2 py-1 flex-1 text-[var(--gray)]"
                        />
                        <input
                          type="number"
                          value={task.pontos}
                          onChange={(e) => atualizarTask(task.id, 'pontos', Number(e.target.value))}
                          className="bg-white/10 rounded px-2 py-1 w-12 text-center"
                          min="1"
                        />
                        <span className="text-[var(--gray)]">pts</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {col.status !== 'todo' && (
                          <button
                            onClick={() => moverTask(task.id, col.status === 'done' ? 'doing' : 'todo')}
                            className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                          >
                            ←
                          </button>
                        )}
                        {col.status !== 'done' && (
                          <button
                            onClick={() => moverTask(task.id, col.status === 'todo' ? 'doing' : 'done')}
                            className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {col.status === 'todo' && (
                  <button
                    onClick={adicionarTask}
                    className="w-full mt-4 text-[var(--gold)] text-sm hover:opacity-80 flex items-center justify-center gap-1 py-2 border border-dashed border-[var(--gold)]/30 rounded-xl"
                  >
                    <Plus className="w-4 h-4" /> Nova Tarefa
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de Sprint</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Proteja a Sprint</h4>
              <p>Nao adicione itens apos o planejamento. Se algo urgente surgir, troque por outra task.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Tamanho Certo</h4>
              <p>Tasks de mais de 8 pontos sao muito grandes. Quebre em partes menores.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Daily Standup</h4>
              <p>15 minutos diarios: o que fiz, o que vou fazer, bloqueios. Nao e reuniao de status.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Meta Clara</h4>
              <p>A meta da sprint deve ser uma frase que todos entendem e podem explicar.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
