'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
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

  function carregarDados() { try { setLoading(true); const fpTotal = parseInt(localStorage.getItem("fp_total") || "0"); setUser({ id: "1", nome: "Estudante", email: "estudante@enem-ia.com", pontosFP: fpTotal, nivel: fpTotal >= 1000 ? "Gold" : "Bronze" }); setRewards([{ id: "r1", nome: "Tema Escuro Premium", descricao: "Desbloqueie o tema escuro exclusivo", custoFP: 500, icone: "Star", categoria: "cosmetic", ativo: true, unico: true },{ id: "r2", nome: "Boost de XP 2x", descricao: "Ganhe o dobro de XP nos proximos 5 simulados", custoFP: 300, icone: "Zap", categoria: "boost", ativo: true, unico: false },{ id: "r3", nome: "Avatar Coruja", descricao: "Avatar especial de coruja para seu perfil", custoFP: 200, icone: "Crown", categoria: "cosmetic", ativo: true, unico: true },{ id: "r4", nome: "Distintivo ENEM Master", descricao: "Mostre que voce e um mestre do ENEM", custoFP: 1000, icone: "Trophy", categoria: "premium", ativo: true, unico: true },{ id: "r5", nome: "Dicas Extra IA", descricao: "Receba 10 dicas extras da IA nas questoes", custoFP: 150, icone: "Sparkles", categoria: "item", ativo: true, unico: false }]); } catch (err) { setError("Erro ao carregar dados da loja"); } finally { setLoading(false); } }

  function resgatar(reward: Reward) { if (!user) { setError("Voce precisa estar logado"); return; } if (user.pontosFP < reward.custoFP) { setError("FP insuficientes"); return; } setResgatando(reward.id); const novoFP = user.pontosFP - reward.custoFP; localStorage.setItem("fp_total", String(novoFP)); const resgatadas = JSON.parse(localStorage.getItem("recompensas_resgatadas") || "[]"); resgatadas.push(reward.id); localStorage.setItem("recompensas_resgatadas", JSON.stringify(resgatadas)); setUser({ ...user, pontosFP: novoFP }); setSuccessMessage(reward.nome + " resgatado com sucesso!"); setTimeout(() => setSuccessMessage(null), 3000); if (reward.unico) { setRewards(rewards.filter(r => r.id !== reward.id)); } setResgatando(null); }

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
        <div className="mb-8 pt-16">
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

      <ChalkBackToTop />
    </main>
  );
}
