'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Copy, Check, Plus, Trash2, GripVertical, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Passo {
  id: string
  acao: string
  responsavel: string
  tempo: string
  observacoes: string
}

interface SOP {
  titulo: string
  objetivo: string
  escopo: string
  prerequisitos: string[]
  passos: Passo[]
  checklistFinal: string[]
  observacoesGerais: string
}

export default function SOPPage() {
  const [copied, setCopied] = useState(false)

  const [sop, setSop] = useState<SOP>({
    titulo: '',
    objetivo: '',
    escopo: '',
    prerequisitos: [''],
    passos: [
      { id: '1', acao: '', responsavel: '', tempo: '', observacoes: '' }
    ],
    checklistFinal: [''],
    observacoesGerais: ''
  })

  const adicionarPrerequisito = () => {
    setSop({ ...sop, prerequisitos: [...sop.prerequisitos, ''] })
  }

  const removerPrerequisito = (index: number) => {
    setSop({
      ...sop,
      prerequisitos: sop.prerequisitos.filter((_, i) => i !== index)
    })
  }

  const atualizarPrerequisito = (index: number, valor: string) => {
    const novos = [...sop.prerequisitos]
    novos[index] = valor
    setSop({ ...sop, prerequisitos: novos })
  }

  const adicionarPasso = () => {
    const novo: Passo = {
      id: Date.now().toString(),
      acao: '',
      responsavel: '',
      tempo: '',
      observacoes: ''
    }
    setSop({ ...sop, passos: [...sop.passos, novo] })
  }

  const removerPasso = (id: string) => {
    setSop({
      ...sop,
      passos: sop.passos.filter(p => p.id !== id)
    })
  }

  const atualizarPasso = (id: string, campo: keyof Passo, valor: string) => {
    setSop({
      ...sop,
      passos: sop.passos.map(p =>
        p.id === id ? { ...p, [campo]: valor } : p
      )
    })
  }

  const adicionarChecklist = () => {
    setSop({ ...sop, checklistFinal: [...sop.checklistFinal, ''] })
  }

  const removerChecklist = (index: number) => {
    setSop({
      ...sop,
      checklistFinal: sop.checklistFinal.filter((_, i) => i !== index)
    })
  }

  const atualizarChecklist = (index: number, valor: string) => {
    const novos = [...sop.checklistFinal]
    novos[index] = valor
    setSop({ ...sop, checklistFinal: novos })
  }

  const tempoTotal = () => {
    let minutos = 0
    sop.passos.forEach(p => {
      const match = p.tempo.match(/(\d+)/)
      if (match) {
        const valor = parseInt(match[1])
        if (p.tempo.toLowerCase().includes('h')) {
          minutos += valor * 60
        } else {
          minutos += valor
        }
      }
    })
    if (minutos >= 60) {
      const horas = Math.floor(minutos / 60)
      const mins = minutos % 60
      return `${horas}h${mins > 0 ? ` ${mins}min` : ''}`
    }
    return `${minutos}min`
  }

  const copiarSOP = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    STANDARD OPERATING PROCEDURE
═══════════════════════════════════════════════════════════════

TITULO: ${sop.titulo || '[TITULO DO PROCESSO]'}

OBJETIVO
───────────────────────────────────────────────────────────────
${sop.objetivo || '[Descreva o objetivo deste procedimento]'}

ESCOPO
───────────────────────────────────────────────────────────────
${sop.escopo || '[Quando e onde este procedimento se aplica]'}

PRE-REQUISITOS
───────────────────────────────────────────────────────────────
${sop.prerequisitos.filter(p => p).map(p => `□ ${p}`).join('\n') || '□ [Nenhum pre-requisito definido]'}

PROCEDIMENTO PASSO-A-PASSO
───────────────────────────────────────────────────────────────
${sop.passos.map((p, i) => `
PASSO ${i + 1}: ${p.acao || '[Acao]'}
├─ Responsavel: ${p.responsavel || '[Quem]'}
├─ Tempo estimado: ${p.tempo || '[Tempo]'}
${p.observacoes ? `└─ Obs: ${p.observacoes}` : ''}
`).join('')}

TEMPO TOTAL ESTIMADO: ${tempoTotal()}

CHECKLIST DE VERIFICACAO
───────────────────────────────────────────────────────────────
${sop.checklistFinal.filter(c => c).map(c => `□ ${c}`).join('\n') || '□ [Nenhum item de verificacao]'}

OBSERVACOES GERAIS
───────────────────────────────────────────────────────────────
${sop.observacoesGerais || '[Observacoes adicionais]'}

═══════════════════════════════════════════════════════════════
Versao: 1.0 | Criado em: ${new Date().toLocaleDateString('pt-BR')}
Revisao: [Data da proxima revisao]
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Templates prontos
  const aplicarTemplate = (tipo: string) => {
    const templates: Record<string, Partial<SOP>> = {
      onboarding: {
        titulo: 'Onboarding de Novo Cliente',
        objetivo: 'Garantir que novos clientes tenham uma experiencia de integracao suave e completa',
        escopo: 'Aplica-se a todos os novos clientes apos assinatura do contrato',
        prerequisitos: ['Contrato assinado', 'Pagamento confirmado', 'Acesso ao sistema criado'],
        passos: [
          { id: '1', acao: 'Enviar e-mail de boas-vindas com credenciais', responsavel: 'CS', tempo: '5min', observacoes: 'Usar template padrao' },
          { id: '2', acao: 'Agendar call de kickoff', responsavel: 'CS', tempo: '10min', observacoes: 'Idealmente em ate 48h' },
          { id: '3', acao: 'Realizar call de kickoff e treinamento inicial', responsavel: 'CS', tempo: '60min', observacoes: 'Gravar sessao' },
          { id: '4', acao: 'Configurar conta conforme necessidades', responsavel: 'Suporte', tempo: '30min', observacoes: '' },
          { id: '5', acao: 'Enviar materiais de apoio e documentacao', responsavel: 'CS', tempo: '5min', observacoes: '' },
          { id: '6', acao: 'Follow-up apos 7 dias', responsavel: 'CS', tempo: '15min', observacoes: 'Verificar adocao' }
        ],
        checklistFinal: ['Cliente consegue logar', 'Treinamento realizado', 'Duvidas iniciais sanadas', 'Proximo contato agendado'],
        observacoesGerais: 'Escalar para gerente se cliente demonstrar insatisfacao'
      },
      vendas: {
        titulo: 'Processo de Venda Consultiva',
        objetivo: 'Padronizar o processo de vendas para aumentar conversao e previsibilidade',
        escopo: 'Todos os leads qualificados pelo time de SDR',
        prerequisitos: ['Lead qualificado (BANT)', 'CRM atualizado', 'Historico de interacoes documentado'],
        passos: [
          { id: '1', acao: 'Revisar informacoes do lead no CRM', responsavel: 'Vendedor', tempo: '10min', observacoes: '' },
          { id: '2', acao: 'Call de discovery - entender dores e objetivos', responsavel: 'Vendedor', tempo: '30min', observacoes: 'Usar roteiro SPIN' },
          { id: '3', acao: 'Preparar proposta personalizada', responsavel: 'Vendedor', tempo: '45min', observacoes: '' },
          { id: '4', acao: 'Apresentar solucao e proposta', responsavel: 'Vendedor', tempo: '45min', observacoes: 'Demo inclusa' },
          { id: '5', acao: 'Negociacao e tratamento de objecoes', responsavel: 'Vendedor', tempo: '30min', observacoes: '' },
          { id: '6', acao: 'Fechamento e envio de contrato', responsavel: 'Vendedor', tempo: '15min', observacoes: '' }
        ],
        checklistFinal: ['Proposta enviada', 'Follow-up agendado', 'CRM atualizado', 'Gerente informado se deal grande'],
        observacoesGerais: 'Deals acima de R$50k precisam de aprovacao do gerente'
      },
      suporte: {
        titulo: 'Atendimento de Ticket de Suporte',
        objetivo: 'Resolver solicitacoes de suporte de forma eficiente e satisfatoria',
        escopo: 'Todos os tickets abertos via chat, email ou telefone',
        prerequisitos: ['Acesso ao sistema de tickets', 'Base de conhecimento disponivel'],
        passos: [
          { id: '1', acao: 'Ler ticket e categorizar por tipo/urgencia', responsavel: 'Suporte N1', tempo: '2min', observacoes: '' },
          { id: '2', acao: 'Verificar base de conhecimento para solucao', responsavel: 'Suporte N1', tempo: '5min', observacoes: '' },
          { id: '3', acao: 'Tentar resolucao de primeiro nivel', responsavel: 'Suporte N1', tempo: '15min', observacoes: '' },
          { id: '4', acao: 'Escalar para N2 se nao resolvido', responsavel: 'Suporte N1', tempo: '2min', observacoes: 'Documentar tentativas' },
          { id: '5', acao: 'Comunicar resolucao ao cliente', responsavel: 'Suporte', tempo: '5min', observacoes: '' },
          { id: '6', acao: 'Documentar solucao na base de conhecimento', responsavel: 'Suporte', tempo: '5min', observacoes: 'Se for caso novo' }
        ],
        checklistFinal: ['Ticket resolvido', 'Cliente confirmou resolucao', 'Documentacao atualizada', 'SLA cumprido'],
        observacoesGerais: 'Tickets criticos devem ser tratados em ate 1h'
      }
    }

    if (templates[tipo]) {
      setSop({ ...sop, ...templates[tipo] } as SOP)
    }
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
            Gerador de <span className="gold-text">SOP</span>
          </h1>
          <p className="text-[var(--gray)]">Standard Operating Procedures para sua operacao</p>
        </div>

        {/* Templates */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Templates Prontos</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => aplicarTemplate('onboarding')}
              className="btn-secondary text-sm"
            >
              Onboarding Cliente
            </button>
            <button
              onClick={() => aplicarTemplate('vendas')}
              className="btn-secondary text-sm"
            >
              Processo de Vendas
            </button>
            <button
              onClick={() => aplicarTemplate('suporte')}
              className="btn-secondary text-sm"
            >
              Atendimento Suporte
            </button>
          </div>
        </div>

        {/* Info Basica */}
        <div className="glass card mb-8">
          <div className="space-y-4">
            <div>
              <label className="input-label">Titulo do Procedimento</label>
              <input
                type="text"
                value={sop.titulo}
                onChange={(e) => setSop({ ...sop, titulo: e.target.value })}
                placeholder="Ex: Processo de Onboarding de Novos Clientes"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Objetivo</label>
              <textarea
                value={sop.objetivo}
                onChange={(e) => setSop({ ...sop, objetivo: e.target.value })}
                placeholder="Por que este procedimento existe? O que ele garante?"
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Escopo</label>
              <input
                type="text"
                value={sop.escopo}
                onChange={(e) => setSop({ ...sop, escopo: e.target.value })}
                placeholder="Quando e onde este procedimento se aplica?"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Pre-requisitos */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Pre-requisitos
            </h2>
            <button onClick={adicionarPrerequisito} className="text-[var(--gold)] hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {sop.prerequisitos.map((prereq, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-yellow-400 mt-2">□</span>
                <input
                  type="text"
                  value={prereq}
                  onChange={(e) => atualizarPrerequisito(i, e.target.value)}
                  placeholder="O que precisa estar pronto antes?"
                  className="input-field flex-1 text-sm"
                />
                {sop.prerequisitos.length > 1 && (
                  <button onClick={() => removerPrerequisito(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Passos */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg">Procedimento Passo-a-Passo</h2>
              <p className="text-sm text-[var(--gray)]">Tempo total estimado: <span className="text-[var(--gold)]">{tempoTotal()}</span></p>
            </div>
            <button onClick={adicionarPasso} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar Passo
            </button>
          </div>

          <div className="space-y-4">
            {sop.passos.map((passo, index) => (
              <div key={passo.id} className="bg-black/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={passo.acao}
                      onChange={(e) => atualizarPasso(passo.id, 'acao', e.target.value)}
                      placeholder="Descreva a acao deste passo..."
                      className="input-field font-semibold"
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[var(--gray)]" />
                        <input
                          type="text"
                          value={passo.responsavel}
                          onChange={(e) => atualizarPasso(passo.id, 'responsavel', e.target.value)}
                          placeholder="Responsavel"
                          className="input-field text-sm flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--gray)]" />
                        <input
                          type="text"
                          value={passo.tempo}
                          onChange={(e) => atualizarPasso(passo.id, 'tempo', e.target.value)}
                          placeholder="Ex: 15min, 1h"
                          className="input-field text-sm flex-1"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={passo.observacoes}
                      onChange={(e) => atualizarPasso(passo.id, 'observacoes', e.target.value)}
                      placeholder="Observacoes adicionais (opcional)"
                      className="input-field text-sm text-[var(--gray)]"
                    />
                  </div>
                  {sop.passos.length > 1 && (
                    <button onClick={() => removerPasso(passo.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist Final */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Checklist de Verificacao
            </h2>
            <button onClick={adicionarChecklist} className="text-[var(--gold)] hover:opacity-80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            {sop.checklistFinal.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-green-400 mt-2">□</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => atualizarChecklist(i, e.target.value)}
                  placeholder="O que deve ser verificado ao final?"
                  className="input-field flex-1 text-sm"
                />
                {sop.checklistFinal.length > 1 && (
                  <button onClick={() => removerChecklist(i)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Observacoes */}
        <div className="glass card mb-8">
          <label className="input-label">Observacoes Gerais</label>
          <textarea
            value={sop.observacoesGerais}
            onChange={(e) => setSop({ ...sop, observacoesGerais: e.target.value })}
            placeholder="Excecoes, alertas importantes, quando escalar..."
            className="input-field min-h-[100px]"
          />
        </div>

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarSOP} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'SOP Copiado!' : 'Copiar SOP Completo'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para SOPs Efetivos</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Seja Especifico</h4>
              <p>Evite ambiguidade. "Enviar email" e vago. "Enviar email usando template X para o contato principal" e claro.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Defina Responsaveis</h4>
              <p>Cada passo deve ter um dono claro. Sem dono = ninguem faz.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Revise Regularmente</h4>
              <p>SOPs desatualizados sao piores que nenhum SOP. Revise trimestralmente.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Treine a Equipe</h4>
              <p>Um SOP so funciona se todos conhecem e seguem. Faca onboarding dos processos.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
