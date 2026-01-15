'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, GitBranch, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Release {
  id: string
  versao: string
  data: string
  tipo: 'major' | 'minor' | 'patch'
  mudancas: {
    tipo: 'added' | 'changed' | 'fixed' | 'removed' | 'security'
    descricao: string
  }[]
}

export default function ChangelogPage() {
  const [copied, setCopied] = useState(false)
  const [nomeProduto, setNomeProduto] = useState('Meu Produto')

  const [releases, setReleases] = useState<Release[]>([
    {
      id: '1',
      versao: '1.2.0',
      data: '2024-01-15',
      tipo: 'minor',
      mudancas: [
        { tipo: 'added', descricao: 'Novo sistema de notificacoes' },
        { tipo: 'added', descricao: 'Integracao com Slack' },
        { tipo: 'changed', descricao: 'Redesign da pagina de configuracoes' },
        { tipo: 'fixed', descricao: 'Correcao de bug no login com Google' },
      ]
    },
    {
      id: '2',
      versao: '1.1.1',
      data: '2024-01-10',
      tipo: 'patch',
      mudancas: [
        { tipo: 'fixed', descricao: 'Correcao de erro no calculo de precos' },
        { tipo: 'security', descricao: 'Atualizacao de dependencias de seguranca' },
      ]
    },
  ])

  const tiposMudanca = [
    { value: 'added', label: 'Adicionado', cor: 'text-green-400' },
    { value: 'changed', label: 'Alterado', cor: 'text-yellow-400' },
    { value: 'fixed', label: 'Corrigido', cor: 'text-blue-400' },
    { value: 'removed', label: 'Removido', cor: 'text-red-400' },
    { value: 'security', label: 'Seguranca', cor: 'text-purple-400' },
  ]

  const adicionarRelease = () => {
    const ultimaVersao = releases[0]?.versao || '0.0.0'
    const partes = ultimaVersao.split('.').map(Number)
    partes[2] += 1

    setReleases([{
      id: Date.now().toString(),
      versao: partes.join('.'),
      data: new Date().toISOString().split('T')[0],
      tipo: 'patch',
      mudancas: []
    }, ...releases])
  }

  const removerRelease = (id: string) => {
    setReleases(releases.filter(r => r.id !== id))
  }

  const atualizarRelease = (id: string, campo: keyof Release, valor: any) => {
    setReleases(releases.map(r => r.id === id ? { ...r, [campo]: valor } : r))
  }

  const adicionarMudanca = (releaseId: string) => {
    setReleases(releases.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          mudancas: [...r.mudancas, { tipo: 'added' as const, descricao: '' }]
        }
      }
      return r
    }))
  }

  const removerMudanca = (releaseId: string, index: number) => {
    setReleases(releases.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          mudancas: r.mudancas.filter((_, i) => i !== index)
        }
      }
      return r
    }))
  }

  const atualizarMudanca = (releaseId: string, index: number, campo: 'tipo' | 'descricao', valor: string) => {
    setReleases(releases.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          mudancas: r.mudancas.map((m, i) => i === index ? { ...m, [campo]: valor } : m)
        }
      }
      return r
    }))
  }

  const formatarData = (data: string) => {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const gerarChangelog = () => {
    const tipoLabels: Record<string, string> = {
      added: 'Adicionado',
      changed: 'Alterado',
      fixed: 'Corrigido',
      removed: 'Removido',
      security: 'Seguranca'
    }

    return `# Changelog - ${nomeProduto}

Todas as mudancas notaveis neste projeto serao documentadas neste arquivo.

O formato e baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semantico](https://semver.org/lang/pt-BR/).

${releases.map(r => {
  const mudancasPorTipo = tiposMudanca.map(t => ({
    tipo: t.value,
    label: tipoLabels[t.value],
    itens: r.mudancas.filter(m => m.tipo === t.value && m.descricao)
  })).filter(g => g.itens.length > 0)

  return `## [${r.versao}] - ${r.data}

${mudancasPorTipo.map(g => `### ${g.label}
${g.itens.map(i => `- ${i.descricao}`).join('\n')}`).join('\n\n')}`
}).join('\n\n---\n\n')}
`
  }

  const copiarChangelog = () => {
    navigator.clipboard.writeText(gerarChangelog())
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
            <GitBranch className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Changelog</span>
          </h1>
          <p className="text-[var(--gray)]">Documente as mudancas do seu produto</p>
        </div>

        {/* Nome do Produto */}
        <div className="glass card mb-6">
          <label className="input-label">Nome do Produto</label>
          <input
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
            className="input-field"
            placeholder="Nome do seu produto"
          />
        </div>

        {/* Adicionar Release */}
        <div className="flex justify-end mb-4">
          <button onClick={adicionarRelease} className="btn-secondary text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Nova Release
          </button>
        </div>

        {/* Releases */}
        <div className="space-y-6 mb-8">
          {releases.map(release => (
            <div key={release.id} className="glass card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="input-label text-xs">Versao</label>
                    <input
                      type="text"
                      value={release.versao}
                      onChange={(e) => atualizarRelease(release.id, 'versao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-24"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Data</label>
                    <input
                      type="date"
                      value={release.data}
                      onChange={(e) => atualizarRelease(release.id, 'data', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Tipo</label>
                    <select
                      value={release.tipo}
                      onChange={(e) => atualizarRelease(release.id, 'tipo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2"
                    >
                      <option value="major">Major</option>
                      <option value="minor">Minor</option>
                      <option value="patch">Patch</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => removerRelease(release.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Mudancas */}
              <div className="space-y-2 mb-4">
                {release.mudancas.map((mudanca, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={mudanca.tipo}
                      onChange={(e) => atualizarMudanca(release.id, index, 'tipo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm w-32"
                    >
                      {tiposMudanca.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={mudanca.descricao}
                      onChange={(e) => atualizarMudanca(release.id, index, 'descricao', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-1 text-sm flex-1"
                      placeholder="Descricao da mudanca"
                    />
                    <button onClick={() => removerMudanca(release.id, index)} className="text-red-400 hover:text-red-300">
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => adicionarMudanca(release.id)}
                className="text-sm text-[var(--gold)] hover:opacity-80"
              >
                + Adicionar mudanca
              </button>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <div className="bg-black/30 rounded-xl p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">{gerarChangelog()}</pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarChangelog} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Changelog'}
          </button>
        </div>

        {/* Legenda */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Versionamento Semantico</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Major (X.0.0)</h4>
              <p>Mudancas incompativeis com versoes anteriores</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Minor (0.X.0)</h4>
              <p>Novas funcionalidades compativeis</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Patch (0.0.X)</h4>
              <p>Correcoes de bugs compativeis</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
