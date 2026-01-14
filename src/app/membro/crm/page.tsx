'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  DollarSign,
  Calendar,
  MessageSquare,
  Trash2,
  Edit3,
  X,
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react'

interface Nota {
  id: string
  texto: string
  data: string
}

interface Lead {
  id: string
  nome: string
  empresa: string
  email: string
  telefone: string
  valor: number
  status: string
  proximoPasso: string
  dataProximoPasso: string
  notas: Nota[]
  criadoEm: string
  atualizadoEm: string
}

const statusConfig = [
  { id: 'novo', nome: 'Novo', cor: 'bg-blue-500', corTexto: 'text-blue-400' },
  { id: 'qualificado', nome: 'Qualificado', cor: 'bg-purple-500', corTexto: 'text-purple-400' },
  { id: 'proposta', nome: 'Proposta Enviada', cor: 'bg-orange-500', corTexto: 'text-orange-400' },
  { id: 'negociacao', nome: 'Em Negociação', cor: 'bg-yellow-500', corTexto: 'text-yellow-400' },
  { id: 'ganho', nome: 'Fechado Ganho', cor: 'bg-green-500', corTexto: 'text-green-400' },
  { id: 'perdido', nome: 'Fechado Perdido', cor: 'bg-red-500', corTexto: 'text-red-400' },
]

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [busca, setBusca] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [leadSelecionado, setLeadSelecionado] = useState<Lead | null>(null)
  const [editando, setEditando] = useState(false)
  const [novaNota, setNovaNota] = useState('')

  const [formData, setFormData] = useState<Partial<Lead>>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    valor: 0,
    status: 'novo',
    proximoPasso: '',
    dataProximoPasso: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-crm-leads')
    if (saved) {
      setLeads(JSON.parse(saved))
    }
  }, [])

  const salvarLeads = (novosLeads: Lead[]) => {
    setLeads(novosLeads)
    localStorage.setItem('mentoria-crm-leads', JSON.stringify(novosLeads))
  }

  const adicionarLead = () => {
    if (!formData.nome || !formData.empresa) return

    const novoLead: Lead = {
      id: Date.now().toString(),
      nome: formData.nome!,
      empresa: formData.empresa!,
      email: formData.email || '',
      telefone: formData.telefone || '',
      valor: formData.valor || 0,
      status: formData.status || 'novo',
      proximoPasso: formData.proximoPasso || '',
      dataProximoPasso: formData.dataProximoPasso || '',
      notas: [],
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    }

    salvarLeads([novoLead, ...leads])
    resetForm()
  }

  const atualizarLead = () => {
    if (!leadSelecionado) return

    const leadsAtualizados = leads.map(l => {
      if (l.id === leadSelecionado.id) {
        return {
          ...l,
          ...formData,
          atualizadoEm: new Date().toISOString(),
        }
      }
      return l
    })

    salvarLeads(leadsAtualizados)
    setLeadSelecionado({ ...leadSelecionado, ...formData } as Lead)
    setEditando(false)
  }

  const removerLead = (id: string) => {
    if (!confirm('Tem certeza que deseja remover este lead?')) return
    salvarLeads(leads.filter(l => l.id !== id))
    setLeadSelecionado(null)
  }

  const adicionarNota = () => {
    if (!leadSelecionado || !novaNota.trim()) return

    const nota: Nota = {
      id: Date.now().toString(),
      texto: novaNota,
      data: new Date().toISOString(),
    }

    const leadsAtualizados = leads.map(l => {
      if (l.id === leadSelecionado.id) {
        return {
          ...l,
          notas: [nota, ...l.notas],
          atualizadoEm: new Date().toISOString(),
        }
      }
      return l
    })

    salvarLeads(leadsAtualizados)
    setLeadSelecionado({
      ...leadSelecionado,
      notas: [nota, ...leadSelecionado.notas],
    })
    setNovaNota('')
  }

  const atualizarStatus = (leadId: string, novoStatus: string) => {
    const leadsAtualizados = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: novoStatus, atualizadoEm: new Date().toISOString() }
      }
      return l
    })
    salvarLeads(leadsAtualizados)
    if (leadSelecionado?.id === leadId) {
      setLeadSelecionado({ ...leadSelecionado, status: novoStatus })
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      empresa: '',
      email: '',
      telefone: '',
      valor: 0,
      status: 'novo',
      proximoPasso: '',
      dataProximoPasso: '',
    })
    setMostrarForm(false)
    setEditando(false)
  }

  const abrirEdicao = () => {
    if (!leadSelecionado) return
    setFormData({
      nome: leadSelecionado.nome,
      empresa: leadSelecionado.empresa,
      email: leadSelecionado.email,
      telefone: leadSelecionado.telefone,
      valor: leadSelecionado.valor,
      status: leadSelecionado.status,
      proximoPasso: leadSelecionado.proximoPasso,
      dataProximoPasso: leadSelecionado.dataProximoPasso,
    })
    setEditando(true)
  }

  const leadsFiltrados = leads.filter(l => {
    const matchStatus = filtroStatus === 'todos' || l.status === filtroStatus
    const matchBusca = !busca ||
      l.nome.toLowerCase().includes(busca.toLowerCase()) ||
      l.empresa.toLowerCase().includes(busca.toLowerCase()) ||
      l.email.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  const getStatusInfo = (statusId: string) => {
    return statusConfig.find(s => s.id === statusId) || statusConfig[0]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const calcularMetricas = () => {
    const totalLeads = leads.length
    const leadsAtivos = leads.filter(l => !['ganho', 'perdido'].includes(l.status)).length
    const leadsGanhos = leads.filter(l => l.status === 'ganho')
    const valorPipeline = leads
      .filter(l => !['ganho', 'perdido'].includes(l.status))
      .reduce((acc, l) => acc + l.valor, 0)
    const valorGanho = leadsGanhos.reduce((acc, l) => acc + l.valor, 0)
    const taxaConversao = totalLeads > 0 ? (leadsGanhos.length / totalLeads) * 100 : 0

    return { totalLeads, leadsAtivos, valorPipeline, valorGanho, taxaConversao }
  }

  const metricas = calcularMetricas()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl font-bold">CRM de Vendas</h1>
              <p className="text-white/60">Gerencie seus leads e oportunidades</p>
            </div>
          </div>

          <button
            onClick={() => setMostrarForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Lead
          </button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/60">Total Leads</span>
            </div>
            <p className="text-2xl font-bold">{metricas.totalLeads}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/60">Leads Ativos</span>
            </div>
            <p className="text-2xl font-bold">{metricas.leadsAtivos}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/60">Pipeline</span>
            </div>
            <p className="text-xl font-bold text-[var(--gold)]">{formatCurrency(metricas.valorPipeline)}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/60">Ganhos</span>
            </div>
            <p className="text-xl font-bold text-green-400">{formatCurrency(metricas.valorGanho)}</p>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/60">Conversão</span>
            </div>
            <p className="text-2xl font-bold">{metricas.taxaConversao.toFixed(1)}%</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Buscar lead..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-white/40" />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none transition-colors"
            >
              <option value="todos">Todos os Status</option>
              {statusConfig.map(s => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista de Leads */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Leads ({leadsFiltrados.length})
              </h2>

              {leadsFiltrados.length === 0 ? (
                <div className="text-center py-12 text-white/50">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum lead encontrado</p>
                  <p className="text-sm">Adicione seu primeiro lead</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leadsFiltrados.map((lead) => {
                    const statusInfo = getStatusInfo(lead.status)
                    const isSelected = leadSelecionado?.id === lead.id

                    return (
                      <div
                        key={lead.id}
                        onClick={() => setLeadSelecionado(lead)}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[var(--gold)]/20 border border-[var(--gold)]'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="font-semibold text-[var(--gold)]">
                                {lead.nome.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{lead.nome}</h3>
                              <p className="text-sm text-white/60">{lead.empresa}</p>
                            </div>
                          </div>
                          <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.cor}/20 ${statusInfo.corTexto}`}>
                            {statusInfo.nome}
                          </span>
                          <span className="font-semibold text-[var(--gold)]">
                            {formatCurrency(lead.valor)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Detalhes do Lead */}
          <div className="lg:col-span-1">
            {leadSelecionado ? (
              <div className="glass rounded-2xl p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Detalhes</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={abrirEdicao}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removerLead(leadSelecionado.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {editando ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Valor"
                      value={formData.valor}
                      onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Próximo passo"
                      value={formData.proximoPasso}
                      onChange={(e) => setFormData({ ...formData, proximoPasso: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                    <input
                      type="date"
                      value={formData.dataProximoPasso}
                      onChange={(e) => setFormData({ ...formData, dataProximoPasso: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={atualizarLead}
                        className="flex-1 py-2 bg-[var(--gold)] text-black rounded-lg text-sm font-medium"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditando(false)}
                        className="flex-1 py-2 bg-white/10 rounded-lg text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold">{leadSelecionado.nome}</h3>
                        <p className="text-white/60 flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {leadSelecionado.empresa}
                        </p>
                      </div>

                      {leadSelecionado.email && (
                        <p className="text-sm flex items-center gap-2 text-white/70">
                          <Mail className="w-4 h-4" />
                          {leadSelecionado.email}
                        </p>
                      )}

                      {leadSelecionado.telefone && (
                        <p className="text-sm flex items-center gap-2 text-white/70">
                          <Phone className="w-4 h-4" />
                          {leadSelecionado.telefone}
                        </p>
                      )}

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-white/60 mb-1">Valor da Oportunidade</p>
                        <p className="text-xl font-bold text-[var(--gold)]">
                          {formatCurrency(leadSelecionado.valor)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-white/60 mb-2">Status</p>
                        <select
                          value={leadSelecionado.status}
                          onChange={(e) => atualizarStatus(leadSelecionado.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                        >
                          {statusConfig.map(s => (
                            <option key={s.id} value={s.id}>{s.nome}</option>
                          ))}
                        </select>
                      </div>

                      {leadSelecionado.proximoPasso && (
                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                          <p className="text-sm text-blue-400 mb-1">Próximo Passo</p>
                          <p className="font-medium">{leadSelecionado.proximoPasso}</p>
                          {leadSelecionado.dataProximoPasso && (
                            <p className="text-sm text-white/60 mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(leadSelecionado.dataProximoPasso).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Notas */}
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Notas ({leadSelecionado.notas.length})
                      </h4>

                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Adicionar nota..."
                          value={novaNota}
                          onChange={(e) => setNovaNota(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && adicionarNota()}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                        />
                        <button
                          onClick={adicionarNota}
                          className="px-3 py-2 bg-[var(--gold)] text-black rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {leadSelecionado.notas.map((nota) => (
                          <div key={nota.id} className="p-3 bg-white/5 rounded-lg">
                            <p className="text-sm">{nota.texto}</p>
                            <p className="text-xs text-white/40 mt-1">
                              {new Date(nota.data).toLocaleDateString('pt-BR')} às {new Date(nota.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className="text-white/50">Selecione um lead para ver detalhes</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Novo Lead */}
        {mostrarForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Novo Lead</h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Nome *</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Empresa *</label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Telefone</label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Valor (R$)</label>
                    <input
                      type="number"
                      value={formData.valor}
                      onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    >
                      {statusConfig.map(s => (
                        <option key={s.id} value={s.id}>{s.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Próximo Passo</label>
                  <input
                    type="text"
                    value={formData.proximoPasso}
                    onChange={(e) => setFormData({ ...formData, proximoPasso: e.target.value })}
                    placeholder="Ex: Enviar proposta, Agendar demo..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Data do Próximo Passo</label>
                  <input
                    type="date"
                    value={formData.dataProximoPasso}
                    onChange={(e) => setFormData({ ...formData, dataProximoPasso: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={adicionarLead}
                    className="flex-1 py-3 bg-[var(--gold)] text-black rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors"
                  >
                    Adicionar Lead
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
