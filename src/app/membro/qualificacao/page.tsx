'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckSquare, Square, Copy, Check, RotateCcw, Target, DollarSign, Clock, Users, Zap, AlertTriangle } from 'lucide-react'

interface Criterio {
  id: string
  categoria: string
  pergunta: string
  dica: string
  peso: number
  checked: boolean
  resposta: string
}

export default function QualificacaoPage() {
  const [framework, setFramework] = useState('bant')
  const [nomeLead, setNomeLead] = useState('')
  const [copied, setCopied] = useState(false)

  const [criteriosBant, setCriteriosBant] = useState<Criterio[]>([
    // Budget
    { id: 'b1', categoria: 'Budget', pergunta: 'O lead tem orcamento definido para essa solucao?', dica: 'Pergunte: "Voces ja tem um orcamento reservado para isso?"', peso: 25, checked: false, resposta: '' },
    { id: 'b2', categoria: 'Budget', pergunta: 'O orcamento e compativel com seu preco?', dica: 'Valide se o range do cliente faz sentido com sua precificacao', peso: 15, checked: false, resposta: '' },
    { id: 'b3', categoria: 'Budget', pergunta: 'Ha flexibilidade no orcamento se necessario?', dica: 'Entenda se ha margem para negociacao', peso: 10, checked: false, resposta: '' },
    // Authority
    { id: 'a1', categoria: 'Authority', pergunta: 'Voce esta falando com o decisor final?', dica: 'Pergunte: "Alem de voce, quem mais participa dessa decisao?"', peso: 25, checked: false, resposta: '' },
    { id: 'a2', categoria: 'Authority', pergunta: 'Conhece todos os stakeholders envolvidos?', dica: 'Mapeie quem influencia e quem decide', peso: 10, checked: false, resposta: '' },
    { id: 'a3', categoria: 'Authority', pergunta: 'Tem acesso direto ao C-level se necessario?', dica: 'Em vendas complexas, acesso ao topo e crucial', peso: 10, checked: false, resposta: '' },
    // Need
    { id: 'n1', categoria: 'Need', pergunta: 'A dor/necessidade esta claramente identificada?', dica: 'O cliente deve conseguir articular o problema', peso: 20, checked: false, resposta: '' },
    { id: 'n2', categoria: 'Need', pergunta: 'A necessidade e urgente ou apenas "nice to have"?', dica: 'Prioridade alta = maior chance de fechar', peso: 15, checked: false, resposta: '' },
    { id: 'n3', categoria: 'Need', pergunta: 'Sua solucao resolve o problema especifico?', dica: 'Fit entre problema e solucao deve ser claro', peso: 15, checked: false, resposta: '' },
    // Timeline
    { id: 't1', categoria: 'Timeline', pergunta: 'Ha um prazo definido para implementacao?', dica: 'Pergunte: "Quando voces precisam ter isso funcionando?"', peso: 20, checked: false, resposta: '' },
    { id: 't2', categoria: 'Timeline', pergunta: 'O timeline e realista?', dica: 'Muito rapido ou muito longo sao sinais de alerta', peso: 10, checked: false, resposta: '' },
    { id: 't3', categoria: 'Timeline', pergunta: 'Ha eventos/gatilhos que aceleram a decisao?', dica: 'Ex: fim de contrato atual, mudanca de gestao, etc.', peso: 10, checked: false, resposta: '' },
  ])

  const [criteriosMeddic, setCriteriosMeddic] = useState<Criterio[]>([
    // Metrics
    { id: 'm1', categoria: 'Metrics', pergunta: 'O cliente tem metricas de sucesso definidas?', dica: 'Quais KPIs vao melhorar com sua solucao?', peso: 20, checked: false, resposta: '' },
    { id: 'm2', categoria: 'Metrics', pergunta: 'Voce consegue quantificar o ROI esperado?', dica: 'Calcule o retorno sobre investimento', peso: 15, checked: false, resposta: '' },
    // Economic Buyer
    { id: 'e1', categoria: 'Economic Buyer', pergunta: 'Identificou o comprador economico?', dica: 'Quem assina o cheque?', peso: 25, checked: false, resposta: '' },
    { id: 'e2', categoria: 'Economic Buyer', pergunta: 'Tem acesso ao economic buyer?', dica: 'Consegue falar diretamente com ele?', peso: 15, checked: false, resposta: '' },
    // Decision Criteria
    { id: 'd1', categoria: 'Decision Criteria', pergunta: 'Conhece os criterios de decisao do cliente?', dica: 'O que eles vao avaliar para escolher?', peso: 15, checked: false, resposta: '' },
    { id: 'd2', categoria: 'Decision Criteria', pergunta: 'Seus diferenciais atendem aos criterios?', dica: 'Seu produto se destaca nesses criterios?', peso: 10, checked: false, resposta: '' },
    // Decision Process
    { id: 'dp1', categoria: 'Decision Process', pergunta: 'Entende o processo de decisao completo?', dica: 'Quais sao as etapas ate o fechamento?', peso: 15, checked: false, resposta: '' },
    { id: 'dp2', categoria: 'Decision Process', pergunta: 'Conhece o timeline de decisao?', dica: 'Quando vao decidir?', peso: 10, checked: false, resposta: '' },
    // Identify Pain
    { id: 'i1', categoria: 'Identify Pain', pergunta: 'A dor foi claramente identificada?', dica: 'Qual problema real estao tentando resolver?', peso: 20, checked: false, resposta: '' },
    { id: 'i2', categoria: 'Identify Pain', pergunta: 'A dor e forte o suficiente para agir?', dica: 'Dor fraca = baixa urgencia', peso: 15, checked: false, resposta: '' },
    // Champion
    { id: 'c1', categoria: 'Champion', pergunta: 'Tem um champion interno identificado?', dica: 'Alguem que vai vender por voce internamente', peso: 25, checked: false, resposta: '' },
    { id: 'c2', categoria: 'Champion', pergunta: 'O champion tem poder de influencia?', dica: 'Ele consegue mobilizar a organizacao?', peso: 15, checked: false, resposta: '' },
  ])

  const criterios = framework === 'bant' ? criteriosBant : criteriosMeddic
  const setCriterios = framework === 'bant' ? setCriteriosBant : setCriteriosMeddic

  const toggleCriterio = (id: string) => {
    setCriterios(criterios.map(c =>
      c.id === id ? { ...c, checked: !c.checked } : c
    ))
  }

  const atualizarResposta = (id: string, resposta: string) => {
    setCriterios(criterios.map(c =>
      c.id === id ? { ...c, resposta } : c
    ))
  }

  const resetar = () => {
    setCriterios(criterios.map(c => ({ ...c, checked: false, resposta: '' })))
    setNomeLead('')
  }

  // Calcular score
  const scoreTotal = criterios.reduce((acc, c) => acc + (c.checked ? c.peso : 0), 0)
  const maxScore = criterios.reduce((acc, c) => acc + c.peso, 0)
  const scorePercentual = (scoreTotal / maxScore) * 100

  const getScoreColor = () => {
    if (scorePercentual >= 70) return 'text-green-400'
    if (scorePercentual >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = () => {
    if (scorePercentual >= 70) return 'Lead Quente'
    if (scorePercentual >= 40) return 'Lead Morno'
    return 'Lead Frio'
  }

  const getRecomendacao = () => {
    if (scorePercentual >= 70) return 'Priorize este lead! Alta probabilidade de fechamento. Avance para proposta.'
    if (scorePercentual >= 40) return 'Lead promissor mas precisa de mais nurturing. Trabalhe as lacunas antes de avancar.'
    return 'Lead precisa de muito trabalho. Considere deixar em nurturing automatico ou desqualificar.'
  }

  // Agrupar por categoria
  const categorias = [...new Set(criterios.map(c => c.categoria))]

  const getIconCategoria = (cat: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Budget': <DollarSign className="w-4 h-4" />,
      'Authority': <Users className="w-4 h-4" />,
      'Need': <Target className="w-4 h-4" />,
      'Timeline': <Clock className="w-4 h-4" />,
      'Metrics': <Zap className="w-4 h-4" />,
      'Economic Buyer': <DollarSign className="w-4 h-4" />,
      'Decision Criteria': <CheckSquare className="w-4 h-4" />,
      'Decision Process': <Clock className="w-4 h-4" />,
      'Identify Pain': <AlertTriangle className="w-4 h-4" />,
      'Champion': <Users className="w-4 h-4" />,
    }
    return icons[cat] || <Target className="w-4 h-4" />
  }

  const copiarRelatorio = () => {
    const relatorio = `
RELATORIO DE QUALIFICACAO
========================
Lead: ${nomeLead || '[Nao informado]'}
Framework: ${framework.toUpperCase()}
Score: ${scorePercentual.toFixed(0)}% - ${getScoreLabel()}

${categorias.map(cat => {
  const criteriosCat = criterios.filter(c => c.categoria === cat)
  return `
${cat.toUpperCase()}
${criteriosCat.map(c => `[${c.checked ? 'X' : ' '}] ${c.pergunta}${c.resposta ? `\n    Nota: ${c.resposta}` : ''}`).join('\n')}
`
}).join('')}

RECOMENDACAO:
${getRecomendacao()}

Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(relatorio)
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
            <CheckSquare className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Checklist de <span className="gold-text">Qualificacao</span>
          </h1>
          <p className="text-[var(--gray)]">Qualifique leads com BANT ou MEDDIC</p>
        </div>

        {/* Selecao de Framework e Nome */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Lead</label>
              <input
                type="text"
                value={nomeLead}
                onChange={(e) => setNomeLead(e.target.value)}
                placeholder="Ex: Empresa ABC - Joao Silva"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Framework de Qualificacao</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFramework('bant')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    framework === 'bant'
                      ? 'bg-[var(--gold)] text-black'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  BANT
                </button>
                <button
                  onClick={() => setFramework('meddic')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    framework === 'meddic'
                      ? 'bg-[var(--gold)] text-black'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  MEDDIC
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checklist */}
          <div className="lg:col-span-2 space-y-6">
            {categorias.map(categoria => (
              <div key={categoria} className="glass card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]">
                    {getIconCategoria(categoria)}
                  </div>
                  <h2 className="font-display text-lg">{categoria}</h2>
                </div>

                <div className="space-y-4">
                  {criterios.filter(c => c.categoria === categoria).map(criterio => (
                    <div key={criterio.id} className="bg-black/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleCriterio(criterio.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {criterio.checked ? (
                            <CheckSquare className="w-5 h-5 text-green-400" />
                          ) : (
                            <Square className="w-5 h-5 text-[var(--gray)]" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${criterio.checked ? 'text-green-400' : ''}`}>
                            {criterio.pergunta}
                          </p>
                          <p className="text-xs text-[var(--gray)] mt-1">{criterio.dica}</p>
                          <input
                            type="text"
                            placeholder="Adicione uma nota (opcional)"
                            value={criterio.resposta}
                            onChange={(e) => atualizarResposta(criterio.id, e.target.value)}
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--gold)]"
                          />
                        </div>
                        <span className="text-xs text-[var(--gold)] font-semibold">
                          {criterio.peso}pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Score Card */}
          <div className="space-y-6">
            <div className="glass card sticky top-6">
              <h3 className="font-display text-lg mb-4">Score de Qualificacao</h3>

              {/* Score Visual */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke={scorePercentual >= 70 ? '#22c55e' : scorePercentual >= 40 ? '#eab308' : '#ef4444'}
                      strokeWidth="8"
                      strokeDasharray={`${scorePercentual * 2.83} 283`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <p className={`text-3xl font-display ${getScoreColor()}`}>
                        {scorePercentual.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
                <p className={`font-display text-lg mt-2 ${getScoreColor()}`}>
                  {getScoreLabel()}
                </p>
              </div>

              {/* Score por categoria */}
              <div className="space-y-2 mb-6">
                {categorias.map(cat => {
                  const criteriosCat = criterios.filter(c => c.categoria === cat)
                  const scoreCat = criteriosCat.reduce((acc, c) => acc + (c.checked ? c.peso : 0), 0)
                  const maxCat = criteriosCat.reduce((acc, c) => acc + c.peso, 0)
                  const percCat = (scoreCat / maxCat) * 100
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--gray)]">{cat}</span>
                        <span>{scoreCat}/{maxCat}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${percCat}%`,
                            backgroundColor: percCat >= 70 ? '#22c55e' : percCat >= 40 ? '#eab308' : '#ef4444'
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recomendacao */}
              <div className={`p-4 rounded-lg mb-4 ${
                scorePercentual >= 70 ? 'bg-green-500/20 border border-green-500/30' :
                scorePercentual >= 40 ? 'bg-yellow-500/20 border border-yellow-500/30' :
                'bg-red-500/20 border border-red-500/30'
              }`}>
                <p className="text-sm">{getRecomendacao()}</p>
              </div>

              {/* Acoes */}
              <div className="space-y-2">
                <button
                  onClick={copiarRelatorio}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Relatorio'}
                </button>
                <button
                  onClick={resetar}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Resetar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info sobre frameworks */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Sobre os Frameworks</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">BANT</h4>
              <p className="mb-2"><strong>B</strong>udget - Tem orcamento?</p>
              <p className="mb-2"><strong>A</strong>uthority - E o decisor?</p>
              <p className="mb-2"><strong>N</strong>eed - Tem necessidade real?</p>
              <p><strong>T</strong>imeline - Quando vai comprar?</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">MEDDIC</h4>
              <p className="mb-1"><strong>M</strong>etrics - Metricas de sucesso</p>
              <p className="mb-1"><strong>E</strong>conomic Buyer - Comprador economico</p>
              <p className="mb-1"><strong>D</strong>ecision Criteria - Criterios de decisao</p>
              <p className="mb-1"><strong>D</strong>ecision Process - Processo de decisao</p>
              <p className="mb-1"><strong>I</strong>dentify Pain - Identificar a dor</p>
              <p><strong>C</strong>hampion - Defensor interno</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
