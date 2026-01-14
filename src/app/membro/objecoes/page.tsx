'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Shield, DollarSign, Clock, Users, HelpCircle, Zap, Copy, Check, Target, AlertTriangle } from 'lucide-react'

interface Objecao {
  id: string
  categoria: string
  objecao: string
  significado: string
  respostas: string[]
  dica: string
  nivel: 'facil' | 'medio' | 'dificil'
}

const categorias = [
  { id: 'preco', nome: 'Preço', icon: DollarSign, cor: 'bg-green-500' },
  { id: 'tempo', nome: 'Tempo/Urgência', icon: Clock, cor: 'bg-blue-500' },
  { id: 'autoridade', nome: 'Autoridade', icon: Users, cor: 'bg-purple-500' },
  { id: 'necessidade', nome: 'Necessidade', icon: Target, cor: 'bg-orange-500' },
  { id: 'confianca', nome: 'Confiança', icon: Shield, cor: 'bg-red-500' },
  { id: 'concorrencia', nome: 'Concorrência', icon: Zap, cor: 'bg-yellow-500' },
]

const objecoes: Objecao[] = [
  // PREÇO
  {
    id: '1',
    categoria: 'preco',
    objecao: '"Está muito caro"',
    significado: 'Não percebeu valor suficiente ou realmente não tem budget',
    respostas: [
      '"Caro comparado a quê?" [Faça ele justificar]',
      '"Entendo. Me ajuda a entender: o problema que discutimos custa quanto por mês para vocês hoje?"',
      '"Se o preço não fosse um problema, vocês fechariam hoje?"',
      '"O que seria um investimento justo para resolver [PROBLEMA]?"',
    ],
    dica: 'Nunca defenda o preço direto. Primeiro entenda a comparação.',
    nivel: 'medio',
  },
  {
    id: '2',
    categoria: 'preco',
    objecao: '"Não temos orçamento"',
    significado: 'Pode ser real ou pode ser desculpa para não continuar',
    respostas: [
      '"Entendo. Se tivessem, seria uma prioridade?"',
      '"Quando vocês revisam o orçamento? Posso retomar nessa época."',
      '"Muitos clientes não tinham orçamento, mas encontraram porque [BENEFÍCIO]. Faz sentido explorar isso?"',
      '"O que precisaria acontecer para isso virar prioridade?"',
    ],
    dica: 'Descubra se é objeção real ou cortina de fumaça.',
    nivel: 'medio',
  },
  {
    id: '3',
    categoria: 'preco',
    objecao: '"O concorrente X é mais barato"',
    significado: 'Está comparando apenas preço, não valor',
    respostas: [
      '"Sim, eles são mais baratos. Você sabe por quê?" [Silêncio]',
      '"O que mais você está considerando além do preço?"',
      '"Empresas que escolheram pelo preço muitas vezes voltam. O que [CONCORRENTE] não oferece é [DIFERENCIAL]."',
      '"Se fossem o mesmo preço, qual você escolheria? Por quê?"',
    ],
    dica: 'Mude a conversa de preço para valor e diferenciais.',
    nivel: 'dificil',
  },
  {
    id: '4',
    categoria: 'preco',
    objecao: '"Preciso de desconto"',
    significado: 'Quer testar seu limite ou realmente precisa',
    respostas: [
      '"O que te levaria a fechar hoje sem desconto?"',
      '"Posso fazer [CONDIÇÃO] se fecharmos até [DATA]. Funciona?"',
      '"Não trabalho com desconto, mas posso incluir [BENEFÍCIO EXTRA]. Resolve?"',
      '"Se eu conseguir [X]% de desconto, fechamos agora?"',
    ],
    dica: 'Nunca dê desconto sem receber algo em troca (prazo, indicação, case).',
    nivel: 'facil',
  },
  {
    id: '5',
    categoria: 'preco',
    objecao: '"É muito para testar"',
    significado: 'Tem interesse mas medo de arriscar',
    respostas: [
      '"Entendo o receio. O que te daria segurança para testar?"',
      '"Temos [TRIAL/GARANTIA]. Se não funcionar, você não perde nada."',
      '"Posso fazer um piloto de [X] dias com [CONDIÇÕES]. Serve?"',
      '"O que acontece se você NÃO testar e continuar com o problema?"',
    ],
    dica: 'Ofereça formas de reduzir o risco percebido.',
    nivel: 'facil',
  },

  // TEMPO
  {
    id: '6',
    categoria: 'tempo',
    objecao: '"Vou pensar"',
    significado: '90% das vezes significa "não" educado',
    respostas: [
      '"Claro! O que especificamente você precisa pensar?"',
      '"Normalmente quando alguém diz isso, é porque tem uma dúvida. Qual é a sua?"',
      '"Faz sentido. Posso perguntar: o que te impede de decidir agora?"',
      '"Pensar sobre o quê? Preço, funcionalidade, timing?"',
    ],
    dica: 'Nunca aceite "vou pensar" sem entender o motivo real.',
    nivel: 'dificil',
  },
  {
    id: '7',
    categoria: 'tempo',
    objecao: '"Não é o momento"',
    significado: 'Outras prioridades ou desculpa para evitar',
    respostas: [
      '"Entendo. O que precisa mudar para ser o momento?"',
      '"Qual seria o momento ideal?"',
      '"O problema vai diminuir se esperarem?"',
      '"Muitos clientes achavam isso, mas descobriram que esperar custou [X]. Faz sentido explorar?"',
    ],
    dica: 'Entenda se é prioridade real ou se é desculpa.',
    nivel: 'medio',
  },
  {
    id: '8',
    categoria: 'tempo',
    objecao: '"Estamos em outro projeto"',
    significado: 'Realmente ocupados ou usando como desculpa',
    respostas: [
      '"Entendo! Quando esse projeto termina?"',
      '"Faz sentido começarmos a preparação agora para implementar quando terminar?"',
      '"Esse projeto está relacionado a [ÁREA]? Talvez possamos ajudar."',
      '"Posso agendar para [DATA] quando terminar?"',
    ],
    dica: 'Marque follow-up concreto, não deixe vago.',
    nivel: 'facil',
  },
  {
    id: '9',
    categoria: 'tempo',
    objecao: '"Me liga daqui 6 meses"',
    significado: 'Quer se livrar ou realmente precisa de tempo',
    respostas: [
      '"Claro! O que vai mudar em 6 meses?"',
      '"Posso adiantar algo agora para ganharmos tempo depois?"',
      '"Se eu ligar em 3 meses, ainda seria cedo demais?"',
      '"O que posso te enviar enquanto isso para ir adiantando?"',
    ],
    dica: 'Tente reduzir o prazo e manter contato intermediário.',
    nivel: 'medio',
  },
  {
    id: '10',
    categoria: 'tempo',
    objecao: '"Não tenho tempo para implementar"',
    significado: 'Preocupação real com esforço de onboarding',
    respostas: [
      '"Quanto tempo você imagina que leva?"',
      '"Nossa implementação leva apenas [X] horas. Fazemos a maior parte para você."',
      '"E se eu te mostrasse que leva menos tempo do que você perde hoje com o problema?"',
      '"Posso fazer a implementação inteira para vocês. Quanto vale seu tempo?"',
    ],
    dica: 'Mostre que a implementação é simples ou que você faz por eles.',
    nivel: 'facil',
  },

  // AUTORIDADE
  {
    id: '11',
    categoria: 'autoridade',
    objecao: '"Preciso falar com meu sócio/chefe"',
    significado: 'Não tem autonomia ou quer segunda opinião',
    respostas: [
      '"Faz sentido! O que VOCÊ achou até aqui?"',
      '"Posso participar dessa conversa para tirar dúvidas técnicas?"',
      '"O que seu sócio normalmente considera mais importante: [A] ou [B]?"',
      '"Se dependesse só de você, fecharia?"',
    ],
    dica: 'Descubra a opinião dele primeiro, depois ajude a vender internamente.',
    nivel: 'medio',
  },
  {
    id: '12',
    categoria: 'autoridade',
    objecao: '"Não sou eu que decido"',
    significado: 'Descobriu tarde que não é o decisor',
    respostas: [
      '"Entendo! Quem seria a pessoa certa para conversar?"',
      '"Você pode me apresentar para essa pessoa?"',
      '"O que você recomendaria para essa pessoa?"',
      '"Posso te mandar um material para você encaminhar?"',
    ],
    dica: 'Transforme em aliado interno, não descarte.',
    nivel: 'facil',
  },
  {
    id: '13',
    categoria: 'autoridade',
    objecao: '"Preciso de aprovação do board/diretoria"',
    significado: 'Decisão complexa com múltiplos stakeholders',
    respostas: [
      '"Faz parte! Quando é a próxima reunião?"',
      '"Posso preparar um material executivo para apresentar?"',
      '"O que o board normalmente pergunta? Posso te armar com respostas."',
      '"Posso participar da apresentação para responder dúvidas técnicas?"',
    ],
    dica: 'Ajude a pessoa a vender internamente.',
    nivel: 'dificil',
  },

  // NECESSIDADE
  {
    id: '14',
    categoria: 'necessidade',
    objecao: '"Já temos uma solução"',
    significado: 'Satisfeitos ou com preguiça de mudar',
    respostas: [
      '"Ótimo! O que você mais gosta nela?"',
      '"Se pudesse melhorar uma coisa, o que seria?"',
      '"Quanto tempo vocês usam? Já consideraram ver o que mudou no mercado?"',
      '"Não estou sugerindo trocar, mas complementar. Faz sentido?"',
    ],
    dica: 'Não ataque a solução atual, pergunte sobre limitações.',
    nivel: 'medio',
  },
  {
    id: '15',
    categoria: 'necessidade',
    objecao: '"Não precisamos disso"',
    significado: 'Não entendeu o valor ou realmente não precisa',
    respostas: [
      '"O que te leva a pensar isso?"',
      '"Como vocês resolvem [PROBLEMA] hoje?"',
      '"Seus concorrentes estão usando [SOLUÇÃO]. Isso não te preocupa?"',
      '"Se não precisa, posso perguntar por que aceitou a reunião?"',
    ],
    dica: 'Questione para entender se qualificou errado.',
    nivel: 'dificil',
  },
  {
    id: '16',
    categoria: 'necessidade',
    objecao: '"Fazemos isso internamente"',
    significado: 'Tem solução caseira ou equipe interna',
    respostas: [
      '"Faz sentido! Quanto custa manter isso internamente?"',
      '"Quantas pessoas estão envolvidas? O que mais elas poderiam fazer?"',
      '"A solução interna escala junto com vocês?"',
      '"E se sua equipe pudesse focar no core business?"',
    ],
    dica: 'Calcule o custo total de manter internamente.',
    nivel: 'medio',
  },
  {
    id: '17',
    categoria: 'necessidade',
    objecao: '"Isso não é prioridade agora"',
    significado: 'Outras coisas são mais urgentes',
    respostas: [
      '"O que é prioridade?"',
      '"O que precisa acontecer para virar prioridade?"',
      '"Quanto custa cada mês que isso não é prioridade?"',
      '"E se eu mostrar que isso ajuda na prioridade atual?"',
    ],
    dica: 'Conecte sua solução com a prioridade atual deles.',
    nivel: 'medio',
  },

  // CONFIANÇA
  {
    id: '18',
    categoria: 'confianca',
    objecao: '"Nunca ouvi falar de vocês"',
    significado: 'Desconfiança por falta de marca conhecida',
    respostas: [
      '"Normal, somos novos no mercado. Por isso focamos em [DIFERENCIAL]."',
      '"Conhece [CLIENTE REFERÊNCIA]? Eles usam e podem falar sobre."',
      '"Posso te conectar com 2-3 clientes para ouvir a experiência deles?"',
      '"Somos novos, mas nossa equipe tem [X] anos de experiência em [ÁREA]."',
    ],
    dica: 'Use cases e referências para construir credibilidade.',
    nivel: 'facil',
  },
  {
    id: '19',
    categoria: 'confianca',
    objecao: '"E se não funcionar?"',
    significado: 'Medo de tomar decisão errada',
    respostas: [
      '"Ótima pergunta! O que seria \'funcionar\' para você?"',
      '"Temos [GARANTIA/SLA]. Se não entregar [X], devolvemos."',
      '"Posso mostrar cases de empresas iguais a vocês?"',
      '"E se funcionar? O que muda para vocês?"',
    ],
    dica: 'Defina critérios claros de sucesso e ofereça garantias.',
    nivel: 'facil',
  },
  {
    id: '20',
    categoria: 'confianca',
    objecao: '"Já tive experiência ruim com isso"',
    significado: 'Trauma com solução similar no passado',
    respostas: [
      '"Sinto muito. O que aconteceu?"',
      '"O que seria diferente para você confiar de novo?"',
      '"Entendo. O que aquela empresa fez que nós não faríamos?"',
      '"Posso te mostrar como somos diferentes em [PONTO ESPECÍFICO]?"',
    ],
    dica: 'Ouça a história toda antes de responder.',
    nivel: 'dificil',
  },
  {
    id: '21',
    categoria: 'confianca',
    objecao: '"Vocês são muito pequenos"',
    significado: 'Medo de depender de empresa pequena',
    respostas: [
      '"Entendo a preocupação. O que te daria segurança?"',
      '"Somos pequenos, mas isso significa [ATENDIMENTO DEDICADO/FLEXIBILIDADE]."',
      '"[EMPRESA GRANDE] também era pequena quando [CLIENTE X] começou com eles."',
      '"Prefere ser um de milhares de clientes ou ter atenção dedicada?"',
    ],
    dica: 'Transforme o tamanho pequeno em vantagem.',
    nivel: 'medio',
  },

  // CONCORRÊNCIA
  {
    id: '22',
    categoria: 'concorrencia',
    objecao: '"Estou avaliando outras opções"',
    significado: 'Normal em processo de compra B2B',
    respostas: [
      '"Faz sentido! Quais opções você está considerando?"',
      '"O que é mais importante para vocês nessa decisão?"',
      '"Posso te ajudar a comparar? Conheço bem o mercado."',
      '"Quando você precisa decidir?"',
    ],
    dica: 'Ajude a definir critérios de decisão favoráveis a você.',
    nivel: 'facil',
  },
  {
    id: '23',
    categoria: 'concorrencia',
    objecao: '"O concorrente faz a mesma coisa"',
    significado: 'Não vê diferenciação',
    respostas: [
      '"O que te levou a essa conclusão?"',
      '"Eles fazem [FUNCIONALIDADE], mas não fazem [DIFERENCIAL]. Isso importa para vocês?"',
      '"Posso te mostrar uma comparação lado a lado?"',
      '"O que mais você está considerando além das funcionalidades?"',
    ],
    dica: 'Mude a conversa para diferenciais que importam.',
    nivel: 'medio',
  },
  {
    id: '24',
    categoria: 'concorrencia',
    objecao: '"Prefiro empresa maior/mais conhecida"',
    significado: 'Busca segurança na marca',
    respostas: [
      '"Entendo. O que a marca grande te dá que nós não damos?"',
      '"Empresas grandes têm milhares de clientes. Você seria prioridade para eles?"',
      '"[EMPRESA GRANDE] cobra [X] a mais. O que você ganha por esse valor?"',
      '"Posso te conectar com empresas do seu tamanho que nos escolheram?"',
    ],
    dica: 'Mostre as desvantagens de ser cliente pequeno em empresa grande.',
    nivel: 'dificil',
  },
]

export default function ObjecoesPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('todas')
  const [busca, setBusca] = useState('')
  const [objecaoExpandida, setObjecaoExpandida] = useState<string | null>(null)
  const [copiado, setCopiado] = useState<string | null>(null)

  const objecoesFiltradas = objecoes.filter(o => {
    const matchCategoria = categoriaSelecionada === 'todas' || o.categoria === categoriaSelecionada
    const matchBusca = !busca ||
      o.objecao.toLowerCase().includes(busca.toLowerCase()) ||
      o.respostas.some(r => r.toLowerCase().includes(busca.toLowerCase()))
    return matchCategoria && matchBusca
  })

  const copiarResposta = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto)
    setCopiado(id)
    setTimeout(() => setCopiado(null), 2000)
  }

  const getCategoriaInfo = (catId: string) => {
    return categorias.find(c => c.id === catId) || { nome: 'Geral', cor: 'bg-gray-500' }
  }

  const getNivelConfig = (nivel: string) => {
    switch (nivel) {
      case 'facil':
        return { cor: 'text-green-400', bg: 'bg-green-500/20', label: 'Fácil' }
      case 'medio':
        return { cor: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Médio' }
      case 'dificil':
        return { cor: 'text-red-400', bg: 'bg-red-500/20', label: 'Difícil' }
      default:
        return { cor: 'text-white', bg: 'bg-white/20', label: '-' }
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Matriz de Objeções</h1>
            <p className="text-white/60">{objecoes.length} objeções com respostas prontas</p>
          </div>
        </div>

        {/* Busca */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar objeção... (ex: caro, tempo, pensar)"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
            />
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategoriaSelecionada('todas')}
            className={`px-4 py-2 rounded-lg transition-all ${
              categoriaSelecionada === 'todas'
                ? 'bg-[var(--gold)] text-black'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Todas ({objecoes.length})
          </button>
          {categorias.map((cat) => {
            const Icon = cat.icon
            const count = objecoes.filter(o => o.categoria === cat.id).length

            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaSelecionada(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  categoriaSelecionada === cat.id
                    ? `${cat.cor} text-white`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.nome} ({count})
              </button>
            )
          })}
        </div>

        {/* Lista de Objeções */}
        <div className="space-y-4">
          {objecoesFiltradas.map((obj) => {
            const isExpanded = objecaoExpandida === obj.id
            const catInfo = getCategoriaInfo(obj.categoria)
            const nivelInfo = getNivelConfig(obj.nivel)

            return (
              <div
                key={obj.id}
                className={`glass rounded-xl overflow-hidden transition-all ${
                  isExpanded ? 'border border-[var(--gold)]' : ''
                }`}
              >
                {/* Header da Objeção */}
                <div
                  onClick={() => setObjecaoExpandida(isExpanded ? null : obj.id)}
                  className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${catInfo.cor}/20 ${catInfo.cor.replace('bg-', 'text-').replace('-500', '-400')}`}>
                          {catInfo.nome}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${nivelInfo.bg} ${nivelInfo.cor}`}>
                          {nivelInfo.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{obj.objecao}</h3>
                      <p className="text-sm text-white/60">{obj.significado}</p>
                    </div>
                    <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <HelpCircle className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </div>

                {/* Conteúdo Expandido */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/10">
                    {/* Respostas */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-3 text-[var(--gold)]">
                        Respostas Prontas:
                      </h4>
                      <div className="space-y-2">
                        {obj.respostas.map((resposta, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between gap-3 p-3 bg-white/5 rounded-lg group"
                          >
                            <p className="text-sm text-white/90 flex-1">{resposta}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                copiarResposta(resposta, `${obj.id}-${idx}`)
                              }}
                              className="p-1.5 rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiado === `${obj.id}-${idx}` ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dica */}
                    <div className="mt-4 p-3 bg-[var(--gold)]/10 rounded-lg border border-[var(--gold)]/30">
                      <p className="text-sm">
                        <span className="text-[var(--gold)] font-medium">💡 Dica:</span>{' '}
                        <span className="text-white/80">{obj.dica}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Dicas Gerais */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--gold)]" />
            Princípios de Tratamento de Objeções
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">1. Nunca Discorde</h4>
              <p className="text-sm text-white/70">
                Comece com "Entendo..." ou "Faz sentido...". Concordar desarma o prospect.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">2. Pergunte Mais</h4>
              <p className="text-sm text-white/70">
                Toda objeção esconde uma preocupação real. Pergunte até descobrir.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">3. Isole a Objeção</h4>
              <p className="text-sm text-white/70">
                "Além disso, tem mais alguma coisa?" Resolva uma de cada vez.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">4. Use o Silêncio</h4>
              <p className="text-sm text-white/70">
                Depois de responder, fique em silêncio. Deixe o prospect processar.
              </p>
            </div>
          </div>
        </div>

        {/* Framework */}
        <div className="mt-6 glass rounded-2xl p-6 border border-[var(--gold)]/30">
          <h3 className="text-xl font-semibold mb-4">🎯 Framework LAER</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-blue-400">L</span>
              </div>
              <h4 className="font-semibold mb-1">Listen</h4>
              <p className="text-xs text-white/60">Ouça sem interromper</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-green-400">A</span>
              </div>
              <h4 className="font-semibold mb-1">Acknowledge</h4>
              <p className="text-xs text-white/60">Reconheça a preocupação</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-yellow-400">E</span>
              </div>
              <h4 className="font-semibold mb-1">Explore</h4>
              <p className="text-xs text-white/60">Faça perguntas</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-[var(--gold)]">R</span>
              </div>
              <h4 className="font-semibold mb-1">Respond</h4>
              <p className="text-xs text-white/60">Responda com clareza</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
