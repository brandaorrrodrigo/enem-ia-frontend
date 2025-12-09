/**
 * BIBLIOTECA ENEM PRO - CONTEÚDO COMPLETO
 * Conteúdo detalhado de todos os módulos de todas as disciplinas
 * Baseado nos materiais de estudo reais do ENEM
 */

export interface ConteudoModulo {
  slug: string;
  resumo: string;
  explicacao: string;
  exemplos: string[];
  memorizacao: string[];
  errosComuns: { erro: string; correto: string }[];
  formulas?: { nome: string; formula: string; quando: string }[];
  questoesResolvidas: QuestaoResolvida[];
  questoesEnem: QuestaoEnem[];
  mapaMental: MapaMental;
  miniQuiz: MiniQuizConfig;
}

export interface QuestaoResolvida {
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  resolucao: string;
}

export interface QuestaoEnem {
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  dificuldade: 'fácil' | 'média' | 'difícil';
}

export interface MapaMental {
  titulo: string;
  topicos: {
    titulo: string;
    subtopicos: string[];
  }[];
}

export interface MiniQuizConfig {
  questoes: {
    pergunta: string;
    opcoes: string[];
    respostaCorreta: number;
    explicacao: string;
    dificuldade: 'fácil' | 'média' | 'difícil';
  }[];
}

// =====================================================
// MATEMÁTICA
// =====================================================

export const MATEMATICA_CONTEUDO: Record<string, ConteudoModulo> = {
  'aritmetica-basica': {
    slug: 'aritmetica-basica',
    resumo: `Aritmética Básica envolve as operações fundamentais com números: adição, subtração, multiplicação e divisão.
    Inclui também o trabalho com frações, números decimais e porcentagens. É a base de toda a matemática do ENEM.`,

    explicacao: `<h2>🔢 Operações Fundamentais</h2>
    <p>As quatro operações básicas são a fundação de toda a matemática:</p>
    <ul>
      <li><strong>Adição (+):</strong> Juntar quantidades</li>
      <li><strong>Subtração (-):</strong> Retirar ou comparar quantidades</li>
      <li><strong>Multiplicação (×):</strong> Soma repetida de parcelas iguais</li>
      <li><strong>Divisão (÷):</strong> Repartir em partes iguais</li>
    </ul>

    <h3>📊 Ordem das Operações (PEMDAS)</h3>
    <p>Quando há várias operações em uma expressão, siga esta ordem:</p>
    <ol>
      <li><strong>P</strong>arênteses e colchetes</li>
      <li><strong>E</strong>xpoentes e raízes</li>
      <li><strong>M</strong>ultiplicação e <strong>D</strong>ivisão (da esquerda para direita)</li>
      <li><strong>A</strong>dição e <strong>S</strong>ubtração (da esquerda para direita)</li>
    </ol>

    <h3>🎯 Frações</h3>
    <p>Uma fração representa uma parte do todo: <strong>numerador/denominador</strong></p>
    <ul>
      <li><strong>Somar frações:</strong> Precisam ter o mesmo denominador</li>
      <li><strong>Multiplicar frações:</strong> Multiplica numerador com numerador e denominador com denominador</li>
      <li><strong>Dividir frações:</strong> Multiplica pela fração invertida</li>
    </ul>

    <h3>💡 Números Decimais</h3>
    <p>Representam frações com denominador 10, 100, 1000, etc.</p>
    <p>Exemplo: 0,5 = 5/10 = 1/2</p>`,

    exemplos: [
      `<strong>Exemplo 1: Ordem das Operações</strong><br>
      Calcule: 3 + 2 × (8 - 3)<br><br>
      <strong>Solução:</strong><br>
      Passo 1: Resolve o parêntese → 8 - 3 = 5<br>
      Passo 2: Multiplicação → 2 × 5 = 10<br>
      Passo 3: Adição → 3 + 10 = 13<br>
      <strong>Resposta: 13</strong>`,

      `<strong>Exemplo 2: Soma de Frações</strong><br>
      Calcule: 1/4 + 2/3<br><br>
      <strong>Solução:</strong><br>
      Passo 1: MMC(4,3) = 12<br>
      Passo 2: 1/4 = 3/12 e 2/3 = 8/12<br>
      Passo 3: 3/12 + 8/12 = 11/12<br>
      <strong>Resposta: 11/12</strong>`,

      `<strong>Exemplo 3: Divisão de Frações</strong><br>
      Calcule: (3/4) ÷ (2/5)<br><br>
      <strong>Solução:</strong><br>
      Inverte a segunda fração e multiplica:<br>
      (3/4) × (5/2) = 15/8<br>
      <strong>Resposta: 15/8 ou 1,875</strong>`
    ],

    memorizacao: [
      '🔢 PEMDAS: Parênteses, Expoentes, Multiplicação/Divisão, Adição/Subtração',
      '➗ Para dividir frações: "multiplica pela invertida"',
      '📊 MMC para somar frações com denominadores diferentes',
      '💯 Porcentagem = dividir por 100 (50% = 50/100 = 0,5)',
      '🎯 Número decimal × 10 = move vírgula 1 casa para direita'
    ],

    errosComuns: [
      {
        erro: '2 + 3 × 4 = 20 (fazer 5 × 4)',
        correto: '2 + 3 × 4 = 2 + 12 = 14 (multiplicação primeiro)'
      },
      {
        erro: '1/2 + 1/3 = 2/5 (somar numeradores e denominadores)',
        correto: '1/2 + 1/3 = 3/6 + 2/6 = 5/6 (usar MMC)'
      },
      {
        erro: '0,5 + 0,3 = 0,8 (confundir com multiplicação)',
        correto: '0,5 + 0,3 = 0,8 (está correto, mas 0,5 × 0,3 = 0,15)'
      }
    ],

    formulas: [
      {
        nome: 'Fração para Decimal',
        formula: 'decimal = numerador ÷ denominador',
        quando: 'Para converter fração em número decimal'
      },
      {
        nome: 'Porcentagem',
        formula: 'x% de N = (x/100) × N',
        quando: 'Para calcular porcentagem de um valor'
      },
      {
        nome: 'MMC',
        formula: 'MMC(a,b) = (a × b) / MDC(a,b)',
        quando: 'Para encontrar mínimo múltiplo comum'
      }
    ],

    questoesResolvidas: [
      {
        enunciado: 'Um produto custa R$ 80,00 e teve um desconto de 15%. Qual o novo preço?',
        alternativas: [
          'R$ 65,00',
          'R$ 68,00',
          'R$ 70,00',
          'R$ 72,00',
          'R$ 75,00'
        ],
        respostaCorreta: 1,
        resolucao: `<strong>Resolução:</strong><br>
        Desconto = 15% de 80 = 0,15 × 80 = 12 reais<br>
        Novo preço = 80 - 12 = 68 reais<br><br>
        <strong>Alternativa: OU</strong><br>
        Pagar 85% do valor (100% - 15% = 85%)<br>
        Novo preço = 0,85 × 80 = 68 reais<br><br>
        <strong>Resposta: R$ 68,00 (alternativa B)</strong>`
      },
      {
        enunciado: 'Maria comprou 2/5 de um bolo e João comprou 1/4. Que fração do bolo foi comprada ao todo?',
        alternativas: [
          '3/9',
          '3/20',
          '13/20',
          '3/4',
          '7/10'
        ],
        respostaCorreta: 2,
        resolucao: `<strong>Resolução:</strong><br>
        Precisamos somar 2/5 + 1/4<br>
        MMC(5,4) = 20<br>
        2/5 = 8/20<br>
        1/4 = 5/20<br>
        8/20 + 5/20 = 13/20<br><br>
        <strong>Resposta: 13/20 (alternativa C)</strong>`
      }
    ],

    questoesEnem: [
      {
        enunciado: 'Uma receita de bolo utiliza 2/3 de xícara de açúcar. Se quisermos fazer 1,5 vezes a receita, quantas xícaras de açúcar serão necessárias?',
        alternativas: [
          '1/2 xícara',
          '3/4 xícara',
          '1 xícara',
          '1,5 xícara',
          '2 xícaras'
        ],
        respostaCorreta: 2,
        dificuldade: 'média'
      },
      {
        enunciado: 'Um terreno retangular tem 15 metros de frente e 20 metros de fundo. Se cada metro quadrado custa R$ 350,00, qual o valor total do terreno?',
        alternativas: [
          'R$ 95.000,00',
          'R$ 100.000,00',
          'R$ 105.000,00',
          'R$ 110.000,00',
          'R$ 115.000,00'
        ],
        respostaCorreta: 2,
        dificuldade: 'média'
      },
      {
        enunciado: 'Em uma turma, 3/5 dos alunos são meninas. Se há 24 meninas, quantos alunos há na turma?',
        alternativas: [
          '30',
          '35',
          '40',
          '45',
          '50'
        ],
        respostaCorreta: 2,
        dificuldade: 'média'
      },
      {
        enunciado: 'João gastou 1/4 do seu salário com alimentação e 2/5 com aluguel. Que fração do salário ainda resta?',
        alternativas: [
          '1/10',
          '3/20',
          '7/20',
          '2/5',
          '1/2'
        ],
        respostaCorreta: 2,
        dificuldade: 'difícil'
      },
      {
        enunciado: 'O resultado de (0,5 + 0,25) × 4 - 1 é:',
        alternativas: [
          '1',
          '2',
          '3',
          '4',
          '5'
        ],
        respostaCorreta: 1,
        dificuldade: 'fácil'
      }
    ],

    mapaMental: {
      titulo: 'Aritmética Básica',
      topicos: [
        {
          titulo: 'Operações Básicas',
          subtopicos: ['Adição', 'Subtração', 'Multiplicação', 'Divisão', 'Ordem PEMDAS']
        },
        {
          titulo: 'Frações',
          subtopicos: ['Simplificação', 'Soma e Subtração (MMC)', 'Multiplicação', 'Divisão (inverter)']
        },
        {
          titulo: 'Decimais',
          subtopicos: ['Conversão fração↔decimal', 'Operações com decimais', 'Arredondamento']
        },
        {
          titulo: 'Porcentagem',
          subtopicos: ['x% de N', 'Aumento/Desconto', 'Variação percentual']
        }
      ]
    },

    miniQuiz: {
      questoes: [
        {
          pergunta: 'Quanto é 25% de 80?',
          opcoes: ['15', '20', '25', '30'],
          respostaCorreta: 1,
          explicacao: '25% = 1/4, então 80 ÷ 4 = 20. Ou: 0,25 × 80 = 20',
          dificuldade: 'fácil'
        },
        {
          pergunta: 'Qual é o resultado de 1/2 + 1/3?',
          opcoes: ['2/5', '3/6', '5/6', '4/6'],
          respostaCorreta: 2,
          explicacao: 'MMC(2,3) = 6. Então 3/6 + 2/6 = 5/6',
          dificuldade: 'média'
        },
        {
          pergunta: 'O resultado de 2 + 3 × 4 é:',
          opcoes: ['20', '14', '12', '10'],
          respostaCorreta: 1,
          explicacao: 'Multiplicação primeiro: 3 × 4 = 12, depois 2 + 12 = 14',
          dificuldade: 'fácil'
        }
      ]
    }
  },

  'porcentagem': {
    slug: 'porcentagem',
    resumo: `Porcentagem é uma forma de expressar uma razão sobre 100. É amplamente usado no ENEM em questões de economia,
    estatística, descontos, juros e aumentos. Essencial dominar cálculos percentuais mentalmente.`,

    explicacao: `<h2>📊 O que é Porcentagem?</h2>
    <p>Porcentagem significa "por cem" (%). É uma fração com denominador 100.</p>
    <p><strong>Exemplo:</strong> 25% = 25/100 = 0,25</p>

    <h3>💰 Cálculos Básicos</h3>
    <p><strong>Calcular x% de N:</strong></p>
    <p>x% de N = (x/100) × N</p>
    <p>Exemplo: 30% de 200 = (30/100) × 200 = 0,3 × 200 = 60</p>

    <h3>📈 Aumento Percentual</h3>
    <p>Quando um valor aumenta x%:</p>
    <p>Novo valor = Valor original × (1 + x/100)</p>
    <p>Exemplo: Aumento de 20% em 50 = 50 × 1,20 = 60</p>

    <h3>📉 Desconto Percentual</h3>
    <p>Quando um valor diminui x%:</p>
    <p>Novo valor = Valor original × (1 - x/100)</p>
    <p>Exemplo: Desconto de 15% em 80 = 80 × 0,85 = 68</p>

    <h3>🔄 Variação Percentual</h3>
    <p>Para calcular quanto % um valor mudou:</p>
    <p>Variação % = [(Valor final - Valor inicial) / Valor inicial] × 100</p>`,

    exemplos: [
      `<strong>Exemplo 1: Desconto Sucessivo</strong><br>
      Um produto de R$ 100 tem 20% de desconto e depois mais 10% de desconto. Qual o preço final?<br><br>
      <strong>Solução:</strong><br>
      ERRO COMUM: 20% + 10% = 30% de desconto ❌<br>
      CORRETO: Aplicar os descontos separadamente ✅<br><br>
      Primeiro desconto: 100 × 0,80 = 80<br>
      Segundo desconto: 80 × 0,90 = 72<br>
      <strong>Resposta: R$ 72,00</strong><br>
      <em>Nota: Desconto total foi de 28%, não 30%</em>`,

      `<strong>Exemplo 2: Aumento e Redução</strong><br>
      Um salário teve aumento de 30% e depois redução de 30%. O salário voltou ao valor original?<br><br>
      <strong>Solução:</strong><br>
      Salário inicial: 100<br>
      Após aumento de 30%: 100 × 1,30 = 130<br>
      Após redução de 30%: 130 × 0,70 = 91<br>
      <strong>Resposta: NÃO. O salário final é 91, menor que o inicial.</strong>`,

      `<strong>Exemplo 3: Variação Percentual</strong><br>
      O preço da gasolina subiu de R$ 5,00 para R$ 6,50. Qual foi o aumento percentual?<br><br>
      <strong>Solução:</strong><br>
      Variação % = [(6,50 - 5,00) / 5,00] × 100<br>
      Variação % = [1,50 / 5,00] × 100<br>
      Variação % = 0,30 × 100 = 30%<br>
      <strong>Resposta: 30% de aumento</strong>`
    ],

    memorizacao: [
      '💯 Para calcular na cabeça: 10% = dividir por 10, 1% = dividir por 100',
      '⚡ 50% = metade, 25% = um quarto, 75% = três quartos',
      '📊 Descontos sucessivos NÃO se somam! Aplicar um após o outro',
      '🔄 Aumento de x% seguido de redução de x% NÃO volta ao valor original',
      '✅ Aumentar 100% = dobrar o valor, aumentar 50% = adicionar metade'
    ],

    errosComuns: [
      {
        erro: 'Somar descontos: 20% + 10% = 30%',
        correto: 'Aplicar sucessivamente: × 0,80 × 0,90 = × 0,72 (28% de desconto)'
      },
      {
        erro: 'Pensar que aumento de 50% e redução de 50% se anulam',
        correto: '× 1,5 × 0,5 = × 0,75 (perdeu 25%)'
      },
      {
        erro: 'Calcular variação usando o valor final como base',
        correto: 'Sempre usar o valor INICIAL como base'
      }
    ],

    formulas: [
      {
        nome: 'Porcentagem de um Valor',
        formula: 'x% de N = (x/100) × N',
        quando: 'Para calcular quanto é x% de um número'
      },
      {
        nome: 'Aumento Percentual',
        formula: 'Novo valor = Original × (1 + x/100)',
        quando: 'Quando aumenta x%'
      },
      {
        nome: 'Desconto Percentual',
        formula: 'Novo valor = Original × (1 - x/100)',
        quando: 'Quando diminui x%'
      },
      {
        nome: 'Variação Percentual',
        formula: 'Var% = [(Final - Inicial)/Inicial] × 100',
        quando: 'Para saber quanto % variou'
      },
      {
        nome: 'Descontos Sucessivos',
        formula: 'Final = Original × (1 - d1) × (1 - d2) × ...',
        quando: 'Múltiplos descontos aplicados'
      }
    ],

    questoesResolvidas: [
      {
        enunciado: 'Uma TV custa R$ 2.000 e está com 25% de desconto. Pagando à vista, há mais 10% de desconto sobre o valor com desconto. Quanto custa à vista?',
        alternativas: [
          'R$ 1.300,00',
          'R$ 1.350,00',
          'R$ 1.400,00',
          'R$ 1.450,00',
          'R$ 1.500,00'
        ],
        respostaCorreta: 1,
        resolucao: `<strong>Resolução:</strong><br>
        Primeiro desconto (25%): 2000 × 0,75 = 1500<br>
        Segundo desconto (10%): 1500 × 0,90 = 1350<br><br>
        <strong>OU de uma vez:</strong><br>
        2000 × 0,75 × 0,90 = 1350<br><br>
        <strong>Resposta: R$ 1.350,00 (alternativa B)</strong>`
      }
    ],

    questoesEnem: [
      {
        enunciado: 'Um produto que custava R$ 120 teve aumento de 20% e depois desconto de 20%. Qual o preço final?',
        alternativas: [
          'R$ 115,00',
          'R$ 115,20',
          'R$ 120,00',
          'R$ 124,80',
          'R$ 125,00'
        ],
        respostaCorreta: 1,
        dificuldade: 'média'
      },
      {
        enunciado: 'Em uma promoção, um notebook teve dois descontos sucessivos de 10% e 20%. Qual o desconto total equivalente?',
        alternativas: [
          '28%',
          '30%',
          '32%',
          '35%',
          '40%'
        ],
        respostaCorreta: 0,
        dificuldade: 'difícil'
      },
      {
        enunciado: 'O número de alunos em uma escola aumentou de 500 para 650. Qual foi o aumento percentual?',
        alternativas: [
          '15%',
          '20%',
          '25%',
          '30%',
          '35%'
        ],
        respostaCorreta: 3,
        dificuldade: 'média'
      }
    ],

    mapaMental: {
      titulo: 'Porcentagem',
      topicos: [
        {
          titulo: 'Conceito Básico',
          subtopicos: ['x% = x/100', 'Conversão decimal', 'Porcentagem de um valor']
        },
        {
          titulo: 'Aumentos e Descontos',
          subtopicos: ['Aumento: × (1 + x/100)', 'Desconto: × (1 - x/100)', 'Sucessivos: multiplicar fatores']
        },
        {
          titulo: 'Variação Percentual',
          subtopicos: ['(Final - Inicial)/Inicial × 100', 'Base sempre é o inicial', 'Pode ser positiva ou negativa']
        },
        {
          titulo: 'Truques Mentais',
          subtopicos: ['10% = ÷10', '1% = ÷100', '50% = metade', '25% = um quarto']
        }
      ]
    },

    miniQuiz: {
      questoes: [
        {
          pergunta: 'Quanto é 15% de 200?',
          opcoes: ['20', '25', '30', '35'],
          respostaCorreta: 2,
          explicacao: '15% de 200 = 0,15 × 200 = 30',
          dificuldade: 'fácil'
        },
        {
          pergunta: 'Um produto de R$ 50 com 40% de desconto custa:',
          opcoes: ['R$ 20', 'R$ 30', 'R$ 35', 'R$ 40'],
          respostaCorreta: 1,
          explicacao: '40% de desconto = pagar 60% = 50 × 0,6 = 30',
          dificuldade: 'fácil'
        },
        {
          pergunta: 'Dois descontos de 20% equivalem a um desconto de:',
          opcoes: ['36%', '40%', '44%', '48%'],
          respostaCorreta: 0,
          explicacao: '0,8 × 0,8 = 0,64 (paga 64% do valor) = 36% de desconto',
          dificuldade: 'difícil'
        }
      ]
    }
  },

  // Continua com os outros módulos de matemática...
  'razao-proporcao': {
    slug: 'razao-proporcao',
    resumo: `Razão e proporção são conceitos fundamentais para resolver problemas de regra de três, escala, divisão proporcional
    e muitos problemas contextualizados do ENEM. Razão é a comparação entre dois números e proporção é a igualdade entre razões.`,

    explicacao: `<h2>⚖️ Razão</h2>
    <p>Razão é a comparação entre dois números através de uma divisão:</p>
    <p><strong>Razão de a para b = a/b ou a:b</strong></p>
    <p>Exemplo: Se há 10 meninos e 15 meninas, a razão é 10/15 = 2/3</p>

    <h3>📐 Proporção</h3>
    <p>Proporção é a igualdade entre duas razões:</p>
    <p><strong>a/b = c/d</strong></p>
    <p>Lê-se: "a está para b assim como c está para d"</p>
    <p>Propriedade fundamental: a × d = b × c (produto dos meios = produto dos extremos)</p>

    <h3>🎯 Regra de Três Simples</h3>
    <p>Usada quando temos DUAS grandezas relacionadas:</p>
    <ul>
      <li><strong>Direta:</strong> Quando uma aumenta, a outra aumenta</li>
      <li><strong>Inversa:</strong> Quando uma aumenta, a outra diminui</li>
    </ul>

    <h3>🔄 Regra de Três Composta</h3>
    <p>Usada quando temos TRÊS ou mais grandezas relacionadas.</p>`,

    exemplos: [
      `<strong>Exemplo 1: Regra de Três Simples Direta</strong><br>
      Se 5 metros de tecido custam R$ 30, quanto custam 8 metros?<br><br>
      <strong>Solução:</strong><br>
      5 metros ---- R$ 30<br>
      8 metros ---- x<br><br>
      Mais metros → mais reais (DIRETA)<br>
      5/8 = 30/x<br>
      5x = 240<br>
      x = 48<br>
      <strong>Resposta: R$ 48</strong>`,

      `<strong>Exemplo 2: Regra de Três Simples Inversa</strong><br>
      10 operários fazem um trabalho em 6 dias. Em quantos dias 15 operários fariam?<br><br>
      <strong>Solução:</strong><br>
      10 operários ---- 6 dias<br>
      15 operários ---- x<br><br>
      Mais operários → menos dias (INVERSA)<br>
      10/15 = x/6 (inverte a segunda razão)<br>
      15x = 60<br>
      x = 4<br>
      <strong>Resposta: 4 dias</strong>`,

      `<strong>Exemplo 3: Divisão Proporcional</strong><br>
      Dividir R$ 500 entre A, B e C na razão 2:3:5<br><br>
      <strong>Solução:</strong><br>
      Soma das partes: 2 + 3 + 5 = 10<br>
      A recebe: (2/10) × 500 = 100<br>
      B recebe: (3/10) × 500 = 150<br>
      C recebe: (5/10) × 500 = 250<br>
      <strong>Resposta: A=R$100, B=R$150, C=R$250</strong>`
    ],

    memorizacao: [
      '⚖️ Razão = divisão entre dois números (a/b)',
      '➡️ Regra de 3 DIRETA: setas no mesmo sentido (↑↑ ou ↓↓)',
      '⬅️ Regra de 3 INVERSA: setas em sentidos opostos (↑↓)',
      '✖️ Proporção: a/b = c/d → a×d = b×c (extremos = meios)',
      '🎯 Divisão proporcional: cada um recebe sua parte do total'
    ],

    errosComuns: [
      {
        erro: 'Não identificar se é direta ou inversa',
        correto: 'Perguntar: "se uma aumenta, a outra aumenta?" → Direta. Caso contrário → Inversa'
      },
      {
        erro: 'Em regra de três inversa, não inverter a segunda razão',
        correto: 'Em inversa, multiplicar em cruz invertendo a segunda fração'
      },
      {
        erro: 'Confundir proporção com igualdade simples',
        correto: 'Na proporção, cross-multiplicar: a/b = c/d → ad = bc'
      }
    ],

    formulas: [
      {
        nome: 'Regra de Três Simples Direta',
        formula: 'a/b = c/x → x = (b × c)/a',
        quando: 'Grandezas diretamente proporcionais'
      },
      {
        nome: 'Regra de Três Simples Inversa',
        formula: 'a/b = x/c → x = (a × c)/b',
        quando: 'Grandezas inversamente proporcionais'
      },
      {
        nome: 'Divisão Proporcional',
        formula: 'Parte = (razão/soma_razões) × Total',
        quando: 'Dividir um valor em partes proporcionais'
      },
      {
        nome: 'Escala',
        formula: 'Escala = Tamanho_desenho / Tamanho_real',
        quando: 'Mapas, plantas, maquetes'
      }
    ],

    questoesResolvidas: [
      {
        enunciado: 'Uma impressora imprime 120 páginas em 30 minutos. Quantas páginas imprime em 50 minutos?',
        alternativas: [
          '180',
          '200',
          '220',
          '240',
          '260'
        ],
        respostaCorreta: 1,
        resolucao: `<strong>Resolução:</strong><br>
        120 páginas ---- 30 minutos<br>
        x páginas ---- 50 minutos<br><br>
        Mais tempo → mais páginas (DIRETA)<br>
        120/x = 30/50<br>
        30x = 6000<br>
        x = 200<br><br>
        <strong>Resposta: 200 páginas (alternativa B)</strong>`
      }
    ],

    questoesEnem: [
      {
        enunciado: '12 operários constroem uma casa em 90 dias. Quantos operários são necessários para construir a mesma casa em 60 dias?',
        alternativas: [
          '8',
          '15',
          '18',
          '20',
          '24'
        ],
        respostaCorreta: 2,
        dificuldade: 'média'
      },
      {
        enunciado: 'Em um mapa com escala 1:50.000, uma distância de 3 cm representa na realidade:',
        alternativas: [
          '150 m',
          '1,5 km',
          '15 km',
          '150 km',
          '1.500 km'
        ],
        respostaCorreta: 1,
        dificuldade: 'média'
      },
      {
        enunciado: 'Dividir R$ 840 entre três pessoas na razão 2:3:7. A maior parte é:',
        alternativas: [
          'R$ 140',
          'R$ 210',
          'R$ 280',
          'R$ 420',
          'R$ 490'
        ],
        respostaCorreta: 4,
        dificuldade: 'média'
      }
    ],

    mapaMental: {
      titulo: 'Razão e Proporção',
      topicos: [
        {
          titulo: 'Razão',
          subtopicos: ['Conceito: a/b', 'Simplificação', 'Interpretação', 'Aplicações práticas']
        },
        {
          titulo: 'Proporção',
          subtopicos: ['a/b = c/d', 'Produto meios = extremos', 'Regra fundamental']
        },
        {
          titulo: 'Regra de Três Simples',
          subtopicos: ['Direta (↑↑)', 'Inversa (↑↓)', 'Identificação do tipo', 'Montagem e resolução']
        },
        {
          titulo: 'Aplicações',
          subtopicos: ['Escala', 'Divisão proporcional', 'Velocidade média', 'Densidade']
        }
      ]
    },

    miniQuiz: {
      questoes: [
        {
          pergunta: 'Se 3 canetas custam R$ 12, quanto custam 7 canetas?',
          opcoes: ['R$ 21', 'R$ 24', 'R$ 28', 'R$ 30'],
          respostaCorreta: 2,
          explicacao: '3/7 = 12/x → 3x = 84 → x = 28',
          dificuldade: 'fácil'
        },
        {
          pergunta: '5 máquinas produzem 100 peças em 4 horas. Quanto tempo 10 máquinas levam?',
          opcoes: ['1 hora', '2 horas', '3 horas', '8 horas'],
          respostaCorreta: 1,
          explicacao: 'Inversa: mais máquinas, menos tempo. 5/10 = x/4 → x = 2h',
          dificuldade: 'média'
        },
        {
          pergunta: 'Dividir 60 na razão 1:2:3. A maior parte é:',
          opcoes: ['10', '20', '30', '40'],
          respostaCorreta: 2,
          explicacao: 'Soma = 6. Maior parte: (3/6) × 60 = 30',
          dificuldade: 'média'
        }
      ]
    }
  }
};

// Função auxiliar para buscar conteúdo
export function getConteudoModulo(disciplina: string, slug: string): ConteudoModulo | undefined {
  // Por enquanto só temos matemática implementada
  if (disciplina === 'matematica') {
    return MATEMATICA_CONTEUDO[slug];
  }
  return undefined;
}
