'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';

export default function ENEMHomePage() {
  const router = useRouter();

  return (
    <div className="container-ia min-h-screen">
      {/* HERO SECTION */}
      <section className="hero-ia">
        <div className="max-w-4xl mx-auto">
          <h1 className="title-ia text-center mb-6">
            ENEM<span className="text-yellow-300">-IA</span>
          </h1>

          <p className="subtitle-ia text-center max-w-2xl mx-auto mb-12">
            Prepare-se para o ENEM com a ajuda da Inteligência Artificial.
            Simulados realistas, explicações personalizadas e acompanhamento completo do seu progresso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn-ia w-full sm:w-auto text-lg px-8 py-4"
            >
              🚀 Começar agora
            </button>
            <button
              onClick={() => router.push('/enem/dashboard')}
              className="btn-ia-secondary w-full sm:w-auto text-lg px-8 py-4"
            >
              📊 Ver Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="pb-16">
        <div className="grid-ia max-w-5xl mx-auto">
          {/* Card 1: Simulados Inteligentes */}
          <div className="card-ia" style={{ padding: '30px' }}>
            <div className="text-center mb-6">
              <div className="text-7xl mb-5">📝</div>
              <h3 className="title-ia-sm text-2xl">Simulados Inteligentes</h3>
            </div>
            <p className="subtitle-ia text-center mb-0 text-white text-base leading-relaxed">
              Questões reais do ENEM com sistema TRI (Teoria de Resposta ao Item).
              Avaliação precisa do seu desempenho, igual à prova oficial.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Questões de provas anteriores</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Nota TRI calculada automaticamente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Cronômetro e ambiente realista</span>
              </li>
            </ul>
          </div>

          {/* Card 2: IA que Explica */}
          <div className="card-ia" style={{ padding: '30px' }}>
            <div className="text-center mb-6">
              <div className="text-7xl mb-5">🧠</div>
              <h3 className="title-ia-sm text-2xl">IA que Explica</h3>
            </div>
            <p className="subtitle-ia text-center mb-0 text-white text-base leading-relaxed">
              Não entendeu uma questão? Nossa IA explica de forma personalizada,
              adaptando a linguagem até você compreender completamente.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Explicações pedagógicas detalhadas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Reexplicação simplificada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Tire dúvidas específicas</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Acompanhamento Completo */}
          <div className="card-ia" style={{ padding: '30px' }}>
            <div className="text-center mb-6">
              <div className="text-7xl mb-5">📈</div>
              <h3 className="title-ia-sm text-2xl">Acompanhamento</h3>
            </div>
            <p className="subtitle-ia text-center mb-0 text-white text-base leading-relaxed">
              Dashboard completo com estatísticas, gráficos de evolução,
              pontuação, desafios e metas personalizadas.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Estatísticas por área de conhecimento</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Sistema de pontos e conquistas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-300 text-xl font-bold">✓</span>
                <span className="text-white text-base">Desafios semanais e metas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto card-ia">
          <h2 className="title-ia-sm text-center mb-8">Como Funciona?</h2>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 border-2 border-yellow-300 flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Configure seu Simulado</h3>
                <p className="text-white/80">
                  Escolha o número de questões, áreas de conhecimento e nível de dificuldade.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 border-2 border-yellow-300 flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Responda as Questões</h3>
                <p className="text-white/80">
                  Ambiente realista com cronômetro, barra de progresso e navegação entre questões.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 border-2 border-yellow-300 flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Veja seus Resultados</h3>
                <p className="text-white/80">
                  Nota TRI, estatísticas detalhadas e análise de desempenho por área.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 border-2 border-yellow-300 flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Peça Explicações</h3>
                <p className="text-white/80">
                  Clique em qualquer questão e receba explicações personalizadas da IA.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-300/20 border-2 border-yellow-300 flex items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">5</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Acompanhe sua Evolução</h3>
                <p className="text-white/80">
                  Dashboard com gráficos, conquistas e comparação com simulados anteriores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDE SOCIAL */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="card-ia p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30">
            <div className="text-center mb-6">
              <h2 className="title-ia-sm mb-2">📱 ENEM-IA Social</h2>
              <p className="text-white/70">Conecte-se, compita e evolua com outros estudantes!</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/enem/feed"
                className="card-ia p-4 text-center hover:scale-105 transition-transform bg-white/5"
              >
                <span className="text-4xl mb-2 block">📱</span>
                <span className="text-white font-bold text-sm block">Feed Social</span>
                <span className="text-white/50 text-xs">Veja o que rola</span>
              </Link>

              <Link
                href="/enem/ranking"
                className="card-ia p-4 text-center hover:scale-105 transition-transform bg-white/5"
              >
                <span className="text-4xl mb-2 block">🏆</span>
                <span className="text-white font-bold text-sm block">Ranking</span>
                <span className="text-white/50 text-xs">Ligas e competicao</span>
              </Link>

              <Link
                href="/enem/perfil"
                className="card-ia p-4 text-center hover:scale-105 transition-transform bg-white/5"
              >
                <span className="text-4xl mb-2 block">👤</span>
                <span className="text-white font-bold text-sm block">Meu Perfil</span>
                <span className="text-white/50 text-xs">Suas conquistas</span>
              </Link>

              <Link
                href="/enem/amigos"
                className="card-ia p-4 text-center hover:scale-105 transition-transform bg-white/5"
              >
                <span className="text-4xl mb-2 block">👥</span>
                <span className="text-white font-bold text-sm block">Amigos</span>
                <span className="text-white/50 text-xs">Conecte-se</span>
              </Link>
            </div>

            <div className="text-center mt-6">
              <p className="text-white/60 text-sm">
                🔥 O feed esta fervendo! Seus amigos estao subindo no ranking. Bora competir?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACESSO RAPIDO */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="title-ia-sm text-center mb-8">Acesso Rapido</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { nome: 'Contra Relogio', emoji: '⏳', descricao: 'Simulado cronometrado', url: '/enem/simulado-relogio' },
              { nome: 'Quiz Diario', emoji: '🎯', descricao: '5 questoes + streak', url: '/enem/quiz-diario' },
              { nome: 'Pomodoro', emoji: '🍅', descricao: 'Timer de foco + FP', url: '/enem/pomodoro' },
              { nome: 'Dashboard', emoji: '📊', descricao: 'Seu progresso', url: '/enem/dashboard' },
              { nome: 'Cronograma', emoji: '📅', descricao: 'Planeje seus estudos', url: '/enem/cronograma' },
              { nome: 'Biblioteca', emoji: '📚', descricao: 'E-books e PDFs', url: '/enem/biblioteca' },
              { nome: 'Videoaulas', emoji: '🎬', descricao: 'Canais e plataformas', url: '/enem/videoaulas' },
              { nome: 'Materiais', emoji: '📂', descricao: 'Resumos e formulas', url: '/enem/materiais' },
              { nome: 'Questoes', emoji: '❓', descricao: 'Questoes comentadas', url: '/enem/questoes-comentadas' },
              { nome: 'Chatbot IA', emoji: '🤖', descricao: 'Tire suas duvidas', url: '/enem/chatbot' },
              { nome: 'Gerador IA', emoji: '🧠', descricao: 'Gere questoes', url: '/enem/gerador-questoes' },
              { nome: 'Organizacao', emoji: '🎯', descricao: 'Metas e habitos', url: '/enem/organizacao' },
              { nome: 'Tecnicas', emoji: '💡', descricao: 'Metodos de estudo', url: '/enem/tecnicas' },
              { nome: 'Batalha', emoji: '⚔️', descricao: 'Desafie amigos', url: '/enem/batalha' },
              { nome: 'Conquistas', emoji: '🏆', descricao: 'Suas medalhas', url: '/enem/conquistas' },
              { nome: 'Desafios', emoji: '🎖️', descricao: 'Ganhe FP', url: '/enem/desafios' },
              { nome: 'Loja', emoji: '🛒', descricao: 'Troque seus FP', url: '/enem/loja' },
              { nome: 'Feed Social', emoji: '📱', descricao: 'Veja a comunidade', url: '/enem/feed' },
              { nome: 'Ranking', emoji: '🏅', descricao: 'Ligas e posicoes', url: '/enem/ranking' },
              { nome: 'Meu Perfil', emoji: '👤', descricao: 'Suas conquistas', url: '/enem/perfil' },
              { nome: 'Amigos', emoji: '👥', descricao: 'Conecte-se', url: '/enem/amigos' },
            ].map((recurso) => (
              <Link
                key={recurso.url}
                href={recurso.url}
                className="card-ia p-4 hover:scale-105 transition-transform text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{recurso.emoji}</div>
                <h3 className="text-white font-bold text-sm mb-1">{recurso.nome}</h3>
                <p className="text-white/60 text-xs">{recurso.descricao}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto card-ia text-center" style={{ padding: '40px' }}>
          <h2 className="title-ia-sm text-3xl mb-4">Pronto para comecar?</h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            Transforme seu estudo com inteligencia artificial e alcance seus objetivos no ENEM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn-ia text-lg px-12 py-6 font-bold"
              style={{ boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)' }}
            >
              🎯 Fazer Simulado Agora
            </button>
            <Link
              href="/enem/desafios"
              className="btn-ia-outline text-lg px-12 py-6 inline-flex items-center justify-center font-semibold"
            >
              🏆 Ver Desafios
            </Link>
          </div>
          <p className="text-white/70 text-sm">
            Junte-se a milhares de estudantes que ja estao se preparando com o ENEM-IA
          </p>
        </div>
      </section>

      <ChalkBackToTop />
    </div>
  );
}
