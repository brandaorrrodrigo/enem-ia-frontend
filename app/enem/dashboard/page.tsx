'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseSelector from '@/components/CourseSelector';

interface Simulado {
  id: string;
  disciplina: string;
  nota: number;
  acertos: number;
  total: number;
  porcentagem: string;
  data: string;
}

interface UsuarioStats {
  email: string;
  nome: string;
  pontosFP: number;
  nivel: string;
  streak: number;
}

interface DesempenhoPorArea {
  area: string;
  porcentagem: number;
  simulados: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [stats, setStats] = useState<UsuarioStats | null>(null);
  const [desempenhoPorArea, setDesempenhoPorArea] = useState<DesempenhoPorArea[]>([]);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';
    setUserId(storedUserId);
    loadDashboardData(storedUserId);
  }, []);

  const loadDashboardData = async (userId: string) => {
    setLoading(true);
    setError('');

    try {
      // Tentar carregar dados reais
      const [historyRes, statsRes, areaRes] = await Promise.allSettled([
        fetch(`${BACKEND_URL}/api/enem/simulados/history?user_id=${encodeURIComponent(userId)}`),
        fetch(`${BACKEND_URL}/api/enem/usuario/stats?user_id=${encodeURIComponent(userId)}`),
        fetch(`${BACKEND_URL}/api/enem/stats/por-area?user_id=${encodeURIComponent(userId)}`),
      ]);

      // Processar histórico
      if (historyRes.status === 'fulfilled' && historyRes.value.ok) {
        const data = await historyRes.value.json();
        setSimulados(data.simulados || []);
      } else {
        // Dados mockados se falhar
        setSimulados([
          {
            id: '1',
            disciplina: 'Matemática',
            nota: 720,
            acertos: 32,
            total: 45,
            porcentagem: '71%',
            data: '2024-11-10',
          },
          {
            id: '2',
            disciplina: 'Linguagens',
            nota: 680,
            acertos: 28,
            total: 45,
            porcentagem: '62%',
            data: '2024-11-08',
          },
        ]);
      }

      // Processar stats
      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const data = await statsRes.value.json();
        setStats(data);
      } else {
        setStats({
          email: userId,
          nome: 'Estudante',
          pontosFP: 1250,
          nivel: 'Gold',
          streak: 7,
        });
      }

      // Processar áreas
      if (areaRes.status === 'fulfilled' && areaRes.value.ok) {
        const data = await areaRes.value.json();
        setDesempenhoPorArea(data.desempenho || []);
      } else {
        setDesempenhoPorArea([
          { area: 'Matemática', porcentagem: 75, simulados: 3 },
          { area: 'Linguagens', porcentagem: 68, simulados: 2 },
          { area: 'Ciências Humanas', porcentagem: 82, simulados: 2 },
          { area: 'Ciências Natureza', porcentagem: 71, simulados: 1 },
        ]);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Erro ao carregar dashboard:', err);
      // Usar dados mockados em caso de erro
      setStats({
        email: userId,
        nome: 'Estudante',
        pontosFP: 1250,
        nivel: 'Gold',
        streak: 7,
      });
      setSimulados([]);
      setDesempenhoPorArea([]);
      setLoading(false);
    }
  };

  const calcularMediaNotas = (): number => {
    if (simulados.length === 0) return 0;
    const soma = simulados.reduce((acc, s) => acc + (s.nota || 0), 0);
    return Math.round(soma / simulados.length);
  };

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const mediaNota = calcularMediaNotas();

  return (
    <div className="container-ia min-h-screen py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="title-ia mb-2">📊 Dashboard</h1>
        <p className="subtitle-ia mb-0">Acompanhe seu progresso e estatísticas</p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{stats?.pontosFP || 0}</span>
          <span className="stat-ia-label">Pontos FP</span>
        </div>

        <div className="stat-ia">
          <span className="stat-ia-value">{simulados.length}</span>
          <span className="stat-ia-label">Simulados</span>
        </div>

        <div className="stat-ia">
          <span className="stat-ia-value">{mediaNota}</span>
          <span className="stat-ia-label">Nota Média</span>
        </div>

        <div className="stat-ia">
          <span className="stat-ia-value">{stats?.streak || 0}🔥</span>
          <span className="stat-ia-label">Dias Seguidos</span>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Progresso Geral */}
        <div className="card-ia">
          <h2 className="title-ia-sm mb-4">📈 Progresso Geral</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Nível Atual</span>
                <span className="badge-ia">{stats?.nivel || 'Iniciante'}</span>
              </div>
              <div className="progress-ia">
                <div className="progress-ia-bar" style={{ width: '65%' }}></div>
              </div>
              <p className="text-white/60 text-xs mt-2">350 pontos para o próximo nível</p>
            </div>

            <div className="divider-ia"></div>

            <div>
              <p className="text-white/80 mb-3 font-semibold">Conquistas Recentes</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Primeira Vitória</p>
                    <p className="text-white/60 text-xs">Complete seu primeiro simulado</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-white font-semibold text-sm">Sequência de 7 dias</p>
                    <p className="text-white/60 text-xs">Estude 7 dias consecutivos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desempenho por Área */}
        <div className="card-ia">
          <h2 className="title-ia-sm mb-4">📚 Desempenho por Área</h2>

          {desempenhoPorArea.length > 0 ? (
            <div className="space-y-4">
              {desempenhoPorArea.map((area, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{area.area}</span>
                    <span className="text-yellow-300 font-bold">{area.porcentagem}%</span>
                  </div>
                  <div className="progress-ia">
                    <div
                      className="progress-ia-bar"
                      style={{ width: `${area.porcentagem}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{area.simulados} simulados realizados</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60 mb-4">Nenhum simulado realizado ainda</p>
              <button
                onClick={() => router.push('/enem/simulado')}
                className="btn-ia"
              >
                Fazer Primeiro Simulado
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Curso Alvo */}
      <div className="mb-8">
        <div className="card-ia">
          <h2 className="title-ia-sm mb-4">🎯 Curso Alvo</h2>
          <CourseSelector userId={userId} />
        </div>
      </div>

      {/* Histórico de Simulados */}
      <div className="card-ia">
        <h2 className="title-ia-sm mb-6">📝 Histórico de Simulados</h2>

        {simulados.length > 0 ? (
          <div className="space-y-3">
            {simulados.map((sim) => (
              <div
                key={sim.id}
                className="card-ia-sm flex justify-between items-center hover:scale-[1.02] transition cursor-pointer"
                onClick={() => router.push(`/enem/resultado/${sim.id}`)}
              >
                <div>
                  <p className="text-white font-bold">{sim.disciplina}</p>
                  <p className="text-white/60 text-sm">
                    {sim.acertos}/{sim.total} questões ({sim.porcentagem})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-300 font-bold text-xl">{sim.nota}</p>
                  <p className="text-white/60 text-xs">{sim.data}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-white text-2xl font-bold mb-3">Você ainda não fez nenhum simulado</h3>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Que tal começar agora? Faça seu primeiro simulado e descubra seu nível de conhecimento!
            </p>
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn-ia text-lg px-10 py-5 font-bold"
              style={{ boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)' }}
            >
              🚀 FAZER MEU PRIMEIRO SIMULADO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
