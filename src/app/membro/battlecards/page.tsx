'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Swords, Plus, Trash2, Copy, Check, Shield, Target, Zap, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Concorrente {
  id: string
  nome: string
  pontosFracos: string[]
  pontosFortes: string[]
  preco: string
  posicionamento: string
  clienteIdeal: string
  objecoes: { objecao: string; resposta: string }[]
}

export default function BattleCardsPage() {
  const [copied, setCopied] = useState(false)
  const [concorrenteAtivo, setConcorrenteAtivo] = useState<string | null>(null)
  const [meuProduto, setMeuProduto] = useState({
    nome: '',
    diferenciais: ['', '', ''],
    preco: '',
    posicionamento: ''
  })

  const [concorrentes, setConcorrentes] = useState<Concorrente[]>([
    {
      id: '1',
      nome: 'Concorrente A',
      pontosFracos: ['Suporte lento', 'Interface antiga', 'Sem integrações'],
      pontosFortes: ['Marca conhecida', 'Preço baixo'],
      preco: 'R$ 99/mês',
      posicionamento: 'Líder de mercado, foco em grandes empresas',
      clienteIdeal: 'Empresas com +100 funcionários',
      objecoes: [
        { objecao: 'Eles são mais baratos', resposta: 'Sim, mas o custo oculto de suporte e implementação é 3x maior. Nossos clientes economizam em média 40% no primeiro ano.' },
        { objecao: 'Eles são mais conhecidos', resposta: 'Ser grande não significa ser melhor. Empresas como [case] migraram para nós e aumentaram resultados em X%.' }
      ]
    }
  ])

  const adicionarConcorrente = () => {
    const novo: Concorrente = {
      id: Date.now().toString(),
      nome: `Concorrente ${concorrentes.length + 1}`,
      pontosFracos: [''],
      pontosFortes: [''],
      preco: '',
      posicionamento: '',
      clienteIdeal: '',
      objecoes: [{ objecao: '', resposta: '' }]
    }
    setConcorrentes([...concorrentes, novo])
    setConcorrenteAtivo(novo.id)
  }

  const removerConcorrente = (id: string) => {
    setConcorrentes(concorrentes.filter(c => c.id !== id))
    if (concorrenteAtivo === id) {
      setConcorrenteAtivo(null)
    }
  }

  const atualizarConcorrente = (id: string, campo: keyof Concorrente, valor: unknown) => {
    setConcorrentes(concorrentes.map(c =>
      c.id === id ? { ...c, [campo]: valor } : c
    ))
  }

  const adicionarItemLista = (id: string, campo: 'pontosFracos' | 'pontosFortes') => {
    setConcorrentes(concorrentes.map(c =>
      c.id === id ? { ...c, [campo]: [...c[campo], ''] } : c
    ))
  }

  const atualizarItemLista = (id: string, campo: 'pontosFracos' | 'pontosFortes', index: number, valor: string) => {
    setConcorrentes(concorrentes.map(c => {
      if (c.id === id) {
        const lista = [...c[campo]]
        lista[index] = valor
        return { ...c, [campo]: lista }
      }
      return c
    }))
  }

  const removerItemLista = (id: string, campo: 'pontosFracos' | 'pontosFortes', index: number) => {
    setConcorrentes(concorrentes.map(c => {
      if (c.id === id) {
        const lista = c[campo].filter((_, i) => i !== index)
        return { ...c, [campo]: lista }
      }
      return c
    }))
  }

  const adicionarObjecao = (id: string) => {
    setConcorrentes(concorrentes.map(c =>
      c.id === id ? { ...c, objecoes: [...c.objecoes, { objecao: '', resposta: '' }] } : c
    ))
  }

  const atualizarObjecao = (id: string, index: number, campo: 'objecao' | 'resposta', valor: string) => {
    setConcorrentes(concorrentes.map(c => {
      if (c.id === id) {
        const objecoes = [...c.objecoes]
        objecoes[index] = { ...objecoes[index], [campo]: valor }
        return { ...c, objecoes }
      }
      return c
    }))
  }

  const copiarBattleCard = (concorrente: Concorrente) => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    BATTLE CARD: ${concorrente.nome}
═══════════════════════════════════════════════════════════════

NOSSO PRODUTO: ${meuProduto.nome || '[Seu Produto]'}
DIFERENCIAIS:
${meuProduto.diferenciais.filter(d => d).map(d => `• ${d}`).join('\n')}

───────────────────────────────────────────────────────────────
                    VS ${concorrente.nome.toUpperCase()}
───────────────────────────────────────────────────────────────

PREÇO DELES: ${concorrente.preco}
NOSSO PREÇO: ${meuProduto.preco}

POSICIONAMENTO: ${concorrente.posicionamento}
CLIENTE IDEAL DELES: ${concorrente.clienteIdeal}

PONTOS FRACOS (usar a nosso favor):
${concorrente.pontosFracos.filter(p => p).map(p => `✗ ${p}`).join('\n')}

PONTOS FORTES (cuidado):
${concorrente.pontosFortes.filter(p => p).map(p => `✓ ${p}`).join('\n')}

───────────────────────────────────────────────────────────────
                    OBJEÇÕES E RESPOSTAS
───────────────────────────────────────────────────────────────

${concorrente.objecoes.filter(o => o.objecao).map(o => `
OBJEÇÃO: "${o.objecao}"
RESPOSTA: ${o.resposta}
`).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const concorrenteAtual = concorrentes.find(c => c.id === concorrenteAtivo)

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
            <Swords className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Battle Cards</span>
          </h1>
          <p className="text-[var(--gray)]">Comparativos competitivos para sua equipe de vendas</p>
        </div>

        {/* Meu Produto */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--gold)]" />
            Seu Produto
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Nome do Produto</label>
              <input
                type="text"
                value={meuProduto.nome}
                onChange={(e) => setMeuProduto({...meuProduto, nome: e.target.value})}
                placeholder="Ex: MeuSaaS Pro"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Preco</label>
              <input
                type="text"
                value={meuProduto.preco}
                onChange={(e) => setMeuProduto({...meuProduto, preco: e.target.value})}
                placeholder="Ex: R$ 197/mes"
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="input-label">Principais Diferenciais (3)</label>
            <div className="grid md:grid-cols-3 gap-3">
              {meuProduto.diferenciais.map((dif, i) => (
                <input
                  key={i}
                  type="text"
                  value={dif}
                  onChange={(e) => {
                    const novos = [...meuProduto.diferenciais]
                    novos[i] = e.target.value
                    setMeuProduto({...meuProduto, diferenciais: novos})
                  }}
                  placeholder={`Diferencial ${i + 1}`}
                  className="input-field"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Concorrentes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg">Concorrentes</h2>
              <button onClick={adicionarConcorrente} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {concorrentes.map(c => (
              <button
                key={c.id}
                onClick={() => setConcorrenteAtivo(c.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  concorrenteAtivo === c.id
                    ? 'bg-[var(--gold)] text-black'
                    : 'glass hover:border-[var(--gold)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{c.nome}</span>
                  <Swords className="w-4 h-4" />
                </div>
                <p className={`text-xs mt-1 ${concorrenteAtivo === c.id ? 'text-black/70' : 'text-[var(--gray)]'}`}>
                  {c.objecoes.length} objecoes mapeadas
                </p>
              </button>
            ))}

            {concorrentes.length === 0 && (
              <div className="glass p-6 text-center">
                <Swords className="w-8 h-8 mx-auto mb-2 text-[var(--gray)] opacity-50" />
                <p className="text-sm text-[var(--gray)]">Adicione concorrentes</p>
              </div>
            )}
          </div>

          {/* Editor do Concorrente */}
          <div className="lg:col-span-2">
            {concorrenteAtual ? (
              <div className="glass card">
                <div className="flex items-center justify-between mb-6">
                  <input
                    type="text"
                    value={concorrenteAtual.nome}
                    onChange={(e) => atualizarConcorrente(concorrenteAtual.id, 'nome', e.target.value)}
                    className="bg-transparent border-none text-xl font-display focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => copiarBattleCard(concorrenteAtual)}
                      className="btn-primary text-sm flex items-center gap-1"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button
                      onClick={() => removerConcorrente(concorrenteAtual.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Basica */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="input-label">Preco do Concorrente</label>
                    <input
                      type="text"
                      value={concorrenteAtual.preco}
                      onChange={(e) => atualizarConcorrente(concorrenteAtual.id, 'preco', e.target.value)}
                      placeholder="Ex: R$ 149/mes"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Cliente Ideal Deles</label>
                    <input
                      type="text"
                      value={concorrenteAtual.clienteIdeal}
                      onChange={(e) => atualizarConcorrente(concorrenteAtual.id, 'clienteIdeal', e.target.value)}
                      placeholder="Que tipo de cliente eles atendem bem?"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="input-label">Posicionamento</label>
                  <input
                    type="text"
                    value={concorrenteAtual.posicionamento}
                    onChange={(e) => atualizarConcorrente(concorrenteAtual.id, 'posicionamento', e.target.value)}
                    placeholder="Como eles se posicionam no mercado?"
                    className="input-field"
                  />
                </div>

                {/* Pontos Fracos e Fortes */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="input-label flex items-center gap-2 mb-0">
                        <ThumbsDown className="w-4 h-4 text-red-400" />
                        Pontos Fracos
                      </label>
                      <button
                        onClick={() => adicionarItemLista(concorrenteAtual.id, 'pontosFracos')}
                        className="text-[var(--gold)] hover:opacity-80"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {concorrenteAtual.pontosFracos.map((ponto, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={ponto}
                            onChange={(e) => atualizarItemLista(concorrenteAtual.id, 'pontosFracos', i, e.target.value)}
                            placeholder="Fraqueza..."
                            className="input-field text-sm flex-1"
                          />
                          <button
                            onClick={() => removerItemLista(concorrenteAtual.id, 'pontosFracos', i)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="input-label flex items-center gap-2 mb-0">
                        <ThumbsUp className="w-4 h-4 text-green-400" />
                        Pontos Fortes
                      </label>
                      <button
                        onClick={() => adicionarItemLista(concorrenteAtual.id, 'pontosFortes')}
                        className="text-[var(--gold)] hover:opacity-80"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {concorrenteAtual.pontosFortes.map((ponto, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={ponto}
                            onChange={(e) => atualizarItemLista(concorrenteAtual.id, 'pontosFortes', i, e.target.value)}
                            placeholder="Forca..."
                            className="input-field text-sm flex-1"
                          />
                          <button
                            onClick={() => removerItemLista(concorrenteAtual.id, 'pontosFortes', i)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Objecoes */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="input-label flex items-center gap-2 mb-0">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      Objecoes e Respostas
                    </label>
                    <button
                      onClick={() => adicionarObjecao(concorrenteAtual.id)}
                      className="text-[var(--gold)] hover:opacity-80"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {concorrenteAtual.objecoes.map((obj, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-4">
                        <div className="mb-3">
                          <label className="text-xs text-yellow-400 mb-1 block">Objecao do Cliente</label>
                          <input
                            type="text"
                            value={obj.objecao}
                            onChange={(e) => atualizarObjecao(concorrenteAtual.id, i, 'objecao', e.target.value)}
                            placeholder="Ex: Eles sao mais baratos..."
                            className="input-field text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-green-400 mb-1 block">Sua Resposta</label>
                          <textarea
                            value={obj.resposta}
                            onChange={(e) => atualizarObjecao(concorrenteAtual.id, i, 'resposta', e.target.value)}
                            placeholder="Como voce responde a essa objecao..."
                            className="input-field text-sm min-h-[80px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass card text-center py-16">
                <Target className="w-16 h-16 mx-auto mb-4 text-[var(--gray)] opacity-50" />
                <p className="text-[var(--gray)]">Selecione um concorrente para editar</p>
                <p className="text-sm text-[var(--gray)]">ou adicione um novo</p>
              </div>
            )}
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Como Usar Battle Cards</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Conheca o Inimigo</h4>
              <p>Teste o produto do concorrente, leia reviews, fale com ex-clientes. Informacao e poder.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Foque nas Fraquezas</h4>
              <p>Nao ataque diretamente. Faca perguntas que exponham as fraquezas naturalmente.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Atualize Sempre</h4>
              <p>Concorrentes mudam. Revise os battle cards mensalmente com input do time.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
