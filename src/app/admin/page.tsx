'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Membro } from '@/lib/supabase'
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Lightbulb,
  Target,
  LogOut,
  RefreshCw,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [membros, setMembros] = useState<Membro[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const ADMIN_PASSWORD = 'admin2026'

  useEffect(() => {
    const adminLogged = localStorage.getItem('admin_logged')
    if (adminLogged === 'true') {
      setIsAdmin(true)
      fetchMembros()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchMembros = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('membros')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro:', error)
    } else {
      setMembros(data || [])
    }
    setLoading(false)
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged', 'true')
      setIsAdmin(true)
      fetchMembros()
    } else {
      alert('Senha incorreta')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_logged')
    setIsAdmin(false)
    router.push('/')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-pattern" />
        <div className="glass-strong max-w-md w-full p-12 text-center">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-2xl mb-2 gold-text">Dashboard Admin</h1>
          <p className="text-[var(--gray)] mb-8">Acesso restrito</p>
          <form onSubmit={handleAdminLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha do admin"
              className="input-field mb-4"
            />
            <button type="submit" className="btn-primary w-full">
              Acessar
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <div>
              <h1 className="font-display text-xl gold-text">Dashboard Admin</h1>
              <p className="text-[var(--gray)] text-sm">Gerenciamento de Membros</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchMembros}
              className="flex items-center gap-2 text-[var(--gray)] hover:text-[var(--gold)] transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[var(--gray)] hover:text-[var(--gold)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass p-6 text-center">
            <div className="font-display text-3xl text-[var(--gold)] mb-1">{membros.length}</div>
            <div className="text-[var(--gray)] text-sm">Total de Membros</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="font-display text-3xl text-[var(--gold)] mb-1">
              {membros.filter(m => m.ideia && m.ideia.toLowerCase() !== 'ainda não tenho ideia definida').length}
            </div>
            <div className="text-[var(--gray)] text-sm">Com Ideia Definida</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="font-display text-3xl text-[var(--gold)] mb-1">
              {membros.filter(m => m.horas === '20-30' || m.horas === '30+').length}
            </div>
            <div className="text-[var(--gray)] text-sm">20h+ por semana</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="font-display text-3xl text-[var(--gold)] mb-1">
              R$ {(membros.length * 6000).toLocaleString('pt-BR')}
            </div>
            <div className="text-[var(--gray)] text-sm">Receita Total</div>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {loading ? (
            <div className="glass p-10 text-center">
              <RefreshCw className="w-10 h-10 text-[var(--gold)] mx-auto animate-spin" />
              <p className="text-[var(--gray)] mt-4">Carregando membros...</p>
            </div>
          ) : membros.length === 0 ? (
            <div className="glass p-10 text-center">
              <Users className="w-10 h-10 text-[var(--gray)] mx-auto mb-4" />
              <p className="text-[var(--gray)]">Nenhum membro cadastrado ainda.</p>
            </div>
          ) : (
            membros.map((membro) => (
              <div key={membro.id} className="glass overflow-hidden">
                {/* Header do card */}
                <div
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedId(expandedId === membro.id ? null : membro.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--gold)]/20 rounded-full flex items-center justify-center">
                        <span className="font-display text-lg text-[var(--gold)]">
                          {membro.nome?.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-lg">{membro.nome}</h3>
                        <p className="text-[var(--gray)] text-sm">{membro.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[var(--gray)] text-sm hidden md:block">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {formatDate(membro.created_at)}
                      </span>
                      {expandedId === membro.id ? (
                        <ChevronUp className="w-5 h-5 text-[var(--gold)]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--gray)]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {expandedId === membro.id && (
                  <div className="px-6 pb-6 border-t border-[var(--gold)]/10">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">WhatsApp</p>
                            <p>{membro.whatsapp || '-'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Cidade</p>
                            <p>{membro.cidade || '-'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Profissão</p>
                            <p>{membro.profissao || '-'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Horas/Semana</p>
                            <p>{membro.horas || '-'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Ideia de Software</p>
                            <p className="text-sm">{membro.ideia || '-'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-[var(--gold)] mt-0.5" />
                          <div>
                            <p className="text-xs text-[var(--gray)] uppercase tracking-wider">Objetivo</p>
                            <p className="text-sm">{membro.objetivo || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[var(--gold)]/10 flex gap-4">
                      <a
                        href={`https://wa.me/55${membro.whatsapp?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-3 px-6"
                      >
                        Abrir WhatsApp
                      </a>
                      <a
                        href={`mailto:${membro.email}`}
                        className="flex items-center gap-2 text-[var(--gray)] hover:text-[var(--gold)] transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        Enviar E-mail
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-10 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Dashboard Admin
          </p>
        </footer>
      </div>
    </main>
  )
}
