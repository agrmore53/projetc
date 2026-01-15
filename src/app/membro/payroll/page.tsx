'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Copy, Check, Plus, Trash2 } from 'lucide-react'

interface Funcionario {
  id: string
  nome: string
  cargo: string
  salarioBruto: number
  valeTransporte: boolean
  valeRefeicao: number
  planoSaude: number
  dependentes: number
}

export default function PayrollPage() {
  const [copied, setCopied] = useState(false)

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: '1', nome: 'Joao Silva', cargo: 'Desenvolvedor', salarioBruto: 8000, valeTransporte: true, valeRefeicao: 600, planoSaude: 400, dependentes: 2 },
    { id: '2', nome: 'Maria Santos', cargo: 'Designer', salarioBruto: 5000, valeTransporte: true, valeRefeicao: 600, planoSaude: 400, dependentes: 0 },
    { id: '3', nome: 'Pedro Souza', cargo: 'Gerente', salarioBruto: 12000, valeTransporte: false, valeRefeicao: 800, planoSaude: 600, dependentes: 3 },
  ])

  const calcularINSS = (salario: number) => {
    // Tabela INSS 2024
    if (salario <= 1412) return salario * 0.075
    if (salario <= 2666.68) return 1412 * 0.075 + (salario - 1412) * 0.09
    if (salario <= 4000.03) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
    if (salario <= 7786.02) return 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
    return 908.85 // Teto INSS
  }

  const calcularIRRF = (salario: number, inss: number, dependentes: number) => {
    const deducaoDependente = 189.59 * dependentes
    const baseCalculo = salario - inss - deducaoDependente

    if (baseCalculo <= 2259.20) return 0
    if (baseCalculo <= 2826.65) return baseCalculo * 0.075 - 169.44
    if (baseCalculo <= 3751.05) return baseCalculo * 0.15 - 381.44
    if (baseCalculo <= 4664.68) return baseCalculo * 0.225 - 662.77
    return baseCalculo * 0.275 - 896.00
  }

  const calcularVT = (salario: number, usaVT: boolean) => {
    if (!usaVT) return 0
    return salario * 0.06 // 6% do salario bruto
  }

  const calcularEncargos = (salario: number) => {
    return {
      fgts: salario * 0.08,
      inssEmpresa: salario * 0.20,
      terceiros: salario * 0.058, // Sistema S, INCRA, etc
      rat: salario * 0.02, // Risco acidente trabalho
      provisao13: salario / 12,
      provisaoFerias: (salario * 1.3333) / 12,
    }
  }

  const calcularTotalFuncionario = (func: Funcionario) => {
    const inss = calcularINSS(func.salarioBruto)
    const irrf = calcularIRRF(func.salarioBruto, inss, func.dependentes)
    const vt = calcularVT(func.salarioBruto, func.valeTransporte)
    const encargos = calcularEncargos(func.salarioBruto)

    const descontosFunc = inss + irrf + vt
    const salarioLiquido = func.salarioBruto - descontosFunc

    const custoEmpresa = func.salarioBruto +
      func.valeRefeicao +
      func.planoSaude +
      encargos.fgts +
      encargos.inssEmpresa +
      encargos.terceiros +
      encargos.rat +
      encargos.provisao13 +
      encargos.provisaoFerias

    return {
      inss,
      irrf,
      vt,
      descontosFunc,
      salarioLiquido,
      encargos,
      custoEmpresa
    }
  }

  const adicionarFuncionario = () => {
    setFuncionarios([...funcionarios, {
      id: Date.now().toString(),
      nome: '',
      cargo: '',
      salarioBruto: 0,
      valeTransporte: true,
      valeRefeicao: 0,
      planoSaude: 0,
      dependentes: 0
    }])
  }

  const removerFuncionario = (id: string) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id))
  }

  const atualizarFuncionario = (id: string, campo: keyof Funcionario, valor: any) => {
    setFuncionarios(funcionarios.map(f => f.id === id ? { ...f, [campo]: valor } : f))
  }

  const totalFolha = funcionarios.reduce((sum, f) => sum + f.salarioBruto, 0)
  const totalCustoEmpresa = funcionarios.reduce((sum, f) => sum + calcularTotalFuncionario(f).custoEmpresa, 0)
  const percentualEncargos = totalFolha > 0 ? ((totalCustoEmpresa - totalFolha) / totalFolha) * 100 : 0

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
RELATORIO DE FOLHA DE PAGAMENTO
═══════════════════════════════════════════════════════════════

RESUMO GERAL
─────────────────────────────────────────────────────────────
Total Funcionarios: ${funcionarios.length}
Total Folha Bruta: ${formatarMoeda(totalFolha)}
Total Custo Empresa: ${formatarMoeda(totalCustoEmpresa)}
Percentual Encargos: ${percentualEncargos.toFixed(1)}%

DETALHAMENTO POR FUNCIONARIO
─────────────────────────────────────────────────────────────
${funcionarios.filter(f => f.nome).map(f => {
  const calc = calcularTotalFuncionario(f)
  return `
${f.nome} - ${f.cargo}
  Salario Bruto: ${formatarMoeda(f.salarioBruto)}
  (-) INSS: ${formatarMoeda(calc.inss)}
  (-) IRRF: ${formatarMoeda(calc.irrf)}
  (-) VT: ${formatarMoeda(calc.vt)}
  (=) Salario Liquido: ${formatarMoeda(calc.salarioLiquido)}

  Encargos Empresa:
  (+) FGTS: ${formatarMoeda(calc.encargos.fgts)}
  (+) INSS Empresa: ${formatarMoeda(calc.encargos.inssEmpresa)}
  (+) VR: ${formatarMoeda(f.valeRefeicao)}
  (+) Plano Saude: ${formatarMoeda(f.planoSaude)}

  CUSTO TOTAL: ${formatarMoeda(calc.custoEmpresa)}`
}).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
* Valores calculados com base nas tabelas de INSS e IRRF 2024
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

      <div className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/membro" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Payroll</span>
          </h1>
          <p className="text-[var(--gray)]">Custo total de funcionarios CLT</p>
        </div>

        {/* Resumo */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Funcionarios</p>
            <p className="font-display text-2xl">{funcionarios.length}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Folha Bruta</p>
            <p className="font-display text-xl text-[var(--gold)]">{formatarMoeda(totalFolha)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">Custo Total</p>
            <p className="font-display text-xl text-red-400">{formatarMoeda(totalCustoEmpresa)}</p>
          </div>
          <div className="glass card text-center">
            <p className="text-xs text-[var(--gray)]">% Encargos</p>
            <p className="font-display text-xl text-orange-400">{percentualEncargos.toFixed(1)}%</p>
          </div>
        </div>

        {/* Botao Adicionar */}
        <div className="flex justify-end mb-4">
          <button onClick={adicionarFuncionario} className="btn-secondary text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Adicionar Funcionario
          </button>
        </div>

        {/* Lista de Funcionarios */}
        <div className="space-y-4 mb-8">
          {funcionarios.map(func => {
            const calc = calcularTotalFuncionario(func)
            return (
              <div key={func.id} className="glass card">
                <div className="grid md:grid-cols-6 gap-3 mb-4">
                  <div className="md:col-span-2">
                    <label className="input-label text-xs">Nome</label>
                    <input
                      type="text"
                      value={func.nome}
                      onChange={(e) => atualizarFuncionario(func.id, 'nome', e.target.value)}
                      className="input-field text-sm"
                      placeholder="Nome do funcionario"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Cargo</label>
                    <input
                      type="text"
                      value={func.cargo}
                      onChange={(e) => atualizarFuncionario(func.id, 'cargo', e.target.value)}
                      className="input-field text-sm"
                      placeholder="Cargo"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Salario Bruto</label>
                    <input
                      type="number"
                      value={func.salarioBruto}
                      onChange={(e) => atualizarFuncionario(func.id, 'salarioBruto', Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Dependentes</label>
                    <input
                      type="number"
                      value={func.dependentes}
                      onChange={(e) => atualizarFuncionario(func.id, 'dependentes', Number(e.target.value))}
                      className="input-field text-sm"
                      min="0"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={func.valeTransporte}
                        onChange={(e) => atualizarFuncionario(func.id, 'valeTransporte', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs">VT</span>
                    </div>
                    <button onClick={() => removerFuncionario(func.id)} className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="input-label text-xs">Vale Refeicao</label>
                    <input
                      type="number"
                      value={func.valeRefeicao}
                      onChange={(e) => atualizarFuncionario(func.id, 'valeRefeicao', Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="input-label text-xs">Plano de Saude</label>
                    <input
                      type="number"
                      value={func.planoSaude}
                      onChange={(e) => atualizarFuncionario(func.id, 'planoSaude', Number(e.target.value))}
                      className="input-field text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-white/10 text-center text-xs">
                  <div>
                    <p className="text-[var(--gray)]">INSS</p>
                    <p className="text-red-400">{formatarMoeda(calc.inss)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--gray)]">IRRF</p>
                    <p className="text-red-400">{formatarMoeda(calc.irrf)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--gray)]">Liquido</p>
                    <p className="text-green-400">{formatarMoeda(calc.salarioLiquido)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--gray)]">FGTS</p>
                    <p className="text-orange-400">{formatarMoeda(calc.encargos.fgts)}</p>
                  </div>
                  <div>
                    <p className="text-[var(--gray)]">Custo Total</p>
                    <p className="text-[var(--gold)] font-semibold">{formatarMoeda(calc.custoEmpresa)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>

        {/* Info */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Composicao dos Encargos</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Encargos Patronais</h4>
              <ul className="space-y-1">
                <li>• INSS Empresa: 20%</li>
                <li>• FGTS: 8%</li>
                <li>• Sistema S: ~5.8%</li>
                <li>• RAT: 1-3%</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Provisoes</h4>
              <ul className="space-y-1">
                <li>• 13o Salario: 1/12 por mes</li>
                <li>• Ferias + 1/3: 1/12 por mes</li>
                <li>• FGTS sobre 13o e ferias</li>
                <li>• Custo total: ~70-80% do bruto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
