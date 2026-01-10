'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Quote,
  BarChart3,
  Users,
  DollarSign,
  XCircle
} from 'lucide-react'

export default function ConteudoPage() {
  const router = useRouter()

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
    }
  }, [router])

  const estatisticas = [
    { numero: '42%', texto: 'das startups falham por não haver demanda de mercado', fonte: 'CB Insights' },
    { numero: '90%', texto: 'das startups falham nos primeiros 5 anos', fonte: 'Forbes' },
    { numero: '70%', texto: 'dos empreendedores pulam a etapa de pesquisa', fonte: 'Harvard Business Review' },
  ]

  const empresasQueFalharam = [
    { nome: 'Juicero', motivo: 'Criou um espremedor de $700 sem validar se alguém queria', resultado: 'Fechou em 16 meses' },
    { nome: 'Quibi', motivo: 'Investiu $1.75 bilhão sem entender o comportamento do usuário', resultado: 'Fechou em 6 meses' },
    { nome: 'Google Glass', motivo: 'Tecnologia incrível, mas ninguém tinha a dor que ele resolvia', resultado: 'Descontinuado' },
  ]

  const empresasQueVenceram = [
    { nome: 'Airbnb', motivo: 'Descobriram que pessoas queriam hospedagem autêntica e barata', resultado: 'Vale $75 bilhões' },
    { nome: 'Uber', motivo: 'Identificaram a dor de conseguir táxi em horários de pico', resultado: 'Vale $70 bilhões' },
    { nome: 'Nubank', motivo: 'Entenderam o ódio dos brasileiros por bancos tradicionais', resultado: 'Vale $30 bilhões' },
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-12">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl gold-text">A Importância da Pesquisa</h1>
            <p className="text-[var(--gray)] text-sm">Por que isso vai definir seu sucesso</p>
          </div>
        </header>

        {/* Citação Lincoln */}
        <section className="mb-12 animate-fadeInUp">
          <div className="glass-strong p-8 sm:p-12 text-center border-2 border-[var(--gold)]">
            <Quote className="w-12 h-12 text-[var(--gold)] mx-auto mb-6 opacity-50" />
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl mb-6 leading-relaxed">
              "Se eu tivesse <span className="gold-text">6 horas</span> para derrubar uma árvore,
              passaria as primeiras <span className="gold-text">4 afiando o machado</span>."
            </blockquote>
            <cite className="text-[var(--gray)] text-lg">— Abraham Lincoln</cite>
          </div>
        </section>

        {/* O que isso significa */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h2 className="font-display text-xl">O Que Isso Significa Para Você</h2>
            </div>
            <div className="space-y-4 text-[var(--gray)]">
              <p className="text-lg">
                Lincoln não estava falando sobre árvores. Estava falando sobre <strong className="text-white">preparação</strong>.
              </p>
              <p>
                No mundo dos negócios, a <span className="text-[var(--gold)] font-semibold">pesquisa é o seu machado</span>.
                Quanto mais afiado ele estiver, mais fácil será derrubar qualquer obstáculo.
              </p>
              <p>
                A maioria dos empreendedores quer pular direto para a ação. Querem codar, querem vender,
                querem lançar. Mas os que vencem? Eles passam <span className="text-[var(--gold)] font-semibold">67% do tempo</span> entendendo
                o problema antes de criar a solução.
              </p>
            </div>
          </div>
        </section>

        {/* 50% do Negócio */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="glass p-6 sm:p-8 border-l-4 border-[var(--gold)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h2 className="font-display text-xl">A Pesquisa é 50% do Negócio</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-red-400">SEM Pesquisa</h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--gray)]">
                  <li>• Você constrói algo que acha legal</li>
                  <li>• Gasta meses desenvolvendo</li>
                  <li>• Lança e... ninguém compra</li>
                  <li>• Descobre que o problema não existia</li>
                  <li>• Perde tempo, dinheiro e motivação</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-green-400">COM Pesquisa</h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--gray)]">
                  <li>• Você descobre uma dor REAL</li>
                  <li>• Constrói exatamente o que precisam</li>
                  <li>• Lança e as pessoas imploram para comprar</li>
                  <li>• Cada feature resolve um problema validado</li>
                  <li>• Cresce rápido porque acertou na veia</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <h2 className="font-display text-xl">Os Números Não Mentem</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {estatisticas.map((stat, index) => (
              <div key={index} className="glass p-6 text-center">
                <div className="font-display text-3xl sm:text-4xl text-[var(--gold)] mb-2">
                  {stat.numero}
                </div>
                <p className="text-[var(--gray)] text-sm mb-3">{stat.texto}</p>
                <span className="text-[10px] text-[var(--gray)]/60 uppercase tracking-wider">
                  Fonte: {stat.fonte}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Empresas que Falharam */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-red-500/50 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="font-display text-xl">Quem Pulou a Pesquisa</h2>
          </div>
          <div className="space-y-4">
            {empresasQueFalharam.map((empresa, index) => (
              <div key={index} className="glass p-5 border-l-4 border-red-500/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg text-red-400">{empresa.nome}</h3>
                    <p className="text-[var(--gray)] text-sm mt-1">{empresa.motivo}</p>
                  </div>
                  <span className="text-red-400 text-xs bg-red-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {empresa.resultado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empresas que Venceram */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-green-500/50 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="font-display text-xl">Quem Entendeu as Dores</h2>
          </div>
          <div className="space-y-4">
            {empresasQueVenceram.map((empresa, index) => (
              <div key={index} className="glass p-5 border-l-4 border-green-500/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg text-green-400">{empresa.nome}</h3>
                    <p className="text-[var(--gray)] text-sm mt-1">{empresa.motivo}</p>
                  </div>
                  <span className="text-green-400 text-xs bg-green-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {empresa.resultado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Você está no caminho certo */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="glass-strong p-8 sm:p-10 text-center border-2 border-[var(--gold)]">
            <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[var(--gold)]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl mb-4">
              Você Está no <span className="gold-text">Caminho Certo</span>
            </h2>
            <p className="text-[var(--gray)] text-lg mb-6 max-w-2xl mx-auto">
              O simples fato de você estar fazendo essa pesquisa já te coloca à frente de
              <span className="text-[var(--gold)] font-semibold"> 70% dos empreendedores</span> que fracassam
              por pular essa etapa.
            </p>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-sm text-[var(--gray)]">
                <strong className="text-[var(--gold)]">Lembre-se:</strong> Cada dor que você documenta na pesquisa
                é um potencial produto de milhões. Continue afiando o machado.
              </p>
            </div>
          </div>
        </section>

        {/* A Fórmula */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h2 className="font-display text-xl">A Fórmula do Milhão</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center py-6">
              <div className="glass p-4 rounded-xl">
                <Search className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
                <p className="text-sm font-semibold">Dor Real</p>
                <p className="text-xs text-[var(--gray)]">(sua pesquisa)</p>
              </div>
              <span className="text-2xl text-[var(--gold)]">+</span>
              <div className="glass p-4 rounded-xl">
                <Lightbulb className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
                <p className="text-sm font-semibold">Solução Certa</p>
                <p className="text-xs text-[var(--gray)]">(seu software)</p>
              </div>
              <span className="text-2xl text-[var(--gold)]">+</span>
              <div className="glass p-4 rounded-xl">
                <Users className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
                <p className="text-sm font-semibold">Pessoas Desesperadas</p>
                <p className="text-xs text-[var(--gray)]">(seus clientes)</p>
              </div>
              <span className="text-2xl text-[var(--gold)]">=</span>
              <div className="glass-strong p-4 rounded-xl border border-[var(--gold)]">
                <DollarSign className="w-8 h-8 text-[var(--gold)] mx-auto mb-2" />
                <p className="text-sm font-semibold gold-text">Negócio Milionário</p>
                <p className="text-xs text-[var(--gray)]">(seu futuro)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <p className="text-[var(--gray)] mb-6">
            Pronto para continuar afiando o machado?
          </p>
          <button
            onClick={() => router.push('/membro/pesquisa')}
            className="btn-primary inline-flex items-center gap-3"
          >
            Voltar à Pesquisa
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-12 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Construindo Negócios de Milhões
          </p>
        </footer>
      </div>
    </main>
  )
}
