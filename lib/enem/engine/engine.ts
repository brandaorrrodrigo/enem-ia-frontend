/**
 * NFC_ENEM_ENGINE - Motor de Decisão
 *
 * Processa eventos do aluno e decide qual módulo ativar,
 * gerando ações, feedback e eventos de gamificação
 */

import { ENGINE_MODULES, getModulesByTrigger } from './modules';
import {
  EngineEvent,
  EngineEventType,
  EngineResponse,
  StudentState,
  EngineModule,
  GamificationPayload,
  EngineAction,
  EngineActionType,
  NivelEmocional,
  DEFAULT_ENGINE_CONFIG,
  EngineConfig,
} from './types';

// ============================================================
// STORAGE SIMPLES EM MEMÓRIA (substituir por DB depois)
// ============================================================

const studentStates: Map<string, StudentState> = new Map();

/**
 * Obtém o estado do aluno do storage
 */
export function getStudentState(alunoId: string): StudentState | null {
  return studentStates.get(alunoId) || null;
}

/**
 * Salva o estado do aluno no storage
 */
export function saveStudentState(state: StudentState): void {
  studentStates.set(state.alunoId, state);
}

/**
 * Remove estado do aluno (para testes)
 */
export function clearStudentState(alunoId: string): void {
  studentStates.delete(alunoId);
}

// ============================================================
// FUNÇÕES DE ESTADO INICIAL
// ============================================================

/**
 * Cria estado inicial para um novo aluno
 */
export function getInitialState(alunoId: string): StudentState {
  return {
    alunoId,
    progressoConteudos: {
      matematica: 0,
      linguagens: 0,
      humanas: 0,
      natureza: 0,
      redacao: 0,
    },
    errosRecentes: [],
    acertosRecentes: [],
    tempoPorQuestao: {
      matematica: 180,
      linguagens: 120,
      humanas: 120,
      natureza: 150,
      redacao: 0,
    },
    nivelEmocional: {
      stress: 30,
      motivacao: 70,
      confianca: 60,
    },
    modulosAcionados: [],
    contagemModulos: {},
    rotinaSemanal: {},
    atualizadoEm: new Date().toISOString(),
    sessoesHoje: 0,
    streakAtual: 0,
    errosEstruturais: [],
  };
}

// ============================================================
// MAPEAMENTO DE EVENTO PARA GATILHOS
// ============================================================

/**
 * Mapeia tipo de evento para gatilhos correspondentes
 */
function mapEventToTriggers(event: EngineEvent): string[] {
  const triggers: string[] = [event.tipo];

  // Adicionar gatilhos secundários baseado no contexto
  if (event.tipo === 'erro' && event.dados?.repetido) {
    triggers.push('erro_repetido');
  }

  if (event.tipo === 'erro' && event.dados?.estrutural) {
    triggers.push('erro_repetido');
  }

  if (event.dados?.tempoGasto && Number(event.dados.tempoGasto) > 240) {
    triggers.push('tempo_excessivo');
  }

  if (event.dados?.pedidoAjuda) {
    triggers.push('pedido_ajuda');
  }

  if (event.dados?.conteudoDificil) {
    triggers.push('conteudo_dificil');
  }

  return [...new Set(triggers)]; // Remove duplicatas
}

// ============================================================
// SELEÇÃO DE MÓDULOS CANDIDATOS
// ============================================================

/**
 * Obtém módulos candidatos baseado no tipo de evento
 */
function getCandidateModules(event: EngineEvent): EngineModule[] {
  const triggers = mapEventToTriggers(event);
  const candidateSet = new Set<EngineModule>();

  // Buscar módulos por cada gatilho
  for (const trigger of triggers) {
    const modules = getModulesByTrigger(trigger);
    modules.forEach(m => candidateSet.add(m));
  }

  // Se não encontrou nenhum, usar heurística por tipo de evento
  if (candidateSet.size === 0) {
    const fallbackModules = getFallbackModules(event.tipo);
    fallbackModules.forEach(m => candidateSet.add(m));
  }

  return Array.from(candidateSet);
}

/**
 * Módulos fallback baseados no tipo de evento
 */
function getFallbackModules(tipo: EngineEventType): EngineModule[] {
  switch (tipo) {
    case 'erro':
    case 'erro_repetido':
      // Priorizar MEMORY e STRATEGY
      return ENGINE_MODULES.filter(m =>
        m.tipo === 'MEMORY' || m.tipo === 'STRATEGY'
      ).slice(0, 5);

    case 'ansiedade':
    case 'travamento':
    case 'frustração':
      // Priorizar EMOTIONAL
      return ENGINE_MODULES.filter(m => m.tipo === 'EMOTIONAL').slice(0, 5);

    case 'queda_de_rendimento':
      // EMOTIONAL + ORGANIZATION
      return ENGINE_MODULES.filter(m =>
        m.tipo === 'EMOTIONAL' || m.tipo === 'ORGANIZATION'
      ).slice(0, 5);

    case 'tempo_excessivo':
      // STRATEGY + ORGANIZATION
      return ENGINE_MODULES.filter(m =>
        m.tipo === 'STRATEGY' || m.tipo === 'ORGANIZATION'
      ).slice(0, 5);

    case 'inicio_sessao':
    case 'fim_sessao':
      // ORGANIZATION + EMOTIONAL
      return ENGINE_MODULES.filter(m =>
        m.tipo === 'ORGANIZATION' || m.tipo === 'EMOTIONAL'
      ).slice(0, 5);

    default:
      // Módulos de alta prioridade
      return ENGINE_MODULES.filter(m => m.prioridade >= 7).slice(0, 5);
  }
}

// ============================================================
// SCORING DE MÓDULOS
// ============================================================

/**
 * Calcula score de um módulo para o evento dado
 */
function scoreModuleForEvent(
  modulo: EngineModule,
  event: EngineEvent,
  state: StudentState | null,
  config: EngineConfig = DEFAULT_ENGINE_CONFIG
): number {
  let score = 0;

  // Base: prioridade do módulo (1-10)
  score += modulo.prioridade * config.pesoprioridade;

  // Bonus por match direto de gatilho
  const triggers = mapEventToTriggers(event);
  for (const trigger of triggers) {
    if (modulo.gatilhos.includes(trigger)) {
      score += config.pesoGatilho;
    }
  }

  // Bonus por alinhamento de tipo
  const typeAlignment = getTypeAlignment(modulo.tipo, event.tipo);
  score += typeAlignment * 2;

  // Bonus por área alvo (se matéria especificada)
  if (event.materia) {
    if (modulo.areasAlvo.includes('all') || modulo.areasAlvo.includes(event.materia)) {
      score += 2;
    }
  }

  // Penalidade por repetição excessiva
  if (state) {
    const activationCount = state.contagemModulos[modulo.id] || 0;
    if (activationCount > 0) {
      score -= activationCount * config.penalidadeRepeticao;
    }

    // Bonus se módulo é relevante para erros estruturais
    if (state.errosEstruturais.length > 0 && modulo.tipo === 'MEMORY') {
      score += 2;
    }

    // Ajuste baseado em estado emocional
    if (state.nivelEmocional.stress > 70 && modulo.tipo === 'EMOTIONAL') {
      score += 3;
    }

    if (state.nivelEmocional.confianca < 40 && modulo.tipo === 'EMOTIONAL') {
      score += 2;
    }
  }

  return Math.max(0, score);
}

/**
 * Calcula alinhamento entre tipo do módulo e tipo do evento
 */
function getTypeAlignment(moduloTipo: string, eventoTipo: EngineEventType): number {
  const alignments: Record<string, EngineEventType[]> = {
    MEMORY: ['erro', 'erro_repetido', 'revisao_devida', 'bloco_completo'],
    STRATEGY: ['erro', 'erro_repetido', 'tempo_excessivo', 'conteudo_dificil'],
    EMOTIONAL: ['ansiedade', 'frustração', 'travamento', 'baixa_confiança', 'queda_de_rendimento'],
    ORGANIZATION: ['inicio_sessao', 'fim_sessao', 'procrastinação', 'inatividade_longa'],
    PRODUCTIVITY: ['inicio_sessao', 'procrastinação', 'inatividade_longa'],
    HIGH_PERFORMANCE: ['erro_repetido', 'queda_de_rendimento'],
    LINGUAGENS: ['erro', 'conteudo_dificil', 'tempo_excessivo'],
    REDACAO: ['pedido_ajuda', 'conteudo_dificil'],
  };

  const alignedEvents = alignments[moduloTipo] || [];
  return alignedEvents.includes(eventoTipo) ? 3 : 0;
}

// ============================================================
// GERAÇÃO DE AÇÕES
// ============================================================

/**
 * Gera ações baseadas no módulo selecionado e evento
 */
function generateActions(
  modulo: EngineModule,
  event: EngineEvent,
  state: StudentState
): EngineAction[] {
  const actions: EngineAction[] = [];

  // Mapear ações do módulo para EngineAction
  for (const acaoRetorno of modulo.acoesRetorno) {
    const action = mapModuleActionToEngineAction(acaoRetorno, modulo, event, state);
    if (action) {
      actions.push(action);
    }
  }

  // Se não gerou ações, criar uma mensagem padrão
  if (actions.length === 0) {
    actions.push({
      tipo: 'mostrar_mensagem',
      titulo: modulo.nome,
      mensagem: modulo.objetivo,
      prioridade: 'media',
    });
  }

  return actions;
}

/**
 * Converte ação do módulo para EngineAction
 */
function mapModuleActionToEngineAction(
  acaoModulo: string,
  modulo: EngineModule,
  event: EngineEvent,
  state: StudentState
): EngineAction | null {
  switch (acaoModulo) {
    case 'mostrar_mensagem':
      return {
        tipo: 'mostrar_mensagem',
        titulo: modulo.nome,
        mensagem: generateMessage(modulo, event, state),
        prioridade: 'alta',
      };

    case 'gerar_drill':
      return {
        tipo: 'gerar_drill',
        titulo: `Drill: ${modulo.nome}`,
        mensagem: 'Pratique com questões focadas no seu ponto de melhoria',
        conteudo: {
          moduloId: modulo.id,
          materia: event.materia,
          algoritmo: modulo.algoritmo,
        },
        prioridade: 'alta',
      };

    case 'gerar_mapa_mental':
      return {
        tipo: 'gerar_mapa_mental',
        titulo: 'Mapa Mental',
        mensagem: 'Visualize as conexões do conteúdo',
        conteudo: {
          moduloId: modulo.id,
          materia: event.materia,
        },
        prioridade: 'media',
      };

    case 'sugerir_revisao':
      return {
        tipo: 'sugerir_revisao',
        titulo: 'Revisão Recomendada',
        mensagem: 'É hora de revisar este conteúdo para fixar na memória',
        conteudo: {
          ciclo: '1-24-7',
          materia: event.materia,
        },
        prioridade: 'media',
      };

    case 'sugerir_pausa':
      return {
        tipo: 'sugerir_pausa',
        titulo: 'Pausa Estratégica',
        mensagem: 'Uma pausa de 5 minutos vai ajudar seu foco',
        conteudo: {
          duracao: 5,
          atividade: 'alongar, beber água, respirar',
        },
        prioridade: 'alta',
      };

    case 'ajustar_rotina':
      return {
        tipo: 'ajustar_rotina',
        titulo: 'Ajuste de Rotina',
        mensagem: 'Vamos reorganizar seu plano de estudos',
        conteudo: {
          baseadoEm: event.tipo,
        },
        prioridade: 'media',
      };

    case 'ativar_respiracao':
      return {
        tipo: 'ativar_respiracao',
        titulo: 'Técnica de Respiração 4-2-6',
        mensagem: 'Inspire 4s, segure 2s, expire 6s. Repita 3 vezes.',
        conteudo: {
          padrao: '4-2-6',
          ciclos: 3,
        },
        prioridade: 'alta',
      };

    case 'apresentar_questao_facil':
      return {
        tipo: 'apresentar_questao_facil',
        titulo: 'Questão de Aquecimento',
        mensagem: 'Vamos reconstruir sua confiança com uma questão mais acessível',
        conteudo: {
          dificuldade: 'facil',
          materia: event.materia,
        },
        prioridade: 'alta',
      };

    case 'criar_flashcards':
      return {
        tipo: 'criar_flashcards',
        titulo: 'Flashcards Criados',
        mensagem: 'Criamos flashcards baseados nos seus pontos de melhoria',
        conteudo: {
          baseadoEm: 'erros_recentes',
        },
        prioridade: 'media',
      };

    case 'agendar_revisao':
      return {
        tipo: 'agendar_revisao',
        titulo: 'Revisão Agendada',
        mensagem: 'Agendamos uma revisão para fixar este conteúdo',
        conteudo: {
          ciclo: '1-24-7',
        },
        prioridade: 'baixa',
      };

    case 'mostrar_progresso':
      return {
        tipo: 'mostrar_progresso',
        titulo: 'Seu Progresso',
        mensagem: generateProgressMessage(state),
        prioridade: 'media',
      };

    case 'reforçar_identidade':
      return {
        tipo: 'reforçar_identidade',
        titulo: 'Lembre-se',
        mensagem: 'Você é o tipo de pessoa que não desiste. Continue!',
        prioridade: 'alta',
      };

    case 'simplificar_conteudo':
      return {
        tipo: 'simplificar_conteudo',
        titulo: 'Versão Simplificada',
        mensagem: 'Vamos ver isso de uma forma mais simples',
        conteudo: {
          nivel: 'basico',
        },
        prioridade: 'alta',
      };

    default:
      return null;
  }
}

/**
 * Gera mensagem personalizada baseada no contexto
 */
function generateMessage(
  modulo: EngineModule,
  event: EngineEvent,
  state: StudentState
): string {
  const baseMessages: Record<string, string[]> = {
    EMOTIONAL: [
      'Percebemos que você pode estar passando por um momento difícil. Vamos trabalhar juntos!',
      'É normal sentir isso. O importante é continuar, um passo de cada vez.',
      'Seu bem-estar é nossa prioridade. Vamos fazer uma pausa estratégica?',
    ],
    MEMORY: [
      'Vamos usar uma técnica que vai ajudar esse conteúdo a ficar na sua memória de longo prazo.',
      'Memorização não é só repetição. Vamos usar estratégias inteligentes!',
      'Seu cérebro adora conexões. Vamos criar algumas agora.',
    ],
    STRATEGY: [
      'Existe um jeito mais esperto de resolver isso. Deixa eu te mostrar.',
      'Questões do ENEM têm padrões. Vamos identificá-los juntos.',
      'Às vezes, a resposta está nas alternativas. Vamos analisar!',
    ],
    ORGANIZATION: [
      'Organização é metade do caminho para o sucesso. Vamos planejar!',
      'Um bom planejamento evita estresse. Vamos ajustar sua rotina.',
      'Cada dia bem planejado te aproxima da aprovação.',
    ],
    PRODUCTIVITY: [
      'Foco é como um músculo. Vamos fortalecê-lo!',
      'Pequenos blocos de estudo consistentes vencem maratonas.',
      'Vamos eliminar as barreiras que te impedem de começar.',
    ],
    HIGH_PERFORMANCE: [
      'Erros são oportunidades de crescimento. Vamos transformá-los em força!',
      'Alta performance vem de consistência, não de perfeição.',
      'Você está construindo sua versão mais preparada.',
    ],
    LINGUAGENS: [
      'Interpretação de texto é uma habilidade. Vamos refiná-la!',
      'O segredo está em ler com estratégia, não com pressa.',
      'Vamos dominar as estruturas que o ENEM mais cobra.',
    ],
    REDACAO: [
      'Uma redação nota 1000 é construída passo a passo. Vamos lá!',
      'Estrutura + Repertório + Proposta = Sucesso na redação.',
      'Cada competência dominada te aproxima do 1000.',
    ],
  };

  const messages = baseMessages[modulo.tipo] || [modulo.objetivo];
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Gera mensagem de progresso
 */
function generateProgressMessage(state: StudentState): string {
  const totalProgress = Object.values(state.progressoConteudos).reduce((a, b) => a + b, 0);
  const avgProgress = totalProgress / Object.keys(state.progressoConteudos).length;

  if (avgProgress >= 70) {
    return `Excelente! Você está com ${avgProgress.toFixed(0)}% de progresso médio. Continue assim!`;
  } else if (avgProgress >= 40) {
    return `Bom progresso! ${avgProgress.toFixed(0)}% do caminho percorrido. Mantenha a consistência!`;
  } else {
    return `Você está no início da jornada com ${avgProgress.toFixed(0)}%. Cada dia conta!`;
  }
}

// ============================================================
// GAMIFICAÇÃO
// ============================================================

/**
 * Constrói payload de gamificação baseado no evento e módulo
 */
function buildGamificationPayload(
  event: EngineEvent,
  modulo: EngineModule,
  state: StudentState
): GamificationPayload {
  let FP = 0;
  let moedas = 0;
  const missoesConcluidas: string[] = [];
  let badge: string | undefined;

  // FP baseado no tipo de evento
  switch (event.tipo) {
    case 'erro':
      FP = 5; // Errou mas continua tentando
      break;
    case 'erro_repetido':
      FP = 3; // Persistência mesmo com dificuldade
      break;
    case 'acerto':
      FP = 10;
      moedas = 2;
      break;
    case 'inicio_sessao':
      FP = 5;
      moedas = 1;
      break;
    case 'fim_sessao':
      FP = 10;
      moedas = 3;
      break;
    case 'bloco_completo':
      FP = 20;
      moedas = 5;
      break;
    default:
      FP = 2;
  }

  // Bonus por tipo de módulo
  if (modulo.tipo === 'EMOTIONAL') {
    FP += 5; // Cuidar da saúde mental vale extra
  }

  // Verificar badges
  const activationCount = (state.contagemModulos[modulo.id] || 0) + 1;
  if (activationCount === 10) {
    badge = `${modulo.id}_expert`;
  }

  // Verificar streak
  if (state.streakAtual >= 7 && event.tipo === 'inicio_sessao') {
    FP += 10;
    if (state.streakAtual === 7) {
      badge = 'weekly_warrior';
    }
  }

  return {
    FP,
    moedas,
    missoesConcluidas,
    badge,
    descricao: `Módulo ${modulo.nome} ativado`,
  };
}

// ============================================================
// ATUALIZAÇÃO DE ESTADO
// ============================================================

/**
 * Atualiza o estado do aluno após processamento
 */
function updateStudentState(
  state: StudentState,
  event: EngineEvent,
  modulo: EngineModule,
  gamification: GamificationPayload
): StudentState {
  const newState = { ...state };

  // Atualizar timestamp
  newState.atualizadoEm = new Date().toISOString();

  // Atualizar módulos acionados
  if (!newState.modulosAcionados.includes(modulo.id)) {
    newState.modulosAcionados = [...newState.modulosAcionados, modulo.id];
  }

  // Atualizar contagem de módulos
  newState.contagemModulos = {
    ...newState.contagemModulos,
    [modulo.id]: (newState.contagemModulos[modulo.id] || 0) + 1,
  };

  // Atualizar eventos recentes
  if (event.tipo === 'erro' || event.tipo === 'erro_repetido') {
    newState.errosRecentes = [...newState.errosRecentes.slice(-9), event];

    // Verificar se é erro estrutural
    if (event.dados?.estrutural && event.materia) {
      const errorKey = `${event.materia}:${event.dados.topico || 'geral'}`;
      if (!newState.errosEstruturais.includes(errorKey)) {
        newState.errosEstruturais = [...newState.errosEstruturais, errorKey];
      }
    }
  } else if (event.tipo === 'acerto') {
    newState.acertosRecentes = [...newState.acertosRecentes.slice(-9), event];
  }

  // Atualizar nível emocional baseado no tipo de módulo
  if (modulo.tipo === 'EMOTIONAL') {
    newState.nivelEmocional = {
      stress: Math.max(0, newState.nivelEmocional.stress - 10),
      motivacao: Math.min(100, newState.nivelEmocional.motivacao + 5),
      confianca: Math.min(100, newState.nivelEmocional.confianca + 5),
    };
  }

  // Ajustar stress baseado em erros
  if (event.tipo === 'erro_repetido') {
    newState.nivelEmocional.stress = Math.min(100, newState.nivelEmocional.stress + 5);
    newState.nivelEmocional.confianca = Math.max(0, newState.nivelEmocional.confianca - 3);
  }

  // Ajustar motivação em acertos
  if (event.tipo === 'acerto') {
    newState.nivelEmocional.motivacao = Math.min(100, newState.nivelEmocional.motivacao + 3);
    newState.nivelEmocional.confianca = Math.min(100, newState.nivelEmocional.confianca + 2);
  }

  // Atualizar sessões hoje
  if (event.tipo === 'inicio_sessao') {
    newState.sessoesHoje += 1;
  }

  return newState;
}

// ============================================================
// FUNÇÃO PRINCIPAL DO ENGINE
// ============================================================

/**
 * Processa um evento e retorna a resposta do engine
 *
 * @param event - Evento do aluno
 * @param state - Estado atual do aluno (opcional, busca do storage se não fornecido)
 * @param config - Configuração do engine (opcional)
 * @returns Resposta com módulo ativado, ações, gamificação e novo estado
 */
export async function processEvent(
  event: EngineEvent,
  state: StudentState | null = null,
  config: EngineConfig = DEFAULT_ENGINE_CONFIG
): Promise<EngineResponse> {
  // 1) Garantir timestamp no evento
  if (!event.timestamp) {
    event.timestamp = new Date().toISOString();
  }

  // 2) Obter ou criar estado do aluno
  let currentState = state;
  if (!currentState) {
    currentState = getStudentState(event.alunoId);
  }
  if (!currentState) {
    currentState = getInitialState(event.alunoId);
  }

  // 3) Obter módulos candidatos
  const candidates = getCandidateModules(event);

  if (candidates.length === 0) {
    // Nenhum módulo encontrado - retornar resposta vazia
    return {
      acoes: [{
        tipo: 'mostrar_mensagem',
        titulo: 'Continuando',
        mensagem: 'Continue estudando! Estamos monitorando seu progresso.',
        prioridade: 'baixa',
      }],
      processadoEm: new Date().toISOString(),
    };
  }

  // 4) Calcular score de cada candidato
  const scoredCandidates = candidates.map(modulo => ({
    modulo,
    score: scoreModuleForEvent(modulo, event, currentState, config),
  }));

  // 5) Ordenar por score (maior primeiro) e selecionar o melhor
  scoredCandidates.sort((a, b) => b.score - a.score);
  const selectedModule = scoredCandidates[0].modulo;
  const selectedScore = scoredCandidates[0].score;

  // 6) Gerar ações
  const actions = generateActions(selectedModule, event, currentState);

  // 7) Construir payload de gamificação
  const gamification = buildGamificationPayload(event, selectedModule, currentState);

  // 8) Atualizar estado do aluno
  const newState = updateStudentState(currentState, event, selectedModule, gamification);

  // 9) Persistir novo estado
  saveStudentState(newState);

  // 10) Montar e retornar resposta
  return {
    moduloId: selectedModule.id,
    moduloNome: selectedModule.nome,
    moduloTipo: selectedModule.tipo,
    moduloObjetivo: selectedModule.objetivo,
    acoes: actions,
    gamificacao: gamification,
    novoEstado: newState,
    razaoAtivacao: `Gatilhos detectados: ${mapEventToTriggers(event).join(', ')}`,
    scoreModulo: selectedScore,
    processadoEm: new Date().toISOString(),
  };
}

// ============================================================
// EXPORTS ADICIONAIS
// ============================================================

export {
  getCandidateModules,
  scoreModuleForEvent,
  buildGamificationPayload,
  mapEventToTriggers,
};
