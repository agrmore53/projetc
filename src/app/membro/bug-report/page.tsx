'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bug, Copy, Check } from 'lucide-react'

export default function BugReportPage() {
  const [copied, setCopied] = useState(false)

  const [bug, setBug] = useState({
    titulo: '',
    severidade: 'media',
    prioridade: 'p2',
    ambiente: 'producao',
    versao: '',
    navegador: '',
    so: '',
    descricao: '',
    passosReproduzir: '',
    resultadoEsperado: '',
    resultadoAtual: '',
    logs: '',
    screenshots: '',
    workaround: '',
    reportadoPor: '',
    atribuidoPara: ''
  })

  const severidades = [
    { value: 'critica', label: 'Critica', cor: 'text-red-500' },
    { value: 'alta', label: 'Alta', cor: 'text-orange-500' },
    { value: 'media', label: 'Media', cor: 'text-yellow-500' },
    { value: 'baixa', label: 'Baixa', cor: 'text-green-500' },
  ]

  const prioridades = [
    { value: 'p1', label: 'P1 - Urgente' },
    { value: 'p2', label: 'P2 - Alta' },
    { value: 'p3', label: 'P3 - Normal' },
    { value: 'p4', label: 'P4 - Baixa' },
  ]

  const ambientes = ['producao', 'staging', 'desenvolvimento', 'local']

  const gerarBugReport = () => {
    const severidadeLabel = severidades.find(s => s.value === bug.severidade)?.label || ''
    const prioridadeLabel = prioridades.find(p => p.value === bug.prioridade)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
                      BUG REPORT
═══════════════════════════════════════════════════════════════

IDENTIFICACAO
─────────────────────────────────────────────────────────────
Titulo: ${bug.titulo || '[Titulo do Bug]'}
Severidade: ${severidadeLabel}
Prioridade: ${prioridadeLabel}
Data: ${new Date().toLocaleDateString('pt-BR')}
Reportado por: ${bug.reportadoPor || '[Nome]'}
Atribuido para: ${bug.atribuidoPara || '[A definir]'}

AMBIENTE
─────────────────────────────────────────────────────────────
Ambiente: ${bug.ambiente}
Versao: ${bug.versao || '[Versao]'}
Navegador: ${bug.navegador || '[Navegador]'}
Sistema Operacional: ${bug.so || '[SO]'}

DESCRICAO
─────────────────────────────────────────────────────────────
${bug.descricao || '[Descreva o bug de forma clara e objetiva]'}

PASSOS PARA REPRODUZIR
─────────────────────────────────────────────────────────────
${bug.passosReproduzir || `1. [Primeiro passo]
2. [Segundo passo]
3. [Terceiro passo]
4. [O bug ocorre]`}

RESULTADO ESPERADO
─────────────────────────────────────────────────────────────
${bug.resultadoEsperado || '[O que deveria acontecer]'}

RESULTADO ATUAL
─────────────────────────────────────────────────────────────
${bug.resultadoAtual || '[O que realmente acontece]'}

${bug.logs ? `
LOGS / STACK TRACE
─────────────────────────────────────────────────────────────
${bug.logs}
` : ''}

${bug.screenshots ? `
EVIDENCIAS
─────────────────────────────────────────────────────────────
${bug.screenshots}
` : ''}

${bug.workaround ? `
WORKAROUND
─────────────────────────────────────────────────────────────
${bug.workaround}
` : ''}

CHECKLIST
─────────────────────────────────────────────────────────────
[ ] Bug reproduzido em ambiente limpo
[ ] Logs coletados
[ ] Screenshots anexados
[ ] Impacto avaliado
[ ] Stakeholders notificados (se critico)

═══════════════════════════════════════════════════════════════
Bug ID: BUG-${Date.now().toString().slice(-6)}
Criado em: ${new Date().toLocaleString('pt-BR')}
`
  }

  const copiarBugReport = () => {
    navigator.clipboard.writeText(gerarBugReport())
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
            <Bug className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Template de <span className="gold-text">Bug Report</span>
          </h1>
          <p className="text-[var(--gray)]">Documente bugs de forma padronizada</p>
        </div>

        {/* Identificacao */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Identificacao</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Titulo do Bug</label>
              <input
                type="text"
                value={bug.titulo}
                onChange={(e) => setBug({ ...bug, titulo: e.target.value })}
                className="input-field"
                placeholder="[Componente] Descricao curta do problema"
              />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="input-label">Severidade</label>
                <select
                  value={bug.severidade}
                  onChange={(e) => setBug({ ...bug, severidade: e.target.value })}
                  className="input-field"
                >
                  {severidades.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Prioridade</label>
                <select
                  value={bug.prioridade}
                  onChange={(e) => setBug({ ...bug, prioridade: e.target.value })}
                  className="input-field"
                >
                  {prioridades.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Reportado por</label>
                <input
                  type="text"
                  value={bug.reportadoPor}
                  onChange={(e) => setBug({ ...bug, reportadoPor: e.target.value })}
                  className="input-field"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="input-label">Atribuido para</label>
                <input
                  type="text"
                  value={bug.atribuidoPara}
                  onChange={(e) => setBug({ ...bug, atribuidoPara: e.target.value })}
                  className="input-field"
                  placeholder="Desenvolvedor"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ambiente */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Ambiente</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Ambiente</label>
              <select
                value={bug.ambiente}
                onChange={(e) => setBug({ ...bug, ambiente: e.target.value })}
                className="input-field"
              >
                {ambientes.map(a => (
                  <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Versao</label>
              <input
                type="text"
                value={bug.versao}
                onChange={(e) => setBug({ ...bug, versao: e.target.value })}
                className="input-field"
                placeholder="v1.2.3"
              />
            </div>
            <div>
              <label className="input-label">Navegador</label>
              <input
                type="text"
                value={bug.navegador}
                onChange={(e) => setBug({ ...bug, navegador: e.target.value })}
                className="input-field"
                placeholder="Chrome 120"
              />
            </div>
            <div>
              <label className="input-label">Sistema Operacional</label>
              <input
                type="text"
                value={bug.so}
                onChange={(e) => setBug({ ...bug, so: e.target.value })}
                className="input-field"
                placeholder="Windows 11"
              />
            </div>
          </div>
        </div>

        {/* Descricao */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Detalhes do Bug</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Descricao</label>
              <textarea
                value={bug.descricao}
                onChange={(e) => setBug({ ...bug, descricao: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="Descreva o bug de forma clara e objetiva"
              />
            </div>
            <div>
              <label className="input-label">Passos para Reproduzir</label>
              <textarea
                value={bug.passosReproduzir}
                onChange={(e) => setBug({ ...bug, passosReproduzir: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="1. Acessar a pagina X&#10;2. Clicar no botao Y&#10;3. Preencher o campo Z&#10;4. O erro ocorre"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Resultado Esperado</label>
                <textarea
                  value={bug.resultadoEsperado}
                  onChange={(e) => setBug({ ...bug, resultadoEsperado: e.target.value })}
                  className="input-field min-h-[80px]"
                  placeholder="O que deveria acontecer"
                />
              </div>
              <div>
                <label className="input-label">Resultado Atual</label>
                <textarea
                  value={bug.resultadoAtual}
                  onChange={(e) => setBug({ ...bug, resultadoAtual: e.target.value })}
                  className="input-field min-h-[80px]"
                  placeholder="O que realmente acontece"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Evidencias */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Evidencias (opcional)</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Logs / Stack Trace</label>
              <textarea
                value={bug.logs}
                onChange={(e) => setBug({ ...bug, logs: e.target.value })}
                className="input-field min-h-[80px] font-mono text-sm"
                placeholder="Cole os logs ou mensagens de erro aqui"
              />
            </div>
            <div>
              <label className="input-label">Screenshots / Videos</label>
              <textarea
                value={bug.screenshots}
                onChange={(e) => setBug({ ...bug, screenshots: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="Links para screenshots ou videos"
              />
            </div>
            <div>
              <label className="input-label">Workaround (se houver)</label>
              <textarea
                value={bug.workaround}
                onChange={(e) => setBug({ ...bug, workaround: e.target.value })}
                className="input-field min-h-[60px]"
                placeholder="Solucao temporaria para contornar o problema"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarBugReport} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Bug Report'}
          </button>
        </div>

        {/* Legenda */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Guia de Severidade</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="text-red-500 font-semibold mb-1">Critica</h4>
              <p className="text-[var(--gray)]">Sistema indisponivel, perda de dados, sem workaround</p>
            </div>
            <div>
              <h4 className="text-orange-500 font-semibold mb-1">Alta</h4>
              <p className="text-[var(--gray)]">Funcionalidade principal afetada, workaround dificil</p>
            </div>
            <div>
              <h4 className="text-yellow-500 font-semibold mb-1">Media</h4>
              <p className="text-[var(--gray)]">Funcionalidade secundaria, workaround disponivel</p>
            </div>
            <div>
              <h4 className="text-green-500 font-semibold mb-1">Baixa</h4>
              <p className="text-[var(--gray)]">Problema visual, nao afeta funcionalidade</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
