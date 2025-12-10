// ============================================================================
// TIPOS PARA QUESTÕES DO ENEM
// ============================================================================

export interface Questao {
  id: number;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  gabarito: 'A' | 'B' | 'C' | 'D' | 'E';
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
  ano?: number;
}

export interface RespostaQuestao {
  questao_id: number;
  resposta_usuario: 'A' | 'B' | 'C' | 'D' | 'E';
  resposta_correta: 'A' | 'B' | 'C' | 'D' | 'E';
  acertou: boolean;
  enunciado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
}

export interface ResultadoSimulado {
  id: string;
  data: string;
  questoes: RespostaQuestao[];
  total_questoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  nota_tri?: number;
}

// ============================================================================
// TIPOS PARA API DE EXPLICAÇÕES
// ============================================================================

export interface ExplicarRequest {
  questao_id: number;
  resposta_usuario: string;
  resposta_correta?: string;
  enunciado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
  contexto_adicional?: string | null;
}

export interface ExplicacaoResponse {
  ok: boolean;
  explicacao: string;
  questao_id: number;
  cached?: boolean;
  tempo_processamento: number;
  modelo_usado: string;
  timestamp: string;
  resposta_era_correta?: boolean | null;
  nivel_confianca?: string | null;
}

export interface ReexplicarRequest {
  questao_id: number;
  resposta_usuario: string;
  resposta_correta?: string;
  explicacao_anterior?: string | null;
  duvida_especifica?: string | null;
  tentativa_numero?: number;
  nivel_escolar?: 'fundamental' | 'medio' | 'superior';
}

export interface ReexplicacaoResponse {
  ok: boolean;
  explicacao: string;
  questao_id: number;
  nivel_simplificacao: 'normal' | 'simples' | 'muito_simples' | 'eli5';
  tentativa_numero: number;
  sugestoes_estudo: string[];
  recursos_adicionais: string[];
  tempo_processamento: number;
  modelo_usado: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

// ============================================================================
// TIPOS PARA COMPONENTE TUTOR
// ============================================================================

export interface MensagemChat {
  tipo: 'explicar' | 'reexplicar' | 'duvida_usuario';
  texto: string;
  tentativa?: number;
  timestamp: Date;
  nivel_simplificacao?: string;
  sugestoes?: string[];
  recursos?: string[];
}
