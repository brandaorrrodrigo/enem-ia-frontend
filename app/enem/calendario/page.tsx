'use client';

import { useState } from 'react';
import Link from 'next/link';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Evento {
  id: string;
  titulo: string;
  data: string;
  tipo: 'prova' | 'inscricao' | 'resultado' | 'importante';
  descricao: string;
  link?: string;
}

const EVENTOS_2025: Evento[] = [
  { id: '1', titulo: 'Inscricoes ENEM 2025 - Inicio', data: '2025-05-26', tipo: 'inscricao', descricao: 'Inicio do periodo de inscricoes para o ENEM 2025.', link: 'https://enem.inep.gov.br' },
  { id: '2', titulo: 'Inscricoes ENEM 2025 - Fim', data: '2025-06-06', tipo: 'inscricao', descricao: 'Ultimo dia para realizar a inscricao no ENEM 2025.' },
  { id: '3', titulo: 'Pagamento Taxa - Prazo', data: '2025-06-11', tipo: 'importante', descricao: 'Ultimo dia para pagamento da taxa de inscricao.' },
  { id: '4', titulo: 'Cartao de Confirmacao', data: '2025-10-28', tipo: 'importante', descricao: 'Divulgacao do cartao de confirmacao com local de prova.' },
  { id: '5', titulo: 'ENEM 2025 - 1o Dia', data: '2025-11-02', tipo: 'prova', descricao: 'Linguagens, Ciencias Humanas e Redacao. Duracao: 5h30.' },
  { id: '6', titulo: 'ENEM 2025 - 2o Dia', data: '2025-11-09', tipo: 'prova', descricao: 'Matematica e Ciencias da Natureza. Duracao: 5h.' },
  { id: '7', titulo: 'Gabarito Oficial', data: '2025-11-13', tipo: 'resultado', descricao: 'Divulgacao dos gabaritos oficiais das provas.' },
  { id: '8', titulo: 'Resultado ENEM 2025', data: '2026-01-13', tipo: 'resultado', descricao: 'Divulgacao das notas individuais do ENEM 2025.' },
  { id: '9', titulo: 'Sisu 2026 - Inscricoes', data: '2026-01-17', tipo: 'inscricao', descricao: 'Inicio das inscricoes do SISU 2026.' },
  { id: '10', titulo: 'ProUni 2026 - Inscricoes', data: '2026-01-28', tipo: 'inscricao', descricao: 'Inicio das inscricoes do ProUni 2026.' },
  { id: '11', titulo: 'FIES 2026 - Inscricoes', data: '2026-02-04', tipo: 'inscricao', descricao: 'Inicio das inscricoes do FIES 2026.' },
];

const CRONOGRAMA_PROVA = [
  { horario: '12:00', evento: 'Abertura dos portoes' },
  { horario: '13:00', evento: 'Fechamento dos portoes' },
  { horario: '13:30', evento: 'Inicio das provas' },
  { horario: '15:30', evento: 'Liberacao para ir embora (1o dia)', desc: 'Nao pode levar caderno de questoes' },
  { horario: '18:00', evento: 'Pode levar caderno de questoes (1o dia)' },
  { horario: '19:00', evento: 'Fim da prova (1o dia - 5h30)' },
  { horario: '18:30', evento: 'Fim da prova (2o dia - 5h)' },
];

const CONTEUDOS_DIA1 = [
  { area: 'Linguagens', questoes: 45, temas: ['Interpretacao de texto', 'Literatura', 'Gramatica', 'Lingua estrangeira', 'Artes'] },
  { area: 'Ciencias Humanas', questoes: 45, temas: ['Historia do Brasil', 'Historia Geral', 'Geografia', 'Filosofia', 'Sociologia'] },
  { area: 'Redacao', questoes: 1, temas: ['Dissertacao-argumentativa', 'Proposta de intervencao', 'Tema social'] },
];

const CONTEUDOS_DIA2 = [
  { area: 'Matematica', questoes: 45, temas: ['Algebra', 'Geometria', 'Estatistica', 'Funcoes', 'Probabilidade'] },
  { area: 'Ciencias da Natureza', questoes: 45, temas: ['Fisica', 'Quimica', 'Biologia', 'Meio ambiente'] },
];

export default function CalendarioPage() {
  const [mesSelecionado, setMesSelecionado] = useState(11);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'prova': return 'var(--accent-pink)';
      case 'inscricao': return 'var(--accent-blue)';
      case 'resultado': return 'var(--accent-green)';
      case 'importante': return 'var(--accent-yellow)';
      default: return 'var(--chalk-white)';
    }
  };

  const getTipoEmoji = (tipo: string) => {
    switch (tipo) {
      case 'prova': return '📝';
      case 'inscricao': return '📋';
      case 'resultado': return '📊';
      case 'importante': return '⚠️';
      default: return '📌';
    }
  };

  const formatarData = (data: string) => {
    const d = new Date(data + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDiasRestantes = (data: string) => {
    const hoje = new Date();
    const dataEvento = new Date(data + 'T12:00:00');
    const diff = dataEvento.getTime() - hoje.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  };

  const proximosEventos = EVENTOS_2025.filter(e => getDiasRestantes(e.data) >= 0).slice(0, 5);
  const diasParaProva = getDiasRestantes('2025-11-02');

  return (
    <div className="container">
      <FloatingBackButton />
      <FloatingNav />

      <div className="header">
        <h1>📅 Calendario ENEM 2025</h1>
        <p>Todas as datas importantes para sua preparacao</p>
      </div>

      {/* Estatísticas principais */}
      <div className="stats-bar" style={{ marginBottom: '2rem' }}>
        <div className="stat-item" style={{ background: 'linear-gradient(135deg, rgba(255,107,129,0.15), rgba(255,159,64,0.15))' }}>
          <div className="stat-number" style={{ fontSize: '3rem', color: 'var(--accent-pink)' }}>
            {diasParaProva > 0 ? diasParaProva : 'Ja foi!'}
          </div>
          <div className="stat-label">dias para o ENEM</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--accent-yellow)', marginTop: '0.5rem' }}>
            1o dia: 02/11/2025
          </div>
        </div>

        <div className="stat-item">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
          <div className="stat-number">180</div>
          <div className="stat-label">questoes no total</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--chalk-faint)', marginTop: '0.5rem' }}>
            90 por dia
          </div>
        </div>

        <div className="stat-item">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏱️</div>
          <div className="stat-number">10h30</div>
          <div className="stat-label">tempo total de prova</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--chalk-faint)', marginTop: '0.5rem' }}>
            5h30 + 5h
          </div>
        </div>
      </div>

      {/* Próximos eventos e cronograma */}
      <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="chalkboard-card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔔 Proximos Eventos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {proximosEventos.map((evento) => {
              const dias = getDiasRestantes(evento.data);
              const cor = getTipoColor(evento.tipo);
              return (
                <div
                  key={evento.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: `2px solid ${cor}`,
                    background: `${cor}15`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{getTipoEmoji(evento.tipo)}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {evento.titulo}
                    </p>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                      {formatarData(evento.data)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--chalk-white)' }}>
                      {dias}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--chalk-faint)' }}>dias</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chalkboard-card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⏰ Cronograma do Dia da Prova
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CRONOGRAMA_PROVA.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px'
                }}
              >
                <span style={{
                  color: 'var(--accent-yellow)',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  width: '3.5rem'
                }}>
                  {item.horario}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--chalk-white)' }}>{item.evento}</p>
                  {item.desc && (
                    <p style={{ color: 'var(--chalk-faint)', fontSize: '0.75rem' }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo dos dois dias */}
      <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="chalkboard-card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📝 1o Dia - Domingo 02/11
          </h3>
          <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            5h30 de prova + Redacao
          </p>
          {CONTEUDOS_DIA1.map((area, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {area.area}
                </span>
                <span style={{ color: 'var(--accent-yellow)' }}>
                  {area.questoes} questoes
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {area.temas.map((tema, i) => (
                  <span
                    key={i}
                    className="badge"
                    style={{
                      background: 'rgba(99,179,237,0.2)',
                      color: 'var(--accent-blue)',
                      border: '1px solid var(--accent-blue)'
                    }}
                  >
                    {tema}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="chalkboard-card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📝 2o Dia - Domingo 09/11
          </h3>
          <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            5h de prova
          </p>
          {CONTEUDOS_DIA2.map((area, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {area.area}
                </span>
                <span style={{ color: 'var(--accent-yellow)' }}>
                  {area.questoes} questoes
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {area.temas.map((tema, i) => (
                  <span
                    key={i}
                    className="badge"
                    style={{
                      background: 'rgba(99,217,184,0.2)',
                      color: 'var(--accent-green)',
                      border: '1px solid var(--accent-green)'
                    }}
                  >
                    {tema}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Todas as datas */}
      <div className="category" style={{ marginBottom: '2rem' }}>
        <h2 className="category-title">📋 Todas as Datas Importantes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {EVENTOS_2025.map((evento) => {
            const cor = getTipoColor(evento.tipo);
            return (
              <div
                key={evento.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: `2px solid ${cor}`,
                  background: `${cor}15`
                }}
              >
      <FloatingBackButton />
                <span style={{ fontSize: '1.5rem' }}>{getTipoEmoji(evento.tipo)}</span>
                <span style={{
                  color: 'var(--chalk-white)',
                  fontFamily: 'monospace',
                  width: '6rem'
                }}>
                  {formatarData(evento.data)}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {evento.titulo}
                  </p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                    {evento.descricao}
                  </p>
                </div>
                {evento.link && (
                  <a
                    href={evento.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    Acessar
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* O que levar */}
      <div
        className="chalkboard-card"
        style={{
          background: 'linear-gradient(135deg, rgba(255,206,84,0.15), rgba(255,159,64,0.15))',
          border: '2px solid var(--accent-yellow)',
          marginBottom: '2rem'
        }}
      >
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🎒 O que levar no dia da prova
        </h3>
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ✓ Obrigatorio
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--chalk-dim)' }}>
              <li>• Documento de identidade original com foto</li>
              <li>• Caneta esferografica preta em tubo transparente</li>
              <li>• Cartao de confirmacao (recomendado)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-yellow)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              💡 Recomendado
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--chalk-dim)' }}>
              <li>• Lanche leve e agua em garrafa transparente</li>
              <li>• Relogio analogico (sem funcoes)</li>
              <li>• Casaco (ar-condicionado)</li>
            </ul>
          </div>
        </div>
      </div>

      <footer>
        <p>
          <Link href="/enem">← Voltar ao Painel</Link>
        </p>
      </footer>
    </div>
  );
}
