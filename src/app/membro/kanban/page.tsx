'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Kanban, Copy, Check, Plus, Trash2, Edit2, X } from 'lucide-react'

interface Cartao {
  id: string
  titulo: string
  descricao: string
  cor: string
  prazo?: string
}

interface Coluna {
  id: string
  nome: string
  cartoes: Cartao[]
}

export default function KanbanPage() {
  const [copied, setCopied] = useState(false)
  const [editandoCartao, setEditandoCartao] = useState<string | null>(null)

  const [colunas, setColunas] = useState<Coluna[]>([
    {
      id: 'backlog',
      nome: 'Backlog',
      cartoes: [
        { id: '1', titulo: 'Implementar autenticacao', descricao: 'Login com Google e email', cor: '#3b82f6', prazo: '' },
        { id: '2', titulo: 'Dashboard de metricas', descricao: 'Graficos de vendas e usuarios', cor: '#22c55e', prazo: '' },
      ]
    },
    {
      id: 'todo',
      nome: 'A Fazer',
      cartoes: [
        { id: '3', titulo: 'Corrigir bug no checkout', descricao: 'Erro ao processar pagamento PIX', cor: '#ef4444', prazo: '2024-01-20' },
      ]
    },
    {
      id: 'doing',
      nome: 'Em Progresso',
      cartoes: [
        { id: '4', titulo: 'Redesign da landing page', descricao: 'Nova versao com depoimentos', cor: '#8b5cf6', prazo: '2024-01-18' },
      ]
    },
    {
      id: 'done',
      nome: 'Concluido',
      cartoes: [
        { id: '5', titulo: 'Configurar CI/CD', descricao: 'Pipeline automatizado', cor: '#22c55e', prazo: '' },
      ]
    }
  ])

  // Persistencia
  useEffect(() => {
    const saved = localStorage.getItem('kanban_colunas')
    if (saved) {
      setColunas(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanban_colunas', JSON.stringify(colunas))
  }, [colunas])

  const cores = ['#3b82f6', '#22c55e', '#ef4444', '#8b5cf6', '#f97316', '#ec4899', '#06b6d4', '#eab308']

  const adicionarCartao = (colunaId: string) => {
    setColunas(colunas.map(col => {
      if (col.id !== colunaId) return col
      return {
        ...col,
        cartoes: [...col.cartoes, {
          id: Date.now().toString(),
          titulo: 'Novo cartao',
          descricao: '',
          cor: cores[Math.floor(Math.random() * cores.length)],
          prazo: ''
        }]
      }
    }))
  }

  const removerCartao = (colunaId: string, cartaoId: string) => {
    setColunas(colunas.map(col => {
      if (col.id !== colunaId) return col
      return {
        ...col,
        cartoes: col.cartoes.filter(c => c.id !== cartaoId)
      }
    }))
  }

  const atualizarCartao = (colunaId: string, cartaoId: string, campo: keyof Cartao, valor: string) => {
    setColunas(colunas.map(col => {
      if (col.id !== colunaId) return col
      return {
        ...col,
        cartoes: col.cartoes.map(c =>
          c.id === cartaoId ? { ...c, [campo]: valor } : c
        )
      }
    }))
  }

  const moverCartao = (cartaoId: string, colunaOrigemId: string, colunaDestinoId: string) => {
    let cartaoMovido: Cartao | null = null

    // Encontrar e remover da coluna origem
    const novasColunas = colunas.map(col => {
      if (col.id === colunaOrigemId) {
        const cartao = col.cartoes.find(c => c.id === cartaoId)
        if (cartao) cartaoMovido = cartao
        return {
          ...col,
          cartoes: col.cartoes.filter(c => c.id !== cartaoId)
        }
      }
      return col
    })

    // Adicionar na coluna destino
    if (cartaoMovido) {
      setColunas(novasColunas.map(col => {
        if (col.id === colunaDestinoId) {
          return {
            ...col,
            cartoes: [...col.cartoes, cartaoMovido!]
          }
        }
        return col
      }))
    }
  }

  const adicionarColuna = () => {
    setColunas([...colunas, {
      id: Date.now().toString(),
      nome: 'Nova Coluna',
      cartoes: []
    }])
  }

  const removerColuna = (colunaId: string) => {
    if (colunas.length > 1) {
      setColunas(colunas.filter(c => c.id !== colunaId))
    }
  }

  const renomearColuna = (colunaId: string, nome: string) => {
    setColunas(colunas.map(col =>
      col.id === colunaId ? { ...col, nome } : col
    ))
  }

  const gerarKanban = () => {
    return `
QUADRO KANBAN
═══════════════════════════════════════════════════════════════

${colunas.map(col => `
${col.nome.toUpperCase()} (${col.cartoes.length})
─────────────────────────────────────────────────────────────
${col.cartoes.length > 0 ? col.cartoes.map(c =>
  `• ${c.titulo}${c.prazo ? ` [Prazo: ${c.prazo}]` : ''}
    ${c.descricao || '(sem descricao)'}`
).join('\n\n') : '(vazio)'}`).join('\n')}

RESUMO
─────────────────────────────────────────────────────────────
${colunas.map(col => `${col.nome}: ${col.cartoes.length} cartao(s)`).join('\n')}
Total: ${colunas.reduce((sum, col) => sum + col.cartoes.length, 0)} cartoes

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarKanban = () => {
    navigator.clipboard.writeText(gerarKanban())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Kanban className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Quadro <span className="gold-text">Kanban</span>
          </h1>
          <p className="text-[var(--gray)]">Organize tarefas visualmente</p>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={adicionarColuna} className="btn-secondary text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Nova Coluna
          </button>
          <button onClick={copiarKanban} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Exportar'}
          </button>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {colunas.map((coluna) => (
            <div key={coluna.id} className="glass card min-w-[280px] max-w-[280px] flex flex-col">
              {/* Header da Coluna */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <input
                  type="text"
                  value={coluna.nome}
                  onChange={(e) => renomearColuna(coluna.id, e.target.value)}
                  className="bg-transparent font-display text-lg focus:outline-none focus:ring-1 focus:ring-[var(--gold)] rounded px-1 w-full"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {coluna.cartoes.length}
                  </span>
                  <button
                    onClick={() => removerColuna(coluna.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cartoes */}
              <div className="flex-1 space-y-3 min-h-[200px]">
                {coluna.cartoes.map((cartao) => (
                  <div
                    key={cartao.id}
                    className="bg-black/40 rounded-xl p-3 border-l-4 group"
                    style={{ borderLeftColor: cartao.cor }}
                  >
                    {editandoCartao === cartao.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={cartao.titulo}
                          onChange={(e) => atualizarCartao(coluna.id, cartao.id, 'titulo', e.target.value)}
                          className="input-field text-sm"
                          autoFocus
                        />
                        <textarea
                          value={cartao.descricao}
                          onChange={(e) => atualizarCartao(coluna.id, cartao.id, 'descricao', e.target.value)}
                          className="input-field text-sm min-h-[60px]"
                          placeholder="Descricao..."
                        />
                        <input
                          type="date"
                          value={cartao.prazo}
                          onChange={(e) => atualizarCartao(coluna.id, cartao.id, 'prazo', e.target.value)}
                          className="input-field text-sm"
                        />
                        <div className="flex gap-1">
                          {cores.map(cor => (
                            <button
                              key={cor}
                              onClick={() => atualizarCartao(coluna.id, cartao.id, 'cor', cor)}
                              className={`w-5 h-5 rounded-full ${cartao.cor === cor ? 'ring-2 ring-white' : ''}`}
                              style={{ backgroundColor: cor }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setEditandoCartao(null)}
                          className="text-xs text-[var(--gold)]"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-sm">{cartao.titulo}</h4>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setEditandoCartao(cartao.id)}
                              className="text-[var(--gray)] hover:text-white"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removerCartao(coluna.id, cartao.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        {cartao.descricao && (
                          <p className="text-xs text-[var(--gray)] mt-1">{cartao.descricao}</p>
                        )}
                        {cartao.prazo && (
                          <p className="text-xs text-yellow-400 mt-2">Prazo: {cartao.prazo}</p>
                        )}
                        <select
                          value={coluna.id}
                          onChange={(e) => moverCartao(cartao.id, coluna.id, e.target.value)}
                          className="mt-2 opacity-0 group-hover:opacity-100 bg-black/50 border border-white/20 rounded text-xs px-1 py-0.5 w-full transition-opacity"
                        >
                          {colunas.map(col => (
                            <option key={col.id} value={col.id}>Mover para: {col.nome}</option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Adicionar Cartao */}
              <button
                onClick={() => adicionarCartao(coluna.id)}
                className="mt-4 w-full py-2 border border-dashed border-white/20 rounded-xl text-sm text-[var(--gray)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Adicionar cartao
              </button>
            </div>
          ))}
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30 mt-8">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Uso</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Organizacao</h4>
              <ul className="space-y-1">
                <li>• Limite cartoes em progresso (WIP)</li>
                <li>• Mova cartoes da esquerda para direita</li>
                <li>• Use cores para categorizar</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Boas Praticas</h4>
              <ul className="space-y-1">
                <li>• Revise o quadro diariamente</li>
                <li>• Mantenha cartoes pequenos e especificos</li>
                <li>• Celebre cartoes concluidos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
