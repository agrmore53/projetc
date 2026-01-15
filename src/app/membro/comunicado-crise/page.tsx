'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Copy, Check, Shield } from 'lucide-react'

export default function ComunicadoCrisePage() {
  const [copied, setCopied] = useState(false)

  const [crise, setCrise] = useState({
    tipo: 'indisponibilidade',
    empresa: '',
    dataIncidente: new Date().toISOString().split('T')[0],
    horaIncidente: '',
    descricaoProblema: '',
    impactoClientes: '',
    causaRaiz: '',
    acoesTomadas: '',
    previsaoResolucao: '',
    medidaPreventiva: '',
    contato: '',
    atualizacoes: ''
  })

  const tipos = [
    { value: 'indisponibilidade', label: 'Indisponibilidade do Sistema' },
    { value: 'seguranca', label: 'Incidente de Seguranca' },
    { value: 'dados', label: 'Problema com Dados' },
    { value: 'performance', label: 'Degradacao de Performance' },
    { value: 'integracao', label: 'Falha em Integracao' },
    { value: 'pagamento', label: 'Problema em Pagamentos' },
  ]

  const templates = {
    indisponibilidade: {
      descricaoProblema: 'Identificamos uma indisponibilidade em nossos sistemas que esta afetando o acesso a plataforma.',
      impactoClientes: 'Usuarios podem experimentar dificuldades para acessar a plataforma ou lentidao em algumas funcionalidades.',
      acoesTomadas: '• Equipe tecnica mobilizada e trabalhando na resolucao\n• Monitoramento intensivo ativado\n• Comunicacao continua com stakeholders'
    },
    seguranca: {
      descricaoProblema: 'Detectamos uma atividade suspeita em nossos sistemas que estamos investigando como potencial incidente de seguranca.',
      impactoClientes: 'Por precaucao, algumas funcionalidades podem estar temporariamente indisponiveis enquanto conduzimos a investigacao.',
      acoesTomadas: '• Equipe de seguranca investigando ativamente\n• Medidas de contencao implementadas\n• Revisao de logs e acessos em andamento'
    },
    dados: {
      descricaoProblema: 'Identificamos uma inconsistencia em alguns dados do sistema que pode afetar relatorios e informacoes exibidas.',
      impactoClientes: 'Alguns dados podem estar sendo exibidos incorretamente. Recomendamos aguardar a correcao antes de tomar decisoes baseadas nesses dados.',
      acoesTomadas: '• Analise da extensao do problema em andamento\n• Backup dos dados realizado\n• Processo de correcao iniciado'
    },
    performance: {
      descricaoProblema: 'Estamos enfrentando uma degradacao de performance que esta causando lentidao em nossa plataforma.',
      impactoClientes: 'Usuarios podem experimentar tempos de carregamento maiores que o normal. Todas as funcionalidades permanecem disponiveis.',
      acoesTomadas: '• Identificacao de gargalos em andamento\n• Escalonamento de recursos sendo avaliado\n• Otimizacoes emergenciais sendo aplicadas'
    },
    integracao: {
      descricaoProblema: 'Identificamos uma falha na integracao com [parceiro/servico] que esta afetando funcionalidades relacionadas.',
      impactoClientes: 'Funcionalidades que dependem desta integracao podem estar temporariamente indisponiveis ou apresentando erros.',
      acoesTomadas: '• Contato estabelecido com o parceiro\n• Solucao alternativa sendo avaliada\n• Monitoramento da integracao intensificado'
    },
    pagamento: {
      descricaoProblema: 'Identificamos um problema no processamento de pagamentos que pode estar afetando transacoes.',
      impactoClientes: 'Algumas transacoes podem estar falhando ou demorando mais que o normal para serem processadas.',
      acoesTomadas: '• Gateway de pagamento notificado\n• Transacoes afetadas sendo identificadas\n• Processo de reprocessamento preparado'
    }
  }

  const aplicarTemplate = () => {
    const template = templates[crise.tipo as keyof typeof templates]
    if (template) {
      setCrise({
        ...crise,
        descricaoProblema: template.descricaoProblema,
        impactoClientes: template.impactoClientes,
        acoesTomadas: template.acoesTomadas
      })
    }
  }

  const gerarComunicado = () => {
    const tipoLabel = tipos.find(t => t.value === crise.tipo)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
              COMUNICADO DE INCIDENTE
═══════════════════════════════════════════════════════════════

${crise.empresa ? `Empresa: ${crise.empresa}` : ''}
Tipo: ${tipoLabel}
Data do Incidente: ${crise.dataIncidente}${crise.horaIncidente ? ` as ${crise.horaIncidente}` : ''}
Status: EM TRATAMENTO

─────────────────────────────────────────────────────────────
O QUE ACONTECEU
─────────────────────────────────────────────────────────────

${crise.descricaoProblema || '[Descricao do problema]'}

─────────────────────────────────────────────────────────────
IMPACTO PARA CLIENTES
─────────────────────────────────────────────────────────────

${crise.impactoClientes || '[Impacto para os clientes]'}

${crise.causaRaiz ? `
─────────────────────────────────────────────────────────────
CAUSA RAIZ (Preliminar)
─────────────────────────────────────────────────────────────

${crise.causaRaiz}
` : ''}

─────────────────────────────────────────────────────────────
ACOES TOMADAS
─────────────────────────────────────────────────────────────

${crise.acoesTomadas || '[Acoes em andamento]'}

${crise.previsaoResolucao ? `
─────────────────────────────────────────────────────────────
PREVISAO DE RESOLUCAO
─────────────────────────────────────────────────────────────

${crise.previsaoResolucao}
` : ''}

${crise.medidaPreventiva ? `
─────────────────────────────────────────────────────────────
MEDIDAS PREVENTIVAS
─────────────────────────────────────────────────────────────

${crise.medidaPreventiva}
` : ''}

─────────────────────────────────────────────────────────────
PROXIMAS ATUALIZACOES
─────────────────────────────────────────────────────────────

${crise.atualizacoes || 'Enviaremos novas atualizacoes conforme o progresso da resolucao.'}

${crise.contato ? `
─────────────────────────────────────────────────────────────
CONTATO
─────────────────────────────────────────────────────────────

Para duvidas urgentes: ${crise.contato}
` : ''}

═══════════════════════════════════════════════════════════════
Lamentamos o inconveniente e agradecemos sua compreensao.
Comunicado emitido em: ${new Date().toLocaleString('pt-BR')}
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
          <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Comunicado de <span className="text-red-400">Crise</span>
          </h1>
          <p className="text-[var(--gray)]">Comunique incidentes de forma profissional</p>
        </div>

        {/* Tipo */}
        <div className="glass card mb-8 border border-red-500/30">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="input-label">Tipo de Incidente</label>
              <select
                value={crise.tipo}
                onChange={(e) => setCrise({ ...crise, tipo: e.target.value })}
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

        {/* Dados Basicos */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados do Incidente</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Empresa</label>
              <input
                type="text"
                value={crise.empresa}
                onChange={(e) => setCrise({ ...crise, empresa: e.target.value })}
                placeholder="Nome da empresa"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data do Incidente</label>
              <input
                type="date"
                value={crise.dataIncidente}
                onChange={(e) => setCrise({ ...crise, dataIncidente: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Hora (opcional)</label>
              <input
                type="time"
                value={crise.horaIncidente}
                onChange={(e) => setCrise({ ...crise, horaIncidente: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Contato para Urgencias</label>
              <input
                type="text"
                value={crise.contato}
                onChange={(e) => setCrise({ ...crise, contato: e.target.value })}
                placeholder="Email ou telefone"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Conteudo */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Conteudo do Comunicado</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Descricao do Problema</label>
              <textarea
                value={crise.descricaoProblema}
                onChange={(e) => setCrise({ ...crise, descricaoProblema: e.target.value })}
                placeholder="O que aconteceu..."
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Impacto para Clientes</label>
              <textarea
                value={crise.impactoClientes}
                onChange={(e) => setCrise({ ...crise, impactoClientes: e.target.value })}
                placeholder="Como isso afeta os clientes..."
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Causa Raiz (opcional)</label>
              <textarea
                value={crise.causaRaiz}
                onChange={(e) => setCrise({ ...crise, causaRaiz: e.target.value })}
                placeholder="Causa identificada ou em investigacao..."
                className="input-field min-h-[60px]"
              />
            </div>
            <div>
              <label className="input-label">Acoes Tomadas</label>
              <textarea
                value={crise.acoesTomadas}
                onChange={(e) => setCrise({ ...crise, acoesTomadas: e.target.value })}
                placeholder="• Acao 1&#10;• Acao 2&#10;• Acao 3"
                className="input-field min-h-[100px]"
              />
            </div>
            <div>
              <label className="input-label">Previsao de Resolucao (opcional)</label>
              <input
                type="text"
                value={crise.previsaoResolucao}
                onChange={(e) => setCrise({ ...crise, previsaoResolucao: e.target.value })}
                placeholder="Ex: Estimamos resolucao em 2 horas"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Medidas Preventivas (opcional)</label>
              <textarea
                value={crise.medidaPreventiva}
                onChange={(e) => setCrise({ ...crise, medidaPreventiva: e.target.value })}
                placeholder="O que sera feito para evitar recorrencia..."
                className="input-field min-h-[60px]"
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
        <div className="glass p-6 border border-red-500/30">
          <h3 className="font-display text-lg text-red-400 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Comunicacao de Crise
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Faca</h4>
              <ul className="space-y-1">
                <li>• Comunique rapidamente</li>
                <li>• Seja transparente sobre o impacto</li>
                <li>• Atualize frequentemente</li>
                <li>• Assuma responsabilidade</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Evite</h4>
              <ul className="space-y-1">
                <li>• Minimizar o problema</li>
                <li>• Culpar terceiros prematuramente</li>
                <li>• Prometer prazos irreais</li>
                <li>• Ficar em silencio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
