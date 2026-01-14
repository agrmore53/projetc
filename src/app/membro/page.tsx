'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  Monitor,
  GraduationCap,
  DollarSign,
  Calendar,
  Globe,
  MessageSquare,
  FileText,
  BarChart3,
  PlayCircle,
  LogOut,
  CheckCircle,
  Clock,
  Lightbulb,
  Target,
  Rocket,
  Video,
  BookOpen,
  Users,
  Mail,
  TrendingUp,
  Phone,
  Shield,
  Layout,
  User,
  Percent,
  HelpCircle,
  Presentation,
  BookMarked,
  MessageCircle,
  Film,
  Brain,
  Megaphone,
  Scale,
  BookText,
  PieChart,
  Type,
  Award,
  LayoutDashboard,
  Layers,
  ListOrdered,
  GitBranch,
  Crosshair,
  FileSpreadsheet,
  ClipboardCheck,
  Ship,
  Swords,
  Trophy,
  Heart,
  Gem,
  Search,
  Compass,
  Grid3X3,
  FileBarChart,
  Plane,
  ThumbsUp,
  Activity,
  ShieldAlert,
  ArrowUpRight,
  Briefcase,
  ClipboardList,
  UserPlus,
  Map,
  Sparkles
} from 'lucide-react'

export default function MembroPage() {
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cidade: '',
    profissao: '',
    horas: '',
    ideia: '',
    objetivo: ''
  })

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
    }

    const submitted = localStorage.getItem('member_data')
    if (submitted) {
      setFormSubmitted(true)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('membros')
        .insert([formData])

      if (error) {
        console.error('Erro:', error)
        alert('Erro ao enviar dados. Tente novamente.')
        setLoading(false)
        return
      }

      localStorage.setItem('member_data', JSON.stringify(formData))
      setFormSubmitted(true)
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro de conexão.')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('mentoria_logged')
    router.push('/')
  }

  const materiais = [
    { icon: Rocket, title: 'Projeto Zion', desc: 'Treinamento de vendas + renda extra', status: 'available', link: '/membro/zion', highlight: true },
    { icon: BookOpen, title: 'Academia do Vendedor', desc: 'Treinamento completo: produto, vendas e tráfego', status: 'available', link: '/membro/academia', highlight: true },
    { icon: Video, title: 'Conteúdo Exclusivo', desc: 'Vídeo especial para membros', status: 'available', link: '/membro/vsl' },
    { icon: Target, title: 'Quiz: Descubra Seu Nicho', desc: 'Qual área combina mais com você?', status: 'available', link: '/membro/quiz' },
    { icon: Lightbulb, title: 'A Importância da Pesquisa', desc: 'Por que isso define seu sucesso', status: 'available', link: '/membro/conteudo' },
    { icon: BarChart3, title: 'Pesquisa de Mercado', desc: 'Identificação de dores Brasil/EUA', status: 'available', link: '/membro/pesquisa' },
    { icon: FileText, title: 'Plano de Mentoria Completo', desc: 'Roadmap de 30 dias a 5 anos', status: 'available', link: '/membro/roadmap', highlight: true },
    { icon: FileText, title: 'Templates de Vendas', desc: '20+ scripts prontos para usar', status: 'available', link: '/membro/templates', highlight: true },
    { icon: BarChart3, title: 'Calculadora de Métricas SaaS', desc: 'MRR, Churn, CAC, LTV automático', status: 'available', link: '/membro/metricas', highlight: true },
    { icon: DollarSign, title: 'Simulador de Valuation', desc: 'Descubra quanto vale sua empresa', status: 'available', link: '/membro/valuation', highlight: true },
    { icon: Target, title: 'Gerador de Pitch Deck', desc: 'Crie apresentação para investidores', status: 'available', link: '/membro/pitch', highlight: true },
    { icon: DollarSign, title: 'Calculadora de Comissões', desc: 'Simule ganhos, metas e bônus', status: 'available', link: '/membro/comissoes', highlight: true },
    { icon: BarChart3, title: 'Simulador de Funil', desc: 'Quantos leads para bater a meta?', status: 'available', link: '/membro/funil', highlight: true },
    { icon: BookOpen, title: 'Biblioteca de Cases', desc: '8 histórias reais para suas vendas', status: 'available', link: '/membro/cases', highlight: true },
    { icon: DollarSign, title: 'Calculadora de ROI', desc: 'Mostre o retorno do investimento', status: 'available', link: '/membro/roi', highlight: true },
    { icon: FileText, title: 'Gerador de Propostas', desc: 'Propostas profissionais em segundos', status: 'available', link: '/membro/propostas', highlight: true },
    { icon: Target, title: 'Checklist do Fundador', desc: '50+ tarefas do zero ao milhão', status: 'available', link: '/membro/checklist', highlight: true },
    { icon: FileText, title: 'Gerador de Contratos', desc: 'Contratos SaaS, serviços e consultoria', status: 'available', link: '/membro/contratos', highlight: true },
    { icon: Target, title: 'Calculadora de Metas', desc: 'Planeje suas vendas diárias e semanais', status: 'available', link: '/membro/metas', highlight: true },
    { icon: BarChart3, title: 'Tracker de Atividades', desc: 'Registre ligações, visitas e vendas', status: 'available', link: '/membro/tracker', highlight: true },
    { icon: Users, title: 'CRM de Vendas', desc: 'Gerencie leads, status e histórico', status: 'available', link: '/membro/crm', highlight: true },
    { icon: Mail, title: 'E-mails de Follow-up', desc: 'Sequências prontas para cada etapa', status: 'available', link: '/membro/followup', highlight: true },
    { icon: DollarSign, title: 'Calculadora de Precificação', desc: 'Quanto cobrar pelo seu SaaS', status: 'available', link: '/membro/precificacao', highlight: true },
    { icon: TrendingUp, title: 'Simulador de Escala', desc: 'Projete crescimento em 36 meses', status: 'available', link: '/membro/escala', highlight: true },
    { icon: Phone, title: 'Scripts de Ligação', desc: 'Roteiros para cold call e fechamento', status: 'available', link: '/membro/scripts', highlight: true },
    { icon: Shield, title: 'Matriz de Objeções', desc: '24 objeções com respostas prontas', status: 'available', link: '/membro/objecoes', highlight: true },
    { icon: Clock, title: 'Calculadora CAC Payback', desc: 'Tempo para recuperar custo de aquisição', status: 'available', link: '/membro/cac-payback', highlight: true },
    { icon: Layout, title: 'Gerador de Landing Page', desc: 'Copy pronta para página de vendas', status: 'available', link: '/membro/landing', highlight: true },
    { icon: User, title: 'Gerador de Persona', desc: 'Crie o perfil do cliente ideal', status: 'available', link: '/membro/persona', highlight: true },
    { icon: Percent, title: 'Calculadora de Desconto', desc: 'Impacto real do desconto na margem', status: 'available', link: '/membro/desconto', highlight: true },
    { icon: HelpCircle, title: 'Biblioteca SPIN', desc: '55 perguntas para vendas consultivas', status: 'available', link: '/membro/spin', highlight: true },
    { icon: Presentation, title: 'Gerador de Apresentação', desc: '12 slides para sua apresentação comercial', status: 'available', link: '/membro/apresentacao', highlight: true },
    { icon: BookMarked, title: 'Gerador de E-book', desc: 'Estrutura completa de lead magnet', status: 'available', link: '/membro/ebook', highlight: true },
    { icon: MessageCircle, title: 'Simulador de Negociação', desc: 'Pratique cenários reais de vendas', status: 'available', link: '/membro/negociacao', highlight: true },
    { icon: Film, title: 'Gerador de Script VSL', desc: 'Roteiro de vídeo de vendas em 10 seções', status: 'available', link: '/membro/vsl-script', highlight: true },
    { icon: Brain, title: 'Biblioteca de Gatilhos', desc: '24 gatilhos mentais com exemplos', status: 'available', link: '/membro/gatilhos', highlight: true },
    { icon: Megaphone, title: 'Gerador de Anúncios', desc: 'Copy para Facebook, Google, Instagram', status: 'available', link: '/membro/anuncios', highlight: true },
    { icon: Scale, title: 'Calculadora Break-even', desc: 'Ponto de equilíbrio do seu negócio', status: 'available', link: '/membro/breakeven', highlight: true },
    { icon: BookText, title: 'Gerador de Playbook', desc: 'Documento completo do processo de vendas', status: 'available', link: '/membro/playbook', highlight: true },
    { icon: PieChart, title: 'Calculadora de Equity', desc: 'Divisão de cotas e vesting para founders', status: 'available', link: '/membro/equity', highlight: true },
    { icon: Type, title: 'Gerador de Headlines', desc: '50+ templates de headlines magnéticas', status: 'available', link: '/membro/headlines', highlight: true },
    { icon: Award, title: 'Certificado de Conclusão', desc: 'Gere seu certificado personalizado', status: 'available', link: '/membro/certificado', highlight: true },
    { icon: LayoutDashboard, title: 'Dashboard Pessoal', desc: 'Acompanhe seu progresso e metas', status: 'available', link: '/membro/dashboard', highlight: true },
    { icon: Layers, title: 'Business Canvas', desc: 'Planeje seu negócio em uma página', status: 'available', link: '/membro/canvas', highlight: true },
    { icon: ListOrdered, title: 'Sequência de E-mails', desc: 'Campanhas de e-mail automatizadas', status: 'available', link: '/membro/sequencia-emails', highlight: true },
    { icon: GitBranch, title: 'Simulador de Pipeline', desc: 'Visualize e preveja suas vendas', status: 'available', link: '/membro/pipeline', highlight: true },
    { icon: Crosshair, title: 'Biblioteca de Fechamentos', desc: '16 técnicas de fechamento comprovadas', status: 'available', link: '/membro/fechamentos', highlight: true },
    { icon: FileSpreadsheet, title: 'Gerador de Case Study', desc: 'Crie cases de sucesso profissionais', status: 'available', link: '/membro/case-study', highlight: true },
    { icon: ClipboardCheck, title: 'Checklist de Qualificação', desc: 'Qualifique leads com BANT ou MEDDIC', status: 'available', link: '/membro/qualificacao', highlight: true },
    { icon: Ship, title: 'Gerador de Onboarding', desc: 'Crie jornadas de onboarding para clientes', status: 'available', link: '/membro/onboarding', highlight: true },
    { icon: Swords, title: 'Battle Cards', desc: 'Comparativos competitivos para vendas', status: 'available', link: '/membro/battlecards', highlight: true },
    { icon: Monitor, title: 'Demo Script', desc: 'Roteiro estruturado para demonstracoes', status: 'available', link: '/membro/demo-script', highlight: true },
    { icon: Trophy, title: 'Calculadora Win Rate', desc: 'Analise taxa de conversao por etapa', status: 'available', link: '/membro/winrate', highlight: true },
    { icon: Heart, title: 'Biblioteca de Rapport', desc: '16 tecnicas de conexao e quebra-gelo', status: 'available', link: '/membro/rapport', highlight: true },
    { icon: Gem, title: 'Proposta de Valor', desc: 'Value Proposition Canvas para seu produto', status: 'available', link: '/membro/proposta-valor', highlight: true },
    { icon: Search, title: 'Checklist Discovery', desc: '25 perguntas para descobrir necessidades', status: 'available', link: '/membro/discovery', highlight: true },
    { icon: Target, title: 'Gerador de OKRs', desc: 'Defina objetivos e resultados-chave', status: 'available', link: '/membro/okrs', highlight: true },
    { icon: Compass, title: 'Simulador de Cenarios', desc: 'Projete pessimista, realista e otimista', status: 'available', link: '/membro/cenarios', highlight: true },
    { icon: Grid3X3, title: 'Matriz de Priorizacao', desc: 'ICE e RICE para priorizar iniciativas', status: 'available', link: '/membro/priorizacao', highlight: true },
    { icon: FileBarChart, title: 'Relatorio Mensal', desc: 'Reports para investidores e stakeholders', status: 'available', link: '/membro/relatorio', highlight: true },
    { icon: Plane, title: 'Calculadora de Runway', desc: 'Quanto tempo seu dinheiro vai durar?', status: 'available', link: '/membro/runway', highlight: true },
    { icon: FileText, title: 'Gerador de SOP', desc: 'Standard Operating Procedures', status: 'available', link: '/membro/sop', highlight: true },
    { icon: ThumbsUp, title: 'Calculadora de NPS', desc: 'Meca a satisfacao dos clientes', status: 'available', link: '/membro/nps', highlight: true },
    { icon: Activity, title: 'Health Score', desc: 'Identifique riscos na sua base', status: 'available', link: '/membro/health-score', highlight: true },
    { icon: ShieldAlert, title: 'Playbook Anti-Churn', desc: '12 estrategias para reter clientes', status: 'available', link: '/membro/anti-churn', highlight: true },
    { icon: ArrowUpRight, title: 'Expansion Revenue', desc: 'Cresca receita com clientes existentes', status: 'available', link: '/membro/expansion', highlight: true },
    { icon: Briefcase, title: 'Gerador de Vagas', desc: 'Job descriptions para sua startup', status: 'available', link: '/membro/job-description', highlight: true },
    { icon: ClipboardList, title: 'Scorecard Entrevista', desc: 'Avalie candidatos estruturadamente', status: 'available', link: '/membro/scorecard', highlight: true },
    { icon: UserPlus, title: 'Onboarding Funcionario', desc: 'Plano de integracao 30 dias', status: 'available', link: '/membro/onboarding-funcionario', highlight: true },
    { icon: Users, title: 'Template de 1:1', desc: 'Reunioes one-on-one estruturadas', status: 'available', link: '/membro/one-on-one', highlight: true },
    { icon: Map, title: 'Roadmap de Produto', desc: 'Planeje features por trimestre', status: 'available', link: '/membro/product-roadmap', highlight: true },
    { icon: Sparkles, title: 'User Stories', desc: 'Escreva historias no formato correto', status: 'available', link: '/membro/user-stories', highlight: true },
    { icon: Layers, title: 'Sprint Planner', desc: 'Planeje e acompanhe sprints', status: 'available', link: '/membro/sprint-planner', highlight: true },
    { icon: Megaphone, title: 'Release Notes', desc: 'Comunique lancamentos profissionalmente', status: 'available', link: '/membro/release-notes', highlight: true },
    { icon: Mail, title: 'Investor Update', desc: 'Email mensal para investidores', status: 'available', link: '/membro/investor-update', highlight: true },
    { icon: PieChart, title: 'Cap Table Manager', desc: 'Gerencie estrutura societaria', status: 'available', link: '/membro/cap-table', highlight: true },
  ]

  const inclusos = [
    { icon: Monitor, title: 'Construção do Software', desc: 'Seu software construído do zero ao produto funcionando' },
    { icon: GraduationCap, title: 'Módulo Equity & Valuation', desc: 'Aprenda a estruturar seu negócio para valer milhões' },
    { icon: DollarSign, title: 'Estratégias de Vendas', desc: 'Funil completo, precificação e canais de aquisição' },
    { icon: Calendar, title: 'Roadmap 30 dias a 5 anos', desc: 'Plano estratégico com metas claras até o milhão' },
    { icon: Globe, title: '100% Remoto', desc: 'Sessões online ao vivo de qualquer lugar' },
    { icon: MessageSquare, title: 'Suporte Direto', desc: 'Acesso direto ao mentor durante toda jornada' },
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-xl text-[var(--gold)]">M</span>
            </div>
            <div>
              <h1 className="font-display text-xl">
                <span className="gold-text">Mentoria Elite</span>
              </h1>
              <p className="text-[var(--gray)] text-sm">Área de Membros</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[var(--gray)] hover:text-[var(--gold)] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </header>

        {/* Welcome Section */}
        <section className="text-center mb-10 md:mb-16 animate-fadeInUp">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Bem-vindo à <span className="gold-text">Mentoria Elite</span>
          </h2>
          <p className="text-[var(--gray)] text-base md:text-lg px-4">
            Sua jornada do zero ao primeiro milhão começa agora.
          </p>
        </section>

        {/* Boas-vindas Card */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-lg text-[var(--gold)]">I</span>
            </div>
            <h3 className="font-display text-2xl">Boas-Vindas</h3>
          </div>
          <div className="glass card p-5 sm:p-8 md:p-10">
            <p className="text-[var(--gray)] text-base sm:text-lg mb-4">
              Parabéns por tomar a decisão de construir seu próprio negócio de software. A partir de agora, você faz parte de um grupo seleto de pessoas que decidiram <span className="text-[var(--gold)] font-semibold">sair da média</span>.
            </p>
            <p className="text-[var(--gray)] text-base sm:text-lg mb-4">
              Nos próximos meses, vamos juntos transformar sua ideia em um software lucrativo, com receita recorrente e potencial de escala.
            </p>
            <p className="text-[var(--gray)] text-base sm:text-lg">
              Seu comprometimento é o ingrediente mais importante dessa jornada. Estou aqui para guiar cada passo, mas a <span className="text-[var(--gold)] font-semibold">execução é sua</span>.
            </p>
          </div>
        </section>

        {/* O que está incluso */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-lg text-[var(--gold)]">II</span>
            </div>
            <h3 className="font-display text-2xl">O Que Está Incluso</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {inclusos.map((item, index) => (
              <div key={index} className="glass p-4 sm:p-6 flex items-start gap-3 sm:gap-4 hover:border-[var(--gold)]/40 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[var(--gold)] rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-base sm:text-lg mb-1">{item.title}</h4>
                  <p className="text-[var(--gray)] text-xs sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-lg text-[var(--gold)]">III</span>
            </div>
            <h3 className="font-display text-2xl">Seus Dados</h3>
          </div>
          <div className="glass card">
            {formSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
                <h4 className="font-display text-2xl mb-2 gold-text">Dados Enviados!</h4>
                <p className="text-[var(--gray)]">
                  Em breve entrarei em contato para agendarmos nossa primeira sessão.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">WhatsApp</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Cidade / Estado</label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      placeholder="Ex: Aracaju/SE"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Profissão Atual</label>
                    <input
                      type="text"
                      name="profissao"
                      value={formData.profissao}
                      onChange={handleChange}
                      placeholder="O que você faz hoje?"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Horas disponíveis por semana</label>
                    <select
                      name="horas"
                      value={formData.horas}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecione</option>
                      <option value="5-10">5 a 10 horas</option>
                      <option value="10-20">10 a 20 horas</option>
                      <option value="20-30">20 a 30 horas</option>
                      <option value="30+">Mais de 30 horas</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="input-label">Você já tem uma ideia de software?</label>
                    <textarea
                      name="ideia"
                      value={formData.ideia}
                      onChange={handleChange}
                      placeholder="Se sim, descreva brevemente. Se não, escreva 'Ainda não tenho ideia definida'."
                      className="input-field min-h-[120px] resize-y"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="input-label">Qual seu principal objetivo com a mentoria?</label>
                    <textarea
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleChange}
                      placeholder="O que você espera alcançar? Qual sua motivação?"
                      className="input-field min-h-[120px] resize-y"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-8"
                >
                  {loading ? 'Enviando...' : 'Enviar Dados'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Materials Section */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="font-display text-lg text-[var(--gold)]">IV</span>
            </div>
            <h3 className="font-display text-2xl">Materiais e Conteúdos</h3>
          </div>
          <div className="glass card">
            <p className="text-[var(--gray)] mb-6">
              Todos os materiais da mentoria estarão disponíveis nesta área:
            </p>
            <div className="space-y-4">
              {materiais.map((item, index) => {
                const content = (
                  <>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[var(--gold)] rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base sm:text-lg">{item.title}</h4>
                      <p className="text-[var(--gray)] text-xs sm:text-sm">{item.desc}</p>
                    </div>
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap ${
                      item.status === 'available'
                        ? 'bg-[var(--gold)]/20 text-[var(--gold)]'
                        : 'bg-white/10 text-[var(--gray)]'
                    }`}>
                      {item.status === 'available' ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Disponível
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Em breve
                        </span>
                      )}
                    </span>
                  </>
                )

                const className = `flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all hover:translate-x-1 ${
                  (item as typeof item & { highlight?: boolean }).highlight
                    ? 'bg-[var(--gold)]/10 border-2 border-[var(--gold)] hover:bg-[var(--gold)]/20'
                    : 'bg-white/5 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30'
                }`

                return item.link ? (
                  <a key={index} href={item.link} className={className}>
                    {content}
                  </a>
                ) : (
                  <div key={index} className={className}>
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="glass-strong card text-center border-2 border-[var(--gold)] p-6 sm:p-10">
            <h3 className="font-display text-xl sm:text-2xl mb-2">
              <span className="gold-text">Contato Direto com o Mentor</span>
            </h3>
            <p className="text-[var(--gray)] text-sm sm:text-base mb-4 sm:mb-6">
              Para dúvidas, agendamentos ou suporte, entre em contato:
            </p>
            <a href="https://wa.me/5548998649898" className="font-display text-2xl sm:text-3xl text-[var(--gold)] hover:opacity-80 transition-opacity">
              48 99864-9898
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Todos os direitos reservados
          </p>
        </footer>
      </div>
    </main>
  )
}
