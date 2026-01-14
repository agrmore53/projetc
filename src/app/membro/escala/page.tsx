'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Users, DollarSign, Building, Target, Zap, AlertTriangle } from 'lucide-react'

interface ConfigEscala {
  mrrInicial: number
  ticketMedio: number
  crescimentoMensal: number
  churnMensal: number
  custoFixoInicial: number
  custoVariavelPorCliente: number
  metaMRR: number
}

interface ProjecaoMes {
  mes: number
  mrr: number
  arr: number
  clientes: number
  clientesNovos: number
  churn: number
  custoFixo: number
  custoVariavel: number
  custoTotal: number
  lucro: number
  margemLucro: number
  runway: number
  funcionarios: number
}

interface Marco {
  nome: string
  mrr: number
  descricao: string
  cor: string
}

const marcos: Marco[] = [
  { nome: 'Validação', mrr: 1000, descricao: 'Produto validado com clientes pagantes', cor: 'bg-blue-500' },
  { nome: 'Product-Market Fit', mrr: 10000, descricao: 'MRR de R$10k indica fit inicial', cor: 'bg-green-500' },
  { nome: 'Tração', mrr: 50000, descricao: 'Momento de acelerar growth', cor: 'bg-yellow-500' },
  { nome: 'Escala', mrr: 100000, descricao: 'Pronto para investimento Série A', cor: 'bg-orange-500' },
  { nome: 'R$1M ARR', mrr: 83333, descricao: 'Marco psicológico importante', cor: 'bg-purple-500' },
  { nome: 'Lucratividade', mrr: 200000, descricao: 'Sustentável e escalável', cor: 'bg-[var(--gold)]' },
]

export default function EscalaPage() {
  const [config, setConfig] = useState<ConfigEscala>({
    mrrInicial: 5000,
    ticketMedio: 200,
    crescimentoMensal: 15,
    churnMensal: 3,
    custoFixoInicial: 8000,
    custoVariavelPorCliente: 20,
    metaMRR: 100000,
  })

  const [projecao, setProjecao] = useState<ProjecaoMes[]>([])
  const [mesesParaMeta, setMesesParaMeta] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-escala-config')
    if (saved) {
      setConfig(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mentoria-escala-config', JSON.stringify(config))
    calcularProjecao()
  }, [config])

  const calcularProjecao = () => {
    const meses: ProjecaoMes[] = []
    let mrrAtual = config.mrrInicial
    let clientesAtual = Math.ceil(config.mrrInicial / config.ticketMedio)
    let custoFixoAtual = config.custoFixoInicial
    let metaAtingida: number | null = null

    for (let mes = 1; mes <= 36; mes++) {
      // Crescimento
      const crescimento = config.crescimentoMensal / 100
      const churn = config.churnMensal / 100

      // Clientes novos e churn
      const clientesNovos = Math.ceil(clientesAtual * crescimento)
      const clientesChurn = Math.floor(clientesAtual * churn)

      // Atualiza clientes
      clientesAtual = clientesAtual + clientesNovos - clientesChurn

      // MRR
      mrrAtual = clientesAtual * config.ticketMedio

      // Custos
      // Custo fixo aumenta a cada 50 clientes (precisa contratar)
      const funcionariosNecessarios = Math.ceil(clientesAtual / 50) + 1 // +1 para o fundador
      custoFixoAtual = config.custoFixoInicial + (funcionariosNecessarios - 1) * 5000

      const custoVariavel = clientesAtual * config.custoVariavelPorCliente
      const custoTotal = custoFixoAtual + custoVariavel

      // Lucro
      const lucro = mrrAtual - custoTotal
      const margemLucro = mrrAtual > 0 ? (lucro / mrrAtual) * 100 : 0

      // Runway (meses de operação se parar de crescer)
      const runway = lucro > 0 ? Infinity : custoTotal > 0 ? Math.abs(lucro / custoTotal) * 12 : 0

      // Verifica se atingiu a meta
      if (mrrAtual >= config.metaMRR && metaAtingida === null) {
        metaAtingida = mes
      }

      meses.push({
        mes,
        mrr: mrrAtual,
        arr: mrrAtual * 12,
        clientes: clientesAtual,
        clientesNovos,
        churn: clientesChurn,
        custoFixo: custoFixoAtual,
        custoVariavel,
        custoTotal,
        lucro,
        margemLucro,
        runway,
        funcionarios: funcionariosNecessarios,
      })
    }

    setProjecao(meses)
    setMesesParaMeta(metaAtingida)
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `R$${(value / 1000).toFixed(0)}k`
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getMarcoAtual = (mrr: number) => {
    const marcosAtingidos = marcos.filter(m => mrr >= m.mrr)
    return marcosAtingidos[marcosAtingidos.length - 1] || null
  }

  const proximoMarco = (mrr: number) => {
    return marcos.find(m => mrr < m.mrr) || null
  }

  // Dados para os cards de resumo
  const mes6 = projecao[5]
  const mes12 = projecao[11]
  const mes24 = projecao[23]
  const mes36 = projecao[35]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Simulador de Escala</h1>
            <p className="text-white/60">Projete o crescimento do seu SaaS em 36 meses</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuração */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Parâmetros Iniciais
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">MRR Inicial (R$)</label>
                  <input
                    type="number"
                    value={config.mrrInicial}
                    onChange={(e) => setConfig({ ...config, mrrInicial: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Ticket Médio (R$)</label>
                  <input
                    type="number"
                    value={config.ticketMedio}
                    onChange={(e) => setConfig({ ...config, ticketMedio: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Crescimento Mensal: {config.crescimentoMensal}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={config.crescimentoMensal}
                    onChange={(e) => setConfig({ ...config, crescimentoMensal: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Churn Mensal: {config.churnMensal}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={config.churnMensal}
                    onChange={(e) => setConfig({ ...config, churnMensal: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Custo Fixo Inicial (R$)</label>
                  <input
                    type="number"
                    value={config.custoFixoInicial}
                    onChange={(e) => setConfig({ ...config, custoFixoInicial: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Custo por Cliente (R$)</label>
                  <input
                    type="number"
                    value={config.custoVariavelPorCliente}
                    onChange={(e) => setConfig({ ...config, custoVariavelPorCliente: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Meta de MRR (R$)</label>
                  <input
                    type="number"
                    value={config.metaMRR}
                    onChange={(e) => setConfig({ ...config, metaMRR: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Meta */}
            {mesesParaMeta && (
              <div className="glass rounded-2xl p-6 border-2 border-[var(--gold)]">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-[var(--gold)]" />
                  <span className="font-semibold">Tempo para Meta</span>
                </div>
                <p className="text-3xl font-bold text-[var(--gold)]">
                  {mesesParaMeta} meses
                </p>
                <p className="text-sm text-white/60">
                  Para atingir {formatCurrency(config.metaMRR)} de MRR
                </p>
              </div>
            )}

            {/* Alerta de Churn */}
            {config.crescimentoMensal <= config.churnMensal && (
              <div className="glass rounded-2xl p-4 border border-red-500/50 bg-red-500/10">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Atenção!</span>
                </div>
                <p className="text-sm text-white/70 mt-2">
                  Seu churn está maior ou igual ao crescimento. A empresa não vai escalar assim.
                </p>
              </div>
            )}
          </div>

          {/* Projeções */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mes6 && (
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-1">6 Meses</p>
                  <p className="text-xl font-bold text-[var(--gold)]">{formatCurrency(mes6.mrr)}</p>
                  <p className="text-xs text-white/50">{mes6.clientes} clientes</p>
                </div>
              )}
              {mes12 && (
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-1">1 Ano</p>
                  <p className="text-xl font-bold text-[var(--gold)]">{formatCurrency(mes12.mrr)}</p>
                  <p className="text-xs text-white/50">{mes12.clientes} clientes</p>
                </div>
              )}
              {mes24 && (
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-1">2 Anos</p>
                  <p className="text-xl font-bold text-[var(--gold)]">{formatCurrency(mes24.mrr)}</p>
                  <p className="text-xs text-white/50">{mes24.clientes} clientes</p>
                </div>
              )}
              {mes36 && (
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-1">3 Anos</p>
                  <p className="text-xl font-bold text-[var(--gold)]">{formatCurrency(mes36.mrr)}</p>
                  <p className="text-xs text-white/50">{mes36.clientes} clientes</p>
                </div>
              )}
            </div>

            {/* Gráfico Visual (Barras) */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Evolução do MRR</h3>

              <div className="flex items-end gap-1 h-48">
                {projecao.filter((_, i) => i % 3 === 0).map((p, index) => {
                  const maxMRR = projecao[projecao.length - 1]?.mrr || 1
                  const altura = (p.mrr / maxMRR) * 100

                  return (
                    <div
                      key={p.mes}
                      className="flex-1 flex flex-col items-center gap-1"
                      title={`Mês ${p.mes}: ${formatCurrency(p.mrr)}`}
                    >
                      <div
                        className={`w-full rounded-t transition-all hover:opacity-80 ${
                          p.lucro >= 0 ? 'bg-[var(--gold)]' : 'bg-red-500'
                        }`}
                        style={{ height: `${Math.max(altura, 2)}%` }}
                      />
                      {index % 4 === 0 && (
                        <span className="text-[10px] text-white/40">{p.mes}</span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[var(--gold)]" />
                  <span className="text-white/60">Lucro positivo</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span className="text-white/60">Prejuízo</span>
                </div>
              </div>
            </div>

            {/* Marcos */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Marcos de Crescimento
              </h3>

              <div className="space-y-3">
                {marcos.map((marco) => {
                  const mesAtingido = projecao.find(p => p.mrr >= marco.mrr)
                  const atingido = mesAtingido !== undefined

                  return (
                    <div
                      key={marco.nome}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        atingido ? `${marco.cor}/20` : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${atingido ? marco.cor : 'bg-white/20'}`} />
                        <div>
                          <p className={`font-medium ${atingido ? 'text-white' : 'text-white/50'}`}>
                            {marco.nome}
                          </p>
                          <p className="text-xs text-white/50">{marco.descricao}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${atingido ? 'text-white' : 'text-white/50'}`}>
                          {formatCurrency(marco.mrr)}
                        </p>
                        {mesAtingido && (
                          <p className="text-xs text-[var(--gold)]">Mês {mesAtingido.mes}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tabela Detalhada */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Projeção Detalhada (Primeiros 12 Meses)</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-2 text-white/60">Mês</th>
                      <th className="text-right py-2 px-2 text-white/60">MRR</th>
                      <th className="text-right py-2 px-2 text-white/60">Clientes</th>
                      <th className="text-right py-2 px-2 text-white/60">Novos</th>
                      <th className="text-right py-2 px-2 text-white/60">Churn</th>
                      <th className="text-right py-2 px-2 text-white/60">Custos</th>
                      <th className="text-right py-2 px-2 text-white/60">Lucro</th>
                      <th className="text-right py-2 px-2 text-white/60">Equipe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projecao.slice(0, 12).map((p) => (
                      <tr key={p.mes} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-2 px-2 font-medium">{p.mes}</td>
                        <td className="py-2 px-2 text-right text-[var(--gold)]">{formatCurrency(p.mrr)}</td>
                        <td className="py-2 px-2 text-right">{p.clientes}</td>
                        <td className="py-2 px-2 text-right text-green-400">+{p.clientesNovos}</td>
                        <td className="py-2 px-2 text-right text-red-400">-{p.churn}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(p.custoTotal)}</td>
                        <td className={`py-2 px-2 text-right font-medium ${p.lucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(p.lucro)}
                        </td>
                        <td className="py-2 px-2 text-right">
                          <span className="flex items-center justify-end gap-1">
                            <Users className="w-3 h-3" />
                            {p.funcionarios}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights */}
            <div className="glass rounded-2xl p-6 border border-[var(--gold)]/30">
              <h3 className="font-semibold mb-4">📊 Insights da Projeção</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {mes12 && (
                  <>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">ARR em 1 ano</p>
                      <p className="text-2xl font-bold text-[var(--gold)]">{formatCurrency(mes12.arr)}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Margem de Lucro (Mês 12)</p>
                      <p className={`text-2xl font-bold ${mes12.margemLucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {mes12.margemLucro.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Crescimento Líquido</p>
                      <p className="text-2xl font-bold">
                        {(config.crescimentoMensal - config.churnMensal).toFixed(1)}%/mês
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Equipe Necessária (Ano 1)</p>
                      <p className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {mes12.funcionarios} pessoas
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
