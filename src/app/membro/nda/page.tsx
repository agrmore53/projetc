'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, Copy, Check } from 'lucide-react'

export default function NDAPage() {
  const [copied, setCopied] = useState(false)

  const [nda, setNda] = useState({
    tipoNDA: 'unilateral',
    parteReveladora: '',
    parteReceptora: '',
    cnpjReveladora: '',
    cnpjReceptora: '',
    enderecoReveladora: '',
    enderecoReceptora: '',
    objetoConfidencialidade: '',
    prazoVigencia: '2',
    prazoConfidencialidade: '5',
    dataAssinatura: new Date().toISOString().split('T')[0],
    cidadeAssinatura: '',
    testemunha1: '',
    testemunha2: ''
  })

  const tiposNDA = [
    { value: 'unilateral', label: 'Unilateral (uma parte revela)' },
    { value: 'bilateral', label: 'Bilateral (ambas revelam)' },
  ]

  const gerarNDA = () => {
    const dataFormatada = new Date(nda.dataAssinatura).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    return `
ACORDO DE CONFIDENCIALIDADE (NDA)
═══════════════════════════════════════════════════════════════

Pelo presente instrumento particular, as partes abaixo qualificadas:

${nda.tipoNDA === 'unilateral' ? 'PARTE REVELADORA' : 'PARTE 1'}:
${nda.parteReveladora || '[NOME/RAZAO SOCIAL]'}
CNPJ/CPF: ${nda.cnpjReveladora || '[NUMERO]'}
Endereco: ${nda.enderecoReveladora || '[ENDERECO COMPLETO]'}

${nda.tipoNDA === 'unilateral' ? 'PARTE RECEPTORA' : 'PARTE 2'}:
${nda.parteReceptora || '[NOME/RAZAO SOCIAL]'}
CNPJ/CPF: ${nda.cnpjReceptora || '[NUMERO]'}
Endereco: ${nda.enderecoReceptora || '[ENDERECO COMPLETO]'}

Resolvem celebrar o presente ACORDO DE CONFIDENCIALIDADE, que se
regera pelas clausulas e condicoes seguintes:

─────────────────────────────────────────────────────────────
CLAUSULA PRIMEIRA - DO OBJETO
─────────────────────────────────────────────────────────────

O presente acordo tem por objeto estabelecer as condicoes de
confidencialidade das informacoes ${nda.tipoNDA === 'unilateral' ? 'reveladas pela PARTE REVELADORA a PARTE RECEPTORA' : 'trocadas entre as partes'},
relacionadas a:

${nda.objetoConfidencialidade || '[DESCREVER O OBJETO/PROJETO]'}

─────────────────────────────────────────────────────────────
CLAUSULA SEGUNDA - DAS INFORMACOES CONFIDENCIAIS
─────────────────────────────────────────────────────────────

2.1. Serao consideradas "Informacoes Confidenciais" todas as
informacoes, dados, documentos, especificacoes, codigos,
metodologias, know-how, segredos comerciais e industriais,
planos de negocios, listas de clientes, estrategias,
projecoes financeiras e quaisquer outras informacoes,
independentemente de sua forma de apresentacao ou suporte.

2.2. Nao serao consideradas Informacoes Confidenciais aquelas que:
a) Sejam ou se tornem publicamente disponiveis sem violacao
   deste acordo;
b) Estejam legitimamente em posse da parte receptora antes
   de sua divulgacao;
c) Sejam desenvolvidas independentemente pela parte receptora;
d) Sejam divulgadas por ordem judicial ou determinacao legal.

─────────────────────────────────────────────────────────────
CLAUSULA TERCEIRA - DAS OBRIGACOES
─────────────────────────────────────────────────────────────

3.1. ${nda.tipoNDA === 'unilateral' ? 'A PARTE RECEPTORA' : 'As partes'} se compromete(m) a:

a) Manter sigilo absoluto sobre as Informacoes Confidenciais;
b) Utilizar as informacoes exclusivamente para a finalidade
   prevista neste acordo;
c) Nao reproduzir, copiar ou distribuir as informacoes sem
   autorizacao previa por escrito;
d) Limitar o acesso as informacoes apenas aos colaboradores
   que necessitem conhece-las, garantindo que estes estejam
   cientes e vinculados a obrigacoes de confidencialidade;
e) Devolver ou destruir todas as informacoes confidenciais
   ao termino deste acordo, mediante solicitacao.

─────────────────────────────────────────────────────────────
CLAUSULA QUARTA - DO PRAZO
─────────────────────────────────────────────────────────────

4.1. O presente acordo vigorara pelo prazo de ${nda.prazoVigencia || '2'} (${nda.prazoVigencia === '1' ? 'um' : nda.prazoVigencia === '2' ? 'dois' : nda.prazoVigencia}) ano(s)
a contar da data de sua assinatura.

4.2. As obrigacoes de confidencialidade permanecerao em vigor
por ${nda.prazoConfidencialidade || '5'} (${nda.prazoConfidencialidade === '1' ? 'um' : nda.prazoConfidencialidade === '2' ? 'dois' : nda.prazoConfidencialidade === '3' ? 'tres' : nda.prazoConfidencialidade === '5' ? 'cinco' : nda.prazoConfidencialidade}) ano(s) apos o termino deste acordo.

─────────────────────────────────────────────────────────────
CLAUSULA QUINTA - DAS PENALIDADES
─────────────────────────────────────────────────────────────

5.1. A violacao de qualquer das obrigacoes previstas neste
acordo sujeitara a parte infratora ao pagamento de multa
equivalente a 20% (vinte por cento) do valor do projeto
ou contrato relacionado, sem prejuizo da reparacao por
perdas e danos.

5.2. A parte infratora sera tambem responsavel por todos os
custos judiciais e honorarios advocaticios decorrentes
de acoes para fazer cumprir este acordo.

─────────────────────────────────────────────────────────────
CLAUSULA SEXTA - DISPOSICOES GERAIS
─────────────────────────────────────────────────────────────

6.1. Este acordo representa o entendimento integral entre as
partes sobre o tema aqui tratado.

6.2. Nenhuma das disposicoes deste acordo podera ser alterada
sem o consentimento previo e por escrito de ambas as partes.

6.3. As partes elegem o foro da Comarca de ${nda.cidadeAssinatura || '[CIDADE]'} para
dirimir quaisquer controversias oriundas deste acordo.

─────────────────────────────────────────────────────────────

E por estarem assim justas e acordadas, as partes assinam o
presente instrumento em 2 (duas) vias de igual teor e forma.

${nda.cidadeAssinatura || '[CIDADE]'}, ${dataFormatada}


_________________________________
${nda.parteReveladora || '[PARTE REVELADORA/PARTE 1]'}


_________________________________
${nda.parteReceptora || '[PARTE RECEPTORA/PARTE 2]'}


TESTEMUNHAS:

1. _________________________________
   Nome: ${nda.testemunha1 || '[TESTEMUNHA 1]'}

2. _________________________________
   Nome: ${nda.testemunha2 || '[TESTEMUNHA 2]'}

═══════════════════════════════════════════════════════════════
`
  }

  const copiarNDA = () => {
    navigator.clipboard.writeText(gerarNDA())
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
            <Lock className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">NDA</span>
          </h1>
          <p className="text-[var(--gray)]">Acordo de Confidencialidade</p>
        </div>

        {/* Tipo */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Tipo de NDA</h2>
          <div className="flex gap-4">
            {tiposNDA.map(t => (
              <button
                key={t.value}
                onClick={() => setNda({ ...nda, tipoNDA: t.value })}
                className={`px-4 py-2 rounded-xl transition-all ${
                  nda.tipoNDA === t.value
                    ? 'bg-[var(--gold)] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partes */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">
            {nda.tipoNDA === 'unilateral' ? 'Parte Reveladora' : 'Parte 1'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome/Razao Social</label>
              <input
                type="text"
                value={nda.parteReveladora}
                onChange={(e) => setNda({ ...nda, parteReveladora: e.target.value })}
                className="input-field"
                placeholder="Nome completo ou razao social"
              />
            </div>
            <div>
              <label className="input-label">CNPJ/CPF</label>
              <input
                type="text"
                value={nda.cnpjReveladora}
                onChange={(e) => setNda({ ...nda, cnpjReveladora: e.target.value })}
                className="input-field"
                placeholder="00.000.000/0001-00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Endereco</label>
              <input
                type="text"
                value={nda.enderecoReveladora}
                onChange={(e) => setNda({ ...nda, enderecoReveladora: e.target.value })}
                className="input-field"
                placeholder="Endereco completo"
              />
            </div>
          </div>
        </div>

        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">
            {nda.tipoNDA === 'unilateral' ? 'Parte Receptora' : 'Parte 2'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome/Razao Social</label>
              <input
                type="text"
                value={nda.parteReceptora}
                onChange={(e) => setNda({ ...nda, parteReceptora: e.target.value })}
                className="input-field"
                placeholder="Nome completo ou razao social"
              />
            </div>
            <div>
              <label className="input-label">CNPJ/CPF</label>
              <input
                type="text"
                value={nda.cnpjReceptora}
                onChange={(e) => setNda({ ...nda, cnpjReceptora: e.target.value })}
                className="input-field"
                placeholder="00.000.000/0001-00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Endereco</label>
              <input
                type="text"
                value={nda.enderecoReceptora}
                onChange={(e) => setNda({ ...nda, enderecoReceptora: e.target.value })}
                className="input-field"
                placeholder="Endereco completo"
              />
            </div>
          </div>
        </div>

        {/* Objeto e Prazos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Detalhes do Acordo</h2>
          <div className="space-y-4">
            <div>
              <label className="input-label">Objeto da Confidencialidade</label>
              <textarea
                value={nda.objetoConfidencialidade}
                onChange={(e) => setNda({ ...nda, objetoConfidencialidade: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Descreva o projeto, parceria ou assunto sobre o qual as informacoes serao compartilhadas..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Prazo de Vigencia (anos)</label>
                <select
                  value={nda.prazoVigencia}
                  onChange={(e) => setNda({ ...nda, prazoVigencia: e.target.value })}
                  className="input-field"
                >
                  <option value="1">1 ano</option>
                  <option value="2">2 anos</option>
                  <option value="3">3 anos</option>
                  <option value="5">5 anos</option>
                </select>
              </div>
              <div>
                <label className="input-label">Prazo de Confidencialidade (anos)</label>
                <select
                  value={nda.prazoConfidencialidade}
                  onChange={(e) => setNda({ ...nda, prazoConfidencialidade: e.target.value })}
                  className="input-field"
                >
                  <option value="2">2 anos</option>
                  <option value="3">3 anos</option>
                  <option value="5">5 anos</option>
                  <option value="10">10 anos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Assinatura */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Assinatura</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Cidade</label>
              <input
                type="text"
                value={nda.cidadeAssinatura}
                onChange={(e) => setNda({ ...nda, cidadeAssinatura: e.target.value })}
                className="input-field"
                placeholder="Sao Paulo"
              />
            </div>
            <div>
              <label className="input-label">Data</label>
              <input
                type="date"
                value={nda.dataAssinatura}
                onChange={(e) => setNda({ ...nda, dataAssinatura: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Testemunha 1</label>
              <input
                type="text"
                value={nda.testemunha1}
                onChange={(e) => setNda({ ...nda, testemunha1: e.target.value })}
                className="input-field"
                placeholder="Nome da testemunha"
              />
            </div>
            <div>
              <label className="input-label">Testemunha 2</label>
              <input
                type="text"
                value={nda.testemunha2}
                onChange={(e) => setNda({ ...nda, testemunha2: e.target.value })}
                className="input-field"
                placeholder="Nome da testemunha"
              />
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarNDA} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar NDA'}
          </button>
        </div>

        {/* Aviso */}
        <div className="glass p-6 border border-yellow-500/30 bg-yellow-500/5">
          <p className="text-yellow-400 text-sm">
            <strong>Aviso Legal:</strong> Este modelo e apenas uma referencia.
            Recomendamos a revisao por um advogado antes de utiliza-lo em
            situacoes reais para garantir adequacao as suas necessidades especificas.
          </p>
        </div>
      </div>
    </main>
  )
}
