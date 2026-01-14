'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Zap, Copy, Check, Search, Brain, Heart, Clock, Shield, Users, Star, Target, Gift, AlertTriangle } from 'lucide-react'

interface Gatilho {
  id: string
  nome: string
  categoria: string
  icone: string
  descricao: string
  psicologia: string
  exemplos: string[]
  frases: string[]
  cuidados: string
}

const categorias = [
  { id: 'todos', nome: 'Todos', icone: Zap },
  { id: 'urgencia', nome: 'Urgência', icone: Clock },
  { id: 'autoridade', nome: 'Autoridade', icone: Shield },
  { id: 'prova', nome: 'Prova Social', icone: Users },
  { id: 'reciprocidade', nome: 'Reciprocidade', icone: Gift },
  { id: 'escassez', nome: 'Escassez', icone: AlertTriangle },
  { id: 'emocao', nome: 'Emoção', icone: Heart },
]

const gatilhos: Gatilho[] = [
  {
    id: '1',
    nome: 'Urgência',
    categoria: 'urgencia',
    icone: '⏰',
    descricao: 'Cria pressão temporal para decisão imediata',
    psicologia: 'O cérebro prioriza ações com prazo definido para evitar perda de oportunidade.',
    exemplos: [
      'Contagem regressiva em páginas de venda',
      'Ofertas válidas até meia-noite',
      'Últimas horas para garantir bônus'
    ],
    frases: [
      '"Essa oferta expira em 24 horas"',
      '"Só até hoje às 23:59"',
      '"Últimas horas para garantir esse preço"',
      '"Amanhã o preço volta ao normal"'
    ],
    cuidados: 'Use apenas urgência real. Falsa urgência destrói credibilidade.'
  },
  {
    id: '2',
    nome: 'Escassez',
    categoria: 'escassez',
    icone: '🔥',
    descricao: 'Limita quantidade disponível para aumentar valor percebido',
    psicologia: 'Objetos escassos são percebidos como mais valiosos. Medo de perder supera desejo de ganhar.',
    exemplos: [
      'Vagas limitadas em mentoria',
      'Apenas 50 unidades disponíveis',
      'Turma com limite de alunos'
    ],
    frases: [
      '"Apenas 10 vagas restantes"',
      '"87% das vagas já foram preenchidas"',
      '"Última unidade em estoque"',
      '"Turma limitada a 30 alunos"'
    ],
    cuidados: 'Escassez deve ser verdadeira. Mentir sobre isso é antiético e ilegal.'
  },
  {
    id: '3',
    nome: 'Prova Social',
    categoria: 'prova',
    icone: '👥',
    descricao: 'Mostra que outros já compraram/aprovaram',
    psicologia: 'Humanos são seres sociais. Seguimos o comportamento do grupo para reduzir risco.',
    exemplos: [
      'Depoimentos de clientes',
      'Número de alunos/clientes',
      'Avaliações e estrelas'
    ],
    frases: [
      '"Mais de 10.000 alunos satisfeitos"',
      '"Veja o que nossos clientes dizem"',
      '"Avaliado com 4.9 estrelas por 500+ pessoas"',
      '"Empresas como X, Y e Z já usam"'
    ],
    cuidados: 'Use apenas depoimentos reais e verificáveis.'
  },
  {
    id: '4',
    nome: 'Autoridade',
    categoria: 'autoridade',
    icone: '🏆',
    descricao: 'Demonstra expertise e credenciais',
    psicologia: 'Confiamos em especialistas porque reduz nossa necessidade de avaliar.',
    exemplos: [
      'Certificações e diplomas',
      'Anos de experiência',
      'Aparições na mídia'
    ],
    frases: [
      '"Com 15 anos de experiência em..."',
      '"Certificado por [instituição]"',
      '"Como visto na Globo, Forbes, Exame"',
      '"Especialista reconhecido em..."'
    ],
    cuidados: 'Só mencione credenciais que você realmente possui.'
  },
  {
    id: '5',
    nome: 'Reciprocidade',
    categoria: 'reciprocidade',
    icone: '🎁',
    descricao: 'Dá algo de valor primeiro, gerando obrigação',
    psicologia: 'Quando recebemos algo, sentimos necessidade de retribuir.',
    exemplos: [
      'E-book gratuito',
      'Aula grátis antes de vender curso',
      'Consultoria inicial sem custo'
    ],
    frases: [
      '"Baixe grátis o guia completo"',
      '"Presente: aula exclusiva para você"',
      '"Diagnóstico gratuito do seu negócio"',
      '"Sem compromisso, é por nossa conta"'
    ],
    cuidados: 'O conteúdo gratuito deve ter valor real, não ser só isca.'
  },
  {
    id: '6',
    nome: 'Compromisso e Coerência',
    categoria: 'emocao',
    icone: '🤝',
    descricao: 'Pequenos compromissos levam a grandes decisões',
    psicologia: 'Pessoas querem ser coerentes com ações anteriores. Micro-compromissos facilitam o macro.',
    exemplos: [
      'Pedir para responder quiz antes de vender',
      'Agendar call antes da proposta',
      'Pedir para assistir vídeo completo'
    ],
    frases: [
      '"Você se comprometeu a mudar, certo?"',
      '"Já demos o primeiro passo juntos"',
      '"Você já investiu tempo nisso, faz sentido continuar"',
      '"Como você disse, isso é importante para você"'
    ],
    cuidados: 'Não manipule. Use para ajudar o cliente a manter seus próprios objetivos.'
  },
  {
    id: '7',
    nome: 'Afinidade/Rapport',
    categoria: 'emocao',
    icone: '💛',
    descricao: 'Cria conexão emocional e identificação',
    psicologia: 'Compramos de quem gostamos e com quem nos identificamos.',
    exemplos: [
      'Contar sua história de superação',
      'Mostrar bastidores e vulnerabilidade',
      'Usar linguagem do público'
    ],
    frases: [
      '"Eu já estive exatamente onde você está"',
      '"Entendo sua frustração porque passei por isso"',
      '"Somos parecidos nisso"',
      '"Também sou [característica do avatar]"'
    ],
    cuidados: 'Seja autêntico. Fingir similaridade é facilmente percebido.'
  },
  {
    id: '8',
    nome: 'Medo da Perda (FOMO)',
    categoria: 'escassez',
    icone: '😰',
    descricao: 'Ativa o medo de perder oportunidade',
    psicologia: 'Perdas são sentidas 2x mais intensamente que ganhos equivalentes.',
    exemplos: [
      'Mostrar o que perde se não comprar',
      'Comparar custo de não agir',
      'Cenário futuro sem a solução'
    ],
    frases: [
      '"Quanto você está perdendo por mês sem isso?"',
      '"Daqui a 1 ano, onde você vai estar?"',
      '"Cada dia que passa é oportunidade perdida"',
      '"Você pode continuar como está ou..."'
    ],
    cuidados: 'Use com moderação. Excesso de medo gera paralisia ou rejeição.'
  },
  {
    id: '9',
    nome: 'Novidade',
    categoria: 'emocao',
    icone: '✨',
    descricao: 'Desperta curiosidade com algo novo',
    psicologia: 'O cérebro libera dopamina em resposta a novidades.',
    exemplos: [
      'Lançamento de novo produto',
      'Método inédito',
      'Descoberta recente'
    ],
    frases: [
      '"Método revolucionário que..."',
      '"Pela primeira vez no Brasil"',
      '"Acaba de ser descoberto"',
      '"Nova técnica que está mudando..."'
    ],
    cuidados: 'A novidade deve ser real. Não venda velho como novo.'
  },
  {
    id: '10',
    nome: 'Antecipação',
    categoria: 'emocao',
    icone: '🚀',
    descricao: 'Cria expectativa sobre algo que está por vir',
    psicologia: 'A expectativa de prazer muitas vezes supera o prazer em si.',
    exemplos: [
      'Pré-lançamento de produto',
      'Lista de espera exclusiva',
      'Contagem regressiva para abertura'
    ],
    frases: [
      '"Em breve você vai descobrir..."',
      '"Prepare-se para o que vem aí"',
      '"Estamos preparando algo especial"',
      '"Você está na lista VIP para..."'
    ],
    cuidados: 'Entregue o que prometeu. Antecipação sem entrega gera frustração.'
  },
  {
    id: '11',
    nome: 'Exclusividade',
    categoria: 'escassez',
    icone: '👑',
    descricao: 'Faz a pessoa se sentir especial e privilegiada',
    psicologia: 'Humanos desejam pertencer a grupos seletos e se sentir únicos.',
    exemplos: [
      'Grupo VIP de clientes',
      'Acesso antecipado',
      'Conteúdo só para membros'
    ],
    frases: [
      '"Apenas para convidados"',
      '"Você foi selecionado para..."',
      '"Acesso exclusivo para membros"',
      '"Grupo seleto de empreendedores"'
    ],
    cuidados: 'Se for exclusivo, mantenha exclusivo. Não desvalorize abrindo para todos.'
  },
  {
    id: '12',
    nome: 'Garantia/Reversão de Risco',
    categoria: 'autoridade',
    icone: '🛡️',
    descricao: 'Remove o medo de fazer uma má escolha',
    psicologia: 'Reduzir risco percebido é tão importante quanto aumentar valor percebido.',
    exemplos: [
      'Garantia de 7/30/365 dias',
      'Devolução sem perguntas',
      'Teste grátis'
    ],
    frases: [
      '"Risco zero: se não gostar, devolvemos seu dinheiro"',
      '"7 dias para testar sem compromisso"',
      '"Garantia incondicional"',
      '"Todo o risco é nosso"'
    ],
    cuidados: 'Honre a garantia 100% das vezes. Uma recusa destrói a reputação.'
  },
  {
    id: '13',
    nome: 'Especificidade',
    categoria: 'autoridade',
    icone: '🎯',
    descricao: 'Números específicos são mais críveis que genéricos',
    psicologia: 'Detalhes específicos parecem mais verdadeiros e pesquisados.',
    exemplos: [
      'Dizer "127 clientes" em vez de "mais de 100"',
      'Dizer "em 23 dias" em vez de "em algumas semanas"',
      'Porcentagens exatas'
    ],
    frases: [
      '"Aumento de 347% nas vendas"',
      '"Em apenas 17 dias você vai..."',
      '"93.7% dos alunos recomendam"',
      '"R$ 47.312 em vendas no primeiro mês"'
    ],
    cuidados: 'Números devem ser reais. Inventar dados específicos é fraude.'
  },
  {
    id: '14',
    nome: 'Simplicidade',
    categoria: 'emocao',
    icone: '✅',
    descricao: 'Mostra que é fácil de fazer/usar',
    psicologia: 'Evitamos esforço. Quanto mais simples parece, maior a chance de ação.',
    exemplos: [
      'Passo a passo simplificado',
      'Templates prontos',
      'Copie e cole'
    ],
    frases: [
      '"Em apenas 3 passos simples"',
      '"Qualquer pessoa consegue"',
      '"Não precisa de experiência"',
      '"Pronto para usar, só copiar e colar"'
    ],
    cuidados: 'Não prometa facilidade se requer trabalho significativo.'
  },
  {
    id: '15',
    nome: 'História',
    categoria: 'emocao',
    icone: '📖',
    descricao: 'Narrativas engajam mais que fatos isolados',
    psicologia: 'Histórias ativam múltiplas áreas do cérebro e criam conexão emocional.',
    exemplos: [
      'Sua jornada de transformação',
      'Case de cliente',
      'Origem do produto/método'
    ],
    frases: [
      '"Deixa eu te contar como tudo começou..."',
      '"Há 3 anos eu estava no fundo do poço..."',
      '"A história do João vai te surpreender..."',
      '"Tudo mudou quando eu descobri..."'
    ],
    cuidados: 'Histórias devem ser verdadeiras. Ficção vendida como realidade é enganação.'
  },
  {
    id: '16',
    nome: 'Contraste',
    categoria: 'autoridade',
    icone: '⚖️',
    descricao: 'Compara para fazer uma opção parecer melhor',
    psicologia: 'Não avaliamos em absoluto, mas em comparação. O contexto define a percepção.',
    exemplos: [
      'Preço cheio vs preço promocional',
      'Antes e depois',
      'Comparação com concorrentes'
    ],
    frases: [
      '"De R$ 2.000 por apenas R$ 497"',
      '"Enquanto outros cobram X, aqui você paga Y"',
      '"Antes: frustrado. Depois: realizado"',
      '"Você prefere gastar R$ 5.000 com tentativa e erro ou R$ 500 no caminho certo?"'
    ],
    cuidados: 'Comparações devem ser justas e verdadeiras.'
  },
  {
    id: '17',
    nome: 'Pertencimento',
    categoria: 'prova',
    icone: '🏠',
    descricao: 'Oferece participação em comunidade/grupo',
    psicologia: 'Necessidade básica de pertencer a um grupo é forte motivador.',
    exemplos: [
      'Comunidade de alunos',
      'Grupo exclusivo de membros',
      'Networking entre clientes'
    ],
    frases: [
      '"Faça parte da nossa comunidade"',
      '"Junte-se a milhares de pessoas como você"',
      '"Você não está sozinho nessa jornada"',
      '"Entre para o grupo mais exclusivo de..."'
    ],
    cuidados: 'A comunidade precisa ser ativa e ter valor real.'
  },
  {
    id: '18',
    nome: 'Curiosidade',
    categoria: 'emocao',
    icone: '🔍',
    descricao: 'Cria lacuna de informação que precisa ser preenchida',
    psicologia: 'O cérebro não tolera informação incompleta. Busca fechar loops abertos.',
    exemplos: [
      'Headlines que não entregam tudo',
      'Teasers de conteúdo',
      'Promessas misteriosas'
    ],
    frases: [
      '"O segredo que ninguém te conta sobre..."',
      '"Você não vai acreditar no que descobri"',
      '"O erro #1 que 90% das pessoas cometem"',
      '"A técnica secreta que mudou tudo"'
    ],
    cuidados: 'A revelação deve valer a pena. Clickbait sem substância irrita.'
  },
  {
    id: '19',
    nome: 'Dor vs Prazer',
    categoria: 'emocao',
    icone: '💔',
    descricao: 'Mostra a dor de não ter e o prazer de ter',
    psicologia: 'Decisões são emocionais. Dor motiva mais que prazer.',
    exemplos: [
      'Descrever a situação atual dolorosa',
      'Pintar o futuro desejado',
      'Contraste emocional'
    ],
    frases: [
      '"Imagine acordar sem aquela preocupação..."',
      '"Chega de [dor específica]"',
      '"Você merece [prazer específico]"',
      '"Enquanto você sofre com X, poderia estar Y"'
    ],
    cuidados: 'Não exagere na dor a ponto de parecer manipulativo.'
  },
  {
    id: '20',
    nome: 'Prova de Resultado',
    categoria: 'prova',
    icone: '📊',
    descricao: 'Mostra evidências concretas de resultado',
    psicologia: 'Ver é crer. Evidências visuais e numéricas são mais convincentes.',
    exemplos: [
      'Screenshots de resultados',
      'Gráficos de crescimento',
      'Prints de faturamento'
    ],
    frases: [
      '"Olha o resultado do João: [print]"',
      '"Aqui está a prova: R$ X em vendas"',
      '"Não é teoria, é resultado real"',
      '"Veja os números com seus próprios olhos"'
    ],
    cuidados: 'Resultados devem ser reais e típicos, não exceções apresentadas como regra.'
  },
  {
    id: '21',
    nome: 'Ancoragem',
    categoria: 'autoridade',
    icone: '⚓',
    descricao: 'Primeiro número apresentado serve de referência',
    psicologia: 'O cérebro usa a primeira informação como âncora para julgamentos posteriores.',
    exemplos: [
      'Mostrar preço alto antes do real',
      'Valor do mercado vs seu preço',
      'Quanto custaria fazer sozinho'
    ],
    frases: [
      '"Esse conhecimento custou R$ 50.000 em erros"',
      '"Uma consultoria assim custa R$ 10.000"',
      '"Valor real: R$ 5.000. Hoje: R$ 497"',
      '"Quanto você pagaria para resolver isso?"'
    ],
    cuidados: 'Âncoras devem ser comparações justas e defensáveis.'
  },
  {
    id: '22',
    nome: 'Razão/Por Que',
    categoria: 'autoridade',
    icone: '❓',
    descricao: 'Dar uma razão aumenta compliance, mesmo que fraca',
    psicologia: 'O cérebro aceita mais facilmente pedidos que vêm com justificativa.',
    exemplos: [
      'Explicar por que o preço está baixo',
      'Justificar a urgência',
      'Razão para a escassez'
    ],
    frases: [
      '"Estou fazendo isso porque..."',
      '"O preço é esse porque..."',
      '"Só até hoje porque precisamos..."',
      '"Poucas vagas porque queremos dar atenção"'
    ],
    cuidados: 'A razão deve fazer sentido e ser verdadeira.'
  },
  {
    id: '23',
    nome: 'Transformação',
    categoria: 'emocao',
    icone: '🦋',
    descricao: 'Vende a nova identidade, não o produto',
    psicologia: 'Pessoas compram quem elas querem se tornar, não apenas o que querem ter.',
    exemplos: [
      'De funcionário a empreendedor',
      'De iniciante a expert',
      'De frustrado a realizado'
    ],
    frases: [
      '"Torne-se o profissional que você sempre quis ser"',
      '"Transforme-se em referência no seu mercado"',
      '"Deixe de ser X para se tornar Y"',
      '"Essa é a sua chance de se reinventar"'
    ],
    cuidados: 'A transformação prometida deve ser realista e alcançável.'
  },
  {
    id: '24',
    nome: 'Inimigo Comum',
    categoria: 'emocao',
    icone: '👿',
    descricao: 'Une você e o cliente contra um vilão',
    psicologia: 'Inimigos comuns criam aliança e fortalecem conexão.',
    exemplos: [
      'Gurus que vendem ilusão',
      'Sistema que não funciona',
      'Métodos ultrapassados'
    ],
    frases: [
      '"Chega de gurus que só querem seu dinheiro"',
      '"O problema não é você, é o método errado"',
      '"Enquanto os experts te enrolam, eu vou direto ao ponto"',
      '"Diferente dos cursos que só mostram teoria..."'
    ],
    cuidados: 'Não ataque pessoas específicas. Ataque conceitos ou práticas.'
  }
]

export default function GatilhosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [busca, setBusca] = useState('')
  const [gatilhoExpandido, setGatilhoExpandido] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const gatilhosFiltrados = gatilhos.filter(g => {
    const matchCategoria = categoriaAtiva === 'todos' || g.categoria === categoriaAtiva
    const matchBusca = g.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       g.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  const copyFrase = (frase: string, id: string) => {
    navigator.clipboard.writeText(frase.replace(/"/g, ''))
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Biblioteca de <span className="gold-text">Gatilhos Mentais</span>
          </h1>
          <p className="text-[var(--gray)]">{gatilhos.length} gatilhos com exemplos práticos para suas vendas</p>
        </div>

        {/* Busca */}
        <div className="glass p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray)]" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar gatilho..."
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                categoriaAtiva === cat.id
                  ? 'bg-[var(--gold)] text-black'
                  : 'bg-white/10 text-[var(--gray)] hover:bg-white/20'
              }`}
            >
              <cat.icone className="w-4 h-4" />
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Lista de Gatilhos */}
        <div className="space-y-4">
          {gatilhosFiltrados.map(gatilho => (
            <div
              key={gatilho.id}
              className={`glass overflow-hidden transition-all ${
                gatilhoExpandido === gatilho.id ? 'border-[var(--gold)]' : ''
              }`}
            >
              <button
                onClick={() => setGatilhoExpandido(gatilhoExpandido === gatilho.id ? null : gatilho.id)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{gatilho.icone}</span>
                  <div>
                    <h3 className="font-display text-lg">{gatilho.nome}</h3>
                    <p className="text-sm text-[var(--gray)]">{gatilho.descricao}</p>
                  </div>
                </div>
                <div className={`transform transition-transform ${gatilhoExpandido === gatilho.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {gatilhoExpandido === gatilho.id && (
                <div className="px-6 pb-6 animate-fadeInUp">
                  <div className="border-t border-white/10 pt-6">
                    {/* Psicologia */}
                    <div className="mb-6">
                      <h4 className="text-sm text-[var(--gold)] uppercase tracking-wider mb-2">Por Que Funciona</h4>
                      <p className="text-[var(--gray)]">{gatilho.psicologia}</p>
                    </div>

                    {/* Exemplos */}
                    <div className="mb-6">
                      <h4 className="text-sm text-[var(--gold)] uppercase tracking-wider mb-2">Exemplos de Uso</h4>
                      <ul className="space-y-2">
                        {gatilho.exemplos.map((ex, i) => (
                          <li key={i} className="flex items-center gap-2 text-[var(--gray)]">
                            <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Frases Prontas */}
                    <div className="mb-6">
                      <h4 className="text-sm text-[var(--gold)] uppercase tracking-wider mb-2">Frases Prontas (clique para copiar)</h4>
                      <div className="space-y-2">
                        {gatilho.frases.map((frase, i) => (
                          <button
                            key={i}
                            onClick={() => copyFrase(frase, `${gatilho.id}-${i}`)}
                            className="w-full text-left p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-all flex items-center justify-between group"
                          >
                            <span className="text-white">{frase}</span>
                            {copied === `${gatilho.id}-${i}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-[var(--gray)] opacity-0 group-hover:opacity-100" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cuidados */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="text-sm text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Cuidados
                      </h4>
                      <p className="text-[var(--gray)]">{gatilho.cuidados}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {gatilhosFiltrados.length === 0 && (
          <div className="text-center py-12 text-[var(--gray)]">
            Nenhum gatilho encontrado para essa busca.
          </div>
        )}
      </div>
    </main>
  )
}
