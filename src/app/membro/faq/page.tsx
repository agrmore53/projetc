'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, HelpCircle, Copy, Check, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  id: string
  categoria: string
  pergunta: string
  resposta: string
}

export default function FAQPage() {
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState({
    nomeProduto: '',
    introducao: 'Encontre respostas para as perguntas mais frequentes sobre nosso produto/servico.'
  })

  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', categoria: 'Geral', pergunta: 'O que e o [Produto]?', resposta: '[Produto] e uma solucao que ajuda [publico] a [beneficio principal].' },
    { id: '2', categoria: 'Precos', pergunta: 'Quanto custa?', resposta: 'Oferecemos planos a partir de R$ [valor]/mes. Confira todos os planos em [link].' },
    { id: '3', categoria: 'Precos', pergunta: 'Existe periodo de teste?', resposta: 'Sim! Oferecemos [X] dias de teste gratuito, sem necessidade de cartao de credito.' },
    { id: '4', categoria: 'Suporte', pergunta: 'Como entro em contato com o suporte?', resposta: 'Voce pode nos contatar por email ([email]), chat no site ou WhatsApp ([numero]).' },
    { id: '5', categoria: 'Conta', pergunta: 'Como cancelo minha assinatura?', resposta: 'Voce pode cancelar a qualquer momento em Configuracoes > Assinatura > Cancelar. Sem multas ou burocracia.' },
  ])

  const categorias = ['Geral', 'Precos', 'Suporte', 'Conta', 'Funcionalidades', 'Integracao', 'Seguranca']

  const adicionarFAQ = () => {
    setFaqs([...faqs, {
      id: Date.now().toString(),
      categoria: 'Geral',
      pergunta: '',
      resposta: ''
    }])
  }

  const removerFAQ = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter(f => f.id !== id))
    }
  }

  const atualizarFAQ = (id: string, campo: keyof FAQ, valor: string) => {
    setFaqs(faqs.map(f =>
      f.id === id ? { ...f, [campo]: valor } : f
    ))
  }

  const faqsPorCategoria = categorias.reduce((acc, cat) => {
    const items = faqs.filter(f => f.categoria === cat && f.pergunta)
    if (items.length > 0) {
      acc[cat] = items
    }
    return acc
  }, {} as Record<string, FAQ[]>)

  const perguntasSugeridas = [
    { categoria: 'Geral', pergunta: 'Para quem e indicado?', resposta: 'Nosso produto e ideal para [publico] que precisam de [solucao].' },
    { categoria: 'Precos', pergunta: 'Posso mudar de plano depois?', resposta: 'Sim, voce pode fazer upgrade ou downgrade a qualquer momento.' },
    { categoria: 'Funcionalidades', pergunta: 'Funciona em dispositivos moveis?', resposta: 'Sim, temos apps para iOS e Android, alem da versao web responsiva.' },
    { categoria: 'Seguranca', pergunta: 'Meus dados estao seguros?', resposta: 'Sim, utilizamos criptografia de ponta e seguimos as melhores praticas de seguranca.' },
    { categoria: 'Integracao', pergunta: 'Integra com outras ferramentas?', resposta: 'Sim, temos integracoes nativas com [ferramentas] e API para integracoes customizadas.' },
    { categoria: 'Suporte', pergunta: 'Qual o horario de atendimento?', resposta: 'Nosso suporte funciona de segunda a sexta, das 9h as 18h.' },
  ]

  const gerarFAQ = () => {
    return `
═══════════════════════════════════════════════════════════════
              FAQ - PERGUNTAS FREQUENTES
${config.nomeProduto ? `              ${config.nomeProduto.toUpperCase()}` : ''}
═══════════════════════════════════════════════════════════════

${config.introducao}

${Object.entries(faqsPorCategoria).map(([categoria, items]) => `
─────────────────────────────────────────────────────────────
${categoria.toUpperCase()}
─────────────────────────────────────────────────────────────
${items.map((f, i) => `
${i + 1}. ${f.pergunta}

${f.resposta}
`).join('')}`).join('')}

═══════════════════════════════════════════════════════════════
Nao encontrou sua resposta? Entre em contato conosco!
Atualizado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarFAQ = () => {
    navigator.clipboard.writeText(gerarFAQ())
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
            <HelpCircle className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">FAQ</span>
          </h1>
          <p className="text-[var(--gray)]">Crie uma pagina de perguntas frequentes</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configuracao</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Produto/Empresa</label>
              <input
                type="text"
                value={config.nomeProduto}
                onChange={(e) => setConfig({ ...config, nomeProduto: e.target.value })}
                placeholder="MeuSaaS"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Texto de Introducao</label>
              <textarea
                value={config.introducao}
                onChange={(e) => setConfig({ ...config, introducao: e.target.value })}
                className="input-field min-h-[60px]"
              />
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Perguntas ({faqs.length})</h2>
            <button onClick={adicionarFAQ} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-black/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="font-display text-lg text-[var(--gold)] mt-2">{index + 1}</span>
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-3">
                      <select
                        value={faq.categoria}
                        onChange={(e) => atualizarFAQ(faq.id, 'categoria', e.target.value)}
                        className="input-field text-sm w-auto"
                      >
                        {categorias.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={faq.pergunta}
                        onChange={(e) => atualizarFAQ(faq.id, 'pergunta', e.target.value)}
                        placeholder="Pergunta..."
                        className="input-field text-sm flex-1"
                      />
                    </div>
                    <textarea
                      value={faq.resposta}
                      onChange={(e) => atualizarFAQ(faq.id, 'resposta', e.target.value)}
                      placeholder="Resposta..."
                      className="input-field text-sm min-h-[60px]"
                    />
                  </div>
                  <button
                    onClick={() => removerFAQ(faq.id)}
                    className="text-red-400 hover:text-red-300 mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sugestoes */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Perguntas Sugeridas</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {perguntasSugeridas.map((sugestao, i) => (
              <button
                key={i}
                onClick={() => setFaqs([...faqs, {
                  id: Date.now().toString() + i,
                  ...sugestao
                }])}
                className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-all"
              >
                <span className="text-[var(--gold)]">[{sugestao.categoria}]</span> {sugestao.pergunta}
              </button>
            ))}
          </div>
        </div>

        {/* Preview por Categoria */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview por Categoria</h2>
          <div className="space-y-2">
            {Object.entries(faqsPorCategoria).map(([categoria, items]) => (
              <div key={categoria} className="bg-black/30 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--gold)] mb-2">{categoria} ({items.length})</h3>
                <ul className="text-sm text-[var(--gray)] space-y-1">
                  {items.map((f, i) => (
                    <li key={f.id}>• {f.pergunta}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarFAQ} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar FAQ'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para um Bom FAQ</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Conteudo</h4>
              <ul className="space-y-1">
                <li>• Responda perguntas reais dos clientes</li>
                <li>• Seja conciso mas completo</li>
                <li>• Use linguagem simples</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Organizacao</h4>
              <ul className="space-y-1">
                <li>• Agrupe por categorias logicas</li>
                <li>• Coloque as mais frequentes primeiro</li>
                <li>• Mantenha atualizado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
