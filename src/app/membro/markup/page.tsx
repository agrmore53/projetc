'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Percent, Copy, Check } from 'lucide-react'

export default function MarkupPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState({
    custoUnitario: 50,
    despesasFixas: 15, // %
    despesasVariaveis: 10, // %
    impostos: 8, // %
    margemDesejada: 20, // %
  })

  // Calculos
  const totalDespesas = dados.despesasFixas + dados.despesasVariaveis + dados.impostos
  const markupDivisor = 100 - totalDespesas - dados.margemDesejada
  const markupMultiplicador = markupDivisor > 0 ? 100 / markupDivisor : 0
  const precoVenda = dados.custoUnitario * markupMultiplicador
  const lucroUnitario = precoVenda - dados.custoUnitario - (precoVenda * totalDespesas / 100)
  const margemReal = precoVenda > 0 ? (lucroUnitario / precoVenda) * 100 : 0

  // Simulacao de volumes
  const volumes = [10, 50, 100, 500, 1000]
  const simulacoes = volumes.map(v => ({
    volume: v,
    faturamento: precoVenda * v,
    custoTotal: dados.custoUnitario * v,
    lucroTotal: lucroUnitario * v
  }))

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const gerarRelatorio = () => {
    return `
CALCULADORA DE MARKUP
═══════════════════════════════════════════════════════════════

DADOS DE ENTRADA
─────────────────────────────────────────────────────────────
Custo Unitario: ${formatarMoeda(dados.custoUnitario)}
Despesas Fixas: ${dados.despesasFixas}%
Despesas Variaveis: ${dados.despesasVariaveis}%
Impostos: ${dados.impostos}%
Margem Desejada: ${dados.margemDesejada}%

CALCULO DO MARKUP
─────────────────────────────────────────────────────────────
Total Despesas + Impostos: ${totalDespesas}%
Divisor Markup: ${markupDivisor.toFixed(2)}%
Markup Multiplicador: ${markupMultiplicador.toFixed(4)}x

RESULTADO
─────────────────────────────────────────────────────────────
Preco de Venda Sugerido: ${formatarMoeda(precoVenda)}
Lucro por Unidade: ${formatarMoeda(lucroUnitario)}
Margem Real: ${margemReal.toFixed(2)}%

SIMULACAO POR VOLUME
─────────────────────────────────────────────────────────────
${simulacoes.map(s =>
  `${s.volume.toString().padStart(5)} unid. | Faturamento: ${formatarMoeda(s.faturamento).padStart(12)} | Lucro: ${formatarMoeda(s.lucroTotal).padStart(12)}`
).join('\n')}

FORMULA UTILIZADA
─────────────────────────────────────────────────────────────
Markup = 100 / (100 - DF - DV - IMP - ML)
Preco = Custo x Markup

Onde:
DF = Despesas Fixas (${dados.despesasFixas}%)
DV = Despesas Variaveis (${dados.despesasVariaveis}%)
IMP = Impostos (${dados.impostos}%)
ML = Margem Liquida (${dados.margemDesejada}%)

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
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
            <Percent className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Calculadora de <span className="gold-text">Markup</span>
          </h1>
          <p className="text-[var(--gray)]">Calcule o preco de venda ideal</p>
        </div>

        {/* Inputs */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Dados do Produto/Servico</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Custo Unitario (R$)</label>
              <input
                type="number"
                value={dados.custoUnitario}
                onChange={(e) => setDados({ ...dados, custoUnitario: Number(e.target.value) })}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="input-label">Margem Desejada (%)</label>
              <input
                type="number"
                value={dados.margemDesejada}
                onChange={(e) => setDados({ ...dados, margemDesejada: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Despesas e Impostos (%)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="input-label">Despesas Fixas (%)</label>
              <input
                type="number"
                value={dados.despesasFixas}
                onChange={(e) => setDados({ ...dados, despesasFixas: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
              <p className="text-xs text-[var(--gray)] mt-1">Aluguel, salarios, etc.</p>
            </div>
            <div>
              <label className="input-label">Despesas Variaveis (%)</label>
              <input
                type="number"
                value={dados.despesasVariaveis}
                onChange={(e) => setDados({ ...dados, despesasVariaveis: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
              <p className="text-xs text-[var(--gray)] mt-1">Comissoes, frete, etc.</p>
            </div>
            <div>
              <label className="input-label">Impostos (%)</label>
              <input
                type="number"
                value={dados.impostos}
                onChange={(e) => setDados({ ...dados, impostos: Number(e.target.value) })}
                className="input-field"
                min="0"
                max="100"
              />
              <p className="text-xs text-[var(--gray)] mt-1">ICMS, ISS, PIS, etc.</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <p className="text-sm text-[var(--gray)]">
              Total de despesas + impostos: <span className="text-white font-semibold">{totalDespesas}%</span>
            </p>
          </div>
        </div>

        {/* Resultado */}
        {markupDivisor > 0 ? (
          <div className="glass card mb-8 border-2 border-[var(--gold)]/50">
            <h2 className="font-display text-xl mb-6">Resultado</h2>
            <div className="grid md:grid-cols-4 gap-4 text-center mb-6">
              <div>
                <p className="text-xs text-[var(--gray)]">Markup</p>
                <p className="font-display text-2xl text-[var(--gold)]">{markupMultiplicador.toFixed(2)}x</p>
              </div>
              <div>
                <p className="text-xs text-[var(--gray)]">Preco de Venda</p>
                <p className="font-display text-2xl text-green-400">{formatarMoeda(precoVenda)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--gray)]">Lucro/Unidade</p>
                <p className="font-display text-2xl text-green-400">{formatarMoeda(lucroUnitario)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--gray)]">Margem Real</p>
                <p className="font-display text-2xl text-[var(--gold)]">{margemReal.toFixed(1)}%</p>
              </div>
            </div>

            {/* Simulacao */}
            <h3 className="font-display text-lg mb-3">Simulacao por Volume</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2">Volume</th>
                    <th className="text-right p-2">Faturamento</th>
                    <th className="text-right p-2">Custo Total</th>
                    <th className="text-right p-2">Lucro Total</th>
                  </tr>
                </thead>
                <tbody>
                  {simulacoes.map(s => (
                    <tr key={s.volume} className="border-b border-white/5">
                      <td className="p-2">{s.volume} unidades</td>
                      <td className="p-2 text-right">{formatarMoeda(s.faturamento)}</td>
                      <td className="p-2 text-right text-red-400">{formatarMoeda(s.custoTotal)}</td>
                      <td className="p-2 text-right text-green-400">{formatarMoeda(s.lucroTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass card mb-8 border border-red-500/50 bg-red-500/10">
            <p className="text-red-400 font-semibold">⚠️ Configuracao invalida</p>
            <p className="text-sm text-[var(--gray)] mt-2">
              A soma de despesas, impostos e margem ({totalDespesas + dados.margemDesejada}%) nao pode ser maior ou igual a 100%.
            </p>
          </div>
        )}

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Relatorio'}
          </button>
        </div>

        {/* Formula */}
        <div className="glass p-6 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Formula do Markup</h3>
          <div className="bg-black/30 p-4 rounded-xl font-mono text-sm mb-4">
            <p>Markup = 100 / (100 - DF - DV - IMP - ML)</p>
            <p className="mt-2">Preco de Venda = Custo × Markup</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Variaveis</h4>
              <ul className="space-y-1">
                <li>• DF = Despesas Fixas</li>
                <li>• DV = Despesas Variaveis</li>
                <li>• IMP = Impostos</li>
                <li>• ML = Margem Liquida</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Dicas</h4>
              <ul className="space-y-1">
                <li>• Markup minimo: 2x para varejo</li>
                <li>• Considere a concorrencia</li>
                <li>• Revise custos periodicamente</li>
                <li>• Teste elasticidade de preco</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
