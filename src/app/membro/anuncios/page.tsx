'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Megaphone, Copy, Check, RefreshCw, Facebook, Search, Instagram, Youtube } from 'lucide-react'

interface Anuncio {
  plataforma: string
  tipo: string
  headline: string
  texto: string
  cta: string
}

export default function AnunciosPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [formData, setFormData] = useState({
    produto: '',
    avatar: '',
    problema: '',
    solucao: '',
    beneficio: '',
    preco: '',
    urgencia: ''
  })

  const templates = {
    facebook: [
      {
        tipo: 'Dor → Solução',
        headline: (d: typeof formData) => `${d.avatar}: Cansado de ${d.problema}?`,
        texto: (d: typeof formData) => `Se você é ${d.avatar.toLowerCase()} e está frustrado com ${d.problema}, eu tenho uma boa notícia.\n\nDescobri um método que permite ${d.solucao.toLowerCase()} de forma simples e prática.\n\n✅ ${d.beneficio}\n✅ Sem complicação\n✅ Resultados reais\n\n${d.urgencia ? `⚠️ ${d.urgencia}` : ''}\n\nClique em "Saiba Mais" e descubra como.`,
        cta: 'Saiba Mais'
      },
      {
        tipo: 'Curiosidade',
        headline: (d: typeof formData) => `O segredo que ${d.avatar.toLowerCase()}s de sucesso usam para ${d.solucao.toLowerCase()}`,
        texto: (d: typeof formData) => `Por que alguns ${d.avatar.toLowerCase()}s conseguem ${d.solucao.toLowerCase()} enquanto outros ficam travados?\n\nA resposta está em um método que poucos conhecem.\n\nEu passei anos estudando isso e agora quero compartilhar com você.\n\n🎯 ${d.beneficio}\n\nClique no link e descubra o método completo.`,
        cta: 'Ver Método'
      },
      {
        tipo: 'Prova Social',
        headline: (d: typeof formData) => `Como [X] pessoas já conseguiram ${d.solucao.toLowerCase()}`,
        texto: (d: typeof formData) => `"Eu achava que era impossível ${d.solucao.toLowerCase()}, mas com o ${d.produto} tudo mudou."\n\nEsse é o depoimento de um dos nossos alunos.\n\nE você pode ter o mesmo resultado.\n\n✅ Método testado e comprovado\n✅ ${d.beneficio}\n✅ Suporte completo\n\n${d.preco ? `💰 Investimento: ${d.preco}` : ''}\n\nClique e comece sua transformação hoje.`,
        cta: 'Quero Começar'
      },
      {
        tipo: 'Pergunta Direta',
        headline: (d: typeof formData) => `Você quer ${d.solucao.toLowerCase()}?`,
        texto: (d: typeof formData) => `Se você respondeu SIM, preste atenção.\n\nCriei o ${d.produto} especialmente para ${d.avatar.toLowerCase()} que quer ${d.solucao.toLowerCase()} de uma vez por todas.\n\nO que você vai aprender:\n\n📌 Como resolver ${d.problema} definitivamente\n📌 ${d.beneficio}\n📌 Passo a passo prático\n\n${d.urgencia || 'Vagas limitadas!'}\n\nClique agora e garanta sua vaga.`,
        cta: 'Garantir Vaga'
      }
    ],
    google: [
      {
        tipo: 'Busca - Problema',
        headline: (d: typeof formData) => `${d.problema.charAt(0).toUpperCase() + d.problema.slice(1)}? Resolvemos`,
        texto: (d: typeof formData) => `Solução definitiva para ${d.avatar.toLowerCase()}. ${d.beneficio}. ${d.urgencia || 'Comece hoje mesmo!'}`,
        cta: 'Ver Solução'
      },
      {
        tipo: 'Busca - Solução',
        headline: (d: typeof formData) => `Como ${d.solucao} | Método Comprovado`,
        texto: (d: typeof formData) => `${d.produto} - O método que ${d.avatar.toLowerCase()} usa para ter resultados. ${d.preco ? d.preco : 'Consulte valores.'}`,
        cta: 'Conhecer'
      },
      {
        tipo: 'Busca - Produto',
        headline: (d: typeof formData) => `${d.produto} | ${d.beneficio}`,
        texto: (d: typeof formData) => `Para ${d.avatar.toLowerCase()} que quer ${d.solucao.toLowerCase()}. Resultados garantidos. ${d.urgencia || ''}`,
        cta: 'Acessar'
      }
    ],
    instagram: [
      {
        tipo: 'Stories - Direto',
        headline: (d: typeof formData) => `${d.avatar.toUpperCase()}! 👆`,
        texto: (d: typeof formData) => `Você está cansado de ${d.problema}?\n\nDesliza pra cima e descobre como ${d.solucao.toLowerCase()} 🚀`,
        cta: 'Deslizar'
      },
      {
        tipo: 'Feed - Carrossel',
        headline: (d: typeof formData) => `[SLIDE 1] ${d.problema.toUpperCase()}? 😤`,
        texto: (d: typeof formData) => `[SLIDE 1] ${d.problema.toUpperCase()}? 😤\n\n[SLIDE 2] Você já tentou de tudo e nada funciona?\n\n[SLIDE 3] O problema não é você. É o método.\n\n[SLIDE 4] Apresento: ${d.produto} ✨\n\n[SLIDE 5] Com ele você vai:\n✅ ${d.beneficio}\n✅ ${d.solucao}\n\n[SLIDE 6] Link na bio 👆`,
        cta: 'Link na Bio'
      },
      {
        tipo: 'Reels - Hook',
        headline: (d: typeof formData) => `POV: Você descobriu como ${d.solucao.toLowerCase()} 🤯`,
        texto: (d: typeof formData) => `[GANCHO - 3 seg]\n"Se você é ${d.avatar.toLowerCase()}, PARA TUDO"\n\n[DESENVOLVIMENTO - 10 seg]\n"Eu descobri um método que permite ${d.solucao.toLowerCase()} sem ${d.problema}"\n\n[CTA - 3 seg]\n"Link na bio pra você conhecer"`,
        cta: 'Link na Bio'
      }
    ],
    youtube: [
      {
        tipo: 'In-Stream (Pular)',
        headline: (d: typeof formData) => `Ei, ${d.avatar.toLowerCase()}! Não pula esse anúncio.`,
        texto: (d: typeof formData) => `[0-5 seg] "Ei, ${d.avatar.toLowerCase()}! Se você está cansado de ${d.problema}, NÃO pula esse anúncio."\n\n[5-15 seg] "Eu vou te mostrar como ${d.solucao.toLowerCase()} em poucos passos."\n\n[15-25 seg] "Com o ${d.produto} você vai ter ${d.beneficio.toLowerCase()}."\n\n[25-30 seg] "Clica no link agora e começa hoje mesmo."`,
        cta: 'Clique Aqui'
      },
      {
        tipo: 'Discovery',
        headline: (d: typeof formData) => `Como ${d.solucao} (${d.avatar})`,
        texto: (d: typeof formData) => `Neste vídeo você vai descobrir o método exato para ${d.solucao.toLowerCase()}. Ideal para ${d.avatar.toLowerCase()} que quer ${d.beneficio.toLowerCase()}.`,
        cta: 'Assistir'
      }
    ]
  }

  const gerarAnuncios = () => {
    setLoading(true)

    const novosAnuncios: Anuncio[] = []

    // Facebook
    templates.facebook.forEach(t => {
      novosAnuncios.push({
        plataforma: 'Facebook',
        tipo: t.tipo,
        headline: t.headline(formData),
        texto: t.texto(formData),
        cta: t.cta
      })
    })

    // Google
    templates.google.forEach(t => {
      novosAnuncios.push({
        plataforma: 'Google',
        tipo: t.tipo,
        headline: t.headline(formData),
        texto: t.texto(formData),
        cta: t.cta
      })
    })

    // Instagram
    templates.instagram.forEach(t => {
      novosAnuncios.push({
        plataforma: 'Instagram',
        tipo: t.tipo,
        headline: t.headline(formData),
        texto: t.texto(formData),
        cta: t.cta
      })
    })

    // YouTube
    templates.youtube.forEach(t => {
      novosAnuncios.push({
        plataforma: 'YouTube',
        tipo: t.tipo,
        headline: t.headline(formData),
        texto: t.texto(formData),
        cta: t.cta
      })
    })

    setTimeout(() => {
      setAnuncios(novosAnuncios)
      setLoading(false)
    }, 800)
  }

  const copyAnuncio = (anuncio: Anuncio, index: number) => {
    const texto = `HEADLINE:\n${anuncio.headline}\n\nTEXTO:\n${anuncio.texto}\n\nCTA: ${anuncio.cta}`
    navigator.clipboard.writeText(texto)
    setCopied(`${index}`)
    setTimeout(() => setCopied(null), 2000)
  }

  const getPlataformaIcon = (plataforma: string) => {
    switch(plataforma) {
      case 'Facebook': return <Facebook className="w-5 h-5" />
      case 'Google': return <Search className="w-5 h-5" />
      case 'Instagram': return <Instagram className="w-5 h-5" />
      case 'YouTube': return <Youtube className="w-5 h-5" />
      default: return <Megaphone className="w-5 h-5" />
    }
  }

  const getPlataformaCor = (plataforma: string) => {
    switch(plataforma) {
      case 'Facebook': return 'bg-blue-600'
      case 'Google': return 'bg-red-500'
      case 'Instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'YouTube': return 'bg-red-600'
      default: return 'bg-[var(--gold)]'
    }
  }

  const [filtroPlataforma, setFiltroPlataforma] = useState('todos')

  const anunciosFiltrados = anuncios.filter(a =>
    filtroPlataforma === 'todos' || a.plataforma.toLowerCase() === filtroPlataforma
  )

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
            <Megaphone className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Anúncios</span>
          </h1>
          <p className="text-[var(--gray)]">Copies prontas para Facebook, Google, Instagram e YouTube</p>
        </div>

        {anuncios.length === 0 ? (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Informações do Produto/Serviço</h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Nome do Produto/Serviço</label>
                  <input
                    type="text"
                    value={formData.produto}
                    onChange={(e) => setFormData({...formData, produto: e.target.value})}
                    placeholder="Ex: Método XYZ, Curso ABC..."
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Público-alvo (Avatar)</label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    placeholder="Ex: Empreendedor, Vendedor, Mãe..."
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Problema/Dor Principal</label>
                <input
                  type="text"
                  value={formData.problema}
                  onChange={(e) => setFormData({...formData, problema: e.target.value})}
                  placeholder="Ex: não conseguir vender, perder tempo com tarefas..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Solução/Transformação</label>
                <input
                  type="text"
                  value={formData.solucao}
                  onChange={(e) => setFormData({...formData, solucao: e.target.value})}
                  placeholder="Ex: vender todos os dias, automatizar processos..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Benefício Principal</label>
                <input
                  type="text"
                  value={formData.beneficio}
                  onChange={(e) => setFormData({...formData, beneficio: e.target.value})}
                  placeholder="Ex: Resultados em 30 dias, Método simples..."
                  className="input-field"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Preço (opcional)</label>
                  <input
                    type="text"
                    value={formData.preco}
                    onChange={(e) => setFormData({...formData, preco: e.target.value})}
                    placeholder="Ex: R$ 497, 12x de R$ 49,70..."
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Urgência (opcional)</label>
                  <input
                    type="text"
                    value={formData.urgencia}
                    onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                    placeholder="Ex: Só até sexta, Últimas vagas..."
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={gerarAnuncios}
              disabled={!formData.produto || !formData.avatar || !formData.problema || !formData.solucao || loading}
              className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Megaphone className="w-5 h-5" />
                  Gerar 13 Anúncios
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            {/* Header */}
            <div className="glass p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl gold-text">{anuncios.length} Anúncios Gerados</h2>
                  <p className="text-sm text-[var(--gray)]">Para: {formData.produto}</p>
                </div>
                <button
                  onClick={() => setAnuncios([])}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Gerar Novos
                </button>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['todos', 'facebook', 'google', 'instagram', 'youtube'].map(p => (
                  <button
                    key={p}
                    onClick={() => setFiltroPlataforma(p)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      filtroPlataforma === p
                        ? 'bg-[var(--gold)] text-black'
                        : 'bg-white/10 text-[var(--gray)] hover:bg-white/20'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Anúncios */}
            <div className="grid md:grid-cols-2 gap-4">
              {anunciosFiltrados.map((anuncio, index) => (
                <div key={index} className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getPlataformaCor(anuncio.plataforma)}`}>
                        {getPlataformaIcon(anuncio.plataforma)}
                      </div>
                      <div>
                        <h3 className="font-display">{anuncio.plataforma}</h3>
                        <p className="text-xs text-[var(--gray)]">{anuncio.tipo}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyAnuncio(anuncio, index)}
                      className="btn-secondary p-2"
                    >
                      {copied === `${index}` ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-1">Headline</p>
                      <p className="font-semibold">{anuncio.headline}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-1">Texto</p>
                      <p className="text-sm text-[var(--gray)] whitespace-pre-line">{anuncio.texto}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <span className="bg-[var(--gold)] text-black px-3 py-1 rounded-full text-sm font-semibold">
                        {anuncio.cta}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dicas */}
            <div className="glass p-6 mt-6 border border-[var(--gold)]/30">
              <h3 className="font-display text-lg gold-text mb-3">💡 Dicas para Melhores Resultados</h3>
              <ul className="text-sm text-[var(--gray)] space-y-2">
                <li>• <strong>Facebook/Instagram:</strong> Use imagens chamativas e teste vários criativos</li>
                <li>• <strong>Google:</strong> Inclua palavras-chave relevantes na headline</li>
                <li>• <strong>YouTube:</strong> Os primeiros 5 segundos são cruciais - não desperdice</li>
                <li>• <strong>Geral:</strong> Faça testes A/B com diferentes headlines e CTAs</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
