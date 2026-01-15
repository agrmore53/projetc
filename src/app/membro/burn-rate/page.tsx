'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Flame, Copy, Check, TrendingDown } from 'lucide-react'

export default function BurnRatePage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    caixaAtual: 500000,
    receitaMensal: 50000,
    despesasMensais: 80000,
    crescimentoReceita: 10,
    crescimentoDespesas: 5
  })

  // Calculos
  const burnBruto = dados.despesasMensais
  const burnLiquido = dados.despesasMensais - dados.receitaMensal
  const runwayMeses = burnLiquido > 0 ? dados.caixaAtual / burnLiquido : 999

  // Projecao 18 meses
  const projecao = () => {
    const meses = []
    let caixa = dados.caixaAtual
    let receita = dados.receitaMensal
    let despesas = dados.despesasMensais

    for (let mes = 1; mes <= 18; mes++) {
      const burnMes = despesas - receita
      caixa = caixa - burnMes

      meses.push({
        mes,
        receita,
        despesas,
        burn: burnMes,
        caixa: Math.max(0, caixa)
      })

      // Crescimento
      receita = receita * (1 + dados.crescimentoReceita / 100)
      despesas = despesas * (1 + dados.crescimentoDespesas / 100)

      if (caixa <= 0) break
    }

    return meses
  }

  const mesesProjecao = projecao()
  const mesZeroCaixa = mesesProjecao.findIndex(m => m.caixa <= 0) + 1 || null

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const getCorRunway = (meses: number) => {
    if (meses >= 18) return 'text-green-400'
    if (meses >= 12) return 'text-yellow-400'
    if (meses >= 6) return 'text-orange-400'
    return 'text-red-400'
  }

  const gerarRelatorio = () => {
    return `
ANALISE DE BURN RATE E RUNWAY
═══════════════════════════════════════════════════════════════

SITUACAO ATUAL
─────────────────────────────────────────────────────────────
Caixa Atual: ${formatarMoeda(dados.caixaAtual)}
Receita Mensal: ${formatarMoeda(dados.receitaMensal)}
Despesas Mensais: ${formatarMoeda(dados.despesasMensais)}

BURN RATE
─────────────────────────────────────────────────────────────
Burn Bruto: ${formatarMoeda(burnBruto)}/mes
Burn Liquido: ${formatarMoeda(burnLiquido)}/mes
Runway: ${runwayMeses.toFixed(1)} meses

PROJECAO (18 meses)
─────────────────────────────────────────────────────────────
Crescimento Receita: ${dados.crescimentoReceita}%/mes
Crescimento Despesas: ${dados.crescimentoDespesas}%/mes

Mes | Receita      | Despesas     | Burn         | Caixa
${'-'.repeat(65)}
${mesesProjecao.slice(0, 12).map(m =>
  `${m.mes.toString().padStart(3)} | ${formatarMoeda(m.receita).padStart(12)} | ${formatarMoeda(m.despesas).padStart(12)} | ${formatarMoeda(m.burn).padStart(12)} | ${formatarMoeda(m.caixa).padStart(12)}`
).join('\n')}

${mesZeroCaixa ? `⚠ ALERTA: Caixa zero no mes ${mesZeroCaixa}` : '✓ Runway superior a 18 meses'}

RECOMENDACOES
─────────────────────────────────────────────────────────────
• Runway < 6 meses: Acao URGENTE - corte custos ou capte
• Runway 6-12 meses: Inicie processo de captacao
• Runway 12-18 meses: Planeje proxima rodada
• Runway > 18 meses: Foco em crescimento

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
            <Flame className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Burn Rate</span>
          </h1>
          <p className="text-[var(--gray)]">Quanto tempo seu dinheiro vai durar?</p>
        </div>

        {/* Inputs */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados Financeiros</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Caixa Atual (R$)</label>
              <input
                type="number"
                value={dados.caixaAtual}
                onChange={(e) => setDados({ ...dados, caixaAtual: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Receita Mensal (R$)</label>
              <input
                type="number"
                value={dados.receitaMensal}
                onChange={(e) => setDados({ ...dados, receitaMensal: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Despesas Mensais (R$)</label>
              <input
                type="number"
                value={dados.despesasMensais}
                onChange={(e) => setDados({ ...dados, despesasMensais: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Crescimento Receita (%/mes)</label>
              <input
                type="number"
                value={dados.crescimentoReceita}
                onChange={(e) => setDados({ ...dados, crescimentoReceita: Number(e.target.value) })}
                className="input-field"
                step="0.5"
              />
            </div>
            <div>
              <label className="input-label">Crescimento Despesas (%/mes)</label>
              <input
                type="number"
                value={dados.crescimentoDespesas}
                onChange={(e) => setDados({ ...dados, crescimentoDespesas: Number(e.target.value) })}
                className="input-field"
                step="0.5"
              />
            </div>
          </div>
        </div>

        {/* Metricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Burn Bruto</p>
            <p className="font-display text-2xl text-red-400">{formatarMoeda(burnBruto)}</p>
            <p className="text-xs text-[var(--gray)]">por mes</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Burn Liquido</p>
            <p className={`font-display text-2xl ${burnLiquido > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {formatarMoeda(burnLiquido)}
            </p>
            <p className="text-xs text-[var(--gray)]">por mes</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Runway</p>
            <p className={`font-display text-2xl ${getCorRunway(runwayMeses)}`}>
              {runwayMeses >= 99 ? '+99' : runwayMeses.toFixed(1)}
            </p>
            <p className="text-xs text-[var(--gray)]">meses</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Caixa Zero Em</p>
            <p className={`font-display text-2xl ${mesZeroCaixa ? 'text-red-400' : 'text-green-400'}`}>
              {mesZeroCaixa ? `Mes ${mesZeroCaixa}` : '+18m'}
            </p>
          </div>
        </div>

        {/* Grafico de Caixa */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Projecao de Caixa</h2>
          <div className="h-48 flex items-end gap-1">
            {mesesProjecao.map((m) => {
              const altura = (m.caixa / dados.caixaAtual) * 100
              return (
                <div key={m.mes} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t transition-all ${m.caixa > dados.caixaAtual * 0.3 ? 'bg-green-500' : m.caixa > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ height: `${Math.max(altura * 1.8, 4)}px` }}
                  />
                  <span className="text-[10px] mt-1">M{m.mes}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-[var(--gray)] mt-2">
            <span>Hoje: {formatarMoeda(dados.caixaAtual)}</span>
            <span>M12: {formatarMoeda(mesesProjecao[11]?.caixa || 0)}</span>
          </div>
        </div>

        {/* Alerta */}
        {runwayMeses < 12 && (
          <div className={`glass card mb-8 border ${runwayMeses < 6 ? 'border-red-500 bg-red-500/10' : 'border-yellow-500 bg-yellow-500/10'}`}>
            <div className="flex items-center gap-3">
              <TrendingDown className={`w-8 h-8 ${runwayMeses < 6 ? 'text-red-400' : 'text-yellow-400'}`} />
              <div>
                <h3 className={`font-semibold ${runwayMeses < 6 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {runwayMeses < 6 ? 'Runway Critico!' : 'Atencao ao Runway'}
                </h3>
                <p className="text-sm text-[var(--gray)]">
                  {runwayMeses < 6
                    ? 'Tome acoes imediatas: corte custos, acelere receita ou inicie captacao urgente.'
                    : 'Inicie o processo de captacao ou revise seu modelo de custos.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Gestao de Burn Rate</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Para Reduzir Burn</h4>
              <ul className="space-y-1">
                <li>• Renegocie contratos e fornecedores</li>
                <li>• Avalie necessidade de cada despesa</li>
                <li>• Considere modelo remoto/hibrido</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Benchmarks</h4>
              <ul className="space-y-1">
                <li>• Pre-seed: 12-18 meses de runway</li>
                <li>• Seed: 18-24 meses de runway</li>
                <li>• Series A+: 24+ meses de runway</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
