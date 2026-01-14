'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Target,
  Users,
  DollarSign,
  AlertTriangle,
  Handshake,
  Clock,
  Star,
  Shield
} from 'lucide-react'

interface Template {
  id: string
  titulo: string
  categoria: string
  contexto: string
  conteudo: string
  dicas: string[]
}

const templates: Template[] = [
  // ABORDAGEM INICIAL
  {
    id: 'abord-1',
    titulo: 'Primeira Abordagem - WhatsApp',
    categoria: 'abordagem',
    contexto: 'Use quando for fazer o primeiro contato com um lead frio via WhatsApp',
    conteudo: `Olá [NOME]! Tudo bem? 👋

Meu nome é [SEU NOME] e trabalho ajudando empresários como você a [BENEFÍCIO PRINCIPAL].

Vi que você tem uma [TIPO DE NEGÓCIO] e acredito que posso te ajudar a [RESULTADO ESPECÍFICO].

Posso te fazer uma pergunta rápida?`,
    dicas: [
      'Personalize sempre com o nome do lead',
      'Mencione algo específico do negócio dele',
      'Termine com pergunta aberta para gerar engajamento',
      'Não envie áudio no primeiro contato'
    ]
  },
  {
    id: 'abord-2',
    titulo: 'Abordagem Presencial - Loja',
    categoria: 'abordagem',
    contexto: 'Script para quando entrar em uma loja física para oferecer o sistema',
    conteudo: `[Entrar com confiança, sorriso, postura ereta]

"Bom dia/tarde! O responsável está? Posso falar com ele rapidinho?"

[Quando o responsável aparecer]

"Prazer, [SEU NOME]! Eu trabalho com uma solução que está ajudando [TIPO DE NEGÓCIO] aqui da região a [BENEFÍCIO].

Não vou tomar muito seu tempo - só queria entender: qual o maior desafio que você enfrenta hoje na gestão do seu negócio?"

[OUVIR ATENTAMENTE - Esta é a parte mais importante]`,
    dicas: [
      'Vista-se de forma profissional mas adequada ao contexto',
      'Chegue em horários de menor movimento (9h-10h ou 14h-15h)',
      'Nunca interrompa o cliente quando ele estiver atendendo',
      'Leve material visual (tablet com demo)'
    ]
  },
  {
    id: 'abord-3',
    titulo: 'Abordagem por Indicação',
    categoria: 'abordagem',
    contexto: 'Quando um cliente atual indicou você para alguém',
    conteudo: `Olá [NOME]! Tudo bem?

O [NOME DO INDICADOR], dono da [EMPRESA DO INDICADOR], me passou seu contato.

Ele está usando nosso sistema há [TEMPO] e me disse que você também poderia se beneficiar.

Você tem 5 minutos para eu te mostrar como funciona? Posso até fazer uma demonstração rápida por vídeo se preferir.`,
    dicas: [
      'Sempre peça permissão ao cliente antes de usar o nome dele',
      'Mencione resultados concretos que o indicador obteve',
      'A indicação já é meio caminho andado - aproveite a credibilidade',
      'Ofereça facilidades por ser indicação (ex: 1 mês grátis)'
    ]
  },

  // SONDAGEM
  {
    id: 'sond-1',
    titulo: 'Perguntas de Sondagem - Dores',
    categoria: 'sondagem',
    contexto: 'Perguntas para descobrir as dores do cliente durante a conversa',
    conteudo: `PERGUNTAS ESSENCIAIS:

1. "Como você controla suas vendas hoje?"
   → Identifica se usa sistema ou controle manual

2. "Você já perdeu alguma venda por não saber se tinha estoque?"
   → Dor de controle de estoque

3. "Como você sabe quais produtos mais vendem e quais dão prejuízo?"
   → Dor de relatórios/análise

4. "Já teve problemas com funcionários dando descontos sem autorização?"
   → Dor de controle de equipe

5. "Quanto tempo você gasta por semana organizando planilhas?"
   → Dor de produtividade

6. "Se um fiscal chegasse agora, você conseguiria emitir todas as notas?"
   → Dor fiscal/legal

7. "Você sabe exatamente quanto vai faturar esse mês?"
   → Dor de previsibilidade`,
    dicas: [
      'Faça uma pergunta por vez e ESCUTE a resposta',
      'Anote as dores mencionadas para usar no fechamento',
      'Use o silêncio a seu favor - deixe o cliente falar',
      'Aprofunde cada dor: "Me conta mais sobre isso..."'
    ]
  },
  {
    id: 'sond-2',
    titulo: 'Perguntas de Qualificação - Budget',
    categoria: 'sondagem',
    contexto: 'Descobrir se o lead tem capacidade de investimento',
    conteudo: `PERGUNTAS INDIRETAS (mais elegantes):

1. "Você já investiu em algum sistema antes?"
   → Descobre experiência e disposição para pagar

2. "O que é mais importante pra você: preço ou resultado?"
   → Identifica perfil do comprador

3. "Quantos funcionários você tem hoje?"
   → Dimensiona o negócio

4. "Qual seu faturamento médio mensal?"
   → Qualifica capacidade financeira

5. "Você prefere pagar à vista com desconto ou parcelado?"
   → Assume a venda e testa objeção de preço

SINAIS DE QUALIFICAÇÃO POSITIVA:
✓ Faz perguntas sobre funcionalidades
✓ Pede para ver demonstração
✓ Menciona problemas específicos
✓ Pergunta sobre formas de pagamento`,
    dicas: [
      'Nunca pergunte diretamente "você tem dinheiro?"',
      'Qualifique ANTES de apresentar preço',
      'Se não qualificou bem, não perca tempo - agradeça e vá embora',
      'Lead não qualificado = desperdício de energia'
    ]
  },

  // APRESENTAÇÃO
  {
    id: 'apres-1',
    titulo: 'Roteiro de Demonstração',
    categoria: 'apresentacao',
    contexto: 'Estrutura para apresentar o sistema de forma convincente',
    conteudo: `ESTRUTURA DA DEMO (15-20 min):

1. CONTEXTO (2 min)
"Antes de mostrar, deixa eu recapitular o que você me disse..."
[Repita as dores que ele mencionou]

2. SOLUÇÃO GERAL (3 min)
"O Império Sistemas resolve exatamente isso. Deixa eu te mostrar..."
[Visão geral do dashboard]

3. FUNCIONALIDADES ESPECÍFICAS (8 min)
[Mostre APENAS as que resolvem as dores dele]
- Vendas/PDV → Se mencionou controle de vendas
- Estoque → Se mencionou perda de vendas
- Relatórios → Se mencionou falta de informação
- Fiscal → Se mencionou preocupação com notas

4. PROVA SOCIAL (2 min)
"O [CLIENTE SIMILAR] tinha o mesmo problema e em [TEMPO]..."

5. TRANSIÇÃO PARA FECHAMENTO (2 min)
"Faz sentido pra você? O que achou?"`,
    dicas: [
      'Nunca mostre TODAS as funcionalidades - só as relevantes',
      'Deixe o cliente clicar e interagir quando possível',
      'Use dados reais na demo, não dados fictícios',
      'Mantenha contato visual, não fique olhando só pra tela'
    ]
  },
  {
    id: 'apres-2',
    titulo: 'Pitch de Elevador - 60 segundos',
    categoria: 'apresentacao',
    contexto: 'Explicação rápida do sistema quando tem pouco tempo',
    conteudo: `"O Império Sistemas é um sistema completo de gestão que ajuda [TIPO DE NEGÓCIO] a vender mais e perder menos dinheiro.

Em vez de usar caderno, planilha ou aquele sistema complicado, você tem tudo num lugar só: vendas, estoque, financeiro, notas fiscais.

O diferencial? É simples de usar - em 1 dia você já está operando. E você não paga por funcionalidade, é tudo incluso por [VALOR]/mês.

Já ajudamos mais de [NÚMERO] empresas aqui na região. Posso te mostrar em 5 minutos como funciona?"`,
    dicas: [
      'Pratique até conseguir falar naturalmente',
      'Adapte o tipo de negócio para cada cliente',
      'Termine SEMPRE com uma pergunta ou call-to-action',
      'Fale com energia e convicção'
    ]
  },

  // OBJEÇÕES
  {
    id: 'obj-1',
    titulo: 'Objeção: "Está caro"',
    categoria: 'objecoes',
    contexto: 'Quando o cliente diz que o preço é alto',
    conteudo: `RESPOSTA ESTRUTURADA:

1. CONCORDAR E REDIRECIONAR:
"Entendo sua preocupação com o investimento. Me deixa te fazer uma pergunta..."

2. PERGUNTAR:
"Quanto você acha que perde por mês por não ter um controle adequado?"
[Deixe ele calcular mentalmente]

3. COMPARAR:
"Se você perde R$ [X] por mês em estoque furado, vendas não registradas, funcionário que dá desconto errado... em [Y] meses o sistema já se pagou."

4. MINIMIZAR:
"Olha, R$ [VALOR] por mês dá R$ [VALOR/30] por dia. Menos que um cafezinho. Você não acha que seu negócio vale esse investimento?"

5. OFERECER SAÍDA:
"E se não funcionar pra você, tem garantia de [X] dias. Você testa sem risco."`,
    dicas: [
      'Nunca baixe o preço na primeira objeção',
      'Faça ele perceber o custo de NÃO comprar',
      'Use a técnica do "investimento vs gasto"',
      'Preço só é problema quando valor não foi demonstrado'
    ]
  },
  {
    id: 'obj-2',
    titulo: 'Objeção: "Preciso pensar"',
    categoria: 'objecoes',
    contexto: 'Quando o cliente quer adiar a decisão',
    conteudo: `RESPOSTA ESTRUTURADA:

1. VALIDAR:
"Claro, é uma decisão importante mesmo."

2. DESCOBRIR A REAL OBJEÇÃO:
"Me ajuda a entender: quando você diz que precisa pensar, é sobre o quê exatamente?
- O sistema em si?
- O investimento?
- Precisa falar com alguém?
- Ou é só o momento?"

[ESPERE A RESPOSTA - ela vai revelar a objeção real]

3. TRATAR A OBJEÇÃO REAL:
[Se for preço] → Use o script de "está caro"
[Se for decisor] → "Podemos agendar uma apresentação com essa pessoa?"
[Se for momento] → "O que precisaria acontecer para ser o momento certo?"

4. CRIAR URGÊNCIA (se apropriado):
"Entendo. Só te aviso que essa condição especial é só até [DATA]. Depois o valor volta ao normal."`,
    dicas: [
      '"Preciso pensar" NUNCA é a objeção real',
      'Sempre descubra o que está por trás',
      'Não pressione demais - pode perder a venda',
      'Agende um follow-up específico: "Posso te ligar quinta às 14h?"'
    ]
  },
  {
    id: 'obj-3',
    titulo: 'Objeção: "Já tenho sistema"',
    categoria: 'objecoes',
    contexto: 'Quando o cliente já usa outro sistema',
    conteudo: `RESPOSTA ESTRUTURADA:

1. MOSTRAR INTERESSE:
"Que bom que você já valoriza ter um sistema! Qual você usa?"

2. INVESTIGAR PROBLEMAS:
"E como tem sido sua experiência? Ele resolve tudo que você precisa?"
[Geralmente vão mencionar problemas]

3. COMPARAR SEM ATACAR:
"Entendi. Olha, não vou falar mal de nenhum concorrente. Mas deixa eu te mostrar [DIFERENCIAL ESPECÍFICO] que talvez você não tenha hoje..."

4. FOCAR NO GANHO:
"A questão não é trocar por trocar. É: você está satisfeito com os RESULTADOS que está tendo? Se pudesse melhorar [DOR MENCIONADA], valeria a pena avaliar?"

5. OFERECER TESTE:
"Que tal rodar os dois em paralelo por [X] dias? Assim você compara na prática, sem risco."`,
    dicas: [
      'Nunca fale mal do concorrente diretamente',
      'Foque nos resultados, não nas funcionalidades',
      'Cliente com sistema ruim é mais fácil de converter',
      'Custo de troca é uma barreira real - minimize-a'
    ]
  },
  {
    id: 'obj-4',
    titulo: 'Objeção: "Vou falar com meu sócio/esposa"',
    categoria: 'objecoes',
    contexto: 'Quando o cliente não é o único decisor',
    conteudo: `RESPOSTA ESTRUTURADA:

1. VALIDAR:
"Faz muito sentido incluir [pessoa] na decisão."

2. QUALIFICAR O DECISOR:
"Me conta: o [pessoa] também cuida da operação do dia-a-dia ou é mais da parte financeira?"

3. OFERECER APRESENTAÇÃO:
"Olha, para facilitar, que tal agendarmos uma apresentação rápida com vocês dois? Assim eu posso responder as dúvidas dele também e vocês decidem juntos."

4. SE NÃO FOR POSSÍVEL:
"Entendo. Então me deixa preparar um resumo com os pontos principais pra você mostrar pra ele. E qualquer dúvida que surgir, é só me chamar."

5. AGENDAR FOLLOW-UP:
"Quando você acha que consegue conversar com ele? Posso te ligar [DIA] pra saber o que ele achou?"`,
    dicas: [
      'Sempre tente apresentar para TODOS os decisores',
      'Identifique quem decide O QUÊ (operação vs dinheiro)',
      'Prepare o cliente para "vender" para o sócio',
      'Nunca deixe sem data de retorno'
    ]
  },
  {
    id: 'obj-5',
    titulo: 'Objeção: "Não tenho tempo"',
    categoria: 'objecoes',
    contexto: 'Quando o cliente diz que está muito ocupado',
    conteudo: `RESPOSTA ESTRUTURADA:

1. CONCORDAR:
"Imagino! Empresário trabalha muito mesmo."

2. INVERTER A OBJEÇÃO:
"E é exatamente por isso que você PRECISA de um sistema. Quanto tempo você gasta hoje fazendo controle manual? O sistema faz em segundos o que você leva horas."

3. MINIMIZAR O TEMPO:
"Olha, a implementação leva [X] horas. Em uma semana você já está usando. E depois disso, você GANHA tempo todo dia."

4. OFERECER FLEXIBILIDADE:
"Posso fazer o treinamento no horário que for melhor pra você. Até à noite ou domingo, se precisar."

5. CRIAR SENSO DE URGÊNCIA:
"Quanto mais você demora pra organizar, mais tempo vai continuar perdendo. Que tal começarmos na próxima semana?"`,
    dicas: [
      'Tempo é a objeção mais comum de empresários',
      'Mostre que sistema ECONOMIZA tempo',
      'Ofereça implementação em horário alternativo',
      'Use dados: "Em média economiza X horas por semana"'
    ]
  },

  // FECHAMENTO
  {
    id: 'fech-1',
    titulo: 'Fechamento Assumido',
    categoria: 'fechamento',
    contexto: 'Técnica de fechamento quando o cliente já demonstrou interesse',
    conteudo: `COMO USAR:

Após a demonstração, quando o cliente fez perguntas e mostrou interesse, NÃO PERGUNTE se ele quer comprar. ASSUMA a venda:

❌ ERRADO: "E aí, você quer contratar?"
✅ CERTO: "Então vamos fazer assim: você prefere começar com o plano mensal ou já aproveitar o desconto do anual?"

VARIAÇÕES:

1. FECHAMENTO POR ALTERNATIVA:
"Você prefere que eu venha instalar amanhã de manhã ou à tarde?"

2. FECHAMENTO POR DETALHE:
"O cadastro vai ficar no seu nome ou no nome da empresa?"

3. FECHAMENTO POR PRÓXIMO PASSO:
"Vou precisar do CNPJ pra gerar o contrato. Você tem aí?"

4. FECHAMENTO POR AGENDA:
"Deixa eu ver minha agenda... Consigo fazer a instalação quinta às 10h. Funciona pra você?"`,
    dicas: [
      'Nunca pergunte SIM ou NÃO',
      'Sempre dê duas opções onde ambas = venda',
      'Fale com naturalidade, como se a venda já estivesse feita',
      'Se ele recusar, descubra a objeção e trate'
    ]
  },
  {
    id: 'fech-2',
    titulo: 'Fechamento por Escassez',
    categoria: 'fechamento',
    contexto: 'Criar urgência legítima para decisão',
    conteudo: `TÉCNICAS DE ESCASSEZ LEGÍTIMA:

1. VAGAS LIMITADAS:
"Olha, eu só consigo atender [X] clientes novos por mês porque faço o acompanhamento pessoalmente. Esse mês só tenho mais [Y] vagas."

2. CONDIÇÃO ESPECIAL:
"Essa condição de [DESCONTO/BÔNUS] é só pra quem fecha essa semana. Depois volta ao preço normal de [VALOR]."

3. AUMENTO DE PREÇO:
"A partir do mês que vem o valor vai reajustar. Se fechar agora, você trava o preço atual."

4. BÔNUS EXPIRANDO:
"Quem fecha até [DATA] ganha [BÔNUS: treinamento extra, mês grátis, etc]. Depois esse bônus não vai estar disponível."

⚠️ IMPORTANTE: Só use escassez REAL. Mentir destrói sua credibilidade.`,
    dicas: [
      'Escassez falsa = perda de confiança permanente',
      'Documente as condições especiais',
      'Se der prazo, cumpra - não estenda indefinidamente',
      'Combine escassez com valor demonstrado'
    ]
  },
  {
    id: 'fech-3',
    titulo: 'Fechamento por Resumo de Benefícios',
    categoria: 'fechamento',
    contexto: 'Recapitular valor antes de pedir a venda',
    conteudo: `ESTRUTURA:

"Então deixa eu recapitular o que você vai ter:

✅ [BENEFÍCIO 1 baseado na dor que ele mencionou]
✅ [BENEFÍCIO 2 baseado na dor que ele mencionou]
✅ [BENEFÍCIO 3 baseado na dor que ele mencionou]
✅ Suporte [DETALHE]
✅ Treinamento completo
✅ Atualizações sem custo extra

Tudo isso por apenas R$ [VALOR] por mês.

E ainda tem a garantia de [X] dias - se não gostar, devolvemos seu dinheiro.

Vamos começar?"

[Silêncio. Espere ele responder.]`,
    dicas: [
      'Liste APENAS os benefícios que importam para ELE',
      'Use as palavras que ELE usou durante a conversa',
      'Faça o silêncio trabalhar - não fale depois de perguntar',
      'Se ele hesitar, pergunte: "O que está te impedindo?"'
    ]
  },

  // FOLLOW-UP
  {
    id: 'follow-1',
    titulo: 'Follow-up Dia Seguinte',
    categoria: 'followup',
    contexto: 'Mensagem para enviar 24h após apresentação sem fechamento',
    conteudo: `Olá [NOME]! Tudo bem?

Passando pra saber se surgiu alguma dúvida sobre o que conversamos ontem.

Fiquei pensando no que você falou sobre [DOR ESPECÍFICA QUE ELE MENCIONOU] e lembrei de um caso de um cliente nosso que tinha o mesmo problema. Em [TEMPO] ele conseguiu [RESULTADO].

Se quiser, posso te mandar o contato dele pra você trocar uma ideia.

Abraço!`,
    dicas: [
      'Sempre personalize - nunca mande mensagem genérica',
      'Faça referência a algo específico da conversa',
      'Ofereça valor adicional (case, contato, material)',
      'Não pressione - seja consultivo'
    ]
  },
  {
    id: 'follow-2',
    titulo: 'Follow-up Após 1 Semana',
    categoria: 'followup',
    contexto: 'Mensagem para leads que esfriaram',
    conteudo: `Oi [NOME]!

Você sumiu, está tudo bem? 😊

Sei que você está ocupado, então vou ser direto:

Lembra que você mencionou [PROBLEMA/DOR]?

Eu preparei um [MATERIAL/CONDIÇÃO/DEMO] especialmente pensando nisso. Se tiver 5 minutos essa semana, adoraria te mostrar.

Qual melhor dia pra você?`,
    dicas: [
      'Seja breve e direto',
      'Relembre a dor, não o produto',
      'Ofereça algo novo/diferente',
      'Facilite a resposta com pergunta específica'
    ]
  },
  {
    id: 'follow-3',
    titulo: 'Follow-up de Reativação',
    categoria: 'followup',
    contexto: 'Para leads antigos que nunca fecharam',
    conteudo: `Oi [NOME]! Quanto tempo!

Lembra que conversamos sobre [SISTEMA/SOLUÇÃO] há [TEMPO]?

Muita coisa mudou desde então. Lançamos [NOVIDADE 1] e [NOVIDADE 2] que resolvem exatamente aquele problema de [DOR QUE ELE TINHA].

E o melhor: pra clientes que estavam na minha lista de espera, tenho uma condição especial.

Posso te ligar 5 minutos pra contar as novidades?`,
    dicas: [
      'Use quando tiver novidade real para contar',
      'Não mande se não tiver nada novo - vai parecer spam',
      'Reconheça o tempo que passou',
      'Crie sensação de exclusividade'
    ]
  },

  // PÓS-VENDA
  {
    id: 'pos-1',
    titulo: 'Mensagem de Boas-Vindas',
    categoria: 'posvenda',
    contexto: 'Enviar imediatamente após fechar a venda',
    conteudo: `[NOME], seja muito bem-vindo(a) à família [EMPRESA]! 🎉

Você tomou uma decisão muito importante pro seu negócio e estou aqui pra garantir que você tenha os melhores resultados.

Próximos passos:
1️⃣ Vou te enviar o acesso ao sistema em até [TEMPO]
2️⃣ Agendaremos seu treinamento para [DATA/PERÍODO]
3️⃣ Você terá meu contato direto para qualquer dúvida

Se surgir qualquer pergunta, é só me chamar. Estou aqui pra te ajudar!

Vamos juntos! 💪`,
    dicas: [
      'Envie IMEDIATAMENTE após o fechamento',
      'Reduza a ansiedade pós-compra',
      'Deixe claro os próximos passos',
      'Reforce que fez a escolha certa'
    ]
  },
  {
    id: 'pos-2',
    titulo: 'Check-in 7 Dias',
    categoria: 'posvenda',
    contexto: 'Verificar satisfação após primeira semana',
    conteudo: `Oi [NOME]! Tudo bem?

Já faz uma semana que você começou a usar o sistema. Queria saber: como está sendo a experiência?

Algumas perguntas rápidas:
- Está conseguindo usar todas as funcionalidades?
- Teve alguma dificuldade?
- A equipe está se adaptando bem?

Se tiver qualquer dúvida ou precisar de um treinamento extra, é só me avisar. Faz parte do nosso compromisso com você.

Abraço!`,
    dicas: [
      'Antecipe problemas antes de virarem cancelamento',
      'Mostre interesse genuíno no sucesso dele',
      'Ofereça ajuda proativamente',
      'Use essa oportunidade pra pedir feedback'
    ]
  },
  {
    id: 'pos-3',
    titulo: 'Pedido de Indicação',
    categoria: 'posvenda',
    contexto: 'Pedir indicações após cliente estar satisfeito',
    conteudo: `[NOME]! Que bom saber que você está tendo ótimos resultados! 🙏

Fico muito feliz em fazer parte desse crescimento.

Tenho um pedido: você conhece outros empresários que também poderiam se beneficiar do sistema?

Pode ser um amigo, fornecedor, ou alguém da mesma região.

Pra cada indicação que fechar, você ganha [BENEFÍCIO: desconto, mês grátis, bônus].

Se lembrar de alguém, é só me passar o contato que eu entro em contato com todo cuidado, mencionando que foi você quem indicou.

Obrigado pela confiança!`,
    dicas: [
      'Só peça indicação quando o cliente estiver satisfeito',
      'Ofereça benefício real pela indicação',
      'Facilite: peça contato, não que ele faça a ponte',
      'Agradeça independente de receber indicação'
    ]
  },

  // RECUPERAÇÃO
  {
    id: 'recup-1',
    titulo: 'Cliente Insatisfeito',
    categoria: 'recuperacao',
    contexto: 'Quando o cliente reclama ou quer cancelar',
    conteudo: `[NOME], antes de mais nada, me desculpe por essa situação. Você tem toda razão em estar frustrado.

Quero resolver isso pessoalmente. Pode me contar exatamente o que aconteceu?

Enquanto isso, já estou [AÇÃO IMEDIATA: acionando suporte, verificando, etc].

Você é um cliente importante pra nós e vou fazer de tudo pra reverter essa situação.

Posso te ligar agora pra resolvermos juntos?`,
    dicas: [
      'NUNCA discuta ou se justifique primeiro',
      'Peça desculpas genuinamente',
      'Tome ação imediata visível',
      'Transforme reclamação em oportunidade de fidelização'
    ]
  },
  {
    id: 'recup-2',
    titulo: 'Prevenção de Churn',
    categoria: 'recuperacao',
    contexto: 'Quando percebe que cliente está desengajado',
    conteudo: `Oi [NOME]!

Percebi que você não está usando muito o sistema ultimamente. Está tudo bem?

Sei que às vezes a correria do dia-a-dia dificulta, mas não quero que você perca os benefícios que contratou.

Que tal agendarmos uma sessão de 30 minutos pra eu te mostrar alguns atalhos que vão facilitar sua vida?

Muitos clientes que estavam na mesma situação dobraram a produtividade depois dessa sessão.

Qual melhor horário pra você essa semana?`,
    dicas: [
      'Monitore uso do cliente proativamente',
      'Aborde ANTES de pedir cancelamento',
      'Ofereça ajuda, não pressão',
      'Reengaje com valor, não cobrança'
    ]
  }
]

const categorias = [
  { id: 'abordagem', nome: 'Abordagem Inicial', icone: 'users', cor: '#4CAF50' },
  { id: 'sondagem', nome: 'Sondagem e Qualificação', icone: 'target', cor: '#2196F3' },
  { id: 'apresentacao', nome: 'Apresentação e Pitch', icone: 'sparkles', cor: '#9C27B0' },
  { id: 'objecoes', nome: 'Quebra de Objeções', icone: 'shield', cor: '#FF5722' },
  { id: 'fechamento', nome: 'Técnicas de Fechamento', icone: 'handshake', cor: '#D4AF37' },
  { id: 'followup', nome: 'Follow-up', icone: 'clock', cor: '#00BCD4' },
  { id: 'posvenda', nome: 'Pós-Venda', icone: 'star', cor: '#8BC34A' },
  { id: 'recuperacao', nome: 'Recuperação', icone: 'alert', cor: '#F44336' },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [categoriaAberta, setCategoriaAberta] = useState<string | null>('abordagem')
  const [templateSelecionado, setTemplateSelecionado] = useState<Template | null>(null)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
  }, [router])

  const getIcone = (tipo: string) => {
    switch(tipo) {
      case 'users': return <Users className="w-5 h-5" />
      case 'target': return <Target className="w-5 h-5" />
      case 'sparkles': return <Sparkles className="w-5 h-5" />
      case 'shield': return <Shield className="w-5 h-5" />
      case 'handshake': return <Handshake className="w-5 h-5" />
      case 'clock': return <Clock className="w-5 h-5" />
      case 'star': return <Star className="w-5 h-5" />
      case 'alert': return <AlertTriangle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const copiarTemplate = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const templatesCategoria = (catId: string) => {
    return templates.filter(t => t.categoria === catId)
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl gold-text">Templates de Vendas</h1>
            <p className="text-[var(--gray)] text-sm">Scripts prontos para copiar e usar</p>
          </div>
        </header>

        {/* Intro */}
        <section className="glass p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-[var(--gold)]" />
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2">Como Usar os Templates</h2>
              <p className="text-[var(--gray)] text-sm leading-relaxed">
                Estes templates são pontos de partida. <strong className="text-white">Personalize sempre</strong> com
                o nome do cliente, detalhes do negócio dele e as dores específicas que ele mencionou.
                Um script decorado soa artificial - adapte para sua voz e contexto.
              </p>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista de Categorias */}
          <div className="lg:col-span-1 space-y-3">
            {categorias.map((cat) => (
              <div key={cat.id} className="glass overflow-hidden">
                <button
                  onClick={() => setCategoriaAberta(categoriaAberta === cat.id ? null : cat.id)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.cor}20`, color: cat.cor }}
                  >
                    {getIcone(cat.icone)}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium text-sm">{cat.nome}</h3>
                    <p className="text-[var(--gray)] text-xs">
                      {templatesCategoria(cat.id).length} templates
                    </p>
                  </div>
                  {categoriaAberta === cat.id ? (
                    <ChevronDown className="w-4 h-4 text-[var(--gold)]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[var(--gray)]" />
                  )}
                </button>

                {categoriaAberta === cat.id && (
                  <div className="border-t border-white/10">
                    {templatesCategoria(cat.id).map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setTemplateSelecionado(template)}
                        className={`w-full p-3 pl-6 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                          templateSelecionado?.id === template.id ? 'bg-white/10' : ''
                        }`}
                      >
                        <p className={`text-sm ${
                          templateSelecionado?.id === template.id ? 'text-[var(--gold)]' : 'text-white'
                        }`}>
                          {template.titulo}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visualização do Template */}
          <div className="lg:col-span-2">
            {templateSelecionado ? (
              <div className="glass p-6 sticky top-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {templateSelecionado.titulo}
                    </h2>
                    <p className="text-[var(--gray)] text-sm">
                      {templateSelecionado.contexto}
                    </p>
                  </div>
                  <button
                    onClick={() => copiarTemplate(templateSelecionado.conteudo)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      copiado
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-[var(--gold)]/20 text-[var(--gold)] hover:bg-[var(--gold)]/30'
                    }`}
                  >
                    {copiado ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Conteúdo do Template */}
                <div className="bg-black/40 rounded-xl p-5 mb-6 border border-white/10">
                  <pre className="text-white text-sm whitespace-pre-wrap font-sans leading-relaxed">
                    {templateSelecionado.conteudo}
                  </pre>
                </div>

                {/* Dicas */}
                <div className="bg-[var(--gold)]/10 rounded-xl p-5 border border-[var(--gold)]/20">
                  <h3 className="text-[var(--gold)] font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Dicas de Uso
                  </h3>
                  <ul className="space-y-2">
                    {templateSelecionado.dicas.map((dica, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--gray)]">
                        <span className="text-[var(--gold)] mt-1">•</span>
                        <span>{dica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="glass p-12 text-center">
                <FileText className="w-16 h-16 text-[var(--gray)]/50 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Selecione um Template</h3>
                <p className="text-[var(--gray)] text-sm">
                  Escolha uma categoria e clique em um template para visualizar
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">{templates.length}</p>
            <p className="text-[var(--gray)] text-sm">Templates</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">{categorias.length}</p>
            <p className="text-[var(--gray)] text-sm">Categorias</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">100%</p>
            <p className="text-[var(--gray)] text-sm">Testados</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold gold-text">∞</p>
            <p className="text-[var(--gray)] text-sm">Atualizações</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Templates de Vendas - Império Sistemas
          </p>
        </footer>
      </div>
    </main>
  )
}
