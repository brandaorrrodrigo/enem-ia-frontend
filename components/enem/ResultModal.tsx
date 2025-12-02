/**
 * Modal de Resultado do Simulado ENEM
 *
 * Exibe:
 * - Nota do usuário (0-1000)
 * - Acertos/Total
 * - Desempenho (Excelente, Bom, etc)
 * - Comparação com nota de corte (se disponível)
 * - Botões de ação (Fechar, Compartilhar, Ver Erros)
 * - Popup de Conquista (se bateu nota de corte ou meta)
 */

'use client';

import React, { useState } from 'react';
import { CompareScoreResponse, FinishResponse, indiceParaLetra } from '@/types/simulado';
import AchievementPopup from './AchievementPopup';

interface ResultModalProps {
  resultado: FinishResponse;
  comparacao: CompareScoreResponse | null;
  onClose: () => void;
  onVerErros: () => void;
}

export default function ResultModal({
  resultado,
  comparacao,
  onClose,
  onVerErros
}: ResultModalProps) {
  const [compartilhando, setCompartilhando] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  // ============================================================================
  // LÓGICA DE CONQUISTA
  // ============================================================================
  // Determina se deve mostrar o popup de conquista
  // Critérios:
  // 1. Usuário passou na nota de corte (comparacao.passou === true)
  // 2. Nota >= nota de corte ou meta configurada
  //
  // CUSTOMIZAÇÃO: Ajuste estas condições para mudar quando o popup aparece
  const deveExibirConquista = React.useMemo(() => {
    // Se não há comparação, não exibe
    if (!comparacao) return false;

    // Se passou na nota de corte
    if (comparacao.passou && comparacao.nota_corte) {
      return true;
    }

    // Adicionar outras condições aqui:
    // - Meta pessoal do usuário
    // - Primeira vez atingindo X pontos
    // - Streak de simulados
    // etc.

    return false;
  }, [comparacao]);

  // Mostra achievement automaticamente quando carrega
  React.useEffect(() => {
    if (deveExibirConquista) {
      // Delay de 500ms para melhor UX (deixa modal aparecer primeiro)
      const timer = setTimeout(() => {
        setShowAchievement(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [deveExibirConquista]);

  /**
   * Compartilha resultado nas redes sociais
   * Por enquanto, apenas console.log (placeholder)
   */
  const handleCompartilhar = () => {
    setCompartilhando(true);

    // Monta texto para compartilhar
    const texto = `🎓 Acabei de fazer um simulado ENEM!
📊 Nota: ${resultado.nota}/1000
✅ Acertos: ${resultado.acertos}/${resultado.total} (${resultado.porcentagem}%)
${resultado.desempenho}

Estude com a gente! #ENEMIA #SimuladoENEM`;

    // TODO: Implementar compartilhamento real
    // Por enquanto, apenas log e copia para clipboard
    console.log('📱 Compartilhando resultado:', texto);

    // Copia para clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto)
        .then(() => {
          alert('✅ Texto copiado para a área de transferência!');
        })
        .catch(() => {
          alert('❌ Erro ao copiar texto');
        });
    }

    setTimeout(() => setCompartilhando(false), 1000);
  };

  // Calcula porcentagem de acertos
  const porcentagemAcertos = Math.round(resultado.porcentagem);

  // Cor baseada no desempenho
  const getCorDesempenho = () => {
    if (porcentagemAcertos >= 90) return '#4CAF50'; // Verde
    if (porcentagemAcertos >= 75) return '#8BC34A'; // Verde claro
    if (porcentagemAcertos >= 60) return '#FFC107'; // Amarelo
    if (porcentagemAcertos >= 50) return '#FF9800'; // Laranja
    return '#F44336'; // Vermelho
  };

  return (
    <>
      {/* Achievement Popup (exibe por cima do ResultModal) */}
      {showAchievement && comparacao && comparacao.nota_corte && (
        <AchievementPopup
          show={showAchievement}
          nota={resultado.nota}
          notaReferencia={comparacao.nota_corte}
          tipoReferencia="nota_corte"
          labelReferencia={comparacao.mensagem.includes('Nota de corte')
            ? comparacao.mensagem.split('Nota de corte:')[0].trim()
            : 'Meta Atingida'}
          acertos={resultado.acertos}
          total={resultado.total}
          porcentagem={resultado.porcentagem}
          onClose={() => setShowAchievement(false)}
          onContinuar={() => {
            setShowAchievement(false);
            onClose();
          }}
        />
      )}

      {/* Result Modal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20,
        }}
        onClick={onClose}
      >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #4CAF50',
          borderRadius: 16,
          padding: 32,
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2
            style={{
              fontSize: '2rem',
              margin: 0,
              color: getCorDesempenho(),
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {resultado.desempenho}
          </h2>
        </div>

        {/* Nota Principal */}
        <div
          style={{
            textAlign: 'center',
            padding: 24,
            backgroundColor: '#0d1f14',
            borderRadius: 12,
            border: `3px solid ${getCorDesempenho()}`,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: 8 }}>
            Sua Nota TRI
          </div>
          <div
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: getCorDesempenho(),
              lineHeight: 1,
            }}
          >
            {resultado.nota}
          </div>
          <div style={{ fontSize: '1.2rem', color: '#fff', marginTop: 4 }}>
            / 1000 pontos
          </div>
        </div>

        {/* Estatísticas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              backgroundColor: '#0d1f14',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #4CAF50',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>Acertos</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4CAF50' }}>
              {resultado.acertos}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
              de {resultado.total} questões
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#0d1f14',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #F44336',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>Erros</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#F44336' }}>
              {resultado.erros}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
              {porcentagemAcertos}% de aproveitamento
            </div>
          </div>
        </div>

        {/* Comparação com Nota de Corte */}
        {comparacao && (
          <div
            style={{
              backgroundColor: comparacao.passou ? '#0d1f14' : '#1f0d0d',
              border: comparacao.passou
                ? '2px solid #4CAF50'
                : '2px solid #F44336',
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: comparacao.passou ? '#4CAF50' : '#F44336',
                marginBottom: 12,
              }}
            >
              {comparacao.passou ? '🎉 PARABÉNS!' : '📚 CONTINUE ESTUDANDO!'}
            </div>

            <div style={{ color: '#ddd', marginBottom: 12, lineHeight: 1.5 }}>
              {comparacao.mensagem}
            </div>

            {comparacao.nota_corte && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: '1px solid #444',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
                    Nota de Corte
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                    {comparacao.nota_corte}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: '#aaa' }}>Diferença</div>
                  <div
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: comparacao.passou ? '#4CAF50' : '#F44336',
                    }}
                  >
                    {comparacao.diferenca && comparacao.diferenca > 0 ? '+' : ''}
                    {comparacao.diferenca}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Questões Erradas (Preview) */}
        {resultado.erros_detalhados.length > 0 && (
          <div
            style={{
              backgroundColor: '#1f0d0d',
              border: '1px solid #F44336',
              borderRadius: 8,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '0.9rem', color: '#F44336', marginBottom: 8 }}>
              ❌ Você errou {resultado.erros_detalhados.length} questões
            </div>
            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
              Clique em "Ver Questões Erradas" para revisar e aprender
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Ver Questões Erradas */}
          {resultado.erros_detalhados.length > 0 && (
            <button
              onClick={onVerErros}
              style={{
                flex: 1,
                minWidth: 160,
                padding: '14px 20px',
                backgroundColor: '#F44336',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d32f2f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F44336';
              }}
            >
              📝 Ver Questões Erradas
            </button>
          )}

          {/* Compartilhar */}
          <button
            onClick={handleCompartilhar}
            disabled={compartilhando}
            style={{
              flex: 1,
              minWidth: 160,
              padding: '14px 20px',
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: compartilhando ? 'not-allowed' : 'pointer',
              opacity: compartilhando ? 0.6 : 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!compartilhando) {
                e.currentTarget.style.backgroundColor = '#1976D2';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2196F3';
            }}
          >
            {compartilhando ? '📋 Copiado!' : '📱 Compartilhar'}
          </button>

          {/* Fechar */}
          <button
            onClick={onClose}
            style={{
              flex: 1,
              minWidth: 160,
              padding: '14px 20px',
              backgroundColor: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#666';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#555';
            }}
          >
            ✖️ Fechar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
