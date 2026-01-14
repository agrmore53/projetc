'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Copy, Check, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'

interface Metrica {
  nome: string
  valorAtual: string
  valorAnterior: string
  unidade: string
}

interface Destaque {
  tipo: 'win' | 'challenge' | 'ask'
  texto: string
}

export default function InvestorUpdatePage() {
  const [copied, setCopied] = useState(false)

  const [update, setUpdate] = useState({
    empresa: '',
    mes: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
    resumo: '',
    runway: '',
    proximoMilestone: ''
  })

  const [metricas, setMetricas] = useState<Metrica[]>([
    { nome: 'MRR', valorAtual: '', valorAnterior: '', unidade: 'R$' },
    { nome: 'Clientes Ativos', valorAtual: '', valorAnterior: '', unidade: '' },
    { nome: 'Churn Rate', valorAtual: '', valorAnterior: '', unidade: '%' },
    { nome: 'Burn Rate', valorAtual: '', valorAnterior: '', unidade: 'R$' },
    { nome: 'CAC', valorAtual: '', valorAnterior: '', unidade: 'R$' },
    { nome: 'LTV', valorAtual: '', valorAnterior: '', unidade: 'R$' },
  ])

  const [destaques, setDestaques] = useState<Destaque[]>([
    { tipo: 'win', texto: '' },
    { tipo: 'win', texto: '' },
    { tipo: 'challenge', texto: '' },
    { tipo: 'ask', texto: '' },
  ])

  const atualizarMetrica = (index: number, campo: keyof Metrica, valor: string) => {
    setMetricas(metricas.map((m, i) =>
      i === index ? { ...m, [campo]: valor } : m
    ))
  }

  const atualizarDestaque = (index: number, campo: keyof Destaque, valor: string) => {
    setDestaques(destaques.map((d, i) =>
      i === index ? { ...d, [campo]: valor } : d
    ))
  }

  const calcularVariacao = (atual: string, anterior: string, inverso: boolean = false) => {
    const a = parseFloat(atual.replace(/[^\d.-]/g, '')) || 0
    const ant = parseFloat(anterior.replace(/[^\d.-]/g, '')) || 0
    if (ant === 0) return null
    const variacao = ((a - ant) / ant) * 100
    return inverso ? -variacao : variacao
  }

  const getIconeVariacao = (variacao: number | null, inverso: boolean = false) => {
    if (variacao === null) return <Minus className="w-4 h-4 text-gray-400" />
    const positivo = inverso ? variacao < 0 : variacao > 0
    if (Math.abs(variacao) < 1) return <Minus className="w-4 h-4 text-gray-400" />
    return positivo
      ? <TrendingUp className="w-4 h-4 text-green-400" />
      : <TrendingDown className="w-4 h-4 text-red-400" />
  }

  const formatarVariacao = (variacao: number | null) => {
    if (variacao === null) return '-'
    const sinal = variacao > 0 ? '+' : ''
    return `${sinal}${variacao.toFixed(1)}%`
  }

  const gerarEmail = () => {
    const wins = destaques.filter(d => d.tipo === 'win' && d.texto)
    const challenges = destaques.filter(d => d.tipo === 'challenge' && d.texto)
    const asks = destaques.filter(d => d.tipo === 'ask' && d.texto)

    return `Assunto: ${update.empresa || '[EMPRESA]'} | Investor Update - ${update.mes}

Prezados investidores,

${update.resumo || '[Resumo executivo do mes - 2-3 frases sobre o momento da empresa]'}

METRICAS PRINCIPAIS
${'─'.repeat(50)}
${metricas.filter(m => m.valorAtual).map(m => {
  const variacao = calcularVariacao(m.valorAtual, m.valorAnterior, m.nome === 'Churn Rate' || m.nome === 'Burn Rate' || m.nome === 'CAC')
  return `${m.nome}: ${m.unidade}${m.valorAtual} ${m.valorAnterior ? `(${formatarVariacao(variacao)} vs mes anterior)` : ''}`
}).join('\n')}

Runway: ${update.runway || '[X]'} meses

WINS DO MES
${'─'.repeat(50)}
${wins.length > 0 ? wins.map(w => `✓ ${w.texto}`).join('\n') : '[Lista de conquistas]'}

DESAFIOS
${'─'.repeat(50)}
${challenges.length > 0 ? challenges.map(c => `• ${c.texto}`).join('\n') : '[Desafios enfrentados]'}

${asks.length > 0 ? `ASKS / COMO VOCES PODEM AJUDAR
${'─'.repeat(50)}
${asks.map(a => `→ ${a.texto}`).join('\n')}` : ''}

PROXIMO MILESTONE
${'─'.repeat(50)}
${update.proximoMilestone || '[Qual o proximo grande objetivo]'}

Obrigado pelo suporte continuo.

Atenciosamente,
[Seu nome]
${update.empresa || '[EMPRESA]'}
`
  }

  const copiarEmail = () => {
    navigator.clipboard.writeText(gerarEmail())
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
            <Mail className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Investor</span> Update
          </h1>
          <p className="text-[var(--gray)]">Email mensal para seus investidores</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="input-label">Nome da Empresa</label>
              <input
                type="text"
                value={update.empresa}
                onChange={(e) => setUpdate({ ...update, empresa: e.target.value })}
                placeholder="SuaStartup"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Periodo</label>
              <input
                type="text"
                value={update.mes}
                onChange={(e) => setUpdate({ ...update, mes: e.target.value })}
                placeholder="Janeiro 2025"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Runway (meses)</label>
              <input
                type="text"
                value={update.runway}
                onChange={(e) => setUpdate({ ...update, runway: e.target.value })}
                placeholder="18"
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="input-label">Resumo Executivo</label>
            <textarea
              value={update.resumo}
              onChange={(e) => setUpdate({ ...update, resumo: e.target.value })}
              placeholder="2-3 frases sobre o momento da empresa, principais acontecimentos do mes..."
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        {/* Metricas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Metricas Principais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {metricas.map((metrica, index) => {
              const inverso = metrica.nome === 'Churn Rate' || metrica.nome === 'Burn Rate' || metrica.nome === 'CAC'
              const variacao = calcularVariacao(metrica.valorAtual, metrica.valorAnterior, inverso)

              return (
                <div key={index} className="bg-black/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold">{metrica.nome}</label>
                    <div className="flex items-center gap-1">
                      {getIconeVariacao(variacao, inverso)}
                      <span className={`text-xs ${variacao && variacao > 0 && !inverso ? 'text-green-400' : variacao && variacao < 0 && !inverso ? 'text-red-400' : variacao && variacao < 0 && inverso ? 'text-green-400' : variacao && variacao > 0 && inverso ? 'text-red-400' : 'text-gray-400'}`}>
                        {formatarVariacao(variacao)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-[var(--gray)]">Atual</label>
                      <div className="flex items-center">
                        {metrica.unidade && metrica.unidade !== '%' && (
                          <span className="text-[var(--gray)] text-sm mr-1">{metrica.unidade}</span>
                        )}
                        <input
                          type="text"
                          value={metrica.valorAtual}
                          onChange={(e) => atualizarMetrica(index, 'valorAtual', e.target.value)}
                          placeholder="0"
                          className="input-field text-sm"
                        />
                        {metrica.unidade === '%' && (
                          <span className="text-[var(--gray)] text-sm ml-1">%</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--gray)]">Mes Anterior</label>
                      <div className="flex items-center">
                        {metrica.unidade && metrica.unidade !== '%' && (
                          <span className="text-[var(--gray)] text-sm mr-1">{metrica.unidade}</span>
                        )}
                        <input
                          type="text"
                          value={metrica.valorAnterior}
                          onChange={(e) => atualizarMetrica(index, 'valorAnterior', e.target.value)}
                          placeholder="0"
                          className="input-field text-sm"
                        />
                        {metrica.unidade === '%' && (
                          <span className="text-[var(--gray)] text-sm ml-1">%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Destaques */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Destaques do Mes</h2>
          <div className="space-y-4">
            {/* Wins */}
            <div>
              <label className="input-label flex items-center gap-2">
                <span className="text-green-400">✓</span> Wins / Conquistas
              </label>
              <div className="space-y-2">
                {destaques.filter(d => d.tipo === 'win').map((d, i) => (
                  <input
                    key={i}
                    type="text"
                    value={d.texto}
                    onChange={(e) => {
                      const winIndex = destaques.findIndex((dest, idx) =>
                        dest.tipo === 'win' && destaques.slice(0, idx).filter(x => x.tipo === 'win').length === i
                      )
                      atualizarDestaque(winIndex, 'texto', e.target.value)
                    }}
                    placeholder={`Conquista ${i + 1}...`}
                    className="input-field text-sm"
                  />
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <label className="input-label flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400" /> Desafios
              </label>
              {destaques.filter(d => d.tipo === 'challenge').map((d, i) => (
                <input
                  key={i}
                  type="text"
                  value={d.texto}
                  onChange={(e) => {
                    const challengeIndex = destaques.findIndex((dest, idx) =>
                      dest.tipo === 'challenge' && destaques.slice(0, idx).filter(x => x.tipo === 'challenge').length === i
                    )
                    atualizarDestaque(challengeIndex, 'texto', e.target.value)
                  }}
                  placeholder="Desafio enfrentado..."
                  className="input-field text-sm"
                />
              ))}
            </div>

            {/* Asks */}
            <div>
              <label className="input-label flex items-center gap-2">
                <span className="text-[var(--gold)]">→</span> Asks (como investidores podem ajudar)
              </label>
              {destaques.filter(d => d.tipo === 'ask').map((d, i) => (
                <input
                  key={i}
                  type="text"
                  value={d.texto}
                  onChange={(e) => {
                    const askIndex = destaques.findIndex((dest, idx) =>
                      dest.tipo === 'ask' && destaques.slice(0, idx).filter(x => x.tipo === 'ask').length === i
                    )
                    atualizarDestaque(askIndex, 'texto', e.target.value)
                  }}
                  placeholder="Ex: Introducao a Head de Sales da empresa X..."
                  className="input-field text-sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Proximo Milestone */}
        <div className="glass card mb-8">
          <label className="input-label">Proximo Milestone</label>
          <input
            type="text"
            value={update.proximoMilestone}
            onChange={(e) => setUpdate({ ...update, proximoMilestone: e.target.value })}
            placeholder="Ex: Atingir R$100k MRR ate marco"
            className="input-field"
          />
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview do Email</h2>
          <div className="bg-black/30 rounded-xl p-6">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarEmail()}
            </pre>
          </div>
        </div>

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarEmail} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Email'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Investor Updates</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Consistencia</h4>
              <p>Envie no mesmo dia todo mes. Investidores adoram previsibilidade.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Transparencia</h4>
              <p>Compartilhe desafios abertamente. Investidores querem ajudar, nao julgar.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Asks Claros</h4>
              <p>Seja especifico: "introducao ao VP de Engineering do Nubank" e melhor que "conexoes".</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Metricas Relevantes</h4>
              <p>Foque nas 5-6 metricas que realmente importam para seu estagio.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
