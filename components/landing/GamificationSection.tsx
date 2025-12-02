'use client';

import { motion } from 'framer-motion';

export function GamificationSection() {
  const features = [
    {
      icon: '⭐',
      title: 'XP e níveis',
      description: 'Ganhe XP ao responder questões, finalizar simulados e manter sua sequência de estudos ativa. Suba de nível e desbloqueie conquistas!',
    },
    {
      icon: '🏆',
      title: 'Medalhas e conquistas',
      description: 'Desbloqueie medalhas por acertos em questões difíceis, provas completas, sequências de estudo e objetivos batidos.',
    },
    {
      icon: '🔥',
      title: 'Streak diária',
      description: 'Mantenha sua sequência de estudos ativa! Quanto mais dias seguidos você estudar, mais pontos bonus você ganha.',
    },
    {
      icon: '📊',
      title: 'Ranking entre alunos',
      description: 'Compare seu desempenho com outros estudantes e veja sua posição no ranking nacional do ENEM-IA.',
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6">
      {/* Fundo com textura de lousa */}
      <div className="absolute inset-0 bg-[#0b3d2e] opacity-95" />
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/kp0uJ3g.png')] bg-repeat opacity-5" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4">
            🎮 Transforme seus estudos em um jogo
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            O ENEM-IA acompanha sua jornada de forma visual e divertida: você ganha pontos, sobe de nível
            e disputa posições no ranking enquanto melhora o desempenho nas provas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-6 hover:border-yellow-400/50 hover:bg-white/10 transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Exemplo visual de gamificação */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white/10 rounded-2xl border border-white/20 p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                12
              </div>
              <div>
                <div className="text-white font-bold text-lg">Nível Expert</div>
                <div className="text-white/60 text-sm">3.450 XP totais</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center px-4">
                <div className="text-2xl">🔥</div>
                <div className="text-white font-bold">14 dias</div>
                <div className="text-white/60 text-xs">Streak</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl">🏆</div>
                <div className="text-white font-bold">8</div>
                <div className="text-white/60 text-xs">Medalhas</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl">📊</div>
                <div className="text-white font-bold">#127</div>
                <div className="text-white/60 text-xs">Ranking</div>
              </div>
            </div>

            <div className="w-full md:w-48">
              <div className="text-white/60 text-xs mb-1">Progresso para nível 13</div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
              </div>
              <div className="text-white/60 text-xs mt-1 text-right">550 XP restantes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
