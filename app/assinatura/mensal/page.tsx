// app/assinatura/mensal/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRECO = 29.90;

export default function AssinaturaMensalPage() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [metodo, setMetodo] = useState<'pix'|'cartao'|null>(null);

  const PIX_KEY = process.env.NEXT_PUBLIC_PIX_KEY || 'sua-chave-pix-aqui';
  const WHATS = process.env.NEXT_PUBLIC_WHATSAPP || 'https://wa.me/5500000000000';

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold">Assinatura Mensal</h1>
        <p className="mt-2 text-slate-600">Plano Pro por <b>R$ {PRECO.toFixed(2)}</b>/mês.</p>

        <div className="mt-6 rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
          <div className="grid gap-3">
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-2">
              <p className="text-sm font-semibold">Escolha o método de pagamento:</p>
              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setMetodo('pix')}
                  className={`rounded-xl px-4 py-3 font-semibold ring-1 transition ${
                    metodo === 'pix'
                      ? 'bg-slate-900 text-white ring-slate-900'
                      : 'bg-white text-slate-900 ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  PIX (recomendado)
                </button>
                <button
                  onClick={() => setMetodo('cartao')}
                  className={`rounded-xl px-4 py-3 font-semibold ring-1 transition ${
                    metodo === 'cartao'
                      ? 'bg-slate-900 text-white ring-slate-900'
                      : 'bg-white text-slate-900 ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Cartão de crédito
                </button>
              </div>
            </div>

            {/* PIX */}
            {metodo === 'pix' && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm text-slate-700">
                  Envie <b>R$ {PRECO.toFixed(2)}</b> para a chave PIX:
                </p>
                <p className="mt-2 select-all rounded-lg bg-white p-3 font-mono text-sm ring-1 ring-slate-200">
                  {PIX_KEY}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Após o pagamento, envie o comprovante pelo WhatsApp para ativação imediata.
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

            {/* Cartão */}
            {metodo === 'cartao' && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm text-slate-700">
                  Integração com cartão (Stripe/Mercado Pago) — coloque aqui o link do seu checkout.
                </p>
                <Link
                  href={process.env.NEXT_PUBLIC_CHECKOUT_MENSAL || '#'}
                  className="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
                >
                  Ir para checkout seguro
                </Link>
              </div>
            )}
          </div>

          <ul className="mt-6 text-sm text-slate-700 list-disc pl-5">
            <li>Simulados ilimitados</li>
            <li>Explicações passo a passo por IA</li>
            <li>Plano de estudo adaptativo</li>
            <li>Histórico de desempenho e revisão inteligente</li>
          </ul>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Dúvidas? <Link href="/contato" className="underline">Fale conosco</Link>.
        </p>
      </div>
    </main>
  );
}
