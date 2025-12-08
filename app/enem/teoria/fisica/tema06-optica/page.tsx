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
 * Tema 06 - Óptica
 */
export default function Tema06OpticaPage() {
  return (
    <LousaLayout
      temaAtual="tema06-optica"
      titulo="🔦 Óptica"
      badge="Tema 06"
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
        6. Óptica
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
            A <strong style={{ color: '#ffd700' }}>óptica</strong> estuda a luz e os fenômenos
            luminosos. No ENEM, aparecem questões sobre <strong style={{ color: '#87ceeb' }}>
            reflexão, refração, espelhos, lentes</strong> e aplicações como{' '}
            <strong style={{ color: '#98fb98' }}>câmeras, olho humano e instrumentos ópticos</strong>.
          </p>
        </div>
      </motion.section>

      {/* Natureza da Luz */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="A Luz">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#f5f5dc' }}>
                A luz é uma <strong style={{ color: '#ffd700' }}>onda eletromagnética</strong> que:
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Propaga-se no vácuo (c = 3 × 10⁸ m/s)</li>
                <li>Tem comportamento dual (onda e partícula)</li>
                <li>A luz visível é apenas uma parte do espectro eletromagnético</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Espectro visível:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                🔴 Vermelho → Laranja → Amarelo → Verde → Azul → Anil → 🟣 Violeta
              </p>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                (Vermelho: maior λ, menor f | Violeta: menor λ, maior f)
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Reflexão */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Reflexão da Luz">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Leis da Reflexão:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                1ª Lei: O raio incidente, o refletido e a normal estão no mesmo plano
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                2ª Lei: î = r̂ (ângulo de incidência = ângulo de reflexão)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Espelhos Planos:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Imagem virtual, direita e do mesmo tamanho</li>
                <li>Distância objeto-espelho = distância imagem-espelho</li>
                <li>Inversão esquerda-direita</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Espelhos Esféricos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Espelhos Esféricos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                  <strong>Côncavo:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Superfície refletora interna. Pode formar imagens reais ou virtuais.
                  Ex: espelho de maquiagem, faróis
                </p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                  <strong>Convexo:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Superfície refletora externa. Sempre forma imagem virtual, menor e direita.
                  Ex: retrovisor de carro
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                <strong>Equação dos Espelhos:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                1/f = 1/p + 1/p' &nbsp;&nbsp;|&nbsp;&nbsp; f = R/2
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                f = distância focal, p = objeto, p' = imagem, R = raio
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Refração */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Refração da Luz">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Lei de Snell-Descartes:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                n₁ · sen(θ₁) = n₂ · sen(θ₂)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                n = índice de refração do meio
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Índice de Refração:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                n = c/v
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                c = velocidade da luz no vácuo, v = velocidade no meio
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc' }}>
                <strong>Regra prática:</strong>
              </p>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem' }}>
                Meio mais refringente (maior n) → luz mais lenta → aproxima da normal
              </p>
              <p style={{ color: '#98fb98', marginTop: '0.5rem' }}>
                Ex: ar → água: luz diminui velocidade e se aproxima da normal
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
        <CaixaExemplo numero={1} titulo="Espelho Plano">
          <p style={{ marginBottom: '1rem' }}>
            Uma pessoa de <strong style={{ color: '#ffd700' }}>1,80 m</strong> está a{' '}
            <strong style={{ color: '#ffd700' }}>2 m</strong> de um espelho plano vertical.
            A que distância a imagem está da pessoa?
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
              No espelho plano: distância do objeto = distância da imagem
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Imagem está a 2 m atrás do espelho
            </p>
            <p>
              Distância pessoa-imagem: 2 + 2 = <strong style={{ color: '#ffd700' }}>4 m</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Lentes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Lentes - Aplicação Frequente!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                  <strong>Convergente:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Bordas finas, centro grosso. Concentra a luz.
                  Ex: lupa, óculos para hipermetropia
                </p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                  <strong>Divergente:</strong>
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  Bordas grossas, centro fino. Espalha a luz.
                  Ex: óculos para miopia
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                <strong>Vergência (Dioptria):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                V = 1/f &nbsp;&nbsp;(unidade: dioptrias = "grau")
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Convergente: V {'>'} 0 | Divergente: V {'<'} 0
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Olho Humano */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={2} titulo="Defeitos da Visão">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Miopia:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Vê mal de longe. Imagem forma antes da retina.
                Correção: lente divergente (V {'<'} 0)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Hipermetropia:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Vê mal de perto. Imagem forma depois da retina.
                Correção: lente convergente (V {'>'} 0)
              </p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                <strong>Astigmatismo:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Córnea irregular. Visão distorcida.
                Correção: lente cilíndrica
              </p>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Questão Estilo ENEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
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
          enunciado="Uma pessoa usa óculos com lentes de vergência -2,5 di (dioptrias). Qual é a distância focal das lentes e qual defeito visual elas corrigem?"
          resolucao={[
            { texto: 'V = 1/f → f = 1/V' },
            { texto: 'f = 1/(-2,5) = -0,4 m = -40 cm', destaque: true },
            { texto: 'Vergência negativa → lente divergente' },
            { texto: 'Lente divergente corrige miopia' },
          ]}
          gabarito="f = -40 cm, corrige miopia"
          dica="Vergência negativa = lente divergente = correção de miopia. Vergência positiva = lente convergente = correção de hipermetropia."
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
            'Reflexão: ângulo de incidência = ângulo de reflexão',
            'Espelho plano: imagem virtual, simétrica, mesmo tamanho',
            'Refração: Lei de Snell → n₁·sen(θ₁) = n₂·sen(θ₂)',
            'Lente convergente: V > 0, corrige hipermetropia',
            'Lente divergente: V < 0, corrige miopia',
            'Vergência: V = 1/f (dioptrias)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
