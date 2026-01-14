'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Target, TrendingUp, Calendar, CheckCircle, Clock, Flame, Award, Plus, Trash2 } from 'lucide-react'

interface Meta {
  id: string
  titulo: string
  atual: number
  objetivo: number
  unidade: string
}

interface Atividade {
  id: string
  data: string
  descricao: string
  tipo: 'conquista' | 'tarefa' | 'aprendizado'
}

export default function DashboardPage() {
  const [metas, setMetas] = useState<Meta[]>([
    { id: '1', titulo: 'Faturamento Mensal', atual: 15000, objetivo: 30000, unidade: 'R$' },
    { id: '2', titulo: 'Clientes Ativos', atual: 12, objetivo: 25, unidade: '' },
    { id: '3', titulo: 'Reuniões/Semana', atual: 8, objetivo: 15, unidade: '' },
    { id: '4', titulo: 'Taxa de Conversão', atual: 15, objetivo: 25, unidade: '%' },
  ])

  const [atividades, setAtividades] = useState<Atividade[]>([
    { id: '1', data: new Date().toISOString(), descricao: 'Completou o módulo de vendas', tipo: 'conquista' },
    { id: '2', data: new Date(Date.now() - 86400000).toISOString(), descricao: 'Fechou primeiro cliente', tipo: 'conquista' },
  ])

  const [diasConsecutivos, setDiasConsecutivos] = useState(7)
  const [novaMeta, setNovaMeta] = useState({ titulo: '', objetivo: '', unidade: 'R$' })
  const [novaAtividade, setNovaAtividade] = useState('')
  const [showAddMeta, setShowAddMeta] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.metas) setMetas(parsed.metas)
        if (parsed.atividades) setAtividades(parsed.atividades)
        if (parsed.diasConsecutivos) setDiasConsecutivos(parsed.diasConsecutivos)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dashboard_data', JSON.stringify({ metas, atividades, diasConsecutivos }))
  }, [metas, atividades, diasConsecutivos])

  const atualizarMeta = (id: string, novoAtual: number) => {
    setMetas(metas.map(m => m.id === id ? { ...m, atual: novoAtual } : m))
  }

  const adicionarMeta = () => {
    if (novaMeta.titulo && novaMeta.objetivo) {
      setMetas([...metas, {
        id: Date.now().toString(),
        titulo: novaMeta.titulo,
        atual: 0,
        objetivo: Number(novaMeta.objetivo),
        unidade: novaMeta.unidade
      }])
      setNovaMeta({ titulo: '', objetivo: '', unidade: 'R$' })
      setShowAddMeta(false)
    }
  }

  const removerMeta = (id: string) => {
    setMetas(metas.filter(m => m.id !== id))
  }

  const adicionarAtividade = () => {
    if (novaAtividade.trim()) {
      setAtividades([{
        id: Date.now().toString(),
        data: new Date().toISOString(),
        descricao: novaAtividade,
        tipo: 'conquista'
      }, ...atividades])
      setNovaAtividade('')
    }
  }

  const getProgressColor = (percentual: number) => {
    if (percentual >= 100) return 'bg-green-500'
    if (percentual >= 70) return 'bg-[var(--gold)]'
    if (percentual >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const totalProgresso = metas.length > 0
    ? Math.round(metas.reduce((acc, m) => acc + Math.min(100, (m.atual / m.objetivo) * 100), 0) / metas.length)
    : 0

  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr)
    const hoje = new Date()
    const ontem = new Date(hoje)
    ontem.setDate(ontem.getDate() - 1)

    if (data.toDateString() === hoje.toDateString()) return 'Hoje'
    if (data.toDateString() === ontem.toDateString()) return 'Ontem'
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
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
            <BarChart3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Seu <span className="gold-text">Dashboard</span>
          </h1>
          <p className="text-[var(--gray)]">Acompanhe seu progresso e conquistas</p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 text-center">
            <TrendingUp className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-3xl font-display gold-text">{totalProgresso}%</p>
            <p className="text-sm text-[var(--gray)]">Progresso Geral</p>
          </div>
          <div className="glass p-4 text-center">
            <Target className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-3xl font-display gold-text">{metas.filter(m => m.atual >= m.objetivo).length}/{metas.length}</p>
            <p className="text-sm text-[var(--gray)]">Metas Atingidas</p>
          </div>
          <div className="glass p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-display text-orange-500">{diasConsecutivos}</p>
            <p className="text-sm text-[var(--gray)]">Dias Consecutivos</p>
          </div>
          <div className="glass p-4 text-center">
            <Award className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-3xl font-display gold-text">{atividades.filter(a => a.tipo === 'conquista').length}</p>
            <p className="text-sm text-[var(--gray)]">Conquistas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Metas */}
          <div className="lg:col-span-2">
            <div className="glass card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--gold)]" />
                  Suas Metas
                </h2>
                <button
                  onClick={() => setShowAddMeta(!showAddMeta)}
                  className="btn-secondary text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Nova Meta
                </button>
              </div>

              {showAddMeta && (
                <div className="bg-black/30 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={novaMeta.titulo}
                        onChange={(e) => setNovaMeta({...novaMeta, titulo: e.target.value})}
                        placeholder="Nome da meta"
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <select
                        value={novaMeta.unidade}
                        onChange={(e) => setNovaMeta({...novaMeta, unidade: e.target.value})}
                        className="input-field text-sm"
                      >
                        <option value="R$">R$</option>
                        <option value="%">%</option>
                        <option value="">Número</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={novaMeta.objetivo}
                      onChange={(e) => setNovaMeta({...novaMeta, objetivo: e.target.value})}
                      placeholder="Objetivo"
                      className="input-field text-sm flex-1"
                    />
                    <button onClick={adicionarMeta} className="btn-primary text-sm">
                      Adicionar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {metas.map(meta => {
                  const percentual = Math.min(100, Math.round((meta.atual / meta.objetivo) * 100))
                  return (
                    <div key={meta.id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{meta.titulo}</span>
                          {percentual >= 100 && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[var(--gold)]">
                            {meta.unidade === 'R$' && 'R$ '}{meta.atual.toLocaleString()}{meta.unidade === '%' && '%'}
                            <span className="text-[var(--gray)]"> / {meta.unidade === 'R$' && 'R$ '}{meta.objetivo.toLocaleString()}{meta.unidade === '%' && '%'}</span>
                          </span>
                          <button
                            onClick={() => removerMeta(meta.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(percentual)} transition-all duration-500`}
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                        <span className="absolute right-0 top-4 text-xs text-[var(--gray)]">{percentual}%</span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max={meta.objetivo * 1.5}
                        value={meta.atual}
                        onChange={(e) => atualizarMeta(meta.id, Number(e.target.value))}
                        className="w-full mt-2 accent-[var(--gold)]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Atividades e Streak */}
          <div className="space-y-6">
            {/* Streak */}
            <div className="glass card text-center">
              <Flame className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <p className="text-4xl font-display text-orange-500 mb-1">{diasConsecutivos} dias</p>
              <p className="text-[var(--gray)] text-sm mb-4">de aprendizado consecutivo</p>

              <div className="flex justify-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      i < diasConsecutivos % 7 || diasConsecutivos >= 7
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-[var(--gray)]'
                    }`}
                  >
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][i]}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setDiasConsecutivos(d => d + 1)}
                  className="btn-primary flex-1 text-sm"
                >
                  +1 Dia
                </button>
                <button
                  onClick={() => setDiasConsecutivos(0)}
                  className="btn-secondary text-sm"
                >
                  Resetar
                </button>
              </div>
            </div>

            {/* Histórico */}
            <div className="glass card">
              <h3 className="font-display text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--gold)]" />
                Histórico
              </h3>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={novaAtividade}
                  onChange={(e) => setNovaAtividade(e.target.value)}
                  placeholder="Nova conquista..."
                  className="input-field text-sm flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && adicionarAtividade()}
                />
                <button onClick={adicionarAtividade} className="btn-primary p-2">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {atividades.slice(0, 10).map(atividade => (
                  <div key={atividade.id} className="flex items-start gap-3 pb-3 border-b border-white/10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      atividade.tipo === 'conquista' ? 'bg-[var(--gold)]/20 text-[var(--gold)]' :
                      atividade.tipo === 'tarefa' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {atividade.tipo === 'conquista' ? <Award className="w-4 h-4" /> :
                       atividade.tipo === 'tarefa' ? <CheckCircle className="w-4 h-4" /> :
                       <Clock className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{atividade.descricao}</p>
                      <p className="text-xs text-[var(--gray)]">{formatarData(atividade.data)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
