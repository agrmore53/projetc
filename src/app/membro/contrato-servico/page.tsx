'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileSignature, Copy, Check } from 'lucide-react'

export default function ContratoServicoPage() {
  const [copied, setCopied] = useState(false)

  const [contrato, setContrato] = useState({
    tipoServico: 'consultoria',
    contratante: '',
    cnpjContratante: '',
    enderecoContratante: '',
    contratada: '',
    cnpjContratada: '',
    enderecoContratada: '',
    objetoContrato: '',
    entregaveis: '',
    valorTotal: '',
    formaPagamento: 'avista',
    parcelas: '1',
    prazoExecucao: '',
    dataInicio: '',
    garantia: '30',
    multaRescisao: '20',
    foro: '',
    dataAssinatura: new Date().toISOString().split('T')[0]
  })

  const tiposServico = [
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'desenvolvimento', label: 'Desenvolvimento de Software' },
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'design', label: 'Design' },
    { value: 'treinamento', label: 'Treinamento' },
    { value: 'manutencao', label: 'Manutencao' },
    { value: 'outro', label: 'Outro' },
  ]

  const formasPagamento = [
    { value: 'avista', label: 'A vista' },
    { value: 'parcelado', label: 'Parcelado' },
    { value: 'recorrente', label: 'Recorrente mensal' },
    { value: 'milestone', label: 'Por entrega (milestone)' },
  ]

  const gerarContrato = () => {
    const dataFormatada = new Date(contrato.dataAssinatura).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const tipoLabel = tiposServico.find(t => t.value === contrato.tipoServico)?.label || ''

    return `
CONTRATO DE PRESTACAO DE SERVICOS
═══════════════════════════════════════════════════════════════

Pelo presente instrumento particular, as partes:

CONTRATANTE:
${contrato.contratante || '[NOME/RAZAO SOCIAL]'}
CNPJ/CPF: ${contrato.cnpjContratante || '[NUMERO]'}
Endereco: ${contrato.enderecoContratante || '[ENDERECO COMPLETO]'}

CONTRATADA:
${contrato.contratada || '[NOME/RAZAO SOCIAL]'}
CNPJ/CPF: ${contrato.cnpjContratada || '[NUMERO]'}
Endereco: ${contrato.enderecoContratada || '[ENDERECO COMPLETO]'}

Resolvem celebrar o presente CONTRATO DE PRESTACAO DE SERVICOS,
que se regera pelas clausulas e condicoes seguintes:

─────────────────────────────────────────────────────────────
CLAUSULA PRIMEIRA - DO OBJETO
─────────────────────────────────────────────────────────────

1.1. O presente contrato tem por objeto a prestacao de servicos
de ${tipoLabel}, conforme especificado abaixo:

${contrato.objetoContrato || '[DESCREVER DETALHADAMENTE O SERVICO]'}

1.2. A CONTRATADA devera entregar os seguintes produtos/servicos:

${contrato.entregaveis || `a) [ENTREGAVEL 1]
b) [ENTREGAVEL 2]
c) [ENTREGAVEL 3]`}

─────────────────────────────────────────────────────────────
CLAUSULA SEGUNDA - DO PRECO E PAGAMENTO
─────────────────────────────────────────────────────────────

2.1. Pela execucao dos servicos ora contratados, a CONTRATANTE
pagara a CONTRATADA o valor total de ${contrato.valorTotal || 'R$ [VALOR]'}.

2.2. O pagamento sera realizado da seguinte forma:
${contrato.formaPagamento === 'avista' ? 'A vista, mediante emissao de nota fiscal.' :
contrato.formaPagamento === 'parcelado' ? `Em ${contrato.parcelas} parcelas mensais e sucessivas.` :
contrato.formaPagamento === 'recorrente' ? 'Mensalmente, ate o dia 10 de cada mes.' :
'Por entrega (milestone), conforme cronograma acordado.'}

2.3. O nao pagamento no prazo estipulado acarretara multa de 2%
(dois por cento) e juros de mora de 1% (um por cento) ao mes.

─────────────────────────────────────────────────────────────
CLAUSULA TERCEIRA - DO PRAZO
─────────────────────────────────────────────────────────────

3.1. O prazo para execucao dos servicos e de ${contrato.prazoExecucao || '[PRAZO]'},
contados a partir de ${contrato.dataInicio || '[DATA DE INICIO]'}.

3.2. O prazo podera ser prorrogado mediante acordo por escrito
entre as partes.

─────────────────────────────────────────────────────────────
CLAUSULA QUARTA - DAS OBRIGACOES DA CONTRATADA
─────────────────────────────────────────────────────────────

4.1. Executar os servicos com zelo, diligencia e honestidade;
4.2. Manter sigilo sobre informacoes confidenciais do CONTRATANTE;
4.3. Entregar os servicos nos prazos acordados;
4.4. Comunicar imediatamente qualquer impedimento;
4.5. Arcar com todos os encargos trabalhistas e previdenciarios.

─────────────────────────────────────────────────────────────
CLAUSULA QUINTA - DAS OBRIGACOES DO CONTRATANTE
─────────────────────────────────────────────────────────────

5.1. Efetuar os pagamentos nos prazos acordados;
5.2. Fornecer as informacoes necessarias para execucao;
5.3. Comunicar formalmente eventuais solicitacoes de mudanca;
5.4. Aprovar ou solicitar ajustes nas entregas em ate 5 dias uteis.

─────────────────────────────────────────────────────────────
CLAUSULA SEXTA - DA GARANTIA
─────────────────────────────────────────────────────────────

6.1. A CONTRATADA garante os servicos prestados pelo prazo de
${contrato.garantia || '30'} dias apos a entrega final, comprometendo-se a
corrigir eventuais defeitos sem custo adicional.

─────────────────────────────────────────────────────────────
CLAUSULA SETIMA - DA RESCISAO
─────────────────────────────────────────────────────────────

7.1. O presente contrato podera ser rescindido:
a) Por mutuo acordo entre as partes;
b) Por descumprimento de qualquer clausula;
c) Unilateralmente, mediante aviso previo de 30 dias.

7.2. Em caso de rescisao unilateral imotivada, a parte que der
causa pagara multa de ${contrato.multaRescisao || '20'}% sobre o valor do contrato.

─────────────────────────────────────────────────────────────
CLAUSULA OITAVA - DA PROPRIEDADE INTELECTUAL
─────────────────────────────────────────────────────────────

8.1. Todos os materiais desenvolvidos serao de propriedade
exclusiva do CONTRATANTE apos o pagamento integral.

8.2. A CONTRATADA podera utilizar os trabalhos em seu portfolio,
salvo acordo em contrario.

─────────────────────────────────────────────────────────────
CLAUSULA NONA - DO FORO
─────────────────────────────────────────────────────────────

9.1. As partes elegem o foro da Comarca de ${contrato.foro || '[CIDADE]'}
para dirimir quaisquer controversias oriundas deste contrato.

─────────────────────────────────────────────────────────────

E por estarem assim justas e acordadas, as partes assinam o
presente instrumento em 2 (duas) vias de igual teor e forma.

${contrato.foro || '[CIDADE]'}, ${dataFormatada}


_________________________________
CONTRATANTE: ${contrato.contratante || '[NOME]'}


_________________________________
CONTRATADA: ${contrato.contratada || '[NOME]'}


TESTEMUNHAS:

1. _________________________________

2. _________________________________

═══════════════════════════════════════════════════════════════
`
  }

  const copiarContrato = () => {
    navigator.clipboard.writeText(gerarContrato())
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
            <FileSignature className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Contrato de <span className="gold-text">Servico</span>
          </h1>
          <p className="text-[var(--gray)]">Modelo de contrato de prestacao de servicos</p>
        </div>

        {/* Tipo de Servico */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Tipo de Servico</h2>
          <select
            value={contrato.tipoServico}
            onChange={(e) => setContrato({ ...contrato, tipoServico: e.target.value })}
            className="input-field"
          >
            {tiposServico.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        {/* Contratante */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Contratante</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome/Razao Social</label>
              <input
                type="text"
                value={contrato.contratante}
                onChange={(e) => setContrato({ ...contrato, contratante: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">CNPJ/CPF</label>
              <input
                type="text"
                value={contrato.cnpjContratante}
                onChange={(e) => setContrato({ ...contrato, cnpjContratante: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Endereco</label>
              <input
                type="text"
                value={contrato.enderecoContratante}
                onChange={(e) => setContrato({ ...contrato, enderecoContratante: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Contratada */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Contratada</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome/Razao Social</label>
              <input
                type="text"
                value={contrato.contratada}
                onChange={(e) => setContrato({ ...contrato, contratada: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">CNPJ/CPF</label>
              <input
                type="text"
                value={contrato.cnpjContratada}
                onChange={(e) => setContrato({ ...contrato, cnpjContratada: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Endereco</label>
              <input
                type="text"
                value={contrato.enderecoContratada}
                onChange={(e) => setContrato({ ...contrato, enderecoContratada: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Objeto */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Objeto do Contrato</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Descricao do Servico</label>
              <textarea
                value={contrato.objetoContrato}
                onChange={(e) => setContrato({ ...contrato, objetoContrato: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Descreva detalhadamente os servicos a serem prestados..."
              />
            </div>
            <div>
              <label className="input-label">Entregaveis</label>
              <textarea
                value={contrato.entregaveis}
                onChange={(e) => setContrato({ ...contrato, entregaveis: e.target.value })}
                className="input-field min-h-[80px]"
                placeholder="a) Entregavel 1&#10;b) Entregavel 2&#10;c) Entregavel 3"
              />
            </div>
          </div>
        </div>

        {/* Pagamento */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Pagamento</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Valor Total</label>
              <input
                type="text"
                value={contrato.valorTotal}
                onChange={(e) => setContrato({ ...contrato, valorTotal: e.target.value })}
                className="input-field"
                placeholder="R$ 10.000,00"
              />
            </div>
            <div>
              <label className="input-label">Forma de Pagamento</label>
              <select
                value={contrato.formaPagamento}
                onChange={(e) => setContrato({ ...contrato, formaPagamento: e.target.value })}
                className="input-field"
              >
                {formasPagamento.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            {contrato.formaPagamento === 'parcelado' && (
              <div>
                <label className="input-label">Parcelas</label>
                <input
                  type="number"
                  value={contrato.parcelas}
                  onChange={(e) => setContrato({ ...contrato, parcelas: e.target.value })}
                  className="input-field"
                  min="2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Prazo */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Prazo e Garantia</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="input-label">Prazo de Execucao</label>
              <input
                type="text"
                value={contrato.prazoExecucao}
                onChange={(e) => setContrato({ ...contrato, prazoExecucao: e.target.value })}
                className="input-field"
                placeholder="30 dias"
              />
            </div>
            <div>
              <label className="input-label">Data de Inicio</label>
              <input
                type="date"
                value={contrato.dataInicio}
                onChange={(e) => setContrato({ ...contrato, dataInicio: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Garantia (dias)</label>
              <input
                type="number"
                value={contrato.garantia}
                onChange={(e) => setContrato({ ...contrato, garantia: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Multa Rescisao (%)</label>
              <input
                type="number"
                value={contrato.multaRescisao}
                onChange={(e) => setContrato({ ...contrato, multaRescisao: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Foro */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Foro (Cidade)</label>
              <input
                type="text"
                value={contrato.foro}
                onChange={(e) => setContrato({ ...contrato, foro: e.target.value })}
                className="input-field"
                placeholder="Sao Paulo"
              />
            </div>
            <div>
              <label className="input-label">Data de Assinatura</label>
              <input
                type="date"
                value={contrato.dataAssinatura}
                onChange={(e) => setContrato({ ...contrato, dataAssinatura: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarContrato} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Contrato'}
          </button>
        </div>

        {/* Aviso */}
        <div className="glass p-6 border border-yellow-500/30 bg-yellow-500/5">
          <p className="text-yellow-400 text-sm">
            <strong>Aviso Legal:</strong> Este modelo e apenas uma referencia.
            Recomendamos a revisao por um advogado antes de utiliza-lo.
          </p>
        </div>
      </div>
    </main>
  )
}
