/**
 * Configurações do Sistema de Conquistas ENEM-IA
 *
 * Controla quando e como os popups de conquista aparecem
 *
 * Para desabilitar conquistas: Mude enableAchievements para false
 * Para customizar critérios: Ajuste as funções em achievementCriteria
 */

export interface AchievementConfig {
  /** Habilita/desabilita sistema de conquistas globalmente */
  enableAchievements: boolean;

  /** Delay em ms antes de mostrar o popup (para melhor UX) */
  popupDelay: number;

  /** Duração da animação de confetes em ms */
  confettiDuration: number;

  /** Nota mínima para conquistar "Primeira Aprovação" */
  minNotaPrimeiraAprovacao: number;

  /** Critérios para exibir popup de conquista */
  achievementCriteria: {
    /** Exibe quando passar na nota de corte */
    exibirAoPassarNotaCorte: boolean;

    /** Exibe quando atingir meta pessoal (se configurada) */
    exibirAoAtingirMeta: boolean;

    /** Exibe na primeira vez que alcança X pontos */
    exibirPrimeiraVezAcimaDe: {
      enabled: boolean;
      notaMinima: number;
    };

    /** Exibe ao completar streak de simulados */
    exibirStreakSimulados: {
      enabled: boolean;
      minimosimulados: number;
    };

    /** Exibe ao atingir nota perfeita */
    exibirNotaPerfeita: {
      enabled: boolean;
      notaMinima: number; // Ex: 950+
    };
  };

  /** Compartilhamento social */
  sharing: {
    /** Habilita botão WhatsApp */
    enableWhatsApp: boolean;

    /** Habilita botão Instagram */
    enableInstagram: boolean;

    /** Habilita botão TikTok */
    enableTikTok: boolean;

    /** Texto base para compartilhamento (pode usar variáveis: {nota}, {meta}, {acertos}, {total}) */
    textTemplate: string;

    /** Hashtags padrão */
    hashtags: {
      instagram: string[];
      tiktok: string[];
    };
  };
}

/**
 * Configuração padrão do sistema de conquistas
 *
 * CUSTOMIZAÇÃO:
 * - Para desabilitar conquistas: enableAchievements = false
 * - Para mudar critérios: ajuste achievementCriteria
 * - Para mudar textos: ajuste sharing.textTemplate
 */
export const defaultAchievementConfig: AchievementConfig = {
  // ============================================================================
  // CONTROLE GERAL
  // ============================================================================
  enableAchievements: true, // Mude para false para desabilitar completamente

  popupDelay: 500, // 500ms delay para melhor UX

  confettiDuration: 3000, // 3 segundos de confetes

  minNotaPrimeiraAprovacao: 600,

  // ============================================================================
  // CRITÉRIOS DE CONQUISTA
  // ============================================================================
  achievementCriteria: {
    // Popup quando passar na nota de corte
    exibirAoPassarNotaCorte: true,

    // Popup quando atingir meta pessoal
    exibirAoAtingirMeta: true,

    // Popup na primeira vez acima de X pontos
    exibirPrimeiraVezAcimaDe: {
      enabled: true,
      notaMinima: 700,
    },

    // Popup ao completar streak (ex: 5 simulados seguidos)
    exibirStreakSimulados: {
      enabled: false, // Desabilitado por padrão (requer tracking)
      minimosimulados: 5,
    },

    // Popup ao atingir nota quase perfeita
    exibirNotaPerfeita: {
      enabled: true,
      notaMinima: 950,
    },
  },

  // ============================================================================
  // COMPARTILHAMENTO SOCIAL
  // ============================================================================
  sharing: {
    enableWhatsApp: true,
    enableInstagram: true,
    enableTikTok: true,

    // Template de texto (variáveis: {nota}, {meta}, {acertos}, {total}, {porcentagem}, {diferenca})
    textTemplate: `🔥 Acabei de fazer um simulado ENEM e BATEU A META!

📊 Minha nota: {nota}/1000
🎯 Meta: {meta}
✅ Acertos: {acertos}/{total} ({porcentagem}%)
💪 Diferença: +{diferenca} pontos!

Estude comigo no ENEM-IA! 🚀`,

    hashtags: {
      instagram: ['ENEMIA', 'SimuladoENEM', 'ENEM2025', 'Estudos', 'Aprovacao', 'Vestibular'],
      tiktok: ['ENEMIA', 'SimuladoENEM', 'ENEM2025', 'FYP', 'Estudos', 'Aprovacao'],
    },
  },
};

/**
 * Obtém configuração de conquistas
 *
 * Pode ser estendido no futuro para ler de localStorage, API, etc.
 */
export function getAchievementConfig(): AchievementConfig {
  // TODO: Ler de localStorage ou API se configurado
  // Por enquanto, retorna config padrão
  return defaultAchievementConfig;
}

/**
 * Verifica se deve exibir popup de conquista
 *
 * @param nota Nota do simulado
 * @param notaReferencia Nota de corte ou meta
 * @param passou Se passou na comparação
 * @param tipoReferencia Tipo de referência ('nota_corte' | 'meta_pessoal')
 * @returns true se deve exibir popup
 */
export function deveExibirPopupConquista(
  nota: number,
  notaReferencia: number | null,
  passou: boolean,
  tipoReferencia: 'nota_corte' | 'meta_pessoal'
): boolean {
  const config = getAchievementConfig();

  // Se conquistas desabilitadas, não exibe
  if (!config.enableAchievements) {
    return false;
  }

  // Não exibe se não passou
  if (!passou || !notaReferencia) {
    return false;
  }

  // Verifica critérios específicos
  if (tipoReferencia === 'nota_corte' && !config.achievementCriteria.exibirAoPassarNotaCorte) {
    return false;
  }

  if (tipoReferencia === 'meta_pessoal' && !config.achievementCriteria.exibirAoAtingirMeta) {
    return false;
  }

  // Critério de nota perfeita
  if (
    config.achievementCriteria.exibirNotaPerfeita.enabled &&
    nota >= config.achievementCriteria.exibirNotaPerfeita.notaMinima
  ) {
    return true;
  }

  // Critério de primeira vez acima de X
  if (
    config.achievementCriteria.exibirPrimeiraVezAcimaDe.enabled &&
    nota >= config.achievementCriteria.exibirPrimeiraVezAcimaDe.notaMinima
  ) {
    // TODO: Verificar se é primeira vez (requer localStorage/API)
    // Por enquanto, sempre retorna true se nota >= mínima
    return true;
  }

  // Se chegou aqui e passou, exibe
  return passou;
}

/**
 * Formata texto de compartilhamento substituindo variáveis
 */
export function formatarTextoCompartilhamento(
  nota: number,
  notaReferencia: number,
  acertos: number,
  total: number,
  porcentagem: number,
  labelReferencia: string
): string {
  const config = getAchievementConfig();
  const diferenca = Math.round(nota - notaReferencia);

  return config.sharing.textTemplate
    .replace('{nota}', nota.toString())
    .replace('{meta}', `${notaReferencia} (${labelReferencia})`)
    .replace('{acertos}', acertos.toString())
    .replace('{total}', total.toString())
    .replace('{porcentagem}', porcentagem.toFixed(0))
    .replace('{diferenca}', diferenca.toString());
}
