'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface MetaUsuario {
  notaDesejada: number;
  curso: string;
  universidade: string;
  horasDisponiveis: number;
  diasDisponiveis: string[];
  nivelAtual: 'iniciante' | 'intermediario' | 'avancado';
  areasFortes: string[];
  areasFracas: string[];
}

interface PlanoSemanal {
  dia: string;
  atividades: {
    horario: string;
    duracao: number;
    area: string;
    tipo: string;
    descricao: string;
    prioridade: 'alta' | 'media' | 'baixa';
  }[];
}

interface Checkpoint {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  meta: string;
  concluido: boolean;
}

const cursosPopulares = [
  'Medicina', 'Direito', 'Engenharia Civil', 'Engenharia de Computação',
  'Psicologia', 'Administração', 'Enfermagem', 'Arquitetura',
  'Ciência da Computação', 'Odontologia', 'Nutrição', 'Fisioterapia',
  'Pedagogia', 'Jornalismo', 'Design', 'Biologia', 'Química', 'Física',
  'Matemática', 'História', 'Letras', 'Economia', 'Contabilidade'
];

const universidadesPopulares = [
  'USP', 'UNICAMP', 'UNESP', 'UFMG', 'UFRJ', 'UFSC', 'UFRGS',
  'UnB', 'UFPR', 'UFPE', 'UFC', 'UFBA', 'UFG', 'UFES',
  'UFSCAR', 'UNIFESP', 'UFABC', 'ITA', 'IME', 'Outra'
];

const diasSemana = [
  { id: 'seg', nome: 'Segunda' },
  { id: 'ter', nome: 'Terça' },
  { id: 'qua', nome: 'Quarta' },
  { id: 'qui', nome: 'Quinta' },
  { id: 'sex', nome: 'Sexta' },
  { id: 'sab', nome: 'Sábado' },
  { id: 'dom', nome: 'Domingo' }
];

const areas = [
  { id: 'linguagens', nome: 'Linguagens', icone: '📚', cor: 'bg-purple-500' },
  { id: 'humanas', nome: 'Humanas', icone: '🌍', cor: 'bg-yellow-500' },
  { id: 'natureza', nome: 'Natureza', icone: '🔬', cor: 'bg-green-500' },
  { id: 'matematica', nome: 'Matemática', icone: '📐', cor: 'bg-cyan-500' },
  { id: 'redacao', nome: 'Redação', icone: '✍️', cor: 'bg-pink-500' }
];

export default function PlanoEstudosPage() {
  const [etapa, setEtapa] = useState<'config' | 'plano'>('config');
  const [meta, setMeta] = useState<MetaUsuario>({
    notaDesejada: 700,
    curso: '',
    universidade: '',
    horasDisponiveis: 3,
    diasDisponiveis: ['seg', 'ter', 'qua', 'qui', 'sex'],
    nivelAtual: 'intermediario',
    areasFortes: [],
    areasFracas: []
  });
  const [planoGerado, setPlanoGerado] = useState<PlanoSemanal[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('enem-plano-estudos');
    if (saved) {
      const dados = JSON.parse(saved);
      setMeta(dados.meta);
      setPlanoGerado(dados.plano);
      setCheckpoints(dados.checkpoints);
      if (dados.plano.length > 0) {
        setEtapa('plano');
      }
    }
  }, []);

  const gerarPlano = () => {
    setSalvando(true);

    // Gerar plano baseado nas preferências
    const plano: PlanoSemanal[] = [];

    const tiposAtividade = [
      { tipo: 'teoria', descricao: 'Estudo de teoria e conceitos' },
      { tipo: 'questoes', descricao: 'Resolução de questões' },
      { tipo: 'revisao', descricao: 'Revisão com flashcards' },
      { tipo: 'simulado', descricao: 'Simulado ou treino' },
      { tipo: 'redacao', descricao: 'Prática de redação' }
    ];

    // Distribuir áreas fracas com mais frequência
    const areasOrdenadas = [...areas].sort((a, b) => {
      const aFraca = meta.areasFracas.includes(a.id) ? -1 : 0;
      const bFraca = meta.areasFracas.includes(b.id) ? -1 : 0;
      return aFraca - bFraca;
    });

    meta.diasDisponiveis.forEach((diaId, idx) => {
      const dia = diasSemana.find(d => d.id === diaId);
      if (!dia) return;

      const atividades: PlanoSemanal['atividades'] = [];
      const horasPorDia = meta.horasDisponiveis;
      let horasRestantes = horasPorDia;

      // Área principal do dia (rotaciona entre as áreas)
      const areaPrincipal = areasOrdenadas[idx % areasOrdenadas.length];
      const areaSecundaria = areasOrdenadas[(idx + 1) % areasOrdenadas.length];

      // Primeira atividade - Teoria
      if (horasRestantes >= 1) {
        atividades.push({
          horario: '08:00',
          duracao: 60,
          area: areaPrincipal.id,
          tipo: 'Teoria',
          descricao: `Estudo de ${areaPrincipal.nome} - Conceitos e teoria`,
          prioridade: (meta.areasFracas.includes(areaPrincipal.id) ? 'alta' : 'media') as 'alta' | 'media' | 'baixa'
        });
        horasRestantes -= 1;
      }

      // Segunda atividade - Questões
      if (horasRestantes >= 1) {
        atividades.push({
          horario: '09:30',
          duracao: 60,
          area: areaPrincipal.id,
          tipo: 'Questões',
          descricao: `Questões comentadas de ${areaPrincipal.nome}`,
          prioridade: 'alta' as const
        });
        horasRestantes -= 1;
      }

      // Terceira atividade - Área secundária ou Redação
      if (horasRestantes >= 1) {
        const isRedacao = idx % 3 === 0;
        atividades.push({
          horario: '14:00',
          duracao: 60,
          area: isRedacao ? 'redacao' : areaSecundaria.id,
          tipo: isRedacao ? 'Redação' : 'Teoria',
          descricao: isRedacao
            ? 'Prática de redação ou estudo de repertórios'
            : `Estudo de ${areaSecundaria.nome}`,
          prioridade: 'media' as const
        });
        horasRestantes -= 1;
      }

      // Revisão no final (se sobrar tempo)
      if (horasRestantes >= 0.5) {
        atividades.push({
          horario: '19:00',
          duracao: 30,
          area: areaPrincipal.id,
          tipo: 'Revisão',
          descricao: 'Flashcards e revisão espaçada',
          prioridade: 'baixa' as const
        });
      }

      plano.push({
        dia: dia.nome,
        atividades
      });
    });

    // Gerar checkpoints mensais
    const novosCheckpoints: Checkpoint[] = [];
    const mesesAteENEM = 6; // Aproximado

    for (let i = 1; i <= mesesAteENEM; i++) {
      const prazo = new Date();
      prazo.setMonth(prazo.getMonth() + i);

      let metaMensal = '';
      if (i === 1) metaMensal = 'Dominar conceitos básicos de todas as áreas';
      else if (i === 2) metaMensal = 'Alcançar 60% de acertos em questões';
      else if (i === 3) metaMensal = 'Completar primeiro simulado completo';
      else if (i === 4) metaMensal = 'Alcançar 70% de acertos + escrever 4 redações';
      else if (i === 5) metaMensal = 'Simulados semanais + revisão intensiva';
      else metaMensal = 'Revisão final e simulados cronometrados';

      novosCheckpoints.push({
        id: `cp-${i}`,
        titulo: `Checkpoint ${i}`,
        descricao: `Mês ${i} de preparação`,
        prazo: prazo.toISOString().split('T')[0],
        meta: metaMensal,
        concluido: false
      });
    }

    setPlanoGerado(plano);
    setCheckpoints(novosCheckpoints);
    setEtapa('plano');

    // Salvar no localStorage
    localStorage.setItem('enem-plano-estudos', JSON.stringify({
      meta,
      plano,
      checkpoints: novosCheckpoints
    }));

    setSalvando(false);
  };

  const toggleAreaForte = (areaId: string) => {
    setMeta(prev => ({
      ...prev,
      areasFortes: prev.areasFortes.includes(areaId)
        ? prev.areasFortes.filter(a => a !== areaId)
        : [...prev.areasFortes, areaId],
      areasFracas: prev.areasFracas.filter(a => a !== areaId)
    }));
  };

  const toggleAreaFraca = (areaId: string) => {
    setMeta(prev => ({
      ...prev,
      areasFracas: prev.areasFracas.includes(areaId)
        ? prev.areasFracas.filter(a => a !== areaId)
        : [...prev.areasFracas, areaId],
      areasFortes: prev.areasFortes.filter(a => a !== areaId)
    }));
  };

  const toggleDia = (diaId: string) => {
    setMeta(prev => ({
      ...prev,
      diasDisponiveis: prev.diasDisponiveis.includes(diaId)
        ? prev.diasDisponiveis.filter(d => d !== diaId)
        : [...prev.diasDisponiveis, diaId]
    }));
  };

  const toggleCheckpoint = (cpId: string) => {
    const novosCheckpoints = checkpoints.map(cp =>
      cp.id === cpId ? { ...cp, concluido: !cp.concluido } : cp
    );
    setCheckpoints(novosCheckpoints);

    const saved = localStorage.getItem('enem-plano-estudos');
    if (saved) {
      const dados = JSON.parse(saved);
      dados.checkpoints = novosCheckpoints;
      localStorage.setItem('enem-plano-estudos', JSON.stringify(dados));
    }
  };

  const getPrioridadeCor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'border-red-500 bg-red-500/10';
      case 'media': return 'border-yellow-500 bg-yellow-500/10';
      case 'baixa': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (etapa === 'config') {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'var(--chalkboard-bg)',
        color: 'var(--chalk-white)',
        paddingTop: '4rem',
        paddingBottom: '6rem'
      }}>
      <FloatingBackButton />
        <FloatingBackButton />
      <FloatingNav />

        <div style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: '2rem 1rem'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(1.875rem, 5vw, 2.25rem)',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              🎯 Plano de Estudos Personalizado
            </h1>
            <p style={{ color: 'var(--chalk-dim)' }}>
              Configure suas metas e preferências para gerar um plano de estudos sob medida.
            </p>
          </div>

          {/* Card Principal */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Nota Desejada */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  🏆 Qual sua nota desejada no ENEM?
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="range"
                    min="400"
                    max="900"
                    step="50"
                    value={meta.notaDesejada}
                    onChange={(e) => setMeta(prev => ({ ...prev, notaDesejada: Number(e.target.value) }))}
                    style={{ flex: 1 }}
                  />
                  <span style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: 'var(--accent-yellow)',
                    width: '5rem',
                    textAlign: 'center'
                  }}>
                    {meta.notaDesejada}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)', marginTop: '0.5rem' }}>
                  {meta.notaDesejada >= 800 ? '🔥 Meta ambiciosa! Requer dedicação intensa.' :
                   meta.notaDesejada >= 700 ? '💪 Ótima meta! Competitivo para boas universidades.' :
                   meta.notaDesejada >= 600 ? '👍 Meta equilibrada. Alcançável com estudo consistente.' :
                   '📚 Meta inicial. Bom ponto de partida!'}
                </p>
              </div>

              {/* Curso e Universidade */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: 'var(--chalk-white)'
                  }}>
                    📚 Curso desejado
                  </label>
                  <select
                    value={meta.curso}
                    onChange={(e) => setMeta(prev => ({ ...prev, curso: e.target.value }))}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: 'var(--chalk-white)',
                      outline: 'none'
                    }}
                  >
                    <option value="">Selecione o curso...</option>
                    {cursosPopulares.map(curso => (
                      <option key={curso} value={curso} style={{ background: '#1a1a1a' }}>{curso}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: 'var(--chalk-white)'
                  }}>
                    🏛️ Universidade alvo
                  </label>
                  <select
                    value={meta.universidade}
                    onChange={(e) => setMeta(prev => ({ ...prev, universidade: e.target.value }))}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: 'var(--chalk-white)',
                      outline: 'none'
                    }}
                  >
                    <option value="">Selecione a universidade...</option>
                    {universidadesPopulares.map(uni => (
                      <option key={uni} value={uni} style={{ background: '#1a1a1a' }}>{uni}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Horas Disponíveis */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  ⏰ Quantas horas por dia você pode estudar?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5, 6, 8].map(h => (
                    <button
                      key={h}
                      onClick={() => setMeta(prev => ({ ...prev, horasDisponiveis: h }))}
                      className={meta.horasDisponiveis === h ? 'btn btn-yellow' : 'btn'}
                      style={{
                        padding: '0.5rem 1rem',
                        minWidth: '3.5rem'
                      }}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Dias Disponíveis */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  📅 Quais dias você pode estudar?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {diasSemana.map(dia => (
                    <button
                      key={dia.id}
                      onClick={() => toggleDia(dia.id)}
                      className={meta.diasDisponiveis.includes(dia.id) ? 'btn btn-yellow' : 'btn'}
                      style={{
                        padding: '0.5rem 1rem',
                        minWidth: '4rem'
                      }}
                    >
                      {dia.nome.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nível Atual */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  📊 Qual seu nível atual de conhecimento?
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {[
                    { id: 'iniciante', label: 'Iniciante', desc: 'Estou começando do zero' },
                    { id: 'intermediario', label: 'Intermediário', desc: 'Tenho base, preciso aprofundar' },
                    { id: 'avancado', label: 'Avançado', desc: 'Domino a maioria, preciso revisar' }
                  ].map(nivel => (
                    <button
                      key={nivel.id}
                      onClick={() => setMeta(prev => ({ ...prev, nivelAtual: nivel.id as MetaUsuario['nivelAtual'] }))}
                      className={meta.nivelAtual === nivel.id ? 'btn btn-yellow' : 'btn'}
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{nivel.label}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{nivel.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Áreas Fortes */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  💪 Quais são suas áreas FORTES?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {areas.map(area => (
                    <button
                      key={area.id}
                      onClick={() => toggleAreaForte(area.id)}
                      className={meta.areasFortes.includes(area.id) ? 'btn btn-yellow' : 'btn'}
                      style={{
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>{area.icone}</span>
                      <span>{area.nome}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Áreas Fracas */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'var(--chalk-white)'
                }}>
                  📈 Quais são suas áreas que precisam de MAIS FOCO?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {areas.map(area => (
                    <button
                      key={area.id}
                      onClick={() => toggleAreaFraca(area.id)}
                      className="btn"
                      style={{
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: meta.areasFracas.includes(area.id)
                          ? 'rgba(234, 179, 8, 0.2)'
                          : undefined,
                        borderColor: meta.areasFracas.includes(area.id)
                          ? 'var(--accent-yellow)'
                          : undefined
                      }}
                    >
                      <span>{area.icone}</span>
                      <span>{area.nome}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Gerar Plano */}
              <button
                onClick={gerarPlano}
                disabled={salvando || meta.diasDisponiveis.length === 0}
                className="btn btn-yellow"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  opacity: (salvando || meta.diasDisponiveis.length === 0) ? 0.5 : 1,
                  cursor: (salvando || meta.diasDisponiveis.length === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                {salvando ? '🔄 Gerando plano...' : '🚀 Gerar Meu Plano de Estudos'}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--chalkboard-bg)',
      color: 'var(--chalk-white)',
      paddingTop: '4rem',
      paddingBottom: '6rem'
    }}>
      <FloatingNav />

      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              marginBottom: '0.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              🎯 Seu Plano de Estudos
            </h1>
            <p style={{ color: 'var(--chalk-dim)' }}>
              {meta.curso && meta.universidade
                ? `Meta: ${meta.curso} na ${meta.universidade} • Nota: ${meta.notaDesejada}`
                : `Meta: ${meta.notaDesejada} pontos no ENEM`}
            </p>
          </div>
          <button
            onClick={() => setEtapa('config')}
            className="btn"
            style={{ padding: '0.5rem 1rem' }}
          >
            ⚙️ Reconfigurar
          </button>
        </div>

        {/* Resumo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>
              {meta.diasDisponiveis.length}
            </div>
            <div style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Dias/Semana</div>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
              {meta.horasDisponiveis}h
            </div>
            <div style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Horas/Dia</div>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
              {meta.diasDisponiveis.length * meta.horasDisponiveis}h
            </div>
            <div style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Horas/Semana</div>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>
              {meta.notaDesejada}
            </div>
            <div style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Nota Meta</div>
          </div>
        </div>

        {/* Plano Semanal */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 className="card-title">📅 Cronograma Semanal</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {planoGerado.map((dia, idx) => (
              <div
                key={idx}
                className="chalkboard-card"
                style={{ padding: '1rem' }}
              >
                <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem',
                  color: 'var(--accent-yellow)'
                }}>
                  {dia.dia}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {dia.atividades.map((ativ, aIdx) => {
                    const area = areas.find(a => a.id === ativ.area);
                    return (
                      <div
                        key={aIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          borderLeft: '4px solid',
                          ...(() => {
                            switch (ativ.prioridade) {
                              case 'alta': return { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' };
                              case 'media': return { borderColor: '#eab308', background: 'rgba(234, 179, 8, 0.1)' };
                              case 'baixa': return { borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.1)' };
                              default: return { borderColor: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' };
                            }
                          })()
                        }}
                      >
                        <div style={{ fontSize: '1.5rem' }}>{area?.icone}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: '500' }}>{ativ.tipo}</span>
                            <span className="badge">
                              {ativ.duracao}min
                            </span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                            {ativ.descricao}
                          </p>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                          {ativ.horario}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoints */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 className="card-title">🏁 Checkpoints de Progresso</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {checkpoints.map((cp, idx) => (
              <div
                key={cp.id}
                onClick={() => toggleCheckpoint(cp.id)}
                className="chalkboard-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  background: cp.concluido
                    ? 'rgba(34, 197, 94, 0.2)'
                    : undefined,
                  borderColor: cp.concluido
                    ? 'rgba(34, 197, 94, 0.5)'
                    : undefined
                }}
              >
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: cp.concluido ? '#22c55e' : 'rgba(255, 255, 255, 0.2)',
                  fontWeight: 'bold'
                }}>
                  {cp.concluido ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontWeight: 'bold',
                    textDecoration: cp.concluido ? 'line-through' : 'none',
                    color: cp.concluido ? 'var(--chalk-dim)' : 'var(--chalk-white)'
                  }}>
                    {cp.titulo}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                    {cp.meta}
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.875rem' }}>
                  <div style={{ color: 'var(--chalk-dim)' }}>Prazo</div>
                  <div>{new Date(cp.prazo).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 className="card-title">💡 Dicas para Seguir o Plano</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div className="chalkboard-card" style={{ padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', color: 'var(--accent-yellow)', marginBottom: '0.5rem' }}>
                🎯 Consistência
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                Estudar um pouco todos os dias é melhor do que estudar muito em poucos dias.
              </p>
            </div>
            <div className="chalkboard-card" style={{ padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                📊 Acompanhe
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                Use as estatísticas para monitorar seu progresso e ajustar o plano.
              </p>
            </div>
            <div className="chalkboard-card" style={{ padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>
                🔄 Flexibilidade
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                Se perder um dia, não desanime. Ajuste e continue no próximo.
              </p>
            </div>
            <div className="chalkboard-card" style={{ padding: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', color: 'var(--accent-yellow)', marginBottom: '0.5rem' }}>
                ⚡ Áreas Fracas
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                Dedique mais tempo às áreas que você indicou como fracas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <a href="/enem" className="btn">
            ← Voltar para o Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
