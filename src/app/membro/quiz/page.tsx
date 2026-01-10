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
  CheckCircle
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
    categorias: Categoria[]
  }[]
}

const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: "Quando você vê notícias sobre problemas, qual te incomoda mais?",
    opcoes: [
      { texto: "Filas em hospitais e falta de médicos", categorias: ['Saúde'] },
      { texto: "Pessoas endividadas sem conseguir pagar contas", categorias: ['Finanças'] },
      { texto: "Burocracia para abrir empresa ou resolver documentos", categorias: ['Burocracia'] },
      { texto: "Escolas sucateadas e jovens sem oportunidade", categorias: ['Educação'] }
    ]
  },
  {
    id: 2,
    texto: "Se pudesse criar um software para resolver um problema, qual seria?",
    opcoes: [
      { texto: "App para encontrar vagas de emprego", categorias: ['Emprego'] },
      { texto: "Sistema para transporte público eficiente", categorias: ['Transporte'] },
      { texto: "Plataforma para ajudar a encontrar moradia", categorias: ['Moradia'] },
      { texto: "Ferramenta para aumentar segurança", categorias: ['Segurança'] }
    ]
  },
  {
    id: 3,
    texto: "Em qual área você ou pessoas próximas tiveram mais frustração?",
    opcoes: [
      { texto: "Conseguir atendimento médico de qualidade", categorias: ['Saúde'] },
      { texto: "Lidar com bancos, juros e dívidas", categorias: ['Finanças'] },
      { texto: "Resolver problemas em órgãos públicos", categorias: ['Burocracia'] },
      { texto: "Encontrar educação de qualidade", categorias: ['Educação'] }
    ]
  },
  {
    id: 4,
    texto: "O que seus amigos e família mais reclamam no dia a dia?",
    opcoes: [
      { texto: "Trânsito e demora no transporte", categorias: ['Transporte'] },
      { texto: "Preço do aluguel e moradia", categorias: ['Moradia'] },
      { texto: "Insegurança e medo de assaltos", categorias: ['Segurança'] },
      { texto: "Dificuldade de conseguir emprego", categorias: ['Emprego'] }
    ]
  },
  {
    id: 5,
    texto: "Qual tipo de conteúdo você mais consome na internet?",
    opcoes: [
      { texto: "Tecnologia, gadgets e startups", categorias: ['Tecnologia'] },
      { texto: "Sustentabilidade e meio ambiente", categorias: ['Meio Ambiente'] },
      { texto: "Receitas e alimentação saudável", categorias: ['Alimentação'] },
      { texto: "Relacionamentos e desenvolvimento pessoal", categorias: ['Relacionamentos'] }
    ]
  },
  {
    id: 6,
    texto: "Se fosse dar uma palestra, qual tema escolheria?",
    opcoes: [
      { texto: "Como a tecnologia pode mudar vidas", categorias: ['Tecnologia'] },
      { texto: "Finanças pessoais e liberdade financeira", categorias: ['Finanças'] },
      { texto: "Saúde mental e bem-estar", categorias: ['Saúde', 'Relacionamentos'] },
      { texto: "Educação e o futuro do aprendizado", categorias: ['Educação'] }
    ]
  },
  {
    id: 7,
    texto: "Qual problema, se resolvido, mudaria mais a vida das pessoas?",
    opcoes: [
      { texto: "Acesso à saúde de qualidade", categorias: ['Saúde'] },
      { texto: "Moradia digna e acessível", categorias: ['Moradia'] },
      { texto: "Emprego e renda para todos", categorias: ['Emprego'] },
      { texto: "Segurança pública eficiente", categorias: ['Segurança'] }
    ]
  },
  {
    id: 8,
    texto: "Qual situação te deixaria mais motivado a criar uma solução?",
    opcoes: [
      { texto: "Ver alguém perdido em filas de cartório", categorias: ['Burocracia'] },
      { texto: "Ver alguém com dificuldade de se alimentar bem", categorias: ['Alimentação'] },
      { texto: "Ver o meio ambiente sendo destruído", categorias: ['Meio Ambiente'] },
      { texto: "Ver relacionamentos sendo destruídos", categorias: ['Relacionamentos'] }
    ]
  },
  {
    id: 9,
    texto: "Em qual área você tem mais conhecimento ou experiência?",
    opcoes: [
      { texto: "Saúde ou cuidados com pessoas", categorias: ['Saúde'] },
      { texto: "Financeira, contábil ou administrativa", categorias: ['Finanças', 'Burocracia'] },
      { texto: "Tecnologia, programação ou inovação", categorias: ['Tecnologia'] },
      { texto: "Educação, ensino ou treinamento", categorias: ['Educação'] }
    ]
  },
  {
    id: 10,
    texto: "Se escolhesse um nicho para os próximos 10 anos, qual seria?",
    opcoes: [
      { texto: "Saúde e bem-estar", categorias: ['Saúde'] },
      { texto: "Finanças e investimentos", categorias: ['Finanças'] },
      { texto: "Tecnologia e inovação", categorias: ['Tecnologia'] },
      { texto: "Educação e desenvolvimento", categorias: ['Educação'] }
    ]
  },
  {
    id: 11,
    texto: "Qual problema você entende mais profundamente?",
    opcoes: [
      { texto: "Dificuldade de locomoção nas cidades", categorias: ['Transporte'] },
      { texto: "Desafio de conseguir moradia digna", categorias: ['Moradia'] },
      { texto: "Luta diária por um emprego melhor", categorias: ['Emprego'] },
      { texto: "Insegurança que assola as cidades", categorias: ['Segurança'] }
    ]
  },
  {
    id: 12,
    texto: "Qual causa te faz levantar da cama com vontade de mudar o mundo?",
    opcoes: [
      { texto: "Melhorar a saúde das pessoas", categorias: ['Saúde'] },
      { texto: "Ajudar pessoas com liberdade financeira", categorias: ['Finanças'] },
      { texto: "Usar tecnologia para resolver problemas", categorias: ['Tecnologia'] },
      { texto: "Transformar a educação", categorias: ['Educação'] }
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

const notasLabels = [
  { valor: 0, label: 'Nada', emoji: '😐' },
  { valor: 1, label: 'Pouco', emoji: '🤔' },
  { valor: 2, label: 'Talvez', emoji: '😊' },
  { valor: 3, label: 'Gosto', emoji: '👍' },
  { valor: 4, label: 'Muito', emoji: '😍' },
  { valor: 5, label: 'Amo!', emoji: '🔥' }
]

export default function QuizPage() {
  const router = useRouter()
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [notasPergunta, setNotasPergunta] = useState<(number | null)[]>([null, null, null, null])
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

  const setNota = (opcaoIndex: number, nota: number) => {
    if (animating) return
    setNotasPergunta(prev => {
      const novas = [...prev]
      novas[opcaoIndex] = nota
      return novas
    })
  }

  const todasNotasPreenchidas = notasPergunta.every(n => n !== null)

  const proximaPergunta = () => {
    if (!todasNotasPreenchidas || animating) return

    setAnimating(true)

    // Atualiza pontuação com as notas dadas
    const novaPontuacao = { ...pontuacao }
    notasPergunta.forEach((nota, index) => {
      if (nota !== null && nota > 0) {
        const categorias = perguntas[perguntaAtual].opcoes[index].categorias
        categorias.forEach(categoria => {
          novaPontuacao[categoria] += nota
        })
      }
    })
    setPontuacao(novaPontuacao)

    // Limpa notas e avança
    setTimeout(() => {
      setNotasPergunta([null, null, null, null])
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
    setNotasPergunta([null, null, null, null])
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
  const notasPreenchidas = notasPergunta.filter(n => n !== null).length

  if (finalizado) {
    const top3 = getTop3()
    const principal = top3[0]
    const info = categoriasInfo[principal.categoria]

    // Calcula porcentagem do principal
    const totalPontos = Object.values(pontuacao).reduce((a, b) => a + b, 0)
    const porcentagemPrincipal = totalPontos > 0 ? Math.round((principal.pontos / totalPontos) * 100) : 0

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
              <p className="text-[var(--gray)] text-sm">Análise completa do seu perfil</p>
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
              <div className={`inline-flex items-center gap-2 ${info.cor} mb-4`}>
                {info.icone}
                <span className="text-lg font-semibold">{principal.pontos} pontos</span>
              </div>
              <div className="mb-6">
                <span className="bg-[var(--gold)]/20 text-[var(--gold)] px-4 py-2 rounded-full text-sm font-semibold">
                  {porcentagemPrincipal}% de afinidade
                </span>
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
                const porcentagem = totalPontos > 0 ? Math.round((item.pontos / totalPontos) * 100) : 0
                return (
                  <div
                    key={item.categoria}
                    className={`glass p-4 ${index === 0 ? 'border-2 border-[var(--gold)]' : ''}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
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
                      <span className="text-[var(--gold)] font-semibold">{porcentagem}%</span>
                      {index === 0 && (
                        <CheckCircle className="w-6 h-6 text-[var(--gold)]" />
                      )}
                    </div>
                    {/* Barra de progresso */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          index === 0 ? 'bg-[var(--gold)]' : 'bg-white/30'
                        }`}
                        style={{ width: `${porcentagem}%` }}
                      />
                    </div>
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
          <div className="glass p-6 sm:p-8 mb-6 animate-fadeInUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
                <span className="font-display text-xl text-[var(--gold)]">{perguntaAtual + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Dê uma nota de 0 a 5 para cada opção</p>
              </div>
              <div className="text-sm text-[var(--gold)]">
                {notasPreenchidas}/4
              </div>
            </div>
            <h2 className="font-display text-xl sm:text-2xl leading-relaxed">
              {pergunta.texto}
            </h2>
          </div>

          {/* Opções com notas */}
          <div className="space-y-4">
            {pergunta.opcoes.map((opcao, index) => {
              const notaAtual = notasPergunta[index]
              return (
                <div
                  key={index}
                  className={`glass p-4 sm:p-5 rounded-xl transition-all ${
                    notaAtual !== null ? 'border-[var(--gold)]/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${
                      notaAtual !== null ? 'bg-[var(--gold)] text-black' : 'bg-white/10'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="text-sm sm:text-base flex-1">{opcao.texto}</p>
                    {notaAtual !== null && (
                      <span className="text-2xl">{notasLabels[notaAtual].emoji}</span>
                    )}
                  </div>

                  {/* Botões de nota */}
                  <div className="flex gap-2 justify-center">
                    {notasLabels.map(({ valor, label }) => (
                      <button
                        key={valor}
                        onClick={() => setNota(index, valor)}
                        disabled={animating}
                        className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          notaAtual === valor
                            ? 'bg-[var(--gold)] text-black'
                            : 'bg-white/5 hover:bg-white/10 text-[var(--gray)] hover:text-white'
                        }`}
                      >
                        <div className="font-bold">{valor}</div>
                        <div className="hidden sm:block text-[10px] opacity-70">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Botão Avançar */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={proximaPergunta}
              disabled={!todasNotasPreenchidas || animating}
              className={`btn-primary inline-flex items-center gap-2 ${
                !todasNotasPreenchidas ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {perguntaAtual < perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dica */}
          <div className="mt-6 text-center">
            <p className="text-[var(--gray)] text-sm">
              {!todasNotasPreenchidas
                ? `Avalie todas as ${4 - notasPreenchidas} opções restantes`
                : 'Todas avaliadas! Clique para continuar'
              }
            </p>
          </div>
        </section>

        {/* Legenda */}
        <div className="mt-8 glass p-4 animate-fadeInUp">
          <p className="text-xs text-[var(--gray)] text-center mb-3">Legenda das notas:</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {notasLabels.map(({ valor, label, emoji }) => (
              <div key={valor} className="flex items-center gap-1 text-[var(--gray)]">
                <span>{emoji}</span>
                <span className="font-semibold">{valor}</span>
                <span>= {label}</span>
              </div>
            ))}
          </div>
        </div>

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
