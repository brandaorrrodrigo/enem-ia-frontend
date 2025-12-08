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
 * Tema 09 - Hidrostática
 */
export default function Tema09HidrostaticaPage() {
  return (
    <LousaLayout
      temaAtual="tema09-hidrostatica"
      titulo="💧 Hidrostática"
      badge="Tema 09"
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
        9. Hidrostática
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
            A <strong style={{ color: '#ffd700' }}>hidrostática</strong> estuda os fluidos em
            repouso. No ENEM, aparece em questões sobre <strong style={{ color: '#87ceeb' }}>
            pressão, empuxo, densidade</strong> e aplicações como{' '}
            <strong style={{ color: '#98fb98' }}>submarinos, barragens e elevadores hidráulicos</strong>.
          </p>
        </div>
      </motion.section>

      {/* Conceitos Básicos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Conceitos Fundamentais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Densidade (ρ):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Massa por unidade de volume: ρ = m/V
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Água: ρ = 1.000 kg/m³ = 1 g/cm³
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Pressão (p):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Força por unidade de área: p = F/A
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Unidade: Pascal (Pa) = N/m²
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Fórmulas Principais */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Fórmulas Essenciais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Pressão Hidrostática:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                p = ρ · g · h
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                ρ = densidade do líquido, h = profundidade
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Pressão Total (com atmosfera):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                p(total) = p(atm) + ρ · g · h
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                p(atm) ≈ 10⁵ Pa = 1 atm
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Empuxo (Princípio de Arquimedes):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                E = ρ(líquido) · V(imerso) · g
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                "Peso do líquido deslocado"
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Princípio de Pascal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Princípio de Pascal">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
                "Uma variação de pressão aplicada a um fluido incompressível é transmitida
                integralmente a todos os pontos do fluido."
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Elevador Hidráulico:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                F₁/A₁ = F₂/A₂
              </p>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                A pressão é igual nos dois lados. Área maior = força maior!
              </p>
            </div>
            <p style={{ color: '#87ceeb' }}>
              💡 Aplicações: freios hidráulicos, prensas, elevadores de carro
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Empuxo e Flutuação */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Empuxo e Flutuação">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              O <strong style={{ color: '#ffd700' }}>empuxo</strong> é a força vertical para cima
              que o fluido exerce sobre um corpo nele imerso.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ffd700' }}><strong>ρ(corpo) {'<'} ρ(líq)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>FLUTUA</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: madeira na água</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#98fb98' }}><strong>ρ(corpo) = ρ(líq)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>EQUILÍBRIO</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: submarino</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ff6b6b' }}><strong>ρ(corpo) {'>'} ρ(líq)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>AFUNDA</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: ferro na água</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Pressão Hidrostática">
          <p style={{ marginBottom: '1rem' }}>
            Um mergulhador está a <strong style={{ color: '#ffd700' }}>20 m</strong> de profundidade
            no mar. Qual a pressão total sobre ele?
            (ρ água do mar = 1.025 kg/m³, g = 10 m/s², p(atm) = 10⁵ Pa)
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
              p(hidrostática) = ρ · g · h = 1.025 × 10 × 20 = 205.000 Pa
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              p(total) = p(atm) + p(hidrostática)
            </p>
            <p>
              p(total) = 100.000 + 205.000 = <strong style={{ color: '#ffd700' }}>305.000 Pa ≈ 3 atm</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Elevador Hidráulico">
          <p style={{ marginBottom: '1rem' }}>
            Um elevador hidráulico tem êmbolos de áreas <strong style={{ color: '#ffd700' }}>10 cm²</strong>{' '}
            e <strong style={{ color: '#ffd700' }}>500 cm²</strong>. Que força no êmbolo menor levanta
            um carro de 10.000 N?
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
              F₁/A₁ = F₂/A₂
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              F₁/10 = 10.000/500
            </p>
            <p>
              F₁ = 10 × 20 = <strong style={{ color: '#ffd700' }}>200 N</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Uma força de apenas 200 N levanta 10.000 N! (multiplicação de força)
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
          enunciado="Um bloco de madeira flutua na água com 60% de seu volume submerso. Qual é a densidade da madeira? (ρ água = 1.000 kg/m³)"
          resolucao={[
            { texto: 'Na flutuação: Empuxo = Peso' },
            { texto: 'ρ(água) · V(sub) · g = ρ(madeira) · V(total) · g' },
            { texto: 'V(sub) = 0,6 · V(total)', destaque: true },
            { texto: '1000 × 0,6 × V = ρ(madeira) × V' },
            { texto: 'ρ(madeira) = 600 kg/m³' },
          ]}
          gabarito="600 kg/m³"
          dica="Na flutuação, a fração submersa é igual à razão das densidades: V(sub)/V(total) = ρ(corpo)/ρ(líquido)"
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
            'Densidade: ρ = m/V (água = 1000 kg/m³)',
            'Pressão hidrostática: p = ρ·g·h',
            'Empuxo (Arquimedes): E = ρ(líq)·V(sub)·g',
            'Flutuação: ρ(corpo) < ρ(líquido)',
            'Pascal: pressão transmitida integralmente → F₁/A₁ = F₂/A₂',
            'A cada 10m de profundidade: +1 atm de pressão',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
