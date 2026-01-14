'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Calculator, TrendingUp, Target, AlertCircle, CheckCircle, Info, Zap } from 'lucide-react'

interface Custos {
  infraestrutura: number
  ferramentas: number
  equipe: number
  marketing: number
  outros: number
}

interface Mercado {
  concorrenteMenor: number
  concorrenteMedio: number
  concorrenteMaior: number
}

interface Resultado {
  custoTotal: number
  custoPorCliente: number
  precoMinimo: number
  precoSugerido: number
  precoValor: number
  margemBruta: number
  breakeven: number
  posicionamento: string
}

export default function PrecificacaoPage() {
  const [custos, setCustos] = useState<Custos>({
    infraestrutura: 500,
    ferramentas: 300,
    equipe: 5000,
    marketing: 1000,
    outros: 200,
  })

  const [mercado, setMercado] = useState<Mercado>({
    concorrenteMenor: 49,
    concorrenteMedio: 149,
    concorrenteMaior: 499,
  })

  const [config, setConfig] = useState({
    clientesEsperados: 50,
    margemDesejada: 70,
    modeloCobranca: 'mensal',
    tipoSolucao: 'horizontal',
    diferenciais: 3,
  })

  const [resultado, setResultado] = useState<Resultado | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-precificacao')
    if (saved) {
      const data = JSON.parse(saved)
      setCustos(data.custos || custos)
      setMercado(data.mercado || mercado)
      setConfig(data.config || config)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mentoria-precificacao', JSON.stringify({ custos, mercado, config }))
    calcularPreco()
  }, [custos, mercado, config])

  const calcularPreco = () => {
    // Custo total mensal
    const custoTotal = Object.values(custos).reduce((a, b) => a + b, 0)

    // Custo por cliente
    const custoPorCliente = config.clientesEsperados > 0
      ? custoTotal / config.clientesEsperados
      : custoTotal

    // Preço mínimo (custo + margem mínima de 30%)
    const precoMinimo = custoPorCliente * 1.3

    // Preço baseado na margem desejada
    const precoSugerido = custoPorCliente / (1 - config.margemDesejada / 100)

    // Preço baseado em valor (média do mercado + ajuste por diferenciais)
    const mediaMercado = (mercado.concorrenteMenor + mercado.concorrenteMedio + mercado.concorrenteMaior) / 3
    const ajusteDiferenciais = 1 + (config.diferenciais * 0.1) // +10% por diferencial
    const ajusteTipo = config.tipoSolucao === 'vertical' ? 1.3 : 1 // Vertical pode cobrar mais
    const precoValor = mediaMercado * ajusteDiferenciais * ajusteTipo

    // Margem bruta com preço sugerido
    const margemBruta = ((precoSugerido - custoPorCliente) / precoSugerido) * 100

    // Breakeven
    const breakeven = custoTotal > 0 && precoSugerido > 0
      ? Math.ceil(custoTotal / precoSugerido)
      : 0

    // Posicionamento
    let posicionamento = ''
    const precoFinal = Math.max(precoSugerido, precoValor)
    if (precoFinal <= mercado.concorrenteMenor) {
      posicionamento = 'entrada'
    } else if (precoFinal <= mercado.concorrenteMedio) {
      posicionamento = 'competitivo'
    } else if (precoFinal <= mercado.concorrenteMaior) {
      posicionamento = 'premium'
    } else {
      posicionamento = 'enterprise'
    }

    setResultado({
      custoTotal,
      custoPorCliente,
      precoMinimo,
      precoSugerido,
      precoValor,
      margemBruta,
      breakeven,
      posicionamento,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getPosicionamentoConfig = (pos: string) => {
    switch (pos) {
      case 'entrada':
        return { cor: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Entrada', desc: 'Preço agressivo para ganhar mercado' }
      case 'competitivo':
        return { cor: 'text-green-400', bg: 'bg-green-500/20', label: 'Competitivo', desc: 'Alinhado com o mercado' }
      case 'premium':
        return { cor: 'text-[var(--gold)]', bg: 'bg-[var(--gold)]/20', label: 'Premium', desc: 'Acima da média, requer diferenciação' }
      case 'enterprise':
        return { cor: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Enterprise', desc: 'Alto valor, poucos clientes' }
      default:
        return { cor: 'text-white', bg: 'bg-white/20', label: 'Indefinido', desc: '' }
    }
  }

  const estrategias = [
    {
      nome: 'Freemium',
      desc: 'Versão gratuita limitada + plano pago completo',
      quando: 'Mercado grande, produto viral',
      exemplo: 'Slack, Notion, Figma',
    },
    {
      nome: 'Free Trial',
      desc: '7-14 dias grátis, depois cobra',
      quando: 'Produto com valor imediato',
      exemplo: 'Netflix, Salesforce',
    },
    {
      nome: 'Pay-as-you-go',
      desc: 'Cobra por uso (transações, usuários, etc)',
      quando: 'Uso variável entre clientes',
      exemplo: 'AWS, Twilio, Stripe',
    },
    {
      nome: 'Tiers (Planos)',
      desc: 'Básico, Pro, Enterprise com features diferentes',
      quando: 'Clientes com necessidades diferentes',
      exemplo: 'Zoom, HubSpot',
    },
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
            <h1 className="text-3xl font-bold">Calculadora de Precificação</h1>
            <p className="text-white/60">Descubra quanto cobrar pelo seu SaaS</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            {/* Custos Mensais */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[var(--gold)]" />
                Custos Mensais
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Infraestrutura (servidores, cloud)</label>
                  <input
                    type="number"
                    value={custos.infraestrutura}
                    onChange={(e) => setCustos({ ...custos, infraestrutura: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Ferramentas e SaaS (analytics, email, etc)</label>
                  <input
                    type="number"
                    value={custos.ferramentas}
                    onChange={(e) => setCustos({ ...custos, ferramentas: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Equipe (salários, freelancers)</label>
                  <input
                    type="number"
                    value={custos.equipe}
                    onChange={(e) => setCustos({ ...custos, equipe: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Marketing e Vendas</label>
                  <input
                    type="number"
                    value={custos.marketing}
                    onChange={(e) => setCustos({ ...custos, marketing: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Outros custos</label>
                  <input
                    type="number"
                    value={custos.outros}
                    onChange={(e) => setCustos({ ...custos, outros: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Análise de Mercado */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Análise de Mercado
              </h2>
              <p className="text-sm text-white/60 mb-4">
                Pesquise 3 concorrentes e insira os preços mensais:
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Mais Barato</label>
                  <input
                    type="number"
                    value={mercado.concorrenteMenor}
                    onChange={(e) => setMercado({ ...mercado, concorrenteMenor: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Médio</label>
                  <input
                    type="number"
                    value={mercado.concorrenteMedio}
                    onChange={(e) => setMercado({ ...mercado, concorrenteMedio: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Mais Caro</label>
                  <input
                    type="number"
                    value={mercado.concorrenteMaior}
                    onChange={(e) => setMercado({ ...mercado, concorrenteMaior: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Configurações */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Configurações
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Clientes esperados (12 meses)</label>
                    <input
                      type="number"
                      value={config.clientesEsperados}
                      onChange={(e) => setConfig({ ...config, clientesEsperados: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Margem desejada (%)</label>
                    <input
                      type="number"
                      value={config.margemDesejada}
                      onChange={(e) => setConfig({ ...config, margemDesejada: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Tipo de solução</label>
                  <select
                    value={config.tipoSolucao}
                    onChange={(e) => setConfig({ ...config, tipoSolucao: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  >
                    <option value="horizontal">Horizontal (serve vários segmentos)</option>
                    <option value="vertical">Vertical (nicho específico)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Diferenciais competitivos: {config.diferenciais}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={config.diferenciais}
                    onChange={(e) => setConfig({ ...config, diferenciais: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Nenhum</span>
                    <span>Muitos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado && (
              <>
                {/* Preço Recomendado */}
                <div className="glass rounded-2xl p-6 border-2 border-[var(--gold)]">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[var(--gold)]" />
                    Preço Recomendado
                  </h2>

                  <div className="text-center py-6">
                    <p className="text-sm text-white/60 mb-2">Preço mensal sugerido</p>
                    <p className="text-5xl font-bold text-[var(--gold)]">
                      {formatCurrency(Math.max(resultado.precoSugerido, resultado.precoValor))}
                    </p>
                    <p className="text-sm text-white/50 mt-2">
                      /mês por cliente
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${getPosicionamentoConfig(resultado.posicionamento).bg} mt-4`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${getPosicionamentoConfig(resultado.posicionamento).cor}`}>
                        Posicionamento: {getPosicionamentoConfig(resultado.posicionamento).label}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">
                      {getPosicionamentoConfig(resultado.posicionamento).desc}
                    </p>
                  </div>
                </div>

                {/* Comparativo de Preços */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Comparativo de Métodos</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="font-medium">Preço Mínimo (custo + 30%)</p>
                        <p className="text-xs text-white/50">Abaixo disso você perde dinheiro</p>
                      </div>
                      <p className="font-bold text-red-400">{formatCurrency(resultado.precoMinimo)}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="font-medium">Preço por Margem ({config.margemDesejada}%)</p>
                        <p className="text-xs text-white/50">Baseado nos seus custos</p>
                      </div>
                      <p className="font-bold text-blue-400">{formatCurrency(resultado.precoSugerido)}</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="font-medium">Preço por Valor</p>
                        <p className="text-xs text-white/50">Baseado no mercado + diferenciais</p>
                      </div>
                      <p className="font-bold text-green-400">{formatCurrency(resultado.precoValor)}</p>
                    </div>
                  </div>
                </div>

                {/* Métricas */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Métricas Importantes</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Custo Total/Mês</p>
                      <p className="text-xl font-bold">{formatCurrency(resultado.custoTotal)}</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Custo por Cliente</p>
                      <p className="text-xl font-bold">{formatCurrency(resultado.custoPorCliente)}</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Margem Bruta</p>
                      <p className="text-xl font-bold text-[var(--gold)]">{resultado.margemBruta.toFixed(1)}%</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-white/60">Breakeven</p>
                      <p className="text-xl font-bold">{resultado.breakeven} clientes</p>
                    </div>
                  </div>
                </div>

                {/* Dicas */}
                <div className="glass rounded-2xl p-6 border border-[var(--gold)]/30">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[var(--gold)]" />
                    Dicas de Precificação
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">
                        <strong>Margem saudável:</strong> SaaS B2B deve ter entre 70-80% de margem bruta
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">
                        <strong>Preço anual:</strong> Ofereça 2 meses grátis no plano anual (desconto de 16%)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">
                        <strong>Aumente gradualmente:</strong> É mais fácil subir preço para novos clientes
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">
                        <strong>Evite guerra de preço:</strong> Competir por preço é corrida para o fundo
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Estratégias de Monetização */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--gold)]" />
            Estratégias de Monetização
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {estrategias.map((estrategia, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <h4 className="font-semibold text-[var(--gold)] mb-2">{estrategia.nome}</h4>
                <p className="text-sm text-white/70 mb-3">{estrategia.desc}</p>
                <p className="text-xs text-white/50 mb-1">
                  <strong>Quando usar:</strong> {estrategia.quando}
                </p>
                <p className="text-xs text-white/40">
                  <strong>Ex:</strong> {estrategia.exemplo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
