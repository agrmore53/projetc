'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Copy, Check, RefreshCw } from 'lucide-react'

export default function CopySocialPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    tipo: 'instagram',
    objetivo: 'engajamento',
    tom: 'casual',
    tema: '',
    cta: '',
    emojis: true
  })

  const [copyGerada, setCopyGerada] = useState('')

  const tipos = [
    { value: 'instagram', label: 'Instagram Post' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'stories', label: 'Stories' },
  ]

  const objetivos = [
    { value: 'engajamento', label: 'Engajamento (curtidas, comentarios)' },
    { value: 'educativo', label: 'Educativo (ensinar algo)' },
    { value: 'venda', label: 'Venda (promover produto)' },
    { value: 'autoridade', label: 'Autoridade (posicionamento)' },
    { value: 'comunidade', label: 'Comunidade (conexao)' },
  ]

  const tons = [
    { value: 'casual', label: 'Casual e descontraido' },
    { value: 'profissional', label: 'Profissional' },
    { value: 'inspiracional', label: 'Inspiracional' },
    { value: 'urgente', label: 'Urgente/Escassez' },
    { value: 'storytelling', label: 'Storytelling' },
  ]

  const templates = {
    instagram: {
      engajamento: [
        "🔥 {tema}\n\nVoce concorda? Comenta aqui 👇\n\n{cta}\n\n#marketing #negocios #empreendedorismo",
        "Isso mudou minha perspectiva sobre {tema} 💡\n\nSalva esse post pra nao esquecer!\n\n{cta}",
        "POV: Voce finalmente entendeu {tema} ✨\n\nMarca aquele amigo que precisa ver isso!\n\n{cta}"
      ],
      educativo: [
        "📚 {tema}\n\nAqui esta o passo a passo:\n\n1️⃣ Primeiro passo\n2️⃣ Segundo passo\n3️⃣ Terceiro passo\n\nSalva pra aplicar depois! 💾\n\n{cta}",
        "Voce sabia que {tema}? 🤔\n\nA maioria das pessoas nao sabe disso.\n\nCompartilha nos stories pra ajudar mais gente!\n\n{cta}"
      ],
      venda: [
        "🚀 {tema}\n\nIsso e pra voce se:\n✅ Primeiro ponto\n✅ Segundo ponto\n✅ Terceiro ponto\n\n{cta}\n\n🔗 Link na bio",
        "⚡ Ultimas vagas para {tema}\n\nO que voce vai aprender:\n• Beneficio 1\n• Beneficio 2\n• Beneficio 3\n\n{cta}"
      ],
      autoridade: [
        "Depois de [X anos] trabalhando com {tema}, aprendi que...\n\nA verdade que ninguem te conta:\n\n[Insight principal]\n\nConcorda? Discorda? Comenta sua opiniao 💬",
        "3 erros que vejo todo dia sobre {tema}:\n\n❌ Erro 1\n❌ Erro 2\n❌ Erro 3\n\nQual desses voce ja cometeu?\n\n{cta}"
      ],
      comunidade: [
        "Posso ser honesto com voces? 💭\n\n{tema}\n\nQuem mais se identifica? Comenta 'eu' aqui embaixo 👇\n\n{cta}",
        "Isso e pra voce que esta passando por {tema}...\n\nVoce nao esta sozinho(a) nessa jornada. ❤️\n\n{cta}"
      ]
    },
    linkedin: {
      engajamento: [
        "{tema}\n\nIsso me fez refletir sobre como abordamos [assunto] no ambiente corporativo.\n\nE voce, o que pensa sobre isso?\n\n{cta}\n\n#lideranca #carreira #desenvolvimentoprofissional",
        "Uma reflexao sobre {tema}:\n\nO mercado esta mudando. Quem nao se adaptar, ficara para tras.\n\nConcorda? Deixe sua opiniao nos comentarios.\n\n{cta}"
      ],
      educativo: [
        "📊 {tema}\n\nAqui estao os principais insights:\n\n→ Ponto 1\n→ Ponto 2\n→ Ponto 3\n\nSalve este post para referencia futura.\n\n{cta}",
        "O que aprendi sobre {tema} em [X] anos de experiencia:\n\n1. Licao 1\n2. Licao 2\n3. Licao 3\n\nQual dessas ressoa mais com voce?\n\n{cta}"
      ],
      venda: [
        "Resultado de cliente: {tema}\n\n📈 Antes: [situacao anterior]\n📈 Depois: [resultado alcancado]\n\nQuer saber como replicar isso no seu negocio?\n\n{cta}",
        "Estamos com vagas abertas para {tema}\n\nO que oferecemos:\n✅ Beneficio 1\n✅ Beneficio 2\n✅ Beneficio 3\n\n{cta}"
      ],
      autoridade: [
        "Controverso, mas precisa ser dito:\n\n{tema}\n\nA industria precisa evoluir nesse aspecto.\n\nSua opiniao?\n\n{cta}",
        "Apos [X] projetos em {tema}, percebi um padrao:\n\n[Insight principal]\n\nIsso muda completamente a forma como abordamos [assunto].\n\n{cta}"
      ],
      comunidade: [
        "Para minha rede que trabalha com {tema}:\n\nQual o maior desafio que voces enfrentam hoje?\n\nQuero ouvir de voces para criar conteudo que realmente ajude.\n\n{cta}",
        "Gratidao a todos que fazem parte dessa jornada em {tema}.\n\nCada conexao aqui me ensina algo novo.\n\n{cta}"
      ]
    },
    twitter: {
      engajamento: [
        "{tema}\n\nConcorda ou discorda? 👇",
        "Hot take: {tema}\n\nRT se voce concorda",
        "A verdade sobre {tema} que ninguem fala:\n\n🧵"
      ],
      educativo: [
        "Thread sobre {tema} 🧵\n\n1/ [Primeiro ponto]",
        "{tema}\n\nAqui esta o resumo em 3 pontos:\n\n• Ponto 1\n• Ponto 2\n• Ponto 3",
        "Aprendi isso sobre {tema} da pior forma.\n\nPra voce nao cometer o mesmo erro 👇"
      ],
      venda: [
        "🚀 Lancamento: {tema}\n\nLink na bio\n\n{cta}",
        "Se voce quer [resultado], precisa conhecer {tema}\n\n{cta}"
      ],
      autoridade: [
        "Unpopular opinion: {tema}",
        "A maioria erra em {tema}\n\nO certo e fazer [X]",
        "{tema}\n\nIsso vai contra tudo que te ensinaram."
      ],
      comunidade: [
        "Pergunta pra timeline:\n\n{tema}?",
        "Quem mais aqui [situacao relacionada a {tema}]?\n\nResponde 🙋"
      ]
    },
    facebook: {
      engajamento: [
        "{tema}\n\nO que voces acham? Deixem suas opinioes nos comentarios! 💬\n\n{cta}",
        "Pessoal, preciso da opiniao de voces sobre {tema}.\n\nCompartilhem suas experiencias! 👇\n\n{cta}"
      ],
      educativo: [
        "📌 Dica do dia sobre {tema}\n\nVoce sabia que [fato interessante]?\n\nCompartilhe com quem precisa dessa informacao!\n\n{cta}",
        "Guia completo sobre {tema}:\n\n✅ Passo 1\n✅ Passo 2\n✅ Passo 3\n\nSalve este post!\n\n{cta}"
      ],
      venda: [
        "🎉 Promocao especial: {tema}\n\nApenas para membros do grupo!\n\n{cta}\n\n🔗 Link nos comentarios",
        "Voces pediram e chegou! {tema}\n\n{cta}"
      ],
      autoridade: [
        "Minha experiencia com {tema}:\n\n[Historia ou insight]\n\nO que voces aprenderam sobre isso?\n\n{cta}",
        "Apos anos trabalhando com {tema}, posso afirmar:\n\n[Conclusao]\n\n{cta}"
      ],
      comunidade: [
        "Bom dia, comunidade! ☀️\n\nHoje quero saber de voces: {tema}\n\nCompartilhem nos comentarios!\n\n{cta}",
        "Para nossa comunidade incrivel:\n\n{tema}\n\nVoces sao demais! ❤️\n\n{cta}"
      ]
    },
    stories: {
      engajamento: [
        "👆 {tema}\n\n[Enquete: Sim / Nao]\n\n{cta}",
        "Qual voce prefere?\n\n{tema}\n\n[Quiz interativo]",
        "Conta pra mim: {tema}\n\n[Caixa de perguntas]"
      ],
      educativo: [
        "Dica rapida 💡\n\n{tema}\n\nSalva pra depois! ⬆️",
        "Voce sabia? 🤔\n\n{tema}\n\n[Arrasta pra cima pra saber mais]"
      ],
      venda: [
        "⚡ Ultimas horas!\n\n{tema}\n\n[Arrasta pra cima]\n\n{cta}",
        "Link na bio 🔗\n\n{tema}\n\n{cta}"
      ],
      autoridade: [
        "Minha opiniao sobre {tema}:\n\n[Compartilha nos stories se concorda]",
        "O que eu penso sobre {tema} 👇"
      ],
      comunidade: [
        "Bom dia! ☀️\n\nComo voces estao hoje?\n\n{tema}\n\n[Slider de emojis]",
        "Me conta: {tema}\n\n[Caixa de perguntas]"
      ]
    }
  }

  const gerarCopy = () => {
    const templatesPorTipo = templates[dados.tipo as keyof typeof templates]
    const templatesPorObjetivo = templatesPorTipo[dados.objetivo as keyof typeof templatesPorTipo] || templatesPorTipo.engajamento

    const randomIndex = Math.floor(Math.random() * templatesPorObjetivo.length)
    let copy = templatesPorObjetivo[randomIndex]

    copy = copy.replace(/{tema}/g, dados.tema || '[seu tema aqui]')
    copy = copy.replace(/{cta}/g, dados.cta || '')

    if (!dados.emojis) {
      copy = copy.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu, '')
    }

    setCopyGerada(copy.trim())
  }

  const copiarCopy = () => {
    navigator.clipboard.writeText(copyGerada)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-4xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Copy Social</span>
          </h1>
          <p className="text-[var(--gray)]">Crie copies para redes sociais em segundos</p>
        </div>

        {/* Configuracao */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configuracao</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Plataforma</label>
              <select
                value={dados.tipo}
                onChange={(e) => setDados({ ...dados, tipo: e.target.value })}
                className="input-field"
              >
                {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Objetivo</label>
              <select
                value={dados.objetivo}
                onChange={(e) => setDados({ ...dados, objetivo: e.target.value })}
                className="input-field"
              >
                {objetivos.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="input-label">Tema/Assunto Principal</label>
              <input
                type="text"
                value={dados.tema}
                onChange={(e) => setDados({ ...dados, tema: e.target.value })}
                placeholder="Ex: produtividade, vendas, lideranca..."
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Call to Action (opcional)</label>
              <input
                type="text"
                value={dados.cta}
                onChange={(e) => setDados({ ...dados, cta: e.target.value })}
                placeholder="Ex: Comente sua opiniao, Link na bio, etc."
                className="input-field"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="emojis"
                checked={dados.emojis}
                onChange={(e) => setDados({ ...dados, emojis: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="emojis" className="text-sm">Incluir emojis</label>
            </div>
          </div>
        </div>

        {/* Botao Gerar */}
        <div className="flex justify-center mb-8">
          <button onClick={gerarCopy} className="btn-primary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Gerar Copy
          </button>
        </div>

        {/* Resultado */}
        {copyGerada && (
          <div className="glass card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg">Copy Gerada</h2>
              <button onClick={copiarCopy} className="btn-secondary text-xs flex items-center gap-1">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="bg-black/30 rounded-xl p-4 whitespace-pre-wrap">
              {copyGerada}
            </div>
            <p className="text-xs text-[var(--gray)] mt-3">
              Clique em "Gerar Copy" novamente para ver outras variacoes
            </p>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Copywriting</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Estrutura AIDA</h4>
              <ul className="space-y-1">
                <li>• <strong>A</strong>tencao: Hook poderoso</li>
                <li>• <strong>I</strong>nteresse: Problema/dor</li>
                <li>• <strong>D</strong>esejo: Beneficios</li>
                <li>• <strong>A</strong>cao: CTA claro</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Melhores Praticas</h4>
              <ul className="space-y-1">
                <li>• Primeira linha e o hook</li>
                <li>• Use quebras de linha</li>
                <li>• CTA sempre no final</li>
                <li>• Adapte o tom por rede</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
