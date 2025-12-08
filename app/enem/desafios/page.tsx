'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'diario' | 'semanal' | 'mensal' | 'especial';
  meta: number;
  progresso: number;
  recompensaFP: number;
  icone: string;
}

// Economia rebalanceada v2.0 - recompensas ajustadas
const DESAFIOS_BASE: Desafio[] = [
  // Diarios - mantidos baixos
  { id: 'd1', titulo: 'Maratonista de Questoes', descricao: 'Responda 20 questoes hoje', tipo: 'diario', meta: 20, progresso: 0, recompensaFP: 25, icone: '🎯' },
  { id: 'd2', titulo: 'Simulado Express', descricao: 'Complete 1 simulado rapido', tipo: 'diario', meta: 1, progresso: 0, recompensaFP: 15, icone: '⚡' },
  { id: 'd3', titulo: 'Revisor Dedicado', descricao: 'Estude 3 flashcards', tipo: 'diario', meta: 3, progresso: 0, recompensaFP: 10, icone: '🃏' },
  { id: 'd4', titulo: 'Acertador', descricao: 'Acerte 10 questoes seguidas', tipo: 'diario', meta: 10, progresso: 0, recompensaFP: 35, icone: '🔥' },
  // Semanais - reduzidos de 200 para 75
  { id: 's1', titulo: 'Dominador de Matematica', descricao: 'Acerte 50 questoes de matematica', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 75, icone: '📐' },
  { id: 's2', titulo: 'Mestre das Linguagens', descricao: 'Acerte 50 questoes de linguagens', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 75, icone: '📚' },
  { id: 's3', titulo: 'Cientista Humano', descricao: 'Acerte 50 questoes de humanas', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 75, icone: '🌍' },
  { id: 's4', titulo: 'Expert da Natureza', descricao: 'Acerte 50 questoes de natureza', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 75, icone: '🔬' },
  { id: 's5', titulo: 'Simulador Dedicado', descricao: 'Complete 5 simulados na semana', tipo: 'semanal', meta: 5, progresso: 0, recompensaFP: 100, icone: '🏆' },
  // Mensais - reduzidos significativamente
  { id: 'm1', titulo: 'Campeao do Mes', descricao: 'Acumule 1000 FP no mes', tipo: 'mensal', meta: 1000, progresso: 0, recompensaFP: 150, icone: '👑' },
  { id: 'm2', titulo: 'Maratonista ENEM', descricao: 'Complete 20 simulados no mes', tipo: 'mensal', meta: 20, progresso: 0, recompensaFP: 200, icone: '🎖️' },
  { id: 'm3', titulo: 'Estudante Consistente', descricao: 'Estude 20 dias no mes', tipo: 'mensal', meta: 20, progresso: 0, recompensaFP: 120, icone: '📅' },
  // Especiais - reduzidos para intervalo 50-300 FP
  { id: 'e1', titulo: 'Primeiro Passo', descricao: 'Complete seu primeiro simulado', tipo: 'especial', meta: 1, progresso: 0, recompensaFP: 50, icone: '🚀' },
  { id: 'e2', titulo: 'Nota 1000', descricao: 'Tire nota maxima em um simulado', tipo: 'especial', meta: 1, progresso: 0, recompensaFP: 200, icone: '💯' },
  { id: 'e3', titulo: 'Streak Master', descricao: 'Mantenha streak de 7 dias', tipo: 'especial', meta: 7, progresso: 0, recompensaFP: 100, icone: '🔥' },
];

export default function DesafiosPage() {
  const [desafios, setDesafios] = useState<Desafio[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [fpTotal, setFpTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coletados, setColetados] = useState<string[]>([]);

  useEffect(() => {
    carregarDesafios();
  }, []);

  const carregarDesafios = () => {
    const progressoSalvo = JSON.parse(localStorage.getItem('desafios_progresso') || '{}');
    const historicoSimulados = JSON.parse(localStorage.getItem('historico_simulados') || '[]');
    const fpAtual = parseInt(localStorage.getItem('fp_total') || '0');
    const coletadosSalvos = JSON.parse(localStorage.getItem('desafios_coletados') || '[]');

    setFpTotal(fpAtual);
    setColetados(coletadosSalvos);

    const desafiosAtualizados = DESAFIOS_BASE.map(desafio => {
      let progresso = progressoSalvo[desafio.id] || 0;
      if (desafio.id === 's5' || desafio.id === 'm2') progresso = historicoSimulados.length;
      if (desafio.id === 'e1') progresso = historicoSimulados.length > 0 ? 1 : 0;
      return { ...desafio, progresso: Math.min(progresso, desafio.meta) };
    });

    setDesafios(desafiosAtualizados);
    setLoading(false);
  };

  const coletarRecompensa = (desafioId: string) => {
    const desafio = desafios.find(d => d.id === desafioId);
    if (!desafio || desafio.progresso < desafio.meta) return;
    if (coletados.includes(desafioId)) return;

    const novoFP = fpTotal + desafio.recompensaFP;
    localStorage.setItem('fp_total', String(novoFP));
    setFpTotal(novoFP);

    const novosColetados = [...coletados, desafioId];
    localStorage.setItem('desafios_coletados', JSON.stringify(novosColetados));
    setColetados(novosColetados);

    alert(`Parabens! Voce ganhou +${desafio.recompensaFP} FP!`);
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'diario': return { label: 'Diario', cor: 'var(--accent-blue)' };
      case 'semanal': return { label: 'Semanal', cor: 'var(--accent-green)' };
      case 'mensal': return { label: 'Mensal', cor: 'var(--accent-pink)' };
      case 'especial': return { label: 'Especial', cor: 'var(--accent-yellow)' };
      default: return { label: tipo, cor: 'var(--chalk-dim)' };
    }
  };

  const desafiosFiltrados = filtroTipo === 'todos'
    ? desafios
    : desafios.filter(d => d.tipo === filtroTipo);

  const desafiosDiarios = desafiosFiltrados.filter(d => d.tipo === 'diario');
  const desafiosSemanais = desafiosFiltrados.filter(d => d.tipo === 'semanal');
  const desafiosMensais = desafiosFiltrados.filter(d => d.tipo === 'mensal');
  const desafiosEspeciais = desafiosFiltrados.filter(d => d.tipo === 'especial');

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Carregando desafios...</p>
        </div>
      </div>
    );
  }

  const renderDesafioCard = (desafio: Desafio) => {
    const badge = getTipoBadge(desafio.tipo);
    const percentual = Math.round((desafio.progresso / desafio.meta) * 100);
    const completo = desafio.progresso >= desafio.meta;
    const jaColetou = coletados.includes(desafio.id);

    return (
      <div
        key={desafio.id}
        className="chalkboard-card"
        style={{
          opacity: jaColetou ? 0.6 : 1,
          position: 'relative'
        }}
      >
        {/* Badge de status */}
        {jaColetou && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--accent-green)',
            color: '#1a3328',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '4px 10px',
            borderRadius: '20px'
          }}>
            Coletado
          </div>
        )}
        {completo && !jaColetou && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--accent-yellow)',
            color: '#1a3328',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '4px 10px',
            borderRadius: '20px',
            animation: 'pulse 2s infinite'
          }}>
            Coletar!
          </div>
        )}

        {/* Icone e Tipo */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{
            fontSize: '2.5rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            {desafio.icone}
          </div>
          <span className="badge" style={{
            borderColor: badge.cor,
            color: badge.cor
          }}>
            {badge.label}
          </span>
        </div>

        {/* Titulo e Descricao */}
        <h3 style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '1.3rem',
          color: 'var(--chalk-white)',
          marginBottom: '0.5rem'
        }}>
          {desafio.titulo}
        </h3>
        <p style={{
          fontFamily: "'Caveat', cursive",
          color: 'var(--chalk-dim)',
          fontSize: '1.1rem',
          marginBottom: '1rem'
        }}>
          {desafio.descricao}
        </p>

        {/* Barra de Progresso */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <span style={{ color: 'var(--chalk-dim)' }}>{desafio.progresso}/{desafio.meta}</span>
            <span style={{
              fontWeight: 'bold',
              color: completo ? 'var(--accent-green)' : 'var(--chalk-dim)'
            }}>
              {percentual}%
            </span>
          </div>
          <div className="challenge-progress">
            <div
              className="challenge-progress-bar"
              style={{
                width: `${Math.min(percentual, 100)}%`,
                background: completo
                  ? 'var(--accent-green)'
                  : 'linear-gradient(90deg, var(--accent-yellow) 0%, #fbbf24 100%)'
              }}
            />
          </div>
        </div>

        {/* Recompensa e Acao */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-yellow)'
          }}>
            <span>🏆</span>
            <span style={{ fontWeight: 'bold' }}>+{desafio.recompensaFP} FP</span>
          </div>

          {completo && !jaColetou ? (
            <button
              className="btn btn-yellow"
              onClick={() => coletarRecompensa(desafio.id)}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              Coletar! 🎁
            </button>
          ) : !jaColetou ? (
            <Link href="/enem/simulado">
              <button className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Continuar →
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    );
  };

  const renderSecao = (titulo: string, icone: string, desafiosSecao: Desafio[]) => {
    if (desafiosSecao.length === 0) return null;

    return (
      <div className="category" style={{ marginBottom: '35px' }}>
        <div className="category-title">
          <span>{icone}</span>
          {titulo}
        </div>
        <div className="cards-grid">
          {desafiosSecao.map(renderDesafioCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <FloatingBackButton />
      {/* Header */}
      <div className="header">
        <h1>🎯 Central de Desafios</h1>
        <p>Complete desafios e ganhe FP extras!</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{fpTotal}</div>
          <div className="stat-label">FP</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number" style={{ color: 'var(--accent-green)' }}>
            {desafios.filter(d => d.progresso >= d.meta && !coletados.includes(d.id)).length}
          </div>
          <div className="stat-label">Para Coletar</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number" style={{ color: 'var(--accent-blue)' }}>
            {coletados.length}
          </div>
          <div className="stat-label">Completados</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number" style={{ color: 'var(--accent-pink)' }}>
            {desafios.length - coletados.length}
          </div>
          <div className="stat-label">Em Andamento</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ marginBottom: '35px' }}>
        <h2 className="card-title">📋 Filtrar Desafios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            { value: 'todos', label: '📋 Todos', count: desafios.length },
            { value: 'diario', label: '☀️ Diarios', count: desafios.filter(d => d.tipo === 'diario').length },
            { value: 'semanal', label: '📅 Semanais', count: desafios.filter(d => d.tipo === 'semanal').length },
            { value: 'mensal', label: '🗓️ Mensais', count: desafios.filter(d => d.tipo === 'mensal').length },
            { value: 'especial', label: '⭐ Especiais', count: desafios.filter(d => d.tipo === 'especial').length },
          ].map(filtro => (
            <button
              key={filtro.value}
              onClick={() => setFiltroTipo(filtro.value)}
              className={filtroTipo === filtro.value ? 'btn btn-yellow' : 'btn'}
              style={{ padding: '10px 20px' }}
            >
              {filtro.label} ({filtro.count})
            </button>
          ))}
        </div>
      </div>

      {/* Secoes de Desafios */}
      {filtroTipo === 'todos' ? (
        <>
          {renderSecao('Desafios Diarios', '☀️', desafiosDiarios)}
          {renderSecao('Desafios Semanais', '📅', desafiosSemanais)}
          {renderSecao('Desafios Mensais', '🗓️', desafiosMensais)}
          {renderSecao('Desafios Especiais', '⭐', desafiosEspeciais)}
        </>
      ) : (
        <div className="category">
          <div className="category-title">
            <span>
              {filtroTipo === 'diario' ? '☀️' :
               filtroTipo === 'semanal' ? '📅' :
               filtroTipo === 'mensal' ? '🗓️' : '⭐'}
            </span>
            Desafios {filtroTipo === 'diario' ? 'Diarios' :
                      filtroTipo === 'semanal' ? 'Semanais' :
                      filtroTipo === 'mensal' ? 'Mensais' : 'Especiais'}
          </div>
          <div className="cards-grid">
            {desafiosFiltrados.map(renderDesafioCard)}
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="card" style={{ textAlign: 'center', marginTop: '35px' }}>
        <h2 className="card-title">🔥 Quer mais FP?</h2>
        <p style={{ marginBottom: '1.5rem' }}>Complete simulados para avancar nos desafios!</p>
        <Link href="/enem/simulado">
          <button className="btn btn-yellow" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            🚀 Fazer Simulado Agora
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer>
        <p>
          <Link href="/enem">← Voltar ao Painel</Link>
        </p>
      </footer>
    </div>
  );
}
