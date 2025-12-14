'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MatematicaFormulasPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔢</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Matemática - Fórmulas Essenciais</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Porcentagem, juros, funções e geometria</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>⚠️ Este conteúdo NÃO gera FP. É apenas para revisão rápida!</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📊 Porcentagem</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ marginBottom: '10px' }}><strong>• p% = p/100</strong></p>
              <p><strong>• Valor final = valor inicial × (1 ± p/100)</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>💰 Juros Simples</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ marginBottom: '10px' }}><strong>• J = C × i × t</strong></p>
              <p><strong>• M = C + J</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📈 Juros Compostos</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p><strong>• M = C × (1 + i)ᵗ</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📐 Função Afim</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ marginBottom: '10px' }}><strong>• f(x) = ax + b</strong></p>
              <p style={{ marginBottom: '10px' }}><strong>• a &gt; 0 → crescente</strong></p>
              <p><strong>• a &lt; 0 → decrescente</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎢 Função Quadrática</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ marginBottom: '10px' }}><strong>• f(x) = ax² + bx + c</strong></p>
              <p style={{ marginBottom: '10px' }}><strong>• Δ = b² − 4ac</strong></p>
              <p><strong>• x = (-b ± √Δ) / 2a</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📏 Área</h2>
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ marginBottom: '10px' }}><strong>• Quadrado: A = l²</strong></p>
              <p style={{ marginBottom: '10px' }}><strong>• Retângulo: A = b × h</strong></p>
              <p style={{ marginBottom: '10px' }}><strong>• Triângulo: A = (b × h) / 2</strong></p>
              <p><strong>• Círculo: A = πr²</strong></p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
