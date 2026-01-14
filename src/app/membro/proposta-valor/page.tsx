'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Gem, Copy, Check, Plus, Trash2, Target, Frown, Smile, Gift, Zap, Shield } from 'lucide-react'

interface CanvasData {
  // Lado do Cliente
  tarefas: string[]
  dores: string[]
  ganhos: string[]
  // Lado da Proposta
  produtos: string[]
  aliviosDores: string[]
  criadorGanhos: string[]
}

export default function PropostaValorPage() {
  const [copied, setCopied] = useState(false)
  const [nomeProduto, setNomeProduto] = useState('')
  const [segmento, setSegmento] = useState('')

  const [canvas, setCanvas] = useState<CanvasData>({
    tarefas: [''],
    dores: [''],
    ganhos: [''],
    produtos: [''],
    aliviosDores: [''],
    criadorGanhos: ['']
  })

  const adicionarItem = (campo: keyof CanvasData) => {
    setCanvas({
      ...canvas,
      [campo]: [...canvas[campo], '']
    })
  }

  const removerItem = (campo: keyof CanvasData, index: number) => {
    setCanvas({
      ...canvas,
      [campo]: canvas[campo].filter((_, i) => i !== index)
    })
  }

  const atualizarItem = (campo: keyof CanvasData, index: number, valor: string) => {
    const novos = [...canvas[campo]]
    novos[index] = valor
    setCanvas({ ...canvas, [campo]: novos })
  }

  const gerarPropostaValor = () => {
    const doresPrincipais = canvas.dores.filter(d => d).slice(0, 3)
    const ganhosPrincipais = canvas.ganhos.filter(g => g).slice(0, 3)
    const alivios = canvas.aliviosDores.filter(a => a).slice(0, 3)
    const criadores = canvas.criadorGanhos.filter(c => c).slice(0, 3)

    let proposta = `O ${nomeProduto || '[PRODUTO]'} ajuda ${segmento || '[SEGMENTO]'} `

    if (doresPrincipais.length > 0) {
      proposta += `que sofrem com ${doresPrincipais.join(', ')} `
    }

    proposta += `a ${alivios[0] || '[BENEFICIO PRINCIPAL]'}`

    if (criadores.length > 0) {
      proposta += `, proporcionando ${criadores.join(', ')}`
    }

    proposta += '.'

    return proposta
  }

  const copiarCanvas = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                   VALUE PROPOSITION CANVAS
═══════════════════════════════════════════════════════════════
Produto: ${nomeProduto || '[PRODUTO]'}
Segmento: ${segmento || '[SEGMENTO]'}

───────────────────────────────────────────────────────────────
                    PERFIL DO CLIENTE
───────────────────────────────────────────────────────────────

TAREFAS DO CLIENTE (O que ele precisa fazer):
${canvas.tarefas.filter(t => t).map(t => `• ${t}`).join('\n')}

DORES (Problemas e frustracoes):
${canvas.dores.filter(d => d).map(d => `• ${d}`).join('\n')}

GANHOS DESEJADOS (O que ele quer alcançar):
${canvas.ganhos.filter(g => g).map(g => `• ${g}`).join('\n')}

───────────────────────────────────────────────────────────────
                    PROPOSTA DE VALOR
───────────────────────────────────────────────────────────────

PRODUTOS E SERVICOS:
${canvas.produtos.filter(p => p).map(p => `• ${p}`).join('\n')}

ALIVIADORES DE DORES (Como resolvemos os problemas):
${canvas.aliviosDores.filter(a => a).map(a => `• ${a}`).join('\n')}

CRIADORES DE GANHOS (Como geramos valor):
${canvas.criadorGanhos.filter(c => c).map(c => `• ${c}`).join('\n')}

───────────────────────────────────────────────────────────────
                    PROPOSTA SINTETIZADA
───────────────────────────────────────────────────────────────

${gerarPropostaValor()}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const ListaEditavel = ({
    titulo,
    icone,
    cor,
    campo,
    placeholder
  }: {
    titulo: string
    icone: React.ReactNode
    cor: string
    campo: keyof CanvasData
    placeholder: string
  }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="input-label flex items-center gap-2 mb-0" style={{ color: cor }}>
          {icone}
          {titulo}
        </label>
        <button
          onClick={() => adicionarItem(campo)}
          className="text-[var(--gold)] hover:opacity-80"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {canvas[campo].map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => atualizarItem(campo, i, e.target.value)}
              placeholder={placeholder}
              className="input-field text-sm flex-1"
            />
            {canvas[campo].length > 1 && (
              <button
                onClick={() => removerItem(campo, i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Gem className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Proposta de Valor</span>
          </h1>
          <p className="text-[var(--gray)]">Value Proposition Canvas para seu produto</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Produto/Servico</label>
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Ex: MeuSaaS Pro"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Segmento de Clientes</label>
              <input
                type="text"
                value={segmento}
                onChange={(e) => setSegmento(e.target.value)}
                placeholder="Ex: PMEs de tecnologia"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Lado do Cliente */}
          <div className="glass card border-2 border-blue-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="font-display text-lg">Perfil do Cliente</h2>
                <p className="text-xs text-[var(--gray)]">Entenda seu cliente profundamente</p>
              </div>
            </div>

            <ListaEditavel
              titulo="Tarefas do Cliente"
              icone={<Target className="w-4 h-4" />}
              cor="#60a5fa"
              campo="tarefas"
              placeholder="O que o cliente precisa fazer/resolver?"
            />

            <ListaEditavel
              titulo="Dores"
              icone={<Frown className="w-4 h-4" />}
              cor="#f87171"
              campo="dores"
              placeholder="Frustracoes, riscos, obstaculos..."
            />

            <ListaEditavel
              titulo="Ganhos Desejados"
              icone={<Smile className="w-4 h-4" />}
              cor="#4ade80"
              campo="ganhos"
              placeholder="Resultados e beneficios que ele quer..."
            />
          </div>

          {/* Lado da Proposta */}
          <div className="glass card border-2 border-[var(--gold)]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                <Gem className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <div>
                <h2 className="font-display text-lg">Proposta de Valor</h2>
                <p className="text-xs text-[var(--gray)]">Como voce entrega valor</p>
              </div>
            </div>

            <ListaEditavel
              titulo="Produtos e Servicos"
              icone={<Gift className="w-4 h-4" />}
              cor="#d4af37"
              campo="produtos"
              placeholder="O que voce oferece..."
            />

            <ListaEditavel
              titulo="Aliviadores de Dores"
              icone={<Shield className="w-4 h-4" />}
              cor="#a78bfa"
              campo="aliviosDores"
              placeholder="Como voce resolve as dores..."
            />

            <ListaEditavel
              titulo="Criadores de Ganhos"
              icone={<Zap className="w-4 h-4" />}
              cor="#fbbf24"
              campo="criadorGanhos"
              placeholder="Como voce gera os ganhos desejados..."
            />
          </div>
        </div>

        {/* Proposta Gerada */}
        <div className="glass card mb-8 border-2 border-[var(--gold)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg gold-text">Proposta de Valor Sintetizada</h2>
            <button onClick={copiarCanvas} className="btn-primary text-sm flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar Tudo'}
            </button>
          </div>
          <div className="bg-black/30 rounded-xl p-6">
            <p className="text-lg leading-relaxed">{gerarPropostaValor()}</p>
          </div>
        </div>

        {/* Formulas Alternativas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Formulas de Proposta de Valor</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="font-semibold text-[var(--gold)] mb-2">Formula Steve Blank</h3>
              <p className="text-sm text-[var(--gray)]">
                "Nos ajudamos <span className="text-white">[SEGMENTO]</span> que querem{' '}
                <span className="text-white">[TAREFA]</span> ao fornecer{' '}
                <span className="text-white">[BENEFICIO]</span> diferente de{' '}
                <span className="text-white">[ALTERNATIVAS]</span>."
              </p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="font-semibold text-[var(--gold)] mb-2">Formula Geoff Moore</h3>
              <p className="text-sm text-[var(--gray)]">
                "Para <span className="text-white">[CLIENTE]</span> que{' '}
                <span className="text-white">[PROBLEMA]</span>, nosso{' '}
                <span className="text-white">[PRODUTO]</span> e um{' '}
                <span className="text-white">[CATEGORIA]</span> que{' '}
                <span className="text-white">[BENEFICIO]</span>."
              </p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="font-semibold text-[var(--gold)] mb-2">Formula XYZ</h3>
              <p className="text-sm text-[var(--gray)]">
                "Nos ajudamos <span className="text-white">X</span> a fazer{' '}
                <span className="text-white">Y</span> fazendo{' '}
                <span className="text-white">Z</span>."
              </p>
            </div>
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="font-semibold text-[var(--gold)] mb-2">Formula Before/After</h3>
              <p className="text-sm text-[var(--gray)]">
                "Antes: <span className="text-white">[SITUACAO RUIM]</span>. Depois:{' '}
                <span className="text-white">[SITUACAO BOA]</span>. Como:{' '}
                <span className="text-white">[SEU PRODUTO]</span>."
              </p>
            </div>
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para uma Proposta de Valor Forte</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Seja Especifico</h4>
              <p>"Economize tempo" e fraco. "Reduza 4h/semana em relatorios" e forte. Use numeros.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Foque no Cliente</h4>
              <p>Nao fale do seu produto, fale do resultado que o cliente tera. Beneficio vence Feature.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Diferencie-se</h4>
              <p>Se sua proposta serve para qualquer concorrente, nao e unica. O que so voce oferece?</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
