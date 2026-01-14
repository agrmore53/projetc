'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Target,
  Rocket,
  TrendingUp,
  DollarSign,
  Users,
  Globe,
  Award,
  CheckCircle2,
  Circle,
  Calendar,
  Zap,
  Crown,
  Star,
  ArrowRight,
  Clock,
  Flag,
  Milestone
} from 'lucide-react'

interface Meta {
  titulo: string
  descricao: string
  kpi: string
  concluida?: boolean
}

interface Fase {
  id: string
  periodo: string
  titulo: string
  subtitulo: string
  cor: string
  icone: 'rocket' | 'target' | 'trending' | 'dollar' | 'users' | 'crown'
  mrr: string
  foco: string
  metas: Meta[]
  acoes: string[]
  mentalidade: string
}

const fases: Fase[] = [
  {
    id: 'fase1',
    periodo: '0 - 30 DIAS',
    titulo: 'Fundação',
    subtitulo: 'Validação e Primeiros Passos',
    cor: '#4CAF50',
    icone: 'rocket',
    mrr: 'R$ 0',
    foco: 'Validar a ideia antes de construir',
    metas: [
      { titulo: 'Definir nicho específico', descricao: 'Escolher um mercado com dor clara e disposição para pagar', kpi: '1 nicho definido' },
      { titulo: 'Pesquisa de mercado', descricao: 'Entrevistar 20-30 potenciais clientes sobre suas dores', kpi: '30 entrevistas' },
      { titulo: 'Análise de concorrentes', descricao: 'Mapear 5-10 concorrentes, seus preços e diferenciais', kpi: '10 concorrentes mapeados' },
      { titulo: 'Definir MVP', descricao: 'Listar as 3-5 funcionalidades essenciais para resolver a dor principal', kpi: 'MVP definido' },
      { titulo: 'Pré-vendas', descricao: 'Conseguir 3-5 clientes comprometidos antes de construir', kpi: '5 pré-vendas' },
    ],
    acoes: [
      'Fazer o Quiz de Nicho da plataforma',
      'Usar os Templates de Validação',
      'Ligar/visitar potenciais clientes',
      'Criar landing page simples (Carrd, Notion)',
      'Coletar e-mails de interessados',
      'Participar de grupos do nicho (Facebook, WhatsApp)',
    ],
    mentalidade: 'Não escreva uma linha de código antes de ter certeza que alguém vai pagar. A validação é mais importante que o produto.'
  },
  {
    id: 'fase2',
    periodo: '30 - 90 DIAS',
    titulo: 'Construção',
    subtitulo: 'MVP e Primeiros Clientes',
    cor: '#2196F3',
    icone: 'target',
    mrr: 'R$ 1.000 - 3.000',
    foco: 'Construir rápido e colocar na mão de clientes reais',
    metas: [
      { titulo: 'MVP funcionando', descricao: 'Software com as funcionalidades essenciais rodando', kpi: 'MVP no ar' },
      { titulo: 'Primeiros 10 clientes', descricao: 'Clientes pagantes usando o sistema diariamente', kpi: '10 clientes' },
      { titulo: 'Feedback loop', descricao: 'Sistema de coleta de feedback implementado', kpi: 'NPS > 7' },
      { titulo: 'Processo de onboarding', descricao: 'Cliente consegue começar a usar sozinho', kpi: 'Onboarding < 30min' },
      { titulo: 'Suporte estruturado', descricao: 'Canal de suporte definido e funcionando', kpi: 'Resposta < 2h' },
    ],
    acoes: [
      'Desenvolver MVP com foco em resolver a dor #1',
      'Entregar para os clientes de pré-venda',
      'Fazer calls semanais com cada cliente',
      'Iterar baseado no feedback real',
      'Criar documentação básica (FAQ, tutoriais)',
      'Definir preço inicial (começar baixo, subir depois)',
    ],
    mentalidade: 'Feito é melhor que perfeito. Lance rápido, mesmo com vergonha. Seus primeiros clientes são parceiros, não críticos.'
  },
  {
    id: 'fase3',
    periodo: '90 DIAS - 6 MESES',
    titulo: 'Tração',
    subtitulo: 'Product-Market Fit',
    cor: '#FF9800',
    icone: 'trending',
    mrr: 'R$ 5.000 - 15.000',
    foco: 'Encontrar o encaixe produto-mercado e começar a escalar vendas',
    metas: [
      { titulo: '50 clientes ativos', descricao: 'Base sólida de clientes usando e pagando mensalmente', kpi: '50 clientes' },
      { titulo: 'Churn < 5%', descricao: 'Clientes ficando e renovando mês a mês', kpi: 'Churn < 5%' },
      { titulo: 'Canal de aquisição definido', descricao: 'Descobrir de onde vêm os melhores clientes', kpi: '1 canal validado' },
      { titulo: 'Processo de vendas', descricao: 'Funil de vendas documentado e replicável', kpi: 'Conversão > 10%' },
      { titulo: 'Indicações funcionando', descricao: 'Clientes indicando naturalmente', kpi: '20% por indicação' },
    ],
    acoes: [
      'Implementar métricas (MRR, Churn, CAC, LTV)',
      'Testar 2-3 canais de aquisição',
      'Criar programa de indicação',
      'Desenvolver cases de sucesso',
      'Começar produção de conteúdo',
      'Contratar primeiro suporte (se necessário)',
    ],
    mentalidade: 'Você tem Product-Market Fit quando os clientes vendem para você. Se precisa convencer demais, ainda não chegou lá.'
  },
  {
    id: 'fase4',
    periodo: '6 MESES - 1 ANO',
    titulo: 'Escala Inicial',
    subtitulo: 'Sistematização e Time',
    cor: '#9C27B0',
    icone: 'users',
    mrr: 'R$ 20.000 - 50.000',
    foco: 'Tirar você das operações e criar sistemas',
    metas: [
      { titulo: '150-200 clientes', descricao: 'Base crescendo consistentemente mês a mês', kpi: '200 clientes' },
      { titulo: 'Time inicial', descricao: 'Pelo menos 1-2 pessoas além de você', kpi: '2 funcionários' },
      { titulo: 'Processos documentados', descricao: 'Qualquer pessoa consegue executar as tarefas', kpi: 'SOPs criados' },
      { titulo: 'Marketing rodando', descricao: 'Tráfego pago e/ou orgânico gerando leads consistentes', kpi: '100 leads/mês' },
      { titulo: 'Produto estável', descricao: 'Poucas reclamações de bugs, sistema confiável', kpi: 'Uptime 99.5%' },
    ],
    acoes: [
      'Contratar suporte/CS dedicado',
      'Documentar todos os processos (Notion, Loom)',
      'Escalar canal de aquisição que funciona',
      'Implementar automações (e-mail, onboarding)',
      'Criar área de cliente self-service',
      'Definir OKRs trimestrais',
    ],
    mentalidade: 'Seu trabalho muda de "fazer" para "garantir que seja feito". Se você é o gargalo, a empresa não escala.'
  },
  {
    id: 'fase5',
    periodo: '1 - 2 ANOS',
    titulo: 'Crescimento',
    subtitulo: 'Aceleração e Novos Mercados',
    cor: '#E91E63',
    icone: 'dollar',
    mrr: 'R$ 80.000 - 150.000',
    foco: 'Acelerar crescimento e expandir ofertas',
    metas: [
      { titulo: '500+ clientes', descricao: 'Base robusta com crescimento previsível', kpi: '500 clientes' },
      { titulo: 'Time de 5-10 pessoas', descricao: 'Áreas de produto, vendas, suporte estruturadas', kpi: '10 funcionários' },
      { titulo: 'Múltiplos planos', descricao: 'Upsell funcionando (básico, pro, enterprise)', kpi: 'ARPU +30%' },
      { titulo: 'Expansão geográfica', descricao: 'Atendendo múltiplas regiões/estados', kpi: '5 estados' },
      { titulo: 'Marca reconhecida', descricao: 'Referência no nicho, convites para palestras', kpi: 'Top 5 do nicho' },
    ],
    acoes: [
      'Estruturar time de vendas (SDR, Closer)',
      'Criar planos enterprise/personalizado',
      'Investir em branding e autoridade',
      'Desenvolver parcerias estratégicas',
      'Considerar integrações/API',
      'Avaliar expansão de produto (novos módulos)',
    ],
    mentalidade: 'Empresas de R$100k MRR são vendidas por R$3-5 milhões. Você está construindo um ativo valioso.'
  },
  {
    id: 'fase6',
    periodo: '2 - 5 ANOS',
    titulo: 'Milhão',
    subtitulo: 'Liderança de Mercado',
    cor: '#D4AF37',
    icone: 'crown',
    mrr: 'R$ 200.000 - 500.000+',
    foco: 'Consolidar liderança e preparar para exit ou crescimento contínuo',
    metas: [
      { titulo: '2.000+ clientes', descricao: 'Empresa consolidada no mercado', kpi: '2000 clientes' },
      { titulo: 'Time 20-50 pessoas', descricao: 'Organização com C-level estruturado', kpi: '30 funcionários' },
      { titulo: 'R$1M+ ARR', descricao: 'Receita anual recorrente de 7 dígitos', kpi: 'R$1M ARR' },
      { titulo: 'Valuation 8-10x ARR', descricao: 'Empresa valendo R$8-10 milhões', kpi: 'R$10M valuation' },
      { titulo: 'Opções de exit', descricao: 'Propostas de aquisição ou crescer mais', kpi: 'Exit opcional' },
    ],
    acoes: [
      'Profissionalizar gestão (CFO, COO)',
      'Implementar governança corporativa',
      'Avaliar rodada de investimento (se fizer sentido)',
      'Considerar aquisições de concorrentes menores',
      'Expandir internacionalmente (LATAM, US)',
      'Preparar para exit ou IPO',
    ],
    mentalidade: 'Você construiu algo que vale milhões e transforma vidas. A pergunta agora é: vender, continuar ou voar mais alto?'
  }
]

export default function RoadmapPage() {
  const router = useRouter()
  const [faseAtiva, setFaseAtiva] = useState<string>('fase1')
  const [metasConcluidas, setMetasConcluidas] = useState<string[]>([])

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('roadmap_progresso')
    if (saved) {
      setMetasConcluidas(JSON.parse(saved))
    }
  }, [router])

  const toggleMeta = (faseId: string, metaIndex: number) => {
    const metaId = `${faseId}-${metaIndex}`
    const novas = metasConcluidas.includes(metaId)
      ? metasConcluidas.filter(m => m !== metaId)
      : [...metasConcluidas, metaId]

    setMetasConcluidas(novas)
    localStorage.setItem('roadmap_progresso', JSON.stringify(novas))
  }

  const getIcone = (tipo: string) => {
    switch(tipo) {
      case 'rocket': return <Rocket className="w-6 h-6" />
      case 'target': return <Target className="w-6 h-6" />
      case 'trending': return <TrendingUp className="w-6 h-6" />
      case 'dollar': return <DollarSign className="w-6 h-6" />
      case 'users': return <Users className="w-6 h-6" />
      case 'crown': return <Crown className="w-6 h-6" />
      default: return <Flag className="w-6 h-6" />
    }
  }

  const calcularProgressoFase = (fase: Fase) => {
    const metasDaFase = fase.metas.length
    const concluidas = fase.metas.filter((_, idx) =>
      metasConcluidas.includes(`${fase.id}-${idx}`)
    ).length
    return Math.round((concluidas / metasDaFase) * 100)
  }

  const faseAtual = fases.find(f => f.id === faseAtiva)

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Roadmap: Do Zero ao Milhão</h1>
            <p className="text-[var(--gray)] text-sm">Seu plano estratégico de 30 dias a 5 anos</p>
          </div>
        </header>

        {/* Intro */}
        <section className="glass p-6 sm:p-8 mb-8 border-l-4 border-[var(--gold)]">
          <p className="text-[var(--gray)] text-lg leading-relaxed">
            Este é o seu <span className="text-[var(--gold)] font-semibold">mapa completo</span> para construir um negócio de software de <span className="text-white font-semibold">7 dígitos</span>.
            Cada fase tem metas claras, ações específicas e a mentalidade necessária para avançar.
          </p>
          <p className="text-[var(--gray)] mt-4">
            <span className="text-white font-semibold">Importante:</span> Este não é um cronograma rígido. Algumas pessoas avançam mais rápido, outras mais devagar.
            O importante é <span className="text-[var(--gold)]">não pular etapas</span>.
          </p>
        </section>

        {/* Timeline Visual */}
        <section className="mb-8 overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-max">
            {fases.map((fase, index) => (
              <button
                key={fase.id}
                onClick={() => setFaseAtiva(fase.id)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all min-w-[140px] ${
                  faseAtiva === fase.id
                    ? 'bg-white/10 border-2'
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
                style={{ borderColor: faseAtiva === fase.id ? fase.cor : undefined }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${fase.cor}20`, color: fase.cor }}
                >
                  {getIcone(fase.icone)}
                </div>
                <span className="text-white text-sm font-semibold">{fase.titulo}</span>
                <span className="text-[var(--gray)] text-xs">{fase.periodo}</span>
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${calcularProgressoFase(fase)}%`, backgroundColor: fase.cor }}
                  />
                </div>
                <span className="text-xs mt-1" style={{ color: fase.cor }}>
                  {calcularProgressoFase(fase)}%
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Fase Atual Detalhada */}
        {faseAtual && (
          <section className="space-y-6">
            {/* Header da Fase */}
            <div
              className="glass p-6 sm:p-8 border-l-4"
              style={{ borderColor: faseAtual.cor }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${faseAtual.cor}20`, color: faseAtual.cor }}
                >
                  {getIcone(faseAtual.icone)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: faseAtual.cor }}>{faseAtual.periodo}</p>
                  <h2 className="font-display text-2xl sm:text-3xl text-white">{faseAtual.titulo}</h2>
                  <p className="text-[var(--gray)]">{faseAtual.subtitulo}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--gray)] text-sm">MRR Esperado</p>
                  <p className="font-display text-2xl" style={{ color: faseAtual.cor }}>{faseAtual.mrr}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5" style={{ color: faseAtual.cor }} />
                  <span className="text-white font-semibold">Foco Principal</span>
                </div>
                <p className="text-[var(--gray)]">{faseAtual.foco}</p>
              </div>
            </div>

            {/* Metas */}
            <div className="glass p-6 sm:p-8">
              <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                <Flag className="w-5 h-5" style={{ color: faseAtual.cor }} />
                Metas desta Fase
              </h3>
              <div className="space-y-4">
                {faseAtual.metas.map((meta, index) => {
                  const metaId = `${faseAtual.id}-${index}`
                  const concluida = metasConcluidas.includes(metaId)

                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                        concluida ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5 border border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => toggleMeta(faseAtual.id, index)}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {concluida ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-[var(--gray)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${concluida ? 'text-green-400' : 'text-white'}`}>
                          {meta.titulo}
                        </h4>
                        <p className="text-[var(--gray)] text-sm mt-1">{meta.descricao}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: concluida ? 'rgba(34, 197, 94, 0.2)' : `${faseAtual.cor}20`,
                          color: concluida ? '#22c55e' : faseAtual.cor
                        }}
                      >
                        {meta.kpi}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Ações */}
            <div className="glass p-6 sm:p-8">
              <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: faseAtual.cor }} />
                Ações Práticas
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {faseAtual.acoes.map((acao, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: faseAtual.cor }} />
                    <span className="text-[var(--gray)] text-sm">{acao}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentalidade */}
            <div
              className="glass p-6 sm:p-8 border-2"
              style={{ borderColor: `${faseAtual.cor}50`, backgroundColor: `${faseAtual.cor}10` }}
            >
              <h3 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" style={{ color: faseAtual.cor }} />
                Mentalidade
              </h3>
              <p className="text-lg" style={{ color: faseAtual.cor }}>
                "{faseAtual.mentalidade}"
              </p>
            </div>

            {/* Navegação */}
            <div className="flex justify-between items-center pt-4">
              {faseAtiva !== 'fase1' && (
                <button
                  onClick={() => {
                    const currentIndex = fases.findIndex(f => f.id === faseAtiva)
                    if (currentIndex > 0) setFaseAtiva(fases[currentIndex - 1].id)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Fase Anterior</span>
                </button>
              )}
              <div className="flex-1" />
              {faseAtiva !== 'fase6' && (
                <button
                  onClick={() => {
                    const currentIndex = fases.findIndex(f => f.id === faseAtiva)
                    if (currentIndex < fases.length - 1) setFaseAtiva(fases[currentIndex + 1].id)
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: `${faseAtual.cor}30`, color: faseAtual.cor }}
                >
                  <span>Próxima Fase</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        )}

        {/* Métricas Resumo */}
        <section className="glass p-6 sm:p-8 mt-8">
          <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
            Resumo da Jornada
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-[var(--gray)]">Fase</th>
                  <th className="text-center py-3 text-[var(--gray)]">Período</th>
                  <th className="text-center py-3 text-[var(--gray)]">MRR</th>
                  <th className="text-center py-3 text-[var(--gray)]">Clientes</th>
                  <th className="text-center py-3 text-[var(--gray)]">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-green-400">1. Fundação</td>
                  <td className="text-center text-[var(--gray)]">0-30 dias</td>
                  <td className="text-center text-white">R$ 0</td>
                  <td className="text-center text-white">0-5</td>
                  <td className="text-center text-white">Só você</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-blue-400">2. Construção</td>
                  <td className="text-center text-[var(--gray)]">30-90 dias</td>
                  <td className="text-center text-white">R$ 1-3k</td>
                  <td className="text-center text-white">10</td>
                  <td className="text-center text-white">Só você</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-orange-400">3. Tração</td>
                  <td className="text-center text-[var(--gray)]">3-6 meses</td>
                  <td className="text-center text-white">R$ 5-15k</td>
                  <td className="text-center text-white">50</td>
                  <td className="text-center text-white">1-2</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-purple-400">4. Escala</td>
                  <td className="text-center text-[var(--gray)]">6m-1 ano</td>
                  <td className="text-center text-white">R$ 20-50k</td>
                  <td className="text-center text-white">200</td>
                  <td className="text-center text-white">3-5</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-pink-400">5. Crescimento</td>
                  <td className="text-center text-[var(--gray)]">1-2 anos</td>
                  <td className="text-center text-white">R$ 80-150k</td>
                  <td className="text-center text-white">500</td>
                  <td className="text-center text-white">10</td>
                </tr>
                <tr>
                  <td className="py-3 text-[var(--gold)]">6. Milhão</td>
                  <td className="text-center text-[var(--gray)]">2-5 anos</td>
                  <td className="text-center text-[var(--gold)] font-bold">R$ 200-500k</td>
                  <td className="text-center text-white">2000+</td>
                  <td className="text-center text-white">30+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl">
            <p className="text-[var(--gold)] text-center">
              <strong>Valuation ao final:</strong> Empresas SaaS com R$200-500k MRR são avaliadas em <strong>R$ 8-15 milhões</strong> (8-10x ARR)
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section className="glass-strong p-8 sm:p-10 mt-8 text-center border-2 border-[var(--gold)]">
          <Crown className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
          <h3 className="font-display text-2xl sm:text-3xl mb-4">
            O Mapa Está na Sua Mão
          </h3>
          <p className="text-[var(--gray)] text-lg max-w-2xl mx-auto mb-6">
            Milhares de pessoas sonham em ter um negócio de software. Você tem o mapa, a mentoria e as ferramentas.
            A única variável agora é a sua <span className="text-[var(--gold)] font-semibold">execução</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/membro/academia')}
              className="btn-primary"
            >
              Acessar Academia do Vendedor
            </button>
            <button
              onClick={() => router.push('/membro/zion')}
              className="px-6 py-3 border border-[var(--gold)] text-[var(--gold)] rounded-lg hover:bg-[var(--gold)]/10 transition-colors"
            >
              Projeto Zion
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Roadmap Estratégico - Mentoria Elite &copy; 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
