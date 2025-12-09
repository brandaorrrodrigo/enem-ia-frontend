'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Qual é a função orgânica do etanol (CH₃CH₂OH)?',
    opcoes: ['Álcool', 'Aldeído', 'Cetona', 'Éster'],
    respostaCorreta: 0,
    explicacao: 'O etanol possui o grupo funcional -OH ligado a carbono saturado, caracterizando um álcool.',
  },
  {
    pergunta: 'A função orgânica presente no vinagre é:',
    opcoes: ['Ácido carboxílico', 'Álcool', 'Éster', 'Aldeído'],
    respostaCorreta: 0,
    explicacao: 'O vinagre contém ácido acético (CH₃COOH), que é um ácido carboxílico com o grupo -COOH.',
  },
];

export default function QuimicaOrganicaPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_quimica_quimica-organica', Math.floor(progress).toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)', padding: '40px 20px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 1000 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)', width: `${scrollProgress}%` }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
        <button onClick={() => router.back()} style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(139, 90, 43, 0.4)', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>← Voltar</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', border: '3px solid rgba(139, 90, 43, 0.6)', borderRadius: '24px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px' }}>🧪</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Química Orgânica</h1>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px' }}>🔬 O que é Química Orgânica?</h2>
            <p>É o ramo da química que estuda os <strong>compostos de carbono</strong>, suas propriedades, estruturas e reações.</p>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>💡 Características do Carbono:</p>
              <ul style={{ paddingLeft: '24px' }}>
                <li><strong>Tetravalente:</strong> Faz 4 ligações</li>
                <li><strong>Forma cadeias:</strong> Pode ligar-se a outros carbonos</li>
                <li><strong>Ligações simples, duplas ou triplas</strong></li>
              </ul>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px' }}>⚗️ Principais Funções Orgânicas</h2>

            <div style={{ marginBottom: '20px', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '8px' }}>1. Hidrocarbonetos</h3>
              <p style={{ fontSize: '14px' }}>Compostos formados apenas por C e H</p>
              <p style={{ fontFamily: "'Courier New', monospace", marginTop: '8px' }}>CH₄ (metano), C₂H₆ (etano)</p>
            </div>

            <div style={{ marginBottom: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#3b82f6', marginBottom: '8px' }}>2. Álcoois</h3>
              <p style={{ fontSize: '14px' }}>Grupo funcional: -OH (hidroxila)</p>
              <p style={{ fontFamily: "'Courier New', monospace", marginTop: '8px' }}>CH₃OH (metanol), C₂H₅OH (etanol)</p>
            </div>

            <div style={{ marginBottom: '20px', background: 'rgba(139, 92, 246, 0.1)', border: '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '8px' }}>3. Aldeídos e Cetonas</h3>
              <p style={{ fontSize: '14px' }}>Grupo funcional: C=O (carbonila)</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>Aldeído: carbonila na extremidade</p>
              <p style={{ fontSize: '14px' }}>Cetona: carbonila no meio da cadeia</p>
            </div>

            <div style={{ marginBottom: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#ef4444', marginBottom: '8px' }}>4. Ácidos Carboxílicos</h3>
              <p style={{ fontSize: '14px' }}>Grupo funcional: -COOH (carboxila)</p>
              <p style={{ fontFamily: "'Courier New', monospace", marginTop: '8px' }}>CH₃COOH (ácido acético - vinagre)</p>
            </div>

            <div style={{ background: 'rgba(250, 204, 21, 0.1)', border: '2px solid rgba(250, 204, 21, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ color: '#facc15', marginBottom: '8px' }}>5. Ésteres</h3>
              <p style={{ fontSize: '14px' }}>Grupo funcional: -COO- (resultado de ácido + álcool)</p>
              <p style={{ fontSize: '14px', marginTop: '4px' }}>Responsáveis por aromas e sabores</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f59e0b', marginBottom: '20px' }}>📝 Nomenclatura IUPAC</h2>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Regra básica:</p>
              <p style={{ textAlign: 'center', fontSize: '18px', background: 'rgba(0, 0, 0, 0.3)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                <strong>PREFIXO + INFIXO + SUFIXO</strong>
              </p>
              <ul style={{ paddingLeft: '24px' }}>
                <li><strong>Prefixo:</strong> Número de carbonos (met-, et-, prop-, but-...)</li>
                <li><strong>Infixo:</strong> Tipo de ligação (an-, en-, in-)</li>
                <li><strong>Sufixo:</strong> Função orgânica (-o, -ol, -al, -ona, -oico...)</li>
              </ul>
              <p style={{ marginTop: '16px', fontSize: '14px', fontStyle: 'italic' }}>
                Exemplo: CH₃-CH₂-CH₃ = <strong>prop</strong> (3C) + <strong>an</strong> (simples) + <strong>o</strong> (hidrocarboneto) = Propano
              </p>
            </div>
          </section>

          <section style={{ background: 'rgba(139, 90, 43, 0.2)', border: '3px solid rgba(139, 90, 43, 0.5)', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '28px', color: '#a0714d', marginBottom: '16px' }}>🎯 Dicas ENEM</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>Identifique o grupo funcional principal</li>
              <li>Conte o número de carbonos da cadeia principal</li>
              <li>Observe se há insaturações (duplas ou triplas)</li>
              <li>Relacione funções orgânicas com produtos do cotidiano</li>
            </ul>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="quimica" capitulo="quimica-organica" onComplete={(a) => console.log(a)} />
    </div>
  );
}
