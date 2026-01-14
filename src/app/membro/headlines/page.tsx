'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Type, Copy, Check, RefreshCw, Sparkles, Target, Zap, AlertTriangle, Gift, Clock } from 'lucide-react'

interface HeadlineTemplate {
  categoria: string
  template: string
  exemplo: string
}

const templates: HeadlineTemplate[] = [
  // Curiosidade
  { categoria: 'Curiosidade', template: 'O segredo que [AVATAR] usam para [BENEFÍCIO]', exemplo: 'O segredo que milionários usam para multiplicar seu dinheiro' },
  { categoria: 'Curiosidade', template: 'Por que [NÚMERO]% dos [AVATAR] falham em [OBJETIVO]', exemplo: 'Por que 90% dos empreendedores falham nos primeiros 2 anos' },
  { categoria: 'Curiosidade', template: 'O que [AUTORIDADE] não quer que você saiba sobre [TEMA]', exemplo: 'O que os bancos não querem que você saiba sobre investimentos' },
  { categoria: 'Curiosidade', template: 'A verdade chocante sobre [TEMA] que ninguém conta', exemplo: 'A verdade chocante sobre dietas que ninguém conta' },
  { categoria: 'Curiosidade', template: 'Descobri [BENEFÍCIO] fazendo isso por [TEMPO]', exemplo: 'Descobri como dobrar minhas vendas fazendo isso por 30 dias' },

  // Números
  { categoria: 'Números', template: '[NÚMERO] maneiras de [BENEFÍCIO] sem [DOR]', exemplo: '7 maneiras de ganhar dinheiro sem sair de casa' },
  { categoria: 'Números', template: 'Como [VERBO] [NÚMERO]x mais [RESULTADO] em [TEMPO]', exemplo: 'Como gerar 3x mais leads em 30 dias' },
  { categoria: 'Números', template: '[NÚMERO] erros que estão te impedindo de [OBJETIVO]', exemplo: '5 erros que estão te impedindo de vender mais' },
  { categoria: 'Números', template: 'De R$ [NÚMERO] para R$ [NÚMERO]: minha história de [TEMPO]', exemplo: 'De R$ 0 para R$ 100k: minha história de 12 meses' },
  { categoria: 'Números', template: '[NÚMERO] passos simples para [BENEFÍCIO]', exemplo: '3 passos simples para criar seu primeiro funil de vendas' },

  // Como
  { categoria: 'Como', template: 'Como [BENEFÍCIO] mesmo sem [OBJEÇÃO]', exemplo: 'Como vender online mesmo sem ter produto próprio' },
  { categoria: 'Como', template: 'Como [AVATAR] consegue [BENEFÍCIO] em [TEMPO]', exemplo: 'Como iniciantes conseguem sua primeira venda em 7 dias' },
  { categoria: 'Como', template: 'Como eu [RESULTADO] e você também pode', exemplo: 'Como eu faturei R$ 50k em um mês e você também pode' },
  { categoria: 'Como', template: 'Como transformar [DOR] em [BENEFÍCIO]', exemplo: 'Como transformar rejeição em vendas' },
  { categoria: 'Como', template: 'Como [BENEFÍCIO] usando apenas [RECURSO SIMPLES]', exemplo: 'Como criar uma empresa usando apenas seu celular' },

  // Urgência
  { categoria: 'Urgência', template: 'Última chance: [OFERTA] acaba em [TEMPO]', exemplo: 'Última chance: 50% de desconto acaba em 24 horas' },
  { categoria: 'Urgência', template: 'Só hoje: [BENEFÍCIO] por [PREÇO]', exemplo: 'Só hoje: acesso vitalício por R$ 97' },
  { categoria: 'Urgência', template: 'Vagas limitadas: apenas [NÚMERO] disponíveis', exemplo: 'Vagas limitadas: apenas 20 disponíveis' },
  { categoria: 'Urgência', template: 'Antes que seja tarde: [BENEFÍCIO]', exemplo: 'Antes que seja tarde: garanta sua vaga na mentoria' },
  { categoria: 'Urgência', template: '[TEMPO] para você [BENEFÍCIO]', exemplo: '48 horas para você garantir o bônus exclusivo' },

  // Prova Social
  { categoria: 'Prova Social', template: 'Como [NÚMERO] pessoas já [RESULTADO]', exemplo: 'Como 10.000 pessoas já transformaram suas vidas' },
  { categoria: 'Prova Social', template: '[NOME] conseguiu [RESULTADO]. Você também pode.', exemplo: 'João conseguiu R$ 20k em vendas. Você também pode.' },
  { categoria: 'Prova Social', template: 'O método que [AUTORIDADE] usa para [BENEFÍCIO]', exemplo: 'O método que empresários de sucesso usam para escalar' },
  { categoria: 'Prova Social', template: 'Por que [NÚMERO] empresas escolheram [PRODUTO]', exemplo: 'Por que 500 empresas escolheram nossa plataforma' },
  { categoria: 'Prova Social', template: 'Avaliado com [NÚMERO] estrelas por [NÚMERO]+ clientes', exemplo: 'Avaliado com 4.9 estrelas por 2.000+ clientes' },

  // Problema/Dor
  { categoria: 'Problema', template: 'Cansado de [DOR]? Descubra como [BENEFÍCIO]', exemplo: 'Cansado de não vender? Descubra como fechar 10x mais' },
  { categoria: 'Problema', template: 'Pare de [DOR] e comece a [BENEFÍCIO]', exemplo: 'Pare de perder tempo e comece a automatizar suas vendas' },
  { categoria: 'Problema', template: '[DOR]? Esse é o motivo (e a solução)', exemplo: 'Leads que não respondem? Esse é o motivo (e a solução)' },
  { categoria: 'Problema', template: 'O erro fatal que está matando seu [ÁREA]', exemplo: 'O erro fatal que está matando seu faturamento' },
  { categoria: 'Problema', template: 'Chega de [DOR]. Hora de [BENEFÍCIO]', exemplo: 'Chega de trabalhar sem lucro. Hora de escalar.' },

  // Benefício Direto
  { categoria: 'Benefício', template: '[BENEFÍCIO] garantido ou seu dinheiro de volta', exemplo: 'Resultados garantidos ou seu dinheiro de volta' },
  { categoria: 'Benefício', template: 'Finalmente: [BENEFÍCIO] de forma simples', exemplo: 'Finalmente: vendas online de forma simples' },
  { categoria: 'Benefício', template: 'A maneira mais fácil de [BENEFÍCIO]', exemplo: 'A maneira mais fácil de criar landing pages' },
  { categoria: 'Benefício', template: '[BENEFÍCIO] sem [OBJEÇÃO] e sem [OBJEÇÃO]', exemplo: 'Renda extra sem investir e sem sair de casa' },
  { categoria: 'Benefício', template: 'Imagine [CENÁRIO DESEJADO]', exemplo: 'Imagine acordar e ver vendas no automático' },

  // Pergunta
  { categoria: 'Pergunta', template: 'Você comete esse erro em [ÁREA]?', exemplo: 'Você comete esse erro nas suas vendas?' },
  { categoria: 'Pergunta', template: 'Quer [BENEFÍCIO]? Então leia isso.', exemplo: 'Quer faturar R$ 10k por mês? Então leia isso.' },
  { categoria: 'Pergunta', template: 'Por que você ainda não [BENEFÍCIO]?', exemplo: 'Por que você ainda não tem um negócio online?' },
  { categoria: 'Pergunta', template: 'Já pensou em [BENEFÍCIO]?', exemplo: 'Já pensou em viver de internet?' },
  { categoria: 'Pergunta', template: 'E se você pudesse [BENEFÍCIO]?', exemplo: 'E se você pudesse trabalhar de qualquer lugar?' },

  // Novidade
  { categoria: 'Novidade', template: 'NOVO: [PRODUTO] que [BENEFÍCIO]', exemplo: 'NOVO: método que triplica suas vendas' },
  { categoria: 'Novidade', template: 'Apresentando: a revolução em [ÁREA]', exemplo: 'Apresentando: a revolução em marketing digital' },
  { categoria: 'Novidade', template: 'Descubra o novo jeito de [BENEFÍCIO]', exemplo: 'Descubra o novo jeito de atrair clientes' },
  { categoria: 'Novidade', template: 'Lançamento: [PRODUTO] para [AVATAR]', exemplo: 'Lançamento: mentoria exclusiva para iniciantes' },
  { categoria: 'Novidade', template: 'A nova tendência que está [RESULTADO]', exemplo: 'A nova tendência que está multiplicando vendas' },

  // Autoridade
  { categoria: 'Autoridade', template: '[NÚMERO] anos de experiência em [ÁREA] resumidos', exemplo: '15 anos de experiência em vendas resumidos' },
  { categoria: 'Autoridade', template: 'O guia definitivo para [OBJETIVO]', exemplo: 'O guia definitivo para criar seu SaaS' },
  { categoria: 'Autoridade', template: 'Tudo que você precisa saber sobre [TEMA]', exemplo: 'Tudo que você precisa saber sobre precificação' },
  { categoria: 'Autoridade', template: 'A fórmula comprovada para [BENEFÍCIO]', exemplo: 'A fórmula comprovada para fechar vendas complexas' },
  { categoria: 'Autoridade', template: 'O método [NOME] de [BENEFÍCIO]', exemplo: 'O método Elite de escalada de negócios' },
]

const categorias = [
  { id: 'todos', nome: 'Todos', icone: Sparkles },
  { id: 'Curiosidade', nome: 'Curiosidade', icone: Zap },
  { id: 'Números', nome: 'Números', icone: Target },
  { id: 'Como', nome: 'Como Fazer', icone: Target },
  { id: 'Urgência', nome: 'Urgência', icone: Clock },
  { id: 'Prova Social', nome: 'Prova Social', icone: Target },
  { id: 'Problema', nome: 'Problema/Dor', icone: AlertTriangle },
  { id: 'Benefício', nome: 'Benefício', icone: Gift },
  { id: 'Pergunta', nome: 'Pergunta', icone: Target },
  { id: 'Novidade', nome: 'Novidade', icone: Sparkles },
  { id: 'Autoridade', nome: 'Autoridade', icone: Target },
]

export default function HeadlinesPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [copied, setCopied] = useState<string | null>(null)
  const [geradas, setGeradas] = useState<string[]>([])
  const [formData, setFormData] = useState({
    avatar: '',
    beneficio: '',
    dor: '',
    numero: '',
    tempo: ''
  })

  const filtradas = templates.filter(t =>
    categoriaAtiva === 'todos' || t.categoria === categoriaAtiva
  )

  const copyHeadline = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const gerarHeadlines = () => {
    const novas = templates.map(t => {
      let headline = t.template
      headline = headline.replace('[AVATAR]', formData.avatar || 'pessoas')
      headline = headline.replace('[BENEFÍCIO]', formData.beneficio || 'ter sucesso')
      headline = headline.replace('[DOR]', formData.dor || 'problemas')
      headline = headline.replace('[NÚMERO]', formData.numero || '7')
      headline = headline.replace('[TEMPO]', formData.tempo || '30 dias')
      headline = headline.replace('[RESULTADO]', formData.beneficio || 'resultados')
      headline = headline.replace('[OBJETIVO]', formData.beneficio || 'seus objetivos')
      headline = headline.replace('[TEMA]', formData.beneficio || 'esse assunto')
      headline = headline.replace('[ÁREA]', formData.beneficio || 'seu negócio')
      headline = headline.replace('[OBJEÇÃO]', formData.dor || 'dificuldades')
      headline = headline.replace('[PRODUTO]', 'método')
      headline = headline.replace('[AUTORIDADE]', 'especialistas')
      headline = headline.replace('[NOME]', 'Elite')
      headline = headline.replace('[OFERTA]', 'essa oferta')
      headline = headline.replace('[PREÇO]', 'preço especial')
      headline = headline.replace('[VERBO]', 'conseguir')
      headline = headline.replace('[RECURSO SIMPLES]', 'o que você já tem')
      headline = headline.replace('[CENÁRIO DESEJADO]', formData.beneficio || 'realizar seus sonhos')
      return headline
    })
    setGeradas(novas.slice(0, 20))
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
            <Type className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Headlines</span>
          </h1>
          <p className="text-[var(--gray)]">{templates.length} templates de headlines magnéticas</p>
        </div>

        {/* Gerador Personalizado */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            Gerar Headlines Personalizadas
          </h2>

          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="input-label text-xs">Seu Avatar</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                placeholder="empreendedores"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="input-label text-xs">Benefício</label>
              <input
                type="text"
                value={formData.beneficio}
                onChange={(e) => setFormData({...formData, beneficio: e.target.value})}
                placeholder="vender mais"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="input-label text-xs">Dor/Problema</label>
              <input
                type="text"
                value={formData.dor}
                onChange={(e) => setFormData({...formData, dor: e.target.value})}
                placeholder="falta de vendas"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="input-label text-xs">Número</label>
              <input
                type="text"
                value={formData.numero}
                onChange={(e) => setFormData({...formData, numero: e.target.value})}
                placeholder="7"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="input-label text-xs">Tempo</label>
              <input
                type="text"
                value={formData.tempo}
                onChange={(e) => setFormData({...formData, tempo: e.target.value})}
                placeholder="30 dias"
                className="input-field text-sm"
              />
            </div>
          </div>

          <button
            onClick={gerarHeadlines}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Gerar 20 Headlines
          </button>

          {geradas.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="font-display text-sm text-[var(--gold)]">Headlines Geradas:</h3>
              {geradas.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-black/30 rounded-lg group"
                >
                  <span className="text-sm">{h}</span>
                  <button
                    onClick={() => copyHeadline(h, `gen-${i}`)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copied === `gen-${i}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[var(--gray)]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                categoriaAtiva === cat.id
                  ? 'bg-[var(--gold)] text-black'
                  : 'bg-white/10 text-[var(--gray)] hover:bg-white/20'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Templates */}
        <div className="space-y-3">
          {filtradas.map((t, i) => (
            <div
              key={i}
              className="glass p-4 hover:border-[var(--gold)]/50 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-0.5 rounded">
                      {t.categoria}
                    </span>
                  </div>
                  <p className="font-semibold mb-1">{t.template}</p>
                  <p className="text-sm text-[var(--gray)] italic">Ex: {t.exemplo}</p>
                </div>
                <button
                  onClick={() => copyHeadline(t.template, `tpl-${i}`)}
                  className="btn-secondary p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied === `tpl-${i}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-3">💡 Dicas para Headlines que Convertem</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">O que funciona:</h4>
              <ul className="space-y-1">
                <li>✅ Números específicos (7, 21, 347)</li>
                <li>✅ Palavras de poder (Novo, Grátis, Secreto)</li>
                <li>✅ Perguntas que geram curiosidade</li>
                <li>✅ Benefícios claros e tangíveis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">O que evitar:</h4>
              <ul className="space-y-1">
                <li>❌ Headlines muito longas (+10 palavras)</li>
                <li>❌ Promessas impossíveis de cumprir</li>
                <li>❌ Jargões técnicos demais</li>
                <li>❌ Falta de clareza sobre o benefício</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
