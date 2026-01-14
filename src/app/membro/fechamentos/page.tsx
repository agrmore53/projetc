'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, Copy, Check, Star, Filter, Search, Zap, Clock, DollarSign, Users, Shield, Gift } from 'lucide-react'

interface Fechamento {
  id: string
  nome: string
  categoria: string
  quando: string
  descricao: string
  exemplo: string
  dica: string
  eficacia: number
  icone: React.ReactNode
}

export default function FechamentosPage() {
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [copiadoId, setCopiadoId] = useState<string | null>(null)
  const [favoritosIds, setFavoritosIds] = useState<string[]>([])

  const fechamentos: Fechamento[] = [
    {
      id: '1',
      nome: 'Fechamento Alternativo',
      categoria: 'classico',
      quando: 'Cliente demonstra interesse mas hesita na decisao',
      descricao: 'Oferece duas opcoes positivas, ambas levando ao fechamento. Remove a opcao de "nao".',
      exemplo: '"Voce prefere comecar com o plano mensal ou anual? O anual tem 20% de desconto."',
      dica: 'Nunca ofereca uma opcao negativa. Ambas as alternativas devem ser favoraveis.',
      eficacia: 85,
      icone: <Target className="w-5 h-5" />
    },
    {
      id: '2',
      nome: 'Fechamento de Urgencia',
      categoria: 'pressao',
      quando: 'Existe uma promocao ou prazo real',
      descricao: 'Cria senso de urgencia genuino baseado em prazos, estoque ou condicoes especiais.',
      exemplo: '"Essa condicao especial e valida ate sexta-feira. Apos isso, o investimento volta ao valor normal."',
      dica: 'Urgencia falsa destroi confianca. Use apenas quando for real.',
      eficacia: 78,
      icone: <Clock className="w-5 h-5" />
    },
    {
      id: '3',
      nome: 'Fechamento Assumido',
      categoria: 'classico',
      quando: 'O cliente ja deu sinais claros de que vai comprar',
      descricao: 'Age como se a venda ja estivesse fechada, focando nos proximos passos.',
      exemplo: '"Otimo! Para a entrega, voce prefere receber na sua empresa ou em casa?"',
      dica: 'Funciona bem quando o rapport esta alto e os sinais sao positivos.',
      eficacia: 82,
      icone: <Zap className="w-5 h-5" />
    },
    {
      id: '4',
      nome: 'Fechamento por Escassez',
      categoria: 'pressao',
      quando: 'Existe limitacao real de vagas/estoque',
      descricao: 'Destaca a disponibilidade limitada do produto ou servico.',
      exemplo: '"Temos apenas 3 vagas disponíveis para esse mes. Posso reservar a sua agora?"',
      dica: 'Escassez real gera acao. Escassez falsa gera desconfianca.',
      eficacia: 80,
      icone: <Users className="w-5 h-5" />
    },
    {
      id: '5',
      nome: 'Fechamento Ben Franklin',
      categoria: 'racional',
      quando: 'Cliente e analitico e precisa de logica',
      descricao: 'Lista pros e contras junto com o cliente para demonstrar que os beneficios superam objecoes.',
      exemplo: '"Vamos fazer juntos? De um lado os beneficios, do outro as preocupacoes. Veja como os ganhos superam..."',
      dica: 'Funciona muito bem com perfis analiticos e compradores B2B.',
      eficacia: 75,
      icone: <DollarSign className="w-5 h-5" />
    },
    {
      id: '6',
      nome: 'Fechamento por Prova Social',
      categoria: 'influencia',
      quando: 'Cliente precisa de validacao externa',
      descricao: 'Usa depoimentos, casos de sucesso e numeros para gerar confianca.',
      exemplo: '"Mais de 500 empresas ja implementaram essa solucao. A [Empresa X] teve 40% de aumento em vendas."',
      dica: 'Tenha sempre casos prontos do mesmo segmento do cliente.',
      eficacia: 88,
      icone: <Star className="w-5 h-5" />
    },
    {
      id: '7',
      nome: 'Fechamento de Reversao de Risco',
      categoria: 'seguranca',
      quando: 'Cliente tem medo de tomar decisao errada',
      descricao: 'Remove o risco da decisao com garantias, periodos de teste ou devolucao.',
      exemplo: '"Voce tem 30 dias para testar. Se nao gostar por qualquer motivo, devolvemos 100% do seu investimento."',
      dica: 'Garantias aumentam conversao e raramente sao acionadas.',
      eficacia: 90,
      icone: <Shield className="w-5 h-5" />
    },
    {
      id: '8',
      nome: 'Fechamento do Silencio',
      categoria: 'avancado',
      quando: 'Apos apresentar a proposta final',
      descricao: 'Apos fazer a proposta, fique em silencio. Quem fala primeiro, perde.',
      exemplo: '"O investimento e de R$ 5.000. [SILENCIO]"',
      dica: 'Resista a tentacao de preencher o silencio. Deixe o cliente processar.',
      eficacia: 72,
      icone: <Target className="w-5 h-5" />
    },
    {
      id: '9',
      nome: 'Fechamento Puppy Dog',
      categoria: 'experiencia',
      quando: 'O produto/servico se vende sozinho com uso',
      descricao: 'Deixa o cliente experimentar antes de comprar, como um test drive.',
      exemplo: '"Que tal usar por 7 dias gratuitamente? Sem compromisso. Se gostar, a gente fecha."',
      dica: 'Ideal para SaaS, servicos e produtos com alto valor percebido.',
      eficacia: 85,
      icone: <Gift className="w-5 h-5" />
    },
    {
      id: '10',
      nome: 'Fechamento de Resumo',
      categoria: 'classico',
      quando: 'Apos longa apresentacao de beneficios',
      descricao: 'Resume todos os beneficios discutidos e pede a decisao.',
      exemplo: '"Entao, voce tera [beneficio 1], [beneficio 2] e [beneficio 3]. Podemos comecar?"',
      dica: 'Liste apenas os beneficios que o cliente demonstrou valorizar.',
      eficacia: 80,
      icone: <Target className="w-5 h-5" />
    },
    {
      id: '11',
      nome: 'Fechamento da Objecao Final',
      categoria: 'objecao',
      quando: 'Cliente apresenta objecoes repetidamente',
      descricao: 'Isola a objecao final para garantir que nao ha mais barreiras.',
      exemplo: '"Se eu resolver essa questao do parcelamento, fechamos negocio hoje?"',
      dica: 'Garante comprometimento antes de gastar esforco resolvendo objecoes.',
      eficacia: 87,
      icone: <Shield className="w-5 h-5" />
    },
    {
      id: '12',
      nome: 'Fechamento do Custo da Inacao',
      categoria: 'racional',
      quando: 'Cliente procrastina a decisao',
      descricao: 'Mostra quanto o cliente perde por nao agir agora.',
      exemplo: '"Cada mes sem a solucao, voce perde aproximadamente R$ 10.000 em vendas. Em 6 meses sao R$ 60.000."',
      dica: 'Use numeros reais baseados na situacao do cliente.',
      eficacia: 83,
      icone: <DollarSign className="w-5 h-5" />
    },
    {
      id: '13',
      nome: 'Fechamento do Pedido Direto',
      categoria: 'classico',
      quando: 'Sinais de compra estao claros',
      descricao: 'Simplesmente pede a venda de forma direta e confiante.',
      exemplo: '"Vamos fechar? Posso gerar o contrato agora mesmo."',
      dica: 'As vezes o simples e o mais eficaz. Nao complique.',
      eficacia: 76,
      icone: <Zap className="w-5 h-5" />
    },
    {
      id: '14',
      nome: 'Fechamento do Compromisso Menor',
      categoria: 'progressivo',
      quando: 'Cliente resiste a compromisso grande',
      descricao: 'Pede um compromisso menor primeiro para criar momentum.',
      exemplo: '"Antes de fechar o anual, que tal comecar com 1 mes para validar os resultados?"',
      dica: 'Pequenos compromissos levam a grandes compromissos.',
      eficacia: 79,
      icone: <Target className="w-5 h-5" />
    },
    {
      id: '15',
      nome: 'Fechamento do Consultor',
      categoria: 'consultivo',
      quando: 'Venda complexa que requer confianca',
      descricao: 'Posiciona-se como consultor que recomenda a melhor solucao.',
      exemplo: '"Baseado em tudo que voce me contou, minha recomendacao genuina e o plano X. E o que vai gerar mais resultado."',
      dica: 'Funciona quando ha confianca estabelecida e expertise demonstrada.',
      eficacia: 86,
      icone: <Users className="w-5 h-5" />
    },
    {
      id: '16',
      nome: 'Fechamento do Bonus',
      categoria: 'incentivo',
      quando: 'Cliente precisa de um empurrao final',
      descricao: 'Adiciona um bonus exclusivo para quem fecha agora.',
      exemplo: '"Se voce fechar hoje, incluo 3 meses de suporte premium sem custo adicional."',
      dica: 'O bonus deve ter valor percebido alto mas custo baixo para voce.',
      eficacia: 84,
      icone: <Gift className="w-5 h-5" />
    }
  ]

  const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'classico', nome: 'Classicos' },
    { id: 'pressao', nome: 'Urgencia' },
    { id: 'racional', nome: 'Racionais' },
    { id: 'influencia', nome: 'Influencia' },
    { id: 'seguranca', nome: 'Seguranca' },
    { id: 'avancado', nome: 'Avancados' },
  ]

  const fechamentosFiltrados = fechamentos.filter(f => {
    const matchCategoria = filtro === 'todos' || f.categoria === filtro || (filtro === 'favoritos' && favoritosIds.includes(f.id))
    const matchBusca = f.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       f.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  const copiarExemplo = (id: string, texto: string) => {
    navigator.clipboard.writeText(texto)
    setCopiadoId(id)
    setTimeout(() => setCopiadoId(null), 2000)
  }

  const toggleFavorito = (id: string) => {
    if (favoritosIds.includes(id)) {
      setFavoritosIds(favoritosIds.filter(f => f !== id))
    } else {
      setFavoritosIds([...favoritosIds, id])
    }
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
            <Target className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Biblioteca de <span className="gold-text">Fechamentos</span>
          </h1>
          <p className="text-[var(--gray)]">{fechamentos.length} tecnicas de fechamento comprovadas</p>
        </div>

        {/* Filtros */}
        <div className="glass card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--gray)]" />
              <input
                type="text"
                placeholder="Buscar fechamento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFiltro('favoritos')}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-all ${
                  filtro === 'favoritos' ? 'bg-[var(--gold)] text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Star className="w-4 h-4" /> Favoritos
              </button>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFiltro(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filtro === cat.id ? 'bg-[var(--gold)] text-black' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Fechamentos */}
        <div className="space-y-6">
          {fechamentosFiltrados.map((fechamento) => (
            <div key={fechamento.id} className="glass card animate-fadeInUp">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]">
                    {fechamento.icone}
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{fechamento.nome}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-[var(--gray)]">
                      {fechamento.categoria}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorito(fechamento.id)}
                    className={`p-2 rounded-lg transition-all ${
                      favoritosIds.includes(fechamento.id)
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--gray)] hover:text-[var(--gold)]'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${favoritosIds.includes(fechamento.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-[var(--gray)]">Eficacia</p>
                    <p className="font-display text-[var(--gold)]">{fechamento.eficacia}%</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-[var(--gray)] mb-2">
                  <span className="text-white font-semibold">Quando usar:</span> {fechamento.quando}
                </p>
                <p className="text-[var(--gray)]">{fechamento.descricao}</p>
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--gold)] uppercase tracking-wider">Exemplo de Script</span>
                  <button
                    onClick={() => copiarExemplo(fechamento.id, fechamento.exemplo)}
                    className="text-[var(--gray)] hover:text-white flex items-center gap-1 text-sm"
                  >
                    {copiadoId === fechamento.id ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white italic">{fechamento.exemplo}</p>
              </div>

              <div className="flex items-start gap-2 p-3 bg-[var(--gold)]/10 rounded-lg border border-[var(--gold)]/30">
                <Zap className="w-4 h-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--gray)]">
                  <span className="text-[var(--gold)] font-semibold">Dica:</span> {fechamento.dica}
                </p>
              </div>
            </div>
          ))}
        </div>

        {fechamentosFiltrados.length === 0 && (
          <div className="glass card text-center py-12">
            <Filter className="w-12 h-12 mx-auto mb-4 text-[var(--gray)] opacity-50" />
            <p className="text-[var(--gray)]">Nenhum fechamento encontrado</p>
            <p className="text-sm text-[var(--gray)]">Tente ajustar os filtros</p>
          </div>
        )}

        {/* Dicas Gerais */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Regras de Ouro do Fechamento</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">1. Sempre peca a venda</h4>
              <p>70% dos vendedores nunca pedem a venda diretamente. Nao cometa esse erro.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">2. Silencio e poder</h4>
              <p>Apos fazer a proposta, fique em silencio. Deixe o cliente processar.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">3. Objecao nao e rejeicao</h4>
              <p>Objecoes sao pedidos de mais informacao disfarçados. Abrace-as.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">4. Teste diferentes tecnicas</h4>
              <p>O que funciona para um perfil pode nao funcionar para outro. Adapte-se.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
