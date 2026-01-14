'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Copy, Check, Download, Users, Target, Phone, Mail, DollarSign, BarChart3, Shield } from 'lucide-react'

interface PlaybookSection {
  titulo: string
  icone: React.ReactNode
  conteudo: string[]
}

export default function PlaybookPage() {
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState(1)
  const [playbook, setPlaybook] = useState<PlaybookSection[] | null>(null)
  const [formData, setFormData] = useState({
    empresa: '',
    produto: '',
    ticketMedio: '',
    cicloVenda: '',
    avatar: '',
    problema: '',
    solucao: '',
    diferenciais: '',
    objecoes: '',
    concorrentes: ''
  })

  const gerarPlaybook = () => {
    const sections: PlaybookSection[] = [
      {
        titulo: '1. Visão Geral',
        icone: <Target className="w-5 h-5" />,
        conteudo: [
          `**Empresa:** ${formData.empresa}`,
          `**Produto/Serviço:** ${formData.produto}`,
          `**Ticket Médio:** ${formData.ticketMedio}`,
          `**Ciclo de Venda:** ${formData.cicloVenda}`,
          '',
          '**Missão de Vendas:**',
          `Ajudar ${formData.avatar} a resolver ${formData.problema} através de ${formData.solucao}.`
        ]
      },
      {
        titulo: '2. Perfil do Cliente Ideal (ICP)',
        icone: <Users className="w-5 h-5" />,
        conteudo: [
          `**Avatar:** ${formData.avatar}`,
          '',
          '**Características:**',
          '• Enfrenta o problema diariamente',
          '• Tem budget para investir na solução',
          '• Tem autoridade para tomar decisão',
          '• Tem urgência para resolver',
          '',
          '**Sinais de Qualificação:**',
          '✅ Mencionou o problema espontaneamente',
          '✅ Já tentou outras soluções',
          '✅ Perguntou sobre preço/condições',
          '✅ Tem prazo definido para resolver'
        ]
      },
      {
        titulo: '3. Proposta de Valor',
        icone: <DollarSign className="w-5 h-5" />,
        conteudo: [
          '**Problema que Resolvemos:**',
          formData.problema,
          '',
          '**Nossa Solução:**',
          formData.solucao,
          '',
          '**Diferenciais Competitivos:**',
          ...formData.diferenciais.split(',').map(d => `• ${d.trim()}`),
          '',
          '**Pitch de Elevador (30 segundos):**',
          `"Nós ajudamos ${formData.avatar} que sofre com ${formData.problema}. Diferente de outras soluções, nós ${formData.diferenciais.split(',')[0]?.trim()}. Nossos clientes conseguem ${formData.solucao} em tempo recorde."`
        ]
      },
      {
        titulo: '4. Processo de Vendas',
        icone: <BarChart3 className="w-5 h-5" />,
        conteudo: [
          '**Etapa 1: Prospecção**',
          '• Identificar leads que se encaixam no ICP',
          '• Pesquisar empresa e decisor antes do contato',
          '• Preparar abordagem personalizada',
          '',
          '**Etapa 2: Conexão**',
          '• Primeiro contato (cold call, email, LinkedIn)',
          '• Objetivo: agendar reunião de qualificação',
          '• Tempo máximo: 5 minutos',
          '',
          '**Etapa 3: Qualificação (BANT)**',
          '• Budget: Tem orçamento?',
          '• Authority: É o decisor?',
          '• Need: Tem necessidade real?',
          '• Timeline: Tem urgência?',
          '',
          '**Etapa 4: Apresentação/Demo**',
          '• Apresentar solução focada na dor do cliente',
          '• Mostrar cases de sucesso similares',
          '• Responder objeções com confiança',
          '',
          '**Etapa 5: Proposta**',
          '• Enviar proposta em até 24h',
          '• Incluir 2-3 opções de planos',
          '• Definir prazo de validade',
          '',
          '**Etapa 6: Negociação**',
          '• Foco em valor, não em preço',
          '• Usar técnicas de fechamento',
          '• Tratar objeções finais',
          '',
          '**Etapa 7: Fechamento**',
          '• Confirmar todos os termos',
          '• Coletar assinatura/pagamento',
          '• Passar para CS/Onboarding'
        ]
      },
      {
        titulo: '5. Scripts de Abordagem',
        icone: <Phone className="w-5 h-5" />,
        conteudo: [
          '**Cold Call - Abertura:**',
          `"Olá [NOME], aqui é [SEU NOME] da ${formData.empresa}. Peguei você em um momento ruim?"`,
          '',
          `"O motivo da ligação é que trabalhamos com ${formData.avatar} que enfrentam ${formData.problema}. Isso é algo que vocês também vivenciam?"`,
          '',
          '**Email de Prospecção:**',
          'Assunto: [NOME], pergunta rápida sobre [PROBLEMA]',
          '',
          `"Olá [NOME],`,
          '',
          `Vi que a [EMPRESA DELE] está [contexto relevante].`,
          '',
          `Trabalho com ${formData.avatar} que enfrentam ${formData.problema} e conseguimos ajudá-los a ${formData.solucao}.`,
          '',
          'Faz sentido uma conversa de 15 minutos essa semana?',
          '',
          `[SEU NOME]"`,
          '',
          '**LinkedIn - Conexão:**',
          `"Olá [NOME], vi seu perfil e percebi que você trabalha com [ÁREA]. Estou conectando com profissionais do setor que buscam ${formData.solucao}. Aceita a conexão?"`
        ]
      },
      {
        titulo: '6. Tratamento de Objeções',
        icone: <Shield className="w-5 h-5" />,
        conteudo: [
          '**Objeções Comuns:**',
          ...formData.objecoes.split(',').map((obj, i) => `${i + 1}. "${obj.trim()}"`),
          '',
          '**Framework de Resposta (LAER):**',
          '• **L**isten: Ouça completamente',
          '• **A**cknowledge: Reconheça a preocupação',
          '• **E**xplore: Explore o motivo real',
          '• **R**espond: Responda com valor',
          '',
          '**Exemplo:**',
          '"Está caro"',
          '→ "Entendo sua preocupação com o investimento. Me conta: quanto vocês estão perdendo hoje com esse problema? [esperar] Então em 12 meses são R$X. Nosso investimento se paga em Y meses."'
        ]
      },
      {
        titulo: '7. Análise Competitiva',
        icone: <Target className="w-5 h-5" />,
        conteudo: [
          '**Principais Concorrentes:**',
          ...formData.concorrentes.split(',').map(c => `• ${c.trim()}`),
          '',
          '**Nossos Diferenciais:**',
          ...formData.diferenciais.split(',').map(d => `✅ ${d.trim()}`),
          '',
          '**Quando o cliente menciona concorrente:**',
          '"Conheço o [CONCORRENTE]. Eles fazem um bom trabalho em [reconhecer algo]. A diferença é que nós [DIFERENCIAL PRINCIPAL]. Para o seu cenário específico, isso significa [BENEFÍCIO CONCRETO]."'
        ]
      },
      {
        titulo: '8. Métricas e Metas',
        icone: <BarChart3 className="w-5 h-5" />,
        conteudo: [
          '**KPIs de Vendas:**',
          '• Leads gerados por semana: ___',
          '• Taxa de conexão: ___%',
          '• Taxa de qualificação: ___%',
          '• Taxa de proposta enviada: ___%',
          '• Taxa de fechamento: ___%',
          '• Ticket médio: R$ ___',
          '• Ciclo médio de venda: ___ dias',
          '',
          '**Metas:**',
          '• Meta mensal de vendas: R$ ___',
          '• Meta de novos clientes: ___',
          '• Meta de reuniões: ___/semana',
          '',
          '**Atividades Diárias:**',
          '• Ligações: 30-50',
          '• E-mails: 50-100',
          '• LinkedIn: 20-30 conexões',
          '• Follow-ups: todos os pendentes'
        ]
      }
    ]

    setPlaybook(sections)
    setStep(2)
  }

  const copyToClipboard = () => {
    if (!playbook) return

    let text = `# PLAYBOOK DE VENDAS - ${formData.empresa.toUpperCase()}\n\n`
    text += `Data: ${new Date().toLocaleDateString('pt-BR')}\n\n`
    text += '---\n\n'

    playbook.forEach(section => {
      text += `## ${section.titulo}\n\n`
      section.conteudo.forEach(line => {
        text += `${line}\n`
      })
      text += '\n---\n\n'
    })

    navigator.clipboard.writeText(text)
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
            <BookOpen className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Playbook</span>
          </h1>
          <p className="text-[var(--gray)]">Documento completo do seu processo de vendas</p>
        </div>

        {step === 1 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Informações do Negócio</h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Nome da Empresa</label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    placeholder="Ex: TechSolutions"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Produto/Serviço</label>
                  <input
                    type="text"
                    value={formData.produto}
                    onChange={(e) => setFormData({...formData, produto: e.target.value})}
                    placeholder="Ex: Software de gestão"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Ticket Médio</label>
                  <input
                    type="text"
                    value={formData.ticketMedio}
                    onChange={(e) => setFormData({...formData, ticketMedio: e.target.value})}
                    placeholder="Ex: R$ 2.000/mês"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Ciclo de Venda</label>
                  <input
                    type="text"
                    value={formData.cicloVenda}
                    onChange={(e) => setFormData({...formData, cicloVenda: e.target.value})}
                    placeholder="Ex: 30 dias"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Cliente Ideal (Avatar)</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  placeholder="Ex: Donos de pequenas empresas de varejo"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Problema que você resolve</label>
                <input
                  type="text"
                  value={formData.problema}
                  onChange={(e) => setFormData({...formData, problema: e.target.value})}
                  placeholder="Ex: falta de controle financeiro e perda de vendas"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Sua Solução/Transformação</label>
                <input
                  type="text"
                  value={formData.solucao}
                  onChange={(e) => setFormData({...formData, solucao: e.target.value})}
                  placeholder="Ex: ter controle total das finanças e aumentar vendas em 30%"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Diferenciais (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.diferenciais}
                  onChange={(e) => setFormData({...formData, diferenciais: e.target.value})}
                  placeholder="Ex: Suporte 24h, Implementação em 7 dias, Sem fidelidade"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Principais Objeções (separadas por vírgula)</label>
                <input
                  type="text"
                  value={formData.objecoes}
                  onChange={(e) => setFormData({...formData, objecoes: e.target.value})}
                  placeholder="Ex: Está caro, Preciso pensar, Já tenho um sistema"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Concorrentes (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.concorrentes}
                  onChange={(e) => setFormData({...formData, concorrentes: e.target.value})}
                  placeholder="Ex: Competitor A, Competitor B, Competitor C"
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={gerarPlaybook}
              disabled={!formData.empresa || !formData.produto || !formData.avatar || !formData.problema}
              className="btn-primary w-full mt-8"
            >
              Gerar Playbook Completo
            </button>
          </div>
        )}

        {step === 2 && playbook && (
          <div className="animate-fadeInUp">
            <div className="glass card mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl gold-text">Playbook: {formData.empresa}</h2>
                  <p className="text-sm text-[var(--gray)]">{playbook.length} seções • Documento completo</p>
                </div>
                <button onClick={copyToClipboard} className="btn-primary flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Tudo'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {playbook.map((section, i) => (
                <div key={i} className="glass p-6">
                  <h3 className="font-display text-lg text-[var(--gold)] mb-4 flex items-center gap-2">
                    {section.icone}
                    {section.titulo}
                  </h3>
                  <div className="space-y-1 text-[var(--gray)]">
                    {section.conteudo.map((line, j) => (
                      <p key={j} className={`${
                        line.startsWith('**') ? 'font-semibold text-white mt-3' :
                        line.startsWith('•') || line.startsWith('✅') ? 'pl-4' :
                        line.startsWith('→') ? 'pl-4 italic' :
                        ''
                      }`}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Editar Informações
              </button>
              <button onClick={() => { setStep(1); setPlaybook(null) }} className="btn-secondary">
                Novo Playbook
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
