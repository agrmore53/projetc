'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Grid3X3, Plus, Trash2, Copy, Check, ArrowUpDown, Zap, Target, Clock, Percent } from 'lucide-react'

interface Item {
  id: string
  nome: string
  descricao: string
  // ICE
  impacto: number
  confianca: number
  facilidade: number
  // RICE adicional
  alcance: number
  esforco: number
}

export default function PriorizacaoPage() {
  const [copied, setCopied] = useState(false)
  const [metodo, setMetodo] = useState<'ice' | 'rice'>('ice')
  const [ordenar, setOrdenar] = useState(true)

  const [items, setItems] = useState<Item[]>([
    { id: '1', nome: 'Implementar chat ao vivo', descricao: 'Suporte em tempo real', impacto: 8, confianca: 7, facilidade: 5, alcance: 500, esforco: 3 },
    { id: '2', nome: 'Melhorar onboarding', descricao: 'Reducao de churn inicial', impacto: 9, confianca: 8, facilidade: 6, alcance: 1000, esforco: 4 },
    { id: '3', nome: 'Integracao com Slack', descricao: 'Pedido de clientes', impacto: 6, confianca: 9, facilidade: 4, alcance: 200, esforco: 5 },
  ])

  const adicionarItem = () => {
    const novo: Item = {
      id: Date.now().toString(),
      nome: 'Nova Iniciativa',
      descricao: 'Descreva a iniciativa',
      impacto: 5,
      confianca: 5,
      facilidade: 5,
      alcance: 100,
      esforco: 3
    }
    setItems([...items, novo])
  }

  const removerItem = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  const atualizarItem = (id: string, campo: keyof Item, valor: string | number) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, [campo]: valor } : i
    ))
  }

  const calcularICE = (item: Item) => {
    return (item.impacto * item.confianca * item.facilidade) / 10
  }

  const calcularRICE = (item: Item) => {
    if (item.esforco === 0) return 0
    return (item.alcance * item.impacto * item.confianca) / (item.esforco * 100)
  }

  const calcularScore = (item: Item) => {
    return metodo === 'ice' ? calcularICE(item) : calcularRICE(item)
  }

  const itemsOrdenados = ordenar
    ? [...items].sort((a, b) => calcularScore(b) - calcularScore(a))
    : items

  const getCorScore = (score: number, maxScore: number) => {
    const percentual = maxScore > 0 ? (score / maxScore) * 100 : 0
    if (percentual >= 70) return '#22c55e'
    if (percentual >= 40) return '#eab308'
    return '#ef4444'
  }

  const maxScore = items.length > 0 ? Math.max(...items.map(calcularScore)) : 0

  const getPrioridade = (score: number, maxScore: number) => {
    const percentual = maxScore > 0 ? (score / maxScore) * 100 : 0
    if (percentual >= 70) return { label: 'Alta', cor: '#22c55e' }
    if (percentual >= 40) return { label: 'Media', cor: '#eab308' }
    return { label: 'Baixa', cor: '#ef4444' }
  }

  const copiarPriorizacao = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
              MATRIZ DE PRIORIZACAO - ${metodo.toUpperCase()}
═══════════════════════════════════════════════════════════════

${itemsOrdenados.map((item, i) => {
  const score = calcularScore(item)
  const prioridade = getPrioridade(score, maxScore)
  return `
${i + 1}. ${item.nome}
   ${item.descricao}
   Score: ${score.toFixed(1)} | Prioridade: ${prioridade.label}
   ${metodo === 'ice'
     ? `Impacto: ${item.impacto} | Confianca: ${item.confianca} | Facilidade: ${item.facilidade}`
     : `Alcance: ${item.alcance} | Impacto: ${item.impacto} | Confianca: ${item.confianca}% | Esforco: ${item.esforco}`
   }
`
}).join('')}

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

      <div className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Matriz de <span className="gold-text">Priorizacao</span>
          </h1>
          <p className="text-[var(--gray)]">ICE e RICE para priorizar iniciativas</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setMetodo('ice')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  metodo === 'ice' ? 'bg-[var(--gold)] text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                ICE Score
              </button>
              <button
                onClick={() => setMetodo('rice')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  metodo === 'rice' ? 'bg-[var(--gold)] text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                RICE Score
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setOrdenar(!ordenar)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                {ordenar ? 'Ordenado' : 'Manual'}
              </button>
              <button onClick={adicionarItem} className="btn-secondary flex items-center gap-2">
                <Plus className="w-4 h-4" /> Adicionar
              </button>
              <button onClick={copiarPriorizacao} className="btn-primary flex items-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Explicacao do metodo */}
          <div className="mt-4 p-4 bg-black/30 rounded-xl">
            {metodo === 'ice' ? (
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[var(--gold)]" />
                  <span><strong>I</strong>mpacto: Quanto isso vai impactar? (1-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[var(--gold)]" />
                  <span><strong>C</strong>onfianca: Quao certo voce esta? (1-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--gold)]" />
                  <span><strong>E</strong>ase (Facilidade): Quao facil e fazer? (1-10)</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span><strong>R</strong>each: Quantas pessoas serao impactadas?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>I</strong>mpact: Qual o impacto por pessoa? (1-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>C</strong>onfidence: Confianca na estimativa (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>E</strong>ffort: Esforco em pessoa-semanas</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lista de Items */}
        <div className="space-y-4">
          {itemsOrdenados.map((item, index) => {
            const score = calcularScore(item)
            const prioridade = getPrioridade(score, maxScore)

            return (
              <div key={item.id} className="glass card">
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0"
                    style={{ backgroundColor: `${prioridade.cor}20`, color: prioridade.cor }}
                  >
                    #{index + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.nome}
                          onChange={(e) => atualizarItem(item.id, 'nome', e.target.value)}
                          className="bg-transparent border-none font-display text-lg focus:outline-none w-full"
                        />
                        <input
                          type="text"
                          value={item.descricao}
                          onChange={(e) => atualizarItem(item.id, 'descricao', e.target.value)}
                          className="bg-transparent border-none text-sm text-[var(--gray)] focus:outline-none w-full"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-display text-2xl" style={{ color: prioridade.cor }}>
                            {score.toFixed(1)}
                          </p>
                          <p className="text-xs" style={{ color: prioridade.cor }}>{prioridade.label}</p>
                        </div>
                        <button
                          onClick={() => removerItem(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Sliders */}
                    {metodo === 'ice' ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-[var(--gray)] flex justify-between">
                            <span>Impacto</span>
                            <span className="text-[var(--gold)]">{item.impacto}</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.impacto}
                            onChange={(e) => atualizarItem(item.id, 'impacto', Number(e.target.value))}
                            className="w-full accent-[var(--gold)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--gray)] flex justify-between">
                            <span>Confianca</span>
                            <span className="text-[var(--gold)]">{item.confianca}</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.confianca}
                            onChange={(e) => atualizarItem(item.id, 'confianca', Number(e.target.value))}
                            className="w-full accent-[var(--gold)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--gray)] flex justify-between">
                            <span>Facilidade</span>
                            <span className="text-[var(--gold)]">{item.facilidade}</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.facilidade}
                            onChange={(e) => atualizarItem(item.id, 'facilidade', Number(e.target.value))}
                            className="w-full accent-[var(--gold)]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-xs text-[var(--gray)]">Alcance (pessoas)</label>
                          <input
                            type="number"
                            value={item.alcance}
                            onChange={(e) => atualizarItem(item.id, 'alcance', Number(e.target.value))}
                            className="input-field text-sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--gray)] flex justify-between">
                            <span>Impacto</span>
                            <span className="text-[var(--gold)]">{item.impacto}</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.impacto}
                            onChange={(e) => atualizarItem(item.id, 'impacto', Number(e.target.value))}
                            className="w-full accent-[var(--gold)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--gray)] flex justify-between">
                            <span>Confianca</span>
                            <span className="text-[var(--gold)]">{item.confianca}0%</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.confianca}
                            onChange={(e) => atualizarItem(item.id, 'confianca', Number(e.target.value))}
                            className="w-full accent-[var(--gold)]"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--gray)]">Esforco (semanas)</label>
                          <input
                            type="number"
                            value={item.esforco}
                            onChange={(e) => atualizarItem(item.id, 'esforco', Number(e.target.value))}
                            className="input-field text-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {items.length === 0 && (
          <div className="glass card text-center py-12">
            <Grid3X3 className="w-12 h-12 mx-auto mb-4 text-[var(--gray)] opacity-50" />
            <p className="text-[var(--gray)]">Nenhuma iniciativa adicionada</p>
            <p className="text-sm text-[var(--gray)]">Clique em "Adicionar" para comecar</p>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Quando Usar Cada Metodo</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">ICE Score</h4>
              <p className="mb-2">Ideal para: Decisoes rapidas, times pequenos, experimentos.</p>
              <p>Formula: (Impacto x Confianca x Facilidade) / 10</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">RICE Score</h4>
              <p className="mb-2">Ideal para: Roadmap de produto, times maiores, features complexas.</p>
              <p>Formula: (Alcance x Impacto x Confianca) / Esforco</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
