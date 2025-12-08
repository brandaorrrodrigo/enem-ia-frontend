'use client';

import { useState, useCallback } from 'react';
import { ShareData, ShareType } from '@/components/SocialShareCard';

interface ShareStats {
  totalShares: number;
  sharesHoje: number;
  sharesRestantesHoje: number;
  fpTotalGanho: number;
  porPlataforma: Record<string, number>;
}

interface ShareResult {
  success: boolean;
  bonusApplied: boolean;
  bonusFP: number;
  sharesRestantesHoje: number;
  newBadges: string[];
  totalShares: number;
}

interface UseShareReturn {
  isModalOpen: boolean;
  shareData: ShareData | null;
  stats: ShareStats | null;
  isLoading: boolean;
  openShareModal: (data: ShareData) => void;
  closeShareModal: () => void;
  trackShare: (platform: string) => Promise<ShareResult | null>;
  fetchStats: () => Promise<void>;
}

export function useShare(usuarioId: string): UseShareReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [stats, setStats] = useState<ShareStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openShareModal = useCallback((data: ShareData) => {
    setShareData(data);
    setIsModalOpen(true);
  }, []);

  const closeShareModal = useCallback(() => {
    setIsModalOpen(false);
    setShareData(null);
  }, []);

  const trackShare = useCallback(async (platform: string): Promise<ShareResult | null> => {
    if (!shareData) return null;

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          platform,
          shareType: shareData.type,
          metadata: {
            tier: shareData.tier,
            fpAmount: shareData.fpAmount,
            badgeName: shareData.badgeName,
            simuladoScore: shareData.simuladoScore,
            ranking: shareData.ranking
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar compartilhamento');
      }

      const result = await response.json();

      // Atualizar stats locais
      if (stats) {
        setStats({
          ...stats,
          totalShares: result.totalShares,
          sharesRestantesHoje: result.sharesRestantesHoje,
          fpTotalGanho: stats.fpTotalGanho + result.bonusFP
        });
      }

      return result;
    } catch (error) {
      console.error('Erro ao rastrear compartilhamento:', error);
      return null;
    }
  }, [usuarioId, shareData, stats]);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/share?usuarioId=${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [usuarioId]);

  return {
    isModalOpen,
    shareData,
    stats,
    isLoading,
    openShareModal,
    closeShareModal,
    trackShare,
    fetchStats
  };
}

// Helpers para criar ShareData facilmente
export const createShareData = {
  battleWin: (userName: string, fpAmount: number, tier?: string, inviteCode?: string): ShareData => ({
    type: 'battle_win',
    userName,
    fpAmount,
    tier: tier as ShareData['tier'],
    inviteCode
  }),

  badgeUnlock: (userName: string, badgeName: string, badgeIcon: string, fpAmount: number, inviteCode?: string): ShareData => ({
    type: 'badge_unlock',
    userName,
    fpAmount,
    badgeName,
    badgeIcon,
    inviteCode
  }),

  simuladoComplete: (userName: string, score: number, fpAmount: number, tier?: string, inviteCode?: string): ShareData => ({
    type: 'simulado_complete',
    userName,
    fpAmount,
    simuladoScore: score,
    tier: tier as ShareData['tier'],
    inviteCode
  }),

  highScore: (userName: string, score: number, fpAmount: number, tier?: string, inviteCode?: string): ShareData => ({
    type: 'high_score',
    userName,
    fpAmount,
    simuladoScore: score,
    tier: tier as ShareData['tier'],
    inviteCode
  }),

  topRanking: (userName: string, ranking: number, fpAmount: number, tier?: string, inviteCode?: string): ShareData => ({
    type: 'top_ranking',
    userName,
    fpAmount,
    ranking,
    tier: tier as ShareData['tier'],
    inviteCode
  }),

  weeklyGoal: (userName: string, streak: number, fpAmount: number, inviteCode?: string): ShareData => ({
    type: 'weekly_goal',
    userName,
    fpAmount,
    streak,
    inviteCode
  }),

  liveEventWin: (userName: string, fpAmount: number, ranking?: number, inviteCode?: string): ShareData => ({
    type: 'live_event_win',
    userName,
    fpAmount,
    ranking,
    inviteCode
  })
};
