'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldAlert, Copy, Check, AlertTriangle, Clock, Users, MessageSquare, Gift, TrendingDown, Zap, Heart, CheckCircle2 } from 'lucide-react'

interface Estrategia {
  id: string
  categoria: string
  nome: string
  descricao: string
  quando: string
  script: string
  impacto: 'alto' | 'medio' | 'baixo'
  esforco: 'alto' | 'medio' | 'baixo'
}

export default function AntiChurnPage() {
  const [copied, setCopied] = useState(false)
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [estrategiaSelecionada, setEstrategiaSelecionada] = useState<string | null>(null)

  const categorias = [
    { id: 'todos', nome: 'Todas', icon: ShieldAlert },
    { id: 'prevencao', nome: 'Prevencao', icon: ShieldAlert },
    { id: 'reativacao', nome: 'Reativacao', icon: Zap },
    { id: 'retencao', nome: 'Retencao', icon: Heart },
    { id: 'recuperacao', nome: 'Recuperacao', icon: TrendingDown },
  ]

  const estrategias: Estrategia[] = [
    // Prevencao
    {
      id: '1',
      categoria: 'prevencao',
      nome: 'Onboarding de Alto Toque',
      descricao: 'Acompanhamento intensivo nos primeiros 30 dias para garantir ativacao',
      quando: 'Primeiros 30 dias de todo cliente',
      script: `Ola [NOME]! Sou [SEU NOME] do time de Sucesso do Cliente.

Quero garantir que voce esteja aproveitando ao maximo o [PRODUTO].

Podemos agendar 15 minutos essa semana para:
1. Revisar seus objetivos iniciais
2. Mostrar funcionalidades que voce pode nao ter descoberto
3. Responder qualquer duvida

Qual horario funciona melhor para voce?`,
      impacto: 'alto',
      esforco: 'medio'
    },
    {
      id: '2',
      categoria: 'prevencao',
      nome: 'Check-in Proativo Mensal',
      descricao: 'Contato regular antes que problemas aparecam',
      quando: 'Todo mes, especialmente clientes com score < 70',
      script: `Ola [NOME]!

Passando para nosso check-in mensal. Algumas perguntas rapidas:

1. Como esta sendo sua experiencia com [PRODUTO] esse mes?
2. Conseguiu atingir os objetivos que conversamos?
3. Alguma dificuldade que posso ajudar?

Se preferir, podemos fazer uma call rapida de 10 min.`,
      impacto: 'alto',
      esforco: 'baixo'
    },
    {
      id: '3',
      categoria: 'prevencao',
      nome: 'Alerta de Baixo Uso',
      descricao: 'Detectar e agir quando uso cai significativamente',
      quando: 'Quando uso cai mais de 30% vs mes anterior',
      script: `Ola [NOME]!

Percebi que voce nao acessou [PRODUTO] com a mesma frequencia nas ultimas semanas.

Esta tudo bem? Aconteceu algo que posso ajudar?

Se estiver enfrentando alguma dificuldade ou se algo mudou nas suas necessidades, adoraria conversar para entender como podemos ajudar melhor.

Que tal uma call rapida essa semana?`,
      impacto: 'alto',
      esforco: 'baixo'
    },
    // Reativacao
    {
      id: '4',
      categoria: 'reativacao',
      nome: 'Campanha de Re-engajamento',
      descricao: 'Sequencia de emails para usuarios inativos',
      quando: 'Usuario sem login ha 14+ dias',
      script: `Assunto: Sentimos sua falta, [NOME]!

Ola [NOME],

Faz [X] dias que voce nao acessa [PRODUTO].

Enquanto isso, lancamos algumas novidades que podem te interessar:
- [NOVIDADE 1]
- [NOVIDADE 2]

Para facilitar sua volta, estou oferecendo uma sessao de 15 min gratuita para te atualizar sobre tudo.

Clique aqui para agendar: [LINK]

Qualquer duvida, estou a disposicao!`,
      impacto: 'medio',
      esforco: 'baixo'
    },
    {
      id: '5',
      categoria: 'reativacao',
      nome: 'Ligacao de Resgate',
      descricao: 'Contato telefonico direto para entender situacao',
      quando: 'Cliente sem resposta a emails ha 7+ dias',
      script: `[LIGACAO]

Ola [NOME], aqui e [SEU NOME] da [EMPRESA].

Tudo bem? Estou ligando porque percebi que voce nao tem acessado [PRODUTO] ultimamente e queria entender se esta tudo bem.

[OUVIR]

Entendo. Posso perguntar o que mudou?

[SE PROBLEMAS TECNICOS] - Podemos agendar uma sessao para resolver isso agora mesmo
[SE FALTA DE TEMPO] - Que tal eu mostrar alguns atalhos que economizam tempo?
[SE NAO VE VALOR] - Podemos revisar juntos como atingir seus objetivos originais?

O que acha?`,
      impacto: 'alto',
      esforco: 'alto'
    },
    // Retencao
    {
      id: '6',
      categoria: 'retencao',
      nome: 'Upsell com Desconto',
      descricao: 'Oferecer upgrade com condicao especial para aumentar stickiness',
      quando: 'Cliente usando 80%+ do plano atual',
      script: `Ola [NOME]!

Voce esta voando! Percebi que ja usa [X%] dos recursos do seu plano.

Tenho uma proposta especial: upgrade para o plano [PLANO] com [X%] de desconto nos proximos 3 meses.

Com isso voce tera:
- [BENEFICIO 1]
- [BENEFICIO 2]
- [BENEFICIO 3]

Essa condicao e exclusiva e valida ate [DATA].

Posso ativar para voce?`,
      impacto: 'alto',
      esforco: 'baixo'
    },
    {
      id: '7',
      categoria: 'retencao',
      nome: 'Programa de Fidelidade',
      descricao: 'Beneficios exclusivos para clientes de longo prazo',
      quando: 'Clientes com 6+ meses',
      script: `Ola [NOME]!

Voce ja esta conosco ha [X] meses e queremos agradecer!

Como cliente VIP, voce agora tem acesso a:
- [BENEFICIO EXCLUSIVO 1]
- [BENEFICIO EXCLUSIVO 2]
- Suporte prioritario
- Acesso antecipado a novidades

Esses beneficios ja estao ativos na sua conta.

Obrigado por fazer parte da nossa jornada!`,
      impacto: 'medio',
      esforco: 'baixo'
    },
    {
      id: '8',
      categoria: 'retencao',
      nome: 'QBR (Quarterly Business Review)',
      descricao: 'Revisao trimestral de resultados e objetivos',
      quando: 'Trimestral para clientes com MRR > R$1000',
      script: `Ola [NOME]!

E hora da nossa revisao trimestral! Preparei uma analise dos seus ultimos 3 meses:

RESULTADOS:
- [METRICA 1]: [VALOR] ([VARIACAO]%)
- [METRICA 2]: [VALOR] ([VARIACAO]%)

DESTAQUES:
- [CONQUISTA 1]
- [CONQUISTA 2]

PROXIMOS PASSOS:
- [OBJETIVO 1]
- [OBJETIVO 2]

Podemos agendar 30 min para revisar juntos e planejar o proximo trimestre?`,
      impacto: 'alto',
      esforco: 'medio'
    },
    // Recuperacao
    {
      id: '9',
      categoria: 'recuperacao',
      nome: 'Oferta de Pausa',
      descricao: 'Alternativa ao cancelamento - pausar assinatura',
      quando: 'Cliente solicita cancelamento',
      script: `Ola [NOME],

Entendo que momento pode nao ser ideal para continuar.

Antes de cancelar, que tal pausar sua assinatura por [1-3] meses?

Durante a pausa:
- Voce mantem seus dados e configuracoes
- Nao sera cobrado
- Pode reativar quando quiser com 1 clique

Assim voce nao perde todo o trabalho que ja fez e pode voltar quando fizer sentido.

O que acha?`,
      impacto: 'alto',
      esforco: 'baixo'
    },
    {
      id: '10',
      categoria: 'recuperacao',
      nome: 'Desconto de Retencao',
      descricao: 'Oferta especial para evitar cancelamento',
      quando: 'Cliente em processo de cancelamento',
      script: `Ola [NOME],

Sinto muito que esteja considerando sair.

Antes de cancelar, posso oferecer [X]% de desconto nos proximos [3-6] meses para voce dar mais uma chance ao [PRODUTO]?

Tambem posso:
- Agendar treinamento personalizado
- Conectar voce com nosso especialista em [AREA]
- Revisar sua configuracao para otimizar resultados

Isso faz sentido para voce?`,
      impacto: 'alto',
      esforco: 'baixo'
    },
    {
      id: '11',
      categoria: 'recuperacao',
      nome: 'Entrevista de Saida',
      descricao: 'Coletar feedback mesmo que nao consiga reter',
      quando: 'Apos cancelamento confirmado',
      script: `Ola [NOME],

Lamento que nao tenha funcionado dessa vez.

Seu feedback e muito importante para melhorarmos. Pode me contar em 2 minutos:

1. Qual foi o principal motivo da saida?
2. O que poderiamos ter feito diferente?
3. Ha algo que fariamos para reconquista-lo no futuro?

Independente da resposta, desejo sucesso!

E saiba que a porta esta sempre aberta se quiser voltar.`,
      impacto: 'baixo',
      esforco: 'baixo'
    },
    {
      id: '12',
      categoria: 'recuperacao',
      nome: 'Winback apos 30 dias',
      descricao: 'Campanha para reconquistar ex-clientes',
      quando: '30-90 dias apos cancelamento',
      script: `Assunto: [NOME], muita coisa mudou por aqui!

Ola [NOME]!

Faz [X] dias que voce saiu e muita coisa mudou:

NOVIDADES:
- [FEATURE/MELHORIA 1]
- [FEATURE/MELHORIA 2]
- [FEATURE/MELHORIA 3]

Para ex-clientes, estou oferecendo:
- [X]% de desconto por [Y] meses
- Migracao gratuita dos seus dados
- Onboarding dedicado

Quer dar uma segunda chance?

[CTA BUTTON]`,
      impacto: 'medio',
      esforco: 'baixo'
    },
  ]

  const estrategiasFiltradas = categoriaAtiva === 'todos'
    ? estrategias
    : estrategias.filter(e => e.categoria === categoriaAtiva)

  const getCorImpacto = (impacto: string) => {
    if (impacto === 'alto') return '#22c55e'
    if (impacto === 'medio') return '#eab308'
    return '#94a3b8'
  }

  const getCorEsforco = (esforco: string) => {
    if (esforco === 'baixo') return '#22c55e'
    if (esforco === 'medio') return '#eab308'
    return '#ef4444'
  }

  const copiarEstrategia = (estrategia: Estrategia) => {
    const texto = `
═══════════════════════════════════════════════════════════════
            ESTRATEGIA ANTI-CHURN: ${estrategia.nome.toUpperCase()}
═══════════════════════════════════════════════════════════════

CATEGORIA: ${estrategia.categoria.toUpperCase()}

DESCRICAO:
${estrategia.descricao}

QUANDO USAR:
${estrategia.quando}

IMPACTO: ${estrategia.impacto.toUpperCase()}
ESFORCO: ${estrategia.esforco.toUpperCase()}

SCRIPT/TEMPLATE:
───────────────────────────────────────────────────────────────
${estrategia.script}
───────────────────────────────────────────────────────────────

Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copiarTudo = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    PLAYBOOK ANTI-CHURN
═══════════════════════════════════════════════════════════════

${categorias.filter(c => c.id !== 'todos').map(cat => `
${cat.nome.toUpperCase()}
───────────────────────────────────────────────────────────────
${estrategias.filter(e => e.categoria === cat.id).map(e => `
${e.nome}
- Quando: ${e.quando}
- Impacto: ${e.impacto} | Esforco: ${e.esforco}
- ${e.descricao}
`).join('')}
`).join('')}

═══════════════════════════════════════════════════════════════
Total: ${estrategias.length} estrategias
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <ShieldAlert className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Playbook <span className="gold-text">Anti-Churn</span>
          </h1>
          <p className="text-[var(--gray)]">{estrategias.length} estrategias para reter clientes</p>
        </div>

        {/* Filtros */}
        <div className="glass card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      categoriaAtiva === cat.id
                        ? 'bg-[var(--gold)] text-black'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.nome}
                  </button>
                )
              })}
            </div>
            <button onClick={copiarTudo} className="btn-primary text-sm flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Tudo'}
            </button>
          </div>
        </div>

        {/* Lista de Estrategias */}
        <div className="space-y-4 mb-8">
          {estrategiasFiltradas.map((estrategia) => (
            <div key={estrategia.id} className="glass card">
              <div
                className="cursor-pointer"
                onClick={() => setEstrategiaSelecionada(
                  estrategiaSelecionada === estrategia.id ? null : estrategia.id
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg">{estrategia.nome}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-[var(--gray)]">
                        {estrategia.categoria}
                      </span>
                    </div>
                    <p className="text-[var(--gray)] text-sm mb-2">{estrategia.descricao}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="text-[var(--gray)]">Impacto:</span>
                        <span style={{ color: getCorImpacto(estrategia.impacto) }}>{estrategia.impacto}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-[var(--gray)]">Esforco:</span>
                        <span style={{ color: getCorEsforco(estrategia.esforco) }}>{estrategia.esforco}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-[var(--gray)]">
                    {estrategiaSelecionada === estrategia.id ? '−' : '+'}
                  </div>
                </div>
              </div>

              {estrategiaSelecionada === estrategia.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="mb-4">
                    <p className="text-sm text-[var(--gold)] font-semibold mb-1">Quando usar:</p>
                    <p className="text-sm text-[var(--gray)]">{estrategia.quando}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-[var(--gold)] font-semibold mb-2">Script/Template:</p>
                    <div className="bg-black/30 rounded-xl p-4">
                      <pre className="text-sm text-white whitespace-pre-wrap font-sans">{estrategia.script}</pre>
                    </div>
                  </div>
                  <button
                    onClick={() => copiarEstrategia(estrategia)}
                    className="btn-secondary text-sm flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar esta estrategia
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Matriz de Prioridade */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Matriz de Priorizacao</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="font-semibold text-green-400 mb-2">Alto Impacto + Baixo Esforco</h3>
              <p className="text-xs text-[var(--gray)] mb-2">Faca primeiro!</p>
              <ul className="text-sm space-y-1">
                {estrategias.filter(e => e.impacto === 'alto' && e.esforco === 'baixo').map(e => (
                  <li key={e.id} className="text-green-400">• {e.nome}</li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-400 mb-2">Alto Impacto + Alto Esforco</h3>
              <p className="text-xs text-[var(--gray)] mb-2">Planeje com cuidado</p>
              <ul className="text-sm space-y-1">
                {estrategias.filter(e => e.impacto === 'alto' && e.esforco !== 'baixo').map(e => (
                  <li key={e.id} className="text-yellow-400">• {e.nome}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Principios Anti-Churn</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Prevencao Vence Recuperacao</h4>
              <p>E 5x mais barato prevenir churn do que reconquistar um cliente. Invista em prevencao.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Velocidade Importa</h4>
              <p>Quanto mais rapido agir apos sinais de risco, maior a chance de reter.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Personalize a Abordagem</h4>
              <p>Cada cliente cancela por um motivo diferente. Entenda antes de oferecer solucao.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Aprenda com Cada Churn</h4>
              <p>Mesmo que nao consiga reter, colete feedback para evitar churns futuros.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
