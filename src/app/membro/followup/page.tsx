'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Copy, Check, Sparkles, Clock, Target, Zap, Heart, AlertTriangle } from 'lucide-react'

interface EmailTemplate {
  id: string
  etapa: string
  titulo: string
  assunto: string
  corpo: string
  dica: string
  timing: string
}

const etapas = [
  { id: 'primeiro_contato', nome: 'Primeiro Contato', cor: 'bg-blue-500', icon: Mail },
  { id: 'pos_reuniao', nome: 'Pós-Reunião', cor: 'bg-green-500', icon: Target },
  { id: 'proposta_enviada', nome: 'Proposta Enviada', cor: 'bg-orange-500', icon: Zap },
  { id: 'sem_resposta', nome: 'Sem Resposta', cor: 'bg-yellow-500', icon: Clock },
  { id: 'reengajamento', nome: 'Reengajamento', cor: 'bg-purple-500', icon: Heart },
  { id: 'urgencia', nome: 'Urgência/Escassez', cor: 'bg-red-500', icon: AlertTriangle },
]

const templates: EmailTemplate[] = [
  // PRIMEIRO CONTATO
  {
    id: '1',
    etapa: 'primeiro_contato',
    titulo: 'Apresentação Direta',
    assunto: '[NOME_EMPRESA] - Solução para [DOR_PRINCIPAL]',
    corpo: `Olá [NOME],

Vi que a [EMPRESA_LEAD] está [CONTEXTO/SITUAÇÃO].

Trabalho com empresas do segmento de [SEGMENTO] que enfrentavam o mesmo desafio e conseguimos [RESULTADO_ESPECÍFICO].

Posso mostrar em 15 minutos como funciona?

Se fizer sentido, é só responder com sua disponibilidade.

Abraço,
[SEU_NOME]
[SEU_CARGO] | [SUA_EMPRESA]`,
    dica: 'Personalize o contexto pesquisando a empresa no LinkedIn ou site.',
    timing: 'Enviar de manhã (8h-10h) ou início da tarde (14h-15h)',
  },
  {
    id: '2',
    etapa: 'primeiro_contato',
    titulo: 'Abordagem com Case',
    assunto: 'Como a [EMPRESA_SIMILAR] economizou [X]% com [SOLUÇÃO]',
    corpo: `[NOME], tudo bem?

Recentemente ajudamos a [EMPRESA_SIMILAR] a resolver [PROBLEMA] e os resultados foram:

• [RESULTADO_1]
• [RESULTADO_2]
• [RESULTADO_3]

Acredito que a [EMPRESA_LEAD] poderia ter resultados semelhantes.

Vale uma conversa de 15 minutos para eu entender melhor o cenário de vocês?

Abraço,
[SEU_NOME]`,
    dica: 'Use um case real de uma empresa do mesmo segmento ou porte.',
    timing: 'Terça a quinta são os melhores dias para primeiro contato',
  },
  {
    id: '3',
    etapa: 'primeiro_contato',
    titulo: 'Pergunta Provocativa',
    assunto: 'Pergunta rápida sobre [ÁREA_DE_DOR]',
    corpo: `Oi [NOME],

Pergunta direta: quanto tempo por semana sua equipe gasta com [TAREFA_MANUAL]?

Pergunto porque empresas como [EXEMPLO_1] e [EXEMPLO_2] conseguiram reduzir isso em [X]% usando [TIPO_SOLUÇÃO].

Se esse é um problema para vocês também, posso mostrar como funciona.

[SEU_NOME]`,
    dica: 'A pergunta deve tocar em uma dor real e mensurável.',
    timing: 'E-mails curtos têm 50% mais chance de resposta',
  },

  // PÓS-REUNIÃO
  {
    id: '4',
    etapa: 'pos_reuniao',
    titulo: 'Resumo da Conversa',
    assunto: 'Resumo: nossa conversa sobre [TEMA]',
    corpo: `[NOME], obrigado pelo tempo hoje!

Como combinamos, segue o resumo dos pontos principais:

**Desafios identificados:**
• [DESAFIO_1]
• [DESAFIO_2]

**Solução proposta:**
• [SOLUÇÃO_1]
• [SOLUÇÃO_2]

**Próximos passos:**
• [PRÓXIMO_PASSO_1]
• [PRÓXIMO_PASSO_2]

Fico no aguardo do [AÇÃO_ESPERADA] até [DATA].

Qualquer dúvida, estou à disposição!

[SEU_NOME]`,
    dica: 'Envie em até 2 horas após a reunião, enquanto está fresco.',
    timing: 'Quanto mais rápido enviar, maior o impacto',
  },
  {
    id: '5',
    etapa: 'pos_reuniao',
    titulo: 'Envio de Material',
    assunto: 'Material complementar: [TEMA_DISCUTIDO]',
    corpo: `[NOME],

Conforme mencionei na nossa conversa, segue o material sobre [TEMA]:

📎 [NOME_DO_MATERIAL] - [LINK]

Destaco especialmente [PONTO_RELEVANTE] que se conecta diretamente com [NECESSIDADE_DO_LEAD].

Faz sentido agendarmos próxima conversa para [DATA_SUGERIDA]?

[SEU_NOME]`,
    dica: 'Sempre conecte o material com algo específico discutido na reunião.',
    timing: 'Enviar junto com o resumo ou no dia seguinte',
  },

  // PROPOSTA ENVIADA
  {
    id: '6',
    etapa: 'proposta_enviada',
    titulo: 'Confirmação de Recebimento',
    assunto: 'Proposta [EMPRESA_LEAD] - Próximos passos',
    corpo: `[NOME],

Enviei a proposta conforme combinamos. Conseguiu receber?

Resumo do que está incluso:

✅ [ITEM_1]
✅ [ITEM_2]
✅ [ITEM_3]

Investimento: [VALOR]
Condição especial válida até: [DATA]

Qual o melhor horário para tirar suas dúvidas?

[SEU_NOME]`,
    dica: 'Envie no mesmo dia da proposta, algumas horas depois.',
    timing: 'Follow-up de proposta: 2-3 dias após envio',
  },
  {
    id: '7',
    etapa: 'proposta_enviada',
    titulo: 'Quebra de Objeções',
    assunto: 'Re: Proposta [EMPRESA_LEAD]',
    corpo: `[NOME],

Passando para saber se teve chance de analisar a proposta.

Caso tenha alguma dúvida sobre:

• **Implementação:** levamos em média [X] dias para colocar no ar
• **Suporte:** você terá [TIPO_SUPORTE] durante toda a jornada
• **Resultados:** empresas similares viram retorno em [PRAZO]

Posso ajudar a esclarecer algum ponto específico?

[SEU_NOME]`,
    dica: 'Antecipe as principais objeções antes que elas apareçam.',
    timing: '3-5 dias após o primeiro follow-up',
  },

  // SEM RESPOSTA
  {
    id: '8',
    etapa: 'sem_resposta',
    titulo: 'Check-in Amigável',
    assunto: 'Ainda faz sentido, [NOME]?',
    corpo: `[NOME],

Não tive retorno do meu último e-mail e queria checar se ainda faz sentido conversarmos.

Entendo que a agenda está corrida. Se preferir:

📅 Podemos remarcar para [SUGESTÃO_DATA]
📞 Uma ligação rápida de 5 min
📧 Responde aqui mesmo com suas dúvidas

O que funciona melhor pra você?

[SEU_NOME]`,
    dica: 'Tom leve e sem pressão. Ofereça opções.',
    timing: '5-7 dias após último contato',
  },
  {
    id: '9',
    etapa: 'sem_resposta',
    titulo: 'Breakup Email',
    assunto: 'Fechando o ciclo - [EMPRESA_LEAD]',
    corpo: `[NOME],

Como não tive retorno, vou assumir que esse não é o momento ideal.

Sem problemas! Vou fechar esse ciclo por aqui.

Se no futuro [SOLUÇÃO] voltar a ser prioridade, é só me chamar.

Sucesso aí!

[SEU_NOME]

PS: Caso eu tenha entendido errado e você ainda tenha interesse, me avisa que retomamos.`,
    dica: 'O PS é poderoso - muitas respostas vêm do breakup email.',
    timing: 'Último e-mail da sequência (após 3-4 tentativas)',
  },

  // REENGAJAMENTO
  {
    id: '10',
    etapa: 'reengajamento',
    titulo: 'Novidade Relevante',
    assunto: 'Nova funcionalidade que pode te interessar',
    corpo: `[NOME], tudo bem?

Lembrei de você porque acabamos de lançar [NOVIDADE] que resolve exatamente [PROBLEMA_DISCUTIDO].

Algumas empresas já estão usando e os resultados são [RESULTADO].

Quer ver como funciona na prática?

[SEU_NOME]`,
    dica: 'Só reengaje com algo novo e relevante, não repita o mesmo pitch.',
    timing: '30-60 dias após último contato',
  },
  {
    id: '11',
    etapa: 'reengajamento',
    titulo: 'Conteúdo de Valor',
    assunto: '[NOME], achei que isso ia te interessar',
    corpo: `[NOME],

Publicamos um estudo sobre [TEMA_RELEVANTE] e lembrei da nossa conversa sobre [CONTEXTO].

📊 [TÍTULO_DO_CONTEÚDO]: [LINK]

O dado mais interessante: [INSIGHT_PRINCIPAL]

Se quiser trocar uma ideia sobre como isso se aplica à [EMPRESA_LEAD], me avisa!

[SEU_NOME]`,
    dica: 'Agregue valor genuíno, sem pedir nada em troca (pelo menos não diretamente).',
    timing: '45-90 dias após último contato',
  },

  // URGÊNCIA
  {
    id: '12',
    etapa: 'urgencia',
    titulo: 'Condição Especial',
    assunto: '⏰ [NOME], oferta válida até [DATA]',
    corpo: `[NOME],

Lembra da nossa conversa sobre [SOLUÇÃO]?

Estamos com uma condição especial para fechamentos até [DATA]:

🎁 [BENEFÍCIO_1]
🎁 [BENEFÍCIO_2]
🎁 [BENEFÍCIO_3]

Depois dessa data, a condição volta ao normal.

Vale a pena fechar agora?

[SEU_NOME]`,
    dica: 'Urgência só funciona se for real. Não crie escassez falsa.',
    timing: 'Use com moderação e apenas para leads quentes',
  },
  {
    id: '13',
    etapa: 'urgencia',
    titulo: 'Última Chance',
    assunto: 'Último dia: condição especial [EMPRESA_LEAD]',
    corpo: `[NOME],

Hoje é o último dia da condição que enviei.

Resumo rápido:
• [CONDIÇÃO_ESPECIAL]
• Válida até: HOJE, [HORÁRIO]

Se fizer sentido, me responde que garanto a condição.

Se não for o momento, sem problemas - seguimos conversando no futuro.

[SEU_NOME]`,
    dica: 'Seja honesto. Se a condição acabou, acabou mesmo.',
    timing: 'Dia final da oferta, de manhã',
  },
]

export default function FollowUpPage() {
  const [etapaSelecionada, setEtapaSelecionada] = useState<string>('primeiro_contato')
  const [templateSelecionado, setTemplateSelecionado] = useState<EmailTemplate | null>(null)
  const [copiado, setCopiado] = useState<string | null>(null)

  // Variáveis para personalização
  const [variaveis, setVariaveis] = useState({
    NOME: '',
    EMPRESA_LEAD: '',
    SEU_NOME: '',
    SUA_EMPRESA: '',
    SEU_CARGO: '',
  })

  const templatesFiltrados = templates.filter(t => t.etapa === etapaSelecionada)

  const copiarTexto = (texto: string, tipo: string) => {
    let textoFinal = texto

    // Substituir variáveis preenchidas
    Object.entries(variaveis).forEach(([key, value]) => {
      if (value) {
        textoFinal = textoFinal.replace(new RegExp(`\\[${key}\\]`, 'g'), value)
      }
    })

    navigator.clipboard.writeText(textoFinal)
    setCopiado(tipo)
    setTimeout(() => setCopiado(null), 2000)
  }

  const getEtapaInfo = (etapaId: string) => {
    return etapas.find(e => e.id === etapaId) || etapas[0]
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/membro"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Gerador de E-mails de Follow-up</h1>
            <p className="text-white/60">Sequências prontas para cada etapa do funil</p>
          </div>
        </div>

        {/* Personalização Rápida */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" />
            Personalização Rápida
          </h2>
          <p className="text-sm text-white/60 mb-4">
            Preencha para substituir automaticamente nos templates:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Nome do Lead"
              value={variaveis.NOME}
              onChange={(e) => setVariaveis({ ...variaveis, NOME: e.target.value })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Empresa do Lead"
              value={variaveis.EMPRESA_LEAD}
              onChange={(e) => setVariaveis({ ...variaveis, EMPRESA_LEAD: e.target.value })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Seu Nome"
              value={variaveis.SEU_NOME}
              onChange={(e) => setVariaveis({ ...variaveis, SEU_NOME: e.target.value })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Sua Empresa"
              value={variaveis.SUA_EMPRESA}
              onChange={(e) => setVariaveis({ ...variaveis, SUA_EMPRESA: e.target.value })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Seu Cargo"
              value={variaveis.SEU_CARGO}
              onChange={(e) => setVariaveis({ ...variaveis, SEU_CARGO: e.target.value })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Etapas do Funil */}
        <div className="flex flex-wrap gap-2 mb-8">
          {etapas.map((etapa) => {
            const Icon = etapa.icon
            const isSelected = etapaSelecionada === etapa.id
            const count = templates.filter(t => t.etapa === etapa.id).length

            return (
              <button
                key={etapa.id}
                onClick={() => {
                  setEtapaSelecionada(etapa.id)
                  setTemplateSelecionado(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isSelected
                    ? `${etapa.cor} text-white`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{etapa.nome}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de Templates */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Templates - {getEtapaInfo(etapaSelecionada).nome}
            </h2>

            {templatesFiltrados.map((template) => {
              const isSelected = templateSelecionado?.id === template.id

              return (
                <div
                  key={template.id}
                  onClick={() => setTemplateSelecionado(template)}
                  className={`glass rounded-xl p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-[var(--gold)] bg-[var(--gold)]/10'
                      : 'border border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{template.titulo}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {template.timing.split(' ').slice(0, 3).join(' ')}...
                    </span>
                  </div>

                  <p className="text-sm text-white/70 mb-3">
                    <span className="text-white/50">Assunto:</span> {template.assunto}
                  </p>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {template.corpo.substring(0, 150)}...
                  </p>
                </div>
              )
            })}
          </div>

          {/* Preview do Template */}
          <div className="lg:sticky lg:top-6">
            {templateSelecionado ? (
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{templateSelecionado.titulo}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${getEtapaInfo(templateSelecionado.etapa).cor}/20 ${getEtapaInfo(templateSelecionado.etapa).cor.replace('bg-', 'text-').replace('-500', '-400')}`}>
                    {getEtapaInfo(templateSelecionado.etapa).nome}
                  </span>
                </div>

                {/* Assunto */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Assunto</span>
                    <button
                      onClick={() => copiarTexto(templateSelecionado.assunto, 'assunto')}
                      className="flex items-center gap-1 text-xs text-[var(--gold)] hover:underline"
                    >
                      {copiado === 'assunto' ? (
                        <>
                          <Check className="w-3 h-3" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg font-medium">
                    {templateSelecionado.assunto}
                  </div>
                </div>

                {/* Corpo */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Corpo do E-mail</span>
                    <button
                      onClick={() => copiarTexto(templateSelecionado.corpo, 'corpo')}
                      className="flex items-center gap-1 text-xs text-[var(--gold)] hover:underline"
                    >
                      {copiado === 'corpo' ? (
                        <>
                          <Check className="w-3 h-3" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg whitespace-pre-wrap text-sm leading-relaxed max-h-[400px] overflow-y-auto">
                    {templateSelecionado.corpo}
                  </div>
                </div>

                {/* Dica */}
                <div className="p-4 bg-[var(--gold)]/10 rounded-lg border border-[var(--gold)]/30 mb-4">
                  <p className="text-sm font-medium text-[var(--gold)] mb-1">💡 Dica</p>
                  <p className="text-sm text-white/80">{templateSelecionado.dica}</p>
                </div>

                {/* Timing */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm font-medium text-blue-400 mb-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Melhor Momento
                  </p>
                  <p className="text-sm text-white/80">{templateSelecionado.timing}</p>
                </div>

                {/* Botão Copiar Tudo */}
                <button
                  onClick={() => copiarTexto(`Assunto: ${templateSelecionado.assunto}\n\n${templateSelecionado.corpo}`, 'tudo')}
                  className="w-full mt-6 py-3 bg-[var(--gold)] text-black rounded-lg font-medium hover:bg-[var(--gold)]/90 transition-colors flex items-center justify-center gap-2"
                >
                  {copiado === 'tudo' ? (
                    <>
                      <Check className="w-5 h-5" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" /> Copiar E-mail Completo
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className="text-white/50">Selecione um template para visualizar</p>
              </div>
            )}
          </div>
        </div>

        {/* Dicas Gerais */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">📧 Regras de Ouro do Follow-up</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Timing Perfeito</h4>
              <p className="text-sm text-white/70">
                Terça a quinta, das 8h-10h ou 14h-16h. Evite segundas e sextas.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Sequência Ideal</h4>
              <p className="text-sm text-white/70">
                5-7 touchpoints em 3 semanas. Depois, reengajamento mensal.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">Assunto Curto</h4>
              <p className="text-sm text-white/70">
                Até 50 caracteres. Personalize com o nome da empresa ou pessoa.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <h4 className="font-semibold text-[var(--gold)] mb-2">CTA Claro</h4>
              <p className="text-sm text-white/70">
                Um e-mail, uma ação. Não confunda com múltiplos pedidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
