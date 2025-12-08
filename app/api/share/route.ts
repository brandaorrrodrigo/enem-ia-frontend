import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Bônus de FP por compartilhamento (por plataforma)
const SHARE_BONUS: Record<string, number> = {
  whatsapp: 10,
  twitter: 15,
  telegram: 10,
  facebook: 10,
  instagram: 20,
  tiktok: 25,
  download: 5,
  copy: 5
};

// Limite diário de compartilhamentos com bônus
const DAILY_SHARE_LIMIT = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId, platform, shareType, metadata } = body;

    if (!usuarioId || !platform || !shareType) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: { score: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Contar compartilhamentos de hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const sharesHoje = await prisma.shareLog.count({
      where: {
        usuarioId,
        createdAt: { gte: hoje },
        bonusApplied: true
      }
    });

    // Verificar se ainda tem bônus disponível
    const bonusDisponivel = sharesHoje < DAILY_SHARE_LIMIT;
    const bonusFP = bonusDisponivel ? (SHARE_BONUS[platform] || 5) : 0;

    // Registrar compartilhamento
    const shareLog = await prisma.shareLog.create({
      data: {
        usuarioId,
        platform,
        shareType,
        metadata: metadata ? JSON.stringify(metadata) : null,
        bonusApplied: bonusDisponivel,
        bonusAmount: bonusFP
      }
    });

    // Aplicar bônus de FP se disponível
    if (bonusFP > 0 && usuario.score) {
      await prisma.userScore.update({
        where: { usuarioId },
        data: {
          fp: { increment: bonusFP },
          totalFpGanho: { increment: bonusFP }
        }
      });
    }

    // Verificar badges de compartilhamento
    const totalShares = await prisma.shareLog.count({
      where: { usuarioId }
    });

    const newBadges: string[] = [];

    // Badge: Primeiro compartilhamento
    if (totalShares === 1) {
      newBadges.push('primeiro_share');
    }

    // Badge: 10 compartilhamentos
    if (totalShares === 10) {
      newBadges.push('social_starter');
    }

    // Badge: 50 compartilhamentos
    if (totalShares === 50) {
      newBadges.push('influencer_enem');
    }

    return NextResponse.json({
      success: true,
      shareId: shareLog.id,
      bonusApplied: bonusDisponivel,
      bonusFP,
      sharesRestantesHoje: Math.max(0, DAILY_SHARE_LIMIT - sharesHoje - 1),
      newBadges,
      totalShares
    });

  } catch (error) {
    console.error('Erro ao registrar compartilhamento:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}

// GET - Estatísticas de compartilhamento do usuário
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');

    if (!usuarioId) {
      return NextResponse.json(
        { error: 'usuarioId é obrigatório' },
        { status: 400 }
      );
    }

    // Contar compartilhamentos de hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const sharesHoje = await prisma.shareLog.count({
      where: {
        usuarioId,
        createdAt: { gte: hoje },
        bonusApplied: true
      }
    });

    // Total de compartilhamentos
    const totalShares = await prisma.shareLog.count({
      where: { usuarioId }
    });

    // FP ganho com compartilhamentos
    const fpGanho = await prisma.shareLog.aggregate({
      where: { usuarioId },
      _sum: { bonusAmount: true }
    });

    // Por plataforma
    const porPlataforma = await prisma.shareLog.groupBy({
      by: ['platform'],
      where: { usuarioId },
      _count: true
    });

    return NextResponse.json({
      totalShares,
      sharesHoje,
      sharesRestantesHoje: Math.max(0, DAILY_SHARE_LIMIT - sharesHoje),
      fpTotalGanho: fpGanho._sum.bonusAmount || 0,
      porPlataforma: porPlataforma.reduce((acc, p) => {
        acc[p.platform] = p._count;
        return acc;
      }, {} as Record<string, number>)
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
