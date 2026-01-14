'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Users,
  Globe,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Crown,
  DollarSign
} from 'lucide-react'

// Tipos
interface Aula {
  id: string
  titulo: string
  duracao: string
}

interface Modulo {
  id: string
  titulo: string
  descricao: string
  icone: string
  cor: string
  aulas: Aula[]
}

// Dados dos módulos
const modulos: Modulo[] = [
  {
    id: 'mod1',
    titulo: 'Conhecendo o Império Sistemas',
    descricao: 'Domine todas as funcionalidades e argumentos de venda',
    icone: 'crown',
    cor: '#D4AF37',
    aulas: [
      { id: 'mod1-1', titulo: 'O que é o Império Sistemas', duracao: '10 min' },
      { id: 'mod1-2', titulo: 'Todas as Funcionalidades', duracao: '20 min' },
      { id: 'mod1-3', titulo: 'Tabela de Preços e Investimento', duracao: '8 min' },
      { id: 'mod1-4', titulo: 'As 10 Dores do Empresário', duracao: '15 min' },
      { id: 'mod1-5', titulo: 'Ramos de Negócio Atendidos', duracao: '12 min' },
      { id: 'mod1-6', titulo: 'Glossário de Termos', duracao: '5 min' },
      { id: 'mod1-7', titulo: 'FAQ - Perguntas Frequentes', duracao: '8 min' },
    ]
  },
  {
    id: 'mod2',
    titulo: 'Vendas Presenciais (Campo)',
    descricao: 'Técnicas para vender cara a cara com o cliente',
    icone: 'users',
    cor: '#4CAF50',
    aulas: [
      { id: 'mod2-1', titulo: 'Os 7 Passos da Venda Perfeita', duracao: '25 min' },
      { id: 'mod2-2', titulo: 'Abordagem e Primeira Impressão', duracao: '10 min' },
      { id: 'mod2-3', titulo: 'Sondagem: Descobrindo as Dores', duracao: '12 min' },
      { id: 'mod2-4', titulo: 'Apresentação e Demonstração', duracao: '15 min' },
      { id: 'mod2-5', titulo: 'Quebrando as 8 Objeções', duracao: '20 min' },
      { id: 'mod2-6', titulo: 'Técnicas de Fechamento', duracao: '15 min' },
      { id: 'mod2-7', titulo: 'Pós-Venda e Indicações', duracao: '10 min' },
    ]
  },
  {
    id: 'mod3',
    titulo: 'Vendas Digitais (Online)',
    descricao: 'Domine a arte de vender pela internet',
    icone: 'globe',
    cor: '#2196F3',
    aulas: [
      { id: 'mod3-1', titulo: 'Abordagem pelo WhatsApp', duracao: '12 min' },
      { id: 'mod3-2', titulo: 'Scripts de Mensagens', duracao: '15 min' },
      { id: 'mod3-3', titulo: 'Venda por Videochamada', duracao: '10 min' },
      { id: 'mod3-4', titulo: 'Funil de Vendas Digital', duracao: '18 min' },
      { id: 'mod3-5', titulo: 'Criação de Conteúdo', duracao: '20 min' },
    ]
  },
  {
    id: 'mod4',
    titulo: 'Tráfego Pago',
    descricao: 'Aprenda a criar anúncios que vendem',
    icone: 'target',
    cor: '#FF5722',
    aulas: [
      { id: 'mod4-1', titulo: 'TikTok Ads - Introdução', duracao: '15 min' },
      { id: 'mod4-2', titulo: 'TikTok Ads - Campanhas', duracao: '20 min' },
      { id: 'mod4-3', titulo: 'Kwai Ads', duracao: '15 min' },
      { id: 'mod4-4', titulo: 'Google Ads - Pesquisa', duracao: '18 min' },
      { id: 'mod4-5', titulo: 'Google Ads - Display', duracao: '12 min' },
      { id: 'mod4-6', titulo: 'Meta Ads - Facebook', duracao: '20 min' },
      { id: 'mod4-7', titulo: 'Meta Ads - Instagram', duracao: '18 min' },
    ]
  },
  {
    id: 'mod5',
    titulo: 'Tráfego Orgânico',
    descricao: 'Atraia clientes sem gastar com anúncios',
    icone: 'trending',
    cor: '#9C27B0',
    aulas: [
      { id: 'mod5-1', titulo: 'TikTok Orgânico', duracao: '15 min' },
      { id: 'mod5-2', titulo: 'Kwai Orgânico', duracao: '12 min' },
      { id: 'mod5-3', titulo: 'YouTube - Estratégias', duracao: '20 min' },
      { id: 'mod5-4', titulo: 'Facebook - Grupos e Página', duracao: '15 min' },
      { id: 'mod5-5', titulo: 'Instagram - Reels e Stories', duracao: '18 min' },
    ]
  },
  {
    id: 'mod6',
    titulo: 'Equity & Valuation',
    descricao: 'Estruture seu negócio para valer milhões',
    icone: 'dollar',
    cor: '#00BCD4',
    aulas: [
      { id: 'mod6-1', titulo: 'O que é Equity e Por Que Importa', duracao: '12 min' },
      { id: 'mod6-2', titulo: 'Estrutura Jurídica: MEI vs LTDA vs S/A', duracao: '15 min' },
      { id: 'mod6-3', titulo: 'Cap Table - Divisão Societária', duracao: '18 min' },
      { id: 'mod6-4', titulo: 'Vesting e Cliff para Sócios', duracao: '15 min' },
      { id: 'mod6-5', titulo: 'Como Calcular Valuation de SaaS', duracao: '20 min' },
      { id: 'mod6-6', titulo: 'Múltiplos de Mercado', duracao: '15 min' },
      { id: 'mod6-7', titulo: 'Preparando para Investidores', duracao: '18 min' },
      { id: 'mod6-8', titulo: 'Term Sheet e Negociação', duracao: '15 min' },
      { id: 'mod6-9', titulo: 'Exit - Vendendo sua Empresa', duracao: '20 min' },
    ]
  }
]

export default function AcademiaPage() {
  const router = useRouter()
  const [moduloAberto, setModuloAberto] = useState<string | null>('mod1')
  const [aulasCompletas, setAulasCompletas] = useState<string[]>([])
  const [aulaAtiva, setAulaAtiva] = useState<string | null>(null)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    // Carregar progresso
    const saved = localStorage.getItem('academia_progresso')
    if (saved) {
      setAulasCompletas(JSON.parse(saved))
    }
  }, [router])

  const toggleModulo = (id: string) => {
    setModuloAberto(moduloAberto === id ? null : id)
  }

  const marcarCompleta = (aulaId: string) => {
    const novas = aulasCompletas.includes(aulaId)
      ? aulasCompletas.filter(a => a !== aulaId)
      : [...aulasCompletas, aulaId]

    setAulasCompletas(novas)
    localStorage.setItem('academia_progresso', JSON.stringify(novas))
  }

  const getIcone = (tipo: string) => {
    switch(tipo) {
      case 'crown': return <Crown className="w-6 h-6" />
      case 'users': return <Users className="w-6 h-6" />
      case 'globe': return <Globe className="w-6 h-6" />
      case 'target': return <Target className="w-6 h-6" />
      case 'trending': return <TrendingUp className="w-6 h-6" />
      case 'dollar': return <DollarSign className="w-6 h-6" />
      default: return <BookOpen className="w-6 h-6" />
    }
  }

  const calcularProgresso = (modulo: Modulo) => {
    const completas = modulo.aulas.filter(a => aulasCompletas.includes(a.id)).length
    return Math.round((completas / modulo.aulas.length) * 100)
  }

  const progressoTotal = () => {
    const totalAulas = modulos.reduce((acc, m) => acc + m.aulas.length, 0)
    return Math.round((aulasCompletas.length / totalAulas) * 100)
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Academia do Vendedor</h1>
            <p className="text-[var(--gray)] text-sm">Torne-se um especialista em vendas</p>
          </div>
        </header>

        {/* Progresso Geral */}
        <section className="glass p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Seu Progresso Total</span>
            <span className="gold-text font-bold">{progressoTotal()}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full transition-all duration-500"
              style={{ width: `${progressoTotal()}%` }}
            />
          </div>
          <p className="text-[var(--gray)] text-sm mt-2">
            {aulasCompletas.length} de {modulos.reduce((acc, m) => acc + m.aulas.length, 0)} aulas concluídas
          </p>
        </section>

        {/* Lista de Módulos */}
        <section className="space-y-4">
          {modulos.map((modulo) => (
            <div key={modulo.id} className="glass overflow-hidden">
              {/* Header do Módulo */}
              <button
                onClick={() => toggleModulo(modulo.id)}
                className="w-full p-5 flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${modulo.cor}20`, color: modulo.cor }}
                >
                  {getIcone(modulo.icone)}
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold">{modulo.titulo}</h3>
                  <p className="text-[var(--gray)] text-sm">{modulo.descricao}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-sm" style={{ color: modulo.cor }}>
                      {calcularProgresso(modulo)}%
                    </span>
                    <div className="w-20 h-1.5 bg-white/10 rounded-full mt-1">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${calcularProgresso(modulo)}%`,
                          backgroundColor: modulo.cor
                        }}
                      />
                    </div>
                  </div>

                  {moduloAberto === modulo.id ? (
                    <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                  )}
                </div>
              </button>

              {/* Lista de Aulas */}
              {moduloAberto === modulo.id && (
                <div className="border-t border-white/10">
                  {modulo.aulas.map((aula, idx) => (
                    <div
                      key={aula.id}
                      className={`flex items-center gap-4 p-4 pl-8 hover:bg-white/5 transition-colors cursor-pointer ${
                        idx !== modulo.aulas.length - 1 ? 'border-b border-white/5' : ''
                      }`}
                      onClick={() => router.push(`/membro/academia/aula/${aula.id}`)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          marcarCompleta(aula.id)
                        }}
                        className="flex-shrink-0"
                      >
                        {aulasCompletas.includes(aula.id) ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-[var(--gray)]" />
                        )}
                      </button>

                      <div className="flex-1">
                        <p className={`${aulasCompletas.includes(aula.id) ? 'text-[var(--gray)]' : 'text-white'}`}>
                          {aula.titulo}
                        </p>
                      </div>

                      <span className="text-[var(--gray)] text-sm">{aula.duracao}</span>

                      <Play className="w-4 h-4 text-[var(--gold)]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Academia do Vendedor - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
