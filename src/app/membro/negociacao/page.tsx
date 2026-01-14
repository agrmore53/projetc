'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, MessageSquare, Trophy, RotateCcw, ChevronRight, Star, Target, Zap } from 'lucide-react'

interface Scenario {
  id: string
  titulo: string
  contexto: string
  dificuldade: 'facil' | 'medio' | 'dificil'
  cliente: {
    nome: string
    cargo: string
    empresa: string
    perfil: string
  }
  situacao: string
  objetivo: string
  dialogos: {
    cliente: string
    opcoes: {
      texto: string
      tipo: 'otima' | 'boa' | 'ruim'
      feedback: string
      pontos: number
    }[]
  }[]
}

const cenarios: Scenario[] = [
  {
    id: '1',
    titulo: 'O Cliente que Quer Desconto',
    contexto: 'Fechamento de contrato SaaS',
    dificuldade: 'facil',
    cliente: {
      nome: 'Roberto',
      cargo: 'Diretor Comercial',
      empresa: 'TechCorp',
      perfil: 'Pragmático, foca em números'
    },
    situacao: 'O cliente gostou da demo, mas está pedindo 30% de desconto para fechar.',
    objetivo: 'Fechar o contrato mantendo a margem (máximo 10% de desconto)',
    dialogos: [
      {
        cliente: 'Olha, gostei muito da solução, mas 30% de desconto é o mínimo para eu conseguir aprovação interna. Sem isso, não consigo fechar.',
        opcoes: [
          {
            texto: 'Entendo, Roberto. Antes de falar de desconto, me ajuda a entender: qual o custo atual que vocês têm com o problema que vamos resolver?',
            tipo: 'otima',
            feedback: 'Excelente! Você reposicionou a conversa para valor, não preço.',
            pontos: 100
          },
          {
            texto: 'Posso fazer 15% de desconto, mas só se fecharmos hoje.',
            tipo: 'boa',
            feedback: 'Razoável, mas você cedeu rápido demais. Poderia explorar mais o valor primeiro.',
            pontos: 50
          },
          {
            texto: 'Infelizmente não consigo dar 30%. O máximo é 10%.',
            tipo: 'ruim',
            feedback: 'Você criou um impasse. Sempre busque entender antes de negar.',
            pontos: 20
          }
        ]
      },
      {
        cliente: 'Bom, estamos perdendo cerca de R$50 mil por mês com ineficiência. Mas ainda preciso do desconto para justificar internamente.',
        opcoes: [
          {
            texto: 'Então em 12 meses são R$600 mil em perdas. Nosso sistema custa R$36 mil/ano. Mesmo sem desconto, o ROI é de 16x. Faz sentido arriscar esse retorno por um desconto?',
            tipo: 'otima',
            feedback: 'Perfeito! Você usou os números dele para mostrar o valor real.',
            pontos: 100
          },
          {
            texto: 'Com esse volume de perda, faz total sentido investir na solução. Posso fazer 10% para facilitar.',
            tipo: 'boa',
            feedback: 'Bom argumento, mas você ofereceu desconto sem ele pedir novamente.',
            pontos: 60
          },
          {
            texto: 'Realmente é bastante. Vou ver o que consigo fazer de desconto.',
            tipo: 'ruim',
            feedback: 'Você demonstrou fraqueza e perdeu a oportunidade de fechar com margem.',
            pontos: 10
          }
        ]
      },
      {
        cliente: 'Ok, o ROI faz sentido. Mas meu CEO vai questionar se eu não conseguir nenhuma condição especial.',
        opcoes: [
          {
            texto: 'Entendo a posição. Que tal isso: em vez de desconto, incluo 2 meses grátis de onboarding premium, que normalmente custa R$8 mil. Assim você mostra uma conquista sem comprometer nosso relacionamento de longo prazo.',
            tipo: 'otima',
            feedback: 'Brilhante! Você ofereceu valor adicional em vez de cortar margem.',
            pontos: 100
          },
          {
            texto: 'Posso fazer 10% de desconto no primeiro ano. Assim você tem algo para mostrar.',
            tipo: 'boa',
            feedback: 'Aceitável, mas você poderia ter mantido a margem com outra estratégia.',
            pontos: 50
          },
          {
            texto: 'Infelizmente é o preço final. Não consigo fazer mais nada.',
            tipo: 'ruim',
            feedback: 'Você fechou portas desnecessariamente. Sempre ofereça alternativas.',
            pontos: 20
          }
        ]
      }
    ]
  },
  {
    id: '2',
    titulo: 'O Concorrente Mais Barato',
    contexto: 'Comparação competitiva',
    dificuldade: 'medio',
    cliente: {
      nome: 'Carla',
      cargo: 'Head de Operações',
      empresa: 'LogiMax',
      perfil: 'Analítica, compara muito'
    },
    situacao: 'A cliente está comparando você com um concorrente 40% mais barato.',
    objetivo: 'Mostrar diferencial de valor e fechar sem reduzir preço',
    dialogos: [
      {
        cliente: 'Recebi uma proposta do CompetidorX por 40% menos. Por que eu deveria pagar mais pela sua solução?',
        opcoes: [
          {
            texto: 'Ótima pergunta, Carla. Me conta: além do preço, quais critérios são mais importantes para vocês nessa decisão?',
            tipo: 'otima',
            feedback: 'Excelente! Você está descobrindo o que realmente importa para ela.',
            pontos: 100
          },
          {
            texto: 'Nosso produto tem muito mais funcionalidades e melhor suporte.',
            tipo: 'boa',
            feedback: 'Verdade, mas você não descobriu o que ela valoriza.',
            pontos: 40
          },
          {
            texto: 'Posso tentar cobrir a oferta deles. Deixa eu ver internamente.',
            tipo: 'ruim',
            feedback: 'Você entrou em guerra de preço. Isso destrói margens e posicionamento.',
            pontos: 10
          }
        ]
      },
      {
        cliente: 'Preciso de confiabilidade. Não posso ter o sistema fora do ar. E também quero um suporte que realmente resolva.',
        opcoes: [
          {
            texto: 'Perfeito. Nossa garantia de uptime é 99.9% com SLA de multa se descumprirmos. Suporte 24/7 em português com tempo médio de resposta de 15 minutos. O CompetidorX oferece isso?',
            tipo: 'otima',
            feedback: 'Você usou os critérios dela para mostrar seu diferencial.',
            pontos: 100
          },
          {
            texto: 'Nosso suporte é excelente e o sistema é muito estável.',
            tipo: 'boa',
            feedback: 'Correto, mas faltou comparar diretamente com o concorrente.',
            pontos: 50
          },
          {
            texto: 'Entendo. Vou preparar uma comparação detalhada e te envio.',
            tipo: 'ruim',
            feedback: 'Você perdeu o momento. A comparação deveria ser feita agora.',
            pontos: 20
          }
        ]
      },
      {
        cliente: 'Não sei se eles têm tudo isso. Mas 40% é muita diferença...',
        opcoes: [
          {
            texto: 'Carla, me permite uma conta rápida? Se o sistema ficar fora do ar 1 hora, quanto vocês perdem? E se o suporte demorar 24h para resolver? Às vezes o barato sai caro literalmente.',
            tipo: 'otima',
            feedback: 'Perfeito! Você transformou preço em custo total de ownership.',
            pontos: 100
          },
          {
            texto: 'Sugiro você verificar com eles esses pontos antes de decidir.',
            tipo: 'boa',
            feedback: 'Razoável, mas você deixou ela fazer o trabalho sozinha.',
            pontos: 40
          },
          {
            texto: 'Posso fazer 20% de desconto para ficar mais competitivo.',
            tipo: 'ruim',
            feedback: 'Você desvalorizou seu produto e entrou na guerra de preço.',
            pontos: 10
          }
        ]
      }
    ]
  },
  {
    id: '3',
    titulo: 'O Decisor Indeciso',
    contexto: 'Follow-up após proposta',
    dificuldade: 'dificil',
    cliente: {
      nome: 'Fernando',
      cargo: 'CEO',
      empresa: 'InnovaTech',
      perfil: 'Cauteloso, precisa de segurança'
    },
    situacao: 'Há 3 semanas você enviou proposta. O cliente sempre diz que vai decidir "na próxima semana".',
    objetivo: 'Descobrir a real objeção e destravar a venda',
    dialogos: [
      {
        cliente: 'Oi, ainda estamos analisando internamente. Semana que vem te dou um retorno definitivo.',
        opcoes: [
          {
            texto: 'Fernando, percebo que algo está impedindo a decisão. Posso ser direto? O que precisaria acontecer para você se sentir 100% seguro em avançar?',
            tipo: 'otima',
            feedback: 'Excelente! Você foi direto e abriu espaço para a objeção real.',
            pontos: 100
          },
          {
            texto: 'Ok, aguardo seu retorno. Qualquer dúvida, estou à disposição.',
            tipo: 'ruim',
            feedback: 'Você deixou ele no controle e vai esperar mais semanas.',
            pontos: 10
          },
          {
            texto: 'Entendo. Só para eu me programar, seria possível definir uma data específica?',
            tipo: 'boa',
            feedback: 'Melhor que aceitar, mas você não descobriu a objeção.',
            pontos: 40
          }
        ]
      },
      {
        cliente: 'Na verdade... meu sócio acha que é muito caro e que deveríamos esperar o próximo trimestre.',
        opcoes: [
          {
            texto: 'Agradeço a honestidade. Me conta: qual seria o custo de esperar mais 3 meses? O problema que discutimos vai melhorar ou piorar nesse período?',
            tipo: 'otima',
            feedback: 'Perfeito! Você criou urgência real baseada no problema dele.',
            pontos: 100
          },
          {
            texto: 'Entendo a preocupação. Posso fazer um desconto especial se fecharem agora.',
            tipo: 'boa',
            feedback: 'Você respondeu com desconto, mas a objeção era timing, não preço.',
            pontos: 30
          },
          {
            texto: 'Sem problemas, me procure quando estiverem prontos.',
            tipo: 'ruim',
            feedback: 'Você desistiu da venda. Provavelmente perdeu o cliente.',
            pontos: 5
          }
        ]
      },
      {
        cliente: 'O problema vai piorar sim. Estamos perdendo clientes. Mas convencer meu sócio é difícil.',
        opcoes: [
          {
            texto: 'Fernando, que tal marcarmos uma call de 20 minutos com você e seu sócio? Trago dados de clientes similares que estavam na mesma situação. Às vezes uma perspectiva externa ajuda.',
            tipo: 'otima',
            feedback: 'Brilhante! Você se ofereceu para ajudar a vender internamente.',
            pontos: 100
          },
          {
            texto: 'Posso enviar um material com cases de sucesso para você mostrar a ele.',
            tipo: 'boa',
            feedback: 'Bom, mas você delegou a venda para ele. Material sozinho raramente convence.',
            pontos: 50
          },
          {
            texto: 'Infelizmente não posso fazer muito se ele não quer. Fico no aguardo.',
            tipo: 'ruim',
            feedback: 'Você desistiu quando tinha uma oportunidade clara de avançar.',
            pontos: 10
          }
        ]
      }
    ]
  }
]

export default function NegociacaoPage() {
  const [cenarioAtual, setCenarioAtual] = useState<Scenario | null>(null)
  const [dialogoAtual, setDialogoAtual] = useState(0)
  const [pontuacao, setPontuacao] = useState(0)
  const [respostas, setRespostas] = useState<{texto: string, tipo: string, feedback: string, pontos: number}[]>([])
  const [mostrarFeedback, setMostrarFeedback] = useState(false)
  const [feedbackAtual, setFeedbackAtual] = useState<{texto: string, tipo: string, feedback: string, pontos: number} | null>(null)
  const [finalizado, setFinalizado] = useState(false)

  const iniciarCenario = (cenario: Scenario) => {
    setCenarioAtual(cenario)
    setDialogoAtual(0)
    setPontuacao(0)
    setRespostas([])
    setFinalizado(false)
  }

  const responder = (opcao: {texto: string, tipo: 'otima' | 'boa' | 'ruim', feedback: string, pontos: number}) => {
    setFeedbackAtual(opcao)
    setMostrarFeedback(true)
    setPontuacao(prev => prev + opcao.pontos)
    setRespostas(prev => [...prev, opcao])
  }

  const proximoDialogo = () => {
    setMostrarFeedback(false)
    setFeedbackAtual(null)

    if (cenarioAtual && dialogoAtual < cenarioAtual.dialogos.length - 1) {
      setDialogoAtual(prev => prev + 1)
    } else {
      setFinalizado(true)
    }
  }

  const resetar = () => {
    setCenarioAtual(null)
    setDialogoAtual(0)
    setPontuacao(0)
    setRespostas([])
    setFinalizado(false)
    setMostrarFeedback(false)
    setFeedbackAtual(null)
  }

  const getClassificacao = () => {
    const maxPontos = cenarioAtual ? cenarioAtual.dialogos.length * 100 : 300
    const percentual = (pontuacao / maxPontos) * 100

    if (percentual >= 90) return { titulo: 'Expert em Negociação', cor: 'text-green-400', estrelas: 5 }
    if (percentual >= 70) return { titulo: 'Negociador Habilidoso', cor: 'text-[var(--gold)]', estrelas: 4 }
    if (percentual >= 50) return { titulo: 'Em Desenvolvimento', cor: 'text-yellow-400', estrelas: 3 }
    if (percentual >= 30) return { titulo: 'Precisa Praticar', cor: 'text-orange-400', estrelas: 2 }
    return { titulo: 'Iniciante', cor: 'text-red-400', estrelas: 1 }
  }

  const getDificuldadeCor = (dif: string) => {
    switch(dif) {
      case 'facil': return 'bg-green-500/20 text-green-400'
      case 'medio': return 'bg-yellow-500/20 text-yellow-400'
      case 'dificil': return 'bg-red-500/20 text-red-400'
      default: return ''
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
            <Users className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Simulador de <span className="gold-text">Negociação</span>
          </h1>
          <p className="text-[var(--gray)]">Pratique cenários reais e aprimore suas habilidades</p>
        </div>

        {!cenarioAtual ? (
          <div className="space-y-4 animate-fadeInUp">
            <h2 className="font-display text-xl mb-4">Escolha um Cenário:</h2>
            {cenarios.map(cenario => (
              <button
                key={cenario.id}
                onClick={() => iniciarCenario(cenario)}
                className="w-full glass p-6 text-left hover:border-[var(--gold)] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg">{cenario.titulo}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDificuldadeCor(cenario.dificuldade)}`}>
                        {cenario.dificuldade === 'facil' ? 'Fácil' : cenario.dificuldade === 'medio' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>
                    <p className="text-[var(--gray)] text-sm mb-3">{cenario.situacao}</p>
                    <div className="flex items-center gap-4 text-xs text-[var(--gray)]">
                      <span>Cliente: {cenario.cliente.nome}</span>
                      <span>•</span>
                      <span>{cenario.cliente.cargo}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--gold)] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        ) : finalizado ? (
          <div className="glass card text-center animate-fadeInUp">
            <Trophy className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-2">Cenário Concluído!</h2>

            <div className="my-6">
              <p className="text-4xl font-display gold-text mb-2">{pontuacao} pontos</p>
              <p className={`font-display text-xl ${getClassificacao().cor}`}>
                {getClassificacao().titulo}
              </p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < getClassificacao().estrelas ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-white/20'}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-left bg-white/5 rounded-xl p-6 mb-6">
              <h3 className="font-display text-lg mb-4">Resumo das Respostas:</h3>
              {respostas.map((r, i) => (
                <div key={i} className="mb-4 pb-4 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      r.tipo === 'otima' ? 'bg-green-500/20 text-green-400' :
                      r.tipo === 'boa' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {r.tipo === 'otima' ? 'Ótima' : r.tipo === 'boa' ? 'Boa' : 'Ruim'}
                    </span>
                    <span className="text-[var(--gold)]">+{r.pontos} pts</span>
                  </div>
                  <p className="text-sm text-[var(--gray)]">{r.feedback}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={resetar} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Novo Cenário
              </button>
              <button onClick={() => iniciarCenario(cenarioAtual)} className="btn-primary flex-1">
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fadeInUp">
            {/* Header do Cenário */}
            <div className="glass p-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg">{cenarioAtual.titulo}</h2>
                <p className="text-sm text-[var(--gray)]">Objetivo: {cenarioAtual.objetivo}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display gold-text">{pontuacao}</p>
                <p className="text-xs text-[var(--gray)]">pontos</p>
              </div>
            </div>

            {/* Progresso */}
            <div className="flex gap-2 mb-6">
              {cenarioAtual.dialogos.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < dialogoAtual ? 'bg-[var(--gold)]' :
                    i === dialogoAtual ? 'bg-[var(--gold)]/50' :
                    'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Cliente Info */}
            <div className="glass p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--gold)]/20 rounded-full flex items-center justify-center">
                  <span className="font-display text-[var(--gold)]">{cenarioAtual.cliente.nome[0]}</span>
                </div>
                <div>
                  <h3 className="font-display">{cenarioAtual.cliente.nome}</h3>
                  <p className="text-sm text-[var(--gray)]">{cenarioAtual.cliente.cargo} - {cenarioAtual.cliente.empresa}</p>
                </div>
              </div>
            </div>

            {/* Diálogo */}
            <div className="glass card mb-6">
              <div className="flex items-start gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-[var(--gold)] mt-1" />
                <p className="text-lg">{cenarioAtual.dialogos[dialogoAtual].cliente}</p>
              </div>

              {!mostrarFeedback ? (
                <div className="space-y-3">
                  <p className="text-sm text-[var(--gray)] mb-4">Como você responde?</p>
                  {cenarioAtual.dialogos[dialogoAtual].opcoes.map((opcao, i) => (
                    <button
                      key={i}
                      onClick={() => responder(opcao)}
                      className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[var(--gold)]/50 transition-all"
                    >
                      {opcao.texto}
                    </button>
                  ))}
                </div>
              ) : feedbackAtual && (
                <div className="animate-fadeInUp">
                  <div className={`p-4 rounded-xl mb-4 ${
                    feedbackAtual.tipo === 'otima' ? 'bg-green-500/20 border border-green-500/50' :
                    feedbackAtual.tipo === 'boa' ? 'bg-yellow-500/20 border border-yellow-500/50' :
                    'bg-red-500/20 border border-red-500/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display">
                        {feedbackAtual.tipo === 'otima' ? '✅ Resposta Ótima!' :
                         feedbackAtual.tipo === 'boa' ? '⚡ Resposta Boa' :
                         '❌ Resposta Ruim'}
                      </span>
                      <span className="text-[var(--gold)]">+{feedbackAtual.pontos} pts</span>
                    </div>
                    <p className="text-sm">{feedbackAtual.feedback}</p>
                  </div>

                  <button onClick={proximoDialogo} className="btn-primary w-full">
                    {dialogoAtual < cenarioAtual.dialogos.length - 1 ? 'Continuar' : 'Ver Resultado'}
                  </button>
                </div>
              )}
            </div>

            <button onClick={resetar} className="text-[var(--gray)] hover:text-[var(--gold)] text-sm">
              ← Escolher outro cenário
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
