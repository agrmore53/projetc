'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Copy, Check } from 'lucide-react'

export default function ChurnPredictionPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    nomeCliente: '',
    mrr: 1000,
    diasDesdeUltimoLogin: 15,
    ticketsSuporte: 5,
    nps: 7,
    tempoCliente: 12, // meses
    adocaoFeatures: 60, // %
    reunioesCSM: 2, // ultimos 90 dias
    pagamentoAtrasado: false,
    reduziuPlano: false,
    competidorMencionado: false
  })

  // Pesos dos fatores de risco
  const calcularRisco = () => {
    let score = 0
    let fatores: { fator: string; peso: number; status: string }[] = []

    // Login (0-30 pontos)
    if (dados.diasDesdeUltimoLogin > 30) {
      score += 30
      fatores.push({ fator: 'Inatividade', peso: 30, status: 'critico' })
    } else if (dados.diasDesdeUltimoLogin > 14) {
      score += 15
      fatores.push({ fator: 'Inatividade', peso: 15, status: 'alerta' })
    } else if (dados.diasDesdeUltimoLogin > 7) {
      score += 5
      fatores.push({ fator: 'Inatividade', peso: 5, status: 'ok' })
    }

    // NPS (0-25 pontos)
    if (dados.nps <= 5) {
      score += 25
      fatores.push({ fator: 'NPS Baixo', peso: 25, status: 'critico' })
    } else if (dados.nps <= 7) {
      score += 10
      fatores.push({ fator: 'NPS Neutro', peso: 10, status: 'alerta' })
    }

    // Adocao (0-20 pontos)
    if (dados.adocaoFeatures < 30) {
      score += 20
      fatores.push({ fator: 'Baixa Adocao', peso: 20, status: 'critico' })
    } else if (dados.adocaoFeatures < 50) {
      score += 10
      fatores.push({ fator: 'Adocao Moderada', peso: 10, status: 'alerta' })
    }

    // Tickets (0-15 pontos)
    if (dados.ticketsSuporte > 10) {
      score += 15
      fatores.push({ fator: 'Muitos Tickets', peso: 15, status: 'critico' })
    } else if (dados.ticketsSuporte > 5) {
      score += 8
      fatores.push({ fator: 'Tickets Elevados', peso: 8, status: 'alerta' })
    }

    // Reunioes CSM (0-10 pontos)
    if (dados.reunioesCSM === 0) {
      score += 10
      fatores.push({ fator: 'Sem Contato CS', peso: 10, status: 'critico' })
    } else if (dados.reunioesCSM < 2) {
      score += 5
      fatores.push({ fator: 'Pouco Contato CS', peso: 5, status: 'alerta' })
    }

    // Sinais diretos
    if (dados.pagamentoAtrasado) {
      score += 20
      fatores.push({ fator: 'Pagamento Atrasado', peso: 20, status: 'critico' })
    }
    if (dados.reduziuPlano) {
      score += 15
      fatores.push({ fator: 'Downgrade Recente', peso: 15, status: 'critico' })
    }
    if (dados.competidorMencionado) {
      score += 15
      fatores.push({ fator: 'Mencionou Concorrente', peso: 15, status: 'critico' })
    }

    return { score: Math.min(score, 100), fatores }
  }

  const { score, fatores } = calcularRisco()

  const getNivelRisco = () => {
    if (score >= 70) return { nivel: 'Critico', cor: 'text-red-500', bg: 'bg-red-500' }
    if (score >= 40) return { nivel: 'Alto', cor: 'text-orange-500', bg: 'bg-orange-500' }
    if (score >= 20) return { nivel: 'Moderado', cor: 'text-yellow-500', bg: 'bg-yellow-500' }
    return { nivel: 'Baixo', cor: 'text-green-500', bg: 'bg-green-500' }
  }

  const risco = getNivelRisco()
  const valorEmRisco = dados.mrr * 12 // ARR

  const gerarRelatorio = () => {
    return `
ANALISE DE RISCO DE CHURN
═══════════════════════════════════════════════════════════════

CLIENTE: ${dados.nomeCliente || '[Nome do Cliente]'}
─────────────────────────────────────────────────────────────
MRR: R$ ${dados.mrr.toLocaleString('pt-BR')}
ARR em Risco: R$ ${valorEmRisco.toLocaleString('pt-BR')}
Tempo como Cliente: ${dados.tempoCliente} meses

SCORE DE RISCO: ${score}/100 - ${risco.nivel.toUpperCase()}
─────────────────────────────────────────────────────────────

FATORES DE RISCO IDENTIFICADOS
─────────────────────────────────────────────────────────────
${fatores.length > 0 ? fatores.map(f => `⚠️ ${f.fator}: +${f.peso} pontos`).join('\n') : '✓ Nenhum fator de risco significativo'}

METRICAS DETALHADAS
─────────────────────────────────────────────────────────────
• Dias desde ultimo login: ${dados.diasDesdeUltimoLogin}
• Tickets de suporte (30 dias): ${dados.ticketsSuporte}
• NPS: ${dados.nps}/10
• Taxa de adocao: ${dados.adocaoFeatures}%
• Reunioes CSM (90 dias): ${dados.reunioesCSM}
• Pagamento atrasado: ${dados.pagamentoAtrasado ? 'Sim ⚠️' : 'Nao'}
• Reduziu plano: ${dados.reduziuPlano ? 'Sim ⚠️' : 'Nao'}
• Mencionou concorrente: ${dados.competidorMencionado ? 'Sim ⚠️' : 'Nao'}

ACOES RECOMENDADAS
─────────────────────────────────────────────────────────────
${score >= 70 ? `🚨 URGENTE - Acoes Imediatas:
1. Ligar para o cliente hoje
2. Escalair para lideranca
3. Preparar oferta de retencao
4. Agendar reuniao de emergencia` :
score >= 40 ? `⚠️ ALTA PRIORIDADE - Proximos 7 dias:
1. Agendar call de check-in
2. Enviar pesquisa de satisfacao
3. Oferecer treinamento adicional
4. Revisar health score semanalmente` :
score >= 20 ? `📋 ATENCAO - Proximos 30 dias:
1. Monitorar engajamento
2. Enviar conteudo de valor
3. Agendar QBR
4. Identificar oportunidades de expansao` :
`✅ SAUDAVEL - Manutencao:
1. Manter cadencia de contato
2. Buscar oportunidades de upsell
3. Solicitar depoimento/case
4. Indicacoes de novos clientes`}

═══════════════════════════════════════════════════════════════
Analise gerada em: ${new Date().toLocaleDateString('pt-BR')}
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
            <AlertTriangle className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora <span className="gold-text">Churn Prediction</span>
          </h1>
          <p className="text-[var(--gray)]">Avalie o risco de cancelamento</p>
        </div>

        {/* Score de Risco */}
        <div className={`glass card mb-8 border-2 ${
          score >= 70 ? 'border-red-500/50 bg-red-500/5' :
          score >= 40 ? 'border-orange-500/50 bg-orange-500/5' :
          score >= 20 ? 'border-yellow-500/50 bg-yellow-500/5' :
          'border-green-500/50 bg-green-500/5'
        }`}>
          <div className="text-center">
            <p className="text-sm text-[var(--gray)] mb-2">Score de Risco</p>
            <p className={`font-display text-5xl ${risco.cor}`}>{score}</p>
            <p className={`text-lg font-semibold ${risco.cor}`}>{risco.nivel}</p>
            <div className="w-full bg-white/10 rounded-full h-3 mt-4">
              <div
                className={`${risco.bg} h-3 rounded-full transition-all`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cliente Info */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes do Cliente</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Nome do Cliente</label>
              <input
                type="text"
                value={dados.nomeCliente}
                onChange={(e) => setDados({ ...dados, nomeCliente: e.target.value })}
                className="input-field"
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="input-label">MRR (R$)</label>
              <input
                type="number"
                value={dados.mrr}
                onChange={(e) => setDados({ ...dados, mrr: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Tempo como Cliente (meses)</label>
              <input
                type="number"
                value={dados.tempoCliente}
                onChange={(e) => setDados({ ...dados, tempoCliente: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Metricas de Engajamento */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Metricas de Engajamento</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Dias desde ultimo login</label>
              <input
                type="number"
                value={dados.diasDesdeUltimoLogin}
                onChange={(e) => setDados({ ...dados, diasDesdeUltimoLogin: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Taxa de Adocao (%)</label>
              <input
                type="number"
                value={dados.adocaoFeatures}
                onChange={(e) => setDados({ ...dados, adocaoFeatures: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">NPS (0-10)</label>
              <input
                type="number"
                value={dados.nps}
                onChange={(e) => setDados({ ...dados, nps: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="10"
              />
            </div>
            <div>
              <label className="input-label">Tickets de Suporte (30 dias)</label>
              <input
                type="number"
                value={dados.ticketsSuporte}
                onChange={(e) => setDados({ ...dados, ticketsSuporte: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Reunioes CSM (90 dias)</label>
              <input
                type="number"
                value={dados.reunioesCSM}
                onChange={(e) => setDados({ ...dados, reunioesCSM: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Sinais de Alerta */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Sinais de Alerta</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 bg-black/20 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={dados.pagamentoAtrasado}
                onChange={(e) => setDados({ ...dados, pagamentoAtrasado: e.target.checked })}
                className="w-5 h-5"
              />
              <span>Pagamento atrasado</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-black/20 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={dados.reduziuPlano}
                onChange={(e) => setDados({ ...dados, reduziuPlano: e.target.checked })}
                className="w-5 h-5"
              />
              <span>Reduziu plano recentemente</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-black/20 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={dados.competidorMencionado}
                onChange={(e) => setDados({ ...dados, competidorMencionado: e.target.checked })}
                className="w-5 h-5"
              />
              <span>Mencionou concorrente</span>
            </label>
          </div>
        </div>

        {/* Fatores de Risco */}
        {fatores.length > 0 && (
          <div className="glass card mb-6">
            <h2 className="font-display text-lg mb-4">Fatores de Risco Identificados</h2>
            <div className="space-y-2">
              {fatores.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                  <span className={f.status === 'critico' ? 'text-red-400' : 'text-yellow-400'}>
                    ⚠️ {f.fator}
                  </span>
                  <span className="text-[var(--gray)]">+{f.peso} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Valor em Risco */}
        <div className="glass card mb-8 text-center">
          <p className="text-sm text-[var(--gray)]">Valor Anual em Risco (ARR)</p>
          <p className={`font-display text-3xl ${risco.cor}`}>
            R$ {valorEmRisco.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Analise'}
          </button>
        </div>
      </div>
    </main>
  )
}
