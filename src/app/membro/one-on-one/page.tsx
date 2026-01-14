'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Copy, Check, Plus, Trash2, MessageCircle } from 'lucide-react'

interface TopicoPadrao {
  categoria: string
  perguntas: string[]
}

export default function OneOnOnePage() {
  const [copied, setCopied] = useState(false)
  const [funcionario, setFuncionario] = useState('')
  const [gestor, setGestor] = useState('')
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [frequencia, setFrequencia] = useState('semanal')

  const [topicos, setTopicos] = useState([
    { id: '1', texto: '', notas: '' },
  ])

  const [acoes, setAcoes] = useState([
    { id: '1', acao: '', responsavel: '', prazo: '' },
  ])

  const [feedback, setFeedback] = useState('')
  const [bloqueios, setBloqueios] = useState('')
  const [desenvolvimento, setDesenvolvimento] = useState('')

  const topicosPadrao: TopicoPadrao[] = [
    {
      categoria: 'Check-in Pessoal',
      perguntas: [
        'Como voce esta se sentindo essa semana?',
        'Como esta o equilibrio trabalho-vida pessoal?',
        'Tem algo fora do trabalho afetando sua energia?',
      ]
    },
    {
      categoria: 'Progresso e Entregas',
      perguntas: [
        'Quais foram suas principais conquistas desde nosso ultimo 1:1?',
        'Esta no caminho certo para suas metas?',
        'O que poderia ter sido melhor?',
      ]
    },
    {
      categoria: 'Bloqueios e Desafios',
      perguntas: [
        'O que esta te impedindo de ser mais produtivo?',
        'Precisa de algum recurso ou suporte que nao tem?',
        'Algum processo esta te atrapalhando?',
      ]
    },
    {
      categoria: 'Desenvolvimento',
      perguntas: [
        'O que voce quer aprender/desenvolver?',
        'Como posso te ajudar a crescer?',
        'Onde voce se ve em 6-12 meses?',
      ]
    },
    {
      categoria: 'Feedback',
      perguntas: [
        'Tem algum feedback para mim como gestor?',
        'O que eu poderia fazer diferente?',
        'Esta recebendo feedback suficiente?',
      ]
    },
    {
      categoria: 'Time e Colaboracao',
      perguntas: [
        'Como esta a dinamica com o time?',
        'Algum conflito ou tensao que precisa ser resolvido?',
        'Quem do time te ajudou recentemente?',
      ]
    },
  ]

  const adicionarTopico = () => {
    setTopicos([...topicos, { id: Date.now().toString(), texto: '', notas: '' }])
  }

  const removerTopico = (id: string) => {
    setTopicos(topicos.filter(t => t.id !== id))
  }

  const atualizarTopico = (id: string, campo: 'texto' | 'notas', valor: string) => {
    setTopicos(topicos.map(t => t.id === id ? { ...t, [campo]: valor } : t))
  }

  const adicionarAcao = () => {
    setAcoes([...acoes, { id: Date.now().toString(), acao: '', responsavel: '', prazo: '' }])
  }

  const removerAcao = (id: string) => {
    setAcoes(acoes.filter(a => a.id !== id))
  }

  const atualizarAcao = (id: string, campo: 'acao' | 'responsavel' | 'prazo', valor: string) => {
    setAcoes(acoes.map(a => a.id === id ? { ...a, [campo]: valor } : a))
  }

  const adicionarPergunta = (pergunta: string) => {
    setTopicos([...topicos, { id: Date.now().toString(), texto: pergunta, notas: '' }])
  }

  const copiar1on1 = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    REGISTRO DE 1:1
═══════════════════════════════════════════════════════════════

DATA: ${data}
FUNCIONARIO: ${funcionario || '[Nome]'}
GESTOR: ${gestor || '[Gestor]'}
FREQUENCIA: ${frequencia}

TOPICOS DISCUTIDOS
───────────────────────────────────────────────────────────────
${topicos.filter(t => t.texto).map(t => `
• ${t.texto}
  ${t.notas ? `Notas: ${t.notas}` : ''}
`).join('')}

BLOQUEIOS E DESAFIOS
───────────────────────────────────────────────────────────────
${bloqueios || '[Nenhum registrado]'}

FEEDBACK
───────────────────────────────────────────────────────────────
${feedback || '[Nenhum registrado]'}

DESENVOLVIMENTO E CARREIRA
───────────────────────────────────────────────────────────────
${desenvolvimento || '[Nenhum registrado]'}

ACOES E PROXIMOS PASSOS
───────────────────────────────────────────────────────────────
${acoes.filter(a => a.acao).map(a => `
• ${a.acao}
  Responsavel: ${a.responsavel || '[Definir]'} | Prazo: ${a.prazo || '[Definir]'}
`).join('')}

═══════════════════════════════════════════════════════════════
Proximo 1:1: ${frequencia === 'semanal' ? 'Em 1 semana' : frequencia === 'quinzenal' ? 'Em 2 semanas' : 'Em 1 mes'}
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
            <Users className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Template de <span className="gold-text">1:1</span>
          </h1>
          <p className="text-[var(--gray)]">Reunioes one-on-one estruturadas</p>
        </div>

        {/* Info Basica */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Funcionario</label>
              <input
                type="text"
                value={funcionario}
                onChange={(e) => setFuncionario(e.target.value)}
                placeholder="Nome do funcionario"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Gestor</label>
              <input
                type="text"
                value={gestor}
                onChange={(e) => setGestor(e.target.value)}
                placeholder="Seu nome"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Frequencia</label>
              <select
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
                className="input-field"
              >
                <option value="semanal">Semanal</option>
                <option value="quinzenal">Quinzenal</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Banco de Perguntas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[var(--gold)]" />
            Banco de Perguntas
          </h2>
          <p className="text-sm text-[var(--gray)] mb-4">Clique para adicionar aos topicos</p>
          <div className="space-y-4">
            {topicosPadrao.map((cat, i) => (
              <div key={i}>
                <p className="text-sm font-semibold text-[var(--gold)] mb-2">{cat.categoria}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.perguntas.map((p, j) => (
                    <button
                      key={j}
                      onClick={() => adicionarPergunta(p)}
                      className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topicos */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Topicos da Reuniao</h2>
            <button onClick={adicionarTopico} className="text-[var(--gold)] hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {topicos.map((topico, i) => (
              <div key={topico.id} className="bg-black/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--gold)] font-semibold">{i + 1}.</span>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={topico.texto}
                      onChange={(e) => atualizarTopico(topico.id, 'texto', e.target.value)}
                      placeholder="Topico ou pergunta..."
                      className="input-field"
                    />
                    <textarea
                      value={topico.notas}
                      onChange={(e) => atualizarTopico(topico.id, 'notas', e.target.value)}
                      placeholder="Notas e observacoes..."
                      className="input-field text-sm min-h-[60px]"
                    />
                  </div>
                  {topicos.length > 1 && (
                    <button onClick={() => removerTopico(topico.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloqueios, Feedback, Desenvolvimento */}
        <div className="grid md:grid-cols-1 gap-6 mb-8">
          <div className="glass card">
            <label className="input-label text-red-400">Bloqueios e Desafios</label>
            <textarea
              value={bloqueios}
              onChange={(e) => setBloqueios(e.target.value)}
              placeholder="O que esta impedindo o progresso?"
              className="input-field min-h-[80px]"
            />
          </div>
          <div className="glass card">
            <label className="input-label text-blue-400">Feedback (bidirecional)</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Feedback dado e recebido..."
              className="input-field min-h-[80px]"
            />
          </div>
          <div className="glass card">
            <label className="input-label text-green-400">Desenvolvimento e Carreira</label>
            <textarea
              value={desenvolvimento}
              onChange={(e) => setDesenvolvimento(e.target.value)}
              placeholder="Aspiracoes, aprendizados, crescimento..."
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        {/* Acoes */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Acoes e Proximos Passos</h2>
            <button onClick={adicionarAcao} className="text-[var(--gold)] hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {acoes.map((acao) => (
              <div key={acao.id} className="bg-black/30 rounded-xl p-3">
                <div className="grid md:grid-cols-4 gap-2 items-center">
                  <input
                    type="text"
                    value={acao.acao}
                    onChange={(e) => atualizarAcao(acao.id, 'acao', e.target.value)}
                    placeholder="Acao..."
                    className="input-field text-sm md:col-span-2"
                  />
                  <input
                    type="text"
                    value={acao.responsavel}
                    onChange={(e) => atualizarAcao(acao.id, 'responsavel', e.target.value)}
                    placeholder="Responsavel"
                    className="input-field text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={acao.prazo}
                      onChange={(e) => atualizarAcao(acao.id, 'prazo', e.target.value)}
                      placeholder="Prazo"
                      className="input-field text-sm flex-1"
                    />
                    {acoes.length > 1 && (
                      <button onClick={() => removerAcao(acao.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiar1on1} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Registro Copiado!' : 'Copiar Registro do 1:1'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de 1:1</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">E do Funcionario</h4>
              <p>O 1:1 e a reuniao do funcionario, nao do gestor. Deixe ele liderar a pauta.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Nunca Cancele</h4>
              <p>Cancelar 1:1s envia a mensagem de que a pessoa nao e prioridade. Remarque, nunca cancele.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Nao e Status Update</h4>
              <p>Status de projetos pode ser em outras reunioes. 1:1 e sobre a pessoa.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Registre as Acoes</h4>
              <p>Sempre termine com proximos passos claros e revise-os no proximo 1:1.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
