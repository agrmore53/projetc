import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, email } = body

    // Pegar IP do usuário
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() :
               request.headers.get('x-real-ip') ||
               'unknown'

    // Pegar User Agent
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Salvar no Supabase
    const { error } = await supabase
      .from('access_logs')
      .insert([{
        user_email: email || 'anonymous',
        user_ip: ip,
        page: page,
        user_agent: userAgent
      }])

    if (error) {
      console.error('Erro ao salvar log:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no log:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
