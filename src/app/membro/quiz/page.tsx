'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Heart,
  DollarSign,
  FileText,
  GraduationCap,
  Shield,
  Car,
  Home,
  Briefcase,
  Cpu,
  Leaf,
  UtensilsCrossed,
  Users,
  Sparkles,
  RotateCcw,
  CheckCircle,
  Check
} from 'lucide-react'

type Categoria =
  | 'Saúde'
  | 'Finanças'
  | 'Burocracia'
  | 'Educação'
  | 'Segurança'
  | 'Transporte'
  | 'Moradia'
  | 'Emprego'
  | 'Tecnologia'
  | 'Meio Ambiente'
  | 'Alimentação'
  | 'Relacionamentos'

type Pergunta = {
  id: number
  texto: string
  opcoes: {
    texto: string
    pontos: Partial<Record<Categoria, number>>
  }[]
}

const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: "Quando você vê uma notícia sobre problemas no Brasil, quais te incomodam MAIS?",
    opcoes: [
      { texto: "Filas enormes em hospitais e falta de médicos", pontos: { 'Saúde': 3 } },
      { texto: "Pessoas endividadas e sem conseguir pagar contas", pontos: { 'Finanças': 3 } },
      { texto: "Burocracia absurda para abrir empresa ou resolver documentos", pontos: { 'Burocracia': 3 } },
      { texto: "Escolas sucateadas e jovens sem oportunidade", pontos: { 'Educação': 3 } }
    ]
  },
  {
    id: 2,
    texto: "Se você pudesse criar softwares para resolver problemas, quais seriam?",
    opcoes: [
      { texto: "App para encontrar vagas de emprego mais facilmente", pontos: { 'Emprego': 3 } },
      { texto: "Sistema para tornar o transporte público mais eficiente", pontos: { 'Transporte': 3 } },
      { texto: "Plataforma para ajudar pessoas a encontrar moradia", pontos: { 'Moradia': 3 } },
      { texto: "Ferramenta para denunciar crimes e aumentar segurança", pontos: { 'Segurança': 3 } }
    ]
  },
  {
    id: 3,
    texto: "Em quais áreas você ou pessoas próximas já tiveram MAIS frustração?",
    opcoes: [
      { texto: "Conseguir atendimento médico de qualidade", pontos: { 'Saúde': 3 } },
      { texto: "Lidar com bancos, juros e dívidas", pontos: { 'Finanças': 3 } },
      { texto: "Resolver problemas com documentos e órgãos públicos", pontos: { 'Burocracia': 3 } },
      { texto: "Encontrar cursos ou educação de qualidade", pontos: { 'Educação': 3 } }
    ]
  },
  {
    id: 4,
    texto: "O que seus amigos e família MAIS reclamam no dia a dia?",
    opcoes: [
      { texto: "Trânsito, ônibus lotado, demora no transporte", pontos: { 'Transporte': 3 } },
      { texto: "Preço do aluguel e dificuldade de ter casa própria", pontos: { 'Moradia': 3 } },
      { texto: "Insegurança nas ruas e medo de assaltos", pontos: { 'Segurança': 3 } },
      { texto: "Dificuldade de conseguir um bom emprego", pontos: { 'Emprego': 3 } }
    ]
  },
  {
    id: 5,
    texto: "Quais tipos de conteúdo você mais consome na internet?",
    opcoes: [
      { texto: "Tecnologia, gadgets, inovação e startups", pontos: { 'Tecnologia': 3 } },
      { texto: "Sustentabilidade, meio ambiente e ecologia", pontos: { 'Meio Ambiente': 3 } },
      { texto: "Receitas, alimentação saudável e gastronomia", pontos: { 'Alimentação': 3 } },
      { texto: "Relacionamentos, psicologia e desenvolvimento pessoal", pontos: { 'Relacionamentos': 3 } }
    ]
  },
  {
    id: 6,
    texto: "Se você fosse convidado para palestras, quais temas escolheria?",
    opcoes: [
      { texto: "Como a tecnologia pode mudar vidas", pontos: { 'Tecnologia': 3 } },
      { texto: "Finanças pessoais e liberdade financeira", pontos: { 'Finanças': 3 } },
      { texto: "Saúde mental e bem-estar", pontos: { 'Saúde': 2, 'Relacionamentos': 1 } },
      { texto: "Educação e o futuro do aprendizado", pontos: { 'Educação': 3 } }
    ]
  },
  {
    id: 7,
    texto: "Quais problemas você acha que, se resolvidos, mudariam MAIS a vida das pessoas?",
    opcoes: [
      { texto: "Acesso à saúde de qualidade para todos", pontos: { 'Saúde': 3 } },
      { texto: "Moradia digna e acessível", pontos: { 'Moradia': 3 } },
      { texto: "Emprego e renda para todos", pontos: { 'Emprego': 3 } },
      { texto: "Segurança pública eficiente", pontos: { 'Segurança': 3 } }
    ]
  },
  {
    id: 8,
    texto: "Quais situações te deixariam MAIS motivado a criar uma solução?",
    opcoes: [
      { texto: "Ver alguém perdido em filas de cartório", pontos: { 'Burocracia': 3 } },
      { texto: "Ver alguém com dificuldade de se alimentar bem", pontos: { 'Alimentação': 3 } },
      { texto: "Ver o meio ambiente sendo destruído", pontos: { 'Meio Ambiente': 3 } },
      { texto: "Ver relacionamentos sendo destruídos por falta de comunicação", pontos: { 'Relacionamentos': 3 } }
    ]
  },
  {
    id: 9,
    texto: "Em quais áreas você tem MAIS conhecimento ou experiência?",
    opcoes: [
      { texto: "Área da saúde ou cuidados com pessoas", pontos: { 'Saúde': 3 } },
      { texto: "Área financeira, contábil ou administrativa", pontos: { 'Finanças': 2, 'Burocracia': 1 } },
      { texto: "Área de tecnologia, programação ou inovação", pontos: { 'Tecnologia': 3 } },
      { texto: "Área de educação, ensino ou treinamento", pontos: { 'Educação': 3 } }
    ]
  },
  {
    id: 10,
    texto: "Se você tivesse que escolher nichos para trabalhar pelos próximos 10 anos, quais seriam?",
    opcoes: [
      { texto: "Saúde e bem-estar das pessoas", pontos: { 'Saúde': 3 } },
      { texto: "Ajudar pessoas com dinheiro e finanças", pontos: { 'Finanças': 3 } },
      { texto: "Tecnologia e inovação", pontos: { 'Tecnologia': 3 } },
      { texto: "Educação e desenvolvimento de pessoas", pontos: { 'Educação': 3 } }
    ]
  },
  {
    id: 11,
    texto: "Quais problemas você sente que ENTENDE mais profundamente?",
    opcoes: [
      { texto: "A dificuldade de se locomover nas grandes cidades", pontos: { 'Transporte': 3 } },
      { texto: "O desafio de conseguir uma moradia digna", pontos: { 'Moradia': 3 } },
      { texto: "A luta diária por um emprego melhor", pontos: { 'Emprego': 3 } },
      { texto: "A insegurança que assola as cidades", pontos: { 'Segurança': 3 } }
    ]
  },
  {
    id: 12,
    texto: "Por fim: quais causas te fazem LEVANTAR DA CAMA com vontade de mudar o mundo?",
    opcoes: [
      { texto: "Melhorar a saúde e qualidade de vida das pessoas", pontos: { 'Saúde': 3 } },
      { texto: "Ajudar pessoas a conquistarem liberdade financeira", pontos: { 'Finanças': 3 } },
      { texto: "Usar tecnologia para resolver problemas reais", pontos: { 'Tecnologia': 3 } },
      { texto: "Transformar a educação e dar oportunidades", pontos: { 'Educação': 3 } }
    ]
  }
]

const categoriasInfo: Record<Categoria, { icone: React.ReactNode, cor: string, descricao: string, mercado: string }> = {
  'Saúde': {
    icone: <Heart className="w-8 h-8" />,
    cor: 'text-red-400',
    descricao: 'Você se importa profundamente com o bem-estar das pessoas. Tem empatia natural e quer ver pessoas vivendo melhor.',
    mercado: 'HealthTech movimenta $500 bilhões globalmente. Apps de saúde mental, telemedicina e fitness estão em alta.'
  },
  'Finanças': {
    icone: <DollarSign className="w-8 h-8" />,
    cor: 'text-green-400',
    descricao: 'Você entende a importância do dinheiro na vida das pessoas e quer ajudá-las a conquistar liberdade financeira.',
    mercado: 'FinTech é um dos setores que mais cresce. Nubank provou que há espaço para inovação no Brasil.'
  },
  'Burocracia': {
    icone: <FileText className="w-8 h-8" />,
    cor: 'text-orange-400',
    descricao: 'Você odeia ineficiência e quer simplificar processos. Vê oportunidade onde outros veem apenas frustração.',
    mercado: 'GovTech e LegalTech são mercados pouco explorados com ENORME potencial no Brasil.'
  },
  'Educação': {
    icone: <GraduationCap className="w-8 h-8" />,
    cor: 'text-blue-400',
    descricao: 'Você acredita que educação transforma vidas. Quer democratizar conhecimento e criar oportunidades.',
    mercado: 'EdTech explodiu pós-pandemia. Mercado de $400 bilhões com muito espaço para nichos específicos.'
  },
  'Segurança': {
    icone: <Shield className="w-8 h-8" />,
    cor: 'text-purple-400',
    descricao: 'Você quer que as pessoas vivam sem medo. Segurança é uma necessidade básica que ainda não foi resolvida.',
    mercado: 'SecurityTech cresce 15% ao ano. Apps de segurança pessoal e monitoramento têm alta demanda.'
  },
  'Transporte': {
    icone: <Car className="w-8 h-8" />,
    cor: 'text-cyan-400',
    descricao: 'Você sente na pele o problema de mobilidade urbana. Quer que pessoas percam menos tempo se deslocando.',
    mercado: 'MobilityTech vai além de Uber. Logística, rotas, integração de transporte - mercado de $200 bilhões.'
  },
  'Moradia': {
    icone: <Home className="w-8 h-8" />,
    cor: 'text-amber-400',
    descricao: 'Você entende que ter um lar é fundamental. Quer ajudar pessoas a encontrar seu lugar no mundo.',
    mercado: 'PropTech revoluciona o mercado imobiliário. QuintoAndar mostrou o caminho no Brasil.'
  },
  'Emprego': {
    icone: <Briefcase className="w-8 h-8" />,
    cor: 'text-indigo-400',
    descricao: 'Você sabe que emprego é dignidade. Quer conectar pessoas a oportunidades que mudem suas vidas.',
    mercado: 'HRTech e plataformas de emprego movimentam bilhões. LinkedIn é só a ponta do iceberg.'
  },
  'Tecnologia': {
    icone: <Cpu className="w-8 h-8" />,
    cor: 'text-emerald-400',
    descricao: 'Você é fascinado por inovação. Vê a tecnologia como ferramenta para resolver qualquer problema.',
    mercado: 'Tecnologia permeia todos os setores. Ser "tech-first" é vantagem competitiva em qualquer nicho.'
  },
  'Meio Ambiente': {
    icone: <Leaf className="w-8 h-8" />,
    cor: 'text-lime-400',
    descricao: 'Você se preocupa com o futuro do planeta. Quer criar soluções sustentáveis para as próximas gerações.',
    mercado: 'CleanTech e sustentabilidade são tendência global. ESG domina decisões de investimento.'
  },
  'Alimentação': {
    icone: <UtensilsCrossed className="w-8 h-8" />,
    cor: 'text-rose-400',
    descricao: 'Você entende que alimentação é saúde. Quer ajudar pessoas a comerem melhor e viverem mais.',
    mercado: 'FoodTech vai de delivery a agricultura. iFood é brasileiro e vale bilhões.'
  },
  'Relacionamentos': {
    icone: <Users className="w-8 h-8" />,
    cor: 'text-pink-400',
    descricao: 'Você valoriza conexões humanas. Quer ajudar pessoas a construírem relacionamentos mais saudáveis.',
    mercado: 'Apps de relacionamento movimentam $10 bilhões. Mas vai além: networking, comunidades, suporte.'
  }
}

export default function QuizPage() {
  const router = useRouter()
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [selecoesPergunta, setSelecoesPergunta] = useState<number[]>([])
  const [pontuacao, setPontuacao] = useState<Record<Categoria, number>>({
    'Saúde': 0,
    'Finanças': 0,
    'Burocracia': 0,
    'Educação': 0,
    'Segurança': 0,
    'Transporte': 0,
    'Moradia': 0,
    'Emprego': 0,
    'Tecnologia': 0,
    'Meio Ambiente': 0,
    'Alimentação': 0,
    'Relacionamentos': 0
  })
  const [finalizado, setFinalizado] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
    }
  }, [router])

  const toggleSelecao = (opcaoIndex: number) => {
    if (animating) return

    setSelecoesPergunta(prev => {
      if (prev.includes(opcaoIndex)) {
        // Remover se já está selecionado
        return prev.filter(i => i !== opcaoIndex)
      } else if (prev.length < 2) {
        // Adicionar se ainda não tem 2
        return [...prev, opcaoIndex]
      } else {
        // Substituir o segundo se já tem 2
        return [prev[0], opcaoIndex]
      }
    })
  }

  const proximaPergunta = () => {
    if (selecoesPergunta.length < 1 || animating) return

    setAnimating(true)

    // Atualiza pontuação com as duas seleções
    const novaPontuacao = { ...pontuacao }
    selecoesPergunta.forEach(opcaoIndex => {
      const opcao = perguntas[perguntaAtual].opcoes[opcaoIndex]
      Object.entries(opcao.pontos).forEach(([categoria, pontos]) => {
        novaPontuacao[categoria as Categoria] += pontos as number
      })
    })
    setPontuacao(novaPontuacao)

    // Limpa seleções e avança
    setTimeout(() => {
      setSelecoesPergunta([])
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(prev => prev + 1)
      } else {
        setFinalizado(true)
      }
      setAnimating(false)
    }, 300)
  }

  const getTop3 = (): { categoria: Categoria, pontos: number }[] => {
    return Object.entries(pontuacao)
      .map(([categoria, pontos]) => ({ categoria: categoria as Categoria, pontos }))
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, 3)
  }

  const reiniciar = () => {
    setPerguntaAtual(0)
    setSelecoesPergunta([])
    setPontuacao({
      'Saúde': 0,
      'Finanças': 0,
      'Burocracia': 0,
      'Educação': 0,
      'Segurança': 0,
      'Transporte': 0,
      'Moradia': 0,
      'Emprego': 0,
      'Tecnologia': 0,
      'Meio Ambiente': 0,
      'Alimentação': 0,
      'Relacionamentos': 0
    })
    setFinalizado(false)
  }

  const progresso = ((perguntaAtual) / perguntas.length) * 100

  if (finalizado) {
    const top3 = getTop3()
    const principal = top3[0]
    const info = categoriasInfo[principal.categoria]

    return (
      <main className="min-h-screen">
        <div className="bg-pattern" />

        <div className="max-w-3xl mx-auto px-5 py-10">
          {/* Header */}
          <header className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push('/membro')}
              className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
            </button>
            <div>
              <h1 className="font-display text-xl sm:text-2xl gold-text">Seu Resultado</h1>
              <p className="text-[var(--gray)] text-sm">Descobrimos seu nicho ideal</p>
            </div>
          </header>

          {/* Resultado Principal */}
          <section className="mb-8 animate-fadeInUp">
            <div className="glass-strong p-8 sm:p-10 text-center border-2 border-[var(--gold)]">
              <div className="w-20 h-20 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-[var(--gold)]" />
              </div>
              <p className="text-[var(--gray)] mb-2">Seu nicho principal é</p>
              <h2 className="font-display text-4xl sm:text-5xl gold-text mb-4">
                {principal.categoria}
              </h2>
              <div className={`inline-flex items-center gap-2 ${info.cor} mb-6`}>
                {info.icone}
                <span className="text-lg font-semibold">{principal.pontos} pontos</span>
              </div>
              <p className="text-[var(--gray)] text-lg max-w-xl mx-auto">
                {info.descricao}
              </p>
            </div>
          </section>

          {/* Mercado */}
          <section className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="glass p-6 border-l-4 border-[var(--gold)]">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Oportunidade de Mercado
              </h3>
              <p className="text-[var(--gray)]">{info.mercado}</p>
            </div>
          </section>

          {/* Top 3 */}
          <section className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display text-lg mb-4">Seus Top 3 Nichos</h3>
            <div className="space-y-3">
              {top3.map((item, index) => {
                const itemInfo = categoriasInfo[item.categoria]
                return (
                  <div
                    key={item.categoria}
                    className={`glass p-4 flex items-center gap-4 ${index === 0 ? 'border-2 border-[var(--gold)]' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-[var(--gold)] text-black' : 'bg-white/10'
                    }`}>
                      <span className="font-bold">{index + 1}º</span>
                    </div>
                    <div className={`${itemInfo.cor}`}>
                      {itemInfo.icone}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.categoria}</h4>
                      <p className="text-[var(--gray)] text-sm">{item.pontos} pontos</p>
                    </div>
                    {index === 0 && (
                      <CheckCircle className="w-6 h-6 text-[var(--gold)]" />
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Próximos Passos */}
          <section className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="glass p-6 sm:p-8 text-center">
              <h3 className="font-display text-xl mb-4">Próximos Passos</h3>
              <p className="text-[var(--gray)] mb-6">
                Agora que você sabe seu nicho, é hora de pesquisar as dores específicas dessa área.
                Use a ferramenta de pesquisa focando em <strong className="text-[var(--gold)]">{principal.categoria}</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/membro/pesquisa')}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Ir para Pesquisa
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={reiniciar}
                  className="px-6 py-3 border border-[var(--gold)]/30 rounded-full hover:border-[var(--gold)] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Refazer Quiz
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-[var(--gold)]/20">
            <p className="text-[var(--gray)] text-sm">
              Mentoria Elite &copy; 2026 - Descobrindo Seu Nicho de Milhões
            </p>
          </footer>
        </div>
      </main>
    )
  }

  const pergunta = perguntas[perguntaAtual]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl gold-text">Quiz de Nicho</h1>
            <p className="text-[var(--gray)] text-sm">Descubra sua área ideal</p>
          </div>
        </header>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--gray)]">Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
            <span className="text-[var(--gold)]">{Math.round(progresso)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        {/* Pergunta */}
        <section className={`${animating ? 'opacity-50' : ''}`}>
          <div className="glass p-6 sm:p-10 mb-6 animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
                <span className="font-display text-xl text-[var(--gold)]">{perguntaAtual + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--gray)] uppercase tracking-wider mb-1">Escolha 1 ou 2 opções</p>
              </div>
              <div className="flex gap-1">
                <div className={`w-3 h-3 rounded-full ${selecoesPergunta.length >= 1 ? 'bg-[var(--gold)]' : 'bg-white/20'} transition-colors`} />
                <div className={`w-3 h-3 rounded-full ${selecoesPergunta.length >= 2 ? 'bg-[var(--gold)]' : 'bg-white/10'} transition-colors`} />
              </div>
            </div>
            <h2 className="font-display text-xl sm:text-2xl leading-relaxed">
              {pergunta.texto}
            </h2>
          </div>

          {/* Opções */}
          <div className="space-y-3">
            {pergunta.opcoes.map((opcao, index) => {
              const selecionado = selecoesPergunta.includes(index)
              return (
                <button
                  key={index}
                  onClick={() => toggleSelecao(index)}
                  disabled={animating}
                  className={`w-full text-left p-5 rounded-xl transition-all group ${
                    selecionado
                      ? 'bg-[var(--gold)]/20 border-2 border-[var(--gold)]'
                      : 'glass hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      selecionado
                        ? 'bg-[var(--gold)] text-black'
                        : 'border border-[var(--gold)]/30 group-hover:border-[var(--gold)]'
                    }`}>
                      {selecionado ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="text-sm sm:text-base">{opcao.texto}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Botão Avançar */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={proximaPergunta}
              disabled={selecoesPergunta.length < 1 || animating}
              className={`btn-primary inline-flex items-center gap-2 ${
                selecoesPergunta.length < 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {perguntaAtual < perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dica */}
          <div className="mt-6 text-center">
            <p className="text-[var(--gray)] text-sm">
              {selecoesPergunta.length === 0 && 'Selecione pelo menos 1 opção (máximo 2)'}
              {selecoesPergunta.length === 1 && 'Você pode selecionar mais 1 opção ou avançar'}
              {selecoesPergunta.length === 2 && 'Máximo atingido - clique para avançar'}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Descobrindo Seu Nicho de Milhões
          </p>
        </footer>
      </div>
    </main>
  )
}
