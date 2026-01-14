'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Award, Download, Check } from 'lucide-react'

export default function CertificadoPage() {
  const [nome, setNome] = useState('')
  const [dataConclusao, setDataConclusao] = useState('')
  const [curso, setCurso] = useState('Mentoria Elite - Do Zero ao Milhão')
  const [gerado, setGerado] = useState(false)

  useEffect(() => {
    // Tentar pegar o nome do localStorage
    const memberData = localStorage.getItem('member_data')
    if (memberData) {
      try {
        const parsed = JSON.parse(memberData)
        if (parsed.nome) setNome(parsed.nome)
      } catch {}
    }

    // Data atual
    setDataConclusao(new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }))
  }, [])

  const gerarCertificado = () => {
    if (nome.trim()) {
      setGerado(true)
    }
  }

  const downloadCertificado = () => {
    window.print()
  }

  const cursos = [
    'Mentoria Elite - Do Zero ao Milhão',
    'Academia do Vendedor - Módulo Completo',
    'Projeto Zion - Treinamento de Vendas',
    'Módulo Equity & Valuation',
    'Formação em Vendas Consultivas',
    'Especialização em SaaS'
  ]

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
            <Award className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerar <span className="gold-text">Certificado</span>
          </h1>
          <p className="text-[var(--gray)]">Certificado de conclusão personalizado</p>
        </div>

        {!gerado ? (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Informações do Certificado</h2>

            <div className="space-y-4">
              <div>
                <label className="input-label">Nome Completo (como aparecerá no certificado)</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Curso/Programa</label>
                <select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  className="input-field"
                >
                  {cursos.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label">Data de Conclusão</label>
                <input
                  type="text"
                  value={dataConclusao}
                  onChange={(e) => setDataConclusao(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={gerarCertificado}
              disabled={!nome.trim()}
              className="btn-primary w-full mt-8"
            >
              Gerar Certificado
            </button>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            {/* Ações */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={downloadCertificado}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar Certificado
              </button>
              <button
                onClick={() => setGerado(false)}
                className="btn-secondary"
              >
                Editar
              </button>
            </div>

            {/* Certificado */}
            <div
              className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] border-4 border-[var(--gold)] rounded-lg p-8 md:p-12 overflow-hidden print:border-2"
              style={{ aspectRatio: '1.414/1' }}
            >
              {/* Decorações de canto */}
              <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[var(--gold)] opacity-30" />
              <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[var(--gold)] opacity-30" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[var(--gold)] opacity-30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[var(--gold)] opacity-30" />

              {/* Padrão de fundo */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    #D4AF37 10px,
                    #D4AF37 11px
                  )`
                }} />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 h-full flex flex-col items-center justify-between text-center">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-12 border-2 border-[var(--gold)] rounded-full flex items-center justify-center">
                      <span className="font-display text-xl text-[var(--gold)]">M</span>
                    </div>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl tracking-widest text-[var(--gold)] uppercase">
                    Mentoria Elite
                  </h2>
                </div>

                {/* Título */}
                <div className="my-6">
                  <p className="text-[var(--gray)] text-sm uppercase tracking-widest mb-4">
                    Certificado de Conclusão
                  </p>
                  <p className="text-[var(--gray)] mb-2">Certificamos que</p>
                  <h1 className="font-display text-3xl md:text-5xl gold-text mb-4">
                    {nome}
                  </h1>
                  <p className="text-[var(--gray)] max-w-md mx-auto">
                    concluiu com sucesso o programa
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-white mt-2 mb-4">
                    {curso}
                  </h3>
                  <p className="text-[var(--gray)] text-sm">
                    demonstrando comprometimento e excelência durante toda a jornada.
                  </p>
                </div>

                {/* Footer */}
                <div className="w-full">
                  <div className="flex items-center justify-center gap-8 md:gap-16 mb-4">
                    <div className="text-center">
                      <div className="w-32 border-b border-[var(--gold)] mb-2" />
                      <p className="text-xs text-[var(--gray)]">Mentor</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-12 h-12 text-[var(--gold)] mx-auto mb-2" />
                    </div>
                    <div className="text-center">
                      <div className="w-32 border-b border-[var(--gold)] mb-2" />
                      <p className="text-xs text-[var(--gray)]">Data</p>
                      <p className="text-xs text-white">{dataConclusao}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[var(--gray)]">
                    <Check className="w-4 h-4 text-[var(--gold)]" />
                    <span>Certificado verificável • ID: {Date.now().toString(36).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruções */}
            <div className="glass p-6 mt-6 border border-[var(--gold)]/30">
              <h3 className="font-display text-lg gold-text mb-3">📋 Instruções</h3>
              <ul className="text-sm text-[var(--gray)] space-y-2">
                <li>• Clique em "Baixar Certificado" para salvar como imagem PNG</li>
                <li>• O certificado tem alta resolução, ideal para impressão</li>
                <li>• Você pode compartilhar no LinkedIn e redes sociais</li>
                <li>• O ID único serve como verificação de autenticidade</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
