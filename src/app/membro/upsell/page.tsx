'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Copy, Check, Target, DollarSign, Users } from 'lucide-react'

export default function UpsellPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    clientesAtivos: 500,
    ticketMedio: 200,
    taxaUpsell: 15,
    aumentoTicket: 50,
    taxaCrossSell: 10,
    valorCrossSell: 80
  })

  // Calculos
  const receitaAtual = dados.clientesAtivos * dados.ticketMedio
  const clientesUpsell = Math.round(dados.clientesAtivos * (dados.taxaUpsell / 100))
  const receitaUpsell = clientesUpsell * dados.aumentoTicket
  const clientesCrossSell = Math.round(dados.clientesAtivos * (dados.taxaCrossSell / 100))
  const receitaCrossSell = clientesCrossSell * dados.valorCrossSell

  const expansionRevenue = receitaUpsell + receitaCrossSell
  const receitaTotal = receitaAtual + expansionRevenue
  const crescimentoPercent = (expansionRevenue / receitaAtual) * 100

  const estrategiasUpsell = [
    {
      nome: 'Upgrade de Plano',
      gatilho: 'Cliente atinge 80% do limite do plano atual',
      mensagem: 'Voce esta aproveitando muito bem o [Plano Atual]! Que tal desbloquear [beneficio] com o [Plano Superior]?',
      timing: 'Quando cliente atinge threshold'
    },
    {
      nome: 'Feature Premium',
      gatilho: 'Cliente usa feature basica frequentemente',
      mensagem: 'Vimos que voce usa muito [feature]. A versao avancada pode [beneficio]. Quer testar por 7 dias?',
      timing: 'Apos 10+ usos da feature'
    },
    {
      nome: 'Renovacao Anual',
      gatilho: '2 meses antes do fim do contrato mensal',
      mensagem: 'Economize [X]% pagando anualmente. Sao [valor] de economia por ano!',
      timing: '60 dias antes da renovacao'
    },
    {
      nome: 'Add-on de Usuarios',
      gatilho: 'Time do cliente cresce',
      mensagem: 'Seu time cresceu! Adicione mais [N] usuarios com [desconto]% de desconto.',
      timing: 'Quando adiciona usuarios no limite'
    }
  ]

  const estrategiasCrossSell = [
    {
      nome: 'Produto Complementar',
      gatilho: 'Cliente usa produto A intensamente',
      mensagem: 'Clientes que usam [Produto A] tambem adoram [Produto B] para [beneficio].',
      timing: 'Apos 30 dias de uso ativo'
    },
    {
      nome: 'Integracao',
      gatilho: 'Cliente usa ferramenta externa compativel',
      mensagem: 'Integre [Ferramenta] com nossa solucao e [beneficio]. Configuracao em 5 minutos!',
      timing: 'Detectar uso de ferramenta via API'
    },
    {
      nome: 'Servico Profissional',
      gatilho: 'Cliente tem dificuldade na implementacao',
      mensagem: 'Nosso time de especialistas pode [beneficio] em [prazo]. Vamos conversar?',
      timing: 'Health score baixo ou tickets frequentes'
    },
    {
      nome: 'Treinamento',
      gatilho: 'Baixa adocao de features',
      mensagem: 'Desbloqueie todo o potencial com nosso treinamento. [X]% dos participantes [resultado].',
      timing: 'Feature adoption < 50%'
    }
  ]

  const gerarPlaybook = () => {
    return `
PLAYBOOK DE UPSELL E CROSS-SELL
═══════════════════════════════════════════════════════════════

OPORTUNIDADE ATUAL
─────────────────────────────────────────────────────────────
Clientes Ativos: ${dados.clientesAtivos}
Receita Atual: R$ ${receitaAtual.toLocaleString()}/mes
Expansion Revenue Potencial: R$ ${expansionRevenue.toLocaleString()}/mes (+${crescimentoPercent.toFixed(1)}%)

PROJECAO DE UPSELL
─────────────────────────────────────────────────────────────
Taxa de Conversao Upsell: ${dados.taxaUpsell}%
Clientes para Upsell: ${clientesUpsell}
Aumento Medio por Cliente: R$ ${dados.aumentoTicket}
Receita Adicional: R$ ${receitaUpsell.toLocaleString()}/mes

PROJECAO DE CROSS-SELL
─────────────────────────────────────────────────────────────
Taxa de Conversao Cross-sell: ${dados.taxaCrossSell}%
Clientes para Cross-sell: ${clientesCrossSell}
Valor Medio Cross-sell: R$ ${dados.valorCrossSell}
Receita Adicional: R$ ${receitaCrossSell.toLocaleString()}/mes

ESTRATEGIAS DE UPSELL
─────────────────────────────────────────────────────────────
${estrategiasUpsell.map((e, i) => `
${i + 1}. ${e.nome}
   Gatilho: ${e.gatilho}
   Timing: ${e.timing}
   Mensagem: "${e.mensagem}"`).join('\n')}

ESTRATEGIAS DE CROSS-SELL
─────────────────────────────────────────────────────────────
${estrategiasCrossSell.map((e, i) => `
${i + 1}. ${e.nome}
   Gatilho: ${e.gatilho}
   Timing: ${e.timing}
   Mensagem: "${e.mensagem}"`).join('\n')}

METRICAS PARA ACOMPANHAR
─────────────────────────────────────────────────────────────
• Expansion MRR: Receita adicional de clientes existentes
• Net Revenue Retention: Meta > 100%
• Taxa de Upsell: % de clientes que fazem upgrade
• ARPU Growth: Crescimento do ticket medio

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarPlaybook = () => {
    navigator.clipboard.writeText(gerarPlaybook())
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
            Playbook <span className="gold-text">Upsell & Cross-sell</span>
          </h1>
          <p className="text-[var(--gray)]">Cresca receita com clientes existentes</p>
        </div>

        {/* Inputs */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados da Base</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Clientes Ativos</label>
              <input
                type="number"
                value={dados.clientesAtivos}
                onChange={(e) => setDados({ ...dados, clientesAtivos: Number(e.target.value) })}
                className="input-field"
                min="1"
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
              <label className="input-label">Taxa Upsell (%)</label>
              <input
                type="number"
                value={dados.taxaUpsell}
                onChange={(e) => setDados({ ...dados, taxaUpsell: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">Aumento Ticket Upsell (R$)</label>
              <input
                type="number"
                value={dados.aumentoTicket}
                onChange={(e) => setDados({ ...dados, aumentoTicket: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Taxa Cross-sell (%)</label>
              <input
                type="number"
                value={dados.taxaCrossSell}
                onChange={(e) => setDados({ ...dados, taxaCrossSell: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">Valor Cross-sell (R$)</label>
              <input
                type="number"
                value={dados.valorCrossSell}
                onChange={(e) => setDados({ ...dados, valorCrossSell: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Receita Atual</p>
            <p className="font-display text-2xl text-[var(--gold)]">R$ {receitaAtual.toLocaleString()}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Expansion Revenue</p>
            <p className="font-display text-2xl text-green-400">+R$ {expansionRevenue.toLocaleString()}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Crescimento</p>
            <p className="font-display text-2xl text-green-400">+{crescimentoPercent.toFixed(1)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Receita Total</p>
            <p className="font-display text-2xl text-[var(--gold)]">R$ {receitaTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Estrategias Upsell */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--gold)]" />
            Estrategias de Upsell
          </h2>
          <div className="space-y-4">
            {estrategiasUpsell.map((e, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--gold)] mb-2">{e.nome}</h3>
                <p className="text-sm text-[var(--gray)] mb-1"><strong>Gatilho:</strong> {e.gatilho}</p>
                <p className="text-sm text-[var(--gray)] mb-1"><strong>Timing:</strong> {e.timing}</p>
                <p className="text-sm text-white italic">"{e.mensagem}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estrategias Cross-sell */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--gold)]" />
            Estrategias de Cross-sell
          </h2>
          <div className="space-y-4">
            {estrategiasCrossSell.map((e, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--gold)] mb-2">{e.nome}</h3>
                <p className="text-sm text-[var(--gray)] mb-1"><strong>Gatilho:</strong> {e.gatilho}</p>
                <p className="text-sm text-[var(--gray)] mb-1"><strong>Timing:</strong> {e.timing}</p>
                <p className="text-sm text-white italic">"{e.mensagem}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPlaybook} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Playbook'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks de Expansion</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Taxas de Conversao</h4>
              <ul className="space-y-1">
                <li>• Upsell: 10-20% da base</li>
                <li>• Cross-sell: 5-15% da base</li>
                <li>• Net Revenue Retention: {'>'} 110%</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Melhores Praticas</h4>
              <ul className="space-y-1">
                <li>• Timing e relevante - nao seja invasivo</li>
                <li>• Mostre valor antes de pedir upgrade</li>
                <li>• Use dados de uso para personalizar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
