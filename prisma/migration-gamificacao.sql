-- Migration: Sistema de Recompensas e Desafios
-- Data: 2025-11-14
-- Descrição: Adiciona tabelas e campos para sistema de gamificação

-- 1. Atualizar tabela Usuario com campos de gamificação
ALTER TABLE Usuario ADD COLUMN pontosFP INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Usuario ADD COLUMN nivel TEXT NOT NULL DEFAULT 'Bronze';

-- 2. Criar tabela Reward (Recompensas)
CREATE TABLE Reward (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    custoFP INTEGER NOT NULL,
    icone TEXT,
    categoria TEXT NOT NULL DEFAULT 'item',
    ativo BOOLEAN NOT NULL DEFAULT 1,
    unico BOOLEAN NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Criar tabela UserReward (Resgates de Recompensas)
CREATE TABLE UserReward (
    id TEXT PRIMARY KEY,
    usuarioId TEXT NOT NULL,
    rewardId TEXT NOT NULL,
    dataResgate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (rewardId) REFERENCES Reward(id) ON DELETE CASCADE
);

-- Índices para UserReward
CREATE INDEX idx_userreward_usuario ON UserReward(usuarioId);
CREATE INDEX idx_userreward_reward ON UserReward(rewardId);
CREATE INDEX idx_userreward_data ON UserReward(dataResgate);

-- 4. Criar tabela WeeklyChallenge (Desafios Semanais)
CREATE TABLE WeeklyChallenge (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    metaSimulados INTEGER NOT NULL,
    metaFP INTEGER NOT NULL,
    recompensaFP INTEGER NOT NULL,
    semanaRef TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índice para buscar desafios por semana
CREATE INDEX idx_weeklychallenge_semana ON WeeklyChallenge(semanaRef, ativo);

-- 5. Criar tabela UserWeeklyProgress (Progresso dos Usuários)
CREATE TABLE UserWeeklyProgress (
    id TEXT PRIMARY KEY,
    usuarioId TEXT NOT NULL,
    challengeId TEXT NOT NULL,
    simuladosFeitos INTEGER NOT NULL DEFAULT 0,
    fpGanhos INTEGER NOT NULL DEFAULT 0,
    concluido BOOLEAN NOT NULL DEFAULT 0,
    dataInicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dataConclusao DATETIME,
    FOREIGN KEY (usuarioId) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (challengeId) REFERENCES WeeklyChallenge(id) ON DELETE CASCADE,
    UNIQUE(usuarioId, challengeId)
);

-- Índices para UserWeeklyProgress
CREATE INDEX idx_userweeklyprogress_usuario ON UserWeeklyProgress(usuarioId);
CREATE INDEX idx_userweeklyprogress_challenge ON UserWeeklyProgress(challengeId);
CREATE INDEX idx_userweeklyprogress_concluido ON UserWeeklyProgress(concluido);

-- 6. Popular com dados iniciais (opcional - pode usar seed ao invés)
-- Você pode executar o script seed-gamificacao.ts ao invés desta parte

-- Comentários sobre as tabelas
-- Reward: Armazena todas as recompensas disponíveis na loja
-- UserReward: Histórico de resgates de cada usuário
-- WeeklyChallenge: Desafios criados para cada semana
-- UserWeeklyProgress: Progresso individual de cada usuário em cada desafio
