'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ThumbsUp, Copy, Check, TrendingUp, TrendingDown, Minus, Users, Smile, Meh, Frown, Plus, Trash2 } from 'lucide-react'

interface Resposta {
  id: string
  cliente: string
  nota: number
  feedback: string
  data: string
}

export default function NPSPage() {
  const [copied, setCopied] = useState(false)
  const [respostas, setRespostas] = useState<Resposta[]>([
    { id: '1', cliente: 'Cliente A', nota: 9, feedback: 'Excelente atendimento', data: '2024-01-15' },
    { id: '2', cliente: 'Cliente B', nota: 10, feedback: 'Produto incrível', data: '2024-01-14' },
    { id: '3', cliente: 'Cliente C', nota: 7, feedback: 'Bom, mas pode melhorar', data: '2024-01-13' },
    { id: '4', cliente: 'Cliente D', nota: 8, feedback: 'Satisfeito com o serviço', data: '2024-01-12' },
    { id: '5', cliente: 'Cliente E', nota: 5, feedback: 'Tive problemas no suporte', data: '2024-01-11' },
  ])

  const adicionarResposta = () => {
    const nova: Resposta = {
      id: Date.now().toString(),
      cliente: '',
      nota: 8,
      feedback: '',
      data: new Date().toISOString().split('T')[0]
    }
    setRespostas([nova, ...respostas])
  }

  const removerResposta = (id: string) => {
    setRespostas(respostas.filter(r => r.id !== id))
  }

  const atualizarResposta = (id: string, campo: keyof Resposta, valor: string | number) => {
    setRespostas(respostas.map(r =>
      r.id === id ? { ...r, [campo]: valor } : r
    ))
  }

  // Calculos NPS
  const promotores = respostas.filter(r => r.nota >= 9).length
  const neutros = respostas.filter(r => r.nota >= 7 && r.nota <= 8).length
  const detratores = respostas.filter(r => r.nota <= 6).length
  const total = respostas.length

  const nps = total > 0 ? Math.round(((promotores - detratores) / total) * 100) : 0

  const getCorNPS = (nps: number) => {
    if (nps >= 75) return '#22c55e'
    if (nps >= 50) return '#84cc16'
    if (nps >= 0) return '#eab308'
    if (nps >= -50) return '#f97316'
    return '#ef4444'
  }

  const getZonaNPS = (nps: number) => {
    if (nps >= 75) return { zona: 'Excelencia', desc: 'Seus clientes sao promotores ativos da marca' }
    if (nps >= 50) return { zona: 'Qualidade', desc: 'Boa satisfacao, mas ha espaco para melhorar' }
    if (nps >= 0) return { zona: 'Aperfeicoamento', desc: 'Precisa de atencao para melhorar experiencia' }
    if (nps >= -50) return { zona: 'Critica', desc: 'Muitos detratores - acao urgente necessaria' }
    return { zona: 'Crise', desc: 'Situacao critica - risco alto de churn' }
  }

  const getCorNota = (nota: number) => {
    if (nota >= 9) return '#22c55e'
    if (nota >= 7) return '#eab308'
    return '#ef4444'
  }

  const getTipoCliente = (nota: number) => {
    if (nota >= 9) return { tipo: 'Promotor', icon: Smile }
    if (nota >= 7) return { tipo: 'Neutro', icon: Meh }
    return { tipo: 'Detrator', icon: Frown }
  }

  const copiarAnalise = () => {
    const zona = getZonaNPS(nps)
    const texto = `
═══════════════════════════════════════════════════════════════
                    ANALISE DE NPS
═══════════════════════════════════════════════════════════════

SCORE NPS: ${nps}
Zona: ${zona.zona}
${zona.desc}

DISTRIBUICAO
───────────────────────────────────────────────────────────────
Promotores (9-10): ${promotores} (${total > 0 ? ((promotores/total)*100).toFixed(1) : 0}%)
Neutros (7-8): ${neutros} (${total > 0 ? ((neutros/total)*100).toFixed(1) : 0}%)
Detratores (0-6): ${detratores} (${total > 0 ? ((detratores/total)*100).toFixed(1) : 0}%)
Total de respostas: ${total}

FORMULA
───────────────────────────────────────────────────────────────
NPS = % Promotores - % Detratores
NPS = ${total > 0 ? ((promotores/total)*100).toFixed(1) : 0}% - ${total > 0 ? ((detratores/total)*100).toFixed(1) : 0}% = ${nps}

BENCHMARKS
───────────────────────────────────────────────────────────────
• NPS 75-100: Excelencia (Apple, Netflix)
• NPS 50-74: Qualidade (maioria SaaS B2B)
• NPS 0-49: Aperfeicoamento
• NPS < 0: Zona critica

RESPOSTAS DETALHADAS
───────────────────────────────────────────────────────────────
${respostas.map(r => {
  const tipo = getTipoCliente(r.nota)
  return `${r.cliente}: ${r.nota}/10 (${tipo.tipo})${r.feedback ? ` - "${r.feedback}"` : ''}`
}).join('\n')}

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
            <ThumbsUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">NPS</span>
          </h1>
          <p className="text-[var(--gray)]">Net Promoter Score - Meca a satisfacao dos clientes</p>
        </div>

        {/* Score Principal */}
        <div className="glass card mb-8 text-center" style={{ borderColor: getCorNPS(nps), borderWidth: 2 }}>
          <p className="text-sm text-[var(--gray)] mb-2">Seu NPS</p>
          <p className="font-display text-7xl mb-2" style={{ color: getCorNPS(nps) }}>
            {nps}
          </p>
          <p className="font-semibold text-lg" style={{ color: getCorNPS(nps) }}>
            {getZonaNPS(nps).zona}
          </p>
          <p className="text-sm text-[var(--gray)]">{getZonaNPS(nps).desc}</p>
        </div>

        {/* Distribuicao */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smile className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold">Promotores</span>
            </div>
            <p className="font-display text-3xl text-green-400">{promotores}</p>
            <p className="text-sm text-[var(--gray)]">
              {total > 0 ? ((promotores/total)*100).toFixed(1) : 0}% | Notas 9-10
            </p>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all"
                style={{ width: `${total > 0 ? (promotores/total)*100 : 0}%` }}
              />
            </div>
          </div>

          <div className="glass card text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Meh className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Neutros</span>
            </div>
            <p className="font-display text-3xl text-yellow-400">{neutros}</p>
            <p className="text-sm text-[var(--gray)]">
              {total > 0 ? ((neutros/total)*100).toFixed(1) : 0}% | Notas 7-8
            </p>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all"
                style={{ width: `${total > 0 ? (neutros/total)*100 : 0}%` }}
              />
            </div>
          </div>

          <div className="glass card text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Frown className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-semibold">Detratores</span>
            </div>
            <p className="font-display text-3xl text-red-400">{detratores}</p>
            <p className="text-sm text-[var(--gray)]">
              {total > 0 ? ((detratores/total)*100).toFixed(1) : 0}% | Notas 0-6
            </p>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 transition-all"
                style={{ width: `${total > 0 ? (detratores/total)*100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Respostas */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--gold)]" />
              Respostas ({total})
            </h2>
            <div className="flex gap-2">
              <button onClick={adicionarResposta} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Adicionar
              </button>
              <button onClick={copiarAnalise} className="btn-primary text-sm flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {respostas.map((resposta) => {
              const tipo = getTipoCliente(resposta.nota)
              const IconeTipo = tipo.icon

              return (
                <div key={resposta.id} className="bg-black/30 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${getCorNota(resposta.nota)}20` }}
                    >
                      <IconeTipo className="w-6 h-6" style={{ color: getCorNota(resposta.nota) }} />
                    </div>

                    <div className="flex-1 grid md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        value={resposta.cliente}
                        onChange={(e) => atualizarResposta(resposta.id, 'cliente', e.target.value)}
                        placeholder="Nome do cliente"
                        className="input-field text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={resposta.nota}
                          onChange={(e) => atualizarResposta(resposta.id, 'nota', Number(e.target.value))}
                          className="flex-1"
                          style={{ accentColor: getCorNota(resposta.nota) }}
                        />
                        <span
                          className="font-display text-xl w-8 text-center"
                          style={{ color: getCorNota(resposta.nota) }}
                        >
                          {resposta.nota}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={resposta.feedback}
                        onChange={(e) => atualizarResposta(resposta.id, 'feedback', e.target.value)}
                        placeholder="Feedback (opcional)"
                        className="input-field text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={resposta.data}
                          onChange={(e) => atualizarResposta(resposta.id, 'data', e.target.value)}
                          className="input-field text-sm flex-1"
                        />
                        <button
                          onClick={() => removerResposta(resposta.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {respostas.length === 0 && (
            <div className="text-center py-8 text-[var(--gray)]">
              <ThumbsUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhuma resposta registrada</p>
              <p className="text-sm">Clique em "Adicionar" para comecar</p>
            </div>
          )}
        </div>

        {/* Escala Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Escala NPS</h2>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-10 rounded flex items-center justify-center text-sm font-semibold"
                style={{
                  backgroundColor: getCorNota(i),
                  color: i <= 6 ? 'white' : 'black'
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex text-xs text-[var(--gray)]">
            <div className="flex-1 text-left">Detratores (0-6)</div>
            <div className="flex-1 text-center">Neutros (7-8)</div>
            <div className="flex-1 text-right">Promotores (9-10)</div>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Melhorar seu NPS</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Converta Neutros em Promotores</h4>
              <p>Neutros sao oportunidades. Pergunte o que falta para darem 9 ou 10.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Resolva Detratores Rapido</h4>
              <p>Entre em contato imediatamente. Um detrator conta para 10 pessoas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Feche o Loop</h4>
              <p>Sempre responda ao feedback. Clientes querem ser ouvidos.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Meca Regularmente</h4>
              <p>NPS deve ser medido continuamente, nao apenas uma vez por ano.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
