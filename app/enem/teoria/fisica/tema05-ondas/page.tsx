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
 * Tema 05 - Ondas e Acústica
 */
export default function Tema05OndasPage() {
  return (
    <LousaLayout
      temaAtual="tema05-ondas"
      titulo="🌊 Ondas e Acústica"
      badge="Tema 05"
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
        5. Ondas e Acústica
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
            <strong style={{ color: '#ffd700' }}>Ondas</strong> são perturbações que transportam
            energia sem transportar matéria. No ENEM, aparecem questões sobre{' '}
            <strong style={{ color: '#87ceeb' }}>som, música, ultrassom, efeito Doppler</strong> e
            fenômenos como <strong style={{ color: '#98fb98' }}>reflexão, refração e ressonância</strong>.
          </p>
        </div>
      </motion.section>

      {/* Classificação das Ondas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Classificação das Ondas">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Quanto à natureza:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong>Mecânicas:</strong> precisam de meio material (som, ondas na água)</li>
                <li><strong>Eletromagnéticas:</strong> não precisam de meio (luz, raio-X, micro-ondas)</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Quanto à direção de vibração:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong>Transversais:</strong> vibração perpendicular à propagação (luz, corda)</li>
                <li><strong>Longitudinais:</strong> vibração paralela à propagação (som)</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Quanto à dimensão:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong>Unidimensionais:</strong> corda</li>
                <li><strong>Bidimensionais:</strong> ondas na água</li>
                <li><strong>Tridimensionais:</strong> som, luz</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Grandezas Ondulatórias */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Grandezas Ondulatórias">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Equação Fundamental:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.5rem', fontFamily: 'monospace' }}>
                v = λ · f
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                v = velocidade, λ = comprimento de onda, f = frequência
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Período e Frequência:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                T = 1/f &nbsp;&nbsp;ou&nbsp;&nbsp; f = 1/T
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                T em segundos, f em Hertz (Hz)
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc' }}>
                <strong>Amplitude (A):</strong> altura máxima da onda (relacionada à intensidade)
              </p>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem' }}>
                <strong>Comprimento de onda (λ):</strong> distância entre dois pontos equivalentes
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Som */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="O Som - Muito Cobrado!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Características:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Onda mecânica longitudinal</li>
                <li>Precisa de meio material para se propagar</li>
                <li>Não se propaga no vácuo!</li>
                <li>Velocidade no ar: ~340 m/s (20°C)</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Qualidades fisiológicas do som:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong>Altura:</strong> grave ou agudo (depende da frequência)</li>
                <li><strong>Intensidade:</strong> forte ou fraco (depende da amplitude)</li>
                <li><strong>Timbre:</strong> diferencia instrumentos/vozes (forma da onda)</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}>
                <strong>Faixa audível humana:</strong> 20 Hz a 20.000 Hz
              </p>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem' }}>
                Infrassom: {'<'} 20 Hz | Ultrassom: {'>'} 20.000 Hz
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
        <CaixaExemplo numero={1} titulo="Equação Fundamental">
          <p style={{ marginBottom: '1rem' }}>
            Uma onda sonora tem frequência de <strong style={{ color: '#ffd700' }}>680 Hz</strong>.
            Se a velocidade do som no ar é <strong style={{ color: '#ffd700' }}>340 m/s</strong>,
            qual é o comprimento de onda?
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
              v = λ · f → λ = v/f
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              λ = 340/680
            </p>
            <p>
              λ = <strong style={{ color: '#ffd700' }}>0,5 m = 50 cm</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Fenômenos Ondulatórios */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Fenômenos Ondulatórios">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Reflexão:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Onda volta ao meio de origem. Ex: eco</p>
            </div>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Refração:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Onda muda de meio e altera velocidade/direção</p>
            </div>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Difração:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Onda contorna obstáculos. Ex: ouvir som atrás da parede</p>
            </div>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Interferência:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Superposição de ondas (construtiva ou destrutiva)</p>
            </div>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Ressonância:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Amplificação quando frequências coincidem. Ex: taça de cristal</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Efeito Doppler */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={2} titulo="Efeito Doppler">
          <p style={{ marginBottom: '1rem' }}>
            É a alteração da frequência percebida quando há movimento relativo entre fonte e observador.
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
              <strong>Fonte se aproximando:</strong>
            </p>
            <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
              Frequência aumenta → som mais AGUDO 🚑➡️👂
            </p>
            <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
              <strong>Fonte se afastando:</strong>
            </p>
            <p style={{ color: '#f5f5dc' }}>
              Frequência diminui → som mais GRAVE 🚑⬅️👂
            </p>
            <p style={{ color: '#98fb98', fontSize: '0.9rem', marginTop: '1rem' }}>
              💡 Aplicações: radar de velocidade, ultrassom médico, astronomia
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
          enunciado="Em um show, uma banda produz um som com frequência de 440 Hz (nota Lá). Se a velocidade do som no ar é 340 m/s, a que distância mínima uma pessoa deve estar de uma parede para ouvir o eco distintamente? (Tempo mínimo para distinguir sons: 0,1 s)"
          resolucao={[
            { texto: 'Para ouvir o eco, o som vai até a parede e volta' },
            { texto: 'Distância total percorrida: d = v × t = 340 × 0,1 = 34 m' },
            { texto: 'Essa é a distância de ida + volta', destaque: true },
            { texto: 'Distância até a parede: 34/2 = 17 m' },
          ]}
          gabarito="17 metros"
          dica="No eco, o som percorre a distância duas vezes (ida e volta). Divida por 2 para achar a distância até o obstáculo."
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
            'Equação fundamental: v = λ · f',
            'Som: onda mecânica longitudinal (não propaga no vácuo)',
            'Altura (grave/agudo) → frequência | Intensidade (forte/fraco) → amplitude',
            'Faixa audível: 20 Hz a 20.000 Hz',
            'Efeito Doppler: aproximação → frequência maior (agudo)',
            'Eco: som precisa percorrer ida e volta até o obstáculo',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
