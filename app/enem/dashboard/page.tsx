'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseSelector from '@/components/CourseSelector';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

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

  

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';
    setUserId(storedUserId);
    loadDashboardData(storedUserId);
  }, []);

  const loadDashboardData = (userId: string) => { setLoading(true); try { const historicoStr = localStorage.getItem("historico_simulados") || "[]"; const historico = JSON.parse(historicoStr); const simuladosFormatados = historico.map((h: any) => ({ id: h.id, disciplina: h.area === "todas" ? "Todas as Areas" : h.area, nota: h.nota, acertos: h.acertos, total: h.total, porcentagem: Math.round((h.acertos / h.total) * 100) + "%", data: new Date(h.data).toLocaleDateString("pt-BR") })); setSimulados(simuladosFormatados); const fpTotal = parseInt(localStorage.getItem("fp_total") || "0"); const streakDias = parseInt(localStorage.getItem("streak_dias") || "0"); let nivel = "Bronze"; if (fpTotal >= 5000) nivel = "Diamante"; else if (fpTotal >= 2000) nivel = "Platina"; else if (fpTotal >= 1000) nivel = "Gold"; else if (fpTotal >= 500) nivel = "Prata"; setStats({ email: userId, nome: "Estudante", pontosFP: fpTotal, nivel: nivel, streak: streakDias }); setDesempenhoPorArea([]); setLoading(false); } catch (err: any) { console.error("Erro:", err); setStats({ email: userId, nome: "Estudante", pontosFP: 0, nivel: "Bronze", streak: 0 }); setSimulados([]); setDesempenhoPorArea([]); setLoading(false); } };

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
      <FloatingNav />

      {/* Slogan Oficial */}
      <div className="card-ia p-4 mb-6 mt-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
        <p className="text-yellow-300 font-bold text-lg md:text-xl italic">
          "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
        </p>
        <p className="text-white/60 text-sm mt-1">🎯 ENEM-IA - Onde aprender vira jogo</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="title-ia mb-2">📊 Dashboard</h1>
        <p className="subtitle-ia mb-0">Acompanhe seu progresso e estatisticas</p>
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

      <ChalkBackToTop />
    </div>
  );
}
