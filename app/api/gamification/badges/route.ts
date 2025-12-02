import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { listBadgesWithStatus, BADGES } from '@/lib/gamification';

/**
 * GET /api/gamification/badges
 * Lista todos os badges com status de desbloqueio do usuário
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');

    // Se não tem usuarioId, retorna todos os badges disponíveis
    if (!usuarioId) {
      return NextResponse.json({
        badges: BADGES.map(b => ({
          codigo: b.codigo,
          nome: b.nome,
          descricao: b.descricao,
          icone: b.icone,
          categoria: b.categoria,
          pontos: b.pontos,
        })),
        total: BADGES.length,
      });
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

    // Listar badges com status
    const badges = await listBadgesWithStatus(prisma, usuarioId);

    // Contar desbloqueados
    const desbloqueados = badges.filter(b => b.unlocked).length;

    // Agrupar por categoria
    const porCategoria = badges.reduce((acc, badge) => {
      if (!acc[badge.categoria]) {
        acc[badge.categoria] = [];
      }
      acc[badge.categoria].push(badge);
      return acc;
    }, {} as Record<string, typeof badges>);

    return NextResponse.json({
      badges,
      desbloqueados,
      total: badges.length,
      porCategoria,
    });
  } catch (error) {
    console.error('Erro ao buscar badges:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
