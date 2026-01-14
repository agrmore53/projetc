'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, PieChart, Copy, Check, Plus, Trash2, Users, Briefcase, Sparkles, DollarSign } from 'lucide-react'

interface Socio {
  id: string
  nome: string
  tipo: 'fundador' | 'investidor' | 'funcionario' | 'advisor'
  acoes: number
  investimento: number
  cliff?: number
  vesting?: number
}

interface Rodada {
  id: string
  nome: string
  valorRodada: number
  preMoneyValuation: number
  dataCriacao: string
}

export default function CapTablePage() {
  const [copied, setCopied] = useState(false)
  const [empresa, setEmpresa] = useState('')
  const [totalAcoes, setTotalAcoes] = useState(1000000)

  const [socios, setSocios] = useState<Socio[]>([
    { id: '1', nome: 'Fundador 1', tipo: 'fundador', acoes: 400000, investimento: 0 },
    { id: '2', nome: 'Fundador 2', tipo: 'fundador', acoes: 300000, investimento: 0 },
    { id: '3', nome: 'Pool de Opcoes', tipo: 'funcionario', acoes: 150000, investimento: 0 },
    { id: '4', nome: 'Anjo 1', tipo: 'investidor', acoes: 100000, investimento: 200000 },
    { id: '5', nome: 'Advisor', tipo: 'advisor', acoes: 50000, investimento: 0 },
  ])

  const [rodadas, setRodadas] = useState<Rodada[]>([
    { id: '1', nome: 'Anjo', valorRodada: 200000, preMoneyValuation: 1800000, dataCriacao: '2024-01-01' }
  ])

  const getTipoConfig = (tipo: Socio['tipo']) => {
    switch (tipo) {
      case 'fundador':
        return { icon: Users, cor: '#22c55e', label: 'Fundador' }
      case 'investidor':
        return { icon: DollarSign, cor: '#3b82f6', label: 'Investidor' }
      case 'funcionario':
        return { icon: Briefcase, cor: '#eab308', label: 'Pool ESOP' }
      case 'advisor':
        return { icon: Sparkles, cor: '#a855f7', label: 'Advisor' }
    }
  }

  const acoesEmitidas = socios.reduce((sum, s) => sum + s.acoes, 0)
  const totalInvestido = socios.reduce((sum, s) => sum + s.investimento, 0)

  const calcularParticipacao = (acoes: number) => {
    return acoesEmitidas > 0 ? (acoes / acoesEmitidas) * 100 : 0
  }

  const ultimaRodada = rodadas[rodadas.length - 1]
  const postMoneyValuation = ultimaRodada
    ? ultimaRodada.preMoneyValuation + ultimaRodada.valorRodada
    : 0

  const precoAcao = acoesEmitidas > 0 && postMoneyValuation > 0
    ? postMoneyValuation / acoesEmitidas
    : 0

  const adicionarSocio = () => {
    const novo: Socio = {
      id: Date.now().toString(),
      nome: '',
      tipo: 'investidor',
      acoes: 0,
      investimento: 0
    }
    setSocios([...socios, novo])
  }

  const removerSocio = (id: string) => {
    setSocios(socios.filter(s => s.id !== id))
  }

  const atualizarSocio = (id: string, campo: keyof Socio, valor: string | number) => {
    setSocios(socios.map(s =>
      s.id === id ? { ...s, [campo]: valor } : s
    ))
  }

  const adicionarRodada = () => {
    const nova: Rodada = {
      id: Date.now().toString(),
      nome: 'Nova Rodada',
      valorRodada: 0,
      preMoneyValuation: postMoneyValuation || 0,
      dataCriacao: new Date().toISOString().split('T')[0]
    }
    setRodadas([...rodadas, nova])
  }

  const removerRodada = (id: string) => {
    setRodadas(rodadas.filter(r => r.id !== id))
  }

  const atualizarRodada = (id: string, campo: keyof Rodada, valor: string | number) => {
    setRodadas(rodadas.map(r =>
      r.id === id ? { ...r, [campo]: valor } : r
    ))
  }

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const formatarNumero = (valor: number) => {
    return valor.toLocaleString('pt-BR')
  }

  const copiarCapTable = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
                    CAP TABLE - ${empresa || '[EMPRESA]'}
═══════════════════════════════════════════════════════════════

RESUMO
───────────────────────────────────────────────────────────────
Acoes Emitidas: ${formatarNumero(acoesEmitidas)}
Valuation (Post-Money): ${formatarMoeda(postMoneyValuation)}
Preco por Acao: ${formatarMoeda(precoAcao)}
Total Investido: ${formatarMoeda(totalInvestido)}

SOCIOS
───────────────────────────────────────────────────────────────
${socios.map(s => {
  const config = getTipoConfig(s.tipo)
  const participacao = calcularParticipacao(s.acoes)
  const valor = s.acoes * precoAcao
  return `${s.nome || '[Sem nome]'} (${config.label})
  Acoes: ${formatarNumero(s.acoes)} (${participacao.toFixed(2)}%)
  Valor: ${formatarMoeda(valor)}
  ${s.investimento > 0 ? `Investimento: ${formatarMoeda(s.investimento)}` : ''}`
}).join('\n\n')}

HISTORICO DE RODADAS
───────────────────────────────────────────────────────────────
${rodadas.map(r => `${r.nome}
  Data: ${new Date(r.dataCriacao).toLocaleDateString('pt-BR')}
  Pre-Money: ${formatarMoeda(r.preMoneyValuation)}
  Rodada: ${formatarMoeda(r.valorRodada)}
  Post-Money: ${formatarMoeda(r.preMoneyValuation + r.valorRodada)}`
).join('\n\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Ordenar socios por participacao
  const sociosOrdenados = [...socios].sort((a, b) => b.acoes - a.acoes)

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Cap Table</span> Manager
          </h1>
          <p className="text-[var(--gray)]">Gerencie a estrutura societaria da sua startup</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome da Empresa</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="SuaStartup"
                className="input-field"
              />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={copiarCapTable} className="btn-primary flex-1 flex items-center justify-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Exportar Cap Table'}
              </button>
            </div>
          </div>
        </div>

        {/* Resumo Visual */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Valuation</p>
            <p className="font-display text-xl text-[var(--gold)]">
              {formatarMoeda(postMoneyValuation)}
            </p>
            <p className="text-xs text-[var(--gray)]">Post-money</p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Acoes Emitidas</p>
            <p className="font-display text-xl text-[var(--gold)]">
              {formatarNumero(acoesEmitidas)}
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Preco/Acao</p>
            <p className="font-display text-xl text-[var(--gold)]">
              {formatarMoeda(precoAcao)}
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-sm text-[var(--gray)]">Total Investido</p>
            <p className="font-display text-xl text-[var(--gold)]">
              {formatarMoeda(totalInvestido)}
            </p>
          </div>
        </div>

        {/* Grafico de Pizza Visual */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Distribuicao de Equity</h2>
          <div className="flex flex-wrap gap-3">
            {sociosOrdenados.map((socio) => {
              const config = getTipoConfig(socio.tipo)
              const participacao = calcularParticipacao(socio.acoes)
              if (participacao < 0.1) return null

              return (
                <div
                  key={socio.id}
                  className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1.5"
                  style={{ borderLeft: `3px solid ${config.cor}` }}
                >
                  <span className="text-sm">{socio.nome || 'Sem nome'}</span>
                  <span className="text-sm font-semibold" style={{ color: config.cor }}>
                    {participacao.toFixed(1)}%
                  </span>
                </div>
              )
            })}
          </div>

          {/* Barra de progresso visual */}
          <div className="mt-4 h-6 bg-black/30 rounded-full overflow-hidden flex">
            {sociosOrdenados.map((socio) => {
              const config = getTipoConfig(socio.tipo)
              const participacao = calcularParticipacao(socio.acoes)
              if (participacao < 0.1) return null

              return (
                <div
                  key={socio.id}
                  className="h-full transition-all"
                  style={{
                    width: `${participacao}%`,
                    backgroundColor: config.cor
                  }}
                  title={`${socio.nome}: ${participacao.toFixed(1)}%`}
                />
              )
            })}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs">
            {(['fundador', 'investidor', 'funcionario', 'advisor'] as const).map(tipo => {
              const config = getTipoConfig(tipo)
              return (
                <div key={tipo} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.cor }} />
                  <span>{config.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Lista de Socios */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Socios e Acionistas</h2>
            <button onClick={adicionarSocio} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {socios.map((socio) => {
              const config = getTipoConfig(socio.tipo)
              const Icon = config.icon
              const participacao = calcularParticipacao(socio.acoes)
              const valorEquity = socio.acoes * precoAcao

              return (
                <div
                  key={socio.id}
                  className="bg-black/30 rounded-xl p-4"
                  style={{ borderLeft: `4px solid ${config.cor}` }}
                >
                  <div className="grid md:grid-cols-6 gap-3 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" style={{ color: config.cor }} />
                        <select
                          value={socio.tipo}
                          onChange={(e) => atualizarSocio(socio.id, 'tipo', e.target.value)}
                          className="input-field text-xs py-1 px-2"
                        >
                          <option value="fundador">Fundador</option>
                          <option value="investidor">Investidor</option>
                          <option value="funcionario">Pool ESOP</option>
                          <option value="advisor">Advisor</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={socio.nome}
                        onChange={(e) => atualizarSocio(socio.id, 'nome', e.target.value)}
                        placeholder="Nome"
                        className="input-field text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--gray)]">Acoes</label>
                      <input
                        type="number"
                        value={socio.acoes}
                        onChange={(e) => atualizarSocio(socio.id, 'acoes', Number(e.target.value))}
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--gray)]">%</label>
                      <p className="font-display text-lg" style={{ color: config.cor }}>
                        {participacao.toFixed(2)}%
                      </p>
                    </div>

                    <div>
                      <label className="text-xs text-[var(--gray)]">Investimento</label>
                      <input
                        type="number"
                        value={socio.investimento}
                        onChange={(e) => atualizarSocio(socio.id, 'investimento', Number(e.target.value))}
                        placeholder="0"
                        className="input-field text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs text-[var(--gray)]">Valor</label>
                        <p className="font-semibold text-sm">{formatarMoeda(valorEquity)}</p>
                      </div>
                      <button
                        onClick={() => removerSocio(socio.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rodadas */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Historico de Rodadas</h2>
            <button onClick={adicionarRodada} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Nova Rodada
            </button>
          </div>

          <div className="space-y-3">
            {rodadas.map((rodada, index) => (
              <div key={rodada.id} className="bg-black/30 rounded-xl p-4">
                <div className="grid md:grid-cols-5 gap-3 items-center">
                  <div>
                    <label className="text-xs text-[var(--gray)]">Rodada</label>
                    <input
                      type="text"
                      value={rodada.nome}
                      onChange={(e) => atualizarRodada(rodada.id, 'nome', e.target.value)}
                      placeholder="Seed, Series A..."
                      className="input-field text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--gray)]">Data</label>
                    <input
                      type="date"
                      value={rodada.dataCriacao}
                      onChange={(e) => atualizarRodada(rodada.id, 'dataCriacao', e.target.value)}
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--gray)]">Pre-Money (R$)</label>
                    <input
                      type="number"
                      value={rodada.preMoneyValuation}
                      onChange={(e) => atualizarRodada(rodada.id, 'preMoneyValuation', Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--gray)]">Valor Rodada (R$)</label>
                    <input
                      type="number"
                      value={rodada.valorRodada}
                      onChange={(e) => atualizarRodada(rodada.id, 'valorRodada', Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs text-[var(--gray)]">Post-Money</label>
                      <p className="font-semibold text-sm text-[var(--gold)]">
                        {formatarMoeda(rodada.preMoneyValuation + rodada.valorRodada)}
                      </p>
                    </div>
                    {rodadas.length > 1 && (
                      <button
                        onClick={() => removerRodada(rodada.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Boas Praticas de Cap Table</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Pool de Opcoes</h4>
              <p>Reserve 10-20% para funcionarios. Investidores esperam isso antes de investir.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Vesting Padrao</h4>
              <p>4 anos com cliff de 1 ano e vesting mensal e o padrao de mercado.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Anti-diluicao</h4>
              <p>Fundadores devem manter pelo menos 50% apos Seed para ter controle.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Documentacao</h4>
              <p>Use um advogado especializado. Erros no cap table sao caros de corrigir.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
