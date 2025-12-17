'use client';

import { motion } from 'framer-motion';

export default function ProvaSocialSection() {
  const badges = [
    {
      icon: '🤖',
      title: 'IA Educacional',
      description: 'Tecnologia de ponta aplicada ao ensino'
    },
    {
      icon: '📊',
      title: 'Estudo Estratégico',
      description: 'Baseado em dados reais do ENEM'
    },
    {
      icon: '🎮',
      title: 'Gamificação Inteligente',
      description: 'Motivação sustentável para estudar'
    }
  ];

  return (
    <section className="py-28 px-6 bg-[rgba(0,0,0,0.2)] relative z-10">
      <div className="container max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10">
            Comprometidos com sua{' '}
            <span className="text-[var(--accent-yellow)]">aprovação</span>
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-['Caveat'] text-[var(--chalk-dim)] max-w-3xl mx-auto leading-relaxed relative z-10">
            "Estamos construindo a plataforma que vai provar, com dados,
            quem realmente ajuda na aprovação."
          </p>
        </motion.div>

        {/* Badges */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl font-['Patrick_Hand'] text-[var(--accent-yellow)] mb-4">
                {badge.title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[var(--chalk-dim)] font-['Poppins']">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="text-4xl sm:text-5xl font-['Patrick_Hand'] text-[var(--accent-yellow)] mb-6">
              Nossas Garantias para Você
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Segurança Total',
                text: 'Seus dados protegidos e privacidade garantida'
              },
              {
                icon: '🚀',
                title: 'Atualizações Constantes',
                text: 'Melhorias e novos recursos toda semana'
              },
              {
                icon: '💯',
                title: 'Sem Pegadinhas',
                text: 'Transparência total nos planos e funcionalidades'
              },
              {
                icon: '🎯',
                title: 'Foco em Resultados',
                text: 'Cada feature pensada para sua aprovação'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-5 p-6 bg-[rgba(255,255,255,0.05)] rounded-lg"
              >
                <div className="text-5xl">{item.icon}</div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-base sm:text-lg text-[var(--chalk-dim)] font-['Poppins']">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proposta de Valor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-10 py-8 bg-gradient-to-r from-[var(--accent-yellow)]/20 to-[var(--accent-blue)]/20 rounded-2xl border-2 border-[var(--accent-yellow)]">
            <p className="text-3xl sm:text-4xl font-['Caveat'] text-[var(--chalk-white)] mb-3">
              Cada aluno que passa é nossa maior conquista
            </p>
            <p className="text-lg sm:text-xl text-[var(--chalk-dim)] font-['Poppins']">
              E estamos apenas começando. Junte-se a nós nessa jornada.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
