'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Copy, Check, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

interface Tarefa {
  id: string
  titulo: string
  responsavel: string
  prazo: string
  concluida: boolean
}

interface Semana {
  numero: number
  titulo: string
  tarefas: Tarefa[]
}

export default function OnboardingFuncionarioPage() {
  const [copied, setCopied] = useState(false)
  const [funcionario, setFuncionario] = useState('')
  const [cargo, setCargo] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [gestor, setGestor] = useState('')

  const [semanas, setSemanas] = useState<Semana[]>([
    {
      numero: 1,
      titulo: 'Integracao e Setup',
      tarefas: [
        { id: '1', titulo: 'Enviar kit de boas-vindas (laptop, acessos)', responsavel: 'RH', prazo: 'Dia 1', concluida: false },
        { id: '2', titulo: 'Criar contas: email, Slack, ferramentas', responsavel: 'TI', prazo: 'Dia 1', concluida: false },
        { id: '3', titulo: 'Reuniao de boas-vindas com gestor', responsavel: 'Gestor', prazo: 'Dia 1', concluida: false },
        { id: '4', titulo: 'Apresentar a equipe', responsavel: 'Gestor', prazo: 'Dia 1', concluida: false },
        { id: '5', titulo: 'Explicar cultura e valores da empresa', responsavel: 'RH', prazo: 'Dia 2', concluida: false },
        { id: '6', titulo: 'Tour pelo produto/servico', responsavel: 'Produto', prazo: 'Dia 2-3', concluida: false },
        { id: '7', titulo: 'Definir expectativas e metas do primeiro mes', responsavel: 'Gestor', prazo: 'Dia 3', concluida: false },
      ]
    },
    {
      numero: 2,
      titulo: 'Imersao e Aprendizado',
      tarefas: [
        { id: '8', titulo: 'Treinamento sobre processos internos', responsavel: 'Gestor', prazo: 'Semana 2', concluida: false },
        { id: '9', titulo: 'Shadow com colega experiente', responsavel: 'Buddy', prazo: 'Semana 2', concluida: false },
        { id: '10', titulo: 'Leitura de documentacao essencial', responsavel: 'Novo', prazo: 'Semana 2', concluida: false },
        { id: '11', titulo: 'Primeira tarefa supervisionada', responsavel: 'Novo', prazo: 'Semana 2', concluida: false },
        { id: '12', titulo: 'Check-in com gestor (30min)', responsavel: 'Gestor', prazo: 'Final Semana 2', concluida: false },
      ]
    },
    {
      numero: 3,
      titulo: 'Primeiras Entregas',
      tarefas: [
        { id: '13', titulo: 'Assumir primeiras responsabilidades', responsavel: 'Novo', prazo: 'Semana 3', concluida: false },
        { id: '14', titulo: 'Participar de reunioes de equipe', responsavel: 'Novo', prazo: 'Semana 3', concluida: false },
        { id: '15', titulo: 'Feedback do buddy/mentor', responsavel: 'Buddy', prazo: 'Semana 3', concluida: false },
        { id: '16', titulo: '1:1 com gestor - ajustar expectativas', responsavel: 'Gestor', prazo: 'Final Semana 3', concluida: false },
      ]
    },
    {
      numero: 4,
      titulo: 'Autonomia',
      tarefas: [
        { id: '17', titulo: 'Executar tarefas com autonomia', responsavel: 'Novo', prazo: 'Semana 4', concluida: false },
        { id: '18', titulo: 'Identificar gaps e solicitar treinamentos', responsavel: 'Novo', prazo: 'Semana 4', concluida: false },
        { id: '19', titulo: 'Avaliacao do primeiro mes', responsavel: 'Gestor', prazo: 'Dia 30', concluida: false },
        { id: '20', titulo: 'Definir OKRs/metas do proximo trimestre', responsavel: 'Gestor + Novo', prazo: 'Dia 30', concluida: false },
        { id: '21', titulo: 'Coletar feedback sobre onboarding', responsavel: 'RH', prazo: 'Dia 30', concluida: false },
      ]
    },
  ])

  const toggleTarefa = (semanaNum: number, tarefaId: string) => {
    setSemanas(semanas.map(s =>
      s.numero === semanaNum
        ? {
            ...s,
            tarefas: s.tarefas.map(t =>
              t.id === tarefaId ? { ...t, concluida: !t.concluida } : t
            )
          }
        : s
    ))
  }

  const adicionarTarefa = (semanaNum: number) => {
    setSemanas(semanas.map(s =>
      s.numero === semanaNum
        ? {
            ...s,
            tarefas: [...s.tarefas, {
              id: Date.now().toString(),
              titulo: '',
              responsavel: '',
              prazo: '',
              concluida: false
            }]
          }
        : s
    ))
  }

  const atualizarTarefa = (semanaNum: number, tarefaId: string, campo: keyof Tarefa, valor: string | boolean) => {
    setSemanas(semanas.map(s =>
      s.numero === semanaNum
        ? {
            ...s,
            tarefas: s.tarefas.map(t =>
              t.id === tarefaId ? { ...t, [campo]: valor } : t
            )
          }
        : s
    ))
  }

  const removerTarefa = (semanaNum: number, tarefaId: string) => {
    setSemanas(semanas.map(s =>
      s.numero === semanaNum
        ? { ...s, tarefas: s.tarefas.filter(t => t.id !== tarefaId) }
        : s
    ))
  }

  const totalTarefas = semanas.reduce((sum, s) => sum + s.tarefas.length, 0)
  const tarefasConcluidas = semanas.reduce((sum, s) => sum + s.tarefas.filter(t => t.concluida).length, 0)
  const progresso = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0

  const copiarPlano = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
           PLANO DE ONBOARDING - PRIMEIROS 30 DIAS
═══════════════════════════════════════════════════════════════

FUNCIONARIO: ${funcionario || '[Nome]'}
CARGO: ${cargo || '[Cargo]'}
DATA INICIO: ${dataInicio || '[Data]'}
GESTOR: ${gestor || '[Gestor]'}

PROGRESSO: ${tarefasConcluidas}/${totalTarefas} tarefas (${progresso.toFixed(0)}%)

${semanas.map(s => `
SEMANA ${s.numero}: ${s.titulo.toUpperCase()}
───────────────────────────────────────────────────────────────
${s.tarefas.map(t => `[${t.concluida ? 'X' : ' '}] ${t.titulo}
    Responsavel: ${t.responsavel} | Prazo: ${t.prazo}`).join('\n')}
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

      <div className="max-w-4xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Onboarding de <span className="gold-text">Funcionario</span>
          </h1>
          <p className="text-[var(--gray)]">Plano de integracao para novos colaboradores</p>
        </div>

        {/* Info do Funcionario */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Funcionario</label>
              <input
                type="text"
                value={funcionario}
                onChange={(e) => setFuncionario(e.target.value)}
                placeholder="Nome completo"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cargo</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Titulo do cargo"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data de Inicio</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Gestor Responsavel</label>
              <input
                type="text"
                value={gestor}
                onChange={(e) => setGestor(e.target.value)}
                placeholder="Nome do gestor"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Progresso */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--gray)]">Progresso do Onboarding</span>
            <span className="font-semibold">{tarefasConcluidas}/{totalTarefas} tarefas</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold)] transition-all"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-center mt-2 font-display text-2xl text-[var(--gold)]">{progresso.toFixed(0)}%</p>
        </div>

        {/* Semanas */}
        {semanas.map((semana) => {
          const tarefasSemana = semana.tarefas.length
          const concluidasSemana = semana.tarefas.filter(t => t.concluida).length
          const progressoSemana = tarefasSemana > 0 ? (concluidasSemana / tarefasSemana) * 100 : 0

          return (
            <div key={semana.numero} className="glass card mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-lg">Semana {semana.numero}: {semana.titulo}</h2>
                  <p className="text-sm text-[var(--gray)]">{concluidasSemana}/{tarefasSemana} concluidas</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${progressoSemana}%`,
                        backgroundColor: progressoSemana === 100 ? '#22c55e' : 'var(--gold)'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => adicionarTarefa(semana.numero)}
                    className="text-[var(--gold)] hover:opacity-80"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {semana.tarefas.map((tarefa) => (
                  <div
                    key={tarefa.id}
                    className={`bg-black/30 rounded-xl p-3 transition-all ${
                      tarefa.concluida ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTarefa(semana.numero, tarefa.id)}
                        className="flex-shrink-0"
                      >
                        {tarefa.concluida ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-[var(--gray)]" />
                        )}
                      </button>
                      <div className="flex-1 grid md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={tarefa.titulo}
                          onChange={(e) => atualizarTarefa(semana.numero, tarefa.id, 'titulo', e.target.value)}
                          placeholder="Tarefa..."
                          className={`input-field text-sm ${tarefa.concluida ? 'line-through' : ''}`}
                        />
                        <input
                          type="text"
                          value={tarefa.responsavel}
                          onChange={(e) => atualizarTarefa(semana.numero, tarefa.id, 'responsavel', e.target.value)}
                          placeholder="Responsavel"
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          value={tarefa.prazo}
                          onChange={(e) => atualizarTarefa(semana.numero, tarefa.id, 'prazo', e.target.value)}
                          placeholder="Prazo"
                          className="input-field text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removerTarefa(semana.numero, tarefa.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPlano} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Plano Copiado!' : 'Copiar Plano de Onboarding'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de Onboarding</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Atribua um Buddy</h4>
              <p>Um colega experiente para tirar duvidas do dia-a-dia acelera muito a integracao.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Primeiras Vitorias</h4>
              <p>De tarefas que o novo funcionario possa completar rapidamente. Gera confianca.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Feedback Frequente</h4>
              <p>Check-ins semanais no primeiro mes sao essenciais para ajustar expectativas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Documentacao</h4>
              <p>Tenha processos documentados. Ninguem deveria depender 100% de explicacoes verbais.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
