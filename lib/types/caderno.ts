// lib/types/caderno.ts
// Tipos para o sistema de cadernos da biblioteca ENEM PRO

export interface CadernoQuestao {
  id: string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  tags?: string[];
}

export interface CadernoModulo {
  id: string;
  titulo: string;
  resumo: string;
  topicos: string[];
  exemplos?: string[];
  dicas?: string[];
  formula?: string;
  html?: string; // Conteudo HTML rico (opcional)
  questoes?: CadernoQuestao[];
}

export interface CadernoData {
  id: string;
  slug: string;
  titulo: string;
  categoria: 'linguagens' | 'humanas' | 'natureza' | 'matematica' | 'redacao';
  nivel: 'Basico' | 'Intermediario' | 'Avancado';
  descricao: string;
  icone: string;
  cor: string;
  tempoEstimado: string;
  fpRecompensa: number;
  tags: string[];
  modulos: CadernoModulo[];
  // Conteudo HTML completo (opcional - para cadernos com muito conteudo)
  htmlCompleto?: string;
}

export interface CadernoResponse {
  success: boolean;
  data?: CadernoData;
  error?: string;
}

export interface CadernoListResponse {
  success: boolean;
  data?: CadernoData[];
  error?: string;
}

export interface CadernoProgresso {
  cadernoId: string;
  modulosConcluidos: string[];
  questoesRespondidas: { questaoId: string; correta: boolean; data: string }[];
  progresso: number; // 0-100
  ultimoAcesso: string;
}

// Categorias disponiveis
export const CATEGORIAS_CADERNO = [
  { id: 'todos', nome: 'Todos', emoji: '📚', cor: 'from-purple-500 to-pink-500' },
  { id: 'linguagens', nome: 'Linguagens', emoji: '📖', cor: 'from-blue-500 to-cyan-500' },
  { id: 'humanas', nome: 'Humanas', emoji: '🌍', cor: 'from-orange-500 to-red-500' },
  { id: 'natureza', nome: 'Natureza', emoji: '🔬', cor: 'from-green-500 to-emerald-500' },
  { id: 'matematica', nome: 'Matematica', emoji: '📐', cor: 'from-yellow-500 to-orange-500' },
  { id: 'redacao', nome: 'Redacao', emoji: '✍️', cor: 'from-pink-500 to-rose-500' },
] as const;

export type CategoriaId = typeof CATEGORIAS_CADERNO[number]['id'];
