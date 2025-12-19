'use client';

import { motion } from 'framer-motion';

export default function ComoFuncionaSection() {
  const steps = [
    {
      number: '1',
      title: 'Diagnóstico Inteligente',
      description: 'Faça um simulado inicial e a IA identifica seus pontos fortes e fracos, criando seu perfil de aprendizado.',
      icon: '🎯',
      features: ['Simulado diagnóstico', 'Análise por competência', 'Mapeamento de gaps']
    },
    {
      number: '2',
      title: 'Plano Personalizado',
      description: 'Receba um cronograma de estudos feito sob medida para atingir sua nota-alvo no curso que você deseja.',
      icon: '📊',
      features: ['Meta por disciplina', 'Foco no que importa', 'Adaptação contínua']
    },
    {
      number: '3',
      title: 'Execução com Feedback',
      description: 'Estude com acompanhamento em tempo real, feedback da IA em cada questão e gamificação para manter a motivação.',
      icon: '🚀',
      features: ['Correção inteligente', 'Ranking e desafios', 'Evolução visível']
    }
  ];

  const cards = [
    { icon: '📝', title: 'Simulados', color: 'var(--accent-yellow)' },
    { icon: '📊', title: 'Estatísticas', color: 'var(--accent-blue)' },
    { icon: '🤖', title: 'IA', color: 'var(--accent-green)' },
    { icon: '🎮', title: 'Gamificação', color: 'var(--accent-pink)' }
  ];

  return (
    <section className="py-28 px-6 bg-[rgba(0,0,0,0.2)] relative z-10">
      <div className="container max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-28 px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10 leading-tight">
            Como o <span className="text-[var(--accent-yellow)]">ENEM PRO</span> Funciona
          </h2>
          <p className="text-[44px] font-['Caveat'] text-[var(--chalk-dim)] max-w-4xl mx-auto relative z-40 leading-relaxed mb-8">
            Apenas 3 passos para transformar seus estudos e conquistar a aprovação
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Linha conectora (apenas para desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[var(--accent-yellow)] to-transparent opacity-30" />
              )}

              <div className="card hover:scale-105 transition-transform duration-300 h-full relative">
                <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                  {/* Número */}
                  <div className="flex justify-center mb-4">
                    <div
                      className="rounded-full flex items-center justify-center font-['Patrick_Hand'] font-bold"
                      style={{
                        width: '100px',
                        height: '100px',
                        fontSize: '40px',
                        background: `linear-gradient(135deg, var(--accent-yellow) 0%, #ffd700 100%)`,
                        color: '#1a3328',
                        boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Ícone */}
                  <div className="text-center mb-6" style={{ fontSize: '120px' }}>
                    {step.icon}
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Patrick_Hand'] text-[var(--accent-yellow)] text-center mb-6 leading-tight">
                    {step.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-base sm:text-lg lg:text-xl text-[var(--chalk-dim)] font-['Poppins'] text-center mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-[var(--chalk-white)] font-['Poppins'] text-base sm:text-lg leading-relaxed"
                      >
                        <span className="text-[var(--accent-green)] text-xl sm:text-2xl">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cards de recursos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:px-14"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Patrick_Hand'] text-center text-[var(--chalk-white)] mb-24 leading-tight">
            Tudo que você precisa em um só lugar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="chalkboard-card text-center p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-4" style={{ fontSize: '100px' }}>{card.icon}</div>
                <div
                  className="font-['Patrick_Hand'] font-bold leading-tight"
                  style={{ color: card.color, fontSize: '44px' }}
                >
                  {card.title}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
