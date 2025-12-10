'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Qual filósofo disse "Conhece-te a ti mesmo"?',
    opcoes: ['Platão', 'Aristóteles', 'Sócrates', 'Pitágoras'],
    respostaCorreta: 2,
    explicacao: 'Sócrates é famoso pelo método maiêutico e pela máxima "Conhece-te a ti mesmo"'
  },
  {
    pergunta: 'O Mito da Caverna foi criado por:',
    opcoes: ['Sócrates', 'Platão', 'Aristóteles', 'Pré-socráticos'],
    respostaCorreta: 1,
    explicacao: 'O Mito da Caverna é uma alegoria criada por Platão em "A República" para explicar a teoria das ideias'
  },
  {
    pergunta: 'Para Aristóteles, a forma mais pura de conhecimento é:',
    opcoes: ['A opinião (doxa)', 'A experiência sensível', 'A razão (logos)', 'A fé'],
    respostaCorreta: 2,
    explicacao: 'Aristóteles valorizava a razão (logos) como forma mais elevada de conhecimento'
  }
];

export default function FilosofiaAntigaPage() {
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
      localStorage.setItem('biblioteca_filosofia_filosofia-antiga', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏛️</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Filosofia Antiga</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>Pré-socráticos, Sócrates, Platão e Aristóteles</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que é Filosofia Antiga?</h2>
            <p>A Filosofia Antiga compreende o pensamento filosófico desenvolvido na Grécia entre os séculos VI a.C. e VI d.C.</p>
            <p><strong>Período:</strong> Do surgimento dos primeiros filósofos até o fim do Império Romano</p>
            <p><strong>Principal característica:</strong> Busca racional por explicações sobre a natureza, conhecimento e existência</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌊 Filósofos Pré-socráticos</h2>
            <p>Foram os primeiros filósofos, buscavam explicar a <strong>origem e natureza do universo (physis)</strong>.</p>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Tales de Mileto:</strong> "Tudo é água" - a água é o princípio (arché) de todas as coisas</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Heráclito:</strong> "Ninguém entra duas vezes no mesmo rio" - tudo flui, tudo muda constantemente</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Parmênides:</strong> "O ser é, o não-ser não é" - o ser é imutável e eterno</p>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Pitágoras:</strong> "Tudo é número" - os números são a essência das coisas</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🗣️ Sócrates (469-399 a.C.)</h2>
            <p><strong>Foco:</strong> Conhecimento de si mesmo e ética</p>
            <p><strong>Método:</strong> Maiêutica (arte de "dar à luz" ideias através do diálogo)</p>
            <p><strong>Frases famosas:</strong></p>
            <p>• "Conhece-te a ti mesmo"</p>
            <p>• "Só sei que nada sei"</p>
            <p>• "Uma vida sem reflexão não vale a pena ser vivida"</p>
            <p style={{ marginTop: '16px' }}><strong>Legado:</strong> Deslocou o foco da filosofia da natureza para o ser humano e a ética</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>💡 Platão (428-348 a.C.)</h2>
            <p><strong>Discípulo de Sócrates</strong></p>
            <p><strong>Teoria das Ideias:</strong> Existem dois mundos</p>
            <p>• <strong>Mundo Sensível:</strong> o que percebemos com os sentidos (cópias imperfeitas)</p>
            <p>• <strong>Mundo das Ideias:</strong> o mundo real, perfeito e eterno (acessível pela razão)</p>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
              <p><strong>🏰 Mito da Caverna:</strong></p>
              <p style={{ marginTop: '8px' }}>Prisioneiros acorrentados veem apenas sombras na parede. Um deles se liberta e descobre o mundo real (sol = conhecimento verdadeiro).</p>
              <p style={{ marginTop: '8px', fontWeight: 'bold', color: '#22c55e' }}>Significado: A maioria vive na ignorância (sombras), apenas a filosofia leva ao conhecimento verdadeiro (sol)</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📚 Aristóteles (384-322 a.C.)</h2>
            <p><strong>Discípulo de Platão</strong></p>
            <p><strong>Criador da Lógica:</strong> Desenvolveu o silogismo (forma de raciocínio dedutivo)</p>
            <p><strong>Exemplo de silogismo:</strong></p>
            <p>• Todo homem é mortal (premissa maior)</p>
            <p>• Sócrates é homem (premissa menor)</p>
            <p>• Logo, Sócrates é mortal (conclusão)</p>

            <p style={{ marginTop: '16px' }}><strong>Diferença com Platão:</strong> Para Aristóteles, o conhecimento começa na experiência sensível (observação), não em um "mundo das ideias"</p>

            <p style={{ marginTop: '16px' }}><strong>Contribuições:</strong> Lógica, Ética (Ética a Nicômaco), Política, Metafísica, Biologia</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🌊 Pré-socráticos: Buscam a origem (arché) - água, fogo, número, átomo</li>
              <li style={{ marginBottom: '12px' }}>🗣️ Sócrates: "Conhece-te" + Maiêutica (perguntas)</li>
              <li style={{ marginBottom: '12px' }}>💡 Platão: Mundo das Ideias + Mito da Caverna</li>
              <li style={{ marginBottom: '12px' }}>📚 Aristóteles: Lógica + Silogismo + Experiência</li>
              <li style={{ marginBottom: '12px' }}>✅ Sequência: Sócrates → Platão → Aristóteles (mestre-discípulo)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir Platão com Aristóteles</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Platão = Mundo das Ideias (razão) | Aristóteles = Experiência sensível (observação)</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Achar que Sócrates escreveu livros</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Sócrates NÃO escreveu nada. Conhecemos suas ideias por Platão</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="filosofia" capitulo="filosofia-antiga" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
