'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  DollarSign,
  Target,
  TrendingUp,
  Calculator,
  Award,
  Zap,
  Crown,
  Trophy,
  Star,
  Info,
  PlusCircle,
  Trash2
} from 'lucide-react'

interface PlanoComissao {
  id: string
  nome: string
  tipo: 'fixo' | 'percentual' | 'escalonado'
  valorBase: number
  percentual: number
  escala: { min: number; max: number; percentual: number }[]
  bonus: { meta: number; valor: number }[]
}

interface Venda {
  id: string
  valor: number
  data: string
}

const planosPreDefinidos: PlanoComissao[] = [
  {
    id: 'basico',
    nome: 'Comissão Fixa',
    tipo: 'fixo',
    valorBase: 100,
    percentual: 0,
    escala: [],
    bonus: []
  },
  {
    id: 'percentual',
    nome: 'Percentual Simples',
    tipo: 'percentual',
    valorBase: 0,
    percentual: 10,
    escala: [],
    bonus: []
  },
  {
    id: 'escalonado',
    nome: 'Escalonado por Faixa',
    tipo: 'escalonado',
    valorBase: 0,
    percentual: 0,
    escala: [
      { min: 0, max: 5000, percentual: 5 },
      { min: 5001, max: 15000, percentual: 10 },
      { min: 15001, max: 30000, percentual: 15 },
      { min: 30001, max: Infinity, percentual: 20 },
    ],
    bonus: [
      { meta: 20000, valor: 500 },
      { meta: 40000, valor: 1500 },
      { meta: 60000, valor: 3000 },
    ]
  },
  {
    id: 'agressivo',
    nome: 'Alta Performance',
    tipo: 'escalonado',
    valorBase: 500,
    percentual: 0,
    escala: [
      { min: 0, max: 10000, percentual: 8 },
      { min: 10001, max: 25000, percentual: 12 },
      { min: 25001, max: 50000, percentual: 18 },
      { min: 50001, max: Infinity, percentual: 25 },
    ],
    bonus: [
      { meta: 30000, valor: 1000 },
      { meta: 50000, valor: 2500 },
      { meta: 80000, valor: 5000 },
    ]
  }
]

export default function ComissoesPage() {
  const router = useRouter()
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoComissao>(planosPreDefinidos[2])
  const [metaMensal, setMetaMensal] = useState(30000)
  const [vendasMes, setVendasMes] = useState(0)
  const [vendas, setVendas] = useState<Venda[]>([])
  const [novaVenda, setNovaVenda] = useState('')

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('comissoes_vendas')
    if (saved) {
      const data = JSON.parse(saved)
      setVendas(data.vendas || [])
      setMetaMensal(data.meta || 30000)
    }
  }, [router])

  useEffect(() => {
    const total = vendas.reduce((acc, v) => acc + v.valor, 0)
    setVendasMes(total)

    localStorage.setItem('comissoes_vendas', JSON.stringify({
      vendas,
      meta: metaMensal
    }))
  }, [vendas, metaMensal])

  const adicionarVenda = () => {
    const valor = parseFloat(novaVenda)
    if (valor > 0) {
      setVendas([...vendas, {
        id: Date.now().toString(),
        valor,
        data: new Date().toLocaleDateString('pt-BR')
      }])
      setNovaVenda('')
    }
  }

  const removerVenda = (id: string) => {
    setVendas(vendas.filter(v => v.id !== id))
  }

  const limparVendas = () => {
    if (confirm('Limpar todas as vendas do mês?')) {
      setVendas([])
    }
  }

  const calcularComissao = (valorVendas: number): number => {
    const plano = planoSelecionado
    let comissao = 0

    switch (plano.tipo) {
      case 'fixo':
        // Comissão fixa por venda
        comissao = vendas.length * plano.valorBase
        break

      case 'percentual':
        // Percentual simples sobre vendas
        comissao = valorVendas * (plano.percentual / 100)
        break

      case 'escalonado':
        // Base + escalonado por faixa
        comissao = plano.valorBase

        let valorRestante = valorVendas
        for (const faixa of plano.escala) {
          if (valorRestante <= 0) break

          const valorNaFaixa = Math.min(
            valorRestante,
            faixa.max === Infinity ? valorRestante : faixa.max - faixa.min + 1
          )

          if (valorVendas >= faixa.min) {
            const valorAplicavel = Math.min(valorVendas, faixa.max) - faixa.min + 1
            if (valorAplicavel > 0) {
              comissao += Math.min(valorAplicavel, valorNaFaixa) * (faixa.percentual / 100)
            }
          }
          valorRestante -= valorNaFaixa
        }
        break
    }

    return comissao
  }

  const calcularBonus = (valorVendas: number): number => {
    let bonus = 0
    for (const b of planoSelecionado.bonus) {
      if (valorVendas >= b.meta) {
        bonus = b.valor // Pega o maior bônus atingido
      }
    }
    return bonus
  }

  const comissaoBase = calcularComissao(vendasMes)
  const bonus = calcularBonus(vendasMes)
  const totalGanhos = comissaoBase + bonus
  const progressoMeta = Math.min((vendasMes / metaMensal) * 100, 100)
  const faltaParaMeta = Math.max(metaMensal - vendasMes, 0)

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getProximoBonus = () => {
    for (const b of planoSelecionado.bonus) {
      if (vendasMes < b.meta) {
        return { meta: b.meta, valor: b.valor, falta: b.meta - vendasMes }
      }
    }
    return null
  }

  const proximoBonus = getProximoBonus()

  const simularCenarios = () => {
    const cenarios = [
      { nome: 'Meta 100%', valor: metaMensal },
      { nome: 'Meta 150%', valor: metaMensal * 1.5 },
      { nome: 'Meta 200%', valor: metaMensal * 2 },
    ]

    return cenarios.map(c => ({
      ...c,
      comissao: calcularComissao(c.valor),
      bonus: calcularBonus(c.valor),
      total: calcularComissao(c.valor) + calcularBonus(c.valor)
    }))
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
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Calculadora de Comissões</h1>
            <p className="text-[var(--gray)] text-sm">Simule seus ganhos e acompanhe suas vendas</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna 1: Configuração */}
          <div className="space-y-6">
            {/* Plano de Comissão */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[var(--gold)]" />
                Plano de Comissão
              </h2>

              <div className="space-y-2">
                {planosPreDefinidos.map((plano) => (
                  <button
                    key={plano.id}
                    onClick={() => setPlanoSelecionado(plano)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      planoSelecionado.id === plano.id
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <p className={`font-medium ${planoSelecionado.id === plano.id ? 'text-[var(--gold)]' : 'text-white'}`}>
                      {plano.nome}
                    </p>
                    <p className="text-[var(--gray)] text-xs mt-1">
                      {plano.tipo === 'fixo' && `${formatarMoeda(plano.valorBase)} por venda`}
                      {plano.tipo === 'percentual' && `${plano.percentual}% sobre vendas`}
                      {plano.tipo === 'escalonado' && `${plano.escala[0].percentual}% a ${plano.escala[plano.escala.length-1].percentual}%`}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* Meta Mensal */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Meta Mensal
              </h2>

              <input
                type="number"
                value={metaMensal}
                onChange={(e) => setMetaMensal(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors text-lg"
              />
              <p className="text-[var(--gray)] text-xs mt-2">
                Defina sua meta de vendas para o mês
              </p>
            </section>

            {/* Detalhes do Plano */}
            {planoSelecionado.tipo === 'escalonado' && (
              <section className="glass p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                  Tabela de Comissões
                </h2>

                <div className="space-y-2 text-sm">
                  {planoSelecionado.escala.map((faixa, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">
                        {formatarMoeda(faixa.min)} - {faixa.max === Infinity ? '∞' : formatarMoeda(faixa.max)}
                      </span>
                      <span className="text-white font-medium">{faixa.percentual}%</span>
                    </div>
                  ))}
                </div>

                {planoSelecionado.bonus.length > 0 && (
                  <>
                    <h3 className="text-white font-medium mt-4 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[var(--gold)]" />
                      Bônus por Meta
                    </h3>
                    <div className="space-y-2 text-sm">
                      {planoSelecionado.bonus.map((b, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-[var(--gray)]">
                            Atingir {formatarMoeda(b.meta)}
                          </span>
                          <span className="text-green-400 font-medium">+{formatarMoeda(b.valor)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </section>
            )}
          </div>

          {/* Coluna 2: Registro de Vendas */}
          <div className="space-y-6">
            {/* Adicionar Venda */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[var(--gold)]" />
                Registrar Venda
              </h2>

              <div className="flex gap-2">
                <input
                  type="number"
                  value={novaVenda}
                  onChange={(e) => setNovaVenda(e.target.value)}
                  placeholder="Valor da venda"
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && adicionarVenda()}
                />
                <button
                  onClick={adicionarVenda}
                  className="px-6 py-3 bg-[var(--gold)] text-black rounded-xl font-medium hover:bg-[var(--gold-light)] transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </section>

            {/* Lista de Vendas */}
            <section className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[var(--gold)]" />
                  Vendas do Mês ({vendas.length})
                </h2>
                {vendas.length > 0 && (
                  <button
                    onClick={limparVendas}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {vendas.length === 0 ? (
                <p className="text-[var(--gray)] text-sm text-center py-8">
                  Nenhuma venda registrada ainda
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {vendas.map((venda, idx) => (
                    <div key={venda.id} className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--gray)] text-sm">#{idx + 1}</span>
                        <span className="text-white font-medium">{formatarMoeda(venda.valor)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--gray)] text-xs">{venda.data}</span>
                        <button
                          onClick={() => removerVenda(venda.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Total em Vendas</span>
                  <span className="text-xl font-bold text-white">{formatarMoeda(vendasMes)}</span>
                </div>
              </div>
            </section>

            {/* Progresso da Meta */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Progresso da Meta
              </h2>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--gray)]">{formatarMoeda(vendasMes)}</span>
                  <span className="text-white">{formatarMoeda(metaMensal)}</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progressoMeta >= 100 ? 'bg-green-500' : 'bg-[var(--gold)]'
                    }`}
                    style={{ width: `${progressoMeta}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--gray)] text-sm">
                  {progressoMeta >= 100 ? 'Meta batida!' : `Falta ${formatarMoeda(faltaParaMeta)}`}
                </span>
                <span className={`font-bold ${progressoMeta >= 100 ? 'text-green-400' : 'text-[var(--gold)]'}`}>
                  {progressoMeta.toFixed(0)}%
                </span>
              </div>

              {proximoBonus && (
                <div className="mt-4 p-3 bg-[var(--gold)]/10 rounded-xl border border-[var(--gold)]/20">
                  <div className="flex items-center gap-2 text-[var(--gold)] text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Faltam {formatarMoeda(proximoBonus.falta)} para ganhar +{formatarMoeda(proximoBonus.valor)} de bônus!</span>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Coluna 3: Resultados */}
          <div className="space-y-6">
            {/* Ganhos do Mês */}
            <section className="glass p-6 border border-[var(--gold)]/30">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-[var(--gold)]" />
                Seus Ganhos
              </h2>

              <div className="text-center py-4">
                <p className="text-[var(--gray)] text-sm mb-1">Total do Mês</p>
                <p className="text-4xl font-bold gold-text mb-4">{formatarMoeda(totalGanhos)}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 rounded-xl p-3">
                    <p className="text-[var(--gray)]">Comissão</p>
                    <p className="text-white font-bold">{formatarMoeda(comissaoBase)}</p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3">
                    <p className="text-[var(--gray)]">Bônus</p>
                    <p className="text-green-400 font-bold">{formatarMoeda(bonus)}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Simulação de Cenários */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[var(--gold)]" />
                Simulação de Cenários
              </h2>

              <div className="space-y-3">
                {simularCenarios().map((cenario, idx) => (
                  <div key={idx} className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{cenario.nome}</span>
                      <span className="text-[var(--gray)] text-sm">{formatarMoeda(cenario.valor)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--gray)] text-sm">Você ganharia:</span>
                      <span className="text-[var(--gold)] font-bold">{formatarMoeda(cenario.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projeção Anual */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--gold)]" />
                Projeção Anual
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">Se mantiver este ritmo</span>
                  <span className="text-white font-medium">{formatarMoeda(totalGanhos * 12)}/ano</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[var(--gray)]">Batendo 100% da meta</span>
                  <span className="text-white font-medium">
                    {formatarMoeda((calcularComissao(metaMensal) + calcularBonus(metaMensal)) * 12)}/ano
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[var(--gray)]">Batendo 150% da meta</span>
                  <span className="text-[var(--gold)] font-medium">
                    {formatarMoeda((calcularComissao(metaMensal * 1.5) + calcularBonus(metaMensal * 1.5)) * 12)}/ano
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Calculadora de Comissões - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
