'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, LayoutGrid, Copy, Check } from 'lucide-react'

interface Conteudo {
  id: string
  tema: string
  objetivo: string
  formato: string
  canal: string
  etapaFunil: string
  frequencia: string
}

export default function MatrizConteudoPage() {
  const [copied, setCopied] = useState(false)

  const [conteudos, setConteudos] = useState<Conteudo[]>([
    { id: '1', tema: 'Dicas rapidas', objetivo: 'Engajamento', formato: 'Reels', canal: 'Instagram', etapaFunil: 'Topo', frequencia: '3x semana' },
    { id: '2', tema: 'Cases de sucesso', objetivo: 'Prova social', formato: 'Carrossel', canal: 'LinkedIn', etapaFunil: 'Meio', frequencia: '1x semana' },
    { id: '3', tema: 'Tutorial produto', objetivo: 'Conversao', formato: 'Video longo', canal: 'YouTube', etapaFunil: 'Fundo', frequencia: '1x mes' },
  ])

  const objetivos = ['Awareness', 'Engajamento', 'Educacao', 'Prova social', 'Conversao', 'Retencao']
  const formatos = ['Post estatico', 'Carrossel', 'Reels', 'Stories', 'Video longo', 'Live', 'Podcast', 'Blog', 'Newsletter', 'Ebook']
  const canais = ['Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Blog', 'Email', 'Spotify']
  const etapas = ['Topo', 'Meio', 'Fundo']
  const frequencias = ['Diario', '3x semana', '2x semana', '1x semana', 'Quinzenal', '1x mes']

  const adicionarConteudo = () => {
    setConteudos([...conteudos, {
      id: Date.now().toString(),
      tema: '',
      objetivo: 'Engajamento',
      formato: 'Post estatico',
      canal: 'Instagram',
      etapaFunil: 'Topo',
      frequencia: '1x semana'
    }])
  }

  const removerConteudo = (id: string) => {
    if (conteudos.length > 1) {
      setConteudos(conteudos.filter(c => c.id !== id))
    }
  }

  const atualizarConteudo = (id: string, campo: keyof Conteudo, valor: string) => {
    setConteudos(conteudos.map(c => c.id === id ? { ...c, [campo]: valor } : c))
  }

  const conteudosPorEtapa = etapas.map(e => ({
    etapa: e,
    count: conteudos.filter(c => c.etapaFunil === e).length
  }))

  const conteudosPorCanal = canais.map(c => ({
    canal: c,
    count: conteudos.filter(cont => cont.canal === c).length
  })).filter(c => c.count > 0)

  const gerarMatriz = () => {
    return `
MATRIZ DE CONTEUDO
═══════════════════════════════════════════════════════════════

DISTRIBUICAO POR FUNIL
─────────────────────────────────────────────────────────────
${conteudosPorEtapa.map(e => `${e.etapa}: ${e.count} conteudos`).join(' | ')}

DISTRIBUICAO POR CANAL
─────────────────────────────────────────────────────────────
${conteudosPorCanal.map(c => `${c.canal}: ${c.count}`).join(' | ')}

MATRIZ DETALHADA
─────────────────────────────────────────────────────────────
${conteudos.filter(c => c.tema).map(c => `
Tema: ${c.tema}
  • Objetivo: ${c.objetivo}
  • Formato: ${c.formato}
  • Canal: ${c.canal}
  • Etapa: ${c.etapaFunil} de Funil
  • Frequencia: ${c.frequencia}
`).join('\n')}

RESUMO ESTRATEGICO
─────────────────────────────────────────────────────────────
Total de pilares: ${conteudos.filter(c => c.tema).length}
Canais ativos: ${conteudosPorCanal.length}
Mix de funil: ${conteudosPorEtapa.filter(e => e.count > 0).map(e => `${e.etapa}(${e.count})`).join(', ')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarMatriz = () => {
    navigator.clipboard.writeText(gerarMatriz())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCorEtapa = (etapa: string) => {
    switch (etapa) {
      case 'Topo': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Meio': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Fundo': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
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
            <LayoutGrid className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Matriz de <span className="gold-text">Conteudo</span>
          </h1>
          <p className="text-[var(--gray)]">Organize seus pilares de conteudo por canal e objetivo</p>
        </div>

        {/* Resumo por Funil */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {conteudosPorEtapa.map(e => (
            <div key={e.etapa} className={`glass card text-center border ${getCorEtapa(e.etapa)}`}>
              <p className="text-sm">{e.etapa} de Funil</p>
              <p className="font-display text-2xl">{e.count}</p>
            </div>
          ))}
        </div>

        {/* Adicionar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-lg">Pilares de Conteudo ({conteudos.length})</h2>
          <button onClick={adicionarConteudo} className="btn-secondary text-xs">+ Adicionar Pilar</button>
        </div>

        {/* Lista */}
        <div className="space-y-4 mb-8">
          {conteudos.map(conteudo => (
            <div key={conteudo.id} className="glass card">
              <div className="grid md:grid-cols-6 gap-3">
                <div className="md:col-span-2">
                  <label className="input-label text-xs">Tema/Pilar</label>
                  <input
                    type="text"
                    value={conteudo.tema}
                    onChange={(e) => atualizarConteudo(conteudo.id, 'tema', e.target.value)}
                    placeholder="Ex: Dicas rapidas"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="input-label text-xs">Objetivo</label>
                  <select
                    value={conteudo.objetivo}
                    onChange={(e) => atualizarConteudo(conteudo.id, 'objetivo', e.target.value)}
                    className="input-field text-sm"
                  >
                    {objetivos.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label text-xs">Formato</label>
                  <select
                    value={conteudo.formato}
                    onChange={(e) => atualizarConteudo(conteudo.id, 'formato', e.target.value)}
                    className="input-field text-sm"
                  >
                    {formatos.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label text-xs">Canal</label>
                  <select
                    value={conteudo.canal}
                    onChange={(e) => atualizarConteudo(conteudo.id, 'canal', e.target.value)}
                    className="input-field text-sm"
                  >
                    {canais.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="input-label text-xs">Etapa</label>
                    <select
                      value={conteudo.etapaFunil}
                      onChange={(e) => atualizarConteudo(conteudo.id, 'etapaFunil', e.target.value)}
                      className="input-field text-sm"
                    >
                      {etapas.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => removerConteudo(conteudo.id)}
                    className="text-red-400 hover:text-red-300 mt-6"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="input-label text-xs">Frequencia</label>
                <select
                  value={conteudo.frequencia}
                  onChange={(e) => atualizarConteudo(conteudo.id, 'frequencia', e.target.value)}
                  className="input-field text-sm w-40"
                >
                  {frequencias.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarMatriz} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Matriz'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Framework de Conteudo</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Topo de Funil</h4>
              <ul className="space-y-1">
                <li>• Awareness e alcance</li>
                <li>• Conteudo educativo</li>
                <li>• Entretenimento</li>
                <li>• Trending topics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Meio de Funil</h4>
              <ul className="space-y-1">
                <li>• Cases e depoimentos</li>
                <li>• Comparativos</li>
                <li>• Tutoriais aprofundados</li>
                <li>• Webinars</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Fundo de Funil</h4>
              <ul className="space-y-1">
                <li>• Demonstracoes</li>
                <li>• Ofertas e promocoes</li>
                <li>• FAQ e objecoes</li>
                <li>• CTAs diretos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
