'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, HelpCircle, Target, AlertTriangle, Zap, Star, Copy, Check, BookOpen } from 'lucide-react'

interface Pergunta {
  id: string
  tipo: 'situacao' | 'problema' | 'implicacao' | 'necessidade'
  categoria: string
  pergunta: string
  objetivo: string
  dica: string
}

const tiposSPIN = [
  {
    id: 'situacao',
    nome: 'Situação',
    letra: 'S',
    cor: 'bg-blue-500',
    corTexto: 'text-blue-400',
    desc: 'Entenda o contexto atual do cliente',
    icon: Search,
  },
  {
    id: 'problema',
    nome: 'Problema',
    letra: 'P',
    cor: 'bg-orange-500',
    corTexto: 'text-orange-400',
    desc: 'Identifique dores e dificuldades',
    icon: AlertTriangle,
  },
  {
    id: 'implicacao',
    nome: 'Implicação',
    letra: 'I',
    cor: 'bg-red-500',
    corTexto: 'text-red-400',
    desc: 'Amplifique o impacto do problema',
    icon: Zap,
  },
  {
    id: 'necessidade',
    nome: 'Necessidade',
    letra: 'N',
    cor: 'bg-green-500',
    corTexto: 'text-green-400',
    desc: 'Faça o cliente desejar a solução',
    icon: Star,
  },
]

const categorias = [
  'Processo',
  'Equipe',
  'Tecnologia',
  'Tempo',
  'Dinheiro',
  'Resultados',
  'Concorrência',
  'Crescimento',
]

const perguntas: Pergunta[] = [
  // SITUAÇÃO - Processo
  { id: '1', tipo: 'situacao', categoria: 'Processo', pergunta: 'Como vocês fazem [PROCESSO] atualmente?', objetivo: 'Entender o fluxo atual', dica: 'Deixe o cliente explicar sem interromper' },
  { id: '2', tipo: 'situacao', categoria: 'Processo', pergunta: 'Quais etapas estão envolvidas nesse processo?', objetivo: 'Mapear complexidade', dica: 'Anote cada etapa para usar depois' },
  { id: '3', tipo: 'situacao', categoria: 'Processo', pergunta: 'Há quanto tempo vocês usam esse método?', objetivo: 'Entender maturidade', dica: 'Processos antigos são mais difíceis de mudar' },
  { id: '4', tipo: 'situacao', categoria: 'Processo', pergunta: 'O que motivou vocês a fazer dessa forma?', objetivo: 'Entender história', dica: 'Respeite as decisões passadas' },
  { id: '5', tipo: 'situacao', categoria: 'Processo', pergunta: 'Quem é responsável por essa atividade?', objetivo: 'Identificar stakeholders', dica: 'Pode revelar decisores ocultos' },

  // SITUAÇÃO - Equipe
  { id: '6', tipo: 'situacao', categoria: 'Equipe', pergunta: 'Quantas pessoas estão envolvidas nisso?', objetivo: 'Dimensionar impacto', dica: 'Mais pessoas = mais complexidade na venda' },
  { id: '7', tipo: 'situacao', categoria: 'Equipe', pergunta: 'Como é a estrutura da sua equipe?', objetivo: 'Entender hierarquia', dica: 'Ajuda a identificar decisores' },
  { id: '8', tipo: 'situacao', categoria: 'Equipe', pergunta: 'Vocês têm alguém dedicado a essa função?', objetivo: 'Identificar recursos', dica: 'Se não tem, pode ser uma dor' },
  { id: '9', tipo: 'situacao', categoria: 'Equipe', pergunta: 'Como a equipe foi treinada para isso?', objetivo: 'Entender capacitação', dica: 'Falta de treinamento pode ser problema' },

  // SITUAÇÃO - Tecnologia
  { id: '10', tipo: 'situacao', categoria: 'Tecnologia', pergunta: 'Que ferramentas vocês usam atualmente?', objetivo: 'Mapear stack', dica: 'Pergunte sobre integrações necessárias' },
  { id: '11', tipo: 'situacao', categoria: 'Tecnologia', pergunta: 'Vocês já tentaram alguma solução antes?', objetivo: 'Entender histórico', dica: 'Descubra por que não funcionou' },
  { id: '12', tipo: 'situacao', categoria: 'Tecnologia', pergunta: 'Como é a integração entre os sistemas?', objetivo: 'Identificar gaps', dica: 'Integrações ruins são dor comum' },

  // SITUAÇÃO - Resultados
  { id: '13', tipo: 'situacao', categoria: 'Resultados', pergunta: 'Quais métricas vocês acompanham?', objetivo: 'Entender KPIs', dica: 'Use as métricas deles para mostrar valor' },
  { id: '14', tipo: 'situacao', categoria: 'Resultados', pergunta: 'Como está o desempenho atual dessa área?', objetivo: 'Ter baseline', dica: 'Comparar antes/depois fica mais fácil' },
  { id: '15', tipo: 'situacao', categoria: 'Resultados', pergunta: 'Vocês têm metas definidas para isso?', objetivo: 'Entender objetivos', dica: 'Conecte sua solução às metas deles' },

  // PROBLEMA - Processo
  { id: '16', tipo: 'problema', categoria: 'Processo', pergunta: 'Qual a maior dificuldade nesse processo?', objetivo: 'Identificar dor principal', dica: 'A primeira resposta pode não ser a real' },
  { id: '17', tipo: 'problema', categoria: 'Processo', pergunta: 'Esse processo costuma falhar? Quando?', objetivo: 'Identificar pontos fracos', dica: 'Anote os gatilhos das falhas' },
  { id: '18', tipo: 'problema', categoria: 'Processo', pergunta: 'O que te frustra mais nessa atividade?', objetivo: 'Acessar emoção', dica: 'Frustração revela dores reais' },
  { id: '19', tipo: 'problema', categoria: 'Processo', pergunta: 'Quanto manual é esse processo?', objetivo: 'Identificar ineficiência', dica: 'Manual = oportunidade de automação' },
  { id: '20', tipo: 'problema', categoria: 'Processo', pergunta: 'Vocês já perderam dados ou informações?', objetivo: 'Identificar riscos', dica: 'Perda de dados é dor forte' },

  // PROBLEMA - Tempo
  { id: '21', tipo: 'problema', categoria: 'Tempo', pergunta: 'Quanto tempo vocês gastam nisso por semana?', objetivo: 'Quantificar desperdício', dica: 'Use para calcular ROI depois' },
  { id: '22', tipo: 'problema', categoria: 'Tempo', pergunta: 'Vocês já perderam prazos por causa disso?', objetivo: 'Identificar consequências', dica: 'Prazos perdidos = dor urgente' },
  { id: '23', tipo: 'problema', categoria: 'Tempo', pergunta: 'O que você faria com esse tempo de volta?', objetivo: 'Criar desejo', dica: 'Conecte com objetivos pessoais' },
  { id: '24', tipo: 'problema', categoria: 'Tempo', pergunta: 'Quanto demora para ter um resultado?', objetivo: 'Identificar lentidão', dica: 'Velocidade é diferencial competitivo' },

  // PROBLEMA - Dinheiro
  { id: '25', tipo: 'problema', categoria: 'Dinheiro', pergunta: 'Vocês já perderam dinheiro com isso?', objetivo: 'Quantificar perda', dica: 'Perda financeira justifica investimento' },
  { id: '26', tipo: 'problema', categoria: 'Dinheiro', pergunta: 'Quanto custa manter isso funcionando?', objetivo: 'Calcular TCO', dica: 'Compare com seu preço' },
  { id: '27', tipo: 'problema', categoria: 'Dinheiro', pergunta: 'Vocês já deixaram de fechar negócios por isso?', objetivo: 'Identificar custo de oportunidade', dica: 'Vendas perdidas doem muito' },

  // PROBLEMA - Equipe
  { id: '28', tipo: 'problema', categoria: 'Equipe', pergunta: 'Sua equipe reclama desse processo?', objetivo: 'Identificar insatisfação', dica: 'Equipe insatisfeita = rotatividade' },
  { id: '29', tipo: 'problema', categoria: 'Equipe', pergunta: 'Vocês já perderam alguém por causa disso?', objetivo: 'Identificar turnover', dica: 'Custo de rotatividade é alto' },
  { id: '30', tipo: 'problema', categoria: 'Equipe', pergunta: 'Como a equipe se sente fazendo isso?', objetivo: 'Acessar emocional', dica: 'Emoção acelera decisão' },

  // IMPLICAÇÃO - Geral
  { id: '31', tipo: 'implicacao', categoria: 'Resultados', pergunta: 'O que acontece se isso continuar assim?', objetivo: 'Projetar futuro negativo', dica: 'Faça o cliente visualizar o problema crescendo' },
  { id: '32', tipo: 'implicacao', categoria: 'Resultados', pergunta: 'Isso afeta outras áreas da empresa?', objetivo: 'Expandir impacto', dica: 'Problemas conectados são mais urgentes' },
  { id: '33', tipo: 'implicacao', categoria: 'Dinheiro', pergunta: 'Quanto isso custa por mês/ano para vocês?', objetivo: 'Quantificar dor', dica: 'Número concreto é poderoso' },
  { id: '34', tipo: 'implicacao', categoria: 'Tempo', pergunta: 'Como isso impacta sua produtividade?', objetivo: 'Conectar com eficiência', dica: 'Produtividade é KPI universal' },
  { id: '35', tipo: 'implicacao', categoria: 'Crescimento', pergunta: 'Isso está limitando o crescimento de vocês?', objetivo: 'Conectar com objetivos', dica: 'Limitação de crescimento é urgente' },
  { id: '36', tipo: 'implicacao', categoria: 'Concorrência', pergunta: 'Seus concorrentes enfrentam o mesmo problema?', objetivo: 'Criar urgência competitiva', dica: 'Se não enfrentam, você está atrás' },
  { id: '37', tipo: 'implicacao', categoria: 'Equipe', pergunta: 'Como isso afeta a moral da equipe?', objetivo: 'Humanizar impacto', dica: 'Pessoas importam para líderes' },
  { id: '38', tipo: 'implicacao', categoria: 'Processo', pergunta: 'Quantos erros isso causa por mês?', objetivo: 'Quantificar falhas', dica: 'Erros têm custo escondido' },
  { id: '39', tipo: 'implicacao', categoria: 'Tempo', pergunta: 'Se você não resolver, quanto tempo mais vai perder?', objetivo: 'Criar senso de urgência', dica: 'Tempo perdido não volta' },
  { id: '40', tipo: 'implicacao', categoria: 'Dinheiro', pergunta: 'Quanto já foi investido tentando resolver isso?', objetivo: 'Mostrar custo acumulado', dica: 'Sunk cost pode motivar mudança' },

  // IMPLICAÇÃO - Pessoais
  { id: '41', tipo: 'implicacao', categoria: 'Resultados', pergunta: 'Como isso afeta VOCÊ pessoalmente?', objetivo: 'Criar conexão pessoal', dica: 'Decisões são emocionais, depois racionais' },
  { id: '42', tipo: 'implicacao', categoria: 'Resultados', pergunta: 'Isso já te causou algum problema com a liderança?', objetivo: 'Identificar pressão', dica: 'Pressão de cima acelera decisão' },
  { id: '43', tipo: 'implicacao', categoria: 'Tempo', pergunta: 'Quanto do seu tempo é consumido por isso?', objetivo: 'Personalizar impacto', dica: 'Tempo do decisor é valioso' },

  // NECESSIDADE - Solução
  { id: '44', tipo: 'necessidade', categoria: 'Resultados', pergunta: 'Se você resolvesse isso, o que mudaria?', objetivo: 'Criar visão positiva', dica: 'Faça o cliente vender para si mesmo' },
  { id: '45', tipo: 'necessidade', categoria: 'Resultados', pergunta: 'Qual seria o cenário ideal para você?', objetivo: 'Entender expectativas', dica: 'Use as palavras dele na proposta' },
  { id: '46', tipo: 'necessidade', categoria: 'Tempo', pergunta: 'O que você faria com o tempo economizado?', objetivo: 'Criar desejo', dica: 'Conecte com objetivos pessoais' },
  { id: '47', tipo: 'necessidade', categoria: 'Dinheiro', pergunta: 'Quanto vale resolver esse problema?', objetivo: 'Ancorar valor', dica: 'Use esse número na negociação' },
  { id: '48', tipo: 'necessidade', categoria: 'Crescimento', pergunta: 'Como isso ajudaria vocês a crescer?', objetivo: 'Conectar com estratégia', dica: 'Crescimento justifica investimento' },
  { id: '49', tipo: 'necessidade', categoria: 'Equipe', pergunta: 'Como a equipe reagiria se isso fosse resolvido?', objetivo: 'Criar apoio interno', dica: 'Equipe feliz é argumento forte' },
  { id: '50', tipo: 'necessidade', categoria: 'Processo', pergunta: 'Se pudesse mudar uma coisa, o que seria?', objetivo: 'Priorizar', dica: 'Foque no que mais importa' },

  // NECESSIDADE - Valor
  { id: '51', tipo: 'necessidade', categoria: 'Resultados', pergunta: 'O que seria um bom ROI para vocês?', objetivo: 'Definir expectativa', dica: 'Use esse número para provar valor' },
  { id: '52', tipo: 'necessidade', categoria: 'Resultados', pergunta: 'Em quanto tempo vocês esperam ver resultados?', objetivo: 'Alinhar expectativas', dica: 'Seja realista sobre prazos' },
  { id: '53', tipo: 'necessidade', categoria: 'Concorrência', pergunta: 'Como isso te colocaria à frente da concorrência?', objetivo: 'Criar diferencial', dica: 'Vantagem competitiva é urgente' },
  { id: '54', tipo: 'necessidade', categoria: 'Crescimento', pergunta: 'Isso te ajudaria a bater suas metas?', objetivo: 'Conectar com objetivos', dica: 'Metas pessoais motivam' },
  { id: '55', tipo: 'necessidade', categoria: 'Dinheiro', pergunta: 'Quanto vocês economizariam por mês?', objetivo: 'Quantificar benefício', dica: 'Compare com seu preço' },
]

export default function SPINPage() {
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('todos')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('todas')
  const [busca, setBusca] = useState('')
  const [copiado, setCopiado] = useState<string | null>(null)

  const perguntasFiltradas = perguntas.filter(p => {
    const matchTipo = tipoSelecionado === 'todos' || p.tipo === tipoSelecionado
    const matchCategoria = categoriaSelecionada === 'todas' || p.categoria === categoriaSelecionada
    const matchBusca = !busca || p.pergunta.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchCategoria && matchBusca
  })

  const copiar = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto)
    setCopiado(id)
    setTimeout(() => setCopiado(null), 2000)
  }

  const getTipoInfo = (tipo: string) => {
    return tiposSPIN.find(t => t.id === tipo) || tiposSPIN[0]
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Biblioteca de Perguntas SPIN</h1>
            <p className="text-white/60">{perguntas.length} perguntas de qualificação por categoria</p>
          </div>
        </div>

        {/* O que é SPIN */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--gold)]" />
            O Método SPIN Selling
          </h2>
          <p className="text-white/70 mb-4">
            Desenvolvido por Neil Rackham após estudar 35.000 ligações de vendas. A técnica usa perguntas
            estratégicas para fazer o cliente perceber sozinho que precisa da sua solução.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {tiposSPIN.map((tipo) => {
              const Icon = tipo.icon
              const count = perguntas.filter(p => p.tipo === tipo.id).length

              return (
                <div key={tipo.id} className={`p-4 rounded-xl ${tipo.cor}/10 border border-${tipo.cor.replace('bg-', '')}/30`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${tipo.cor}/20 flex items-center justify-center`}>
                      <span className={`font-bold ${tipo.corTexto}`}>{tipo.letra}</span>
                    </div>
                    <h3 className={`font-semibold ${tipo.corTexto}`}>{tipo.nome}</h3>
                  </div>
                  <p className="text-sm text-white/60">{tipo.desc}</p>
                  <p className="text-xs text-white/40 mt-2">{count} perguntas</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Busca */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          {/* Tipo SPIN */}
          <select
            value={tipoSelecionado}
            onChange={(e) => setTipoSelecionado(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
          >
            <option value="todos">Todos os Tipos</option>
            {tiposSPIN.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>

          {/* Categoria */}
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
          >
            <option value="todas">Todas as Categorias</option>
            {categorias.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Lista de Perguntas */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Perguntas ({perguntasFiltradas.length})
            </h2>
          </div>

          <div className="space-y-3">
            {perguntasFiltradas.map((p) => {
              const tipoInfo = getTipoInfo(p.tipo)

              return (
                <div
                  key={p.id}
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${tipoInfo.cor}/20 flex items-center justify-center shrink-0`}>
                      <span className={`font-bold ${tipoInfo.corTexto}`}>{tipoInfo.letra}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${tipoInfo.cor}/30 ${tipoInfo.corTexto}`}>
                          {tipoInfo.nome}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
                          {p.categoria}
                        </span>
                      </div>

                      <p className="font-medium text-lg mb-2">{p.pergunta}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-white/50">Objetivo:</span>{' '}
                          <span className="text-white/70">{p.objetivo}</span>
                        </div>
                        <div>
                          <span className="text-[var(--gold)]">💡 {p.dica}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => copiar(p.pergunta, p.id)}
                      className="p-2 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiado === p.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sequência Recomendada */}
        <div className="mt-8 glass rounded-2xl p-6 border border-[var(--gold)]/30">
          <h3 className="text-xl font-semibold mb-4">🎯 Sequência Recomendada</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-blue-400">S</span>
              </div>
              <h4 className="font-semibold mb-1">1. Situação</h4>
              <p className="text-xs text-white/60">2-3 perguntas para entender o contexto</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-orange-400">P</span>
              </div>
              <h4 className="font-semibold mb-1">2. Problema</h4>
              <p className="text-xs text-white/60">3-5 perguntas para identificar dores</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-red-400">I</span>
              </div>
              <h4 className="font-semibold mb-1">3. Implicação</h4>
              <p className="text-xs text-white/60">3-5 perguntas para amplificar a dor</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-green-400">N</span>
              </div>
              <h4 className="font-semibold mb-1">4. Necessidade</h4>
              <p className="text-xs text-white/60">2-3 perguntas para criar desejo</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-sm text-white/70">
              <strong className="text-[var(--gold)]">Regra de Ouro:</strong> Gaste 70% do tempo nas perguntas de
              Implicação e Necessidade. São elas que fazem o cliente perceber que precisa da sua solução.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
