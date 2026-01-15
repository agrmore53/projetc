'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  BarChart3,
  FileText,
  Target,
  Rocket,
  ChevronDown,
  Play,
  Award,
  Lock,
  CreditCard,
  ArrowRight,
  CheckCircle,
  XCircle,
  Calculator,
  PieChart,
  Mail,
  Phone,
  Briefcase,
  Scale,
  Heart
} from 'lucide-react'

export default function VendasPage() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null)
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('anual')

  const ferramentasDestaque = [
    { categoria: 'Vendas', quantidade: 45, icon: Target, cor: 'text-green-400' },
    { categoria: 'Financeiro', quantidade: 25, icon: DollarSign, cor: 'text-yellow-400' },
    { categoria: 'Marketing', quantidade: 20, icon: TrendingUp, cor: 'text-blue-400' },
    { categoria: 'Produto', quantidade: 15, icon: Rocket, cor: 'text-purple-400' },
    { categoria: 'RH & Operacoes', quantidade: 15, icon: Users, cor: 'text-orange-400' },
    { categoria: 'Legal', quantidade: 10, icon: Shield, cor: 'text-red-400' },
  ]

  const ferramentasLista = [
    'Calculadora de Metricas SaaS (MRR, Churn, CAC, LTV)',
    'Simulador de Valuation',
    'Gerador de Pitch Deck para Investidores',
    'CRM de Vendas Completo',
    '20+ Templates de Scripts de Vendas',
    'Calculadora de Comissoes e Metas',
    'Simulador de Funil de Vendas',
    'Biblioteca com 24 Objecoes e Respostas',
    'Gerador de Propostas Comerciais',
    'Gerador de Contratos (SaaS, Servicos, NDA)',
    'Calculadora de ROI',
    'Gerador de Landing Pages',
    'Gerador de Anuncios (Facebook, Google, Instagram)',
    'Biblioteca de 24 Gatilhos Mentais',
    'Gerador de E-books e Lead Magnets',
    'Calculadora de Precificacao',
    'Simulador de Escala (36 meses)',
    'Business Model Canvas',
    'Gerador de OKRs',
    'Dashboard de Acompanhamento',
    'Calculadora de Break-even',
    'Gerador de Playbook de Vendas',
    'Matriz de Priorizacao (ICE/RICE)',
    'Templates de E-mail Follow-up',
    'Gerador de Persona (ICP)',
    'Health Score de Clientes',
    'Calculadora de NPS e CES',
    'Playbook Anti-Churn',
    'Gerador de Case Studies',
    'Calculadora de Equity e Cap Table',
    'DRE - Demonstrativo de Resultados',
    'Projecao de Fluxo de Caixa',
    'Calculadora de Markup',
    'Folha de Pagamento CLT',
    'Gerador de PRD (Product Requirements)',
    'Template de Postmortem',
    'Feedback 360 Graus',
    'Avaliacao de Desempenho',
    'E mais 90+ ferramentas...',
  ]

  const depoimentos = [
    {
      nome: 'Ricardo Mendes',
      cargo: 'Founder, TechFlow SaaS',
      foto: 'RM',
      texto: 'Economizei mais de R$ 3.000/mes cancelando assinaturas de outros softwares. Tudo que preciso esta aqui.',
      estrelas: 5
    },
    {
      nome: 'Amanda Silva',
      cargo: 'Head de Vendas, StartupX',
      foto: 'AS',
      texto: 'Meu time de vendas dobrou a conversao usando os scripts e templates. Ferramenta indispensavel.',
      estrelas: 5
    },
    {
      nome: 'Carlos Eduardo',
      cargo: 'CEO, Consultoria Digital',
      foto: 'CE',
      texto: 'Uso para criar propostas, contratos e apresentacoes. Profissionalizou minha operacao inteira.',
      estrelas: 5
    },
    {
      nome: 'Juliana Costa',
      cargo: 'Gestora Comercial',
      foto: 'JC',
      texto: 'O CRM e os trackers salvaram minha gestao. Consigo acompanhar tudo em um lugar so.',
      estrelas: 5
    },
  ]

  const comparativo = [
    { item: 'CRM de Vendas', concorrente: 'R$ 197/mes', nosso: true },
    { item: 'Gerador de Propostas', concorrente: 'R$ 97/mes', nosso: true },
    { item: 'Calculadoras Financeiras', concorrente: 'R$ 147/mes', nosso: true },
    { item: 'Templates de Contratos', concorrente: 'R$ 297/mes', nosso: true },
    { item: 'Gerador de Landing Pages', concorrente: 'R$ 197/mes', nosso: true },
    { item: 'Dashboard de Metricas', concorrente: 'R$ 247/mes', nosso: true },
    { item: 'Biblioteca de Scripts', concorrente: 'R$ 97/mes', nosso: true },
    { item: 'Gerador de Pitch Deck', concorrente: 'R$ 147/mes', nosso: true },
  ]

  const faqs = [
    {
      pergunta: 'Como funciona o acesso?',
      resposta: 'Apos a compra, voce recebe acesso imediato a area de membros com todas as 130 ferramentas. O acesso e online, funciona em qualquer dispositivo, e voce pode usar quantas vezes quiser.'
    },
    {
      pergunta: 'Preciso instalar algum software?',
      resposta: 'Nao! Tudo funciona direto no navegador. Basta fazer login e comecar a usar. Funciona em computador, tablet e celular.'
    },
    {
      pergunta: 'As ferramentas sao atualizadas?',
      resposta: 'Sim! Adicionamos novas ferramentas regularmente e todas as atualizacoes estao inclusas no seu plano. Voce sempre tera acesso as versoes mais recentes.'
    },
    {
      pergunta: 'Posso cancelar quando quiser?',
      resposta: 'Sim, voce pode cancelar a qualquer momento direto na sua area de membros. Sem burocracia, sem multa, sem perguntas.'
    },
    {
      pergunta: 'Tem garantia?',
      resposta: 'Sim! Oferecemos 7 dias de garantia incondicional. Se nao gostar, devolvemos 100% do seu dinheiro sem perguntas.'
    },
    {
      pergunta: 'Serve para qualquer tipo de negocio?',
      resposta: 'Sim! As ferramentas foram criadas para empreendedores, vendedores, gestores e qualquer pessoa que queira profissionalizar seu negocio. Funciona para SaaS, servicos, consultorias, agencias e mais.'
    },
    {
      pergunta: 'Consigo exportar os dados?',
      resposta: 'Sim! Todas as ferramentas tem botao de copiar que formata o conteudo para voce colar em documentos, emails, apresentacoes ou onde preferir.'
    },
    {
      pergunta: 'Tem suporte?',
      resposta: 'Sim! Oferecemos suporte por email e WhatsApp para tirar duvidas e ajudar voce a aproveitar ao maximo as ferramentas.'
    },
  ]

  const precoMensal = 97
  const precoAnual = 697
  const economiaAnual = (precoMensal * 12) - precoAnual

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-lg text-[var(--gold)]">M</span>
            </div>
            <span className="font-display text-xl">
              <span className="text-[var(--gold)]">Mentoria</span> Elite
            </span>
          </div>
          <a href="#preco" className="btn-primary text-sm px-6 py-2">
            Quero Acesso
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold)]/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-sm text-[var(--gold)]">+130 Ferramentas em Uma So Plataforma</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Todas as Ferramentas que Seu
            <span className="block text-[var(--gold)]">Negocio Precisa</span>
          </h1>

          <p className="text-xl md:text-2xl text-[var(--gray)] mb-8 max-w-3xl mx-auto">
            Pare de pagar R$ 2.000+/mes em dezenas de softwares diferentes.
            Tenha CRM, calculadoras, geradores e templates <span className="text-white">em um unico lugar</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#preco" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Comecar Agora <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#ferramentas" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
              <Play className="w-5 h-5" /> Ver Ferramentas
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--gray)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>7 Dias de Garantia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Cancele Quando Quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social Proof Bar */}
      <section className="py-10 border-y border-white/10 bg-white/5">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-[var(--gray)] mb-6">Usado por empreendedores e equipes de vendas em todo Brasil</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="font-display text-3xl text-[var(--gold)]">130+</p>
              <p className="text-sm text-[var(--gray)]">Ferramentas</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-[var(--gold)]">500+</p>
              <p className="text-sm text-[var(--gray)]">Usuarios Ativos</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-[var(--gold)]">4.9</p>
              <p className="text-sm text-[var(--gray)]">Avaliacao Media</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-[var(--gold)]">R$ 2.000+</p>
              <p className="text-sm text-[var(--gray)]">Economia/Mes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema / Dor */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Voce Esta <span className="text-red-400">Perdendo Dinheiro</span> Todo Mes
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Veja quanto voce paga hoje em softwares separados:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {comparativo.map((item, index) => (
              <div key={index} className="glass p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span>{item.item}</span>
                </div>
                <span className="text-red-400 font-semibold">{item.concorrente}</span>
              </div>
            ))}
          </div>

          <div className="glass card text-center border-2 border-red-500/30 bg-red-500/5">
            <p className="text-lg mb-2">Total que voce paga hoje:</p>
            <p className="font-display text-4xl text-red-400 mb-2">R$ 1.426/mes</p>
            <p className="text-[var(--gray)]">= R$ 17.112 por ano jogados fora</p>
          </div>
        </div>
      </section>

      {/* Solucao */}
      <section className="py-20 px-5 bg-gradient-to-b from-[var(--gold)]/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Com a Mentoria Elite Voce Tem <span className="text-[var(--gold)]">Tudo Isso</span>
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Por uma fracao do preco, com acesso a TODAS as ferramentas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {comparativo.map((item, index) => (
              <div key={index} className="glass p-5 flex items-center justify-between border border-green-500/30 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{item.item}</span>
                </div>
                <span className="text-green-400 font-semibold">Incluso</span>
              </div>
            ))}
          </div>

          <div className="glass card text-center border-2 border-green-500/30 bg-green-500/5">
            <p className="text-lg mb-2">Tudo isso por apenas:</p>
            <p className="font-display text-4xl text-green-400 mb-2">R$ 97/mes</p>
            <p className="text-[var(--gray)]">Economize R$ 1.329/mes = R$ 15.948/ano</p>
          </div>
        </div>
      </section>

      {/* Categorias de Ferramentas */}
      <section id="ferramentas" className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              <span className="text-[var(--gold)]">130 Ferramentas</span> em 6 Categorias
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Tudo que voce precisa para gerir e escalar seu negocio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ferramentasDestaque.map((cat, index) => (
              <div key={index} className="glass card text-center hover:border-[var(--gold)]/50 transition-all">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center ${cat.cor}`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl mb-2">{cat.categoria}</h3>
                <p className={`font-display text-3xl ${cat.cor}`}>{cat.quantidade}+</p>
                <p className="text-sm text-[var(--gray)]">ferramentas</p>
              </div>
            ))}
          </div>

          <div className="glass card">
            <h3 className="font-display text-xl mb-6 text-center">Algumas das Ferramentas Inclusas:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {ferramentasLista.map((ferramenta, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                  <Check className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span className="text-sm">{ferramenta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-5 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              O Que Nossos <span className="text-[var(--gold)]">Clientes Dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {depoimentos.map((dep, index) => (
              <div key={index} className="glass card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(dep.estrelas)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[var(--gold)] fill-[var(--gold)]" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{dep.texto}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)] flex items-center justify-center text-black font-bold">
                    {dep.foto}
                  </div>
                  <div>
                    <p className="font-semibold">{dep.nome}</p>
                    <p className="text-sm text-[var(--gray)]">{dep.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preco" className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Escolha Seu <span className="text-[var(--gold)]">Plano</span>
            </h2>
            <p className="text-xl text-[var(--gray)] mb-8">
              Acesso completo a todas as 130 ferramentas
            </p>

            {/* Toggle Mensal/Anual */}
            <div className="inline-flex items-center gap-4 bg-white/10 rounded-full p-1">
              <button
                onClick={() => setPlanoSelecionado('mensal')}
                className={`px-6 py-2 rounded-full transition-all ${
                  planoSelecionado === 'mensal'
                    ? 'bg-[var(--gold)] text-black'
                    : 'text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setPlanoSelecionado('anual')}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                  planoSelecionado === 'anual'
                    ? 'bg-[var(--gold)] text-black'
                    : 'text-white'
                }`}
              >
                Anual <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-40%</span>
              </button>
            </div>
          </div>

          <div className="glass card border-2 border-[var(--gold)] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[var(--gold)] text-black text-sm font-bold px-4 py-1">
              MAIS POPULAR
            </div>

            <div className="text-center pt-8 pb-6 border-b border-white/10">
              <h3 className="font-display text-2xl mb-4">Acesso Completo</h3>

              {planoSelecionado === 'anual' ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl text-[var(--gray)] line-through">R$ {precoMensal * 12}</span>
                    <span className="bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded">
                      Economize R$ {economiaAnual}
                    </span>
                  </div>
                  <p className="font-display text-5xl text-[var(--gold)] mb-2">
                    R$ {precoAnual}
                  </p>
                  <p className="text-[var(--gray)]">pagamento unico anual (R$ {(precoAnual / 12).toFixed(0)}/mes)</p>
                </>
              ) : (
                <>
                  <p className="font-display text-5xl text-[var(--gold)] mb-2">
                    R$ {precoMensal}
                  </p>
                  <p className="text-[var(--gray)]">por mes</p>
                </>
              )}
            </div>

            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {[
                  'Acesso a todas as 130 ferramentas',
                  'Novas ferramentas adicionadas regularmente',
                  'Atualizacoes gratuitas inclusas',
                  'Suporte por email e WhatsApp',
                  'Funciona em qualquer dispositivo',
                  'Exporte dados para qualquer lugar',
                  'Cancele quando quiser',
                  '7 dias de garantia incondicional',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/"
                className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Quero Meu Acesso Agora
              </a>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[var(--gray)]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Pix ou Cartao</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Compra Segura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-12 glass card text-center border border-green-500/30 bg-green-500/5">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="font-display text-2xl mb-2">Garantia de 7 Dias</h3>
            <p className="text-[var(--gray)] max-w-lg mx-auto">
              Se voce nao ficar satisfeito por qualquer motivo, basta enviar um email em ate 7 dias
              e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Perguntas <span className="text-[var(--gold)]">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass overflow-hidden">
                <button
                  onClick={() => setFaqAberto(faqAberto === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold pr-4">{faq.pergunta}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${
                    faqAberto === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {faqAberto === index && (
                  <div className="px-5 pb-5 text-[var(--gray)]">
                    {faq.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="glass card text-center border-2 border-[var(--gold)] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-transparent" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Pronto Para <span className="text-[var(--gold)]">Transformar</span> Seu Negocio?
              </h2>
              <p className="text-xl text-[var(--gray)] mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de empreendedores que ja estao usando as 130 ferramentas
                para crescer seus negocios.
              </p>

              <a href="#preco" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
                Comecar Agora <ArrowRight className="w-5 h-5" />
              </a>

              <p className="mt-6 text-sm text-[var(--gray)]">
                Acesso imediato • 7 dias de garantia • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
                <span className="font-display text-lg text-[var(--gold)]">M</span>
              </div>
              <span className="font-display text-xl">
                <span className="text-[var(--gold)]">Mentoria</span> Elite
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--gray)]">
              <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <a href="mailto:contato@mentoriaelite.com" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-[var(--gray)]">
            <p>© 2026 Mentoria Elite. Todos os direitos reservados.</p>
            <p className="mt-2">CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
