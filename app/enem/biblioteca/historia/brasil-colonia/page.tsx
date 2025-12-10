'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'O período colonial brasileiro durou aproximadamente:',
    opcoes: ['200 anos', '300 anos', '400 anos', '500 anos'],
    respostaCorreta: 1,
    explicacao: 'O Brasil Colônia durou cerca de 300 anos (1500-1822), desde o descobrimento até a independência'
  },
  {
    pergunta: 'O principal produto da economia colonial brasileira no século XVI era:',
    opcoes: ['Ouro', 'Café', 'Pau-brasil', 'Açúcar'],
    respostaCorreta: 3,
    explicacao: 'O açúcar foi o principal produto econômico do Brasil colonial no século XVI, especialmente no Nordeste'
  },
  {
    pergunta: 'As Capitanias Hereditárias foram criadas por:',
    opcoes: ['D. Pedro I', 'D. João III', 'D. Manuel I', 'Marquês de Pombal'],
    respostaCorreta: 1,
    explicacao: 'D. João III criou as Capitanias Hereditárias em 1534 para colonizar e defender o território brasileiro'
  }
];

export default function BrasilColoniaPage() {
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
      localStorage.setItem('biblioteca_historia_brasil-colonia', Math.floor(progress).toString());
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⛵</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', marginBottom: '16px', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Brasil Colônia</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>De 1500 a 1822 - Colonização Portuguesa</p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>💡 Este módulo contribui para seu domínio da disciplina.</span>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>📝 O que foi o Brasil Colônia?</h2>
            <p>Período em que o Brasil foi colônia de Portugal, entre 1500 e 1822 (322 anos).</p>
            <p><strong>Característica principal:</strong> Exploração econômica - Portugal extraía riquezas do Brasil</p>
            <p><strong>Sistema colonial:</strong> Pacto Colonial (monopólio comercial português)</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌳 Período Pré-Colonial (1500-1530)</h2>
            <p><strong>Descobrimento:</strong> 22 de abril de 1500 - Pedro Álvares Cabral</p>
            <p><strong>Principais características:</strong></p>
            <p>• Exploração do pau-brasil (tinta vermelha)</p>
            <p>• Escambo com indígenas (troca de produtos)</p>
            <p>• Expedições guarda-costas contra invasores</p>
            <p>• Presença de feitorias (entrepostos comerciais)</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🗺️ Capitanias Hereditárias (1534)</h2>
            <p><strong>Criador:</strong> D. João III (rei de Portugal)</p>
            <p><strong>O que eram:</strong> Divisão do território brasileiro em 15 faixas de terra</p>
            <p><strong>Objetivo:</strong> Colonizar e defender o território</p>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
              <p><strong>❌ Resultado: FRACASSO</strong></p>
              <p style={{ marginTop: '8px' }}>Apenas 2 capitanias prosperaram: São Vicente e Pernambuco</p>
              <p><strong>Motivos do fracasso:</strong></p>
              <p>• Falta de recursos dos donatários</p>
              <p>• Ataques indígenas</p>
              <p>• Distância de Portugal</p>
              <p>• Dificuldades geográficas</p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🏛️ Governo-Geral (1549)</h2>
            <p><strong>Criação:</strong> Para centralizar a administração colonial</p>
            <p><strong>Primeiro Governador-Geral:</strong> Tomé de Sousa (1549)</p>
            <p><strong>Capital:</strong> Salvador (Bahia)</p>
            <p style={{ marginTop: '12px' }}><strong>Principais governadores-gerais:</strong></p>
            <p>1. Tomé de Sousa (1549-1553) - Fundou Salvador</p>
            <p>2. Duarte da Costa (1553-1558)</p>
            <p>3. Mem de Sá (1558-1572) - Fundou o Rio de Janeiro</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🌾 Ciclo do Açúcar (séc. XVI-XVII)</h2>
            <p><strong>Região:</strong> Zona da Mata nordestina (principalmente Pernambuco e Bahia)</p>
            <p><strong>Mão de obra:</strong> Escravos africanos (tráfico negreiro)</p>

            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
              <p><strong>Plantation (sistema de produção):</strong></p>
              <p style={{ marginTop: '8px' }}>✅ Latifúndio (grandes propriedades)</p>
              <p>✅ Monocultura (apenas açúcar)</p>
              <p>✅ Exportação (para Europa)</p>
              <p>✅ Mão de obra escrava</p>
            </div>

            <p style={{ marginTop: '16px' }}><strong>Engenho:</strong> Unidade produtora de açúcar</p>
            <p>• Casa-grande (residência do senhor de engenho)</p>
            <p>• Senzala (moradia dos escravos)</p>
            <p>• Moenda (processamento da cana)</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⛏️ Ciclo do Ouro (séc. XVIII)</h2>
            <p><strong>Descoberta:</strong> Final do século XVII (1693-1695)</p>
            <p><strong>Região:</strong> Minas Gerais, Goiás e Mato Grosso</p>
            <p><strong>Consequências:</strong></p>
            <p>• Deslocamento do eixo econômico (Nordeste → Sudeste)</p>
            <p>• Capital transferida para o Rio de Janeiro (1763)</p>
            <p>• Urbanização (surgimento de vilas e cidades)</p>
            <p>• Aumento da população</p>

            <p style={{ marginTop: '16px' }}><strong>Controle português:</strong></p>
            <p>• Quinto (20% do ouro para Portugal)</p>
            <p>• Casa de Fundição (controle da produção)</p>
            <p>• Derrama (cobrança de impostos atrasados)</p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#3b82f6', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>🧠 Dicas de Memorização</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>📅 1500: Descobrimento | 1534: Capitanias | 1549: Governo-Geral | 1822: Independência</li>
              <li style={{ marginBottom: '12px' }}>🌳 Pau-brasil → Açúcar → Ouro (sequência econômica)</li>
              <li style={{ marginBottom: '12px' }}>🗺️ Capitanias = fracasso (só 2 deram certo)</li>
              <li style={{ marginBottom: '12px' }}>🌾 Açúcar = Nordeste (Plantation)</li>
              <li style={{ marginBottom: '12px' }}>⛏️ Ouro = Minas Gerais (Quinto = 20%)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#ef4444', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>⚠️ Erros Comuns</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Confundir as datas: 1500 (descobrimento) com 1822 (independência)</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> 1500-1822 = 322 anos de colônia</p>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ef4444' }}>❌ Erro:</strong> Achar que todas as Capitanias Hereditárias prosperaram</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#22c55e' }}>✅ Correto:</strong> Apenas 2 prosperaram (São Vicente e Pernambuco). Resto fracassou.</p>
            </div>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="historia" capitulo="brasil-colonia" onComplete={(acertos) => console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`)} />
    </div>
  );
}
