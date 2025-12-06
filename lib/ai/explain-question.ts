// ========================================
// IA - EXPLICACAO DE QUESTOES
// ========================================

import { QuestaoCompleta, QuestaoSimulado, AreaENEM, DificuldadeLabel } from '../types/questao';

// ========================================
// TIPOS
// ========================================

export interface ExplicacaoQuestao {
  questaoId: string;
  explicacaoBasica: string;
  explicacaoDetalhada: string;
  conceitosPrincipais: string[];
  passosResolucao?: string[];
  dicasEstudo: string[];
  errosComuns: string[];
  questoesRelacionadas?: string[];
  recursosExternos?: {
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
  respostaUsuario: string;
  explicacao: string;
  pontoForte?: string;
  pontoMelhoria?: string;
  proximoPasso: string;
}

// ========================================
// BASE DE CONHECIMENTO LOCAL
// ========================================

const conceitosPorTema: Record<string, string[]> = {
  // Matematica
  'Equacoes do 1o grau': ['Isolamento de variaveis', 'Operacoes inversas', 'Verificacao de solucao'],
  'Equacoes do 2o grau': ['Formula de Bhaskara', 'Discriminante', 'Soma e produto das raizes'],
  'Porcentagem': ['Conversao decimal', 'Aumento e desconto', 'Porcentagem de porcentagem'],
  'Perimetro e Area': ['Formulas de area', 'Unidades de medida', 'Decomposicao de figuras'],
  'Probabilidade': ['Espaco amostral', 'Eventos favoraveis', 'Probabilidade condicional'],
  'Funcoes': ['Dominio e contradominio', 'Grafico de funcoes', 'Funcao inversa'],
  'Triangulos': ['Teorema de Pitagoras', 'Semelhanca', 'Congruencia'],
  'Progressao Geometrica': ['Razao', 'Termo geral', 'Soma dos termos'],

  // Linguagens
  'Figuras de linguagem': ['Metafora', 'Metonimia', 'Hiperbole', 'Ironia', 'Personificacao'],
  'Sintaxe': ['Sujeito e predicado', 'Transitividade verbal', 'Complementos verbais'],
  'Variacoes linguisticas': ['Registro formal e informal', 'Variacao regional', 'Adequacao'],
  'Concordancia': ['Concordancia verbal', 'Concordancia nominal', 'Casos especiais'],
  'Modernismo': ['Semana de 22', 'Fases do modernismo', 'Principais autores'],
  'Realismo': ['Critica social', 'Analise psicologica', 'Machado de Assis'],

  // Humanas
  'Brasil Republica': ['Proclamacao', 'Republica Velha', 'Era Vargas'],
  'Revolucao Francesa': ['Iluminismo', 'Queda da Bastilha', 'Jacobinos e Girondinos'],
  'Biomas brasileiros': ['Amazonia', 'Cerrado', 'Mata Atlantica', 'Caatinga'],
  'Filosofia Moderna': ['Racionalismo', 'Empirismo', 'Descartes e Kant'],
  'Teoricos classicos': ['Durkheim', 'Weber', 'Marx'],

  // Natureza
  'Citologia': ['Organelas', 'Membrana plasmatica', 'Nucleo'],
  'Dinamica': ['Leis de Newton', 'Forca e aceleracao', 'Atrito'],
  'pH': ['Escala de pH', 'Acidos e bases', 'Indicadores'],
  'Genetica': ['DNA e RNA', 'Leis de Mendel', 'Heranca genetica'],
  'Ecologia': ['Cadeia alimentar', 'Niveis troficos', 'Ciclos biogeoquimicos'],
};

const dicasPorArea: Record<AreaENEM, string[]> = {
  matematica: [
    'Resolva a questao passo a passo, sem pular etapas',
    'Verifique se a resposta faz sentido no contexto do problema',
    'Atencao as unidades de medida',
    'Identifique palavras-chave que indicam operacoes',
    'Faca um desenho ou esquema quando possivel',
  ],
  linguagens: [
    'Leia o texto com atencao antes de ver as alternativas',
    'Identifique a ideia central e os argumentos',
    'Relacione com o contexto historico/social',
    'Cuidado com alternativas muito absolutas',
    'Busque palavras-chave que direcionem a resposta',
  ],
  humanas: [
    'Contextualize os eventos historicos',
    'Relacione causa e consequencia',
    'Atencao a datas e periodos importantes',
    'Compare diferentes visoes sobre o mesmo tema',
    'Use mapas mentais para relacionar conceitos',
  ],
  natureza: [
    'Entenda o conceito antes de aplicar formulas',
    'Relacione fenomenos com exemplos do cotidiano',
    'Atencao a conversao de unidades',
    'Identifique as variaveis do problema',
    'Desenhe diagramas para visualizar o problema',
  ],
  redacao: [
    'Estruture sua redacao em introducao, desenvolvimento e conclusao',
    'Apresente uma tese clara na introducao',
    'Use conectivos para dar coesao ao texto',
    'Sempre apresente uma proposta de intervencao detalhada',
    'Revise ortografia e concordancia',
  ],
};

const errosComunsPorTema: Record<string, string[]> = {
  'Equacoes do 1o grau': [
    'Esquecer de inverter o sinal ao mudar termo de lado',
    'Dividir antes de simplificar',
    'Nao verificar a resposta substituindo na equacao original',
  ],
  'Porcentagem': [
    'Confundir aumento com desconto',
    'Aplicar porcentagem sobre valor ja modificado incorretamente',
    'Errar na conversao decimal (50% = 0.5, nao 0.50)',
  ],
  'Probabilidade': [
    'Confundir eventos independentes com dependentes',
    'Esquecer de considerar todos os casos possiveis',
    'Somar probabilidades quando deveria multiplicar',
  ],
  'Figuras de linguagem': [
    'Confundir metafora com comparacao',
    'Nao identificar ironia em contexto',
    'Confundir metonimia com sinedoque',
  ],
  'Concordancia': [
    'Fazer sujeito concordar com complemento proximo',
    'Esquecer regras de verbos impessoais',
    'Errar concordancia com sujeito composto',
  ],
};

// ========================================
// FUNCOES DE EXPLICACAO
// ========================================

/**
 * Gera explicacao detalhada para uma questao
 */
export function explicarQuestao(
  questao: QuestaoCompleta | QuestaoSimulado,
  modoDetalhado: boolean = true
): ExplicacaoQuestao {
  const tema = 'tema' in questao ? questao.tema : '';
  const area = questao.area;
  const explicacaoOriginal = 'explicacaoDetalhada' in questao
    ? questao.explicacaoDetalhada || questao.explicacao
    : questao.explicacao;

  // Buscar conceitos relacionados
  const conceitos = conceitosPorTema[tema] || [
    `Conceitos fundamentais de ${tema}`,
    `Aplicacao pratica em ${questao.disciplina}`,
  ];

  // Buscar dicas da area
  const dicas = dicasPorArea[area] || dicasPorArea.matematica;

  // Buscar erros comuns
  const erros = errosComunsPorTema[tema] || [
    'Leitura apressada do enunciado',
    'Nao verificar a resposta',
    'Confundir conceitos similares',
  ];

  // Gerar explicacao detalhada
  let explicacaoDetalhada = explicacaoOriginal;

  if (modoDetalhado) {
    explicacaoDetalhada = `
**Resolucao:**
${explicacaoOriginal}

**Conceitos Envolvidos:**
${conceitos.map(c => `- ${c}`).join('\n')}

**Dica de Estudo:**
${dicas[Math.floor(Math.random() * dicas.length)]}

**Cuidado com:**
${erros[0]}
    `.trim();
  }

  // Gerar passos de resolucao baseado na area
  const passosResolucao = gerarPassosResolucao(questao);

  return {
    questaoId: questao.id,
    explicacaoBasica: explicacaoOriginal,
    explicacaoDetalhada,
    conceitosPrincipais: conceitos,
    passosResolucao,
    dicasEstudo: dicas.slice(0, 3),
    errosComuns: erros,
    geradoPor: 'local',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Gera passos de resolucao
 */
function gerarPassosResolucao(questao: QuestaoCompleta | QuestaoSimulado): string[] {
  const area = questao.area;

  switch (area) {
    case 'matematica':
      return [
        '1. Identifique os dados fornecidos no enunciado',
        '2. Determine qual formula ou metodo utilizar',
        '3. Substitua os valores e resolva passo a passo',
        '4. Verifique se a resposta faz sentido',
        '5. Marque a alternativa correspondente',
      ];

    case 'linguagens':
      return [
        '1. Leia o texto com atencao, buscando a ideia central',
        '2. Identifique o genero textual e sua intencao',
        '3. Relacione com o contexto pedido na questao',
        '4. Elimine alternativas claramente incorretas',
        '5. Escolha a que melhor responde ao comando da questao',
      ];

    case 'humanas':
      return [
        '1. Contextualize o tema historico/geografico',
        '2. Identifique relacoes de causa e efeito',
        '3. Relacione com outros eventos/conceitos',
        '4. Analise cada alternativa criticamente',
        '5. Marque a mais completa e correta',
      ];

    case 'natureza':
      return [
        '1. Identifique o fenomeno ou conceito envolvido',
        '2. Relembre as leis/principios relacionados',
        '3. Se houver calculo, organize os dados',
        '4. Aplique as formulas adequadas',
        '5. Confira unidades e magnitude da resposta',
      ];

    default:
      return [
        '1. Leia atentamente o enunciado',
        '2. Identifique o que e pedido',
        '3. Analise cada alternativa',
        '4. Elimine as incorretas',
        '5. Marque a melhor resposta',
      ];
  }
}

/**
 * Gera feedback personalizado para resposta
 */
export function gerarFeedbackResposta(
  questao: QuestaoCompleta | QuestaoSimulado,
  respostaUsuario: number
): FeedbackResposta {
  const letras = ['A', 'B', 'C', 'D', 'E'];
  const correta = 'correta' in questao ? questao.correta : 0;
  const acertou = respostaUsuario === correta;

  let explicacao = '';
  let pontoForte = '';
  let pontoMelhoria = '';
  let proximoPasso = '';

  // Obter tema/assunto da questão de forma segura
  const temaQuestao = (questao as QuestaoCompleta).tema || (questao as QuestaoSimulado).tema || questao.disciplina;

  if (acertou) {
    explicacao = `Parabens! Voce acertou. ${questao.explicacao}`;
    pontoForte = `Voce demonstrou conhecimento em ${temaQuestao}`;
    proximoPasso = 'Continue praticando para consolidar este conhecimento';
  } else {
    explicacao = `Nao foi dessa vez. A resposta correta e ${letras[correta]}. ${questao.explicacao}`;
    pontoMelhoria = `Revise os conceitos de ${temaQuestao}`;
    proximoPasso = 'Faca mais questoes deste tema para fixar o conteudo';
  }

  return {
    acertou,
    respostaCorreta: letras[correta],
    respostaUsuario: letras[respostaUsuario] || 'Nao respondida',
    explicacao,
    pontoForte: acertou ? pontoForte : undefined,
    pontoMelhoria: !acertou ? pontoMelhoria : undefined,
    proximoPasso,
  };
}

/**
 * Gera dica antes de responder
 */
export function gerarDicaQuestao(
  questao: QuestaoCompleta | QuestaoSimulado,
  nivel: 'leve' | 'media' | 'forte' = 'leve'
): string {
  const tema = (questao as QuestaoCompleta).tema || (questao as QuestaoSimulado).tema || questao.disciplina;
  const conceitos = conceitosPorTema[tema] || [];

  switch (nivel) {
    case 'leve':
      return `Dica: Esta questao envolve conceitos de ${tema}. Leia o enunciado com atencao!`;

    case 'media':
      if (conceitos.length > 0) {
        return `Dica: Lembre-se de ${conceitos[0]}. Isso pode ajudar na resolucao.`;
      }
      return `Dica: Pense nos conceitos basicos de ${questao.disciplina}.`;

    case 'forte':
      const explicacao = questao.explicacao;
      const primeiraParte = explicacao.split('.')[0];
      return `Dica forte: ${primeiraParte}...`;

    default:
      return `Pense com calma antes de responder!`;
  }
}

// ========================================
// INTEGRACAO COM IA EXTERNA (PREPARADO)
// ========================================

interface ConfigIA {
  provider: 'local' | 'openai' | 'ollama';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

const configPadrao: ConfigIA = {
  provider: 'local',
};

/**
 * Explicacao com IA externa (quando configurado)
 */
export async function explicarQuestaoComIA(
  questao: QuestaoCompleta | QuestaoSimulado,
  config: ConfigIA = configPadrao
): Promise<ExplicacaoQuestao> {
  // Por enquanto, sempre usa local
  // Quando API estiver configurada, chamar provider externo

  if (config.provider === 'local') {
    return explicarQuestao(questao, true);
  }

  // TODO: Implementar chamadas para OpenAI/Ollama
  // if (config.provider === 'openai') {
  //   return await chamarOpenAI(questao, config);
  // }

  // Fallback para local
  return explicarQuestao(questao, true);
}

/**
 * Verifica se IA externa esta disponivel
 */
export function verificarIADisponivel(): {
  local: boolean;
  openai: boolean;
  ollama: boolean;
} {
  return {
    local: true,
    openai: !!process.env.OPENAI_API_KEY,
    ollama: false, // Precisaria verificar se servidor local esta rodando
  };
}
