-- CreateTable
CREATE TABLE "Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enunciado" TEXT NOT NULL,
    "alternativas" JSONB NOT NULL,
    "correta" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Simulado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "disciplina" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SimuladoQuestao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "simuladoId" TEXT NOT NULL,
    "questaoId" INTEGER NOT NULL,
    CONSTRAINT "SimuladoQuestao_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "Simulado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SimuladoQuestao_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
