'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Proposta {
  id: string;
  ano: number;
  edicao: string;
  tema: string;
  tipoTexto: string;
  requisitos: string[];
}

export default function RedacaoPage() {
  const router = useRouter();
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [loading, setLoading] = useState(true);
  const [anoFiltro, setAnoFiltro] = useState<string>('');

  useEffect(() => {
    carregarPropostas();
  }, [anoFiltro]);

  const carregarPropostas = async () => {
    try {
      const url = anoFiltro
        ? `/api/redacao/propostas?ano=${anoFiltro}`
        : '/api/redacao/propostas';

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setPropostas(data.propostas);
      }
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
    } finally {
      setLoading(false);
    }
  };

  const iniciarRedacao = (propostaId: string) => {
    router.push(`/enem/redacao/escrever?proposta=${propostaId}`);
  };

  // Anos únicos para filtro
  const anosDisponiveis = [...new Set(propostas.map(p => p.ano))].sort((a, b) => b - a);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Patrick Hand', cursive"
      }}>
        <div>Carregando propostas...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
      fontFamily: "'Patrick Hand', cursive"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '3rem',
            color: '#fbbf24',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            ✍️ Redação ENEM
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Pratique com propostas oficiais do ENEM de 1999 a 2015
          </p>
        </div>

        {/* Filtro por Ano */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setAnoFiltro('')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: !anoFiltro ? '#fbbf24' : 'rgba(255,255,255,0.1)',
              color: !anoFiltro ? '#1a1a2e' : 'white',
              cursor: 'pointer',
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Todos os anos
          </button>
          {anosDisponiveis.map(ano => (
            <button
              key={ano}
              onClick={() => setAnoFiltro(ano.toString())}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: anoFiltro === ano.toString() ? '#fbbf24' : 'rgba(255,255,255,0.1)',
                color: anoFiltro === ano.toString() ? '#1a1a2e' : 'white',
                cursor: 'pointer',
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {ano}
            </button>
          ))}
        </div>

        {/* Lista de Propostas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {propostas.map(proposta => (
            <div
              key={proposta.id}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '2px solid rgba(251, 191, 36, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.2)';
                e.currentTarget.style.borderColor = '#fbbf24';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.2)';
              }}
            >
              {/* Ano e Edição */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  background: '#fbbf24',
                  color: '#1a1a2e',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  ENEM {proposta.ano}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.875rem'
                }}>
                  {proposta.edicao}
                </span>
              </div>

              {/* Tema */}
              <h3 style={{
                fontSize: '1.25rem',
                color: 'white',
                marginBottom: '16px',
                lineHeight: '1.4',
                minHeight: '80px'
              }}>
                {proposta.tema}
              </h3>

              {/* Tipo de Texto */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.875rem'
              }}>
                <span>📝</span>
                <span>{proposta.tipoTexto}</span>
              </div>

              {/* Botão */}
              <button
                onClick={() => iniciarRedacao(proposta.id)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#1a1a2e',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: "'Patrick Hand', cursive",
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Escrever Redação ✍️
              </button>
            </div>
          ))}
        </div>

        {/* Mensagem se não houver propostas */}
        {propostas.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.25rem',
            marginTop: '60px'
          }}>
            Nenhuma proposta encontrada para o ano selecionado.
          </div>
        )}
      </div>
    </div>
  );
}
