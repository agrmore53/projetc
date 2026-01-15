'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Copy, Check, FileText } from 'lucide-react'

export default function ComunicadoInternoPage() {
  const [copied, setCopied] = useState(false)

  const [comunicado, setComunicado] = useState({
    tipo: 'anuncio',
    assunto: '',
    remetente: '',
    cargo: '',
    destinatarios: 'Todos os colaboradores',
    dataEfetiva: '',
    contexto: '',
    mensagemPrincipal: '',
    impacto: '',
    proximosPassos: '',
    contato: ''
  })

  const tipos = [
    { value: 'anuncio', label: 'Anuncio Geral' },
    { value: 'mudanca', label: 'Mudanca Organizacional' },
    { value: 'politica', label: 'Nova Politica' },
    { value: 'conquista', label: 'Conquista/Celebracao' },
    { value: 'processo', label: 'Novo Processo' },
    { value: 'beneficio', label: 'Beneficios' },
  ]

  const templates = {
    anuncio: {
      contexto: 'E com satisfacao que compartilho uma importante novidade com todos voces.',
      impacto: 'Esta mudanca reflete nosso compromisso continuo com [objetivo] e trara beneficios como [beneficios].',
      proximosPassos: '• Nas proximas semanas, [acao 1]\n• Ate [data], [acao 2]\n• Em caso de duvidas, procure [contato]'
    },
    mudanca: {
      contexto: 'Como parte de nossa estrategia de crescimento e melhoria continua, estamos anunciando mudancas importantes.',
      impacto: 'Estas mudancas visam [objetivo] e afetarao [areas/pessoas]. Estamos confiantes de que [beneficio esperado].',
      proximosPassos: '• A transicao comeca em [data]\n• Reunioes de alinhamento serao realizadas em [periodo]\n• Documentacao detalhada sera compartilhada via [canal]'
    },
    politica: {
      contexto: 'Com objetivo de [objetivo], estamos implementando uma nova politica de [area].',
      impacto: 'A nova politica entra em vigor a partir de [data] e se aplica a [quem]. Os principais pontos sao: [pontos].',
      proximosPassos: '• Leia a politica completa em [link]\n• Participe do treinamento em [data]\n• Assine o termo de ciencia ate [data]'
    },
    conquista: {
      contexto: 'Tenho o prazer de compartilhar uma excelente noticia com toda a equipe!',
      impacto: 'Esta conquista e resultado do trabalho dedicado de todos e nos posiciona [posicionamento]. Parabens a todos os envolvidos!',
      proximosPassos: '• Celebracao programada para [data]\n• Reconhecimento especial para [equipes/pessoas]\n• Proximos desafios: [metas]'
    },
    processo: {
      contexto: 'Para melhorar nossa eficiencia e padronizar operacoes, estamos implementando um novo processo de [area].',
      impacto: 'O novo processo substitui [processo antigo] e trara [beneficios]. Todos os colaboradores de [areas] serao impactados.',
      proximosPassos: '• Treinamento obrigatorio em [data]\n• Periodo de transicao: [periodo]\n• Suporte disponivel via [canal]'
    },
    beneficio: {
      contexto: 'Como parte do nosso compromisso com o bem-estar dos colaboradores, temos novidades sobre beneficios.',
      impacto: 'A partir de [data], todos os colaboradores [elegibilidade] terao acesso a [beneficio]. Este beneficio inclui [detalhes].',
      proximosPassos: '• Cadastro disponivel a partir de [data]\n• Acesse [link] para mais informacoes\n• Duvidas: entre em contato com RH'
    }
  }

  const aplicarTemplate = () => {
    const template = templates[comunicado.tipo as keyof typeof templates]
    if (template) {
      setComunicado({
        ...comunicado,
        contexto: template.contexto,
        impacto: template.impacto,
        proximosPassos: template.proximosPassos
      })
    }
  }

  const gerarComunicado = () => {
    const tipoLabel = tipos.find(t => t.value === comunicado.tipo)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
                    COMUNICADO INTERNO
═══════════════════════════════════════════════════════════════

Tipo: ${tipoLabel}
Data: ${new Date().toLocaleDateString('pt-BR')}
${comunicado.dataEfetiva ? `Data Efetiva: ${comunicado.dataEfetiva}` : ''}

De: ${comunicado.remetente || '[Nome]'}${comunicado.cargo ? `, ${comunicado.cargo}` : ''}
Para: ${comunicado.destinatarios}

─────────────────────────────────────────────────────────────
ASSUNTO: ${comunicado.assunto || '[Assunto do Comunicado]'}
─────────────────────────────────────────────────────────────

Prezados colaboradores,

${comunicado.contexto || '[Contexto e introducao]'}

${comunicado.mensagemPrincipal || '[Mensagem principal com detalhes]'}

IMPACTO
─────────────────────────────────────────────────────────────
${comunicado.impacto || '[Descreva o impacto e beneficios]'}

PROXIMOS PASSOS
─────────────────────────────────────────────────────────────
${comunicado.proximosPassos || '[Liste as acoes e prazos]'}

${comunicado.contato ? `
CONTATO
─────────────────────────────────────────────────────────────
Para duvidas ou mais informacoes: ${comunicado.contato}
` : ''}
Atenciosamente,

${comunicado.remetente || '[Nome]'}
${comunicado.cargo || '[Cargo]'}

═══════════════════════════════════════════════════════════════
Este comunicado e confidencial e destinado apenas aos colaboradores.
`
  }

  const copiarComunicado = () => {
    navigator.clipboard.writeText(gerarComunicado())
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
            <Mail className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Comunicado <span className="gold-text">Interno</span>
          </h1>
          <p className="text-[var(--gray)]">Crie comunicados profissionais para sua equipe</p>
        </div>

        {/* Tipo e Template */}
        <div className="glass card mb-8">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="input-label">Tipo de Comunicado</label>
              <select
                value={comunicado.tipo}
                onChange={(e) => setComunicado({ ...comunicado, tipo: e.target.value })}
                className="input-field"
              >
                {tipos.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <button onClick={aplicarTemplate} className="btn-secondary">
              Aplicar Template
            </button>
          </div>
        </div>

        {/* Cabecalho */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Cabecalho</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Remetente</label>
              <input
                type="text"
                value={comunicado.remetente}
                onChange={(e) => setComunicado({ ...comunicado, remetente: e.target.value })}
                placeholder="Nome completo"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cargo</label>
              <input
                type="text"
                value={comunicado.cargo}
                onChange={(e) => setComunicado({ ...comunicado, cargo: e.target.value })}
                placeholder="CEO, Diretor de RH, etc."
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Destinatarios</label>
              <input
                type="text"
                value={comunicado.destinatarios}
                onChange={(e) => setComunicado({ ...comunicado, destinatarios: e.target.value })}
                placeholder="Todos os colaboradores"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data Efetiva (opcional)</label>
              <input
                type="text"
                value={comunicado.dataEfetiva}
                onChange={(e) => setComunicado({ ...comunicado, dataEfetiva: e.target.value })}
                placeholder="A partir de..."
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Assunto</label>
              <input
                type="text"
                value={comunicado.assunto}
                onChange={(e) => setComunicado({ ...comunicado, assunto: e.target.value })}
                placeholder="Assunto claro e direto"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Conteudo */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Conteudo</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Contexto / Introducao</label>
              <textarea
                value={comunicado.contexto}
                onChange={(e) => setComunicado({ ...comunicado, contexto: e.target.value })}
                placeholder="Apresente o contexto da comunicacao..."
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Mensagem Principal</label>
              <textarea
                value={comunicado.mensagemPrincipal}
                onChange={(e) => setComunicado({ ...comunicado, mensagemPrincipal: e.target.value })}
                placeholder="Detalhes da mensagem..."
                className="input-field min-h-[100px]"
              />
            </div>
            <div>
              <label className="input-label">Impacto / Beneficios</label>
              <textarea
                value={comunicado.impacto}
                onChange={(e) => setComunicado({ ...comunicado, impacto: e.target.value })}
                placeholder="Como isso afeta a equipe..."
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Proximos Passos</label>
              <textarea
                value={comunicado.proximosPassos}
                onChange={(e) => setComunicado({ ...comunicado, proximosPassos: e.target.value })}
                placeholder="• Acao 1&#10;• Acao 2&#10;• Acao 3"
                className="input-field min-h-[100px]"
              />
            </div>
            <div>
              <label className="input-label">Contato para Duvidas (opcional)</label>
              <input
                type="text"
                value={comunicado.contato}
                onChange={(e) => setComunicado({ ...comunicado, contato: e.target.value })}
                placeholder="email@empresa.com ou nome do responsavel"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <div className="bg-black/30 rounded-xl p-6 max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarComunicado()}
            </pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarComunicado} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Comunicado'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Comunicacao Interna</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Boas Praticas</h4>
              <ul className="space-y-1">
                <li>• Seja claro e direto</li>
                <li>• Explique o "por que" da mudanca</li>
                <li>• Antecipe duvidas frequentes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Timing</h4>
              <ul className="space-y-1">
                <li>• Envie no inicio da semana</li>
                <li>• Evite sextas e vesperas de feriado</li>
                <li>• De tempo para absorcao</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
