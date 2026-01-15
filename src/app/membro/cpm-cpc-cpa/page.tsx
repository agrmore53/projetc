'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MousePointer, Copy, Check } from 'lucide-react'

export default function CPMCPCCPAPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    investimento: 5000,
    impressoes: 500000,
    cliques: 5000,
    conversoes: 100,
    receitaTotal: 15000
  })

  // Calculos
  const cpm = dados.impressoes > 0 ? (dados.investimento / dados.impressoes) * 1000 : 0
  const cpc = dados.cliques > 0 ? dados.investimento / dados.cliques : 0
  const cpa = dados.conversoes > 0 ? dados.investimento / dados.conversoes : 0
  const ctr = dados.impressoes > 0 ? (dados.cliques / dados.impressoes) * 100 : 0
  const taxaConversao = dados.cliques > 0 ? (dados.conversoes / dados.cliques) * 100 : 0
  const roas = dados.investimento > 0 ? dados.receitaTotal / dados.investimento : 0
  const lucro = dados.receitaTotal - dados.investimento
  const roi = dados.investimento > 0 ? (lucro / dados.investimento) * 100 : 0

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getCorMetrica = (metrica: string, valor: number) => {
    switch (metrica) {
      case 'ctr':
        return valor >= 2 ? 'text-green-400' : valor >= 1 ? 'text-yellow-400' : 'text-red-400'
      case 'conversao':
        return valor >= 3 ? 'text-green-400' : valor >= 1 ? 'text-yellow-400' : 'text-red-400'
      case 'roas':
        return valor >= 4 ? 'text-green-400' : valor >= 2 ? 'text-yellow-400' : 'text-red-400'
      default:
        return 'text-[var(--gold)]'
    }
  }

  const gerarRelatorio = () => {
    return `
CALCULADORA DE METRICAS DE ANUNCIOS
═══════════════════════════════════════════════════════════════

DADOS DA CAMPANHA
─────────────────────────────────────────────────────────────
Investimento: ${formatarMoeda(dados.investimento)}
Impressoes: ${dados.impressoes.toLocaleString()}
Cliques: ${dados.cliques.toLocaleString()}
Conversoes: ${dados.conversoes}
Receita: ${formatarMoeda(dados.receitaTotal)}

METRICAS DE CUSTO
─────────────────────────────────────────────────────────────
CPM (Custo por Mil Impressoes): ${formatarMoeda(cpm)}
CPC (Custo por Clique): ${formatarMoeda(cpc)}
CPA (Custo por Aquisicao): ${formatarMoeda(cpa)}

METRICAS DE PERFORMANCE
─────────────────────────────────────────────────────────────
CTR (Taxa de Cliques): ${ctr.toFixed(2)}%
Taxa de Conversao: ${taxaConversao.toFixed(2)}%
ROAS: ${roas.toFixed(2)}x

RESULTADO FINANCEIRO
─────────────────────────────────────────────────────────────
Receita: ${formatarMoeda(dados.receitaTotal)}
Investimento: ${formatarMoeda(dados.investimento)}
Lucro: ${formatarMoeda(lucro)}
ROI: ${roi.toFixed(0)}%

BENCHMARKS
─────────────────────────────────────────────────────────────
CTR Facebook/Instagram: 0.9% - 1.5%
CTR Google Search: 2% - 5%
CTR Google Display: 0.5% - 1%
ROAS Saudavel: > 3x
CPA ideal: < 30% do ticket medio

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

      <div className="max-w-4xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MousePointer className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora <span className="gold-text">CPM/CPC/CPA</span>
          </h1>
          <p className="text-[var(--gray)]">Metricas de performance de anuncios</p>
        </div>

        {/* Inputs */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados da Campanha</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Investimento (R$)</label>
              <input
                type="number"
                value={dados.investimento}
                onChange={(e) => setDados({ ...dados, investimento: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Impressoes</label>
              <input
                type="number"
                value={dados.impressoes}
                onChange={(e) => setDados({ ...dados, impressoes: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Cliques</label>
              <input
                type="number"
                value={dados.cliques}
                onChange={(e) => setDados({ ...dados, cliques: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Conversoes</label>
              <input
                type="number"
                value={dados.conversoes}
                onChange={(e) => setDados({ ...dados, conversoes: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Receita Total (R$)</label>
              <input
                type="number"
                value={dados.receitaTotal}
                onChange={(e) => setDados({ ...dados, receitaTotal: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Metricas de Custo */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">CPM</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(cpm)}</p>
            <p className="text-xs text-[var(--gray)]">por 1.000 impressoes</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">CPC</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(cpc)}</p>
            <p className="text-xs text-[var(--gray)]">por clique</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">CPA</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(cpa)}</p>
            <p className="text-xs text-[var(--gray)]">por conversao</p>
          </div>
        </div>

        {/* Metricas de Performance */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">CTR</p>
            <p className={`font-display text-2xl ${getCorMetrica('ctr', ctr)}`}>{ctr.toFixed(2)}%</p>
            <p className="text-xs text-[var(--gray)]">taxa de cliques</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Taxa Conversao</p>
            <p className={`font-display text-2xl ${getCorMetrica('conversao', taxaConversao)}`}>{taxaConversao.toFixed(2)}%</p>
            <p className="text-xs text-[var(--gray)]">cliques → vendas</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">ROAS</p>
            <p className={`font-display text-2xl ${getCorMetrica('roas', roas)}`}>{roas.toFixed(2)}x</p>
            <p className="text-xs text-[var(--gray)]">retorno sobre ads</p>
          </div>
        </div>

        {/* Resultado */}
        <div className={`glass card mb-8 border ${lucro >= 0 ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
          <h2 className="font-display text-lg mb-4">Resultado Financeiro</h2>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-[var(--gray)]">Receita</p>
              <p className="font-display text-xl text-green-400">{formatarMoeda(dados.receitaTotal)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gray)]">Investimento</p>
              <p className="font-display text-xl text-red-400">{formatarMoeda(dados.investimento)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gray)]">Lucro</p>
              <p className={`font-display text-xl ${lucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatarMoeda(lucro)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gray)]">ROI</p>
              <p className={`font-display text-xl ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{roi.toFixed(0)}%</p>
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

        {/* Benchmarks */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks por Plataforma</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Facebook/Instagram</h4>
              <ul className="space-y-1">
                <li>• CTR: 0.9% - 1.5%</li>
                <li>• CPM: R$ 15 - R$ 40</li>
                <li>• CPC: R$ 1 - R$ 3</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Google Search</h4>
              <ul className="space-y-1">
                <li>• CTR: 2% - 5%</li>
                <li>• CPC: R$ 2 - R$ 10</li>
                <li>• Conversao: 3% - 5%</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">LinkedIn</h4>
              <ul className="space-y-1">
                <li>• CTR: 0.4% - 0.6%</li>
                <li>• CPM: R$ 50 - R$ 100</li>
                <li>• CPC: R$ 10 - R$ 30</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
