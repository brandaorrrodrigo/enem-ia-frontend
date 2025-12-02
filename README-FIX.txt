
# ENEM-IA — Fix Pack (Prisma + Seed)

## O que mudou
- `alternativas` agora é `Json` no `schema.prisma` (SQLite não suporta listas escalares).
- Seed em **JavaScript** (`scripts/seed-questions.js`) — roda direto com `node`.
- API `/api/simulado` usando `lib/prisma` singleton e mensagens de erro claras.
- `.env.example` com `DATABASE_URL` pronto para copiar.

## Passo a passo
1. Mova o **CONTEÚDO** destas pastas para a raiz do seu projeto (D:\enem-ia\enem-pro), mesclando:
   - `prisma/` (substitua o `schema.prisma`)
   - `scripts/` (adiciona `seed-questions.js`)
   - `app/api/simulado/route.ts` (substitua)
   - `.env.example` (copie como `.env`)

2. Crie o `.env` na raiz (se ainda não existir):
   - copie `.env.example` para `.env`

3. Dependências (se necessário):
   npm i -D prisma
   npm i @prisma/client

4. Prisma:
   npx prisma format
   npx prisma generate
   npx prisma migrate dev --name init_simulado

5. Seed:
   node .\scripts\seed-questions.js

6. Inicie:
   npm run dev
