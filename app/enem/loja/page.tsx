'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Sparkles,
  Trophy,
  Zap,
  Gift,
  ArrowLeft,
  Check,
  Loader2,
  Star,
  Crown,
  Flame,
  Heart
} from 'lucide-react';

interface Reward {
  id: string;
  nome: string;
  descricao: string;
  custoFP: number;
  icone?: string;
  categoria: string;
  ativo: boolean;
  unico: boolean;
}

interface UserData {
  id: string;
  nome: string;
  email: string;
  pontosFP: number;
  nivel: string;
}

export default function LojaPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [resgatando, setResgatando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Carregar dados
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);

      // Buscar usuário (do localStorage ou API)
      const userLocal = localStorage.getItem('user');
      if (userLocal) {
        setUser(JSON.parse(userLocal));
      }

      // Buscar recompensas da loja (API REAL)
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/api/enem/rewards/loja`);
      const data = await response.json();

      if (data.recompensas) {
        // Mapeia para formato esperado
        const mappedRewards = data.recompensas.map((r: any) => ({
          id: r.id,
          nome: r.titulo,
          descricao: r.descricao,
          custoFP: r.custoFP,
          icone: r.emoji === '🌟' ? 'Star' : r.emoji === '👑' ? 'Crown' : r.emoji === '🔥' ? 'Flame' : 'Gift',
          categoria: r.categoria,
          ativo: r.disponivel,
          unico: false
        }));
        setRewards(mappedRewards);
      } else {
        setError('Erro ao carregar loja');
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados da loja');
    } finally {
      setLoading(false);
    }
  }

  async function resgatar(reward: Reward) {
    if (!user) {
      setError('Você precisa estar logado para resgatar recompensas');
      return;
    }

    if (user.pontosFP < reward.custoFP) {
      setError(`Você precisa de ${reward.custoFP - user.pontosFP} FP a mais para resgatar esta recompensa`);
      return;
    }

    try {
      setResgatando(reward.id);
      setError(null);

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const userId = localStorage.getItem('user_email') || user.email;

      const response = await fetch(`${BACKEND_URL}/api/enem/rewards/resgatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          reward_id: reward.id
        })
      });

      const data = await response.json();

      if (data.success) {
        // Atualizar FP do usuário
        const updatedUser = { ...user, pontosFP: data.fp_restante };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setSuccessMessage(`${reward.nome} resgatado com sucesso! 🎉`);

        // Limpar mensagem após 3s
        setTimeout(() => setSuccessMessage(null), 3000);

        // Recarregar se for recompensa única
        if (reward.unico) {
          await carregarDados();
        }
      } else {
        setError(data.mensagem || 'Erro ao resgatar recompensa');
      }
    } catch (err) {
      console.error('Erro ao resgatar:', err);
      setError('Erro ao resgatar recompensa');
    } finally {
      setResgatando(null);
    }
  }

  function getIconComponent(iconName?: string) {
    const icons: Record<string, any> = {
      Trophy, Zap, Gift, Star, Crown, Flame, Heart, Sparkles
    };
    return icons[iconName || 'Gift'] || Gift;
  }

  function getCategoriaColor(categoria: string) {
    const colors: Record<string, string> = {
      item: 'bg-blue-100 text-blue-700',
      boost: 'bg-purple-100 text-purple-700',
      cosmetic: 'bg-pink-100 text-pink-700',
      premium: 'bg-amber-100 text-amber-700'
    };
    return colors[categoria] || 'bg-gray-100 text-gray-700';
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6 animate-pulse">
            <div className="h-32 bg-white/60 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-white/60 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 flex items-center gap-3 mb-2">
                <ShoppingBag className="w-10 h-10" />
                Loja de Recompensas
              </h1>
              <p className="text-emerald-800/70">
                Troque seus Focus Points por recompensas incríveis
              </p>
            </div>

            {/* Saldo de FP */}
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 border-2 border-emerald-200">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-amber-500" />
                <div>
                  <p className="text-sm text-gray-600">Seus FP</p>
                  <p className="text-2xl font-bold text-emerald-900">
                    {user?.pontosFP || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-green-700 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Grid de Recompensas */}
        {rewards.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma recompensa disponível no momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => {
              const Icon = getIconComponent(reward.icone);
              const temFP = (user?.pontosFP || 0) >= reward.custoFP;

              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl"
                >
                  {/* Categoria */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoriaColor(reward.categoria)}`}>
                      {reward.categoria}
                    </span>
                    {reward.unico && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                        Único
                      </span>
                    )}
                  </div>

                  {/* Ícone */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                      <Icon className="w-10 h-10 text-emerald-600" />
                    </div>
                  </div>

                  {/* Nome e Descrição */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {reward.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 text-center min-h-[60px]">
                    {reward.descricao}
                  </p>

                  {/* Custo e Botão */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-lg font-bold">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span className="text-emerald-900">{reward.custoFP} FP</span>
                    </div>

                    <button
                      onClick={() => resgatar(reward)}
                      disabled={!temFP || resgatando === reward.id}
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        temFP
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {resgatando === reward.id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Resgatando...
                        </>
                      ) : (
                        <>
                          <Gift className="w-5 h-5" />
                          {temFP ? 'Resgatar' : 'FP Insuficientes'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dica */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Como ganhar mais FP?</h3>
              <p className="text-amber-800">
                Complete simulados, participe de desafios semanais e mantenha sua sequência de estudos para ganhar Focus Points!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
