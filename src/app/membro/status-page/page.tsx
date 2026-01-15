'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Activity, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Servico {
  id: string
  nome: string
  status: 'operational' | 'degraded' | 'partial' | 'major' | 'maintenance'
  mensagem: string
}

interface Incidente {
  id: string
  titulo: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  impacto: 'minor' | 'major' | 'critical'
  atualizacoes: string
  dataInicio: string
}

export default function StatusPagePage() {
  const [copied, setCopied] = useState(false)
  const [nomeEmpresa, setNomeEmpresa] = useState('Minha Empresa')

  const [servicos, setServicos] = useState<Servico[]>([
    { id: '1', nome: 'Website', status: 'operational', mensagem: '' },
    { id: '2', nome: 'API', status: 'operational', mensagem: '' },
    { id: '3', nome: 'Dashboard', status: 'degraded', mensagem: 'Lentidao identificada' },
    { id: '4', nome: 'Pagamentos', status: 'operational', mensagem: '' },
    { id: '5', nome: 'Email', status: 'operational', mensagem: '' },
  ])

  const [incidentes, setIncidentes] = useState<Incidente[]>([
    {
      id: '1',
      titulo: 'Lentidao no Dashboard',
      status: 'monitoring',
      impacto: 'minor',
      atualizacoes: 'Identificamos o problema e estamos monitorando.',
      dataInicio: new Date().toISOString().slice(0, 16)
    }
  ])

  const statusConfig = {
    operational: { label: 'Operacional', cor: 'bg-green-500', texto: 'text-green-400' },
    degraded: { label: 'Degradado', cor: 'bg-yellow-500', texto: 'text-yellow-400' },
    partial: { label: 'Parcial', cor: 'bg-orange-500', texto: 'text-orange-400' },
    major: { label: 'Indisponivel', cor: 'bg-red-500', texto: 'text-red-400' },
    maintenance: { label: 'Manutencao', cor: 'bg-blue-500', texto: 'text-blue-400' },
  }

  const incidenteStatusConfig = {
    investigating: { label: 'Investigando', cor: 'text-red-400' },
    identified: { label: 'Identificado', cor: 'text-orange-400' },
    monitoring: { label: 'Monitorando', cor: 'text-yellow-400' },
    resolved: { label: 'Resolvido', cor: 'text-green-400' },
  }

  const impactoConfig = {
    minor: { label: 'Menor', cor: 'text-yellow-400' },
    major: { label: 'Major', cor: 'text-orange-400' },
    critical: { label: 'Critico', cor: 'text-red-400' },
  }

  const adicionarServico = () => {
    setServicos([...servicos, {
      id: Date.now().toString(),
      nome: '',
      status: 'operational',
      mensagem: ''
    }])
  }

  const removerServico = (id: string) => {
    setServicos(servicos.filter(s => s.id !== id))
  }

  const atualizarServico = (id: string, campo: keyof Servico, valor: string) => {
    setServicos(servicos.map(s =>
      s.id === id ? { ...s, [campo]: valor } : s
    ))
  }

  const adicionarIncidente = () => {
    setIncidentes([{
      id: Date.now().toString(),
      titulo: '',
      status: 'investigating',
      impacto: 'minor',
      atualizacoes: '',
      dataInicio: new Date().toISOString().slice(0, 16)
    }, ...incidentes])
  }

  const removerIncidente = (id: string) => {
    setIncidentes(incidentes.filter(i => i.id !== id))
  }

  const atualizarIncidente = (id: string, campo: keyof Incidente, valor: string) => {
    setIncidentes(incidentes.map(i =>
      i.id === id ? { ...i, [campo]: valor } : i
    ))
  }

  const statusGeral = () => {
    if (servicos.some(s => s.status === 'major')) return statusConfig.major
    if (servicos.some(s => s.status === 'partial')) return statusConfig.partial
    if (servicos.some(s => s.status === 'degraded')) return statusConfig.degraded
    if (servicos.some(s => s.status === 'maintenance')) return statusConfig.maintenance
    return statusConfig.operational
  }

  const gerarStatusPage = () => {
    const geral = statusGeral()
    const dataHora = new Date().toLocaleString('pt-BR')

    return `
═══════════════════════════════════════════════════════════════
                    ${nomeEmpresa.toUpperCase()} - STATUS
═══════════════════════════════════════════════════════════════

STATUS GERAL: ${geral.label.toUpperCase()}
Ultima atualizacao: ${dataHora}

SERVICOS
─────────────────────────────────────────────────────────────
${servicos.map(s => {
  const config = statusConfig[s.status]
  return `[${config.label.padEnd(12)}] ${s.nome}${s.mensagem ? ` - ${s.mensagem}` : ''}`
}).join('\n')}

${incidentes.filter(i => i.status !== 'resolved').length > 0 ? `
INCIDENTES ATIVOS
─────────────────────────────────────────────────────────────
${incidentes.filter(i => i.status !== 'resolved').map(i => {
  const statusI = incidenteStatusConfig[i.status]
  const impactoI = impactoConfig[i.impacto]
  return `
${i.titulo}
Status: ${statusI.label} | Impacto: ${impactoI.label}
Inicio: ${new Date(i.dataInicio).toLocaleString('pt-BR')}
${i.atualizacoes}`
}).join('\n\n')}` : `
✓ Nenhum incidente ativo no momento.`}

${incidentes.filter(i => i.status === 'resolved').length > 0 ? `
INCIDENTES RECENTES (RESOLVIDOS)
─────────────────────────────────────────────────────────────
${incidentes.filter(i => i.status === 'resolved').map(i => `✓ ${i.titulo}`).join('\n')}` : ''}

═══════════════════════════════════════════════════════════════
Para suporte: suporte@${nomeEmpresa.toLowerCase().replace(/\s/g, '')}.com.br
═══════════════════════════════════════════════════════════════
`
  }

  const copiarStatus = () => {
    navigator.clipboard.writeText(gerarStatusPage())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const geral = statusGeral()

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
            <Activity className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Status Page</span> Generator
          </h1>
          <p className="text-[var(--gray)]">Gere paginas de status para seus servicos</p>
        </div>

        {/* Status Geral */}
        <div className={`glass card mb-8 text-center border-2 ${
          geral === statusConfig.operational ? 'border-green-500/50 bg-green-500/5' :
          geral === statusConfig.degraded ? 'border-yellow-500/50 bg-yellow-500/5' :
          'border-red-500/50 bg-red-500/5'
        }`}>
          <div className={`w-4 h-4 rounded-full ${geral.cor} mx-auto mb-2`} />
          <p className={`font-display text-2xl ${geral.texto}`}>{geral.label}</p>
          <p className="text-sm text-[var(--gray)]">Status Geral do Sistema</p>
        </div>

        {/* Nome Empresa */}
        <div className="glass card mb-6">
          <label className="input-label">Nome da Empresa/Produto</label>
          <input
            type="text"
            value={nomeEmpresa}
            onChange={(e) => setNomeEmpresa(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Servicos */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Servicos</h2>
            <button onClick={adicionarServico} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {servicos.map(servico => {
              const config = statusConfig[servico.status]
              return (
                <div key={servico.id} className="bg-black/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${config.cor}`} />
                    <input
                      type="text"
                      value={servico.nome}
                      onChange={(e) => atualizarServico(servico.id, 'nome', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 flex-1"
                      placeholder="Nome do servico"
                    />
                    <select
                      value={servico.status}
                      onChange={(e) => atualizarServico(servico.id, 'status', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-36"
                    >
                      {Object.entries(statusConfig).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                    <button onClick={() => removerServico(servico.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {servico.status !== 'operational' && (
                    <input
                      type="text"
                      value={servico.mensagem}
                      onChange={(e) => atualizarServico(servico.id, 'mensagem', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full mt-2 text-sm"
                      placeholder="Mensagem de status (opcional)"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Incidentes */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Incidentes</h2>
            <button onClick={adicionarIncidente} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Novo Incidente
            </button>
          </div>
          <div className="space-y-4">
            {incidentes.map(incidente => (
              <div key={incidente.id} className="bg-black/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={incidente.titulo}
                    onChange={(e) => atualizarIncidente(incidente.id, 'titulo', e.target.value)}
                    className="bg-black/30 border border-white/10 rounded px-3 py-2 flex-1 mr-2"
                    placeholder="Titulo do incidente"
                  />
                  <button onClick={() => removerIncidente(incidente.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="text-xs text-[var(--gray)]">Status</label>
                    <select
                      value={incidente.status}
                      onChange={(e) => atualizarIncidente(incidente.id, 'status', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    >
                      {Object.entries(incidenteStatusConfig).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Impacto</label>
                    <select
                      value={incidente.impacto}
                      onChange={(e) => atualizarIncidente(incidente.id, 'impacto', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    >
                      {Object.entries(impactoConfig).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Inicio</label>
                    <input
                      type="datetime-local"
                      value={incidente.dataInicio}
                      onChange={(e) => atualizarIncidente(incidente.id, 'dataInicio', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full text-sm"
                    />
                  </div>
                </div>
                <textarea
                  value={incidente.atualizacoes}
                  onChange={(e) => atualizarIncidente(incidente.id, 'atualizacoes', e.target.value)}
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full text-sm"
                  placeholder="Atualizacoes e detalhes do incidente..."
                  rows={2}
                />
              </div>
            ))}
            {incidentes.length === 0 && (
              <p className="text-center text-[var(--gray)] py-4">
                Nenhum incidente registrado
              </p>
            )}
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarStatus} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Status Page'}
          </button>
        </div>
      </div>
    </main>
  )
}
