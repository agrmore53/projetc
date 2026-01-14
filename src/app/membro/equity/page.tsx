'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, PieChart, Plus, Trash2, Users, DollarSign, Clock, TrendingUp } from 'lucide-react'

interface Socio {
  id: string
  nome: string
  percentual: number
  vesting: boolean
  vestingMeses: number
  cliff: number
  investimento: number
}

export default function EquityPage() {
  const [socios, setSocios] = useState<Socio[]>([
    { id: '1', nome: 'Fundador 1', percentual: 50, vesting: false, vestingMeses: 48, cliff: 12, investimento: 0 },
    { id: '2', nome: 'Fundador 2', percentual: 30, vesting: true, vestingMeses: 48, cliff: 12, investimento: 0 },
  ])
  const [valuation, setValuation] = useState(1000000)
  const [poolOpcoes, setPoolOpcoes] = useState(10)

  const totalPercentual = socios.reduce((acc, s) => acc + s.percentual, 0) + poolOpcoes

  const adicionarSocio = () => {
    const novoId = Date.now().toString()
    setSocios([...socios, {
      id: novoId,
      nome: `Sócio ${socios.length + 1}`,
      percentual: 0,
      vesting: true,
      vestingMeses: 48,
      cliff: 12,
      investimento: 0
    }])
  }

  const removerSocio = (id: string) => {
    setSocios(socios.filter(s => s.id !== id))
  }

  const atualizarSocio = (id: string, campo: keyof Socio, valor: string | number | boolean) => {
    setSocios(socios.map(s => s.id === id ? { ...s, [campo]: valor } : s))
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const calcularValorCota = (percentual: number) => {
    return (valuation * percentual) / 100
  }

  const calcularVestingMensal = (s: Socio) => {
    if (!s.vesting) return s.percentual
    const mesesRestantes = s.vestingMeses - s.cliff
    return mesesRestantes > 0 ? s.percentual / mesesRestantes : 0
  }

  // Cores para o gráfico de pizza
  const cores = [
    '#D4AF37', '#8B7355', '#A0522D', '#CD853F', '#DEB887',
    '#F4A460', '#D2691E', '#B8860B', '#DAA520', '#FFD700'
  ]

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
            Calculadora de <span className="gold-text">Equity</span>
          </h1>
          <p className="text-[var(--gray)]">Divisão de cotas e vesting para founders</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configurações */}
          <div className="lg:col-span-2 space-y-6">
            {/* Valuation */}
            <div className="glass card">
              <h2 className="font-display text-lg mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[var(--gold)]" />
                Valuation da Empresa
              </h2>
              <div>
                <label className="input-label flex justify-between">
                  <span>Valuation Atual</span>
                  <span className="text-[var(--gold)]">{formatCurrency(valuation)}</span>
                </label>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={valuation}
                  onChange={(e) => setValuation(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
              </div>
              <div className="mt-4">
                <label className="input-label flex justify-between">
                  <span>Pool de Opções (ESOP)</span>
                  <span className="text-[var(--gold)]">{poolOpcoes}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={poolOpcoes}
                  onChange={(e) => setPoolOpcoes(Number(e.target.value))}
                  className="w-full accent-[var(--gold)]"
                />
                <p className="text-xs text-[var(--gray)] mt-1">Reserva para funcionários-chave</p>
              </div>
            </div>

            {/* Sócios */}
            <div className="glass card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--gold)]" />
                  Sócios e Investidores
                </h2>
                <button onClick={adicionarSocio} className="btn-secondary text-sm flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>

              <div className="space-y-6">
                {socios.map((socio, index) => (
                  <div key={socio.id} className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: cores[index % cores.length] }}
                        />
                        <input
                          type="text"
                          value={socio.nome}
                          onChange={(e) => atualizarSocio(socio.id, 'nome', e.target.value)}
                          className="bg-transparent border-none text-white font-semibold focus:outline-none"
                        />
                      </div>
                      {socios.length > 1 && (
                        <button
                          onClick={() => removerSocio(socio.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="input-label flex justify-between text-sm">
                          <span>Percentual</span>
                          <span className="text-[var(--gold)]">{socio.percentual}%</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.5"
                          value={socio.percentual}
                          onChange={(e) => atualizarSocio(socio.id, 'percentual', Number(e.target.value))}
                          className="w-full accent-[var(--gold)]"
                        />
                      </div>
                      <div>
                        <label className="input-label text-sm">Investimento</label>
                        <input
                          type="number"
                          value={socio.investimento}
                          onChange={(e) => atualizarSocio(socio.id, 'investimento', Number(e.target.value))}
                          placeholder="R$ 0"
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={socio.vesting}
                          onChange={(e) => atualizarSocio(socio.id, 'vesting', e.target.checked)}
                          className="accent-[var(--gold)]"
                        />
                        <span className="text-sm">Aplicar Vesting</span>
                      </label>

                      {socio.vesting && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="input-label text-xs">Período Total (meses)</label>
                            <select
                              value={socio.vestingMeses}
                              onChange={(e) => atualizarSocio(socio.id, 'vestingMeses', Number(e.target.value))}
                              className="input-field text-sm"
                            >
                              <option value={24}>24 meses</option>
                              <option value={36}>36 meses</option>
                              <option value={48}>48 meses</option>
                              <option value={60}>60 meses</option>
                            </select>
                          </div>
                          <div>
                            <label className="input-label text-xs">Cliff (meses)</label>
                            <select
                              value={socio.cliff}
                              onChange={(e) => atualizarSocio(socio.id, 'cliff', Number(e.target.value))}
                              className="input-field text-sm"
                            >
                              <option value={0}>Sem cliff</option>
                              <option value={6}>6 meses</option>
                              <option value={12}>12 meses</option>
                              <option value={18}>18 meses</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm">
                      <span className="text-[var(--gray)]">Valor da Cota:</span>
                      <span className="text-[var(--gold)] font-semibold">
                        {formatCurrency(calcularValorCota(socio.percentual))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="space-y-6">
            {/* Gráfico de Pizza Visual */}
            <div className="glass card">
              <h3 className="font-display text-lg mb-4">Cap Table</h3>

              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {(() => {
                    let acumulado = 0
                    const elementos: React.ReactElement[] = []

                    socios.forEach((socio, index) => {
                      const percentual = (socio.percentual / 100) * 100
                      const circunferencia = 2 * Math.PI * 40
                      const offset = (acumulado / 100) * circunferencia
                      const tamanho = (percentual / 100) * circunferencia

                      elementos.push(
                        <circle
                          key={socio.id}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={cores[index % cores.length]}
                          strokeWidth="20"
                          strokeDasharray={`${tamanho} ${circunferencia - tamanho}`}
                          strokeDashoffset={-offset}
                        />
                      )
                      acumulado += percentual
                    })

                    // Pool de opções
                    if (poolOpcoes > 0) {
                      const circunferencia = 2 * Math.PI * 40
                      const offset = (acumulado / 100) * circunferencia
                      const tamanho = (poolOpcoes / 100) * circunferencia
                      elementos.push(
                        <circle
                          key="pool"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#666"
                          strokeWidth="20"
                          strokeDasharray={`${tamanho} ${circunferencia - tamanho}`}
                          strokeDashoffset={-offset}
                        />
                      )
                    }

                    return elementos
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-display gold-text">{totalPercentual.toFixed(1)}%</p>
                    <p className="text-xs text-[var(--gray)]">Distribuído</p>
                  </div>
                </div>
              </div>

              {/* Legenda */}
              <div className="space-y-2">
                {socios.map((socio, index) => (
                  <div key={socio.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cores[index % cores.length] }}
                      />
                      <span className="text-[var(--gray)]">{socio.nome}</span>
                    </div>
                    <span className="font-semibold">{socio.percentual}%</span>
                  </div>
                ))}
                {poolOpcoes > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                      <span className="text-[var(--gray)]">Pool ESOP</span>
                    </div>
                    <span className="font-semibold">{poolOpcoes}%</span>
                  </div>
                )}
              </div>

              {totalPercentual !== 100 && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  totalPercentual > 100 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {totalPercentual > 100
                    ? `⚠️ Total excede 100% (${(totalPercentual - 100).toFixed(1)}% a mais)`
                    : `📊 ${(100 - totalPercentual).toFixed(1)}% não distribuído`
                  }
                </div>
              )}
            </div>

            {/* Valores */}
            <div className="glass card">
              <h3 className="font-display text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--gold)]" />
                Valores
              </h3>

              <div className="space-y-3">
                {socios.map((socio, index) => (
                  <div key={socio.id} className="flex justify-between items-center pb-3 border-b border-white/10">
                    <div>
                      <p className="font-semibold">{socio.nome}</p>
                      <p className="text-xs text-[var(--gray)]">
                        {socio.vesting ? `Vesting: ${socio.vestingMeses}m (cliff ${socio.cliff}m)` : 'Sem vesting'}
                      </p>
                    </div>
                    <p className="text-[var(--gold)] font-display">
                      {formatCurrency(calcularValorCota(socio.percentual))}
                    </p>
                  </div>
                ))}

                {poolOpcoes > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <div>
                      <p className="font-semibold">Pool ESOP</p>
                      <p className="text-xs text-[var(--gray)]">Reserva para funcionários</p>
                    </div>
                    <p className="text-[var(--gold)] font-display">
                      {formatCurrency(calcularValorCota(poolOpcoes))}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <p className="font-display">Valuation Total</p>
                  <p className="text-xl font-display gold-text">{formatCurrency(valuation)}</p>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="glass p-4 border border-[var(--gold)]/30">
              <h4 className="font-display text-sm gold-text mb-2">💡 Dicas de Equity</h4>
              <ul className="text-xs text-[var(--gray)] space-y-1">
                <li>• Vesting padrão: 4 anos com 1 ano de cliff</li>
                <li>• Reserve 10-20% para pool de opções</li>
                <li>• Documente tudo em contrato social</li>
                <li>• Consulte um advogado especializado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
