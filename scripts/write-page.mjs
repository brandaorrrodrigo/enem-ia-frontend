import { writeFileSync } from 'fs';

const content = `'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { GamificationSection, QuestoesSection } from '@/components/landing';
import ChalkBackToTop from '@/components/ChalkBackToTop';

export default function HomePage() {
  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem('chalkSoundPlayed');
    if (!alreadyPlayed) {
      const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/06/audio_61a22de8e0.mp3');
      audio.volume = 0.25;
      audio.play().catch(() => {});
      sessionStorage.setItem('chalkSoundPlayed', 'true');
    }
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-[url('https://i.imgur.com/CY2Q9iD.jpg')] bg-cover bg-center opacity-95"
          style={{ backgroundColor: '#0b3d2e', backgroundBlendMode: 'multiply' }}
        />
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/kp0uJ3g.png')] bg-repeat opacity-10"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 text-white min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold chalk-text mb-6">
              <span className="chalk-line">Treine para o ENEM como se estivesse na lousa da escola:</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6"
            >
              100.000+ questões e gamificação em tempo real
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Simulados personalizados, correção inteligente, histórico de desempenho detalhado e um sistema de pontos
            que transforma seus estudos em um jogo diário rumo à aprovação.
          </motion.p>

          <motion.ul
            className="text-left text-white/80 space-y-3 mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">📚</span>
              <span>Banco com <strong className="text-white">100.000+ questões</strong> atualizadas e organizadas por área, tema e dificuldade.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎮</span>
              <span><strong className="text-white">Gamificação completa</strong>: XP, medalhas, streak diária e ranking entre os alunos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">📊</span>
              <span>Painel com acertos, erros, nota TRI estimada e evolução por caderno e competência.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🤖</span>
              <span><strong className="text-white">IA que explica</strong> cada questão passo a passo, como seu professor particular.</span>
            </li>
          </motion.ul>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link
              href="/simulado"
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg hover:shadow-xl"
            >
              🎯 Começar Simulado Grátis
            </Link>
            <Link
              href="/dashboard/conquistas"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition text-lg"
            >
              🏆 Ver Conquistas
            </Link>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, delay: 2, repeat: Infinity }}
          >
            <div className="text-white/50 text-sm flex flex-col items-center">
              <span>Role para ver mais</span>
              <span className="text-2xl mt-1">↓</span>
            </div>
          </motion.div>
        </div>
      </section>

      <QuestoesSection />
      <GamificationSection />

      {/* COMO FUNCIONA */}
      <section className="relative z-10 bg-white text-slate-800 py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Como o ENEM-IA te ajuda a passar
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="bg-slate-50 p-6 rounded-2xl shadow hover:shadow-md transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-slate-900">Simulados inteligentes</h3>
              <p className="mt-2 text-slate-600 text-sm">Gere simulados por disciplina e veja onde precisa melhorar.</p>
            </motion.div>
            <motion.div className="bg-slate-50 p-6 rounded-2xl shadow hover:shadow-md transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-bold text-slate-900">Explicações por IA</h3>
              <p className="mt-2 text-slate-600 text-sm">A IA resolve cada questão mostrando o raciocínio passo a passo.</p>
            </motion.div>
            <motion.div className="bg-slate-50 p-6 rounded-2xl shadow hover:shadow-md transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-lg font-bold text-slate-900">Evolução real</h3>
              <p className="mt-2 text-slate-600 text-sm">Acompanhe seu progresso, ganhe pontos e medalhas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-green-900 to-emerald-800 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl md:text-4xl font-bold mb-4">Pronto para estudar com inteligência?</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Comece agora mesmo com o plano gratuito. São mais de <strong>100.000 questões</strong> esperando por você!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulado" className="inline-flex items-center justify-center bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition text-lg">
              🚀 Iniciar Agora — É Grátis
            </Link>
            <Link href="/precos" className="inline-flex items-center justify-center bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/30 transition text-lg">
              Ver Planos Premium
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 py-8 border-t border-slate-800 text-center text-sm text-slate-400">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-lg font-bold text-white">ENEM-IA 🎓</div>
            <div className="flex gap-6">
              <Link href="/simulado" className="hover:text-white transition">Simulados</Link>
              <Link href="/dashboard/conquistas" className="hover:text-white transition">Conquistas</Link>
              <Link href="/precos" className="hover:text-white transition">Planos</Link>
            </div>
            <div>© {new Date().getFullYear()} ENEM-IA</div>
          </div>
        </div>
      </footer>

      <style jsx>{\`
        .chalk-text { font-family: 'Chalkduster', 'Comic Sans MS', cursive; text-shadow: 0 0 2px #fff, 0 0 10px rgba(255, 255, 255, 0.2); }
        .chalk-line { position: relative; display: block; }
        .chalk-line::after { content: ''; position: absolute; left: 0; bottom: -4px; height: 3px; width: 100%; background: rgba(255, 255, 255, 0.3); animation: drawChalk 2.5s ease-in-out forwards; transform-origin: left; transform: scaleX(0); }
        @keyframes drawChalk { to { transform: scaleX(1); } }
      \`}</style>

      <ChalkBackToTop />
    </main>
  );
}
`;

writeFileSync('app/page.tsx', content);
console.log('✅ page.tsx atualizado com sucesso!');
