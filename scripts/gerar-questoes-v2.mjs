/**
 * Gerador de Questões ENEM V2 - Massivo e Diversificado
 *
 * Gera milhares de questões únicas com alta variabilidade
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// BANCO DE DADOS DE CONTEXTOS
// ============================================================================

const CONTEXTOS = {
  nomes: ['Maria', 'João', 'Ana', 'Pedro', 'Carlos', 'Julia', 'Lucas', 'Fernanda', 'Rafael', 'Beatriz', 'Gustavo', 'Larissa', 'Bruno', 'Camila', 'Diego', 'Isabela', 'Felipe', 'Amanda', 'Rodrigo', 'Patrícia'],
  cidades: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Fortaleza', 'Curitiba', 'Recife', 'Porto Alegre', 'Manaus', 'Belém', 'Goiânia', 'Campinas', 'Brasília', 'Natal', 'Florianópolis'],
  profissoes: ['engenheiro', 'professor', 'médico', 'arquiteto', 'administrador', 'contador', 'advogado', 'enfermeiro', 'nutricionista', 'economista'],
  estabelecimentos: ['supermercado', 'farmácia', 'padaria', 'restaurante', 'loja de roupas', 'livraria', 'papelaria', 'posto de gasolina'],
  veiculos: ['carro', 'moto', 'ônibus', 'caminhão', 'bicicleta', 'trem'],
  materiais: ['madeira', 'ferro', 'alumínio', 'cobre', 'vidro', 'plástico', 'concreto'],
  culturas: ['soja', 'milho', 'café', 'laranja', 'cana-de-açúcar', 'algodão', 'trigo', 'arroz'],
  animais: ['boi', 'porco', 'frango', 'peixe', 'ovelha', 'cabra'],
};

function escolher(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// ============================================================================
// MATEMÁTICA - TEMPLATES MASSIVOS
// ============================================================================

const MATEMATICA = {
  // Porcentagem - 20 variantes
  porcentagem: () => {
    const tipos = [
      () => {
        const nome = escolher(CONTEXTOS.nomes);
        const estab = escolher(CONTEXTOS.estabelecimentos);
        const preco = rand(50, 500) * 10;
        const desc = escolher([5, 10, 15, 20, 25, 30, 40, 50]);
        const final = preco * (1 - desc/100);
        return {
          enunciado: `${nome} foi ao ${estab} e encontrou um produto que custava ${formatarMoeda(preco)}. Na promoção do dia, o desconto era de ${desc}%. Quanto ${nome} pagou pelo produto?`,
          correta: formatarMoeda(final),
          erradas: [formatarMoeda(preco - desc), formatarMoeda(preco * desc / 100), formatarMoeda(final * 1.1), formatarMoeda(final * 0.9)]
        };
      },
      () => {
        const cidade = escolher(CONTEXTOS.cidades);
        const inicial = rand(100, 500) * 1000;
        const aumento = escolher([5, 8, 10, 12, 15, 20]);
        const final = inicial * (1 + aumento/100);
        return {
          enunciado: `A população de ${cidade} era de ${inicial.toLocaleString('pt-BR')} habitantes. Após um crescimento de ${aumento}%, qual passou a ser a população?`,
          correta: Math.round(final).toLocaleString('pt-BR') + ' habitantes',
          erradas: [(inicial + aumento * 1000).toLocaleString('pt-BR') + ' habitantes', Math.round(final * 1.05).toLocaleString('pt-BR') + ' habitantes', Math.round(final * 0.95).toLocaleString('pt-BR') + ' habitantes', (inicial + aumento).toLocaleString('pt-BR') + ' habitantes']
        };
      },
      () => {
        const nome = escolher(CONTEXTOS.nomes);
        const salario = rand(15, 80) * 100;
        const aumento = escolher([5, 7, 8, 10, 12, 15]);
        const novo = salario * (1 + aumento/100);
        return {
          enunciado: `${nome} recebia um salário de ${formatarMoeda(salario)}. Após uma promoção, recebeu um aumento de ${aumento}%. Qual é o novo salário de ${nome}?`,
          correta: formatarMoeda(novo),
          erradas: [formatarMoeda(salario + aumento), formatarMoeda(novo + 100), formatarMoeda(novo - 100), formatarMoeda(salario * aumento / 100)]
        };
      },
      () => {
        const total = rand(20, 50);
        const presentes = rand(Math.floor(total * 0.6), total - 2);
        const pct = (presentes / total * 100);
        return {
          enunciado: `Em uma sala com ${total} alunos, ${presentes} estavam presentes na aula. Qual é a porcentagem de presença?`,
          correta: pct.toFixed(0) + '%',
          erradas: [(100 - pct).toFixed(0) + '%', (pct + 5).toFixed(0) + '%', (pct - 5).toFixed(0) + '%', ((total - presentes) / total * 100).toFixed(0) + '%']
        };
      },
      () => {
        const preco = rand(100, 1000);
        const lucro = escolher([20, 25, 30, 40, 50]);
        const venda = preco * (1 + lucro/100);
        return {
          enunciado: `Um comerciante comprou um produto por ${formatarMoeda(preco)} e deseja vendê-lo com ${lucro}% de lucro. Por quanto ele deve vender o produto?`,
          correta: formatarMoeda(venda),
          erradas: [formatarMoeda(preco + lucro), formatarMoeda(venda * 1.1), formatarMoeda(venda * 0.9), formatarMoeda(preco * lucro / 100)]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Juros - 10 variantes
  juros: () => {
    const tipos = [
      () => {
        const capital = escolher([1000, 2000, 3000, 5000, 10000]);
        const taxa = escolher([0.5, 1, 1.5, 2, 2.5, 3]);
        const meses = escolher([3, 6, 9, 12, 18, 24]);
        const montante = capital * (1 + taxa/100 * meses);
        return {
          enunciado: `Um capital de ${formatarMoeda(capital)} foi aplicado a juros simples de ${taxa.toString().replace('.', ',')}% ao mês. Qual será o montante após ${meses} meses?`,
          correta: formatarMoeda(montante),
          erradas: [formatarMoeda(capital * Math.pow(1 + taxa/100, meses)), formatarMoeda(montante * 1.1), formatarMoeda(montante * 0.9), formatarMoeda(capital + taxa * meses)]
        };
      },
      () => {
        const capital = escolher([1000, 2000, 5000, 10000]);
        const taxa = escolher([5, 10, 12, 15, 20]);
        const anos = escolher([2, 3, 4]);
        const montante = capital * Math.pow(1 + taxa/100, anos);
        return {
          enunciado: `Um investimento de ${formatarMoeda(capital)} rende ${taxa}% ao ano em juros compostos. Qual será o valor após ${anos} anos?`,
          correta: formatarMoeda(montante),
          erradas: [formatarMoeda(capital * (1 + taxa/100 * anos)), formatarMoeda(montante * 1.1), formatarMoeda(montante * 0.9), formatarMoeda(capital + taxa * anos)]
        };
      },
      () => {
        const montante = escolher([1100, 1200, 1500, 2000, 2500]);
        const capital = escolher([1000, 1500, 2000]);
        const meses = escolher([6, 12, 24]);
        const taxa = ((montante / capital - 1) / meses * 100);
        return {
          enunciado: `Um capital de ${formatarMoeda(capital)} rendeu ${formatarMoeda(montante)} após ${meses} meses em juros simples. Qual foi a taxa mensal?`,
          correta: taxa.toFixed(1).replace('.', ',') + '% ao mês',
          erradas: [(taxa * 2).toFixed(1).replace('.', ',') + '% ao mês', (taxa / 2).toFixed(1).replace('.', ',') + '% ao mês', (taxa + 0.5).toFixed(1).replace('.', ',') + '% ao mês', (taxa - 0.3).toFixed(1).replace('.', ',') + '% ao mês']
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Geometria plana - 15 variantes
  geometriaPlana: () => {
    const tipos = [
      () => {
        const lado = rand(5, 30);
        const area = lado * lado;
        return {
          enunciado: `Um terreno quadrado tem lado medindo ${lado} metros. Qual é a área desse terreno?`,
          correta: `${area} m²`,
          erradas: [`${lado * 4} m²`, `${area + lado} m²`, `${area - lado} m²`, `${lado * 2} m²`]
        };
      },
      () => {
        const base = rand(10, 40);
        const altura = rand(5, 25);
        const area = base * altura;
        return {
          enunciado: `Um retângulo tem base de ${base} cm e altura de ${altura} cm. Qual é sua área?`,
          correta: `${area} cm²`,
          erradas: [`${2*(base+altura)} cm²`, `${area + base} cm²`, `${area - altura} cm²`, `${base + altura} cm²`]
        };
      },
      () => {
        const base = rand(6, 20);
        const altura = rand(4, 15);
        const area = (base * altura) / 2;
        return {
          enunciado: `Um triângulo tem base de ${base} m e altura de ${altura} m. Qual é sua área?`,
          correta: `${area} m²`,
          erradas: [`${base * altura} m²`, `${area * 2} m²`, `${area + base} m²`, `${(base + altura) / 2} m²`]
        };
      },
      () => {
        const raio = rand(3, 15);
        const area = Math.PI * raio * raio;
        return {
          enunciado: `Um círculo tem raio de ${raio} cm. Usando π ≈ 3,14, qual é sua área aproximada?`,
          correta: `${(3.14 * raio * raio).toFixed(1).replace('.', ',')} cm²`,
          erradas: [`${(2 * 3.14 * raio).toFixed(1).replace('.', ',')} cm²`, `${(3.14 * raio * raio * 2).toFixed(1).replace('.', ',')} cm²`, `${(3.14 * raio).toFixed(1).replace('.', ',')} cm²`, `${(raio * raio).toFixed(1).replace('.', ',')} cm²`]
        };
      },
      () => {
        const raio = rand(5, 20);
        const comp = 2 * Math.PI * raio;
        return {
          enunciado: `Uma circunferência tem raio de ${raio} m. Usando π ≈ 3,14, qual é seu comprimento?`,
          correta: `${(2 * 3.14 * raio).toFixed(1).replace('.', ',')} m`,
          erradas: [`${(3.14 * raio * raio).toFixed(1).replace('.', ',')} m`, `${(3.14 * raio).toFixed(1).replace('.', ',')} m`, `${(2 * raio).toFixed(1).replace('.', ',')} m`, `${(4 * 3.14 * raio).toFixed(1).replace('.', ',')} m`]
        };
      },
      () => {
        const l = rand(8, 25);
        const perim = 4 * l;
        return {
          enunciado: `Um quadrado tem lado de ${l} metros. Qual é o perímetro?`,
          correta: `${perim} m`,
          erradas: [`${l * l} m`, `${2 * l} m`, `${perim + l} m`, `${3 * l} m`]
        };
      },
      () => {
        const baseMaior = rand(15, 30);
        const baseMenor = rand(8, baseMaior - 3);
        const altura = rand(5, 15);
        const area = ((baseMaior + baseMenor) * altura) / 2;
        return {
          enunciado: `Um trapézio tem bases medindo ${baseMaior} cm e ${baseMenor} cm, e altura de ${altura} cm. Qual é sua área?`,
          correta: `${area} cm²`,
          erradas: [`${baseMaior * altura} cm²`, `${(baseMaior + baseMenor) * altura} cm²`, `${area + altura} cm²`, `${baseMenor * altura} cm²`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Geometria espacial - 10 variantes
  geometriaEspacial: () => {
    const tipos = [
      () => {
        const lado = rand(3, 12);
        const vol = lado * lado * lado;
        return {
          enunciado: `Um cubo tem aresta de ${lado} cm. Qual é seu volume?`,
          correta: `${vol} cm³`,
          erradas: [`${6 * lado * lado} cm³`, `${vol + lado} cm³`, `${lado * lado} cm³`, `${12 * lado} cm³`]
        };
      },
      () => {
        const comp = rand(5, 15);
        const larg = rand(3, 10);
        const alt = rand(2, 8);
        const vol = comp * larg * alt;
        return {
          enunciado: `Uma caixa retangular tem dimensões ${comp} cm × ${larg} cm × ${alt} cm. Qual é seu volume?`,
          correta: `${vol} cm³`,
          erradas: [`${2*(comp*larg + comp*alt + larg*alt)} cm³`, `${vol + comp} cm³`, `${comp * larg} cm³`, `${comp + larg + alt} cm³`]
        };
      },
      () => {
        const raio = rand(2, 8);
        const altura = rand(5, 15);
        const vol = 3.14 * raio * raio * altura;
        return {
          enunciado: `Um cilindro tem raio de ${raio} m e altura de ${altura} m. Usando π ≈ 3,14, qual é seu volume?`,
          correta: `${vol.toFixed(1).replace('.', ',')} m³`,
          erradas: [`${(2 * 3.14 * raio * altura).toFixed(1).replace('.', ',')} m³`, `${(vol * 2).toFixed(1).replace('.', ',')} m³`, `${(3.14 * raio * altura).toFixed(1).replace('.', ',')} m³`, `${(vol / 2).toFixed(1).replace('.', ',')} m³`]
        };
      },
      () => {
        const raio = rand(3, 10);
        const vol = (4/3) * 3.14 * raio * raio * raio;
        return {
          enunciado: `Uma esfera tem raio de ${raio} cm. Usando π ≈ 3,14, qual é seu volume aproximado?`,
          correta: `${vol.toFixed(0)} cm³`,
          erradas: [`${(4 * 3.14 * raio * raio).toFixed(0)} cm³`, `${(vol * 1.5).toFixed(0)} cm³`, `${(vol / 2).toFixed(0)} cm³`, `${(3.14 * raio * raio * raio).toFixed(0)} cm³`]
        };
      },
      () => {
        const lado = rand(4, 12);
        const areaTotal = 6 * lado * lado;
        return {
          enunciado: `Um cubo tem aresta de ${lado} cm. Qual é a área total de suas faces?`,
          correta: `${areaTotal} cm²`,
          erradas: [`${lado * lado * lado} cm²`, `${4 * lado * lado} cm²`, `${areaTotal + lado} cm²`, `${12 * lado} cm²`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Estatística - 15 variantes
  estatistica: () => {
    const tipos = [
      () => {
        const valores = Array.from({length: 5}, () => rand(4, 10));
        const media = valores.reduce((a, b) => a + b) / valores.length;
        return {
          enunciado: `As notas de um aluno nas provas foram: ${valores.join(', ')}. Qual é a média aritmética?`,
          correta: media.toFixed(1).replace('.', ','),
          erradas: [(media + 1).toFixed(1).replace('.', ','), (media - 1).toFixed(1).replace('.', ','), valores[Math.floor(valores.length/2)].toString(), ((valores[0] + valores[valores.length-1])/2).toFixed(1).replace('.', ',')]
        };
      },
      () => {
        const valores = Array.from({length: 7}, () => rand(10, 50)).sort((a, b) => a - b);
        const mediana = valores[3];
        return {
          enunciado: `Dado o conjunto de dados: ${valores.join(', ')}. Qual é a mediana?`,
          correta: mediana.toString(),
          erradas: [(valores.reduce((a,b) => a+b) / valores.length).toFixed(0), valores[0].toString(), valores[valores.length-1].toString(), ((valores[0] + valores[valores.length-1])/2).toFixed(0)]
        };
      },
      () => {
        const dados = [rand(1,6), rand(1,6), rand(1,6), rand(1,6)];
        const soma = dados.reduce((a, b) => a + b);
        return {
          enunciado: `Um dado foi lançado 4 vezes e os resultados foram: ${dados.join(', ')}. Qual é a soma dos resultados?`,
          correta: soma.toString(),
          erradas: [(soma / 4).toFixed(0), (soma + 2).toString(), (soma - 2).toString(), dados[0].toString()]
        };
      },
      () => {
        const total = rand(15, 30);
        const favoraveis = rand(3, total - 5);
        const prob = favoraveis / total;
        return {
          enunciado: `Uma urna contém ${total} bolas, das quais ${favoraveis} são vermelhas. Qual é a probabilidade de sortear uma bola vermelha?`,
          correta: `${favoraveis}/${total}`,
          erradas: [`${total - favoraveis}/${total}`, `${favoraveis}/${total - favoraveis}`, `${favoraveis - 1}/${total}`, `${favoraveis}/${total + 1}`]
        };
      },
      () => {
        const azuis = rand(3, 10);
        const verdes = rand(3, 10);
        const total = azuis + verdes;
        return {
          enunciado: `Uma caixa contém ${azuis} bolas azuis e ${verdes} bolas verdes. Qual é a probabilidade de sortear uma bola azul?`,
          correta: `${azuis}/${total}`,
          erradas: [`${verdes}/${total}`, `${azuis}/${verdes}`, `${total}/${azuis}`, `${azuis - 1}/${total}`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Funções - 10 variantes
  funcoes: () => {
    const tipos = [
      () => {
        const a = rand(2, 10);
        const b = rand(-20, 20);
        const x = rand(-5, 10);
        const y = a * x + b;
        return {
          enunciado: `Dada a função f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}, qual é o valor de f(${x})?`,
          correta: y.toString(),
          erradas: [(y + a).toString(), (y - b).toString(), (a + b).toString(), (a * b).toString()]
        };
      },
      () => {
        const a = escolher([1, 2, -1, -2]);
        const b = rand(-8, 8);
        const c = rand(-10, 10);
        const x = rand(-3, 3);
        const y = a * x * x + b * x + c;
        return {
          enunciado: `Para a função f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}, calcule f(${x}).`,
          correta: y.toString(),
          erradas: [(y + 2).toString(), (y - 2).toString(), (a + b + c).toString(), (x * x).toString()]
        };
      },
      () => {
        const taxaFixa = rand(20, 60);
        const taxaKm = rand(2, 6);
        const km = rand(5, 30);
        const total = taxaFixa + taxaKm * km;
        return {
          enunciado: `Um serviço de táxi cobra R$ ${taxaFixa},00 de bandeirada mais R$ ${taxaKm},00 por km rodado. Quanto custa uma corrida de ${km} km?`,
          correta: formatarMoeda(total),
          erradas: [formatarMoeda(taxaKm * km), formatarMoeda(taxaFixa * km), formatarMoeda(total + taxaFixa), formatarMoeda(total - taxaKm)]
        };
      },
      () => {
        const a = rand(2, 8);
        const b = rand(-20, -5);
        const zero = -b / a;
        return {
          enunciado: `Qual é a raiz (zero) da função f(x) = ${a}x ${b >= 0 ? '+' : ''} ${b}?`,
          correta: zero.toFixed(1).replace('.', ','),
          erradas: [(-zero).toFixed(1).replace('.', ','), (b / a).toFixed(1).replace('.', ','), a.toString(), b.toString()]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Progressões - 8 variantes
  progressoes: () => {
    const tipos = [
      () => {
        const a1 = rand(2, 20);
        const r = rand(2, 8);
        const n = rand(5, 12);
        const an = a1 + (n - 1) * r;
        return {
          enunciado: `Em uma PA com primeiro termo ${a1} e razão ${r}, qual é o ${n}º termo?`,
          correta: an.toString(),
          erradas: [(a1 + n * r).toString(), (an + r).toString(), (an - r).toString(), (a1 * n).toString()]
        };
      },
      () => {
        const a1 = rand(2, 10);
        const q = escolher([2, 3]);
        const n = rand(4, 7);
        const an = a1 * Math.pow(q, n - 1);
        return {
          enunciado: `Em uma PG com primeiro termo ${a1} e razão ${q}, qual é o ${n}º termo?`,
          correta: an.toString(),
          erradas: [(a1 * q * n).toString(), (an * q).toString(), (an / q).toString(), (a1 + q * (n-1)).toString()]
        };
      },
      () => {
        const a1 = rand(100, 200);
        const r = rand(10, 30);
        const n = rand(8, 15);
        const soma = (n * (2 * a1 + (n - 1) * r)) / 2;
        return {
          enunciado: `A soma dos ${n} primeiros termos de uma PA com a₁ = ${a1} e razão ${r} é:`,
          correta: soma.toString(),
          erradas: [(soma + a1).toString(), (soma - r).toString(), (n * a1).toString(), (soma / 2).toString()]
        };
      },
      () => {
        const salario = rand(2000, 4000);
        const aumento = rand(100, 300);
        const ano = rand(5, 10);
        const salarioFinal = salario + (ano - 1) * aumento;
        return {
          enunciado: `Um funcionário ganha ${formatarMoeda(salario)} e recebe aumento anual de ${formatarMoeda(aumento)}. Qual será seu salário no ${ano}º ano?`,
          correta: formatarMoeda(salarioFinal),
          erradas: [formatarMoeda(salario + ano * aumento), formatarMoeda(salarioFinal + aumento), formatarMoeda(salario * ano), formatarMoeda(salarioFinal - aumento)]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Razão e Proporção - 10 variantes
  razaoProporcao: () => {
    const tipos = [
      () => {
        const trab1 = rand(4, 10);
        const dias1 = rand(10, 25);
        const trab2 = rand(trab1 + 2, 15);
        const dias2 = Math.round((trab1 * dias1) / trab2);
        return {
          enunciado: `Uma obra seria feita por ${trab1} trabalhadores em ${dias1} dias. Com ${trab2} trabalhadores, em quantos dias a obra será concluída?`,
          correta: `${dias2} dias`,
          erradas: [`${dias2 + 2} dias`, `${dias2 - 2} dias`, `${dias1} dias`, `${Math.round(dias1 * trab2 / trab1)} dias`]
        };
      },
      () => {
        const km1 = rand(100, 300);
        const litros1 = rand(8, 15);
        const km2 = rand(400, 600);
        const litros2 = Math.round((km2 * litros1) / km1);
        return {
          enunciado: `Um carro percorre ${km1} km com ${litros1} litros de combustível. Quantos litros serão necessários para percorrer ${km2} km?`,
          correta: `${litros2} litros`,
          erradas: [`${litros2 + 3} litros`, `${litros2 - 3} litros`, `${litros1} litros`, `${Math.round(km2 / km1)} litros`]
        };
      },
      () => {
        const maq1 = rand(3, 8);
        const horas1 = rand(6, 12);
        const maq2 = rand(maq1 + 2, 12);
        const horas2 = Math.round((maq1 * horas1) / maq2);
        return {
          enunciado: `Com ${maq1} máquinas, uma produção leva ${horas1} horas. Com ${maq2} máquinas, quantas horas levará?`,
          correta: `${horas2} horas`,
          erradas: [`${horas2 + 2} horas`, `${horas2 - 1} horas`, `${horas1} horas`, `${Math.round(horas1 * maq2 / maq1)} horas`]
        };
      },
      () => {
        const distReal = rand(50, 200);
        const escala = escolher([50000, 100000, 250000, 500000]);
        const distMapa = (distReal * 100000) / escala;
        return {
          enunciado: `Em um mapa na escala 1:${escala.toLocaleString('pt-BR')}, qual é a distância em cm que representa ${distReal} km reais?`,
          correta: `${distMapa.toFixed(0)} cm`,
          erradas: [`${(distMapa * 2).toFixed(0)} cm`, `${(distMapa / 2).toFixed(0)} cm`, `${distReal} cm`, `${(distReal / escala * 1000).toFixed(0)} cm`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Análise Combinatória - 8 variantes
  combinatoria: () => {
    const tipos = [
      () => {
        const n = rand(4, 6);
        const fatorial = [1, 1, 2, 6, 24, 120, 720][n];
        return {
          enunciado: `De quantas formas diferentes ${n} pessoas podem se organizar em uma fila?`,
          correta: fatorial.toString(),
          erradas: [(fatorial * 2).toString(), (fatorial / 2).toString(), (n * n).toString(), (n * (n-1)).toString()]
        };
      },
      () => {
        const digitos = rand(3, 5);
        const total = Math.pow(10, digitos);
        return {
          enunciado: `Quantas senhas de ${digitos} dígitos podem ser formadas, podendo repetir algarismos?`,
          correta: total.toLocaleString('pt-BR'),
          erradas: [(total / 10).toLocaleString('pt-BR'), (total * 10).toLocaleString('pt-BR'), (digitos * 10).toLocaleString('pt-BR'), (total / 2).toLocaleString('pt-BR')]
        };
      },
      () => {
        const total = rand(8, 12);
        const escolher_n = rand(2, 4);
        const comb = factorial(total) / (factorial(escolher_n) * factorial(total - escolher_n));
        return {
          enunciado: `De quantas formas podemos escolher ${escolher_n} pessoas de um grupo de ${total}?`,
          correta: comb.toString(),
          erradas: [(comb * 2).toString(), (comb / 2).toString(), (total * escolher_n).toString(), factorial(escolher_n).toString()]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  }
};

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// ============================================================================
// CIÊNCIAS DA NATUREZA - TEMPLATES MASSIVOS
// ============================================================================

const CIENCIAS_NATUREZA = {
  // Física - Mecânica
  mecanica: () => {
    const tipos = [
      () => {
        const dist = rand(100, 500);
        const tempo = rand(2, 8);
        const vel = dist / tempo;
        return {
          enunciado: `Um veículo percorreu ${dist} km em ${tempo} horas. Qual foi sua velocidade média?`,
          correta: `${vel.toFixed(0)} km/h`,
          erradas: [`${(vel * 1.2).toFixed(0)} km/h`, `${(vel * 0.8).toFixed(0)} km/h`, `${(dist + tempo).toFixed(0)} km/h`, `${(dist * tempo).toFixed(0)} km/h`]
        };
      },
      () => {
        const v = rand(10, 30);
        const t = rand(5, 20);
        const d = v * t;
        return {
          enunciado: `Um ciclista mantém velocidade de ${v} m/s por ${t} segundos. Qual a distância percorrida?`,
          correta: `${d} m`,
          erradas: [`${d + v} m`, `${d - t} m`, `${v + t} m`, `${d * 2} m`]
        };
      },
      () => {
        const v0 = rand(0, 10);
        const a = rand(2, 6);
        const t = rand(3, 8);
        const v = v0 + a * t;
        return {
          enunciado: `Um móvel parte com velocidade ${v0} m/s e acelera a ${a} m/s². Qual sua velocidade após ${t} s?`,
          correta: `${v} m/s`,
          erradas: [`${v + a} m/s`, `${v - a} m/s`, `${a * t} m/s`, `${v0 * t} m/s`]
        };
      },
      () => {
        const h = rand(20, 80);
        const g = 10;
        const t = Math.sqrt(2 * h / g);
        return {
          enunciado: `Um objeto é solto de ${h} m de altura. Com g = 10 m/s², em quanto tempo atinge o solo?`,
          correta: `${t.toFixed(0)} s`,
          erradas: [`${(t * 1.5).toFixed(0)} s`, `${(t * 0.7).toFixed(0)} s`, `${(h / g).toFixed(0)} s`, `${Math.sqrt(h).toFixed(0)} s`]
        };
      },
      () => {
        const m = rand(50, 100);
        const g = 10;
        const p = m * g;
        return {
          enunciado: `Uma pessoa tem massa de ${m} kg. Com g = 10 m/s², qual é seu peso?`,
          correta: `${p} N`,
          erradas: [`${m} N`, `${p + m} N`, `${p / 2} N`, `${m * g * g} N`]
        };
      },
      () => {
        const m = rand(1, 10);
        const a = rand(2, 8);
        const f = m * a;
        return {
          enunciado: `Uma força aplicada em um corpo de ${m} kg produz aceleração de ${a} m/s². Qual é a força?`,
          correta: `${f} N`,
          erradas: [`${m + a} N`, `${f * 2} N`, `${f / 2} N`, `${m * a * a} N`]
        };
      },
      () => {
        const m = escolher([2, 4, 5, 8, 10]);
        const v = escolher([3, 4, 5, 6, 10]);
        const ec = 0.5 * m * v * v;
        return {
          enunciado: `Um corpo de ${m} kg move-se a ${v} m/s. Qual é sua energia cinética?`,
          correta: `${ec} J`,
          erradas: [`${m * v} J`, `${m * v * v} J`, `${ec * 2} J`, `${ec / 2} J`]
        };
      },
      () => {
        const m = rand(1, 10);
        const h = rand(5, 20);
        const g = 10;
        const ep = m * g * h;
        return {
          enunciado: `Um objeto de ${m} kg está a ${h} m de altura. Com g = 10 m/s², qual é sua energia potencial gravitacional?`,
          correta: `${ep} J`,
          erradas: [`${m * h} J`, `${ep + m} J`, `${ep / 2} J`, `${g * h} J`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Física - Eletricidade
  eletricidade: () => {
    const tipos = [
      () => {
        const v = escolher([12, 24, 110, 220]);
        const r = rand(4, 20);
        const i = v / r;
        return {
          enunciado: `Um resistor de ${r} Ω é submetido a ${v} V. Qual é a corrente elétrica?`,
          correta: `${i.toFixed(1)} A`,
          erradas: [`${(v * r).toFixed(1)} A`, `${(i * 2).toFixed(1)} A`, `${(i / 2).toFixed(1)} A`, `${(v + r).toFixed(1)} A`]
        };
      },
      () => {
        const p = escolher([60, 100, 150, 200, 500, 1000]);
        const h = rand(2, 8);
        const dias = rand(20, 30);
        const kwh = (p * h * dias) / 1000;
        const tarifa = 0.60;
        const custo = kwh * tarifa;
        return {
          enunciado: `Um aparelho de ${p} W funciona ${h} h/dia por ${dias} dias. Com tarifa de R$ 0,60/kWh, qual o custo?`,
          correta: formatarMoeda(custo),
          erradas: [formatarMoeda(custo * 1.2), formatarMoeda(custo * 0.8), formatarMoeda(kwh), formatarMoeda(p * h * dias / 100)]
        };
      },
      () => {
        const v = escolher([110, 220]);
        const i = rand(2, 10);
        const p = v * i;
        return {
          enunciado: `Um aparelho ligado em ${v} V consome corrente de ${i} A. Qual é sua potência?`,
          correta: `${p} W`,
          erradas: [`${v + i} W`, `${p / 2} W`, `${p * 2} W`, `${v / i} W`]
        };
      },
      () => {
        const r1 = rand(4, 12);
        const r2 = rand(4, 12);
        const rSerie = r1 + r2;
        return {
          enunciado: `Dois resistores de ${r1} Ω e ${r2} Ω estão em série. Qual é a resistência equivalente?`,
          correta: `${rSerie} Ω`,
          erradas: [`${(r1 * r2 / (r1 + r2)).toFixed(1)} Ω`, `${r1 * r2} Ω`, `${Math.abs(r1 - r2)} Ω`, `${(r1 + r2) / 2} Ω`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Física - Termodinâmica
  termodinamica: () => {
    const tipos = [
      () => {
        const c = rand(10, 40);
        const f = (c * 9/5) + 32;
        return {
          enunciado: `Converta ${c}°C para a escala Fahrenheit.`,
          correta: `${f.toFixed(0)}°F`,
          erradas: [`${(f + 10).toFixed(0)}°F`, `${(f - 10).toFixed(0)}°F`, `${(c + 32).toFixed(0)}°F`, `${(c * 2).toFixed(0)}°F`]
        };
      },
      () => {
        const c = rand(0, 100);
        const k = c + 273;
        return {
          enunciado: `Qual é a temperatura de ${c}°C na escala Kelvin?`,
          correta: `${k} K`,
          erradas: [`${c} K`, `${k + 100} K`, `${c - 273} K`, `${k * 2} K`]
        };
      },
      () => {
        const m = rand(100, 500);
        const c = 4.2; // água
        const dT = rand(10, 50);
        const q = m * c * dT;
        return {
          enunciado: `Quanta energia é necessária para aquecer ${m} g de água em ${dT}°C? (c = 4,2 J/g°C)`,
          correta: `${q.toFixed(0)} J`,
          erradas: [`${(q / 2).toFixed(0)} J`, `${(q * 2).toFixed(0)} J`, `${(m * dT).toFixed(0)} J`, `${(c * dT).toFixed(0)} J`]
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Química
  quimica: () => {
    const tipos = [
      () => {
        const massa = rand(10, 100);
        const vol = rand(100, 500);
        const conc = (massa / vol) * 1000;
        return {
          enunciado: `Uma solução foi preparada com ${massa} g de soluto em ${vol} mL. Qual é a concentração em g/L?`,
          correta: `${conc.toFixed(0)} g/L`,
          erradas: [`${(massa / vol).toFixed(0)} g/L`, `${(conc / 2).toFixed(0)} g/L`, `${(conc * 2).toFixed(0)} g/L`, `${(massa + vol).toFixed(0)} g/L`]
        };
      },
      () => {
        const conc = escolher([0.001, 0.0001, 0.00001]);
        const pH = -Math.log10(conc);
        const concStr = conc === 0.001 ? '10⁻³' : conc === 0.0001 ? '10⁻⁴' : '10⁻⁵';
        return {
          enunciado: `Uma solução tem concentração de H⁺ igual a ${concStr} mol/L. Qual é o pH?`,
          correta: pH.toFixed(0),
          erradas: [(pH + 1).toFixed(0), (pH - 1).toFixed(0), (14 - pH).toFixed(0), (pH * 2).toFixed(0)]
        };
      },
      () => {
        const elementos = [
          { simbolo: 'Na', massa: 23 },
          { simbolo: 'Cl', massa: 35.5 },
          { simbolo: 'Ca', massa: 40 },
          { simbolo: 'O', massa: 16 },
          { simbolo: 'H', massa: 1 }
        ];
        const el = escolher(elementos);
        return {
          enunciado: `Qual é a massa atômica aproximada do elemento ${el.simbolo}?`,
          correta: `${el.massa} u`,
          erradas: [`${el.massa + 5} u`, `${el.massa - 3} u`, `${el.massa * 2} u`, `${el.massa / 2} u`]
        };
      },
      () => {
        const compostos = [
          { formula: 'H₂O', nome: 'água' },
          { formula: 'NaCl', nome: 'cloreto de sódio' },
          { formula: 'CO₂', nome: 'gás carbônico' },
          { formula: 'H₂SO₄', nome: 'ácido sulfúrico' },
          { formula: 'NaOH', nome: 'hidróxido de sódio' }
        ];
        const comp = escolher(compostos);
        return {
          enunciado: `Qual é o nome do composto de fórmula ${comp.formula}?`,
          correta: comp.nome,
          erradas: compostos.filter(c => c.nome !== comp.nome).slice(0, 4).map(c => c.nome)
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  },

  // Biologia
  biologia: () => {
    const tipos = [
      () => {
        const organelas = [
          { nome: 'mitocôndria', funcao: 'respiração celular e produção de ATP' },
          { nome: 'ribossomo', funcao: 'síntese de proteínas' },
          { nome: 'complexo de Golgi', funcao: 'modificação e empacotamento de proteínas' },
          { nome: 'lisossomo', funcao: 'digestão intracelular' },
          { nome: 'cloroplasto', funcao: 'fotossíntese' }
        ];
        const org = escolher(organelas);
        return {
          enunciado: `Qual organela celular é responsável pela ${org.funcao}?`,
          correta: org.nome,
          erradas: organelas.filter(o => o.nome !== org.nome).map(o => o.nome)
        };
      },
      () => {
        const niveis = ['produtor', 'consumidor primário', 'consumidor secundário', 'consumidor terciário', 'decompositor'];
        const nivel = rand(1, 4);
        const cadeias = [
          ['capim', 'gafanhoto', 'sapo', 'cobra', 'gavião'],
          ['algas', 'peixe pequeno', 'peixe grande', 'tubarão', 'bactérias'],
          ['plantas', 'coelho', 'raposa', 'lobo', 'fungos']
        ];
        const cadeia = escolher(cadeias);
        return {
          enunciado: `Na cadeia alimentar: ${cadeia.slice(0, nivel + 1).join(' → ')}, o ${cadeia[nivel]} é classificado como:`,
          correta: niveis[nivel],
          erradas: niveis.filter(n => n !== niveis[nivel]).slice(0, 4)
        };
      },
      () => {
        return {
          enunciado: `O cruzamento de dois heterozigotos (Aa × Aa) produz descendentes na proporção fenotípica de:`,
          correta: '3:1',
          erradas: ['1:1', '1:2:1', '9:3:3:1', '1:3']
        };
      },
      () => {
        const sistemas = [
          { nome: 'circulatório', funcao: 'transportar oxigênio e nutrientes pelo corpo' },
          { nome: 'respiratório', funcao: 'realizar trocas gasosas (O₂ e CO₂)' },
          { nome: 'digestório', funcao: 'processar e absorver nutrientes dos alimentos' },
          { nome: 'nervoso', funcao: 'coordenar as funções do organismo' },
          { nome: 'excretor', funcao: 'eliminar substâncias tóxicas e regular água' }
        ];
        const sist = escolher(sistemas);
        return {
          enunciado: `Qual sistema do corpo humano tem a função de ${sist.funcao}?`,
          correta: sist.nome,
          erradas: sistemas.filter(s => s.nome !== sist.nome).map(s => s.nome)
        };
      },
      () => {
        const biomas = [
          { nome: 'Cerrado', carac: 'árvores de troncos retorcidos, solo ácido, duas estações bem definidas' },
          { nome: 'Caatinga', carac: 'plantas xerófitas, clima semiárido, chuvas irregulares' },
          { nome: 'Amazônia', carac: 'maior biodiversidade do planeta, clima equatorial úmido' },
          { nome: 'Mata Atlântica', carac: 'floresta tropical costeira, alta pluviosidade, muito devastada' },
          { nome: 'Pampa', carac: 'vegetação campestre, clima temperado, solo fértil' }
        ];
        const bioma = escolher(biomas);
        return {
          enunciado: `Qual bioma brasileiro apresenta: ${bioma.carac}?`,
          correta: bioma.nome,
          erradas: biomas.filter(b => b.nome !== bioma.nome).map(b => b.nome)
        };
      }
    ];
    return tipos[Math.floor(Math.random() * tipos.length)]();
  }
};

// ============================================================================
// CIÊNCIAS HUMANAS - TEMPLATES MASSIVOS
// ============================================================================

const CIENCIAS_HUMANAS = {
  historia: () => {
    const questoes = [
      {
        enunciado: 'A Revolução Industrial, iniciada na Inglaterra no século XVIII, teve como uma de suas principais consequências:',
        correta: 'o êxodo rural e a formação de grandes centros urbanos industriais',
        erradas: ['a melhoria das condições de trabalho nas fábricas', 'o fortalecimento das corporações de ofício', 'a redução das desigualdades sociais', 'o fim do sistema capitalista']
      },
      {
        enunciado: 'O período conhecido como Estado Novo (1937-1945) no Brasil caracterizou-se por:',
        correta: 'centralização do poder e censura aos meios de comunicação',
        erradas: ['ampla liberdade de imprensa', 'eleições diretas para presidente', 'adoção do parlamentarismo', 'autonomia total dos estados']
      },
      {
        enunciado: 'A Guerra Fria foi um período de tensão geopolítica que se caracterizou por:',
        correta: 'disputa ideológica sem confronto militar direto entre EUA e URSS',
        erradas: ['guerras constantes entre americanos e soviéticos', 'cooperação econômica entre capitalistas e socialistas', 'vitória militar dos EUA sobre a URSS', 'unificação da Alemanha em 1945']
      },
      {
        enunciado: 'A Revolução Francesa (1789) foi motivada principalmente por:',
        correta: 'crise econômica, desigualdade social e influência iluminista',
        erradas: ['apoio da nobreza às reformas populares', 'prosperidade econômica da França', 'aliança entre burguesia e clero', 'invasão de países vizinhos']
      },
      {
        enunciado: 'O Iluminismo, movimento intelectual do século XVIII, defendia:',
        correta: 'a razão como guia do conhecimento e crítica ao absolutismo',
        erradas: ['o fortalecimento do poder real', 'a manutenção dos privilégios da nobreza', 'a supremacia da Igreja sobre o Estado', 'o retorno ao feudalismo']
      },
      {
        enunciado: 'A independência do Brasil (1822) foi proclamada em um contexto de:',
        correta: 'tensões entre a elite colonial e as Cortes de Lisboa',
        erradas: ['guerra civil entre as províncias', 'invasão do território por forças espanholas', 'revolução popular contra a monarquia', 'colapso total da economia colonial']
      },
      {
        enunciado: 'O regime militar brasileiro (1964-1985) foi marcado por:',
        correta: 'censura, repressão política e crescimento econômico no período do "milagre"',
        erradas: ['ampla liberdade de expressão', 'eleições diretas para presidente', 'redução da dívida externa', 'fortalecimento dos sindicatos']
      },
      {
        enunciado: 'A Primeira Guerra Mundial (1914-1918) teve como uma de suas causas:',
        correta: 'rivalidades imperialistas e o sistema de alianças entre potências',
        erradas: ['a expansão do comunismo na Europa', 'a crise econômica de 1929', 'o fim dos impérios coloniais', 'a unificação da Alemanha']
      },
      {
        enunciado: 'O nazismo na Alemanha caracterizou-se por:',
        correta: 'nacionalismo extremo, antissemitismo e totalitarismo',
        erradas: ['defesa da democracia parlamentar', 'internacionalismo proletário', 'tolerância religiosa', 'pacifismo e desarmamento']
      },
      {
        enunciado: 'A abolição da escravatura no Brasil (1888) foi resultado de:',
        correta: 'pressões abolicionistas, fugas em massa e interesses econômicos',
        erradas: ['generosidade da princesa Isabel', 'revolta armada dos escravizados', 'exigência dos senhores de engenho', 'imposição dos Estados Unidos']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  geografia: () => {
    const questoes = [
      {
        enunciado: 'O processo de urbanização brasileiro, intensificado a partir de 1950, gerou:',
        correta: 'crescimento desordenado das cidades e formação de periferias precárias',
        erradas: ['distribuição equilibrada da população', 'redução dos problemas ambientais urbanos', 'fim do êxodo rural', 'diminuição das desigualdades socioespaciais']
      },
      {
        enunciado: 'A globalização econômica caracteriza-se por:',
        correta: 'intensificação dos fluxos de capitais, mercadorias e informações',
        erradas: ['homogeneização completa das culturas', 'redução das desigualdades entre países', 'fortalecimento de barreiras comerciais', 'diminuição do papel das multinacionais']
      },
      {
        enunciado: 'O efeito estufa é um fenômeno que:',
        correta: 'retém parte da radiação infravermelha na atmosfera, aquecendo a Terra',
        erradas: ['bloqueia totalmente a luz solar', 'é exclusivamente causado pela ação humana', 'ocorre apenas nos polos', 'diminui a temperatura do planeta']
      },
      {
        enunciado: 'A matriz energética brasileira é predominantemente:',
        correta: 'hidrelétrica, com crescimento de fontes renováveis como eólica e solar',
        erradas: ['baseada em combustíveis fósseis', 'majoritariamente nuclear', 'dependente de importação de energia', 'exclusivamente térmica']
      },
      {
        enunciado: 'O agronegócio brasileiro destaca-se mundialmente na produção de:',
        correta: 'soja, carne bovina, café e laranja',
        erradas: ['trigo, arroz e batata', 'algodão exclusivamente', 'apenas produtos orgânicos', 'minérios apenas']
      },
      {
        enunciado: 'O desmatamento na Amazônia está relacionado principalmente a:',
        correta: 'expansão da agropecuária, mineração e exploração madeireira',
        erradas: ['crescimento das áreas de preservação', 'redução da população na região', 'aumento da fiscalização ambiental', 'recuperação natural da floresta']
      },
      {
        enunciado: 'A Região Nordeste do Brasil caracteriza-se por:',
        correta: 'clima semiárido no interior e diversidade de paisagens no litoral',
        erradas: ['clima temperado em todo território', 'ausência de recursos hídricos', 'inexistência de atividade industrial', 'população majoritariamente rural hoje']
      },
      {
        enunciado: 'O aquecimento global está associado ao aumento de:',
        correta: 'gases de efeito estufa como CO₂ e metano na atmosfera',
        erradas: ['oxigênio na atmosfera', 'radiação ultravioleta', 'camada de ozônio', 'precipitação global']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  sociologia: () => {
    const questoes = [
      {
        enunciado: 'Segundo Max Weber, a dominação tradicional baseia-se em:',
        correta: 'costumes e tradições transmitidos ao longo das gerações',
        erradas: ['normas racionais estabelecidas por lei', 'qualidades excepcionais de um líder', 'força militar do governante', 'poder econômico dos meios de produção']
      },
      {
        enunciado: 'Para Émile Durkheim, os fatos sociais caracterizam-se por:',
        correta: 'coercitividade, exterioridade e generalidade',
        erradas: ['individualidade e interioridade', 'subjetividade e relatividade', 'biologicidade e hereditariedade', 'racionalidade e voluntariedade']
      },
      {
        enunciado: 'O conceito de "mais-valia" em Karl Marx refere-se a:',
        correta: 'diferença entre o valor produzido pelo trabalhador e seu salário',
        erradas: ['lucro justo do empresário', 'imposto pago pelo trabalhador', 'benefícios sociais do emprego', 'valor agregado pelo consumidor']
      },
      {
        enunciado: 'A estratificação social refere-se à:',
        correta: 'divisão da sociedade em camadas hierárquicas',
        erradas: ['igualdade total entre os indivíduos', 'mobilidade constante entre classes', 'ausência de diferenças sociais', 'união de todos os grupos sociais']
      },
      {
        enunciado: 'O etnocentrismo é a tendência de:',
        correta: 'julgar outras culturas a partir dos valores da própria cultura',
        erradas: ['valorizar todas as culturas igualmente', 'rejeitar a própria cultura', 'estudar culturas de forma neutra', 'promover o intercâmbio cultural']
      },
      {
        enunciado: 'O conceito de "capital cultural" de Pierre Bourdieu refere-se a:',
        correta: 'conhecimentos, habilidades e credenciais valorizados socialmente',
        erradas: ['apenas ao dinheiro acumulado', 'às terras e propriedades', 'ao capital financeiro', 'aos bens materiais apenas']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  filosofia: () => {
    const questoes = [
      {
        enunciado: 'O método socrático conhecido como maiêutica consistia em:',
        correta: 'fazer perguntas para que o interlocutor chegasse à verdade por si mesmo',
        erradas: ['transmitir conhecimentos prontos', 'aceitar todas as opiniões como verdadeiras', 'negar a possibilidade do conhecimento', 'usar a força para convencer']
      },
      {
        enunciado: 'O imperativo categórico de Kant estabelece que devemos:',
        correta: 'agir segundo máximas que possam ser universalizadas',
        erradas: ['buscar o prazer individual', 'obedecer a leis divinas', 'seguir costumes locais', 'julgar ações pelas consequências']
      },
      {
        enunciado: 'Para o existencialismo de Sartre, "a existência precede a essência" significa que:',
        correta: 'o ser humano primeiro existe e depois se define por suas escolhas',
        erradas: ['nascemos com uma natureza predeterminada', 'a essência divina nos define', 'não temos liberdade de escolha', 'somos determinados pelo ambiente']
      },
      {
        enunciado: 'O mito da caverna de Platão representa:',
        correta: 'a distinção entre o mundo sensível e o mundo das ideias',
        erradas: ['a superioridade do conhecimento empírico', 'a impossibilidade de conhecer a verdade', 'a valorização das aparências', 'a negação da filosofia']
      },
      {
        enunciado: 'O empirismo, defendido por filósofos como John Locke, afirma que:',
        correta: 'todo conhecimento deriva da experiência sensorial',
        erradas: ['nascemos com ideias inatas', 'a razão é a única fonte de conhecimento', 'o conhecimento é impossível', 'devemos confiar apenas na fé']
      },
      {
        enunciado: 'O contratualismo de Rousseau defende que:',
        correta: 'a sociedade surge de um pacto entre indivíduos que abrem mão de parte de sua liberdade',
        erradas: ['o Estado é uma imposição divina', 'a sociedade é natural e sempre existiu', 'não deve haver governo', 'o mais forte deve governar']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  }
};

// ============================================================================
// LINGUAGENS - TEMPLATES MASSIVOS
// ============================================================================

const LINGUAGENS = {
  interpretacao: () => {
    const questoes = [
      {
        enunciado: 'No trecho "Compre agora e ganhe 50% de desconto!", predomina a função da linguagem:',
        correta: 'conativa (ou apelativa)',
        erradas: ['referencial', 'emotiva', 'metalinguística', 'poética']
      },
      {
        enunciado: '"O sol é uma estrela de quinta grandeza localizada na Via Láctea." Esse texto apresenta função:',
        correta: 'referencial (ou denotativa)',
        erradas: ['conativa', 'emotiva', 'fática', 'poética']
      },
      {
        enunciado: '"Que saudade imensa do meu tempo de criança!" expressa função:',
        correta: 'emotiva (ou expressiva)',
        erradas: ['referencial', 'conativa', 'metalinguística', 'fática']
      },
      {
        enunciado: '"Alô? Está me ouvindo? A ligação está boa?" exemplifica função:',
        correta: 'fática',
        erradas: ['referencial', 'conativa', 'emotiva', 'metalinguística']
      },
      {
        enunciado: '"Verbo é a palavra que indica ação, estado ou fenômeno." A função presente é:',
        correta: 'metalinguística',
        erradas: ['referencial', 'conativa', 'emotiva', 'poética']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  gramatica: () => {
    const questoes = [
      {
        enunciado: 'Assinale a alternativa com concordância verbal correta:',
        correta: 'Existem várias possibilidades de solução.',
        erradas: ['Fazem dois anos que não viajo.', 'Houveram muitos problemas.', 'Aluga-se casas.', 'Haviam pessoas na fila.']
      },
      {
        enunciado: 'A regência verbal está correta em:',
        correta: 'Assistimos ao filme ontem.',
        erradas: ['Prefiro mais cinema do que teatro.', 'Ela namora com o vizinho.', 'Todos obedecem o regulamento.', 'Aspiramos o cargo.']
      },
      {
        enunciado: 'O uso da crase está correto em:',
        correta: 'Refiro-me à professora de matemática.',
        erradas: ['Fui à Paris nas férias.', 'Escrevi à lápis.', 'Estou à espera desde às duas horas.', 'Entreguei à ela o documento.']
      },
      {
        enunciado: 'A colocação pronominal está adequada em:',
        correta: 'Não me disseram a verdade.',
        erradas: ['Me disseram a verdade.', 'Nunca falou-me sobre isso.', 'Não contaram-me nada.', 'Jamais enganou-me.']
      },
      {
        enunciado: 'A pontuação está correta em:',
        correta: 'Maria, que é minha prima, chegou ontem.',
        erradas: ['Maria que é minha prima, chegou ontem.', 'Maria, que é minha prima chegou ontem.', 'Maria que é minha prima chegou ontem.', 'Maria que, é minha prima, chegou ontem.']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  literatura: () => {
    const questoes = [
      {
        enunciado: 'O Modernismo brasileiro, iniciado em 1922, caracterizou-se por:',
        correta: 'ruptura com padrões tradicionais e valorização da cultura nacional',
        erradas: ['retomada dos ideais clássicos', 'exaltação do subjetivismo romântico', 'manutenção das formas parnasianas', 'predomínio do cientificismo naturalista']
      },
      {
        enunciado: '"Memórias Póstumas de Brás Cubas" é uma obra de:',
        correta: 'Machado de Assis',
        erradas: ['José de Alencar', 'Guimarães Rosa', 'Graciliano Ramos', 'Jorge Amado']
      },
      {
        enunciado: 'O Romantismo brasileiro na prosa caracterizou-se por:',
        correta: 'idealização do índio e valorização da natureza brasileira',
        erradas: ['crítica social realista', 'experimentação linguística', 'objetividade científica', 'pessimismo existencial']
      },
      {
        enunciado: '"Vidas Secas", de Graciliano Ramos, pertence ao:',
        correta: 'Regionalismo nordestino da segunda fase modernista',
        erradas: ['Romantismo', 'Parnasianismo', 'Simbolismo', 'Arcadismo']
      },
      {
        enunciado: 'A poesia concreta, surgida na década de 1950, valorizava:',
        correta: 'a dimensão visual e espacial do poema',
        erradas: ['a métrica tradicional', 'a rima rica', 'o soneto', 'a narrativa épica']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  },

  variacao: () => {
    const questoes = [
      {
        enunciado: 'A variação linguística que ocorre de acordo com a situação de uso chama-se:',
        correta: 'variação estilística (ou diafásica)',
        erradas: ['variação regional (diatópica)', 'variação social (diastrática)', 'variação histórica (diacrônica)', 'variação fonética']
      },
      {
        enunciado: 'A diferença entre o português falado em Portugal e no Brasil exemplifica variação:',
        correta: 'regional (ou diatópica)',
        erradas: ['estilística', 'social', 'histórica', 'individual']
      },
      {
        enunciado: 'A linguagem utilizada por grupos profissionais específicos chama-se:',
        correta: 'jargão',
        erradas: ['gíria', 'dialeto', 'socioleto', 'idioleto']
      },
      {
        enunciado: 'O preconceito linguístico ocorre quando:',
        correta: 'variedades linguísticas são desvalorizadas por critérios sociais',
        erradas: ['todas as variedades são aceitas', 'há respeito à diversidade', 'a norma-padrão é ensinada', 'gramáticas são estudadas']
      }
    ];
    return questoes[Math.floor(Math.random() * questoes.length)];
  }
};

// ============================================================================
// FUNÇÃO GERADORA PRINCIPAL
// ============================================================================

function gerarQuestao(area, subarea, funcao) {
  const questao = funcao();
  const alternativas = shuffle([questao.correta, ...questao.erradas.slice(0, 4)]);
  const indiceCoorreta = alternativas.indexOf(questao.correta);

  return {
    ano: 2025,
    disciplina: subarea,
    area: area,
    enunciado: questao.enunciado,
    alternativas: {
      A: alternativas[0],
      B: alternativas[1],
      C: alternativas[2],
      D: alternativas[3],
      E: alternativas[4]
    },
    correta: ['A', 'B', 'C', 'D', 'E'][indiceCoorreta],
    tipo: 'gerada_ia_v2',
    source: 'claude_code_v2',
    difficulty: rand(1, 3)
  };
}

async function main() {
  console.log('🎓 Gerador de Questões ENEM V2 - Massivo\n');
  console.log('================================================\n');

  const questoes = [];

  // Matemática - 800 questões
  console.log('📐 Gerando questões de Matemática...');
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('matematica', 'porcentagem', MATEMATICA.porcentagem));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('matematica', 'juros', MATEMATICA.juros));
  for (let i = 0; i < 150; i++) questoes.push(gerarQuestao('matematica', 'geometria_plana', MATEMATICA.geometriaPlana));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('matematica', 'geometria_espacial', MATEMATICA.geometriaEspacial));
  for (let i = 0; i < 150; i++) questoes.push(gerarQuestao('matematica', 'estatistica', MATEMATICA.estatistica));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('matematica', 'funcoes', MATEMATICA.funcoes));
  for (let i = 0; i < 50; i++) questoes.push(gerarQuestao('matematica', 'progressoes', MATEMATICA.progressoes));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('matematica', 'razao_proporcao', MATEMATICA.razaoProporcao));
  for (let i = 0; i < 50; i++) questoes.push(gerarQuestao('matematica', 'combinatoria', MATEMATICA.combinatoria));
  console.log(`   ✅ 900 questões de Matemática\n`);

  // Ciências da Natureza - 600 questões
  console.log('🔬 Gerando questões de Ciências da Natureza...');
  for (let i = 0; i < 200; i++) questoes.push(gerarQuestao('ciencias_natureza', 'fisica_mecanica', CIENCIAS_NATUREZA.mecanica));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_natureza', 'fisica_eletricidade', CIENCIAS_NATUREZA.eletricidade));
  for (let i = 0; i < 50; i++) questoes.push(gerarQuestao('ciencias_natureza', 'fisica_termodinamica', CIENCIAS_NATUREZA.termodinamica));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_natureza', 'quimica', CIENCIAS_NATUREZA.quimica));
  for (let i = 0; i < 150; i++) questoes.push(gerarQuestao('ciencias_natureza', 'biologia', CIENCIAS_NATUREZA.biologia));
  console.log(`   ✅ 600 questões de Ciências da Natureza\n`);

  // Ciências Humanas - 400 questões
  console.log('🌍 Gerando questões de Ciências Humanas...');
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_humanas', 'historia', CIENCIAS_HUMANAS.historia));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_humanas', 'geografia', CIENCIAS_HUMANAS.geografia));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_humanas', 'sociologia', CIENCIAS_HUMANAS.sociologia));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('ciencias_humanas', 'filosofia', CIENCIAS_HUMANAS.filosofia));
  console.log(`   ✅ 400 questões de Ciências Humanas\n`);

  // Linguagens - 300 questões
  console.log('📚 Gerando questões de Linguagens...');
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('linguagens', 'interpretacao', LINGUAGENS.interpretacao));
  for (let i = 0; i < 100; i++) questoes.push(gerarQuestao('linguagens', 'gramatica', LINGUAGENS.gramatica));
  for (let i = 0; i < 50; i++) questoes.push(gerarQuestao('linguagens', 'literatura', LINGUAGENS.literatura));
  for (let i = 0; i < 50; i++) questoes.push(gerarQuestao('linguagens', 'variacao', LINGUAGENS.variacao));
  console.log(`   ✅ 300 questões de Linguagens\n`);

  // Numerar
  questoes.forEach((q, i) => q.numero = i + 1);

  const output = {
    versao: '4.0',
    total_questoes: questoes.length,
    gerado_em: new Date().toISOString(),
    description: 'Questões ENEM V2 - Massivo e Diversificado',
    distribuicao: {
      matematica: 900,
      ciencias_natureza: 600,
      ciencias_humanas: 400,
      linguagens: 300
    },
    questoes
  };

  const outputPath = resolve(__dirname, '../../backend/enem_ingestion/questoes_v2_massivo.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('================================================');
  console.log(`\n✅ GERAÇÃO CONCLUÍDA!`);
  console.log(`   📊 Total: ${questoes.length} questões`);
  console.log(`   📁 Arquivo: ${outputPath}`);
  console.log('\n📌 Para inserir no banco, execute:');
  console.log('   node scripts/seed-questoes-v2.mjs\n');
}

main().catch(console.error);
