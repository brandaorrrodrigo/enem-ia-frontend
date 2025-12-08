/**
 * ENEM PRO - Constantes da Moeda FP
 *
 * NOTA INTERNA (DESENVOLVEDORES):
 * FP é uma homenagem interna e seu significado real
 * nunca deve ser revelado no aplicativo.
 */

// Nome público da moeda (único permitido no front-end)
export const FP_BASE_NAME = 'FP';

// Significado secreto - APENAS para código interno/documentação dev
// NUNCA expor para usuários
export const FP_SECRET_MEANING = 'Fernanda, a Princesa';

// Significado público - sempre null (não expandir a sigla)
export const FP_PUBLIC_MEANING = null;

// Descrição pública padrão quando precisar explicar a moeda
export const FP_PUBLIC_DESCRIPTION = 'FP é a moeda oficial do ENEM PRO.';

// Ícone padrão
export const FP_ICON = '⭐';

// Cores padrão
export const FP_COLORS = {
  primary: '#fbbf24',    // Amarelo dourado
  secondary: '#f59e0b',  // Âmbar
  glow: 'rgba(251, 191, 36, 0.4)',
} as const;

/**
 * Formata um valor de FP para exibição
 * @param value - Quantidade de FP
 * @returns String formatada (ex: "1.500 FP")
 */
export function formatFP(value: number): string {
  return `${value.toLocaleString('pt-BR')} FP`;
}

/**
 * Formata FP de forma compacta para valores grandes
 * @param value - Quantidade de FP
 * @returns String compacta (ex: "1.5K FP")
 */
export function formatFPCompact(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M FP`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K FP`;
  }
  return `${value} FP`;
}
