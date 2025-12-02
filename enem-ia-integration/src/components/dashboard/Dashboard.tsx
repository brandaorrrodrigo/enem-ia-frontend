'use client';

import { useEffect, useState } from 'react';
import { useAuth, useEstatisticas, usePlanoEstudo } from '@/hooks';
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
  Flame,
  Calendar,
  BarChart3,
  FileText,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, loading: loadingStats } = useEstatisticas();
  const { plano, loading: loadingPlano } = usePlanoEstudo();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  if (loadingStats || loadingPlano) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {greeting}, {user?.nome?.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm text-gray-600">
                  Continue sua jornada rumo ao ENEM
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-600">Sequência</p>
                <p className="text-lg font-bold text-orange-600">
                  {user?.streak_dias || 0} dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Questões Respondidas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.total_questoes_respondidas || 0}
            </p>
            <p className="text-sm text-gray-600">Questões respondidas</p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">
                +{Math.floor(Math.random() * 20 + 10)}% esta semana
              </span>
            </div>
          </div>

          {/* Card 2: Taxa de Acerto */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.taxa_acerto_geral
                ? `${(stats.taxa_acerto_geral * 100).toFixed(1)}%`
                : '0%'}
            </p>
            <p className="text-sm text-gray-600">Taxa de acerto geral</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{
                  width: `${(stats?.taxa_acerto_geral || 0) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Card 3: Tempo Médio */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl">⏱️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.tempo_medio_questao
                ? `${Math.floor(stats.tempo_medio_questao / 60)}min`
                : '0min'}
            </p>
            <p className="text-sm text-gray-600">Tempo médio por questão</p>
            <p className="text-sm text-purple-600 font-medium mt-4">
              Ideal: 3-5min
            </p>
          </div>

          {/* Card 4: Pontos Totais */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {user?.pontos_totais || 0}
            </p>
            <p className="text-sm text-gray-600">Pontos totais</p>
            <p className="text-sm text-orange-600 font-medium mt-4">
              Nível {user?.nivel_atual || 1}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plano de Estudos */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Plano de Estudos de Hoje
                  </h2>
                </div>
                <Link
                  href="/plano-estudo"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Ver completo →
                </Link>
              </div>

              {plano ? (
                <div className="space-y-4">
                  {/* Progresso Geral */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progresso Semanal
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {plano.progresso || 0}%
                      </span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${plano.progresso || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Atividades do Dia */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Atividades de Hoje:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 text-blue-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            20 questões de Matemática
                          </p>
                          <p className="text-xs text-gray-600">30-40 minutos</p>
                        </div>
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 text-blue-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            Revisar Português
                          </p>
                          <p className="text-xs text-gray-600">20 minutos</p>
                        </div>
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 text-blue-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            Escrever redação
                          </p>
                          <p className="text-xs text-gray-600">45 minutos</p>
                        </div>
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Você ainda não tem um plano de estudos
                  </p>
                  <Link
                    href="/plano-estudo/criar"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <Target className="w-5 h-5" />
                    Criar Plano Personalizado
                  </Link>
                </div>
              )}
            </div>

            {/* Gráfico de Evolução */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Evolução Semanal
                  </h2>
                </div>
              </div>

              {/* Gráfico Simples */}
              <div className="space-y-3">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(
                  (dia, index) => {
                    const valor = Math.floor(Math.random() * 100);
                    return (
                      <div key={dia} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 w-12">
                          {dia}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-end pr-3 transition-all duration-500"
                            style={{ width: `${valor}%` }}
                          >
                            <span className="text-xs font-bold text-white">
                              {valor}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ações Rápidas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Ações Rápidas
              </h2>
              <div className="space-y-3">
                <Link
                  href="/questoes"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group"
                >
                  <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Resolver Questões
                    </p>
                    <p className="text-xs text-gray-600">
                      Praticar por matéria
                    </p>
                  </div>
                </Link>

                <Link
                  href="/simulados"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group"
                >
                  <div className="bg-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Simulados</p>
                    <p className="text-xs text-gray-600">Testar conhecimento</p>
                  </div>
                </Link>

                <Link
                  href="/redacao"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group"
                >
                  <div className="bg-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Redação</p>
                    <p className="text-xs text-gray-600">Escrever e corrigir</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Matérias em Destaque */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Suas Matérias
              </h2>
              <div className="space-y-3">
                {stats?.materias_fortes?.slice(0, 3).map((materia: string) => (
                  <div
                    key={materia}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium text-gray-900">
                        {materia}
                      </span>
                    </div>
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                )) || (
                  <p className="text-sm text-gray-600">
                    Continue praticando para descobrir suas matérias fortes!
                  </p>
                )}

                {stats?.materias_fracas?.slice(0, 2).map((materia: string) => (
                  <div
                    key={materia}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="font-medium text-gray-900">
                        {materia}
                      </span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Premium */}
            {user?.tipo_plano === 'free' && (
              <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Upgrade para Premium
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    Acesso ilimitado a simulados, correção de redações e muito
                    mais!
                  </p>
                  <Link
                    href="/premium"
                    className="block bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
