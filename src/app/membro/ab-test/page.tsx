'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FlaskConical, Copy, Check, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function ABTestPage() {
  const [copied, setCopied] = useState(false)

  const [teste, setTeste] = useState({
    nomeVarianteA: 'Controle (A)',
    nomeVarianteB: 'Variante (B)',
    visitantesA: 5000,
    conversoesA: 150,
    visitantesB: 5000,
    conversoesB: 195,
    confiancaDesejada: 95
  })

  // Calculos
  const taxaA = teste.visitantesA > 0 ? (teste.conversoesA / teste.visitantesA) * 100 : 0
  const taxaB = teste.visitantesB > 0 ? (teste.conversoesB / teste.visitantesB) * 100 : 0
  const uplift = taxaA > 0 ? ((taxaB - taxaA) / taxaA) * 100 : 0

  // Calculo de significancia estatistica (simplificado)
  const calcularSignificancia = () => {
    const n1 = teste.visitantesA
    const n2 = teste.visitantesB
    const p1 = teste.conversoesA / n1
    const p2 = teste.conversoesB / n2

    if (n1 === 0 || n2 === 0) return { zScore: 0, pValue: 1, significante: false }

    const pPool = (teste.conversoesA + teste.conversoesB) / (n1 + n2)
    const se = Math.sqrt(pPool * (1 - pPool) * (1/n1 + 1/n2))

    if (se === 0) return { zScore: 0, pValue: 1, significante: false }

    const zScore = (p2 - p1) / se

    // Aproximacao do p-value usando distribuicao normal
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))

    const nivelConfianca = teste.confiancaDesejada / 100
    const significante = pValue < (1 - nivelConfianca)

    return { zScore, pValue, significante }
  }

  // Funcao CDF normal padrao (aproximacao)
  const normalCDF = (x: number) => {
    const a1 =  0.254829592
    const a2 = -0.284496736
    const a3 =  1.421413741
    const a4 = -1.453152027
    const a5 =  1.061405429
    const p  =  0.3275911

    const sign = x < 0 ? -1 : 1
    x = Math.abs(x) / Math.sqrt(2)

    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return 0.5 * (1.0 + sign * y)
  }

  const resultado = calcularSignificancia()
  const confiancaAtual = (1 - resultado.pValue) * 100

  // Tamanho de amostra necessario
  const calcularAmostraNecessaria = () => {
    const alpha = 1 - (teste.confiancaDesejada / 100)
    const beta = 0.2 // 80% poder estatistico
    const p1 = taxaA / 100
    const p2 = taxaB / 100

    if (p1 === 0 || p2 === 0 || p1 === p2) return 0

    const zAlpha = 1.96 // para 95% confianca
    const zBeta = 0.84 // para 80% poder

    const pBar = (p1 + p2) / 2
    const n = (2 * pBar * (1 - pBar) * Math.pow(zAlpha + zBeta, 2)) / Math.pow(p2 - p1, 2)

    return Math.ceil(n)
  }

  const amostraNecessaria = calcularAmostraNecessaria()
  const amostraAtual = Math.min(teste.visitantesA, teste.visitantesB)
  const progressoAmostra = amostraNecessaria > 0 ? Math.min((amostraAtual / amostraNecessaria) * 100, 100) : 0

  const vencedor = resultado.significante
    ? (taxaB > taxaA ? teste.nomeVarianteB : teste.nomeVarianteA)
    : 'Inconclusivo'

  const copiarResultado = () => {
    const texto = `
RESULTADO DO TESTE A/B
═══════════════════════════════════════════════════════════════

VARIANTES
─────────────────────────────────────────────────────────────
${teste.nomeVarianteA}:
  Visitantes: ${teste.visitantesA.toLocaleString('pt-BR')}
  Conversoes: ${teste.conversoesA.toLocaleString('pt-BR')}
  Taxa: ${taxaA.toFixed(2)}%

${teste.nomeVarianteB}:
  Visitantes: ${teste.visitantesB.toLocaleString('pt-BR')}
  Conversoes: ${teste.conversoesB.toLocaleString('pt-BR')}
  Taxa: ${taxaB.toFixed(2)}%

ANALISE
─────────────────────────────────────────────────────────────
Uplift: ${uplift > 0 ? '+' : ''}${uplift.toFixed(1)}%
Confianca: ${confiancaAtual.toFixed(1)}%
Significancia: ${resultado.significante ? 'SIM' : 'NAO'}

CONCLUSAO
─────────────────────────────────────────────────────────────
${resultado.significante
  ? `VENCEDOR: ${vencedor}
A variante ${vencedor} teve performance ${Math.abs(uplift).toFixed(1)}% ${uplift > 0 ? 'melhor' : 'pior'} com ${confiancaAtual.toFixed(1)}% de confianca.
Recomendacao: Implementar a variante vencedora.`
  : `INCONCLUSIVO
O teste ainda nao atingiu significancia estatistica.
Amostra necessaria: ~${amostraNecessaria.toLocaleString('pt-BR')} por variante
Continue o teste ate atingir a amostra necessaria.`}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
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
            <FlaskConical className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora <span className="gold-text">A/B Test</span>
          </h1>
          <p className="text-[var(--gray)]">Analise resultados com significancia estatistica</p>
        </div>

        {/* Input de Dados */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Variante A */}
          <div className="glass card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">A</span>
              </div>
              <input
                type="text"
                value={teste.nomeVarianteA}
                onChange={(e) => setTeste({ ...teste, nomeVarianteA: e.target.value })}
                className="input-field font-semibold"
                placeholder="Controle"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="input-label">Visitantes</label>
                <input
                  type="number"
                  value={teste.visitantesA}
                  onChange={(e) => setTeste({ ...teste, visitantesA: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
              <div>
                <label className="input-label">Conversoes</label>
                <input
                  type="number"
                  value={teste.conversoesA}
                  onChange={(e) => setTeste({ ...teste, conversoesA: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
              <div className="bg-blue-500/10 rounded-xl p-4 text-center">
                <p className="text-sm text-[var(--gray)]">Taxa de Conversao</p>
                <p className="font-display text-3xl text-blue-400">{taxaA.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          {/* Variante B */}
          <div className="glass card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">B</span>
              </div>
              <input
                type="text"
                value={teste.nomeVarianteB}
                onChange={(e) => setTeste({ ...teste, nomeVarianteB: e.target.value })}
                className="input-field font-semibold"
                placeholder="Variante"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="input-label">Visitantes</label>
                <input
                  type="number"
                  value={teste.visitantesB}
                  onChange={(e) => setTeste({ ...teste, visitantesB: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
              <div>
                <label className="input-label">Conversoes</label>
                <input
                  type="number"
                  value={teste.conversoesB}
                  onChange={(e) => setTeste({ ...teste, conversoesB: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                />
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 text-center">
                <p className="text-sm text-[var(--gray)]">Taxa de Conversao</p>
                <p className="font-display text-3xl text-green-400">{taxaB.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuracao de Confianca */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <label className="input-label">Nivel de Confianca Desejado</label>
              <p className="text-xs text-[var(--gray)]">Padrao: 95% (recomendado para maioria dos testes)</p>
            </div>
            <select
              value={teste.confiancaDesejada}
              onChange={(e) => setTeste({ ...teste, confiancaDesejada: Number(e.target.value) })}
              className="input-field w-32"
            >
              <option value={90}>90%</option>
              <option value={95}>95%</option>
              <option value={99}>99%</option>
            </select>
          </div>
        </div>

        {/* Resultado Principal */}
        <div className={`glass card mb-8 border-2 ${
          resultado.significante
            ? 'border-green-500/50 bg-green-500/5'
            : 'border-yellow-500/50 bg-yellow-500/5'
        }`}>
          <div className="text-center">
            {resultado.significante ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h2 className="font-display text-2xl text-green-400 mb-2">Resultado Significativo!</h2>
                <p className="text-lg mb-4">
                  <span className="text-[var(--gold)] font-semibold">{vencedor}</span> e o vencedor
                </p>
              </>
            ) : (
              <>
                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h2 className="font-display text-2xl text-yellow-400 mb-2">Resultado Inconclusivo</h2>
                <p className="text-[var(--gray)] mb-4">Continue o teste para atingir significancia estatistica</p>
              </>
            )}

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-xs text-[var(--gray)]">Uplift</p>
                <p className={`font-display text-2xl ${uplift > 0 ? 'text-green-400' : uplift < 0 ? 'text-red-400' : ''}`}>
                  {uplift > 0 ? '+' : ''}{uplift.toFixed(1)}%
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-xs text-[var(--gray)]">Confianca Atual</p>
                <p className="font-display text-2xl text-[var(--gold)]">{confiancaAtual.toFixed(1)}%</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-xs text-[var(--gray)]">p-value</p>
                <p className="font-display text-2xl">{resultado.pValue.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso da Amostra */}
        {!resultado.significante && amostraNecessaria > 0 && (
          <div className="glass card mb-8">
            <h2 className="font-display text-lg mb-4">Progresso do Teste</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Amostra Atual: {amostraAtual.toLocaleString('pt-BR')}</span>
                <span>Necessaria: ~{amostraNecessaria.toLocaleString('pt-BR')}</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--gold)] transition-all"
                  style={{ width: `${progressoAmostra}%` }}
                />
              </div>
              <p className="text-xs text-[var(--gray)] mt-2">
                {progressoAmostra < 100
                  ? `Faltam aproximadamente ${(amostraNecessaria - amostraAtual).toLocaleString('pt-BR')} visitantes por variante`
                  : 'Amostra suficiente, mas resultado ainda nao significativo'
                }
              </p>
            </div>
          </div>
        )}

        {/* Comparativo Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Comparativo Visual</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-400">{teste.nomeVarianteA}</span>
                <span>{taxaA.toFixed(2)}%</span>
              </div>
              <div className="h-8 bg-white/10 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(taxaA * 5, 100)}%` }}
                >
                  {taxaA > 2 && <span className="text-xs font-semibold">{teste.conversoesA}</span>}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">{teste.nomeVarianteB}</span>
                <span>{taxaB.toFixed(2)}%</span>
              </div>
              <div className="h-8 bg-white/10 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(taxaB * 5, 100)}%` }}
                >
                  {taxaB > 2 && <span className="text-xs font-semibold">{teste.conversoesB}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarResultado} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Resultado'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de A/B Testing</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Antes de Comecar</h4>
              <ul className="space-y-1">
                <li>• Defina hipotese clara antes do teste</li>
                <li>• Calcule tamanho de amostra necessario</li>
                <li>• Teste apenas UMA variavel por vez</li>
                <li>• Defina duracao minima do teste</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Durante o Teste</h4>
              <ul className="space-y-1">
                <li>• Nao pare o teste antes de atingir significancia</li>
                <li>• Evite "espiar" resultados frequentemente</li>
                <li>• Mantenha distribuicao 50/50 do trafego</li>
                <li>• Rode por pelo menos 1-2 ciclos de compra</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
