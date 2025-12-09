'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Em um triângulo retângulo, sen(θ) é igual a:',
    opcoes: ['cateto oposto / hipotenusa', 'cateto adjacente / hipotenusa', 'cateto oposto / cateto adjacente', 'hipotenusa / cateto oposto'],
    respostaCorreta: 0,
    explicacao: 'Seno = cateto oposto / hipotenusa'
  },
  {
    pergunta: 'Qual o valor de sen(30°)?',
    opcoes: ['1/2', '√2/2', '√3/2', '1'],
    respostaCorreta: 0,
    explicacao: 'sen(30°) = 1/2 (valor decorado da tabela de ângulos notáveis)'
  },
  {
    pergunta: 'A relação fundamental da trigonometria é:',
    opcoes: ['sen²θ + cos²θ = 1', 'sen²θ - cos²θ = 1', 'senθ + cosθ = 1', 'senθ × cosθ = 1'],
    respostaCorreta: 0,
    explicacao: 'A relação fundamental é sen²θ + cos²θ = 1 (Teorema de Pitágoras no círculo trigonométrico)'
  }
];

export default function TrigonometriaPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_matematica_trigonometria', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📐</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Trigonometria</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Seno, Cosseno, Tangente e Relações Trigonométricas</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Trigonometria?</h2>
            <p>Trigonometria estuda as relações entre ângulos e lados de triângulos, especialmente triângulos retângulos.</p>
            <p><strong>Razões trigonométricas:</strong> Seno, Cosseno e Tangente</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📊 Razões Trigonométricas no Triângulo Retângulo</h2>
            <p><strong>Seno (sen θ):</strong> cateto oposto / hipotenusa</p>
            <p><strong>Cosseno (cos θ):</strong> cateto adjacente / hipotenusa</p>
            <p><strong>Tangente (tg θ):</strong> cateto oposto / cateto adjacente</p>
            <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#facc15' }}>Dica: "SOH-CAH-TOA" em inglês, ou "CoCa ColA" em português!</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎯 Tabela de Ângulos Notáveis</h2>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px' }}>Ângulo</th>
                    <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px' }}>Seno</th>
                    <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px' }}>Cosseno</th>
                    <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px' }}>Tangente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>30°</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>1/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√3/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√3/3</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>45°</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√2/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√2/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>1</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>60°</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√3/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>1/2</td>
                    <td style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px', textAlign: 'center' }}>√3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🔢 Relação Fundamental</h2>
            <p><strong>sen²θ + cos²θ = 1</strong></p>
            <p>Esta relação vem do Teorema de Pitágoras aplicado ao círculo trigonométrico.</p>
            <p style={{ marginTop: '12px' }}><strong>Outras relações:</strong></p>
            <p>• tg θ = sen θ / cos θ</p>
            <p>• sec θ = 1 / cos θ</p>
            <p>• csc θ = 1 / sen θ</p>
            <p>• cotg θ = 1 / tg θ = cos θ / sen θ</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Exemplo Prático</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>Um triângulo retângulo tem hipotenusa 10 cm e um ângulo de 30°. Calcule os catetos.</strong></p>
              <p style={{ marginTop: '12px' }}><strong>Cateto oposto (ao ângulo de 30°):</strong></p>
              <p>sen(30°) = cateto oposto / hipotenusa</p>
              <p>1/2 = cateto oposto / 10</p>
              <p>cateto oposto = 5 cm</p>
              <p style={{ marginTop: '12px' }}><strong>Cateto adjacente:</strong></p>
              <p>cos(30°) = cateto adjacente / hipotenusa</p>
              <p>√3/2 = cateto adjacente / 10</p>
              <p>cateto adjacente = 5√3 cm ≈ 8,66 cm</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🎯 "CoCa ColA": Cateto Oposto sobre Hipotenusa = Seno, Cateto Adjacente sobre Hipotenusa = Cosseno</li>
              <li style={{ marginBottom: '12px' }}>📐 30°-60°-90°: lados na proporção 1 : √3 : 2</li>
              <li style={{ marginBottom: '12px' }}>📏 45°-45°-90°: lados na proporção 1 : 1 : √2</li>
              <li style={{ marginBottom: '12px' }}>✅ Tabela: sen e cos trocam valores entre 30° e 60°</li>
              <li style={{ marginBottom: '12px' }}>💡 sen²θ + cos²θ = 1 sempre!</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir cateto oposto com adjacente</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Sempre identifique qual ângulo você está usando como referência</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Trocar valores de sen(30°) e sen(60°)</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> sen(30°) = 1/2 (menor), sen(60°) = √3/2 (maior)</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="matematica" capitulo="trigonometria" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
