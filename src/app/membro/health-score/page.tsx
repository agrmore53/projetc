'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Activity, Copy, Check, Plus, Trash2, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface Cliente {
  id: string
  nome: string
  mrr: number
  // Indicadores de saude (0-10)
  usoProduto: number
  engajamento: number
  suporte: number
  pagamento: number
  nps: number
  tempoCliente: number // meses
}

interface Indicador {
  nome: string
  peso: number
  campo: keyof Cliente
  descricao: string
}

export default function HealthScorePage() {
  const [copied, setCopied] = useState(false)

  const indicadores: Indicador[] = [
    { nome: 'Uso do Produto', peso: 25, campo: 'usoProduto', descricao: 'Frequencia e profundidade de uso' },
    { nome: 'Engajamento', peso: 20, campo: 'engajamento', descricao: 'Participacao em calls, eventos, feedbacks' },
    { nome: 'Tickets de Suporte', peso: 15, campo: 'suporte', descricao: '10 = poucos tickets, 1 = muitos tickets' },
    { nome: 'Historico Pagamento', peso: 20, campo: 'pagamento', descricao: 'Pagamentos em dia, sem atrasos' },
    { nome: 'NPS/Satisfacao', peso: 20, campo: 'nps', descricao: 'Ultima nota de satisfacao' },
  ]

  const [clientes, setClientes] = useState<Cliente[]>([
    { id: '1', nome: 'Empresa Alpha', mrr: 2500, usoProduto: 9, engajamento: 8, suporte: 9, pagamento: 10, nps: 9, tempoCliente: 12 },
    { id: '2', nome: 'Empresa Beta', mrr: 1500, usoProduto: 6, engajamento: 5, suporte: 7, pagamento: 10, nps: 7, tempoCliente: 8 },
    { id: '3', nome: 'Empresa Gamma', mrr: 3000, usoProduto: 4, engajamento: 3, suporte: 4, pagamento: 8, nps: 5, tempoCliente: 6 },
    { id: '4', nome: 'Empresa Delta', mrr: 800, usoProduto: 8, engajamento: 7, suporte: 8, pagamento: 10, nps: 8, tempoCliente: 18 },
    { id: '5', nome: 'Empresa Epsilon', mrr: 5000, usoProduto: 3, engajamento: 2, suporte: 3, pagamento: 6, nps: 4, tempoCliente: 3 },
  ])

  const adicionarCliente = () => {
    const novo: Cliente = {
      id: Date.now().toString(),
      nome: 'Novo Cliente',
      mrr: 1000,
      usoProduto: 5,
      engajamento: 5,
      suporte: 5,
      pagamento: 10,
      nps: 7,
      tempoCliente: 1
    }
    setClientes([...clientes, novo])
  }

  const removerCliente = (id: string) => {
    setClientes(clientes.filter(c => c.id !== id))
  }

  const atualizarCliente = (id: string, campo: keyof Cliente, valor: string | number) => {
    setClientes(clientes.map(c =>
      c.id === id ? { ...c, [campo]: valor } : c
    ))
  }

  const calcularHealthScore = (cliente: Cliente) => {
    let score = 0
    indicadores.forEach(ind => {
      const valor = cliente[ind.campo] as number
      score += (valor / 10) * ind.peso
    })
    return Math.round(score)
  }

  const getCorScore = (score: number) => {
    if (score >= 80) return '#22c55e'
    if (score >= 60) return '#84cc16'
    if (score >= 40) return '#eab308'
    if (score >= 20) return '#f97316'
    return '#ef4444'
  }

  const getStatusScore = (score: number) => {
    if (score >= 80) return { status: 'Saudavel', icon: CheckCircle, acao: 'Oportunidade de upsell' }
    if (score >= 60) return { status: 'Estavel', icon: TrendingUp, acao: 'Manter engajamento' }
    if (score >= 40) return { status: 'Atencao', icon: AlertTriangle, acao: 'Agendar call de check-in' }
    if (score >= 20) return { status: 'Risco', icon: TrendingDown, acao: 'Intervencao urgente' }
    return { status: 'Critico', icon: XCircle, acao: 'Acionar CS imediatamente' }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  // Metricas gerais
  const clientesOrdenados = [...clientes].sort((a, b) => calcularHealthScore(a) - calcularHealthScore(b))
  const mrrEmRisco = clientes.filter(c => calcularHealthScore(c) < 40).reduce((sum, c) => sum + c.mrr, 0)
  const mrrSaudavel = clientes.filter(c => calcularHealthScore(c) >= 60).reduce((sum, c) => sum + c.mrr, 0)
  const mediaScore = clientes.length > 0 ? Math.round(clientes.reduce((sum, c) => sum + calcularHealthScore(c), 0) / clientes.length) : 0

  const copiarAnalise = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    HEALTH SCORE - ANALISE
═══════════════════════════════════════════════════════════════

RESUMO GERAL
───────────────────────────────────────────────────────────────
Total de Clientes: ${clientes.length}
Health Score Medio: ${mediaScore}/100
MRR Saudavel (60+): ${formatCurrency(mrrSaudavel)}
MRR em Risco (<40): ${formatCurrency(mrrEmRisco)}

INDICADORES E PESOS
───────────────────────────────────────────────────────────────
${indicadores.map(i => `${i.nome}: ${i.peso}%`).join('\n')}

CLIENTES POR PRIORIDADE (menor score primeiro)
───────────────────────────────────────────────────────────────
${clientesOrdenados.map(c => {
  const score = calcularHealthScore(c)
  const status = getStatusScore(score)
  return `${c.nome}
  Health Score: ${score}/100 (${status.status})
  MRR: ${formatCurrency(c.mrr)}
  Acao: ${status.acao}
  Indicadores: Uso ${c.usoProduto} | Engaj ${c.engajamento} | Suporte ${c.suporte} | Pgto ${c.pagamento} | NPS ${c.nps}
`
}).join('\n')}

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
            <Activity className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Health Score</span> de Cliente
          </h1>
          <p className="text-[var(--gray)]">Identifique riscos e oportunidades na sua base</p>
        </div>

        {/* Metricas Gerais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Clientes</p>
            <p className="font-display text-3xl text-[var(--gold)]">{clientes.length}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Score Medio</p>
            <p className="font-display text-3xl" style={{ color: getCorScore(mediaScore) }}>{mediaScore}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">MRR Saudavel</p>
            <p className="font-display text-2xl text-green-400">{formatCurrency(mrrSaudavel)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">MRR em Risco</p>
            <p className="font-display text-2xl text-red-400">{formatCurrency(mrrEmRisco)}</p>
          </div>
        </div>

        {/* Pesos dos Indicadores */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Indicadores e Pesos</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {indicadores.map((ind) => (
              <div key={ind.nome} className="bg-black/30 rounded-xl p-3 text-center">
                <p className="font-semibold text-sm">{ind.nome}</p>
                <p className="font-display text-2xl text-[var(--gold)]">{ind.peso}%</p>
                <p className="text-xs text-[var(--gray)]">{ind.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Clientes</h2>
            <div className="flex gap-2">
              <button onClick={adicionarCliente} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Adicionar
              </button>
              <button onClick={copiarAnalise} className="btn-primary text-sm flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {clientesOrdenados.map((cliente) => {
              const score = calcularHealthScore(cliente)
              const status = getStatusScore(score)
              const StatusIcon = status.icon

              return (
                <div key={cliente.id} className="bg-black/30 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Score Visual */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getCorScore(score)}20`, border: `2px solid ${getCorScore(score)}` }}
                    >
                      <span className="font-display text-xl" style={{ color: getCorScore(score) }}>{score}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="text"
                          value={cliente.nome}
                          onChange={(e) => atualizarCliente(cliente.id, 'nome', e.target.value)}
                          className="bg-transparent border-none font-semibold text-lg focus:outline-none"
                        />
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${getCorScore(score)}20`, color: getCorScore(score) }}>
                          <StatusIcon className="w-3 h-3" />
                          {status.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--gray)]">
                        <span>MRR: <input
                          type="number"
                          value={cliente.mrr}
                          onChange={(e) => atualizarCliente(cliente.id, 'mrr', Number(e.target.value))}
                          className="w-20 bg-transparent border-none text-[var(--gold)] focus:outline-none"
                        /></span>
                        <span>Cliente ha {cliente.tempoCliente} meses</span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: getCorScore(score) }}>
                        Acao recomendada: {status.acao}
                      </p>
                    </div>

                    <button onClick={() => removerCliente(cliente.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Indicadores */}
                  <div className="grid grid-cols-5 gap-2">
                    {indicadores.map((ind) => (
                      <div key={ind.nome} className="text-center">
                        <label className="text-xs text-[var(--gray)]">{ind.nome}</label>
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={cliente[ind.campo] as number}
                            onChange={(e) => atualizarCliente(cliente.id, ind.campo, Number(e.target.value))}
                            className="w-16"
                            style={{ accentColor: getCorScore((cliente[ind.campo] as number) * 10) }}
                          />
                          <span className="text-sm font-semibold w-4">{cliente[ind.campo] as number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {clientes.length === 0 && (
            <div className="text-center py-8 text-[var(--gray)]">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum cliente cadastrado</p>
            </div>
          )}
        </div>

        {/* Legenda */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Zonas de Health Score</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { min: 80, max: 100, status: 'Saudavel', cor: '#22c55e', acao: 'Upsell/Cross-sell' },
              { min: 60, max: 79, status: 'Estavel', cor: '#84cc16', acao: 'Manter engajamento' },
              { min: 40, max: 59, status: 'Atencao', cor: '#eab308', acao: 'Check-in proativo' },
              { min: 20, max: 39, status: 'Risco', cor: '#f97316', acao: 'Intervencao urgente' },
              { min: 0, max: 19, status: 'Critico', cor: '#ef4444', acao: 'Acionar CS agora' },
            ].map((zona) => (
              <div key={zona.status} className="text-center p-3 rounded-xl" style={{ backgroundColor: `${zona.cor}20` }}>
                <p className="font-display text-2xl" style={{ color: zona.cor }}>{zona.min}-{zona.max}</p>
                <p className="font-semibold" style={{ color: zona.cor }}>{zona.status}</p>
                <p className="text-xs text-[var(--gray)]">{zona.acao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de Health Score</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Atualize Semanalmente</h4>
              <p>Health Score desatualizado nao serve. Integre com seus sistemas para dados em tempo real.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Priorize por MRR</h4>
              <p>Cliente de R$5k em risco e mais urgente que cliente de R$500. Foque no impacto.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Automatize Alertas</h4>
              <p>Configure alertas automaticos quando score cair abaixo de 40.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Ajuste os Pesos</h4>
              <p>Cada negocio e diferente. Ajuste os pesos conforme seu modelo de churn.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
