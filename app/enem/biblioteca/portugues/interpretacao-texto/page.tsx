'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Qual é a principal finalidade de ler o texto completo antes de responder às questões?',
    opcoes: [
      'Compreender o contexto geral e a tese do autor',
      'Memorizar todas as palavras',
      'Encontrar erros de português',
      'Contar quantos parágrafos tem',
    ],
    respostaCorreta: 0,
    explicacao: 'A leitura completa permite entender o contexto, a tese principal e como as ideias se conectam, facilitando as respostas.',
  },
  {
    pergunta: 'O que são palavras-chave em um texto?',
    opcoes: [
      'Termos que se repetem e são essenciais para o tema',
      'Palavras difíceis que precisam de dicionário',
      'Adjetivos usados pelo autor',
      'Verbos no infinitivo',
    ],
    respostaCorreta: 0,
    explicacao: 'Palavras-chave são termos que aparecem com frequência e carregam o significado central do texto.',
  },
];

export default function InterpretacaoTextoPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_portugues_interpretacao-texto', Math.floor(progress).toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)', padding: '40px 20px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(0, 0, 0, 0.3)', zIndex: 1000 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)', width: `${scrollProgress}%` }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
        <button onClick={() => router.back()} style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(139, 90, 43, 0.4)', borderRadius: '12px', color: '#fff', fontFamily: "'Poppins', sans-serif", fontSize: '14px', cursor: 'pointer' }}>
          ← Voltar
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', border: '3px solid rgba(139, 90, 43, 0.6)', borderRadius: '24px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>
            Interpretação de Texto
          </h1>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#8b5cf6', marginBottom: '20px' }}>
              📖 5 Passos para uma Boa Interpretação
            </h2>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <ol style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}><strong>Leia o texto completo:</strong> Nunca pule partes ou leia apenas o enunciado</li>
                <li style={{ marginBottom: '12px' }}><strong>Identifique o tema central:</strong> Do que o texto trata?</li>
                <li style={{ marginBottom: '12px' }}><strong>Encontre a tese:</strong> Qual é a opinião ou posicionamento do autor?</li>
                <li style={{ marginBottom: '12px' }}><strong>Observe os conectivos:</strong> Palavras como "mas", "porém", "portanto" indicam relações importantes</li>
                <li><strong>Releia o trecho específico:</strong> Volte ao texto antes de marcar a resposta</li>
              </ol>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#8b5cf6', marginBottom: '20px' }}>
              🎯 Tipos de Questões no ENEM
            </h2>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#ec4899', fontSize: '20px', marginBottom: '12px' }}>1. Localização de Informações</h3>
              <p style={{ marginBottom: '8px' }}>Questões que pedem dados explícitos no texto.</p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>Dica: Use palavras-chave para encontrar o trecho rapidamente.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#ec4899', fontSize: '20px', marginBottom: '12px' }}>2. Inferência</h3>
              <p style={{ marginBottom: '8px' }}>Questões que exigem dedução de informações implícitas.</p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>Dica: Use o contexto e seu conhecimento prévio, mas baseie-se no texto.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#ec4899', fontSize: '20px', marginBottom: '12px' }}>3. Análise de Linguagem</h3>
              <p style={{ marginBottom: '8px' }}>Questões sobre recursos linguísticos e figuras de linguagem.</p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>Dica: Identifique metáforas, ironias e o propósito comunicativo.</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#22c55e', marginBottom: '20px' }}>
              💡 Macetes Importantes
            </h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <ul style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}>❌ <strong>NUNCA</strong> marque pela memória. Sempre volte ao texto</li>
                <li style={{ marginBottom: '12px' }}>✅ Alternativas muito amplas ou muito específicas geralmente estão erradas</li>
                <li style={{ marginBottom: '12px' }}>📌 Sublinhe informações importantes durante a leitura</li>
                <li style={{ marginBottom: '12px' }}>🔎 Atenção a palavras absolutas: "sempre", "nunca", "todos"</li>
                <li>⚠️ A resposta correta geralmente parafraseia o texto, não copia literalmente</li>
              </ul>
            </div>
          </section>

          <section style={{ background: 'rgba(139, 90, 43, 0.2)', border: '3px solid rgba(139, 90, 43, 0.5)', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '28px', color: '#a0714d', marginBottom: '16px' }}>
              📌 Resumo
            </h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>Leia o texto completo antes das questões</li>
              <li>Identifique tema, tese e palavras-chave</li>
              <li>Use o contexto para inferências</li>
              <li>Sempre retorne ao texto antes de responder</li>
              <li>Pratique com textos variados (notícias, artigos, charges)</li>
            </ul>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="portugues" capitulo="interpretacao-texto" onComplete={(a) => console.log(a)} />
    </div>
  );
}
