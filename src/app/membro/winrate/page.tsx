'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Target, ChevronRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface Etapa {
  id: string
  nome: string
  entrada: number
  saida: number
}

export default function WinRatePage() {
  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: '1', nome: 'Leads Gerados', entrada: 100, saida: 60 },
    { id: '2', nome: 'Qualificados', entrada: 60, saida: 40 },
    { id: '3', nome: 'Reuniao Agendada', entrada: 40, saida: 30 },
    { id: '4', nome: 'Proposta Enviada', entrada: 30, saida: 15 },
    { id: '5', nome: 'Negociacao', entrada: 15, saida: 10 },
    { id: '6', nome: 'Fechados', entrada: 10, saida: 10 },
  ])

  const [periodo, setPeriodo] = useState('mes')
  const [ticketMedio, setTicketMedio] = useState(5000)

  const atualizarEtapa = (id: string, campo: 'entrada' | 'saida' | 'nome', valor: number | string) => {
    setEtapas(etapas.map((e, i) => {
      if (e.id === id) {
        const updated = { ...e, [campo]: valor }
        // Atualiza a entrada da proxima etapa automaticamente
        if (campo === 'saida' && i < etapas.length - 1) {
          const nextId = etapas[i + 1].id
          setEtapas(prev => prev.map(pe =>
            pe.id === nextId ? { ...pe, entrada: valor as number } : pe
          ))
        }
        return updated
      }
      return e
    }))
  }

  // Calculos
  const leadsIniciais = etapas[0]?.entrada || 0
  const clientesFechados = etapas[etapas.length - 1]?.saida || 0
  const winRateGeral = leadsIniciais > 0 ? (clientesFechados / leadsIniciais) * 100 : 0
  const receitaPotencial = clientesFechados * ticketMedio

  const calcularTaxaConversao = (etapa: Etapa) => {
    return etapa.entrada > 0 ? (etapa.saida / etapa.entrada) * 100 : 0
  }

  const getCorTaxa = (taxa: number) => {
    if (taxa >= 70) return 'text-green-400'
    if (taxa >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusTaxa = (taxa: number, etapaNome: string) => {
    // Benchmarks por etapa
    const benchmarks: Record<string, number> = {
      'Leads Gerados': 50,
      'Qualificados': 60,
      'Reuniao Agendada': 70,
      'Proposta Enviada': 50,
      'Negociacao': 60,
      'Fechados': 100,
    }
    const benchmark = benchmarks[etapaNome] || 50

    if (taxa >= benchmark) return { status: 'good', msg: 'Acima da media' }
    if (taxa >= benchmark * 0.7) return { status: 'ok', msg: 'Pode melhorar' }
    return { status: 'bad', msg: 'Precisa atencao' }
  }

  // Identificar gargalo
  const gargalo = etapas.reduce((prev, curr) => {
    const taxaPrev = calcularTaxaConversao(prev)
    const taxaCurr = calcularTaxaConversao(curr)
    return taxaCurr < taxaPrev ? curr : prev
  })

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
            <Trophy className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Win Rate</span>
          </h1>
          <p className="text-[var(--gray)]">Analise sua taxa de conversao por etapa</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 text-center">
            <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Leads Iniciais</p>
            <p className="font-display text-xl text-blue-400">{leadsIniciais}</p>
          </div>
          <div className="glass p-4 text-center">
            <Trophy className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Clientes Fechados</p>
            <p className="font-display text-xl text-green-400">{clientesFechados}</p>
          </div>
          <div className="glass p-4 text-center">
            <TrendingUp className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Win Rate Geral</p>
            <p className="font-display text-xl gold-text">{winRateGeral.toFixed(1)}%</p>
          </div>
          <div className="glass p-4 text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-[var(--gray)]">Receita Potencial</p>
            <p className="font-display text-xl text-purple-400">
              {receitaPotencial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Periodo de Analise</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="input-field"
              >
                <option value="semana">Ultima Semana</option>
                <option value="mes">Ultimo Mes</option>
                <option value="trimestre">Ultimo Trimestre</option>
                <option value="ano">Ultimo Ano</option>
              </select>
            </div>
            <div>
              <label className="input-label">Ticket Medio</label>
              <input
                type="number"
                value={ticketMedio}
                onChange={(e) => setTicketMedio(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Funil Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-6">Funil de Conversao</h2>

          <div className="space-y-4">
            {etapas.map((etapa, index) => {
              const taxa = calcularTaxaConversao(etapa)
              const status = getStatusTaxa(taxa, etapa.nome)
              const largura = leadsIniciais > 0 ? (etapa.entrada / leadsIniciais) * 100 : 100

              return (
                <div key={etapa.id}>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-32 text-sm">
                      <input
                        type="text"
                        value={etapa.nome}
                        onChange={(e) => atualizarEtapa(etapa.id, 'nome', e.target.value)}
                        className="bg-transparent border-none focus:outline-none font-semibold w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className="h-12 rounded-lg flex items-center justify-between px-4 transition-all"
                        style={{
                          width: `${Math.max(largura, 20)}%`,
                          backgroundColor: index === etapas.length - 1 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(212, 175, 55, 0.2)',
                          borderLeft: `4px solid ${index === etapas.length - 1 ? '#22c55e' : 'var(--gold)'}`
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            value={etapa.entrada}
                            onChange={(e) => atualizarEtapa(etapa.id, 'entrada', Number(e.target.value))}
                            className="w-16 bg-white/10 rounded px-2 py-1 text-center text-sm"
                            min="0"
                          />
                          <ChevronRight className="w-4 h-4 text-[var(--gray)]" />
                          <input
                            type="number"
                            value={etapa.saida}
                            onChange={(e) => atualizarEtapa(etapa.id, 'saida', Number(e.target.value))}
                            className="w-16 bg-white/10 rounded px-2 py-1 text-center text-sm"
                            min="0"
                            max={etapa.entrada}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-display ${getCorTaxa(taxa)}`}>
                            {taxa.toFixed(0)}%
                          </span>
                          {status.status === 'good' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {status.status === 'ok' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                          {status.status === 'bad' && <XCircle className="w-4 h-4 text-red-400" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < etapas.length - 1 && (
                    <div className="flex items-center gap-4 ml-32 pl-4">
                      <div className="text-xs text-[var(--gray)]">
                        Perdidos: {etapa.entrada - etapa.saida} ({((etapa.entrada - etapa.saida) / etapa.entrada * 100).toFixed(0)}%)
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Analise de Gargalo */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass card border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="font-display text-lg">Gargalo Identificado</h3>
            </div>
            <p className="text-2xl font-display text-red-400 mb-2">{gargalo.nome}</p>
            <p className="text-[var(--gray)] mb-4">
              Taxa de conversao de apenas {calcularTaxaConversao(gargalo).toFixed(1)}%
            </p>
            <div className="bg-red-500/10 rounded-lg p-4">
              <p className="text-sm text-[var(--gray)]">
                <strong className="text-white">Acao sugerida:</strong> Voce esta perdendo {gargalo.entrada - gargalo.saida} oportunidades
                nesta etapa. Revise seu processo e identifique os motivos de perda.
              </p>
            </div>
          </div>

          <div className="glass card border-2 border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="font-display text-lg">Oportunidade de Melhoria</h3>
            </div>
            <p className="text-[var(--gray)] mb-4">
              Se aumentar a conversao de <strong className="text-white">{gargalo.nome}</strong> em apenas 10%:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">Clientes adicionais:</span>
                <span className="text-green-400 font-display">
                  +{Math.round((gargalo.entrada * 0.1) * (winRateGeral / 100 / calcularTaxaConversao(gargalo) * 100))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">Receita adicional:</span>
                <span className="text-green-400 font-display">
                  +{(Math.round((gargalo.entrada * 0.1) * (winRateGeral / 100 / calcularTaxaConversao(gargalo) * 100)) * ticketMedio).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Detalhada */}
        <div className="glass card mb-8 overflow-x-auto">
          <h2 className="font-display text-lg mb-4">Detalhamento por Etapa</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2">Etapa</th>
                <th className="text-center py-3 px-2">Entrada</th>
                <th className="text-center py-3 px-2">Saida</th>
                <th className="text-center py-3 px-2">Perdidos</th>
                <th className="text-center py-3 px-2">Taxa</th>
                <th className="text-center py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map((etapa) => {
                const taxa = calcularTaxaConversao(etapa)
                const status = getStatusTaxa(taxa, etapa.nome)
                return (
                  <tr key={etapa.id} className="border-b border-white/5">
                    <td className="py-3 px-2 font-semibold">{etapa.nome}</td>
                    <td className="text-center py-3 px-2">{etapa.entrada}</td>
                    <td className="text-center py-3 px-2">{etapa.saida}</td>
                    <td className="text-center py-3 px-2 text-red-400">{etapa.entrada - etapa.saida}</td>
                    <td className={`text-center py-3 px-2 font-display ${getCorTaxa(taxa)}`}>{taxa.toFixed(1)}%</td>
                    <td className="text-center py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        status.status === 'good' ? 'bg-green-500/20 text-green-400' :
                        status.status === 'ok' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {status.msg}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Melhorar Win Rate</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Qualificacao</h4>
              <p>Leads mal qualificados poluem o funil. Melhore o ICP e criterios de qualificacao.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Follow-up</h4>
              <p>80% das vendas requerem 5+ follow-ups. A maioria dos vendedores para no 2o.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Velocidade</h4>
              <p>Quanto mais rapido o ciclo, maior o win rate. Identifique onde as deals travam.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
