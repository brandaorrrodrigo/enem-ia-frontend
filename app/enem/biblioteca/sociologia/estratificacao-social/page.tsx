'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Segundo Karl Marx, a divisão da sociedade em classes se baseia em:',
    opcoes: ['Raça e etnia', 'Relação com os meios de produção', 'Nível educacional', 'Prestígio social'],
    respostaCorreta: 1,
    explicacao: 'Para Marx, as classes sociais se definem pela relação com os meios de produção (burguesia possui, proletariado vende força de trabalho)'
  },
  {
    pergunta: 'A mobilidade social vertical ascendente ocorre quando:',
    opcoes: ['Uma pessoa muda de emprego', 'Uma pessoa sobe na hierarquia social', 'Uma pessoa desce na hierarquia social', 'Uma pessoa muda de cidade'],
    respostaCorreta: 1,
    explicacao: 'Mobilidade vertical ascendente significa subir na hierarquia social (ex: de classe baixa para classe média)'
  },
  {
    pergunta: 'O sistema de castas na Índia é exemplo de:',
    opcoes: ['Estratificação aberta', 'Estratificação fechada', 'Mobilidade social', 'Igualdade social'],
    respostaCorreta: 1,
    explicacao: 'O sistema de castas é um exemplo de estratificação fechada, onde não há mobilidade social (nasce e morre na mesma casta)'
  }
];

export default function EstratificacaoSocialPage() {
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
      localStorage.setItem('biblioteca_sociologia_estratificacao-social', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚖️</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Estratificação Social</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Classes Sociais e Mobilidade</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Estratificação Social?</h2>
            <p>Estratificação Social é a <strong>divisão da sociedade em camadas (estratos)</strong> de acordo com critérios como renda, poder, prestígio e propriedade.</p>
            <p><strong>Resultado:</strong> Desigualdade social - distribuição desigual de recursos e oportunidades</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🎭 Tipos de Estratificação</h2>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔒 Estratificação Fechada:</strong></p>
              <p>NÃO permite mobilidade social (nasce e morre no mesmo estrato)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Exemplo: Sistema de CASTAS na Índia</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Determinado pelo nascimento</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Impossível mudar de casta</p>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔓 Estratificação Aberta:</strong></p>
              <p>PERMITE mobilidade social (é possível mudar de classe)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>Exemplo: Sistema de CLASSES sociais (capitalismo)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Determinado por renda, educação, ocupação</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Mobilidade social é possível</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>💼 Classes Sociais (Karl Marx)</h2>
            <p>Para Marx, a sociedade capitalista se divide em <strong>duas classes principais:</strong></p>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
              <p><strong>🏭 Burguesia:</strong> Donos dos meios de produção (fábricas, máquinas, terras)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>• Classe dominante</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Explora a força de trabalho do proletariado</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Acumula capital (lucro)</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>⚙️ Proletariado:</strong> Vendem sua força de trabalho (trabalhadores)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px' }}>• Classe dominada</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• NÃO possuem meios de produção</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>• Recebem salário em troca de trabalho</p>
            </div>

            <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#facc15' }}>Marx defendia que essa relação gera exploração e luta de classes.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📊 Estratificação Moderna (Max Weber)</h2>
            <p>Weber amplia o conceito de Marx, identificando <strong>três dimensões de estratificação:</strong></p>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '2px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
              <p><strong>💰 Classe (econômica):</strong> Baseada na renda e propriedade</p>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '2px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>⚡ Status (prestígio):</strong> Baseado no reconhecimento social</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: médico tem alto status, mesmo com renda moderada</p>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '2px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🏛️ Poder (político):</strong> Capacidade de influenciar decisões</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Ex: políticos, líderes</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🔄 Mobilidade Social</h2>
            <p>Mobilidade Social é a <strong>mudança de posição na hierarquia social</strong>.</p>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
              <p><strong>Tipos de Mobilidade:</strong></p>
              <p style={{ marginTop: '12px' }}>📈 <strong>Vertical Ascendente:</strong> Subir na hierarquia (de classe baixa para média)</p>
              <p>📉 <strong>Vertical Descendente:</strong> Descer na hierarquia (de classe média para baixa)</p>
              <p>↔️ <strong>Horizontal:</strong> Mudar de posição sem mudar de classe (trocar de emprego)</p>
              <p>👨‍👩‍👧 <strong>Intergeracional:</strong> Entre gerações (filho tem classe diferente do pai)</p>
              <p>👤 <strong>Intrageracional:</strong> Durante a vida de uma pessoa</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🔒 Fechada = CASTA (nasce e morre ali)</li>
              <li style={{ marginBottom: '12px' }}>🔓 Aberta = CLASSES (pode mudar)</li>
              <li style={{ marginBottom: '12px' }}>💼 Marx: Burguesia (patrão) vs Proletariado (trabalhador)</li>
              <li style={{ marginBottom: '12px' }}>📊 Weber: Classe + Status + Poder (3 dimensões)</li>
              <li style={{ marginBottom: '12px' }}>📈 Mobilidade Vertical = subir ou descer</li>
              <li style={{ marginBottom: '12px' }}>↔️ Mobilidade Horizontal = mudar de posição sem mudar de classe</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir mobilidade vertical com horizontal</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Vertical = sobe/desce de classe | Horizontal = muda de posição na mesma classe</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Achar que Marx e Weber dizem a mesma coisa</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Marx foca na economia (burguesia vs proletariado), Weber adiciona status e poder</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="sociologia" capitulo="estratificacao-social" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
