'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FPCoin from '@/components/FPCoin';
import FloatingBackButton from '@/components/FloatingBackButton';

interface SpectatorView {
  battleState: {
    status: string;
    mode: string;
    spectatorCount: number;
  };
  player1: { name: string; score: number; avatar?: string };
  player2: { name: string; score: number; avatar?: string };
  currentQuestion?: {
    enunciado: string;
    alternativas: Record<string, string>;
    timeLeft: number;
  };
  questionNumber: number;
  totalQuestions: number;
}

interface ChatMessage {
  id: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'chat' | 'system' | 'reaction';
}

const REACTIONS = ['🔥', '👏', '😮', '💪', '🎯'];

export default function AssistirBatalhaPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = params.code as string;

  const [view, setView] = useState<SpectatorView | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [spectatorId] = useState(`spec_${Date.now()}`);
  const [spectatorName, setSpectatorName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem('enem-pro-player-name') || '';
    if (name) {
      setSpectatorName(name);
    }
  }, []);

  useEffect(() => {
    if (!isJoined) return;

    // Join as spectator
    const joinSpectator = async () => {
      try {
        const res = await fetch('/api/battles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'join-spectator',
            roomCode,
            playerId: spectatorId,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setView(data.view);
        } else {
          setError('Transmissao nao encontrada');
        }
      } catch {
        setError('Erro de conexao');
      }
    };

    joinSpectator();

    // Polling for updates
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/battles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'spectator-view',
            roomCode,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setView(data.view);
        }

        // Get chat
        const chatRes = await fetch('/api/battles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'get-chat',
            roomCode,
          }),
        });

        const chatData = await chatRes.json();
        if (chatData.success) {
          setChatMessages(chatData.messages || []);
        }
      } catch {
        // Ignore polling errors
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      // Leave as spectator
      fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'leave-spectator',
          roomCode,
          playerId: spectatorId,
        }),
      });
    };
  }, [isJoined, roomCode, spectatorId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleJoin = () => {
    if (!spectatorName.trim()) return;
    localStorage.setItem('enem-pro-player-name', spectatorName);
    setIsJoined(true);
    setShowNameInput(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          roomCode,
          playerId: spectatorId,
          playerName: spectatorName,
          message: newMessage,
        }),
      });

      setNewMessage('');
    } catch {
      // Ignore errors
    }
  };

  const sendReaction = async (reaction: string) => {
    try {
      await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          roomCode,
          playerId: spectatorId,
          playerName: spectatorName,
          message: reaction,
        }),
      });
    } catch {
      // Ignore errors
    }
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex items-center justify-center p-4">
      <FloatingBackButton />
        <div className="bg-[#0d2818] rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📺</div>
          <h1 className="text-2xl font-bold text-white mb-2">Assistir Batalha</h1>
          <p className="text-white/60 mb-6">Entre seu nome para participar do chat</p>

          <input
            type="text"
            value={spectatorName}
            onChange={(e) => setSpectatorName(e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 mb-4 focus:outline-none focus:border-[#22c55e]"
            maxLength={20}
          />

          <button
            onClick={handleJoin}
            disabled={!spectatorName.trim()}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Entrar como Espectador
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-xl font-bold text-white mb-2">{error}</h1>
          <button
            onClick={() => router.push('/enem/batalha')}
            className="mt-4 bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex flex-col">
      <FloatingBackButton />
      {/* Header */}
      <div className="bg-[#0d2818]/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => router.push('/enem/batalha')}
          className="text-white/60 hover:text-white"
        >
          ← Sair
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-sm font-bold">AO VIVO</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white/60">👀</span>
          <span className="text-white font-bold">{view?.battleState.spectatorCount || 0}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Battle View */}
        <div className="flex-1 p-4">
          {/* Players */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center text-xl font-bold text-white">
                {view?.player1.score || 0}
              </div>
              <div>
                <p className="text-white font-bold">{view?.player1.name || '...'}</p>
                <p className="text-white/50 text-sm">Jogador 1</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white/40">VS</p>
              <p className="text-white/30 text-xs">
                {view?.questionNumber || 0}/{view?.totalQuestions || 0}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-white font-bold">{view?.player2.name || '...'}</p>
                <p className="text-white/50 text-sm">Jogador 2</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ef4444] to-[#f97316] flex items-center justify-center text-xl font-bold text-white">
                {view?.player2.score || 0}
              </div>
            </div>
          </div>

          {/* Question */}
          {view?.currentQuestion ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0d2818] rounded-xl p-6 border border-white/10"
            >
              <p className="text-white text-lg mb-4">{view.currentQuestion.enunciado}</p>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(view.currentQuestion.alternativas).map(([letra, texto]) => (
                  <div
                    key={letra}
                    className="bg-white/5 rounded-lg p-3 text-white/80"
                  >
                    <span className="font-bold mr-2">{letra})</span>
                    {texto}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#0d2818] rounded-xl p-12 border border-white/10 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-white font-bold">
                {view?.battleState.status === 'waiting' ? 'Aguardando jogadores...' :
                 view?.battleState.status === 'finished' ? 'Batalha encerrada!' :
                 'Proxima questao em breve...'}
              </p>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        <div className="lg:w-80 bg-[#0d2818]/50 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <div className="p-3 border-b border-white/10">
            <h3 className="text-white font-bold">Chat ao Vivo</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-60 lg:max-h-none">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <span className="text-[#22c55e] font-bold">{msg.senderName}: </span>
                <span className="text-white/80">{msg.message}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Reactions */}
          <div className="p-2 border-t border-white/10 flex justify-center gap-2">
            {REACTIONS.map((reaction) => (
              <button
                key={reaction}
                onClick={() => sendReaction(reaction)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {reaction}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Enviar mensagem..."
                className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none"
                maxLength={100}
              />
              <button
                onClick={sendMessage}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 rounded-lg font-bold transition-all"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
