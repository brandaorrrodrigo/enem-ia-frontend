'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'O volume de um cubo de aresta 3 cm é:',
    opcoes: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    respostaCorreta: 2,
    explicacao: 'Volume do cubo = a³ = 3³ = 27 cm³'
  },
  {
    pergunta: 'A fórmula do volume de um cilindro é:',
    opcoes: ['V = πr²', 'V = πr²h', 'V = 4/3πr³', 'V = 2πrh'],
    respostaCorreta: 1,
    explicacao: 'Volume do cilindro = área da base × altura = πr²h'
  },
  {
    pergunta: 'Quantas faces tem um prisma hexagonal?',
    opcoes: ['6', '8', '10', '12'],
    respostaCorreta: 1,
    explicacao: 'Prisma hexagonal tem 2 bases hexagonais + 6 faces laterais = 8 faces'
  }
];

export default function GeometriaEspacialPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_matematica_geometria-espacial', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Geometria Espacial</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Volumes e Áreas de Sólidos Geométricos</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Geometria Espacial?</h2>
            <p>Geometria Espacial estuda figuras tridimensionais (3D) - objetos que têm comprimento, largura e altura.</p>
            <p><strong>Principais sólidos:</strong> Cubo, Paralelepípedo, Prisma, Pirâmide, Cilindro, Cone, Esfera</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📦 Cubo</h2>
            <p><strong>Características:</strong> 6 faces quadradas, 12 arestas, 8 vértices</p>
            <p><strong>Volume:</strong> V = a³ (onde a = aresta)</p>
            <p><strong>Área Total:</strong> A = 6a²</p>
            <p><strong>Exemplo:</strong> Cubo de aresta 5 cm → V = 5³ = 125 cm³</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📐 Paralelepípedo</h2>
            <p><strong>Características:</strong> 6 faces retangulares, 12 arestas, 8 vértices</p>
            <p><strong>Volume:</strong> V = comprimento × largura × altura = c × l × h</p>
            <p><strong>Área Total:</strong> A = 2(cl + ch + lh)</p>
            <p><strong>Exemplo:</strong> Caixa 3×4×5 cm → V = 3×4×5 = 60 cm³</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎩 Cilindro</h2>
            <p><strong>Características:</strong> 2 bases circulares, 1 face lateral curva</p>
            <p><strong>Volume:</strong> V = πr²h (área da base × altura)</p>
            <p><strong>Área Total:</strong> A = 2πr² + 2πrh = 2πr(r + h)</p>
            <p><strong>Exemplo:</strong> Cilindro r=2, h=5 → V = π×2²×5 = 20π cm³</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🔺 Cone</h2>
            <p><strong>Características:</strong> 1 base circular, 1 vértice no topo</p>
            <p><strong>Volume:</strong> V = (1/3)πr²h</p>
            <p><strong>Área Total:</strong> A = πr² + πrg (onde g = geratriz)</p>
            <p><strong>Exemplo:</strong> Cone r=3, h=4 → V = (1/3)π×3²×4 = 12π cm³</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚽ Esfera</h2>
            <p><strong>Características:</strong> Superfície curva equidistante do centro</p>
            <p><strong>Volume:</strong> V = (4/3)πr³</p>
            <p><strong>Área:</strong> A = 4πr²</p>
            <p><strong>Exemplo:</strong> Esfera r=3 → V = (4/3)π×3³ = 36π cm³</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Relação: Cilindro, Cone e Esfera</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>Com mesmo raio e altura:</strong></p>
              <p style={{ marginTop: '12px' }}>V(cilindro) : V(cone) : V(esfera) = 3 : 1 : 2</p>
              <p style={{ marginTop: '8px' }}>Ou seja: V(cone) = (1/3)V(cilindro)</p>
              <p>E se h = 2r: V(esfera) = (2/3)V(cilindro)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>📦 Cubo: tudo ao cubo! V = a³, tem 6 faces</li>
              <li style={{ marginBottom: '12px' }}>🎩 Cilindro: "empilhar" círculos → V = πr²h</li>
              <li style={{ marginBottom: '12px' }}>🔺 Cone: 1/3 do cilindro com mesmas dimensões</li>
              <li style={{ marginBottom: '12px' }}>⚽ Esfera: 4/3 πr³ (lembre: "4 terços")</li>
              <li style={{ marginBottom: '12px' }}>✅ Pirâmide: sempre (1/3) da área da base × altura</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Esquecer o (1/3) no cone e pirâmide</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Cone e Pirâmide sempre têm V = (1/3) × base × altura</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir raio com diâmetro</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Raio = metade do diâmetro (r = d/2)</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="matematica" capitulo="geometria-espacial" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
