import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';

// Tamanho maximo: 2MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Tipos aceitos
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// GET - Retorna avatar do usuario autenticado
export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { avatarUrl: true, nome: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      avatarUrl: usuario.avatarUrl,
      nome: usuario.nome
    });

  } catch (error) {
    console.error('Erro ao buscar avatar:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Upload de avatar
export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo invalido. Use JPG, PNG ou WebP.' },
        { status: 400 }
      );
    }

    // Validar tamanho
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Foto muito pesada. Tamanho maximo: 2MB.' },
        { status: 400 }
      );
    }

    // Verificar se usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, avatarUrl: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    // Gerar nome do arquivo
    const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
    const filename = `avatar_${userId}_${Date.now()}.${ext}`;

    // Criar diretorio de avatars se nao existir
    const uploadsDir = path.join(process.cwd(), 'public', 'avatars');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch {
      // Diretorio ja existe
    }

    // Salvar arquivo
    const filepath = path.join(uploadsDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Deletar avatar antigo se existir
    if (usuario.avatarUrl && usuario.avatarUrl.startsWith('/avatars/')) {
      try {
        const oldPath = path.join(process.cwd(), 'public', usuario.avatarUrl);
        await unlink(oldPath);
      } catch {
        // Arquivo antigo nao existe, ignorar
      }
    }

    // Atualizar URL no banco
    const avatarUrl = `/avatars/${filename}`;
    await prisma.usuario.update({
      where: { id: userId },
      data: { avatarUrl }
    });

    return NextResponse.json({
      success: true,
      avatarUrl,
      message: 'Foto atualizada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar foto. Tente novamente.' },
      { status: 500 }
    );
  }
}

// DELETE - Remover avatar
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, avatarUrl: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    // Deletar arquivo se existir
    if (usuario.avatarUrl && usuario.avatarUrl.startsWith('/avatars/')) {
      try {
        const filePath = path.join(process.cwd(), 'public', usuario.avatarUrl);
        await unlink(filePath);
      } catch {
        // Arquivo nao existe, ignorar
      }
    }

    // Remover URL do banco
    await prisma.usuario.update({
      where: { id: userId },
      data: { avatarUrl: null }
    });

    return NextResponse.json({
      success: true,
      message: 'Foto removida com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao remover avatar:', error);
    return NextResponse.json(
      { error: 'Erro ao remover foto. Tente novamente.' },
      { status: 500 }
    );
  }
}
