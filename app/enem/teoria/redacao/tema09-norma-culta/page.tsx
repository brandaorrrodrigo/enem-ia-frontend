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

export default function Tema09NormaCultaPage() {
  return (
    <LousaLayout temaAtual="tema09-norma-culta" titulo="Norma Culta e Gramatica" badge="Tema 09">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        9. Norma Culta e Gramatica
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>Competencia 1</strong> avalia o dominio da norma culta.
            <strong style={{ color: '#87ceeb' }}> Ortografia, concordancia, regencia e pontuacao</strong> sao essenciais!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Erros de Concordancia">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Concordancia Verbal:</strong></p>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#ff6b6b' }}>Errado:</span> "Existe muitos problemas"
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#98fb98' }}>Certo:</span> "Existem muitos problemas"
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Concordancia Nominal:</strong></p>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#ff6b6b' }}>Errado:</span> "As politica publicas"
                </p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  <span style={{ color: '#98fb98' }}>Certo:</span> "As politicas publicas"
                </p>
              </div>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Dica: O verbo concorda com o sujeito, nao com o que vem antes dele!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Regencia Verbal">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>ASSISTIR (ver)</strong></p>
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>Errado: Assistir o filme</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>Certo: Assistir ao filme</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>VISAR (desejar)</strong></p>
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>Errado: Visar o sucesso</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>Certo: Visar ao sucesso</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>PREFERIR</strong></p>
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>Errado: Prefiro X do que Y</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>Certo: Prefiro X a Y</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>OBEDECER</strong></p>
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>Errado: Obedecer a lei</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>Certo: Obedecer a lei</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Crase">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>USA crase:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Antes de palavras femininas: "ir a escola"</li>
                <li>Expressoes: "a medida que", "a procura de", "as vezes"</li>
                <li>Horas: "as 8 horas"</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}><strong>NAO usa crase:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Antes de palavras masculinas: "ir a o banco" (ao banco)</li>
                <li>Antes de verbos: "comecou a estudar"</li>
                <li>Antes de pronomes: "refiro-me a ela"</li>
                <li>Antes de "a" no singular + palavra no plural: "a pessoas"</li>
              </ul>
            </div>
            <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>
              Dica: Troque por "para a" - se funcionar, tem crase!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Pontuacao Essencial">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Virgula - Quando usar:</strong></p>
                <ul style={{ color: '#f5f5dc', fontSize: '0.85rem', paddingLeft: '1rem', margin: '0.5rem 0 0 0' }}>
                  <li>Separar termos de mesma funcao: "Educacao, saude e seguranca"</li>
                  <li>Isolar aposto: "Bauman, sociologo polones, afirma..."</li>
                  <li>Isolar adjuntos deslocados: "No Brasil, a desigualdade..."</li>
                  <li>Antes de conjuncoes adversativas: "..., entretanto, ..."</li>
                </ul>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Virgula - Quando NAO usar:</strong></p>
                <ul style={{ color: '#f5f5dc', fontSize: '0.85rem', paddingLeft: '1rem', margin: '0.5rem 0 0 0' }}>
                  <li>Entre sujeito e verbo: "O governo(,) deve agir"</li>
                  <li>Entre verbo e complemento: "Ele disse(,) que..."</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Palavras Confundidas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>MAS vs MAIS</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  MAS = porem, contudo<br/>
                  MAIS = quantidade, adicao
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>POR QUE vs PORQUE</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  POR QUE = pergunta, motivo pelo qual<br/>
                  PORQUE = resposta, pois
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>ONDE vs AONDE</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  ONDE = lugar fixo (estar)<br/>
                  AONDE = movimento (ir)
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>A vs HA</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  A = futuro, distancia (daqui a 2 dias)<br/>
                  HA = passado, existir (ha 2 dias)
                </p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="O que EVITAR">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,0,0,0.1)', padding: '1rem', borderRadius: '8px' }}>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li><strong>Girias:</strong> "tipo", "mano", "cara"</li>
                <li><strong>Abreviacoes:</strong> "pq", "vc", "tb"</li>
                <li><strong>Linguagem coloquial:</strong> "a gente vai", "pra"</li>
                <li><strong>Estrangeirismos desnecessarios:</strong> Prefira equivalentes em portugues</li>
                <li><strong>Gerundismo:</strong> "vou estar fazendo" (use "farei")</li>
                <li><strong>Repeticao de palavras:</strong> Use sinonimos</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Teste"
          enunciado="Qual frase esta CORRETA quanto a regencia e concordancia?"
          resolucao={[
            { texto: '"Existe varias solucoes" = erro de concordancia' },
            { texto: '"Deve-se assistir o filme" = erro de regencia' },
            { texto: '"A maioria dos jovens prefere redes sociais" = CORRETO', destaque: true },
            { texto: '"Obedeca a lei" = falta crase (obedecer A + A = a)' },
          ]}
          gabarito="Atencao a concordancia e regencia e essencial para C1"
          dica="Releia seu texto em voz alta - erros gramaticais 'soam' estranhos!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Norma Culta"
          itens={[
            'Concordancia: verbo concorda com sujeito',
            'Regencia: assistir AO, visar AO, preferir X A Y',
            'Crase: antes de femininos (teste: troque por "para a")',
            'Virgula: isola apostos, adjuntos; nunca entre sujeito-verbo',
            'Evite girias, abreviacoes e linguagem coloquial',
            'Releia o texto para identificar erros!',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
