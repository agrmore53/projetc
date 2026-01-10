import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
})

// RSS feeds dos principais jornais brasileiros
const feedsBrasil: Record<string, string[]> = {
  'SP': [
    'https://feeds.folha.uol.com.br/cotidiano/rss091.xml',
    'https://feeds.folha.uol.com.br/mercado/rss091.xml',
    'https://rss.uol.com.br/feed/noticias.xml'
  ],
  'RJ': [
    'https://oglobo.globo.com/rss.xml',
  ],
  'RS': [
    'https://gauchazh.clicrbs.com.br/ultimas-noticias/feed/'
  ],
  'MG': [
    'https://www.em.com.br/rss'
  ],
  'DF': [
    'https://www.correiobraziliense.com.br/rss'
  ],
  'Nacional': [
    'https://g1.globo.com/rss/g1/',
    'https://feeds.folha.uol.com.br/emcimadahora/rss091.xml',
    'https://rss.uol.com.br/feed/noticias.xml'
  ]
}

// Palavras-chave que indicam "dores" / problemas
const palavrasChave = [
  // Problemas gerais
  'reclamação', 'reclamam', 'reclama', 'reclamar',
  'problema', 'problemas',
  'fila', 'filas',
  'demora', 'demorado', 'atraso', 'atrasado',
  'falta', 'faltam', 'escassez',
  'crise', 'colapso',
  'dificuldade', 'difícil',
  'prejuízo', 'prejuízos',
  'insatisfação', 'insatisfeitos',
  'denúncia', 'denunciam',
  'protesto', 'protestam', 'manifestação',

  // Saúde
  'hospital', 'upa', 'sus', 'consulta', 'médico', 'remédio', 'medicamento',
  'emergência', 'urgência', 'internação', 'leito',

  // Segurança
  'assalto', 'roubo', 'furto', 'crime', 'violência', 'insegurança',

  // Transporte
  'trânsito', 'ônibus', 'metrô', 'transporte', 'congestionamento',

  // Burocracia
  'burocracia', 'documento', 'cartório', 'licença', 'alvará',

  // Finanças
  'dívida', 'inadimplência', 'juros', 'tarifa', 'conta', 'boleto',

  // Moradia
  'aluguel', 'moradia', 'habitação', 'sem-teto', 'despejo',

  // Emprego
  'desemprego', 'demissão', 'salário', 'trabalho',

  // Educação
  'escola', 'vaga', 'matrícula', 'professor', 'ensino'
]

// Categorização automática
function categorizarNoticia(texto: string): string {
  const textoLower = texto.toLowerCase()

  if (/hospital|upa|sus|consulta|médico|remédio|saúde|doença|emergência|leito/.test(textoLower)) {
    return 'Saúde'
  }
  if (/assalto|roubo|furto|crime|violência|insegurança|polícia|bandido/.test(textoLower)) {
    return 'Segurança'
  }
  if (/trânsito|ônibus|metrô|transporte|congestionamento|mobilidade/.test(textoLower)) {
    return 'Transporte'
  }
  if (/burocracia|documento|cartório|licença|alvará|prefeitura|governo/.test(textoLower)) {
    return 'Burocracia'
  }
  if (/dívida|inadimplência|juros|tarifa|banco|financ|dinheiro|economia/.test(textoLower)) {
    return 'Finanças'
  }
  if (/aluguel|moradia|habitação|casa|apartamento|imóvel|despejo/.test(textoLower)) {
    return 'Moradia'
  }
  if (/desemprego|demissão|salário|trabalho|emprego|vaga|contrat/.test(textoLower)) {
    return 'Emprego'
  }
  if (/escola|vaga|matrícula|professor|ensino|educação|universidade/.test(textoLower)) {
    return 'Educação'
  }
  if (/ambiente|poluição|desmatamento|clima|lixo|água|saneamento/.test(textoLower)) {
    return 'Meio Ambiente'
  }
  if (/comida|alimento|fome|restaurante|preço|supermercado/.test(textoLower)) {
    return 'Alimentação'
  }

  return 'Outro'
}

// Verifica se a notícia contém palavras-chave de problemas
function contemPalavraChave(texto: string): boolean {
  const textoLower = texto.toLowerCase()
  return palavrasChave.some(palavra => textoLower.includes(palavra))
}

// Sugere nível de urgência baseado no texto
function sugerirUrgencia(texto: string): number {
  const textoLower = texto.toLowerCase()

  if (/morte|morreu|morreram|óbito|fatal|grave|emergência|crise|colapso/.test(textoLower)) {
    return 5
  }
  if (/hospital|urgente|urgência|perigo|risco|acidente/.test(textoLower)) {
    return 4
  }
  if (/problema|prejuízo|dano|falta|escassez/.test(textoLower)) {
    return 3
  }
  if (/reclamação|insatisfação|demora|atraso/.test(textoLower)) {
    return 2
  }

  return 1
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const estado = searchParams.get('estado') || 'Nacional'

  try {
    const feeds = feedsBrasil[estado] || feedsBrasil['Nacional']
    const todasNoticias: Array<{
      titulo: string
      link: string
      fonte: string
      data: string
      categoria: string
      urgenciaSugerida: number
      resumo: string
    }> = []

    for (const feedUrl of feeds) {
      try {
        const feed = await parser.parseURL(feedUrl)
        const noticias = feed.items
          .filter(item => {
            const texto = `${item.title || ''} ${item.contentSnippet || ''}`
            return contemPalavraChave(texto)
          })
          .slice(0, 10) // Limita a 10 por feed
          .map(item => ({
            titulo: item.title || 'Sem título',
            link: item.link || '',
            fonte: feed.title || 'Desconhecido',
            data: item.pubDate || new Date().toISOString(),
            categoria: categorizarNoticia(`${item.title || ''} ${item.contentSnippet || ''}`),
            urgenciaSugerida: sugerirUrgencia(`${item.title || ''} ${item.contentSnippet || ''}`),
            resumo: (item.contentSnippet || '').slice(0, 200)
          }))

        todasNoticias.push(...noticias)
      } catch (feedError) {
        console.error(`Erro ao buscar feed ${feedUrl}:`, feedError)
      }
    }

    // Remove duplicatas por título
    const noticiasUnicas = todasNoticias.filter((noticia, index, self) =>
      index === self.findIndex(n => n.titulo === noticia.titulo)
    )

    // Ordena por urgência sugerida
    noticiasUnicas.sort((a, b) => b.urgenciaSugerida - a.urgenciaSugerida)

    return NextResponse.json({
      success: true,
      estado,
      total: noticiasUnicas.length,
      noticias: noticiasUnicas.slice(0, 30) // Máximo 30 notícias
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
