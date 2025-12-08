'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Passo da resolução de uma questão
 */
interface PassoResolucao {
  texto: string;
  destaque?: boolean;
}

/**
 * Props do componente QuestaoInterativa
 */
interface QuestaoInterativaProps {
  /** Número da questão */
  numero?: number;
  /** Tipo/categoria da questão */
  tipo?: string;
  /** Enunciado da questão */
  enunciado: string;
  /** Passos da resolução */
  resolucao: PassoResolucao[] | string[];
  /** Resposta final/gabarito */
  gabarito: string;
  /** Dica adicional (opcional) */
  dica?: string;
}

/**
 * Componente de questão interativa estilo ENEM
 * Com botão para mostrar/ocultar resolução usando framer-motion
 */
export default function QuestaoInterativa({
  numero,
  tipo = 'Estilo ENEM',
  enunciado,
  resolucao,
  gabarito,
  dica,
}: QuestaoInterativaProps) {
  const [mostrarResolucao, setMostrarResolucao] = useState(false);

  // Normaliza os passos da resolução
  const passosNormalizados: PassoResolucao[] = resolucao.map(passo =>
    typeof passo === 'string' ? { texto: passo } : passo
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="questao-container"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: '2px solid #ffa07a',
        borderRadius: '12px',
        padding: '2rem',
        margin: '2rem 0',
        position: 'relative',
      }}
    >
      {/* Cabeçalho da questão */}
      <div
        className="questao-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Badge do tipo */}
        <span
          style={{
            background: '#f5a623',
            color: '#1a1a2e',
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '0.9rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontWeight: 600,
          }}
        >
          {tipo}
        </span>

        {/* Título/número */}
        <h3
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#ffa07a',
            fontSize: '1.3rem',
            margin: 0,
          }}
        >
          {numero ? `Questão ${numero}` : 'Questão'}
        </h3>
      </div>

      {/* Enunciado */}
      <div
        className="questao-enunciado"
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: '#f5f5dc',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
        }}
      >
        {enunciado}
      </div>

      {/* Dica (se houver) */}
      {dica && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(135, 206, 235, 0.15)',
            borderLeft: '4px solid #87ceeb',
            borderRadius: '0 8px 8px 0',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>💡</span>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: '#87ceeb',
              fontSize: '0.95rem',
            }}
          >
            <strong>Dica:</strong> {dica}
          </span>
        </motion.div>
      )}

      {/* Botão de resolução */}
      <motion.button
        onClick={() => setMostrarResolucao(!mostrarResolucao)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: mostrarResolucao
            ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '1rem',
          fontWeight: 500,
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease',
        }}
      >
        <span>{mostrarResolucao ? '👁️' : '🔍'}</span>
        <span>{mostrarResolucao ? 'Ocultar Resolução' : 'Mostrar Resolução'}</span>
      </motion.button>

      {/* Resolução (animada) */}
      <AnimatePresence>
        {mostrarResolucao && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'rgba(22, 163, 74, 0.15)',
                borderLeft: '4px solid #16a34a',
                borderRadius: '0 8px 8px 0',
                padding: '1.5rem',
              }}
            >
              {/* Título da resolução */}
              <h4
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  color: '#98fb98',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>✏️</span>
                <span>Resolução Passo a Passo</span>
              </h4>

              {/* Passos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {passosNormalizados.map((passo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: passo.destaque
                        ? 'rgba(255, 215, 0, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      fontFamily: "'Poppins', sans-serif",
                      color: passo.destaque ? '#ffd700' : '#f5f5dc',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      borderLeft: passo.destaque ? '3px solid #ffd700' : 'none',
                    }}
                  >
                    <span
                      style={{
                        color: '#98fb98',
                        fontWeight: 600,
                        marginRight: '0.5rem',
                      }}
                    >
                      {index + 1}.
                    </span>
                    {passo.texto}
                  </motion.div>
                ))}
              </div>

              {/* Gabarito */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: passosNormalizados.length * 0.1 + 0.2 }}
                style={{
                  marginTop: '1.5rem',
                  display: 'inline-block',
                }}
              >
                <div
                  style={{
                    background: '#f5a623',
                    color: '#1a1a2e',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>🎯</span>
                  <span>Gabarito: {gabarito}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Componente auxiliar para caixa de exemplo
 */
export function CaixaExemplo({
  numero,
  titulo,
  children,
}: {
  numero?: number;
  titulo?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(37, 99, 235, 0.15)',
        border: '2px dashed #87ceeb',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '1.5rem 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          left: '16px',
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '1.1rem',
          color: '#87ceeb',
          background: '#2d5a3d',
          padding: '0 12px',
          borderRadius: '4px',
        }}
      >
        💡 {titulo || `Exemplo ${numero || ''}`}
      </div>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: '#f5f5dc',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          marginTop: '0.5rem',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Componente auxiliar para caixa de fórmula
 */
export function CaixaFormula({
  children,
  descricao,
  titulo,
}: {
  children: React.ReactNode;
  descricao?: string;
  titulo?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'rgba(255, 215, 0, 0.1)',
        border: '2px solid #ffd700',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '1.5rem 0',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '1.5rem',
          color: '#ffd700',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.6), 1px 1px 0 rgba(0, 0, 0, 0.4)',
          letterSpacing: '2px',
        }}
      >
        {children}
      </div>
      {descricao && (
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#f5f5dc',
            fontSize: '0.9rem',
            marginTop: '0.75rem',
            opacity: 0.8,
          }}
        >
          {descricao}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Componente auxiliar para caixa de resumo
 */
export function CaixaResumo({
  titulo,
  itens,
}: {
  titulo?: string;
  itens: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
        border: '2px solid #98fb98',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '2rem 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          left: '16px',
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '1.1rem',
          color: '#98fb98',
          background: '#2d5a3d',
          padding: '0 12px',
          borderRadius: '4px',
        }}
      >
        📌 {titulo || 'Resumo ENEM PRO'}
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0.5rem 0 0',
        }}
      >
        {itens.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              position: 'relative',
              paddingLeft: '1.5rem',
              marginBottom: '0.5rem',
              color: '#f5f5dc',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: '#98fb98',
                fontWeight: 'bold',
              }}
            >
              ✓
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Componente auxiliar para caixa do professor
 */
export function CaixaProfessor({
  titulo,
  children,
}: {
  titulo?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        background: 'rgba(0, 0, 0, 0.25)',
        borderLeft: '4px solid #ffd700',
        borderRadius: '0 8px 8px 0',
        padding: '1.5rem',
        margin: '1.5rem 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          left: '12px',
          fontSize: '1.5rem',
          background: '#2d5a3d',
          padding: '0 8px',
          borderRadius: '4px',
        }}
      >
        📝
      </div>
      {titulo && (
        <h4
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#ffd700',
            fontSize: '1.3rem',
            marginBottom: '0.75rem',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
          }}
        >
          {titulo}
        </h4>
      )}
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: '#f5f5dc',
          fontSize: '1.05rem',
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
