'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AvatarUsuarioProps {
  userName?: string;
  avatarUrl?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  className?: string;
  onClick?: () => void;
}

// Tamanhos em pixels
const SIZES = {
  xs: 32,
  sm: 40,
  md: 64,
  lg: 96,
  xl: 128,
};

// Cores de fundo para iniciais (padrão ENEM PRO)
const BG_COLORS = [
  'from-emerald-500 to-green-600',
  'from-yellow-400 to-amber-500',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-red-500',
  'from-teal-500 to-emerald-500',
];

// Obter cor baseada no nome do usuario
function getColorForName(name: string): string {
  if (!name) return BG_COLORS[0];
  const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return BG_COLORS[charCode % BG_COLORS.length];
}

// Obter iniciais do nome
function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

export default function AvatarUsuario({
  userName = 'Estudante',
  avatarUrl,
  size = 'md',
  showBorder = true,
  className = '',
  onClick,
}: AvatarUsuarioProps) {
  const sizeInPx = SIZES[size];
  const initials = getInitials(userName);
  const bgColor = getColorForName(userName);

  // Tamanho da fonte das iniciais
  const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1.25rem',
    lg: '1.75rem',
    xl: '2.25rem',
  };

  const containerStyle: React.CSSProperties = {
    width: sizeInPx,
    height: sizeInPx,
    borderRadius: '9999px',
    overflow: 'hidden',
    flexShrink: 0,
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative',
  };

  const borderStyle: React.CSSProperties = showBorder
    ? {
        boxShadow: '0 0 0 3px rgba(255, 217, 102, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
      }
    : {};

  // Se tem avatarUrl, renderizar imagem
  if (avatarUrl) {
    return (
      <motion.div
        className={className}
        style={{ ...containerStyle, ...borderStyle }}
        whileHover={onClick ? { scale: 1.05 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
        onClick={onClick}
      >
        <Image
          src={avatarUrl}
          alt={`Avatar de ${userName}`}
          width={sizeInPx}
          height={sizeInPx}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          priority={size === 'lg' || size === 'xl'}
        />
      </motion.div>
    );
  }

  // Fallback: iniciais
  return (
    <motion.div
      className={`bg-gradient-to-br ${bgColor} ${className}`}
      style={{
        ...containerStyle,
        ...borderStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
    >
      <span
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: fontSizes[size],
          fontFamily: 'var(--font-kalam), sans-serif',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          letterSpacing: '-0.025em',
        }}
      >
        {initials}
      </span>
    </motion.div>
  );
}
