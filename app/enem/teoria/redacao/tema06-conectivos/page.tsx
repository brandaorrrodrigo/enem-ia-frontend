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

export default function Tema06ConectivosPage() {
  return (
    <LousaLayout temaAtual="tema06-conectivos" titulo="Conectivos e Coesao" badge="Tema 06">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        6. Conectivos e Coesao
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            Os <strong style={{ color: '#ffd700' }}>conectivos</strong> sao essenciais para a Competencia 4.
            Eles <strong style={{ color: '#87ceeb' }}>ligam ideias e paragrafos</strong>, garantindo fluidez ao texto.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Conectivos de Adicao">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Para adicionar ideias:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Alem disso, Ademais, Outrossim, Soma-se a isso, Acrescenta-se que,
                Nao obstante, Igualmente, Da mesma forma, Tambem, Ainda
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "A falta de investimento em educacao e um problema grave. <strong>Alem disso</strong>,
                a precariedade da infraestrutura escolar agrava a situacao."
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Conectivos de Oposicao">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}><strong>Para contrastar ideias:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Entretanto, No entanto, Contudo, Todavia, Porem, Nao obstante,
                Em contrapartida, Por outro lado, Ao contrario, Apesar disso
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "O Brasil possui leis avancadas sobre meio ambiente. <strong>Entretanto</strong>,
                a fiscalizacao e precaria e os crimes ambientais continuam."
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Conectivos de Conclusao">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Para concluir ideias:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Portanto, Dessa forma, Assim, Logo, Desse modo, Por conseguinte,
                Em suma, Em sintese, Por fim, Diante do exposto, Em vista disso
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "<strong>Portanto</strong>, e evidente que medidas urgentes devem ser tomadas
                para reverter esse quadro problematico."
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Conectivos por Funcao">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Causa:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Porque, Pois, Ja que, Uma vez que, Visto que, Dado que</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Consequencia:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>De modo que, De forma que, De sorte que, Tanto que</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Explicacao:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Isto e, Ou seja, Em outras palavras, Quer dizer</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Exemplificacao:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Por exemplo, A titulo de exemplo, Como ilustracao</p>
              </div>
              <div>
                <p style={{ color: '#dda0dd' }}><strong>Tempo:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Atualmente, Historicamente, No passado, Hoje em dia</p>
              </div>
              <div>
                <p style={{ color: '#ffa500' }}><strong>Condicao:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Se, Caso, Desde que, Contanto que, A menos que</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Conectivos para Iniciar Paragrafos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,215,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700', fontWeight: 'bold', marginBottom: '0.5rem' }}>INTRODUCAO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.8rem' }}>
                  Desde, Na sociedade, E inegavel que, Historicamente
                </p>
              </div>
              <div style={{ background: 'rgba(135,206,235,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', marginBottom: '0.5rem' }}>D1</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.8rem' }}>
                  Primeiramente, Em primeiro lugar, De inicio, A principio
                </p>
              </div>
              <div style={{ background: 'rgba(135,206,235,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', marginBottom: '0.5rem' }}>D2</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.8rem' }}>
                  Alem disso, Outrossim, Ademais, Soma-se
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(152,251,152,0.2)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#98fb98', fontWeight: 'bold', marginBottom: '0.5rem' }}>CONCLUSAO</p>
              <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                Portanto, Dessa forma, Diante do exposto, Em suma, Por fim
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Erros Comuns com Conectivos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>EVITE:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Repetir o mesmo conectivo varias vezes</li>
                <li>Usar conectivo sem sentido logico ("Portanto" sem conclusao)</li>
                <li>Iniciar todos os paragrafos com "Alem disso"</li>
                <li>Usar conectivos coloquiais ("Ai", "Dai", "Tipo")</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,255,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>FACA:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Varie os conectivos ao longo do texto</li>
                <li>Use o conectivo adequado para cada relacao logica</li>
                <li>Conecte ideias dentro e entre paragrafos</li>
                <li>Releia para verificar a fluidez</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Pratica"
          enunciado="Qual conectivo completa corretamente: 'O Brasil possui riquezas naturais. _____, a desigualdade social persiste.'"
          resolucao={[
            { texto: 'Portanto - indica conclusao (nao cabe aqui)' },
            { texto: 'Entretanto - indica oposicao/contraste', destaque: true },
            { texto: 'Alem disso - indica adicao (nao faz sentido)' },
            { texto: 'Porque - indica causa (inverte a logica)' },
          ]}
          gabarito="Entretanto - ha oposicao entre riqueza e desigualdade"
          dica="Identifique a relacao logica entre as oracoes antes de escolher!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Conectivos"
          itens={[
            'Adicao: alem disso, ademais, outrossim, soma-se',
            'Oposicao: entretanto, contudo, todavia, porem',
            'Conclusao: portanto, dessa forma, logo, assim',
            'Causa: porque, ja que, visto que, uma vez que',
            'Varie os conectivos - nao repita!',
            'Cada conectivo tem uma funcao logica especifica',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
