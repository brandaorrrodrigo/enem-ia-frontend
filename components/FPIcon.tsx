import Image from 'next/image';

interface FPIconProps {
  size?: number;
  variant?: 1 | 2;
  className?: string;
}

export default function FPIcon({ size = 20, variant = 1, className = '' }: FPIconProps) {
  const imageSrc = variant === 1 ? '/moedafp1.png' : '/moedafp2.png';

  return (
    <img
      src={imageSrc}
      alt="FP"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'inline-block'
      }}
    />
  );
}

interface FPDisplayProps {
  amount: number;
  size?: number;
  variant?: 1 | 2;
  showLabel?: boolean;
  prefix?: string;
}

export function FPDisplay({
  amount,
  size = 20,
  variant = 1,
  showLabel = true,
  prefix = ''
}: FPDisplayProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <FPIcon size={size} variant={variant} />
      <span>
        {prefix}{amount.toLocaleString()}
        {showLabel && ' FP'}
      </span>
    </span>
  );
}
