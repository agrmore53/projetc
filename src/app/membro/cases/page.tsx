'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  MapPin,
  Building2,
  Quote,
  Copy,
  Check,
  Filter,
  Star,
  Target,
  Zap,
  Award
} from 'lucide-react'

interface CaseSucesso {
  id: string
  nome: string
  empresa: string
  segmento: string
  cidade: string
  estado: string
  foto?: string
  problema: string
  solucao: string
  resultados: {
    metrica: string
    antes: string
    depois: string
    percentual?: string
  }[]
  depoimento: string
  tempoResultado: string
  destaque: string
  tags: string[]
}

const cases: CaseSucesso[] = [
  {
    id: '1',
    nome: 'Roberto Silva',
    empresa: 'Mercadinho do Bairro',
    segmento: 'Varejo Alimentício',
    cidade: 'Curitiba',
    estado: 'PR',
    problema: 'Perdia vendas por não saber o que tinha em estoque. Funcionários davam descontos sem autorização. Não conseguia emitir notas fiscais corretamente.',
    solucao: 'Implementamos o sistema completo com controle de estoque em tempo real, níveis de permissão para funcionários e módulo fiscal integrado.',
    resultados: [
      { metrica: 'Perda de Estoque', antes: 'R$ 3.000/mês', depois: 'R$ 200/mês', percentual: '-93%' },
      { metrica: 'Tempo de Fechamento', antes: '4 horas/dia', depois: '30 min/dia', percentual: '-87%' },
      { metrica: 'Faturamento', antes: 'R$ 45.000/mês', depois: 'R$ 62.000/mês', percentual: '+38%' },
    ],
    depoimento: 'Eu achava que sistema era coisa de empresa grande. Hoje não vivo sem. Sei exatamente o que tenho, o que vende mais, e meus funcionários não podem mais me passar a perna.',
    tempoResultado: '45 dias',
    destaque: 'Reduziu perdas em 93%',
    tags: ['varejo', 'estoque', 'fiscal']
  },
  {
    id: '2',
    nome: 'Ana Paula Mendes',
    empresa: 'Salão Bella Donna',
    segmento: 'Beleza e Estética',
    cidade: 'São Paulo',
    estado: 'SP',
    problema: 'Agenda desorganizada causava conflitos de horário. Clientes não voltavam por falta de follow-up. Não sabia quais serviços davam mais lucro.',
    solucao: 'Sistema de agendamento online com lembretes automáticos, CRM para acompanhamento de clientes e relatórios de rentabilidade por serviço.',
    resultados: [
      { metrica: 'Faltas de Clientes', antes: '25%', depois: '5%', percentual: '-80%' },
      { metrica: 'Clientes Recorrentes', antes: '40%', depois: '72%', percentual: '+80%' },
      { metrica: 'Ticket Médio', antes: 'R$ 85', depois: 'R$ 140', percentual: '+65%' },
    ],
    depoimento: 'O lembrete automático no WhatsApp mudou minha vida. As faltas despencaram e as clientes adoram receber a mensagem. Profissionalismo total!',
    tempoResultado: '30 dias',
    destaque: 'Aumentou ticket em 65%',
    tags: ['serviços', 'agendamento', 'beleza']
  },
  {
    id: '3',
    nome: 'Carlos Eduardo Santos',
    empresa: 'Auto Peças Nacional',
    segmento: 'Autopeças',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    problema: 'Estoque de 15.000 itens impossível de controlar. Vendia peça que não tinha. Perdia vendas por não encontrar produtos. Precificação errada.',
    solucao: 'Cadastro completo de produtos com código de barras, localização no estoque, margem de lucro automática e alerta de estoque mínimo.',
    resultados: [
      { metrica: 'Vendas Perdidas', antes: '~30/dia', depois: '~3/dia', percentual: '-90%' },
      { metrica: 'Margem de Lucro', antes: '18%', depois: '28%', percentual: '+55%' },
      { metrica: 'Tempo p/ Encontrar', antes: '5 min', depois: '10 seg', percentual: '-97%' },
    ],
    depoimento: 'Tinha 15 mil itens e vivia perdido. Agora digito o código e sei se tem, onde está, e qual o preço certo. Minha margem aumentou porque parei de errar preço.',
    tempoResultado: '60 dias',
    destaque: 'De 30 vendas perdidas para 3',
    tags: ['autopeças', 'estoque', 'código de barras']
  },
  {
    id: '4',
    nome: 'Fernanda Costa',
    empresa: 'Pizzaria Bella Itália',
    segmento: 'Alimentação',
    cidade: 'Porto Alegre',
    estado: 'RS',
    problema: 'Delivery desorganizado com pedidos errados. Não sabia custo real das pizzas. Garçons erravam os pedidos na correria.',
    solucao: 'PDV com comanda eletrônica, integração com iFood e Rappi, ficha técnica com custo real de cada pizza.',
    resultados: [
      { metrica: 'Pedidos Errados', antes: '12%', depois: '1%', percentual: '-92%' },
      { metrica: 'Custo Alimento', antes: '42%', depois: '31%', percentual: '-26%' },
      { metrica: 'Vendas Delivery', antes: 'R$ 8k/mês', depois: 'R$ 22k/mês', percentual: '+175%' },
    ],
    depoimento: 'A ficha técnica me mostrou que algumas pizzas davam prejuízo! Ajustei os preços e parei de perder dinheiro. E os pedidos errados acabaram.',
    tempoResultado: '21 dias',
    destaque: 'Delivery cresceu 175%',
    tags: ['alimentação', 'delivery', 'ficha técnica']
  },
  {
    id: '5',
    nome: 'Marcos Oliveira',
    empresa: 'Clínica OdontoVida',
    segmento: 'Saúde',
    cidade: 'Recife',
    estado: 'PE',
    problema: 'Prontuários em papel difíceis de encontrar. Pacientes esqueciam consultas. Não conseguia acompanhar tratamentos longos.',
    solucao: 'Prontuário eletrônico com histórico completo, agenda com confirmação automática, alertas de retorno para tratamentos.',
    resultados: [
      { metrica: 'Faltas', antes: '30%', depois: '8%', percentual: '-73%' },
      { metrica: 'Retorno Pacientes', antes: '45%', depois: '78%', percentual: '+73%' },
      { metrica: 'Faturamento', antes: 'R$ 35k/mês', depois: 'R$ 58k/mês', percentual: '+66%' },
    ],
    depoimento: 'O prontuário eletrônico me dá segurança jurídica. E os lembretes de retorno recuperam pacientes que eu perdia. Meu faturamento disparou.',
    tempoResultado: '40 dias',
    destaque: 'Retorno de pacientes +73%',
    tags: ['saúde', 'prontuário', 'agendamento']
  },
  {
    id: '6',
    nome: 'Juliana Almeida',
    empresa: 'Pet Shop Amigo Fiel',
    segmento: 'Pet Shop',
    cidade: 'Florianópolis',
    estado: 'SC',
    problema: 'Não lembrava histórico dos pets. Banho e tosa desorganizado. Produtos vencendo na prateleira sem perceber.',
    solucao: 'Cadastro completo de pets com histórico, agenda de serviços com fotos antes/depois, controle de validade de produtos.',
    resultados: [
      { metrica: 'Produtos Vencidos', antes: 'R$ 800/mês', depois: 'R$ 50/mês', percentual: '-94%' },
      { metrica: 'Agendamentos', antes: '60/mês', depois: '140/mês', percentual: '+133%' },
      { metrica: 'Ticket Médio', antes: 'R$ 95', depois: 'R$ 165', percentual: '+74%' },
    ],
    depoimento: 'Agora sei o nome do cachorro, a ração que ele come, quando foi a última vacina. Os tutores amam esse cuidado. E nunca mais perdi produto vencido.',
    tempoResultado: '25 dias',
    destaque: 'Agendamentos +133%',
    tags: ['pet shop', 'serviços', 'estoque']
  },
  {
    id: '7',
    nome: 'Ricardo Ferreira',
    empresa: 'Distribuidora Nova Era',
    segmento: 'Distribuição',
    cidade: 'Goiânia',
    estado: 'GO',
    problema: '300 clientes sem controle de pedidos. Vendedores externos sem informação. Comissões calculadas errado. Inadimplência alta.',
    solucao: 'App para vendedores externos com catálogo e pedidos, cálculo automático de comissões, controle de crédito por cliente.',
    resultados: [
      { metrica: 'Pedidos/Vendedor', antes: '15/dia', depois: '28/dia', percentual: '+87%' },
      { metrica: 'Inadimplência', antes: '12%', depois: '3%', percentual: '-75%' },
      { metrica: 'Faturamento', antes: 'R$ 180k/mês', depois: 'R$ 320k/mês', percentual: '+78%' },
    ],
    depoimento: 'Meus vendedores agora têm tudo no celular: preços, estoque, histórico do cliente. E o controle de crédito me salvou de muita inadimplência.',
    tempoResultado: '50 dias',
    destaque: 'Inadimplência caiu 75%',
    tags: ['distribuição', 'vendas externas', 'crédito']
  },
  {
    id: '8',
    nome: 'Patrícia Souza',
    empresa: 'Loja Moda Atual',
    segmento: 'Moda/Vestuário',
    cidade: 'Salvador',
    estado: 'BA',
    problema: 'Não sabia quais peças vendiam mais. Comprava errado e ficava com estoque parado. Trocas e devoluções sem controle.',
    solucao: 'Relatório de curva ABC de produtos, sugestão de compra baseada em vendas, módulo de trocas e devoluções.',
    resultados: [
      { metrica: 'Estoque Parado', antes: '35% do total', depois: '12% do total', percentual: '-66%' },
      { metrica: 'Giro de Estoque', antes: '90 dias', depois: '45 dias', percentual: '-50%' },
      { metrica: 'Margem Líquida', antes: '15%', depois: '24%', percentual: '+60%' },
    ],
    depoimento: 'O relatório de curva ABC mudou minha forma de comprar. Agora sei o que vende e o que encalha. Meu dinheiro parou de ficar preso em estoque.',
    tempoResultado: '35 dias',
    destaque: 'Giro de estoque 2x mais rápido',
    tags: ['moda', 'curva ABC', 'compras']
  },
]

const segmentos = [...new Set(cases.map(c => c.segmento))]
const estados = [...new Set(cases.map(c => c.estado))].sort()

export default function CasesPage() {
  const router = useRouter()
  const [filtroSegmento, setFiltroSegmento] = useState<string>('todos')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [caseSelecionado, setCaseSelecionado] = useState<CaseSucesso | null>(null)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
  }, [router])

  const casesFiltrados = cases.filter(c => {
    if (filtroSegmento !== 'todos' && c.segmento !== filtroSegmento) return false
    if (filtroEstado !== 'todos' && c.estado !== filtroEstado) return false
    return true
  })

  const copiarCase = async (caso: CaseSucesso) => {
    const texto = `
📊 CASE DE SUCESSO: ${caso.empresa}

👤 Cliente: ${caso.nome}
📍 ${caso.cidade}/${caso.estado}
🏢 Segmento: ${caso.segmento}

❌ PROBLEMA:
${caso.problema}

✅ SOLUÇÃO:
${caso.solucao}

📈 RESULTADOS:
${caso.resultados.map(r => `• ${r.metrica}: ${r.antes} → ${r.depois} (${r.percentual})`).join('\n')}

⏱️ Tempo para resultados: ${caso.tempoResultado}

💬 DEPOIMENTO:
"${caso.depoimento}"

---
Use esse caso para mostrar ao cliente que funciona!
`.trim()

    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

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
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Biblioteca de Cases</h1>
            <p className="text-[var(--gray)] text-sm">Histórias reais para usar nas suas vendas</p>
          </div>
        </header>

        {/* Intro */}
        <section className="glass p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2">Como Usar os Cases</h2>
              <p className="text-[var(--gray)] text-sm leading-relaxed">
                Cases de sucesso são sua <strong className="text-white">munição mais poderosa</strong> em vendas.
                Use-os quando o cliente disser "será que funciona pra mim?". Encontre um case do mesmo segmento
                ou com problema similar e mostre que já deu certo com outros.
              </p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--gray)]" />
            <select
              value={filtroSegmento}
              onChange={(e) => setFiltroSegmento(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[var(--gold)]"
            >
              <option value="todos">Todos os Segmentos</option>
              {segmentos.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--gray)]" />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[var(--gold)]"
            >
              <option value="todos">Todos os Estados</option>
              {estados.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-[var(--gray)] text-sm">
            {casesFiltrados.length} cases encontrados
          </div>
        </section>

        {/* Grid de Cases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {casesFiltrados.map((caso) => (
            <div
              key={caso.id}
              className="glass p-5 cursor-pointer hover:border-[var(--gold)]/50 transition-all group"
              onClick={() => setCaseSelecionado(caso)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold group-hover:text-[var(--gold)] transition-colors">
                    {caso.empresa}
                  </h3>
                  <p className="text-[var(--gray)] text-sm">{caso.segmento}</p>
                </div>
                <div className="flex items-center gap-1 text-[var(--gray)] text-xs">
                  <MapPin className="w-3 h-3" />
                  {caso.estado}
                </div>
              </div>

              <div className="bg-green-500/10 rounded-lg p-3 mb-3 border border-green-500/20">
                <p className="text-green-400 font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {caso.destaque}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[var(--gray)] text-xs">
                <Clock className="w-3 h-3" />
                <span>Resultado em {caso.tempoResultado}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {caso.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[var(--gray)] text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal do Case */}
        {caseSelecionado && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setCaseSelecionado(null)}>
            <div className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{caseSelecionado.empresa}</h2>
                  <div className="flex items-center gap-3 text-[var(--gray)] text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {caseSelecionado.nome}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {caseSelecionado.cidade}/{caseSelecionado.estado}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copiarCase(caseSelecionado)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    copiado
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
                  }`}
                >
                  {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiado ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              <div className="space-y-6">
                {/* Problema */}
                <div>
                  <h3 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    O Problema
                  </h3>
                  <p className="text-[var(--gray)] text-sm leading-relaxed">{caseSelecionado.problema}</p>
                </div>

                {/* Solução */}
                <div>
                  <h3 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    A Solução
                  </h3>
                  <p className="text-[var(--gray)] text-sm leading-relaxed">{caseSelecionado.solucao}</p>
                </div>

                {/* Resultados */}
                <div>
                  <h3 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Resultados
                  </h3>
                  <div className="grid gap-3">
                    {caseSelecionado.resultados.map((r, idx) => (
                      <div key={idx} className="bg-black/40 rounded-xl p-4 border border-white/10">
                        <p className="text-white font-medium mb-2">{r.metrica}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-[var(--gray)] text-xs">Antes</p>
                            <p className="text-red-400 font-medium">{r.antes}</p>
                          </div>
                          <div className="text-[var(--gold)]">→</div>
                          <div className="flex-1">
                            <p className="text-[var(--gray)] text-xs">Depois</p>
                            <p className="text-green-400 font-medium">{r.depois}</p>
                          </div>
                          {r.percentual && (
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                              r.percentual.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {r.percentual}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Depoimento */}
                <div className="bg-[var(--gold)]/10 rounded-xl p-5 border border-[var(--gold)]/20">
                  <Quote className="w-8 h-8 text-[var(--gold)]/50 mb-3" />
                  <p className="text-white italic leading-relaxed">"{caseSelecionado.depoimento}"</p>
                  <p className="text-[var(--gold)] font-medium mt-3">— {caseSelecionado.nome}, {caseSelecionado.empresa}</p>
                </div>

                {/* Tempo */}
                <div className="flex items-center gap-3 text-[var(--gray)]">
                  <Clock className="w-5 h-5" />
                  <span>Resultados alcançados em <strong className="text-white">{caseSelecionado.tempoResultado}</strong></span>
                </div>
              </div>

              <button
                onClick={() => setCaseSelecionado(null)}
                className="w-full mt-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">{cases.length}</p>
            <p className="text-[var(--gray)] text-sm">Cases Reais</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">{segmentos.length}</p>
            <p className="text-[var(--gray)] text-sm">Segmentos</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">{estados.length}</p>
            <p className="text-[var(--gray)] text-sm">Estados</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">+60%</p>
            <p className="text-[var(--gray)] text-sm">Média de Crescimento</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Biblioteca de Cases - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
