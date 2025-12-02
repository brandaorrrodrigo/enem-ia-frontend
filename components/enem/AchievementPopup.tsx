/**
 * Popup de Conquista Estilo Duolingo - ENEM-IA
 *
 * Exibe animação de celebração quando o aluno:
 * - Alcança ou ultrapassa a nota de corte do ENEM
 * - Bate sua meta configurada
 *
 * Features:
 * - Animação de entrada suave
 * - Confetes animados
 * - Compartilhamento social (WhatsApp, Instagram, TikTok)
 * - Design alinhado com tema lousa/ENEM-IA
 * - Configurável via flags
 */

'use client';

import React, { useEffect, useState } from 'react';

export interface AchievementPopupProps {
  /** Se o popup deve ser exibido */
  show: boolean;
  /** Nota do simulado do usuário */
  nota: number;
  /** Nota de referência (corte ou meta) */
  notaReferencia: number;
  /** Tipo de referência */
  tipoReferencia: 'nota_corte' | 'meta_pessoal';
  /** Label da referência (ex: "Medicina - USP 2024") */
  labelReferencia: string;
  /** Acertos do simulado */
  acertos: number;
  /** Total de questões */
  total: number;
  /** Porcentagem de acertos */
  porcentagem: number;
  /** Callback ao fechar */
  onClose: () => void;
  /** Callback ao continuar estudando */
  onContinuar: () => void;
}

export default function AchievementPopup({
  show,
  nota,
  notaReferencia,
  tipoReferencia,
  labelReferencia,
  acertos,
  total,
  porcentagem,
  onClose,
  onContinuar,
}: AchievementPopupProps) {
  const [animating, setAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger animation when show changes
  useEffect(() => {
    if (show) {
      setAnimating(true);
      setShowConfetti(true);

      // Remove confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setAnimating(false);
    }
  }, [show]);

  if (!show) return null;

  // Calcula diferença
  const diferenca = Math.round(nota - notaReferencia);

  // Mensagens motivacionais
  const getMensagemMotivacional = () => {
    if (diferenca >= 100) {
      return '🌟 Você arrasou! Muito acima da meta!';
    } else if (diferenca >= 50) {
      return '🎯 Excelente! Você superou a meta!';
    } else if (diferenca >= 0) {
      return '🎉 Parabéns! Você atingiu a meta!';
    }
    return ''; // Não deveria aparecer se não passou
  };

  // Gera textos para compartilhamento
  const getTextoCompartilhamento = () => {
    const emoji = diferenca >= 100 ? '🔥' : diferenca >= 50 ? '🌟' : '🎯';
    const textoBase = `${emoji} Acabei de fazer um simulado ENEM e BATEU A META!

📊 Minha nota: ${nota}/1000
🎯 Meta: ${notaReferencia} (${labelReferencia})
✅ Acertos: ${acertos}/${total} (${porcentagem}%)
💪 Diferença: +${diferenca} pontos!

Estude comigo no ENEM-IA! 🚀`;

    return textoBase;
  };

  /**
   * Compartilha no WhatsApp
   */
  const handleCompartilharWhatsApp = () => {
    const texto = getTextoCompartilhamento();
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  /**
   * Copia texto para Instagram/TikTok
   */
  const handleCopiarTexto = (plataforma: 'instagram' | 'tiktok') => {
    const texto = getTextoCompartilhamento();
    const hashtags =
      plataforma === 'instagram'
        ? '\n\n#ENEMIA #SimuladoENEM #ENEM2025 #Estudos #Aprovacao'
        : '\n\n#ENEMIA #SimuladoENEM #ENEM2025 #FYP #Estudos';

    const textoFinal = texto + hashtags;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textoFinal)
        .then(() => {
          alert(
            `✅ Texto copiado para ${plataforma === 'instagram' ? 'Instagram' : 'TikTok'}!\n\nCole no app para compartilhar sua conquista! 🎉`
          );
        })
        .catch(() => {
          alert('❌ Erro ao copiar texto');
        });
    } else {
      alert('❌ Seu navegador não suporta cópia automática');
    }
  };

  return (
    <>
      {/* Overlay */}
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
          animation: animating ? 'fadeIn 0.3s ease-in' : 'fadeOut 0.3s ease-out',
        }}
        onClick={onClose}
      >
        {/* Confetti Animation */}
        {showConfetti && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: -10,
                  left: `${Math.random() * 100}%`,
                  width: 10,
                  height: 10,
                  backgroundColor: ['#FFD700', '#4CAF50', '#2196F3', '#FF9800', '#E91E63'][
                    Math.floor(Math.random() * 5)
                  ],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animation: `fall ${2 + Math.random() * 3}s linear forwards`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '3px solid #FFD700',
            borderRadius: 20,
            padding: 40,
            maxWidth: 550,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3)',
            animation: animating ? 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'scaleOut 0.3s ease-out',
            transform: animating ? 'scale(1)' : 'scale(0.8)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ícone de Troféu */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '5rem',
              marginBottom: 20,
              animation: 'bounce 1s ease-in-out infinite',
            }}
          >
            🏆
          </div>

          {/* Título */}
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2rem',
              margin: '0 0 12px 0',
              color: '#FFD700',
              textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)',
              fontWeight: 'bold',
            }}
          >
            CONQUISTA DESBLOQUEADA!
          </h2>

          {/* Subtítulo */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#fff',
              margin: '0 0 24px 0',
              lineHeight: 1.4,
            }}
          >
            {getMensagemMotivacional()}
          </p>

          {/* Nota Principal */}
          <div
            style={{
              textAlign: 'center',
              padding: 24,
              backgroundColor: '#0d1f14',
              borderRadius: 12,
              border: '2px solid #4CAF50',
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: 8 }}>
              Sua Nota
            </div>
            <div
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#4CAF50',
                lineHeight: 1,
              }}
            >
              {nota}
            </div>
            <div style={{ fontSize: '1rem', color: '#fff', marginTop: 4 }}>
              / 1000 pontos
            </div>
          </div>

          {/* Comparação */}
          <div
            style={{
              backgroundColor: '#0d1f14',
              border: '2px solid #FFD700',
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
                  {tipoReferencia === 'nota_corte' ? 'Nota de Corte' : 'Sua Meta'}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                  {notaReferencia}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', color: '#aaa' }}>Você fez</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  +{diferenca}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#FFD700', textAlign: 'center' }}>
              📍 {labelReferencia}
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #4CAF50',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#aaa' }}>Acertos</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4CAF50' }}>
                {acertos}/{total}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #FFD700',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#aaa' }}>Aproveitamento</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#FFD700' }}>
                {porcentagem}%
              </div>
            </div>
          </div>

          {/* Compartilhamento Social */}
          <div
            style={{
              backgroundColor: '#0d1f14',
              border: '1px solid #2196F3',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                color: '#2196F3',
                marginBottom: 12,
                fontWeight: 'bold',
              }}
            >
              📱 Compartilhe sua conquista!
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {/* WhatsApp */}
              <button
                onClick={handleCompartilharWhatsApp}
                style={{
                  flex: 1,
                  minWidth: 100,
                  padding: '10px 16px',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                WhatsApp
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleCopiarTexto('instagram')}
                style={{
                  flex: 1,
                  minWidth: 100,
                  padding: '10px 16px',
                  backgroundColor: '#E1306C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Instagram
              </button>

              {/* TikTok */}
              <button
                onClick={() => handleCopiarTexto('tiktok')}
                style={{
                  flex: 1,
                  minWidth: 100,
                  padding: '10px 16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #00f2ea',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                TikTok
              </button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', gap: 12 }}>
            {/* Continuar Estudando */}
            <button
              onClick={onContinuar}
              style={{
                flex: 1,
                padding: '16px 24px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#45a049';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4CAF50';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
              }}
            >
              📚 Continuar Estudando
            </button>

            {/* Fechar */}
            <button
              onClick={onClose}
              style={{
                padding: '16px 24px',
                backgroundColor: 'transparent',
                color: '#aaa',
                border: '2px solid #555',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#888';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#555';
                e.currentTarget.style.color = '#aaa';
              }}
            >
              ✖️
            </button>
          </div>
        </div>
      </div>

      {/* Keyframes CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.8);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
