'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Shield, Search, Download, RefreshCw, Calendar, Globe, Mail, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'

interface AccessLog {
  id: string
  user_email: string
  user_ip: string
  page: string
  user_agent: string
  created_at: string
}

const ADMIN_PASSWORD = 'mentoria2024admin'

export default function AdminLogsPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [logs, setLogs] = useState<AccessLog[]>([])
  const [loading, setLoading] = useState(false)
  const [filtroEmail, setFiltroEmail] = useState('')
  const [filtroIP, setFiltroIP] = useState('')
  const [filtroData, setFiltroData] = useState('')
  const [page, setPage] = useState(1)
  const [totalLogs, setTotalLogs] = useState(0)
  const logsPerPage = 50

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Senha incorreta!')
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth')
    if (isAuth === 'true') {
      setAuthenticated(true)
    }
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('access_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (filtroEmail) {
        query = query.ilike('user_email', `%${filtroEmail}%`)
      }

      if (filtroIP) {
        query = query.ilike('user_ip', `%${filtroIP}%`)
      }

      if (filtroData) {
        const startDate = new Date(filtroData)
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date(filtroData)
        endDate.setHours(23, 59, 59, 999)
        query = query.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString())
      }

      const from = (page - 1) * logsPerPage
      const to = from + logsPerPage - 1

      const { data, error, count } = await query.range(from, to)

      if (error) {
        console.error('Erro:', error)
        alert('Erro ao carregar logs')
        return
      }

      setLogs(data || [])
      setTotalLogs(count || 0)
    } catch (err) {
      console.error('Erro:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) {
      fetchLogs()
    }
  }, [authenticated, page])

  const handleFilter = () => {
    setPage(1)
    fetchLogs()
  }

  const exportCSV = () => {
    const headers = ['Data/Hora', 'Email', 'IP', 'Página', 'Navegador']
    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        new Date(log.created_at).toLocaleString('pt-BR'),
        log.user_email,
        log.user_ip,
        log.page,
        `"${log.user_agent.substring(0, 50)}..."`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `logs_acesso_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getStats = () => {
    const uniqueEmails = new Set(logs.map(l => l.user_email)).size
    const uniqueIPs = new Set(logs.map(l => l.user_ip)).size
    const uniquePages = new Set(logs.map(l => l.page)).size
    return { uniqueEmails, uniqueIPs, uniquePages }
  }

  const totalPages = Math.ceil(totalLogs / logsPerPage)

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-pattern" />
        <div className="glass card p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[var(--gold)]" />
            </div>
            <h1 className="font-display text-2xl gold-text">Área Administrativa</h1>
            <p className="text-[var(--gray)] text-sm mt-2">Acesso restrito ao administrador</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de administrador"
              className="input-field mb-4"
              required
            />
            <button type="submit" className="btn-primary w-full">
              Acessar
            </button>
          </form>
        </div>
      </main>
    )
  }

  const stats = getStats()

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <div>
              <h1 className="font-display text-2xl gold-text">Registro de Acessos</h1>
              <p className="text-[var(--gray)] text-sm">Auditoria completa da plataforma</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth')
              setAuthenticated(false)
            }}
            className="text-[var(--gray)] hover:text-[var(--gold)] text-sm"
          >
            Sair
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 text-center">
            <p className="text-3xl font-display gold-text">{totalLogs}</p>
            <p className="text-[var(--gray)] text-sm">Total de Acessos</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-3xl font-display gold-text">{stats.uniqueEmails}</p>
            <p className="text-[var(--gray)] text-sm">Usuários Únicos</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-3xl font-display gold-text">{stats.uniqueIPs}</p>
            <p className="text-[var(--gray)] text-sm">IPs Únicos</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-3xl font-display gold-text">{stats.uniquePages}</p>
            <p className="text-[var(--gray)] text-sm">Páginas Acessadas</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="glass p-6 mb-6">
          <h3 className="font-display text-lg mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-[var(--gold)]" />
            Filtros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Email</label>
              <input
                type="text"
                value={filtroEmail}
                onChange={(e) => setFiltroEmail(e.target.value)}
                placeholder="Buscar por email..."
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">IP</label>
              <input
                type="text"
                value={filtroIP}
                onChange={(e) => setFiltroIP(e.target.value)}
                placeholder="Buscar por IP..."
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleFilter} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Search className="w-4 h-4" /> Filtrar
              </button>
              <button onClick={fetchLogs} className="btn-secondary p-3">
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-[var(--gray)] text-sm">
            Mostrando {logs.length} de {totalLogs} registros
          </p>
          <button onClick={exportCSV} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>

        {/* Tabela */}
        <div className="glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--gold)]/20">
                  <th className="text-left p-4 text-[var(--gold)] font-display">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Data/Hora
                    </div>
                  </th>
                  <th className="text-left p-4 text-[var(--gold)] font-display">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </div>
                  </th>
                  <th className="text-left p-4 text-[var(--gold)] font-display">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> IP
                    </div>
                  </th>
                  <th className="text-left p-4 text-[var(--gold)] font-display">Página</th>
                  <th className="text-left p-4 text-[var(--gold)] font-display">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" /> Navegador
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--gray)]">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[var(--gold)]" />
                      Carregando...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--gray)]">
                      Nenhum registro encontrado
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-sm">{formatDate(log.created_at)}</td>
                      <td className="p-4 text-sm">
                        <span className={log.user_email === 'anonymous' ? 'text-[var(--gray)]' : 'text-[var(--gold)]'}>
                          {log.user_email}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-mono">{log.user_ip}</td>
                      <td className="p-4 text-sm">
                        <span className="bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-1 rounded text-xs">
                          {log.page}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[var(--gray)] max-w-[200px] truncate">
                        {log.user_agent}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 p-4 border-t border-[var(--gold)]/20">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary p-2 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-[var(--gray)]">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary p-2 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Aviso Legal */}
        <div className="mt-8 p-6 glass border-2 border-[var(--gold)]">
          <h3 className="font-display text-lg gold-text mb-2">Registro Legal de Acessos</h3>
          <p className="text-[var(--gray)] text-sm">
            Este sistema registra automaticamente todos os acessos à plataforma Mentoria Elite,
            incluindo data, hora, endereço IP e páginas visitadas. Estes registros servem como
            prova legal de utilização dos serviços contratados e podem ser apresentados em
            processos judiciais ou administrativos.
          </p>
          <p className="text-[var(--gray)] text-sm mt-2">
            <strong className="text-[var(--gold)]">Base Legal:</strong> Lei Geral de Proteção de Dados (LGPD) -
            Art. 7º, V - Execução de contrato do qual seja parte o titular.
          </p>
        </div>
      </div>
    </main>
  )
}
