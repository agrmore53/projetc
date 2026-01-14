'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Clock, TrendingUp, Target, AlertTriangle, CheckCircle, Calculator, Zap, Users } from 'lucide-react'

interface Dados {
  // Custos de Aquisição
  custoMarketing: number
  custoVendas: number
  outrosCustos: number
  clientesAdquiridos: number

  // Receita
  ticketMedio: number
  margemBruta: number

  // Retenção
  churnMensal: number
}

interface Resultado {
  cac: number
  ltv: number
  ltvCacRatio: number
  paybackMeses: number
  vidaMediaCliente: number
  receitaAnualCliente: number
  lucroAnualCliente: number
  status: 'excelente' | 'bom' | 'atencao' | 'critico'
}

export default function CACPaybackPage() {
  const [dados, setDados] = useState<Dados>({
    custoMarketing: 10000,
    custoVendas: 15000,
    outrosCustos: 5000,
    clientesAdquiridos: 20,
    ticketMedio: 300,
    margemBruta: 75,
    churnMensal: 3,
  })

  const [resultado, setResultado] = useState<Resultado | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-cac-payback')
    if (saved) {
      setDados(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mentoria-cac-payback', JSON.stringify(dados))
    calcular()
  }, [dados])

  const calcular = () => {
    const { custoMarketing, custoVendas, outrosCustos, clientesAdquiridos, ticketMedio, margemBruta, churnMensal } = dados

    // CAC = Custo Total / Clientes Adquiridos
    const custoTotal = custoMarketing + custoVendas + outrosCustos
    const cac = clientesAdquiridos > 0 ? custoTotal / clientesAdquiridos : 0

    // Vida média do cliente em meses = 1 / Churn
    const vidaMediaCliente = churnMensal > 0 ? 1 / (churnMensal / 100) : 100

    // Receita Anual por Cliente
    const receitaAnualCliente = ticketMedio * 12

    // Lucro Anual por Cliente (com margem)
    const lucroAnualCliente = receitaAnualCliente * (margemBruta / 100)

    // LTV = Ticket Médio * Margem Bruta * Vida Média
    const ltv = ticketMedio * (margemBruta / 100) * vidaMediaCliente

    // LTV/CAC Ratio
    const ltvCacRatio = cac > 0 ? ltv / cac : 0

    // Payback em meses = CAC / (Ticket Médio * Margem Bruta)
    const receitaMensalLiquida = ticketMedio * (margemBruta / 100)
    const paybackMeses = receitaMensalLiquida > 0 ? cac / receitaMensalLiquida : 0

    // Status
    let status: 'excelente' | 'bom' | 'atencao' | 'critico' = 'atencao'
    if (ltvCacRatio >= 5 && paybackMeses <= 6) {
      status = 'excelente'
    } else if (ltvCacRatio >= 3 && paybackMeses <= 12) {
      status = 'bom'
    } else if (ltvCacRatio >= 2 && paybackMeses <= 18) {
      status = 'atencao'
    } else {
      status = 'critico'
    }

    setResultado({
      cac,
      ltv,
      ltvCacRatio,
      paybackMeses,
      vidaMediaCliente,
      receitaAnualCliente,
      lucroAnualCliente,
      status,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'excelente':
        return { cor: 'text-green-400', bg: 'bg-green-500/20', label: 'Excelente', emoji: '🚀', desc: 'Unit economics saudável, pronto para escalar' }
      case 'bom':
        return { cor: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Bom', emoji: '✅', desc: 'Métricas dentro do esperado para SaaS' }
      case 'atencao':
        return { cor: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Atenção', emoji: '⚠️', desc: 'Otimize antes de acelerar aquisição' }
      case 'critico':
        return { cor: 'text-red-400', bg: 'bg-red-500/20', label: 'Crítico', emoji: '🔴', desc: 'Revise estratégia de aquisição e retenção' }
      default:
        return { cor: 'text-white', bg: 'bg-white/20', label: '-', emoji: '', desc: '' }
    }
  }

  const benchmarks = [
    { metrica: 'LTV/CAC Ratio', ideal: '≥ 3:1', otimo: '≥ 5:1', desc: 'Quanto maior, melhor' },
    { metrica: 'CAC Payback', ideal: '< 12 meses', otimo: '< 6 meses', desc: 'Quanto menor, melhor' },
    { metrica: 'Churn Mensal', ideal: '< 5%', otimo: '< 2%', desc: 'Quanto menor, melhor' },
    { metrica: 'Margem Bruta', ideal: '> 60%', otimo: '> 75%', desc: 'SaaS típico: 70-85%' },
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Calculadora de CAC Payback</h1>
            <p className="text-white/60">Descubra em quantos meses você recupera o custo de aquisição</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            {/* Custos de Aquisição */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[var(--gold)]" />
                Custos de Aquisição (mensal)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Marketing (ads, conteúdo, eventos)
                  </label>
                  <input
                    type="number"
                    value={dados.custoMarketing}
                    onChange={(e) => setDados({ ...dados, custoMarketing: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Vendas (salários, comissões, ferramentas)
                  </label>
                  <input
                    type="number"
                    value={dados.custoVendas}
                    onChange={(e) => setDados({ ...dados, custoVendas: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Outros custos de aquisição
                  </label>
                  <input
                    type="number"
                    value={dados.outrosCustos}
                    onChange={(e) => setDados({ ...dados, outrosCustos: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Clientes adquiridos no mês
                  </label>
                  <input
                    type="number"
                    value={dados.clientesAdquiridos}
                    onChange={(e) => setDados({ ...dados, clientesAdquiridos: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Receita e Retenção */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Receita e Retenção
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Ticket Médio Mensal (R$)
                  </label>
                  <input
                    type="number"
                    value={dados.ticketMedio}
                    onChange={(e) => setDados({ ...dados, ticketMedio: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Margem Bruta: {dados.margemBruta}%
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={dados.margemBruta}
                    onChange={(e) => setDados({ ...dados, margemBruta: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>30%</span>
                    <span>95%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Churn Mensal: {dados.churnMensal}%
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.5"
                    value={dados.churnMensal}
                    onChange={(e) => setDados({ ...dados, churnMensal: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>0.5%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado && (
              <>
                {/* Status Geral */}
                <div className={`glass rounded-2xl p-6 ${getStatusConfig(resultado.status).bg} border border-${resultado.status === 'excelente' ? 'green' : resultado.status === 'bom' ? 'blue' : resultado.status === 'atencao' ? 'yellow' : 'red'}-500/30`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Status do Unit Economics</h2>
                    <span className="text-3xl">{getStatusConfig(resultado.status).emoji}</span>
                  </div>
                  <p className={`text-2xl font-bold ${getStatusConfig(resultado.status).cor}`}>
                    {getStatusConfig(resultado.status).label}
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    {getStatusConfig(resultado.status).desc}
                  </p>
                </div>

                {/* Métricas Principais */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[var(--gold)]" />
                    Métricas Principais
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm text-white/60 mb-1">CAC</p>
                      <p className="text-2xl font-bold text-[var(--gold)]">
                        {formatCurrency(resultado.cac)}
                      </p>
                      <p className="text-xs text-white/40">por cliente</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm text-white/60 mb-1">LTV</p>
                      <p className="text-2xl font-bold text-green-400">
                        {formatCurrency(resultado.ltv)}
                      </p>
                      <p className="text-xs text-white/40">por cliente</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border-2 border-[var(--gold)]/50">
                      <p className="text-sm text-white/60 mb-1">LTV/CAC Ratio</p>
                      <p className={`text-2xl font-bold ${
                        resultado.ltvCacRatio >= 3 ? 'text-green-400' :
                        resultado.ltvCacRatio >= 2 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {resultado.ltvCacRatio.toFixed(1)}:1
                      </p>
                      <p className="text-xs text-white/40">ideal: ≥3:1</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border-2 border-[var(--gold)]/50">
                      <p className="text-sm text-white/60 mb-1">CAC Payback</p>
                      <p className={`text-2xl font-bold ${
                        resultado.paybackMeses <= 12 ? 'text-green-400' :
                        resultado.paybackMeses <= 18 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {resultado.paybackMeses.toFixed(1)} meses
                      </p>
                      <p className="text-xs text-white/40">ideal: &lt;12 meses</p>
                    </div>
                  </div>
                </div>

                {/* Métricas Secundárias */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Outras Métricas</h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="text-sm">Vida Média do Cliente</span>
                      </div>
                      <span className="font-semibold">{resultado.vidaMediaCliente.toFixed(1)} meses</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-white/40" />
                        <span className="text-sm">Receita Anual por Cliente</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(resultado.receitaAnualCliente)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-white/40" />
                        <span className="text-sm">Lucro Anual por Cliente</span>
                      </div>
                      <span className="font-semibold text-green-400">{formatCurrency(resultado.lucroAnualCliente)}</span>
                    </div>
                  </div>
                </div>

                {/* Visualização Payback */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[var(--gold)]" />
                    Timeline do Payback
                  </h2>

                  <div className="relative">
                    {/* Linha do tempo */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 24 }, (_, i) => {
                        const mes = i + 1
                        const recuperado = mes >= Math.ceil(resultado.paybackMeses)
                        const isPayback = mes === Math.ceil(resultado.paybackMeses)

                        return (
                          <div
                            key={mes}
                            className={`flex-1 h-8 rounded transition-all ${
                              recuperado ? 'bg-green-500' : 'bg-red-500/50'
                            } ${isPayback ? 'ring-2 ring-[var(--gold)]' : ''}`}
                            title={`Mês ${mes}`}
                          />
                        )
                      })}
                    </div>

                    <div className="flex justify-between mt-2 text-xs text-white/40">
                      <span>Mês 1</span>
                      <span>Mês 12</span>
                      <span>Mês 24</span>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-red-500/50" />
                        <span className="text-white/60">Pagando CAC</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span className="text-white/60">Lucro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Benchmarks */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--gold)]" />
            Benchmarks SaaS B2B
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60">Métrica</th>
                  <th className="text-center py-3 px-4 text-white/60">Aceitável</th>
                  <th className="text-center py-3 px-4 text-white/60">Ótimo</th>
                  <th className="text-left py-3 px-4 text-white/60">Observação</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">{b.metrica}</td>
                    <td className="py-3 px-4 text-center text-yellow-400">{b.ideal}</td>
                    <td className="py-3 px-4 text-center text-green-400">{b.otimo}</td>
                    <td className="py-3 px-4 text-sm text-white/60">{b.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dicas de Otimização */}
        <div className="mt-6 glass rounded-2xl p-6 border border-[var(--gold)]/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--gold)]" />
            Como Melhorar Suas Métricas
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-400 mb-3">Para Reduzir CAC:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  Invista em marketing de conteúdo (menor custo por lead)
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  Crie programa de indicação (clientes trazem clientes)
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  Otimize conversão do funil (mais clientes com mesmo gasto)
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  Automatize qualificação de leads
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-400 mb-3">Para Aumentar LTV:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  Reduza churn com onboarding de qualidade
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  Crie upsells e expansão de conta
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  Aumente preços gradualmente
                </li>
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  Ofereça contratos anuais (reduz churn)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
