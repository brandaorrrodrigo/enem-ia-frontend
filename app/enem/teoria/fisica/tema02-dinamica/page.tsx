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
 * Tema 02 - Dinâmica e Forças
 */
export default function Tema02DinamicaPage() {
  return (
    <LousaLayout
      temaAtual="tema02-dinamica"
      titulo="💪 Dinâmica e Forças"
      badge="Tema 02"
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
        2. Dinâmica e Forças
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
            A <strong style={{ color: '#ffd700' }}>dinâmica</strong> estuda as causas do movimento,
            ou seja, as forças. No ENEM, as <strong style={{ color: '#87ceeb' }}>Leis de Newton</strong>{' '}
            são aplicadas em situações do cotidiano como elevadores, carros freando, objetos em
            planos inclinados e sistemas com polias.
          </p>
        </div>
      </motion.section>

      {/* As Três Leis de Newton */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="As Três Leis de Newton">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                <strong>1ª Lei – Inércia:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento
                tende a continuar em movimento retilíneo uniforme, a menos que uma força
                resultante atue sobre ele.
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Ex: Passageiro "jogado para frente" quando o ônibus freia.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                <strong>2ª Lei – Princípio Fundamental:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                A força resultante é igual ao produto da massa pela aceleração.
              </p>
              <p style={{ color: '#98fb98', fontSize: '1.2rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                F = m · a
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                <strong>3ª Lei – Ação e Reação:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Para toda força de ação existe uma força de reação, de mesmo módulo,
                mesma direção e sentido oposto, aplicadas em corpos diferentes.
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Ex: Ao empurrar a parede, a parede empurra você de volta.
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
                <strong>Força Peso:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                P = m · g &nbsp;&nbsp;(g ≈ 10 m/s²)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Força de Atrito:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Fat = μ · N
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                (μ = coeficiente de atrito, N = força normal)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Força Elástica (Lei de Hooke):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Fel = k · x
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                (k = constante elástica, x = deformação)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Plano Inclinado:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                Px = P · sen(θ) &nbsp;&nbsp;|&nbsp;&nbsp; Py = P · cos(θ)
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Aplicação da 2ª Lei de Newton">
          <p style={{ marginBottom: '1rem' }}>
            Um bloco de <strong style={{ color: '#ffd700' }}>5 kg</strong> é puxado sobre uma
            superfície lisa (sem atrito) por uma força de <strong style={{ color: '#ffd700' }}>20 N</strong>.
            Qual é a aceleração do bloco?
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
              Usando F = m · a:
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              20 = 5 · a → a = 20/5
            </p>
            <p>
              a = <strong style={{ color: '#ffd700' }}>4 m/s²</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 - Elevador */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Pessoa no Elevador">
          <p style={{ marginBottom: '1rem' }}>
            Uma pessoa de <strong style={{ color: '#ffd700' }}>60 kg</strong> está em um elevador
            que sobe com aceleração de <strong style={{ color: '#ffd700' }}>2 m/s²</strong>.
            Qual é a força que o piso exerce sobre a pessoa? (g = 10 m/s²)
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
              Forças na pessoa: Normal (N) para cima, Peso (P) para baixo
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Como sobe acelerando: N - P = m · a
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              N - 600 = 60 · 2 → N = 120 + 600
            </p>
            <p>
              N = <strong style={{ color: '#ffd700' }}>720 N</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '1rem' }}>
              💡 Elevador subindo acelerado: pessoa se sente "mais pesada"
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Força de Atrito */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Força de Atrito - Muito Cobrado!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Atrito Estático (μe):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Impede o início do movimento. É o atrito máximo antes de começar a mover.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Atrito Cinético (μc):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Atua durante o movimento. Geralmente μc {'<'} μe.
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginTop: '0.5rem' }}>
                ⚠️ O atrito NÃO depende da área de contato, apenas de μ e N!
              </p>
            </div>
          </div>
        </CaixaProfessor>
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
          enunciado="Um bloco de 10 kg está sobre uma superfície horizontal com coeficiente de atrito cinético μ = 0,3. Uma força horizontal de 50 N é aplicada ao bloco. Qual é a aceleração do bloco? (g = 10 m/s²)"
          resolucao={[
            { texto: 'Peso: P = 10 × 10 = 100 N' },
            { texto: 'Normal: N = P = 100 N (superfície horizontal)' },
            { texto: 'Atrito: Fat = μ × N = 0,3 × 100 = 30 N', destaque: true },
            { texto: 'Força resultante: FR = 50 - 30 = 20 N' },
            { texto: 'Aceleração: a = FR/m = 20/10 = 2 m/s²' },
          ]}
          gabarito="2 m/s²"
          dica="Sempre calcule o atrito primeiro! Fat = μ · N, onde N geralmente é igual ao peso em superfícies horizontais."
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
            '1ª Lei (Inércia): Sem força resultante, o corpo mantém seu estado',
            '2ª Lei: F = m·a (a força resultante causa aceleração)',
            '3ª Lei: Ação e reação em corpos diferentes, mesma intensidade',
            'Peso: P = m·g (sempre aponta para baixo)',
            'Atrito: Fat = μ·N (não depende da área de contato)',
            'Elevador subindo acelerado: Normal > Peso (sensação de "mais pesado")',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
