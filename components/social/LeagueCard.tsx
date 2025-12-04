'use client';

import { useState, useEffect } from 'react';

interface League {
  id: string;
  nome: string;
  emoji: string;
  cor: string;
  corBg: string;
  minFP: number;
  maxFP: number;
  beneficios: string[];
}

const LIGAS: League[] = [
  {
    id: 'bronze',
    nome: 'Liga Bronze',
    emoji: '🥉',
    cor: 'text-amber-600',
    corBg: 'bg-amber-900/30 border-amber-600/50',
    minFP: 0,
    maxFP: 499,
    beneficios: ['Acesso ao feed social', 'Ranking basico'],
  },
  {
    id: 'prata',
    nome: 'Liga Prata',
    emoji: '🥈',
    cor: 'text-gray-300',
    corBg: 'bg-gray-700/30 border-gray-400/50',
    minFP: 500,
    maxFP: 1499,
    beneficios: ['Badges exclusivas', 'Desafios semanais'],
  },
  {
    id: 'ouro',
    nome: 'Liga Ouro',
    emoji: '🥇',
    cor: 'text-yellow-400',
    corBg: 'bg-yellow-900/30 border-yellow-500/50',
    minFP: 1500,
    maxFP: 3999,
    beneficios: ['Salas VIP', 'Multiplicador 1.5x FP'],
  },
  {
    id: 'platina',
    nome: 'Liga Platina',
    emoji: '💎',
    cor: 'text-cyan-300',
    corBg: 'bg-cyan-900/30 border-cyan-400/50',
    minFP: 4000,
    maxFP: 7999,
    beneficios: ['Acesso antecipado', 'Multiplicador 2x FP'],
  },
  {
    id: 'diamante',
    nome: 'Liga Diamante',
    emoji: '💠',
    cor: 'text-blue-300',
    corBg: 'bg-blue-900/30 border-blue-400/50',
    minFP: 8000,
    maxFP: 14999,
    beneficios: ['Badge diamante', 'Multiplicador 2.5x FP'],
  },
  {
    id: 'mestre',
    nome: 'Liga Mestre',
    emoji: '👑',
    cor: 'text-purple-300',
    corBg: 'bg-purple-900/30 border-purple-400/50',
    minFP: 15000,
    maxFP: 999999,
    beneficios: ['Status Lendario', 'Multiplicador 3x FP', 'Perfil Destaque'],
  },
];

interface LeagueCardProps {
  userFP: number;
  userName?: string;
  showProgress?: boolean;
  compact?: boolean;
}

export default function LeagueCard({ userFP, userName, showProgress = true, compact = false }: LeagueCardProps) {
  const [currentLeague, setCurrentLeague] = useState<League>(LIGAS[0]);
  const [nextLeague, setNextLeague] = useState<League | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Encontrar liga atual
    const liga = LIGAS.find(l => userFP >= l.minFP && userFP <= l.maxFP) || LIGAS[0];
    setCurrentLeague(liga);

    // Encontrar proxima liga
    const currentIndex = LIGAS.findIndex(l => l.id === liga.id);
    const next = currentIndex < LIGAS.length - 1 ? LIGAS[currentIndex + 1] : null;
    setNextLeague(next);

    // Calcular progresso
    if (next) {
      const range = next.minFP - liga.minFP;
      const current = userFP - liga.minFP;
      setProgress(Math.min((current / range) * 100, 100));
    } else {
      setProgress(100);
    }
  }, [userFP]);

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 ${currentLeague.corBg}`}>
        <span className="text-2xl">{currentLeague.emoji}</span>
        <div>
          <span className={`font-bold ${currentLeague.cor}`}>{currentLeague.nome}</span>
          <span className="text-white/60 text-sm ml-2">{userFP.toLocaleString()} FP</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-ia p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">{currentLeague.emoji}</div>
        <h3 className={`text-2xl font-bold ${currentLeague.cor}`}>{currentLeague.nome}</h3>
        {userName && <p className="text-white/70 mt-1">{userName}</p>}
      </div>

      {/* FP Atual */}
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-yellow-300">{userFP.toLocaleString()}</span>
        <span className="text-white/60 ml-2">FP</span>
      </div>

      {/* Barra de Progresso */}
      {showProgress && nextLeague && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">{currentLeague.nome}</span>
            <span className={nextLeague.cor}>{nextLeague.nome}</span>
          </div>
          <div className="progress-ia h-4">
            <div
              className="progress-ia-bar transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-white/60 text-sm mt-2">
            Faltam <span className="text-yellow-300 font-bold">{(nextLeague.minFP - userFP).toLocaleString()} FP</span> para subir!
          </p>
        </div>
      )}

      {/* Beneficios */}
      <div className="space-y-2">
        <p className="text-white/80 font-semibold text-sm mb-3">Seus beneficios:</p>
        {currentLeague.beneficios.map((beneficio, idx) => (
          <div key={idx} className="flex items-center gap-2 text-white/70 text-sm">
            <span className="text-yellow-300">✓</span>
            <span>{beneficio}</span>
          </div>
        ))}
      </div>

      {/* Proxima Liga Preview */}
      {nextLeague && (
        <div className={`mt-6 p-4 rounded-xl border-2 ${nextLeague.corBg} opacity-60`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{nextLeague.emoji}</span>
            <div>
              <p className={`font-bold ${nextLeague.cor}`}>{nextLeague.nome}</p>
              <p className="text-white/50 text-xs">Proximo nivel: {nextLeague.minFP.toLocaleString()} FP</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
