'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, GitBranch, Copy, Check, TrendingUp, TrendingDown, Minus, DollarSign, Users, ShoppingCart, Percent } from 'lucide-react'

interface Cenario {
  id: string
  nome: string
  cor: string
  // Receita
  clientesNovos: number
  ticketMedio: number
  churnRate: number
  // Custos
  custoFixo: number
  custoVariavelPorCliente: number
  investimentoMarketing: number
  // Resultados calculados
  receitaMensal?: number
  custoTotal?: number
  lucro?: number
  margemLucro?: number
}

export default function CenariosPage() {
  const [copied, setCopied] = useState(false)
  const [clientesAtuais, setClientesAtuais] = useState(100)
  const [meses, setMeses] = useState(12)

  const [cenarios, setCenarios] = useState<Cenario[]>([
    {
      id: '1',
      nome: 'Pessimista',
      cor: '#ef4444',
      clientesNovos: 5,
      ticketMedio: 200,
      churnRate: 8,
      custoFixo: 15000,
      custoVariavelPorCliente: 20,
      investimentoMarketing: 5000
    },
    {
      id: '2',
      nome: 'Realista',
      cor: '#eab308',
      clientesNovos: 15,
      ticketMedio: 250,
      churnRate: 5,
      custoFixo: 15000,
      custoVariavelPorCliente: 20,
      investimentoMarketing: 10000
    },
    {
      id: '3',
      nome: 'Otimista',
      cor: '#22c55e',
      clientesNovos: 30,
      ticketMedio: 300,
      churnRate: 3,
      custoFixo: 15000,
      custoVariavelPorCliente: 20,
      investimentoMarketing: 15000
    }
  ])

  const atualizarCenario = (id: string, campo: keyof Cenario, valor: number | string) => {
    setCenarios(cenarios.map(c =>
      c.id === id ? { ...c, [campo]: valor } : c
    ))
  }

  const calcularCenario = (cenario: Cenario, mes: number) => {
    let clientes = clientesAtuais
    let receitaAcumulada = 0
    let custoAcumulado = 0

    for (let i = 1; i <= mes; i++) {
      // Novos clientes - churn
      const churnClientes = Math.floor(clientes * (cenario.churnRate / 100))
      clientes = clientes + cenario.clientesNovos - churnClientes

      // Receita do mes
      const receitaMes = clientes * cenario.ticketMedio
      receitaAcumulada += receitaMes

      // Custos do mes
      const custoMes = cenario.custoFixo + (clientes * cenario.custoVariavelPorCliente) + cenario.investimentoMarketing
      custoAcumulado += custoMes
    }

    const lucro = receitaAcumulada - custoAcumulado
    const margemLucro = receitaAcumulada > 0 ? (lucro / receitaAcumulada) * 100 : 0

    return {
      clientesFinais: clientes,
      receitaTotal: receitaAcumulada,
      custoTotal: custoAcumulado,
      lucro,
      margemLucro,
      receitaMedia: receitaAcumulada / mes,
      crescimentoClientes: ((clientes - clientesAtuais) / clientesAtuais) * 100
    }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const copiarAnalise = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
              ANALISE DE CENARIOS - ${meses} MESES
═══════════════════════════════════════════════════════════════
Clientes Atuais: ${clientesAtuais}

${cenarios.map(c => {
  const resultado = calcularCenario(c, meses)
  return `
───────────────────────────────────────────────────────────────
CENARIO ${c.nome.toUpperCase()}
───────────────────────────────────────────────────────────────
Premissas:
• Novos clientes/mes: ${c.clientesNovos}
• Ticket medio: ${formatCurrency(c.ticketMedio)}
• Churn rate: ${c.churnRate}%
• Custo fixo: ${formatCurrency(c.custoFixo)}
• Custo variavel/cliente: ${formatCurrency(c.custoVariavelPorCliente)}
• Investimento marketing: ${formatCurrency(c.investimentoMarketing)}

Resultados em ${meses} meses:
• Clientes finais: ${resultado.clientesFinais} (${resultado.crescimentoClientes > 0 ? '+' : ''}${resultado.crescimentoClientes.toFixed(0)}%)
• Receita total: ${formatCurrency(resultado.receitaTotal)}
• Custo total: ${formatCurrency(resultado.custoTotal)}
• Lucro: ${formatCurrency(resultado.lucro)}
• Margem: ${resultado.margemLucro.toFixed(1)}%
`
}).join('')}

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

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <GitBranch className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Simulador de <span className="gold-text">Cenarios</span>
          </h1>
          <p className="text-[var(--gray)]">What-if para decisoes de negocio</p>
        </div>

        {/* Config Geral */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Clientes Atuais</label>
              <input
                type="number"
                value={clientesAtuais}
                onChange={(e) => setClientesAtuais(Number(e.target.value))}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Periodo de Analise</label>
              <select
                value={meses}
                onChange={(e) => setMeses(Number(e.target.value))}
                className="input-field"
              >
                <option value={3}>3 meses</option>
                <option value={6}>6 meses</option>
                <option value={12}>12 meses</option>
                <option value={24}>24 meses</option>
                <option value={36}>36 meses</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={copiarAnalise} className="btn-primary w-full flex items-center justify-center gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Analise'}
              </button>
            </div>
          </div>
        </div>

        {/* Cenarios */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {cenarios.map(cenario => {
            const resultado = calcularCenario(cenario, meses)
            return (
              <div
                key={cenario.id}
                className="glass card"
                style={{ borderColor: `${cenario.cor}50`, borderWidth: 2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${cenario.cor}20` }}
                  >
                    {cenario.nome === 'Pessimista' && <TrendingDown className="w-5 h-5" style={{ color: cenario.cor }} />}
                    {cenario.nome === 'Realista' && <Minus className="w-5 h-5" style={{ color: cenario.cor }} />}
                    {cenario.nome === 'Otimista' && <TrendingUp className="w-5 h-5" style={{ color: cenario.cor }} />}
                  </div>
                  <input
                    type="text"
                    value={cenario.nome}
                    onChange={(e) => atualizarCenario(cenario.id, 'nome', e.target.value)}
                    className="bg-transparent border-none font-display text-lg focus:outline-none"
                    style={{ color: cenario.cor }}
                  />
                </div>

                {/* Premissas */}
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-xs text-[var(--gray)] flex items-center gap-1">
                      <Users className="w-3 h-3" /> Novos Clientes/Mes
                    </label>
                    <input
                      type="number"
                      value={cenario.clientesNovos}
                      onChange={(e) => atualizarCenario(cenario.id, 'clientesNovos', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)] flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> Ticket Medio (R$)
                    </label>
                    <input
                      type="number"
                      value={cenario.ticketMedio}
                      onChange={(e) => atualizarCenario(cenario.id, 'ticketMedio', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)] flex items-center gap-1">
                      <Percent className="w-3 h-3" /> Churn Rate (%)
                    </label>
                    <input
                      type="number"
                      value={cenario.churnRate}
                      onChange={(e) => atualizarCenario(cenario.id, 'churnRate', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)] flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Custo Fixo/Mes (R$)
                    </label>
                    <input
                      type="number"
                      value={cenario.custoFixo}
                      onChange={(e) => atualizarCenario(cenario.id, 'custoFixo', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Custo Variavel/Cliente (R$)</label>
                    <input
                      type="number"
                      value={cenario.custoVariavelPorCliente}
                      onChange={(e) => atualizarCenario(cenario.id, 'custoVariavelPorCliente', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Investimento Marketing/Mes (R$)</label>
                    <input
                      type="number"
                      value={cenario.investimentoMarketing}
                      onChange={(e) => atualizarCenario(cenario.id, 'investimentoMarketing', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                </div>

                {/* Resultados */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="font-semibold text-sm" style={{ color: cenario.cor }}>
                    Resultados em {meses} meses
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gray)]">Clientes Finais</span>
                    <span className="font-semibold">
                      {resultado.clientesFinais}
                      <span className={`text-xs ml-1 ${resultado.crescimentoClientes >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ({resultado.crescimentoClientes > 0 ? '+' : ''}{resultado.crescimentoClientes.toFixed(0)}%)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gray)]">Receita Total</span>
                    <span className="font-semibold text-green-400">{formatCurrency(resultado.receitaTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gray)]">Custo Total</span>
                    <span className="font-semibold text-red-400">{formatCurrency(resultado.custoTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-[var(--gray)]">Lucro</span>
                    <span className={`font-display text-lg ${resultado.lucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(resultado.lucro)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gray)]">Margem</span>
                    <span className={`font-semibold ${resultado.margemLucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {resultado.margemLucro.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Comparativo */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-6">Comparativo de Cenarios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2">Metrica</th>
                  {cenarios.map(c => (
                    <th key={c.id} className="text-center py-3 px-2" style={{ color: c.cor }}>
                      {c.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 text-[var(--gray)]">Clientes Finais</td>
                  {cenarios.map(c => (
                    <td key={c.id} className="text-center py-3 px-2 font-semibold">
                      {calcularCenario(c, meses).clientesFinais}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 text-[var(--gray)]">Receita Total</td>
                  {cenarios.map(c => (
                    <td key={c.id} className="text-center py-3 px-2 font-semibold text-green-400">
                      {formatCurrency(calcularCenario(c, meses).receitaTotal)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 text-[var(--gray)]">Lucro</td>
                  {cenarios.map(c => {
                    const lucro = calcularCenario(c, meses).lucro
                    return (
                      <td key={c.id} className={`text-center py-3 px-2 font-display ${lucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(lucro)}
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  <td className="py-3 px-2 text-[var(--gray)]">Margem</td>
                  {cenarios.map(c => {
                    const margem = calcularCenario(c, meses).margemLucro
                    return (
                      <td key={c.id} className={`text-center py-3 px-2 font-semibold ${margem >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {margem.toFixed(1)}%
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Usar Analise de Cenarios</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Pessimista</h4>
              <p>O pior caso realista. Use para planejar reservas e contingencias.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Realista</h4>
              <p>O cenario mais provavel. Base para metas e orcamento.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Otimista</h4>
              <p>O melhor caso possivel. Use para definir stretch goals.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
