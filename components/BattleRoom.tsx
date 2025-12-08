'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FPCoin from './FPCoin';
import { BattleState, BattleQuestion, BattleAnswer } from '@/lib/battles/types';
import AvatarUsuario from './AvatarUsuario';

interface BattleRoomProps {
  roomCode: string;
  playerId: string;
  playerName: string;
  onLeave: () => void;
  onFinish: (result: { winner: string | null; rewards: Record<string, number>; record?: unknown }) => void;
}

const MODE_INFO = {
  classic: { name: 'Classico', icon: '⚔️', color: '#22c55e' },
  turbo: { name: 'Turbo', icon: '⚡', color: '#fbbf24' },
  marathon: { name: 'Maratona', icon: '🏃', color: '#3b82f6' },
  transmitido: { name: 'AO VIVO', icon: '📺', color: '#ef4444' },
};

export default function BattleRoom({
  roomCode,
  playerId,
  playerName,
  onLeave,
  onFinish,
}: BattleRoomProps) {
  const [battle, setBattle] = useState<BattleState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<BattleQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [opponentAnswered, setOpponentAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionResult, setQuestionResult] = useState<{
    answers: Record<string, BattleAnswer>;
    correctAnswer: string;
  } | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const questionStartTime = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch battle state
  const fetchBattle = useCallback(async () => {
    try {
      const res = await fetch(`/api/battles?roomCode=${roomCode}`);
      const data = await res.json();
      if (data.success) {
        setBattle(data.battle);

        // Check if opponent answered
        if (data.battle.currentAnswers) {
          const opponentId = data.battle.players.find((p: { id: string }) => p.id !== playerId)?.id;
          if (opponentId && data.battle.currentAnswers[opponentId]) {
            setOpponentAnswered(true);
          }
        }
      }
    } catch (err) {
      console.error('Erro ao buscar batalha:', err);
    }
  }, [roomCode, playerId]);

  // Mark as ready
  const handleReady = async () => {
    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ready',
          roomCode,
          playerId,
        }),
      });
      const data = await res.json();
      if (data.success && data.allReady) {
        startCountdown();
      }
      fetchBattle();
    } catch {
      setError('Erro ao marcar como pronto');
    }
  };

  // Start countdown
  const startCountdown = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          startBattle();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start battle
  const startBattle = async () => {
    try {
      await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          roomCode,
        }),
      });
      nextQuestion();
    } catch {
      setError('Erro ao iniciar batalha');
    }
  };

  // Next question
  const nextQuestion = async () => {
    try {
      setShowResult(false);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setOpponentAnswered(false);
      setQuestionResult(null);

      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'next-question',
          roomCode,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setCurrentQuestion(data.question);
        setQuestionNumber(data.number);
        setTimeLeft(data.question.timeLimit);
        questionStartTime.current = Date.now();
        startTimer(data.question.timeLimit);
      }
    } catch {
      setError('Erro ao carregar questao');
    }
  };

  // Timer
  const startTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!hasAnswered) {
            submitAnswer('');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Submit answer
  const submitAnswer = async (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const responseTime = Date.now() - questionStartTime.current;

    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          roomCode,
          playerId,
          answer,
          responseTime,
        }),
      });
      const data = await res.json();

      if (data.allAnswered) {
        showQuestionResult();
      }
    } catch {
      setError('Erro ao enviar resposta');
    }
  };

  // Show question result
  const showQuestionResult = async () => {
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'question-results',
          roomCode,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setQuestionResult({
          answers: data.answers,
          correctAnswer: data.correctAnswer,
        });
        setShowResult(true);

        // After 3 seconds, next question or finish
        setTimeout(() => {
          if (data.hasMoreQuestions) {
            nextQuestion();
          } else {
            finishBattle();
          }
        }, 3000);
      }
    } catch {
      setError('Erro ao buscar resultado');
    }
  };

  // Finish battle
  const finishBattle = async () => {
    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'finish',
          roomCode,
        }),
      });
      const data = await res.json();

      if (data.success) {
        onFinish({
          winner: data.winner,
          rewards: data.rewards,
          record: data.record,
        });
      }
    } catch {
      setError('Erro ao finalizar');
    }
  };

  // Leave battle
  const handleLeave = async () => {
    try {
      await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'leave',
          roomCode,
          playerId,
        }),
      });
      onLeave();
    } catch {
      onLeave();
    }
  };

  // Copy room code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Polling for state updates
  useEffect(() => {
    fetchBattle();
    const interval = setInterval(fetchBattle, 2000);
    return () => clearInterval(interval);
  }, [fetchBattle]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const opponent = battle?.players.find((p) => p.id !== playerId);
  const me = battle?.players.find((p) => p.id === playerId);
  const modeInfo = battle?.mode ? MODE_INFO[battle.mode as keyof typeof MODE_INFO] : MODE_INFO.classic;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a]">
      {/* Header */}
      <div className="bg-[#0d2818]/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-white/10">
        <button
          onClick={handleLeave}
          className="text-white/60 hover:text-white flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Sair
        </button>

        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: modeInfo.color + '30', color: modeInfo.color }}
          >
            {modeInfo.icon} {modeInfo.name}
          </span>
        </div>

        <div className="text-white/60 font-mono text-sm">
          {roomCode}
        </div>
      </div>

      {/* Split Screen - Players */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {/* Player 1 (Me) */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#0d2818] rounded-xl p-4 border-2"
          style={{ borderColor: '#22c55e' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-[#22c55e]/20">
              {me?.nome?.charAt(0) || 'V'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{me?.nome || 'Voce'}</p>
              <div className="flex items-center gap-2">
                <FPCoin size="sm" />
                <span className="text-[#fbbf24] font-bold">{me?.score || 0}</span>
              </div>
            </div>
          </div>
          {hasAnswered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2 text-center text-green-400 text-sm font-bold"
            >
              ✓ Respondido!
            </motion.div>
          )}
        </motion.div>

        {/* Player 2 (Opponent) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#0d2818] rounded-xl p-4 border-2"
          style={{ borderColor: opponent ? '#ef4444' : 'rgba(255,255,255,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
              style={{
                background: opponent
                  ? 'linear-gradient(135deg, #ef4444, #f97316)'
                  : 'rgba(255,255,255,0.1)',
                boxShadow: opponent ? '0 4px 15px rgba(239, 68, 68, 0.2)' : 'none',
              }}
            >
              {opponent?.nome?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{opponent?.nome || 'Aguardando...'}</p>
              <div className="flex items-center gap-2">
                <FPCoin size="sm" />
                <span className="text-[#fbbf24] font-bold">{opponent?.score || 0}</span>
              </div>
            </div>
          </div>
          {opponentAnswered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2 text-center text-red-400 text-sm font-bold"
            >
              ✓ Respondido!
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Main Area */}
      <div className="px-4 pb-4">
        <div
          className="bg-[#0d2818] rounded-2xl p-6 min-h-[400px] relative overflow-hidden"
          style={{
            border: '8px solid #8B4513',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Chalk texture overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Waiting for opponent */}
          {battle?.status === 'waiting' && (
            <div className="relative text-center py-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
              >
                ⚔️
              </motion.div>
              <h2
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Aguardando oponente...
              </h2>

              <div className="mb-6">
                <p className="text-white/60 mb-2">Compartilhe o codigo:</p>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="bg-[#1a472a] px-6 py-3 rounded-xl font-mono text-2xl text-[#fbbf24] tracking-widest"
                    animate={{ boxShadow: ['0 0 0 rgba(251,191,36,0)', '0 0 20px rgba(251,191,36,0.3)', '0 0 0 rgba(251,191,36,0)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {roomCode}
                  </motion.div>
                  <button
                    onClick={handleCopyCode}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              {battle.players.length === 2 && !me?.isReady && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleReady}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#22c55e]/20"
                >
                  Estou Pronto!
                </motion.button>
              )}
              {me?.isReady && (
                <p className="text-green-400 font-bold">Aguardando oponente ficar pronto...</p>
              )}
            </div>
          )}

          {/* Countdown */}
          <AnimatePresence>
            {countdown !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10"
              >
                <motion.div
                  key={countdown}
                  initial={{ scale: 3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-9xl font-bold"
                  style={{
                    color: '#fbbf24',
                    textShadow: '0 0 60px rgba(251, 191, 36, 0.5)',
                    fontFamily: "'Patrick Hand', cursive",
                  }}
                >
                  {countdown}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question */}
          {currentQuestion && !showResult && countdown === null && (
            <div className="relative">
              {/* Timer and question number */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/60">
                  Questao {questionNumber}/{battle?.config.totalQuestions || 5}
                </span>
                <motion.div
                  className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}
                  animate={timeLeft <= 5 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  ⏱️ {timeLeft}s
                </motion.div>
              </div>

              {/* Timer bar */}
              <div className="w-full h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: currentQuestion.timeLimit, ease: 'linear' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: timeLeft <= 5 ? '#ef4444' : '#fbbf24' }}
                />
              </div>

              {/* Question text */}
              <div className="bg-[#1a472a]/50 rounded-xl p-4 mb-6 border border-white/10">
                <p className="text-white text-lg leading-relaxed">
                  {currentQuestion.enunciado}
                </p>
              </div>

              {/* Alternatives */}
              <div className="space-y-3">
                {Object.entries(currentQuestion.alternativas).map(([letra, texto]) => (
                  <motion.button
                    key={letra}
                    onClick={() => submitAnswer(letra)}
                    disabled={hasAnswered}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      hasAnswered
                        ? selectedAnswer === letra
                          ? 'bg-[#fbbf24] text-[#0d2818] font-bold'
                          : 'bg-white/5 text-white/50'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span className="font-bold mr-3">{letra})</span>
                    {texto}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Question Result */}
          {showResult && questionResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="text-6xl mb-4"
              >
                {questionResult.answers[playerId]?.correct ? '✅' : '❌'}
              </motion.div>
              <h3
                className="text-3xl font-bold mb-2"
                style={{
                  color: questionResult.answers[playerId]?.correct ? '#22c55e' : '#ef4444',
                  fontFamily: "'Patrick Hand', cursive",
                }}
              >
                {questionResult.answers[playerId]?.correct ? 'Acertou!' : 'Errou!'}
              </h3>
              <p className="text-white/60 mb-6">
                Resposta correta: <span className="text-[#22c55e] font-bold">{questionResult.correctAnswer}</span>
              </p>

              <div className="grid grid-cols-2 gap-4">
                {battle?.players.map((p) => {
                  const answer = questionResult.answers[p.id];
                  const isMe = p.id === playerId;
                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl ${
                        answer?.correct
                          ? 'bg-green-500/20 border border-green-500'
                          : 'bg-red-500/20 border border-red-500'
                      }`}
                    >
                      <p className="font-bold text-white">{isMe ? 'Voce' : p.nome}</p>
                      <p className="text-sm text-white/60">
                        Resposta: {answer?.answer || 'Nao respondeu'}
                      </p>
                      <p className="text-sm text-white/60">
                        Tempo: {answer ? (answer.responseTime / 1000).toFixed(1) : '-'}s
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-400 text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
