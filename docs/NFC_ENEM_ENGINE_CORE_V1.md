# NFC_ENEM_ENGINE_CORE_V1

## Documentação da Arquitetura

**Versão:** 1.0.0
**Data:** Dezembro 2024
**Autor:** Sistema ENEM PRO

---

## 1. Visão Geral

O **NFC_ENEM_ENGINE** é o motor de IA do ENEM PRO que implementa 40 módulos de aprendizado baseados em metodologias comprovadas de produtividade, memorização, estratégia e inteligência emocional.

### 1.1 Objetivo Principal

Receber eventos do aluno (erros, acertos, sessões, estados emocionais) e retornar automaticamente:
- Qual módulo ativar
- Quais ações executar
- Qual feedback enviar
- Quais recompensas de gamificação gerar

### 1.2 Fontes de Conhecimento

Os módulos são baseados em:
- "Os 10 Passos para Produtividade Máxima"
- "8 Passos para Alta Performance"
- "Manual de Linguagens ENEM"
- "Como Memorizar e Aprender Tudo" — Eduardo Novaes
- "Mnemônica" — Miguel Ángel Pérez Correa
- "Como Estudar e Aprender Melhor" — Ismar Souza
- "Jogo Estratégico ENEM"
- "Inteligência Emocional" (E-book)
- "Manual de Organização Acadêmica"

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  (Componentes React que consomem a API)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     API ROUTES                               │
│  POST /api/enem/engine/event   → Processa eventos           │
│  GET  /api/enem/engine/state   → Estado do aluno            │
│  GET  /api/enem/modules        → Lista módulos              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   NFC_ENEM_ENGINE                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    engine.ts                          │  │
│  │  - Mapeia eventos → gatilhos                          │  │
│  │  - Seleciona módulos candidatos                       │  │
│  │  - Rankeia por prioridade e contexto                  │  │
│  │  - Gera ações e feedback                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           ▼               ▼               ▼                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  MÓDULOS    │  │   TIPOS     │  │ GAMIFICAÇÃO │         │
│  │  (40 total) │  │  (types.ts) │  │ INTEGRATION │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              SISTEMA DE GAMIFICAÇÃO EXISTENTE               │
│  - FP (Focus Points)                                        │
│  - Níveis (Bronze → Diamond)                                │
│  - Badges                                                   │
│  - Desafios Semanais                                        │
│  - Ranking                                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Estrutura de Arquivos

```
lib/nfc-engine/
├── index.ts                    # Exportações principais
├── types.ts                    # Tipos e interfaces
├── engine.ts                   # Motor de decisão principal
├── gamification-integration.ts # Integração com gamificação
└── modules/
    ├── index.ts                # Índice de módulos
    ├── productivity.ts         # Módulos 1-5
    ├── linguagens.ts           # Módulos 6-7
    ├── emotional.ts            # Módulos 8-9, 19, 29, 37-38
    ├── organization.ts         # Módulos 10, 20, 30, 39-40
    ├── memory.ts               # Módulos 11-15, 21-22, 25-26, 31-33
    └── strategy.ts             # Módulos 16-18, 23-24, 27-28, 34-36

app/api/enem/
├── engine/
│   ├── event/route.ts          # POST - Processar eventos
│   └── state/route.ts          # GET - Estado do aluno
└── modules/route.ts            # GET - Listar módulos
```

---

## 4. Tipos de Módulos

| Tipo | Descrição | Quantidade |
|------|-----------|------------|
| `PRODUCTIVITY` | Produtividade e foco | 3 |
| `HIGH_PERFORMANCE` | Alta performance | 2 |
| `LINGUAGENS` | Específico para linguagens | 2 |
| `EMOTIONAL` | Regulação emocional | 6 |
| `ORGANIZATION` | Organização e planejamento | 5 |
| `MEMORY` | Memorização e retenção | 12 |
| `STRATEGY` | Estratégias de resolução | 10 |
| **TOTAL** | | **40** |

---

## 5. Categorias de Módulos

| Categoria | Descrição |
|-----------|-----------|
| `PRODUCTIVITY_CORE` | Produtividade básica |
| `HIGH_PERFORMANCE_CORE` | Alta performance |
| `LINGUAGENS_CORE` | Linguagens ENEM |
| `EMOTIONAL_CORE` | Inteligência emocional |
| `MEMORY_CORE` | Técnicas de memória |
| `STRATEGY_CORE` | Estratégias de prova |
| `ORGANIZATION_CORE` | Organização de estudos |

---

## 6. Fluxo Principal

```
┌─────────────┐
│   EVENTO    │  (erro, acerto, início sessão, mensagem, etc.)
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  MAPEAR PARA GATILHOS   │
│  Exemplo:               │
│  - question_answer      │
│    + isCorrect: false   │
│    + attemptNumber: 3   │
│  → ERROR_REPEATED       │
│  → ERROR_STRUCTURAL     │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  BUSCAR MÓDULOS         │
│  CANDIDATOS             │
│  (que respondem aos     │
│   gatilhos detectados)  │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  FILTRAR POR            │
│  CONSTRAINTS            │
│  - Cooldown             │
│  - Max por hora         │
│  - Max por sessão       │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  RANKEAR E SELECIONAR   │
│  - Prioridade base      │
│  - Boost por contexto   │
│  - Histórico de sucesso │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  GERAR RESPOSTA         │
│  - Módulo ativado       │
│  - Ações a executar     │
│  - Feedback ao aluno    │
│  - Eventos gamificação  │
└─────────────────────────┘
```

---

## 7. Gatilhos (Triggers)

### 7.1 Eventos de Estudo
| Gatilho | Descrição |
|---------|-----------|
| `SESSION_START` | Início de sessão |
| `SESSION_END` | Fim de sessão |
| `BLOCK_COMPLETE` | Bloco de estudo completado |
| `BREAK_TIME` | Hora da pausa |

### 7.2 Eventos de Desempenho
| Gatilho | Descrição |
|---------|-----------|
| `ERROR_REPEATED` | Erro repetido (mesmo padrão) |
| `ERROR_STRUCTURAL` | Erro estrutural (3x mesmo tipo) |
| `HIGH_ERROR_RATE` | Taxa de erro alta |
| `CORRECT_ANSWER` | Resposta correta |
| `PERFECT_BLOCK` | Bloco perfeito (100%) |

### 7.3 Eventos Emocionais
| Gatilho | Descrição |
|---------|-----------|
| `ANXIETY_DETECTED` | Ansiedade detectada |
| `FRUSTRATION_DETECTED` | Frustração detectada |
| `PROCRASTINATION` | Procrastinação detectada |
| `MENTAL_BLOCK` | Bloqueio mental |
| `LOW_CONFIDENCE` | Baixa confiança |

### 7.4 Eventos de Tempo
| Gatilho | Descrição |
|---------|-----------|
| `TIME_EXCEEDED` | Tempo excedido na questão |
| `LONG_INACTIVITY` | Inatividade longa |
| `OPTIMAL_TIME_WINDOW` | Janela ótima de estudo |
| `FATIGUE_DETECTED` | Fadiga detectada |

### 7.5 Eventos de Revisão
| Gatilho | Descrição |
|---------|-----------|
| `REVIEW_DUE_1H` | Revisão devida (1 hora) |
| `REVIEW_DUE_24H` | Revisão devida (24 horas) |
| `REVIEW_DUE_7D` | Revisão devida (7 dias) |

### 7.6 Eventos de Solicitação
| Gatilho | Descrição |
|---------|-----------|
| `HELP_REQUESTED` | Aluno pediu ajuda |
| `CANT_START` | "Não consigo começar" |
| `CONTENT_DIFFICULT` | Conteúdo difícil |

---

## 8. Estrutura de um Módulo

```typescript
interface NFCModule {
  id: string;                 // ID único
  code: string;               // Código (MODULE_XX)
  name: string;               // Nome do módulo
  type: ModuleType;           // Tipo (MEMORY, STRATEGY, etc.)
  category: ModuleCategory;   // Categoria
  version: string;            // Versão
  source: string;             // Fonte do conhecimento

  objective: string;          // Objetivo do módulo

  algorithm: {
    steps: AlgorithmStep[];   // Passos do algoritmo
    fallback?: string;        // Ação de fallback
    maxDuration?: number;     // Duração máxima (segundos)
  };

  triggers: TriggerType[];    // Gatilhos que ativam
  priority: number;           // Prioridade (1-10)

  gamification: {
    xpOnActivation: number;   // XP ao ativar
    xpOnCompletion: number;   // XP ao completar
    coinsOnCompletion: number;
    possibleBadges: string[];
    missionContribution: string[];
  };

  metadata: {
    estimatedDuration: number;
    difficulty: 'easy' | 'medium' | 'hard';
    targetAreas: string[];
    tags: string[];
  };

  enabled: boolean;
}
```

---

## 9. Integração com Gamificação

### 9.1 Eventos Gerados

| Evento | Descrição |
|--------|-----------|
| `xp_earned` | XP/FP ganho |
| `coins_earned` | Moedas ganhas |
| `badge_unlocked` | Badge desbloqueado |
| `mission_progress` | Progresso em missão |

### 9.2 Fluxo de Gamificação

```
Módulo Ativado
      │
      ├── XP de ativação creditado
      │
      ▼
Módulo Completado
      │
      ├── XP de conclusão creditado
      ├── Coins creditados
      ├── Verificar badges possíveis
      └── Atualizar progresso de missões
```

### 9.3 Badges Relacionados aos Módulos

| Badge | Condição |
|-------|----------|
| `focus_master` | 10+ blocos completados |
| `memory_master` | 10+ ativações do Ciclo 1-24-7 |
| `calm_mind` | 10+ ativações de regulação emocional |
| `pattern_hunter` | 10+ ativações de padrões ocultos |
| `trap_detector` | 15+ ativações do detector de pegadinhas |
| `antifragile` | 10+ erros estruturais corrigidos |

---

## 10. API Endpoints

### 10.1 POST /api/enem/engine/event

Processa um evento e retorna a resposta do engine.

**Request:**
```json
{
  "userId": "user_123",
  "eventType": "question_answer",
  "eventData": {
    "questionId": "q_456",
    "area": "matematica",
    "topic": "funcoes",
    "isCorrect": false,
    "timeSpent": 180,
    "attemptNumber": 3
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "activatedModule": {
      "moduleId": "NFC_ENEM_HIGH_PERFORMANCE_CORE_V1_MODULE_05",
      "moduleName": "Aluno Antifrágil",
      "reason": "Gatilhos detectados: ERROR_STRUCTURAL, ERROR_REPEATED"
    },
    "actions": [
      {
        "type": "ACTIVATE_MODULE",
        "priority": "high",
        "params": { ... }
      }
    ],
    "feedback": {
      "type": "instruction",
      "message": "Detectamos um padrão de erro. Vamos criar uma explicação personalizada...",
      "visual": { "icon": "brain", "color": "purple" }
    },
    "gamification": {
      "events": [
        { "type": "xp_earned", "value": 10, "description": "Módulo ativado" }
      ]
    }
  }
}
```

### 10.2 GET /api/enem/engine/state

Retorna o estado atual do aluno.

**Query Params:**
- `userId` (obrigatório): ID do usuário

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "João",
      "pontosFP": 1500,
      "nivel": "Silver",
      "streak": { "current": 7, "max": 15 }
    },
    "today": {
      "modulesActivated": 5,
      "questionsAnswered": 30,
      "questionsCorrect": 24,
      "fpEarned": 150
    },
    "moduleUsage": {
      "totalActivations": 45,
      "topModules": [...]
    },
    "alerts": [
      {
        "type": "streak_risk",
        "message": "Seu streak de 7 dias está em risco!",
        "priority": "high"
      }
    ]
  }
}
```

### 10.3 GET /api/enem/modules

Lista módulos disponíveis.

**Query Params:**
- `type`: Filtrar por tipo (MEMORY, STRATEGY, etc.)
- `category`: Filtrar por categoria
- `area`: Filtrar por área do ENEM
- `enabled`: Apenas habilitados (true/false)
- `stats`: Incluir estatísticas (true/false)
- `id`: Buscar módulo específico

**Response:**
```json
{
  "success": true,
  "data": {
    "modules": [...],
    "total": 40,
    "stats": {
      "total": 40,
      "enabled": 40,
      "byType": { "MEMORY": 12, "STRATEGY": 10, ... }
    }
  }
}
```

---

## 11. Como Adicionar Novos Módulos

### 11.1 Passo a Passo

1. **Criar o módulo** no arquivo da categoria correspondente:

```typescript
// lib/nfc-engine/modules/memory.ts

export const MODULE_XX_NOME: NFCModule = {
  id: 'NFC_ENEM_MEMORY_CORE_V1_MODULE_XX',
  code: 'MODULE_XX',
  name: 'Nome do Módulo',
  type: 'MEMORY',
  category: 'MEMORY_CORE',
  version: '1.0.0',
  source: 'Fonte do conhecimento',

  objective: 'Objetivo do módulo',

  algorithm: {
    steps: [
      {
        order: 1,
        action: 'PRIMEIRA_ACAO',
        params: { ... }
      },
      // ... mais passos
    ],
    maxDuration: 600
  },

  triggers: ['GATILHO_1', 'GATILHO_2'],
  priority: 6,

  gamification: {
    xpOnActivation: 5,
    xpOnCompletion: 25,
    coinsOnCompletion: 15,
    possibleBadges: ['badge_1', 'badge_2'],
    missionContribution: ['mission_1']
  },

  metadata: {
    estimatedDuration: 10,
    difficulty: 'medium',
    targetAreas: ['all'],
    tags: ['tag1', 'tag2']
  },

  enabled: true
};
```

2. **Adicionar ao array de exportação**:

```typescript
export const MEMORY_MODULES: NFCModule[] = [
  // ... módulos existentes
  MODULE_XX_NOME,
];
```

3. **O módulo será automaticamente**:
   - Incluído no `ALL_MODULES`
   - Mapeado no `TRIGGER_MODULE_MAP`
   - Disponível na API

### 11.2 Boas Práticas

- Use IDs sequenciais dentro de cada categoria
- Defina gatilhos específicos para o módulo
- Mantenha prioridade entre 1-10 (10 = máxima)
- Documente a fonte do conhecimento
- Teste os gatilhos antes de publicar

---

## 12. Configuração do Engine

```typescript
const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  maxModulesPerSession: 10,    // Máximo de módulos por sessão
  maxModulesPerHour: 3,        // Máximo por hora
  cooldownBetweenSameModule: 30, // Minutos entre ativações do mesmo módulo

  emotionalDetection: {
    enabled: true,
    anxietyThreshold: 0.7,
    frustrationThreshold: 0.6,
    analyzeMessages: true,
  },

  spacedRepetition: {
    enabled: true,
    cycle1Hours: 1,
    cycle24Hours: 24,
    cycle7Days: 168,
  },

  gamification: {
    xpMultiplier: 1.0,
    coinsMultiplier: 1.0,
    enableBadges: true,
    enableMissions: true,
  },

  studyBlocks: {
    defaultDuration: 25,     // Pomodoro
    breakDuration: 5,
    longBreakAfterBlocks: 4,
    longBreakDuration: 15,
  },
};
```

---

## 13. Exemplos de Uso

### 13.1 Processar Erro de Questão

```typescript
import { processStudentEvent, createEvent, createMinimalContext, createMinimalHistory } from '@/lib/nfc-engine';

const event = createEvent('question_answer', {
  questionId: 'q_123',
  area: 'matematica',
  topic: 'funcoes',
  isCorrect: false,
  timeSpent: 180,
  attemptNumber: 3,
});

const context = createMinimalContext('user_123', {
  errorPatterns: [
    { area: 'matematica', topic: 'funcoes', errorCount: 3, isStructural: true, lastError: new Date() }
  ]
});

const history = createMinimalHistory('user_123');

const { response, gamificationResult } = await processStudentEvent(
  'user_123',
  event,
  context,
  history
);

// response.activatedModule → Módulo "Aluno Antifrágil" ativado
// response.feedback → Instruções para o aluno
// gamificationResult → XP ganho, badges, etc.
```

### 13.2 Detectar Ansiedade

```typescript
const event = createEvent('user_message', {
  userMessage: 'Estou muito ansioso, não vou conseguir passar no ENEM'
});

// O engine detectará ANXIETY_DETECTED e LOW_CONFIDENCE
// Ativará MODULE_08 (Regulação Emocional) ou MODULE_19 (Controle para Provas)
```

### 13.3 Início de Sessão

```typescript
const event = createEvent('session_start', {});

// O engine ativará:
// - MODULE_01 (Fricção Zero) se for o primeiro acesso do dia
// - MODULE_39 (Rotina Matinal) se for manhã
// - MODULE_02 (Pomodoro) para iniciar bloco de estudos
```

---

## 14. Roadmap

### Próximas Implementações

1. **Sistema de Revisão Espaçada**
   - Implementar tracking completo do Ciclo 1-24-7
   - Notificações de revisões pendentes

2. **Detecção Emocional Avançada**
   - Análise de sentimento em mensagens
   - Histórico de estados emocionais

3. **Componentes React**
   - Painel de progresso dos módulos
   - Indicadores emocionais
   - Cards de ações sugeridas

4. **Analytics Avançados**
   - Dashboard de uso de módulos
   - Métricas de efetividade
   - A/B testing de módulos

---

## 15. Changelog

### v1.0.0 (Dezembro 2024)
- Implementação inicial dos 40 módulos
- Motor de decisão com ranking por prioridade
- Integração com sistema de gamificação
- API REST completa
- Documentação

---

## Contato

Para dúvidas ou sugestões sobre o NFC_ENEM_ENGINE, abra uma issue no repositório do projeto.
