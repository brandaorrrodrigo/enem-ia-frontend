'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FPCoin from '@/components/FPCoin';

interface Redacao {
  id: string;
  texto: string;
  nota1: number;
  nota2: number;
  nota3: number;
  nota4: number;
  nota5: number;
  notaFinal: number;
  feedback: string;
  status: string;
  createdAt: string;
  avaliadoEm: string;
  proposta: {
    ano: number;
    tema: string;
    edicao: string;
  };
}

export default function ResultadoRedacaoPage() {
  const router = useRouter();
  const params = useParams();
  const redacaoId = params.id as string;

  const [redacao, setRedacao] = useState<Redacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [corrigindo, setCorrigindo] = useState(false);

  useEffect(() => {
    carregarRedacao();
  }, [redacaoId]);

  const carregarRedacao = async () => {
    try {
      const res = await fetch(`/api/redacao/minhas?usuarioId=user_demo`);
      const data = await res.json();

      if (data.success) {
        const redacaoEncontrada = data.redacoes.find((r: any) => r.id === redacaoId);
        if (redacaoEncontrada) {
          setRedacao(redacaoEncontrada);

          // Se ainda não foi corrigida, iniciar correção
          if (redacaoEncontrada.status === 'enviada' && !redacaoEncontrada.notaFinal) {
            corrigirRedacao();
          }
        } else {
          router.push('/enem/redacao');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar redação:', error);
    } finally {
      setLoading(false);
    }
  };

  const corrigirRedacao = async () => {
    setCorrigindo(true);

    try {
      const res = await fetch('/api/redacao/corrigir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ redacaoId })
      });

      const data = await res.json();

      if (data.success) {
        // Recarregar redação com as notas
        await carregarRedacao();
      }
    } catch (error) {
      console.error('Erro ao corrigir:', error);
    } finally {
      setCorrigindo(false);
    }
  };

  const getCorCompetencia = (nota: number) => {
    if (nota >= 160) return '#10b981'; // Verde
    if (nota >= 120) return '#fbbf24'; // Amarelo
    if (nota >= 80) return '#f59e0b'; // Laranja
    return '#ef4444'; // Vermelho
  };

  const getCorNota = (notaFinal: number) => {
    if (notaFinal >= 900) return '#10b981';
    if (notaFinal >= 700) return '#fbbf24';
    if (notaFinal >= 500) return '#f59e0b';
    return '#ef4444';
  };

  const calcularFPGanho = (notaFinal: number) => {
    if (notaFinal >= 900) return 500;
    if (notaFinal >= 700) return 300;
    if (notaFinal >= 500) return 200;
    return 100;
  };

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
        <div>Carregando resultado...</div>
      </div>
    );
  }

  if (corrigindo) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Patrick Hand', cursive",
        padding: '40px'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '20px',
          animation: 'pulse 2s infinite'
        }}>
          🤖
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
          Corrigindo sua redação...
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: '500px' }}>
          Analisando as 5 competências ENEM com inteligência artificial. Isso pode levar alguns segundos.
        </p>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}</style>
      </div>
    );
  }

  if (!redacao) {
    return null;
  }

  const fpGanho = calcularFPGanho(redacao.notaFinal);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
      fontFamily: "'Patrick Hand', cursive"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header com Nota Final */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          border: `3px solid ${getCorNota(redacao.notaFinal)}`
        }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#fbbf24',
            marginBottom: '10px'
          }}>
            📝 Resultado da Correção
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '30px'
          }}>
            {redacao.proposta.tema}
          </p>

          <div style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            color: getCorNota(redacao.notaFinal),
            marginBottom: '20px'
          }}>
            {redacao.notaFinal}
          </div>

          <div style={{
            fontSize: '1.5rem',
            color: 'white',
            marginBottom: '30px'
          }}>
            de 1000 pontos
          </div>

          {/* FP Ganho */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(251, 191, 36, 0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '2px solid rgba(251, 191, 36, 0.3)'
          }}>
            <span style={{ fontSize: '1.25rem', color: 'white' }}>
              Você ganhou:
            </span>
            <FPCoin size="lg" value={fpGanho} showValue animate="gain" />
          </div>
        </div>

        {/* Gráfico de Competências */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          border: '2px solid rgba(251, 191, 36, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            color: '#fbbf24',
            marginBottom: '24px'
          }}>
            📊 Avaliação por Competência
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { num: 1, nome: 'Domínio da Norma Culta', nota: redacao.nota1 },
              { num: 2, nome: 'Compreender o Tema', nota: redacao.nota2 },
              { num: 3, nome: 'Seleção de Argumentos', nota: redacao.nota3 },
              { num: 4, nome: 'Coesão Textual', nota: redacao.nota4 },
              { num: 5, nome: 'Proposta de Intervenção', nota: redacao.nota5 }
            ].map(comp => (
              <div key={comp.num}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  color: 'white'
                }}>
                  <span style={{ fontWeight: 'bold' }}>
                    C{comp.num}: {comp.nome}
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: getCorCompetencia(comp.nota)
                  }}>
                    {comp.nota}/200
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '24px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(comp.nota / 200) * 100}%`,
                    height: '100%',
                    background: getCorCompetencia(comp.nota),
                    transition: 'width 1s ease-out',
                    borderRadius: '12px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Detalhado */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          border: '2px solid rgba(251, 191, 36, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            color: '#fbbf24',
            marginBottom: '24px'
          }}>
            💬 Feedback Detalhado
          </h2>

          <pre style={{
            fontFamily: "'Patrick Hand', cursive",
            color: 'white',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8',
            fontSize: '1rem'
          }}>
            {redacao.feedback}
          </pre>
        </div>

        {/* Seu Texto */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          border: '2px solid rgba(251, 191, 36, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            color: '#fbbf24',
            marginBottom: '24px'
          }}>
            📄 Seu Texto
          </h2>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '8px',
            color: 'white',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8',
            fontSize: '1.125rem',
            fontFamily: "'Georgia', serif"
          }}>
            {redacao.texto}
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => router.push('/enem/redacao')}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#1a1a2e',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Patrick Hand', cursive"
            }}
          >
            ✍️ Escrever Nova Redação
          </button>

          <button
            onClick={() => router.push('/enem/redacao/biblioteca')}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: '2px solid #fbbf24',
              background: 'transparent',
              color: '#fbbf24',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: "'Patrick Hand', cursive"
            }}
          >
            📚 Ver Redações Modelo
          </button>
        </div>
      </div>
    </div>
  );
}
