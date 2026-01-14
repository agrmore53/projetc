'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, TrendingDown, AlertTriangle, Calculator, Target, Percent, BarChart3, ArrowRight } from 'lucide-react'

interface Calculo {
  precoOriginal: number
  custoUnitario: number
  desconto: number
  metaMensal: number
}

interface Resultado {
  precoComDesconto: number
  margemOriginal: number
  margemComDesconto: number
  lucroOriginal: number
  lucroComDesconto: number
  perdasLucro: number
  perdasPercentual: number
  vendasExtrasNecessarias: number
  aumentoVendasPercentual: number
  impactoMensal: number
  recomendacao: 'verde' | 'amarelo' | 'vermelho'
}

export default function DescontoPage() {
  const [dados, setDados] = useState<Calculo>({
    precoOriginal: 1000,
    custoUnitario: 300,
    desconto: 10,
    metaMensal: 20,
  })

  const [resultado, setResultado] = useState<Resultado | null>(null)

  useEffect(() => {
    calcular()
  }, [dados])

  const calcular = () => {
    const { precoOriginal, custoUnitario, desconto, metaMensal } = dados

    // Preço com desconto
    const precoComDesconto = precoOriginal * (1 - desconto / 100)

    // Margens
    const margemOriginal = precoOriginal - custoUnitario
    const margemComDesconto = precoComDesconto - custoUnitario

    // Lucros por venda
    const lucroOriginal = margemOriginal
    const lucroComDesconto = margemComDesconto

    // Perdas
    const perdasLucro = lucroOriginal - lucroComDesconto
    const perdasPercentual = (perdasLucro / lucroOriginal) * 100

    // Vendas extras necessárias para compensar
    const lucroMensalOriginal = lucroOriginal * metaMensal
    const vendasNecessariasComDesconto = lucroMensalOriginal / lucroComDesconto
    const vendasExtrasNecessarias = vendasNecessariasComDesconto - metaMensal
    const aumentoVendasPercentual = (vendasExtrasNecessarias / metaMensal) * 100

    // Impacto mensal se mantiver mesmas vendas
    const lucroMensalComDesconto = lucroComDesconto * metaMensal
    const impactoMensal = lucroMensalOriginal - lucroMensalComDesconto

    // Recomendação
    let recomendacao: 'verde' | 'amarelo' | 'vermelho' = 'verde'
    if (aumentoVendasPercentual > 30 || perdasPercentual > 25) {
      recomendacao = 'vermelho'
    } else if (aumentoVendasPercentual > 15 || perdasPercentual > 15) {
      recomendacao = 'amarelo'
    }

    setResultado({
      precoComDesconto,
      margemOriginal,
      margemComDesconto,
      lucroOriginal,
      lucroComDesconto,
      perdasLucro,
      perdasPercentual,
      vendasExtrasNecessarias,
      aumentoVendasPercentual,
      impactoMensal,
      recomendacao,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getRecomendacaoConfig = (rec: string) => {
    switch (rec) {
      case 'verde':
        return { cor: 'text-green-400', bg: 'bg-green-500/20', label: 'Desconto Aceitável', emoji: '✅', desc: 'O aumento de vendas necessário é viável' }
      case 'amarelo':
        return { cor: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Avaliar com Cuidado', emoji: '⚠️', desc: 'Considere reduzir o desconto ou garantir volume' }
      case 'vermelho':
        return { cor: 'text-red-400', bg: 'bg-red-500/20', label: 'Desconto Perigoso', emoji: '🚫', desc: 'Precisa de muito mais vendas para compensar' }
      default:
        return { cor: 'text-white', bg: 'bg-white/20', label: '-', emoji: '', desc: '' }
    }
  }

  const descontosSimulados = [5, 10, 15, 20, 25, 30]

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
            <h1 className="text-3xl font-bold">Calculadora de Desconto</h1>
            <p className="text-white/60">Simule o impacto de descontos na sua margem e lucro</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[var(--gold)]" />
                Dados da Venda
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Preço Original (R$)</label>
                  <input
                    type="number"
                    value={dados.precoOriginal}
                    onChange={(e) => setDados({ ...dados, precoOriginal: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Custo Unitário (R$)</label>
                  <input
                    type="number"
                    value={dados.custoUnitario}
                    onChange={(e) => setDados({ ...dados, custoUnitario: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                  <p className="text-xs text-white/40 mt-1">Quanto custa para você entregar o produto/serviço</p>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Desconto: {dados.desconto}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={dados.desconto}
                    onChange={(e) => setDados({ ...dados, desconto: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>1%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Meta de Vendas/Mês</label>
                  <input
                    type="number"
                    value={dados.metaMensal}
                    onChange={(e) => setDados({ ...dados, metaMensal: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Tabela de Simulação */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--gold)]" />
                Simulação de Descontos
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-2">Desconto</th>
                      <th className="text-right py-2 px-2">Preço</th>
                      <th className="text-right py-2 px-2">Margem</th>
                      <th className="text-right py-2 px-2">+Vendas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {descontosSimulados.map((desc) => {
                      const precoDesc = dados.precoOriginal * (1 - desc / 100)
                      const margemDesc = precoDesc - dados.custoUnitario
                      const margemOrig = dados.precoOriginal - dados.custoUnitario
                      const lucroOrig = margemOrig * dados.metaMensal
                      const vendasNecessarias = margemDesc > 0 ? Math.ceil(lucroOrig / margemDesc) : Infinity
                      const aumentoVendas = ((vendasNecessarias - dados.metaMensal) / dados.metaMensal) * 100
                      const isAtual = desc === dados.desconto

                      return (
                        <tr
                          key={desc}
                          className={`border-b border-white/5 cursor-pointer hover:bg-white/5 ${isAtual ? 'bg-[var(--gold)]/10' : ''}`}
                          onClick={() => setDados({ ...dados, desconto: desc })}
                        >
                          <td className="py-2 px-2">
                            <span className={isAtual ? 'text-[var(--gold)] font-bold' : ''}>
                              {desc}% {isAtual && '←'}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right">{formatCurrency(precoDesc)}</td>
                          <td className={`py-2 px-2 text-right ${margemDesc < margemOrig * 0.5 ? 'text-red-400' : ''}`}>
                            {formatCurrency(margemDesc)}
                          </td>
                          <td className={`py-2 px-2 text-right font-medium ${
                            aumentoVendas > 30 ? 'text-red-400' :
                            aumentoVendas > 15 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            +{aumentoVendas.toFixed(0)}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado && (
              <>
                {/* Status */}
                <div className={`glass rounded-2xl p-6 ${getRecomendacaoConfig(resultado.recomendacao).bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Análise do Desconto</h2>
                    <span className="text-3xl">{getRecomendacaoConfig(resultado.recomendacao).emoji}</span>
                  </div>
                  <p className={`text-2xl font-bold ${getRecomendacaoConfig(resultado.recomendacao).cor}`}>
                    {getRecomendacaoConfig(resultado.recomendacao).label}
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    {getRecomendacaoConfig(resultado.recomendacao).desc}
                  </p>
                </div>

                {/* Comparação */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-[var(--gold)]" />
                    Impacto do Desconto de {dados.desconto}%
                  </h2>

                  <div className="space-y-4">
                    {/* Preço */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-sm text-white/60">Preço</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg line-through text-white/40">
                            {formatCurrency(dados.precoOriginal)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/40" />
                          <span className="text-lg font-bold text-[var(--gold)]">
                            {formatCurrency(resultado.precoComDesconto)}
                          </span>
                        </div>
                      </div>
                      <span className="text-red-400 font-medium">-{dados.desconto}%</span>
                    </div>

                    {/* Margem */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-sm text-white/60">Margem por Venda</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg line-through text-white/40">
                            {formatCurrency(resultado.margemOriginal)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/40" />
                          <span className="text-lg font-bold text-[var(--gold)]">
                            {formatCurrency(resultado.margemComDesconto)}
                          </span>
                        </div>
                      </div>
                      <span className="text-red-400 font-medium">-{resultado.perdasPercentual.toFixed(1)}%</span>
                    </div>

                    {/* Perda por venda */}
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                      <p className="text-sm text-red-400 mb-1">Você perde por venda:</p>
                      <p className="text-2xl font-bold text-red-400">
                        {formatCurrency(resultado.perdasLucro)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vendas Necessárias */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--gold)]" />
                    Para Compensar o Desconto
                  </h2>

                  <div className="text-center py-4">
                    <p className="text-sm text-white/60 mb-2">Vendas extras necessárias:</p>
                    <p className="text-4xl font-bold text-[var(--gold)]">
                      +{resultado.vendasExtrasNecessarias.toFixed(1)}
                    </p>
                    <p className="text-lg text-white/60">
                      (+{resultado.aumentoVendasPercentual.toFixed(1)}% de aumento)
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/60">Meta Original</p>
                        <p className="font-semibold">{dados.metaMensal} vendas</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40" />
                      <div className="text-right">
                        <p className="text-sm text-white/60">Nova Meta</p>
                        <p className="font-semibold text-[var(--gold)]">
                          {Math.ceil(dados.metaMensal + resultado.vendasExtrasNecessarias)} vendas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impacto Mensal */}
                <div className="glass rounded-2xl p-6 border border-red-500/30">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Se Mantiver Mesmas Vendas
                  </h2>

                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-2">Perda mensal de lucro:</p>
                    <p className="text-4xl font-bold text-red-400">
                      -{formatCurrency(resultado.impactoMensal)}
                    </p>
                    <p className="text-sm text-white/50 mt-2">
                      Por ano: {formatCurrency(resultado.impactoMensal * 12)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">💡 Alternativas ao Desconto</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Bônus Extra</h4>
              <p className="text-sm text-white/70">
                Ao invés de desconto, adicione algo de valor (consultoria, suporte extra).
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Parcelamento</h4>
              <p className="text-sm text-white/70">
                Divida em mais parcelas para caber no orçamento sem reduzir preço.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Versão Menor</h4>
              <p className="text-sm text-white/70">
                Ofereça um plano mais básico ao invés de descontar o completo.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Desconto Futuro</h4>
              <p className="text-sm text-white/70">
                Dê crédito para próxima compra ao invés de desconto na atual.
              </p>
            </div>
          </div>
        </div>

        {/* Regras */}
        <div className="mt-6 glass rounded-2xl p-6 border border-[var(--gold)]/30">
          <h3 className="text-xl font-semibold mb-4">📏 Regras de Ouro do Desconto</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-3">✅ Quando DAR desconto:</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Cliente fecha contrato anual (desconto de 10-20%)</li>
                <li>• Volume alto (5+ licenças, quantidade)</li>
                <li>• Case de sucesso (pode usar depoimento)</li>
                <li>• Indicação de cliente atual</li>
                <li>• Pagamento à vista</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-400 mb-3">❌ Quando NÃO dar desconto:</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Cliente só está "testando" seu limite</li>
                <li>• Não tem budget real (não vai fechar de qualquer forma)</li>
                <li>• Desconto acima de 20% (destrói margem)</li>
                <li>• Sem contrapartida (prazo, volume, case)</li>
                <li>• Logo no início da negociação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
