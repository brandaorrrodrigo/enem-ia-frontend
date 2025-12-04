'use client';

import { useState, useEffect } from 'react';

interface Provocacao {
  id: string;
  tipo: 'ultrapassou' | 'proximo' | 'desafio' | 'streak' | 'liga' | 'geral';
  emoji: string;
  mensagem: string;
  usuarioAlvo?: string;
  valor?: number;
  acao?: {
    texto: string;
    url?: string;
  };
}

interface ProvocacaoCardProps {
  userId?: string;
  userFP?: number;
  userName?: string;
}

const gerarProvocacoes = (userName: string = 'Voce', userFP: number = 1000): Provocacao[] => {
  const provocacoes: Provocacao[] = [
    {
      id: '1',
      tipo: 'ultrapassou',
      emoji: '🔥',
      mensagem: `O Gabriel te passou por 6 FP! Vai aceitar isso?`,
      usuarioAlvo: 'Gabriel',
      valor: 6,
      acao: { texto: '⚡ Desafiar de Volta', url: '/enem/simulado' },
    },
    {
      id: '2',
      tipo: 'proximo',
      emoji: '😎',
      mensagem: `A Sofia esta apenas 24 FP a sua frente! Um simulado e voce passa!`,
      usuarioAlvo: 'Sofia',
      valor: 24,
      acao: { texto: '🚀 Ultrapassar Agora', url: '/enem/simulado' },
    },
    {
      id: '3',
      tipo: 'streak',
      emoji: '🔥',
      mensagem: `O Matheus ta com 14 dias de streak! Bora manter o ritmo?`,
      usuarioAlvo: 'Matheus',
      valor: 14,
      acao: { texto: '📚 Estudar Hoje', url: '/enem/simulado' },
    },
    {
      id: '4',
      tipo: 'liga',
      emoji: '💎',
      mensagem: `Faltam apenas 350 FP para voce subir para Liga Platina!`,
      valor: 350,
      acao: { texto: '🎯 Ir para Liga Platina', url: '/enem/simulado' },
    },
    {
      id: '5',
      tipo: 'desafio',
      emoji: '🏆',
      mensagem: `Nova sala de desafio criada! 8 pessoas ja entraram. Bora competir?`,
      acao: { texto: '🎮 Entrar na Sala', url: '/enem/desafios' },
    },
    {
      id: '6',
      tipo: 'geral',
      emoji: '⚡',
      mensagem: `O top 5 esta tremendo hoje! 3 pessoas ja mudaram de posicao!`,
      acao: { texto: '📊 Ver Ranking', url: '/enem/ranking' },
    },
  ];

  return provocacoes;
};

export default function ProvocacaoCard({ userId, userFP = 1000, userName = 'Voce' }: ProvocacaoCardProps) {
  const [provocacao, setProvocacao] = useState<Provocacao | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const provocacoes = gerarProvocacoes(userName, userFP);
    // Escolher uma provocacao aleatoria
    const random = provocacoes[Math.floor(Math.random() * provocacoes.length)];
    setProvocacao(random);
  }, [userName, userFP]);

  if (!provocacao || dismissed) return null;

  const getBgColor = (tipo: Provocacao['tipo']) => {
    const colors: Record<Provocacao['tipo'], string> = {
      ultrapassou: 'from-red-500/20 to-orange-500/20 border-red-400/50',
      proximo: 'from-green-500/20 to-emerald-500/20 border-green-400/50',
      streak: 'from-orange-500/20 to-yellow-500/20 border-orange-400/50',
      liga: 'from-purple-500/20 to-pink-500/20 border-purple-400/50',
      desafio: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50',
      geral: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/50',
    };
    return colors[tipo];
  };

  return (
    <div
      className={`card-ia p-4 bg-gradient-to-r ${getBgColor(provocacao.tipo)} border-2 relative overflow-hidden`}
    >
      {/* Botao de fechar */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-white/50 hover:text-white/80 transition"
      >
        ✕
      </button>

      {/* Conteudo */}
      <div className="flex items-start gap-3">
        <span className="text-3xl">{provocacao.emoji}</span>
        <div className="flex-1">
          <p className="text-white font-medium leading-relaxed">{provocacao.mensagem}</p>

          {provocacao.acao && (
            <button
              onClick={() => {
                if (provocacao.acao?.url) {
                  window.location.href = provocacao.acao.url;
                }
              }}
              className="btn-ia text-sm mt-3 py-2 px-4"
            >
              {provocacao.acao.texto}
            </button>
          )}
        </div>
      </div>

      {/* Efeito de brilho */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
