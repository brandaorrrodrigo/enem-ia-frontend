'use client';

import { useState } from 'react';

interface FriendButtonProps {
  userId: string;
  userName: string;
  isFollowing?: boolean;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showNotification?: boolean;
}

export default function FriendButton({
  userId,
  userName,
  isFollowing = false,
  onFollow,
  onUnfollow,
  size = 'md',
  showNotification = true,
}: FriendButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (following) {
      setFollowing(false);
      onUnfollow?.(userId);
      if (showNotification) {
        setNotification(`Voce deixou de seguir ${userName}`);
      }
    } else {
      setFollowing(true);
      onFollow?.(userId);
      if (showNotification) {
        setNotification(`👥 Conexao criada! Voce esta seguindo ${userName}!`);
      }
    }

    setLoading(false);

    // Limpar notificacao
    if (notification) {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`rounded-xl font-semibold transition-all ${getSizeClasses()} ${
          following
            ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/30'
            : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ...
          </span>
        ) : following ? (
          <span className="flex items-center gap-1.5">
            <span>✓</span>
            <span>Seguindo</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span>👥</span>
            <span>Seguir</span>
          </span>
        )}
      </button>

      {/* Notificacao toast */}
      {notification && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-900/95 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}
    </div>
  );
}
