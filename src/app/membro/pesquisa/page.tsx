'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  Search,
  FileText,
  Globe,
  TrendingUp,
  Plus,
  Trash2,
  ArrowLeft,
  ExternalLink,
  BarChart3,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

type Pesquisa = {
  id?: string
  created_at?: string
  problema: string
  categoria: string
  pais: string
  estado: string
  fonte: string
  link: string
  frequencia: number
  urgencia: number
  notas: string
}

const categorias = [
  'Saúde',
  'Finanças',
  'Burocracia',
  'Educação',
  'Segurança',
  'Transporte',
  'Moradia',
  'Emprego',
  'Tecnologia',
  'Meio Ambiente',
  'Alimentação',
  'Relacionamentos',
  'Outro'
]

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const estadosEUA = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
  'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
  'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const jornaisBrasil: Record<string, string[]> = {
  'AC': ['A Gazeta do Acre - https://agazetadoacre.com', 'AC24Horas - https://ac24horas.com'],
  'AL': ['Gazeta de Alagoas - https://gazetaweb.com', 'TNH1 - https://tnh1.com.br'],
  'AP': ['Diário do Amapá - https://diariodoamapa.com.br', 'SelesNafes - https://selesnafes.com'],
  'AM': ['A Crítica - https://acritica.com', 'Em Tempo - https://emtempo.com.br'],
  'BA': ['A Tarde - https://atarde.com.br', 'Correio - https://correio24horas.com.br'],
  'CE': ['O Povo - https://opovo.com.br', 'Diário do Nordeste - https://diariodonordeste.com.br'],
  'DF': ['Correio Braziliense - https://correiobraziliense.com.br', 'Metrópoles - https://metropoles.com'],
  'ES': ['A Gazeta - https://agazeta.com.br', 'A Tribuna - https://tribunaonline.com.br'],
  'GO': ['O Popular - https://opopular.com.br', 'Diário de Goiás - https://diariodegoias.com.br'],
  'MA': ['O Imparcial - https://oimparcial.com.br', 'Imirante - https://imirante.com'],
  'MT': ['Gazeta Digital - https://gazetadigital.com.br', 'Olhar Direto - https://olhardireto.com.br'],
  'MS': ['Correio do Estado - https://correiodoestado.com.br', 'Campo Grande News - https://campograndenews.com.br'],
  'MG': ['Estado de Minas - https://em.com.br', 'O Tempo - https://otempo.com.br'],
  'PA': ['O Liberal - https://oliberal.com', 'Diário do Pará - https://diariodopara.com.br'],
  'PB': ['Correio da Paraíba - https://correiodaparaiba.com.br', 'Jornal da Paraíba - https://jornaldaparaiba.com.br'],
  'PR': ['Gazeta do Povo - https://gazetadopovo.com.br', 'Tribuna PR - https://tribunapr.com.br'],
  'PE': ['Jornal do Commercio - https://jc.ne10.uol.com.br', 'Diario de Pernambuco - https://diariodepernambuco.com.br'],
  'PI': ['Meio Norte - https://meionorte.com', 'Cidade Verde - https://cidadeverde.com'],
  'RJ': ['O Globo - https://oglobo.globo.com', 'Extra - https://extra.globo.com'],
  'RN': ['Tribuna do Norte - https://tribunadonorte.com.br', 'Novo Jornal - https://novojornal.jor.br'],
  'RS': ['Zero Hora - https://gauchazh.clicrbs.com.br', 'Correio do Povo - https://correiodopovo.com.br'],
  'RO': ['Rondônia Ao Vivo - https://rondoniaovivo.com', 'Diário da Amazônia - https://diariodaamazonia.com.br'],
  'RR': ['Folha de Boa Vista - https://folhabv.com.br', 'Roraima em Tempo - https://roraimaemtempo.com'],
  'SC': ['NSC Total - https://nsctotal.com.br', 'Diário Catarinense - https://diariocatarinense.com.br'],
  'SP': ['Folha de S.Paulo - https://folha.uol.com.br', 'Estadão - https://estadao.com.br'],
  'SE': ['Correio de Sergipe - https://correiodesergio.com.br', 'Infonet - https://infonet.com.br'],
  'TO': ['Jornal do Tocantins - https://jornaldotocantins.com.br', 'T1 Notícias - https://t1noticias.com.br']
}

const jornaisEUA: Record<string, string[]> = {
  'CA': ['Los Angeles Times - https://latimes.com', 'San Francisco Chronicle - https://sfchronicle.com'],
  'NY': ['New York Times - https://nytimes.com', 'New York Post - https://nypost.com'],
  'TX': ['Houston Chronicle - https://houstonchronicle.com', 'Dallas Morning News - https://dallasnews.com'],
  'FL': ['Miami Herald - https://miamiherald.com', 'Tampa Bay Times - https://tampabay.com'],
  'IL': ['Chicago Tribune - https://chicagotribune.com', 'Chicago Sun-Times - https://suntimes.com'],
  'PA': ['Philadelphia Inquirer - https://inquirer.com', 'Pittsburgh Post-Gazette - https://post-gazette.com'],
  'OH': ['Cleveland Plain Dealer - https://cleveland.com', 'Columbus Dispatch - https://dispatch.com'],
  'GA': ['Atlanta Journal-Constitution - https://ajc.com'],
  'NC': ['Charlotte Observer - https://charlotteobserver.com', 'News & Observer - https://newsobserver.com'],
  'MI': ['Detroit Free Press - https://freep.com', 'Detroit News - https://detroitnews.com'],
  'AZ': ['Arizona Republic - https://azcentral.com'],
  'WA': ['Seattle Times - https://seattletimes.com'],
  'MA': ['Boston Globe - https://bostonglobe.com'],
  'CO': ['Denver Post - https://denverpost.com'],
  'NV': ['Las Vegas Review-Journal - https://reviewjournal.com'],
  'OR': ['The Oregonian - https://oregonlive.com'],
  'NJ': ['NJ.com - https://nj.com'],
  'VA': ['Richmond Times-Dispatch - https://richmond.com'],
  'TN': ['The Tennessean - https://tennessean.com'],
  'MO': ['St. Louis Post-Dispatch - https://stltoday.com']
}

export default function PesquisaPage() {
  const router = useRouter()
  const [pesquisas, setPesquisas] = useState<Pesquisa[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'metodologia' | 'fontes' | 'registrar' | 'resultados'>('metodologia')
  const [expandedSection, setExpandedSection] = useState<string | null>('metodologia')
  const [paisSelecionado, setPaisSelecionado] = useState<'brasil' | 'eua'>('brasil')

  const [formData, setFormData] = useState<Pesquisa>({
    problema: '',
    categoria: '',
    pais: 'Brasil',
    estado: '',
    fonte: '',
    link: '',
    frequencia: 1,
    urgencia: 1,
    notas: ''
  })

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }
    fetchPesquisas()
  }, [router])

  const fetchPesquisas = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pesquisas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar pesquisas:', error)
    } else {
      setPesquisas(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('pesquisas')
      .insert([formData])

    if (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar pesquisa. Verifique se a tabela existe no Supabase.')
    } else {
      setFormData({
        problema: '',
        categoria: '',
        pais: 'Brasil',
        estado: '',
        fonte: '',
        link: '',
        frequencia: 1,
        urgencia: 1,
        notas: ''
      })
      fetchPesquisas()
      setActiveTab('resultados')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta pesquisa?')) return

    const { error } = await supabase
      .from('pesquisas')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao excluir:', error)
    } else {
      fetchPesquisas()
    }
  }

  const getRanking = (pais: string) => {
    const filtered = pesquisas.filter(p => p.pais === pais)
    const grouped: Record<string, { problema: string, categoria: string, count: number, totalScore: number }> = {}

    filtered.forEach(p => {
      const key = p.problema.toLowerCase()
      if (!grouped[key]) {
        grouped[key] = { problema: p.problema, categoria: p.categoria, count: 0, totalScore: 0 }
      }
      grouped[key].count++
      grouped[key].totalScore += (p.frequencia + p.urgencia)
    })

    return Object.values(grouped)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10)
  }

  const rankingBrasil = getRanking('Brasil')
  const rankingEUA = getRanking('EUA')

  return (
    <main className="min-h-screen">
      <div className="bg-pattern" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/membro')}
              className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
            </button>
            <div>
              <h1 className="font-display text-xl sm:text-2xl gold-text">Pesquisa de Mercado</h1>
              <p className="text-[var(--gray)] text-sm">Identificação de Dores e Oportunidades</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-[var(--gold)]" />
          </div>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'metodologia', label: 'Metodologia', icon: FileText },
            { id: 'fontes', label: 'Fontes', icon: Globe },
            { id: 'registrar', label: 'Registrar', icon: Plus },
            { id: 'resultados', label: 'Resultados', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--gold)] text-black font-semibold'
                  : 'glass hover:border-[var(--gold)]/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Metodologia Tab */}
        {activeTab === 'metodologia' && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h2 className="font-display text-xl">Objetivo da Pesquisa</h2>
              </div>
              <p className="text-[var(--gray)] mb-4">
                Identificar as <span className="text-[var(--gold)] font-semibold">10 maiores dores</span> da população no Brasil e nos EUA através de notícias locais, para descobrir oportunidades de software que resolvam problemas reais.
              </p>
              <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-4">
                <p className="text-sm">
                  <strong className="text-[var(--gold)]">Por que jornais locais?</strong> Eles reportam problemas reais que afetam a vida das pessoas diariamente - filas, burocracia, insegurança, saúde, etc. Esses são os problemas que geram demanda por soluções.
                </p>
              </div>
            </div>

            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <span className="font-display text-[var(--gold)]">1</span>
                </div>
                <h2 className="font-display text-xl">Passo 1: Coleta de Dados</h2>
              </div>
              <ul className="space-y-3 text-[var(--gray)]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Acesse os jornais de cada estado (veja aba "Fontes")</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Procure por notícias sobre <strong>reclamações, problemas, filas, demora, insatisfação</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Foque em problemas que se repetem em vários estados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Dedique pelo menos 30 minutos por estado</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <span className="font-display text-[var(--gold)]">2</span>
                </div>
                <h2 className="font-display text-xl">Passo 2: Registro</h2>
              </div>
              <ul className="space-y-3 text-[var(--gray)]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Para cada problema encontrado, vá na aba "Registrar"</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Descreva o problema de forma clara e objetiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Avalie a <strong>frequência</strong> (quantas vezes aparece) e <strong>urgência</strong> (quão crítico é)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Salve o link da notícia como referência</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <span className="font-display text-[var(--gold)]">3</span>
                </div>
                <h2 className="font-display text-xl">Passo 3: Análise</h2>
              </div>
              <ul className="space-y-3 text-[var(--gray)]">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Acompanhe o ranking na aba "Resultados"</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Identifique problemas que aparecem tanto no Brasil quanto nos EUA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Priorize dores com alta frequência + alta urgência</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <span>Valide se existe potencial de mercado para um software</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 sm:p-8 border-2 border-[var(--gold)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h2 className="font-display text-xl">Categorias de Problemas</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categorias.map(cat => (
                  <div key={cat} className="bg-white/5 px-3 py-2 rounded-lg text-sm text-center">
                    {cat}
                  </div>
                ))}
              </div>
              <p className="text-[var(--gray)] text-sm mt-4">
                Use essas categorias para classificar os problemas encontrados. Isso ajuda a identificar padrões.
              </p>
            </div>
          </div>
        )}

        {/* Fontes Tab */}
        {activeTab === 'fontes' && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setPaisSelecionado('brasil')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  paisSelecionado === 'brasil'
                    ? 'bg-[var(--gold)] text-black'
                    : 'glass hover:border-[var(--gold)]/50'
                }`}
              >
                🇧🇷 Brasil (27 UFs)
              </button>
              <button
                onClick={() => setPaisSelecionado('eua')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  paisSelecionado === 'eua'
                    ? 'bg-[var(--gold)] text-black'
                    : 'glass hover:border-[var(--gold)]/50'
                }`}
              >
                🇺🇸 EUA (50 States)
              </button>
            </div>

            {paisSelecionado === 'brasil' ? (
              <div className="space-y-3">
                {Object.entries(jornaisBrasil).map(([estado, jornais]) => (
                  <div key={estado} className="glass overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === estado ? null : estado)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="font-display text-lg">{estado}</span>
                      {expandedSection === estado ? (
                        <ChevronUp className="w-5 h-5 text-[var(--gold)]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--gray)]" />
                      )}
                    </button>
                    {expandedSection === estado && (
                      <div className="px-4 pb-4 space-y-2">
                        {jornais.map((jornal, idx) => {
                          const [nome, url] = jornal.split(' - ')
                          return (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              <span className="text-sm">{nome}</span>
                              <ExternalLink className="w-4 h-4 text-[var(--gold)]" />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="glass p-4 mb-4">
                  <p className="text-[var(--gray)] text-sm flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-[var(--gold)] shrink-0" />
                    <span>Listados os principais estados. Para outros estados, pesquise: "[State name] local news" no Google.</span>
                  </p>
                </div>
                {Object.entries(jornaisEUA).map(([estado, jornais]) => (
                  <div key={estado} className="glass overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === estado ? null : estado)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="font-display text-lg">{estado}</span>
                      {expandedSection === estado ? (
                        <ChevronUp className="w-5 h-5 text-[var(--gold)]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--gray)]" />
                      )}
                    </button>
                    {expandedSection === estado && (
                      <div className="px-4 pb-4 space-y-2">
                        {jornais.map((jornal, idx) => {
                          const [nome, url] = jornal.split(' - ')
                          return (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              <span className="text-sm">{nome}</span>
                              <ExternalLink className="w-4 h-4 text-[var(--gold)]" />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Registrar Tab */}
        {activeTab === 'registrar' && (
          <div className="animate-fadeInUp">
            <div className="glass p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-[var(--gold)] rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h2 className="font-display text-xl">Registrar Nova Dor</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="input-label">Descrição do Problema *</label>
                  <textarea
                    value={formData.problema}
                    onChange={(e) => setFormData({...formData, problema: e.target.value})}
                    placeholder="Ex: Demora excessiva para conseguir consultas no SUS"
                    className="input-field min-h-[100px] resize-y"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Categoria *</label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="input-field"
                      required
                    >
                      <option value="">Selecione</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">País *</label>
                    <select
                      value={formData.pais}
                      onChange={(e) => setFormData({...formData, pais: e.target.value, estado: ''})}
                      className="input-field"
                      required
                    >
                      <option value="Brasil">Brasil</option>
                      <option value="EUA">EUA</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Estado *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="input-field"
                      required
                    >
                      <option value="">Selecione</option>
                      {(formData.pais === 'Brasil' ? estadosBrasil : estadosEUA).map(est => (
                        <option key={est} value={est}>{est}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Fonte (Jornal)</label>
                    <input
                      type="text"
                      value={formData.fonte}
                      onChange={(e) => setFormData({...formData, fonte: e.target.value})}
                      placeholder="Ex: Folha de S.Paulo"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Link da Notícia</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://..."
                    className="input-field"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Frequência (1-5) *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setFormData({...formData, frequencia: n})}
                          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                            formData.frequencia === n
                              ? 'bg-[var(--gold)] text-black'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[var(--gray)] text-xs mt-1">1 = Raro, 5 = Muito frequente</p>
                  </div>
                  <div>
                    <label className="input-label">Urgência (1-5) *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setFormData({...formData, urgencia: n})}
                          className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                            formData.urgencia === n
                              ? 'bg-[var(--gold)] text-black'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[var(--gray)] text-xs mt-1">1 = Baixa, 5 = Crítica</p>
                  </div>
                </div>

                <div>
                  <label className="input-label">Notas Adicionais</label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    placeholder="Observações, ideias de solução, etc."
                    className="input-field min-h-[80px] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary w-full"
                >
                  {saving ? 'Salvando...' : 'Salvar Pesquisa'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Resultados Tab */}
        {activeTab === 'resultados' && (
          <div className="space-y-8 animate-fadeInUp">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass p-4 text-center">
                <div className="font-display text-2xl text-[var(--gold)]">{pesquisas.length}</div>
                <div className="text-[var(--gray)] text-xs">Total Registros</div>
              </div>
              <div className="glass p-4 text-center">
                <div className="font-display text-2xl text-[var(--gold)]">
                  {pesquisas.filter(p => p.pais === 'Brasil').length}
                </div>
                <div className="text-[var(--gray)] text-xs">Brasil</div>
              </div>
              <div className="glass p-4 text-center">
                <div className="font-display text-2xl text-[var(--gold)]">
                  {pesquisas.filter(p => p.pais === 'EUA').length}
                </div>
                <div className="text-[var(--gray)] text-xs">EUA</div>
              </div>
              <div className="glass p-4 text-center">
                <div className="font-display text-2xl text-[var(--gold)]">
                  {new Set(pesquisas.map(p => p.categoria)).size}
                </div>
                <div className="text-[var(--gray)] text-xs">Categorias</div>
              </div>
            </div>

            {/* Rankings */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Ranking Brasil */}
              <div className="glass p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇧🇷</span>
                  <h3 className="font-display text-xl">Top 10 Dores - Brasil</h3>
                </div>
                {rankingBrasil.length === 0 ? (
                  <p className="text-[var(--gray)] text-center py-8">
                    Nenhum registro ainda. Comece a pesquisar!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {rankingBrasil.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          idx < 3 ? 'bg-[var(--gold)] text-black' : 'bg-white/10'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{item.problema}</p>
                          <p className="text-xs text-[var(--gray)]">{item.categoria} • {item.count}x registrado</p>
                        </div>
                        <div className="text-[var(--gold)] font-semibold text-sm">
                          {item.totalScore}pts
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ranking EUA */}
              <div className="glass p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇺🇸</span>
                  <h3 className="font-display text-xl">Top 10 Dores - EUA</h3>
                </div>
                {rankingEUA.length === 0 ? (
                  <p className="text-[var(--gray)] text-center py-8">
                    Nenhum registro ainda. Comece a pesquisar!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {rankingEUA.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          idx < 3 ? 'bg-[var(--gold)] text-black' : 'bg-white/10'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{item.problema}</p>
                          <p className="text-xs text-[var(--gray)]">{item.categoria} • {item.count}x registrado</p>
                        </div>
                        <div className="text-[var(--gold)] font-semibold text-sm">
                          {item.totalScore}pts
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lista completa */}
            <div className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">Todos os Registros</h3>
                <span className="text-[var(--gray)] text-sm">{pesquisas.length} itens</span>
              </div>

              {loading ? (
                <p className="text-[var(--gray)] text-center py-8">Carregando...</p>
              ) : pesquisas.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-[var(--gray)] mx-auto mb-4" />
                  <p className="text-[var(--gray)]">Nenhuma pesquisa registrada ainda.</p>
                  <button
                    onClick={() => setActiveTab('registrar')}
                    className="mt-4 text-[var(--gold)] hover:underline"
                  >
                    Começar a registrar
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {pesquisas.map((p) => (
                    <div key={p.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1">{p.problema}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-[var(--gray)]">
                          <span className="bg-white/10 px-2 py-1 rounded">{p.pais}</span>
                          <span className="bg-white/10 px-2 py-1 rounded">{p.estado}</span>
                          <span className="bg-white/10 px-2 py-1 rounded">{p.categoria}</span>
                          <span className="bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-1 rounded">
                            F:{p.frequencia} U:{p.urgencia}
                          </span>
                        </div>
                        {p.fonte && (
                          <p className="text-xs text-[var(--gray)] mt-2">Fonte: {p.fonte}</p>
                        )}
                      </div>
                      <button
                        onClick={() => p.id && handleDelete(p.id)}
                        className="text-[var(--gray)] hover:text-red-400 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-10 mt-10 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Ferramenta de Pesquisa de Mercado
          </p>
        </footer>
      </div>
    </main>
  )
}
