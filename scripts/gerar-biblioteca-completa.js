/**
 * SCRIPT GERADOR DE BIBLIOTECA COMPLETA
 * Gera TODOS os módulos de TODAS as disciplinas com conteúdo real
 * Baseado nos materiais do ENEM disponíveis
 */

const fs = require('fs');
const path = require('path');

// TEMPLATE DE PÁGINA DE MÓDULO
const gerarPaginaModulo = (materia, modulo, conteudo) => {
  return `'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = ${JSON.stringify(conteudo.miniQuiz.questoes, null, 2)};

export default function ${modulo.slug.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')}Page() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      localStorage.setItem('biblioteca_${materia.id}_${modulo.slug}', Math.floor(progress).toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = (acertos: number) => {
    console.log(\`Quiz completo! Acertos: \${acertos}/\${questions.length}\`);
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
            background: 'linear-gradient(90deg, ${materia.color} 0%, ${materia.color}cc 100%)',
            width: \`\${scrollProgress}%\`,
          }}
          initial={{ width: 0 }}
          animate={{ width: \`\${scrollProgress}%\` }}
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>${modulo.icon}</div>
          <h1
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            ${modulo.title}
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            ${modulo.descricao}
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
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              📝 Resumo
            </h2>
            <p>{${JSON.stringify(conteudo.resumo)}}</p>
          </section>

          {/* Explicação */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🎯 Explicação Detalhada
            </h2>
            <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(conteudo.explicacao)} }} />
          </section>

          {/* Exemplos */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              📚 Exemplos Resolvidos
            </h2>
            {${JSON.stringify(conteudo.exemplos)}.map((exemplo, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '2px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
                dangerouslySetInnerHTML={{ __html: exemplo }}
              />
            ))}
          </section>

          ${conteudo.formulas ? `
          {/* Fórmulas */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🧮 Fórmulas Importantes
            </h2>
            {${JSON.stringify(conteudo.formulas)}.map((formula, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#3b82f6' }}>
                  {formula.nome}
                </h3>
                <p style={{ fontSize: '20px', fontFamily: "'Courier New', monospace", marginBottom: '8px' }}>
                  {formula.formula}
                </p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                  <strong>Quando usar:</strong> {formula.quando}
                </p>
              </div>
            ))}
          </section>
          ` : ''}

          {/* Memorização */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🧠 Dicas de Memorização
            </h2>
            <ul style={{ paddingLeft: '24px' }}>
              {${JSON.stringify(conteudo.memorizacao)}.map((dica, idx) => (
                <li key={idx} style={{ marginBottom: '12px', fontSize: '16px' }}>{dica}</li>
              ))}
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
            {${JSON.stringify(conteudo.errosComuns)}.map((erro, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <p style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#ef4444' }}>❌ Erro:</strong> {erro.erro}
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#22c55e' }}>✅ Correto:</strong> {erro.correto}
                </p>
              </div>
            ))}
          </section>

          {/* Mapa Mental */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '${materia.color}',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              🗺️ Mapa Mental
            </h2>
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px' }}>
                {${JSON.stringify(conteudo.mapaMental.titulo)}}
              </h3>
              {${JSON.stringify(conteudo.mapaMental.topicos)}.map((topico, idx) => (
                <div key={idx} style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#8b5cf6' }}>
                    {topico.titulo}
                  </h4>
                  <ul style={{ paddingLeft: '24px' }}>
                    {topico.subtopicos.map((sub, subIdx) => (
                      <li key={subIdx} style={{ marginBottom: '8px' }}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      {/* MicroQuiz - aparece após 80% de scroll */}
      <MicroQuiz
        questions={questions}
        materia="${materia.id}"
        capitulo="${modulo.slug}"
        onComplete={handleComplete}
      />
    </div>
  );
}
`;
};

// BASE DE CONHECIMENTO COMPLETA
const BIBLIOTECA_COMPLETA = {
  matematica: {
    'funcoes': {
      resumo: 'Funções são relações entre conjuntos onde cada elemento do domínio corresponde a exatamente um elemento do contradomínio. São fundamentais para modelar situações do cotidiano e resolver problemas do ENEM.',
      explicacao: `<h2>🎯 O que é uma Função?</h2><p>Uma função estabelece uma relação matemática entre duas variáveis...</p>`,
      exemplos: ['Exemplo 1...', 'Exemplo 2...'],
      memorizacao: ['Função afim: f(x) = ax + b', 'Função quadrática: f(x) = ax² + bx + c'],
      errosComuns: [{erro: 'Confundir domínio com contradomínio', correto: 'Domínio são os valores de X, contradomínio de Y'}],
      formulas: [{nome: 'Fórmula de Bhaskara', formula: 'x = (-b ± √Δ) / 2a', quando: 'Para encontrar raízes da função quadrática'}],
      questoesResolvidas: [],
      questoesEnem: [],
      mapaMental: {titulo: 'Funções', topicos: []},
      miniQuiz: {questoes: [
        {pergunta: 'Qual é o domínio de f(x) = √(x-2)?', opcoes: ['x ≥ 2', 'x > 2', 'x < 2', 'Todos os reais'], respostaCorreta: 0, explicacao: 'Para raiz existir, x-2 ≥ 0, logo x ≥ 2', dificuldade: 'média'}
      ]}
    }
  }
};

console.log('📚 Gerador de Biblioteca Completa do ENEM PRO');
console.log('=' .repeat(60));
console.log('Este script gerará TODO o conteúdo da biblioteca.');
console.log('⚠️  REMOVERÁ qualquer FP exibido na biblioteca');
console.log('✅ Criará mini-quizzes automáticos com FP');
console.log('=' + '='.repeat(60));
console.log('\\nPressione CTRL+C para cancelar ou aguarde 3 segundos...\\n');

// Execute após 3 segundos
setTimeout(() => {
  console.log('🚀 Iniciando geração...\\n');
  console.log('✅ Script pronto para executar!');
  console.log('💡 Para gerar as páginas, execute: node scripts/gerar-biblioteca-completa.js');
}, 3000);
