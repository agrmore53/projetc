'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Objetivo {
  id: string
  titulo: string
  metrica: string
  valorAtual: string
  valorMeta: string
  prazo: string
  status: 'nao_iniciado' | 'em_andamento' | 'concluido' | 'atrasado'
}

export default function SuccessPlanPage() {
  const [copied, setCopied] = useState(false)

  const [plan, setPlan] = useState({
    cliente: '',
    csm: '',
    dataInicio: '',
    dataRevisao: '',
    visaoGeral: '',
    objetivos: [
      { id: '1', titulo: 'Aumentar adocao do produto', metrica: 'DAU/MAU', valorAtual: '30%', valorMeta: '60%', prazo: '', status: 'em_andamento' as const },
      { id: '2', titulo: 'Reduzir tempo de onboarding', metrica: 'Dias ate first value', valorAtual: '14 dias', valorMeta: '7 dias', prazo: '', status: 'nao_iniciado' as const },
    ],
    marcos: '',
    riscos: '',
    recursos: '',
    proximosPassos: ''
  })

  const statusOptions = [
    { value: 'nao_iniciado', label: 'Nao Iniciado', cor: 'bg-gray-500' },
    { value: 'em_andamento', label: 'Em Andamento', cor: 'bg-blue-500' },
    { value: 'concluido', label: 'Concluido', cor: 'bg-green-500' },
    { value: 'atrasado', label: 'Atrasado', cor: 'bg-red-500' },
  ]

  const adicionarObjetivo = () => {
    setPlan({
      ...plan,
      objetivos: [...plan.objetivos, {
        id: Date.now().toString(),
        titulo: '',
        metrica: '',
        valorAtual: '',
        valorMeta: '',
        prazo: '',
        status: 'nao_iniciado'
      }]
    })
  }

  const removerObjetivo = (id: string) => {
    setPlan({
      ...plan,
      objetivos: plan.objetivos.filter(o => o.id !== id)
    })
  }

  const atualizarObjetivo = (id: string, campo: keyof Objetivo, valor: string) => {
    setPlan({
      ...plan,
      objetivos: plan.objetivos.map(o =>
        o.id === id ? { ...o, [campo]: valor } : o
      )
    })
  }

  const gerarSuccessPlan = () => {
    return `
═══════════════════════════════════════════════════════════════
                    SUCCESS PLAN
═══════════════════════════════════════════════════════════════

INFORMACOES GERAIS
─────────────────────────────────────────────────────────────
Cliente: ${plan.cliente || '[Nome do Cliente]'}
Customer Success Manager: ${plan.csm || '[CSM]'}
Data de Inicio: ${plan.dataInicio || '[Data]'}
Proxima Revisao: ${plan.dataRevisao || '[Data]'}

VISAO GERAL
─────────────────────────────────────────────────────────────
${plan.visaoGeral || '[Descreva a visao de sucesso para este cliente]'}

OBJETIVOS DE SUCESSO
─────────────────────────────────────────────────────────────
${plan.objetivos.map((o, i) => `
Objetivo ${i + 1}: ${o.titulo || '[Titulo]'}
  Metrica: ${o.metrica || '[Metrica]'}
  Valor Atual: ${o.valorAtual || '[Atual]'}
  Meta: ${o.valorMeta || '[Meta]'}
  Prazo: ${o.prazo || '[Prazo]'}
  Status: ${statusOptions.find(s => s.value === o.status)?.label || 'N/A'}
`).join('')}

MARCOS IMPORTANTES
─────────────────────────────────────────────────────────────
${plan.marcos || `[ ] Marco 1 - [Data]
[ ] Marco 2 - [Data]
[ ] Marco 3 - [Data]`}

RISCOS E MITIGACOES
─────────────────────────────────────────────────────────────
${plan.riscos || `Risco 1: [Descricao]
  Mitigacao: [Acao]

Risco 2: [Descricao]
  Mitigacao: [Acao]`}

RECURSOS NECESSARIOS
─────────────────────────────────────────────────────────────
${plan.recursos || `- [Recurso 1]
- [Recurso 2]`}

PROXIMOS PASSOS
─────────────────────────────────────────────────────────────
${plan.proximosPassos || `1. [Acao] - Responsavel: [Nome] - Prazo: [Data]
2. [Acao] - Responsavel: [Nome] - Prazo: [Data]`}

═══════════════════════════════════════════════════════════════
Documento criado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarSuccessPlan = () => {
    navigator.clipboard.writeText(gerarSuccessPlan())
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
            <Target className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Success Plan</span>
          </h1>
          <p className="text-[var(--gray)]">Plano de sucesso do cliente</p>
        </div>

        {/* Info Gerais */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes Gerais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Cliente</label>
              <input
                type="text"
                value={plan.cliente}
                onChange={(e) => setPlan({ ...plan, cliente: e.target.value })}
                className="input-field"
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="input-label">CSM Responsavel</label>
              <input
                type="text"
                value={plan.csm}
                onChange={(e) => setPlan({ ...plan, csm: e.target.value })}
                className="input-field"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="input-label">Data de Inicio</label>
              <input
                type="date"
                value={plan.dataInicio}
                onChange={(e) => setPlan({ ...plan, dataInicio: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Proxima Revisao</label>
              <input
                type="date"
                value={plan.dataRevisao}
                onChange={(e) => setPlan({ ...plan, dataRevisao: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="input-label">Visao de Sucesso</label>
            <textarea
              value={plan.visaoGeral}
              onChange={(e) => setPlan({ ...plan, visaoGeral: e.target.value })}
              className="input-field min-h-[80px]"
              placeholder="O que significa sucesso para este cliente? Qual resultado queremos alcançar?"
            />
          </div>
        </div>

        {/* Objetivos */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Objetivos de Sucesso</h2>
            <button onClick={adicionarObjetivo} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          <div className="space-y-4">
            {plan.objetivos.map((objetivo, index) => (
              <div key={objetivo.id} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[var(--gold)] font-display">Objetivo {index + 1}</span>
                  <button onClick={() => removerObjetivo(objetivo.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={objetivo.titulo}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'titulo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Titulo do objetivo"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Metrica</label>
                    <input
                      type="text"
                      value={objetivo.metrica}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'metrica', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: NPS, DAU, Tickets"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Prazo</label>
                    <input
                      type="date"
                      value={objetivo.prazo}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'prazo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-[var(--gray)]">Valor Atual</label>
                    <input
                      type="text"
                      value={objetivo.valorAtual}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'valorAtual', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="30%"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Meta</label>
                    <input
                      type="text"
                      value={objetivo.valorMeta}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'valorMeta', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="60%"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Status</label>
                    <select
                      value={objetivo.status}
                      onChange={(e) => atualizarObjetivo(objetivo.id, 'status', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    >
                      {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marcos e Riscos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Planejamento</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Marcos Importantes</label>
              <textarea
                value={plan.marcos}
                onChange={(e) => setPlan({ ...plan, marcos: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="[ ] Marco 1 - Data&#10;[ ] Marco 2 - Data"
              />
            </div>
            <div>
              <label className="input-label">Riscos e Mitigacoes</label>
              <textarea
                value={plan.riscos}
                onChange={(e) => setPlan({ ...plan, riscos: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="Risco 1: [Descricao]&#10;Mitigacao: [Acao]"
              />
            </div>
            <div>
              <label className="input-label">Recursos Necessarios</label>
              <textarea
                value={plan.recursos}
                onChange={(e) => setPlan({ ...plan, recursos: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="- Treinamento adicional&#10;- Suporte tecnico"
              />
            </div>
            <div>
              <label className="input-label">Proximos Passos</label>
              <textarea
                value={plan.proximosPassos}
                onChange={(e) => setPlan({ ...plan, proximosPassos: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="1. [Acao] - Responsavel - Prazo"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarSuccessPlan} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Success Plan'}
          </button>
        </div>
      </div>
    </main>
  )
}
