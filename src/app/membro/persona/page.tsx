'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Briefcase, Target, Heart, AlertTriangle, MessageSquare, Copy, Check, Sparkles, Download, Trash2 } from 'lucide-react'

interface Persona {
  id: string
  nome: string
  foto: string
  // Demográficos
  idade: string
  genero: string
  localizacao: string
  estadoCivil: string
  // Profissionais
  cargo: string
  empresa: string
  segmento: string
  tamanhoEmpresa: string
  rendaMensal: string
  // Psicográficos
  objetivos: string[]
  desafios: string[]
  medos: string[]
  motivacoes: string[]
  // Comportamento
  redesSociais: string[]
  fontesInformacao: string[]
  processoDecisao: string
  objecoes: string[]
  // Frase
  fraseTipica: string
  criadoEm: string
}

const avatares = [
  '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔧', '👩‍🔧', '👨‍🏫', '👩‍🏫', '🧑‍💼', '🧑‍💻'
]

export default function PersonaPage() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [personaAtual, setPersonaAtual] = useState<Partial<Persona>>({
    nome: '',
    foto: '👨‍💼',
    idade: '',
    genero: '',
    localizacao: '',
    estadoCivil: '',
    cargo: '',
    empresa: '',
    segmento: '',
    tamanhoEmpresa: '',
    rendaMensal: '',
    objetivos: ['', '', ''],
    desafios: ['', '', ''],
    medos: ['', '', ''],
    motivacoes: ['', '', ''],
    redesSociais: [],
    fontesInformacao: [],
    processoDecisao: '',
    objecoes: ['', '', ''],
    fraseTipica: '',
  })
  const [personaSelecionada, setPersonaSelecionada] = useState<Persona | null>(null)
  const [copiado, setCopiado] = useState(false)
  const [etapa, setEtapa] = useState(1)

  useEffect(() => {
    const saved = localStorage.getItem('mentoria-personas')
    if (saved) {
      setPersonas(JSON.parse(saved))
    }
  }, [])

  const salvarPersonas = (novas: Persona[]) => {
    setPersonas(novas)
    localStorage.setItem('mentoria-personas', JSON.stringify(novas))
  }

  const criarPersona = () => {
    if (!personaAtual.nome || !personaAtual.cargo) {
      alert('Preencha pelo menos Nome e Cargo')
      return
    }

    const nova: Persona = {
      id: Date.now().toString(),
      nome: personaAtual.nome!,
      foto: personaAtual.foto || '👨‍💼',
      idade: personaAtual.idade || '',
      genero: personaAtual.genero || '',
      localizacao: personaAtual.localizacao || '',
      estadoCivil: personaAtual.estadoCivil || '',
      cargo: personaAtual.cargo!,
      empresa: personaAtual.empresa || '',
      segmento: personaAtual.segmento || '',
      tamanhoEmpresa: personaAtual.tamanhoEmpresa || '',
      rendaMensal: personaAtual.rendaMensal || '',
      objetivos: personaAtual.objetivos?.filter(o => o) || [],
      desafios: personaAtual.desafios?.filter(d => d) || [],
      medos: personaAtual.medos?.filter(m => m) || [],
      motivacoes: personaAtual.motivacoes?.filter(m => m) || [],
      redesSociais: personaAtual.redesSociais || [],
      fontesInformacao: personaAtual.fontesInformacao || [],
      processoDecisao: personaAtual.processoDecisao || '',
      objecoes: personaAtual.objecoes?.filter(o => o) || [],
      fraseTipica: personaAtual.fraseTipica || '',
      criadoEm: new Date().toISOString(),
    }

    salvarPersonas([nova, ...personas])
    setPersonaSelecionada(nova)
    resetForm()
  }

  const resetForm = () => {
    setPersonaAtual({
      nome: '',
      foto: '👨‍💼',
      idade: '',
      genero: '',
      localizacao: '',
      estadoCivil: '',
      cargo: '',
      empresa: '',
      segmento: '',
      tamanhoEmpresa: '',
      rendaMensal: '',
      objetivos: ['', '', ''],
      desafios: ['', '', ''],
      medos: ['', '', ''],
      motivacoes: ['', '', ''],
      redesSociais: [],
      fontesInformacao: [],
      processoDecisao: '',
      objecoes: ['', '', ''],
      fraseTipica: '',
    })
    setEtapa(1)
  }

  const removerPersona = (id: string) => {
    if (!confirm('Remover esta persona?')) return
    salvarPersonas(personas.filter(p => p.id !== id))
    if (personaSelecionada?.id === id) {
      setPersonaSelecionada(null)
    }
  }

  const copiarPersona = (persona: Persona) => {
    const texto = `
PERSONA: ${persona.nome}
${persona.foto}

📋 DADOS DEMOGRÁFICOS
• Idade: ${persona.idade || 'Não definido'}
• Gênero: ${persona.genero || 'Não definido'}
• Localização: ${persona.localizacao || 'Não definido'}
• Estado Civil: ${persona.estadoCivil || 'Não definido'}

💼 DADOS PROFISSIONAIS
• Cargo: ${persona.cargo}
• Empresa: ${persona.empresa || 'Não definido'}
• Segmento: ${persona.segmento || 'Não definido'}
• Tamanho: ${persona.tamanhoEmpresa || 'Não definido'}
• Renda: ${persona.rendaMensal || 'Não definido'}

🎯 OBJETIVOS
${persona.objetivos.map(o => `• ${o}`).join('\n') || '• Não definido'}

😫 DESAFIOS/DORES
${persona.desafios.map(d => `• ${d}`).join('\n') || '• Não definido'}

😰 MEDOS
${persona.medos.map(m => `• ${m}`).join('\n') || '• Não definido'}

💪 MOTIVAÇÕES
${persona.motivacoes.map(m => `• ${m}`).join('\n') || '• Não definido'}

🚫 OBJEÇÕES COMUNS
${persona.objecoes.map(o => `• ${o}`).join('\n') || '• Não definido'}

💬 FRASE TÍPICA
"${persona.fraseTipica || 'Não definido'}"
    `.trim()

    navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const updateArray = (field: 'objetivos' | 'desafios' | 'medos' | 'motivacoes' | 'objecoes', index: number, value: string) => {
    const atual = [...(personaAtual[field] || ['', '', ''])]
    atual[index] = value
    setPersonaAtual({ ...personaAtual, [field]: atual })
  }

  const toggleArrayItem = (field: 'redesSociais' | 'fontesInformacao', item: string) => {
    const atual = personaAtual[field] || []
    if (atual.includes(item)) {
      setPersonaAtual({ ...personaAtual, [field]: atual.filter(i => i !== item) })
    } else {
      setPersonaAtual({ ...personaAtual, [field]: [...atual, item] })
    }
  }

  const redesOptions = ['LinkedIn', 'Instagram', 'Facebook', 'Twitter/X', 'YouTube', 'TikTok', 'WhatsApp', 'Telegram']
  const fontesOptions = ['Google', 'LinkedIn', 'Podcasts', 'Newsletters', 'Eventos', 'Indicações', 'Blogs', 'YouTube']

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
            <h1 className="text-3xl font-bold">Gerador de Persona</h1>
            <p className="text-white/60">Crie o avatar do seu cliente ideal</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              {/* Etapas */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4].map((e) => (
                  <button
                    key={e}
                    onClick={() => setEtapa(e)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      etapa === e
                        ? 'bg-[var(--gold)] text-black'
                        : etapa > e
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {e === 1 && 'Básico'}
                    {e === 2 && 'Profissional'}
                    {e === 3 && 'Psicográfico'}
                    {e === 4 && 'Comportamento'}
                  </button>
                ))}
              </div>

              {/* Etapa 1: Dados Básicos */}
              {etapa === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-[var(--gold)]" />
                    Dados Básicos
                  </h3>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Avatar</label>
                    <div className="flex gap-2 flex-wrap">
                      {avatares.map((av) => (
                        <button
                          key={av}
                          onClick={() => setPersonaAtual({ ...personaAtual, foto: av })}
                          className={`text-3xl p-2 rounded-lg transition-all ${
                            personaAtual.foto === av
                              ? 'bg-[var(--gold)]/20 ring-2 ring-[var(--gold)]'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Nome da Persona *</label>
                      <input
                        type="text"
                        value={personaAtual.nome}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, nome: e.target.value })}
                        placeholder="Ex: Carlos Empreendedor"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Idade</label>
                      <input
                        type="text"
                        value={personaAtual.idade}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, idade: e.target.value })}
                        placeholder="Ex: 35-45 anos"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Gênero</label>
                      <select
                        value={personaAtual.genero}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, genero: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      >
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Ambos">Ambos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Estado Civil</label>
                      <select
                        value={personaAtual.estadoCivil}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, estadoCivil: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      >
                        <option value="">Selecione</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Indiferente">Indiferente</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-1">Localização</label>
                    <input
                      type="text"
                      value={personaAtual.localizacao}
                      onChange={(e) => setPersonaAtual({ ...personaAtual, localizacao: e.target.value })}
                      placeholder="Ex: Capitais do Sudeste, Brasil inteiro"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => setEtapa(2)}
                    className="w-full py-3 bg-[var(--gold)] text-black rounded-lg font-medium mt-4"
                  >
                    Próximo: Dados Profissionais →
                  </button>
                </div>
              )}

              {/* Etapa 2: Dados Profissionais */}
              {etapa === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[var(--gold)]" />
                    Dados Profissionais
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Cargo *</label>
                      <input
                        type="text"
                        value={personaAtual.cargo}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, cargo: e.target.value })}
                        placeholder="Ex: CEO, Diretor Comercial"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Tipo de Empresa</label>
                      <input
                        type="text"
                        value={personaAtual.empresa}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, empresa: e.target.value })}
                        placeholder="Ex: Startup, PME, Indústria"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Segmento</label>
                      <input
                        type="text"
                        value={personaAtual.segmento}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, segmento: e.target.value })}
                        placeholder="Ex: Tecnologia, Varejo, Serviços"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1">Tamanho da Empresa</label>
                      <select
                        value={personaAtual.tamanhoEmpresa}
                        onChange={(e) => setPersonaAtual({ ...personaAtual, tamanhoEmpresa: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                      >
                        <option value="">Selecione</option>
                        <option value="1-10 funcionários">1-10 funcionários</option>
                        <option value="11-50 funcionários">11-50 funcionários</option>
                        <option value="51-200 funcionários">51-200 funcionários</option>
                        <option value="201-500 funcionários">201-500 funcionários</option>
                        <option value="500+ funcionários">500+ funcionários</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-1">Renda/Faturamento</label>
                    <input
                      type="text"
                      value={personaAtual.rendaMensal}
                      onChange={(e) => setPersonaAtual({ ...personaAtual, rendaMensal: e.target.value })}
                      placeholder="Ex: R$ 15-30k/mês, Faturamento R$ 1-5M/ano"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEtapa(1)}
                      className="flex-1 py-3 bg-white/10 rounded-lg font-medium"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={() => setEtapa(3)}
                      className="flex-1 py-3 bg-[var(--gold)] text-black rounded-lg font-medium"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>
              )}

              {/* Etapa 3: Psicográfico */}
              {etapa === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[var(--gold)]" />
                    Perfil Psicográfico
                  </h3>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">🎯 Objetivos (o que quer alcançar)</label>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        value={personaAtual.objetivos?.[i] || ''}
                        onChange={(e) => updateArray('objetivos', i, e.target.value)}
                        placeholder={`Objetivo ${i + 1}`}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none mb-2"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">😫 Desafios/Dores (o que incomoda)</label>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        value={personaAtual.desafios?.[i] || ''}
                        onChange={(e) => updateArray('desafios', i, e.target.value)}
                        placeholder={`Desafio ${i + 1}`}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none mb-2"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">😰 Medos (o que evita)</label>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        value={personaAtual.medos?.[i] || ''}
                        onChange={(e) => updateArray('medos', i, e.target.value)}
                        placeholder={`Medo ${i + 1}`}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none mb-2"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">💪 Motivações (o que impulsiona)</label>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        value={personaAtual.motivacoes?.[i] || ''}
                        onChange={(e) => updateArray('motivacoes', i, e.target.value)}
                        placeholder={`Motivação ${i + 1}`}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none mb-2"
                      />
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEtapa(2)}
                      className="flex-1 py-3 bg-white/10 rounded-lg font-medium"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={() => setEtapa(4)}
                      className="flex-1 py-3 bg-[var(--gold)] text-black rounded-lg font-medium"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>
              )}

              {/* Etapa 4: Comportamento */}
              {etapa === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--gold)]" />
                    Comportamento de Compra
                  </h3>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Redes Sociais que usa</label>
                    <div className="flex flex-wrap gap-2">
                      {redesOptions.map((rede) => (
                        <button
                          key={rede}
                          onClick={() => toggleArrayItem('redesSociais', rede)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            personaAtual.redesSociais?.includes(rede)
                              ? 'bg-[var(--gold)] text-black'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {rede}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Fontes de Informação</label>
                    <div className="flex flex-wrap gap-2">
                      {fontesOptions.map((fonte) => (
                        <button
                          key={fonte}
                          onClick={() => toggleArrayItem('fontesInformacao', fonte)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            personaAtual.fontesInformacao?.includes(fonte)
                              ? 'bg-[var(--gold)] text-black'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {fonte}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">🚫 Objeções Comuns</label>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        value={personaAtual.objecoes?.[i] || ''}
                        onChange={(e) => updateArray('objecoes', i, e.target.value)}
                        placeholder={`Ex: "Está caro", "Não tenho tempo"`}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none mb-2"
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-1">💬 Frase Típica</label>
                    <input
                      type="text"
                      value={personaAtual.fraseTipica}
                      onChange={(e) => setPersonaAtual({ ...personaAtual, fraseTipica: e.target.value })}
                      placeholder='Ex: "Preciso de resultados rápidos"'
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEtapa(3)}
                      className="flex-1 py-3 bg-white/10 rounded-lg font-medium"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={criarPersona}
                      className="flex-1 py-3 bg-[var(--gold)] text-black rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Criar Persona
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Personas Salvas */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Personas Salvas ({personas.length})</h2>

              {personas.length === 0 ? (
                <div className="text-center py-8 text-white/50">
                  <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma persona criada</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {personas.map((p) => (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        personaSelecionada?.id === p.id
                          ? 'bg-[var(--gold)]/20 border border-[var(--gold)]'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      onClick={() => setPersonaSelecionada(p)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{p.foto}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{p.nome}</p>
                          <p className="text-sm text-white/60 truncate">{p.cargo}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removerPersona(p.id)
                          }}
                          className="p-1.5 rounded bg-red-500/20 text-red-400 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Preview da Persona Selecionada */}
              {personaSelecionada && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Preview</h3>
                    <button
                      onClick={() => copiarPersona(personaSelecionada)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--gold)] text-black rounded-lg text-sm"
                    >
                      {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiado ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="text-center mb-4">
                      <span className="text-5xl">{personaSelecionada.foto}</span>
                      <p className="font-semibold mt-2">{personaSelecionada.nome}</p>
                      <p className="text-white/60">{personaSelecionada.cargo}</p>
                    </div>

                    {personaSelecionada.desafios.length > 0 && (
                      <div>
                        <p className="text-white/60 text-xs mb-1">Dores:</p>
                        <ul className="space-y-1">
                          {personaSelecionada.desafios.slice(0, 2).map((d, i) => (
                            <li key={i} className="text-white/80">• {d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {personaSelecionada.objetivos.length > 0 && (
                      <div>
                        <p className="text-white/60 text-xs mb-1">Objetivos:</p>
                        <ul className="space-y-1">
                          {personaSelecionada.objetivos.slice(0, 2).map((o, i) => (
                            <li key={i} className="text-white/80">• {o}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {personaSelecionada.fraseTipica && (
                      <div className="p-3 bg-white/5 rounded-lg italic text-white/70">
                        "{personaSelecionada.fraseTipica}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
