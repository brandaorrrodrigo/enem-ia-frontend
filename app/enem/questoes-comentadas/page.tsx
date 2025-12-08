'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingBackButton from '@/components/FloatingBackButton';

interface QuestaoComentada {
  id: string;
  ano: number;
  disciplina: string;
  tema: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  comentario: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  visualizado: boolean;
}

export default function QuestoesComentadasPage() {
  const [questoes, setQuestoes] = useState<QuestaoComentada[]>([]);
  const [filtroAno, setFiltroAno] = useState('todos');
  const [filtroDisciplina, setFiltroDisciplina] = useState('todos');
  const [filtroDificuldade, setFiltroDificuldade] = useState('todos');
  const [questaoExpandida, setQuestaoExpandida] = useState<string | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const anos = ['todos', '2024', '2023', '2022', '2021', '2020', '2019'];
  const disciplinas = [
    { value: 'todos', label: 'Todas as Disciplinas', emoji: '📚' },
    { value: 'Matematica', label: 'Matematica', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', emoji: '📖' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', emoji: '🔬' },
  ];
  const dificuldades = [
    { value: 'todos', label: 'Todas', emoji: '📊' },
    { value: 'facil', label: 'Facil', emoji: '🟢' },
    { value: 'medio', label: 'Medio', emoji: '🟡' },
    { value: 'dificil', label: 'Dificil', emoji: '🔴' },
  ];

  useEffect(() => {
    carregarQuestoes();
  }, []);

  const carregarQuestoes = () => {
    const visualizados = JSON.parse(localStorage.getItem('questoes_visualizadas') || '[]');

    const questoesData: QuestaoComentada[] = [
      {
        id: '1',
        ano: 2023,
        disciplina: 'Matematica',
        tema: 'Funcoes',
        enunciado: 'Uma empresa de telefonia cobra R$ 0,50 por minuto de ligacao local. Alem disso, ha uma tarifa fixa mensal de R$ 25,00. Qual funcao representa o custo mensal C em funcao dos minutos m utilizados?',
        alternativas: [
          'C(m) = 25m + 0,50',
          'C(m) = 0,50m + 25',
          'C(m) = 25,50m',
          'C(m) = 0,50m - 25',
          'C(m) = 25 - 0,50m',
        ],
        respostaCorreta: 1,
        comentario: 'A funcao que representa o custo total e do tipo afim (1o grau), onde temos um valor fixo (R$ 25,00) somado a um valor variavel que depende dos minutos (R$ 0,50 por minuto). Assim, C(m) = 0,50m + 25, onde 0,50 e o coeficiente angular (custo por minuto) e 25 e o coeficiente linear (tarifa fixa).',
        dificuldade: 'facil',
        visualizado: visualizados.includes('1'),
      },
      {
        id: '2',
        ano: 2023,
        disciplina: 'Linguagens',
        tema: 'Interpretacao de Texto',
        enunciado: '"A leitura do mundo precede a leitura da palavra." (Paulo Freire). Neste trecho, o autor defende que:',
        alternativas: [
          'A alfabetizacao deve vir antes da vivencia social.',
          'As experiencias de vida sao base para a compreensao dos textos.',
          'A palavra escrita e mais importante que a experiencia pratica.',
          'O mundo so pode ser compreendido atraves da leitura formal.',
          'A educacao deve priorizar a leitura de livros didaticos.',
        ],
        respostaCorreta: 1,
        comentario: 'Paulo Freire, em sua pedagogia, defende que o conhecimento de mundo, as vivencias e experiencias do individuo sao fundamentais para a construcao do significado na leitura. Antes de decodificar palavras, a pessoa ja "le" o mundo atraves de suas experiencias, e essa leitura previa e essencial para dar sentido aos textos escritos.',
        dificuldade: 'medio',
        visualizado: visualizados.includes('2'),
      },
      {
        id: '3',
        ano: 2022,
        disciplina: 'Ciencias da Natureza',
        tema: 'Ecologia',
        enunciado: 'Em um ecossistema, os decompositores sao fundamentais porque:',
        alternativas: [
          'Produzem oxigenio para os demais seres vivos.',
          'Sao a base da cadeia alimentar como produtores.',
          'Transformam materia organica em inorganica, reciclando nutrientes.',
          'Consomem apenas seres vivos mortos de grande porte.',
          'Eliminam todos os residuos toxicos do ambiente.',
        ],
        respostaCorreta: 2,
        comentario: 'Os decompositores (fungos e bacterias) realizam a decomposicao da materia organica morta, transformando-a em materia inorganica. Este processo e essencial para a ciclagem de nutrientes no ecossistema, devolvendo ao solo elementos como nitrogenio, fosforo e carbono que serao reutilizados pelos produtores.',
        dificuldade: 'facil',
        visualizado: visualizados.includes('3'),
      },
      {
        id: '4',
        ano: 2022,
        disciplina: 'Ciencias Humanas',
        tema: 'Historia do Brasil',
        enunciado: 'O Quilombo dos Palmares, liderado por Zumbi, representou:',
        alternativas: [
          'Uma alianca entre escravizados e senhores de engenho.',
          'A principal forma de resistencia escrava no periodo colonial.',
          'Um movimento apoiado pela Coroa Portuguesa.',
          'Uma revolta que teve apoio da Igreja Catolica.',
          'Um acordo pacifico entre africanos e europeus.',
        ],
        respostaCorreta: 1,
        comentario: 'O Quilombo dos Palmares (atual Alagoas) foi a maior e mais duradoura comunidade de resistencia escrava no Brasil colonial, existindo por quase um seculo (1597-1694). Representou a luta dos africanos escravizados por liberdade e dignidade, sendo um simbolo de resistencia contra o sistema escravista. Zumbi tornou-se lider em 1678 e resistiu ate 1695.',
        dificuldade: 'medio',
        visualizado: visualizados.includes('4'),
      },
      {
        id: '5',
        ano: 2021,
        disciplina: 'Matematica',
        tema: 'Geometria',
        enunciado: 'Um terreno retangular tem perimetro de 100 metros. Se o comprimento e o dobro da largura, qual e a area desse terreno?',
        alternativas: [
          '400 m2',
          '500 m2',
          '555,56 m2',
          '600 m2',
          '625 m2',
        ],
        respostaCorreta: 2,
        comentario: 'Sendo L a largura e C o comprimento, temos: C = 2L (comprimento e dobro da largura). O perimetro e: 2L + 2C = 100. Substituindo: 2L + 2(2L) = 100 => 2L + 4L = 100 => 6L = 100 => L = 16,67m. Logo, C = 2 x 16,67 = 33,33m. A area e: A = L x C = 16,67 x 33,33 = 555,56 m2.',
        dificuldade: 'dificil',
        visualizado: visualizados.includes('5'),
      },
      {
        id: '6',
        ano: 2021,
        disciplina: 'Ciencias da Natureza',
        tema: 'Fisica',
        enunciado: 'Um carro percorre 120 km em 2 horas. Sua velocidade media e:',
        alternativas: [
          '40 km/h',
          '50 km/h',
          '60 km/h',
          '70 km/h',
          '80 km/h',
        ],
        respostaCorreta: 2,
        comentario: 'A velocidade media e calculada pela razao entre a distancia percorrida e o tempo gasto. Vm = d/t = 120 km / 2 h = 60 km/h. E importante lembrar que a velocidade media nao considera variacoes de velocidade durante o percurso, apenas a relacao total distancia/tempo.',
        dificuldade: 'facil',
        visualizado: visualizados.includes('6'),
      },
    ];

    setQuestoes(questoesData);
    setLoading(false);
  };

  const marcarVisualizado = (id: string) => {
    const visualizados = JSON.parse(localStorage.getItem('questoes_visualizadas') || '[]');
    if (!visualizados.includes(id)) {
      visualizados.push(id);
      localStorage.setItem('questoes_visualizadas', JSON.stringify(visualizados));
    }

    const novasQuestoes = questoes.map(q =>
      q.id === id ? { ...q, visualizado: true } : q
    );
    setQuestoes(novasQuestoes);
  };

  const toggleQuestao = (id: string) => {
    if (questaoExpandida === id) {
      setQuestaoExpandida(null);
      setMostrarResposta(null);
    } else {
      setQuestaoExpandida(id);
      setMostrarResposta(null);
      marcarVisualizado(id);
    }
  };

  const getDificuldadeColor = (dif: string): { borderColor: string; color: string } => {
    switch (dif) {
      case 'facil': return { borderColor: 'var(--accent-green)', color: 'var(--accent-green)' };
      case 'medio': return { borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' };
      case 'dificil': return { borderColor: 'var(--accent-pink)', color: 'var(--accent-pink)' };
      default: return { borderColor: 'rgba(255,255,255,0.3)', color: 'var(--chalk-white)' };
    }
  };

  const getDificuldadeEmoji = (dif: string): string => {
    switch (dif) {
      case 'facil': return '🟢';
      case 'medio': return '🟡';
      case 'dificil': return '🔴';
      default: return '⚪';
    }
  };

  const questoesFiltradas = questoes.filter(q => {
    const matchAno = filtroAno === 'todos' || q.ano.toString() === filtroAno;
    const matchDisciplina = filtroDisciplina === 'todos' || q.disciplina === filtroDisciplina;
    const matchDificuldade = filtroDificuldade === 'todos' || q.dificuldade === filtroDificuldade;
    return matchAno && matchDisciplina && matchDificuldade;
  });

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ color: 'var(--chalk-white)', fontSize: '1.2rem' }}>Carregando questoes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>💬 Questoes Comentadas</h1>
        <p>Questoes do ENEM com resolucao detalhada e comentarios</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{questoes.length}</div>
          <div className="stat-label">Questoes</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{questoes.filter(q => q.visualizado).length}</div>
          <div className="stat-label">Estudadas</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{questoes.filter(q => q.dificuldade === 'dificil').length}</div>
          <div className="stat-label">Dificeis</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{new Set(questoes.map(q => q.ano)).size}</div>
          <div className="stat-label">Anos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ marginBottom: '35px' }}>
        <h2 className="card-title">📋 Filtros</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--chalk-dim)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📅 Ano</label>
            <select
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'var(--chalk-white)',
                padding: '14px 18px',
                borderRadius: '10px',
                width: '100%',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {anos.map((ano) => (
                <option key={ano} value={ano}>
                  {ano === 'todos' ? 'Todos os Anos' : `ENEM ${ano}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--chalk-dim)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📚 Disciplina</label>
            <select
              value={filtroDisciplina}
              onChange={(e) => setFiltroDisciplina(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'var(--chalk-white)',
                padding: '14px 18px',
                borderRadius: '10px',
                width: '100%',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {disciplinas.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--chalk-dim)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📊 Dificuldade</label>
            <select
              value={filtroDificuldade}
              onChange={(e) => setFiltroDificuldade(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'var(--chalk-white)',
                padding: '14px 18px',
                borderRadius: '10px',
                width: '100%',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {dificuldades.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Questoes */}
      <div className="category">
        <div className="category-title"><span>📝</span>Questoes</div>

        <div className="cards-grid">
          {questoesFiltradas.length === 0 ? (
            <div className="chalkboard-card" style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ color: 'var(--chalk-white)', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Nenhuma questao encontrada
              </h3>
              <p style={{ color: 'var(--chalk-dim)' }}>Tente ajustar seus filtros.</p>
            </div>
          ) : (
            questoesFiltradas.map((questao) => {
              const colors = getDificuldadeColor(questao.dificuldade);
              return (
                <div
                  key={questao.id}
                  className="chalkboard-card"
                  style={{
                    borderLeft: questao.visualizado ? '4px solid var(--accent-green)' : undefined,
                    gridColumn: '1 / -1'
                  }}
                >
                  {/* Header da Questao */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleQuestao(questao.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span
                        className="badge"
                        style={{
                          borderColor: colors.borderColor,
                          color: colors.color
                        }}
                      >
                        {getDificuldadeEmoji(questao.dificuldade)} {questao.dificuldade.toUpperCase()}
                      </span>
                      <span className="badge" style={{ borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>
                        {questao.disciplina}
                      </span>
                      <span style={{ color: 'var(--chalk-faint)', fontSize: '0.9rem' }}>
                        ENEM {questao.ano}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {questao.visualizado && (
                        <span style={{ color: 'var(--accent-green)', fontSize: '0.9rem' }}>✅ Estudada</span>
                      )}
                      <span style={{ fontSize: '1.5rem', color: 'var(--chalk-faint)' }}>
                        {questaoExpandida === questao.id ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {/* Tema */}
                  <p style={{ color: 'var(--accent-yellow)', fontSize: '0.95rem', marginTop: '1rem', fontWeight: '600' }}>
                    📌 {questao.tema}
                  </p>

                  {/* Conteudo Expandido */}
                  {questaoExpandida === questao.id && (
                    <div style={{ marginTop: '1.5rem' }}>
                      {/* Enunciado */}
                      <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem'
                      }}>
                        <p style={{ color: 'var(--chalk-white)', lineHeight: '1.6' }}>{questao.enunciado}</p>
                      </div>

                      {/* Alternativas */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        {questao.alternativas.map((alt, idx) => {
                          const letra = String.fromCharCode(65 + idx);
                          const isCorreta = idx === questao.respostaCorreta;
                          const mostrar = mostrarResposta === questao.id;

                          return (
                            <div
                              key={idx}
                              style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                border: mostrar && isCorreta
                                  ? '2px solid var(--accent-green)'
                                  : '2px solid rgba(255,255,255,0.1)',
                                background: mostrar && isCorreta
                                  ? 'rgba(80,200,120,0.15)'
                                  : 'rgba(255,255,255,0.05)',
                                marginBottom: '0.5rem',
                                transition: 'all 0.3s ease'
                              }}
                            >
      <FloatingBackButton />
                              <span style={{ fontWeight: 'bold', color: 'var(--accent-yellow)', marginRight: '0.75rem' }}>
                                {letra})
                              </span>
                              <span style={{ color: 'var(--chalk-white)' }}>{alt}</span>
                              {mostrar && isCorreta && (
                                <span style={{ marginLeft: '0.5rem', color: 'var(--accent-green)' }}>✓ Correta</span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Botao Ver Resposta */}
                      {mostrarResposta !== questao.id ? (
                        <button
                          onClick={() => setMostrarResposta(questao.id)}
                          className="btn btn-yellow"
                          style={{ width: '100%' }}
                        >
                          👁️ Ver Resposta e Comentario
                        </button>
                      ) : (
                        /* Comentario */
                        <div style={{
                          background: 'rgba(255,230,100,0.1)',
                          border: '2px solid rgba(255,230,100,0.3)',
                          borderRadius: '12px',
                          padding: '1.5rem'
                        }}>
                          <h4 style={{
                            color: 'var(--accent-yellow)',
                            fontWeight: 'bold',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            💡 Comentario do Professor
                          </h4>
                          <p style={{ color: 'var(--chalk-white)', lineHeight: '1.6' }}>{questao.comentario}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p><Link href="/enem">← Voltar ao Painel</Link></p>
      </footer>
    </div>
  );
}
