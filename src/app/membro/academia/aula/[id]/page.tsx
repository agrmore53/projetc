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
    titulo: 'TikTok Ads - Introdução',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Por que TikTok Ads?</h3>
          <ul className="space-y-3 text-[var(--gray)]">
            <li className="flex gap-3">
              <span>🎯</span>
              <span><strong className="text-white">CPM mais barato</strong> que Meta e Google</span>
            </li>
            <li className="flex gap-3">
              <span>📱</span>
              <span>Público <strong className="text-white">altamente engajado</strong></span>
            </li>
            <li className="flex gap-3">
              <span>🚀</span>
              <span>Algoritmo favorece <strong className="text-white">novos anunciantes</strong></span>
            </li>
            <li className="flex gap-3">
              <span>💡</span>
              <span>Vídeos <strong className="text-white">nativos</strong> performam melhor</span>
            </li>
          </ul>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Estrutura de Conta</h3>
          <ol className="space-y-3 text-[var(--gray)]">
            <li>1. Crie conta no <strong className="text-white">TikTok Business Center</strong></li>
            <li>2. Configure o <strong className="text-white">Pixel do TikTok</strong> no site</li>
            <li>3. Crie sua primeira <strong className="text-white">Campanha</strong></li>
            <li>4. Defina <strong className="text-white">Grupo de Anúncios</strong> (público)</li>
            <li>5. Crie os <strong className="text-white">Anúncios</strong> (criativos)</li>
          </ol>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Orçamento Inicial Recomendado</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">R$50</p>
              <p className="text-[var(--gray)] text-sm">por dia (mínimo)</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-400">R$1.500</p>
              <p className="text-[var(--gray)] text-sm">por mês</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">DICA IMPORTANTE</h4>
              <p className="text-[var(--gray)]">
                Crie vídeos que parecem <strong className="text-white">orgânicos</strong>, não comerciais.
                O TikTok penaliza anúncios "com cara de propaganda".
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod5-1': {
    titulo: 'TikTok Orgânico',
    modulo: 'Tráfego Orgânico',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Estratégia de Conteúdo</h3>
          <p className="text-[var(--gray)] mb-4">
            O segredo do TikTok é criar conteúdo que <strong className="text-white">educa e entretém</strong> ao mesmo tempo.
          </p>
          <div className="grid gap-3">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold">🎭 Formato 1: Dor + Solução</h4>
              <p className="text-[var(--gray)] text-sm mt-1">"Você perde vendas por não saber se tem produto? Olha essa solução..."</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold">📖 Formato 2: Storytelling</h4>
              <p className="text-[var(--gray)] text-sm mt-1">"Como um mercadinho faturou 30% mais em 3 meses..."</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold">💡 Formato 3: Dicas Rápidas</h4>
              <p className="text-[var(--gray)] text-sm mt-1">"3 erros que donos de loja cometem..."</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Frequência de Postagem</h3>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
            <p className="text-4xl font-bold text-blue-400">3-5x</p>
            <p className="text-[var(--gray)]">vídeos por semana (mínimo)</p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Melhores Horários</h3>
          <ul className="space-y-2 text-[var(--gray)]">
            <li>📱 <strong className="text-white">11h-13h</strong> - Horário de almoço</li>
            <li>📱 <strong className="text-white">18h-21h</strong> - Pós-trabalho</li>
            <li>📱 <strong className="text-white">Sábado 10h-12h</strong> - Fim de semana</li>
          </ul>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Hashtags Recomendadas</h3>
          <div className="flex flex-wrap gap-2">
            {['#empreendedorismo', '#gestao', '#comercio', '#lojista', '#sistemadegestao', '#vendas', '#negocios', '#dica'].map(tag => (
              <span key={tag} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
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
          <h3 className="text-xl font-semibold gold-text mb-4">Estrutura de Campanha</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            No TikTok Ads você tem 3 níveis: <strong className="text-white">Campanha → Grupo de Anúncios → Anúncios</strong>.
            Entender isso é essencial para otimizar seus resultados!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Os 3 Níveis</h3>
          <div className="space-y-4">
            {[
              { nivel: 'Campanha', desc: 'Define o OBJETIVO (conversão, tráfego, visualização)', cor: 'blue' },
              { nivel: 'Grupo de Anúncios', desc: 'Define o PÚBLICO (idade, local, interesses) e ORÇAMENTO', cor: 'green' },
              { nivel: 'Anúncios', desc: 'O CRIATIVO em si (vídeo, texto, call-to-action)', cor: 'purple' },
            ].map(item => (
              <div key={item.nivel} className={`bg-${item.cor}-500/10 border border-${item.cor}-500/30 rounded-lg p-4`}>
                <span className={`text-${item.cor}-400 font-bold`}>{item.nivel}</span>
                <p className="text-[var(--gray)] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Objetivos Recomendados</h3>
          <div className="space-y-3">
            {[
              { objetivo: 'Conversão', quando: 'Quando tem site com Pixel instalado', resultado: 'Leads ou vendas diretas' },
              { objetivo: 'Tráfego', quando: 'Quando quer mandar para WhatsApp', resultado: 'Cliques no link' },
              { objetivo: 'Visualização de Vídeo', quando: 'Quando quer reconhecimento', resultado: 'Mais pessoas assistindo' },
            ].map(item => (
              <div key={item.objetivo} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <span className="text-green-400 font-semibold">{item.objetivo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">📌 Quando usar: {item.quando}</p>
                <p className="text-[var(--gray)] text-sm">🎯 Resultado: {item.resultado}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">👥 Segmentação de Público</h3>
          <div className="space-y-2">
            {[
              { tipo: 'Localização', config: 'Cidade ou raio de km ao redor' },
              { tipo: 'Idade', config: '25-55 anos (donos de negócio)' },
              { tipo: 'Interesses', config: 'Empreendedorismo, Negócios, Gestão' },
              { tipo: 'Comportamento', config: 'Pessoas que interagem com conteúdo de negócios' },
            ].map(item => (
              <div key={item.tipo} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <span className="text-purple-400 font-semibold">{item.tipo}:</span>
                <span className="text-[var(--gray)] ml-2">{item.config}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💡 Estrutura Recomendada</h3>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-white font-semibold mb-3">Para Começar:</p>
            <ul className="space-y-2 text-[var(--gray)]">
              <li>• 1 Campanha de Tráfego</li>
              <li>• 2-3 Grupos de Anúncios (públicos diferentes)</li>
              <li>• 3-5 Anúncios por grupo (criativos diferentes)</li>
              <li>• R$50/dia por grupo de anúncios</li>
              <li>• Rodar por 7 dias antes de otimizar</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">REGRA DOS 7 DIAS</h4>
              <p className="text-[var(--gray)]">
                Não mexa na campanha nos primeiros 7 dias! O algoritmo precisa de tempo para
                <strong className="text-white"> aprender e otimizar</strong>. Mudanças frequentes reiniciam o aprendizado.
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">Por que Kwai?</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            O Kwai tem um público mais <strong className="text-white">popular e regional</strong>.
            CPM mais barato que TikTok e menos concorrência de anunciantes!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Vantagens do Kwai</h3>
          <div className="space-y-2">
            {[
              'CPM até 50% mais barato que TikTok',
              'Público mais velho (30-50 anos)',
              'Forte em cidades do interior',
              'Menos saturado de anúncios',
              'Público mais receptivo a ofertas',
            ].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Configuração Básica</h3>
          <ol className="space-y-3 text-[var(--gray)]">
            <li className="flex gap-3">
              <span className="bg-blue-500/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Acesse <strong className="text-white">ads.kwai.com</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-500/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Crie uma conta Business</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-500/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Adicione método de pagamento</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-blue-500/30 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Crie sua primeira campanha</span>
            </li>
          </ol>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📱 Melhores Práticas</h3>
          <div className="space-y-3">
            {[
              { pratica: 'Vídeos verticais 9:16', desc: 'Formato nativo da plataforma' },
              { pratica: 'Linguagem simples', desc: 'O público é mais popular, evite termos técnicos' },
              { pratica: 'Músicas populares', desc: 'Use hits do momento para aumentar engajamento' },
              { pratica: 'CTA claro', desc: '"Clique no link e fale comigo no WhatsApp"' },
            ].map(item => (
              <div key={item.pratica} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-semibold">{item.pratica}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Orçamento Sugerido</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-400">R$30</p>
              <p className="text-[var(--gray)] text-sm">por dia (mínimo)</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">R$900</p>
              <p className="text-[var(--gray)] text-sm">por mês</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">DICA ESTRATÉGICA</h4>
              <p className="text-[var(--gray)]">
                Use Kwai para <strong className="text-white">cidades menores e interior</strong>.
                O público é mais receptivo e o custo por lead pode ser até 3x menor que outras plataformas!
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">O Poder da Intenção</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            No Google, as pessoas <strong className="text-white">já estão buscando</strong> uma solução!
            Diferente das redes sociais, aqui você aparece para quem já quer comprar.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🔍 Palavras-chave Recomendadas</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <span className="text-blue-400 font-semibold">Alta Intenção (Fundo de Funil)</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['sistema para loja', 'programa para comércio', 'software pdv', 'sistema de gestão comercial', 'controle de estoque para loja'].map(kw => (
                  <span key={kw} className="bg-blue-500/20 text-[var(--gray)] px-2 py-1 rounded text-sm">{kw}</span>
                ))}
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <span className="text-green-400 font-semibold">Média Intenção (Meio de Funil)</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['como controlar estoque', 'emitir nota fiscal', 'organizar finanças da loja', 'sistema para mercadinho'].map(kw => (
                  <span key={kw} className="bg-green-500/20 text-[var(--gray)] px-2 py-1 rounded text-sm">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📝 Estrutura do Anúncio</h3>
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <div>
              <span className="text-blue-400 text-sm">Título 1 (30 caracteres)</span>
              <p className="text-white font-semibold">Sistema para Loja Completo</p>
            </div>
            <div>
              <span className="text-blue-400 text-sm">Título 2 (30 caracteres)</span>
              <p className="text-white font-semibold">PDV + Estoque + Nota Fiscal</p>
            </div>
            <div>
              <span className="text-blue-400 text-sm">Título 3 (30 caracteres)</span>
              <p className="text-white font-semibold">Teste Grátis - Sem Contrato</p>
            </div>
            <div>
              <span className="text-green-400 text-sm">Descrição (90 caracteres)</span>
              <p className="text-[var(--gray)]">Sistema completo para seu comércio. Controle estoque, emita notas e aumente seu lucro. Demonstração grátis!</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">⚙️ Configurações Importantes</h3>
          <div className="space-y-2">
            {[
              { config: 'Localização', valor: 'Cidades onde você atende' },
              { config: 'Idioma', valor: 'Português' },
              { config: 'Dispositivos', valor: 'Todos (mobile converte bem!)' },
              { config: 'Programação', valor: 'Horário comercial (8h-20h)' },
              { config: 'Correspondência', valor: 'Frase ou Exata (evite Ampla no início)' },
            ].map(item => (
              <div key={item.config} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <span className="text-purple-400 font-semibold">{item.config}:</span>
                <span className="text-[var(--gray)] ml-2">{item.valor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Orçamento e CPC</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">R$50-100</p>
              <p className="text-[var(--gray)] text-sm">por dia</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">R$2-5</p>
              <p className="text-[var(--gray)] text-sm">CPC médio</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">PALAVRAS NEGATIVAS</h4>
              <p className="text-[var(--gray)]">
                Adicione palavras negativas para não desperdiçar dinheiro:
                <strong className="text-white"> grátis, gratuito, download, curso, vagas, emprego</strong>.
                Isso evita cliques de quem não vai comprar!
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">O Que é Rede de Display?</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            São os <strong className="text-white">banners</strong> que aparecem em sites, apps e YouTube.
            Ótimo para remarketing e reconhecimento de marca!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📊 Pesquisa vs Display</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Pesquisa</h4>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Texto apenas</li>
                <li>• Alta intenção</li>
                <li>• CPC mais alto</li>
                <li>• Conversão direta</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">Display</h4>
              <ul className="text-[var(--gray)] text-sm space-y-1">
                <li>• Imagens/banners</li>
                <li>• Baixa intenção</li>
                <li>• CPM mais barato</li>
                <li>• Reconhecimento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Melhor Uso: Remarketing</h3>
          <p className="text-[var(--gray)] mb-4">
            Remarketing mostra anúncios para quem <strong className="text-white">já visitou seu site</strong>.
            É a forma mais eficiente de usar Display!
          </p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-white font-semibold mb-2">Como funciona:</p>
            <ol className="text-[var(--gray)] space-y-2">
              <li>1. Pessoa visita seu site</li>
              <li>2. Pixel do Google marca essa pessoa</li>
              <li>3. Ela vê seus banners em outros sites</li>
              <li>4. Lembra de você e volta para comprar!</li>
            </ol>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📐 Tamanhos de Banner</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { tamanho: '300x250', nome: 'Retângulo Médio' },
              { tamanho: '336x280', nome: 'Retângulo Grande' },
              { tamanho: '728x90', nome: 'Leaderboard' },
              { tamanho: '300x600', nome: 'Meia Página' },
              { tamanho: '320x50', nome: 'Mobile Banner' },
              { tamanho: '320x100', nome: 'Mobile Large' },
            ].map(item => (
              <div key={item.tamanho} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <span className="text-purple-400 font-mono">{item.tamanho}</span>
                <p className="text-[var(--gray)] text-xs mt-1">{item.nome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💡 Dicas para Banners</h3>
          <div className="space-y-2">
            {[
              'Logo visível e legível',
              'Oferta clara e direta',
              'CTA destacado (botão)',
              'Cores contrastantes',
              'Pouco texto (menos é mais)',
              'Imagem de alta qualidade',
            ].map(item => (
              <div key={item} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">ANÚNCIOS RESPONSIVOS</h4>
              <p className="text-[var(--gray)]">
                Use <strong className="text-white">Anúncios Responsivos de Display</strong>.
                Você sobe imagens e textos, e o Google monta automaticamente os melhores formatos.
                Mais fácil e mais eficiente!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'mod4-6': {
    titulo: 'Meta Ads - Facebook',
    modulo: 'Tráfego Pago',
    conteudo: (
      <div className="space-y-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold gold-text mb-4">Facebook Ainda Funciona!</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Apesar do hype do TikTok, o Facebook ainda tem <strong className="text-white">bilhões de usuários</strong>.
            E o público empresarial ainda está muito ativo aqui!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Objetivos Recomendados</h3>
          <div className="space-y-3">
            {[
              { objetivo: 'Leads', desc: 'Formulário dentro do Facebook', quando: 'Quer captar contatos direto' },
              { objetivo: 'Mensagens', desc: 'Abre conversa no Messenger/WhatsApp', quando: 'Quer falar direto com o lead' },
              { objetivo: 'Tráfego', desc: 'Manda para site ou landing page', quando: 'Tem página de captura' },
            ].map(item => (
              <div key={item.objetivo} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{item.objetivo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
                <p className="text-[var(--gray)] text-xs mt-1">📌 Quando usar: {item.quando}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">👥 Segmentação de Público</h3>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <span className="text-green-400 font-semibold">Público Salvo</span>
              <p className="text-[var(--gray)] text-sm mt-1">Baseado em interesses: Empreendedorismo, Donos de negócio, Gestão empresarial</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <span className="text-purple-400 font-semibold">Público Personalizado</span>
              <p className="text-[var(--gray)] text-sm mt-1">Quem visitou seu site, assistiu seus vídeos ou interagiu com sua página</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <span className="text-orange-400 font-semibold">Público Semelhante (Lookalike)</span>
              <p className="text-[var(--gray)] text-sm mt-1">Pessoas parecidas com seus clientes atuais</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📐 Formatos de Anúncio</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { formato: 'Imagem Única', desc: '1080x1080 ou 1200x628' },
              { formato: 'Vídeo', desc: 'Até 15 seg, vertical ou quadrado' },
              { formato: 'Carrossel', desc: '2-10 imagens/vídeos' },
              { formato: 'Stories', desc: '1080x1920 (vertical)' },
            ].map(item => (
              <div key={item.formato} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <span className="text-purple-400 font-semibold">{item.formato}</span>
                <p className="text-[var(--gray)] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">💰 Orçamento Inicial</h3>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-white">Por conjunto de anúncios:</span>
              <span className="text-orange-400 font-bold">R$30-50/dia</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-white">Mensal (mínimo):</span>
              <span className="text-orange-400 font-bold">R$900-1.500</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">PIXEL É OBRIGATÓRIO</h4>
              <p className="text-[var(--gray)]">
                Instale o <strong className="text-white">Pixel do Meta</strong> no seu site.
                Ele rastreia conversões e permite criar públicos de remarketing.
                Sem pixel, você está jogando dinheiro fora!
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">Instagram: Visual é Tudo!</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            O Instagram é uma plataforma <strong className="text-white">extremamente visual</strong>.
            Seus anúncios precisam ser bonitos e chamar atenção em segundos!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📍 Posicionamentos</h3>
          <div className="space-y-3">
            {[
              { local: 'Feed', desc: 'Aparece entre os posts. Melhor para conteúdo mais elaborado.' },
              { local: 'Stories', desc: 'Tela cheia, some em 24h. Urgência e CTA direto.' },
              { local: 'Reels', desc: 'Vídeos curtos verticais. Maior alcance orgânico.' },
              { local: 'Explorar', desc: 'Aba de descoberta. Alcança público novo.' },
            ].map(item => (
              <div key={item.local} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <span className="text-blue-400 font-semibold">{item.local}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎨 Boas Práticas Visuais</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Cores vibrantes que contrastem',
              'Rostos humanos geram conexão',
              'Texto curto e legível',
              'Logo sutil, não invasivo',
              'Primeiros 3 seg impactantes',
              'CTA claro e visível',
            ].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)] text-sm">✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📝 Exemplo de Copy</h3>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-white italic">
              "Cansado de perder vendas por falta de controle? 😩<br /><br />
              Com o Império Sistemas você:<br />
              ✅ Controla estoque em tempo real<br />
              ✅ Emite nota fiscal em segundos<br />
              ✅ Sabe seu lucro de verdade<br /><br />
              Clique em 'Saiba Mais' e peça uma demonstração GRÁTIS! 🚀"
            </p>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">📊 Métricas para Acompanhar</h3>
          <div className="space-y-2">
            {[
              { metrica: 'CPM', bom: 'Abaixo de R$30' },
              { metrica: 'CTR', bom: 'Acima de 1%' },
              { metrica: 'CPC', bom: 'Abaixo de R$2' },
              { metrica: 'CPL (Custo por Lead)', bom: 'Abaixo de R$20' },
            ].map(item => (
              <div key={item.metrica} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex justify-between">
                <span className="text-orange-400 font-semibold">{item.metrica}</span>
                <span className="text-green-400">{item.bom}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">TESTE A/B É ESSENCIAL</h4>
              <p className="text-[var(--gray)]">
                Crie <strong className="text-white">2-3 variações</strong> de cada anúncio.
                Mude a imagem, o texto ou o CTA. Depois de 7 dias, pause os piores e escale os melhores!
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">Facebook Não Morreu!</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Enquanto todos focam em TikTok e Instagram, o Facebook continua forte entre
            <strong className="text-white"> empresários e donos de negócio</strong>. Menos concorrência!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">📄 Página Profissional</h3>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <span className="text-blue-400 font-semibold">O que postar:</span>
              <ul className="mt-2 space-y-1 text-[var(--gray)] text-sm">
                <li>• Dicas rápidas sobre gestão</li>
                <li>• Cases de sucesso de clientes</li>
                <li>• Novidades do sistema</li>
                <li>• Conteúdo educativo</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <span className="text-green-400 font-semibold">Frequência ideal:</span>
              <p className="text-[var(--gray)] text-sm mt-1">1 post por dia ou no mínimo 3x por semana</p>
            </div>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">👥 Grupos: Onde Está o Ouro</h3>
          <p className="text-[var(--gray)] mb-4">
            Grupos de Facebook são <strong className="text-white">minas de ouro</strong> para encontrar clientes.
            Entre em grupos de empresários e comerciantes da sua região!
          </p>
          <div className="space-y-3">
            {[
              { grupo: 'Grupos de cidade/região', estrategia: 'Participe ajudando, não vendendo direto' },
              { grupo: 'Grupos de nicho', estrategia: 'Pet shops, mercadinhos, lojistas, etc.' },
              { grupo: 'Grupos de empreendedores', estrategia: 'Compartilhe conhecimento genuíno' },
            ].map(item => (
              <div key={item.grupo} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <span className="text-purple-400 font-semibold">{item.grupo}</span>
                <p className="text-[var(--gray)] text-sm mt-1">{item.estrategia}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Como Agir nos Grupos</h3>
          <div className="space-y-2">
            {[
              'Responda dúvidas sobre gestão (sem vender)',
              'Compartilhe dicas úteis',
              'Comente em posts relevantes',
              'Só mencione o sistema quando fizer sentido',
              'Nunca spamme links ou promoções',
            ].map(item => (
              <div key={item} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-[var(--gray)]">✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">❌ O Que NÃO Fazer</h3>
          <div className="space-y-2">
            {[
              'Entrar só para fazer propaganda',
              'Postar links sem contexto',
              'Mandar mensagem privada vendendo',
              'Ignorar as regras do grupo',
              'Ser agressivo nas abordagens',
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
              <h4 className="text-yellow-500 font-semibold mb-2">ESTRATÉGIA NINJA</h4>
              <p className="text-[var(--gray)]">
                Crie seu <strong className="text-white">próprio grupo</strong>: "Dicas para Lojistas de [Sua Cidade]".
                Convide comerciantes, poste conteúdo útil. Você vira a autoridade e os leads vêm até você!
              </p>
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
          <h3 className="text-xl font-semibold gold-text mb-4">Reels: Seu Melhor Amigo</h3>
          <p className="text-[var(--gray)] leading-relaxed">
            Reels é onde o Instagram está <strong className="text-white">entregando mais alcance</strong>.
            É sua maior chance de viralizar e atrair seguidores novos!
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎬 Reels que Funcionam</h3>
          <div className="space-y-3">
            {[
              { formato: 'Dor + Solução', tempo: '15-30 seg', desc: 'Comece com o problema, termine com a solução' },
              { formato: 'Tutorial Rápido', tempo: '30-60 seg', desc: 'Ensine algo prático em poucos passos' },
              { formato: 'Antes x Depois', tempo: '15 seg', desc: 'Transição mostrando transformação' },
              { formato: 'Trend + Mensagem', tempo: '15-30 seg', desc: 'Use áudios virais com sua mensagem' },
            ].map(item => (
              <div key={item.formato} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-semibold">{item.formato}</span>
                  <span className="text-[var(--gray)] text-xs bg-white/10 px-2 py-1 rounded">{item.tempo}</span>
                </div>
                <p className="text-[var(--gray)] text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-4">📱 Stories: Conexão Diária</h3>
          <p className="text-[var(--gray)] mb-4">
            Stories servem para <strong className="text-white">manter relacionamento</strong> com quem já te segue.
            Quem vê seus stories está mais próximo de comprar!
          </p>
          <div className="space-y-2">
            {[
              { tipo: 'Bastidores', desc: 'Mostre seu dia a dia trabalhando' },
              { tipo: 'Enquetes', desc: 'Pergunte algo e gere interação' },
              { tipo: 'Caixinha de Perguntas', desc: 'Responda dúvidas sobre gestão' },
              { tipo: 'Depoimentos', desc: 'Reposte feedback de clientes' },
              { tipo: 'Ofertas', desc: 'Promoções exclusivas para seguidores' },
            ].map(item => (
              <div key={item.tipo} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <span className="text-green-400 font-semibold">{item.tipo}:</span>
                <span className="text-[var(--gray)] text-sm ml-2">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">📅 Calendário Semanal</h3>
          <div className="space-y-2">
            {[
              { dia: 'Segunda', reels: 'Dica da semana', stories: 'Bastidores' },
              { dia: 'Terça', reels: '-', stories: 'Enquete' },
              { dia: 'Quarta', reels: 'Tutorial rápido', stories: 'Caixinha' },
              { dia: 'Quinta', reels: '-', stories: 'Depoimento' },
              { dia: 'Sexta', reels: 'Trend/Humor', stories: 'Oferta/CTA' },
            ].map(item => (
              <div key={item.dia} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 grid grid-cols-3 gap-2">
                <span className="text-purple-400 font-semibold">{item.dia}</span>
                <span className="text-[var(--gray)] text-sm">Reels: {item.reels}</span>
                <span className="text-[var(--gray)] text-sm">Stories: {item.stories}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">🏷️ Hashtags para Reels</h3>
          <div className="flex flex-wrap gap-2">
            {['#empreendedor', '#lojista', '#comercio', '#gestao', '#vendas', '#dica', '#negocios', '#pequenoempreendedor', '#sucesso'].map(tag => (
              <span key={tag} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[var(--gray)] text-sm mt-3">💡 Use 5-10 hashtags. Menos é mais no Instagram!</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div>
              <h4 className="text-yellow-500 font-semibold mb-2">CTA NO FINAL</h4>
              <p className="text-[var(--gray)]">
                Todo Reel deve terminar com um <strong className="text-white">CTA claro</strong>:
                "Salva esse vídeo!", "Manda pra um amigo lojista!", "Comenta SIM que eu te explico mais!"
              </p>
            </div>
          </div>
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
