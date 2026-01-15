'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Post {
  id: string
  data: string
  tipo: string
  titulo: string
  canal: string
  status: 'ideia' | 'rascunho' | 'revisao' | 'agendado' | 'publicado'
}

export default function CalendarioEditorialPage() {
  const [copied, setCopied] = useState(false)
  const [mesAtual, setMesAtual] = useState(new Date().toISOString().slice(0, 7))

  const [posts, setPosts] = useState<Post[]>([
    { id: '1', data: '2024-01-08', tipo: 'Blog', titulo: 'Como aumentar vendas em 2024', canal: 'Site', status: 'publicado' },
    { id: '2', data: '2024-01-10', tipo: 'Video', titulo: 'Tutorial do produto', canal: 'YouTube', status: 'agendado' },
    { id: '3', data: '2024-01-12', tipo: 'Carrossel', titulo: '5 dicas de produtividade', canal: 'Instagram', status: 'rascunho' },
    { id: '4', data: '2024-01-15', tipo: 'Newsletter', titulo: 'Novidades do mes', canal: 'Email', status: 'ideia' },
  ])

  useEffect(() => {
    const saved = localStorage.getItem('calendario_editorial')
    if (saved) setPosts(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('calendario_editorial', JSON.stringify(posts))
  }, [posts])

  const tipos = ['Blog', 'Video', 'Carrossel', 'Reels', 'Stories', 'Newsletter', 'Podcast', 'Webinar', 'Ebook', 'Post']
  const canais = ['Site', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Email', 'Spotify']
  const statusList = [
    { value: 'ideia', label: 'Ideia', cor: 'bg-gray-500' },
    { value: 'rascunho', label: 'Rascunho', cor: 'bg-yellow-500' },
    { value: 'revisao', label: 'Em Revisao', cor: 'bg-blue-500' },
    { value: 'agendado', label: 'Agendado', cor: 'bg-purple-500' },
    { value: 'publicado', label: 'Publicado', cor: 'bg-green-500' },
  ]

  const adicionarPost = () => {
    setPosts([...posts, {
      id: Date.now().toString(),
      data: new Date().toISOString().split('T')[0],
      tipo: 'Post',
      titulo: '',
      canal: 'Instagram',
      status: 'ideia'
    }])
  }

  const removerPost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const atualizarPost = (id: string, campo: keyof Post, valor: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  }

  const postsPorStatus = statusList.map(s => ({
    ...s,
    count: posts.filter(p => p.status === s.value).length
  }))

  const gerarCalendario = () => {
    const postsOrdenados = [...posts].sort((a, b) => a.data.localeCompare(b.data))
    return `
CALENDARIO EDITORIAL
═══════════════════════════════════════════════════════════════

RESUMO POR STATUS
─────────────────────────────────────────────────────────────
${postsPorStatus.map(s => `${s.label}: ${s.count}`).join(' | ')}
Total: ${posts.length} conteudos

CRONOGRAMA
─────────────────────────────────────────────────────────────
${postsOrdenados.map(p => {
  const status = statusList.find(s => s.value === p.status)?.label || ''
  return `${p.data} | ${p.tipo.padEnd(10)} | ${p.canal.padEnd(10)} | ${status.padEnd(10)} | ${p.titulo}`
}).join('\n')}

POR CANAL
─────────────────────────────────────────────────────────────
${canais.map(c => {
  const count = posts.filter(p => p.canal === c).length
  return count > 0 ? `${c}: ${count} conteudos` : null
}).filter(Boolean).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarCalendario = () => {
    navigator.clipboard.writeText(gerarCalendario())
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
            <Calendar className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calendario <span className="gold-text">Editorial</span>
          </h1>
          <p className="text-[var(--gray)]">Planeje seu conteudo mensal</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {postsPorStatus.map(s => (
            <div key={s.value} className="glass card text-center py-3">
              <div className={`w-3 h-3 rounded-full ${s.cor} mx-auto mb-1`} />
              <p className="text-xs text-[var(--gray)]">{s.label}</p>
              <p className="font-display text-xl">{s.count}</p>
            </div>
          ))}
        </div>

        {/* Adicionar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-lg">Conteudos ({posts.length})</h2>
          <button onClick={adicionarPost} className="btn-secondary text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Adicionar
          </button>
        </div>

        {/* Lista de Posts */}
        <div className="glass card mb-8 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-xs text-[var(--gray)]">Data</th>
                <th className="text-left p-3 text-xs text-[var(--gray)]">Tipo</th>
                <th className="text-left p-3 text-xs text-[var(--gray)]">Titulo</th>
                <th className="text-left p-3 text-xs text-[var(--gray)]">Canal</th>
                <th className="text-left p-3 text-xs text-[var(--gray)]">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-2">
                    <input
                      type="date"
                      value={post.data}
                      onChange={(e) => atualizarPost(post.id, 'data', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={post.tipo}
                      onChange={(e) => atualizarPost(post.id, 'tipo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm"
                    >
                      {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={post.titulo}
                      onChange={(e) => atualizarPost(post.id, 'titulo', e.target.value)}
                      placeholder="Titulo do conteudo"
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm w-full"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={post.canal}
                      onChange={(e) => atualizarPost(post.id, 'canal', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm"
                    >
                      {canais.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      value={post.status}
                      onChange={(e) => atualizarPost(post.id, 'status', e.target.value as Post['status'])}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm"
                    >
                      {statusList.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="p-2">
                    <button onClick={() => removerPost(post.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarCalendario} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Exportar Calendario'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas de Conteudo</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Frequencia</h4>
              <ul className="space-y-1">
                <li>• Instagram: 3-5x por semana</li>
                <li>• LinkedIn: 2-3x por semana</li>
                <li>• Blog: 1-2x por semana</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Mix de Conteudo</h4>
              <ul className="space-y-1">
                <li>• 80% valor, 20% promocional</li>
                <li>• Varie formatos (video, imagem, texto)</li>
                <li>• Reuse conteudo entre canais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
