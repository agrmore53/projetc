'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plane, Copy, Check, TrendingUp, TrendingDown, DollarSign, Calendar, AlertTriangle, CheckCircle, Minus, Plus } from 'lucide-react'

interface MesProjecao {
  mes: number
  caixa: number
  receita: number
  custos: number
  burnRate: number
}

export default function RunwayPage() {
  const [copied, setCopied] = useState(false)

  // Inputs principais
  const [caixaAtual, setCaixaAtual] = useState(500000)
  const [receitaMensal, setReceitaMensal] = useState(80000)
  const [custosMensais, setCustosMensais] = useState(120000)

  // Projecoes de crescimento
  const [crescimentoReceita, setCrescimentoReceita] = useState(5) // % ao mes
  const [crescimentoCustos, setCrescimentoCustos] = useState(2) // % ao mes

  // Investimento planejado
  const [investimentoPrevisto, setInvestimentoPrevisto] = useState(0)
  const [mesInvestimento, setMesInvestimento] = useState(3)

  const burnRateAtual = custosMensais - receitaMensal

  const calcularProjecao = (): MesProjecao[] => {
    const projecao: MesProjecao[] = []
    let caixa = caixaAtual
    let receita = receitaMensal
    let custos = custosMensais

    for (let mes = 1; mes <= 24; mes++) {
      // Aplicar crescimento
      if (mes > 1) {
        receita = receita * (1 + crescimentoReceita / 100)
        custos = custos * (1 + crescimentoCustos / 100)
      }

      // Adicionar investimento se for o mes
      if (mes === mesInvestimento && investimentoPrevisto > 0) {
        caixa += investimentoPrevisto
      }

      const burnRate = custos - receita
      caixa = caixa - burnRate

      projecao.push({
        mes,
        caixa: Math.round(caixa),
        receita: Math.round(receita),
        custos: Math.round(custos),
        burnRate: Math.round(burnRate)
      })

      // Parar se caixa ficar muito negativo
      if (caixa < -1000000) break
    }

    return projecao
  }

  const projecao = calcularProjecao()

  const runwayMeses = projecao.findIndex(p => p.caixa <= 0)
  const runway = runwayMeses === -1 ? 24 : runwayMeses

  const breakEvenMes = projecao.findIndex(p => p.burnRate <= 0)

  const getCorRunway = () => {
    if (runway >= 18) return '#22c55e'
    if (runway >= 12) return '#eab308'
    if (runway >= 6) return '#f97316'
    return '#ef4444'
  }

  const getStatusRunway = () => {
    if (runway >= 18) return { label: 'Saudavel', desc: 'Runway confortavel para crescimento' }
    if (runway >= 12) return { label: 'Atencao', desc: 'Considere levantar capital ou reduzir custos' }
    if (runway >= 6) return { label: 'Alerta', desc: 'Urgente: busque investimento ou corte custos' }
    return { label: 'Critico', desc: 'Acao imediata necessaria!' }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const copiarAnalise = () => {
    const status = getStatusRunway()
    const texto = `
═══════════════════════════════════════════════════════════════
                  ANALISE DE RUNWAY
═══════════════════════════════════════════════════════════════

SITUACAO ATUAL
───────────────────────────────────────────────────────────────
Caixa Atual: ${formatCurrency(caixaAtual)}
Receita Mensal: ${formatCurrency(receitaMensal)}
Custos Mensais: ${formatCurrency(custosMensais)}
Burn Rate: ${formatCurrency(burnRateAtual)}/mes

PROJECOES
───────────────────────────────────────────────────────────────
Crescimento Receita: ${crescimentoReceita}% ao mes
Crescimento Custos: ${crescimentoCustos}% ao mes
${investimentoPrevisto > 0 ? `Investimento Previsto: ${formatCurrency(investimentoPrevisto)} no mes ${mesInvestimento}` : ''}

RESULTADO
───────────────────────────────────────────────────────────────
Runway: ${runway} meses
Status: ${status.label}
${status.desc}

${breakEvenMes > 0 ? `Break-even projetado: Mes ${breakEvenMes}` : breakEvenMes === 0 ? 'Ja esta no break-even!' : 'Break-even nao alcancado em 24 meses'}

PROJECAO MENSAL (Proximos 12 meses)
───────────────────────────────────────────────────────────────
${projecao.slice(0, 12).map(p =>
  `Mes ${p.mes}: Caixa ${formatCurrency(p.caixa)} | Burn ${formatCurrency(p.burnRate)}`
).join('\n')}

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

      <div className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Runway</span>
          </h1>
          <p className="text-[var(--gray)]">Quanto tempo seu dinheiro vai durar?</p>
        </div>

        {/* Status Principal */}
        <div className="glass card mb-8 text-center" style={{ borderColor: getCorRunway(), borderWidth: 2 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            {runway >= 12 ? (
              <CheckCircle className="w-8 h-8" style={{ color: getCorRunway() }} />
            ) : (
              <AlertTriangle className="w-8 h-8" style={{ color: getCorRunway() }} />
            )}
            <div>
              <p className="text-sm text-[var(--gray)]">Seu Runway</p>
              <p className="font-display text-5xl" style={{ color: getCorRunway() }}>
                {runway}+ meses
              </p>
            </div>
          </div>
          <p className="font-semibold" style={{ color: getCorRunway() }}>{getStatusRunway().label}</p>
          <p className="text-sm text-[var(--gray)]">{getStatusRunway().desc}</p>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Situacao Atual */}
          <div className="glass card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[var(--gold)]" />
              Situacao Atual
            </h2>

            <div className="space-y-4">
              <div>
                <label className="input-label">Caixa Atual (R$)</label>
                <input
                  type="number"
                  value={caixaAtual}
                  onChange={(e) => setCaixaAtual(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Receita Mensal (R$)</label>
                <input
                  type="number"
                  value={receitaMensal}
                  onChange={(e) => setReceitaMensal(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="input-label">Custos Mensais (R$)</label>
                <input
                  type="number"
                  value={custosMensais}
                  onChange={(e) => setCustosMensais(Number(e.target.value))}
                  className="input-field"
                />
              </div>

              <div className="bg-black/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--gray)]">Burn Rate Atual</span>
                  <span className={`font-display text-xl ${burnRateAtual > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {burnRateAtual > 0 ? '-' : '+'}{formatCurrency(Math.abs(burnRateAtual))}/mes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Projecoes */}
          <div className="glass card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
              Projecoes de Crescimento
            </h2>

            <div className="space-y-4">
              <div>
                <label className="input-label flex justify-between">
                  <span>Crescimento Receita (% ao mes)</span>
                  <span className="text-green-400">+{crescimentoReceita}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={crescimentoReceita}
                  onChange={(e) => setCrescimentoReceita(Number(e.target.value))}
                  className="w-full accent-green-400"
                />
              </div>
              <div>
                <label className="input-label flex justify-between">
                  <span>Crescimento Custos (% ao mes)</span>
                  <span className="text-red-400">+{crescimentoCustos}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={crescimentoCustos}
                  onChange={(e) => setCrescimentoCustos(Number(e.target.value))}
                  className="w-full accent-red-400"
                />
              </div>

              <hr className="border-white/10" />

              <div>
                <label className="input-label">Investimento Previsto (R$)</label>
                <input
                  type="number"
                  value={investimentoPrevisto}
                  onChange={(e) => setInvestimentoPrevisto(Number(e.target.value))}
                  className="input-field"
                  placeholder="0"
                />
              </div>
              {investimentoPrevisto > 0 && (
                <div>
                  <label className="input-label">Mes do Investimento</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={mesInvestimento}
                    onChange={(e) => setMesInvestimento(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grafico Visual */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--gold)]" />
              Projecao de Caixa (24 meses)
            </h2>
            <button onClick={copiarAnalise} className="btn-primary text-sm flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          {/* Barra visual do runway */}
          <div className="mb-6">
            <div className="flex gap-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const mes = projecao[i]
                let cor = '#22c55e'
                if (!mes || mes.caixa <= 0) cor = '#ef4444'
                else if (mes.caixa < caixaAtual * 0.3) cor = '#f97316'
                else if (mes.caixa < caixaAtual * 0.6) cor = '#eab308'

                return (
                  <div
                    key={i}
                    className="flex-1 h-8 rounded transition-all hover:opacity-80"
                    style={{ backgroundColor: cor }}
                    title={mes ? `Mes ${i + 1}: ${formatCurrency(mes.caixa)}` : `Mes ${i + 1}: Sem caixa`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-[var(--gray)] mt-1">
              <span>Mes 1</span>
              <span>Mes 12</span>
              <span>Mes 24</span>
            </div>
          </div>

          {/* Tabela de projecao */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 text-left text-[var(--gray)]">Mes</th>
                  <th className="py-2 text-right text-[var(--gray)]">Receita</th>
                  <th className="py-2 text-right text-[var(--gray)]">Custos</th>
                  <th className="py-2 text-right text-[var(--gray)]">Burn Rate</th>
                  <th className="py-2 text-right text-[var(--gray)]">Caixa</th>
                </tr>
              </thead>
              <tbody>
                {projecao.slice(0, 12).map((p, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2">
                      Mes {p.mes}
                      {p.mes === mesInvestimento && investimentoPrevisto > 0 && (
                        <span className="text-[var(--gold)] text-xs ml-2">+Invest</span>
                      )}
                      {breakEvenMes === i && (
                        <span className="text-green-400 text-xs ml-2">Break-even!</span>
                      )}
                    </td>
                    <td className="py-2 text-right text-green-400">{formatCurrency(p.receita)}</td>
                    <td className="py-2 text-right text-red-400">{formatCurrency(p.custos)}</td>
                    <td className={`py-2 text-right ${p.burnRate > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {p.burnRate > 0 ? '-' : '+'}{formatCurrency(Math.abs(p.burnRate))}
                    </td>
                    <td className={`py-2 text-right font-semibold ${p.caixa > 0 ? 'text-white' : 'text-red-400'}`}>
                      {formatCurrency(p.caixa)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metricas Chave */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)] mb-1">Runway Simples</p>
            <p className="font-display text-2xl text-[var(--gold)]">
              {burnRateAtual > 0 ? Math.floor(caixaAtual / burnRateAtual) : '∞'} meses
            </p>
            <p className="text-xs text-[var(--gray)]">Caixa / Burn Rate atual</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)] mb-1">Break-even</p>
            <p className="font-display text-2xl" style={{ color: breakEvenMes >= 0 ? '#22c55e' : '#ef4444' }}>
              {breakEvenMes === 0 ? 'Agora!' : breakEvenMes > 0 ? `Mes ${breakEvenMes}` : 'Nao alcanca'}
            </p>
            <p className="text-xs text-[var(--gray)]">Quando receita = custos</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)] mb-1">Caixa em 12 meses</p>
            <p className={`font-display text-2xl ${projecao[11]?.caixa > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {projecao[11] ? formatCurrency(projecao[11].caixa) : 'N/A'}
            </p>
            <p className="text-xs text-[var(--gray)]">Projecao com crescimento</p>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks de Runway</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Pre-Seed / Seed</h4>
              <p>Ideal: 18-24 meses de runway. Permite pivotar se necessario e levantar proxima rodada com calma.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Series A+</h4>
              <p>Ideal: 18-24 meses. Comece a levantar com 9-12 meses restantes.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Zona de Perigo</h4>
              <p>Menos de 6 meses sem plano de captacao e critico. Acao imediata: cortar custos ou buscar bridge.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Default Alive</h4>
              <p>Se o crescimento atual continuar, voce atingira break-even antes do caixa acabar?</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
