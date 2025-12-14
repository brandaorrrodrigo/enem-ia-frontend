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

// =====================================================
// HISTORIA
// =====================================================

export const HISTORIA_CONTEUDO: Record<string, ConteudoModulo> = {
'brasil-colonia-economia-acucareira-e-sociedade-colonial': {
    slug: 'brasil-colonia-economia-acucareira-e-sociedade-colonial',
    resumo: `O período colonial brasileiro (séculos XVI a XVIII) foi marcado pela exploração portuguesa, com destaque para a produção de açúcar no Nordeste. A economia era voltada para o mercado externo, baseada no latifúndio, no trabalho escravizado e na monocultura. Essa estrutura econômica moldou também a organização social e o povoamento do território.`,

    explicacao: `<h2>📚 Brasil Colônia: economia açucareira e sociedade colonial</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Pacto Colonial e monopólio metropolitano</li>
      <li>Capitanias hereditárias e Governo-Geral</li>
      <li>Economia açucareira no Nordeste</li>
      <li>Trabalho escravizado africano</li>
      <li>Sociedade estamental (brancos, mestiços, negros escravizados)</li>
      <li>Casa-grande, senzala e engenho</li>
      <li>Presença holandesa no Nordeste</li>
      <li>Crises e deslocamento do eixo econômico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A colonização portuguesa no Brasil foi organizada para atender aos interesses econômicos da metrópole. O Pacto Colonial determinava que a colônia só podia negociar diretamente com Portugal. Nas áreas férteis do Nordeste, instalou-se a economia açucareira: grandes propriedades (latifúndios), monocultura de cana-de-açúcar e mão de obra escravizada africana. A sociedade era profundamente desigual e hierarquizada, com senhores de engenho no topo, homens livres pobres ao meio e escravizados na base. A presença holandesa em Pernambuco (1630–1654) modernizou a produção, mas, após a expulsão dos holandeses, a concorrência do açúcar caribenho e mudanças no mercado internacional provocaram a decadência relativa do açúcar brasileiro.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Um enunciado menciona: “grandes propriedades monocultoras, voltadas à exportação, com uso intensivo de mão de obra escravizada”. Pergunta: Esse modelo descreve principalmente: A) a mineração aurífera no século XVIII. B) a economia cafeeira do século XIX. C) a economia açucareira do período colonial. D) a pequena produção mercantil no Sul. Resolução comentada: A descrição combina latifúndio, monocultura e escravidão voltada à exportação, características típicas do ciclo do açúcar no Brasil colonial. Resposta: **C**. Exemplo 2 Um texto cita o senhor de engenho como “uma espécie de pequeno rei nos domínios rurais”, com poder econômico, político e religioso. Pergunta: Esse trecho revela: A) a centralidade das câmaras municipais. B) a força do poder local e da elite rural. C) a democracia social no meio rural. D) o enfraquecimento da monarquia portuguesa. Comentário: O senhor de engenho acumulava poder econômico, social e político local. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Um enunciado menciona: “grandes propriedades monocultoras, voltadas à exportação, com uso intensivo de mão de obra escravizada”. Pergunta: Esse modelo descreve principalmente: A) a mineração aurífera no século XVIII. B) a economia cafeeira do século XIX. C) a economia açucareira do período colonial. D) a pequena produção mercantil no Sul. Resolução comentada: A descrição combina latifúndio, monocultura e escravidão voltada à exportação, características típicas do ciclo do açúcar no Brasil colonial. Resposta: **C**. Exemplo 2 Um texto cita o senhor de engenho como “uma espécie de pequeno rei nos domínios rurais”, com poder econômico, político e religioso. Pergunta: Esse trecho revela: A) a centralidade das câmaras municipais. B) a força do poder local e da elite rural. C) a democracia social no meio rural. D) o enfraquecimento da monarquia portuguesa. Comentário: O senhor de engenho acumulava poder econômico, social e político local. Resposta: **B**.`
    ],

    memorizacao: [
      'Pacto Colonial e monopólio metropolitano',
      'Capitanias hereditárias e Governo-Geral',
      'Economia açucareira no Nordeste',
      'Trabalho escravizado africano',
      'Sociedade estamental (brancos, mestiços, negros escravizados)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Sobre o Pacto Colonial, assinale a alternativa correta:",
    "alternativas": [
      "A) Permitia à colônia negociar livremente com outras metrópoles.",
      "B) Limitava o comércio da colônia à metrópole.",
      "C) Garantia o fim da escravidão.",
      "D) Regulamentava apenas a produção de ouro."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Um enunciado menciona: “grandes propriedades monocultoras, voltadas à exportação, com uso intensivo de mão de obra escravizada”. Pergunta: Esse modelo descreve principalmente: A) a mineração aurífera no século XVIII. B) a economia cafeeira do século XIX. C) a economia açucareira do período colonial. D) a pequena produção mercantil no Sul. Resolução comentada: A descrição combina latifúndio, monocultura e escravidão voltada à exportação, características típicas do ciclo do açúcar no Brasil colonial. Resposta: **C**. Exemplo 2 Um texto cita o senhor de engenho como “uma espécie de pequeno rei nos domínios rurais”, com poder econômico, político e religioso. Pergunta: Esse trecho revela: A) a centralidade das câmaras municipais. B) a força do poder local e da elite rural. C) a democracia social no meio rural. D) o enfraquecimento da monarquia portuguesa. Comentário: O senhor de engenho acumulava poder econômico, social e político local. Resposta: **B**. "
  },
  {
    "enunciado": "2) A mão de obra predominante nos engenhos açucareiros coloniais era:",
    "alternativas": [
      "A) indígena assalariada.",
      "B) camponesa livre.",
      "C) escravizada africana.",
      "D) servil europeia."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Um enunciado menciona: “grandes propriedades monocultoras, voltadas à exportação, com uso intensivo de mão de obra escravizada”. Pergunta: Esse modelo descreve principalmente: A) a mineração aurífera no século XVIII. B) a economia cafeeira do século XIX. C) a economia açucareira do período colonial. D) a pequena produção mercantil no Sul. Resolução comentada: A descrição combina latifúndio, monocultura e escravidão voltada à exportação, características típicas do ciclo do açúcar no Brasil colonial. Resposta: **C**. Exemplo 2 Um texto cita o senhor de engenho como “uma espécie de pequeno rei nos domínios rurais”, com poder econômico, político e religioso. Pergunta: Esse trecho revela: A) a centralidade das câmaras municipais. B) a força do poder local e da elite rural. C) a democracia social no meio rural. D) o enfraquecimento da monarquia portuguesa. Comentário: O senhor de engenho acumulava poder econômico, social e político local. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A sociedade colonial açucareira pode ser descrita como:",
    "alternativas": [
      "A) igualitária, com mobilidade social ampla.",
      "B) rigidamente hierarquizada e escravista.",
      "C) urbana e industrializada.",
      "D) composta majoritariamente por pequenos proprietários."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A presença holandesa em Pernambuco (1630–1654) foi importante porque:",
    "alternativas": [
      "A) aboliu a escravidão africana.",
      "B) destruiu a economia açucareira.",
      "C) introduziu técnicas de refino e crédito.",
      "D) substituiu Portugal como metrópole."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A estrutura “latifúndio, monocultura, escravidão e exportação” é típica de:",
    "alternativas": [
      "A) plantation.",
      "B) minifúndio.",
      "C) economia de subsistência.",
      "D) cooperativa agrícola."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Brasil Colônia: economia açucareira e sociedade colonial',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Pacto Colonial e monopólio metropolitano',
            'Capitanias hereditárias e Governo-Geral',
            'Economia açucareira no Nordeste',
            'Trabalho escravizado africano'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Sobre o Pacto Colonial, assinale a alternativa correta:",
    "opcoes": [
      "A) Permitia à colônia negociar livremente com outras metrópoles.",
      "B) Limitava o comércio da colônia à metrópole.",
      "C) Garantia o fim da escravidão.",
      "D) Regulamentava apenas a produção de ouro."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Brasil Colônia foi estruturado para servir economicamente à metrópole portuguesa, com destaque para a produção de açúcar em grandes propriedades escravistas. A sociedade era profundamente desigual e hierarquizada. A presença holandesa impulsionou a modernização do setor, mas, após a expulsão, o Brasil enfrentou forte concorrência internacional. Esse modelo de economia exportadora escravista deixou marcas profundas na formação social e econômica do país. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A mão de obra predominante nos engenhos açucareiros coloniais era:",
    "opcoes": [
      "A) indígena assalariada.",
      "B) camponesa livre.",
      "C) escravizada africana.",
      "D) servil europeia."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Brasil Colônia foi estruturado para servir economicamente à metrópole portuguesa, com destaque para a produção de açúcar em grandes propriedades escravistas. A sociedade era profundamente desigual e hierarquizada. A presença holandesa impulsionou a modernização do setor, mas, após a expulsão, o Brasil enfrentou forte concorrência internacional. Esse modelo de economia exportadora escravista deixou marcas profundas na formação social e econômica do país. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A sociedade colonial açucareira pode ser descrita como:",
    "opcoes": [
      "A) igualitária, com mobilidade social ampla.",
      "B) rigidamente hierarquizada e escravista.",
      "C) urbana e industrializada.",
      "D) composta majoritariamente por pequenos proprietários."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Brasil Colônia foi estruturado para servir economicamente à metrópole portuguesa, com destaque para a produção de açúcar em grandes propriedades escravistas. A sociedade era profundamente desigual e hierarquizada. A presença holandesa impulsionou a modernização do setor, mas, após a expulsão, o Brasil enfrentou forte concorrência internacional. Esse modelo de economia exportadora escravista deixou marcas profundas na formação social e econômica do país. ",
    "dificuldade": "média"
  }
]
    }
  },

  'mineracao-e-mudancas-no-seculo-xviii': {
    slug: 'mineracao-e-mudancas-no-seculo-xviii',
    resumo: `A descoberta de ouro e diamantes em Minas Gerais, Goiás e Mato Grosso, no século XVIII, mudou o eixo econômico do Brasil do Nordeste para o Sudeste. A mineração intensificou o controle da Coroa portuguesa, provocou urbanização, circulação interna de pessoas e bens, e contribuiu para o surgimento de uma elite urbana e letrada.`,

    explicacao: `<h2>📚 Mineração e mudanças no século XVIII</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Descoberta do ouro em Minas Gerais</li>
      <li>Bandeirantes e interiorização</li>
      <li>Casas de Fundição e quinto</li>
      <li>Transferência do eixo econômico para o Sudeste</li>
      <li>Urbanização e vida nas vilas mineradoras</li>
      <li>Contrabando e repressão</li>
      <li>Crise do ouro e derrama</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Com o declínio relativo do açúcar, a descoberta de metais preciosos transformou a colônia. A Coroa aumentou o controle fiscal com o “quinto” (20% do ouro para Portugal) e as Casas de Fundição. As áreas mineradoras tiveram intensa urbanização, com surgimento de vilas e maior diversidade social, incluindo artesãos, comerciantes, padres e burocratas. A queda da produção e a cobrança de metas mínimas de arrecadação levaram a tensões como a “derrama” (cobrança forçada de impostos atrasados) e alimentaram movimentos de contestação, como a Inconfidência Mineira.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão menciona que a Coroa portuguesa exigia o envio de 100 arrobas anuais de ouro e ameaçava cobrar o imposto atrasado à força. Pergunta: Esse mecanismo é conhecido como: A) capitação. B) quinto. C) derrama. D) finta. Comentário: A cobrança compulsória dos impostos atrasados, quando a meta anual não era atingida, é chamada de derrama. Resposta: **C**. Exemplo 2 Um texto fala sobre a formação de vilas, circulação de ideias ilustradas e novas práticas culturais nas áreas de mineração. Pergunta: Isso expressa: A) ruralização da colônia. B) urbanização e diversificação social. C) retorno à economia açucareira. D) isolamento das capitanias. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão menciona que a Coroa portuguesa exigia o envio de 100 arrobas anuais de ouro e ameaçava cobrar o imposto atrasado à força. Pergunta: Esse mecanismo é conhecido como: A) capitação. B) quinto. C) derrama. D) finta. Comentário: A cobrança compulsória dos impostos atrasados, quando a meta anual não era atingida, é chamada de derrama. Resposta: **C**. Exemplo 2 Um texto fala sobre a formação de vilas, circulação de ideias ilustradas e novas práticas culturais nas áreas de mineração. Pergunta: Isso expressa: A) ruralização da colônia. B) urbanização e diversificação social. C) retorno à economia açucareira. D) isolamento das capitanias. Resposta: **B**.`
    ],

    memorizacao: [
      'Descoberta do ouro em Minas Gerais',
      'Bandeirantes e interiorização',
      'Casas de Fundição e quinto',
      'Transferência do eixo econômico para o Sudeste',
      'Urbanização e vida nas vilas mineradoras'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A descoberta do ouro no século XVIII deslocou o eixo econômico da colônia para:",
    "alternativas": [
      "A) Norte.",
      "B) Sul.",
      "C) Sudeste.",
      "D) Centro-Oeste exclusivamente."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão menciona que a Coroa portuguesa exigia o envio de 100 arrobas anuais de ouro e ameaçava cobrar o imposto atrasado à força. Pergunta: Esse mecanismo é conhecido como: A) capitação. B) quinto. C) derrama. D) finta. Comentário: A cobrança compulsória dos impostos atrasados, quando a meta anual não era atingida, é chamada de derrama. Resposta: **C**. Exemplo 2 Um texto fala sobre a formação de vilas, circulação de ideias ilustradas e novas práticas culturais nas áreas de mineração. Pergunta: Isso expressa: A) ruralização da colônia. B) urbanização e diversificação social. C) retorno à economia açucareira. D) isolamento das capitanias. Resposta: **B**. "
  },
  {
    "enunciado": "2) A função das Casas de Fundição era:",
    "alternativas": [
      "A) distribuir escravizados.",
      "B) refinar o açúcar.",
      "C) fundir o ouro, cunhar barras e cobrar impostos.",
      "D) registrar sesmarias."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão menciona que a Coroa portuguesa exigia o envio de 100 arrobas anuais de ouro e ameaçava cobrar o imposto atrasado à força. Pergunta: Esse mecanismo é conhecido como: A) capitação. B) quinto. C) derrama. D) finta. Comentário: A cobrança compulsória dos impostos atrasados, quando a meta anual não era atingida, é chamada de derrama. Resposta: **C**. Exemplo 2 Um texto fala sobre a formação de vilas, circulação de ideias ilustradas e novas práticas culturais nas áreas de mineração. Pergunta: Isso expressa: A) ruralização da colônia. B) urbanização e diversificação social. C) retorno à economia açucareira. D) isolamento das capitanias. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Uma consequência social da mineração foi:",
    "alternativas": [
      "A) diminuição do número de cidades.",
      "B) reforço do isolamento interno.",
      "C) aumento da urbanização e da mobilidade.",
      "D) fim da dependência de Portugal."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A derrama gerava insatisfação porque:",
    "alternativas": [
      "A) perdoava dívidas dos grandes mineradores.",
      "B) confiscava bens para atingir a meta de arrecadação.",
      "C) aboliu o quinto.",
      "D) concedia mais autonomia às vilas."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Inconfidência Mineira foi influenciada, entre outros fatores:",
    "alternativas": [
      "A) pela expansão da escravidão africana.",
      "B) pela crise do ouro e ameaça da derrama.",
      "C) pela recuperação da economia açucareira.",
      "D) pela independência dos EUA, mas sem relação com impostos."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Mineração e mudanças no século XVIII',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Descoberta do ouro em Minas Gerais',
            'Bandeirantes e interiorização',
            'Casas de Fundição e quinto',
            'Transferência do eixo econômico para o Sudeste'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A descoberta do ouro no século XVIII deslocou o eixo econômico da colônia para:",
    "opcoes": [
      "A) Norte.",
      "B) Sul.",
      "C) Sudeste.",
      "D) Centro-Oeste exclusivamente."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração reorganizou o espaço, a economia e a sociedade colonial, aproximando a colônia de debates ilustrados e intensificando o controle metropolitano. O auge e a crise do ouro reforçaram conflitos que alimentaram movimentos de contestação à dominação portuguesa. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A função das Casas de Fundição era:",
    "opcoes": [
      "A) distribuir escravizados.",
      "B) refinar o açúcar.",
      "C) fundir o ouro, cunhar barras e cobrar impostos.",
      "D) registrar sesmarias."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração reorganizou o espaço, a economia e a sociedade colonial, aproximando a colônia de debates ilustrados e intensificando o controle metropolitano. O auge e a crise do ouro reforçaram conflitos que alimentaram movimentos de contestação à dominação portuguesa. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Uma consequência social da mineração foi:",
    "opcoes": [
      "A) diminuição do número de cidades.",
      "B) reforço do isolamento interno.",
      "C) aumento da urbanização e da mobilidade.",
      "D) fim da dependência de Portugal."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração reorganizou o espaço, a economia e a sociedade colonial, aproximando a colônia de debates ilustrados e intensificando o controle metropolitano. O auge e a crise do ouro reforçaram conflitos que alimentaram movimentos de contestação à dominação portuguesa. ",
    "dificuldade": "média"
  }
]
    }
  },

  'independencia-do-brasil-e-primeiro-reinado': {
    slug: 'independencia-do-brasil-e-primeiro-reinado',
    resumo: `A Independência do Brasil, em 1822, foi um processo articulado pelas elites, que buscavam manter privilégios e evitar rupturas sociais. O Primeiro Reinado, sob D. Pedro I, foi marcado por conflitos políticos, centralização e insatisfação popular, culminando na abdicação em 1831.`,

    explicacao: `<h2>📚 Independência do Brasil e Primeiro Reinado</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução do Porto (1820)</li>
      <li>Retorno de D. João VI a Portugal</li>
      <li>“Fico” de D. Pedro (1822)</li>
      <li>Proclamação da Independência</li>
      <li>Constituição de 1824 e Poder Moderador</li>
      <li>Confederação do Equador</li>
      <li>Abdicação de D. Pedro I</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Revolução Liberal do Porto exigiu o retorno de D. João VI e a recolonização do Brasil. As elites brasileiras temiam perder autonomia e pressionaram D. Pedro a permanecer, resultando no “Dia do Fico”. Com o rompimento progressivo com Lisboa, D. Pedro proclamou a Independência em 7 de setembro de 1822. A Constituição de 1824 instituiu o Poder Moderador, dando ao imperador grande controle sobre os outros poderes. Conflitos como a Confederação do Equador expressaram insatisfação com a centralização. A crise econômica, oposição política e perda de apoio levaram à abdicação, abrindo o período regencial.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Um texto destaca que a Independência do Brasil manteve a escravidão, a grande propriedade e a estrutura social. Pergunta: Isso indica que a Independência foi, sobretudo: A) uma revolução social. B) uma ruptura radical com as estruturas coloniais. C) um acordo de elites para manter privilégios. D) um movimento popular sem participação da elite. Resposta: **C**. Exemplo 2 A Constituição de 1824 criou o Poder Moderador, que: A) enfraquecia o imperador. B) permitia ao imperador intervir nos demais poderes. C) era exercido apenas pelo Parlamento. D) garantia a separação absoluta entre os poderes. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Um texto destaca que a Independência do Brasil manteve a escravidão, a grande propriedade e a estrutura social. Pergunta: Isso indica que a Independência foi, sobretudo: A) uma revolução social. B) uma ruptura radical com as estruturas coloniais. C) um acordo de elites para manter privilégios. D) um movimento popular sem participação da elite. Resposta: **C**. Exemplo 2 A Constituição de 1824 criou o Poder Moderador, que: A) enfraquecia o imperador. B) permitia ao imperador intervir nos demais poderes. C) era exercido apenas pelo Parlamento. D) garantia a separação absoluta entre os poderes. Resposta: **B**.`
    ],

    memorizacao: [
      'Revolução do Porto (1820)',
      'Retorno de D. João VI a Portugal',
      '“Fico” de D. Pedro (1822)',
      'Proclamação da Independência',
      'Constituição de 1824 e Poder Moderador'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Revolução do Porto exigia:",
    "alternativas": [
      "A) independência imediata do Brasil.",
      "B) fim do absolutismo e retorno de D. João VI.",
      "C) abolição da escravidão nas colônias.",
      "D) criação da República no Brasil."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Um texto destaca que a Independência do Brasil manteve a escravidão, a grande propriedade e a estrutura social. Pergunta: Isso indica que a Independência foi, sobretudo: A) uma revolução social. B) uma ruptura radical com as estruturas coloniais. C) um acordo de elites para manter privilégios. D) um movimento popular sem participação da elite. Resposta: **C**. Exemplo 2 A Constituição de 1824 criou o Poder Moderador, que: A) enfraquecia o imperador. B) permitia ao imperador intervir nos demais poderes. C) era exercido apenas pelo Parlamento. D) garantia a separação absoluta entre os poderes. Resposta: **B**. "
  },
  {
    "enunciado": "2) O “Dia do Fico” significou:",
    "alternativas": [
      "A) a abdicação de D. Pedro.",
      "B) a volta de D. Pedro a Portugal.",
      "C) a decisão de D. Pedro de permanecer no Brasil.",
      "D) a coroação de D. Pedro I."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Um texto destaca que a Independência do Brasil manteve a escravidão, a grande propriedade e a estrutura social. Pergunta: Isso indica que a Independência foi, sobretudo: A) uma revolução social. B) uma ruptura radical com as estruturas coloniais. C) um acordo de elites para manter privilégios. D) um movimento popular sem participação da elite. Resposta: **C**. Exemplo 2 A Constituição de 1824 criou o Poder Moderador, que: A) enfraquecia o imperador. B) permitia ao imperador intervir nos demais poderes. C) era exercido apenas pelo Parlamento. D) garantia a separação absoluta entre os poderes. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Confederação do Equador foi:",
    "alternativas": [
      "A) um movimento separatista de caráter liberal no Nordeste.",
      "B) uma confederação de províncias mineradoras.",
      "C) uma guerra entre Brasil e Portugal.",
      "D) um pacto de apoio ao absolutismo."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A Independência do Brasil:",
    "alternativas": [
      "A) aboliu a escravidão de imediato.",
      "B) manteve a monarquia e a escravidão.",
      "C) instaurou uma república federativa.",
      "D) extinguiu o Poder Moderador."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A abdicação de D. Pedro I decorreu, entre outros fatores:",
    "alternativas": [
      "A) da forte popularidade do imperador.",
      "B) da ausência de conflitos regionais.",
      "C) de crises políticas, econômicas e perda de apoio.",
      "D) da intervenção direta da Inglaterra."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Independência do Brasil e Primeiro Reinado',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução do Porto (1820)',
            'Retorno de D. João VI a Portugal',
            '“Fico” de D. Pedro (1822)',
            'Proclamação da Independência'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Revolução do Porto exigia:",
    "opcoes": [
      "A) independência imediata do Brasil.",
      "B) fim do absolutismo e retorno de D. João VI.",
      "C) abolição da escravidão nas colônias.",
      "D) criação da República no Brasil."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência consolidou a autonomia política do Brasil, mas preservou estruturas sociais excludentes. O Primeiro Reinado evidenciou tensões entre centralização imperial e demandas regionais, preparando o terreno para novas experiências políticas no período regencial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O “Dia do Fico” significou:",
    "opcoes": [
      "A) a abdicação de D. Pedro.",
      "B) a volta de D. Pedro a Portugal.",
      "C) a decisão de D. Pedro de permanecer no Brasil.",
      "D) a coroação de D. Pedro I."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência consolidou a autonomia política do Brasil, mas preservou estruturas sociais excludentes. O Primeiro Reinado evidenciou tensões entre centralização imperial e demandas regionais, preparando o terreno para novas experiências políticas no período regencial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Confederação do Equador foi:",
    "opcoes": [
      "A) um movimento separatista de caráter liberal no Nordeste.",
      "B) uma confederação de províncias mineradoras.",
      "C) uma guerra entre Brasil e Portugal.",
      "D) um pacto de apoio ao absolutismo."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência consolidou a autonomia política do Brasil, mas preservou estruturas sociais excludentes. O Primeiro Reinado evidenciou tensões entre centralização imperial e demandas regionais, preparando o terreno para novas experiências políticas no período regencial. ",
    "dificuldade": "média"
  }
]
    }
  },

  'segundo-reinado-e-cafe-no-seculo-xix': {
    slug: 'segundo-reinado-e-cafe-no-seculo-xix',
    resumo: `O Segundo Reinado (1840–1889) foi marcado pela expansão cafeeira, pelo fortalecimento do Estado imperial, pela modernização econômica gradual e por tensões ligadas à escravidão e à questão militar, culminando na Proclamação da República.`,

    explicacao: `<h2>📚 Segundo Reinado e café no século XIX</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Café no Vale do Paraíba e Oeste Paulista</li>
      <li>Escravidão e tráfico atlântico</li>
      <li>Lei Eusébio de Queirós, Lei do Ventre Livre, Lei dos Sexagenários, Lei Áurea</li>
      <li>Imigração europeia</li>
      <li>Estado monárquico e Parlamentarismo às avessas</li>
      <li>Guerra do Paraguai</li>
      <li>Crise do Império e movimentos republicanos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O café tornou-se o principal produto de exportação, enriquecendo fazendeiros e financiando infraestrutura, como estradas de ferro. Inicialmente baseado em trabalho escravizado, o setor cafeeiro migrou gradualmente para a imigração europeia, especialmente em São Paulo, com o avanço da campanha abolicionista e a restrição ao tráfico. A Guerra do Paraguai (1864–1870) reforçou o protagonismo do Exército, que mais tarde se chocaria com a monarquia. O desgaste da instituição imperial, as críticas da Igreja, as pressões abolicionistas e o fortalecimento de elites republicanas abriram caminho para a queda da monarquia em 1889.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão mostra um gráfico de exportações no século XIX com forte crescimento do café. Pergunta: Esse fenômeno está associado: A) à industrialização pesada brasileira. B) à diminuição da integração ao mercado internacional. C) à formação de uma elite cafeeira poderosa. D) ao fim da economia agroexportadora. Resposta: **C**. Exemplo 2 Uma lei proibia o tráfico negreiro a partir de 1850. Pergunta: Trata-se da: A) Lei do Ventre Livre. B) Lei Eusébio de Queirós. C) Lei dos Sexagenários. D) Lei Áurea. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão mostra um gráfico de exportações no século XIX com forte crescimento do café. Pergunta: Esse fenômeno está associado: A) à industrialização pesada brasileira. B) à diminuição da integração ao mercado internacional. C) à formação de uma elite cafeeira poderosa. D) ao fim da economia agroexportadora. Resposta: **C**. Exemplo 2 Uma lei proibia o tráfico negreiro a partir de 1850. Pergunta: Trata-se da: A) Lei do Ventre Livre. B) Lei Eusébio de Queirós. C) Lei dos Sexagenários. D) Lei Áurea. Resposta: **B**.`
    ],

    memorizacao: [
      'Café no Vale do Paraíba e Oeste Paulista',
      'Escravidão e tráfico atlântico',
      'Lei Eusébio de Queirós, Lei do Ventre Livre, Lei dos Sexagenários, Lei Áurea',
      'Imigração europeia',
      'Estado monárquico e Parlamentarismo às avessas'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O ciclo do café contribuiu para:",
    "alternativas": [
      "A) reduzir a influência das elites agrárias.",
      "B) aumentar o peso econômico do Sudeste.",
      "C) isolar o Brasil do comércio mundial.",
      "D) acelerar o fim da escravidão em 1800."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um gráfico de exportações no século XIX com forte crescimento do café. Pergunta: Esse fenômeno está associado: A) à industrialização pesada brasileira. B) à diminuição da integração ao mercado internacional. C) à formação de uma elite cafeeira poderosa. D) ao fim da economia agroexportadora. Resposta: **C**. Exemplo 2 Uma lei proibia o tráfico negreiro a partir de 1850. Pergunta: Trata-se da: A) Lei do Ventre Livre. B) Lei Eusébio de Queirós. C) Lei dos Sexagenários. D) Lei Áurea. Resposta: **B**. "
  },
  {
    "enunciado": "2) A transição da mão de obra escravizada para a imigrante teve destaque em:",
    "alternativas": [
      "A) Pernambuco açucareiro.",
      "B) região mineradora de Minas.",
      "C) Oeste Paulista.",
      "D) Sertão nordestino."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um gráfico de exportações no século XIX com forte crescimento do café. Pergunta: Esse fenômeno está associado: A) à industrialização pesada brasileira. B) à diminuição da integração ao mercado internacional. C) à formação de uma elite cafeeira poderosa. D) ao fim da economia agroexportadora. Resposta: **C**. Exemplo 2 Uma lei proibia o tráfico negreiro a partir de 1850. Pergunta: Trata-se da: A) Lei do Ventre Livre. B) Lei Eusébio de Queirós. C) Lei dos Sexagenários. D) Lei Áurea. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Guerra do Paraguai fortaleceu:",
    "alternativas": [
      "A) a monarquia sem questionamentos.",
      "B) o Exército como ator político.",
      "C) o isolamento internacional do Brasil.",
      "D) os laços com Portugal."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A campanha abolicionista ganhou força na segunda metade do século XIX com:",
    "alternativas": [
      "A) apoio exclusivo da corte.",
      "B) participação de intelectuais, escravizados e setores urbanos.",
      "C) rejeição total da imprensa.",
      "D) defesa unânime dos fazendeiros."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Proclamação da República (1889) envolveu principalmente:",
    "alternativas": [
      "A) um grande levante popular camponês.",
      "B) a ação de militares e elites descontentes.",
      "C) a pressão direta da Inglaterra.",
      "D) um plebiscito nacional."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Segundo Reinado e café no século XIX',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Café no Vale do Paraíba e Oeste Paulista',
            'Escravidão e tráfico atlântico',
            'Lei Eusébio de Queirós, Lei do Ventre Livre, Lei dos Sexagenários, Lei Áurea',
            'Imigração europeia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O ciclo do café contribuiu para:",
    "opcoes": [
      "A) reduzir a influência das elites agrárias.",
      "B) aumentar o peso econômico do Sudeste.",
      "C) isolar o Brasil do comércio mundial.",
      "D) acelerar o fim da escravidão em 1800."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Segundo Reinado foi o auge da economia cafeeira e da monarquia, mas também o período em que se acumularam contradições sociais, raciais e políticas. A combinação de modernização econômica, manutenção da escravidão até 1888 e tensões entre elites e monarquia resultou na queda do regime imperial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A transição da mão de obra escravizada para a imigrante teve destaque em:",
    "opcoes": [
      "A) Pernambuco açucareiro.",
      "B) região mineradora de Minas.",
      "C) Oeste Paulista.",
      "D) Sertão nordestino."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Segundo Reinado foi o auge da economia cafeeira e da monarquia, mas também o período em que se acumularam contradições sociais, raciais e políticas. A combinação de modernização econômica, manutenção da escravidão até 1888 e tensões entre elites e monarquia resultou na queda do regime imperial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Guerra do Paraguai fortaleceu:",
    "opcoes": [
      "A) a monarquia sem questionamentos.",
      "B) o Exército como ator político.",
      "C) o isolamento internacional do Brasil.",
      "D) os laços com Portugal."
    ],
    "respostaCorreta": 1,
    "explicacao": "O Segundo Reinado foi o auge da economia cafeeira e da monarquia, mas também o período em que se acumularam contradições sociais, raciais e políticas. A combinação de modernização econômica, manutenção da escravidão até 1888 e tensões entre elites e monarquia resultou na queda do regime imperial. ",
    "dificuldade": "média"
  }
]
    }
  },

  'republica-velha-coronelismo-e-politica-do-cafe-com-leite': {
    slug: 'republica-velha-coronelismo-e-politica-do-cafe-com-leite',
    resumo: `A República Velha (1889–1930) foi marcada pela predominância das oligarquias estaduais, especialmente São Paulo (café) e Minas Gerais (leite), pelo coronelismo e pelo voto controlado, com baixa participação popular efetiva.`,

    explicacao: `<h2>📚 República Velha: coronelismo e política do café-com-leite</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Proclamação da República</li>
      <li>Constituição de 1891</li>
      <li>Federalismo oligárquico</li>
      <li>Política do café-com-leite</li>
      <li>Coronelismo e voto de cabresto</li>
      <li>Movimentos sociais: Canudos, Contestado, movimentos operários</li>
      <li>Crise de 1929 e fim da República Velha</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Proclamação da República não significou democratização imediata. A política foi dominada por oligarquias regionais, com destaque para a aliança entre São Paulo e Minas, conhecida como “política do café-com-leite”. Coronéis controlavam votos em áreas rurais, usando dependência econômica e violência. Conflitos como Canudos e Contestado revelaram o choque entre o Estado republicano e populações pobres do interior. A crise de 1929 abalou o café, gerando insatisfação e abrindo espaço para a Revolução de 1930, que encerrou a República Velha.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma charge mostra coronéis conduzindo eleitores como gado até as urnas. Pergunta: A crítica se refere a: A) voto secreto. B) voto de cabresto. C) sufrágio universal. D) plebiscito popular. Resposta: **B**. Exemplo 2 Uma questão relaciona café-com-leite à alternância de presidentes. Comentário: A expressão descreve a hegemonia de São Paulo (café) e Minas Gerais (leite) na presidência.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma charge mostra coronéis conduzindo eleitores como gado até as urnas. Pergunta: A crítica se refere a: A) voto secreto. B) voto de cabresto. C) sufrágio universal. D) plebiscito popular. Resposta: **B**. Exemplo 2 Uma questão relaciona café-com-leite à alternância de presidentes. Comentário: A expressão descreve a hegemonia de São Paulo (café) e Minas Gerais (leite) na presidência.`
    ],

    memorizacao: [
      'Proclamação da República',
      'Constituição de 1891',
      'Federalismo oligárquico',
      'Política do café-com-leite',
      'Coronelismo e voto de cabresto'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O coronelismo pode ser definido como:",
    "alternativas": [
      "A) poder dos militares sobre as cidades.",
      "B) domínio de grandes proprietários rurais sobre população e votos.",
      "C) regime de partidos fortes e independentes.",
      "D) sistema de eleições secretas e livres."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma charge mostra coronéis conduzindo eleitores como gado até as urnas. Pergunta: A crítica se refere a: A) voto secreto. B) voto de cabresto. C) sufrágio universal. D) plebiscito popular. Resposta: **B**. Exemplo 2 Uma questão relaciona café-com-leite à alternância de presidentes. Comentário: A expressão descreve a hegemonia de São Paulo (café) e Minas Gerais (leite) na presidência. "
  },
  {
    "enunciado": "2) A política do café-com-leite foi uma:",
    "alternativas": [
      "A) aliança entre industriais e operários.",
      "B) alternância planejada de presidentes paulistas e mineiros.",
      "C) redistribuição igualitária de renda.",
      "D) política de seguridade social."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma charge mostra coronéis conduzindo eleitores como gado até as urnas. Pergunta: A crítica se refere a: A) voto secreto. B) voto de cabresto. C) sufrágio universal. D) plebiscito popular. Resposta: **B**. Exemplo 2 Uma questão relaciona café-com-leite à alternância de presidentes. Comentário: A expressão descreve a hegemonia de São Paulo (café) e Minas Gerais (leite) na presidência. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O movimento de Canudos ocorreu em:",
    "alternativas": [
      "A) Minas Gerais.",
      "B) Rio de Janeiro.",
      "C) Bahia.",
      "D) Rio Grande do Sul."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Uma consequência da crise de 1929 para o Brasil foi:",
    "alternativas": [
      "A) fortalecimento imediato do Império.",
      "B) valorização automática do café.",
      "C) crise do café e desgaste das oligarquias.",
      "D) fim da industrialização."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O voto durante a República Velha era:",
    "alternativas": [
      "A) secreto e obrigatório a todos.",
      "B) aberto e sujeito a fraudes.",
      "C) eletrônico.",
      "D) limitado apenas a mulheres."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'República Velha: coronelismo e política do café-com-leite',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Proclamação da República',
            'Constituição de 1891',
            'Federalismo oligárquico',
            'Política do café-com-leite'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O coronelismo pode ser definido como:",
    "opcoes": [
      "A) poder dos militares sobre as cidades.",
      "B) domínio de grandes proprietários rurais sobre população e votos.",
      "C) regime de partidos fortes e independentes.",
      "D) sistema de eleições secretas e livres."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha consolidou um sistema político excludente, controlado por poucas famílias e grupos regionais. A falta de participação popular e o uso da máquina pública para sustentar interesses privados prepararam o terreno para mudanças profundas em 1930. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A política do café-com-leite foi uma:",
    "opcoes": [
      "A) aliança entre industriais e operários.",
      "B) alternância planejada de presidentes paulistas e mineiros.",
      "C) redistribuição igualitária de renda.",
      "D) política de seguridade social."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha consolidou um sistema político excludente, controlado por poucas famílias e grupos regionais. A falta de participação popular e o uso da máquina pública para sustentar interesses privados prepararam o terreno para mudanças profundas em 1930. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O movimento de Canudos ocorreu em:",
    "opcoes": [
      "A) Minas Gerais.",
      "B) Rio de Janeiro.",
      "C) Bahia.",
      "D) Rio Grande do Sul."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha consolidou um sistema político excludente, controlado por poucas famílias e grupos regionais. A falta de participação popular e o uso da máquina pública para sustentar interesses privados prepararam o terreno para mudanças profundas em 1930. ",
    "dificuldade": "média"
  }
]
    }
  },

  'era-vargas-19301945-estado-trabalho-e-industrializacao': {
    slug: 'era-vargas-19301945-estado-trabalho-e-industrializacao',
    resumo: `A Era Vargas inaugurou uma nova forma de Estado no Brasil, com maior intervenção econômica, legislação trabalhista e construção de uma identidade nacional, ao mesmo tempo em que consolidou práticas autoritárias, especialmente no Estado Novo.`,

    explicacao: `<h2>📚 Era Vargas (1930–1945): Estado, trabalho e industrialização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução de 1930</li>
      <li>Governo Provisório e Governo Constitucional</li>
      <li>Estado Novo (1937–1945)</li>
      <li>Trabalhismo e CLT</li>
      <li>Controle dos sindicatos</li>
      <li>Propaganda e cultura nacional</li>
      <li>Início da industrialização de base</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Vargas chegou ao poder em 1930, rompendo com o domínio das oligarquias. Seu governo combinou concessões às classes trabalhadoras urbanas (leis trabalhistas, salário mínimo, carteira assinada) com controle político sobre sindicatos. O Estado Novo, instaurado em 1937, suspendeu liberdades civis, fechou o Congresso e concentrou poder no Executivo. Simultaneamente, o governo estimulou a industrialização e utilizou propaganda para difundir símbolos nacionais, fortalecendo a ideia de “nação brasileira”.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão destaca a carteira de trabalho, férias remuneradas e jornada regulada. Pergunta: Essas medidas se relacionam à: A) política agrária da República Velha. B) CLT na Era Vargas. C) escravidão no Império. D) reformas liberais da década de 1990. Resposta: **B**. Exemplo 2 O Estado Novo (1937–1945) pode ser caracterizado como: A) república parlamentar. B) democracia liberal plena. C) regime ditatorial centralizado. D) monarquia constitucional. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão destaca a carteira de trabalho, férias remuneradas e jornada regulada. Pergunta: Essas medidas se relacionam à: A) política agrária da República Velha. B) CLT na Era Vargas. C) escravidão no Império. D) reformas liberais da década de 1990. Resposta: **B**. Exemplo 2 O Estado Novo (1937–1945) pode ser caracterizado como: A) república parlamentar. B) democracia liberal plena. C) regime ditatorial centralizado. D) monarquia constitucional. Resposta: **C**.`
    ],

    memorizacao: [
      'Revolução de 1930',
      'Governo Provisório e Governo Constitucional',
      'Estado Novo (1937–1945)',
      'Trabalhismo e CLT',
      'Controle dos sindicatos'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Revolução de 1930 rompeu com:",
    "alternativas": [
      "A) o Estado Novo.",
      "B) o Império.",
      "C) a República Velha oligárquica.",
      "D) a Ditadura Militar."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a carteira de trabalho, férias remuneradas e jornada regulada. Pergunta: Essas medidas se relacionam à: A) política agrária da República Velha. B) CLT na Era Vargas. C) escravidão no Império. D) reformas liberais da década de 1990. Resposta: **B**. Exemplo 2 O Estado Novo (1937–1945) pode ser caracterizado como: A) república parlamentar. B) democracia liberal plena. C) regime ditatorial centralizado. D) monarquia constitucional. Resposta: **C**. "
  },
  {
    "enunciado": "2) A CLT – Consolidação das Leis do Trabalho – foi:",
    "alternativas": [
      "A) um código exclusivamente rural.",
      "B) um conjunto de leis trabalhistas voltadas ao trabalhador urbano.",
      "C) uma reforma tributária.",
      "D) uma lei apenas simbólica."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a carteira de trabalho, férias remuneradas e jornada regulada. Pergunta: Essas medidas se relacionam à: A) política agrária da República Velha. B) CLT na Era Vargas. C) escravidão no Império. D) reformas liberais da década de 1990. Resposta: **B**. Exemplo 2 O Estado Novo (1937–1945) pode ser caracterizado como: A) república parlamentar. B) democracia liberal plena. C) regime ditatorial centralizado. D) monarquia constitucional. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) No Estado Novo, Vargas:",
    "alternativas": [
      "A) ampliou liberdades civis.",
      "B) fechou o Congresso e concentrou poder.",
      "C) restaurou a monarquia.",
      "D) implantou voto direto para todos."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A política de Vargas com o trabalhador urbano combinava:",
    "alternativas": [
      "A) direitos + propaganda + controle sindical.",
      "B) abolição de todos os direitos.",
      "C) terceirização total.",
      "D) proibição do sindicalismo."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Uma marca da Era Vargas foi:",
    "alternativas": [
      "A) total ausência de intervenção estatal.",
      "B) fortalecimento do Estado e incentivo à indústria.",
      "C) privatização completa de empresas.",
      "D) retorno ao modelo escravista."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Era Vargas (1930–1945): Estado, trabalho e industrialização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução de 1930',
            'Governo Provisório e Governo Constitucional',
            'Estado Novo (1937–1945)',
            'Trabalhismo e CLT'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Revolução de 1930 rompeu com:",
    "opcoes": [
      "A) o Estado Novo.",
      "B) o Império.",
      "C) a República Velha oligárquica.",
      "D) a Ditadura Militar."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas representou uma virada na relação entre Estado, economia e sociedade, com a criação de direitos trabalhistas e reforço do poder central. O período deixou heranças duradouras na legislação social e na configuração política brasileira. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A CLT – Consolidação das Leis do Trabalho – foi:",
    "opcoes": [
      "A) um código exclusivamente rural.",
      "B) um conjunto de leis trabalhistas voltadas ao trabalhador urbano.",
      "C) uma reforma tributária.",
      "D) uma lei apenas simbólica."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas representou uma virada na relação entre Estado, economia e sociedade, com a criação de direitos trabalhistas e reforço do poder central. O período deixou heranças duradouras na legislação social e na configuração política brasileira. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) No Estado Novo, Vargas:",
    "opcoes": [
      "A) ampliou liberdades civis.",
      "B) fechou o Congresso e concentrou poder.",
      "C) restaurou a monarquia.",
      "D) implantou voto direto para todos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas representou uma virada na relação entre Estado, economia e sociedade, com a criação de direitos trabalhistas e reforço do poder central. O período deixou heranças duradouras na legislação social e na configuração política brasileira. ",
    "dificuldade": "média"
  }
]
    }
  },

  'ditadura-militar-19641985': {
    slug: 'ditadura-militar-19641985',
    resumo: `O regime instaurado em 1964 interrompeu a ordem democrática, com apoio de setores civis e militares, instaurando censura, repressão política e restrição de direitos, ao mesmo tempo em que promoveu projetos de modernização econômica.`,

    explicacao: `<h2>📚 Ditadura Militar (1964–1985)</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Golpe de 1964</li>
      <li>Atos Institucionais (AI-1, AI-2, AI-5)</li>
      <li>Bipartidarismo (ARENA e MDB)</li>
      <li>Milagre econômico e desigualdade</li>
      <li>Censura, tortura e repressão</li>
      <li>Movimento estudantil, greves, oposição</li>
      <li>Abertura lenta, gradual e segura</li>
      <li>Diretas Já e fim do regime</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A justificativa do golpe foi combater a “ameaça comunista” e a “subversão”. Os Atos Institucionais ampliaram o poder do Executivo, cassaram mandatos e direitos políticos. O AI-5 (1968) representou o auge da repressão, com fechamento do Congresso e intensificação da censura e da violência de Estado. O “milagre econômico” (crescimento acelerado do PIB) conviveu com aumento da concentração de renda e exclusão social. Na década de 1970, crises econômicas e pressões sociais levaram à gradativa abertura política, culminando na eleição indireta de Tancredo Neves e no fim formal da ditadura.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão fala em crescimento econômico acelerado, grande endividamento e aumento da desigualdade nos anos 1970. Trata-se do: A) milagre econômico. B) Plano Real. C) Encilhamento. D) Plano de Metas. Resposta: **A**. Exemplo 2 Um trecho menciona: “suspensão de garantias constitucionais, intervenção nos Estados, censura e repressão a opositores”. Refere-se ao: A) AI-5. B) voto distrital. C) Constituição de 1946. D) Ato da Anistia. Resposta: **A**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão fala em crescimento econômico acelerado, grande endividamento e aumento da desigualdade nos anos 1970. Trata-se do: A) milagre econômico. B) Plano Real. C) Encilhamento. D) Plano de Metas. Resposta: **A**. Exemplo 2 Um trecho menciona: “suspensão de garantias constitucionais, intervenção nos Estados, censura e repressão a opositores”. Refere-se ao: A) AI-5. B) voto distrital. C) Constituição de 1946. D) Ato da Anistia. Resposta: **A**.`
    ],

    memorizacao: [
      'Golpe de 1964',
      'Atos Institucionais (AI-1, AI-2, AI-5)',
      'Bipartidarismo (ARENA e MDB)',
      'Milagre econômico e desigualdade',
      'Censura, tortura e repressão'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O golpe de 1964 foi apoiado por:",
    "alternativas": [
      "A) apenas sindicatos rurais.",
      "B) partes das Forças Armadas, elites econômicas e setores da classe média.",
      "C) unanimidade popular.",
      "D) apenas estudantes."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão fala em crescimento econômico acelerado, grande endividamento e aumento da desigualdade nos anos 1970. Trata-se do: A) milagre econômico. B) Plano Real. C) Encilhamento. D) Plano de Metas. Resposta: **A**. Exemplo 2 Um trecho menciona: “suspensão de garantias constitucionais, intervenção nos Estados, censura e repressão a opositores”. Refere-se ao: A) AI-5. B) voto distrital. C) Constituição de 1946. D) Ato da Anistia. Resposta: **A**. "
  },
  {
    "enunciado": "2) O bipartidarismo impôs:",
    "alternativas": [
      "A) multipardidarismo.",
      "B) dois partidos oficiais (ARENA e MDB).",
      "C) partido único.",
      "D) proibição completa de partidos."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão fala em crescimento econômico acelerado, grande endividamento e aumento da desigualdade nos anos 1970. Trata-se do: A) milagre econômico. B) Plano Real. C) Encilhamento. D) Plano de Metas. Resposta: **A**. Exemplo 2 Um trecho menciona: “suspensão de garantias constitucionais, intervenção nos Estados, censura e repressão a opositores”. Refere-se ao: A) AI-5. B) voto distrital. C) Constituição de 1946. D) Ato da Anistia. Resposta: **A**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O “milagre econômico” teve como efeito:",
    "alternativas": [
      "A) crescimento com distribuição de renda.",
      "B) recessão profunda.",
      "C) crescimento econômico com desigualdade.",
      "D) fim das exportações."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) As Diretas Já defendiam:",
    "alternativas": [
      "A) eleições diretas para presidente.",
      "B) volta da monarquia.",
      "C) censura à imprensa.",
      "D) fortalecimento do regime militar."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Anistia de 1979:",
    "alternativas": [
      "A) puniu todos os torturadores.",
      "B) permitiu retorno de exilados e libertação de presos políticos.",
      "C) reforçou a repressão.",
      "D) extinguiu o multipartidarismo."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Ditadura Militar (1964–1985)',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Golpe de 1964',
            'Atos Institucionais (AI-1, AI-2, AI-5)',
            'Bipartidarismo (ARENA e MDB)',
            'Milagre econômico e desigualdade'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O golpe de 1964 foi apoiado por:",
    "opcoes": [
      "A) apenas sindicatos rurais.",
      "B) partes das Forças Armadas, elites econômicas e setores da classe média.",
      "C) unanimidade popular.",
      "D) apenas estudantes."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Ditadura Militar marcou profundamente a política, a economia e os direitos humanos no Brasil. O regime combinou autoritarismo, modernização econômica e forte repressão, gerando debates e memórias que ainda influenciam a sociedade brasileira. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O bipartidarismo impôs:",
    "opcoes": [
      "A) multipardidarismo.",
      "B) dois partidos oficiais (ARENA e MDB).",
      "C) partido único.",
      "D) proibição completa de partidos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Ditadura Militar marcou profundamente a política, a economia e os direitos humanos no Brasil. O regime combinou autoritarismo, modernização econômica e forte repressão, gerando debates e memórias que ainda influenciam a sociedade brasileira. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O “milagre econômico” teve como efeito:",
    "opcoes": [
      "A) crescimento com distribuição de renda.",
      "B) recessão profunda.",
      "C) crescimento econômico com desigualdade.",
      "D) fim das exportações."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Ditadura Militar marcou profundamente a política, a economia e os direitos humanos no Brasil. O regime combinou autoritarismo, modernização econômica e forte repressão, gerando debates e memórias que ainda influenciam a sociedade brasileira. ",
    "dificuldade": "média"
  }
]
    }
  },

  'redemocratizacao-e-constituicao-de-1988': {
    slug: 'redemocratizacao-e-constituicao-de-1988',
    resumo: `A transição do regime militar para a democracia foi gradual, marcada por mobilização social, pactos políticos e mudanças institucionais, culminando na Constituição de 1988, conhecida como “Constituição Cidadã”.`,

    explicacao: `<h2>📚 Redemocratização e Constituição de 1988</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Anistia (1979)</li>
      <li>Movimentos sociais na década de 1980</li>
      <li>Diretas Já (1983–1984)</li>
      <li>Eleição indireta de Tancredo Neves</li>
      <li>Governo Sarney</li>
      <li>Assembleia Nacional Constituinte</li>
      <li>Constituição de 1988: direitos e garantias</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Anistia permitiu o retorno de exilados e a reorganização de grupos políticos. Movimentos sindicais, estudantis e populares pressionaram pela democratização. A campanha das Diretas Já não obteve voto direto imediato, mas fortaleceu a demanda por democracia. A Constituinte elaborou uma carta que ampliou direitos civis, políticos e sociais, reconheceu direitos de minorias, estabeleceu princípios de saúde e educação como direitos universais e consolidou o Estado Democrático de Direito.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão cita a Constituição de 1988 como “Cidadã” por: A) restaurar o absolutismo. B) restringir direitos trabalhistas. C) ampliar direitos sociais e garantias fundamentais. D) instaurar a censura. Resposta: **C**. Exemplo 2 Diretas Já representou: A) movimento pela volta da monarquia. B) campanha por eleições diretas para presidente. C) apoio ao AI-5. D) defesa do bipartidarismo. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão cita a Constituição de 1988 como “Cidadã” por: A) restaurar o absolutismo. B) restringir direitos trabalhistas. C) ampliar direitos sociais e garantias fundamentais. D) instaurar a censura. Resposta: **C**. Exemplo 2 Diretas Já representou: A) movimento pela volta da monarquia. B) campanha por eleições diretas para presidente. C) apoio ao AI-5. D) defesa do bipartidarismo. Resposta: **B**.`
    ],

    memorizacao: [
      'Anistia (1979)',
      'Movimentos sociais na década de 1980',
      'Diretas Já (1983–1984)',
      'Eleição indireta de Tancredo Neves',
      'Governo Sarney'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Anistia de 1979:",
    "alternativas": [
      "A) criminalizou opositores.",
      "B) abriu espaço para retorno de exilados.",
      "C) consolidou o AI-5.",
      "D) aboliu os partidos políticos."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão cita a Constituição de 1988 como “Cidadã” por: A) restaurar o absolutismo. B) restringir direitos trabalhistas. C) ampliar direitos sociais e garantias fundamentais. D) instaurar a censura. Resposta: **C**. Exemplo 2 Diretas Já representou: A) movimento pela volta da monarquia. B) campanha por eleições diretas para presidente. C) apoio ao AI-5. D) defesa do bipartidarismo. Resposta: **B**. "
  },
  {
    "enunciado": "2) As Diretas Já:",
    "alternativas": [
      "A) obtiveram imediata aprovação das diretas.",
      "B) não conseguiram aprovar, mas fortaleceram a redemocratização.",
      "C) foram um movimento isolado de militares.",
      "D) visavam à manutenção do regime."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão cita a Constituição de 1988 como “Cidadã” por: A) restaurar o absolutismo. B) restringir direitos trabalhistas. C) ampliar direitos sociais e garantias fundamentais. D) instaurar a censura. Resposta: **C**. Exemplo 2 Diretas Já representou: A) movimento pela volta da monarquia. B) campanha por eleições diretas para presidente. C) apoio ao AI-5. D) defesa do bipartidarismo. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Constituição de 1988:",
    "alternativas": [
      "A) limitou direitos de cidadania.",
      "B) ampliou direitos e garantias fundamentais.",
      "C) foi elaborada por militares.",
      "D) extinguiu eleições diretas."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Um princípio central da Constituição de 1988 é:",
    "alternativas": [
      "A) exclusão social.",
      "B) Estado Democrático de Direito.",
      "C) retorno ao voto censitário.",
      "D) concentração de poderes no Executivo absoluto."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Após a redemocratização, o Brasil passou a ter:",
    "alternativas": [
      "A) eleições periódicas, multipartidarismo e liberdade de imprensa.",
      "B) censura obrigatória.",
      "C) governo vitalício.",
      "D) plebiscitos anuais obrigatórios."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Redemocratização e Constituição de 1988',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Anistia (1979)',
            'Movimentos sociais na década de 1980',
            'Diretas Já (1983–1984)',
            'Eleição indireta de Tancredo Neves'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Anistia de 1979:",
    "opcoes": [
      "A) criminalizou opositores.",
      "B) abriu espaço para retorno de exilados.",
      "C) consolidou o AI-5.",
      "D) aboliu os partidos políticos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização consolidou um novo marco institucional, com ampliação de direitos e fortalecimento das instituições democráticas. A Constituição de 1988 tornou-se referência para o exercício da cidadania e para as lutas sociais contemporâneas. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) As Diretas Já:",
    "opcoes": [
      "A) obtiveram imediata aprovação das diretas.",
      "B) não conseguiram aprovar, mas fortaleceram a redemocratização.",
      "C) foram um movimento isolado de militares.",
      "D) visavam à manutenção do regime."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização consolidou um novo marco institucional, com ampliação de direitos e fortalecimento das instituições democráticas. A Constituição de 1988 tornou-se referência para o exercício da cidadania e para as lutas sociais contemporâneas. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Constituição de 1988:",
    "opcoes": [
      "A) limitou direitos de cidadania.",
      "B) ampliou direitos e garantias fundamentais.",
      "C) foi elaborada por militares.",
      "D) extinguiu eleições diretas."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização consolidou um novo marco institucional, com ampliação de direitos e fortalecimento das instituições democráticas. A Constituição de 1988 tornou-se referência para o exercício da cidadania e para as lutas sociais contemporâneas. ",
    "dificuldade": "média"
  }
]
    }
  },

  'mundo-antigo-grecia-e-roma': {
    slug: 'mundo-antigo-grecia-e-roma',
    resumo: `As civilizações grega e romana influenciaram profundamente a cultura ocidental, nas áreas de política, filosofia, direito, arte e organização social.`,

    explicacao: `<h2>📚 Mundo Antigo: Grécia e Roma</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Polis gregas: Atenas e Esparta</li>
      <li>Democracia ateniense</li>
      <li>Filosofia grega</li>
      <li>Roma: monarquia, república e império</li>
      <li>Cidadania e exclusão nas duas civilizações</li>
      <li>Direito romano e legado cultural</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Na Grécia antiga, as pólis eram cidades-Estado autônomas. Atenas desenvolveu uma forma de democracia direta, restrita a cidadãos homens, enquanto Esparta tinha um regime militarista. A filosofia grega questionava o mundo, a ética e a política. Roma passou de monarquia à república (com forte protagonismo do Senado) e depois ao império. O direito romano estruturou normas que influenciaram sistemas jurídicos posteriores. Em ambas sociedades, a cidadania era excludente, deixando de fora mulheres, escravizados e estrangeiros.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão apresenta um esquema da democracia ateniense, em que apenas homens livres, maiores de idade e nascidos em Atenas participam da Assembleia. Comentário: Democracia direta, porém restrita. Exemplo 2 Um texto fala da importância do direito romano para a organização das leis modernas. Pergunta: Essa herança é chamada de: A) legado jurídico. B) legado mitológico apenas. C) herança agrícola. D) continuidade tribal. Resposta: **A**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão apresenta um esquema da democracia ateniense, em que apenas homens livres, maiores de idade e nascidos em Atenas participam da Assembleia. Comentário: Democracia direta, porém restrita. Exemplo 2 Um texto fala da importância do direito romano para a organização das leis modernas. Pergunta: Essa herança é chamada de: A) legado jurídico. B) legado mitológico apenas. C) herança agrícola. D) continuidade tribal. Resposta: **A**.`
    ],

    memorizacao: [
      'Polis gregas: Atenas e Esparta',
      'Democracia ateniense',
      'Filosofia grega',
      'Roma: monarquia, república e império',
      'Cidadania e exclusão nas duas civilizações'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A democracia ateniense era:",
    "alternativas": [
      "A) direta e restrita.",
      "B) indireta e universal.",
      "C) proibida aos cidadãos.",
      "D) similar ao voto moderno feminino."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão apresenta um esquema da democracia ateniense, em que apenas homens livres, maiores de idade e nascidos em Atenas participam da Assembleia. Comentário: Democracia direta, porém restrita. Exemplo 2 Um texto fala da importância do direito romano para a organização das leis modernas. Pergunta: Essa herança é chamada de: A) legado jurídico. B) legado mitológico apenas. C) herança agrícola. D) continuidade tribal. Resposta: **A**. "
  },
  {
    "enunciado": "2) Esparta se destacava por:",
    "alternativas": [
      "A) comércio marítimo intenso.",
      "B) militarismo e rigidez social.",
      "C) filosofia especulativa.",
      "D) democracia ampla."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão apresenta um esquema da democracia ateniense, em que apenas homens livres, maiores de idade e nascidos em Atenas participam da Assembleia. Comentário: Democracia direta, porém restrita. Exemplo 2 Um texto fala da importância do direito romano para a organização das leis modernas. Pergunta: Essa herança é chamada de: A) legado jurídico. B) legado mitológico apenas. C) herança agrícola. D) continuidade tribal. Resposta: **A**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Na Roma republicana, o Senado:",
    "alternativas": [
      "A) não tinha poder algum.",
      "B) exercia grande influência política.",
      "C) era composto por escravizados.",
      "D) era um órgão religioso."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Em ambas sociedades, a cidadania excluía:",
    "alternativas": [
      "A) todos os homens.",
      "B) estrangeiros, escravizados e mulheres.",
      "C) apenas soldados.",
      "D) os magistrados."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O direito romano influenciou:",
    "alternativas": [
      "A) apenas a religião cristã.",
      "B) sistemas jurídicos posteriores.",
      "C) apenas a arquitetura.",
      "D) somente o comércio de escravos."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Mundo Antigo: Grécia e Roma',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Polis gregas: Atenas e Esparta',
            'Democracia ateniense',
            'Filosofia grega',
            'Roma: monarquia, república e império'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A democracia ateniense era:",
    "opcoes": [
      "A) direta e restrita.",
      "B) indireta e universal.",
      "C) proibida aos cidadãos.",
      "D) similar ao voto moderno feminino."
    ],
    "respostaCorreta": 1,
    "explicacao": "Grécia e Roma oferecem modelos de organização política, jurídica e cultural que continuam a ser referência até hoje, ao mesmo tempo em que revelam sistemas de cidadania profundamente excludentes, tema frequente em questões de interpretação crítica no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Esparta se destacava por:",
    "opcoes": [
      "A) comércio marítimo intenso.",
      "B) militarismo e rigidez social.",
      "C) filosofia especulativa.",
      "D) democracia ampla."
    ],
    "respostaCorreta": 1,
    "explicacao": "Grécia e Roma oferecem modelos de organização política, jurídica e cultural que continuam a ser referência até hoje, ao mesmo tempo em que revelam sistemas de cidadania profundamente excludentes, tema frequente em questões de interpretação crítica no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Na Roma republicana, o Senado:",
    "opcoes": [
      "A) não tinha poder algum.",
      "B) exercia grande influência política.",
      "C) era composto por escravizados.",
      "D) era um órgão religioso."
    ],
    "respostaCorreta": 1,
    "explicacao": "Grécia e Roma oferecem modelos de organização política, jurídica e cultural que continuam a ser referência até hoje, ao mesmo tempo em que revelam sistemas de cidadania profundamente excludentes, tema frequente em questões de interpretação crítica no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'revolucoes-burguesas-e-formacao-do-mundo-moderno': {
    slug: 'revolucoes-burguesas-e-formacao-do-mundo-moderno',
    resumo: `As chamadas revoluções burguesas (Revolução Inglesa, Independência dos EUA, Revolução Francesa) transformaram as estruturas políticas e sociais, consolidando princípios como liberalismo, direitos individuais e representação política.`,

    explicacao: `<h2>📚 Revoluções Burguesas e formação do mundo moderno</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução Inglesa (séculos XVII)</li>
      <li>Independência dos EUA (1776)</li>
      <li>Revolução Francesa (1789)</li>
      <li>Queda do absolutismo</li>
      <li>Declarações de direitos</li>
      <li>Expansão do liberalismo político e econômico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Revolução Inglesa limitou o poder do rei e fortaleceu o Parlamento. A Independência dos EUA baseou-se em ideias iluministas e na defesa de “não tributação sem representação”. A Revolução Francesa questionou os privilégios do Antigo Regime, proclamou a igualdade jurídica e serviu de referência para outros movimentos. Ao mesmo tempo, essas revoluções tinham limites, mantendo exclusões (como a escravidão nos EUA). No ENEM, é comum relacionar os ideais de liberdade, igualdade e direitos civis com contradições sociais concretas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão cita “liberdade, igualdade e fraternidade” como lema de um movimento revolucionário. Pergunta: Trata-se da: A) Revolução Francesa. B) Revolução Industrial. C) Revolução Russa. D) Revolução Cubana. Resposta: **A**. Exemplo 2 Um texto sobre a Independência dos EUA menciona a recusa das colônias em aceitar impostos sem representação no Parlamento. Comentário: Expressa o princípio “no taxation without representation”, ligado ao liberalismo político.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão cita “liberdade, igualdade e fraternidade” como lema de um movimento revolucionário. Pergunta: Trata-se da: A) Revolução Francesa. B) Revolução Industrial. C) Revolução Russa. D) Revolução Cubana. Resposta: **A**. Exemplo 2 Um texto sobre a Independência dos EUA menciona a recusa das colônias em aceitar impostos sem representação no Parlamento. Comentário: Expressa o princípio “no taxation without representation”, ligado ao liberalismo político.`
    ],

    memorizacao: [
      'Revolução Inglesa (séculos XVII)',
      'Independência dos EUA (1776)',
      'Revolução Francesa (1789)',
      'Queda do absolutismo',
      'Declarações de direitos'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Uma consequência da Revolução Francesa foi:",
    "alternativas": [
      "A) fortalecimento do Antigo Regime.",
      "B) queda da monarquia absolutista e afirmação de direitos civis.",
      "C) retorno da servidão medieval.",
      "D) expansão do feudalismo."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão cita “liberdade, igualdade e fraternidade” como lema de um movimento revolucionário. Pergunta: Trata-se da: A) Revolução Francesa. B) Revolução Industrial. C) Revolução Russa. D) Revolução Cubana. Resposta: **A**. Exemplo 2 Um texto sobre a Independência dos EUA menciona a recusa das colônias em aceitar impostos sem representação no Parlamento. Comentário: Expressa o princípio “no taxation without representation”, ligado ao liberalismo político. "
  },
  {
    "enunciado": "2) As revoluções burguesas estão associadas a:",
    "alternativas": [
      "A) consolidação do absolutismo.",
      "B) ascensão da burguesia e limitação do poder real.",
      "C) fim do capitalismo.",
      "D) fortalecimento das corporações de ofício."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão cita “liberdade, igualdade e fraternidade” como lema de um movimento revolucionário. Pergunta: Trata-se da: A) Revolução Francesa. B) Revolução Industrial. C) Revolução Russa. D) Revolução Cubana. Resposta: **A**. Exemplo 2 Um texto sobre a Independência dos EUA menciona a recusa das colônias em aceitar impostos sem representação no Parlamento. Comentário: Expressa o princípio “no taxation without representation”, ligado ao liberalismo político. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O liberalismo defende:",
    "alternativas": [
      "A) poder absoluto do rei.",
      "B) liberdade individual, propriedade e representação política.",
      "C) economia planificada estatal.",
      "D) ausência de mercado."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Um paradoxo da Independência dos EUA é:",
    "alternativas": [
      "A) proclamar liberdade mantendo escravidão.",
      "B) abolir a escravidão na Europa.",
      "C) instaurar o comunismo.",
      "D) negar qualquer influência iluminista."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) No ENEM, esse tema costuma ser cobrado relacionando:",
    "alternativas": [
      "A) apenas datas.",
      "B) ideais de liberdade e igualdade com contradições sociais.",
      "C) apenas genealogias de reis.",
      "D) somente geografia física."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Revoluções Burguesas e formação do mundo moderno',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução Inglesa (séculos XVII)',
            'Independência dos EUA (1776)',
            'Revolução Francesa (1789)',
            'Queda do absolutismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Uma consequência da Revolução Francesa foi:",
    "opcoes": [
      "A) fortalecimento do Antigo Regime.",
      "B) queda da monarquia absolutista e afirmação de direitos civis.",
      "C) retorno da servidão medieval.",
      "D) expansão do feudalismo."
    ],
    "respostaCorreta": 1,
    "explicacao": "As revoluções burguesas inauguram uma nova etapa da história política, marcada por constituições, declarações de direitos e governos baseados em representação. No entanto, a universalização desses direitos foi lenta e cheia de contradições, tema central em discussões cobradas no ENEM. FIM DO BLOCO 1 – HISTÓRIA (10 temas) Pronto para você enviar ao Claude para transformar em HTML e distribuir nos cadernos de História da Biblioteca do ENEM Pro. Quando quiser, posso fazer: - Bloco 2 – Geografia (10 temas) - Bloco 3 – Sociologia - Bloco 4 – Filosofia - Blocos para Inglês, Espanhol e Artes. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) As revoluções burguesas estão associadas a:",
    "opcoes": [
      "A) consolidação do absolutismo.",
      "B) ascensão da burguesia e limitação do poder real.",
      "C) fim do capitalismo.",
      "D) fortalecimento das corporações de ofício."
    ],
    "respostaCorreta": 1,
    "explicacao": "As revoluções burguesas inauguram uma nova etapa da história política, marcada por constituições, declarações de direitos e governos baseados em representação. No entanto, a universalização desses direitos foi lenta e cheia de contradições, tema central em discussões cobradas no ENEM. FIM DO BLOCO 1 – HISTÓRIA (10 temas) Pronto para você enviar ao Claude para transformar em HTML e distribuir nos cadernos de História da Biblioteca do ENEM Pro. Quando quiser, posso fazer: - Bloco 2 – Geografia (10 temas) - Bloco 3 – Sociologia - Bloco 4 – Filosofia - Blocos para Inglês, Espanhol e Artes. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O liberalismo defende:",
    "opcoes": [
      "A) poder absoluto do rei.",
      "B) liberdade individual, propriedade e representação política.",
      "C) economia planificada estatal.",
      "D) ausência de mercado."
    ],
    "respostaCorreta": 1,
    "explicacao": "As revoluções burguesas inauguram uma nova etapa da história política, marcada por constituições, declarações de direitos e governos baseados em representação. No entanto, a universalização desses direitos foi lenta e cheia de contradições, tema central em discussões cobradas no ENEM. FIM DO BLOCO 1 – HISTÓRIA (10 temas) Pronto para você enviar ao Claude para transformar em HTML e distribuir nos cadernos de História da Biblioteca do ENEM Pro. Quando quiser, posso fazer: - Bloco 2 – Geografia (10 temas) - Bloco 3 – Sociologia - Bloco 4 – Filosofia - Blocos para Inglês, Espanhol e Artes. ",
    "dificuldade": "média"
  }
]
    }
  },

  'brasil-colonia-economia-acucareira-e-escravidao': {
    slug: 'brasil-colonia-economia-acucareira-e-escravidao',
    resumo: `Do século XVI ao XVIII, o Brasil Colônia teve como base econômica o açúcar produzido nos engenhos do Nordeste, sustentado pelo trabalho escravo, inicialmente indígena e depois majoritariamente africano.`,

    explicacao: `<h2>📚 Brasil Colônia: economia açucareira e escravidão</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Capitanias hereditárias e Governo-Geral</li>
      <li>Engenho de açúcar (casa-grande, senzala, moenda)</li>
      <li>Trabalho escravo indígena e africano</li>
      <li>Sistema plantation: monocultura, latifúndio, escravidão e exportação</li>
      <li>Pacto colonial (exclusivo comercial com Portugal)</li>
      <li>Tráfico negreiro atlântico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Portugal organizou a colonização baseada na grande propriedade (latifúndio), voltada à exportação para o mercado europeu. O engenho era uma unidade produtiva e social, comandada pelo senhor de engenho. Para sustentar essa produção, recorreu-se ao trabalho escravo indígena e, principalmente, africano, transportado em condições desumanas no tráfico negreiro. O sistema colonial se estruturava pelo pacto colonial: a colônia deveria produzir matérias-primas e comprar manufaturados da metrópole, garantindo o lucro da Coroa portuguesa.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão destaca que a economia açucareira colonial combinava grande propriedade, mão de obra escrava e produção voltada ao mercado externo. Pergunta: Esse modelo é conhecido como: A) minifúndio policultor para subsistência. B) plantation. C) agricultura familiar. D) parceria agrícola. Comentário: Plantation = monocultura, latifúndio, escravidão, exportação. Resposta: **B**. Exemplo 2 Um texto menciona condições precárias nos navios negreiros e a lucratividade do comércio de escravos. Pergunta: Esse trecho refere-se ao: A) escambo indígena. B) bandeirismo de apresamento. C) tráfico atlântico de africanos escravizados. D) imigração europeia no século XIX. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão destaca que a economia açucareira colonial combinava grande propriedade, mão de obra escrava e produção voltada ao mercado externo. Pergunta: Esse modelo é conhecido como: A) minifúndio policultor para subsistência. B) plantation. C) agricultura familiar. D) parceria agrícola. Comentário: Plantation = monocultura, latifúndio, escravidão, exportação. Resposta: **B**. Exemplo 2 Um texto menciona condições precárias nos navios negreiros e a lucratividade do comércio de escravos. Pergunta: Esse trecho refere-se ao: A) escambo indígena. B) bandeirismo de apresamento. C) tráfico atlântico de africanos escravizados. D) imigração europeia no século XIX. Resposta: **C**.`
    ],

    memorizacao: [
      'Capitanias hereditárias e Governo-Geral',
      'Engenho de açúcar (casa-grande, senzala, moenda)',
      'Trabalho escravo indígena e africano',
      'Sistema plantation: monocultura, latifúndio, escravidão e exportação',
      'Pacto colonial (exclusivo comercial com Portugal)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A base da economia colonial brasileira no século XVII foi:",
    "alternativas": [
      "A) a indústria têxtil.",
      "B) a mineração de ouro.",
      "C) a produção açucareira voltada ao mercado externo.",
      "D) a pecuária de corte."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca que a economia açucareira colonial combinava grande propriedade, mão de obra escrava e produção voltada ao mercado externo. Pergunta: Esse modelo é conhecido como: A) minifúndio policultor para subsistência. B) plantation. C) agricultura familiar. D) parceria agrícola. Comentário: Plantation = monocultura, latifúndio, escravidão, exportação. Resposta: **B**. Exemplo 2 Um texto menciona condições precárias nos navios negreiros e a lucratividade do comércio de escravos. Pergunta: Esse trecho refere-se ao: A) escambo indígena. B) bandeirismo de apresamento. C) tráfico atlântico de africanos escravizados. D) imigração europeia no século XIX. Resposta: **C**. "
  },
  {
    "enunciado": "2) O sistema plantation combina:",
    "alternativas": [
      "A) pequena propriedade, policultura e trabalho livre.",
      "B) latifúndio, monocultura e trabalho escravo.",
      "C) agricultura familiar e subsistência.",
      "D) produção comunitária e cooperativismo."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca que a economia açucareira colonial combinava grande propriedade, mão de obra escrava e produção voltada ao mercado externo. Pergunta: Esse modelo é conhecido como: A) minifúndio policultor para subsistência. B) plantation. C) agricultura familiar. D) parceria agrícola. Comentário: Plantation = monocultura, latifúndio, escravidão, exportação. Resposta: **B**. Exemplo 2 Um texto menciona condições precárias nos navios negreiros e a lucratividade do comércio de escravos. Pergunta: Esse trecho refere-se ao: A) escambo indígena. B) bandeirismo de apresamento. C) tráfico atlântico de africanos escravizados. D) imigração europeia no século XIX. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O pacto colonial estabelecia que:",
    "alternativas": [
      "A) a colônia poderia comerciar livremente com qualquer país.",
      "B) a metrópole deveria comprar apenas produtos coloniais.",
      "C) a colônia servia à metrópole como fornecedora de matérias-primas e consumidora de manufaturados.",
      "D) a metrópole e a colônia eram economicamente iguais."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A principal região produtora de açúcar no período colonial foi:",
    "alternativas": [
      "A) Sul (Rio Grande do Sul).",
      "B) Sudeste (São Paulo).",
      "C) Nordeste litorâneo.",
      "D) Centro-Oeste."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O tráfico negreiro:",
    "alternativas": [
      "A) foi pouco lucrativo para a Coroa portuguesa.",
      "B) foi central na economia colonial, envolvendo grandes lucros.",
      "C) não teve relação com o sistema escravista.",
      "D) existiu apenas no século XX."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Brasil Colônia: economia açucareira e escravidão',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Capitanias hereditárias e Governo-Geral',
            'Engenho de açúcar (casa-grande, senzala, moenda)',
            'Trabalho escravo indígena e africano',
            'Sistema plantation: monocultura, latifúndio, escravidão e exportação'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A base da economia colonial brasileira no século XVII foi:",
    "opcoes": [
      "A) a indústria têxtil.",
      "B) a mineração de ouro.",
      "C) a produção açucareira voltada ao mercado externo.",
      "D) a pecuária de corte."
    ],
    "respostaCorreta": 1,
    "explicacao": "A compreensão da economia açucareira e da escravidão africana é essencial para entender a formação social, a desigualdade e o racismo estrutural no Brasil, temas frequentemente cobrados no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O sistema plantation combina:",
    "opcoes": [
      "A) pequena propriedade, policultura e trabalho livre.",
      "B) latifúndio, monocultura e trabalho escravo.",
      "C) agricultura familiar e subsistência.",
      "D) produção comunitária e cooperativismo."
    ],
    "respostaCorreta": 1,
    "explicacao": "A compreensão da economia açucareira e da escravidão africana é essencial para entender a formação social, a desigualdade e o racismo estrutural no Brasil, temas frequentemente cobrados no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O pacto colonial estabelecia que:",
    "opcoes": [
      "A) a colônia poderia comerciar livremente com qualquer país.",
      "B) a metrópole deveria comprar apenas produtos coloniais.",
      "C) a colônia servia à metrópole como fornecedora de matérias-primas e consumidora de manufaturados.",
      "D) a metrópole e a colônia eram economicamente iguais."
    ],
    "respostaCorreta": 1,
    "explicacao": "A compreensão da economia açucareira e da escravidão africana é essencial para entender a formação social, a desigualdade e o racismo estrutural no Brasil, temas frequentemente cobrados no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'mineracao-no-seculo-xviii-e-mudancas-na-colonia': {
    slug: 'mineracao-no-seculo-xviii-e-mudancas-na-colonia',
    resumo: `No século XVIII, a descoberta de ouro e diamantes em Minas Gerais, Goiás e Mato Grosso deslocou o centro econômico do Nordeste açucareiro para o interior, provocando mudanças demográficas, urbanas e políticas.`,

    explicacao: `<h2>📚 Mineração no século XVIII e mudanças na colônia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ciclo do ouro (Minas, Goiás, Mato Grosso)</li>
      <li>Regime de datas e controle metropolitano</li>
      <li>Quinto, derrama e fiscalização</li>
      <li>Surgimento de vilas e cidades mineradoras</li>
      <li>Mobilidade social relativa</li>
      <li>Conflitos e revoltas (Inconfidência Mineira, Conjuração Baiana – conexão posterior)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O ouro atraiu colonos, comerciantes e funcionários da Coroa, favorecendo o crescimento de vilas (como Vila Rica, atual Ouro Preto) e o aumento da fiscalização portuguesa. O quinto (20% do ouro deveria ser entregue à Coroa) e a derrama (cobrança forçada de impostos atrasados) geraram insatisfação. Houve alguma mobilidade social, pois pequenos mineradores podiam enriquecer, mas a concentração de riqueza persistiu. O cenário de opressão fiscal e influência das ideias iluministas contribuiu para movimentos como a Inconfidência Mineira.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão destaca a derrama como medida impopular em Minas Gerais. Pergunta: A derrama consistia em: A) distribuição de terras entre mineradores pobres. B) perdão de dívidas fiscais antigas. C) cobrança compulsória do ouro devido à Coroa quando a cota anual não era atingida. D) suspensão da coleta de impostos. Resposta: **C**. Exemplo 2 Um texto descreve o surgimento de vilas e maior urbanização na região mineradora. Comentário: A mineração favoreceu urbanização, circulação de ideias e formação de uma elite letrada.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão destaca a derrama como medida impopular em Minas Gerais. Pergunta: A derrama consistia em: A) distribuição de terras entre mineradores pobres. B) perdão de dívidas fiscais antigas. C) cobrança compulsória do ouro devido à Coroa quando a cota anual não era atingida. D) suspensão da coleta de impostos. Resposta: **C**. Exemplo 2 Um texto descreve o surgimento de vilas e maior urbanização na região mineradora. Comentário: A mineração favoreceu urbanização, circulação de ideias e formação de uma elite letrada.`
    ],

    memorizacao: [
      'Ciclo do ouro (Minas, Goiás, Mato Grosso)',
      'Regime de datas e controle metropolitano',
      'Quinto, derrama e fiscalização',
      'Surgimento de vilas e cidades mineradoras',
      'Mobilidade social relativa'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A descoberta de ouro no século XVIII deslocou o eixo econômico para:",
    "alternativas": [
      "A) o litoral nordestino.",
      "B) o interior, especialmente Minas Gerais.",
      "C) a região Sul.",
      "D) a Amazônia."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a derrama como medida impopular em Minas Gerais. Pergunta: A derrama consistia em: A) distribuição de terras entre mineradores pobres. B) perdão de dívidas fiscais antigas. C) cobrança compulsória do ouro devido à Coroa quando a cota anual não era atingida. D) suspensão da coleta de impostos. Resposta: **C**. Exemplo 2 Um texto descreve o surgimento de vilas e maior urbanização na região mineradora. Comentário: A mineração favoreceu urbanização, circulação de ideias e formação de uma elite letrada. "
  },
  {
    "enunciado": "2) O quinto representava:",
    "alternativas": [
      "A) 5% do ouro da Coroa.",
      "B) 10%.",
      "C) 20% do ouro devido à Coroa.",
      "D) 50%."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a derrama como medida impopular em Minas Gerais. Pergunta: A derrama consistia em: A) distribuição de terras entre mineradores pobres. B) perdão de dívidas fiscais antigas. C) cobrança compulsória do ouro devido à Coroa quando a cota anual não era atingida. D) suspensão da coleta de impostos. Resposta: **C**. Exemplo 2 Um texto descreve o surgimento de vilas e maior urbanização na região mineradora. Comentário: A mineração favoreceu urbanização, circulação de ideias e formação de uma elite letrada. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A derrama era:",
    "alternativas": [
      "A) imposto sobre escravos africanos.",
      "B) imposto sobre açúcar.",
      "C) cobrança forçada do ouro não recolhido.",
      "D) taxa sobre produtos ingleses."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A mineração contribuiu para:",
    "alternativas": [
      "A) esvaziamento total das cidades.",
      "B) urbanização e circulação de ideias.",
      "C) fim da escravidão.",
      "D) industrialização imediata."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Inconfidência Mineira ocorreu em contexto de:",
    "alternativas": [
      "A) prosperidade e pouco controle fiscal.",
      "B) crise da mineração e maior cobrança de impostos.",
      "C) independência política já consolidada.",
      "D) abolição da escravidão."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Mineração no século XVIII e mudanças na colônia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ciclo do ouro (Minas, Goiás, Mato Grosso)',
            'Regime de datas e controle metropolitano',
            'Quinto, derrama e fiscalização',
            'Surgimento de vilas e cidades mineradoras'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A descoberta de ouro no século XVIII deslocou o eixo econômico para:",
    "opcoes": [
      "A) o litoral nordestino.",
      "B) o interior, especialmente Minas Gerais.",
      "C) a região Sul.",
      "D) a Amazônia."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração transformou a colônia, fortaleceu o controle da Coroa e criou um ambiente propício à contestação política, fundamental para entender os movimentos de emancipação. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O quinto representava:",
    "opcoes": [
      "A) 5% do ouro da Coroa.",
      "B) 10%.",
      "C) 20% do ouro devido à Coroa.",
      "D) 50%."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração transformou a colônia, fortaleceu o controle da Coroa e criou um ambiente propício à contestação política, fundamental para entender os movimentos de emancipação. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A derrama era:",
    "opcoes": [
      "A) imposto sobre escravos africanos.",
      "B) imposto sobre açúcar.",
      "C) cobrança forçada do ouro não recolhido.",
      "D) taxa sobre produtos ingleses."
    ],
    "respostaCorreta": 1,
    "explicacao": "A mineração transformou a colônia, fortaleceu o controle da Coroa e criou um ambiente propício à contestação política, fundamental para entender os movimentos de emancipação. ",
    "dificuldade": "média"
  }
]
    }
  },

  'independencia-do-brasil-e-primeiro-reinado-2': {
    slug: 'independencia-do-brasil-e-primeiro-reinado-2',
    resumo: `A Independência, proclamada em 1822, resultou de conflitos entre interesses da metrópole e das elites coloniais, e levou à formação de um Império sob Dom Pedro I, marcado por tensões políticas e regionais.`,

    explicacao: `<h2>📚 Independência do Brasil e Primeiro Reinado</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Transferência da Corte para o Rio (1808)</li>
      <li>Abertura dos portos e mudanças econômicas</li>
      <li>Revolução Liberal do Porto (1820) e retorno exigido de D. João VI</li>
      <li>“Fico” de Dom Pedro (1822)</li>
      <li>Proclamação da Independência (7 de setembro)</li>
      <li>Primeiro Reinado: centralização, Constituição de 1824, conflito com Portugal e Inglaterra</li>
      <li>Guerra da Cisplatina e desgaste do governo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A vinda da Corte em 1808 rompeu parcialmente o pacto colonial (abertura dos portos). As Cortes portuguesas exigiam o retorno de D. João VI e a recolonização, o que contrariava interesses das elites brasileiras. Dom Pedro, pressionado, decidiu ficar (“Dia do Fico”) e, em 1822, proclamou a Independência. O Primeiro Reinado teve centralização de poder, outorga da Constituição de 1824 (poder moderador) e crises políticas e econômicas, incluindo a Guerra da Cisplatina. A pressão interna levou à abdicação de Dom Pedro I em 1831.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão aponta a Independência do Brasil como “conservadora” em muitos aspectos. Comentário: Manteve-se a escravidão, o latifúndio e a monarquia; a ruptura foi política, mas não social. Exemplo 2 Pergunta: O “Dia do Fico” (1822) foi importante porque: A) declarou a imediata abolição da escravidão. B) marcou a decisão de Dom Pedro de permanecer no Brasil, contrariando as Cortes. C) proclamou a República. D) extinguiu o poder moderador. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão aponta a Independência do Brasil como “conservadora” em muitos aspectos. Comentário: Manteve-se a escravidão, o latifúndio e a monarquia; a ruptura foi política, mas não social. Exemplo 2 Pergunta: O “Dia do Fico” (1822) foi importante porque: A) declarou a imediata abolição da escravidão. B) marcou a decisão de Dom Pedro de permanecer no Brasil, contrariando as Cortes. C) proclamou a República. D) extinguiu o poder moderador. Resposta: **B**.`
    ],

    memorizacao: [
      'Transferência da Corte para o Rio (1808)',
      'Abertura dos portos e mudanças econômicas',
      'Revolução Liberal do Porto (1820) e retorno exigido de D. João VI',
      '“Fico” de Dom Pedro (1822)',
      'Proclamação da Independência (7 de setembro)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A transferência da Corte para o Brasil ocorreu em:",
    "alternativas": [
      "A) 1500.",
      "B) 1808.",
      "C) 1822.",
      "D) 1889."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão aponta a Independência do Brasil como “conservadora” em muitos aspectos. Comentário: Manteve-se a escravidão, o latifúndio e a monarquia; a ruptura foi política, mas não social. Exemplo 2 Pergunta: O “Dia do Fico” (1822) foi importante porque: A) declarou a imediata abolição da escravidão. B) marcou a decisão de Dom Pedro de permanecer no Brasil, contrariando as Cortes. C) proclamou a República. D) extinguiu o poder moderador. Resposta: **B**. "
  },
  {
    "enunciado": "2) A Abertura dos Portos significou:",
    "alternativas": [
      "A) fechamento para todas as nações.",
      "B) livre comércio com todos os países.",
      "C) permissão de comércio com “nações amigas”, rompendo o exclusivo metropolitano.",
      "D) proibição de comércio com a Inglaterra."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão aponta a Independência do Brasil como “conservadora” em muitos aspectos. Comentário: Manteve-se a escravidão, o latifúndio e a monarquia; a ruptura foi política, mas não social. Exemplo 2 Pergunta: O “Dia do Fico” (1822) foi importante porque: A) declarou a imediata abolição da escravidão. B) marcou a decisão de Dom Pedro de permanecer no Brasil, contrariando as Cortes. C) proclamou a República. D) extinguiu o poder moderador. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Constituição de 1824:",
    "alternativas": [
      "A) foi outorgada por Dom Pedro I.",
      "B) foi resultado de plebiscito popular.",
      "C) extinguiu a monarquia.",
      "D) aboliu a escravidão."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A Independência do Brasil manteve:",
    "alternativas": [
      "A) a estrutura social baseada em escravidão e latifúndio.",
      "B) igualdade social imediata.",
      "C) reforma agrária ampla.",
      "D) República federativa."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A abdicação de Dom Pedro I ocorreu em:",
    "alternativas": [
      "A) 1500.",
      "B) 1822.",
      "C) 1831.",
      "D) 1889."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Independência do Brasil e Primeiro Reinado',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Transferência da Corte para o Rio (1808)',
            'Abertura dos portos e mudanças econômicas',
            'Revolução Liberal do Porto (1820) e retorno exigido de D. João VI',
            '“Fico” de Dom Pedro (1822)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A transferência da Corte para o Brasil ocorreu em:",
    "opcoes": [
      "A) 1500.",
      "B) 1808.",
      "C) 1822.",
      "D) 1889."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência e o Primeiro Reinado aparecem no ENEM conectados à formação do Estado nacional, à manutenção de estruturas sociais e às tensões políticas do século XIX. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A Abertura dos Portos significou:",
    "opcoes": [
      "A) fechamento para todas as nações.",
      "B) livre comércio com todos os países.",
      "C) permissão de comércio com “nações amigas”, rompendo o exclusivo metropolitano.",
      "D) proibição de comércio com a Inglaterra."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência e o Primeiro Reinado aparecem no ENEM conectados à formação do Estado nacional, à manutenção de estruturas sociais e às tensões políticas do século XIX. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Constituição de 1824:",
    "opcoes": [
      "A) foi outorgada por Dom Pedro I.",
      "B) foi resultado de plebiscito popular.",
      "C) extinguiu a monarquia.",
      "D) aboliu a escravidão."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Independência e o Primeiro Reinado aparecem no ENEM conectados à formação do Estado nacional, à manutenção de estruturas sociais e às tensões políticas do século XIX. ",
    "dificuldade": "média"
  }
]
    }
  },

  'segundo-reinado-e-cafe-economia-trabalho-e-escravidao': {
    slug: 'segundo-reinado-e-cafe-economia-trabalho-e-escravidao',
    resumo: `O Segundo Reinado (1840–1889), sob Dom Pedro II, foi marcado pela expansão cafeeira, pela transição do trabalho escravo para o trabalho livre e por transformações políticas que levaram à República.`,

    explicacao: `<h2>📚 Segundo Reinado e café: economia, trabalho e escravidão</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Café no Vale do Paraíba e Oeste Paulista</li>
      <li>Barões do café e elite agrária</li>
      <li>Escravidão, tráfico interno e leis abolicionistas (Eusébio de Queirós, Ventre Livre, Sexagenários, Lei Áurea)</li>
      <li>Imigração europeia e sistema de parceria/colonato</li>
      <li>Questão militar, questão religiosa, republicanismo</li>
      <li>Crise do regime monárquico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O café tornou-se o principal produto de exportação, especialmente no Sudeste. No início, dependia do trabalho escravo, mas o fim gradual do tráfico e as pressões internas e externas levaram a leis que corroeram o sistema escravista, culminando na Lei Áurea (1888). Paralelamente, o Estado atraiu imigrantes europeus para trabalhar nas fazendas de café, sob sistemas como a parceria e o colonato. Conflitos entre Igreja e Estado, insatisfação militar e fortalecimento das ideias republicanas contribuíram para a queda da monarquia em 1889.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão descreve a transição do trabalho escravo para o imigrante assalariado nas fazendas cafeeiras paulistas. Comentário: Esse processo insere o Brasil em nova lógica de trabalho, mantendo, porém, desigualdades e exploração. Exemplo 2 Pergunta: A Lei Áurea (1888) A) previa indenização aos ex-escravos. B) previa ampla reforma agrária. C) aboliu oficialmente a escravidão, sem políticas de inclusão aos libertos. D) criou escolas obrigatórias a todos os ex-escravos. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão descreve a transição do trabalho escravo para o imigrante assalariado nas fazendas cafeeiras paulistas. Comentário: Esse processo insere o Brasil em nova lógica de trabalho, mantendo, porém, desigualdades e exploração. Exemplo 2 Pergunta: A Lei Áurea (1888) A) previa indenização aos ex-escravos. B) previa ampla reforma agrária. C) aboliu oficialmente a escravidão, sem políticas de inclusão aos libertos. D) criou escolas obrigatórias a todos os ex-escravos. Resposta: **C**.`
    ],

    memorizacao: [
      'Café no Vale do Paraíba e Oeste Paulista',
      'Barões do café e elite agrária',
      'Escravidão, tráfico interno e leis abolicionistas (Eusébio de Queirós, Ventre Livre, Sexagenários, Lei Áurea)',
      'Imigração europeia e sistema de parceria/colonato',
      'Questão militar, questão religiosa, republicanismo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O principal produto de exportação no Segundo Reinado foi:",
    "alternativas": [
      "A) açúcar.",
      "B) algodão.",
      "C) café.",
      "D) borracha."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão descreve a transição do trabalho escravo para o imigrante assalariado nas fazendas cafeeiras paulistas. Comentário: Esse processo insere o Brasil em nova lógica de trabalho, mantendo, porém, desigualdades e exploração. Exemplo 2 Pergunta: A Lei Áurea (1888) A) previa indenização aos ex-escravos. B) previa ampla reforma agrária. C) aboliu oficialmente a escravidão, sem políticas de inclusão aos libertos. D) criou escolas obrigatórias a todos os ex-escravos. Resposta: **C**. "
  },
  {
    "enunciado": "2) A Lei Eusébio de Queirós (1850)",
    "alternativas": [
      "A) acabou com a escravidão interna.",
      "B) proibiu o tráfico atlântico de escravos.",
      "C) libertou todos os escravos sexagenários.",
      "D) libertou crianças nascidas de mães escravas."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão descreve a transição do trabalho escravo para o imigrante assalariado nas fazendas cafeeiras paulistas. Comentário: Esse processo insere o Brasil em nova lógica de trabalho, mantendo, porém, desigualdades e exploração. Exemplo 2 Pergunta: A Lei Áurea (1888) A) previa indenização aos ex-escravos. B) previa ampla reforma agrária. C) aboliu oficialmente a escravidão, sem políticas de inclusão aos libertos. D) criou escolas obrigatórias a todos os ex-escravos. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Lei do Ventre Livre (1871) determinava que:",
    "alternativas": [
      "A) todos os escravos seriam libertos.",
      "B) filhos de escravas nasciam livres.",
      "C) somente os idosos seriam libertos.",
      "D) apenas escravos urbanos seriam livres."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A crise da monarquia foi alimentada por:",
    "alternativas": [
      "A) satisfação total dos militares.",
      "B) harmonia entre Igreja e Estado.",
      "C) questões religiosa, militar e crescimento do republicanismo.",
      "D) fim do café como produto de exportação."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Proclamação da República ocorreu em:",
    "alternativas": [
      "A) 1808.",
      "B) 1822.",
      "C) 1888.",
      "D) 1889."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Segundo Reinado e café: economia, trabalho e escravidão',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Café no Vale do Paraíba e Oeste Paulista',
            'Barões do café e elite agrária',
            'Escravidão, tráfico interno e leis abolicionistas (Eusébio de Queirós, Ventre Livre, Sexagenários, Lei Áurea)',
            'Imigração europeia e sistema de parceria/colonato'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O principal produto de exportação no Segundo Reinado foi:",
    "opcoes": [
      "A) açúcar.",
      "B) algodão.",
      "C) café.",
      "D) borracha."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo do café, da abolição e da transição para o trabalho livre é fundamental para compreender a formação do mercado de trabalho e das desigualdades sociais no Brasil, temas frequentes no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A Lei Eusébio de Queirós (1850)",
    "opcoes": [
      "A) acabou com a escravidão interna.",
      "B) proibiu o tráfico atlântico de escravos.",
      "C) libertou todos os escravos sexagenários.",
      "D) libertou crianças nascidas de mães escravas."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo do café, da abolição e da transição para o trabalho livre é fundamental para compreender a formação do mercado de trabalho e das desigualdades sociais no Brasil, temas frequentes no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Lei do Ventre Livre (1871) determinava que:",
    "opcoes": [
      "A) todos os escravos seriam libertos.",
      "B) filhos de escravas nasciam livres.",
      "C) somente os idosos seriam libertos.",
      "D) apenas escravos urbanos seriam livres."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo do café, da abolição e da transição para o trabalho livre é fundamental para compreender a formação do mercado de trabalho e das desigualdades sociais no Brasil, temas frequentes no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'republica-velha-coronelismo-voto-de-cabresto-e-movimentos-sociais': {
    slug: 'republica-velha-coronelismo-voto-de-cabresto-e-movimentos-sociais',
    resumo: `A República Velha (1889–1930) foi marcada pelo domínio das oligarquias rurais, pelo coronelismo e por um sistema eleitoral excludente, ao mesmo tempo em que surgiram movimentos sociais urbanos e rurais.`,

    explicacao: `<h2>📚 República Velha: coronelismo, voto de cabresto e movimentos sociais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>República da Espada x República Oligárquica</li>
      <li>Política dos Governadores e “café com leite”</li>
      <li>Coronelismo e voto de cabresto</li>
      <li>Exclusão de analfabetos do voto</li>
      <li>Movimentos sociais: Canudos, Contestado, Revolta da Vacina, Revolta da Chibata</li>
      <li>Primeiras greves operárias</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Após a Proclamação da República, o poder político consolidou-se nas mãos de oligarquias estaduais (especialmente São Paulo e Minas Gerais), que controlavam votos por meio dos “coronéis” – grandes proprietários locais. O voto era aberto, manipulável e excluía analfabetos, mulheres e soldados. Movimentos como Canudos e Contestado revelaram conflitos no campo; revoltas urbanas (Vacina, Chibata) mostraram tensões entre Estado e população. O crescimento da classe operária trouxe greves e organização sindical.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Pergunta: O coronelismo pode ser definido como: A) domínio de militares sobre a política. B) controle de grandes proprietários rurais sobre votos e poder local. C) influência da Igreja na República. D) domínio dos operários. Resposta: **B**. Exemplo 2 Uma questão sobre Canudos destaca um movimento sertanejo liderado por Antônio Conselheiro, reprimido pelo Exército. Comentário: Exemplo de conflito entre populações pobres do sertão e o Estado republicano.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Pergunta: O coronelismo pode ser definido como: A) domínio de militares sobre a política. B) controle de grandes proprietários rurais sobre votos e poder local. C) influência da Igreja na República. D) domínio dos operários. Resposta: **B**. Exemplo 2 Uma questão sobre Canudos destaca um movimento sertanejo liderado por Antônio Conselheiro, reprimido pelo Exército. Comentário: Exemplo de conflito entre populações pobres do sertão e o Estado republicano.`
    ],

    memorizacao: [
      'República da Espada x República Oligárquica',
      'Política dos Governadores e “café com leite”',
      'Coronelismo e voto de cabresto',
      'Exclusão de analfabetos do voto',
      'Movimentos sociais: Canudos, Contestado, Revolta da Vacina, Revolta da Chibata'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A política “café com leite” representava a alternância de poder entre:",
    "alternativas": [
      "A) Rio de Janeiro e Bahia.",
      "B) Minas Gerais e Bahia.",
      "C) São Paulo e Minas Gerais.",
      "D) São Paulo e Rio Grande do Sul."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: O coronelismo pode ser definido como: A) domínio de militares sobre a política. B) controle de grandes proprietários rurais sobre votos e poder local. C) influência da Igreja na República. D) domínio dos operários. Resposta: **B**. Exemplo 2 Uma questão sobre Canudos destaca um movimento sertanejo liderado por Antônio Conselheiro, reprimido pelo Exército. Comentário: Exemplo de conflito entre populações pobres do sertão e o Estado republicano. "
  },
  {
    "enunciado": "2) O voto de cabresto era:",
    "alternativas": [
      "A) voto secreto e livre.",
      "B) controle do voto pelo coronel.",
      "C) voto eletrônico.",
      "D) voto obrigatório."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: O coronelismo pode ser definido como: A) domínio de militares sobre a política. B) controle de grandes proprietários rurais sobre votos e poder local. C) influência da Igreja na República. D) domínio dos operários. Resposta: **B**. Exemplo 2 Uma questão sobre Canudos destaca um movimento sertanejo liderado por Antônio Conselheiro, reprimido pelo Exército. Comentário: Exemplo de conflito entre populações pobres do sertão e o Estado republicano. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Revolta da Vacina (1904) ocorreu no contexto de:",
    "alternativas": [
      "A) campanhas sanitárias autoritárias no Rio de Janeiro.",
      "B) Proclamação da República.",
      "C) abolição da escravidão.",
      "D) redemocratização."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) O movimento de Canudos ocorreu em:",
    "alternativas": [
      "A) São Paulo industrial.",
      "B) Sertão da Bahia.",
      "C) Amazônia.",
      "D) Sul do Brasil."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Um traço comum das revoltas da República Velha é:",
    "alternativas": [
      "A) ausência de repressão.",
      "B) forte repressão estatal.",
      "C) liderança de grandes empresários.",
      "D) ausência de demandas sociais."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'República Velha: coronelismo, voto de cabresto e movimentos sociais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'República da Espada x República Oligárquica',
            'Política dos Governadores e “café com leite”',
            'Coronelismo e voto de cabresto',
            'Exclusão de analfabetos do voto'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A política “café com leite” representava a alternância de poder entre:",
    "opcoes": [
      "A) Rio de Janeiro e Bahia.",
      "B) Minas Gerais e Bahia.",
      "C) São Paulo e Minas Gerais.",
      "D) São Paulo e Rio Grande do Sul."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha evidencia como o poder político se articulava com elites rurais e como setores populares resistiram a esse modelo, temas recorrentes em questões de cidadania e democracia no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O voto de cabresto era:",
    "opcoes": [
      "A) voto secreto e livre.",
      "B) controle do voto pelo coronel.",
      "C) voto eletrônico.",
      "D) voto obrigatório."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha evidencia como o poder político se articulava com elites rurais e como setores populares resistiram a esse modelo, temas recorrentes em questões de cidadania e democracia no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Revolta da Vacina (1904) ocorreu no contexto de:",
    "opcoes": [
      "A) campanhas sanitárias autoritárias no Rio de Janeiro.",
      "B) Proclamação da República.",
      "C) abolição da escravidão.",
      "D) redemocratização."
    ],
    "respostaCorreta": 1,
    "explicacao": "A República Velha evidencia como o poder político se articulava com elites rurais e como setores populares resistiram a esse modelo, temas recorrentes em questões de cidadania e democracia no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'era-vargas-estado-novo-trabalhismo-e-industrializacao': {
    slug: 'era-vargas-estado-novo-trabalhismo-e-industrializacao',
    resumo: `A Era Vargas (1930–1945 e 1951–1954) foi um período de forte centralização do poder, expansão dos direitos trabalhistas e impulso à industrialização.`,

    explicacao: `<h2>📚 Era Vargas: Estado Novo, trabalhismo e industrialização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução de 1930 e fim da República Velha</li>
      <li>Governo Provisório, Governo Constitucional e Estado Novo (1937–1945)</li>
      <li>Centralização, censura e propaganda (DIP)</li>
      <li>Leis trabalhistas, CLT, sindicatos atrelados ao Estado</li>
      <li>Industrialização de base (CSN, Vale, Petrobrás – já no segundo governo)</li>
      <li>Nacionalismo e populismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Getúlio Vargas chegou ao poder com apoio de setores urbanos e militares, rompendo com o domínio das oligarquias. O Estado Novo instaurou um regime autoritário, com fechamento do Congresso, censura e propaganda. Ao mesmo tempo, Vargas fortaleceu uma imagem de “Pai dos Pobres” ao criar leis trabalhistas e ampliar a presença do Estado na economia. O período foi decisivo para a industrialização, com criação de empresas estatais e incentivo à substituição de importações.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão destaca a CLT (Consolidação das Leis do Trabalho) e o reconhecimento de direitos trabalhistas. Comentário: Embora importante, o sistema sindical mantinha forte controle estatal. Exemplo 2 Pergunta: O Estado Novo (1937–1945) caracterizou-se por: A) ampla democracia e liberdade de imprensa. B) regime autoritário, com censura e culto ao líder. C) parlamentarismo estável. D) ausência de propaganda oficial. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão destaca a CLT (Consolidação das Leis do Trabalho) e o reconhecimento de direitos trabalhistas. Comentário: Embora importante, o sistema sindical mantinha forte controle estatal. Exemplo 2 Pergunta: O Estado Novo (1937–1945) caracterizou-se por: A) ampla democracia e liberdade de imprensa. B) regime autoritário, com censura e culto ao líder. C) parlamentarismo estável. D) ausência de propaganda oficial. Resposta: **B**.`
    ],

    memorizacao: [
      'Revolução de 1930 e fim da República Velha',
      'Governo Provisório, Governo Constitucional e Estado Novo (1937–1945)',
      'Centralização, censura e propaganda (DIP)',
      'Leis trabalhistas, CLT, sindicatos atrelados ao Estado',
      'Industrialização de base (CSN, Vale, Petrobrás – já no segundo governo)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Revolução de 1930 marcou:",
    "alternativas": [
      "A) a volta do Império.",
      "B) o fim da República Velha e a ascensão de Vargas.",
      "C) a Proclamação da República.",
      "D) a abolição da escravidão."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a CLT (Consolidação das Leis do Trabalho) e o reconhecimento de direitos trabalhistas. Comentário: Embora importante, o sistema sindical mantinha forte controle estatal. Exemplo 2 Pergunta: O Estado Novo (1937–1945) caracterizou-se por: A) ampla democracia e liberdade de imprensa. B) regime autoritário, com censura e culto ao líder. C) parlamentarismo estável. D) ausência de propaganda oficial. Resposta: **B**. "
  },
  {
    "enunciado": "2) O Estado Novo foi:",
    "alternativas": [
      "A) uma democracia parlamentar.",
      "B) um regime autoritário e centralizador.",
      "C) uma monarquia.",
      "D) um governo anarquista."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca a CLT (Consolidação das Leis do Trabalho) e o reconhecimento de direitos trabalhistas. Comentário: Embora importante, o sistema sindical mantinha forte controle estatal. Exemplo 2 Pergunta: O Estado Novo (1937–1945) caracterizou-se por: A) ampla democracia e liberdade de imprensa. B) regime autoritário, com censura e culto ao líder. C) parlamentarismo estável. D) ausência de propaganda oficial. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A CLT:",
    "alternativas": [
      "A) unificou e consolidou leis trabalhistas.",
      "B) extinguiu todos os direitos dos trabalhadores.",
      "C) não teve relação com Vargas.",
      "D) tratou apenas de impostos."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A industrialização da Era Vargas se baseou em:",
    "alternativas": [
      "A) total ausência do Estado na economia.",
      "B) forte papel do Estado e empresas estatais.",
      "C) apenas capital estrangeiro.",
      "D) primazia da agricultura."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O uso de propaganda oficial no Estado Novo visava:",
    "alternativas": [
      "A) criticar o governo abertamente.",
      "B) construir imagem positiva do regime e do líder.",
      "C) fortalecer a oposição.",
      "D) divulgar apenas produtos comerciais."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Era Vargas: Estado Novo, trabalhismo e industrialização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução de 1930 e fim da República Velha',
            'Governo Provisório, Governo Constitucional e Estado Novo (1937–1945)',
            'Centralização, censura e propaganda (DIP)',
            'Leis trabalhistas, CLT, sindicatos atrelados ao Estado'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Revolução de 1930 marcou:",
    "opcoes": [
      "A) a volta do Império.",
      "B) o fim da República Velha e a ascensão de Vargas.",
      "C) a Proclamação da República.",
      "D) a abolição da escravidão."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas é central para entender a formação do Estado nacional desenvolvimentista, o trabalhismo e a industrialização brasileira, temas frequentes em provas do ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O Estado Novo foi:",
    "opcoes": [
      "A) uma democracia parlamentar.",
      "B) um regime autoritário e centralizador.",
      "C) uma monarquia.",
      "D) um governo anarquista."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas é central para entender a formação do Estado nacional desenvolvimentista, o trabalhismo e a industrialização brasileira, temas frequentes em provas do ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A CLT:",
    "opcoes": [
      "A) unificou e consolidou leis trabalhistas.",
      "B) extinguiu todos os direitos dos trabalhadores.",
      "C) não teve relação com Vargas.",
      "D) tratou apenas de impostos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Era Vargas é central para entender a formação do Estado nacional desenvolvimentista, o trabalhismo e a industrialização brasileira, temas frequentes em provas do ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'ditadura-militar-19641985-repressao-milagre-economico-e-resistencia': {
    slug: 'ditadura-militar-19641985-repressao-milagre-economico-e-resistencia',
    resumo: `O golpe de 1964 instaurou uma ditadura militar que durou até 1985, marcada por autoritarismo, censura, repressão política e um ciclo de crescimento econômico seguido de crise.`,

    explicacao: `<h2>📚 Ditadura Militar (1964–1985): repressão, milagre econômico e resistência</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Golpe de 1964 e apoio de setores civis e empresariais</li>
      <li>Atos Institucionais (AI-1, AI-2, AI-5)</li>
      <li>Bipartidarismo (ARENA x MDB)</li>
      <li>Censura, tortura, desaparecimentos</li>
      <li>Milagre econômico, concentração de renda, endividamento externo</li>
      <li>Movimentos de resistência: estudantes, artistas, imprensa alternativa, guerrilhas</li>
      <li>Abertura lenta, gradual e segura; Diretas Já</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O regime militar restringiu liberdades políticas, fechou o Congresso em momentos críticos e instituiu AIs que ampliavam o poder do Executivo. O AI-5 (1968) foi o ápice da repressão. O milagre econômico (final dos anos 1960 e começo dos 70) trouxe crescimento do PIB, mas com concentração de renda e aumento da dependência externa. A partir do fim dos anos 70, crises econômicas e mobilização popular (Diretas Já) pressionaram pela redemocratização.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Pergunta: O AI-5 ficou conhecido por: A) ampliar a liberdade de expressão. B) suspender direitos políticos e permitir fechamento do Congresso. C) instaurar eleições diretas para presidente. D) abolir a censura. Resposta: **B**. Exemplo 2 Uma questão analisa o “milagre econômico” destacando crescimento e aumento da desigualdade. Comentário: Crescimento sem distribuição de renda e com endividamento externo.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Pergunta: O AI-5 ficou conhecido por: A) ampliar a liberdade de expressão. B) suspender direitos políticos e permitir fechamento do Congresso. C) instaurar eleições diretas para presidente. D) abolir a censura. Resposta: **B**. Exemplo 2 Uma questão analisa o “milagre econômico” destacando crescimento e aumento da desigualdade. Comentário: Crescimento sem distribuição de renda e com endividamento externo.`
    ],

    memorizacao: [
      'Golpe de 1964 e apoio de setores civis e empresariais',
      'Atos Institucionais (AI-1, AI-2, AI-5)',
      'Bipartidarismo (ARENA x MDB)',
      'Censura, tortura, desaparecimentos',
      'Milagre econômico, concentração de renda, endividamento externo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O golpe de 1964 foi justificado pelos militares como:",
    "alternativas": [
      "A) proteção da democracia contra “ameaça comunista”.",
      "B) retorno imediato ao regime imperial.",
      "C) implantação de socialismo.",
      "D) desmilitarização do Estado."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: O AI-5 ficou conhecido por: A) ampliar a liberdade de expressão. B) suspender direitos políticos e permitir fechamento do Congresso. C) instaurar eleições diretas para presidente. D) abolir a censura. Resposta: **B**. Exemplo 2 Uma questão analisa o “milagre econômico” destacando crescimento e aumento da desigualdade. Comentário: Crescimento sem distribuição de renda e com endividamento externo. "
  },
  {
    "enunciado": "2) O AI-5 resultou em:",
    "alternativas": [
      "A) maior participação popular.",
      "B) endurecimento da repressão e suspensão de garantias.",
      "C) fim da censura.",
      "D) legalização de todos os partidos."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: O AI-5 ficou conhecido por: A) ampliar a liberdade de expressão. B) suspender direitos políticos e permitir fechamento do Congresso. C) instaurar eleições diretas para presidente. D) abolir a censura. Resposta: **B**. Exemplo 2 Uma questão analisa o “milagre econômico” destacando crescimento e aumento da desigualdade. Comentário: Crescimento sem distribuição de renda e com endividamento externo. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O bipartidarismo (ARENA x MDB) foi:",
    "alternativas": [
      "A) sistema com vários partidos.",
      "B) forma de limitar a oposição.",
      "C) ausência de partidos.",
      "D) apenas para eleições municipais."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) O milagre econômico:",
    "alternativas": [
      "A) ocorreu sem aumento da dívida externa.",
      "B) trouxe crescimento com concentração de renda.",
      "C) significou distribuição ampla de renda.",
      "D) reduziu todas as desigualdades."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O movimento Diretas Já defendia:",
    "alternativas": [
      "A) eleição indireta.",
      "B) manutenção do regime militar.",
      "C) eleições diretas para presidente.",
      "D) volta ao voto censitário."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Ditadura Militar (1964–1985): repressão, milagre econômico e resistência',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Golpe de 1964 e apoio de setores civis e empresariais',
            'Atos Institucionais (AI-1, AI-2, AI-5)',
            'Bipartidarismo (ARENA x MDB)',
            'Censura, tortura, desaparecimentos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O golpe de 1964 foi justificado pelos militares como:",
    "opcoes": [
      "A) proteção da democracia contra “ameaça comunista”.",
      "B) retorno imediato ao regime imperial.",
      "C) implantação de socialismo.",
      "D) desmilitarização do Estado."
    ],
    "respostaCorreta": 1,
    "explicacao": "A ditadura militar é tema recorrente no ENEM, conectando política, direitos humanos, economia e memória histórica. Saber relacionar o período à redemocratização é essencial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O AI-5 resultou em:",
    "opcoes": [
      "A) maior participação popular.",
      "B) endurecimento da repressão e suspensão de garantias.",
      "C) fim da censura.",
      "D) legalização de todos os partidos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A ditadura militar é tema recorrente no ENEM, conectando política, direitos humanos, economia e memória histórica. Saber relacionar o período à redemocratização é essencial. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O bipartidarismo (ARENA x MDB) foi:",
    "opcoes": [
      "A) sistema com vários partidos.",
      "B) forma de limitar a oposição.",
      "C) ausência de partidos.",
      "D) apenas para eleições municipais."
    ],
    "respostaCorreta": 1,
    "explicacao": "A ditadura militar é tema recorrente no ENEM, conectando política, direitos humanos, economia e memória histórica. Saber relacionar o período à redemocratização é essencial. ",
    "dificuldade": "média"
  }
]
    }
  },

  'redemocratizacao-constituicao-de-1988-e-cidadania': {
    slug: 'redemocratizacao-constituicao-de-1988-e-cidadania',
    resumo: `Após a ditadura, o Brasil passou por um processo de redemocratização que culminou na Constituição de 1988, chamada “Constituição Cidadã”, ampliando direitos políticos, sociais e civis.`,

    explicacao: `<h2>📚 Redemocratização, Constituição de 1988 e cidadania</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Governo Sarney e transição</li>
      <li>Assembleia Constituinte (1987–1988)</li>
      <li>Princípios da Constituição de 1988</li>
      <li>Direitos sociais (saúde, educação, previdência, assistência)</li>
      <li>Sistema de saúde (SUS)</li>
      <li>Voto direto, pluralismo partidário, liberdade de expressão</li>
      <li>Desafios da democracia (desigualdades, violência, corrupção)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Constituição de 1988 consagrou o Brasil como Estado Democrático de Direito, com separação de poderes, ampla gama de direitos e garantias fundamentais, reconhecimento de direitos de minorias e de políticas sociais. Apesar dos avanços institucionais, o país enfrenta desafios na efetivação desses direitos, devido a desigualdades sociais, raciais e regionais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão descreve a Constituição de 1988 como “Cidadã”. Comentário: O termo enfatiza o foco em direitos e cidadania, associando texto constitucional às lutas sociais dos anos 1970–80. Exemplo 2 Pergunta: A Constituição de 1988 assegurou: A) voto apenas masculino. B) fim do SUS. C) direitos sociais como saúde e educação universal. D) volta do regime militar. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão descreve a Constituição de 1988 como “Cidadã”. Comentário: O termo enfatiza o foco em direitos e cidadania, associando texto constitucional às lutas sociais dos anos 1970–80. Exemplo 2 Pergunta: A Constituição de 1988 assegurou: A) voto apenas masculino. B) fim do SUS. C) direitos sociais como saúde e educação universal. D) volta do regime militar. Resposta: **C**.`
    ],

    memorizacao: [
      'Governo Sarney e transição',
      'Assembleia Constituinte (1987–1988)',
      'Princípios da Constituição de 1988',
      'Direitos sociais (saúde, educação, previdência, assistência)',
      'Sistema de saúde (SUS)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Constituição de 1988 marca:",
    "alternativas": [
      "A) o início da ditadura.",
      "B) a redemocratização e consolidação de direitos.",
      "C) a volta do Império.",
      "D) a independência de Portugal."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão descreve a Constituição de 1988 como “Cidadã”. Comentário: O termo enfatiza o foco em direitos e cidadania, associando texto constitucional às lutas sociais dos anos 1970–80. Exemplo 2 Pergunta: A Constituição de 1988 assegurou: A) voto apenas masculino. B) fim do SUS. C) direitos sociais como saúde e educação universal. D) volta do regime militar. Resposta: **C**. "
  },
  {
    "enunciado": "2) O SUS, criado pela Constituição, tem como princípio:",
    "alternativas": [
      "A) acesso apenas para quem tem plano privado.",
      "B) universalidade do acesso à saúde.",
      "C) saúde restrita às Forças Armadas.",
      "D) saúde apenas para trabalhadores formais."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão descreve a Constituição de 1988 como “Cidadã”. Comentário: O termo enfatiza o foco em direitos e cidadania, associando texto constitucional às lutas sociais dos anos 1970–80. Exemplo 2 Pergunta: A Constituição de 1988 assegurou: A) voto apenas masculino. B) fim do SUS. C) direitos sociais como saúde e educação universal. D) volta do regime militar. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O pluralismo partidário significa:",
    "alternativas": [
      "A) apenas dois partidos.",
      "B) proibição de partidos.",
      "C) possibilidade de existência de vários partidos.",
      "D) partido único."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A “Constituição Cidadã” foi assim chamada porque:",
    "alternativas": [
      "A) reduziu direitos civis.",
      "B) ampliou direitos e garantias fundamentais.",
      "C) aboliu direitos trabalhistas.",
      "D) limitou participação política."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Um desafio da democracia brasileira pós-1988 é:",
    "alternativas": [
      "A) inexistência de desigualdade.",
      "B) consolidação completa de todos os direitos.",
      "C) persistência de desigualdades e violência.",
      "D) ausência de participação política."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Redemocratização, Constituição de 1988 e cidadania',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Governo Sarney e transição',
            'Assembleia Constituinte (1987–1988)',
            'Princípios da Constituição de 1988',
            'Direitos sociais (saúde, educação, previdência, assistência)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Constituição de 1988 marca:",
    "opcoes": [
      "A) o início da ditadura.",
      "B) a redemocratização e consolidação de direitos.",
      "C) a volta do Império.",
      "D) a independência de Portugal."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização e a Constituição de 1988 são fundamentais para questões sobre cidadania, direitos humanos e políticas públicas no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O SUS, criado pela Constituição, tem como princípio:",
    "opcoes": [
      "A) acesso apenas para quem tem plano privado.",
      "B) universalidade do acesso à saúde.",
      "C) saúde restrita às Forças Armadas.",
      "D) saúde apenas para trabalhadores formais."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização e a Constituição de 1988 são fundamentais para questões sobre cidadania, direitos humanos e políticas públicas no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O pluralismo partidário significa:",
    "opcoes": [
      "A) apenas dois partidos.",
      "B) proibição de partidos.",
      "C) possibilidade de existência de vários partidos.",
      "D) partido único."
    ],
    "respostaCorreta": 1,
    "explicacao": "A redemocratização e a Constituição de 1988 são fundamentais para questões sobre cidadania, direitos humanos e políticas públicas no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'revolucao-industrial-e-transformacoes-do-trabalho': {
    slug: 'revolucao-industrial-e-transformacoes-do-trabalho',
    resumo: `A Revolução Industrial, iniciada na Inglaterra no século XVIII, transformou radicalmente formas de produção, organização do trabalho, espaço urbano e relações sociais, com impacto global.`,

    explicacao: `<h2>📚 Revolução Industrial e transformações do trabalho</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Primeira Revolução Industrial (carvão, ferro, máquina a vapor)</li>
      <li>Segunda Revolução (eletricidade, petróleo, aço, química)</li>
      <li>Terceira Revolução ou Revolução Técnico-Científica e Informacional</li>
      <li>Fábrica, divisão do trabalho, trabalho assalariado</li>
      <li>Urbanização acelerada, proletariado, movimentos operários</li>
      <li>Ludismo, cartismo, sindicatos, legislação trabalhista</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A mecanização da produção aumentou a produtividade, mas também intensificou a exploração do trabalho. Jornadas longas, baixos salários e condições insalubres provocaram movimentos de resistência (ludismo, cartismo) e o surgimento de sindicatos e legislações trabalhistas. As revoluções posteriores integraram novas fontes de energia, tecnologias de comunicação e automação, alterando ainda mais o mundo do trabalho.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão menciona trabalhadores destruindo máquinas no século XIX. Comentário: Trata-se do ludismo, forma inicial de resistência à mecanização. Exemplo 2 Pergunta: A Primeira Revolução Industrial ficou marcada pelo uso de: A) energia nuclear. B) máquinas a vapor movidas a carvão. C) energia solar. D) internet. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão menciona trabalhadores destruindo máquinas no século XIX. Comentário: Trata-se do ludismo, forma inicial de resistência à mecanização. Exemplo 2 Pergunta: A Primeira Revolução Industrial ficou marcada pelo uso de: A) energia nuclear. B) máquinas a vapor movidas a carvão. C) energia solar. D) internet. Resposta: **B**.`
    ],

    memorizacao: [
      'Primeira Revolução Industrial (carvão, ferro, máquina a vapor)',
      'Segunda Revolução (eletricidade, petróleo, aço, química)',
      'Terceira Revolução ou Revolução Técnico-Científica e Informacional',
      'Fábrica, divisão do trabalho, trabalho assalariado',
      'Urbanização acelerada, proletariado, movimentos operários'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Revolução Industrial começou em:",
    "alternativas": [
      "A) França.",
      "B) Alemanha.",
      "C) Inglaterra.",
      "D) Estados Unidos."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão menciona trabalhadores destruindo máquinas no século XIX. Comentário: Trata-se do ludismo, forma inicial de resistência à mecanização. Exemplo 2 Pergunta: A Primeira Revolução Industrial ficou marcada pelo uso de: A) energia nuclear. B) máquinas a vapor movidas a carvão. C) energia solar. D) internet. Resposta: **B**. "
  },
  {
    "enunciado": "2) O ludismo consistiu em:",
    "alternativas": [
      "A) defesa da mecanização.",
      "B) destruição de máquinas.",
      "C) criação de sindicatos estatais.",
      "D) greve pacífica apenas."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão menciona trabalhadores destruindo máquinas no século XIX. Comentário: Trata-se do ludismo, forma inicial de resistência à mecanização. Exemplo 2 Pergunta: A Primeira Revolução Industrial ficou marcada pelo uso de: A) energia nuclear. B) máquinas a vapor movidas a carvão. C) energia solar. D) internet. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O trabalho assalariado industrial substituiu em grande medida:",
    "alternativas": [
      "A) trabalho escravo nas fábricas europeias.",
      "B) trabalho servil, artesanal e doméstico.",
      "C) trabalho voluntário.",
      "D) ausência de trabalho."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A Segunda Revolução Industrial incorporou:",
    "alternativas": [
      "A) apenas carvão e ferro.",
      "B) eletricidade, petróleo e química industrial.",
      "C) apenas energia eólica.",
      "D) somente tecnologia digital."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A Revolução Técnico-Científica está ligada a:",
    "alternativas": [
      "A) internet, automação, informática.",
      "B) apenas agricultura manual.",
      "C) fim da tecnologia.",
      "D) retorno ao artesanato."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Revolução Industrial e transformações do trabalho',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Primeira Revolução Industrial (carvão, ferro, máquina a vapor)',
            'Segunda Revolução (eletricidade, petróleo, aço, química)',
            'Terceira Revolução ou Revolução Técnico-Científica e Informacional',
            'Fábrica, divisão do trabalho, trabalho assalariado'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Revolução Industrial começou em:",
    "opcoes": [
      "A) França.",
      "B) Alemanha.",
      "C) Inglaterra.",
      "D) Estados Unidos."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Revolução Industrial é tema central no ENEM para relacionar tecnologia, trabalho, urbanização, desigualdades e meio ambiente. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O ludismo consistiu em:",
    "opcoes": [
      "A) defesa da mecanização.",
      "B) destruição de máquinas.",
      "C) criação de sindicatos estatais.",
      "D) greve pacífica apenas."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Revolução Industrial é tema central no ENEM para relacionar tecnologia, trabalho, urbanização, desigualdades e meio ambiente. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O trabalho assalariado industrial substituiu em grande medida:",
    "opcoes": [
      "A) trabalho escravo nas fábricas europeias.",
      "B) trabalho servil, artesanal e doméstico.",
      "C) trabalho voluntário.",
      "D) ausência de trabalho."
    ],
    "respostaCorreta": 1,
    "explicacao": "A Revolução Industrial é tema central no ENEM para relacionar tecnologia, trabalho, urbanização, desigualdades e meio ambiente. ",
    "dificuldade": "média"
  }
]
    }
  },

  'imperialismo-guerras-mundiais-e-guerra-fria': {
    slug: 'imperialismo-guerras-mundiais-e-guerra-fria',
    resumo: `O imperialismo europeu no século XIX, as duas Guerras Mundiais e a Guerra Fria marcaram de forma decisiva a geopolítica e as relações internacionais contemporâneas.`,

    explicacao: `<h2>📚 Imperialismo, Guerras Mundiais e Guerra Fria</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Imperialismo e neocolonialismo (África, Ásia)</li>
      <li>Primeira Guerra Mundial (1914–1918): causas, alianças, trincheiras, Tratado de Versalhes</li>
      <li>Segunda Guerra Mundial (1939–1945): nazismo, fascismo, holocausto, bombas atômicas</li>
      <li>Organização das Nações Unidas (ONU)</li>
      <li>Guerra Fria: bipolaridade EUA x URSS, corrida armamentista, corrida espacial</li>
      <li>Crises: Berlim, Cuba, Vietnã</li>
      <li>Descolonização da África e Ásia</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O imperialismo ampliou o domínio europeu sobre territórios na África e na Ásia, explorando recursos e mão de obra. Tensões imperialistas, nacionalismos e alianças militares contribuíram para a eclosão da Primeira Guerra. O Tratado de Versalhes, considerado humilhante pela Alemanha, somado à crise econômica, criou condições para ascensão do nazismo e para a Segunda Guerra. Após 1945, o mundo se dividiu em dois blocos: capitalista (EUA) e socialista (URSS). A Guerra Fria não foi confronto direto entre as superpotências, mas envolveu guerras indiretas, corrida armamentista e disputa ideológica.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão fala da partilha da África em conferências europeias sem consultar povos africanos. Comentário: Exemplo clássico do neocolonialismo imperialista. Exemplo 2 Pergunta: A Guerra Fria caracterizou-se por: A) guerra direta EUA x URSS. B) tensão permanente, corrida armamentista e conflitos indiretos. C) ausência de rivalidade ideológica. D) domínio total de um único bloco. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão fala da partilha da África em conferências europeias sem consultar povos africanos. Comentário: Exemplo clássico do neocolonialismo imperialista. Exemplo 2 Pergunta: A Guerra Fria caracterizou-se por: A) guerra direta EUA x URSS. B) tensão permanente, corrida armamentista e conflitos indiretos. C) ausência de rivalidade ideológica. D) domínio total de um único bloco. Resposta: **B**.`
    ],

    memorizacao: [
      'Imperialismo e neocolonialismo (África, Ásia)',
      'Primeira Guerra Mundial (1914–1918): causas, alianças, trincheiras, Tratado de Versalhes',
      'Segunda Guerra Mundial (1939–1945): nazismo, fascismo, holocausto, bombas atômicas',
      'Organização das Nações Unidas (ONU)',
      'Guerra Fria: bipolaridade EUA x URSS, corrida armamentista, corrida espacial'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O neocolonialismo foi:",
    "alternativas": [
      "A) expansão de domínios europeus em África e Ásia no século XIX.",
      "B) colonização da América pelos portugueses no século XVI.",
      "C) fim de todas as colônias.",
      "D) apenas comércio pacífico."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão fala da partilha da África em conferências europeias sem consultar povos africanos. Comentário: Exemplo clássico do neocolonialismo imperialista. Exemplo 2 Pergunta: A Guerra Fria caracterizou-se por: A) guerra direta EUA x URSS. B) tensão permanente, corrida armamentista e conflitos indiretos. C) ausência de rivalidade ideológica. D) domínio total de um único bloco. Resposta: **B**. "
  },
  {
    "enunciado": "2) A Primeira Guerra Mundial teve como uma das causas:",
    "alternativas": [
      "A) ausência de rivalidade entre potências.",
      "B) nacionalismos e disputas imperialistas.",
      "C) hegemonia pacífica de um só país.",
      "D) inexistência de alianças militares."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão fala da partilha da África em conferências europeias sem consultar povos africanos. Comentário: Exemplo clássico do neocolonialismo imperialista. Exemplo 2 Pergunta: A Guerra Fria caracterizou-se por: A) guerra direta EUA x URSS. B) tensão permanente, corrida armamentista e conflitos indiretos. C) ausência de rivalidade ideológica. D) domínio total de um único bloco. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O nazismo está relacionado a:",
    "alternativas": [
      "A) políticas democráticas.",
      "B) ideologia racista e expansionista na Alemanha.",
      "C) defesa dos direitos humanos.",
      "D) fim de qualquer tipo de preconceito."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A ONU foi criada com o objetivo de:",
    "alternativas": [
      "A) promover guerras entre nações.",
      "B) mediar conflitos e promover cooperação internacional.",
      "C) substituir todos os Estados nacionais.",
      "D) controlar apenas a economia mundial."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Na Guerra Fria, a corrida armamentista envolveu:",
    "alternativas": [
      "A) redução mútua de armas nucleares desde o início.",
      "B) acúmulo de armas nucleares e capacidade de destruição.",
      "C) fim das Forças Armadas em ambos os blocos.",
      "D) apenas armas convencionais."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Imperialismo, Guerras Mundiais e Guerra Fria',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Imperialismo e neocolonialismo (África, Ásia)',
            'Primeira Guerra Mundial (1914–1918): causas, alianças, trincheiras, Tratado de Versalhes',
            'Segunda Guerra Mundial (1939–1945): nazismo, fascismo, holocausto, bombas atômicas',
            'Organização das Nações Unidas (ONU)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O neocolonialismo foi:",
    "opcoes": [
      "A) expansão de domínios europeus em África e Ásia no século XIX.",
      "B) colonização da América pelos portugueses no século XVI.",
      "C) fim de todas as colônias.",
      "D) apenas comércio pacífico."
    ],
    "respostaCorreta": 1,
    "explicacao": "Imperialismo, Guerras Mundiais e Guerra Fria são pilares da história contemporânea e aparecem no ENEM conectados a geopolítica, direitos humanos, descolonização e organização do mundo atual. FIM DO BLOCO 3 – HISTÓRIA (10 temas) ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A Primeira Guerra Mundial teve como uma das causas:",
    "opcoes": [
      "A) ausência de rivalidade entre potências.",
      "B) nacionalismos e disputas imperialistas.",
      "C) hegemonia pacífica de um só país.",
      "D) inexistência de alianças militares."
    ],
    "respostaCorreta": 1,
    "explicacao": "Imperialismo, Guerras Mundiais e Guerra Fria são pilares da história contemporânea e aparecem no ENEM conectados a geopolítica, direitos humanos, descolonização e organização do mundo atual. FIM DO BLOCO 3 – HISTÓRIA (10 temas) ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O nazismo está relacionado a:",
    "opcoes": [
      "A) políticas democráticas.",
      "B) ideologia racista e expansionista na Alemanha.",
      "C) defesa dos direitos humanos.",
      "D) fim de qualquer tipo de preconceito."
    ],
    "respostaCorreta": 1,
    "explicacao": "Imperialismo, Guerras Mundiais e Guerra Fria são pilares da história contemporânea e aparecem no ENEM conectados a geopolítica, direitos humanos, descolonização e organização do mundo atual. FIM DO BLOCO 3 – HISTÓRIA (10 temas) ",
    "dificuldade": "média"
  }
]
    }
  },

  'historia-como-construcao-do-conhecimento': {
    slug: 'historia-como-construcao-do-conhecimento',
    resumo: `A História é uma ciência humana que interpreta o passado a partir de fontes. No ENEM, cai a ideia de que a História não é neutra nem “verdade absoluta”.`,

    explicacao: `<h2>📚 História como construção do conhecimento</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Fonte histórica (escrita, oral, material, iconográfica)</li>
      <li>Sujeito histórico</li>
      <li>Tempo histórico (curta, média e longa duração)</li>
      <li>Memória x História</li>
      <li>Interpretação e contexto</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O historiador analisa fontes e constrói interpretações conforme o contexto e as perguntas do presente. Por isso, diferentes leituras podem existir sobre o mesmo fato.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto afirma que “a História é uma narrativa construída”. Tema: **caráter interpretativo do conhecimento histórico**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto afirma que “a História é uma narrativa construída”. Tema: **caráter interpretativo do conhecimento histórico**.`
    ],

    memorizacao: [
      'Fonte histórica (escrita, oral, material, iconográfica)',
      'Sujeito histórico',
      'Tempo histórico (curta, média e longa duração)',
      'Memória x História',
      'Interpretação e contexto'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Fonte histórica pode ser:",
    "alternativas": [
      "A) só documentos escritos",
      "B) qualquer vestígio do passado humano",
      "C) apenas relatos oficiais",
      "D) apenas livros"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto afirma que “a História é uma narrativa construída”. Tema: **caráter interpretativo do conhecimento histórico**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'História como construção do conhecimento',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Fonte histórica (escrita, oral, material, iconográfica)',
            'Sujeito histórico',
            'Tempo histórico (curta, média e longa duração)',
            'Memória x História'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Fonte histórica pode ser:",
    "opcoes": [
      "A) só documentos escritos",
      "B) qualquer vestígio do passado humano",
      "C) apenas relatos oficiais",
      "D) apenas livros"
    ],
    "respostaCorreta": -16,
    "explicacao": "História é análise crítica do passado, não simples memorização de datas. ",
    "dificuldade": "média"
  }
]
    }
  },

  'antiguidade-grecia-e-roma': {
    slug: 'antiguidade-grecia-e-roma',
    resumo: `Grécia e Roma influenciaram política, cultura e direito do Ocidente.`,

    explicacao: `<h2>📚 Antiguidade: Grécia e Roma</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Democracia ateniense</li>
      <li>Cidadania restrita</li>
      <li>Império Romano</li>
      <li>Direito romano</li>
      <li>Escravidão</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A democracia ateniense excluía mulheres, escravos e estrangeiros. Roma consolidou leis e estruturas administrativas que influenciam até hoje.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre democracia antiga → **participação limitada**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre democracia antiga → **participação limitada**.`
    ],

    memorizacao: [
      'Democracia ateniense',
      'Cidadania restrita',
      'Império Romano',
      'Direito romano',
      'Escravidão'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A democracia ateniense era:",
    "alternativas": [
      "A) universal",
      "B) direta e restrita",
      "C) representativa",
      "D) monárquica"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre democracia antiga → **participação limitada**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Antiguidade: Grécia e Roma',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Democracia ateniense',
            'Cidadania restrita',
            'Império Romano',
            'Direito romano'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A democracia ateniense era:",
    "opcoes": [
      "A) universal",
      "B) direta e restrita",
      "C) representativa",
      "D) monárquica"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM compara passado e presente para mostrar limites da cidadania antiga. ",
    "dificuldade": "média"
  }
]
    }
  },

  'feudalismo-e-sociedade-medieval': {
    slug: 'feudalismo-e-sociedade-medieval',
    resumo: `Sistema baseado na terra, na hierarquia social e na economia agrária.`,

    explicacao: `<h2>📚 Feudalismo e sociedade medieval</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Suserania e vassalagem</li>
      <li>Economia agrária</li>
      <li>Servidão</li>
      <li>Sociedade estamental</li>
      <li>Igreja Católica</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A terra era a principal fonte de riqueza. A mobilidade social era mínima e a Igreja tinha grande poder político e cultural.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre obrigações do camponês → **servidão feudal**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre obrigações do camponês → **servidão feudal**.`
    ],

    memorizacao: [
      'Suserania e vassalagem',
      'Economia agrária',
      'Servidão',
      'Sociedade estamental',
      'Igreja Católica'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A sociedade feudal era:",
    "alternativas": [
      "A) igualitária",
      "B) estamental",
      "C) capitalista",
      "D) urbana"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto sobre obrigações do camponês → **servidão feudal**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Feudalismo e sociedade medieval',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Suserania e vassalagem',
            'Economia agrária',
            'Servidão',
            'Sociedade estamental'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A sociedade feudal era:",
    "opcoes": [
      "A) igualitária",
      "B) estamental",
      "C) capitalista",
      "D) urbana"
    ],
    "respostaCorreta": -16,
    "explicacao": "O feudalismo explica a organização social e econômica da Idade Média. ",
    "dificuldade": "média"
  }
]
    }
  },

  'renascimento-e-humanismo': {
    slug: 'renascimento-e-humanismo',
    resumo: `Movimento cultural que valorizou o ser humano e o conhecimento científico.`,

    explicacao: `<h2>📚 Renascimento e Humanismo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Antropocentrismo</li>
      <li>Racionalismo</li>
      <li>Artes e ciências</li>
      <li>Mecenato</li>
      <li>Ruptura parcial com o teocentrismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Renascimento marcou a transição para a modernidade, com novas visões sobre arte, ciência e sociedade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Obra renascentista → **valorização do homem e da razão**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Obra renascentista → **valorização do homem e da razão**.`
    ],

    memorizacao: [
      'Antropocentrismo',
      'Racionalismo',
      'Artes e ciências',
      'Mecenato',
      'Ruptura parcial com o teocentrismo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O antropocentrismo valoriza:",
    "alternativas": [
      "A) Deus como centro",
      "B) o ser humano",
      "C) a Igreja",
      "D) o feudo"
    ],
    "respostaCorreta": -16,
    "resolucao": "Obra renascentista → **valorização do homem e da razão**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Renascimento e Humanismo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Antropocentrismo',
            'Racionalismo',
            'Artes e ciências',
            'Mecenato'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O antropocentrismo valoriza:",
    "opcoes": [
      "A) Deus como centro",
      "B) o ser humano",
      "C) a Igreja",
      "D) o feudo"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM cobra o Renascimento como ruptura cultural. ",
    "dificuldade": "média"
  }
]
    }
  },

  'expansao-maritima-europeia': {
    slug: 'expansao-maritima-europeia',
    resumo: `Processo de navegações que levou à colonização da América.`,

    explicacao: `<h2>📚 Expansão Marítima Europeia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Mercantilismo</li>
      <li>Grandes Navegações</li>
      <li>Colonialismo</li>
      <li>Escravidão</li>
      <li>Acumulação de capital</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>As navegações buscavam rotas comerciais e metais preciosos, iniciando o sistema colonial.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre exploração colonial → **mercantilismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre exploração colonial → **mercantilismo**.`
    ],

    memorizacao: [
      'Mercantilismo',
      'Grandes Navegações',
      'Colonialismo',
      'Escravidão',
      'Acumulação de capital'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Objetivo central da expansão marítima:",
    "alternativas": [
      "A) turismo",
      "B) comércio e riquezas",
      "C) religião apenas",
      "D) ciência pura"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre exploração colonial → **mercantilismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Expansão Marítima Europeia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Mercantilismo',
            'Grandes Navegações',
            'Colonialismo',
            'Escravidão'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Objetivo central da expansão marítima:",
    "opcoes": [
      "A) turismo",
      "B) comércio e riquezas",
      "C) religião apenas",
      "D) ciência pura"
    ],
    "respostaCorreta": -16,
    "explicacao": "A expansão europeia marcou o início do mundo moderno. ",
    "dificuldade": "média"
  }
]
    }
  },

  'brasil-colonial': {
    slug: 'brasil-colonial',
    resumo: `Economia baseada na monocultura e no trabalho escravizado.`,

    explicacao: `<h2>📚 Brasil Colonial</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Plantation</li>
      <li>Escravidão africana</li>
      <li>Açúcar</li>
      <li>Administração colonial</li>
      <li>Resistência escrava</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Brasil foi integrado ao sistema colonial como produtor de gêneros para exportação.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre engenhos → **economia açucareira**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre engenhos → **economia açucareira**.`
    ],

    memorizacao: [
      'Plantation',
      'Escravidão africana',
      'Açúcar',
      'Administração colonial',
      'Resistência escrava'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O sistema plantation se caracteriza por:",
    "alternativas": [
      "A) pequena propriedade",
      "B) monocultura e exportação",
      "C) trabalho assalariado",
      "D) diversidade agrícola"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto sobre engenhos → **economia açucareira**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Brasil Colonial',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Plantation',
            'Escravidão africana',
            'Açúcar',
            'Administração colonial'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O sistema plantation se caracteriza por:",
    "opcoes": [
      "A) pequena propriedade",
      "B) monocultura e exportação",
      "C) trabalho assalariado",
      "D) diversidade agrícola"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM relaciona colônia, escravidão e desigualdade. ",
    "dificuldade": "média"
  }
]
    }
  },

  'independencia-do-brasil': {
    slug: 'independencia-do-brasil',
    resumo: `Processo político marcado por interesses da elite.`,

    explicacao: `<h2>📚 Independência do Brasil</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crise do sistema colonial</li>
      <li>Elite agrária</li>
      <li>Continuidade social</li>
      <li>Monarquia</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A independência não rompeu com a estrutura social desigual.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto crítico → **independência conservadora**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto crítico → **independência conservadora**.`
    ],

    memorizacao: [
      'Crise do sistema colonial',
      'Elite agrária',
      'Continuidade social',
      'Monarquia'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A independência brasileira foi:",
    "alternativas": [
      "A) popular e radical",
      "B) elitista e conservadora",
      "C) socialista",
      "D) republicana"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto crítico → **independência conservadora**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Independência do Brasil',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crise do sistema colonial',
            'Elite agrária',
            'Continuidade social',
            'Monarquia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A independência brasileira foi:",
    "opcoes": [
      "A) popular e radical",
      "B) elitista e conservadora",
      "C) socialista",
      "D) republicana"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM enfatiza a permanência das desigualdades. ",
    "dificuldade": "média"
  }
]
    }
  },

  'republica-velha': {
    slug: 'republica-velha',
    resumo: `Período dominado pelas oligarquias.`,

    explicacao: `<h2>📚 República Velha</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Política do café com leite</li>
      <li>Coronelismo</li>
      <li>Voto aberto</li>
      <li>Exclusão social</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O poder político estava concentrado nas elites rurais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre coronelismo → **controle político local**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre coronelismo → **controle político local**.`
    ],

    memorizacao: [
      'Política do café com leite',
      'Coronelismo',
      'Voto aberto',
      'Exclusão social'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O voto na República Velha era:",
    "alternativas": [
      "A) secreto",
      "B) controlado pelas elites",
      "C) universal",
      "D) feminino"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre coronelismo → **controle político local**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'República Velha',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Política do café com leite',
            'Coronelismo',
            'Voto aberto',
            'Exclusão social'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O voto na República Velha era:",
    "opcoes": [
      "A) secreto",
      "B) controlado pelas elites",
      "C) universal",
      "D) feminino"
    ],
    "respostaCorreta": -16,
    "explicacao": "O período explica limites da democracia brasileira. ",
    "dificuldade": "média"
  }
]
    }
  },

  'era-vargas': {
    slug: 'era-vargas',
    resumo: `Período de centralização do poder e avanços trabalhistas.`,

    explicacao: `<h2>📚 Era Vargas</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Industrialização</li>
      <li>Populismo</li>
      <li>Leis trabalhistas</li>
      <li>Estado Novo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Vargas combinou autoritarismo e concessões sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre CLT → **direitos trabalhistas**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre CLT → **direitos trabalhistas**.`
    ],

    memorizacao: [
      'Industrialização',
      'Populismo',
      'Leis trabalhistas',
      'Estado Novo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A CLT foi criada para:",
    "alternativas": [
      "A) acabar com sindicatos",
      "B) regulamentar o trabalho",
      "C) privatizar indústrias",
      "D) extinguir direitos"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre CLT → **direitos trabalhistas**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Era Vargas',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Industrialização',
            'Populismo',
            'Leis trabalhistas',
            'Estado Novo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A CLT foi criada para:",
    "opcoes": [
      "A) acabar com sindicatos",
      "B) regulamentar o trabalho",
      "C) privatizar indústrias",
      "D) extinguir direitos"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM cobra contradições do varguismo. ",
    "dificuldade": "média"
  }
]
    }
  },

  'ditadura-militar-no-brasil': {
    slug: 'ditadura-militar-no-brasil',
    resumo: `Regime autoritário entre 1964 e 1985.`,

    explicacao: `<h2>📚 Ditadura Militar no Brasil</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Golpe de 1964</li>
      <li>Censura</li>
      <li>Repressão</li>
      <li>Milagre econômico</li>
      <li>Redemocratização</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O regime suprimiu direitos políticos, apesar de crescimento econômico em alguns períodos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre censura → **autoritarismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre censura → **autoritarismo**.`
    ],

    memorizacao: [
      'Golpe de 1964',
      'Censura',
      'Repressão',
      'Milagre econômico',
      'Redemocratização'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Característica da ditadura:",
    "alternativas": [
      "A) eleições livres",
      "B) censura e repressão",
      "C) participação popular",
      "D) democracia direta"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto sobre censura → **autoritarismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ditadura Militar no Brasil',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Golpe de 1964',
            'Censura',
            'Repressão',
            'Milagre econômico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Característica da ditadura:",
    "opcoes": [
      "A) eleições livres",
      "B) censura e repressão",
      "C) participação popular",
      "D) democracia direta"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM valoriza direitos humanos e memória histórica. FIM DO BLOCO 5 — HISTÓRIA ",
    "dificuldade": "média"
  }
]
    }
  },

  'historia-e-tempo-historico': {
    slug: 'historia-e-tempo-historico',
    resumo: `A História estuda as ações humanas ao longo do tempo.`,

    explicacao: `<h2>📚 História e tempo histórico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Tempo histórico</li>
      <li>Permanências e rupturas</li>
      <li>Fontes históricas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O tempo histórico não é apenas cronológico; ele analisa mudanças e continuidades nas sociedades humanas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto comparando passado e presente → **ruptura histórica**. 5. QUESTÃO Tempo histórico refere-se: A) apenas ao calendário B) às mudanças e permanências sociais C) ao tempo biológico D) à natureza Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto comparando passado e presente → **ruptura histórica**. 5. QUESTÃO Tempo histórico refere-se: A) apenas ao calendário B) às mudanças e permanências sociais C) ao tempo biológico D) à natureza Gabarito: B`
    ],

    memorizacao: [
      'Tempo histórico',
      'Permanências e rupturas',
      'Fontes históricas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'História e tempo histórico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Tempo histórico',
            'Permanências e rupturas',
            'Fontes históricas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'pre-historia': {
    slug: 'pre-historia',
    resumo: `Período anterior à escrita.`,

    explicacao: `<h2>📚 Pré-História</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Paleolítico</li>
      <li>Neolítico</li>
      <li>Revolução Agrícola</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Pré-História analisa a evolução humana, o domínio do fogo e a agricultura.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre sedentarização → **Neolítico**. 5. QUESTÃO A Revolução Agrícola permitiu: A) nomadismo B) sedentarização C) caça exclusiva D) fim da cultura Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre sedentarização → **Neolítico**. 5. QUESTÃO A Revolução Agrícola permitiu: A) nomadismo B) sedentarização C) caça exclusiva D) fim da cultura Gabarito: B`
    ],

    memorizacao: [
      'Paleolítico',
      'Neolítico',
      'Revolução Agrícola'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Pré-História',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Paleolítico',
            'Neolítico',
            'Revolução Agrícola'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'antiguidade-oriental': {
    slug: 'antiguidade-oriental',
    resumo: `Civilizações do Oriente Próximo.`,

    explicacao: `<h2>📚 Antiguidade Oriental</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Egito</li>
      <li>Mesopotâmia</li>
      <li>Estado teocrático</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Essas sociedades eram organizadas em torno da religião e dos rios.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre faraó → **poder religioso**. 5. QUESTÃO O Egito Antigo tinha: A) democracia B) poder teocrático C) feudalismo D) capitalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre faraó → **poder religioso**. 5. QUESTÃO O Egito Antigo tinha: A) democracia B) poder teocrático C) feudalismo D) capitalismo Gabarito: B`
    ],

    memorizacao: [
      'Egito',
      'Mesopotâmia',
      'Estado teocrático'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Antiguidade Oriental',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Egito',
            'Mesopotâmia',
            'Estado teocrático'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'antiguidade-classica': {
    slug: 'antiguidade-classica',
    resumo: `Grécia e Roma.`,

    explicacao: `<h2>📚 Antiguidade Clássica</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Democracia ateniense</li>
      <li>República romana</li>
      <li>Cidadania</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Grécia e Roma influenciaram política, direito e cultura ocidental.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre cidadania → **exclusão social**. 5. QUESTÃO A democracia ateniense era: A) universal B) direta e restrita C) indireta D) moderna Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre cidadania → **exclusão social**. 5. QUESTÃO A democracia ateniense era: A) universal B) direta e restrita C) indireta D) moderna Gabarito: B`
    ],

    memorizacao: [
      'Democracia ateniense',
      'República romana',
      'Cidadania'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Antiguidade Clássica',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Democracia ateniense',
            'República romana',
            'Cidadania'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'idade-media': {
    slug: 'idade-media',
    resumo: `Período do feudalismo.`,

    explicacao: `<h2>📚 Idade Média</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Feudalismo</li>
      <li>Igreja</li>
      <li>Relações servis</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Sociedade agrária baseada na terra e na hierarquia social.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre servidão → **feudalismo**. 5. QUESTÃO O feudalismo baseava-se: A) no comércio B) na terra C) na indústria D) na tecnologia Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre servidão → **feudalismo**. 5. QUESTÃO O feudalismo baseava-se: A) no comércio B) na terra C) na indústria D) na tecnologia Gabarito: B`
    ],

    memorizacao: [
      'Feudalismo',
      'Igreja',
      'Relações servis'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Idade Média',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Feudalismo',
            'Igreja',
            'Relações servis'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'idade-moderna': {
    slug: 'idade-moderna',
    resumo: `Transição para o mundo moderno.`,

    explicacao: `<h2>📚 Idade Moderna</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Absolutismo</li>
      <li>Mercantilismo</li>
      <li>Expansão marítima</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Fortalecimento do Estado e do comércio.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre mercantilismo → **acumulação de metais**. 5. QUESTÃO O absolutismo defendia: A) divisão do poder B) poder centralizado no rei C) democracia D) socialismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre mercantilismo → **acumulação de metais**. 5. QUESTÃO O absolutismo defendia: A) divisão do poder B) poder centralizado no rei C) democracia D) socialismo Gabarito: B`
    ],

    memorizacao: [
      'Absolutismo',
      'Mercantilismo',
      'Expansão marítima'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Idade Moderna',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Absolutismo',
            'Mercantilismo',
            'Expansão marítima'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'revolucoes-burguesas': {
    slug: 'revolucoes-burguesas',
    resumo: `Mudanças políticas e sociais.`,

    explicacao: `<h2>📚 Revoluções Burguesas</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução Francesa</li>
      <li>Revolução Industrial</li>
      <li>Liberalismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Essas revoluções consolidaram o capitalismo e os direitos civis.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre igualdade → **ideais iluministas**. 5. QUESTÃO A Revolução Francesa defendia: A) privilégios B) igualdade jurídica C) absolutismo D) servidão Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre igualdade → **ideais iluministas**. 5. QUESTÃO A Revolução Francesa defendia: A) privilégios B) igualdade jurídica C) absolutismo D) servidão Gabarito: B`
    ],

    memorizacao: [
      'Revolução Francesa',
      'Revolução Industrial',
      'Liberalismo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Revoluções Burguesas',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução Francesa',
            'Revolução Industrial',
            'Liberalismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'brasil-colonia': {
    slug: 'brasil-colonia',
    resumo: `Formação do Brasil.`,

    explicacao: `<h2>📚 Brasil Colônia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Colonização</li>
      <li>Escravidão</li>
      <li>Economia açucareira</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Economia voltada para exportação e uso de mão de obra escravizada.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre escravidão → **colonialismo**. 5. QUESTÃO A economia colonial era: A) industrial B) voltada para o mercado interno C) agroexportadora D) socialista Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre escravidão → **colonialismo**. 5. QUESTÃO A economia colonial era: A) industrial B) voltada para o mercado interno C) agroexportadora D) socialista Gabarito: C`
    ],

    memorizacao: [
      'Colonização',
      'Escravidão',
      'Economia açucareira'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Brasil Colônia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Colonização',
            'Escravidão',
            'Economia açucareira'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'brasil-imperio-e-republica': {
    slug: 'brasil-imperio-e-republica',
    resumo: `Transformações políticas do Brasil.`,

    explicacao: `<h2>📚 Brasil Império e República</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Independência</li>
      <li>República</li>
      <li>Cidadania restrita</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Mudanças institucionais sem ruptura social profunda.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre voto → **exclusão política**. 5. QUESTÃO A República Velha caracterizou-se por: A) democracia plena B) voto censitário C) participação popular D) igualdade social Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre voto → **exclusão política**. 5. QUESTÃO A República Velha caracterizou-se por: A) democracia plena B) voto censitário C) participação popular D) igualdade social Gabarito: B`
    ],

    memorizacao: [
      'Independência',
      'República',
      'Cidadania restrita'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Brasil Império e República',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Independência',
            'República',
            'Cidadania restrita'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'mundo-contemporaneo': {
    slug: 'mundo-contemporaneo',
    resumo: `Séculos XX e XXI.`,

    explicacao: `<h2>📚 Mundo Contemporâneo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Guerras Mundiais</li>
      <li>Globalização</li>
      <li>Direitos humanos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Conflitos globais e avanços sociais marcaram o período.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre direitos humanos → **pós-guerra**. 5. QUESTÃO O pós-Segunda Guerra foi marcado por: A) isolamento B) avanço dos direitos humanos C) feudalismo D) colonialismo clássico Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre direitos humanos → **pós-guerra**. 5. QUESTÃO O pós-Segunda Guerra foi marcado por: A) isolamento B) avanço dos direitos humanos C) feudalismo D) colonialismo clássico Gabarito: B`
    ],

    memorizacao: [
      'Guerras Mundiais',
      'Globalização',
      'Direitos humanos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Mundo Contemporâneo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Guerras Mundiais',
            'Globalização',
            'Direitos humanos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'historia-e-tempo-historico-2': {
    slug: 'historia-e-tempo-historico-2',
    resumo: `A História estuda as ações humanas ao longo do tempo.`,

    explicacao: `<h2>📚 História e tempo histórico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Tempo cronológico</li>
      <li>Tempo histórico</li>
      <li>Fontes históricas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O tempo histórico é marcado por transformações sociais, políticas e econômicas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto comparando épocas → **mudança histórica**. 5. QUESTÃO Tempo histórico refere-se: A) às datas do calendário B) apenas ao passado remoto C) às transformações humanas no tempo D) ao tempo natural Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto comparando épocas → **mudança histórica**. 5. QUESTÃO Tempo histórico refere-se: A) às datas do calendário B) apenas ao passado remoto C) às transformações humanas no tempo D) ao tempo natural Gabarito: C`
    ],

    memorizacao: [
      'Tempo cronológico',
      'Tempo histórico',
      'Fontes históricas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'História e tempo histórico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Tempo cronológico',
            'Tempo histórico',
            'Fontes históricas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'pre-historia-2': {
    slug: 'pre-historia-2',
    resumo: `Período anterior à escrita.`,

    explicacao: `<h2>📚 Pré-História</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Paleolítico</li>
      <li>Neolítico</li>
      <li>Idade dos Metais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A agricultura no Neolítico permitiu o sedentarismo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem de ferramenta → **modo de vida**. 5. QUESTÃO O Neolítico se destaca por: A) nomadismo B) caça exclusiva C) agricultura D) escrita Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem de ferramenta → **modo de vida**. 5. QUESTÃO O Neolítico se destaca por: A) nomadismo B) caça exclusiva C) agricultura D) escrita Gabarito: C`
    ],

    memorizacao: [
      'Paleolítico',
      'Neolítico',
      'Idade dos Metais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Pré-História',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Paleolítico',
            'Neolítico',
            'Idade dos Metais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'antiguidade-oriental-2': {
    slug: 'antiguidade-oriental-2',
    resumo: `Primeiras civilizações.`,

    explicacao: `<h2>📚 Antiguidade Oriental</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Egito</li>
      <li>Mesopotâmia</li>
      <li>Estado teocrático</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Essas sociedades dependiam dos rios.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre Nilo → **agricultura**. 5. QUESTÃO O poder político no Egito era: A) democrático B) feudal C) teocrático D) republicano Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre Nilo → **agricultura**. 5. QUESTÃO O poder político no Egito era: A) democrático B) feudal C) teocrático D) republicano Gabarito: C`
    ],

    memorizacao: [
      'Egito',
      'Mesopotâmia',
      'Estado teocrático'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Antiguidade Oriental',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Egito',
            'Mesopotâmia',
            'Estado teocrático'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'grecia-antiga': {
    slug: 'grecia-antiga',
    resumo: `Berço da democracia.`,

    explicacao: `<h2>📚 Grécia Antiga</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cidades-Estado</li>
      <li>Democracia</li>
      <li>Cultura</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A democracia ateniense era limitada.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre cidadania → **exclusão social**. 5. QUESTÃO Participavam da democracia ateniense: A) mulheres B) escravos C) estrangeiros D) cidadãos homens livres Gabarito: D</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre cidadania → **exclusão social**. 5. QUESTÃO Participavam da democracia ateniense: A) mulheres B) escravos C) estrangeiros D) cidadãos homens livres Gabarito: D`
    ],

    memorizacao: [
      'Cidades-Estado',
      'Democracia',
      'Cultura'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Grécia Antiga',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cidades-Estado',
            'Democracia',
            'Cultura'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'roma-antiga': {
    slug: 'roma-antiga',
    resumo: `Base do Direito Ocidental.`,

    explicacao: `<h2>📚 Roma Antiga</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>República</li>
      <li>Império</li>
      <li>Escravidão</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Roma expandiu-se por conquistas militares.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre leis → **direito romano**. 5. QUESTÃO O Império Romano caracteriza-se por: A) descentralização B) poder imperial C) feudalismo D) tribalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre leis → **direito romano**. 5. QUESTÃO O Império Romano caracteriza-se por: A) descentralização B) poder imperial C) feudalismo D) tribalismo Gabarito: B`
    ],

    memorizacao: [
      'República',
      'Império',
      'Escravidão'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Roma Antiga',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'República',
            'Império',
            'Escravidão'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'idade-media-2': {
    slug: 'idade-media-2',
    resumo: `Período feudal europeu.`,

    explicacao: `<h2>📚 Idade Média</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Feudalismo</li>
      <li>Servidão</li>
      <li>Igreja</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Economia agrária e descentralizada.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre servos → **relações de trabalho**. 5. QUESTÃO O feudalismo baseava-se em: A) comércio intenso B) indústria C) terra D) moeda Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre servos → **relações de trabalho**. 5. QUESTÃO O feudalismo baseava-se em: A) comércio intenso B) indústria C) terra D) moeda Gabarito: C`
    ],

    memorizacao: [
      'Feudalismo',
      'Servidão',
      'Igreja'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Idade Média',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Feudalismo',
            'Servidão',
            'Igreja'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'renascimento': {
    slug: 'renascimento',
    resumo: `Renovação cultural europeia.`,

    explicacao: `<h2>📚 Renascimento</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Humanismo</li>
      <li>Antropocentrismo</li>
      <li>Arte</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Valorização do ser humano.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Obra artística → **humanismo**. 5. QUESTÃO O Renascimento valorizava: A) teocentrismo B) antropocentrismo C) feudalismo D) misticismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Obra artística → **humanismo**. 5. QUESTÃO O Renascimento valorizava: A) teocentrismo B) antropocentrismo C) feudalismo D) misticismo Gabarito: B`
    ],

    memorizacao: [
      'Humanismo',
      'Antropocentrismo',
      'Arte'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Renascimento',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Humanismo',
            'Antropocentrismo',
            'Arte'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'expansao-maritima': {
    slug: 'expansao-maritima',
    resumo: `Expansão europeia.`,

    explicacao: `<h2>📚 Expansão Marítima</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Mercantilismo</li>
      <li>Navegações</li>
      <li>Colonização</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Busca por novas rotas comerciais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Mapa das rotas → **expansão econômica**. 5. QUESTÃO O mercantilismo defendia: A) livre comércio B) metalismo C) socialismo D) feudalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Mapa das rotas → **expansão econômica**. 5. QUESTÃO O mercantilismo defendia: A) livre comércio B) metalismo C) socialismo D) feudalismo Gabarito: B`
    ],

    memorizacao: [
      'Mercantilismo',
      'Navegações',
      'Colonização'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Expansão Marítima',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Mercantilismo',
            'Navegações',
            'Colonização'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'brasil-colonia-2': {
    slug: 'brasil-colonia-2',
    resumo: `Colonização portuguesa.`,

    explicacao: `<h2>📚 Brasil Colônia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Açúcar</li>
      <li>Escravidão</li>
      <li>Pacto colonial</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Economia voltada à metrópole.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre engenhos → **economia colonial**. 5. QUESTÃO A base econômica inicial do Brasil foi: A) café B) mineração C) açúcar D) indústria Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre engenhos → **economia colonial**. 5. QUESTÃO A base econômica inicial do Brasil foi: A) café B) mineração C) açúcar D) indústria Gabarito: C`
    ],

    memorizacao: [
      'Açúcar',
      'Escravidão',
      'Pacto colonial'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Brasil Colônia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Açúcar',
            'Escravidão',
            'Pacto colonial'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'revolucoes-modernas': {
    slug: 'revolucoes-modernas',
    resumo: `Transformações políticas.`,

    explicacao: `<h2>📚 Revoluções Modernas</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução Francesa</li>
      <li>Iluminismo</li>
      <li>Direitos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Defesa de liberdade e igualdade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre cidadania → **direitos humanos**. 5. QUESTÃO A Revolução Francesa defendia: A) absolutismo B) igualdade jurídica C) servidão D) feudalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre cidadania → **direitos humanos**. 5. QUESTÃO A Revolução Francesa defendia: A) absolutismo B) igualdade jurídica C) servidão D) feudalismo Gabarito: B`
    ],

    memorizacao: [
      'Revolução Francesa',
      'Iluminismo',
      'Direitos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Revoluções Modernas',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução Francesa',
            'Iluminismo',
            'Direitos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};


// =====================================================
// GEOGRAFIA
// =====================================================

export const GEOGRAFIA_CONTEUDO: Record<string, ConteudoModulo> = {
'cartografia-basica-mapas-escalas-e-projecoes': {
    slug: 'cartografia-basica-mapas-escalas-e-projecoes',
    resumo: `Cartografia é a ciência que estuda, constrói e analisa mapas, plantas e outras representações do espaço. Para o ENEM, é essencial compreender tipos de mapas, escalas (numéricas e gráficas) e projeções cartográficas (formas de representar a Terra esférica em um plano).`,

    explicacao: `<h2>📚 Cartografia básica: mapas, escalas e projeções</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Elementos de um mapa (título, legenda, escala, orientação, fonte)</li>
      <li>Tipos de mapas (temáticos, físicos, políticos, anamórficos, croquis)</li>
      <li>Escala numérica e escala gráfica</li>
      <li>Escala grande x escala pequena</li>
      <li>Projeções cartográficas (cilíndricas, cônicas, azimutais)</li>
      <li>Distorções de área, forma, distância e direção</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Mapas são representações reduzidas e simplificadas do espaço geográfico. Para “caber” em uma folha, é necessário reduzir proporções: isso é a escala. Escalas grandes (1:10.000) mostram mais detalhes; escalas pequenas (1:50.000.000) mostram grandes áreas com poucos detalhes. As projeções cartográficas traduzem a forma esférica da Terra para o plano, sempre com algum tipo de deformação. A escolha da projeção pode enfatizar ou distorcer áreas e formas, tendo implicações políticas e ideológicas (como a projeção de Mercator, que “alarga” altas latitudes).</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 – Escala Um mapa apresenta escala 1:100.000. A distância entre duas cidades no mapa é de 3 cm. Pergunta: Qual a distância real? Cálculo: 1 cm → 100.000 cm = 1 km 3 cm → 3 km Resposta: **3 km**. Exemplo 2 – Projeções Uma questão mostra um mapa-múndi em que a Groenlândia parece quase do tamanho da África. Pergunta: Essa projeção provavelmente é: A) de Peters, enfatizando áreas. B) azimutal, enfatizando distâncias. C) de Mercator, com exagero em altas latitudes. D) cônica, sem distorções. Comentário: Mercator “aumenta” regiões próximas aos polos. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 – Escala Um mapa apresenta escala 1:100.000. A distância entre duas cidades no mapa é de 3 cm. Pergunta: Qual a distância real? Cálculo: 1 cm → 100.000 cm = 1 km 3 cm → 3 km Resposta: **3 km**. Exemplo 2 – Projeções Uma questão mostra um mapa-múndi em que a Groenlândia parece quase do tamanho da África. Pergunta: Essa projeção provavelmente é: A) de Peters, enfatizando áreas. B) azimutal, enfatizando distâncias. C) de Mercator, com exagero em altas latitudes. D) cônica, sem distorções. Comentário: Mercator “aumenta” regiões próximas aos polos. Resposta: **C**.`
    ],

    memorizacao: [
      'Elementos de um mapa (título, legenda, escala, orientação, fonte)',
      'Tipos de mapas (temáticos, físicos, políticos, anamórficos, croquis)',
      'Escala numérica e escala gráfica',
      'Escala grande x escala pequena',
      'Projeções cartográficas (cilíndricas, cônicas, azimutais)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Em uma escala 1:50.000, 1 cm no mapa representa:",
    "alternativas": [
      "A) 50 m",
      "B) 500 m",
      "C) 5 km",
      "D) 500 km"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 – Escala Um mapa apresenta escala 1:100.000. A distância entre duas cidades no mapa é de 3 cm. Pergunta: Qual a distância real? Cálculo: 1 cm → 100.000 cm = 1 km 3 cm → 3 km Resposta: **3 km**. Exemplo 2 – Projeções Uma questão mostra um mapa-múndi em que a Groenlândia parece quase do tamanho da África. Pergunta: Essa projeção provavelmente é: A) de Peters, enfatizando áreas. B) azimutal, enfatizando distâncias. C) de Mercator, com exagero em altas latitudes. D) cônica, sem distorções. Comentário: Mercator “aumenta” regiões próximas aos polos. Resposta: **C**. "
  },
  {
    "enunciado": "2) Um mapa político é aquele que:",
    "alternativas": [
      "A) mostra apenas relevo.",
      "B) destaca fronteiras, estados, países e cidades.",
      "C) representa isóbaras e isotermas.",
      "D) não contém legenda."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 – Escala Um mapa apresenta escala 1:100.000. A distância entre duas cidades no mapa é de 3 cm. Pergunta: Qual a distância real? Cálculo: 1 cm → 100.000 cm = 1 km 3 cm → 3 km Resposta: **3 km**. Exemplo 2 – Projeções Uma questão mostra um mapa-múndi em que a Groenlândia parece quase do tamanho da África. Pergunta: Essa projeção provavelmente é: A) de Peters, enfatizando áreas. B) azimutal, enfatizando distâncias. C) de Mercator, com exagero em altas latitudes. D) cônica, sem distorções. Comentário: Mercator “aumenta” regiões próximas aos polos. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Escala grande significa:",
    "alternativas": [
      "A) grande área, pouco detalhe.",
      "B) pequena área, mais detalhe.",
      "C) ausência de detalhes.",
      "D) ausência de redução."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Uma projeção que busca representar áreas com maior fidelidade é:",
    "alternativas": [
      "A) Mercator (conforme).",
      "B) Peters (equivalente).",
      "C) azimutal polar.",
      "D) Robinson (compromisso)."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A legenda em um mapa serve para:",
    "alternativas": [
      "A) definir o título.",
      "B) indicar a direção Norte.",
      "C) explicar símbolos e cores utilizados.",
      "D) mostrar apenas a escala."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Cartografia básica: mapas, escalas e projeções',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Elementos de um mapa (título, legenda, escala, orientação, fonte)',
            'Tipos de mapas (temáticos, físicos, políticos, anamórficos, croquis)',
            'Escala numérica e escala gráfica',
            'Escala grande x escala pequena'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Em uma escala 1:50.000, 1 cm no mapa representa:",
    "opcoes": [
      "A) 50 m",
      "B) 500 m",
      "C) 5 km",
      "D) 500 km"
    ],
    "respostaCorreta": 1,
    "explicacao": "Cartografia é a base da leitura espacial no ENEM. Dominar escalas e projeções permite interpretar criticamente mapas, identificar distorções e compreender a intencionalidade nas representações do mundo. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Um mapa político é aquele que:",
    "opcoes": [
      "A) mostra apenas relevo.",
      "B) destaca fronteiras, estados, países e cidades.",
      "C) representa isóbaras e isotermas.",
      "D) não contém legenda."
    ],
    "respostaCorreta": 1,
    "explicacao": "Cartografia é a base da leitura espacial no ENEM. Dominar escalas e projeções permite interpretar criticamente mapas, identificar distorções e compreender a intencionalidade nas representações do mundo. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Escala grande significa:",
    "opcoes": [
      "A) grande área, pouco detalhe.",
      "B) pequena área, mais detalhe.",
      "C) ausência de detalhes.",
      "D) ausência de redução."
    ],
    "respostaCorreta": 1,
    "explicacao": "Cartografia é a base da leitura espacial no ENEM. Dominar escalas e projeções permite interpretar criticamente mapas, identificar distorções e compreender a intencionalidade nas representações do mundo. ",
    "dificuldade": "média"
  }
]
    }
  },

  'coordenadas-geograficas-e-fusos-horarios': {
    slug: 'coordenadas-geograficas-e-fusos-horarios',
    resumo: `Coordenadas geográficas localizam qualquer ponto na superfície terrestre por meio de latitude e longitude. Fusos horários organizam o tempo mundial a partir do Meridiano de Greenwich, levando em conta a rotação da Terra.`,

    explicacao: `<h2>📚 Coordenadas geográficas e fusos horários</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Latitude (N/S) e longitude (E/O)</li>
      <li>Paralelos e meridianos</li>
      <li>Equador, Trópicos e Círculos Polares</li>
      <li>Fuso horário de referência: GMT/UTC</li>
      <li>Divisão teórica em 24 fusos de 15°</li>
      <li>Horário de Brasília, diferença de fusos no Brasil</li>
      <li>Linha Internacional de Data</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Latitude mede a distância em graus em relação à linha do Equador (0° a 90° N/S). Longitude mede a distância em graus em relação ao Meridiano de Greenwich (0° a 180° E/O). Juntas, permitem localizar pontos (ex.: 23° S, 46° O). A Terra gira 360° em 24 horas → 15° por hora. Assim, cada fuso horário teórico tem 15°. À medida que avançamos para leste, as horas aumentam; para oeste, diminuem. No Brasil, predominam 2 fusos oficiais (e historicamente, 3 ou 4, dependendo da legislação).</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 – Latitude Uma questão mostra dois pontos: - Ponto A: 10° N - Ponto B: 30° S Pergunta: Qual é a afirmação correta? A) A está no hemisfério Norte e B no Sul. B) Ambos estão no Norte. C) Ambos estão no Sul. D) Estão sobre o Equador. Resposta: **A**. Exemplo 2 – Fusos Se em Londres (0°) são 12h, que horas são em um lugar a 45° O, considerando fusos teóricos e desconsiderando ajustes políticos? 45° / 15° = 3 fusos → 3 horas a menos (a oeste). 12h – 3h = **9h**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 – Latitude Uma questão mostra dois pontos: - Ponto A: 10° N - Ponto B: 30° S Pergunta: Qual é a afirmação correta? A) A está no hemisfério Norte e B no Sul. B) Ambos estão no Norte. C) Ambos estão no Sul. D) Estão sobre o Equador. Resposta: **A**. Exemplo 2 – Fusos Se em Londres (0°) são 12h, que horas são em um lugar a 45° O, considerando fusos teóricos e desconsiderando ajustes políticos? 45° / 15° = 3 fusos → 3 horas a menos (a oeste). 12h – 3h = **9h**.`
    ],

    memorizacao: [
      'Latitude (N/S) e longitude (E/O)',
      'Paralelos e meridianos',
      'Equador, Trópicos e Círculos Polares',
      'Fuso horário de referência: GMT/UTC',
      'Divisão teórica em 24 fusos de 15°'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Latitude mede a distância em graus em relação:",
    "alternativas": [
      "A) ao Meridiano de Greenwich.",
      "B) à Linha Internacional de Data.",
      "C) ao Equador.",
      "D) ao Trópico de Câncer."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 – Latitude Uma questão mostra dois pontos: - Ponto A: 10° N - Ponto B: 30° S Pergunta: Qual é a afirmação correta? A) A está no hemisfério Norte e B no Sul. B) Ambos estão no Norte. C) Ambos estão no Sul. D) Estão sobre o Equador. Resposta: **A**. Exemplo 2 – Fusos Se em Londres (0°) são 12h, que horas são em um lugar a 45° O, considerando fusos teóricos e desconsiderando ajustes políticos? 45° / 15° = 3 fusos → 3 horas a menos (a oeste). 12h – 3h = **9h**. "
  },
  {
    "enunciado": "2) Longitude mede a distância em relação:",
    "alternativas": [
      "A) ao Equador.",
      "B) ao Meridiano de Greenwich.",
      "C) ao Círculo Polar Ártico.",
      "D) ao Trópico de Capricórnio."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 – Latitude Uma questão mostra dois pontos: - Ponto A: 10° N - Ponto B: 30° S Pergunta: Qual é a afirmação correta? A) A está no hemisfério Norte e B no Sul. B) Ambos estão no Norte. C) Ambos estão no Sul. D) Estão sobre o Equador. Resposta: **A**. Exemplo 2 – Fusos Se em Londres (0°) são 12h, que horas são em um lugar a 45° O, considerando fusos teóricos e desconsiderando ajustes políticos? 45° / 15° = 3 fusos → 3 horas a menos (a oeste). 12h – 3h = **9h**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Ao deslocar-se de oeste para leste em fusos teóricos, o horário:",
    "alternativas": [
      "A) diminui.",
      "B) aumenta.",
      "C) não muda.",
      "D) volta para 0h sempre."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Um local situado em 0° de latitude está:",
    "alternativas": [
      "A) no Equador.",
      "B) em Greenwich.",
      "C) no Polo Norte.",
      "D) no Polo Sul."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O Brasil, por sua extensão leste-oeste, apresenta:",
    "alternativas": [
      "A) apenas um fuso.",
      "B) mais de um fuso horário.",
      "C) 10 fusos.",
      "D) nenhum padrão temporal."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Coordenadas geográficas e fusos horários',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Latitude (N/S) e longitude (E/O)',
            'Paralelos e meridianos',
            'Equador, Trópicos e Círculos Polares',
            'Fuso horário de referência: GMT/UTC'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Latitude mede a distância em graus em relação:",
    "opcoes": [
      "A) ao Meridiano de Greenwich.",
      "B) à Linha Internacional de Data.",
      "C) ao Equador.",
      "D) ao Trópico de Câncer."
    ],
    "respostaCorreta": 1,
    "explicacao": "Coordenadas e fusos horários são ferramentas fundamentais para questões que envolvem localização, transportes, globalização e geopolítica. Entender a lógica dos graus e das horas permite resolver problemas típicos do ENEM com segurança. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Longitude mede a distância em relação:",
    "opcoes": [
      "A) ao Equador.",
      "B) ao Meridiano de Greenwich.",
      "C) ao Círculo Polar Ártico.",
      "D) ao Trópico de Capricórnio."
    ],
    "respostaCorreta": 1,
    "explicacao": "Coordenadas e fusos horários são ferramentas fundamentais para questões que envolvem localização, transportes, globalização e geopolítica. Entender a lógica dos graus e das horas permite resolver problemas típicos do ENEM com segurança. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Ao deslocar-se de oeste para leste em fusos teóricos, o horário:",
    "opcoes": [
      "A) diminui.",
      "B) aumenta.",
      "C) não muda.",
      "D) volta para 0h sempre."
    ],
    "respostaCorreta": 1,
    "explicacao": "Coordenadas e fusos horários são ferramentas fundamentais para questões que envolvem localização, transportes, globalização e geopolítica. Entender a lógica dos graus e das horas permite resolver problemas típicos do ENEM com segurança. ",
    "dificuldade": "média"
  }
]
    }
  },

  'estrutura-geologica-e-tipos-de-relevo': {
    slug: 'estrutura-geologica-e-tipos-de-relevo',
    resumo: `A estrutura geológica (escudos cristalinos, bacias sedimentares e dobramentos modernos) condiciona o relevo (planaltos, planícies, depressões) e influencia recursos naturais, solos e atividades econômicas.`,

    explicacao: `<h2>📚 Estrutura geológica e tipos de relevo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Placas tectônicas e dinâmica interna da Terra</li>
      <li>Escudos cristalinos (áreas antigas, minerais metálicos)</li>
      <li>Bacias sedimentares (petróleo, carvão, gás, aquíferos)</li>
      <li>Dobramentos modernos (cordilheiras jovens)</li>
      <li>Tipos de relevo: planaltos, planícies, depressões</li>
      <li>Relevo brasileiro (classificações de Aroldo de Azevedo e Aziz Ab’Sáber)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Escudos cristalinos são as porções mais antigas da crosta, ricas em minerais metálicos (ferro, manganês). Bacias sedimentares são áreas de acumulação de sedimentos, importantes em petróleo e gás. Dobramentos modernos são faixas de intensa compressão tectônica formando grandes cadeias de montanhas (Andes, Himalaia). O relevo brasileiro, de estrutura antiga e sem grandes dobramentos recentes, é dominado por planaltos e depressões, com planícies em áreas litorâneas e fluviais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão aborda a Serra do Mar e o Planalto Central brasileiro, classificando-os como: A) planícies recentes de origem marinha. B) dobramentos modernos com vulcanismo intenso. C) planaltos de estrutura antiga. D) bacias sedimentares jovens. Resposta: **C**. Exemplo 2 Um mapa indica Bacia do Paraná e Bacia Amazônica. Pergunta: Essas áreas são: A) escudos cristalinos. B) bacias sedimentares. C) dobramentos modernos. D) áreas de vulcanismo recente. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão aborda a Serra do Mar e o Planalto Central brasileiro, classificando-os como: A) planícies recentes de origem marinha. B) dobramentos modernos com vulcanismo intenso. C) planaltos de estrutura antiga. D) bacias sedimentares jovens. Resposta: **C**. Exemplo 2 Um mapa indica Bacia do Paraná e Bacia Amazônica. Pergunta: Essas áreas são: A) escudos cristalinos. B) bacias sedimentares. C) dobramentos modernos. D) áreas de vulcanismo recente. Resposta: **B**.`
    ],

    memorizacao: [
      'Placas tectônicas e dinâmica interna da Terra',
      'Escudos cristalinos (áreas antigas, minerais metálicos)',
      'Bacias sedimentares (petróleo, carvão, gás, aquíferos)',
      'Dobramentos modernos (cordilheiras jovens)',
      'Tipos de relevo: planaltos, planícies, depressões'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Escudos cristalinos se caracterizam por:",
    "alternativas": [
      "A) serem áreas jovens, com vulcanismo intenso.",
      "B) serem áreas antigas, ricas em minerais metálicos.",
      "C) acumularem apenas areia recente.",
      "D) apresentarem petróleo sempre."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão aborda a Serra do Mar e o Planalto Central brasileiro, classificando-os como: A) planícies recentes de origem marinha. B) dobramentos modernos com vulcanismo intenso. C) planaltos de estrutura antiga. D) bacias sedimentares jovens. Resposta: **C**. Exemplo 2 Um mapa indica Bacia do Paraná e Bacia Amazônica. Pergunta: Essas áreas são: A) escudos cristalinos. B) bacias sedimentares. C) dobramentos modernos. D) áreas de vulcanismo recente. Resposta: **B**. "
  },
  {
    "enunciado": "2) Bacias sedimentares são importantes porque:",
    "alternativas": [
      "A) concentram apenas rochas magmáticas.",
      "B) são sempre áreas de vulcões.",
      "C) podem conter petróleo, gás e aquíferos.",
      "D) não têm relevância econômica."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão aborda a Serra do Mar e o Planalto Central brasileiro, classificando-os como: A) planícies recentes de origem marinha. B) dobramentos modernos com vulcanismo intenso. C) planaltos de estrutura antiga. D) bacias sedimentares jovens. Resposta: **C**. Exemplo 2 Um mapa indica Bacia do Paraná e Bacia Amazônica. Pergunta: Essas áreas são: A) escudos cristalinos. B) bacias sedimentares. C) dobramentos modernos. D) áreas de vulcanismo recente. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Dobramentos modernos estão associados a:",
    "alternativas": [
      "A) cordilheiras jovens e instabilidade tectônica.",
      "B) planícies amazônicas.",
      "C) escudos muito antigos.",
      "D) ausência de sismos."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) O relevo brasileiro é marcado por:",
    "alternativas": [
      "A) grandes montanhas jovens como o Himalaia.",
      "B) planaltos e depressões de estrutura antiga.",
      "C) planícies glaciares recentes.",
      "D) predomínio de vulcanismo ativo."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Uma planície é:",
    "alternativas": [
      "A) área elevada, de topo plano, geralmente erodida.",
      "B) área rebaixada, com altitudes muito elevadas.",
      "C) área de acumulação, com baixas altitudes.",
      "D) sinônimo de dobramento moderno."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Estrutura geológica e tipos de relevo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Placas tectônicas e dinâmica interna da Terra',
            'Escudos cristalinos (áreas antigas, minerais metálicos)',
            'Bacias sedimentares (petróleo, carvão, gás, aquíferos)',
            'Dobramentos modernos (cordilheiras jovens)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Escudos cristalinos se caracterizam por:",
    "opcoes": [
      "A) serem áreas jovens, com vulcanismo intenso.",
      "B) serem áreas antigas, ricas em minerais metálicos.",
      "C) acumularem apenas areia recente.",
      "D) apresentarem petróleo sempre."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo da estrutura geológica e do relevo permite relacionar recursos naturais, atividades econômicas e riscos ambientais. No ENEM, isso aparece associado à mineração, ocupação do território e impactos ambientais. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Bacias sedimentares são importantes porque:",
    "opcoes": [
      "A) concentram apenas rochas magmáticas.",
      "B) são sempre áreas de vulcões.",
      "C) podem conter petróleo, gás e aquíferos.",
      "D) não têm relevância econômica."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo da estrutura geológica e do relevo permite relacionar recursos naturais, atividades econômicas e riscos ambientais. No ENEM, isso aparece associado à mineração, ocupação do território e impactos ambientais. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Dobramentos modernos estão associados a:",
    "opcoes": [
      "A) cordilheiras jovens e instabilidade tectônica.",
      "B) planícies amazônicas.",
      "C) escudos muito antigos.",
      "D) ausência de sismos."
    ],
    "respostaCorreta": 1,
    "explicacao": "O estudo da estrutura geológica e do relevo permite relacionar recursos naturais, atividades econômicas e riscos ambientais. No ENEM, isso aparece associado à mineração, ocupação do território e impactos ambientais. ",
    "dificuldade": "média"
  }
]
    }
  },

  'climas-do-brasil-e-do-mundo': {
    slug: 'climas-do-brasil-e-do-mundo',
    resumo: `Clima resulta da combinação de fatores (latitude, altitude, maritimidade, correntes marítimas, relevo, massas de ar) ao longo do tempo. O Brasil, apesar de estar em grande parte na zona tropical, apresenta diversidade climática.`,

    explicacao: `<h2>📚 Climas do Brasil e do mundo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Elementos do clima: temperatura, umidade, pressão, ventos, precipitação</li>
      <li>Fatores do clima</li>
      <li>Tipos de clima mundiais (equatorial, tropical, temperado, semiárido, mediterrâneo, frio, polar)</li>
      <li>Climas do Brasil: Equatorial, Tropical, Tropical Atlântico, Tropical de Altitude, Semiárido, Subtropical</li>
      <li>Massas de ar atuantes no Brasil (mEc, mEa, mTa, mTc, mPa)</li>
      <li>Fenômenos como El Niño e La Niña</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Temperatura e chuvas são resultado da interação entre fatores climáticos. No Brasil: - Região Norte: clima equatorial, quente e úmido. - Centro-Oeste e parte do Sudeste: tropical típico, com estação chuvosa e seca. - Nordeste interiorano: semiárido, com chuvas irregulares. - Sul: subtropical, com estações bem definidas e possibilidade de frio intenso. Fenômenos como El Niño (aquecimento anômalo do Pacífico) alteram padrões de chuva, podendo intensificar secas ou chuvas em diferentes regiões.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão mostra um gráfico com chuvas abundantes o ano todo e altas temperaturas. Pergunta: Esse padrão é típico de qual clima brasileiro? A) Semiárido. B) Subtropical. C) Equatorial. D) Tropical de altitude. Resposta: **C**. Exemplo 2 Um texto menciona o aquecimento anômalo das águas do Pacífico Equatorial e impactos como secas no Nordeste e cheias no Sul. Trata-se de: A) El Niño. B) La Niña. C) Monções. D) Furacões tropicais. Resposta: **A**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão mostra um gráfico com chuvas abundantes o ano todo e altas temperaturas. Pergunta: Esse padrão é típico de qual clima brasileiro? A) Semiárido. B) Subtropical. C) Equatorial. D) Tropical de altitude. Resposta: **C**. Exemplo 2 Um texto menciona o aquecimento anômalo das águas do Pacífico Equatorial e impactos como secas no Nordeste e cheias no Sul. Trata-se de: A) El Niño. B) La Niña. C) Monções. D) Furacões tropicais. Resposta: **A**.`
    ],

    memorizacao: [
      'Elementos do clima: temperatura, umidade, pressão, ventos, precipitação',
      'Fatores do clima',
      'Tipos de clima mundiais (equatorial, tropical, temperado, semiárido, mediterrâneo, frio, polar)',
      'Climas do Brasil: Equatorial, Tropical, Tropical Atlântico, Tropical de Altitude, Semiárido, Subtropical',
      'Massas de ar atuantes no Brasil (mEc, mEa, mTa, mTc, mPa)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O clima semiárido brasileiro é caracterizado por:",
    "alternativas": [
      "A) chuvas regulares o ano todo.",
      "B) altas temperaturas e chuvas irregulares.",
      "C) temperaturas abaixo de 0 °C sempre.",
      "D) baixa insolação."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um gráfico com chuvas abundantes o ano todo e altas temperaturas. Pergunta: Esse padrão é típico de qual clima brasileiro? A) Semiárido. B) Subtropical. C) Equatorial. D) Tropical de altitude. Resposta: **C**. Exemplo 2 Um texto menciona o aquecimento anômalo das águas do Pacífico Equatorial e impactos como secas no Nordeste e cheias no Sul. Trata-se de: A) El Niño. B) La Niña. C) Monções. D) Furacões tropicais. Resposta: **A**. "
  },
  {
    "enunciado": "2) O clima subtropical ocorre principalmente:",
    "alternativas": [
      "A) ao norte da Linha do Equador.",
      "B) no Sul do Brasil.",
      "C) apenas no Nordeste.",
      "D) apenas na Amazônia."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um gráfico com chuvas abundantes o ano todo e altas temperaturas. Pergunta: Esse padrão é típico de qual clima brasileiro? A) Semiárido. B) Subtropical. C) Equatorial. D) Tropical de altitude. Resposta: **C**. Exemplo 2 Um texto menciona o aquecimento anômalo das águas do Pacífico Equatorial e impactos como secas no Nordeste e cheias no Sul. Trata-se de: A) El Niño. B) La Niña. C) Monções. D) Furacões tropicais. Resposta: **A**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Fatores como altitude e maritimidade:",
    "alternativas": [
      "A) não influenciam o clima.",
      "B) ajudam a explicar variações de temperatura e chuva.",
      "C) são idênticos em todos os lugares.",
      "D) só valem em regiões polares."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) El Niño tende a causar no Brasil:",
    "alternativas": [
      "A) padrão sempre igual em todos os anos.",
      "B) alterações, como mais chuvas no Sul e secas no Nordeste (em muitos episódios).",
      "C) frio extremo na Amazônia.",
      "D) neve na região Norte."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) O clima equatorial é:",
    "alternativas": [
      "A) quente e úmido, com chuvas bem distribuídas.",
      "B) frio e seco.",
      "C) frio e úmido.",
      "D) quente e totalmente seco."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Climas do Brasil e do mundo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Elementos do clima: temperatura, umidade, pressão, ventos, precipitação',
            'Fatores do clima',
            'Tipos de clima mundiais (equatorial, tropical, temperado, semiárido, mediterrâneo, frio, polar)',
            'Climas do Brasil: Equatorial, Tropical, Tropical Atlântico, Tropical de Altitude, Semiárido, Subtropical'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O clima semiárido brasileiro é caracterizado por:",
    "opcoes": [
      "A) chuvas regulares o ano todo.",
      "B) altas temperaturas e chuvas irregulares.",
      "C) temperaturas abaixo de 0 °C sempre.",
      "D) baixa insolação."
    ],
    "respostaCorreta": 1,
    "explicacao": "Compreender climas e fenômenos climáticos é essencial para interpretar questões de agricultura, disponibilidade de água, riscos de desastres e mudanças climáticas, temas recorrentes no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O clima subtropical ocorre principalmente:",
    "opcoes": [
      "A) ao norte da Linha do Equador.",
      "B) no Sul do Brasil.",
      "C) apenas no Nordeste.",
      "D) apenas na Amazônia."
    ],
    "respostaCorreta": 1,
    "explicacao": "Compreender climas e fenômenos climáticos é essencial para interpretar questões de agricultura, disponibilidade de água, riscos de desastres e mudanças climáticas, temas recorrentes no ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Fatores como altitude e maritimidade:",
    "opcoes": [
      "A) não influenciam o clima.",
      "B) ajudam a explicar variações de temperatura e chuva.",
      "C) são idênticos em todos os lugares.",
      "D) só valem em regiões polares."
    ],
    "respostaCorreta": 1,
    "explicacao": "Compreender climas e fenômenos climáticos é essencial para interpretar questões de agricultura, disponibilidade de água, riscos de desastres e mudanças climáticas, temas recorrentes no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'biomas-vegetacao-e-impactos-ambientais': {
    slug: 'biomas-vegetacao-e-impactos-ambientais',
    resumo: `Biomas são grandes conjuntos de ecossistemas com clima, solos, vegetação e fauna predominantes. No Brasil, os principais biomas enfrentam pressão por desmatamento, queimadas, expansão agropecuária e outras atividades humanas.`,

    explicacao: `<h2>📚 Biomas, vegetação e impactos ambientais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Biomas brasileiros: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa, Pantanal</li>
      <li>Características de cada bioma</li>
      <li>Vegetações associadas (floresta ombrófila, savanas, campos, vegetação xerófila)</li>
      <li>Desmatamento, fragmentação, queimadas</li>
      <li>Perda de biodiversidade e serviços ecossistêmicos</li>
      <li>Unidades de conservação</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>- Amazônia: floresta densa, úmida, maior biodiversidade, forte pressão por desmatamento e garimpo. - Cerrado: savana brasileira, importantes nascentes, grande perda de área para soja, gado e monoculturas. - Mata Atlântica: altamente devastada, restam fragmentos; elevada biodiversidade. - Caatinga: vegetação adaptada à seca; risco de desertificação. - Pampa: campos do Sul, usados para pecuária; ameaça de substituição por monoculturas. - Pantanal: maior planície alagável; sensível a desmatamento nas áreas de cabeceira e queimadas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma imagem mostra árvores altas, grande diversidade, clima quente e úmido. Pergunta: Trata-se provavelmente de: A) Mata de Araucária. B) Caatinga. C) Floresta Amazônica. D) Campos Sulinos. Resposta: **C**. Exemplo 2 Uma questão cita um bioma com clima semiárido e vegetação xerófila (plantas adaptadas à falta de água). Pergunta: É o bioma: A) Cerrado. B) Pampa. C) Caatinga. D) Pantanal. Resposta: **C**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma imagem mostra árvores altas, grande diversidade, clima quente e úmido. Pergunta: Trata-se provavelmente de: A) Mata de Araucária. B) Caatinga. C) Floresta Amazônica. D) Campos Sulinos. Resposta: **C**. Exemplo 2 Uma questão cita um bioma com clima semiárido e vegetação xerófila (plantas adaptadas à falta de água). Pergunta: É o bioma: A) Cerrado. B) Pampa. C) Caatinga. D) Pantanal. Resposta: **C**.`
    ],

    memorizacao: [
      'Biomas brasileiros: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa, Pantanal',
      'Características de cada bioma',
      'Vegetações associadas (floresta ombrófila, savanas, campos, vegetação xerófila)',
      'Desmatamento, fragmentação, queimadas',
      'Perda de biodiversidade e serviços ecossistêmicos'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O Cerrado é importante porque:",
    "alternativas": [
      "A) não tem recursos hídricos.",
      "B) abriga nascentes de grandes bacias hidrográficas.",
      "C) é desabitado.",
      "D) não sofre pressão antrópica."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma imagem mostra árvores altas, grande diversidade, clima quente e úmido. Pergunta: Trata-se provavelmente de: A) Mata de Araucária. B) Caatinga. C) Floresta Amazônica. D) Campos Sulinos. Resposta: **C**. Exemplo 2 Uma questão cita um bioma com clima semiárido e vegetação xerófila (plantas adaptadas à falta de água). Pergunta: É o bioma: A) Cerrado. B) Pampa. C) Caatinga. D) Pantanal. Resposta: **C**. "
  },
  {
    "enunciado": "2) A Mata Atlântica:",
    "alternativas": [
      "A) permanece praticamente intacta.",
      "B) foi amplamente destruída e hoje é altamente fragmentada.",
      "C) ocupa apenas a região Norte.",
      "D) não é relevante ao ENEM."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma imagem mostra árvores altas, grande diversidade, clima quente e úmido. Pergunta: Trata-se provavelmente de: A) Mata de Araucária. B) Caatinga. C) Floresta Amazônica. D) Campos Sulinos. Resposta: **C**. Exemplo 2 Uma questão cita um bioma com clima semiárido e vegetação xerófila (plantas adaptadas à falta de água). Pergunta: É o bioma: A) Cerrado. B) Pampa. C) Caatinga. D) Pantanal. Resposta: **C**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Caatinga está associada a:",
    "alternativas": [
      "A) clima subtropical úmido.",
      "B) clima semiárido e solos rasos.",
      "C) clima polar.",
      "D) clima mediterrâneo."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) O Pantanal é:",
    "alternativas": [
      "A) uma planície alagável de grande biodiversidade.",
      "B) um deserto.",
      "C) uma cordilheira recente.",
      "D) um escudo cristalino."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) A perda de vegetação nativa em biomas causa:",
    "alternativas": [
      "A) aumento da biodiversidade.",
      "B) equilíbrio automático dos ecossistemas.",
      "C) perda de espécies e serviços ecossistêmicos.",
      "D) ausência de impactos."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Biomas, vegetação e impactos ambientais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Biomas brasileiros: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa, Pantanal',
            'Características de cada bioma',
            'Vegetações associadas (floresta ombrófila, savanas, campos, vegetação xerófila)',
            'Desmatamento, fragmentação, queimadas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O Cerrado é importante porque:",
    "opcoes": [
      "A) não tem recursos hídricos.",
      "B) abriga nascentes de grandes bacias hidrográficas.",
      "C) é desabitado.",
      "D) não sofre pressão antrópica."
    ],
    "respostaCorreta": 1,
    "explicacao": "Biomas e vegetação aparecem no ENEM ligados à biodiversidade, mudanças climáticas, agronegócio e conservação. Entender características e ameaças é crucial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A Mata Atlântica:",
    "opcoes": [
      "A) permanece praticamente intacta.",
      "B) foi amplamente destruída e hoje é altamente fragmentada.",
      "C) ocupa apenas a região Norte.",
      "D) não é relevante ao ENEM."
    ],
    "respostaCorreta": 1,
    "explicacao": "Biomas e vegetação aparecem no ENEM ligados à biodiversidade, mudanças climáticas, agronegócio e conservação. Entender características e ameaças é crucial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Caatinga está associada a:",
    "opcoes": [
      "A) clima subtropical úmido.",
      "B) clima semiárido e solos rasos.",
      "C) clima polar.",
      "D) clima mediterrâneo."
    ],
    "respostaCorreta": 1,
    "explicacao": "Biomas e vegetação aparecem no ENEM ligados à biodiversidade, mudanças climáticas, agronegócio e conservação. Entender características e ameaças é crucial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  }
]
    }
  },

  'hidrografia-bacias-rios-e-usos-da-agua': {
    slug: 'hidrografia-bacias-rios-e-usos-da-agua',
    resumo: `Hidrografia estuda rios, lagos, aquíferos e bacias hidrográficas. A água é um recurso estratégico, ligado a abastecimento, energia, navegação, irrigação e conflitos socioambientais.`,

    explicacao: `<h2>📚 Hidrografia: bacias, rios e usos da água</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ciclo hidrológico</li>
      <li>Bacia hidrográfica, divisores de água</li>
      <li>Rios de planalto x rios de planície</li>
      <li>Principais bacias brasileiras (Amazônica, Tocantins-Araguaia, São Francisco, Paraná, Paraguai, etc.)</li>
      <li>Aquíferos (Guarani, Alter do Chão)</li>
      <li>Usos múltiplos da água (abastecimento, irrigação, geração de energia)</li>
      <li>Crise hídrica, poluição, assoreamento</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Bacia hidrográfica é o conjunto de terras drenadas por um rio principal e seus afluentes. Rios de planalto têm maior potencial hidrelétrico; rios de planície são mais adequados à navegação. No Brasil, destaca-se a Bacia Amazônica (maior do mundo em volume), a do Paraná (hidrelétricas importantes, como Itaipu) e a do São Francisco (integração do semiárido). Questões ambientais como desmatamento, uso intensivo do solo, poluição e mudanças climáticas afetam quantidade e qualidade da água.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão destaca um rio com grandes desníveis, aproveitado para hidrelétricas. Pergunta: Esse rio é típico de: A) planície. B) planalto. C) manguezal. D) delta. Resposta: **B**. Exemplo 2 Um mapa mostra a Bacia do São Francisco e fala em “rio da integração nacional”. Comentário: O São Francisco atravessa diferentes regiões e é central em projetos de transposição para o semiárido.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão destaca um rio com grandes desníveis, aproveitado para hidrelétricas. Pergunta: Esse rio é típico de: A) planície. B) planalto. C) manguezal. D) delta. Resposta: **B**. Exemplo 2 Um mapa mostra a Bacia do São Francisco e fala em “rio da integração nacional”. Comentário: O São Francisco atravessa diferentes regiões e é central em projetos de transposição para o semiárido.`
    ],

    memorizacao: [
      'Ciclo hidrológico',
      'Bacia hidrográfica, divisores de água',
      'Rios de planalto x rios de planície',
      'Principais bacias brasileiras (Amazônica, Tocantins-Araguaia, São Francisco, Paraná, Paraguai, etc.)',
      'Aquíferos (Guarani, Alter do Chão)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Bacia hidrográfica é:",
    "alternativas": [
      "A) apenas o leito do rio.",
      "B) a soma de rios e lagos sem relação.",
      "C) a área drenada por um rio principal e seus afluentes.",
      "D) o lago de uma cidade."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca um rio com grandes desníveis, aproveitado para hidrelétricas. Pergunta: Esse rio é típico de: A) planície. B) planalto. C) manguezal. D) delta. Resposta: **B**. Exemplo 2 Um mapa mostra a Bacia do São Francisco e fala em “rio da integração nacional”. Comentário: O São Francisco atravessa diferentes regiões e é central em projetos de transposição para o semiárido. "
  },
  {
    "enunciado": "2) Rios de planície são caracterizados por:",
    "alternativas": [
      "A) grandes desníveis e corredeiras.",
      "B) pouca navegabilidade.",
      "C) leito mais regular e maior navegação.",
      "D) ausência de meandros."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão destaca um rio com grandes desníveis, aproveitado para hidrelétricas. Pergunta: Esse rio é típico de: A) planície. B) planalto. C) manguezal. D) delta. Resposta: **B**. Exemplo 2 Um mapa mostra a Bacia do São Francisco e fala em “rio da integração nacional”. Comentário: O São Francisco atravessa diferentes regiões e é central em projetos de transposição para o semiárido. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A Bacia Amazônica destaca-se por:",
    "alternativas": [
      "A) ter pouco volume de água.",
      "B) ser a maior em volume do mundo.",
      "C) ser a menor do Brasil.",
      "D) não ter relevância econômica."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) O Aquífero Guarani:",
    "alternativas": [
      "A) é uma pequena represa artificial.",
      "B) é um grande reservatório subterrâneo de água.",
      "C) é um rio da Amazônia.",
      "D) é um lago no Sul."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Assoreamento de rios está ligado a:",
    "alternativas": [
      "A) erosão e deposição de sedimentos no leito.",
      "B) erosão, mas sem acúmulo de material.",
      "C) ausência de desmatamento.",
      "D) uso exclusivo de hidrelétricas."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Hidrografia: bacias, rios e usos da água',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ciclo hidrológico',
            'Bacia hidrográfica, divisores de água',
            'Rios de planalto x rios de planície',
            'Principais bacias brasileiras (Amazônica, Tocantins-Araguaia, São Francisco, Paraná, Paraguai, etc.)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Bacia hidrográfica é:",
    "opcoes": [
      "A) apenas o leito do rio.",
      "B) a soma de rios e lagos sem relação.",
      "C) a área drenada por um rio principal e seus afluentes.",
      "D) o lago de uma cidade."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões de hidrografia no ENEM relacionam água, energia, agricultura, cidades e conflitos socioambientais. Ler mapas, gráficos e textos sobre bacias e usos da água é uma habilidade central. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Rios de planície são caracterizados por:",
    "opcoes": [
      "A) grandes desníveis e corredeiras.",
      "B) pouca navegabilidade.",
      "C) leito mais regular e maior navegação.",
      "D) ausência de meandros."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões de hidrografia no ENEM relacionam água, energia, agricultura, cidades e conflitos socioambientais. Ler mapas, gráficos e textos sobre bacias e usos da água é uma habilidade central. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A Bacia Amazônica destaca-se por:",
    "opcoes": [
      "A) ter pouco volume de água.",
      "B) ser a maior em volume do mundo.",
      "C) ser a menor do Brasil.",
      "D) não ter relevância econômica."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões de hidrografia no ENEM relacionam água, energia, agricultura, cidades e conflitos socioambientais. Ler mapas, gráficos e textos sobre bacias e usos da água é uma habilidade central. ",
    "dificuldade": "média"
  }
]
    }
  },

  'populacao-crescimento-estrutura-e-migracoes': {
    slug: 'populacao-crescimento-estrutura-e-migracoes',
    resumo: `Geografia da população aborda como as pessoas se distribuem, se deslocam e se organizam em termos de idade, sexo, trabalho e qualidade de vida. O Brasil passou por intensa transição demográfica e migrações internas.`,

    explicacao: `<h2>📚 População: crescimento, estrutura e migrações</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crescimento vegetativo (natalidade – mortalidade)</li>
      <li>Crescimento total (inclui migração)</li>
      <li>Taxas de natalidade, mortalidade, fecundidade</li>
      <li>Pirâmides etárias</li>
      <li>Transição demográfica</li>
      <li>Migrações internas (campo–cidade, Nordeste–Sudeste, fronteira agrícola)</li>
      <li>Migrações internacionais, refugiados</li>
      <li>Indicadores sociais (IDH, renda, expectativa de vida)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Sociedades com altas taxas de natalidade e mortalidade tendem a ter pirâmides etárias “largas na base”. Com a transição demográfica (queda da mortalidade e depois da natalidade), a estrutura se transforma, surgindo desafios ligados ao envelhecimento populacional. No Brasil, migrações campo–cidade e Nordeste–Sudeste marcaram o século XX; mais recentemente, há interiorização e novos fluxos. Indicadores como IDH combinam renda, educação e longevidade para avaliar qualidade de vida.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma pirâmide etária com base larga e topo estreito indica: A) população envelhecida. B) alto percentual de idosos. C) população jovem, com elevada taxa de natalidade. D) queda acelerada da natalidade. Resposta: **C**. Exemplo 2 Um texto descreve deslocamento em massa de trabalhadores rurais para grandes cidades industriais ao longo do século XX. Comentário: Trata-se de êxodo rural, típico do processo de urbanização brasileira.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma pirâmide etária com base larga e topo estreito indica: A) população envelhecida. B) alto percentual de idosos. C) população jovem, com elevada taxa de natalidade. D) queda acelerada da natalidade. Resposta: **C**. Exemplo 2 Um texto descreve deslocamento em massa de trabalhadores rurais para grandes cidades industriais ao longo do século XX. Comentário: Trata-se de êxodo rural, típico do processo de urbanização brasileira.`
    ],

    memorizacao: [
      'Crescimento vegetativo (natalidade – mortalidade)',
      'Crescimento total (inclui migração)',
      'Taxas de natalidade, mortalidade, fecundidade',
      'Pirâmides etárias',
      'Transição demográfica'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Crescimento vegetativo é:",
    "alternativas": [
      "A) saldo migratório.",
      "B) natalidade – mortalidade.",
      "C) imigração – emigração.",
      "D) crescimento total + migração."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma pirâmide etária com base larga e topo estreito indica: A) população envelhecida. B) alto percentual de idosos. C) população jovem, com elevada taxa de natalidade. D) queda acelerada da natalidade. Resposta: **C**. Exemplo 2 Um texto descreve deslocamento em massa de trabalhadores rurais para grandes cidades industriais ao longo do século XX. Comentário: Trata-se de êxodo rural, típico do processo de urbanização brasileira. "
  },
  {
    "enunciado": "2) O envelhecimento populacional aumenta:",
    "alternativas": [
      "A) a proporção de jovens.",
      "B) a demanda por políticas para idosos.",
      "C) a taxa de natalidade.",
      "D) a mortalidade infantil."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma pirâmide etária com base larga e topo estreito indica: A) população envelhecida. B) alto percentual de idosos. C) população jovem, com elevada taxa de natalidade. D) queda acelerada da natalidade. Resposta: **C**. Exemplo 2 Um texto descreve deslocamento em massa de trabalhadores rurais para grandes cidades industriais ao longo do século XX. Comentário: Trata-se de êxodo rural, típico do processo de urbanização brasileira. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Êxodo rural é:",
    "alternativas": [
      "A) saída de pessoas da cidade para o campo.",
      "B) saída de pessoas do campo para a cidade.",
      "C) migração internacional.",
      "D) migração forçada apenas."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) IDH considera:",
    "alternativas": [
      "A) apenas renda.",
      "B) renda, educação e longevidade.",
      "C) só taxa de natalidade.",
      "D) apenas número de médicos."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Uma pirâmide com base estreita e topo largo indica:",
    "alternativas": [
      "A) natalidade alta.",
      "B) população envelhecida.",
      "C) população exclusivamente jovem.",
      "D) ausência de transição demográfica."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'População: crescimento, estrutura e migrações',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crescimento vegetativo (natalidade – mortalidade)',
            'Crescimento total (inclui migração)',
            'Taxas de natalidade, mortalidade, fecundidade',
            'Pirâmides etárias'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Crescimento vegetativo é:",
    "opcoes": [
      "A) saldo migratório.",
      "B) natalidade – mortalidade.",
      "C) imigração – emigração.",
      "D) crescimento total + migração."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões demográficas no ENEM misturam leitura de gráficos, interpretação de pirâmides e análise de problemas sociais. Compreender a transição demográfica brasileira é chave para entender debates sobre previdência, saúde e planejamento urbano. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) O envelhecimento populacional aumenta:",
    "opcoes": [
      "A) a proporção de jovens.",
      "B) a demanda por políticas para idosos.",
      "C) a taxa de natalidade.",
      "D) a mortalidade infantil."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões demográficas no ENEM misturam leitura de gráficos, interpretação de pirâmides e análise de problemas sociais. Compreender a transição demográfica brasileira é chave para entender debates sobre previdência, saúde e planejamento urbano. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Êxodo rural é:",
    "opcoes": [
      "A) saída de pessoas da cidade para o campo.",
      "B) saída de pessoas do campo para a cidade.",
      "C) migração internacional.",
      "D) migração forçada apenas."
    ],
    "respostaCorreta": 1,
    "explicacao": "Questões demográficas no ENEM misturam leitura de gráficos, interpretação de pirâmides e análise de problemas sociais. Compreender a transição demográfica brasileira é chave para entender debates sobre previdência, saúde e planejamento urbano. ",
    "dificuldade": "média"
  }
]
    }
  },

  'urbanizacao-metropolizacao-e-problemas-urbanos': {
    slug: 'urbanizacao-metropolizacao-e-problemas-urbanos',
    resumo: `Urbanização é o aumento da população que vive em áreas urbanas. No Brasil, esse processo foi acelerado, gerando metrópoles, regiões metropolitanas e também problemas como favelização, mobilidade precária e segregação socioespacial.`,

    explicacao: `<h2>📚 Urbanização, metropolização e problemas urbanos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Urbanização mundial e brasileira</li>
      <li>Metrópoles, megacidades, conurbação</li>
      <li>Regiões metropolitanas e redes urbanas</li>
      <li>Segregação socioespacial</li>
      <li>Favelas, cortiços, periferias</li>
      <li>Mobilidade urbana, transporte público, trânsito</li>
      <li>Violência e vulnerabilidade social</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Brasil passou de país predominantemente rural a urbano em poucas décadas (especialmente após 1950), com forte crescimento de cidades sem infraestrutura adequada. Metrópoles como São Paulo e Rio de Janeiro concentraram população e atividades econômicas, mas também desigualdades. Segregação socioespacial ocorre quando grupos de renda diferente se distribuem de forma desigual no espaço urbano. Favelas e periferias revelam ausência de políticas habitacionais e planejamento.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão mostra um mapa com duas cidades que cresceram até se unirem fisicamente. Pergunta: Isso descreve: A) descentralização rural. B) conurbação. C) êxodo rural. D) gentrificação. Resposta: **B**. Exemplo 2 Um texto aborda expulsão de moradores pobres de áreas centrais valorizadas e substituição por grupos de maior renda. Trata-se de: A) favelização. B) gentrificação. C) conurbação rural. D) metropolização agrícola. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão mostra um mapa com duas cidades que cresceram até se unirem fisicamente. Pergunta: Isso descreve: A) descentralização rural. B) conurbação. C) êxodo rural. D) gentrificação. Resposta: **B**. Exemplo 2 Um texto aborda expulsão de moradores pobres de áreas centrais valorizadas e substituição por grupos de maior renda. Trata-se de: A) favelização. B) gentrificação. C) conurbação rural. D) metropolização agrícola. Resposta: **B**.`
    ],

    memorizacao: [
      'Urbanização mundial e brasileira',
      'Metrópoles, megacidades, conurbação',
      'Regiões metropolitanas e redes urbanas',
      'Segregação socioespacial',
      'Favelas, cortiços, periferias'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Urbanização brasileira foi:",
    "alternativas": [
      "A) lenta e planejada.",
      "B) rápida e, muitas vezes, desordenada.",
      "C) apenas no século XIX.",
      "D) inexistente."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um mapa com duas cidades que cresceram até se unirem fisicamente. Pergunta: Isso descreve: A) descentralização rural. B) conurbação. C) êxodo rural. D) gentrificação. Resposta: **B**. Exemplo 2 Um texto aborda expulsão de moradores pobres de áreas centrais valorizadas e substituição por grupos de maior renda. Trata-se de: A) favelização. B) gentrificação. C) conurbação rural. D) metropolização agrícola. Resposta: **B**. "
  },
  {
    "enunciado": "2) Segregação socioespacial é:",
    "alternativas": [
      "A) distribuição homogênea de renda.",
      "B) separação de grupos sociais no espaço urbano.",
      "C) apenas deslocamento de turistas.",
      "D) fenômeno rural."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra um mapa com duas cidades que cresceram até se unirem fisicamente. Pergunta: Isso descreve: A) descentralização rural. B) conurbação. C) êxodo rural. D) gentrificação. Resposta: **B**. Exemplo 2 Um texto aborda expulsão de moradores pobres de áreas centrais valorizadas e substituição por grupos de maior renda. Trata-se de: A) favelização. B) gentrificação. C) conurbação rural. D) metropolização agrícola. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Favelização está ligada a:",
    "alternativas": [
      "A) excesso de políticas habitacionais.",
      "B) falta de moradia formal e exclusão.",
      "C) queda do preço da terra.",
      "D) pouca urbanização."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) Conurbação é:",
    "alternativas": [
      "A) junção física de cidades antes separadas.",
      "B) deslocamento campo–cidade.",
      "C) migração internacional.",
      "D) apenas expansão vertical."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Um problema urbano recorrente é:",
    "alternativas": [
      "A) falta de demanda por transporte.",
      "B) mobilidade precária e congestionamentos.",
      "C) ausência de trânsito.",
      "D) excesso de áreas verdes."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Urbanização, metropolização e problemas urbanos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Urbanização mundial e brasileira',
            'Metrópoles, megacidades, conurbação',
            'Regiões metropolitanas e redes urbanas',
            'Segregação socioespacial'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Urbanização brasileira foi:",
    "opcoes": [
      "A) lenta e planejada.",
      "B) rápida e, muitas vezes, desordenada.",
      "C) apenas no século XIX.",
      "D) inexistente."
    ],
    "respostaCorreta": 1,
    "explicacao": "Urbanização e problemas urbanos aparecem no ENEM em textos, mapas e gráficos, conectando geografia com cidadania, políticas públicas e qualidade de vida. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Segregação socioespacial é:",
    "opcoes": [
      "A) distribuição homogênea de renda.",
      "B) separação de grupos sociais no espaço urbano.",
      "C) apenas deslocamento de turistas.",
      "D) fenômeno rural."
    ],
    "respostaCorreta": 1,
    "explicacao": "Urbanização e problemas urbanos aparecem no ENEM em textos, mapas e gráficos, conectando geografia com cidadania, políticas públicas e qualidade de vida. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Favelização está ligada a:",
    "opcoes": [
      "A) excesso de políticas habitacionais.",
      "B) falta de moradia formal e exclusão.",
      "C) queda do preço da terra.",
      "D) pouca urbanização."
    ],
    "respostaCorreta": 1,
    "explicacao": "Urbanização e problemas urbanos aparecem no ENEM em textos, mapas e gráficos, conectando geografia com cidadania, políticas públicas e qualidade de vida. ",
    "dificuldade": "média"
  }
]
    }
  },

  'agropecuaria-estrutura-fundiaria-e-agronegocio': {
    slug: 'agropecuaria-estrutura-fundiaria-e-agronegocio',
    resumo: `A agropecuária é central na economia brasileira, combinando agricultura moderna de exportação com formas tradicionais e familiares de produção. A estrutura fundiária é marcada pela concentração de terras.`,

    explicacao: `<h2>📚 Agropecuária, estrutura fundiária e agronegócio</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Latifúndio x minifúndio x agricultura familiar</li>
      <li>Estrutura fundiária e concentração de terras</li>
      <li>Agronegócio moderno (soja, milho, carne, cana)</li>
      <li>Revolução Verde, mecanização, uso de insumos químicos</li>
      <li>Questão agrária e movimentos sociais (MST, etc.)</li>
      <li>Expansão da fronteira agrícola (Centro-Oeste, Matopiba)</li>
      <li>Impactos ambientais (desmatamento, erosão, agrotóxicos)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O agronegócio brasileiro se baseia em grandes propriedades, mecanização, uso intensivo de insumos e integração com o mercado externo. Ao mesmo tempo, a agricultura familiar é importante para abastecimento interno. A concentração fundiária é histórica, ligada à colonização e às políticas agrárias. A expansão da fronteira agrícola para áreas de Cerrado e Amazônia gera conflitos por terra, desmatamento e mudanças socioambientais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma tabela mostra poucas propriedades com grande área e muitas propriedades com pouca área. Pergunta: Isso indica: A) estrutura fundiária igualitária. B) concentração fundiária. C) coletivização da terra. D) reforma agrária total. Resposta: **B**. Exemplo 2 Uma questão associa crescimento da produção de grãos à expansão sobre Cerrado e uso de máquinas, sementes selecionadas e insumos. Comentário: Descreve o agronegócio moderno, fruto da Revolução Verde.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma tabela mostra poucas propriedades com grande área e muitas propriedades com pouca área. Pergunta: Isso indica: A) estrutura fundiária igualitária. B) concentração fundiária. C) coletivização da terra. D) reforma agrária total. Resposta: **B**. Exemplo 2 Uma questão associa crescimento da produção de grãos à expansão sobre Cerrado e uso de máquinas, sementes selecionadas e insumos. Comentário: Descreve o agronegócio moderno, fruto da Revolução Verde.`
    ],

    memorizacao: [
      'Latifúndio x minifúndio x agricultura familiar',
      'Estrutura fundiária e concentração de terras',
      'Agronegócio moderno (soja, milho, carne, cana)',
      'Revolução Verde, mecanização, uso de insumos químicos',
      'Questão agrária e movimentos sociais (MST, etc.)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Latifúndio é:",
    "alternativas": [
      "A) pequena propriedade.",
      "B) média propriedade.",
      "C) grande propriedade, muitas vezes voltada à monocultura.",
      "D) propriedade pública apenas."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma tabela mostra poucas propriedades com grande área e muitas propriedades com pouca área. Pergunta: Isso indica: A) estrutura fundiária igualitária. B) concentração fundiária. C) coletivização da terra. D) reforma agrária total. Resposta: **B**. Exemplo 2 Uma questão associa crescimento da produção de grãos à expansão sobre Cerrado e uso de máquinas, sementes selecionadas e insumos. Comentário: Descreve o agronegócio moderno, fruto da Revolução Verde. "
  },
  {
    "enunciado": "2) A agricultura familiar é importante por:",
    "alternativas": [
      "A) atender grande parte do mercado interno de alimentos.",
      "B) viver apenas de exportação.",
      "C) não empregar ninguém.",
      "D) ser irrelevante na produção."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma tabela mostra poucas propriedades com grande área e muitas propriedades com pouca área. Pergunta: Isso indica: A) estrutura fundiária igualitária. B) concentração fundiária. C) coletivização da terra. D) reforma agrária total. Resposta: **B**. Exemplo 2 Uma questão associa crescimento da produção de grãos à expansão sobre Cerrado e uso de máquinas, sementes selecionadas e insumos. Comentário: Descreve o agronegócio moderno, fruto da Revolução Verde. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) A expansão da fronteira agrícola tem causado:",
    "alternativas": [
      "A) aumento de florestas.",
      "B) desmatamento e conflitos fundiários.",
      "C) recuperação de todos os biomas.",
      "D) fim do agronegócio."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A Revolução Verde está associada a:",
    "alternativas": [
      "A) abandono de tecnologias.",
      "B) aumento de produtividade com sementes selecionadas, fertilizantes e mecanização.",
      "C) fim da mecanização.",
      "D) plantio manual apenas."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Um problema ligado ao uso intensivo de agrotóxicos:",
    "alternativas": [
      "A) melhoria automática da saúde humana.",
      "B) contaminação de solos, águas e alimentos.",
      "C) regeneração espontânea de florestas.",
      "D) ausência de impactos ambientais."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Agropecuária, estrutura fundiária e agronegócio',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Latifúndio x minifúndio x agricultura familiar',
            'Estrutura fundiária e concentração de terras',
            'Agronegócio moderno (soja, milho, carne, cana)',
            'Revolução Verde, mecanização, uso de insumos químicos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Latifúndio é:",
    "opcoes": [
      "A) pequena propriedade.",
      "B) média propriedade.",
      "C) grande propriedade, muitas vezes voltada à monocultura.",
      "D) propriedade pública apenas."
    ],
    "respostaCorreta": 1,
    "explicacao": "Agropecuária e questão agrária são temas clássicos do ENEM, conectando economia, ambiente e conflitos sociais. Entender a lógica do agronegócio e da agricultura familiar é essencial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) A agricultura familiar é importante por:",
    "opcoes": [
      "A) atender grande parte do mercado interno de alimentos.",
      "B) viver apenas de exportação.",
      "C) não empregar ninguém.",
      "D) ser irrelevante na produção."
    ],
    "respostaCorreta": 1,
    "explicacao": "Agropecuária e questão agrária são temas clássicos do ENEM, conectando economia, ambiente e conflitos sociais. Entender a lógica do agronegócio e da agricultura familiar é essencial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) A expansão da fronteira agrícola tem causado:",
    "opcoes": [
      "A) aumento de florestas.",
      "B) desmatamento e conflitos fundiários.",
      "C) recuperação de todos os biomas.",
      "D) fim do agronegócio."
    ],
    "respostaCorreta": 1,
    "explicacao": "Agropecuária e questão agrária são temas clássicos do ENEM, conectando economia, ambiente e conflitos sociais. Entender a lógica do agronegócio e da agricultura familiar é essencial para interpretar textos, mapas e gráficos. ",
    "dificuldade": "média"
  }
]
    }
  },

  'industria-servicos-e-globalizacao': {
    slug: 'industria-servicos-e-globalizacao',
    resumo: `A economia mundial contemporânea é marcada pela globalização, pela expansão do setor de serviços e pela reorganização espacial da indústria. O Brasil passou por industrialização tardia e atualmente se insere em cadeias produtivas globais.`,

    explicacao: `<h2>📚 Indústria, serviços e globalização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Setores da economia: primário, secundário, terciário, quaternário</li>
      <li>Etapas da industrialização brasileira (substituição de importações, multinacionais, desconcentração industrial)</li>
      <li>Globalização produtiva, financeira e cultural</li>
      <li>Tecnopolos e indústria de alta tecnologia</li>
      <li>Terciarização e trabalho no setor de serviços</li>
      <li>Desigualdades regionais na indústria brasileira</li>
      <li>Blocos econômicos (Mercosul, União Europeia, etc.)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A indústria organiza cadeias produtivas que ultrapassam fronteiras nacionais. Empresas transnacionais espalham etapas da produção pelo mundo em busca de custos menores e mercados consumidores. Serviços (bancos, transporte, educação, saúde, tecnologia da informação) tornam-se centrais. No Brasil, a indústria se concentrou no Sudeste, mas vem se desconcentrando para outras regiões. A globalização intensifica fluxos de mercadorias, capitais, informações e pessoas, mas também acentua desigualdades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Uma questão mostra uma empresa que projeta um produto em um país, fabrica peças em outros e monta em um terceiro, vendendo globalmente. Comentário: Exemplo clássico de globalização produtiva e de cadeias globais de valor. Exemplo 2 Um texto aborda a migração de fábricas da Região Metropolitana de São Paulo para o interior e outros estados. Pergunta: Isso ilustra: A) concentração industrial. B) desconcentração industrial. C) fim da indústria. D) migração rural. Resposta: **B**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Uma questão mostra uma empresa que projeta um produto em um país, fabrica peças em outros e monta em um terceiro, vendendo globalmente. Comentário: Exemplo clássico de globalização produtiva e de cadeias globais de valor. Exemplo 2 Um texto aborda a migração de fábricas da Região Metropolitana de São Paulo para o interior e outros estados. Pergunta: Isso ilustra: A) concentração industrial. B) desconcentração industrial. C) fim da indústria. D) migração rural. Resposta: **B**.`
    ],

    memorizacao: [
      'Setores da economia: primário, secundário, terciário, quaternário',
      'Etapas da industrialização brasileira (substituição de importações, multinacionais, desconcentração industrial)',
      'Globalização produtiva, financeira e cultural',
      'Tecnopolos e indústria de alta tecnologia',
      'Terciarização e trabalho no setor de serviços'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) O setor terciário da economia inclui:",
    "alternativas": [
      "A) agricultura.",
      "B) indústria de base.",
      "C) comércio e serviços.",
      "D) mineração."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra uma empresa que projeta um produto em um país, fabrica peças em outros e monta em um terceiro, vendendo globalmente. Comentário: Exemplo clássico de globalização produtiva e de cadeias globais de valor. Exemplo 2 Um texto aborda a migração de fábricas da Região Metropolitana de São Paulo para o interior e outros estados. Pergunta: Isso ilustra: A) concentração industrial. B) desconcentração industrial. C) fim da indústria. D) migração rural. Resposta: **B**. "
  },
  {
    "enunciado": "2) Globalização produtiva significa:",
    "alternativas": [
      "A) produção apenas no país de origem.",
      "B) fragmentação da produção em vários países.",
      "C) fim do comércio internacional.",
      "D) autossuficiência total dos países."
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Uma questão mostra uma empresa que projeta um produto em um país, fabrica peças em outros e monta em um terceiro, vendendo globalmente. Comentário: Exemplo clássico de globalização produtiva e de cadeias globais de valor. Exemplo 2 Um texto aborda a migração de fábricas da Região Metropolitana de São Paulo para o interior e outros estados. Pergunta: Isso ilustra: A) concentração industrial. B) desconcentração industrial. C) fim da indústria. D) migração rural. Resposta: **B**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Indústria de alta tecnologia costuma se localizar em:",
    "alternativas": [
      "A) áreas sem infraestrutura.",
      "B) tecnopolos e regiões com mão de obra qualificada.",
      "C) áreas totalmente isoladas.",
      "D) apenas zonas rurais."
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) No Brasil, a industrialização iniciou-se fortemente com:",
    "alternativas": [
      "A) período colonial.",
      "B) política de substituição de importações no século XX.",
      "C) período imperial escravista.",
      "D) ditadura militar sem indústria."
    ],
    "respostaCorreta": 1,
    "dificuldade": "média"
  },
  {
    "enunciado": "5) Blocos econômicos como o Mercosul:",
    "alternativas": [
      "A) proíbem comércio entre países membros.",
      "B) buscam integração econômica e redução de barreiras.",
      "C) são apenas alianças militares.",
      "D) não têm impacto no comércio."
    ],
    "respostaCorreta": -16,
    "dificuldade": "difícil"
  }
],

    mapaMental: {
      titulo: 'Indústria, serviços e globalização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Setores da economia: primário, secundário, terciário, quaternário',
            'Etapas da industrialização brasileira (substituição de importações, multinacionais, desconcentração industrial)',
            'Globalização produtiva, financeira e cultural',
            'Tecnopolos e indústria de alta tecnologia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) O setor terciário da economia inclui:",
    "opcoes": [
      "A) agricultura.",
      "B) indústria de base.",
      "C) comércio e serviços.",
      "D) mineração."
    ],
    "respostaCorreta": 1,
    "explicacao": "Indústria, serviços e globalização aparecem no ENEM em questões que cruzam economia, tecnologia, geopolítica e trabalho. Compreender como o Brasil se insere nessas dinâmicas é fundamental para interpretar textos e gráficos sobre desenvolvimento e desigualdade. FIM DO BLOCO 2 – GEOGRAFIA (10 temas) ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Globalização produtiva significa:",
    "opcoes": [
      "A) produção apenas no país de origem.",
      "B) fragmentação da produção em vários países.",
      "C) fim do comércio internacional.",
      "D) autossuficiência total dos países."
    ],
    "respostaCorreta": 1,
    "explicacao": "Indústria, serviços e globalização aparecem no ENEM em questões que cruzam economia, tecnologia, geopolítica e trabalho. Compreender como o Brasil se insere nessas dinâmicas é fundamental para interpretar textos e gráficos sobre desenvolvimento e desigualdade. FIM DO BLOCO 2 – GEOGRAFIA (10 temas) ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Indústria de alta tecnologia costuma se localizar em:",
    "opcoes": [
      "A) áreas sem infraestrutura.",
      "B) tecnopolos e regiões com mão de obra qualificada.",
      "C) áreas totalmente isoladas.",
      "D) apenas zonas rurais."
    ],
    "respostaCorreta": 1,
    "explicacao": "Indústria, serviços e globalização aparecem no ENEM em questões que cruzam economia, tecnologia, geopolítica e trabalho. Compreender como o Brasil se insere nessas dinâmicas é fundamental para interpretar textos e gráficos sobre desenvolvimento e desigualdade. FIM DO BLOCO 2 – GEOGRAFIA (10 temas) ",
    "dificuldade": "média"
  }
]
    }
  },

  'cartografia-escala-legenda-e-orientacao': {
    slug: 'cartografia-escala-legenda-e-orientacao',
    resumo: `Cartografia é a linguagem dos mapas. No ENEM, cai muito interpretação: escala, legenda, coordenadas, orientação e leitura de gráficos cartográficos.`,

    explicacao: `<h2>📚 Cartografia: escala, legenda e orientação</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Escala numérica e gráfica</li>
      <li>Proporção (redução/ampliação)</li>
      <li>Legenda e símbolos</li>
      <li>Rosa dos ventos (pontos cardeais/colaterais/subcolaterais)</li>
      <li>Coordenadas geográficas (latitude/longitude)</li>
      <li>Fusos horários (noções básicas)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Escala indica o quanto a realidade foi reduzida no mapa. - Escala 1:100.000 → 1 cm no mapa = 100.000 cm na realidade = 1 km. Quanto maior o denominador, menor o detalhe (mapa “mais distante”). Legenda traduz símbolos. Orientação usa norte como referência. Coordenadas localizam pontos usando latitude (N/S) e longitude (L/O).</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 — Escala Mapa em escala 1:50.000. Distância no mapa: 6 cm. Real: 6 × 50.000 = 300.000 cm = 3.000 m = 3 km. Resposta: **3 km**. Exemplo 2 — Interpretação Em um mapa temático, áreas em vermelho indicam maior densidade populacional. Pergunta: Vermelho representa: **maior concentração de habitantes**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 — Escala Mapa em escala 1:50.000. Distância no mapa: 6 cm. Real: 6 × 50.000 = 300.000 cm = 3.000 m = 3 km. Resposta: **3 km**. Exemplo 2 — Interpretação Em um mapa temático, áreas em vermelho indicam maior densidade populacional. Pergunta: Vermelho representa: **maior concentração de habitantes**.`
    ],

    memorizacao: [
      'Escala numérica e gráfica',
      'Proporção (redução/ampliação)',
      'Legenda e símbolos',
      'Rosa dos ventos (pontos cardeais/colaterais/subcolaterais)',
      'Coordenadas geográficas (latitude/longitude)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Em 1:200.000, 1 cm representa:",
    "alternativas": [
      "A) 200 m  B) 2 km  C) 20 km  D) 200 km"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 — Escala Mapa em escala 1:50.000. Distância no mapa: 6 cm. Real: 6 × 50.000 = 300.000 cm = 3.000 m = 3 km. Resposta: **3 km**. Exemplo 2 — Interpretação Em um mapa temático, áreas em vermelho indicam maior densidade populacional. Pergunta: Vermelho representa: **maior concentração de habitantes**. "
  },
  {
    "enunciado": "2) Quanto maior o denominador da escala, o mapa é:",
    "alternativas": [
      "A) mais detalhado  B) menos detalhado  C) igual  D) impossível ler"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 — Escala Mapa em escala 1:50.000. Distância no mapa: 6 cm. Real: 6 × 50.000 = 300.000 cm = 3.000 m = 3 km. Resposta: **3 km**. Exemplo 2 — Interpretação Em um mapa temático, áreas em vermelho indicam maior densidade populacional. Pergunta: Vermelho representa: **maior concentração de habitantes**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Latitude mede:",
    "alternativas": [
      "A) Leste/Oeste  B) Norte/Sul  C) altitude  D) relevo"
    ],
    "respostaCorreta": 1,
    "dificuldade": "fácil"
  },
  {
    "enunciado": "4) A legenda serve para:",
    "alternativas": [
      "A) medir fusos  B) interpretar símbolos e cores  C) orientar o vento  D) medir altitude"
    ],
    "respostaCorreta": -16,
    "dificuldade": "média"
  }
],

    mapaMental: {
      titulo: 'Cartografia: escala, legenda e orientação',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Escala numérica e gráfica',
            'Proporção (redução/ampliação)',
            'Legenda e símbolos',
            'Rosa dos ventos (pontos cardeais/colaterais/subcolaterais)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Em 1:200.000, 1 cm representa:",
    "opcoes": [
      "A) 200 m  B) 2 km  C) 20 km  D) 200 km"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, cartografia é leitura e cálculo: escala, legenda e coordenadas aparecem com frequência em itens contextualizados. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Quanto maior o denominador da escala, o mapa é:",
    "opcoes": [
      "A) mais detalhado  B) menos detalhado  C) igual  D) impossível ler"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, cartografia é leitura e cálculo: escala, legenda e coordenadas aparecem com frequência em itens contextualizados. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Latitude mede:",
    "opcoes": [
      "A) Leste/Oeste  B) Norte/Sul  C) altitude  D) relevo"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, cartografia é leitura e cálculo: escala, legenda e coordenadas aparecem com frequência em itens contextualizados. ",
    "dificuldade": "média"
  }
]
    }
  },

  'relevo-e-estruturas-geologicas-do-brasil': {
    slug: 'relevo-e-estruturas-geologicas-do-brasil',
    resumo: `O relevo brasileiro é antigo, muito erodido e com poucas áreas de dobramentos modernos. Isso influencia solos, rios, agricultura e ocupação.`,

    explicacao: `<h2>📚 Relevo e estruturas geológicas do Brasil</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Escudos cristalinos (rochas antigas)</li>
      <li>Bacias sedimentares (maior parte do território)</li>
      <li>Dobramentos modernos (pouco expressivos no Brasil)</li>
      <li>Planaltos, planícies e depressões (classificações)</li>
      <li>Agentes internos (tectonismo) e externos (erosão, intemperismo)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Brasil tem predominância de planaltos e depressões, com grande presença de bacias sedimentares, importantes para combustíveis fósseis e aquíferos. As áreas cristalinas concentram minérios metálicos. O relevo foi moldado principalmente por erosão ao longo do tempo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo 1 Pergunta: Onde predominam rochas sedimentares e grandes bacias? Resposta: **Em grande parte do território brasileiro (bacias sedimentares)**. Exemplo 2 Minérios metálicos (ferro, manganês) tendem a aparecer em: Resposta: **escudos cristalinos**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo 1 Pergunta: Onde predominam rochas sedimentares e grandes bacias? Resposta: **Em grande parte do território brasileiro (bacias sedimentares)**. Exemplo 2 Minérios metálicos (ferro, manganês) tendem a aparecer em: Resposta: **escudos cristalinos**.`
    ],

    memorizacao: [
      'Escudos cristalinos (rochas antigas)',
      'Bacias sedimentares (maior parte do território)',
      'Dobramentos modernos (pouco expressivos no Brasil)',
      'Planaltos, planícies e depressões (classificações)',
      'Agentes internos (tectonismo) e externos (erosão, intemperismo)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A maior parte do Brasil está sobre:",
    "alternativas": [
      "A) dobramentos modernos  B) bacias sedimentares  C) vulcões ativos  D) geleiras"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: Onde predominam rochas sedimentares e grandes bacias? Resposta: **Em grande parte do território brasileiro (bacias sedimentares)**. Exemplo 2 Minérios metálicos (ferro, manganês) tendem a aparecer em: Resposta: **escudos cristalinos**. "
  },
  {
    "enunciado": "2) Minérios metálicos são mais comuns em:",
    "alternativas": [
      "A) escudos cristalinos  B) oceanos  C) planícies alagadas  D) geleiras"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo 1 Pergunta: Onde predominam rochas sedimentares e grandes bacias? Resposta: **Em grande parte do território brasileiro (bacias sedimentares)**. Exemplo 2 Minérios metálicos (ferro, manganês) tendem a aparecer em: Resposta: **escudos cristalinos**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) O principal agente modelador do relevo brasileiro é:",
    "alternativas": [
      "A) vulcanismo  B) erosão  C) terremotos  D) glaciações"
    ],
    "respostaCorreta": -16,
    "dificuldade": "fácil"
  }
],

    mapaMental: {
      titulo: 'Relevo e estruturas geológicas do Brasil',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Escudos cristalinos (rochas antigas)',
            'Bacias sedimentares (maior parte do território)',
            'Dobramentos modernos (pouco expressivos no Brasil)',
            'Planaltos, planícies e depressões (classificações)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A maior parte do Brasil está sobre:",
    "opcoes": [
      "A) dobramentos modernos  B) bacias sedimentares  C) vulcões ativos  D) geleiras"
    ],
    "respostaCorreta": 1,
    "explicacao": "Entender relevo e geologia ajuda a explicar recursos naturais e ocupação econômica do território — abordagem típica do ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Minérios metálicos são mais comuns em:",
    "opcoes": [
      "A) escudos cristalinos  B) oceanos  C) planícies alagadas  D) geleiras"
    ],
    "respostaCorreta": 1,
    "explicacao": "Entender relevo e geologia ajuda a explicar recursos naturais e ocupação econômica do território — abordagem típica do ENEM. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) O principal agente modelador do relevo brasileiro é:",
    "opcoes": [
      "A) vulcanismo  B) erosão  C) terremotos  D) glaciações"
    ],
    "respostaCorreta": -16,
    "explicacao": "Entender relevo e geologia ajuda a explicar recursos naturais e ocupação econômica do território — abordagem típica do ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'climas-do-brasil-e-impactos-socioambientais': {
    slug: 'climas-do-brasil-e-impactos-socioambientais',
    resumo: `O Brasil tem grande diversidade climática (equatorial, tropical, semiárido, subtropical). Clima influencia vegetação, agricultura e riscos (secas, enchentes).`,

    explicacao: `<h2>📚 Climas do Brasil e impactos socioambientais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Clima equatorial (quente e úmido)</li>
      <li>Tropical (estações marcadas: verão chuvoso/inverno seco)</li>
      <li>Semiárido (chuvas irregulares, secas)</li>
      <li>Subtropical (temperaturas mais baixas no Sul)</li>
      <li>Fenômenos: El Niño/La Niña (noções)</li>
      <li>Ilhas de calor urbanas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Amazônia é equatorial: muita chuva e calor. O Centro-Oeste e parte do Sudeste: tropical, com estação seca. O Nordeste interior: semiárido, com chuvas concentradas e irregulares. O Sul: subtropical, com maior variação térmica e geadas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Exemplo: Texto descreve “chuvas escassas e irregulares” e “longos períodos de seca”. Pergunta: Clima? **Semiárido**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Exemplo: Texto descreve “chuvas escassas e irregulares” e “longos períodos de seca”. Pergunta: Clima? **Semiárido**.`
    ],

    memorizacao: [
      'Clima equatorial (quente e úmido)',
      'Tropical (estações marcadas: verão chuvoso/inverno seco)',
      'Semiárido (chuvas irregulares, secas)',
      'Subtropical (temperaturas mais baixas no Sul)',
      'Fenômenos: El Niño/La Niña (noções)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Amazônia:",
    "alternativas": [
      "A) semiárido  B) equatorial  C) subtropical  D) desértico"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo: Texto descreve “chuvas escassas e irregulares” e “longos períodos de seca”. Pergunta: Clima? **Semiárido**. "
  },
  {
    "enunciado": "2) No clima tropical típico, predomina:",
    "alternativas": [
      "A) inverno chuvoso  B) verão chuvoso e inverno seco  C) chuva o ano todo  D) neve"
    ],
    "respostaCorreta": 1,
    "resolucao": "Exemplo: Texto descreve “chuvas escassas e irregulares” e “longos períodos de seca”. Pergunta: Clima? **Semiárido**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Ilhas de calor são mais comuns em:",
    "alternativas": [
      "A) áreas rurais  B) grandes cidades  C) oceanos  D) desertos"
    ],
    "respostaCorreta": -16,
    "dificuldade": "fácil"
  }
],

    mapaMental: {
      titulo: 'Climas do Brasil e impactos socioambientais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Clima equatorial (quente e úmido)',
            'Tropical (estações marcadas: verão chuvoso/inverno seco)',
            'Semiárido (chuvas irregulares, secas)',
            'Subtropical (temperaturas mais baixas no Sul)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Amazônia:",
    "opcoes": [
      "A) semiárido  B) equatorial  C) subtropical  D) desértico"
    ],
    "respostaCorreta": 1,
    "explicacao": "O ENEM cobra clima associado a impactos humanos e políticas públicas (seca, abastecimento, riscos urbanos). ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) No clima tropical típico, predomina:",
    "opcoes": [
      "A) inverno chuvoso  B) verão chuvoso e inverno seco  C) chuva o ano todo  D) neve"
    ],
    "respostaCorreta": 1,
    "explicacao": "O ENEM cobra clima associado a impactos humanos e políticas públicas (seca, abastecimento, riscos urbanos). ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Ilhas de calor são mais comuns em:",
    "opcoes": [
      "A) áreas rurais  B) grandes cidades  C) oceanos  D) desertos"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM cobra clima associado a impactos humanos e políticas públicas (seca, abastecimento, riscos urbanos). ",
    "dificuldade": "média"
  }
]
    }
  },

  'biomas-do-brasil-e-preservacao': {
    slug: 'biomas-do-brasil-e-preservacao',
    resumo: `Biomas são grandes conjuntos de vegetação e fauna associados ao clima e ao relevo. No ENEM, cai relação: bioma ↔ clima ↔ uso econômico ↔ desmatamento.`,

    explicacao: `<h2>📚 Biomas do Brasil e preservação</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Amazônia (floresta densa, biodiversidade)</li>
      <li>Cerrado (savana, berço das águas)</li>
      <li>Caatinga (semiárido, vegetação xerófila)</li>
      <li>Mata Atlântica (alta biodiversidade, devastada)</li>
      <li>Pantanal (planície alagável)</li>
      <li>Pampa (campos sulinos)</li>
      <li>Conservação: unidades de conservação, reflorestamento, fiscalização</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Mata Atlântica é a mais devastada historicamente por urbanização e agricultura. O Cerrado sofre com expansão agropecuária e é crucial para recarga hídrica. A Amazônia enfrenta desmatamento, queimadas e mineração. O Pantanal é sensível a incêndios e alterações no regime de cheias.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “vegetação adaptada à seca, folhas pequenas, espinhos e perda de folhas no período seco”. Bioma: **Caatinga**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “vegetação adaptada à seca, folhas pequenas, espinhos e perda de folhas no período seco”. Bioma: **Caatinga**.`
    ],

    memorizacao: [
      'Amazônia (floresta densa, biodiversidade)',
      'Cerrado (savana, berço das águas)',
      'Caatinga (semiárido, vegetação xerófila)',
      'Mata Atlântica (alta biodiversidade, devastada)',
      'Pantanal (planície alagável)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) “Berço das águas” do Brasil refere-se principalmente ao:",
    "alternativas": [
      "A) Pampa  B) Cerrado  C) Pantanal  D) Caatinga"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “vegetação adaptada à seca, folhas pequenas, espinhos e perda de folhas no período seco”. Bioma: **Caatinga**. "
  },
  {
    "enunciado": "2) Bioma fortemente associado a planície sazonalmente alagada:",
    "alternativas": [
      "A) Pantanal  B) Amazônia  C) Pampa  D) Mata Atlântica"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “vegetação adaptada à seca, folhas pequenas, espinhos e perda de folhas no período seco”. Bioma: **Caatinga**. "
  }
],

    questoesEnem: [
  {
    "enunciado": "3) Bioma mais devastado pela ocupação histórica do litoral:",
    "alternativas": [
      "A) Cerrado  B) Mata Atlântica  C) Caatinga  D) Pampa"
    ],
    "respostaCorreta": -16,
    "dificuldade": "fácil"
  }
],

    mapaMental: {
      titulo: 'Biomas do Brasil e preservação',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Amazônia (floresta densa, biodiversidade)',
            'Cerrado (savana, berço das águas)',
            'Caatinga (semiárido, vegetação xerófila)',
            'Mata Atlântica (alta biodiversidade, devastada)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) “Berço das águas” do Brasil refere-se principalmente ao:",
    "opcoes": [
      "A) Pampa  B) Cerrado  C) Pantanal  D) Caatinga"
    ],
    "respostaCorreta": 1,
    "explicacao": "A chave é ligar bioma a impactos humanos (agro, mineração, urbanização) e a estratégias de preservação. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Bioma fortemente associado a planície sazonalmente alagada:",
    "opcoes": [
      "A) Pantanal  B) Amazônia  C) Pampa  D) Mata Atlântica"
    ],
    "respostaCorreta": 1,
    "explicacao": "A chave é ligar bioma a impactos humanos (agro, mineração, urbanização) e a estratégias de preservação. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "3) Bioma mais devastado pela ocupação histórica do litoral:",
    "opcoes": [
      "A) Cerrado  B) Mata Atlântica  C) Caatinga  D) Pampa"
    ],
    "respostaCorreta": -16,
    "explicacao": "A chave é ligar bioma a impactos humanos (agro, mineração, urbanização) e a estratégias de preservação. ",
    "dificuldade": "média"
  }
]
    }
  },

  'urbanizacao-brasileira-e-problemas-urbanos': {
    slug: 'urbanizacao-brasileira-e-problemas-urbanos',
    resumo: `O Brasil se urbanizou rapidamente no século XX. Crescimento acelerado gerou desigualdade socioespacial, periferização e déficit de infraestrutura.`,

    explicacao: `<h2>📚 Urbanização brasileira e problemas urbanos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Êxodo rural e industrialização</li>
      <li>Metropolização e regiões metropolitanas</li>
      <li>Periferização e favelização</li>
      <li>Mobilidade urbana (transporte)</li>
      <li>Saneamento, moradia, violência</li>
      <li>Segregação socioespacial (centro x periferia)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cidades cresceram mais rápido do que a capacidade de planejamento. Resultado: periferias distantes, tempo alto de deslocamento, serviços precários e desigualdade. O ENEM costuma abordar direito à cidade, saneamento e políticas de habitação/mobilidade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão: “crescimento urbano sem infraestrutura, ocupação irregular de encostas e várzeas.” Tema: **urbanização acelerada + risco ambiental + desigualdade urbana**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão: “crescimento urbano sem infraestrutura, ocupação irregular de encostas e várzeas.” Tema: **urbanização acelerada + risco ambiental + desigualdade urbana**.`
    ],

    memorizacao: [
      'Êxodo rural e industrialização',
      'Metropolização e regiões metropolitanas',
      'Periferização e favelização',
      'Mobilidade urbana (transporte)',
      'Saneamento, moradia, violência'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Periferização significa:",
    "alternativas": [
      "A) enriquecimento do centro  B) expansão de moradias para áreas distantes e baratas  C) fim das favelas  D) ruralização"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão: “crescimento urbano sem infraestrutura, ocupação irregular de encostas e várzeas.” Tema: **urbanização acelerada + risco ambiental + desigualdade urbana**. "
  },
  {
    "enunciado": "2) Segregação socioespacial é:",
    "alternativas": [
      "A) mistura total de classes  B) separação territorial por renda/serviços  C) ausência de desigualdade  D) só fenômeno rural"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão: “crescimento urbano sem infraestrutura, ocupação irregular de encostas e várzeas.” Tema: **urbanização acelerada + risco ambiental + desigualdade urbana**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Urbanização brasileira e problemas urbanos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Êxodo rural e industrialização',
            'Metropolização e regiões metropolitanas',
            'Periferização e favelização',
            'Mobilidade urbana (transporte)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Periferização significa:",
    "opcoes": [
      "A) enriquecimento do centro  B) expansão de moradias para áreas distantes e baratas  C) fim das favelas  D) ruralização"
    ],
    "respostaCorreta": 1,
    "explicacao": "O ENEM conecta urbanização à cidadania: mobilidade, saneamento, moradia e desigualdade. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Segregação socioespacial é:",
    "opcoes": [
      "A) mistura total de classes  B) separação territorial por renda/serviços  C) ausência de desigualdade  D) só fenômeno rural"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM conecta urbanização à cidadania: mobilidade, saneamento, moradia e desigualdade. ",
    "dificuldade": "média"
  }
]
    }
  },

  'globalizacao-redes-e-divisao-internacional-do-trabalho': {
    slug: 'globalizacao-redes-e-divisao-internacional-do-trabalho',
    resumo: `Globalização intensifica fluxos de capital, mercadorias, pessoas e informação. Isso reconfigura produção e desigualdades globais.`,

    explicacao: `<h2>📚 Globalização, redes e divisão internacional do trabalho</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Multinacionais e cadeias globais de valor</li>
      <li>Deslocamento industrial e terceirização</li>
      <li>Países centrais x periféricos (DIT)</li>
      <li>Financeirização e “tempo real”</li>
      <li>Blocos econômicos (Mercosul, UE)</li>
      <li>Impactos: precarização, consumo, cultura global</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Empresas fragmentam produção: design em um país, peças em outro, montagem em outro. Países centrais concentram tecnologia e comando; periféricos fornecem matéria-prima e mão de obra mais barata. O ENEM cobra contradições: integração x desigualdade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “produção fragmentada em vários países com logística integrada”. Tema: **cadeias globais de valor / globalização produtiva**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “produção fragmentada em vários países com logística integrada”. Tema: **cadeias globais de valor / globalização produtiva**.`
    ],

    memorizacao: [
      'Multinacionais e cadeias globais de valor',
      'Deslocamento industrial e terceirização',
      'Países centrais x periféricos (DIT)',
      'Financeirização e “tempo real”',
      'Blocos econômicos (Mercosul, UE)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Um efeito típico da globalização produtiva é:",
    "alternativas": [
      "A) produção totalmente local  B) cadeias internacionais de produção  C) fim do comércio  D) isolamento"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “produção fragmentada em vários países com logística integrada”. Tema: **cadeias globais de valor / globalização produtiva**. "
  },
  {
    "enunciado": "2) Na DIT, países centrais tendem a concentrar:",
    "alternativas": [
      "A) apenas matéria-prima  B) tecnologia e comando  C) apenas agricultura  D) ausência de indústria"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto: “produção fragmentada em vários países com logística integrada”. Tema: **cadeias globais de valor / globalização produtiva**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Globalização, redes e divisão internacional do trabalho',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Multinacionais e cadeias globais de valor',
            'Deslocamento industrial e terceirização',
            'Países centrais x periféricos (DIT)',
            'Financeirização e “tempo real”'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Um efeito típico da globalização produtiva é:",
    "opcoes": [
      "A) produção totalmente local  B) cadeias internacionais de produção  C) fim do comércio  D) isolamento"
    ],
    "respostaCorreta": 1,
    "explicacao": "Globalização é tema de geopolítica, economia e trabalho no ENEM, quase sempre com análise crítica. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Na DIT, países centrais tendem a concentrar:",
    "opcoes": [
      "A) apenas matéria-prima  B) tecnologia e comando  C) apenas agricultura  D) ausência de indústria"
    ],
    "respostaCorreta": -16,
    "explicacao": "Globalização é tema de geopolítica, economia e trabalho no ENEM, quase sempre com análise crítica. ",
    "dificuldade": "média"
  }
]
    }
  },

  'agropecuaria-no-brasil-agronegocio-x-agricultura-familiar': {
    slug: 'agropecuaria-no-brasil-agronegocio-x-agricultura-familiar',
    resumo: `O campo brasileiro combina agronegócio exportador e agricultura familiar voltada ao mercado interno. Conflitos: terra, ambiente e trabalho.`,

    explicacao: `<h2>📚 Agropecuária no Brasil: agronegócio x agricultura familiar</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Agronegócio: monocultura, mecanização, exportação</li>
      <li>Agricultura familiar: diversidade, alimentos básicos</li>
      <li>Uso de agrotóxicos e impactos ambientais</li>
      <li>Concentração fundiária e conflitos agrários</li>
      <li>Reforma agrária (noções)</li>
      <li>Fronteira agrícola (Cerrado/Amazônia)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Agronegócio gera divisas e produtividade, mas pode ampliar desmatamento, uso de agrotóxicos e concentração de renda/terra. Agricultura familiar é relevante para segurança alimentar e diversidade produtiva. O ENEM cobra sustentabilidade, desigualdade e políticas rurais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “expansão de soja no Cerrado com mecanização e exportação.” Tema: **agronegócio e fronteira agrícola**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “expansão de soja no Cerrado com mecanização e exportação.” Tema: **agronegócio e fronteira agrícola**.`
    ],

    memorizacao: [
      'Agronegócio: monocultura, mecanização, exportação',
      'Agricultura familiar: diversidade, alimentos básicos',
      'Uso de agrotóxicos e impactos ambientais',
      'Concentração fundiária e conflitos agrários',
      'Reforma agrária (noções)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A agricultura familiar se caracteriza por:",
    "alternativas": [
      "A) monocultura para exportação  B) diversidade e forte uso de mão de obra familiar  C) ausência de alimentos  D) mineração"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “expansão de soja no Cerrado com mecanização e exportação.” Tema: **agronegócio e fronteira agrícola**. "
  },
  {
    "enunciado": "2) Fronteira agrícola refere-se a:",
    "alternativas": [
      "A) redução do plantio  B) avanço da produção em novas áreas, muitas vezes com desmatamento  C) fim do agronegócio  D) urbanização"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto: “expansão de soja no Cerrado com mecanização e exportação.” Tema: **agronegócio e fronteira agrícola**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Agropecuária no Brasil: agronegócio x agricultura familiar',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Agronegócio: monocultura, mecanização, exportação',
            'Agricultura familiar: diversidade, alimentos básicos',
            'Uso de agrotóxicos e impactos ambientais',
            'Concentração fundiária e conflitos agrários'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A agricultura familiar se caracteriza por:",
    "opcoes": [
      "A) monocultura para exportação  B) diversidade e forte uso de mão de obra familiar  C) ausência de alimentos  D) mineração"
    ],
    "respostaCorreta": 1,
    "explicacao": "O ENEM costuma pedir comparação crítica: produtividade e exportação versus impactos socioambientais e segurança alimentar. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Fronteira agrícola refere-se a:",
    "opcoes": [
      "A) redução do plantio  B) avanço da produção em novas áreas, muitas vezes com desmatamento  C) fim do agronegócio  D) urbanização"
    ],
    "respostaCorreta": -16,
    "explicacao": "O ENEM costuma pedir comparação crítica: produtividade e exportação versus impactos socioambientais e segurança alimentar. ",
    "dificuldade": "média"
  }
]
    }
  },

  'energia-no-brasil-matriz-eletrica-e-impactos': {
    slug: 'energia-no-brasil-matriz-eletrica-e-impactos',
    resumo: `A matriz elétrica brasileira é majoritariamente renovável (hidrelétrica), mas enfrenta desafios ambientais, econômicos e de segurança energética.`,

    explicacao: `<h2>📚 Energia no Brasil: matriz elétrica e impactos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Hidrelétricas: vantagens e impactos (alagamento, populações)</li>
      <li>Termelétricas e emissões</li>
      <li>Eólica e solar (expansão recente)</li>
      <li>Biomassa (cana, resíduos)</li>
      <li>Petróleo e pré-sal (matriz energética, não apenas elétrica)</li>
      <li>Crises hídricas e diversificação</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Hidrelétricas têm baixo custo operacional e emissões menores, mas geram impactos socioambientais relevantes. Em crises hídricas, aumenta uso de termelétricas (mais caras e poluentes). Tendência: diversificar com eólica/solar e melhorar eficiência.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão: “acionamento de termelétricas durante seca prolongada aumenta conta de luz e emissões.” Tema: **dependência hidrelétrica + crise hídrica + termelétrica**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão: “acionamento de termelétricas durante seca prolongada aumenta conta de luz e emissões.” Tema: **dependência hidrelétrica + crise hídrica + termelétrica**.`
    ],

    memorizacao: [
      'Hidrelétricas: vantagens e impactos (alagamento, populações)',
      'Termelétricas e emissões',
      'Eólica e solar (expansão recente)',
      'Biomassa (cana, resíduos)',
      'Petróleo e pré-sal (matriz energética, não apenas elétrica)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Principal fonte da eletricidade no Brasil:",
    "alternativas": [
      "A) nuclear  B) hidrelétrica  C) carvão  D) geotérmica"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão: “acionamento de termelétricas durante seca prolongada aumenta conta de luz e emissões.” Tema: **dependência hidrelétrica + crise hídrica + termelétrica**. "
  },
  {
    "enunciado": "2) Um impacto de grandes barragens:",
    "alternativas": [
      "A) desertificação imediata  B) alagamento e deslocamento populacional  C) fim de rios  D) neve"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão: “acionamento de termelétricas durante seca prolongada aumenta conta de luz e emissões.” Tema: **dependência hidrelétrica + crise hídrica + termelétrica**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Energia no Brasil: matriz elétrica e impactos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Hidrelétricas: vantagens e impactos (alagamento, populações)',
            'Termelétricas e emissões',
            'Eólica e solar (expansão recente)',
            'Biomassa (cana, resíduos)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Principal fonte da eletricidade no Brasil:",
    "opcoes": [
      "A) nuclear  B) hidrelétrica  C) carvão  D) geotérmica"
    ],
    "respostaCorreta": 1,
    "explicacao": "Energia no ENEM aparece conectada a ambiente, economia e políticas públicas. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Um impacto de grandes barragens:",
    "opcoes": [
      "A) desertificação imediata  B) alagamento e deslocamento populacional  C) fim de rios  D) neve"
    ],
    "respostaCorreta": -16,
    "explicacao": "Energia no ENEM aparece conectada a ambiente, economia e políticas públicas. ",
    "dificuldade": "média"
  }
]
    }
  },

  'migracoes-internas-e-internacionais': {
    slug: 'migracoes-internas-e-internacionais',
    resumo: `Migração é deslocamento populacional. No ENEM, é cobrada com causas (economia, conflitos, clima) e consequências (urbanização, xenofobia, remessas).`,

    explicacao: `<h2>📚 Migrações: internas e internacionais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Êxodo rural no Brasil</li>
      <li>Migração Nordeste → Sudeste (histórica)</li>
      <li>Migração de retorno (recentes mudanças)</li>
      <li>Refugiados e crises humanitárias</li>
      <li>Xenofobia e integração social</li>
      <li>Migrações ambientais (secas, desastres)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>No Brasil, a industrialização atraiu migrantes para o Sudeste. Com mudanças econômicas e novas oportunidades, houve migração de retorno e redistribuição. Internacionalmente, guerras, pobreza e mudanças climáticas impulsionam fluxos de refugiados, gerando desafios humanitários e políticos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “pessoas fogem de guerra e buscam proteção em outro país.” Resposta: **refugiados / migração forçada**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “pessoas fogem de guerra e buscam proteção em outro país.” Resposta: **refugiados / migração forçada**.`
    ],

    memorizacao: [
      'Êxodo rural no Brasil',
      'Migração Nordeste → Sudeste (histórica)',
      'Migração de retorno (recentes mudanças)',
      'Refugiados e crises humanitárias',
      'Xenofobia e integração social'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Êxodo rural é:",
    "alternativas": [
      "A) migração cidade→campo  B) migração campo→cidade  C) turismo  D) imigração europeia"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “pessoas fogem de guerra e buscam proteção em outro país.” Resposta: **refugiados / migração forçada**. "
  },
  {
    "enunciado": "2) Refugiado é:",
    "alternativas": [
      "A) migrante voluntário por lazer  B) pessoa forçada a sair por perseguição/guerra  C) turista  D) diplomata"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto: “pessoas fogem de guerra e buscam proteção em outro país.” Resposta: **refugiados / migração forçada**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Migrações: internas e internacionais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Êxodo rural no Brasil',
            'Migração Nordeste → Sudeste (histórica)',
            'Migração de retorno (recentes mudanças)',
            'Refugiados e crises humanitárias'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Êxodo rural é:",
    "opcoes": [
      "A) migração cidade→campo  B) migração campo→cidade  C) turismo  D) imigração europeia"
    ],
    "respostaCorreta": 1,
    "explicacao": "Migrações são cobradas com leitura de contexto: por que migram e que efeitos geram no território e na sociedade. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Refugiado é:",
    "opcoes": [
      "A) migrante voluntário por lazer  B) pessoa forçada a sair por perseguição/guerra  C) turista  D) diplomata"
    ],
    "respostaCorreta": -16,
    "explicacao": "Migrações são cobradas com leitura de contexto: por que migram e que efeitos geram no território e na sociedade. ",
    "dificuldade": "média"
  }
]
    }
  },

  'geopolitica-conflitos-fronteiras-e-poder': {
    slug: 'geopolitica-conflitos-fronteiras-e-poder',
    resumo: `Geopolítica estuda relações de poder no espaço. O ENEM cobra conflitos, recursos estratégicos, fronteiras e disputas por influência.`,

    explicacao: `<h2>📚 Geopolítica: conflitos, fronteiras e poder</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Recursos estratégicos: petróleo, água, minerais</li>
      <li>Conflitos por território e identidade</li>
      <li>Organizações internacionais e blocos</li>
      <li>Potências e multipolaridade</li>
      <li>Fronteiras e nacionalismos</li>
      <li>Guerra híbrida (noções) e desinformação (noções)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Disputas por energia e território alimentam conflitos. Potências usam influência econômica, militar e tecnológica. Blocos e organismos tentam mediar tensões, mas interesses nacionais prevalecem. O ENEM costuma pedir interpretação crítica de mapas, textos e charges sobre conflitos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão: “conflito em região rica em petróleo com interferência internacional.” Tema: **recursos estratégicos + geopolítica do petróleo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão: “conflito em região rica em petróleo com interferência internacional.” Tema: **recursos estratégicos + geopolítica do petróleo**.`
    ],

    memorizacao: [
      'Recursos estratégicos: petróleo, água, minerais',
      'Conflitos por território e identidade',
      'Organizações internacionais e blocos',
      'Potências e multipolaridade',
      'Fronteiras e nacionalismos'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Um fator comum em conflitos geopolíticos é:",
    "alternativas": [
      "A) ausência de recursos  B) disputa por território/recursos  C) falta de Estado  D) apenas religião"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão: “conflito em região rica em petróleo com interferência internacional.” Tema: **recursos estratégicos + geopolítica do petróleo**. "
  },
  {
    "enunciado": "2) Multipolaridade significa:",
    "alternativas": [
      "A) uma potência manda em tudo  B) várias potências competem por influência  C) fim das potências  D) nenhum país tem poder"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão: “conflito em região rica em petróleo com interferência internacional.” Tema: **recursos estratégicos + geopolítica do petróleo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Geopolítica: conflitos, fronteiras e poder',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Recursos estratégicos: petróleo, água, minerais',
            'Conflitos por território e identidade',
            'Organizações internacionais e blocos',
            'Potências e multipolaridade'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Um fator comum em conflitos geopolíticos é:",
    "opcoes": [
      "A) ausência de recursos  B) disputa por território/recursos  C) falta de Estado  D) apenas religião"
    ],
    "respostaCorreta": 1,
    "explicacao": "Geopolítica no ENEM é interpretação de cenário: recursos, fronteiras, influência e consequências humanas. FIM DO BLOCO 4 – GEOGRAFIA (10 temas) ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Multipolaridade significa:",
    "opcoes": [
      "A) uma potência manda em tudo  B) várias potências competem por influência  C) fim das potências  D) nenhum país tem poder"
    ],
    "respostaCorreta": -16,
    "explicacao": "Geopolítica no ENEM é interpretação de cenário: recursos, fronteiras, influência e consequências humanas. FIM DO BLOCO 4 – GEOGRAFIA (10 temas) ",
    "dificuldade": "média"
  }
]
    }
  },

  'geografia-e-espaco-geografico': {
    slug: 'geografia-e-espaco-geografico',
    resumo: `A Geografia estuda a relação entre sociedade e natureza no espaço.`,

    explicacao: `<h2>📚 Geografia e espaço geográfico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Espaço geográfico</li>
      <li>Paisagem</li>
      <li>Território</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O espaço geográfico é resultado da ação humana sobre a natureza ao longo do tempo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem urbana-industrial → **espaço transformado**. 5. QUESTÃO Espaço geográfico é: A) apenas natural B) resultado da ação humana C) imutável D) somente rural Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem urbana-industrial → **espaço transformado**. 5. QUESTÃO Espaço geográfico é: A) apenas natural B) resultado da ação humana C) imutável D) somente rural Gabarito: B`
    ],

    memorizacao: [
      'Espaço geográfico',
      'Paisagem',
      'Território'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Geografia e espaço geográfico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Espaço geográfico',
            'Paisagem',
            'Território'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cartografia': {
    slug: 'cartografia',
    resumo: `Representação do espaço terrestre.`,

    explicacao: `<h2>📚 Cartografia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Escala</li>
      <li>Projeções</li>
      <li>Coordenadas geográficas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Mapas são representações reduzidas e simbólicas do espaço.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre escala → **proporção**. 5. QUESTÃO Escala indica: A) altitude B) proporção real-representada C) latitude D) clima Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre escala → **proporção**. 5. QUESTÃO Escala indica: A) altitude B) proporção real-representada C) latitude D) clima Gabarito: B`
    ],

    memorizacao: [
      'Escala',
      'Projeções',
      'Coordenadas geográficas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cartografia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Escala',
            'Projeções',
            'Coordenadas geográficas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'clima-e-tempo': {
    slug: 'clima-e-tempo',
    resumo: `Fenômenos atmosféricos.`,

    explicacao: `<h2>📚 Clima e tempo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Tempo</li>
      <li>Clima</li>
      <li>Fatores climáticos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Clima é a média do tempo atmosférico em longo prazo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Gráfico de chuvas → **clima regional**. 5. QUESTÃO Clima difere do tempo por ser: A) momentâneo B) de curta duração C) média de longo prazo D) imprevisível Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Gráfico de chuvas → **clima regional**. 5. QUESTÃO Clima difere do tempo por ser: A) momentâneo B) de curta duração C) média de longo prazo D) imprevisível Gabarito: C`
    ],

    memorizacao: [
      'Tempo',
      'Clima',
      'Fatores climáticos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Clima e tempo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Tempo',
            'Clima',
            'Fatores climáticos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'relevo-e-geologia': {
    slug: 'relevo-e-geologia',
    resumo: `Formas da superfície terrestre.`,

    explicacao: `<h2>📚 Relevo e geologia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Planaltos</li>
      <li>Planícies</li>
      <li>Agentes internos e externos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O relevo é moldado por forças internas e externas da Terra.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem de erosão → **agente externo**. 5. QUESTÃO O relevo brasileiro predomina em: A) montanhas B) planaltos C) vulcões D) desertos Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem de erosão → **agente externo**. 5. QUESTÃO O relevo brasileiro predomina em: A) montanhas B) planaltos C) vulcões D) desertos Gabarito: B`
    ],

    memorizacao: [
      'Planaltos',
      'Planícies',
      'Agentes internos e externos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Relevo e geologia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Planaltos',
            'Planícies',
            'Agentes internos e externos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'hidrografia': {
    slug: 'hidrografia',
    resumo: `Águas continentais.`,

    explicacao: `<h2>📚 Hidrografia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Bacias hidrográficas</li>
      <li>Rios</li>
      <li>Aquíferos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A água doce é essencial para atividades humanas e econômicas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Mapa de bacia → **uso da água**. 5. QUESTÃO A maior bacia hidrográfica do mundo é: A) Paraná B) Nilo C) Amazonas D) São Francisco Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Mapa de bacia → **uso da água**. 5. QUESTÃO A maior bacia hidrográfica do mundo é: A) Paraná B) Nilo C) Amazonas D) São Francisco Gabarito: C`
    ],

    memorizacao: [
      'Bacias hidrográficas',
      'Rios',
      'Aquíferos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Hidrografia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Bacias hidrográficas',
            'Rios',
            'Aquíferos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'biomas': {
    slug: 'biomas',
    resumo: `Conjuntos naturais com características próprias.`,

    explicacao: `<h2>📚 Biomas</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Amazônia</li>
      <li>Cerrado</li>
      <li>Caatinga</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Biomas refletem clima, relevo e vegetação.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre desmatamento → **impacto ambiental**. 5. QUESTÃO O Cerrado caracteriza-se por: A) floresta densa B) vegetação arbustiva C) tundra D) deserto Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre desmatamento → **impacto ambiental**. 5. QUESTÃO O Cerrado caracteriza-se por: A) floresta densa B) vegetação arbustiva C) tundra D) deserto Gabarito: B`
    ],

    memorizacao: [
      'Amazônia',
      'Cerrado',
      'Caatinga'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Biomas',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Amazônia',
            'Cerrado',
            'Caatinga'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'populacao': {
    slug: 'populacao',
    resumo: `Distribuição e dinâmica populacional.`,

    explicacao: `<h2>📚 População</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crescimento</li>
      <li>Migração</li>
      <li>Pirâmide etária</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A população se distribui de forma desigual no espaço.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Gráfico etário → **envelhecimento populacional**. 5. QUESTÃO O envelhecimento ocorre quando há: A) alta natalidade B) queda da expectativa de vida C) aumento da longevidade D) migração externa Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Gráfico etário → **envelhecimento populacional**. 5. QUESTÃO O envelhecimento ocorre quando há: A) alta natalidade B) queda da expectativa de vida C) aumento da longevidade D) migração externa Gabarito: C`
    ],

    memorizacao: [
      'Crescimento',
      'Migração',
      'Pirâmide etária'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'População',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crescimento',
            'Migração',
            'Pirâmide etária'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'urbanizacao': {
    slug: 'urbanizacao',
    resumo: `Crescimento das cidades.`,

    explicacao: `<h2>📚 Urbanização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Êxodo rural</li>
      <li>Metropolização</li>
      <li>Problemas urbanos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Urbanização acelerada gera desigualdades sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre favelas → **segregação urbana**. 5. QUESTÃO O êxodo rural provoca: A) crescimento agrícola B) expansão urbana C) queda populacional D) isolamento social Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre favelas → **segregação urbana**. 5. QUESTÃO O êxodo rural provoca: A) crescimento agrícola B) expansão urbana C) queda populacional D) isolamento social Gabarito: B`
    ],

    memorizacao: [
      'Êxodo rural',
      'Metropolização',
      'Problemas urbanos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Urbanização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Êxodo rural',
            'Metropolização',
            'Problemas urbanos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'globalizacao': {
    slug: 'globalizacao',
    resumo: `Integração mundial.`,

    explicacao: `<h2>📚 Globalização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Economia global</li>
      <li>Tecnologia</li>
      <li>Fluxos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A globalização intensifica trocas econômicas e culturais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre multinacionais → **fluxos globais**. 5. QUESTÃO A globalização aumenta: A) isolamento B) integração C) autossuficiência D) feudalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre multinacionais → **fluxos globais**. 5. QUESTÃO A globalização aumenta: A) isolamento B) integração C) autossuficiência D) feudalismo Gabarito: B`
    ],

    memorizacao: [
      'Economia global',
      'Tecnologia',
      'Fluxos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Globalização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Economia global',
            'Tecnologia',
            'Fluxos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'questoes-ambientais': {
    slug: 'questoes-ambientais',
    resumo: `Impactos ambientais globais.`,

    explicacao: `<h2>📚 Questões ambientais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sustentabilidade</li>
      <li>Poluição</li>
      <li>Mudanças climáticas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O uso excessivo dos recursos naturais gera crises ambientais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre aquecimento global → **ação humana**. 5. QUESTÃO Sustentabilidade busca: A) exploração máxima B) equilíbrio ambiental C) crescimento ilimitado D) destruição natural Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre aquecimento global → **ação humana**. 5. QUESTÃO Sustentabilidade busca: A) exploração máxima B) equilíbrio ambiental C) crescimento ilimitado D) destruição natural Gabarito: B`
    ],

    memorizacao: [
      'Sustentabilidade',
      'Poluição',
      'Mudanças climáticas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Questões ambientais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sustentabilidade',
            'Poluição',
            'Mudanças climáticas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'geografia-e-espaco-geografico-2': {
    slug: 'geografia-e-espaco-geografico-2',
    resumo: `A Geografia estuda a relação entre sociedade e natureza.`,

    explicacao: `<h2>📚 Geografia e espaço geográfico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Espaço geográfico</li>
      <li>Paisagem</li>
      <li>Lugar</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O espaço geográfico é resultado da ação humana sobre a natureza.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem urbana → **transformação do espaço**. 5. QUESTÃO Espaço geográfico é: A) apenas natureza B) apenas cidades C) resultado da ação humana D) espaço natural intocado Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem urbana → **transformação do espaço**. 5. QUESTÃO Espaço geográfico é: A) apenas natureza B) apenas cidades C) resultado da ação humana D) espaço natural intocado Gabarito: C`
    ],

    memorizacao: [
      'Espaço geográfico',
      'Paisagem',
      'Lugar'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Geografia e espaço geográfico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Espaço geográfico',
            'Paisagem',
            'Lugar'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cartografia-2': {
    slug: 'cartografia-2',
    resumo: `Representação da superfície terrestre.`,

    explicacao: `<h2>📚 Cartografia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Mapas</li>
      <li>Escalas</li>
      <li>Projeções</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>As projeções causam distorções nos mapas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Mapa-múndi → **distorção de áreas**. 5. QUESTÃO A projeção de Mercator prioriza: A) áreas reais B) distâncias C) ângulos e formas D) volumes Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Mapa-múndi → **distorção de áreas**. 5. QUESTÃO A projeção de Mercator prioriza: A) áreas reais B) distâncias C) ângulos e formas D) volumes Gabarito: C`
    ],

    memorizacao: [
      'Mapas',
      'Escalas',
      'Projeções'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cartografia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Mapas',
            'Escalas',
            'Projeções'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'clima-e-tempo-2': {
    slug: 'clima-e-tempo-2',
    resumo: `Estudo das condições atmosféricas.`,

    explicacao: `<h2>📚 Clima e tempo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Clima</li>
      <li>Tempo</li>
      <li>Massas de ar</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O clima é a média do tempo ao longo dos anos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Gráfico climático → **variação anual**. 5. QUESTÃO Clima difere de tempo porque: A) é momentâneo B) é imprevisível C) é de longa duração D) depende do relevo Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Gráfico climático → **variação anual**. 5. QUESTÃO Clima difere de tempo porque: A) é momentâneo B) é imprevisível C) é de longa duração D) depende do relevo Gabarito: C`
    ],

    memorizacao: [
      'Clima',
      'Tempo',
      'Massas de ar'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Clima e tempo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Clima',
            'Tempo',
            'Massas de ar'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'relevo': {
    slug: 'relevo',
    resumo: `Formas da superfície terrestre.`,

    explicacao: `<h2>📚 Relevo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Planaltos</li>
      <li>Planícies</li>
      <li>Depressões</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O relevo influencia o clima e a ocupação humana.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem de planalto → **erosão**. 5. QUESTÃO O planalto caracteriza-se por: A) áreas alagadas B) erosão predominante C) deposição de sedimentos D) relevo plano absoluto Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem de planalto → **erosão**. 5. QUESTÃO O planalto caracteriza-se por: A) áreas alagadas B) erosão predominante C) deposição de sedimentos D) relevo plano absoluto Gabarito: B`
    ],

    memorizacao: [
      'Planaltos',
      'Planícies',
      'Depressões'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Relevo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Planaltos',
            'Planícies',
            'Depressões'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'hidrografia-2': {
    slug: 'hidrografia-2',
    resumo: `Estudo das águas.`,

    explicacao: `<h2>📚 Hidrografia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Rios</li>
      <li>Bacias hidrográficas</li>
      <li>Aquíferos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A água é essencial para atividades humanas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Mapa hidrográfico → **uso da água**. 5. QUESTÃO Uma bacia hidrográfica é: A) um rio isolado B) conjunto de rios interligados C) um lago D) uma nascente Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Mapa hidrográfico → **uso da água**. 5. QUESTÃO Uma bacia hidrográfica é: A) um rio isolado B) conjunto de rios interligados C) um lago D) uma nascente Gabarito: B`
    ],

    memorizacao: [
      'Rios',
      'Bacias hidrográficas',
      'Aquíferos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Hidrografia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Rios',
            'Bacias hidrográficas',
            'Aquíferos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'populacao-2': {
    slug: 'populacao-2',
    resumo: `Distribuição humana.`,

    explicacao: `<h2>📚 População</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crescimento populacional</li>
      <li>Migração</li>
      <li>Demografia</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A dinâmica populacional varia entre países.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Gráfico etário → **transição demográfica**. 5. QUESTÃO Países desenvolvidos apresentam: A) alta natalidade B) alta mortalidade infantil C) envelhecimento populacional D) crescimento acelerado Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Gráfico etário → **transição demográfica**. 5. QUESTÃO Países desenvolvidos apresentam: A) alta natalidade B) alta mortalidade infantil C) envelhecimento populacional D) crescimento acelerado Gabarito: C`
    ],

    memorizacao: [
      'Crescimento populacional',
      'Migração',
      'Demografia'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'População',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crescimento populacional',
            'Migração',
            'Demografia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'urbanizacao-2': {
    slug: 'urbanizacao-2',
    resumo: `Crescimento das cidades.`,

    explicacao: `<h2>📚 Urbanização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Êxodo rural</li>
      <li>Metrópoles</li>
      <li>Problemas urbanos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Urbanização acelerada gera desigualdades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem de favela → **segregação socioespacial**. 5. QUESTÃO O êxodo rural ocorre devido: A) industrialização urbana B) aumento agrícola C) clima D) relevo Gabarito: A</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem de favela → **segregação socioespacial**. 5. QUESTÃO O êxodo rural ocorre devido: A) industrialização urbana B) aumento agrícola C) clima D) relevo Gabarito: A`
    ],

    memorizacao: [
      'Êxodo rural',
      'Metrópoles',
      'Problemas urbanos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Urbanização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Êxodo rural',
            'Metrópoles',
            'Problemas urbanos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'globalizacao-2': {
    slug: 'globalizacao-2',
    resumo: `Integração mundial.`,

    explicacao: `<h2>📚 Globalização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Economia global</li>
      <li>Tecnologia</li>
      <li>Cultura</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A globalização intensifica fluxos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre multinacionais → **capital global**. 5. QUESTÃO A globalização favorece: A) isolamento B) integração econômica C) feudalismo D) autossuficiência Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre multinacionais → **capital global**. 5. QUESTÃO A globalização favorece: A) isolamento B) integração econômica C) feudalismo D) autossuficiência Gabarito: B`
    ],

    memorizacao: [
      'Economia global',
      'Tecnologia',
      'Cultura'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Globalização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Economia global',
            'Tecnologia',
            'Cultura'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'meio-ambiente': {
    slug: 'meio-ambiente',
    resumo: `Relação sociedade-natureza.`,

    explicacao: `<h2>📚 Meio ambiente</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sustentabilidade</li>
      <li>Poluição</li>
      <li>Recursos naturais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O uso excessivo causa impactos ambientais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre desmatamento → **impacto ambiental**. 5. QUESTÃO Sustentabilidade envolve: A) exploração máxima B) equilíbrio ambiental C) consumo ilimitado D) industrialização total Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre desmatamento → **impacto ambiental**. 5. QUESTÃO Sustentabilidade envolve: A) exploração máxima B) equilíbrio ambiental C) consumo ilimitado D) industrialização total Gabarito: B`
    ],

    memorizacao: [
      'Sustentabilidade',
      'Poluição',
      'Recursos naturais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Meio ambiente',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sustentabilidade',
            'Poluição',
            'Recursos naturais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'geografia-do-brasil': {
    slug: 'geografia-do-brasil',
    resumo: `Aspectos físicos e humanos do país.`,

    explicacao: `<h2>📚 Geografia do Brasil</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Regiões</li>
      <li>Economia</li>
      <li>Desigualdades</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Brasil apresenta grande diversidade regional.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Mapa regional → **desigualdade socioeconômica**. 5. QUESTÃO O Sudeste destaca-se por: A) agricultura de subsistência B) maior industrialização C) menor população D) isolamento econômico Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Mapa regional → **desigualdade socioeconômica**. 5. QUESTÃO O Sudeste destaca-se por: A) agricultura de subsistência B) maior industrialização C) menor população D) isolamento econômico Gabarito: B`
    ],

    memorizacao: [
      'Regiões',
      'Economia',
      'Desigualdades'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Geografia do Brasil',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Regiões',
            'Economia',
            'Desigualdades'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};


// =====================================================
// SOCIOLOGIA
// =====================================================

export const SOCIOLOGIA_CONTEUDO: Record<string, ConteudoModulo> = {
'o-que-e-sociologia-e-imaginacao-sociologica': {
    slug: 'o-que-e-sociologia-e-imaginacao-sociologica',
    resumo: `Sociologia estuda a vida em sociedade: normas, instituições, desigualdades, cultura e poder. No ENEM, cai a ideia de que problemas “pessoais” podem ter causas sociais.`,

    explicacao: `<h2>📚 O que é Sociologia e “imaginação sociológica”</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Fato social (Durkheim)</li>
      <li>Ação social (Weber)</li>
      <li>Conflito e classe (Marx)</li>
      <li>Imaginação sociológica (ligar indivíduo ↔ sociedade)</li>
      <li>Instituições (família, escola, Estado, mídia)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Sociologia ajuda a “desnaturalizar” o cotidiano: por que existem padrões, desigualdades e comportamentos repetidos? Ela mostra que o indivíduo é influenciado por regras e estruturas sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto diz: “o desemprego não é apenas falha individual, mas resultado do modelo econômico”. Tema: **problema social com causas estruturais**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto diz: “o desemprego não é apenas falha individual, mas resultado do modelo econômico”. Tema: **problema social com causas estruturais**.`
    ],

    memorizacao: [
      'Fato social (Durkheim)',
      'Ação social (Weber)',
      'Conflito e classe (Marx)',
      'Imaginação sociológica (ligar indivíduo ↔ sociedade)',
      'Instituições (família, escola, Estado, mídia)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A Sociologia busca:",
    "alternativas": [
      "A) apenas opinião pessoal",
      "B) compreender fenômenos sociais com análise crítica",
      "C) prever futuro com certeza",
      "D) provar que tudo é genética"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto diz: “o desemprego não é apenas falha individual, mas resultado do modelo econômico”. Tema: **problema social com causas estruturais**. "
  },
  {
    "enunciado": "2) “Imaginação sociológica” significa:",
    "alternativas": [
      "A) imaginar histórias fictícias",
      "B) ligar experiências individuais a contextos sociais amplos",
      "C) decorar conceitos",
      "D) negar a sociedade"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto diz: “o desemprego não é apenas falha individual, mas resultado do modelo econômico”. Tema: **problema social com causas estruturais**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'O que é Sociologia e “imaginação sociológica”',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Fato social (Durkheim)',
            'Ação social (Weber)',
            'Conflito e classe (Marx)',
            'Imaginação sociológica (ligar indivíduo ↔ sociedade)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A Sociologia busca:",
    "opcoes": [
      "A) apenas opinião pessoal",
      "B) compreender fenômenos sociais com análise crítica",
      "C) prever futuro com certeza",
      "D) provar que tudo é genética"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, Sociologia é interpretação crítica de textos, charges e situações do cotidiano. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) “Imaginação sociológica” significa:",
    "opcoes": [
      "A) imaginar histórias fictícias",
      "B) ligar experiências individuais a contextos sociais amplos",
      "C) decorar conceitos",
      "D) negar a sociedade"
    ],
    "respostaCorreta": -16,
    "explicacao": "No ENEM, Sociologia é interpretação crítica de textos, charges e situações do cotidiano. ",
    "dificuldade": "média"
  }
]
    }
  },

  'durkheim-fatos-sociais-e-coesao': {
    slug: 'durkheim-fatos-sociais-e-coesao',
    resumo: `Durkheim explica como a sociedade “molda” o indivíduo por normas e valores.`,

    explicacao: `<h2>📚 Durkheim: fatos sociais e coesão</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Fato social: exterior, coercitivo e geral</li>
      <li>Consciência coletiva</li>
      <li>Solidariedade mecânica (semelhança)</li>
      <li>Solidariedade orgânica (interdependência)</li>
      <li>Anomia (crise de normas)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Fatos sociais são regras e padrões que existem “fora” do indivíduo (leis, costumes) e o pressionam. Em sociedades modernas, a coesão vem da divisão do trabalho (solidariedade orgânica). Quando regras enfraquecem, pode ocorrer anomia.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre aumento de suicídios em crise social → **anomia**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre aumento de suicídios em crise social → **anomia**.`
    ],

    memorizacao: [
      'Fato social: exterior, coercitivo e geral',
      'Consciência coletiva',
      'Solidariedade mecânica (semelhança)',
      'Solidariedade orgânica (interdependência)',
      'Anomia (crise de normas)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Fato social é:",
    "alternativas": [
      "A) escolha individual sem influência",
      "B) regra coletiva que se impõe ao indivíduo",
      "C) opinião de um grupo pequeno",
      "D) evento natural"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre aumento de suicídios em crise social → **anomia**. "
  },
  {
    "enunciado": "2) Solidariedade orgânica ocorre quando:",
    "alternativas": [
      "A) todos fazem o mesmo",
      "B) há divisão do trabalho e interdependência",
      "C) não existe Estado",
      "D) a religião domina tudo"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre aumento de suicídios em crise social → **anomia**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Durkheim: fatos sociais e coesão',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Fato social: exterior, coercitivo e geral',
            'Consciência coletiva',
            'Solidariedade mecânica (semelhança)',
            'Solidariedade orgânica (interdependência)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Fato social é:",
    "opcoes": [
      "A) escolha individual sem influência",
      "B) regra coletiva que se impõe ao indivíduo",
      "C) opinião de um grupo pequeno",
      "D) evento natural"
    ],
    "respostaCorreta": 1,
    "explicacao": "Durkheim é cobrado para explicar normas sociais e crises de integração. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Solidariedade orgânica ocorre quando:",
    "opcoes": [
      "A) todos fazem o mesmo",
      "B) há divisão do trabalho e interdependência",
      "C) não existe Estado",
      "D) a religião domina tudo"
    ],
    "respostaCorreta": -16,
    "explicacao": "Durkheim é cobrado para explicar normas sociais e crises de integração. ",
    "dificuldade": "média"
  }
]
    }
  },

  'weber-acao-social-e-dominacao': {
    slug: 'weber-acao-social-e-dominacao',
    resumo: `Weber analisa o sentido das ações humanas e os tipos de poder legítimo.`,

    explicacao: `<h2>📚 Weber: ação social e dominação</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ação social (tem sentido e considera o outro)</li>
      <li>Tipos de ação: racional com fins/valores, afetiva, tradicional</li>
      <li>Dominação legítima: tradicional, carismática, legal-racional</li>
      <li>Burocracia (racionalização)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Ação social é toda ação orientada por sentidos. A dominação legal-racional é típica do Estado moderno (leis, cargos, concursos). A burocracia organiza administração por regras e hierarquia.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre funcionamento do Estado por leis e instituições → **dominação legal-racional**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre funcionamento do Estado por leis e instituições → **dominação legal-racional**.`
    ],

    memorizacao: [
      'Ação social (tem sentido e considera o outro)',
      'Tipos de ação: racional com fins/valores, afetiva, tradicional',
      'Dominação legítima: tradicional, carismática, legal-racional',
      'Burocracia (racionalização)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Dominação carismática se baseia em:",
    "alternativas": [
      "A) tradição familiar",
      "B) crença nas qualidades de um líder",
      "C) leis e regras impessoais",
      "D) sorteio"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre funcionamento do Estado por leis e instituições → **dominação legal-racional**. "
  },
  {
    "enunciado": "2) Burocracia caracteriza-se por:",
    "alternativas": [
      "A) improviso",
      "B) regras formais e hierarquia",
      "C) ausência de documentos",
      "D) poder hereditário"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre funcionamento do Estado por leis e instituições → **dominação legal-racional**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Weber: ação social e dominação',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ação social (tem sentido e considera o outro)',
            'Tipos de ação: racional com fins/valores, afetiva, tradicional',
            'Dominação legítima: tradicional, carismática, legal-racional',
            'Burocracia (racionalização)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Dominação carismática se baseia em:",
    "opcoes": [
      "A) tradição familiar",
      "B) crença nas qualidades de um líder",
      "C) leis e regras impessoais",
      "D) sorteio"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, Weber aparece em textos sobre Estado, poder, liderança e racionalização. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Burocracia caracteriza-se por:",
    "opcoes": [
      "A) improviso",
      "B) regras formais e hierarquia",
      "C) ausência de documentos",
      "D) poder hereditário"
    ],
    "respostaCorreta": -16,
    "explicacao": "No ENEM, Weber aparece em textos sobre Estado, poder, liderança e racionalização. ",
    "dificuldade": "média"
  }
]
    }
  },

  'marx-trabalho-classe-e-desigualdade': {
    slug: 'marx-trabalho-classe-e-desigualdade',
    resumo: `Marx explica a sociedade capitalista pelo conflito entre classes e pela exploração do trabalho.`,

    explicacao: `<h2>📚 Marx: trabalho, classe e desigualdade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Modo de produção</li>
      <li>Burguesia x proletariado</li>
      <li>Mais-valia (lucro vem do trabalho)</li>
      <li>Alienação</li>
      <li>Ideologia (naturaliza desigualdade)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>No capitalismo, quem possui meios de produção (burguesia) contrata força de trabalho (proletariado). A mais-valia é a diferença entre valor produzido e salário pago. Alienação ocorre quando o trabalhador não controla seu trabalho nem se reconhece no produto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “o trabalhador produz riqueza, mas não a desfruta”. Tema: **mais-valia/alienação**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “o trabalhador produz riqueza, mas não a desfruta”. Tema: **mais-valia/alienação**.`
    ],

    memorizacao: [
      'Modo de produção',
      'Burguesia x proletariado',
      'Mais-valia (lucro vem do trabalho)',
      'Alienação',
      'Ideologia (naturaliza desigualdade)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Para Marx, desigualdade social é explicada principalmente por:",
    "alternativas": [
      "A) clima",
      "B) conflito de classes e propriedade",
      "C) azar",
      "D) genética"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “o trabalhador produz riqueza, mas não a desfruta”. Tema: **mais-valia/alienação**. "
  },
  {
    "enunciado": "2) Mais-valia é:",
    "alternativas": [
      "A) aumento do salário",
      "B) parte do valor produzido apropriada pelo capitalista",
      "C) imposto do Estado",
      "D) doação"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto: “o trabalhador produz riqueza, mas não a desfruta”. Tema: **mais-valia/alienação**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Marx: trabalho, classe e desigualdade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Modo de produção',
            'Burguesia x proletariado',
            'Mais-valia (lucro vem do trabalho)',
            'Alienação'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Para Marx, desigualdade social é explicada principalmente por:",
    "opcoes": [
      "A) clima",
      "B) conflito de classes e propriedade",
      "C) azar",
      "D) genética"
    ],
    "respostaCorreta": 1,
    "explicacao": "Marx é cobrado para interpretar desigualdade, trabalho e críticas ao capitalismo. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Mais-valia é:",
    "opcoes": [
      "A) aumento do salário",
      "B) parte do valor produzido apropriada pelo capitalista",
      "C) imposto do Estado",
      "D) doação"
    ],
    "respostaCorreta": -16,
    "explicacao": "Marx é cobrado para interpretar desigualdade, trabalho e críticas ao capitalismo. ",
    "dificuldade": "média"
  }
]
    }
  },

  'cultura-etnocentrismo-e-relativismo-cultural': {
    slug: 'cultura-etnocentrismo-e-relativismo-cultural',
    resumo: `Cultura é o conjunto de valores, crenças, hábitos e práticas de um grupo. O ENEM cobra muito preconceito cultural e diversidade.`,

    explicacao: `<h2>📚 Cultura, etnocentrismo e relativismo cultural</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cultura (aprendida, não biológica)</li>
      <li>Etnocentrismo (julgar o outro pela própria cultura)</li>
      <li>Relativismo cultural (entender o outro no contexto dele)</li>
      <li>Identidade cultural</li>
      <li>Preconceito e discriminação</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Etnocentrismo gera estereótipos (“civilizado” x “atrasado”). Relativismo cultural não significa aceitar tudo sem crítica, mas compreender práticas em seus contextos históricos e sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão com charge ridicularizando costumes indígenas → **etnocentrismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão com charge ridicularizando costumes indígenas → **etnocentrismo**.`
    ],

    memorizacao: [
      'Cultura (aprendida, não biológica)',
      'Etnocentrismo (julgar o outro pela própria cultura)',
      'Relativismo cultural (entender o outro no contexto dele)',
      'Identidade cultural',
      'Preconceito e discriminação'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Etnocentrismo é:",
    "alternativas": [
      "A) respeito às diferenças",
      "B) julgar culturas a partir de padrões próprios",
      "C) neutralidade total",
      "D) estudo científico"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão com charge ridicularizando costumes indígenas → **etnocentrismo**. "
  },
  {
    "enunciado": "2) Relativismo cultural defende:",
    "alternativas": [
      "A) superioridade de uma cultura",
      "B) compreensão das práticas no contexto social",
      "C) fim das culturas",
      "D) que tudo é igual biologicamente"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão com charge ridicularizando costumes indígenas → **etnocentrismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cultura, etnocentrismo e relativismo cultural',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cultura (aprendida, não biológica)',
            'Etnocentrismo (julgar o outro pela própria cultura)',
            'Relativismo cultural (entender o outro no contexto dele)',
            'Identidade cultural'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Etnocentrismo é:",
    "opcoes": [
      "A) respeito às diferenças",
      "B) julgar culturas a partir de padrões próprios",
      "C) neutralidade total",
      "D) estudo científico"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM: cultura é diversidade + crítica ao preconceito. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Relativismo cultural defende:",
    "opcoes": [
      "A) superioridade de uma cultura",
      "B) compreensão das práticas no contexto social",
      "C) fim das culturas",
      "D) que tudo é igual biologicamente"
    ],
    "respostaCorreta": -16,
    "explicacao": "ENEM: cultura é diversidade + crítica ao preconceito. ",
    "dificuldade": "média"
  }
]
    }
  },

  'socializacao-familia-escola-e-midia': {
    slug: 'socializacao-familia-escola-e-midia',
    resumo: `Socialização é o processo pelo qual aprendemos normas e valores para viver em sociedade.`,

    explicacao: `<h2>📚 Socialização: família, escola e mídia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Socialização primária (família)</li>
      <li>Socialização secundária (escola, trabalho)</li>
      <li>Mídia e redes sociais</li>
      <li>Controle social (formal/informal)</li>
      <li>Construção de identidade</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A família introduz valores básicos. A escola reforça normas, disciplina e conhecimentos. A mídia influencia comportamentos, consumo e visões de mundo. Controle social ocorre por leis (formal) e por costumes/pressão do grupo (informal).</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre padrões de beleza impostos por redes → **mídia e socialização**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre padrões de beleza impostos por redes → **mídia e socialização**.`
    ],

    memorizacao: [
      'Socialização primária (família)',
      'Socialização secundária (escola, trabalho)',
      'Mídia e redes sociais',
      'Controle social (formal/informal)',
      'Construção de identidade'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Socialização primária ocorre principalmente:",
    "alternativas": [
      "A) no trabalho",
      "B) na família",
      "C) no Estado",
      "D) em universidades"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto sobre padrões de beleza impostos por redes → **mídia e socialização**. "
  },
  {
    "enunciado": "2) Controle social informal ocorre por:",
    "alternativas": [
      "A) leis penais apenas",
      "B) pressão social, costumes e reprovação do grupo",
      "C) tribunais",
      "D) polícia"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto sobre padrões de beleza impostos por redes → **mídia e socialização**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Socialização: família, escola e mídia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Socialização primária (família)',
            'Socialização secundária (escola, trabalho)',
            'Mídia e redes sociais',
            'Controle social (formal/informal)'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Socialização primária ocorre principalmente:",
    "opcoes": [
      "A) no trabalho",
      "B) na família",
      "C) no Estado",
      "D) em universidades"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, socialização aparece ligada a educação, mídia, juventude e consumo. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Controle social informal ocorre por:",
    "opcoes": [
      "A) leis penais apenas",
      "B) pressão social, costumes e reprovação do grupo",
      "C) tribunais",
      "D) polícia"
    ],
    "respostaCorreta": -16,
    "explicacao": "No ENEM, socialização aparece ligada a educação, mídia, juventude e consumo. ",
    "dificuldade": "média"
  }
]
    }
  },

  'cidadania-direitos-e-democracia': {
    slug: 'cidadania-direitos-e-democracia',
    resumo: `Cidadania envolve direitos civis, políticos e sociais. O ENEM cobra participação, Constituição, desigualdades e políticas públicas.`,

    explicacao: `<h2>📚 Cidadania, direitos e democracia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Direitos civis (liberdades)</li>
      <li>Direitos políticos (voto, participação)</li>
      <li>Direitos sociais (educação, saúde, trabalho)</li>
      <li>Democracia e representação</li>
      <li>Movimentos sociais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Democracia não é só votar: inclui participação social e garantia de direitos. Movimentos sociais pressionam por inclusão e políticas públicas (moradia, igualdade racial, direitos das mulheres, etc.).</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre SUS e universalização → **direito social**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre SUS e universalização → **direito social**.`
    ],

    memorizacao: [
      'Direitos civis (liberdades)',
      'Direitos políticos (voto, participação)',
      'Direitos sociais (educação, saúde, trabalho)',
      'Democracia e representação',
      'Movimentos sociais'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Direitos sociais incluem:",
    "alternativas": [
      "A) liberdade de expressão apenas",
      "B) saúde e educação",
      "C) herança familiar",
      "D) cargos públicos"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre SUS e universalização → **direito social**. "
  },
  {
    "enunciado": "2) Participação cidadã pode ocorrer por:",
    "alternativas": [
      "A) apenas consumo",
      "B) conselhos, movimentos e eleições",
      "C) isolamento",
      "D) silêncio político"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre SUS e universalização → **direito social**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cidadania, direitos e democracia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Direitos civis (liberdades)',
            'Direitos políticos (voto, participação)',
            'Direitos sociais (educação, saúde, trabalho)',
            'Democracia e representação'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Direitos sociais incluem:",
    "opcoes": [
      "A) liberdade de expressão apenas",
      "B) saúde e educação",
      "C) herança familiar",
      "D) cargos públicos"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM: cidadania = direitos + participação + combate à desigualdade. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Participação cidadã pode ocorrer por:",
    "opcoes": [
      "A) apenas consumo",
      "B) conselhos, movimentos e eleições",
      "C) isolamento",
      "D) silêncio político"
    ],
    "respostaCorreta": -16,
    "explicacao": "ENEM: cidadania = direitos + participação + combate à desigualdade. ",
    "dificuldade": "média"
  }
]
    }
  },

  'desigualdade-social-renda-raca-e-genero': {
    slug: 'desigualdade-social-renda-raca-e-genero',
    resumo: `Desigualdade não é só renda: envolve acesso a educação, saúde, moradia e oportunidades — atravessada por raça e gênero.`,

    explicacao: `<h2>📚 Desigualdade social: renda, raça e gênero</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Estratificação social</li>
      <li>Mobilidade social</li>
      <li>Racismo estrutural (noções)</li>
      <li>Desigualdade de gênero no trabalho</li>
      <li>Interseccionalidade (noções)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A desigualdade se reproduz por herança social: quem nasce com menos acesso tem mais barreiras. Racismo e machismo podem operar de forma estrutural (instituições, mercado, violência), ampliando vulnerabilidades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Gráfico mostra maior desemprego entre mulheres negras → **desigualdade interseccional**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Gráfico mostra maior desemprego entre mulheres negras → **desigualdade interseccional**.`
    ],

    memorizacao: [
      'Estratificação social',
      'Mobilidade social',
      'Racismo estrutural (noções)',
      'Desigualdade de gênero no trabalho',
      'Interseccionalidade (noções)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Mobilidade social é:",
    "alternativas": [
      "A) mudar de cidade",
      "B) mudar de posição social ao longo da vida",
      "C) trocar de escola",
      "D) mudar de time"
    ],
    "respostaCorreta": 1,
    "resolucao": "Gráfico mostra maior desemprego entre mulheres negras → **desigualdade interseccional**. "
  },
  {
    "enunciado": "2) Racismo estrutural significa:",
    "alternativas": [
      "A) só atos individuais explícitos",
      "B) desigualdades reproduzidas por instituições e práticas sociais",
      "C) fim do racismo",
      "D) opinião pessoal sem impacto"
    ],
    "respostaCorreta": -16,
    "resolucao": "Gráfico mostra maior desemprego entre mulheres negras → **desigualdade interseccional**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Desigualdade social: renda, raça e gênero',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Estratificação social',
            'Mobilidade social',
            'Racismo estrutural (noções)',
            'Desigualdade de gênero no trabalho'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Mobilidade social é:",
    "opcoes": [
      "A) mudar de cidade",
      "B) mudar de posição social ao longo da vida",
      "C) trocar de escola",
      "D) mudar de time"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM usa textos e dados para cobrar leitura crítica de desigualdades. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Racismo estrutural significa:",
    "opcoes": [
      "A) só atos individuais explícitos",
      "B) desigualdades reproduzidas por instituições e práticas sociais",
      "C) fim do racismo",
      "D) opinião pessoal sem impacto"
    ],
    "respostaCorreta": -16,
    "explicacao": "ENEM usa textos e dados para cobrar leitura crítica de desigualdades. ",
    "dificuldade": "média"
  }
]
    }
  },

  'trabalho-no-mundo-contemporaneo': {
    slug: 'trabalho-no-mundo-contemporaneo',
    resumo: `Mudanças tecnológicas e econômicas transformaram o trabalho: terceirização, informalidade, “bicos” e plataformas digitais.`,

    explicacao: `<h2>📚 Trabalho no mundo contemporâneo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Revolução tecnológica e automação</li>
      <li>Precarização e informalidade</li>
      <li>Uberização (plataformas)</li>
      <li>Direitos trabalhistas</li>
      <li>Desemprego estrutural (noções)</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O trabalho se flexibiliza, mas isso pode reduzir proteção social. A gig economy cria renda, porém com instabilidade. O ENEM cobra relações entre tecnologia, economia e direitos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto: “trabalhador de app sem vínculo, remuneração variável”. Tema: **precarização/uberização**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto: “trabalhador de app sem vínculo, remuneração variável”. Tema: **precarização/uberização**.`
    ],

    memorizacao: [
      'Revolução tecnológica e automação',
      'Precarização e informalidade',
      'Uberização (plataformas)',
      'Direitos trabalhistas',
      'Desemprego estrutural (noções)'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Precarização do trabalho envolve:",
    "alternativas": [
      "A) mais estabilidade",
      "B) menos direitos e mais insegurança",
      "C) salário fixo garantido",
      "D) aposentadoria imediata"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto: “trabalhador de app sem vínculo, remuneração variável”. Tema: **precarização/uberização**. "
  },
  {
    "enunciado": "2) Uberização é:",
    "alternativas": [
      "A) trabalho industrial clássico",
      "B) trabalho mediado por plataformas digitais, com flexibilidade e riscos",
      "C) trabalho rural",
      "D) emprego público"
    ],
    "respostaCorreta": -16,
    "resolucao": "Texto: “trabalhador de app sem vínculo, remuneração variável”. Tema: **precarização/uberização**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Trabalho no mundo contemporâneo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Revolução tecnológica e automação',
            'Precarização e informalidade',
            'Uberização (plataformas)',
            'Direitos trabalhistas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Precarização do trabalho envolve:",
    "opcoes": [
      "A) mais estabilidade",
      "B) menos direitos e mais insegurança",
      "C) salário fixo garantido",
      "D) aposentadoria imediata"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM: trabalho contemporâneo é tema central para cidadania e economia. ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Uberização é:",
    "opcoes": [
      "A) trabalho industrial clássico",
      "B) trabalho mediado por plataformas digitais, com flexibilidade e riscos",
      "C) trabalho rural",
      "D) emprego público"
    ],
    "respostaCorreta": -16,
    "explicacao": "ENEM: trabalho contemporâneo é tema central para cidadania e economia. ",
    "dificuldade": "média"
  }
]
    }
  },

  'movimentos-sociais-e-participacao-politica': {
    slug: 'movimentos-sociais-e-participacao-politica',
    resumo: `Movimentos sociais organizam demandas coletivas por direitos e mudanças. O ENEM cobra democracia, pressão social e construção de cidadania.`,

    explicacao: `<h2>📚 Movimentos sociais e participação política</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Movimentos por direitos civis e sociais</li>
      <li>Sindicatos e movimentos estudantis</li>
      <li>Feminismo, movimento negro, indígena, ambiental</li>
      <li>Ação coletiva</li>
      <li>Redes sociais e mobilização</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Movimentos sociais ampliam direitos e pautas públicas. Podem atuar por protestos, campanhas, participação institucional (conselhos) e mobilização digital.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre mobilização por moradia e acesso à cidade → **movimento social urbano**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre mobilização por moradia e acesso à cidade → **movimento social urbano**.`
    ],

    memorizacao: [
      'Movimentos por direitos civis e sociais',
      'Sindicatos e movimentos estudantis',
      'Feminismo, movimento negro, indígena, ambiental',
      'Ação coletiva',
      'Redes sociais e mobilização'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Movimentos sociais têm como objetivo:",
    "alternativas": [
      "A) eliminar participação",
      "B) reivindicar direitos e mudanças sociais",
      "C) defender exclusão",
      "D) impedir debate público"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre mobilização por moradia e acesso à cidade → **movimento social urbano**. "
  },
  {
    "enunciado": "2) Ação coletiva ocorre quando:",
    "alternativas": [
      "A) indivíduos agem isolados",
      "B) pessoas se organizam por objetivo comum",
      "C) só o Estado decide",
      "D) não existe organização"
    ],
    "respostaCorreta": -16,
    "resolucao": "Questão sobre mobilização por moradia e acesso à cidade → **movimento social urbano**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Movimentos sociais e participação política',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Movimentos por direitos civis e sociais',
            'Sindicatos e movimentos estudantis',
            'Feminismo, movimento negro, indígena, ambiental',
            'Ação coletiva'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Movimentos sociais têm como objetivo:",
    "opcoes": [
      "A) eliminar participação",
      "B) reivindicar direitos e mudanças sociais",
      "C) defender exclusão",
      "D) impedir debate público"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM destaca movimentos sociais como parte da cidadania e da democracia. FIM DO BLOCO 6 — SOCIOLOGIA ",
    "dificuldade": "média"
  },
  {
    "pergunta": "2) Ação coletiva ocorre quando:",
    "opcoes": [
      "A) indivíduos agem isolados",
      "B) pessoas se organizam por objetivo comum",
      "C) só o Estado decide",
      "D) não existe organização"
    ],
    "respostaCorreta": -16,
    "explicacao": "ENEM destaca movimentos sociais como parte da cidadania e da democracia. FIM DO BLOCO 6 — SOCIOLOGIA ",
    "dificuldade": "média"
  }
]
    }
  },

  'o-que-e-sociologia': {
    slug: 'o-que-e-sociologia',
    resumo: `A Sociologia estuda a sociedade, as relações sociais e os comportamentos coletivos.`,

    explicacao: `<h2>📚 O que é Sociologia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sociedade</li>
      <li>Relações sociais</li>
      <li>Instituições sociais</li>
      <li>Pensamento crítico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A Sociologia surge para compreender como os indivíduos vivem em grupo e como as estruturas sociais influenciam comportamentos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto que analisa comportamentos sociais → **olhar sociológico**. 5. QUESTÃO A Sociologia busca compreender: A) fatos naturais B) comportamentos individuais isolados C) relações sociais e coletivas D) apenas a política Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto que analisa comportamentos sociais → **olhar sociológico**. 5. QUESTÃO A Sociologia busca compreender: A) fatos naturais B) comportamentos individuais isolados C) relações sociais e coletivas D) apenas a política Gabarito: C`
    ],

    memorizacao: [
      'Sociedade',
      'Relações sociais',
      'Instituições sociais',
      'Pensamento crítico'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'O que é Sociologia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sociedade',
            'Relações sociais',
            'Instituições sociais',
            'Pensamento crítico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'individuo-e-sociedade': {
    slug: 'individuo-e-sociedade',
    resumo: `O indivíduo é formado socialmente.`,

    explicacao: `<h2>📚 Indivíduo e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Socialização</li>
      <li>Cultura</li>
      <li>Identidade</li>
      <li>Normas sociais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A sociedade molda valores, crenças e comportamentos por meio da socialização.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre influência do meio social → **processo de socialização**. 5. QUESTÃO Socialização é: A) processo biológico B) isolamento social C) aprendizado das normas sociais D) ato individual Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre influência do meio social → **processo de socialização**. 5. QUESTÃO Socialização é: A) processo biológico B) isolamento social C) aprendizado das normas sociais D) ato individual Gabarito: C`
    ],

    memorizacao: [
      'Socialização',
      'Cultura',
      'Identidade',
      'Normas sociais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Indivíduo e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Socialização',
            'Cultura',
            'Identidade',
            'Normas sociais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cultura-e-diversidade-cultural': {
    slug: 'cultura-e-diversidade-cultural',
    resumo: `Cultura engloba costumes, valores e tradições.`,

    explicacao: `<h2>📚 Cultura e diversidade cultural</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cultura</li>
      <li>Diversidade</li>
      <li>Etnocentrismo</li>
      <li>Relativismo cultural</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cada sociedade possui sua própria cultura. Julgar outra cultura como inferior é etnocentrismo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto que critica preconceitos culturais → **relativismo cultural**. 5. QUESTÃO Etnocentrismo é: A) valorização da diversidade B) julgamento de outra cultura pelos próprios valores C) respeito cultural D) neutralidade cultural Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto que critica preconceitos culturais → **relativismo cultural**. 5. QUESTÃO Etnocentrismo é: A) valorização da diversidade B) julgamento de outra cultura pelos próprios valores C) respeito cultural D) neutralidade cultural Gabarito: B`
    ],

    memorizacao: [
      'Cultura',
      'Diversidade',
      'Etnocentrismo',
      'Relativismo cultural'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cultura e diversidade cultural',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cultura',
            'Diversidade',
            'Etnocentrismo',
            'Relativismo cultural'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'trabalho-e-sociedade': {
    slug: 'trabalho-e-sociedade',
    resumo: `O trabalho organiza a vida social.`,

    explicacao: `<h2>📚 Trabalho e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Trabalho</li>
      <li>Divisão social</li>
      <li>Desigualdade</li>
      <li>Capitalismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O trabalho estrutura relações sociais e econômicas, gerando desigualdades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre precarização do trabalho → **questão social**. 5. QUESTÃO O trabalho influencia: A) apenas a economia B) apenas o indivíduo C) a organização social D) somente a política Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre precarização do trabalho → **questão social**. 5. QUESTÃO O trabalho influencia: A) apenas a economia B) apenas o indivíduo C) a organização social D) somente a política Gabarito: C`
    ],

    memorizacao: [
      'Trabalho',
      'Divisão social',
      'Desigualdade',
      'Capitalismo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Trabalho e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Trabalho',
            'Divisão social',
            'Desigualdade',
            'Capitalismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'desigualdade-social': {
    slug: 'desigualdade-social',
    resumo: `A desigualdade é a diferença de acesso a bens e direitos.`,

    explicacao: `<h2>📚 Desigualdade social</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Classes sociais</li>
      <li>Renda</li>
      <li>Exclusão</li>
      <li>Mobilidade social</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Diferenças econômicas e sociais geram exclusão e limitam oportunidades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre pobreza e exclusão → **desigualdade social**. 5. QUESTÃO Desigualdade social refere-se: A) apenas à renda B) às diferenças de acesso a direitos C) ao esforço individual D) à cultura Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre pobreza e exclusão → **desigualdade social**. 5. QUESTÃO Desigualdade social refere-se: A) apenas à renda B) às diferenças de acesso a direitos C) ao esforço individual D) à cultura Gabarito: B`
    ],

    memorizacao: [
      'Classes sociais',
      'Renda',
      'Exclusão',
      'Mobilidade social'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Desigualdade social',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Classes sociais',
            'Renda',
            'Exclusão',
            'Mobilidade social'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'estado-e-poder': {
    slug: 'estado-e-poder',
    resumo: `O Estado organiza o poder político.`,

    explicacao: `<h2>📚 Estado e poder</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Estado</li>
      <li>Poder</li>
      <li>Autoridade</li>
      <li>Dominação</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O poder pode ser exercido de forma legítima ou coercitiva.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre legitimidade do poder → **Estado moderno**. 5. QUESTÃO O Estado é responsável por: A) apenas controlar B) organizar politicamente a sociedade C) eliminar conflitos D) acabar com desigualdades Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre legitimidade do poder → **Estado moderno**. 5. QUESTÃO O Estado é responsável por: A) apenas controlar B) organizar politicamente a sociedade C) eliminar conflitos D) acabar com desigualdades Gabarito: B`
    ],

    memorizacao: [
      'Estado',
      'Poder',
      'Autoridade',
      'Dominação'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Estado e poder',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Estado',
            'Poder',
            'Autoridade',
            'Dominação'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cidadania-e-direitos-sociais': {
    slug: 'cidadania-e-direitos-sociais',
    resumo: `Cidadania envolve direitos e deveres.`,

    explicacao: `<h2>📚 Cidadania e direitos sociais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Direitos civis</li>
      <li>Direitos políticos</li>
      <li>Direitos sociais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cidadania plena garante participação e acesso a direitos básicos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre direitos humanos → **cidadania**. 5. QUESTÃO Cidadania plena inclui: A) apenas votar B) direitos civis, políticos e sociais C) deveres apenas D) consumo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre direitos humanos → **cidadania**. 5. QUESTÃO Cidadania plena inclui: A) apenas votar B) direitos civis, políticos e sociais C) deveres apenas D) consumo Gabarito: B`
    ],

    memorizacao: [
      'Direitos civis',
      'Direitos políticos',
      'Direitos sociais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cidadania e direitos sociais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Direitos civis',
            'Direitos políticos',
            'Direitos sociais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'movimentos-sociais': {
    slug: 'movimentos-sociais',
    resumo: `Movimentos sociais lutam por direitos.`,

    explicacao: `<h2>📚 Movimentos sociais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Movimentos sociais</li>
      <li>Reivindicação</li>
      <li>Mudança social</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>São ações coletivas organizadas para transformar a sociedade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre movimentos populares → **ação coletiva**. 5. QUESTÃO Movimentos sociais buscam: A) manter desigualdades B) transformação social C) controle estatal D) exclusão Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre movimentos populares → **ação coletiva**. 5. QUESTÃO Movimentos sociais buscam: A) manter desigualdades B) transformação social C) controle estatal D) exclusão Gabarito: B`
    ],

    memorizacao: [
      'Movimentos sociais',
      'Reivindicação',
      'Mudança social'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Movimentos sociais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Movimentos sociais',
            'Reivindicação',
            'Mudança social'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'midia-e-sociedade': {
    slug: 'midia-e-sociedade',
    resumo: `A mídia influencia comportamentos e opiniões.`,

    explicacao: `<h2>📚 Mídia e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Comunicação</li>
      <li>Opinião pública</li>
      <li>Cultura de massa</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A mídia molda valores e pode reforçar ou questionar padrões sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto crítico sobre redes sociais → **mídia e poder**. 5. QUESTÃO A mídia exerce influência sobre: A) apenas entretenimento B) opinião pública C) natureza D) biologia Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto crítico sobre redes sociais → **mídia e poder**. 5. QUESTÃO A mídia exerce influência sobre: A) apenas entretenimento B) opinião pública C) natureza D) biologia Gabarito: B`
    ],

    memorizacao: [
      'Comunicação',
      'Opinião pública',
      'Cultura de massa'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Mídia e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Comunicação',
            'Opinião pública',
            'Cultura de massa'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'globalizacao-e-sociedade-contemporanea': {
    slug: 'globalizacao-e-sociedade-contemporanea',
    resumo: `A globalização intensifica relações globais.`,

    explicacao: `<h2>📚 Globalização e sociedade contemporânea</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Globalização</li>
      <li>Tecnologia</li>
      <li>Economia mundial</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A globalização aproxima culturas, mas também amplia desigualdades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre impactos globais → **globalização**. 5. QUESTÃO A globalização caracteriza-se por: A) isolamento B) integração mundial C) fim da cultura D) atraso tecnológico Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre impactos globais → **globalização**. 5. QUESTÃO A globalização caracteriza-se por: A) isolamento B) integração mundial C) fim da cultura D) atraso tecnológico Gabarito: B`
    ],

    memorizacao: [
      'Globalização',
      'Tecnologia',
      'Economia mundial'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Globalização e sociedade contemporânea',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Globalização',
            'Tecnologia',
            'Economia mundial'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'sociologia-e-sociedade': {
    slug: 'sociologia-e-sociedade',
    resumo: `A Sociologia estuda as relações sociais e a organização da sociedade.`,

    explicacao: `<h2>📚 Sociologia e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sociedade</li>
      <li>Relações sociais</li>
      <li>Instituições sociais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A sociedade é formada por indivíduos interligados por relações sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre comportamento coletivo → **análise social**. 5. QUESTÃO A Sociologia tem como objeto de estudo: A) o indivíduo isolado B) a natureza C) as relações sociais D) os fenômenos naturais Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre comportamento coletivo → **análise social**. 5. QUESTÃO A Sociologia tem como objeto de estudo: A) o indivíduo isolado B) a natureza C) as relações sociais D) os fenômenos naturais Gabarito: C`
    ],

    memorizacao: [
      'Sociedade',
      'Relações sociais',
      'Instituições sociais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Sociologia e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sociedade',
            'Relações sociais',
            'Instituições sociais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cultura': {
    slug: 'cultura',
    resumo: `Conjunto de hábitos, valores e costumes.`,

    explicacao: `<h2>📚 Cultura</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cultura material</li>
      <li>Cultura imaterial</li>
      <li>Diversidade cultural</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A cultura é aprendida e transmitida socialmente.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre costumes → **identidade cultural**. 5. QUESTÃO Cultura imaterial refere-se a: A) objetos B) prédios C) valores e crenças D) tecnologias Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre costumes → **identidade cultural**. 5. QUESTÃO Cultura imaterial refere-se a: A) objetos B) prédios C) valores e crenças D) tecnologias Gabarito: C`
    ],

    memorizacao: [
      'Cultura material',
      'Cultura imaterial',
      'Diversidade cultural'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cultura',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cultura material',
            'Cultura imaterial',
            'Diversidade cultural'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'socializacao': {
    slug: 'socializacao',
    resumo: `Processo de integração do indivíduo à sociedade.`,

    explicacao: `<h2>📚 Socialização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Família</li>
      <li>Escola</li>
      <li>Mídia</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A socialização ensina normas e valores sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre escola → **formação social**. 5. QUESTÃO A socialização primária ocorre principalmente na: A) escola B) mídia C) família D) trabalho Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre escola → **formação social**. 5. QUESTÃO A socialização primária ocorre principalmente na: A) escola B) mídia C) família D) trabalho Gabarito: C`
    ],

    memorizacao: [
      'Família',
      'Escola',
      'Mídia'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Socialização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Família',
            'Escola',
            'Mídia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'trabalho': {
    slug: 'trabalho',
    resumo: `Atividade fundamental da vida social.`,

    explicacao: `<h2>📚 Trabalho</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Trabalho formal</li>
      <li>Trabalho informal</li>
      <li>Desemprego</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O trabalho organiza a economia e a sociedade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre desemprego → **questão social**. 5. QUESTÃO O trabalho informal caracteriza-se por: A) direitos garantidos B) estabilidade C) ausência de proteção legal D) altos salários Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre desemprego → **questão social**. 5. QUESTÃO O trabalho informal caracteriza-se por: A) direitos garantidos B) estabilidade C) ausência de proteção legal D) altos salários Gabarito: C`
    ],

    memorizacao: [
      'Trabalho formal',
      'Trabalho informal',
      'Desemprego'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Trabalho',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Trabalho formal',
            'Trabalho informal',
            'Desemprego'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'classes-sociais': {
    slug: 'classes-sociais',
    resumo: `Divisão social baseada na renda e poder.`,

    explicacao: `<h2>📚 Classes sociais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Classe alta</li>
      <li>Classe média</li>
      <li>Classe baixa</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>As classes refletem desigualdades econômicas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre pobreza → **desigualdade social**. 5. QUESTÃO A divisão em classes sociais baseia-se principalmente em: A) religião B) renda C) clima D) idade Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre pobreza → **desigualdade social**. 5. QUESTÃO A divisão em classes sociais baseia-se principalmente em: A) religião B) renda C) clima D) idade Gabarito: B`
    ],

    memorizacao: [
      'Classe alta',
      'Classe média',
      'Classe baixa'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Classes sociais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Classe alta',
            'Classe média',
            'Classe baixa'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'desigualdade-social-2': {
    slug: 'desigualdade-social-2',
    resumo: `Diferenças de acesso a recursos.`,

    explicacao: `<h2>📚 Desigualdade social</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Pobreza</li>
      <li>Exclusão social</li>
      <li>Mobilidade social</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A desigualdade afeta oportunidades.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre favela → **exclusão social**. 5. QUESTÃO A mobilidade social refere-se a: A) mudança de renda B) migração C) crescimento populacional D) urbanização Gabarito: A</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre favela → **exclusão social**. 5. QUESTÃO A mobilidade social refere-se a: A) mudança de renda B) migração C) crescimento populacional D) urbanização Gabarito: A`
    ],

    memorizacao: [
      'Pobreza',
      'Exclusão social',
      'Mobilidade social'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Desigualdade social',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Pobreza',
            'Exclusão social',
            'Mobilidade social'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'estado-e-poder-2': {
    slug: 'estado-e-poder-2',
    resumo: `Organização política da sociedade.`,

    explicacao: `<h2>📚 Estado e poder</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Estado</li>
      <li>Poder</li>
      <li>Autoridade</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O Estado exerce poder legítimo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre governo → **poder político**. 5. QUESTÃO O Estado é responsável por: A) organização social B) religião C) família D) cultura popular Gabarito: A</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre governo → **poder político**. 5. QUESTÃO O Estado é responsável por: A) organização social B) religião C) família D) cultura popular Gabarito: A`
    ],

    memorizacao: [
      'Estado',
      'Poder',
      'Autoridade'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Estado e poder',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Estado',
            'Poder',
            'Autoridade'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cidadania': {
    slug: 'cidadania',
    resumo: `Conjunto de direitos e deveres.`,

    explicacao: `<h2>📚 Cidadania</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Direitos civis</li>
      <li>Direitos políticos</li>
      <li>Direitos sociais</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A cidadania garante participação social.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre voto → **participação política**. 5. QUESTÃO Direitos políticos referem-se a: A) saúde B) educação C) voto D) moradia Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre voto → **participação política**. 5. QUESTÃO Direitos políticos referem-se a: A) saúde B) educação C) voto D) moradia Gabarito: C`
    ],

    memorizacao: [
      'Direitos civis',
      'Direitos políticos',
      'Direitos sociais'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cidadania',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Direitos civis',
            'Direitos políticos',
            'Direitos sociais'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'movimentos-sociais-2': {
    slug: 'movimentos-sociais-2',
    resumo: `Ações coletivas por mudanças sociais.`,

    explicacao: `<h2>📚 Movimentos sociais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sindicatos</li>
      <li>Movimentos estudantis</li>
      <li>Movimentos identitários</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Buscam direitos e transformações.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre protestos → **ação coletiva**. 5. QUESTÃO Movimentos sociais visam: A) manter a ordem B) promover mudanças C) eliminar o Estado D) extinguir direitos Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre protestos → **ação coletiva**. 5. QUESTÃO Movimentos sociais visam: A) manter a ordem B) promover mudanças C) eliminar o Estado D) extinguir direitos Gabarito: B`
    ],

    memorizacao: [
      'Sindicatos',
      'Movimentos estudantis',
      'Movimentos identitários'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Movimentos sociais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sindicatos',
            'Movimentos estudantis',
            'Movimentos identitários'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'midia-e-sociedade-2': {
    slug: 'midia-e-sociedade-2',
    resumo: `Influência dos meios de comunicação.`,

    explicacao: `<h2>📚 Mídia e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Mídia tradicional</li>
      <li>Redes sociais</li>
      <li>Opinião pública</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A mídia molda percepções sociais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre redes sociais → **influência social**. 5. QUESTÃO A mídia influencia principalmente: A) clima B) relevo C) opinião pública D) genética Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre redes sociais → **influência social**. 5. QUESTÃO A mídia influencia principalmente: A) clima B) relevo C) opinião pública D) genética Gabarito: C`
    ],

    memorizacao: [
      'Mídia tradicional',
      'Redes sociais',
      'Opinião pública'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Mídia e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Mídia tradicional',
            'Redes sociais',
            'Opinião pública'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};


// =====================================================
// FILOSOFIA
// =====================================================

export const FILOSOFIA_CONTEUDO: Record<string, ConteudoModulo> = {
'o-que-e-filosofia-e-o-pensamento-critico': {
    slug: 'o-que-e-filosofia-e-o-pensamento-critico',
    resumo: `Filosofia é a busca racional por explicações sobre a realidade, o conhecimento, a moral e a política. No ENEM, ela aparece ligada à **interpretação crítica** de textos.`,

    explicacao: `<h2>📚 O que é Filosofia e o pensamento crítico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Origem grega da filosofia</li>
      <li>Logos (razão) x mito</li>
      <li>Atitude crítica</li>
      <li>Questionamento do senso comum</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A filosofia surge quando o ser humano passa a explicar o mundo pela razão, e não apenas por mitos. Filosofar é perguntar “por quê?” e “como?” sobre o que parece óbvio.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto que critica opiniões sem reflexão → **superação do senso comum**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto que critica opiniões sem reflexão → **superação do senso comum**.`
    ],

    memorizacao: [
      'Origem grega da filosofia',
      'Logos (razão) x mito',
      'Atitude crítica',
      'Questionamento do senso comum'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Filosofia caracteriza-se por:",
    "alternativas": [
      "A) aceitar tradições sem questionar",
      "B) reflexão racional e crítica",
      "C) repetição de mitos",
      "D) opiniões pessoais"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto que critica opiniões sem reflexão → **superação do senso comum**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'O que é Filosofia e o pensamento crítico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Origem grega da filosofia',
            'Logos (razão) x mito',
            'Atitude crítica',
            'Questionamento do senso comum'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Filosofia caracteriza-se por:",
    "opcoes": [
      "A) aceitar tradições sem questionar",
      "B) reflexão racional e crítica",
      "C) repetição de mitos",
      "D) opiniões pessoais"
    ],
    "respostaCorreta": 1,
    "explicacao": "No ENEM, filosofia é leitura crítica e reflexão racional. ",
    "dificuldade": "média"
  }
]
    }
  },

  'filosofia-antiga-socrates-platao-e-aristoteles': {
    slug: 'filosofia-antiga-socrates-platao-e-aristoteles',
    resumo: `A base do pensamento ocidental nasce na Grécia Antiga.`,

    explicacao: `<h2>📚 Filosofia Antiga: Sócrates, Platão e Aristóteles</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Sócrates: diálogo e maiêutica</li>
      <li>Platão: mundo das ideias</li>
      <li>Aristóteles: lógica e empirismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Sócrates defendia o diálogo para alcançar a verdade. Platão separava o mundo sensível do mundo das ideias. Aristóteles valorizava a observação da realidade concreta.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre conhecimento além das aparências → **Platão**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre conhecimento além das aparências → **Platão**.`
    ],

    memorizacao: [
      'Sócrates: diálogo e maiêutica',
      'Platão: mundo das ideias',
      'Aristóteles: lógica e empirismo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) A maiêutica socrática consiste em:",
    "alternativas": [
      "A) impor verdades",
      "B) estimular o pensamento pelo diálogo",
      "C) decorar conceitos",
      "D) negar a razão"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre conhecimento além das aparências → **Platão**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Filosofia Antiga: Sócrates, Platão e Aristóteles',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Sócrates: diálogo e maiêutica',
            'Platão: mundo das ideias',
            'Aristóteles: lógica e empirismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) A maiêutica socrática consiste em:",
    "opcoes": [
      "A) impor verdades",
      "B) estimular o pensamento pelo diálogo",
      "C) decorar conceitos",
      "D) negar a razão"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM cobra conceitos básicos desses filósofos em textos interpretativos. ",
    "dificuldade": "média"
  }
]
    }
  },

  'etica-e-moral': {
    slug: 'etica-e-moral',
    resumo: `A ética estuda os valores que orientam o comportamento humano.`,

    explicacao: `<h2>📚 Ética e moral</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Moral (costumes)</li>
      <li>Ética (reflexão crítica)</li>
      <li>Bem e mal</li>
      <li>Responsabilidade</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Moral são regras de um grupo. Ética é pensar criticamente essas regras, avaliando se são justas ou não.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre dilema moral → **ética aplicada**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre dilema moral → **ética aplicada**.`
    ],

    memorizacao: [
      'Moral (costumes)',
      'Ética (reflexão crítica)',
      'Bem e mal',
      'Responsabilidade'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Ética diferencia-se da moral porque:",
    "alternativas": [
      "A) rejeita valores",
      "B) reflete criticamente sobre eles",
      "C) é apenas religiosa",
      "D) é individual"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto sobre dilema moral → **ética aplicada**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ética e moral',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Moral (costumes)',
            'Ética (reflexão crítica)',
            'Bem e mal',
            'Responsabilidade'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Ética diferencia-se da moral porque:",
    "opcoes": [
      "A) rejeita valores",
      "B) reflete criticamente sobre eles",
      "C) é apenas religiosa",
      "D) é individual"
    ],
    "respostaCorreta": 1,
    "explicacao": "Muito comum no ENEM, ligada a dilemas sociais e cidadania. ",
    "dificuldade": "média"
  }
]
    }
  },

  'etica-em-aristoteles': {
    slug: 'etica-em-aristoteles',
    resumo: `Aristóteles relaciona ética à busca da felicidade.`,

    explicacao: `<h2>📚 Ética em Aristóteles</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Eudaimonia (felicidade)</li>
      <li>Virtude</li>
      <li>Justo meio</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A virtude está no equilíbrio entre excessos. A felicidade vem da prática racional das virtudes.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre equilíbrio nas ações → **justo meio**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre equilíbrio nas ações → **justo meio**.`
    ],

    memorizacao: [
      'Eudaimonia (felicidade)',
      'Virtude',
      'Justo meio'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Para Aristóteles, virtude é:",
    "alternativas": [
      "A) excesso",
      "B) equilíbrio racional",
      "C) prazer imediato",
      "D) punição"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre equilíbrio nas ações → **justo meio**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ética em Aristóteles',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Eudaimonia (felicidade)',
            'Virtude',
            'Justo meio'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Para Aristóteles, virtude é:",
    "opcoes": [
      "A) excesso",
      "B) equilíbrio racional",
      "C) prazer imediato",
      "D) punição"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM cobra ética aristotélica de forma conceitual. ",
    "dificuldade": "média"
  }
]
    }
  },

  'filosofia-medieval-e-religiao': {
    slug: 'filosofia-medieval-e-religiao',
    resumo: `Período marcado pela relação entre fé e razão.`,

    explicacao: `<h2>📚 Filosofia Medieval e religião</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Santo Agostinho</li>
      <li>São Tomás de Aquino</li>
      <li>Fé e razão</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A filosofia medieval buscou conciliar crença religiosa e pensamento racional.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre razão subordinada à fé → **medieval**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre razão subordinada à fé → **medieval**.`
    ],

    memorizacao: [
      'Santo Agostinho',
      'São Tomás de Aquino',
      'Fé e razão'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Filosofia medieval caracteriza-se por:",
    "alternativas": [
      "A) negação da religião",
      "B) tentativa de conciliar fé e razão",
      "C) cientificismo",
      "D) empirismo radical"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto sobre razão subordinada à fé → **medieval**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Filosofia Medieval e religião',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Santo Agostinho',
            'São Tomás de Aquino',
            'Fé e razão'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Filosofia medieval caracteriza-se por:",
    "opcoes": [
      "A) negação da religião",
      "B) tentativa de conciliar fé e razão",
      "C) cientificismo",
      "D) empirismo radical"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM aborda esse tema de forma histórica e interpretativa. ",
    "dificuldade": "média"
  }
]
    }
  },

  'filosofia-moderna-descartes-e-o-racionalismo': {
    slug: 'filosofia-moderna-descartes-e-o-racionalismo',
    resumo: `A modernidade coloca o sujeito como centro do conhecimento.`,

    explicacao: `<h2>📚 Filosofia Moderna: Descartes e o racionalismo</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Dúvida metódica</li>
      <li>“Penso, logo existo”</li>
      <li>Racionalismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Descartes duvida de tudo para encontrar uma verdade segura: a existência do pensamento.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre razão como base do conhecimento → **racionalismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre razão como base do conhecimento → **racionalismo**.`
    ],

    memorizacao: [
      'Dúvida metódica',
      '“Penso, logo existo”',
      'Racionalismo'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) “Penso, logo existo” expressa:",
    "alternativas": [
      "A) empirismo",
      "B) racionalismo cartesiano",
      "C) moral religiosa",
      "D) senso comum"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre razão como base do conhecimento → **racionalismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Filosofia Moderna: Descartes e o racionalismo',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Dúvida metódica',
            '“Penso, logo existo”',
            'Racionalismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) “Penso, logo existo” expressa:",
    "opcoes": [
      "A) empirismo",
      "B) racionalismo cartesiano",
      "C) moral religiosa",
      "D) senso comum"
    ],
    "respostaCorreta": 1,
    "explicacao": "Muito recorrente em questões conceituais. ",
    "dificuldade": "média"
  }
]
    }
  },

  'empirismo-locke-e-hume': {
    slug: 'empirismo-locke-e-hume',
    resumo: `O conhecimento vem da experiência sensível.`,

    explicacao: `<h2>📚 Empirismo: Locke e Hume</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Tábula rasa</li>
      <li>Experiência</li>
      <li>Crítica à razão absoluta</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Locke defende que a mente nasce vazia. Hume questiona certezas absolutas baseadas apenas na razão.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre aprendizado pela experiência → **empirismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre aprendizado pela experiência → **empirismo**.`
    ],

    memorizacao: [
      'Tábula rasa',
      'Experiência',
      'Crítica à razão absoluta'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Empirismo defende que o conhecimento vem:",
    "alternativas": [
      "A) da fé",
      "B) da experiência",
      "C) do mito",
      "D) da tradição"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto sobre aprendizado pela experiência → **empirismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Empirismo: Locke e Hume',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Tábula rasa',
            'Experiência',
            'Crítica à razão absoluta'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Empirismo defende que o conhecimento vem:",
    "opcoes": [
      "A) da fé",
      "B) da experiência",
      "C) do mito",
      "D) da tradição"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM usa comparações entre empirismo e racionalismo. ",
    "dificuldade": "média"
  }
]
    }
  },

  'iluminismo-e-razao-critica': {
    slug: 'iluminismo-e-razao-critica',
    resumo: `O Iluminismo defende razão, liberdade e progresso.`,

    explicacao: `<h2>📚 Iluminismo e razão crítica</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Kant</li>
      <li>Autonomia</li>
      <li>Esclarecimento</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Kant define Iluminismo como saída da “menoridade intelectual”.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre autonomia do pensamento → **Iluminismo**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre autonomia do pensamento → **Iluminismo**.`
    ],

    memorizacao: [
      'Kant',
      'Autonomia',
      'Esclarecimento'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Para Kant, esclarecimento é:",
    "alternativas": [
      "A) obediência cega",
      "B) uso autônomo da razão",
      "C) tradição religiosa",
      "D) senso comum"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto sobre autonomia do pensamento → **Iluminismo**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Iluminismo e razão crítica',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Kant',
            'Autonomia',
            'Esclarecimento'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Para Kant, esclarecimento é:",
    "opcoes": [
      "A) obediência cega",
      "B) uso autônomo da razão",
      "C) tradição religiosa",
      "D) senso comum"
    ],
    "respostaCorreta": 1,
    "explicacao": "Muito ligado à cidadania no ENEM. ",
    "dificuldade": "média"
  }
]
    }
  },

  'filosofia-politica-poder-e-estado': {
    slug: 'filosofia-politica-poder-e-estado',
    resumo: `Reflete sobre organização da sociedade e do poder.`,

    explicacao: `<h2>📚 Filosofia política: poder e Estado</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Contrato social</li>
      <li>Estado</li>
      <li>Leis</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Filósofos analisam por que obedecemos leis e como o poder se legitima.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Questão sobre legitimidade do Estado → **filosofia política**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Questão sobre legitimidade do Estado → **filosofia política**.`
    ],

    memorizacao: [
      'Contrato social',
      'Estado',
      'Leis'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Contrato social explica:",
    "alternativas": [
      "A) origem divina do poder",
      "B) acordo racional entre indivíduos",
      "C) dominação natural",
      "D) tradição familiar"
    ],
    "respostaCorreta": 1,
    "resolucao": "Questão sobre legitimidade do Estado → **filosofia política**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Filosofia política: poder e Estado',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Contrato social',
            'Estado',
            'Leis'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Contrato social explica:",
    "opcoes": [
      "A) origem divina do poder",
      "B) acordo racional entre indivíduos",
      "C) dominação natural",
      "D) tradição familiar"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM cobra conceitos básicos ligados à cidadania. ",
    "dificuldade": "média"
  }
]
    }
  },

  'filosofia-contemporanea-e-sociedade': {
    slug: 'filosofia-contemporanea-e-sociedade',
    resumo: `Analisa desafios atuais: tecnologia, ética, poder e cultura.`,

    explicacao: `<h2>📚 Filosofia contemporânea e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crítica à sociedade</li>
      <li>Tecnologia</li>
      <li>Ética contemporânea</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A filosofia atual questiona impactos sociais da ciência, mídia e poder.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto crítico sobre tecnologia → **filosofia contemporânea**.</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto crítico sobre tecnologia → **filosofia contemporânea**.`
    ],

    memorizacao: [
      'Crítica à sociedade',
      'Tecnologia',
      'Ética contemporânea'
    ],

    errosComuns: [],

    questoesResolvidas: [
  {
    "enunciado": "1) Filosofia contemporânea preocupa-se com:",
    "alternativas": [
      "A) apenas metafísica antiga",
      "B) problemas atuais da sociedade",
      "C) mitos",
      "D) tradições fixas"
    ],
    "respostaCorreta": 1,
    "resolucao": "Texto crítico sobre tecnologia → **filosofia contemporânea**. "
  }
],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Filosofia contemporânea e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crítica à sociedade',
            'Tecnologia',
            'Ética contemporânea'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: [
  {
    "pergunta": "1) Filosofia contemporânea preocupa-se com:",
    "opcoes": [
      "A) apenas metafísica antiga",
      "B) problemas atuais da sociedade",
      "C) mitos",
      "D) tradições fixas"
    ],
    "respostaCorreta": 1,
    "explicacao": "ENEM usa textos reflexivos sobre mundo atual. FIM DO BLOCO 7 — FILOSOFIA ",
    "dificuldade": "média"
  }
]
    }
  }
};


// =====================================================
// INGLES
// =====================================================

export const INGLES_CONTEUDO: Record<string, ConteudoModulo> = {
'leitura-e-interpretacao-de-texto': {
    slug: 'leitura-e-interpretacao-de-texto',
    resumo: `No ENEM, inglês é avaliado quase exclusivamente por interpretação.`,

    explicacao: `<h2>📚 Leitura e interpretação de texto</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Leitura global</li>
      <li>Ideia principal</li>
      <li>Inferência</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Não é tradução palavra por palavra. O foco é compreender o sentido geral.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto jornalístico → identificar o tema central. 5. QUESTÃO O objetivo principal do texto é: A) narrar um fato pessoal B) informar sobre um evento C) vender um produto D) ensinar gramática Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto jornalístico → identificar o tema central. 5. QUESTÃO O objetivo principal do texto é: A) narrar um fato pessoal B) informar sobre um evento C) vender um produto D) ensinar gramática Gabarito: B`
    ],

    memorizacao: [
      'Leitura global',
      'Ideia principal',
      'Inferência'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Leitura e interpretação de texto',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Leitura global',
            'Ideia principal',
            'Inferência'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cognatos-e-falsos-cognatos': {
    slug: 'cognatos-e-falsos-cognatos',
    resumo: `Palavras semelhantes ao português.`,

    explicacao: `<h2>📚 Cognatos e falsos cognatos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cognatos</li>
      <li>False friends</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cognatos ajudam; falsos cognatos confundem.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Word “actually” ≠ atualmente. 5. QUESTÃO A palavra “pretend” significa: A) pretender B) fingir C) planejar D) tentar Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Word “actually” ≠ atualmente. 5. QUESTÃO A palavra “pretend” significa: A) pretender B) fingir C) planejar D) tentar Gabarito: B`
    ],

    memorizacao: [
      'Cognatos',
      'False friends'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cognatos e falsos cognatos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cognatos',
            'False friends'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'generos-textuais': {
    slug: 'generos-textuais',
    resumo: `Tipos de textos usados no ENEM.`,

    explicacao: `<h2>📚 Gêneros textuais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Notícias</li>
      <li>Charges</li>
      <li>Anúncios</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cada gênero tem uma intenção comunicativa.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge → crítica social. 5. QUESTÃO A função principal da charge é: A) informar B) narrar C) criticar D) instruir Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge → crítica social. 5. QUESTÃO A função principal da charge é: A) informar B) narrar C) criticar D) instruir Gabarito: C`
    ],

    memorizacao: [
      'Notícias',
      'Charges',
      'Anúncios'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Gêneros textuais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Notícias',
            'Charges',
            'Anúncios'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'vocabulario-contextual': {
    slug: 'vocabulario-contextual',
    resumo: `Significado depende do contexto.`,

    explicacao: `<h2>📚 Vocabulário contextual</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Palavras-chave</li>
      <li>Context clues</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O sentido vem do texto, não do dicionário.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Palavra “issue” → problema. 5. QUESTÃO O significado correto da palavra depende: A) do dicionário B) do contexto C) da tradução literal D) da gramática Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Palavra “issue” → problema. 5. QUESTÃO O significado correto da palavra depende: A) do dicionário B) do contexto C) da tradução literal D) da gramática Gabarito: B`
    ],

    memorizacao: [
      'Palavras-chave',
      'Context clues'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Vocabulário contextual',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Palavras-chave',
            'Context clues'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'pronomes': {
    slug: 'pronomes',
    resumo: `Referem-se a pessoas ou coisas.`,

    explicacao: `<h2>📚 Pronomes</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>He / She / It</li>
      <li>They</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Servem para evitar repetições.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Identificar o referente do “it”. 5. QUESTÃO O pronome “they” refere-se a: A) ideia abstrata B) sujeito plural C) objeto singular D) verbo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Identificar o referente do “it”. 5. QUESTÃO O pronome “they” refere-se a: A) ideia abstrata B) sujeito plural C) objeto singular D) verbo Gabarito: B`
    ],

    memorizacao: [
      'He / She / It',
      'They'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Pronomes',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'He / She / It',
            'They'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'tempos-verbais-nocoes': {
    slug: 'tempos-verbais-nocoes',
    resumo: `ENEM cobra reconhecimento, não conjugação.`,

    explicacao: `<h2>📚 Tempos verbais (noções)</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Present</li>
      <li>Past</li>
      <li>Future</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Identificar quando a ação ocorre.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Verbo no passado → evento já ocorrido. 5. QUESTÃO O tempo verbal indica: A) personagem B) ação no tempo C) opinião D) intenção Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Verbo no passado → evento já ocorrido. 5. QUESTÃO O tempo verbal indica: A) personagem B) ação no tempo C) opinião D) intenção Gabarito: B`
    ],

    memorizacao: [
      'Present',
      'Past',
      'Future'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Tempos verbais (noções)',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Present',
            'Past',
            'Future'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'conectivos': {
    slug: 'conectivos',
    resumo: `Ligam ideias no texto.`,

    explicacao: `<h2>📚 Conectivos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>But</li>
      <li>However</li>
      <li>Because</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Indicam oposição, causa, consequência.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>“But” → contraste. 5. QUESTÃO O conector “because” indica: A) oposição B) causa C) conclusão D) tempo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>“But” → contraste. 5. QUESTÃO O conector “because” indica: A) oposição B) causa C) conclusão D) tempo Gabarito: B`
    ],

    memorizacao: [
      'But',
      'However',
      'Because'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Conectivos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'But',
            'However',
            'Because'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'linguagem-verbal-e-nao-verbal': {
    slug: 'linguagem-verbal-e-nao-verbal',
    resumo: `Texto + imagem.`,

    explicacao: `<h2>📚 Linguagem verbal e não verbal</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Imagens</li>
      <li>Ícones</li>
      <li>Símbolos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A imagem complementa o texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Cartaz publicitário → persuasão. 5. QUESTÃO A imagem no texto serve para: A) decorar B) confundir C) reforçar a mensagem D) substituir o texto Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Cartaz publicitário → persuasão. 5. QUESTÃO A imagem no texto serve para: A) decorar B) confundir C) reforçar a mensagem D) substituir o texto Gabarito: C`
    ],

    memorizacao: [
      'Imagens',
      'Ícones',
      'Símbolos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Linguagem verbal e não verbal',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Imagens',
            'Ícones',
            'Símbolos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'ironia-e-humor': {
    slug: 'ironia-e-humor',
    resumo: `Uso indireto da linguagem.`,

    explicacao: `<h2>📚 Ironia e humor</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ironia</li>
      <li>Humor crítico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Dizer algo para significar o oposto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge irônica → crítica social. 5. QUESTÃO A ironia ocorre quando: A) o texto é literal B) há exagero C) o sentido é invertido D) não há humor Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge irônica → crítica social. 5. QUESTÃO A ironia ocorre quando: A) o texto é literal B) há exagero C) o sentido é invertido D) não há humor Gabarito: C`
    ],

    memorizacao: [
      'Ironia',
      'Humor crítico'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ironia e humor',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ironia',
            'Humor crítico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'ingles-e-globalizacao': {
    slug: 'ingles-e-globalizacao',
    resumo: `Inglês como língua global.`,

    explicacao: `<h2>📚 Inglês e globalização</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cultura</li>
      <li>Tecnologia</li>
      <li>Comunicação</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O inglês conecta pessoas no mundo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre internet → idioma global. 5. QUESTÃO O inglês é considerado global porque: A) é fácil B) é antigo C) facilita comunicação mundial D) substitui outras línguas Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre internet → idioma global. 5. QUESTÃO O inglês é considerado global porque: A) é fácil B) é antigo C) facilita comunicação mundial D) substitui outras línguas Gabarito: C`
    ],

    memorizacao: [
      'Cultura',
      'Tecnologia',
      'Comunicação'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Inglês e globalização',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cultura',
            'Tecnologia',
            'Comunicação'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'leitura-e-interpretacao-de-texto-2': {
    slug: 'leitura-e-interpretacao-de-texto-2',
    resumo: `No ENEM, o inglês é cobrado quase exclusivamente por interpretação.`,

    explicacao: `<h2>📚 Leitura e interpretação de texto</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Compreensão global</li>
      <li>Ideia principal</li>
      <li>Inferência</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Não se exige tradução literal, mas entendimento do sentido do texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto jornalístico → identificar objetivo do autor. 5. QUESTÃO O principal objetivo do texto é: A) narrar uma história B) informar um fato C) persuadir o leitor D) ensinar gramática Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto jornalístico → identificar objetivo do autor. 5. QUESTÃO O principal objetivo do texto é: A) narrar uma história B) informar um fato C) persuadir o leitor D) ensinar gramática Gabarito: B`
    ],

    memorizacao: [
      'Compreensão global',
      'Ideia principal',
      'Inferência'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Leitura e interpretação de texto',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Compreensão global',
            'Ideia principal',
            'Inferência'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'generos-textuais-em-ingles': {
    slug: 'generos-textuais-em-ingles',
    resumo: `Reconhecimento do tipo de texto.`,

    explicacao: `<h2>📚 Gêneros textuais em inglês</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>News</li>
      <li>Ads</li>
      <li>Comics</li>
      <li>Songs</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cada gênero tem função comunicativa específica.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Anúncio publicitário → persuasão. 5. QUESTÃO Um anúncio publicitário tem como objetivo: A) narrar fatos B) persuadir C) informar dados científicos D) ensinar regras Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Anúncio publicitário → persuasão. 5. QUESTÃO Um anúncio publicitário tem como objetivo: A) narrar fatos B) persuadir C) informar dados científicos D) ensinar regras Gabarito: B`
    ],

    memorizacao: [
      'News',
      'Ads',
      'Comics',
      'Songs'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Gêneros textuais em inglês',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'News',
            'Ads',
            'Comics',
            'Songs'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'vocabulario-contextualizado': {
    slug: 'vocabulario-contextualizado',
    resumo: `Palavras compreendidas pelo contexto.`,

    explicacao: `<h2>📚 Vocabulário contextualizado</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cognatos</li>
      <li>Falsos cognatos</li>
      <li>Palavras-chave</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O significado vem do contexto, não do dicionário.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Palavra “actually” → significa “na verdade”. 5. QUESTÃO O significado da palavra depende: A) da tradução literal B) do contexto C) da gramática D) do tempo verbal Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Palavra “actually” → significa “na verdade”. 5. QUESTÃO O significado da palavra depende: A) da tradução literal B) do contexto C) da gramática D) do tempo verbal Gabarito: B`
    ],

    memorizacao: [
      'Cognatos',
      'Falsos cognatos',
      'Palavras-chave'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Vocabulário contextualizado',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cognatos',
            'Falsos cognatos',
            'Palavras-chave'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cognatos-e-falsos-cognatos-2': {
    slug: 'cognatos-e-falsos-cognatos-2',
    resumo: `Palavras semelhantes ao português.`,

    explicacao: `<h2>📚 Cognatos e falsos cognatos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cognatos verdadeiros</li>
      <li>Falsos cognatos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Falsos cognatos podem confundir o candidato.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>“Pretend” ≠ pretender. 5. QUESTÃO A palavra “pretend” significa: A) pretender B) fingir C) planejar D) tentar Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>“Pretend” ≠ pretender. 5. QUESTÃO A palavra “pretend” significa: A) pretender B) fingir C) planejar D) tentar Gabarito: B`
    ],

    memorizacao: [
      'Cognatos verdadeiros',
      'Falsos cognatos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cognatos e falsos cognatos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cognatos verdadeiros',
            'Falsos cognatos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'estrategias-de-leitura': {
    slug: 'estrategias-de-leitura',
    resumo: `Técnicas para leitura rápida.`,

    explicacao: `<h2>📚 Estratégias de leitura</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Skimming</li>
      <li>Scanning</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Skimming: ideia geral Scanning: informação específica</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Buscar data ou nome no texto. 5. QUESTÃO Scanning é usado para: A) ler palavra por palavra B) identificar ideia geral C) localizar informações D) traduzir frases Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Buscar data ou nome no texto. 5. QUESTÃO Scanning é usado para: A) ler palavra por palavra B) identificar ideia geral C) localizar informações D) traduzir frases Gabarito: C`
    ],

    memorizacao: [
      'Skimming',
      'Scanning'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Estratégias de leitura',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Skimming',
            'Scanning'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'elementos-nao-verbais': {
    slug: 'elementos-nao-verbais',
    resumo: `Imagens ajudam na interpretação.`,

    explicacao: `<h2>📚 Elementos não verbais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Charges</li>
      <li>Tirinhas</li>
      <li>Cartazes</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Texto verbal + imagem constroem sentido.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge política → crítica social. 5. QUESTÃO A imagem no texto serve para: A) decorar B) confundir C) complementar o sentido D) substituir o texto Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge política → crítica social. 5. QUESTÃO A imagem no texto serve para: A) decorar B) confundir C) complementar o sentido D) substituir o texto Gabarito: C`
    ],

    memorizacao: [
      'Charges',
      'Tirinhas',
      'Cartazes'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Elementos não verbais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Charges',
            'Tirinhas',
            'Cartazes'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'temas-sociais-e-culturais': {
    slug: 'temas-sociais-e-culturais',
    resumo: `Textos ligados à sociedade.`,

    explicacao: `<h2>📚 Temas sociais e culturais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Meio ambiente</li>
      <li>Tecnologia</li>
      <li>Diversidade</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O ENEM prioriza temas atuais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre redes sociais. 5. QUESTÃO O ENEM privilegia textos sobre: A) literatura clássica B) temas sociais C) gramática avançada D) fonética Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre redes sociais. 5. QUESTÃO O ENEM privilegia textos sobre: A) literatura clássica B) temas sociais C) gramática avançada D) fonética Gabarito: B`
    ],

    memorizacao: [
      'Meio ambiente',
      'Tecnologia',
      'Diversidade'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Temas sociais e culturais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Meio ambiente',
            'Tecnologia',
            'Diversidade'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'ironia-e-humor-2': {
    slug: 'ironia-e-humor-2',
    resumo: `Uso de linguagem implícita.`,

    explicacao: `<h2>📚 Ironia e humor</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ironia</li>
      <li>Humor crítico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Nem tudo está dito explicitamente.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Tirinha humorística → crítica. 5. QUESTÃO A ironia ocorre quando: A) tudo é literal B) há contradição implícita C) o texto é técnico D) não há humor Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Tirinha humorística → crítica. 5. QUESTÃO A ironia ocorre quando: A) tudo é literal B) há contradição implícita C) o texto é técnico D) não há humor Gabarito: B`
    ],

    memorizacao: [
      'Ironia',
      'Humor crítico'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ironia e humor',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ironia',
            'Humor crítico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'uso-de-pronomes-e-conectivos': {
    slug: 'uso-de-pronomes-e-conectivos',
    resumo: `Coesão textual.`,

    explicacao: `<h2>📚 Uso de pronomes e conectivos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Pronomes</li>
      <li>Conectores</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Eles ligam ideias no texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Pronome “it” retoma termo anterior. 5. QUESTÃO Os pronomes servem para: A) decorar B) repetir palavras C) evitar repetições D) traduzir Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Pronome “it” retoma termo anterior. 5. QUESTÃO Os pronomes servem para: A) decorar B) repetir palavras C) evitar repetições D) traduzir Gabarito: C`
    ],

    memorizacao: [
      'Pronomes',
      'Conectores'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Uso de pronomes e conectivos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Pronomes',
            'Conectores'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'intencao-comunicativa': {
    slug: 'intencao-comunicativa',
    resumo: `Objetivo do autor.`,

    explicacao: `<h2>📚 Intenção comunicativa</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Informar</li>
      <li>Criticar</li>
      <li>Persuadir</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Identificar a finalidade do texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Editorial → opinião. 5. QUESTÃO A intenção do autor é: A) ensinar inglês B) expressar opinião C) listar palavras D) narrar ficção Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Editorial → opinião. 5. QUESTÃO A intenção do autor é: A) ensinar inglês B) expressar opinião C) listar palavras D) narrar ficção Gabarito: B`
    ],

    memorizacao: [
      'Informar',
      'Criticar',
      'Persuadir'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Intenção comunicativa',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Informar',
            'Criticar',
            'Persuadir'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};


// =====================================================
// ESPANHOL
// =====================================================

export const ESPANHOL_CONTEUDO: Record<string, ConteudoModulo> = {
'leitura-e-interpretacao-de-texto': {
    slug: 'leitura-e-interpretacao-de-texto',
    resumo: `No ENEM, espanhol é avaliado principalmente por interpretação textual.`,

    explicacao: `<h2>📚 Leitura e interpretação de texto</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Compreensão global</li>
      <li>Ideia central</li>
      <li>Inferência</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Não é tradução literal. O foco é entender o sentido geral do texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto jornalístico → identificar o tema principal. 5. QUESTÃO O objetivo principal do texto é: A) narrar uma história pessoal B) informar sobre um tema atual C) ensinar regras gramaticais D) convencer a comprar algo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto jornalístico → identificar o tema principal. 5. QUESTÃO O objetivo principal do texto é: A) narrar uma história pessoal B) informar sobre um tema atual C) ensinar regras gramaticais D) convencer a comprar algo Gabarito: B`
    ],

    memorizacao: [
      'Compreensão global',
      'Ideia central',
      'Inferência'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Leitura e interpretação de texto',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Compreensão global',
            'Ideia central',
            'Inferência'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cognatos-e-falsos-cognatos': {
    slug: 'cognatos-e-falsos-cognatos',
    resumo: `Palavras semelhantes ao português.`,

    explicacao: `<h2>📚 Cognatos e falsos cognatos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cognatos</li>
      <li>Falsos cognatos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cognatos ajudam na leitura; falsos cognatos podem confundir.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>“Embarazada” ≠ embaraçada (significa grávida). 5. QUESTÃO A palavra “embarazada” significa: A) envergonhada B) confusa C) grávida D) embaraçada Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>“Embarazada” ≠ embaraçada (significa grávida). 5. QUESTÃO A palavra “embarazada” significa: A) envergonhada B) confusa C) grávida D) embaraçada Gabarito: C`
    ],

    memorizacao: [
      'Cognatos',
      'Falsos cognatos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cognatos e falsos cognatos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cognatos',
            'Falsos cognatos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'generos-textuais': {
    slug: 'generos-textuais',
    resumo: `Tipos de textos mais usados no ENEM.`,

    explicacao: `<h2>📚 Gêneros textuais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Notícias</li>
      <li>Charges</li>
      <li>Propagandas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cada gênero possui uma intenção comunicativa.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge → crítica social. 5. QUESTÃO A principal função da charge é: A) informar B) narrar C) criticar D) instruir Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge → crítica social. 5. QUESTÃO A principal função da charge é: A) informar B) narrar C) criticar D) instruir Gabarito: C`
    ],

    memorizacao: [
      'Notícias',
      'Charges',
      'Propagandas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Gêneros textuais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Notícias',
            'Charges',
            'Propagandas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'vocabulario-contextual': {
    slug: 'vocabulario-contextual',
    resumo: `O significado depende do contexto.`,

    explicacao: `<h2>📚 Vocabulário contextual</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Palavras-chave</li>
      <li>Contexto textual</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A interpretação vem do texto, não do dicionário.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Palavra “taller” → oficina (no contexto). 5. QUESTÃO O significado correto depende: A) da tradução literal B) do contexto C) da gramática D) do tempo verbal Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Palavra “taller” → oficina (no contexto). 5. QUESTÃO O significado correto depende: A) da tradução literal B) do contexto C) da gramática D) do tempo verbal Gabarito: B`
    ],

    memorizacao: [
      'Palavras-chave',
      'Contexto textual'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Vocabulário contextual',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Palavras-chave',
            'Contexto textual'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'pronomes': {
    slug: 'pronomes',
    resumo: `Substituem nomes no texto.`,

    explicacao: `<h2>📚 Pronomes</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Él / Ella</li>
      <li>Nosotros</li>
      <li>Ellos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Garantem coesão textual.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Identificar o referente de “ellos”. 5. QUESTÃO O pronome “ellos” refere-se a: A) feminino singular B) masculino singular C) plural D) objeto Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Identificar o referente de “ellos”. 5. QUESTÃO O pronome “ellos” refere-se a: A) feminino singular B) masculino singular C) plural D) objeto Gabarito: C`
    ],

    memorizacao: [
      'Él / Ella',
      'Nosotros',
      'Ellos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Pronomes',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Él / Ella',
            'Nosotros',
            'Ellos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'tempos-verbais-nocoes': {
    slug: 'tempos-verbais-nocoes',
    resumo: `Reconhecimento dos tempos verbais.`,

    explicacao: `<h2>📚 Tempos verbais (noções)</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Presente</li>
      <li>Passado</li>
      <li>Futuro</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Indicam quando a ação ocorre.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Verbo no passado → ação concluída. 5. QUESTÃO O tempo verbal indica: A) sujeito B) ação no tempo C) objeto D) opinião Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Verbo no passado → ação concluída. 5. QUESTÃO O tempo verbal indica: A) sujeito B) ação no tempo C) objeto D) opinião Gabarito: B`
    ],

    memorizacao: [
      'Presente',
      'Passado',
      'Futuro'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Tempos verbais (noções)',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Presente',
            'Passado',
            'Futuro'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'conectores': {
    slug: 'conectores',
    resumo: `Ligam ideias no texto.`,

    explicacao: `<h2>📚 Conectores</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Pero</li>
      <li>Porque</li>
      <li>Sin embargo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Expressam oposição, causa ou consequência.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>“Pero” → contraste. 5. QUESTÃO O conector “porque” indica: A) oposição B) causa C) conclusão D) tempo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>“Pero” → contraste. 5. QUESTÃO O conector “porque” indica: A) oposição B) causa C) conclusão D) tempo Gabarito: B`
    ],

    memorizacao: [
      'Pero',
      'Porque',
      'Sin embargo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Conectores',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Pero',
            'Porque',
            'Sin embargo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'linguagem-verbal-e-nao-verbal': {
    slug: 'linguagem-verbal-e-nao-verbal',
    resumo: `Texto e imagem atuam juntos.`,

    explicacao: `<h2>📚 Linguagem verbal e não verbal</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Imagens</li>
      <li>Símbolos</li>
      <li>Ícones</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A imagem reforça o sentido do texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Cartaz → persuasão. 5. QUESTÃO A imagem serve para: A) enfeitar B) confundir C) reforçar a mensagem D) substituir o texto Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Cartaz → persuasão. 5. QUESTÃO A imagem serve para: A) enfeitar B) confundir C) reforçar a mensagem D) substituir o texto Gabarito: C`
    ],

    memorizacao: [
      'Imagens',
      'Símbolos',
      'Ícones'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Linguagem verbal e não verbal',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Imagens',
            'Símbolos',
            'Ícones'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'ironia-e-humor': {
    slug: 'ironia-e-humor',
    resumo: `Uso indireto da linguagem.`,

    explicacao: `<h2>📚 Ironia e humor</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ironia</li>
      <li>Humor crítico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O sentido não é literal.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge irônica → crítica social. 5. QUESTÃO A ironia ocorre quando: A) o texto é literal B) há exagero C) o sentido é invertido D) não há humor Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge irônica → crítica social. 5. QUESTÃO A ironia ocorre quando: A) o texto é literal B) há exagero C) o sentido é invertido D) não há humor Gabarito: C`
    ],

    memorizacao: [
      'Ironia',
      'Humor crítico'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ironia e humor',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ironia',
            'Humor crítico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'espanhol-e-america-latina': {
    slug: 'espanhol-e-america-latina',
    resumo: `Idioma e identidade cultural.`,

    explicacao: `<h2>📚 Espanhol e América Latina</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cultura latina</li>
      <li>Comunicação</li>
      <li>Integração regional</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O espanhol é língua majoritária na América Latina.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre cultura → identidade. 5. QUESTÃO O espanhol é importante porque: A) substitui o português B) facilita integração regional C) é mais fácil D) elimina outras línguas Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre cultura → identidade. 5. QUESTÃO O espanhol é importante porque: A) substitui o português B) facilita integração regional C) é mais fácil D) elimina outras línguas Gabarito: B`
    ],

    memorizacao: [
      'Cultura latina',
      'Comunicação',
      'Integração regional'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Espanhol e América Latina',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cultura latina',
            'Comunicação',
            'Integração regional'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'leitura-e-interpretacao-de-texto-2': {
    slug: 'leitura-e-interpretacao-de-texto-2',
    resumo: `No ENEM, o espanhol é cobrado quase exclusivamente por interpretação textual.`,

    explicacao: `<h2>📚 Leitura e interpretação de texto</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Compreensão global</li>
      <li>Ideia principal</li>
      <li>Inferência de sentido</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O foco não é traduzir palavra por palavra, mas entender a mensagem do texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto jornalístico → identificar a ideia central. 5. QUESTÃO O objetivo principal do texto é: A) narrar uma história fictícia B) informar um acontecimento C) ensinar regras gramaticais D) apresentar um poema Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto jornalístico → identificar a ideia central. 5. QUESTÃO O objetivo principal do texto é: A) narrar uma história fictícia B) informar um acontecimento C) ensinar regras gramaticais D) apresentar um poema Gabarito: B`
    ],

    memorizacao: [
      'Compreensão global',
      'Ideia principal',
      'Inferência de sentido'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Leitura e interpretação de texto',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Compreensão global',
            'Ideia principal',
            'Inferência de sentido'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'generos-textuais-2': {
    slug: 'generos-textuais-2',
    resumo: `Identificação do tipo de texto.`,

    explicacao: `<h2>📚 Gêneros textuais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Notícias</li>
      <li>Cartazes</li>
      <li>Charges</li>
      <li>Tirinhas</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Cada gênero possui uma função comunicativa.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Cartaz → convite ou alerta. 5. QUESTÃO Um cartaz tem como principal função: A) narrar fatos históricos B) informar ou alertar C) ensinar gramática D) contar uma história Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Cartaz → convite ou alerta. 5. QUESTÃO Um cartaz tem como principal função: A) narrar fatos históricos B) informar ou alertar C) ensinar gramática D) contar uma história Gabarito: B`
    ],

    memorizacao: [
      'Notícias',
      'Cartazes',
      'Charges',
      'Tirinhas'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Gêneros textuais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Notícias',
            'Cartazes',
            'Charges',
            'Tirinhas'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'vocabulario-contextualizado': {
    slug: 'vocabulario-contextualizado',
    resumo: `O significado das palavras depende do contexto.`,

    explicacao: `<h2>📚 Vocabulário contextualizado</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Palavras-chave</li>
      <li>Sentido contextual</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Mesmo sem conhecer todas as palavras, é possível compreender o texto.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Palavra “actualmente” → significa “atualmente”. 5. QUESTÃO O significado da palavra é determinado pelo: A) dicionário B) contexto C) tempo verbal D) gênero textual Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Palavra “actualmente” → significa “atualmente”. 5. QUESTÃO O significado da palavra é determinado pelo: A) dicionário B) contexto C) tempo verbal D) gênero textual Gabarito: B`
    ],

    memorizacao: [
      'Palavras-chave',
      'Sentido contextual'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Vocabulário contextualizado',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Palavras-chave',
            'Sentido contextual'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'cognatos-e-falsos-cognatos-2': {
    slug: 'cognatos-e-falsos-cognatos-2',
    resumo: `Palavras semelhantes ao português.`,

    explicacao: `<h2>📚 Cognatos e falsos cognatos</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Cognatos verdadeiros</li>
      <li>Falsos cognatos</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Falsos cognatos podem induzir ao erro.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>“Embarazada” ≠ envergonhada (significa grávida). 5. QUESTÃO A palavra “embarazada” significa: A) envergonhada B) confusa C) grávida D) cansada Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>“Embarazada” ≠ envergonhada (significa grávida). 5. QUESTÃO A palavra “embarazada” significa: A) envergonhada B) confusa C) grávida D) cansada Gabarito: C`
    ],

    memorizacao: [
      'Cognatos verdadeiros',
      'Falsos cognatos'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Cognatos e falsos cognatos',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Cognatos verdadeiros',
            'Falsos cognatos'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'estrategias-de-leitura': {
    slug: 'estrategias-de-leitura',
    resumo: `Técnicas para leitura eficiente.`,

    explicacao: `<h2>📚 Estratégias de leitura</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Skimming</li>
      <li>Scanning</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Skimming: leitura rápida para ideia geral Scanning: busca de informação específica</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Localizar datas ou nomes no texto. 5. QUESTÃO Scanning é usado para: A) entender tudo detalhadamente B) traduzir frases C) localizar informações D) analisar gramática Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Localizar datas ou nomes no texto. 5. QUESTÃO Scanning é usado para: A) entender tudo detalhadamente B) traduzir frases C) localizar informações D) analisar gramática Gabarito: C`
    ],

    memorizacao: [
      'Skimming',
      'Scanning'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Estratégias de leitura',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Skimming',
            'Scanning'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'elementos-nao-verbais': {
    slug: 'elementos-nao-verbais',
    resumo: `Imagens contribuem para o sentido.`,

    explicacao: `<h2>📚 Elementos não verbais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Charges</li>
      <li>Ilustrações</li>
      <li>Fotografias</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A imagem complementa o texto escrito.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Charge política → crítica social. 5. QUESTÃO A imagem no texto tem a função de: A) decorar B) substituir o texto C) reforçar a mensagem D) confundir o leitor Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Charge política → crítica social. 5. QUESTÃO A imagem no texto tem a função de: A) decorar B) substituir o texto C) reforçar a mensagem D) confundir o leitor Gabarito: C`
    ],

    memorizacao: [
      'Charges',
      'Ilustrações',
      'Fotografias'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Elementos não verbais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Charges',
            'Ilustrações',
            'Fotografias'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'temas-sociais-e-culturais': {
    slug: 'temas-sociais-e-culturais',
    resumo: `Textos sobre questões sociais.`,

    explicacao: `<h2>📚 Temas sociais e culturais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Meio ambiente</li>
      <li>Tecnologia</li>
      <li>Cultura</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O ENEM valoriza temas atuais.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Texto sobre redes sociais. 5. QUESTÃO Os textos do ENEM geralmente abordam: A) gramática avançada B) temas sociais C) literatura clássica D) fonética Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Texto sobre redes sociais. 5. QUESTÃO Os textos do ENEM geralmente abordam: A) gramática avançada B) temas sociais C) literatura clássica D) fonética Gabarito: B`
    ],

    memorizacao: [
      'Meio ambiente',
      'Tecnologia',
      'Cultura'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Temas sociais e culturais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Meio ambiente',
            'Tecnologia',
            'Cultura'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'ironia-e-critica-social': {
    slug: 'ironia-e-critica-social',
    resumo: `Sentido implícito do texto.`,

    explicacao: `<h2>📚 Ironia e crítica social</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Ironia</li>
      <li>Humor crítico</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O autor pode dizer algo querendo expressar o contrário.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Tirinha com crítica política. 5. QUESTÃO A ironia ocorre quando: A) tudo é literal B) há sentido implícito C) o texto é técnico D) não há humor Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Tirinha com crítica política. 5. QUESTÃO A ironia ocorre quando: A) tudo é literal B) há sentido implícito C) o texto é técnico D) não há humor Gabarito: B`
    ],

    memorizacao: [
      'Ironia',
      'Humor crítico'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Ironia e crítica social',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Ironia',
            'Humor crítico'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'conectores-e-pronomes': {
    slug: 'conectores-e-pronomes',
    resumo: `Coesão textual.`,

    explicacao: `<h2>📚 Conectores e pronomes</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Conectores</li>
      <li>Pronomes</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Ligam ideias e evitam repetições.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Pronome “lo” retoma um termo anterior. 5. QUESTÃO Os pronomes servem para: A) repetir palavras B) ligar ideias C) evitar repetições D) traduzir termos Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Pronome “lo” retoma um termo anterior. 5. QUESTÃO Os pronomes servem para: A) repetir palavras B) ligar ideias C) evitar repetições D) traduzir termos Gabarito: C`
    ],

    memorizacao: [
      'Conectores',
      'Pronomes'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Conectores e pronomes',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Conectores',
            'Pronomes'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'intencao-comunicativa': {
    slug: 'intencao-comunicativa',
    resumo: `Identificação do objetivo do autor.`,

    explicacao: `<h2>📚 Intenção comunicativa</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Informar</li>
      <li>Criticar</li>
      <li>Convencer</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Entender por que o texto foi escrito.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Editorial → opinião do autor. 5. QUESTÃO A intenção do autor é: A) ensinar espanhol B) expressar opinião C) narrar ficção D) listar palavras Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Editorial → opinião do autor. 5. QUESTÃO A intenção do autor é: A) ensinar espanhol B) expressar opinião C) narrar ficção D) listar palavras Gabarito: B`
    ],

    memorizacao: [
      'Informar',
      'Criticar',
      'Convencer'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Intenção comunicativa',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Informar',
            'Criticar',
            'Convencer'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};


// =====================================================
// ARTES
// =====================================================

export const ARTES_CONTEUDO: Record<string, ConteudoModulo> = {
'arte-e-linguagem': {
    slug: 'arte-e-linguagem',
    resumo: `A arte é uma forma de linguagem e expressão humana.`,

    explicacao: `<h2>📚 Arte e linguagem</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Linguagem artística</li>
      <li>Comunicação</li>
      <li>Expressão cultural</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A arte comunica ideias, emoções e visões de mundo por meio de símbolos.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Análise de imagem → interpretação simbólica. 5. QUESTÃO A arte pode ser entendida como: A) entretenimento apenas B) linguagem de expressão C) reprodução da realidade D) atividade técnica Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Análise de imagem → interpretação simbólica. 5. QUESTÃO A arte pode ser entendida como: A) entretenimento apenas B) linguagem de expressão C) reprodução da realidade D) atividade técnica Gabarito: B`
    ],

    memorizacao: [
      'Linguagem artística',
      'Comunicação',
      'Expressão cultural'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte e linguagem',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Linguagem artística',
            'Comunicação',
            'Expressão cultural'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'elementos-das-artes-visuais': {
    slug: 'elementos-das-artes-visuais',
    resumo: `Componentes básicos da arte visual.`,

    explicacao: `<h2>📚 Elementos das artes visuais</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Linha</li>
      <li>Forma</li>
      <li>Cor</li>
      <li>Textura</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Esses elementos estruturam imagens e obras artísticas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Obra abstrata → uso de formas e cores. 5. QUESTÃO A cor na arte pode transmitir: A) som B) emoção C) movimento físico D) texto Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Obra abstrata → uso de formas e cores. 5. QUESTÃO A cor na arte pode transmitir: A) som B) emoção C) movimento físico D) texto Gabarito: B`
    ],

    memorizacao: [
      'Linha',
      'Forma',
      'Cor',
      'Textura'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Elementos das artes visuais',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Linha',
            'Forma',
            'Cor',
            'Textura'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-na-pre-historia': {
    slug: 'arte-na-pre-historia',
    resumo: `Primeiras manifestações artísticas.`,

    explicacao: `<h2>📚 Arte na Pré-História</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Pinturas rupestres</li>
      <li>Função simbólica</li>
      <li>Ritual</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A arte tinha função comunicativa e ritualística.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Imagem de caverna → simbolismo. 5. QUESTÃO A arte rupestre estava relacionada a: A) decoração B) entretenimento C) rituais e sobrevivência D) comércio Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Imagem de caverna → simbolismo. 5. QUESTÃO A arte rupestre estava relacionada a: A) decoração B) entretenimento C) rituais e sobrevivência D) comércio Gabarito: C`
    ],

    memorizacao: [
      'Pinturas rupestres',
      'Função simbólica',
      'Ritual'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte na Pré-História',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Pinturas rupestres',
            'Função simbólica',
            'Ritual'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-na-antiguidade': {
    slug: 'arte-na-antiguidade',
    resumo: `Arte ligada à religião e poder.`,

    explicacao: `<h2>📚 Arte na Antiguidade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Egito</li>
      <li>Grécia</li>
      <li>Roma</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Valorização da proporção, beleza e representação do corpo.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Escultura grega → ideal de beleza. 5. QUESTÃO A arte grega valorizava principalmente: A) espiritualidade B) realismo simbólico C) proporção e harmonia D) abstração Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Escultura grega → ideal de beleza. 5. QUESTÃO A arte grega valorizava principalmente: A) espiritualidade B) realismo simbólico C) proporção e harmonia D) abstração Gabarito: C`
    ],

    memorizacao: [
      'Egito',
      'Grécia',
      'Roma'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte na Antiguidade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Egito',
            'Grécia',
            'Roma'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-medieval': {
    slug: 'arte-medieval',
    resumo: `Arte religiosa cristã.`,

    explicacao: `<h2>📚 Arte medieval</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Igrejas</li>
      <li>Ícones</li>
      <li>Simbolismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A função era ensinar a fé cristã.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Vitral → narrativa bíblica. 5. QUESTÃO A arte medieval tinha função: A) estética B) política C) educativa-religiosa D) científica Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Vitral → narrativa bíblica. 5. QUESTÃO A arte medieval tinha função: A) estética B) política C) educativa-religiosa D) científica Gabarito: C`
    ],

    memorizacao: [
      'Igrejas',
      'Ícones',
      'Simbolismo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte medieval',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Igrejas',
            'Ícones',
            'Simbolismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'renascimento-artistico': {
    slug: 'renascimento-artistico',
    resumo: `Valorização do ser humano.`,

    explicacao: `<h2>📚 Renascimento artístico</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Humanismo</li>
      <li>Perspectiva</li>
      <li>Realismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>O homem torna-se centro da arte.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Obra de Leonardo da Vinci → perspectiva. 5. QUESTÃO O Renascimento valorizava: A) teocentrismo B) antropocentrismo C) misticismo D) feudalismo Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Obra de Leonardo da Vinci → perspectiva. 5. QUESTÃO O Renascimento valorizava: A) teocentrismo B) antropocentrismo C) misticismo D) feudalismo Gabarito: B`
    ],

    memorizacao: [
      'Humanismo',
      'Perspectiva',
      'Realismo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Renascimento artístico',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Humanismo',
            'Perspectiva',
            'Realismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-moderna': {
    slug: 'arte-moderna',
    resumo: `Ruptura com padrões clássicos.`,

    explicacao: `<h2>📚 Arte moderna</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Impressionismo</li>
      <li>Cubismo</li>
      <li>Expressionismo</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>Busca por novas formas de expressão.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Obra cubista → múltiplos pontos de vista. 5. QUESTÃO A arte moderna caracteriza-se por: A) tradição rígida B) inovação C) religiosidade D) realismo absoluto Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Obra cubista → múltiplos pontos de vista. 5. QUESTÃO A arte moderna caracteriza-se por: A) tradição rígida B) inovação C) religiosidade D) realismo absoluto Gabarito: B`
    ],

    memorizacao: [
      'Impressionismo',
      'Cubismo',
      'Expressionismo'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte moderna',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Impressionismo',
            'Cubismo',
            'Expressionismo'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-contemporanea': {
    slug: 'arte-contemporanea',
    resumo: `Arte ligada ao cotidiano.`,

    explicacao: `<h2>📚 Arte contemporânea</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Performance</li>
      <li>Instalação</li>
      <li>Arte conceitual</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A ideia pode ser mais importante que a obra.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Instalação artística → reflexão social. 5. QUESTÃO Na arte contemporânea, valoriza-se: A) técnica clássica B) ideia e conceito C) simetria D) tradição Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Instalação artística → reflexão social. 5. QUESTÃO Na arte contemporânea, valoriza-se: A) técnica clássica B) ideia e conceito C) simetria D) tradição Gabarito: B`
    ],

    memorizacao: [
      'Performance',
      'Instalação',
      'Arte conceitual'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte contemporânea',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Performance',
            'Instalação',
            'Arte conceitual'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-e-tecnologia': {
    slug: 'arte-e-tecnologia',
    resumo: `Uso de meios digitais.`,

    explicacao: `<h2>📚 Arte e tecnologia</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Arte digital</li>
      <li>Vídeo</li>
      <li>Multimídia</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A tecnologia amplia possibilidades criativas.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Arte digital → interação. 5. QUESTÃO A tecnologia na arte permite: A) limitação criativa B) padronização C) novas linguagens D) repetição Gabarito: C</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Arte digital → interação. 5. QUESTÃO A tecnologia na arte permite: A) limitação criativa B) padronização C) novas linguagens D) repetição Gabarito: C`
    ],

    memorizacao: [
      'Arte digital',
      'Vídeo',
      'Multimídia'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte e tecnologia',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Arte digital',
            'Vídeo',
            'Multimídia'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  },

  'arte-e-sociedade': {
    slug: 'arte-e-sociedade',
    resumo: `A arte reflete contextos sociais.`,

    explicacao: `<h2>📚 Arte e sociedade</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      <li>Crítica social</li>
      <li>Identidade</li>
      <li>Cultura</li>
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>A arte pode questionar a realidade.</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>Grafite → crítica urbana. 5. QUESTÃO A arte pode ser usada para: A) decorar ambientes B) expressar críticas sociais C) copiar estilos D) apenas entreter Gabarito: B</p>`,

    exemplos: [
      `<strong>Contexto ENEM:</strong><br>Grafite → crítica urbana. 5. QUESTÃO A arte pode ser usada para: A) decorar ambientes B) expressar críticas sociais C) copiar estilos D) apenas entreter Gabarito: B`
    ],

    memorizacao: [
      'Crítica social',
      'Identidade',
      'Cultura'
    ],

    errosComuns: [],

    questoesResolvidas: [],

    questoesEnem: [],

    mapaMental: {
      titulo: 'Arte e sociedade',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            'Crítica social',
            'Identidade',
            'Cultura'
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: []
    }
  }
};

