'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  // Contagem regressiva para o ENEM 2025 (9 de novembro de 2025)
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null);
  const [horasRestantes, setHorasRestantes] = useState<number>(0);
  const [minutosRestantes, setMinutosRestantes] = useState<number>(0);
  const [segundosRestantes, setSegundosRestantes] = useState<number>(0);

  useEffect(() => {
    // Data do ENEM 2025 - Primeiro dia (9 de novembro de 2025)
    const dataENEM = new Date('2025-11-09T08:00:00-03:00');

    const calcularContagem = () => {
      const agora = new Date();
      const diferenca = dataENEM.getTime() - agora.getTime();

      if (diferenca <= 0) {
        setDiasRestantes(0);
        setHorasRestantes(0);
        setMinutosRestantes(0);
        setSegundosRestantes(0);
        return;
      }

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      setDiasRestantes(dias);
      setHorasRestantes(horas);
      setMinutosRestantes(minutos);
      setSegundosRestantes(segundos);
    };

    // Calcular imediatamente
    calcularContagem();

    // Atualizar a cada segundo
    const intervalo = setInterval(calcularContagem, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>ENEM Pro - Sistema Completo de Preparação</h1>
        <p>Tudo que você precisa para conquistar sua aprovação!</p>
      </div>

      {/* Estatisticas */}
      <div className="stats-bar">
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">24</div>
          <div className="stat-label">Modulos Completos</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">150+</div>
          <div className="stat-label">Ebooks Disponiveis</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number" style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
            {diasRestantes !== null ? diasRestantes : '--'}
          </div>
          <div className="stat-label">Dias ate o ENEM</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">100K+</div>
          <div className="stat-label">Questoes</div>
        </div>
      </div>

      {/* Contagem Regressiva Detalhada */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 217, 102, 0.15) 0%, rgba(255, 179, 71, 0.1) 100%)',
          border: '2px solid var(--accent-yellow)',
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <h2 style={{
          color: 'var(--accent-yellow)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-kalam)',
          fontSize: '1.5rem'
        }}>
          ⏰ Contagem Regressiva para o ENEM 2025
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)'
            }}>
              {diasRestantes !== null ? diasRestantes : '--'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--chalk-dim)' }}>dias</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)'
            }}>
              {horasRestantes.toString().padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--chalk-dim)' }}>horas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)'
            }}>
              {minutosRestantes.toString().padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--chalk-dim)' }}>minutos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--accent-yellow)',
              fontFamily: 'var(--font-kalam)'
            }}>
              {segundosRestantes.toString().padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--chalk-dim)' }}>segundos</div>
          </div>
        </div>
        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.9rem' }}>
          ENEM 2025: 9 e 10 de novembro | Cada segundo conta!
        </p>
      </div>

      {/* Categoria 1: Conteudo e Estudo */}
      <div className="category">
        <div className="category-title">
          <span>📚</span>
          Conteudo e Materiais de Estudo
        </div>
        <div className="cards-grid">
          <Link href="/enem/videoaulas" className="chalkboard-card">
            <div className="card-icon">🎥</div>
            <div className="card-title">Videoaulas</div>
            <div className="card-description">Aulas em video de todas as disciplinas com os melhores professores</div>
          </Link>

          <Link href="/enem/biblioteca" className="chalkboard-card">
            <div className="card-icon">📚</div>
            <div className="card-title">Biblioteca de Ebooks</div>
            <div className="card-description">150+ ebooks gratuitos para consulta e download</div>
          </Link>

          <Link href="/enem/materiais" className="chalkboard-card">
            <div className="card-icon">📖</div>
            <div className="card-title">Materiais de Estudo</div>
            <div className="card-description">PDFs, resumos, mapas mentais e apostilas completas</div>
          </Link>

          <Link href="/enem/questoes-comentadas" className="chalkboard-card">
            <div className="card-icon">❓</div>
            <div className="card-title">Questoes Comentadas</div>
            <div className="card-description">Milhares de questoes com resolucao detalhada</div>
          </Link>

          <Link href="/enem/simulado" className="chalkboard-card">
            <div className="card-icon">📝</div>
            <div className="card-title">Simulados Online</div>
            <div className="card-description">Simule a prova real e avalie seu desempenho</div>
          </Link>

          <Link href="/enem/chatbot" className="chalkboard-card">
            <div className="card-icon">🤖</div>
            <div className="card-title">ChatBot Assistente</div>
            <div className="card-description">Tire suas duvidas com nosso assistente virtual inteligente</div>
          </Link>

          <Link href="/enem/gerador-questoes" className="chalkboard-card">
            <div className="card-icon">🎯</div>
            <div className="card-title">Gerador de Questoes IA</div>
            <div className="card-description">Questoes personalizadas geradas automaticamente pela IA</div>
          </Link>

          <Link href="/enem/conquistas" className="chalkboard-card">
            <div className="card-icon">🏆</div>
            <div className="card-title">Gamificacao e Pontos</div>
            <div className="card-description">Ganhe pontos, conquiste badges e suba no ranking estudando!</div>
          </Link>
        </div>
      </div>

      {/* Categoria 2: Organizacao */}
      <div className="category">
        <div className="category-title">
          <span>⏰</span>
          Organizacao e Planejamento
        </div>
        <div className="cards-grid">
          <Link href="/enem/cronograma" className="chalkboard-card">
            <div className="card-icon">📅</div>
            <div className="card-title">Cronograma de Estudos</div>
            <div className="card-description">Planeje suas semanas de estudo de forma eficiente</div>
          </Link>

          <Link href="/enem/gestao-tempo" className="chalkboard-card">
            <div className="card-icon">⏱️</div>
            <div className="card-title">Gestao de Tempo</div>
            <div className="card-description">Tecnicas para otimizar seu tempo de estudo</div>
          </Link>

          <Link href="/enem/calendario" className="chalkboard-card">
            <div className="card-icon">🗓️</div>
            <div className="card-title">Calendario de Provas</div>
            <div className="card-description">Todas as datas importantes do ENEM</div>
          </Link>

          <Link href="/enem/ferramentas" className="chalkboard-card">
            <div className="card-icon">💻</div>
            <div className="card-title">Ferramentas Tecnologicas</div>
            <div className="card-description">Apps e sites para turbinar seus estudos</div>
          </Link>
        </div>
      </div>

      {/* Categoria 3: Tecnicas de Estudo */}
      <div className="category">
        <div className="category-title">
          <span>🧠</span>
          Tecnicas e Metodos de Estudo
        </div>
        <div className="cards-grid">
          <Link href="/enem/tecnicas" className="chalkboard-card">
            <div className="card-icon">💡</div>
            <div className="card-title">Tecnicas de Memorizacao</div>
            <div className="card-description">Memorize melhor e retenha mais conteudo</div>
          </Link>

          <Link href="/enem/analisador-redacao" className="chalkboard-card">
            <div className="card-icon">✍️</div>
            <div className="card-title">Sistema de Redacao</div>
            <div className="card-description">Domine a redacao nota 1000 do ENEM</div>
          </Link>

          <Link href="/enem/amigos" className="chalkboard-card">
            <div className="card-icon">👥</div>
            <div className="card-title">Grupos de Estudo</div>
            <div className="card-description">Estude em grupo e compartilhe conhecimento</div>
          </Link>

          <Link href="/enem/pomodoro" className="chalkboard-card">
            <div className="card-icon">🍅</div>
            <div className="card-title">Pomodoro Timer</div>
            <div className="card-description">Tecnica de foco para estudos mais produtivos</div>
          </Link>
        </div>
      </div>

      {/* Categoria 4: Desempenho */}
      <div className="category">
        <div className="category-title">
          <span>📊</span>
          Desempenho e Estatisticas
        </div>
        <div className="cards-grid">
          <Link href="/enem/dashboard" className="chalkboard-card">
            <div className="card-icon">📈</div>
            <div className="card-title">Dashboard</div>
            <div className="card-description">Acompanhe seu progresso e evolucao</div>
          </Link>

          <Link href="/enem/estatisticas" className="chalkboard-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Estatisticas Detalhadas</div>
            <div className="card-description">Analise seu desempenho por materia</div>
          </Link>

          <Link href="/enem/ranking" className="chalkboard-card">
            <div className="card-icon">🥇</div>
            <div className="card-title">Ranking</div>
            <div className="card-description">Compare seu desempenho com outros estudantes</div>
          </Link>

          <Link href="/enem/perfil" className="chalkboard-card">
            <div className="card-icon">👤</div>
            <div className="card-title">Meu Perfil</div>
            <div className="card-description">Suas conquistas, badges e historico</div>
          </Link>
        </div>
      </div>

      {/* Categoria 5: Extras */}
      <div className="category">
        <div className="category-title">
          <span>🎮</span>
          Extras e Diversao
        </div>
        <div className="cards-grid">
          <Link href="/enem/quiz-diario" className="chalkboard-card">
            <div className="card-icon">🎯</div>
            <div className="card-title">Quiz Diario</div>
            <div className="card-description">5 questoes por dia para manter o ritmo</div>
          </Link>

          <Link href="/enem/desafios" className="chalkboard-card">
            <div className="card-icon">🏆</div>
            <div className="card-title">Desafios Semanais</div>
            <div className="card-description">Complete desafios e ganhe recompensas</div>
          </Link>

          <Link href="/enem/flashcards" className="chalkboard-card">
            <div className="card-icon">🃏</div>
            <div className="card-title">Flashcards</div>
            <div className="card-description">Revise conceitos de forma rapida e eficiente</div>
          </Link>

          <Link href="/enem/loja" className="chalkboard-card">
            <div className="card-icon">🛒</div>
            <div className="card-title">Loja de Recompensas</div>
            <div className="card-description">Troque seus pontos por itens exclusivos</div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p><strong>Sistema Completo de Preparação ENEM Pro</strong></p>
        <p>Desenvolvido para você alcançar seus objetivos</p>
        <p style={{ marginTop: '15px' }}>
          <Link href="/enem" className="btn btn-yellow">
            Acessar Painel Principal
          </Link>
        </p>
        <p style={{ marginTop: '15px' }}>
          <Link href="/planos">
            Ver Planos Premium
          </Link>
        </p>
      </div>
    </div>
  );
}
