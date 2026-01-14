'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Copy, Check, CheckSquare, Square, RotateCcw, Target, Users, DollarSign, Clock, AlertTriangle, Zap } from 'lucide-react'

interface Pergunta {
  id: string
  categoria: string
  pergunta: string
  objetivo: string
  respondida: boolean
  resposta: string
}

export default function DiscoveryPage() {
  const [copied, setCopied] = useState(false)
  const [nomeCliente, setNomeCliente] = useState('')
  const [empresa, setEmpresa] = useState('')

  const [perguntas, setPerguntas] = useState<Pergunta[]>([
    // Situacao Atual
    { id: '1', categoria: 'Situacao', pergunta: 'Me conta um pouco sobre sua empresa. O que voces fazem?', objetivo: 'Contexto geral', respondida: false, resposta: '' },
    { id: '2', categoria: 'Situacao', pergunta: 'Qual e o seu papel na empresa? Quais sao suas principais responsabilidades?', objetivo: 'Entender o interlocutor', respondida: false, resposta: '' },
    { id: '3', categoria: 'Situacao', pergunta: 'Como voces fazem [PROCESSO] hoje?', objetivo: 'Entender processo atual', respondida: false, resposta: '' },
    { id: '4', categoria: 'Situacao', pergunta: 'Que ferramentas/sistemas voces usam atualmente para isso?', objetivo: 'Mapear stack atual', respondida: false, resposta: '' },
    { id: '5', categoria: 'Situacao', pergunta: 'Quantas pessoas estao envolvidas nesse processo?', objetivo: 'Dimensionar escopo', respondida: false, resposta: '' },

    // Problema/Dor
    { id: '6', categoria: 'Problema', pergunta: 'O que te motivou a buscar uma solucao agora? O que mudou?', objetivo: 'Identificar gatilho', respondida: false, resposta: '' },
    { id: '7', categoria: 'Problema', pergunta: 'Qual e o maior desafio que voce enfrenta hoje em relacao a [AREA]?', objetivo: 'Identificar dor principal', respondida: false, resposta: '' },
    { id: '8', categoria: 'Problema', pergunta: 'Ha quanto tempo esse problema existe?', objetivo: 'Entender urgencia', respondida: false, resposta: '' },
    { id: '9', categoria: 'Problema', pergunta: 'O que voce ja tentou fazer para resolver isso?', objetivo: 'Entender tentativas anteriores', respondida: false, resposta: '' },
    { id: '10', categoria: 'Problema', pergunta: 'Se esse problema nao for resolvido, o que acontece?', objetivo: 'Medir consequencias', respondida: false, resposta: '' },

    // Impacto
    { id: '11', categoria: 'Impacto', pergunta: 'Quanto esse problema custa para a empresa? (tempo, dinheiro, oportunidades)', objetivo: 'Quantificar dor', respondida: false, resposta: '' },
    { id: '12', categoria: 'Impacto', pergunta: 'Como isso afeta o dia a dia da sua equipe?', objetivo: 'Impacto operacional', respondida: false, resposta: '' },
    { id: '13', categoria: 'Impacto', pergunta: 'Isso impacta outras areas da empresa? Quais?', objetivo: 'Mapear stakeholders', respondida: false, resposta: '' },
    { id: '14', categoria: 'Impacto', pergunta: 'O que voce conseguiria fazer se esse problema fosse resolvido?', objetivo: 'Visualizar beneficios', respondida: false, resposta: '' },

    // Solucao Ideal
    { id: '15', categoria: 'Solucao', pergunta: 'Como seria a solucao ideal para voce?', objetivo: 'Entender expectativas', respondida: false, resposta: '' },
    { id: '16', categoria: 'Solucao', pergunta: 'O que e absolutamente essencial em uma solucao?', objetivo: 'Identificar must-haves', respondida: false, resposta: '' },
    { id: '17', categoria: 'Solucao', pergunta: 'O que seria um diferencial, mas nao e obrigatorio?', objetivo: 'Identificar nice-to-haves', respondida: false, resposta: '' },
    { id: '18', categoria: 'Solucao', pergunta: 'Tem algo que voce definitivamente NAO quer em uma solucao?', objetivo: 'Identificar deal-breakers', respondida: false, resposta: '' },

    // Decisao
    { id: '19', categoria: 'Decisao', pergunta: 'Alem de voce, quem mais participa dessa decisao?', objetivo: 'Mapear decisores', respondida: false, resposta: '' },
    { id: '20', categoria: 'Decisao', pergunta: 'Como funciona o processo de decisao para esse tipo de investimento?', objetivo: 'Entender processo', respondida: false, resposta: '' },
    { id: '21', categoria: 'Decisao', pergunta: 'Voces ja tem um orcamento definido para isso?', objetivo: 'Qualificar budget', respondida: false, resposta: '' },
    { id: '22', categoria: 'Decisao', pergunta: 'Qual e o prazo ideal para ter isso funcionando?', objetivo: 'Qualificar timeline', respondida: false, resposta: '' },
    { id: '23', categoria: 'Decisao', pergunta: 'O que precisa acontecer para voces tomarem uma decisao?', objetivo: 'Identificar proximos passos', respondida: false, resposta: '' },

    // Competicao
    { id: '24', categoria: 'Competicao', pergunta: 'Voces estao avaliando outras solucoes? Quais?', objetivo: 'Mapear concorrentes', respondida: false, resposta: '' },
    { id: '25', categoria: 'Competicao', pergunta: 'O que voce mais gostou no que viu ate agora?', objetivo: 'Entender criterios', respondida: false, resposta: '' },
  ])

  const categorias = [
    { id: 'Situacao', nome: 'Situacao Atual', icone: <Target className="w-4 h-4" />, cor: '#60a5fa' },
    { id: 'Problema', nome: 'Problema/Dor', icone: <AlertTriangle className="w-4 h-4" />, cor: '#f87171' },
    { id: 'Impacto', nome: 'Impacto', icone: <Zap className="w-4 h-4" />, cor: '#fbbf24' },
    { id: 'Solucao', nome: 'Solucao Ideal', icone: <CheckSquare className="w-4 h-4" />, cor: '#4ade80' },
    { id: 'Decisao', nome: 'Processo de Decisao', icone: <Users className="w-4 h-4" />, cor: '#a78bfa' },
    { id: 'Competicao', nome: 'Competicao', icone: <Search className="w-4 h-4" />, cor: '#f472b6' },
  ]

  const togglePergunta = (id: string) => {
    setPerguntas(perguntas.map(p =>
      p.id === id ? { ...p, respondida: !p.respondida } : p
    ))
  }

  const atualizarResposta = (id: string, resposta: string) => {
    setPerguntas(perguntas.map(p =>
      p.id === id ? { ...p, resposta, respondida: resposta.length > 0 } : p
    ))
  }

  const resetar = () => {
    setPerguntas(perguntas.map(p => ({ ...p, respondida: false, resposta: '' })))
    setNomeCliente('')
    setEmpresa('')
  }

  const respondidas = perguntas.filter(p => p.respondida).length
  const progresso = (respondidas / perguntas.length) * 100

  const copiarDiscovery = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    DISCOVERY - ${empresa || '[EMPRESA]'}
═══════════════════════════════════════════════════════════════
Cliente: ${nomeCliente || '[NOME]'}
Data: ${new Date().toLocaleDateString('pt-BR')}
Perguntas Respondidas: ${respondidas}/${perguntas.length}

${categorias.map(cat => {
  const perguntasCat = perguntas.filter(p => p.categoria === cat.id && p.respondida)
  if (perguntasCat.length === 0) return ''
  return `
───────────────────────────────────────────────────────────────
${cat.nome.toUpperCase()}
───────────────────────────────────────────────────────────────
${perguntasCat.map(p => `
P: ${p.pergunta}
R: ${p.resposta || '(sem anotacao)'}
`).join('')}`
}).filter(s => s).join('')}

═══════════════════════════════════════════════════════════════
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
            <Search className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Checklist de <span className="gold-text">Discovery</span>
          </h1>
          <p className="text-[var(--gray)]">{perguntas.length} perguntas para descobrir as necessidades do cliente</p>
        </div>

        {/* Info do Cliente */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Nome do Contato</label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Ex: Joao Silva"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ex: Empresa ABC"
                className="input-field"
              />
            </div>
          </div>

          {/* Progresso */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--gray)]">Progresso da Discovery</span>
              <span className="text-[var(--gold)]">{respondidas}/{perguntas.length} perguntas</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--gold)] transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Acoes */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={copiarDiscovery} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Anotacoes'}
          </button>
          <button onClick={resetar} className="btn-secondary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Resetar
          </button>
        </div>

        {/* Perguntas por Categoria */}
        <div className="space-y-8">
          {categorias.map(cat => {
            const perguntasCat = perguntas.filter(p => p.categoria === cat.id)
            const respondidasCat = perguntasCat.filter(p => p.respondida).length

            return (
              <div key={cat.id} className="glass card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${cat.cor}20`, color: cat.cor }}
                    >
                      {cat.icone}
                    </div>
                    <div>
                      <h2 className="font-display text-lg">{cat.nome}</h2>
                      <p className="text-xs text-[var(--gray)]">{respondidasCat}/{perguntasCat.length} respondidas</p>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display text-lg"
                    style={{
                      backgroundColor: respondidasCat === perguntasCat.length ? '#22c55e20' : `${cat.cor}10`,
                      color: respondidasCat === perguntasCat.length ? '#22c55e' : cat.cor
                    }}
                  >
                    {respondidasCat === perguntasCat.length ? <Check className="w-6 h-6" /> : `${respondidasCat}`}
                  </div>
                </div>

                <div className="space-y-4">
                  {perguntasCat.map(pergunta => (
                    <div key={pergunta.id} className="bg-black/30 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <button
                          onClick={() => togglePergunta(pergunta.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {pergunta.respondida ? (
                            <CheckSquare className="w-5 h-5 text-green-400" />
                          ) : (
                            <Square className="w-5 h-5 text-[var(--gray)]" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${pergunta.respondida ? 'text-green-400' : ''}`}>
                            {pergunta.pergunta}
                          </p>
                          <p className="text-xs text-[var(--gray)] mt-1">
                            Objetivo: {pergunta.objetivo}
                          </p>
                        </div>
                      </div>
                      <textarea
                        placeholder="Anote a resposta do cliente..."
                        value={pergunta.resposta}
                        onChange={(e) => atualizarResposta(pergunta.id, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--gold)] min-h-[60px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para uma Discovery Eficaz</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Ouca Mais, Fale Menos</h4>
              <p>A regra de ouro e 70/30. O cliente fala 70% do tempo, voce 30%.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Aprofunde com "Por que?"</h4>
              <p>Quando o cliente der uma resposta superficial, pergunte "por que?" ou "me conta mais".</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Nao Venda na Discovery</h4>
              <p>Resista a tentacao de apresentar solucoes. Primeiro entenda, depois venda.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Anote Tudo</h4>
              <p>Faca anotacoes durante a conversa. Isso mostra interesse e evita esquecimentos.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
