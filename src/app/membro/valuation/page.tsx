'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calculator,
  Target,
  Info,
  HelpCircle,
  Sparkles,
  BarChart3,
  PieChart,
  Award,
  Zap,
  Users,
  RefreshCw,
  Building2
} from 'lucide-react'

interface DadosValuation {
  // Receita
  mrrAtual: number
  crescimentoMensal: number

  // Margens
  margemBruta: number
  margemLiquida: number

  // Métricas
  churnMensal: number
  ltvCac: number

  // Qualitativas
  temRecorrencia: boolean
  temProdutoEscalavel: boolean
  temEquipe: boolean
  temMarca: boolean
  temPatentes: boolean
  mercadoGrande: boolean
}

interface ResultadoValuation {
  multiploARR: number
  multiploMRR: number
  valorMinimo: number
  valorMedio: number
  valorMaximo: number
  metodo: string
  explicacao: string
}

const dadosIniciais: DadosValuation = {
  mrrAtual: 0,
  crescimentoMensal: 0,
  margemBruta: 70,
  margemLiquida: 20,
  churnMensal: 3,
  ltvCac: 3,
  temRecorrencia: true,
  temProdutoEscalavel: true,
  temEquipe: false,
  temMarca: false,
  temPatentes: false,
  mercadoGrande: true,
}

export default function ValuationPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosValuation>(dadosIniciais)
  const [resultado, setResultado] = useState<ResultadoValuation | null>(null)
  const [tooltipAtivo, setTooltipAtivo] = useState<string | null>(null)
  const [metodoSelecionado, setMetodoSelecionado] = useState<'arr' | 'receita' | 'ebitda'>('arr')

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
  }, [router])

  useEffect(() => {
    calcularValuation()
  }, [dados, metodoSelecionado])

  const calcularValuation = () => {
    const { mrrAtual, crescimentoMensal, margemBruta, margemLiquida, churnMensal, ltvCac } = dados

    if (mrrAtual <= 0) {
      setResultado(null)
      return
    }

    const arr = mrrAtual * 12

    // Calcular múltiplo base
    let multiploBase = 3 // Múltiplo base para SaaS

    // Ajustes por crescimento
    if (crescimentoMensal >= 20) multiploBase += 4
    else if (crescimentoMensal >= 15) multiploBase += 3
    else if (crescimentoMensal >= 10) multiploBase += 2
    else if (crescimentoMensal >= 5) multiploBase += 1

    // Ajustes por churn
    if (churnMensal <= 1) multiploBase += 2
    else if (churnMensal <= 2) multiploBase += 1
    else if (churnMensal >= 5) multiploBase -= 1
    else if (churnMensal >= 8) multiploBase -= 2

    // Ajustes por LTV:CAC
    if (ltvCac >= 5) multiploBase += 1.5
    else if (ltvCac >= 3) multiploBase += 0.5
    else if (ltvCac < 2) multiploBase -= 1

    // Ajustes por margem
    if (margemBruta >= 80) multiploBase += 1
    else if (margemBruta < 60) multiploBase -= 0.5

    // Ajustes qualitativos
    if (dados.temRecorrencia) multiploBase += 0.5
    if (dados.temProdutoEscalavel) multiploBase += 0.5
    if (dados.temEquipe) multiploBase += 0.5
    if (dados.temMarca) multiploBase += 0.5
    if (dados.temPatentes) multiploBase += 1
    if (dados.mercadoGrande) multiploBase += 0.5

    // Garantir mínimo
    multiploBase = Math.max(1, multiploBase)

    let valorBase = 0
    let metodo = ''
    let explicacao = ''

    switch (metodoSelecionado) {
      case 'arr':
        valorBase = arr * multiploBase
        metodo = 'Múltiplo de ARR'
        explicacao = `Valor = ARR (${formatarMoeda(arr)}) × Múltiplo (${multiploBase.toFixed(1)}x)`
        break
      case 'receita':
        valorBase = arr * (multiploBase * 0.8)
        metodo = 'Múltiplo de Receita'
        explicacao = `Valor = Receita Anual × Múltiplo ajustado (${(multiploBase * 0.8).toFixed(1)}x)`
        break
      case 'ebitda':
        const ebitda = arr * (margemLiquida / 100)
        const multiploEbitda = multiploBase * 1.5
        valorBase = ebitda * multiploEbitda
        metodo = 'Múltiplo de EBITDA'
        explicacao = `Valor = EBITDA (${formatarMoeda(ebitda)}) × Múltiplo (${multiploEbitda.toFixed(1)}x)`
        break
    }

    setResultado({
      multiploARR: multiploBase,
      multiploMRR: multiploBase * 12,
      valorMinimo: valorBase * 0.7,
      valorMedio: valorBase,
      valorMaximo: valorBase * 1.4,
      metodo,
      explicacao
    })
  }

  const handleChange = (campo: keyof DadosValuation, valor: string | boolean) => {
    if (typeof valor === 'boolean') {
      setDados(prev => ({ ...prev, [campo]: valor }))
    } else {
      const numero = parseFloat(valor) || 0
      setDados(prev => ({ ...prev, [campo]: numero }))
    }
  }

  const formatarMoeda = (valor: number) => {
    if (valor >= 1000000) {
      return `R$ ${(valor / 1000000).toFixed(2)}M`
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const tooltips: Record<string, string> = {
    mrr: 'Monthly Recurring Revenue - Sua receita mensal recorrente atual.',
    crescimento: 'Taxa de crescimento mensal do MRR (MoM). 10%+ é considerado alto crescimento.',
    margemBruta: 'Receita - Custo direto do serviço. SaaS típico: 70-85%.',
    margemLiquida: 'Lucro líquido / Receita. Considera todos os custos.',
    churn: 'Percentual de clientes que cancelam por mês. Abaixo de 2% é excelente.',
    ltvCac: 'Lifetime Value dividido por Custo de Aquisição. Ideal: 3x ou mais.',
  }

  const getClassificacao = () => {
    if (!resultado) return null

    const multiplo = resultado.multiploARR

    if (multiplo >= 10) return { label: 'Unicórnio em Potencial', cor: '#FFD700', icon: Award }
    if (multiplo >= 7) return { label: 'Alto Crescimento', cor: '#4CAF50', icon: TrendingUp }
    if (multiplo >= 5) return { label: 'Saudável', cor: '#2196F3', icon: Target }
    if (multiplo >= 3) return { label: 'Em Desenvolvimento', cor: '#FF9800', icon: Zap }
    return { label: 'Early Stage', cor: '#9E9E9E', icon: Building2 }
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
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Simulador de Valuation</h1>
            <p className="text-[var(--gray)] text-sm">Descubra quanto vale sua empresa</p>
          </div>
        </header>

        {/* Aviso */}
        <section className="glass p-4 mb-8 border-l-4 border-[var(--gold)]">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
            <p className="text-[var(--gray)] text-sm">
              Este simulador fornece uma <strong className="text-white">estimativa educacional</strong> baseada em
              múltiplos de mercado. Valuations reais dependem de due diligence, negociação e condições de mercado.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulário */}
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">MRR Atual (R$)</label>
                    <button
                      onMouseEnter={() => setTooltipAtivo('mrr')}
                      onMouseLeave={() => setTooltipAtivo(null)}
                      className="relative"
                    >
                      <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                      {tooltipAtivo === 'mrr' && (
                        <div className="absolute bottom-full right-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-56 z-10">
                          {tooltips.mrr}
                        </div>
                      )}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={dados.mrrAtual || ''}
                    onChange={(e) => handleChange('mrrAtual', e.target.value)}
                    placeholder="Ex: 50000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">Crescimento Mensal (%)</label>
                    <button
                      onMouseEnter={() => setTooltipAtivo('crescimento')}
                      onMouseLeave={() => setTooltipAtivo(null)}
                      className="relative"
                    >
                      <HelpCircle className="w-4 h-4 text-[var(--gray)]" />
                      {tooltipAtivo === 'crescimento' && (
                        <div className="absolute bottom-full right-0 mb-2 p-3 bg-black border border-white/20 rounded-lg text-xs text-[var(--gray)] w-56 z-10">
                          {tooltips.crescimento}
                        </div>
                      )}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={dados.crescimentoMensal || ''}
                    onChange={(e) => handleChange('crescimentoMensal', e.target.value)}
                    placeholder="Ex: 15"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Margens */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-white font-semibold">Margens</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">Margem Bruta (%)</label>
                    <span className="text-white text-sm">{dados.margemBruta}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={dados.margemBruta}
                    onChange={(e) => handleChange('margemBruta', e.target.value)}
                    className="w-full accent-[var(--gold)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">Margem Líquida (%)</label>
                    <span className="text-white text-sm">{dados.margemLiquida}%</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="50"
                    value={dados.margemLiquida}
                    onChange={(e) => handleChange('margemLiquida', e.target.value)}
                    className="w-full accent-[var(--gold)]"
                  />
                </div>
              </div>
            </section>

            {/* Métricas */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-white font-semibold">Métricas de Eficiência</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">Churn Mensal (%)</label>
                    <span className="text-white text-sm">{dados.churnMensal}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={dados.churnMensal}
                    onChange={(e) => handleChange('churnMensal', e.target.value)}
                    className="w-full accent-[var(--gold)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[var(--gray)] text-sm">LTV:CAC Ratio</label>
                    <span className="text-white text-sm">{dados.ltvCac}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={dados.ltvCac}
                    onChange={(e) => handleChange('ltvCac', e.target.value)}
                    className="w-full accent-[var(--gold)]"
                  />
                </div>
              </div>
            </section>

            {/* Fatores Qualitativos */}
            <section className="glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-white font-semibold">Fatores Qualitativos</h2>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'temRecorrencia', label: 'Receita 100% recorrente (assinatura)' },
                  { key: 'temProdutoEscalavel', label: 'Produto escalável (baixo custo marginal)' },
                  { key: 'temEquipe', label: 'Equipe completa (tech + comercial)' },
                  { key: 'temMarca', label: 'Marca reconhecida no mercado' },
                  { key: 'temPatentes', label: 'Propriedade intelectual/patentes' },
                  { key: 'mercadoGrande', label: 'TAM > R$ 1 bilhão' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dados[item.key as keyof DadosValuation] as boolean}
                      onChange={(e) => handleChange(item.key as keyof DadosValuation, e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-black/40 text-[var(--gold)] focus:ring-[var(--gold)]"
                    />
                    <span className="text-[var(--gray)] group-hover:text-white transition-colors text-sm">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Resultado */}
          <div className="space-y-6">
            {/* Método */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4">Método de Valuation</h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'arr', label: 'Múltiplo ARR', desc: 'Mais comum para SaaS' },
                  { id: 'receita', label: 'Receita Total', desc: 'Conservador' },
                  { id: 'ebitda', label: 'EBITDA', desc: 'Foco em lucro' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMetodoSelecionado(m.id as 'arr' | 'receita' | 'ebitda')}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      metodoSelecionado === m.id
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <p className={`font-medium text-sm ${metodoSelecionado === m.id ? 'text-[var(--gold)]' : 'text-white'}`}>
                      {m.label}
                    </p>
                    <p className="text-[var(--gray)] text-xs mt-1">{m.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Valor Estimado */}
            {resultado ? (
              <>
                <section className="glass p-6 border border-[var(--gold)]/30">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-semibold">Valuation Estimado</h2>
                    {getClassificacao() && (
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: `${getClassificacao()!.cor}20`, color: getClassificacao()!.cor }}
                      >
                        {(() => {
                          const Icon = getClassificacao()!.icon
                          return <Icon className="w-4 h-4" />
                        })()}
                        {getClassificacao()!.label}
                      </div>
                    )}
                  </div>

                  <div className="text-center py-6">
                    <p className="text-[var(--gray)] text-sm mb-2">Valor Médio Estimado</p>
                    <p className="text-4xl sm:text-5xl font-bold gold-text mb-2">
                      {formatarMoeda(resultado.valorMedio)}
                    </p>
                    <p className="text-[var(--gray)] text-sm">
                      Range: {formatarMoeda(resultado.valorMinimo)} - {formatarMoeda(resultado.valorMaximo)}
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 border border-white/10 mt-4">
                    <p className="text-[var(--gold)] font-medium text-sm mb-1">{resultado.metodo}</p>
                    <p className="text-[var(--gray)] text-sm">{resultado.explicacao}</p>
                  </div>
                </section>

                {/* Breakdown */}
                <section className="glass p-6">
                  <h2 className="text-white font-semibold mb-4">Composição do Múltiplo</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">ARR (MRR × 12)</span>
                      <span className="text-white font-medium">{formatarMoeda(dados.mrrAtual * 12)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">Múltiplo Aplicado</span>
                      <span className="text-[var(--gold)] font-medium">{resultado.multiploARR.toFixed(1)}x ARR</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[var(--gray)]">Equivalente em MRR</span>
                      <span className="text-white font-medium">{resultado.multiploMRR.toFixed(0)}x MRR</span>
                    </div>
                  </div>
                </section>

                {/* Fatores que Influenciam */}
                <section className="glass p-6">
                  <h2 className="text-white font-semibold mb-4">O que Aumenta seu Múltiplo</h2>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                      <p className="text-green-400 font-medium mb-1">Positivos</p>
                      <ul className="text-[var(--gray)] space-y-1">
                        <li>• Crescimento &gt; 15% MoM</li>
                        <li>• Churn &lt; 2%</li>
                        <li>• LTV:CAC &gt; 5x</li>
                        <li>• Margem bruta &gt; 80%</li>
                        <li>• Propriedade intelectual</li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                      <p className="text-red-400 font-medium mb-1">Negativos</p>
                      <ul className="text-[var(--gray)] space-y-1">
                        <li>• Crescimento &lt; 5% MoM</li>
                        <li>• Churn &gt; 5%</li>
                        <li>• LTV:CAC &lt; 2x</li>
                        <li>• Margem bruta &lt; 60%</li>
                        <li>• Dependência de 1 cliente</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Benchmarks */}
                <section className="glass p-6">
                  <h2 className="text-white font-semibold mb-4">Benchmarks de Mercado (2024)</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">SaaS Early Stage (Seed)</span>
                      <span className="text-white">2-4x ARR</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">SaaS Growth (Series A/B)</span>
                      <span className="text-white">5-10x ARR</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">SaaS Scale (Series C+)</span>
                      <span className="text-white">8-15x ARR</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[var(--gray)]">SaaS Público (IPO)</span>
                      <span className="text-white">10-25x ARR</span>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <section className="glass p-12 text-center">
                <Calculator className="w-16 h-16 text-[var(--gray)]/50 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Preencha os Dados</h3>
                <p className="text-[var(--gray)] text-sm">
                  Insira seu MRR atual para calcular o valuation estimado
                </p>
              </section>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <section className="glass p-6 mt-6 border border-orange-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-orange-400 font-medium mb-2">Disclaimer Importante</p>
              <p className="text-[var(--gray)]">
                Esta calculadora é uma ferramenta educacional. O valuation real de uma empresa depende de diversos
                fatores como: condições de mercado, potencial de crescimento, qualidade da receita, concentração de
                clientes, equipe, tecnologia proprietária, entre outros. Para um valuation profissional,
                consulte assessores de M&A ou investidores especializados.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Simulador de Valuation - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
