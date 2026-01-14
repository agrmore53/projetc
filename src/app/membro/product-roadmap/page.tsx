'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Map, Copy, Check, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

interface Feature {
  id: string
  nome: string
  descricao: string
  status: 'backlog' | 'planejado' | 'em_progresso' | 'concluido'
  prioridade: 'alta' | 'media' | 'baixa'
  trimestre: string
}

interface Iniciativa {
  id: string
  nome: string
  objetivo: string
  features: Feature[]
  expandido: boolean
}

export default function ProductRoadmapPage() {
  const [copied, setCopied] = useState(false)
  const [ano, setAno] = useState(new Date().getFullYear())
  const [produto, setProduto] = useState('')

  const trimestres = ['Q1', 'Q2', 'Q3', 'Q4']

  const [iniciativas, setIniciativas] = useState<Iniciativa[]>([
    {
      id: '1',
      nome: 'Melhorar Onboarding',
      objetivo: 'Reduzir time-to-value de 7 para 3 dias',
      expandido: true,
      features: [
        { id: '1-1', nome: 'Wizard de configuracao', descricao: 'Setup guiado passo-a-passo', status: 'concluido', prioridade: 'alta', trimestre: 'Q1' },
        { id: '1-2', nome: 'Checklist interativo', descricao: 'Gamificacao do onboarding', status: 'em_progresso', prioridade: 'alta', trimestre: 'Q1' },
        { id: '1-3', nome: 'Videos tutoriais', descricao: 'Biblioteca de how-to videos', status: 'planejado', prioridade: 'media', trimestre: 'Q2' },
      ]
    },
    {
      id: '2',
      nome: 'Integracoes',
      objetivo: 'Aumentar stickiness com ecossistema',
      expandido: true,
      features: [
        { id: '2-1', nome: 'Integracao Slack', descricao: 'Notificacoes e acoes no Slack', status: 'planejado', prioridade: 'alta', trimestre: 'Q2' },
        { id: '2-2', nome: 'Integracao HubSpot', descricao: 'Sync bidirecional', status: 'backlog', prioridade: 'media', trimestre: 'Q3' },
        { id: '2-3', nome: 'API Publica', descricao: 'Documentacao e endpoints publicos', status: 'backlog', prioridade: 'baixa', trimestre: 'Q4' },
      ]
    },
  ])

  const toggleIniciativa = (id: string) => {
    setIniciativas(iniciativas.map(i =>
      i.id === id ? { ...i, expandido: !i.expandido } : i
    ))
  }

  const adicionarIniciativa = () => {
    const nova: Iniciativa = {
      id: Date.now().toString(),
      nome: 'Nova Iniciativa',
      objetivo: '',
      expandido: true,
      features: []
    }
    setIniciativas([...iniciativas, nova])
  }

  const removerIniciativa = (id: string) => {
    setIniciativas(iniciativas.filter(i => i.id !== id))
  }

  const atualizarIniciativa = (id: string, campo: 'nome' | 'objetivo', valor: string) => {
    setIniciativas(iniciativas.map(i =>
      i.id === id ? { ...i, [campo]: valor } : i
    ))
  }

  const adicionarFeature = (iniciativaId: string) => {
    const novaFeature: Feature = {
      id: Date.now().toString(),
      nome: '',
      descricao: '',
      status: 'backlog',
      prioridade: 'media',
      trimestre: 'Q1'
    }
    setIniciativas(iniciativas.map(i =>
      i.id === iniciativaId
        ? { ...i, features: [...i.features, novaFeature] }
        : i
    ))
  }

  const removerFeature = (iniciativaId: string, featureId: string) => {
    setIniciativas(iniciativas.map(i =>
      i.id === iniciativaId
        ? { ...i, features: i.features.filter(f => f.id !== featureId) }
        : i
    ))
  }

  const atualizarFeature = (iniciativaId: string, featureId: string, campo: keyof Feature, valor: string) => {
    setIniciativas(iniciativas.map(i =>
      i.id === iniciativaId
        ? {
            ...i,
            features: i.features.map(f =>
              f.id === featureId ? { ...f, [campo]: valor } : f
            )
          }
        : i
    ))
  }

  const getCorStatus = (status: Feature['status']) => {
    switch (status) {
      case 'concluido': return '#22c55e'
      case 'em_progresso': return '#3b82f6'
      case 'planejado': return '#eab308'
      default: return '#6b7280'
    }
  }

  const getCorPrioridade = (prioridade: Feature['prioridade']) => {
    switch (prioridade) {
      case 'alta': return '#ef4444'
      case 'media': return '#eab308'
      default: return '#6b7280'
    }
  }

  const featuresPorTrimestre = (trimestre: string) => {
    return iniciativas.flatMap(i =>
      i.features.filter(f => f.trimestre === trimestre)
    )
  }

  const copiarRoadmap = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    ROADMAP DE PRODUTO ${ano}
                    ${produto || '[PRODUTO]'}
═══════════════════════════════════════════════════════════════

${trimestres.map(q => `
${q} ${ano}
───────────────────────────────────────────────────────────────
${featuresPorTrimestre(q).length > 0
  ? featuresPorTrimestre(q).map(f => `• ${f.nome} [${f.status.toUpperCase()}] (${f.prioridade})`).join('\n')
  : '(Nenhuma feature planejada)'}
`).join('')}

INICIATIVAS DETALHADAS
───────────────────────────────────────────────────────────────
${iniciativas.map(i => `
${i.nome.toUpperCase()}
Objetivo: ${i.objetivo || '[Nao definido]'}
Features:
${i.features.map(f => `  • ${f.nome} - ${f.descricao || '[Sem descricao]'}
    Status: ${f.status} | Prioridade: ${f.prioridade} | ${f.trimestre}`).join('\n')}
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

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Map className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Roadmap</span> de Produto
          </h1>
          <p className="text-[var(--gray)]">Planeje o futuro do seu produto</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Produto</label>
              <input
                type="text"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                placeholder="Nome do produto"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Ano</label>
              <select
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
                className="input-field"
              >
                {[2024, 2025, 2026, 2027].map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={adicionarIniciativa} className="btn-secondary flex-1 flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Iniciativa
              </button>
              <button onClick={copiarRoadmap} className="btn-primary flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="glass card mb-8 overflow-x-auto">
          <h2 className="font-display text-lg mb-4">Timeline {ano}</h2>
          <div className="grid grid-cols-4 gap-4 min-w-[600px]">
            {trimestres.map((q) => {
              const features = featuresPorTrimestre(q)
              return (
                <div key={q} className="bg-black/30 rounded-xl p-4">
                  <h3 className="font-display text-center mb-3 text-[var(--gold)]">{q}</h3>
                  <div className="space-y-2">
                    {features.map((f) => (
                      <div
                        key={f.id}
                        className="text-xs p-2 rounded-lg"
                        style={{ backgroundColor: `${getCorStatus(f.status)}20`, borderLeft: `3px solid ${getCorStatus(f.status)}` }}
                      >
                        <p className="font-semibold truncate">{f.nome || 'Sem nome'}</p>
                        <p className="text-[var(--gray)]">{f.status}</p>
                      </div>
                    ))}
                    {features.length === 0 && (
                      <p className="text-xs text-[var(--gray)] text-center py-4">Vazio</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Iniciativas */}
        <div className="space-y-4 mb-8">
          {iniciativas.map((iniciativa) => (
            <div key={iniciativa.id} className="glass card">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => toggleIniciativa(iniciativa.id)}>
                  {iniciativa.expandido
                    ? <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                    : <ChevronRight className="w-5 h-5 text-[var(--gold)]" />
                  }
                </button>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={iniciativa.nome}
                    onChange={(e) => atualizarIniciativa(iniciativa.id, 'nome', e.target.value)}
                    placeholder="Nome da iniciativa"
                    className="input-field font-semibold"
                  />
                  <input
                    type="text"
                    value={iniciativa.objetivo}
                    onChange={(e) => atualizarIniciativa(iniciativa.id, 'objetivo', e.target.value)}
                    placeholder="Objetivo mensuravel"
                    className="input-field text-sm"
                  />
                </div>
                <button onClick={() => removerIniciativa(iniciativa.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {iniciativa.expandido && (
                <div className="pl-8 space-y-3">
                  {iniciativa.features.map((feature) => (
                    <div key={feature.id} className="bg-black/30 rounded-xl p-3">
                      <div className="grid md:grid-cols-6 gap-2 items-center">
                        <input
                          type="text"
                          value={feature.nome}
                          onChange={(e) => atualizarFeature(iniciativa.id, feature.id, 'nome', e.target.value)}
                          placeholder="Feature"
                          className="input-field text-sm md:col-span-2"
                        />
                        <input
                          type="text"
                          value={feature.descricao}
                          onChange={(e) => atualizarFeature(iniciativa.id, feature.id, 'descricao', e.target.value)}
                          placeholder="Descricao"
                          className="input-field text-sm"
                        />
                        <select
                          value={feature.status}
                          onChange={(e) => atualizarFeature(iniciativa.id, feature.id, 'status', e.target.value)}
                          className="input-field text-sm"
                          style={{ borderColor: getCorStatus(feature.status) }}
                        >
                          <option value="backlog">Backlog</option>
                          <option value="planejado">Planejado</option>
                          <option value="em_progresso">Em Progresso</option>
                          <option value="concluido">Concluido</option>
                        </select>
                        <select
                          value={feature.trimestre}
                          onChange={(e) => atualizarFeature(iniciativa.id, feature.id, 'trimestre', e.target.value)}
                          className="input-field text-sm"
                        >
                          {trimestres.map(q => (
                            <option key={q} value={q}>{q}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <select
                            value={feature.prioridade}
                            onChange={(e) => atualizarFeature(iniciativa.id, feature.id, 'prioridade', e.target.value)}
                            className="input-field text-sm flex-1"
                            style={{ borderColor: getCorPrioridade(feature.prioridade) }}
                          >
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baixa">Baixa</option>
                          </select>
                          <button
                            onClick={() => removerFeature(iniciativa.id, feature.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => adicionarFeature(iniciativa.id)}
                    className="text-[var(--gold)] text-sm hover:opacity-80 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Feature
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Legenda de Status</h3>
          <div className="grid grid-cols-4 gap-4 text-sm text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6b7280' }} />
              <span>Backlog</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }} />
              <span>Planejado</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              <span>Em Progresso</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span>Concluido</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
