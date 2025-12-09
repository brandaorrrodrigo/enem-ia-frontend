'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

// Tipos
type ChallengeType = 'normal' | 'turbo' | 'maratona' | 'aposta' | 'jackpot';
type Difficulty = 'basico' | 'intermediario' | 'avancado';

interface UserFPData {
  totalFP: number;
  weeklyFP: number;
  streak: number;
}

interface JackpotData {
  totalPool: number;
  entriesCount: number;
  userEntry?: { score: number; position: number };
  endsAt: string;
}

export default function DesafiosFPPage() {
  const [userFP, setUserFP] = useState<UserFPData>({ totalFP: 100, weeklyFP: 0, streak: 0 });
  const [jackpotData, setJackpotData] = useState<JackpotData | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('basico');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ won?: boolean; fpDelta?: number; message?: string } | null>(null);

  // Mock userId (em producao usar auth)
  const userId = 'user-demo-123';

  // Carregar dados do jackpot
  useEffect(() => {
    async function fetchJackpot() {
      try {
        const res = await fetch(`/api/jackpot/status?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setJackpotData(data.data);
        }
      } catch {
        console.log('Erro ao carregar jackpot');
      }
    }
    fetchJackpot();
    const interval = setInterval(fetchJackpot, 30000); // Atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  // Max bet baseado no FP total
  const maxBet = Math.floor(userFP.totalFP * 0.2);

  // Tempo restante do jackpot
  const getTimeRemaining = () => {
    if (!jackpotData?.endsAt) return '00:00:00';
    const end = new Date(jackpotData.endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [timeRemaining, setTimeRemaining] = useState('00:00:00');
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [jackpotData]);

  // Iniciar desafio
  const handleStartChallenge = async (type: ChallengeType) => {
    if (type === 'jackpot') {
      // Entrada no jackpot
      setIsLoading(true);
      try {
        const res = await fetch('/api/jackpot/enter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            score: Math.floor(Math.random() * 100), // Mock score
            timeSpent: 120,
            questionsCount: 10,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setUserFP(prev => ({ ...prev, totalFP: prev.totalFP - 5 }));
          setResult({
            message: data.data.message,
            fpDelta: -5,
          });
          setShowResult(true);
        }
      } catch {
        console.log('Erro ao entrar no jackpot');
      }
      setIsLoading(false);
      return;
    }

    // Outros desafios - navegar para a pagina do desafio
    setSelectedChallenge(type);
  };

  // Simular conclusao de desafio
  const handleCompleteChallenge = async () => {
    if (!selectedChallenge) return;

    setIsLoading(true);

    // Mock de resultado
    const mockAccuracy = 0.6 + Math.random() * 0.4; // 60-100%
    const mockTime = 60 + Math.floor(Math.random() * 120); // 60-180s

    let endpoint = `/api/desafios/${selectedChallenge}`;
    const body: Record<string, unknown> = {
      userId,
      accuracy: mockAccuracy,
      time: mockTime,
      difficulty,
      userTier: 'free',
      questionsCount: selectedChallenge === 'maratona' ? 20 : 10,
      correctAnswers: Math.round((selectedChallenge === 'maratona' ? 20 : 10) * mockAccuracy),
    };

    if (selectedChallenge === 'aposta') {
      body.betAmount = betAmount;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        const fpChange = selectedChallenge === 'aposta'
          ? data.data.fpDelta
          : data.data.fpEarned;

        setUserFP(prev => ({
          ...prev,
          totalFP: data.data.fpTotal || data.data.newBalance || prev.totalFP + fpChange,
          weeklyFP: prev.weeklyFP + (fpChange > 0 ? fpChange : 0),
        }));

        setResult({
          won: selectedChallenge === 'aposta' ? data.data.result === 'win' : true,
          fpDelta: fpChange,
          message: data.data.message || `Voce ${fpChange >= 0 ? 'ganhou' : 'perdeu'} ${Math.abs(fpChange)} FP!`,
        });
        setShowResult(true);
      }
    } catch {
      console.log('Erro no desafio');
    }

    setIsLoading(false);
    setSelectedChallenge(null);
  };

  // Card de desafio
  const ChallengeCard = ({
    type,
    title,
    description,
    icon,
    color,
    baseFP,
    special,
  }: {
    type: ChallengeType;
    title: string;
    description: string;
    icon: string;
    color: string;
    baseFP: string;
    special?: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleStartChallenge(type)}
      className="cursor-pointer rounded-2xl p-6 border-4 transition-all"
      style={{
        background: `linear-gradient(145deg, ${color}20, ${color}10)`,
        borderColor: `${color}50`,
        boxShadow: `0 10px 40px ${color}20`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{icon}</span>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{
            background: `${color}30`,
            color: color,
          }}
        >
          {baseFP}
        </div>
      </div>
      <h3
        className="text-xl font-bold text-white mb-2"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        {title}
      </h3>
      <p className="text-white/70 text-sm mb-3">{description}</p>
      {special && (
        <div className="flex items-center gap-2 text-xs" style={{ color }}>
          <span>⭐</span>
          <span>{special}</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background: 'linear-gradient(to bottom, #0a1f13, #0d2818, #0a1f13)',
      }}
    >
      <FloatingBackButton />
      <FloatingNav />

      <div className="max-w-6xl mx-auto pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            ⚡ Desafios FP
          </h1>
          <p className="text-white/70 text-lg">
            Complete desafios e ganhe Focus Points!
          </p>

          {/* FP Display */}
          <div className="flex justify-center gap-6 mt-6">
            <div
              className="px-6 py-3 rounded-xl"
              style={{
                background: 'linear-gradient(145deg, #1a4030, #0e2818)',
                border: '3px solid #8B4513',
              }}
            >
              <span className="text-yellow-400 text-3xl font-bold">{userFP.totalFP}</span>
              <span className="text-white/70 ml-2">FP Total</span>
            </div>
            <div
              className="px-6 py-3 rounded-xl"
              style={{
                background: 'linear-gradient(145deg, #1a4030, #0e2818)',
                border: '3px solid #8B4513',
              }}
            >
              <span className="text-green-400 text-2xl font-bold">+{userFP.weeklyFP}</span>
              <span className="text-white/70 ml-2">Esta Semana</span>
            </div>
          </div>
        </motion.div>

        {/* Grid de Desafios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ChallengeCard
            type="normal"
            title="Desafio Normal"
            description="10 questoes em tempo livre. Ideal para treinar no seu ritmo."
            icon="📚"
            color="#22c55e"
            baseFP="15 FP base"
          />

          <ChallengeCard
            type="turbo"
            title="Desafio Turbo"
            description="10 questoes com tempo reduzido. Para os mais rapidos!"
            icon="⚡"
            color="#eab308"
            baseFP="20 FP base"
            special="+10 FP bonus"
          />

          <ChallengeCard
            type="maratona"
            title="Desafio Maratona"
            description="20 questoes para testar seu conhecimento completo."
            icon="🏃"
            color="#3b82f6"
            baseFP="40 FP base"
            special="+20 FP se 15+ acertos"
          />

          {/* Card de Aposta */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="rounded-2xl p-6 border-4 col-span-1 md:col-span-2 lg:col-span-1"
            style={{
              background: 'linear-gradient(145deg, #dc262620, #dc262610)',
              borderColor: '#dc262650',
              boxShadow: '0 10px 40px #dc262620',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">🎰</span>
              <div
                className="px-3 py-1 rounded-full text-sm font-bold"
                style={{
                  background: '#dc262630',
                  color: '#dc2626',
                }}
              >
                RISCO
              </div>
            </div>
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              Desafio de Aposta
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Aposte seus FP! Acerte 70%+ e dobre sua aposta.
            </p>

            {/* Slider de Aposta */}
            <div className="mb-4">
              <label className="text-white/70 text-sm mb-2 block">
                Valor da Aposta: <span className="text-yellow-400 font-bold">{betAmount} FP</span>
              </label>
              <input
                type="range"
                min="10"
                max={Math.min(50, maxBet)}
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>10 FP</span>
                <span>Max: {Math.min(50, maxBet)} FP</span>
              </div>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-red-400">Risco: -{betAmount} FP</span>
              <span className="text-green-400">Ganho: +{betAmount * 2} FP</span>
            </div>

            <button
              onClick={() => handleStartChallenge('aposta')}
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(145deg, #dc2626, #b91c1c)',
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              Apostar {betAmount} FP
            </button>
          </motion.div>

          {/* Card Jackpot */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="rounded-2xl p-6 border-4 col-span-1 md:col-span-2"
            style={{
              background: 'linear-gradient(145deg, #9333ea20, #9333ea10)',
              borderColor: '#9333ea50',
              boxShadow: '0 10px 40px #9333ea20',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-4xl">🏆</span>
                <span className="text-4xl ml-2">💰</span>
              </div>
              <div
                className="px-3 py-1 rounded-full text-sm font-bold animate-pulse"
                style={{
                  background: '#9333ea30',
                  color: '#9333ea',
                }}
              >
                ACUMULADO
              </div>
            </div>

            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              Jackpot Diario
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(147, 51, 234, 0.2)' }}
              >
                <div className="text-3xl font-bold text-purple-400">
                  {jackpotData?.totalPool || 0}
                </div>
                <div className="text-white/70 text-sm">FP Acumulado</div>
              </div>

              <div
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(147, 51, 234, 0.2)' }}
              >
                <div className="text-3xl font-bold text-white">
                  {jackpotData?.entriesCount || 0}
                </div>
                <div className="text-white/70 text-sm">Participantes</div>
              </div>

              <div
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(147, 51, 234, 0.2)' }}
              >
                <div className="text-2xl font-bold text-yellow-400 font-mono">
                  {timeRemaining}
                </div>
                <div className="text-white/70 text-sm">Tempo Restante</div>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-4">
              Entre com 5 FP e complete um desafio. O maior score do dia leva tudo!
            </p>

            <button
              onClick={() => handleStartChallenge('jackpot')}
              disabled={userFP.totalFP < 5}
              className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(145deg, #9333ea, #7c3aed)',
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              Entrar por 5 FP
            </button>

            {jackpotData?.userEntry && (
              <div className="mt-4 text-center text-white/70">
                Sua posicao: <span className="text-purple-400 font-bold">#{jackpotData.userEntry.position}</span>
                {' '}com <span className="text-yellow-400">{jackpotData.userEntry.score} pts</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Dificuldade Selector */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: 'linear-gradient(145deg, #1a4030, #0e2818)',
            border: '3px solid #8B4513',
          }}
        >
          <h3
            className="text-xl font-bold text-white mb-4"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            🎯 Nivel de Dificuldade
          </h3>
          <div className="flex gap-4 flex-wrap">
            {(['basico', 'intermediario', 'avancado'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  difficulty === d
                    ? 'scale-105'
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{
                  background: difficulty === d
                    ? d === 'basico'
                      ? 'linear-gradient(145deg, #22c55e, #16a34a)'
                      : d === 'intermediario'
                      ? 'linear-gradient(145deg, #eab308, #ca8a04)'
                      : 'linear-gradient(145deg, #ef4444, #dc2626)'
                    : 'rgba(255,255,255,0.1)',
                  fontFamily: "'Patrick Hand', cursive",
                }}
              >
                {d === 'basico' && '🟢 Basico (x1)'}
                {d === 'intermediario' && '🟡 Intermediario (x1.2)'}
                {d === 'avancado' && '🔴 Avancado (x1.5)'}
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(145deg, #1a4030, #0e2818)',
            border: '3px solid #8B4513',
          }}
        >
          <h3
            className="text-xl font-bold text-white mb-4"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            📊 Como funcionam os FP?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-white/70 text-sm">
            <div>
              <p className="mb-2"><strong className="text-white">Base FP:</strong> Cada desafio tem um valor base</p>
              <p className="mb-2"><strong className="text-white">Acuracia:</strong> +0 a +10 FP baseado nos acertos</p>
              <p className="mb-2"><strong className="text-white">Tempo:</strong> +0 a +15 FP por rapidez</p>
            </div>
            <div>
              <p className="mb-2"><strong className="text-white">Dificuldade:</strong> Multiplicador de x1 a x1.5</p>
              <p className="mb-2"><strong className="text-white">Assinatura:</strong> Free x1, Pro x1.5, Premium x2</p>
              <p className="mb-2"><strong className="text-white">Anti-fraude:</strong> Tempo minimo de 2s/questao</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Desafio em Andamento */}
      <AnimatePresence>
        {selectedChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-md rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(145deg, #1a4030, #0e2818)',
                border: '4px solid #8B4513',
              }}
            >
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                {selectedChallenge === 'normal' && '📚 Desafio Normal'}
                {selectedChallenge === 'turbo' && '⚡ Desafio Turbo'}
                {selectedChallenge === 'maratona' && '🏃 Desafio Maratona'}
                {selectedChallenge === 'aposta' && '🎰 Desafio de Aposta'}
              </h3>

              <p className="text-white/70 mb-6">
                Preparando {selectedChallenge === 'maratona' ? '20' : '10'} questoes de nivel {difficulty}...
              </p>

              {/* Mock de progresso */}
              <div className="mb-6">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    fontFamily: "'Patrick Hand', cursive",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCompleteChallenge}
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(145deg, #22c55e, #16a34a)',
                    fontFamily: "'Patrick Hand', cursive",
                  }}
                >
                  {isLoading ? 'Processando...' : 'Simular Resultado'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Resultado */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="w-full max-w-md rounded-2xl p-8 text-center"
              style={{
                background: result.fpDelta && result.fpDelta >= 0
                  ? 'linear-gradient(145deg, #166534, #14532d)'
                  : 'linear-gradient(145deg, #991b1b, #7f1d1d)',
                border: '4px solid #8B4513',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">
                {result.fpDelta && result.fpDelta >= 0 ? '🎉' : '😔'}
              </div>

              <h3
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                {result.fpDelta && result.fpDelta >= 0 ? 'Parabens!' : 'Tente Novamente!'}
              </h3>

              <div className="text-4xl font-bold mb-4" style={{
                color: result.fpDelta && result.fpDelta >= 0 ? '#22c55e' : '#ef4444',
              }}>
                {result.fpDelta && result.fpDelta >= 0 ? '+' : ''}{result.fpDelta} FP
              </div>

              <p className="text-white/80 mb-6">{result.message}</p>

              <button
                onClick={() => setShowResult(false)}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                  fontFamily: "'Patrick Hand', cursive",
                }}
              >
                Continuar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
