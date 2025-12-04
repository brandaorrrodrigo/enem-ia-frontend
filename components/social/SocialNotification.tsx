'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  tipo: 'seguiu' | 'ultrapassou' | 'desafio' | 'conquista' | 'liga' | 'mencao' | 'sala';
  titulo: string;
  mensagem: string;
  emoji: string;
  usuarioOrigem?: string;
  timestamp: Date;
  lida: boolean;
  acao?: {
    texto: string;
    url: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    tipo: 'seguiu',
    titulo: 'Novo seguidor!',
    mensagem: 'Ana Silva comecou a te seguir',
    emoji: '👥',
    usuarioOrigem: 'Ana Silva',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    lida: false,
    acao: { texto: 'Ver perfil', url: '/enem/perfil/ana123' },
  },
  {
    id: '2',
    tipo: 'ultrapassou',
    titulo: 'Alerta de ranking!',
    mensagem: 'Gabriel te ultrapassou por 6 FP!',
    emoji: '⚡',
    usuarioOrigem: 'Gabriel',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    lida: false,
    acao: { texto: 'Desafiar', url: '/enem/simulado' },
  },
  {
    id: '3',
    tipo: 'conquista',
    titulo: 'Nova conquista!',
    mensagem: 'Voce desbloqueou "Mestre da Matematica"!',
    emoji: '🏆',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    lida: true,
  },
  {
    id: '4',
    tipo: 'sala',
    titulo: 'Convite para sala!',
    mensagem: 'Sofia te convidou para a sala ENEM-TX84',
    emoji: '🎯',
    usuarioOrigem: 'Sofia',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    lida: true,
    acao: { texto: 'Entrar', url: '/enem/desafios' },
  },
];

interface SocialNotificationProps {
  showBadge?: boolean;
  maxNotifications?: number;
}

export default function SocialNotification({ showBadge = true, maxNotifications = 5 }: SocialNotificationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setNotifications(mockNotifications.slice(0, maxNotifications));
    setUnreadCount(mockNotifications.filter(n => !n.lida).length);
  }, [maxNotifications]);

  const marcarComoLida = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, lida: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const marcarTodasComoLidas = () => {
    setNotifications(prev => prev.map(n => ({ ...n, lida: true })));
    setUnreadCount(0);
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const getNotificationColor = (tipo: Notification['tipo']): string => {
    const colors: Record<Notification['tipo'], string> = {
      seguiu: 'border-l-cyan-400',
      ultrapassou: 'border-l-red-400',
      desafio: 'border-l-purple-400',
      conquista: 'border-l-yellow-400',
      liga: 'border-l-orange-400',
      mencao: 'border-l-blue-400',
      sala: 'border-l-green-400',
    };
    return colors[tipo];
  };

  return (
    <div className="relative">
      {/* Botao de notificacoes */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
      >
        <span className="text-xl">🔔</span>
        {showBadge && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de notificacoes */}
      {isOpen && (
        <>
          {/* Overlay para fechar */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Lista de notificacoes */}
          <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-slate-900/98 backdrop-blur-xl border-2 border-white/20 rounded-2xl shadow-2xl z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-bold">Notificacoes</h3>
              {unreadCount > 0 && (
                <button
                  onClick={marcarTodasComoLidas}
                  className="text-yellow-300 text-xs hover:underline"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>

            {/* Lista */}
            <div className="divide-y divide-white/10">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <span className="text-4xl mb-2 block">🔕</span>
                  <p className="text-white/60 text-sm">Nenhuma notificacao</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => marcarComoLida(notif.id)}
                    className={`p-3 hover:bg-white/5 cursor-pointer transition border-l-4 ${getNotificationColor(notif.tipo)} ${
                      !notif.lida ? 'bg-white/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{notif.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white font-semibold text-sm truncate">{notif.titulo}</p>
                          <span className="text-white/40 text-xs flex-shrink-0">
                            {formatTimeAgo(notif.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs mt-0.5">{notif.mensagem}</p>
                        {notif.acao && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = notif.acao!.url;
                            }}
                            className="text-yellow-300 text-xs font-semibold mt-2 hover:underline"
                          >
                            {notif.acao.texto} →
                          </button>
                        )}
                      </div>
                      {!notif.lida && (
                        <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/enem/notificacoes';
                }}
                className="w-full text-center text-yellow-300 text-sm font-semibold hover:underline"
              >
                Ver todas as notificacoes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
