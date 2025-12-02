'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  ArrowLeft,
  Trophy,
  CheckCircle2,
  Sparkles,
  Calendar,
  TrendingUp,
  Zap,
  BookOpen,
  Flame,
  Award
} from 'lucide-react';

interface WeeklyChallenge {
  id: string;
  titulo: string;
  descricao: string;
  metaSimulados: number;
  metaFP: number;
  recompensaFP: number;
  semanaRef: string;
  ativo: boolean;
}

interface UserWeeklyProgress {
  id: string;
  simuladosFeitos: number;
  fpGanhos: number;
  concluido: boolean;
  dataInicio: string;
  dataConclusao?: string;
}

interface UserData {
  id: string;
  nome: string;
  pontosFP: number;
  nivel: string;
}

export default function DesafiosPage() {
  const router = useRouter();
  const [desafio, setDesafio] = useState<WeeklyChallenge | null>(null);
  const [progresso, setProgresso] = useState<UserWeeklyProgress | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [percentualConclusao, setPercentualConclusao] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarDesafio();
  }, []);

  async function carregarDesafio() {
    try {
      setLoading(true);

      // Buscar usuário
      const userLocal = localStorage.getItem('user');
      if (userLocal) {
        const userData = JSON.parse(userLocal);
        setUser(userData);

        // Buscar desafio da semana com progresso do usuário (API REAL)
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const userId = localStorage.getItem('user_email') || userData.email;

        const response = await fetch(
          `${BACKEND_URL}/api/enem/challenges/semana?user_id=${encodeURIComponent(userId)}`
        );
        const data = await response.json();

        if (data.desafio) {
          // Mapeia para formato esperado
          const mappedDesafio: WeeklyChallenge = {
            id: data.desafio.id,
            titulo: data.desafio.titulo,
            descricao: data.desafio.descricao,
            metaSimulados: data.desafio.meta,
            metaFP: 0,
            recompensaFP: data.desafio.recompensaFP,
            semanaRef: new Date(data.desafio.inicio).toISOString().substring(0, 10),
            ativo: true
          };

          const mappedProgresso: UserWeeklyProgress = {
            id: data.desafio.id,
            simuladosFeitos: data.desafio.progresso_atual,
            fpGanhos: data.desafio.concluido ? data.desafio.recompensaFP : 0,
            concluido: data.desafio.concluido,
            dataInicio: data.desafio.inicio,
            dataConclusao: data.desafio.concluido ? data.desafio.fim : undefined
          };

          const percentual = data.desafio.meta > 0
            ? Math.round((data.desafio.progresso_atual / data.desafio.meta) * 100)
            : 0;

          setDesafio(mappedDesafio);
          setProgresso(mappedProgresso);
          setPercentualConclusao(percentual);
        } else {
          setError(data.mensagem || 'Nenhum desafio ativo no momento');
        }
      }
    } catch (err) {
      console.error('Erro ao carregar desafio:', err);
      setError('Erro ao carregar desafio da semana');
    } finally {
      setLoading(false);
    }
  }

  function getProgressColor(percent: number) {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 75) return 'bg-emerald-500';
    if (percent >= 50) return 'bg-yellow-500';
    if (percent >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  }

  function formatarSemana(semanaRef: string) {
    // Formato: "2025-W46" -> "Semana 46 de 2025"
    const [ano, semana] = semanaRef.split('-W');
    return `Semana ${semana} de ${ano}`;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6 animate-pulse">
            <div className="h-32 bg-white/60 rounded-2xl" />
            <div className="h-96 bg-white/60 rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 flex items-center gap-3 mb-2">
                <Target className="w-10 h-10" />
                Desafios Semanais
              </h1>
              <p className="text-emerald-800/70">
                Complete desafios e ganhe FP extras toda semana!
              </p>
            </div>

            {/* FP Atual */}
            <div className="bg-white rounded-xl shadow-lg px-4 py-3 border-2 border-emerald-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-600">Seus FP</p>
                  <p className="text-lg font-bold text-emerald-900">{user?.pontosFP || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Sem Desafio */}
        {!desafio ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-emerald-100">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Nenhum desafio ativo
            </h2>
            <p className="text-gray-500">
              Não há desafio disponível para esta semana. Volte em breve!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Card Principal do Desafio */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-100">
              {/* Badge de Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    {formatarSemana(desafio.semanaRef)}
                  </span>
                </div>
                {progresso?.concluido ? (
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-700">Concluído!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                    <Flame className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-bold text-amber-700">Em Andamento</span>
                  </div>
                )}
              </div>

              {/* Título e Descrição */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {desafio.titulo}
              </h2>
              <p className="text-gray-600 mb-6">
                {desafio.descricao}
              </p>

              {/* Recompensa */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-6 border-2 border-amber-200">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-800">Recompensa</p>
                    <p className="text-xl font-bold text-amber-900">
                      {desafio.recompensaFP} FP
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso Geral */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progresso Total</span>
                  <span className="text-sm font-bold text-emerald-700">{percentualConclusao}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(percentualConclusao)} transition-all duration-500 rounded-full`}
                    style={{ width: `${percentualConclusao}%` }}
                  />
                </div>
              </div>

              {/* Metas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meta de Simulados */}
                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Simulados</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-800">Meta</span>
                      <span className="font-bold text-blue-900">{desafio.metaSimulados}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-800">Completados</span>
                      <span className="font-bold text-blue-900">{progresso?.simuladosFeitos || 0}</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden mt-2">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${Math.min(((progresso?.simuladosFeitos || 0) / desafio.metaSimulados) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Meta de FP */}
                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Focus Points</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-800">Meta</span>
                      <span className="font-bold text-purple-900">{desafio.metaFP} FP</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-800">Conquistados</span>
                      <span className="font-bold text-purple-900">{progresso?.fpGanhos || 0} FP</span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden mt-2">
                      <div
                        className="h-full bg-purple-600 transition-all duration-500"
                        style={{
                          width: `${Math.min(((progresso?.fpGanhos || 0) / desafio.metaFP) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Ação */}
              {!progresso?.concluido && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/simulado')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Fazer Simulado Agora
                  </button>
                </div>
              )}
            </div>

            {/* Dicas */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-emerald-900 mb-2">Como completar o desafio?</h3>
                  <ul className="space-y-1 text-emerald-800 text-sm">
                    <li>• Complete simulados para aumentar sua contagem</li>
                    <li>• Quanto melhor sua performance, mais FP você ganha</li>
                    <li>• Atinja ambas as metas (simulados E FP) para concluir o desafio</li>
                    <li>• A recompensa é creditada automaticamente ao completar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Histórico (se já concluído) */}
            {progresso?.concluido && progresso.dataConclusao && (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-green-900">Desafio Concluído!</h3>
                    <p className="text-green-700 text-sm">
                      Você completou este desafio em {new Date(progresso.dataConclusao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
