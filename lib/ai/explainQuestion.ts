// ========================================
// IA - EXPLICACAO DE QUESTOES (NOVO SISTEMA)
// ========================================

import { Questao, Area, Dificuldade } from '../questions/schema';

// ========================================
// TIPOS
// ========================================

export interface ExplicacaoQuestao {
  questaoId: string;
  explicacaoBasica: string;
  explicacaoDetalhada: string;
  conceitosPrincipais: string[];
  passosResolucao: string[];
  dicasEstudo: string[];
  errosComuns: string[];
  recursosRelacionados?: {
    tipo: 'video' | 'artigo' | 'exercicio';
    titulo: string;
    url?: string;
  }[];
  geradoPor: 'local' | 'openai' | 'ollama';
  timestamp: string;
}

export interface FeedbackResposta {
  acertou: boolean;
  respostaCorreta: string;
  respostaUsuario: string | null;
  explicacao: string;
  pontoForte?: string;
  pontoMelhoria?: string;
  proximoPasso: string;
  xpGanho?: number;
}

// ========================================
// BASE DE CONHECIMENTO
// ========================================

const CONCEITOS: Record<string, string[]> = {
  // Matemática
  'Equações do 1º Grau': ['Isolamento de variáveis', 'Operações inversas', 'Verificação de solução'],
  'Progressão Aritmética': ['Termo geral da PA', 'Razão', 'Soma dos termos'],
  'Porcentagem': ['Conversão decimal', 'Aumento e desconto', 'Juros simples e compostos'],
  'Perímetro e Área': ['Fórmulas de área', 'Unidades de medida', 'Decomposição de figuras'],
  'Triângulos': ['Teorema de Pitágoras', 'Semelhança', 'Área do triângulo'],
  'Probabilidade': ['Espaço amostral', 'Eventos favoráveis', 'Probabilidade condicional'],
  'Funções': ['Domínio e imagem', 'Gráficos', 'Função inversa'],
  'Sistemas Lineares': ['Método da substituição', 'Método da adição', 'Determinantes'],
  'Logaritmos': ['Definição', 'Propriedades', 'Mudança de base'],
  'Progressão Geométrica': ['Termo geral da PG', 'Razão', 'Soma dos termos'],

  // Linguagens
  'Figuras de Linguagem': ['Metáfora', 'Metonímia', 'Hipérbole', 'Ironia'],
  'Sintaxe': ['Sujeito e predicado', 'Transitividade', 'Período composto'],
  'Variações Linguísticas': ['Registro formal', 'Registro informal', 'Variação regional'],
  'Concordância': ['Concordância verbal', 'Concordância nominal', 'Casos especiais'],
  'Modernismo': ['Semana de 22', 'Primeira fase', 'Segunda fase'],
  'Realismo': ['Crítica social', 'Análise psicológica', 'Machado de Assis'],

  // Humanas
  'Brasil República': ['Proclamação', 'República Velha', 'Era Vargas'],
  'Filosofia Moderna': ['Racionalismo', 'Empirismo', 'Iluminismo'],
  'Biomas Brasileiros': ['Amazônia', 'Cerrado', 'Mata Atlântica'],
  'Clássicos': ['Durkheim', 'Weber', 'Marx'],
  'Era Vargas': ['Estado Novo', 'CLT', 'Nacionalismo'],
  'Ditadura Militar': ['AI-5', 'Milagre econômico', 'Abertura'],

  // Natureza
  'Citologia': ['Organelas', 'Membrana plasmática', 'Núcleo'],
  'Dinâmica': ['Leis de Newton', 'Força e aceleração', 'Atrito'],
  'pH': ['Escala de pH', 'Ácidos e bases', 'Indicadores'],
  'Genética': ['DNA e RNA', 'Leis de Mendel', 'Herança genética'],
  'Ecologia': ['Cadeia alimentar', 'Níveis tróficos', 'Ciclos biogeoquímicos'],
  'Eletricidade': ['Lei de Ohm', 'Circuitos', 'Potência elétrica'],
};

const DICAS_POR_AREA: Record<Area, string[]> = {
  'Matemática': [
    'Resolva a questão passo a passo, sem pular etapas',
    'Verifique se a resposta faz sentido no contexto',
    'Atenção às unidades de medida',
    'Faça um desenho ou esquema quando possível',
    'Identifique palavras-chave que indicam operações',
  ],
  'Linguagens': [
    'Leia o texto com atenção antes de ver as alternativas',
    'Identifique a ideia central e os argumentos',
    'Relacione com o contexto histórico/social',
    'Cuidado com alternativas muito absolutas',
    'Busque palavras-chave no enunciado',
  ],
  'Humanas': [
    'Contextualize os eventos historicamente',
    'Relacione causa e consequência',
    'Atenção a datas e períodos importantes',
    'Compare diferentes visões sobre o tema',
    'Use mapas mentais para relacionar conceitos',
  ],
  'Natureza': [
    'Entenda o conceito antes de aplicar fórmulas',
    'Relacione fenômenos com o cotidiano',
    'Atenção à conversão de unidades',
    'Identifique as variáveis do problema',
    'Desenhe diagramas para visualizar',
  ],
};

const ERROS_COMUNS: Record<string, string[]> = {
  'Equações do 1º Grau': [
    'Esquecer de inverter o sinal ao mudar termo de lado',
    'Não verificar a resposta na equação original',
  ],
  'Porcentagem': [
    'Confundir aumento com desconto',
    'Errar na conversão decimal',
  ],
  'Probabilidade': [
    'Confundir eventos independentes com dependentes',
    'Somar probabilidades quando deveria multiplicar',
  ],
  'Figuras de Linguagem': [
    'Confundir metáfora com comparação',
    'Não identificar ironia em contexto',
  ],
};

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

/**
 * Explica uma questão de forma detalhada
 */
export function explainQuestion(
  questao: Questao,
  alternativaEscolhida?: string
): ExplicacaoQuestao {
  const conceitos = CONCEITOS[questao.tema] || [
    `Conceitos fundamentais de ${questao.tema}`,
    `Aplicação em ${questao.disciplina}`,
  ];

  const dicas = DICAS_POR_AREA[questao.area] || DICAS_POR_AREA['Matemática'];

  const erros = ERROS_COMUNS[questao.tema] || [
    'Leitura apressada do enunciado',
    'Não verificar a resposta final',
  ];

  const passos = gerarPassosResolucao(questao.area);

  // Montar explicação detalhada
  let explicacaoDetalhada = questao.explicacao || '';

  explicacaoDetalhada = `
**Resolução:**
${questao.explicacao}

**Conceitos Principais:**
${conceitos.map(c => `• ${c}`).join('\n')}

**Dica de Estudo:**
${dicas[Math.floor(Math.random() * dicas.length)]}

**Cuidado com:**
${erros[0]}
  `.trim();

  return {
    questaoId: questao.id,
    explicacaoBasica: questao.explicacao || '',
    explicacaoDetalhada,
    conceitosPrincipais: conceitos,
    passosResolucao: passos,
    dicasEstudo: dicas.slice(0, 3),
    errosComuns: erros,
    geradoPor: 'local',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Gera feedback para a resposta do usuário
 */
export function gerarFeedback(
  questao: Questao,
  respostaUsuario: string | null
): FeedbackResposta {
  const acertou = respostaUsuario === questao.correta;

  let explicacao = '';
  let pontoForte: string | undefined;
  let pontoMelhoria: string | undefined;
  let proximoPasso = '';
  let xpGanho = 0;

  if (acertou) {
    explicacao = `Parabéns! Você acertou. ${questao.explicacao}`;
    pontoForte = `Você demonstrou conhecimento em ${questao.tema}`;
    proximoPasso = 'Continue praticando para consolidar este conhecimento';
    xpGanho = calcularXP(questao.dificuldade, true);
  } else if (respostaUsuario === null) {
    explicacao = `Você não respondeu. A resposta correta é ${questao.correta}. ${questao.explicacao}`;
    pontoMelhoria = `Tente responder mesmo sem certeza - você pode acertar!`;
    proximoPasso = 'Revise o tema e tente novamente';
    xpGanho = 0;
  } else {
    explicacao = `A resposta correta é ${questao.correta}. ${questao.explicacao}`;
    pontoMelhoria = `Revise os conceitos de ${questao.tema}`;
    proximoPasso = 'Faça mais questões deste tema para fixar';
    xpGanho = calcularXP(questao.dificuldade, false);
  }

  return {
    acertou,
    respostaCorreta: questao.correta,
    respostaUsuario,
    explicacao,
    pontoForte,
    pontoMelhoria,
    proximoPasso,
    xpGanho,
  };
}

/**
 * Gera dica para a questão
 */
export function gerarDica(
  questao: Questao,
  nivel: 'leve' | 'media' | 'forte' = 'leve'
): string {
  const conceitos = CONCEITOS[questao.tema] || [];

  switch (nivel) {
    case 'leve':
      return `Esta questão envolve conceitos de ${questao.tema}. Leia com atenção!`;

    case 'media':
      if (conceitos.length > 0) {
        return `Lembre-se de ${conceitos[0]}. Isso pode ajudar!`;
      }
      return `Pense nos conceitos básicos de ${questao.disciplina}.`;

    case 'forte':
      const partes = (questao.explicacao || '').split('.');
      return `Dica forte: ${partes[0]}...`;

    default:
      return 'Pense com calma antes de responder!';
  }
}

/**
 * Gera sugestões de estudo baseado no desempenho
 */
export function gerarSugestoesEstudo(
  questoesErradas: Questao[]
): { tema: string; prioridade: 'alta' | 'media' | 'baixa'; dica: string }[] {
  // Agrupar por tema
  const porTema: Record<string, number> = {};
  questoesErradas.forEach(q => {
    porTema[q.tema] = (porTema[q.tema] || 0) + 1;
  });

  // Ordenar por frequência
  return Object.entries(porTema)
    .sort((a, b) => b[1] - a[1])
    .map(([tema, count]) => ({
      tema,
      prioridade: count >= 3 ? 'alta' : count >= 2 ? 'media' : 'baixa',
      dica: CONCEITOS[tema]?.[0] || `Revise os fundamentos de ${tema}`,
    }));
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function gerarPassosResolucao(area: Area): string[] {
  switch (area) {
    case 'Matemática':
      return [
        '1. Identifique os dados do enunciado',
        '2. Determine a fórmula ou método',
        '3. Substitua os valores e resolva',
        '4. Verifique se a resposta faz sentido',
        '5. Marque a alternativa correta',
      ];

    case 'Linguagens':
      return [
        '1. Leia o texto buscando a ideia central',
        '2. Identifique o gênero e intenção',
        '3. Relacione com o que é pedido',
        '4. Elimine alternativas incorretas',
        '5. Escolha a mais adequada',
      ];

    case 'Humanas':
      return [
        '1. Contextualize o tema',
        '2. Identifique causa e efeito',
        '3. Relacione com outros eventos',
        '4. Analise cada alternativa',
        '5. Marque a mais completa',
      ];

    case 'Natureza':
      return [
        '1. Identifique o fenômeno ou conceito',
        '2. Relembre as leis relacionadas',
        '3. Organize os dados se houver cálculo',
        '4. Aplique as fórmulas adequadas',
        '5. Confira unidades e magnitude',
      ];

    default:
      return [
        '1. Leia atentamente o enunciado',
        '2. Identifique o que é pedido',
        '3. Analise cada alternativa',
        '4. Elimine as incorretas',
        '5. Marque a melhor resposta',
      ];
  }
}

function calcularFP(dificuldade: Dificuldade, acertou: boolean): number {
  const base = dificuldade * 10;
  if (acertou) {
    return base * 2;
  }
  return Math.floor(base * 0.2); // FP de participação
}

// Alias para compatibilidade
const calcularXP = calcularFP;

// ========================================
// EXPORTS
// ========================================

export {
  explainQuestion as explicarQuestao,
  gerarFeedback as gerarFeedbackResposta,
  gerarDica as gerarDicaQuestao,
};
