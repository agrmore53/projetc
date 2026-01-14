'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Layout, Copy, Check, Save, Download, Users, DollarSign, Zap, Heart, Package, Truck, Handshake, PiggyBank, BarChart } from 'lucide-react'

interface CanvasData {
  proposta: string
  segmentos: string
  canais: string
  relacionamento: string
  fontes: string
  recursos: string
  atividades: string
  parcerias: string
  custos: string
}

export default function CanvasPage() {
  const [canvas, setCanvas] = useState<CanvasData>({
    proposta: '',
    segmentos: '',
    canais: '',
    relacionamento: '',
    fontes: '',
    recursos: '',
    atividades: '',
    parcerias: '',
    custos: ''
  })
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedCanvas = localStorage.getItem('business_canvas')
    if (savedCanvas) {
      try {
        setCanvas(JSON.parse(savedCanvas))
      } catch {}
    }
  }, [])

  const salvar = () => {
    localStorage.setItem('business_canvas', JSON.stringify(canvas))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const copiarCanvas = () => {
    const texto = `BUSINESS MODEL CANVAS

═══════════════════════════════════════════════════════

PROPOSTA DE VALOR
${canvas.proposta || '(não preenchido)'}

SEGMENTOS DE CLIENTES
${canvas.segmentos || '(não preenchido)'}

CANAIS
${canvas.canais || '(não preenchido)'}

RELACIONAMENTO COM CLIENTES
${canvas.relacionamento || '(não preenchido)'}

FONTES DE RECEITA
${canvas.fontes || '(não preenchido)'}

RECURSOS PRINCIPAIS
${canvas.recursos || '(não preenchido)'}

ATIVIDADES-CHAVE
${canvas.atividades || '(não preenchido)'}

PARCERIAS PRINCIPAIS
${canvas.parcerias || '(não preenchido)'}

ESTRUTURA DE CUSTOS
${canvas.custos || '(não preenchido)'}

═══════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const blocos = [
    {
      id: 'parcerias',
      titulo: 'Parcerias Principais',
      icone: <Handshake className="w-5 h-5" />,
      placeholder: 'Quem são seus parceiros-chave?\nQuais recursos você obtém de parceiros?\nQuais atividades parceiros executam?',
      dica: 'Fornecedores, distribuidores, alianças estratégicas'
    },
    {
      id: 'atividades',
      titulo: 'Atividades-Chave',
      icone: <Zap className="w-5 h-5" />,
      placeholder: 'Quais atividades sua proposta de valor requer?\nSeus canais de distribuição?\nRelacionamento com clientes?',
      dica: 'Produção, resolução de problemas, plataforma/rede'
    },
    {
      id: 'proposta',
      titulo: 'Proposta de Valor',
      icone: <Heart className="w-5 h-5" />,
      placeholder: 'Que valor você entrega ao cliente?\nQual problema você resolve?\nQue necessidade você satisfaz?',
      dica: 'Novidade, desempenho, personalização, preço, redução de risco'
    },
    {
      id: 'relacionamento',
      titulo: 'Relacionamento',
      icone: <Users className="w-5 h-5" />,
      placeholder: 'Que tipo de relacionamento seus clientes esperam?\nComo isso se integra ao modelo de negócio?',
      dica: 'Assistência pessoal, self-service, comunidades, co-criação'
    },
    {
      id: 'segmentos',
      titulo: 'Segmentos de Clientes',
      icone: <Users className="w-5 h-5" />,
      placeholder: 'Para quem você cria valor?\nQuem são seus clientes mais importantes?',
      dica: 'Mercado de massa, nicho, segmentado, diversificado'
    },
    {
      id: 'recursos',
      titulo: 'Recursos Principais',
      icone: <Package className="w-5 h-5" />,
      placeholder: 'Quais recursos sua proposta requer?\nCanais de distribuição?\nFontes de receita?',
      dica: 'Físicos, intelectuais, humanos, financeiros'
    },
    {
      id: 'canais',
      titulo: 'Canais',
      icone: <Truck className="w-5 h-5" />,
      placeholder: 'Por quais canais seus clientes querem ser alcançados?\nComo você os alcança agora?',
      dica: 'Vendas diretas, loja online, parceiros, própria, atacado'
    },
    {
      id: 'custos',
      titulo: 'Estrutura de Custos',
      icone: <PiggyBank className="w-5 h-5" />,
      placeholder: 'Quais são os custos mais importantes?\nQuais recursos/atividades são mais caros?',
      dica: 'Custos fixos, variáveis, economias de escala'
    },
    {
      id: 'fontes',
      titulo: 'Fontes de Receita',
      icone: <DollarSign className="w-5 h-5" />,
      placeholder: 'Por qual valor seus clientes estão dispostos a pagar?\nComo eles pagam atualmente?',
      dica: 'Venda de ativos, assinatura, licenciamento, publicidade'
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Layout className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Business Model <span className="gold-text">Canvas</span>
          </h1>
          <p className="text-[var(--gray)]">Planeje seu negócio em uma única página</p>
        </div>

        {/* Ações */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={salvar} className="btn-secondary flex items-center gap-2">
            {saved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
            {saved ? 'Salvo!' : 'Salvar'}
          </button>
          <button onClick={copiarCanvas} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Canvas'}
          </button>
        </div>

        {/* Canvas Grid */}
        <div className="glass p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Linha 1 */}
            <div className="md:row-span-2 border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Parcerias</h3>
              </div>
              <textarea
                value={canvas.parcerias}
                onChange={(e) => setCanvas({...canvas, parcerias: e.target.value})}
                placeholder="Parceiros-chave, fornecedores, alianças..."
                className="w-full h-32 md:h-48 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            <div className="border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Atividades</h3>
              </div>
              <textarea
                value={canvas.atividades}
                onChange={(e) => setCanvas({...canvas, atividades: e.target.value})}
                placeholder="Atividades essenciais..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            <div className="md:row-span-2 border-2 border-[var(--gold)] rounded-xl p-4 bg-[var(--gold)]/5">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm text-[var(--gold)]">Proposta de Valor</h3>
              </div>
              <textarea
                value={canvas.proposta}
                onChange={(e) => setCanvas({...canvas, proposta: e.target.value})}
                placeholder="Que valor único você entrega? Qual problema resolve?"
                className="w-full h-32 md:h-48 bg-transparent border-none resize-none text-sm focus:outline-none text-white placeholder:text-white/30"
              />
            </div>

            <div className="border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Relacionamento</h3>
              </div>
              <textarea
                value={canvas.relacionamento}
                onChange={(e) => setCanvas({...canvas, relacionamento: e.target.value})}
                placeholder="Como se relaciona com clientes..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            <div className="md:row-span-2 border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Clientes</h3>
              </div>
              <textarea
                value={canvas.segmentos}
                onChange={(e) => setCanvas({...canvas, segmentos: e.target.value})}
                placeholder="Para quem você cria valor? Quem são seus clientes?"
                className="w-full h-32 md:h-48 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            {/* Linha 2 */}
            <div className="border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Recursos</h3>
              </div>
              <textarea
                value={canvas.recursos}
                onChange={(e) => setCanvas({...canvas, recursos: e.target.value})}
                placeholder="Recursos necessários..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            <div className="border border-[var(--gold)]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-display text-sm">Canais</h3>
              </div>
              <textarea
                value={canvas.canais}
                onChange={(e) => setCanvas({...canvas, canais: e.target.value})}
                placeholder="Como alcança clientes..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            {/* Linha 3 - Custos e Receitas */}
            <div className="md:col-span-2 border border-red-500/30 rounded-xl p-4 bg-red-500/5">
              <div className="flex items-center gap-2 mb-3">
                <PiggyBank className="w-4 h-4 text-red-400" />
                <h3 className="font-display text-sm text-red-400">Estrutura de Custos</h3>
              </div>
              <textarea
                value={canvas.custos}
                onChange={(e) => setCanvas({...canvas, custos: e.target.value})}
                placeholder="Principais custos: fixos, variáveis, salários, infraestrutura..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>

            <div className="md:col-span-3 border border-green-500/30 rounded-xl p-4 bg-green-500/5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-green-400" />
                <h3 className="font-display text-sm text-green-400">Fontes de Receita</h3>
              </div>
              <textarea
                value={canvas.fontes}
                onChange={(e) => setCanvas({...canvas, fontes: e.target.value})}
                placeholder="Como você ganha dinheiro? Assinatura, venda, licença, comissão..."
                className="w-full h-20 md:h-24 bg-transparent border-none resize-none text-sm focus:outline-none text-[var(--gray)] placeholder:text-white/20"
              />
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">💡 Como Usar o Canvas</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">1. Comece pelo Centro</h4>
              <p>A Proposta de Valor é o coração do seu negócio. Defina claramente que problema você resolve.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">2. Conheça seu Cliente</h4>
              <p>Segmentos de Clientes e Relacionamento definem para quem você vende e como se conecta.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">3. Valide os Números</h4>
              <p>Custos vs Receitas precisam fazer sentido. Seu modelo é sustentável?</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
