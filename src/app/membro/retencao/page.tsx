'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingDown, Copy, Check, Calculator } from 'lucide-react'

export default function RetencaoPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    usuariosIniciais: 1000,
    churnMensal: 5,
    ticketMedio: 100,
    custoAquisicao: 200,
    mesesProjecao: 24
  })

  // Calculos
  const retencaoMensal = 100 - dados.churnMensal
  const retencaoAnual = Math.pow(retencaoMensal / 100, 12) * 100

  // Projecao de usuarios
  const projetarUsuarios = () => {
    const projecao = []
    let usuarios = dados.usuariosIniciais

    for (let mes = 0; mes <= dados.mesesProjecao; mes++) {
      const receitaMes = usuarios * dados.ticketMedio
      projecao.push({
        mes,
        usuarios: Math.round(usuarios),
        receita: receitaMes,
        churnados: Math.round(usuarios * (dados.churnMensal / 100))
      })
      usuarios = usuarios * (retencaoMensal / 100)
    }

    return projecao
  }

  const projecao = projetarUsuarios()

  // Lifetime Value
  const ltv = dados.churnMensal > 0
    ? dados.ticketMedio / (dados.churnMensal / 100)
    : dados.ticketMedio * 100

  const ltvCacRatio = ltv / dados.custoAquisicao

  // Meses de vida media
  const vidaMediaMeses = dados.churnMensal > 0 ? 1 / (dados.churnMensal / 100) : 100

  // Receita total perdida por churn
  const receitaPerdida = projecao.reduce((sum, p) => sum + (p.churnados * dados.ticketMedio * vidaMediaMeses), 0)

  // Meses para recuperar CAC
  const mesesPayback = dados.ticketMedio > 0 ? dados.custoAquisicao / dados.ticketMedio : 0

  const getCorChurn = (churn: number) => {
    if (churn <= 3) return '#22c55e'
    if (churn <= 5) return '#eab308'
    if (churn <= 8) return '#f97316'
    return '#ef4444'
  }

  const copiarAnalise = () => {
    const texto = `
ANALISE DE RETENCAO E CHURN
═══════════════════════════════════════════════════════════════

METRICAS ATUAIS
─────────────────────────────────────────────────────────────
Churn Mensal: ${dados.churnMensal}%
Retencao Mensal: ${retencaoMensal}%
Retencao Anual: ${retencaoAnual.toFixed(1)}%
Vida Media do Cliente: ${vidaMediaMeses.toFixed(1)} meses

UNIT ECONOMICS
─────────────────────────────────────────────────────────────
Ticket Medio: R$ ${dados.ticketMedio}
CAC: R$ ${dados.custoAquisicao}
LTV: R$ ${ltv.toFixed(0)}
LTV:CAC Ratio: ${ltvCacRatio.toFixed(1)}x
Payback: ${mesesPayback.toFixed(1)} meses

PROJECAO (${dados.mesesProjecao} meses)
─────────────────────────────────────────────────────────────
Usuarios Iniciais: ${dados.usuariosIniciais}
Usuarios em ${dados.mesesProjecao}m: ${projecao[projecao.length - 1].usuarios}
Perda Total: ${dados.usuariosIniciais - projecao[projecao.length - 1].usuarios} usuarios

IMPACTO FINANCEIRO DO CHURN
─────────────────────────────────────────────────────────────
Se reduzir churn em 1pp (${dados.churnMensal}% → ${dados.churnMensal - 1}%):
- Novo LTV: R$ ${(dados.ticketMedio / ((dados.churnMensal - 1) / 100)).toFixed(0)}
- Ganho por cliente: R$ ${((dados.ticketMedio / ((dados.churnMensal - 1) / 100)) - ltv).toFixed(0)}

BENCHMARK
─────────────────────────────────────────────────────────────
Churn Mensal SaaS B2B: 2-5% (ideal < 3%)
LTV:CAC Ratio: > 3x (saudavel)
Payback: < 12 meses (ideal < 6)

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
            <TrendingDown className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Curva de <span className="gold-text">Retencao</span>
          </h1>
          <p className="text-[var(--gray)]">Visualize o impacto do churn no seu negocio</p>
        </div>

        {/* Inputs */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados do Negocio</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Usuarios Iniciais</label>
              <input
                type="number"
                value={dados.usuariosIniciais}
                onChange={(e) => setDados({ ...dados, usuariosIniciais: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <label className="input-label">Churn Mensal (%)</label>
              <input
                type="number"
                value={dados.churnMensal}
                onChange={(e) => setDados({ ...dados, churnMensal: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
                step="0.5"
              />
            </div>
            <div>
              <label className="input-label">Ticket Medio (R$)</label>
              <input
                type="number"
                value={dados.ticketMedio}
                onChange={(e) => setDados({ ...dados, ticketMedio: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">CAC (R$)</label>
              <input
                type="number"
                value={dados.custoAquisicao}
                onChange={(e) => setDados({ ...dados, custoAquisicao: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Projecao (meses)</label>
              <input
                type="number"
                value={dados.mesesProjecao}
                onChange={(e) => setDados({ ...dados, mesesProjecao: Number(e.target.value) })}
                className="input-field"
                min="6"
                max="60"
              />
            </div>
          </div>
        </div>

        {/* Metricas Principais */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Churn Mensal</p>
            <p className="font-display text-3xl" style={{ color: getCorChurn(dados.churnMensal) }}>
              {dados.churnMensal}%
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Retencao Anual</p>
            <p className="font-display text-3xl text-[var(--gold)]">{retencaoAnual.toFixed(0)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Vida Media</p>
            <p className="font-display text-3xl text-[var(--gold)]">{vidaMediaMeses.toFixed(0)}m</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">LTV</p>
            <p className="font-display text-3xl text-green-400">R$ {ltv.toFixed(0)}</p>
          </div>
        </div>

        {/* Unit Economics */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--gold)]" />
            Unit Economics
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <p className="text-sm text-[var(--gray)]">LTV:CAC Ratio</p>
              <p className={`font-display text-3xl ${ltvCacRatio >= 3 ? 'text-green-400' : ltvCacRatio >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                {ltvCacRatio.toFixed(1)}x
              </p>
              <p className="text-xs text-[var(--gray)]">Meta: {'>'} 3x</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <p className="text-sm text-[var(--gray)]">Payback</p>
              <p className={`font-display text-3xl ${mesesPayback <= 6 ? 'text-green-400' : mesesPayback <= 12 ? 'text-yellow-400' : 'text-red-400'}`}>
                {mesesPayback.toFixed(1)}m
              </p>
              <p className="text-xs text-[var(--gray)]">Meta: {'<'} 12 meses</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <p className="text-sm text-[var(--gray)]">Lucro por Cliente</p>
              <p className={`font-display text-3xl ${ltv - dados.custoAquisicao > 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {(ltv - dados.custoAquisicao).toFixed(0)}
              </p>
              <p className="text-xs text-[var(--gray)]">LTV - CAC</p>
            </div>
          </div>
        </div>

        {/* Grafico de Curva */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Curva de Retencao</h2>
          <div className="h-48 flex items-end gap-1">
            {projecao.filter((_, i) => i % Math.ceil(projecao.length / 24) === 0).map((p, i) => {
              const altura = (p.usuarios / dados.usuariosIniciais) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[var(--gold)] rounded-t transition-all"
                    style={{ height: `${altura * 1.8}px`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] mt-1">M{p.mes}</span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-[var(--gray)] mt-2">
            <span>{dados.usuariosIniciais} usuarios</span>
            <span>→</span>
            <span>{projecao[projecao.length - 1].usuarios} usuarios</span>
          </div>
        </div>

        {/* Simulador de Reducao */}
        <div className="glass card mb-8 border border-green-500/30 bg-green-500/5">
          <h2 className="font-display text-lg mb-4 text-green-400">Impacto de Reduzir Churn em 1%</h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-[var(--gray)]">Novo Churn</p>
              <p className="font-display text-2xl">{Math.max(0, dados.churnMensal - 1)}%</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Novo LTV</p>
              <p className="font-display text-2xl text-green-400">
                R$ {dados.churnMensal > 1 ? (dados.ticketMedio / ((dados.churnMensal - 1) / 100)).toFixed(0) : '∞'}
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Ganho por Cliente</p>
              <p className="font-display text-2xl text-green-400">
                +R$ {dados.churnMensal > 1 ? ((dados.ticketMedio / ((dados.churnMensal - 1) / 100)) - ltv).toFixed(0) : '∞'}
              </p>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarAnalise} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Analise'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Reduzir Churn</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Onboarding</h4>
              <ul className="space-y-1">
                <li>• Primeiro valor em menos de 24h</li>
                <li>• Checklist de ativacao</li>
                <li>• Acompanhamento personalizado</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Engajamento</h4>
              <ul className="space-y-1">
                <li>• Health Score para identificar risco</li>
                <li>• Playbooks de reativacao</li>
                <li>• Comunicacao proativa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
