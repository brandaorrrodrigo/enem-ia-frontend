'use client';

import { useState } from 'react';

interface UserProfile {
  id: string;
  nome: string;
  email?: string;
  avatar?: string;
  pontosFP: number;
  nivel: string;
  liga: string;
  streakAtual: number;
  streakMaximo: number;
  simuladosFeitos: number;
  mediaNotas: number;
  seguidores: number;
  seguindo: number;
  badges: { id: string; nome: string; emoji: string }[];
  posicaoRanking: number;
  isFollowing?: boolean;
}

interface ProfileCardProps {
  user: UserProfile;
  isOwnProfile?: boolean;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
  onChallenge?: (userId: string) => void;
  compact?: boolean;
}

export default function ProfileCard({
  user,
  isOwnProfile = false,
  onFollow,
  onUnfollow,
  onChallenge,
  compact = false,
}: ProfileCardProps) {
  const [following, setFollowing] = useState(user.isFollowing || false);
  const [followerCount, setFollowerCount] = useState(user.seguidores);

  const handleFollow = () => {
    if (following) {
      setFollowing(false);
      setFollowerCount((prev) => prev - 1);
      onUnfollow?.(user.id);
    } else {
      setFollowing(true);
      setFollowerCount((prev) => prev + 1);
      onFollow?.(user.id);
    }
  };

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

  if (compact) {
    return (
      <div className="card-ia p-4 flex items-center gap-4 hover:scale-[1.02] transition cursor-pointer">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
          {user.nome.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold truncate">{user.nome}</span>
            <span className="text-lg">{getLigaEmoji(user.liga)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-yellow-300">{user.pontosFP.toLocaleString()} FP</span>
            <span className="text-white/50">#{user.posicaoRanking}</span>
          </div>
        </div>

        {/* Acoes */}
        {!isOwnProfile && (
          <button
            onClick={handleFollow}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              following
                ? 'bg-white/10 text-white/70 hover:bg-white/20'
                : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300'
            }`}
          >
            {following ? 'Seguindo' : 'Seguir'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card-ia p-6">
      {/* Header com Avatar */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0 border-4 border-white/20">
          {user.nome.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white">{user.nome}</h3>
            <span className="text-2xl">{getLigaEmoji(user.liga)}</span>
          </div>
          <p className="text-white/60 text-sm">Liga {user.liga}</p>

          {/* Stats sociais */}
          <div className="flex items-center gap-4 mt-2">
            <div className="text-center">
              <span className="text-white font-bold">{followerCount}</span>
              <span className="text-white/60 text-xs ml-1">seguidores</span>
            </div>
            <div className="text-center">
              <span className="text-white font-bold">{user.seguindo}</span>
              <span className="text-white/60 text-xs ml-1">seguindo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botoes de Acao */}
      {!isOwnProfile && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleFollow}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition ${
              following
                ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20'
                : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300'
            }`}
          >
            {following ? '✓ Seguindo' : '👥 Seguir'}
          </button>
          <button
            onClick={() => onChallenge?.(user.id)}
            className="flex-1 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition"
          >
            ⚡ Desafiar
          </button>
        </div>
      )}

      {/* Estatisticas */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="stat-ia">
          <span className="stat-ia-value text-yellow-300">{user.pontosFP.toLocaleString()}</span>
          <span className="stat-ia-label">FP Total</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">#{user.posicaoRanking}</span>
          <span className="stat-ia-label">Ranking</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{user.streakAtual}🔥</span>
          <span className="stat-ia-label">Streak Atual</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{user.simuladosFeitos}</span>
          <span className="stat-ia-label">Simulados</span>
        </div>
      </div>

      {/* Media de Notas */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Media de Notas</span>
          <span className="text-2xl font-bold text-yellow-300">{user.mediaNotas.toFixed(0)}</span>
        </div>
        <div className="progress-ia mt-2">
          <div
            className="progress-ia-bar"
            style={{ width: `${(user.mediaNotas / 1000) * 100}%` }}
          />
        </div>
      </div>

      {/* Badges */}
      {user.badges.length > 0 && (
        <div>
          <p className="text-white/80 font-semibold text-sm mb-3">Conquistas em Destaque</p>
          <div className="flex flex-wrap gap-2">
            {user.badges.slice(0, 6).map((badge) => (
              <div
                key={badge.id}
                className="px-3 py-1.5 bg-white/10 rounded-full flex items-center gap-1.5"
                title={badge.nome}
              >
                <span>{badge.emoji}</span>
                <span className="text-white/80 text-xs">{badge.nome}</span>
              </div>
            ))}
            {user.badges.length > 6 && (
              <div className="px-3 py-1.5 bg-white/10 rounded-full">
                <span className="text-white/60 text-xs">+{user.badges.length - 6}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
