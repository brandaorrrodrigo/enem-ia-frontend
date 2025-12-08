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
 * Tema 10 - Física Moderna
 */
export default function Tema10FisicaModernaPage() {
  return (
    <LousaLayout
      temaAtual="tema10-fisica-moderna"
      titulo="⚛️ Física Moderna"
      badge="Tema 10"
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
        10. Física Moderna
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
            A <strong style={{ color: '#ffd700' }}>Física Moderna</strong> revolucionou nossa
            compreensão do universo no século XX. No ENEM, aparecem questões sobre{' '}
            <strong style={{ color: '#87ceeb' }}>efeito fotoelétrico, radioatividade, energia nuclear</strong>{' '}
            e noções de <strong style={{ color: '#98fb98' }}>relatividade</strong>.
          </p>
        </div>
      </motion.section>

      {/* Efeito Fotoelétrico */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Efeito Fotoelétrico">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
                Fenômeno onde a luz incidindo sobre um metal pode arrancar elétrons.
                Einstein explicou isso considerando a luz como partículas (fótons).
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Pontos-chave:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Depende da <strong>frequência</strong> da luz, não da intensidade</li>
                <li>Existe uma <strong>frequência mínima</strong> (frequência de corte)</li>
                <li>Aumentar intensidade = mais elétrons, não elétrons mais rápidos</li>
                <li>Aumentar frequência = elétrons mais energéticos</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#87ceeb' }}>
                💡 Aplicações: células fotovoltaicas, sensores de luz, fotômetros
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Fórmulas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Fórmulas Importantes">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Energia do Fóton:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                E = h · f = h · c/λ
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                h = constante de Planck ≈ 6,63 × 10⁻³⁴ J·s
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Equivalência Massa-Energia (Einstein):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.5rem', fontFamily: 'monospace' }}>
                E = m · c²
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                c = velocidade da luz ≈ 3 × 10⁸ m/s
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Radioatividade */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Radioatividade">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Emissão espontânea de radiação por núcleos instáveis.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Partícula α</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>2 prótons + 2 nêutrons</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Núcleo de hélio</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Baixa penetração</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Partícula β</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Elétron ou pósitron</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Emitida do núcleo</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Penetração média</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Radiação γ</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Onda eletromagnética</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Alta energia</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Alta penetração</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Meia-vida */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Meia-vida (t½)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
                Tempo necessário para metade dos átomos radioativos decairem.
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                N = N₀ · (1/2)^(t/t½)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                N = quantidade restante, N₀ = quantidade inicial
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Exemplo prático:</strong></p>
              <p style={{ color: '#f5f5dc' }}>
                Se t½ = 10 anos e t = 30 anos (3 meias-vidas):
              </p>
              <p style={{ color: '#98fb98' }}>
                N = N₀ × (1/2)³ = N₀ × 1/8 → Resta 12,5%
              </p>
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
        <CaixaExemplo numero={1} titulo="Meia-vida">
          <p style={{ marginBottom: '1rem' }}>
            Uma amostra radioativa tem meia-vida de <strong style={{ color: '#ffd700' }}>8 dias</strong>.
            Se inicialmente há <strong style={{ color: '#ffd700' }}>1600 g</strong>, quanto restará após 32 dias?
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
              Número de meias-vidas: 32/8 = 4
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Fração restante: (1/2)⁴ = 1/16
            </p>
            <p>
              Massa restante: 1600 × 1/16 = <strong style={{ color: '#ffd700' }}>100 g</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Ou: 1600 → 800 → 400 → 200 → 100 g (dividindo por 2 a cada meia-vida)
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Energia Nuclear */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Energia Nuclear">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                  <strong>Fissão Nuclear:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Núcleo pesado se divide em núcleos menores.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Ex: Urânio em usinas nucleares e bombas
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                  <strong>Fusão Nuclear:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Núcleos leves se unem formando um núcleo maior.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Ex: Sol e outras estrelas (H → He)
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc' }}>
                Em ambos os processos, uma pequena quantidade de massa é convertida
                em uma enorme quantidade de energia: <strong style={{ color: '#ffd700' }}>E = mc²</strong>
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
          enunciado="No efeito fotoelétrico, luz ultravioleta incide sobre uma placa de metal e elétrons são ejetados. Se aumentarmos a INTENSIDADE da luz (mantendo a mesma frequência), o que acontece?"
          resolucao={[
            { texto: 'A energia de cada fóton depende apenas da frequência: E = hf' },
            { texto: 'Aumentar intensidade = mais fótons por segundo' },
            { texto: 'Mais fótons = mais elétrons arrancados', destaque: true },
            { texto: 'Mas cada elétron tem a mesma energia cinética' },
            { texto: 'Resultado: mais elétrons, mesma velocidade' },
          ]}
          gabarito="Aumenta o número de elétrons, mas não a energia de cada um"
          dica="No efeito fotoelétrico: intensidade → quantidade de elétrons | frequência → energia dos elétrons"
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
            'Efeito fotoelétrico: depende da frequência, não da intensidade',
            'Energia do fóton: E = h·f (h = constante de Planck)',
            'Radiações: α (hélio) < β (elétron) < γ (onda) em penetração',
            'Meia-vida: N = N₀·(1/2)^(t/t½)',
            'Fissão: núcleo pesado → menores (usinas)',
            'Fusão: núcleos leves → maior (Sol)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
