'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Grid3X3, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Feature {
  id: string
  nome: string
  impacto: number // 1-5
  esforco: number // 1-5
  prioridade: string
}

export default function MatrizFeaturesPage() {
  const [copied, setCopied] = useState(false)

  const [features, setFeatures] = useState<Feature[]>([
    { id: '1', nome: 'Login com redes sociais', impacto: 4, esforco: 2, prioridade: '' },
    { id: '2', nome: 'Dashboard analytics', impacto: 5, esforco: 4, prioridade: '' },
    { id: '3', nome: 'Notificacoes push', impacto: 3, esforco: 3, prioridade: '' },
    { id: '4', nome: 'Modo escuro', impacto: 2, esforco: 1, prioridade: '' },
    { id: '5', nome: 'API publica', impacto: 4, esforco: 5, prioridade: '' },
  ])

  const calcularPrioridade = (impacto: number, esforco: number): string => {
    const score = impacto / esforco
    if (impacto >= 4 && esforco <= 2) return 'Quick Win'
    if (impacto >= 4 && esforco >= 4) return 'Grande Aposta'
    if (impacto <= 2 && esforco <= 2) return 'Nice to Have'
    if (impacto <= 2 && esforco >= 4) return 'Evitar'
    if (score >= 1.5) return 'Alta'
    if (score >= 0.8) return 'Media'
    return 'Baixa'
  }

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case 'Quick Win': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Grande Aposta': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Alta': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Media': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Baixa': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'Nice to Have': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'Evitar': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-white/10 text-white border-white/20'
    }
  }

  const adicionarFeature = () => {
    setFeatures([...features, {
      id: Date.now().toString(),
      nome: '',
      impacto: 3,
      esforco: 3,
      prioridade: ''
    }])
  }

  const removerFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const atualizarFeature = (id: string, campo: keyof Feature, valor: string | number) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [campo]: valor } : f))
  }

  const featuresComPrioridade = features.map(f => ({
    ...f,
    prioridadeCalc: calcularPrioridade(f.impacto, f.esforco),
    score: f.impacto / f.esforco
  })).sort((a, b) => b.score - a.score)

  const quickWins = featuresComPrioridade.filter(f => f.prioridadeCalc === 'Quick Win')
  const grandesApostas = featuresComPrioridade.filter(f => f.prioridadeCalc === 'Grande Aposta')
  const niceToHave = featuresComPrioridade.filter(f => f.prioridadeCalc === 'Nice to Have')
  const evitar = featuresComPrioridade.filter(f => f.prioridadeCalc === 'Evitar')

  const gerarMatriz = () => {
    return `
MATRIZ DE PRIORIZACAO DE FEATURES
═══════════════════════════════════════════════════════════════

LEGENDA
─────────────────────────────────────────────────────────────
Impacto: 1 (Baixo) a 5 (Alto)
Esforco: 1 (Pouco) a 5 (Muito)
Score = Impacto / Esforco

QUADRANTE 1: QUICK WINS (Alto Impacto, Baixo Esforco)
─────────────────────────────────────────────────────────────
${quickWins.length > 0 ? quickWins.map(f => `✓ ${f.nome} (${f.impacto}/${f.esforco} = ${f.score.toFixed(2)})`).join('\n') : 'Nenhuma feature neste quadrante'}

QUADRANTE 2: GRANDES APOSTAS (Alto Impacto, Alto Esforco)
─────────────────────────────────────────────────────────────
${grandesApostas.length > 0 ? grandesApostas.map(f => `○ ${f.nome} (${f.impacto}/${f.esforco} = ${f.score.toFixed(2)})`).join('\n') : 'Nenhuma feature neste quadrante'}

QUADRANTE 3: NICE TO HAVE (Baixo Impacto, Baixo Esforco)
─────────────────────────────────────────────────────────────
${niceToHave.length > 0 ? niceToHave.map(f => `- ${f.nome} (${f.impacto}/${f.esforco} = ${f.score.toFixed(2)})`).join('\n') : 'Nenhuma feature neste quadrante'}

QUADRANTE 4: EVITAR (Baixo Impacto, Alto Esforco)
─────────────────────────────────────────────────────────────
${evitar.length > 0 ? evitar.map(f => `✗ ${f.nome} (${f.impacto}/${f.esforco} = ${f.score.toFixed(2)})`).join('\n') : 'Nenhuma feature neste quadrante'}

RANKING COMPLETO POR SCORE
─────────────────────────────────────────────────────────────
${featuresComPrioridade.map((f, i) => `${i + 1}. ${f.nome} - Score: ${f.score.toFixed(2)} (${f.prioridadeCalc})`).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarMatriz = () => {
    navigator.clipboard.writeText(gerarMatriz())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Matriz de <span className="gold-text">Features</span>
          </h1>
          <p className="text-[var(--gray)]">Priorize features por impacto vs esforco</p>
        </div>

        {/* Quadrantes Visuais */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass card border border-green-500/30 bg-green-500/5">
            <h3 className="font-display text-green-400 mb-2">Quick Wins</h3>
            <p className="text-xs text-[var(--gray)] mb-3">Alto impacto, baixo esforco</p>
            <div className="space-y-1">
              {quickWins.map(f => (
                <div key={f.id} className="text-sm bg-green-500/10 rounded px-2 py-1">{f.nome}</div>
              ))}
              {quickWins.length === 0 && <p className="text-xs text-[var(--gray)]">Nenhuma</p>}
            </div>
          </div>
          <div className="glass card border border-blue-500/30 bg-blue-500/5">
            <h3 className="font-display text-blue-400 mb-2">Grandes Apostas</h3>
            <p className="text-xs text-[var(--gray)] mb-3">Alto impacto, alto esforco</p>
            <div className="space-y-1">
              {grandesApostas.map(f => (
                <div key={f.id} className="text-sm bg-blue-500/10 rounded px-2 py-1">{f.nome}</div>
              ))}
              {grandesApostas.length === 0 && <p className="text-xs text-[var(--gray)]">Nenhuma</p>}
            </div>
          </div>
          <div className="glass card border border-gray-500/30 bg-gray-500/5">
            <h3 className="font-display text-gray-400 mb-2">Nice to Have</h3>
            <p className="text-xs text-[var(--gray)] mb-3">Baixo impacto, baixo esforco</p>
            <div className="space-y-1">
              {niceToHave.map(f => (
                <div key={f.id} className="text-sm bg-gray-500/10 rounded px-2 py-1">{f.nome}</div>
              ))}
              {niceToHave.length === 0 && <p className="text-xs text-[var(--gray)]">Nenhuma</p>}
            </div>
          </div>
          <div className="glass card border border-red-500/30 bg-red-500/5">
            <h3 className="font-display text-red-400 mb-2">Evitar</h3>
            <p className="text-xs text-[var(--gray)] mb-3">Baixo impacto, alto esforco</p>
            <div className="space-y-1">
              {evitar.map(f => (
                <div key={f.id} className="text-sm bg-red-500/10 rounded px-2 py-1">{f.nome}</div>
              ))}
              {evitar.length === 0 && <p className="text-xs text-[var(--gray)]">Nenhuma</p>}
            </div>
          </div>
        </div>

        {/* Lista de Features */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-lg">Features ({features.length})</h2>
          <button onClick={adicionarFeature} className="btn-secondary text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Adicionar
          </button>
        </div>

        <div className="glass card mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-xs text-[var(--gray)]">Feature</th>
                <th className="text-center p-3 text-xs text-[var(--gray)]">Impacto (1-5)</th>
                <th className="text-center p-3 text-xs text-[var(--gray)]">Esforco (1-5)</th>
                <th className="text-center p-3 text-xs text-[var(--gray)]">Score</th>
                <th className="text-center p-3 text-xs text-[var(--gray)]">Prioridade</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {featuresComPrioridade.map(feature => (
                <tr key={feature.id} className="border-b border-white/5">
                  <td className="p-2">
                    <input
                      type="text"
                      value={feature.nome}
                      onChange={(e) => atualizarFeature(feature.id, 'nome', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Nome da feature"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feature.impacto}
                      onChange={(e) => atualizarFeature(feature.id, 'impacto', Number(e.target.value))}
                      className="w-20"
                    />
                    <span className="ml-2">{feature.impacto}</span>
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={feature.esforco}
                      onChange={(e) => atualizarFeature(feature.id, 'esforco', Number(e.target.value))}
                      className="w-20"
                    />
                    <span className="ml-2">{feature.esforco}</span>
                  </td>
                  <td className="p-2 text-center font-display text-[var(--gold)]">
                    {feature.score.toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs border ${getCorPrioridade(feature.prioridadeCalc)}`}>
                      {feature.prioridadeCalc}
                    </span>
                  </td>
                  <td className="p-2">
                    <button onClick={() => removerFeature(feature.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarMatriz} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Matriz'}
          </button>
        </div>

        {/* Legenda */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Usar</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Impacto (1-5)</h4>
              <ul className="space-y-1">
                <li>• 5: Transformacional</li>
                <li>• 4: Alto valor para usuario</li>
                <li>• 3: Valor moderado</li>
                <li>• 2: Pequena melhoria</li>
                <li>• 1: Impacto minimo</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Esforco (1-5)</h4>
              <ul className="space-y-1">
                <li>• 1: Algumas horas</li>
                <li>• 2: Alguns dias</li>
                <li>• 3: 1-2 semanas</li>
                <li>• 4: 1 mes</li>
                <li>• 5: Varios meses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
