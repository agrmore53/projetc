'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckSquare, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface ItemChecklist {
  id: string
  texto: string
  concluido: boolean
}

interface Checklist {
  id: string
  titulo: string
  itens: ItemChecklist[]
}

export default function ChecklistCustomPage() {
  const [copied, setCopied] = useState(false)

  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      titulo: 'Lancamento de Produto',
      itens: [
        { id: '1', texto: 'Definir data de lancamento', concluido: true },
        { id: '2', texto: 'Preparar materiais de marketing', concluido: true },
        { id: '3', texto: 'Treinar equipe de vendas', concluido: false },
        { id: '4', texto: 'Configurar analytics', concluido: false },
        { id: '5', texto: 'Testar integrações', concluido: false },
      ]
    }
  ])

  const [checklistAtual, setChecklistAtual] = useState<string | null>(checklists[0]?.id || null)

  useEffect(() => {
    const saved = localStorage.getItem('checklists_custom')
    if (saved) {
      const parsed = JSON.parse(saved)
      setChecklists(parsed)
      setChecklistAtual(parsed[0]?.id || null)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('checklists_custom', JSON.stringify(checklists))
  }, [checklists])

  const adicionarChecklist = () => {
    const novaChecklist: Checklist = {
      id: Date.now().toString(),
      titulo: 'Nova Checklist',
      itens: []
    }
    setChecklists([...checklists, novaChecklist])
    setChecklistAtual(novaChecklist.id)
  }

  const removerChecklist = (id: string) => {
    const novasChecklists = checklists.filter(c => c.id !== id)
    setChecklists(novasChecklists)
    if (checklistAtual === id) {
      setChecklistAtual(novasChecklists[0]?.id || null)
    }
  }

  const atualizarTitulo = (id: string, titulo: string) => {
    setChecklists(checklists.map(c =>
      c.id === id ? { ...c, titulo } : c
    ))
  }

  const adicionarItem = (checklistId: string) => {
    setChecklists(checklists.map(c => {
      if (c.id === checklistId) {
        return {
          ...c,
          itens: [...c.itens, { id: Date.now().toString(), texto: '', concluido: false }]
        }
      }
      return c
    }))
  }

  const removerItem = (checklistId: string, itemId: string) => {
    setChecklists(checklists.map(c => {
      if (c.id === checklistId) {
        return {
          ...c,
          itens: c.itens.filter(i => i.id !== itemId)
        }
      }
      return c
    }))
  }

  const atualizarItem = (checklistId: string, itemId: string, campo: 'texto' | 'concluido', valor: string | boolean) => {
    setChecklists(checklists.map(c => {
      if (c.id === checklistId) {
        return {
          ...c,
          itens: c.itens.map(i =>
            i.id === itemId ? { ...i, [campo]: valor } : i
          )
        }
      }
      return c
    }))
  }

  const checklistSelecionada = checklists.find(c => c.id === checklistAtual)
  const totalItens = checklistSelecionada?.itens.length || 0
  const itensConcluidos = checklistSelecionada?.itens.filter(i => i.concluido).length || 0
  const progresso = totalItens > 0 ? (itensConcluidos / totalItens) * 100 : 0

  const gerarChecklist = () => {
    if (!checklistSelecionada) return ''

    return `
${checklistSelecionada.titulo.toUpperCase()}
═══════════════════════════════════════════════════════════════

Progresso: ${itensConcluidos}/${totalItens} (${progresso.toFixed(0)}%)

ITENS
─────────────────────────────────────────────────────────────
${checklistSelecionada.itens.map(i =>
  `[${i.concluido ? 'X' : ' '}] ${i.texto}`
).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarChecklist = () => {
    navigator.clipboard.writeText(gerarChecklist())
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
            <CheckSquare className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Checklist <span className="gold-text">Customizavel</span>
          </h1>
          <p className="text-[var(--gray)]">Crie e gerencie suas checklists</p>
        </div>

        {/* Progresso */}
        {checklistSelecionada && (
          <div className="glass card mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--gray)]">Progresso</span>
              <span className="text-sm">{itensConcluidos}/{totalItens}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-[var(--gold)] h-3 rounded-full transition-all"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="text-center mt-2 font-display text-2xl text-[var(--gold)]">
              {progresso.toFixed(0)}%
            </p>
          </div>
        )}

        {/* Lista de Checklists */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Minhas Checklists</h2>
            <button onClick={adicionarChecklist} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Nova
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {checklists.map(c => (
              <button
                key={c.id}
                onClick={() => setChecklistAtual(c.id)}
                className={`px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${
                  checklistAtual === c.id
                    ? 'bg-[var(--gold)] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {c.titulo}
                {checklists.length > 1 && (
                  <span
                    onClick={(e) => { e.stopPropagation(); removerChecklist(c.id) }}
                    className="text-xs opacity-50 hover:opacity-100"
                  >
                    ✕
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist Selecionada */}
        {checklistSelecionada && (
          <div className="glass card mb-8">
            <div className="mb-4">
              <label className="input-label">Titulo da Checklist</label>
              <input
                type="text"
                value={checklistSelecionada.titulo}
                onChange={(e) => atualizarTitulo(checklistSelecionada.id, e.target.value)}
                className="input-field"
              />
            </div>

            <div className="space-y-2 mb-4">
              {checklistSelecionada.itens.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 bg-black/20 rounded-xl p-3">
                  <input
                    type="checkbox"
                    checked={item.concluido}
                    onChange={(e) => atualizarItem(checklistSelecionada.id, item.id, 'concluido', e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <input
                    type="text"
                    value={item.texto}
                    onChange={(e) => atualizarItem(checklistSelecionada.id, item.id, 'texto', e.target.value)}
                    className={`bg-transparent border-none flex-1 ${item.concluido ? 'line-through text-[var(--gray)]' : ''}`}
                    placeholder={`Item ${index + 1}`}
                  />
                  <button
                    onClick={() => removerItem(checklistSelecionada.id, item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => adicionarItem(checklistSelecionada.id)}
              className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-[var(--gray)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
            >
              + Adicionar Item
            </button>
          </div>
        )}

        {/* Botao Copiar */}
        {checklistSelecionada && (
          <div className="flex justify-center mb-8">
            <button onClick={copiarChecklist} className="btn-primary flex items-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Checklist'}
            </button>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Uso</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Organizacao</h4>
              <ul className="space-y-1">
                <li>• Crie checklists por projeto</li>
                <li>• Ordene por prioridade</li>
                <li>• Revise diariamente</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Persistencia</h4>
              <ul className="space-y-1">
                <li>• Dados salvos no navegador</li>
                <li>• Use copiar para backup</li>
                <li>• Compartilhe com a equipe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
