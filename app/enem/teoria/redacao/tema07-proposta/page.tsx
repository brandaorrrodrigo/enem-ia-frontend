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

export default function Tema07PropostaPage() {
  return (
    <LousaLayout temaAtual="tema07-proposta" titulo="Proposta de Intervencao" badge="Tema 07">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        7. Proposta de Intervencao
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>proposta de intervencao</strong> e exclusiva da Competencia 5.
            Deve conter <strong style={{ color: '#87ceeb' }}>5 elementos obrigatorios</strong> para pontuar 200!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Os 5 Elementos Obrigatorios">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(255,215,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>1</p>
                <p style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>AGENTE</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Quem?</p>
              </div>
              <div style={{ background: 'rgba(135,206,235,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>2</p>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>ACAO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>O que?</p>
              </div>
              <div style={{ background: 'rgba(152,251,152,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#98fb98', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>3</p>
                <p style={{ color: '#98fb98', fontWeight: 'bold', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>MODO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Como?</p>
              </div>
              <div style={{ background: 'rgba(221,160,221,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#dda0dd', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>4</p>
                <p style={{ color: '#dda0dd', fontWeight: 'bold', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>EFEITO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Para que?</p>
              </div>
              <div style={{ background: 'rgba(255,107,107,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>5</p>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>DETALHE</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Especifique!</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Agentes Possiveis">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Poder Publico:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Governo Federal</li>
                  <li>Ministerio da Educacao</li>
                  <li>Ministerio da Saude</li>
                  <li>Prefeituras</li>
                  <li>Poder Legislativo</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Sociedade Civil:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Escolas</li>
                  <li>ONGs</li>
                  <li>Midia</li>
                  <li>Familias</li>
                  <li>Empresas</li>
                </ul>
              </div>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Dica: Use agentes especificos! "O governo" e vago demais.
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Tipos de Acoes">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Criar/Implementar:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Leis, programas, politicas publicas, projetos sociais
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Promover:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Campanhas, debates, eventos, conscientizacao
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Fiscalizar:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Cumprimento de leis, aplicacao de multas, controle
                </p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Proposta Modelo Completa">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: '#f5f5dc', fontSize: '0.9rem', lineHeight: 1.8 }}>
              "Portanto, e necessario que o <span style={{ color: '#ffd700', fontWeight: 'bold' }}>[AGENTE] Ministerio da Educacao</span>,
              <span style={{ color: '#87ceeb', fontWeight: 'bold' }}> [ACAO] promova campanhas educativas</span> sobre saude mental nas escolas,
              <span style={{ color: '#98fb98', fontWeight: 'bold' }}> [MODO] por meio de palestras com psicologos e distribuicao de materiais informativos</span>,
              <span style={{ color: '#dda0dd', fontWeight: 'bold' }}> [EFEITO] a fim de conscientizar os jovens sobre a importancia do cuidado emocional</span>,
              <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}> [DETALHAMENTO] especialmente em parceria com o Ministerio da Saude</span>,
              garantindo assim o respeito ao direito a saude previsto na Constituicao."
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Estruturas de Detalhamento">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>O <strong style={{ color: '#ff6b6b' }}>detalhamento</strong> pode ser de qualquer elemento:</p>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                <strong style={{ color: '#ffd700' }}>Do agente:</strong> "em parceria com ONGs locais"
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                <strong style={{ color: '#87ceeb' }}>Da acao:</strong> "criando disciplinas obrigatorias sobre o tema"
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                <strong style={{ color: '#98fb98' }}>Do modo:</strong> "utilizando plataformas digitais e redes sociais"
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                <strong style={{ color: '#dda0dd' }}>Do efeito:</strong> "reduzindo os indices de violencia em 30%"
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="ATENCAO: Direitos Humanos!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
              <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '0.5rem' }}>PROPOSTAS QUE ZERAM A REDACAO:</p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Pena de morte</li>
                <li>Tortura ou violencia</li>
                <li>Privacao de liberdade arbitraria</li>
                <li>Discriminacao de qualquer tipo</li>
                <li>Censura ou restricao de expressao</li>
                <li>Qualquer violacao dos direitos fundamentais</li>
              </ul>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Sempre proponha solucoes que respeitem a dignidade humana!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Analise"
          enunciado="Qual elemento esta FALTANDO nesta proposta? 'O governo deve criar leis para combater o problema, por meio de fiscalizacao.'"
          resolucao={[
            { texto: 'Agente: "O governo" e vago (qual orgao?)' },
            { texto: 'Efeito: para que? Qual resultado esperado?', destaque: true },
            { texto: 'Detalhamento: nao especifica nenhum elemento' },
            { texto: 'A proposta esta incompleta - faltam 3 elementos!' },
          ]}
          gabarito="Faltam: agente especifico, efeito e detalhamento"
          dica="Releia sua proposta perguntando: Quem? O que? Como? Para que? Detalhei?"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Proposta de Intervencao"
          itens={[
            '5 elementos: Agente + Acao + Modo + Efeito + Detalhamento',
            'Agente especifico (nao use apenas "o governo")',
            'Acao: criar, promover, fiscalizar, implementar',
            'Modo: como a acao sera executada',
            'Efeito: finalidade, resultado esperado',
            'NUNCA proponha nada que viole direitos humanos!',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
