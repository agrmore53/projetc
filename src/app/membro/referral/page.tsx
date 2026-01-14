'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Gift, Copy, Check, Users, DollarSign, Percent, Zap } from 'lucide-react'

interface Incentivo {
  tipo: 'desconto' | 'credito' | 'feature' | 'brinde' | 'cashback'
  valorIndicador: string
  valorIndicado: string
  descricao: string
}

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)

  const [programa, setPrograma] = useState({
    nomePrograma: 'Indique e Ganhe',
    nomeEmpresa: '',
    ticket: 100,
    margemLucro: 30,
    custoPorIndicacao: 20,
    metaMensal: 50,
    taxaConversaoEsperada: 25
  })

  const [incentivo, setIncentivo] = useState<Incentivo>({
    tipo: 'desconto',
    valorIndicador: '20',
    valorIndicado: '10',
    descricao: ''
  })

  const tiposIncentivo = [
    { value: 'desconto', label: 'Desconto (%)', icon: Percent, exemplo: '20% off no proximo mes' },
    { value: 'credito', label: 'Credito (R$)', icon: DollarSign, exemplo: 'R$50 de credito' },
    { value: 'feature', label: 'Feature Premium', icon: Zap, exemplo: '1 mes de plano Pro gratis' },
    { value: 'brinde', label: 'Brinde/Produto', icon: Gift, exemplo: 'Camiseta exclusiva' },
    { value: 'cashback', label: 'Cashback (R$)', icon: DollarSign, exemplo: 'R$30 no PIX' },
  ]

  // Calculos
  const custoIndicador = incentivo.tipo === 'desconto'
    ? (parseFloat(incentivo.valorIndicador) / 100) * programa.ticket
    : incentivo.tipo === 'credito' || incentivo.tipo === 'cashback'
      ? parseFloat(incentivo.valorIndicador) || 0
      : programa.custoPorIndicacao

  const custoIndicado = incentivo.tipo === 'desconto'
    ? (parseFloat(incentivo.valorIndicado) / 100) * programa.ticket
    : incentivo.tipo === 'credito' || incentivo.tipo === 'cashback'
      ? parseFloat(incentivo.valorIndicado) || 0
      : programa.custoPorIndicacao / 2

  const custoPorAquisicao = custoIndicador + custoIndicado
  const lucroMedioCliente = programa.ticket * (programa.margemLucro / 100)
  const roiPrograma = lucroMedioCliente > 0 ? ((lucroMedioCliente - custoPorAquisicao) / custoPorAquisicao) * 100 : 0
  const indicacoesNecessarias = programa.taxaConversaoEsperada > 0 ? Math.ceil(programa.metaMensal / (programa.taxaConversaoEsperada / 100)) : 0
  const investimentoMensal = indicacoesNecessarias * custoPorAquisicao * (programa.taxaConversaoEsperada / 100)
  const receitaGerada = programa.metaMensal * programa.ticket

  const gerarDocumentacao = () => {
    const empresa = programa.nomeEmpresa || '[SUA EMPRESA]'
    const tipoInfo = tiposIncentivo.find(t => t.value === incentivo.tipo)

    return `
═══════════════════════════════════════════════════════════════
            PROGRAMA DE INDICACAO: ${programa.nomePrograma}
                    ${empresa}
═══════════════════════════════════════════════════════════════

VISAO GERAL
─────────────────────────────────────────────────────────────
${incentivo.descricao || `Indique amigos para ${empresa} e ganhe recompensas incriveis!`}

COMO FUNCIONA
─────────────────────────────────────────────────────────────
1. Voce compartilha seu link unico de indicacao
2. Seu amigo se cadastra usando o link
3. Quando ele contratar, voces dois ganham!

RECOMPENSAS
─────────────────────────────────────────────────────────────
QUEM INDICA recebe: ${tipoInfo?.label} - ${incentivo.valorIndicador}${incentivo.tipo === 'desconto' ? '%' : incentivo.tipo === 'credito' || incentivo.tipo === 'cashback' ? ' reais' : ''}
QUEM E INDICADO recebe: ${tipoInfo?.label} - ${incentivo.valorIndicado}${incentivo.tipo === 'desconto' ? '%' : incentivo.tipo === 'credito' || incentivo.tipo === 'cashback' ? ' reais' : ''}

REGRAS
─────────────────────────────────────────────────────────────
• O indicado deve ser um novo cliente (nunca teve conta)
• A recompensa e liberada apos confirmacao do pagamento
• Sem limite de indicacoes - quanto mais, melhor!
• O link de indicacao e pessoal e intransferivel
• Promocao valida por tempo indeterminado

═══════════════════════════════════════════════════════════════

METRICAS DO PROGRAMA (INTERNO)
─────────────────────────────────────────────────────────────
Ticket Medio: R$ ${programa.ticket}
Custo por Aquisicao (CAC): R$ ${custoPorAquisicao.toFixed(2)}
ROI Esperado: ${roiPrograma.toFixed(0)}%

Meta Mensal: ${programa.metaMensal} novos clientes
Indicacoes Necessarias: ${indicacoesNecessarias} (com ${programa.taxaConversaoEsperada}% conversao)
Investimento Mensal: R$ ${investimentoMensal.toFixed(2)}
Receita Esperada: R$ ${receitaGerada.toFixed(2)}

═══════════════════════════════════════════════════════════════

COPY PARA DIVULGACAO
─────────────────────────────────────────────────────────────

EMAIL:
Assunto: Indique um amigo e ganhe ${incentivo.valorIndicador}${incentivo.tipo === 'desconto' ? '% de desconto' : ' reais'}!

Ola!

Voce sabia que pode ganhar ${incentivo.tipo === 'desconto' ? `${incentivo.valorIndicador}% de desconto` : `R$${incentivo.valorIndicador}`} indicando ${empresa} para seus amigos?

E o melhor: seu amigo tambem ganha ${incentivo.tipo === 'desconto' ? `${incentivo.valorIndicado}% de desconto` : `R$${incentivo.valorIndicado}`} na primeira compra!

Acesse sua area de cliente e pegue seu link exclusivo.

Abracos,
Equipe ${empresa}

─────────────────────────────────────────────────────────────

WHATSAPP:
Ei! Estou usando ${empresa} e estou adorando. Se voce se cadastrar pelo meu link, voce ganha ${incentivo.tipo === 'desconto' ? `${incentivo.valorIndicado}% de desconto` : `R$${incentivo.valorIndicado}`} e eu ganho ${incentivo.tipo === 'desconto' ? `${incentivo.valorIndicador}%` : `R$${incentivo.valorIndicador}`}. Ganha-ganha! Link: [seu_link]

─────────────────────────────────────────────────────────────

REDES SOCIAIS:
Descobri ${empresa} e ja estou indicando pra todo mundo! Use meu link e ganhe ${incentivo.tipo === 'desconto' ? `${incentivo.valorIndicado}% OFF` : `R$${incentivo.valorIndicado} de bonus`} na primeira compra. Link na bio!

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarDocumentacao = () => {
    navigator.clipboard.writeText(gerarDocumentacao())
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
            <Gift className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Programa de <span className="gold-text">Referral</span>
          </h1>
          <p className="text-[var(--gray)]">Construa seu programa de indicacao</p>
        </div>

        {/* Config Basica */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configuracao do Programa</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Programa</label>
              <input
                type="text"
                value={programa.nomePrograma}
                onChange={(e) => setPrograma({ ...programa, nomePrograma: e.target.value })}
                placeholder="Indique e Ganhe"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Nome da Empresa</label>
              <input
                type="text"
                value={programa.nomeEmpresa}
                onChange={(e) => setPrograma({ ...programa, nomeEmpresa: e.target.value })}
                placeholder="SuaStartup"
                className="input-field"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="input-label">Descricao do Programa</label>
            <textarea
              value={incentivo.descricao}
              onChange={(e) => setIncentivo({ ...incentivo, descricao: e.target.value })}
              placeholder="Ex: Indique amigos e ganhe recompensas incriveis! Quanto mais indicar, mais voce ganha."
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        {/* Tipo de Incentivo */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Tipo de Recompensa</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {tiposIncentivo.map(tipo => {
              const Icon = tipo.icon
              const selecionado = incentivo.tipo === tipo.value
              return (
                <button
                  key={tipo.value}
                  onClick={() => setIncentivo({ ...incentivo, tipo: tipo.value as Incentivo['tipo'] })}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selecionado
                      ? 'bg-[var(--gold)]/20 border-2 border-[var(--gold)]'
                      : 'bg-black/30 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${selecionado ? 'text-[var(--gold)]' : ''}`} />
                  <span className="text-xs">{tipo.label}</span>
                </button>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label flex items-center gap-2">
                <Users className="w-4 h-4" />
                Quem Indica Recebe
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={incentivo.valorIndicador}
                  onChange={(e) => setIncentivo({ ...incentivo, valorIndicador: e.target.value })}
                  className="input-field"
                  placeholder="20"
                />
                <span className="flex items-center text-[var(--gray)]">
                  {incentivo.tipo === 'desconto' ? '%' : incentivo.tipo === 'feature' || incentivo.tipo === 'brinde' ? '' : 'R$'}
                </span>
              </div>
            </div>
            <div>
              <label className="input-label flex items-center gap-2">
                <Users className="w-4 h-4" />
                Quem e Indicado Recebe
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={incentivo.valorIndicado}
                  onChange={(e) => setIncentivo({ ...incentivo, valorIndicado: e.target.value })}
                  className="input-field"
                  placeholder="10"
                />
                <span className="flex items-center text-[var(--gray)]">
                  {incentivo.tipo === 'desconto' ? '%' : incentivo.tipo === 'feature' || incentivo.tipo === 'brinde' ? '' : 'R$'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metricas do Negocio */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Metricas do Negocio</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Ticket Medio (R$)</label>
              <input
                type="number"
                value={programa.ticket}
                onChange={(e) => setPrograma({ ...programa, ticket: Number(e.target.value) })}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="input-label">Margem de Lucro (%)</label>
              <input
                type="number"
                value={programa.margemLucro}
                onChange={(e) => setPrograma({ ...programa, margemLucro: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="input-label">Meta Mensal (novos clientes)</label>
              <input
                type="number"
                value={programa.metaMensal}
                onChange={(e) => setPrograma({ ...programa, metaMensal: Number(e.target.value) })}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <label className="input-label">Taxa de Conversao Esperada (%)</label>
              <input
                type="number"
                value={programa.taxaConversaoEsperada}
                onChange={(e) => setPrograma({ ...programa, taxaConversaoEsperada: Number(e.target.value) })}
                className="input-field"
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">CAC do Referral</p>
            <p className="font-display text-2xl text-[var(--gold)]">R$ {custoPorAquisicao.toFixed(0)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">ROI do Programa</p>
            <p className={`font-display text-2xl ${roiPrograma > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {roiPrograma.toFixed(0)}%
            </p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Investimento/Mes</p>
            <p className="font-display text-2xl text-[var(--gold)]">R$ {investimentoMensal.toFixed(0)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Receita Esperada</p>
            <p className="font-display text-2xl text-green-400">R$ {receitaGerada.toFixed(0)}</p>
          </div>
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview do Programa</h2>

          <div className="bg-black/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <Gift className="w-12 h-12 text-[var(--gold)] mx-auto mb-3" />
              <h3 className="font-display text-2xl text-[var(--gold)]">{programa.nomePrograma}</h3>
              <p className="text-[var(--gray)]">{incentivo.descricao || 'Indique amigos e ganhe recompensas!'}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--gold)]/10 rounded-xl p-4 text-center border border-[var(--gold)]/30">
                <p className="text-sm text-[var(--gray)] mb-1">Voce ganha</p>
                <p className="font-display text-3xl text-[var(--gold)]">
                  {incentivo.tipo === 'desconto' ? `${incentivo.valorIndicador}%` : `R$${incentivo.valorIndicador}`}
                </p>
                <p className="text-xs text-[var(--gray)]">por cada indicacao</p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/30">
                <p className="text-sm text-[var(--gray)] mb-1">Seu amigo ganha</p>
                <p className="font-display text-3xl text-green-400">
                  {incentivo.tipo === 'desconto' ? `${incentivo.valorIndicado}%` : `R$${incentivo.valorIndicado}`}
                </p>
                <p className="text-xs text-[var(--gray)]">na primeira compra</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarDocumentacao} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Documentacao Completa'}
          </button>
        </div>

        {/* Dicas */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Melhores Praticas</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Estrutura de Incentivos</h4>
              <ul className="space-y-1">
                <li>• Indicador deve ganhar mais que indicado</li>
                <li>• Recompensas imediatas convertem melhor</li>
                <li>• Escada de recompensas (5 indicacoes = bonus extra)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Divulgacao</h4>
              <ul className="space-y-1">
                <li>• Lembre usuarios em momentos de satisfacao</li>
                <li>• Email apos primeira compra ou milestone</li>
                <li>• Link facil de compartilhar (curto e memoravel)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
