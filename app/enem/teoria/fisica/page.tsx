'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LousaLayout from '@/components/teoria/LousaLayout';

/**
 * Lista de temas de Física - Volume 1
 */
const temasFisica = [
  { numero: '01', titulo: 'Cinemática', slug: 'tema01-cinematica', icone: '🚗' },
  { numero: '02', titulo: 'Dinâmica e Forças', slug: 'tema02-dinamica', icone: '💪' },
  { numero: '03', titulo: 'Energia e Trabalho', slug: 'tema03-energia', icone: '⚡' },
  { numero: '04', titulo: 'Termologia', slug: 'tema04-termologia', icone: '🌡️' },
  { numero: '05', titulo: 'Ondas e Acústica', slug: 'tema05-ondas', icone: '🌊' },
  { numero: '06', titulo: 'Óptica', slug: 'tema06-optica', icone: '🔦' },
  { numero: '07', titulo: 'Eletricidade', slug: 'tema07-eletricidade', icone: '🔌' },
  { numero: '08', titulo: 'Eletromagnetismo', slug: 'tema08-eletromagnetismo', icone: '🧲' },
  { numero: '09', titulo: 'Hidrostática', slug: 'tema09-hidrostatica', icone: '💧' },
  { numero: '10', titulo: 'Física Moderna', slug: 'tema10-fisica-moderna', icone: '⚛️' },
];

/**
 * Página índice - Física Base Teórica ENEM PRO Volume 1
 */
export default function FisicaIndicePage() {
  return (
    <LousaLayout titulo="⚛️ Física ENEM PRO" badge="Base Teórica – Volume 1">
      {/* Título Principal */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Patrick Hand', cursive",
          color: '#ffd700',
          fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Física – Base Teórica
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Patrick Hand', cursive",
          color: '#87ceeb',
          fontSize: '1.5rem',
          textAlign: 'center',
          marginBottom: '2rem',
          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        ENEM PRO – Volume 1
      </motion.h2>

      {/* Introdução */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderLeft: '4px solid #ffd700',
          borderRadius: '0 8px 8px 0',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#f5f5dc',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          Bem-vindo à <strong style={{ color: '#ffd700' }}>Base Teórica de Física</strong> do ENEM PRO!
          Este volume contém os <strong style={{ color: '#87ceeb' }}>10 temas mais cobrados</strong> no ENEM,
          com foco em <strong style={{ color: '#98fb98' }}>interpretação de fenômenos do cotidiano</strong>,
          análise de gráficos e aplicação de fórmulas em contextos reais.
        </p>
      </motion.div>

      {/* Grid de Temas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {temasFisica.map((tema, index) => (
          <motion.div
            key={tema.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link href={`/enem/teoria/fisica/${tema.slug}`}>
              <motion.div
                whileHover={{
                  y: -4,
                  borderColor: '#ffd700',
                  boxShadow: '0 8px 24px rgba(255, 215, 0, 0.2)',
                }}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
              >
                {/* Número do tema */}
                <div
                  style={{
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: '2.5rem',
                    color: '#ffd700',
                    opacity: 0.6,
                    marginBottom: '0.5rem',
                  }}
                >
                  {tema.numero}
                </div>

                {/* Ícone e título */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{tema.icone}</span>
                  <h3
                    style={{
                      fontFamily: "'Patrick Hand', cursive",
                      fontSize: '1.3rem',
                      color: '#f5f5dc',
                      margin: 0,
                    }}
                  >
                    {tema.titulo}
                  </h3>
                </div>

                {/* Descrição */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {getDescricaoTema(tema.slug)}
                </p>

                {/* Badge de acesso */}
                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(37, 99, 235, 0.3)',
                      color: '#87ceeb',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Acessar →
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Rodapé informativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
          border: '2px solid #98fb98',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#98fb98',
            fontSize: '1.2rem',
            margin: 0,
          }}
        >
          💡 Dica: No ENEM, a Física é contextualizada! Foque em entender os fenômenos do cotidiano.
        </p>
      </motion.div>
    </LousaLayout>
  );
}

/**
 * Retorna a descrição resumida de cada tema
 */
function getDescricaoTema(slug: string): string {
  const descricoes: Record<string, string> = {
    'tema01-cinematica': 'MRU, MRUV, gráficos de movimento, velocidade média e queda livre.',
    'tema02-dinamica': 'Leis de Newton, força de atrito, plano inclinado e aplicações.',
    'tema03-energia': 'Trabalho, potência, energia cinética, potencial e conservação.',
    'tema04-termologia': 'Temperatura, calor, dilatação, calorimetria e mudanças de fase.',
    'tema05-ondas': 'Características das ondas, som, fenômenos ondulatórios e acústica.',
    'tema06-optica': 'Reflexão, refração, espelhos, lentes e instrumentos ópticos.',
    'tema07-eletricidade': 'Corrente elétrica, resistência, potência, circuitos e consumo.',
    'tema08-eletromagnetismo': 'Campo magnético, indução, transformadores e aplicações.',
    'tema09-hidrostatica': 'Pressão, empuxo, princípio de Pascal e Arquimedes.',
    'tema10-fisica-moderna': 'Efeito fotoelétrico, radioatividade, energia nuclear e relatividade.',
  };
  return descricoes[slug] || 'Conteúdo completo com teoria e questões resolvidas.';
}

export { temasFisica };
