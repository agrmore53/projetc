'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  PieChart,
  Zap,
  Users,
  Package,
  FileText,
  Target
} from 'lucide-react'

interface DadosROI {
  // Perdas atuais
  perdasEstoque: number
  horasGestao: number
  valorHora: number
  vendasPerdidas: number
  descontosIndevidos: number
  multasFiscais: number

  // Ganhos potenciais
  aumentoVendas: number
  reducaoChurn: number

  // Investimento
  mensalidadeSistema: number
  implementacao: number
}

const dadosIniciais: DadosROI = {
  perdasEstoque: 500,
  horasGestao: 20,
  valorHora: 50,
  vendasPerdidas: 1000,
  descontosIndevidos: 300,
  multasFiscais: 0,
  aumentoVendas: 15,
  reducaoChurn: 0,
  mensalidadeSistema: 297,
  implementacao: 0,
}

export default function ROIPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosROI>(dadosIniciais)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
  }, [router])

  const handleChange = (campo: keyof DadosROI, valor: string) => {
    setDados(prev => ({ ...prev, [campo]: parseFloat(valor) || 0 }))
  }

  // Cálculos
  const custoHorasGestao = dados.horasGestao * dados.valorHora
  const totalPerdasMensais = dados.perdasEstoque + custoHorasGestao + dados.vendasPerdidas + dados.descontosIndevidos + dados.multasFiscais

  const economiaEstoque = dados.perdasEstoque * 0.9 // 90% de redução
  const economiaHoras = custoHorasGestao * 0.8 // 80% de redução
  const recuperacaoVendas = dados.vendasPerdidas * 0.85 // 85% recuperação
  const economiaDescontos = dados.descontosIndevidos * 0.95 // 95% redução
  const economiaMultas = dados.multasFiscais // 100% eliminação

  const totalEconomiaMensal = economiaEstoque + economiaHoras + recuperacaoVendas + economiaDescontos + economiaMultas
  const totalEconomiaAnual = totalEconomiaMensal * 12

  const investimentoMensal = dados.mensalidadeSistema
  const investimentoAnual = (dados.mensalidadeSistema * 12) + dados.implementacao

  const roiMensal = totalEconomiaMensal - investimentoMensal
  const roiAnual = totalEconomiaAnual - investimentoAnual
  const roiPercentual = investimentoAnual > 0 ? ((roiAnual / investimentoAnual) * 100) : 0
  const paybackMeses = totalEconomiaMensal > 0 ? (dados.implementacao / totalEconomiaMensal) : 0

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarTexto = () => {
    return `
📊 ANÁLISE DE ROI - SISTEMA DE GESTÃO

💸 SITUAÇÃO ATUAL (Perdas Mensais):
• Perdas de estoque: ${formatarMoeda(dados.perdasEstoque)}
• Tempo em gestão manual: ${dados.horasGestao}h × ${formatarMoeda(dados.valorHora)} = ${formatarMoeda(custoHorasGestao)}
• Vendas perdidas: ${formatarMoeda(dados.vendasPerdidas)}
• Descontos indevidos: ${formatarMoeda(dados.descontosIndevidos)}
${dados.multasFiscais > 0 ? `• Multas fiscais: ${formatarMoeda(dados.multasFiscais)}` : ''}
━━━━━━━━━━━━━━━━━━━━━
TOTAL PERDIDO/MÊS: ${formatarMoeda(totalPerdasMensais)}

💰 COM O SISTEMA (Economia Mensal):
• Redução perdas estoque (-90%): ${formatarMoeda(economiaEstoque)}
• Economia de tempo (-80%): ${formatarMoeda(economiaHoras)}
• Recuperação de vendas (+85%): ${formatarMoeda(recuperacaoVendas)}
• Controle de descontos (-95%): ${formatarMoeda(economiaDescontos)}
${economiaMultas > 0 ? `• Eliminação de multas: ${formatarMoeda(economiaMultas)}` : ''}
━━━━━━━━━━━━━━━━━━━━━
ECONOMIA MENSAL: ${formatarMoeda(totalEconomiaMensal)}
ECONOMIA ANUAL: ${formatarMoeda(totalEconomiaAnual)}

📈 RETORNO DO INVESTIMENTO:
• Investimento mensal: ${formatarMoeda(investimentoMensal)}
• ROI mensal: ${formatarMoeda(roiMensal)}
• ROI anual: ${formatarMoeda(roiAnual)}
• ROI %: ${roiPercentual.toFixed(0)}%
${paybackMeses > 0 ? `• Payback: ${paybackMeses.toFixed(1)} meses` : ''}

✅ CONCLUSÃO:
Para cada R$ 1 investido, você recupera R$ ${(roiPercentual/100 + 1).toFixed(2)}

O sistema se paga em ${paybackMeses < 1 ? 'menos de 1 mês' : `${paybackMeses.toFixed(1)} meses`}!
`.trim()
  }

  const copiarAnalise = async () => {
    try {
      await navigator.clipboard.writeText(gerarTexto())
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
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
              <h1 className="font-display text-2xl sm:text-3xl gold-text">Calculadora de ROI</h1>
              <p className="text-[var(--gray)] text-sm">Mostre ao cliente o retorno do investimento</p>
            </div>
          </div>

          <button
            onClick={copiarAnalise}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              copiado
                ? 'bg-green-500/20 text-green-400'
                : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
            }`}
          >
            {copiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span className="hidden sm:inline">{copiado ? 'Copiado!' : 'Copiar Análise'}</span>
          </button>
        </header>

        {/* Intro */}
        <section className="glass p-4 mb-8 border-l-4 border-[var(--gold)]">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
            <p className="text-[var(--gray)] text-sm">
              Use esta calculadora <strong className="text-white">junto com o cliente</strong>.
              Pergunte quanto ele perde em cada categoria e preencha. O resultado visual convence mais que qualquer argumento.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Coluna 1: Inputs */}
          <div className="space-y-6">
            {/* Perdas Atuais */}
            <section className="glass p-6">
              <h2 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Perdas Atuais (por mês)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[var(--gray)] text-sm mb-2">
                    <Package className="w-4 h-4" />
                    Perdas de Estoque (furto, vencimento, erro)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.perdasEstoque || ''}
                      onChange={(e) => handleChange('perdasEstoque', e.target.value)}
                      placeholder="500"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[var(--gray)] text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      Horas em gestão manual
                    </label>
                    <input
                      type="number"
                      value={dados.horasGestao || ''}
                      onChange={(e) => handleChange('horasGestao', e.target.value)}
                      placeholder="20"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Valor da hora (R$)</label>
                    <input
                      type="number"
                      value={dados.valorHora || ''}
                      onChange={(e) => handleChange('valorHora', e.target.value)}
                      placeholder="50"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[var(--gray)] text-sm mb-2">
                    <Target className="w-4 h-4" />
                    Vendas perdidas (não tinha, não achou)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.vendasPerdidas || ''}
                      onChange={(e) => handleChange('vendasPerdidas', e.target.value)}
                      placeholder="1000"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[var(--gray)] text-sm mb-2">
                    <Users className="w-4 h-4" />
                    Descontos indevidos (funcionários)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.descontosIndevidos || ''}
                      onChange={(e) => handleChange('descontosIndevidos', e.target.value)}
                      placeholder="300"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[var(--gray)] text-sm mb-2">
                    <FileText className="w-4 h-4" />
                    Multas fiscais (se houver)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.multasFiscais || ''}
                      onChange={(e) => handleChange('multasFiscais', e.target.value)}
                      placeholder="0"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Total de perdas mensais</span>
                  <span className="text-xl font-bold text-red-400">{formatarMoeda(totalPerdasMensais)}</span>
                </div>
              </div>
            </section>

            {/* Investimento */}
            <section className="glass p-6">
              <h2 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Investimento no Sistema
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[var(--gray)] text-sm mb-2 block">Mensalidade do Sistema</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.mensalidadeSistema || ''}
                      onChange={(e) => handleChange('mensalidadeSistema', e.target.value)}
                      placeholder="297"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[var(--gray)] text-sm mb-2 block">Taxa de Implementação (se houver)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray)]">R$</span>
                    <input
                      type="number"
                      value={dados.implementacao || ''}
                      onChange={(e) => handleChange('implementacao', e.target.value)}
                      placeholder="0"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Coluna 2: Resultados */}
          <div className="space-y-6">
            {/* ROI Principal */}
            <section className="glass p-6 border border-[var(--gold)]/30">
              <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Retorno do Investimento
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Economia Mensal</p>
                  <p className="text-2xl font-bold text-green-400">{formatarMoeda(totalEconomiaMensal)}</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Economia Anual</p>
                  <p className="text-2xl font-bold text-green-400">{formatarMoeda(totalEconomiaAnual)}</p>
                </div>
              </div>

              <div className="text-center py-6 border-y border-white/10">
                <p className="text-[var(--gray)] text-sm mb-2">ROI Anual</p>
                <p className="text-5xl font-bold gold-text">{roiPercentual.toFixed(0)}%</p>
                <p className="text-[var(--gray)] text-sm mt-2">
                  Lucro líquido: <span className="text-green-400 font-medium">{formatarMoeda(roiAnual)}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-black/40 rounded-xl p-4 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Payback</p>
                  <p className="text-xl font-bold text-white">
                    {paybackMeses < 1 ? '< 1 mês' : `${paybackMeses.toFixed(1)} meses`}
                  </p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Multiplicador</p>
                  <p className="text-xl font-bold text-[var(--gold)]">
                    {((roiPercentual/100) + 1).toFixed(1)}x
                  </p>
                </div>
              </div>
            </section>

            {/* Breakdown da Economia */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[var(--gold)]" />
                Detalhamento da Economia
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-400" />
                    <span className="text-[var(--gray)] text-sm">Redução perdas estoque</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-medium">{formatarMoeda(economiaEstoque)}</span>
                    <span className="text-[var(--gray)] text-xs ml-2">(-90%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-[var(--gray)] text-sm">Economia de tempo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-medium">{formatarMoeda(economiaHoras)}</span>
                    <span className="text-[var(--gray)] text-xs ml-2">(-80%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-400" />
                    <span className="text-[var(--gray)] text-sm">Recuperação de vendas</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-medium">{formatarMoeda(recuperacaoVendas)}</span>
                    <span className="text-[var(--gray)] text-xs ml-2">(+85%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="text-[var(--gray)] text-sm">Controle de descontos</span>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 font-medium">{formatarMoeda(economiaDescontos)}</span>
                    <span className="text-[var(--gray)] text-xs ml-2">(-95%)</span>
                  </div>
                </div>

                {economiaMultas > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="text-[var(--gray)] text-sm">Eliminação de multas</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-medium">{formatarMoeda(economiaMultas)}</span>
                      <span className="text-[var(--gray)] text-xs ml-2">(-100%)</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Argumento de Venda */}
            <section className="glass p-6 bg-[var(--gold)]/5 border border-[var(--gold)]/20">
              <h2 className="text-[var(--gold)] font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Argumento de Fechamento
              </h2>

              <p className="text-white leading-relaxed">
                "Olha, você está perdendo <strong className="text-red-400">{formatarMoeda(totalPerdasMensais)}</strong> por mês.
                Com o sistema de <strong className="text-[var(--gold)]">{formatarMoeda(investimentoMensal)}</strong>,
                você economiza <strong className="text-green-400">{formatarMoeda(totalEconomiaMensal)}</strong>.
                Ou seja, <strong className="text-white">sobram {formatarMoeda(roiMensal)} no seu bolso todo mês</strong>.
                O sistema se paga {paybackMeses < 1 ? 'no primeiro mês' : `em ${paybackMeses.toFixed(0)} meses`}.
                Faz sentido pra você?"
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Calculadora de ROI - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
