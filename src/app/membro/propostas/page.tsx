'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Building2,
  User,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
  Download,
  Eye,
  Clock,
  Shield,
  Zap,
  Star
} from 'lucide-react'

interface DadosProposta {
  // Cliente
  nomeCliente: string
  nomeEmpresa: string
  cnpj: string
  segmento: string
  cidade: string
  estado: string

  // Plano
  planoNome: string
  planoValor: number
  planoDescricao: string

  // Condições
  desconto: number
  formaPagamento: string
  validadeProposta: number

  // Itens inclusos
  itensInclusos: string[]

  // Observações
  observacoes: string
}

const dadosIniciais: DadosProposta = {
  nomeCliente: '',
  nomeEmpresa: '',
  cnpj: '',
  segmento: '',
  cidade: '',
  estado: '',
  planoNome: 'Plano Profissional',
  planoValor: 297,
  planoDescricao: 'Sistema completo de gestão empresarial',
  desconto: 0,
  formaPagamento: 'Mensal no cartão',
  validadeProposta: 7,
  itensInclusos: [
    'PDV completo com frente de caixa',
    'Controle de estoque ilimitado',
    'Gestão financeira (contas a pagar/receber)',
    'Emissão de NF-e e NFC-e',
    'Relatórios gerenciais',
    'App para celular',
    'Suporte via WhatsApp',
    'Treinamento incluso',
    'Atualizações gratuitas',
    'Backup automático na nuvem'
  ],
  observacoes: '',
}

const planosPreDefinidos = [
  { nome: 'Plano Básico', valor: 147, desc: 'Ideal para MEI e pequenos negócios' },
  { nome: 'Plano Profissional', valor: 297, desc: 'Completo para empresas em crescimento' },
  { nome: 'Plano Enterprise', valor: 497, desc: 'Para operações de alto volume' },
]

const itensDisponiveis = [
  'PDV completo com frente de caixa',
  'Controle de estoque ilimitado',
  'Gestão financeira (contas a pagar/receber)',
  'Emissão de NF-e e NFC-e',
  'Emissão de NFS-e',
  'Relatórios gerenciais',
  'App para celular',
  'Suporte via WhatsApp',
  'Suporte telefônico prioritário',
  'Treinamento incluso',
  'Treinamento presencial',
  'Atualizações gratuitas',
  'Backup automático na nuvem',
  'Integração com iFood/Rappi',
  'Integração com Mercado Livre',
  'Multi-empresas',
  'Multi-usuários ilimitados',
  'API para integrações',
  'Gerente de conta dedicado',
]

export default function PropostasPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosProposta>(dadosIniciais)
  const [copiado, setCopiado] = useState(false)
  const [visualizando, setVisualizando] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('proposta_dados')
    if (saved) {
      setDados(JSON.parse(saved))
    }
  }, [router])

  useEffect(() => {
    localStorage.setItem('proposta_dados', JSON.stringify(dados))
  }, [dados])

  const handleChange = (campo: keyof DadosProposta, valor: any) => {
    setDados(prev => ({ ...prev, [campo]: valor }))
  }

  const toggleItem = (item: string) => {
    const novaLista = dados.itensInclusos.includes(item)
      ? dados.itensInclusos.filter(i => i !== item)
      : [...dados.itensInclusos, item]
    handleChange('itensInclusos', novaLista)
  }

  const selecionarPlano = (plano: typeof planosPreDefinidos[0]) => {
    handleChange('planoNome', plano.nome)
    handleChange('planoValor', plano.valor)
    handleChange('planoDescricao', plano.desc)
  }

  const valorFinal = dados.planoValor * (1 - dados.desconto / 100)
  const dataHoje = new Date().toLocaleDateString('pt-BR')
  const dataValidade = new Date(Date.now() + dados.validadeProposta * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarProposta = () => {
    return `
════════════════════════════════════════
         PROPOSTA COMERCIAL
════════════════════════════════════════

📅 Data: ${dataHoje}
📋 Proposta válida até: ${dataValidade}

────────────────────────────────────────
              CLIENTE
────────────────────────────────────────

👤 Nome: ${dados.nomeCliente || '[Nome do Cliente]'}
🏢 Empresa: ${dados.nomeEmpresa || '[Nome da Empresa]'}
${dados.cnpj ? `📄 CNPJ: ${dados.cnpj}` : ''}
📍 Localização: ${dados.cidade || '[Cidade]'}/${dados.estado || 'UF'}
🏷️ Segmento: ${dados.segmento || '[Segmento]'}

────────────────────────────────────────
              SOLUÇÃO
────────────────────────────────────────

📦 ${dados.planoNome}
${dados.planoDescricao}

✅ ITENS INCLUSOS:
${dados.itensInclusos.map(item => `   • ${item}`).join('\n')}

────────────────────────────────────────
           INVESTIMENTO
────────────────────────────────────────

💰 Valor: ${formatarMoeda(dados.planoValor)}/mês
${dados.desconto > 0 ? `🎁 Desconto: ${dados.desconto}%\n✨ Valor Final: ${formatarMoeda(valorFinal)}/mês` : ''}

💳 Forma de Pagamento: ${dados.formaPagamento}

────────────────────────────────────────
            GARANTIAS
────────────────────────────────────────

🛡️ 7 dias de garantia incondicional
📞 Suporte técnico incluso
🔄 Cancelamento sem multa
📈 Atualizações gratuitas

${dados.observacoes ? `────────────────────────────────────────
           OBSERVAÇÕES
────────────────────────────────────────

${dados.observacoes}` : ''}

════════════════════════════════════════
     IMPÉRIO SISTEMAS
     Transformando negócios através
     da tecnologia
════════════════════════════════════════
`.trim()
  }

  const copiarProposta = async () => {
    try {
      await navigator.clipboard.writeText(gerarProposta())
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const limparProposta = () => {
    if (confirm('Limpar todos os dados da proposta?')) {
      setDados(dadosIniciais)
    }
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
              <h1 className="font-display text-2xl sm:text-3xl gold-text">Gerador de Propostas</h1>
              <p className="text-[var(--gray)] text-sm">Crie propostas profissionais em segundos</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setVisualizando(!visualizando)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Eye className="w-5 h-5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={copiarProposta}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                copiado
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
              }`}
            >
              {copiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span className="hidden sm:inline">{copiado ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </header>

        {visualizando ? (
          /* Preview da Proposta */
          <section className="glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-[var(--gold)]" />
                Preview da Proposta
              </h2>
              <button
                onClick={() => setVisualizando(false)}
                className="text-[var(--gray)] hover:text-white text-sm"
              >
                Voltar para edição
              </button>
            </div>
            <pre className="bg-black/60 rounded-xl p-6 text-white text-sm whitespace-pre-wrap font-mono overflow-x-auto">
              {gerarProposta()}
            </pre>
          </section>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Coluna 1: Dados do Cliente */}
            <div className="space-y-6">
              {/* Dados do Cliente */}
              <section className="glass p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[var(--gold)]" />
                  Dados do Cliente
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Nome do Contato</label>
                      <input
                        type="text"
                        value={dados.nomeCliente}
                        onChange={(e) => handleChange('nomeCliente', e.target.value)}
                        placeholder="João Silva"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Nome da Empresa</label>
                      <input
                        type="text"
                        value={dados.nomeEmpresa}
                        onChange={(e) => handleChange('nomeEmpresa', e.target.value)}
                        placeholder="Empresa XYZ"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">CNPJ (opcional)</label>
                      <input
                        type="text"
                        value={dados.cnpj}
                        onChange={(e) => handleChange('cnpj', e.target.value)}
                        placeholder="00.000.000/0001-00"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Segmento</label>
                      <input
                        type="text"
                        value={dados.segmento}
                        onChange={(e) => handleChange('segmento', e.target.value)}
                        placeholder="Varejo, Alimentação..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Cidade</label>
                      <input
                        type="text"
                        value={dados.cidade}
                        onChange={(e) => handleChange('cidade', e.target.value)}
                        placeholder="São Paulo"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Estado</label>
                      <select
                        value={dados.estado}
                        onChange={(e) => handleChange('estado', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      >
                        <option value="">Selecione</option>
                        {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Plano */}
              <section className="glass p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--gold)]" />
                  Plano
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {planosPreDefinidos.map((plano) => (
                    <button
                      key={plano.nome}
                      onClick={() => selecionarPlano(plano)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        dados.planoNome === plano.nome
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <p className={`font-medium text-sm ${dados.planoNome === plano.nome ? 'text-[var(--gold)]' : 'text-white'}`}>
                        {plano.nome}
                      </p>
                      <p className="text-[var(--gray)] text-xs">{formatarMoeda(plano.valor)}/mês</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Valor Personalizado (R$)</label>
                    <input
                      type="number"
                      value={dados.planoValor}
                      onChange={(e) => handleChange('planoValor', parseFloat(e.target.value) || 0)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Desconto (%)</label>
                      <input
                        type="number"
                        value={dados.desconto}
                        onChange={(e) => handleChange('desconto', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        max="100"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Validade (dias)</label>
                      <input
                        type="number"
                        value={dados.validadeProposta}
                        onChange={(e) => handleChange('validadeProposta', parseInt(e.target.value) || 7)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Forma de Pagamento</label>
                    <select
                      value={dados.formaPagamento}
                      onChange={(e) => handleChange('formaPagamento', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    >
                      <option value="Mensal no cartão">Mensal no cartão</option>
                      <option value="Mensal no boleto">Mensal no boleto</option>
                      <option value="Mensal no PIX">Mensal no PIX</option>
                      <option value="Anual à vista (10% desconto)">Anual à vista (10% desconto)</option>
                      <option value="Semestral à vista (5% desconto)">Semestral à vista (5% desconto)</option>
                    </select>
                  </div>
                </div>

                {dados.desconto > 0 && (
                  <div className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--gray)]">Valor final com desconto:</span>
                      <span className="text-green-400 font-bold text-lg">{formatarMoeda(valorFinal)}/mês</span>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Coluna 2: Itens e Observações */}
            <div className="space-y-6">
              {/* Itens Inclusos */}
              <section className="glass p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)]" />
                  Itens Inclusos
                </h2>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {itensDisponiveis.map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={dados.itensInclusos.includes(item)}
                        onChange={() => toggleItem(item)}
                        className="w-5 h-5 rounded border-white/20 bg-black/40 text-[var(--gold)] focus:ring-[var(--gold)]"
                      />
                      <span className={`text-sm ${dados.itensInclusos.includes(item) ? 'text-white' : 'text-[var(--gray)]'}`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <p className="text-[var(--gray)] text-xs mt-4">
                  {dados.itensInclusos.length} itens selecionados
                </p>
              </section>

              {/* Observações */}
              <section className="glass p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[var(--gold)]" />
                  Observações
                </h2>

                <textarea
                  value={dados.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                  placeholder="Condições especiais, observações importantes..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-32 resize-none"
                />
              </section>

              {/* Resumo */}
              <section className="glass p-6 border border-[var(--gold)]/30">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[var(--gold)]" />
                  Resumo da Proposta
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-[var(--gray)]">Cliente</span>
                    <span className="text-white">{dados.nomeEmpresa || '-'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-[var(--gray)]">Plano</span>
                    <span className="text-white">{dados.planoNome}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-[var(--gray)]">Valor</span>
                    <span className="text-white">{formatarMoeda(dados.planoValor)}/mês</span>
                  </div>
                  {dados.desconto > 0 && (
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-[var(--gray)]">Desconto</span>
                      <span className="text-green-400">-{dados.desconto}%</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-[var(--gray)]">Itens inclusos</span>
                    <span className="text-white">{dados.itensInclusos.length}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[var(--gray)]">Válida até</span>
                    <span className="text-white">{dataValidade}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Valor Final</span>
                    <span className="text-2xl font-bold gold-text">{formatarMoeda(valorFinal)}/mês</span>
                  </div>
                </div>
              </section>

              {/* Ações */}
              <div className="flex gap-3">
                <button
                  onClick={limparProposta}
                  className="flex-1 py-3 border border-white/20 rounded-xl text-[var(--gray)] hover:text-white hover:border-white/40 transition-colors"
                >
                  Limpar Tudo
                </button>
                <button
                  onClick={copiarProposta}
                  className="flex-1 py-3 bg-[var(--gold)] text-black rounded-xl font-medium hover:bg-[var(--gold-light)] transition-colors"
                >
                  Copiar Proposta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Gerador de Propostas - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
