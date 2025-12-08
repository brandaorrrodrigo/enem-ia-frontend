'use client';

import { useState } from 'react';
import SocialShareCard, { ShareData } from './SocialShareCard';

interface ShareResultButtonProps {
  userName: string;
  score: number;
  fpGanho: number;
  tier?: 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';
  streak?: number;
  inviteCode?: string;
  usuarioId: string;
}

export default function ShareResultButton({
  userName,
  score,
  fpGanho,
  tier,
  streak,
  inviteCode,
  usuarioId
}: ShareResultButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);

  const handleOpenShare = () => {
    // Determinar tipo baseado na nota
    const type = score >= 90 ? 'high_score' : 'simulado_complete';

    const data: ShareData = {
      type,
      userName,
      fpAmount: fpGanho,
      simuladoScore: score,
      tier,
      streak,
      inviteCode
    };

    setShareData(data);
    setShowShareModal(true);
  };

  const handleShare = async (platform: string) => {
    // Registrar compartilhamento na API
    try {
      await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          platform,
          shareType: shareData?.type || 'simulado_complete',
          metadata: {
            score,
            fpGanho,
            tier
          }
        })
      });
    } catch (error) {
      console.error('Erro ao registrar compartilhamento:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenShare}
        className="flex items-center gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0d2818] px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Compartilhar Resultado
      </button>

      {showShareModal && shareData && (
        <SocialShareCard
          data={shareData}
          onShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
