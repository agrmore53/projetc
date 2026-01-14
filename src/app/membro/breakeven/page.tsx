'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, DollarSign, Target, AlertTriangle, CheckCircle, Calculator } from 'lucide-react'

export default function BreakevenPage() {
  const [custoFixo, setCustoFixo] = useState(10000)
  const [precoVenda, setPrecoVenda] = useState(500)
  const [custoVariavel, setCustoVariavel] = useState(100)
  const [vendasAtuais, setVendasAtuais] = useState(30)

  const [resultados, setResultados] = useState({
    margemContribuicao: 0,
    percentualMargem: 0,
    pontoEquilibrio: 0,
    faturamentoEquilibrio: 0,
    vendasFaltam: 0,
    lucroAtual: 0,
    status: 'neutro' as 'lucro' | 'prejuizo' | 'neutro'
  })

  useEffect(() => {
    calcular()
  }, [custoFixo, precoVenda, custoVariavel, vendasAtuais])

  const calcular = () => {
    // Margem de contribuição por unidade
    const margemContribuicao = precoVenda - custoVariavel

    // Percentual de margem
    const percentualMargem = precoVenda > 0 ? (margemContribuicao / precoVenda) * 100 : 0

    // Ponto de equilíbrio em unidades
    const pontoEquilibrio = margemContribuicao > 0 ? Math.ceil(custoFixo / margemContribuicao) : 0

    // Faturamento necessário para break-even
    const faturamentoEquilibrio = pontoEquilibrio * precoVenda

    // Vendas que faltam
    const vendasFaltam = Math.max(0, pontoEquilibrio - vendasAtuais)

    // Lucro/Prejuízo atual
    const receitaAtual = vendasAtuais * precoVenda
    const custoTotalAtual = custoFixo + (vendasAtuais * custoVariavel)
    const lucroAtual = receitaAtual - custoTotalAtual

    // Status
    let status: 'lucro' | 'prejuizo' | 'neutro' = 'neutro'
    if (lucroAtual > 0) status = 'lucro'
    else if (lucroAtual < 0) status = 'prejuizo'

    setResultados({
      margemContribuicao,
      percentualMargem,
      pontoEquilibrio,
      faturamentoEquilibrio,
      vendasFaltam,
      lucroAtual,
      status
    })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  // Dados para o gráfico
  const maxVendas = Math.max(resultados.pontoEquilibrio * 1.5, vendasAtuais * 1.2, 50)
  const pontosGrafico = Array.from({ length: 11 }, (_, i) => {
    const vendas = Math.round((maxVendas / 10) * i)
    const receita = vendas * precoVenda
    const custoTotal = custoFixo + (vendas * custoVariavel)
    return { vendas, receita, custoTotal }
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
            <TrendingUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Break-even</span>
          </h1>
          <p className="text-[var(--gray)]">Descubra quantas vendas você precisa para cobrir todos os custos</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="glass card">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[var(--gold)]" />
              Dados do Negócio
            </h2>

            <div className="space-y-6">
              <div>
                <label className="input-label flex justify-between">
                  <span>Custos Fixos Mensais</span>
                  <span className="text-[var(--gold)]">{formatCurrency(custoFixo)}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={custoFixo}
                  onChange={(e) => setCustoFixo(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <p className="text-xs text-[var(--gray)] mt-1">Aluguel, salários, software, etc.</p>
              </div>

              <div>
                <label className="input-label flex justify-between">
                  <span>Preço de Venda (unitário)</span>
                  <span className="text-[var(--gold)]">{formatCurrency(precoVenda)}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={precoVenda}
                  onChange={(e) => setPrecoVenda(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <p className="text-xs text-[var(--gray)] mt-1">Quanto você cobra por venda</p>
              </div>

              <div>
                <label className="input-label flex justify-between">
                  <span>Custo Variável (unitário)</span>
                  <span className="text-[var(--gold)]">{formatCurrency(custoVariavel)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={precoVenda * 0.9}
                  step="5"
                  value={custoVariavel}
                  onChange={(e) => setCustoVariavel(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <p className="text-xs text-[var(--gray)] mt-1">Custo por venda (comissão, taxa, entrega)</p>
              </div>

              <div>
                <label className="input-label flex justify-between">
                  <span>Vendas Atuais (mês)</span>
                  <span className="text-[var(--gold)]">{vendasAtuais} unidades</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="1"
                  value={vendasAtuais}
                  onChange={(e) => setVendasAtuais(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <p className="text-xs text-[var(--gray)] mt-1">Quantas vendas você faz por mês</p>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {/* Status Principal */}
            <div className={`glass card border-2 ${
              resultados.status === 'lucro' ? 'border-green-500' :
              resultados.status === 'prejuizo' ? 'border-red-500' :
              'border-[var(--gold)]'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Situação Atual</h3>
                {resultados.status === 'lucro' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : resultados.status === 'prejuizo' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : (
                  <Target className="w-6 h-6 text-[var(--gold)]" />
                )}
              </div>

              <div className={`text-4xl font-display mb-2 ${
                resultados.status === 'lucro' ? 'text-green-400' :
                resultados.status === 'prejuizo' ? 'text-red-400' :
                'gold-text'
              }`}>
                {formatCurrency(resultados.lucroAtual)}
              </div>
              <p className="text-[var(--gray)]">
                {resultados.status === 'lucro' ? 'Lucro mensal' :
                 resultados.status === 'prejuizo' ? 'Prejuízo mensal' :
                 'No ponto de equilíbrio'}
              </p>
            </div>

            {/* Ponto de Equilíbrio */}
            <div className="glass card">
              <h3 className="font-display text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Ponto de Equilíbrio
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <p className="text-3xl font-display gold-text">{resultados.pontoEquilibrio}</p>
                  <p className="text-sm text-[var(--gray)]">vendas/mês</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-center">
                  <p className="text-3xl font-display gold-text">{formatCurrency(resultados.faturamentoEquilibrio)}</p>
                  <p className="text-sm text-[var(--gray)]">faturamento</p>
                </div>
              </div>

              {resultados.vendasFaltam > 0 && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <p className="text-yellow-400 font-semibold">
                    Faltam {resultados.vendasFaltam} vendas para atingir o break-even
                  </p>
                  <p className="text-sm text-[var(--gray)] mt-1">
                    Você precisa vender mais {formatCurrency(resultados.vendasFaltam * precoVenda)} para cobrir os custos
                  </p>
                </div>
              )}

              {resultados.vendasFaltam === 0 && resultados.status === 'lucro' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 font-semibold">
                    Você está {vendasAtuais - resultados.pontoEquilibrio} vendas acima do break-even!
                  </p>
                  <p className="text-sm text-[var(--gray)] mt-1">
                    Cada venda adicional gera {formatCurrency(resultados.margemContribuicao)} de lucro
                  </p>
                </div>
              )}
            </div>

            {/* Métricas */}
            <div className="glass card">
              <h3 className="font-display text-lg mb-4">Métricas</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[var(--gray)]">Margem de Contribuição</span>
                  <span className="font-display text-[var(--gold)]">
                    {formatCurrency(resultados.margemContribuicao)} ({resultados.percentualMargem.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[var(--gray)]">Receita Atual</span>
                  <span className="font-display">{formatCurrency(vendasAtuais * precoVenda)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-[var(--gray)]">Custos Totais</span>
                  <span className="font-display">{formatCurrency(custoFixo + (vendasAtuais * custoVariavel))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Vendas/dia para break-even</span>
                  <span className="font-display text-[var(--gold)]">
                    {(resultados.pontoEquilibrio / 30).toFixed(1)} vendas/dia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico Simplificado */}
        <div className="glass card mt-8">
          <h3 className="font-display text-lg mb-6">Gráfico de Break-even</h3>

          <div className="relative h-64 bg-black/30 rounded-xl p-4">
            {/* Eixo Y */}
            <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-between text-xs text-[var(--gray)] py-4">
              <span>{formatCurrency(Math.max(...pontosGrafico.map(p => Math.max(p.receita, p.custoTotal))))}</span>
              <span>{formatCurrency(Math.max(...pontosGrafico.map(p => Math.max(p.receita, p.custoTotal))) / 2)}</span>
              <span>R$ 0</span>
            </div>

            {/* Área do Gráfico */}
            <div className="ml-20 h-full relative">
              {/* Linha de Custo Total */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  points={pontosGrafico.map((p, i) => {
                    const x = (i / 10) * 100 + '%'
                    const maxY = Math.max(...pontosGrafico.map(p => Math.max(p.receita, p.custoTotal)))
                    const y = ((1 - p.custoTotal / maxY) * 100) + '%'
                    return `${(i / 10) * 100}%,${(1 - p.custoTotal / maxY) * 100}%`
                  }).join(' ')}
                />
                {/* Linha de Receita */}
                <polyline
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  points={pontosGrafico.map((p, i) => {
                    const maxY = Math.max(...pontosGrafico.map(p => Math.max(p.receita, p.custoTotal)))
                    return `${(i / 10) * 100}%,${(1 - p.receita / maxY) * 100}%`
                  }).join(' ')}
                />
                {/* Ponto de Break-even */}
                {resultados.pontoEquilibrio <= maxVendas && (
                  <line
                    x1={`${(resultados.pontoEquilibrio / maxVendas) * 100}%`}
                    y1="0%"
                    x2={`${(resultados.pontoEquilibrio / maxVendas) * 100}%`}
                    y2="100%"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                )}
              </svg>

              {/* Posição Atual */}
              <div
                className="absolute w-3 h-3 bg-green-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(vendasAtuais / maxVendas) * 100}%`,
                  top: `${(1 - (vendasAtuais * precoVenda) / Math.max(...pontosGrafico.map(p => Math.max(p.receita, p.custoTotal)))) * 100}%`
                }}
              />
            </div>

            {/* Eixo X */}
            <div className="absolute bottom-0 left-20 right-0 flex justify-between text-xs text-[var(--gray)] pt-2">
              <span>0</span>
              <span>{Math.round(maxVendas / 2)}</span>
              <span>{Math.round(maxVendas)} vendas</span>
            </div>
          </div>

          {/* Legenda */}
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[var(--gold)]" />
              <span className="text-sm text-[var(--gray)]">Receita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-red-500" />
              <span className="text-sm text-[var(--gray)]">Custo Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-[var(--gray)]">Você está aqui</span>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-3">💡 Como Reduzir o Ponto de Equilíbrio</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Aumentar Preço</h4>
              <p>Se você aumentar o preço em 10%, o break-even cai {Math.round((1 - resultados.pontoEquilibrio / (custoFixo / ((precoVenda * 1.1) - custoVariavel))) * 100)}%</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Reduzir Custo Variável</h4>
              <p>Negocie melhores taxas, comissões e fornecedores para aumentar sua margem</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Cortar Custo Fixo</h4>
              <p>Revise assinaturas, renegocie aluguel e otimize equipe</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
