'use client';

import { LucideIcon } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';

/**
 * IconFix - Componente wrapper para icones Lucide
 *
 * Garante:
 * - Cor branca visivel no tema escuro (lousa)
 * - Stroke padronizado em 1.8
 * - Tamanho consistente
 * - Contraste correto
 */

interface ChalkIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  color?: 'white' | 'yellow' | 'cream' | 'green' | 'orange' | 'blue' | 'pink';
  strokeWidth?: number;
}

const colorMap = {
  white: 'var(--chalk-white, #f5f5f0)',
  yellow: 'var(--chalk-yellow, #ffd966)',
  cream: 'var(--chalk-cream, #faf8f0)',
  green: 'var(--chalk-green, #98d8aa)',
  orange: 'var(--chalk-orange, #ffb347)',
  blue: 'var(--chalk-blue, #7dc4e4)',
  pink: 'var(--chalk-pink, #f5a9b8)',
};

export function ChalkIcon({
  icon: Icon,
  size = 20,
  className = '',
  color = 'white',
  strokeWidth = 1.8,
}: ChalkIconProps) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={`flex-shrink-0 ${className}`}
      style={{
        color: colorMap[color],
        stroke: colorMap[color],
      }}
    />
  );
}

/**
 * ChalkIconButton - Botao com icone estilo giz
 */
interface ChalkIconButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon;
  size?: number;
  iconColor?: 'white' | 'yellow' | 'cream' | 'green' | 'orange';
  variant?: 'ghost' | 'filled' | 'outline';
}

export const ChalkIconButton = forwardRef<HTMLButtonElement, ChalkIconButtonProps>(
  ({ icon: Icon, size = 20, iconColor = 'white', variant = 'ghost', className = '', ...props }, ref) => {
    const variantStyles = {
      ghost: 'hover:bg-white/10',
      filled: 'bg-white/10 hover:bg-white/20',
      outline: 'border-2 border-white/20 hover:border-white/40 hover:bg-white/10',
    };

    return (
      <button
        ref={ref}
        className={`p-2 rounded-lg transition-all duration-200 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <ChalkIcon icon={Icon} size={size} color={iconColor} />
      </button>
    );
  }
);

ChalkIconButton.displayName = 'ChalkIconButton';

/**
 * ChalkIconBadge - Badge com icone e texto
 */
interface ChalkIconBadgeProps {
  icon: LucideIcon;
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function ChalkIconBadge({
  icon: Icon,
  text,
  variant = 'default',
}: ChalkIconBadgeProps) {
  const variantStyles = {
    default: 'bg-yellow-400/20 border-yellow-400/35 text-yellow-300',
    success: 'bg-green-400/20 border-green-400/35 text-green-300',
    warning: 'bg-orange-400/20 border-orange-400/35 text-orange-300',
    error: 'bg-red-400/20 border-red-400/35 text-red-300',
    info: 'bg-blue-400/20 border-blue-400/35 text-blue-300',
  };

  const iconColors: Record<string, 'yellow' | 'green' | 'orange' | 'white' | 'blue'> = {
    default: 'yellow',
    success: 'green',
    warning: 'orange',
    error: 'white',
    info: 'blue',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]}`}
    >
      <ChalkIcon icon={Icon} size={14} color={iconColors[variant]} />
      {text}
    </span>
  );
}

/**
 * Componente para garantir visibilidade de icones em qualquer contexto
 * Use como wrapper em componentes que usam icones Lucide diretamente
 */
export function IconWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center [&_svg]:text-current [&_svg]:stroke-current ${className}`}
      style={{
        color: 'var(--chalk-white, #f5f5f0)',
      }}
    >
      {children}
    </span>
  );
}

export default ChalkIcon;
