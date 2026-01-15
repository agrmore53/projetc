'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Copy, Check } from 'lucide-react'

export default function BriefingPage() {
  const [copied, setCopied] = useState(false)

  const [briefing, setBriefing] = useState({
    nomeCampanha: '',
    cliente: '',
    responsavel: '',
    dataEntrega: '',
    objetivo: 'awareness',
    publicoAlvo: '',
    mensagemPrincipal: '',
    tomVoz: 'profissional',
    canais: [] as string[],
    orcamento: '',
    periodo: '',
    referencias: '',
    restricoes: '',
    kpis: '',
    observacoes: ''
  })

  const objetivos = [
    { value: 'awareness', label: 'Awareness (Conhecimento de marca)' },
    { value: 'consideracao', label: 'Consideracao (Engajamento)' },
    { value: 'conversao', label: 'Conversao (Vendas/Leads)' },
    { value: 'retencao', label: 'Retencao (Fidelizacao)' },
    { value: 'lancamento', label: 'Lancamento de Produto' },
  ]

  const tonsVoz = [
    { value: 'profissional', label: 'Profissional e Corporativo' },
    { value: 'informal', label: 'Informal e Descontraido' },
    { value: 'inspiracional', label: 'Inspiracional e Motivacional' },
    { value: 'educativo', label: 'Educativo e Informativo' },
    { value: 'urgente', label: 'Urgente e Direto' },
  ]

  const canaisDisponiveis = ['Instagram', 'Facebook', 'LinkedIn', 'Google Ads', 'YouTube', 'TikTok', 'Email', 'Site', 'Offline']

  const toggleCanal = (canal: string) => {
    setBriefing({
      ...briefing,
      canais: briefing.canais.includes(canal)
        ? briefing.canais.filter(c => c !== canal)
        : [...briefing.canais, canal]
    })
  }

  const gerarBriefing = () => {
    const objetivoLabel = objetivos.find(o => o.value === briefing.objetivo)?.label || ''
    const tomLabel = tonsVoz.find(t => t.value === briefing.tomVoz)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
                    BRIEFING DE CAMPANHA
═══════════════════════════════════════════════════════════════

INFORMACOES GERAIS
─────────────────────────────────────────────────────────────
Nome da Campanha: ${briefing.nomeCampanha || '[Nome da Campanha]'}
Cliente: ${briefing.cliente || '[Cliente]'}
Responsavel: ${briefing.responsavel || '[Responsavel]'}
Data de Entrega: ${briefing.dataEntrega || '[Data]'}
Periodo da Campanha: ${briefing.periodo || '[Periodo]'}
Orcamento: ${briefing.orcamento || '[Orcamento]'}

OBJETIVO DA CAMPANHA
─────────────────────────────────────────────────────────────
${objetivoLabel}

PUBLICO-ALVO
─────────────────────────────────────────────────────────────
${briefing.publicoAlvo || '[Descrever o publico-alvo: idade, genero, interesses, comportamento]'}

MENSAGEM PRINCIPAL
─────────────────────────────────────────────────────────────
${briefing.mensagemPrincipal || '[Qual a mensagem que queremos transmitir?]'}

TOM DE VOZ
─────────────────────────────────────────────────────────────
${tomLabel}

CANAIS DE COMUNICACAO
─────────────────────────────────────────────────────────────
${briefing.canais.length > 0 ? briefing.canais.join(', ') : '[Selecionar canais]'}

${briefing.referencias ? `
REFERENCIAS E INSPIRACOES
─────────────────────────────────────────────────────────────
${briefing.referencias}
` : ''}

${briefing.restricoes ? `
RESTRICOES E OBRIGATORIOS
─────────────────────────────────────────────────────────────
${briefing.restricoes}
` : ''}

KPIs E METRICAS DE SUCESSO
─────────────────────────────────────────────────────────────
${briefing.kpis || '[Definir metricas de sucesso]'}

${briefing.observacoes ? `
OBSERVACOES ADICIONAIS
─────────────────────────────────────────────────────────────
${briefing.observacoes}
` : ''}

═══════════════════════════════════════════════════════════════
Briefing criado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarBriefing = () => {
    navigator.clipboard.writeText(gerarBriefing())
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
            <FileText className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Briefing</span>
          </h1>
          <p className="text-[var(--gray)]">Crie briefs profissionais para campanhas</p>
        </div>

        {/* Informacoes Gerais */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Informacoes Gerais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome da Campanha</label>
              <input
                type="text"
                value={briefing.nomeCampanha}
                onChange={(e) => setBriefing({ ...briefing, nomeCampanha: e.target.value })}
                placeholder="Ex: Black Friday 2024"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cliente</label>
              <input
                type="text"
                value={briefing.cliente}
                onChange={(e) => setBriefing({ ...briefing, cliente: e.target.value })}
                placeholder="Nome do cliente"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Responsavel</label>
              <input
                type="text"
                value={briefing.responsavel}
                onChange={(e) => setBriefing({ ...briefing, responsavel: e.target.value })}
                placeholder="Quem vai executar"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data de Entrega</label>
              <input
                type="date"
                value={briefing.dataEntrega}
                onChange={(e) => setBriefing({ ...briefing, dataEntrega: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Periodo da Campanha</label>
              <input
                type="text"
                value={briefing.periodo}
                onChange={(e) => setBriefing({ ...briefing, periodo: e.target.value })}
                placeholder="Ex: 20/11 a 30/11"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Orcamento</label>
              <input
                type="text"
                value={briefing.orcamento}
                onChange={(e) => setBriefing({ ...briefing, orcamento: e.target.value })}
                placeholder="Ex: R$ 10.000"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Estrategia */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Estrategia</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Objetivo</label>
                <select
                  value={briefing.objetivo}
                  onChange={(e) => setBriefing({ ...briefing, objetivo: e.target.value })}
                  className="input-field"
                >
                  {objetivos.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Tom de Voz</label>
                <select
                  value={briefing.tomVoz}
                  onChange={(e) => setBriefing({ ...briefing, tomVoz: e.target.value })}
                  className="input-field"
                >
                  {tonsVoz.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="input-label">Publico-Alvo</label>
              <textarea
                value={briefing.publicoAlvo}
                onChange={(e) => setBriefing({ ...briefing, publicoAlvo: e.target.value })}
                placeholder="Descreva o publico: idade, genero, interesses, comportamento..."
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Mensagem Principal</label>
              <textarea
                value={briefing.mensagemPrincipal}
                onChange={(e) => setBriefing({ ...briefing, mensagemPrincipal: e.target.value })}
                placeholder="Qual mensagem queremos transmitir?"
                className="input-field min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Canais */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Canais de Comunicacao</h2>
          <div className="flex flex-wrap gap-2">
            {canaisDisponiveis.map(canal => (
              <button
                key={canal}
                onClick={() => toggleCanal(canal)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  briefing.canais.includes(canal)
                    ? 'bg-[var(--gold)] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {canal}
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Detalhes Adicionais</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Referencias e Inspiracoes</label>
              <textarea
                value={briefing.referencias}
                onChange={(e) => setBriefing({ ...briefing, referencias: e.target.value })}
                placeholder="Links, imagens, campanhas de referencia..."
                className="input-field min-h-[60px]"
              />
            </div>
            <div>
              <label className="input-label">Restricoes e Obrigatorios</label>
              <textarea
                value={briefing.restricoes}
                onChange={(e) => setBriefing({ ...briefing, restricoes: e.target.value })}
                placeholder="O que NAO pode e o que DEVE ter..."
                className="input-field min-h-[60px]"
              />
            </div>
            <div>
              <label className="input-label">KPIs e Metricas de Sucesso</label>
              <textarea
                value={briefing.kpis}
                onChange={(e) => setBriefing({ ...briefing, kpis: e.target.value })}
                placeholder="Como vamos medir o sucesso?"
                className="input-field min-h-[60px]"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarBriefing} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Briefing'}
          </button>
        </div>
      </div>
    </main>
  )
}
