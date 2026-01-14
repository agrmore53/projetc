'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Plus, Trash2, DollarSign, Target, Users, ChevronRight, BarChart3 } from 'lucide-react'

interface Oportunidade {
  id: string
  nome: string
  valor: number
  probabilidade: number
  etapa: string
  diasNoEstagio: number
}

interface Etapa {
  id: string
  nome: string
  taxaConversao: number
  cor: string
}

export default function PipelinePage() {
  const [etapas] = useState<Etapa[]>([
    { id: '1', nome: 'Prospecção', taxaConversao: 30, cor: '#6366f1' },
    { id: '2', nome: 'Qualificação', taxaConversao: 50, cor: '#8b5cf6' },
    { id: '3', nome: 'Proposta', taxaConversao: 60, cor: '#d946ef' },
    { id: '4', nome: 'Negociação', taxaConversao: 75, cor: '#f59e0b' },
    { id: '5', nome: 'Fechamento', taxaConversao: 90, cor: '#22c55e' },
  ])

  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([
    { id: '1', nome: 'Cliente ABC', valor: 15000, probabilidade: 30, etapa: '1', diasNoEstagio: 5 },
    { id: '2', nome: 'Empresa XYZ', valor: 25000, probabilidade: 50, etapa: '2', diasNoEstagio: 3 },
    { id: '3', nome: 'Startup Tech', valor: 50000, probabilidade: 60, etapa: '3', diasNoEstagio: 7 },
  ])

  const [metaMensal, setMetaMensal] = useState(100000)
  const [cicloVendas, setCicloVendas] = useState(30)

  const adicionarOportunidade = () => {
    const nova: Oportunidade = {
      id: Date.now().toString(),
      nome: `Oportunidade ${oportunidades.length + 1}`,
      valor: 10000,
      probabilidade: 30,
      etapa: '1',
      diasNoEstagio: 0
    }
    setOportunidades([...oportunidades, nova])
  }

  const removerOportunidade = (id: string) => {
    setOportunidades(oportunidades.filter(o => o.id !== id))
  }

  const atualizarOportunidade = (id: string, campo: keyof Oportunidade, valor: string | number) => {
    setOportunidades(oportunidades.map(o => {
      if (o.id === id) {
        const atualizada = { ...o, [campo]: valor }
        if (campo === 'etapa') {
          const etapa = etapas.find(e => e.id === valor)
          if (etapa) {
            atualizada.probabilidade = etapa.taxaConversao
          }
        }
        return atualizada
      }
      return o
    }))
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  // Cálculos do pipeline
  const valorTotalPipeline = oportunidades.reduce((acc, o) => acc + o.valor, 0)
  const valorPonderado = oportunidades.reduce((acc, o) => acc + (o.valor * o.probabilidade / 100), 0)
  const oportunidadesPorEtapa = etapas.map(e => ({
    ...e,
    oportunidades: oportunidades.filter(o => o.etapa === e.id),
    valorTotal: oportunidades.filter(o => o.etapa === e.id).reduce((acc, o) => acc + o.valor, 0)
  }))

  const progressoMeta = (valorPonderado / metaMensal) * 100
  const velocidadePipeline = cicloVendas > 0 ? valorPonderado / cicloVendas * 30 : 0

  // Previsão de fechamento
  const previsaoFechamento = oportunidades
    .filter(o => o.probabilidade >= 60)
    .reduce((acc, o) => acc + o.valor, 0)

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
            <TrendingUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Simulador de <span className="gold-text">Pipeline</span>
          </h1>
          <p className="text-[var(--gray)]">Visualize e preveja suas vendas</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 text-center">
            <DollarSign className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Pipeline Total</p>
            <p className="font-display text-lg gold-text">{formatCurrency(valorTotalPipeline)}</p>
          </div>
          <div className="glass p-4 text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Valor Ponderado</p>
            <p className="font-display text-lg text-green-400">{formatCurrency(valorPonderado)}</p>
          </div>
          <div className="glass p-4 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Oportunidades</p>
            <p className="font-display text-lg text-blue-400">{oportunidades.length}</p>
          </div>
          <div className="glass p-4 text-center">
            <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Previsão Alta</p>
            <p className="font-display text-lg text-purple-400">{formatCurrency(previsaoFechamento)}</p>
          </div>
        </div>

        {/* Configurações */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configurações</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="input-label flex justify-between">
                <span>Meta Mensal</span>
                <span className="text-[var(--gold)]">{formatCurrency(metaMensal)}</span>
              </label>
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={metaMensal}
                onChange={(e) => setMetaMensal(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
              <div className="mt-2">
                <div className="flex justify-between text-xs text-[var(--gray)] mb-1">
                  <span>Progresso da Meta</span>
                  <span>{progressoMeta.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(progressoMeta, 100)}%`,
                      backgroundColor: progressoMeta >= 100 ? '#22c55e' : 'var(--gold)'
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="input-label flex justify-between">
                <span>Ciclo Médio de Vendas</span>
                <span className="text-[var(--gold)]">{cicloVendas} dias</span>
              </label>
              <input
                type="range"
                min="7"
                max="90"
                step="1"
                value={cicloVendas}
                onChange={(e) => setCicloVendas(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
              <p className="text-xs text-[var(--gray)] mt-2">
                Velocidade do Pipeline: {formatCurrency(velocidadePipeline)}/mês
              </p>
            </div>
          </div>
        </div>

        {/* Funil Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-6">Funil de Vendas</h2>
          <div className="space-y-3">
            {oportunidadesPorEtapa.map((etapa, index) => (
              <div key={etapa.id} className="relative">
                <div
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{
                    backgroundColor: `${etapa.cor}20`,
                    borderLeft: `4px solid ${etapa.cor}`,
                    width: `${100 - index * 10}%`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: etapa.cor }} className="font-semibold">{etapa.nome}</span>
                    <span className="text-xs text-[var(--gray)]">
                      {etapa.oportunidades.length} oportunidade(s)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{formatCurrency(etapa.valorTotal)}</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: etapa.cor }}>
                      {etapa.taxaConversao}%
                    </span>
                  </div>
                </div>
                {index < oportunidadesPorEtapa.length - 1 && (
                  <ChevronRight className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 text-[var(--gray)]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Oportunidades */}
        <div className="glass card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Oportunidades</h2>
            <button onClick={adicionarOportunidade} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Nova Oportunidade
            </button>
          </div>

          <div className="space-y-4">
            {oportunidades.map((op) => {
              const etapa = etapas.find(e => e.id === op.etapa)
              return (
                <div key={op.id} className="bg-black/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={op.nome}
                      onChange={(e) => atualizarOportunidade(op.id, 'nome', e.target.value)}
                      className="bg-transparent border-none text-white font-semibold focus:outline-none text-lg"
                    />
                    <button
                      onClick={() => removerOportunidade(op.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="input-label text-sm">Valor</label>
                      <input
                        type="number"
                        value={op.valor}
                        onChange={(e) => atualizarOportunidade(op.id, 'valor', Number(e.target.value))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="input-label text-sm">Etapa</label>
                      <select
                        value={op.etapa}
                        onChange={(e) => atualizarOportunidade(op.id, 'etapa', e.target.value)}
                        className="input-field"
                      >
                        {etapas.map(e => (
                          <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="input-label text-sm flex justify-between">
                        <span>Probabilidade</span>
                        <span className="text-[var(--gold)]">{op.probabilidade}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={op.probabilidade}
                        onChange={(e) => atualizarOportunidade(op.id, 'probabilidade', Number(e.target.value))}
                        className="w-full accent-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: etapa?.cor }}
                      />
                      <span className="text-sm text-[var(--gray)]">{etapa?.nome}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--gray)]">Valor Ponderado</p>
                      <p className="font-display text-[var(--gold)]">
                        {formatCurrency(op.valor * op.probabilidade / 100)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {oportunidades.length === 0 && (
            <div className="text-center py-8 text-[var(--gray)]">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma oportunidade cadastrada</p>
              <p className="text-sm">Clique em "Nova Oportunidade" para começar</p>
            </div>
          )}
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Gestão de Pipeline</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Valor Ponderado</h4>
              <p>Multiplica o valor da oportunidade pela probabilidade de fechamento para previsões mais realistas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Velocidade do Pipeline</h4>
              <p>Quanto você pode esperar faturar por mês baseado no seu ciclo de vendas atual.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Regra 3x</h4>
              <p>Mantenha pelo menos 3x sua meta em pipeline total para garantir que vai bater a meta.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
