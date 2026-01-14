'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Copy, Check, Plus, Trash2, ThumbsUp, ThumbsDown, Lightbulb, Rocket } from 'lucide-react'

interface Item {
  id: string
  texto: string
  votos: number
}

interface Acao {
  id: string
  descricao: string
  responsavel: string
  prazo: string
}

export default function RetrospectivaPage() {
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState({
    sprint: '1',
    data: new Date().toISOString().split('T')[0],
    time: ''
  })

  const [oqueFoiBem, setOqueFoiBem] = useState<Item[]>([
    { id: '1', texto: '', votos: 0 }
  ])

  const [oqueMelhorar, setOqueMelhorar] = useState<Item[]>([
    { id: '1', texto: '', votos: 0 }
  ])

  const [ideias, setIdeias] = useState<Item[]>([
    { id: '1', texto: '', votos: 0 }
  ])

  const [acoes, setAcoes] = useState<Acao[]>([
    { id: '1', descricao: '', responsavel: '', prazo: '' }
  ])

  const adicionarItem = (lista: Item[], setLista: (items: Item[]) => void) => {
    setLista([...lista, { id: Date.now().toString(), texto: '', votos: 0 }])
  }

  const removerItem = (lista: Item[], setLista: (items: Item[]) => void, id: string) => {
    if (lista.length > 1) {
      setLista(lista.filter(i => i.id !== id))
    }
  }

  const atualizarItem = (lista: Item[], setLista: (items: Item[]) => void, id: string, campo: keyof Item, valor: string | number) => {
    setLista(lista.map(i => i.id === id ? { ...i, [campo]: valor } : i))
  }

  const adicionarAcao = () => {
    setAcoes([...acoes, { id: Date.now().toString(), descricao: '', responsavel: '', prazo: '' }])
  }

  const removerAcao = (id: string) => {
    if (acoes.length > 1) {
      setAcoes(acoes.filter(a => a.id !== id))
    }
  }

  const atualizarAcao = (id: string, campo: keyof Acao, valor: string) => {
    setAcoes(acoes.map(a => a.id === id ? { ...a, [campo]: valor } : a))
  }

  const gerarRetrospectiva = () => {
    return `
═══════════════════════════════════════════════════════════════
                RETROSPECTIVA - SPRINT ${config.sprint}
═══════════════════════════════════════════════════════════════

Data: ${new Date(config.data).toLocaleDateString('pt-BR')}
${config.time ? `Time: ${config.time}` : ''}

O QUE FOI BEM (Continue fazendo)
─────────────────────────────────────────────────────────────
${oqueFoiBem.filter(i => i.texto).map(i => `✓ ${i.texto}${i.votos > 0 ? ` (${i.votos} votos)` : ''}`).join('\n') || '(Nenhum item registrado)'}

O QUE PODE MELHORAR (Pare ou mude)
─────────────────────────────────────────────────────────────
${oqueMelhorar.filter(i => i.texto).map(i => `✗ ${i.texto}${i.votos > 0 ? ` (${i.votos} votos)` : ''}`).join('\n') || '(Nenhum item registrado)'}

IDEIAS E SUGESTOES (Comece a fazer)
─────────────────────────────────────────────────────────────
${ideias.filter(i => i.texto).map(i => `💡 ${i.texto}${i.votos > 0 ? ` (${i.votos} votos)` : ''}`).join('\n') || '(Nenhum item registrado)'}

PLANO DE ACAO
─────────────────────────────────────────────────────────────
${acoes.filter(a => a.descricao).map((a, i) => `${i + 1}. ${a.descricao}
   Responsavel: ${a.responsavel || '[Definir]'}
   Prazo: ${a.prazo || '[Definir]'}`).join('\n\n') || '(Nenhuma acao definida)'}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarRetrospectiva = () => {
    navigator.clipboard.writeText(gerarRetrospectiva())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const SecaoItems = ({
    titulo,
    icon: Icon,
    cor,
    items,
    setItems
  }: {
    titulo: string
    icon: any
    cor: string
    items: Item[]
    setItems: (items: Item[]) => void
  }) => (
    <div className="glass card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: cor }} />
          {titulo}
        </h2>
        <button
          onClick={() => adicionarItem(items, setItems)}
          className="text-[var(--gold)] hover:opacity-80"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="text"
              value={item.texto}
              onChange={(e) => atualizarItem(items, setItems, item.id, 'texto', e.target.value)}
              placeholder="Adicione um item..."
              className="input-field text-sm flex-1"
            />
            <input
              type="number"
              value={item.votos}
              onChange={(e) => atualizarItem(items, setItems, item.id, 'votos', Number(e.target.value))}
              placeholder="0"
              className="input-field text-sm w-16 text-center"
              min="0"
            />
            <span className="text-xs text-[var(--gray)]">votos</span>
            <button
              onClick={() => removerItem(items, setItems, item.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

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
            <RefreshCw className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Template de <span className="gold-text">Retrospectiva</span>
          </h1>
          <p className="text-[var(--gray)]">Melhoria continua para seu time</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Sprint/Ciclo</label>
              <input
                type="text"
                value={config.sprint}
                onChange={(e) => setConfig({ ...config, sprint: e.target.value })}
                placeholder="1"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={config.data}
                onChange={(e) => setConfig({ ...config, data: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Time</label>
              <input
                type="text"
                value={config.time}
                onChange={(e) => setConfig({ ...config, time: e.target.value })}
                placeholder="Nome do time"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Secoes */}
        <SecaoItems
          titulo="O que foi bem"
          icon={ThumbsUp}
          cor="#22c55e"
          items={oqueFoiBem}
          setItems={setOqueFoiBem}
        />

        <SecaoItems
          titulo="O que pode melhorar"
          icon={ThumbsDown}
          cor="#ef4444"
          items={oqueMelhorar}
          setItems={setOqueMelhorar}
        />

        <SecaoItems
          titulo="Ideias e sugestoes"
          icon={Lightbulb}
          cor="#eab308"
          items={ideias}
          setItems={setIdeias}
        />

        {/* Acoes */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[var(--gold)]" />
              Plano de Acao
            </h2>
            <button onClick={adicionarAcao} className="text-[var(--gold)] hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {acoes.map((acao, index) => (
              <div key={acao.id} className="bg-black/30 rounded-xl p-4">
                <div className="grid md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-1 text-center">
                    <span className="font-display text-lg text-[var(--gold)]">{index + 1}</span>
                  </div>
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      value={acao.descricao}
                      onChange={(e) => atualizarAcao(acao.id, 'descricao', e.target.value)}
                      placeholder="Acao a ser tomada"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      value={acao.responsavel}
                      onChange={(e) => atualizarAcao(acao.id, 'responsavel', e.target.value)}
                      placeholder="Responsavel"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="date"
                      value={acao.prazo}
                      onChange={(e) => atualizarAcao(acao.id, 'prazo', e.target.value)}
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="md:col-span-1 text-right">
                    <button
                      onClick={() => removerAcao(acao.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRetrospectiva} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Retrospectiva'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Retrospectivas Eficazes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Ambiente Seguro</h4>
              <ul className="space-y-1">
                <li>• Todos podem falar sem medo de julgamento</li>
                <li>• Foque em processos, nao em pessoas</li>
                <li>• Confidencialidade do que e discutido</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Acoes Concretas</h4>
              <ul className="space-y-1">
                <li>• Limite a 2-3 acoes por retrospectiva</li>
                <li>• Defina responsavel e prazo claros</li>
                <li>• Revise acoes anteriores no inicio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
