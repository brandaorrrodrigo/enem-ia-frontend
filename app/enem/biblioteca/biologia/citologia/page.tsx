'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'A organela responsável pela produção de energia na célula é:',
    opcoes: ['Ribossomo', 'Mitocôndria', 'Lisossomo', 'Núcleo'],
    respostaCorreta: 1,
    explicacao: 'A mitocôndria é a "usina de energia" da célula, produzindo ATP através da respiração celular'
  },
  {
    pergunta: 'Qual a principal diferença entre célula procarionte e eucarionte?',
    opcoes: ['Tamanho', 'Presença de núcleo organizado', 'Presença de DNA', 'Presença de membrana plasmática'],
    respostaCorreta: 1,
    explicacao: 'Células eucariontes possuem núcleo organizado delimitado por membrana nuclear, procariontes não'
  },
  {
    pergunta: 'A estrutura responsável pela síntese de proteínas é:',
    opcoes: ['Retículo endoplasmático', 'Complexo de Golgi', 'Ribossomo', 'Lisossomo'],
    respostaCorreta: 2,
    explicacao: 'Os ribossomos são as organelas responsáveis pela síntese (produção) de proteínas'
  }
];

export default function CitologiaPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_biologia_citologia', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔬</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Citologia</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Estudo da Célula e suas Organelas</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Citologia?</h2>
            <p>Citologia é a área da Biologia que estuda as células, suas estruturas, funções e processos vitais.</p>
            <p><strong>A célula é a unidade básica da vida</strong> - todos os seres vivos são formados por células.</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧫 Tipos de Células</h2>
            <p><strong>Procariontes:</strong> Células simples, SEM núcleo organizado (bactérias e arqueas)</p>
            <p>• Sem membrana nuclear</p>
            <p>• DNA disperso no citoplasma (nucleoide)</p>
            <p>• Pequenas (1-10 μm)</p>
            <p style={{ marginTop: '16px' }}><strong>Eucariontes:</strong> Células complexas, COM núcleo organizado (animais, plantas, fungos)</p>
            <p>• Com membrana nuclear (carioteca)</p>
            <p>• DNA dentro do núcleo</p>
            <p>• Maiores (10-100 μm)</p>
            <p>• Possuem organelas membranosas</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🏭 Principais Organelas</h2>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔋 Mitocôndria:</strong> Produção de energia (ATP) através da respiração celular</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Usina de energia da célula"</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🧬 Núcleo:</strong> Armazena o DNA, controla as atividades celulares</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Cérebro da célula"</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🔨 Ribossomo:</strong> Síntese (produção) de proteínas</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Fábrica de proteínas"</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🏢 Retículo Endoplasmático (RE):</strong> Transporte e processamento de substâncias</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>RE Rugoso (com ribossomos): síntese de proteínas | RE Liso (sem ribossomos): síntese de lipídios</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>📦 Complexo de Golgi:</strong> Modificação, empacotamento e secreção de proteínas</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Correio da célula"</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🧹 Lisossomo:</strong> Digestão intracelular (quebra de moléculas)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Lixeiro da célula"</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>🌿 Cloroplasto:</strong> Fotossíntese (APENAS em células vegetais)</p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>Lembre: "Captura luz e produz glicose"</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌱 Diferenças: Célula Animal vs Vegetal</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <p><strong>APENAS em células VEGETAIS:</strong></p>
              <p>✅ Parede celular (de celulose)</p>
              <p>✅ Cloroplastos (fotossíntese)</p>
              <p>✅ Vacúolo grande e central</p>
              <p style={{ marginTop: '16px' }}><strong>APENAS em células ANIMAIS:</strong></p>
              <p>✅ Centríolos</p>
              <p>✅ Lisossomos (mais abundantes)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🔋 Mitocôndria = Usina de energia</li>
              <li style={{ marginBottom: '12px' }}>🧬 Núcleo = Cérebro (controle)</li>
              <li style={{ marginBottom: '12px' }}>🔨 Ribossomo = Fábrica de proteínas</li>
              <li style={{ marginBottom: '12px' }}>📦 Golgi = Correio (empacota e envia)</li>
              <li style={{ marginBottom: '12px' }}>🧹 Lisossomo = Lixeiro (digestão)</li>
              <li style={{ marginBottom: '12px' }}>🌿 Cloroplasto = Verde = Planta = Fotossíntese</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Achar que células animais têm parede celular</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Apenas células vegetais têm parede celular (de celulose)</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir procarionte (sem núcleo) com eucarionte (com núcleo)</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> PRO = antes (primitivo, simples) | EU = verdadeiro (núcleo verdadeiro)</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="biologia" capitulo="citologia" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
