import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Membro = {
  id: string
  created_at: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  profissao: string
  horas: string
  ideia: string
  objetivo: string
}
