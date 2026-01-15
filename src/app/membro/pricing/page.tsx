'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Copy, Check } from 'lucide-react'

interface Plano {
  id: string
  nome: string
  preco: number
  periodo: 'mensal' | 'anual'
  features: string[]
  destaque: boolean
}

export default function PricingPage() {
  const [copied, setCopied] = useState(false)
  const [moeda, setMoeda] = useState('BRL')
  const [descontoAnual, setDescontoAnual] = useState(20)

  const [planos, setPlanos] = useState<Plano[]>([
    {
      id: '1',
      nome: 'Starter',
      preco: 97,
      periodo: 'mensal',
      features: ['Ate 100 usuarios', 'Suporte por email', '5GB de armazenamento', 'Relatorios basicos'],
      destaque: false
    },
    {
      id: '2',
      nome: 'Professional',
      preco: 297,
      periodo: 'mensal',
      features: ['Ate 500 usuarios', 'Suporte prioritario', '50GB de armazenamento', 'Relatorios avancados', 'API access', 'Integracoes'],
      destaque: true
    },
    {
      id: '3',
      nome: 'Enterprise',
      preco: 997,
      periodo: 'mensal',
      features: ['Usuarios ilimitados', 'Suporte 24/7', 'Armazenamento ilimitado', 'Relatorios customizados', 'API ilimitada', 'Todas integracoes', 'Account manager dedicado'],
      destaque: false
    },
  ])

  const simboloMoeda = {
    BRL: 'R$',
    USD: '$',
    EUR: '€'
  }[moeda]

  const calcularPrecoAnual = (precoMensal: number) => {
    return precoMensal * 12 * (1 - descontoAnual / 100)
  }

  const adicionarPlano = () => {
    setPlanos([...planos, {
      id: Date.now().toString(),
      nome: 'Novo Plano',
      preco: 0,
      periodo: 'mensal',
      features: [],
      destaque: false
    }])
  }

  const removerPlano = (id: string) => {
    setPlanos(planos.filter(p => p.id !== id))
  }

  const atualizarPlano = (id: string, campo: keyof Plano, valor: any) => {
    setPlanos(planos.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  }

  const adicionarFeature = (planoId: string) => {
    setPlanos(planos.map(p => {
      if (p.id === planoId) {
        return { ...p, features: [...p.features, ''] }
      }
      return p
    }))
  }

  const atualizarFeature = (planoId: string, index: number, valor: string) => {
    setPlanos(planos.map(p => {
      if (p.id === planoId) {
        const newFeatures = [...p.features]
        newFeatures[index] = valor
        return { ...p, features: newFeatures }
      }
      return p
    }))
  }

  const removerFeature = (planoId: string, index: number) => {
    setPlanos(planos.map(p => {
      if (p.id === planoId) {
        return { ...p, features: p.features.filter((_, i) => i !== index) }
      }
      return p
    }))
  }

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  const gerarPricing = () => {
    return `
TABELA DE PRECOS
═══════════════════════════════════════════════════════════════

Moeda: ${moeda}
Desconto Anual: ${descontoAnual}%

PLANOS DISPONIVEIS
─────────────────────────────────────────────────────────────
${planos.map(p => `
${p.destaque ? '★ ' : ''}${p.nome.toUpperCase()}${p.destaque ? ' (Mais Popular)' : ''}
─────────────────────────────────────────────────────────────
Preco Mensal: ${simboloMoeda} ${formatarPreco(p.preco)}/mes
Preco Anual: ${simboloMoeda} ${formatarPreco(calcularPrecoAnual(p.preco))}/ano (${descontoAnual}% off)

Inclui:
${p.features.filter(f => f).map(f => `  ✓ ${f}`).join('\n')}
`).join('\n')}

COMPARATIVO
─────────────────────────────────────────────────────────────
${'Plano'.padEnd(15)} | ${'Mensal'.padEnd(12)} | ${'Anual'.padEnd(12)} | Features
${'-'.repeat(60)}
${planos.map(p =>
  `${p.nome.padEnd(15)} | ${simboloMoeda}${formatarPreco(p.preco).padEnd(8)} | ${simboloMoeda}${formatarPreco(calcularPrecoAnual(p.preco)).padEnd(8)} | ${p.features.length} itens`
).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarPricing = () => {
    navigator.clipboard.writeText(gerarPricing())
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
            <DollarSign className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Pricing</span>
          </h1>
          <p className="text-[var(--gray)]">Monte sua tabela de precos</p>
        </div>

        {/* Config */}
        <div className="glass card mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="input-label">Moeda</label>
              <select
                value={moeda}
                onChange={(e) => setMoeda(e.target.value)}
                className="input-field"
              >
                <option value="BRL">Real (R$)</option>
                <option value="USD">Dolar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <div>
              <label className="input-label">Desconto Anual (%)</label>
              <input
                type="number"
                value={descontoAnual}
                onChange={(e) => setDescontoAnual(Number(e.target.value))}
                className="input-field w-24"
                min="0"
                max="50"
              />
            </div>
            <div className="ml-auto">
              <button onClick={adicionarPlano} className="btn-secondary text-xs">+ Adicionar Plano</button>
            </div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {planos.map(plano => (
            <div
              key={plano.id}
              className={`glass card relative ${plano.destaque ? 'border-2 border-[var(--gold)]' : ''}`}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-black text-xs px-3 py-1 rounded-full">
                  Mais Popular
                </div>
              )}
              <button
                onClick={() => removerPlano(plano.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-sm"
              >
                ✕
              </button>

              <input
                type="text"
                value={plano.nome}
                onChange={(e) => atualizarPlano(plano.id, 'nome', e.target.value)}
                className="bg-transparent border-none text-xl font-display text-center w-full mb-4"
              />

              <div className="text-center mb-4">
                <span className="text-[var(--gray)]">{simboloMoeda}</span>
                <input
                  type="number"
                  value={plano.preco}
                  onChange={(e) => atualizarPlano(plano.id, 'preco', Number(e.target.value))}
                  className="bg-transparent border-none text-3xl font-display text-center w-24"
                />
                <span className="text-[var(--gray)]">/mes</span>
              </div>

              <p className="text-center text-sm text-[var(--gray)] mb-4">
                ou {simboloMoeda} {formatarPreco(calcularPrecoAnual(plano.preco))}/ano
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={plano.destaque}
                  onChange={(e) => atualizarPlano(plano.id, 'destaque', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs">Destacar</span>
              </div>

              <div className="space-y-2 mb-4">
                {plano.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => atualizarFeature(plano.id, index, e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm flex-1"
                      placeholder="Feature"
                    />
                    <button
                      onClick={() => removerFeature(plano.id, index)}
                      className="text-red-400 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => adicionarFeature(plano.id)}
                className="text-sm text-[var(--gold)] hover:opacity-80 w-full text-center"
              >
                + Feature
              </button>
            </div>
          ))}
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPricing} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Tabela'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Pricing</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Estrutura</h4>
              <ul className="space-y-1">
                <li>• 3 opcoes e ideal</li>
                <li>• Destaque o plano do meio</li>
                <li>• Nomes descritivos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Ancoragem</h4>
              <ul className="space-y-1">
                <li>• Plano caro primeiro</li>
                <li>• Diferenca de 2-3x</li>
                <li>• Destaque economia</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Conversao</h4>
              <ul className="space-y-1">
                <li>• Desconto anual 15-25%</li>
                <li>• Garantia de reembolso</li>
                <li>• Trial gratuito</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
