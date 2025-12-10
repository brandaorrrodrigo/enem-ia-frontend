'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MicroQuiz from '@/components/MicroQuiz';

export default function TiemposFuturoPage() {
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
        localStorage.setItem('biblioteca_espanhol_tiempos-futuro', Math.floor(percent).toString());
      }
    };

    const savedProgress = localStorage.getItem('biblioteca_espanhol_tiempos-futuro');
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
            <span className="text-6xl">🔮</span>
            <div>
              <h1 className="text-5xl font-bold font-['Patrick_Hand']">Tiempos Verbales - Futuro</h1>
              <p className="text-xl text-white/80 mt-2">Futuro simple e ir + a + infinitivo</p>
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
          <p className="text-lg text-white/90 leading-relaxed">Há duas formas principais de expressar futuro em espanhol: futuro simple (formal, previsões) e ir + a + infinitivo (planos próximos, intenções).</p>
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
              <h3 className="text-xl font-bold mb-2">Futuro Simple</h3>
              <p className="text-white/80">Adiciona terminações ao infinitivo: -é, -ás, -á, -emos, -éis, -án. Ex: "Hablaré" (falarei).</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">Ir + a + Infinitivo</h3>
              <p className="text-white/80">Planos próximos, intenções. voy/vas/va/vamos/vais/van + a + verbo. Ex: "Voy a estudiar" (vou estudar).</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">Irregulares</h3>
              <p className="text-white/80">Alguns verbos têm raiz irregular no futuro: tener → tendré, hacer → haré, poder → podré, salir → saldré.</p>
            </motion.div>
            
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '#dc2626' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.30000000000000004 }}
            >
              <h3 className="text-xl font-bold mb-2">Diferenças</h3>
              <p className="text-white/80">Futuro simple = mais formal, previsões. Ir + a = mais coloquial, planos certos.</p>
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
              <h3 className="text-xl font-bold mb-3">Futuro Simple</h3>
              <div className="mb-3">
                <strong className="text-white/90">Problema:</strong>
                <p className="text-white/70 mt-1">Mañana ___ (llover).</p>
              </div>
              <div>
                <strong className="text-white/90">Solução:</strong>
                <p className="text-white/70 mt-1">Mañana lloverá. (previsão do tempo)</p>
              </div>
            </motion.div>
            
            <motion.div
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3">Ir + a</h3>
              <div className="mb-3">
                <strong className="text-white/90">Problema:</strong>
                <p className="text-white/70 mt-1">Yo ___ estudiar esta noche.</p>
              </div>
              <div>
                <strong className="text-white/90">Solução:</strong>
                <p className="text-white/70 mt-1">Yo voy a estudiar esta noche. (plano pessoal)</p>
              </div>
            </motion.div>
            
          </div>
        </motion.div>

        
        {/* Fórmulas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>📐</span> Estruturas Importantes
          </h2>
          <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2" style={{ borderColor: '#dc2626' }}>
            <div className="space-y-4">
              
              <div className="p-4 bg-white/5 rounded-lg font-mono text-lg">
                Futuro simple: infinitivo + -é, -ás, -á, -emos, -éis, -án
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg font-mono text-lg">
                Ir + a: conjugar "ir" + a + infinitivo
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg font-mono text-lg">
                Irregulares: mudam a raiz mas mantêm terminações
              </div>
              
            </div>
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
              <p className="text-white/90">Futuro simple = formal, escrito, previsões</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Ir + a = coloquial, planos pessoais</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Memorize irregulares: tener, hacer, poder, decir, salir</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15000000000000002 }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">Presente também pode expressar futuro próximo</p>
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
              <p className="text-white/90">Conjugar irregular errado: "teneré" ❌ (correto: tendré)</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">Esquecer acento nas terminações</p>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">Usar "voy estudiar" ❌ (correto: voy A estudiar)</p>
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
          <MicroQuiz questoes={[{"pergunta":"Mañana yo ___ a la playa.","opcoes":["iré","iría","iba","fui"],"correta":0},{"pergunta":"Nosotros ___ tiempo mañana.","opcoes":["tenemos","teníamos","tendremos","tuvimos"],"correta":2},{"pergunta":"Ellos ___ a viajar pronto.","opcoes":["irán","van","iban","fueron"],"correta":1}]} />
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
