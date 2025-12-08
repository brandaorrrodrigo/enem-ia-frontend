'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LousaLayout from '@/components/teoria/LousaLayout';
import QuestaoInterativa, {
  CaixaExemplo,
  CaixaFormula,
  CaixaResumo,
  CaixaProfessor,
} from '@/components/teoria/QuestaoInterativa';

/**
 * Tema 01 - Atomística
 */
export default function Tema01AtomisticaPage() {
  return (
    <LousaLayout
      temaAtual="tema01-atomistica"
      titulo="⚛️ Atomística"
      badge="Tema 01"
    >
      {/* Título do Tema */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Patrick Hand', cursive",
          color: '#ffd700',
          fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)',
          marginBottom: '1.5rem',
        }}
      >
        1. Atomística
      </motion.h1>

      {/* Visão Geral */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#87ceeb',
            fontSize: '1.8rem',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
            marginBottom: '1rem',
          }}
        >
          Visão Geral
        </h2>

        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#f5f5dc',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}
        >
          <p>
            A <strong style={{ color: '#ffd700' }}>atomística</strong> estuda a estrutura do átomo.
            No ENEM, aparecem questões sobre <strong style={{ color: '#87ceeb' }}>modelos atômicos,
            número atômico, número de massa</strong> e <strong style={{ color: '#98fb98' }}>distribuição
            eletrônica</strong>.
          </p>
        </div>
      </motion.section>

      {/* Modelos Atômicos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Evolução dos Modelos Atômicos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Dalton (1803) - "Bola de Bilhar":</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Átomo indivisível, maciço e esférico. Diferentes elementos = diferentes átomos.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Thomson (1897) - "Pudim de Passas":</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Descobriu o elétron. Esfera positiva com elétrons negativos incrustados.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Rutherford (1911) - "Sistema Solar":</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Núcleo pequeno e denso (positivo) com elétrons orbitando ao redor.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Bohr (1913) - "Órbitas Quantizadas":</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Elétrons em órbitas definidas (camadas K, L, M...). Saltos quânticos.
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Estrutura do Átomo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Estrutura do Átomo">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ffd700' }}><strong>Próton (p⁺)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Carga: +1</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Massa: 1 u</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>No núcleo</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#98fb98' }}><strong>Nêutron (n⁰)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Carga: 0</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Massa: 1 u</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>No núcleo</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#87ceeb' }}><strong>Elétron (e⁻)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Carga: -1</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Massa: ~0</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Na eletrosfera</p>
              </div>
            </div>
            <div>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace', textAlign: 'center' }}>
                Z = nº de prótons (número atômico)
              </p>
              <p style={{ color: '#98fb98', fontSize: '1.2rem', fontFamily: 'monospace', textAlign: 'center' }}>
                A = p + n (número de massa)
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Isótopos, Isóbaros e Isótonos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Isótopos, Isóbaros e Isótonos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Isótopos:</strong> Mesmo Z, diferente A
              </p>
              <p style={{ color: '#f5f5dc' }}>
                São o mesmo elemento! Ex: ¹H, ²H (deutério), ³H (trítio)
              </p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                <strong>Isóbaros:</strong> Mesmo A, diferente Z
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Elementos diferentes, mesma massa. Ex: ⁴⁰Ca e ⁴⁰Ar
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Isótonos:</strong> Mesmo nº de nêutrons
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Elementos diferentes, mesmo n. Ex: ¹³C (6p, 7n) e ¹⁴N (7p, 7n)
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Determinando Partículas">
          <p style={{ marginBottom: '1rem' }}>
            O átomo de <strong style={{ color: '#ffd700' }}>²³₁₁Na</strong> possui quantos
            prótons, nêutrons e elétrons?
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
              <strong>Resolução:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Z = 11 (número atômico) → <strong style={{ color: '#ffd700' }}>11 prótons</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              A = 23 (número de massa) → n = A - Z = 23 - 11 = <strong style={{ color: '#ffd700' }}>12 nêutrons</strong>
            </p>
            <p>
              Átomo neutro: e⁻ = p⁺ → <strong style={{ color: '#ffd700' }}>11 elétrons</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Distribuição Eletrônica */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Distribuição Eletrônica (Diagrama de Linus Pauling)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', fontFamily: 'monospace', fontSize: '1rem' }}>
                1s² → 2s² 2p⁶ → 3s² 3p⁶ → 4s² 3d¹⁰ 4p⁶ → 5s² 4d¹⁰ 5p⁶ → 6s² 4f¹⁴ 5d¹⁰ 6p⁶ → 7s² ...
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Capacidade das camadas:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                K: 2 | L: 8 | M: 18 | N: 32 | O: 32 | P: 18 | Q: 8
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Capacidade dos subníveis:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                s: 2 | p: 6 | d: 10 | f: 14
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Exemplo 2 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Distribuição Eletrônica">
          <p style={{ marginBottom: '1rem' }}>
            Faça a distribuição eletrônica do <strong style={{ color: '#ffd700' }}>Fe (Z = 26)</strong>.
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
              <strong>Resolução:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem', fontFamily: 'monospace' }}>
              1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Total: 2+2+6+2+6+2+6 = 26 elétrons ✓
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              💡 Camada de valência: 4s² (2 elétrons na última camada)
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Questão Estilo ENEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2rem' }}
      >
        <h2
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#87ceeb',
            fontSize: '1.8rem',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
            marginBottom: '1rem',
          }}
        >
          Questão Estilo ENEM
        </h2>

        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM (Original)"
          enunciado="O carbono-14 é usado na datação de fósseis. Sabendo que o carbono-14 tem 6 prótons e número de massa 14, quantos nêutrons ele possui? E quantos nêutrons a mais que o carbono-12?"
          resolucao={[
            { texto: 'Z = 6 (prótons), A = 14 (massa)' },
            { texto: 'n = A - Z = 14 - 6 = 8 nêutrons', destaque: true },
            { texto: 'Carbono-12: n = 12 - 6 = 6 nêutrons' },
            { texto: 'Diferença: 8 - 6 = 2 nêutrons a mais' },
          ]}
          gabarito="8 nêutrons; 2 a mais que o C-12"
          dica="Isótopos têm o mesmo número de prótons (mesmo elemento), mas diferente número de nêutrons."
        />
      </motion.section>

      {/* Resumo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Z = nº atômico = nº de prótons (define o elemento)',
            'A = nº de massa = prótons + nêutrons',
            'Átomo neutro: nº elétrons = nº prótons',
            'Isótopos: mesmo Z, diferente A (mesmo elemento)',
            'Distribuição eletrônica: seguir diagrama de Linus Pauling',
            'Camada de valência: última camada com elétrons',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
