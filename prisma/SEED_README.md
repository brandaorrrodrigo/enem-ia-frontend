# 🌱 Database Seed - ENEM Questions

This document explains how to populate the database with real ENEM questions.

---

## 📋 Overview

The seed script (`prisma/seed.ts`) reads ENEM questions from JSON files and inserts them into the database.

**Features:**
- ✅ Reads JSON files with ENEM questions
- ✅ Validates data before inserting
- ✅ **Idempotent** (won't duplicate existing questions)
- ✅ Maps JSON format to Prisma schema
- ✅ Detailed logging
- ✅ Error handling

---

## 📂 JSON File Location

Currently reading from:
```
backend/enem_ingestion/exemplo_questoes_enem.json
```

This file contains **3 example questions** (Math, Physics, Portuguese).

---

## 📊 JSON Format

The seed script expects JSON files in this format:

```json
{
  "versao": "1.0",
  "total_questoes": 3,
  "gerado_em": "2025-11-13T00:00:00",
  "questoes": [
    {
      "numero": 145,
      "ano": 2024,
      "disciplina": "matematica",
      "enunciado": "Uma função quadrática...",
      "alternativas": {
        "A": "a = -1",
        "B": "a = 0",
        "C": "a = 1",
        "D": "a = 2",
        "E": "a = 3"
      },
      "correta": "C",
      "habilidade": "H19",
      "competencia": 5,
      "explicacao": "Usando a forma de vértice..."
    }
  ]
}
```

**Key fields:**
- `enunciado` (required) - Question text
- `alternativas` (required) - Object with A-E keys
- `correta` (required) - Letter A-E
- `numero`, `ano`, `disciplina` - Metadata (not stored in DB currently)
- `habilidade`, `competencia`, `explicacao` - Optional metadata

---

## 🗄️ Prisma Schema Mapping

The seed script maps JSON to the Prisma schema:

```typescript
// JSON format
{
  "enunciado": "Uma função...",
  "alternativas": { "A": "...", "B": "...", ... },
  "correta": "C"
}

// Prisma model
model Questao {
  id           Int      @id @default(autoincrement())
  enunciado    String   // ← Direct mapping
  alternativas Json     // ← Array of 5 strings ["...", "...", ...]
  correta      Int      // ← Letter → Index (C = 2)
}
```

**Conversion:**
- `alternativas`: Object `{A, B, C, D, E}` → Array `[str, str, str, str, str]`
- `correta`: Letter `"C"` → Index `2` (0-based)

---

## 🚀 How to Run

### Step 1: Install Dependencies

```bash
cd enem-pro
npm install
```

This will install:
- `@prisma/client`
- `prisma`
- `ts-node` (to run TypeScript seed script)

### Step 2: Run the Seed

```bash
cd enem-pro
npx prisma db seed
```

**Expected output:**
```
🌱 Iniciando seed do banco de dados...

📂 Carregando arquivo: D:\enem-ia\backend\enem_ingestion\exemplo_questoes_enem.json
✅ Arquivo carregado: 3 questões
✅ Questão 145 inserida (ID: 1, Correta: C = índice 2)
✅ Questão 82 inserida (ID: 2, Correta: B = índice 1)
✅ Questão 127 inserida (ID: 3, Correta: B = índice 1)

📊 Resumo do seed:
   ✅ Inseridas: 3
   ⏭️  Duplicadas (ignoradas): 0
   ❌ Erros: 0

✅ Seed concluído com sucesso!
```

### Step 3: Verify Data

Open Prisma Studio to check the data:

```bash
cd enem-pro
npx prisma studio
```

Or query directly:

```bash
cd enem-pro
npx prisma db execute --stdin <<< "SELECT * FROM Questao;"
```

---

## 🔄 Idempotency

The seed script is **idempotent** - you can run it multiple times safely.

**How it works:**
1. Before inserting a question, checks if it already exists
2. Uses the first 100 characters of `enunciado` as a unique identifier
3. If found, skips insertion and logs: `⏭️  Questão X já existe`

**Example (second run):**
```
📂 Carregando arquivo: ...
✅ Arquivo carregado: 3 questões
⏭️  Questão 145 já existe (ID: 1)
⏭️  Questão 82 já existe (ID: 2)
⏭️  Questão 127 já existe (ID: 3)

📊 Resumo do seed:
   ✅ Inseridas: 0
   ⏭️  Duplicadas (ignoradas): 3
   ❌ Erros: 0
```

---

## 📁 Adding More JSON Files

To add more ENEM questions:

### Option 1: Add files to the same location

Place JSON files in:
```
backend/enem_ingestion/
├── exemplo_questoes_enem.json  ✅ (existing)
├── enem_2023.json              ← Add here
├── enem_2022.json              ← Add here
└── enem_matematica.json        ← Add here
```

Then edit `prisma/seed.ts` line ~195:

```typescript
async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  try {
    await seedQuestoesDoArquivo('../../backend/enem_ingestion/exemplo_questoes_enem.json');

    // Add more files here:
    await seedQuestoesDoArquivo('../../backend/enem_ingestion/enem_2023.json');
    await seedQuestoesDoArquivo('../../backend/enem_ingestion/enem_2022.json');
    await seedQuestoesDoArquivo('../../backend/enem_ingestion/enem_matematica.json');

    console.log('\n✅ Seed concluído com sucesso!');
  } catch (error: any) {
    console.error('\n❌ Erro durante o seed:', error.message);
    throw error;
  }
}
```

### Option 2: Create data/ folder

```
enem-pro/
├── prisma/
│   ├── seed.ts
│   └── schema.prisma
└── data/
    ├── enem_2023.json  ← Add here
    └── enem_2022.json  ← Add here
```

Then use relative path:
```typescript
await seedQuestoesDoArquivo('../data/enem_2023.json');
```

---

## 🐛 Troubleshooting

### Error: `Cannot find module 'ts-node'`

**Solution:**
```bash
cd enem-pro
npm install ts-node --save-dev
```

### Error: `Arquivo não encontrado`

**Check the path:**
1. Seed script runs from: `enem-pro/prisma/`
2. JSON file is at: `backend/enem_ingestion/exemplo_questoes_enem.json`
3. Relative path: `../../backend/enem_ingestion/exemplo_questoes_enem.json`

**Verify:**
```bash
cd enem-pro/prisma
ls ../../backend/enem_ingestion/exemplo_questoes_enem.json
```

### Error: `Alternativa X faltando`

**Problem:** JSON has incomplete alternativas

**Solution:** Ensure all questions have A, B, C, D, E:
```json
{
  "alternativas": {
    "A": "Opção A",
    "B": "Opção B",
    "C": "Opção C",
    "D": "Opção D",
    "E": "Opção E"
  }
}
```

### Error: `Letra inválida`

**Problem:** `correta` is not A-E

**Solution:** Check that `correta` is one of: `"A"`, `"B"`, `"C"`, `"D"`, `"E"`

---

## 🧪 Testing the Seed

### 1. Reset Database

```bash
cd enem-pro
npx prisma migrate reset --force
```

This will:
- Drop all tables
- Re-run migrations
- **Automatically run seed** (because of `prisma.seed` in package.json)

### 2. Run Seed Manually

```bash
cd enem-pro
npx prisma db seed
```

### 3. Check Results

```bash
cd enem-pro
npx prisma studio
```

Navigate to `Questao` table and verify:
- 3 questions inserted
- `alternativas` is a JSON array with 5 strings
- `correta` is 0-4 (not A-E)

---

## 📊 Seed Script Details

### Validation Rules

The seed script validates:
- ✅ `enunciado` must have at least 10 characters
- ✅ `alternativas` must have all 5 keys (A-E)
- ✅ `correta` must be one of A-E
- ✅ Each alternativa must be a non-empty string

### Conversion Functions

```typescript
// Letter → Index
letraParaIndice('A') // → 0
letraParaIndice('C') // → 2
letraParaIndice('E') // → 4

// Object → Array
alternativasParaArray({
  A: "Opt A",
  B: "Opt B",
  C: "Opt C",
  D: "Opt D",
  E: "Opt E"
})
// → ["Opt A", "Opt B", "Opt C", "Opt D", "Opt E"]
```

### Duplicate Detection

Uses first 100 characters of `enunciado` (lowercase) as unique identifier:

```typescript
function criarIdUnico(questao: QuestaoJSON): string {
  return questao.enunciado.trim().substring(0, 100).toLowerCase();
}
```

Then queries:
```typescript
const existente = await prisma.questao.findFirst({
  where: {
    enunciado: {
      contains: idUnico,
    },
  },
});
```

**Note:** This is a simple approach. For production, consider:
- Adding a `numero` + `ano` unique constraint in schema
- Or using a hash of the full enunciado

---

## 📈 Expected Results

After running the seed with `exemplo_questoes_enem.json`:

**Database:**
```
Questao table:
┌────┬─────────────────────────────────────┬──────────────────────────────┬─────────┐
│ id │ enunciado                           │ alternativas                 │ correta │
├────┼─────────────────────────────────────┼──────────────────────────────┼─────────┤
│ 1  │ Uma função quadrática f(x) = ...   │ ["a = -1", "a = 0", ...]     │ 2       │
│ 2  │ Um carro parte do repouso e ...    │ ["1 m/s²", "2 m/s²", ...]    │ 1       │
│ 3  │ Leia o trecho: 'A tecnologia ...   │ ["Adição", "Adversidade",...]│ 1       │
└────┴─────────────────────────────────────┴──────────────────────────────┴─────────┘
```

**Notes:**
- `alternativas` is stored as JSON array
- `correta` is 0-based index (C = 2, B = 1)
- `numero`, `disciplina`, `ano` from JSON are NOT stored (not in schema)

---

## 🔮 Future Enhancements

### 1. Store Metadata

Extend Prisma schema to store:
```prisma
model Questao {
  id           Int      @id @default(autoincrement())
  enunciado    String
  alternativas Json
  correta      Int

  // Add these:
  numero       Int?
  ano          Int?
  disciplina   String?
  habilidade   String?
  competencia  Int?
  explicacao   String?  @db.Text
}
```

### 2. Better Duplicate Detection

Add unique constraint:
```prisma
model Questao {
  numero Int?
  ano    Int?

  @@unique([numero, ano])
}
```

### 3. Bulk Insert

For large files (1000+ questions), use batch insert:
```typescript
await prisma.questao.createMany({
  data: questoes,
  skipDuplicates: true,
});
```

### 4. CLI Arguments

Allow specifying files via command line:
```bash
npx prisma db seed -- --file=enem_2023.json
```

---

## 📚 Related Documentation

- **Prisma Schema:** `enem-pro/prisma/schema.prisma`
- **Seed Script:** `enem-pro/prisma/seed.ts`
- **JSON Format:** `backend/enem_ingestion/exemplo_questoes_enem.json`
- **Ingestion Pipeline:** `backend/enem_ingestion/` (Session 2)
- **Simulados API:** `backend/routers/enem_simulados.py` (Session 3)
- **Frontend:** `enem-pro/app/simulado/` (Session 4)

---

## ✅ Summary

**To populate the database with ENEM questions:**

```bash
# 1. Navigate to project
cd enem-pro

# 2. Install dependencies (if not done)
npm install

# 3. Run seed
npx prisma db seed
```

**Result:**
- 3 questions inserted from `exemplo_questoes_enem.json`
- Ready to use in simulados
- Idempotent (safe to re-run)

---

_Created: 2025-11-14_
_Part of ENEM-IA project_
