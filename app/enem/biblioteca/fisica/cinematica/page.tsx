'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Um carro percorre 180 km em 3 horas. Qual sua velocidade média?',
    opcoes: ['60 km/h', '50 km/h', '70 km/h', '90 km/h'],
    respostaCorreta: 0,
    explicacao: 'Velocidade média = Distância / Tempo = 180 km / 3 h = 60 km/h',
  },
  {
    pergunta: 'No movimento uniformemente variado, a aceleração é:',
    opcoes: ['Constante', 'Variável', 'Nula', 'Infinita'],
    respostaCorreta: 0,
    explicacao: 'No MUV (Movimento Uniformemente Variado), a aceleração é constante e diferente de zero.',
  },
];

export default function CinematicaPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_fisica_cinematica', Math.floor(progress).toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)', padding: '40px 20px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 1000 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)', width: `${scrollProgress}%` }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
        <button onClick={() => router.back()} style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(139, 90, 43, 0.4)', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>← Voltar</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', border: '3px solid rgba(139, 90, 43, 0.6)', borderRadius: '24px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px' }}>🚗</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Cinemática</h1>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#10b981', marginBottom: '20px' }}>⚡ Conceitos Fundamentais</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li><strong>Posição (S):</strong> Localização de um corpo em relação a um referencial</li>
              <li><strong>Deslocamento (ΔS):</strong> Variação da posição (S_final - S_inicial)</li>
              <li><strong>Velocidade (v):</strong> Rapidez com que a posição muda</li>
              <li><strong>Aceleração (a):</strong> Taxa de variação da velocidade</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#10b981', marginBottom: '20px' }}>🔄 Movimento Uniforme (MU)</h2>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '2px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Características:</p>
              <ul style={{ paddingLeft: '24px' }}>
                <li>Velocidade constante (a = 0)</li>
                <li>Percorre distâncias iguais em tempos iguais</li>
              </ul>
              <div style={{ marginTop: '16px', textAlign: 'center', background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: '20px', fontWeight: 'bold' }}>v = ΔS / Δt</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>S = S₀ + v·t</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#10b981', marginBottom: '20px' }}>📈 Movimento Uniformemente Variado (MUV)</h2>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Características:</p>
              <ul style={{ paddingLeft: '24px' }}>
                <li>Aceleração constante (a ≠ 0)</li>
                <li>Velocidade varia uniformemente</li>
              </ul>
              <div style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Equações do MUV:</p>
                <p style={{ fontFamily: "'Courier New', monospace" }}>v = v₀ + a·t</p>
                <p style={{ fontFamily: "'Courier New', monospace" }}>S = S₀ + v₀·t + (a·t²)/2</p>
                <p style={{ fontFamily: "'Courier New', monospace" }}>v² = v₀² + 2·a·ΔS (Torricelli)</p>
              </div>
            </div>
          </section>

          <section style={{ background: 'rgba(139, 90, 43, 0.2)', border: '3px solid rgba(139, 90, 43, 0.5)', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '28px', color: '#a0714d', marginBottom: '16px' }}>📌 Dicas ENEM</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>Identifique se é MU (v constante) ou MUV (a constante)</li>
              <li>Organize os dados: S₀, v₀, a, t</li>
              <li>Escolha a equação mais adequada ao problema</li>
              <li>Atenção às unidades (km/h ↔ m/s)</li>
            </ul>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="fisica" capitulo="cinematica" onComplete={(a) => console.log(a)} />
    </div>
  );
}
