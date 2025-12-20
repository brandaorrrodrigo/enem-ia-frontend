'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ConvitesCard from '@/components/ConvitesCard';
import SeasonPassCard from '@/components/SeasonPassCard';
import { Season, PlayerSeasonProgress, SeasonChallenge, SeasonReward } from '@/lib/season/types';

export default function ENEMHomePage() {
  const [streak, setStreak] = useState(7);
  const [fp, setFp] = useState(2450);
  const [rank, setRank] = useState(234);
  const [showNotification, setShowNotification] = useState(false);
  const [rankingDrop, setRankingDrop] = useState<number | null>(null);
  const [metaTempo, setMetaTempo] = useState(120);
  const [progressoMeta, setProgressoMeta] = useState(45);
  const [planoUsuario, setPlanoUsuario] = useState<'lite' | 'pro' | 'premium'>('pro');

  // Season Pass state
  const [season, setSeason] = useState<Season | null>(null);
  const [seasonProgress, setSeasonProgress] = useState<PlayerSeasonProgress | null>(null);
  const [seasonDesafios, setSeasonDesafios] = useState<SeasonChallenge[]>([]);
  const [seasonRecompensas, setSeasonRecompensas] = useState<SeasonReward[]>([]);
  const [seasonTempoRestante, setSeasonTempoRestante] = useState(0);

  // Fechar popup de ranking
  const fecharNotificacao = () => {
    setShowNotification(false);
    // Marcar como visto nesta sessao
    sessionStorage.setItem('ranking_notification_dismissed', 'true');
  };

  useEffect(() => {
    // Carregar dados do localStorage
    const fpTotal = parseInt(localStorage.getItem('fp_total') || '2450');
    const streakDias = parseInt(localStorage.getItem('streak_dias') || '7');
    const metaSalva = parseInt(localStorage.getItem('meta_tempo') || '120');
    const planoSalvo = localStorage.getItem('plano_usuario') as 'lite' | 'pro' | 'premium' | null;
    setFp(fpTotal);
    setStreak(streakDias);
    setMetaTempo(metaSalva);
    if (planoSalvo) setPlanoUsuario(planoSalvo);

    // Verificar se houve queda no ranking (logica contextual)
    const ultimaPosicao = parseInt(localStorage.getItem('ultima_posicao_ranking') || '0');
    const posicaoAtual = parseInt(localStorage.getItem('posicao_ranking') || '234');
    setRank(posicaoAtual);

    // So mostra notificacao se:
    // 1. Houve queda no ranking (posicao atual > posicao anterior)
    // 2. Nao foi dismissada nesta sessao
    // 3. E a primeira vez que o usuario ve a pagina nesta sessao
    const jaDismissada = sessionStorage.getItem('ranking_notification_dismissed') === 'true';
    const jaViuNestaSessao = sessionStorage.getItem('ranking_notification_shown') === 'true';

    if (ultimaPosicao > 0 && posicaoAtual > ultimaPosicao && !jaDismissada && !jaViuNestaSessao) {
      const queda = posicaoAtual - ultimaPosicao;
      setRankingDrop(queda);
      // Mostrar notificacao apos 2 segundos
      const timer = setTimeout(() => {
        setShowNotification(true);
        sessionStorage.setItem('ranking_notification_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Salvar posicao atual como ultima posicao para proxima verificacao
    localStorage.setItem('ultima_posicao_ranking', String(posicaoAtual));

    // Carregar dados do Season Pass
    loadSeasonData();
  }, []);

  const loadSeasonData = async () => {
    try {
      const playerId = 'player_demo_1';

      // Carregar info da temporada
      const infoRes = await fetch(`/api/season?action=info&playerId=${playerId}`);
      const infoData = await infoRes.json();

      if (infoData.success) {
        setSeason(infoData.season);
        setSeasonProgress(infoData.progresso);
        setSeasonTempoRestante(infoData.tempoRestante);
      }

      // Carregar desafios ativos
      const desafiosRes = await fetch(`/api/season?action=desafios&playerId=${playerId}`);
      const desafiosData = await desafiosRes.json();

      if (desafiosData.success) {
        setSeasonDesafios(desafiosData.desafios);
      }

      // Carregar recompensas
      const recompensasRes = await fetch(`/api/season?action=recompensas&playerId=${playerId}`);
      const recompensasData = await recompensasRes.json();

      if (recompensasData.success) {
        // Pegar as proximas 4 recompensas disponiveis
        const allRewards = [...recompensasData.free, ...recompensasData.premium];
        const nextRewards = allRewards
          .filter((r: SeasonReward) => r.status !== 'claimed')
          .slice(0, 4);
        setSeasonRecompensas(nextRewards);
      }
    } catch (error) {
      console.error('Erro ao carregar Season Pass:', error);
    }
  };

  const setarMeta = (minutos: number) => {
    setMetaTempo(minutos);
    // Salvar no localStorage
    localStorage.setItem('meta_tempo', String(minutos));
    alert(`Meta definida: ${minutos >= 60 ? Math.floor(minutos / 60) + 'h' + (minutos % 60 > 0 ? ' ' + (minutos % 60) + 'min' : '') : minutos + ' min'} de estudo hoje!`);
  };

  return (
    <div className="container">
      {/* Header com Logo e Stats */}
      <div className="stats-bar" style={{ marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '2rem' }}>🎓</span>
          <div className="logo">ENEM Pro</div>
        </div>
        <div className="user-info">
          <div className="stat-item">
            <span>🔥 Sequencia:</span>
            <span className="stat-value">{streak}</span>
          </div>
          <div className="stat-item">
            <span>⭐ FP:</span>
            <span className="stat-value">{fp.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span>🏆 Rank:</span>
            <span className="stat-value">#{rank}</span>
          </div>
        </div>
      </div>

      {/* Notificacao de Queda no Ranking (contextual, fechavel) */}
      {showNotification && rankingDrop && (
        <div
          className="notification"
          style={{
            position: 'relative',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Botao X para fechar */}
          <button
            onClick={fecharNotificacao}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'var(--chalk-white)',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            aria-label="Fechar notificacao"
          >
            ✕
          </button>
          <div className="notification-icon">📉</div>
          <div className="notification-title">Voce caiu no ranking!</div>
          <div className="notification-text">
            Voce caiu {rankingDrop} {rankingDrop === 1 ? 'posicao' : 'posicoes'}! Faca um simulado agora para recuperar sua posicao!
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link href="/enem/simulado" style={{ flex: 1 }}>
              <button className="btn btn-yellow w-full">Fazer Simulado Agora!</button>
            </Link>
            <button
              className="btn"
              onClick={fecharNotificacao}
              style={{ padding: '0.5rem 1rem' }}
            >
              Depois
            </button>
          </div>
        </div>
      )}

      {/* Meta Diaria */}
      <div className="card">
        <h2 className="card-title">📅 Sua Meta de Hoje</h2>
        <p style={{ marginBottom: '1rem' }}>Configure quanto tempo voce quer estudar hoje:</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button className="btn" onClick={() => setarMeta(30)}>30 min</button>
          <button className="btn" onClick={() => setarMeta(60)}>1 hora</button>
          <button className="btn btn-yellow" onClick={() => setarMeta(120)}>2 horas</button>
          <button className="btn" onClick={() => setarMeta(180)}>3 horas</button>
          <button className="btn" onClick={() => setarMeta(240)}>4 horas</button>
        </div>

        <div>
          <strong>Meta atual: {metaTempo >= 60 ? Math.floor(metaTempo / 60) + 'h' + (metaTempo % 60 > 0 ? ' ' + (metaTempo % 60) + 'min' : '') : metaTempo + ' min'}</strong>
          <div className="challenge-progress" style={{ marginTop: '1rem' }}>
            <div className="challenge-progress-bar" style={{ width: `${progressoMeta}%` }}>
              {progressoMeta}% ({Math.floor(metaTempo * progressoMeta / 100)} min de {metaTempo} min)
            </div>
          </div>
        </div>
      </div>

      {/* Desafios */}
      <div className="card">
        <h2 className="card-title">🏆 Desafios Ativos</h2>

        <div className="challenge-card">
          <div className="challenge-title">⚡ Desafio Diario</div>
          <p>Complete 5 Pomodoros hoje</p>
          <div className="challenge-progress">
            <div className="challenge-progress-bar" style={{ width: '60%' }}>3/5</div>
          </div>
        </div>

        <div className="challenge-card">
          <div className="challenge-title">📚 Desafio Semanal</div>
          <p>Estude todas as materias esta semana</p>
          <div className="challenge-progress">
            <div className="challenge-progress-bar" style={{ width: '71%' }}>10/14 materias</div>
          </div>
        </div>

        <div className="challenge-card">
          <div className="challenge-title">🎯 Desafio Relampago</div>
          <p>Acerte 20 questoes de Matematica sem errar</p>
          <div className="challenge-progress">
            <div className="challenge-progress-bar" style={{ width: '75%' }}>15/20</div>
          </div>
        </div>
      </div>

      {/* Season Pass Card */}
      {season && seasonProgress && (
        <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'transparent', border: 'none' }}>
          <SeasonPassCard
            season={season}
            progress={seasonProgress}
            desafiosAtivos={seasonDesafios}
            proximasRecompensas={seasonRecompensas}
            tempoRestante={seasonTempoRestante}
            compact
          />
        </div>
      )}

      {/* Sistema de Convites para Desafios */}
      <ConvitesCard
        plano={planoUsuario}
        userId="user_demo"
        userName="Estudante ENEM"
      />

      {/* Grupos de Estudo */}
      <div className="card">
        <h2 className="card-title">👥 Grupos de Estudo</h2>
        <p style={{ marginBottom: '1.5rem' }}>Estude em grupo e conquiste metas juntos!</p>

        <div className="cards-grid">
          <div className="group-card">
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>🔢 Exatas Master</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Grupo focado em Matematica e Fisica</p>
            <div className="group-members">
              <div className="member-avatar">👨</div>
              <div className="member-avatar">👩</div>
              <div className="member-avatar">🧑</div>
              <div className="member-avatar">👨</div>
              <div className="member-avatar">+12</div>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Meta do grupo: 500 Pomodoros essa semana (78%)
            </div>
          </div>

          <div className="group-card">
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>📖 Humanas Pro</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Historia, Geografia e Filosofia</p>
            <div className="group-members">
              <div className="member-avatar">👩</div>
              <div className="member-avatar">🧑</div>
              <div className="member-avatar">👨</div>
              <div className="member-avatar">+8</div>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Meta do grupo: 300 questoes resolvidas (92%)
            </div>
          </div>

          <div className="group-card" style={{ background: 'rgba(255, 235, 150, 0.15)', borderColor: 'var(--accent-yellow)' }}>
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>+</div>
              <h3 style={{ color: 'var(--accent-yellow)' }}>Criar Novo Grupo</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div className="card">
        <h2 className="card-title">🏅 Ranking Semanal</h2>

        <div className="ranking-item" style={{ background: 'rgba(255, 215, 0, 0.2)', border: '2px solid var(--accent-yellow)' }}>
          <div className="ranking-position">🥇</div>
          <div className="ranking-user">
            <div style={{ fontWeight: 700 }}>Joao Silva</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Sequencia de 21 dias</div>
          </div>
          <div className="ranking-score">8.450 FP</div>
        </div>

        <div className="ranking-item" style={{ background: 'rgba(192, 192, 192, 0.2)' }}>
          <div className="ranking-position">🥈</div>
          <div className="ranking-user">
            <div style={{ fontWeight: 700 }}>Maria Santos</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>145 Pomodoros esta semana</div>
          </div>
          <div className="ranking-score">7.890 FP</div>
        </div>

        <div className="ranking-item" style={{ background: 'rgba(205, 127, 50, 0.2)' }}>
          <div className="ranking-position">🥉</div>
          <div className="ranking-user">
            <div style={{ fontWeight: 700 }}>Pedro Costa</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>98% de acertos</div>
          </div>
          <div className="ranking-score">7.120 FP</div>
        </div>

        <div style={{ textAlign: 'center', margin: '1.5rem 0', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Sua posicao atual:</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-yellow)' }}>#{rank} ⬇️ -3 posicoes</div>
        </div>

        <Link href="/enem/ranking">
          <button className="btn btn-yellow w-full">Ver Ranking Completo</button>
        </Link>
      </div>

      {/* Acesso Rapido */}
      <div className="category">
        <div className="category-title">
          <span>🚀</span>
          Acesso Rapido
        </div>

        <div className="cards-grid">
          <Link href="/enem/simulado" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
            <h3>Simulado</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Questoes reais do ENEM</p>
          </Link>

          <Link href="/enem/quiz-diario" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3>Quiz Diario</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>5 questoes + streak</p>
          </Link>

          <Link href="/enem/pomodoro" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍅</div>
            <h3>Pomodoro</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Timer de foco</p>
          </Link>

          <Link href="/enem/dashboard" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
            <h3>Dashboard</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Seu progresso</p>
          </Link>

          <Link href="/enem/chatbot" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤖</div>
            <h3>Chatbot IA</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Tire duvidas</p>
          </Link>

          <Link href="/enem/biblioteca" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
            <h3>Biblioteca</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>E-books e PDFs</p>
          </Link>

          <Link href="/enem/desafios" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
            <h3>Desafios</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Ganhe FP</p>
          </Link>

          <Link href="/enem/loja" className="chalkboard-card text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
            <h3>Loja</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Troque seus pontos</p>
          </Link>

          <Link href="/enem/temporada" className="chalkboard-card text-center" style={{ background: 'rgba(251, 191, 36, 0.15)', borderColor: 'var(--accent-yellow)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
            <h3>Temporada</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Season Pass</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p><strong>ENEM Pro</strong> - Estude com Inteligencia</p>
        <p style={{ marginTop: '10px' }}>
          <Link href="/">Voltar ao Inicio</Link>
        </p>
      </footer>
    </div>
  );
}
