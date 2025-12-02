'use client';

import React from 'react';

interface NivelConfig {
  nivel: number;
  nome: string;
  pontosMin: number;
  icone: string;
}

interface LevelProgressProps {
  nivelAtual: NivelConfig;
  proximoNivel: NivelConfig | null;
  pontosParaProximo: number;
  progresso: number;
  totalPoints: number;
  compact?: boolean;
}

export default function LevelProgress({
  nivelAtual,
  proximoNivel,
  pontosParaProximo,
  progresso,
  totalPoints,
  compact = false,
}: LevelProgressProps) {
  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 20,
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>{nivelAtual.icone}</span>
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {nivelAtual.nome}
        </span>
        <span style={{ color: '#888', fontSize: '0.8rem' }}>
          Lv.{nivelAtual.nivel}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #333',
        borderRadius: 12,
        padding: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '2rem' }}>{nivelAtual.icone}</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {nivelAtual.nome}
            </div>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>
              Nível {nivelAtual.nivel}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '1.5rem' }}>
            {totalPoints}
          </div>
          <div style={{ color: '#888', fontSize: '0.8rem' }}>pontos</div>
        </div>
      </div>

      {/* Barra de Progresso */}
      {proximoNivel && (
        <>
          <div
            style={{
              height: 8,
              backgroundColor: '#333',
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: `${progresso}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#888',
              fontSize: '0.8rem',
            }}
          >
            <span>{Math.round(progresso)}% concluído</span>
            <span>
              {pontosParaProximo} pts para {proximoNivel.icone} {proximoNivel.nome}
            </span>
          </div>
        </>
      )}

      {!proximoNivel && (
        <div style={{ color: '#FFD700', textAlign: 'center', marginTop: 8 }}>
          🏆 Nível Máximo Alcançado!
        </div>
      )}
    </div>
  );
}
