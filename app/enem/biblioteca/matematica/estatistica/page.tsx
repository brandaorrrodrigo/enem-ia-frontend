'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'A média aritmética dos números 2, 4, 6, 8 é:',
    opcoes: ['4', '5', '6', '7'],
    respostaCorreta: 1,
    explicacao: 'Média = (2 + 4 + 6 + 8) ÷ 4 = 20 ÷ 4 = 5'
  },
  {
    pergunta: 'Em um conjunto de dados, a mediana é:',
    opcoes: ['O valor mais frequente', 'O valor central', 'A soma dividida pela quantidade', 'O maior valor'],
    respostaCorreta: 1,
    explicacao: 'A mediana é o valor que está no meio quando os dados estão ordenados'
  },
  {
    pergunta: 'A moda do conjunto {3, 5, 5, 7, 9, 5, 3} é:',
    opcoes: ['3', '5', '7', '9'],
    respostaCorreta: 1,
    explicacao: 'A moda é o valor que mais se repete. O número 5 aparece 3 vezes'
  }
];

export default function EstatisticaPage() {
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
      localStorage.setItem('biblioteca_matematica_estatistica', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Estatística Básica</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Média, Mediana, Moda e Medidas de Dispersão</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Estatística?</h2>
            <p>Estatística é a ciência que estuda a coleta, organização, análise e interpretação de dados.</p>
            <p><strong>Medidas de tendência central:</strong> Média, Mediana e Moda</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📈 Média Aritmética</h2>
            <p><strong>Fórmula:</strong> Média = (soma de todos os valores) ÷ (quantidade de valores)</p>
            <p><strong>Exemplo:</strong> Média de {2, 4, 6, 8} = (2+4+6+8) ÷ 4 = 20 ÷ 4 = 5</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎯 Mediana</h2>
            <p>A mediana é o valor central de um conjunto de dados ordenados.</p>
            <p><strong>Se quantidade ímpar:</strong> é o valor do meio</p>
            <p><strong>Se quantidade par:</strong> é a média dos dois valores centrais</p>
            <p><strong>Exemplo:</strong> {1, 3, 5, 7, 9} → Mediana = 5</p>
            <p><strong>Exemplo:</strong> {2, 4, 6, 8} → Mediana = (4+6)/2 = 5</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🔢 Moda</h2>
            <p>A moda é o valor que mais se repete no conjunto de dados.</p>
            <p><strong>Exemplo:</strong> {3, 5, 5, 7, 9, 5, 3} → Moda = 5 (aparece 3 vezes)</p>
            <p><strong>Amodal:</strong> quando nenhum valor se repete</p>
            <p><strong>Bimodal:</strong> quando dois valores têm a mesma frequência máxima</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Exemplo Completo</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>As notas de um aluno foram: 7, 8, 6, 8, 9, 8. Calcule média, mediana e moda.</strong></p>
              <p style={{ marginTop: '12px' }}><strong>Média:</strong> (7+8+6+8+9+8) ÷ 6 = 46 ÷ 6 ≈ 7,67</p>
              <p><strong>Mediana:</strong> Ordenando {6, 7, 8, 8, 8, 9} → (8+8) ÷ 2 = 8</p>
              <p><strong>Moda:</strong> 8 (aparece 3 vezes)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>📊 Média = soma tudo e divide pela quantidade</li>
              <li style={{ marginBottom: '12px' }}>🎯 Mediana = sempre ORDENAR primeiro, depois pegar o meio</li>
              <li style={{ marginBottom: '12px' }}>🔢 Moda = valor que MAIS aparece (pense em "moda" = popular)</li>
              <li style={{ marginBottom: '12px' }}>✅ Média é sensível a valores extremos, mediana não</li>
              <li style={{ marginBottom: '12px' }}>💡 Um conjunto pode ter mais de uma moda</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Calcular mediana sem ordenar os dados</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Sempre ordenar do menor para o maior primeiro</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir moda com mediana</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Moda = mais frequente, Mediana = valor central</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="matematica" capitulo="estatistica" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            transition: 'all 0.3s'
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 12px 32px rgba(59, 130, 246, 0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
}
