// app/assinatura/pro/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PRECO_MENSAL = 79.90;
const PRECO_ANUAL = 799.00;

function AssinaturaPremiumContent() {
  const searchParams = useSearchParams();
  const periodoInicial = searchParams.get('periodo') === 'anual';

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [metodo, setMetodo] = useState<'pix'|'cartao'|null>(null);
  const [anual, setAnual] = useState(periodoInicial);

  const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY || 'sua-chave-pix-aqui';
  const WHATS = process.env.NEXT_PUBLIC_WHATSAPP || 'https://wa.me/5500000000000';

  const precoAtual = anual ? PRECO_ANUAL : PRECO_MENSAL;
  const periodoTexto = anual ? '/ano' : '/mes';

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/planos" className="text-purple-300 hover:text-white text-sm mb-4 inline-block">
          ← Voltar aos planos
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Assinar ENEM PRO Premium</h1>
        <p className="mt-2 text-purple-200">
          O plano completo para maximo desempenho
        </p>

        {/* Toggle Mensal/Anual */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => setAnual(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !anual
                ? 'bg-yellow-500 text-purple-900'
                : 'bg-purple-800 text-purple-300 hover:bg-purple-700'
            }`}
          >
            Mensal R$ {PRECO_MENSAL.toFixed(2)}
          </button>
          <button
            onClick={() => setAnual(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              anual
                ? 'bg-yellow-500 text-purple-900'
                : 'bg-purple-800 text-purple-300 hover:bg-purple-700'
            }`}
          >
            Anual R$ {PRECO_ANUAL.toFixed(2)}
          </button>
          {anual && (
            <span className="text-green-400 text-sm font-semibold">
              Economize 17%!
            </span>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-purple-800/50 ring-1 ring-purple-600 p-5 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-yellow-400">
              R$ {precoAtual.toFixed(2)}
            </div>
            <div className="text-purple-300 text-sm">{periodoTexto}</div>
          </div>

          <div className="grid gap-3">
            <input
              className="rounded-lg border border-purple-600 bg-purple-900 px-3 py-2 text-sm text-white placeholder-purple-400"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="rounded-lg border border-purple-600 bg-purple-900 px-3 py-2 text-sm text-white placeholder-purple-400"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-2">
              <p className="text-sm font-semibold text-white">Escolha o metodo de pagamento:</p>
              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setMetodo('pix')}
                  className={`rounded-xl px-4 py-3 font-semibold ring-1 transition ${
                    metodo === 'pix'
                      ? 'bg-yellow-500 text-purple-900 ring-yellow-500'
                      : 'bg-purple-900 text-white ring-purple-600 hover:bg-purple-800'
                  }`}
                >
                  PIX (recomendado)
                </button>
                <button
                  onClick={() => setMetodo('cartao')}
                  className={`rounded-xl px-4 py-3 font-semibold ring-1 transition ${
                    metodo === 'cartao'
                      ? 'bg-yellow-500 text-purple-900 ring-yellow-500'
                      : 'bg-purple-900 text-white ring-purple-600 hover:bg-purple-800'
                  }`}
                >
                  Cartao de credito
                </button>
              </div>
            </div>

            {/* PIX */}
            {metodo === 'pix' && (
              <div className="mt-4 rounded-xl bg-purple-900 p-4 ring-1 ring-purple-600">
                <p className="text-sm text-purple-200">
                  Envie <b className="text-yellow-400">R$ {precoAtual.toFixed(2)}</b> para a chave PIX:
                </p>
                <p className="mt-2 select-all rounded-lg bg-purple-950 p-3 font-mono text-sm ring-1 ring-purple-600 text-white">
                  {PIX_KEY}
                </p>
                <p className="mt-3 text-sm text-purple-300">
                  Apos o pagamento, envie o comprovante pelo WhatsApp para ativacao imediata.
                </p>
                <a
                  href={WHATS}
                  target="_blank"
                  className="mt-3 inline-flex rounded-xl bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                >
                  Enviar comprovante
                </a>
              </div>
            )}

            {/* Cartao */}
            {metodo === 'cartao' && (
              <div className="mt-4 rounded-xl bg-purple-900 p-4 ring-1 ring-purple-600">
                <p className="text-sm text-purple-200">
                  Integracao com cartao (Stripe/Mercado Pago) — em breve!
                </p>
                <Link
                  href={process.env.NEXT_PUBLIC_CHECKOUT_PREMIUM || '#'}
                  className="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
                >
                  Ir para checkout seguro
                </Link>
              </div>
            )}
          </div>

          <ul className="mt-6 text-sm text-purple-200 list-disc pl-5 space-y-1">
            <li>Simulados ilimitados</li>
            <li>Explicacoes completas por IA</li>
            <li>Dashboard completo de desempenho</li>
            <li>Comparacao com notas de corte SISU</li>
            <li>Plano de estudos personalizado</li>
            <li>3 correcoes de redacao/mes</li>
            <li>10 convites mensais para desafios</li>
            <li>Suporte prioritario</li>
          </ul>
        </div>

        <p className="mt-4 text-xs text-purple-400">
          Duvidas? <Link href="/contato" className="underline hover:text-white">Fale conosco</Link>.
        </p>
      </div>
    </main>
  );
}

export default function AssinaturaPremiumPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-purple-900 flex items-center justify-center"><div className="text-white">Carregando...</div></div>}>
      <AssinaturaPremiumContent />
    </Suspense>
  );
}
