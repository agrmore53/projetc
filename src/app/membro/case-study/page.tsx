'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Copy, Check, Download, ChevronRight, Building, Target, TrendingUp, Quote } from 'lucide-react'

interface CaseData {
  nomeCliente: string
  segmento: string
  tamanhoEmpresa: string
  desafio: string
  solucao: string
  implementacao: string
  resultadoNumero1: string
  resultadoDescricao1: string
  resultadoNumero2: string
  resultadoDescricao2: string
  resultadoNumero3: string
  resultadoDescricao3: string
  depoimento: string
  autorDepoimento: string
  cargoAutor: string
  tempoImplementacao: string
}

export default function CaseStudyPage() {
  const [etapa, setEtapa] = useState(1)
  const [copied, setCopied] = useState(false)
  const [caseData, setCaseData] = useState<CaseData>({
    nomeCliente: '',
    segmento: '',
    tamanhoEmpresa: '',
    desafio: '',
    solucao: '',
    implementacao: '',
    resultadoNumero1: '',
    resultadoDescricao1: '',
    resultadoNumero2: '',
    resultadoDescricao2: '',
    resultadoNumero3: '',
    resultadoDescricao3: '',
    depoimento: '',
    autorDepoimento: '',
    cargoAutor: '',
    tempoImplementacao: ''
  })

  const templates = [
    {
      id: 'b2b',
      nome: 'B2B / Corporativo',
      descricao: 'Ideal para vendas empresariais',
      dados: {
        segmento: 'Tecnologia',
        tamanhoEmpresa: 'Média empresa (50-200 funcionarios)',
        desafio: 'Baixa eficiencia no processo de vendas, com ciclo de vendas muito longo e baixa taxa de conversao de leads qualificados.',
        solucao: 'Implementacao de processo de vendas consultivas com metodologia SPIN, aliado a automacao de follow-ups e qualificacao de leads.',
        implementacao: 'Treinamento da equipe comercial, configuracao do CRM e criacao de playbook de vendas em 30 dias.',
        tempoImplementacao: '30 dias'
      }
    },
    {
      id: 'saas',
      nome: 'SaaS / Software',
      descricao: 'Para empresas de tecnologia',
      dados: {
        segmento: 'SaaS / Software',
        tamanhoEmpresa: 'Startup (10-50 funcionarios)',
        desafio: 'Alto churn rate e dificuldade em converter trials em clientes pagantes.',
        solucao: 'Estrategia de onboarding estruturado, sequencia de emails personalizados e acompanhamento proativo durante o trial.',
        implementacao: 'Setup de automacoes, treinamento do time de CS e criacao de materiais de suporte em 45 dias.',
        tempoImplementacao: '45 dias'
      }
    },
    {
      id: 'consultoria',
      nome: 'Consultoria / Servicos',
      descricao: 'Para prestadores de servico',
      dados: {
        segmento: 'Consultoria Empresarial',
        tamanhoEmpresa: 'Pequena empresa (5-20 funcionarios)',
        desafio: 'Depender de indicacoes para conseguir novos clientes e nao ter processo de vendas previsivel.',
        solucao: 'Criacao de funil de vendas com conteudo educativo, prospecao ativa em LinkedIn e processo de qualificacao estruturado.',
        implementacao: 'Desenvolvimento de estrategia, criacao de conteudo e treinamento em prospecao em 60 dias.',
        tempoImplementacao: '60 dias'
      }
    }
  ]

  const aplicarTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setCaseData({
        ...caseData,
        ...template.dados
      })
    }
  }

  const gerarCase = () => {
    return `
═══════════════════════════════════════════════════════════════
                        CASE DE SUCESSO
═══════════════════════════════════════════════════════════════

CLIENTE: ${caseData.nomeCliente || '[Nome do Cliente]'}
SEGMENTO: ${caseData.segmento}
PORTE: ${caseData.tamanhoEmpresa}

───────────────────────────────────────────────────────────────
                        O DESAFIO
───────────────────────────────────────────────────────────────

${caseData.desafio}

───────────────────────────────────────────────────────────────
                        A SOLUCAO
───────────────────────────────────────────────────────────────

${caseData.solucao}

IMPLEMENTACAO:
${caseData.implementacao}

Tempo de implementacao: ${caseData.tempoImplementacao}

───────────────────────────────────────────────────────────────
                        RESULTADOS
───────────────────────────────────────────────────────────────

${caseData.resultadoNumero1 ? `► ${caseData.resultadoNumero1}` : ''}
${caseData.resultadoDescricao1 ? `  ${caseData.resultadoDescricao1}` : ''}

${caseData.resultadoNumero2 ? `► ${caseData.resultadoNumero2}` : ''}
${caseData.resultadoDescricao2 ? `  ${caseData.resultadoDescricao2}` : ''}

${caseData.resultadoNumero3 ? `► ${caseData.resultadoNumero3}` : ''}
${caseData.resultadoDescricao3 ? `  ${caseData.resultadoDescricao3}` : ''}

───────────────────────────────────────────────────────────────
                        DEPOIMENTO
───────────────────────────────────────────────────────────────

"${caseData.depoimento}"

— ${caseData.autorDepoimento}, ${caseData.cargoAutor}

═══════════════════════════════════════════════════════════════
`
  }

  const copiarCase = () => {
    navigator.clipboard.writeText(gerarCase())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const etapas = [
    { num: 1, titulo: 'Cliente', icone: <Building className="w-4 h-4" /> },
    { num: 2, titulo: 'Desafio', icone: <Target className="w-4 h-4" /> },
    { num: 3, titulo: 'Resultados', icone: <TrendingUp className="w-4 h-4" /> },
    { num: 4, titulo: 'Depoimento', icone: <Quote className="w-4 h-4" /> },
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
            <FileText className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Case Study</span>
          </h1>
          <p className="text-[var(--gray)]">Crie cases de sucesso profissionais</p>
        </div>

        {/* Progress Bar */}
        <div className="glass card mb-8">
          <div className="flex items-center justify-between">
            {etapas.map((e, index) => (
              <div key={e.num} className="flex items-center">
                <button
                  onClick={() => setEtapa(e.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    etapa === e.num
                      ? 'bg-[var(--gold)] text-black'
                      : etapa > e.num
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 text-[var(--gray)]'
                  }`}
                >
                  {e.icone}
                  <span className="hidden md:inline">{e.titulo}</span>
                </button>
                {index < etapas.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[var(--gray)] mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Etapa 1: Cliente */}
        {etapa === 1 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Informacoes do Cliente</h2>

            {/* Templates */}
            <div className="mb-6">
              <label className="input-label">Usar template (opcional)</label>
              <div className="grid md:grid-cols-3 gap-3">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => aplicarTemplate(t.id)}
                    className="p-3 rounded-lg border border-white/20 hover:border-[var(--gold)] text-left transition-all"
                  >
                    <p className="font-semibold text-sm">{t.nome}</p>
                    <p className="text-xs text-[var(--gray)]">{t.descricao}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Nome do Cliente/Empresa</label>
                <input
                  type="text"
                  value={caseData.nomeCliente}
                  onChange={(e) => setCaseData({...caseData, nomeCliente: e.target.value})}
                  placeholder="Ex: Empresa ABC ou cliente anonimo"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Segmento/Industria</label>
                <input
                  type="text"
                  value={caseData.segmento}
                  onChange={(e) => setCaseData({...caseData, segmento: e.target.value})}
                  placeholder="Ex: Tecnologia, Varejo, Servicos..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Tamanho da Empresa</label>
                <select
                  value={caseData.tamanhoEmpresa}
                  onChange={(e) => setCaseData({...caseData, tamanhoEmpresa: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione...</option>
                  <option value="Profissional autonomo">Profissional autonomo</option>
                  <option value="Micro empresa (1-10 funcionarios)">Micro empresa (1-10 funcionarios)</option>
                  <option value="Pequena empresa (10-50 funcionarios)">Pequena empresa (10-50 funcionarios)</option>
                  <option value="Media empresa (50-200 funcionarios)">Media empresa (50-200 funcionarios)</option>
                  <option value="Grande empresa (200+ funcionarios)">Grande empresa (200+ funcionarios)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setEtapa(2)}
              className="btn-primary w-full mt-6"
            >
              Proximo: Desafio e Solucao
            </button>
          </div>
        )}

        {/* Etapa 2: Desafio e Solucao */}
        {etapa === 2 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Desafio e Solucao</h2>

            <div className="space-y-4">
              <div>
                <label className="input-label">Qual era o desafio/problema?</label>
                <textarea
                  value={caseData.desafio}
                  onChange={(e) => setCaseData({...caseData, desafio: e.target.value})}
                  placeholder="Descreva o problema que o cliente enfrentava antes de contratar voce..."
                  className="input-field min-h-[120px]"
                />
              </div>

              <div>
                <label className="input-label">Qual foi a solucao implementada?</label>
                <textarea
                  value={caseData.solucao}
                  onChange={(e) => setCaseData({...caseData, solucao: e.target.value})}
                  placeholder="Descreva a solucao que voce ofereceu para resolver o problema..."
                  className="input-field min-h-[120px]"
                />
              </div>

              <div>
                <label className="input-label">Como foi a implementacao?</label>
                <textarea
                  value={caseData.implementacao}
                  onChange={(e) => setCaseData({...caseData, implementacao: e.target.value})}
                  placeholder="Descreva os passos da implementacao..."
                  className="input-field min-h-[100px]"
                />
              </div>

              <div>
                <label className="input-label">Tempo de implementacao</label>
                <input
                  type="text"
                  value={caseData.tempoImplementacao}
                  onChange={(e) => setCaseData({...caseData, tempoImplementacao: e.target.value})}
                  placeholder="Ex: 30 dias, 2 meses..."
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setEtapa(1)} className="btn-secondary flex-1">
                Voltar
              </button>
              <button onClick={() => setEtapa(3)} className="btn-primary flex-1">
                Proximo: Resultados
              </button>
            </div>
          </div>
        )}

        {/* Etapa 3: Resultados */}
        {etapa === 3 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6">Resultados Obtidos</h2>
            <p className="text-[var(--gray)] text-sm mb-6">
              Adicione ate 3 resultados quantificaveis. Numeros geram mais impacto!
            </p>

            <div className="space-y-6">
              {/* Resultado 1 */}
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-[var(--gold)] text-sm mb-3">Resultado Principal</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label text-sm">Numero/Metrica</label>
                    <input
                      type="text"
                      value={caseData.resultadoNumero1}
                      onChange={(e) => setCaseData({...caseData, resultadoNumero1: e.target.value})}
                      placeholder="Ex: +150% de vendas"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label text-sm">Descricao</label>
                    <input
                      type="text"
                      value={caseData.resultadoDescricao1}
                      onChange={(e) => setCaseData({...caseData, resultadoDescricao1: e.target.value})}
                      placeholder="Aumento no faturamento mensal"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Resultado 2 */}
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-[var(--gray)] text-sm mb-3">Resultado Secundario (opcional)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label text-sm">Numero/Metrica</label>
                    <input
                      type="text"
                      value={caseData.resultadoNumero2}
                      onChange={(e) => setCaseData({...caseData, resultadoNumero2: e.target.value})}
                      placeholder="Ex: -40% no ciclo de vendas"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label text-sm">Descricao</label>
                    <input
                      type="text"
                      value={caseData.resultadoDescricao2}
                      onChange={(e) => setCaseData({...caseData, resultadoDescricao2: e.target.value})}
                      placeholder="Reducao no tempo de fechamento"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Resultado 3 */}
              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-[var(--gray)] text-sm mb-3">Resultado Adicional (opcional)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label text-sm">Numero/Metrica</label>
                    <input
                      type="text"
                      value={caseData.resultadoNumero3}
                      onChange={(e) => setCaseData({...caseData, resultadoNumero3: e.target.value})}
                      placeholder="Ex: NPS de 92"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label text-sm">Descricao</label>
                    <input
                      type="text"
                      value={caseData.resultadoDescricao3}
                      onChange={(e) => setCaseData({...caseData, resultadoDescricao3: e.target.value})}
                      placeholder="Satisfacao do cliente"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setEtapa(2)} className="btn-secondary flex-1">
                Voltar
              </button>
              <button onClick={() => setEtapa(4)} className="btn-primary flex-1">
                Proximo: Depoimento
              </button>
            </div>
          </div>
        )}

        {/* Etapa 4: Depoimento e Preview */}
        {etapa === 4 && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="glass card">
              <h2 className="font-display text-xl mb-6">Depoimento do Cliente</h2>

              <div className="space-y-4">
                <div>
                  <label className="input-label">Depoimento</label>
                  <textarea
                    value={caseData.depoimento}
                    onChange={(e) => setCaseData({...caseData, depoimento: e.target.value})}
                    placeholder="O que o cliente disse sobre a experiencia e resultados..."
                    className="input-field min-h-[120px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Nome do Autor</label>
                    <input
                      type="text"
                      value={caseData.autorDepoimento}
                      onChange={(e) => setCaseData({...caseData, autorDepoimento: e.target.value})}
                      placeholder="Ex: Joao Silva"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Cargo</label>
                    <input
                      type="text"
                      value={caseData.cargoAutor}
                      onChange={(e) => setCaseData({...caseData, cargoAutor: e.target.value})}
                      placeholder="Ex: CEO da Empresa ABC"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="glass card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl">Preview do Case</h2>
                <button
                  onClick={copiarCase}
                  className="btn-primary flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Case'}
                </button>
              </div>

              <div className="bg-black/50 rounded-xl p-6 border border-[var(--gold)]/30">
                {/* Header */}
                <div className="text-center mb-6 pb-6 border-b border-white/10">
                  <p className="text-xs text-[var(--gold)] uppercase tracking-widest mb-2">Case de Sucesso</p>
                  <h3 className="font-display text-2xl">{caseData.nomeCliente || '[Nome do Cliente]'}</h3>
                  <p className="text-[var(--gray)]">{caseData.segmento} • {caseData.tamanhoEmpresa}</p>
                </div>

                {/* Desafio */}
                <div className="mb-6">
                  <h4 className="font-display text-sm text-[var(--gold)] mb-2">O Desafio</h4>
                  <p className="text-[var(--gray)]">{caseData.desafio || '...'}</p>
                </div>

                {/* Solucao */}
                <div className="mb-6">
                  <h4 className="font-display text-sm text-[var(--gold)] mb-2">A Solucao</h4>
                  <p className="text-[var(--gray)]">{caseData.solucao || '...'}</p>
                  {caseData.tempoImplementacao && (
                    <p className="text-sm text-[var(--gray)] mt-2">
                      Implementado em: <span className="text-white">{caseData.tempoImplementacao}</span>
                    </p>
                  )}
                </div>

                {/* Resultados */}
                <div className="mb-6">
                  <h4 className="font-display text-sm text-[var(--gold)] mb-3">Resultados</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {caseData.resultadoNumero1 && (
                      <div className="text-center p-4 bg-[var(--gold)]/10 rounded-lg">
                        <p className="font-display text-2xl gold-text">{caseData.resultadoNumero1}</p>
                        <p className="text-xs text-[var(--gray)]">{caseData.resultadoDescricao1}</p>
                      </div>
                    )}
                    {caseData.resultadoNumero2 && (
                      <div className="text-center p-4 bg-[var(--gold)]/10 rounded-lg">
                        <p className="font-display text-2xl gold-text">{caseData.resultadoNumero2}</p>
                        <p className="text-xs text-[var(--gray)]">{caseData.resultadoDescricao2}</p>
                      </div>
                    )}
                    {caseData.resultadoNumero3 && (
                      <div className="text-center p-4 bg-[var(--gold)]/10 rounded-lg">
                        <p className="font-display text-2xl gold-text">{caseData.resultadoNumero3}</p>
                        <p className="text-xs text-[var(--gray)]">{caseData.resultadoDescricao3}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Depoimento */}
                {caseData.depoimento && (
                  <div className="border-t border-white/10 pt-6">
                    <Quote className="w-8 h-8 text-[var(--gold)] mb-3" />
                    <p className="text-lg italic text-white mb-3">"{caseData.depoimento}"</p>
                    <p className="text-[var(--gray)]">
                      — {caseData.autorDepoimento}, {caseData.cargoAutor}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setEtapa(3)} className="btn-secondary flex-1">
                Voltar
              </button>
            </div>
          </div>
        )}

        {/* Dicas */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Dicas para Cases Poderosos</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Use numeros especificos</h4>
              <p>"+147% de vendas" e mais credivel que "aumento significativo".</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Conte uma historia</h4>
              <p>Problema → Solucao → Resultado cria uma narrativa envolvente.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Depoimento autentico</h4>
              <p>Peca permissao e use as palavras do cliente, nao as suas.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Segmente seus cases</h4>
              <p>Tenha cases para cada tipo de cliente/industria que voce atende.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
