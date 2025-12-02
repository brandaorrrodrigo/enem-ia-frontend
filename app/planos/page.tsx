// app/enem/planos/page.tsx
import { EnemNavbar } from "@/components/enem/EnemNavbar";
import Link from "next/link";

export default function EnemPlanosPage() {
  return (
    <main className="min-h-screen w-full bg-[#054930] text-white relative">
      <EnemNavbar />

      {/* textura de lousa + brilho */}
      <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-soft-light bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.22),transparent_55%),radial-gradient(circle_at_100%_0,rgba(255,255,255,0.18),transparent_55%)]" />

      {/* “rabiscos de giz” suaves */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <div className="absolute -left-10 top-16 h-40 w-72 rounded-full border border-emerald-100/40 rotate-[-8deg]" />
        <div className="absolute right-[-30px] top-32 h-32 w-64 rounded-full border border-emerald-100/35 rotate-[14deg]" />
        <div className="absolute left-10 bottom-20 h-24 w-40 border-t border-emerald-50/40 rotate-[-6deg]" />
        <div className="absolute right-16 bottom-32 h-24 w-44 border-b border-emerald-50/35 rotate-[7deg]" />
      </div>

      <div className="pt-24 pb-12 flex justify-center px-4 relative z-10">
        <div className="w-full max-w-5xl rounded-3xl border border-emerald-300/80 bg-gradient-to-b from-emerald-950/95 via-[#02271a] to-emerald-950/95 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* linha clara superior */}
          <div className="h-1 w-full bg-emerald-300/80" />

          <div className="px-6 sm:px-10 py-8 sm:py-10">
            {/* título / subtítulo */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-50 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                Planos do <span className="text-emerald-200">ENEM-IA</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-emerald-100/85 max-w-2xl mx-auto">
                Todos os planos usam a inteligência do ENEM-IA para corrigir, explicar e
                acompanhar sua evolução como se fosse um professor particular 24h na sua lousa.
              </p>
            </div>

            {/* cards de plano */}
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {/* Plano Gratuito */}
              <div className="rounded-2xl border border-emerald-300/70 bg-emerald-950/85 px-4 py-6 shadow-[0_0_25px_rgba(0,0,0,0.7)] flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/80 mb-2">
                  Iniciante
                </p>
                <h2 className="text-lg font-bold text-emerald-50 mb-1">
                  Plano Gratuito
                </h2>
                <p className="text-sm text-emerald-100/90 mb-4">
                  Para conhecer a plataforma, testar simulados e sentir como a lousa do ENEM-IA funciona.
                </p>

                <p className="text-2xl font-extrabold text-emerald-200 mb-1">
                  R$ 0
                </p>
                <p className="text-[11px] text-emerald-100/75 mb-4">
                  acesso grátis para começar
                </p>

                <ul className="text-xs text-emerald-50/95 space-y-1.5 mb-4">
                  <li>• Simulados básicos por área</li>
                  <li>• Algumas explicações por IA</li>
                  <li>• Dashboard simples de desempenho</li>
                  <li>• FP e níveis até <span className="font-semibold">Prata</span></li>
                </ul>

                <Link
                  href="/disciplinas"
                  className="mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold bg-emerald-300 text-emerald-950 hover:bg-emerald-200 transition-colors"
                >
                  Começar grátis
                </Link>
              </div>

              {/* Plano Pro (destaque) */}
              <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-900 px-4 py-6 shadow-[0_0_32px_rgba(0,0,0,0.9)] flex flex-col relative">
                <span className="absolute -top-3 right-4 bg-amber-400 text-emerald-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                  MAIS USADO
                </span>

                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/90 mb-2">
                  Focado
                </p>
                <h2 className="text-lg font-bold text-emerald-50 mb-1">
                  ENEM-IA Pro
                </h2>
                <p className="text-sm text-emerald-100/90 mb-4">
                  Para quem quer simular o ENEM de verdade, com explicações completas, TRI e análise de nota de corte.
                </p>

                <p className="text-2xl font-extrabold text-amber-300 mb-1">
                  R$ XX/mês
                </p>
                <p className="text-[11px] text-emerald-100/80 mb-4">
                  acesso total ao ENEM-IA
                </p>

                <ul className="text-xs text-emerald-50/95 space-y-1.5 mb-4">
                  <li>• Simulados completos por prova ou por área</li>
                  <li>• Explicações ilimitadas com IA pedagógica</li>
                  <li>• Comparação com notas de corte do SISU</li>
                  <li>• Ranking global e desafios semanais</li>
                  <li>• Painel de evolução por disciplina</li>
                  <li>• FP ilimitado e níveis até <span className="font-semibold">Diamante</span></li>
                </ul>

                <Link
                  href="/assinatura/mensal"
                  className="mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold bg-amber-300 text-emerald-950 hover:bg-amber-200 transition-colors"
                >
                  Assinar ENEM-IA Pro
                </Link>
              </div>

              {/* Plano Turmas/Escolas */}
              <div className="rounded-2xl border border-emerald-300/70 bg-emerald-950/85 px-4 py-6 shadow-[0_0_25px_rgba(0,0,0,0.7)] flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/80 mb-2">
                  Escolas & Cursinhos
                </p>
                <h2 className="text-lg font-bold text-emerald-50 mb-1">
                  ENEM-IA para Turmas
                </h2>
                <p className="text-sm text-emerald-100/90 mb-4">
                  Para quem quer acompanhar uma turma inteira com relatórios, ranking interno e simulados personalizados.
                </p>

                <p className="text-2xl font-extrabold text-emerald-200 mb-1">
                  Sob consulta
                </p>
                <p className="text-[11px] text-emerald-100/80 mb-4">
                  planos flexíveis para escolas
                </p>

                <ul className="text-xs text-emerald-50/95 space-y-1.5 mb-4">
                  <li>• Painel do professor e coordenador</li>
                  <li>• Relatórios por aluno e por turma</li>
                  <li>• Exportação de desempenhos</li>
                  <li>• Simulados presenciais + correção pelo ENEM-IA</li>
                </ul>

                <Link
                  href="/contato"
                  className="mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold bg-emerald-200 text-emerald-950 hover:bg-emerald-100 transition-colors"
                >
                  Falar com a equipe
                </Link>
              </div>
            </div>

            {/* FAQ enxuto no tema lousa */}
            <div className="mt-10 border-t border-emerald-300/40 pt-6">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-50 mb-4">
                Perguntas frequentes sobre os planos
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-emerald-100/90">
                <div>
                  <p className="font-semibold text-emerald-50">
                    Preciso de cartão para usar o plano gratuito?
                  </p>
                  <p>
                    Não. Você cria sua conta, escolhe uma disciplina e já pode fazer
                    simulados de graça na lousa do ENEM-IA.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-50">
                    Posso cancelar o plano Pro quando quiser?
                  </p>
                  <p>
                    Sim. O cancelamento é feito direto no painel do aluno, sem burocracia.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-50">
                    As explicações são realmente feitas por IA?
                  </p>
                  <p>
                    Sim. A IA foi ajustada para explicar passo a passo, com nível de linguagem
                    adaptado ao seu desempenho e número de erros.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-50">
                    Funciona bem no celular?
                  </p>
                  <p>
                    100%. Todo o ENEM-IA foi pensado para tela pequena: botões grandes,
                    leitura fácil e lousa responsiva.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA final na própria lousa */}
            <div className="mt-10 rounded-2xl border border-emerald-200/60 bg-emerald-900/60 px-5 py-5 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-50 mb-2">
                Pronto para subir sua nota no ENEM?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mb-4">
                Comece no plano gratuito, faça seus primeiros simulados e, quando estiver firme,
                migre para o ENEM-IA Pro para treinar como se fosse o dia da prova.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/disciplinas"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold bg-emerald-300 text-emerald-950 hover:bg-emerald-200 transition-colors"
                >
                  Começar grátis agora
                </Link>
                <Link
                  href="/assinatura/mensal"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold border border-emerald-200/70 text-emerald-50 hover:bg-emerald-800/70 transition-colors"
                >
                  Ver detalhes do ENEM-IA Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
