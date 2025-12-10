'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Qual é o domínio da função f(x) = √(x - 2)?',
    opcoes: [
      'x ≥ 2',
      'x > 2',
      'x < 2',
      'Todos os reais',
    ],
    respostaCorreta: 0,
    explicacao: 'Para que a raiz quadrada exista, o radicando deve ser não-negativo. Portanto, x - 2 ≥ 0, ou seja, x ≥ 2.',
  },
  {
    pergunta: 'Uma função afim f(x) = ax + b é crescente quando:',
    opcoes: [
      'a > 0',
      'a < 0',
      'b > 0',
      'b < 0',
    ],
    respostaCorreta: 0,
    explicacao: 'Uma função afim é crescente quando o coeficiente angular "a" é positivo (a > 0). Isso significa que quando x aumenta, y também aumenta.',
  },
  {
    pergunta: 'O gráfico de uma função quadrática é:',
    opcoes: [
      'Uma parábola',
      'Uma reta',
      'Uma hipérbole',
      'Um círculo',
    ],
    respostaCorreta: 0,
    explicacao: 'O gráfico de uma função quadrática f(x) = ax² + bx + c é sempre uma parábola, que pode ter concavidade para cima (a > 0) ou para baixo (a < 0).',
  },
];

export default function FuncoesPage() {
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

      // Salvar progresso no localStorage
      localStorage.setItem('biblioteca_matematica_funcoes', Math.floor(progress).toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = (acertos: number) => {
    console.log(`Quiz completo! Acertos: ${acertos}/${questions.length}`);
    // Aqui você pode adicionar lógica adicional, como atualizar estatísticas
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
          <h1
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            Funções
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Entenda os conceitos fundamentais de funções e suas aplicações no ENEM
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
          {/* Seção 1: O que é uma Função? */}
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
              🎯 O que é uma Função?
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Uma <strong>função</strong> é uma relação entre dois conjuntos onde cada elemento do primeiro conjunto
              (domínio) está associado a <strong>exatamente um elemento</strong> do segundo conjunto (contradomínio).
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '8px' }}>
                💡 Definição Formal:
              </p>
              <p style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '18px' }}>
                f: A → B
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                Lê-se: "função f de A em B"
              </p>
            </div>
            <p>
              <strong>Elementos importantes:</strong>
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li><strong>Domínio (D):</strong> Conjunto de todos os valores possíveis de entrada (x)</li>
              <li><strong>Contradomínio (CD):</strong> Conjunto que contém todos os possíveis valores de saída</li>
              <li><strong>Imagem (Im):</strong> Conjunto dos valores efetivamente assumidos pela função</li>
            </ul>
          </section>

          {/* Seção 2: Função Afim */}
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
              📈 Função Afim (1º Grau)
            </h2>
            <p style={{ marginBottom: '16px' }}>
              A função afim tem a forma:
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '24px', fontWeight: 'bold' }}>
                f(x) = ax + b
              </p>
            </div>
            <p style={{ marginBottom: '16px' }}>
              Onde:
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li><strong>a</strong> é o coeficiente angular (inclinação da reta)</li>
              <li><strong>b</strong> é o coeficiente linear (ponto onde a reta corta o eixo y)</li>
            </ul>

            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px', color: '#22c55e' }}>
                📝 Exemplo 1: Função Crescente
              </p>
              <p style={{ marginBottom: '8px' }}>
                f(x) = 2x + 3
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                <strong>a = 2</strong> (positivo → função crescente)<br/>
                <strong>b = 3</strong> (reta corta o eixo y em 3)<br/>
                <strong>Raiz:</strong> Quando f(x) = 0 → 2x + 3 = 0 → x = -3/2
              </p>
            </div>

            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px', color: '#ef4444' }}>
                📝 Exemplo 2: Função Decrescente
              </p>
              <p style={{ marginBottom: '8px' }}>
                f(x) = -3x + 6
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                <strong>a = -3</strong> (negativo → função decrescente)<br/>
                <strong>b = 6</strong> (reta corta o eixo y em 6)<br/>
                <strong>Raiz:</strong> Quando f(x) = 0 → -3x + 6 = 0 → x = 2
              </p>
            </div>
          </section>

          {/* Seção 3: Função Quadrática */}
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
              🎢 Função Quadrática (2º Grau)
            </h2>
            <p style={{ marginBottom: '16px' }}>
              A função quadrática tem a forma:
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '24px', fontWeight: 'bold' }}>
                f(x) = ax² + bx + c
              </p>
            </div>
            <p style={{ marginBottom: '16px' }}>
              O gráfico é uma <strong>parábola</strong> que pode ter concavidade para cima (a &gt; 0) ou para baixo (a &lt; 0).
            </p>

            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: '#8b5cf6',
                marginTop: '24px',
                marginBottom: '16px',
              }}
            >
              🔍 Elementos Importantes:
            </h3>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li><strong>Vértice da parábola:</strong> V = (x_v, y_v)</li>
              <li><strong>x_v = -b/(2a)</strong> (coordenada x do vértice)</li>
              <li><strong>y_v = -Δ/(4a)</strong> (coordenada y do vértice)</li>
              <li><strong>Discriminante (Δ):</strong> Δ = b² - 4ac</li>
            </ul>

            <div
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px', color: '#8b5cf6' }}>
                🎯 Análise do Discriminante (Δ):
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '12px' }}>
                <li><strong>Δ &gt; 0:</strong> A função tem duas raízes reais e distintas</li>
                <li><strong>Δ = 0:</strong> A função tem uma raiz real (raiz dupla)</li>
                <li><strong>Δ &lt; 0:</strong> A função não tem raízes reais</li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginTop: '20px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px', color: '#22c55e' }}>
                📝 Exemplo 3: Encontrando as raízes
              </p>
              <p style={{ marginBottom: '8px' }}>
                f(x) = x² - 5x + 6
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
                <strong>Passo 1:</strong> Calcular Δ<br/>
                Δ = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1<br/><br/>
                <strong>Passo 2:</strong> Como Δ &gt; 0, temos duas raízes<br/>
                x = [-b ± √Δ] / (2a)<br/>
                x₁ = [5 + 1] / 2 = 3<br/>
                x₂ = [5 - 1] / 2 = 2<br/><br/>
                <strong>Resposta:</strong> As raízes são x = 2 e x = 3
              </p>
            </div>
          </section>

          {/* Seção 4: Função Exponencial */}
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
              🚀 Função Exponencial
            </h2>
            <p style={{ marginBottom: '16px' }}>
              A função exponencial tem a forma:
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '24px', fontWeight: 'bold' }}>
                f(x) = a^x (onde a &gt; 0 e a ≠ 1)
              </p>
            </div>
            <p style={{ marginBottom: '16px' }}>
              <strong>Características:</strong>
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '20px' }}>
              <li>Se <strong>a &gt; 1:</strong> função crescente (crescimento exponencial)</li>
              <li>Se <strong>0 &lt; a &lt; 1:</strong> função decrescente (decrescimento exponencial)</li>
              <li>O domínio é o conjunto dos números reais (ℝ)</li>
              <li>A imagem é o conjunto dos números reais positivos (ℝ₊*)</li>
            </ul>

            <div
              style={{
                background: 'rgba(250, 204, 21, 0.1)',
                border: '2px solid rgba(250, 204, 21, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px', color: '#facc15' }}>
                🌟 Aplicações no ENEM:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '12px' }}>
                <li>Crescimento populacional</li>
                <li>Juros compostos</li>
                <li>Decaimento radioativo</li>
                <li>Propagação de doenças (epidemiologia)</li>
              </ul>
            </div>
          </section>

          {/* Seção 5: Dicas para o ENEM */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#22c55e',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              💡 Dicas para o ENEM
            </h2>
            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <ol style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Identifique o tipo de função:</strong> Antes de resolver, reconheça se é afim, quadrática, exponencial ou logarítmica.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Faça o gráfico mental:</strong> Visualize como o gráfico se comporta para entender melhor o problema.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Atenção ao domínio:</strong> Verifique sempre quais valores x pode assumir (raízes, denominadores, etc).
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Use a interpretação:</strong> Muitas questões do ENEM envolvem situações do cotidiano. Relacione a função com o contexto.
                </li>
                <li>
                  <strong>Fórmulas essenciais:</strong> Memorize as fórmulas do vértice, discriminante e Bhaskara.
                </li>
              </ol>
            </div>
          </section>

          {/* Resumo Final */}
          <section
            style={{
              background: 'rgba(139, 90, 43, 0.2)',
              border: '3px solid rgba(139, 90, 43, 0.5)',
              borderRadius: '16px',
              padding: '24px',
              marginTop: '40px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '28px',
                color: '#a0714d',
                marginBottom: '16px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              📌 Resumo
            </h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>Funções relacionam elementos de dois conjuntos de forma única</li>
              <li>Função afim: f(x) = ax + b (gráfico é uma reta)</li>
              <li>Função quadrática: f(x) = ax² + bx + c (gráfico é uma parábola)</li>
              <li>Função exponencial: f(x) = a^x (crescimento ou decrescimento rápido)</li>
              <li>Sempre analise domínio, imagem e comportamento da função</li>
            </ul>
          </section>
        </div>
      </motion.div>

      {/* MicroQuiz - aparece após 80% de scroll */}
      <MicroQuiz
        questions={questions}
        materia="matematica"
        capitulo="funcoes"
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
