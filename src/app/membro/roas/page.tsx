'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Copy, Check } from 'lucide-react'

export default function ROASPage() {
  const [copied, setCopied] = useState(false)

  const [campanhas, setCampanhas] = useState([
    { nome: 'Facebook - Prospeccao', investimento: 3000, receita: 12000 },
    { nome: 'Google Search', investimento: 2500, receita: 15000 },
    { nome: 'Instagram - Retargeting', investimento: 1500, receita: 9000 },
    { nome: 'LinkedIn Ads', investimento: 2000, receita: 4000 },
  ])

  const [metaROAS, setMetaROAS] = useState(3)

  const calcularROAS = (investimento: number, receita: number) => {
    return investimento > 0 ? receita / investimento : 0
  }

  const totalInvestimento = campanhas.reduce((sum, c) => sum + c.investimento, 0)
  const totalReceita = campanhas.reduce((sum, c) => sum + c.receita, 0)
  const roasGeral = calcularROAS(totalInvestimento, totalReceita)
  const lucroTotal = totalReceita - totalInvestimento

  const adicionarCampanha = () => {
    setCampanhas([...campanhas, { nome: '', investimento: 0, receita: 0 }])
  }

  const atualizarCampanha = (index: number, campo: string, valor: string | number) => {
    setCampanhas(campanhas.map((c, i) => i === index ? { ...c, [campo]: valor } : c))
  }

  const removerCampanha = (index: number) => {
    if (campanhas.length > 1) {
      setCampanhas(campanhas.filter((_, i) => i !== index))
    }
  }

  const formatarMoeda = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const getCorROAS = (roas: number) => {
    if (roas >= metaROAS) return 'text-green-400'
    if (roas >= metaROAS * 0.7) return 'text-yellow-400'
    return 'text-red-400'
  }

  const gerarRelatorio = () => {
    return `
ANALISE DE ROAS POR CAMPANHA
═══════════════════════════════════════════════════════════════

Meta ROAS: ${metaROAS}x

PERFORMANCE POR CAMPANHA
─────────────────────────────────────────────────────────────
${campanhas.filter(c => c.nome).map(c => {
  const roas = calcularROAS(c.investimento, c.receita)
  const status = roas >= metaROAS ? '✓' : '✗'
  return `${status} ${c.nome}
  Investimento: ${formatarMoeda(c.investimento)}
  Receita: ${formatarMoeda(c.receita)}
  ROAS: ${roas.toFixed(2)}x
  Lucro: ${formatarMoeda(c.receita - c.investimento)}`
}).join('\n\n')}

CONSOLIDADO
─────────────────────────────────────────────────────────────
Total Investido: ${formatarMoeda(totalInvestimento)}
Total Receita: ${formatarMoeda(totalReceita)}
ROAS Geral: ${roasGeral.toFixed(2)}x
Lucro Total: ${formatarMoeda(lucroTotal)}

RECOMENDACOES
─────────────────────────────────────────────────────────────
${campanhas.filter(c => calcularROAS(c.investimento, c.receita) >= metaROAS).length > 0
  ? `Escalar: ${campanhas.filter(c => calcularROAS(c.investimento, c.receita) >= metaROAS).map(c => c.nome).join(', ')}`
  : 'Nenhuma campanha acima da meta'}
${campanhas.filter(c => calcularROAS(c.investimento, c.receita) < metaROAS && calcularROAS(c.investimento, c.receita) > 0).length > 0
  ? `Otimizar: ${campanhas.filter(c => calcularROAS(c.investimento, c.receita) < metaROAS && c.receita > 0).map(c => c.nome).join(', ')}`
  : ''}

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
            <TrendingUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">ROAS</span>
          </h1>
          <p className="text-[var(--gray)]">Retorno sobre investimento em anuncios</p>
        </div>

        {/* Meta */}
        <div className="glass card mb-8">
          <div className="flex items-center gap-4">
            <label className="input-label mb-0">Meta de ROAS:</label>
            <input
              type="number"
              value={metaROAS}
              onChange={(e) => setMetaROAS(Number(e.target.value))}
              className="input-field w-20 text-center"
              min="1"
              step="0.5"
            />
            <span className="text-[var(--gray)]">x</span>
          </div>
        </div>

        {/* Campanhas */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Campanhas</h2>
            <button onClick={adicionarCampanha} className="btn-secondary text-xs">+ Adicionar</button>
          </div>
          <div className="space-y-4">
            {campanhas.map((campanha, index) => {
              const roas = calcularROAS(campanha.investimento, campanha.receita)
              return (
                <div key={index} className="bg-black/30 rounded-xl p-4">
                  <div className="grid md:grid-cols-5 gap-3 items-end">
                    <div className="md:col-span-2">
                      <label className="input-label text-xs">Campanha</label>
                      <input
                        type="text"
                        value={campanha.nome}
                        onChange={(e) => atualizarCampanha(index, 'nome', e.target.value)}
                        placeholder="Nome da campanha"
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="input-label text-xs">Investimento</label>
                      <input
                        type="number"
                        value={campanha.investimento}
                        onChange={(e) => atualizarCampanha(index, 'investimento', Number(e.target.value))}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="input-label text-xs">Receita</label>
                      <input
                        type="number"
                        value={campanha.receita}
                        onChange={(e) => atualizarCampanha(index, 'receita', Number(e.target.value))}
                        className="input-field text-sm"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xs text-[var(--gray)]">ROAS</p>
                        <p className={`font-display text-xl ${getCorROAS(roas)}`}>{roas.toFixed(1)}x</p>
                      </div>
                      <button onClick={() => removerCampanha(index)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Consolidado */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Investido</p>
            <p className="font-display text-xl text-red-400">{formatarMoeda(totalInvestimento)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Total Receita</p>
            <p className="font-display text-xl text-green-400">{formatarMoeda(totalReceita)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">ROAS Geral</p>
            <p className={`font-display text-xl ${getCorROAS(roasGeral)}`}>{roasGeral.toFixed(2)}x</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Lucro Total</p>
            <p className={`font-display text-xl ${lucroTotal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatarMoeda(lucroTotal)}</p>
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
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks de ROAS</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">E-commerce</h4>
              <ul className="space-y-1">
                <li>• ROAS minimo: 2x</li>
                <li>• ROAS bom: 3-4x</li>
                <li>• ROAS excelente: 5x+</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">SaaS/B2B</h4>
              <ul className="space-y-1">
                <li>• ROAS minimo: 3x</li>
                <li>• ROAS bom: 5-7x</li>
                <li>• ROAS excelente: 10x+</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Quando Escalar</h4>
              <ul className="space-y-1">
                <li>• ROAS acima da meta por 2 semanas</li>
                <li>• Volume de conversoes estavel</li>
                <li>• Margem ainda saudavel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
