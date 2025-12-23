'use client';

import { useState, useEffect } from 'react';

interface RankingUser {
  id: string;
  posicao: number;
  nome: string;
  pontosFP: number;
  liga: string;
  streak: number;
  variacao: number; // positivo = subiu, negativo = desceu
  isCurrentUser?: boolean;
}

interface LeaderboardTableProps {
  type?: 'global' | 'amigos' | 'liga' | 'semanal';
  limit?: number;
  currentUserId?: string;
  showProvocations?: boolean;
}

const mockRanking: RankingUser[] = [
  { id: '1', posicao: 1, nome: 'Lucas Silva', pontosFP: 18450, liga: 'Mestre', streak: 45, variacao: 0 },
  { id: '2', posicao: 2, nome: 'Ana Costa', pontosFP: 16230, liga: 'Mestre', streak: 32, variacao: 2 },
  { id: '3', posicao: 3, nome: 'Pedro Santos', pontosFP: 14890, liga: 'Diamante', streak: 28, variacao: -1 },
  { id: '4', posicao: 4, nome: 'Maria Oliveira', pontosFP: 12450, liga: 'Diamante', streak: 21, variacao: 1 },
  { id: '5', posicao: 5, nome: 'Joao Ferreira', pontosFP: 11200, liga: 'Platina', streak: 19, variacao: 0 },
  { id: '6', posicao: 6, nome: 'Sofia Lima', pontosFP: 9870, liga: 'Platina', streak: 15, variacao: 3 },
  { id: '7', posicao: 7, nome: 'Gabriel Mendes', pontosFP: 8560, liga: 'Platina', streak: 12, variacao: -2 },
  { id: 'current', posicao: 8, nome: 'Voce', pontosFP: 7230, liga: 'Ouro', streak: 14, variacao: 4, isCurrentUser: true },
  { id: '9', posicao: 9, nome: 'Leticia Ramos', pontosFP: 6890, liga: 'Ouro', streak: 10, variacao: -1 },
  { id: '10', posicao: 10, nome: 'Matheus Alves', pontosFP: 6450, liga: 'Ouro', streak: 8, variacao: 0 },
];

const getLigaEmoji = (liga: string) => {
  const ligas: Record<string, string> = {
    Bronze: '🥉',
    Prata: '🥈',
    Ouro: '🥇',
    Platina: '💎',
    Diamante: '💠',
    Mestre: '👑',
  };
  return ligas[liga] || '🥉';
};

const getPosicaoStyle = (posicao: number) => {
  if (posicao === 1) return 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border-yellow-400/50';
  if (posicao === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-gray-300/50';
  if (posicao === 3) return 'bg-gradient-to-r from-amber-700/20 to-orange-600/20 border-amber-600/50';
  return 'border-white/10';
};

const getPosicaoEmoji = (posicao: number) => {
  if (posicao === 1) return '🥇';
  if (posicao === 2) return '🥈';
  if (posicao === 3) return '🥉';
  return `#${posicao}`;
};

export default function LeaderboardTable({
  type = 'global',
  limit = 10,
  currentUserId,
  showProvocations = true,
}: LeaderboardTableProps) {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'diario' | 'semanal' | 'mensal' | 'total'>('total');

  useEffect(() => {
    setTimeout(() => {
      setRanking(mockRanking.slice(0, limit));
      setLoading(false);
    }, 500);
  }, [type, limit, filter]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card-ia p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <div className="flex-1 h-4 bg-white/10 rounded" />
              <div className="w-16 h-4 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {(['diario', 'semanal', 'mensal', 'total'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
              filter === f
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {f === 'diario' && '📅 Hoje'}
            {f === 'semanal' && '📊 Semana'}
            {f === 'mensal' && '📈 Mes'}
            {f === 'total' && '🏆 Total'}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="space-y-2">
        {ranking.map((user, index) => (
          <div
            key={user.id}
            className={`card-ia p-4 border-2 transition-all hover:scale-[1.01] cursor-pointer ${
              user.isCurrentUser
                ? 'bg-yellow-400/10 border-yellow-400/50'
                : getPosicaoStyle(user.posicao)
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Posicao */}
              <div className="w-10 text-center font-bold">
                <span className={user.posicao <= 3 ? 'text-2xl' : 'text-white/70'}>
                  {getPosicaoEmoji(user.posicao)}
                </span>
              </div>

              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0 ${
                  user.isCurrentUser
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
              >
                {user.nome.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-bold truncate ${user.isCurrentUser ? 'text-yellow-300' : 'text-white'}`}>
                    {user.nome}
                  </span>
                  <span className="text-lg">{getLigaEmoji(user.liga)}</span>
                  {user.streak >= 7 && (
                    <span className="text-orange-400 text-sm">🔥{user.streak}</span>
                  )}
                </div>
              </div>

              {/* Variacao */}
              <div className="text-center w-12">
                {user.variacao > 0 && (
                  <span className="text-green-400 text-sm font-bold">↑{user.variacao}</span>
                )}
                {user.variacao < 0 && (
                  <span className="text-red-400 text-sm font-bold">↓{Math.abs(user.variacao)}</span>
                )}
                {user.variacao === 0 && (
                  <span className="text-white/40 text-sm">—</span>
                )}
              </div>

              {/* FP */}
              <div className="text-right flex items-center gap-1 justify-end">
                <img src="/moedafp1.png" alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span className="text-yellow-300 font-bold">{user.pontosFP.toLocaleString()}</span>
              </div>
            </div>

            {/* Provocacao (para usuarios proximos) */}
            {showProvocations && user.isCurrentUser && index > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-white/70 text-sm flex items-center gap-1 flex-wrap">
                  ⚡ <span className="text-yellow-300">{ranking[index - 1].nome}</span> esta apenas{' '}
                  <span className="text-yellow-300 font-bold flex items-center gap-1">
                    <img src="/moedafp1.png" alt="FP" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                    {(ranking[index - 1].pontosFP - user.pontosFP).toLocaleString()} FP
                  </span>{' '}
                  a sua frente! Bora ultrapassar?
                </p>
                <button className="btn-ia text-xs mt-2 py-1.5 w-full">
                  🚀 Fazer Simulado Agora
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mensagem motivacional */}
      <div className="card-ia p-4 mt-4 text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30">
        <p className="text-white/80">
          🔥 O ranking atualiza em tempo real! Continue estudando para subir de posicao!
        </p>
      </div>
    </div>
  );
}
