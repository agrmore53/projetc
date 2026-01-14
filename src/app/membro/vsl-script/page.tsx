'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Video, Copy, Check, Clock, Play, ChevronLeft, ChevronRight } from 'lucide-react'

interface VSLScript {
  secoes: {
    nome: string
    tempo: string
    conteudo: string[]
  }[]
}

export default function VSLScriptPage() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [secaoAtual, setSecaoAtual] = useState(0)
  const [formData, setFormData] = useState({
    produto: '',
    avatar: '',
    problema: '',
    agitacao: '',
    solucao: '',
    beneficio1: '',
    beneficio2: '',
    beneficio3: '',
    prova: '',
    preco: '',
    garantia: '',
    bonus: '',
    urgencia: ''
  })
  const [script, setScript] = useState<VSLScript | null>(null)

  const gerarScript = () => {
    const vsl: VSLScript = {
      secoes: [
        {
          nome: '1. GANCHO (Hook)',
          tempo: '0:00 - 0:30',
          conteudo: [
            `[OLHAR PARA CÂMERA]`,
            ``,
            `"Se você é ${formData.avatar} e está cansado de ${formData.problema}..."`,
            ``,
            `"...então os próximos 10 minutos podem mudar completamente sua vida."`,
            ``,
            `"Eu vou te mostrar exatamente como ${formData.solucao.toLowerCase()}..."`,
            ``,
            `"...mesmo que você já tenha tentado de tudo e nada funcionou."`,
            ``,
            `[PAUSA DRAMÁTICA]`
          ]
        },
        {
          nome: '2. IDENTIFICAÇÃO',
          tempo: '0:30 - 1:30',
          conteudo: [
            `"Deixa eu adivinhar sua situação..."`,
            ``,
            `"Você acorda todo dia pensando em como resolver ${formData.problema}."`,
            ``,
            `"Já tentou várias coisas, gastou dinheiro, tempo, energia..."`,
            ``,
            `"Mas parece que nada funciona de verdade."`,
            ``,
            `"Você vê outras pessoas tendo resultados e pensa: 'Por que comigo não funciona?'"`,
            ``,
            `"Eu sei exatamente como você se sente, porque eu já estive aí."`,
            ``,
            `[MOSTRAR EMPATIA]`
          ]
        },
        {
          nome: '3. HISTÓRIA / CREDIBILIDADE',
          tempo: '1:30 - 3:00',
          conteudo: [
            `"Meu nome é [SEU NOME] e há alguns anos eu estava exatamente onde você está."`,
            ``,
            `"${formData.problema} era minha realidade diária."`,
            ``,
            `"Até que eu descobri algo que mudou tudo..."`,
            ``,
            `"Depois de muito estudo, teste e erro, eu desenvolvi um método que..."`,
            ``,
            `"${formData.prova}"`,
            ``,
            `"E agora eu quero compartilhar isso com você."`,
            ``,
            `[MOSTRAR PROVA SOCIAL / RESULTADOS]`
          ]
        },
        {
          nome: '4. AGITAÇÃO DO PROBLEMA',
          tempo: '3:00 - 4:30',
          conteudo: [
            `"Mas antes, preciso ser honesto com você..."`,
            ``,
            `"Se você continuar fazendo o que está fazendo, ${formData.agitacao}"`,
            ``,
            `"Pense nisso: daqui a 1 ano, onde você vai estar?"`,
            ``,
            `"Ainda com o mesmo problema? Ainda frustrado?"`,
            ``,
            `"A definição de insanidade é fazer a mesma coisa esperando resultados diferentes."`,
            ``,
            `"Você precisa de algo novo. Uma abordagem diferente."`,
            ``,
            `[TOM SÉRIO, MAS EMPÁTICO]`
          ]
        },
        {
          nome: '5. APRESENTAÇÃO DA SOLUÇÃO',
          tempo: '4:30 - 6:00',
          conteudo: [
            `"É por isso que eu criei o ${formData.produto}."`,
            ``,
            `"Um método passo a passo para ${formData.solucao.toLowerCase()}."`,
            ``,
            `"Diferente de tudo que você já viu porque..."`,
            ``,
            `"✅ ${formData.beneficio1}"`,
            ``,
            `"✅ ${formData.beneficio2}"`,
            ``,
            `"✅ ${formData.beneficio3}"`,
            ``,
            `"Tudo isso de forma simples, prática e aplicável."`,
            ``,
            `[MOSTRAR O PRODUTO / DEMONSTRAÇÃO]`
          ]
        },
        {
          nome: '6. PROVA E RESULTADOS',
          tempo: '6:00 - 7:30',
          conteudo: [
            `"Mas não acredite só em mim. Veja o que nossos alunos dizem:"`,
            ``,
            `[DEPOIMENTO 1]`,
            `"[Nome] conseguiu [resultado] em apenas [tempo]..."`,
            ``,
            `[DEPOIMENTO 2]`,
            `"[Nome] saiu de [situação ruim] para [situação boa]..."`,
            ``,
            `[DEPOIMENTO 3]`,
            `"[Nome] finalmente ${formData.solucao.toLowerCase()}..."`,
            ``,
            `"Esses são pessoas reais, com resultados reais."`,
            ``,
            `[MOSTRAR PRINTS / VÍDEOS DE DEPOIMENTOS]`
          ]
        },
        {
          nome: '7. OFERTA',
          tempo: '7:30 - 9:00',
          conteudo: [
            `"Agora vamos falar sobre como você pode ter acesso a tudo isso."`,
            ``,
            `"O ${formData.produto} inclui:"`,
            ``,
            `"📦 Módulo completo de [conteúdo principal] - Valor: R$ XXX"`,
            `"📦 Templates e ferramentas prontas - Valor: R$ XXX"`,
            `"📦 Suporte e comunidade exclusiva - Valor: R$ XXX"`,
            ``,
            `"Valor total: R$ XXXX"`,
            ``,
            `"Mas você não vai pagar isso hoje."`,
            ``,
            `"Seu investimento é de apenas ${formData.preco}"`,
            ``,
            `[MOSTRAR PREÇO NA TELA]`
          ]
        },
        {
          nome: '8. BÔNUS',
          tempo: '9:00 - 9:45',
          conteudo: [
            `"E ainda tem mais..."`,
            ``,
            `"Quem entrar agora vai receber de bônus:"`,
            ``,
            `"🎁 ${formData.bonus}"`,
            ``,
            `"Esse bônus sozinho vale mais que o investimento total."`,
            ``,
            `"Mas ele está disponível apenas para quem agir agora."`,
            ``,
            `[MOSTRAR BÔNUS NA TELA]`
          ]
        },
        {
          nome: '9. GARANTIA',
          tempo: '9:45 - 10:15',
          conteudo: [
            `"E para você entrar com total segurança..."`,
            ``,
            `"Eu ofereço ${formData.garantia}."`,
            ``,
            `"Se por qualquer motivo você não gostar, basta pedir reembolso."`,
            ``,
            `"Sem perguntas, sem burocracia."`,
            ``,
            `"Todo o risco é meu. Você não tem nada a perder."`,
            ``,
            `[MOSTRAR SELO DE GARANTIA]`
          ]
        },
        {
          nome: '10. URGÊNCIA E CTA',
          tempo: '10:15 - 11:00',
          conteudo: [
            `"Mas atenção: ${formData.urgencia}"`,
            ``,
            `"Essa condição especial não vai durar para sempre."`,
            ``,
            `"Você tem duas opções agora:"`,
            ``,
            `"1️⃣ Fechar essa página e continuar com os mesmos resultados..."`,
            ``,
            `"2️⃣ Clicar no botão abaixo e finalmente ${formData.solucao.toLowerCase()}."`,
            ``,
            `"A escolha é sua. Mas lembre-se: não decidir também é uma decisão."`,
            ``,
            `"Clica no botão agora e eu te vejo do outro lado."`,
            ``,
            `[BOTÃO DE COMPRA NA TELA]`
          ]
        }
      ]
    }

    setScript(vsl)
    setStep(2)
  }

  const copyToClipboard = (texto?: string) => {
    const conteudo = texto || (script ? script.secoes.map(s =>
      `## ${s.nome}\n[${s.tempo}]\n\n${s.conteudo.join('\n')}`
    ).join('\n\n---\n\n') : '')

    navigator.clipboard.writeText(conteudo)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tempoTotal = '~11 minutos'

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
            <Video className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Script VSL</span>
          </h1>
          <p className="text-[var(--gray)]">Roteiro completo de vídeo de vendas em 10 seções</p>
        </div>

        {step === 1 && (
          <div className="glass card animate-fadeInUp">
            <h2 className="font-display text-xl mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-[var(--gold)]" />
              Informações do Produto
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Nome do Produto</label>
                  <input
                    type="text"
                    value={formData.produto}
                    onChange={(e) => setFormData({...formData, produto: e.target.value})}
                    placeholder="Ex: Método XYZ, Curso ABC..."
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Público-alvo (Avatar)</label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    placeholder="Ex: empreendedor iniciante, vendedor..."
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Problema principal do avatar</label>
                <input
                  type="text"
                  value={formData.problema}
                  onChange={(e) => setFormData({...formData, problema: e.target.value})}
                  placeholder="Ex: não conseguir vender online, não bater metas..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Agitação (o que acontece se não resolver)</label>
                <input
                  type="text"
                  value={formData.agitacao}
                  onChange={(e) => setFormData({...formData, agitacao: e.target.value})}
                  placeholder="Ex: vai continuar perdendo dinheiro, tempo e oportunidades..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Solução/Transformação oferecida</label>
                <input
                  type="text"
                  value={formData.solucao}
                  onChange={(e) => setFormData({...formData, solucao: e.target.value})}
                  placeholder="Ex: Criar seu primeiro funil de vendas lucrativo"
                  className="input-field"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="input-label">Benefício 1</label>
                  <input
                    type="text"
                    value={formData.beneficio1}
                    onChange={(e) => setFormData({...formData, beneficio1: e.target.value})}
                    placeholder="É simples e direto"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Benefício 2</label>
                  <input
                    type="text"
                    value={formData.beneficio2}
                    onChange={(e) => setFormData({...formData, beneficio2: e.target.value})}
                    placeholder="Funciona mesmo sem experiência"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Benefício 3</label>
                  <input
                    type="text"
                    value={formData.beneficio3}
                    onChange={(e) => setFormData({...formData, beneficio3: e.target.value})}
                    placeholder="Resultados em poucas semanas"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Prova Social / Credibilidade</label>
                <input
                  type="text"
                  value={formData.prova}
                  onChange={(e) => setFormData({...formData, prova: e.target.value})}
                  placeholder="Ex: Mais de 500 alunos, 10 anos de experiência..."
                  className="input-field"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Preço</label>
                  <input
                    type="text"
                    value={formData.preco}
                    onChange={(e) => setFormData({...formData, preco: e.target.value})}
                    placeholder="Ex: R$ 497 ou 12x de R$ 49,70"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Garantia</label>
                  <input
                    type="text"
                    value={formData.garantia}
                    onChange={(e) => setFormData({...formData, garantia: e.target.value})}
                    placeholder="Ex: 7 dias de garantia incondicional"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Bônus Principal</label>
                <input
                  type="text"
                  value={formData.bonus}
                  onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                  placeholder="Ex: Mentoria em grupo por 30 dias"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Urgência/Escassez</label>
                <input
                  type="text"
                  value={formData.urgencia}
                  onChange={(e) => setFormData({...formData, urgencia: e.target.value})}
                  placeholder="Ex: Essa oferta é válida apenas até hoje às 23:59"
                  className="input-field"
                />
              </div>
            </div>

            <button
              onClick={gerarScript}
              disabled={!formData.produto || !formData.avatar || !formData.problema || !formData.solucao}
              className="btn-primary w-full mt-8"
            >
              Gerar Script VSL
            </button>
          </div>
        )}

        {step === 2 && script && (
          <div className="animate-fadeInUp">
            {/* Header */}
            <div className="glass card mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl gold-text">Script: {formData.produto}</h2>
                  <div className="flex items-center gap-4 text-sm text-[var(--gray)] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {tempoTotal}
                    </span>
                    <span>{script.secoes.length} seções</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard()}
                  className="btn-primary flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Tudo'}
                </button>
              </div>

              {/* Navegação de Seções */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {script.secoes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSecaoAtual(i)}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                      secaoAtual === i
                        ? 'bg-[var(--gold)] text-black'
                        : 'bg-white/10 text-[var(--gray)] hover:bg-white/20'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Seção Atual */}
            <div className="glass card mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg text-[var(--gold)]">
                    {script.secoes[secaoAtual].nome}
                  </h3>
                  <p className="text-sm text-[var(--gray)]">{script.secoes[secaoAtual].tempo}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(script.secoes[secaoAtual].conteudo.join('\n'))}
                  className="btn-secondary text-sm"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-6 font-mono text-sm">
                {script.secoes[secaoAtual].conteudo.map((linha, i) => (
                  <p key={i} className={`${
                    linha.startsWith('[') ? 'text-[var(--gold)] italic' :
                    linha.startsWith('"') ? 'text-white' :
                    linha.startsWith('✅') || linha.startsWith('📦') || linha.startsWith('🎁') || linha.startsWith('1️⃣') || linha.startsWith('2️⃣') ? 'text-green-400' :
                    'text-[var(--gray)]'
                  } ${linha === '' ? 'h-4' : 'mb-2'}`}>
                    {linha}
                  </p>
                ))}
              </div>

              {/* Navegação */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setSecaoAtual(s => Math.max(0, s - 1))}
                  disabled={secaoAtual === 0}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>
                <span className="text-[var(--gray)]">
                  {secaoAtual + 1} / {script.secoes.length}
                </span>
                <button
                  onClick={() => setSecaoAtual(s => Math.min(script.secoes.length - 1, s + 1))}
                  disabled={secaoAtual === script.secoes.length - 1}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  Próxima <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dicas */}
            <div className="glass p-6 mb-6 border border-[var(--gold)]/30">
              <h3 className="font-display text-lg gold-text mb-3">💡 Dicas de Gravação</h3>
              <ul className="text-sm text-[var(--gray)] space-y-2">
                <li>• Grave olhando diretamente para a câmera (conexão com o espectador)</li>
                <li>• Varie o tom de voz conforme a emoção de cada seção</li>
                <li>• Faça pausas estratégicas após perguntas importantes</li>
                <li>• Use gestos naturais para enfatizar pontos-chave</li>
                <li>• Edite com cortes rápidos para manter a atenção</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="btn-secondary">
                Editar Informações
              </button>
              <button onClick={() => { setStep(1); setScript(null); setSecaoAtual(0) }} className="btn-secondary">
                Novo Script
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
