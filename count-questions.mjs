import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const count = await prisma.questao.count();
console.log('Total de questões no banco:', count);

await prisma.$disconnect();
