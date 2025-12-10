'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Qual a classe gramatical da palavra destacada: "A casa é BONITA"?',
    opcoes: ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio'],
    respostaCorreta: 1,
    explicacao: 'BONITA qualifica o substantivo "casa", portanto é um adjetivo'
  },
  {
    pergunta: 'Na frase "João correu rapidamente", a palavra "rapidamente" é:',
    opcoes: ['Adjetivo', 'Substantivo', 'Advérbio', 'Verbo'],
    respostaCorreta: 2,
    explicacao: 'RAPIDAMENTE modifica o verbo "correu", indicando como a ação foi realizada. É um advérbio de modo.'
  },
  {
    pergunta: 'Qual frase está correta?',
    opcoes: ['Fazem dois anos que não o vejo', 'Faz dois anos que não o vejo', 'Fazer dois anos que não o vejo', 'Faço dois anos que não o vejo'],
    respostaCorreta: 1,
    explicacao: 'Verbo FAZER indicando tempo decorrido fica sempre no singular: FAZ dois anos'
  }
];

export default function GramaticaPage() {
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
      localStorage.setItem('biblioteca_portugues_gramatica', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📖</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Gramática</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Classes Gramaticais e Análise Sintática</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Gramática?</h2>
            <p>Gramática é o conjunto de regras que regem o uso da língua portuguesa.</p>
            <p><strong>Divide-se em:</strong> Fonologia, Morfologia, Sintaxe, Semântica e Estilística</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🔤 Classes Gramaticais (10 classes)</h2>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>1️⃣ Substantivo:</strong> Nomeia seres, objetos, sentimentos</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: casa, amor, João, felicidade</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>2️⃣ Adjetivo:</strong> Qualifica, caracteriza o substantivo</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: bonito, grande, azul, feliz</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>3️⃣ Verbo:</strong> Indica ação, estado ou fenômeno da natureza</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: correr, ser, chover</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>4️⃣ Advérbio:</strong> Modifica verbo, adjetivo ou outro advérbio</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: rapidamente, aqui, muito, não</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Dica: geralmente termina em -mente</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>5️⃣ Pronome:</strong> Substitui ou acompanha o substantivo</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: eu, ele, meu, este, que, alguém</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>6️⃣ Preposição:</strong> Liga palavras estabelecendo relação</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: a, de, em, para, por, com, sem</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>7️⃣ Conjunção:</strong> Liga orações ou palavras de mesma função</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: e, mas, ou, porque, que, quando</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>8️⃣ Artigo:</strong> Precede o substantivo (definido ou indefinido)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: o, a, os, as (definidos) | um, uma, uns, umas (indefinidos)</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>9️⃣ Numeral:</strong> Indica quantidade, ordem, fração</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: um, primeiro, metade, dobro</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔟 Interjeição:</strong> Expressa emoção, sentimento</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: Ah! Oba! Ai! Ufa!</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎯 Diferenças Importantes</h2>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>Adjetivo vs Advérbio:</strong></p>
              <p style={{ marginTop: '8px' }}>✅ Adjetivo: modifica SUBSTANTIVO → "casa bonita"</p>
              <p>✅ Advérbio: modifica VERBO, ADJETIVO ou ADVÉRBIO → "correu rapidamente" / "muito bonito"</p>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>Preposição vs Conjunção:</strong></p>
              <p style={{ marginTop: '8px' }}>✅ Preposição: liga PALAVRAS → "livro de João"</p>
              <p>✅ Conjunção: liga ORAÇÕES → "Estudo porque quero passar"</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Termos da Oração</h2>
            <p><strong>Sujeito:</strong> Quem pratica ou sofre a ação</p>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '16px' }}>Ex: "O menino correu" → Sujeito: O menino</p>

            <p style={{ marginTop: '12px' }}><strong>Predicado:</strong> Tudo o que se diz sobre o sujeito</p>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '16px' }}>Ex: "O menino correu rápido" → Predicado: correu rápido</p>

            <p style={{ marginTop: '12px' }}><strong>Complementos verbais:</strong></p>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '16px' }}>• Objeto Direto (sem preposição): "Vi o filme"</p>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '16px' }}>• Objeto Indireto (com preposição): "Gosto de chocolate"</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>📝 Substantivo = NOME (pessoa, lugar, coisa)</li>
              <li style={{ marginBottom: '12px' }}>🎨 Adjetivo = QUALIDADE (bonito, grande)</li>
              <li style={{ marginBottom: '12px' }}>🏃 Verbo = AÇÃO (correr, pular) ou ESTADO (ser, estar)</li>
              <li style={{ marginBottom: '12px' }}>⚡ Advérbio = geralmente termina em -MENTE</li>
              <li style={{ marginBottom: '12px' }}>🔗 Preposição = liga palavras (de, em, com, para)</li>
              <li style={{ marginBottom: '12px' }}>🔗 Conjunção = liga orações (e, mas, porque)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir adjetivo com advérbio</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Adjetivo modifica substantivo, advérbio modifica verbo</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> "Fazem dois anos" (plural)</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> "Faz dois anos" (verbo FAZER indicando tempo fica no singular)</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="portugues" capitulo="gramatica" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
