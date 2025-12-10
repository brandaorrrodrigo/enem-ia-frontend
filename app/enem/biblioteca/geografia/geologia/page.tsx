'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'As rochas formadas pelo resfriamento do magma são chamadas de:',
    opcoes: ['Rochas sedimentares', 'Rochas metamórficas', 'Rochas ígneas', 'Rochas vulcânicas'],
    respostaCorreta: 2,
    explicacao: 'Rochas ígneas (ou magmáticas) se formam pelo resfriamento e solidificação do magma'
  },
  {
    pergunta: 'A camada mais externa da Terra é chamada de:',
    opcoes: ['Manto', 'Núcleo', 'Crosta', 'Litosfera'],
    respostaCorreta: 2,
    explicacao: 'A crosta terrestre é a camada mais externa e fina da Terra (5-70 km de espessura)'
  },
  {
    pergunta: 'O movimento das placas tectônicas é responsável por:',
    opcoes: ['Erosão', 'Terremotos e vulcanismo', 'Chuvas', 'Formação de nuvens'],
    respostaCorreta: 1,
    explicacao: 'O movimento das placas tectônicas causa terremotos, vulcanismo e formação de montanhas'
  }
];

export default function GeologiaPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      setShowScrollTop(scrollTop > 300);
      localStorage.setItem('biblioteca_geografia_geologia', Math.floor(progress).toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)', padding: '40px 20px', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(0, 0, 0, 0.3)', zIndex: 1000 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)', width: `${scrollProgress}%` }} initial={{ width: 0 }} animate={{ width: `${scrollProgress}%` }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '20px' }}>
        <button onClick={() => router.back()} style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(139, 90, 43, 0.4)', borderRadius: '12px', color: '#fff', fontFamily: "'Poppins', sans-serif", fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}>← Voltar para Biblioteca</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '3px solid rgba(139, 90, 43, 0.6)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌋</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Geologia</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Estrutura da Terra e Rochas</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Geologia?</h2>
            <p>Geologia é a ciência que estuda a <strong>estrutura, composição e processos da Terra</strong>.</p>
            <p>Estuda rochas, minerais, relevo, terremotos, vulcões e a história do planeta.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌍 Estrutura Interna da Terra</h2>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🥚 Crosta:</strong> Camada mais externa e fina (5-70 km)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Oceânica: 5-10 km (mais densa)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Continental: 30-70 km (menos densa)</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔥 Manto:</strong> Camada intermediária (2.900 km de espessura)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Rochoso, quente e viscoso</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Responsável pelo movimento das placas tectônicas</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>⚡ Núcleo:</strong> Camada mais interna</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Núcleo Externo: líquido (ferro e níquel)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Núcleo Interno: sólido (altíssima pressão)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Temperatura: até 6.000°C</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🪨 Tipos de Rochas</h2>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔥 Rochas Ígneas (ou Magmáticas):</strong></p>
              <p>Formadas pelo resfriamento do magma</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>• Intrusivas: resfriamento lento dentro da Terra (ex: granito)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Extrusivas: resfriamento rápido na superfície (ex: basalto)</p>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '2px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>📚 Rochas Sedimentares:</strong></p>
              <p>Formadas por acúmulo e compactação de sedimentos</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Exemplos: arenito, calcário, argilito</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Importância: podem conter fósseis!</p>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>♻️ Rochas Metamórficas:</strong></p>
              <p>Formadas pela transformação de outras rochas por calor e pressão</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Exemplos: mármore (do calcário), gnaisse (do granito)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌏 Placas Tectônicas</h2>
            <p>A <strong>crosta terrestre</strong> está dividida em grandes blocos chamados <strong>placas tectônicas</strong>.</p>
            <p style={{ marginTop: '12px' }}><strong>Teoria da Deriva Continental (Alfred Wegener):</strong></p>
            <p>Os continentes já estiveram unidos em um supercontinente chamado <strong>Pangeia</strong>.</p>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
              <p><strong>Movimentos das placas causam:</strong></p>
              <p style={{ marginTop: '8px' }}>🌋 <strong>Vulcanismo:</strong> Extravasamento de magma</p>
              <p>🏔️ <strong>Formação de montanhas:</strong> Placas se chocam (ex: Himalaia)</p>
              <p>⚡ <strong>Terremotos:</strong> Placas se movem bruscamente</p>
              <p>🌊 <strong>Tsunamis:</strong> Terremotos no fundo do oceano</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🥚 Estrutura da Terra = ovo: casca (crosta), clara (manto), gema (núcleo)</li>
              <li style={{ marginBottom: '12px' }}>🔥 Ígneas = fogo (magma)</li>
              <li style={{ marginBottom: '12px' }}>📚 Sedimentares = camadas (sedimentos) → podem ter fósseis</li>
              <li style={{ marginBottom: '12px' }}>♻️ Metamórficas = transformação de outras rochas</li>
              <li style={{ marginBottom: '12px' }}>🌏 Placas tectônicas → terremotos + vulcões + montanhas</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir crosta com manto</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Crosta é a camada EXTERNA e FINA. Manto é INTERMEDIÁRIO e GROSSO</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Achar que rochas sedimentares vêm do magma</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Magma → Ígneas | Sedimentos → Sedimentares | Transformação → Metamórficas</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="geografia" capitulo="geologia" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
