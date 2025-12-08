/**
 * ENEM PRO - API de Batalhas 1v1 v2.0
 * Sistema completo com: reconnection, anti-cheat, ligas, rematch, paginacao
 */

import { NextRequest, NextResponse } from 'next/server';
import { battleManager } from '@/lib/battles/battle-manager';
import { battleService } from '@/lib/battles/battle-service';
import {
  BattleQuestion,
  BattleMode,
  BATTLE_ERROR_CODES,
  HistoryPaginationParams,
} from '@/lib/battles/types';

// ============================================
// LOAD QUESTIONS
// ============================================

async function loadBattleQuestions(): Promise<BattleQuestion[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');

    const filePath = path.join(process.cwd(), 'data', 'banco_oficiais.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const banco = JSON.parse(data);

    return banco.questoes.slice(0, 200).map((q: Record<string, unknown>) => ({
      id: q.id as string,
      enunciado: q.enunciado as string,
      alternativas: q.alternativas as Record<string, string>,
      alternativasOrder: Object.keys(q.alternativas as Record<string, string>),
      correta: (q.correta as string) || 'A',
      disciplina: q.disciplina as string,
      dificuldade: q.dificuldade as string || 'medio',
      banca: q.banca as string,
      ano: q.ano as number,
      timeLimit: 30,
    }));
  } catch {
    return [
      {
        id: 'demo-1',
        enunciado: 'Qual a capital do Brasil?',
        alternativas: { A: 'Rio de Janeiro', B: 'Brasilia', C: 'Sao Paulo', D: 'Salvador', E: 'Belo Horizonte' },
        alternativasOrder: ['A', 'B', 'C', 'D', 'E'],
        correta: 'B',
        disciplina: 'Geografia',
        timeLimit: 30,
      },
      {
        id: 'demo-2',
        enunciado: 'Quanto e 2 + 2?',
        alternativas: { A: '3', B: '4', C: '5', D: '6', E: '7' },
        alternativasOrder: ['A', 'B', 'C', 'D', 'E'],
        correta: 'B',
        disciplina: 'Matematica',
        timeLimit: 30,
      },
      {
        id: 'demo-3',
        enunciado: 'Quem descobriu o Brasil?',
        alternativas: { A: 'Cristovao Colombo', B: 'Vasco da Gama', C: 'Pedro Alvares Cabral', D: 'Americo Vespucio', E: 'Fernao de Magalhaes' },
        alternativasOrder: ['A', 'B', 'C', 'D', 'E'],
        correta: 'C',
        disciplina: 'Historia',
        timeLimit: 30,
      },
    ];
  }
}

// ============================================
// POST HANDLER
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      action,
      roomCode,
      playerId,
      playerName,
      config,
      answer,
      responseTime,
      mode,
      message,
      isPremium,
      currentFP,
      clientTimestamp,
      page,
      limit,
      sortBy,
      sortOrder,
      filterMode,
      filterResult,
    } = body;

    // Load questions if needed
    const questions = await loadBattleQuestions();
    battleManager.setQuestionsPool(questions);

    switch (action) {
      // ============================================
      // BATTLE LIFECYCLE
      // ============================================

      case 'create': {
        const battleMode: BattleMode = mode || 'classic';
        const isInvite = config?.isInvite || false;

        const canCreate = battleService.canCreateBattle(
          playerId,
          battleMode,
          isInvite,
          isPremium || false,
          currentFP || 0
        );

        if (!canCreate.allowed) {
          return NextResponse.json({
            success: false,
            error: canCreate.reason,
            code: BATTLE_ERROR_CODES.INSUFFICIENT_FP,
            cost: canCreate.cost,
          }, { status: 400 });
        }

        const battle = battleManager.createBattle(
          { id: playerId, nome: playerName, isPremium },
          { ...config, mode: battleMode }
        );

        return NextResponse.json({
          success: true,
          roomCode: battle.roomCode,
          battle,
          cost: canCreate.cost,
        });
      }

      case 'join': {
        const result = battleManager.joinBattle(roomCode, {
          id: playerId,
          nome: playerName,
          isPremium,
        });

        if (!result.battle) {
          return NextResponse.json({
            success: false,
            error: result.error,
          }, { status: 404 });
        }

        return NextResponse.json({ success: true, battle: result.battle });
      }

      case 'ready': {
        const allReady = battleManager.setPlayerReady(roomCode, playerId);
        const battle = battleManager.getBattle(roomCode);
        return NextResponse.json({ success: true, allReady, battle });
      }

      case 'start': {
        const battle = battleManager.startBattle(roomCode);
        if (!battle) {
          return NextResponse.json({ error: 'Nao foi possivel iniciar' }, { status: 400 });
        }
        return NextResponse.json({ success: true, battle });
      }

      case 'next-question': {
        const result = battleManager.nextQuestion(roomCode);
        if (!result) {
          return NextResponse.json({ error: 'Sem mais questoes' }, { status: 400 });
        }

        // Apply anti-cheat randomization
        const { randomized } = battleService.randomizeAlternatives(result.question.alternativas);

        return NextResponse.json({
          success: true,
          question: {
            ...result.question,
            alternativas: randomized,
          },
          number: result.number,
          serverTimestamp: Date.now(),
        });
      }

      case 'answer': {
        // Validate answer timing (anti-cheat)
        const serverTimestamp = Date.now();
        const validation = battleService.validateAnswer(
          responseTime,
          serverTimestamp,
          clientTimestamp || serverTimestamp
        );

        if (!validation.valid) {
          return NextResponse.json({
            success: false,
            error: validation.reason,
            code: BATTLE_ERROR_CODES.SUSPICIOUS_TIMING,
          }, { status: 400 });
        }

        const battleAnswer = battleManager.submitAnswer(roomCode, playerId, answer, responseTime);
        if (!battleAnswer) {
          return NextResponse.json({ error: 'Resposta invalida' }, { status: 400 });
        }

        const allAnswered = battleManager.allAnswered(roomCode);
        return NextResponse.json({
          success: true,
          answer: battleAnswer,
          allAnswered,
        });
      }

      case 'question-results': {
        const results = battleManager.getQuestionResults(roomCode);
        if (!results) {
          return NextResponse.json({ error: 'Sem resultados' }, { status: 400 });
        }
        const hasMore = battleManager.hasMoreQuestions(roomCode);
        return NextResponse.json({
          success: true,
          ...results,
          hasMoreQuestions: hasMore,
        });
      }

      case 'finish': {
        const result = battleManager.finishBattle(roomCode);
        if (!result) {
          return NextResponse.json({ error: 'Batalha nao encontrada' }, { status: 404 });
        }

        // Get league info for winner (points already updated internally by finishBattle)
        if (result.winner) {
          const league = battleService.getPlayerLeague(result.winner);
          const leagueProgress = battleService.getLeagueProgress(result.winner);

          return NextResponse.json({
            success: true,
            record: result.record,
            scores: result.scores,
            winner: result.winner,
            rewards: result.rewards,
            league,
            leagueProgress,
          });
        }

        return NextResponse.json({
          success: true,
          record: result.record,
          scores: result.scores,
          winner: result.winner,
          rewards: result.rewards,
        });
      }

      case 'leave': {
        battleManager.leaveBattle(roomCode, playerId);
        return NextResponse.json({ success: true });
      }

      // ============================================
      // RECONNECTION SYSTEM
      // ============================================

      case 'disconnect': {
        battleService.registerDisconnection(playerId, roomCode);
        return NextResponse.json({ success: true });
      }

      case 'reconnect': {
        const reconnectResult = battleService.attemptReconnection(playerId, roomCode);

        if (reconnectResult.isTechnicalDefeat) {
          return NextResponse.json({
            success: false,
            error: 'Tempo de reconexao esgotado - derrota tecnica',
            code: BATTLE_ERROR_CODES.TECHNICAL_DEFEAT,
          }, { status: 400 });
        }

        if (!reconnectResult.success) {
          return NextResponse.json({
            success: false,
            error: 'Falha na reconexao',
            remainingTime: reconnectResult.remainingTime,
          }, { status: 400 });
        }

        const battle = battleManager.getBattle(roomCode);
        return NextResponse.json({
          success: true,
          battle,
          remainingTime: reconnectResult.remainingTime,
        });
      }

      case 'reconnection-status': {
        const status = battleService.getReconnectionStatus(playerId);
        return NextResponse.json({
          success: true,
          status,
        });
      }

      // ============================================
      // REMATCH SYSTEM
      // ============================================

      case 'request-rematch': {
        const { fpCost } = body;
        const rematchRequest = battleService.requestRematch(playerId, roomCode, fpCost || 0);

        return NextResponse.json({
          success: true,
          rematch: rematchRequest,
        });
      }

      case 'accept-rematch': {
        const { newRoomCode } = body;
        const accepted = battleService.acceptRematch(roomCode, newRoomCode);

        if (!accepted) {
          return NextResponse.json({
            success: false,
            error: 'Solicitacao de revanche expirada ou nao encontrada',
          }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          rematch: accepted,
        });
      }

      case 'get-rematch': {
        const rematch = battleService.getRematchRequest(roomCode);
        return NextResponse.json({
          success: true,
          rematch,
        });
      }

      // ============================================
      // CHAT WITH RATE LIMITING
      // ============================================

      case 'chat': {
        // Check rate limit
        const canSend = battleService.canSendChatMessage(playerId);
        if (!canSend.allowed) {
          return NextResponse.json({
            success: false,
            error: `Aguarde ${Math.ceil(canSend.cooldownMs / 1000)}s para enviar outra mensagem`,
            code: BATTLE_ERROR_CODES.CHAT_RATE_LIMITED,
            cooldown: canSend.cooldownMs,
          }, { status: 429 });
        }

        // Validate message
        const messageValidation = battleService.validateChatMessage(message);
        if (!messageValidation.valid) {
          return NextResponse.json({
            success: false,
            error: messageValidation.reason,
            code: BATTLE_ERROR_CODES.CHAT_MESSAGE_BLOCKED,
          }, { status: 400 });
        }

        const chatMessage = battleManager.addChatMessage(roomCode, playerId, playerName, message);
        if (!chatMessage) {
          return NextResponse.json({ error: 'Chat nao disponivel' }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: chatMessage });
      }

      case 'get-chat': {
        const messages = battleManager.getChatMessages(roomCode);
        return NextResponse.json({ success: true, messages });
      }

      // ============================================
      // SPECTATOR & TRANSMISSION
      // ============================================

      case 'join-spectator': {
        const joined = battleManager.joinAsSpectator(roomCode, playerId);
        if (!joined) {
          return NextResponse.json({ error: 'Transmissao nao disponivel' }, { status: 400 });
        }

        // Get delayed view for anti-cheat
        const battle = battleManager.getBattle(roomCode);
        const view = battleManager.getSpectatorView(roomCode);

        return NextResponse.json({
          success: true,
          view,
          delay: battle?.config?.isTransmitted ? 2000 : 0,
        });
      }

      case 'leave-spectator': {
        battleManager.leaveAsSpectator(roomCode, playerId);
        return NextResponse.json({ success: true });
      }

      case 'spectator-view': {
        const view = battleManager.getSpectatorView(roomCode);
        if (!view) {
          return NextResponse.json({ error: 'Batalha nao encontrada' }, { status: 404 });
        }
        return NextResponse.json({ success: true, view });
      }

      // ============================================
      // HISTORY WITH PAGINATION
      // ============================================

      case 'get-history': {
        const paginationParams: HistoryPaginationParams = {
          page: page || 1,
          limit: limit || 10,
          sortBy: sortBy || 'date',
          sortOrder: sortOrder || 'desc',
          filterMode: filterMode,
          filterResult: filterResult,
        };

        const history = battleService.getPlayerHistory(playerId, paginationParams);
        return NextResponse.json({ success: true, history });
      }

      // ============================================
      // ARENA & LEAGUE
      // ============================================

      case 'get-arena': {
        const arena = battleService.getArenaWeeklyData(playerId);
        return NextResponse.json({ success: true, arena });
      }

      case 'get-league': {
        const league = battleService.getPlayerLeague(playerId);
        const progress = battleService.getLeagueProgress(playerId);
        return NextResponse.json({
          success: true,
          league,
          progress,
        });
      }

      case 'check-badges': {
        const badges = battleService.checkBadgeEligibility(playerId);
        return NextResponse.json({ success: true, badges });
      }

      case 'get-share-message': {
        const { result: battleResult, fpGanho, battleMode, league } = body;
        const shareMessage = battleService.generateShareMessage(battleResult, fpGanho, battleMode, league);
        return NextResponse.json({ success: true, message: shareMessage });
      }

      // ============================================
      // LIVE TRANSMISSIONS
      // ============================================

      case 'get-live': {
        const transmissions = battleManager.getLiveTransmissions();
        return NextResponse.json({ success: true, transmissions });
      }

      default:
        return NextResponse.json({ error: 'Acao desconhecida' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro na API de batalhas:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// ============================================
// GET HANDLER
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('roomCode');
    const action = searchParams.get('action');
    const playerId = searchParams.get('playerId');

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') as 'date' | 'fp' | 'duration' | undefined;
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;
    const filterMode = searchParams.get('filterMode') as BattleMode | undefined;
    const filterResult = searchParams.get('filterResult') as 'all' | 'victory' | 'defeat' | 'draw' | undefined;

    // Get arena ranking
    if (action === 'arena') {
      const arena = battleService.getArenaWeeklyData(playerId || undefined);
      return NextResponse.json({ success: true, arena });
    }

    // Get player history with pagination
    if (action === 'history' && playerId) {
      const paginationParams: HistoryPaginationParams = {
        page,
        limit,
        sortBy,
        sortOrder,
        filterMode,
        filterResult,
      };

      const history = battleService.getPlayerHistory(playerId, paginationParams);
      return NextResponse.json({ success: true, history });
    }

    // Get league info
    if (action === 'league' && playerId) {
      const league = battleService.getPlayerLeague(playerId);
      const progress = battleService.getLeagueProgress(playerId);
      return NextResponse.json({
        success: true,
        league,
        progress,
      });
    }

    // Get reconnection status
    if (action === 'reconnection-status' && playerId) {
      const status = battleService.getReconnectionStatus(playerId);
      return NextResponse.json({ success: true, status });
    }

    // Get rematch request
    if (action === 'rematch' && roomCode) {
      const rematch = battleService.getRematchRequest(roomCode);
      return NextResponse.json({ success: true, rematch });
    }

    // Get live transmissions
    if (action === 'live') {
      const transmissions = battleManager.getLiveTransmissions();
      return NextResponse.json({ success: true, transmissions });
    }

    // Get battle stats
    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        stats: {
          activeBattles: battleManager.getActiveBattlesCount(),
          questionsPool: battleManager.getQuestionsCount(),
        },
      });
    }

    // Get battle by room code
    if (!roomCode) {
      return NextResponse.json({ error: 'roomCode e obrigatorio' }, { status: 400 });
    }

    const battle = battleManager.getBattle(roomCode);
    if (!battle) {
      return NextResponse.json({ error: 'Batalha nao encontrada' }, { status: 404 });
    }

    // Sanitize battle data (hide correct answers during battle)
    const sanitizedBattle = { ...battle };
    if (battle.status === 'playing' || battle.status === 'countdown') {
      sanitizedBattle.questions = battle.questions.map(q => ({
        ...q,
        correta: '',
      }));
    }

    return NextResponse.json({ success: true, battle: sanitizedBattle });
  } catch (error) {
    console.error('Erro ao buscar batalha:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
