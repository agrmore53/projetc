'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface MetricaSLA {
  id: string
  nome: string
  descricao: string
  meta: string
  medicao: string
  penalidade: string
}

export default function SLAPage() {
  const [copied, setCopied] = useState(false)

  const [sla, setSla] = useState({
    fornecedor: '',
    cliente: '',
    servico: '',
    vigencia: '12',
    dataInicio: '',
    metricas: [
      { id: '1', nome: 'Disponibilidade', descricao: 'Uptime do sistema', meta: '99.9%', medicao: 'Mensal', penalidade: '5% do valor por 0.1% abaixo da meta' },
      { id: '2', nome: 'Tempo de Resposta', descricao: 'Primeira resposta a tickets', meta: '< 4 horas', medicao: 'Por ticket', penalidade: 'Credito de 1 hora de suporte' },
      { id: '3', nome: 'Tempo de Resolucao', descricao: 'Resolucao de incidentes P1', meta: '< 4 horas', medicao: 'Por incidente', penalidade: '10% do valor mensal' },
    ] as MetricaSLA[],
    exclusoes: '',
    escalacao: '',
    revisao: ''
  })

  const adicionarMetrica = () => {
    setSla({
      ...sla,
      metricas: [...sla.metricas, {
        id: Date.now().toString(),
        nome: '',
        descricao: '',
        meta: '',
        medicao: 'Mensal',
        penalidade: ''
      }]
    })
  }

  const removerMetrica = (id: string) => {
    setSla({
      ...sla,
      metricas: sla.metricas.filter(m => m.id !== id)
    })
  }

  const atualizarMetrica = (id: string, campo: keyof MetricaSLA, valor: string) => {
    setSla({
      ...sla,
      metricas: sla.metricas.map(m =>
        m.id === id ? { ...m, [campo]: valor } : m
      )
    })
  }

  const gerarSLA = () => {
    return `
ACORDO DE NIVEL DE SERVICO (SLA)
═══════════════════════════════════════════════════════════════

PARTES
─────────────────────────────────────────────────────────────
Fornecedor: ${sla.fornecedor || '[NOME DO FORNECEDOR]'}
Cliente: ${sla.cliente || '[NOME DO CLIENTE]'}
Servico: ${sla.servico || '[NOME DO SERVICO]'}

VIGENCIA
─────────────────────────────────────────────────────────────
Periodo: ${sla.vigencia} meses
Data de Inicio: ${sla.dataInicio || '[DATA]'}
Revisao: ${sla.revisao || 'Trimestral'}

═══════════════════════════════════════════════════════════════
                    METRICAS DE SLA
═══════════════════════════════════════════════════════════════

${sla.metricas.map((m, i) => `
${i + 1}. ${m.nome || '[METRICA]'}
─────────────────────────────────────────────────────────────
Descricao: ${m.descricao || '[DESCRICAO]'}
Meta: ${m.meta || '[META]'}
Medicao: ${m.medicao}
Penalidade: ${m.penalidade || '[PENALIDADE]'}
`).join('')}

═══════════════════════════════════════════════════════════════
                    NIVEIS DE PRIORIDADE
═══════════════════════════════════════════════════════════════

P1 - CRITICO
─────────────────────────────────────────────────────────────
Descricao: Sistema completamente indisponivel ou com impacto
           severo nas operacoes do cliente
Tempo de Resposta: 15 minutos
Tempo de Resolucao: 4 horas
Disponibilidade: 24x7

P2 - ALTO
─────────────────────────────────────────────────────────────
Descricao: Funcionalidade importante comprometida, com
           workaround disponivel
Tempo de Resposta: 1 hora
Tempo de Resolucao: 8 horas
Disponibilidade: Horario comercial estendido (8h-20h)

P3 - MEDIO
─────────────────────────────────────────────────────────────
Descricao: Funcionalidade secundaria afetada, impacto limitado
Tempo de Resposta: 4 horas
Tempo de Resolucao: 24 horas
Disponibilidade: Horario comercial (9h-18h)

P4 - BAIXO
─────────────────────────────────────────────────────────────
Descricao: Solicitacoes de informacao, melhorias, duvidas
Tempo de Resposta: 8 horas
Tempo de Resolucao: 72 horas
Disponibilidade: Horario comercial (9h-18h)

═══════════════════════════════════════════════════════════════
                    EXCLUSOES
═══════════════════════════════════════════════════════════════

O SLA nao se aplica nas seguintes situacoes:
${sla.exclusoes || `• Manutencoes programadas (comunicadas com 48h de antecedencia)
• Problemas causados por terceiros (ex: provedores de internet)
• Uso indevido do sistema pelo cliente
• Forca maior (desastres naturais, greves, etc.)
• Problemas no ambiente do cliente`}

═══════════════════════════════════════════════════════════════
                    MATRIZ DE ESCALACAO
═══════════════════════════════════════════════════════════════

${sla.escalacao || `Nivel 1 - Suporte Tecnico: Ate 2 horas sem resolucao
  → Escala para Nivel 2

Nivel 2 - Especialista: Ate 4 horas sem resolucao
  → Escala para Nivel 3

Nivel 3 - Gerencia Tecnica: Ate 8 horas sem resolucao
  → Escala para Diretoria

Nivel 4 - Diretoria: Incidentes criticos ou recorrentes`}

═══════════════════════════════════════════════════════════════
                    RELATORIOS
═══════════════════════════════════════════════════════════════

O fornecedor devera apresentar mensalmente:
• Relatorio de disponibilidade
• Tempo medio de resposta
• Tempo medio de resolucao
• Incidentes por prioridade
• Tendencias e acoes corretivas

═══════════════════════════════════════════════════════════════
                    REVISAO DO ACORDO
═══════════════════════════════════════════════════════════════

Este SLA sera revisado ${sla.revisao || 'trimestralmente'} ou quando houver
mudancas significativas no escopo do servico.

═══════════════════════════════════════════════════════════════
Documento gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarSLA = () => {
    navigator.clipboard.writeText(gerarSLA())
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
            <Clock className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">SLA</span>
          </h1>
          <p className="text-[var(--gray)]">Service Level Agreement</p>
        </div>

        {/* Info Gerais */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes Gerais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Fornecedor</label>
              <input
                type="text"
                value={sla.fornecedor}
                onChange={(e) => setSla({ ...sla, fornecedor: e.target.value })}
                className="input-field"
                placeholder="Nome do fornecedor"
              />
            </div>
            <div>
              <label className="input-label">Cliente</label>
              <input
                type="text"
                value={sla.cliente}
                onChange={(e) => setSla({ ...sla, cliente: e.target.value })}
                className="input-field"
                placeholder="Nome do cliente"
              />
            </div>
            <div>
              <label className="input-label">Servico</label>
              <input
                type="text"
                value={sla.servico}
                onChange={(e) => setSla({ ...sla, servico: e.target.value })}
                className="input-field"
                placeholder="Nome do servico"
              />
            </div>
            <div>
              <label className="input-label">Vigencia (meses)</label>
              <input
                type="number"
                value={sla.vigencia}
                onChange={(e) => setSla({ ...sla, vigencia: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data de Inicio</label>
              <input
                type="date"
                value={sla.dataInicio}
                onChange={(e) => setSla({ ...sla, dataInicio: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Frequencia de Revisao</label>
              <select
                value={sla.revisao}
                onChange={(e) => setSla({ ...sla, revisao: e.target.value })}
                className="input-field"
              >
                <option value="Mensal">Mensal</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Metricas de SLA</h2>
            <button onClick={adicionarMetrica} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          <div className="space-y-4">
            {sla.metricas.map((metrica, index) => (
              <div key={metrica.id} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[var(--gold)] font-display">Metrica {index + 1}</span>
                  <button onClick={() => removerMetrica(metrica.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[var(--gray)]">Nome</label>
                    <input
                      type="text"
                      value={metrica.nome}
                      onChange={(e) => atualizarMetrica(metrica.id, 'nome', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: Disponibilidade"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Meta</label>
                    <input
                      type="text"
                      value={metrica.meta}
                      onChange={(e) => atualizarMetrica(metrica.id, 'meta', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: 99.9%"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--gray)]">Descricao</label>
                    <input
                      type="text"
                      value={metrica.descricao}
                      onChange={(e) => atualizarMetrica(metrica.id, 'descricao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Descricao da metrica"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Medicao</label>
                    <select
                      value={metrica.medicao}
                      onChange={(e) => atualizarMetrica(metrica.id, 'medicao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    >
                      <option>Continua</option>
                      <option>Mensal</option>
                      <option>Por ticket</option>
                      <option>Por incidente</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Penalidade</label>
                    <input
                      type="text"
                      value={metrica.penalidade}
                      onChange={(e) => atualizarMetrica(metrica.id, 'penalidade', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: 5% do valor mensal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusoes e Escalacao */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Detalhes Adicionais</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Exclusoes do SLA</label>
              <textarea
                value={sla.exclusoes}
                onChange={(e) => setSla({ ...sla, exclusoes: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="• Manutencoes programadas&#10;• Problemas causados por terceiros&#10;• Uso indevido"
              />
            </div>
            <div>
              <label className="input-label">Matriz de Escalacao</label>
              <textarea
                value={sla.escalacao}
                onChange={(e) => setSla({ ...sla, escalacao: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Nivel 1 - Suporte: Ate 2h&#10;Nivel 2 - Especialista: Ate 4h&#10;..."
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarSLA} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar SLA'}
          </button>
        </div>
      </div>
    </main>
  )
}
