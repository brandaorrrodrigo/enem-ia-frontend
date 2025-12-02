# 🚀 Setup - Sistema de Recompensas e Desafios

## Guia Rápido de Instalação

Siga estes passos para ativar o sistema de recompensas e desafios no ENEM-IA.

---

## 📋 Pré-requisitos

- Node.js instalado
- Prisma CLI instalado (`npm install -g prisma`)
- Banco de dados SQLite configurado

---

## 🔧 Passo a Passo

### 1. Aplicar Mudanças no Schema

O schema Prisma já foi atualizado com os novos modelos. Gere a migration:

```bash
cd enem-pro
npx prisma migrate dev --name add_gamificacao_system
```

Isso irá:
- Criar as tabelas: `Reward`, `UserReward`, `WeeklyChallenge`, `UserWeeklyProgress`
- Adicionar campos `pontosFP` e `nivel` à tabela `Usuario`

### 2. Gerar o Cliente Prisma

```bash
npx prisma generate
```

### 3. Popular o Banco com Dados de Exemplo (Opcional)

Execute o seed para criar recompensas e desafios de exemplo:

```bash
npx tsx prisma/seed-gamificacao.ts
```

Ou, se preferir usar ts-node:

```bash
npx ts-node prisma/seed-gamificacao.ts
```

Isso criará:
- 13 recompensas variadas (boosts, itens, cosméticos, premium)
- 2 desafios semanais (semana atual e próxima)

### 4. Verificar no Banco

```bash
npx prisma studio
```

Abra o Prisma Studio e verifique se as tabelas foram criadas e populadas.

---

## 📁 Arquivos Criados

### Backend (API Routes)

```
app/api/enem/
├── rewards/
│   ├── loja/route.ts          # GET - Lista recompensas
│   └── resgatar/route.ts      # POST - Resgata recompensa
└── challenges/
    ├── semana/route.ts        # GET - Desafio da semana
    └── progresso/route.ts     # POST - Atualiza progresso
```

### Frontend (Páginas)

```
app/enem/
├── loja/page.tsx              # Loja de recompensas
└── desafios/page.tsx          # Desafios semanais
```

### Schema e Seeds

```
prisma/
├── schema.prisma              # Atualizado com novos modelos
├── seed-gamificacao.ts        # Seed de recompensas e desafios
└── migration-gamificacao.sql  # SQL manual (alternativa)
```

### Documentação

```
RECOMPENSAS_ENEM_DOCS.md       # Documentação completa
SETUP_GAMIFICACAO.md           # Este arquivo
```

---

## 🧪 Testar o Sistema

### 1. Criar Usuário de Teste

Se ainda não tiver, crie um usuário:

```typescript
// No Prisma Studio ou via seed
{
  id: "test_user_001",
  nome: "Estudante Teste",
  email: "teste@enem.com",
  senha: "$2b$10$...", // senha hasheada
  pontosFP: 1000,      // 1000 FP para testar
  nivel: "Gold"
}
```

### 2. Testar Loja de Recompensas

1. Acesse: `http://localhost:3000/enem/loja`
2. Faça login com o usuário de teste
3. Verifique se as recompensas aparecem
4. Tente resgatar uma recompensa
5. Verifique se o FP foi deduzido

### 3. Testar Desafios Semanais

1. Acesse: `http://localhost:3000/enem/desafios`
2. Verifique se o desafio da semana atual aparece
3. Complete um simulado
4. Verifique se o progresso foi atualizado

---

## 🔗 Integração com Sistema Existente

### Atualizar FP ao Finalizar Simulado

Encontre o arquivo que finaliza simulados (ex: `app/api/simulado/finish/route.ts`) e adicione:

```typescript
import prisma from '@/lib/prisma';

// Após calcular nota e acertos
const fpGanhos = Math.floor(acertos * 10); // Exemplo: 10 FP por acerto

// Atualizar FP do usuário
await prisma.usuario.update({
  where: { id: usuarioId },
  data: {
    pontosFP: { increment: fpGanhos }
  }
});

// Atualizar progresso do desafio
await atualizarProgressoDesafio(usuarioId, fpGanhos);
```

### Função Helper para Atualizar Progresso

Crie em `lib/gamificacao-helpers.ts`:

```typescript
export async function atualizarProgressoDesafio(usuarioId: string, fpGanhos: number) {
  const semanaAtual = getISOWeek(new Date());

  const desafio = await prisma.weeklyChallenge.findFirst({
    where: { semanaRef: semanaAtual, ativo: true }
  });

  if (desafio) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enem/challenges/progresso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId,
        challengeId: desafio.id,
        simuladosFeitos: 1,
        fpGanhos
      })
    });
  }
}

function getISOWeek(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}
```

---

## 🎨 Adicionar Links no Dashboard

Edite `app/dashboard/Page.tsx` e adicione cards para a loja e desafios:

```tsx
import { ShoppingBag, Target } from 'lucide-react';

// No retorno do componente, adicione:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  {/* Card Loja */}
  <Link href="/enem/loja">
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-emerald-200 cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingBag className="w-8 h-8 text-emerald-600" />
        <h3 className="text-xl font-bold text-gray-900">Loja de Recompensas</h3>
      </div>
      <p className="text-gray-600">Troque seus {user?.pontosFP || 0} FP por recompensas</p>
    </div>
  </Link>

  {/* Card Desafios */}
  <Link href="/enem/desafios">
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-2 border-amber-200 cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <Target className="w-8 h-8 text-amber-600" />
        <h3 className="text-xl font-bold text-gray-900">Desafios Semanais</h3>
      </div>
      <p className="text-gray-600">Complete desafios e ganhe FP extras</p>
    </div>
  </Link>
</div>
```

---

## 📊 Monitoramento

### Ver Logs de Transações

```bash
# Listar resgates recentes
SELECT u.nome, r.nome as recompensa, ur.dataResgate
FROM UserReward ur
JOIN Usuario u ON ur.usuarioId = u.id
JOIN Reward r ON ur.rewardId = r.id
ORDER BY ur.dataResgate DESC
LIMIT 10;
```

### Ver Progresso de Desafios

```bash
# Usuários com maior progresso
SELECT u.nome, uwp.simuladosFeitos, uwp.fpGanhos, uwp.concluido
FROM UserWeeklyProgress uwp
JOIN Usuario u ON uwp.usuarioId = u.id
WHERE uwp.challengeId = 'ID_DO_DESAFIO'
ORDER BY uwp.fpGanhos DESC;
```

---

## 🔄 Manutenção Semanal

### Criar Novo Desafio Semanal

Todo domingo ou segunda, crie um novo desafio:

```typescript
// Script ou manual via Prisma Studio
const proximaSemana = getISOWeek(new Date());

await prisma.weeklyChallenge.create({
  data: {
    titulo: 'Desafio da Semana X',
    descricao: 'Complete 5 simulados e ganhe 200 FP!',
    metaSimulados: 5,
    metaFP: 200,
    recompensaFP: 50,
    semanaRef: proximaSemana,
    ativo: true
  }
});
```

### Desativar Desafios Antigos

```sql
UPDATE WeeklyChallenge
SET ativo = 0
WHERE semanaRef < '2025-W45'; -- semanas anteriores
```

---

## 🐛 Troubleshooting

### Erro: Tabelas não existem

```bash
npx prisma db push
# ou
npx prisma migrate dev
```

### FP não está aparecendo

Verifique se o campo foi adicionado:

```sql
SELECT id, nome, pontosFP FROM Usuario LIMIT 5;
```

Se retornar erro, rode:

```bash
npx prisma migrate reset
npx prisma db push
```

### Páginas não carregam

Verifique se as rotas API estão acessíveis:

```bash
curl http://localhost:3000/api/enem/rewards/loja
curl http://localhost:3000/api/enem/challenges/semana
```

---

## ✅ Checklist de Conclusão

- [ ] Schema atualizado e migration aplicada
- [ ] Cliente Prisma gerado
- [ ] Seed executado com sucesso
- [ ] Rotas API testadas
- [ ] Página `/enem/loja` funcionando
- [ ] Página `/enem/desafios` funcionando
- [ ] Links adicionados no dashboard
- [ ] FP sendo creditado ao finalizar simulado
- [ ] Progresso de desafio sendo atualizado

---

## 📚 Próximos Passos

1. Adicionar notificações ao completar desafios
2. Criar sistema de badges/achievements
3. Implementar ranking de FP
4. Adicionar histórico de resgates no perfil
5. Criar eventos sazonais (Black Friday, Natal, etc.)

---

Para mais detalhes, consulte: **RECOMPENSAS_ENEM_DOCS.md**

**Versão:** 1.0.0
**Data:** 14/11/2025
