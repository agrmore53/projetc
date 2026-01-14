'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Presentation, Copy, Check, Sparkles, ChevronRight, ChevronLeft, FileText, Download } from 'lucide-react'

interface DadosApresentacao {
  nomeEmpresa: string
  nomeCliente: string
  segmentoCliente: string
  problemaPrincipal: string
  solucao: string
  beneficio1: string
  beneficio2: string
  beneficio3: string
  diferencial1: string
  diferencial2: string
  caso1Empresa: string
  caso1Resultado: string
  preco: string
  garantia: string
}

interface Slide {
  numero: number
  titulo: string
  conteudo: string
  notas: string
  duracao: string
}

export default function ApresentacaoPage() {
  const [dados, setDados] = useState<DadosApresentacao>({
    nomeEmpresa: '',
    nomeCliente: '',
    segmentoCliente: '',
    problemaPrincipal: '',
    solucao: '',
    beneficio1: '',
    beneficio2: '',
    beneficio3: '',
    diferencial1: '',
    diferencial2: '',
    caso1Empresa: '',
    caso1Resultado: '',
    preco: '',
    garantia: '30 dias',
  })

  const [slides, setSlides] = useState<Slide[]>([])
  const [slideAtual, setSlideAtual] = useState(0)
  const [copiado, setCopiado] = useState(false)
  const [gerado, setGerado] = useState(false)

  const gerarApresentacao = () => {
    if (!dados.nomeEmpresa || !dados.problemaPrincipal) {
      alert('Preencha pelo menos: Nome da Empresa e Problema Principal')
      return
    }

    const novosSlides: Slide[] = [
      {
        numero: 1,
        titulo: 'Capa',
        conteudo: `
# ${dados.nomeEmpresa}

## Apresentação para ${dados.nomeCliente || '[Cliente]'}

${dados.segmentoCliente ? `Especialistas em ${dados.segmentoCliente}` : ''}

---
[Seu Nome]
[Seu Cargo]
[Data]
        `.trim(),
        notas: 'Cumprimente, agradeça pelo tempo, confirme a duração da reunião (20-30 min)',
        duracao: '1 min',
      },
      {
        numero: 2,
        titulo: 'Agenda',
        conteudo: `
# O que vamos ver hoje

1. **O Desafio** - Entendendo o problema
2. **A Solução** - Como podemos ajudar
3. **Resultados** - O que você pode esperar
4. **Próximos Passos** - Como começar

---

⏱️ Duração: 20 minutos
❓ Perguntas: ao longo da apresentação
        `.trim(),
        notas: 'Defina expectativas claras. Pergunte se a agenda faz sentido.',
        duracao: '1 min',
      },
      {
        numero: 3,
        titulo: 'O Problema',
        conteudo: `
# O Desafio que Empresas Enfrentam

## ${dados.problemaPrincipal}

### Impactos comuns:

❌ Perda de tempo em processos manuais
❌ Dificuldade em escalar operações
❌ Resultados inconsistentes
❌ Frustração da equipe

---

> "Isso é algo que vocês também enfrentam?"
        `.trim(),
        notas: 'PARE e pergunte se eles enfrentam esse problema. Ouça atentamente. Anote as dores específicas.',
        duracao: '3 min',
      },
      {
        numero: 4,
        titulo: 'Custo do Problema',
        conteudo: `
# O Custo de Não Resolver

## A cada mês sem solução:

📉 **Tempo perdido**: horas que poderiam ser usadas em atividades estratégicas

💰 **Dinheiro perdido**: custos operacionais desnecessários

😤 **Oportunidades perdidas**: negócios que escapam

📊 **Competitividade**: concorrentes que avançam

---

> "Quanto isso está custando para vocês hoje?"
        `.trim(),
        notas: 'Faça o cliente quantificar a dor. Use perguntas de implicação do SPIN.',
        duracao: '2 min',
      },
      {
        numero: 5,
        titulo: 'A Solução',
        conteudo: `
# Apresentamos: ${dados.nomeEmpresa}

## ${dados.solucao || 'Sua solução para ' + dados.problemaPrincipal}

### Uma plataforma que permite:

✅ Automatizar processos repetitivos
✅ Ter visibilidade em tempo real
✅ Escalar sem aumentar custos
✅ Obter resultados previsíveis

---

*Simples. Rápido. Eficiente.*
        `.trim(),
        notas: 'Apresente a solução conectada aos problemas que o cliente mencionou.',
        duracao: '3 min',
      },
      {
        numero: 6,
        titulo: 'Benefícios',
        conteudo: `
# O Que Você Ganha

## Benefícios Principais:

🎯 **${dados.beneficio1 || 'Economia de tempo'}**
Reduza horas de trabalho manual por semana

💰 **${dados.beneficio2 || 'Redução de custos'}**
Diminua custos operacionais significativamente

📈 **${dados.beneficio3 || 'Aumento de resultados'}**
Melhore seus indicadores de performance

---

*Resultados que você pode medir*
        `.trim(),
        notas: 'Conecte cada benefício com uma dor específica que o cliente mencionou.',
        duracao: '2 min',
      },
      {
        numero: 7,
        titulo: 'Diferenciais',
        conteudo: `
# Por Que a ${dados.nomeEmpresa}?

## O que nos diferencia:

🏆 **${dados.diferencial1 || 'Especialização'}**
Focados 100% em resolver esse problema específico

⚡ **${dados.diferencial2 || 'Velocidade'}**
Implementação rápida e resultados em semanas

🤝 **Suporte Dedicado**
Acompanhamento próximo durante toda a jornada

🔄 **Melhoria Contínua**
Atualizações constantes baseadas em feedback

---

*Não somos apenas fornecedores, somos parceiros*
        `.trim(),
        notas: 'Destaque o que te diferencia da concorrência. Seja específico.',
        duracao: '2 min',
      },
      {
        numero: 8,
        titulo: 'Case de Sucesso',
        conteudo: `
# Resultados Reais

## ${dados.caso1Empresa || 'Empresa do Segmento'}

### Desafio:
Enfrentava os mesmos problemas que discutimos

### Solução:
Implementou ${dados.nomeEmpresa} em [X] semanas

### Resultados:
📊 **${dados.caso1Resultado || 'Aumento de 40% em eficiência'}**

---

> "Posso te conectar com eles para uma referência"
        `.trim(),
        notas: 'Case real é poderoso. Ofereça conectar o prospect com o cliente de referência.',
        duracao: '2 min',
      },
      {
        numero: 9,
        titulo: 'Como Funciona',
        conteudo: `
# Processo de Implementação

## 3 Passos Simples:

### 1️⃣ Diagnóstico (Semana 1)
Entendemos sua operação em detalhes

### 2️⃣ Configuração (Semana 2)
Personalizamos a solução para sua realidade

### 3️⃣ Go-Live (Semana 3)
Treinamento da equipe e início da operação

---

*Do zero ao resultado em 3 semanas*
        `.trim(),
        notas: 'Mostre que a implementação é simples. Reduza a percepção de risco.',
        duracao: '2 min',
      },
      {
        numero: 10,
        titulo: 'Investimento',
        conteudo: `
# Investimento

## ${dados.preco || 'Planos a partir de R$ XXX/mês'}

### O que está incluso:

✅ Acesso completo à plataforma
✅ Implementação assistida
✅ Treinamento da equipe
✅ Suporte dedicado
✅ Atualizações gratuitas

---

🛡️ **Garantia de ${dados.garantia}**
Se não gostar, devolvemos seu investimento

---

*ROI típico: retorno em [X] meses*
        `.trim(),
        notas: 'Apresente o preço com confiança. Destaque o valor, não o custo.',
        duracao: '2 min',
      },
      {
        numero: 11,
        titulo: 'Próximos Passos',
        conteudo: `
# Próximos Passos

## Como começar:

1. **Hoje**: Alinhar expectativas e tirar dúvidas

2. **Esta semana**: Envio da proposta formal

3. **Próxima semana**: Kick-off do projeto

---

## Pergunta:

> "O que te impede de começar ainda essa semana?"

---

📅 Qual o melhor horário para a próxima conversa?
        `.trim(),
        notas: 'Seja direto no fechamento. Pergunte sobre objeções. Proponha próximo passo concreto.',
        duracao: '3 min',
      },
      {
        numero: 12,
        titulo: 'Encerramento',
        conteudo: `
# Obrigado!

## ${dados.nomeEmpresa}

---

### Contato:

📧 [seu@email.com]
📱 [seu telefone]
🌐 [seu site]

---

*Estou à disposição para qualquer dúvida*

---

[Seus dados de contato e redes sociais]
        `.trim(),
        notas: 'Agradeça, confirme próximos passos, deixe contato claro.',
        duracao: '1 min',
      },
    ]

    setSlides(novosSlides)
    setSlideAtual(0)
    setGerado(true)
  }

  const copiarSlide = () => {
    if (slides[slideAtual]) {
      navigator.clipboard.writeText(slides[slideAtual].conteudo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const copiarTudo = () => {
    const texto = slides.map(s => `=== SLIDE ${s.numero}: ${s.titulo} ===\n\n${s.conteudo}\n\n📝 Notas: ${s.notas}\n⏱️ Duração: ${s.duracao}`).join('\n\n---\n\n')
    navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Gerador de Apresentação Comercial</h1>
            <p className="text-white/60">Crie slides prontos para sua reunião de vendas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--gold)]" />
                Informações da Apresentação
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Sua Empresa *</label>
                    <input
                      type="text"
                      value={dados.nomeEmpresa}
                      onChange={(e) => setDados({ ...dados, nomeEmpresa: e.target.value })}
                      placeholder="Nome da sua empresa"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Nome do Cliente</label>
                    <input
                      type="text"
                      value={dados.nomeCliente}
                      onChange={(e) => setDados({ ...dados, nomeCliente: e.target.value })}
                      placeholder="Empresa do cliente"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Problema Principal *</label>
                  <input
                    type="text"
                    value={dados.problemaPrincipal}
                    onChange={(e) => setDados({ ...dados, problemaPrincipal: e.target.value })}
                    placeholder="Ex: Dificuldade em gerenciar vendas"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Sua Solução</label>
                  <input
                    type="text"
                    value={dados.solucao}
                    onChange={(e) => setDados({ ...dados, solucao: e.target.value })}
                    placeholder="Ex: Plataforma de automação de vendas"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Benefício 1</label>
                    <input
                      type="text"
                      value={dados.beneficio1}
                      onChange={(e) => setDados({ ...dados, beneficio1: e.target.value })}
                      placeholder="Ex: Economia de tempo"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Benefício 2</label>
                    <input
                      type="text"
                      value={dados.beneficio2}
                      onChange={(e) => setDados({ ...dados, beneficio2: e.target.value })}
                      placeholder="Ex: Redução de custos"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Benefício 3</label>
                    <input
                      type="text"
                      value={dados.beneficio3}
                      onChange={(e) => setDados({ ...dados, beneficio3: e.target.value })}
                      placeholder="Ex: Mais vendas"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Diferencial 1</label>
                    <input
                      type="text"
                      value={dados.diferencial1}
                      onChange={(e) => setDados({ ...dados, diferencial1: e.target.value })}
                      placeholder="O que te diferencia"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Diferencial 2</label>
                    <input
                      type="text"
                      value={dados.diferencial2}
                      onChange={(e) => setDados({ ...dados, diferencial2: e.target.value })}
                      placeholder="Outro diferencial"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Case - Empresa</label>
                    <input
                      type="text"
                      value={dados.caso1Empresa}
                      onChange={(e) => setDados({ ...dados, caso1Empresa: e.target.value })}
                      placeholder="Nome do cliente case"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Case - Resultado</label>
                    <input
                      type="text"
                      value={dados.caso1Resultado}
                      onChange={(e) => setDados({ ...dados, caso1Resultado: e.target.value })}
                      placeholder="Ex: +40% vendas"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Preço</label>
                    <input
                      type="text"
                      value={dados.preco}
                      onChange={(e) => setDados({ ...dados, preco: e.target.value })}
                      placeholder="Ex: R$ 497/mês"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">Garantia</label>
                    <select
                      value={dados.garantia}
                      onChange={(e) => setDados({ ...dados, garantia: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
                    >
                      <option value="7 dias">7 dias</option>
                      <option value="14 dias">14 dias</option>
                      <option value="30 dias">30 dias</option>
                      <option value="60 dias">60 dias</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={gerarApresentacao}
                className="w-full mt-6 py-3 bg-[var(--gold)] text-black rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Gerar Apresentação (12 slides)
              </button>
            </div>
          </div>

          {/* Preview dos Slides */}
          <div>
            {gerado && slides.length > 0 ? (
              <div className="glass rounded-2xl p-6 sticky top-6">
                {/* Header do Preview */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Presentation className="w-5 h-5 text-[var(--gold)]" />
                    Slide {slideAtual + 1} de {slides.length}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={copiarSlide}
                      className="px-3 py-1.5 bg-white/10 rounded-lg text-sm flex items-center gap-1"
                    >
                      {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      Copiar
                    </button>
                    <button
                      onClick={copiarTudo}
                      className="px-3 py-1.5 bg-[var(--gold)] text-black rounded-lg text-sm flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Tudo
                    </button>
                  </div>
                </div>

                {/* Título do Slide */}
                <div className="mb-4">
                  <span className="text-xs px-2 py-1 rounded bg-[var(--gold)]/20 text-[var(--gold)]">
                    {slides[slideAtual].titulo}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/60 ml-2">
                    ⏱️ {slides[slideAtual].duracao}
                  </span>
                </div>

                {/* Conteúdo do Slide */}
                <div className="bg-white/5 rounded-xl p-6 min-h-[300px] mb-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {slides[slideAtual].conteudo}
                  </pre>
                </div>

                {/* Notas do Apresentador */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 mb-4">
                  <p className="text-sm">
                    <span className="text-blue-400 font-medium">📝 Notas:</span>{' '}
                    <span className="text-white/80">{slides[slideAtual].notas}</span>
                  </p>
                </div>

                {/* Navegação */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSlideAtual(Math.max(0, slideAtual - 1))}
                    disabled={slideAtual === 0}
                    className="flex items-center gap-1 px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </button>

                  <div className="flex gap-1">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlideAtual(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === slideAtual ? 'bg-[var(--gold)] w-4' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setSlideAtual(Math.min(slides.length - 1, slideAtual + 1))}
                    disabled={slideAtual === slides.length - 1}
                    className="flex items-center gap-1 px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
                  >
                    Próximo
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                <Presentation className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sua Apresentação</h3>
                <p className="text-white/60 mb-6">
                  Preencha as informações ao lado para gerar 12 slides prontos para sua reunião comercial.
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-xs">
                  <span className="px-2 py-1 bg-white/10 rounded">Capa</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Agenda</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Problema</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Solução</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Benefícios</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Case</span>
                  <span className="px-2 py-1 bg-white/10 rounded">Preço</span>
                  <span className="px-2 py-1 bg-white/10 rounded">CTA</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">🎯 Dicas para Apresentações de Vendas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Menos é Mais</h4>
              <p className="text-sm text-white/70">
                Máximo 6 bullets por slide. Slides são apoio, não teleprompter.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Faça Perguntas</h4>
              <p className="text-sm text-white/70">
                Pare para perguntar a cada 2-3 slides. Mantenha interação.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Conte Histórias</h4>
              <p className="text-sm text-white/70">
                Cases reais conectam mais que features e benefícios.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Termine com CTA</h4>
              <p className="text-sm text-white/70">
                Sempre proponha um próximo passo concreto no final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
