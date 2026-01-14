'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Briefcase, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Vaga {
  titulo: string
  departamento: string
  tipo: string
  local: string
  descricao: string
  responsabilidades: string[]
  requisitos: string[]
  diferenciais: string[]
  beneficios: string[]
  faixaSalarial: string
  sobreEmpresa: string
}

export default function JobDescriptionPage() {
  const [copied, setCopied] = useState(false)

  const [vaga, setVaga] = useState<Vaga>({
    titulo: '',
    departamento: '',
    tipo: 'CLT',
    local: 'Remoto',
    descricao: '',
    responsabilidades: [''],
    requisitos: [''],
    diferenciais: [''],
    beneficios: [''],
    faixaSalarial: '',
    sobreEmpresa: ''
  })

  const templates = {
    sdr: {
      titulo: 'SDR (Sales Development Representative)',
      departamento: 'Vendas',
      tipo: 'CLT',
      local: 'Remoto',
      descricao: 'Buscamos um SDR para prospectar e qualificar leads, sendo o primeiro ponto de contato com potenciais clientes.',
      responsabilidades: [
        'Prospectar ativamente novos leads via LinkedIn, email e telefone',
        'Qualificar leads usando metodologia BANT/MEDDIC',
        'Agendar reunioes para o time de Account Executives',
        'Manter o CRM atualizado com todas as interacoes',
        'Atingir metas mensais de leads qualificados e reunioes agendadas'
      ],
      requisitos: [
        'Experiencia previa com vendas ou atendimento ao cliente',
        'Excelente comunicacao verbal e escrita',
        'Resiliencia e persistencia',
        'Familiaridade com ferramentas de CRM',
        'Ingles intermediario'
      ],
      diferenciais: [
        'Experiencia em vendas B2B SaaS',
        'Conhecimento em ferramentas de automacao de vendas',
        'Certificacoes em vendas (Sandler, SPIN, etc)'
      ],
      beneficios: [''],
      faixaSalarial: 'R$ 3.000 - R$ 5.000 + comissoes',
      sobreEmpresa: ''
    },
    dev: {
      titulo: 'Desenvolvedor Full Stack',
      departamento: 'Tecnologia',
      tipo: 'CLT',
      local: 'Remoto',
      descricao: 'Procuramos um desenvolvedor full stack para construir e evoluir nosso produto SaaS.',
      responsabilidades: [
        'Desenvolver novas funcionalidades end-to-end',
        'Manter e melhorar codigo existente',
        'Participar de code reviews',
        'Colaborar com produto e design na definicao de solucoes',
        'Escrever testes automatizados'
      ],
      requisitos: [
        '3+ anos de experiencia com desenvolvimento web',
        'Dominio de React/Next.js e Node.js',
        'Experiencia com bancos de dados SQL e NoSQL',
        'Conhecimento em APIs REST',
        'Git e metodologias ageis'
      ],
      diferenciais: [
        'Experiencia com TypeScript',
        'Conhecimento em cloud (AWS/GCP)',
        'Experiencia com microservicos',
        'Contribuicoes open source'
      ],
      beneficios: [''],
      faixaSalarial: 'R$ 10.000 - R$ 18.000',
      sobreEmpresa: ''
    },
    cs: {
      titulo: 'Customer Success Manager',
      departamento: 'Customer Success',
      tipo: 'CLT',
      local: 'Remoto',
      descricao: 'Buscamos um CSM para garantir o sucesso dos nossos clientes e maximizar retencao e expansao.',
      responsabilidades: [
        'Gerenciar carteira de clientes estrategicos',
        'Conduzir onboarding e treinamentos',
        'Monitorar health score e atuar proativamente',
        'Identificar oportunidades de upsell e cross-sell',
        'Conduzir QBRs (Quarterly Business Reviews)'
      ],
      requisitos: [
        '2+ anos em Customer Success ou areas relacionadas',
        'Experiencia com SaaS B2B',
        'Habilidade de comunicacao e relacionamento',
        'Orientacao a dados e metricas',
        'Ingles avancado'
      ],
      diferenciais: [
        'Experiencia com ferramentas de CS (Gainsight, Totango)',
        'Background tecnico',
        'Experiencia em startups'
      ],
      beneficios: [''],
      faixaSalarial: 'R$ 6.000 - R$ 12.000',
      sobreEmpresa: ''
    }
  }

  const aplicarTemplate = (tipo: keyof typeof templates) => {
    setVaga({ ...vaga, ...templates[tipo] })
  }

  const atualizarLista = (campo: keyof Vaga, index: number, valor: string) => {
    const lista = [...(vaga[campo] as string[])]
    lista[index] = valor
    setVaga({ ...vaga, [campo]: lista })
  }

  const adicionarItem = (campo: keyof Vaga) => {
    setVaga({ ...vaga, [campo]: [...(vaga[campo] as string[]), ''] })
  }

  const removerItem = (campo: keyof Vaga, index: number) => {
    const lista = (vaga[campo] as string[]).filter((_, i) => i !== index)
    setVaga({ ...vaga, [campo]: lista })
  }

  const copiarVaga = () => {
    const texto = `
${vaga.titulo.toUpperCase()}
${'═'.repeat(60)}

📍 ${vaga.local} | 💼 ${vaga.tipo} | 🏢 ${vaga.departamento}
${vaga.faixaSalarial ? `💰 ${vaga.faixaSalarial}` : ''}

SOBRE A VAGA
${'-'.repeat(40)}
${vaga.descricao}

RESPONSABILIDADES
${'-'.repeat(40)}
${vaga.responsabilidades.filter(r => r).map(r => `• ${r}`).join('\n')}

REQUISITOS
${'-'.repeat(40)}
${vaga.requisitos.filter(r => r).map(r => `• ${r}`).join('\n')}

${vaga.diferenciais.filter(d => d).length > 0 ? `DIFERENCIAIS
${'-'.repeat(40)}
${vaga.diferenciais.filter(d => d).map(d => `• ${d}`).join('\n')}` : ''}

${vaga.beneficios.filter(b => b).length > 0 ? `BENEFICIOS
${'-'.repeat(40)}
${vaga.beneficios.filter(b => b).map(b => `• ${b}`).join('\n')}` : ''}

${vaga.sobreEmpresa ? `SOBRE A EMPRESA
${'-'.repeat(40)}
${vaga.sobreEmpresa}` : ''}

${'═'.repeat(60)}
Candidate-se enviando seu curriculo para: [EMAIL]
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const ListaEditavel = ({ campo, titulo, placeholder }: { campo: keyof Vaga, titulo: string, placeholder: string }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="input-label mb-0">{titulo}</label>
        <button onClick={() => adicionarItem(campo)} className="text-[var(--gold)] hover:opacity-80">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {(vaga[campo] as string[]).map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => atualizarLista(campo, i, e.target.value)}
              placeholder={placeholder}
              className="input-field text-sm flex-1"
            />
            {(vaga[campo] as string[]).length > 1 && (
              <button onClick={() => removerItem(campo, i)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

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
            <Briefcase className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Job Description</span>
          </h1>
          <p className="text-[var(--gray)]">Crie vagas atrativas para sua startup</p>
        </div>

        {/* Templates */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Templates Prontos</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => aplicarTemplate('sdr')} className="btn-secondary text-sm">
              SDR
            </button>
            <button onClick={() => aplicarTemplate('dev')} className="btn-secondary text-sm">
              Desenvolvedor
            </button>
            <button onClick={() => aplicarTemplate('cs')} className="btn-secondary text-sm">
              Customer Success
            </button>
          </div>
        </div>

        {/* Informacoes Basicas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Informacoes Basicas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Titulo da Vaga</label>
              <input
                type="text"
                value={vaga.titulo}
                onChange={(e) => setVaga({ ...vaga, titulo: e.target.value })}
                placeholder="Ex: SDR, Desenvolvedor Full Stack"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Departamento</label>
              <input
                type="text"
                value={vaga.departamento}
                onChange={(e) => setVaga({ ...vaga, departamento: e.target.value })}
                placeholder="Ex: Vendas, Tecnologia"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Tipo de Contrato</label>
              <select
                value={vaga.tipo}
                onChange={(e) => setVaga({ ...vaga, tipo: e.target.value })}
                className="input-field"
              >
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estagio">Estagio</option>
                <option value="Freelancer">Freelancer</option>
              </select>
            </div>
            <div>
              <label className="input-label">Local</label>
              <select
                value={vaga.local}
                onChange={(e) => setVaga({ ...vaga, local: e.target.value })}
                className="input-field"
              >
                <option value="Remoto">Remoto</option>
                <option value="Hibrido">Hibrido</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Faixa Salarial (opcional)</label>
              <input
                type="text"
                value={vaga.faixaSalarial}
                onChange={(e) => setVaga({ ...vaga, faixaSalarial: e.target.value })}
                placeholder="Ex: R$ 5.000 - R$ 8.000"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Descricao da Vaga</label>
              <textarea
                value={vaga.descricao}
                onChange={(e) => setVaga({ ...vaga, descricao: e.target.value })}
                placeholder="Descreva brevemente a vaga e o que buscam..."
                className="input-field min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Detalhes */}
        <div className="glass card mb-8">
          <ListaEditavel campo="responsabilidades" titulo="Responsabilidades" placeholder="O que a pessoa vai fazer..." />
          <ListaEditavel campo="requisitos" titulo="Requisitos" placeholder="O que e obrigatorio ter..." />
          <ListaEditavel campo="diferenciais" titulo="Diferenciais" placeholder="O que e bonus ter..." />
          <ListaEditavel campo="beneficios" titulo="Beneficios" placeholder="VR, VT, Plano de saude..." />
        </div>

        {/* Sobre a Empresa */}
        <div className="glass card mb-8">
          <label className="input-label">Sobre a Empresa (opcional)</label>
          <textarea
            value={vaga.sobreEmpresa}
            onChange={(e) => setVaga({ ...vaga, sobreEmpresa: e.target.value })}
            placeholder="Conte um pouco sobre a empresa, cultura, missao..."
            className="input-field min-h-[100px]"
          />
        </div>

        {/* Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarVaga} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Vaga Copiada!' : 'Copiar Job Description'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Vagas Atrativas</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Seja Transparente</h4>
              <p>Inclua faixa salarial. Vagas com salario recebem 3x mais candidatos qualificados.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Foque em Resultados</h4>
              <p>Descreva o impacto da funcao, nao apenas tarefas. O que a pessoa vai construir/mudar?</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Requisitos Realistas</h4>
              <p>Nao peca 5 anos de experiencia em tecnologia que tem 2. Seja honesto.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Mostre a Cultura</h4>
              <p>Pessoas nao querem apenas um emprego, querem um lugar onde pertencem.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
