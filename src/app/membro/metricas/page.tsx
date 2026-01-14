'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  RefreshCw,
  Target,
  Calculator,
  PieChart,
  BarChart3,
  Info,
  Save,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

interface MetricasData {
  // Receita
  clientesAtivos: number
  ticketMedio: number

  // Churn
  clientesPerdidos: number

  // Aquisição
  novosClientes: number
  gastoMarketing: number
  gastoVendas: number

  // Tempo
  mesesVidaCliente: number
}

interface MetricasCalculadas {
  mrr: number
  arr: number
  churnRate: number
  cac: number
  ltv: number
  ltvCacRatio: number
  paybackMonths: number
  nrr: number
}

const metricasIniciais: MetricasData = {
  clientesAtivos: 0,
  ticketMedio: 0,
  clientesPerdidos: 0,
  novosClientes: 0,
  gastoMarketing: 0,
  gastoVendas: 0,
  mesesVidaCliente: 12,
}

export default function MetricasPage() {
  const router = useRouter()
  const [dados, setDados] = useState<MetricasData>(metricasIniciais)
  const [metricas, setMetricas] = useState<MetricasCalculadas>({
    mrr: 0,
    arr: 0,
    churnRate: 0,
    cac: 0,
    ltv: 0,
    ltvCacRatio: 0,
    paybackMonths: 0,
    nrr: 0,
  })
  const [salvando, setSalvando] = useState(false)
  const [tooltipAtivo, setTooltipAtivo] = useState<string | null>(null)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    // Carregar dados salvos
    const saved = localStorage.getItem('metricas_saas')
    if (saved) {
      setDados(JSON.parse(saved))
    }
  }, [router])

  // Calcular métricas sempre que dados mudarem
  useEffect(() => {
    calcularMetricas()
  }, [dados])

  const calcularMetricas = () => {
    const { clientesAtivos, ticketMedio, clientesPerdidos, novosClientes, gastoMarketing, gastoVendas, mesesVidaCliente } = dados

    // MRR - Monthly Recurring Revenue
    const mrr = clientesAtivos * ticketMedio

    // ARR - Annual Recurring Revenue
    const arr = mrr * 12

    // Churn Rate (mensal)
    const clientesInicio = clientesAtivos + clientesPerdidos - novosClientes
    const churnRate = clientesInicio > 0 ? (clientesPerdidos / clientesInicio) * 100 : 0

    // CAC - Customer Acquisition Cost
    const custoTotal = gastoMarketing + gastoVendas
    const cac = novosClientes > 0 ? custoTotal / novosClientes : 0

    // LTV - Lifetime Value
    const ltv = ticketMedio * mesesVidaCliente

    // LTV:CAC Ratio
    const ltvCacRatio = cac > 0 ? ltv / cac : 0

    // Payback em meses
    const paybackMonths = ticketMedio > 0 ? cac / ticketMedio : 0

    // NRR (simplificado - sem expansão)
    const nrr = clientesInicio > 0
      ? ((clientesInicio - clientesPerdidos) * ticketMedio) / (clientesInicio * ticketMedio) * 100
      : 100

    setMetricas({
      mrr,
      arr,
      churnRate,
      cac,
      ltv,
      ltvCacRatio,
      paybackMonths,
      nrr,
    })
  }

  const handleChange = (campo: keyof MetricasData, valor: string) => {
    const numero = parseFloat(valor) || 0
    setDados(prev => ({ ...prev, [campo]: numero }))
  }

  const salvarDados = () => {
    setSalvando(true)
    localStorage.setItem('metricas_saas', JSON.stringify(dados))
    setTimeout(() => setSalvando(false), 1000)
  }

  const limparDados = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
      setDados(metricasIniciais)
      localStorage.removeItem('metricas_saas')
    }
  }

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getStatusChurn = (rate: number) => {
    if (rate <= 2) return { cor: '#4CAF50', status: 'Excelente', icon: CheckCircle }
    if (rate <= 5) return { cor: '#FFC107', status: 'Aceitável', icon: AlertTriangle }
    return { cor: '#F44336', status: 'Crítico', icon: AlertTriangle }
  }

  const getStatusLtvCac = (ratio: number) => {
    if (ratio >= 3) return { cor: '#4CAF50', status: 'Saudável', icon: CheckCircle }
    if (ratio >= 1) return { cor: '#FFC107', status: 'Atenção', icon: AlertTriangle }
    return { cor: '#F44336', status: 'Prejuízo', icon: AlertTriangle }
  }

  const tooltips: Record<string, string> = {
    mrr: 'Monthly Recurring Revenue - Receita mensal recorrente. Quanto você fatura por mês com assinaturas.',
    arr: 'Annual Recurring Revenue - MRR x 12. Projeção anual da receita recorrente.',
    churn: 'Taxa de cancelamento mensal. Abaixo de 2% é excelente, acima de 5% é crítico.',
    cac: 'Customer Acquisition Cost - Quanto você gasta para adquirir 1 cliente novo.',
    ltv: 'Lifetime Value - Quanto um cliente gera de receita durante todo o relacionamento.',
    ltvCac: 'Proporção LTV/CAC. Ideal é 3x ou mais. Abaixo de 1x significa prejuízo.',
    payback: 'Meses necessários para recuperar o CAC. Ideal é menos de 12 meses.',
    nrr: 'Net Revenue Retention - Receita retida considerando churn. 100%+ significa crescimento orgânico.',
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/membro')}
              className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
            </button>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl gold-text">Métricas SaaS</h1>
              <p className="text-[var(--gray)] text-sm">Calcule e acompanhe suas métricas</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={limparDados}
              className="p-3 border border-red-500/30 rounded-xl hover:border-red-500 transition-colors"
              title="Limpar dados"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
            <button
              onClick={salvarDados}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                salvando
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
              }`}
            >
              <Save className="w-5 h-5" />
              <span className="hidden sm:inline">{salvando ? 'Salvo!' : 'Salvar'}</span>
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulário de Entrada */}
          <div className="space-y-6">
            {/* Receita */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-white font-semibold">Receita</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    Clientes Ativos (atual)
                  </label>
                  <input
                    type="number"
                    value={dados.clientesAtivos || ''}
                    onChange={(e) => handleChange('clientesAtivos', e.target.value)}
                    placeholder="Ex: 150"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    Ticket Médio Mensal (R$)
                  </label>
                  <input
                    type="number"
                    value={dados.ticketMedio || ''}
                    onChange={(e) => handleChange('ticketMedio', e.target.value)}
                    placeholder="Ex: 297"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Churn */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-white font-semibold">Churn (Cancelamentos)</h2>
              </div>

              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">
                  Clientes Perdidos (último mês)
                </label>
                <input
                  type="number"
                  value={dados.clientesPerdidos || ''}
                  onChange={(e) => handleChange('clientesPerdidos', e.target.value)}
                  placeholder="Ex: 5"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
            </section>

            {/* Aquisição */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-white font-semibold">Aquisição de Clientes</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    Novos Clientes (último mês)
                  </label>
                  <input
                    type="number"
                    value={dados.novosClientes || ''}
                    onChange={(e) => handleChange('novosClientes', e.target.value)}
                    placeholder="Ex: 20"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    Gasto com Marketing (R$/mês)
                  </label>
                  <input
                    type="number"
                    value={dados.gastoMarketing || ''}
                    onChange={(e) => handleChange('gastoMarketing', e.target.value)}
                    placeholder="Ex: 5000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray)] text-sm mb-2">
                    Gasto com Vendas (R$/mês)
                  </label>
                  <input
                    type="number"
                    value={dados.gastoVendas || ''}
                    onChange={(e) => handleChange('gastoVendas', e.target.value)}
                    placeholder="Ex: 3000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Lifetime */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-white font-semibold">Tempo de Vida do Cliente</h2>
              </div>

              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">
                  Média de Meses que Cliente Fica
                </label>
                <input
                  type="number"
                  value={dados.mesesVidaCliente || ''}
                  onChange={(e) => handleChange('mesesVidaCliente', e.target.value)}
                  placeholder="Ex: 24"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
                <p className="text-[var(--gray)] text-xs mt-2">
                  Dica: Se não sabe, use 1/churn. Ex: 2% churn = ~50 meses
                </p>
              </div>
            </section>
          </div>

          {/* Métricas Calculadas */}
          <div className="space-y-6">
            {/* Métricas Principais */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[var(--gold)]" />
                Métricas Calculadas
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* MRR */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative group cursor-help"
                  onMouseEnter={() => setTooltipAtivo('mrr')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">MRR</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold text-green-400">
                    {formatarMoeda(metricas.mrr)}
                  </p>
                  {tooltipAtivo === 'mrr' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.mrr}
                    </div>
                  )}
                </div>

                {/* ARR */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('arr')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">ARR</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold text-green-400">
                    {formatarMoeda(metricas.arr)}
                  </p>
                  {tooltipAtivo === 'arr' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.arr}
                    </div>
                  )}
                </div>

                {/* Churn */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('churn')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">Churn Rate</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: getStatusChurn(metricas.churnRate).cor }}>
                    {metricas.churnRate.toFixed(1)}%
                  </p>
                  <span className="text-xs" style={{ color: getStatusChurn(metricas.churnRate).cor }}>
                    {getStatusChurn(metricas.churnRate).status}
                  </span>
                  {tooltipAtivo === 'churn' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.churn}
                    </div>
                  )}
                </div>

                {/* CAC */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('cac')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">CAC</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold text-blue-400">
                    {formatarMoeda(metricas.cac)}
                  </p>
                  {tooltipAtivo === 'cac' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.cac}
                    </div>
                  )}
                </div>

                {/* LTV */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('ltv')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">LTV</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold text-purple-400">
                    {formatarMoeda(metricas.ltv)}
                  </p>
                  {tooltipAtivo === 'ltv' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.ltv}
                    </div>
                  )}
                </div>

                {/* LTV:CAC */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('ltvCac')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">LTV:CAC</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: getStatusLtvCac(metricas.ltvCacRatio).cor }}>
                    {metricas.ltvCacRatio.toFixed(1)}x
                  </p>
                  <span className="text-xs" style={{ color: getStatusLtvCac(metricas.ltvCacRatio).cor }}>
                    {getStatusLtvCac(metricas.ltvCacRatio).status}
                  </span>
                  {tooltipAtivo === 'ltvCac' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.ltvCac}
                    </div>
                  )}
                </div>

                {/* Payback */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('payback')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">Payback</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className="text-2xl font-bold text-orange-400">
                    {metricas.paybackMonths.toFixed(1)} meses
                  </p>
                  {tooltipAtivo === 'payback' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.payback}
                    </div>
                  )}
                </div>

                {/* NRR */}
                <div
                  className="bg-black/40 rounded-xl p-4 border border-white/10 relative cursor-help"
                  onMouseEnter={() => setTooltipAtivo('nrr')}
                  onMouseLeave={() => setTooltipAtivo(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--gray)] text-sm">NRR</span>
                    <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                  </div>
                  <p className={`text-2xl font-bold ${metricas.nrr >= 100 ? 'text-green-400' : 'text-red-400'}`}>
                    {metricas.nrr.toFixed(0)}%
                  </p>
                  {tooltipAtivo === 'nrr' && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-64 z-10">
                      {tooltips.nrr}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Análise Rápida */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--gold)]" />
                Análise Rápida
              </h2>

              <div className="space-y-4">
                {/* Saúde do Negócio */}
                <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                  <h3 className="text-[var(--gray)] text-sm mb-3">Saúde do Negócio</h3>
                  <div className="space-y-2">
                    {metricas.ltvCacRatio >= 3 ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">LTV:CAC saudável (3x+)</span>
                      </div>
                    ) : metricas.ltvCacRatio >= 1 ? (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">LTV:CAC precisa melhorar</span>
                      </div>
                    ) : metricas.cac > 0 && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Cuidado! Você está perdendo dinheiro por cliente</span>
                      </div>
                    )}

                    {metricas.churnRate <= 2 ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Churn excelente (menos de 2%)</span>
                      </div>
                    ) : metricas.churnRate <= 5 ? (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Churn aceitável, mas pode melhorar</span>
                      </div>
                    ) : metricas.churnRate > 5 && (
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Churn crítico! Priorize retenção</span>
                      </div>
                    )}

                    {metricas.paybackMonths > 0 && metricas.paybackMonths <= 12 ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Payback saudável (menos de 12 meses)</span>
                      </div>
                    ) : metricas.paybackMonths > 12 && (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">Payback longo - otimize CAC ou aumente ticket</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Projeções */}
                {metricas.mrr > 0 && (
                  <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <h3 className="text-[var(--gray)] text-sm mb-3">Projeções (mantendo ritmo atual)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[var(--gray)] text-xs">Em 6 meses</p>
                        <p className="text-white font-semibold">
                          {formatarMoeda(metricas.mrr * 6 + (dados.novosClientes * dados.ticketMedio * 6 * 0.5))}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--gray)] text-xs">Em 12 meses</p>
                        <p className="text-white font-semibold">
                          {formatarMoeda(metricas.arr + (dados.novosClientes * dados.ticketMedio * 12 * 0.5))}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Benchmarks */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Benchmarks SaaS
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">Churn Mensal Ideal</span>
                  <span className="text-green-400">&lt; 2%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">LTV:CAC Ideal</span>
                  <span className="text-green-400">&gt; 3x</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">Payback Ideal</span>
                  <span className="text-green-400">&lt; 12 meses</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">NRR Excelente</span>
                  <span className="text-green-400">&gt; 100%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[var(--gray)]">Crescimento MoM</span>
                  <span className="text-green-400">15-20%</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Fórmulas */}
        <section className="glass p-6 mt-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[var(--gold)]" />
            Fórmulas Utilizadas
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-black/40 rounded-lg p-3 border border-white/10">
              <p className="text-[var(--gold)] font-medium mb-1">MRR</p>
              <p className="text-[var(--gray)]">Clientes × Ticket Médio</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 border border-white/10">
              <p className="text-[var(--gold)] font-medium mb-1">Churn Rate</p>
              <p className="text-[var(--gray)]">Perdidos ÷ Clientes Início</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 border border-white/10">
              <p className="text-[var(--gold)] font-medium mb-1">CAC</p>
              <p className="text-[var(--gray)]">(Marketing + Vendas) ÷ Novos</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 border border-white/10">
              <p className="text-[var(--gold)] font-medium mb-1">LTV</p>
              <p className="text-[var(--gray)]">Ticket × Meses de Vida</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Calculadora de Métricas SaaS - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
