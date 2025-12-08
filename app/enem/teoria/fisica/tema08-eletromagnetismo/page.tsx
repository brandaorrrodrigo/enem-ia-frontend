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
 * Tema 08 - Eletromagnetismo
 */
export default function Tema08EletromagnetismoPage() {
  return (
    <LousaLayout
      temaAtual="tema08-eletromagnetismo"
      titulo="🧲 Eletromagnetismo"
      badge="Tema 08"
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
        8. Eletromagnetismo
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
            O <strong style={{ color: '#ffd700' }}>eletromagnetismo</strong> estuda a relação
            entre eletricidade e magnetismo. No ENEM, aparece em questões sobre{' '}
            <strong style={{ color: '#87ceeb' }}>transformadores, geradores, motores elétricos</strong>{' '}
            e <strong style={{ color: '#98fb98' }}>indução eletromagnética</strong>.
          </p>
        </div>
      </motion.section>

      {/* Campo Magnético */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Campo Magnético">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Características:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Produzido por ímãs ou correntes elétricas</li>
                <li>Linhas de campo: saem do polo Norte, entram no polo Sul</li>
                <li>Unidade: Tesla (T)</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Regra da Mão Direita:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Polegar: corrente (i) | Dedos curvados: campo magnético (B)
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Usada para determinar a direção do campo ao redor de um fio
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Força Magnética */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Força Magnética">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Sobre carga em movimento:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                F = q · v · B · sen(θ)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                q = carga, v = velocidade, B = campo, θ = ângulo entre v e B
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Sobre condutor com corrente:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                F = B · i · L · sen(θ)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                i = corrente, L = comprimento do fio
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}>
                ⚠️ Força máxima quando θ = 90° (perpendiculares)
              </p>
              <p style={{ color: '#98fb98', marginTop: '0.5rem' }}>
                ⚠️ Força zero quando θ = 0° ou 180° (paralelos)
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Indução Eletromagnética */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Indução Eletromagnética - MUITO IMPORTANTE!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
                Variação do fluxo magnético através de uma espira gera uma corrente elétrica
                induzida. Este é o princípio de funcionamento dos geradores!
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Lei de Faraday:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                ε = -N · ΔΦ/Δt
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                ε = fem induzida, N = número de espiras, Φ = fluxo magnético
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Fluxo Magnético:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>
                Φ = B · A · cos(θ)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                B = campo, A = área, θ = ângulo entre B e a normal à área
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Transformadores */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Transformadores">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
                Aumentam ou diminuem a tensão elétrica. Funcionam apenas com corrente alternada (CA).
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Relação de Transformação:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                U₁/U₂ = N₁/N₂ = i₂/i₁
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Elevador:</strong></p>
                <p style={{ color: '#f5f5dc' }}>N₂ {'>'} N₁</p>
                <p style={{ color: '#f5f5dc' }}>Aumenta tensão, diminui corrente</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Abaixador:</strong></p>
                <p style={{ color: '#f5f5dc' }}>N₂ {'<'} N₁</p>
                <p style={{ color: '#f5f5dc' }}>Diminui tensão, aumenta corrente</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Transformador">
          <p style={{ marginBottom: '1rem' }}>
            Um transformador tem 200 espiras no primário e 1000 espiras no secundário.
            Se a tensão de entrada é <strong style={{ color: '#ffd700' }}>120 V</strong>,
            qual é a tensão de saída?
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
              U₁/U₂ = N₁/N₂
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              120/U₂ = 200/1000 = 1/5
            </p>
            <p>
              U₂ = 120 × 5 = <strong style={{ color: '#ffd700' }}>600 V</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              É um transformador elevador (N₂ {'>'} N₁)
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Aplicações */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Aplicações no Cotidiano">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Geradores:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Convertem energia mecânica em elétrica (indução). Ex: usinas hidrelétricas
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Motores Elétricos:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Convertem energia elétrica em mecânica. Ex: ventiladores, liquidificadores
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Transmissão de Energia:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Transformadores elevam tensão para reduzir perdas nas linhas de transmissão
                (P = R·i², menor corrente = menor perda)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Carregadores sem fio:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Usam indução eletromagnética para transferir energia
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
          enunciado="Por que a energia elétrica é transmitida em alta tensão nas linhas de transmissão, sendo depois reduzida por transformadores antes de chegar às residências?"
          resolucao={[
            { texto: 'A potência transmitida é: P = U × i' },
            { texto: 'As perdas no fio são: P(perda) = R × i²' },
            { texto: 'Para transmitir mesma potência com maior tensão:', destaque: true },
            { texto: '→ A corrente é menor (i = P/U)' },
            { texto: '→ As perdas (R·i²) são menores' },
          ]}
          gabarito="Para reduzir as perdas por efeito Joule nos cabos"
          dica="Dobrar a tensão reduz a corrente pela metade e as perdas por Joule caem a 1/4 (pois depende de i²)."
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
            'Campo magnético: produzido por ímãs ou correntes',
            'Força magnética: F = qvB·sen(θ) ou F = BiL·sen(θ)',
            'Indução: variação de fluxo gera corrente (Lei de Faraday)',
            'Transformadores: U₁/U₂ = N₁/N₂ (só funciona com CA)',
            'Alta tensão na transmissão: reduz perdas por efeito Joule',
            'Gerador: mecânica → elétrica | Motor: elétrica → mecânica',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
