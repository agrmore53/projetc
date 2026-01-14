'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Copy, Check, CheckCircle2, Circle, AlertTriangle, Info } from 'lucide-react'

interface ItemChecklist {
  id: string
  categoria: string
  item: string
  descricao: string
  obrigatorio: boolean
  concluido: boolean
}

export default function LGPDPage() {
  const [copied, setCopied] = useState(false)

  const checklistInicial: ItemChecklist[] = [
    // Governanca
    { id: '1', categoria: 'Governanca', item: 'Nomear Encarregado (DPO)', descricao: 'Designar responsavel pelo tratamento de dados pessoais', obrigatorio: true, concluido: false },
    { id: '2', categoria: 'Governanca', item: 'Criar Politica de Privacidade', descricao: 'Documento publico explicando como dados sao tratados', obrigatorio: true, concluido: false },
    { id: '3', categoria: 'Governanca', item: 'Elaborar Termos de Uso', descricao: 'Definir regras de uso da plataforma', obrigatorio: true, concluido: false },
    { id: '4', categoria: 'Governanca', item: 'Criar politica interna de privacidade', descricao: 'Regras internas para colaboradores sobre tratamento de dados', obrigatorio: true, concluido: false },
    { id: '5', categoria: 'Governanca', item: 'Definir comite de privacidade', descricao: 'Grupo responsavel por decisoes sobre protecao de dados', obrigatorio: false, concluido: false },

    // Mapeamento
    { id: '6', categoria: 'Mapeamento de Dados', item: 'Inventariar dados coletados', descricao: 'Listar todos os dados pessoais que a empresa coleta', obrigatorio: true, concluido: false },
    { id: '7', categoria: 'Mapeamento de Dados', item: 'Identificar bases legais', descricao: 'Definir base legal (LGPD) para cada tratamento', obrigatorio: true, concluido: false },
    { id: '8', categoria: 'Mapeamento de Dados', item: 'Mapear fluxo de dados', descricao: 'Documentar como dados trafegam na organizacao', obrigatorio: true, concluido: false },
    { id: '9', categoria: 'Mapeamento de Dados', item: 'Identificar terceiros/processadores', descricao: 'Listar empresas que tem acesso aos dados', obrigatorio: true, concluido: false },
    { id: '10', categoria: 'Mapeamento de Dados', item: 'Classificar dados por sensibilidade', descricao: 'Separar dados comuns de dados sensiveis', obrigatorio: true, concluido: false },

    // Consentimento
    { id: '11', categoria: 'Consentimento', item: 'Implementar coleta de consentimento', descricao: 'Mecanismo claro para usuario aceitar tratamento', obrigatorio: true, concluido: false },
    { id: '12', categoria: 'Consentimento', item: 'Permitir revogacao de consentimento', descricao: 'Opcao facil para usuario retirar consentimento', obrigatorio: true, concluido: false },
    { id: '13', categoria: 'Consentimento', item: 'Registrar consentimentos', descricao: 'Manter log de quando e como consentimento foi dado', obrigatorio: true, concluido: false },
    { id: '14', categoria: 'Consentimento', item: 'Consentimento especifico para marketing', descricao: 'Opt-in separado para comunicacoes de marketing', obrigatorio: true, concluido: false },
    { id: '15', categoria: 'Consentimento', item: 'Banner de cookies', descricao: 'Aviso sobre uso de cookies com opcao de escolha', obrigatorio: true, concluido: false },

    // Direitos do Titular
    { id: '16', categoria: 'Direitos do Titular', item: 'Canal para solicitacoes', descricao: 'E-mail ou formulario para exercicio de direitos', obrigatorio: true, concluido: false },
    { id: '17', categoria: 'Direitos do Titular', item: 'Processo de confirmacao de dados', descricao: 'Procedimento para informar quais dados sao tratados', obrigatorio: true, concluido: false },
    { id: '18', categoria: 'Direitos do Titular', item: 'Processo de correcao de dados', descricao: 'Permitir que titular corrija dados incorretos', obrigatorio: true, concluido: false },
    { id: '19', categoria: 'Direitos do Titular', item: 'Processo de exclusao de dados', descricao: 'Procedimento para eliminar dados quando solicitado', obrigatorio: true, concluido: false },
    { id: '20', categoria: 'Direitos do Titular', item: 'Processo de portabilidade', descricao: 'Exportar dados em formato estruturado', obrigatorio: true, concluido: false },
    { id: '21', categoria: 'Direitos do Titular', item: 'Prazo de resposta (15 dias)', descricao: 'Garantir resposta em ate 15 dias uteis', obrigatorio: true, concluido: false },

    // Seguranca
    { id: '22', categoria: 'Seguranca', item: 'Criptografia de dados em transito', descricao: 'HTTPS/TLS em todas as comunicacoes', obrigatorio: true, concluido: false },
    { id: '23', categoria: 'Seguranca', item: 'Criptografia de dados em repouso', descricao: 'Dados armazenados de forma criptografada', obrigatorio: true, concluido: false },
    { id: '24', categoria: 'Seguranca', item: 'Controle de acesso', descricao: 'Acesso restrito apenas a quem precisa', obrigatorio: true, concluido: false },
    { id: '25', categoria: 'Seguranca', item: 'Logs de acesso', descricao: 'Registrar quem acessou quais dados e quando', obrigatorio: true, concluido: false },
    { id: '26', categoria: 'Seguranca', item: 'Backup seguro', descricao: 'Copias de seguranca criptografadas', obrigatorio: true, concluido: false },
    { id: '27', categoria: 'Seguranca', item: 'Plano de resposta a incidentes', descricao: 'Procedimento para vazamento de dados', obrigatorio: true, concluido: false },
    { id: '28', categoria: 'Seguranca', item: 'Teste de vulnerabilidades', descricao: 'Avaliacoes periodicas de seguranca', obrigatorio: false, concluido: false },

    // Contratos
    { id: '29', categoria: 'Contratos', item: 'Clausulas LGPD com fornecedores', descricao: 'Contratos com processadores incluem obrigacoes LGPD', obrigatorio: true, concluido: false },
    { id: '30', categoria: 'Contratos', item: 'DPA com processadores internacionais', descricao: 'Data Processing Agreement para transferencia internacional', obrigatorio: true, concluido: false },
    { id: '31', categoria: 'Contratos', item: 'Revisar contratos de trabalho', descricao: 'Incluir confidencialidade e protecao de dados', obrigatorio: true, concluido: false },

    // Treinamento
    { id: '32', categoria: 'Treinamento', item: 'Treinar colaboradores', descricao: 'Capacitacao sobre LGPD e protecao de dados', obrigatorio: true, concluido: false },
    { id: '33', categoria: 'Treinamento', item: 'Documentar treinamentos', descricao: 'Registro de presenca e conteudo ministrado', obrigatorio: false, concluido: false },
    { id: '34', categoria: 'Treinamento', item: 'Treinamento periodico', descricao: 'Reciclagem anual sobre boas praticas', obrigatorio: false, concluido: false },

    // Retencao
    { id: '35', categoria: 'Retencao e Eliminacao', item: 'Definir prazos de retencao', descricao: 'Tempo que cada tipo de dado sera mantido', obrigatorio: true, concluido: false },
    { id: '36', categoria: 'Retencao e Eliminacao', item: 'Processo de eliminacao segura', descricao: 'Procedimento para destruir dados adequadamente', obrigatorio: true, concluido: false },
    { id: '37', categoria: 'Retencao e Eliminacao', item: 'Anonimizacao quando possivel', descricao: 'Remover identificacao quando dados nao forem mais necessarios', obrigatorio: false, concluido: false },
  ]

  const [checklist, setChecklist] = useState<ItemChecklist[]>(checklistInicial)

  useEffect(() => {
    const saved = localStorage.getItem('lgpd_checklist')
    if (saved) {
      setChecklist(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lgpd_checklist', JSON.stringify(checklist))
  }, [checklist])

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, concluido: !item.concluido } : item
    ))
  }

  const categorias = [...new Set(checklist.map(item => item.categoria))]

  const getProgressoCategoria = (categoria: string) => {
    const items = checklist.filter(i => i.categoria === categoria)
    const concluidos = items.filter(i => i.concluido).length
    return { total: items.length, concluidos, porcentagem: (concluidos / items.length) * 100 }
  }

  const progressoGeral = {
    total: checklist.length,
    concluidos: checklist.filter(i => i.concluido).length,
    obrigatorios: checklist.filter(i => i.obrigatorio).length,
    obrigatoriosConcluidos: checklist.filter(i => i.obrigatorio && i.concluido).length
  }

  const porcentagemGeral = (progressoGeral.concluidos / progressoGeral.total) * 100
  const porcentagemObrigatorios = (progressoGeral.obrigatoriosConcluidos / progressoGeral.obrigatorios) * 100

  const copiarRelatorio = () => {
    const texto = `
RELATORIO DE CONFORMIDADE LGPD
Gerado em: ${new Date().toLocaleDateString('pt-BR')}

═══════════════════════════════════════════════════════════════

RESUMO GERAL
─────────────────────────────────────────────────────────────
Progresso Total: ${progressoGeral.concluidos}/${progressoGeral.total} (${porcentagemGeral.toFixed(0)}%)
Itens Obrigatorios: ${progressoGeral.obrigatoriosConcluidos}/${progressoGeral.obrigatorios} (${porcentagemObrigatorios.toFixed(0)}%)

STATUS: ${porcentagemObrigatorios === 100 ? 'CONFORME' : porcentagemObrigatorios >= 70 ? 'PARCIALMENTE CONFORME' : 'NAO CONFORME'}

═══════════════════════════════════════════════════════════════

PROGRESSO POR CATEGORIA
─────────────────────────────────────────────────────────────
${categorias.map(cat => {
  const prog = getProgressoCategoria(cat)
  return `${cat}: ${prog.concluidos}/${prog.total} (${prog.porcentagem.toFixed(0)}%)`
}).join('\n')}

═══════════════════════════════════════════════════════════════

ITENS PENDENTES (OBRIGATORIOS)
─────────────────────────────────────────────────────────────
${checklist.filter(i => i.obrigatorio && !i.concluido).map(i => `[ ] ${i.item} (${i.categoria})`).join('\n') || 'Nenhum item obrigatorio pendente!'}

═══════════════════════════════════════════════════════════════

ITENS CONCLUIDOS
─────────────────────────────────────────────────────────────
${checklist.filter(i => i.concluido).map(i => `[x] ${i.item}`).join('\n') || 'Nenhum item concluido ainda'}

═══════════════════════════════════════════════════════════════
`
    navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetarChecklist = () => {
    if (confirm('Tem certeza que deseja resetar todo o checklist?')) {
      setChecklist(checklistInicial)
      localStorage.removeItem('lgpd_checklist')
    }
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
            <ShieldCheck className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Checklist <span className="gold-text">LGPD</span>
          </h1>
          <p className="text-[var(--gray)]">Verifique a conformidade da sua empresa com a LGPD</p>
        </div>

        {/* Progresso Geral */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-[var(--gray)] mb-2">Progresso Total</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--gold)] transition-all"
                    style={{ width: `${porcentagemGeral}%` }}
                  />
                </div>
                <span className="font-display text-xl">{porcentagemGeral.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-[var(--gray)] mt-1">{progressoGeral.concluidos} de {progressoGeral.total} itens</p>
            </div>
            <div>
              <h3 className="text-sm text-[var(--gray)] mb-2">Itens Obrigatorios</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${porcentagemObrigatorios}%`,
                      backgroundColor: porcentagemObrigatorios === 100 ? '#22c55e' : porcentagemObrigatorios >= 70 ? '#eab308' : '#ef4444'
                    }}
                  />
                </div>
                <span className="font-display text-xl">{porcentagemObrigatorios.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-[var(--gray)] mt-1">{progressoGeral.obrigatoriosConcluidos} de {progressoGeral.obrigatorios} obrigatorios</p>
            </div>
          </div>

          {/* Status */}
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            porcentagemObrigatorios === 100 ? 'bg-green-500/20 border border-green-500/30' :
            porcentagemObrigatorios >= 70 ? 'bg-yellow-500/20 border border-yellow-500/30' :
            'bg-red-500/20 border border-red-500/30'
          }`}>
            {porcentagemObrigatorios === 100 ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-green-400">Conforme com a LGPD</p>
                  <p className="text-xs text-[var(--gray)]">Todos os itens obrigatorios foram implementados</p>
                </div>
              </>
            ) : porcentagemObrigatorios >= 70 ? (
              <>
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="font-semibold text-yellow-400">Parcialmente Conforme</p>
                  <p className="text-xs text-[var(--gray)]">Alguns itens obrigatorios ainda pendentes</p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-semibold text-red-400">Nao Conforme</p>
                  <p className="text-xs text-[var(--gray)]">Varios itens obrigatorios pendentes - risco de sancoes</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Checklist por Categoria */}
        {categorias.map(categoria => {
          const prog = getProgressoCategoria(categoria)
          const items = checklist.filter(i => i.categoria === categoria)

          return (
            <div key={categoria} className="glass card mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg">{categoria}</h2>
                <span className="text-sm text-[var(--gray)]">{prog.concluidos}/{prog.total}</span>
              </div>

              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      item.concluido ? 'bg-green-500/10' : 'bg-black/30 hover:bg-black/40'
                    }`}
                  >
                    {item.concluido ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--gray)] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${item.concluido ? 'line-through text-[var(--gray)]' : ''}`}>
                          {item.item}
                        </span>
                        {item.obrigatorio && (
                          <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">
                            Obrigatorio
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--gray)]">{item.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Acoes */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={copiarRelatorio} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Exportar Relatorio'}
          </button>
          <button onClick={resetarChecklist} className="btn-secondary flex items-center gap-2">
            Resetar Checklist
          </button>
        </div>

        {/* Info */}
        <div className="glass p-6 border border-blue-500/30 bg-blue-500/5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-lg text-blue-400 mb-2">Sobre a LGPD</h3>
              <p className="text-sm text-[var(--gray)] mb-2">
                A Lei Geral de Protecao de Dados (Lei no 13.709/2018) estabelece regras sobre coleta, armazenamento, tratamento e compartilhamento de dados pessoais.
              </p>
              <p className="text-sm text-[var(--gray)]">
                <strong>Sancoes:</strong> Multa de ate 2% do faturamento (limitada a R$ 50 milhoes por infracao), bloqueio ou eliminacao de dados, e publicizacao da infracao.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
