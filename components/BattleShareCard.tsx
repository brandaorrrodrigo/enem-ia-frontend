'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as htmlToImage from 'html-to-image';

// ============================================
// TIPOS E CONFIGURAÇÕES
// ============================================

type ShareCardFormat = 'square' | 'horizontal' | 'vertical';
type BattleResult = 'victory' | 'defeat' | 'draw';
type BattleMode = 'classic' | 'turbo' | 'marathon' | 'transmitido';

interface ShareCardConfig {
  width: number;
  height: number;
  platform: string;
  aspectRatio: string;
  scale: number; // Para preview no modal
}

const CARD_FORMATS: Record<ShareCardFormat, ShareCardConfig> = {
  square: { width: 1080, height: 1080, platform: 'Instagram Feed', aspectRatio: '1:1', scale: 0.35 },
  horizontal: { width: 1920, height: 1080, platform: 'Instagram Story', aspectRatio: '16:9', scale: 0.25 },
  vertical: { width: 1080, height: 1920, platform: 'TikTok / Reels', aspectRatio: '9:16', scale: 0.25 },
};

interface BattleShareCardProps {
  result: BattleResult;
  myName: string;
  opponentName: string;
  myScore: number;
  opponentScore: number;
  totalQuestions?: number;
  fpEarned?: number;
  fpGanho?: number;
  mode: BattleMode;
  league?: string;
  streak?: number;
  winStreak?: number;
  isPerfect?: boolean;
  inviteCode?: string;
  avgResponseTime?: number;
  comebackWin?: boolean;
  onClose: () => void;
  onShare: (platform: string, format: ShareCardFormat) => void;
}

const SHARE_MESSAGES = {
  victory: [
    'Venci uma batalha 1v1 no ENEM PRO!',
    'Desafiei e ganhei! Vem me enfrentar!',
    'Batalha insana! Ja estou evoluindo!',
    'Mais uma vitoria na Arena! Quem e o proximo?',
  ],
  defeat: [
    'Perdi, mas aprendi! Bora revanche?',
    'Batalha dificil, mas continuo firme!',
  ],
  draw: [
    'Empate epico! Ninguem cedeu!',
    'Batalha equilibrada! Proximo round decide!',
  ],
};

const MODE_LABELS: Record<BattleMode, string> = {
  classic: 'Classico',
  turbo: 'Turbo',
  marathon: 'Maratona',
  transmitido: 'AO VIVO',
};

const MODE_ICONS: Record<BattleMode, string> = {
  classic: '⚔️',
  turbo: '⚡',
  marathon: '🏃',
  transmitido: '📺',
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function BattleShareCard({
  result,
  myName,
  opponentName,
  myScore,
  opponentScore,
  totalQuestions = 5,
  fpEarned,
  fpGanho,
  mode,
  league,
  streak,
  winStreak,
  isPerfect,
  inviteCode,
  avgResponseTime,
  comebackWin,
  onClose,
  onShare,
}: BattleShareCardProps) {
  const fp = fpEarned ?? fpGanho ?? 0;
  const streakCount = winStreak ?? streak ?? 0;

  const squareRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);

  const [selectedFormat, setSelectedFormat] = useState<ShareCardFormat>('square');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    const messages = SHARE_MESSAGES[result];
    setShareMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [result]);

  const getCardRef = (format: ShareCardFormat) => {
    switch (format) {
      case 'square': return squareRef;
      case 'horizontal': return horizontalRef;
      case 'vertical': return verticalRef;
    }
  };

  const generateImage = async (format: ShareCardFormat): Promise<Blob | null> => {
    const ref = getCardRef(format);
    if (!ref.current) return null;
    setIsGenerating(true);

    try {
      const config = CARD_FORMATS[format];
      const dataUrl = await htmlToImage.toPng(ref.current, {
        quality: 1,
        pixelRatio: 2,
        width: config.width,
        height: config.height,
        backgroundColor: '#0d2818',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      const response = await fetch(dataUrl);
      return await response.blob();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async (platform: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = inviteCode ? `${baseUrl}/enem/batalha?invite=${inviteCode}` : baseUrl;
    const fullMessage = `${shareMessage} ${league ? `Liga ${league}!` : ''}\n\n${shareUrl}`;

    if (platform === 'download') {
      const blob = await generateImage(selectedFormat);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `batalha-${result}-${selectedFormat}-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(fullMessage)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`, '_blank');
    } else if (platform === 'instagram') {
      const blob = await generateImage(selectedFormat);
      if (blob && navigator.share) {
        try {
          const file = new File([blob], `batalha-${result}.png`, { type: 'image/png' });
          await navigator.share({ files: [file], title: 'ENEM PRO - Batalha' });
        } catch {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `batalha-${result}-${selectedFormat}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    } else if (platform === 'tiktok') {
      const blob = await generateImage('vertical');
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `batalha-${result}-tiktok.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }

    onShare(platform, selectedFormat);
  };

  const getResultEmoji = () => {
    if (result === 'victory') return isPerfect ? '💎' : '🏆';
    if (result === 'defeat') return '😔';
    return '🤝';
  };

  const getResultColor = () => {
    if (result === 'victory') return '#22c55e';
    if (result === 'defeat') return '#ef4444';
    return '#fbbf24';
  };

  const getResultText = () => {
    if (result === 'victory') return isPerfect ? 'VITORIA PERFEITA!' : 'VITORIA!';
    if (result === 'defeat') return 'DERROTA';
    return 'EMPATE!';
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  // ============================================
  // CARD QUADRADO (1080x1080) - Instagram Feed
  // ============================================
  const SquareCard = () => (
    <div
      ref={squareRef}
      className="relative overflow-hidden"
      style={{
        width: CARD_FORMATS.square.width,
        height: CARD_FORMATS.square.height,
        background: 'linear-gradient(180deg, #1a472a 0%, #0d2818 100%)',
        border: '16px solid #8B4513',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative pt-12 text-center">
        <div
          className="inline-block px-8 py-3 rounded-full text-2xl font-bold"
          style={{
            backgroundColor: mode === 'turbo' ? '#fbbf24' : mode === 'transmitido' ? '#ef4444' : '#22c55e',
            color: '#0d2818',
          }}
        >
          {MODE_ICONS[mode]} {MODE_LABELS[mode]}
        </div>
      </div>

      {/* Resultado */}
      <div className="relative px-12 py-8 text-center">
        <div className="text-[120px] mb-4">{getResultEmoji()}</div>
        <h2
          className="text-6xl font-bold mb-8"
          style={{
            color: getResultColor(),
            fontFamily: "'Patrick Hand', cursive",
            textShadow: `0 0 40px ${getResultColor()}40`,
          }}
        >
          {getResultText()}
        </h2>

        {/* Placar */}
        <div className="flex items-center justify-center gap-12 mb-8">
          <div className="text-center">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold mb-3"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: 'white' }}
            >
              {myScore}
            </div>
            <p className="text-white text-2xl truncate max-w-[200px]">{myName}</p>
          </div>

          <div className="text-6xl font-bold text-white/40">VS</div>

          <div className="text-center">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold mb-3"
              style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white' }}
            >
              {opponentScore}
            </div>
            <p className="text-white text-2xl truncate max-w-[200px]">{opponentName}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '3px solid #fbbf24' }}
          >
            <span className="text-4xl">🪙</span>
            <span className="text-3xl font-bold text-[#fbbf24]">+{fp} FP</span>
          </div>
          {avgResponseTime && (
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', border: '3px solid #3b82f6' }}
            >
              <span className="text-4xl">⏱️</span>
              <span className="text-3xl font-bold text-[#3b82f6]">{formatTime(avgResponseTime)}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex justify-center flex-wrap gap-4">
          {isPerfect && (
            <span className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 text-xl font-bold">
              💎 PERFEITO
            </span>
          )}
          {streakCount >= 3 && (
            <span className="px-4 py-2 rounded-xl bg-orange-500/20 text-orange-300 text-xl font-bold">
              🔥 {streakCount}x STREAK
            </span>
          )}
          {comebackWin && (
            <span className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 text-xl font-bold">
              🔄 VIRADA
            </span>
          )}
          {league && (
            <span className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 text-xl font-bold">
              🏅 Liga {league}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 px-12 py-6 text-center"
        style={{ borderTop: '3px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}
      >
        <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>
          ENEM PRO
        </p>
        <p className="text-xl text-white/50">A plataforma que te aprova!</p>
      </div>
    </div>
  );

  // ============================================
  // CARD HORIZONTAL (1920x1080) - Instagram Story
  // ============================================
  const HorizontalCard = () => (
    <div
      ref={horizontalRef}
      className="relative overflow-hidden"
      style={{
        width: CARD_FORMATS.horizontal.width,
        height: CARD_FORMATS.horizontal.height,
        background: 'linear-gradient(135deg, #1a472a 0%, #0d2818 50%, #1a472a 100%)',
        border: '12px solid #8B4513',
      }}
    >
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layout horizontal com 3 colunas */}
      <div className="relative h-full flex items-center justify-between px-16">
        {/* Coluna esquerda - Meu placar */}
        <div className="text-center flex-1">
          <div
            className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-bold mb-6 mx-auto"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: 'white' }}
          >
            {myScore}
          </div>
          <p className="text-white text-4xl font-bold truncate max-w-[300px] mx-auto">{myName}</p>
          {avgResponseTime && (
            <p className="text-white/60 text-2xl mt-2">⏱️ {formatTime(avgResponseTime)} média</p>
          )}
        </div>

        {/* Coluna central - Resultado */}
        <div className="text-center flex-1 px-8">
          <div
            className="inline-block px-6 py-2 rounded-full text-xl font-bold mb-6"
            style={{
              backgroundColor: mode === 'turbo' ? '#fbbf24' : mode === 'transmitido' ? '#ef4444' : '#22c55e',
              color: '#0d2818',
            }}
          >
            {MODE_ICONS[mode]} {MODE_LABELS[mode]}
          </div>

          <div className="text-[140px] mb-2">{getResultEmoji()}</div>

          <h2
            className="text-5xl font-bold mb-6"
            style={{
              color: getResultColor(),
              fontFamily: "'Patrick Hand', cursive",
              textShadow: `0 0 30px ${getResultColor()}40`,
            }}
          >
            {getResultText()}
          </h2>

          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl"
            style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '3px solid #fbbf24' }}
          >
            <span className="text-5xl">🪙</span>
            <span className="text-4xl font-bold text-[#fbbf24]">+{fp} FP</span>
          </div>

          {/* Badges horizontais */}
          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {isPerfect && (
              <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-lg font-bold">
                💎 PERFEITO
              </span>
            )}
            {streakCount >= 3 && (
              <span className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 text-lg font-bold">
                🔥 {streakCount}x
              </span>
            )}
            {comebackWin && (
              <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-lg font-bold">
                🔄 VIRADA
              </span>
            )}
            {league && (
              <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-lg font-bold">
                🏅 {league}
              </span>
            )}
          </div>
        </div>

        {/* Coluna direita - Oponente */}
        <div className="text-center flex-1">
          <div
            className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-bold mb-6 mx-auto"
            style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white' }}
          >
            {opponentScore}
          </div>
          <p className="text-white text-4xl font-bold truncate max-w-[300px] mx-auto">{opponentName}</p>
        </div>
      </div>

      {/* Branding no canto */}
      <div className="absolute bottom-6 right-8 text-right">
        <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>
          ENEM PRO
        </p>
        <p className="text-lg text-white/50">A plataforma que te aprova!</p>
      </div>
    </div>
  );

  // ============================================
  // CARD VERTICAL (1080x1920) - TikTok / Reels
  // ============================================
  const VerticalCard = () => (
    <div
      ref={verticalRef}
      className="relative overflow-hidden"
      style={{
        width: CARD_FORMATS.vertical.width,
        height: CARD_FORMATS.vertical.height,
        background: 'linear-gradient(180deg, #0d2818 0%, #1a472a 30%, #0d2818 70%, #1a472a 100%)',
        border: '12px solid #8B4513',
      }}
    >
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative pt-16 text-center">
        <p className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Patrick Hand', cursive" }}>
          ENEM PRO
        </p>
        <div
          className="inline-block px-8 py-3 rounded-full text-2xl font-bold"
          style={{
            backgroundColor: mode === 'turbo' ? '#fbbf24' : mode === 'transmitido' ? '#ef4444' : '#22c55e',
            color: '#0d2818',
          }}
        >
          {MODE_ICONS[mode]} BATALHA {MODE_LABELS[mode].toUpperCase()}
        </div>
      </div>

      {/* Resultado principal */}
      <div className="relative px-12 pt-12 text-center">
        <div className="text-[180px] mb-4">{getResultEmoji()}</div>
        <h2
          className="text-7xl font-bold mb-8"
          style={{
            color: getResultColor(),
            fontFamily: "'Patrick Hand', cursive",
            textShadow: `0 0 50px ${getResultColor()}40`,
          }}
        >
          {getResultText()}
        </h2>
      </div>

      {/* Placar grande central */}
      <div className="relative px-12 py-8">
        {/* Meu placar */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center text-6xl font-bold"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: 'white' }}
          >
            {myScore}
          </div>
          <div className="text-left">
            <p className="text-white text-3xl font-bold">{myName}</p>
            <p className="text-white/60 text-xl">EU</p>
          </div>
        </div>

        <div className="text-5xl font-bold text-white/30 text-center mb-8">VS</div>

        {/* Oponente */}
        <div className="flex items-center justify-center gap-8">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center text-6xl font-bold"
            style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white' }}
          >
            {opponentScore}
          </div>
          <div className="text-left">
            <p className="text-white text-3xl font-bold">{opponentName}</p>
            <p className="text-white/60 text-xl">OPONENTE</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative px-12 py-8">
        <div className="flex justify-center gap-6 mb-6">
          <div
            className="flex items-center gap-4 px-8 py-4 rounded-2xl"
            style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '3px solid #fbbf24' }}
          >
            <span className="text-5xl">🪙</span>
            <span className="text-4xl font-bold text-[#fbbf24]">+{fp} FP</span>
          </div>
        </div>

        {avgResponseTime && (
          <div className="flex justify-center mb-6">
            <div
              className="flex items-center gap-4 px-8 py-4 rounded-2xl"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', border: '3px solid #3b82f6' }}
            >
              <span className="text-5xl">⏱️</span>
              <span className="text-4xl font-bold text-[#3b82f6]">{formatTime(avgResponseTime)} média</span>
            </div>
          </div>
        )}

        {/* Badges verticais */}
        <div className="flex flex-col items-center gap-4">
          {isPerfect && (
            <span className="px-6 py-3 rounded-xl bg-purple-500/20 text-purple-300 text-2xl font-bold">
              💎 VITORIA PERFEITA
            </span>
          )}
          {streakCount >= 3 && (
            <span className="px-6 py-3 rounded-xl bg-orange-500/20 text-orange-300 text-2xl font-bold">
              🔥 {streakCount} VITORIAS SEGUIDAS
            </span>
          )}
          {comebackWin && (
            <span className="px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-300 text-2xl font-bold">
              🔄 VIRADA EPICA
            </span>
          )}
          {league && (
            <span className="px-6 py-3 rounded-xl bg-blue-500/20 text-blue-300 text-2xl font-bold">
              🏅 Liga {league}
            </span>
          )}
        </div>
      </div>

      {/* CTA no final */}
      <div
        className="absolute bottom-0 left-0 right-0 px-12 py-10 text-center"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.8))' }}
      >
        <p className="text-white/80 text-2xl mb-2">Quer batalhar comigo?</p>
        <p className="text-[#22c55e] text-3xl font-bold">Baixe o ENEM PRO!</p>
      </div>
    </div>
  );

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          className="w-full max-w-4xl py-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Seletor de formato */}
          <div className="flex justify-center gap-3 mb-6">
            {(Object.keys(CARD_FORMATS) as ShareCardFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  selectedFormat === format
                    ? 'bg-[#22c55e] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {format === 'square' && '◻️ Quadrado'}
                {format === 'horizontal' && '▬ Horizontal'}
                {format === 'vertical' && '▯ Vertical'}
              </button>
            ))}
          </div>

          {/* Info do formato */}
          <p className="text-center text-white/50 text-sm mb-4">
            {CARD_FORMATS[selectedFormat].platform} ({CARD_FORMATS[selectedFormat].aspectRatio})
          </p>

          {/* Preview do card selecionado */}
          <div className="flex justify-center mb-6">
            <div
              className="overflow-hidden rounded-xl shadow-2xl"
              style={{
                transform: `scale(${CARD_FORMATS[selectedFormat].scale})`,
                transformOrigin: 'top center',
                height: CARD_FORMATS[selectedFormat].height * CARD_FORMATS[selectedFormat].scale,
              }}
            >
              {selectedFormat === 'square' && <SquareCard />}
              {selectedFormat === 'horizontal' && <HorizontalCard />}
              {selectedFormat === 'vertical' && <VerticalCard />}
            </div>
          </div>

          {/* Mensagem */}
          <p className="text-center text-white/60 text-sm mb-4">{shareMessage}</p>

          {/* Botões de compartilhamento */}
          <div className="max-w-md mx-auto space-y-3">
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-all"
              >
                <span className="text-2xl">📱</span>
                <span className="text-xs text-white/80">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare('instagram')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#FCAF45]/20 hover:from-[#833AB4]/30 hover:via-[#FD1D1D]/30 hover:to-[#FCAF45]/30 transition-all"
              >
                <span className="text-2xl">📸</span>
                <span className="text-xs text-white/80">Instagram</span>
              </button>

              <button
                onClick={() => handleShare('tiktok')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-all border border-white/10"
              >
                <span className="text-2xl">🎵</span>
                <span className="text-xs text-white/80">TikTok</span>
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 transition-all"
              >
                <span className="text-2xl">🐦</span>
                <span className="text-xs text-white/80">X</span>
              </button>

              <button
                onClick={() => handleShare('telegram')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[#0088cc]/20 hover:bg-[#0088cc]/30 transition-all"
              >
                <span className="text-2xl">✈️</span>
                <span className="text-xs text-white/80">Telegram</span>
              </button>
            </div>

            <button
              onClick={() => handleShare('download')}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Gerando imagem...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Salvar Imagem ({CARD_FORMATS[selectedFormat].aspectRatio})
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
