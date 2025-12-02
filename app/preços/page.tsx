'use client';

import Link from "next/link";

const planos = [
  {
    nome: "Gratuito",
    preco: "R$ 0",
    subtitulo: "Comece sem pagar nada",
    destaque: false,
    beneficios: [
      "10 questões por dia",
      "Explicações simplificadas",
      "Plano de estudo básico",
      "Acesso em qualquer dispositivo",
    ],
    botao: "Criar conta grátis",
    link: "/disciplinas",
  },
  {
    nome: "Pro Mensal",
    preco: "R$ 29,90",
    subtitulo: "O mais popular 💥",
    destaque: true,
    beneficios: [
      "Simulados ilimitados",
      "Explicações completas e passo a passo",
      "Histórico de desempenho",
      "Análise por disciplina",
      "Plano adaptativo da IA",
      "Dicas de redação com correção automática",
      "Sem anúncios",
    ],
    botao: "Assinar agora",
    link: "/assinatura/mensal",
  },
  {
    nome: "Pro Anual",
    preco: "R$ 249",
    subtitulo: "Economize 2 meses",
    destaque: false,
    beneficios: [
      "Tudo do plano mensal",
      "2 meses grátis (R$ 20/mês)",
      "Ranking Nacional",
      "Certificado ENEM-IA",
      "Revisão Turbo antes da prova",
    ],
    botao: "Assinar anual",
    link: "/assinatura/anual",
  },
];

export default function PrecosPage() {
  return (
    <main className="min-h-screen w-full bg-[#054930] text-white relative">
      {/* fundo de lousa suave */}
      <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-soft-light bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.25),transparent_55%),radial-gradient(circle_at_100%_0,rgba(255,255,255,0.2),transparent_55%)]" />

      {/* conteúdo central */}
      <div className="pt-20 pb-12 flex justify-center px-4 relative z-10">
        <div className="w-full max-w-5xl rounded-3xl border border-emerald-300/70 bg-gradient-to-b from-emerald-900/95 via-emerald-950 to-emerald-900/95 shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* linha superior clara */}
          <div className="h-1 w-full bg-emerald-300/70" />

          <div className="px-6 sm:px-10 py-8 sm:py-10">
            {/* título */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] text-center">
              Escolha seu plano e turbine seus estudos
            </h1>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto text-center">
              Todos os planos foram criados para você aprender mais rápido, no seu ritmo,
              com simulados inteligentes e explicações por IA.
            </p>

            {/* cards de plano */}
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {planos.map((p) => (
                <div
                  key={p.nome}
                  className={`relative flex flex-col rounded-2xl px-4 py-6 shadow-[0_0_25px_rgba(0,0,0,0.6)] border ${
                    p.destaque
                      ? "border-amber-400 bg-emerald-950"
                      : "border-emerald-400/70 bg-emerald-950/90"
                  }`}
                >
                  {p.destaque && (
                    <span className="absolute -top-3 right-4 bg-amber-400 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      MAIS POPULAR
                    </span>
                  )}

                  <h2 className="text-lg font-bold mb-1">{p.nome}</h2>
                  <p className="text-xs text-emerald-100/90 mb-3">{p.subtitulo}</p>

                  <div className="mb-4">
                    <p
                      className={`text-2xl font-extrabold ${
                        p.destaque ? "text-amber-300" : "text-emerald-100"
                      }`}
                    >
                      {p.preco}
                    </p>
                    {p.nome !== "Gratuito" && (
                      <p className="text-[11px] text-emerald-100/80">por mês</p>
                    )}
                  </div>

                  <ul className="text-xs text-emerald-50/95 space-y-1 mb-4 flex-1">
                    {p.beneficios.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>✅</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.link}
                    className={`mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      p.destaque
                        ? "bg-amber-400 text-emerald-950 hover:bg-amber-300"
                        : "bg-emerald-300 text-emerald-950 hover:bg-emerald-200"
                    }`}
                  >
                    {p.botao}
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ simples */}
            <div className="mt-10 border-t border-emerald-700/60 pt-6 text-xs sm:text-sm text-emerald-100/85">
              <h2 className="font-semibold mb-3 text-base sm:text-lg">
                Perguntas frequentes
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Preciso de cartão para o plano gratuito?</p>
                  <p>Não. Você cria sua conta e já pode estudar sem informar cartão.</p>
                </div>
                <div>
                  <p className="font-semibold">Posso cancelar quando quiser?</p>
                  <p>Sim. Cancelamento instantâneo direto no painel do aluno.</p>
                </div>
                <div>
                  <p className="font-semibold">Funciona bem no celular?</p>
                  <p>
                    O ENEM-IA foi pensado para telas pequenas, com leitura confortável e
                    botões grandes para toque.
                  </p>
                </div>
              </div>
            </div>

            {/* rodapé pequeno dentro do card */}
            <p className="mt-6 text-[11px] text-emerald-100/70 text-center">
              Em breve: pagamento via Pix e cartão direto na plataforma.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
