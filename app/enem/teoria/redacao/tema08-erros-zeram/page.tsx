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

export default function Tema08ErrosZeramPage() {
  return (
    <LousaLayout temaAtual="tema08-erros-zeram" titulo="Erros que Zeram" badge="Tema 08">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        8. Erros que Zeram a Redacao
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            Existem situacoes que resultam em <strong style={{ color: '#ff6b6b' }}>NOTA ZERO</strong> automatica.
            <strong style={{ color: '#ffd700' }}> Conhecer esses erros e essencial</strong> para evita-los!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="8 Situacoes que ZERAM">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>1. FUGA TOTAL DO TEMA</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Escrever sobre assunto diferente do proposto
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>2. NAO ATENDER AO TIPO TEXTUAL</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Escrever poema, carta, narrativa em vez de dissertacao
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>3. TEXTO ATE 7 LINHAS</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Minimo de 8 linhas. Ideal: 28-30 linhas
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>4. COPIAR TEXTOS MOTIVADORES</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Copiar trechos da prova sem aspas
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>5. FERIR DIREITOS HUMANOS</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Propor tortura, pena de morte, discriminacao
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>6. FOLHA EM BRANCO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Nao escrever nada na folha de redacao
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>7. TEXTO DESCONEXO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Frases soltas sem sentido ou conexao
                </p>
              </div>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>8. IDENTIFICACAO INDEVIDA</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Assinar nome, colocar marcas identificadoras
                </p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Fuga vs Tangenciamento">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>FUGA = NOTA ZERO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Tema: Violencia contra a mulher<br/>
                  Escreve sobre: Violencia em geral
                </p>
              </div>
              <div style={{ background: 'rgba(255,165,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500', fontWeight: 'bold' }}>TANGENCIAMENTO = NOTA BAIXA</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Tema: Violencia contra a mulher<br/>
                  Escreve sobre: Feminismo (relacionado, mas diferente)
                </p>
              </div>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Dica: Releia a proposta varias vezes e destaque as palavras-chave!
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Direitos Humanos - O que EVITAR">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}><strong>NUNCA proponha:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Pena de morte</li>
                <li>Tortura</li>
                <li>Linchamento</li>
                <li>Castigos fisicos</li>
                <li>Prisao perpetua</li>
                <li>Esterilizacao forcada</li>
                <li>Discriminacao por raca, genero, religiao</li>
                <li>Censura ou restricao de liberdade</li>
                <li>Trabalho forcado</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>PODE propor:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Educacao e conscientizacao</li>
                <li>Politicas publicas inclusivas</li>
                <li>Fiscalizacao e cumprimento de leis existentes</li>
                <li>Apoio psicologico e social</li>
                <li>Ressocializacao de infratores</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Identificacao Indevida">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>ZERA a redacao:</strong></p>
                <ul style={{ color: '#f5f5dc', fontSize: '0.85rem', paddingLeft: '1rem', margin: '0.5rem 0 0 0' }}>
                  <li>Assinar seu nome no texto</li>
                  <li>Colocar numero de inscricao</li>
                  <li>Mencionar cidade ou escola pelo nome</li>
                  <li>Usar simbolos ou desenhos na folha</li>
                  <li>Escrever "Fim" ou "Obrigado" ao final</li>
                </ul>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Pode usar:</strong></p>
                <ul style={{ color: '#f5f5dc', fontSize: '0.85rem', paddingLeft: '1rem', margin: '0.5rem 0 0 0' }}>
                  <li>"Na minha cidade..." (sem nome)</li>
                  <li>"Em muitas escolas brasileiras..."</li>
                  <li>Generalizacoes que nao identificam</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Erros que NAO Zeram (mas Prejudicam)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,165,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Erros de ortografia</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Reduzem pontos na C1</p>
              </div>
              <div style={{ background: 'rgba(255,165,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Argumentacao fraca</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Reduzem pontos na C3</p>
              </div>
              <div style={{ background: 'rgba(255,165,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Poucos conectivos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Reduzem pontos na C4</p>
              </div>
              <div style={{ background: 'rgba(255,165,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Proposta incompleta</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Reduzem pontos na C5</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Teste"
          enunciado="Qual situacao NAO zera a redacao automaticamente?"
          resolucao={[
            { texto: 'Fuga total do tema = ZERO' },
            { texto: 'Propor pena de morte = ZERO' },
            { texto: 'Texto com 6 linhas = ZERO' },
            { texto: 'Erros de concordancia = Perda de pontos na C1', destaque: true },
          ]}
          gabarito="Erros gramaticais prejudicam, mas nao zeram"
          dica="Conhecer as regras de zero e essencial para evitar desastres!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Erros que Zeram"
          itens={[
            'Fuga do tema = ZERO (leia a proposta com atencao!)',
            'Tipo textual errado = ZERO (use dissertacao-argumentativa)',
            'Menos de 8 linhas = ZERO (escreva 28-30 linhas)',
            'Copia de textos motivadores = ZERO',
            'Ferir direitos humanos = ZERO (nada de tortura ou morte)',
            'Identificacao = ZERO (nao assine nem identifique)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
