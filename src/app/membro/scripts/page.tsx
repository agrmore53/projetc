'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, Copy, Check, Target, Users, DollarSign, Clock, MessageSquare, Zap } from 'lucide-react'

interface Script {
  id: string
  categoria: string
  titulo: string
  duracao: string
  objetivo: string
  roteiro: string[]
  dicas: string[]
  errosEvitar: string[]
}

const categorias = [
  { id: 'coldcall', nome: 'Cold Call', icon: Phone, cor: 'bg-blue-500', desc: 'Primeiro contato frio' },
  { id: 'qualificacao', nome: 'Qualificação', icon: Target, cor: 'bg-purple-500', desc: 'Entender necessidades' },
  { id: 'demo', nome: 'Demo/Apresentação', icon: Users, cor: 'bg-green-500', desc: 'Mostrar o produto' },
  { id: 'fechamento', nome: 'Fechamento', icon: DollarSign, cor: 'bg-[var(--gold)]', desc: 'Fechar a venda' },
  { id: 'followup', nome: 'Follow-up', icon: Clock, cor: 'bg-orange-500', desc: 'Retomar contato' },
]

const scripts: Script[] = [
  // COLD CALL
  {
    id: '1',
    categoria: 'coldcall',
    titulo: 'Abertura Padrão (30 segundos)',
    duracao: '30 seg',
    objetivo: 'Conseguir permissão para continuar a conversa',
    roteiro: [
      '👋 "Olá [NOME], aqui é [SEU NOME] da [EMPRESA]."',
      '⏰ "Peguei você em um momento ruim?"',
      '🎯 [Se SIM]: "Sem problemas! Qual o melhor horário para retornar?"',
      '🎯 [Se NÃO]: "Ótimo! O motivo da ligação é..."',
      '💡 "Trabalho com empresas do segmento de [SEGMENTO] que estavam [DOR COMUM]."',
      '🤔 "Isso é algo que vocês também enfrentam?"',
    ],
    dicas: [
      'Fale devagar e com confiança',
      'A pergunta "momento ruim?" desarma o prospect',
      'Personalize o segmento e a dor',
    ],
    errosEvitar: [
      'Começar vendendo o produto',
      'Falar rápido demais',
      'Não ter pesquisado a empresa antes',
    ],
  },
  {
    id: '2',
    categoria: 'coldcall',
    titulo: 'Cold Call com Referência',
    duracao: '1 min',
    objetivo: 'Usar conexão em comum para ganhar credibilidade',
    roteiro: [
      '👋 "Olá [NOME], aqui é [SEU NOME] da [EMPRESA]."',
      '🔗 "O [NOME DO CONTATO] da [EMPRESA REFERÊNCIA] sugeriu que eu falasse com você."',
      '💬 "Ele mencionou que vocês estão [CONTEXTO/SITUAÇÃO]."',
      '❓ "Isso ainda é uma prioridade aí?"',
      '🎯 [Se SIM]: "Ótimo, ajudamos a [EMPRESA REFERÊNCIA] a resolver isso com [RESULTADO]. Posso te mostrar em 15 minutos como funciona?"',
    ],
    dicas: [
      'Sempre peça permissão para usar o nome como referência',
      'Prepare um case da empresa referência',
      'Seja específico sobre o resultado',
    ],
    errosEvitar: [
      'Inventar referências',
      'Ser vago sobre como conhece a referência',
    ],
  },
  {
    id: '3',
    categoria: 'coldcall',
    titulo: 'Cold Call Gatilho de Evento',
    duracao: '1 min',
    objetivo: 'Usar notícia ou evento como gancho',
    roteiro: [
      '👋 "Olá [NOME], aqui é [SEU NOME]."',
      '📰 "Vi que a [EMPRESA] acabou de [EVENTO: levantar rodada / lançar produto / expandir / contratar]."',
      '💡 "Normalmente quando empresas fazem isso, [DOR COMUM RELACIONADA] vira prioridade."',
      '🤔 "Isso está acontecendo aí também?"',
      '🎯 "Ajudamos [EMPRESA SIMILAR] nessa mesma fase a [RESULTADO]."',
    ],
    dicas: [
      'Configure alertas do Google para prospects',
      'LinkedIn é ótimo para descobrir eventos',
      'Ligue em até 48h após o evento',
    ],
    errosEvitar: [
      'Usar eventos antigos (mais de 2 semanas)',
      'Forçar conexão que não existe',
    ],
  },

  // QUALIFICAÇÃO
  {
    id: '4',
    categoria: 'qualificacao',
    titulo: 'BANT - Qualificação Completa',
    duracao: '15-20 min',
    objetivo: 'Entender Budget, Authority, Need, Timeline',
    roteiro: [
      '📋 "Para eu entender melhor o cenário de vocês..."',
      '',
      '💰 **BUDGET (Orçamento)**',
      '"Vocês já têm orçamento reservado para resolver [PROBLEMA]?"',
      '"Qual faixa de investimento faz sentido para vocês?"',
      '',
      '👤 **AUTHORITY (Autoridade)**',
      '"Além de você, quem mais participa dessa decisão?"',
      '"Como funciona o processo de aprovação aí?"',
      '',
      '🎯 **NEED (Necessidade)**',
      '"Qual o maior desafio que vocês enfrentam hoje com [ÁREA]?"',
      '"O que acontece se não resolverem isso nos próximos 6 meses?"',
      '',
      '📅 **TIMELINE (Prazo)**',
      '"Vocês têm uma data em mente para implementar a solução?"',
      '"O que precisa acontecer para vocês tomarem uma decisão?"',
    ],
    dicas: [
      'Não faça como interrogatório, seja conversacional',
      'Anote tudo para usar depois',
      'Se não tiver 3 de 4, lead não é qualificado',
    ],
    errosEvitar: [
      'Pular direto para a apresentação',
      'Assumir que já sabe as respostas',
      'Não perguntar sobre decisores',
    ],
  },
  {
    id: '5',
    categoria: 'qualificacao',
    titulo: 'SPIN Selling - Perguntas Poderosas',
    duracao: '20-30 min',
    objetivo: 'Fazer o prospect perceber a dor sozinho',
    roteiro: [
      '🔍 **SITUAÇÃO** (entender o contexto)',
      '"Como vocês fazem [PROCESSO] hoje?"',
      '"Quantas pessoas estão envolvidas nisso?"',
      '"Que ferramentas vocês usam atualmente?"',
      '',
      '⚠️ **PROBLEMA** (identificar dores)',
      '"Qual a maior dificuldade com esse processo?"',
      '"Com que frequência isso acontece?"',
      '"Isso é algo que incomoda a equipe?"',
      '',
      '💥 **IMPLICAÇÃO** (amplificar a dor)',
      '"O que isso custa para a empresa em tempo/dinheiro?"',
      '"Como isso afeta outras áreas do negócio?"',
      '"Se continuar assim, o que acontece em 12 meses?"',
      '',
      '✨ **NECESSIDADE** (fazer desejar a solução)',
      '"Se você pudesse resolver isso, o que mudaria?"',
      '"Quanto tempo/dinheiro vocês economizariam?"',
      '"Como isso ajudaria você pessoalmente?"',
    ],
    dicas: [
      'Deixe o prospect falar 70% do tempo',
      'Use as respostas para construir sua proposta',
      'As perguntas de implicação são as mais importantes',
    ],
    errosEvitar: [
      'Fazer perguntas fechadas (sim/não)',
      'Interromper o prospect',
      'Pular para a solução cedo demais',
    ],
  },

  // DEMO
  {
    id: '6',
    categoria: 'demo',
    titulo: 'Estrutura de Demo (30 min)',
    duracao: '30 min',
    objetivo: 'Mostrar valor do produto conectado às dores',
    roteiro: [
      '⏱️ **0-5 min: RECAP**',
      '"Na nossa última conversa você mencionou que [DOR 1], [DOR 2] e [DOR 3]."',
      '"Isso ainda está correto? Mudou alguma coisa?"',
      '',
      '🎯 **5-20 min: DEMO FOCADA**',
      '"Vou te mostrar exatamente como resolvemos [DOR 1]..."',
      '[Mostra feature 1 - conecta com a dor]',
      '"Faz sentido até aqui? Alguma dúvida?"',
      '[Repete para cada dor principal]',
      '',
      '💰 **20-25 min: VALOR**',
      '"Com base no que você me contou, vocês economizariam [X] por mês."',
      '"Empresas similares viram [RESULTADO] em [PRAZO]."',
      '',
      '📋 **25-30 min: PRÓXIMOS PASSOS**',
      '"O que você achou?"',
      '"Quem mais precisa ver isso?"',
      '"Qual seria o próximo passo ideal?"',
    ],
    dicas: [
      'Sempre reconecte features com dores específicas',
      'Pare para perguntas a cada 5 minutos',
      'Prepare cases de empresas similares',
    ],
    errosEvitar: [
      'Mostrar todas as features',
      'Fazer demo genérica sem personalização',
      'Não pedir feedback durante a demo',
    ],
  },

  // FECHAMENTO
  {
    id: '7',
    categoria: 'fechamento',
    titulo: 'Fechamento Assumido',
    duracao: '5-10 min',
    objetivo: 'Fechar assumindo que o prospect vai comprar',
    roteiro: [
      '✅ "Baseado em tudo que conversamos..."',
      '📋 "O plano [NOME DO PLANO] seria o ideal para vocês porque [MOTIVO 1] e [MOTIVO 2]."',
      '📅 "Conseguimos começar a implementação na [DATA]."',
      '🤝 "Preciso só dos dados para gerar o contrato. O e-mail é [EMAIL]?"',
      '',
      '🔄 **Se houver hesitação:**',
      '"Entendo. O que te impede de avançar hoje?"',
      '[Trate a objeção]',
      '"Resolvido isso, podemos seguir?"',
    ],
    dicas: [
      'Use tom confiante, não arrogante',
      'Tenha os dados do plano na ponta da língua',
      'Silêncio após a pergunta é seu amigo',
    ],
    errosEvitar: [
      'Pedir permissão ("você gostaria de...")',
      'Dar opções demais',
      'Falar depois de fazer a pergunta de fechamento',
    ],
  },
  {
    id: '8',
    categoria: 'fechamento',
    titulo: 'Fechamento com Alternativas',
    duracao: '5-10 min',
    objetivo: 'Dar escolha entre opções (ambas são sim)',
    roteiro: [
      '🤔 "Pensando no que conversamos..."',
      '📊 "Vocês preferem:"',
      '',
      '**Opção A:** "Começar com o plano [BÁSICO] e ir expandindo conforme a necessidade?"',
      '',
      '**Opção B:** "Já ir para o plano [COMPLETO] que inclui [BENEFÍCIO EXTRA] e economiza [X%] no anual?"',
      '',
      '❓ "Qual faz mais sentido para o momento de vocês?"',
    ],
    dicas: [
      'As duas opções devem ser vantajosas para você',
      'Coloque a opção que prefere por último',
      'Use "qual" em vez de "se"',
    ],
    errosEvitar: [
      'Dar opção de "não comprar"',
      'Mais de 2-3 opções (paralisia)',
      'Opções muito diferentes em preço',
    ],
  },
  {
    id: '9',
    categoria: 'fechamento',
    titulo: 'Fechamento com Urgência',
    duracao: '5 min',
    objetivo: 'Criar senso de urgência real',
    roteiro: [
      '⏰ "Preciso ser transparente com você..."',
      '',
      '📅 **Opção 1 - Prazo:**',
      '"Essa condição especial é válida até [DATA] porque [MOTIVO REAL]."',
      '',
      '📦 **Opção 2 - Escassez:**',
      '"Só conseguimos fazer mais [X] implementações esse mês por causa da equipe."',
      '',
      '📈 **Opção 3 - Preço:**',
      '"A partir de [DATA] o preço aumenta em [X%]. Quem fechar antes mantém o valor atual."',
      '',
      '🤝 "Vale a pena garantir agora?"',
    ],
    dicas: [
      'Urgência só funciona se for REAL',
      'Explique o motivo da urgência',
      'Não use todo mês ou perde credibilidade',
    ],
    errosEvitar: [
      'Criar urgência falsa',
      'Pressionar demais',
      'Usar em leads frios',
    ],
  },

  // FOLLOW-UP
  {
    id: '10',
    categoria: 'followup',
    titulo: 'Follow-up Pós-Proposta',
    duracao: '3-5 min',
    objetivo: 'Retomar contato após envio de proposta',
    roteiro: [
      '👋 "Oi [NOME], tudo bem?"',
      '📄 "Estou ligando sobre a proposta que enviei [DATA]."',
      '❓ "Conseguiu dar uma olhada?"',
      '',
      '🎯 **Se SIM:**',
      '"Ótimo! O que achou? Alguma dúvida?"',
      '[Responda dúvidas]',
      '"Podemos avançar então?"',
      '',
      '🔄 **Se NÃO:**',
      '"Entendo, agenda corrida. Posso te fazer um resumo de 2 minutos agora?"',
      '[Faça pitch resumido]',
      '"Faz sentido agendarmos 15 min para aprofundar?"',
    ],
    dicas: [
      'Ligue 2-3 dias após enviar proposta',
      'Tenha a proposta aberta durante a ligação',
      'Esteja preparado para objeções',
    ],
    errosEvitar: [
      'Esperar mais de 1 semana',
      'Só perguntar "recebeu?"',
      'Não ter argumentos preparados',
    ],
  },
  {
    id: '11',
    categoria: 'followup',
    titulo: 'Reativação de Lead Frio',
    duracao: '2-3 min',
    objetivo: 'Reengajar lead que sumiu',
    roteiro: [
      '👋 "Oi [NOME], aqui é [SEU NOME] da [EMPRESA]."',
      '💭 "Conversamos há [TEMPO] sobre [ASSUNTO]."',
      '🆕 "Estou ligando porque temos uma novidade que pode te interessar: [NOVIDADE]."',
      '',
      '❓ "Resolver [PROBLEMA] ainda é prioridade aí?"',
      '',
      '🎯 **Se SIM:** "Ótimo! Posso te mostrar como funciona?"',
      '🔄 **Se NÃO:** "Entendo. Quando seria um bom momento para retomar?"',
      '❌ **Se NUNCA:** "Sem problemas! Se mudar, estou à disposição."',
    ],
    dicas: [
      'Tenha uma novidade real para compartilhar',
      'Não seja insistente',
      'Aceite o "não" com elegância',
    ],
    errosEvitar: [
      'Ligar sem motivo novo',
      'Fazer o prospect se sentir culpado',
      'Insistir após dois "não"',
    ],
  },
]

export default function ScriptsPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('coldcall')
  const [scriptSelecionado, setScriptSelecionado] = useState<Script | null>(null)
  const [copiado, setCopiado] = useState(false)

  const scriptsFiltrados = scripts.filter(s => s.categoria === categoriaSelecionada)

  const copiarScript = (script: Script) => {
    const texto = script.roteiro.join('\n')
    navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const getCategoriaInfo = (catId: string) => {
    return categorias.find(c => c.id === catId) || categorias[0]
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Gerador de Scripts de Ligação</h1>
            <p className="text-white/60">Roteiros prontos para cada etapa da venda</p>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categorias.map((cat) => {
            const Icon = cat.icon
            const isSelected = categoriaSelecionada === cat.id
            const count = scripts.filter(s => s.categoria === cat.id).length

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoriaSelecionada(cat.id)
                  setScriptSelecionado(null)
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  isSelected
                    ? `${cat.cor} text-white`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">{cat.nome}</p>
                  <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-white/50'}`}>
                    {count} scripts
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de Scripts */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--gold)]" />
              Scripts - {getCategoriaInfo(categoriaSelecionada).nome}
            </h2>

            {scriptsFiltrados.map((script) => {
              const isSelected = scriptSelecionado?.id === script.id

              return (
                <div
                  key={script.id}
                  onClick={() => setScriptSelecionado(script)}
                  className={`glass rounded-xl p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{script.titulo}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {script.duracao}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{script.objetivo}</p>
                </div>
              )
            })}
          </div>

          {/* Preview do Script */}
          <div className="lg:sticky lg:top-6">
            {scriptSelecionado ? (
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{scriptSelecionado.titulo}</h2>
                  <button
                    onClick={() => copiarScript(scriptSelecionado)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--gold)] text-black rounded-lg text-sm font-medium"
                  >
                    {copiado ? (
                      <>
                        <Check className="w-4 h-4" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar
                      </>
                    )}
                  </button>
                </div>

                {/* Objetivo */}
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 mb-4">
                  <p className="text-sm">
                    <span className="text-blue-400 font-medium">Objetivo:</span>{' '}
                    {scriptSelecionado.objetivo}
                  </p>
                </div>

                {/* Roteiro */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--gold)]" />
                    Roteiro
                  </h3>
                  <div className="space-y-2 p-4 bg-white/5 rounded-lg max-h-[400px] overflow-y-auto">
                    {scriptSelecionado.roteiro.map((linha, idx) => (
                      <p
                        key={idx}
                        className={`text-sm ${
                          linha === '' ? 'h-2' :
                          linha.startsWith('**') ? 'font-semibold text-[var(--gold)] mt-3' :
                          linha.startsWith('👋') || linha.startsWith('🎯') || linha.startsWith('💡') || linha.startsWith('🤔') || linha.startsWith('📋') || linha.startsWith('💰') || linha.startsWith('👤') || linha.startsWith('📅') || linha.startsWith('🔍') || linha.startsWith('⚠️') || linha.startsWith('💥') || linha.startsWith('✨') || linha.startsWith('⏱️') || linha.startsWith('✅') || linha.startsWith('🔄') || linha.startsWith('🤝') || linha.startsWith('📊') || linha.startsWith('❓') || linha.startsWith('📄') || linha.startsWith('💭') || linha.startsWith('🆕') || linha.startsWith('❌') || linha.startsWith('📰') || linha.startsWith('🔗') || linha.startsWith('💬') || linha.startsWith('⏰') || linha.startsWith('📦') || linha.startsWith('📈')
                            ? 'text-white/90'
                            : 'text-white/70 pl-4'
                        }`}
                      >
                        {linha}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Dicas */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2 text-green-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Dicas
                  </h3>
                  <ul className="space-y-1">
                    {scriptSelecionado.dicas.map((dica, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {dica}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Erros */}
                <div>
                  <h3 className="font-medium mb-2 text-red-400 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Evite
                  </h3>
                  <ul className="space-y-1">
                    {scriptSelecionado.errosEvitar.map((erro, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        {erro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className="text-white/50">Selecione um script para visualizar</p>
              </div>
            )}
          </div>
        </div>

        {/* Dicas Gerais */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">📞 Regras de Ouro das Ligações</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Sorria ao Falar</h4>
              <p className="text-sm text-white/70">
                O sorriso muda o tom da voz. O prospect percebe mesmo sem ver.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Espelhe o Ritmo</h4>
              <p className="text-sm text-white/70">
                Se o prospect fala devagar, desacelere. Se fala rápido, acompanhe.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Use o Nome</h4>
              <p className="text-sm text-white/70">
                Falar o nome da pessoa 2-3x na ligação aumenta a conexão.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Silencie e Escute</h4>
              <p className="text-sm text-white/70">
                Após fazer uma pergunta, espere. O silêncio é poderoso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
