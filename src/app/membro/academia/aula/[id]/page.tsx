'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Target
} from 'lucide-react'

// Conteúdo das aulas
const conteudoAulas: Record<string, {
  titulo: string
  modulo: string
  conteudo: React.ReactNode
}> = {
  'mod1-1': {
    titulo: 'O que é o Império Sistemas',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Visão Geral</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O <strong className="text-white">Império Sistemas</strong> é uma plataforma completa de gestão comercial desenvolvida especialmente para pequenos e médios comerciantes brasileiros. É como ter um <strong className="text-white">assistente super inteligente</strong> que ajuda o dono de uma loja ou empresa a controlar TUDO do seu negócio!
          </p>
          <p className="text-[var(--gray)] leading-relaxed">
            Diferente de sistemas complicados feitos para grandes empresas, o Império foi criado pensando no <strong className="text-white">comerciante do dia a dia</strong>: aquele que trabalha no balcão, atende cliente, repõe estoque e ainda cuida do financeiro. Tudo em uma interface <strong className="text-white">simples e intuitiva</strong>.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 O que o sistema resolve:</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">📦</span>
              <div>
                <strong className="text-white">Controle de Estoque Inteligente</strong>
                <p className="text-sm mt-1">Saber exatamente quantos produtos tem na loja, receber alertas quando está acabando, nunca mais perder venda por falta de mercadoria.</p>
              </div>
            </li>
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">💰</span>
              <div>
                <strong className="text-white">Financeiro Descomplicado</strong>
                <p className="text-sm mt-1">Controlar todo dinheiro que entra e sai, saber quanto tem a receber, quanto tem a pagar, e o mais importante: quanto está LUCRANDO de verdade.</p>
              </div>
            </li>
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">👥</span>
              <div>
                <strong className="text-white">Gestão de Clientes</strong>
                <p className="text-sm mt-1">Lembrar de todos os clientes, o que compraram, quanto devem, quando fazem aniversário. Criar relacionamento que gera vendas!</p>
              </div>
            </li>
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">🧾</span>
              <div>
                <strong className="text-white">Emissão Fiscal Automática</strong>
                <p className="text-sm mt-1">Emitir NFC-e e NF-e com poucos cliques. Integração direta com a SEFAZ. Ficar em dia com o fisco sem dor de cabeça.</p>
              </div>
            </li>
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">📊</span>
              <div>
                <strong className="text-white">Relatórios que Fazem Sentido</strong>
                <p className="text-sm mt-1">Ver gráficos bonitos e números claros que mostram se o negócio vai bem. Tomar decisões baseadas em dados, não em achismo.</p>
              </div>
            </li>
            <li className="flex gap-3 text-[var(--gray)]">
              <span className="text-2xl">🛒</span>
              <div>
                <strong className="text-white">PDV Rápido e Moderno</strong>
                <p className="text-sm mt-1">Fazer vendas em segundos com código de barras ou busca rápida. Aceitar todas as formas de pagamento. Gerar PIX automático.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">💡 Analogia para usar na venda:</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <p className="text-white italic text-lg">
              "Imagina ter um GERENTE que nunca dorme, nunca falta, nunca erra, trabalha 24 horas por dia, 7 dias por semana, e você paga menos de R$10 por dia por ele. É isso que o Império Sistemas faz por você!"
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-white italic text-lg">
              "Sabe aquela calculadora que você usa? O caderninho de anotações? A planilha do Excel? O Império Sistemas substitui TUDO isso em um lugar só, e ainda faz muito mais!"
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-white italic text-lg">
              "É como se você contratasse um CONTADOR + um GERENTE + um SECRETÁRIO, tudo em um. Só que muito mais barato e nunca reclama!"
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🏆 Diferenciais Competitivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { titulo: '100% na Nuvem', desc: 'Acesse de qualquer lugar, qualquer dispositivo. Seus dados sempre seguros.' },
              { titulo: 'Sem Instalação', desc: 'Funciona no navegador. Não precisa instalar nada, não ocupa espaço.' },
              { titulo: 'Atualizações Grátis', desc: 'Sempre terá a versão mais nova sem pagar nada a mais.' },
              { titulo: 'Suporte Humanizado', desc: 'WhatsApp direto com a equipe. Nada de robô ou 0800.' },
              { titulo: 'Sem Contrato', desc: 'Cancela quando quiser. Sem multa, sem burocracia.' },
              { titulo: 'Usuários Ilimitados', desc: 'Cadastre quantos funcionários precisar. Sem custo adicional.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-semibold">{item.titulo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">👑 Por que o nome "Império"?</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            Porque queremos que cada cliente <strong className="text-white">construa seu próprio império</strong>! Um negócio forte, organizado e lucrativo. O sistema é a <strong className="text-white">fundação</strong> desse império.
          </p>
          <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
            <p className="text-white italic">
              "Todo grande império começou com uma boa fundação. O Império Sistemas é a fundação que vai sustentar o crescimento do seu negócio. Quando você organiza sua empresa, você libera tempo e energia para CRESCER!"
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📱 Tecnologia de Ponta</h3>
          <div className="space-y-3">
            {[
              { tech: 'Servidor na AWS', desc: 'Mesma infraestrutura usada pela Netflix e grandes empresas' },
              { tech: 'Backup Automático', desc: 'Seus dados são copiados a cada hora. Nunca perde nada' },
              { tech: 'Criptografia SSL', desc: 'Mesmo nível de segurança de bancos' },
              { tech: 'LGPD Compliant', desc: 'Dados dos clientes protegidos conforme a lei' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <span className="text-orange-400">🔒</span>
                <div>
                  <span className="text-white font-semibold">{item.tech}</span>
                  <span className="text-[var(--gray)] text-sm ml-2">- {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">SCRIPT PARA APRESENTAR O SISTEMA</h4>
              <p className="text-[var(--gray)] mb-3">
                Use esse script quando for explicar o que é o Império:
              </p>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-white italic">
                  "O Império Sistemas é uma solução completa de gestão para o seu comércio. Com ele, você controla estoque, vendas, clientes, financeiro e ainda emite nota fiscal - tudo em um lugar só. Funciona 100% online, você acessa de qualquer celular ou computador. E o melhor: custa menos de R$10 por dia. É como ter um gerente, um contador e um secretário trabalhando pra você 24 horas, mas pagando muito menos. Posso te mostrar como funciona?"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ O que NÃO é o Império Sistemas</h3>
          <p className="text-[var(--gray)] mb-4">Para evitar expectativas erradas, deixe claro:</p>
          <div className="space-y-2">
            {[
              'NÃO é um sistema de contabilidade (não substitui o contador)',
              'NÃO emite folha de pagamento de funcionários',
              'NÃO é loja virtual/e-commerce (é para loja física)',
              'NÃO funciona offline (precisa de internet)',
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">❌ {item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  'mod1-2': {
    titulo: 'Todas as Funcionalidades',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Visão Geral das Funcionalidades</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O Império Sistemas é uma <strong className="text-white">suíte completa</strong> de ferramentas para gestão comercial.
            Conhecer cada funcionalidade em detalhes vai te ajudar a <strong className="text-white">conectar as dores do cliente com as soluções certas</strong>.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-semibold mb-2">💡 Dica de Venda:</p>
            <p className="text-[var(--gray)]">
              Não tente mostrar TODAS as funcionalidades. Identifique as <strong className="text-white">3-4 que resolvem as dores</strong> que o cliente mencionou e foque nelas!
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🛒 PDV - Ponto de Venda</h3>
          <p className="text-[var(--gray)] mb-4">
            O coração do sistema! É onde acontecem as vendas do dia a dia. Rápido, intuitivo e completo.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-3">Recursos do PDV:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'Código de barras', desc: 'Bipa e já adiciona o produto' },
                  { func: 'Busca inteligente', desc: 'Por nome, código ou descrição' },
                  { func: 'Troco automático', desc: 'Calcula na hora, sem erro' },
                  { func: 'Múltiplas formas', desc: 'Dinheiro, cartão, PIX, fiado' },
                  { func: 'PIX QR Code', desc: 'Gera automaticamente, cliente paga na hora' },
                  { func: 'Desconto flexível', desc: 'Por item, percentual ou valor fixo' },
                  { func: 'Cupom fiscal', desc: 'NFC-e automática ao finalizar' },
                  { func: 'Venda crediário', desc: 'Fiado com controle automático' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">📝 Script para Demonstrar o PDV:</p>
              <p className="text-white italic">
                "Olha só como é rápido: eu bipo o produto, ele já aparece aqui com o preço. Posso adicionar mais itens.
                O cliente vai pagar com PIX? Olha, clico aqui e o QR Code aparece na hora! Ele paga, o sistema confirma automaticamente,
                e a nota fiscal já vai pro e-mail dele. Uma venda que levava 2 minutos, agora leva 30 segundos!"
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">🎯 Quando mencionar o PDV:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Cliente reclama que demora para atender</li>
                <li>• Erra troco ou cálculo frequentemente</li>
                <li>• Não aceita PIX ou tem dificuldade</li>
                <li>• Fila grande e clientes desistindo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📦 Controle de Estoque</h3>
          <p className="text-[var(--gray)] mb-4">
            Nunca mais perca venda por falta de produto ou compre demais do que não precisa!
          </p>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">Recursos do Estoque:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'Produtos ilimitados', desc: 'Cadastre quantos precisar' },
                  { func: 'Foto do produto', desc: 'Facilita identificação' },
                  { func: 'Estoque mínimo', desc: 'Alerta antes de acabar' },
                  { func: 'Histórico completo', desc: 'Toda entrada e saída' },
                  { func: 'Inventário', desc: 'Contagem com conferência' },
                  { func: 'Importação Excel', desc: 'Migre sua lista atual' },
                  { func: 'Código de barras', desc: 'Próprio ou do fabricante' },
                  { func: 'Categorias', desc: 'Organize por departamento' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Script para Demonstrar Estoque:</p>
              <p className="text-white italic">
                "Veja aqui: cada produto mostra quanto tem em estoque. Quando chega no mínimo que você definiu - por exemplo,
                5 unidades - o sistema já te avisa: 'Ei, tá acabando o produto X!'. Você compra ANTES de acabar,
                nunca mais perde venda. E olha esse relatório: mostra tudo que está no mínimo, pronto pra você fazer o pedido pro fornecedor!"
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">💰 Impacto Financeiro:</p>
              <p className="text-[var(--gray)]">
                <strong className="text-white">Estoque descontrolado custa caro:</strong> produto que acaba = venda perdida.
                Produto parado = dinheiro preso. Com controle, você otimiza o giro e maximiza o lucro!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">👥 Cadastro de Clientes</h3>
          <p className="text-[var(--gray)] mb-4">
            Conheça seus clientes e venda mais! Fidelização é o segredo das lojas que crescem.
          </p>

          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">Informações do Cliente:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'Dados completos', desc: 'Nome, CPF/CNPJ, contatos' },
                  { func: 'Histórico de compras', desc: 'Tudo que já comprou' },
                  { func: 'Limite de crédito', desc: 'Controle de fiado' },
                  { func: 'Pontos fidelidade', desc: 'Programa de recompensas' },
                  { func: 'Aniversário', desc: 'Para promoções especiais' },
                  { func: 'Observações', desc: 'Anotações sobre o cliente' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-purple-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">📝 Script para Demonstrar Clientes:</p>
              <p className="text-white italic">
                "Imagina: o João entra na loja. Você digita o nome dele e aparece tudo - o que ele já comprou,
                quanto ele deve do fiado, quando é o aniversário dele. Aí você fala: 'João, vi que seu aniversário é semana que vem,
                tenho um desconto especial pra você!'. Isso gera relacionamento e cliente que volta sempre!"
              </p>
            </div>

            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <p className="text-pink-400 font-semibold mb-2">❤️ Por que isso vende:</p>
              <p className="text-[var(--gray)]">
                Cliente que se sente <strong className="text-white">lembrado e especial</strong> não vai no concorrente só por causa de preço.
                Fidelização é o que separa lojas que sobrevivem de lojas que prosperam!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">💰 Módulo Financeiro</h3>
          <p className="text-[var(--gray)] mb-4">
            Saiba exatamente quanto entra, quanto sai, e o mais importante: quanto está LUCRANDO!
          </p>

          <div className="space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Recursos Financeiros:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'Contas a Pagar', desc: 'Fornecedores, despesas fixas' },
                  { func: 'Contas a Receber', desc: 'Crediário, parcelas' },
                  { func: 'Alertas de vencimento', desc: 'Nunca mais pague juros' },
                  { func: 'Fluxo de Caixa', desc: 'Previsão de entradas e saídas' },
                  { func: 'DRE simplificado', desc: 'Receitas vs Despesas' },
                  { func: 'Fechamento de caixa', desc: 'Conferência por turno' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-yellow-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">📝 Script para Demonstrar Financeiro:</p>
              <p className="text-white italic">
                "Esse é o Dashboard financeiro. Olha aqui: vendeu R$15.000 esse mês. Mas quanto LUCROU?
                O sistema já desconta os custos e mostra: R$4.500 de lucro líquido. E esse gráfico aqui?
                Compara com o mês passado. Você está 12% melhor! Tudo isso sem precisar de planilha ou contador todo dia."
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">⚠️ Dor que isso resolve:</p>
              <p className="text-[var(--gray)]">
                <strong className="text-white">70% dos empresários não sabem se estão tendo lucro ou prejuízo.</strong>
                Vendem bastante mas no final do mês não sobra nada. O financeiro do Império resolve isso!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📋 Módulo Fiscal (NFC-e / NF-e)</h3>
          <p className="text-[var(--gray)] mb-4">
            Fique em dia com o fisco sem complicação! Emita notas com poucos cliques.
          </p>

          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-3">Recursos Fiscais:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'NFC-e automática', desc: 'Cupom fiscal na venda' },
                  { func: 'NF-e completa', desc: 'Para vendas maiores' },
                  { func: 'Cancelamento fácil', desc: 'Até 24h sem burocracia' },
                  { func: 'Certificado A1', desc: 'Integração direta' },
                  { func: 'Envio SEFAZ', desc: 'Automático e instantâneo' },
                  { func: 'XML armazenado', desc: 'Backup de todas as notas' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-orange-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">📝 Script para Demonstrar Fiscal:</p>
              <p className="text-white italic">
                "Quando você finaliza a venda, a nota fiscal é emitida AUTOMATICAMENTE. Vai direto pra SEFAZ,
                o XML fica salvo, e o cliente recebe por e-mail se quiser. Se precisar cancelar? Clica aqui,
                coloca o motivo, pronto. Sem ligar pra contador, sem dor de cabeça."
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">⚠️ ALERTA IMPORTANTE:</p>
              <p className="text-[var(--gray)]">
                A multa por não emitir nota fiscal pode variar de <strong className="text-white">R$500 a R$50.000</strong> dependendo do estado.
                Além disso, pode haver <strong className="text-white">interdição do estabelecimento</strong>. Melhor prevenir!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Relatórios e Dashboards</h3>
          <p className="text-[var(--gray)] mb-4">
            Tome decisões baseadas em dados, não em achismo! Relatórios visuais e fáceis de entender.
          </p>

          <div className="space-y-4">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-3">Relatórios Disponíveis:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { func: 'Vendas por período', desc: 'Diário, semanal, mensal' },
                  { func: 'Produtos mais vendidos', desc: 'Ranking dos campeões' },
                  { func: 'Produtos parados', desc: 'Sem venda há X dias' },
                  { func: 'Vendas por vendedor', desc: 'Comissão automática' },
                  { func: 'Clientes inativos', desc: 'Quem parou de comprar' },
                  { func: 'Margem por produto', desc: 'Lucro de cada item' },
                  { func: 'Curva ABC', desc: 'Produtos que mais faturam' },
                  { func: 'Comparativo mensal', desc: 'Evolução ao longo do tempo' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-cyan-400">✓</span>
                    <div>
                      <span className="text-white">{item.func}</span>
                      <span className="text-[var(--gray)] text-sm"> - {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">📝 Script para Demonstrar Relatórios:</p>
              <p className="text-white italic">
                "Olha esse gráfico: suas vendas dos últimos 6 meses. Dá pra ver que dezembro foi o melhor mês.
                E esse aqui? Os 10 produtos que mais vendem na sua loja. Você sabe quais são?
                Com esses dados, você decide onde investir, o que comprar mais, o que fazer promoção..."
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TÉCNICA DE DEMONSTRAÇÃO</h4>
              <p className="text-[var(--gray)] mb-3">
                Na hora de demonstrar, siga esta ordem:
              </p>
              <ol className="text-[var(--gray)] space-y-1">
                <li><strong className="text-white">1.</strong> PDV - faça uma venda simulada (impressiona!)</li>
                <li><strong className="text-white">2.</strong> Estoque - mostre o alerta de mínimo</li>
                <li><strong className="text-white">3.</strong> Funcionalidade específica da DOR do cliente</li>
                <li><strong className="text-white">4.</strong> Dashboard - termine com gráficos bonitos</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod1-3': {
    titulo: 'Tabela de Preços e Investimento',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Entendendo o Modelo de Precificação</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            O valor do Império Sistemas é dividido em duas partes: <strong className="text-white">implantação</strong> (única) e
            <strong className="text-white"> mensalidade</strong> (recorrente). Saber apresentar isso corretamente faz toda a diferença!
          </p>
        </div>

        <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-8 text-center">
          <p className="text-green-400 mb-2 text-lg">INVESTIMENTO MENSAL</p>
          <p className="text-5xl font-bold text-white mb-2">R$ 250</p>
          <p className="text-[var(--gray)] mb-4">por mês - sistema completo ilimitado</p>
          <div className="bg-black/30 rounded-lg p-4 mt-4">
            <p className="text-[var(--gold)] font-semibold">💡 Como apresentar:</p>
            <p className="text-white italic mt-2">
              "São menos de R$10 por dia. Menos que um lanche! E você ganha um gerente que trabalha 24 horas."
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">💰 Formas de Pagamento da Implantação</h3>
          <p className="text-[var(--gray)] mb-4">
            A implantação inclui: configuração inicial, cadastro de produtos, treinamento e suporte de setup.
          </p>

          <div className="space-y-4">
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-lg">💵 À Vista (MELHOR OPÇÃO)</span>
                <span className="text-green-400 font-bold text-xl">R$ 1.000</span>
              </div>
              <p className="text-[var(--gray)] text-sm mb-3">Cliente tem dinheiro disponível - máximo desconto!</p>
              <div className="bg-green-500/20 rounded-lg p-3">
                <p className="text-green-400 font-semibold text-sm mb-1">📝 Script:</p>
                <p className="text-white italic text-sm">
                  "A implantação completa com treinamento sai por R$1.000 à vista. Você economiza R$200 em relação ao parcelado.
                  Começamos a configurar hoje mesmo e em 3 dias você já está operando!"
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-lg">💳 Parcelado 3x</span>
                <span className="text-blue-400 font-bold text-xl">3x R$ 400</span>
              </div>
              <p className="text-[var(--gray)] text-sm mb-3">Cliente prefere parcelar o investimento inicial</p>
              <div className="bg-blue-500/20 rounded-lg p-3">
                <p className="text-blue-400 font-semibold text-sm mb-1">📝 Script:</p>
                <p className="text-white italic text-sm">
                  "Se preferir parcelar, fazemos em 3x de R$400. A primeira agora, as outras nos próximos 2 meses.
                  É um investimento que você começa a ter retorno já no primeiro mês!"
                </p>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-lg">🎯 Sem Entrada (Último Recurso)</span>
                <span className="text-orange-400 font-bold text-xl">R$ 299/mês</span>
              </div>
              <p className="text-[var(--gray)] text-sm mb-3">1º ano R$299/mês, depois volta para R$250/mês</p>
              <div className="bg-orange-500/20 rounded-lg p-3">
                <p className="text-orange-400 font-semibold text-sm mb-1">📝 Script:</p>
                <p className="text-white italic text-sm">
                  "Olha, tenho uma opção especial: você não paga nada de entrada. A mensalidade fica R$299 no primeiro ano,
                  e depois volta pro valor normal de R$250. Assim você começa sem tirar nada do caixa!"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Target className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="text-red-500 font-semibold mb-2">⚠️ ORDEM DE APRESENTAÇÃO - MUITO IMPORTANTE!</h4>
              <ol className="text-[var(--gray)] space-y-2">
                <li><strong className="text-white">1º:</strong> Sempre ofereça <strong className="text-green-400">À VISTA</strong> primeiro</li>
                <li><strong className="text-white">2º:</strong> Se hesitar, ofereça <strong className="text-blue-400">PARCELADO 3x</strong></li>
                <li><strong className="text-white">3º:</strong> Só ofereça <strong className="text-orange-400">SEM ENTRADA</strong> se ele realmente não tiver como pagar</li>
              </ol>
              <p className="text-red-400 text-sm mt-3">
                Nunca comece pelo sem entrada! Você perde dinheiro e o cliente valoriza menos.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ O Que Está Incluído no Pacote</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { item: 'Sistema completo', desc: 'PDV, Estoque, Financeiro, Clientes' },
              { item: 'Usuários ilimitados', desc: 'Cadastre toda a equipe sem custo extra' },
              { item: 'Produtos ilimitados', desc: 'Sem limite de cadastros' },
              { item: 'Emissão fiscal', desc: 'NFC-e e NF-e inclusos' },
              { item: 'Treinamento completo', desc: 'Ensinamos você e sua equipe' },
              { item: 'Suporte WhatsApp', desc: 'Atendimento rápido e humanizado' },
              { item: 'Atualizações grátis', desc: 'Sempre com a versão mais nova' },
              { item: 'Backup automático', desc: 'Seus dados sempre seguros' },
            ].map((item, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-green-400 font-semibold">{item.item}</span>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🧮 Calculando o ROI para o Cliente</h3>
          <p className="text-[var(--gray)] mb-4">
            Use números para mostrar que o sistema <strong className="text-white">se paga sozinho</strong>:
          </p>

          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Exemplo 1: Estoque</h4>
              <p className="text-[var(--gray)]">
                Se você perde <strong className="text-white">3 vendas por semana</strong> por falta de produto, com ticket médio de R$50:
              </p>
              <p className="text-white mt-2">3 × R$50 × 4 semanas = <strong className="text-green-400">R$600/mês perdidos</strong></p>
              <p className="text-[var(--gray)] text-sm mt-1">O sistema custa R$250. Você recupera mais que o dobro!</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Exemplo 2: Calote</h4>
              <p className="text-[var(--gray)]">
                Se você tem <strong className="text-white">R$5.000 em fiados</strong> e 20% vira calote:
              </p>
              <p className="text-white mt-2">R$5.000 × 20% = <strong className="text-red-400">R$1.000 de prejuízo</strong></p>
              <p className="text-[var(--gray)] text-sm mt-1">Com controle de crediário, você reduz o calote para menos de 5%!</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Exemplo 3: Tempo</h4>
              <p className="text-[var(--gray)]">
                Se você gasta <strong className="text-white">2 horas por dia</strong> fazendo controles manuais:
              </p>
              <p className="text-white mt-2">2h × 25 dias = <strong className="text-blue-400">50 horas/mês</strong></p>
              <p className="text-[var(--gray)] text-sm mt-1">É tempo que você poderia usar para vender mais ou descansar!</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">💬 Respondendo "Tá Caro!"</h3>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-[var(--gray)] mb-2">Quando o cliente diz que está caro:</p>
              <p className="text-white italic">
                "Entendo sua preocupação com o investimento. Me deixa te fazer uma pergunta: quanto você acha que perde por mês
                sem ter controle de estoque? Sem saber seu lucro real? Com cliente que não paga o fiado?
                Some tudo isso. Aposto que é MUITO mais que R$250. O sistema não é gasto, é INVESTIMENTO que se paga em semanas!"
              </p>
            </div>

            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">Comparação Poderosa:</p>
              <p className="text-white italic">
                "R$250 por mês é menos de R$10 por dia. Menos que um lanche no shopping!
                E você ganha um gerente que trabalha 24 horas, não falta, não erra, e não pede aumento.
                Você contrataria um funcionário por R$10 por dia?"
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">DICA DE OURO: ANCORAGEM DE PREÇO</h4>
              <p className="text-[var(--gray)] mb-3">
                Antes de falar o preço, faça o cliente pensar em números maiores:
              </p>
              <p className="text-white italic">
                "Você sabe quanto custa um funcionário? Entre salário, encargos e benefícios, pelo menos R$2.500/mês.
                O Império faz o trabalho de 2-3 pessoas por R$250. É 10% do custo de UM funcionário!"
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod1-4': {
    titulo: 'As 10 Dores do Empresário',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">A Chave da Venda: Entender a Dor</h3>
          <p className="text-[var(--gray)] text-lg mb-4">
            Todo empresário tem <strong className="text-white">problemas</strong>. São como dores de cabeça que não passam.
            Nosso sistema é o <strong className="gold-text">remédio</strong> para essas dores!
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-semibold mb-2">🎯 Por que isso é importante?</p>
            <p className="text-[var(--gray)]">
              Você não vende um sistema. Você vende a <strong className="text-white">SOLUÇÃO para um problema</strong>.
              Quando você identifica a dor do cliente e mostra que tem o remédio, a venda acontece naturalmente!
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 1: "Não sei quanto tenho em estoque"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                O empresário anota em caderno, planilha ou "de cabeça". Quando vai ver, o produto acabou e ele nem sabia.
                Pior: às vezes compra produto que já tem demais e deixa de comprar o que precisa.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Estoque atualizado automaticamente a cada venda</li>
                <li>• Alerta quando produto atinge estoque mínimo</li>
                <li>• Relatório de produtos para reposição</li>
                <li>• Histórico de movimentações (entrada/saída)</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você já perdeu venda porque o produto tinha acabado e você não sabia?</em>"</li>
                <li>"<em>Como você sabe quando precisa comprar mais mercadoria?</em>"</li>
                <li>"<em>Quanto tempo você gasta fazendo contagem de estoque?</em>"</li>
                <li>"<em>Já comprou produto achando que tinha pouco e descobriu que tinha demais?</em>"</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">💰 Impacto Financeiro:</p>
              <p className="text-[var(--gray)]">
                Uma loja que perde <strong className="text-white">3 vendas por semana</strong> por falta de produto,
                com ticket médio de R$50, perde <strong className="text-white">R$600/mês</strong>.
                Em um ano: <strong className="text-white">R$7.200</strong>! Mais que paga o sistema.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 2: "Não sei se estou tendo lucro"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Muitos empresários confundem <strong className="text-white">faturamento com lucro</strong>.
                Acham que estão ganhando dinheiro porque vendem bastante, mas no final do mês não sobra nada.
                Não sabem o custo real de cada produto, não controlam as despesas fixas.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Dashboard com lucro bruto e líquido em tempo real</li>
                <li>• Margem de lucro por produto</li>
                <li>• Comparativo mensal (esse mês vs mês passado)</li>
                <li>• Relatório de despesas fixas e variáveis</li>
                <li>• Gráficos visuais fáceis de entender</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você sabe exatamente quanto LUCROU esse mês? Não faturamento, LUCRO?</em>"</li>
                <li>"<em>Sabe qual produto dá mais lucro pra você? E qual dá prejuízo?</em>"</li>
                <li>"<em>No final do mês sobra dinheiro ou você fica no zero a zero?</em>"</li>
                <li>"<em>Quanto das suas vendas vira lucro de verdade? 10%? 20%? Você sabe?</em>"</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">💡 Frase de Impacto:</p>
              <p className="text-white italic">
                "Tem empresário que vende R$50.000 por mês e não sabe se está ganhando ou perdendo dinheiro.
                Trabalha o mês inteiro pra no final descobrir que ficou no zero.
                Com o Império, você olha o celular e sabe na hora quanto está lucrando!"
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 3: "Perco vendas por falta de produto"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Cliente entra na loja querendo comprar, o produto acabou, cliente vai no concorrente.
                E o pior: muitas vezes o cliente <strong className="text-white">nunca mais volta</strong>.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Estoque mínimo configurável por produto</li>
                <li>• Alerta por email/notificação quando atingir</li>
                <li>• Sugestão automática de compra</li>
                <li>• Histórico de vendas para prever demanda</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Quantas vezes por mês um cliente pede algo que acabou?</em>"</li>
                <li>"<em>Quando acaba um produto campeão de vendas, quanto tempo demora pra repor?</em>"</li>
                <li>"<em>Você acha que perde mais vendas por preço alto ou por falta de produto?</em>"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 4: "Não sei quem me deve"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Vende fiado, anota no caderninho, cliente "esquece" de pagar, rasura a anotação,
                diz que já pagou. O empresário perde dinheiro e ainda fica mal com o cliente.
                Muitos têm <strong className="text-white">milhares de reais a receber</strong> que nunca vão ver.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Sistema de crediário completo</li>
                <li>• Limite de crédito por cliente</li>
                <li>• Bloqueio automático de inadimplentes</li>
                <li>• Histórico de pagamentos</li>
                <li>• Relatório de devedores</li>
                <li>• Comprovante de compra para o cliente assinar</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você vende fiado? Como controla isso? No caderninho?</em>"</li>
                <li>"<em>Quanto você tem pra receber hoje que nem sabe?</em>"</li>
                <li>"<em>Já teve cliente que disse que já tinha pagado e você não lembrava?</em>"</li>
                <li>"<em>Quanto você acha que perdeu com calote nos últimos 12 meses?</em>"</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">💰 Impacto Financeiro:</p>
              <p className="text-[var(--gray)]">
                Se você tem R$5.000 em fiados e <strong className="text-white">20% vira calote</strong>,
                você perde <strong className="text-white">R$1.000</strong>.
                Com o sistema, você reduz o calote para menos de 5%!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 5: "Esqueço de pagar contas"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Esquece de pagar fornecedor, paga multa e juros. Nome fica sujo, perde crédito no mercado.
                Não sabe quanto tem a pagar no mês, toma susto quando chega a conta.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Cadastro de todas as contas a pagar</li>
                <li>• Alerta de vencimento (3 dias antes, no dia)</li>
                <li>• Calendário visual de pagamentos</li>
                <li>• Relatório de fluxo de caixa futuro</li>
                <li>• Baixa automática quando pagar</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Quanto você já perdeu em juros por esquecer de pagar uma conta?</em>"</li>
                <li>"<em>Você sabe exatamente quanto tem que pagar esse mês?</em>"</li>
                <li>"<em>Já tomou susto quando chegou uma conta que tinha esquecido?</em>"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 6: "Demoro muito para fazer uma venda"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Procura preço no caderno, calcula na calculadora, soma na mão, escreve o pedido...
                Cliente fica esperando, fila cresce, alguns desistem e vão embora.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• PDV com código de barras (bipa e já adiciona)</li>
                <li>• Busca rápida por nome do produto</li>
                <li>• Calcula troco automático</li>
                <li>• Aceita múltiplas formas de pagamento</li>
                <li>• Uma venda em menos de 30 segundos!</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Quanto tempo você leva pra fazer uma venda? Com nosso sistema, 30 segundos!</em>"</li>
                <li>"<em>Já perdeu cliente porque a fila estava grande?</em>"</li>
                <li>"<em>Quantas vezes você errou o troco ou o cálculo?</em>"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 7: "Não consigo fidelizar clientes"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Cliente compra uma vez e some. Vai no concorrente que fez promoção.
                Não tem nenhum programa para trazer o cliente de volta.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Programa de pontos de fidelidade</li>
                <li>• Cadastro com aniversário (manda parabéns!)</li>
                <li>• Histórico de compras por cliente</li>
                <li>• Desconto progressivo por volume</li>
                <li>• Relatório de clientes inativos</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Seus clientes voltam sempre ou vão no concorrente?</em>"</li>
                <li>"<em>Você sabe quais clientes não compram há mais de 30 dias?</em>"</li>
                <li>"<em>O que você faz pra trazer o cliente de volta?</em>"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 8: "Tenho medo da fiscalização"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Não emite nota fiscal em todas as vendas. Tem medo de fiscalização.
                Não sabe como funciona NFC-e. Acha que é complicado e caro.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Emissão de NFC-e com um clique</li>
                <li>• Integração automática com SEFAZ</li>
                <li>• Cancelamento de nota fácil</li>
                <li>• Relatório de notas emitidas</li>
                <li>• Suporte para configurar tudo</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você sabe que a multa por não emitir nota pode ser R$50.000?</em>"</li>
                <li>"<em>Você emite nota em todas as vendas ou só quando o cliente pede?</em>"</li>
                <li>"<em>Já ouviu falar em blitz fiscal? Sabe o que acontece?</em>"</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">⚠️ Alerta de Risco:</p>
              <p className="text-[var(--gray)]">
                A multa por não emissão de nota fiscal pode variar de <strong className="text-white">R$500 a R$50.000</strong>
                dependendo do estado e da reincidência. Além disso, pode haver <strong className="text-white">interdição do estabelecimento</strong>!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 9: "Não sei quais produtos vendem mais"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Compra muito do produto errado, pouco do produto certo.
                Dinheiro parado em estoque que não gira. Não sabe o que fazer promoção.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Ranking dos produtos mais vendidos</li>
                <li>• Produtos parados (sem venda há X dias)</li>
                <li>• Curva ABC de produtos</li>
                <li>• Sugestão de promoção para girar estoque</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você sabe qual é o seu produto CAMPEÃO de vendas?</em>"</li>
                <li>"<em>E qual produto está parado há meses ocupando espaço?</em>"</li>
                <li>"<em>Como você decide o que comprar mais e o que não comprar?</em>"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">😫 DOR 10: "Funcionário rouba e não sei"</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">O Problema:</p>
              <p className="text-[var(--gray)]">
                Funcionário faz venda e não registra, fica com o dinheiro.
                Dá desconto pra amigo sem autorização. Sangria o caixa.
                O dono só descobre quando já perdeu muito.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">✅ Nossa Solução:</p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Login individual por funcionário</li>
                <li>• Histórico de todas as operações</li>
                <li>• Relatório de vendas por vendedor</li>
                <li>• Alerta de cancelamentos e descontos</li>
                <li>• Fechamento de caixa por turno</li>
                <li>• Permissões por nível de acesso</li>
              </ul>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📝 Perguntas para Sondagem:</p>
              <ul className="text-[var(--gray)] space-y-2">
                <li>"<em>Você confia 100% em todos os seus funcionários?</em>"</li>
                <li>"<em>Como você sabe se um funcionário cancelou uma venda?</em>"</li>
                <li>"<em>Já teve diferença no caixa que não soube explicar?</em>"</li>
                <li>"<em>Você sabe quanto cada funcionário vendeu hoje?</em>"</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">💡 Frase de Impacto:</p>
              <p className="text-white italic">
                "Não é questão de desconfiar de todo mundo. É questão de ter CONTROLE.
                Quando você tem controle, os honestos ficam tranquilos e os desonestos pensam duas vezes!"
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">COMO USAR ESSAS DORES NA VENDA</h4>
              <ol className="text-[var(--gray)] space-y-2">
                <li><strong className="text-white">1.</strong> Na sondagem, faça as perguntas para identificar qual dor o cliente tem</li>
                <li><strong className="text-white">2.</strong> Quando ele confirmar uma dor, explore mais: "Me conta mais sobre isso..."</li>
                <li><strong className="text-white">3.</strong> Mostre que você entende: "Muitos clientes nossos passavam por isso..."</li>
                <li><strong className="text-white">4.</strong> Apresente a solução: "E foi exatamente pra resolver isso que..."</li>
                <li><strong className="text-white">5.</strong> Demonstre no sistema a funcionalidade que resolve</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-1': {
    titulo: 'Os 7 Passos da Venda Perfeita',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">O Método Comprovado</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Estes 7 passos são o <strong className="text-white">roteiro completo</strong> de uma venda presencial bem-sucedida.
            Siga a ordem e você terá resultados consistentes. Pule algum passo e a venda pode escapar!
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
            <p className="text-blue-400 font-semibold mb-2">📊 Estatística Importante:</p>
            <p className="text-[var(--gray)]">
              Vendedores que seguem um processo estruturado vendem <strong className="text-white">30% mais</strong> que os que improvisam!
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">1</div>
            <div>
              <h3 className="text-xl font-bold text-white">ABORDAGEM</h3>
              <p className="text-[var(--gray)]">O primeiro contato é crucial. Você tem 7 segundos para causar boa impressão!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">✅ O Que Fazer:</h4>
              <ul className="text-[var(--gray)] space-y-2">
                <li>• <strong className="text-white">Sorriso genuíno</strong> - não forçado, pense em algo bom antes de entrar</li>
                <li>• <strong className="text-white">Olhe nos olhos</strong> - transmite confiança e sinceridade</li>
                <li>• <strong className="text-white">Aperto de mão firme</strong> - nem mole nem esmagador</li>
                <li>• <strong className="text-white">Vista-se adequadamente</strong> - roupa social casual, limpa e passada</li>
                <li>• <strong className="text-white">Postura ereta</strong> - ombros para trás, cabeça erguida</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">📝 Script de Abertura:</h4>
              <p className="text-white italic">
                "Bom dia! Tudo bem? Sou o [SEU NOME], da Império Sistemas. Vi que você tem um [TIPO DE NEGÓCIO] muito bonito aqui!
                Posso tomar 5 minutinhos do seu tempo? Prometo que vai valer a pena!"
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">💡 Técnica Avançada - Elogio Genuíno:</h4>
              <p className="text-[var(--gray)]">
                Antes de entrar, observe o estabelecimento. Encontre algo para elogiar genuinamente: a organização,
                um produto interessante, a decoração. Isso quebra o gelo instantaneamente!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">2</div>
            <div>
              <h3 className="text-xl font-bold text-white">SONDAGEM</h3>
              <p className="text-[var(--gray)]">Faça perguntas para descobrir os problemas do cliente. Regra 70/30: cliente fala 70%!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <h4 className="text-[var(--gold)] font-semibold mb-3">🎯 Perguntas Poderosas por Tema:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-400 font-semibold mb-2">Estoque:</p>
                  <ul className="text-[var(--gray)] text-sm space-y-1">
                    <li>• "Como você controla seu estoque hoje?"</li>
                    <li>• "Já perdeu venda porque acabou o produto?"</li>
                    <li>• "Quanto tempo gasta fazendo inventário?"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-green-400 font-semibold mb-2">Financeiro:</p>
                  <ul className="text-[var(--gray)] text-sm space-y-1">
                    <li>• "Você sabe exatamente quanto lucrou esse mês?"</li>
                    <li>• "Já esqueceu de pagar conta e pagou juros?"</li>
                    <li>• "Como controla as contas a pagar?"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold mb-2">Crediário:</p>
                  <ul className="text-[var(--gray)] text-sm space-y-1">
                    <li>• "Você vende fiado? Como controla?"</li>
                    <li>• "Já teve cliente que esqueceu de pagar?"</li>
                    <li>• "Quanto tem pra receber que nem sabe?"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold mb-2">Fiscal:</p>
                  <ul className="text-[var(--gray)] text-sm space-y-1">
                    <li>• "Emite nota fiscal em todas as vendas?"</li>
                    <li>• "Sabe da multa por não emitir nota?"</li>
                    <li>• "Seu contador reclama da desorganização?"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">👂 Técnicas de Escuta Ativa:</h4>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Acenar com a cabeça mostrando que está acompanhando</li>
                <li>• Repetir palavras-chave: "Então você perde vendas por falta de produto..."</li>
                <li>• Perguntar "me conta mais sobre isso" para aprofundar</li>
                <li>• Anotar os problemas - vai usar depois!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold text-white">APRESENTAÇÃO</h3>
              <p className="text-[var(--gray)]">Conecte os problemas que descobriu com as soluções do sistema!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">🔥 A Fórmula Mágica:</h4>
              <div className="flex items-center justify-center gap-2 text-xl py-4">
                <span className="text-red-400 font-bold">DOR</span>
                <span className="text-[var(--gray)]">→</span>
                <span className="text-blue-400 font-bold">SOLUÇÃO</span>
                <span className="text-[var(--gray)]">→</span>
                <span className="text-green-400 font-bold">BENEFÍCIO</span>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">📝 Exemplos Práticos:</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">DOR: "Perco vendas por falta de produto"</p>
                  <p className="text-blue-400 text-sm">SOLUÇÃO: Alerta de estoque mínimo</p>
                  <p className="text-green-400 text-sm">BENEFÍCIO: "Nunca mais perde venda!"</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">DOR: "Não sei se estou tendo lucro"</p>
                  <p className="text-blue-400 text-sm">SOLUÇÃO: Dashboard com lucro em tempo real</p>
                  <p className="text-green-400 text-sm">BENEFÍCIO: "Olha o celular e sabe na hora!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">4</div>
            <div>
              <h3 className="text-xl font-bold text-white">DEMONSTRAÇÃO</h3>
              <p className="text-[var(--gray)]">Ver é acreditar! Mostre o sistema funcionando de verdade.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">🎬 Roteiro de 10 Minutos:</h4>
              <div className="space-y-2">
                {[
                  { tempo: '0-2 min', acao: 'PDV - faça uma venda simulada com o cliente', cor: 'blue' },
                  { tempo: '2-4 min', acao: 'Estoque - mostre o alerta de mínimo', cor: 'green' },
                  { tempo: '4-6 min', acao: 'Relatórios - abra o dashboard com gráficos', cor: 'purple' },
                  { tempo: '6-8 min', acao: 'Funcionalidade específica da DOR dele', cor: 'orange' },
                  { tempo: '8-10 min', acao: 'Nota fiscal - mostre como é simples', cor: 'cyan' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className={`bg-${item.cor}-500/20 text-${item.cor}-400 px-2 py-1 rounded text-sm font-mono`}>{item.tempo}</span>
                    <span className="text-[var(--gray)]">{item.acao}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <h4 className="text-[var(--gold)] font-semibold mb-2">⭐ Regra de Ouro:</h4>
              <p className="text-white italic text-lg">
                "DEIXE O CLIENTE CLICAR! Quando ele mexe no sistema, ele se imagina usando. A venda fica muito mais fácil!"
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">5</div>
            <div>
              <h3 className="text-xl font-bold text-white">NEGOCIAÇÃO</h3>
              <p className="text-[var(--gray)]">Use a técnica SENTE-SENTIU-ENCONTROU para lidar com objeções.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-3">🛡️ A Técnica SSE (Sente-Sentiu-Encontrou):</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-blue-400 font-bold">S</span>
                  <p className="text-[var(--gray)]">"Entendo como você se <strong className="text-white">SENTE</strong>..."</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-400 font-bold">S</span>
                  <p className="text-[var(--gray)]">"Outros clientes também <strong className="text-white">SENTIRAM</strong> isso no início..."</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-purple-400 font-bold">E</span>
                  <p className="text-[var(--gray)]">"Mas eles <strong className="text-white">ENCONTRARAM</strong> que depois de usar..."</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">📝 Exemplo na Prática:</h4>
              <p className="text-white italic">
                "Entendo como você se SENTE em relação ao preço. Muitos clientes também SENTIRAM que era um investimento alto no início.
                Mas eles ENCONTRARAM que em menos de 3 meses o sistema já tinha se pagado só com as vendas que não perderam mais!"
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">6</div>
            <div>
              <h3 className="text-xl font-bold text-white">FECHAMENTO</h3>
              <p className="text-[var(--gray)]">Não tenha medo de pedir a venda! Este é o momento da verdade.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">🎯 3 Técnicas de Fechamento:</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold">Alternativa:</p>
                  <p className="text-white italic">"Você prefere à vista com desconto ou parcelado em 3x?"</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-green-400 font-semibold">Resumo:</p>
                  <p className="text-white italic">"Então, com o sistema você controla estoque, emite nota e sabe seu lucro. Podemos começar essa semana?"</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <p className="text-orange-400 font-semibold">Direto:</p>
                  <p className="text-white italic">"Vamos fechar?"</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">⚠️ Regra do Silêncio:</h4>
              <p className="text-[var(--gray)]">
                Depois de fazer a pergunta de fechamento, <strong className="text-white">FIQUE EM SILÊNCIO</strong>.
                Quem fala primeiro, perde. Deixe o cliente processar e responder!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center text-black font-bold text-2xl flex-shrink-0">7</div>
            <div>
              <h3 className="text-xl font-bold text-white">PÓS-VENDA</h3>
              <p className="text-[var(--gray)]">A venda não acaba quando o cliente paga. O pós-venda gera indicações!</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">📅 Cronograma de Contatos:</h4>
              <div className="space-y-2">
                {[
                  { dia: 'Dia 1', acao: 'Mensagem de boas-vindas', msg: '"Parabéns pela decisão! Qualquer dúvida, me chama!"' },
                  { dia: 'Dia 7', acao: 'Check-up primeira semana', msg: '"Como foi a primeira semana? Precisa de ajuda?"' },
                  { dia: 'Dia 30', acao: 'Pesquisa de satisfação', msg: '"De 0 a 10, quanto recomendaria?"' },
                  { dia: 'Dia 45', acao: 'Pedido de indicação', msg: '"Conhece algum amigo empresário?"' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-black/30 rounded-lg p-3">
                    <span className="bg-green-500/30 text-green-400 px-2 py-1 rounded text-sm font-bold">{item.dia}</span>
                    <div>
                      <p className="text-white font-semibold">{item.acao}</p>
                      <p className="text-[var(--gray)] text-sm italic">{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <h4 className="text-[var(--gold)] font-semibold mb-2">💡 Matemática das Indicações:</h4>
              <p className="text-[var(--gray)]">
                Se cada cliente indicar <strong className="text-white">apenas 1 pessoa</strong> que fecha,
                você <strong className="text-white">dobra suas vendas</strong> sem prospectar!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">RESUMO DOS 7 PASSOS</h4>
              <div className="flex flex-wrap gap-2 mt-3">
                {['1. Abordagem', '2. Sondagem', '3. Apresentação', '4. Demonstração', '5. Negociação', '6. Fechamento', '7. Pós-Venda'].map((passo, idx) => (
                  <span key={idx} className="bg-[var(--gold)]/20 text-[var(--gold)] px-3 py-1 rounded-full text-sm font-semibold">
                    {passo}
                  </span>
                ))}
              </div>
              <p className="text-[var(--gray)] mt-3">
                Pratique cada passo até virar automático. A venda perfeita é resultado de preparação!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-5': {
    titulo: 'Quebrando as 8 Objeções',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <p className="text-[var(--gray)] text-lg">
            Objeção <strong className="text-white">NÃO é rejeição</strong>! É só uma dúvida que o cliente tem.
            Quando você responde bem, a <strong className="gold-text">venda acontece</strong>!
          </p>
        </div>

        {[
          { objecao: 'É MUITO CARO', resposta: 'Quanto você perde por mês sem controle de estoque? E com cliente que não paga? Some tudo. Aposto que é MUITO mais que o sistema!', frase: 'O sistema não é GASTO. É INVESTIMENTO que se paga em 3 meses!' },
          { objecao: 'JÁ TENHO UM SISTEMA', resposta: 'Ótimo! Me conta: o que você mais gosta nele? E o que te incomoda?', frase: 'A gente não quer que você troque por trocar. Queremos que você tenha o MELHOR.' },
          { objecao: 'NÃO ENTENDO DE COMPUTADOR', resposta: 'Você sabe usar WhatsApp? Então sabe usar nosso sistema! E damos treinamento COMPLETO.', frase: 'Nosso sistema foi feito para pessoas comuns, não para engenheiros da NASA!' },
          { objecao: 'MEU NEGÓCIO É PEQUENO', resposta: 'Negócio pequeno é o que MAIS precisa! Você faz tudo sozinho. O sistema é seu ajudante 24h!', frase: 'Negócio pequeno que se organiza, VIRA negócio grande!' },
          { objecao: 'VOU PENSAR', resposta: 'Claro! Mas me ajuda: o que exatamente você precisa pensar? É o preço, as funções ou outra coisa?', frase: 'Enquanto você pensa, seu concorrente age. Vamos resolver suas dúvidas agora?' },
          { objecao: 'PRECISO FALAR COM MEU SÓCIO', resposta: 'Perfeito! Podemos marcar uma apresentação com os dois?', frase: 'Nunca deixe o cliente "levar a ideia" pro sócio. Marque reunião com os dois!' },
          { objecao: 'SISTEMA É COMPLICADO', resposta: 'Posso te mostrar em 5 minutos? Mais fácil que WhatsApp!', frase: 'Se seu filho de 12 anos consegue usar, você também consegue!' },
          { objecao: 'E SE DER PROBLEMA?', resposta: 'Temos suporte WhatsApp! Respondemos em minutos. E seus dados ficam na nuvem, sempre seguros.', frase: 'Seus dados ficam na NUVEM. Pode pegar fogo na loja que continua lá!' },
        ].map((item, idx) => (
          <div key={idx} className="glass p-5">
            <h4 className="text-red-400 font-semibold mb-3">💬 "{item.objecao}"</h4>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-3">
              <p className="text-[var(--gray)]">
                <span className="text-green-400 font-semibold">VOCÊ:</span> "{item.resposta}"
              </p>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-3">
              <p className="text-[var(--gray)] text-sm italic">📝 FRASE MATADORA: "{item.frase}"</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  'mod3-1': {
    titulo: 'Abordagem pelo WhatsApp',
    modulo: 'Vendas Digitais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">O Poder do WhatsApp nas Vendas</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O WhatsApp é a ferramenta de vendas <strong className="text-white">mais poderosa do Brasil</strong>.
            Mais de 99% dos smartphones têm o app instalado. Dominar a abordagem pelo WhatsApp vai multiplicar suas vendas!
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-semibold mb-2">📊 Estatística:</p>
            <p className="text-[var(--gray)]">
              Mensagens de WhatsApp têm taxa de abertura de <strong className="text-white">98%</strong>,
              contra 20% do e-mail. Use isso a seu favor!
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Regras de Ouro do WhatsApp</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-green-400 font-semibold">O que FAZER:</p>
              {[
                { regra: 'Seja objetivo', dica: 'Ninguém gosta de textão. Vá direto ao ponto.' },
                { regra: 'Áudios curtos', dica: 'Máximo 1 minuto. Ideal: 30 segundos.' },
                { regra: 'Responda rápido', dica: 'Máximo 1 hora. Ideal: 15 minutos.' },
                { regra: 'Personalize', dica: 'Use o nome da pessoa e do negócio.' },
                { regra: 'Horário comercial', dica: '8h às 19h de segunda a sábado.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <span className="text-white font-semibold">{item.regra}</span>
                  <p className="text-[var(--gray)] text-sm">{item.dica}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-red-400 font-semibold">O que NÃO fazer:</p>
              {[
                { regra: 'Mensagens de madrugada', dica: 'Parece spam e irrita.' },
                { regra: 'Ser insistente demais', dica: 'Máximo 3 follow-ups.' },
                { regra: 'Mandar áudio longo', dica: 'Ninguém ouve áudio de 5 min.' },
                { regra: 'Pedir resposta urgente', dica: '"Preciso de resposta HOJE!" afasta.' },
                { regra: 'Grupos sem permissão', dica: 'Nunca adicione em grupos.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <span className="text-white font-semibold">{item.regra}</span>
                  <p className="text-[var(--gray)] text-sm">{item.dica}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📱 Script de Primeiro Contato (Frio)</h3>
          <p className="text-[var(--gray)] mb-4">Para leads que você encontrou nas redes sociais ou indicação:</p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-blue-500/20 pb-3">
              <p className="text-blue-400 text-sm mb-1">Mensagem 1 - Abertura:</p>
              <p className="text-white font-mono text-sm">
                Olá [NOME]! Tudo bem? 👋<br /><br />
                Sou [SEU NOME], da Império Sistemas. Vi que você tem o [NOME DO NEGÓCIO] e queria te mostrar algo que pode facilitar MUITO sua gestão!<br /><br />
                Posso te mandar um vídeo de 2 minutinhos? 📱
              </p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-3">
              <p className="text-green-400 text-sm mb-1">💡 Por que funciona:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Cumprimento casual gera conexão</li>
                <li>• Mencionar o nome do negócio mostra que não é spam</li>
                <li>• Pedir permissão para mandar vídeo é menos invasivo</li>
                <li>• "2 minutinhos" reduz a resistência</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📱 Script para Lead Quente</h3>
          <p className="text-[var(--gray)] mb-4">Para leads que vieram de anúncios ou pediram informação:</p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-green-500/20 pb-3">
              <p className="text-green-400 text-sm mb-1">Mensagem 1 - Resposta rápida:</p>
              <p className="text-white font-mono text-sm">
                Oi [NOME]! Aqui é o [SEU NOME] 😊<br /><br />
                Vi que você se interessou pelo Império Sistemas! Que legal!<br /><br />
                Me conta: qual o seu tipo de negócio? Assim eu te explico exatamente como o sistema pode te ajudar! 🚀
              </p>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-3">
              <p className="text-purple-400 text-sm mb-1">⚡ Velocidade é tudo:</p>
              <p className="text-[var(--gray)] text-sm">
                Lead quente que não é respondido em <strong className="text-white">5 minutos</strong> esfria 80%.
                Configure notificações e responda IMEDIATAMENTE!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📱 Scripts de Follow-Up</h3>
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Follow-up 1 (24h depois):</p>
              <p className="text-white font-mono text-sm">
                Oi [NOME]! 😊<br /><br />
                Mandei uma mensagem ontem sobre o sistema de gestão.<br /><br />
                Sei que você deve estar corrido, mas queria só 2 minutinhos pra te mostrar algo que pode economizar HORAS do seu dia!<br /><br />
                Posso te ligar rapidinho?
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">Follow-up 2 (3 dias depois):</p>
              <p className="text-white font-mono text-sm">
                Oi [NOME]! Última tentativa aqui 😅<br /><br />
                Só queria ter certeza que você viu minha mensagem sobre o sistema.<br /><br />
                Se não for o momento certo, sem problemas! Só me avisa e não te incomodo mais. 👍
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">⚠️ Regra do 3:</p>
              <p className="text-[var(--gray)]">
                Máximo <strong className="text-white">3 follow-ups</strong> sem resposta. Depois disso, espere 30 dias para tentar novamente.
                Insistência demais queima o lead!
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🎤 Quando Usar Áudio vs Texto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Use ÁUDIO quando:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Explicar algo complexo</li>
                <li>• Criar conexão emocional</li>
                <li>• Responder muitas perguntas</li>
                <li>• Mostrar entusiasmo</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">Use TEXTO quando:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Primeiro contato</li>
                <li>• Informações objetivas (preço, link)</li>
                <li>• Lead está ocupado</li>
                <li>• Confirmar agendamento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📋 Organização de Contatos</h3>
          <div className="space-y-3">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-cyan-400 font-semibold mb-2">📇 Formato de salvamento:</p>
              <p className="text-white font-mono">[NOME] - [TIPO NEGÓCIO] - [CIDADE]</p>
              <p className="text-[var(--gray)] text-sm mt-2">Exemplo: "João - Pet Shop - Centro"</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">🏷️ Use etiquetas no WhatsApp Business:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['🟢 Novo Lead', '🟡 Em negociação', '🔴 Sem resposta', '🔵 Cliente ativo', '⚪ Perdido'].map((tag, idx) => (
                  <span key={idx} className="bg-white/10 px-2 py-1 rounded text-sm text-[var(--gray)]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TÉCNICA DO STATUS</h4>
              <p className="text-[var(--gray)] mb-3">
                Poste no seu status do WhatsApp! Seus contatos veem automaticamente.
              </p>
              <ul className="text-[var(--gray)] space-y-1">
                <li>• Depoimentos de clientes</li>
                <li>• Dicas rápidas para comerciantes</li>
                <li>• Bastidores do seu dia</li>
                <li>• Promoções exclusivas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-1': {
    titulo: 'TikTok Ads - Introdução Completa',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Por que TikTok Ads é a Melhor Escolha em 2024?</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O TikTok Ads é atualmente a <strong className="text-white">plataforma mais barata e eficiente</strong> para anunciar.
            Enquanto Meta e Google estão saturados, o TikTok ainda oferece CPM baixo e alta conversão!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { metrica: 'CPM Médio', tiktok: 'R$8-15', meta: 'R$25-40', melhor: true },
              { metrica: 'CTR Médio', tiktok: '1.5-3%', meta: '0.8-1.5%', melhor: true },
              { metrica: 'Custo por Lead', tiktok: 'R$5-15', meta: 'R$15-40', melhor: true },
              { metrica: 'Concorrência', tiktok: 'Baixa', meta: 'Alta', melhor: true },
            ].map((item, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-[var(--gray)] text-xs">{item.metrica}</p>
                <p className="text-green-400 font-bold">{item.tiktok}</p>
                <p className="text-[var(--gray)] text-xs">vs {item.meta} (Meta)</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📋 Passo a Passo: Criando sua Conta</h3>
          <div className="space-y-4">
            {[
              { passo: 1, titulo: 'Acesse o TikTok Business Center', desc: 'Vá em ads.tiktok.com e clique em "Criar Conta"', dica: 'Use e-mail profissional, não pessoal' },
              { passo: 2, titulo: 'Preencha dados da empresa', desc: 'Nome da empresa, CNPJ (opcional), endereço comercial', dica: 'Pode usar CPF se for MEI' },
              { passo: 3, titulo: 'Configure método de pagamento', desc: 'Cartão de crédito ou boleto (mínimo R$100)', dica: 'Cartão libera mais rápido' },
              { passo: 4, titulo: 'Verifique sua conta', desc: 'TikTok pode pedir documento de verificação', dica: 'Responda rápido para não atrasar' },
              { passo: 5, titulo: 'Instale o Pixel', desc: 'Código que rastreia visitantes do seu site/landing page', dica: 'Essencial para remarketing!' },
            ].map((item) => (
              <div key={item.passo} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
                  {item.passo}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{item.titulo}</p>
                  <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                  <p className="text-blue-400 text-xs mt-1">💡 {item.dica}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">💰 Investimento: Quanto Gastar?</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                <p className="text-yellow-400 text-sm font-semibold">INICIANTE</p>
                <p className="text-2xl font-bold text-white">R$50</p>
                <p className="text-[var(--gray)] text-xs">por dia</p>
                <p className="text-yellow-400 text-xs mt-2">R$1.500/mês</p>
              </div>
              <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4 text-center">
                <p className="text-green-400 text-sm font-semibold">RECOMENDADO</p>
                <p className="text-2xl font-bold text-white">R$100</p>
                <p className="text-[var(--gray)] text-xs">por dia</p>
                <p className="text-green-400 text-xs mt-2">R$3.000/mês</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                <p className="text-purple-400 text-sm font-semibold">AGRESSIVO</p>
                <p className="text-2xl font-bold text-white">R$200+</p>
                <p className="text-[var(--gray)] text-xs">por dia</p>
                <p className="text-purple-400 text-xs mt-2">R$6.000+/mês</p>
              </div>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
              <p className="text-[var(--gold)] font-semibold mb-2">📊 ROI Esperado:</p>
              <p className="text-[var(--gray)]">
                Com R$3.000/mês bem investidos, você deve gerar <strong className="text-white">15-30 leads qualificados</strong>.
                Se converter 20% (3-6 vendas) a R$1.200 cada = <strong className="text-green-400">R$3.600 a R$7.200 de retorno</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🎬 Como Criar Vídeos que VENDEM</h3>
          <p className="text-[var(--gray)] mb-4">O segredo do TikTok: parecer orgânico, não propaganda!</p>
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">✅ O que FUNCIONA:</p>
              <ul className="text-[var(--gray)] space-y-1 text-sm">
                <li>• Você falando direto pra câmera (celular na mão)</li>
                <li>• Vídeo na vertical (9:16)</li>
                <li>• Primeiros 3 segundos impactantes (gancho forte)</li>
                <li>• Áudio original ou trends do momento</li>
                <li>• Legendas grandes e coloridas</li>
                <li>• Duração de 15-45 segundos</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2">❌ O que NÃO funciona:</p>
              <ul className="text-[var(--gray)] space-y-1 text-sm">
                <li>• Vídeo horizontal (parece comercial de TV)</li>
                <li>• Logo grande na tela toda</li>
                <li>• Vídeo muito produzido (estúdio, iluminação profissional)</li>
                <li>• Música genérica de banco de áudio</li>
                <li>• "Compre agora!" nos primeiros segundos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📝 3 Scripts de Anúncio Prontos</h3>
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">Script 1: "A Revelação" (15 seg)</p>
              <p className="text-white italic text-sm">
                "Você sabia que 70% dos donos de loja NÃO sabem se estão tendo lucro ou prejuízo?
                [pausa dramática] Eu descobri um sistema que mostra seu lucro em TEMPO REAL.
                Quer ver? Link na bio!"
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">Script 2: "O Problema" (20 seg)</p>
              <p className="text-white italic text-sm">
                "Se você tem loja e ainda anota venda em caderninho... [cara de preocupado]
                Deixa eu te mostrar o que acontece: cliente some, você esquece, dinheiro perdido.
                Tem um jeito muito mais fácil. Me chama que eu te mostro!"
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Script 3: "Prova Social" (25 seg)</p>
              <p className="text-white italic text-sm">
                "Esse cliente me mandou mensagem ontem: 'Cara, o sistema já se pagou no primeiro mês!'
                [mostra print] Ele tinha uma loja de roupa e perdia venda porque não sabia o que tinha em estoque.
                Quer o mesmo resultado? Me chama!"
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Métricas: O Que Monitorar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong> (taxa de clique)</td>
                  <td className="text-center">&lt;0.5%</td>
                  <td className="text-center">0.5-1.5%</td>
                  <td className="text-center">&gt;1.5%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong> (custo por clique)</td>
                  <td className="text-center">&gt;R$3</td>
                  <td className="text-center">R$1-3</td>
                  <td className="text-center">&lt;R$1</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPL</strong> (custo por lead)</td>
                  <td className="text-center">&gt;R$30</td>
                  <td className="text-center">R$15-30</td>
                  <td className="text-center">&lt;R$15</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Taxa de Conversão</strong></td>
                  <td className="text-center">&lt;1%</td>
                  <td className="text-center">1-3%</td>
                  <td className="text-center">&gt;3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ 7 Erros Fatais de Iniciantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { erro: 'Mexer na campanha todo dia', fix: 'Espere 7 dias antes de otimizar' },
              { erro: 'Orçamento muito baixo (R$20/dia)', fix: 'Mínimo R$50/dia para ter dados' },
              { erro: 'Um único criativo', fix: 'Teste 3-5 vídeos diferentes' },
              { erro: 'Público muito amplo', fix: 'Segmente por interesse + localização' },
              { erro: 'Não instalar o Pixel', fix: 'Pixel é obrigatório para remarketing' },
              { erro: 'Desistir em 3 dias', fix: 'Algoritmo precisa de 7 dias para aprender' },
              { erro: 'Copiar anúncio do concorrente', fix: 'Inspire-se, mas crie original' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm font-semibold">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Checklist Antes de Publicar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Vídeo na vertical (9:16)',
              'Primeiros 3 seg com gancho forte',
              'Legendas visíveis e grandes',
              'CTA claro (link na bio, me chama)',
              'Duração entre 15-45 segundos',
              'Pixel instalado no destino',
              'Público segmentado corretamente',
              'Orçamento mínimo de R$50/dia',
              'Landing page funcionando',
              'WhatsApp pronto para atender',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                <span className="text-green-400">☐</span>
                <span className="text-[var(--gray)] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA MATADORA</h4>
              <p className="text-[var(--gray)]">
                Grave <strong className="text-white">5 vídeos diferentes</strong> no mesmo dia (troque roupa entre eles).
                Suba todos como anúncios separados. Depois de 7 dias, <strong className="text-white">pause os piores e escale o melhor</strong>.
                Essa técnica chama "Creative Testing" e é usada por todas as grandes empresas!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-1': {
    titulo: 'TikTok Orgânico - Guia Completo',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Por que TikTok Orgânico é OURO?</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O TikTok é a <strong className="text-white">única rede social que ainda entrega alcance GRÁTIS</strong> para contas novas.
            Um vídeo bem feito pode alcançar milhares de pessoas sem gastar 1 centavo!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">0</p>
              <p className="text-[var(--gray)] text-xs">Custo de alcance</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">1B+</p>
              <p className="text-[var(--gray)] text-xs">Usuários ativos</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">52min</p>
              <p className="text-[var(--gray)] text-xs">Tempo médio/dia</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🎬 10 Scripts de Vídeos Prontos</h3>
          <p className="text-[var(--gray)] mb-4">Copie e grave! Cada script dura 15-30 segundos:</p>
          <div className="space-y-3">
            {[
              { num: 1, titulo: 'O Choque', script: '"70% dos donos de loja NÃO sabem quanto lucraram esse mês. [pausa] Você é um deles? Me conta nos comentários!"', gancho: 'Estatística impactante' },
              { num: 2, titulo: 'A Pergunta', script: '"Você ainda anota venda no caderninho? [faz cara de preocupado] Deixa eu te mostrar o que pode acontecer..."', gancho: 'Pergunta direta' },
              { num: 3, titulo: 'Antes e Depois', script: '"ANTES: 2 horas fazendo fechamento de caixa. DEPOIS: 2 cliques. Quer saber como?"', gancho: 'Transformação' },
              { num: 4, titulo: 'O Erro', script: '"O maior erro que vejo donos de loja cometendo... [pausa dramática] ...é não saber o que tem em estoque!"', gancho: 'Curiosidade' },
              { num: 5, titulo: 'A História', script: '"Ontem um cliente me ligou chorando. Descobriu que perdeu R$3.000 em produtos vencidos. Não seja ele!"', gancho: 'Storytelling' },
              { num: 6, titulo: 'O Segredo', script: '"Vou te contar o segredo das lojas que sempre têm o produto que você precisa... [mostra o sistema]"', gancho: 'Exclusividade' },
              { num: 7, titulo: 'A Comparação', script: '"Planilha de Excel vs Sistema de Gestão. [mostra os dois] Qual você acha que funciona melhor?"', gancho: 'Versus' },
              { num: 8, titulo: 'O Tutorial', script: '"Como emitir nota fiscal em 10 segundos: passo 1, passo 2, pronto! Simples assim."', gancho: 'Educativo' },
              { num: 9, titulo: 'A Prova', script: '"[mostra print] Esse cliente me mandou isso ontem: O sistema já se pagou! Quer o mesmo?"', gancho: 'Prova social' },
              { num: 10, titulo: 'O Medo', script: '"Sabia que a multa por não emitir nota pode chegar a R$50.000? [cara assustada] Me chama que eu te ajudo a evitar!"', gancho: 'Urgência' },
            ].map((item) => (
              <div key={item.num} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{item.num} {item.titulo}</span>
                  <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">{item.gancho}</span>
                </div>
                <p className="text-white italic text-sm">{item.script}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📅 Calendário Semanal de Conteúdo</h3>
          <div className="space-y-2">
            {[
              { dia: 'Segunda', tipo: 'Dica Prática', exemplo: 'Como organizar estoque em 5 passos', cor: 'blue' },
              { dia: 'Terça', tipo: 'Dor do Cliente', exemplo: 'Você sabe seu lucro real?', cor: 'red' },
              { dia: 'Quarta', tipo: 'Bastidores', exemplo: 'Dia de implantação no cliente', cor: 'green' },
              { dia: 'Quinta', tipo: 'Depoimento/Prova', exemplo: 'Cliente contando resultado', cor: 'yellow' },
              { dia: 'Sexta', tipo: 'Tutorial Rápido', exemplo: 'Como emitir nota em 10 seg', cor: 'purple' },
              { dia: 'Sábado', tipo: 'Trend/Meme', exemplo: 'Áudio viral + sua mensagem', cor: 'pink' },
            ].map((item) => (
              <div key={item.dia} className={`bg-${item.cor}-500/10 border border-${item.cor}-500/30 rounded-lg p-3 flex justify-between items-center`}>
                <div>
                  <span className="text-white font-semibold">{item.dia}</span>
                  <span className={`text-${item.cor}-400 ml-2`}>• {item.tipo}</span>
                </div>
                <span className="text-[var(--gray)] text-sm">{item.exemplo}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🚀 Como Começar do ZERO (Para Tímidos)</h3>
          <p className="text-[var(--gray)] mb-4">Não quer aparecer? Sem problema! Alternativas que funcionam:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { metodo: 'Gravação de Tela', desc: 'Mostre o sistema funcionando com narração', dificuldade: 'Fácil' },
              { metodo: 'Texto na Tela', desc: 'Frases animadas com música viral', dificuldade: 'Muito Fácil' },
              { metodo: 'Mãos apenas', desc: 'Filme suas mãos usando o sistema', dificuldade: 'Fácil' },
              { metodo: 'Voz + B-roll', desc: 'Sua voz narrando sobre imagens', dificuldade: 'Médio' },
              { metodo: 'Avatar IA', desc: 'Use ferramentas como HeyGen', dificuldade: 'Médio' },
              { metodo: 'Aparecer aos poucos', desc: 'Comece de costas, depois perfil, depois frente', dificuldade: 'Progressivo' },
            ].map((item, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-400 font-semibold">{item.metodo}</span>
                  <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded">{item.dificuldade}</span>
                </div>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">⏰ Melhores Horários para Postar</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-orange-400 font-semibold">📱 Dias de Semana:</p>
              {[
                { horario: '07:00 - 08:00', motivo: 'Pessoas acordando' },
                { horario: '12:00 - 13:00', motivo: 'Hora do almoço' },
                { horario: '18:00 - 21:00', motivo: 'Pós-trabalho (MELHOR!)' },
              ].map((item, idx) => (
                <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2">
                  <span className="text-white font-mono">{item.horario}</span>
                  <span className="text-[var(--gray)] text-xs ml-2">{item.motivo}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-purple-400 font-semibold">📱 Fins de Semana:</p>
              {[
                { horario: '10:00 - 12:00', motivo: 'Manhã relaxada' },
                { horario: '15:00 - 17:00', motivo: 'Tarde de sábado' },
                { horario: '20:00 - 22:00', motivo: 'Domingo à noite' },
              ].map((item, idx) => (
                <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2">
                  <span className="text-white font-mono">{item.horario}</span>
                  <span className="text-[var(--gray)] text-xs ml-2">{item.motivo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">🏷️ Hashtags Estratégicas</h3>
          <div className="space-y-3">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">Hashtags de Nicho (use sempre):</p>
              <div className="flex flex-wrap gap-2">
                {['#gestaoempresarial', '#donodeloja', '#comerciante', '#lojista', '#sistemadegestao', '#pdv', '#controledeestoque'].map(tag => (
                  <span key={tag} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-green-400 font-semibold mb-2">Hashtags de Alcance (alterne):</p>
              <div className="flex flex-wrap gap-2">
                {['#empreendedorismo', '#negocios', '#vendas', '#dinheiro', '#sucesso', '#motivacao', '#trabalho'].map(tag => (
                  <span key={tag} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-purple-400 font-semibold mb-2">Hashtags Locais (se atender região):</p>
              <div className="flex flex-wrap gap-2">
                {['#[suacidade]', '#[seuEstado]', '#comerciolocal', '#apoielocal'].map(tag => (
                  <span key={tag} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">📊 Métricas: O Que Acompanhar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-[var(--gray)] py-2">O que significa</th>
                  <th className="text-center text-green-400 py-2">Meta</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Views</strong></td>
                  <td className="text-center">Quantos viram seu vídeo</td>
                  <td className="text-center text-green-400">500+ por vídeo</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Taxa de Conclusão</strong></td>
                  <td className="text-center">% que assistiu até o fim</td>
                  <td className="text-center text-green-400">&gt;30%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Compartilhamentos</strong></td>
                  <td className="text-center">Quantos enviaram pra alguém</td>
                  <td className="text-center text-green-400">5+ por vídeo</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Comentários</strong></td>
                  <td className="text-center">Engajamento real</td>
                  <td className="text-center text-green-400">10+ por vídeo</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Cliques no Perfil</strong></td>
                  <td className="text-center">Interesse em saber mais</td>
                  <td className="text-center text-green-400">2% das views</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">🛠️ Ferramentas Gratuitas de Edição</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { nome: 'CapCut', uso: 'Edição completa de vídeo', destaque: 'Legendas automáticas!' },
              { nome: 'Canva', uso: 'Thumbnails e artes', destaque: 'Templates prontos' },
              { nome: 'InShot', uso: 'Edição rápida no celular', destaque: 'Super simples' },
              { nome: 'CapCut PC', uso: 'Versão desktop gratuita', destaque: 'Mais recursos' },
            ].map((item, idx) => (
              <div key={idx} className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                <p className="text-pink-400 font-semibold">{item.nome}</p>
                <p className="text-[var(--gray)] text-sm">{item.uso}</p>
                <p className="text-green-400 text-xs mt-1">⭐ {item.destaque}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA DE VIRALIZAÇÃO</h4>
              <p className="text-[var(--gray)] mb-3">
                O algoritmo do TikTok ama <strong className="text-white">consistência + interação</strong>. Faça isso:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. Poste <strong className="text-white">5 vídeos por semana</strong> no mínimo</li>
                <li>2. Responda <strong className="text-white">TODOS</strong> os comentários nas primeiras 2 horas</li>
                <li>3. Faça <strong className="text-white">duetos</strong> com vídeos virais do seu nicho</li>
                <li>4. Use <strong className="text-white">áudios em alta</strong> (veja aba "Tendências")</li>
                <li>5. Nos primeiros 3 segundos, <strong className="text-white">prenda a atenção</strong> ou perde o viewer</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod1-5': {
    titulo: 'Ramos de Negócio Atendidos',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Onde o Império Sistemas se Encaixa?</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            O sistema foi desenvolvido para atender <strong className="text-white">qualquer negócio que venda produtos</strong>.
            Quanto mais você conhecer os segmentos, mais fácil será <strong className="text-white">falar a língua do cliente</strong>!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🛒 Varejo em Geral</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Mercadinhos', 'Mercearias', 'Minimercados', 'Conveniências', 'Padarias', 'Açougues', 'Hortifrútis', 'Empórios'].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Dor principal: controle de estoque e validade dos produtos</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">👕 Moda e Vestuário</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Lojas de roupas', 'Boutiques', 'Lojas de calçados', 'Acessórios', 'Moda infantil', 'Moda plus size', 'Brechós', 'Uniformes'].map(item => (
              <div key={item} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Dor principal: controle de tamanhos, cores e variações</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🔧 Materiais e Construção</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Materiais de construção', 'Ferragens', 'Tintas', 'Elétrica', 'Hidráulica', 'Ferramentas', 'Madeireiras', 'Vidraçarias'].map(item => (
              <div key={item} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Dor principal: milhares de SKUs e orçamentos complexos</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🐕 Pet Shops e Agro</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Pet shops', 'Agropecuárias', 'Casas agrícolas', 'Rações', 'Aquários', 'Clínicas veterinárias'].map(item => (
              <div key={item} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Dor principal: controle de banho/tosa e fichas de animais</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">💄 Beleza e Cosméticos</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Perfumarias', 'Cosméticos', 'Salões de beleza', 'Barbearias', 'Esmalterias', 'Produtos naturais'].map(item => (
              <div key={item} className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Dor principal: programa de fidelidade e controle de validade</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📱 Outros Segmentos</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Papelarias', 'Livrarias', 'Óticas', 'Farmácias', 'Autopeças', 'Bicicletarias', 'Sex shops', 'Tabacarias', 'Lojas de presentes', 'Artesanato', 'Brinquedos', 'Eletrônicos'].map(item => (
              <div key={item} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">DICA DE ABORDAGEM</h4>
              <p className="text-[var(--gray)]">
                Quando visitar um bairro, <strong className="text-white">mapeie todos os comércios</strong> da região.
                Cada tipo de negócio tem suas dores específicas. Use isso a seu favor!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod1-6': {
    titulo: 'Glossário de Termos',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <p className="text-[var(--gray)] text-lg">
            Conhecer os termos técnicos te dá <strong className="text-white">autoridade</strong> na hora de vender.
            O cliente percebe que você <strong className="gold-text">entende do assunto</strong>!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">💻 Termos de Sistema</h3>
          <div className="space-y-4">
            {[
              { termo: 'PDV', def: 'Ponto de Venda - a tela onde registra as vendas (o "caixa")' },
              { termo: 'ERP', def: 'Sistema que integra todas as áreas da empresa (estoque, vendas, financeiro)' },
              { termo: 'Dashboard', def: 'Painel com gráficos e números importantes do negócio' },
              { termo: 'Backup', def: 'Cópia de segurança dos dados (nosso é automático na nuvem!)' },
              { termo: 'Nuvem/Cloud', def: 'Dados ficam na internet, não no computador. Acessa de qualquer lugar!' },
              { termo: 'SKU', def: 'Código único de cada produto (ex: CAM-AZL-M = Camisa Azul Média)' },
            ].map(item => (
              <div key={item.termo} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-bold">{item.termo}</span>
                <p className="text-[var(--gray)] mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🧾 Termos Fiscais</h3>
          <div className="space-y-4">
            {[
              { termo: 'NFC-e', def: 'Nota Fiscal do Consumidor Eletrônica - o cupom fiscal digital' },
              { termo: 'NF-e', def: 'Nota Fiscal Eletrônica - para vendas maiores ou entre empresas' },
              { termo: 'SEFAZ', def: 'Secretaria da Fazenda - órgão do governo que recebe as notas' },
              { termo: 'Certificado Digital A1', def: 'Arquivo que identifica a empresa (como um CPF digital)' },
              { termo: 'CFOP', def: 'Código que diz o tipo de operação (venda, devolução, etc)' },
              { termo: 'NCM', def: 'Código do produto para fins de impostos' },
            ].map(item => (
              <div key={item.termo} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-bold">{item.termo}</span>
                <p className="text-[var(--gray)] mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">💰 Termos Financeiros</h3>
          <div className="space-y-4">
            {[
              { termo: 'Fluxo de Caixa', def: 'Controle de todo dinheiro que entra e sai' },
              { termo: 'Contas a Pagar', def: 'O que a empresa deve para fornecedores' },
              { termo: 'Contas a Receber', def: 'O que os clientes devem para a empresa (crediário)' },
              { termo: 'Margem de Lucro', def: 'Quanto sobra depois de pagar o custo do produto' },
              { termo: 'Ticket Médio', def: 'Valor médio de cada venda' },
              { termo: 'CMV', def: 'Custo da Mercadoria Vendida - quanto custou o que você vendeu' },
            ].map(item => (
              <div key={item.termo} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-bold">{item.termo}</span>
                <p className="text-[var(--gray)] mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">COMO USAR</h4>
              <p className="text-[var(--gray)]">
                Não precisa decorar tudo! Use esses termos <strong className="text-white">naturalmente</strong> na conversa.
                Se o cliente não entender, explique de forma simples. Isso gera <strong className="text-white">confiança</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod1-7': {
    titulo: 'FAQ - Perguntas Frequentes',
    modulo: 'Conhecendo o Império Sistemas',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <p className="text-[var(--gray)] text-lg">
            Essas são as perguntas que <strong className="text-white">mais aparecem</strong> durante as vendas.
            Decore as respostas e nunca mais fique sem saber o que dizer!
          </p>
        </div>

        {[
          {
            pergunta: 'Funciona sem internet?',
            resposta: 'O sistema precisa de internet para funcionar. Mas calma! Hoje em dia todo mundo tem internet, e se cair, você usa o 4G do celular como roteador. Seus dados ficam seguros na nuvem!',
            dica: 'Transforme em vantagem: "Com a nuvem, você acessa de qualquer lugar!"'
          },
          {
            pergunta: 'Posso usar no celular?',
            resposta: 'Sim! O sistema é 100% responsivo. Você pode consultar relatórios, ver estoque e acompanhar vendas pelo celular. Para o PDV, recomendamos computador ou tablet pela praticidade.',
            dica: 'Mostre no seu celular para impressionar!'
          },
          {
            pergunta: 'Quantos usuários posso ter?',
            resposta: 'ILIMITADOS! Pode cadastrar todos os funcionários, cada um com sua senha. E o melhor: você controla o que cada um pode acessar.',
            dica: 'Compare com concorrentes que cobram por usuário!'
          },
          {
            pergunta: 'E se eu precisar de suporte?',
            resposta: 'Temos suporte via WhatsApp em horário comercial. Respondemos rapidinho! E temos vídeos tutoriais para as dúvidas mais comuns.',
            dica: 'Enfatize que não é 0800 que deixa na espera!'
          },
          {
            pergunta: 'Consigo importar meus produtos?',
            resposta: 'Sim! Você pode importar sua lista de produtos via Excel. A gente ajuda no processo de migração sem custo adicional.',
            dica: 'Isso remove uma grande objeção de quem já tem produtos cadastrados!'
          },
          {
            pergunta: 'Emite nota fiscal?',
            resposta: 'Sim! Emitimos NFC-e (cupom fiscal) e NF-e (nota fiscal). Tudo integrado com a SEFAZ. Você só precisa ter o certificado digital A1.',
            dica: 'Muitos concorrentes cobram à parte pela emissão fiscal!'
          },
          {
            pergunta: 'Tem contrato de fidelidade?',
            resposta: 'NÃO! Você pode cancelar quando quiser, sem multa. A gente confia no nosso produto. Se você não gostar, pode sair. Simples assim.',
            dica: 'Isso mostra confiança e remove o medo do cliente!'
          },
          {
            pergunta: 'Posso testar antes?',
            resposta: 'Fazemos uma demonstração completa gratuita! Você vê o sistema funcionando antes de decidir. Sem compromisso.',
            dica: 'Sempre ofereça a demonstração - é sua chance de encantar!'
          },
        ].map((item, idx) => (
          <div key={idx} className="glass p-5">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              "{item.pergunta}"
            </h4>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-3">
              <p className="text-[var(--gray)]">{item.resposta}</p>
            </div>
            <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-3">
              <p className="text-[var(--gray)] text-sm">💡 <strong className="text-[var(--gold)]">Dica:</strong> {item.dica}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  'mod2-2': {
    titulo: 'Abordagem e Primeira Impressão',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Os 7 Segundos Decisivos</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Estudos mostram que formamos uma impressão sobre alguém em apenas <strong className="text-white">7 segundos</strong>.
            Se você errar na abordagem, vai passar o resto da conversa tentando reverter uma imagem negativa!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ O Que Fazer</h3>
          <div className="space-y-3">
            {[
              { acao: 'Sorriso genuíno', desc: 'Não forçado! Pense em algo que te deixa feliz antes de entrar.' },
              { acao: 'Contato visual', desc: 'Olhe nos olhos, mas sem intimidar. Natural.' },
              { acao: 'Postura ereta', desc: 'Ombros para trás, cabeça erguida. Transmite confiança.' },
              { acao: 'Aperto de mão firme', desc: 'Nem mole demais (insegurança) nem forte demais (agressividade).' },
              { acao: 'Vista-se adequadamente', desc: 'Roupa social casual. Limpa e passada. Nada extravagante.' },
              { acao: 'Chegue no horário certo', desc: 'Não muito cedo (atrapalha), não atrasado (desrespeito).' },
            ].map(item => (
              <div key={item.acao} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-semibold">{item.acao}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">❌ O Que NÃO Fazer</h3>
          <div className="space-y-3">
            {[
              'Chegar mascando chiclete',
              'Ficar olhando o celular',
              'Interromper o cliente se ele estiver ocupado',
              'Falar mal da concorrência logo de cara',
              'Começar vendendo antes de se apresentar',
              'Usar perfume forte demais',
            ].map(item => (
              <div key={item} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">❌ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📝 Script de Abertura</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
            <p className="text-white italic">
              "Bom dia! Tudo bem? Sou o [SEU NOME], da Império Sistemas.
              Vi que você tem um [TIPO DE NEGÓCIO] muito bonito aqui!
              Posso tomar 5 minutinhos do seu tempo?
              Prometo que vai valer a pena!"
            </p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TÉCNICA AVANÇADA</h4>
              <p className="text-[var(--gray)]">
                Antes de entrar, observe o estabelecimento. Encontre algo para <strong className="text-white">elogiar genuinamente</strong>:
                a organização, um produto interessante, a decoração. Isso quebra o gelo instantaneamente!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-3': {
    titulo: 'Sondagem: Descobrindo as Dores',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">A Regra de Ouro: 70/30</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Na sondagem, o <strong className="text-white">cliente fala 70%</strong> do tempo e você fala 30%.
            Seu trabalho é fazer perguntas inteligentes e <strong className="text-white">ouvir com atenção</strong>!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Perguntas Poderosas</h3>
          <p className="text-[var(--gray)] mb-4">Use estas perguntas para descobrir as dores do cliente:</p>
          <div className="space-y-3">
            {[
              { categoria: 'Estoque', perguntas: ['Como você controla seu estoque hoje?', 'Já aconteceu de perder venda porque o produto tinha acabado?', 'Quanto tempo você gasta fazendo inventário?'] },
              { categoria: 'Financeiro', perguntas: ['Você sabe exatamente quanto lucrou esse mês?', 'Como você controla as contas a pagar?', 'Já esqueceu de pagar alguma conta e pagou juros?'] },
              { categoria: 'Crediário', perguntas: ['Você vende fiado? Como controla isso?', 'Já teve cliente que "esqueceu" de pagar?', 'Quanto você tem para receber hoje que nem sabe?'] },
              { categoria: 'Fiscal', perguntas: ['Você emite nota fiscal em todas as vendas?', 'Sabe que a multa por não emitir pode chegar a R$50.000?', 'Seu contador reclama da desorganização?'] },
            ].map(cat => (
              <div key={cat.categoria} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{cat.categoria}</span>
                <ul className="mt-2 space-y-1">
                  {cat.perguntas.map((p, i) => (
                    <li key={i} className="text-[var(--gray)] text-sm">• "{p}"</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">👂 Técnicas de Escuta Ativa</h3>
          <div className="space-y-3">
            {[
              { tecnica: 'Acenar com a cabeça', desc: 'Mostra que você está acompanhando' },
              { tecnica: 'Repetir palavras-chave', desc: '"Então você disse que perde vendas por falta de produto..."' },
              { tecnica: 'Fazer anotações', desc: 'Anote os problemas que ele menciona. Vai usar depois!' },
              { tecnica: 'Perguntar "me conta mais"', desc: 'Aprofunde quando ele tocar em uma dor' },
              { tecnica: 'Não interromper', desc: 'Deixe ele desabafar. Quanto mais falar, mais problemas revela!' },
            ].map(item => (
              <div key={item.tecnica} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-semibold">{item.tecnica}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🔥 A Pergunta de Impacto</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-white italic text-lg">
              "Se eu pudesse resolver [DOR QUE ELE MENCIONOU] de forma simples e com um investimento que cabe no seu bolso...
              você teria interesse em conhecer?"
            </p>
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">
            Se ele disser SIM, você tem permissão para apresentar a solução!
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">SEGREDO DOS TOP VENDEDORES</h4>
              <p className="text-[var(--gray)]">
                Anote <strong className="text-white">exatamente</strong> as palavras que o cliente usa.
                Na hora de apresentar, use as <strong className="text-white">mesmas palavras</strong> dele.
                Isso cria conexão instantânea!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-4': {
    titulo: 'Apresentação e Demonstração',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">A Fórmula Mágica: DOR → SOLUÇÃO → BENEFÍCIO</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Nunca apresente funcionalidades soltas! Sempre conecte com a <strong className="text-white">dor que o cliente mencionou</strong>,
            mostre a solução e explique o benefício prático.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📝 Exemplos Práticos</h3>
          <div className="space-y-4">
            {[
              { dor: 'Perde vendas por falta de produto', solucao: 'Alerta de estoque mínimo', beneficio: 'Você recebe um aviso ANTES do produto acabar. Nunca mais perde venda!' },
              { dor: 'Não sabe se está tendo lucro', solucao: 'Dashboard com lucro em tempo real', beneficio: 'A qualquer momento você olha o celular e sabe exatamente quanto lucrou hoje.' },
              { dor: 'Tem cliente que não paga o fiado', solucao: 'Sistema de crediário com limite', beneficio: 'O sistema bloqueia automaticamente quem já deve muito. Chega de calote!' },
              { dor: 'Demora muito para fazer venda', solucao: 'PDV com código de barras', beneficio: 'Uma venda que levava 2 minutos agora leva 30 segundos. Fila anda rápido!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 space-y-2">
                <p className="text-red-400">😫 <strong>DOR:</strong> "{item.dor}"</p>
                <p className="text-blue-400">🔧 <strong>SOLUÇÃO:</strong> {item.solucao}</p>
                <p className="text-green-400">✨ <strong>BENEFÍCIO:</strong> "{item.beneficio}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">💻 Regras da Demonstração</h3>
          <div className="space-y-3">
            {[
              { regra: 'Deixe o cliente CLICAR', desc: 'Quando ele mexe, ele se imagina usando. A venda fica mais fácil!' },
              { regra: 'Mostre cenários REAIS', desc: 'Use exemplos do negócio dele: "Imagina você vendendo uma [produto que ele vende]..."' },
              { regra: 'Vá do simples ao complexo', desc: 'Comece pelo PDV (todo mundo entende), depois vá para relatórios.' },
              { regra: 'Não mostre TUDO', desc: 'Foque nas 3-4 funcionalidades que resolvem as dores que ele mencionou.' },
              { regra: 'Crie momentos "UAU"', desc: 'Relatórios bonitos, QR Code do PIX, recibo no WhatsApp. Impressione!' },
            ].map(item => (
              <div key={item.regra} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-semibold">{item.regra}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🎬 Roteiro de Demonstração (10 min)</h3>
          <ol className="space-y-3">
            {[
              { tempo: '0-2 min', acao: 'PDV - faça uma venda simulada com o cliente' },
              { tempo: '2-4 min', acao: 'Estoque - mostre como cadastrar e o alerta de mínimo' },
              { tempo: '4-6 min', acao: 'Relatórios - abra o dashboard com gráficos bonitos' },
              { tempo: '6-8 min', acao: 'Funcionalidade específica para a dor dele' },
              { tempo: '8-10 min', acao: 'Nota fiscal - mostre como é simples emitir' },
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-mono">{item.tempo}</span>
                <span className="text-[var(--gray)]">{item.acao}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TÉCNICA DO ESPELHO</h4>
              <p className="text-[var(--gray)]">
                Enquanto demonstra, <strong className="text-white">observe a reação do cliente</strong>.
                Quando ele arregalar os olhos ou soltar um "nossa!", pare ali e explore mais.
                Você achou o ponto de interesse dele!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-6': {
    titulo: 'Técnicas de Fechamento',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">O Momento da Verdade</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Muitos vendedores fazem tudo certo, mas <strong className="text-white">têm medo de pedir a venda</strong>.
            O fechamento é só a consequência natural de uma boa apresentação!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 5 Técnicas de Fechamento</h3>
          <div className="space-y-4">
            {[
              {
                nome: 'Fechamento por Alternativa',
                desc: 'Dê duas opções, ambas levam à venda',
                exemplo: '"Você prefere começar com pagamento à vista ou parcelado em 3x?"',
                quando: 'Cliente já demonstrou interesse'
              },
              {
                nome: 'Fechamento por Resumo',
                desc: 'Resuma os benefícios e peça a decisão',
                exemplo: '"Então, com o sistema você vai controlar estoque, emitir nota e saber seu lucro. Podemos começar a implantação essa semana?"',
                quando: 'Depois de uma boa demonstração'
              },
              {
                nome: 'Fechamento Direto',
                desc: 'Simplesmente peça a venda',
                exemplo: '"Vamos fechar?"',
                quando: 'Cliente deu sinais claros de que quer'
              },
              {
                nome: 'Fechamento por Urgência',
                desc: 'Crie senso de oportunidade',
                exemplo: '"Essa condição especial é só até sexta. Posso garantir pra você?"',
                quando: 'Quando há promoção real'
              },
              {
                nome: 'Fechamento por Medo da Perda',
                desc: 'Mostre o que ele perde ficando sem',
                exemplo: '"Enquanto você pensa, quanto está perdendo por não saber o lucro real? Em 3 meses, isso paga o sistema..."',
                quando: 'Cliente está em cima do muro'
              },
            ].map(item => (
              <div key={item.nome} className="bg-white/5 rounded-lg p-4 space-y-2">
                <h4 className="text-blue-400 font-semibold">{item.nome}</h4>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-white italic">"{item.exemplo}"</p>
                </div>
                <p className="text-[var(--gray)] text-xs">⏰ Quando usar: {item.quando}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Sinais de Compra</h3>
          <p className="text-[var(--gray)] mb-4">Quando o cliente faz isso, está pronto para comprar:</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              'Pergunta sobre formas de pagamento',
              'Pergunta sobre prazo de implantação',
              'Pergunta se pode adicionar mais usuários',
              'Começa a imaginar usando ("será que meu funcionário consegue usar?")',
              'Pede para ver alguma função de novo',
              'Fala com o sócio/esposa sobre o sistema',
            ].map(sinal => (
              <div key={sinal} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">✅ {sinal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Erros Fatais no Fechamento</h3>
          <div className="space-y-2">
            {[
              'Continuar apresentando depois que ele já disse sim',
              'Pedir desculpas pelo preço',
              'Ficar em silêncio constrangedor',
              'Não fazer a pergunta de fechamento',
              'Oferecer desconto antes de ele pedir',
            ].map(erro => (
              <div key={erro} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">❌ {erro}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">O SILÊNCIO DE OURO</h4>
              <p className="text-[var(--gray)]">
                Depois de fazer a pergunta de fechamento, <strong className="text-white">FIQUE EM SILÊNCIO</strong>.
                Quem fala primeiro, perde. Deixe o cliente processar e responder.
                Pode parecer estranho, mas funciona!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod2-7': {
    titulo: 'Pós-Venda e Indicações',
    modulo: 'Vendas Presenciais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">A Venda Não Acabou!</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Um cliente satisfeito é sua <strong className="text-white">melhor propaganda</strong>.
            O pós-venda bem feito gera indicações que vendem sozinhas!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📅 Cronograma de Contatos</h3>
          <div className="space-y-4">
            {[
              { dia: 'Dia 1', acao: 'Mensagem de boas-vindas', script: 'Parabéns pela decisão! Qualquer dúvida na implantação, me chama. Estou aqui pra ajudar! 🚀' },
              { dia: 'Dia 7', acao: 'Check-up da primeira semana', script: 'E aí, como foi a primeira semana? O sistema está rodando bem? Precisa de alguma ajuda?' },
              { dia: 'Dia 30', acao: 'Pesquisa de satisfação', script: 'Já faz 1 mês! Como está sendo a experiência? De 0 a 10, quanto você recomendaria o Império?' },
              { dia: 'Dia 45', acao: 'Pedido de indicação', script: 'Que bom que está gostando! Conhece algum amigo empresário que poderia se beneficiar também?' },
            ].map(item => (
              <div key={item.dia} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-500/30 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">{item.dia}</span>
                  <span className="text-white font-semibold">{item.acao}</span>
                </div>
                <p className="text-[var(--gray)] italic">"{item.script}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎁 Programa de Indicação</h3>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-white font-semibold mb-2">Ofereça benefícios reais:</p>
            <ul className="space-y-2 text-[var(--gray)]">
              <li>• 1 mês grátis para cada indicação que fechar</li>
              <li>• Desconto de R$50 na mensalidade por indicação ativa</li>
              <li>• Brindes exclusivos para quem mais indica</li>
            </ul>
          </div>
          <p className="text-[var(--gray)] text-sm">
            💡 Consulte a empresa sobre as regras atuais do programa de indicação
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 Script para Pedir Indicação</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
            <p className="text-[var(--gray)]">
              <strong className="text-white">1. Confirme a satisfação:</strong><br />
              "Que bom que o sistema está te ajudando! Fico muito feliz!"
            </p>
            <p className="text-[var(--gray)]">
              <strong className="text-white">2. Peça a indicação:</strong><br />
              "Você conhece algum outro empresário que está passando pelas mesmas dificuldades que você passava?"
            </p>
            <p className="text-[var(--gray)]">
              <strong className="text-white">3. Facilite:</strong><br />
              "Pode me passar o WhatsApp dele? Eu entro em contato e menciono que você indicou."
            </p>
            <p className="text-[var(--gray)]">
              <strong className="text-white">4. Agradeça:</strong><br />
              "Muito obrigado! Se ele fechar, você ganha [benefício]. Vou te avisar!"
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">⭐ Peça Avaliações</h3>
          <p className="text-[var(--gray)] mb-4">Avaliações online ajudam a vender mais. Peça para clientes satisfeitos:</p>
          <div className="grid gap-3">
            {[
              { plataforma: 'Google Meu Negócio', beneficio: 'Aparece quando buscam "sistema para loja"' },
              { plataforma: 'Depoimento em vídeo', beneficio: 'Use nas redes sociais e apresentações' },
              { plataforma: 'Print do WhatsApp', beneficio: 'Mostre para novos prospects (com autorização)' },
            ].map(item => (
              <div key={item.plataforma} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <span className="text-orange-400 font-semibold">{item.plataforma}</span>
                <p className="text-[var(--gray)] text-sm">{item.beneficio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">MATEMÁTICA DAS INDICAÇÕES</h4>
              <p className="text-[var(--gray)]">
                Se cada cliente indicar <strong className="text-white">apenas 1 pessoa</strong> que fecha,
                você <strong className="text-white">dobra suas vendas</strong> sem prospectar!
                Indicação é a forma mais barata e eficiente de vender.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod3-2': {
    titulo: 'Scripts de Mensagens',
    modulo: 'Vendas Digitais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Mensagens Prontas para Copiar</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Scripts testados e aprovados. <strong className="text-white">Personalize</strong> com o nome do cliente e do negócio!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📩 Primeiro Contato (Frio)</h3>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-green-500/20 pb-3">
              <p className="text-white font-mono text-sm">
                Olá [NOME]! Tudo bem? 👋<br /><br />
                Sou [SEU NOME] e trabalho com soluções para comércio.<br /><br />
                Vi que você tem [TIPO DE NEGÓCIO] e queria te mostrar como outros lojistas estão economizando tempo e aumentando o lucro com organização.<br /><br />
                Posso te mandar um vídeo de 2 min explicando? 📱
              </p>
            </div>
            <p className="text-[var(--gray)] text-sm">💡 Taxa de resposta média: 30-40%</p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📩 Follow-up (Não Respondeu)</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-blue-500/20 pb-3">
              <p className="text-white font-mono text-sm">
                Oi [NOME]! 😊<br /><br />
                Mandei uma mensagem semana passada sobre um sistema que ajuda comerciantes.<br /><br />
                Sei que você deve estar corrido, mas queria só 2 minutinhos pra te mostrar algo que pode facilitar muito seu dia a dia.<br /><br />
                Posso te ligar rapidinho hoje às [HORÁRIO]?
              </p>
            </div>
            <p className="text-[var(--gray)] text-sm">💡 Faça no máximo 3 follow-ups</p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📩 Resposta para "Quanto Custa?"</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-purple-500/20 pb-3">
              <p className="text-white font-mono text-sm">
                Boa pergunta! 💰<br /><br />
                O investimento é de R$250/mês com tudo incluso: PDV, estoque, financeiro, nota fiscal, usuários ilimitados e suporte.<br /><br />
                Mas antes de falar só de preço, deixa eu te mostrar o que você GANHA. Posso te ligar 5 min pra te mostrar o sistema funcionando?<br /><br />
                Aí você decide se faz sentido pro seu negócio 😉
              </p>
            </div>
            <p className="text-[var(--gray)] text-sm">💡 Nunca dê só o preço. Sempre conecte com valor!</p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📩 Resposta para "Vou Pensar"</h3>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-orange-500/20 pb-3">
              <p className="text-white font-mono text-sm">
                Claro, entendo! É uma decisão importante 🤔<br /><br />
                Me ajuda com uma coisa: o que exatamente você precisa pensar? É sobre o preço, as funcionalidades ou outra coisa?<br /><br />
                Pergunto porque talvez eu consiga te ajudar a esclarecer alguma dúvida agora mesmo!
              </p>
            </div>
            <p className="text-[var(--gray)] text-sm">💡 Descubra a objeção real por trás do "vou pensar"</p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📩 Após Demonstração</h3>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-4">
            <div className="border-b border-cyan-500/20 pb-3">
              <p className="text-white font-mono text-sm">
                [NOME], foi muito bom conversar com você! 🙌<br /><br />
                Resumindo o que vimos:<br />
                ✅ PDV rápido com código de barras<br />
                ✅ Estoque com alerta automático<br />
                ✅ Controle financeiro completo<br />
                ✅ Nota fiscal integrada<br /><br />
                Investimento: R$250/mês + implantação<br /><br />
                Quer que eu já reserve sua vaga para implantação essa semana? 🚀
              </p>
            </div>
            <p className="text-[var(--gray)] text-sm">💡 Resuma os benefícios e faça o fechamento!</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">DICA DE OURO</h4>
              <p className="text-[var(--gray)]">
                <strong className="text-white">Salve esses scripts</strong> no bloco de notas do celular.
                Na hora de usar, só troque [NOME] e [TIPO DE NEGÓCIO]. Rápido e eficiente!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod3-3': {
    titulo: 'Venda por Videochamada',
    modulo: 'Vendas Digitais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">A Nova Forma de Vender</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Videochamada permite demonstrar o sistema <strong className="text-white">para clientes de qualquer lugar</strong>.
            É como uma visita presencial, mas sem sair de casa!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🛠️ Ferramentas Recomendadas</h3>
          <div className="grid gap-3">
            {[
              { ferramenta: 'Google Meet', desc: 'Gratuito, funciona no navegador, cliente não precisa instalar nada' },
              { ferramenta: 'Zoom', desc: 'Mais profissional, permite gravar. Versão grátis limita a 40min' },
              { ferramenta: 'WhatsApp Vídeo', desc: 'Mais simples, todo mundo tem. Bom para demonstrações rápidas' },
            ].map(item => (
              <div key={item.ferramenta} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{item.ferramenta}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Checklist Antes da Call</h3>
          <div className="space-y-2">
            {[
              'Internet estável (teste antes!)',
              'Ambiente silencioso e iluminado',
              'Fundo neutro ou com logo da empresa',
              'Sistema aberto e pronto para demonstrar',
              'Câmera na altura dos olhos',
              'Microfone funcionando (teste o áudio)',
              'Celular no silencioso',
              'Água por perto',
            ].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">☑️ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📋 Roteiro da Videochamada (20 min)</h3>
          <div className="space-y-3">
            {[
              { fase: 'Abertura (2 min)', acoes: ['Agradeça o tempo', 'Pergunte se está vendo e ouvindo bem', 'Confirme quanto tempo ele tem'] },
              { fase: 'Sondagem (5 min)', acoes: ['Pergunte sobre o negócio', 'Descubra as dores', 'Anote os pontos principais'] },
              { fase: 'Demonstração (10 min)', acoes: ['Compartilhe a tela', 'Mostre as funcionalidades que resolvem as dores', 'Deixe ele fazer perguntas'] },
              { fase: 'Fechamento (3 min)', acoes: ['Resuma os benefícios', 'Apresente o investimento', 'Faça a pergunta de fechamento'] },
            ].map(item => (
              <div key={item.fase} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-semibold">{item.fase}</span>
                <ul className="mt-2 space-y-1">
                  {item.acoes.map((acao, i) => (
                    <li key={i} className="text-[var(--gray)] text-sm">• {acao}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">❌ Erros Comuns</h3>
          <div className="space-y-2">
            {[
              'Ficar olhando para a tela em vez da câmera',
              'Internet travando (sempre teste antes!)',
              'Ambiente bagunçado aparecendo',
              'Demonstração muito longa e cansativa',
              'Não pedir para fechar no final',
            ].map(item => (
              <div key={item} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">❌ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TRUQUE PRO</h4>
              <p className="text-[var(--gray)]">
                Cole um <strong className="text-white">post-it com "OLHE AQUI"</strong> ao lado da câmera.
                Assim você mantém contato visual com o cliente enquanto demonstra!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod3-4': {
    titulo: 'Funil de Vendas Digital',
    modulo: 'Vendas Digitais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">O Que é um Funil de Vendas?</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            É o caminho que o cliente percorre desde <strong className="text-white">não te conhecer</strong> até
            <strong className="text-white"> comprar de você</strong>. Entender isso multiplica suas vendas!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 As 4 Etapas do Funil</h3>
          <div className="space-y-4">
            {[
              { etapa: 'TOPO', nome: 'Atração', desc: 'Pessoa não sabe que tem um problema', acao: 'Conteúdo educativo: "5 erros que todo lojista comete"', cor: 'blue' },
              { etapa: 'MEIO', nome: 'Interesse', desc: 'Pessoa sabe do problema, busca soluções', acao: 'Conteúdo de valor: "Como organizar seu estoque"', cor: 'green' },
              { etapa: 'FUNDO', nome: 'Decisão', desc: 'Pessoa quer resolver, avalia opções', acao: 'Demonstração do sistema, depoimentos', cor: 'purple' },
              { etapa: 'VENDA', nome: 'Ação', desc: 'Pessoa pronta para comprar', acao: 'Proposta, condições, fechamento', cor: 'orange' },
            ].map(item => (
              <div key={item.etapa} className={`bg-${item.cor}-500/10 border border-${item.cor}-500/30 rounded-lg p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`bg-${item.cor}-500/30 text-${item.cor}-400 px-3 py-1 rounded-full text-sm font-bold`}>{item.etapa}</span>
                  <span className="text-white font-semibold">{item.nome}</span>
                </div>
                <p className="text-[var(--gray)] text-sm mb-2">{item.desc}</p>
                <p className="text-[var(--gray)] text-sm">👉 <strong className="text-white">{item.acao}</strong></p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Seu Funil na Prática</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-blue-400 font-semibold">1. TOPO: Redes Sociais</p>
              <p className="text-[var(--gray)] text-sm">Poste conteúdo útil → pessoa segue você</p>
            </div>
            <div className="flex justify-center">
              <span className="text-[var(--gray)]">⬇️</span>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-green-400 font-semibold">2. MEIO: WhatsApp</p>
              <p className="text-[var(--gray)] text-sm">Pessoa manda mensagem → você inicia conversa</p>
            </div>
            <div className="flex justify-center">
              <span className="text-[var(--gray)]">⬇️</span>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-purple-400 font-semibold">3. FUNDO: Demonstração</p>
              <p className="text-[var(--gray)] text-sm">Você agenda call → mostra o sistema</p>
            </div>
            <div className="flex justify-center">
              <span className="text-[var(--gray)]">⬇️</span>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-orange-400 font-semibold">4. VENDA: Fechamento</p>
              <p className="text-[var(--gray)] text-sm">Envia proposta → cliente fecha!</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📈 Métricas para Acompanhar</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { metrica: 'Alcance', desc: 'Quantas pessoas viram seu conteúdo' },
              { metrica: 'Engajamento', desc: 'Quantas curtiram/comentaram' },
              { metrica: 'Leads', desc: 'Quantas mandaram mensagem' },
              { metrica: 'Demos', desc: 'Quantas demonstrações fez' },
              { metrica: 'Propostas', desc: 'Quantas propostas enviou' },
              { metrica: 'Vendas', desc: 'Quantas fechou' },
            ].map(item => (
              <div key={item.metrica} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <span className="text-purple-400 font-semibold">{item.metrica}</span>
                <p className="text-[var(--gray)] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">REGRA DO 100</h4>
              <p className="text-[var(--gray)]">
                De cada <strong className="text-white">100 pessoas</strong> que veem seu conteúdo,
                ~10 viram leads, ~3 fazem demo, ~1 compra. Conhecendo esses números, você sabe
                <strong className="text-white"> quantos precisa alcançar</strong> para bater sua meta!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod3-5': {
    titulo: 'Criação de Conteúdo',
    modulo: 'Vendas Digitais',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Conteúdo que Vende</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Você não precisa ser influencer! Precisa criar conteúdo que <strong className="text-white">mostre que você entende</strong>
            do assunto e ajude seu público-alvo.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📝 10 Ideias de Conteúdo</h3>
          <div className="space-y-2">
            {[
              '5 erros que fazem seu estoque virar bagunça',
              'Quanto você perde por não emitir nota fiscal?',
              'Como saber se sua loja está dando lucro',
              'Cliente que compra fiado: como controlar?',
              'O segredo das lojas que nunca ficam sem produto',
              'Seu funcionário pode estar te roubando (e você nem sabe)',
              'Por que lojas pequenas também precisam de sistema',
              'Como vender mais gastando menos tempo no caixa',
              'A multa que pode fechar seu negócio',
              'Depoimento de cliente que usa o sistema',
            ].map((ideia, idx) => (
              <div key={idx} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">{idx + 1}. {ideia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎬 Formatos que Funcionam</h3>
          <div className="space-y-3">
            {[
              { formato: 'Vídeo Falando', desc: 'Você na câmera explicando algo. Gera conexão!', tempo: '30-60 seg' },
              { formato: 'Tela do Sistema', desc: 'Grave a tela mostrando uma função. Prático!', tempo: '15-30 seg' },
              { formato: 'Antes x Depois', desc: 'Mostre o problema e a solução. Impactante!', tempo: '15-20 seg' },
              { formato: 'Depoimento', desc: 'Cliente falando bem. Prova social!', tempo: '30-45 seg' },
              { formato: 'Lista/Dicas', desc: 'Texto na tela com narração. Fácil de fazer!', tempo: '15-30 seg' },
            ].map(item => (
              <div key={item.formato} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-400 font-semibold">{item.formato}</span>
                  <span className="text-[var(--gray)] text-xs bg-white/10 px-2 py-1 rounded">{item.tempo}</span>
                </div>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📱 Ferramentas Gratuitas</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { nome: 'CapCut', uso: 'Editar vídeos' },
              { nome: 'Canva', uso: 'Criar artes e thumbnails' },
              { nome: 'InShot', uso: 'Edição rápida no celular' },
              { nome: 'Remove.bg', uso: 'Remover fundo de fotos' },
            ].map(item => (
              <div key={item.nome} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <span className="text-purple-400 font-semibold">{item.nome}</span>
                <p className="text-[var(--gray)] text-xs mt-1">{item.uso}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📅 Calendário Semanal</h3>
          <div className="space-y-2">
            {[
              { dia: 'Segunda', tipo: 'Dica prática', exemplo: '"Como cadastrar produto em 30 segundos"' },
              { dia: 'Quarta', tipo: 'Dor do cliente', exemplo: '"Você sabe quanto lucrou esse mês?"' },
              { dia: 'Sexta', tipo: 'Bastidores/Depoimento', exemplo: 'Cliente usando o sistema' },
            ].map(item => (
              <div key={item.dia} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <span className="text-orange-400 font-semibold">{item.dia}:</span>
                <span className="text-white ml-2">{item.tipo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.exemplo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">REGRA DO 1%</h4>
              <p className="text-[var(--gray)]">
                Seu conteúdo não precisa ser perfeito. <strong className="text-white">Feito é melhor que perfeito!</strong>
                Comece com o celular, melhore aos poucos. O importante é começar e ser consistente.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-2': {
    titulo: 'TikTok Ads - Campanhas',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Dominando Campanhas no TikTok Ads</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            No TikTok Ads você tem 3 níveis: <strong className="text-white">Campanha → Grupo de Anúncios → Anúncios</strong>.
            Dominar essa estrutura é a diferença entre queimar dinheiro e gerar leads qualificados!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">3</p>
              <p className="text-[var(--gray)] text-xs">Níveis</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">7</p>
              <p className="text-[var(--gray)] text-xs">Dias mínimos</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">3-5</p>
              <p className="text-[var(--gray)] text-xs">Criativos por grupo</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📋 Passo a Passo: Criando sua Campanha</h3>
          <div className="space-y-3">
            {[
              { passo: 1, titulo: 'Escolha o Objetivo', desc: 'Para WhatsApp: "Tráfego" → Para site com Pixel: "Conversões"', dica: 'Tráfego é mais barato e funciona bem para início' },
              { passo: 2, titulo: 'Nomeie a Campanha', desc: 'Use padrão: [Data]_[Objetivo]_[Público] Ex: Jan25_Trafego_Lojistas', dica: 'Facilita análise depois' },
              { passo: 3, titulo: 'Defina o Orçamento', desc: 'Recomendado: R$50-100/dia por grupo de anúncios', dica: 'Menos que R$30/dia não gera dados suficientes' },
              { passo: 4, titulo: 'Configure o Público', desc: 'Idade, localização, interesses (detalhado abaixo)', dica: 'Comece amplo, depois refine' },
              { passo: 5, titulo: 'Suba os Criativos', desc: 'Mínimo 3 vídeos diferentes por grupo', dica: 'Teste hooks diferentes!' },
              { passo: 6, titulo: 'Aguarde 7 dias', desc: 'Não mexa em NADA por 7 dias', dica: 'Paciência é a chave!' },
            ].map((item) => (
              <div key={item.passo} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
                  {item.passo}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{item.titulo}</p>
                  <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                  <p className="text-blue-400 text-xs mt-1">💡 {item.dica}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Segmentação EXATA para Comerciantes</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Localização:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• <strong className="text-white">Sua cidade + 30km de raio</strong> (para começar)</li>
                <li>• Depois expanda para cidades vizinhas</li>
                <li>• Evite "Brasil todo" no início</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Idade e Gênero:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Idade: <strong className="text-white">28-55 anos</strong></li>
                <li>• Gênero: Todos (ou teste separado)</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">Interesses (selecione 5-8):</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Empreendedorismo', 'Pequenas empresas', 'Negócios e finanças',
                  'Gestão empresarial', 'Comércio varejista', 'E-commerce',
                  'Contabilidade', 'Marketing para negócios'
                ].map(interesse => (
                  <span key={interesse} className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm">{interesse}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 4 Scripts de Anúncios para TikTok Ads</h3>
          <div className="space-y-3">
            {[
              {
                tipo: 'Problema + Agitação',
                hook: '"Você é dono de loja e ainda usa caderninho?"',
                script: '[0-3s] "Você é dono de loja e ainda usa caderninho?"\n[3-8s] Mostra papel bagunçado, calculadora\n[8-12s] "Enquanto você perde tempo, seu concorrente..."\n[12-18s] Mostra sistema organizado funcionando\n[18-22s] "Controla tudo pelo celular, em tempo real"\n[22-25s] "Quer ver como? Clica no link!"',
                cta: 'Clique no link'
              },
              {
                tipo: 'Storytelling Rápido',
                hook: '"Deixa eu te contar o que aconteceu com o João..."',
                script: '[0-3s] "Deixa eu te contar o que aconteceu com o João..."\n[3-8s] "Ele tinha uma loja há 5 anos"\n[8-12s] "Mas descobriu que estava no PREJUÍZO"\n[12-18s] "Sabe o que mudou tudo? Um sistema"\n[18-22s] Mostra tela do sistema com lucro\n[22-25s] "Quer ser o próximo João? Link na bio!"',
                cta: 'Link na bio'
              },
              {
                tipo: 'Comparação Direta',
                hook: '"Sua loja vs Loja do seu concorrente"',
                script: '[0-3s] "Sua loja vs Loja do seu concorrente"\n[3-10s] VOCÊ: papéis, calculadora, estresse\n[10-17s] CONCORRENTE: sistema, tablet, controle\n[17-22s] "A diferença? Menos de R$10 por dia"\n[22-25s] "Clica no link e descobre como!"',
                cta: 'Descubra como'
              },
              {
                tipo: 'Tutorial Rápido',
                hook: '"Como saber seu lucro em 10 segundos"',
                script: '[0-3s] "Como saber seu lucro em 10 segundos"\n[3-8s] Abre o sistema no celular\n[8-12s] Clica em "Relatórios"\n[12-16s] "PRONTO! Lucro do mês: R$X.XXX"\n[16-20s] "Simples assim. Sem planilha, sem conta."\n[20-25s] "Quer ter isso? Link aqui embaixo!"',
                cta: 'Saiba mais'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{idx + 1} {item.tipo}</span>
                  <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded">CTA: {item.cta}</span>
                </div>
                <p className="text-blue-400 text-sm mb-2">Hook: {item.hook}</p>
                <p className="text-white text-xs whitespace-pre-line bg-black/20 p-3 rounded">{item.script}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Tabela de Métricas - TikTok Ads</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPM</strong></td>
                  <td className="text-center">&gt;R$30</td>
                  <td className="text-center">R$15-30</td>
                  <td className="text-center">&lt;R$15</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong></td>
                  <td className="text-center">&lt;0.5%</td>
                  <td className="text-center">0.5-1.5%</td>
                  <td className="text-center">&gt;1.5%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong></td>
                  <td className="text-center">&gt;R$3</td>
                  <td className="text-center">R$1-3</td>
                  <td className="text-center">&lt;R$1</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPL</strong></td>
                  <td className="text-center">&gt;R$30</td>
                  <td className="text-center">R$15-30</td>
                  <td className="text-center">&lt;R$15</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Taxa conclusão vídeo</strong></td>
                  <td className="text-center">&lt;10%</td>
                  <td className="text-center">10-25%</td>
                  <td className="text-center">&gt;25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Estratégia de Orçamento</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-sm font-semibold">TESTE</p>
              <p className="text-2xl font-bold text-white">R$50</p>
              <p className="text-[var(--gray)] text-xs">por dia / 7 dias</p>
              <p className="text-yellow-400 text-xs mt-2">Total: R$350</p>
            </div>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-green-400 text-sm font-semibold">ESCALA</p>
              <p className="text-2xl font-bold text-white">R$100</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-green-400 text-xs mt-2">Total: R$3.000/mês</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <p className="text-purple-400 text-sm font-semibold">AGRESSIVO</p>
              <p className="text-2xl font-bold text-white">R$200+</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-purple-400 text-xs mt-2">Total: R$6.000+/mês</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ 6 Erros que Queimam Dinheiro</h3>
          <div className="space-y-2">
            {[
              { erro: 'Mexer na campanha antes de 7 dias', fix: 'Aguarde 7 dias para o algoritmo aprender' },
              { erro: 'Orçamento muito baixo (<R$30/dia)', fix: 'Mínimo R$50/dia por grupo de anúncios' },
              { erro: 'Público muito nichado no início', fix: 'Comece amplo, deixe o TikTok encontrar o público' },
              { erro: 'Apenas 1 criativo por grupo', fix: 'Sempre 3-5 criativos para teste A/B automático' },
              { erro: 'Vídeo sem hook nos primeiros 2 segundos', fix: 'Primeiros 2s decidem se a pessoa assiste' },
              { erro: 'Não instalar o Pixel antes de rodar', fix: 'Pixel é obrigatório para remarketing e otimização' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🔄 Otimização Após 7 Dias</h3>
          <div className="space-y-3">
            {[
              { acao: 'CPL acima de R$30?', faca: 'Pause os piores criativos e teste novos hooks' },
              { acao: 'CTR abaixo de 0.5%?', faca: 'O criativo não está prendendo atenção. Mude o hook!' },
              { acao: 'CPL abaixo de R$15?', faca: 'ESCALA! Aumente orçamento em 20% a cada 3 dias' },
              { acao: 'Custo subindo com o tempo?', faca: 'Fadiga de criativo. Renove os vídeos!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold text-sm">Se: {item.acao}</p>
                <p className="text-white text-sm mt-1">→ {item.faca}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">REGRA DE OURO: TESTE CONTÍNUO</h4>
              <p className="text-[var(--gray)] mb-3">
                O TikTok Ads exige <strong className="text-white">renovação constante de criativos</strong>:
              </p>
              <ul className="text-[var(--gray)] space-y-1 text-sm">
                <li>• A cada 10-15 dias, grave novos vídeos</li>
                <li>• Teste diferentes hooks nos primeiros 3 segundos</li>
                <li>• Mantenha sempre 3-5 criativos ativos por grupo</li>
                <li>• O que funcionou ontem pode não funcionar amanhã!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-3': {
    titulo: 'Kwai Ads',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Kwai Ads: O Segredo para o Interior!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O Kwai tem um público mais <strong className="text-white">popular e regional</strong>.
            CPM até 50% mais barato que TikTok, menos concorrência, e público mais velho - perfeito para vender sistemas!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">50M+</p>
              <p className="text-[var(--gray)] text-xs">Usuários Brasil</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">30-55</p>
              <p className="text-[var(--gray)] text-xs">Idade média</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">-50%</p>
              <p className="text-[var(--gray)] text-xs">CPM vs TikTok</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Kwai vs TikTok - Comparação</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Aspecto</th>
                  <th className="text-center text-cyan-400 py-2">TikTok</th>
                  <th className="text-center text-orange-400 py-2">Kwai</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">CPM Médio</td>
                  <td className="text-center">R$15-25</td>
                  <td className="text-center text-green-400">R$8-15</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Público</td>
                  <td className="text-center">18-35 anos</td>
                  <td className="text-center text-green-400">30-55 anos</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Região forte</td>
                  <td className="text-center">Capitais</td>
                  <td className="text-center text-green-400">Interior</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Concorrência</td>
                  <td className="text-center">Alta</td>
                  <td className="text-center text-green-400">Baixa</td>
                </tr>
                <tr>
                  <td className="py-2">Classe social</td>
                  <td className="text-center">A/B/C</td>
                  <td className="text-center">B/C/D</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400 text-sm mt-3">💡 Para comerciantes de interior, Kwai costuma performar MELHOR!</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📋 Passo a Passo: Criando Conta e Campanha</h3>
          <div className="space-y-3">
            {[
              { passo: 1, titulo: 'Acesse ads.kwai.com', desc: 'Crie conta com e-mail comercial', dica: 'Use e-mail diferente do pessoal' },
              { passo: 2, titulo: 'Complete o cadastro Business', desc: 'Preencha CNPJ (ou CPF), nome e telefone', dica: 'CNPJ libera mais recursos' },
              { passo: 3, titulo: 'Adicione forma de pagamento', desc: 'Cartão de crédito ou boleto', dica: 'Cartão libera anúncios mais rápido' },
              { passo: 4, titulo: 'Crie campanha de Tráfego', desc: 'Objetivo: Cliques para WhatsApp', dica: 'Melhor objetivo para gerar leads' },
              { passo: 5, titulo: 'Configure público', desc: 'Idade 30-55, sua região, interesses de negócio', dica: 'Comece com raio de 50km' },
              { passo: 6, titulo: 'Suba 3-5 vídeos', desc: 'Linguagem simples e direta', dica: 'Kwai gosta de vídeos mais "caseiros"' },
            ].map((item) => (
              <div key={item.passo} className="flex gap-4">
                <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold flex-shrink-0">
                  {item.passo}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{item.titulo}</p>
                  <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                  <p className="text-green-400 text-xs mt-1">💡 {item.dica}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 4 Scripts de Anúncios para Kwai</h3>
          <p className="text-[var(--gray)] text-sm mb-4">Linguagem mais simples e direta - o público do Kwai prefere assim!</p>
          <div className="space-y-3">
            {[
              {
                tipo: 'Dor Direta',
                hook: '"Ei, dono de loja! Cansou de perder dinheiro?"',
                script: '[0-3s] "Ei, dono de loja! Cansou de perder dinheiro?"\n[3-8s] "Estoque errado, caixa não fecha, não sabe o lucro..."\n[8-12s] "Tenho a solução pra você!"\n[12-18s] Mostra o sistema funcionando no celular\n[18-22s] "Controla TUDO numa tela só!"\n[22-25s] "Clica ali embaixo e fala comigo!"',
                linguagem: 'Popular/Direta'
              },
              {
                tipo: 'Resultado Rápido',
                hook: '"Olha o que meu cliente conseguiu em 30 dias!"',
                script: '[0-3s] "Olha o que meu cliente conseguiu em 30 dias!"\n[3-8s] "O João tinha uma lojinha de roupa..."\n[8-12s] "Vivia perdendo dinheiro sem saber"\n[12-18s] "Depois do sistema: descobriu que tinha R$3.000 de lucro!"\n[18-22s] "Quer saber como? É simples!"\n[22-25s] "Clica no link e me chama!"',
                linguagem: 'Storytelling simples'
              },
              {
                tipo: 'Pergunta Engajadora',
                hook: '"Você controla sua loja ou ela controla você?"',
                script: '[0-3s] "Você controla sua loja ou ela controla você?"\n[3-8s] "Se você vive apagando incêndio..."\n[8-12s] "Se não sabe quanto vendeu ontem..."\n[12-16s] "Tá na hora de mudar isso!"\n[16-22s] Mostra sistema no tablet\n[22-25s] "Vem comigo que eu te mostro!"',
                linguagem: 'Questionadora'
              },
              {
                tipo: 'Oferta Irresistível',
                hook: '"PROMOÇÃO: Sistema completo por menos de R$10 por dia!"',
                script: '[0-3s] "PROMOÇÃO: Sistema completo por menos de R$10 por dia!"\n[3-8s] "Controle de estoque"\n[8-10s] "Nota fiscal automática"\n[10-12s] "Relatório de lucro"\n[12-16s] "TUDO isso por menos que um lanche!"\n[16-22s] "E ainda tem teste GRÁTIS!"\n[22-25s] "Corre! Link aqui embaixo!"',
                linguagem: 'Promocional'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{idx + 1} {item.tipo}</span>
                  <span className="text-xs bg-orange-500/30 text-orange-300 px-2 py-1 rounded">{item.linguagem}</span>
                </div>
                <p className="text-blue-400 text-sm mb-2">Hook: {item.hook}</p>
                <p className="text-white text-xs whitespace-pre-line bg-black/20 p-3 rounded">{item.script}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🎯 Segmentação Ideal para Kwai</h3>
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">Localização:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• <strong className="text-white">Cidades do interior (população 50k-300k)</strong></li>
                <li>• Raio de 50-80km da sua base</li>
                <li>• Evite capitais (muita concorrência)</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Idade e Perfil:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Idade: <strong className="text-white">30-55 anos</strong></li>
                <li>• Ambos os gêneros</li>
                <li>• Público mais classe B/C/D</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Interesses:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Negócios', 'Empreendedorismo', 'Vendas', 'Finanças',
                  'Trabalhar em casa', 'Ganhar dinheiro', 'Comerciantes'
                ].map(interesse => (
                  <span key={interesse} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">{interesse}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Tabela de Métricas - Kwai Ads</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPM</strong></td>
                  <td className="text-center">&gt;R$20</td>
                  <td className="text-center">R$10-20</td>
                  <td className="text-center">&lt;R$10</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong></td>
                  <td className="text-center">&lt;0.8%</td>
                  <td className="text-center">0.8-2%</td>
                  <td className="text-center">&gt;2%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong></td>
                  <td className="text-center">&gt;R$2</td>
                  <td className="text-center">R$0.80-2</td>
                  <td className="text-center">&lt;R$0.80</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">CPL</strong></td>
                  <td className="text-center">&gt;R$20</td>
                  <td className="text-center">R$8-20</td>
                  <td className="text-center">&lt;R$8</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400 text-sm mt-3">💰 No Kwai é comum conseguir CPL abaixo de R$10!</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">💰 Estratégia de Orçamento</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-sm font-semibold">TESTE</p>
              <p className="text-2xl font-bold text-white">R$30</p>
              <p className="text-[var(--gray)] text-xs">por dia / 7 dias</p>
              <p className="text-yellow-400 text-xs mt-2">Total: R$210</p>
            </div>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-green-400 text-sm font-semibold">ESCALA</p>
              <p className="text-2xl font-bold text-white">R$50</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-green-400 text-xs mt-2">Total: R$1.500/mês</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <p className="text-purple-400 text-sm font-semibold">AGRESSIVO</p>
              <p className="text-2xl font-bold text-white">R$100+</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-purple-400 text-xs mt-2">Total: R$3.000+/mês</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Erros Comuns no Kwai</h3>
          <div className="space-y-2">
            {[
              { erro: 'Usar vídeo muito "profissional"', fix: 'Kwai prefere conteúdo mais caseiro e autêntico' },
              { erro: 'Linguagem muito técnica', fix: 'Use palavras simples: "sistema pra loja", não "ERP"' },
              { erro: 'Anunciar em capitais', fix: 'Foque no interior onde o Kwai é mais forte' },
              { erro: 'Copiar exatamente o que funciona no TikTok', fix: 'Adapte para linguagem mais popular' },
              { erro: 'Não testar cidades diferentes', fix: 'Cada cidade tem custo diferente - teste várias!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA MATADORA: COMBO TikTok + Kwai</h4>
              <p className="text-[var(--gray)] mb-3">
                Use as duas plataformas de forma complementar:
              </p>
              <ul className="text-[var(--gray)] space-y-1 text-sm">
                <li>• <strong className="text-white">TikTok:</strong> Capitais e cidades grandes (+ de 300k habitantes)</li>
                <li>• <strong className="text-white">Kwai:</strong> Interior e cidades menores (50k-300k habitantes)</li>
                <li>• Mesmo criativo com pequenos ajustes de linguagem</li>
                <li>• Compare CPL das duas e escale a mais barata!</li>
              </ul>
              <p className="text-green-400 text-sm mt-2">💰 Muitos conseguem CPL 3x menor no Kwai para público do interior!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-4': {
    titulo: 'Google Ads - Pesquisa',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Google Ads: O Rei da Intenção de Compra!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            No Google, as pessoas <strong className="text-white">já estão buscando</strong> uma solução!
            Diferente das redes sociais, aqui você aparece para quem já decidiu comprar - só falta escolher de quem.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">8.5B</p>
              <p className="text-[var(--gray)] text-xs">Buscas/dia</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">65%</p>
              <p className="text-[var(--gray)] text-xs">Clicam em ads</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">4x</p>
              <p className="text-[var(--gray)] text-xs">Mais intenção</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🔍 Palavras-chave Organizadas por Intenção</h3>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-400 font-semibold">🔥 Alta Intenção (Fundo de Funil)</span>
                <span className="text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded">Prioridade 1</span>
              </div>
              <p className="text-[var(--gray)] text-xs mb-2">Pessoa pronta para comprar. CPC mais alto, mas converte mais!</p>
              <div className="flex flex-wrap gap-2">
                {['sistema para loja', 'software pdv preço', 'programa gestão comercial', 'sistema nota fiscal nfc-e', 'controle estoque para loja', 'sistema para mercadinho', 'pdv para varejo', 'sistema erp pequena empresa'].map(kw => (
                  <span key={kw} className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">{kw}</span>
                ))}
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-400 font-semibold">⚡ Média Intenção (Meio de Funil)</span>
                <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-1 rounded">Prioridade 2</span>
              </div>
              <p className="text-[var(--gray)] text-xs mb-2">Pesquisando soluções. CPC médio.</p>
              <div className="flex flex-wrap gap-2">
                {['como controlar estoque loja', 'como emitir nota fiscal', 'organizar finanças comércio', 'melhor sistema para loja', 'sistema gestão qual escolher'].map(kw => (
                  <span key={kw} className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">{kw}</span>
                ))}
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-400 font-semibold">📍 Por Nicho (Super Específicas)</span>
                <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded">Menos concorrência</span>
              </div>
              <p className="text-[var(--gray)] text-xs mb-2">Público muito qualificado. CPC baixo!</p>
              <div className="flex flex-wrap gap-2">
                {['sistema para pet shop', 'programa para loja de roupas', 'sistema mercadinho', 'pdv para açougue', 'controle estoque farmácia', 'sistema para papelaria', 'programa para material construção'].map(kw => (
                  <span key={kw} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 3 Modelos de Anúncios Prontos</h3>
          <div className="space-y-4">
            {[
              {
                nome: 'Anúncio Direto',
                titulos: ['Sistema para Loja Completo', 'PDV + Estoque + Nota Fiscal', 'Teste Grátis 7 Dias'],
                descricao: 'Sistema completo para seu comércio. Controle estoque, emita NFC-e e saiba seu lucro real. Demonstração grátis!'
              },
              {
                nome: 'Anúncio com Benefício',
                titulos: ['Sua Loja Organizada em 1 Dia', 'Sistema Fácil de Usar', 'Suporte 24h + Treinamento'],
                descricao: 'Pare de perder dinheiro com estoque errado. Sistema completo que você aprende em 30 minutos. Teste grátis!'
              },
              {
                nome: 'Anúncio com Prova Social',
                titulos: ['+500 Lojistas Usam', 'Sistema Nota 4.9 no Google', 'Desde 2015 no Mercado'],
                descricao: 'Junte-se a centenas de comerciantes que já organizaram seus negócios. Sistema completo com suporte brasileiro.'
              },
            ].map((anuncio, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-3">#{idx + 1} {anuncio.nome}</p>
                <div className="bg-white rounded-lg p-4 text-black">
                  <p className="text-blue-600 text-sm font-semibold">Ad • seusite.com.br</p>
                  <p className="text-blue-800 text-lg font-semibold">{anuncio.titulos[0]} | {anuncio.titulos[1]}</p>
                  <p className="text-blue-800">{anuncio.titulos[2]}</p>
                  <p className="text-gray-700 text-sm mt-1">{anuncio.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">🚫 Lista de Palavras Negativas (COPIE!)</h3>
          <p className="text-[var(--gray)] text-sm mb-3">Adicione TODAS essas palavras negativas para não desperdiçar dinheiro:</p>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {[
                'grátis', 'gratuito', 'free', 'download', 'baixar', 'pirata', 'crackeado',
                'curso', 'aula', 'tutorial', 'como fazer', 'vagas', 'emprego', 'trabalhar',
                'salário', 'excel', 'planilha', 'word', 'PDF', 'modelo', 'template',
                'o que é', 'significado', 'conceito', 'TCC', 'monografia'
              ].map(neg => (
                <span key={neg} className="bg-red-500/30 text-red-300 px-2 py-1 rounded text-xs">{neg}</span>
              ))}
            </div>
          </div>
          <p className="text-yellow-400 text-xs mt-3">⚠️ Revise semanalmente o relatório de termos de pesquisa e adicione novas negativas!</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📊 Tabela de Métricas - Google Ads Pesquisa</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong></td>
                  <td className="text-center">&lt;2%</td>
                  <td className="text-center">2-5%</td>
                  <td className="text-center">&gt;5%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong></td>
                  <td className="text-center">&gt;R$8</td>
                  <td className="text-center">R$3-8</td>
                  <td className="text-center">&lt;R$3</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPL</strong></td>
                  <td className="text-center">&gt;R$80</td>
                  <td className="text-center">R$30-80</td>
                  <td className="text-center">&lt;R$30</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Quality Score</strong></td>
                  <td className="text-center">&lt;5</td>
                  <td className="text-center">5-7</td>
                  <td className="text-center">&gt;7</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Taxa de Conversão</strong></td>
                  <td className="text-center">&lt;3%</td>
                  <td className="text-center">3-8%</td>
                  <td className="text-center">&gt;8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Estratégia de Orçamento</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-sm font-semibold">TESTE</p>
              <p className="text-2xl font-bold text-white">R$50</p>
              <p className="text-[var(--gray)] text-xs">por dia / 14 dias</p>
              <p className="text-yellow-400 text-xs mt-2">Total: R$700</p>
            </div>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-green-400 text-sm font-semibold">ESCALA</p>
              <p className="text-2xl font-bold text-white">R$100</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-green-400 text-xs mt-2">Total: R$3.000/mês</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <p className="text-purple-400 text-sm font-semibold">AGRESSIVO</p>
              <p className="text-2xl font-bold text-white">R$200+</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-purple-400 text-xs mt-2">Total: R$6.000+/mês</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Erros que Queimam Dinheiro no Google</h3>
          <div className="space-y-2">
            {[
              { erro: 'Usar correspondência ampla sem negativas', fix: 'Comece com "Frase" ou [Exata] + muitas negativas' },
              { erro: 'Não configurar conversões', fix: 'Instale tag de conversão para rastrear leads' },
              { erro: 'Anunciar 24h por dia', fix: 'Foque no horário comercial (8h-20h)' },
              { erro: 'Landing page genérica', fix: 'Crie página específica para cada grupo de palavras' },
              { erro: 'Ignorar Quality Score', fix: 'QS baixo = CPC alto. Melhore relevância!' },
              { erro: 'Não usar extensões', fix: 'Extensões aumentam CTR em até 15%!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🔧 Extensões Obrigatórias</h3>
          <div className="space-y-3">
            {[
              { extensao: 'Extensão de Chamada', desc: 'Número de telefone clicável', impacto: '+10% CTR' },
              { extensao: 'Extensão de Sitelinks', desc: '4-6 links extras (Preços, Funcionalidades, Contato...)', impacto: '+15% CTR' },
              { extensao: 'Extensão de Frase de Destaque', desc: '"Suporte 24h" "Teste Grátis" "Sem Contrato"', impacto: '+8% CTR' },
              { extensao: 'Extensão de Local', desc: 'Mostra seu endereço (se tiver escritório)', impacto: '+12% CTR' },
            ].map((item, idx) => (
              <div key={idx} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="text-blue-400 font-semibold">{item.extensao}</span>
                  <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                </div>
                <span className="text-green-400 text-sm font-semibold">{item.impacto}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA: RLSA (Remarketing em Pesquisa)</h4>
              <p className="text-[var(--gray)] mb-3">
                Combine o poder do remarketing com pesquisa:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. Crie lista de remarketing com visitantes do site</li>
                <li>2. Crie campanha de pesquisa segmentando APENAS essa lista</li>
                <li>3. Aumente o lance em 50% para essas pessoas</li>
                <li>4. <strong className="text-white">Resultado:</strong> Quando alguém que já visitou seu site buscar "sistema para loja", você aparece em primeiro!</li>
              </ol>
              <p className="text-green-400 text-sm mt-2">💰 Taxa de conversão até 3x maior que campanha normal!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-5': {
    titulo: 'Google Ads - Display',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Google Display: Alcance Massivo + Remarketing Poderoso!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            A Rede de Display do Google alcança <strong className="text-white">90% dos usuários de internet</strong>.
            Mas o segredo não é aparecer para todos - é <strong className="text-white">reaparecer para quem já te conhece</strong>!
          </p>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">2M+</p>
              <p className="text-[var(--gray)] text-xs">Sites parceiros</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">90%</p>
              <p className="text-[var(--gray)] text-xs">Alcance internet</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">R$0.50</p>
              <p className="text-[var(--gray)] text-xs">CPM médio</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">10x</p>
              <p className="text-[var(--gray)] text-xs">Mais barato que FB</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Quando Usar Pesquisa vs Display</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Aspecto</th>
                  <th className="text-center py-2 text-blue-400">Pesquisa</th>
                  <th className="text-center py-2 text-purple-400">Display</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">Formato</td>
                  <td className="text-center">Texto</td>
                  <td className="text-center">Imagem/Vídeo</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Intenção</td>
                  <td className="text-center text-green-400">Alta (buscando)</td>
                  <td className="text-center text-yellow-400">Baixa (navegando)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">CPC médio</td>
                  <td className="text-center">R$2-5</td>
                  <td className="text-center">R$0.30-1</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">CTR médio</td>
                  <td className="text-center">3-5%</td>
                  <td className="text-center">0.3-0.5%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Melhor para</td>
                  <td className="text-center">Conversão direta</td>
                  <td className="text-center">Remarketing/Marca</td>
                </tr>
                <tr>
                  <td className="py-2">Seu uso</td>
                  <td className="text-center text-blue-400">Captar novos</td>
                  <td className="text-center text-purple-400">Recuperar perdidos</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400 text-sm mt-3">💡 Estratégia vencedora: Pesquisa para captar + Display para remarketing!</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Configurando Remarketing (Passo a Passo)</h3>
          <p className="text-[var(--gray)] mb-4">
            Remarketing converte <strong className="text-white">3-5x mais</strong> que campanha fria. Veja como configurar:
          </p>
          <div className="space-y-3">
            {[
              { passo: 1, titulo: 'Instale a Tag do Google', desc: 'Google Ads → Ferramentas → Gerenciador de Público-alvo → Suas fontes de dados → Tag do Google Ads', dica: 'Cole no <head> de todas as páginas ou use Google Tag Manager' },
              { passo: 2, titulo: 'Aguarde 7-14 dias', desc: 'O Google precisa coletar pelo menos 100 visitantes para ativar remarketing', dica: 'Quanto mais tráfego, mais rápido ativa' },
              { passo: 3, titulo: 'Crie listas de público', desc: 'Ferramentas → Gerenciador de Público-alvo → Segmentos → Novo Segmento', dica: 'Crie lista separada para cada página importante' },
              { passo: 4, titulo: 'Configure a campanha Display', desc: 'Nova campanha → Vendas → Display → Segmentação → Seus segmentos de dados', dica: 'Use APENAS remarketing, não misture com outros públicos' },
              { passo: 5, titulo: 'Defina janela de conversão', desc: 'Recomendo 7-30 dias para serviços, 3-7 dias para urgência', dica: 'Quanto menor a janela, mais quente o lead' },
              { passo: 6, titulo: 'Limite frequência', desc: 'Configurações → Limite de frequência → 3-5 impressões por dia', dica: 'Mais que isso irrita e queima a marca' },
            ].map((item) => (
              <div key={item.passo} className="flex gap-4 bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold flex-shrink-0 text-sm">
                  {item.passo}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item.titulo}</p>
                  <p className="text-[var(--gray)] text-xs">{item.desc}</p>
                  <p className="text-green-400 text-xs mt-1">💡 {item.dica}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">👥 Tipos de Público para Display</h3>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-green-400 font-semibold">1. Remarketing (Seus visitantes)</h4>
                <span className="bg-green-500/30 text-green-300 px-2 py-1 rounded text-xs">MELHOR ROI</span>
              </div>
              <p className="text-[var(--gray)] text-sm mb-2">Pessoas que já visitaram seu site/landing page</p>
              <p className="text-white text-xs">Exemplos de listas para criar:</p>
              <ul className="text-[var(--gray)] text-xs mt-1 space-y-1">
                <li>• Visitou página de preços (quente demais!)</li>
                <li>• Visitou 3+ páginas (interessado)</li>
                <li>• Iniciou formulário mas não enviou</li>
                <li>• Visitou nos últimos 7 dias</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-400 font-semibold">2. Públicos Semelhantes</h4>
                <span className="bg-blue-500/30 text-blue-300 px-2 py-1 rounded text-xs">BOM</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Google encontra pessoas parecidas com seus visitantes</p>
              <p className="text-blue-300 text-xs mt-1">Use após ter 1000+ visitantes na lista de remarketing</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-yellow-400 font-semibold">3. Segmentos de Afinidade</h4>
                <span className="bg-yellow-500/30 text-yellow-300 px-2 py-1 rounded text-xs">FRIO</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Interesses gerais (tecnologia, negócios, etc.)</p>
              <p className="text-yellow-300 text-xs mt-1">Bom para branding, ruim para conversão</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-orange-400 font-semibold">4. Segmentos de Intenção Personalizada</h4>
                <span className="bg-orange-500/30 text-orange-300 px-2 py-1 rounded text-xs">AVANÇADO</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Crie público baseado em palavras-chave que buscaram</p>
              <p className="text-orange-300 text-xs mt-1">Ex: Quem buscou "sistema para loja" no Google</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📝 Textos para Anúncios Responsivos (Copie!)</h3>
          <p className="text-[var(--gray)] mb-4">Para anúncios responsivos, você precisa de títulos curtos e descrições:</p>
          <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-3">Títulos Curtos (máx. 30 caracteres)</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Volte! Oferta especial',
                  'Você esqueceu algo...',
                  'Ainda pensando?',
                  'Última chance!',
                  'Desconto exclusivo',
                  'Só para você',
                  'Não perca essa!',
                  'Teste grátis hoje',
                ].map((titulo, i) => (
                  <div key={i} className="bg-black/30 rounded px-2 py-1 text-[var(--gray)] text-sm font-mono">
                    {titulo}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-3">Títulos Longos (máx. 90 caracteres)</h4>
              <div className="space-y-2">
                {[
                  'Você visitou nosso site - seu desconto especial ainda está esperando!',
                  'Sistema que os melhores comerciantes usam. Comece seu teste grátis.',
                  'Lembrou de nós? Voltou na hora certa - condição exclusiva hoje!',
                  'Automatize sua loja e pare de perder vendas. Saiba como.',
                ].map((titulo, i) => (
                  <div key={i} className="bg-black/30 rounded px-3 py-2 text-[var(--gray)] text-sm">
                    {titulo}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">Descrições (máx. 90 caracteres)</h4>
              <div className="space-y-2">
                {[
                  'Mais de 500 comerciantes já automatizaram suas vendas. E você?',
                  'Teste grátis por 7 dias. Sem cartão. Cancele quando quiser.',
                  'Pare de perder clientes. Sistema completo para sua loja.',
                  'Condição especial para quem visitou nosso site. Aproveite!',
                ].map((desc, i) => (
                  <div key={i} className="bg-black/30 rounded px-3 py-2 text-[var(--gray)] text-sm">
                    {desc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📐 Imagens para Anúncios Responsivos</h3>
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-3">Tamanhos Obrigatórios</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <span className="text-white font-mono text-lg">1200x628</span>
                  <p className="text-[var(--gray)] text-xs mt-1">Paisagem (1.91:1)</p>
                  <p className="text-purple-300 text-xs">Principal - mais usado</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 text-center">
                  <span className="text-white font-mono text-lg">1200x1200</span>
                  <p className="text-[var(--gray)] text-xs mt-1">Quadrado (1:1)</p>
                  <p className="text-purple-300 text-xs">Mobile e feeds</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Regras para Imagens</h4>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>✅ Texto mínimo (max 20% da imagem)</li>
                <li>✅ Cores vibrantes e contrastantes</li>
                <li>✅ Logo pequeno no canto</li>
                <li>✅ Produto ou resultado em destaque</li>
                <li>❌ Não use bordas ou molduras</li>
                <li>❌ Evite fundos brancos (some no site)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Métricas para Display - O Que Monitorar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Métrica</th>
                  <th className="text-center py-2 text-red-400">Ruim</th>
                  <th className="text-center py-2 text-yellow-400">Ok</th>
                  <th className="text-center py-2 text-green-400">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">CTR (Remarketing)</td>
                  <td className="text-center text-red-400">&lt;0.3%</td>
                  <td className="text-center text-yellow-400">0.3-0.8%</td>
                  <td className="text-center text-green-400">&gt;0.8%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">CPM</td>
                  <td className="text-center text-red-400">&gt;R$5</td>
                  <td className="text-center text-yellow-400">R$2-5</td>
                  <td className="text-center text-green-400">&lt;R$2</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">CPC</td>
                  <td className="text-center text-red-400">&gt;R$2</td>
                  <td className="text-center text-yellow-400">R$0.80-2</td>
                  <td className="text-center text-green-400">&lt;R$0.80</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Taxa de Conversão</td>
                  <td className="text-center text-red-400">&lt;1%</td>
                  <td className="text-center text-yellow-400">1-3%</td>
                  <td className="text-center text-green-400">&gt;3%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">View-through Conv.</td>
                  <td className="text-center text-red-400">&lt;5%</td>
                  <td className="text-center text-yellow-400">5-15%</td>
                  <td className="text-center text-green-400">&gt;15%</td>
                </tr>
                <tr>
                  <td className="py-2">Frequência (7 dias)</td>
                  <td className="text-center text-red-400">&gt;15</td>
                  <td className="text-center text-yellow-400">8-15</td>
                  <td className="text-center text-green-400">3-8</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-cyan-400 text-sm mt-3">💡 View-through = pessoas que viram o banner e converteram depois (sem clicar)</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">💰 Estratégia de Orçamento Display</h3>
          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-yellow-400 font-semibold">Iniciante (Remarketing)</h4>
                  <p className="text-[var(--gray)] text-sm">Público pequeno, começando</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400">R$15-30</p>
                  <p className="text-[var(--gray)] text-xs">por dia</p>
                </div>
              </div>
              <p className="text-yellow-300 text-xs mt-2">Suficiente para 3-5 mil impressões/dia</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-blue-400 font-semibold">Intermediário</h4>
                  <p className="text-[var(--gray)] text-sm">Lista de remarketing maior</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">R$30-60</p>
                  <p className="text-[var(--gray)] text-xs">por dia</p>
                </div>
              </div>
              <p className="text-blue-300 text-xs mt-2">Adicione públicos semelhantes</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-green-400 font-semibold">Agressivo</h4>
                  <p className="text-[var(--gray)] text-sm">Display + YouTube + Discovery</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">R$100+</p>
                  <p className="text-[var(--gray)] text-xs">por dia</p>
                </div>
              </div>
              <p className="text-green-300 text-xs mt-2">Combine canais para dominar a atenção</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-purple-300 text-sm">
              <strong>Regra de ouro:</strong> Display deve ser 20-30% do seu orçamento total de Google Ads.
              O grosso vai para Pesquisa (conversão direta).
            </p>
          </div>
        </div>

        <div className="glass p-6 border-red-500/30 bg-red-500/5">
          <h3 className="text-xl font-semibold text-red-400 mb-4">🚫 6 Erros que Queimam Dinheiro no Display</h3>
          <div className="grid gap-3">
            {[
              { erro: 'Não limitar frequência', fix: 'Configure máx. 3-5 impressões/dia por pessoa' },
              { erro: 'Remarketing para TODOS os visitantes', fix: 'Crie listas específicas (visitou preços, tempo no site, etc.)' },
              { erro: 'Usar Display para tráfego frio', fix: 'Display frio = baixa conversão. Use para remarketing!' },
              { erro: 'Ignorar posicionamentos ruins', fix: 'Exclua apps de jogos e sites de baixa qualidade' },
              { erro: 'Imagens sem mensagem clara', fix: 'Oferta + benefício devem ser óbvios em 2 segundos' },
              { erro: 'Janela de remarketing longa demais', fix: 'Para serviços B2B: 30 dias máx. Depois esfria.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start bg-red-500/10 rounded-lg p-3">
                <div className="w-6 h-6 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="text-red-300 font-semibold text-sm">{item.erro}</p>
                  <p className="text-[var(--gray)] text-xs mt-1">✅ {item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">🎯 Excluindo Posicionamentos Ruins</h3>
          <p className="text-[var(--gray)] mb-4">
            Por padrão, Google mostra em TODOS os lugares. Exclua esses para não desperdiçar:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h4 className="text-red-400 font-semibold text-sm mb-2">Apps para Excluir</h4>
              <ul className="text-[var(--gray)] text-xs space-y-1">
                <li>• adsenseformobileapps.com</li>
                <li>• Jogos infantis</li>
                <li>• Apps de lanterna/calculadora</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <h4 className="text-orange-400 font-semibold text-sm mb-2">Categorias para Excluir</h4>
              <ul className="text-[var(--gray)] text-xs space-y-1">
                <li>• Conteúdo sensacionalista</li>
                <li>• Tragédias e conflitos</li>
                <li>• Conteúdo sexualmente sugestivo</li>
              </ul>
            </div>
          </div>
          <p className="text-cyan-300 text-sm mt-3">
            Caminho: Campanha → Conteúdo → Exclusões → Editar exclusões
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">🚀 Estratégia Avançada: Remarketing em Cascata</h3>
          <p className="text-[var(--gray)] mb-4">
            Segmente diferentes mensagens baseado no comportamento:
          </p>
          <div className="space-y-3">
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-semibold">Lista 1: Visitou página de preços</span>
                <span className="text-white text-sm">Mensagem: "Ainda pensando? Desconto especial!"</span>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold">Lista 2: Visitou 3+ páginas</span>
                <span className="text-white text-sm">Mensagem: "Veja cases de sucesso"</span>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-400 font-semibold">Lista 3: Visitou 1 página só</span>
                <span className="text-white text-sm">Mensagem: "Conheça nossos benefícios"</span>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-semibold">Lista 4: Iniciou form sem enviar</span>
                <span className="text-white text-sm">Mensagem: "Complete seu cadastro - bônus!"</span>
              </div>
            </div>
          </div>
          <p className="text-green-400 text-sm mt-4">💰 Taxa de conversão até 5x maior com mensagem personalizada!</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">COMBO VENCEDOR: PESQUISA + DISPLAY</h4>
              <p className="text-[var(--gray)]">
                <strong className="text-white">Pesquisa</strong> captura quem está buscando ativamente.
                <strong className="text-white"> Display/Remarketing</strong> recupera quem não converteu.
                Juntos, cobrem toda a jornada do cliente!
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-blue-500/20 rounded p-2 text-center">
                  <p className="text-blue-300">Pesquisa: 70% budget</p>
                </div>
                <div className="bg-purple-500/20 rounded p-2 text-center">
                  <p className="text-purple-300">Display: 30% budget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-6': {
    titulo: 'Meta Ads - Facebook Completo',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Facebook Ads: O Gigante que Ainda Funciona!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            Enquanto todos correm pro TikTok, o Facebook continua sendo uma <strong className="text-white">máquina de vendas</strong>.
            E o melhor: o público empresarial (donos de loja, comerciantes) está MUITO ativo aqui!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">2.9B</p>
              <p className="text-[var(--gray)] text-xs">Usuários ativos</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">35+</p>
              <p className="text-[var(--gray)] text-xs">Idade média BR</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">Alto</p>
              <p className="text-[var(--gray)] text-xs">Poder de compra</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📋 Passo a Passo: Criando sua Primeira Campanha</h3>
          <div className="space-y-3">
            {[
              { passo: 1, titulo: 'Acesse o Gerenciador de Anúncios', desc: 'business.facebook.com → Gerenciador de Anúncios', dica: 'Não use o "Impulsionar" do celular!' },
              { passo: 2, titulo: 'Escolha o objetivo correto', desc: 'Para vendas: Leads ou Mensagens (WhatsApp)', dica: 'Mensagens para WhatsApp converte MUITO' },
              { passo: 3, titulo: 'Configure o público', desc: 'Idade 28-55, interesses empresariais, sua cidade', dica: 'Comece local, depois expanda' },
              { passo: 4, titulo: 'Defina o orçamento', desc: 'Mínimo R$30/dia por conjunto de anúncios', dica: 'Menos que isso não gera dados suficientes' },
              { passo: 5, titulo: 'Crie o anúncio', desc: 'Imagem/vídeo + texto + CTA', dica: 'Teste 3 versões diferentes' },
            ].map((item) => (
              <div key={item.passo} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
                  {item.passo}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{item.titulo}</p>
                  <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                  <p className="text-blue-400 text-xs mt-1">💡 {item.dica}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Segmentação EXATA para Donos de Loja</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Interesses para segmentar:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Empreendedorismo', 'Pequenas empresas', 'Gestão empresarial', 'Varejo',
                  'Comércio', 'Ponto de venda', 'MEI', 'Sebrae', 'Contabilidade'
                ].map(interesse => (
                  <span key={interesse} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">{interesse}</span>
                ))}
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Comportamentos:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Donos de pequenas empresas</li>
                <li>• Administradores de página comercial</li>
                <li>• Pessoas que usam Facebook para negócios</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">Dados demográficos:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Idade: <strong className="text-white">28-55 anos</strong></li>
                <li>• Localização: <strong className="text-white">Sua cidade + 30km</strong></li>
                <li>• Idioma: Português</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 5 Textos de Anúncio Prontos</h3>
          <div className="space-y-3">
            {[
              {
                tipo: 'Dor + Solução',
                texto: '😰 Cansado de não saber quanto lucrou esse mês?\n\nO Império Sistemas mostra seu lucro em TEMPO REAL.\n\n✅ Controle de estoque\n✅ Emissão de nota fiscal\n✅ Relatórios automáticos\n\n👉 Clique e fale com um consultor',
                cta: 'Enviar mensagem'
              },
              {
                tipo: 'Pergunta Provocativa',
                texto: '🤔 Você ainda anota vendas no caderninho?\n\nEnquanto você anota, seu concorrente usa um sistema que:\n→ Controla estoque automaticamente\n→ Emite nota em 10 segundos\n→ Mostra o lucro na hora\n\n📱 Quer saber como? Me chama!',
                cta: 'Saiba mais'
              },
              {
                tipo: 'Prova Social',
                texto: '"O sistema já se pagou no primeiro mês!"\n- João, dono de mercadinho\n\n🏪 Mais de 500 comerciantes já usam o Império Sistemas.\n\nQuer o mesmo resultado?\n\n👇 Clique e peça uma demonstração GRÁTIS',
                cta: 'Pedir demonstração'
              },
              {
                tipo: 'Urgência/Medo',
                texto: '⚠️ ATENÇÃO COMERCIANTE!\n\nA multa por não emitir nota fiscal pode chegar a R$50.000!\n\nCom o Império Sistemas você:\n✅ Emite nota em segundos\n✅ Fica 100% regularizado\n✅ Evita problemas com a fiscalização\n\n🛡️ Proteja seu negócio agora!',
                cta: 'Falar com consultor'
              },
              {
                tipo: 'Oferta',
                texto: '🎁 CONDIÇÃO ESPECIAL\n\nImplantação PARCELADA em até 3x!\n\nO que você ganha:\n📦 Controle de estoque completo\n💰 Financeiro organizado\n📋 Emissão de nota fiscal\n📊 Relatórios em tempo real\n\n⏰ Vagas limitadas!\n\n👇 Garanta a sua',
                cta: 'Quero essa oferta'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{idx + 1} {item.tipo}</span>
                  <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">CTA: {item.cta}</span>
                </div>
                <p className="text-white text-sm whitespace-pre-line">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Métricas: O Que Significa Cada Uma</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPM</strong> (custo por mil)</td>
                  <td className="text-center">&gt;R$50</td>
                  <td className="text-center">R$25-50</td>
                  <td className="text-center">&lt;R$25</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong> (taxa de clique)</td>
                  <td className="text-center">&lt;0.5%</td>
                  <td className="text-center">0.5-1%</td>
                  <td className="text-center">&gt;1%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong> (custo por clique)</td>
                  <td className="text-center">&gt;R$5</td>
                  <td className="text-center">R$2-5</td>
                  <td className="text-center">&lt;R$2</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPL</strong> (custo por lead)</td>
                  <td className="text-center">&gt;R$50</td>
                  <td className="text-center">R$20-50</td>
                  <td className="text-center">&lt;R$20</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">ROAS</strong> (retorno)</td>
                  <td className="text-center">&lt;2x</td>
                  <td className="text-center">2-4x</td>
                  <td className="text-center">&gt;4x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Estratégia de Orçamento</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-sm font-semibold">TESTE</p>
              <p className="text-2xl font-bold text-white">R$30</p>
              <p className="text-[var(--gray)] text-xs">por dia / 7 dias</p>
              <p className="text-yellow-400 text-xs mt-2">Total: R$210</p>
            </div>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4 text-center">
              <p className="text-green-400 text-sm font-semibold">ESCALA</p>
              <p className="text-2xl font-bold text-white">R$50</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-green-400 text-xs mt-2">Total: R$1.500/mês</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <p className="text-purple-400 text-sm font-semibold">AGRESSIVO</p>
              <p className="text-2xl font-bold text-white">R$100+</p>
              <p className="text-[var(--gray)] text-xs">por dia</p>
              <p className="text-purple-400 text-xs mt-2">Total: R$3.000+/mês</p>
            </div>
          </div>
          <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
            <p className="text-[var(--gold)] font-semibold">📈 Regra de Escala:</p>
            <p className="text-[var(--gray)] text-sm">
              Se o anúncio está com CPL bom (&lt;R$30), aumente o orçamento em <strong className="text-white">20% a cada 3 dias</strong>.
              Nunca dobre de uma vez - o algoritmo perde a otimização!
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ 5 Erros que Queimam seu Dinheiro</h3>
          <div className="space-y-2">
            {[
              { erro: 'Usar "Impulsionar Publicação" do celular', fix: 'Use o Gerenciador de Anúncios (mais opções)' },
              { erro: 'Público muito amplo (Brasil todo)', fix: 'Comece pela sua cidade + 30km' },
              { erro: 'Não instalar o Pixel', fix: 'Pixel é obrigatório para remarketing' },
              { erro: 'Mexer na campanha todo dia', fix: 'Espere 3-5 dias para o algoritmo aprender' },
              { erro: 'Texto de anúncio muito longo', fix: 'Seja direto: dor, solução, CTA' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex gap-4">
                <div>
                  <p className="text-red-400 text-sm">❌ {item.erro}</p>
                  <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA MATADORA: CAMPANHA DE MENSAGENS</h4>
              <p className="text-[var(--gray)] mb-3">
                Para vender sistema, a melhor estratégia é <strong className="text-white">Campanha de Mensagens para WhatsApp</strong>:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. Objetivo: <strong className="text-white">Mensagens</strong></li>
                <li>2. Destino: <strong className="text-white">WhatsApp</strong></li>
                <li>3. Mensagem automática: "Olá! Vi seu anúncio e quero saber mais sobre o sistema"</li>
                <li>4. Você responde na hora e já marca demonstração!</li>
              </ol>
              <p className="text-green-400 text-sm mt-2">💰 CPL médio: R$8-15 (muito mais barato que leads!)</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-7': {
    titulo: 'Meta Ads - Instagram',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Instagram Ads: O Poder do Visual!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            O Instagram é <strong className="text-white">extremamente visual</strong> e exige criativos de alta qualidade.
            Mas quando bem feito, é uma das plataformas que mais converte para vendas de sistemas!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-pink-400">2B</p>
              <p className="text-[var(--gray)] text-xs">Usuários ativos</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">25-45</p>
              <p className="text-[var(--gray)] text-xs">Idade principal</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">83%</p>
              <p className="text-[var(--gray)] text-xs">Descobrem produtos</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📍 Posicionamentos e Formatos</h3>
          <div className="space-y-3">
            {[
              { local: 'Feed', dim: '1080x1080 ou 1080x1350', desc: 'Posts entre conteúdos. Melhor para informação detalhada.', cpm: 'CPM: R$20-35' },
              { local: 'Stories', dim: '1080x1920 (9:16)', desc: 'Tela cheia, urgência. MELHOR para CTA direto!', cpm: 'CPM: R$15-25' },
              { local: 'Reels', dim: '1080x1920 (9:16)', desc: 'Vídeos curtos. MAIOR alcance e engajamento!', cpm: 'CPM: R$10-20' },
              { local: 'Explorar', dim: 'Variável', desc: 'Aba descoberta. Alcança público novo interessado.', cpm: 'CPM: R$25-40' },
            ].map(item => (
              <div key={item.local} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-400 font-semibold">{item.local}</span>
                  <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">{item.dim}</span>
                </div>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                <p className="text-green-400 text-xs mt-1">{item.cpm}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 6 Copies Prontas para Instagram</h3>
          <div className="space-y-3">
            {[
              {
                tipo: 'Carrossel Educativo',
                texto: '📊 5 SINAIS de que sua loja precisa de um sistema:\n\n1. Você não sabe o lucro real do mês\n2. Já perdeu venda por falta de estoque\n3. Usa caderninho ou planilha\n4. Demora pra fechar o caixa\n5. Tem medo da fiscalização\n\nSe marcou 2 ou mais... tá na hora de mudar!\n\n👉 Link na bio para demonstração GRÁTIS',
                cta: 'Saiba mais'
              },
              {
                tipo: 'Stories Direto',
                texto: '🔥 COMERCIANTE!\n\nPara de perder tempo com:\n❌ Planilhas\n❌ Caderninho\n❌ Calculadora\n\nE começa a usar um sistema que faz TUDO por você!\n\n⬆️ ARRASTA PRA CIMA',
                cta: 'Arraste para cima'
              },
              {
                tipo: 'Reels Hook',
                texto: 'POV: Você é dono de loja e ainda usa caderninho...\n\n*corte*\n\nEnquanto isso, seu concorrente:\n✅ Emite nota em 10 segundos\n✅ Sabe o lucro em tempo real\n✅ Controla tudo pelo celular\n\n💬 Comenta "SISTEMA" que te explico',
                cta: 'Comentar'
              },
              {
                tipo: 'Antes x Depois',
                texto: 'ANTES do Império Sistemas:\n😰 3 horas pra fechar o caixa\n😰 Estoque sempre errado\n😰 Não sabia se tinha lucro\n\nDEPOIS do Império Sistemas:\n😎 Caixa fecha em 5 minutos\n😎 Estoque em tempo real\n😎 Lucro na palma da mão\n\n🔗 Link na bio!',
                cta: 'Ver mais'
              },
              {
                tipo: 'Prova Social',
                texto: '"Economizei 2 horas por dia depois que comecei a usar!"\n- Maria, dona de loja de roupas\n\n🏪 +500 comerciantes já transformaram seus negócios.\n\nQuer ser o próximo?\n\n📲 Chama no Direct!',
                cta: 'Enviar mensagem'
              },
              {
                tipo: 'Oferta Especial',
                texto: '🎁 SÓ ESSA SEMANA!\n\nImplantação GRÁTIS para novos clientes!\n\nVocê ganha:\n✅ Configuração completa\n✅ Treinamento da equipe\n✅ Suporte prioritário 30 dias\n\n⏰ Últimas 5 vagas!\n\n👇 Comente "EU QUERO" agora!',
                cta: 'Comentar'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{idx + 1} {item.tipo}</span>
                  <span className="text-xs bg-pink-500/30 text-pink-300 px-2 py-1 rounded">CTA: {item.cta}</span>
                </div>
                <p className="text-white text-sm whitespace-pre-line">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Segmentação para Comerciantes no Instagram</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Interesses (selecione 5-8):</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Empreendedorismo', 'Pequenos negócios', 'Varejo', 'Comércio',
                  'Gestão de negócios', 'E-commerce', 'Marketing digital', 'Sebrae'
                ].map(interesse => (
                  <span key={interesse} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">{interesse}</span>
                ))}
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Comportamentos:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Proprietários de pequenas empresas</li>
                <li>• Administradores de páginas do Facebook</li>
                <li>• Compradores engajados</li>
                <li>• Pessoas que usam ferramentas de negócios</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-orange-400 font-semibold mb-2">Configuração recomendada:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Idade: <strong className="text-white">25-50 anos</strong></li>
                <li>• Localização: <strong className="text-white">Sua cidade + 25km</strong></li>
                <li>• Posicionamento: <strong className="text-white">Stories + Reels (melhor custo)</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">📊 Tabela de Métricas - Instagram</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPM</strong></td>
                  <td className="text-center">&gt;R$40</td>
                  <td className="text-center">R$20-40</td>
                  <td className="text-center">&lt;R$20</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong> (Stories)</td>
                  <td className="text-center">&lt;0.3%</td>
                  <td className="text-center">0.3-0.8%</td>
                  <td className="text-center">&gt;0.8%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CTR</strong> (Feed)</td>
                  <td className="text-center">&lt;0.8%</td>
                  <td className="text-center">0.8-1.5%</td>
                  <td className="text-center">&gt;1.5%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPC</strong></td>
                  <td className="text-center">&gt;R$4</td>
                  <td className="text-center">R$1.5-4</td>
                  <td className="text-center">&lt;R$1.5</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">CPL</strong></td>
                  <td className="text-center">&gt;R$40</td>
                  <td className="text-center">R$15-40</td>
                  <td className="text-center">&lt;R$15</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Engajamento</strong></td>
                  <td className="text-center">&lt;2%</td>
                  <td className="text-center">2-5%</td>
                  <td className="text-center">&gt;5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🎨 Checklist do Criativo Perfeito</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { item: 'Hook nos primeiros 0.5s', desc: 'Texto grande ou movimento que prende' },
              { item: 'Rosto humano aparecendo', desc: 'Gera 38% mais engajamento' },
              { item: 'Cores vibrantes', desc: 'Contraste com o fundo do Instagram' },
              { item: 'Texto legível', desc: 'Fonte grande, máx 6 palavras por tela' },
              { item: 'Logo discreto', desc: 'Canto inferior, não atrapalha' },
              { item: 'CTA visual', desc: 'Seta, botão ou animação no final' },
              { item: 'Formato correto', desc: '9:16 para Stories/Reels, 1:1 para Feed' },
              { item: 'Legendas/Captions', desc: '85% assistem sem som!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <div className="flex gap-2 items-start">
                  <span className="text-green-400">✓</span>
                  <div>
                    <span className="text-white text-sm font-semibold">{item.item}</span>
                    <p className="text-[var(--gray)] text-xs">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ 5 Erros que Matam Anúncios no Instagram</h3>
          <div className="space-y-2">
            {[
              { erro: 'Usar foto de banco de imagens genérica', fix: 'Use fotos reais suas ou do produto' },
              { erro: 'Texto pequeno demais (não lê no celular)', fix: 'Fonte grande, máximo 6 palavras' },
              { erro: 'Não colocar legenda no vídeo', fix: '85% assistem no mudo - SEMPRE legendas' },
              { erro: 'CTA fraco tipo "Saiba mais"', fix: 'Use CTAs diretos: "Chama no Direct", "Comenta EU QUERO"' },
              { erro: 'Mesmo criativo rodando mais de 15 dias', fix: 'Troque criativos a cada 10-15 dias' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">🎬 Estrutura de Vídeo para Reels Ads (15-30s)</h3>
          <div className="space-y-3">
            {[
              { seg: '0-2s', nome: 'HOOK', desc: 'Frase impactante ou problema do público', exemplo: '"Comerciante, você ainda usa caderninho?"' },
              { seg: '2-8s', nome: 'PROBLEMA', desc: 'Desenvolve a dor, gera identificação', exemplo: 'Mostrar a bagunça de papéis, estresse...' },
              { seg: '8-18s', nome: 'SOLUÇÃO', desc: 'Apresenta o sistema resolvendo', exemplo: 'Tela do sistema funcionando, tudo organizado' },
              { seg: '18-25s', nome: 'BENEFÍCIOS', desc: 'Lista 2-3 benefícios principais', exemplo: 'Controle, nota fiscal, relatórios' },
              { seg: '25-30s', nome: 'CTA', desc: 'Chamada para ação clara', exemplo: '"Clica no link e fala comigo!"' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-pink-500/30 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-pink-400 text-xs font-mono">{item.seg}</span>
                  <span className="text-white text-xs font-bold">{item.nome}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{item.desc}</p>
                  <p className="text-[var(--gray)] text-xs italic">Ex: {item.exemplo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA MATADORA: DIRECT + STORIES</h4>
              <p className="text-[var(--gray)] mb-3">
                A combinação que mais converte para vender sistemas:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. Objetivo: <strong className="text-white">Mensagens para Instagram Direct</strong></li>
                <li>2. Posicionamento: <strong className="text-white">Apenas Stories</strong> (CPM mais barato)</li>
                <li>3. Criativo: Vídeo seu falando + texto na tela</li>
                <li>4. CTA: "Arraste para cima e me manda um OI"</li>
                <li>5. Resposta automática configurada no Direct</li>
              </ol>
              <p className="text-green-400 text-sm mt-2">💰 CPL médio: R$5-12 (mais barato que qualquer outro formato!)</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-2': {
    titulo: 'Kwai Orgânico',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Kwai: O Primo do TikTok</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            O Kwai funciona muito parecido com TikTok, mas tem um público diferente:
            <strong className="text-white"> mais velho, mais regional e menos saturado</strong>!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Vantagens do Kwai</h3>
          <div className="space-y-2">
            {[
              'Menos criadores = menos concorrência',
              'Público 30-50 anos (donos de negócio!)',
              'Forte em cidades do interior',
              'Algoritmo favorece novos criadores',
              'Mesmo vídeo pode viralizar de novo',
            ].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎬 O Que Postar</h3>
          <div className="space-y-3">
            {[
              { tipo: 'Dicas Práticas', exemplo: '"3 coisas que todo dono de loja precisa saber"' },
              { tipo: 'Problemas e Soluções', exemplo: '"Você perde dinheiro sem saber? Olha isso..."' },
              { tipo: 'Bastidores', exemplo: 'Mostrando o sistema funcionando em uma loja real' },
              { tipo: 'Depoimentos', exemplo: 'Cliente contando como o sistema ajudou' },
            ].map(item => (
              <div key={item.tipo} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{item.tipo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.exemplo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">⏰ Frequência e Horários</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-400">2-3x</p>
              <p className="text-[var(--gray)] text-sm">por semana (mínimo)</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-400">19h</p>
              <p className="text-[var(--gray)] text-sm">melhor horário</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🏷️ Hashtags Recomendadas</h3>
          <div className="flex flex-wrap gap-2">
            {['#empreendedor', '#comercio', '#lojista', '#vendas', '#gestao', '#negocios', '#lucro', '#empresario', '#dica'].map(tag => (
              <span key={tag} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">REPOST FUNCIONA!</h4>
              <p className="text-[var(--gray)]">
                No Kwai, você pode <strong className="text-white">repostar vídeos antigos</strong> e eles podem viralizar de novo!
                Diferente do TikTok, o algoritmo dá nova chance para conteúdos republicados.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-3': {
    titulo: 'YouTube - Estratégias',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">YouTube: Conteúdo que Dura</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Diferente de TikTok e Instagram, vídeos no YouTube continuam gerando views
            <strong className="text-white"> por meses e até anos</strong>. É um investimento de longo prazo!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📹 Tipos de Vídeo</h3>
          <div className="space-y-3">
            {[
              { tipo: 'Shorts (até 60 seg)', desc: 'Alcance rápido, formato vertical. Igual TikTok.', freq: '3-5x por semana' },
              { tipo: 'Vídeos Médios (5-10 min)', desc: 'Tutoriais, demonstrações do sistema.', freq: '1-2x por semana' },
              { tipo: 'Vídeos Longos (15-30 min)', desc: 'Cursos, reviews completos. Autoridade!', freq: '1x por mês' },
            ].map(item => (
              <div key={item.tipo} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{item.tipo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
                <p className="text-[var(--gray)] text-xs mt-1">📅 Frequência: {item.freq}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🔍 SEO para YouTube</h3>
          <div className="space-y-2">
            {[
              { elemento: 'Título', dica: 'Palavra-chave no início. Ex: "Sistema para Loja: Como Escolher o Melhor"' },
              { elemento: 'Descrição', dica: 'Primeiras 2 linhas são cruciais. Inclua link do WhatsApp!' },
              { elemento: 'Tags', dica: 'Use variações da palavra-chave principal' },
              { elemento: 'Thumbnail', dica: 'Rosto + texto grande + cores vibrantes' },
              { elemento: 'Capítulos', dica: 'Divida o vídeo em seções. Google ama isso!' },
            ].map(item => (
              <div key={item.elemento} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-green-400 font-semibold">{item.elemento}:</span>
                <span className="text-[var(--gray)] text-sm ml-2">{item.dica}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">💡 Ideias de Vídeos</h3>
          <div className="space-y-2">
            {[
              'Como escolher um sistema de gestão para sua loja',
              'Tour completo pelo Império Sistemas',
              '5 erros que quebram lojas pequenas',
              'Antes e Depois: loja organizada com sistema',
              'Quanto custa um sistema de gestão? Vale a pena?',
              'Como emitir nota fiscal eletrônica (passo a passo)',
            ].map((ideia, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">{idx + 1}. {ideia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📊 Métricas Importantes</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { metrica: 'CTR', desc: 'Taxa de clique na thumbnail' },
              { metrica: 'Retenção', desc: '% do vídeo que assistem' },
              { metrica: 'Watch Time', desc: 'Tempo total assistido' },
              { metrica: 'Inscritos', desc: 'Novos por vídeo' },
            ].map(item => (
              <div key={item.metrica} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                <span className="text-orange-400 font-semibold">{item.metrica}</span>
                <p className="text-[var(--gray)] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">SHORTS + LONGO = COMBO PERFEITO</h4>
              <p className="text-[var(--gray)]">
                Poste Shorts para atrair público novo, e vídeos longos para converter em leads.
                <strong className="text-white"> No Short, chame para o vídeo completo no canal!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-4': {
    titulo: 'Facebook - Grupos e Página',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Facebook: A Mina de Ouro Esquecida!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            Enquanto todos focam em TikTok e Instagram, o Facebook continua sendo onde
            <strong className="text-white"> empresários e donos de negócio realmente estão</strong>. Menos concorrência, mais resultados!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">2.9B</p>
              <p className="text-[var(--gray)] text-xs">Usuários ativos</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">35-55</p>
              <p className="text-[var(--gray)] text-xs">Idade decisores</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">1.8B</p>
              <p className="text-[var(--gray)] text-xs">Em grupos</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📄 Sua Página Profissional - Setup Completo</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <span className="text-blue-400 font-semibold mb-2 block">Checklist da Página Perfeita:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {[
                  'Foto de perfil: sua foto profissional',
                  'Capa: benefícios do sistema',
                  'Descrição: com link do WhatsApp',
                  'Botão CTA: "Enviar mensagem"',
                  'Horário de funcionamento',
                  'Categoria: Software/Tecnologia',
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-[var(--gray)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 6 Posts Prontos para sua Página</h3>
          <div className="space-y-3">
            {[
              {
                tipo: 'Dica Rápida',
                texto: '💡 DICA DO DIA para LOJISTAS:\n\nVocê sabia que 70% dos comerciantes não sabem seu lucro REAL?\n\nO segredo está em controlar TODAS as entradas e saídas - não só as vendas.\n\n✅ Despesas fixas (aluguel, luz, internet)\n✅ Custo dos produtos\n✅ Retiradas pessoais\n\nSó assim você sabe quanto SOBRA de verdade!\n\n💬 Comente "EU" se você quer uma planilha grátis para calcular!',
                formato: 'Imagem com texto'
              },
              {
                tipo: 'Antes x Depois',
                texto: '📊 ANTES: 3 horas para fechar o caixa\n📊 DEPOIS: 5 minutos\n\nIsso aconteceu com o João, dono de mercadinho aqui em [cidade].\n\nEle usava caderninho e calculadora. Hoje usa um sistema que:\n→ Registra cada venda automaticamente\n→ Controla o estoque em tempo real\n→ Mostra o lucro na hora\n\nQuer saber como? Me chama no inbox! 📲',
                formato: 'Carrossel'
              },
              {
                tipo: 'Enquete',
                texto: '🤔 ENQUETE DO DIA:\n\nComo você controla o estoque da sua loja hoje?\n\n📓 Caderninho\n📊 Planilha Excel\n💻 Sistema\n🤷 Não controlo\n\nComente o emoji que representa você!\n\n(Quem comentar 📓 ou 🤷, tenho uma dica especial no inbox... 😉)',
                formato: 'Post simples'
              },
              {
                tipo: 'Depoimento',
                texto: '"Eu gastava 2 horas por dia só organizando papéis. Agora faço em 10 minutos!"\n\n⭐⭐⭐⭐⭐\n\n- Maria Silva, Loja de Roupas Elegance\n\nA Maria é cliente há 8 meses e já:\n✅ Dobrou o controle sobre o negócio\n✅ Reduziu perdas por estoque errado\n✅ Nunca mais teve problema com nota fiscal\n\nQuer ter o mesmo resultado? Link na bio! 🔗',
                formato: 'Imagem do cliente'
              },
              {
                tipo: 'Educativo',
                texto: '⚠️ ATENÇÃO COMERCIANTE!\n\n5 sinais de que sua loja está PERDENDO dinheiro:\n\n1️⃣ Você não sabe quanto vendeu ontem\n2️⃣ Produtos vencem ou ficam encalhados\n3️⃣ O caixa nunca "bate"\n4️⃣ Clientes reclamam de preço errado\n5️⃣ Não consegue tirar férias\n\nMarcou 2 ou mais? Tá na hora de organizar!\n\n👇 Comente "QUERO AJUDA" que entro em contato!',
                formato: 'Post com ícones'
              },
              {
                tipo: 'Oferta',
                texto: '🎁 PROMOÇÃO RELÂMPAGO!\n\nSó hoje: Demonstração GRATUITA + bônus exclusivo!\n\nVocê ganha:\n✅ Tour completo pelo sistema\n✅ Análise gratuita do seu negócio\n✅ Desconto especial se fechar hoje\n\n⏰ Válido só para quem comentar "EU QUERO" nos próximos 60 minutos!\n\n👇👇👇',
                formato: 'Imagem chamativa'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{idx + 1} {item.tipo}</span>
                  <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded">{item.formato}</span>
                </div>
                <p className="text-white text-sm whitespace-pre-line">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">👥 Grupos: A Mina de Ouro!</h3>
          <p className="text-[var(--gray)] mb-4">
            Grupos de Facebook são onde <strong className="text-white">comerciantes pedem recomendações e tiram dúvidas</strong>.
            Estar lá é essencial!
          </p>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Grupos para participar:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  '"Comerciantes de [sua cidade]"',
                  '"Empreendedores de [sua cidade]"',
                  '"Lojistas do Brasil"',
                  '"MEI - Microempreendedor Individual"',
                  '"Donos de Pet Shop"',
                  '"Donos de Mercadinho"',
                  '"Lojistas de Roupas"',
                  '"Varejistas [sua cidade]"',
                ].map((grupo, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <span className="text-green-400">→</span>
                    <span className="text-[var(--gray)]">{grupo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">💬 Scripts para Responder em Grupos</h3>
          <div className="space-y-3">
            {[
              {
                situacao: 'Alguém pergunta sobre sistema de gestão',
                resposta: 'Opa! Trabalho com isso há [X] anos. Posso te dar umas dicas se quiser! Qual seu tipo de negócio? Assim consigo ser mais específico.'
              },
              {
                situacao: 'Alguém reclama de desorganização',
                resposta: 'Te entendo demais! Isso é mais comum do que parece. O primeiro passo é separar dinheiro do negócio do pessoal. Quer que eu mande no inbox um checklist que ajuda nisso?'
              },
              {
                situacao: 'Alguém pede indicação de sistema',
                resposta: 'Depende muito do seu tipo de negócio e do que você precisa! Posso te ajudar a identificar. Me chama no inbox que conversamos melhor sem poluir o grupo.'
              },
              {
                situacao: 'Alguém fala de nota fiscal',
                resposta: 'Nota fiscal é essencial hoje em dia! A multa por não emitir pode chegar a R$50.000 dependendo do estado. Se precisar de ajuda para entender como funciona, me chama!'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-semibold text-sm mb-2">Quando: {item.situacao}</p>
                <p className="text-white text-sm italic">"{item.resposta}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📅 Calendário Semanal de Posts</h3>
          <div className="space-y-2">
            {[
              { dia: 'Segunda', pagina: 'Dica da semana', grupos: 'Responder 5 posts', horario: '10h' },
              { dia: 'Terça', pagina: 'Case/Depoimento', grupos: 'Comentar em 3 grupos', horario: '14h' },
              { dia: 'Quarta', pagina: 'Enquete/Interação', grupos: 'Responder dúvidas', horario: '11h' },
              { dia: 'Quinta', pagina: 'Conteúdo educativo', grupos: 'Postar dica útil', horario: '15h' },
              { dia: 'Sexta', pagina: 'Oferta/CTA', grupos: 'Monitorar menções', horario: '10h' },
            ].map((item, idx) => (
              <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 grid grid-cols-4 gap-2 text-sm">
                <span className="text-orange-400 font-semibold">{item.dia}</span>
                <span className="text-[var(--gray)]">Página: {item.pagina}</span>
                <span className="text-[var(--gray)]">Grupos: {item.grupos}</span>
                <span className="text-blue-400">{item.horario}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Erros Fatais em Grupos</h3>
          <div className="space-y-2">
            {[
              { erro: 'Entrar e já postar propaganda', fix: 'Participe por 1 semana ANTES de mencionar o sistema' },
              { erro: 'Mandar mensagem privada sem contexto', fix: 'Só chame no inbox quem interagiu com você' },
              { erro: 'Copiar/colar a mesma resposta sempre', fix: 'Personalize cada interação' },
              { erro: 'Ignorar as regras do grupo', fix: 'Leia as regras ANTES de postar' },
              { erro: 'Desaparecer depois de captar lead', fix: 'Continue participando para manter autoridade' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">🚀 Estratégia Avançada: Seu Próprio Grupo</h3>
          <div className="space-y-4">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <p className="text-pink-400 font-semibold mb-2">Passo a passo para criar:</p>
              <ol className="text-[var(--gray)] text-sm space-y-2">
                <li><strong className="text-white">1.</strong> Nome: "Dicas para Comerciantes de [Cidade]"</li>
                <li><strong className="text-white">2.</strong> Descrição: Focado em ajudar lojistas a venderem mais</li>
                <li><strong className="text-white">3.</strong> Convide 20 comerciantes que você conhece</li>
                <li><strong className="text-white">4.</strong> Poste 3-5 dicas úteis por semana</li>
                <li><strong className="text-white">5.</strong> Faça perguntas para gerar engajamento</li>
                <li><strong className="text-white">6.</strong> Depois de 1 mês, mencione o sistema sutilmente</li>
              </ol>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">Benefícios:</p>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Você é visto como AUTORIDADE</li>
                <li>• Leads vêm até você (não precisa correr atrás)</li>
                <li>• Controle total sobre o conteúdo</li>
                <li>• Lista de potenciais clientes segmentada</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">HACK: USE O FACEBOOK PARA AQUECER LEADS</h4>
              <p className="text-[var(--gray)] mb-3">
                Antes de fazer uma demonstração, mande o lead para sua página do Facebook:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. <strong className="text-white">"Dá uma olhada na nossa página"</strong></li>
                <li>2. Ele vê os depoimentos, posts educativos, cases...</li>
                <li>3. Chega na demonstração já <strong className="text-white">75% convencido</strong>!</li>
              </ol>
              <p className="text-green-400 text-sm mt-2">💰 Essa técnica aumenta a taxa de fechamento em até 40%!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-5': {
    titulo: 'Instagram - Reels e Stories',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Reels + Stories: A Dupla Imbatível!</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Reels</strong> atraem seguidores novos. <strong className="text-white">Stories</strong> convertem seguidores em clientes.
            Juntos, formam a estratégia mais poderosa do Instagram!
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-pink-400">200%</p>
              <p className="text-[var(--gray)] text-xs">Mais alcance Reels</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">500M</p>
              <p className="text-[var(--gray)] text-xs">Veem Stories/dia</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">58%</p>
              <p className="text-[var(--gray)] text-xs">Compram via Stories</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🎬 10 Scripts de Reels Prontos para Usar</h3>
          <div className="space-y-3">
            {[
              {
                num: 1,
                tipo: 'Dor + Agitação',
                hook: '"Se você é dono de loja e ainda usa caderninho..."',
                script: 'HOOK: "Se você é dono de loja e ainda usa caderninho..."\n\nMostra papel bagunçado\n\n"...eu sinto muito em te dizer..."\n\nCorte dramático\n\n"...você está PERDENDO dinheiro sem saber!"\n\nMostra sistema organizado\n\n"Quer saber como resolver? Comenta SISTEMA!"',
                duracao: '15s'
              },
              {
                num: 2,
                tipo: 'Lista Educativa',
                hook: '"3 sinais de que sua loja precisa de um sistema"',
                script: '📌 "3 sinais de que sua loja precisa de um sistema:"\n\n1️⃣ Você não sabe o lucro real\n(mostra calculadora)\n\n2️⃣ Estoque sempre dá errado\n(mostra prateleira)\n\n3️⃣ Demora pra fechar o caixa\n(mostra relógio)\n\n"Marcou algum? Salva esse vídeo!"',
                duracao: '20s'
              },
              {
                num: 3,
                tipo: 'POV Viral',
                hook: '"POV: Você descobriu que pode emitir nota em 10 segundos"',
                script: 'Começa com cara de choque\n\nTexto: "POV: Você descobriu que pode emitir nota em 10 segundos"\n\n*Transição*\n\nMostra tela do sistema emitindo nota\n\nTexto: "E você gastava 10 MINUTOS antes"\n\nFinal: "Quer saber mais? Link na bio!"',
                duracao: '12s'
              },
              {
                num: 4,
                tipo: 'Antes x Depois',
                hook: '"Minha loja ANTES vs DEPOIS do sistema"',
                script: 'ANTES:\n- Papéis por todo lado\n- Planilha confusa\n- Cara de estresse\n\n*Transição com áudio viral*\n\nDEPOIS:\n- Tela limpa do sistema\n- Relatórios organizados\n- Cara de satisfação\n\n"Quer essa transformação? Me chama!"',
                duracao: '15s'
              },
              {
                num: 5,
                tipo: 'Tutorial Flash',
                hook: '"Como saber seu lucro REAL em 30 segundos"',
                script: '"Como saber seu lucro REAL em 30 segundos:"\n\n1. Abre o sistema\n(mostra tela)\n\n2. Clica em Relatórios\n(mostra clique)\n\n3. Seleciona DRE\n(mostra seleção)\n\n"PRONTO! Seu lucro aparece aqui!"\n\n"Fácil né? Salva pra não esquecer!"',
                duracao: '30s'
              },
              {
                num: 6,
                tipo: 'Resposta de Objeção',
                hook: '"Sistema é muito caro pra minha loja pequena"',
                script: '"Sistema é muito caro pra minha loja pequena"\n\nOlha pra câmera\n\n"Deixa eu te mostrar uma conta:"\n\nTexto: "Sistema: R$300/mês"\nTexto: "Você economiza: 2h/dia x R$50/hora = R$3.000"\n\n"Não é gasto. É INVESTIMENTO."\n\n"Concorda? Comenta aí!"',
                duracao: '18s'
              },
              {
                num: 7,
                tipo: 'Storytelling',
                hook: '"A história do João que quase fechou a loja"',
                script: '"Deixa eu te contar a história do João..."\n\nEle tinha uma loja há 5 anos\nMas não controlava nada\nUm dia descobriu que estava no PREJUÍZO\n\n*Pausa dramática*\n\nHoje, com sistema:\n✅ Lucro aumentou 40%\n✅ Controla tudo pelo celular\n✅ Tira férias tranquilo\n\n"Quer ser o próximo João?"',
                duracao: '25s'
              },
              {
                num: 8,
                tipo: 'Mito vs Realidade',
                hook: '"O que você acha vs O que realmente acontece"',
                script: 'MITO: "Sistema é só pra loja grande"\n❌ (X vermelho)\n\nREALIDADE: "Loja pequena que mais precisa!"\n✅ (check verde)\n\nMITO: "É muito difícil de usar"\n❌\n\nREALIDADE: "Se você usa WhatsApp, usa o sistema"\n✅\n\n"Qual outro mito você já ouviu? Comenta!"',
                duracao: '20s'
              },
              {
                num: 9,
                tipo: 'Comparação',
                hook: '"Loja sem sistema vs Loja com sistema"',
                script: 'Tela dividida:\n\nSEM SISTEMA:\n😰 Não sabe o estoque\n😰 Perde vendas\n😰 Caixa não fecha\n\nCOM SISTEMA:\n😎 Estoque em tempo real\n😎 Nunca falta produto\n😎 Caixa fecha sozinho\n\n"Qual lado você quer estar?\nComenta 1 ou 2!"',
                duracao: '15s'
              },
              {
                num: 10,
                tipo: 'CTA Direto',
                hook: '"Você que está pensando em organizar sua loja..."',
                script: '"Você que está pensando em organizar sua loja..."\n\nOlha pra câmera\n\n"Para de pensar e FALA COMIGO!"\n\n✅ Demonstração grátis\n✅ Sem compromisso\n✅ Vou te mostrar tudo\n\n"Link na bio ou comenta EU QUERO!"\n\n"Te espero!"',
                duracao: '12s'
              },
            ].map((item) => (
              <div key={item.num} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 font-semibold">#{item.num} {item.tipo}</span>
                  <span className="text-xs bg-pink-500/30 text-pink-300 px-2 py-1 rounded">{item.duracao}</span>
                </div>
                <p className="text-blue-400 text-sm mb-2">Hook: {item.hook}</p>
                <p className="text-white text-xs whitespace-pre-line bg-black/20 p-3 rounded">{item.script}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📱 Estratégia de Stories - Sequência que Converte</h3>
          <p className="text-[var(--gray)] mb-4">
            Stories não são aleatórios! Siga essa <strong className="text-white">sequência de 5 stories</strong> para criar conexão e vender:
          </p>
          <div className="space-y-3">
            {[
              { num: 1, tipo: 'ATENÇÃO', desc: 'Pergunta ou fato impactante', exemplo: '"Você sabe quanto REALMENTE lucrou esse mês?" + enquete SIM/NÃO', cor: 'pink' },
              { num: 2, tipo: 'CONEXÃO', desc: 'Bastidores ou dia a dia', exemplo: 'Você trabalhando, tomando café, indo atender cliente', cor: 'purple' },
              { num: 3, tipo: 'VALOR', desc: 'Dica rápida ou insight', exemplo: '"Uma dica: separe o dinheiro da loja do pessoal HOJE!"', cor: 'blue' },
              { num: 4, tipo: 'PROVA', desc: 'Depoimento ou resultado', exemplo: 'Print de mensagem de cliente satisfeito', cor: 'green' },
              { num: 5, tipo: 'CTA', desc: 'Chamada para ação', exemplo: '"Quer ter esse resultado? Me manda um OI aqui!" + sticker de DM', cor: 'orange' },
            ].map((item) => (
              <div key={item.num} className={`bg-${item.cor}-500/10 border border-${item.cor}-500/30 rounded-lg p-4`}>
                <div className="flex gap-3 items-start">
                  <div className={`w-8 h-8 bg-${item.cor}-500/30 rounded-full flex items-center justify-center text-${item.cor}-400 font-bold flex-shrink-0`}>
                    {item.num}
                  </div>
                  <div>
                    <span className={`text-${item.cor}-400 font-semibold`}>{item.tipo}</span>
                    <p className="text-[var(--gray)] text-sm">{item.desc}</p>
                    <p className="text-white text-xs mt-1 italic">Ex: {item.exemplo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">🙈 Opções para Quem Tem Vergonha de Aparecer</h3>
          <div className="space-y-3">
            {[
              { metodo: 'Tela do sistema', desc: 'Grave a tela do computador/celular mostrando o sistema funcionando', dificuldade: 'Fácil' },
              { metodo: 'Mãos + voz', desc: 'Mostre só as mãos digitando/usando o sistema, com sua voz explicando', dificuldade: 'Fácil' },
              { metodo: 'Texto na tela', desc: 'Use CapCut para colocar texto animado. Não precisa falar nada!', dificuldade: 'Fácil' },
              { metodo: 'Avatar/Personagem', desc: 'Use apps como Plotagon ou Animaker para criar vídeos animados', dificuldade: 'Médio' },
              { metodo: 'Apareça aos poucos', desc: 'Comece mostrando só a voz, depois mãos, depois meio rosto...', dificuldade: 'Progressivo' },
            ].map((item, idx) => (
              <div key={idx} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cyan-400 font-semibold">{item.metodo}</span>
                  <span className="text-xs bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded">{item.dificuldade}</span>
                </div>
                <p className="text-[var(--gray)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📅 Calendário Completo (7 dias)</h3>
          <div className="space-y-2">
            {[
              { dia: 'Segunda', reels: 'Dica da semana (educativo)', stories: '5 stories: rotina + dica', horario: '11h / 19h' },
              { dia: 'Terça', reels: '-', stories: 'Enquete + bastidores', horario: '12h / 20h' },
              { dia: 'Quarta', reels: 'Tutorial ou POV', stories: 'Caixinha de perguntas', horario: '10h / 18h' },
              { dia: 'Quinta', reels: '-', stories: 'Depoimento + repost', horario: '14h / 21h' },
              { dia: 'Sexta', reels: 'Trend/Humor (leve)', stories: 'Oferta/CTA direto', horario: '11h / 19h' },
              { dia: 'Sábado', reels: 'Antes x Depois', stories: 'Bastidores fim de semana', horario: '10h / 17h' },
              { dia: 'Domingo', reels: '-', stories: 'Reflexão + preview da semana', horario: '18h' },
            ].map((item, idx) => (
              <div key={idx} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 grid grid-cols-4 gap-2 text-sm">
                <span className="text-orange-400 font-semibold">{item.dia}</span>
                <span className="text-[var(--gray)]">{item.reels}</span>
                <span className="text-[var(--gray)]">{item.stories}</span>
                <span className="text-blue-400 text-xs">{item.horario}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-pink-400 mb-4">🏷️ Hashtags Estratégicas por Categoria</h3>
          <div className="space-y-4">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
              <p className="text-pink-400 font-semibold mb-2">Nicho (3-5):</p>
              <div className="flex flex-wrap gap-2">
                {['#lojista', '#comerciante', '#donodeloja', '#varejo', '#comercio'].map(tag => (
                  <span key={tag} className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-semibold mb-2">Alcance (3-5):</p>
              <div className="flex flex-wrap gap-2">
                {['#empreendedorismo', '#negocios', '#sucesso', '#empreender', '#gestao'].map(tag => (
                  <span key={tag} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold mb-2">Local (2-3):</p>
              <div className="flex flex-wrap gap-2">
                {['#[suacidade]', '#comercio[cidade]', '#[estado]'].map(tag => (
                  <span key={tag} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[var(--gray)] text-sm mt-4">💡 Use 8-12 hashtags no total. Misture as categorias!</p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Métricas para Acompanhar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[var(--gray)] py-2">Métrica</th>
                  <th className="text-center text-red-400 py-2">Ruim</th>
                  <th className="text-center text-yellow-400 py-2">Ok</th>
                  <th className="text-center text-green-400 py-2">Bom</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Views Reels</strong></td>
                  <td className="text-center">&lt;500</td>
                  <td className="text-center">500-2k</td>
                  <td className="text-center">&gt;2k</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Engajamento Reels</strong></td>
                  <td className="text-center">&lt;3%</td>
                  <td className="text-center">3-8%</td>
                  <td className="text-center">&gt;8%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Views Stories</strong></td>
                  <td className="text-center">&lt;10% seg</td>
                  <td className="text-center">10-20%</td>
                  <td className="text-center">&gt;20%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2"><strong className="text-white">Respostas Stories</strong></td>
                  <td className="text-center">&lt;1%</td>
                  <td className="text-center">1-3%</td>
                  <td className="text-center">&gt;3%</td>
                </tr>
                <tr>
                  <td className="py-2"><strong className="text-white">Salvamentos</strong></td>
                  <td className="text-center">&lt;1%</td>
                  <td className="text-center">1-3%</td>
                  <td className="text-center">&gt;3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Erros que Matam seu Alcance</h3>
          <div className="space-y-2">
            {[
              { erro: 'Postar Reels com marca d\'água do TikTok', fix: 'Use SnapTik para baixar sem marca' },
              { erro: 'Usar música muito baixa ou sem música', fix: 'Áudios em alta funcionam melhor' },
              { erro: 'Não colocar legenda/texto na tela', fix: '80% assistem sem som - sempre legendas!' },
              { erro: 'Hook fraco nos primeiros 2 segundos', fix: 'Comece com pergunta ou fato chocante' },
              { erro: 'Postar e sumir', fix: 'Responda TODOS os comentários na 1a hora' },
              { erro: 'Hashtags na legenda principal', fix: 'Coloque hashtags no 1o comentário' },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">❌ {item.erro}</p>
                <p className="text-green-400 text-xs mt-1">✅ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🛠️ Ferramentas Gratuitas para Edição</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { nome: 'CapCut', uso: 'Edição completa, legendas auto, templates', nota: '⭐⭐⭐⭐⭐' },
              { nome: 'Canva', uso: 'Thumbnails, capas, posts estáticos', nota: '⭐⭐⭐⭐⭐' },
              { nome: 'InShot', uso: 'Edição rápida, cortes, música', nota: '⭐⭐⭐⭐' },
              { nome: 'SnapTik', uso: 'Baixar TikTok sem marca d\'água', nota: '⭐⭐⭐⭐' },
            ].map((item, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-400 font-semibold">{item.nome}</span>
                  <span className="text-yellow-400 text-xs">{item.nota}</span>
                </div>
                <p className="text-[var(--gray)] text-sm">{item.uso}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">HACK: REELS → STORIES → DM</h4>
              <p className="text-[var(--gray)] mb-3">
                O funil perfeito do Instagram:
              </p>
              <ol className="text-[var(--gray)] space-y-1 text-sm">
                <li>1. <strong className="text-white">Reels:</strong> Atrai seguidores novos com conteúdo viral</li>
                <li>2. <strong className="text-white">Stories:</strong> Cria conexão e confiança diária</li>
                <li>3. <strong className="text-white">DM:</strong> Converte em lead com CTA no stories</li>
                <li>4. <strong className="text-white">WhatsApp:</strong> Fecha a venda!</li>
              </ol>
              <p className="text-green-400 text-sm mt-2">💰 Esse funil pode gerar 5-10 leads por semana organicamente!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // ==================== MÓDULO 6: EQUITY & VALUATION ====================
  'mod6-1': {
    titulo: 'O que é Equity e Por Que Importa',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Equity: A Base da Riqueza Real</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Equity</strong> significa <strong className="text-[var(--gold)]">participação societária</strong> -
            a porcentagem que você possui de uma empresa. É diferente de salário ou receita: é <strong className="text-white">propriedade</strong>.
          </p>
          <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-lg p-4">
            <p className="text-[var(--gold)] text-center text-lg">
              "Salário te paga as contas. Equity te faz rico."
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">💰 Salário vs Equity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Aspecto</th>
                  <th className="text-center py-2 text-blue-400">Salário</th>
                  <th className="text-center py-2 text-[var(--gold)]">Equity</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">Natureza</td>
                  <td className="text-center">Troca tempo por dinheiro</td>
                  <td className="text-center">Propriedade de ativo</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Limite</td>
                  <td className="text-center">Limitado às horas</td>
                  <td className="text-center">Pode crescer infinitamente</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Quando para</td>
                  <td className="text-center">Para quando você para</td>
                  <td className="text-center">Continua valorizando</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Venda</td>
                  <td className="text-center">Não pode vender</td>
                  <td className="text-center">Pode vender por milhões</td>
                </tr>
                <tr>
                  <td className="py-2">Exemplo</td>
                  <td className="text-center">R$10k/mês = R$120k/ano</td>
                  <td className="text-center text-[var(--gold)]">10% de empresa = R$1M+ no exit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🏆 Casos Reais de Equity</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">RD Station (Brasil)</h4>
              <p className="text-[var(--gray)] text-sm">Fundadores tinham 100% → Venderam para TOTVS por <strong className="text-white">R$ 1,86 bilhão</strong></p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Gympass (Brasil)</h4>
              <p className="text-[var(--gray)] text-sm">Equity dos fundadores vale <strong className="text-white">R$ 10+ bilhões</strong> após última rodada</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Hotmart (Brasil)</h4>
              <p className="text-[var(--gray)] text-sm">Fundadores com equity que vale <strong className="text-white">R$ 5+ bilhões</strong></p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-2">Conta Azul (SC - Brasil)</h4>
              <p className="text-[var(--gray)] text-sm">SaaS contábil vendido por estimados <strong className="text-white">R$ 1+ bilhão</strong></p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📊 Por Que SaaS é o Melhor Modelo para Equity</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Receita Recorrente</h4>
              <p className="text-[var(--gray)] text-sm">MRR previsível = empresa mais valiosa</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Margem Alta</h4>
              <p className="text-[var(--gray)] text-sm">70-90% de margem bruta típica</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Escalável</h4>
              <p className="text-[var(--gray)] text-sm">Custo por cliente diminui com escala</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Múltiplos Altos</h4>
              <p className="text-[var(--gray)] text-sm">SaaS vende por 5-15x receita anual</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">⚠️ Erros Comuns com Equity</h3>
          <div className="space-y-3">
            {[
              { erro: 'Dar equity demais no início', fix: 'Comece com 100%, dilua aos poucos com propósito' },
              { erro: 'Dividir 50/50 com sócio', fix: 'Alguém precisa ter maioria para decidir' },
              { erro: 'Dar equity para funcionários sem vesting', fix: 'Sempre use vesting de 4 anos' },
              { erro: 'Não documentar o cap table', fix: 'Mantenha planilha atualizada desde o dia 1' },
              { erro: 'Aceitar qualquer investidor', fix: 'Smart money > dumb money. Escolha bem.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start bg-orange-500/10 rounded-lg p-3">
                <span className="text-orange-400 font-bold">{index + 1}.</span>
                <div>
                  <p className="text-orange-300 font-semibold text-sm">{item.erro}</p>
                  <p className="text-[var(--gray)] text-xs mt-1">✅ {item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[var(--gold)]/20 to-orange-500/20 rounded-xl p-6 border border-[var(--gold)]/30">
          <h3 className="text-xl font-semibold text-white mb-4">🎯 Seu Objetivo com Equity</h3>
          <p className="text-[var(--gray)] mb-4">
            O objetivo não é ter salário alto. É construir um <strong className="text-white">ativo que vale milhões</strong> e pode ser vendido.
          </p>
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-[var(--gold)] text-center text-lg font-semibold">
              Meta: Construir empresa que vale 10x sua receita anual
            </p>
            <p className="text-[var(--gray)] text-center text-sm mt-2">
              R$500k MRR = R$6M ARR = Empresa de R$60M+
            </p>
          </div>
        </div>
      </div>
    )
  },
  'mod6-2': {
    titulo: 'Estrutura Jurídica: MEI vs LTDA vs S/A',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Escolhendo a Estrutura Certa</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            A estrutura jurídica define <strong className="text-white">impostos, responsabilidades e possibilidades de crescimento</strong>.
            Escolher errado no início pode custar caro depois.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📊 Comparativo Completo</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Aspecto</th>
                  <th className="text-center py-2 text-green-400">MEI</th>
                  <th className="text-center py-2 text-blue-400">LTDA</th>
                  <th className="text-center py-2 text-purple-400">S/A</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">Faturamento máx.</td>
                  <td className="text-center text-green-400">R$81k/ano</td>
                  <td className="text-center text-blue-400">Ilimitado</td>
                  <td className="text-center text-purple-400">Ilimitado</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Sócios</td>
                  <td className="text-center">Apenas 1</td>
                  <td className="text-center">1 a 999</td>
                  <td className="text-center">2+ (mín. 7 p/ aberta)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Impostos</td>
                  <td className="text-center">~R$70/mês fixo</td>
                  <td className="text-center">Simples ou Lucro</td>
                  <td className="text-center">Lucro Real/Presumido</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Funcionários</td>
                  <td className="text-center">Máx. 1</td>
                  <td className="text-center">Ilimitado</td>
                  <td className="text-center">Ilimitado</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Investimento</td>
                  <td className="text-center text-red-400">Não aceita</td>
                  <td className="text-center text-yellow-400">Possível</td>
                  <td className="text-center text-green-400">Ideal</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Venda/Exit</td>
                  <td className="text-center text-red-400">Difícil</td>
                  <td className="text-center text-yellow-400">Possível</td>
                  <td className="text-center text-green-400">Mais fácil</td>
                </tr>
                <tr>
                  <td className="py-2">Custo mensal</td>
                  <td className="text-center">~R$70</td>
                  <td className="text-center">R$500-2.000</td>
                  <td className="text-center">R$3.000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ MEI - Quando Usar</h3>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold mb-2">Use MEI se:</p>
            <ul className="text-[var(--gray)] space-y-1 text-sm">
              <li>• Você está começando e fatura menos de R$6.750/mês</li>
              <li>• Não tem sócio e não planeja ter tão cedo</li>
              <li>• Não vai precisar de investimento externo</li>
              <li>• Quer simplicidade e custo mínimo</li>
            </ul>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 font-semibold mb-2">Limitações do MEI:</p>
            <ul className="text-[var(--gray)] space-y-1 text-sm">
              <li>• Limite de R$81k/ano (R$6.750/mês)</li>
              <li>• Não pode ter sócio</li>
              <li>• Não pode receber investimento</li>
              <li>• Difícil vender a empresa</li>
              <li>• Algumas atividades não são permitidas</li>
            </ul>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🏢 LTDA - O Padrão para Startups</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <p className="text-blue-400 font-semibold mb-2">Use LTDA se:</p>
            <ul className="text-[var(--gray)] space-y-1 text-sm">
              <li>• Fatura ou pretende faturar mais de R$81k/ano</li>
              <li>• Tem ou terá sócios</li>
              <li>• Pode receber investimento anjo/seed</li>
              <li>• Quer crescer e eventualmente vender</li>
            </ul>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 font-semibold mb-2">Tipos de LTDA:</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white font-semibold text-sm">SLU (Unipessoal)</p>
                <p className="text-[var(--gray)] text-xs">Só você, sem sócio. Antiga EIRELI.</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <p className="text-white font-semibold text-sm">LTDA Comum</p>
                <p className="text-[var(--gray)] text-xs">2+ sócios. O mais usado.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🏛️ S/A - Para Grandes Ambições</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">Use S/A se:</p>
            <ul className="text-[var(--gray)] space-y-1 text-sm">
              <li>• Vai captar rodadas de investimento (Seed, Series A+)</li>
              <li>• Planeja ter muitos investidores/sócios</li>
              <li>• Quer emitir ações e stock options facilmente</li>
              <li>• Tem planos de IPO ou M&A grande</li>
            </ul>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">⚠️ Atenção:</p>
            <p className="text-[var(--gray)] text-sm">
              S/A tem custo alto (contabilidade, publicações, assembleias).
              <strong className="text-white"> Só vale a pena se realmente for captar investimento institucional.</strong>
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🗺️ Caminho Recomendado</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">1</div>
              <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 font-semibold">Começo: MEI</p>
                <p className="text-[var(--gray)] text-sm">Faturamento 0-R$80k/ano. Valide a ideia com custo mínimo.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">2</div>
              <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 font-semibold">Crescimento: LTDA</p>
                <p className="text-[var(--gray)] text-sm">Faturamento R$80k-R$5M/ano. Adicione sócios, estruture.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">3</div>
              <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <p className="text-purple-400 font-semibold">Escala: S/A (se necessário)</p>
                <p className="text-[var(--gray)] text-sm">Faturamento R$5M+/ano, captando investimento institucional.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 DICA DE OURO</h4>
          <p className="text-[var(--gray)]">
            Comece simples (MEI ou SLU). Transformar MEI em LTDA depois é fácil e barato.
            Começar já com S/A e descobrir que não precisava é <strong className="text-white">dinheiro jogado fora</strong>.
          </p>
        </div>
      </div>
    )
  },
  'mod6-3': {
    titulo: 'Cap Table - Divisão Societária',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Cap Table: O Mapa do seu Equity</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Cap Table</strong> (Capitalization Table) é a planilha que mostra
            <strong className="text-[var(--gold)]"> quem possui quanto da empresa</strong>.
            É o documento mais importante para investidores e sócios.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Exemplo de Cap Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Sócio/Investidor</th>
                  <th className="text-center py-2 text-white">Cotas/Ações</th>
                  <th className="text-center py-2 text-white">%</th>
                  <th className="text-center py-2 text-white">Tipo</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2 text-[var(--gold)]">Fundador 1 (CEO)</td>
                  <td className="text-center">600.000</td>
                  <td className="text-center text-[var(--gold)]">60%</td>
                  <td className="text-center">Ordinária</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-blue-400">Fundador 2 (CTO)</td>
                  <td className="text-center">250.000</td>
                  <td className="text-center text-blue-400">25%</td>
                  <td className="text-center">Ordinária</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-green-400">Pool de Funcionários</td>
                  <td className="text-center">100.000</td>
                  <td className="text-center text-green-400">10%</td>
                  <td className="text-center">Reservado</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-purple-400">Investidor Anjo</td>
                  <td className="text-center">50.000</td>
                  <td className="text-center text-purple-400">5%</td>
                  <td className="text-center">Preferencial</td>
                </tr>
                <tr className="font-semibold">
                  <td className="py-2 text-white">TOTAL</td>
                  <td className="text-center">1.000.000</td>
                  <td className="text-center text-white">100%</td>
                  <td className="text-center">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Divisão Recomendada para 2 Fundadores</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3">Cenário Ideal:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Fundador Principal (CEO/Visão)</span>
                  <span className="text-green-400 font-bold">55-60%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Co-fundador (CTO/Execução)</span>
                  <span className="text-blue-400 font-bold">25-35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray)]">Pool de Funcionários</span>
                  <span className="text-purple-400 font-bold">10-15%</span>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">⚠️ NUNCA faça 50/50!</h4>
              <p className="text-[var(--gray)] text-sm">
                Divisão igual causa deadlock em decisões. Alguém precisa ter a palavra final.
                Prefira 51/49 ou 60/40.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📈 Como a Cap Table Muda com Investimento</h3>
          <p className="text-[var(--gray)] mb-4">Exemplo: Empresa captando R$500k por 10% (valuation R$5M)</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 text-center">ANTES</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">Fundador 1</span>
                  <span className="text-white">70%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">Fundador 2</span>
                  <span className="text-white">30%</span>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-3 text-center">DEPOIS</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">Fundador 1</span>
                  <span className="text-white">63% <span className="text-red-400 text-xs">(-7%)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">Fundador 2</span>
                  <span className="text-white">27% <span className="text-red-400 text-xs">(-3%)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">Investidor</span>
                  <span className="text-green-400">10% <span className="text-green-400 text-xs">(novo)</span></span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-yellow-400 text-sm mt-3 text-center">
            Isso se chama <strong>diluição</strong> - você tem menos %, mas de uma empresa maior.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🎯 Regras de Ouro da Cap Table</h3>
          <div className="space-y-3">
            {[
              { regra: 'Documente desde o dia 1', desc: 'Mesmo sendo só você, tenha a cap table em planilha' },
              { regra: 'Reserve pool para funcionários', desc: '10-15% para atrair talentos com stock options' },
              { regra: 'Fundador principal com maioria', desc: 'Pelo menos 51% para ter controle das decisões' },
              { regra: 'Cuidado com muitos investidores', desc: 'Cada um quer opinar. Mantenha simples.' },
              { regra: 'Entenda diluição antes de aceitar', desc: 'Simule como fica sua % após cada rodada' },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start bg-orange-500/10 rounded-lg p-3">
                <span className="text-orange-400 font-bold">{index + 1}.</span>
                <div>
                  <p className="text-orange-300 font-semibold text-sm">{item.regra}</p>
                  <p className="text-[var(--gray)] text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 FERRAMENTA RECOMENDADA</h4>
          <p className="text-[var(--gray)]">
            Use <strong className="text-white">Carta</strong> ou <strong className="text-white">Pulley</strong> para gerenciar cap table profissionalmente.
            Para começar, uma planilha no Google Sheets já resolve.
          </p>
        </div>
      </div>
    )
  },
  'mod6-4': {
    titulo: 'Vesting e Cliff para Sócios',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Protegendo seu Equity: Vesting e Cliff</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Vesting</strong> é a aquisição gradual de equity ao longo do tempo.
            <strong className="text-white"> Cliff</strong> é o período mínimo antes de ganhar qualquer coisa.
            Juntos, protegem a empresa de sócios que saem cedo.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Como Funciona</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <h4 className="text-blue-400 font-semibold mb-3">Estrutura Padrão: 4 anos com cliff de 1 ano</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">0</div>
                <div className="flex-1 h-2 bg-white/10 rounded-full"></div>
                <span className="text-[var(--gray)] text-sm">0% (ainda no cliff)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 text-sm font-bold">1</div>
                <div className="flex-1 h-2 bg-yellow-500/30 rounded-full"><div className="w-1/4 h-full bg-yellow-500 rounded-full"></div></div>
                <span className="text-yellow-400 text-sm">25% (cliff batido!)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">2</div>
                <div className="flex-1 h-2 bg-blue-500/30 rounded-full"><div className="w-1/2 h-full bg-blue-500 rounded-full"></div></div>
                <span className="text-blue-400 text-sm">50%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm font-bold">3</div>
                <div className="flex-1 h-2 bg-purple-500/30 rounded-full"><div className="w-3/4 h-full bg-purple-500 rounded-full"></div></div>
                <span className="text-purple-400 text-sm">75%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm font-bold">4</div>
                <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm">100% (fully vested!)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📊 Exemplo Prático</h3>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-white mb-3">
              <strong>Cenário:</strong> CTO entra com direito a 20% da empresa, vesting 4 anos, cliff 1 ano.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white">Tempo</th>
                    <th className="text-center py-2 text-white">O que acontece</th>
                    <th className="text-center py-2 text-white">% Adquirido</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--gray)]">
                  <tr className="border-b border-white/5">
                    <td className="py-2">Mês 6 - sai</td>
                    <td className="text-center text-red-400">Não bateu cliff</td>
                    <td className="text-center text-red-400">0%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Ano 1 - completa</td>
                    <td className="text-center text-yellow-400">Cliff batido!</td>
                    <td className="text-center text-yellow-400">5% (25% de 20%)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Ano 2 - completa</td>
                    <td className="text-center text-blue-400">Vesting mensal</td>
                    <td className="text-center text-blue-400">10% (50% de 20%)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Ano 3 - completa</td>
                    <td className="text-center text-purple-400">Vesting mensal</td>
                    <td className="text-center text-purple-400">15% (75% de 20%)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Ano 4 - completa</td>
                    <td className="text-center text-green-400">Fully vested!</td>
                    <td className="text-center text-green-400">20% (100% de 20%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Por Que Isso é ESSENCIAL</h3>
          <div className="space-y-3">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">Sem Vesting - O que acontece:</h4>
              <p className="text-[var(--gray)] text-sm">
                Você dá 30% para um sócio. Ele sai em 3 meses.
                <strong className="text-white"> Ele leva os 30% tendo trabalhado quase nada.</strong>
                Você fica com menos equity e um "sócio fantasma" para sempre.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Com Vesting - O que acontece:</h4>
              <p className="text-[var(--gray)] text-sm">
                Você dá 30% para um sócio COM VESTING. Ele sai em 3 meses.
                <strong className="text-white"> Ele não leva nada (não bateu o cliff).</strong>
                Os 30% voltam para a empresa.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📋 Estruturas Comuns</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Padrão (EUA/BR)</h4>
              <p className="text-white text-sm">4 anos, cliff 1 ano</p>
              <p className="text-[var(--gray)] text-xs mt-1">Após cliff: vesting mensal</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Acelerado</h4>
              <p className="text-white text-sm">3 anos, cliff 6 meses</p>
              <p className="text-[var(--gray)] text-xs mt-1">Para early employees</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Fundadores</h4>
              <p className="text-white text-sm">4 anos, cliff 0 ou 6 meses</p>
              <p className="text-[var(--gray)] text-xs mt-1">Fundadores já provaram valor</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-2">Advisor</h4>
              <p className="text-white text-sm">2 anos, cliff 3 meses</p>
              <p className="text-[var(--gray)] text-xs mt-1">Para mentores/conselheiros</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🚀 Aceleração de Vesting</h3>
          <p className="text-[var(--gray)] mb-4">Cláusulas que aceleram o vesting em situações especiais:</p>
          <div className="space-y-3">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <h4 className="text-orange-400 font-semibold text-sm">Single Trigger</h4>
              <p className="text-[var(--gray)] text-xs">
                Vesting acelera 100% se a empresa for vendida. Protege o fundador em M&A.
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <h4 className="text-orange-400 font-semibold text-sm">Double Trigger</h4>
              <p className="text-[var(--gray)] text-xs">
                Vesting acelera se: (1) empresa vendida E (2) pessoa for demitida. Mais comum.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 REGRA DE OURO</h4>
          <p className="text-[var(--gray)]">
            <strong className="text-white">TODO mundo deveria ter vesting</strong>, incluindo fundadores.
            Se todos têm skin in the game de longo prazo, a empresa ganha.
            Investidores adoram ver isso.
          </p>
        </div>
      </div>
    )
  },
  'mod6-5': {
    titulo: 'Como Calcular Valuation de SaaS',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Valuation: Quanto Vale sua Empresa?</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Valuation</strong> é o valor estimado da sua empresa.
            Para SaaS, existem métodos específicos baseados em <strong className="text-[var(--gold)]">receita recorrente</strong>.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Método Principal: Múltiplo de ARR</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <p className="text-white text-center text-xl mb-2">
              <strong>Valuation = ARR × Múltiplo</strong>
            </p>
            <p className="text-[var(--gray)] text-center text-sm">
              ARR = Annual Recurring Revenue (Receita Anual Recorrente)
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-[var(--gray)] text-sm">MRR</p>
              <p className="text-white font-bold text-lg">R$ 50k</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-[var(--gray)] text-sm">ARR (MRR × 12)</p>
              <p className="text-blue-400 font-bold text-lg">R$ 600k</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4 text-center">
              <p className="text-[var(--gray)] text-sm">Valuation (5x)</p>
              <p className="text-[var(--gold)] font-bold text-lg">R$ 3M</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📈 Múltiplos por Estágio</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Estágio</th>
                  <th className="text-center py-2 text-white">ARR</th>
                  <th className="text-center py-2 text-white">Múltiplo Típico</th>
                  <th className="text-center py-2 text-white">Valuation</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2 text-yellow-400">Pre-seed</td>
                  <td className="text-center">R$ 0-100k</td>
                  <td className="text-center">10-20x</td>
                  <td className="text-center">R$ 1-2M</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-orange-400">Seed</td>
                  <td className="text-center">R$ 100k-500k</td>
                  <td className="text-center">8-15x</td>
                  <td className="text-center">R$ 2-5M</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-blue-400">Series A</td>
                  <td className="text-center">R$ 500k-2M</td>
                  <td className="text-center">6-12x</td>
                  <td className="text-center">R$ 5-20M</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-purple-400">Series B</td>
                  <td className="text-center">R$ 2M-10M</td>
                  <td className="text-center">5-10x</td>
                  <td className="text-center">R$ 20-80M</td>
                </tr>
                <tr>
                  <td className="py-2 text-green-400">Growth</td>
                  <td className="text-center">R$ 10M+</td>
                  <td className="text-center">4-8x</td>
                  <td className="text-center">R$ 50M+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-yellow-400 text-xs mt-3">
            * Múltiplos variam por mercado, crescimento, margem e retenção.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🎯 Fatores que Aumentam seu Múltiplo</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { fator: 'Crescimento alto', desc: '+100% ano/ano', impacto: '+2-3x' },
              { fator: 'Churn baixo', desc: 'Net Revenue Retention > 100%', impacto: '+2-4x' },
              { fator: 'Margem alta', desc: 'Gross margin > 80%', impacto: '+1-2x' },
              { fator: 'Mercado grande', desc: 'TAM > R$1B', impacto: '+1-2x' },
              { fator: 'Receita previsível', desc: 'Contratos anuais', impacto: '+1x' },
              { fator: 'Baixo CAC', desc: 'LTV/CAC > 3', impacto: '+1-2x' },
            ].map((item, index) => (
              <div key={index} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-purple-400 font-semibold text-sm">{item.fator}</span>
                  <span className="text-green-400 text-xs font-bold">{item.impacto}</span>
                </div>
                <p className="text-[var(--gray)] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🧮 Calculadora de Valuation</h3>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-white mb-4">Exemplo: Sua startup SaaS</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[var(--gray)]">MRR atual</span>
                <span className="text-white font-bold">R$ 30.000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[var(--gray)]">ARR (MRR × 12)</span>
                <span className="text-blue-400 font-bold">R$ 360.000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[var(--gray)]">Crescimento mensal</span>
                <span className="text-green-400 font-bold">15% MoM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[var(--gray)]">Churn</span>
                <span className="text-green-400 font-bold">2% (baixo)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-[var(--gray)]">Múltiplo aplicável</span>
                <span className="text-purple-400 font-bold">10x (crescimento alto)</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-[var(--gold)]/20 rounded-lg px-3">
                <span className="text-[var(--gold)] font-bold">VALUATION ESTIMADO</span>
                <span className="text-[var(--gold)] font-bold text-xl">R$ 3.600.000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Métodos Alternativos</h3>
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">DCF (Fluxo de Caixa Descontado)</h4>
              <p className="text-[var(--gray)] text-sm">
                Projeta fluxo de caixa futuro e traz a valor presente.
                <span className="text-yellow-400"> Mais usado para empresas maduras.</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Comparáveis (Comps)</h4>
              <p className="text-[var(--gray)] text-sm">
                Compara com empresas similares que foram vendidas.
                <span className="text-yellow-400"> Útil para M&A.</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Scorecard (Anjos)</h4>
              <p className="text-[var(--gray)] text-sm">
                Avalia time, mercado, produto em % vs média.
                <span className="text-yellow-400"> Usado por investidores anjo pré-receita.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 VERDADE SOBRE VALUATION</h4>
          <p className="text-[var(--gray)]">
            No final do dia, valuation é <strong className="text-white">o que alguém está disposto a pagar</strong>.
            Métodos são guias, mas a negociação define o número final.
            <strong className="text-[var(--gold)]"> Foco em crescer a receita - o valuation segue.</strong>
          </p>
        </div>
      </div>
    )
  },
  'mod6-6': {
    titulo: 'Múltiplos de Mercado',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Entendendo Múltiplos de Mercado</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            Múltiplos são <strong className="text-white">atalhos</strong> para estimar valuation baseado em métricas da empresa.
            Para SaaS, os mais importantes são baseados em <strong className="text-[var(--gold)]">receita recorrente</strong>.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Principais Múltiplos SaaS</h3>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-400 font-semibold">EV/ARR</h4>
                <span className="text-white font-bold">5-15x</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Enterprise Value dividido por ARR. O mais usado para SaaS.
              </p>
              <p className="text-blue-300 text-xs mt-1">Fórmula: Valuation ÷ Receita Anual Recorrente</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-green-400 font-semibold">EV/MRR</h4>
                <span className="text-white font-bold">60-180x</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Enterprise Value dividido por MRR. É o ARR múltiplo × 12.
              </p>
              <p className="text-green-300 text-xs mt-1">Fórmula: Valuation ÷ Receita Mensal Recorrente</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-purple-400 font-semibold">EV/Revenue</h4>
                <span className="text-white font-bold">3-10x</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Enterprise Value dividido por receita total (inclui não-recorrente).
              </p>
              <p className="text-purple-300 text-xs mt-1">Fórmula: Valuation ÷ Receita Total Anual</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🌎 Múltiplos por Região (2024-2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Região</th>
                  <th className="text-center py-2 text-white">Múltiplo ARR</th>
                  <th className="text-center py-2 text-white">Observação</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">🇺🇸 EUA (Top Tier)</td>
                  <td className="text-center text-green-400">10-20x</td>
                  <td className="text-center text-xs">Empresas de alto crescimento</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">🇺🇸 EUA (Médio)</td>
                  <td className="text-center text-blue-400">5-10x</td>
                  <td className="text-center text-xs">Mercado normal</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">🇧🇷 Brasil (Top)</td>
                  <td className="text-center text-yellow-400">5-10x</td>
                  <td className="text-center text-xs">Startups destaque</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">🇧🇷 Brasil (Médio)</td>
                  <td className="text-center text-orange-400">3-6x</td>
                  <td className="text-center text-xs">Mercado normal</td>
                </tr>
                <tr>
                  <td className="py-2">🇧🇷 Brasil (PME)</td>
                  <td className="text-center text-red-400">2-4x</td>
                  <td className="text-center text-xs">Empresas menores/tradicionais</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📈 Rule of 40</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
            <p className="text-white text-center text-lg mb-2">
              <strong>Crescimento % + Margem % ≥ 40</strong>
            </p>
            <p className="text-[var(--gray)] text-center text-sm">
              Regra usada por investidores para avaliar saúde de SaaS
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <h4 className="text-green-400 font-semibold text-sm mb-2">✅ Bom (Score 50)</h4>
              <p className="text-[var(--gray)] text-xs">
                30% crescimento + 20% margem = 50
              </p>
              <p className="text-green-300 text-xs mt-1">Múltiplo: 8-12x</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <h4 className="text-yellow-400 font-semibold text-sm mb-2">⚠️ Ok (Score 40)</h4>
              <p className="text-[var(--gray)] text-xs">
                20% crescimento + 20% margem = 40
              </p>
              <p className="text-yellow-300 text-xs mt-1">Múltiplo: 5-8x</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h4 className="text-red-400 font-semibold text-sm mb-2">❌ Ruim (Score 25)</h4>
              <p className="text-[var(--gray)] text-xs">
                10% crescimento + 15% margem = 25
              </p>
              <p className="text-red-300 text-xs mt-1">Múltiplo: 2-4x</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h4 className="text-blue-400 font-semibold text-sm mb-2">🚀 Excelente (Score 70)</h4>
              <p className="text-[var(--gray)] text-xs">
                50% crescimento + 20% margem = 70
              </p>
              <p className="text-blue-300 text-xs mt-1">Múltiplo: 15-25x</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🏢 Exemplos Reais Brasil</h3>
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">RD Station</span>
                <span className="text-green-400 font-bold">~10x ARR</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Vendida para TOTVS por R$1.86B (~R$180M ARR estimado)</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Conta Azul</span>
                <span className="text-blue-400 font-bold">~8x ARR</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Valuation estimado em rodadas de ~$100M</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Pipefy</span>
                <span className="text-purple-400 font-bold">~15x ARR</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Alto crescimento internacional justifica múltiplo maior</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 COMO USAR ISSO</h4>
          <p className="text-[var(--gray)]">
            Múltiplos são <strong className="text-white">referência, não regra</strong>.
            Use para ter noção do valor, mas lembre: cada negociação é única.
            <strong className="text-[var(--gold)]"> Foco em métricas boas = múltiplo alto naturalmente.</strong>
          </p>
        </div>
      </div>
    )
  },
  'mod6-7': {
    titulo: 'Preparando para Investidores',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Captando Investimento: O Básico</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            Investimento é <strong className="text-white">combustível para crescer mais rápido</strong>, não dinheiro grátis.
            Você troca equity por capital. Só faça se realmente precisar acelerar.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-center">
              "Investimento não é prêmio. É responsabilidade de entregar retorno."
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Tipos de Investidores</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-400 font-semibold">Investidor Anjo</h4>
                <span className="text-white text-sm">R$ 50k - 500k</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Pessoa física que investe próprio dinheiro. Geralmente ex-empreendedores.
              </p>
              <p className="text-blue-300 text-xs mt-1">Estágio: Pre-seed, Seed</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-green-400 font-semibold">Aceleradora</h4>
                <span className="text-white text-sm">R$ 50k - 200k + mentoria</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Programa de 3-6 meses com investimento, mentoria e conexões.
              </p>
              <p className="text-green-300 text-xs mt-1">Ex: Y Combinator, ACE, Wayra</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-purple-400 font-semibold">Venture Capital (VC)</h4>
                <span className="text-white text-sm">R$ 1M - 100M+</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Fundos profissionais que investem dinheiro de terceiros.
              </p>
              <p className="text-purple-300 text-xs mt-1">Estágio: Seed, Series A, B, C...</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-orange-400 font-semibold">Corporate Venture</h4>
                <span className="text-white text-sm">R$ 1M - 50M</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Braço de investimento de grandes empresas (ex: Bradesco, Itaú, TOTVS).
              </p>
              <p className="text-orange-300 text-xs mt-1">Pode incluir parceria comercial</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📋 O que Investidores Avaliam</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { item: 'Time', peso: '40%', desc: 'Experiência, complementaridade, dedicação' },
              { item: 'Mercado', peso: '25%', desc: 'Tamanho (TAM), crescimento, timing' },
              { item: 'Produto', peso: '20%', desc: 'Diferencial, tecnologia, moat' },
              { item: 'Tração', peso: '15%', desc: 'Receita, crescimento, retenção' },
            ].map((item, index) => (
              <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-400 font-semibold">{item.item}</span>
                  <span className="text-white font-bold text-sm">{item.peso}</span>
                </div>
                <p className="text-[var(--gray)] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📑 Documentos Necessários</h3>
          <div className="space-y-2">
            {[
              { doc: 'Pitch Deck', desc: '10-15 slides apresentando a empresa', status: 'Obrigatório' },
              { doc: 'Financial Model', desc: 'Projeção financeira 3-5 anos', status: 'Obrigatório' },
              { doc: 'Cap Table', desc: 'Divisão societária atual', status: 'Obrigatório' },
              { doc: 'Data Room', desc: 'Pasta com todos documentos', status: 'Due Diligence' },
              { doc: 'One Pager', desc: 'Resumo de 1 página', status: 'Recomendado' },
              { doc: 'Métricas Dashboard', desc: 'MRR, Churn, CAC, LTV em tempo real', status: 'Diferencial' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <div>
                  <span className="text-white font-semibold text-sm">{item.doc}</span>
                  <p className="text-[var(--gray)] text-xs">{item.desc}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'Obrigatório' ? 'bg-red-500/20 text-red-400' :
                  item.status === 'Due Diligence' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🎯 Pitch Deck - Estrutura</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { num: 1, titulo: 'Capa', desc: 'Nome + tagline' },
              { num: 2, titulo: 'Problema', desc: 'Dor que resolve' },
              { num: 3, titulo: 'Solução', desc: 'Como resolve' },
              { num: 4, titulo: 'Mercado', desc: 'TAM/SAM/SOM' },
              { num: 5, titulo: 'Produto', desc: 'Demo/screenshots' },
              { num: 6, titulo: 'Modelo', desc: 'Como ganha $' },
              { num: 7, titulo: 'Tração', desc: 'Métricas/clientes' },
              { num: 8, titulo: 'Competição', desc: 'Diferencial' },
              { num: 9, titulo: 'Time', desc: 'Fundadores' },
              { num: 10, titulo: 'Financeiro', desc: 'Projeções' },
              { num: 11, titulo: 'Ask', desc: 'Quanto quer' },
              { num: 12, titulo: 'Contato', desc: 'Como falar' },
            ].map((slide) => (
              <div key={slide.num} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center">
                <span className="text-orange-400 font-bold text-xs">{slide.num}</span>
                <p className="text-white text-sm font-semibold">{slide.titulo}</p>
                <p className="text-[var(--gray)] text-xs">{slide.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 DICA FINAL</h4>
          <p className="text-[var(--gray)]">
            <strong className="text-white">Tração &gt; Pitch bonito.</strong> Investidor quer ver números reais.
            Foque em crescer a empresa primeiro - investimento vem como consequência.
          </p>
        </div>
      </div>
    )
  },
  'mod6-8': {
    titulo: 'Term Sheet e Negociação',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Term Sheet: O Contrato de Intenções</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Term Sheet</strong> é o documento que define os termos principais do investimento.
            Não é contrato final, mas é <strong className="text-[var(--gold)]">moralmente vinculante</strong>.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📋 Termos Principais</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Pre-Money Valuation</h4>
              <p className="text-[var(--gray)] text-sm">
                Valor da empresa ANTES do investimento entrar.
              </p>
              <p className="text-white text-xs mt-1">
                Ex: Pre-money R$4M + Investimento R$1M = Post-money R$5M (investidor fica com 20%)
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Liquidation Preference</h4>
              <p className="text-[var(--gray)] text-sm">
                Prioridade do investidor em receber de volta em caso de venda/liquidação.
              </p>
              <p className="text-white text-xs mt-1">
                1x = recebe o investido primeiro. 2x = recebe 2x o investido primeiro.
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Anti-dilution</h4>
              <p className="text-[var(--gray)] text-sm">
                Proteção se próxima rodada for com valuation menor (down round).
              </p>
              <p className="text-white text-xs mt-1">
                Full Ratchet (agressivo) vs Weighted Average (mais comum)
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-semibold mb-2">Board Seats</h4>
              <p className="text-[var(--gray)] text-sm">
                Assentos no conselho de administração.
              </p>
              <p className="text-white text-xs mt-1">
                Típico Seed: 2 fundadores + 1 investidor. Series A: 2 + 2 + 1 independente.
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ Red Flags - Cuidado!</h3>
          <div className="space-y-2">
            {[
              { flag: 'Liquidation preference > 1x', risco: 'Fundadores podem não receber nada no exit' },
              { flag: 'Full ratchet anti-dilution', risco: 'Diluição extrema em down round' },
              { flag: 'Participating preferred', risco: 'Investidor recebe 2x (preferência + pro-rata)' },
              { flag: 'Controle do board desde Seed', risco: 'Você perde poder de decisão muito cedo' },
              { flag: 'Vesting reverso para fundadores', risco: 'Você pode perder suas ações' },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start bg-red-500/10 rounded-lg p-3">
                <span className="text-red-400">⚠️</span>
                <div>
                  <p className="text-red-300 font-semibold text-sm">{item.flag}</p>
                  <p className="text-[var(--gray)] text-xs">{item.risco}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Termos Founder-Friendly</h3>
          <div className="space-y-2">
            {[
              '1x non-participating liquidation preference',
              'Weighted average anti-dilution',
              'Fundadores mantêm maioria do board até Series A',
              'Vesting de 4 anos só para novas ações',
              'ESOP (pool de funcionários) pré-definido',
              'Drag-along com limite de valuation',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-green-500/10 rounded-lg p-3">
                <span className="text-green-400">✅</span>
                <span className="text-[var(--gray)] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">🤝 Dicas de Negociação</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { dica: 'Tenha alternativas', desc: 'BATNA forte = melhor negociação' },
              { dica: 'Foque no valuation', desc: 'Mas não ignore outros termos' },
              { dica: 'Contrate advogado', desc: 'Especialista em venture capital' },
              { dica: 'Converse com fundadores', desc: 'Pergunte sobre o investidor' },
              { dica: 'Não tenha pressa', desc: 'Urgência enfraquece posição' },
              { dica: 'Documente tudo', desc: 'E-mails e mensagens são prova' },
            ].map((item, index) => (
              <div key={index} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <p className="text-purple-400 font-semibold text-sm">{item.dica}</p>
                <p className="text-[var(--gray)] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-6">
          <h4 className="text-[var(--gold)] font-semibold mb-2">💡 REGRA DE OURO</h4>
          <p className="text-[var(--gray)]">
            <strong className="text-white">Valuation importa, mas termos importam mais.</strong>
            R$5M com termos ruins pode ser pior que R$3M com termos bons.
            Sempre consulte advogado especializado antes de assinar.
          </p>
        </div>
      </div>
    )
  },
  'mod6-9': {
    titulo: 'Exit - Vendendo sua Empresa',
    modulo: 'Equity & Valuation',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Exit: O Grande Objetivo</h3>
          <p className="text-[var(--gray)] leading-relaxed mb-4">
            <strong className="text-white">Exit</strong> é quando você vende sua participação na empresa e realiza o valor do seu equity.
            É o momento em que <strong className="text-[var(--gold)]">papel vira dinheiro</strong>.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Tipos de Exit</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-400 font-semibold">M&A (Aquisição)</h4>
                <span className="text-green-400 text-sm">Mais comum</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Empresa maior compra 100% ou maioria da sua empresa.
              </p>
              <p className="text-blue-300 text-xs mt-1">Ex: TOTVS comprou RD Station por R$1.86B</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-green-400 font-semibold">Acqui-hire</h4>
                <span className="text-yellow-400 text-sm">Menor valor</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Compram a empresa principalmente pelo time/tecnologia.
              </p>
              <p className="text-green-300 text-xs mt-1">Comum quando produto não decolou mas time é bom</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-purple-400 font-semibold">IPO</h4>
                <span className="text-purple-400 text-sm">Raro</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Abrir capital na bolsa de valores.
              </p>
              <p className="text-purple-300 text-xs mt-1">Requer escala muito grande (R$100M+ ARR)</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-orange-400 font-semibold">Secondary Sale</h4>
                <span className="text-blue-400 text-sm">Liquidez parcial</span>
              </div>
              <p className="text-[var(--gray)] text-sm">
                Vender parte das suas ações para outro investidor.
              </p>
              <p className="text-orange-300 text-xs mt-1">Comum em rodadas grandes (Series B+)</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Preparando para o Exit</h3>
          <div className="space-y-2">
            {[
              { item: 'Métricas sólidas', desc: 'MRR crescente, churn baixo, unit economics positivo' },
              { item: 'Documentação em dia', desc: 'Contratos, cap table, financeiro auditado' },
              { item: 'Time não dependente de você', desc: 'Empresa funciona sem fundador presente 100%' },
              { item: 'Clientes diversificados', desc: 'Nenhum cliente > 10-15% da receita' },
              { item: 'Tecnologia documentada', desc: 'Código limpo, arquitetura escalável' },
              { item: 'Relacionamento com potenciais compradores', desc: 'Conversas iniciadas 1-2 anos antes' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-green-500/10 rounded-lg p-3">
                <span className="text-green-400 font-bold">{index + 1}.</span>
                <div>
                  <p className="text-white text-sm font-semibold">{item.item}</p>
                  <p className="text-[var(--gray)] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">💰 Múltiplos de Exit por Comprador</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white">Comprador</th>
                  <th className="text-center py-2 text-white">Múltiplo típico</th>
                  <th className="text-center py-2 text-white">Motivação</th>
                </tr>
              </thead>
              <tbody className="text-[var(--gray)]">
                <tr className="border-b border-white/5">
                  <td className="py-2">Estratégico (concorrente)</td>
                  <td className="text-center text-green-400">8-15x ARR</td>
                  <td className="text-center text-xs">Eliminar competição + sinergias</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Private Equity</td>
                  <td className="text-center text-blue-400">5-8x ARR</td>
                  <td className="text-center text-xs">Retorno financeiro</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2">Empresa grande (não-tech)</td>
                  <td className="text-center text-yellow-400">4-7x ARR</td>
                  <td className="text-center text-xs">Transformação digital</td>
                </tr>
                <tr>
                  <td className="py-2">Acqui-hire</td>
                  <td className="text-center text-red-400">1-3x ARR</td>
                  <td className="text-center text-xs">Talento + tecnologia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📋 Processo de M&A</h3>
          <div className="space-y-3">
            {[
              { fase: 'Preparação', tempo: '3-6 meses', desc: 'Organizar documentos, métricas, data room' },
              { fase: 'Busca de compradores', tempo: '1-3 meses', desc: 'Banker ou contato direto' },
              { fase: 'LOI (Carta de intenção)', tempo: '2-4 semanas', desc: 'Termos principais acordados' },
              { fase: 'Due Diligence', tempo: '1-3 meses', desc: 'Comprador verifica tudo' },
              { fase: 'Negociação final', tempo: '2-4 semanas', desc: 'Ajustes, reps & warranties' },
              { fase: 'Closing', tempo: '1-2 semanas', desc: 'Assinatura e transferência' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-center bg-orange-500/10 rounded-lg p-3">
                <div className="w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold text-sm">{item.fase}</span>
                    <span className="text-orange-400 text-xs">{item.tempo}</span>
                  </div>
                  <p className="text-[var(--gray)] text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 border-2 border-[var(--gold)]">
          <h3 className="text-xl font-semibold text-[var(--gold)] mb-4">🏆 Casos de Exit Brasil</h3>
          <div className="space-y-3">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">RD Station → TOTVS</span>
                <span className="text-[var(--gold)] font-bold">R$ 1.86B</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Marketing automation SaaS</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Superlógica → Vinci</span>
                <span className="text-[var(--gold)] font-bold">R$ 1B+</span>
              </div>
              <p className="text-[var(--gray)] text-sm">ERP para condomínios</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Involves → Bain Capital</span>
                <span className="text-[var(--gold)] font-bold">R$ 500M+</span>
              </div>
              <p className="text-[var(--gray)] text-sm">Trade marketing SaaS</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[var(--gold)]/20 to-orange-500/20 rounded-xl p-6 border border-[var(--gold)]/30">
          <h4 className="text-[var(--gold)] font-semibold mb-2">🎯 SEU CAMINHO PARA O EXIT</h4>
          <p className="text-[var(--gray)] mb-4">
            Com R$500k MRR (R$6M ARR) e múltiplo de 8x, sua empresa vale <strong className="text-white">R$48 milhões</strong>.
          </p>
          <p className="text-[var(--gold)]">
            Se você tem 60% de equity = <strong className="text-white text-xl">R$28.8 milhões no seu bolso</strong>.
          </p>
          <p className="text-[var(--gray)] text-sm mt-2">
            Esse é o poder de construir equity em vez de apenas salário.
          </p>
        </div>
      </div>
    )
  },
}

// Navegação entre aulas
const todasAulas = [
  'mod1-1', 'mod1-2', 'mod1-3', 'mod1-4', 'mod1-5', 'mod1-6', 'mod1-7',
  'mod2-1', 'mod2-2', 'mod2-3', 'mod2-4', 'mod2-5', 'mod2-6', 'mod2-7',
  'mod3-1', 'mod3-2', 'mod3-3', 'mod3-4', 'mod3-5',
  'mod4-1', 'mod4-2', 'mod4-3', 'mod4-4', 'mod4-5', 'mod4-6', 'mod4-7',
  'mod5-1', 'mod5-2', 'mod5-3', 'mod5-4', 'mod5-5',
  'mod6-1', 'mod6-2', 'mod6-3', 'mod6-4', 'mod6-5', 'mod6-6', 'mod6-7', 'mod6-8', 'mod6-9',
]

export default function AulaPage() {
  const router = useRouter()
  const params = useParams()
  const aulaId = params.id as string

  const [completa, setCompleta] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
      return
    }

    const saved = localStorage.getItem('academia_progresso')
    if (saved) {
      const arr = JSON.parse(saved)
      setCompleta(arr.includes(aulaId))
    }
  }, [router, aulaId])

  const aula = conteudoAulas[aulaId]

  if (!aula) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
          <h1 className="text-2xl text-white mb-2">Aula em desenvolvimento</h1>
          <p className="text-[var(--gray)] mb-6">Este conteúdo será liberado em breve!</p>
          <button
            onClick={() => router.push('/membro/academia')}
            className="gold-btn"
          >
            Voltar à Academia
          </button>
        </div>
      </main>
    )
  }

  const marcarCompleta = () => {
    const saved = localStorage.getItem('academia_progresso')
    let arr = saved ? JSON.parse(saved) : []

    if (completa) {
      arr = arr.filter((a: string) => a !== aulaId)
    } else {
      arr.push(aulaId)
    }

    localStorage.setItem('academia_progresso', JSON.stringify(arr))
    setCompleta(!completa)
  }

  const idxAtual = todasAulas.indexOf(aulaId)
  const anterior = idxAtual > 0 ? todasAulas[idxAtual - 1] : null
  const proxima = idxAtual < todasAulas.length - 1 ? todasAulas[idxAtual + 1] : null

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/membro/academia')}
            className="w-10 h-10 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <p className="text-[var(--gray)] text-sm">{aula.modulo}</p>
            <h1 className="font-display text-xl sm:text-2xl gold-text">{aula.titulo}</h1>
          </div>
        </header>

        {/* Conteúdo */}
        <section className="mb-8">
          {aula.conteudo}
        </section>

        {/* Botão Marcar Completa */}
        <div className="glass p-6 mb-6">
          <button
            onClick={marcarCompleta}
            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
              completa
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-[var(--gold)] text-black hover:bg-[var(--gold-light)]'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
            {completa ? 'Aula Concluída!' : 'Marcar como Concluída'}
          </button>
        </div>

        {/* Navegação */}
        <div className="flex gap-4">
          {anterior ? (
            <button
              onClick={() => router.push(`/membro/academia/aula/${anterior}`)}
              className="flex-1 glass p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--gray)]" />
              <span className="text-[var(--gray)]">Anterior</span>
            </button>
          ) : <div className="flex-1" />}

          {proxima ? (
            <button
              onClick={() => router.push(`/membro/academia/aula/${proxima}`)}
              className="flex-1 glass p-4 flex items-center justify-end gap-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-[var(--gray)]">Próxima</span>
              <ArrowRight className="w-5 h-5 text-[var(--gray)]" />
            </button>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </main>
  )
}
