'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileCode, Copy, Check } from 'lucide-react'

export default function PRDPage() {
  const [copied, setCopied] = useState(false)

  const [prd, setPrd] = useState({
    nomeProduto: '',
    versao: '1.0',
    autor: '',
    data: new Date().toISOString().split('T')[0],
    problema: '',
    solucao: '',
    objetivos: '',
    publicoAlvo: '',
    personas: '',
    userStories: '',
    requisitos: '',
    naoEscopo: '',
    metricas: '',
    dependencias: '',
    riscos: '',
    timeline: '',
    stakeholders: ''
  })

  const gerarPRD = () => {
    return `
═══════════════════════════════════════════════════════════════
              PRODUCT REQUIREMENTS DOCUMENT (PRD)
═══════════════════════════════════════════════════════════════

INFORMACOES DO DOCUMENTO
─────────────────────────────────────────────────────────────
Produto: ${prd.nomeProduto || '[Nome do Produto]'}
Versao: ${prd.versao}
Autor: ${prd.autor || '[Autor]'}
Data: ${prd.data}
Status: Draft

1. PROBLEMA
─────────────────────────────────────────────────────────────
${prd.problema || '[Descreva o problema que este produto resolve]'}

2. SOLUCAO PROPOSTA
─────────────────────────────────────────────────────────────
${prd.solucao || '[Descreva a solucao em alto nivel]'}

3. OBJETIVOS E KEY RESULTS
─────────────────────────────────────────────────────────────
${prd.objetivos || `Objetivo 1: [Descreva o objetivo]
  KR 1.1: [Key Result mensuravel]
  KR 1.2: [Key Result mensuravel]

Objetivo 2: [Descreva o objetivo]
  KR 2.1: [Key Result mensuravel]`}

4. PUBLICO-ALVO
─────────────────────────────────────────────────────────────
${prd.publicoAlvo || '[Defina o publico-alvo principal]'}

5. PERSONAS
─────────────────────────────────────────────────────────────
${prd.personas || `Persona 1: [Nome]
  - Cargo/Funcao:
  - Dores:
  - Necessidades:
  - Comportamento:`}

6. USER STORIES
─────────────────────────────────────────────────────────────
${prd.userStories || `US-001: Como [persona], quero [acao] para [beneficio]
  Criterios de Aceite:
  - [ ] Criterio 1
  - [ ] Criterio 2

US-002: Como [persona], quero [acao] para [beneficio]
  Criterios de Aceite:
  - [ ] Criterio 1
  - [ ] Criterio 2`}

7. REQUISITOS FUNCIONAIS
─────────────────────────────────────────────────────────────
${prd.requisitos || `RF-001: [Requisito]
  Prioridade: Alta/Media/Baixa
  Descricao: [Detalhes]

RF-002: [Requisito]
  Prioridade: Alta/Media/Baixa
  Descricao: [Detalhes]`}

8. FORA DO ESCOPO
─────────────────────────────────────────────────────────────
${prd.naoEscopo || `- [O que NAO sera feito nesta versao]
- [Funcionalidade para futuro]`}

9. METRICAS DE SUCESSO
─────────────────────────────────────────────────────────────
${prd.metricas || `- [Metrica 1]: Meta de [X]
- [Metrica 2]: Meta de [Y]
- [Metrica 3]: Meta de [Z]`}

10. DEPENDENCIAS
─────────────────────────────────────────────────────────────
${prd.dependencias || `- [Dependencia 1]: [Time/Sistema responsavel]
- [Dependencia 2]: [Time/Sistema responsavel]`}

11. RISCOS E MITIGACOES
─────────────────────────────────────────────────────────────
${prd.riscos || `Risco 1: [Descricao]
  Impacto: Alto/Medio/Baixo
  Probabilidade: Alta/Media/Baixa
  Mitigacao: [Acao]

Risco 2: [Descricao]
  Impacto: Alto/Medio/Baixo
  Probabilidade: Alta/Media/Baixa
  Mitigacao: [Acao]`}

12. TIMELINE
─────────────────────────────────────────────────────────────
${prd.timeline || `Fase 1 - Discovery: [Data]
Fase 2 - Design: [Data]
Fase 3 - Desenvolvimento: [Data]
Fase 4 - QA: [Data]
Fase 5 - Lancamento: [Data]`}

13. STAKEHOLDERS
─────────────────────────────────────────────────────────────
${prd.stakeholders || `- Product Owner: [Nome]
- Tech Lead: [Nome]
- Design Lead: [Nome]
- QA Lead: [Nome]
- Sponsor: [Nome]`}

═══════════════════════════════════════════════════════════════
                      HISTORICO DE REVISOES
═══════════════════════════════════════════════════════════════
v${prd.versao} | ${prd.data} | ${prd.autor || 'Autor'} | Versao inicial

═══════════════════════════════════════════════════════════════
`
  }

  const copiarPRD = () => {
    navigator.clipboard.writeText(gerarPRD())
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
            <FileCode className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">PRD</span>
          </h1>
          <p className="text-[var(--gray)]">Product Requirements Document</p>
        </div>

        {/* Info do Documento */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Informacoes do Documento</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="input-label">Nome do Produto</label>
              <input
                type="text"
                value={prd.nomeProduto}
                onChange={(e) => setPrd({ ...prd, nomeProduto: e.target.value })}
                className="input-field"
                placeholder="Nome do produto/feature"
              />
            </div>
            <div>
              <label className="input-label">Versao</label>
              <input
                type="text"
                value={prd.versao}
                onChange={(e) => setPrd({ ...prd, versao: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Autor</label>
              <input
                type="text"
                value={prd.autor}
                onChange={(e) => setPrd({ ...prd, autor: e.target.value })}
                className="input-field"
                placeholder="Seu nome"
              />
            </div>
          </div>
        </div>

        {/* Problema e Solucao */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Problema e Solucao</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Problema</label>
              <textarea
                value={prd.problema}
                onChange={(e) => setPrd({ ...prd, problema: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Qual problema estamos resolvendo? Por que isso e importante?"
              />
            </div>
            <div>
              <label className="input-label">Solucao Proposta</label>
              <textarea
                value={prd.solucao}
                onChange={(e) => setPrd({ ...prd, solucao: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Como vamos resolver este problema? Visao geral da solucao."
              />
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Objetivos e Metricas</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Objetivos e Key Results (OKRs)</label>
              <textarea
                value={prd.objetivos}
                onChange={(e) => setPrd({ ...prd, objetivos: e.target.value })}
                className="input-field min-h-[120px]"
                placeholder="Objetivo 1: [Descreva]&#10;  KR 1.1: [Mensuravel]&#10;  KR 1.2: [Mensuravel]"
              />
            </div>
            <div>
              <label className="input-label">Metricas de Sucesso</label>
              <textarea
                value={prd.metricas}
                onChange={(e) => setPrd({ ...prd, metricas: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="- Metrica 1: Meta de X&#10;- Metrica 2: Meta de Y"
              />
            </div>
          </div>
        </div>

        {/* Publico e Personas */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Publico e Personas</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Publico-Alvo</label>
              <textarea
                value={prd.publicoAlvo}
                onChange={(e) => setPrd({ ...prd, publicoAlvo: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="Quem sao os usuarios principais?"
              />
            </div>
            <div>
              <label className="input-label">Personas</label>
              <textarea
                value={prd.personas}
                onChange={(e) => setPrd({ ...prd, personas: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Persona 1: [Nome]&#10;  - Cargo: &#10;  - Dores: &#10;  - Necessidades:"
              />
            </div>
          </div>
        </div>

        {/* Requisitos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Requisitos</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">User Stories</label>
              <textarea
                value={prd.userStories}
                onChange={(e) => setPrd({ ...prd, userStories: e.target.value })}
                className="input-field min-h-[120px]"
                placeholder="US-001: Como [persona], quero [acao] para [beneficio]&#10;  Criterios de Aceite:&#10;  - [ ] Criterio 1"
              />
            </div>
            <div>
              <label className="input-label">Requisitos Funcionais</label>
              <textarea
                value={prd.requisitos}
                onChange={(e) => setPrd({ ...prd, requisitos: e.target.value })}
                className="input-field min-h-[120px]"
                placeholder="RF-001: [Requisito]&#10;  Prioridade: Alta&#10;  Descricao: [Detalhes]"
              />
            </div>
            <div>
              <label className="input-label">Fora do Escopo</label>
              <textarea
                value={prd.naoEscopo}
                onChange={(e) => setPrd({ ...prd, naoEscopo: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="- O que NAO sera feito nesta versao"
              />
            </div>
          </div>
        </div>

        {/* Riscos e Timeline */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Planejamento</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Dependencias</label>
              <textarea
                value={prd.dependencias}
                onChange={(e) => setPrd({ ...prd, dependencias: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="- Dependencia: Time/Sistema responsavel"
              />
            </div>
            <div>
              <label className="input-label">Riscos e Mitigacoes</label>
              <textarea
                value={prd.riscos}
                onChange={(e) => setPrd({ ...prd, riscos: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Risco 1: [Descricao]&#10;  Impacto: Alto&#10;  Mitigacao: [Acao]"
              />
            </div>
            <div>
              <label className="input-label">Timeline</label>
              <textarea
                value={prd.timeline}
                onChange={(e) => setPrd({ ...prd, timeline: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="Fase 1 - Discovery: [Data]&#10;Fase 2 - Design: [Data]"
              />
            </div>
            <div>
              <label className="input-label">Stakeholders</label>
              <textarea
                value={prd.stakeholders}
                onChange={(e) => setPrd({ ...prd, stakeholders: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="- Product Owner: [Nome]&#10;- Tech Lead: [Nome]"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPRD} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar PRD'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para um Bom PRD</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">O que incluir</h4>
              <ul className="space-y-1">
                <li>• Problema claro e especifico</li>
                <li>• Metricas mensuraveis</li>
                <li>• User stories completas</li>
                <li>• Riscos identificados</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Melhores Praticas</h4>
              <ul className="space-y-1">
                <li>• Mantenha atualizado</li>
                <li>• Compartilhe com o time</li>
                <li>• Revise com stakeholders</li>
                <li>• Versione alteracoes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
