'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MicroQuiz from '@/components/MicroQuiz';

export default function VerbosIrregularesPage() {
  const [progresso, setProgresso] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percent = (scrolled / documentHeight) * 100;
      setScrollPercent(Math.min(percent, 100));

      if (percent > progresso) {
        setProgresso(Math.floor(percent));
        localStorage.setItem('biblioteca_espanhol_verbos-irregulares', Math.floor(percent).toString());
      }
    };

    const savedProgress = localStorage.getItem('biblioteca_espanhol_verbos-irregulares');
    if (savedProgress) {
      setProgresso(parseInt(savedProgress));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progresso]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2818] to-[#1b3d29] text-white font-['Poppins'] relative overflow-hidden">
      {/* Barra de progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, #dc2626 0%, #fa4444 100%)` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollPercent}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative pt-32 pb-16 px-8"
        style={{ background: `linear-gradient(135deg, #be0808 0%, #dc2626 100%)` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/enem/biblioteca" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <span className="mr-2">←</span> Voltar para Biblioteca
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🎯</span>
            <div>
              <h1 className="text-5xl font-bold font-['Patrick_Hand']">Verbos Irregulares</h1>
              <p className="text-xl text-white/80 mt-2">Principais verbos irregulares</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">📚 Espanhol</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">⏱️ Leitura: ~10 min</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">🎯 Progresso: {progresso}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Resumo */}
        <motion.div
          className="mb-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border-2"
          style={{ borderColor: '#dc2626' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-4 flex items-center gap-2">
            <span>📖</span> Resumo
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">Verbos irregulares são aqueles que não seguem o padrão de conjugação regular. Os mais comuns (ser, estar, tener, hacer, ir) aparecem frequentemente no ENEM e devem ser memorizados.</p>
        </motion.div>

        {/* Tópicos */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>📚</span> Tópicos Principais
          </h2>
          <div className="space-y-4">
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3 className="text-xl font-bold mb-2">Ser vs Estar</h3>
              <p className="text-white/80">Ser = essência, origem, profissão. Estar = estado temporário, localização. Ex: "Soy brasileño" (ser) vs "Estoy cansado" (estar).</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">Tener</h3>
              <p className="text-white/80">Presente: tengo, tienes, tiene, tenemos, tenéis, tienen. Usos: posse, idade, expressões (tener hambre).</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">Hacer</h3>
              <p className="text-white/80">Presente: hago, haces, hace, hacemos, hacéis, hacen. "Hacer" = fazer. Também usado no tempo (hace frío).</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.30000000000000004 }}
            >
              <h3 className="text-xl font-bold mb-2">Ir</h3>
              <p className="text-white/80">Presente: voy, vas, va, vamos, vais, van. Usado sozinho (ir a) ou para formar futuro próximo (voy a estudiar).</p>
            </motion.div>
            
          </div>
        </motion.div>

        {/* Exemplos */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>💡</span> Exemplos
          </h2>
          <div className="space-y-6">
            
            <motion.div
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3 className="text-xl font-bold mb-3">Ser vs Estar</h3>
              <div className="mb-3">
                <strong className="text-white/90">Problema:</strong>
                <p className="text-white/70 mt-1">Yo ___ médico. Hoy ___ cansado.</p>
              </div>
              <div>
                <strong className="text-white/90">Solução:</strong>
                <p className="text-white/70 mt-1">Yo soy médico. (essência) Hoy estoy cansado. (estado temporário)</p>
              </div>
            </motion.div>
            
            <motion.div
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3">Tener</h3>
              <div className="mb-3">
                <strong className="text-white/90">Problema:</strong>
                <p className="text-white/70 mt-1">Ella ___ 20 años.</p>
              </div>
              <div>
                <strong className="text-white/90">Solução:</strong>
                <p className="text-white/70 mt-1">Ella tiene 20 años. (idade sempre usa "tener")</p>
              </div>
            </motion.div>
            
          </div>
        </motion.div>

        

        {/* Dicas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>💡</span> Dicas para o ENEM
          </h2>
          <div className="grid gap-4">
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Ser = permanente, Estar = temporário</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Idade usa "tener": tengo 18 años</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Tempo atmosférico usa "hacer": hace calor</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15000000000000002 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">"Ir" + a + infinitivo = futuro próximo</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Memorize os irregulares mais comuns</p>
            </motion.div>
            
          </div>
        </motion.div>

        {/* Erros Comuns */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>⚠️</span> Erros Comuns
          </h2>
          <div className="grid gap-4">
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">Confundir ser e estar</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">Usar "soy" para idade: "soy 18 años" ❌</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">Conjugar como regular: "yo haco" ❌ (correto: hago)</p>
            </motion.div>
            
          </div>
        </motion.div>

        {/* Quiz */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MicroQuiz questoes={[{"pergunta":"Yo ___ estudiante.","opcoes":["soy","estoy","tengo","hago"],"correta":0},{"pergunta":"Ella ___ enferma hoy.","opcoes":["es","está","tiene","hace"],"correta":1},{"pergunta":"Nosotros ___ una casa grande.","opcoes":["somos","estamos","tenemos","hacemos"],"correta":2}]} />
        </motion.div>

        {/* Mensagem final */}
        <motion.div
          className="text-center p-8 bg-gradient-to-r from-#dc2626/20 to-#fa4444/20 backdrop-blur-sm rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-white/80">
            💡 Complete este módulo e ganhe até 10 FP no quiz final!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
