'use client';

import { motion } from 'framer-motion';

export function QuestoesSection() {
  const features = [
    {
      icon: '📚',
      title: 'Organização por assunto',
      description: 'Pratique temas específicos como funções, genética, interpretação de texto, gramática, história e muito mais.',
    },
    {
      icon: '📈',
      title: 'Níveis de dificuldade',
      description: 'Combine questões fáceis, médias e difíceis para simular a pressão real da prova do ENEM.',
    },
    {
      icon: '🎯',
      title: 'Simulados personalizados',
      description: 'Monte simulados por área, por caderno ou focados nas matérias em que você mais erra.',
    },
  ];

  const areas = [
    { nome: 'Matemática', questoes: '25.000+', cor: 'from-blue-500 to-blue-600' },
    { nome: 'Linguagens', questoes: '25.000+', cor: 'from-purple-500 to-purple-600' },
    { nome: 'Ciências Humanas', questoes: '25.000+', cor: 'from-orange-500 to-orange-600' },
    { nome: 'Ciências da Natureza', questoes: '25.000+', cor: 'from-green-500 to-green-600' },
  ];

  return (
    <section className="relative z-10 py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            📝 Mais de <span className="text-green-600">100.000 questões</span> para você praticar
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            As questões são organizadas por área de conhecimento, disciplina, assunto, habilidade e nível de dificuldade.
            Você pode montar simulados completos ou treinos rápidos focados nos seus pontos fracos.
          </p>
        </motion.div>

        {/* Cards de áreas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {areas.map((area, index) => (
            <motion.div
              key={area.nome}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-xl bg-gradient-to-br ${area.cor} p-4 text-white text-center`}
            >
              <div className="text-2xl font-bold">{area.questoes}</div>
              <div className="text-sm opacity-90">{area.nome}</div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 bg-gradient-to-r from-green-900 to-emerald-800 rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold">100.000+</div>
              <div className="text-white/70 text-sm">Questões no banco</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">4</div>
              <div className="text-white/70 text-sm">Áreas do ENEM</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-white/70 text-sm">Disciplinas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">∞</div>
              <div className="text-white/70 text-sm">Simulados possíveis</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
