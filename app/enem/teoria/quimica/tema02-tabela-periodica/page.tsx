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
 * Tema 02 - Tabela Periódica
 */
export default function Tema02TabelaPeriodicaPage() {
  return (
    <LousaLayout
      temaAtual="tema02-tabela-periodica"
      titulo="📋 Tabela Periódica"
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
        2. Tabela Periódica
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
            A <strong style={{ color: '#ffd700' }}>Tabela Periódica</strong> organiza os elementos
            por número atômico crescente. No ENEM, é fundamental entender as{' '}
            <strong style={{ color: '#87ceeb' }}>propriedades periódicas</strong> e saber localizar
            elementos por sua <strong style={{ color: '#98fb98' }}>família e período</strong>.
          </p>
        </div>
      </motion.section>

      {/* Organização */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Organização da Tabela">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Períodos (linhas horizontais):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Indicam o número de camadas eletrônicas. São 7 períodos.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Famílias/Grupos (colunas verticais):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Elementos com propriedades semelhantes. São 18 grupos.
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Famílias Importantes:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>1A - Metais Alcalinos (Li, Na, K...)</li>
                <li>2A - Metais Alcalino-terrosos (Mg, Ca...)</li>
                <li>6A - Calcogênios (O, S...)</li>
                <li>7A - Halogênios (F, Cl, Br, I)</li>
                <li>8A/0 - Gases Nobres (He, Ne, Ar...)</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Classificação dos Elementos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Classificação dos Elementos">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Metais</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Brilho metálico</li>
                <li>Conduzem eletricidade</li>
                <li>Maleáveis e dúcteis</li>
                <li>Tendem a perder elétrons</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Ametais</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Sem brilho (opacos)</li>
                <li>Isolantes (maioria)</li>
                <li>Quebradiços</li>
                <li>Tendem a ganhar elétrons</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Semimetais</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Propriedades intermediárias. Ex: Si, Ge (usados em semicondutores)
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Gases Nobres</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Camada de valência completa. Praticamente inertes.
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Propriedades Periódicas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Propriedades Periódicas - MUITO IMPORTANTE!">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Raio Atômico:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                ↓ Aumenta de cima para baixo (mais camadas)
              </p>
              <p style={{ color: '#f5f5dc' }}>
                ← Aumenta da direita para esquerda (menos prótons atraindo)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Eletronegatividade:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Capacidade de atrair elétrons. CONTRÁRIO do raio atômico.
              </p>
              <p style={{ color: '#98fb98' }}>
                Mais eletronegativo: Flúor (F). Gases nobres não têm.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Energia de Ionização:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia para remover elétron. Segue tendência da eletronegatividade.
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Afinidade Eletrônica:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia liberada ao ganhar elétron. Ametais têm maior afinidade.
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
        <CaixaExemplo numero={1} titulo="Localizando Elemento">
          <p style={{ marginBottom: '1rem' }}>
            O elemento com distribuição <strong style={{ color: '#ffd700' }}>1s² 2s² 2p⁶ 3s² 3p⁵</strong>{' '}
            pertence a qual família e período?
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
              Camada de valência: 3s² 3p⁵ → 3ª camada → <strong style={{ color: '#ffd700' }}>3º período</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Elétrons na valência: 2 + 5 = 7 → <strong style={{ color: '#ffd700' }}>Família 7A (Halogênios)</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              É o Cloro (Cl)!
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Comparando Propriedades">
          <p style={{ marginBottom: '1rem' }}>
            Entre Na, Mg e Al, qual tem <strong style={{ color: '#ffd700' }}>maior raio atômico</strong>?
            E maior eletronegatividade?
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
              Todos estão no 3º período (mesma linha)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Na (grupo 1) → Mg (grupo 2) → Al (grupo 13)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Raio atômico cresce para esquerda: <strong style={{ color: '#ffd700' }}>Na {'>'} Mg {'>'} Al</strong>
            </p>
            <p>
              Eletronegatividade cresce para direita: <strong style={{ color: '#ffd700' }}>Al {'>'} Mg {'>'} Na</strong>
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
          enunciado="Os elementos X e Y pertencem ao mesmo período da tabela periódica. X é um metal alcalino e Y é um halogênio. Qual elemento tem maior raio atômico e qual tem maior eletronegatividade?"
          resolucao={[
            { texto: 'Metal alcalino (X): família 1A, à esquerda' },
            { texto: 'Halogênio (Y): família 7A, à direita' },
            { texto: 'Mesmo período: mesma linha', destaque: true },
            { texto: 'Raio atômico: X > Y (cresce para esquerda)' },
            { texto: 'Eletronegatividade: Y > X (cresce para direita)' },
          ]}
          gabarito="Maior raio: X | Maior eletronegatividade: Y"
          dica="No período: raio atômico e eletronegatividade têm tendências opostas!"
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
            'Período = nº de camadas | Família = elétrons na valência',
            'Metais: condutores, perdem elétrons | Ametais: isolantes, ganham elétrons',
            'Raio atômico: ↓ e ← (aumenta para baixo e para esquerda)',
            'Eletronegatividade: ↑ e → (aumenta para cima e direita)',
            'Mais eletronegativo: F > O > N > Cl...',
            'Gases nobres: camada completa, inertes',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
