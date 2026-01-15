'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, UserCheck, Copy, Check } from 'lucide-react'

export default function ReativacaoPage() {
  const [copied, setCopied] = useState(false)

  const [playbook, setPlaybook] = useState({
    segmento: 'inativos_30',
    nomeCliente: '',
    ultimaInteracao: '',
    motivoInatividade: '',
    valorContrato: '',
    diasInativo: '',
    ofertaReativacao: '',
    descontoOferecido: '',
    canalContato: 'email',
    sequencia: [
      { dia: 1, acao: 'Email de reengajamento', status: 'pendente' },
      { dia: 3, acao: 'Follow-up por WhatsApp', status: 'pendente' },
      { dia: 7, acao: 'Ligacao do CS', status: 'pendente' },
      { dia: 14, acao: 'Email com oferta especial', status: 'pendente' },
      { dia: 21, acao: 'Ultima tentativa + desconto', status: 'pendente' },
    ]
  })

  const segmentos = [
    { value: 'inativos_30', label: 'Inativos 30+ dias' },
    { value: 'inativos_60', label: 'Inativos 60+ dias' },
    { value: 'inativos_90', label: 'Inativos 90+ dias' },
    { value: 'cancelados', label: 'Cancelados' },
    { value: 'downgrade', label: 'Downgrade recente' },
  ]

  const motivosInatividade = [
    'Nao utiliza o produto',
    'Mudanca de prioridades',
    'Problemas tecnicos',
    'Preco/Orcamento',
    'Foi para concorrente',
    'Fechou a empresa',
    'Mudanca de equipe',
    'Outro'
  ]

  const canais = [
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'telefone', label: 'Telefone' },
    { value: 'linkedin', label: 'LinkedIn' },
  ]

  const atualizarSequencia = (index: number, campo: 'acao' | 'status', valor: string) => {
    setPlaybook({
      ...playbook,
      sequencia: playbook.sequencia.map((s, i) =>
        i === index ? { ...s, [campo]: valor } : s
      )
    })
  }

  const gerarPlaybook = () => {
    const segmentoLabel = segmentos.find(s => s.value === playbook.segmento)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
              PLAYBOOK DE REATIVACAO
═══════════════════════════════════════════════════════════════

INFORMACOES DO CLIENTE
─────────────────────────────────────────────────────────────
Cliente: ${playbook.nomeCliente || '[Nome do Cliente]'}
Segmento: ${segmentoLabel}
Dias Inativo: ${playbook.diasInativo || 'XX'} dias
Ultima Interacao: ${playbook.ultimaInteracao || '[Data]'}
Valor do Contrato: ${playbook.valorContrato || 'R$ X.XXX'}

DIAGNOSTICO
─────────────────────────────────────────────────────────────
Motivo da Inatividade: ${playbook.motivoInatividade || '[A identificar]'}

ESTRATEGIA DE REATIVACAO
─────────────────────────────────────────────────────────────
Canal Principal: ${canais.find(c => c.value === playbook.canalContato)?.label}
Oferta de Reativacao: ${playbook.ofertaReativacao || '[Definir oferta]'}
Desconto Oferecido: ${playbook.descontoOferecido || 'XX%'}

SEQUENCIA DE CONTATOS
─────────────────────────────────────────────────────────────
${playbook.sequencia.map(s => `Dia ${s.dia.toString().padStart(2, '0')}: [${s.status.toUpperCase()}] ${s.acao}`).join('\n')}

SCRIPTS SUGERIDOS
─────────────────────────────────────────────────────────────

📧 EMAIL DIA 1 - REENGAJAMENTO
Assunto: Sentimos sua falta, ${playbook.nomeCliente || '[Nome]'}!

Ola!

Percebi que faz um tempo que voce nao acessa sua conta.
Gostaria de saber se esta tudo bem e como posso ajudar.

Temos novidades que podem ser interessantes para voce:
• [Novidade 1]
• [Novidade 2]

Posso agendar uma ligacao rapida para conversarmos?

Abracos,
[Seu nome]

📱 WHATSAPP DIA 3 - FOLLOW UP
Oi ${playbook.nomeCliente || '[Nome]'}! Tudo bem?

Enviei um email ha alguns dias, nao sei se chegou a ver.

Queria entender como posso ajudar voce a aproveitar melhor nossa plataforma.

Tem 15 minutinhos para uma conversa?

💰 EMAIL DIA 14 - OFERTA ESPECIAL
Assunto: Presente especial para voce voltar!

${playbook.nomeCliente || '[Nome]'},

Queremos muito te ver de volta!

Por isso, preparamos uma oferta exclusiva:
${playbook.ofertaReativacao || '[Oferta especial]'}

Esta oferta e valida apenas por 7 dias.

[CTA: Quero aproveitar]

METRICAS DE ACOMPANHAMENTO
─────────────────────────────────────────────────────────────
[ ] Taxa de abertura de emails
[ ] Taxa de resposta
[ ] Reunioes agendadas
[ ] Clientes reativados
[ ] Valor recuperado

═══════════════════════════════════════════════════════════════
Playbook criado em: ${new Date().toLocaleDateString('pt-BR')}
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
            <UserCheck className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Playbook de <span className="gold-text">Reativacao</span>
          </h1>
          <p className="text-[var(--gray)]">Recupere clientes inativos</p>
        </div>

        {/* Cliente */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes do Cliente</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Nome do Cliente</label>
              <input
                type="text"
                value={playbook.nomeCliente}
                onChange={(e) => setPlaybook({ ...playbook, nomeCliente: e.target.value })}
                className="input-field"
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="input-label">Segmento</label>
              <select
                value={playbook.segmento}
                onChange={(e) => setPlaybook({ ...playbook, segmento: e.target.value })}
                className="input-field"
              >
                {segmentos.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Dias Inativo</label>
              <input
                type="number"
                value={playbook.diasInativo}
                onChange={(e) => setPlaybook({ ...playbook, diasInativo: e.target.value })}
                className="input-field"
                placeholder="30"
              />
            </div>
            <div>
              <label className="input-label">Ultima Interacao</label>
              <input
                type="date"
                value={playbook.ultimaInteracao}
                onChange={(e) => setPlaybook({ ...playbook, ultimaInteracao: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Valor do Contrato</label>
              <input
                type="text"
                value={playbook.valorContrato}
                onChange={(e) => setPlaybook({ ...playbook, valorContrato: e.target.value })}
                className="input-field"
                placeholder="R$ 1.000/mes"
              />
            </div>
            <div>
              <label className="input-label">Motivo Inatividade</label>
              <select
                value={playbook.motivoInatividade}
                onChange={(e) => setPlaybook({ ...playbook, motivoInatividade: e.target.value })}
                className="input-field"
              >
                <option value="">Selecione</option>
                {motivosInatividade.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Estrategia */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Estrategia de Reativacao</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Canal Principal</label>
              <select
                value={playbook.canalContato}
                onChange={(e) => setPlaybook({ ...playbook, canalContato: e.target.value })}
                className="input-field"
              >
                {canais.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Oferta de Reativacao</label>
              <input
                type="text"
                value={playbook.ofertaReativacao}
                onChange={(e) => setPlaybook({ ...playbook, ofertaReativacao: e.target.value })}
                className="input-field"
                placeholder="1 mes gratis, upgrade..."
              />
            </div>
            <div>
              <label className="input-label">Desconto Oferecido</label>
              <input
                type="text"
                value={playbook.descontoOferecido}
                onChange={(e) => setPlaybook({ ...playbook, descontoOferecido: e.target.value })}
                className="input-field"
                placeholder="20%"
              />
            </div>
          </div>
        </div>

        {/* Sequencia */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Sequencia de Contatos</h2>
          <div className="space-y-3">
            {playbook.sequencia.map((seq, index) => (
              <div key={index} className="flex items-center gap-4 bg-black/20 rounded-xl p-3">
                <div className="text-[var(--gold)] font-display w-16">Dia {seq.dia}</div>
                <input
                  type="text"
                  value={seq.acao}
                  onChange={(e) => atualizarSequencia(index, 'acao', e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 flex-1"
                />
                <select
                  value={seq.status}
                  onChange={(e) => atualizarSequencia(index, 'status', e.target.value)}
                  className={`bg-black/30 border rounded px-3 py-2 w-32 ${
                    seq.status === 'concluido' ? 'border-green-500 text-green-400' :
                    seq.status === 'em_andamento' ? 'border-yellow-500 text-yellow-400' :
                    'border-white/10'
                  }`}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="concluido">Concluido</option>
                </select>
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
          <h3 className="font-display text-lg gold-text mb-4">Melhores Praticas</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Timing</h4>
              <ul className="space-y-1">
                <li>• Agir rapido (30 dias)</li>
                <li>• Persistencia sem spam</li>
                <li>• Variar canais</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Abordagem</h4>
              <ul className="space-y-1">
                <li>• Personalizar mensagem</li>
                <li>• Oferecer valor real</li>
                <li>• Escutar o cliente</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Ofertas</h4>
              <ul className="space-y-1">
                <li>• Desconto temporario</li>
                <li>• Upgrade gratis</li>
                <li>• Onboarding dedicado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
