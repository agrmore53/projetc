'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Copy, Check } from 'lucide-react'

export default function DREPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    periodo: 'Mensal',
    receitaBruta: 100000,
    devolucoes: 2000,
    impostos: 8000,
    custoMercadoria: 35000,
    despesasOperacionais: 20000,
    despesasAdministrativas: 10000,
    despesasComerciais: 8000,
    despesasFinanceiras: 3000,
    outrasReceitas: 1000,
    outrasDespesas: 500,
    provisaoIR: 0
  })

  // Calculos DRE
  const receitaLiquida = dados.receitaBruta - dados.devolucoes - dados.impostos
  const lucroBruto = receitaLiquida - dados.custoMercadoria
  const despesasTotal = dados.despesasOperacionais + dados.despesasAdministrativas + dados.despesasComerciais
  const lucroOperacional = lucroBruto - despesasTotal
  const resultadoFinanceiro = dados.outrasReceitas - dados.outrasDespesas - dados.despesasFinanceiras
  const lucroAntesIR = lucroOperacional + resultadoFinanceiro
  const lucroLiquido = lucroAntesIR - dados.provisaoIR

  // Margens
  const margemBruta = receitaLiquida > 0 ? (lucroBruto / receitaLiquida) * 100 : 0
  const margemOperacional = receitaLiquida > 0 ? (lucroOperacional / receitaLiquida) * 100 : 0
  const margemLiquida = receitaLiquida > 0 ? (lucroLiquido / receitaLiquida) * 100 : 0

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarDRE = () => {
    return `
DEMONSTRACAO DO RESULTADO DO EXERCICIO (DRE)
═══════════════════════════════════════════════════════════════
Periodo: ${dados.periodo}

RECEITAS
─────────────────────────────────────────────────────────────
Receita Bruta de Vendas                    ${formatarMoeda(dados.receitaBruta).padStart(15)}
(-) Devolucoes e Abatimentos               ${formatarMoeda(-dados.devolucoes).padStart(15)}
(-) Impostos sobre Vendas                  ${formatarMoeda(-dados.impostos).padStart(15)}
                                           ─────────────────
(=) RECEITA LIQUIDA                        ${formatarMoeda(receitaLiquida).padStart(15)}

CUSTOS
─────────────────────────────────────────────────────────────
(-) Custo das Mercadorias Vendidas         ${formatarMoeda(-dados.custoMercadoria).padStart(15)}
                                           ─────────────────
(=) LUCRO BRUTO                            ${formatarMoeda(lucroBruto).padStart(15)}
    Margem Bruta: ${margemBruta.toFixed(1)}%

DESPESAS OPERACIONAIS
─────────────────────────────────────────────────────────────
(-) Despesas Operacionais                  ${formatarMoeda(-dados.despesasOperacionais).padStart(15)}
(-) Despesas Administrativas               ${formatarMoeda(-dados.despesasAdministrativas).padStart(15)}
(-) Despesas Comerciais                    ${formatarMoeda(-dados.despesasComerciais).padStart(15)}
                                           ─────────────────
(=) LUCRO OPERACIONAL (EBIT)               ${formatarMoeda(lucroOperacional).padStart(15)}
    Margem Operacional: ${margemOperacional.toFixed(1)}%

RESULTADO FINANCEIRO
─────────────────────────────────────────────────────────────
(+) Outras Receitas                        ${formatarMoeda(dados.outrasReceitas).padStart(15)}
(-) Outras Despesas                        ${formatarMoeda(-dados.outrasDespesas).padStart(15)}
(-) Despesas Financeiras                   ${formatarMoeda(-dados.despesasFinanceiras).padStart(15)}
                                           ─────────────────
(=) LUCRO ANTES DO IR (LAIR)               ${formatarMoeda(lucroAntesIR).padStart(15)}

(-) Provisao para IR/CSLL                  ${formatarMoeda(-dados.provisaoIR).padStart(15)}
                                           ─────────────────
(=) LUCRO LIQUIDO                          ${formatarMoeda(lucroLiquido).padStart(15)}
    Margem Liquida: ${margemLiquida.toFixed(1)}%

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
  }

  const copiarDRE = () => {
    navigator.clipboard.writeText(gerarDRE())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCorValor = (valor: number) => {
    return valor >= 0 ? 'text-green-400' : 'text-red-400'
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
            <BarChart3 className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">DRE</span>
          </h1>
          <p className="text-[var(--gray)]">Demonstracao do Resultado do Exercicio</p>
        </div>

        {/* Periodo */}
        <div className="glass card mb-6">
          <div className="flex items-center gap-4">
            <label className="input-label mb-0">Periodo:</label>
            <select
              value={dados.periodo}
              onChange={(e) => setDados({ ...dados, periodo: e.target.value })}
              className="input-field w-40"
            >
              <option>Mensal</option>
              <option>Trimestral</option>
              <option>Semestral</option>
              <option>Anual</option>
            </select>
          </div>
        </div>

        {/* Receitas */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4 text-green-400">Receitas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Receita Bruta</label>
              <input
                type="number"
                value={dados.receitaBruta}
                onChange={(e) => setDados({ ...dados, receitaBruta: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Devolucoes</label>
              <input
                type="number"
                value={dados.devolucoes}
                onChange={(e) => setDados({ ...dados, devolucoes: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Impostos s/ Vendas</label>
              <input
                type="number"
                value={dados.impostos}
                onChange={(e) => setDados({ ...dados, impostos: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg flex justify-between">
            <span>Receita Liquida:</span>
            <span className="font-display text-green-400">{formatarMoeda(receitaLiquida)}</span>
          </div>
        </div>

        {/* Custos */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4 text-red-400">Custos</h2>
          <div>
            <label className="input-label">(-) Custo das Mercadorias (CMV)</label>
            <input
              type="number"
              value={dados.custoMercadoria}
              onChange={(e) => setDados({ ...dados, custoMercadoria: Number(e.target.value) })}
              className="input-field"
            />
          </div>
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg flex justify-between">
            <span>Lucro Bruto ({margemBruta.toFixed(1)}%):</span>
            <span className={`font-display ${getCorValor(lucroBruto)}`}>{formatarMoeda(lucroBruto)}</span>
          </div>
        </div>

        {/* Despesas Operacionais */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4 text-orange-400">Despesas Operacionais</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">(-) Operacionais</label>
              <input
                type="number"
                value={dados.despesasOperacionais}
                onChange={(e) => setDados({ ...dados, despesasOperacionais: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Administrativas</label>
              <input
                type="number"
                value={dados.despesasAdministrativas}
                onChange={(e) => setDados({ ...dados, despesasAdministrativas: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Comerciais</label>
              <input
                type="number"
                value={dados.despesasComerciais}
                onChange={(e) => setDados({ ...dados, despesasComerciais: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-500/10 rounded-lg flex justify-between">
            <span>Lucro Operacional - EBIT ({margemOperacional.toFixed(1)}%):</span>
            <span className={`font-display ${getCorValor(lucroOperacional)}`}>{formatarMoeda(lucroOperacional)}</span>
          </div>
        </div>

        {/* Resultado Financeiro */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4 text-yellow-400">Resultado Financeiro</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">(+) Outras Receitas</label>
              <input
                type="number"
                value={dados.outrasReceitas}
                onChange={(e) => setDados({ ...dados, outrasReceitas: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Outras Despesas</label>
              <input
                type="number"
                value={dados.outrasDespesas}
                onChange={(e) => setDados({ ...dados, outrasDespesas: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">(-) Despesas Financeiras</label>
              <input
                type="number"
                value={dados.despesasFinanceiras}
                onChange={(e) => setDados({ ...dados, despesasFinanceiras: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* IR */}
        <div className="glass card mb-6">
          <div>
            <label className="input-label">(-) Provisao IR/CSLL</label>
            <input
              type="number"
              value={dados.provisaoIR}
              onChange={(e) => setDados({ ...dados, provisaoIR: Number(e.target.value) })}
              className="input-field w-48"
            />
          </div>
        </div>

        {/* Resultado Final */}
        <div className={`glass card mb-8 border-2 ${lucroLiquido >= 0 ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
          <h2 className="font-display text-xl mb-4">Resultado Final</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-[var(--gray)]">Lucro Liquido</p>
              <p className={`font-display text-2xl ${getCorValor(lucroLiquido)}`}>{formatarMoeda(lucroLiquido)}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Margem Liquida</p>
              <p className={`font-display text-2xl ${getCorValor(margemLiquida)}`}>{margemLiquida.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray)]">Margem Bruta</p>
              <p className={`font-display text-2xl ${getCorValor(margemBruta)}`}>{margemBruta.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarDRE} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar DRE'}
          </button>
        </div>

        {/* Benchmarks */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Benchmarks de Margens</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Margem Bruta</h4>
              <ul className="space-y-1">
                <li>• Varejo: 25-35%</li>
                <li>• Servicos: 50-70%</li>
                <li>• SaaS: 70-85%</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Margem Operacional</h4>
              <ul className="space-y-1">
                <li>• Varejo: 5-10%</li>
                <li>• Servicos: 15-25%</li>
                <li>• Tech: 20-35%</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Margem Liquida</h4>
              <ul className="space-y-1">
                <li>• Varejo: 2-5%</li>
                <li>• Servicos: 10-20%</li>
                <li>• SaaS: 15-25%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
