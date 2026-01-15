'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ClipboardList, Copy, Check, Plus, Trash2, GripVertical } from 'lucide-react'

interface Pergunta {
  id: string
  texto: string
  tipo: 'escala' | 'multipla' | 'aberta' | 'sim_nao'
  opcoes?: string[]
  obrigatoria: boolean
}

export default function PesquisaSatisfacaoPage() {
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState({
    titulo: 'Pesquisa de Satisfacao',
    introducao: 'Sua opiniao e muito importante para nos. Responda esta breve pesquisa.',
    agradecimento: 'Obrigado por participar! Seu feedback nos ajuda a melhorar.'
  })

  const [perguntas, setPerguntas] = useState<Pergunta[]>([
    { id: '1', texto: 'De 0 a 10, qual a probabilidade de voce recomendar nossa empresa?', tipo: 'escala', obrigatoria: true },
    { id: '2', texto: 'Como voce avalia a qualidade do nosso atendimento?', tipo: 'multipla', opcoes: ['Excelente', 'Bom', 'Regular', 'Ruim'], obrigatoria: true },
    { id: '3', texto: 'O produto atendeu suas expectativas?', tipo: 'sim_nao', obrigatoria: true },
    { id: '4', texto: 'O que podemos fazer para melhorar sua experiencia?', tipo: 'aberta', obrigatoria: false },
  ])

  const tiposPergunta = [
    { value: 'escala', label: 'Escala (0-10)' },
    { value: 'multipla', label: 'Multipla Escolha' },
    { value: 'sim_nao', label: 'Sim/Nao' },
    { value: 'aberta', label: 'Resposta Aberta' },
  ]

  const adicionarPergunta = () => {
    setPerguntas([...perguntas, {
      id: Date.now().toString(),
      texto: '',
      tipo: 'escala',
      obrigatoria: false
    }])
  }

  const removerPergunta = (id: string) => {
    if (perguntas.length > 1) {
      setPerguntas(perguntas.filter(p => p.id !== id))
    }
  }

  const atualizarPergunta = (id: string, campo: keyof Pergunta, valor: any) => {
    setPerguntas(perguntas.map(p =>
      p.id === id ? { ...p, [campo]: valor } : p
    ))
  }

  const perguntasSugeridas = [
    'De 0 a 10, o quanto voce esta satisfeito com nosso produto/servico?',
    'O que voce mais gosta em nosso produto/servico?',
    'Qual foi o principal motivo para escolher nossa empresa?',
    'Como voce conheceu nossa empresa?',
    'O preco e justo pelo valor entregue?',
    'Voce voltaria a fazer negocios conosco?',
    'O que falta em nosso produto/servico?',
    'Como foi sua experiencia de compra?'
  ]

  const gerarPesquisa = () => {
    return `
═══════════════════════════════════════════════════════════════
${config.titulo.toUpperCase()}
═══════════════════════════════════════════════════════════════

${config.introducao}

─────────────────────────────────────────────────────────────
PERGUNTAS
─────────────────────────────────────────────────────────────

${perguntas.map((p, i) => {
  let resposta = ''
  switch (p.tipo) {
    case 'escala':
      resposta = '[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]'
      break
    case 'multipla':
      resposta = p.opcoes?.map(o => `( ) ${o}`).join('\n      ') || '( ) Opcao 1\n      ( ) Opcao 2'
      break
    case 'sim_nao':
      resposta = '( ) Sim    ( ) Nao'
      break
    case 'aberta':
      resposta = '_______________________________________________\n      _______________________________________________'
      break
  }
  return `${i + 1}. ${p.texto}${p.obrigatoria ? ' *' : ''}
      ${resposta}`
}).join('\n\n')}

─────────────────────────────────────────────────────────────

${config.agradecimento}

* Perguntas obrigatorias

═══════════════════════════════════════════════════════════════
Pesquisa criada em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarPesquisa = () => {
    navigator.clipboard.writeText(gerarPesquisa())
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
            <ClipboardList className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Pesquisa de <span className="gold-text">Satisfacao</span>
          </h1>
          <p className="text-[var(--gray)]">Crie pesquisas para ouvir seus clientes</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configuracao</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Titulo da Pesquisa</label>
              <input
                type="text"
                value={config.titulo}
                onChange={(e) => setConfig({ ...config, titulo: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Texto de Introducao</label>
              <textarea
                value={config.introducao}
                onChange={(e) => setConfig({ ...config, introducao: e.target.value })}
                className="input-field min-h-[80px]"
              />
            </div>
            <div>
              <label className="input-label">Mensagem de Agradecimento</label>
              <textarea
                value={config.agradecimento}
                onChange={(e) => setConfig({ ...config, agradecimento: e.target.value })}
                className="input-field min-h-[60px]"
              />
            </div>
          </div>
        </div>

        {/* Perguntas */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Perguntas ({perguntas.length})</h2>
            <button onClick={adicionarPergunta} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {perguntas.map((pergunta, index) => (
              <div key={pergunta.id} className="bg-black/30 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-display text-lg text-[var(--gold)] mt-2">{index + 1}</span>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={pergunta.texto}
                      onChange={(e) => atualizarPergunta(pergunta.id, 'texto', e.target.value)}
                      placeholder="Digite a pergunta..."
                      className="input-field"
                    />
                    <div className="flex gap-3 items-center">
                      <select
                        value={pergunta.tipo}
                        onChange={(e) => atualizarPergunta(pergunta.id, 'tipo', e.target.value)}
                        className="input-field text-sm w-auto"
                      >
                        {tiposPergunta.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pergunta.obrigatoria}
                          onChange={(e) => atualizarPergunta(pergunta.id, 'obrigatoria', e.target.checked)}
                          className="w-4 h-4"
                        />
                        Obrigatoria
                      </label>
                    </div>
                    {pergunta.tipo === 'multipla' && (
                      <div>
                        <label className="input-label text-xs">Opcoes (uma por linha)</label>
                        <textarea
                          value={pergunta.opcoes?.join('\n') || ''}
                          onChange={(e) => atualizarPergunta(pergunta.id, 'opcoes', e.target.value.split('\n'))}
                          placeholder="Excelente&#10;Bom&#10;Regular&#10;Ruim"
                          className="input-field text-sm min-h-[80px]"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removerPergunta(pergunta.id)}
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
          <div className="flex flex-wrap gap-2">
            {perguntasSugeridas.map((sugestao, i) => (
              <button
                key={i}
                onClick={() => setPerguntas([...perguntas, {
                  id: Date.now().toString() + i,
                  texto: sugestao,
                  tipo: sugestao.includes('0 a 10') ? 'escala' : 'aberta',
                  obrigatoria: false
                }])}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-all"
              >
                + {sugestao.substring(0, 40)}...
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <div className="bg-black/30 rounded-xl p-6 max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarPesquisa()}
            </pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPesquisa} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Pesquisa'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Pesquisas Eficazes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Boas Praticas</h4>
              <ul className="space-y-1">
                <li>• Maximo 10 perguntas (ideal 5-7)</li>
                <li>• Comece com perguntas faceis</li>
                <li>• Uma pergunta aberta ao final</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Distribuicao</h4>
              <ul className="space-y-1">
                <li>• Envie 24-48h apos interacao</li>
                <li>• Taxa de resposta: 10-30%</li>
                <li>• Incentivos aumentam participacao</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
