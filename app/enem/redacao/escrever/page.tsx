'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function EditorRedacao() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propostaId = searchParams.get('proposta');

  const [proposta, setProposta] = useState<any>(null);
  const [texto, setTexto] = useState('');
  const [redacaoId, setRedacaoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Timer
  const [tempoRestante, setTempoRestante] = useState(30 * 60); // 30 minutos em segundos
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [timerIniciado, setTimerIniciado] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Carregar proposta
  useEffect(() => {
    if (!propostaId) {
      router.push('/enem/redacao');
      return;
    }

    carregarProposta();
  }, [propostaId]);

  const carregarProposta = async () => {
    try {
      const res = await fetch('/api/redacao/propostas');
      const data = await res.json();

      if (data.success) {
        const propostaEncontrada = data.propostas.find((p: any) => p.id === propostaId);
        if (propostaEncontrada) {
          setProposta(propostaEncontrada);
        } else {
          router.push('/enem/redacao');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar proposta:', error);
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!timerAtivo || tempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          setTimerAtivo(false);
          alert('⏰ Tempo esgotado! A redação será salva automaticamente.');
          salvarRedacao();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerAtivo, tempoRestante]);

  // Auto-save a cada 10 segundos
  useEffect(() => {
    if (!texto || !propostaId) return;

    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current);
    }

    autoSaveRef.current = setTimeout(() => {
      salvarRascunho();
    }, 10000); // 10 segundos

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [texto]);

  const salvarRascunho = async () => {
    if (!propostaId || !texto.trim()) return;

    try {
      setSalvando(true);

      if (redacaoId) {
        // Atualizar
        await fetch('/api/redacao/minhas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: redacaoId, texto })
        });
      } else {
        // Criar nova
        const res = await fetch('/api/redacao/minhas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuarioId: 'user_demo', // TODO: Pegar do contexto de autenticação
            propostaId,
            texto
          })
        });

        const data = await res.json();
        if (data.success && data.redacao) {
          setRedacaoId(data.redacao.id);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
    } finally {
      setSalvando(false);
    }
  };

  const salvarRedacao = async () => {
    await salvarRascunho();
    alert('✅ Redação salva com sucesso!');
  };

  const enviarParaCorrecao = async () => {
    if (!redacaoId) {
      await salvarRascunho();
    }

    if (redacaoId) {
      try {
        await fetch('/api/redacao/minhas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: redacaoId, status: 'enviada' })
        });

        alert('📝 Redação enviada para correção! Em breve você receberá seu feedback.');
        router.push('/enem/redacao');
      } catch (error) {
        console.error('Erro ao enviar redação:', error);
      }
    }
  };

  const iniciarTimer = () => {
    setTimerAtivo(true);
    setTimerIniciado(true);
  };

  const pausarTimer = () => {
    setTimerAtivo(false);
  };

  const resetarTimer = () => {
    setTempoRestante(30 * 60);
    setTimerAtivo(false);
    setTimerIniciado(false);
  };

  // Calcular linhas e palavras
  const linhas = texto.split('\n').length;
  const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const caracteres = texto.length;

  // Formatar tempo
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  const tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

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
        <div>Carregando proposta...</div>
      </div>
    );
  }

  if (!proposta) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      fontFamily: "'Patrick Hand', cursive"
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header com Timer */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              color: '#fbbf24',
              marginBottom: '8px'
            }}>
              ENEM {proposta.ano} - {proposta.edicao}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1rem',
              margin: 0
            }}>
              {proposta.tema}
            </p>
          </div>

          {/* Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: tempoRestante < 300 ? '#ef4444' : '#fbbf24',
              fontFamily: "'Courier New', monospace"
            }}>
              ⏱️ {tempoFormatado}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {!timerIniciado && (
                <button
                  onClick={iniciarTimer}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  ▶️ Iniciar
                </button>
              )}
              {timerIniciado && (
                <>
                  <button
                    onClick={timerAtivo ? pausarTimer : iniciarTimer}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: timerAtivo ? '#f59e0b' : '#10b981',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {timerAtivo ? '⏸️ Pausar' : '▶️ Continuar'}
                  </button>
                  <button
                    onClick={resetarTimer}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#ef4444',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    🔄 Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '20px'
        }}>
          {/* Editor */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(251, 191, 36, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.875rem'
            }}>
              <div>
                <span style={{ color: linhas < 8 ? '#ef4444' : linhas > 30 ? '#ef4444' : '#10b981' }}>
                  📏 {linhas} linhas
                </span>
                {linhas < 8 && <span style={{ color: '#ef4444', marginLeft: '8px' }}>(mínimo: 8)</span>}
                {linhas > 30 && <span style={{ color: '#ef4444', marginLeft: '8px' }}>(máximo: 30)</span>}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>💬 {palavras} palavras</span>
                <span>🔤 {caracteres} caracteres</span>
                {salvando && <span style={{ color: '#fbbf24' }}>💾 Salvando...</span>}
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Comece a escrever sua redação aqui..."
              style={{
                width: '100%',
                minHeight: '600px',
                padding: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1.125rem',
                lineHeight: '1.8',
                fontFamily: "'Georgia', serif",
                resize: 'vertical'
              }}
            />

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px'
            }}>
              <button
                onClick={salvarRedacao}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                💾 Salvar Rascunho
              </button>
              <button
                onClick={enviarParaCorrecao}
                disabled={linhas < 8 || linhas > 30}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: (linhas < 8 || linhas > 30)
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: (linhas < 8 || linhas > 30) ? 'rgba(255,255,255,0.3)' : '#1a1a2e',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: (linhas < 8 || linhas > 30) ? 'not-allowed' : 'pointer',
                  opacity: (linhas < 8 || linhas > 30) ? 0.5 : 1
                }}
              >
                📝 Enviar para Correção
              </button>
            </div>
          </div>

          {/* Sidebar com Proposta */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(251, 191, 36, 0.2)',
            maxHeight: '800px',
            overflowY: 'auto'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#fbbf24',
              marginBottom: '16px'
            }}>
              📋 Proposta
            </h2>

            <div style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'white' }}>
                Tema:
              </h3>
              <p style={{ marginBottom: '24px', fontSize: '1.125rem', fontWeight: 'bold' }}>
                {proposta.tema}
              </p>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'white' }}>
                Requisitos:
              </h3>
              <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                {proposta.requisitos.map((req: string, index: number) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                ))}
              </ul>

              {proposta.orientacoesEspecificas && (
                <>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'white' }}>
                    Orientações:
                  </h3>
                  <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                    {proposta.orientacoesEspecificas.map((or: string, index: number) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{or}</li>
                    ))}
                  </ul>
                </>
              )}

              {proposta.textosMotivadores && proposta.textosMotivadores.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'white' }}>
                    Textos Motivadores:
                  </h3>
                  {proposta.textosMotivadores.map((texto: any, index: number) => (
                    <div key={index} style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      fontSize: '0.875rem'
                    }}>
                      <strong>{texto.tipo}</strong>
                      {texto.fonte && <div>Fonte: {texto.fonte}</div>}
                      {texto.resumo && <div style={{ marginTop: '8px' }}>{texto.resumo}</div>}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EscreverPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EditorRedacao />
    </Suspense>
  );
}
