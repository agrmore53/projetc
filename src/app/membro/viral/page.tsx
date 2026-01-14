'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, Copy, Check, TrendingUp, Users, Send, UserPlus } from 'lucide-react'

export default function ViralPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    usuariosAtuais: 1000,
    convitesEnviados: 2500,
    convitesAceitos: 375,
    cicloViralDias: 14,
    projecaoMeses: 12
  })

  // Calculos
  const convitesPorUsuario = dados.usuariosAtuais > 0 ? dados.convitesEnviados / dados.usuariosAtuais : 0
  const taxaConversao = dados.convitesEnviados > 0 ? (dados.convitesAceitos / dados.convitesEnviados) * 100 : 0
  const coeficienteViral = convitesPorUsuario * (taxaConversao / 100)

  const isViral = coeficienteViral >= 1
  const crescimentoOrganico = coeficienteViral > 0 ? (coeficienteViral / (1 - Math.min(coeficienteViral, 0.99))) : 0

  // Projecao de crescimento
  const projetarCrescimento = () => {
    const ciclosPorMes = 30 / dados.cicloViralDias
    const projecao = []
    let usuarios = dados.usuariosAtuais

    for (let mes = 0; mes <= dados.projecaoMeses; mes++) {
      projecao.push({ mes, usuarios: Math.round(usuarios) })
      // Crescimento viral + crescimento base de 5%
      const novosVirais = usuarios * coeficienteViral * ciclosPorMes / 12
      usuarios = usuarios + novosVirais + (usuarios * 0.05 / 12)
    }

    return projecao
  }

  const projecao = projetarCrescimento()
  const usuariosFinais = projecao[projecao.length - 1]?.usuarios || dados.usuariosAtuais
  const crescimentoTotal = dados.usuariosAtuais > 0 ? ((usuariosFinais - dados.usuariosAtuais) / dados.usuariosAtuais) * 100 : 0

  const getStatusViral = () => {
    if (coeficienteViral >= 1) return { texto: 'Viral!', cor: '#22c55e', desc: 'Crescimento exponencial garantido' }
    if (coeficienteViral >= 0.7) return { texto: 'Quase Viral', cor: '#eab308', desc: 'Bom potencial, otimize mais' }
    if (coeficienteViral >= 0.4) return { texto: 'Moderado', cor: '#f97316', desc: 'Ajuda no crescimento' }
    return { texto: 'Baixo', cor: '#ef4444', desc: 'Precisa melhorar significativamente' }
  }

  const status = getStatusViral()

  const copiarAnalise = () => {
    const texto = `
ANALISE DE COEFICIENTE VIRAL
═══════════════════════════════════════════════════════════════

METRICAS ATUAIS
─────────────────────────────────────────────────────────────
Usuarios Atuais: ${dados.usuariosAtuais.toLocaleString('pt-BR')}
Convites Enviados: ${dados.convitesEnviados.toLocaleString('pt-BR')}
Convites Aceitos: ${dados.convitesAceitos.toLocaleString('pt-BR')}
Ciclo Viral: ${dados.cicloViralDias} dias

RESULTADOS
─────────────────────────────────────────────────────────────
Convites por Usuario: ${convitesPorUsuario.toFixed(2)}
Taxa de Conversao: ${taxaConversao.toFixed(1)}%
COEFICIENTE VIRAL (K): ${coeficienteViral.toFixed(2)}

STATUS: ${status.texto}
${status.desc}

PROJECAO (${dados.projecaoMeses} meses)
─────────────────────────────────────────────────────────────
Usuarios Projetados: ${usuariosFinais.toLocaleString('pt-BR')}
Crescimento Total: ${crescimentoTotal.toFixed(0)}%

COMO MELHORAR
─────────────────────────────────────────────────────────────
${coeficienteViral < 1 ? `
Para atingir K=1, voce precisa:
- Aumentar convites/usuario para ${(1 / (taxaConversao / 100)).toFixed(1)} (atual: ${convitesPorUsuario.toFixed(1)})
- OU aumentar taxa de conversao para ${((1 / convitesPorUsuario) * 100).toFixed(1)}% (atual: ${taxaConversao.toFixed(1)}%)
` : 'Seu produto ja e viral! Continue otimizando para acelerar ainda mais.'}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
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
            <Share2 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Coeficiente <span className="gold-text">Viral</span>
          </h1>
          <p className="text-[var(--gray)]">Calcule o potencial de crescimento viral do seu produto</p>
        </div>

        {/* Input de Dados */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados do Seu Produto</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label flex items-center gap-2">
                <Users className="w-4 h-4" />
                Usuarios Atuais
              </label>
              <input
                type="number"
                value={dados.usuariosAtuais}
                onChange={(e) => setDados({ ...dados, usuariosAtuais: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Send className="w-4 h-4" />
                Convites Enviados (total)
              </label>
              <input
                type="number"
                value={dados.convitesEnviados}
                onChange={(e) => setDados({ ...dados, convitesEnviados: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Convites Aceitos (novos usuarios)
              </label>
              <input
                type="number"
                value={dados.convitesAceitos}
                onChange={(e) => setDados({ ...dados, convitesAceitos: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Ciclo Viral (dias)</label>
              <input
                type="number"
                value={dados.cicloViralDias}
                onChange={(e) => setDados({ ...dados, cicloViralDias: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
              <p className="text-xs text-[var(--gray)] mt-1">Tempo medio ate um usuario convidar outros</p>
            </div>
          </div>
        </div>

        {/* Resultado Principal */}
        <div className="glass card mb-8 text-center">
          <h2 className="text-sm text-[var(--gray)] mb-2">Coeficiente Viral (K)</h2>
          <p className="font-display text-6xl mb-2" style={{ color: status.cor }}>
            {coeficienteViral.toFixed(2)}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${status.cor}20` }}>
            <TrendingUp className="w-4 h-4" style={{ color: status.cor }} />
            <span style={{ color: status.cor }}>{status.texto}</span>
          </div>
          <p className="text-sm text-[var(--gray)] mt-2">{status.desc}</p>
        </div>

        {/* Metricas Detalhadas */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Convites/Usuario</p>
            <p className="font-display text-2xl text-[var(--gold)]">{convitesPorUsuario.toFixed(1)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Taxa Conversao</p>
            <p className="font-display text-2xl text-[var(--gold)]">{taxaConversao.toFixed(1)}%</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Ciclo Viral</p>
            <p className="font-display text-2xl text-[var(--gold)]">{dados.cicloViralDias}d</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Multiplicador</p>
            <p className="font-display text-2xl text-[var(--gold)]">{crescimentoOrganico.toFixed(1)}x</p>
          </div>
        </div>

        {/* Formula Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Formula do Coeficiente Viral</h2>
          <div className="bg-black/30 rounded-xl p-6 text-center">
            <p className="font-mono text-lg mb-4">
              <span className="text-[var(--gold)]">K</span> = Convites por Usuario × Taxa de Conversao
            </p>
            <p className="font-mono text-2xl">
              <span className="text-[var(--gold)]">{coeficienteViral.toFixed(2)}</span> = {convitesPorUsuario.toFixed(1)} × {(taxaConversao / 100).toFixed(2)}
            </p>
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <p className="text-green-400 font-semibold">K {'>'} 1</p>
              <p className="text-[var(--gray)]">Viral - Crescimento exponencial</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-xl">
              <p className="text-yellow-400 font-semibold">K = 0.5 a 1</p>
              <p className="text-[var(--gray)]">Bom - Amplifica crescimento</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl">
              <p className="text-red-400 font-semibold">K {'<'} 0.5</p>
              <p className="text-[var(--gray)]">Baixo - Pouco impacto</p>
            </div>
          </div>
        </div>

        {/* Projecao */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Projecao de Crescimento</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--gray)]">Meses:</label>
              <input
                type="number"
                value={dados.projecaoMeses}
                onChange={(e) => setDados({ ...dados, projecaoMeses: Number(e.target.value) })}
                className="input-field w-20 text-center"
                min="1"
                max="36"
              />
            </div>
          </div>

          {/* Grafico Visual Simples */}
          <div className="bg-black/30 rounded-xl p-4 mb-4">
            <div className="flex items-end justify-between h-40 gap-1">
              {projecao.filter((_, i) => i % Math.ceil(projecao.length / 12) === 0 || i === projecao.length - 1).map((p, i, arr) => {
                const maxUsuarios = Math.max(...projecao.map(x => x.usuarios))
                const altura = (p.usuarios / maxUsuarios) * 100
                return (
                  <div key={p.mes} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-[var(--gold)] rounded-t transition-all"
                      style={{ height: `${altura}%`, minHeight: '4px' }}
                    />
                    <span className="text-[10px] text-[var(--gray)]">M{p.mes}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-[var(--gray)]">Usuarios Hoje</p>
              <p className="font-display text-xl">{dados.usuariosAtuais.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gray)]">Usuarios em {dados.projecaoMeses} meses</p>
              <p className="font-display text-xl text-[var(--gold)]">{usuariosFinais.toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--gray)]">Crescimento</p>
              <p className="font-display text-xl text-green-400">+{crescimentoTotal.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Como Melhorar */}
        {coeficienteViral < 1 && (
          <div className="glass card mb-8">
            <h2 className="font-display text-lg mb-4">Como Atingir K = 1</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--gold)] mb-2">Opcao 1: Mais Convites</h3>
                <p className="text-sm text-[var(--gray)] mb-2">Mantenha a taxa de conversao e aumente convites para:</p>
                <p className="font-display text-2xl">{(1 / (taxaConversao / 100)).toFixed(1)} convites/usuario</p>
                <p className="text-xs text-[var(--gray)]">Atual: {convitesPorUsuario.toFixed(1)}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--gold)] mb-2">Opcao 2: Melhor Conversao</h3>
                <p className="text-sm text-[var(--gray)] mb-2">Mantenha os convites e aumente conversao para:</p>
                <p className="font-display text-2xl">{((1 / convitesPorUsuario) * 100).toFixed(1)}%</p>
                <p className="text-xs text-[var(--gray)]">Atual: {taxaConversao.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarAnalise} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Analise'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Taticas para Aumentar Viralidade</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Aumentar Convites</h4>
              <ul className="space-y-1">
                <li>• Incentivos para quem convida (descontos, features)</li>
                <li>• Facilitar compartilhamento (1 clique)</li>
                <li>• Gamificacao (ranking de indicacoes)</li>
                <li>• Momentos de "aha" como gatilho de convite</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Aumentar Conversao</h4>
              <ul className="space-y-1">
                <li>• Beneficio para quem e convidado</li>
                <li>• Onboarding personalizado</li>
                <li>• Prova social (X amigos ja usam)</li>
                <li>• Urgencia (convite expira em X dias)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
