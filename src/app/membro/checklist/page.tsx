'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight,
  Rocket,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Crown,
  Sparkles,
  Clock,
  AlertTriangle,
  Star,
  Zap
} from 'lucide-react'

interface Tarefa {
  id: string
  titulo: string
  descricao: string
  dica?: string
  prioridade: 'alta' | 'media' | 'baixa'
}

interface Fase {
  id: string
  nome: string
  descricao: string
  icone: 'rocket' | 'target' | 'trending' | 'dollar' | 'users' | 'crown'
  cor: string
  tarefas: Tarefa[]
}

const fases: Fase[] = [
  {
    id: 'fase1',
    nome: 'Fase 1: Validação',
    descricao: 'Validar a ideia antes de construir',
    icone: 'rocket',
    cor: '#9C27B0',
    tarefas: [
      { id: 'f1t1', titulo: 'Definir o problema que você resolve', descricao: 'Qual dor específica seu produto/serviço resolve?', dica: 'Se você não consegue explicar em 1 frase, ainda não está claro.', prioridade: 'alta' },
      { id: 'f1t2', titulo: 'Identificar o público-alvo', descricao: 'Quem exatamente tem esse problema?', dica: '"Todo mundo" não é público-alvo. Seja específico.', prioridade: 'alta' },
      { id: 'f1t3', titulo: 'Pesquisar concorrentes', descricao: 'Quem já resolve esse problema? Como?', dica: 'Ter concorrentes é bom - valida que existe mercado.', prioridade: 'alta' },
      { id: 'f1t4', titulo: 'Conversar com 10+ potenciais clientes', descricao: 'Validar se o problema é real e se pagariam pela solução', dica: 'Não venda, apenas pergunte e escute.', prioridade: 'alta' },
      { id: 'f1t5', titulo: 'Definir seu diferencial', descricao: 'Por que escolheriam você e não o concorrente?', prioridade: 'media' },
      { id: 'f1t6', titulo: 'Criar uma landing page simples', descricao: 'Página explicando a solução para captar interessados', prioridade: 'media' },
      { id: 'f1t7', titulo: 'Definir precificação inicial', descricao: 'Quanto você vai cobrar? Baseado em quê?', dica: 'Comece mais caro. É mais fácil baixar do que subir.', prioridade: 'media' },
    ]
  },
  {
    id: 'fase2',
    nome: 'Fase 2: MVP',
    descricao: 'Construir a versão mínima do produto',
    icone: 'target',
    cor: '#2196F3',
    tarefas: [
      { id: 'f2t1', titulo: 'Listar funcionalidades essenciais', descricao: 'O mínimo necessário para resolver o problema', dica: 'Se der vergonha de lançar, está certo. Menos é mais no MVP.', prioridade: 'alta' },
      { id: 'f2t2', titulo: 'Definir stack tecnológica', descricao: 'Que tecnologias usar para construir?', prioridade: 'alta' },
      { id: 'f2t3', titulo: 'Criar wireframes/protótipo', descricao: 'Desenhar as telas antes de programar', prioridade: 'media' },
      { id: 'f2t4', titulo: 'Desenvolver MVP', descricao: 'Construir a primeira versão funcional', prioridade: 'alta' },
      { id: 'f2t5', titulo: 'Configurar infraestrutura', descricao: 'Hosting, domínio, SSL, etc.', prioridade: 'alta' },
      { id: 'f2t6', titulo: 'Implementar analytics', descricao: 'Medir uso e comportamento dos usuários', prioridade: 'media' },
      { id: 'f2t7', titulo: 'Criar processo de onboarding', descricao: 'Como o cliente vai começar a usar?', prioridade: 'media' },
      { id: 'f2t8', titulo: 'Testar com 5 usuários beta', descricao: 'Validar se funciona antes de lançar', prioridade: 'alta' },
    ]
  },
  {
    id: 'fase3',
    nome: 'Fase 3: Primeiros Clientes',
    descricao: 'Conseguir os primeiros clientes pagantes',
    icone: 'trending',
    cor: '#4CAF50',
    tarefas: [
      { id: 'f3t1', titulo: 'Definir canal de aquisição inicial', descricao: 'Como você vai encontrar os primeiros clientes?', dica: 'Foque em 1 canal só no início. Domine antes de diversificar.', prioridade: 'alta' },
      { id: 'f3t2', titulo: 'Criar script de vendas', descricao: 'O que você vai falar para vender?', prioridade: 'alta' },
      { id: 'f3t3', titulo: 'Conseguir primeiro cliente pagante', descricao: 'O marco mais importante!', dica: 'Não dê de graça. Se não pagam, não é validação real.', prioridade: 'alta' },
      { id: 'f3t4', titulo: 'Coletar feedback estruturado', descricao: 'O que funciona? O que falta?', prioridade: 'alta' },
      { id: 'f3t5', titulo: 'Implementar NPS', descricao: 'Medir satisfação dos clientes', prioridade: 'media' },
      { id: 'f3t6', titulo: 'Criar processo de suporte', descricao: 'Como você vai atender os clientes?', prioridade: 'alta' },
      { id: 'f3t7', titulo: 'Documentar casos de sucesso', descricao: 'Pegar depoimentos e resultados', prioridade: 'media' },
      { id: 'f3t8', titulo: 'Atingir 10 clientes pagantes', descricao: 'Validação de que existe demanda', prioridade: 'alta' },
    ]
  },
  {
    id: 'fase4',
    nome: 'Fase 4: Product-Market Fit',
    descricao: 'Encontrar o encaixe produto-mercado',
    icone: 'dollar',
    cor: '#FF9800',
    tarefas: [
      { id: 'f4t1', titulo: 'Analisar métricas de retenção', descricao: 'Clientes estão ficando? Por quê?', dica: 'Se churn > 10% mensal, o produto ainda não encaixou.', prioridade: 'alta' },
      { id: 'f4t2', titulo: 'Identificar padrão dos melhores clientes', descricao: 'Quem são os mais satisfeitos? O que têm em comum?', prioridade: 'alta' },
      { id: 'f4t3', titulo: 'Refinar persona/ICP', descricao: 'Ajustar público-alvo baseado em dados reais', prioridade: 'alta' },
      { id: 'f4t4', titulo: 'Iterar produto baseado em feedback', descricao: 'Melhorar o que importa para os clientes', prioridade: 'alta' },
      { id: 'f4t5', titulo: 'Definir métricas-chave (KPIs)', descricao: 'MRR, Churn, CAC, LTV, NPS', prioridade: 'alta' },
      { id: 'f4t6', titulo: 'Atingir 40% no teste de PMF', descricao: '"Muito desapontado" se produto sumisse', prioridade: 'alta' },
      { id: 'f4t7', titulo: 'Documentar playbook de vendas', descricao: 'O que funciona para fechar vendas?', prioridade: 'media' },
      { id: 'f4t8', titulo: 'Atingir 50 clientes pagantes', descricao: 'Escala mínima para validar PMF', prioridade: 'alta' },
    ]
  },
  {
    id: 'fase5',
    nome: 'Fase 5: Escala',
    descricao: 'Crescer de forma sustentável',
    icone: 'users',
    cor: '#00BCD4',
    tarefas: [
      { id: 'f5t1', titulo: 'Contratar primeiro funcionário', descricao: 'Delegar para crescer', dica: 'Contrate quem faz o que você não deveria fazer.', prioridade: 'alta' },
      { id: 'f5t2', titulo: 'Estruturar processo de vendas', descricao: 'Vendas não pode depender só de você', prioridade: 'alta' },
      { id: 'f5t3', titulo: 'Implementar CRM', descricao: 'Organizar pipeline de vendas', prioridade: 'alta' },
      { id: 'f5t4', titulo: 'Criar conteúdo/inbound marketing', descricao: 'Atrair leads de forma orgânica', prioridade: 'media' },
      { id: 'f5t5', titulo: 'Testar tráfego pago', descricao: 'Escalar aquisição com anúncios', prioridade: 'media' },
      { id: 'f5t6', titulo: 'Implementar automações', descricao: 'Reduzir trabalho manual', prioridade: 'media' },
      { id: 'f5t7', titulo: 'Estruturar financeiro', descricao: 'Controle de fluxo de caixa, DRE', prioridade: 'alta' },
      { id: 'f5t8', titulo: 'Atingir break-even', descricao: 'Receita >= Despesas', prioridade: 'alta' },
      { id: 'f5t9', titulo: 'Atingir R$ 50k MRR', descricao: 'Validação de modelo escalável', prioridade: 'alta' },
    ]
  },
  {
    id: 'fase6',
    nome: 'Fase 6: Crescimento',
    descricao: 'Acelerar e profissionalizar',
    icone: 'crown',
    cor: '#D4AF37',
    tarefas: [
      { id: 'f6t1', titulo: 'Montar equipe de vendas', descricao: '2-3 vendedores dedicados', prioridade: 'alta' },
      { id: 'f6t2', titulo: 'Estruturar CS (Customer Success)', descricao: 'Time focado em retenção', prioridade: 'alta' },
      { id: 'f6t3', titulo: 'Implementar OKRs', descricao: 'Metas trimestrais para a empresa', prioridade: 'media' },
      { id: 'f6t4', titulo: 'Criar cultura e valores', descricao: 'Documentar DNA da empresa', prioridade: 'media' },
      { id: 'f6t5', titulo: 'Estruturar jurídico', descricao: 'Contratos, termos, LGPD', prioridade: 'alta' },
      { id: 'f6t6', titulo: 'Avaliar captação de investimento', descricao: 'Faz sentido? Quanto? De quem?', prioridade: 'baixa' },
      { id: 'f6t7', titulo: 'Expandir para novos mercados', descricao: 'Novas regiões ou segmentos', prioridade: 'media' },
      { id: 'f6t8', titulo: 'Atingir R$ 100k MRR', descricao: 'Marco de empresa estabelecida', prioridade: 'alta' },
      { id: 'f6t9', titulo: 'Preparar para eventual exit', descricao: 'Documentação, métricas, processos', prioridade: 'baixa' },
    ]
  }
]

export default function ChecklistPage() {
  const router = useRouter()
  const [tarefasConcluidas, setTarefasConcluidas] = useState<string[]>([])
  const [faseAberta, setFaseAberta] = useState<string>('fase1')

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('checklist_fundador')
    if (saved) {
      setTarefasConcluidas(JSON.parse(saved))
    }
  }, [router])

  useEffect(() => {
    localStorage.setItem('checklist_fundador', JSON.stringify(tarefasConcluidas))
  }, [tarefasConcluidas])

  const toggleTarefa = (id: string) => {
    setTarefasConcluidas(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const getIcone = (tipo: string) => {
    switch(tipo) {
      case 'rocket': return <Rocket className="w-5 h-5" />
      case 'target': return <Target className="w-5 h-5" />
      case 'trending': return <TrendingUp className="w-5 h-5" />
      case 'dollar': return <DollarSign className="w-5 h-5" />
      case 'users': return <Users className="w-5 h-5" />
      case 'crown': return <Crown className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  const calcularProgressoFase = (fase: Fase) => {
    const concluidas = fase.tarefas.filter(t => tarefasConcluidas.includes(t.id)).length
    return Math.round((concluidas / fase.tarefas.length) * 100)
  }

  const progressoTotal = () => {
    const totalTarefas = fases.reduce((acc, f) => acc + f.tarefas.length, 0)
    return Math.round((tarefasConcluidas.length / totalTarefas) * 100)
  }

  const getPrioridadeCor = (prioridade: string) => {
    switch(prioridade) {
      case 'alta': return 'text-red-400'
      case 'media': return 'text-yellow-400'
      case 'baixa': return 'text-green-400'
      default: return 'text-[var(--gray)]'
    }
  }

  const faseAtual = () => {
    for (const fase of fases) {
      const progresso = calcularProgressoFase(fase)
      if (progresso < 100) return fase
    }
    return fases[fases.length - 1]
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

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
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Checklist do Fundador</h1>
            <p className="text-[var(--gray)] text-sm">Sua jornada do zero ao milhão</p>
          </div>
        </header>

        {/* Progresso Geral */}
        <section className="glass p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-white font-medium">Progresso Total</span>
              <p className="text-[var(--gray)] text-sm">
                {tarefasConcluidas.length} de {fases.reduce((acc, f) => acc + f.tarefas.length, 0)} tarefas
              </p>
            </div>
            <span className="text-3xl font-bold gold-text">{progressoTotal()}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full transition-all duration-500"
              style={{ width: `${progressoTotal()}%` }}
            />
          </div>

          <div className="mt-4 p-3 bg-[var(--gold)]/10 rounded-xl border border-[var(--gold)]/20">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--gold)]" />
              <span className="text-[var(--gold)] text-sm">
                Você está na: <strong>{faseAtual().nome}</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Fases */}
        <section className="space-y-4">
          {fases.map((fase) => {
            const progresso = calcularProgressoFase(fase)
            const isAberta = faseAberta === fase.id

            return (
              <div key={fase.id} className="glass overflow-hidden">
                {/* Header da Fase */}
                <button
                  onClick={() => setFaseAberta(isAberta ? '' : fase.id)}
                  className="w-full p-5 flex items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${fase.cor}20`, color: fase.cor }}
                  >
                    {getIcone(fase.icone)}
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="text-white font-semibold">{fase.nome}</h3>
                    <p className="text-[var(--gray)] text-sm">{fase.descricao}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-sm font-medium" style={{ color: fase.cor }}>
                        {progresso}%
                      </span>
                      <div className="w-20 h-1.5 bg-white/10 rounded-full mt-1">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${progresso}%`,
                            backgroundColor: fase.cor
                          }}
                        />
                      </div>
                    </div>

                    {isAberta ? (
                      <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                    )}
                  </div>
                </button>

                {/* Tarefas da Fase */}
                {isAberta && (
                  <div className="border-t border-white/10">
                    {fase.tarefas.map((tarefa) => {
                      const concluida = tarefasConcluidas.includes(tarefa.id)

                      return (
                        <div
                          key={tarefa.id}
                          className={`p-4 pl-6 border-b border-white/5 last:border-0 transition-colors ${
                            concluida ? 'bg-white/5' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <button
                              onClick={() => toggleTarefa(tarefa.id)}
                              className="flex-shrink-0 mt-1"
                            >
                              {concluida ? (
                                <CheckSquare className="w-6 h-6 text-green-500" />
                              ) : (
                                <Square className="w-6 h-6 text-[var(--gray)] hover:text-white" />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`font-medium ${concluida ? 'text-[var(--gray)] line-through' : 'text-white'}`}>
                                  {tarefa.titulo}
                                </p>
                                <span className={`text-xs ${getPrioridadeCor(tarefa.prioridade)}`}>
                                  {tarefa.prioridade === 'alta' ? '● Alta' : tarefa.prioridade === 'media' ? '● Média' : '● Baixa'}
                                </span>
                              </div>
                              <p className="text-[var(--gray)] text-sm">{tarefa.descricao}</p>
                              {tarefa.dica && (
                                <div className="mt-2 flex items-start gap-2 text-xs">
                                  <Sparkles className="w-3 h-3 text-[var(--gold)] mt-0.5" />
                                  <span className="text-[var(--gold)]">{tarefa.dica}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>

        {/* Legenda */}
        <section className="glass p-4 mt-8">
          <h3 className="text-white font-medium mb-3">Legenda de Prioridades</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-400">●</span>
              <span className="text-[var(--gray)]">Alta - Faça primeiro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">●</span>
              <span className="text-[var(--gray)]">Média - Importante mas não urgente</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">●</span>
              <span className="text-[var(--gray)]">Baixa - Pode esperar</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Checklist do Fundador - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
