'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Copy, Check, Building2, Database, Cookie } from 'lucide-react'

interface DadosPrivacidade {
  nomeEmpresa: string
  cnpj: string
  endereco: string
  emailDpo: string
  site: string
  coletaNome: boolean
  coletaEmail: boolean
  coletaTelefone: boolean
  coletaCpf: boolean
  coletaEndereco: boolean
  coletaLocalizacao: boolean
  coletaIp: boolean
  coletaNavegacao: boolean
  coletaPagamento: boolean
  coletaDadosSensiveis: boolean
  quaisDadosSensiveis: string
  usaCookies: boolean
  usaAnalytics: boolean
  usaPixel: boolean
  compartilhaParceiros: boolean
  compartilhaProcessadores: string
  tempoRetencao: string
  transfereInternacional: boolean
}

export default function PoliticaPrivacidadePage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState<DadosPrivacidade>({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    emailDpo: '',
    site: '',
    coletaNome: true,
    coletaEmail: true,
    coletaTelefone: true,
    coletaCpf: false,
    coletaEndereco: false,
    coletaLocalizacao: false,
    coletaIp: true,
    coletaNavegacao: true,
    coletaPagamento: false,
    coletaDadosSensiveis: false,
    quaisDadosSensiveis: '',
    usaCookies: true,
    usaAnalytics: true,
    usaPixel: false,
    compartilhaParceiros: false,
    compartilhaProcessadores: 'processadores de pagamento, servicos de email marketing',
    tempoRetencao: '5 anos apos o termino da relacao contratual',
    transfereInternacional: false
  })

  const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  const getDadosColetados = () => {
    const lista = []
    if (dados.coletaNome) lista.push('Nome completo')
    if (dados.coletaEmail) lista.push('Endereco de e-mail')
    if (dados.coletaTelefone) lista.push('Numero de telefone/WhatsApp')
    if (dados.coletaCpf) lista.push('CPF')
    if (dados.coletaEndereco) lista.push('Endereco residencial ou comercial')
    if (dados.coletaLocalizacao) lista.push('Dados de geolocalizacao')
    if (dados.coletaIp) lista.push('Endereco IP')
    if (dados.coletaNavegacao) lista.push('Dados de navegacao e comportamento no site')
    if (dados.coletaPagamento) lista.push('Informacoes de pagamento (processadas por terceiros)')
    return lista
  }

  const gerarPolitica = () => {
    const empresa = dados.nomeEmpresa || '[NOME DA EMPRESA]'
    const cnpj = dados.cnpj || '[CNPJ]'
    const endereco = dados.endereco || '[ENDERECO]'
    const emailDpo = dados.emailDpo || '[EMAIL DO DPO]'
    const site = dados.site || '[SITE]'
    const dadosColetados = getDadosColetados()

    return `POLITICA DE PRIVACIDADE

Ultima atualizacao: ${dataAtual}

═══════════════════════════════════════════════════════════════

1. INTRODUCAO

${empresa}, inscrita no CNPJ sob o no ${cnpj}, com sede em ${endereco}, leva a sua privacidade a serio e esta comprometida em proteger seus dados pessoais.

Esta Politica de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informacoes quando voce utiliza nossos servicos em ${site}.

Esta politica esta em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei no 13.709/2018) e outras legislacoes aplicaveis.

═══════════════════════════════════════════════════════════════

2. DADOS QUE COLETAMOS

2.1. Dados fornecidos diretamente por voce:

${dadosColetados.map(d => `• ${d}`).join('\n')}

${dados.coletaDadosSensiveis ? `2.2. Dados sensiveis:

Com seu consentimento explicito, podemos coletar:
• ${dados.quaisDadosSensiveis || '[Especificar dados sensiveis]'}

Estes dados sao tratados com medidas adicionais de seguranca e apenas para as finalidades especificas informadas no momento da coleta.` : ''}

2.${dados.coletaDadosSensiveis ? '3' : '2'}. Dados coletados automaticamente:

${dados.coletaIp ? '• Endereco IP e informacoes do dispositivo\n' : ''}${dados.coletaNavegacao ? '• Paginas visitadas, tempo de permanencia e interacoes\n' : ''}${dados.usaCookies ? '• Dados de cookies e tecnologias similares\n' : ''}${dados.coletaLocalizacao ? '• Localizacao geografica aproximada\n' : ''}
═══════════════════════════════════════════════════════════════

3. COMO UTILIZAMOS SEUS DADOS

Utilizamos seus dados pessoais para as seguintes finalidades:

a) Fornecer e melhorar nossos servicos;
b) Processar transacoes e enviar comunicacoes relacionadas;
c) Enviar comunicacoes de marketing (mediante seu consentimento);
d) Personalizar sua experiencia em nossa plataforma;
e) Cumprir obrigacoes legais e regulatorias;
f) Prevenir fraudes e garantir a seguranca;
g) Realizar analises estatisticas e de desempenho;
h) Responder a solicitacoes e fornecer suporte.

═══════════════════════════════════════════════════════════════

4. BASE LEGAL PARA TRATAMENTO

O tratamento de seus dados pessoais e realizado com base nas seguintes hipoteses legais previstas na LGPD:

• Consentimento do titular (Art. 7o, I);
• Execucao de contrato (Art. 7o, V);
• Cumprimento de obrigacao legal (Art. 7o, II);
• Exercicio regular de direitos (Art. 7o, VI);
• Legitimo interesse do controlador (Art. 7o, IX);
• Protecao do credito (Art. 7o, X).

═══════════════════════════════════════════════════════════════

${dados.usaCookies ? `5. COOKIES E TECNOLOGIAS DE RASTREAMENTO

5.1. Utilizamos cookies e tecnologias similares para:

• Manter voce conectado a sua conta;
• Lembrar suas preferencias;
• Entender como voce utiliza nossos servicos;
• Personalizar conteudo e anuncios;
• Medir a eficacia de campanhas de marketing.

5.2. Tipos de cookies que utilizamos:

• Cookies essenciais: necessarios para o funcionamento do site;
• Cookies de desempenho: coletam informacoes sobre uso do site;
• Cookies de funcionalidade: lembram suas escolhas e preferencias;
${dados.usaAnalytics ? '• Cookies de analytics: Google Analytics e ferramentas similares;\n' : ''}${dados.usaPixel ? '• Cookies de marketing: Facebook Pixel e outras plataformas de anuncios;\n' : ''}
5.3. Voce pode gerenciar suas preferencias de cookies atraves das configuracoes do seu navegador. Note que desabilitar alguns cookies pode afetar a funcionalidade do site.

═══════════════════════════════════════════════════════════════

` : ''}

6. COMPARTILHAMENTO DE DADOS

6.1. Podemos compartilhar seus dados com:

• Prestadores de servicos: ${dados.compartilhaProcessadores || '[Especificar processadores]'};
• Autoridades governamentais: quando exigido por lei ou ordem judicial;
${dados.compartilhaParceiros ? '• Parceiros comerciais: para oferecer produtos e servicos complementares (mediante seu consentimento);\n' : ''}
6.2. Nao vendemos seus dados pessoais a terceiros.

6.3. Todos os terceiros com quem compartilhamos dados estao obrigados contratualmente a proteger suas informacoes.

${dados.transfereInternacional ? `6.4. Transferencia Internacional:

Alguns de nossos prestadores de servicos podem estar localizados fora do Brasil. Nesses casos, garantimos que a transferencia seja realizada em conformidade com a LGPD, mediante:

• Clausulas contratuais padrao aprovadas pela ANPD;
• Certificacao de que o pais de destino oferece nivel adequado de protecao;
• Outras garantias previstas em lei.` : ''}

═══════════════════════════════════════════════════════════════

7. SEGURANCA DOS DADOS

7.1. Implementamos medidas tecnicas e organizacionais apropriadas para proteger seus dados, incluindo:

• Criptografia de dados em transito e em repouso;
• Controle de acesso baseado em funcao;
• Monitoramento continuo de seguranca;
• Treinamento de colaboradores sobre protecao de dados;
• Backups regulares e plano de recuperacao de desastres;
• Firewalls e sistemas de deteccao de intrusao.

7.2. Apesar de nossos esforcos, nenhum sistema e 100% seguro. Em caso de incidente de seguranca que possa causar risco ou dano relevante, notificaremos voce e a Autoridade Nacional de Protecao de Dados (ANPD) conforme exigido por lei.

═══════════════════════════════════════════════════════════════

8. RETENCAO DE DADOS

8.1. Mantemos seus dados pessoais pelo tempo necessario para cumprir as finalidades para as quais foram coletados, incluindo obrigacoes legais, contabeis ou de relatorio.

8.2. Prazo geral de retencao: ${dados.tempoRetencao}

8.3. Apos o termino do periodo de retencao, seus dados serao eliminados ou anonimizados de forma segura.

═══════════════════════════════════════════════════════════════

9. SEUS DIREITOS (LGPD)

A LGPD garante a voce os seguintes direitos:

a) Confirmacao da existencia de tratamento;
b) Acesso aos dados;
c) Correcao de dados incompletos, inexatos ou desatualizados;
d) Anonimizacao, bloqueio ou eliminacao de dados desnecessarios;
e) Portabilidade dos dados a outro fornecedor;
f) Eliminacao dos dados tratados com consentimento;
g) Informacao sobre compartilhamento de dados;
h) Informacao sobre a possibilidade de nao fornecer consentimento;
i) Revogacao do consentimento;
j) Oposicao ao tratamento em determinadas situacoes.

Para exercer qualquer desses direitos, entre em contato conosco atraves do e-mail: ${emailDpo}

Responderemos sua solicitacao em ate 15 (quinze) dias uteis.

═══════════════════════════════════════════════════════════════

10. DADOS DE MENORES

Nossos servicos nao sao direcionados a menores de 18 anos. Nao coletamos intencionalmente dados de criancas ou adolescentes. Se tomarmos conhecimento de que coletamos dados de um menor sem o consentimento dos pais ou responsaveis, tomaremos medidas para eliminar essas informacoes.

═══════════════════════════════════════════════════════════════

11. ALTERACOES NESTA POLITICA

Esta Politica de Privacidade pode ser atualizada periodicamente. Quaisquer alteracoes serao publicadas nesta pagina com a data de atualizacao revisada.

Recomendamos que voce revise esta politica regularmente. Alteracoes significativas serao comunicadas por e-mail ou aviso em nossa plataforma.

═══════════════════════════════════════════════════════════════

12. ENCARREGADO DE DADOS (DPO)

Em conformidade com a LGPD, designamos um Encarregado de Protecao de Dados (DPO) que pode ser contatado para questoes relacionadas ao tratamento de seus dados pessoais:

E-mail: ${emailDpo}

═══════════════════════════════════════════════════════════════

13. CONTATO E RECLAMACOES

Para duvidas sobre esta politica ou sobre o tratamento de seus dados:

${empresa}
E-mail: ${emailDpo}
Site: ${site}

Voce tambem tem o direito de apresentar reclamacao a Autoridade Nacional de Protecao de Dados (ANPD):
Site: https://www.gov.br/anpd

═══════════════════════════════════════════════════════════════

Ao utilizar nossos servicos, voce declara ter lido e compreendido esta Politica de Privacidade.

${empresa}
CNPJ: ${cnpj}
`
  }

  const copiarPolitica = () => {
    navigator.clipboard.writeText(gerarPolitica())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <Shield className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            <span className="gold-text">Politica</span> de Privacidade
          </h1>
          <p className="text-[var(--gray)]">Gere uma politica de privacidade conforme a LGPD</p>
        </div>

        {/* Dados da Empresa */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--gold)]" />
            Dados da Empresa
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Nome da Empresa</label>
              <input
                type="text"
                value={dados.nomeEmpresa}
                onChange={(e) => setDados({ ...dados, nomeEmpresa: e.target.value })}
                placeholder="SuaStartup Ltda"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">CNPJ</label>
              <input
                type="text"
                value={dados.cnpj}
                onChange={(e) => setDados({ ...dados, cnpj: e.target.value })}
                placeholder="00.000.000/0001-00"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">E-mail do DPO/Encarregado</label>
              <input
                type="email"
                value={dados.emailDpo}
                onChange={(e) => setDados({ ...dados, emailDpo: e.target.value })}
                placeholder="privacidade@suaempresa.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Site</label>
              <input
                type="text"
                value={dados.site}
                onChange={(e) => setDados({ ...dados, site: e.target.value })}
                placeholder="https://suaempresa.com"
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Endereco Completo</label>
              <input
                type="text"
                value={dados.endereco}
                onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
                placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF - CEP 00000-000"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Dados Coletados */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-[var(--gold)]" />
            Dados que Voce Coleta
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              { key: 'coletaNome', label: 'Nome completo' },
              { key: 'coletaEmail', label: 'E-mail' },
              { key: 'coletaTelefone', label: 'Telefone/WhatsApp' },
              { key: 'coletaCpf', label: 'CPF' },
              { key: 'coletaEndereco', label: 'Endereco' },
              { key: 'coletaLocalizacao', label: 'Localizacao (GPS)' },
              { key: 'coletaIp', label: 'Endereco IP' },
              { key: 'coletaNavegacao', label: 'Dados de navegacao' },
              { key: 'coletaPagamento', label: 'Dados de pagamento' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dados[item.key as keyof DadosPrivacidade] as boolean}
                  onChange={(e) => setDados({ ...dados, [item.key]: e.target.checked })}
                  className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={dados.coletaDadosSensiveis}
                onChange={(e) => setDados({ ...dados, coletaDadosSensiveis: e.target.checked })}
                className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
              />
              <span className="text-sm text-yellow-400">Coleta dados sensiveis (saude, biometria, religiao, etc)</span>
            </label>

            {dados.coletaDadosSensiveis && (
              <input
                type="text"
                value={dados.quaisDadosSensiveis}
                onChange={(e) => setDados({ ...dados, quaisDadosSensiveis: e.target.value })}
                placeholder="Especifique quais dados sensiveis..."
                className="input-field text-sm"
              />
            )}
          </div>
        </div>

        {/* Cookies e Tracking */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-[var(--gold)]" />
            Cookies e Rastreamento
          </h2>

          <div className="space-y-3 mb-4">
            {[
              { key: 'usaCookies', label: 'Utiliza cookies' },
              { key: 'usaAnalytics', label: 'Google Analytics ou similar' },
              { key: 'usaPixel', label: 'Facebook Pixel / Google Ads' },
              { key: 'compartilhaParceiros', label: 'Compartilha dados com parceiros comerciais' },
              { key: 'transfereInternacional', label: 'Transfere dados para outros paises' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dados[item.key as keyof DadosPrivacidade] as boolean}
                  onChange={(e) => setDados({ ...dados, [item.key]: e.target.checked })}
                  className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Processadores de Dados (terceiros)</label>
              <input
                type="text"
                value={dados.compartilhaProcessadores}
                onChange={(e) => setDados({ ...dados, compartilhaProcessadores: e.target.value })}
                placeholder="Ex: Stripe, Mailchimp, AWS..."
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="input-label">Tempo de Retencao dos Dados</label>
              <input
                type="text"
                value={dados.tempoRetencao}
                onChange={(e) => setDados({ ...dados, tempoRetencao: e.target.value })}
                placeholder="Ex: 5 anos apos termino da relacao"
                className="input-field text-sm"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview da Politica</h2>
          <div className="bg-black/30 rounded-xl p-6 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarPolitica()}
            </pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarPolitica} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Politica de Privacidade'}
          </button>
        </div>

        {/* Aviso Legal */}
        <div className="glass p-6 border border-yellow-500/30 bg-yellow-500/5">
          <h3 className="font-display text-lg text-yellow-400 mb-3">Aviso Importante</h3>
          <p className="text-sm text-[var(--gray)]">
            Este gerador cria um modelo base de Politica de Privacidade conforme a LGPD. Recomendamos fortemente a revisao por um advogado especializado em protecao de dados para garantir conformidade total com a legislacao e adequacao as especificidades do seu negocio.
          </p>
        </div>
      </div>
    </main>
  )
}
