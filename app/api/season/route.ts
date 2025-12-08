/**
 * ENEM PRO - API de Temporadas (Season Pass)
 * Endpoints para gerenciar temporada, desafios, recompensas e progresso
 */

import { NextRequest, NextResponse } from 'next/server';
import { seasonService } from '@/lib/season/season-service';
import { ChallengeType } from '@/lib/season/types';

// ============================================
// GET HANDLER
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const playerId = searchParams.get('playerId');

    // Informações da temporada atual
    if (action === 'info' || !action) {
      const season = seasonService.getCurrentSeason();
      const tempoRestante = seasonService.getSeasonTimeRemaining();

      if (playerId) {
        const info = seasonService.getSeasonInfo(playerId);
        return NextResponse.json({ success: true, ...info });
      }

      return NextResponse.json({
        success: true,
        season,
        tempoRestante,
      });
    }

    // Desafios ativos
    if (action === 'desafios' && playerId) {
      const tipo = searchParams.get('tipo') as ChallengeType | null;

      if (tipo) {
        const desafios = seasonService.getChallengesByType(playerId, tipo);
        return NextResponse.json({ success: true, desafios });
      }

      const desafios = seasonService.getActiveChallenges(playerId);
      return NextResponse.json({ success: true, desafios });
    }

    // Recompensas
    if (action === 'recompensas' && playerId) {
      const rewards = seasonService.getAvailableRewards(playerId);
      return NextResponse.json({ success: true, ...rewards });
    }

    // Progresso do jogador
    if (action === 'progresso' && playerId) {
      const progresso = seasonService.getPlayerProgress(playerId);
      return NextResponse.json({ success: true, progresso });
    }

    // Histórico de SFP
    if (action === 'historico-SFP' && playerId) {
      const limit = parseInt(searchParams.get('limit') || '50');
      const historico = seasonService.getSFPHistory(playerId, limit);
      return NextResponse.json({ success: true, historico });
    }

    // Boosts ativos
    if (action === 'boosts' && playerId) {
      const boosts = seasonService.getActiveBoosts(playerId);
      return NextResponse.json({ success: true, boosts });
    }

    // Leaderboard
    if (action === 'leaderboard') {
      const limit = parseInt(searchParams.get('limit') || '100');
      const leaderboard = seasonService.getLeaderboard(limit);
      return NextResponse.json({ success: true, leaderboard });
    }

    return NextResponse.json({ error: 'Ação inválida ou playerId ausente' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de season (GET):', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// ============================================
// POST HANDLER
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, playerId, challengeId, rewardId, quantidade, fonte, descricao } = body;

    switch (action) {
      // ============================================
      // PROGRESSO
      // ============================================

      case 'add-SFP': {
        if (!playerId || !quantidade || !fonte) {
          return NextResponse.json({
            success: false,
            error: 'playerId, quantidade e fonte são obrigatórios',
          }, { status: 400 });
        }

        const result = seasonService.addSFP(
          playerId,
          quantidade,
          fonte,
          descricao || `SFP de ${fonte}`
        );

        return NextResponse.json(result);
      }

      // ============================================
      // DESAFIOS
      // ============================================

      case 'update-challenge': {
        if (!playerId || !challengeId) {
          return NextResponse.json({
            success: false,
            error: 'playerId e challengeId são obrigatórios',
          }, { status: 400 });
        }

        const incremento = quantidade || 1;
        const result = seasonService.updateChallengeProgress(playerId, challengeId, incremento);

        return NextResponse.json(result);
      }

      case 'complete-challenge': {
        if (!playerId || !challengeId) {
          return NextResponse.json({
            success: false,
            error: 'playerId e challengeId são obrigatórios',
          }, { status: 400 });
        }

        // Buscar desafio para saber a meta
        const desafios = seasonService.getActiveChallenges(playerId);
        const desafio = desafios.find(d => d.id === challengeId);

        if (!desafio) {
          return NextResponse.json({
            success: false,
            error: 'Desafio não encontrado',
          }, { status: 404 });
        }

        // Completar de uma vez
        const result = seasonService.updateChallengeProgress(
          playerId,
          challengeId,
          desafio.meta - desafio.progresso
        );

        return NextResponse.json(result);
      }

      // ============================================
      // RECOMPENSAS
      // ============================================

      case 'claim-reward': {
        if (!playerId || !rewardId) {
          return NextResponse.json({
            success: false,
            error: 'playerId e rewardId são obrigatórios',
          }, { status: 400 });
        }

        const result = seasonService.claimReward(playerId, rewardId);

        if (!result.success) {
          return NextResponse.json({
            success: false,
            error: result.error,
          }, { status: 400 });
        }

        return NextResponse.json(result);
      }

      case 'claim-all-available': {
        if (!playerId) {
          return NextResponse.json({
            success: false,
            error: 'playerId é obrigatório',
          }, { status: 400 });
        }

        const rewards = seasonService.getAvailableRewards(playerId);
        const claimed: string[] = [];
        const errors: string[] = [];

        // Coletar todas as recompensas disponíveis
        for (const reward of [...rewards.free, ...rewards.premium]) {
          if (reward.status === 'available') {
            const result = seasonService.claimReward(playerId, reward.id);
            if (result.success) {
              claimed.push(reward.id);
            } else {
              errors.push(`${reward.id}: ${result.error}`);
            }
          }
        }

        return NextResponse.json({
          success: true,
          claimed,
          errors: errors.length > 0 ? errors : undefined,
        });
      }

      // ============================================
      // PREMIUM
      // ============================================

      case 'upgrade-premium': {
        if (!playerId) {
          return NextResponse.json({
            success: false,
            error: 'playerId é obrigatório',
          }, { status: 400 });
        }

        const upgraded = seasonService.upgradeToPremium(playerId);

        if (!upgraded) {
          return NextResponse.json({
            success: false,
            error: 'Jogador já possui premium',
          }, { status: 400 });
        }

        const progresso = seasonService.getPlayerProgress(playerId);
        return NextResponse.json({ success: true, progresso });
      }

      // ============================================
      // DEBUG/RESET
      // ============================================

      case 'reset': {
        if (process.env.NODE_ENV !== 'development') {
          return NextResponse.json({
            success: false,
            error: 'Reset apenas disponível em desenvolvimento',
          }, { status: 403 });
        }

        if (!playerId) {
          return NextResponse.json({
            success: false,
            error: 'playerId é obrigatório',
          }, { status: 400 });
        }

        seasonService.resetPlayerProgress(playerId);
        return NextResponse.json({ success: true, message: 'Progresso resetado' });
      }

      // ============================================
      // INTEGRAÇÃO COM OUTROS SISTEMAS
      // ============================================

      // Chamado quando o jogador escreve uma introdução
      case 'trigger-redacao-intro': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'daily_intro_1', 1);

        // Também atualiza desafio semanal
        seasonService.updateChallengeProgress(playerId, 'weekly_intros_3', 1);

        return NextResponse.json(result);
      }

      // Chamado quando o jogador responde questão de linguagens
      case 'trigger-linguagens-questao': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'daily_linguagens_1', 1);
        return NextResponse.json(result);
      }

      // Chamado quando o jogador lê redação nota 1000
      case 'trigger-leitura-nota1000': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'daily_leitura_1', 1);
        seasonService.updateChallengeProgress(playerId, 'weekly_leitura_5', 1);

        return NextResponse.json(result);
      }

      // Chamado quando o jogador completa quiz diário
      case 'trigger-quiz-portugues': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'daily_quiz_1', 1);
        return NextResponse.json(result);
      }

      // Chamado quando o jogador faz correção com IA
      case 'trigger-correcao-ia': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'daily_correcao_1', 1);
        return NextResponse.json(result);
      }

      // Chamado quando o jogador escreve parágrafo completo
      case 'trigger-paragrafo-completo': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'weekly_paragrafo_1', 1);
        return NextResponse.json(result);
      }

      // Chamado quando o jogador reescreve redação
      case 'trigger-reescrita-redacao': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'weekly_reescrita_1', 1);
        return NextResponse.json(result);
      }

      // Chamado quando o jogador acerta 80% em simulado de linguagens
      case 'trigger-simulado-linguagens': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const { percentualAcerto } = body;
        if (percentualAcerto >= 80) {
          const result = seasonService.updateChallengeProgress(playerId, 'weekly_simulado_1', 1);
          return NextResponse.json(result);
        }

        return NextResponse.json({ success: true, message: 'Percentual abaixo de 80%' });
      }

      // Chamado quando o jogador vence batalha 1v1 em linguagens
      case 'trigger-batalha-linguagens': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const result = seasonService.updateChallengeProgress(playerId, 'weekly_batalha_3', 1);
        return NextResponse.json(result);
      }

      // Chamado quando redação completa é corrigida pela IA
      case 'trigger-redacao-completa': {
        if (!playerId) {
          return NextResponse.json({ success: false, error: 'playerId é obrigatório' }, { status: 400 });
        }

        const { notas, fugaTema } = body;

        // Desafio de redação completa
        seasonService.updateChallengeProgress(playerId, 'special_redacao_completa', 1);

        // Verificar competências >= 180
        if (notas && Array.isArray(notas)) {
          const todasAltas = notas.every((n: number) => n >= 180);
          if (todasAltas) {
            seasonService.updateChallengeProgress(playerId, 'special_competencia_alta', 1);
          }

          // Verificar nota >= 900
          const notaTotal = notas.reduce((a: number, b: number) => a + b, 0);
          if (notaTotal >= 900) {
            seasonService.updateChallengeProgress(playerId, 'special_nota_900', 1);
          }
        }

        // Verificar fuga ao tema
        if (fugaTema === false) {
          seasonService.updateChallengeProgress(playerId, 'special_sem_fuga', 1);
        }

        const progresso = seasonService.getPlayerProgress(playerId);
        return NextResponse.json({ success: true, progresso });
      }

      default:
        return NextResponse.json({ error: 'Ação desconhecida' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro na API de season (POST):', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
