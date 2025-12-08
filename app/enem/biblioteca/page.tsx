'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Modulo {
  id: string;
  titulo: string;
  concluido: boolean;
  conteudo: {
    resumo: string;
    topicos: string[];
    exemplos?: string[];
    dicas?: string[];
    formula?: string;
  };
}

interface Caderno {
  id: string;
  titulo: string;
  categoria: string;
  nivel: 'Basico' | 'Intermediario' | 'Avancado';
  descricao: string;
  icone: string;
  cor: string;
  modulos: Modulo[];
  progresso: number;
  tempoEstimado: string;
  fpRecompensa: number;
  tags: string[];
}

const CATEGORIAS = [
  { id: 'todos', nome: 'Todos', emoji: '📚', cor: 'from-purple-500 to-pink-500' },
  { id: 'linguagens', nome: 'Linguagens', emoji: '📖', cor: 'from-blue-500 to-cyan-500' },
  { id: 'humanas', nome: 'Humanas', emoji: '🌍', cor: 'from-orange-500 to-red-500' },
  { id: 'natureza', nome: 'Natureza', emoji: '🔬', cor: 'from-green-500 to-emerald-500' },
  { id: 'matematica', nome: 'Matematica', emoji: '📐', cor: 'from-yellow-500 to-orange-500' },
  { id: 'redacao', nome: 'Redacao', emoji: '✍️', cor: 'from-pink-500 to-rose-500' },
];

const CADERNOS_DATA: Caderno[] = [
  // ==================== LINGUAGENS ====================
  {
    id: 'ling-1',
    titulo: 'Interpretacao de Texto',
    categoria: 'linguagens',
    nivel: 'Basico',
    descricao: 'Domine as tecnicas de leitura e interpretacao textual.',
    icone: '📝',
    cor: 'from-blue-500 to-cyan-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Tipos de Texto',
        concluido: false,
        conteudo: {
          resumo: 'Os textos podem ser classificados em diferentes tipos conforme sua funcao comunicativa e estrutura.',
          topicos: [
            'NARRATIVO: Conta uma historia com personagens, tempo, espaco e enredo. Ex: contos, romances, cronicas.',
            'DESCRITIVO: Detalha caracteristicas de pessoas, objetos ou lugares. Usa adjetivos e linguagem sensorial.',
            'DISSERTATIVO: Expoe ideias e argumentos. Pode ser expositivo (informa) ou argumentativo (convence).',
            'INJUNTIVO: Da instrucoes ou ordens. Ex: receitas, manuais, leis.',
            'DIALOGAL: Apresenta conversas entre personagens. Ex: entrevistas, pecas teatrais.'
          ],
          exemplos: [
            'Narrativo: "Era uma vez uma menina que morava na floresta..."',
            'Descritivo: "A casa era grande, com paredes brancas e janelas azuis..."',
            'Dissertativo: "A educacao e fundamental para o desenvolvimento social..."'
          ],
          dicas: [
            'No ENEM, identifique o tipo textual pela INTENCAO do autor',
            'Textos podem misturar tipos - identifique o PREDOMINANTE',
            'Preste atencao nos verbos: narrar usa passado, injuntivo usa imperativo'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Inferencia e Deducao',
        concluido: false,
        conteudo: {
          resumo: 'Inferir e deduzir significa "ler nas entrelinhas" - entender o que o texto sugere sem dizer explicitamente.',
          topicos: [
            'INFERENCIA: Conclusao baseada em pistas do texto + conhecimento previo',
            'DEDUCAO: Conclusao logica a partir de premissas apresentadas',
            'PRESSUPOSTOS: Informacoes implicitas necessarias para entender o texto',
            'SUBENTENDIDOS: Informacoes sugeridas, mas nao ditas diretamente'
          ],
          exemplos: [
            '"Joao parou de fumar" → Pressuposto: Joao fumava antes',
            '"Maria chegou atrasada DE NOVO" → Pressuposto: Ja chegou atrasada outras vezes',
            '"O time jogou bem, MAS perdeu" → Subentendido: Esperava-se vitoria'
          ],
          dicas: [
            'Palavras como "ainda", "ja", "de novo" indicam pressupostos',
            'Conjuncoes adversativas (mas, porem) indicam quebra de expectativa',
            'Pergunte-se: "O que o autor quer que eu entenda sem dizer?"'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Figuras de Linguagem',
        concluido: false,
        conteudo: {
          resumo: 'Figuras de linguagem sao recursos expressivos que dao mais forca e beleza ao texto.',
          topicos: [
            'METAFORA: Comparacao implicita. "A vida e um sonho."',
            'COMPARACAO/SIMILE: Comparacao explicita com "como". "Ela e forte como um touro."',
            'METONIMIA: Troca de um termo por outro relacionado. "Li Machado" (= obras de Machado)',
            'IRONIA: Diz o contrario do que pensa. "Que lindo! Tirou zero na prova."',
            'HIPERBOLE: Exagero. "Estou morrendo de fome."',
            'EUFEMISMO: Suaviza algo desagradavel. "Ele foi desta para melhor" (= morreu)',
            'PERSONIFICACAO: Atribui caracteristicas humanas a seres/objetos. "O sol sorriu."',
            'ANTITESE: Oposicao de ideias. "Amor e odio caminham juntos."'
          ],
          dicas: [
            'METAFORA nao usa "como" - COMPARACAO usa',
            'METONIMIA: parte pelo todo, autor pela obra, marca pelo produto',
            'IRONIA: o contexto revela o sentido oposto'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Contexto e Intertextualidade',
        concluido: false,
        conteudo: {
          resumo: 'Todo texto dialoga com outros textos e com o contexto historico-social em que foi produzido.',
          topicos: [
            'CONTEXTO DE PRODUCAO: Quando, onde e por que o texto foi escrito',
            'CONTEXTO DE RECEPCAO: Como o leitor atual interpreta o texto',
            'INTERTEXTUALIDADE: Dialogo entre textos - citacao, alusao, parodia',
            'CITACAO: Reproducao literal de outro texto (com aspas)',
            'ALUSAO: Referencia indireta a outro texto ou fato',
            'PARODIA: Imitacao comica de outro texto'
          ],
          exemplos: [
            'Alusao: "Foi um verdadeiro Waterloo" (referencia a derrota de Napoleao)',
            'Parodia: "Batatinha quando nasce, cai no IPI" (parodia de cantiga)',
            'Citacao: Como disse Drummond: "No meio do caminho tinha uma pedra"'
          ],
          dicas: [
            'O ENEM adora questoes de intertextualidade',
            'Conheca os classicos da literatura brasileira',
            'Relacione textos antigos com temas atuais'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 75,
    tags: ['texto', 'leitura']
  },
  {
    id: 'ling-2',
    titulo: 'Literatura Brasileira',
    categoria: 'linguagens',
    nivel: 'Intermediario',
    descricao: 'Explore os movimentos literarios e obras essenciais.',
    icone: '📚',
    cor: 'from-blue-500 to-cyan-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Barroco e Arcadismo',
        concluido: false,
        conteudo: {
          resumo: 'O Barroco (sec. XVII) expressa conflitos entre fe e razao. O Arcadismo (sec. XVIII) busca simplicidade e natureza.',
          topicos: [
            'BARROCO (1601-1768): Dualidade, conflito entre carne e espirito',
            'Caracteristicas: antiteses, metaforas elaboradas, fusao do sacro e profano',
            'Autores: Gregorio de Matos (poeta), Padre Antonio Vieira (sermoes)',
            'ARCADISMO (1768-1836): Bucolismo, idealizacao da vida campestre',
            'Caracteristicas: linguagem simples, pseudonimos pastorais, carpe diem',
            'Autores: Claudio Manuel da Costa, Tomas Antonio Gonzaga (Marilia de Dirceu)'
          ],
          exemplos: [
            'Barroco - Gregorio: "O todo sem a parte nao e todo / A parte sem o todo nao e parte"',
            'Arcadismo - Gonzaga: "Eu, Marilia, nao sou algum vaqueiro"'
          ],
          dicas: [
            'Barroco = CONFLITO, DUALIDADE, EXAGERO',
            'Arcadismo = SIMPLICIDADE, NATUREZA, EQUILIBRIO',
            'Lembre: Arcadismo e a "reacao" ao exagero barroco'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Romantismo',
        concluido: false,
        conteudo: {
          resumo: 'O Romantismo (1836-1881) valoriza emocao, subjetividade, nacionalismo e liberdade criativa.',
          topicos: [
            '1a GERACAO (Indianista/Nacionalista): Exaltacao da patria e do indio',
            'Autores: Goncalves Dias (I-Juca-Pirama), Jose de Alencar (Iracema, O Guarani)',
            '2a GERACAO (Ultra-romantica/Mal do Seculo): Pessimismo, morte, amor impossivel',
            'Autores: Alvares de Azevedo, Casimiro de Abreu, Fagundes Varela',
            '3a GERACAO (Condoreira/Social): Poesia engajada, abolicionismo',
            'Autores: Castro Alves (Navio Negreiro), Sousandrade'
          ],
          exemplos: [
            '1a Geracao: "Minha terra tem palmeiras onde canta o sabia" - Goncalves Dias',
            '2a Geracao: "Se eu morresse amanha" - Alvares de Azevedo',
            '3a Geracao: "Deus! O Deus! Onde estas que nao respondes?" - Castro Alves'
          ],
          dicas: [
            '1a = INDIO e PATRIA',
            '2a = MORTE e SOFRIMENTO',
            '3a = LIBERDADE e DENUNCIA SOCIAL'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Realismo e Naturalismo',
        concluido: false,
        conteudo: {
          resumo: 'Realismo (1881-1893) critica a sociedade com objetividade. Naturalismo radicaliza com determinismo biologico.',
          topicos: [
            'REALISMO: Objetividade, critica social, analise psicologica',
            'Machado de Assis: maior autor brasileiro. Obras: Dom Casmurro, Memorias Postumas de Bras Cubas',
            'Caracteristicas machadianas: ironia fina, narrador nao-confiavel, metalinguagem',
            'NATURALISMO: Determinismo (raca, meio, momento), zoomorfizacao',
            'Aluisio Azevedo: O Cortico (retrato dos coricos cariocas)',
            'Diferencas: Realismo = psicologico / Naturalismo = biologico e social'
          ],
          exemplos: [
            'Machado: "Marcela amou-me durante quinze meses e onze contos de reis"',
            'O Cortico: Personagens comparados a animais, instintos primitivos'
          ],
          dicas: [
            'Machado de Assis e o autor MAIS COBRADO no ENEM',
            'Conheca bem Dom Casmurro (Capitu traiu ou nao?)',
            'Naturalismo = visao cientificista do ser humano'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Modernismo',
        concluido: false,
        conteudo: {
          resumo: 'O Modernismo (1922-1945) rompe com tradicoes e busca identidade brasileira autentica.',
          topicos: [
            '1a FASE (1922-1930): Ruptura, experimentacao, humor, nacionalismo critico',
            'Semana de Arte Moderna (1922): Marco inicial em Sao Paulo',
            'Autores: Oswald de Andrade (Pau-Brasil), Mario de Andrade (Macunaima), Manuel Bandeira',
            '2a FASE (1930-1945): Romance regionalista, denuncia social',
            'Autores: Graciliano Ramos (Vidas Secas), Rachel de Queiroz, Jorge Amado',
            '3a FASE (1945-): Experimentacao formal, poesia concreta',
            'Autores: Guimaraes Rosa, Clarice Lispector, Joao Cabral de Melo Neto'
          ],
          exemplos: [
            '1a Fase: "Aprendi com meu filho de dez anos que poesia e a descoberta das coisas que nunca vi"',
            '2a Fase: "Fabiano, voce e um bicho" - Vidas Secas',
            '3a Fase: "O sertao e dentro da gente" - Guimaraes Rosa'
          ],
          dicas: [
            'Semana de 22 = RUPTURA com academicismo',
            '2a fase = REGIONALISMO e CRITICA SOCIAL',
            'Guimaraes Rosa e Clarice sao cobrados por INOVACAO'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 75,
    tags: ['literatura', 'autores']
  },

  // ==================== MATEMATICA ====================
  {
    id: 'mat-1',
    titulo: 'Razao, Proporcao e Porcentagem',
    categoria: 'matematica',
    nivel: 'Basico',
    descricao: 'Fundamentos mais cobrados no ENEM.',
    icone: '➗',
    cor: 'from-yellow-500 to-orange-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Razao e Proporcao',
        concluido: false,
        conteudo: {
          resumo: 'Razao e a divisao entre duas grandezas. Proporcao e a igualdade entre duas razoes.',
          topicos: [
            'RAZAO: a/b (lemos "a esta para b"). Ex: 3 meninas para 2 meninos = 3/2',
            'PROPORCAO: a/b = c/d. Propriedade fundamental: a×d = b×c',
            'GRANDEZAS DIRETAMENTE PROPORCIONAIS: Aumenta uma, aumenta a outra na mesma razao',
            'GRANDEZAS INVERSAMENTE PROPORCIONAIS: Aumenta uma, diminui a outra'
          ],
          formula: 'Proporcao: a/b = c/d → a×d = b×c (multiplicacao cruzada)',
          exemplos: [
            'Se 3 canetas custam R$12, quanto custam 5? → 3/12 = 5/x → x = R$20',
            'Velocidade e tempo sao inversamente proporcionais (dobra velocidade, metade do tempo)'
          ],
          dicas: [
            'Identifique se as grandezas sao DIRETAS ou INVERSAS',
            'Regra de tres e a aplicacao direta de proporcao',
            'ENEM adora contextos do cotidiano'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Regra de Tres Simples',
        concluido: false,
        conteudo: {
          resumo: 'Metodo pratico para resolver problemas de proporcao entre duas grandezas.',
          topicos: [
            'PASSO 1: Identifique as duas grandezas',
            'PASSO 2: Verifique se sao direta ou inversamente proporcionais',
            'PASSO 3: Monte a proporcao e resolva',
            'DIRETA: Setas no mesmo sentido | INVERSA: Setas em sentidos opostos'
          ],
          formula: 'Direta: a/b = c/x | Inversa: a/b = x/c',
          exemplos: [
            'DIRETA: 5 operarios fazem 100 pecas. 8 operarios fazem quantas? → 5/100 = 8/x → x=160',
            'INVERSA: 4 torneiras enchem tanque em 6h. 3 torneiras enchem em quanto tempo? → 4×6 = 3×x → x=8h'
          ],
          dicas: [
            'Mais trabalhadores = mais producao (direta)',
            'Mais trabalhadores = menos tempo (inversa)',
            'Sempre pergunte: "Se uma aumenta, a outra...?"'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Porcentagem',
        concluido: false,
        conteudo: {
          resumo: 'Porcentagem e uma razao de denominador 100. Fundamental para o ENEM!',
          topicos: [
            'x% = x/100. Ex: 25% = 25/100 = 0,25',
            'CALCULAR x% de N: (x/100) × N ou 0,0x × N',
            'AUMENTO de x%: Valor × (1 + x/100)',
            'DESCONTO de x%: Valor × (1 - x/100)',
            'AUMENTOS SUCESSIVOS: Multiplica os fatores'
          ],
          formula: 'Aumento: V × 1,x | Desconto: V × 0,x | Exemplo: +20% = ×1,20 | -20% = ×0,80',
          exemplos: [
            '30% de 200 = 0,30 × 200 = 60',
            'Produto de R$100 com 20% de desconto: 100 × 0,80 = R$80',
            'Dois aumentos de 10%: 1,10 × 1,10 = 1,21 = 21% de aumento total (nao 20%!)'
          ],
          dicas: [
            'CUIDADO: Aumentos sucessivos NAO se somam!',
            'Desconto sobre desconto: multiplique os fatores',
            'Para achar a porcentagem: (parte/total) × 100'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Juros Simples e Compostos',
        concluido: false,
        conteudo: {
          resumo: 'Juros simples crescem linearmente; juros compostos crescem exponencialmente.',
          topicos: [
            'JUROS SIMPLES: J = C × i × t (juros sobre o capital inicial)',
            'MONTANTE SIMPLES: M = C + J = C(1 + i×t)',
            'JUROS COMPOSTOS: M = C × (1 + i)^t (juros sobre juros)',
            'C = capital | i = taxa (em decimal) | t = tempo | M = montante'
          ],
          formula: 'Simples: M = C(1 + i×t) | Composto: M = C(1 + i)^t',
          exemplos: [
            'R$1000 a 10% a.m. por 3 meses (simples): M = 1000(1 + 0,1×3) = R$1300',
            'R$1000 a 10% a.m. por 3 meses (composto): M = 1000(1,1)³ = R$1331'
          ],
          dicas: [
            'ENEM usa mais juros compostos (situacoes reais)',
            'Converta a taxa para decimal: 5% = 0,05',
            'Tempo e taxa devem estar na mesma unidade'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 75,
    tags: ['matematica', 'proporcao', 'porcentagem']
  },
  {
    id: 'mat-2',
    titulo: 'Funcoes',
    categoria: 'matematica',
    nivel: 'Intermediario',
    descricao: 'Funcoes afim, quadratica, exponencial e logaritmica.',
    icone: '📈',
    cor: 'from-yellow-500 to-orange-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Funcao Afim (1o Grau)',
        concluido: false,
        conteudo: {
          resumo: 'Funcao do tipo f(x) = ax + b, cujo grafico e uma reta.',
          topicos: [
            'FORMA: f(x) = ax + b, onde a ≠ 0',
            'a = coeficiente angular (inclinacao da reta)',
            'b = coeficiente linear (onde corta o eixo y)',
            'a > 0: funcao CRESCENTE | a < 0: funcao DECRESCENTE',
            'RAIZ (zero): x = -b/a (onde corta o eixo x)'
          ],
          formula: 'f(x) = ax + b | Raiz: x = -b/a',
          exemplos: [
            'f(x) = 2x + 3: a=2 (crescente), b=3, raiz: x=-3/2',
            'Taxi: Preco = 5 + 2×km → f(x) = 2x + 5 (5 e bandeirada, 2 e preco/km)'
          ],
          dicas: [
            'ENEM contextualiza: tarifas, custos, velocidade',
            'Para achar a funcao, use dois pontos conhecidos',
            'O sinal de "a" determina se CRESCE ou DECRESCE'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Funcao Quadratica (2o Grau)',
        concluido: false,
        conteudo: {
          resumo: 'Funcao do tipo f(x) = ax² + bx + c, cujo grafico e uma parabola.',
          topicos: [
            'FORMA: f(x) = ax² + bx + c, onde a ≠ 0',
            'a > 0: parabola com CONCAVIDADE PARA CIMA (ponto de MINIMO)',
            'a < 0: parabola com CONCAVIDADE PARA BAIXO (ponto de MAXIMO)',
            'RAIZES: x = (-b ± √Δ) / 2a, onde Δ = b² - 4ac',
            'VERTICE: xv = -b/2a | yv = -Δ/4a'
          ],
          formula: 'Bhaskara: x = (-b ± √Δ)/2a | Δ = b² - 4ac | Vertice: (-b/2a, -Δ/4a)',
          exemplos: [
            'f(x) = x² - 5x + 6: Δ=1, raizes x=2 e x=3, vertice (2.5, -0.25)',
            'Lancamento: h(t) = -5t² + 20t → altura maxima quando t = -20/(2×-5) = 2s'
          ],
          dicas: [
            'Δ > 0: duas raizes | Δ = 0: uma raiz | Δ < 0: sem raiz real',
            'Problemas de MAXIMO/MINIMO usam o vertice',
            'ENEM: lancamentos, lucro maximo, area maxima'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Funcao Exponencial',
        concluido: false,
        conteudo: {
          resumo: 'Funcao do tipo f(x) = aˣ, modela crescimento/decrescimento rapido.',
          topicos: [
            'FORMA: f(x) = aˣ, onde a > 0 e a ≠ 1',
            'a > 1: funcao CRESCENTE (crescimento exponencial)',
            '0 < a < 1: funcao DECRESCENTE (decaimento exponencial)',
            'Sempre passa pelo ponto (0, 1), pois a⁰ = 1',
            'Nunca toca o eixo x (asintota horizontal)'
          ],
          formula: 'f(x) = aˣ | Propriedades: aˣ × aʸ = aˣ⁺ʸ | (aˣ)ʸ = aˣʸ',
          exemplos: [
            'Populacao que dobra: P(t) = P₀ × 2ᵗ',
            'Decaimento radioativo: N(t) = N₀ × (1/2)ᵗ (meia-vida)',
            'Juros compostos: M = C × (1+i)ᵗ e exponencial!'
          ],
          dicas: [
            'ENEM: populacao, juros, decaimento, bacterias',
            'Compare as bases para resolver equacoes',
            'Use logaritmo para "isolar" o expoente'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Funcao Logaritmica',
        concluido: false,
        conteudo: {
          resumo: 'Funcao inversa da exponencial. log_a(x) = y significa aʸ = x.',
          topicos: [
            'DEFINICAO: log_a(x) = y ⟺ aʸ = x',
            'Condicoes: a > 0, a ≠ 1, x > 0',
            'log_a(1) = 0 | log_a(a) = 1',
            'PROPRIEDADES:',
            'log(A×B) = log(A) + log(B)',
            'log(A/B) = log(A) - log(B)',
            'log(Aⁿ) = n × log(A)'
          ],
          formula: 'log_a(x) = y ⟺ aʸ = x | Mudanca de base: log_a(x) = log_b(x)/log_b(a)',
          exemplos: [
            'log₂(8) = 3, pois 2³ = 8',
            'log(1000) = 3, pois 10³ = 1000 (log na base 10)',
            'ln(e²) = 2 (ln e o log na base e ≈ 2,718)'
          ],
          dicas: [
            'Para resolver: transforme em exponencial',
            'log sem base indicada = base 10',
            'ln = logaritmo natural (base e)'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 75,
    tags: ['matematica', 'funcoes']
  },
  {
    id: 'mat-3',
    titulo: 'Geometria Plana',
    categoria: 'matematica',
    nivel: 'Intermediario',
    descricao: 'Areas, perimetros e relacoes geometricas.',
    icone: '📐',
    cor: 'from-yellow-500 to-orange-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Triangulos',
        concluido: false,
        conteudo: {
          resumo: 'Triangulo e o poligono de 3 lados. A soma dos angulos internos e sempre 180°.',
          topicos: [
            'CLASSIFICACAO POR LADOS: Equilatero (3 iguais), Isosceles (2 iguais), Escaleno (todos diferentes)',
            'CLASSIFICACAO POR ANGULOS: Acutangulo, Retangulo (90°), Obtusangulo',
            'AREA: A = (base × altura) / 2',
            'TEOREMA DE PITAGORAS (retangulo): a² = b² + c² (hipotenusa² = catetos²)',
            'Triangulos notaveis: 30-60-90 e 45-45-90'
          ],
          formula: 'Area = b×h/2 | Pitagoras: a² = b² + c² | Equilatero: A = L²√3/4',
          exemplos: [
            'Triangulo base 6, altura 4: A = 6×4/2 = 12',
            'Triangulo retangulo 3-4-5: 5² = 3² + 4² ✓',
            'Triangulo 30-60-90: lados proporcionais a 1, √3, 2'
          ],
          dicas: [
            'ENEM ama triangulo retangulo e Pitagoras',
            'Memorize: 3-4-5, 5-12-13, 8-15-17',
            'Em triangulo equilatero, altura = L√3/2'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Quadrilateros',
        concluido: false,
        conteudo: {
          resumo: 'Quadrilateros sao poligonos de 4 lados. Soma dos angulos internos = 360°.',
          topicos: [
            'QUADRADO: 4 lados iguais, 4 angulos retos. A = L²',
            'RETANGULO: Lados opostos iguais, 4 angulos retos. A = b × h',
            'PARALELOGRAMO: Lados opostos paralelos. A = b × h',
            'LOSANGO: 4 lados iguais. A = (D × d) / 2 (diagonais)',
            'TRAPEZIO: Apenas 2 lados paralelos. A = (B + b) × h / 2'
          ],
          formula: 'Quadrado: A = L² | Retangulo: A = b×h | Trapezio: A = (B+b)×h/2',
          exemplos: [
            'Quadrado lado 5: A = 25, perimetro = 20',
            'Retangulo 3×4: A = 12, diagonal = 5 (Pitagoras)',
            'Trapezio bases 6 e 4, altura 3: A = (6+4)×3/2 = 15'
          ],
          dicas: [
            'Diagonal do quadrado = L√2',
            'Diagonal do retangulo: d² = b² + h²',
            'Losango: diagonais perpendiculares'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Circunferencia e Circulo',
        concluido: false,
        conteudo: {
          resumo: 'Circunferencia e a linha curva; circulo e a regiao interna.',
          topicos: [
            'CIRCUNFERENCIA: C = 2πr (perimetro)',
            'CIRCULO: A = πr² (area)',
            'ARCO: Parte da circunferencia',
            'SETOR CIRCULAR: "Fatia de pizza". A = (θ/360°) × πr²',
            'COROA CIRCULAR: A = π(R² - r²) (entre dois circulos concentricos)'
          ],
          formula: 'Comprimento: C = 2πr | Area: A = πr² | Setor: A = θπr²/360',
          exemplos: [
            'Circulo raio 3: C = 6π, A = 9π',
            'Setor de 90° raio 4: A = (90/360)×π×16 = 4π',
            'Coroa R=5, r=3: A = π(25-9) = 16π'
          ],
          dicas: [
            'Use π ≈ 3,14 se nao pedir valor exato',
            'ENEM: rodas, pizzas, relogios, pistas circulares',
            'Arco de 180° = semicirculo'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Poligonos Regulares',
        concluido: false,
        conteudo: {
          resumo: 'Poligonos regulares tem todos os lados e angulos iguais.',
          topicos: [
            'SOMA DOS ANGULOS INTERNOS: S = (n-2) × 180°',
            'ANGULO INTERNO: Ai = (n-2) × 180° / n',
            'NUMERO DE DIAGONAIS: D = n(n-3) / 2',
            'HEXAGONO REGULAR: Formado por 6 triangulos equilateros. A = (3L²√3)/2',
            'APOTEMA: Distancia do centro ao lado (importante para area)'
          ],
          formula: 'Soma ang. = (n-2)×180° | Diagonais = n(n-3)/2 | Area = perimetro×apotema/2',
          exemplos: [
            'Pentagono: S = 3×180° = 540°, cada angulo = 108°',
            'Hexagono: S = 4×180° = 720°, cada angulo = 120°, 9 diagonais',
            'Octogono: S = 6×180° = 1080°, cada angulo = 135°'
          ],
          dicas: [
            'n=3 (triangulo), n=4 (quadrado), n=5 (pentagono), n=6 (hexagono)',
            'Hexagono regular e muito cobrado (colmeias, pisos)',
            'Area geral: A = (perimetro × apotema) / 2'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 75,
    tags: ['matematica', 'geometria']
  },

  // ==================== CIENCIAS DA NATUREZA ====================
  {
    id: 'nat-1',
    titulo: 'Mecanica - Fisica',
    categoria: 'natureza',
    nivel: 'Intermediario',
    descricao: 'Cinematica, dinamica e energia.',
    icone: '⚙️',
    cor: 'from-green-500 to-emerald-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Cinematica',
        concluido: false,
        conteudo: {
          resumo: 'Estudo do movimento sem considerar suas causas (forcas).',
          topicos: [
            'VELOCIDADE MEDIA: Vm = ΔS/Δt (deslocamento/tempo)',
            'MRU (Movimento Retilineo Uniforme): S = S₀ + v×t',
            'MRUV (Uniformemente Variado): v = v₀ + a×t | S = S₀ + v₀t + at²/2',
            'EQUACAO DE TORRICELLI: v² = v₀² + 2×a×ΔS',
            'QUEDA LIVRE: a = g ≈ 10 m/s² (aceleracao da gravidade)'
          ],
          formula: 'MRU: S = S₀ + vt | MRUV: v = v₀ + at | S = S₀ + v₀t + at²/2 | v² = v₀² + 2aΔS',
          exemplos: [
            'Carro a 72 km/h = 20 m/s percorre em 5s: S = 20×5 = 100m',
            'Queda livre de 45m: 45 = 10t²/2 → t = 3s',
            'Carro freia de 20m/s ate parar em 50m: 0 = 400 + 2a×50 → a = -4 m/s²'
          ],
          dicas: [
            'Converta km/h para m/s: divida por 3,6',
            'ENEM contextualiza: carros, quedas, ultrapassagens',
            'Sinal negativo = sentido contrario ao referencial'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Leis de Newton',
        concluido: false,
        conteudo: {
          resumo: 'As tres leis que explicam as causas do movimento.',
          topicos: [
            '1a LEI (Inercia): Corpo em repouso permanece em repouso; em movimento, continua em MRU, a menos que uma forca atue',
            '2a LEI (F=ma): A forca resultante e proporcional a aceleracao. F = m × a',
            '3a LEI (Acao e Reacao): Toda acao tem uma reacao igual e oposta',
            'PESO: P = m × g (forca gravitacional)',
            'NORMAL: Forca de contato perpendicular a superficie'
          ],
          formula: 'F = m×a | P = m×g | Atrito: Fat = μ×N',
          exemplos: [
            'Corpo de 5kg com F=20N: a = 20/5 = 4 m/s²',
            'Peso de 60kg: P = 60×10 = 600N',
            'Cinto de seguranca: protege da inercia (1a lei)'
          ],
          dicas: [
            'Acao e reacao atuam em CORPOS DIFERENTES',
            'Faca o DIAGRAMA DE FORCAS antes de resolver',
            'Equilibrio: soma das forcas = 0 (a = 0)'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Trabalho e Energia',
        concluido: false,
        conteudo: {
          resumo: 'Trabalho e a energia transferida por uma forca. Energia e a capacidade de realizar trabalho.',
          topicos: [
            'TRABALHO: τ = F × d × cos(θ)',
            'ENERGIA CINETICA: Ec = mv²/2',
            'ENERGIA POTENCIAL GRAVITACIONAL: Ep = mgh',
            'ENERGIA MECANICA: Em = Ec + Ep',
            'CONSERVACAO DA ENERGIA: Em inicial = Em final (sistemas conservativos)',
            'POTENCIA: P = τ/t = F × v'
          ],
          formula: 'τ = F×d×cosθ | Ec = mv²/2 | Ep = mgh | P = τ/t',
          exemplos: [
            'Forca de 100N desloca 5m: τ = 100×5 = 500J',
            'Corpo de 2kg a 10m/s: Ec = 2×100/2 = 100J',
            'Corpo de 3kg a 5m de altura: Ep = 3×10×5 = 150J'
          ],
          dicas: [
            'θ = 90° → τ = 0 (forca perpendicular nao realiza trabalho)',
            'Energia NUNCA se perde, apenas se transforma',
            'Potencia em Watts (W) = J/s'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 75,
    tags: ['fisica', 'mecanica']
  },
  {
    id: 'nat-2',
    titulo: 'Quimica Geral',
    categoria: 'natureza',
    nivel: 'Basico',
    descricao: 'Atomos, tabela periodica e ligacoes.',
    icone: '⚗️',
    cor: 'from-green-500 to-emerald-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Estrutura Atomica',
        concluido: false,
        conteudo: {
          resumo: 'O atomo e formado por protons e neutrons (nucleo) e eletrons (eletrosfera).',
          topicos: [
            'PROTONS (p⁺): Carga positiva, define o elemento (Z = numero atomico)',
            'NEUTRONS (n): Sem carga, estabiliza o nucleo',
            'ELETRONS (e⁻): Carga negativa, distribuidos em camadas/niveis',
            'NUMERO DE MASSA (A): A = Z + N (protons + neutrons)',
            'ISOTOPOS: Mesmo Z, diferente A (ex: H-1, H-2, H-3)',
            'ISOBAROS: Mesmo A, diferente Z',
            'ISOTONOS: Mesmo numero de neutrons'
          ],
          formula: 'A = Z + N | Atomo neutro: protons = eletrons',
          exemplos: [
            'Carbono-12: Z=6, A=12, logo N=6',
            'Ion Ca²⁺: perdeu 2 eletrons (20p, 18e)',
            'H-1, H-2, H-3 sao isotopos do hidrogenio'
          ],
          dicas: [
            'O numero atomico (Z) DEFINE o elemento',
            'Ions: cation (+) perde eletrons, anion (-) ganha',
            'ENEM cobra isotopos em contextos como datacao'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Tabela Periodica',
        concluido: false,
        conteudo: {
          resumo: 'Organizacao dos elementos por numero atomico crescente em periodos e grupos.',
          topicos: [
            'PERIODOS (linhas): Indicam o numero de camadas eletronicas',
            'GRUPOS/FAMILIAS (colunas): Elementos com propriedades similares',
            'METAIS: Maioria, a esquerda. Bons condutores, brilho, ducteis',
            'AMETAIS: Direita. Maus condutores, ganham eletrons',
            'GASES NOBRES: Grupo 18. Estaveis, camada de valencia completa',
            'PROPRIEDADES PERIODICAS: Raio atomico, eletronegatividade, energia de ionizacao'
          ],
          exemplos: [
            'Grupo 1 (alcalinos): Li, Na, K - reativos, 1 eletron na valencia',
            'Grupo 17 (halogenios): F, Cl, Br - muito eletronegativos',
            'Eletronegatividade cresce: ← e ↑ (F e o mais eletronegativo)'
          ],
          dicas: [
            'Raio atomico CRESCE para baixo e esquerda',
            'Eletronegatividade CRESCE para cima e direita',
            'ENEM nao pede decorar, mas entender tendencias'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Ligacoes Quimicas',
        concluido: false,
        conteudo: {
          resumo: 'Atomos se ligam para atingir estabilidade (regra do octeto).',
          topicos: [
            'IONICA: Transferencia de eletrons (metal + ametal). Ex: NaCl',
            'COVALENTE: Compartilhamento de eletrons (ametal + ametal). Ex: H₂O',
            'METALICA: "Mar de eletrons" entre cations metalicos. Ex: Fe',
            'POLARIDADE: Covalente polar (eletronegatividades diferentes) vs apolar',
            'GEOMETRIA MOLECULAR: Linear, angular, trigonal, tetraedrica'
          ],
          exemplos: [
            'NaCl: Na perde 1e⁻ (Na⁺), Cl ganha 1e⁻ (Cl⁻) - ionica',
            'H₂O: O compartilha eletrons com 2 H - covalente polar, angular',
            'CO₂: Linear, apolar (mesmo com ligacoes polares)'
          ],
          dicas: [
            'Compostos ionicos: solidos, altos PF, conduzem em solucao',
            'Agua e polar: dissolve compostos ionicos e polares',
            'Molecula simetrica pode ser apolar mesmo com ligacoes polares'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 75,
    tags: ['quimica', 'atomos']
  },
  {
    id: 'nat-3',
    titulo: 'Ecologia',
    categoria: 'natureza',
    nivel: 'Intermediario',
    descricao: 'Ecossistemas, cadeias alimentares e impactos ambientais.',
    icone: '🌿',
    cor: 'from-green-500 to-emerald-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Niveis Troficos e Cadeias',
        concluido: false,
        conteudo: {
          resumo: 'A energia flui pelos ecossistemas atraves das cadeias alimentares.',
          topicos: [
            'PRODUTORES: Autotrofos (fotossintese). Base da cadeia',
            'CONSUMIDORES PRIMARIOS: Herbivoros. Comem produtores',
            'CONSUMIDORES SECUNDARIOS: Carnivoros. Comem herbivoros',
            'DECOMPOSITORES: Fungos e bacterias. Reciclam materia',
            'REGRA DOS 10%: Apenas 10% da energia passa ao nivel seguinte',
            'TEIA ALIMENTAR: Conjunto de cadeias interligadas'
          ],
          formula: 'Energia disponivel = 10% do nivel anterior',
          exemplos: [
            'Cadeia: Capim → Gafanhoto → Sapo → Cobra → Gaviao',
            'Se produtor tem 10.000 kcal, consumidor 1° tem ~1.000 kcal',
            'Magnificacao trofica: toxinas se acumulam nos niveis superiores'
          ],
          dicas: [
            'Piramide de energia SEMPRE diminui para o topo',
            'ENEM: magnificacao trofica (DDT, mercurio)',
            'Mais niveis troficos = menos energia disponivel'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Ciclos Biogeoquimicos',
        concluido: false,
        conteudo: {
          resumo: 'A materia circula entre seres vivos e ambiente atraves de ciclos.',
          topicos: [
            'CICLO DA AGUA: Evaporacao → condensacao → precipitacao → infiltracao',
            'CICLO DO CARBONO: Fotossintese (absorve CO₂), respiracao/decomposicao (libera)',
            'CICLO DO NITROGENIO: Fixacao (bacterias) → nitrificacao → assimilacao → desnitrificacao',
            'Bacterias fixadoras: transformam N₂ atmosferico em amonia',
            'Nitrificacao: amonia → nitrito → nitrato (forma absorvida pelas plantas)'
          ],
          exemplos: [
            'Aquecimento global: excesso de CO₂ por queima de combustiveis fosseis',
            'Leguminosas tem bacterias fixadoras nas raizes (rizobio)',
            'Desmatamento: reduz fixacao de CO₂'
          ],
          dicas: [
            'ENEM adora ciclo do carbono e efeito estufa',
            'Nitrogenio: bacterias sao essenciais para o ciclo',
            'Relacione ciclos com impactos humanos'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Problemas Ambientais',
        concluido: false,
        conteudo: {
          resumo: 'Atividades humanas causam diversos impactos nos ecossistemas.',
          topicos: [
            'EFEITO ESTUFA: Aquecimento por gases (CO₂, CH₄) que retêm calor',
            'CAMADA DE OZONIO: CFCs destroem O₃ que protege de UV',
            'CHUVA ACIDA: SO₂ e NOₓ + agua → acidos (pH < 5,6)',
            'EUTROFIZACAO: Excesso de nutrientes em agua → proliferacao de algas → morte',
            'DESMATAMENTO: Perda de biodiversidade, erosao, alteracao climatica',
            'BIOACUMULACAO: Substancias toxicas se acumulam na cadeia'
          ],
          exemplos: [
            'Protocolo de Kyoto/Paris: acordos para reduzir emissao de gases',
            'Eutrofizacao: esgotos e fertilizantes em lagos',
            'DDT: quase extinguiu aves de rapina por bioacumulacao'
          ],
          dicas: [
            'Efeito estufa e NATURAL e necessario; o problema e a INTENSIFICACAO',
            'ENEM contextualiza: sustentabilidade, acordos, solucoes',
            'Relacione problemas locais e globais'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 75,
    tags: ['biologia', 'ecologia', 'meio ambiente']
  },

  // ==================== CIENCIAS HUMANAS ====================
  {
    id: 'hum-1',
    titulo: 'Historia do Brasil',
    categoria: 'humanas',
    nivel: 'Intermediario',
    descricao: 'Da colonizacao a Republica.',
    icone: '🇧🇷',
    cor: 'from-orange-500 to-red-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Brasil Colonial',
        concluido: false,
        conteudo: {
          resumo: 'Periodo de 1500 a 1822, quando o Brasil era colonia de Portugal.',
          topicos: [
            'CAPITANIAS HEREDITARIAS (1534): Divisao em 15 lotes para colonizacao privada. Fracasso',
            'GOVERNO GERAL (1549): Centralizacao. Tome de Sousa, primeiro governador',
            'CICLO DO ACUCAR: Nordeste, latifundio, monocultura, escravidao',
            'UNIAO IBERICA (1580-1640): Portugal e Espanha unidos, invasoes holandesas',
            'CICLO DO OURO (sec. XVIII): Minas Gerais, Derrama, Inconfidencia Mineira (1789)',
            'ESCRAVIDAO: Base da economia colonial, resistencia nos quilombos'
          ],
          exemplos: [
            'Quilombo dos Palmares: maior resistencia negra, liderado por Zumbi',
            'Inconfidencia Mineira: Tiradentes, influencia iluminista',
            'Conjuracao Baiana (1798): participacao popular, ideias republicanas'
          ],
          dicas: [
            'ENEM: escravidao, resistencia, legado colonial',
            'Relacione economia colonial com desigualdades atuais',
            'Revoltas coloniais: causas economicas + ideais iluministas'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Imperio (1822-1889)',
        concluido: false,
        conteudo: {
          resumo: 'Brasil independente como monarquia, de D. Pedro I a D. Pedro II.',
          topicos: [
            'INDEPENDENCIA (1822): D. Pedro I, manutencao da elite, escravidao mantida',
            'PRIMEIRO REINADO: Constituicao 1824, Poder Moderador, abdicacao em 1831',
            'REGENCIAS (1831-1840): Instabilidade, revoltas regionais',
            'SEGUNDO REINADO: D. Pedro II, cafe, imigracao, Guerra do Paraguai',
            'ABOLICAO (1888): Lei Aurea, sem integracao dos libertos',
            'PROCLAMACAO DA REPUBLICA (1889): Militares + elite cafeeira'
          ],
          exemplos: [
            'Revoltas regenciais: Cabanagem (PA), Balaiada (MA), Farroupilha (RS)',
            'Lei Eusebio de Queiros (1850): fim do trafico negreiro',
            'Leis abolicionistas graduais: Ventre Livre, Sexagenarios, Aurea'
          ],
          dicas: [
            'Poder Moderador: rei acima dos 3 poderes',
            'Independencia "pelo alto": sem revolucao popular',
            'Abolicao tardia e sem reparacao historica'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Republica Velha e Era Vargas',
        concluido: false,
        conteudo: {
          resumo: 'Da proclamacao (1889) ao Estado Novo, passando pela Revolucao de 1930.',
          topicos: [
            'REPUBLICA VELHA (1889-1930): Oligarquias, politica cafe-com-leite, coronelismo',
            'TENENTISMO: Militares contra oligarquias. Coluna Prestes.',
            'REVOLUCAO DE 1930: Vargas assume, fim da Republica Velha',
            'ERA VARGAS: Governo Provisorio, Constitucional, Estado Novo (ditadura)',
            'TRABALHISMO: CLT (1943), salario minimo, sindicatos atrelados',
            'ESTADO NOVO (1937-1945): Ditadura, DIP (propaganda), censura'
          ],
          exemplos: [
            'Voto de cabresto: coroneis controlavam votos dos eleitores',
            'Semana de 22: modernismo cultural durante Republica Velha',
            'Vargas: "pai dos pobres" vs "mae dos ricos"'
          ],
          dicas: [
            'ENEM: direitos trabalhistas, populismo, propaganda',
            'Vargas: figura ambigua - ditador e popular',
            'CLT: conquista importante, mas controle dos sindicatos'
          ]
        }
      },
      {
        id: 'm4',
        titulo: 'Ditadura Militar (1964-1985)',
        concluido: false,
        conteudo: {
          resumo: 'Regime autoritario instalado pelo golpe de 1964, com repressao e "milagre economico".',
          topicos: [
            'GOLPE DE 1964: Militares derrubam Joao Goulart, apoio civil e EUA',
            'ATOS INSTITUCIONAIS: AI-1 a AI-17. AI-5 (1968) = mais repressivo',
            'ANOS DE CHUMBO: Censura, tortura, desaparecimentos, guerrilha',
            'MILAGRE ECONOMICO (1969-73): Crescimento + divida + desigualdade',
            'ABERTURA: "Lenta, gradual e segura". Anistia (1979), Diretas Ja',
            'REDEMOCRATIZACAO: Tancredo eleito indiretamente (1985), morre. Sarney assume'
          ],
          exemplos: [
            'AI-5: fechou Congresso, suspendeu habeas corpus, censura previa',
            'Guerrilha do Araguaia: resistencia armada, reprimida pelo Exercito',
            'Diretas Ja (1984): maior movimento popular, mas emenda rejeitada'
          ],
          dicas: [
            'ENEM: memoria, direitos humanos, Comissao da Verdade',
            'Milagre: crescimento excludente, "bolo que nao foi dividido"',
            'Legados: Lei de Anistia, transicao "pelo alto"'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '8h',
    fpRecompensa: 75,
    tags: ['historia', 'brasil']
  },

  // ==================== REDACAO ====================
  {
    id: 'red-1',
    titulo: 'Estrutura da Redacao ENEM',
    categoria: 'redacao',
    nivel: 'Basico',
    descricao: 'Introducao, desenvolvimento e conclusao com proposta.',
    icone: '✍️',
    cor: 'from-pink-500 to-rose-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Introducao',
        concluido: false,
        conteudo: {
          resumo: 'Primeiro paragrafo: apresenta o tema e a tese (seu posicionamento).',
          topicos: [
            'FUNCAO: Contextualizar o tema e apresentar sua tese',
            'ESTRUTURA: Repertorio + Contextualizacao + Tese',
            'REPERTORIO: Citacao, dado, fato historico que introduz o assunto',
            'CONTEXTUALIZACAO: Apresenta o problema na realidade brasileira',
            'TESE: Seu posicionamento claro sobre o tema (1-2 frases)',
            'TAMANHO IDEAL: 5-7 linhas'
          ],
          exemplos: [
            'REPERTORIO: "Segundo o filosofo Zygmunt Bauman, a sociedade moderna e marcada pela fluidez..."',
            'CONTEXTUALIZACAO: "Nesse contexto, observa-se no Brasil..."',
            'TESE: "Assim, e necessario debater os desafios para [TEMA]"'
          ],
          dicas: [
            'NUNCA comece com "Eu acho" ou "Na minha opiniao"',
            'O repertorio deve se conectar ao tema',
            'A tese deve antecipar os argumentos do desenvolvimento'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Desenvolvimento',
        concluido: false,
        conteudo: {
          resumo: 'Dois paragrafos argumentativos que comprovam sua tese com repertorio.',
          topicos: [
            'D1 - PRIMEIRO ARGUMENTO: Um aspecto/causa do problema',
            'D2 - SEGUNDO ARGUMENTO: Outro aspecto/consequencia do problema',
            'ESTRUTURA DE CADA D: Topico frasal + Repertorio + Argumentacao + Fechamento',
            'TOPICO FRASAL: Primeira frase que apresenta a ideia central do paragrafo',
            'REPERTORIO: Citacao, dado, exemplo que comprova seu argumento',
            'ARGUMENTACAO: Sua analise critica conectando repertorio ao tema'
          ],
          formula: 'Topico Frasal → Repertorio → Analise → Fechamento (link com tese)',
          exemplos: [
            'TOPICO: "Em primeiro lugar, e necessario analisar a negligencia estatal..."',
            'REPERTORIO: "Conforme o artigo 6o da Constituicao, e dever do Estado..."',
            'ANALISE: "Entretanto, observa-se que tal direito nao e efetivado..."'
          ],
          dicas: [
            'Cada D deve ter UM foco (nao misture argumentos)',
            'Conecte o repertorio ao tema especifico',
            'Use conectivos: "Ademais", "Outrossim", "Nesse sentido"'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Conclusao e Proposta de Intervencao',
        concluido: false,
        conteudo: {
          resumo: 'Ultimo paragrafo: retoma tese e apresenta solucao detalhada (AGENTE + ACAO + MEIO + FINALIDADE + DETALHAMENTO).',
          topicos: [
            'RETOMADA: Sintetize o problema discutido (1-2 frases)',
            'PROPOSTA DE INTERVENCAO: Solucao concreta e detalhada',
            'AGENTE: Quem vai fazer? (Governo, MEC, ONGs, midia, escolas...)',
            'ACAO: O que vai fazer? (Criar, implementar, promover...)',
            'MEIO: Como vai fazer? (Por meio de, atraves de...)',
            'FINALIDADE: Para que? (A fim de, com o objetivo de...)',
            'DETALHAMENTO: Detalhe de qualquer elemento anterior'
          ],
          formula: 'AGENTE + ACAO + MEIO + FINALIDADE + DETALHAMENTO = Proposta completa (200 pontos)',
          exemplos: [
            'AGENTE: "Portanto, cabe ao Ministerio da Educacao..."',
            'ACAO: "...criar campanhas de conscientizacao..."',
            'MEIO: "...por meio das redes sociais e TVs publicas..."',
            'FINALIDADE: "...a fim de informar a populacao sobre [TEMA]..."',
            'DETALHAMENTO: "...com linguagem acessivel e alcance nacional."'
          ],
          dicas: [
            'A proposta DEVE respeitar os direitos humanos',
            'Seja especifico: "O Governo" e vago, "O MEC" e melhor',
            'Os 5 elementos podem vir em qualquer ordem'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 75,
    tags: ['redacao', 'estrutura']
  },
  {
    id: 'red-2',
    titulo: 'Repertorio Sociocultural',
    categoria: 'redacao',
    nivel: 'Avancado',
    descricao: 'Construa seu banco de repertorios para qualquer tema.',
    icone: '📚',
    cor: 'from-pink-500 to-rose-500',
    modulos: [
      {
        id: 'm1',
        titulo: 'Repertorios Coringas',
        concluido: false,
        conteudo: {
          resumo: 'Repertorios versateis que se adaptam a diversos temas.',
          topicos: [
            'ZYGMUNT BAUMAN: Modernidade liquida - relacoes frageis, consumismo',
            'HANNAH ARENDT: Banalidade do mal - naturalizacao de injusticas',
            'PIERRE BOURDIEU: Capital cultural, reproducao social, violencia simbolica',
            'MICHEL FOUCAULT: Sociedade disciplinar, controle, biopolitica',
            'CONSTITUICAO 1988: Arts. 5o (direitos), 6o (sociais), 205 (educacao), 225 (meio ambiente)',
            'SERGIO BUARQUE: "Homem cordial", raizes do Brasil'
          ],
          exemplos: [
            'Bauman para tecnologia: "relacoes liquidas nas redes sociais"',
            'Arendt para violencia: "banalizacao da violencia urbana"',
            'Bourdieu para educacao: "reproducao das desigualdades na escola"'
          ],
          dicas: [
            'Aprenda a ADAPTAR o repertorio ao tema especifico',
            'Nao force: se nao encaixar, use outro',
            'Conheca o CONTEXTO da citacao, nao so a frase'
          ]
        }
      },
      {
        id: 'm2',
        titulo: 'Filmes e Series',
        concluido: false,
        conteudo: {
          resumo: 'Producoes audiovisuais que servem como repertorio legitimado.',
          topicos: [
            'TEMPOS MODERNOS (Chaplin): Alienacao do trabalho, industrializacao',
            'O POÇO (Netflix): Desigualdade social, egoismo',
            'BLACK MIRROR: Tecnologia, privacidade, redes sociais',
            'PARASITA: Desigualdade, luta de classes',
            'POCAHONTAS/AVATAR: Questoes indigenas, meio ambiente',
            'CIDADE DE DEUS: Violencia urbana, marginalizacao'
          ],
          exemplos: [
            'Tecnologia: "Assim como em Black Mirror, a sociedade atual..."',
            'Desigualdade: "Semelhante ao filme O Poco, observa-se que..."',
            'Trabalho: "Como critica Chaplin em Tempos Modernos..."'
          ],
          dicas: [
            'Filmes sao otimos para INTRODUCAO',
            'Escolha filmes CONHECIDOS pelo corretor',
            'Faca a conexao clara com o tema'
          ]
        }
      },
      {
        id: 'm3',
        titulo: 'Dados e Estatisticas',
        concluido: false,
        conteudo: {
          resumo: 'Numeros e pesquisas que comprovam argumentos.',
          topicos: [
            'FONTES CONFIAVEIS: IBGE, IPEA, OMS, ONU, Datafolha',
            'DADOS APROXIMADOS: "Cerca de", "Mais de", "Aproximadamente"',
            'COMO USAR: "Segundo dados do IBGE...", "Pesquisa do IPEA revela..."',
            'DADOS UTEIS: Brasil = 5o mais desigual do mundo, 13 milhoes de analfabetos',
            'INVENTE COM MODERACAO: "Estudos apontam que..." (sem fonte especifica)'
          ],
          exemplos: [
            '"Segundo a OMS, o Brasil e o pais mais ansioso do mundo"',
            '"Dados do IBGE revelam que 11% da populacao e analfabeta funcional"',
            '"Pesquisas indicam que 70% dos brasileiros usam redes sociais diariamente"'
          ],
          dicas: [
            'NAO invente dados especificos (numeros exatos)',
            'Dados gerais/aproximados sao mais seguros',
            'O corretor nao verifica, mas absurdos prejudicam'
          ]
        }
      }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 75,
    tags: ['redacao', 'repertorio']
  }
];

export default function BibliotecaPage() {
  const [cadernos, setCadernos] = useState<Caderno[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [nivelAtivo, setNivelAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [cadernoSelecionado, setCadernoSelecionado] = useState<Caderno | null>(null);
  const [moduloExpandido, setModuloExpandido] = useState<string | null>(null);

  useEffect(() => {
    carregarCadernos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaAtiva]);

  const carregarCadernos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/biblioteca/${categoriaAtiva}`);
      const result = await response.json();

      if (!result.success || !result.data) {
        console.warn('API falhou, usando dados locais');
        const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
        const cadernosComProgresso = CADERNOS_DATA.map(caderno => {
          const progressoSalvo = progressoLocal[caderno.id];
          if (progressoSalvo) {
            const modulosAtualizados = caderno.modulos.map((mod, idx) => ({
              ...mod,
              concluido: progressoSalvo.modulos?.[idx] || false,
            }));
            const progresso = Math.round((modulosAtualizados.filter(m => m.concluido).length / modulosAtualizados.length) * 100);
            return { ...caderno, modulos: modulosAtualizados, progresso };
          }
          return caderno;
        });
        setCadernos(cadernosComProgresso);
        setLoading(false);
        return;
      }

      const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
      const cadernosProcessados = result.data.map((caderno: Caderno) => {
        const modulosAdaptados = (caderno.modulos || []).map((mod: Modulo) => ({
          id: mod.id,
          titulo: mod.titulo,
          concluido: false,
          conteudo: mod.conteudo || { resumo: '', topicos: [] }
        }));

        const progressoSalvo = progressoLocal[caderno.id];
        if (progressoSalvo) {
          modulosAdaptados.forEach((mod: Modulo, idx: number) => {
            mod.concluido = progressoSalvo.modulos?.[idx] || false;
          });
        }

        const progresso = modulosAdaptados.length > 0
          ? Math.round((modulosAdaptados.filter((m: Modulo) => m.concluido).length / modulosAdaptados.length) * 100)
          : 0;

        return {
          id: caderno.id,
          titulo: caderno.titulo,
          categoria: caderno.categoria,
          nivel: caderno.nivel,
          descricao: caderno.descricao,
          icone: caderno.icone,
          cor: caderno.cor,
          modulos: modulosAdaptados,
          progresso,
          tempoEstimado: caderno.tempoEstimado,
          fpRecompensa: caderno.fpRecompensa,
          tags: caderno.tags || [],
        };
      });

      setCadernos(cadernosProcessados);
    } catch (error) {
      console.error('Erro ao carregar cadernos:', error);
      const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
      const cadernosComProgresso = CADERNOS_DATA.map(caderno => {
        const progressoSalvo = progressoLocal[caderno.id];
        if (progressoSalvo) {
          const modulosAtualizados = caderno.modulos.map((mod, idx) => ({
            ...mod,
            concluido: progressoSalvo.modulos?.[idx] || false,
          }));
          const progresso = Math.round((modulosAtualizados.filter(m => m.concluido).length / modulosAtualizados.length) * 100);
          return { ...caderno, modulos: modulosAtualizados, progresso };
        }
        return caderno;
      });
      setCadernos(cadernosComProgresso);
    }
    setLoading(false);
  };

  const toggleModuloConcluido = (cadernoId: string, moduloIdx: number) => {
    const novosCadernos = cadernos.map(caderno => {
      if (caderno.id === cadernoId) {
        const novosModulos = caderno.modulos.map((mod, idx) =>
          idx === moduloIdx ? { ...mod, concluido: !mod.concluido } : mod
        );
        const progresso = Math.round((novosModulos.filter(m => m.concluido).length / novosModulos.length) * 100);
        return { ...caderno, modulos: novosModulos, progresso };
      }
      return caderno;
    });
    setCadernos(novosCadernos);
    const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
    const cadernoAtualizado = novosCadernos.find(c => c.id === cadernoId);
    if (cadernoAtualizado) {
      progressoLocal[cadernoId] = { modulos: cadernoAtualizado.modulos.map(m => m.concluido) };
      localStorage.setItem('cadernos_progresso', JSON.stringify(progressoLocal));
    }
    if (cadernoSelecionado?.id === cadernoId) {
      setCadernoSelecionado(novosCadernos.find(c => c.id === cadernoId) || null);
    }
  };

  const toggleExpandirModulo = (moduloId: string) => {
    setModuloExpandido(moduloExpandido === moduloId ? null : moduloId);
  };

  const cadernosFiltrados = cadernos.filter(caderno => {
    const matchCategoria = categoriaAtiva === 'todos' || caderno.categoria === categoriaAtiva;
    const matchNivel = nivelAtivo === 'todos' || caderno.nivel === nivelAtivo;
    const matchBusca = busca === '' || caderno.titulo.toLowerCase().includes(busca.toLowerCase()) || caderno.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    return matchCategoria && matchNivel && matchBusca;
  });

  const totalProgresso = cadernos.length > 0 ? Math.round(cadernos.reduce((acc, c) => acc + c.progresso, 0) / cadernos.length) : 0;

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Basico': return '#22c55e';
      case 'Intermediario': return '#fbbf24';
      case 'Avancado': return '#f472b6';
      default: return '#9ca3af';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 50%, #1a2e1a 100%)' }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center', color: '#f5f5dc' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <p style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '1.5rem' }}>Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 50%, #1a2e1a 100%)' }}>
      <FloatingBackButton />
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem', textShadow: '0 0 10px rgba(255,215,0,0.3)', marginBottom: '0.5rem' }}>
            📚 Biblioteca de Estudos
          </h1>
          <p style={{ color: '#a3a3a3', fontSize: '1rem' }}>
            {cadernos.length} cadernos com conteudo completo para o ENEM
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Cadernos', value: cadernos.length, color: '#3b82f6' },
            { label: 'Modulos', value: cadernos.reduce((acc, c) => acc + c.modulos.length, 0), color: '#8b5cf6' },
            { label: 'Progresso', value: `${totalProgresso}%`, color: '#fbbf24' },
            { label: 'Concluidos', value: cadernos.filter(c => c.progresso === 100).length, color: '#22c55e' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: stat.color, fontSize: '1.75rem', fontWeight: 'bold', fontFamily: "'Patrick Hand', cursive" }}>{stat.value}</div>
              <div style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filtros */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="🔍 Buscar caderno ou tema..."
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#f5f5dc', fontSize: '1rem', marginBottom: '1rem' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: categoriaAtiva === cat.id ? '2px solid #ffd700' : '2px solid rgba(255,255,255,0.1)',
                  background: categoriaAtiva === cat.id ? 'rgba(255,215,0,0.2)' : 'transparent',
                  color: '#f5f5dc',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.nome}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['todos', 'Basico', 'Intermediario', 'Avancado'].map((nivel) => (
              <button
                key={nivel}
                onClick={() => setNivelAtivo(nivel)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: nivelAtivo === nivel ? `2px solid ${getNivelColor(nivel)}` : '2px solid rgba(255,255,255,0.1)',
                  background: nivelAtivo === nivel ? `${getNivelColor(nivel)}20` : 'transparent',
                  color: nivelAtivo === nivel ? getNivelColor(nivel) : '#f5f5dc',
                  cursor: 'pointer'
                }}
              >
                {nivel === 'todos' ? 'Todos os Niveis' : nivel}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Cadernos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {cadernosFiltrados.map((caderno, idx) => (
            <motion.div
              key={caderno.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setCadernoSelecionado(caderno)}
              style={{
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '1rem',
                padding: '1.5rem',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: `${getNivelColor(caderno.nivel)}30`, color: getNivelColor(caderno.nivel), border: `1px solid ${getNivelColor(caderno.nivel)}` }}>
                {caderno.nivel}
              </div>
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{caderno.icone}</div>
              <h3 style={{ fontFamily: "'Patrick Hand', cursive", color: '#f5f5dc', fontSize: '1.25rem', textAlign: 'center', marginBottom: '0.5rem' }}>{caderno.titulo}</h3>
              <p style={{ color: '#a3a3a3', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem', minHeight: '2.5rem' }}>{caderno.descricao}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#a3a3a3', marginBottom: '0.75rem' }}>
                <span>{caderno.modulos.length} modulos</span>
                <span>{caderno.tempoEstimado}</span>
                <span style={{ color: '#fbbf24' }}>ate {caderno.fpRecompensa} FP (quiz)</span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#a3a3a3' }}>Progresso</span>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{caderno.progresso}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${caderno.progresso}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: '999px', transition: 'width 0.3s' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal do Caderno */}
        <AnimatePresence>
          {cadernoSelecionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setCadernoSelecionado(null); setModuloExpandido(null); }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{ background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 100%)', borderRadius: '1rem', padding: '2rem', maxWidth: '56rem', width: '100%', border: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', marginBottom: '2rem' }}
              >
                {/* Header do Modal */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '4rem' }}>{cadernoSelecionado.icone}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '1.75rem', margin: 0 }}>{cadernoSelecionado.titulo}</h2>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: `${getNivelColor(cadernoSelecionado.nivel)}30`, color: getNivelColor(cadernoSelecionado.nivel) }}>{cadernoSelecionado.nivel}</span>
                    </div>
                    <p style={{ color: '#a3a3a3', margin: 0 }}>{cadernoSelecionado.descricao}</p>
                  </div>
                  <button onClick={() => { setCadernoSelecionado(null); setModuloExpandido(null); }} style={{ background: 'none', border: 'none', color: '#a3a3a3', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>

                {/* Stats do Caderno */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ color: '#f5f5dc', fontSize: '1.5rem', fontWeight: 'bold' }}>{cadernoSelecionado.modulos.length}</div>
                    <div style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>Modulos</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ color: '#f5f5dc', fontSize: '1.5rem', fontWeight: 'bold' }}>{cadernoSelecionado.tempoEstimado}</div>
                    <div style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>Tempo</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 'bold' }}>ate {cadernoSelecionado.fpRecompensa}</div>
                    <div style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>FP</div>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f5f5dc' }}>Progresso do Caderno</span>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{cadernoSelecionado.progresso}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${cadernoSelecionado.progresso}%`, background: 'linear-gradient(90deg, #fbbf24, #22c55e)', borderRadius: '999px', transition: 'width 0.5s' }} />
                  </div>
                </div>

                {/* Lista de Modulos */}
                <h3 style={{ fontFamily: "'Patrick Hand', cursive", color: '#f5f5dc', fontSize: '1.25rem', marginBottom: '1rem' }}>📖 Modulos</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cadernoSelecionado.modulos.map((modulo, idx) => (
                    <div key={modulo.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', overflow: 'hidden', border: modulo.concluido ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.1)' }}>
                      {/* Cabecalho do Modulo */}
                      <div
                        onClick={() => toggleExpandirModulo(modulo.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', cursor: 'pointer', background: moduloExpandido === modulo.id ? 'rgba(255,215,0,0.1)' : 'transparent' }}
                      >
                        <div
                          onClick={(e) => { e.stopPropagation(); toggleModuloConcluido(cadernoSelecionado.id, idx); }}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            background: modulo.concluido ? '#22c55e' : 'rgba(255,255,255,0.1)',
                            color: modulo.concluido ? '#000' : '#a3a3a3',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {modulo.concluido ? '✓' : idx + 1}
                        </div>
                        <span style={{ flex: 1, color: modulo.concluido ? '#22c55e' : '#f5f5dc', fontSize: '1.1rem' }}>{modulo.titulo}</span>
                        <span style={{ color: '#a3a3a3', transform: moduloExpandido === modulo.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                      </div>

                      {/* Conteudo Expandido */}
                      <AnimatePresence>
                        {moduloExpandido === modulo.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ padding: '0 1rem 1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                              {/* Resumo */}
                              <div style={{ background: 'rgba(255,215,0,0.1)', borderRadius: '0.5rem', padding: '1rem', marginTop: '1rem', marginBottom: '1rem', borderLeft: '4px solid #fbbf24' }}>
                                <p style={{ color: '#f5f5dc', margin: 0, lineHeight: 1.6 }}>{modulo.conteudo.resumo}</p>
                              </div>

                              {/* Topicos */}
                              <h4 style={{ color: '#fbbf24', fontFamily: "'Patrick Hand', cursive", marginBottom: '0.75rem' }}>📌 Topicos Principais</h4>
                              <ul style={{ margin: '0 0 1rem 0', padding: '0 0 0 1.25rem', color: '#f5f5dc', lineHeight: 1.8 }}>
                                {modulo.conteudo.topicos.map((topico, i) => (
                                  <li key={i} style={{ marginBottom: '0.5rem' }}>{topico}</li>
                                ))}
                              </ul>

                              {/* Formula (se houver) */}
                              {modulo.conteudo.formula && (
                                <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem', border: '1px solid rgba(59,130,246,0.3)' }}>
                                  <h4 style={{ color: '#3b82f6', margin: '0 0 0.5rem 0', fontFamily: "'Patrick Hand', cursive" }}>📐 Formulas</h4>
                                  <p style={{ color: '#93c5fd', margin: 0, fontFamily: 'monospace', fontSize: '0.95rem' }}>{modulo.conteudo.formula}</p>
                                </div>
                              )}

                              {/* Exemplos (se houver) */}
                              {modulo.conteudo.exemplos && (
                                <div style={{ marginBottom: '1rem' }}>
                                  <h4 style={{ color: '#22c55e', fontFamily: "'Patrick Hand', cursive", marginBottom: '0.5rem' }}>💡 Exemplos</h4>
                                  <ul style={{ margin: 0, padding: '0 0 0 1.25rem', color: '#a3e6a5', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                    {modulo.conteudo.exemplos.map((ex, i) => (
                                      <li key={i} style={{ marginBottom: '0.25rem' }}>{ex}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Dicas (se houver) */}
                              {modulo.conteudo.dicas && (
                                <div style={{ background: 'rgba(236,72,153,0.1)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(236,72,153,0.3)' }}>
                                  <h4 style={{ color: '#ec4899', margin: '0 0 0.5rem 0', fontFamily: "'Patrick Hand', cursive" }}>🎯 Dicas para o ENEM</h4>
                                  <ul style={{ margin: 0, padding: '0 0 0 1.25rem', color: '#f9a8d4', lineHeight: 1.6, fontSize: '0.9rem' }}>
                                    {modulo.conteudo.dicas.map((dica, i) => (
                                      <li key={i} style={{ marginBottom: '0.25rem' }}>{dica}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Botao Marcar como Concluido */}
                              <button
                                onClick={() => toggleModuloConcluido(cadernoSelecionado.id, idx)}
                                style={{
                                  width: '100%',
                                  marginTop: '1rem',
                                  padding: '0.75rem',
                                  borderRadius: '0.5rem',
                                  border: 'none',
                                  background: modulo.concluido ? 'rgba(34,197,94,0.2)' : 'linear-gradient(90deg, #22c55e, #16a34a)',
                                  color: modulo.concluido ? '#22c55e' : '#fff',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.5rem'
                                }}
                              >
                                {modulo.concluido ? '✓ Concluido - Clique para desmarcar' : '✓ Marcar como Concluido'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cadernoSelecionado.tags.map((tag) => (
                      <span key={tag} style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.75rem', color: '#a3a3a3' }}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/enem" style={{ color: '#a3a3a3', textDecoration: 'none' }}>← Voltar ao Painel</Link>
        </div>
      </div>
    </div>
  );
}
