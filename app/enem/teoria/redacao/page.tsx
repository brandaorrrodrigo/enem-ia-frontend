'use client';

import React from 'react';
import Link from 'next/link';
import FloatingBackButton from '@/components/FloatingBackButton';
import {motion } from 'framer-motion';
import {
  FaPen, FaLightbulb, FaBook, FaLink, FaExclamationTriangle,
  FaFileAlt, FaCheckCircle, FaBrain, FaGraduationCap, FaTrophy
} from 'react-icons/fa';

const temasRedacao = [
  {
    id: 'tema01-estrutura',
    numero: '01',
    titulo: 'Estrutura da Dissertação',
    descricao: 'Introdução, desenvolvimento e conclusão',
    icon: FaFileAlt,
    cor: '#ffd700',
  },
  {
    id: 'tema02-competencias',
    numero: '02',
    titulo: 'As 5 Competências do ENEM',
    descricao: 'Entenda os critérios de avaliação',
    icon: FaCheckCircle,
    cor: '#87ceeb',
  },
  {
    id: 'tema03-introducao',
    numero: '03',
    titulo: 'Modelos de Introdução',
    descricao: 'Técnicas para começar bem sua redação',
    icon: FaLightbulb,
    cor: '#98fb98',
  },
  {
    id: 'tema04-desenvolvimento',
    numero: '04',
    titulo: 'Desenvolvimento Argumentativo',
    descricao: 'Como construir argumentos sólidos',
    icon: FaBrain,
    cor: '#ff6b6b',
  },
  {
    id: 'tema05-repertorios',
    numero: '05',
    titulo: 'Repertório Sociocultural',
    descricao: 'Citações, dados e referências',
    icon: FaBook,
    cor: '#dda0dd',
  },
  {
    id: 'tema06-conectivos',
    numero: '06',
    titulo: 'Conectivos e Coesão',
    descricao: 'Ligando ideias com fluidez',
    icon: FaLink,
    cor: '#ffa500',
  },
  {
    id: 'tema07-proposta',
    numero: '07',
    titulo: 'Proposta de Intervenção',
    descricao: 'Os 5 elementos obrigatórios',
    icon: FaGraduationCap,
    cor: '#20b2aa',
  },
  {
    id: 'tema08-erros-zeram',
    numero: '08',
    titulo: 'Erros que Zeram a Redação',
    descricao: 'O que evitar a todo custo',
    icon: FaExclamationTriangle,
    cor: '#dc143c',
  },
  {
    id: 'tema09-norma-culta',
    numero: '09',
    titulo: 'Norma Culta e Gramática',
    descricao: 'Pontuação, concordância e ortografia',
    icon: FaPen,
    cor: '#4169e1',
  },
  {
    id: 'tema10-temas-frequentes',
    numero: '10',
    titulo: 'Temas Frequentes do ENEM',
    descricao: 'Análise de provas anteriores',
    icon: FaTrophy,
    cor: '#32cd32',
  },
];

export default function RedacaoTeoriaPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem',
    }}>
      <FloatingBackButton />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#ffd700',
            fontSize: '3rem',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            marginBottom: '1rem',
          }}>
            Teoria de Redação ENEM
          </h1>
          <p style={{
            color: '#f5f5dc',
            fontSize: '1.2rem',
            fontFamily: "'Poppins', sans-serif",
          }}>
            Domine a arte da dissertação argumentativa e conquiste os 1000 pontos!
          </p>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
          }}>
            <p style={{ color: '#98fb98', fontSize: '0.95rem' }}>
              10 temas essenciais para dominar a redação do ENEM
            </p>
          </div>
        </motion.div>

        {/* Grid de Temas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {temasRedacao.map((tema, index) => (
            <motion.div
              key={tema.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/enem/teoria/redacao/${tema.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `2px solid ${tema.cor}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = tema.cor;
                  e.currentTarget.style.boxShadow = `0 10px 30px ${tema.cor}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${tema.cor}40`;
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${tema.cor}40, ${tema.cor}20)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <tema.icon style={{ color: tema.cor, fontSize: '1.5rem' }} />
                    </div>
                    <span style={{
                      color: tema.cor,
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      background: `${tema.cor}20`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                    }}>
                      Tema {tema.numero}
                    </span>
                  </div>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                    {tema.titulo}
                  </h3>
                  <p style={{
                    color: '#aaa',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    {tema.descricao}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>
            Dica do Professor
          </h3>
          <p style={{ color: '#f5f5dc', fontSize: '1rem', lineHeight: 1.8 }}>
            A redação vale <strong style={{ color: '#ff6b6b' }}>1000 pontos</strong> - o mesmo peso de uma área inteira!
            Estudar teoria de redação é o investimento com <strong style={{ color: '#98fb98' }}>maior retorno</strong> no ENEM.
            Comece pela estrutura básica, entenda as competências, e pratique muito!
          </p>
        </motion.div>

        {/* Voltar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}
        >
          <Link href="/enem/teoria" style={{
            color: '#87ceeb',
            textDecoration: 'none',
            fontSize: '1rem',
          }}>
            Voltar para Teoria
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
