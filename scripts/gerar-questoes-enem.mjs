/**
 * Gerador de Questões ENEM de Alta Qualidade
 *
 * Gera questões contextualizadas seguindo o padrão real do ENEM:
 * - Situações do cotidiano
 * - Dados realistas
 * - Distratores inteligentes
 * - Competências e habilidades alinhadas
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// TEMPLATES DE MATEMÁTICA
// ============================================================================

const MATEMATICA_TEMPLATES = [
  // PORCENTAGEM E FINANÇAS
  {
    tipo: 'porcentagem_desconto',
    gerar: () => {
      const produtos = ['televisor', 'smartphone', 'notebook', 'geladeira', 'sofá', 'bicicleta', 'ar-condicionado'];
      const produto = produtos[Math.floor(Math.random() * produtos.length)];
      const precoOriginal = Math.floor(Math.random() * 4000) + 500;
      const desconto = [10, 15, 20, 25, 30, 35][Math.floor(Math.random() * 6)];
      const precoFinal = precoOriginal * (1 - desconto/100);

      const alternativas = [
        precoFinal,
        precoOriginal * (1 - (desconto-5)/100),
        precoOriginal * (1 - (desconto+5)/100),
        precoOriginal - desconto,
        precoOriginal * desconto / 100
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `Uma loja de eletrodomésticos está com promoção de ${desconto}% de desconto em todos os produtos. Maria deseja comprar um ${produto} que, antes da promoção, custava R$ ${precoOriginal.toFixed(2).replace('.', ',')}. Qual será o valor que Maria pagará pelo ${produto} com o desconto?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H4',
        competencia: 1
      };
    }
  },
  {
    tipo: 'juros_simples',
    gerar: () => {
      const capital = [1000, 2000, 5000, 10000][Math.floor(Math.random() * 4)];
      const taxa = [0.5, 1, 1.5, 2, 2.5][Math.floor(Math.random() * 5)];
      const meses = [6, 12, 18, 24][Math.floor(Math.random() * 4)];
      const juros = capital * (taxa/100) * meses;
      const montante = capital + juros;

      const alternativas = [
        montante,
        capital + (capital * taxa/100),
        capital * Math.pow(1 + taxa/100, meses),
        capital + juros/2,
        capital * (1 + taxa*meses/100/2)
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `João aplicou R$ ${capital.toFixed(2).replace('.', ',')} em uma caderneta de poupança que rende ${taxa.toString().replace('.', ',')}% ao mês em regime de juros simples. Após ${meses} meses, qual será o montante acumulado por João?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H21',
        competencia: 3
      };
    }
  },
  {
    tipo: 'juros_compostos',
    gerar: () => {
      const capital = [1000, 2000, 5000][Math.floor(Math.random() * 3)];
      const taxa = [5, 10, 20][Math.floor(Math.random() * 3)];
      const anos = [2, 3][Math.floor(Math.random() * 2)];
      const montante = capital * Math.pow(1 + taxa/100, anos);

      const alternativas = [
        montante,
        capital * (1 + taxa*anos/100),
        capital + (capital * taxa/100 * anos),
        capital * Math.pow(1 + taxa/100, anos-1),
        capital * Math.pow(1 + taxa/100, anos+1)
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `Uma aplicação financeira rende ${taxa}% ao ano em regime de juros compostos. Se uma pessoa aplicar R$ ${capital.toFixed(2).replace('.', ',')} nessa aplicação, qual será o montante após ${anos} anos?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H21',
        competencia: 3
      };
    }
  },

  // GEOMETRIA
  {
    tipo: 'area_terreno',
    gerar: () => {
      const largura = Math.floor(Math.random() * 20) + 10;
      const comprimento = Math.floor(Math.random() * 30) + 20;
      const area = largura * comprimento;

      const alternativas = [
        `${area} m²`,
        `${area + largura} m²`,
        `${area - comprimento} m²`,
        `${2*(largura + comprimento)} m²`,
        `${largura + comprimento} m²`
      ];

      return {
        enunciado: `Um terreno retangular tem ${largura} metros de largura e ${comprimento} metros de comprimento. O proprietário deseja cercá-lo e precisa saber a área total do terreno para calcular a quantidade de grama necessária. Qual é a área desse terreno?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H6',
        competencia: 2
      };
    }
  },
  {
    tipo: 'volume_caixa_dagua',
    gerar: () => {
      const raio = [1, 1.5, 2, 2.5][Math.floor(Math.random() * 4)];
      const altura = [2, 2.5, 3, 3.5][Math.floor(Math.random() * 4)];
      const volume = Math.PI * raio * raio * altura;
      const volumeLitros = volume * 1000;

      const alternativas = [
        Math.round(volumeLitros),
        Math.round(volumeLitros * 1.2),
        Math.round(volumeLitros * 0.8),
        Math.round(Math.PI * raio * altura * 1000),
        Math.round(2 * Math.PI * raio * raio * altura * 1000)
      ].map(v => `${v} litros`);

      return {
        enunciado: `Uma caixa d'água cilíndrica tem raio da base igual a ${raio.toString().replace('.', ',')} m e altura de ${altura.toString().replace('.', ',')} m. Considerando π = 3,14, qual é a capacidade máxima dessa caixa d'água, em litros?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H7',
        competencia: 2
      };
    }
  },
  {
    tipo: 'escala_mapa',
    gerar: () => {
      const distanciaReal = [50, 100, 150, 200, 250][Math.floor(Math.random() * 5)];
      const escala = [50000, 100000, 200000, 500000][Math.floor(Math.random() * 4)];
      const distanciaMapa = distanciaReal * 100000 / escala;

      const alternativas = [
        distanciaMapa,
        distanciaMapa * 2,
        distanciaMapa / 2,
        distanciaReal / (escala/1000),
        distanciaReal * escala / 1000000
      ].map(v => `${v.toFixed(1).replace('.', ',')} cm`);

      return {
        enunciado: `Em um mapa com escala 1:${escala.toLocaleString('pt-BR')}, a distância real entre duas cidades é de ${distanciaReal} km. Qual é a distância, em centímetros, entre essas duas cidades no mapa?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H8',
        competencia: 2
      };
    }
  },

  // ESTATÍSTICA
  {
    tipo: 'media_notas',
    gerar: () => {
      const notas = Array.from({length: 5}, () => Math.floor(Math.random() * 5) + 5);
      const media = notas.reduce((a, b) => a + b) / notas.length;

      const alternativas = [
        media.toFixed(1),
        (media + 0.5).toFixed(1),
        (media - 0.5).toFixed(1),
        notas[Math.floor(notas.length/2)].toFixed(1),
        ((notas[0] + notas[notas.length-1])/2).toFixed(1)
      ];

      return {
        enunciado: `Um estudante obteve as seguintes notas nas cinco provas do bimestre: ${notas.join(', ')}. Para ser aprovado, ele precisa ter média aritmética igual ou superior a 7,0. Qual foi a média obtida por esse estudante?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H27',
        competencia: 6
      };
    }
  },
  {
    tipo: 'probabilidade',
    gerar: () => {
      const totalBolas = Math.floor(Math.random() * 10) + 10;
      const bolasVermelhas = Math.floor(Math.random() * (totalBolas - 5)) + 3;
      const prob = bolasVermelhas / totalBolas;

      const alternativas = [
        `${bolasVermelhas}/${totalBolas}`,
        `${bolasVermelhas}/${totalBolas - bolasVermelhas}`,
        `${totalBolas - bolasVermelhas}/${totalBolas}`,
        `${bolasVermelhas - 1}/${totalBolas}`,
        `${bolasVermelhas + 1}/${totalBolas}`
      ];

      return {
        enunciado: `Uma urna contém ${totalBolas} bolas, sendo ${bolasVermelhas} vermelhas e ${totalBolas - bolasVermelhas} azuis. Ao retirar uma bola aleatoriamente, qual é a probabilidade de ela ser vermelha?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H28',
        competencia: 7
      };
    }
  },

  // FUNÇÕES
  {
    tipo: 'funcao_primeiro_grau_contexto',
    gerar: () => {
      const taxaFixa = [30, 40, 50, 60][Math.floor(Math.random() * 4)];
      const taxaKm = [2, 2.5, 3, 3.5, 4][Math.floor(Math.random() * 5)];
      const km = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
      const valorTotal = taxaFixa + taxaKm * km;

      const alternativas = [
        valorTotal,
        taxaFixa + taxaKm,
        taxaKm * km,
        taxaFixa * km,
        valorTotal + taxaFixa
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `Uma empresa de táxi cobra uma taxa fixa de R$ ${taxaFixa.toFixed(2).replace('.', ',')} mais R$ ${taxaKm.toFixed(2).replace('.', ',')} por quilômetro rodado. Se um passageiro percorrer ${km} km, quanto pagará pela corrida?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H23',
        competencia: 5
      };
    }
  },
  {
    tipo: 'funcao_segundo_grau_contexto',
    gerar: () => {
      const alturaInicial = [0, 1, 2][Math.floor(Math.random() * 3)];
      const velocidadeInicial = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
      const g = 10;
      const tMax = velocidadeInicial / g;
      const hMax = alturaInicial + (velocidadeInicial * velocidadeInicial) / (2 * g);

      const alternativas = [
        hMax.toFixed(1),
        (hMax + 2).toFixed(1),
        (hMax - 2).toFixed(1),
        (velocidadeInicial).toFixed(1),
        (alturaInicial + velocidadeInicial).toFixed(1)
      ].map(v => `${v.replace('.', ',')} m`);

      return {
        enunciado: `Uma bola é lançada verticalmente para cima, a partir de uma altura de ${alturaInicial} m do solo, com velocidade inicial de ${velocidadeInicial} m/s. Considerando g = 10 m/s² e desprezando a resistência do ar, qual é a altura máxima atingida pela bola em relação ao solo?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H24',
        competencia: 5
      };
    }
  },

  // PROGRESSÕES
  {
    tipo: 'pa_contexto',
    gerar: () => {
      const salarioInicial = [1500, 2000, 2500, 3000][Math.floor(Math.random() * 4)];
      const aumento = [100, 150, 200, 250][Math.floor(Math.random() * 4)];
      const anos = [5, 6, 7, 8][Math.floor(Math.random() * 4)];
      const salarioFinal = salarioInicial + (anos - 1) * aumento;

      const alternativas = [
        salarioFinal,
        salarioInicial + anos * aumento,
        salarioInicial * anos,
        salarioInicial + aumento,
        salarioFinal + aumento
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `Uma empresa oferece um plano de carreira em que o funcionário começa ganhando R$ ${salarioInicial.toFixed(2).replace('.', ',')} e recebe um aumento anual fixo de R$ ${aumento.toFixed(2).replace('.', ',')}. Qual será o salário desse funcionário no ${anos}º ano de trabalho?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H22',
        competencia: 4
      };
    }
  },
  {
    tipo: 'pg_contexto',
    gerar: () => {
      const valorInicial = [1000, 2000, 5000][Math.floor(Math.random() * 3)];
      const razao = [1.1, 1.2, 1.5, 2][Math.floor(Math.random() * 4)];
      const termos = [3, 4, 5][Math.floor(Math.random() * 3)];
      const valorFinal = valorInicial * Math.pow(razao, termos - 1);

      const alternativas = [
        Math.round(valorFinal),
        Math.round(valorInicial * razao * termos),
        Math.round(valorInicial + razao * (termos - 1)),
        Math.round(valorFinal * razao),
        Math.round(valorFinal / razao)
      ].map(v => `${v}`);

      return {
        enunciado: `Uma colônia de bactérias tinha inicialmente ${valorInicial} indivíduos. A cada hora, a população é multiplicada por ${razao.toString().replace('.', ',')}. Quantas bactérias haverá após ${termos - 1} horas?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H22',
        competencia: 4
      };
    }
  },

  // RAZÃO E PROPORÇÃO
  {
    tipo: 'regra_de_tres',
    gerar: () => {
      const trabalhadores1 = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
      const dias1 = [10, 12, 15, 20][Math.floor(Math.random() * 4)];
      const trabalhadores2 = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
      const dias2 = (trabalhadores1 * dias1) / trabalhadores2;

      const alternativas = [
        dias2,
        dias2 + 2,
        dias2 - 2,
        dias1,
        (trabalhadores2 * dias1) / trabalhadores1
      ].map(v => `${Math.round(v)} dias`);

      return {
        enunciado: `Uma construtora precisa terminar uma obra. Com ${trabalhadores1} trabalhadores, a obra seria concluída em ${dias1} dias. Se a construtora contratar mais funcionários, totalizando ${trabalhadores2} trabalhadores, em quantos dias a obra será concluída, mantendo o mesmo ritmo de trabalho?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H19',
        competencia: 3
      };
    }
  },

  // ANÁLISE COMBINATÓRIA
  {
    tipo: 'arranjo_senha',
    gerar: () => {
      const digitos = [4, 5, 6][Math.floor(Math.random() * 3)];
      const repeticao = Math.random() > 0.5;
      let total;

      if (repeticao) {
        total = Math.pow(10, digitos);
      } else {
        total = 1;
        for (let i = 0; i < digitos; i++) {
          total *= (10 - i);
        }
      }

      const alternativas = [
        total,
        total * 2,
        total / 2,
        Math.pow(10, digitos - 1),
        Math.pow(digitos, 10)
      ].map(v => Math.round(v).toLocaleString('pt-BR'));

      const textoRepeticao = repeticao ? 'podendo repetir algarismos' : 'sem repetir algarismos';

      return {
        enunciado: `Um sistema de segurança utiliza senhas numéricas de ${digitos} dígitos, ${textoRepeticao}. Quantas senhas diferentes podem ser formadas nesse sistema?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H3',
        competencia: 1
      };
    }
  },

  // TRIGONOMETRIA
  {
    tipo: 'trigonometria_altura',
    gerar: () => {
      const distancia = [20, 30, 40, 50][Math.floor(Math.random() * 4)];
      const angulo = [30, 45, 60][Math.floor(Math.random() * 3)];
      const tangentes = { 30: Math.sqrt(3)/3, 45: 1, 60: Math.sqrt(3) };
      const altura = distancia * tangentes[angulo];

      const alternativas = [
        altura,
        altura * 1.5,
        altura * 0.7,
        distancia,
        distancia / 2
      ].map(v => `${v.toFixed(1).replace('.', ',')} m`);

      return {
        enunciado: `Um observador está a ${distancia} metros de distância da base de uma torre. O ângulo de elevação do topo da torre, em relação à posição do observador, é de ${angulo}°. Considerando que a altura dos olhos do observador é desprezível, qual é a altura aproximada da torre? (Use: tg 30° ≈ 0,58; tg 45° = 1; tg 60° ≈ 1,73)`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H9',
        competencia: 2
      };
    }
  }
];

// ============================================================================
// TEMPLATES DE CIÊNCIAS DA NATUREZA
// ============================================================================

const CIENCIAS_NATUREZA_TEMPLATES = [
  // FÍSICA - MECÂNICA
  {
    tipo: 'velocidade_media',
    gerar: () => {
      const distancia = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)];
      const tempo = [2, 2.5, 3, 4, 5][Math.floor(Math.random() * 5)];
      const velocidade = distancia / tempo;

      const alternativas = [
        velocidade,
        velocidade * 1.2,
        velocidade * 0.8,
        distancia + tempo,
        distancia * tempo
      ].map(v => `${v.toFixed(0)} km/h`);

      return {
        enunciado: `Um carro percorreu ${distancia} km em ${tempo.toString().replace('.', ',')} horas. Qual foi a velocidade média desse carro durante o percurso?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H17',
        competencia: 5,
        disciplina: 'fisica'
      };
    }
  },
  {
    tipo: 'mru',
    gerar: () => {
      const velocidade = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
      const tempo = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      const distancia = velocidade * tempo;

      const alternativas = [
        distancia,
        distancia + velocidade,
        velocidade * tempo / 2,
        velocidade + tempo,
        distancia * 2
      ].map(v => `${v} m`);

      return {
        enunciado: `Um ciclista mantém velocidade constante de ${velocidade} m/s durante ${tempo} segundos. Qual é a distância percorrida pelo ciclista nesse intervalo de tempo?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H17',
        competencia: 5,
        disciplina: 'fisica'
      };
    }
  },
  {
    tipo: 'mruv_queda_livre',
    gerar: () => {
      const altura = [20, 45, 80, 125][Math.floor(Math.random() * 4)];
      const g = 10;
      const tempo = Math.sqrt(2 * altura / g);

      const alternativas = [
        tempo,
        tempo * 1.5,
        tempo * 0.7,
        altura / g,
        Math.sqrt(altura)
      ].map(v => `${v.toFixed(0)} s`);

      return {
        enunciado: `Um objeto é abandonado do repouso de uma altura de ${altura} metros. Considerando g = 10 m/s² e desprezando a resistência do ar, qual é o tempo aproximado de queda até atingir o solo?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H17',
        competencia: 5,
        disciplina: 'fisica'
      };
    }
  },
  {
    tipo: 'forca_peso',
    gerar: () => {
      const massa = [50, 60, 70, 80, 90][Math.floor(Math.random() * 5)];
      const g = 10;
      const peso = massa * g;

      const alternativas = [
        peso,
        massa,
        peso + massa,
        peso / 2,
        massa * g * g
      ].map(v => `${v} N`);

      return {
        enunciado: `Uma pessoa tem massa de ${massa} kg. Considerando a aceleração da gravidade igual a 10 m/s², qual é o peso dessa pessoa?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H18',
        competencia: 6,
        disciplina: 'fisica'
      };
    }
  },
  {
    tipo: 'energia_cinetica',
    gerar: () => {
      const massa = [2, 4, 5, 10][Math.floor(Math.random() * 4)];
      const velocidade = [4, 5, 6, 10][Math.floor(Math.random() * 4)];
      const ec = 0.5 * massa * velocidade * velocidade;

      const alternativas = [
        ec,
        massa * velocidade,
        massa * velocidade * velocidade,
        ec * 2,
        ec / 2
      ].map(v => `${v} J`);

      return {
        enunciado: `Um corpo de massa ${massa} kg move-se com velocidade de ${velocidade} m/s. Qual é a energia cinética desse corpo?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H20',
        competencia: 6,
        disciplina: 'fisica'
      };
    }
  },

  // FÍSICA - ELETRICIDADE
  {
    tipo: 'lei_ohm',
    gerar: () => {
      const tensao = [12, 24, 36, 48, 120, 220][Math.floor(Math.random() * 6)];
      const resistencia = [4, 6, 8, 10, 12][Math.floor(Math.random() * 5)];
      const corrente = tensao / resistencia;

      const alternativas = [
        corrente,
        tensao * resistencia,
        tensao + resistencia,
        corrente * 2,
        tensao / (resistencia * 2)
      ].map(v => `${v.toFixed(1)} A`);

      return {
        enunciado: `Um resistor de ${resistencia} Ω é submetido a uma tensão de ${tensao} V. Qual é a intensidade da corrente elétrica que atravessa esse resistor?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H21',
        competencia: 6,
        disciplina: 'fisica'
      };
    }
  },
  {
    tipo: 'potencia_eletrica',
    gerar: () => {
      const potencia = [100, 150, 200, 500, 1000, 1500][Math.floor(Math.random() * 6)];
      const horas = [2, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
      const dias = [15, 20, 30][Math.floor(Math.random() * 3)];
      const consumoKwh = (potencia * horas * dias) / 1000;
      const tarifa = 0.50;
      const custo = consumoKwh * tarifa;

      const alternativas = [
        custo,
        custo * 1.2,
        custo * 0.8,
        potencia * horas * dias / 100,
        consumoKwh
      ].map(v => `R$ ${v.toFixed(2).replace('.', ',')}`);

      return {
        enunciado: `Um chuveiro elétrico de ${potencia} W é utilizado durante ${horas} horas por dia, em média. Se a tarifa de energia é R$ 0,50 por kWh, qual será o custo mensal (${dias} dias) do uso desse chuveiro?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H21',
        competencia: 6,
        disciplina: 'fisica'
      };
    }
  },

  // QUÍMICA
  {
    tipo: 'concentracao_solucao',
    gerar: () => {
      const massa = [20, 30, 40, 50, 60][Math.floor(Math.random() * 5)];
      const volume = [200, 250, 400, 500][Math.floor(Math.random() * 4)];
      const concentracao = massa / volume * 1000; // g/L

      const alternativas = [
        concentracao,
        massa / volume,
        concentracao * 2,
        concentracao / 2,
        massa + volume
      ].map(v => `${v.toFixed(0)} g/L`);

      return {
        enunciado: `Uma solução foi preparada dissolvendo-se ${massa} g de cloreto de sódio (NaCl) em água suficiente para completar ${volume} mL de solução. Qual é a concentração dessa solução em g/L?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H24',
        competencia: 7,
        disciplina: 'quimica'
      };
    }
  },
  {
    tipo: 'ph_solucao',
    gerar: () => {
      const concentracao = [0.001, 0.0001, 0.00001][Math.floor(Math.random() * 3)];
      const pH = -Math.log10(concentracao);

      const alternativas = [
        pH,
        pH + 1,
        pH - 1,
        14 - pH,
        pH * 2
      ].map(v => v.toFixed(0));

      const concStr = concentracao === 0.001 ? '10⁻³' : concentracao === 0.0001 ? '10⁻⁴' : '10⁻⁵';

      return {
        enunciado: `Uma solução aquosa de ácido clorídrico (HCl) tem concentração de íons H⁺ igual a ${concStr} mol/L. Qual é o pH dessa solução?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H24',
        competencia: 7,
        disciplina: 'quimica'
      };
    }
  },
  {
    tipo: 'balanceamento',
    gerar: () => {
      const reacoes = [
        { eq: 'Fe + O₂ → Fe₂O₃', coef: [4, 3, 2] },
        { eq: 'H₂ + O₂ → H₂O', coef: [2, 1, 2] },
        { eq: 'N₂ + H₂ → NH₃', coef: [1, 3, 2] },
        { eq: 'C + O₂ → CO₂', coef: [1, 1, 1] }
      ];
      const reacao = reacoes[Math.floor(Math.random() * reacoes.length)];
      const soma = reacao.coef.reduce((a, b) => a + b);

      const alternativas = [
        soma,
        soma + 1,
        soma - 1,
        soma + 2,
        reacao.coef[0] + reacao.coef[1]
      ].map(v => v.toString());

      return {
        enunciado: `Considere a equação química não balanceada: ${reacao.eq}. Após o balanceamento correto, qual é a soma dos menores coeficientes inteiros?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H25',
        competencia: 7,
        disciplina: 'quimica'
      };
    }
  },

  // BIOLOGIA
  {
    tipo: 'genetica_primeira_lei',
    gerar: () => {
      const caracteristicas = [
        { dominante: 'sementes amarelas', recessivo: 'sementes verdes', gene: 'A' },
        { dominante: 'flores púrpuras', recessivo: 'flores brancas', gene: 'P' },
        { dominante: 'caule alto', recessivo: 'caule baixo', gene: 'T' }
      ];
      const carac = caracteristicas[Math.floor(Math.random() * caracteristicas.length)];

      // Cruzamento Aa x Aa
      const alternativas = [
        '3:1',
        '1:1',
        '1:2:1',
        '9:3:3:1',
        '1:3'
      ];

      return {
        enunciado: `Em ervilhas, o alelo para ${carac.dominante} (${carac.gene}) é dominante sobre o alelo para ${carac.recessivo} (${carac.gene.toLowerCase()}). Ao cruzar duas plantas heterozigotas (${carac.gene}${carac.gene.toLowerCase()}), qual é a proporção fenotípica esperada na prole?`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H15',
        competencia: 4,
        disciplina: 'biologia'
      };
    }
  },
  {
    tipo: 'ecologia_cadeia',
    gerar: () => {
      const cadeias = [
        'capim → gafanhoto → sapo → cobra → gavião',
        'algas → peixes pequenos → peixes grandes → tubarão',
        'folhas → lagarta → pássaro → gavião'
      ];
      const cadeia = cadeias[Math.floor(Math.random() * cadeias.length)];

      const alternativas = [
        'consumidor terciário',
        'produtor',
        'consumidor primário',
        'consumidor secundário',
        'decompositor'
      ];

      return {
        enunciado: `Na cadeia alimentar "${cadeia}", o último organismo é classificado como:`,
        alternativas: shuffle(alternativas),
        correta: alternativas[0],
        habilidade: 'H28',
        competencia: 8,
        disciplina: 'biologia'
      };
    }
  },
  {
    tipo: 'celula_organelas',
    gerar: () => {
      const organelas = [
        { nome: 'mitocôndria', funcao: 'respiração celular e produção de ATP' },
        { nome: 'ribossomo', funcao: 'síntese de proteínas' },
        { nome: 'complexo de Golgi', funcao: 'modificação e endereçamento de proteínas' },
        { nome: 'lisossomo', funcao: 'digestão intracelular' }
      ];
      const organela = organelas[Math.floor(Math.random() * organelas.length)];

      const alternativas = organelas.map(o => o.nome);
      alternativas.push('nucléolo');

      return {
        enunciado: `Qual organela celular é responsável pela ${organela.funcao}?`,
        alternativas: shuffle(alternativas).slice(0, 5),
        correta: organela.nome,
        habilidade: 'H14',
        competencia: 4,
        disciplina: 'biologia'
      };
    }
  }
];

// ============================================================================
// TEMPLATES DE CIÊNCIAS HUMANAS
// ============================================================================

const CIENCIAS_HUMANAS_TEMPLATES = [
  // HISTÓRIA
  {
    tipo: 'revolucao_industrial',
    gerar: () => {
      return {
        enunciado: `A Revolução Industrial, iniciada na Inglaterra no século XVIII, provocou profundas transformações sociais e econômicas. Entre as consequências desse processo, pode-se destacar:`,
        alternativas: shuffle([
          'o êxodo rural e o crescimento desordenado das cidades industriais',
          'a melhoria imediata das condições de trabalho nas fábricas',
          'a diminuição da produção de bens de consumo',
          'o fortalecimento das corporações de ofício medievais',
          'a redução das desigualdades sociais na Europa'
        ]),
        correta: 'o êxodo rural e o crescimento desordenado das cidades industriais',
        habilidade: 'H7',
        competencia: 2,
        disciplina: 'historia'
      };
    }
  },
  {
    tipo: 'era_vargas',
    gerar: () => {
      return {
        enunciado: `O período conhecido como Era Vargas (1930-1945) foi marcado por significativas transformações no Brasil. Uma característica do Estado Novo (1937-1945) foi:`,
        alternativas: shuffle([
          'a centralização política e o autoritarismo com censura aos meios de comunicação',
          'a ampla liberdade de imprensa e organização partidária',
          'a realização de eleições diretas para todos os cargos',
          'a adoção do parlamentarismo como sistema de governo',
          'a descentralização administrativa com autonomia para os estados'
        ]),
        correta: 'a centralização política e o autoritarismo com censura aos meios de comunicação',
        habilidade: 'H11',
        competencia: 3,
        disciplina: 'historia'
      };
    }
  },
  {
    tipo: 'guerra_fria',
    gerar: () => {
      return {
        enunciado: `A Guerra Fria foi um período de tensão geopolítica entre os Estados Unidos e a União Soviética após a Segunda Guerra Mundial. Sobre esse período, é correto afirmar que:`,
        alternativas: shuffle([
          'caracterizou-se pela disputa ideológica sem confronto militar direto entre as superpotências',
          'envolveu batalhas constantes entre americanos e soviéticos na Europa',
          'resultou na unificação da Alemanha imediatamente após 1945',
          'foi marcada pela cooperação econômica entre capitalistas e socialistas',
          'teve seu fim com a vitória militar dos Estados Unidos sobre a URSS'
        ]),
        correta: 'caracterizou-se pela disputa ideológica sem confronto militar direto entre as superpotências',
        habilidade: 'H8',
        competencia: 2,
        disciplina: 'historia'
      };
    }
  },

  // GEOGRAFIA
  {
    tipo: 'urbanizacao_brasil',
    gerar: () => {
      return {
        enunciado: `O processo de urbanização brasileiro, intensificado a partir da segunda metade do século XX, gerou diversas transformações no espaço geográfico. Uma consequência desse processo foi:`,
        alternativas: shuffle([
          'a formação de periferias com infraestrutura precária e ocupações irregulares',
          'a distribuição equilibrada da população por todo o território nacional',
          'a redução dos problemas ambientais nas grandes metrópoles',
          'o fim do êxodo rural e estabilização da população do campo',
          'a diminuição das desigualdades socioespaciais nas cidades'
        ]),
        correta: 'a formação de periferias com infraestrutura precária e ocupações irregulares',
        habilidade: 'H21',
        competencia: 6,
        disciplina: 'geografia'
      };
    }
  },
  {
    tipo: 'biomas_brasil',
    gerar: () => {
      const biomas = [
        { nome: 'Cerrado', caracteristica: 'apresenta vegetação de savana com árvores de troncos retorcidos e cascas grossas' },
        { nome: 'Caatinga', caracteristica: 'possui plantas adaptadas à seca, como cactos e árvores que perdem folhas na estiagem' },
        { nome: 'Mata Atlântica', caracteristica: 'é uma floresta tropical úmida que originalmente cobria a costa brasileira' },
        { nome: 'Pampa', caracteristica: 'caracteriza-se por campos nativos com gramíneas, localizado no sul do país' }
      ];
      const bioma = biomas[Math.floor(Math.random() * biomas.length)];

      return {
        enunciado: `Este bioma brasileiro ${bioma.caracteristica}. Estamos nos referindo ao:`,
        alternativas: shuffle(biomas.map(b => b.nome).concat(['Pantanal'])).slice(0, 5),
        correta: bioma.nome,
        habilidade: 'H26',
        competencia: 6,
        disciplina: 'geografia'
      };
    }
  },
  {
    tipo: 'globalizacao',
    gerar: () => {
      return {
        enunciado: `A globalização é um processo de integração mundial que se intensificou nas últimas décadas. Uma característica desse fenômeno é:`,
        alternativas: shuffle([
          'a intensificação dos fluxos de capitais, mercadorias e informações entre países',
          'a homogeneização completa das culturas em todo o planeta',
          'a redução das desigualdades entre países desenvolvidos e subdesenvolvidos',
          'o fortalecimento das barreiras comerciais entre as nações',
          'a diminuição do papel das empresas multinacionais na economia'
        ]),
        correta: 'a intensificação dos fluxos de capitais, mercadorias e informações entre países',
        habilidade: 'H22',
        competencia: 6,
        disciplina: 'geografia'
      };
    }
  },

  // SOCIOLOGIA
  {
    tipo: 'weber_tipos_dominacao',
    gerar: () => {
      return {
        enunciado: `Max Weber definiu três tipos de dominação legítima em sua teoria sociológica. A dominação tradicional caracteriza-se por:`,
        alternativas: shuffle([
          'basear-se em costumes e tradições transmitidos de geração em geração',
          'fundamentar-se em normas racionais e impessoais estabelecidas por lei',
          'apoiar-se nas qualidades excepcionais de um líder carismático',
          'depender exclusivamente da força militar do governante',
          'estar vinculada ao poder econômico dos meios de produção'
        ]),
        correta: 'basear-se em costumes e tradições transmitidos de geração em geração',
        habilidade: 'H13',
        competencia: 3,
        disciplina: 'sociologia'
      };
    }
  },
  {
    tipo: 'durkheim_fato_social',
    gerar: () => {
      return {
        enunciado: `Émile Durkheim definiu o fato social como objeto de estudo da Sociologia. Segundo ele, os fatos sociais possuem três características fundamentais:`,
        alternativas: shuffle([
          'coercitividade, exterioridade e generalidade',
          'individualidade, interioridade e particularidade',
          'subjetividade, relatividade e contextualidade',
          'biologicidade, hereditariedade e naturalidade',
          'racionalidade, intencionalidade e voluntariedade'
        ]),
        correta: 'coercitividade, exterioridade e generalidade',
        habilidade: 'H12',
        competencia: 3,
        disciplina: 'sociologia'
      };
    }
  },

  // FILOSOFIA
  {
    tipo: 'socrates',
    gerar: () => {
      return {
        enunciado: `Sócrates, considerado um dos pais da filosofia ocidental, utilizava um método de investigação filosófica baseado no diálogo. Esse método é conhecido como:`,
        alternativas: shuffle([
          'maiêutica',
          'dedução',
          'empirismo',
          'fenomenologia',
          'dialética hegeliana'
        ]),
        correta: 'maiêutica',
        habilidade: 'H14',
        competencia: 4,
        disciplina: 'filosofia'
      };
    }
  },
  {
    tipo: 'kant_etica',
    gerar: () => {
      return {
        enunciado: `Na ética kantiana, o conceito de imperativo categórico estabelece que:`,
        alternativas: shuffle([
          'devemos agir segundo máximas que possam ser universalizadas para todos os seres racionais',
          'as ações devem ser julgadas exclusivamente por suas consequências',
          'a moralidade está condicionada aos costumes de cada sociedade',
          'o prazer individual é o critério máximo para avaliar as ações',
          'não existem princípios morais universais válidos'
        ]),
        correta: 'devemos agir segundo máximas que possam ser universalizadas para todos os seres racionais',
        habilidade: 'H14',
        competencia: 4,
        disciplina: 'filosofia'
      };
    }
  }
];

// ============================================================================
// TEMPLATES DE LINGUAGENS
// ============================================================================

const LINGUAGENS_TEMPLATES = [
  // INTERPRETAÇÃO DE TEXTO
  {
    tipo: 'funcao_linguagem',
    gerar: () => {
      const textos = [
        { texto: '"Compre agora e ganhe 50% de desconto!"', funcao: 'conativa (ou apelativa)' },
        { texto: '"O sol é uma estrela de quinta grandeza."', funcao: 'referencial (ou denotativa)' },
        { texto: '"Que noite mais fria, meu Deus!"', funcao: 'emotiva (ou expressiva)' },
        { texto: '"Alô? Está me ouvindo bem?"', funcao: 'fática' }
      ];
      const item = textos[Math.floor(Math.random() * textos.length)];

      return {
        enunciado: `No trecho ${item.texto}, predomina a função da linguagem:`,
        alternativas: shuffle([
          item.funcao,
          'metalinguística',
          'poética',
          'referencial (ou denotativa)',
          'fática'
        ]).slice(0, 5),
        correta: item.funcao,
        habilidade: 'H21',
        competencia: 7,
        disciplina: 'linguagens'
      };
    }
  },
  {
    tipo: 'genero_textual',
    gerar: () => {
      const generos = [
        { caracteristica: 'apresenta linguagem objetiva, estrutura em pirâmide invertida e responde às perguntas "o quê, quem, quando, onde, como e por quê"', genero: 'notícia' },
        { caracteristica: 'expressa opinião do autor sobre um tema, com argumentação e linguagem subjetiva', genero: 'artigo de opinião' },
        { caracteristica: 'narra fatos reais de forma literária, combinando técnicas jornalísticas e literárias', genero: 'crônica' },
        { caracteristica: 'instrui o leitor sobre como realizar uma tarefa, com verbos no imperativo', genero: 'manual de instruções' }
      ];
      const item = generos[Math.floor(Math.random() * generos.length)];

      return {
        enunciado: `Um texto que ${item.caracteristica} é classificado como:`,
        alternativas: shuffle(generos.map(g => g.genero).concat(['carta argumentativa'])).slice(0, 5),
        correta: item.genero,
        habilidade: 'H22',
        competencia: 7,
        disciplina: 'linguagens'
      };
    }
  },

  // GRAMÁTICA
  {
    tipo: 'concordancia_verbal',
    gerar: () => {
      return {
        enunciado: `Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão:`,
        alternativas: shuffle([
          'Fazem dois anos que não viajo para o exterior.',
          'Houveram muitos problemas durante a reunião.',
          'Existem várias possibilidades de solução para o caso.',
          'Aluga-se casas na praia durante o verão.',
          'Vão fazer três meses que estudo para o concurso.'
        ]),
        correta: 'Existem várias possibilidades de solução para o caso.',
        habilidade: 'H18',
        competencia: 6,
        disciplina: 'linguagens'
      };
    }
  },
  {
    tipo: 'regencia_verbal',
    gerar: () => {
      return {
        enunciado: `Em qual alternativa a regência verbal está de acordo com a norma-padrão?`,
        alternativas: shuffle([
          'Assistimos ao filme ontem à noite.',
          'Prefiro mais cinema do que teatro.',
          'Ela namora com o vizinho há dois anos.',
          'O diretor visou o documento antes de enviá-lo.',
          'Todos obedecem o regulamento da empresa.'
        ]),
        correta: 'Assistimos ao filme ontem à noite.',
        habilidade: 'H18',
        competencia: 6,
        disciplina: 'linguagens'
      };
    }
  },

  // LITERATURA
  {
    tipo: 'modernismo',
    gerar: () => {
      return {
        enunciado: `O Modernismo brasileiro, iniciado com a Semana de Arte Moderna de 1922, caracterizou-se por:`,
        alternativas: shuffle([
          'ruptura com os padrões estéticos tradicionais e valorização da cultura nacional',
          'retomada dos ideais clássicos greco-romanos na literatura',
          'exaltação do subjetivismo e da melancolia típicos do Romantismo',
          'manutenção das formas fixas e métricas parnasianas',
          'predomínio do cientificismo e do determinismo naturalista'
        ]),
        correta: 'ruptura com os padrões estéticos tradicionais e valorização da cultura nacional',
        habilidade: 'H5',
        competencia: 1,
        disciplina: 'literatura'
      };
    }
  },
  {
    tipo: 'autores_obras',
    gerar: () => {
      const obras = [
        { obra: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis' },
        { obra: 'Grande Sertão: Veredas', autor: 'Guimarães Rosa' },
        { obra: 'A Hora da Estrela', autor: 'Clarice Lispector' },
        { obra: 'Vidas Secas', autor: 'Graciliano Ramos' }
      ];
      const item = obras[Math.floor(Math.random() * obras.length)];

      return {
        enunciado: `A obra "${item.obra}" foi escrita por:`,
        alternativas: shuffle(obras.map(o => o.autor).concat(['José de Alencar'])).slice(0, 5),
        correta: item.autor,
        habilidade: 'H5',
        competencia: 1,
        disciplina: 'literatura'
      };
    }
  },

  // VARIAÇÃO LINGUÍSTICA
  {
    tipo: 'variacao',
    gerar: () => {
      return {
        enunciado: `A variação linguística é um fenômeno natural das línguas. A variação que ocorre de acordo com a situação de uso (formal ou informal) é chamada de:`,
        alternativas: shuffle([
          'variação estilística (ou diafásica)',
          'variação regional (ou diatópica)',
          'variação social (ou diastrática)',
          'variação histórica (ou diacrônica)',
          'variação fonética (ou fonológica)'
        ]),
        correta: 'variação estilística (ou diafásica)',
        habilidade: 'H25',
        competencia: 8,
        disciplina: 'linguagens'
      };
    }
  }
];

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function gerarQuestoes(templates, quantidade) {
  const questoes = [];

  for (let i = 0; i < quantidade; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const questao = template.gerar();

    // Encontra o índice da resposta correta
    const indiceCoorreta = questao.alternativas.indexOf(questao.correta);
    const letraCorreta = ['A', 'B', 'C', 'D', 'E'][indiceCoorreta >= 0 ? indiceCoorreta : 0];

    questoes.push({
      numero: i + 1,
      ano: 2025,
      disciplina: questao.disciplina || 'matematica',
      enunciado: questao.enunciado,
      alternativas: {
        A: questao.alternativas[0],
        B: questao.alternativas[1],
        C: questao.alternativas[2],
        D: questao.alternativas[3],
        E: questao.alternativas[4]
      },
      correta: letraCorreta,
      tipo: 'gerada_ia',
      habilidade: questao.habilidade,
      competencia: questao.competencia,
      explicacao: `Questão gerada com base no padrão ENEM - ${questao.habilidade}`,
      source: 'claude_code',
      area: questao.disciplina || 'matematica',
      difficulty: Math.floor(Math.random() * 3) + 1
    });
  }

  return questoes;
}

// ============================================================================
// GERAÇÃO PRINCIPAL
// ============================================================================

async function main() {
  console.log('🎓 Gerador de Questões ENEM de Alta Qualidade\n');
  console.log('================================================\n');

  // Gerar questões por área
  console.log('📐 Gerando questões de Matemática...');
  const matematica = gerarQuestoes(MATEMATICA_TEMPLATES, 500);
  console.log(`   ✅ ${matematica.length} questões geradas\n`);

  console.log('🔬 Gerando questões de Ciências da Natureza...');
  const natureza = gerarQuestoes(CIENCIAS_NATUREZA_TEMPLATES, 300);
  console.log(`   ✅ ${natureza.length} questões geradas\n`);

  console.log('🌍 Gerando questões de Ciências Humanas...');
  const humanas = gerarQuestoes(CIENCIAS_HUMANAS_TEMPLATES, 300);
  console.log(`   ✅ ${humanas.length} questões geradas\n`);

  console.log('📚 Gerando questões de Linguagens...');
  const linguagens = gerarQuestoes(LINGUAGENS_TEMPLATES, 200);
  console.log(`   ✅ ${linguagens.length} questões geradas\n`);

  // Consolidar
  const todasQuestoes = [
    ...matematica,
    ...natureza,
    ...humanas,
    ...linguagens
  ];

  // Renumerar
  todasQuestoes.forEach((q, i) => q.numero = i + 1);

  const output = {
    versao: '3.0',
    total_questoes: todasQuestoes.length,
    gerado_em: new Date().toISOString(),
    description: 'Questões ENEM de alta qualidade geradas por IA',
    distribuicao: {
      matematica: matematica.length,
      ciencias_natureza: natureza.length,
      ciencias_humanas: humanas.length,
      linguagens: linguagens.length
    },
    questoes: todasQuestoes
  };

  // Salvar arquivo
  const outputPath = resolve(__dirname, '../../backend/enem_ingestion/questoes_alta_qualidade.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('================================================');
  console.log(`\n✅ GERAÇÃO CONCLUÍDA!`);
  console.log(`   📊 Total: ${todasQuestoes.length} questões`);
  console.log(`   📁 Arquivo: ${outputPath}`);
  console.log('\n📌 Para inserir no banco, execute:');
  console.log('   node scripts/seed-questoes.mjs\n');
}

main().catch(console.error);
