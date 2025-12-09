'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Quanto é 15% de 200?',
    opcoes: ['20', '25', '30', '35'],
    respostaCorreta: 2,
    explicacao: '15% de 200 = 0,15 × 200 = 30'
  },
  {
    pergunta: 'Um produto de R$ 50 com 40% de desconto custa:',
    opcoes: ['R$ 20', 'R$ 30', 'R$ 35', 'R$ 40'],
    respostaCorreta: 1,
    explicacao: '40% de desconto = pagar 60% = 50 × 0,6 = 30'
  },
  {
    pergunta: 'Dois descontos de 20% equivalem a um desconto de:',
    opcoes: ['36%', '40%', '44%', '48%'],
    respostaCorreta: 0,
    explicacao: '0,8 × 0,8 = 0,64 (paga 64% do valor) = 36% de desconto'
  }
];

export default function PorcentagemPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_matematica_porcentagem', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>%</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Porcentagem</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Cálculos percentuais e aplicações práticas</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Porcentagem?</h2>
            <p>Porcentagem significa "por cem" (%). É uma fração com denominador 100.</p>
            <p><strong>Exemplo:</strong> 25% = 25/100 = 0,25</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>💰 Cálculos Básicos</h2>
            <p><strong>Calcular x% de N:</strong></p>
            <p>x% de N = (x/100) × N</p>
            <p>Exemplo: 30% de 200 = (30/100) × 200 = 0,3 × 200 = 60</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📈 Aumento Percentual</h2>
            <p>Quando um valor aumenta x%:</p>
            <p>Novo valor = Valor original × (1 + x/100)</p>
            <p>Exemplo: Aumento de 20% em 50 = 50 × 1,20 = 60</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📉 Desconto Percentual</h2>
            <p>Quando um valor diminui x%:</p>
            <p>Novo valor = Valor original × (1 - x/100)</p>
            <p>Exemplo: Desconto de 15% em 80 = 80 × 0,85 = 68</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Exemplo: Descontos Sucessivos</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>Um produto de R$ 100 tem 20% de desconto e depois mais 10% de desconto. Qual o preço final?</strong></p>
              <p style={{ marginTop: '12px' }}><strong>ERRO COMUM:</strong> 20% + 10% = 30% de desconto ❌</p>
              <p><strong>CORRETO:</strong> Aplicar os descontos separadamente ✅</p>
              <p style={{ marginTop: '12px' }}>Primeiro desconto: 100 × 0,80 = 80</p>
              <p>Segundo desconto: 80 × 0,90 = 72</p>
              <p style={{ fontWeight: 'bold', color: '#22c55e' }}>Resposta: R$ 72,00 (desconto total foi de 28%, não 30%)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>💯 Para calcular na cabeça: 10% = dividir por 10, 1% = dividir por 100</li>
              <li style={{ marginBottom: '12px' }}>⚡ 50% = metade, 25% = um quarto, 75% = três quartos</li>
              <li style={{ marginBottom: '12px' }}>📊 Descontos sucessivos NÃO se somam! Aplicar um após o outro</li>
              <li style={{ marginBottom: '12px' }}>🔄 Aumento de x% seguido de redução de x% NÃO volta ao valor original</li>
              <li style={{ marginBottom: '12px' }}>✅ Aumentar 100% = dobrar o valor, aumentar 50% = adicionar metade</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Somar descontos: 20% + 10% = 30%</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Aplicar sucessivamente: × 0,80 × 0,90 = × 0,72 (28% de desconto)</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Pensar que aumento de 50% e redução de 50% se anulam</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> × 1,5 × 0,5 = × 0,75 (perdeu 25%)</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="matematica" capitulo="porcentagem" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
