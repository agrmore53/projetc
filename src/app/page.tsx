'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password === 'guilherme') {
      localStorage.setItem('mentoria_logged', 'true')
      router.push('/membro')
    } else {
      setError('Senha incorreta. Tente novamente.')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-pattern" />

      <div className="glass-strong max-w-md w-full p-12 md:p-16 text-center animate-fadeInUp">
        {/* Logo */}
        <div className="w-20 h-20 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="font-display text-3xl text-[var(--gold)]">M</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl mb-2">
          <span className="gold-text">Mentoria Elite</span>
        </h1>
        <p className="text-[var(--gray)] mb-10">Área Exclusiva de Membros</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-left">
            <label className="input-label">Senha de Acesso</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="input-field pr-12"
                autoComplete="off"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray)]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Verificando...' : 'Acessar'}
          </button>

          {error && (
            <p className="text-red-400 mt-4 text-sm">{error}</p>
          )}
        </form>

        {/* Footer */}
        <p className="text-[var(--gray)] text-xs mt-10">
          Acesso restrito aos membros da mentoria
        </p>
      </div>
    </main>
  )
}
