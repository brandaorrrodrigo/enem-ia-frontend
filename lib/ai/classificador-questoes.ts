/**
 * CLASSIFICADOR DE QUESTÕES DO ENEM PRO
 * Usa IA para classificar questões automaticamente
 */

import type {
  QuestaoClassificada,
  PromptClassificacao,
  Materia,
  TipoQuestao,
  NivelDificuldade,
} from '@/types/ai-systems';

// =====================================================
// PROMPT DE CLASSIFICAÇÃO (baseado nos arquivos)
// =====================================================

const PROMPT_SISTEMA = `
VOCÊ É UMA IA ESPECIALISTA EM ENEM, PEDAGOGIA, MATRIZ DE REFERÊNCIA DO INEP
E ANÁLISE SEMÂNTICA DE QUESTÕES.

SEU OBJETIVO:
Classificar corretamente cada questão do ENEM em:
- Matéria
- Tema principal
- Subtema
- Competência do ENEM
- Habilidades associadas
- Tipo de cobrança

O RESULTADO SERÁ USADO PARA:
- Estatísticas de incidência por tópico
- Probabilidade de recorrência
- Organização inteligente da biblioteca
- Geração de simulados direcionados
- Plano de estudos personalizado

REGRAS ABSOLUTAS:
1. NUNCA classifique apenas pelo rótulo original da questão.
2. Analise o TEXTO, CONTEXTO, DADOS, GRÁFICOS e OBJETIVO DA QUESTÃO.
3. Se a questão envolver mais de uma área, escolha UMA matéria principal.
4. Use SEMPRE a taxonomia do ENEM (INEP).
5. NÃO invente conteúdos que não estejam implícitos na questão.

Retorne OBRIGATORIAMENTE neste formato JSON:
{
  "materia": "",
  "tema_principal": "",
  "subtema": "",
  "materia_secundaria": null,
  "competencia_enem": "",
  "habilidades": [],
  "tipo_de_questao": "",
  "nivel_dificuldade": "",
  "palavras_chave": [],
  "justificativa_classificacao": ""
}
`;

// =====================================================
// SERVIÇO DE CLASSIFICAÇÃO
// =====================================================

export class ClassificadorQuestoes {
  private apiKey: string;
  private modelo: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.modelo = 'claude-3-5-sonnet-20241022';
  }

  /**
   * Classifica uma única questão usando IA
   */
  async classificarQuestao(
    questao: PromptClassificacao['questao'],
    config: PromptClassificacao['configuracao'] = {
      modo: 'detalhado',
      incluir_habilidades: true,
    }
  ): Promise<QuestaoClassificada['classificacao']> {
    const prompt = this.construirPrompt(questao, config);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.modelo,
          max_tokens: config.modo === 'rapido' ? 1000 : 2000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const conteudo = data.content[0].text;

      // Extrair JSON da resposta
      const jsonMatch = conteudo.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Resposta da IA não contém JSON válido');
      }

      const classificacao = JSON.parse(jsonMatch[0]);

      return {
        materia: classificacao.materia as Materia,
        tema_principal: classificacao.tema_principal,
        subtema: classificacao.subtema,
        materia_secundaria: classificacao.materia_secundaria || null,
        competencia_enem: classificacao.competencia_enem,
        habilidades: classificacao.habilidades || [],
        tipo_de_questao: classificacao.tipo_de_questao as TipoQuestao,
        nivel_dificuldade: classificacao.nivel_dificuldade as NivelDificuldade,
        palavras_chave: classificacao.palavras_chave || [],
        justificativa_classificacao: classificacao.justificativa_classificacao,
      };
    } catch (error) {
      console.error('Erro ao classificar questão:', error);
      throw error;
    }
  }

  /**
   * Classifica múltiplas questões em lote
   */
  async classificarLote(
    questoes: PromptClassificacao['questao'][],
    config?: PromptClassificacao['configuracao']
  ): Promise<QuestaoClassificada['classificacao'][]> {
    const classificacoes: QuestaoClassificada['classificacao'][] = [];

    for (const questao of questoes) {
      try {
        const classificacao = await this.classificarQuestao(questao, config);
        classificacoes.push(classificacao);

        // Delay para não sobrecarregar API
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Erro ao classificar questão em lote:', error);
        // Continua com as próximas questões
      }
    }

    return classificacoes;
  }

  /**
   * Constrói o prompt para a IA
   */
  private construirPrompt(
    questao: PromptClassificacao['questao'],
    config: PromptClassificacao['configuracao']
  ): string {
    let prompt = PROMPT_SISTEMA + '\n\n';

    prompt += `QUESTÃO A CLASSIFICAR:\n\n`;
    prompt += `ENUNCIADO:\n${questao.enunciado}\n\n`;

    if (questao.alternativas && questao.alternativas.length > 0) {
      prompt += `ALTERNATIVAS:\n`;
      questao.alternativas.forEach((alt, idx) => {
        prompt += `${String.fromCharCode(65 + idx)}) ${alt}\n`;
      });
      prompt += '\n';
    }

    if (questao.ano) {
      prompt += `ANO: ${questao.ano}\n`;
    }

    prompt += `FONTE: ${questao.fonte}\n\n`;

    if (config.modo === 'rapido') {
      prompt += `MODO RÁPIDO: Forneça apenas as informações essenciais.\n\n`;
    }

    if (!config.incluir_habilidades) {
      prompt += `NÃO é necessário detalhar habilidades específicas.\n\n`;
    }

    prompt += `Classifique esta questão agora.`;

    return prompt;
  }

  /**
   * Valida se uma classificação está completa
   */
  validarClassificacao(
    classificacao: QuestaoClassificada['classificacao']
  ): boolean {
    return !!(
      classificacao.materia &&
      classificacao.tema_principal &&
      classificacao.subtema &&
      classificacao.tipo_de_questao &&
      classificacao.nivel_dificuldade
    );
  }
}

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

/**
 * Cria uma questão classificada completa
 */
export function criarQuestaoClassificada(
  questao: {
    id: string;
    enunciado: string;
    alternativas: string[];
    respostaCorreta: number;
    ano?: number;
    fonte?: 'ENEM' | 'Apostila' | 'Simulado' | 'Questão Livre';
  },
  classificacao: QuestaoClassificada['classificacao']
): QuestaoClassificada {
  return {
    id: questao.id,
    enunciado: questao.enunciado,
    alternativas: questao.alternativas,
    respostaCorreta: questao.respostaCorreta,
    ano: questao.ano,
    fonte: questao.fonte || 'Questão Livre',
    classificacao,
    classificadaEm: new Date(),
    versaoClassificacao: '1.0.0',
  };
}

/**
 * Exemplo de uso
 */
export async function exemploUso() {
  const classificador = new ClassificadorQuestoes();

  const questaoExemplo = {
    enunciado:
      'Uma fábrica produz 1200 unidades por dia. Se a produção aumentar 25%, quantas unidades serão produzidas?',
    alternativas: ['1400', '1500', '1600', '1700'],
    ano: 2023,
    fonte: 'ENEM' as const,
  };

  const classificacao = await classificador.classificarQuestao(questaoExemplo, {
    modo: 'detalhado',
    incluir_habilidades: true,
  });

  console.log('Classificação:', classificacao);
}
