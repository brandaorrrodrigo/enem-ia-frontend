import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retorna a semana ISO atual no formato "YYYY-Www"
 */
function getISOWeek(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

async function seedGamificacao() {
  console.log('🎮 Iniciando seed de gamificação...');

  // 1. Criar Recompensas
  console.log('\n📦 Criando recompensas...');

  const recompensas = [
    // BOOSTS
    {
      nome: 'Boost de FP 2x',
      descricao: 'Ganhe o dobro de Focus Points por 24 horas',
      custoFP: 100,
      icone: 'Zap',
      categoria: 'boost',
      ativo: true,
      unico: false,
    },
    {
      nome: 'Boost de FP 3x',
      descricao: 'Ganhe o triplo de Focus Points por 12 horas',
      custoFP: 250,
      icone: 'Zap',
      categoria: 'boost',
      ativo: true,
      unico: false,
    },
    {
      nome: 'Proteção de Streak',
      descricao: 'Protege sua sequência de estudos por 1 dia sem estudar',
      custoFP: 50,
      icone: 'Flame',
      categoria: 'boost',
      ativo: true,
      unico: false,
    },

    // ITENS
    {
      nome: 'Resumo Premium de Matemática',
      descricao: 'Resumo completo de todas as fórmulas de matemática do ENEM',
      custoFP: 200,
      icone: 'BookOpen',
      categoria: 'item',
      ativo: true,
      unico: false,
    },
    {
      nome: 'Resumo Premium de Redação',
      descricao: 'Guia completo de redação nota 1000 com modelos',
      custoFP: 200,
      icone: 'FileText',
      categoria: 'item',
      ativo: true,
      unico: false,
    },
    {
      nome: 'Pack de 10 Simulados Premium',
      descricao: 'Acesso a 10 simulados exclusivos de alta qualidade',
      custoFP: 300,
      icone: 'Award',
      categoria: 'item',
      ativo: true,
      unico: false,
    },

    // COSMÉTICOS
    {
      nome: 'Avatar Bronze',
      descricao: 'Avatar exclusivo de Bronze para seu perfil',
      custoFP: 150,
      icone: 'User',
      categoria: 'cosmetic',
      ativo: true,
      unico: true,
    },
    {
      nome: 'Avatar Prata',
      descricao: 'Avatar exclusivo de Prata para seu perfil',
      custoFP: 300,
      icone: 'User',
      categoria: 'cosmetic',
      ativo: true,
      unico: true,
    },
    {
      nome: 'Avatar Ouro',
      descricao: 'Avatar exclusivo de Ouro para seu perfil',
      custoFP: 500,
      icone: 'Crown',
      categoria: 'cosmetic',
      ativo: true,
      unico: true,
    },
    {
      nome: 'Badge de Campeão',
      descricao: 'Badge exclusiva de campeão para exibir no perfil',
      custoFP: 400,
      icone: 'Trophy',
      categoria: 'cosmetic',
      ativo: true,
      unico: true,
    },

    // PREMIUM
    {
      nome: 'Consultoria de Estudos 1h',
      descricao: 'Uma hora de consultoria personalizada com especialista',
      custoFP: 1000,
      icone: 'GraduationCap',
      categoria: 'premium',
      ativo: true,
      unico: false,
    },
    {
      nome: 'Plano de Estudos Personalizado',
      descricao: 'Plano de estudos customizado baseado no seu desempenho',
      custoFP: 800,
      icone: 'Calendar',
      categoria: 'premium',
      ativo: true,
      unico: false,
    },

    // ESPECIAIS
    {
      nome: 'Pack Black Friday',
      descricao: 'Pack especial com 3 boosts + 2 resumos premium',
      custoFP: 500,
      icone: 'Gift',
      categoria: 'special',
      ativo: false, // Ativar apenas na Black Friday
      unico: false,
    },
  ];

  for (const recompensa of recompensas) {
    const created = await prisma.reward.create({
      data: recompensa,
    });
    console.log(`✅ Criada: ${created.nome} (${created.custoFP} FP)`);
  }

  // 2. Criar Desafios Semanais
  console.log('\n🎯 Criando desafios semanais...');

  const semanaAtual = getISOWeek(new Date());

  // Próxima semana
  const proximaSemana = new Date();
  proximaSemana.setDate(proximaSemana.getDate() + 7);
  const semanaProxima = getISOWeek(proximaSemana);

  const desafios = [
    {
      titulo: 'Maratona de Estudos',
      descricao: 'Complete 5 simulados e ganhe 200 FP esta semana para receber um bônus extra!',
      metaSimulados: 5,
      metaFP: 200,
      recompensaFP: 50,
      semanaRef: semanaAtual,
      ativo: true,
    },
    {
      titulo: 'Semana Intensiva',
      descricao: 'Complete 10 simulados e ganhe 400 FP na próxima semana para um mega bônus!',
      metaSimulados: 10,
      metaFP: 400,
      recompensaFP: 100,
      semanaRef: semanaProxima,
      ativo: true,
    },
  ];

  for (const desafio of desafios) {
    const created = await prisma.weeklyChallenge.create({
      data: desafio,
    });
    console.log(`✅ Criado: ${created.titulo} (${created.semanaRef})`);
  }

  console.log('\n✨ Seed de gamificação concluído!');
  console.log(`\n📊 Resumo:`);
  console.log(`   - ${recompensas.length} recompensas criadas`);
  console.log(`   - ${desafios.length} desafios criados`);
  console.log(`   - Semana atual: ${semanaAtual}`);
}

seedGamificacao()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
