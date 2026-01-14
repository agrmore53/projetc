'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileBarChart, Copy, Check, TrendingUp, TrendingDown, Minus, DollarSign, Users, Target, AlertTriangle, CheckCircle } from 'lucide-react'

interface Metrica {
  nome: string
  valorAtual: number
  valorAnterior: number
  meta: number
  unidade: string
}

export default function RelatorioPage() {
  const [copied, setCopied] = useState(false)
  const [mes, setMes] = useState(new Date().toLocaleString('pt-BR', { month: 'long' }))
  const [ano, setAno] = useState(new Date().getFullYear())
  const [empresa, setEmpresa] = useState('')

  const [metricas, setMetricas] = useState<Metrica[]>([
    { nome: 'MRR', valorAtual: 50000, valorAnterior: 45000, meta: 55000, unidade: 'R$' },
    { nome: 'Novos Clientes', valorAtual: 25, valorAnterior: 20, meta: 30, unidade: '' },
    { nome: 'Churn Rate', valorAtual: 3.5, valorAnterior: 4.2, meta: 3, unidade: '%' },
    { nome: 'NPS', valorAtual: 72, valorAnterior: 68, meta: 75, unidade: '' },
    { nome: 'Ticket Medio', valorAtual: 450, valorAnterior: 420, meta: 500, unidade: 'R$' },
  ])

  const [highlights, setHighlights] = useState([
    'Crescimento de 11% no MRR comparado ao mes anterior',
    'Reducao significativa no churn rate',
    'Lancamento do novo modulo de relatorios'
  ])

  const [desafios, setDesafios] = useState([
    'Time de vendas abaixo da meta de novos clientes',
    'Atrasos no roadmap de produto'
  ])

  const [proximosPassos, setProximosPassos] = useState([
    'Contratar mais 2 SDRs',
    'Lancar campanha de Black Friday',
    'Finalizar integracao com Salesforce'
  ])

  const atualizarMetrica = (index: number, campo: keyof Metrica, valor: string | number) => {
    const novas = [...metricas]
    novas[index] = { ...novas[index], [campo]: valor }
    setMetricas(novas)
  }

  const calcularVariacao = (atual: number, anterior: number) => {
    if (anterior === 0) return 0
    return ((atual - anterior) / anterior) * 100
  }

  const calcularProgressoMeta = (atual: number, meta: number, inverso: boolean = false) => {
    if (meta === 0) return 0
    if (inverso) {
      // Para metricas onde menor e melhor (churn)
      return meta > 0 ? (meta / atual) * 100 : 0
    }
    return (atual / meta) * 100
  }

  const getCorVariacao = (variacao: number, inverso: boolean = false) => {
    if (inverso) {
      return variacao <= 0 ? '#22c55e' : '#ef4444'
    }
    return variacao >= 0 ? '#22c55e' : '#ef4444'
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const copiarRelatorio = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
              RELATORIO MENSAL - ${mes.toUpperCase()} ${ano}
              ${empresa || '[NOME DA EMPRESA]'}
═══════════════════════════════════════════════════════════════

METRICAS PRINCIPAIS
───────────────────────────────────────────────────────────────
${metricas.map(m => {
  const variacao = calcularVariacao(m.valorAtual, m.valorAnterior)
  const simbolo = variacao >= 0 ? '+' : ''
  return `${m.nome}: ${m.unidade === 'R$' ? formatCurrency(m.valorAtual) : m.valorAtual + m.unidade}
  vs Anterior: ${simbolo}${variacao.toFixed(1)}% | Meta: ${m.unidade === 'R$' ? formatCurrency(m.meta) : m.meta + m.unidade}`
}).join('\n\n')}

DESTAQUES DO MES
───────────────────────────────────────────────────────────────
${highlights.filter(h => h).map(h => `✓ ${h}`).join('\n')}

DESAFIOS
───────────────────────────────────────────────────────────────
${desafios.filter(d => d).map(d => `⚠ ${d}`).join('\n')}

PROXIMOS PASSOS
───────────────────────────────────────────────────────────────
${proximosPassos.filter(p => p).map(p => `→ ${p}`).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const meses = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ]

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
            <FileBarChart className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Relatorio Mensal</span>
          </h1>
          <p className="text-[var(--gray)]">Reports para investidores e stakeholders</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nome da empresa"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Mes</label>
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                className="input-field"
              >
                {meses.map(m => (
                  <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Ano</label>
              <select
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
                className="input-field"
              >
                {[2024, 2025, 2026, 2027].map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
            Metricas Principais
          </h2>

          <div className="space-y-6">
            {metricas.map((metrica, index) => {
              const variacao = calcularVariacao(metrica.valorAtual, metrica.valorAnterior)
              const isInverso = metrica.nome.toLowerCase().includes('churn')
              const corVariacao = getCorVariacao(variacao, isInverso)
              const progresso = calcularProgressoMeta(metrica.valorAtual, metrica.meta, isInverso)

              return (
                <div key={index} className="bg-black/30 rounded-xl p-4">
                  <div className="grid md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <label className="text-xs text-[var(--gray)]">Metrica</label>
                      <input
                        type="text"
                        value={metrica.nome}
                        onChange={(e) => atualizarMetrica(index, 'nome', e.target.value)}
                        className="bg-transparent border-none font-semibold focus:outline-none w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[var(--gray)]">Atual</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={metrica.valorAtual}
                          onChange={(e) => atualizarMetrica(index, 'valorAtual', Number(e.target.value))}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          value={metrica.unidade}
                          onChange={(e) => atualizarMetrica(index, 'unidade', e.target.value)}
                          className="w-12 bg-white/10 rounded px-2 py-2 text-sm text-center"
                          placeholder="un"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--gray)]">Anterior</label>
                      <input
                        type="number"
                        value={metrica.valorAnterior}
                        onChange={(e) => atualizarMetrica(index, 'valorAnterior', Number(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[var(--gray)]">Meta</label>
                      <input
                        type="number"
                        value={metrica.meta}
                        onChange={(e) => atualizarMetrica(index, 'meta', Number(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1" style={{ color: corVariacao }}>
                        {variacao > 0 ? <TrendingUp className="w-4 h-4" /> :
                         variacao < 0 ? <TrendingDown className="w-4 h-4" /> :
                         <Minus className="w-4 h-4" />}
                        <span className="font-semibold">{variacao > 0 ? '+' : ''}{variacao.toFixed(1)}%</span>
                        <span className="text-xs text-[var(--gray)]">vs anterior</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${Math.min(progresso, 100)}%`,
                            backgroundColor: progresso >= 100 ? '#22c55e' : 'var(--gold)'
                          }}
                        />
                      </div>
                      <span className="text-xs text-[var(--gray)]">{progresso.toFixed(0)}% da meta</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Destaques do Mes
            </h2>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-2">•</span>
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => {
                      const novos = [...highlights]
                      novos[i] = e.target.value
                      setHighlights(novos)
                    }}
                    placeholder="Adicione um destaque..."
                    className="input-field text-sm flex-1"
                  />
                </div>
              ))}
              <button
                onClick={() => setHighlights([...highlights, ''])}
                className="text-[var(--gold)] text-sm hover:opacity-80"
              >
                + Adicionar destaque
              </button>
            </div>
          </div>

          <div className="glass card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Desafios
            </h2>
            <div className="space-y-3">
              {desafios.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-2">•</span>
                  <input
                    type="text"
                    value={d}
                    onChange={(e) => {
                      const novos = [...desafios]
                      novos[i] = e.target.value
                      setDesafios(novos)
                    }}
                    placeholder="Adicione um desafio..."
                    className="input-field text-sm flex-1"
                  />
                </div>
              ))}
              <button
                onClick={() => setDesafios([...desafios, ''])}
                className="text-[var(--gold)] text-sm hover:opacity-80"
              >
                + Adicionar desafio
              </button>
            </div>
          </div>
        </div>

        {/* Proximos Passos */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--gold)]" />
            Proximos Passos
          </h2>
          <div className="space-y-3">
            {proximosPassos.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[var(--gold)] mt-2">→</span>
                <input
                  type="text"
                  value={p}
                  onChange={(e) => {
                    const novos = [...proximosPassos]
                    novos[i] = e.target.value
                    setProximosPassos(novos)
                  }}
                  placeholder="Adicione um proximo passo..."
                  className="input-field text-sm flex-1"
                />
              </div>
            ))}
            <button
              onClick={() => setProximosPassos([...proximosPassos, ''])}
              className="text-[var(--gold)] text-sm hover:opacity-80"
            >
              + Adicionar passo
            </button>
          </div>
        </div>

        {/* Copiar */}
        <div className="flex justify-center">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Relatorio Copiado!' : 'Copiar Relatorio Completo'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Relatorios de Investidor</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Seja Transparente</h4>
              <p>Investidores preferem honestidade sobre desafios do que surpresas negativas depois.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Mostre Tendencias</h4>
              <p>Comparativos mes a mes sao mais uteis que numeros absolutos isolados.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Foque em Acoes</h4>
              <p>Sempre termine com proximos passos claros e responsaveis definidos.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Mantenha Consistencia</h4>
              <p>Use as mesmas metricas todo mes para facilitar acompanhamento.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
