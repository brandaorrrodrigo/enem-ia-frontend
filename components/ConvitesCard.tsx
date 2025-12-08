'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FPCoin from './FPCoin';

// Sistema de Convites v2.1 - Animacoes Refinadas
// Estilo lousa verde com giz

interface Convite {
  id: string;
  codigo: string;
  criadorId: string;
  criadorNome: string;
  tipo: 'desafio1v1' | 'grupoEstudo';
  status: 'pendente' | 'aceito' | 'expirado';
  criadoEm: string;
  expiraEm: string;
  usadoPor?: string;
  usadoEm?: string;
  fpRecompensa: number;
}

interface ConvitesCardProps {
  plano?: 'lite' | 'pro' | 'premium';
  userId?: string;
  userName?: string;
}

export default function ConvitesCard({
  plano = 'lite',
  userId = 'user_demo',
  userName = 'Estudante'
}: ConvitesCardProps) {
  const [convitesUsados, setConvitesUsados] = useState(0);
  const [convitesExtras, setConvitesExtras] = useState(0);
  const [conviteGerado, setConviteGerado] = useState<Convite | null>(null);
  const [historico, setHistorico] = useState<Convite[]>([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState<'codigo' | 'link' | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [novoConvite, setNovoConvite] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [alertaLimite, setAlertaLimite] = useState(false);
  const historicoRef = useRef<HTMLDivElement>(null);
  const [historicoHeight, setHistoricoHeight] = useState(0);

  // Limites por plano
  const limites = {
    lite: 0,
    pro: 10,
    premium: 30
  };

  const limiteTotal = limites[plano] + convitesExtras;
  const convitesDisponiveis = limiteTotal - convitesUsados;
  const percentualUsado = limiteTotal > 0 ? (convitesUsados / limiteTotal) * 100 : 0;

  // Animacao de entrada do card com delay
  useEffect(() => {
    const timer = setTimeout(() => setCardVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedConvites = localStorage.getItem('convites_usados_mes');
    const savedExtras = localStorage.getItem('convites_extras');
    const savedHistorico = localStorage.getItem('convites_historico');

    if (savedConvites) setConvitesUsados(parseInt(savedConvites));
    if (savedExtras) setConvitesExtras(parseInt(savedExtras));
    if (savedHistorico) setHistorico(JSON.parse(savedHistorico));
  }, []);

  // Alerta quando >= 80% dos convites usados
  useEffect(() => {
    if (percentualUsado >= 80 && !alertaLimite && plano !== 'lite') {
      setAlertaLimite(true);
      setTimeout(() => setAlertaLimite(false), 500);
    }
  }, [percentualUsado, alertaLimite, plano]);

  // Medir altura do historico para animacao
  useEffect(() => {
    if (historicoRef.current) {
      setHistoricoHeight(historicoRef.current.scrollHeight);
    }
  }, [historico, mostrarHistorico]);

  // Gerar novo convite
  const gerarConvite = async () => {
    if (plano === 'lite' || convitesDisponiveis <= 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/convites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          criadorId: userId,
          criadorNome: userName,
          tipo: 'desafio1v1',
          plano,
          convitesUsadosMes: convitesUsados
        })
      });

      const data = await response.json();

      if (data.success && data.convite) {
        setConviteGerado(data.convite);
        setNovoConvite(true);
        setTimeout(() => setNovoConvite(false), 400);

        // Atualizar contadores
        const novosUsados = convitesUsados + 1;
        setConvitesUsados(novosUsados);
        localStorage.setItem('convites_usados_mes', String(novosUsados));

        // Adicionar ao historico
        const novoHistorico = [data.convite, ...historico].slice(0, 20);
        setHistorico(novoHistorico);
        localStorage.setItem('convites_historico', JSON.stringify(novoHistorico));
      }
    } catch (error) {
      console.error('Erro ao gerar convite:', error);
    }
    setLoading(false);
  };

  // Copiar para clipboard
  const copiar = async (tipo: 'codigo' | 'link') => {
    if (!conviteGerado) return;

    const texto = tipo === 'codigo'
      ? conviteGerado.codigo
      : `https://enem-pro.vercel.app/convite/${conviteGerado.codigo}`;

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);
      setTimeout(() => setCopiado(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  // Formatar data
  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Cor da barra baseada no percentual
  const getBarraColor = () => {
    if (percentualUsado >= 80) return 'var(--accent-pink)';
    if (percentualUsado >= 60) return '#f59e0b';
    return 'var(--accent-yellow)';
  };

  // Renderizar barra de progresso estilo giz
  const renderBarraProgresso = () => {
    const blocos = 10;
    const blocosPreenchidos = Math.round((percentualUsado / 100) * blocos);
    const corBarra = getBarraColor();

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <div
          style={{
            display: 'flex',
            gap: '3px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            letterSpacing: '1px'
          }}
        >
          {Array.from({ length: blocos }).map((_, i) => (
            <span
              key={i}
              style={{
                color: i < blocosPreenchidos ? corBarra : 'rgba(255,255,255,0.3)',
                textShadow: i < blocosPreenchidos ? `0 0 5px ${corBarra}` : 'none',
                transition: 'color 0.3s ease, text-shadow 0.3s ease',
                animation: alertaLimite && i < blocosPreenchidos ? 'barraPulse 0.5s ease-out' : 'none'
              }}
            >
              {i < blocosPreenchidos ? '\u2588' : '\u2591'}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '1rem',
            color: percentualUsado >= 80 ? 'var(--accent-pink)' : 'var(--chalk-dim)',
            transition: 'color 0.3s ease'
          }}
        >
          {convitesUsados}/{limiteTotal}
        </span>
      </div>
    );
  };

  // Card desabilitado para plano Lite
  if (plano === 'lite') {
    return (
      <div
        className="convites-card"
        style={{
          background: 'linear-gradient(180deg, rgba(40, 75, 55, 0.6) 0%, rgba(32, 62, 47, 0.6) 100%)',
          borderRadius: '4px',
          padding: '28px',
          marginBottom: '25px',
          position: 'relative',
          border: '3px solid rgba(26, 48, 37, 0.5)',
          boxShadow: `
            inset 0 2px 15px rgba(0,0,0,0.25),
            0 8px 32px rgba(0,0,0,0.35),
            0 0 0 12px rgba(139, 90, 43, 0.5),
            0 0 0 16px rgba(93, 58, 26, 0.5)
          `,
          opacity: cardVisible ? 0.7 : 0,
          transform: cardVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.45s ease-out, transform 0.45s ease-out'
        }}
      >
        {/* Icone de cadeado */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            opacity: 0.6
          }}
        >
          🔒
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <span style={{ fontSize: '2rem' }}>🎟️</span>
          <h3
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '1.6rem',
              color: 'var(--chalk-dim)',
              margin: 0
            }}
          >
            Convites para Desafios
          </h3>
        </div>

        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.15rem',
            color: 'var(--chalk-faint)',
            marginBottom: '20px',
            lineHeight: 1.6
          }}
        >
          Convites para desafios sao exclusivos dos planos pagos.
          <br />
          Com o ENEM PRO, voce pode desafiar amigos mesmo que eles nao assinem!
        </p>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.9rem',
              color: 'var(--chalk-dim)',
              background: 'rgba(255,255,255,0.08)',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--accent-yellow)' }}>PRO:</span> 10 convites/mes
          </span>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.9rem',
              color: 'var(--chalk-dim)',
              background: 'rgba(255,255,255,0.08)',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--accent-pink)' }}>Premium:</span> 30 convites/mes
          </span>
        </div>

        <Link href="/planos">
          <button
            className="btn btn-yellow lite-cta-btn"
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '14px',
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            Conhecer Planos
          </button>
        </Link>

        <style jsx>{`
          .lite-cta-btn {
            animation: litePulse 5s ease-in-out infinite;
          }
          @keyframes litePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
        `}</style>
      </div>
    );
  }

  // Card ativo para PRO e Premium
  return (
    <div
      className="convites-card"
      style={{
        background: 'linear-gradient(180deg, rgba(40, 75, 55, 0.95) 0%, rgba(32, 62, 47, 0.95) 100%)',
        borderRadius: '4px',
        padding: '28px',
        marginBottom: '25px',
        position: 'relative',
        border: '3px solid #1a3025',
        boxShadow: `
          inset 0 2px 15px rgba(0,0,0,0.25),
          inset 0 -2px 10px rgba(255,255,255,0.02),
          0 8px 32px rgba(0,0,0,0.35),
          0 0 0 12px var(--wood-light),
          0 0 0 16px var(--wood-dark),
          0 0 0 18px var(--wood-shadow),
          0 15px 40px rgba(0,0,0,0.25)
        `,
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.45s ease-out 0.15s, transform 0.45s ease-out 0.15s'
      }}
    >
      {/* Header do Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '2.2rem',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            🎟️
          </span>
          <div>
            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1.7rem',
                color: 'var(--accent-yellow)',
                margin: 0,
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
              }}
            >
              Convites para Desafios
            </h3>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.1rem',
                color: 'var(--chalk-dim)',
                margin: '4px 0 0 0'
              }}
            >
              Convide amigos para desafios em dupla, mesmo sem assinatura!
            </p>
          </div>
        </div>

        {/* Badge do Plano */}
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            color: plano === 'premium' ? '#1a3328' : 'var(--chalk-white)',
            background: plano === 'premium'
              ? 'linear-gradient(135deg, var(--accent-pink) 0%, #ff6b9d 100%)'
              : 'linear-gradient(135deg, var(--accent-yellow) 0%, #ffd700 100%)',
            padding: '6px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          {plano === 'premium' ? 'Premium' : 'PRO'}
        </span>
      </div>

      {/* Saldo e Limites */}
      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1.1rem',
                color: 'var(--chalk-dim)'
              }}
            >
              Convites deste mes:
            </span>
            {renderBarraProgresso()}
          </div>

          <div
            style={{
              textAlign: 'right'
            }}
          >
            <div
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '2rem',
                fontWeight: 700,
                color: convitesDisponiveis > 0 ? 'var(--accent-green)' : 'var(--accent-pink)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
              }}
            >
              {convitesDisponiveis}
            </div>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '0.95rem',
                color: 'var(--chalk-faint)'
              }}
            >
              disponiveis
            </span>
          </div>
        </div>

        {/* Convites Extras */}
        {convitesExtras > 0 && (
          <div
            style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px dashed rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🎁</span>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1rem',
                color: 'var(--accent-blue)'
              }}
            >
              Extras: {convitesExtras} convites adicionais
            </span>
          </div>
        )}
      </div>

      {/* Convite Gerado */}
      {conviteGerado && (
        <div
          className={novoConvite ? 'convite-gerado-pulse' : ''}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 235, 150, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)',
            border: novoConvite ? '2px solid rgba(255, 235, 150, 0.8)' : '2px solid var(--accent-yellow)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            opacity: 1,
            transform: 'translateY(0)',
            animation: 'conviteSlideIn 0.35s ease-out',
            transition: 'border-color 0.4s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <span style={{ fontSize: '1.3rem' }}>✨</span>
            <span
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1.2rem',
                color: 'var(--accent-yellow)'
              }}
            >
              Convite Gerado com Sucesso!
            </span>
          </div>

          {/* Codigo */}
          <div style={{ marginBottom: '12px' }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '0.95rem',
                color: 'var(--chalk-dim)'
              }}
            >
              Codigo do convite:
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '6px'
              }}
            >
              <code
                className={novoConvite ? 'codigo-pulse' : ''}
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--chalk-white)',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  letterSpacing: '3px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
                }}
              >
                {conviteGerado.codigo}
              </code>
              <button
                onClick={() => copiar('codigo')}
                style={{
                  background: copiado === 'codigo' ? 'var(--accent-green)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  transform: copiado === 'codigo' ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span>{copiado === 'codigo' ? '✓' : '📋'}</span>
                <span style={{ fontSize: '0.85rem' }}>
                  {copiado === 'codigo' ? 'Copiado!' : 'Copiar'}
                </span>
              </button>
            </div>
          </div>

          {/* Link */}
          <div style={{ marginBottom: '15px' }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '0.95rem',
                color: 'var(--chalk-dim)'
              }}
            >
              Link do desafio:
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '6px',
                flexWrap: 'wrap'
              }}
            >
              <code
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--accent-blue)',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  wordBreak: 'break-all',
                  flex: 1,
                  minWidth: '200px'
                }}
              >
                https://enem-pro.vercel.app/convite/{conviteGerado.codigo}
              </code>
              <button
                onClick={() => copiar('link')}
                style={{
                  background: copiado === 'link' ? 'var(--accent-green)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  transform: copiado === 'link' ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span>{copiado === 'link' ? '✓' : '🔗'}</span>
                <span style={{ fontSize: '0.85rem' }}>
                  {copiado === 'link' ? 'Copiado!' : 'Copiar'}
                </span>
              </button>
            </div>
          </div>

          {/* Instrucao */}
          <p
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1rem',
              color: 'var(--accent-yellow)',
              margin: 0,
              paddingTop: '10px',
              borderTop: '1px dashed rgba(255,235,150,0.3)'
            }}
          >
            💡 Envie este codigo ou link para seu amigo. Ele podera aceitar o desafio mesmo sem assinar o ENEM PRO!
          </p>
        </div>
      )}

      {/* Botoes de Acao */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={gerarConvite}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => { setBtnHover(false); setBtnActive(false); }}
          onMouseDown={() => setBtnActive(true)}
          onMouseUp={() => setBtnActive(false)}
          disabled={loading || convitesDisponiveis <= 0}
          className="btn btn-yellow"
          style={{
            flex: 1,
            minWidth: '180px',
            padding: '14px 20px',
            fontSize: '1.05rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: (loading || convitesDisponiveis <= 0) ? 0.6 : 1,
            cursor: (loading || convitesDisponiveis <= 0) ? 'not-allowed' : 'pointer',
            transform: btnActive
              ? 'scale(0.97)'
              : btnHover && !(loading || convitesDisponiveis <= 0)
                ? 'scale(1.03)'
                : 'scale(1)',
            transition: 'transform 0.1s ease-out, background 0.2s ease',
            background: btnHover && !(loading || convitesDisponiveis <= 0)
              ? 'linear-gradient(135deg, #fff3b0 0%, #ffd700 50%, #ffeb96 100%)'
              : undefined
          }}
        >
          {loading ? (
            <>
              <span className="spinner" style={{ width: '18px', height: '18px' }} />
              Gerando...
            </>
          ) : (
            <>
              <span>🎯</span>
              Gerar Codigo de Convite
            </>
          )}
        </button>

        <button
          onClick={() => setMostrarHistorico(!mostrarHistorico)}
          className="btn"
          style={{
            padding: '14px 20px',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.15s ease, background 0.2s ease'
          }}
        >
          <span style={{
            transform: mostrarHistorico ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            display: 'inline-block'
          }}>
            {mostrarHistorico ? '📋' : '📋'}
          </span>
          {mostrarHistorico ? 'Ocultar' : 'Ver'} Historico
        </button>
      </div>

      {/* Info de FP */}
      <div
        style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '2px dashed rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FPCoin size="sm" />
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1rem',
              color: 'var(--chalk-dim)'
            }}
          >
            Convite extra na Loja:
          </span>
          <FPCoin size="sm" value={400} showValue />
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1rem',
              color: 'var(--chalk-dim)'
            }}
          >
            por 5 convites
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.9rem' }}>🏆</span>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1rem',
              color: 'var(--accent-green)'
            }}
          >
            +25 FP ao completar desafio!
          </span>
        </div>
      </div>

      {/* Historico de Convites com animacao de colapso */}
      <div
        style={{
          marginTop: '20px',
          overflow: 'hidden',
          maxHeight: mostrarHistorico ? `${historicoHeight + 50}px` : '0px',
          opacity: mostrarHistorico ? 1 : 0,
          transition: 'max-height 0.35s ease-out, opacity 0.25s ease-out'
        }}
      >
        <div
          ref={historicoRef}
          style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '18px'
          }}
        >
          <h4
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '1.3rem',
              color: 'var(--chalk-white)',
              margin: '0 0 15px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>📜</span>
            Historico de Convites
          </h4>

          {historico.length === 0 ? (
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.1rem',
                color: 'var(--chalk-faint)',
                textAlign: 'center',
                padding: '20px'
              }}
            >
              Nenhum convite gerado ainda. Crie seu primeiro convite!
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem'
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '2px dashed rgba(255,255,255,0.2)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--chalk-dim)' }}>Codigo</th>
                    <th style={{ textAlign: 'center', padding: '10px 8px', color: 'var(--chalk-dim)' }}>Status</th>
                    <th style={{ textAlign: 'center', padding: '10px 8px', color: 'var(--chalk-dim)' }}>Data</th>
                    <th style={{ textAlign: 'right', padding: '10px 8px', color: 'var(--chalk-dim)' }}>FP</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((conv, index) => (
                    <tr
                      key={conv.id}
                      style={{
                        borderBottom: '1px dashed rgba(255,255,255,0.1)',
                        opacity: mostrarHistorico ? 1 : 0,
                        transform: mostrarHistorico ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`
                      }}
                    >
                      <td style={{ padding: '12px 8px' }}>
                        <code
                          style={{
                            fontFamily: "'Patrick Hand', cursive",
                            fontSize: '1rem',
                            color: 'var(--accent-blue)',
                            letterSpacing: '1px'
                          }}
                        >
                          {conv.codigo}
                        </code>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background:
                              conv.status === 'aceito'
                                ? 'rgba(180, 255, 200, 0.2)'
                                : conv.status === 'expirado'
                                  ? 'rgba(255, 180, 200, 0.2)'
                                  : 'rgba(255, 235, 150, 0.2)',
                            color:
                              conv.status === 'aceito'
                                ? 'var(--accent-green)'
                                : conv.status === 'expirado'
                                  ? 'var(--accent-pink)'
                                  : 'var(--accent-yellow)'
                          }}
                        >
                          {conv.status === 'aceito' ? '✓ Aceito' : conv.status === 'expirado' ? '✕ Expirado' : '⏳ Pendente'}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          textAlign: 'center',
                          color: 'var(--chalk-dim)',
                          fontSize: '0.85rem'
                        }}
                      >
                        {formatarData(conv.criadoEm)}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                        {conv.status === 'aceito' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: 'var(--accent-green)'
                            }}
                          >
                            <FPCoin size="sm" />
                            +{conv.fpRecompensa}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--chalk-faint)' }}>--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes conviteSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes barraPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .convite-gerado-pulse {
          animation: borderPulse 0.4s ease-out;
        }
        @keyframes borderPulse {
          0% { border-color: var(--accent-yellow); }
          50% { border-color: rgba(255, 255, 255, 0.9); }
          100% { border-color: var(--accent-yellow); }
        }
        .codigo-pulse {
          animation: codigoPulse 0.2s ease-out;
        }
        @keyframes codigoPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
