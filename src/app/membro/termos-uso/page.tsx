'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Copy, Check, Building2 } from 'lucide-react'

interface DadosEmpresa {
  nomeEmpresa: string
  cnpj: string
  endereco: string
  email: string
  site: string
  tipoServico: 'saas' | 'marketplace' | 'ecommerce' | 'consultoria' | 'app'
  descricaoServico: string
  temAssinatura: boolean
  temConteudo: boolean
  temDadosSensiveis: boolean
  permiteReembolso: boolean
  diasReembolso: number
  foroJuridico: string
}

export default function TermosUsoPage() {
  const [copied, setCopied] = useState(false)

  const [dados, setDados] = useState<DadosEmpresa>({
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    email: '',
    site: '',
    tipoServico: 'saas',
    descricaoServico: '',
    temAssinatura: true,
    temConteudo: true,
    temDadosSensiveis: false,
    permiteReembolso: true,
    diasReembolso: 7,
    foroJuridico: ''
  })

  const tiposServico = [
    { value: 'saas', label: 'SaaS (Software como Servico)' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'consultoria', label: 'Consultoria/Servicos' },
    { value: 'app', label: 'Aplicativo Mobile' },
  ]

  const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  const gerarTermos = () => {
    const empresa = dados.nomeEmpresa || '[NOME DA EMPRESA]'
    const cnpj = dados.cnpj || '[CNPJ]'
    const endereco = dados.endereco || '[ENDERECO]'
    const email = dados.email || '[EMAIL]'
    const site = dados.site || '[SITE]'
    const foro = dados.foroJuridico || '[CIDADE/UF]'
    const servico = dados.descricaoServico || '[DESCRICAO DO SERVICO]'

    return `TERMOS DE USO

Ultima atualizacao: ${dataAtual}

═══════════════════════════════════════════════════════════════

1. ACEITACAO DOS TERMOS

Ao acessar e utilizar os servicos oferecidos por ${empresa}, inscrita no CNPJ sob o no ${cnpj}, com sede em ${endereco}, voce concorda integralmente com estes Termos de Uso.

Se voce nao concordar com qualquer disposicao destes termos, nao utilize nossos servicos.

═══════════════════════════════════════════════════════════════

2. DESCRICAO DOS SERVICOS

${empresa} oferece: ${servico}

${dados.tipoServico === 'saas' ? `2.1. Nosso servico e fornecido no modelo SaaS (Software as a Service), sendo disponibilizado via internet atraves do endereco ${site}.

2.2. O acesso ao servico requer conexao com a internet, sendo de responsabilidade do usuario garantir sua propria conectividade.

2.3. Nos reservamos o direito de modificar, suspender ou descontinuar qualquer aspecto do servico a qualquer momento, mediante aviso previo de 30 (trinta) dias.` : ''}

${dados.tipoServico === 'marketplace' ? `2.1. Nossa plataforma atua como intermediaria entre vendedores e compradores, nao sendo responsavel pela qualidade, seguranca ou legalidade dos itens anunciados.

2.2. Nao somos parte nas transacoes realizadas entre usuarios, atuando apenas como facilitadores.

2.3. Cada usuario e responsavel por suas proprias obrigacoes fiscais e tributarias.` : ''}

${dados.tipoServico === 'ecommerce' ? `2.1. Comercializamos produtos atraves de nossa loja virtual disponivel em ${site}.

2.2. As imagens dos produtos sao meramente ilustrativas, podendo haver pequenas variacoes.

2.3. Os precos e disponibilidade estao sujeitos a alteracoes sem aviso previo.` : ''}

${dados.tipoServico === 'consultoria' ? `2.1. Prestamos servicos de consultoria conforme escopo definido em proposta comercial especifica.

2.2. Os resultados dependem da colaboracao e fornecimento de informacoes pelo contratante.

2.3. Recomendacoes fornecidas sao baseadas nas informacoes disponibilizadas no momento da consultoria.` : ''}

${dados.tipoServico === 'app' ? `2.1. Nosso aplicativo esta disponivel para download nas principais lojas de aplicativos.

2.2. Algumas funcionalidades podem requerer acesso a recursos do dispositivo (camera, localizacao, etc).

2.3. Atualizacoes serao disponibilizadas periodicamente para melhorias e correcoes.` : ''}

═══════════════════════════════════════════════════════════════

3. CADASTRO E CONTA DO USUARIO

3.1. Para utilizar nossos servicos, voce devera criar uma conta fornecendo informacoes verdadeiras, completas e atualizadas.

3.2. Voce e responsavel por manter a confidencialidade de sua senha e por todas as atividades realizadas em sua conta.

3.3. Voce concorda em notificar imediatamente ${empresa} sobre qualquer uso nao autorizado de sua conta.

3.4. Nos reservamos o direito de suspender ou encerrar contas que violem estes termos ou que permanecam inativas por periodo superior a 12 (doze) meses.

═══════════════════════════════════════════════════════════════

4. OBRIGACOES DO USUARIO

4.1. O usuario se compromete a:

a) Utilizar o servico apenas para fins licitos e de acordo com estes Termos;
b) Nao compartilhar credenciais de acesso com terceiros;
c) Nao tentar acessar areas restritas do sistema;
d) Nao utilizar robos, scrapers ou outros meios automatizados sem autorizacao;
e) Nao transmitir virus, malware ou codigo malicioso;
f) Nao violar direitos de propriedade intelectual de terceiros;
g) Nao utilizar o servico para envio de spam ou comunicacoes nao solicitadas;
h) Manter seus dados cadastrais atualizados.

4.2. O descumprimento destas obrigacoes podera resultar em suspensao ou cancelamento da conta, sem direito a reembolso.

═══════════════════════════════════════════════════════════════

${dados.temAssinatura ? `5. PAGAMENTOS E ASSINATURAS

5.1. Os planos e precos estao disponiveis em nosso site e podem ser alterados mediante aviso previo de 30 (trinta) dias.

5.2. O pagamento e processado por meio de plataformas terceirizadas de pagamento, estando sujeito aos termos dessas plataformas.

5.3. A assinatura e renovada automaticamente ao final de cada periodo, salvo cancelamento previo pelo usuario.

5.4. O cancelamento pode ser realizado a qualquer momento atraves da area do cliente, sendo efetivo ao final do periodo ja pago.

5.5. Nao ha reembolso proporcional por cancelamento antes do fim do periodo contratado, exceto nos casos previstos em lei.

${dados.permiteReembolso ? `5.6. Oferecemos garantia de ${dados.diasReembolso} dias. Se voce nao estiver satisfeito, solicite o reembolso integral dentro deste prazo atraves do email ${email}.` : ''}

═══════════════════════════════════════════════════════════════

` : ''}

${dados.temConteudo ? `6. PROPRIEDADE INTELECTUAL

6.1. Todo o conteudo disponibilizado atraves de nossos servicos, incluindo mas nao limitado a textos, graficos, logotipos, icones, imagens, clips de audio, downloads digitais e compilacoes de dados, e propriedade de ${empresa} ou de seus fornecedores de conteudo.

6.2. A licenca concedida ao usuario e limitada, nao exclusiva, intransferivel e revogavel, apenas para uso pessoal e nao comercial.

6.3. E expressamente proibido:

a) Copiar, modificar ou distribuir nosso conteudo sem autorizacao;
b) Utilizar nosso conteudo para criar obras derivadas;
c) Remover avisos de direitos autorais ou marcas registradas;
d) Revender ou sublicenciar acesso ao conteudo;
e) Compartilhar credenciais para acesso de multiplos usuarios (salvo planos que permitam).

6.4. O conteudo gerado pelo usuario permanece de sua propriedade, porem voce concede a ${empresa} licenca para utiliza-lo na operacao e melhoria dos servicos.

═══════════════════════════════════════════════════════════════

` : ''}

7. LIMITACAO DE RESPONSABILIDADE

7.1. ${empresa} nao se responsabiliza por:

a) Danos indiretos, incidentais, especiais ou consequenciais;
b) Lucros cessantes ou perda de dados;
c) Interrupcoes no servico causadas por fatores externos;
d) Acoes de terceiros que violem nossos termos;
e) Decisoes tomadas com base em informacoes de nosso servico.

7.2. Nossa responsabilidade total, em qualquer circunstancia, esta limitada ao valor pago pelo usuario nos ultimos 12 (doze) meses.

7.3. O servico e fornecido "como esta" e "conforme disponibilidade", sem garantias de qualquer tipo, expressas ou implicitas.

═══════════════════════════════════════════════════════════════

8. PRIVACIDADE E DADOS

8.1. A coleta e tratamento de dados pessoais e regida por nossa Politica de Privacidade, disponivel em nosso site.

8.2. Ao utilizar nossos servicos, voce consente com a coleta e uso de dados conforme descrito na Politica de Privacidade.

${dados.temDadosSensiveis ? `8.3. Tratamos dados sensiveis com medidas adicionais de seguranca, em conformidade com a LGPD (Lei Geral de Protecao de Dados).

8.4. Voce pode solicitar a exclusao de seus dados a qualquer momento, ressalvadas as obrigacoes legais de retencao.` : ''}

═══════════════════════════════════════════════════════════════

9. MODIFICACOES DOS TERMOS

9.1. Estes Termos podem ser atualizados periodicamente. A versao mais recente estara sempre disponivel em nosso site.

9.2. Alteracoes significativas serao comunicadas por email ou atraves de aviso em nossa plataforma.

9.3. O uso continuado dos servicos apos alteracoes constitui aceitacao dos novos termos.

═══════════════════════════════════════════════════════════════

10. DISPOSICOES GERAIS

10.1. Estes Termos constituem o acordo integral entre voce e ${empresa} em relacao ao uso dos servicos.

10.2. A eventual invalidade de qualquer disposicao nao afetara a validade das demais.

10.3. A tolerancia quanto a qualquer descumprimento nao implicara em renuncia ou novacao.

10.4. Voce nao podera ceder ou transferir seus direitos sob estes Termos sem consentimento previo por escrito.

═══════════════════════════════════════════════════════════════

11. FORO E LEGISLACAO APLICAVEL

11.1. Estes Termos sao regidos pelas leis da Republica Federativa do Brasil.

11.2. Fica eleito o foro da comarca de ${foro} para dirimir quaisquer controversias decorrentes destes Termos, com renuncia a qualquer outro, por mais privilegiado que seja.

═══════════════════════════════════════════════════════════════

12. CONTATO

Para duvidas, sugestoes ou solicitacoes relacionadas a estes Termos, entre em contato:

${empresa}
E-mail: ${email}
Site: ${site}

═══════════════════════════════════════════════════════════════

Ao utilizar nossos servicos, voce declara ter lido, compreendido e concordado com estes Termos de Uso.

${empresa}
CNPJ: ${cnpj}
`
  }

  const copiarTermos = () => {
    navigator.clipboard.writeText(gerarTermos())
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
            <FileText className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            Gerador de <span className="gold-text">Termos de Uso</span>
          </h1>
          <p className="text-[var(--gray)]">Crie termos de uso profissionais para seu negocio</p>
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
              <label className="input-label">E-mail de Contato</label>
              <input
                type="email"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
                placeholder="contato@suaempresa.com"
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

        {/* Tipo de Servico */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Tipo de Servico</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="input-label">Modelo de Negocio</label>
              <select
                value={dados.tipoServico}
                onChange={(e) => setDados({ ...dados, tipoServico: e.target.value as DadosEmpresa['tipoServico'] })}
                className="input-field"
              >
                {tiposServico.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Foro Juridico</label>
              <input
                type="text"
                value={dados.foroJuridico}
                onChange={(e) => setDados({ ...dados, foroJuridico: e.target.value })}
                placeholder="Sao Paulo/SP"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="input-label">Descricao do Servico</label>
            <textarea
              value={dados.descricaoServico}
              onChange={(e) => setDados({ ...dados, descricaoServico: e.target.value })}
              placeholder="Descreva brevemente o que sua empresa oferece..."
              className="input-field min-h-[80px]"
            />
          </div>
        </div>

        {/* Opcoes */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Configuracoes dos Termos</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dados.temAssinatura}
                onChange={(e) => setDados({ ...dados, temAssinatura: e.target.checked })}
                className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
              />
              <span>Possui planos pagos / assinatura</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dados.temConteudo}
                onChange={(e) => setDados({ ...dados, temConteudo: e.target.checked })}
                className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
              />
              <span>Possui conteudo protegido por direitos autorais</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dados.temDadosSensiveis}
                onChange={(e) => setDados({ ...dados, temDadosSensiveis: e.target.checked })}
                className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
              />
              <span>Coleta dados sensiveis (saude, biometria, etc)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dados.permiteReembolso}
                onChange={(e) => setDados({ ...dados, permiteReembolso: e.target.checked })}
                className="w-5 h-5 rounded border-[var(--gold)] bg-transparent"
              />
              <span>Oferece garantia de reembolso</span>
            </label>

            {dados.permiteReembolso && (
              <div className="ml-8">
                <label className="input-label">Prazo de Garantia (dias)</label>
                <input
                  type="number"
                  value={dados.diasReembolso}
                  onChange={(e) => setDados({ ...dados, diasReembolso: Number(e.target.value) })}
                  className="input-field w-32"
                  min="1"
                  max="90"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="glass card mb-8">
          <h2 className="font-display text-lg mb-4">Preview dos Termos</h2>
          <div className="bg-black/30 rounded-xl p-6 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-[var(--gray)]">
              {gerarTermos()}
            </pre>
          </div>
        </div>

        {/* Botao Copiar */}
        <div className="flex justify-center mb-8">
          <button onClick={copiarTermos} className="btn-primary flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Termos de Uso'}
          </button>
        </div>

        {/* Aviso Legal */}
        <div className="glass p-6 border border-yellow-500/30 bg-yellow-500/5">
          <h3 className="font-display text-lg text-yellow-400 mb-3">Aviso Importante</h3>
          <p className="text-sm text-[var(--gray)]">
            Este gerador cria um modelo base de Termos de Uso. Recomendamos fortemente que voce consulte um advogado especializado para revisar e adaptar o documento as necessidades especificas do seu negocio e garantir conformidade com a legislacao vigente.
          </p>
        </div>
      </div>
    </main>
  )
}
