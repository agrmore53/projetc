'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Copy,
  Check,
  Building2,
  User,
  Calendar,
  DollarSign,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface DadosContrato {
  // Contratante
  nomeContratante: string
  cpfCnpjContratante: string
  enderecoContratante: string

  // Contratada
  nomeContratada: string
  cnpjContratada: string
  enderecoContratada: string

  // Serviço
  descricaoServico: string
  valor: number
  formaPagamento: string
  diaVencimento: number

  // Prazo
  dataInicio: string
  duracaoMeses: number

  // Extras
  multa: number
  foro: string
}

const dadosIniciais: DadosContrato = {
  nomeContratante: '',
  cpfCnpjContratante: '',
  enderecoContratante: '',
  nomeContratada: 'Império Sistemas LTDA',
  cnpjContratada: '00.000.000/0001-00',
  enderecoContratada: 'Rua Example, 123 - Centro - Cidade/UF',
  descricaoServico: 'Licença de uso de software de gestão empresarial em nuvem, incluindo módulos de PDV, estoque, financeiro e fiscal, com suporte técnico e atualizações.',
  valor: 297,
  formaPagamento: 'Boleto bancário',
  diaVencimento: 10,
  dataInicio: new Date().toISOString().split('T')[0],
  duracaoMeses: 12,
  multa: 10,
  foro: 'Cidade/UF'
}

const modelosContrato = [
  { id: 'saas', nome: 'SaaS / Software', desc: 'Licença de uso de software' },
  { id: 'servico', nome: 'Prestação de Serviços', desc: 'Serviços em geral' },
  { id: 'consultoria', nome: 'Consultoria', desc: 'Consultoria empresarial' },
]

export default function ContratosPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosContrato>(dadosIniciais)
  const [modeloSelecionado, setModeloSelecionado] = useState('saas')
  const [copiado, setCopiado] = useState(false)
  const [secaoAberta, setSecaoAberta] = useState<string>('contratante')

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
  }, [router])

  const handleChange = (campo: keyof DadosContrato, valor: string | number) => {
    setDados(prev => ({ ...prev, [campo]: valor }))
  }

  const formatarData = (data: string) => {
    if (!data) return '[DATA]'
    const d = new Date(data + 'T00:00:00')
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarContrato = () => {
    const dataFim = new Date(dados.dataInicio)
    dataFim.setMonth(dataFim.getMonth() + dados.duracaoMeses)

    if (modeloSelecionado === 'saas') {
      return `
CONTRATO DE LICENÇA DE USO DE SOFTWARE

IDENTIFICAÇÃO DAS PARTES

CONTRATANTE: ${dados.nomeContratante || '[NOME DO CONTRATANTE]'}
CPF/CNPJ: ${dados.cpfCnpjContratante || '[CPF/CNPJ]'}
Endereço: ${dados.enderecoContratante || '[ENDEREÇO COMPLETO]'}

CONTRATADA: ${dados.nomeContratada}
CNPJ: ${dados.cnpjContratada}
Endereço: ${dados.enderecoContratada}

As partes acima qualificadas celebram o presente CONTRATO DE LICENÇA DE USO DE SOFTWARE, que se regerá pelas seguintes cláusulas e condições:

CLÁUSULA PRIMEIRA - DO OBJETO
1.1. O presente contrato tem por objeto a concessão de licença de uso de software de gestão empresarial, na modalidade SaaS (Software as a Service), compreendendo:
${dados.descricaoServico}

1.2. O software será disponibilizado em ambiente de nuvem, acessível via internet, 24 horas por dia, 7 dias por semana, ressalvados os períodos de manutenção programada.

CLÁUSULA SEGUNDA - DO PRAZO
2.1. O presente contrato terá vigência de ${dados.duracaoMeses} (${dados.duracaoMeses === 12 ? 'doze' : dados.duracaoMeses}) meses, iniciando-se em ${formatarData(dados.dataInicio)} e terminando em ${formatarData(dataFim.toISOString().split('T')[0])}.

2.2. O contrato será renovado automaticamente por períodos iguais e sucessivos, caso nenhuma das partes manifeste interesse em rescindi-lo com antecedência mínima de 30 (trinta) dias.

CLÁUSULA TERCEIRA - DO VALOR E FORMA DE PAGAMENTO
3.1. Pela licença de uso do software, a CONTRATANTE pagará à CONTRATADA o valor mensal de ${formatarMoeda(dados.valor)} (${valorPorExtenso(dados.valor)}).

3.2. O pagamento será realizado através de ${dados.formaPagamento}, com vencimento todo dia ${dados.diaVencimento} de cada mês.

3.3. O não pagamento na data de vencimento acarretará:
   a) Multa de ${dados.multa}% sobre o valor devido;
   b) Juros de mora de 1% ao mês;
   c) Suspensão do acesso ao sistema após 10 dias de atraso;
   d) Cancelamento do contrato após 30 dias de inadimplência.

CLÁUSULA QUARTA - DAS OBRIGAÇÕES DA CONTRATADA
4.1. Disponibilizar o software em pleno funcionamento;
4.2. Prestar suporte técnico em horário comercial;
4.3. Realizar backup diário dos dados;
4.4. Manter o sistema atualizado;
4.5. Garantir a segurança e confidencialidade dos dados.

CLÁUSULA QUINTA - DAS OBRIGAÇÕES DA CONTRATANTE
5.1. Efetuar os pagamentos nas datas acordadas;
5.2. Utilizar o software de acordo com sua finalidade;
5.3. Não compartilhar credenciais de acesso;
5.4. Não realizar engenharia reversa do software;
5.5. Manter seus dados cadastrais atualizados.

CLÁUSULA SEXTA - DA PROPRIEDADE INTELECTUAL
6.1. O software, incluindo código-fonte, interfaces, documentação e marca, são de propriedade exclusiva da CONTRATADA.

6.2. Este contrato não transfere qualquer direito de propriedade, apenas o direito de uso conforme estabelecido.

CLÁUSULA SÉTIMA - DA CONFIDENCIALIDADE
7.1. As partes se comprometem a manter sigilo sobre todas as informações confidenciais a que tiverem acesso em razão deste contrato.

7.2. A CONTRATADA se compromete a não acessar, divulgar ou utilizar os dados da CONTRATANTE para qualquer finalidade diversa da prestação do serviço.

CLÁUSULA OITAVA - DA RESCISÃO
8.1. O presente contrato poderá ser rescindido:
   a) Por acordo entre as partes;
   b) Por inadimplemento de qualquer cláusula;
   c) Por solicitação de qualquer parte, com aviso prévio de 30 dias.

8.2. Em caso de rescisão, a CONTRATADA disponibilizará os dados da CONTRATANTE para download pelo prazo de 30 dias.

CLÁUSULA NONA - DA LIMITAÇÃO DE RESPONSABILIDADE
9.1. A CONTRATADA não se responsabiliza por danos indiretos, lucros cessantes ou perda de dados decorrentes de caso fortuito, força maior ou culpa exclusiva da CONTRATANTE.

9.2. A responsabilidade da CONTRATADA está limitada ao valor total pago pela CONTRATANTE nos últimos 12 meses.

CLÁUSULA DÉCIMA - DISPOSIÇÕES GERAIS
10.1. A tolerância de uma parte quanto a qualquer descumprimento não implicará renúncia ao direito de exigir o cumprimento.

10.2. Este contrato representa o acordo integral entre as partes, substituindo quaisquer tratativas anteriores.

10.3. Eventuais alterações deste contrato somente serão válidas se feitas por escrito e assinadas por ambas as partes.

CLÁUSULA DÉCIMA PRIMEIRA - DO FORO
11.1. Fica eleito o foro da comarca de ${dados.foro || '[CIDADE/UF]'} para dirimir quaisquer questões oriundas deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja.

E por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de 2 (duas) testemunhas.

${dados.foro || '[LOCAL]'}, ${formatarData(dados.dataInicio)}


_______________________________________
${dados.nomeContratante || 'CONTRATANTE'}
CPF/CNPJ: ${dados.cpfCnpjContratante || '_______________'}


_______________________________________
${dados.nomeContratada}
CNPJ: ${dados.cnpjContratada}


TESTEMUNHAS:

1. _______________________________________
   Nome:
   CPF:

2. _______________________________________
   Nome:
   CPF:
`.trim()
    } else if (modeloSelecionado === 'servico') {
      return `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

IDENTIFICAÇÃO DAS PARTES

CONTRATANTE: ${dados.nomeContratante || '[NOME DO CONTRATANTE]'}
CPF/CNPJ: ${dados.cpfCnpjContratante || '[CPF/CNPJ]'}
Endereço: ${dados.enderecoContratante || '[ENDEREÇO COMPLETO]'}

CONTRATADA: ${dados.nomeContratada}
CNPJ: ${dados.cnpjContratada}
Endereço: ${dados.enderecoContratada}

As partes acima qualificadas celebram o presente CONTRATO DE PRESTAÇÃO DE SERVIÇOS, mediante as seguintes cláusulas:

CLÁUSULA PRIMEIRA - DO OBJETO
1.1. A CONTRATADA se compromete a prestar os seguintes serviços à CONTRATANTE:
${dados.descricaoServico}

CLÁUSULA SEGUNDA - DO PRAZO
2.1. Este contrato terá vigência de ${dados.duracaoMeses} meses, com início em ${formatarData(dados.dataInicio)}.
2.2. Poderá ser renovado mediante acordo entre as partes.

CLÁUSULA TERCEIRA - DO VALOR
3.1. Pelos serviços prestados, a CONTRATANTE pagará o valor mensal de ${formatarMoeda(dados.valor)}.
3.2. Pagamento via ${dados.formaPagamento}, vencimento dia ${dados.diaVencimento}.
3.3. Atraso: multa de ${dados.multa}% + juros de 1% ao mês.

CLÁUSULA QUARTA - DAS OBRIGAÇÕES
4.1. DA CONTRATADA: Executar os serviços com qualidade e dentro dos prazos.
4.2. DA CONTRATANTE: Efetuar pagamentos e fornecer informações necessárias.

CLÁUSULA QUINTA - DA RESCISÃO
5.1. Pode ser rescindido com aviso prévio de 30 dias ou por descumprimento de cláusulas.

CLÁUSULA SEXTA - DO FORO
6.1. Foro: ${dados.foro || '[CIDADE/UF]'}

${dados.foro || '[LOCAL]'}, ${formatarData(dados.dataInicio)}

_______________________________________
CONTRATANTE

_______________________________________
CONTRATADA
`.trim()
    } else {
      return `
CONTRATO DE CONSULTORIA EMPRESARIAL

IDENTIFICAÇÃO DAS PARTES

CONTRATANTE: ${dados.nomeContratante || '[NOME DO CONTRATANTE]'}
CPF/CNPJ: ${dados.cpfCnpjContratante || '[CPF/CNPJ]'}

CONSULTOR: ${dados.nomeContratada}
CNPJ: ${dados.cnpjContratada}

CLÁUSULA PRIMEIRA - DO OBJETO
1.1. Prestação de serviços de consultoria empresarial:
${dados.descricaoServico}

CLÁUSULA SEGUNDA - DO PRAZO E VALOR
2.1. Vigência: ${dados.duracaoMeses} meses a partir de ${formatarData(dados.dataInicio)}
2.2. Honorários: ${formatarMoeda(dados.valor)}/mês via ${dados.formaPagamento}

CLÁUSULA TERCEIRA - CONFIDENCIALIDADE
3.1. O CONSULTOR manterá sigilo absoluto sobre todas as informações do CONTRATANTE.

CLÁUSULA QUARTA - PROPRIEDADE INTELECTUAL
4.1. Todo material produzido será de propriedade do CONTRATANTE após quitação.

CLÁUSULA QUINTA - RESCISÃO
5.1. Aviso prévio de 30 dias. Multa de ${dados.multa}% em caso de rescisão antecipada.

CLÁUSULA SEXTA - FORO
6.1. ${dados.foro || '[CIDADE/UF]'}

${dados.foro || '[LOCAL]'}, ${formatarData(dados.dataInicio)}

_______________________________________
CONTRATANTE

_______________________________________
CONSULTOR
`.trim()
    }
  }

  const valorPorExtenso = (valor: number): string => {
    if (valor === 297) return 'duzentos e noventa e sete reais'
    if (valor === 147) return 'cento e quarenta e sete reais'
    if (valor === 497) return 'quatrocentos e noventa e sete reais'
    return `${valor} reais`
  }

  const copiarContrato = async () => {
    try {
      await navigator.clipboard.writeText(gerarContrato())
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const toggleSecao = (secao: string) => {
    setSecaoAberta(secaoAberta === secao ? '' : secao)
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
              <h1 className="font-display text-2xl sm:text-3xl gold-text">Gerador de Contratos</h1>
              <p className="text-[var(--gray)] text-sm">Contratos profissionais prontos para usar</p>
            </div>
          </div>

          <button
            onClick={copiarContrato}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              copiado
                ? 'bg-green-500/20 text-green-400'
                : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
            }`}
          >
            {copiado ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span className="hidden sm:inline">{copiado ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </header>

        {/* Aviso */}
        <section className="glass p-4 mb-8 border-l-4 border-yellow-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-[var(--gray)] text-sm">
              Este é um <strong className="text-white">modelo genérico</strong>. Recomendamos revisão por um advogado
              antes de usar em situações reais. Adapte conforme sua necessidade.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="space-y-4">
            {/* Tipo de Contrato */}
            <section className="glass p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--gold)]" />
                Tipo de Contrato
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {modelosContrato.map((modelo) => (
                  <button
                    key={modelo.id}
                    onClick={() => setModeloSelecionado(modelo.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      modeloSelecionado === modelo.id
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <p className={`font-medium text-sm ${modeloSelecionado === modelo.id ? 'text-[var(--gold)]' : 'text-white'}`}>
                      {modelo.nome}
                    </p>
                    <p className="text-[var(--gray)] text-xs mt-1">{modelo.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Contratante */}
            <section className="glass overflow-hidden">
              <button
                onClick={() => toggleSecao('contratante')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-white font-medium">Dados do Contratante</span>
                </div>
                {secaoAberta === 'contratante' ? (
                  <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                )}
              </button>

              {secaoAberta === 'contratante' && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Nome / Razão Social</label>
                    <input
                      type="text"
                      value={dados.nomeContratante}
                      onChange={(e) => handleChange('nomeContratante', e.target.value)}
                      placeholder="Nome completo ou razão social"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">CPF / CNPJ</label>
                    <input
                      type="text"
                      value={dados.cpfCnpjContratante}
                      onChange={(e) => handleChange('cpfCnpjContratante', e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Endereço Completo</label>
                    <input
                      type="text"
                      value={dados.enderecoContratante}
                      onChange={(e) => handleChange('enderecoContratante', e.target.value)}
                      placeholder="Rua, número, bairro, cidade/UF"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Contratada */}
            <section className="glass overflow-hidden">
              <button
                onClick={() => toggleSecao('contratada')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-white font-medium">Dados da Contratada (Você)</span>
                </div>
                {secaoAberta === 'contratada' ? (
                  <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                )}
              </button>

              {secaoAberta === 'contratada' && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Razão Social</label>
                    <input
                      type="text"
                      value={dados.nomeContratada}
                      onChange={(e) => handleChange('nomeContratada', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">CNPJ</label>
                    <input
                      type="text"
                      value={dados.cnpjContratada}
                      onChange={(e) => handleChange('cnpjContratada', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Endereço</label>
                    <input
                      type="text"
                      value={dados.enderecoContratada}
                      onChange={(e) => handleChange('enderecoContratada', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Serviço e Valor */}
            <section className="glass overflow-hidden">
              <button
                onClick={() => toggleSecao('servico')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-white font-medium">Serviço e Valores</span>
                </div>
                {secaoAberta === 'servico' ? (
                  <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                )}
              </button>

              {secaoAberta === 'servico' && (
                <div className="p-4 pt-0 space-y-4">
                  <div>
                    <label className="text-[var(--gray)] text-sm mb-2 block">Descrição do Serviço</label>
                    <textarea
                      value={dados.descricaoServico}
                      onChange={(e) => handleChange('descricaoServico', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors h-24 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Valor Mensal (R$)</label>
                      <input
                        type="number"
                        value={dados.valor}
                        onChange={(e) => handleChange('valor', parseFloat(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Dia Vencimento</label>
                      <input
                        type="number"
                        value={dados.diaVencimento}
                        onChange={(e) => handleChange('diaVencimento', parseInt(e.target.value) || 10)}
                        min="1"
                        max="28"
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
                      <option value="Boleto bancário">Boleto bancário</option>
                      <option value="PIX">PIX</option>
                      <option value="Cartão de crédito">Cartão de crédito</option>
                      <option value="Transferência bancária">Transferência bancária</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* Prazo e Condições */}
            <section className="glass overflow-hidden">
              <button
                onClick={() => toggleSecao('prazo')}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-white font-medium">Prazo e Condições</span>
                </div>
                {secaoAberta === 'prazo' ? (
                  <ChevronDown className="w-5 h-5 text-[var(--gold)]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[var(--gray)]" />
                )}
              </button>

              {secaoAberta === 'prazo' && (
                <div className="p-4 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Data de Início</label>
                      <input
                        type="date"
                        value={dados.dataInicio}
                        onChange={(e) => handleChange('dataInicio', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Duração (meses)</label>
                      <input
                        type="number"
                        value={dados.duracaoMeses}
                        onChange={(e) => handleChange('duracaoMeses', parseInt(e.target.value) || 12)}
                        min="1"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Multa por Atraso (%)</label>
                      <input
                        type="number"
                        value={dados.multa}
                        onChange={(e) => handleChange('multa', parseInt(e.target.value) || 10)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--gray)] text-sm mb-2 block">Foro (Cidade/UF)</label>
                      <input
                        type="text"
                        value={dados.foro}
                        onChange={(e) => handleChange('foro', e.target.value)}
                        placeholder="São Paulo/SP"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--gold)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Preview */}
          <div className="glass p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--gold)]" />
              Preview do Contrato
            </h2>

            <div className="bg-black/60 rounded-xl p-4 max-h-[600px] overflow-y-auto">
              <pre className="text-white text-xs whitespace-pre-wrap font-mono leading-relaxed">
                {gerarContrato()}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Gerador de Contratos - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
