'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Copy, Check, Plus, Trash2, Clock, Users, Target } from 'lucide-react'

interface ItemAgenda {
  id: string
  topico: string
  responsavel: string
  duracao: number
  tipo: 'discussao' | 'decisao' | 'informativo' | 'brainstorm'
}

export default function AgendaReuniaoPage() {
  const [copied, setCopied] = useState(false)

  const [reuniao, setReuniao] = useState({
    titulo: '',
    data: new Date().toISOString().split('T')[0],
    horario: '14:00',
    duracao: 60,
    local: 'Google Meet',
    objetivo: '',
    participantes: ''
  })

  const [itens, setItens] = useState<ItemAgenda[]>([
    { id: '1', topico: 'Check-in e alinhamento inicial', responsavel: '', duracao: 5, tipo: 'informativo' },
    { id: '2', topico: '', responsavel: '', duracao: 15, tipo: 'discussao' },
    { id: '3', topico: '', responsavel: '', duracao: 10, tipo: 'decisao' },
  ])

  const tiposItem = [
    { value: 'informativo', label: 'Informativo', cor: '#3b82f6' },
    { value: 'discussao', label: 'Discussao', cor: '#eab308' },
    { value: 'decisao', label: 'Decisao', cor: '#22c55e' },
    { value: 'brainstorm', label: 'Brainstorm', cor: '#a855f7' },
  ]

  const adicionarItem = () => {
    const novo: ItemAgenda = {
      id: Date.now().toString(),
      topico: '',
      responsavel: '',
      duracao: 10,
      tipo: 'discussao'
    }
    setItens([...itens, novo])
  }

  const removerItem = (id: string) => {
    setItens(itens.filter(i => i.id !== id))
  }

  const atualizarItem = (id: string, campo: keyof ItemAgenda, valor: string | number) => {
    setItens(itens.map(i =>
      i.id === id ? { ...i, [campo]: valor } : i
    ))
  }

  const duracaoTotal = itens.reduce((sum, i) => sum + i.duracao, 0)
  const tempoRestante = reuniao.duracao - duracaoTotal

  const templates = {
    weekly: {
      titulo: 'Weekly do Time',
      objetivo: 'Alinhar prioridades da semana e remover bloqueios',
      itens: [
        { topico: 'Check-in (como cada um esta)', duracao: 5, tipo: 'informativo' as const },
        { topico: 'Review da semana anterior', duracao: 10, tipo: 'informativo' as const },
        { topico: 'Prioridades desta semana', duracao: 15, tipo: 'discussao' as const },
        { topico: 'Bloqueios e dependencias', duracao: 10, tipo: 'discussao' as const },
        { topico: 'Proximos passos', duracao: 5, tipo: 'decisao' as const },
      ]
    },
    planning: {
      titulo: 'Planning de Sprint',
      objetivo: 'Definir escopo e compromissos da proxima sprint',
      itens: [
        { topico: 'Review da sprint anterior', duracao: 15, tipo: 'informativo' as const },
        { topico: 'Apresentacao do backlog priorizado', duracao: 10, tipo: 'informativo' as const },
        { topico: 'Estimativa e discussao de itens', duracao: 30, tipo: 'discussao' as const },
        { topico: 'Definicao do compromisso', duracao: 10, tipo: 'decisao' as const },
        { topico: 'Duvidas e alinhamentos finais', duracao: 5, tipo: 'discussao' as const },
      ]
    },
    kickoff: {
      titulo: 'Kickoff de Projeto',
      objetivo: 'Alinhar expectativas e definir primeiros passos',
      itens: [
        { topico: 'Apresentacao dos participantes', duracao: 10, tipo: 'informativo' as const },
        { topico: 'Contexto e objetivos do projeto', duracao: 15, tipo: 'informativo' as const },
        { topico: 'Escopo e entregaveis', duracao: 15, tipo: 'discussao' as const },
        { topico: 'Cronograma e milestones', duracao: 10, tipo: 'discussao' as const },
        { topico: 'Papeis e responsabilidades', duracao: 10, tipo: 'decisao' as const },
        { topico: 'Proximos passos imediatos', duracao: 5, tipo: 'decisao' as const },
      ]
    }
  }

  const aplicarTemplate = (template: keyof typeof templates) => {
    const t = templates[template]
    setReuniao({ ...reuniao, titulo: t.titulo, objetivo: t.objetivo })
    setItens(t.itens.map((item, i) => ({
      id: Date.now().toString() + i,
      responsavel: '',
      ...item
    })))
  }

  const gerarAgenda = () => {
    return `
═══════════════════════════════════════════════════════════════
                    AGENDA DE REUNIAO
═══════════════════════════════════════════════════════════════

${reuniao.titulo || 'Reuniao'}
─────────────────────────────────────────────────────────────
Data: ${new Date(reuniao.data).toLocaleDateString('pt-BR')}
Horario: ${reuniao.horario}
Duracao: ${reuniao.duracao} minutos
Local: ${reuniao.local}

${reuniao.participantes ? `Participantes: ${reuniao.participantes}\n` : ''}
OBJETIVO
─────────────────────────────────────────────────────────────
${reuniao.objetivo || '[Definir objetivo da reuniao]'}

PAUTA
─────────────────────────────────────────────────────────────
${itens.map((item, i) => {
  const tipo = tiposItem.find(t => t.value === item.tipo)
  return `${i + 1}. ${item.topico || '[Topico]'} (${item.duracao}min)
   Tipo: ${tipo?.label || 'Discussao'}${item.responsavel ? ` | Responsavel: ${item.responsavel}` : ''}`
}).join('\n\n')}

─────────────────────────────────────────────────────────────
Duracao Total da Pauta: ${duracaoTotal} minutos
${tempoRestante > 0 ? `Buffer disponivel: ${tempoRestante} minutos` : tempoRestante < 0 ? `ATENCAO: Pauta excede duracao em ${Math.abs(tempoRestante)} minutos` : ''}

NOTAS DA REUNIAO
─────────────────────────────────────────────────────────────
[Espaco para anotacoes durante a reuniao]




DECISOES TOMADAS
─────────────────────────────────────────────────────────────
[ ]
[ ]
[ ]

ACOES / PROXIMOS PASSOS
─────────────────────────────────────────────────────────────
[ ] Acao 1 - Responsavel: _____ - Prazo: _____
[ ] Acao 2 - Responsavel: _____ - Prazo: _____
[ ] Acao 3 - Responsavel: _____ - Prazo: _____

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarAgenda = () => {
    navigator.clipboard.writeText(gerarAgenda())
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
            <Calendar className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Agenda de <span className="gold-text">Reuniao</span>
          </h1>
          <p className="text-[var(--gray)]">Crie agendas estruturadas para reunioes produtivas</p>
        </div>

        {/* Templates */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Templates Rapidos</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(templates).map(([key, t]) => (
              <button
                key={key}
                onClick={() => aplicarTemplate(key as keyof typeof templates)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
              >
                {t.titulo}
              </button>
            ))}
          </div>
        </div>

        {/* Dados da Reuniao */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Informacoes da Reuniao</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="input-label">Titulo da Reuniao</label>
              <input
                type="text"
                value={reuniao.titulo}
                onChange={(e) => setReuniao({ ...reuniao, titulo: e.target.value })}
                placeholder="Ex: Weekly do Time de Produto"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Data
              </label>
              <input
                type="date"
                value={reuniao.data}
                onChange={(e) => setReuniao({ ...reuniao, data: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Clock className="w-4 h-4" /> Horario
              </label>
              <input
                type="time"
                value={reuniao.horario}
                onChange={(e) => setReuniao({ ...reuniao, horario: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Duracao (minutos)</label>
              <input
                type="number"
                value={reuniao.duracao}
                onChange={(e) => setReuniao({ ...reuniao, duracao: Number(e.target.value) })}
                className="input-field"
                min="15"
                step="15"
              />
            </div>
            <div>
              <label className="input-label">Local/Link</label>
              <input
                type="text"
                value={reuniao.local}
                onChange={(e) => setReuniao({ ...reuniao, local: e.target.value })}
                placeholder="Google Meet, Zoom, Sala X..."
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label flex items-center gap-2">
                <Users className="w-4 h-4" /> Participantes
              </label>
              <input
                type="text"
                value={reuniao.participantes}
                onChange={(e) => setReuniao({ ...reuniao, participantes: e.target.value })}
                placeholder="Maria, Joao, Ana..."
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label flex items-center gap-2">
                <Target className="w-4 h-4" /> Objetivo da Reuniao
              </label>
              <textarea
                value={reuniao.objetivo}
                onChange={(e) => setReuniao({ ...reuniao, objetivo: e.target.value })}
                placeholder="O que queremos atingir ao final desta reuniao?"
                className="input-field min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Itens da Pauta */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Pauta</h2>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${tempoRestante < 0 ? 'text-red-400' : tempoRestante < 10 ? 'text-yellow-400' : 'text-[var(--gray)]'}`}>
                {duracaoTotal}/{reuniao.duracao} min
              </span>
              <button onClick={adicionarItem} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
          </div>

          {/* Barra de tempo */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full transition-all ${tempoRestante < 0 ? 'bg-red-500' : tempoRestante < 10 ? 'bg-yellow-500' : 'bg-[var(--gold)]'}`}
              style={{ width: `${Math.min((duracaoTotal / reuniao.duracao) * 100, 100)}%` }}
            />
          </div>

          <div className="space-y-3">
            {itens.map((item, index) => {
              const tipoInfo = tiposItem.find(t => t.value === item.tipo)
              return (
                <div
                  key={item.id}
                  className="bg-black/30 rounded-xl p-4"
                  style={{ borderLeft: `4px solid ${tipoInfo?.cor}` }}
                >
                  <div className="grid md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-1 text-center">
                      <span className="font-display text-lg text-[var(--gray)]">{index + 1}</span>
                    </div>
                    <div className="md:col-span-5">
                      <input
                        type="text"
                        value={item.topico}
                        onChange={(e) => atualizarItem(item.id, 'topico', e.target.value)}
                        placeholder="Topico a discutir"
                        className="input-field text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <select
                        value={item.tipo}
                        onChange={(e) => atualizarItem(item.id, 'tipo', e.target.value)}
                        className="input-field text-sm"
                      >
                        {tiposItem.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={item.responsavel}
                        onChange={(e) => atualizarItem(item.id, 'responsavel', e.target.value)}
                        placeholder="Responsavel"
                        className="input-field text-sm"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={item.duracao}
                          onChange={(e) => atualizarItem(item.id, 'duracao', Number(e.target.value))}
                          className="input-field text-sm text-center w-16"
                          min="1"
                        />
                        <span className="text-xs text-[var(--gray)]">min</span>
                      </div>
                    </div>
                    <div className="md:col-span-1 text-right">
                      <button
                        onClick={() => removerItem(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarAgenda} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Agenda'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Reunioes Produtivas</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Preparacao</h4>
              <ul className="space-y-1">
                <li>• Envie a agenda com 24h de antecedencia</li>
                <li>• Defina objetivo claro e mensuravel</li>
                <li>• Convide apenas quem precisa estar la</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Execucao</h4>
              <ul className="space-y-1">
                <li>• Comece e termine no horario</li>
                <li>• Designe um facilitador e um anotador</li>
                <li>• Finalize com acoes claras e responsaveis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
