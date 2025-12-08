'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingBackButton from '@/components/FloatingBackButton';

const temasBiologia = [
  { id: 'tema01-citologia', titulo: '🔬 Citologia', descricao: 'Células, organelas e membranas' },
  { id: 'tema02-metabolismo', titulo: '⚡ Metabolismo Energético', descricao: 'Fotossíntese, respiração e fermentação' },
  { id: 'tema03-genetica', titulo: '🧬 Genética', descricao: 'Leis de Mendel, herança e DNA' },
  { id: 'tema04-evolucao', titulo: '🦎 Evolução', descricao: 'Darwin, seleção natural e especiação' },
  { id: 'tema05-ecologia', titulo: '🌍 Ecologia', descricao: 'Ecossistemas, cadeias e ciclos' },
  { id: 'tema06-fisiologia-humana', titulo: '❤️ Fisiologia Humana', descricao: 'Sistemas do corpo humano' },
  { id: 'tema07-botanica', titulo: '🌱 Botânica', descricao: 'Plantas, fotossíntese e reprodução' },
  { id: 'tema08-zoologia', titulo: '🦋 Zoologia', descricao: 'Animais vertebrados e invertebrados' },
  { id: 'tema09-microbiologia', titulo: '🦠 Microbiologia', descricao: 'Vírus, bactérias, fungos e protozoários' },
  { id: 'tema10-biotecnologia', titulo: '🧪 Biotecnologia', descricao: 'DNA recombinante, transgênicos e ética' },
];

export default function BiologiaTeoriaPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem',
    }}>
      <FloatingBackButton />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '3rem',
            color: '#4ade80',
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
            marginBottom: '0.5rem',
          }}>
            🧬 Biologia
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#a5b4fc',
            fontSize: '1.2rem',
          }}>
            10 temas essenciais para o ENEM
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {temasBiologia.map((tema, index) => (
            <motion.div
              key={tema.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/enem/teoria/biologia/${tema.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}>
                  <h3 style={{
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: '1.4rem',
                    color: '#4ade80',
                    marginBottom: '0.5rem',
                  }}>
                    {tema.titulo}
                  </h3>
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                  }}>
                    {tema.descricao}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <Link href="/enem/teoria" style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '1rem',
          }}>
            ← Voltar para Teoria
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
