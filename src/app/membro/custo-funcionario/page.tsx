'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, Copy, Check } from 'lucide-react'

export default function CustoFuncionarioPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    salarioBruto: 5000,
    valeTransporte: true,
    valorVT: 300,
    valeRefeicao: 600,
    planoSaude: 400,
    seguroVida: 50,
    outrosBeneficios: 0,
    horasExtras: 0,
    adicionalNoturno: 0,
    insalubridade: 0,
    periculosidade: 0
  })

  // Calcula INSS
  const calcularINSS = (salario: number) => {
    if (salario <= 1412) return salario * 0.075
    if (salario <= 2666.68) return 1412 * 0.075 + (salario - 1412) * 0.09
    if (salario <= 4000.03) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
    if (salario <= 7786.02) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
    return 908.85
  }

  // Calculos
  const inssEmpresa = dados.salarioBruto * 0.20
  const fgts = dados.salarioBruto * 0.08
  const terceiros = dados.salarioBruto * 0.058 // RAT + Sistema S
  const provisao13 = dados.salarioBruto / 12
  const fgts13 = provisao13 * 0.08
  const provisaoFerias = dados.salarioBruto / 12
  const tercoFerias = provisaoFerias / 3
  const fgtsFerias = (provisaoFerias + tercoFerias) * 0.08
  const descontoVT = dados.valeTransporte ? dados.salarioBruto * 0.06 : 0
  const custoVTEmpresa = dados.valeTransporte ? Math.max(0, dados.valorVT - descontoVT) : 0

  const encargos = {
    inssEmpresa,
    fgts,
    terceiros,
    provisao13,
    fgts13,
    provisaoFerias,
    tercoFerias,
    fgtsFerias
  }

  const totalEncargos = Object.values(encargos).reduce((a, b) => a + b, 0)

  const beneficios = {
    valeTransporte: custoVTEmpresa,
    valeRefeicao: dados.valeRefeicao,
    planoSaude: dados.planoSaude,
    seguroVida: dados.seguroVida,
    outros: dados.outrosBeneficios
  }

  const totalBeneficios = Object.values(beneficios).reduce((a, b) => a + b, 0)
  const custoTotal = dados.salarioBruto + totalEncargos + totalBeneficios
  const percentualEncargos = (totalEncargos / dados.salarioBruto) * 100

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
CALCULADORA DE CUSTO DE FUNCIONARIO
═══════════════════════════════════════════════════════════════

SALARIO
─────────────────────────────────────────────────────────────
Salario Bruto: ${formatarMoeda(dados.salarioBruto)}

ENCARGOS TRABALHISTAS
─────────────────────────────────────────────────────────────
INSS Patronal (20%):          ${formatarMoeda(inssEmpresa)}
FGTS (8%):                    ${formatarMoeda(fgts)}
RAT + Terceiros (5.8%):       ${formatarMoeda(terceiros)}
─────────────────────────────────────────────────────────────
Subtotal Encargos Mensais:    ${formatarMoeda(inssEmpresa + fgts + terceiros)}

PROVISOES
─────────────────────────────────────────────────────────────
Provisao 13o (1/12):          ${formatarMoeda(provisao13)}
FGTS sobre 13o:               ${formatarMoeda(fgts13)}
Provisao Ferias (1/12):       ${formatarMoeda(provisaoFerias)}
1/3 de Ferias:                ${formatarMoeda(tercoFerias)}
FGTS sobre Ferias:            ${formatarMoeda(fgtsFerias)}
─────────────────────────────────────────────────────────────
Subtotal Provisoes:           ${formatarMoeda(provisao13 + fgts13 + provisaoFerias + tercoFerias + fgtsFerias)}

TOTAL ENCARGOS:               ${formatarMoeda(totalEncargos)}
Percentual sobre salario:     ${percentualEncargos.toFixed(1)}%

BENEFICIOS
─────────────────────────────────────────────────────────────
Vale Transporte (custo emp.): ${formatarMoeda(beneficios.valeTransporte)}
Vale Refeicao:                ${formatarMoeda(beneficios.valeRefeicao)}
Plano de Saude:               ${formatarMoeda(beneficios.planoSaude)}
Seguro de Vida:               ${formatarMoeda(beneficios.seguroVida)}
Outros Beneficios:            ${formatarMoeda(beneficios.outros)}
─────────────────────────────────────────────────────────────
TOTAL BENEFICIOS:             ${formatarMoeda(totalBeneficios)}

═══════════════════════════════════════════════════════════════
                    RESUMO FINAL
═══════════════════════════════════════════════════════════════

Salario Bruto:                ${formatarMoeda(dados.salarioBruto)}
(+) Encargos:                 ${formatarMoeda(totalEncargos)}
(+) Beneficios:               ${formatarMoeda(totalBeneficios)}
─────────────────────────────────────────────────────────────
CUSTO TOTAL MENSAL:           ${formatarMoeda(custoTotal)}
CUSTO TOTAL ANUAL:            ${formatarMoeda(custoTotal * 12)}

Percentual total sobre salario: ${((custoTotal / dados.salarioBruto - 1) * 100).toFixed(1)}%

═══════════════════════════════════════════════════════════════
Calculo gerado em: ${new Date().toLocaleDateString('pt-BR')}
* Base: Tabela INSS 2024
`
  }

  const copiarRelatorio = () => {
    navigator.clipboard.writeText(gerarRelatorio())
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
            <Calculator className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Custo de <span className="gold-text">Funcionario</span>
          </h1>
          <p className="text-[var(--gray)]">Calcule o custo total de um colaborador CLT</p>
        </div>

        {/* Custo Total */}
        <div className="glass card mb-8 text-center border-2 border-[var(--gold)]/50">
          <p className="text-sm text-[var(--gray)]">Custo Total Mensal</p>
          <p className="font-display text-4xl text-[var(--gold)]">{formatarMoeda(custoTotal)}</p>
          <p className="text-sm text-[var(--gray)] mt-2">
            +{((custoTotal / dados.salarioBruto - 1) * 100).toFixed(1)}% sobre o salario bruto
          </p>
        </div>

        {/* Salario */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Salario</h2>
          <div>
            <label className="input-label">Salario Bruto (R$)</label>
            <input
              type="number"
              value={dados.salarioBruto}
              onChange={(e) => setDados({ ...dados, salarioBruto: Number(e.target.value) })}
              className="input-field"
              min="0"
            />
          </div>
        </div>

        {/* Beneficios */}
        <div className="glass card mb-6">
          <h2 className="font-display text-lg mb-4">Beneficios</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
              <input
                type="checkbox"
                checked={dados.valeTransporte}
                onChange={(e) => setDados({ ...dados, valeTransporte: e.target.checked })}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <span>Vale Transporte</span>
                {dados.valeTransporte && (
                  <input
                    type="number"
                    value={dados.valorVT}
                    onChange={(e) => setDados({ ...dados, valorVT: Number(e.target.value) })}
                    className="bg-black/30 border border-white/10 rounded px-2 py-1 w-24 ml-2"
                    placeholder="Valor"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="input-label">Vale Refeicao/Alimentacao</label>
              <input
                type="number"
                value={dados.valeRefeicao}
                onChange={(e) => setDados({ ...dados, valeRefeicao: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Plano de Saude</label>
              <input
                type="number"
                value={dados.planoSaude}
                onChange={(e) => setDados({ ...dados, planoSaude: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Seguro de Vida</label>
              <input
                type="number"
                value={dados.seguroVida}
                onChange={(e) => setDados({ ...dados, seguroVida: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Outros Beneficios</label>
              <input
                type="number"
                value={dados.outrosBeneficios}
                onChange={(e) => setDados({ ...dados, outrosBeneficios: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Detalhamento */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass card">
            <h3 className="text-sm text-[var(--gray)] mb-2">Encargos Mensais</h3>
            <p className="font-display text-xl text-red-400">{formatarMoeda(totalEncargos)}</p>
            <p className="text-xs text-[var(--gray)]">{percentualEncargos.toFixed(1)}% do salario</p>
          </div>
          <div className="glass card">
            <h3 className="text-sm text-[var(--gray)] mb-2">Beneficios</h3>
            <p className="font-display text-xl text-orange-400">{formatarMoeda(totalBeneficios)}</p>
            <p className="text-xs text-[var(--gray)]">{((totalBeneficios / dados.salarioBruto) * 100).toFixed(1)}% do salario</p>
          </div>
          <div className="glass card">
            <h3 className="text-sm text-[var(--gray)] mb-2">Custo Anual</h3>
            <p className="font-display text-xl text-[var(--gold)]">{formatarMoeda(custoTotal * 12)}</p>
            <p className="text-xs text-[var(--gray)]">12x mensal</p>
          </div>
        </div>

        {/* Detalhamento Encargos */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Detalhamento dos Encargos</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">INSS Patronal (20%)</span>
              <span>{formatarMoeda(inssEmpresa)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">FGTS (8%)</span>
              <span>{formatarMoeda(fgts)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">RAT + Terceiros (~5.8%)</span>
              <span>{formatarMoeda(terceiros)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">Provisao 13o Salario (1/12)</span>
              <span>{formatarMoeda(provisao13)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">FGTS sobre 13o</span>
              <span>{formatarMoeda(fgts13)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">Provisao Ferias (1/12)</span>
              <span>{formatarMoeda(provisaoFerias)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">1/3 Constitucional Ferias</span>
              <span>{formatarMoeda(tercoFerias)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-[var(--gray)]">FGTS sobre Ferias</span>
              <span>{formatarMoeda(fgtsFerias)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total Encargos</span>
              <span className="text-red-400">{formatarMoeda(totalEncargos)}</span>
            </div>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>
      </div>
    </main>
  )
}
