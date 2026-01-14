'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Copy, Check, Sparkles, Eye, Zap, Target, Users, Shield, Star } from 'lucide-react'

interface DadosProduto {
  nomeProduto: string
  categoria: string
  publicoAlvo: string
  problemaPrincipal: string
  solucaoPrincipal: string
  beneficio1: string
  beneficio2: string
  beneficio3: string
  preco: string
  garantia: string
  cta: string
}

interface SecaoCopy {
  id: string
  nome: string
  conteudo: string
}

export default function LandingPage() {
  const [dados, setDados] = useState<DadosProduto>({
    nomeProduto: '',
    categoria: 'saas',
    publicoAlvo: '',
    problemaPrincipal: '',
    solucaoPrincipal: '',
    beneficio1: '',
    beneficio2: '',
    beneficio3: '',
    preco: '',
    garantia: '7 dias',
    cta: 'Começar Agora',
  })

  const [secoes, setSecoes] = useState<SecaoCopy[]>([])
  const [copiado, setCopiado] = useState<string | null>(null)
  const [gerado, setGerado] = useState(false)

  const gerarCopy = () => {
    if (!dados.nomeProduto || !dados.publicoAlvo || !dados.problemaPrincipal) {
      alert('Preencha pelo menos: Nome do Produto, Público-Alvo e Problema Principal')
      return
    }

    const novasSecoes: SecaoCopy[] = [
      {
        id: 'headline',
        nome: '🎯 Headline Principal',
        conteudo: gerarHeadline(),
      },
      {
        id: 'subheadline',
        nome: '📝 Subheadline',
        conteudo: gerarSubheadline(),
      },
      {
        id: 'problema',
        nome: '😫 Seção do Problema',
        conteudo: gerarProblema(),
      },
      {
        id: 'solucao',
        nome: '✨ Seção da Solução',
        conteudo: gerarSolucao(),
      },
      {
        id: 'beneficios',
        nome: '🎁 Benefícios',
        conteudo: gerarBeneficios(),
      },
      {
        id: 'como_funciona',
        nome: '⚙️ Como Funciona',
        conteudo: gerarComoFunciona(),
      },
      {
        id: 'prova_social',
        nome: '⭐ Prova Social',
        conteudo: gerarProvaSocial(),
      },
      {
        id: 'faq',
        nome: '❓ FAQ',
        conteudo: gerarFAQ(),
      },
      {
        id: 'cta',
        nome: '🚀 CTA Final',
        conteudo: gerarCTAFinal(),
      },
    ]

    setSecoes(novasSecoes)
    setGerado(true)
  }

  const gerarHeadline = () => {
    const templates = [
      `${dados.solucaoPrincipal || `Resolva ${dados.problemaPrincipal}`} em tempo recorde`,
      `A forma mais simples de ${dados.solucaoPrincipal || `resolver ${dados.problemaPrincipal}`}`,
      `${dados.publicoAlvo}: Chega de ${dados.problemaPrincipal}`,
      `De ${dados.problemaPrincipal} para ${dados.solucaoPrincipal || 'resultados reais'} em poucos cliques`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const gerarSubheadline = () => {
    return `O ${dados.nomeProduto} ajuda ${dados.publicoAlvo.toLowerCase()} a ${dados.solucaoPrincipal || `eliminar ${dados.problemaPrincipal}`} de forma simples, rápida e sem complicação.`
  }

  const gerarProblema = () => {
    return `### Você está cansado de ${dados.problemaPrincipal}?

Se você é ${dados.publicoAlvo.toLowerCase()}, provavelmente já passou por isso:

❌ Perde horas tentando ${dados.problemaPrincipal} manualmente
❌ Já testou outras soluções que não funcionaram
❌ Sente que está ficando para trás enquanto outros avançam
❌ Não sabe por onde começar para resolver de vez

**A verdade é:** você não precisa continuar assim.`
  }

  const gerarSolucao = () => {
    return `### Apresentamos o ${dados.nomeProduto}

A solução definitiva para ${dados.publicoAlvo.toLowerCase()} que quer ${dados.solucaoPrincipal || `resolver ${dados.problemaPrincipal}`}.

${dados.nomeProduto} foi criado especificamente para quem precisa de resultados reais, sem perder tempo com soluções complicadas.

✅ Simples de usar - comece em minutos
✅ Resultados rápidos - veja a diferença em dias
✅ Suporte dedicado - nunca fique sozinho`
  }

  const gerarBeneficios = () => {
    const b1 = dados.beneficio1 || 'Economize tempo'
    const b2 = dados.beneficio2 || 'Reduza custos'
    const b3 = dados.beneficio3 || 'Aumente resultados'

    return `### O que você ganha com o ${dados.nomeProduto}

🎯 **${b1}**
${b1.includes('tempo') ? 'Automatize tarefas repetitivas e foque no que realmente importa.' : 'Tenha acesso a recursos que transformam sua rotina.'}

💰 **${b2}**
${b2.includes('custo') ? 'Elimine gastos desnecessários e maximize seu retorno.' : 'Aproveite funcionalidades que agregam valor real ao seu negócio.'}

📈 **${b3}**
${b3.includes('resultado') ? 'Veja números crescendo com estratégias comprovadas.' : 'Alcance objetivos que antes pareciam impossíveis.'}`
  }

  const gerarComoFunciona = () => {
    return `### Como Funciona

**Passo 1: Cadastre-se**
Crie sua conta em menos de 2 minutos. Sem burocracia.

**Passo 2: Configure**
Personalize o ${dados.nomeProduto} para sua realidade. Interface intuitiva.

**Passo 3: Resultado**
Comece a ver resultados já nos primeiros dias de uso.

*Simples assim. Sem complicação.*`
  }

  const gerarProvaSocial = () => {
    return `### O que nossos clientes dizem

> "O ${dados.nomeProduto} transformou a forma como trabalho. Recomendo para todo ${dados.publicoAlvo.toLowerCase()}."
> — Cliente Satisfeito

> "Finalmente uma solução que funciona. Resolvi ${dados.problemaPrincipal} de vez."
> — Usuário Verificado

> "ROI positivo já no primeiro mês. Melhor investimento que fiz."
> — Empresa do Segmento

**+500 ${dados.publicoAlvo.toLowerCase()} já estão usando**`
  }

  const gerarFAQ = () => {
    return `### Perguntas Frequentes

**Para quem é o ${dados.nomeProduto}?**
Para ${dados.publicoAlvo.toLowerCase()} que quer ${dados.solucaoPrincipal || `resolver ${dados.problemaPrincipal}`} de forma profissional.

**Preciso de conhecimento técnico?**
Não. O ${dados.nomeProduto} foi feito para ser simples. Qualquer pessoa consegue usar.

**E se não funcionar para mim?**
Você tem ${dados.garantia} de garantia. Se não gostar, devolvemos 100% do seu dinheiro.

**Como funciona o suporte?**
Suporte via chat e email, com tempo de resposta de até 24h em dias úteis.

**Posso cancelar quando quiser?**
Sim. Sem multa, sem burocracia. Você tem total controle.`
  }

  const gerarCTAFinal = () => {
    return `### Está pronto para ${dados.solucaoPrincipal || `resolver ${dados.problemaPrincipal}`}?

🎁 **Oferta Especial**

${dados.preco ? `Por apenas **${dados.preco}**` : 'Preço especial por tempo limitado'}

✅ Acesso completo ao ${dados.nomeProduto}
✅ Suporte prioritário
✅ Atualizações gratuitas
✅ ${dados.garantia} de garantia incondicional

[${dados.cta.toUpperCase()}]

*Junte-se a +500 ${dados.publicoAlvo.toLowerCase()} que já transformaram seus resultados*

---

💬 Dúvidas? Fale conosco: [contato@empresa.com]`
  }

  const copiarSecao = (id: string, conteudo: string) => {
    navigator.clipboard.writeText(conteudo)
    setCopiado(id)
    setTimeout(() => setCopiado(null), 2000)
  }

  const copiarTudo = () => {
    const textoCompleto = secoes.map(s => `${s.nome}\n\n${s.conteudo}`).join('\n\n---\n\n')
    navigator.clipboard.writeText(textoCompleto)
    setCopiado('tudo')
    setTimeout(() => setCopiado(null), 2000)
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
            <h1 className="text-3xl font-bold">Gerador de Landing Page</h1>
            <p className="text-white/60">Copy pronta para sua página de vendas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--gold)]" />
                Informações do Produto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    value={dados.nomeProduto}
                    onChange={(e) => setDados({ ...dados, nomeProduto: e.target.value })}
                    placeholder="Ex: SalesBoost, TaskMaster, etc."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Categoria</label>
                  <select
                    value={dados.categoria}
                    onChange={(e) => setDados({ ...dados, categoria: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  >
                    <option value="saas">SaaS / Software</option>
                    <option value="servico">Serviço</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="curso">Curso / Infoproduto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Público-Alvo *</label>
                  <input
                    type="text"
                    value={dados.publicoAlvo}
                    onChange={(e) => setDados({ ...dados, publicoAlvo: e.target.value })}
                    placeholder="Ex: Empreendedores, Vendedores, Startups"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Problema Principal *</label>
                  <input
                    type="text"
                    value={dados.problemaPrincipal}
                    onChange={(e) => setDados({ ...dados, problemaPrincipal: e.target.value })}
                    placeholder="Ex: perder tempo com planilhas, não conseguir vender"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Solução/Transformação</label>
                  <input
                    type="text"
                    value={dados.solucaoPrincipal}
                    onChange={(e) => setDados({ ...dados, solucaoPrincipal: e.target.value })}
                    placeholder="Ex: automatizar vendas, dobrar faturamento"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                Benefícios (opcional)
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={dados.beneficio1}
                  onChange={(e) => setDados({ ...dados, beneficio1: e.target.value })}
                  placeholder="Benefício 1 (ex: Economize 10h por semana)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                />
                <input
                  type="text"
                  value={dados.beneficio2}
                  onChange={(e) => setDados({ ...dados, beneficio2: e.target.value })}
                  placeholder="Benefício 2 (ex: Reduza custos em 30%)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                />
                <input
                  type="text"
                  value={dados.beneficio3}
                  onChange={(e) => setDados({ ...dados, beneficio3: e.target.value })}
                  placeholder="Benefício 3 (ex: Aumente vendas em 50%)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--gold)]" />
                Oferta (opcional)
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={dados.preco}
                  onChange={(e) => setDados({ ...dados, preco: e.target.value })}
                  placeholder="Preço (ex: R$ 97/mês, R$ 497 único)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                />

                <select
                  value={dados.garantia}
                  onChange={(e) => setDados({ ...dados, garantia: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                >
                  <option value="7 dias">7 dias de garantia</option>
                  <option value="14 dias">14 dias de garantia</option>
                  <option value="30 dias">30 dias de garantia</option>
                  <option value="60 dias">60 dias de garantia</option>
                </select>

                <input
                  type="text"
                  value={dados.cta}
                  onChange={(e) => setDados({ ...dados, cta: e.target.value })}
                  placeholder="Texto do botão (ex: Começar Agora, Quero Testar)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={gerarCopy}
              className="w-full py-4 bg-[var(--gold)] text-black rounded-xl font-bold text-lg hover:bg-[var(--gold)]/90 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Gerar Copy da Landing Page
            </button>
          </div>

          {/* Resultado */}
          <div>
            {gerado && secoes.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[var(--gold)]" />
                    Copy Gerada
                  </h2>
                  <button
                    onClick={copiarTudo}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black rounded-lg font-medium text-sm"
                  >
                    {copiado === 'tudo' ? (
                      <>
                        <Check className="w-4 h-4" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copiar Tudo
                      </>
                    )}
                  </button>
                </div>

                {secoes.map((secao) => (
                  <div key={secao.id} className="glass rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                      <h3 className="font-medium">{secao.nome}</h3>
                      <button
                        onClick={() => copiarSecao(secao.id, secao.conteudo)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {copiado === secao.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="whitespace-pre-wrap text-sm text-white/80 font-sans leading-relaxed">
                        {secao.conteudo}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <FileText className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sua Landing Page</h3>
                <p className="text-white/60 mb-6">
                  Preencha as informações ao lado e clique em "Gerar Copy" para criar sua página de vendas.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Headline</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Problema</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Solução</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Benefícios</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">CTA</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">📝 Dicas para uma Landing Page de Alta Conversão</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[var(--gold)]" />
                <h4 className="font-semibold">Headline Clara</h4>
              </div>
              <p className="text-sm text-white/70">
                O visitante deve entender o que você oferece em 3 segundos.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-[var(--gold)]" />
                <h4 className="font-semibold">Prova Social</h4>
              </div>
              <p className="text-sm text-white/70">
                Depoimentos reais aumentam confiança em até 270%.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[var(--gold)]" />
                <h4 className="font-semibold">Reduz Risco</h4>
              </div>
              <p className="text-sm text-white/70">
                Garantia de satisfação remove a barreira do medo.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[var(--gold)]" />
                <h4 className="font-semibold">CTA Único</h4>
              </div>
              <p className="text-sm text-white/70">
                Uma página, uma ação. Não confunda o visitante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
