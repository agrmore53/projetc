import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
})

// ============================================
// RSS FEEDS - BRASIL (27 UFs)
// ============================================
const feedsBrasil: Record<string, { nome: string, feeds: string[] }> = {
  'AC': {
    nome: 'Acre',
    feeds: [
      'https://g1.globo.com/rss/g1/ac/',
      'https://g1.globo.com/rss/g1/ac/acre/'
    ]
  },
  'AL': {
    nome: 'Alagoas',
    feeds: [
      'https://g1.globo.com/rss/g1/al/',
      'https://g1.globo.com/rss/g1/al/alagoas/'
    ]
  },
  'AP': {
    nome: 'Amapá',
    feeds: [
      'https://g1.globo.com/rss/g1/ap/',
      'https://g1.globo.com/rss/g1/ap/amapa/'
    ]
  },
  'AM': {
    nome: 'Amazonas',
    feeds: [
      'https://g1.globo.com/rss/g1/am/',
      'https://g1.globo.com/rss/g1/am/amazonas/'
    ]
  },
  'BA': {
    nome: 'Bahia',
    feeds: [
      'https://g1.globo.com/rss/g1/ba/',
      'https://g1.globo.com/rss/g1/bahia/'
    ]
  },
  'CE': {
    nome: 'Ceará',
    feeds: [
      'https://g1.globo.com/rss/g1/ce/',
      'https://g1.globo.com/rss/g1/ceara/'
    ]
  },
  'DF': {
    nome: 'Distrito Federal',
    feeds: [
      'https://g1.globo.com/rss/g1/df/',
      'https://g1.globo.com/rss/g1/df/distrito-federal/'
    ]
  },
  'ES': {
    nome: 'Espírito Santo',
    feeds: [
      'https://g1.globo.com/rss/g1/es/',
      'https://g1.globo.com/rss/g1/espirito-santo/'
    ]
  },
  'GO': {
    nome: 'Goiás',
    feeds: [
      'https://g1.globo.com/rss/g1/go/',
      'https://g1.globo.com/rss/g1/goias/'
    ]
  },
  'MA': {
    nome: 'Maranhão',
    feeds: [
      'https://g1.globo.com/rss/g1/ma/',
      'https://g1.globo.com/rss/g1/maranhao/'
    ]
  },
  'MT': {
    nome: 'Mato Grosso',
    feeds: [
      'https://g1.globo.com/rss/g1/mt/',
      'https://g1.globo.com/rss/g1/mato-grosso/'
    ]
  },
  'MS': {
    nome: 'Mato Grosso do Sul',
    feeds: [
      'https://g1.globo.com/rss/g1/ms/',
      'https://g1.globo.com/rss/g1/mato-grosso-do-sul/'
    ]
  },
  'MG': {
    nome: 'Minas Gerais',
    feeds: [
      'https://g1.globo.com/rss/g1/mg/',
      'https://g1.globo.com/rss/g1/minas-gerais/'
    ]
  },
  'PA': {
    nome: 'Pará',
    feeds: [
      'https://g1.globo.com/rss/g1/pa/',
      'https://g1.globo.com/rss/g1/para/'
    ]
  },
  'PB': {
    nome: 'Paraíba',
    feeds: [
      'https://g1.globo.com/rss/g1/pb/',
      'https://g1.globo.com/rss/g1/paraiba/'
    ]
  },
  'PR': {
    nome: 'Paraná',
    feeds: [
      'https://g1.globo.com/rss/g1/pr/',
      'https://g1.globo.com/rss/g1/parana/'
    ]
  },
  'PE': {
    nome: 'Pernambuco',
    feeds: [
      'https://g1.globo.com/rss/g1/pe/',
      'https://g1.globo.com/rss/g1/pernambuco/'
    ]
  },
  'PI': {
    nome: 'Piauí',
    feeds: [
      'https://g1.globo.com/rss/g1/pi/',
      'https://g1.globo.com/rss/g1/piaui/'
    ]
  },
  'RJ': {
    nome: 'Rio de Janeiro',
    feeds: [
      'https://g1.globo.com/rss/g1/rj/',
      'https://g1.globo.com/rss/g1/rio-de-janeiro/'
    ]
  },
  'RN': {
    nome: 'Rio Grande do Norte',
    feeds: [
      'https://g1.globo.com/rss/g1/rn/',
      'https://g1.globo.com/rss/g1/rn/rio-grande-do-norte/'
    ]
  },
  'RS': {
    nome: 'Rio Grande do Sul',
    feeds: [
      'https://g1.globo.com/rss/g1/rs/',
      'https://g1.globo.com/rss/g1/rs/rio-grande-do-sul/'
    ]
  },
  'RO': {
    nome: 'Rondônia',
    feeds: [
      'https://g1.globo.com/rss/g1/ro/',
      'https://g1.globo.com/rss/g1/rondonia/'
    ]
  },
  'RR': {
    nome: 'Roraima',
    feeds: [
      'https://g1.globo.com/rss/g1/rr/',
      'https://g1.globo.com/rss/g1/roraima/'
    ]
  },
  'SC': {
    nome: 'Santa Catarina',
    feeds: [
      'https://g1.globo.com/rss/g1/sc/',
      'https://g1.globo.com/rss/g1/santa-catarina/'
    ]
  },
  'SP': {
    nome: 'São Paulo',
    feeds: [
      'https://g1.globo.com/rss/g1/sp/',
      'https://feeds.folha.uol.com.br/cotidiano/rss091.xml',
      'https://feeds.folha.uol.com.br/mercado/rss091.xml'
    ]
  },
  'SE': {
    nome: 'Sergipe',
    feeds: [
      'https://g1.globo.com/rss/g1/se/',
      'https://g1.globo.com/rss/g1/sergipe/'
    ]
  },
  'TO': {
    nome: 'Tocantins',
    feeds: [
      'https://g1.globo.com/rss/g1/to/',
      'https://g1.globo.com/rss/g1/tocantins/'
    ]
  },
  'BR': {
    nome: 'Brasil (Nacional)',
    feeds: [
      'https://g1.globo.com/rss/g1/',
      'https://feeds.folha.uol.com.br/emcimadahora/rss091.xml',
      'https://rss.uol.com.br/feed/noticias.xml'
    ]
  }
}

// ============================================
// RSS FEEDS - EUA (50 Estados + Nacional)
// ============================================
const feedsEUA: Record<string, { nome: string, feeds: string[] }> = {
  'CA': {
    nome: 'California',
    feeds: [
      'https://www.latimes.com/local/rss2.0.xml',
      'https://www.sfchronicle.com/bayarea/feed/'
    ]
  },
  'TX': {
    nome: 'Texas',
    feeds: [
      'https://www.dallasnews.com/news/?outputType=rss',
      'https://www.houstonchronicle.com/news/houston-texas/feed/'
    ]
  },
  'FL': {
    nome: 'Florida',
    feeds: [
      'https://www.miamiherald.com/news/?outputType=rss',
      'https://www.tampabay.com/news/feed/'
    ]
  },
  'NY': {
    nome: 'New York',
    feeds: [
      'https://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml',
      'https://feeds.nypost.com/metro'
    ]
  },
  'PA': {
    nome: 'Pennsylvania',
    feeds: [
      'https://www.inquirer.com/arcio/rss/',
      'https://www.post-gazette.com/rss/local'
    ]
  },
  'IL': {
    nome: 'Illinois',
    feeds: [
      'https://www.chicagotribune.com/arcio/rss/category/news/',
      'https://chicago.suntimes.com/rss/index.xml'
    ]
  },
  'OH': {
    nome: 'Ohio',
    feeds: [
      'https://www.cleveland.com/news/index.rss',
      'https://www.dispatch.com/arcio/rss/'
    ]
  },
  'GA': {
    nome: 'Georgia',
    feeds: [
      'https://www.ajc.com/news/?outputType=rss'
    ]
  },
  'NC': {
    nome: 'North Carolina',
    feeds: [
      'https://www.charlotteobserver.com/news/local/?outputType=rss',
      'https://www.newsobserver.com/news/?outputType=rss'
    ]
  },
  'MI': {
    nome: 'Michigan',
    feeds: [
      'https://www.freep.com/news/?outputType=rss',
      'https://www.detroitnews.com/news/?outputType=rss'
    ]
  },
  'NJ': {
    nome: 'New Jersey',
    feeds: [
      'https://www.nj.com/news/index.rss'
    ]
  },
  'VA': {
    nome: 'Virginia',
    feeds: [
      'https://richmond.com/news/?outputType=rss'
    ]
  },
  'WA': {
    nome: 'Washington',
    feeds: [
      'https://www.seattletimes.com/seattle-news/feed/'
    ]
  },
  'AZ': {
    nome: 'Arizona',
    feeds: [
      'https://www.azcentral.com/news/?outputType=rss'
    ]
  },
  'MA': {
    nome: 'Massachusetts',
    feeds: [
      'https://www.bostonglobe.com/rss/hpheadlines'
    ]
  },
  'TN': {
    nome: 'Tennessee',
    feeds: [
      'https://www.tennessean.com/news/?outputType=rss'
    ]
  },
  'IN': {
    nome: 'Indiana',
    feeds: [
      'https://www.indystar.com/news/?outputType=rss'
    ]
  },
  'MO': {
    nome: 'Missouri',
    feeds: [
      'https://www.stltoday.com/news/?outputType=rss'
    ]
  },
  'MD': {
    nome: 'Maryland',
    feeds: [
      'https://www.baltimoresun.com/arcio/rss/'
    ]
  },
  'WI': {
    nome: 'Wisconsin',
    feeds: [
      'https://www.jsonline.com/news/?outputType=rss'
    ]
  },
  'CO': {
    nome: 'Colorado',
    feeds: [
      'https://www.denverpost.com/news/feed/'
    ]
  },
  'MN': {
    nome: 'Minnesota',
    feeds: [
      'https://www.startribune.com/local/index.rss2'
    ]
  },
  'OR': {
    nome: 'Oregon',
    feeds: [
      'https://www.oregonlive.com/news/index.rss'
    ]
  },
  'NV': {
    nome: 'Nevada',
    feeds: [
      'https://www.reviewjournal.com/feed/'
    ]
  },
  'US': {
    nome: 'USA (Nacional)',
    feeds: [
      'https://rss.nytimes.com/services/xml/rss/nyt/US.xml',
      'https://feeds.npr.org/1001/rss.xml',
      'https://www.cbsnews.com/latest/rss/main',
      'https://abcnews.go.com/abcnews/usheadlines'
    ]
  }
}

// ============================================
// PALAVRAS-CHAVE - PORTUGUÊS (Brasil)
// ============================================
const palavrasChaveBR = [
  // Problemas gerais
  'reclamação', 'reclamam', 'reclama', 'problema', 'problemas',
  'fila', 'filas', 'demora', 'demorado', 'atraso', 'atrasado',
  'falta', 'faltam', 'escassez', 'crise', 'colapso',
  'dificuldade', 'difícil', 'prejuízo', 'prejuízos',
  'insatisfação', 'insatisfeitos', 'denúncia', 'denunciam',
  'protesto', 'protestam', 'manifestação', 'greve',
  'caos', 'abandono', 'precariedade', 'sucateado',

  // Saúde
  'hospital', 'upa', 'sus', 'consulta', 'médico', 'remédio',
  'medicamento', 'emergência', 'urgência', 'internação', 'leito',
  'paciente', 'doença', 'epidemia', 'surto',

  // Segurança
  'assalto', 'roubo', 'furto', 'crime', 'violência', 'insegurança',
  'homicídio', 'assassinato', 'sequestro', 'tráfico', 'milícia',

  // Transporte
  'trânsito', 'ônibus', 'metrô', 'transporte', 'congestionamento',
  'acidente', 'colisão', 'atropelamento', 'buraco', 'cratera',

  // Burocracia
  'burocracia', 'documento', 'cartório', 'licença', 'alvará',
  'inss', 'aposentadoria', 'benefício', 'fgts',

  // Finanças
  'dívida', 'inadimplência', 'juros', 'tarifa', 'conta', 'boleto',
  'inflação', 'preço', 'caro', 'aumento', 'reajuste',

  // Moradia
  'aluguel', 'moradia', 'habitação', 'sem-teto', 'despejo',
  'enchente', 'alagamento', 'deslizamento', 'desabamento',

  // Emprego
  'desemprego', 'demissão', 'salário', 'trabalho', 'layoff',

  // Educação
  'escola', 'vaga', 'matrícula', 'professor', 'ensino', 'creche',

  // Serviços
  'água', 'luz', 'energia', 'apagão', 'internet', 'telefone',
  'saneamento', 'esgoto', 'lixo', 'coleta'
]

// ============================================
// PALAVRAS-CHAVE - INGLÊS (EUA)
// ============================================
const palavrasChaveEN = [
  // General problems
  'complaint', 'problem', 'issue', 'crisis', 'failure',
  'delay', 'waiting', 'queue', 'shortage', 'lack',
  'difficulty', 'struggle', 'frustration', 'protest',
  'strike', 'chaos', 'collapse', 'broken', 'failing',

  // Health
  'hospital', 'healthcare', 'insurance', 'medical', 'patient',
  'emergency', 'ambulance', 'disease', 'epidemic', 'outbreak',
  'medication', 'prescription', 'clinic', 'doctor',

  // Safety
  'crime', 'robbery', 'theft', 'violence', 'shooting',
  'murder', 'assault', 'kidnapping', 'drug', 'gang',

  // Transport
  'traffic', 'commute', 'transit', 'bus', 'subway', 'train',
  'accident', 'crash', 'pothole', 'road', 'highway',

  // Bureaucracy
  'bureaucracy', 'government', 'permit', 'license', 'dmv',
  'social security', 'benefits', 'paperwork', 'regulation',

  // Finance
  'debt', 'loan', 'interest', 'fee', 'bill', 'payment',
  'inflation', 'price', 'expensive', 'cost', 'afford',
  'rent', 'mortgage', 'eviction', 'foreclosure',

  // Housing
  'housing', 'homeless', 'shelter', 'flood', 'fire',
  'damage', 'repair', 'landlord', 'tenant',

  // Employment
  'unemployment', 'layoff', 'fired', 'job', 'wage', 'salary',
  'worker', 'labor', 'union',

  // Education
  'school', 'education', 'student', 'teacher', 'tuition',
  'college', 'university', 'loan',

  // Utilities
  'water', 'electricity', 'power', 'outage', 'blackout',
  'internet', 'service', 'utility', 'bill'
]

// ============================================
// CATEGORIZAÇÃO
// ============================================
function categorizarNoticiaBR(texto: string): string {
  const t = texto.toLowerCase()

  if (/hospital|upa|sus|consulta|médico|remédio|saúde|doença|emergência|leito|paciente|epidemia/.test(t)) return 'Saúde'
  if (/assalto|roubo|furto|crime|violência|insegurança|polícia|homicídio|assassinato|sequestro|tráfico/.test(t)) return 'Segurança'
  if (/trânsito|ônibus|metrô|transporte|congestionamento|acidente|buraco|cratera/.test(t)) return 'Transporte'
  if (/burocracia|documento|cartório|licença|alvará|inss|aposentadoria|fgts/.test(t)) return 'Burocracia'
  if (/dívida|inadimplência|juros|tarifa|banco|financ|dinheiro|inflação|preço|caro|aumento/.test(t)) return 'Finanças'
  if (/aluguel|moradia|habitação|sem-teto|despejo|enchente|alagamento|deslizamento/.test(t)) return 'Moradia'
  if (/desemprego|demissão|salário|trabalho|emprego|vaga|contrat|layoff/.test(t)) return 'Emprego'
  if (/escola|matrícula|professor|ensino|educação|universidade|creche/.test(t)) return 'Educação'
  if (/ambiente|poluição|desmatamento|clima|lixo|água|saneamento|esgoto/.test(t)) return 'Meio Ambiente'
  if (/comida|alimento|fome|restaurante|supermercado|feira/.test(t)) return 'Alimentação'
  if (/luz|energia|apagão|internet|telefone/.test(t)) return 'Tecnologia'

  return 'Outro'
}

function categorizarNoticiaEN(texto: string): string {
  const t = texto.toLowerCase()

  if (/hospital|healthcare|medical|patient|emergency|disease|epidemic|medication|clinic|doctor/.test(t)) return 'Health'
  if (/crime|robbery|theft|violence|shooting|murder|assault|kidnapping|drug|gang/.test(t)) return 'Safety'
  if (/traffic|commute|transit|bus|subway|train|accident|crash|pothole|road/.test(t)) return 'Transport'
  if (/bureaucracy|government|permit|license|dmv|social security|regulation/.test(t)) return 'Bureaucracy'
  if (/debt|loan|interest|fee|bill|payment|inflation|price|expensive|cost|afford|rent|mortgage/.test(t)) return 'Finance'
  if (/housing|homeless|shelter|flood|fire|eviction|foreclosure|landlord/.test(t)) return 'Housing'
  if (/unemployment|layoff|fired|job|wage|salary|worker|labor/.test(t)) return 'Employment'
  if (/school|education|student|teacher|tuition|college|university/.test(t)) return 'Education'
  if (/environment|pollution|climate|waste|water|sanitation/.test(t)) return 'Environment'
  if (/power|outage|blackout|internet|utility/.test(t)) return 'Technology'

  return 'Other'
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function contemPalavraChave(texto: string, palavras: string[]): boolean {
  const t = texto.toLowerCase()
  return palavras.some(p => t.includes(p.toLowerCase()))
}

function sugerirUrgencia(texto: string, idioma: 'BR' | 'EN'): number {
  const t = texto.toLowerCase()

  if (idioma === 'BR') {
    if (/morte|morreu|morreram|óbito|fatal|grave|emergência|crise|colapso|tragédia/.test(t)) return 5
    if (/hospital|urgente|urgência|perigo|risco|acidente|ferido/.test(t)) return 4
    if (/problema|prejuízo|dano|falta|escassez|greve/.test(t)) return 3
    if (/reclamação|insatisfação|demora|atraso|fila/.test(t)) return 2
  } else {
    if (/death|died|killed|fatal|critical|emergency|crisis|collapse|tragedy/.test(t)) return 5
    if (/hospital|urgent|danger|risk|accident|injured|victim/.test(t)) return 4
    if (/problem|damage|shortage|strike|failure/.test(t)) return 3
    if (/complaint|delay|waiting|frustrated|queue/.test(t)) return 2
  }

  return 1
}

// ============================================
// API HANDLER
// ============================================
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pais = searchParams.get('pais') || 'BR'
  const estado = searchParams.get('estado') || (pais === 'BR' ? 'BR' : 'US')

  try {
    const feeds = pais === 'BR'
      ? feedsBrasil[estado] || feedsBrasil['BR']
      : feedsEUA[estado] || feedsEUA['US']

    const palavrasChave = pais === 'BR' ? palavrasChaveBR : palavrasChaveEN
    const categorizarFn = pais === 'BR' ? categorizarNoticiaBR : categorizarNoticiaEN
    const idioma = pais === 'BR' ? 'BR' : 'EN'

    const todasNoticias: Array<{
      titulo: string
      link: string
      fonte: string
      data: string
      categoria: string
      urgenciaSugerida: number
      resumo: string
      estado: string
      pais: string
    }> = []

    for (const feedUrl of feeds.feeds) {
      try {
        const feed = await parser.parseURL(feedUrl)
        const noticias = feed.items
          .filter(item => {
            const texto = `${item.title || ''} ${item.contentSnippet || ''}`
            return contemPalavraChave(texto, palavrasChave)
          })
          .slice(0, 15)
          .map(item => {
            const texto = `${item.title || ''} ${item.contentSnippet || ''}`
            return {
              titulo: item.title || 'Sem título',
              link: item.link || '',
              fonte: feed.title || feedUrl,
              data: item.pubDate || new Date().toISOString(),
              categoria: categorizarFn(texto),
              urgenciaSugerida: sugerirUrgencia(texto, idioma),
              resumo: (item.contentSnippet || '').slice(0, 250),
              estado: feeds.nome,
              pais: pais === 'BR' ? 'Brasil' : 'EUA'
            }
          })

        todasNoticias.push(...noticias)
      } catch (feedError) {
        console.error(`Erro ao buscar feed ${feedUrl}:`, feedError)
      }
    }

    // Remove duplicatas
    const noticiasUnicas = todasNoticias.filter((noticia, index, self) =>
      index === self.findIndex(n => n.titulo === noticia.titulo)
    )

    // Ordena por urgência
    noticiasUnicas.sort((a, b) => b.urgenciaSugerida - a.urgenciaSugerida)

    return NextResponse.json({
      success: true,
      pais: pais === 'BR' ? 'Brasil' : 'EUA',
      estado: feeds.nome,
      total: noticiasUnicas.length,
      noticias: noticiasUnicas.slice(0, 50)
    })

  } catch (error) {
    console.error('Erro geral:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar notícias',
      noticias: []
    }, { status: 500 })
  }
}

// ============================================
// LISTA DE ESTADOS DISPONÍVEIS
// ============================================
export async function POST() {
  return NextResponse.json({
    brasil: Object.entries(feedsBrasil).map(([sigla, data]) => ({
      sigla,
      nome: data.nome
    })),
    eua: Object.entries(feedsEUA).map(([sigla, data]) => ({
      sigla,
      nome: data.nome
    }))
  })
}
