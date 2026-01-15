'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Nivel {
  id: string
  titulo: string
  requisitos: string
  competencias: string
  salarioMin: number
  salarioMax: number
  tempoMedio: string
}

export default function PlanoCarreiraPage() {
  const [copied, setCopied] = useState(false)

  const [plano, setPlano] = useState({
    colaborador: '',
    cargoAtual: '',
    nivelAtual: '',
    departamento: '',
    dataInicio: '',
    gestorResponsavel: '',
    niveis: [
      { id: '1', titulo: 'Junior', requisitos: '0-2 anos de experiencia', competencias: 'Fundamentos tecnicos, trabalho em equipe', salarioMin: 3000, salarioMax: 5000, tempoMedio: '1-2 anos' },
      { id: '2', titulo: 'Pleno', requisitos: '2-5 anos de experiencia', competencias: 'Autonomia, resolucao de problemas', salarioMin: 5000, salarioMax: 8000, tempoMedio: '2-3 anos' },
      { id: '3', titulo: 'Senior', requisitos: '5+ anos de experiencia', competencias: 'Mentoria, decisoes tecnicas', salarioMin: 8000, salarioMax: 15000, tempoMedio: '3-5 anos' },
      { id: '4', titulo: 'Especialista/Lead', requisitos: '8+ anos de experiencia', competencias: 'Lideranca tecnica, arquitetura', salarioMin: 15000, salarioMax: 25000, tempoMedio: '5+ anos' },
    ] as Nivel[],
    objetivosCurto: '',
    objetivosMedio: '',
    objetivosLongo: '',
    acoesDesenvolvimento: ''
  })

  const adicionarNivel = () => {
    setPlano({
      ...plano,
      niveis: [...plano.niveis, {
        id: Date.now().toString(),
        titulo: '',
        requisitos: '',
        competencias: '',
        salarioMin: 0,
        salarioMax: 0,
        tempoMedio: ''
      }]
    })
  }

  const removerNivel = (id: string) => {
    setPlano({
      ...plano,
      niveis: plano.niveis.filter(n => n.id !== id)
    })
  }

  const atualizarNivel = (id: string, campo: keyof Nivel, valor: string | number) => {
    setPlano({
      ...plano,
      niveis: plano.niveis.map(n =>
        n.id === id ? { ...n, [campo]: valor } : n
      )
    })
  }

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarPlano = () => {
    return `
PLANO DE DESENVOLVIMENTO DE CARREIRA
═══════════════════════════════════════════════════════════════

INFORMACOES DO COLABORADOR
─────────────────────────────────────────────────────────────
Nome: ${plano.colaborador || '[NOME]'}
Cargo Atual: ${plano.cargoAtual || '[CARGO]'}
Nivel Atual: ${plano.nivelAtual || '[NIVEL]'}
Departamento: ${plano.departamento || '[DEPARTAMENTO]'}
Data de Inicio: ${plano.dataInicio || '[DATA]'}
Gestor: ${plano.gestorResponsavel || '[GESTOR]'}

═══════════════════════════════════════════════════════════════
                    TRILHA DE CARREIRA
═══════════════════════════════════════════════════════════════

${plano.niveis.map((n, i) => `
NIVEL ${i + 1}: ${n.titulo || '[TITULO]'}
─────────────────────────────────────────────────────────────
Requisitos: ${n.requisitos || '[REQUISITOS]'}
Competencias: ${n.competencias || '[COMPETENCIAS]'}
Faixa Salarial: ${formatarMoeda(n.salarioMin)} - ${formatarMoeda(n.salarioMax)}
Tempo Medio: ${n.tempoMedio || '[TEMPO]'}
`).join('')}

═══════════════════════════════════════════════════════════════
                    OBJETIVOS DE CARREIRA
═══════════════════════════════════════════════════════════════

CURTO PRAZO (6 meses)
─────────────────────────────────────────────────────────────
${plano.objetivosCurto || `• [Objetivo 1]
• [Objetivo 2]
• [Objetivo 3]`}

MEDIO PRAZO (1-2 anos)
─────────────────────────────────────────────────────────────
${plano.objetivosMedio || `• [Objetivo 1]
• [Objetivo 2]
• [Objetivo 3]`}

LONGO PRAZO (3-5 anos)
─────────────────────────────────────────────────────────────
${plano.objetivosLongo || `• [Objetivo 1]
• [Objetivo 2]
• [Objetivo 3]`}

═══════════════════════════════════════════════════════════════
                    ACOES DE DESENVOLVIMENTO
═══════════════════════════════════════════════════════════════

${plano.acoesDesenvolvimento || `1. [Acao] - Prazo: [Data] - Responsavel: [Nome]
2. [Acao] - Prazo: [Data] - Responsavel: [Nome]
3. [Acao] - Prazo: [Data] - Responsavel: [Nome]`}

═══════════════════════════════════════════════════════════════
ACOMPANHAMENTO
═══════════════════════════════════════════════════════════════
Frequencia de Revisao: Trimestral
Proxima Revisao: [Data]
Criterios de Promocao:
  • Atingimento de metas individuais
  • Desenvolvimento das competencias do proximo nivel
  • Avaliacao de desempenho positiva
  • Disponibilidade de vaga/orcamento

═══════════════════════════════════════════════════════════════
Documento criado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarPlano = () => {
    navigator.clipboard.writeText(gerarPlano())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <TrendingUp className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Plano de <span className="gold-text">Carreira</span>
          </h1>
          <p className="text-[var(--gray)]">Desenvolvimento profissional estruturado</p>
        </div>

        {/* Info Colaborador */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Colaborador</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Nome</label>
              <input
                type="text"
                value={plano.colaborador}
                onChange={(e) => setPlano({ ...plano, colaborador: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Cargo Atual</label>
              <input
                type="text"
                value={plano.cargoAtual}
                onChange={(e) => setPlano({ ...plano, cargoAtual: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Nivel Atual</label>
              <input
                type="text"
                value={plano.nivelAtual}
                onChange={(e) => setPlano({ ...plano, nivelAtual: e.target.value })}
                className="input-field"
                placeholder="Junior, Pleno..."
              />
            </div>
            <div>
              <label className="input-label">Departamento</label>
              <input
                type="text"
                value={plano.departamento}
                onChange={(e) => setPlano({ ...plano, departamento: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Data de Inicio</label>
              <input
                type="date"
                value={plano.dataInicio}
                onChange={(e) => setPlano({ ...plano, dataInicio: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Gestor Responsavel</label>
              <input
                type="text"
                value={plano.gestorResponsavel}
                onChange={(e) => setPlano({ ...plano, gestorResponsavel: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Trilha de Carreira */}
        <div className="glass card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Trilha de Carreira</h2>
            <button onClick={adicionarNivel} className="btn-secondary text-xs flex items-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar Nivel
            </button>
          </div>
          <div className="space-y-4">
            {plano.niveis.map((nivel, index) => (
              <div key={nivel.id} className="bg-black/20 rounded-xl p-4 relative">
                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[var(--gold)]">↓</div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[var(--gold)] font-display">Nivel {index + 1}</span>
                  <button onClick={() => removerNivel(nivel.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[var(--gray)]">Titulo</label>
                    <input
                      type="text"
                      value={nivel.titulo}
                      onChange={(e) => atualizarNivel(nivel.id, 'titulo', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: Desenvolvedor Pleno"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Tempo Medio no Nivel</label>
                    <input
                      type="text"
                      value={nivel.tempoMedio}
                      onChange={(e) => atualizarNivel(nivel.id, 'tempoMedio', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: 2-3 anos"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Requisitos</label>
                    <input
                      type="text"
                      value={nivel.requisitos}
                      onChange={(e) => atualizarNivel(nivel.id, 'requisitos', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: 2-5 anos de experiencia"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Competencias</label>
                    <input
                      type="text"
                      value={nivel.competencias}
                      onChange={(e) => atualizarNivel(nivel.id, 'competencias', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                      placeholder="Ex: Autonomia, lideranca"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Salario Minimo</label>
                    <input
                      type="number"
                      value={nivel.salarioMin}
                      onChange={(e) => atualizarNivel(nivel.id, 'salarioMin', Number(e.target.value))}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gray)]">Salario Maximo</label>
                    <input
                      type="number"
                      value={nivel.salarioMax}
                      onChange={(e) => atualizarNivel(nivel.id, 'salarioMax', Number(e.target.value))}
                      className="bg-black/30 border border-white/10 rounded px-3 py-2 w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Objetivos */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Objetivos de Carreira</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Curto Prazo (6 meses)</label>
              <textarea
                value={plano.objetivosCurto}
                onChange={(e) => setPlano({ ...plano, objetivosCurto: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Objetivo 1&#10;• Objetivo 2"
              />
            </div>
            <div>
              <label className="input-label">Medio Prazo (1-2 anos)</label>
              <textarea
                value={plano.objetivosMedio}
                onChange={(e) => setPlano({ ...plano, objetivosMedio: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Objetivo 1&#10;• Objetivo 2"
              />
            </div>
            <div>
              <label className="input-label">Longo Prazo (3-5 anos)</label>
              <textarea
                value={plano.objetivosLongo}
                onChange={(e) => setPlano({ ...plano, objetivosLongo: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="• Objetivo 1&#10;• Objetivo 2"
              />
            </div>
            <div>
              <label className="input-label">Acoes de Desenvolvimento</label>
              <textarea
                value={plano.acoesDesenvolvimento}
                onChange={(e) => setPlano({ ...plano, acoesDesenvolvimento: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="1. Acao - Prazo - Responsavel"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPlano} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Plano'}
          </button>
        </div>
      </div>
    </main>
  )
}
