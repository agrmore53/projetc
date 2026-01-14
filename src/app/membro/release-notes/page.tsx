'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Megaphone, Copy, Check, Plus, Trash2, Sparkles, Bug, Wrench, AlertTriangle } from 'lucide-react'

interface Item {
  id: string
  tipo: 'feature' | 'improvement' | 'bugfix' | 'breaking'
  titulo: string
  descricao: string
}

interface Release {
  versao: string
  data: string
  titulo: string
  resumo: string
  items: Item[]
}

export default function ReleaseNotesPage() {
  const [copied, setCopied] = useState(false)

  const [release, setRelease] = useState<Release>({
    versao: '1.0.0',
    data: new Date().toISOString().split('T')[0],
    titulo: '',
    resumo: '',
    items: [
      { id: '1', tipo: 'feature', titulo: 'Dashboard de metricas', descricao: 'Novo painel com KPIs em tempo real' },
      { id: '2', tipo: 'improvement', titulo: 'Performance de carregamento', descricao: 'Reducao de 40% no tempo de carregamento inicial' },
      { id: '3', tipo: 'bugfix', titulo: 'Correcao no login', descricao: 'Resolvido problema de sessao expirada incorretamente' },
    ]
  })

  const tiposItem = [
    { value: 'feature', label: 'Nova Feature', icon: Sparkles, cor: '#22c55e', emoji: '✨' },
    { value: 'improvement', label: 'Melhoria', icon: Wrench, cor: '#3b82f6', emoji: '🔧' },
    { value: 'bugfix', label: 'Correcao', icon: Bug, cor: '#f97316', emoji: '🐛' },
    { value: 'breaking', label: 'Breaking Change', icon: AlertTriangle, cor: '#ef4444', emoji: '⚠️' },
  ]

  const adicionarItem = () => {
    const novo: Item = {
      id: Date.now().toString(),
      tipo: 'feature',
      titulo: '',
      descricao: ''
    }
    setRelease({ ...release, items: [...release.items, novo] })
  }

  const removerItem = (id: string) => {
    setRelease({ ...release, items: release.items.filter(i => i.id !== id) })
  }

  const atualizarItem = (id: string, campo: keyof Item, valor: string) => {
    setRelease({
      ...release,
      items: release.items.map(i =>
        i.id === id ? { ...i, [campo]: valor } : i
      )
    })
  }

  const itemsPorTipo = (tipo: Item['tipo']) => release.items.filter(i => i.tipo === tipo)

  const getTipo = (tipo: Item['tipo']) => tiposItem.find(t => t.value === tipo)!

  const gerarMarkdown = () => {
    const hasBreaking = itemsPorTipo('breaking').length > 0

    return `# ${release.titulo || `Release ${release.versao}`}

**Versao:** ${release.versao}
**Data:** ${new Date(release.data).toLocaleDateString('pt-BR')}

${release.resumo ? `## Resumo\n${release.resumo}\n` : ''}
${hasBreaking ? `## ⚠️ Breaking Changes

${itemsPorTipo('breaking').map(i => `- **${i.titulo}**: ${i.descricao}`).join('\n')}
` : ''}
${itemsPorTipo('feature').length > 0 ? `## ✨ Novas Features

${itemsPorTipo('feature').map(i => `- **${i.titulo}**: ${i.descricao}`).join('\n')}
` : ''}
${itemsPorTipo('improvement').length > 0 ? `## 🔧 Melhorias

${itemsPorTipo('improvement').map(i => `- **${i.titulo}**: ${i.descricao}`).join('\n')}
` : ''}
${itemsPorTipo('bugfix').length > 0 ? `## 🐛 Correcoes

${itemsPorTipo('bugfix').map(i => `- **${i.titulo}**: ${i.descricao}`).join('\n')}
` : ''}
---
Duvidas? Entre em contato com nosso suporte.`
  }

  const gerarHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Release Notes - ${release.versao}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; }
    h2 { color: #444; margin-top: 30px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
    .item { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #d4af37; }
    .item-title { font-weight: bold; margin-bottom: 5px; }
    .item-desc { color: #666; }
    .breaking { border-left-color: #ef4444; background: #fef2f2; }
    .feature { border-left-color: #22c55e; }
    .improvement { border-left-color: #3b82f6; }
    .bugfix { border-left-color: #f97316; }
  </style>
</head>
<body>
  <h1>📦 ${release.titulo || `Release ${release.versao}`}</h1>
  <p class="meta">Versao ${release.versao} • ${new Date(release.data).toLocaleDateString('pt-BR')}</p>
  ${release.resumo ? `<p>${release.resumo}</p>` : ''}
  ${tiposItem.map(tipo => {
    const items = itemsPorTipo(tipo.value as Item['tipo'])
    if (items.length === 0) return ''
    return `
  <h2>${tipo.emoji} ${tipo.label}s</h2>
  ${items.map(i => `
  <div class="item ${tipo.value}">
    <div class="item-title">${i.titulo}</div>
    <div class="item-desc">${i.descricao}</div>
  </div>`).join('')}`
  }).join('')}
</body>
</html>`
  }

  const copiarMarkdown = () => {
    navigator.clipboard.writeText(gerarMarkdown())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copiarHTML = () => {
    navigator.clipboard.writeText(gerarHTML())
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
            <Megaphone className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Release Notes</span>
          </h1>
          <p className="text-[var(--gray)]">Comunique lancamentos profissionalmente</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="input-label">Versao</label>
              <input
                type="text"
                value={release.versao}
                onChange={(e) => setRelease({ ...release, versao: e.target.value })}
                placeholder="1.0.0"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={release.data}
                onChange={(e) => setRelease({ ...release, data: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Titulo (opcional)</label>
              <input
                type="text"
                value={release.titulo}
                onChange={(e) => setRelease({ ...release, titulo: e.target.value })}
                placeholder="Ex: Mega Update de Janeiro"
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="input-label">Resumo (opcional)</label>
            <textarea
              value={release.resumo}
              onChange={(e) => setRelease({ ...release, resumo: e.target.value })}
              placeholder="Breve descricao das principais mudancas..."
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        {/* Contadores */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {tiposItem.map((tipo) => {
            const Icon = tipo.icon
            const count = itemsPorTipo(tipo.value as Item['tipo']).length
            return (
              <div key={tipo.value} className="glass card text-center py-4">
                <Icon className="w-6 h-6 mx-auto mb-1" style={{ color: tipo.cor }} />
                <p className="font-display text-2xl" style={{ color: tipo.cor }}>{count}</p>
                <p className="text-xs text-[var(--gray)]">{tipo.label}</p>
              </div>
            )
          })}
        </div>

        {/* Items */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Itens da Release</h2>
            <button onClick={adicionarItem} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {release.items.map((item) => {
              const tipo = getTipo(item.tipo)
              const Icon = tipo.icon

              return (
                <div
                  key={item.id}
                  className="bg-black/30 rounded-xl p-4"
                  style={{ borderLeft: `4px solid ${tipo.cor}` }}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-5 h-5 mt-2 flex-shrink-0" style={{ color: tipo.cor }} />
                    <div className="flex-1 space-y-3">
                      <div className="grid md:grid-cols-3 gap-3">
                        <select
                          value={item.tipo}
                          onChange={(e) => atualizarItem(item.id, 'tipo', e.target.value)}
                          className="input-field text-sm"
                        >
                          {tiposItem.map(t => (
                            <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={item.titulo}
                          onChange={(e) => atualizarItem(item.id, 'titulo', e.target.value)}
                          placeholder="Titulo do item"
                          className="input-field text-sm md:col-span-2 font-semibold"
                        />
                      </div>
                      <textarea
                        value={item.descricao}
                        onChange={(e) => atualizarItem(item.id, 'descricao', e.target.value)}
                        placeholder="Descricao detalhada..."
                        className="input-field text-sm min-h-[60px] w-full"
                      />
                    </div>
                    <button onClick={() => removerItem(item.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {release.items.length === 0 && (
            <div className="text-center py-8 text-[var(--gray)]">
              <Megaphone className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum item adicionado</p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <div className="bg-black/30 rounded-xl p-6 prose prose-invert max-w-none">
            <h1 className="text-xl font-display text-[var(--gold)] mb-2">
              📦 {release.titulo || `Release ${release.versao}`}
            </h1>
            <p className="text-sm text-[var(--gray)]">
              Versao {release.versao} • {new Date(release.data).toLocaleDateString('pt-BR')}
            </p>
            {release.resumo && <p className="mt-4">{release.resumo}</p>}

            {tiposItem.map((tipo) => {
              const items = itemsPorTipo(tipo.value as Item['tipo'])
              if (items.length === 0) return null
              return (
                <div key={tipo.value} className="mt-6">
                  <h2 className="text-lg font-semibold mb-3" style={{ color: tipo.cor }}>
                    {tipo.emoji} {tipo.label}s
                  </h2>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i.id} className="text-sm">
                        <strong>{i.titulo}</strong>: {i.descricao}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Exportar */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={copiarMarkdown} className="btn-secondary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copiar Markdown
          </button>
          <button onClick={copiarHTML} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copiar HTML
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Release Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Linguagem de Usuario</h4>
              <p>Escreva para usuarios, nao desenvolvedores. "Exportar dados" e melhor que "Endpoint de export".</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Destaque Breaking Changes</h4>
              <p>Mudancas que afetam usuarios devem estar no topo e bem visiveis.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Versao Semantica</h4>
              <p>Use MAJOR.MINOR.PATCH. Major para breaking changes, minor para features, patch para fixes.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Seja Consistente</h4>
              <p>Mantenha o mesmo formato em todas as releases. Usuarios se acostumam.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
