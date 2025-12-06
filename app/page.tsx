'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>ENEM Pro - Sistema Completo de Preparacao</h1>
        <p>Tudo que voce precisa para conquistar sua aprovacao!</p>
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
          <div className="stat-number">180</div>
          <div className="stat-label">Dias ate o ENEM</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">100K+</div>
          <div className="stat-label">Questoes</div>
        </div>
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
        <p><strong>Sistema Completo de Preparacao ENEM Pro</strong></p>
        <p>Desenvolvido para voce alcancar seus objetivos</p>
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
