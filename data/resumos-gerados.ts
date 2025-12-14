/**
 * RESUMOS AUTOMÁTICOS - GERADOS A PARTIR DOS ARQUIVOS TXT
 * Total de 0 resumos
 */

export interface Resumo {
  id: string;
  titulo: string;
  tipo: 'resumo';
  disciplina: string;
  disciplinaSlug: string;
  tema: string;
  slug: string;
  descricao: string;
  conteudo: string;
  icone: string;
  downloads: number;
  premium: boolean;
}

export const RESUMOS: Resumo[] = [];

export default RESUMOS;
