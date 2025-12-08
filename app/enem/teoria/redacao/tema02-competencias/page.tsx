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

export default function Tema02CompetenciasPage() {
  return (
    <LousaLayout temaAtual="tema02-competencias" titulo="As 5 Competencias" badge="Tema 02">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        2. As 5 Competencias do ENEM
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A redacao do ENEM e avaliada em <strong style={{ color: '#ffd700' }}>5 competencias</strong>, cada uma valendo
            <strong style={{ color: '#87ceeb' }}> ate 200 pontos</strong>. Total maximo: 1000 pontos!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Competencia 1 - Norma Culta (200 pts)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Demonstrar dominio da modalidade escrita formal</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Ortografia correta</li>
                <li>Acentuacao adequada</li>
                <li>Pontuacao precisa</li>
                <li>Concordancia verbal e nominal</li>
                <li>Regencia verbal e nominal</li>
                <li>Colocacao pronominal</li>
              </ul>
            </div>
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
              Evite: girias, abreviacoes de internet, linguagem coloquial
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Competencia 2 - Compreensao do Tema (200 pts)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Compreender a proposta e aplicar conceitos</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Entender o tema proposto</li>
                <li>Desenvolver o tema sem tangencia-lo</li>
                <li>Usar texto dissertativo-argumentativo</li>
                <li>Usar repertorio sociocultural</li>
              </ul>
            </div>
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
              FUGA DO TEMA = NOTA ZERO! Tangenciamento = nota muito baixa
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Competencia 3 - Argumentacao (200 pts)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Selecionar e organizar informacoes em defesa de um ponto de vista</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Argumentos consistentes e bem desenvolvidos</li>
                <li>Informacoes relacionadas ao tema</li>
                <li>Defesa clara de um ponto de vista</li>
                <li>Progressao argumentativa</li>
              </ul>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Dica: Use dados, citacoes e exemplos para fortalecer argumentos!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Competencia 4 - Coesao (200 pts)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#dda0dd', marginBottom: '0.5rem' }}><strong>Demonstrar conhecimento dos mecanismos linguisticos</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Uso adequado de conectivos</li>
                <li>Articulacao entre paragrafos</li>
                <li>Referenciacao (retomadas pronominais)</li>
                <li>Fluidez na leitura</li>
              </ul>
            </div>
            <p style={{ color: '#dda0dd', fontSize: '0.9rem' }}>
              Conectivos essenciais: portanto, alem disso, dessa forma, entretanto...
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Competencia 5 - Proposta de Intervencao (200 pts)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffa500', marginBottom: '0.5rem' }}><strong>Elaborar proposta que respeite os direitos humanos</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Os 5 elementos OBRIGATORIOS:</p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0, fontSize: '0.9rem' }}>
                <li><strong style={{ color: '#ffd700' }}>AGENTE</strong> - Quem vai fazer?</li>
                <li><strong style={{ color: '#87ceeb' }}>ACAO</strong> - O que sera feito?</li>
                <li><strong style={{ color: '#98fb98' }}>MODO/MEIO</strong> - Como sera feito?</li>
                <li><strong style={{ color: '#dda0dd' }}>EFEITO</strong> - Para que? Qual resultado?</li>
                <li><strong style={{ color: '#ff6b6b' }}>DETALHAMENTO</strong> - De algum elemento</li>
              </ol>
            </div>
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
              ATENCAO: Proposta que desrespeita direitos humanos = NOTA ZERO!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Niveis de Pontuacao">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#ff6b6b' }}>0 pts:</strong> Nao atende ao criterio</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#ffa500' }}>40 pts:</strong> Atende precariamente</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#ffd700' }}>80 pts:</strong> Atende insuficientemente</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#87ceeb' }}>120 pts:</strong> Atende adequadamente</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#98fb98' }}>160 pts:</strong> Atende bem</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#32cd32' }}>200 pts:</strong> Atende excelentemente</p>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Reflexao"
          enunciado="Qual competencia voce considera mais dificil de alcancar 200 pontos?"
          resolucao={[
            { texto: 'C5 e a mais tecnica - exige 5 elementos especificos', destaque: true },
            { texto: 'C2 depende de bom repertorio cultural' },
            { texto: 'C4 exige pratica com conectivos variados' },
            { texto: 'C1 requer conhecimento gramatical solido' },
          ]}
          gabarito="Todas sao alcancaveis com estudo e pratica!"
          dica="A C5 e onde mais alunos perdem pontos por esquecer elementos."
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - 5 Competencias"
          itens={[
            'C1: Norma culta (ortografia, concordancia, regencia)',
            'C2: Tema + tipo textual + repertorio',
            'C3: Argumentacao consistente e organizada',
            'C4: Coesao (conectivos e articulacao)',
            'C5: Proposta com 5 elementos + direitos humanos',
            'Cada competencia: 0 a 200 pontos (6 niveis)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
