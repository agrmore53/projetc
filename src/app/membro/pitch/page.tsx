'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Presentation,
  ChevronRight,
  ChevronLeft,
  Download,
  Copy,
  Check,
  Lightbulb,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  Rocket,
  Award,
  Building2,
  MessageSquare,
  Zap,
  Globe,
  Shield
} from 'lucide-react'

interface DadosPitch {
  // Slide 1 - Capa
  nomeEmpresa: string
  tagline: string

  // Slide 2 - Problema
  problema1: string
  problema2: string
  problema3: string

  // Slide 3 - Solução
  solucao: string
  diferencial1: string
  diferencial2: string
  diferencial3: string

  // Slide 4 - Mercado
  tam: string
  sam: string
  som: string

  // Slide 5 - Modelo de Negócio
  modeloReceita: string
  ticketMedio: string
  margemBruta: string

  // Slide 6 - Tração
  mrr: string
  clientes: string
  crescimento: string
  nps: string

  // Slide 7 - Competição
  competidor1: string
  competidor2: string
  vantagem: string

  // Slide 8 - Equipe
  fundador1Nome: string
  fundador1Cargo: string
  fundador1Bio: string
  fundador2Nome: string
  fundador2Cargo: string
  fundador2Bio: string

  // Slide 9 - Roadmap
  meta3meses: string
  meta6meses: string
  meta12meses: string

  // Slide 10 - Ask
  valorRodada: string
  uso1: string
  uso2: string
  uso3: string
}

const dadosIniciais: DadosPitch = {
  nomeEmpresa: '',
  tagline: '',
  problema1: '',
  problema2: '',
  problema3: '',
  solucao: '',
  diferencial1: '',
  diferencial2: '',
  diferencial3: '',
  tam: '',
  sam: '',
  som: '',
  modeloReceita: '',
  ticketMedio: '',
  margemBruta: '',
  mrr: '',
  clientes: '',
  crescimento: '',
  nps: '',
  competidor1: '',
  competidor2: '',
  vantagem: '',
  fundador1Nome: '',
  fundador1Cargo: '',
  fundador1Bio: '',
  fundador2Nome: '',
  fundador2Cargo: '',
  fundador2Bio: '',
  meta3meses: '',
  meta6meses: '',
  meta12meses: '',
  valorRodada: '',
  uso1: '',
  uso2: '',
  uso3: '',
}

const slides = [
  { id: 1, nome: 'Capa', icon: Presentation },
  { id: 2, nome: 'Problema', icon: Target },
  { id: 3, nome: 'Solução', icon: Lightbulb },
  { id: 4, nome: 'Mercado', icon: Globe },
  { id: 5, nome: 'Modelo', icon: DollarSign },
  { id: 6, nome: 'Tração', icon: TrendingUp },
  { id: 7, nome: 'Competição', icon: Shield },
  { id: 8, nome: 'Equipe', icon: Users },
  { id: 9, nome: 'Roadmap', icon: Rocket },
  { id: 10, nome: 'Ask', icon: Award },
]

export default function PitchPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosPitch>(dadosIniciais)
  const [slideAtual, setSlideAtual] = useState(1)
  const [modoVisualizacao, setModoVisualizacao] = useState(false)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('pitch_deck_data')
    if (saved) {
      setDados(JSON.parse(saved))
    }
  }, [router])

  const handleChange = (campo: keyof DadosPitch, valor: string) => {
    const novosDados = { ...dados, [campo]: valor }
    setDados(novosDados)
    localStorage.setItem('pitch_deck_data', JSON.stringify(novosDados))
  }

  const proximoSlide = () => {
    if (slideAtual < 10) setSlideAtual(slideAtual + 1)
  }

  const slideAnterior = () => {
    if (slideAtual > 1) setSlideAtual(slideAtual - 1)
  }

  const gerarTexto = () => {
    return `
# ${dados.nomeEmpresa || '[Nome da Empresa]'}
${dados.tagline || '[Tagline]'}

---

## O PROBLEMA

1. ${dados.problema1 || '[Problema 1]'}
2. ${dados.problema2 || '[Problema 2]'}
3. ${dados.problema3 || '[Problema 3]'}

---

## A SOLUÇÃO

${dados.solucao || '[Descrição da solução]'}

**Diferenciais:**
- ${dados.diferencial1 || '[Diferencial 1]'}
- ${dados.diferencial2 || '[Diferencial 2]'}
- ${dados.diferencial3 || '[Diferencial 3]'}

---

## OPORTUNIDADE DE MERCADO

- **TAM (Total):** ${dados.tam || 'R$ X bilhões'}
- **SAM (Alcançável):** ${dados.sam || 'R$ X bilhões'}
- **SOM (Realista):** ${dados.som || 'R$ X milhões'}

---

## MODELO DE NEGÓCIO

- **Modelo:** ${dados.modeloReceita || '[SaaS/Marketplace/etc]'}
- **Ticket Médio:** ${dados.ticketMedio || 'R$ X/mês'}
- **Margem Bruta:** ${dados.margemBruta || 'X%'}

---

## TRAÇÃO

- **MRR Atual:** ${dados.mrr || 'R$ X'}
- **Clientes:** ${dados.clientes || 'X clientes'}
- **Crescimento:** ${dados.crescimento || 'X% MoM'}
- **NPS:** ${dados.nps || 'X'}

---

## COMPETIÇÃO

**Competidores:**
- ${dados.competidor1 || '[Competidor 1]'}
- ${dados.competidor2 || '[Competidor 2]'}

**Nossa Vantagem:** ${dados.vantagem || '[Vantagem competitiva]'}

---

## EQUIPE

**${dados.fundador1Nome || '[Fundador 1]'}** - ${dados.fundador1Cargo || '[Cargo]'}
${dados.fundador1Bio || '[Bio]'}

**${dados.fundador2Nome || '[Fundador 2]'}** - ${dados.fundador2Cargo || '[Cargo]'}
${dados.fundador2Bio || '[Bio]'}

---

## ROADMAP

- **3 meses:** ${dados.meta3meses || '[Meta]'}
- **6 meses:** ${dados.meta6meses || '[Meta]'}
- **12 meses:** ${dados.meta12meses || '[Meta]'}

---

## O ASK

**Buscando:** ${dados.valorRodada || 'R$ X'}

**Uso dos recursos:**
1. ${dados.uso1 || '[Uso 1]'}
2. ${dados.uso2 || '[Uso 2]'}
3. ${dados.uso3 || '[Uso 3]'}
`.trim()
  }

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(gerarTexto())
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const renderFormulario = () => {
    switch (slideAtual) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Nome da Empresa</label>
              <input
                type="text"
                value={dados.nomeEmpresa}
                onChange={(e) => handleChange('nomeEmpresa', e.target.value)}
                placeholder="Ex: Império Sistemas"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Tagline (uma frase que resume)</label>
              <input
                type="text"
                value={dados.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="Ex: Gestão simplificada para pequenos negócios"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div className="bg-[var(--gold)]/10 rounded-xl p-4 border border-[var(--gold)]/20">
              <p className="text-[var(--gold)] font-medium text-sm mb-2">Dica</p>
              <p className="text-[var(--gray)] text-sm">
                A tagline deve comunicar o valor em no máximo 10 palavras. Evite jargões técnicos.
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-[var(--gray)] text-sm mb-4">
              Liste os 3 principais problemas que seu produto resolve.
            </p>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Problema 1 (mais importante)</label>
              <textarea
                value={dados.problema1}
                onChange={(e) => handleChange('problema1', e.target.value)}
                placeholder="Ex: Empresários perdem vendas por falta de controle de estoque"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-20"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Problema 2</label>
              <textarea
                value={dados.problema2}
                onChange={(e) => handleChange('problema2', e.target.value)}
                placeholder="Ex: Gastam horas em planilhas e controles manuais"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-20"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Problema 3</label>
              <textarea
                value={dados.problema3}
                onChange={(e) => handleChange('problema3', e.target.value)}
                placeholder="Ex: Não conseguem emitir notas fiscais facilmente"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-20"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Descrição da Solução</label>
              <textarea
                value={dados.solucao}
                onChange={(e) => handleChange('solucao', e.target.value)}
                placeholder="Ex: Sistema de gestão completo que unifica vendas, estoque, financeiro e fiscal em uma única plataforma simples de usar."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-24"
              />
            </div>
            <p className="text-[var(--gray)] text-sm">Seus 3 principais diferenciais:</p>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Diferencial 1</label>
              <input
                type="text"
                value={dados.diferencial1}
                onChange={(e) => handleChange('diferencial1', e.target.value)}
                placeholder="Ex: Implementação em 1 dia"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Diferencial 2</label>
              <input
                type="text"
                value={dados.diferencial2}
                onChange={(e) => handleChange('diferencial2', e.target.value)}
                placeholder="Ex: Suporte humano 24/7"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Diferencial 3</label>
              <input
                type="text"
                value={dados.diferencial3}
                onChange={(e) => handleChange('diferencial3', e.target.value)}
                placeholder="Ex: Preço fixo sem surpresas"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-[var(--gold)]/10 rounded-xl p-4 border border-[var(--gold)]/20 mb-4">
              <p className="text-[var(--gold)] font-medium text-sm mb-2">TAM / SAM / SOM</p>
              <p className="text-[var(--gray)] text-sm">
                <strong>TAM:</strong> Mercado total (se você tivesse 100%)<br/>
                <strong>SAM:</strong> Mercado que você pode alcançar<br/>
                <strong>SOM:</strong> Mercado realista nos próximos 3-5 anos
              </p>
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">TAM (Total Addressable Market)</label>
              <input
                type="text"
                value={dados.tam}
                onChange={(e) => handleChange('tam', e.target.value)}
                placeholder="Ex: R$ 50 bilhões (mercado de gestão empresarial no Brasil)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">SAM (Serviceable Available Market)</label>
              <input
                type="text"
                value={dados.sam}
                onChange={(e) => handleChange('sam', e.target.value)}
                placeholder="Ex: R$ 5 bilhões (pequenos negócios com 1-50 funcionários)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">SOM (Serviceable Obtainable Market)</label>
              <input
                type="text"
                value={dados.som}
                onChange={(e) => handleChange('som', e.target.value)}
                placeholder="Ex: R$ 200 milhões (comércio varejista na região Sul)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Modelo de Receita</label>
              <select
                value={dados.modeloReceita}
                onChange={(e) => handleChange('modeloReceita', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="SaaS (Assinatura Mensal)">SaaS (Assinatura Mensal)</option>
                <option value="SaaS (Assinatura Anual)">SaaS (Assinatura Anual)</option>
                <option value="Marketplace (Taxa por transação)">Marketplace (Taxa por transação)</option>
                <option value="Freemium + Premium">Freemium + Premium</option>
                <option value="Licença + Manutenção">Licença + Manutenção</option>
                <option value="Usage-based (Por uso)">Usage-based (Por uso)</option>
              </select>
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Ticket Médio</label>
              <input
                type="text"
                value={dados.ticketMedio}
                onChange={(e) => handleChange('ticketMedio', e.target.value)}
                placeholder="Ex: R$ 297/mês"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Margem Bruta</label>
              <input
                type="text"
                value={dados.margemBruta}
                onChange={(e) => handleChange('margemBruta', e.target.value)}
                placeholder="Ex: 85%"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <p className="text-[var(--gray)] text-sm mb-4">
              Mostre números que comprovam que o negócio funciona.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">MRR Atual</label>
                <input
                  type="text"
                  value={dados.mrr}
                  onChange={(e) => handleChange('mrr', e.target.value)}
                  placeholder="Ex: R$ 45.000"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">Clientes Ativos</label>
                <input
                  type="text"
                  value={dados.clientes}
                  onChange={(e) => handleChange('clientes', e.target.value)}
                  placeholder="Ex: 150"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">Crescimento MoM</label>
                <input
                  type="text"
                  value={dados.crescimento}
                  onChange={(e) => handleChange('crescimento', e.target.value)}
                  placeholder="Ex: 15%"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[var(--gray)] text-sm mb-2">NPS</label>
                <input
                  type="text"
                  value={dados.nps}
                  onChange={(e) => handleChange('nps', e.target.value)}
                  placeholder="Ex: 72"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-4">
            <p className="text-[var(--gray)] text-sm mb-4">
              Reconheça a competição e mostre por que você é diferente.
            </p>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Competidor Principal 1</label>
              <input
                type="text"
                value={dados.competidor1}
                onChange={(e) => handleChange('competidor1', e.target.value)}
                placeholder="Ex: Bling - foco em e-commerce, complexo para iniciantes"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Competidor Principal 2</label>
              <input
                type="text"
                value={dados.competidor2}
                onChange={(e) => handleChange('competidor2', e.target.value)}
                placeholder="Ex: ContaAzul - caro para pequenos negócios"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Sua Vantagem Competitiva</label>
              <textarea
                value={dados.vantagem}
                onChange={(e) => handleChange('vantagem', e.target.value)}
                placeholder="Ex: Único sistema com implementação em 1 dia e preço fixo, focado em simplicidade para quem nunca usou sistema."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-24"
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <p className="text-[var(--gray)] text-sm mb-4">
              Investidores investem em pessoas. Mostre quem está por trás.
            </p>
            <div className="space-y-4">
              <h3 className="text-white font-medium">Fundador 1</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={dados.fundador1Nome}
                  onChange={(e) => handleChange('fundador1Nome', e.target.value)}
                  placeholder="Nome"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
                <input
                  type="text"
                  value={dados.fundador1Cargo}
                  onChange={(e) => handleChange('fundador1Cargo', e.target.value)}
                  placeholder="Cargo (ex: CEO)"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <textarea
                value={dados.fundador1Bio}
                onChange={(e) => handleChange('fundador1Bio', e.target.value)}
                placeholder="Bio curta (experiência relevante, conquistas)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-20"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-medium">Fundador 2 (opcional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={dados.fundador2Nome}
                  onChange={(e) => handleChange('fundador2Nome', e.target.value)}
                  placeholder="Nome"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
                <input
                  type="text"
                  value={dados.fundador2Cargo}
                  onChange={(e) => handleChange('fundador2Cargo', e.target.value)}
                  placeholder="Cargo (ex: CTO)"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <textarea
                value={dados.fundador2Bio}
                onChange={(e) => handleChange('fundador2Bio', e.target.value)}
                placeholder="Bio curta"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-20"
              />
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-4">
            <p className="text-[var(--gray)] text-sm mb-4">
              Mostre onde você quer chegar e como vai usar o investimento.
            </p>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Meta 3 meses</label>
              <input
                type="text"
                value={dados.meta3meses}
                onChange={(e) => handleChange('meta3meses', e.target.value)}
                placeholder="Ex: Atingir R$ 80k MRR, 250 clientes"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Meta 6 meses</label>
              <input
                type="text"
                value={dados.meta6meses}
                onChange={(e) => handleChange('meta6meses', e.target.value)}
                placeholder="Ex: Atingir R$ 150k MRR, expandir para 3 estados"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Meta 12 meses</label>
              <input
                type="text"
                value={dados.meta12meses}
                onChange={(e) => handleChange('meta12meses', e.target.value)}
                placeholder="Ex: R$ 300k MRR, break-even, 1000 clientes"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
        )

      case 10:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Valor da Rodada</label>
              <input
                type="text"
                value={dados.valorRodada}
                onChange={(e) => handleChange('valorRodada', e.target.value)}
                placeholder="Ex: R$ 500.000"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <p className="text-[var(--gray)] text-sm">Como o dinheiro será usado:</p>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Uso 1 (maior parte)</label>
              <input
                type="text"
                value={dados.uso1}
                onChange={(e) => handleChange('uso1', e.target.value)}
                placeholder="Ex: 50% - Contratação time comercial (5 vendedores)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Uso 2</label>
              <input
                type="text"
                value={dados.uso2}
                onChange={(e) => handleChange('uso2', e.target.value)}
                placeholder="Ex: 30% - Marketing e aquisição de clientes"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--gray)] text-sm mb-2">Uso 3</label>
              <input
                type="text"
                value={dados.uso3}
                onChange={(e) => handleChange('uso3', e.target.value)}
                placeholder="Ex: 20% - Desenvolvimento de novas features"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderPreview = () => {
    const slideData = slides.find(s => s.id === slideAtual)
    const Icon = slideData?.icon || Presentation

    return (
      <div className="bg-gradient-to-br from-black to-zinc-900 rounded-2xl p-8 border border-white/10 min-h-[400px] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[var(--gold)]" />
          </div>
          <span className="text-[var(--gold)] font-medium">{slideData?.nome}</span>
        </div>

        <div className="flex-1">
          {slideAtual === 1 && (
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                {dados.nomeEmpresa || '[Nome da Empresa]'}
              </h1>
              <p className="text-xl text-[var(--gray)]">
                {dados.tagline || '[Tagline]'}
              </p>
            </div>
          )}

          {slideAtual === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">O Problema</h2>
              {[dados.problema1, dados.problema2, dados.problema3].map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[var(--gold)] font-bold">{i + 1}.</span>
                  <p className="text-white">{p || `[Problema ${i + 1}]`}</p>
                </div>
              ))}
            </div>
          )}

          {slideAtual === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">A Solução</h2>
              <p className="text-[var(--gray)] mb-6">{dados.solucao || '[Descrição]'}</p>
              <div className="grid grid-cols-3 gap-4">
                {[dados.diferencial1, dados.diferencial2, dados.diferencial3].map((d, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <Zap className="w-6 h-6 text-[var(--gold)] mx-auto mb-2" />
                    <p className="text-white text-sm">{d || `[Diferencial ${i + 1}]`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideAtual === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Oportunidade de Mercado</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-[var(--gray)]">TAM</span>
                  <span className="text-white font-bold">{dados.tam || 'R$ X bi'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-[var(--gray)]">SAM</span>
                  <span className="text-white font-bold">{dados.sam || 'R$ X bi'}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[var(--gray)]">SOM</span>
                  <span className="text-[var(--gold)] font-bold">{dados.som || 'R$ X mi'}</span>
                </div>
              </div>
            </div>
          )}

          {slideAtual === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Modelo de Negócio</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Modelo</p>
                  <p className="text-white font-bold">{dados.modeloReceita || 'SaaS'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Ticket</p>
                  <p className="text-white font-bold">{dados.ticketMedio || 'R$ X'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-[var(--gray)] text-sm mb-1">Margem</p>
                  <p className="text-[var(--gold)] font-bold">{dados.margemBruta || 'X%'}</p>
                </div>
              </div>
            </div>
          )}

          {slideAtual === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Tração</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[var(--gray)] text-sm">MRR</p>
                  <p className="text-2xl font-bold text-green-400">{dados.mrr || 'R$ 0'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[var(--gray)] text-sm">Clientes</p>
                  <p className="text-2xl font-bold text-white">{dados.clientes || '0'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[var(--gray)] text-sm">Crescimento</p>
                  <p className="text-2xl font-bold text-[var(--gold)]">{dados.crescimento || '0%'}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[var(--gray)] text-sm">NPS</p>
                  <p className="text-2xl font-bold text-purple-400">{dados.nps || '0'}</p>
                </div>
              </div>
            </div>
          )}

          {slideAtual === 7 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Competição</h2>
              <div className="space-y-3 mb-6">
                <p className="text-[var(--gray)]">• {dados.competidor1 || '[Competidor 1]'}</p>
                <p className="text-[var(--gray)]">• {dados.competidor2 || '[Competidor 2]'}</p>
              </div>
              <div className="bg-[var(--gold)]/10 rounded-xl p-4 border border-[var(--gold)]/20">
                <p className="text-[var(--gold)] font-medium mb-2">Nossa Vantagem</p>
                <p className="text-white">{dados.vantagem || '[Vantagem]'}</p>
              </div>
            </div>
          )}

          {slideAtual === 8 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Equipe</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-[var(--gold)]" />
                  </div>
                  <p className="text-white font-bold text-center">{dados.fundador1Nome || '[Nome]'}</p>
                  <p className="text-[var(--gold)] text-sm text-center">{dados.fundador1Cargo || '[Cargo]'}</p>
                  <p className="text-[var(--gray)] text-sm text-center mt-2">{dados.fundador1Bio || '[Bio]'}</p>
                </div>
                {dados.fundador2Nome && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-[var(--gold)]" />
                    </div>
                    <p className="text-white font-bold text-center">{dados.fundador2Nome}</p>
                    <p className="text-[var(--gold)] text-sm text-center">{dados.fundador2Cargo}</p>
                    <p className="text-[var(--gray)] text-sm text-center mt-2">{dados.fundador2Bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {slideAtual === 9 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Roadmap</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 text-[var(--gold)] font-bold">3 meses</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3">
                    <p className="text-white">{dados.meta3meses || '[Meta]'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-[var(--gold)] font-bold">6 meses</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3">
                    <p className="text-white">{dados.meta6meses || '[Meta]'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 text-[var(--gold)] font-bold">12 meses</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3">
                    <p className="text-white">{dados.meta12meses || '[Meta]'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {slideAtual === 10 && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-white mb-2">O Ask</h2>
              <p className="text-4xl font-bold text-[var(--gold)] mb-6">{dados.valorRodada || 'R$ X'}</p>
              <div className="text-left space-y-2">
                <p className="text-white">• {dados.uso1 || '[Uso 1]'}</p>
                <p className="text-white">• {dados.uso2 || '[Uso 2]'}</p>
                <p className="text-white">• {dados.uso3 || '[Uso 3]'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/membro')}
              className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
            </button>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl gold-text">Gerador de Pitch Deck</h1>
              <p className="text-[var(--gray)] text-sm">Crie sua apresentação para investidores</p>
            </div>
          </div>

          <button
            onClick={copiarTexto}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              copiado
                ? 'bg-green-500/20 text-green-400'
                : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
            }`}
          >
            {copiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span className="hidden sm:inline">{copiado ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>
        </header>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
          {slides.map((slide) => {
            const Icon = slide.icon
            return (
              <button
                key={slide.id}
                onClick={() => setSlideAtual(slide.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  slideAtual === slide.id
                    ? 'bg-[var(--gold)]/20 text-[var(--gold)]'
                    : 'text-[var(--gray)] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{slide.nome}</span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">
                Slide {slideAtual}: {slides.find(s => s.id === slideAtual)?.nome}
              </h2>
              <span className="text-[var(--gray)] text-sm">{slideAtual}/10</span>
            </div>

            {renderFormulario()}

            <div className="flex justify-between mt-6 pt-6 border-t border-white/10">
              <button
                onClick={slideAnterior}
                disabled={slideAtual === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  slideAtual === 1
                    ? 'text-[var(--gray)]/50 cursor-not-allowed'
                    : 'text-[var(--gray)] hover:text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>
              <button
                onClick={proximoSlide}
                disabled={slideAtual === 10}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  slideAtual === 10
                    ? 'text-[var(--gray)]/50 cursor-not-allowed'
                    : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
                }`}
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Preview do Slide</h2>
            </div>
            {renderPreview()}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Gerador de Pitch Deck - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
