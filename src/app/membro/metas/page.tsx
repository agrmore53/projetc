'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, Calculator, TrendingUp, Calendar, Clock, Award, Zap, AlertCircle } from 'lucide-react'

interface MetaConfig {
  metaMensal: number
  diasUteis: number
  horasPorDia: number
  ticketMedio: number
  taxaConversao: number
  vendasRealizadas: number
  diasTrabalhados: number
}

interface Resultado {
  metaDiaria: number
  metaSemanal: number
  vendasNecessarias: number
  vendasDiarias: number
  contatosDiarios: number
  horasPorVenda: number
  progressoAtual: number
  metaRestante: number
  mediaRestante: number
  diasRestantes: number
  statusMeta: 'ahead' | 'on_track' | 'behind' | 'critical'
}

export default function CalculadoraMetas() {
  const [config, setConfig] = useState<MetaConfig>({
    metaMensal: 100000,
    diasUteis: 22,
    horasPorDia: 8,
    ticketMedio: 5000,
    taxaConversao: 20,
    vendasRealizadas: 0,
    diasTrabalhados: 0,
  })

  const [resultado, setResultado] = useState<Resultado | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-metas-config')
    if (saved) {
      setConfig(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mentoria-metas-config', JSON.stringify(config))
    calcularMetas()
  }, [config])

  const calcularMetas = () => {
    const {
      metaMensal,
      diasUteis,
      horasPorDia,
      ticketMedio,
      taxaConversao,
      vendasRealizadas,
      diasTrabalhados,
    } = config

    // Cálculos básicos
    const metaDiaria = metaMensal / diasUteis
    const metaSemanal = metaDiaria * 5
    const vendasNecessarias = Math.ceil(metaMensal / ticketMedio)
    const vendasDiarias = vendasNecessarias / diasUteis
    const contatosDiarios = Math.ceil(vendasDiarias / (taxaConversao / 100))
    const totalHoras = diasUteis * horasPorDia
    const horasPorVenda = totalHoras / vendasNecessarias

    // Progresso atual
    const progressoAtual = (vendasRealizadas / metaMensal) * 100
    const metaRestante = metaMensal - vendasRealizadas
    const diasRestantes = diasUteis - diasTrabalhados
    const mediaRestante = diasRestantes > 0 ? metaRestante / diasRestantes : metaRestante

    // Status da meta
    const progressoEsperado = diasTrabalhados > 0 ? (diasTrabalhados / diasUteis) * 100 : 0
    let statusMeta: 'ahead' | 'on_track' | 'behind' | 'critical' = 'on_track'

    if (progressoAtual >= progressoEsperado + 10) {
      statusMeta = 'ahead'
    } else if (progressoAtual >= progressoEsperado - 5) {
      statusMeta = 'on_track'
    } else if (progressoAtual >= progressoEsperado - 20) {
      statusMeta = 'behind'
    } else {
      statusMeta = 'critical'
    }

    setResultado({
      metaDiaria,
      metaSemanal,
      vendasNecessarias,
      vendasDiarias,
      contatosDiarios,
      horasPorVenda,
      progressoAtual,
      metaRestante,
      mediaRestante,
      diasRestantes,
      statusMeta,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ahead':
        return { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Acima da Meta', icon: '🚀' }
      case 'on_track':
        return { color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'No Caminho Certo', icon: '✅' }
      case 'behind':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Atenção Necessária', icon: '⚠️' }
      case 'critical':
        return { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Situação Crítica', icon: '🔴' }
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', label: 'Indefinido', icon: '❓' }
    }
  }

  const dicasComerciais = [
    {
      titulo: 'Regra dos 3x',
      descricao: 'Para cada R$1 de meta, tenha R$3 em pipeline. Isso garante margem de segurança.',
    },
    {
      titulo: 'Lei de Pareto',
      descricao: '80% das vendas vêm de 20% dos clientes. Foque nos leads mais qualificados.',
    },
    {
      titulo: 'Bloco de Prospecção',
      descricao: 'Reserve 2h diárias só para prospecção. Nunca misture com outras tarefas.',
    },
    {
      titulo: 'Follow-up é Rei',
      descricao: '80% das vendas acontecem após o 5º follow-up. Não desista cedo demais.',
    },
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Calculadora de Metas</h1>
            <p className="text-white/60">Planeje e acompanhe suas metas de vendas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuração */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[var(--gold)]" />
              Configuração da Meta
            </h2>

            <div className="space-y-5">
              {/* Meta Mensal */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Meta Mensal (R$)
                </label>
                <input
                  type="number"
                  value={config.metaMensal}
                  onChange={(e) => setConfig({ ...config, metaMensal: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Dias Úteis */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Dias Úteis/Mês
                  </label>
                  <input
                    type="number"
                    value={config.diasUteis}
                    onChange={(e) => setConfig({ ...config, diasUteis: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                </div>

                {/* Horas por Dia */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Horas/Dia
                  </label>
                  <input
                    type="number"
                    value={config.horasPorDia}
                    onChange={(e) => setConfig({ ...config, horasPorDia: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Ticket Médio */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Ticket Médio (R$)
                  </label>
                  <input
                    type="number"
                    value={config.ticketMedio}
                    onChange={(e) => setConfig({ ...config, ticketMedio: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                </div>

                {/* Taxa de Conversão */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Taxa Conversão (%)
                  </label>
                  <input
                    type="number"
                    value={config.taxaConversao}
                    onChange={(e) => setConfig({ ...config, taxaConversao: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Separador */}
              <div className="border-t border-white/10 pt-5 mt-5">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--gold)]" />
                  Progresso Atual
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Vendas Realizadas */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Vendas Realizadas (R$)
                    </label>
                    <input
                      type="number"
                      value={config.vendasRealizadas}
                      onChange={(e) => setConfig({ ...config, vendasRealizadas: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Dias Trabalhados */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Dias Trabalhados
                    </label>
                    <input
                      type="number"
                      value={config.diasTrabalhados}
                      onChange={(e) => setConfig({ ...config, diasTrabalhados: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            {resultado && (
              <>
                {/* Status da Meta */}
                {config.diasTrabalhados > 0 && (
                  <div className={`glass rounded-2xl p-6 ${getStatusConfig(resultado.statusMeta).bg}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Status da Meta</h3>
                      <span className="text-2xl">{getStatusConfig(resultado.statusMeta).icon}</span>
                    </div>
                    <p className={`text-2xl font-bold ${getStatusConfig(resultado.statusMeta).color}`}>
                      {getStatusConfig(resultado.statusMeta).label}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>{resultado.progressoAtual.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            resultado.statusMeta === 'ahead' ? 'bg-green-500' :
                            resultado.statusMeta === 'on_track' ? 'bg-blue-500' :
                            resultado.statusMeta === 'behind' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(resultado.progressoAtual, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Metas Calculadas */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--gold)]" />
                    Suas Metas
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Meta Diária</p>
                      <p className="text-2xl font-bold text-[var(--gold)]">
                        {formatCurrency(resultado.metaDiaria)}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 mb-1">Meta Semanal</p>
                      <p className="text-2xl font-bold text-[var(--gold)]">
                        {formatCurrency(resultado.metaSemanal)}
                      </p>
                    </div>
                  </div>

                  {config.diasTrabalhados > 0 && resultado.diasRestantes > 0 && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl border border-[var(--gold)]/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-[var(--gold)]" />
                        <span className="text-sm font-medium">Para Bater a Meta</span>
                      </div>
                      <p className="text-sm text-white/70">
                        Você precisa vender <span className="text-[var(--gold)] font-bold">
                        {formatCurrency(resultado.mediaRestante)}</span> por dia nos próximos{' '}
                        <span className="text-[var(--gold)] font-bold">{resultado.diasRestantes} dias</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Atividades Necessárias */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[var(--gold)]" />
                    Atividades Necessárias
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-[var(--gold)]" />
                        </div>
                        <div>
                          <p className="font-medium">Vendas no Mês</p>
                          <p className="text-sm text-white/60">Total para bater a meta</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{resultado.vendasNecessarias}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Vendas por Dia</p>
                          <p className="text-sm text-white/60">Média diária necessária</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{resultado.vendasDiarias.toFixed(1)}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Contatos por Dia</p>
                          <p className="text-sm text-white/60">Com {config.taxaConversao}% de conversão</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{resultado.contatosDiarios}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">Horas por Venda</p>
                          <p className="text-sm text-white/60">Tempo médio investido</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold">{resultado.horasPorVenda.toFixed(1)}h</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dicas Comerciais */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--gold)]" />
            Dicas para Bater a Meta
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dicasComerciais.map((dica, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-[var(--gold)] mb-2">{dica.titulo}</h4>
                <p className="text-sm text-white/70">{dica.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de Cenários */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6">Cenários de Conversão</h3>
          <p className="text-white/60 mb-4 text-sm">
            Veja quantos contatos você precisa fazer por dia baseado em diferentes taxas de conversão:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Taxa Conversão</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Contatos/Dia</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Contatos/Semana</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Contatos/Mês</th>
                </tr>
              </thead>
              <tbody>
                {[10, 15, 20, 25, 30, 40].map((taxa) => {
                  const vendasDiarias = (config.metaMensal / config.ticketMedio) / config.diasUteis
                  const contatos = Math.ceil(vendasDiarias / (taxa / 100))
                  const isAtual = taxa === config.taxaConversao

                  return (
                    <tr
                      key={taxa}
                      className={`border-b border-white/5 ${isAtual ? 'bg-[var(--gold)]/10' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <span className={isAtual ? 'text-[var(--gold)] font-bold' : ''}>
                          {taxa}% {isAtual && '(atual)'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-medium">{contatos}</td>
                      <td className="py-3 px-4 text-center">{contatos * 5}</td>
                      <td className="py-3 px-4 text-center">{contatos * config.diasUteis}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
