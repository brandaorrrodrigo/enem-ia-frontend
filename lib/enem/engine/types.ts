/**
 * NFC_ENEM_ENGINE - Tipos do Motor de IA
 *
 * Define todos os tipos necessários para o funcionamento do motor
 * de decisão baseado nos 60 módulos de aprendizagem
 */

// ============================================================
// TIPOS DE MÓDULO
// ============================================================

/**
 * Tipos de módulos disponíveis no sistema
 */
export type ModuleType =
  | 'MEMORY'
  | 'STRATEGY'
  | 'EMOTIONAL'
  | 'ORGANIZATION'
  | 'LINGUAGENS'
  | 'REDACAO'
  | 'PRODUCTIVITY'
  | 'HIGH_PERFORMANCE';

/**
 * Estrutura de um módulo do engine
 */
export interface EngineModule {
  /** Identificador único (ex: "M01", "M47") */
  id: string;
  /** Nome do módulo (ex: "Reconstrução Cognitiva") */
  nome: string;
  /** Tipo do módulo */
  tipo: ModuleType;
  /** Objetivo do módulo */
  objetivo: string;
  /** Gatilhos que ativam o módulo */
  gatilhos: string[];
  /** Passos do algoritmo em texto simples */
  algoritmo: string[];
  /** Ações que o módulo pode retornar */
  acoesRetorno: string[];
  /** Fonte do conhecimento (ebook, manual) */
  fonte?: string;
  /** Prioridade (1-10, 10 = máxima) */
  prioridade: number;
  /** Áreas alvo do ENEM */
  areasAlvo: string[];
  /** Tags para busca */
  tags: string[];
}

// ============================================================
// TIPOS DE EVENTO
// ============================================================

/**
 * Tipos de eventos que o motor pode receber
 */
export type EngineEventType =
  | 'erro'
  | 'erro_repetido'
  | 'acerto'
  | 'travamento'
  | 'ansiedade'
  | 'inicio_sessao'
  | 'fim_sessao'
  | 'queda_de_rendimento'
  | 'tempo_excessivo'
  | 'pedido_ajuda'
  | 'bloco_completo'
  | 'revisao_devida'
  | 'conteudo_dificil'
  | 'frustração'
  | 'baixa_confiança'
  | 'procrastinação'
  | 'inatividade_longa';

/**
 * Evento enviado ao motor
 */
export interface EngineEvent {
  /** ID do aluno */
  alunoId: string;
  /** Tipo do evento */
  tipo: EngineEventType;
  /** Matéria/disciplina (opcional) */
  materia?: string;
  /** Descrição livre do contexto */
  contexto?: string;
  /** Dados adicionais */
  dados?: Record<string, unknown>;
  /** Timestamp ISO */
  timestamp?: string;
}

// ============================================================
// ESTADO EMOCIONAL E DO ALUNO
// ============================================================

/**
 * Níveis emocionais do aluno (0-100)
 */
export interface NivelEmocional {
  /** Nível de stress (0 = calmo, 100 = extremo) */
  stress: number;
  /** Nível de motivação (0 = desmotivado, 100 = motivadíssimo) */
  motivacao: number;
  /** Nível de confiança (0 = sem confiança, 100 = muito confiante) */
  confianca: number;
}

/**
 * Estado completo do aluno
 */
export interface StudentState {
  /** ID do aluno */
  alunoId: string;
  /** Progresso por matéria (0-100%) */
  progressoConteudos: Record<string, number>;
  /** Erros recentes */
  errosRecentes: EngineEvent[];
  /** Acertos recentes */
  acertosRecentes: EngineEvent[];
  /** Tempo médio por questão por matéria (segundos) */
  tempoPorQuestao: Record<string, number>;
  /** Estado emocional atual */
  nivelEmocional: NivelEmocional;
  /** IDs dos módulos já acionados */
  modulosAcionados: string[];
  /** Contagem de acionamentos por módulo */
  contagemModulos: Record<string, number>;
  /** Rotina semanal do aluno */
  rotinaSemanal: Record<string, unknown>;
  /** Última atualização (ISO) */
  atualizadoEm: string;
  /** Sessões de estudo hoje */
  sessoesHoje: number;
  /** Streak atual (dias consecutivos) */
  streakAtual: number;
  /** Erros estruturais identificados */
  errosEstruturais: string[];
}

// ============================================================
// GAMIFICAÇÃO
// ============================================================

/**
 * Payload de gamificação retornado pelo engine
 */
export interface GamificationPayload {
  /** FP ganho */
  FP: number;
  /** Moedas ganhas */
  moedas: number;
  /** Missões concluídas */
  missoesConcluidas: string[];
  /** Badge desbloqueado (se houver) */
  badge?: string;
  /** Descrição do ganho */
  descricao?: string;
}

// ============================================================
// AÇÕES DO ENGINE
// ============================================================

/**
 * Tipos de ações que o engine pode recomendar
 */
export type EngineActionType =
  | 'mostrar_mensagem'
  | 'gerar_drill'
  | 'gerar_mapa_mental'
  | 'sugerir_revisao'
  | 'sugerir_pausa'
  | 'sugerir_simulado'
  | 'ajustar_rotina'
  | 'ativar_respiracao'
  | 'apresentar_questao_facil'
  | 'criar_flashcards'
  | 'agendar_revisao'
  | 'mostrar_progresso'
  | 'reforçar_identidade'
  | 'simplificar_conteudo';

/**
 * Ação retornada pelo engine
 */
export interface EngineAction {
  /** Tipo da ação */
  tipo: EngineActionType;
  /** Título da ação */
  titulo?: string;
  /** Mensagem para o aluno */
  mensagem?: string;
  /** Conteúdo adicional (drill, mapa, etc) */
  conteudo?: unknown;
  /** Prioridade da ação */
  prioridade?: 'alta' | 'media' | 'baixa';
}

// ============================================================
// RESPOSTA DO ENGINE
// ============================================================

/**
 * Resposta completa do motor de decisão
 */
export interface EngineResponse {
  /** ID do módulo ativado */
  moduloId?: string;
  /** Nome do módulo ativado */
  moduloNome?: string;
  /** Tipo do módulo ativado */
  moduloTipo?: ModuleType;
  /** Objetivo do módulo */
  moduloObjetivo?: string;
  /** Ações recomendadas */
  acoes: EngineAction[];
  /** Gamificação associada */
  gamificacao?: GamificationPayload;
  /** Novo estado do aluno após processamento */
  novoEstado?: StudentState;
  /** Razão da ativação */
  razaoAtivacao?: string;
  /** Score do módulo escolhido */
  scoreModulo?: number;
  /** Timestamp do processamento */
  processadoEm: string;
}

// ============================================================
// CONFIGURAÇÃO DO ENGINE
// ============================================================

/**
 * Configuração do motor de decisão
 */
export interface EngineConfig {
  /** Máximo de módulos por sessão */
  maxModulosPorSessao: number;
  /** Máximo de módulos por hora */
  maxModulosPorHora: number;
  /** Cooldown entre ativações do mesmo módulo (minutos) */
  cooldownMesmoModulo: number;
  /** Peso para prioridade do módulo */
  pesoprioridade: number;
  /** Peso para match de gatilho */
  pesoGatilho: number;
  /** Penalidade por repetição */
  penalidadeRepeticao: number;
}

/**
 * Configuração padrão do engine
 */
export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  maxModulosPorSessao: 10,
  maxModulosPorHora: 3,
  cooldownMesmoModulo: 30,
  pesoprioridade: 2.0,
  pesoGatilho: 3.0,
  penalidadeRepeticao: 1.5,
};
