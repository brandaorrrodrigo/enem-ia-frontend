'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BattleRoom from '@/components/BattleRoom';
import BattleResult from '@/components/BattleResult';
import FloatingBackButton from '@/components/FloatingBackButton';

export default function BattleSalaPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = params.code as string;

  const [playerId, setPlayerId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [battleResult, setBattleResult] = useState<{
    winner: string | null;
    rewards: Record<string, number>;
  } | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalQuestions, setTotalQuestions] = useState(5);

  // Gerar ID de jogador se não existir
  useEffect(() => {
    let id = localStorage.getItem('enem-pro-player-id');
    if (!id) {
      id = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('enem-pro-player-id', id);
    }
    setPlayerId(id);

    const savedName = localStorage.getItem('enem-pro-player-name');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleJoin = async () => {
    if (!playerName.trim()) {
      setError('Digite seu nome');
      return;
    }

    setIsLoading(true);
    setError(null);

    localStorage.setItem('enem-pro-player-name', playerName);

    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          roomCode,
          playerId,
          playerName
        })
      });

      const data = await res.json();

      if (data.success) {
        setIsJoined(true);
      } else {
        setError(data.error || 'Erro ao entrar na sala');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = (result: { winner: string | null; rewards: Record<string, number> }) => {
    setBattleResult(result);
  };

  const handleLeave = () => {
    router.push('/enem/batalha');
  };

  const handleRematch = async () => {
    // Criar nova sala
    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          playerId,
          playerName
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/enem/batalha/sala/${data.roomCode}`);
        setBattleResult(null);
      }
    } catch {
      setError('Erro ao criar revanche');
    }
  };

  // Tela de entrar na sala
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex items-center justify-center p-4">
      <FloatingBackButton />
        <div className="bg-[#0d2818] rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Entrar na Batalha</h1>
          <p className="text-white/60 mb-6">
            Codigo da sala: <span className="text-[#fbbf24] font-mono text-xl">{roomCode}</span>
          </p>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 mb-4 focus:outline-none focus:border-[#22c55e]"
            maxLength={20}
          />

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleJoin}
            disabled={isLoading}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            {isLoading ? 'Entrando...' : 'Entrar na Batalha'}
          </button>

          <button
            onClick={() => router.push('/enem/batalha')}
            className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Tela de resultado
  if (battleResult) {
    return (
      <BattleResult
        winner={battleResult.winner}
        myId={playerId}
        myName={playerName}
        opponentName="Oponente"
        myScore={scores[playerId] || 0}
        opponentScore={Object.entries(scores).find(([id]) => id !== playerId)?.[1] || 0}
        myReward={battleResult.rewards[playerId] || 0}
        totalQuestions={totalQuestions}
        onClose={handleLeave}
        onRematch={handleRematch}
      />
    );
  }

  // Sala de batalha
  return (
    <BattleRoom
      roomCode={roomCode}
      playerId={playerId}
      playerName={playerName}
      onLeave={handleLeave}
      onFinish={handleFinish}
    />
  );
}
