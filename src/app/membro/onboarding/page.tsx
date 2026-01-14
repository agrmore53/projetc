'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Rocket, Copy, Check, Plus, Trash2, ChevronDown, ChevronUp, Clock, Mail, Phone, Video, FileText, CheckCircle } from 'lucide-react'

interface Etapa {
  id: string
  dia: number
  titulo: string
  descricao: string
  tipo: 'email' | 'call' | 'video' | 'task' | 'check'
  responsavel: string
  conteudo: string
}

interface Template {
  id: string
  nome: string
  descricao: string
  duracao: string
  etapas: Etapa[]
}

export default function OnboardingPage() {
  const [copied, setCopied] = useState(false)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [nomeCliente, setNomeCliente] = useState('')
  const [tipoServico, setTipoServico] = useState('')

  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: '1', dia: 0, titulo: 'Email de Boas-vindas', descricao: 'Primeiro contato pos-venda', tipo: 'email', responsavel: 'CS', conteudo: 'Ola [NOME],\n\nSeja muito bem-vindo(a) a [EMPRESA]!\n\nEstamos muito felizes em te-lo(a) conosco. Nos proximos dias, vamos guia-lo(a) por todo o processo de implementacao.\n\nPrimeiros passos:\n1. Agende sua call de kickoff\n2. Prepare os acessos necessarios\n3. Revise a documentacao enviada\n\nQualquer duvida, estamos a disposicao!\n\nAbraco,\n[SEU NOME]' },
    { id: '2', dia: 1, titulo: 'Call de Kickoff', descricao: 'Alinhamento de expectativas', tipo: 'video', responsavel: 'CS', conteudo: 'Agenda da Call:\n\n1. Apresentacoes (5 min)\n2. Revisao dos objetivos do projeto (10 min)\n3. Cronograma de implementacao (10 min)\n4. Definicao de responsaveis (5 min)\n5. Proximos passos (5 min)\n6. Perguntas (5 min)\n\nTotal: 40 minutos' },
    { id: '3', dia: 3, titulo: 'Envio de Acessos', descricao: 'Credenciais e documentacao', tipo: 'email', responsavel: 'Suporte', conteudo: 'Ola [NOME],\n\nSegue seus acessos a plataforma:\n\nURL: [LINK]\nUsuario: [EMAIL]\nSenha temporaria: [SENHA]\n\nRecomendamos que altere sua senha no primeiro acesso.\n\nDocumentacao de apoio:\n- Guia de inicio rapido\n- Videos tutoriais\n- FAQ\n\nBoa exploracao!' },
    { id: '4', dia: 5, titulo: 'Check-in de Implementacao', descricao: 'Verificar progresso inicial', tipo: 'call', responsavel: 'CS', conteudo: 'Roteiro do Check-in:\n\n1. Como foi a primeira experiencia?\n2. Conseguiu acessar tudo?\n3. Alguma dificuldade tecnica?\n4. Precisa de suporte adicional?\n5. Proximos marcos a atingir' },
    { id: '5', dia: 7, titulo: 'Treinamento Principal', descricao: 'Capacitacao da equipe', tipo: 'video', responsavel: 'CS', conteudo: 'Modulos do Treinamento:\n\n1. Visao geral da plataforma (15 min)\n2. Funcionalidades principais (30 min)\n3. Casos de uso praticos (20 min)\n4. Melhores praticas (15 min)\n5. Duvidas e pratica (20 min)\n\nTotal: 1h40' },
    { id: '6', dia: 14, titulo: 'Revisao de 2 Semanas', descricao: 'Avaliacao de progresso', tipo: 'video', responsavel: 'CS', conteudo: 'Pauta da Reuniao:\n\n1. Revisao das metricas iniciais\n2. Feedback da equipe\n3. Desafios encontrados\n4. Ajustes necessarios\n5. Planejamento proximas 2 semanas' },
    { id: '7', dia: 21, titulo: 'Check de Adocao', descricao: 'Verificar uso da solucao', tipo: 'task', responsavel: 'CS', conteudo: 'Checklist de Adocao:\n\n[ ] Usuario principal ativo\n[ ] Equipe treinada\n[ ] Primeiros resultados medidos\n[ ] Integracao funcionando\n[ ] Documentacao consultada\n[ ] Suporte acionado (se necessario)' },
    { id: '8', dia: 30, titulo: 'Revisao de 30 Dias', descricao: 'Encerramento do onboarding', tipo: 'video', responsavel: 'CS', conteudo: 'Agenda de Encerramento:\n\n1. Celebrar conquistas do primeiro mes\n2. Revisao de KPIs vs objetivos\n3. Feedback geral da experiencia\n4. Transicao para suporte continuo\n5. Introducao ao Customer Success\n6. Proximos passos e objetivos Q+1' },
  ])

  const templates: Template[] = [
    {
      id: 'saas',
      nome: 'SaaS / Software',
      descricao: 'Para produtos digitais com self-service',
      duracao: '30 dias',
      etapas: [
        { id: '1', dia: 0, titulo: 'Email de Boas-vindas', descricao: 'Acesso e primeiros passos', tipo: 'email', responsavel: 'Automacao', conteudo: 'Boas-vindas com link de acesso e quick start guide' },
        { id: '2', dia: 1, titulo: 'Tutorial Interativo', descricao: 'Onboarding in-app', tipo: 'task', responsavel: 'Produto', conteudo: 'Tour guiado pela plataforma' },
        { id: '3', dia: 3, titulo: 'Email de Dicas', descricao: 'Melhores praticas', tipo: 'email', responsavel: 'Automacao', conteudo: '5 dicas para comecar com o pe direito' },
        { id: '4', dia: 7, titulo: 'Check-in Automatico', descricao: 'Verificar ativacao', tipo: 'email', responsavel: 'Automacao', conteudo: 'Pergunta se precisa de ajuda' },
        { id: '5', dia: 14, titulo: 'Call de Sucesso', descricao: 'Para contas premium', tipo: 'video', responsavel: 'CS', conteudo: 'Revisao de uso e otimizacao' },
      ]
    },
    {
      id: 'consultoria',
      nome: 'Consultoria / Servicos',
      descricao: 'Para servicos de alto toque',
      duracao: '60 dias',
      etapas: [
        { id: '1', dia: 0, titulo: 'Contrato e Boas-vindas', descricao: 'Documentacao inicial', tipo: 'email', responsavel: 'Admin', conteudo: 'Envio de contrato e kit de boas-vindas' },
        { id: '2', dia: 2, titulo: 'Kickoff Meeting', descricao: 'Alinhamento completo', tipo: 'video', responsavel: 'Consultor', conteudo: 'Reuniao de 2h com todos stakeholders' },
        { id: '3', dia: 7, titulo: 'Diagnostico Inicial', descricao: 'Analise da situacao', tipo: 'task', responsavel: 'Consultor', conteudo: 'Entrega do relatorio diagnostico' },
        { id: '4', dia: 14, titulo: 'Plano de Acao', descricao: 'Proposta de trabalho', tipo: 'video', responsavel: 'Consultor', conteudo: 'Apresentacao e aprovacao do plano' },
        { id: '5', dia: 30, titulo: 'Review Mensal', descricao: 'Revisao de progresso', tipo: 'video', responsavel: 'Consultor', conteudo: 'Primeira revisao de resultados' },
        { id: '6', dia: 60, titulo: 'Encerramento Fase 1', descricao: 'Conclusao inicial', tipo: 'video', responsavel: 'Consultor', conteudo: 'Entrega de resultados e proxima fase' },
      ]
    },
    {
      id: 'ecommerce',
      nome: 'E-commerce / Varejo',
      descricao: 'Para novos lojistas',
      duracao: '14 dias',
      etapas: [
        { id: '1', dia: 0, titulo: 'Boas-vindas + Acesso', descricao: 'Credenciais da loja', tipo: 'email', responsavel: 'Sistema', conteudo: 'Link de acesso ao painel' },
        { id: '2', dia: 1, titulo: 'Setup da Loja', descricao: 'Configuracao inicial', tipo: 'call', responsavel: 'Suporte', conteudo: 'Call para configurar a loja' },
        { id: '3', dia: 3, titulo: 'Cadastro de Produtos', descricao: 'Ajuda com catalogo', tipo: 'video', responsavel: 'Suporte', conteudo: 'Treinamento de cadastro' },
        { id: '4', dia: 7, titulo: 'Integracao Pagamentos', descricao: 'Setup financeiro', tipo: 'task', responsavel: 'Financeiro', conteudo: 'Configurar gateway de pagamento' },
        { id: '5', dia: 14, titulo: 'Go Live', descricao: 'Loja no ar!', tipo: 'check', responsavel: 'CS', conteudo: 'Verificacao final e lancamento' },
      ]
    }
  ]

  const aplicarTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setEtapas(template.etapas.map(e => ({ ...e, id: Date.now().toString() + e.id })))
    }
  }

  const adicionarEtapa = () => {
    const maxDia = Math.max(...etapas.map(e => e.dia), 0)
    const novaEtapa: Etapa = {
      id: Date.now().toString(),
      dia: maxDia + 1,
      titulo: 'Nova Etapa',
      descricao: 'Descricao da etapa',
      tipo: 'email',
      responsavel: 'CS',
      conteudo: ''
    }
    setEtapas([...etapas, novaEtapa].sort((a, b) => a.dia - b.dia))
  }

  const removerEtapa = (id: string) => {
    setEtapas(etapas.filter(e => e.id !== id))
  }

  const atualizarEtapa = (id: string, campo: keyof Etapa, valor: string | number) => {
    setEtapas(etapas.map(e =>
      e.id === id ? { ...e, [campo]: valor } : e
    ).sort((a, b) => a.dia - b.dia))
  }

  const getIconTipo = (tipo: string) => {
    const icons: Record<string, React.ReactNode> = {
      'email': <Mail className="w-4 h-4" />,
      'call': <Phone className="w-4 h-4" />,
      'video': <Video className="w-4 h-4" />,
      'task': <FileText className="w-4 h-4" />,
      'check': <CheckCircle className="w-4 h-4" />,
    }
    return icons[tipo] || <Clock className="w-4 h-4" />
  }

  const getCorTipo = (tipo: string) => {
    const cores: Record<string, string> = {
      'email': '#3b82f6',
      'call': '#22c55e',
      'video': '#a855f7',
      'task': '#f59e0b',
      'check': '#14b8a6',
    }
    return cores[tipo] || '#6b7280'
  }

  const copiarOnboarding = () => {
    const texto = `
PROCESSO DE ONBOARDING
======================
Cliente: ${nomeCliente || '[Nome do Cliente]'}
Servico: ${tipoServico || '[Tipo de Servico]'}
Duracao: ${Math.max(...etapas.map(e => e.dia))} dias

CRONOGRAMA
----------
${etapas.map(e => `
DIA ${e.dia} - ${e.titulo}
Tipo: ${e.tipo.toUpperCase()}
Responsavel: ${e.responsavel}
Descricao: ${e.descricao}

Conteudo:
${e.conteudo}
`).join('\n---\n')}

Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
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
            <Rocket className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Onboarding</span>
          </h1>
          <p className="text-[var(--gray)]">Crie jornadas de onboarding para clientes</p>
        </div>

        {/* Info do Cliente */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Informacoes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Cliente</label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Ex: Empresa ABC"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Tipo de Servico</label>
              <input
                type="text"
                value={tipoServico}
                onChange={(e) => setTipoServico(e.target.value)}
                placeholder="Ex: Plano Premium"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Templates Prontos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => aplicarTemplate(t.id)}
                className="p-4 rounded-xl border border-white/20 hover:border-[var(--gold)] text-left transition-all"
              >
                <h3 className="font-semibold mb-1">{t.nome}</h3>
                <p className="text-xs text-[var(--gray)] mb-2">{t.descricao}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--gold)]">
                  <Clock className="w-3 h-3" />
                  {t.duracao}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg">Jornada de Onboarding</h2>
            <button onClick={adicionarEtapa} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Nova Etapa
            </button>
          </div>

          <div className="relative">
            {/* Linha do tempo */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

            <div className="space-y-4">
              {etapas.map((etapa) => (
                <div key={etapa.id} className="relative pl-16">
                  {/* Marcador */}
                  <div
                    className="absolute left-4 w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: getCorTipo(etapa.tipo) }}
                  >
                    {getIconTipo(etapa.tipo)}
                  </div>

                  {/* Card */}
                  <div className="bg-black/30 rounded-xl overflow-hidden">
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandido(expandido === etapa.id ? null : etapa.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{ backgroundColor: `${getCorTipo(etapa.tipo)}30`, color: getCorTipo(etapa.tipo) }}
                          >
                            Dia {etapa.dia}
                          </span>
                          <div>
                            <h3 className="font-semibold">{etapa.titulo}</h3>
                            <p className="text-xs text-[var(--gray)]">{etapa.descricao}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 bg-white/10 rounded">{etapa.responsavel}</span>
                          {expandido === etapa.id ? (
                            <ChevronUp className="w-4 h-4 text-[var(--gray)]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[var(--gray)]" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Conteudo Expandido */}
                    {expandido === etapa.id && (
                      <div className="px-4 pb-4 border-t border-white/10 pt-4">
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="input-label text-xs">Dia</label>
                            <input
                              type="number"
                              value={etapa.dia}
                              onChange={(e) => atualizarEtapa(etapa.id, 'dia', Number(e.target.value))}
                              className="input-field text-sm"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="input-label text-xs">Tipo</label>
                            <select
                              value={etapa.tipo}
                              onChange={(e) => atualizarEtapa(etapa.id, 'tipo', e.target.value)}
                              className="input-field text-sm"
                            >
                              <option value="email">Email</option>
                              <option value="call">Ligacao</option>
                              <option value="video">Video Call</option>
                              <option value="task">Tarefa</option>
                              <option value="check">Checkpoint</option>
                            </select>
                          </div>
                          <div>
                            <label className="input-label text-xs">Responsavel</label>
                            <input
                              type="text"
                              value={etapa.responsavel}
                              onChange={(e) => atualizarEtapa(etapa.id, 'responsavel', e.target.value)}
                              className="input-field text-sm"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="input-label text-xs">Titulo</label>
                          <input
                            type="text"
                            value={etapa.titulo}
                            onChange={(e) => atualizarEtapa(etapa.id, 'titulo', e.target.value)}
                            className="input-field text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="input-label text-xs">Descricao</label>
                          <input
                            type="text"
                            value={etapa.descricao}
                            onChange={(e) => atualizarEtapa(etapa.id, 'descricao', e.target.value)}
                            className="input-field text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="input-label text-xs">Conteudo/Script</label>
                          <textarea
                            value={etapa.conteudo}
                            onChange={(e) => atualizarEtapa(etapa.id, 'conteudo', e.target.value)}
                            className="input-field text-sm min-h-[150px]"
                            placeholder="Escreva o conteudo do email, roteiro da call, etc..."
                          />
                        </div>

                        <button
                          onClick={() => removerEtapa(etapa.id)}
                          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Remover Etapa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {etapas.length === 0 && (
            <div className="text-center py-12 text-[var(--gray)]">
              <Rocket className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma etapa criada</p>
              <p className="text-sm">Use um template ou adicione etapas manualmente</p>
            </div>
          )}
        </div>

        {/* Acoes */}
        <div className="flex justify-center">
          <button
            onClick={copiarOnboarding}
            className="btn-primary flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Processo Completo'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Melhores Praticas de Onboarding</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Primeiros 7 dias sao criticos</h4>
              <p>80% da percepcao de valor e formada na primeira semana. Capriche!</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Misture canais</h4>
              <p>Combine emails automaticos com toques humanos para melhor experiencia.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Defina marcos claros</h4>
              <p>O cliente deve saber exatamente onde esta e qual o proximo passo.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Celebre pequenas vitorias</h4>
              <p>Cada conquista do cliente deve ser reconhecida e celebrada.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
