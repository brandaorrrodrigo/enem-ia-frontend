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

export default function Tema04DesenvolvimentoPage() {
  return (
    <LousaLayout temaAtual="tema04-desenvolvimento" titulo="Desenvolvimento Argumentativo" badge="Tema 04">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        4. Desenvolvimento Argumentativo
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            O <strong style={{ color: '#ffd700' }}>desenvolvimento</strong> e o coracao da sua redacao.
            Aqui voce apresenta seus <strong style={{ color: '#87ceeb' }}>argumentos + repertorios</strong> para defender sua tese.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Estrutura do Paragrafo de Desenvolvimento">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(255,215,0,0.2)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>1. TOPICO FRASAL</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Ideia central</p>
              </div>
              <div style={{ background: 'rgba(135,206,235,0.2)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#87ceeb', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>2. EXPLICACAO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Desenvolva a ideia</p>
              </div>
              <div style={{ background: 'rgba(152,251,152,0.2)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#98fb98', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>3. REPERTORIO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Comprove</p>
              </div>
              <div style={{ background: 'rgba(255,107,107,0.2)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '0.85rem', margin: 0 }}>4. FECHAMENTO</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Conclua</p>
              </div>
            </div>
            <p style={{ color: '#f5f5dc', fontSize: '0.9rem', textAlign: 'center' }}>
              Cada paragrafo deve ter entre <strong style={{ color: '#ffd700' }}>8-10 linhas</strong>
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Tipos de Argumentos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Argumento de Autoridade</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Citar especialistas, pensadores, pesquisadores.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "Segundo o sociologo Zygmunt Bauman..."
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Argumento Estatistico</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Usar dados numericos de fontes confiaveis.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "De acordo com o IBGE, 70% dos brasileiros..."
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Argumento Historico</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Relacionar com fatos historicos relevantes.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "Desde o periodo colonial brasileiro..."
                </p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Argumento por Exemplificacao</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Usar exemplos concretos e conhecidos.
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "Um exemplo disso e o caso da Finlandia..."
                </p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Abordagens Argumentativas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Causa e Consequencia</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                D1: Analisa as CAUSAS do problema<br/>
                D2: Analisa as CONSEQUENCIAS do problema
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Dois Aspectos Diferentes</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                D1: Aspecto social do problema<br/>
                D2: Aspecto economico do problema
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Dois Agentes Diferentes</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                D1: Responsabilidade do Estado<br/>
                D2: Responsabilidade da sociedade
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Paragrafo Modelo">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: '#f5f5dc', fontSize: '0.9rem', lineHeight: 1.8 }}>
              <span style={{ color: '#ffd700' }}>[TOPICO FRASAL]</span> Primeiramente, e fundamental analisar a negligencia estatal diante do problema.
              <span style={{ color: '#87ceeb' }}> [EXPLICACAO]</span> O Estado, como garantidor dos direitos fundamentais, deveria implementar politicas publicas eficazes para combater tal questao. Contudo, a ausencia de investimentos e a falta de fiscalizacao perpetuam a situacao.
              <span style={{ color: '#98fb98' }}> [REPERTORIO]</span> Nesse sentido, o filosofo John Locke, em sua obra "Segundo Tratado sobre o Governo Civil", defende que o Estado deve proteger os direitos naturais dos cidadaos, incluindo a vida e a liberdade.
              <span style={{ color: '#ff6b6b' }}> [FECHAMENTO]</span> Portanto, a omissao governamental configura-se como um dos principais entraves para a resolucao da problematica.
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Conectivos para Desenvolvimento">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Inicio de D1:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Primeiramente, Em primeiro lugar, De inicio, Inicialmente, A principio
                </p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Inicio de D2:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Alem disso, Outrossim, Ademais, Em segundo lugar, Soma-se a isso
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Para repertorio:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Nesse sentido, A esse respeito, Sob essa otica, Diante disso
                </p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Para fechamento:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Portanto, Dessa forma, Logo, Assim, Desse modo
                </p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Analise"
          enunciado="O que torna um argumento 'fraco' na redacao do ENEM?"
          resolucao={[
            { texto: 'Usar senso comum sem embasamento', destaque: true },
            { texto: 'Nao conectar o repertorio ao argumento' },
            { texto: 'Fazer afirmacoes sem exemplificar ou provar' },
            { texto: 'Repetir ideias da introducao sem aprofundar' },
          ]}
          gabarito="Argumentos fracos sao genericos e sem fundamentacao"
          dica="Sempre pergunte: 'Como posso PROVAR essa afirmacao?'"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Desenvolvimento"
          itens={[
            '2 paragrafos de 8-10 linhas cada',
            'Estrutura: topico frasal + explicacao + repertorio + fechamento',
            'Use argumentos de autoridade, estatisticos ou historicos',
            'Abordagens: causa/consequencia ou aspectos diferentes',
            'Conecte o repertorio ao seu argumento',
            'Evite senso comum - sempre comprove suas afirmacoes',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
