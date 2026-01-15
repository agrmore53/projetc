'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, PieChart, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Competidor {
  id: string
  nome: string
  receita: number
  cor: string
}

export default function MarketSharePage() {
  const [copied, setCopied] = useState(false)

  const [mercado, setMercado] = useState({
    nome: '',
    tamTotal: 1000000000,
    taxaCrescimento: 15
  })

  const cores = ['#D4AF37', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899']

  const [competidores, setCompetidores] = useState<Competidor[]>([
    { id: '1', nome: 'Sua Empresa', receita: 5000000, cor: cores[0] },
    { id: '2', nome: 'Competidor A', receita: 50000000, cor: cores[1] },
    { id: '3', nome: 'Competidor B', receita: 30000000, cor: cores[2] },
    { id: '4', nome: 'Competidor C', receita: 15000000, cor: cores[3] },
  ])

  const adicionarCompetidor = () => {
    setCompetidores([...competidores, {
      id: Date.now().toString(),
      nome: '',
      receita: 0,
      cor: cores[competidores.length % cores.length]
    }])
  }

  const removerCompetidor = (id: string) => {
    if (competidores.length > 1) {
      setCompetidores(competidores.filter(c => c.id !== id))
    }
  }

  const atualizarCompetidor = (id: string, campo: keyof Competidor, valor: string | number) => {
    setCompetidores(competidores.map(c =>
      c.id === id ? { ...c, [campo]: valor } : c
    ))
  }

  // Calculos
  const receitaTotal = competidores.reduce((sum, c) => sum + c.receita, 0)
  const outrosMercado = mercado.tamTotal - receitaTotal

  const calcularShare = (receita: number) => {
    return mercado.tamTotal > 0 ? (receita / mercado.tamTotal) * 100 : 0
  }

  const suaEmpresa = competidores[0]
  const seuShare = calcularShare(suaEmpresa?.receita || 0)

  // Ranking
  const ranking = [...competidores].sort((a, b) => b.receita - a.receita)
  const suaPosicao = ranking.findIndex(c => c.id === '1') + 1

  const formatarMoeda = (valor: number) => {
    if (valor >= 1000000000) return `R$ ${(valor / 1000000000).toFixed(1)}B`
    if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`
    if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}K`
    return `R$ ${valor}`
  }

  const gerarRelatorio = () => {
    return `
ANALISE DE MARKET SHARE
═══════════════════════════════════════════════════════════════
${mercado.nome ? `Mercado: ${mercado.nome}\n` : ''}
TAMANHO DO MERCADO
─────────────────────────────────────────────────────────────
TAM (Total Addressable Market): ${formatarMoeda(mercado.tamTotal)}
Crescimento Anual: ${mercado.taxaCrescimento}%

PARTICIPACAO DE MERCADO
─────────────────────────────────────────────────────────────
${ranking.map((c, i) => `${i + 1}. ${c.nome || 'Sem nome'}: ${formatarMoeda(c.receita)} (${calcularShare(c.receita).toFixed(2)}%)`).join('\n')}

Outros/Fragmentado: ${formatarMoeda(outrosMercado)} (${calcularShare(outrosMercado).toFixed(1)}%)

SUA POSICAO
─────────────────────────────────────────────────────────────
Empresa: ${suaEmpresa?.nome || 'Sua Empresa'}
Receita: ${formatarMoeda(suaEmpresa?.receita || 0)}
Market Share: ${seuShare.toFixed(2)}%
Ranking: ${suaPosicao}o de ${competidores.length}

PROJECAO (mantendo ${mercado.taxaCrescimento}% de crescimento)
─────────────────────────────────────────────────────────────
Mercado em 1 ano: ${formatarMoeda(mercado.tamTotal * (1 + mercado.taxaCrescimento / 100))}
Mercado em 3 anos: ${formatarMoeda(mercado.tamTotal * Math.pow(1 + mercado.taxaCrescimento / 100, 3))}
Mercado em 5 anos: ${formatarMoeda(mercado.tamTotal * Math.pow(1 + mercado.taxaCrescimento / 100, 5))}

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
            <PieChart className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Market Share</span>
          </h1>
          <p className="text-[var(--gray)]">Analise sua participacao no mercado</p>
        </div>

        {/* Mercado */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados do Mercado</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Nome do Mercado</label>
              <input
                type="text"
                value={mercado.nome}
                onChange={(e) => setMercado({ ...mercado, nome: e.target.value })}
                placeholder="Ex: SaaS de RH no Brasil"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">TAM - Tamanho Total (R$)</label>
              <input
                type="number"
                value={mercado.tamTotal}
                onChange={(e) => setMercado({ ...mercado, tamTotal: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Crescimento Anual (%)</label>
              <input
                type="number"
                value={mercado.taxaCrescimento}
                onChange={(e) => setMercado({ ...mercado, taxaCrescimento: Number(e.target.value) })}
                className="input-field"
                step="0.5"
              />
            </div>
          </div>
        </div>

        {/* Competidores */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Competidores</h2>
            <button onClick={adicionarCompetidor} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {competidores.map((comp, index) => (
              <div key={comp.id} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: comp.cor }}
                />
                <input
                  type="text"
                  value={comp.nome}
                  onChange={(e) => atualizarCompetidor(comp.id, 'nome', e.target.value)}
                  placeholder={index === 0 ? 'Sua Empresa' : `Competidor ${index}`}
                  className="input-field text-sm flex-1"
                />
                <input
                  type="number"
                  value={comp.receita}
                  onChange={(e) => atualizarCompetidor(comp.id, 'receita', Number(e.target.value))}
                  placeholder="Receita anual"
                  className="input-field text-sm w-40"
                  min="0"
                />
                <span className="text-sm text-[var(--gray)] w-16 text-right">
                  {calcularShare(comp.receita).toFixed(1)}%
                </span>
                {index > 0 && (
                  <button
                    onClick={() => removerCompetidor(comp.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Metricas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Seu Market Share</p>
            <p className="font-display text-3xl text-[var(--gold)]">{seuShare.toFixed(2)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Sua Posicao</p>
            <p className="font-display text-3xl text-[var(--gold)]">{suaPosicao}o</p>
            <p className="text-xs text-[var(--gray)]">de {competidores.length}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">TAM</p>
            <p className="font-display text-2xl text-[var(--gold)]">{formatarMoeda(mercado.tamTotal)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Mercado Fragmentado</p>
            <p className="font-display text-2xl text-[var(--gray)]">{calcularShare(outrosMercado).toFixed(0)}%</p>
          </div>
        </div>

        {/* Grafico Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Distribuicao de Mercado</h2>
          <div className="flex h-8 rounded-xl overflow-hidden mb-4">
            {competidores.map((comp) => {
              const share = calcularShare(comp.receita)
              if (share < 0.5) return null
              return (
                <div
                  key={comp.id}
                  style={{ width: `${share}%`, backgroundColor: comp.cor }}
                  className="transition-all"
                  title={`${comp.nome}: ${share.toFixed(1)}%`}
                />
              )
            })}
            {outrosMercado > 0 && (
              <div
                style={{ width: `${calcularShare(outrosMercado)}%` }}
                className="bg-gray-600"
                title={`Outros: ${calcularShare(outrosMercado).toFixed(1)}%`}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            {competidores.map((comp) => (
              <div key={comp.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.cor }} />
                <span>{comp.nome || 'Sem nome'}: {calcularShare(comp.receita).toFixed(1)}%</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span>Outros: {calcularShare(outrosMercado).toFixed(1)}%</span>
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
          <h3 className="font-display text-lg gold-text mb-4">Estrategias de Market Share</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Para Ganhar Share</h4>
              <ul className="space-y-1">
                <li>• Foco em nichos mal atendidos</li>
                <li>• Diferenciacao clara de produto</li>
                <li>• Pricing agressivo no inicio</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Benchmarks</h4>
              <ul className="space-y-1">
                <li>• Lider: geralmente 30%+ do mercado</li>
                <li>• Top 3: controlam 60-80% juntos</li>
                <li>• Startup: comecar com 0.1-1%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
