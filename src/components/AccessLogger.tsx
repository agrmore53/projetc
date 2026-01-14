'use client'

import { useAccessLog } from '@/hooks/useAccessLog'

export function AccessLogger({ children }: { children: React.ReactNode }) {
  useAccessLog()
  return <>{children}</>
}
