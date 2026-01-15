'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileWarning, Copy, Check } from 'lucide-react'

export default function PostmortemPage() {
  const [copied, setCopied] = useState(false)

  const [postmortem, setPostmortem] = useState({
    titulo: '',
    dataIncidente: '',
    duracaoTotal: '',
    severidade: 'alta',
    impacto: '',
    autores: '',
    status: 'em_analise',

    resumo: '',
    timeline: '',
    causaRaiz: '',
    fatoresContribuintes: '',

    oQueFuncionou: '',
    oQueFalhou: '',
    sorteTivemos: '',

    acoesImediatas: '',
    acoesPrevencao: '',

    licoes: ''
  })

  const severidades = [
    { value: 'critica', label: 'Critica (P1)', cor: 'text-red-500' },
    { value: 'alta', label: 'Alta (P2)', cor: 'text-orange-500' },
    { value: 'media', label: 'Media (P3)', cor: 'text-yellow-500' },
    { value: 'baixa', label: 'Baixa (P4)', cor: 'text-green-500' },
  ]

  const statusOptions = [
    { value: 'em_analise', label: 'Em Analise' },
    { value: 'acoes_pendentes', label: 'Acoes Pendentes' },
    { value: 'concluido', label: 'Concluido' },
  ]

  const gerarPostmortem = () => {
    const severidadeLabel = severidades.find(s => s.value === postmortem.severidade)?.label || ''
    const statusLabel = statusOptions.find(s => s.value === postmortem.status)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
                    POSTMORTEM
═══════════════════════════════════════════════════════════════

IDENTIFICACAO DO INCIDENTE
─────────────────────────────────────────────────────────────
Titulo: ${postmortem.titulo || '[TITULO DO INCIDENTE]'}
Data: ${postmortem.dataIncidente || '[DATA]'}
Duracao Total: ${postmortem.duracaoTotal || '[DURACAO]'}
Severidade: ${severidadeLabel}
Status: ${statusLabel}
Autores: ${postmortem.autores || '[AUTORES]'}

IMPACTO
─────────────────────────────────────────────────────────────
${postmortem.impacto || `• Numero de usuarios afetados: [X]
• Receita impactada: [R$ X]
• Servicos afetados: [Lista]`}

RESUMO EXECUTIVO
─────────────────────────────────────────────────────────────
${postmortem.resumo || '[Resumo de 2-3 paragrafos do que aconteceu]'}

═══════════════════════════════════════════════════════════════
                    TIMELINE
═══════════════════════════════════════════════════════════════

${postmortem.timeline || `[HH:MM] Primeiro alerta detectado
[HH:MM] Equipe de plantao notificada
[HH:MM] Inicio da investigacao
[HH:MM] Causa identificada
[HH:MM] Mitigacao implementada
[HH:MM] Servico restaurado
[HH:MM] Monitoramento confirmou estabilidade`}

═══════════════════════════════════════════════════════════════
                    ANALISE DE CAUSA RAIZ
═══════════════════════════════════════════════════════════════

CAUSA RAIZ
─────────────────────────────────────────────────────────────
${postmortem.causaRaiz || '[Descreva a causa raiz tecnica do incidente]'}

FATORES CONTRIBUINTES
─────────────────────────────────────────────────────────────
${postmortem.fatoresContribuintes || `• [Fator 1]
• [Fator 2]
• [Fator 3]`}

═══════════════════════════════════════════════════════════════
                    RETROSPECTIVA
═══════════════════════════════════════════════════════════════

O QUE FUNCIONOU BEM
─────────────────────────────────────────────────────────────
${postmortem.oQueFuncionou || `• [Ponto positivo 1]
• [Ponto positivo 2]`}

O QUE NAO FUNCIONOU
─────────────────────────────────────────────────────────────
${postmortem.oQueFalhou || `• [Problema 1]
• [Problema 2]`}

ONDE TIVEMOS SORTE
─────────────────────────────────────────────────────────────
${postmortem.sorteTivemos || `• [Fator sorte 1]
• [Fator sorte 2]`}

═══════════════════════════════════════════════════════════════
                    PLANO DE ACAO
═══════════════════════════════════════════════════════════════

ACOES IMEDIATAS (ja realizadas)
─────────────────────────────────────────────────────────────
${postmortem.acoesImediatas || `✓ [Acao 1] - Responsavel: [Nome]
✓ [Acao 2] - Responsavel: [Nome]`}

ACOES DE PREVENCAO (a fazer)
─────────────────────────────────────────────────────────────
${postmortem.acoesPrevencao || `[ ] [Acao 1] - Responsavel: [Nome] - Prazo: [Data]
[ ] [Acao 2] - Responsavel: [Nome] - Prazo: [Data]
[ ] [Acao 3] - Responsavel: [Nome] - Prazo: [Data]`}

═══════════════════════════════════════════════════════════════
                    LICOES APRENDIDAS
═══════════════════════════════════════════════════════════════

${postmortem.licoes || `1. [Licao 1]

2. [Licao 2]

3. [Licao 3]`}

═══════════════════════════════════════════════════════════════
NOTA: Este documento e blameless. O objetivo e aprender e
melhorar, nao apontar culpados. Todos os envolvidos agiram
de boa fe com as informacoes disponiveis no momento.

Documento gerado em: ${new Date().toLocaleDateString('pt-BR')}
═══════════════════════════════════════════════════════════════
`
  }

  const copiarPostmortem = () => {
    navigator.clipboard.writeText(gerarPostmortem())
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
            <FileWarning className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Template <span className="gold-text">Postmortem</span>
          </h1>
          <p className="text-[var(--gray)]">Analise de incidentes blameless</p>
        </div>

        {/* Identificacao */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Identificacao do Incidente</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="input-label">Titulo do Incidente</label>
              <input
                type="text"
                value={postmortem.titulo}
                onChange={(e) => setPostmortem({ ...postmortem, titulo: e.target.value })}
                className="input-field"
                placeholder="Ex: Queda do servico de pagamentos"
              />
            </div>
            <div>
              <label className="input-label">Data do Incidente</label>
              <input
                type="date"
                value={postmortem.dataIncidente}
                onChange={(e) => setPostmortem({ ...postmortem, dataIncidente: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Duracao Total</label>
              <input
                type="text"
                value={postmortem.duracaoTotal}
                onChange={(e) => setPostmortem({ ...postmortem, duracaoTotal: e.target.value })}
                className="input-field"
                placeholder="Ex: 2h 35min"
              />
            </div>
            <div>
              <label className="input-label">Severidade</label>
              <select
                value={postmortem.severidade}
                onChange={(e) => setPostmortem({ ...postmortem, severidade: e.target.value })}
                className="input-field"
              >
                {severidades.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Status</label>
              <select
                value={postmortem.status}
                onChange={(e) => setPostmortem({ ...postmortem, status: e.target.value })}
                className="input-field"
              >
                {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Autores</label>
              <input
                type="text"
                value={postmortem.autores}
                onChange={(e) => setPostmortem({ ...postmortem, autores: e.target.value })}
                className="input-field"
                placeholder="Nomes dos autores do postmortem"
              />
            </div>
          </div>
        </div>

        {/* Impacto e Resumo */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Impacto e Resumo</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Impacto</label>
              <textarea
                value={postmortem.impacto}
                onChange={(e) => setPostmortem({ ...postmortem, impacto: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Usuarios afetados: X&#10;• Receita impactada: R$ X"
              />
            </div>
            <div>
              <label className="input-label">Resumo Executivo</label>
              <textarea
                value={postmortem.resumo}
                onChange={(e) => setPostmortem({ ...postmortem, resumo: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Resumo de alto nivel do incidente..."
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Timeline</h2>
          <textarea
            value={postmortem.timeline}
            onChange={(e) => setPostmortem({ ...postmortem, timeline: e.target.value })}
            className="input-field min-h-[150px] font-mono text-sm"
            placeholder="[09:00] Primeiro alerta&#10;[09:05] Equipe notificada&#10;[09:15] Investigacao iniciada"
          />
        </div>

        {/* Causa Raiz */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Analise de Causa Raiz</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Causa Raiz</label>
              <textarea
                value={postmortem.causaRaiz}
                onChange={(e) => setPostmortem({ ...postmortem, causaRaiz: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Descreva tecnicamente o que causou o incidente..."
              />
            </div>
            <div>
              <label className="input-label">Fatores Contribuintes</label>
              <textarea
                value={postmortem.fatoresContribuintes}
                onChange={(e) => setPostmortem({ ...postmortem, fatoresContribuintes: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Fator 1&#10;• Fator 2"
              />
            </div>
          </div>
        </div>

        {/* Retrospectiva */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Retrospectiva</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label text-green-400">O que funcionou bem</label>
              <textarea
                value={postmortem.oQueFuncionou}
                onChange={(e) => setPostmortem({ ...postmortem, oQueFuncionou: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label text-red-400">O que nao funcionou</label>
              <textarea
                value={postmortem.oQueFalhou}
                onChange={(e) => setPostmortem({ ...postmortem, oQueFalhou: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label text-yellow-400">Onde tivemos sorte</label>
              <textarea
                value={postmortem.sorteTivemos}
                onChange={(e) => setPostmortem({ ...postmortem, sorteTivemos: e.target.value })}
                className="input-field min-h-[60px]"
              />
            </div>
          </div>
        </div>

        {/* Acoes */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Plano de Acao</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Acoes Imediatas (ja realizadas)</label>
              <textarea
                value={postmortem.acoesImediatas}
                onChange={(e) => setPostmortem({ ...postmortem, acoesImediatas: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="✓ Acao 1 - Responsavel"
              />
            </div>
            <div>
              <label className="input-label">Acoes de Prevencao (a fazer)</label>
              <textarea
                value={postmortem.acoesPrevencao}
                onChange={(e) => setPostmortem({ ...postmortem, acoesPrevencao: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="[ ] Acao 1 - Responsavel - Prazo"
              />
            </div>
          </div>
        </div>

        {/* Licoes */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Licoes Aprendidas</h2>
          <textarea
            value={postmortem.licoes}
            onChange={(e) => setPostmortem({ ...postmortem, licoes: e.target.value })}
            className="input-field min-h-[100px]"
            placeholder="1. Licao 1&#10;2. Licao 2"
          />
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPostmortem} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Postmortem'}
          </button>
        </div>

        {/* Aviso */}
        <div className="glass p-6 border border-blue-500/30 bg-blue-500/5">
          <p className="text-blue-400 text-sm">
            <strong>Cultura Blameless:</strong> O objetivo do postmortem e aprender e melhorar,
            nao apontar culpados. Todos agiram de boa fe com as informacoes disponiveis.
          </p>
        </div>
      </div>
    </main>
  )
}
