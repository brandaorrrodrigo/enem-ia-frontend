'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface DadosEstudo {
  data: string;
  minutos: number;
  questoesRespondidas: number;
  acertos: number;
  area: string;
}

interface DesempenhoArea {
  area: string;
  nome: string;
  cor: string;
  icone: string;
  questoesTotal: number;
  acertosTotal: number;
  tempoTotal: number;
  ultimoEstudo: string | null;
  evolucao: number[];
}

interface Meta {
  id: string;
  tipo: 'diaria' | 'semanal' | 'mensal';
  descricao: string;
  meta: number;
  atual: number;
  unidade: string;
}

export default function EstatisticasPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'7dias' | '30dias' | '90dias'>('30dias');
  const [dadosEstudo, setDadosEstudo] = useState<DadosEstudo[]>([]);
  const [desempenhoAreas, setDesempenhoAreas] = useState<DesempenhoArea[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ou gerar dados de exemplo
    const gerarDadosExemplo = () => {
      const dados: DadosEstudo[] = [];
      const areas = ['linguagens', 'humanas', 'natureza', 'matematica', 'redacao'];

      for (let i = 0; i < 90; i++) {
        const data = new Date();
        data.setDate(data.getDate() - i);

        // Simular dias com estudo (70% de chance)
        if (Math.random() > 0.3) {
          const area = areas[Math.floor(Math.random() * areas.length)];
          const questoes = Math.floor(Math.random() * 20) + 5;
          dados.push({
            data: data.toISOString().split('T')[0],
            minutos: Math.floor(Math.random() * 120) + 30,
            questoesRespondidas: questoes,
            acertos: Math.floor(questoes * (0.5 + Math.random() * 0.4)),
            area
          });
        }
      }
      return dados;
    };

    const saved = localStorage.getItem('enem-dados-estudo');
    const dados = saved ? JSON.parse(saved) : gerarDadosExemplo();

    if (!saved) {
      localStorage.setItem('enem-dados-estudo', JSON.stringify(dados));
    }

    setDadosEstudo(dados);

    // Calcular desempenho por área
    const areasConfig = [
      { area: 'linguagens', nome: 'Linguagens', cor: 'from-purple-500 to-purple-700', icone: '📚' },
      { area: 'humanas', nome: 'Ciências Humanas', cor: 'from-yellow-500 to-yellow-700', icone: '🌍' },
      { area: 'natureza', nome: 'Ciências da Natureza', cor: 'from-green-500 to-green-700', icone: '🔬' },
      { area: 'matematica', nome: 'Matemática', cor: 'from-cyan-500 to-cyan-700', icone: '📐' },
      { area: 'redacao', nome: 'Redação', cor: 'from-pink-500 to-pink-700', icone: '✍️' }
    ];

    const desempenho: DesempenhoArea[] = areasConfig.map(config => {
      const dadosArea = dados.filter((d: DadosEstudo) => d.area === config.area);
      const ultimoDado = dadosArea.sort((a: DadosEstudo, b: DadosEstudo) =>
        new Date(b.data).getTime() - new Date(a.data).getTime())[0];

      // Evolução semanal (últimas 4 semanas)
      const evolucao = [0, 1, 2, 3].map(semana => {
        const inicioSemana = new Date();
        inicioSemana.setDate(inicioSemana.getDate() - (semana + 1) * 7);
        const fimSemana = new Date();
        fimSemana.setDate(fimSemana.getDate() - semana * 7);

        const dadosSemana = dadosArea.filter((d: DadosEstudo) => {
          const dataD = new Date(d.data);
          return dataD >= inicioSemana && dataD < fimSemana;
        });

        if (dadosSemana.length === 0) return 0;
        const totalQuestoes = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0);
        const totalAcertos = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.acertos, 0);
        return totalQuestoes > 0 ? Math.round((totalAcertos / totalQuestoes) * 100) : 0;
      }).reverse();

      return {
        ...config,
        questoesTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0),
        acertosTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.acertos, 0),
        tempoTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0),
        ultimoEstudo: ultimoDado?.data || null,
        evolucao
      };
    });

    setDesempenhoAreas(desempenho);

    // Metas
    const hoje = new Date().toISOString().split('T')[0];
    const dadosHoje = dados.filter((d: DadosEstudo) => d.data === hoje);
    const minutosHoje = dadosHoje.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0);
    const questoesHoje = dadosHoje.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0);

    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const dadosSemana = dados.filter((d: DadosEstudo) => new Date(d.data) >= inicioSemana);
    const minutosSemana = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0);

    setMetas([
      { id: '1', tipo: 'diaria', descricao: 'Estudar hoje', meta: 60, atual: minutosHoje, unidade: 'min' },
      { id: '2', tipo: 'diaria', descricao: 'Questões hoje', meta: 20, atual: questoesHoje, unidade: 'questões' },
      { id: '3', tipo: 'semanal', descricao: 'Tempo semanal', meta: 420, atual: minutosSemana, unidade: 'min' },
      { id: '4', tipo: 'semanal', descricao: 'Simulados', meta: 2, atual: 1, unidade: 'simulados' }
    ]);
  }, []);

  const getDadosPeriodo = () => {
    const dias = periodoSelecionado === '7dias' ? 7 : periodoSelecionado === '30dias' ? 30 : 90;
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    return dadosEstudo.filter(d => new Date(d.data) >= dataLimite);
  };

  const dadosPeriodo = getDadosPeriodo();

  const estatisticasGerais = {
    tempoTotal: dadosPeriodo.reduce((acc, d) => acc + d.minutos, 0),
    questoesTotal: dadosPeriodo.reduce((acc, d) => acc + d.questoesRespondidas, 0),
    acertosTotal: dadosPeriodo.reduce((acc, d) => acc + d.acertos, 0),
    diasEstudados: new Set(dadosPeriodo.map(d => d.data)).size,
    mediaDiaria: dadosPeriodo.length > 0
      ? Math.round(dadosPeriodo.reduce((acc, d) => acc + d.minutos, 0) / new Set(dadosPeriodo.map(d => d.data)).size)
      : 0
  };

  const taxaAcerto = estatisticasGerais.questoesTotal > 0
    ? Math.round((estatisticasGerais.acertosTotal / estatisticasGerais.questoesTotal) * 100)
    : 0;

  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) return `${horas}h ${mins}min`;
    return `${mins}min`;
  };

  // Calcular previsão de nota
  const calcularPrevisaoNota = () => {
    if (desempenhoAreas.length === 0) return 0;

    const mediaGeral = desempenhoAreas.reduce((acc, area) => {
      const taxa = area.questoesTotal > 0 ? (area.acertosTotal / area.questoesTotal) : 0;
      return acc + taxa;
    }, 0) / desempenhoAreas.length;

    // Fórmula simplificada: taxa de acerto * 1000 (nota máxima)
    // Com ajustes baseados no tempo de estudo
    const bonus = Math.min(estatisticasGerais.tempoTotal / 100, 50);
    return Math.round(mediaGeral * 900 + bonus);
  };

  const previsaoNota = calcularPrevisaoNota();

  // Gerar gráfico de barras simples para os últimos 7 dias
  const ultimos7Dias = () => {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];
      const dadosDia = dadosEstudo.filter(d => d.data === dataStr);
      const minutos = dadosDia.reduce((acc, d) => acc + d.minutos, 0);
      dias.push({
        data: dataStr,
        dia: data.toLocaleDateString('pt-BR', { weekday: 'short' }),
        minutos
      });
    }
    return dias;
  };

  const grafico7Dias = ultimos7Dias();
  const maxMinutos = Math.max(...grafico7Dias.map(d => d.minutos), 60);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: 'var(--chalkboard-bg)',
      color: 'var(--chalk-white)',
      paddingTop: '4rem',
      paddingBottom: '6rem'
    }}>
      <FloatingBackButton />
      <FloatingNav />

      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div className="header" style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--chalk-white)',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            📊 Estatísticas e Analytics
          </h1>
          <p style={{
            color: 'var(--chalk-dim)',
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1rem'
          }}>
            Acompanhe seu progresso, identifique pontos fracos e visualize sua evolução rumo ao ENEM.
          </p>
        </div>

        {/* Seletor de Período */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: '7dias', label: '7 dias' },
            { id: '30dias', label: '30 dias' },
            { id: '90dias', label: '90 dias' }
          ].map(periodo => (
            <button
              key={periodo.id}
              onClick={() => setPeriodoSelecionado(periodo.id as typeof periodoSelecionado)}
              className={periodoSelecionado === periodo.id ? 'btn btn-yellow' : 'btn'}
              style={{
                ...(periodoSelecionado !== periodo.id && {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--chalk-dim)'
                })
              }}
            >
              {periodo.label}
            </button>
          ))}
        </div>

        {/* Estatísticas Gerais */}
        <div className="stats-bar" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-green)' }}>
              {formatarTempo(estatisticasGerais.tempoTotal)}
            </div>
            <div className="stat-label">Tempo Total</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-blue)' }}>
              {estatisticasGerais.questoesTotal}
            </div>
            <div className="stat-label">Questões</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-purple)' }}>
              {taxaAcerto}%
            </div>
            <div className="stat-label">Taxa de Acerto</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-yellow)' }}>
              {estatisticasGerais.diasEstudados}
            </div>
            <div className="stat-label">Dias Ativos</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-pink)' }}>
              {estatisticasGerais.mediaDiaria}min
            </div>
            <div className="stat-label">Média Diária</div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{ color: 'var(--accent-cyan)' }}>
              {previsaoNota}
            </div>
            <div className="stat-label">Nota Prevista</div>
          </div>
        </div>

        {/* Gráfico de Atividade (últimos 7 dias) */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title">📈 Atividade dos Últimos 7 Dias</h2>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '160px',
            gap: '0.5rem'
          }}>
            {grafico7Dias.map((dia, idx) => (
              <div key={idx} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '120px'
                }}>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      background: dia.minutos > 0
                        ? 'linear-gradient(to top, var(--accent-green), rgba(52, 211, 153, 0.6))'
                        : 'rgba(255, 255, 255, 0.1)',
                      height: `${Math.max((dia.minutos / maxMinutos) * 100, 5)}%`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--chalk-dim)',
                  marginTop: '0.5rem'
                }}>
                  {dia.dia}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.4)'
                }}>
                  {dia.minutos > 0 ? `${dia.minutos}m` : '-'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metas */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title">🎯 Suas Metas</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {metas.map(meta => {
              const progresso = Math.min((meta.atual / meta.meta) * 100, 100);
              const concluida = meta.atual >= meta.meta;

              return (
                <div key={meta.id} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: concluida ? '1px solid var(--accent-green)' : 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontWeight: 500, color: 'var(--chalk-white)' }}>
                      {meta.descricao}
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: concluida ? 'var(--accent-green)' : 'var(--chalk-dim)'
                    }}>
                      {meta.atual}/{meta.meta} {meta.unidade}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progresso}%`,
                      height: '100%',
                      backgroundColor: concluida ? 'var(--accent-green)' : 'var(--accent-blue)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  {concluida && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-green)',
                      marginTop: '0.25rem'
                    }}>
                      ✅ Meta atingida!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desempenho por Área */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title">📚 Desempenho por Área</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {desempenhoAreas.map(area => {
              const taxaArea = area.questoesTotal > 0
                ? Math.round((area.acertosTotal / area.questoesTotal) * 100)
                : 0;

              return (
                <div key={area.area} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
      <FloatingBackButton />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '2rem' }}>{area.icone}</span>
                      <div>
                        <h3 style={{
                          fontWeight: 700,
                          color: 'var(--chalk-white)',
                          marginBottom: '0.25rem'
                        }}>
                          {area.nome}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--chalk-dim)'
                        }}>
                          {area.questoesTotal} questões • {formatarTempo(area.tempoTotal)}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: taxaArea >= 70 ? 'var(--accent-green)' :
                               taxaArea >= 50 ? 'var(--accent-yellow)' : 'var(--accent-red)'
                      }}>
                        {taxaArea}%
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--chalk-dim)'
                      }}>
                        acertos
                      </div>
                    </div>
                  </div>

                  {/* Mini gráfico de evolução */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '0.25rem',
                    height: '32px'
                  }}>
                    {area.evolucao.map((valor, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          borderRadius: '2px 2px 0 0',
                          background: `linear-gradient(to top, ${area.cor.includes('purple') ? 'var(--accent-purple)' :
                                                                  area.cor.includes('yellow') ? 'var(--accent-yellow)' :
                                                                  area.cor.includes('green') ? 'var(--accent-green)' :
                                                                  area.cor.includes('cyan') ? 'var(--accent-cyan)' : 'var(--accent-pink)'}, rgba(255, 255, 255, 0.3))`,
                          height: `${Math.max(valor, 10)}%`,
                          opacity: 0.5 + (idx * 0.15)
                        }}
                        title={`Semana ${idx + 1}: ${valor}%`}
                      />
                    ))}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginTop: '0.25rem'
                  }}>
                    <span>4 sem atrás</span>
                    <span>Esta semana</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pontos Fracos e Fortes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Pontos Fortes */}
          <div className="card">
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--accent-green)',
              marginBottom: '1rem'
            }}>
              💪 Seus Pontos Fortes
            </h2>
            {desempenhoAreas
              .filter(a => a.questoesTotal > 0)
              .sort((a, b) => (b.acertosTotal / b.questoesTotal) - (a.acertosTotal / a.questoesTotal))
              .slice(0, 3)
              .map((area, idx) => (
                <div key={area.area} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{area.icone}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 500,
                      color: 'var(--chalk-white)',
                      marginBottom: '0.25rem'
                    }}>
                      {area.nome}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--chalk-dim)'
                    }}>
                      {Math.round((area.acertosTotal / area.questoesTotal) * 100)}% de acertos
                    </div>
                  </div>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                    #{idx + 1}
                  </span>
                </div>
              ))}
            {desempenhoAreas.filter(a => a.questoesTotal > 0).length === 0 && (
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem'
              }}>
                Responda mais questões para ver seus pontos fortes.
              </p>
            )}
          </div>

          {/* Pontos a Melhorar */}
          <div className="card">
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--accent-yellow)',
              marginBottom: '1rem'
            }}>
              📈 Pontos a Melhorar
            </h2>
            {desempenhoAreas
              .filter(a => a.questoesTotal > 0)
              .sort((a, b) => (a.acertosTotal / a.questoesTotal) - (b.acertosTotal / b.questoesTotal))
              .slice(0, 3)
              .map((area, idx) => (
                <div key={area.area} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{area.icone}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 500,
                      color: 'var(--chalk-white)',
                      marginBottom: '0.25rem'
                    }}>
                      {area.nome}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--chalk-dim)'
                    }}>
                      {Math.round((area.acertosTotal / area.questoesTotal) * 100)}% de acertos
                    </div>
                  </div>
                  <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                </div>
              ))}
            {desempenhoAreas.filter(a => a.questoesTotal > 0).length === 0 && (
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem'
              }}>
                Responda mais questões para identificar pontos a melhorar.
              </p>
            )}
          </div>
        </div>

        {/* Previsão de Nota */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          marginBottom: '2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--chalk-white)',
              marginBottom: '0.5rem'
            }}>
              🎯 Previsão de Nota no ENEM
            </h2>
            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1.5rem'
            }}>
              Baseado no seu desempenho atual
            </p>

            <div style={{
              fontSize: 'clamp(3rem, 10vw, 4rem)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}>
              {previsaoNota}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              fontSize: '0.875rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ color: 'var(--chalk-dim)' }}>Mínimo estimado: </span>
                <span style={{
                  color: 'var(--accent-yellow)',
                  fontWeight: 600,
                  marginLeft: '0.5rem'
                }}>
                  {Math.max(previsaoNota - 80, 0)}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--chalk-dim)' }}>Máximo estimado: </span>
                <span style={{
                  color: 'var(--accent-green)',
                  fontWeight: 600,
                  marginLeft: '0.5rem'
                }}>
                  {Math.min(previsaoNota + 80, 1000)}
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)',
              marginTop: '1rem'
            }}>
              * Previsão baseada em taxa de acertos, tempo de estudo e constância.
              Continue estudando para aumentar sua nota!
            </p>
          </div>
        </div>

        {/* Dicas */}
        <div className="card">
          <h2 className="card-title">💡 Dicas Personalizadas</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {estatisticasGerais.mediaDiaria < 60 && (
              <div className="chalkboard-card" style={{
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}>
                <h3 style={{
                  fontWeight: 700,
                  color: 'var(--accent-yellow)',
                  marginBottom: '0.5rem'
                }}>
                  ⏰ Aumente seu tempo de estudo
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  Você está estudando em média {estatisticasGerais.mediaDiaria} minutos por dia.
                  Tente aumentar para 1-2 horas diárias.
                </p>
              </div>
            )}
            {taxaAcerto < 60 && (
              <div className="chalkboard-card" style={{
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <h3 style={{
                  fontWeight: 700,
                  color: '#fb923c',
                  marginBottom: '0.5rem'
                }}>
                  📚 Revise o conteúdo
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  Sua taxa de acerto está em {taxaAcerto}%. Foque em revisar os conteúdos
                  antes de fazer mais questões.
                </p>
              </div>
            )}
            {desempenhoAreas.some(a => a.questoesTotal === 0) && (
              <div className="chalkboard-card" style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <h3 style={{
                  fontWeight: 700,
                  color: 'var(--accent-blue)',
                  marginBottom: '0.5rem'
                }}>
                  🎯 Diversifique os estudos
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  Algumas áreas ainda não têm dados. Estude todas as matérias
                  para um desempenho equilibrado.
                </p>
              </div>
            )}
            <div className="chalkboard-card" style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <h3 style={{
                fontWeight: 700,
                color: 'var(--accent-green)',
                marginBottom: '0.5rem'
              }}>
                🔥 Mantenha a constância
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--chalk-dim)'
              }}>
                Estudar um pouco todos os dias é melhor do que estudar muito
                em poucos dias. Mantenha o ritmo!
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Voltar */}
        <div className="footer" style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <a
            href="/enem"
            style={{
              color: 'var(--accent-yellow)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-yellow)'}
          >
            ← Voltar para o Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
