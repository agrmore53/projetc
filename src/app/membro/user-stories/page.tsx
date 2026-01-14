'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Copy, Check, Plus, Trash2, Wand2 } from 'lucide-react'

interface UserStory {
  id: string
  persona: string
  acao: string
  beneficio: string
  criterios: string[]
  prioridade: 'must' | 'should' | 'could' | 'wont'
  pontos: number
}

export default function UserStoriesPage() {
  const [copied, setCopied] = useState(false)

  const [stories, setStories] = useState<UserStory[]>([
    {
      id: '1',
      persona: 'usuario logado',
      acao: 'exportar meus dados em CSV',
      beneficio: 'analisar as informacoes em outras ferramentas',
      criterios: ['Botao de exportar visivel no dashboard', 'Arquivo deve incluir todos os campos', 'Download inicia em ate 3 segundos'],
      prioridade: 'must',
      pontos: 3
    },
  ])

  const [novaStory, setNovaStory] = useState({
    persona: '',
    acao: '',
    beneficio: ''
  })

  const templates = [
    { persona: 'usuario novo', acao: 'criar uma conta rapidamente', beneficio: 'comecar a usar o produto sem friccao' },
    { persona: 'administrador', acao: 'gerenciar permissoes de usuarios', beneficio: 'controlar quem acessa o que' },
    { persona: 'cliente', acao: 'ver meu historico de compras', beneficio: 'acompanhar meus gastos' },
    { persona: 'gerente', acao: 'visualizar relatorios do time', beneficio: 'tomar decisoes baseadas em dados' },
    { persona: 'usuario mobile', acao: 'acessar todas funcoes pelo celular', beneficio: 'trabalhar de qualquer lugar' },
  ]

  const adicionarStory = () => {
    if (!novaStory.persona || !novaStory.acao || !novaStory.beneficio) return

    const nova: UserStory = {
      id: Date.now().toString(),
      ...novaStory,
      criterios: [''],
      prioridade: 'should',
      pontos: 1
    }
    setStories([...stories, nova])
    setNovaStory({ persona: '', acao: '', beneficio: '' })
  }

  const aplicarTemplate = (template: typeof templates[0]) => {
    setNovaStory(template)
  }

  const removerStory = (id: string) => {
    setStories(stories.filter(s => s.id !== id))
  }

  const atualizarStory = (id: string, campo: keyof UserStory, valor: any) => {
    setStories(stories.map(s =>
      s.id === id ? { ...s, [campo]: valor } : s
    ))
  }

  const adicionarCriterio = (storyId: string) => {
    setStories(stories.map(s =>
      s.id === storyId
        ? { ...s, criterios: [...s.criterios, ''] }
        : s
    ))
  }

  const atualizarCriterio = (storyId: string, index: number, valor: string) => {
    setStories(stories.map(s =>
      s.id === storyId
        ? { ...s, criterios: s.criterios.map((c, i) => i === index ? valor : c) }
        : s
    ))
  }

  const removerCriterio = (storyId: string, index: number) => {
    setStories(stories.map(s =>
      s.id === storyId
        ? { ...s, criterios: s.criterios.filter((_, i) => i !== index) }
        : s
    ))
  }

  const getCorPrioridade = (p: UserStory['prioridade']) => {
    switch (p) {
      case 'must': return '#ef4444'
      case 'should': return '#eab308'
      case 'could': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const totalPontos = stories.reduce((sum, s) => sum + s.pontos, 0)

  const copiarStories = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    USER STORIES
═══════════════════════════════════════════════════════════════

Total: ${stories.length} stories | ${totalPontos} pontos

${stories.map((s, i) => `
USER STORY #${i + 1} [${s.prioridade.toUpperCase()}] - ${s.pontos} pts
───────────────────────────────────────────────────────────────
Como ${s.persona},
eu quero ${s.acao},
para que eu possa ${s.beneficio}.

Criterios de Aceite:
${s.criterios.filter(c => c).map(c => `  ✓ ${c}`).join('\n')}
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
            <BookOpen className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">User Stories</span>
          </h1>
          <p className="text-[var(--gray)]">Escreva historias de usuario no formato correto</p>
        </div>

        {/* Criar Nova Story */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[var(--gold)]" />
            Nova User Story
          </h2>

          {/* Templates */}
          <div className="mb-4">
            <p className="text-sm text-[var(--gray)] mb-2">Templates rapidos:</p>
            <div className="flex flex-wrap gap-2">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => aplicarTemplate(t)}
                  className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
                >
                  {t.persona}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/30 rounded-xl p-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[var(--gold)] font-semibold whitespace-nowrap">Como</span>
                <input
                  type="text"
                  value={novaStory.persona}
                  onChange={(e) => setNovaStory({ ...novaStory, persona: e.target.value })}
                  placeholder="[persona/usuario]"
                  className="input-field text-sm flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--gold)] font-semibold whitespace-nowrap">eu quero</span>
                <input
                  type="text"
                  value={novaStory.acao}
                  onChange={(e) => setNovaStory({ ...novaStory, acao: e.target.value })}
                  placeholder="[acao/funcionalidade]"
                  className="input-field text-sm flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--gold)] font-semibold whitespace-nowrap">para que</span>
                <input
                  type="text"
                  value={novaStory.beneficio}
                  onChange={(e) => setNovaStory({ ...novaStory, beneficio: e.target.value })}
                  placeholder="[beneficio/valor]"
                  className="input-field text-sm flex-1"
                />
              </div>
            </div>
          </div>

          <button onClick={adicionarStory} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Adicionar Story
          </button>
        </div>

        {/* Resumo */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Total Stories</p>
            <p className="font-display text-3xl text-[var(--gold)]">{stories.length}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Total Pontos</p>
            <p className="font-display text-3xl text-[var(--gold)]">{totalPontos}</p>
          </div>
          <div className="glass card text-center">
            <button onClick={copiarStories} className="btn-primary w-full flex items-center justify-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Todas'}
            </button>
          </div>
        </div>

        {/* Lista de Stories */}
        <div className="space-y-4 mb-8">
          {stories.map((story, index) => (
            <div key={story.id} className="glass card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-[var(--gold)]">#{index + 1}</span>
                  <div className="flex gap-2">
                    <select
                      value={story.prioridade}
                      onChange={(e) => atualizarStory(story.id, 'prioridade', e.target.value)}
                      className="input-field text-xs py-1 px-2"
                      style={{ borderColor: getCorPrioridade(story.prioridade) }}
                    >
                      <option value="must">Must Have</option>
                      <option value="should">Should Have</option>
                      <option value="could">Could Have</option>
                      <option value="wont">Won't Have</option>
                    </select>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={story.pontos}
                        onChange={(e) => atualizarStory(story.id, 'pontos', Number(e.target.value))}
                        className="input-field text-xs w-16 py-1 text-center"
                        min="1"
                        max="13"
                      />
                      <span className="text-xs text-[var(--gray)]">pts</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => removerStory(story.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <p className="text-sm">
                  <span className="text-[var(--gold)]">Como</span>{' '}
                  <input
                    type="text"
                    value={story.persona}
                    onChange={(e) => atualizarStory(story.id, 'persona', e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-[var(--gold)] outline-none px-1"
                  />
                  ,
                </p>
                <p className="text-sm">
                  <span className="text-[var(--gold)]">eu quero</span>{' '}
                  <input
                    type="text"
                    value={story.acao}
                    onChange={(e) => atualizarStory(story.id, 'acao', e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-[var(--gold)] outline-none px-1 w-full"
                  />
                  ,
                </p>
                <p className="text-sm">
                  <span className="text-[var(--gold)]">para que eu possa</span>{' '}
                  <input
                    type="text"
                    value={story.beneficio}
                    onChange={(e) => atualizarStory(story.id, 'beneficio', e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-[var(--gold)] outline-none px-1 w-full"
                  />
                  .
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[var(--gray)]">Criterios de Aceite</label>
                  <button
                    onClick={() => adicionarCriterio(story.id)}
                    className="text-[var(--gold)] hover:opacity-80"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {story.criterios.map((criterio, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <input
                        type="text"
                        value={criterio}
                        onChange={(e) => atualizarCriterio(story.id, i, e.target.value)}
                        placeholder="Criterio de aceite..."
                        className="input-field text-sm flex-1"
                      />
                      {story.criterios.length > 1 && (
                        <button
                          onClick={() => removerCriterio(story.id, i)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="glass card text-center py-12 mb-8">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-[var(--gray)] opacity-50" />
            <p className="text-[var(--gray)]">Nenhuma user story criada</p>
            <p className="text-sm text-[var(--gray)]">Use o formulario acima para criar</p>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Boas User Stories</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">INVEST</h4>
              <p>Independent, Negotiable, Valuable, Estimable, Small, Testable. Toda story deve seguir esses criterios.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Criterios Claros</h4>
              <p>Criterios de aceite devem ser verificaveis. "Deve ser rapido" e ruim. "Carrega em menos de 2s" e bom.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Foco no Usuario</h4>
              <p>A story deve descrever valor para o usuario, nao tarefas tecnicas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Pontuacao Fibonacci</h4>
              <p>Use 1, 2, 3, 5, 8, 13 para estimar. Se for maior que 13, quebre em stories menores.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
