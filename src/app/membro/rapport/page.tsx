'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Copy, Check, Star, Filter, Users, MessageCircle, Smile, Coffee, Briefcase, Lightbulb } from 'lucide-react'

interface Tecnica {
  id: string
  nome: string
  categoria: string
  descricao: string
  quando: string
  exemplo: string
  dica: string
  icone: React.ReactNode
}

export default function RapportPage() {
  const [filtro, setFiltro] = useState('todos')
  const [copiadoId, setCopiadoId] = useState<string | null>(null)
  const [favoritosIds, setFavoritosIds] = useState<string[]>([])

  const tecnicas: Tecnica[] = [
    {
      id: '1',
      nome: 'Espelhamento Verbal',
      categoria: 'linguagem',
      descricao: 'Repita palavras e expressoes que o cliente usa. Isso cria conexao inconsciente e mostra que voce esta prestando atencao.',
      quando: 'Durante toda a conversa, especialmente ao recapitular',
      exemplo: 'Cliente: "Estou buscando algo mais robusto"\nVoce: "Entendi, voce precisa de uma solucao mais robusta. O que significa robusto para voce?"',
      dica: 'Nao exagere - use 1 a cada 3-4 frases do cliente',
      icone: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '2',
      nome: 'Espelhamento Corporal',
      categoria: 'corporal',
      descricao: 'Sutilmente imite a postura e gestos do cliente. Se ele se inclinar para frente, faca o mesmo. Se cruzar os bracos, aguarde e faca depois.',
      quando: 'Em reunioes presenciais ou video calls',
      exemplo: 'Cliente se inclina para frente com interesse -> voce se inclina tambem alguns segundos depois',
      dica: 'Seja sutil! Espelhamento obvio causa desconforto',
      icone: <Users className="w-5 h-5" />
    },
    {
      id: '3',
      nome: 'Nome do Cliente',
      categoria: 'linguagem',
      descricao: 'Use o nome do cliente 3-4 vezes durante a conversa. O som do proprio nome ativa areas de prazer no cerebro.',
      quando: 'No inicio, ao fazer perguntas importantes, e no fechamento',
      exemplo: '"Joao, antes de continuar, me conta: qual o maior desafio que voce enfrenta hoje?"',
      dica: 'Nao use demais - pode parecer manipulador',
      icone: <Smile className="w-5 h-5" />
    },
    {
      id: '4',
      nome: 'Encontrar Pontos em Comum',
      categoria: 'conexao',
      descricao: 'Identifique interesses, experiencias ou valores compartilhados. Pessoas gostam de quem e parecido com elas.',
      quando: 'No inicio da conversa, durante small talk',
      exemplo: '"Vi no seu LinkedIn que voce trabalhou na XYZ. Eu conheco o fulano de la! Como foi sua experiencia?"',
      dica: 'Pesquise o cliente antes da reuniao',
      icone: <Heart className="w-5 h-5" />
    },
    {
      id: '5',
      nome: 'Validacao Emocional',
      categoria: 'empatia',
      descricao: 'Reconheca e valide os sentimentos do cliente antes de oferecer solucoes. Isso mostra empatia genuina.',
      quando: 'Quando o cliente expressar frustracao ou preocupacao',
      exemplo: '"Imagino como deve ser frustrante lidar com isso todo dia. Faz total sentido voce estar buscando uma alternativa."',
      dica: 'Seja autentico - validacao falsa e pior que nenhuma',
      icone: <Heart className="w-5 h-5" />
    },
    {
      id: '6',
      nome: 'Small Talk Estrategico',
      categoria: 'conexao',
      descricao: 'Comece com conversa leve antes de ir para negocios. Pergunte sobre algo pessoal que voce pesquisou.',
      quando: 'Nos primeiros 2-3 minutos de qualquer reuniao',
      exemplo: '"Antes de comecar, vi que voce postou sobre a viagem para Portugal. Como foi? Estou planejando ir ano que vem!"',
      dica: 'Mantenha breve - 2 a 3 minutos no maximo',
      icone: <Coffee className="w-5 h-5" />
    },
    {
      id: '7',
      nome: 'Escuta Ativa com Confirmacao',
      categoria: 'escuta',
      descricao: 'Demonstre que esta ouvindo com confirmacoes verbais e nao-verbais. Acene, diga "entendi", "faz sentido".',
      quando: 'Sempre que o cliente estiver falando',
      exemplo: '"Hmm, entendi..." (acena) "Isso faz muito sentido..." (anota)',
      dica: 'Faca anotacoes visiveis - mostra que voce valoriza o que ele diz',
      icone: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '8',
      nome: 'Perguntas Sobre a Pessoa',
      categoria: 'conexao',
      descricao: 'Antes de falar de negocios, demonstre interesse genuino pela pessoa, nao so pelo cargo.',
      quando: 'No inicio da relacao, primeira reuniao',
      exemplo: '"Como voce chegou nessa posicao? Qual foi sua trajetoria?"',
      dica: 'Pessoas adoram falar sobre si mesmas',
      icone: <Users className="w-5 h-5" />
    },
    {
      id: '9',
      nome: 'Ritmo de Fala',
      categoria: 'corporal',
      descricao: 'Ajuste sua velocidade de fala para combinar com a do cliente. Rapido com rapidos, calmo com calmos.',
      quando: 'Durante toda a conversa',
      exemplo: 'Cliente fala devagar e pausadamente -> voce diminui seu ritmo naturalmente acelerado',
      dica: 'Preste atencao nos primeiros minutos para calibrar',
      icone: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '10',
      nome: 'Elogio Genuino',
      categoria: 'conexao',
      descricao: 'Faca um elogio especifico e verdadeiro. Evite elogios genericos que parecem bajulacao.',
      quando: 'Quando perceber algo genuinamente impressionante',
      exemplo: '"Gostei muito da forma como voce estruturou a equipe. Poucos conseguem esse nivel de organizacao."',
      dica: 'Seja especifico - "gostei do X" e melhor que "voce e otimo"',
      icone: <Star className="w-5 h-5" />
    },
    {
      id: '11',
      nome: 'Vulnerabilidade Calculada',
      categoria: 'empatia',
      descricao: 'Compartilhe uma dificuldade ou erro que voce teve. Isso humaniza a relacao e gera reciprocidade.',
      quando: 'Quando o cliente compartilhar um problema ou vulnerabilidade',
      exemplo: '"Entendo perfeitamente. No inicio da minha carreira eu tambem passei por algo parecido e foi bem desafiador."',
      dica: 'Nao exagere - uma vulnerabilidade por conversa',
      icone: <Heart className="w-5 h-5" />
    },
    {
      id: '12',
      nome: 'Mencionar Conhecidos em Comum',
      categoria: 'conexao',
      descricao: 'Se voces tem conexoes em comum, mencione. Isso gera confianca por associacao.',
      quando: 'No inicio da conversa, durante apresentacoes',
      exemplo: '"O Marcos da XYZ me indicou voce. Trabalhamos juntos ano passado. Voces se conhecem bem?"',
      dica: 'Peca permissao ao contato em comum antes de mencionar',
      icone: <Users className="w-5 h-5" />
    },
    {
      id: '13',
      nome: 'Humor Leve',
      categoria: 'conexao',
      descricao: 'Use humor sutil para quebrar tensao. Evite piadas - prefira observacoes bem-humoradas.',
      quando: 'Quando a conversa estiver muito seria ou tensa',
      exemplo: '"Sei que ninguem acorda pensando em comprar software de gestao, mas prometo que nao vai doer!" (sorriso)',
      dica: 'Na duvida, nao use. Humor mal colocado destroi rapport',
      icone: <Smile className="w-5 h-5" />
    },
    {
      id: '14',
      nome: 'Demonstrar Conhecimento do Setor',
      categoria: 'expertise',
      descricao: 'Mostre que voce entende o mercado e desafios especificos do setor do cliente.',
      quando: 'Ao discutir problemas e solucoes',
      exemplo: '"No setor de logistica, a gente ve muito isso com a sazonalidade de fim de ano. Como voces lidam?"',
      dica: 'Pesquise tendencias do setor antes da reuniao',
      icone: <Briefcase className="w-5 h-5" />
    },
    {
      id: '15',
      nome: 'Parafrasear e Resumir',
      categoria: 'escuta',
      descricao: 'Repita o que o cliente disse com suas palavras para confirmar entendimento.',
      quando: 'Apos o cliente explicar algo importante',
      exemplo: '"Deixa eu ver se entendi: voce precisa de X para resolver Y, e o principal desafio e Z. Correto?"',
      dica: 'Termine com uma pergunta de confirmacao',
      icone: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '16',
      nome: 'Interesse no Futuro',
      categoria: 'conexao',
      descricao: 'Pergunte sobre planos e aspiracoes. Pessoas gostam de quem se interessa pelo seu futuro.',
      quando: 'Durante discovery ou conversas mais profundas',
      exemplo: '"Onde voce ve a empresa daqui a 2 anos? O que precisa acontecer para chegar la?"',
      dica: 'Isso tambem ajuda a entender motivacoes de compra',
      icone: <Lightbulb className="w-5 h-5" />
    },
  ]

  const categorias = [
    { id: 'todos', nome: 'Todas' },
    { id: 'linguagem', nome: 'Linguagem' },
    { id: 'corporal', nome: 'Corporal' },
    { id: 'conexao', nome: 'Conexao' },
    { id: 'empatia', nome: 'Empatia' },
    { id: 'escuta', nome: 'Escuta' },
    { id: 'expertise', nome: 'Expertise' },
  ]

  const tecnicasFiltradas = tecnicas.filter(t => {
    if (filtro === 'todos') return true
    if (filtro === 'favoritos') return favoritosIds.includes(t.id)
    return t.categoria === filtro
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
            <Heart className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Biblioteca de <span className="gold-text">Rapport</span>
          </h1>
          <p className="text-[var(--gray)]">{tecnicas.length} tecnicas de conexao e quebra-gelo</p>
        </div>

        {/* Filtros */}
        <div className="glass card mb-8">
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

        {/* Lista de Tecnicas */}
        <div className="grid md:grid-cols-2 gap-6">
          {tecnicasFiltradas.map((tecnica) => (
            <div key={tecnica.id} className="glass card animate-fadeInUp">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)]">
                    {tecnica.icone}
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{tecnica.nome}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-[var(--gray)]">
                      {tecnica.categoria}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorito(tecnica.id)}
                  className={`p-2 rounded-lg transition-all ${
                    favoritosIds.includes(tecnica.id)
                      ? 'text-[var(--gold)]'
                      : 'text-[var(--gray)] hover:text-[var(--gold)]'
                  }`}
                >
                  <Star className={`w-5 h-5 ${favoritosIds.includes(tecnica.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-[var(--gray)] text-sm mb-4">{tecnica.descricao}</p>

              <div className="text-xs text-[var(--gray)] mb-4">
                <span className="text-[var(--gold)] font-semibold">Quando usar:</span> {tecnica.quando}
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--gold)] uppercase tracking-wider">Exemplo</span>
                  <button
                    onClick={() => copiarExemplo(tecnica.id, tecnica.exemplo)}
                    className="text-[var(--gray)] hover:text-white flex items-center gap-1 text-xs"
                  >
                    {copiadoId === tecnica.id ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copiar
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-white whitespace-pre-line">{tecnica.exemplo}</p>
              </div>

              <div className="flex items-start gap-2 p-3 bg-[var(--gold)]/10 rounded-lg border border-[var(--gold)]/30">
                <Lightbulb className="w-4 h-4 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--gray)]">
                  <span className="text-[var(--gold)] font-semibold">Dica:</span> {tecnica.dica}
                </p>
              </div>
            </div>
          ))}
        </div>

        {tecnicasFiltradas.length === 0 && (
          <div className="glass card text-center py-12">
            <Filter className="w-12 h-12 mx-auto mb-4 text-[var(--gray)] opacity-50" />
            <p className="text-[var(--gray)]">Nenhuma tecnica encontrada</p>
            <p className="text-sm text-[var(--gray)]">Tente ajustar os filtros</p>
          </div>
        )}

        {/* Dicas Gerais */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Principios do Rapport</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Autenticidade Primeiro</h4>
              <p>Rapport forcado e pior que nenhum. As tecnicas devem parecer naturais, nao ensaiadas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Interesse Genuino</h4>
              <p>Nenhuma tecnica substitui interesse real pela pessoa. Se voce nao se importa, vai transparecer.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Timing e Sutileza</h4>
              <p>Rapport demais no inicio parece forcado. Deixe fluir naturalmente ao longo da conversa.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Personalize</h4>
              <p>Adapte as tecnicas ao seu estilo e ao perfil do cliente. O que funciona com um, pode nao funcionar com outro.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
