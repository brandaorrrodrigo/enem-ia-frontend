'use client';

import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import * as QRCode from 'qrcode';
import FPCoin from './FPCoin';

// ============================================
// TIPOS DE CONQUISTAS COMPARTILHÁVEIS
// ============================================

export type ShareType =
  | 'battle_win'        // Vitória em batalha 1v1
  | 'badge_unlock'      // Conquista de badge
  | 'simulado_complete' // Finalização de simulado
  | 'personal_record'   // Recorde pessoal
  | 'top_ranking'       // Top 100 ranking
  | 'weekly_goal'       // Meta semanal concluída
  | 'live_event_win'    // Ganhou evento ao vivo
  | 'high_score';       // Nota 900+ no simulado

export interface ShareData {
  type: ShareType;
  userName: string;
  userAvatar?: string;
  fpAmount: number;
  tier?: 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';
  streak?: number;
  badgeName?: string;
  badgeIcon?: string;
  simuladoScore?: number;
  ranking?: number;
  inviteCode?: string;
}

// Mensagens motivacionais por tipo
const SHARE_MESSAGES: Record<ShareType, string[]> = {
  battle_win: [
    'Ganhei a batalha 1v1 no ENEM PRO!',
    'Vitória na arena! Quem me desafia?',
    'Mais uma batalha vencida!'
  ],
  badge_unlock: [
    'Nova conquista desbloqueada!',
    'Subindo de nível no ENEM PRO!',
    'Mais uma medalha na coleção!'
  ],
  simulado_complete: [
    'Simulado concluído com sucesso!',
    'Mais um simulado no currículo!',
    'Treino constante, resultado garantido!'
  ],
  personal_record: [
    'Novo recorde pessoal!',
    'Superando meus limites!',
    'Batendo minhas próprias marcas!'
  ],
  top_ranking: [
    'Entrei no Top 100 do ENEM PRO!',
    'Ranking nacional dominado!',
    'Entre os melhores do Brasil!'
  ],
  weekly_goal: [
    'Meta semanal concluída!',
    'Semana produtiva finalizada!',
    'Consistência é a chave!'
  ],
  live_event_win: [
    'Campeão do evento ao vivo!',
    'Venci a live do ENEM PRO!',
    'Show do Milhão ENEM PRO: Vencedor!'
  ],
  high_score: [
    'Nota acima de 900 no simulado!',
    'Performance excepcional!',
    'Rumo ao 1000!'
  ]
};

// Cores dos tiers
const TIER_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  bronze: { bg: '#cd7f32', border: '#8b4513', text: '#fff' },
  prata: { bg: '#c0c0c0', border: '#808080', text: '#333' },
  ouro: { bg: '#ffd700', border: '#b8860b', text: '#333' },
  platina: { bg: '#e5e4e2', border: '#a9a9a9', text: '#333' },
  diamante: { bg: '#b9f2ff', border: '#00bfff', text: '#333' }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

interface SocialShareCardProps {
  data: ShareData;
  onShare?: (platform: string) => void;
  onClose?: () => void;
}

export default function SocialShareCard({ data, onShare, onClose }: SocialShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Gerar QR Code
  const generateQRCode = useCallback(async () => {
    if (data.inviteCode) {
      const url = `https://enempro.com.br/convite/${data.inviteCode}`;
      const qr = await QRCode.toDataURL(url, {
        width: 80,
        margin: 1,
        color: { dark: '#fff', light: 'transparent' }
      });
      setQrCodeUrl(qr);
    }
  }, [data.inviteCode]);

  // Gerar QR na montagem
  useState(() => {
    generateQRCode();
  });

  // Mensagem aleatória
  const message = SHARE_MESSAGES[data.type][
    Math.floor(Math.random() * SHARE_MESSAGES[data.type].length)
  ];

  // Exportar como imagem
  const exportAsImage = useCallback(async () => {
    if (!cardRef.current) return null;
    setIsGenerating(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1a472a'
      });
      return dataUrl;
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Baixar imagem
  const handleDownload = async () => {
    const dataUrl = await exportAsImage();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `enem-pro-${data.type}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      onShare?.('download');
    }
  };

  // Compartilhar via Web Share API
  const handleShare = async (platform: string) => {
    const dataUrl = await exportAsImage();
    if (!dataUrl) return;

    // Converter base64 para blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'enem-pro-conquista.png', { type: 'image/png' });

    const shareText = `${message} Estude comigo no ENEM PRO! ${data.inviteCode ? `Use meu código: ${data.inviteCode}` : ''}`;
    const shareUrl = data.inviteCode ? `https://enempro.com.br/convite/${data.inviteCode}` : 'https://enempro.com.br';

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: 'ENEM PRO - Conquista',
          text: shareText,
          url: shareUrl,
          files: [file]
        });
        onShare?.(platform);
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else {
      // Fallback para links específicos
      const encodedText = encodeURIComponent(shareText);
      const encodedUrl = encodeURIComponent(shareUrl);

      const urls: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
      };

      if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
        onShare?.(platform);
      }
    }
  };

  const tierColor = data.tier ? TIER_COLORS[data.tier] : TIER_COLORS.bronze;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d2818] rounded-2xl p-6 max-w-md w-full shadow-2xl">
        {/* Card para exportar */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-xl"
          style={{
            background: 'linear-gradient(145deg, #1a472a 0%, #0d2818 100%)',
            padding: '24px',
            fontFamily: "'Patrick Hand', cursive"
          }}
        >
          {/* Textura de lousa */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Header com avatar e nome */}
          <div className="relative flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(145deg, ${tierColor.bg}, ${tierColor.border})`,
                border: `3px solid ${tierColor.border}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              {data.userAvatar || data.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white text-xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {data.userName}
              </h3>
              {data.tier && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-bold"
                  style={{
                    background: tierColor.bg,
                    color: tierColor.text,
                    border: `2px solid ${tierColor.border}`
                  }}
                >
                  Liga {data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Conquista principal */}
          <div className="relative text-center py-6">
            {data.badgeIcon && (
              <div className="text-6xl mb-2">{data.badgeIcon}</div>
            )}
            <h2
              className="text-2xl font-bold text-[#fbbf24] mb-2"
              style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
            >
              {message}
            </h2>
            {data.badgeName && (
              <p className="text-white/80 text-lg">{data.badgeName}</p>
            )}
            {data.simuladoScore !== undefined && (
              <div className="mt-2">
                <span className="text-5xl font-bold text-white">
                  {data.simuladoScore}%
                </span>
                <span className="text-white/60 text-lg ml-2">de acerto</span>
              </div>
            )}
            {data.ranking && (
              <p className="text-white/80 text-lg mt-2">
                Ranking: <span className="text-[#fbbf24] font-bold">#{data.ranking}</span>
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="relative flex justify-center items-center gap-6 py-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <FPCoin size="lg" />
              <span className="text-2xl font-bold text-[#fbbf24]">
                {data.fpAmount.toLocaleString()}
              </span>
            </div>
            {data.streak && data.streak > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-xl font-bold text-orange-400">
                  {data.streak} dias
                </span>
              </div>
            )}
          </div>

          {/* QR Code e convite */}
          {qrCodeUrl && (
            <div className="relative flex items-center justify-center gap-4 pt-4 border-t border-white/20">
              <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
              <div className="text-white/80 text-sm">
                <p>Estude comigo!</p>
                <p className="text-[#fbbf24] font-bold">{data.inviteCode}</p>
              </div>
            </div>
          )}

          {/* Branding */}
          <div className="relative text-center mt-4 pt-4 border-t border-white/20">
            <p className="text-white/60 text-sm">
              enempro.com.br
            </p>
          </div>
        </div>

        {/* Botões de compartilhamento */}
        <div className="mt-6 space-y-3">
          <p className="text-white/60 text-center text-sm mb-4">
            Compartilhar conquista
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </button>

            <button
              onClick={() => handleShare('twitter')}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter/X
            </button>

            <button
              onClick={() => handleShare('telegram')}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-[#2a5d38] hover:bg-[#1a472a] text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar
            </button>
          </div>

          {/* Copiar link */}
          {data.inviteCode && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://enempro.com.br/convite/${data.inviteCode}`);
                onShare?.('copy');
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-bold transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar link de convite
            </button>
          )}
        </div>

        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Loading overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#fbbf24] border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
