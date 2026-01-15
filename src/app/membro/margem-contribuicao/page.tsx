'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Produto {
  id: string
  nome: string
  precoVenda: number
  custoVariavel: number
  unidadesVendidas: number
}

export default function MargemContribuicaoPage() {
  const [copied, setCopied] = useState(false)

  const [custosFixos, setCustosFixos] = useState(10000)

  const [produtos, setProdutos] = useState<Produto[]>([
    { id: '1', nome: 'Produto A', precoVenda: 100, custoVariavel: 40, unidadesVendidas: 200 },
    { id: '2', nome: 'Produto B', precoVenda: 150, custoVariavel: 70, unidadesVendidas: 100 },
    { id: '3', nome: 'Produto C', precoVenda: 80, custoVariavel: 30, unidadesVendidas: 150 },
  ])

  const adicionarProduto = () => {
    setProdutos([...produtos, {
      id: Date.now().toString(),
      nome: '',
      precoVenda: 0,
      custoVariavel: 0,
      unidadesVendidas: 0
    }])
  }

  const removerProduto = (id: string) => {
    if (produtos.length > 1) {
      setProdutos(produtos.filter(p => p.id !== id))
    }
  }

  const atualizarProduto = (id: string, campo: keyof Produto, valor: string | number) => {
    setProdutos(produtos.map(p =>
      p.id === id ? { ...p, [campo]: valor } : p
    ))
  }

  // Calculos por produto
  const calcularProduto = (p: Produto) => {
    const margemUnitaria = p.precoVenda - p.custoVariavel
    const margemPercentual = p.precoVenda > 0 ? (margemUnitaria / p.precoVenda) * 100 : 0
    const margemTotal = margemUnitaria * p.unidadesVendidas
    const receitaTotal = p.precoVenda * p.unidadesVendidas
    return { margemUnitaria, margemPercentual, margemTotal, receitaTotal }
  }

  // Totais
  const totais = produtos.reduce((acc, p) => {
    const calc = calcularProduto(p)
    return {
      receitaTotal: acc.receitaTotal + calc.receitaTotal,
      custoVariavelTotal: acc.custoVariavelTotal + (p.custoVariavel * p.unidadesVendidas),
      margemContribuicaoTotal: acc.margemContribuicaoTotal + calc.margemTotal,
      unidadesTotais: acc.unidadesTotais + p.unidadesVendidas
    }
  }, { receitaTotal: 0, custoVariavelTotal: 0, margemContribuicaoTotal: 0, unidadesTotais: 0 })

  const margemContribuicaoPercentual = totais.receitaTotal > 0
    ? (totais.margemContribuicaoTotal / totais.receitaTotal) * 100
    : 0

  const lucroOperacional = totais.margemContribuicaoTotal - custosFixos
  const pontoEquilibrio = margemContribuicaoPercentual > 0
    ? custosFixos / (margemContribuicaoPercentual / 100)
    : 0

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
ANALISE DE MARGEM DE CONTRIBUICAO
═══════════════════════════════════════════════════════════════

MARGEM POR PRODUTO
─────────────────────────────────────────────────────────────
${produtos.filter(p => p.nome).map(p => {
  const calc = calcularProduto(p)
  return `${p.nome}:
  Preco de Venda: ${formatarMoeda(p.precoVenda)}
  Custo Variavel: ${formatarMoeda(p.custoVariavel)}
  Margem Unitaria: ${formatarMoeda(calc.margemUnitaria)} (${calc.margemPercentual.toFixed(1)}%)
  Unidades Vendidas: ${p.unidadesVendidas}
  Margem Total: ${formatarMoeda(calc.margemTotal)}`
}).join('\n\n')}

RESUMO GERAL
─────────────────────────────────────────────────────────────
Receita Total: ${formatarMoeda(totais.receitaTotal)}
(-) Custos Variaveis: ${formatarMoeda(totais.custoVariavelTotal)}
(=) Margem de Contribuicao: ${formatarMoeda(totais.margemContribuicaoTotal)} (${margemContribuicaoPercentual.toFixed(1)}%)
(-) Custos Fixos: ${formatarMoeda(custosFixos)}
(=) Lucro Operacional: ${formatarMoeda(lucroOperacional)}

PONTO DE EQUILIBRIO
─────────────────────────────────────────────────────────────
Receita necessaria: ${formatarMoeda(pontoEquilibrio)}
Margem de seguranca: ${((totais.receitaTotal - pontoEquilibrio) / totais.receitaTotal * 100).toFixed(1)}%

INTERPRETACAO
─────────────────────────────────────────────────────────────
• Margem > 40%: Excelente poder de precificacao
• Margem 25-40%: Saudavel para maioria dos negocios
• Margem < 25%: Avaliar reducao de custos ou aumento de preco

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarRelatorio = () => {
    navigator.clipboard.writeText(gerarRelatorio())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <Calculator className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Margem de <span className="gold-text">Contribuicao</span>
          </h1>
          <p className="text-[var(--gray)]">Analise a rentabilidade de cada produto</p>
        </div>

        {/* Custos Fixos */}
        <div className="glass card mb-8">
          <label className="input-label">Custos Fixos Mensais (R$)</label>
          <input
            type="number"
            value={custosFixos}
            onChange={(e) => setCustosFixos(Number(e.target.value))}
            className="input-field max-w-xs"
            min="0"
          />
          <p className="text-xs text-[var(--gray)] mt-2">Aluguel, salarios, sistemas, etc.</p>
        </div>

        {/* Produtos */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Produtos / Servicos</h2>
            <button onClick={adicionarProduto} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {produtos.map((produto, index) => {
              const calc = calcularProduto(produto)
              return (
                <div key={produto.id} className="bg-black/30 rounded-xl p-4">
                  <div className="grid md:grid-cols-6 gap-3 items-end">
                    <div className="md:col-span-2">
                      <label className="input-label text-xs">Nome</label>
                      <input
                        type="text"
                        value={produto.nome}
                        onChange={(e) => atualizarProduto(produto.id, 'nome', e.target.value)}
                        placeholder={`Produto ${index + 1}`}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="input-label text-xs">Preco Venda</label>
                      <input
                        type="number"
                        value={produto.precoVenda}
                        onChange={(e) => atualizarProduto(produto.id, 'precoVenda', Number(e.target.value))}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="input-label text-xs">Custo Variavel</label>
                      <input
                        type="number"
                        value={produto.custoVariavel}
                        onChange={(e) => atualizarProduto(produto.id, 'custoVariavel', Number(e.target.value))}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="input-label text-xs">Unidades</label>
                      <input
                        type="number"
                        value={produto.unidadesVendidas}
                        onChange={(e) => atualizarProduto(produto.id, 'unidadesVendidas', Number(e.target.value))}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-center flex-1">
                        <p className="text-xs text-[var(--gray)]">Margem</p>
                        <p className={`font-semibold ${calc.margemPercentual >= 40 ? 'text-green-400' : calc.margemPercentual >= 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {calc.margemPercentual.toFixed(0)}%
                        </p>
                      </div>
                      <button
                        onClick={() => removerProduto(produto.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Metricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Receita Total</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(totais.receitaTotal)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Margem Contribuicao</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(totais.margemContribuicaoTotal)}</p>
            <p className="text-xs text-[var(--gray)]">{margemContribuicaoPercentual.toFixed(1)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Lucro Operacional</p>
            <p className={`font-display text-2xl ${lucroOperacional >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatarMoeda(lucroOperacional)}
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Ponto Equilibrio</p>
            <p className="font-display text-2xl text-yellow-400">{formatarMoeda(pontoEquilibrio)}</p>
          </div>
        </div>

        {/* DRE Simplificado */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">DRE Simplificado</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span>Receita Total</span>
              <span className="font-semibold">{formatarMoeda(totais.receitaTotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-red-400">
              <span>(-) Custos Variaveis</span>
              <span>{formatarMoeda(totais.custoVariavelTotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[var(--gold)] font-semibold">
              <span>(=) Margem de Contribuicao</span>
              <span>{formatarMoeda(totais.margemContribuicaoTotal)} ({margemContribuicaoPercentual.toFixed(1)}%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-red-400">
              <span>(-) Custos Fixos</span>
              <span>{formatarMoeda(custosFixos)}</span>
            </div>
            <div className={`flex justify-between py-2 font-bold text-lg ${lucroOperacional >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <span>(=) Lucro Operacional</span>
              <span>{formatarMoeda(lucroOperacional)}</span>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Sobre Margem de Contribuicao</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">O que e</h4>
              <ul className="space-y-1">
                <li>• Preco de Venda - Custo Variavel</li>
                <li>• Quanto sobra para cobrir custos fixos</li>
                <li>• Base para decisoes de mix de produtos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Como usar</h4>
              <ul className="space-y-1">
                <li>• Priorize produtos com maior margem %</li>
                <li>• Avalie viabilidade de descontos</li>
                <li>• Calcule ponto de equilibrio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
