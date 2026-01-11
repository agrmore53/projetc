'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Rocket,
  Target,
  DollarSign,
  Award,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Crown,
  Flame,
  Trophy,
  Gift,
  Clock,
  Briefcase,
  Globe,
  Sparkles
} from 'lucide-react'

export default function ZionPage() {
  const router = useRouter()
  const [aceito, setAceito] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
    }

    const zionAceito = localStorage.getItem('zion_aceito')
    if (zionAceito) {
      setAceito(true)
    }
  }, [router])

  const handleAceitar = () => {
    localStorage.setItem('zion_aceito', 'true')
    setAceito(true)
  }

  const beneficios = [
    {
      icon: Zap,
      titulo: 'Experiência Real',
      desc: 'Venda um produto já validado no mercado. Aprenda com situações reais, não simulações.'
    },
    {
      icon: Shield,
      titulo: 'Zero Risco',
      desc: 'Erre, aprenda e evolua vendendo produto de terceiros. Quando for o seu, você já será expert.'
    },
    {
      icon: DollarSign,
      titulo: 'Renda Extra',
      desc: 'Ganhe dinheiro enquanto aprende. Cada venda é lucro no seu bolso e experiência na bagagem.'
    },
    {
      icon: Target,
      titulo: 'Preparo Total',
      desc: 'Quando seu software estiver pronto, você já terá dominado a arte de vender.'
    }
  ]

  const etapas = [
    {
      numero: '01',
      titulo: 'Autorização',
      desc: 'Receba sua autorização temporária para comercializar o Império Sistemas'
    },
    {
      numero: '02',
      titulo: 'Treinamento',
      desc: 'Acesse materiais de vendas, scripts e técnicas de abordagem'
    },
    {
      numero: '03',
      titulo: 'Campo',
      desc: 'Aplique as técnicas em vendas físicas e digitais'
    },
    {
      numero: '04',
      titulo: 'Evolução',
      desc: 'Cada venda te prepara mais para o sucesso do seu próprio software'
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl gold-text">Projeto Zion</h1>
            <p className="text-[var(--gray)] text-sm">Sua jornada de elite começa aqui</p>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-12 animate-fadeInUp">
          <div className="glass-strong p-8 sm:p-12 text-center border-2 border-[var(--gold)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-24 h-24 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6 bg-[var(--gold)]/10">
                <Rocket className="w-12 h-12 text-[var(--gold)]" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[var(--gold)]" />
                <span className="text-[var(--gold)] text-sm uppercase tracking-widest">Programa Exclusivo</span>
                <Star className="w-5 h-5 text-[var(--gold)]" />
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">
                Projeto <span className="gold-text">ZION</span>
              </h2>

              <p className="text-xl sm:text-2xl text-[var(--gray)] mb-6 max-w-2xl mx-auto">
                Torne-se um <span className="text-[var(--gold)] font-semibold">vendedor de elite</span> antes mesmo de lançar seu software
              </p>

              <div className="inline-flex items-center gap-2 bg-[var(--gold)]/20 px-6 py-3 rounded-full">
                <Flame className="w-5 h-5 text-[var(--gold)]" />
                <span className="text-[var(--gold)] font-semibold">Experiência + Renda Extra + Preparo Total</span>
              </div>
            </div>
          </div>
        </section>

        {/* A Grande Verdade */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="glass p-6 sm:p-8 border-l-4 border-[var(--gold)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-[var(--gold)] rounded-full flex items-center justify-center shrink-0">
                <Crown className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl mb-4">A Grande Verdade</h3>
                <p className="text-[var(--gray)] text-lg mb-4">
                  Você pode ter o <span className="text-white font-semibold">melhor software do mundo</span>, mas se não souber vender, ele será apenas mais um código bonito que ninguém usa.
                </p>
                <p className="text-[var(--gray)] text-lg mb-4">
                  A diferença entre um software de <span className="text-[var(--gold)] font-semibold">milhões</span> e um software <span className="text-red-400">fracassado</span>?
                  <strong className="text-white"> Quem está vendendo.</strong>
                </p>
                <p className="text-[var(--gray)] text-lg">
                  O Projeto Zion existe para que você chegue no lançamento do seu software como um <span className="text-[var(--gold)] font-semibold">vendedor experiente</span>, não como um novato torcendo para dar certo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O Que É */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <h3 className="font-display text-xl">Como Funciona</h3>
          </div>

          <div className="glass p-6 sm:p-8">
            <p className="text-[var(--gray)] text-lg mb-6">
              Você receberá uma <span className="text-[var(--gold)] font-semibold">autorização temporária exclusiva</span> para comercializar o software <strong className="text-white">Império Sistemas</strong>, de propriedade da BsDeveloper.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-[var(--gold)]" />
                  <h4 className="font-semibold">Vendas em Campo</h4>
                </div>
                <p className="text-[var(--gray)] text-sm">
                  Visitas presenciais, reuniões, demonstrações ao vivo. Aprenda a ler o cliente, contornar objeções e fechar na hora.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-[var(--gold)]" />
                  <h4 className="font-semibold">Vendas Digitais</h4>
                </div>
                <p className="text-[var(--gray)] text-sm">
                  WhatsApp, redes sociais, videoconferências. Domine as técnicas de venda online que escalam.
                </p>
              </div>
            </div>

            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-5">
              <p className="text-center text-[var(--gray)]">
                <span className="text-[var(--gold)] font-semibold">Resultado:</span> Quando seu software estiver pronto, você já terá enfrentado dezenas de cenários reais de venda.
                <strong className="text-white"> A experiência muda tudo.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <h3 className="font-display text-xl">Por Que Participar</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="glass p-5 hover:border-[var(--gold)]/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--gold)]/20 rounded-xl flex items-center justify-center shrink-0">
                    <beneficio.icon className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg mb-2">{beneficio.titulo}</h4>
                    <p className="text-[var(--gray)] text-sm">{beneficio.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Remuneração */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <h3 className="font-display text-xl">Sua Remuneração</h3>
          </div>

          <div className="glass-strong p-6 sm:p-8 border-2 border-[var(--gold)]">
            <p className="text-center text-[var(--gray)] mb-8">
              Além de aprender, você <span className="text-[var(--gold)] font-semibold">ganha dinheiro</span> a cada venda fechada
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {/* Comissão por venda */}
              <div className="bg-white/5 rounded-2xl p-6 text-center border border-[var(--gold)]/30">
                <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <div className="font-display text-3xl sm:text-4xl gold-text mb-2">R$ 200</div>
                <p className="text-white font-semibold mb-1">Por Venda</p>
                <p className="text-[var(--gray)] text-sm">Receba na hora do fechamento</p>
              </div>

              {/* Recorrente */}
              <div className="bg-white/5 rounded-2xl p-6 text-center border border-[var(--gold)]/30">
                <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <div className="font-display text-3xl sm:text-4xl gold-text mb-2">10%</div>
                <p className="text-white font-semibold mb-1">Recorrente</p>
                <p className="text-[var(--gray)] text-sm">Da mensalidade por 6 meses*</p>
              </div>

              {/* Bônus */}
              <div className="bg-white/5 rounded-2xl p-6 text-center border border-[var(--gold)]/30">
                <div className="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-[var(--gold)]" />
                </div>
                <div className="font-display text-3xl sm:text-4xl gold-text mb-2">R$ 500</div>
                <p className="text-white font-semibold mb-1">Bônus</p>
                <p className="text-[var(--gray)] text-sm">A cada 5ª venda fechada</p>
              </div>
            </div>

            <div className="bg-[var(--gold)]/10 rounded-xl p-4 text-center">
              <p className="text-sm text-[var(--gray)]">
                <span className="text-[var(--gold)]">*</span> O recorrente de 10% é pago mensalmente enquanto o cliente indicado por você permanecer ativo, por até 6 meses.
              </p>
            </div>
          </div>
        </section>

        {/* Simulação */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
          <div className="glass p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-[var(--gold)]" />
              <h3 className="font-display text-xl">Simulação de Ganhos</h3>
            </div>

            <p className="text-[var(--gray)] mb-6">
              Imagine que você feche <span className="text-[var(--gold)] font-semibold">5 vendas</span> em um mês (mensalidade média de R$150):
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-[var(--gray)]">5 vendas × R$200</span>
                <span className="text-white font-semibold">R$ 1.000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-[var(--gray)]">Bônus 5ª venda</span>
                <span className="text-white font-semibold">R$ 500</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-[var(--gray)]">Recorrente mês 1 (5 × R$15)</span>
                <span className="text-white font-semibold">R$ 75</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-[var(--gold)]/10 rounded-lg px-4">
                <span className="text-[var(--gold)] font-semibold">Total no 1º mês</span>
                <span className="text-[var(--gold)] font-display text-2xl">R$ 1.575</span>
              </div>
            </div>

            <p className="text-[var(--gray)] text-sm text-center">
              E o recorrente continua entrando por mais 5 meses, mesmo sem novas vendas!
            </p>
          </div>
        </section>

        {/* Jornada */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <h3 className="font-display text-xl">Sua Jornada</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {etapas.map((etapa, index) => (
              <div key={index} className="glass p-5 text-center relative">
                <div className="font-display text-4xl text-[var(--gold)]/30 mb-2">{etapa.numero}</div>
                <h4 className="font-display text-lg mb-2 gold-text">{etapa.titulo}</h4>
                <p className="text-[var(--gray)] text-sm">{etapa.desc}</p>
                {index < etapas.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold)]/50" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Mensagem Final */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="glass p-6 sm:p-8 border-l-4 border-[var(--gold)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-[var(--gold)] rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl mb-4">Você Foi Escolhido</h3>
                <p className="text-[var(--gray)] text-lg mb-4">
                  O Projeto Zion não é para qualquer pessoa. É para quem entende que <span className="text-[var(--gold)] font-semibold">a preparação define o resultado</span>.
                </p>
                <p className="text-[var(--gray)] text-lg mb-4">
                  Enquanto outros vão lançar seus softwares sem nunca ter vendido nada, você terá <strong className="text-white">dezenas de vendas</strong> na bagagem, <strong className="text-white">objeções contornadas</strong> e <strong className="text-white">contratos fechados</strong>.
                </p>
                <p className="text-[var(--gray)] text-lg">
                  Essa é a diferença entre <span className="text-red-400">torcer para dar certo</span> e <span className="text-[var(--gold)] font-semibold">saber que vai dar certo</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <div className="glass-strong p-8 sm:p-10 text-center border-2 border-[var(--gold)]">
            {aceito ? (
              <>
                <div className="w-20 h-20 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl mb-4 gold-text">
                  Você Faz Parte do Projeto Zion!
                </h3>
                <p className="text-[var(--gray)] text-lg mb-6">
                  Em breve você receberá sua autorização e materiais de treinamento.
                  Prepare-se para uma jornada transformadora.
                </p>
                <div className="inline-flex items-center gap-2 bg-[var(--gold)]/20 px-6 py-3 rounded-full">
                  <Rocket className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-[var(--gold)] font-semibold">Sua jornada de elite começou</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl mb-4">
                  Pronto Para Entrar na <span className="gold-text">Elite</span>?
                </h3>
                <p className="text-[var(--gray)] text-lg mb-8 max-w-xl mx-auto">
                  Aceite participar do Projeto Zion e comece sua transformação de desenvolvedor para <span className="text-[var(--gold)] font-semibold">empreendedor de sucesso</span>.
                </p>
                <button
                  onClick={handleAceitar}
                  className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5"
                >
                  <Rocket className="w-6 h-6" />
                  Aceitar e Fazer Parte
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-[var(--gray)] text-sm mt-6">
                  Ao aceitar, você receberá instruções detalhadas por WhatsApp
                </p>
              </>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Projeto Zion &copy; 2026 - Mentoria Elite by BsDeveloper
          </p>
        </footer>
      </div>
    </main>
  )
}
