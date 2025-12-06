import { UserStats, HistoricoSimulado, AreaFraca } from '../types';

// ========================================
// MODULO DE ESTATISTICAS
// ========================================

export function criarStatsInicial(): UserStats {
  return {
    totalQuestoes: 0,
    totalAcertos: 0,
    totalSimulados: 0,
    tempoTotalEstudo: 0,
    streakAtual: 0,
    melhorStreak: 0,
    ultimoAcesso: new Date().toISOString(),
    estatisticasPorArea: {},
    estatisticasPorDisciplina: {},
    estatisticasPorAssunto: {}
  };
}

export function carregarStats(): UserStats {
  if (typeof window === 'undefined') return criarStatsInicial();
  const statsStr = localStorage.getItem('user_stats');
  if (statsStr) return JSON.parse(statsStr);
  return criarStatsInicial();
}

export function salvarStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user_stats', JSON.stringify(stats));
}

export function atualizarStatsComSimulado(
  stats: UserStats,
  resultado: { acertos: number; total: number; tempoMinutos: number; area: string; detalhes: any[] }
): UserStats {
  const novoStats = { ...stats };
  novoStats.totalQuestoes += resultado.total;
  novoStats.totalAcertos += resultado.acertos;
  novoStats.totalSimulados += 1;
  novoStats.tempoTotalEstudo += resultado.tempoMinutos;
  novoStats.ultimoAcesso = new Date().toISOString();

  resultado.detalhes.forEach(d => {
    // Por area
    if (!novoStats.estatisticasPorArea[d.area]) {
      novoStats.estatisticasPorArea[d.area] = { questoes: 0, acertos: 0, tempoMedio: 0 };
    }
    novoStats.estatisticasPorArea[d.area].questoes += 1;
    if (d.acertou) novoStats.estatisticasPorArea[d.area].acertos += 1;

    // Por disciplina
    if (d.disciplina) {
      if (!novoStats.estatisticasPorDisciplina[d.disciplina]) {
        novoStats.estatisticasPorDisciplina[d.disciplina] = { questoes: 0, acertos: 0 };
      }
      novoStats.estatisticasPorDisciplina[d.disciplina].questoes += 1;
      if (d.acertou) novoStats.estatisticasPorDisciplina[d.disciplina].acertos += 1;
    }

    // Por assunto
    if (d.assunto) {
      if (!novoStats.estatisticasPorAssunto[d.assunto]) {
        novoStats.estatisticasPorAssunto[d.assunto] = { questoes: 0, acertos: 0 };
      }
      novoStats.estatisticasPorAssunto[d.assunto].questoes += 1;
      if (d.acertou) novoStats.estatisticasPorAssunto[d.assunto].acertos += 1;
    }
  });

  return novoStats;
}

export function calcularTaxaAcerto(questoes: number, acertos: number): number {
  if (questoes === 0) return 0;
  return Math.round((acertos / questoes) * 100);
}

export function identificarAreassFracas(stats: UserStats, limiteMinimo: number = 5): AreaFraca[] {
  const areassFracas: AreaFraca[] = [];

  Object.entries(stats.estatisticasPorArea).forEach(([area, data]) => {
    if (data.questoes >= limiteMinimo) {
      const taxa = calcularTaxaAcerto(data.questoes, data.acertos);
      if (taxa < 50) {
        areassFracas.push({
          area,
          taxaAcerto: taxa,
          totalQuestoes: data.questoes,
          prioridade: taxa < 30 ? 'alta' : 'media'
        });
      }
    }
  });

  Object.entries(stats.estatisticasPorDisciplina).forEach(([disciplina, data]) => {
    if (data.questoes >= limiteMinimo) {
      const taxa = calcularTaxaAcerto(data.questoes, data.acertos);
      if (taxa < 50) {
        areassFracas.push({
          area: 'geral',
          disciplina,
          taxaAcerto: taxa,
          totalQuestoes: data.questoes,
          prioridade: taxa < 30 ? 'alta' : taxa < 40 ? 'media' : 'baixa'
        });
      }
    }
  });

  return areassFracas.sort((a, b) => a.taxaAcerto - b.taxaAcerto);
}

export function carregarHistorico(): HistoricoSimulado[] {
  if (typeof window === 'undefined') return [];
  const historicoStr = localStorage.getItem('historico_simulados');
  if (historicoStr) return JSON.parse(historicoStr);
  return [];
}

export function calcularMediaNotas(historico: HistoricoSimulado[]): number {
  if (historico.length === 0) return 0;
  const soma = historico.reduce((acc, h) => acc + h.nota, 0);
  return Math.round(soma / historico.length);
}

export function calcularEvolucao(historico: HistoricoSimulado[]): { data: string; nota: number }[] {
  return historico.slice(0, 10).reverse().map(h => ({
    data: new Date(h.data).toLocaleDateString('pt-BR'),
    nota: h.nota
  }));
}
