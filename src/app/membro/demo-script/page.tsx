'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Monitor, Copy, Check, Clock, ChevronDown, ChevronUp, Play, Pause, Target, MessageCircle, Zap, Gift } from 'lucide-react'

interface Secao {
  id: string
  titulo: string
  duracao: number
  objetivo: string
  script: string
  dicas: string[]
  expandida: boolean
}

export default function DemoScriptPage() {
  const [copied, setCopied] = useState(false)
  const [nomeProduto, setNomeProduto] = useState('')
  const [duracaoTotal, setDuracaoTotal] = useState(30)

  const [secoes, setSecoes] = useState<Secao[]>([
    {
      id: '1',
      titulo: 'Abertura e Rapport',
      duracao: 3,
      objetivo: 'Criar conexao e definir expectativas',
      script: `Ola [NOME], tudo bem? Obrigado por separar esse tempo para conhecer o [PRODUTO].

Antes de comecar, me conta: voce ja teve a chance de dar uma olhada no nosso site ou algum material?

[OUVIR]

Otimo! Entao o que eu vou fazer hoje e te mostrar como o [PRODUTO] pode ajudar a [BENEFICIO PRINCIPAL]. Vou focar nas funcionalidades que fazem mais sentido para voce.

A demo vai durar cerca de [X] minutos e no final a gente conversa sobre proximos passos. Tudo certo?`,
      dicas: [
        'Sorria - mesmo por video, a energia transparece',
        'Use o nome do cliente pelo menos 2x nessa fase',
        'Confirme o tempo disponivel antes de comecar'
      ],
      expandida: true
    },
    {
      id: '2',
      titulo: 'Recapitular Discovery',
      duracao: 2,
      objetivo: 'Confirmar dores e alinhar expectativas',
      script: `Na nossa ultima conversa voce mencionou que [DOR 1] e [DOR 2] sao os principais desafios hoje.

Tambem entendi que seu objetivo e [OBJETIVO DO CLIENTE].

Isso ainda faz sentido? Mudou alguma coisa desde entao?

[OUVIR E AJUSTAR]

Perfeito, entao vou focar em mostrar como resolvemos exatamente esses pontos.`,
      dicas: [
        'Mostre que voce prestou atencao na discovery',
        'De espaco para o cliente corrigir ou adicionar informacoes',
        'Isso personaliza a demo e aumenta relevancia'
      ],
      expandida: false
    },
    {
      id: '3',
      titulo: 'Visao Geral do Produto',
      duracao: 3,
      objetivo: 'Contexto geral antes de mergulhar nos detalhes',
      script: `O [PRODUTO] e uma plataforma de [CATEGORIA] que ajuda empresas como a sua a [BENEFICIO PRINCIPAL].

Hoje mais de [NUMERO] empresas usam nosso produto, incluindo [CLIENTES CONHECIDOS].

A interface que voce esta vendo e o dashboard principal. Daqui voce consegue [ACOES PRINCIPAIS].

Vou te mostrar o fluxo completo de como [CASO DE USO PRINCIPAL].`,
      dicas: [
        'Nao mais que 2 minutos de overview',
        'Mencione clientes do mesmo segmento se possivel',
        'Mantenha o foco - nao mostre tudo, mostre o relevante'
      ],
      expandida: false
    },
    {
      id: '4',
      titulo: 'Demonstracao - Dor Principal',
      duracao: 8,
      objetivo: 'Resolver a dor #1 do cliente com o produto',
      script: `Voce mencionou que [DOR #1]. Deixa eu te mostrar como resolvemos isso.

[DEMONSTRAR FUNCIONALIDADE]

Percebe como aqui voce consegue [BENEFICIO]? Isso significa que voce nao precisa mais [PROBLEMA ANTIGO].

Na pratica, nossos clientes economizam [METRICA] usando essa funcionalidade.

O que voce acha? Isso faz sentido para o seu cenario?

[OUVIR E RESPONDER]`,
      dicas: [
        'Sempre conecte a feature com o problema especifico',
        'Use dados e metricas quando possivel',
        'Pare e pergunte - nao faca monologo'
      ],
      expandida: false
    },
    {
      id: '5',
      titulo: 'Demonstracao - Dor Secundaria',
      duracao: 6,
      objetivo: 'Resolver a dor #2 do cliente',
      script: `Outro ponto que voce mencionou foi [DOR #2].

Olha so como funciona: [DEMONSTRAR]

O legal disso e que [BENEFICIO DIFERENCIAL].

Clientes como [CASE SIMILAR] conseguiram [RESULTADO] usando essa funcionalidade.

Alguma duvida sobre essa parte?`,
      dicas: [
        'Mantenha o ritmo - nao aprofunde demais em features secundarias',
        'Sempre volte ao problema original',
        'Cases do mesmo segmento sao poderosos'
      ],
      expandida: false
    },
    {
      id: '6',
      titulo: 'Diferencial Competitivo',
      duracao: 3,
      objetivo: 'Mostrar o que te diferencia',
      script: `Uma coisa que nossos clientes sempre destacam e [DIFERENCIAL UNICO].

Diferente de outras solucoes no mercado, o [PRODUTO] [VANTAGEM EXCLUSIVA].

Isso significa que voce [BENEFICIO DO DIFERENCIAL].

E algo que nenhum outro produto oferece dessa forma.`,
      dicas: [
        'Seja especifico sobre o diferencial',
        'Evite falar mal de concorrentes diretamente',
        'Foque no beneficio, nao na feature'
      ],
      expandida: false
    },
    {
      id: '7',
      titulo: 'Prova Social',
      duracao: 2,
      objetivo: 'Validar com casos reais',
      script: `Para voce ter uma ideia, a [EMPRESA SIMILAR] estava na mesma situacao que voce.

Eles implementaram o [PRODUTO] em [TEMPO] e em [PERIODO] ja estavam vendo resultados.

Especificamente, conseguiram [RESULTADO QUANTIFICADO].

Inclusive posso te conectar com eles se quiser trocar uma ideia.`,
      dicas: [
        'Tenha 2-3 cases prontos do mesmo segmento',
        'Numeros especificos sao mais criveis',
        'Oferecer referencia mostra confianca'
      ],
      expandida: false
    },
    {
      id: '8',
      titulo: 'Q&A / Objecoes',
      duracao: 5,
      objetivo: 'Resolver duvidas e objecoes',
      script: `Bom, mostrei os principais pontos que fazem sentido para voce.

Antes de falar sobre proximos passos, que duvidas voce tem?

[OUVIR E RESPONDER]

[SE SURGIR OBJECAO DE PRECO]
Entendo a preocupacao com investimento. Deixa eu colocar em perspectiva: considerando que voce gasta [X] hoje com [PROBLEMA], o [PRODUTO] se paga em [TEMPO].

[SE SURGIR OBJECAO DE TIMING]
Faz sentido. O que eu sugiro e a gente estruturar um piloto para voce validar internamente sem compromisso.`,
      dicas: [
        'Deixe o cliente falar - nao interrompa',
        'Objecao e sinal de interesse',
        'Tenha respostas prontas para objecoes comuns'
      ],
      expandida: false
    },
    {
      id: '9',
      titulo: 'Fechamento e Proximos Passos',
      duracao: 3,
      objetivo: 'Definir acao concreta',
      script: `[NOME], com base no que conversamos, eu acredito que o [PRODUTO] pode realmente ajudar voces a [OBJETIVO].

O que eu sugiro como proximo passo e [ACAO ESPECIFICA]:
- Opcao A: Iniciar um trial de [X] dias para voce testar
- Opcao B: Agendar uma call com seu time tecnico
- Opcao C: Enviar uma proposta comercial formal

Qual dessas faz mais sentido para voce?

[OUVIR]

Otimo! Entao vou [ACAO COMBINADA]. Posso contar com voce para [COMPROMISSO DO CLIENTE]?`,
      dicas: [
        'Sempre termine com proximo passo definido',
        'De opcoes, mas guie para a melhor',
        'Consiga comprometimento do cliente'
      ],
      expandida: false
    }
  ])

  const toggleSecao = (id: string) => {
    setSecoes(secoes.map(s =>
      s.id === id ? { ...s, expandida: !s.expandida } : s
    ))
  }

  const atualizarSecao = (id: string, campo: keyof Secao, valor: unknown) => {
    setSecoes(secoes.map(s =>
      s.id === id ? { ...s, [campo]: valor } : s
    ))
  }

  const duracaoCalculada = secoes.reduce((acc, s) => acc + s.duracao, 0)

  const copiarScript = () => {
    const texto = `
═══════════════════════════════════════════════════════════════
              SCRIPT DE DEMONSTRACAO - ${nomeProduto || '[PRODUTO]'}
═══════════════════════════════════════════════════════════════
Duracao Total: ${duracaoCalculada} minutos

${secoes.map((s, i) => `
───────────────────────────────────────────────────────────────
${i + 1}. ${s.titulo.toUpperCase()} (${s.duracao} min)
───────────────────────────────────────────────────────────────
Objetivo: ${s.objetivo}

SCRIPT:
${s.script}

DICAS:
${s.dicas.map(d => `• ${d}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════════
Gerado em: ${new Date().toLocaleDateString('pt-BR')}
`
    navigator.clipboard.writeText(texto)
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
            <Monitor className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Demo Script</span>
          </h1>
          <p className="text-[var(--gray)]">Roteiro estruturado para demonstracoes de produto</p>
        </div>

        {/* Config */}
        <div className="glass card mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Nome do Produto</label>
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Ex: MeuSaaS Pro"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label flex justify-between">
                <span>Duracao Total</span>
                <span className="text-[var(--gold)]">{duracaoCalculada} min</span>
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--gray)]" />
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--gold)] transition-all"
                    style={{ width: `${Math.min((duracaoCalculada / 45) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--gray)]">/ 45 min ideal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acoes */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarScript} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Script Copiado!' : 'Copiar Script Completo'}
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {secoes.map((secao, index) => (
            <div key={secao.id} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSecao(secao.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] font-display">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{secao.titulo}</h3>
                    <p className="text-xs text-[var(--gray)]">{secao.objetivo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--gold)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {secao.duracao} min
                  </span>
                  {secao.expandida ? (
                    <ChevronUp className="w-5 h-5 text-[var(--gray)]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--gray)]" />
                  )}
                </div>
              </button>

              {secao.expandida && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <div className="mb-4">
                    <label className="input-label text-sm flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Script
                    </label>
                    <textarea
                      value={secao.script}
                      onChange={(e) => atualizarSecao(secao.id, 'script', e.target.value)}
                      className="input-field min-h-[200px] text-sm font-mono"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="input-label text-sm">Duracao (minutos)</label>
                      <input
                        type="number"
                        value={secao.duracao}
                        onChange={(e) => atualizarSecao(secao.id, 'duracao', Number(e.target.value))}
                        min="1"
                        max="15"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="input-label text-sm">Objetivo</label>
                      <input
                        type="text"
                        value={secao.objetivo}
                        onChange={(e) => atualizarSecao(secao.id, 'objetivo', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="bg-[var(--gold)]/10 rounded-lg p-4 border border-[var(--gold)]/30">
                    <h4 className="text-sm font-semibold text-[var(--gold)] mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Dicas para esta secao
                    </h4>
                    <ul className="text-sm text-[var(--gray)] space-y-1">
                      {secao.dicas.map((dica, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--gold)]">•</span>
                          {dica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dicas Gerais */}
        <div className="glass p-6 mt-8 border border-[var(--gold)]/30">
          <h3 className="font-display text-lg gold-text mb-4">Melhores Praticas de Demo</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-[var(--gray)]">
            <div>
              <h4 className="text-white font-semibold mb-2">Antes da Demo</h4>
              <ul className="space-y-1">
                <li>• Teste conexao e compartilhamento de tela</li>
                <li>• Feche abas e notificacoes desnecessarias</li>
                <li>• Revise anotacoes da discovery</li>
                <li>• Prepare dados de demo relevantes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Durante a Demo</h4>
              <ul className="space-y-1">
                <li>• Fale menos, mostre mais</li>
                <li>• Pare para perguntas a cada 5 minutos</li>
                <li>• Nao mostre tudo - foque no relevante</li>
                <li>• Observe reacoes e ajuste em tempo real</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
