'use client';

import React from 'react';

interface Badge {
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  pontos: number;
}

interface RecompensasModalProps {
  isOpen: boolean;
  onClose: () => void;
  dados: {
    recompensas: {
      pontosSimulado: number;
      pontosStreak: number;
      pontosBadges: number;
      pontosTotal: number;
    };
    streak: {
      atual: number;
      maximo: number;
      novoRecorde: boolean;
    };
    level: {
      subiu: boolean;
    };
    badges: {
      novos: Badge[];
      quantidade: number;
    };
    mensagem: string;
  } | null;
}

export default function RecompensasModal({ isOpen, onClose, dados }: RecompensasModalProps) {
  if (!isOpen || !dados) return null;

  const { recompensas, streak, level, badges } = dados;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #FFD700',
          borderRadius: 16,
          padding: 32,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone Principal */}
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>
          {level.subiu ? '🎉' : badges.quantidade > 0 ? '🏆' : '⭐'}
        </div>

        {/* Título */}
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#FFD700',
            marginBottom: 8,
          }}
        >
          {level.subiu ? 'Level UP!' : badges.quantidade > 0 ? 'Conquista Desbloqueada!' : 'Parabéns!'}
        </h2>

        {/* Pontos Totais */}
        <div
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#4CAF50',
            marginBottom: 24,
          }}
        >
          +{recompensas.pontosTotal} pts
        </div>

        {/* Breakdown de Pontos */}
        <div
          style={{
            backgroundColor: '#0d1f14',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#fff',
              marginBottom: 8,
            }}
          >
            <span>Simulado</span>
            <span style={{ color: '#4CAF50' }}>+{recompensas.pontosSimulado}</span>
          </div>
          {recompensas.pontosStreak > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#fff',
                marginBottom: 8,
              }}
            >
              <span>🔥 Streak</span>
              <span style={{ color: '#FF9800' }}>+{recompensas.pontosStreak}</span>
            </div>
          )}
          {recompensas.pontosBadges > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#fff',
              }}
            >
              <span>🏆 Badges</span>
              <span style={{ color: '#FFD700' }}>+{recompensas.pontosBadges}</span>
            </div>
          )}
        </div>

        {/* Streak */}
        {streak.atual > 0 && (
          <div
            style={{
              backgroundColor: streak.novoRecorde ? '#1a0d00' : '#0d1f14',
              border: streak.novoRecorde ? '2px solid #FF9800' : '1px solid #333',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 4 }}>🔥</div>
            <div style={{ color: '#FF9800', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {streak.atual} dias
            </div>
            <div style={{ color: '#aaa', fontSize: '0.9rem' }}>
              {streak.novoRecorde ? '🎉 Novo recorde de sequência!' : 'Sequência de estudos'}
            </div>
          </div>
        )}

        {/* Badges Desbloqueados */}
        {badges.novos.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#FFD700', marginBottom: 12, fontSize: '1.1rem' }}>
              Badges Desbloqueados
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              {badges.novos.map((badge) => (
                <div
                  key={badge.codigo}
                  style={{
                    backgroundColor: '#0d1f14',
                    border: '2px solid #FFD700',
                    borderRadius: 12,
                    padding: 12,
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 4 }}>{badge.icone}</div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {badge.nome}
                  </div>
                  <div style={{ color: '#FFD700', fontSize: '0.8rem' }}>
                    +{badge.pontos} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
