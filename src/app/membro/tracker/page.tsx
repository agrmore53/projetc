'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Phone, Users, Mail, Calendar, DollarSign, Plus, Trash2, TrendingUp, Target, Award, BarChart3 } from 'lucide-react'

interface Atividade {
  id: string
  tipo: 'ligacao' | 'visita' | 'email' | 'reuniao' | 'fechamento'
  descricao: string
  valor?: number
  cliente: string
  data: string
  hora: string
}

interface ResumoAtividade {
  tipo: string
  icone: React.ReactNode
  quantidade: number
  cor: string
}

const tiposAtividade = [
  { id: 'ligacao', nome: 'Ligação', icone: Phone, cor: 'bg-blue-500' },
  { id: 'visita', nome: 'Visita', icone: Users, cor: 'bg-green-500' },
  { id: 'email', nome: 'E-mail', icone: Mail, cor: 'bg-purple-500' },
  { id: 'reuniao', nome: 'Reunião', icone: Calendar, cor: 'bg-orange-500' },
  { id: 'fechamento', nome: 'Fechamento', icone: DollarSign, cor: 'bg-[var(--gold)]' },
]

export default function TrackerAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [filtroData, setFiltroData] = useState<string>(new Date().toISOString().split('T')[0])
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [novaAtividade, setNovaAtividade] = useState<Partial<Atividade>>({
    tipo: 'ligacao',
    descricao: '',
    cliente: '',
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5),
  })

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-tracker-atividades')
    if (saved) {
      setAtividades(JSON.parse(saved))
    }
  }, [])

  const salvarAtividades = (novasAtividades: Atividade[]) => {
    setAtividades(novasAtividades)
    localStorage.setItem('mentoria-tracker-atividades', JSON.stringify(novasAtividades))
  }

  const adicionarAtividade = () => {
    if (!novaAtividade.cliente || !novaAtividade.descricao) return

    const atividade: Atividade = {
      id: Date.now().toString(),
      tipo: novaAtividade.tipo as Atividade['tipo'],
      descricao: novaAtividade.descricao!,
      valor: novaAtividade.valor,
      cliente: novaAtividade.cliente!,
      data: novaAtividade.data!,
      hora: novaAtividade.hora!,
    }

    salvarAtividades([atividade, ...atividades])
    setNovaAtividade({
      tipo: 'ligacao',
      descricao: '',
      cliente: '',
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().slice(0, 5),
    })
    setMostrarForm(false)
  }

  const removerAtividade = (id: string) => {
    salvarAtividades(atividades.filter(a => a.id !== id))
  }

  const atividadesFiltradas = atividades.filter(a => {
    const matchData = filtroData === 'todos' || a.data === filtroData
    const matchTipo = filtroTipo === 'todos' || a.tipo === filtroTipo
    return matchData && matchTipo
  })

  const getAtividadesHoje = () => {
    const hoje = new Date().toISOString().split('T')[0]
    return atividades.filter(a => a.data === hoje)
  }

  const getAtividadesSemana = () => {
    const hoje = new Date()
    const inicioSemana = new Date(hoje)
    inicioSemana.setDate(hoje.getDate() - hoje.getDay())

    return atividades.filter(a => {
      const dataAtividade = new Date(a.data)
      return dataAtividade >= inicioSemana && dataAtividade <= hoje
    })
  }

  const getAtividadesMes = () => {
    const hoje = new Date()
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

    return atividades.filter(a => {
      const dataAtividade = new Date(a.data)
      return dataAtividade >= inicioMes && dataAtividade <= hoje
    })
  }

  const calcularResumo = (lista: Atividade[]) => {
    const resumo: { [key: string]: number } = {
      ligacao: 0,
      visita: 0,
      email: 0,
      reuniao: 0,
      fechamento: 0,
    }

    lista.forEach(a => {
      resumo[a.tipo]++
    })

    return resumo
  }

  const calcularTotalVendas = (lista: Atividade[]) => {
    return lista
      .filter(a => a.tipo === 'fechamento' && a.valor)
      .reduce((acc, a) => acc + (a.valor || 0), 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getTipoInfo = (tipo: string) => {
    return tiposAtividade.find(t => t.id === tipo) || tiposAtividade[0]
  }

  const resumoHoje = calcularResumo(getAtividadesHoje())
  const resumoSemana = calcularResumo(getAtividadesSemana())
  const resumoMes = calcularResumo(getAtividadesMes())
  const vendasMes = calcularTotalVendas(getAtividadesMes())

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/membro"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Tracker de Atividades</h1>
              <p className="text-white/60">Registre suas atividades comerciais diárias</p>
            </div>
          </div>

          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Atividade
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-white/60 text-sm">Hoje</span>
            </div>
            <p className="text-2xl font-bold">{getAtividadesHoje().length}</p>
            <p className="text-sm text-white/50">atividades</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white/60 text-sm">Semana</span>
            </div>
            <p className="text-2xl font-bold">{getAtividadesSemana().length}</p>
            <p className="text-sm text-white/50">atividades</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-white/60 text-sm">Mês</span>
            </div>
            <p className="text-2xl font-bold">{getAtividadesMes().length}</p>
            <p className="text-sm text-white/50">atividades</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <span className="text-white/60 text-sm">Vendas Mês</span>
            </div>
            <p className="text-2xl font-bold text-[var(--gold)]">{formatCurrency(vendasMes)}</p>
            <p className="text-sm text-white/50">{resumoMes.fechamento} fechamentos</p>
          </div>
        </div>

        {/* Resumo por Tipo */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Resumo de Atividades</h2>

          <div className="grid grid-cols-3 gap-6">
            {/* Hoje */}
            <div>
              <h3 className="text-sm text-white/60 mb-3">Hoje</h3>
              <div className="space-y-2">
                {tiposAtividade.map(tipo => (
                  <div key={tipo.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${tipo.cor}`} />
                      <span className="text-sm">{tipo.nome}</span>
                    </div>
                    <span className="font-medium">{resumoHoje[tipo.id]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semana */}
            <div>
              <h3 className="text-sm text-white/60 mb-3">Esta Semana</h3>
              <div className="space-y-2">
                {tiposAtividade.map(tipo => (
                  <div key={tipo.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${tipo.cor}`} />
                      <span className="text-sm">{tipo.nome}</span>
                    </div>
                    <span className="font-medium">{resumoSemana[tipo.id]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mês */}
            <div>
              <h3 className="text-sm text-white/60 mb-3">Este Mês</h3>
              <div className="space-y-2">
                {tiposAtividade.map(tipo => (
                  <div key={tipo.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${tipo.cor}`} />
                      <span className="text-sm">{tipo.nome}</span>
                    </div>
                    <span className="font-medium">{resumoMes[tipo.id]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Nova Atividade */}
        {mostrarForm && (
          <div className="glass rounded-2xl p-6 mb-8 border border-[var(--gold)]/30">
            <h2 className="text-lg font-semibold mb-4">Registrar Atividade</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Tipo</label>
                <select
                  value={novaAtividade.tipo}
                  onChange={(e) => setNovaAtividade({ ...novaAtividade, tipo: e.target.value as Atividade['tipo'] })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                >
                  {tiposAtividade.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </select>
              </div>

              {/* Cliente */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Cliente/Lead</label>
                <input
                  type="text"
                  value={novaAtividade.cliente}
                  onChange={(e) => setNovaAtividade({ ...novaAtividade, cliente: e.target.value })}
                  placeholder="Nome do cliente"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>

              {/* Data */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Data</label>
                <input
                  type="date"
                  value={novaAtividade.data}
                  onChange={(e) => setNovaAtividade({ ...novaAtividade, data: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">Hora</label>
                <input
                  type="time"
                  value={novaAtividade.hora}
                  onChange={(e) => setNovaAtividade({ ...novaAtividade, hora: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>

              {/* Valor (se fechamento) */}
              {novaAtividade.tipo === 'fechamento' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Valor (R$)</label>
                  <input
                    type="number"
                    value={novaAtividade.valor || ''}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, valor: Number(e.target.value) })}
                    placeholder="0,00"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Descrição */}
              <div className={novaAtividade.tipo === 'fechamento' ? '' : 'lg:col-span-2'}>
                <label className="block text-sm font-medium mb-2 text-white/80">Descrição</label>
                <input
                  type="text"
                  value={novaAtividade.descricao}
                  onChange={(e) => setNovaAtividade({ ...novaAtividade, descricao: e.target.value })}
                  placeholder="O que foi feito?"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={adicionarAtividade}
                className="px-6 py-2 bg-[var(--gold)] text-black rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors"
              >
                Salvar Atividade
              </button>
              <button
                onClick={() => setMostrarForm(false)}
                className="px-6 py-2 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm text-white/60 mb-1">Filtrar por Data</label>
            <input
              type="date"
              value={filtroData === 'todos' ? '' : filtroData}
              onChange={(e) => setFiltroData(e.target.value || 'todos')}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Filtrar por Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
            >
              <option value="todos">Todos</option>
              {tiposAtividade.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => { setFiltroData('todos'); setFiltroTipo('todos') }}
              className="px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Histórico de Atividades
            <span className="text-white/50 font-normal ml-2">({atividadesFiltradas.length})</span>
          </h2>

          {atividadesFiltradas.length === 0 ? (
            <div className="text-center py-12 text-white/50">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma atividade encontrada</p>
              <p className="text-sm">Comece registrando suas atividades comerciais</p>
            </div>
          ) : (
            <div className="space-y-3">
              {atividadesFiltradas.map((atividade) => {
                const tipoInfo = getTipoInfo(atividade.tipo)
                const IconComponent = tipoInfo.icone

                return (
                  <div
                    key={atividade.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${tipoInfo.cor}/20 flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${tipoInfo.cor.replace('bg-', 'text-').replace('-500', '-400')}`} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{atividade.cliente}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${tipoInfo.cor}/30 ${tipoInfo.cor.replace('bg-', 'text-').replace('-500', '-400')}`}>
                            {tipoInfo.nome}
                          </span>
                          {atividade.valor && (
                            <span className="text-xs px-2 py-0.5 rounded bg-[var(--gold)]/30 text-[var(--gold)]">
                              {formatCurrency(atividade.valor)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60">{atividade.descricao}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm text-white/50">
                        <p>{new Date(atividade.data).toLocaleDateString('pt-BR')}</p>
                        <p>{atividade.hora}</p>
                      </div>

                      <button
                        onClick={() => removerAtividade(atividade.id)}
                        className="p-2 rounded-lg bg-red-500/0 hover:bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Dicas */}
        <div className="mt-8 p-6 glass rounded-2xl border border-[var(--gold)]/20">
          <h3 className="text-lg font-semibold mb-4 text-[var(--gold)]">💡 Dica do Campeão</h3>
          <p className="text-white/70">
            Registre TODAS as suas atividades, mesmo as pequenas. Vendedores de alta performance fazem em média
            <span className="text-[var(--gold)] font-bold"> 50+ atividades por dia</span>. Quanto mais você
            registra, melhor entende seu próprio processo de vendas e onde pode melhorar.
          </p>
        </div>
      </div>
    </div>
  )
}
