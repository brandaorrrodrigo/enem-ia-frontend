'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Quanto é 25% de 80?',
    opcoes: ['15', '20', '25', '30'],
    respostaCorreta: 1,
    explicacao: '25% = 1/4, então 80 ÷ 4 = 20. Ou: 0,25 × 80 = 20'
  },
  {
    pergunta: 'Qual é o resultado de 1/2 + 1/3?',
    opcoes: ['2/5', '3/6', '5/6', '4/6'],
    respostaCorreta: 2,
    explicacao: 'MMC(2,3) = 6. Então 3/6 + 2/6 = 5/6'
  },
  {
    pergunta: 'O resultado de 2 + 3 × 4 é:',
    opcoes: ['20', '14', '12', '10'],
    respostaCorreta: 1,
    explicacao: 'Multiplicação primeiro: 3 × 4 = 12, depois 2 + 12 = 14'
  }
];

export default function AritmeticaBasicaPage() {
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

      localStorage.setItem('biblioteca_matematica_aritmetica-basica', Math.floor(progress).toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = (acertos: number) => {
    console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)',
        padding: '40px 20px',
        position: 'relative',
      }}
    >
      {/* Barra de progresso fixa */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
            width: `${scrollProgress}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Botão Voltar */}
      <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '20px' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(139, 90, 43, 0.4)',
            borderRadius: '12px',
            color: '#fff',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Voltar para Biblioteca
        </button>
      </div>

      {/* Conteúdo Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '3px solid rgba(139, 90, 43, 0.6)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Cabeçalho */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔢</div>
          <h1
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            Aritmética Básica
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Operações fundamentais, frações e números decimais
          </p>
        </div>

        {/* IMPORTANTE: SEM BADGE DE FP NA BIBLIOTECA */}
        <div
          style={{
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            💡 Este módulo contribui para seu domínio da disciplina.
          </span>
        </div>

        {/* Conteúdo */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.8',
          }}
        >
          {/* Resumo */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              📝 Resumo
            </h2>
            <p>
              Aritmética Básica envolve as operações fundamentais com números: adição, subtração, multiplicação e divisão.
              Inclui também o trabalho com frações, números decimais e porcentagens. É a base de toda a matemática do ENEM.
            </p>
          </section>

          {/* Explicação */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🎯 Operações Fundamentais
            </h2>
            <p style={{ marginBottom: '16px' }}>As quatro operações básicas são a fundação de toda a matemática:</p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li><strong>Adição (+):</strong> Juntar quantidades</li>
              <li><strong>Subtração (-):</strong> Retirar ou comparar quantidades</li>
              <li><strong>Multiplicação (×):</strong> Soma repetida de parcelas iguais</li>
              <li><strong>Divisão (÷):</strong> Repartir em partes iguais</li>
            </ul>

            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: '#8b5cf6',
                marginTop: '24px',
                marginBottom: '16px',
              }}
            >
              📊 Ordem das Operações (PEMDAS)
            </h3>
            <p style={{ marginBottom: '12px' }}>Quando há várias operações em uma expressão, siga esta ordem:</p>
            <ol style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li><strong>P</strong>arênteses e colchetes</li>
              <li><strong>E</strong>xpoentes e raízes</li>
              <li><strong>M</strong>ultiplicação e <strong>D</strong>ivisão (da esquerda para direita)</li>
              <li><strong>A</strong>dição e <strong>S</strong>ubtração (da esquerda para direita)</li>
            </ol>

            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: '#8b5cf6',
                marginTop: '24px',
                marginBottom: '16px',
              }}
            >
              🎯 Frações
            </h3>
            <p style={{ marginBottom: '12px' }}>Uma fração representa uma parte do todo: <strong>numerador/denominador</strong></p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li><strong>Somar frações:</strong> Precisam ter o mesmo denominador</li>
              <li><strong>Multiplicar frações:</strong> Multiplica numerador com numerador e denominador com denominador</li>
              <li><strong>Dividir frações:</strong> Multiplica pela fração invertida</li>
            </ul>
          </section>

          {/* Exemplos */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              📚 Exemplos Resolvidos
            </h2>
            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Exemplo 1: Ordem das Operações</p>
              <p style={{ marginBottom: '8px' }}>Calcule: 3 + 2 × (8 - 3)</p>
              <p style={{ marginBottom: '8px' }}><strong>Solução:</strong></p>
              <p style={{ marginBottom: '4px' }}>Passo 1: Resolve o parêntese → 8 - 3 = 5</p>
              <p style={{ marginBottom: '4px' }}>Passo 2: Multiplicação → 2 × 5 = 10</p>
              <p style={{ marginBottom: '4px' }}>Passo 3: Adição → 3 + 10 = 13</p>
              <p style={{ fontWeight: 'bold', color: '#22c55e' }}>Resposta: 13</p>
            </div>

            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>Exemplo 2: Soma de Frações</p>
              <p style={{ marginBottom: '8px' }}>Calcule: 1/4 + 2/3</p>
              <p style={{ marginBottom: '8px' }}><strong>Solução:</strong></p>
              <p style={{ marginBottom: '4px' }}>Passo 1: MMC(4,3) = 12</p>
              <p style={{ marginBottom: '4px' }}>Passo 2: 1/4 = 3/12 e 2/3 = 8/12</p>
              <p style={{ marginBottom: '4px' }}>Passo 3: 3/12 + 8/12 = 11/12</p>
              <p style={{ fontWeight: 'bold', color: '#22c55e' }}>Resposta: 11/12</p>
            </div>
          </section>

          {/* Fórmulas */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🧮 Fórmulas Importantes
            </h2>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#3b82f6' }}>
                Fração para Decimal
              </h3>
              <p style={{ fontSize: '20px', fontFamily: "'Courier New', monospace", marginBottom: '8px' }}>
                decimal = numerador ÷ denominador
              </p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>
                <strong>Quando usar:</strong> Para converter fração em número decimal
              </p>
            </div>

            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#3b82f6' }}>
                Porcentagem
              </h3>
              <p style={{ fontSize: '20px', fontFamily: "'Courier New', monospace", marginBottom: '8px' }}>
                x% de N = (x/100) × N
              </p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>
                <strong>Quando usar:</strong> Para calcular porcentagem de um valor
              </p>
            </div>
          </section>

          {/* Dicas de Memorização */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🧠 Dicas de Memorização
            </h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li style={{ marginBottom: '12px' }}>🔢 PEMDAS: Parênteses, Expoentes, Multiplicação/Divisão, Adição/Subtração</li>
              <li style={{ marginBottom: '12px' }}>➗ Para dividir frações: "multiplica pela invertida"</li>
              <li style={{ marginBottom: '12px' }}>📊 MMC para somar frações com denominadores diferentes</li>
              <li style={{ marginBottom: '12px' }}>💯 Porcentagem = dividir por 100 (50% = 50/100 = 0,5)</li>
              <li style={{ marginBottom: '12px' }}>🎯 Número decimal × 10 = move vírgula 1 casa para direita</li>
            </ul>
          </section>

          {/* Erros Comuns */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#ef4444',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              ⚠️ Erros Comuns
            </h2>
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ef4444' }}>❌ Erro:</strong> 2 + 3 × 4 = 20 (fazer 5 × 4)
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22c55e' }}>✅ Correto:</strong> 2 + 3 × 4 = 2 + 12 = 14 (multiplicação primeiro)
              </p>
            </div>

            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ef4444' }}>❌ Erro:</strong> 1/2 + 1/3 = 2/5 (somar numeradores e denominadores)
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22c55e' }}>✅ Correto:</strong> 1/2 + 1/3 = 3/6 + 2/6 = 5/6 (usar MMC)
              </p>
            </div>
          </section>
        </div>
      </motion.div>

      {/* MicroQuiz - aparece após 80% de scroll */}
      <MicroQuiz
        questions={questions}
        materia="matematica"
        capitulo="aritmetica-basica"
        onComplete={handleComplete}
      />
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
