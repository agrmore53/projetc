'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Copy, Check, Download, Lightbulb, Target, Users, Zap } from 'lucide-react'

interface EbookStructure {
  titulo: string
  subtitulo: string
  avatar: string
  problema: string
  promessa: string
  capitulos: {
    titulo: string
    conteudo: string[]
  }[]
  cta: string
}

export default function EbookPage() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    nicho: '',
    avatar: '',
    problema: '',
    solucao: '',
    beneficios: '',
    autoridade: ''
  })
  const [ebook, setEbook] = useState<EbookStructure | null>(null)

  const gerarEbook = () => {
    const beneficiosList = formData.beneficios.split(',').map(b => b.trim())

    const structure: EbookStructure = {
      titulo: `O Guia Definitivo: Como ${formData.solucao}`,
      subtitulo: `O método comprovado para ${formData.avatar} que quer ${beneficiosList[0]?.toLowerCase() || 'resultados'}`,
      avatar: formData.avatar,
      problema: formData.problema,
      promessa: formData.solucao,
      capitulos: [
        {
          titulo: 'Introdução: Por Que Você Precisa Ler Isso',
          conteudo: [
            `Se você é ${formData.avatar} e está cansado de ${formData.problema}, este e-book foi escrito para você.`,
            'Nos próximos capítulos, vou revelar exatamente o que aprendi depois de anos no mercado.',
            'Este não é mais um conteúdo genérico. É um método prático e aplicável.',
            `Ao final, você terá um plano claro para ${formData.solucao.toLowerCase()}.`
          ]
        },
        {
          titulo: `Capítulo 1: O Verdadeiro Problema de ${formData.avatar}`,
          conteudo: [
            `A maioria dos ${formData.avatar.toLowerCase()}s enfrenta o mesmo desafio: ${formData.problema}.`,
            'Isso acontece por 3 motivos principais:',
            '• Falta de um método estruturado',
            '• Excesso de informação sem aplicação prática',
            '• Ausência de orientação especializada',
            'Mas a boa notícia é que existe solução.'
          ]
        },
        {
          titulo: 'Capítulo 2: A Mentalidade Certa',
          conteudo: [
            'Antes de qualquer técnica, você precisa ajustar sua mentalidade.',
            '80% do sucesso vem de como você pensa, não do que você faz.',
            'Os 3 pilares da mentalidade vencedora:',
            '• Compromisso com o processo, não apenas com o resultado',
            '• Disposição para aprender e errar rápido',
            '• Foco em progresso, não em perfeição'
          ]
        },
        {
          titulo: `Capítulo 3: O Método Para ${formData.solucao}`,
          conteudo: [
            'Agora vamos ao passo a passo prático.',
            '',
            '**Passo 1: Diagnóstico**',
            'Antes de agir, entenda onde você está e onde quer chegar.',
            '',
            '**Passo 2: Planejamento**',
            'Defina metas claras com prazos realistas.',
            '',
            '**Passo 3: Execução**',
            'Aplique as técnicas diariamente, mesmo que por poucos minutos.',
            '',
            '**Passo 4: Análise**',
            'Meça seus resultados semanalmente e ajuste o que for necessário.'
          ]
        },
        {
          titulo: 'Capítulo 4: Ferramentas e Recursos',
          conteudo: [
            'Para acelerar seus resultados, use estas ferramentas:',
            '',
            '✅ Planilha de acompanhamento (inclusa no material bônus)',
            '✅ Checklist diário de atividades',
            '✅ Templates prontos para usar',
            '✅ Scripts de abordagem',
            '',
            'Tudo isso está disponível para você aplicar imediatamente.'
          ]
        },
        {
          titulo: 'Capítulo 5: Erros Que Você Deve Evitar',
          conteudo: [
            'Depois de ajudar centenas de pessoas, identifiquei os erros mais comuns:',
            '',
            '❌ **Erro 1:** Querer resultados sem consistência',
            '❌ **Erro 2:** Copiar estratégias sem adaptar à realidade',
            '❌ **Erro 3:** Desistir antes de ver os primeiros resultados',
            '❌ **Erro 4:** Não investir em conhecimento e mentoria',
            '',
            'Evite esses erros e você já estará à frente de 90% das pessoas.'
          ]
        },
        {
          titulo: 'Capítulo 6: Cases de Sucesso',
          conteudo: [
            'Veja o que outras pessoas como você conquistaram:',
            '',
            `📌 **Case 1:** "${formData.avatar} que saiu de ${formData.problema} para ${beneficiosList[0] || 'resultados incríveis'} em 90 dias"`,
            '',
            `📌 **Case 2:** "Como apliquei o método e ${beneficiosList[1] || 'transformei minha vida'}"`,
            '',
            `📌 **Case 3:** "De iniciante a referência no ${formData.nicho}"`,
            '',
            'Você pode ser o próximo case de sucesso.'
          ]
        },
        {
          titulo: 'Conclusão: Seu Próximo Passo',
          conteudo: [
            'Você chegou até aqui porque quer mudança de verdade.',
            '',
            'Agora você tem duas opções:',
            '',
            '1️⃣ Fechar este e-book e continuar como está',
            '',
            `2️⃣ Aplicar o que aprendeu e finalmente ${formData.solucao.toLowerCase()}`,
            '',
            'A escolha é sua. Mas lembre-se: conhecimento sem ação é apenas entretenimento.',
            '',
            'Se você quer acelerar seus resultados com acompanhamento especializado, entre em contato.'
          ]
        }
      ],
      cta: `Quer ajuda personalizada para ${formData.solucao.toLowerCase()}? Clique no botão abaixo e fale comigo agora.`
    }

    setEbook(structure)
    setStep(3)
  }

  const copyToClipboard = () => {
    if (!ebook) return

    let text = `# ${ebook.titulo}\n`
    text += `## ${ebook.subtitulo}\n\n`
    text += `---\n\n`

    ebook.capitulos.forEach((cap, i) => {
      text += `## ${cap.titulo}\n\n`
      cap.conteudo.forEach(line => {
        text += `${line}\n`
      })
      text += '\n---\n\n'
    })

    text += `## 🎯 ${ebook.cta}\n`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const templates = [
    { nicho: 'Marketing Digital', avatar: 'Empreendedor iniciante', problema: 'não conseguir vender online', solucao: 'Criar seu primeiro funil de vendas lucrativo', beneficios: 'Vendas automáticas, Liberdade de tempo, Escala do negócio', autoridade: '10 anos no mercado digital' },
    { nicho: 'Vendas B2B', avatar: 'Vendedor corporativo', problema: 'não bater metas consistentemente', solucao: 'Fechar contratos de alto valor todo mês', beneficios: 'Comissões maiores, Promoção na carreira, Reconhecimento', autoridade: '500+ contratos fechados' },
    { nicho: 'SaaS', avatar: 'Founder de startup', problema: 'alto churn e baixo MRR', solucao: 'Escalar seu SaaS para 100k MRR', beneficios: 'Receita recorrente, Valuation alto, Investimento', autoridade: 'Fundador de 3 startups de sucesso' },
    { nicho: 'Consultoria', avatar: 'Consultor independente', problema: 'depender de indicações', solucao: 'Atrair clientes premium de forma previsível', beneficios: 'Agenda cheia, Ticket alto, Autoridade no mercado', autoridade: '200+ clientes atendidos' },
  ]

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* Header */}
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">E-book</span>
          </h1>
          <p className="text-[var(--gray)]">Crie a estrutura completa do seu lead magnet em minutos</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-[var(--gold)] text-black' : 'bg-white/10 text-[var(--gray)]'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[var(--gold)]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[var(--gold)]" />
              Escolha um Template ou Comece do Zero
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFormData(t)
                    setStep(2)
                  }}
                  className="glass p-4 text-left hover:border-[var(--gold)] transition-all"
                >
                  <h3 className="font-display text-[var(--gold)] mb-1">{t.nicho}</h3>
                  <p className="text-sm text-[var(--gray)]">Para {t.avatar.toLowerCase()}</p>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => setStep(2)} className="btn-secondary">
                Começar do Zero
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--gold)]" />
              Defina o Conteúdo do E-book
            </h2>

            <div className="space-y-4">
              <div>
                <label className="input-label">Nicho/Mercado</label>
                <input
                  type="text"
                  value={formData.nicho}
                  onChange={(e) => setFormData({...formData, nicho: e.target.value})}
                  placeholder="Ex: Marketing Digital, Vendas B2B, SaaS..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Quem é seu público-alvo? (Avatar)</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  placeholder="Ex: Empreendedor iniciante, Vendedor corporativo..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Qual problema principal ele enfrenta?</label>
                <input
                  type="text"
                  value={formData.problema}
                  onChange={(e) => setFormData({...formData, problema: e.target.value})}
                  placeholder="Ex: não conseguir vender online, não bater metas..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Qual solução/transformação você oferece?</label>
                <input
                  type="text"
                  value={formData.solucao}
                  onChange={(e) => setFormData({...formData, solucao: e.target.value})}
                  placeholder="Ex: Criar seu primeiro funil de vendas lucrativo"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Principais benefícios (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.beneficios}
                  onChange={(e) => setFormData({...formData, beneficios: e.target.value})}
                  placeholder="Ex: Vendas automáticas, Liberdade de tempo, Escala"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Sua autoridade/experiência</label>
                <input
                  type="text"
                  value={formData.autoridade}
                  onChange={(e) => setFormData({...formData, autoridade: e.target.value})}
                  placeholder="Ex: 10 anos de experiência, 500+ clientes atendidos..."
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Voltar
              </button>
              <button
                onClick={gerarEbook}
                disabled={!formData.avatar || !formData.problema || !formData.solucao}
                className="btn-primary flex-1"
              >
                Gerar E-book
              </button>
            </div>
          </div>
        )}

        {step === 3 && ebook && (
          <div className="animate-fadeInUp">
            {/* Preview Header */}
            <div className="glass card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl gold-text">{ebook.titulo}</h2>
                  <p className="text-[var(--gray)]">{ebook.subtitulo}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="btn-primary flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Tudo'}
                </button>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="bg-[var(--gold)]/20 text-[var(--gold)] px-3 py-1 rounded-full">
                  {ebook.capitulos.length} capítulos
                </span>
                <span className="bg-white/10 text-[var(--gray)] px-3 py-1 rounded-full">
                  ~15 páginas
                </span>
              </div>
            </div>

            {/* Chapters */}
            <div className="space-y-4">
              {ebook.capitulos.map((cap, i) => (
                <div key={i} className="glass p-6">
                  <h3 className="font-display text-lg text-[var(--gold)] mb-4">{cap.titulo}</h3>
                  <div className="space-y-2 text-[var(--gray)]">
                    {cap.conteudo.map((line, j) => (
                      <p key={j} className={line.startsWith('**') ? 'font-semibold text-white' : ''}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="glass card mt-6 border-2 border-[var(--gold)]">
              <h3 className="font-display text-xl gold-text mb-2">Call to Action Final</h3>
              <p className="text-[var(--gray)]">{ebook.cta}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(2)} className="btn-secondary">
                Editar
              </button>
              <button onClick={() => { setStep(1); setEbook(null); setFormData({ nicho: '', avatar: '', problema: '', solucao: '', beneficios: '', autoridade: '' }) }} className="btn-secondary">
                Novo E-book
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
