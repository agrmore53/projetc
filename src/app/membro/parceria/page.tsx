'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Handshake, Copy, Check, Building2, Target, Gift } from 'lucide-react'

export default function ParceriaPage() {
  const [copied, setCopied] = useState(false)

  const [proposta, setProposta] = useState({
    suaEmpresa: '',
    parceiro: '',
    contatoParceiro: '',
    tipoParceria: 'integracao',
    objetivo: '',
    beneficiosParceiro: '',
    beneficiosSeus: '',
    modelo: 'revenue_share',
    percentualShare: 20,
    prazoInicial: 12,
    exclusividade: false,
    proximosPassos: ''
  })

  const tiposParceria = [
    { value: 'integracao', label: 'Integracao de Produto' },
    { value: 'comarketing', label: 'Co-Marketing' },
    { value: 'revenda', label: 'Revenda/Distribuicao' },
    { value: 'white_label', label: 'White Label' },
    { value: 'afiliado', label: 'Programa de Afiliados' },
    { value: 'tecnologia', label: 'Parceria Tecnologica' },
  ]

  const modelosComerciais = [
    { value: 'revenue_share', label: 'Revenue Share (% da receita)' },
    { value: 'fee_fixo', label: 'Fee Fixo Mensal' },
    { value: 'por_lead', label: 'Custo por Lead' },
    { value: 'hibrido', label: 'Hibrido (Fixo + Variavel)' },
    { value: 'sem_custo', label: 'Sem Custo (Beneficio Mutuo)' },
  ]

  const gerarProposta = () => {
    const empresa = proposta.suaEmpresa || '[SUA EMPRESA]'
    const parceiro = proposta.parceiro || '[EMPRESA PARCEIRA]'
    const tipoParceriaLabel = tiposParceria.find(t => t.value === proposta.tipoParceria)?.label || ''
    const modeloLabel = modelosComerciais.find(m => m.value === proposta.modelo)?.label || ''

    return `
═══════════════════════════════════════════════════════════════
              PROPOSTA DE PARCERIA ESTRATEGICA
═══════════════════════════════════════════════════════════════

De: ${empresa}
Para: ${parceiro}
${proposta.contatoParceiro ? `A/C: ${proposta.contatoParceiro}` : ''}
Data: ${new Date().toLocaleDateString('pt-BR')}

─────────────────────────────────────────────────────────────
1. INTRODUCAO
─────────────────────────────────────────────────────────────

Prezado(a),

E com entusiasmo que apresentamos esta proposta de parceria estrategica entre ${empresa} e ${parceiro}.

Acreditamos que a combinacao de nossas solucoes pode criar valor significativo para ambas as partes e, principalmente, para nossos clientes em comum.

─────────────────────────────────────────────────────────────
2. TIPO DE PARCERIA
─────────────────────────────────────────────────────────────

Tipo: ${tipoParceriaLabel}

${proposta.objetivo || '[Descrever o objetivo principal da parceria e como ela funcionaria na pratica]'}

─────────────────────────────────────────────────────────────
3. BENEFICIOS PARA ${parceiro.toUpperCase()}
─────────────────────────────────────────────────────────────

${proposta.beneficiosParceiro || `• Acesso a nova base de clientes
• Complemento ao portfolio de solucoes
• Receita adicional atraves de ${modeloLabel.toLowerCase()}
• Fortalecimento da proposta de valor para clientes`}

─────────────────────────────────────────────────────────────
4. BENEFICIOS PARA ${empresa.toUpperCase()}
─────────────────────────────────────────────────────────────

${proposta.beneficiosSeus || `• Acesso ao mercado e base de clientes de ${parceiro}
• Integracao com ecossistema estabelecido
• Co-marketing e visibilidade
• Aceleracao do crescimento`}

─────────────────────────────────────────────────────────────
5. MODELO COMERCIAL
─────────────────────────────────────────────────────────────

Modelo: ${modeloLabel}
${proposta.modelo === 'revenue_share' ? `Percentual: ${proposta.percentualShare}% da receita gerada` : ''}
Prazo Inicial: ${proposta.prazoInicial} meses
Exclusividade: ${proposta.exclusividade ? 'Sim' : 'Nao'}

Detalhamento:
${proposta.modelo === 'revenue_share' ? `• ${parceiro} recebe ${proposta.percentualShare}% do MRR de clientes indicados
• Pagamento mensal, enquanto cliente permanecer ativo
• Reports mensais de performance` : ''}
${proposta.modelo === 'fee_fixo' ? `• Fee mensal fixo a ser negociado
• Revisao trimestral baseada em resultados
• Pagamento via transferencia bancaria` : ''}
${proposta.modelo === 'por_lead' ? `• Valor por lead qualificado a ser negociado
• Definicao clara de criterios de qualificacao
• Pagamento mensal` : ''}

─────────────────────────────────────────────────────────────
6. PROXIMOS PASSOS
─────────────────────────────────────────────────────────────

${proposta.proximosPassos || `1. Reuniao de alinhamento para discutir a proposta
2. Definicao de detalhes tecnicos/operacionais
3. Elaboracao do contrato de parceria
4. Kick-off e lancamento da parceria`}

─────────────────────────────────────────────────────────────
7. CONTATO
─────────────────────────────────────────────────────────────

Estamos a disposicao para agendar uma conversa e discutir
os detalhes desta proposta.

Atenciosamente,

${empresa}

═══════════════════════════════════════════════════════════════
Proposta valida por 30 dias
`
  }

  const copiarProposta = () => {
    navigator.clipboard.writeText(gerarProposta())
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
            <Handshake className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Proposta de <span className="gold-text">Parceria</span>
          </h1>
          <p className="text-[var(--gray)]">Crie propostas profissionais para parcerias estrategicas</p>
        </div>

        {/* Empresas */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--gold)]" />
            Empresas Envolvidas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Sua Empresa</label>
              <input
                type="text"
                value={proposta.suaEmpresa}
                onChange={(e) => setProposta({ ...proposta, suaEmpresa: e.target.value })}
                placeholder="Nome da sua empresa"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Empresa Parceira</label>
              <input
                type="text"
                value={proposta.parceiro}
                onChange={(e) => setProposta({ ...proposta, parceiro: e.target.value })}
                placeholder="Nome da empresa parceira"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Contato no Parceiro (opcional)</label>
              <input
                type="text"
                value={proposta.contatoParceiro}
                onChange={(e) => setProposta({ ...proposta, contatoParceiro: e.target.value })}
                placeholder="Nome do contato"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Tipo de Parceria */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--gold)]" />
            Tipo e Objetivo
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Tipo de Parceria</label>
              <select
                value={proposta.tipoParceria}
                onChange={(e) => setProposta({ ...proposta, tipoParceria: e.target.value })}
                className="input-field"
              >
                {tiposParceria.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Modelo Comercial</label>
              <select
                value={proposta.modelo}
                onChange={(e) => setProposta({ ...proposta, modelo: e.target.value })}
                className="input-field"
              >
                {modelosComerciais.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="input-label">Objetivo da Parceria</label>
            <textarea
              value={proposta.objetivo}
              onChange={(e) => setProposta({ ...proposta, objetivo: e.target.value })}
              placeholder="Descreva o objetivo principal e como a parceria funcionaria..."
              className="input-field min-h-[100px]"
            />
          </div>
        </div>

        {/* Beneficios */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-[var(--gold)]" />
            Beneficios
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Beneficios para o Parceiro</label>
              <textarea
                value={proposta.beneficiosParceiro}
                onChange={(e) => setProposta({ ...proposta, beneficiosParceiro: e.target.value })}
                placeholder="• Beneficio 1&#10;• Beneficio 2&#10;• Beneficio 3"
                className="input-field min-h-[120px]"
              />
            </div>
            <div>
              <label className="input-label">Beneficios para Voce</label>
              <textarea
                value={proposta.beneficiosSeus}
                onChange={(e) => setProposta({ ...proposta, beneficiosSeus: e.target.value })}
                placeholder="• Beneficio 1&#10;• Beneficio 2&#10;• Beneficio 3"
                className="input-field min-h-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Termos */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Termos Comerciais</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {proposta.modelo === 'revenue_share' && (
              <div>
                <label className="input-label">Revenue Share (%)</label>
                <input
                  type="number"
                  value={proposta.percentualShare}
                  onChange={(e) => setProposta({ ...proposta, percentualShare: Number(e.target.value) })}
                  className="input-field"
                  min="5"
                  max="50"
                />
              </div>
            )}
            <div>
              <label className="input-label">Prazo Inicial (meses)</label>
              <input
                type="number"
                value={proposta.prazoInicial}
                onChange={(e) => setProposta({ ...proposta, prazoInicial: Number(e.target.value) })}
                className="input-field"
                min="3"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={proposta.exclusividade}
                  onChange={(e) => setProposta({ ...proposta, exclusividade: e.target.checked })}
                  className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
                />
                <span>Exclusividade</span>
              </label>
            </div>
          </div>
        </div>

        {/* Proximos Passos */}
        <div className="glass card mb-8">
          <label className="input-label">Proximos Passos</label>
          <textarea
            value={proposta.proximosPassos}
            onChange={(e) => setProposta({ ...proposta, proximosPassos: e.target.value })}
            placeholder="1. Reuniao de alinhamento&#10;2. Definicao de detalhes&#10;3. Contrato&#10;4. Lancamento"
            className="input-field min-h-[100px]"
          />
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <div className="bg-black/30 rounded-xl p-6 max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarProposta()}
            </pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarProposta} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Proposta'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Parcerias de Sucesso</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Antes de Propor</h4>
              <ul className="space-y-1">
                <li>• Pesquise bem a empresa parceira</li>
                <li>• Identifique o decisor certo</li>
                <li>• Prepare cases de sucesso</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Na Proposta</h4>
              <ul className="space-y-1">
                <li>• Foque nos beneficios para o parceiro</li>
                <li>• Seja especifico nos termos</li>
                <li>• Proponha um piloto inicial</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
