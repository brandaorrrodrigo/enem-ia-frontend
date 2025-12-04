'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  usuarioAvatar?: string;
  tipo: 'fp_ganho' | 'badge_conquistada' | 'simulado_feito' | 'desafio_vencido' | 'nivel_subiu' | 'streak' | 'seguiu' | 'ultrapassou' | 'sala_criada' | 'top_ranking';
  descricao: string;
  valor?: number;
  emoji: string;
  timestamp: Date;
  destaque?: boolean;
}

interface ActivityFeedProps {
  userId?: string;
  feedType?: 'global' | 'amigos' | 'pessoal';
  limit?: number;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    usuarioId: 'ana123',
    usuarioNome: 'Ana Silva',
    tipo: 'fp_ganho',
    descricao: 'ganhou 24 FP na ultima hora!',
    valor: 24,
    emoji: '🔥',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    destaque: true,
  },
  {
    id: '2',
    usuarioId: 'joao456',
    usuarioNome: 'Joao Pedro',
    tipo: 'badge_conquistada',
    descricao: 'desbloqueou a medalha "Mestre da Matematica"!',
    emoji: '🏆',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '3',
    usuarioId: 'maria789',
    usuarioNome: 'Maria Santos',
    tipo: 'simulado_feito',
    descricao: 'completou um simulado com nota 780!',
    valor: 780,
    emoji: '📝',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: '4',
    usuarioId: 'gabriel101',
    usuarioNome: 'Gabriel Costa',
    tipo: 'ultrapassou',
    descricao: 'ultrapassou voce por 6 FP no ranking!',
    valor: 6,
    emoji: '⚡',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    destaque: true,
  },
  {
    id: '5',
    usuarioId: 'sofia202',
    usuarioNome: 'Sofia Lima',
    tipo: 'streak',
    descricao: 'completou 14 dias seguidos de estudo!',
    valor: 14,
    emoji: '🔥',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: '6',
    usuarioId: 'matheus303',
    usuarioNome: 'Matheus Oliveira',
    tipo: 'nivel_subiu',
    descricao: 'subiu para Liga Ouro!',
    emoji: '🥇',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    destaque: true,
  },
  {
    id: '7',
    usuarioId: 'leticia404',
    usuarioNome: 'Leticia Ferreira',
    tipo: 'sala_criada',
    descricao: 'criou a sala de desafio "ENEM-TX84"!',
    emoji: '🎯',
    timestamp: new Date(Date.now() - 1000 * 60 * 150),
  },
  {
    id: '8',
    usuarioId: 'lucas505',
    usuarioNome: 'Lucas Mendes',
    tipo: 'top_ranking',
    descricao: 'entrou no TOP 10 global!',
    emoji: '👑',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    destaque: true,
  },
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'agora';
  if (minutes < 60) return `${minutes}min`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
}

function getActivityColor(tipo: Activity['tipo']): string {
  const colors: Record<Activity['tipo'], string> = {
    fp_ganho: 'border-yellow-400/50 bg-yellow-400/10',
    badge_conquistada: 'border-purple-400/50 bg-purple-400/10',
    simulado_feito: 'border-blue-400/50 bg-blue-400/10',
    desafio_vencido: 'border-green-400/50 bg-green-400/10',
    nivel_subiu: 'border-orange-400/50 bg-orange-400/10',
    streak: 'border-red-400/50 bg-red-400/10',
    seguiu: 'border-cyan-400/50 bg-cyan-400/10',
    ultrapassou: 'border-pink-400/50 bg-pink-400/10',
    sala_criada: 'border-indigo-400/50 bg-indigo-400/10',
    top_ranking: 'border-amber-400/50 bg-amber-400/10',
  };
  return colors[tipo] || 'border-white/20 bg-white/5';
}

export default function ActivityFeed({ userId, feedType = 'global', limit = 10 }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setActivities(mockActivities.slice(0, limit));
      setLoading(false);
    }, 500);
  }, [feedType, limit]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-ia p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`card-ia p-4 border-2 transition-all hover:scale-[1.02] cursor-pointer ${
            activity.destaque ? getActivityColor(activity.tipo) : 'border-white/10'
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
              {activity.usuarioNome.charAt(0)}
            </div>

            {/* Conteudo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl">{activity.emoji}</span>
                <span className="text-white font-bold">{activity.usuarioNome}</span>
                <span className="text-white/70">{activity.descricao}</span>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-white/50 text-xs">{formatTimeAgo(activity.timestamp)}</span>

                {activity.destaque && (
                  <span className="badge-ia text-xs px-2 py-0.5">Em alta</span>
                )}
              </div>
            </div>

            {/* Valor (se houver) */}
            {activity.valor && (
              <div className="text-right flex-shrink-0">
                <span className="text-yellow-300 font-bold text-lg">
                  {activity.tipo === 'simulado_feito' ? activity.valor : `+${activity.valor}`}
                </span>
                <span className="text-white/50 text-xs block">
                  {activity.tipo === 'simulado_feito' ? 'nota' : activity.tipo === 'streak' ? 'dias' : 'FP'}
                </span>
              </div>
            )}
          </div>

          {/* Botao de acao (para alguns tipos) */}
          {activity.tipo === 'ultrapassou' && (
            <button className="btn-ia-secondary text-xs mt-3 w-full py-2">
              ⚡ Desafiar de Volta!
            </button>
          )}

          {activity.tipo === 'sala_criada' && (
            <button className="btn-ia text-xs mt-3 w-full py-2">
              🎯 Entrar na Sala
            </button>
          )}
        </div>
      ))}

      {activities.length === 0 && (
        <div className="card-ia p-8 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-white/70">Nenhuma atividade recente</p>
          <p className="text-white/50 text-sm mt-2">Comece a estudar para aparecer no feed!</p>
        </div>
      )}
    </div>
  );
}
