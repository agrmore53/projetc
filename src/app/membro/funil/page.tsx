'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Filter,
  Users,
  Phone,
  Presentation,
  FileText,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Target,
  Calculator,
  ArrowDown,
  Info,
  Zap,
  AlertTriangle
} from 'lucide-react'

interface EtapaFunil {
  id: string
  nome: string
  icone: 'users' | 'phone' | 'presentation' | 'filetext' | 'check' | 'dollar'
  cor: string
  taxaConversao: number
  quantidade: number
}

const etapasIniciais: EtapaFunil[] = [
  { id: 'leads', nome: 'Leads Gerados', icone: 'users', cor: '#9C27B0', taxaConversao: 100, quantidade: 0 },
  { id: 'contato', nome: 'Contatos Realizados', icone: 'phone', cor: '#2196F3', taxaConversao: 60, quantidade: 0 },
  { id: 'reuniao', nome: 'Reuniões Agendadas', icone: 'presentation', cor: '#FF9800', taxaConversao: 40, quantidade: 0 },
  { id: 'proposta', nome: 'Propostas Enviadas', icone: 'filetext', cor: '#00BCD4', taxaConversao: 70, quantidade: 0 },
  { id: 'negociacao', nome: 'Em Negociação', icone: 'check', cor: '#FFC107', taxaConversao: 50, quantidade: 0 },
  { id: 'fechamento', nome: 'Vendas Fechadas', icone: 'dollar', cor: '#4CAF50', taxaConversao: 100, quantidade: 0 },
]

const benchmarks = {
  leads_contato: { min: 50, ideal: 70, label: 'Leads → Contato' },
  contato_reuniao: { min: 30, ideal: 50, label: 'Contato → Reunião' },
  reuniao_proposta: { min: 60, ideal: 80, label: 'Reunião → Proposta' },
  proposta_negociacao: { min: 40, ideal: 60, label: 'Proposta → Negociação' },
  negociacao_fechamento: { min: 30, ideal: 50, label: 'Negociação → Fechamento' },
}

export default function FunilPage() {
  const router = useRouter()
  const [etapas, setEtapas] = useState<EtapaFunil[]>(etapasIniciais)
  const [metaVendas, setMetaVendas] = useState(10)
  const [ticketMedio, setTicketMedio] = useState(297)
  const [modo, setModo] = useState<'calcular' | 'simular'>('simular')

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('funil_dados')
    if (saved) {
      const data = JSON.parse(saved)
      setEtapas(data.etapas || etapasIniciais)
      setMetaVendas(data.metaVendas || 10)
      setTicketMedio(data.ticketMedio || 297)
    }
  }, [router])

  useEffect(() => {
    localStorage.setItem('funil_dados', JSON.stringify({
      etapas,
      metaVendas,
      ticketMedio
    }))
  }, [etapas, metaVendas, ticketMedio])

  const getIcone = (tipo: string) => {
    switch(tipo) {
      case 'users': return <Users className="w-5 h-5" />
      case 'phone': return <Phone className="w-5 h-5" />
      case 'presentation': return <Presentation className="w-5 h-5" />
      case 'filetext': return <FileText className="w-5 h-5" />
      case 'check': return <CheckCircle className="w-5 h-5" />
      case 'dollar': return <DollarSign className="w-5 h-5" />
      default: return <Filter className="w-5 h-5" />
    }
  }

  const atualizarTaxa = (id: string, valor: number) => {
    setEtapas(etapas.map(e =>
      e.id === id ? { ...e, taxaConversao: Math.min(100, Math.max(0, valor)) } : e
    ))
  }

  // Calcular funil baseado em taxas de conversão
  const calcularFunil = () => {
    let quantidade = etapas[0].quantidade || 100
    return etapas.map((etapa, idx) => {
      if (idx === 0) {
        return { ...etapa, calculado: quantidade }
      }
      const taxaAnterior = etapas[idx].taxaConversao / 100
      quantidade = Math.round(quantidade * taxaAnterior)
      return { ...etapa, calculado: quantidade }
    })
  }

  // Calcular quantos leads precisa para atingir meta
  const calcularLeadsNecessarios = () => {
    let necessario = metaVendas
    // Calcular de trás pra frente
    for (let i = etapas.length - 1; i > 0; i--) {
      const taxa = etapas[i].taxaConversao / 100
      if (taxa > 0) {
        necessario = Math.ceil(necessario / taxa)
      }
    }
    return necessario
  }

  const leadsNecessarios = calcularLeadsNecessarios()
  const funilCalculado = calcularFunil()
  const taxaGeral = etapas[0].quantidade > 0
    ? ((funilCalculado[funilCalculado.length - 1].calculado || 0) / etapas[0].quantidade * 100)
    : (etapas.slice(1).reduce((acc, e) => acc * (e.taxaConversao / 100), 1) * 100)

  const faturamentoPrevisto = (funilCalculado[funilCalculado.length - 1].calculado || 0) * ticketMedio
  const faturamentoMeta = metaVendas * ticketMedio

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getStatusTaxa = (taxa: number, benchmark: { min: number; ideal: number }) => {
    if (taxa >= benchmark.ideal) return { cor: '#4CAF50', status: 'Excelente' }
    if (taxa >= benchmark.min) return { cor: '#FFC107', status: 'Ok' }
    return { cor: '#F44336', status: 'Baixa' }
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Simulador de Funil</h1>
            <p className="text-[var(--gray)] text-sm">Calcule quantos leads você precisa para bater sua meta</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setModo('simular')}
            className={`px-4 py-2 rounded-xl transition-all ${
              modo === 'simular'
                ? 'bg-[var(--gold)] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Simular Meta
          </button>
          <button
            onClick={() => setModo('calcular')}
            className={`px-4 py-2 rounded-xl transition-all ${
              modo === 'calcular'
                ? 'bg-[var(--gold)] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Calcular Resultado
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna 1: Configuração */}
          <div className="space-y-6">
            {/* Meta e Ticket */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Configuração
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    {modo === 'simular' ? 'Meta de Vendas (quantidade)' : 'Leads Iniciais'}
                  </label>
                  <input
                    type="number"
                    value={modo === 'simular' ? metaVendas : etapas[0].quantidade}
                    onChange={(e) => {
                      if (modo === 'simular') {
                        setMetaVendas(parseInt(e.target.value) || 0)
                      } else {
                        setEtapas(etapas.map((et, idx) =>
                          idx === 0 ? { ...et, quantidade: parseInt(e.target.value) || 0 } : et
                        ))
                      }
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">Ticket Médio (R$)</label>
                  <input
                    type="number"
                    value={ticketMedio}
                    onChange={(e) => setTicketMedio(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Taxas de Conversão */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Taxas de Conversão
              </h2>

              <div className="space-y-4">
                {etapas.slice(1).map((etapa, idx) => (
                  <div key={etapa.id}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[var(--gray)] text-sm">{etapa.nome}</label>
                      <span className="text-white font-medium">{etapa.taxaConversao}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={etapa.taxaConversao}
                      onChange={(e) => atualizarTaxa(etapa.id, parseInt(e.target.value))}
                      className="w-full accent-[var(--gold)]"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Benchmarks */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--gold)]" />
                Benchmarks de Mercado
              </h2>

              <div className="space-y-3 text-sm">
                {Object.entries(benchmarks).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-[var(--gray)]">{value.label}</span>
                    <span className="text-white">{value.min}-{value.ideal}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna 2: Visualização do Funil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resultado Principal */}
            <section className="glass p-6 border border-[var(--gold)]/30">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[var(--gray)] text-sm mb-1">
                    {modo === 'simular' ? 'Leads Necessários' : 'Vendas Previstas'}
                  </p>
                  <p className="text-3xl font-bold text-[var(--gold)]">
                    {modo === 'simular'
                      ? leadsNecessarios
                      : funilCalculado[funilCalculado.length - 1].calculado || 0
                    }
                  </p>
                </div>
                <div>
                  <p className="text-[var(--gray)] text-sm mb-1">Taxa Geral</p>
                  <p className="text-3xl font-bold text-white">{taxaGeral.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[var(--gray)] text-sm mb-1">Faturamento</p>
                  <p className="text-3xl font-bold text-green-400">
                    {formatarMoeda(modo === 'simular' ? faturamentoMeta : faturamentoPrevisto)}
                  </p>
                </div>
              </div>
            </section>

            {/* Funil Visual */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[var(--gold)]" />
                Visualização do Funil
              </h2>

              <div className="space-y-2">
                {etapas.map((etapa, idx) => {
                  const quantidade = modo === 'simular'
                    ? (idx === 0 ? leadsNecessarios : Math.round(leadsNecessarios * etapas.slice(1, idx + 1).reduce((acc, e) => acc * (e.taxaConversao / 100), 1)))
                    : (funilCalculado[idx]?.calculado || 0)

                  const largura = idx === 0
                    ? 100
                    : Math.max(20, (quantidade / (modo === 'simular' ? leadsNecessarios : (etapas[0].quantidade || 100))) * 100)

                  return (
                    <div key={etapa.id}>
                      <div
                        className="relative rounded-xl p-4 transition-all mx-auto"
                        style={{
                          backgroundColor: `${etapa.cor}20`,
                          borderLeft: `4px solid ${etapa.cor}`,
                          width: `${largura}%`
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div style={{ color: etapa.cor }}>
                              {getIcone(etapa.icone)}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{etapa.nome}</p>
                              {idx > 0 && (
                                <p className="text-[var(--gray)] text-xs">
                                  Taxa: {etapa.taxaConversao}%
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-xl font-bold" style={{ color: etapa.cor }}>
                            {quantidade}
                          </p>
                        </div>
                      </div>
                      {idx < etapas.length - 1 && (
                        <div className="flex justify-center py-1">
                          <ArrowDown className="w-5 h-5 text-[var(--gray)]/50" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Análise */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--gold)]" />
                Análise do Funil
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {etapas.slice(1).map((etapa, idx) => {
                  const benchmarkKey = Object.keys(benchmarks)[idx] as keyof typeof benchmarks
                  const benchmark = benchmarks[benchmarkKey]
                  const status = getStatusTaxa(etapa.taxaConversao, benchmark)

                  return (
                    <div key={etapa.id} className="bg-black/40 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">{etapa.nome}</span>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${status.cor}20`, color: status.cor }}
                        >
                          {status.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--gray)] text-sm">Sua taxa: {etapa.taxaConversao}%</span>
                        <span className="text-[var(--gray)] text-sm">Ideal: {benchmark.ideal}%</span>
                      </div>
                      {etapa.taxaConversao < benchmark.min && (
                        <div className="mt-2 flex items-start gap-2 text-xs text-red-400">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>Aumentar em {benchmark.min - etapa.taxaConversao}% para atingir o mínimo</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Dicas de Melhoria */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[var(--gold)]" />
                Como Melhorar Cada Etapa
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-purple-400 font-medium mb-1">Leads → Contato</p>
                  <p className="text-[var(--gray)]">Responda em até 5 minutos. Use múltiplos canais (WhatsApp + Ligação). Qualifique antes de abordar.</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 font-medium mb-1">Contato → Reunião</p>
                  <p className="text-[var(--gray)]">Use sondagem para identificar dor. Ofereça valor antes de pedir a reunião. Envie lembrete 1h antes.</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <p className="text-orange-400 font-medium mb-1">Reunião → Proposta</p>
                  <p className="text-[var(--gray)]">Faça demonstração personalizada. Foque nas dores específicas. Envie proposta em até 24h.</p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-medium mb-1">Proposta → Negociação</p>
                  <p className="text-[var(--gray)]">Follow-up em 48h. Antecipe objeções na proposta. Ofereça condição especial com prazo.</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-medium mb-1">Negociação → Fechamento</p>
                  <p className="text-[var(--gray)]">Use técnicas de fechamento. Crie urgência real. Facilite o pagamento. Reduza fricção.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Simulador de Funil - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
