'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ChalkIcon } from '../IconFix';

interface ChalkCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'highlight' | 'gradient';
  gradient?: 'yellow' | 'blue' | 'purple' | 'green' | 'red';
  hover?: boolean;
  className?: string;
}

export function ChalkCard({
  children,
  variant = 'default',
  gradient,
  hover = true,
  className = '',
  ...props
}: ChalkCardProps) {
  const baseStyles = 'relative z-10 transition-all duration-300';

  const variantStyles = {
    default: `
      bg-black/50 backdrop-blur-md rounded-2xl border-2 border-white/15 p-6
      shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
    `,
    compact: `
      bg-black/40 backdrop-blur-sm rounded-xl border-1.5 border-white/12 p-4
      shadow-[0_4px_16px_rgba(0,0,0,0.3)]
    `,
    highlight: `
      bg-black/55 backdrop-blur-lg rounded-2xl border-2 border-yellow-400/30 p-6
      shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(255,217,102,0.1)]
    `,
    gradient: '',
  };

  const gradientStyles = {
    yellow: 'bg-gradient-to-br from-yellow-500/15 to-orange-500/10 border-yellow-400/25',
    blue: 'bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border-blue-400/25',
    purple: 'bg-gradient-to-br from-purple-500/15 to-pink-500/10 border-purple-400/25',
    green: 'bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-green-400/25',
    red: 'bg-gradient-to-br from-red-500/15 to-rose-500/10 border-red-400/25',
  };

  const hoverStyles = hover
    ? 'hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1'
    : '';

  let finalStyles = `${baseStyles} ${hoverStyles} ${className}`;

  if (variant === 'gradient' && gradient) {
    finalStyles += ` backdrop-blur-md rounded-2xl border-2 p-6 ${gradientStyles[gradient]}`;
  } else {
    finalStyles += ` ${variantStyles[variant]}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={finalStyles}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ChalkCardHeaderProps {
  icon?: LucideIcon;
  iconColor?: 'white' | 'yellow' | 'green' | 'blue' | 'orange' | 'pink' | 'cream';
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function ChalkCardHeader({
  icon,
  iconColor = 'yellow',
  title,
  subtitle,
  action,
}: ChalkCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${iconColor}-400/20`}>
            <ChalkIcon icon={icon} size={22} color={iconColor} />
          </div>
        )}
        <div>
          <h3
            className="text-white font-bold text-lg"
            style={{ fontFamily: 'var(--font-kalam)' }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/60 text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface ChalkStatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: 'yellow' | 'green' | 'blue' | 'pink' | 'orange' | 'white' | 'cream';
  size?: 'sm' | 'md' | 'lg';
}

export function ChalkStatCard({
  value,
  label,
  icon,
  color = 'yellow',
  size = 'md',
}: ChalkStatCardProps) {
  const colorStyles = {
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    pink: 'text-pink-400',
    orange: 'text-orange-400',
    white: 'text-white',
    cream: 'text-amber-100',
  };

  const sizeStyles = {
    sm: { value: 'text-xl', label: 'text-xs', icon: 18, padding: 'p-3' },
    md: { value: 'text-2xl', label: 'text-xs', icon: 22, padding: 'p-4' },
    lg: { value: 'text-3xl', label: 'text-sm', icon: 26, padding: 'p-5' },
  };

  const sizes = sizeStyles[size];

  return (
    <div
      className={`stat-ia ${sizes.padding} flex flex-col items-center justify-center gap-1`}
    >
      {icon && (
        <ChalkIcon icon={icon} size={sizes.icon} color={color} />
      )}
      <span
        className={`font-bold ${sizes.value} ${colorStyles[color]}`}
        style={{
          fontFamily: 'var(--font-kalam)',
          textShadow: `0 0 15px ${color === 'yellow' ? 'rgba(255,217,102,0.4)' : 'rgba(255,255,255,0.2)'}`,
        }}
      >
        {value}
      </span>
      <span className={`${sizes.label} text-white/60 uppercase tracking-wider font-semibold`}>
        {label}
      </span>
    </div>
  );
}

interface ChalkProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'yellow' | 'green' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

export function ChalkProgress({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'yellow',
  size = 'md',
}: ChalkProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorStyles = {
    yellow: 'from-yellow-400 to-orange-400',
    green: 'from-green-400 to-emerald-400',
    blue: 'from-blue-400 to-cyan-400',
    purple: 'from-purple-400 to-pink-400',
  };

  const textColors = {
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-white/80 text-sm font-medium">{label}</span>
          )}
          {showValue && (
            <span className={`text-sm font-bold ${textColors[color]}`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`progress-ia ${sizeStyles[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`progress-ia-bar bg-gradient-to-r ${colorStyles[color]}`}
        />
      </div>
    </div>
  );
}

export default ChalkCard;
