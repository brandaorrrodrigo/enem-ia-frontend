/**
 * Tipos TypeScript para API de Simulados ENEM
 *
 * Compatível com backend FastAPI (Sessão 3)
 */

// ============================================================================
// QUESTÃO
// ============================================================================

export interface Questao {
  id: number;
  enunciado: string;
  alternativas: string[];  // Array de 5 alternativas (A-E)
}

// ============================================================================
// REQUESTS (Chamadas de API)
// ============================================================================

export interface StartSimuladoRequest {
  user_id: string;
  area?: string;       // Opcional: disciplina específica
  quantidade: number;  // 1-180
}

export interface AnswerRequest {
  user_id: string;
  simulado_id: string;      // ID do UsuarioSimulado
  questao_id: number;
  alternativa_marcada: number | null;  // 0-4 (A-E) ou null
}

export interface FinishRequest {
  user_id: string;
  simulado_id: string;
}

export interface CompareScoreRequest {
  user_id: string;
  simulado_id: string;
  curso: string;
  universidade: string;
  ano: number;
}

// ============================================================================
// RESPONSES (Respostas de API)
// ============================================================================

export interface StartSimuladoResponse {
  simulado_id: string;
  usuario_simulado_id: string;
  quantidade: number;
  disciplina: string | null;
  questoes: Questao[];
}

export interface AnswerResponse {
  ok: boolean;
  resposta_id: number;
  questao_id: number;
  alternativa_marcada: number | null;
}

export interface ErroDetalhado {
  questao_id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
  marcada: number | null;
}

export interface FinishResponse {
  ok: boolean;
  usuario_simulado_id: string;
  acertos: number;
  erros: number;
  total: number;
  porcentagem: number;
  nota: number;         // 0-1000
  desempenho: string;   // "🏆 Excelente", "👍 Bom", etc
  erros_detalhados: ErroDetalhado[];
}

export interface CompareScoreResponse {
  passou: boolean;
  nota_usuario: number;
  nota_corte: number | null;
  diferenca: number | null;
  mensagem: string;
}

export interface HistoricoSimulado {
  id: string;
  disciplina: string;
  nota: number;
  acertos: number;
  total: number;
  porcentagem: string;
  data: string;
}

export interface HistoryResponse {
  simulados: HistoricoSimulado[];
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Converte letra (A-E) para índice (0-4)
 */
export function letraParaIndice(letra: string): number {
  return letra.toUpperCase().charCodeAt(0) - 65;
}

/**
 * Converte índice (0-4) para letra (A-E)
 */
export function indiceParaLetra(indice: number): string {
  return String.fromCharCode(65 + indice);
}

/**
 * Valida se índice está no range 0-4
 */
export function isIndiceValido(indice: number): boolean {
  return indice >= 0 && indice <= 4;
}

// ============================================================================
// CONSTANTES
// ============================================================================

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const AREAS_ENEM = [
  { value: 'matematica', label: 'Matemática e suas Tecnologias' },
  { value: 'linguagens', label: 'Linguagens, Códigos e suas Tecnologias' },
  { value: 'humanas', label: 'Ciências Humanas e suas Tecnologias' },
  { value: 'natureza', label: 'Ciências da Natureza e suas Tecnologias' },
] as const;

export type AreaEnem = typeof AREAS_ENEM[number]['value'];
