'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Grid3X3, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Tarefa {
  id: string
  nome: string
  atribuicoes: { [pessoa: string]: 'R' | 'A' | 'C' | 'I' | '' }
}

export default function RACIPage() {
  const [copied, setCopied] = useState(false)
  const [projeto, setProjeto] = useState('')

  const [pessoas, setPessoas] = useState(['Gerente', 'Dev Lead', 'Designer', 'QA'])

  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: '1', nome: 'Definir requisitos', atribuicoes: { 'Gerente': 'A', 'Dev Lead': 'R', 'Designer': 'C', 'QA': 'I' } },
    { id: '2', nome: 'Criar mockups', atribuicoes: { 'Gerente': 'I', 'Dev Lead': 'C', 'Designer': 'R', 'QA': 'I' } },
    { id: '3', nome: 'Desenvolver feature', atribuicoes: { 'Gerente': 'I', 'Dev Lead': 'A', 'Designer': 'C', 'QA': 'I' } },
    { id: '4', nome: 'Testar', atribuicoes: { 'Gerente': 'I', 'Dev Lead': 'C', 'Designer': 'I', 'QA': 'R' } },
  ])

  const legenda = [
    { sigla: 'R', nome: 'Responsible', desc: 'Executa a tarefa', cor: '#22c55e' },
    { sigla: 'A', nome: 'Accountable', desc: 'Aprova e responde pelo resultado', cor: '#3b82f6' },
    { sigla: 'C', nome: 'Consulted', desc: 'Deve ser consultado', cor: '#eab308' },
    { sigla: 'I', nome: 'Informed', desc: 'Deve ser informado', cor: '#6b7280' },
  ]

  const adicionarPessoa = () => {
    const novaPessoa = `Pessoa ${pessoas.length + 1}`
    setPessoas([...pessoas, novaPessoa])
    setTarefas(tarefas.map(t => ({
      ...t,
      atribuicoes: { ...t.atribuicoes, [novaPessoa]: '' }
    })))
  }

  const removerPessoa = (pessoa: string) => {
    if (pessoas.length > 1) {
      setPessoas(pessoas.filter(p => p !== pessoa))
      setTarefas(tarefas.map(t => {
        const novasAtribuicoes = { ...t.atribuicoes }
        delete novasAtribuicoes[pessoa]
        return { ...t, atribuicoes: novasAtribuicoes }
      }))
    }
  }

  const renomearPessoa = (antiga: string, nova: string) => {
    setPessoas(pessoas.map(p => p === antiga ? nova : p))
    setTarefas(tarefas.map(t => {
      const novasAtribuicoes = { ...t.atribuicoes }
      novasAtribuicoes[nova] = novasAtribuicoes[antiga]
      delete novasAtribuicoes[antiga]
      return { ...t, atribuicoes: novasAtribuicoes }
    }))
  }

  const adicionarTarefa = () => {
    const atribuicoesVazias: { [key: string]: '' } = {}
    pessoas.forEach(p => atribuicoesVazias[p] = '')
    setTarefas([...tarefas, {
      id: Date.now().toString(),
      nome: '',
      atribuicoes: atribuicoesVazias
    }])
  }

  const removerTarefa = (id: string) => {
    if (tarefas.length > 1) {
      setTarefas(tarefas.filter(t => t.id !== id))
    }
  }

  const atualizarTarefa = (id: string, nome: string) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, nome } : t))
  }

  const atualizarAtribuicao = (tarefaId: string, pessoa: string, valor: 'R' | 'A' | 'C' | 'I' | '') => {
    setTarefas(tarefas.map(t =>
      t.id === tarefaId
        ? { ...t, atribuicoes: { ...t.atribuicoes, [pessoa]: valor } }
        : t
    ))
  }

  const getCorAtribuicao = (valor: string) => {
    const item = legenda.find(l => l.sigla === valor)
    return item?.cor || 'transparent'
  }

  const validarMatriz = () => {
    const erros: string[] = []
    tarefas.forEach(t => {
      if (!t.nome) return
      const temR = Object.values(t.atribuicoes).includes('R')
      const temA = Object.values(t.atribuicoes).includes('A')
      const countA = Object.values(t.atribuicoes).filter(v => v === 'A').length

      if (!temR) erros.push(`"${t.nome}" nao tem Responsible (R)`)
      if (!temA) erros.push(`"${t.nome}" nao tem Accountable (A)`)
      if (countA > 1) erros.push(`"${t.nome}" tem mais de um Accountable (A)`)
    })
    return erros
  }

  const erros = validarMatriz()

  const gerarMatriz = () => {
    const larguraColuna = Math.max(...pessoas.map(p => p.length), 10)

    return `
MATRIZ RACI${projeto ? ` - ${projeto}` : ''}
═══════════════════════════════════════════════════════════════

LEGENDA
─────────────────────────────────────────────────────────────
R = Responsible (Executa)
A = Accountable (Aprova/Responsavel final)
C = Consulted (Consultado)
I = Informed (Informado)

MATRIZ
─────────────────────────────────────────────────────────────
${'Tarefa'.padEnd(30)} | ${pessoas.map(p => p.padEnd(larguraColuna)).join(' | ')}
${'-'.repeat(30)}-|-${pessoas.map(() => '-'.repeat(larguraColuna)).join('-|-')}
${tarefas.filter(t => t.nome).map(t =>
  `${t.nome.padEnd(30)} | ${pessoas.map(p => (t.atribuicoes[p] || '-').padEnd(larguraColuna)).join(' | ')}`
).join('\n')}

${erros.length > 0 ? `
ALERTAS
─────────────────────────────────────────────────────────────
${erros.map(e => `⚠ ${e}`).join('\n')}
` : `
✓ Matriz valida - todas as tarefas tem R e A definidos
`}
═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarMatriz = () => {
    navigator.clipboard.writeText(gerarMatriz())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <Grid3X3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Matriz <span className="gold-text">RACI</span>
          </h1>
          <p className="text-[var(--gray)]">Defina responsabilidades claras para cada tarefa</p>
        </div>

        {/* Legenda */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {legenda.map(l => (
            <div key={l.sigla} className="glass p-3 text-center" style={{ borderColor: l.cor, borderWidth: 2 }}>
              <span className="font-display text-2xl" style={{ color: l.cor }}>{l.sigla}</span>
              <p className="text-xs font-semibold">{l.nome}</p>
              <p className="text-xs text-[var(--gray)]">{l.desc}</p>
            </div>
          ))}
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <label className="input-label">Nome do Projeto</label>
              <input
                type="text"
                value={projeto}
                onChange={(e) => setProjeto(e.target.value)}
                placeholder="Ex: Lancamento do Produto X"
                className="input-field"
              />
            </div>
            <button onClick={copiarMatriz} className="btn-primary flex items-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Alertas */}
        {erros.length > 0 && (
          <div className="glass card mb-8 border-yellow-500/50 bg-yellow-500/5">
            <h3 className="font-semibold text-yellow-400 mb-2">Alertas de Validacao</h3>
            <ul className="text-sm text-[var(--gray)] space-y-1">
              {erros.map((e, i) => (
                <li key={i}>⚠ {e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Matriz */}
        <div className="glass card mb-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Matriz de Responsabilidades</h2>
            <div className="flex gap-2">
              <button onClick={adicionarPessoa} className="btn-secondary text-xs flex items-center gap-1">
                <Plus className="w-3 h-3" /> Pessoa
              </button>
              <button onClick={adicionarTarefa} className="btn-secondary text-xs flex items-center gap-1">
                <Plus className="w-3 h-3" /> Tarefa
              </button>
            </div>
          </div>

          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-white/10">Tarefa</th>
                {pessoas.map(pessoa => (
                  <th key={pessoa} className="p-2 border-b border-white/10 min-w-[100px]">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={pessoa}
                        onChange={(e) => renomearPessoa(pessoa, e.target.value)}
                        className="bg-transparent border-none text-center text-sm font-semibold w-full focus:outline-none focus:ring-1 focus:ring-[var(--gold)] rounded"
                      />
                      <button
                        onClick={() => removerPessoa(pessoa)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-2 border-b border-white/10 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map(tarefa => (
                <tr key={tarefa.id} className="hover:bg-white/5">
                  <td className="p-2 border-b border-white/10">
                    <input
                      type="text"
                      value={tarefa.nome}
                      onChange={(e) => atualizarTarefa(tarefa.id, e.target.value)}
                      placeholder="Nome da tarefa"
                      className="input-field text-sm"
                    />
                  </td>
                  {pessoas.map(pessoa => (
                    <td key={pessoa} className="p-2 border-b border-white/10 text-center">
                      <select
                        value={tarefa.atribuicoes[pessoa] || ''}
                        onChange={(e) => atualizarAtribuicao(tarefa.id, pessoa, e.target.value as any)}
                        className="bg-black/50 border rounded px-2 py-1 text-center font-bold"
                        style={{
                          borderColor: getCorAtribuicao(tarefa.atribuicoes[pessoa]),
                          color: getCorAtribuicao(tarefa.atribuicoes[pessoa])
                        }}
                      >
                        <option value="">-</option>
                        <option value="R">R</option>
                        <option value="A">A</option>
                        <option value="C">C</option>
                        <option value="I">I</option>
                      </select>
                    </td>
                  ))}
                  <td className="p-2 border-b border-white/10">
                    <button
                      onClick={() => removerTarefa(tarefa.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Regras do RACI</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Obrigatorio</h4>
              <ul className="space-y-1">
                <li>• Toda tarefa deve ter pelo menos 1 R</li>
                <li>• Toda tarefa deve ter exatamente 1 A</li>
                <li>• A pessoa A pode tambem ser R</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Boas Praticas</h4>
              <ul className="space-y-1">
                <li>• Evite muitos C para nao travar decisoes</li>
                <li>• Use I para manter stakeholders informados</li>
                <li>• Revise a matriz quando o time mudar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
