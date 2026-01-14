'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAccessLog() {
  const pathname = usePathname()

  useEffect(() => {
    const logAccess = async () => {
      try {
        // Pegar email do localStorage se existir
        const memberData = localStorage.getItem('member_data')
        let email = 'anonymous'

        if (memberData) {
          try {
            const parsed = JSON.parse(memberData)
            email = parsed.email || 'anonymous'
          } catch {
            email = 'anonymous'
          }
        }

        // Enviar log para API
        await fetch('/api/log-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            email: email
          })
        })
      } catch (error) {
        // Silenciar erros de log para não afetar UX
        console.error('Log error:', error)
      }
    }

    // Só logar páginas de membro
    if (pathname.startsWith('/membro')) {
      logAccess()
    }
  }, [pathname])
}
