'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ClipboardList, Copy, Check } from 'lucide-react'

export default function QBRPage() {
  const [copied, setCopied] = useState(false)

  const [qbr, setQbr] = useState({
    cliente: '',
    trimestre: 'Q1',
    ano: new Date().getFullYear(),
    csm: '',
    dataReuniao: '',

    // Resumo Executivo
    saudeGeral: 'verde',
    nps: '',
    resumoExecutivo: '',

    // Metricas
    mrr: '',
    crescimentoMrr: '',
    usersAtivos: '',
    adocao: '',
    tickets: '',
    tempoResposta: '',

    // Conquistas
    conquistas: '',
    desafios: '',

    // Proximos Passos
    objetivosProximo: '',
    acoes: '',

    // Upsell
    oportunidades: '',

    // Feedback
    feedback: ''
  })

  const trimestres = ['Q1', 'Q2', 'Q3', 'Q4']
  const saudes = [
    { value: 'verde', label: 'Saudavel', cor: 'bg-green-500' },
    { value: 'amarelo', label: 'Atencao', cor: 'bg-yellow-500' },
    { value: 'vermelho', label: 'Risco', cor: 'bg-red-500' },
  ]

  const gerarQBR = () => {
    const saudeLabel = saudes.find(s => s.value === qbr.saudeGeral)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
           QUARTERLY BUSINESS REVIEW (QBR)
═══════════════════════════════════════════════════════════════

INFORMACOES GERAIS
─────────────────────────────────────────────────────────────
Cliente: ${qbr.cliente || '[Nome do Cliente]'}
Periodo: ${qbr.trimestre} ${qbr.ano}
CSM: ${qbr.csm || '[Nome do CSM]'}
Data da Reuniao: ${qbr.dataReuniao || '[Data]'}

RESUMO EXECUTIVO
─────────────────────────────────────────────────────────────
Status de Saude: ${saudeLabel.toUpperCase()}
NPS: ${qbr.nps || 'N/A'}

${qbr.resumoExecutivo || '[Resumo executivo do trimestre]'}

METRICAS DE PERFORMANCE
─────────────────────────────────────────────────────────────
Financeiro:
  MRR Atual: ${qbr.mrr || 'R$ X.XXX'}
  Crescimento: ${qbr.crescimentoMrr || 'X%'}

Engajamento:
  Usuarios Ativos: ${qbr.usersAtivos || 'XX'}
  Taxa de Adocao: ${qbr.adocao || 'XX%'}

Suporte:
  Tickets Abertos: ${qbr.tickets || 'XX'}
  Tempo Medio Resposta: ${qbr.tempoResposta || 'Xh'}

CONQUISTAS DO TRIMESTRE
─────────────────────────────────────────────────────────────
${qbr.conquistas || `✓ Conquista 1
✓ Conquista 2
✓ Conquista 3`}

DESAFIOS E SOLUCOES
─────────────────────────────────────────────────────────────
${qbr.desafios || `Desafio 1:
  Impacto: [Impacto]
  Solucao: [Solucao implementada/planejada]

Desafio 2:
  Impacto: [Impacto]
  Solucao: [Solucao implementada/planejada]`}

OBJETIVOS PROXIMO TRIMESTRE
─────────────────────────────────────────────────────────────
${qbr.objetivosProximo || `1. Objetivo 1
   KR: [Key Result mensuravel]

2. Objetivo 2
   KR: [Key Result mensuravel]`}

PLANO DE ACAO
─────────────────────────────────────────────────────────────
${qbr.acoes || `| Acao | Responsavel | Prazo | Status |
|------|-------------|-------|--------|
| Acao 1 | Nome | Data | Pendente |
| Acao 2 | Nome | Data | Pendente |`}

OPORTUNIDADES DE EXPANSAO
─────────────────────────────────────────────────────────────
${qbr.oportunidades || `- Oportunidade 1: [Descricao]
- Oportunidade 2: [Descricao]`}

FEEDBACK DO CLIENTE
─────────────────────────────────────────────────────────────
${qbr.feedback || '[Principais feedbacks e comentarios do cliente]'}

═══════════════════════════════════════════════════════════════
Documento gerado em: ${new Date().toLocaleDateString('pt-BR')}
Proxima QBR: ${qbr.trimestre === 'Q4' ? `Q1 ${qbr.ano + 1}` : `Q${parseInt(qbr.trimestre.slice(1)) + 1} ${qbr.ano}`}
`
  }

  const copiarQBR = () => {
    navigator.clipboard.writeText(gerarQBR())
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
            <ClipboardList className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Template <span className="gold-text">QBR</span>
          </h1>
          <p className="text-[var(--gray)]">Quarterly Business Review</p>
        </div>

        {/* Info Gerais */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes Gerais</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Cliente</label>
              <input
                type="text"
                value={qbr.cliente}
                onChange={(e) => setQbr({ ...qbr, cliente: e.target.value })}
                className="input-field"
                placeholder="Nome da empresa"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="input-label">Trimestre</label>
                <select
                  value={qbr.trimestre}
                  onChange={(e) => setQbr({ ...qbr, trimestre: e.target.value })}
                  className="input-field"
                >
                  {trimestres.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="w-24">
                <label className="input-label">Ano</label>
                <input
                  type="number"
                  value={qbr.ano}
                  onChange={(e) => setQbr({ ...qbr, ano: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="input-label">Data da Reuniao</label>
              <input
                type="date"
                value={qbr.dataReuniao}
                onChange={(e) => setQbr({ ...qbr, dataReuniao: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="input-label">CSM Responsavel</label>
              <input
                type="text"
                value={qbr.csm}
                onChange={(e) => setQbr({ ...qbr, csm: e.target.value })}
                className="input-field"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="input-label">Saude do Cliente</label>
              <div className="flex gap-2 mt-1">
                {saudes.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setQbr({ ...qbr, saudeGeral: s.value })}
                    className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      qbr.saudeGeral === s.value ? 'ring-2 ring-white' : 'opacity-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${s.cor}`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="input-label">NPS</label>
              <input
                type="number"
                value={qbr.nps}
                onChange={(e) => setQbr({ ...qbr, nps: e.target.value })}
                className="input-field"
                placeholder="0-10"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Resumo Executivo</h2>
          <textarea
            value={qbr.resumoExecutivo}
            onChange={(e) => setQbr({ ...qbr, resumoExecutivo: e.target.value })}
            className="input-field min-h-[100px]"
            placeholder="Resumo geral do trimestre, principais pontos de atencao..."
          />
        </div>

        {/* Metricas */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Metricas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">MRR Atual</label>
              <input
                type="text"
                value={qbr.mrr}
                onChange={(e) => setQbr({ ...qbr, mrr: e.target.value })}
                className="input-field"
                placeholder="R$ 10.000"
              />
            </div>
            <div>
              <label className="input-label">Crescimento MRR</label>
              <input
                type="text"
                value={qbr.crescimentoMrr}
                onChange={(e) => setQbr({ ...qbr, crescimentoMrr: e.target.value })}
                className="input-field"
                placeholder="+15%"
              />
            </div>
            <div>
              <label className="input-label">Usuarios Ativos</label>
              <input
                type="text"
                value={qbr.usersAtivos}
                onChange={(e) => setQbr({ ...qbr, usersAtivos: e.target.value })}
                className="input-field"
                placeholder="150"
              />
            </div>
            <div>
              <label className="input-label">Taxa de Adocao</label>
              <input
                type="text"
                value={qbr.adocao}
                onChange={(e) => setQbr({ ...qbr, adocao: e.target.value })}
                className="input-field"
                placeholder="85%"
              />
            </div>
            <div>
              <label className="input-label">Tickets Abertos</label>
              <input
                type="text"
                value={qbr.tickets}
                onChange={(e) => setQbr({ ...qbr, tickets: e.target.value })}
                className="input-field"
                placeholder="5"
              />
            </div>
            <div>
              <label className="input-label">Tempo Resposta</label>
              <input
                type="text"
                value={qbr.tempoResposta}
                onChange={(e) => setQbr({ ...qbr, tempoResposta: e.target.value })}
                className="input-field"
                placeholder="2h"
              />
            </div>
          </div>
        </div>

        {/* Conquistas e Desafios */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Conquistas e Desafios</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Conquistas do Trimestre</label>
              <textarea
                value={qbr.conquistas}
                onChange={(e) => setQbr({ ...qbr, conquistas: e.target.value })}
                className="input-field min-h-[120px]"
                placeholder="✓ Conquista 1&#10;✓ Conquista 2"
              />
            </div>
            <div>
              <label className="input-label">Desafios e Solucoes</label>
              <textarea
                value={qbr.desafios}
                onChange={(e) => setQbr({ ...qbr, desafios: e.target.value })}
                className="input-field min-h-[120px]"
                placeholder="Desafio 1:&#10;Solucao: ..."
              />
            </div>
          </div>
        </div>

        {/* Proximos Passos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Proximo Trimestre</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Objetivos</label>
              <textarea
                value={qbr.objetivosProximo}
                onChange={(e) => setQbr({ ...qbr, objetivosProximo: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="1. Objetivo 1&#10;   KR: [Key Result]"
              />
            </div>
            <div>
              <label className="input-label">Plano de Acao</label>
              <textarea
                value={qbr.acoes}
                onChange={(e) => setQbr({ ...qbr, acoes: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="Acao | Responsavel | Prazo"
              />
            </div>
            <div>
              <label className="input-label">Oportunidades de Expansao</label>
              <textarea
                value={qbr.oportunidades}
                onChange={(e) => setQbr({ ...qbr, oportunidades: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="Produtos/modulos adicionais, mais usuarios..."
              />
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Feedback do Cliente</h2>
          <textarea
            value={qbr.feedback}
            onChange={(e) => setQbr({ ...qbr, feedback: e.target.value })}
            className="input-field min-h-[80px]"
            placeholder="Principais feedbacks e comentarios..."
          />
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarQBR} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar QBR'}
          </button>
        </div>
      </div>
    </main>
  )
}
