'use client';

import { motion } from 'framer-motion';

export default function DiferenciaisSection() {
  const diferenciais = [
    {
      icon: '📊',
      title: 'Estatística Real do ENEM',
      description: 'Banco de dados com análise estatística de todos os ENEMs anteriores. Saiba exatamente o que mais cai e onde focar seus estudos.',
      badge: 'Exclusivo',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: '🎯',
      title: 'Plano por Nota-Alvo',
      description: 'Defina seu curso desejado e receba um plano de estudos personalizado com a nota exata que você precisa em cada área.',
      badge: 'Inteligente',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '📝',
      title: 'Simulados por Competência',
      description: 'Correção detalhada por competência, igual à prova real. Veja exatamente onde você ganha e perde pontos.',
      badge: 'Realista',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: '✍️',
      title: 'Redação com IA',
      description: 'Correção automática de redação seguindo as 5 competências do ENEM. Feedback detalhado em minutos, não em semanas.',
      badge: 'Inovador',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '⚔️',
      title: 'Desafios Competitivos',
      description: 'Desafie outros estudantes em modos Turbo, Maratona e Aposta. Complete desafios contra o relógio e suba no ranking.',
      badge: 'Exclusivo',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: '🏆',
      title: 'Sistema de Ligas e FP',
      description: 'Ganhe FP estudando, complete desafios semanais e dispute ligas competitivas. Gamificação real que mantém você motivado.',
      badge: 'Único',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  return (
    <section id="diferenciais" className="py-28 px-6 relative z-10">
      <div className="container max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-28 px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14"
        >
          <div className="inline-block px-8 py-3 bg-[var(--accent-yellow)] text-[#1a3328] rounded-full font-['Patrick_Hand'] text-lg sm:text-xl lg:text-2xl font-bold mb-8">
            O QUE NINGUÉM TEM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10 leading-tight">
            Diferenciais que fazem a{' '}
            <span className="text-[var(--accent-yellow)]">diferença</span>
          </h2>
          <p className="text-[44px] font-['Caveat'] text-[var(--chalk-dim)] max-w-4xl mx-auto relative z-40 leading-relaxed">
            Recursos que você não encontra em nenhuma outra plataforma
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {diferenciais.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card relative overflow-hidden group"
            >
              {/* Gradiente de fundo no hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`}
              />

              <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-[var(--accent-yellow)] text-[#1a3328] px-4 py-2 rounded-bl-lg font-['Poppins'] text-sm sm:text-base font-bold">
                  {item.badge}
                </div>

                {/* Ícone */}
                <div className="text-6xl sm:text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Título */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Patrick_Hand'] text-[var(--accent-yellow)] mb-4 leading-tight">
                  {item.title}
                </h3>

                {/* Descrição */}
                <p className="text-base sm:text-lg lg:text-xl text-[var(--chalk-dim)] font-['Poppins'] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 px-5 sm:px-8 lg:px-14"
        >
          <div className="inline-block px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 bg-[rgba(255,255,255,0.08)] rounded-2xl border border-[rgba(255,255,255,0.2)]">
            <p className="text-[44px] font-['Caveat'] text-[var(--chalk-white)] mb-3 leading-relaxed">
              E tudo isso com uma interface linda e intuitiva
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--chalk-dim)] font-['Poppins'] leading-relaxed">
              Feita para você se concentrar no que importa: <strong className="text-[var(--accent-yellow)]">estudar e passar</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
