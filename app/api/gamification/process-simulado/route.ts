import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processarFimSimulado, BADGES } from '@/lib/gamification';

/**
 * POST /api/gamification/process-simulado
 *
 * Processa todas as recompensas de gamificação ao finalizar um simulado.
 * Deve ser chamado após o backend /api/enem/simulados/finish retornar sucesso.
 *
 * Body:
 * - usuarioId: string
 * - simuladoId: string
 * - acertos: number
 * - total: number
 * - disciplina: string
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { usuarioId, simuladoId, acertos, total, disciplina } = body;

    if (!usuarioId || !simuladoId || acertos === undefined || !total) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios: usuarioId, simuladoId, acertos, total' },
        { status: 400 }
      );
    }

    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Processar gamificação
    const resultado = await processarFimSimulado(
      prisma,
      usuarioId,
      simuladoId,
      acertos,
      total,
      disciplina || 'geral'
    );

    // Buscar detalhes dos badges desbloqueados
    const badgesDesbloqueados = resultado.novosBadges.map(codigo => {
      const badge = BADGES.find(b => b.codigo === codigo);
      return badge ? {
        codigo: badge.codigo,
        nome: badge.nome,
        descricao: badge.descricao,
        icone: badge.icone,
        pontos: badge.pontos,
      } : null;
    }).filter(Boolean);

    return NextResponse.json({
      success: true,
      recompensas: {
        pontosSimulado: resultado.pontosSimulado,
        pontosStreak: resultado.pontosStreak,
        pontosBadges: resultado.pontosBadges,
        pontosTotal: resultado.pontosTotal,
      },
      streak: {
        atual: resultado.streakAtual,
        maximo: resultado.streakMaximo,
        novoRecorde: resultado.novoRecordeStreak,
      },
      level: {
        subiu: resultado.levelUp,
      },
      badges: {
        novos: badgesDesbloqueados,
        quantidade: resultado.novosBadges.length,
      },
      mensagem: gerarMensagem(resultado),
    });
  } catch (error) {
    console.error('Erro ao processar gamificação:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar gamificação' },
      { status: 500 }
    );
  }
}

function gerarMensagem(resultado: {
  pontosTotal: number;
  streakAtual: number;
  novoRecordeStreak: boolean;
  levelUp: boolean;
  novosBadges: string[];
}): string {
  const partes: string[] = [];

  partes.push(`+${resultado.pontosTotal} pontos!`);

  if (resultado.streakAtual > 0) {
    partes.push(`${resultado.streakAtual} dias de sequência!`);
  }

  if (resultado.novoRecordeStreak) {
    partes.push('Novo recorde de sequência!');
  }

  if (resultado.levelUp) {
    partes.push('Level UP!');
  }

  if (resultado.novosBadges.length > 0) {
    partes.push(`${resultado.novosBadges.length} badge(s) desbloqueado(s)!`);
  }

  return partes.join(' ');
}
