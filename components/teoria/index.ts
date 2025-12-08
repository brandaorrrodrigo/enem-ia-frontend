/**
 * ENEM PRO - Componentes de Teoria
 *
 * Exporta todos os componentes usados nas páginas de teoria/conteúdo
 */

// Layout principal com lousa verde
export { default as LousaLayout } from './LousaLayout';

// Sidebar de navegação entre temas
export { default as TeoriaSidebar, temasMatematica, useTemasNavegacao } from './TeoriaSidebar';
export type { TemaItem } from './TeoriaSidebar';

// Componentes de conteúdo
export {
  default as QuestaoInterativa,
  CaixaExemplo,
  CaixaFormula,
  CaixaResumo,
  CaixaProfessor,
} from './QuestaoInterativa';
