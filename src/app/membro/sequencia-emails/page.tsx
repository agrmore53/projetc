'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Copy, Check, ChevronLeft, ChevronRight, Zap, Clock, Target } from 'lucide-react'

interface EmailSequence {
  emails: {
    dia: number
    assunto: string
    corpo: string
    objetivo: string
  }[]
}

export default function SequenciaEmailsPage() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState<string | null>(null)
  const [emailAtual, setEmailAtual] = useState(0)
  const [sequencia, setSequencia] = useState<EmailSequence | null>(null)
  const [formData, setFormData] = useState({
    tipo: 'nurturing',
    produto: '',
    avatar: '',
    problema: '',
    beneficio: '',
    preco: '',
    urgencia: ''
  })

  const tiposSequencia = [
    { id: 'nurturing', nome: 'Nutrição de Leads', desc: 'Educar e aquecer leads frios', dias: 14 },
    { id: 'lancamento', nome: 'Lançamento', desc: 'Sequência de 7 dias para lançamento', dias: 7 },
    { id: 'carrinho', nome: 'Carrinho Abandonado', desc: 'Recuperar vendas perdidas', dias: 5 },
    { id: 'onboarding', nome: 'Onboarding', desc: 'Boas-vindas para novos clientes', dias: 7 },
    { id: 'reativacao', nome: 'Reativação', desc: 'Reconquistar clientes inativos', dias: 10 },
  ]

  const gerarSequencia = () => {
    let emails: EmailSequence['emails'] = []

    if (formData.tipo === 'nurturing') {
      emails = [
        { dia: 0, assunto: `${formData.avatar}, você não está sozinho`, corpo: `Olá!\n\nSei que ${formData.problema} é algo que te incomoda. E você não está sozinho nisso.\n\nNos próximos dias, vou compartilhar conteúdos que vão te ajudar a entender melhor esse desafio e como superá-lo.\n\nFique de olho na sua caixa de entrada.\n\nAbraço!`, objetivo: 'Criar conexão e expectativa' },
        { dia: 2, assunto: `O erro #1 que impede ${formData.avatar} de ${formData.beneficio}`, corpo: `Olá!\n\nVocê sabia que a maioria das pessoas que tentam ${formData.beneficio} cometem o mesmo erro?\n\nElas focam no lugar errado.\n\nEm vez de [abordagem errada], deveriam focar em [abordagem certa].\n\nNo próximo e-mail, vou te mostrar exatamente o que fazer.\n\nAté lá!`, objetivo: 'Educar e gerar curiosidade' },
        { dia: 4, assunto: `3 passos para ${formData.beneficio}`, corpo: `Olá!\n\nHoje vou direto ao ponto. Aqui estão os 3 passos para ${formData.beneficio}:\n\n1️⃣ [Passo 1 - Diagnóstico]\nAntes de agir, entenda onde você está.\n\n2️⃣ [Passo 2 - Planejamento]\nDefina metas claras e prazos realistas.\n\n3️⃣ [Passo 3 - Execução]\nAplique diariamente, mesmo que pouco.\n\nSimples, mas poderoso.\n\nNo próximo e-mail, um case de sucesso para te inspirar.`, objetivo: 'Entregar valor prático' },
        { dia: 7, assunto: `Como [Nome] conseguiu ${formData.beneficio} em 90 dias`, corpo: `Olá!\n\nQuero te contar a história do [Nome].\n\nEle era ${formData.avatar} e sofria com ${formData.problema}.\n\nDepois de aplicar o método que compartilhei, conseguiu ${formData.beneficio} em apenas 90 dias.\n\n"[Depoimento do cliente]"\n\nVocê também pode ter resultados assim.\n\nAmanhã, uma surpresa para você.`, objetivo: 'Prova social' },
        { dia: 8, assunto: `[CONVITE] Quer acelerar seus resultados?`, corpo: `Olá!\n\nNos últimos dias, compartilhei conteúdos valiosos sobre ${formData.beneficio}.\n\nMas sei que aplicar sozinho pode ser difícil.\n\nPor isso, criei o ${formData.produto}.\n\nUm programa completo para te ajudar a ${formData.beneficio} de forma estruturada.\n\n${formData.preco ? `Investimento: ${formData.preco}` : ''}\n\nClique aqui para saber mais: [LINK]\n\nQualquer dúvida, só responder este e-mail.`, objetivo: 'Apresentar oferta' },
        { dia: 10, assunto: `Dúvidas sobre o ${formData.produto}?`, corpo: `Olá!\n\nVi que você abriu o e-mail sobre o ${formData.produto}, mas ainda não se inscreveu.\n\nÉ normal ter dúvidas. Aqui estão as mais comuns:\n\n❓ "Funciona para mim?"\nSim, se você é ${formData.avatar} e quer ${formData.beneficio}.\n\n❓ "Quanto tempo leva?"\nResultados em 30-90 dias com aplicação consistente.\n\n❓ "E se não gostar?"\nGarantia de satisfação. Risco zero.\n\nAlguma outra dúvida? Responde aqui.`, objetivo: 'Quebrar objeções' },
        { dia: 14, assunto: `Última chance: ${formData.urgencia || 'oferta especial'}`, corpo: `Olá!\n\nEssa é minha última mensagem sobre o ${formData.produto}.\n\n${formData.urgencia || 'A condição especial termina hoje.'}\n\nSe você realmente quer ${formData.beneficio}, essa é sua chance.\n\nClique aqui: [LINK]\n\nDepois disso, o preço volta ao normal.\n\nA decisão é sua.\n\nSucesso!`, objetivo: 'Criar urgência e fechar' },
      ]
    } else if (formData.tipo === 'lancamento') {
      emails = [
        { dia: -3, assunto: `Algo grande está chegando para ${formData.avatar}...`, corpo: `Olá!\n\nNos últimos meses, trabalhei em algo especial.\n\nAlgo que vai ajudar ${formData.avatar} a ${formData.beneficio}.\n\nEm 3 dias, vou revelar tudo.\n\nFique de olho.`, objetivo: 'Criar antecipação' },
        { dia: -1, assunto: `Amanhã: a revelação`, corpo: `Olá!\n\nAmanhã às [HORÁRIO] eu vou abrir as portas do ${formData.produto}.\n\nPrepare-se para ${formData.beneficio}.\n\nMarque na agenda. Não perca.`, objetivo: 'Gerar expectativa' },
        { dia: 0, assunto: `🚀 ABERTO: ${formData.produto}`, corpo: `Olá!\n\nChegou o momento!\n\nO ${formData.produto} está oficialmente disponível.\n\nO que você vai ter acesso:\n✅ [Benefício 1]\n✅ [Benefício 2]\n✅ [Benefício 3]\n\n${formData.preco ? `Investimento: ${formData.preco}` : ''}\n\n⚠️ Vagas limitadas.\n\nGaranta sua vaga: [LINK]`, objetivo: 'Lançar oferta' },
        { dia: 1, assunto: `50% das vagas preenchidas`, corpo: `Olá!\n\nEm menos de 24h, metade das vagas do ${formData.produto} foram preenchidas.\n\nSe você ainda está pensando, esse é o momento.\n\n[LINK]\n\nNão deixe para depois.`, objetivo: 'Criar escassez' },
        { dia: 3, assunto: `Por que [Nome] se inscreveu`, corpo: `Olá!\n\n"Eu estava cansado de ${formData.problema}. Quando vi o ${formData.produto}, soube que era o que precisava."\n\n- [Nome], aluno do ${formData.produto}\n\nVocê pode ser o próximo.\n\n[LINK]`, objetivo: 'Prova social' },
        { dia: 5, assunto: `⏰ Últimas 48 horas`, corpo: `Olá!\n\nRestam apenas 48 horas para garantir sua vaga no ${formData.produto}.\n\nDepois disso:\n❌ O preço aumenta\n❌ Os bônus expiram\n❌ As vagas acabam\n\nNão espere: [LINK]`, objetivo: 'Urgência' },
        { dia: 7, assunto: `[ENCERRADO] Obrigado`, corpo: `Olá!\n\nAs inscrições do ${formData.produto} foram encerradas.\n\nSe você garantiu sua vaga, parabéns! Nos vemos lá dentro.\n\nSe não conseguiu dessa vez, fique tranquilo. Em breve terei novidades.\n\nAté mais!`, objetivo: 'Encerrar e criar FOMO' },
      ]
    } else if (formData.tipo === 'carrinho') {
      emails = [
        { dia: 0, assunto: `Esqueceu algo?`, corpo: `Olá!\n\nNotei que você começou a inscrição no ${formData.produto}, mas não finalizou.\n\nAcontece algum problema técnico? Posso ajudar?\n\nSeu carrinho ainda está salvo: [LINK]\n\nQualquer dúvida, só responder.`, objetivo: 'Recuperar atenção' },
        { dia: 1, assunto: `Ainda pensando?`, corpo: `Olá!\n\nSei que tomar decisões importantes leva tempo.\n\nMas lembre-se: ${formData.problema} não vai se resolver sozinho.\n\nO ${formData.produto} foi criado exatamente para te ajudar a ${formData.beneficio}.\n\nComplete sua inscrição: [LINK]`, objetivo: 'Reforçar valor' },
        { dia: 2, assunto: `Sua dúvida pode ser essa...`, corpo: `Olá!\n\nQuando alguém não finaliza a compra, geralmente é por um desses motivos:\n\n1️⃣ "Não sei se é para mim" → É, se você quer ${formData.beneficio}\n2️⃣ "Está caro" → Quanto custa NÃO resolver ${formData.problema}?\n3️⃣ "Não tenho tempo" → São apenas X minutos por dia\n\nAlguma dessas?\n\nResponde aqui que te ajudo.`, objetivo: 'Quebrar objeções' },
        { dia: 3, assunto: `Presente especial para você`, corpo: `Olá!\n\nQuero te dar um incentivo para finalizar sua inscrição.\n\nUse o cupom VOLTA10 e ganhe 10% de desconto.\n\nVálido apenas hoje.\n\n[LINK]`, objetivo: 'Oferecer incentivo' },
        { dia: 5, assunto: `Última tentativa`, corpo: `Olá!\n\nEsse é meu último e-mail sobre o ${formData.produto}.\n\nSe não for para você, tudo bem. Eu entendo.\n\nMas se ${formData.problema} ainda te incomoda, a solução está aqui: [LINK]\n\nA decisão é sua.\n\nSucesso na sua jornada!`, objetivo: 'Fechamento final' },
      ]
    } else if (formData.tipo === 'onboarding') {
      emails = [
        { dia: 0, assunto: `Bem-vindo ao ${formData.produto}! 🎉`, corpo: `Olá!\n\nParabéns pela decisão de ${formData.beneficio}!\n\nVocê agora faz parte do ${formData.produto}.\n\nPróximos passos:\n1️⃣ Acesse a plataforma: [LINK]\n2️⃣ Complete seu perfil\n3️⃣ Assista à aula de boas-vindas\n\nQualquer dúvida, estou aqui.\n\nVamos juntos!`, objetivo: 'Dar boas-vindas' },
        { dia: 1, assunto: `Você já acessou?`, corpo: `Olá!\n\nSó passando para garantir que você conseguiu acessar tudo.\n\nSe tiver qualquer dificuldade técnica, responde esse e-mail.\n\nDica: comece pelo Módulo 1, que é a base de tudo.\n\nBons estudos!`, objetivo: 'Garantir acesso' },
        { dia: 3, assunto: `Como estão os estudos?`, corpo: `Olá!\n\nJá se passaram 3 dias. Como está sendo sua experiência?\n\nLembre-se: consistência > intensidade.\n\nMelhor estudar 30 minutos todo dia do que 5 horas uma vez por semana.\n\nContinue firme!`, objetivo: 'Engajar' },
        { dia: 7, assunto: `1 semana! Parabéns 🏆`, corpo: `Olá!\n\nVocê completou 1 semana no ${formData.produto}!\n\nIsso já te coloca à frente de muita gente que desiste nos primeiros dias.\n\nContinue assim. Os resultados vêm.\n\nSe precisar de algo, estou aqui.`, objetivo: 'Celebrar milestone' },
      ]
    } else if (formData.tipo === 'reativacao') {
      emails = [
        { dia: 0, assunto: `Sentimos sua falta...`, corpo: `Olá!\n\nFaz tempo que não te vejo por aqui.\n\nTudo bem?\n\nSei que a vida fica corrida, mas lembre-se: ${formData.problema} ainda está aí.\n\nQue tal retomar de onde parou?\n\n[LINK]`, objetivo: 'Reconectar' },
        { dia: 3, assunto: `O que aconteceu?`, corpo: `Olá!\n\nQueria entender: o que te impediu de continuar?\n\n[ ] Falta de tempo\n[ ] Não vi resultados\n[ ] Mudança de prioridades\n[ ] Outro motivo\n\nResponde esse e-mail. Quero te ajudar.`, objetivo: 'Entender objeção' },
        { dia: 5, assunto: `Novidades desde sua última visita`, corpo: `Olá!\n\nDesde que você saiu, adicionamos:\n\n✨ [Novidade 1]\n✨ [Novidade 2]\n✨ [Novidade 3]\n\nValeria a pena dar uma nova olhada.\n\n[LINK]`, objetivo: 'Mostrar valor novo' },
        { dia: 7, assunto: `Presente de volta`, corpo: `Olá!\n\nQuero te dar um incentivo para voltar.\n\nAcesse hoje e ganhe [BÔNUS/DESCONTO].\n\nOferta válida por 48h.\n\n[LINK]`, objetivo: 'Incentivar retorno' },
        { dia: 10, assunto: `Até mais (por enquanto)`, corpo: `Olá!\n\nComo não tive retorno, vou diminuir a frequência dos e-mails.\n\nMas saiba que estou aqui quando precisar.\n\nSe um dia quiser ${formData.beneficio}, o ${formData.produto} estará te esperando.\n\nSucesso!`, objetivo: 'Despedida elegante' },
      ]
    }

    setSequencia({ emails })
    setStep(2)
    setEmailAtual(0)
  }

  const copyEmail = (index: number) => {
    if (!sequencia) return
    const email = sequencia.emails[index]
    const texto = `ASSUNTO: ${email.assunto}\n\n${email.corpo}`
    navigator.clipboard.writeText(texto)
    setCopied(`email-${index}`)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = () => {
    if (!sequencia) return
    const texto = sequencia.emails.map((e, i) =>
      `=== E-MAIL ${i + 1} (Dia ${e.dia}) ===\nASSUNTO: ${e.assunto}\n\n${e.corpo}\n\nOBJETIVO: ${e.objetivo}`
    ).join('\n\n---\n\n')
    navigator.clipboard.writeText(texto)
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
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
            <Mail className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Sequência de E-mails</span>
          </h1>
          <p className="text-[var(--gray)]">Crie campanhas de e-mail completas e personalizadas</p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="glass card">
              <h2 className="font-display text-xl mb-4">Tipo de Sequência</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {tiposSequencia.map(tipo => (
                  <button
                    key={tipo.id}
                    onClick={() => setFormData({...formData, tipo: tipo.id})}
                    className={`p-4 rounded-xl text-left transition-all ${
                      formData.tipo === tipo.id
                        ? 'bg-[var(--gold)]/20 border-2 border-[var(--gold)]'
                        : 'bg-white/5 border border-white/10 hover:border-[var(--gold)]/50'
                    }`}
                  >
                    <h3 className="font-display">{tipo.nome}</h3>
                    <p className="text-sm text-[var(--gray)]">{tipo.desc}</p>
                    <p className="text-xs text-[var(--gold)] mt-1">{tipo.dias} dias</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass card">
              <h2 className="font-display text-xl mb-4">Informações</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Nome do Produto</label>
                    <input
                      type="text"
                      value={formData.produto}
                      onChange={(e) => setFormData({...formData, produto: e.target.value})}
                      placeholder="Ex: Mentoria Elite"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Avatar</label>
                    <input
                      type="text"
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      placeholder="Ex: empreendedores"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">Problema que resolve</label>
                  <input
                    type="text"
                    value={formData.problema}
                    onChange={(e) => setFormData({...formData, problema: e.target.value})}
                    placeholder="Ex: não conseguir vender online"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Benefício principal</label>
                  <input
                    type="text"
                    value={formData.beneficio}
                    onChange={(e) => setFormData({...formData, beneficio: e.target.value})}
                    placeholder="Ex: criar um negócio lucrativo"
                    className="input-field"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Preço (opcional)</label>
                    <input
                      type="text"
                      value={formData.preco}
                      onChange={(e) => setFormData({...formData, preco: e.target.value})}
                      placeholder="Ex: R$ 997"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Urgência (opcional)</label>
                    <input
                      type="text"
                      value={formData.urgencia}
                      onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                      placeholder="Ex: Vagas até sexta"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={gerarSequencia}
                disabled={!formData.produto || !formData.avatar || !formData.beneficio}
                className="btn-primary w-full mt-6"
              >
                Gerar Sequência
              </button>
            </div>
          </div>
        )}

        {step === 2 && sequencia && (
          <div className="animate-fadeInUp">
            <div className="glass card mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl gold-text">
                    {tiposSequencia.find(t => t.id === formData.tipo)?.nome}
                  </h2>
                  <p className="text-sm text-[var(--gray)]">{sequencia.emails.length} e-mails</p>
                </div>
                <button onClick={copyAll} className="btn-primary flex items-center gap-2">
                  {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'all' ? 'Copiado!' : 'Copiar Tudo'}
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
              {sequencia.emails.map((email, i) => (
                <button
                  key={i}
                  onClick={() => setEmailAtual(i)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                    emailAtual === i
                      ? 'bg-[var(--gold)] text-black'
                      : 'bg-white/10 text-[var(--gray)] hover:bg-white/20'
                  }`}
                >
                  Dia {email.dia}
                </button>
              ))}
            </div>

            {/* Email Atual */}
            <div className="glass card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--gray)]">E-mail {emailAtual + 1} • Dia {sequencia.emails[emailAtual].dia}</p>
                    <p className="text-xs text-[var(--gold)]">{sequencia.emails[emailAtual].objetivo}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyEmail(emailAtual)}
                  className="btn-secondary p-2"
                >
                  {copied === `email-${emailAtual}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <p className="text-xs text-[var(--gray)] mb-1">ASSUNTO:</p>
                <p className="font-semibold text-[var(--gold)]">{sequencia.emails[emailAtual].assunto}</p>
              </div>

              <div className="bg-black/30 rounded-xl p-4">
                <p className="text-xs text-[var(--gray)] mb-2">CORPO:</p>
                <p className="whitespace-pre-line text-sm">{sequencia.emails[emailAtual].corpo}</p>
              </div>

              {/* Navegação */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setEmailAtual(e => Math.max(0, e - 1))}
                  disabled={emailAtual === 0}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span className="text-[var(--gray)]">{emailAtual + 1} / {sequencia.emails.length}</span>
                <button
                  onClick={() => setEmailAtual(e => Math.min(sequencia.emails.length - 1, e + 1))}
                  disabled={emailAtual === sequencia.emails.length - 1}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Nova Sequência
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
