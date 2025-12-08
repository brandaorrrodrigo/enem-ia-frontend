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

export default function Tema01EstruturaPage() {
  return (
    <LousaLayout temaAtual="tema01-estrutura" titulo="Estrutura da Dissertacao" badge="Tema 01">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        1. Estrutura da Dissertacao Argumentativa
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>dissertacao argumentativa</strong> e o genero textual cobrado no ENEM.
            Sua estrutura e composta por <strong style={{ color: '#87ceeb' }}>introducao, desenvolvimento e conclusao</strong>.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Estrutura Basica - 30 Linhas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>INTRODUCAO (5-7 linhas)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Apresentar o tema</li>
                <li>Contextualizar o problema</li>
                <li>Apresentar a tese (seu posicionamento)</li>
                <li>Anunciar os argumentos (opcional)</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>DESENVOLVIMENTO (16-20 linhas)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Paragrafo D1: Primeiro argumento + repertorio</li>
                <li>Paragrafo D2: Segundo argumento + repertorio</li>
                <li>Cada paragrafo: topico frasal + argumentacao + fechamento</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>CONCLUSAO (5-7 linhas)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Retomar a tese</li>
                <li>Proposta de intervencao completa</li>
                <li>5 elementos obrigatorios!</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Esqueleto do Paragrafo">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#ffd700', fontSize: '1.1rem', fontWeight: 'bold' }}>
                TOPICO FRASAL + ARGUMENTACAO + REPERTORIO + FECHAMENTO
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Topico Frasal:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Ideia central do paragrafo. Uma frase que resume o argumento.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Argumentacao:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Explicacao e desenvolvimento da ideia apresentada.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Repertorio:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Dados, citacoes, exemplos que comprovam seu argumento.</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Fechamento:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Retoma a tese, conecta ao tema geral.</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Modelo Visual">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,215,0,0.2)', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <p style={{ color: '#ffd700', fontWeight: 'bold', margin: 0 }}>INTRODUCAO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                  Contextualizacao + Tese + Argumentos
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(135,206,235,0.2)', borderRadius: '8px', borderLeft: '4px solid #87ceeb' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', margin: 0 }}>D1 - Primeiro Argumento</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                  Topico frasal + Desenvolvimento + Repertorio + Fechamento
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(135,206,235,0.2)', borderRadius: '8px', borderLeft: '4px solid #87ceeb' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', margin: 0 }}>D2 - Segundo Argumento</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                  Topico frasal + Desenvolvimento + Repertorio + Fechamento
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(152,251,152,0.2)', borderRadius: '8px', borderLeft: '4px solid #98fb98' }}>
                <p style={{ color: '#98fb98', fontWeight: 'bold', margin: 0 }}>CONCLUSAO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                  Retomada + Proposta de Intervencao (5 elementos)
                </p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Dicas de Ouro">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>1.</strong> Nunca fuja do tema! Leia a proposta com atencao.
            </p>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>2.</strong> Use conectivos para ligar as partes do texto.
            </p>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>3.</strong> Cite pelo menos 2 repertorios legitimados.
            </p>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>4.</strong> A proposta de intervencao deve ser DETALHADA.
            </p>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>5.</strong> Revise a ortografia e pontuacao!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Reflexao"
          enunciado="Por que a estrutura de introducao-desenvolvimento-conclusao e tao importante na redacao do ENEM?"
          resolucao={[
            { texto: 'Facilita a organizacao das ideias' },
            { texto: 'Os corretores avaliam a progressao logica', destaque: true },
            { texto: 'Competencia 2 exige texto dissertativo-argumentativo' },
            { texto: 'Permite desenvolver argumentos de forma clara' },
          ]}
          gabarito="A estrutura organiza o pensamento e demonstra dominio do genero textual"
          dica="Textos bem estruturados sao mais faceis de ler e avaliar!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Estrutura"
          itens={[
            'Introducao: 5-7 linhas (tema + tese)',
            'Desenvolvimento: 2 paragrafos (8-10 linhas cada)',
            'Conclusao: 5-7 linhas (proposta de intervencao)',
            'Total ideal: 28-30 linhas',
            'Cada paragrafo: topico frasal + argumentacao + repertorio',
            'Conectivos ligam todas as partes do texto',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
