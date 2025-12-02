# 🎁 Sistema de Recompensas e Desafios - ENEM-IA

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Dados](#estrutura-de-dados)
3. [Rotas API](#rotas-api)
4. [Páginas Frontend](#páginas-frontend)
5. [Fluxos de Uso](#fluxos-de-uso)
6. [Integração com Sistema Existente](#integração-com-sistema-existente)
7. [Como Estender](#como-estender)
8. [Exemplos de Uso](#exemplos-de-uso)

---

## 🎯 Visão Geral

O Sistema de Recompensas e Desafios do ENEM-IA permite que usuários:
- **Ganhem Focus Points (FP)** ao completar simulados
- **Troquem FP por recompensas** na loja virtual
- **Participem de desafios semanais** para ganhar FP extras
- **Acompanhem seu progresso** em tempo real

### Conceitos Principais

- **Focus Points (FP)**: Moeda virtual do sistema, ganha ao completar atividades
- **Recompensas**: Itens, boosts e cosméticos que podem ser resgatados com FP
- **Desafios Semanais**: Metas semanais que concedem FP extras ao serem completadas
- **Níveis**: Bronze, Silver, Gold, Platinum, Diamond (baseado em FP/atividades)

---

## 🗄️ Estrutura de Dados

### Schema Prisma

#### 1. Usuario (Atualizado)

```prisma
model Usuario {
  id        String   @id @default(cuid())
  nome      String?
  email     String   @unique
  senha     String
  createdAt DateTime @default(now())

  // Gamificação
  pontosFP  Int      @default(0)    // Focus Points
  nivel     String   @default("Bronze")  // Bronze, Silver, Gold, Platinum, Diamond

  simulados         UsuarioSimulado[]
  respostas         UsuarioResposta[]
  recompensas       UserReward[]
  desafiosProgresso UserWeeklyProgress[]
}
```

#### 2. Reward (Recompensas)

```prisma
model Reward {
  id          String   @id @default(cuid())
  nome        String
  descricao   String
  custoFP     Int      // Custo em Focus Points
  icone       String?  // Nome do ícone (Lucide) ou emoji
  categoria   String   @default("item")  // item, boost, cosmetic, premium
  ativo       Boolean  @default(true)
  unico       Boolean  @default(false)  // Se true, pode ser resgatado apenas 1x por usuário
  createdAt   DateTime @default(now())

  resgates    UserReward[]
}
```

**Campos:**
- `nome`: Nome da recompensa (ex: "Boost de XP 2x")
- `descricao`: Descrição detalhada
- `custoFP`: Quantos FP são necessários para resgatar
- `icone`: Nome do ícone Lucide (Trophy, Zap, Gift, etc.) ou emoji
- `categoria`: Tipo de recompensa para filtros/organização
- `ativo`: Se false, não aparece na loja
- `unico`: Se true, usuário só pode resgatar uma vez

#### 3. UserReward (Resgates)

```prisma
model UserReward {
  id          String   @id @default(cuid())
  usuarioId   String
  rewardId    String
  dataResgate DateTime @default(now())

  usuario     Usuario  @relation(fields: [usuarioId], references: [id])
  reward      Reward   @relation(fields: [rewardId], references: [id])
}
```

Registra cada vez que um usuário resgata uma recompensa.

#### 4. WeeklyChallenge (Desafios Semanais)

```prisma
model WeeklyChallenge {
  id              String   @id @default(cuid())
  titulo          String
  descricao       String
  metaSimulados   Int      // Quantidade de simulados a completar
  metaFP          Int      // FP mínimos a ganhar
  recompensaFP    Int      // FP concedidos ao completar
  semanaRef       String   // Ex: "2025-W46" (ano-semana ISO)
  ativo           Boolean  @default(true)
  createdAt       DateTime @default(now())

  progressos      UserWeeklyProgress[]
}
```

**Campos:**
- `semanaRef`: String no formato ISO "YYYY-Www" (ex: "2025-W46")
- `metaSimulados`: Número de simulados que o usuário precisa completar
- `metaFP`: Quantidade mínima de FP a ganhar na semana
- `recompensaFP`: FP bônus ao completar ambas as metas

#### 5. UserWeeklyProgress (Progresso dos Usuários)

```prisma
model UserWeeklyProgress {
  id              String   @id @default(cuid())
  usuarioId       String
  challengeId     String
  simuladosFeitos Int      @default(0)
  fpGanhos        Int      @default(0)
  concluido       Boolean  @default(false)
  dataInicio      DateTime @default(now())
  dataConclusao   DateTime?

  usuario         Usuario          @relation(fields: [usuarioId], references: [id])
  challenge       WeeklyChallenge  @relation(fields: [challengeId], references: [id])

  @@unique([usuarioId, challengeId])
}
```

Rastreia o progresso individual de cada usuário em cada desafio.

---

## 🔌 Rotas API

### Recompensas

#### GET `/api/enem/rewards/loja`

Lista todas as recompensas disponíveis na loja.

**Resposta:**
```json
{
  "success": true,
  "rewards": [
    {
      "id": "clx123abc",
      "nome": "Boost de XP 2x",
      "descricao": "Ganhe o dobro de FP por 24h",
      "custoFP": 100,
      "icone": "Zap",
      "categoria": "boost",
      "ativo": true,
      "unico": false
    }
  ]
}
```

#### POST `/api/enem/rewards/resgatar`

Resgata uma recompensa (troca FP por recompensa).

**Request:**
```json
{
  "usuarioId": "clx456def",
  "rewardId": "clx123abc"
}
```

**Validações:**
- Verifica se o usuário tem FP suficientes
- Verifica se a recompensa está ativa
- Se recompensa é única, verifica se já foi resgatada

**Resposta (Sucesso):**
```json
{
  "success": true,
  "message": "Recompensa resgatada com sucesso!",
  "resgate": {
    "id": "clx789ghi",
    "usuarioId": "clx456def",
    "rewardId": "clx123abc",
    "dataResgate": "2025-11-14T10:30:00.000Z",
    "reward": { /* dados da recompensa */ }
  },
  "fpRestante": 450
}
```

**Resposta (Erro - FP Insuficientes):**
```json
{
  "success": false,
  "error": "FP insuficientes",
  "fpNecessario": 100,
  "fpAtual": 50,
  "falta": 50
}
```

### Desafios Semanais

#### GET `/api/enem/challenges/semana?usuarioId={id}`

Retorna o desafio da semana atual e o progresso do usuário (se fornecido).

**Query Params:**
- `usuarioId` (opcional): ID do usuário

**Resposta:**
```json
{
  "success": true,
  "desafio": {
    "id": "clx111aaa",
    "titulo": "Maratona de Estudos",
    "descricao": "Complete 5 simulados e ganhe 200 FP esta semana!",
    "metaSimulados": 5,
    "metaFP": 200,
    "recompensaFP": 50,
    "semanaRef": "2025-W46",
    "ativo": true
  },
  "progresso": {
    "id": "clx222bbb",
    "simuladosFeitos": 3,
    "fpGanhos": 120,
    "concluido": false,
    "dataInicio": "2025-11-11T00:00:00.000Z"
  },
  "percentualConclusao": 60,
  "semanaAtual": "2025-W46"
}
```

**Lógica de Cálculo do Percentual:**
```javascript
const percSimulados = (simuladosFeitos / metaSimulados) * 100;
const percFP = (fpGanhos / metaFP) * 100;
const percentualConclusao = Math.min(Math.min(percSimulados, percFP), 100);
```

#### POST `/api/enem/challenges/progresso`

Atualiza o progresso do usuário no desafio semanal.

**Request:**
```json
{
  "usuarioId": "clx456def",
  "challengeId": "clx111aaa",
  "simuladosFeitos": 1,  // incremento
  "fpGanhos": 40         // incremento
}
```

**Resposta (Em Progresso):**
```json
{
  "success": true,
  "message": "Progresso atualizado",
  "progresso": {
    "simuladosFeitos": 4,
    "fpGanhos": 160,
    "concluido": false
  },
  "percentualConclusao": 80,
  "faltaSimulados": 1,
  "faltaFP": 40,
  "completou": false
}
```

**Resposta (Completou):**
```json
{
  "success": true,
  "message": "Parabéns! Você completou o desafio e ganhou 50 FP!",
  "progresso": {
    "simuladosFeitos": 5,
    "fpGanhos": 200,
    "concluido": true,
    "dataConclusao": "2025-11-14T15:45:00.000Z"
  },
  "recompensa": 50,
  "fpTotal": 500,
  "completou": true
}
```

**Comportamento:**
- Cria automaticamente o progresso se não existir
- Incrementa valores (não substitui)
- Ao atingir ambas as metas, marca como concluído e credita FP
- Transação atômica para garantir consistência

---

## 🎨 Páginas Frontend

### 1. Loja de Recompensas (`/enem/loja`)

**Localização:** `app/enem/loja/page.tsx`

**Funcionalidades:**
- Exibe todas as recompensas ativas
- Mostra FP atual do usuário
- Permite resgatar recompensas
- Validação de FP suficientes
- Feedback visual de sucesso/erro
- Filtragem por categoria
- Badges para recompensas únicas

**Componentes Visuais:**
- Cards de recompensas com ícones
- Badges de categoria (item, boost, cosmetic, premium)
- Badge "Único" para recompensas limitadas
- Saldo de FP no header
- Botão de resgatar (desabilitado se FP insuficiente)

**Estados:**
- Loading: Skeleton cards
- Vazio: Mensagem "Nenhuma recompensa disponível"
- Sucesso: Toast verde com confirmação
- Erro: Banner vermelho com mensagem

### 2. Desafios Semanais (`/enem/desafios`)

**Localização:** `app/enem/desafios/page.tsx`

**Funcionalidades:**
- Exibe desafio da semana atual
- Mostra progresso em tempo real
- Duas barras de progresso (simulados e FP)
- Barra de progresso geral
- Badge de status (Em Andamento / Concluído)
- Recompensa destacada
- Botão para iniciar simulado

**Componentes Visuais:**
- Card principal do desafio
- Badge de semana (ex: "Semana 46 de 2025")
- Card de recompensa (destaque dourado)
- Barra de progresso geral (cores dinâmicas)
- Cards individuais para cada meta
- Dicas de como completar
- Histórico de conclusão (se já completou)

**Cores de Progresso:**
- 0-24%: Vermelho
- 25-49%: Laranja
- 50-74%: Amarelo
- 75-99%: Verde claro
- 100%: Verde

---

## 🔄 Fluxos de Uso

### Fluxo de Resgate de Recompensa

```
1. Usuário acessa /enem/loja
2. Sistema busca recompensas ativas via GET /api/enem/rewards/loja
3. Sistema busca FP do usuário (localStorage ou API)
4. Usuário clica em "Resgatar" em uma recompensa
5. Sistema valida FP suficientes (frontend)
6. Sistema envia POST /api/enem/rewards/resgatar
7. Backend valida novamente:
   - Usuário existe
   - Recompensa existe e está ativa
   - FP suficientes
   - Se única, verifica se já foi resgatada
8. Backend executa transação:
   - Deduz FP do usuário
   - Cria registro de resgate
9. Frontend atualiza FP do usuário no localStorage
10. Exibe mensagem de sucesso
```

### Fluxo de Desafio Semanal

```
1. Sistema cria desafio semanal (manualmente ou via cron)
2. Usuário acessa /enem/desafios
3. Sistema calcula semana atual (ISO Week)
4. Sistema busca desafio via GET /api/enem/challenges/semana?usuarioId=xxx
5. Sistema cria progresso automaticamente se não existir
6. Usuário completa simulado
7. Após finalizar simulado, sistema chama POST /api/enem/challenges/progresso
   - Incrementa simuladosFeitos
   - Incrementa fpGanhos
8. Sistema verifica se atingiu ambas as metas
9. Se sim:
   - Marca como concluído
   - Credita FP de recompensa
   - Atualiza dataConclusao
10. Frontend exibe nova barra de progresso e badge de "Concluído"
```

---

## 🔗 Integração com Sistema Existente

### Atualizar Progresso ao Finalizar Simulado

No arquivo que finaliza o simulado (ex: `app/api/simulado/finish/route.ts`), adicione:

```typescript
// Após calcular nota e acertos do simulado
const fpGanhos = calcularFP(acertos, total); // Sua lógica de FP

// Atualizar FP do usuário
await prisma.usuario.update({
  where: { id: usuarioId },
  data: {
    pontosFP: {
      increment: fpGanhos
    }
  }
});

// Atualizar progresso do desafio semanal
const semanaAtual = getISOWeek(new Date());

const desafio = await prisma.weeklyChallenge.findFirst({
  where: {
    semanaRef: semanaAtual,
    ativo: true
  }
});

if (desafio) {
  // Chamar API de progresso
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
```

### Função de Cálculo de Semana ISO

```typescript
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

## 🚀 Como Estender

### Adicionar Nova Recompensa

```sql
INSERT INTO Reward (id, nome, descricao, custoFP, icone, categoria, ativo, unico)
VALUES (
  'clx_new_reward',
  'Avatar Exclusivo',
  'Desbloqueia um avatar especial para seu perfil',
  500,
  'Crown',
  'cosmetic',
  true,
  true
);
```

### Criar Novo Desafio Semanal

```sql
INSERT INTO WeeklyChallenge (id, titulo, descricao, metaSimulados, metaFP, recompensaFP, semanaRef, ativo)
VALUES (
  'clx_challenge_w47',
  'Desafio Black Friday',
  'Complete 10 simulados e ganhe 400 FP para aproveitar a Black Friday!',
  10,
  400,
  100,
  '2025-W47',
  true
);
```

### Adicionar Nova Categoria de Recompensa

1. Atualize o enum no schema (ou mantenha String flexível)
2. Adicione cor no frontend:

```typescript
// Em app/enem/loja/page.tsx
function getCategoriaColor(categoria: string) {
  const colors: Record<string, string> = {
    item: 'bg-blue-100 text-blue-700',
    boost: 'bg-purple-100 text-purple-700',
    cosmetic: 'bg-pink-100 text-pink-700',
    premium: 'bg-amber-100 text-amber-700',
    special: 'bg-red-100 text-red-700',  // NOVO
  };
  return colors[categoria] || 'bg-gray-100 text-gray-700';
}
```

### Automatizar Criação de Desafios Semanais

Crie um script de seed ou cron job:

```typescript
// scripts/criar-desafio-semanal.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarDesafioSemanal() {
  const semanaAtual = getISOWeek(new Date());

  await prisma.weeklyChallenge.create({
    data: {
      titulo: `Desafio da Semana ${semanaAtual.split('-W')[1]}`,
      descricao: 'Complete simulados e ganhe FP extras!',
      metaSimulados: 5,
      metaFP: 200,
      recompensaFP: 50,
      semanaRef: semanaAtual,
      ativo: true
    }
  });
}

criarDesafioSemanal();
```

---

## 💡 Exemplos de Uso

### Exemplo 1: Sistema de Níveis Baseado em FP

```typescript
function calcularNivel(pontosFP: number): string {
  if (pontosFP >= 5000) return 'Diamond';
  if (pontosFP >= 2500) return 'Platinum';
  if (pontosFP >= 1000) return 'Gold';
  if (pontosFP >= 500) return 'Silver';
  return 'Bronze';
}

// Atualizar nível ao ganhar FP
await prisma.usuario.update({
  where: { id: usuarioId },
  data: {
    pontosFP: {
      increment: fpGanhos
    },
    nivel: calcularNivel((usuario.pontosFP || 0) + fpGanhos)
  }
});
```

### Exemplo 2: Recompensas Temporárias

Adicione campos ao modelo `UserReward`:

```prisma
model UserReward {
  // ... campos existentes
  expiraEm   DateTime?  // Null se não expira
  ativo      Boolean @default(true)
}
```

E crie um cron para desativar recompensas expiradas.

### Exemplo 3: Notificações de Desafio

```typescript
// Ao completar desafio, enviar notificação
if (completou) {
  await enviarNotificacao({
    usuarioId,
    titulo: 'Desafio Completado! 🎉',
    mensagem: `Você ganhou ${recompensaFP} FP!`,
    tipo: 'conquista'
  });
}
```

### Exemplo 4: Loja Sazonal

```typescript
// Criar recompensas sazonais
const recompensasBlackFriday = [
  {
    nome: 'Pack Black Friday',
    descricao: 'Pack especial com 3 boosts',
    custoFP: 200, // desconto de 300 -> 200
    categoria: 'premium',
    ativo: true,
    // Ativar apenas durante Black Friday via cron
  }
];
```

---

## 📊 Métricas e Análises

### Queries Úteis

**Recompensas mais resgatadas:**
```sql
SELECT r.nome, COUNT(ur.id) as resgates
FROM Reward r
LEFT JOIN UserReward ur ON r.id = ur.rewardId
GROUP BY r.id
ORDER BY resgates DESC;
```

**Usuários que completaram desafio:**
```sql
SELECT u.nome, uwp.dataConclusao
FROM UserWeeklyProgress uwp
JOIN Usuario u ON uwp.usuarioId = u.id
WHERE uwp.concluido = true AND uwp.challengeId = 'clx_challenge_id'
ORDER BY uwp.dataConclusao ASC;
```

**FP total em circulação:**
```sql
SELECT SUM(pontosFP) as totalFP FROM Usuario;
```

---

## 🔒 Segurança

### Validações Implementadas

1. **Verificação de FP:** Backend sempre valida se usuário tem FP suficientes
2. **Recompensas Únicas:** Sistema previne resgates duplicados
3. **Transações Atômicas:** Uso de `$transaction` garante consistência
4. **Validação de Estado:** Verifica se recompensas/desafios estão ativos

### Recomendações

- Adicionar autenticação JWT nas rotas
- Rate limiting para prevenir spam
- Logs de todas as transações de FP
- Auditoria de resgates suspeitos

---

## 🐛 Troubleshooting

### Progresso não atualiza

- Verifique se `semanaRef` está correto (formato ISO)
- Confirme que desafio está `ativo: true`
- Verifique se `usuarioId` e `challengeId` estão corretos

### FP não deduzido ao resgatar

- Confirme que transação não falhou (check logs)
- Verifique se usuário foi atualizado no localStorage
- Recarregue dados do usuário da API

### Recompensa única pode ser resgatada múltiplas vezes

- Verifique query em `resgatar/route.ts`
- Confirme que campo `unico` está `true` no banco

---

## 📝 Notas Finais

Este sistema é extensível e pode ser adaptado para:
- Missões diárias
- Conquistas (achievements)
- Sistema de badges
- Ranking de FP
- Eventos especiais
- Marketplace de itens entre usuários

Para dúvidas ou sugestões, consulte a documentação principal do ENEM-IA.

---

**Versão:** 1.0.0
**Data:** 14/11/2025
**Autor:** Sistema ENEM-IA
