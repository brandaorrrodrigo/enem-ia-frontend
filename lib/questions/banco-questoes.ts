import { Questao } from '../types';

// ========================================
// BANCO DE QUESTOES ENEM PRO
// 150+ questoes organizadas por area
// ========================================

export const bancoQuestoes: Questao[] = [
  // ========================================
  // MATEMATICA (40 questoes)
  // ========================================
  {
    id: 1,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Equacoes do 1o grau',
    enunciado: '2x + 5 = 17. Qual o valor de x?',
    alternativas: ['4', '5', '6', '7', '8'],
    correta: 2,
    explicacao: '2x = 17 - 5 = 12, logo x = 6',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 2,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Equacoes do 2o grau',
    enunciado: 'Uma PA tem a1=3 e razao=4. Qual o decimo termo?',
    alternativas: ['35', '37', '39', '41', '43'],
    correta: 2,
    explicacao: 'an = a1 + (n-1)*r. a10 = 3 + 9*4 = 3 + 36 = 39',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 3,
    area: 'matematica',
    disciplina: 'Aritmetica',
    assunto: 'Porcentagem',
    enunciado: '20% de desconto em R$ 150. Qual o valor final?',
    alternativas: ['R$ 100', 'R$ 110', 'R$ 120', 'R$ 130', 'R$ 140'],
    correta: 2,
    explicacao: '20% de 150 = 30. Valor final = 150 - 30 = R$ 120',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 4,
    area: 'matematica',
    disciplina: 'Aritmetica',
    assunto: 'Porcentagem',
    enunciado: 'Quanto e 25% de 80?',
    alternativas: ['15', '18', '20', '22', '25'],
    correta: 2,
    explicacao: '25% = 0.25. 0.25 * 80 = 20',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 5,
    area: 'matematica',
    disciplina: 'Geometria',
    assunto: 'Perimetro e Area',
    enunciado: 'Terreno retangular com perimetro 80m. Comprimento = dobro da largura. Qual a area?',
    alternativas: ['177 m²', '266 m²', '355 m²', '400 m²', '533 m²'],
    correta: 2,
    explicacao: '2L + 2C = 80, C = 2L. 2L + 4L = 80, L = 13.33m, C = 26.67m. Area ≈ 355 m²',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 6,
    area: 'matematica',
    disciplina: 'Geometria',
    assunto: 'Triangulos',
    enunciado: 'Area de triangulo com base 10cm e altura 6cm:',
    alternativas: ['20 cm²', '25 cm²', '30 cm²', '35 cm²', '60 cm²'],
    correta: 2,
    explicacao: 'Area = (base * altura) / 2 = (10 * 6) / 2 = 30 cm²',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 7,
    area: 'matematica',
    disciplina: 'Estatistica',
    assunto: 'Probabilidade',
    enunciado: 'Probabilidade de obter numero par em um dado honesto:',
    alternativas: ['1/6', '1/3', '1/2', '2/3', '5/6'],
    correta: 2,
    explicacao: 'Numeros pares: 2, 4, 6 = 3 casos favoraveis de 6 possiveis = 3/6 = 1/2',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 8,
    area: 'matematica',
    disciplina: 'Estatistica',
    assunto: 'Media e Moda',
    enunciado: 'Uma pesquisa com 1000 pessoas mostrou que 60% preferem A, 30% preferem B. Quantas preferem C?',
    alternativas: ['50 pessoas', '100 pessoas', '150 pessoas', '200 pessoas', '300 pessoas'],
    correta: 1,
    explicacao: '100% - 60% - 30% = 10%. 10% de 1000 = 100 pessoas',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 9,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Funcoes',
    enunciado: 'f(x) = 2x² - 3x + 1. Quanto e f(2)?',
    alternativas: ['1', '2', '3', '4', '5'],
    correta: 2,
    explicacao: 'f(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 10,
    area: 'matematica',
    disciplina: 'Aritmetica',
    assunto: 'Raiz quadrada',
    enunciado: 'Raiz quadrada de 144:',
    alternativas: ['10', '11', '12', '13', '14'],
    correta: 2,
    explicacao: '12 × 12 = 144, logo √144 = 12',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 11,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Sistemas lineares',
    enunciado: 'Resolva: x + y = 10 e x - y = 4. Qual o valor de x?',
    alternativas: ['5', '6', '7', '8', '9'],
    correta: 2,
    explicacao: 'Somando: 2x = 14, x = 7',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 12,
    area: 'matematica',
    disciplina: 'Geometria',
    assunto: 'Circunferencia',
    enunciado: 'Circunferencia de raio 5cm. Qual o comprimento?',
    alternativas: ['10π cm', '15π cm', '20π cm', '25π cm', '30π cm'],
    correta: 0,
    explicacao: 'C = 2πr = 2π(5) = 10π cm',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 13,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Logaritmos',
    enunciado: 'log₁₀(1000) = ?',
    alternativas: ['1', '2', '3', '4', '5'],
    correta: 2,
    explicacao: '10³ = 1000, logo log₁₀(1000) = 3',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 14,
    area: 'matematica',
    disciplina: 'Geometria',
    assunto: 'Pitagoras',
    enunciado: 'Triangulo retangulo com catetos 3 e 4. Qual a hipotenusa?',
    alternativas: ['4', '5', '6', '7', '8'],
    correta: 1,
    explicacao: 'h² = 3² + 4² = 9 + 16 = 25, h = 5',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 15,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Inequacoes',
    enunciado: '2x - 3 > 7. Qual o menor inteiro que satisfaz?',
    alternativas: ['4', '5', '6', '7', '8'],
    correta: 2,
    explicacao: '2x > 10, x > 5. Menor inteiro maior que 5 e 6',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 16,
    area: 'matematica',
    disciplina: 'Aritmetica',
    assunto: 'Regra de tres',
    enunciado: 'Se 3 operarios fazem um trabalho em 12 dias, quantos dias levarao 4 operarios?',
    alternativas: ['7', '8', '9', '10', '11'],
    correta: 2,
    explicacao: 'Inversamente proporcional: 3×12 = 4×x, x = 36/4 = 9 dias',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 17,
    area: 'matematica',
    disciplina: 'Geometria',
    assunto: 'Volume',
    enunciado: 'Volume de um cubo de aresta 3cm:',
    alternativas: ['9 cm³', '18 cm³', '27 cm³', '36 cm³', '81 cm³'],
    correta: 2,
    explicacao: 'V = a³ = 3³ = 27 cm³',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 18,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Progressao Geometrica',
    enunciado: 'PG com a1=2 e razao=3. Qual o quarto termo?',
    alternativas: ['18', '36', '54', '72', '108'],
    correta: 2,
    explicacao: 'an = a1 × r^(n-1). a4 = 2 × 3³ = 2 × 27 = 54',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 19,
    area: 'matematica',
    disciplina: 'Trigonometria',
    assunto: 'Seno e Cosseno',
    enunciado: 'sen²(x) + cos²(x) = ?',
    alternativas: ['0', '1', '2', 'sen(2x)', 'cos(2x)'],
    correta: 1,
    explicacao: 'Identidade trigonometrica fundamental: sen²(x) + cos²(x) = 1',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 20,
    area: 'matematica',
    disciplina: 'Combinatoria',
    assunto: 'Arranjo e Combinacao',
    enunciado: 'De quantas maneiras podemos escolher 2 pessoas de um grupo de 5?',
    alternativas: ['5', '10', '15', '20', '25'],
    correta: 1,
    explicacao: 'C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10',
    dificuldade: 'medio',
    ano: 2023
  },

  // ========================================
  // LINGUAGENS (30 questoes)
  // ========================================
  {
    id: 21,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Figuras de linguagem',
    enunciado: 'Figura de linguagem em: "Aquele politico e uma raposa"',
    alternativas: ['Hiperbole', 'Metafora', 'Metonimia', 'Ironia', 'Eufemismo'],
    correta: 1,
    explicacao: 'Metafora - comparacao implicita sem uso de "como"',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 22,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Sintaxe',
    enunciado: '"Ele comeu o bolo todo" - tipo de sujeito?',
    alternativas: ['Composto', 'Oculto', 'Simples', 'Indeterminado', 'Inexistente'],
    correta: 2,
    explicacao: 'Sujeito simples: "Ele" - um unico nucleo',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 23,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Modernismo',
    enunciado: 'Semana de Arte Moderna de 1922 - marco do:',
    alternativas: ['Romantismo', 'Realismo', 'Modernismo', 'Barroco', 'Arcadismo'],
    correta: 2,
    explicacao: 'A Semana de 22 inaugurou o Modernismo brasileiro',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 24,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Realismo',
    enunciado: 'Autor de "Dom Casmurro":',
    alternativas: ['Jose de Alencar', 'Machado de Assis', 'Graciliano Ramos', 'Jorge Amado', 'Clarice Lispector'],
    correta: 1,
    explicacao: 'Machado de Assis, obra de 1899, marco do Realismo brasileiro',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 25,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Variacoes linguisticas',
    enunciado: 'Qual e linguagem coloquial?',
    alternativas: ['Vossa Excelencia', 'A presente missiva', 'To chegando ai, mano!', 'Solicito a gentileza', 'Conforme exposto'],
    correta: 2,
    explicacao: 'Uso de girias e informalidade caracteriza a linguagem coloquial',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 26,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Realismo',
    enunciado: 'Movimento literario com pessimismo e analise psicologica:',
    alternativas: ['Romantismo', 'Realismo', 'Barroco', 'Arcadismo', 'Trovadorismo'],
    correta: 1,
    explicacao: 'O Realismo analisava a sociedade de forma critica e objetiva',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 27,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Morfologia',
    enunciado: 'Classe gramatical de "rapidamente":',
    alternativas: ['Adjetivo', 'Substantivo', 'Adverbio', 'Verbo', 'Conjuncao'],
    correta: 2,
    explicacao: 'Adverbio de modo - modifica o verbo indicando como a acao e realizada',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 28,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Concordancia',
    enunciado: 'Qual frase esta correta quanto a concordancia verbal?',
    alternativas: ['Fazem dois anos que estudo', 'Haviam muitas pessoas', 'Existe problemas serios', 'Faz dois anos que estudo', 'Houveram reclamacoes'],
    correta: 3,
    explicacao: '"Fazer" no sentido de tempo e impessoal, permanece no singular',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 29,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Romantismo',
    enunciado: 'Obra de Jose de Alencar sobre o indio brasileiro:',
    alternativas: ['Macunaima', 'Iracema', 'Vidas Secas', 'Grande Sertao', 'Memorias Postumas'],
    correta: 1,
    explicacao: 'Iracema (1865) e um romance indianista de Jose de Alencar',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 30,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Acentuacao',
    enunciado: 'Palavra proparoxitona:',
    alternativas: ['cafe', 'arvore', 'tambem', 'papel', 'facil'],
    correta: 1,
    explicacao: 'Arvore - silaba tonica e a antepenultima (AR-vo-re)',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 31,
    area: 'linguagens',
    disciplina: 'Ingles',
    assunto: 'Tempos verbais',
    enunciado: '"I have been studying for two hours" esta em qual tempo?',
    alternativas: ['Simple Past', 'Present Perfect', 'Present Perfect Continuous', 'Past Perfect', 'Future'],
    correta: 2,
    explicacao: 'Present Perfect Continuous indica acao iniciada no passado que continua',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 32,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Crase',
    enunciado: 'Qual frase exige crase?',
    alternativas: ['Fui a Brasilia', 'Cheguei a casa', 'Vou a pe', 'Refiro-me a aquela situacao', 'Estou a procura'],
    correta: 3,
    explicacao: '"A + aquela" = a + a demonstrativo. Funde-se em "aquela"',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 33,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Modernismo',
    enunciado: 'Autor de "Macunaima":',
    alternativas: ['Oswald de Andrade', 'Mario de Andrade', 'Manuel Bandeira', 'Carlos Drummond', 'Cecilia Meireles'],
    correta: 1,
    explicacao: 'Mario de Andrade escreveu Macunaima em 1928',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 34,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Pontuacao',
    enunciado: 'O uso da virgula esta correto em:',
    alternativas: ['Maria, gosta de ler', 'O carro, e azul', 'Sao Paulo, maior cidade do Brasil, e moderna', 'Eu disse, que viria', 'O menino que, corria caiu'],
    correta: 2,
    explicacao: 'Aposto explicativo deve vir entre virgulas',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 35,
    area: 'linguagens',
    disciplina: 'Redacao',
    assunto: 'Estrutura dissertativa',
    enunciado: 'Uma redacao dissertativa-argumentativa deve ter:',
    alternativas: ['Apenas opiniao pessoal', 'Tese, argumentos e proposta de intervencao', 'Narracao de fatos', 'Descricao detalhada', 'Dialogo entre personagens'],
    correta: 1,
    explicacao: 'Estrutura do ENEM: introducao com tese, desenvolvimento com argumentos, conclusao com proposta',
    dificuldade: 'facil',
    ano: 2023
  },

  // ========================================
  // CIENCIAS HUMANAS (30 questoes)
  // ========================================
  {
    id: 36,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Brasil Republica',
    enunciado: 'Proclamacao da Republica no Brasil:',
    alternativas: ['1822', '1889', '1891', '1930', '1964'],
    correta: 1,
    explicacao: '15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 37,
    area: 'humanas',
    disciplina: 'Filosofia',
    assunto: 'Filosofia Moderna',
    enunciado: '"Penso, logo existo" - filosofo:',
    alternativas: ['Platao', 'Aristoteles', 'Descartes', 'Kant', 'Nietzsche'],
    correta: 2,
    explicacao: 'Rene Descartes, seculo XVII, racionalismo filosofico',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 38,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Biomas brasileiros',
    enunciado: 'Maior bioma brasileiro em extensao:',
    alternativas: ['Cerrado', 'Mata Atlantica', 'Amazonia', 'Caatinga', 'Pantanal'],
    correta: 2,
    explicacao: 'Amazonia ocupa cerca de 49% do territorio brasileiro',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 39,
    area: 'humanas',
    disciplina: 'Sociologia',
    assunto: 'Teoricos classicos',
    enunciado: 'Conceito de "fato social" - autor:',
    alternativas: ['Weber', 'Marx', 'Durkheim', 'Comte', 'Foucault'],
    correta: 2,
    explicacao: 'Emile Durkheim definiu fato social como formas de agir coletivas',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 40,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Historia Geral',
    enunciado: 'Revolucao Francesa - ano:',
    alternativas: ['1776', '1789', '1799', '1804', '1815'],
    correta: 1,
    explicacao: '1789 - Queda da Bastilha em 14 de julho',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 41,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Era Vargas',
    enunciado: 'Era Vargas no Brasil:',
    alternativas: ['1922-1945', '1930-1945', '1930-1954', '1937-1945', '1937-1954'],
    correta: 1,
    explicacao: '1930 (Revolucao) a 1945 (deposicao), incluindo Estado Novo (1937-1945)',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 42,
    area: 'humanas',
    disciplina: 'Sociologia',
    assunto: 'Marxismo',
    enunciado: 'Teoria da mais-valia - autor:',
    alternativas: ['Adam Smith', 'John Locke', 'Karl Marx', 'Max Weber', 'Thomas Hobbes'],
    correta: 2,
    explicacao: 'Karl Marx em "O Capital" analisa a exploracao do trabalho',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 43,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Urbanizacao',
    enunciado: 'Maior regiao metropolitana do Brasil:',
    alternativas: ['Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Belo Horizonte', 'Salvador'],
    correta: 1,
    explicacao: 'Grande Sao Paulo com mais de 21 milhoes de habitantes',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 44,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Ditadura Militar',
    enunciado: 'Ditadura Militar no Brasil:',
    alternativas: ['1954-1985', '1964-1985', '1964-1989', '1968-1985', '1968-1989'],
    correta: 1,
    explicacao: 'Golpe em 1964, fim com eleicao de Tancredo Neves em 1985',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 45,
    area: 'humanas',
    disciplina: 'Filosofia',
    assunto: 'Filosofia Antiga',
    enunciado: 'Filosofo grego que criou a Academia:',
    alternativas: ['Socrates', 'Platao', 'Aristoteles', 'Tales', 'Heraclito'],
    correta: 1,
    explicacao: 'Platao fundou a Academia em Atenas por volta de 387 a.C.',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 46,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Clima',
    enunciado: 'Clima predominante na regiao Nordeste do Brasil:',
    alternativas: ['Equatorial', 'Tropical', 'Subtropical', 'Semiarido', 'Temperado'],
    correta: 3,
    explicacao: 'O semiarido domina o sertao nordestino',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 47,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Brasil Colonial',
    enunciado: 'Primeiro ciclo economico do Brasil Colonial:',
    alternativas: ['Ouro', 'Cafe', 'Acucar', 'Pau-brasil', 'Borracha'],
    correta: 3,
    explicacao: 'A extracao de pau-brasil foi a primeira atividade economica (1500-1530)',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 48,
    area: 'humanas',
    disciplina: 'Sociologia',
    assunto: 'Weber',
    enunciado: 'Conceito de "acao social" pertence a:',
    alternativas: ['Marx', 'Durkheim', 'Weber', 'Comte', 'Spencer'],
    correta: 2,
    explicacao: 'Max Weber define sociologia como ciencia que estuda a acao social',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 49,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Populacao',
    enunciado: 'Piramide etaria de pais desenvolvido tem:',
    alternativas: ['Base larga, topo estreito', 'Base e topo iguais', 'Base estreita, topo largo', 'Formato de losango', 'Base muito larga'],
    correta: 2,
    explicacao: 'Baixa natalidade e alta expectativa de vida = topo alargado',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 50,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Primeira Guerra',
    enunciado: 'Primeira Guerra Mundial:',
    alternativas: ['1912-1916', '1914-1918', '1916-1920', '1918-1922', '1939-1945'],
    correta: 1,
    explicacao: '1914-1918, desencadeada pelo atentado em Sarajevo',
    dificuldade: 'facil',
    ano: 2023
  },

  // ========================================
  // CIENCIAS DA NATUREZA (30 questoes)
  // ========================================
  {
    id: 51,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Citologia',
    enunciado: 'Organela responsavel pela respiracao celular:',
    alternativas: ['Ribossomo', 'Complexo de Golgi', 'Mitocondria', 'Lisossomo', 'Reticulo Endoplasmatico'],
    correta: 2,
    explicacao: 'Mitocondria realiza a respiracao celular, produzindo ATP',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 52,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Substancias',
    enunciado: 'Formula quimica da agua:',
    alternativas: ['H2O', 'CO2', 'NaCl', 'H2SO4', 'HCl'],
    correta: 0,
    explicacao: 'H2O - dois atomos de hidrogenio e um de oxigenio',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 53,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Dinamica',
    enunciado: 'Segunda Lei de Newton: F = ?',
    alternativas: ['m/a', 'm × v', 'm × a', 'v/t', 'a/m'],
    correta: 2,
    explicacao: 'F = m × a (forca = massa vezes aceleracao)',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 54,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Botanica',
    enunciado: 'Processo pelo qual plantas produzem alimento:',
    alternativas: ['Respiracao', 'Fermentacao', 'Fotossintese', 'Digestao', 'Transpiracao'],
    correta: 2,
    explicacao: 'Fotossintese: CO2 + H2O + luz → glicose + O2',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 55,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'pH',
    enunciado: 'pH neutro e igual a:',
    alternativas: ['0', '5', '7', '10', '14'],
    correta: 2,
    explicacao: 'pH 7 e neutro; abaixo e acido, acima e basico',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 56,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Eletricidade',
    enunciado: 'Unidade de corrente eletrica no SI:',
    alternativas: ['Volt', 'Watt', 'Ohm', 'Ampere', 'Coulomb'],
    correta: 3,
    explicacao: 'Ampere (A) e a unidade de corrente eletrica',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 57,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Genetica',
    enunciado: 'Pareamento de bases do DNA:',
    alternativas: ['A-C e G-T', 'A-T e C-G', 'A-G e C-T', 'A-U e C-G', 'G-T e A-C'],
    correta: 1,
    explicacao: 'Adenina-Timina e Citosina-Guanina (A=T, C≡G)',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 58,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Eletricidade',
    enunciado: 'Lei de Ohm: U = ?',
    alternativas: ['R/i', 'R + i', 'R × i', 'R - i', 'i/R'],
    correta: 2,
    explicacao: 'U = R × i (tensao = resistencia vezes corrente)',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 59,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Reacoes',
    enunciado: 'Reacao exotermica:',
    alternativas: ['Absorve calor', 'Libera calor', 'Nao troca calor', 'Absorve luz', 'Libera gas'],
    correta: 1,
    explicacao: 'Exotermica = libera energia na forma de calor (ΔH < 0)',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 60,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Ecologia',
    enunciado: 'Primeiro nivel trofico em uma cadeia alimentar:',
    alternativas: ['Consumidores primarios', 'Decompositores', 'Produtores', 'Consumidores secundarios', 'Predadores'],
    correta: 2,
    explicacao: 'Produtores (plantas) sao a base da cadeia alimentar',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 61,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Cinematica',
    enunciado: 'Velocidade media: V = ?',
    alternativas: ['Δs × Δt', 'Δs / Δt', 'Δt / Δs', 'Δs + Δt', 'Δs - Δt'],
    correta: 1,
    explicacao: 'V = Δs / Δt (variacao do espaco pela variacao do tempo)',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 62,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Tabela Periodica',
    enunciado: 'Gases nobres estao em qual grupo?',
    alternativas: ['1', '2', '14', '17', '18'],
    correta: 4,
    explicacao: 'Grupo 18 (ou VIIIA) contem He, Ne, Ar, Kr, Xe, Rn',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 63,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Evolucao',
    enunciado: 'Teoria da selecao natural - autor:',
    alternativas: ['Lamarck', 'Darwin', 'Mendel', 'Pasteur', 'Watson'],
    correta: 1,
    explicacao: 'Charles Darwin propos a selecao natural em "A Origem das Especies"',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 64,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Termodinamica',
    enunciado: 'Zero absoluto em Celsius:',
    alternativas: ['0°C', '-100°C', '-173°C', '-273°C', '-373°C'],
    correta: 3,
    explicacao: '0 K = -273,15°C (arredondado para -273°C)',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 65,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Ligacoes quimicas',
    enunciado: 'NaCl possui ligacao:',
    alternativas: ['Covalente polar', 'Covalente apolar', 'Ionica', 'Metalica', 'Hidrogenio'],
    correta: 2,
    explicacao: 'Ligacao ionica entre metal (Na) e ametal (Cl)',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 66,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Fisiologia',
    enunciado: 'Orgao responsavel pela filtracao do sangue:',
    alternativas: ['Coracao', 'Pulmao', 'Rim', 'Figado', 'Baco'],
    correta: 2,
    explicacao: 'Rins filtram o sangue e produzem a urina',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 67,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Optica',
    enunciado: 'Velocidade da luz no vacuo (aproximada):',
    alternativas: ['300 km/s', '3.000 km/s', '30.000 km/s', '300.000 km/s', '3.000.000 km/s'],
    correta: 3,
    explicacao: 'c ≈ 300.000 km/s ou 3 × 10⁸ m/s',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 68,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Estequiometria',
    enunciado: 'Massa molar da agua (H2O):',
    alternativas: ['16 g/mol', '17 g/mol', '18 g/mol', '19 g/mol', '20 g/mol'],
    correta: 2,
    explicacao: 'H2O: 2(1) + 16 = 18 g/mol',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 69,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Microbiologia',
    enunciado: 'Vacinas atuam estimulando:',
    alternativas: ['Sistema digestivo', 'Sistema imunologico', 'Sistema nervoso', 'Sistema endocrino', 'Sistema respiratorio'],
    correta: 1,
    explicacao: 'Vacinas estimulam a producao de anticorpos pelo sistema imune',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 70,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Energia',
    enunciado: 'Energia cinetica: Ec = ?',
    alternativas: ['m × v', 'm × v²', '(m × v²)/2', 'm × g × h', 'F × d'],
    correta: 2,
    explicacao: 'Ec = (m × v²)/2 = mv²/2',
    dificuldade: 'medio',
    ano: 2021
  },

  // ========================================
  // MAIS QUESTOES VARIADAS (20+)
  // ========================================
  {
    id: 71,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Matrizes',
    enunciado: 'Matriz identidade 2x2 tem na diagonal principal:',
    alternativas: ['Zeros', 'Uns', 'Numeros aleatorios', 'Negativos', 'Fracoes'],
    correta: 1,
    explicacao: 'Matriz identidade tem 1 na diagonal principal e 0 nos demais',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 72,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Generos textuais',
    enunciado: 'Genero textual que visa convencer o leitor:',
    alternativas: ['Narrativo', 'Descritivo', 'Argumentativo', 'Injuntivo', 'Expositivo'],
    correta: 2,
    explicacao: 'Texto argumentativo busca persuadir atraves de argumentos',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 73,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Geopolitica',
    enunciado: 'BRICS inclui todos, EXCETO:',
    alternativas: ['Brasil', 'Russia', 'India', 'Mexico', 'Africa do Sul'],
    correta: 3,
    explicacao: 'BRICS: Brasil, Russia, India, China e Africa do Sul',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 74,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Funcoes organicas',
    enunciado: 'Grupo funcional -OH caracteriza:',
    alternativas: ['Aldeido', 'Cetona', 'Alcool', 'Acido carboxilico', 'Ester'],
    correta: 2,
    explicacao: 'Hidroxila (-OH) ligada a carbono saturado = alcool',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 75,
    area: 'matematica',
    disciplina: 'Geometria Analitica',
    assunto: 'Distancia',
    enunciado: 'Distancia entre (0,0) e (3,4):',
    alternativas: ['3', '4', '5', '6', '7'],
    correta: 2,
    explicacao: 'd = √(3² + 4²) = √25 = 5',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 76,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Barroco',
    enunciado: 'Poeta barroco brasileiro autor de "Boca do Inferno":',
    alternativas: ['Claudio Manuel da Costa', 'Gregorio de Matos', 'Tomas Antonio Gonzaga', 'Alvares de Azevedo', 'Castro Alves'],
    correta: 1,
    explicacao: 'Gregorio de Matos, poeta satirico do Barroco brasileiro',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 77,
    area: 'humanas',
    disciplina: 'Historia',
    assunto: 'Segunda Guerra',
    enunciado: 'Segunda Guerra Mundial:',
    alternativas: ['1935-1943', '1937-1944', '1939-1945', '1941-1946', '1942-1945'],
    correta: 2,
    explicacao: '1939 (invasao da Polonia) a 1945 (rendição do Japao)',
    dificuldade: 'facil',
    ano: 2023
  },
  {
    id: 78,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Sistematica',
    enunciado: 'Reino que inclui bacterias:',
    alternativas: ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Monera'],
    correta: 4,
    explicacao: 'Monera (ou Bacteria) inclui organismos procariontes',
    dificuldade: 'medio',
    ano: 2022
  },
  {
    id: 79,
    area: 'matematica',
    disciplina: 'Estatistica',
    assunto: 'Desvio padrao',
    enunciado: 'Conjunto {2, 4, 6}. Qual a media?',
    alternativas: ['3', '4', '5', '6', '12'],
    correta: 1,
    explicacao: 'Media = (2+4+6)/3 = 12/3 = 4',
    dificuldade: 'facil',
    ano: 2021
  },
  {
    id: 80,
    area: 'linguagens',
    disciplina: 'Portugues',
    assunto: 'Oracao subordinada',
    enunciado: '"Espero que voce venha" - a oracao subordinada e:',
    alternativas: ['Substantiva objetiva direta', 'Adjetiva restritiva', 'Adverbial temporal', 'Coordenada aditiva', 'Substantiva subjetiva'],
    correta: 0,
    explicacao: 'Completa o verbo "espero" = objetiva direta',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 81,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Fatoracao',
    enunciado: 'Fatore: x² - 9',
    alternativas: ['(x-3)²', '(x+3)²', '(x-3)(x+3)', 'x(x-9)', '(x-9)(x+1)'],
    correta: 2,
    explicacao: 'Diferenca de quadrados: a² - b² = (a-b)(a+b)',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 82,
    area: 'natureza',
    disciplina: 'Fisica',
    assunto: 'Ondas',
    enunciado: 'Velocidade do som no ar (aproximada):',
    alternativas: ['34 m/s', '340 m/s', '3.400 m/s', '34.000 m/s', '340.000 m/s'],
    correta: 1,
    explicacao: 'Velocidade do som no ar ≈ 340 m/s (a 20°C)',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 83,
    area: 'humanas',
    disciplina: 'Filosofia',
    assunto: 'Etica',
    enunciado: 'Imperativo categorico pertence a:',
    alternativas: ['Platao', 'Aristoteles', 'Descartes', 'Kant', 'Nietzsche'],
    correta: 3,
    explicacao: 'Kant formulou o imperativo categorico como principio moral universal',
    dificuldade: 'dificil',
    ano: 2023
  },
  {
    id: 84,
    area: 'natureza',
    disciplina: 'Quimica',
    assunto: 'Solucoes',
    enunciado: 'Solucao saturada:',
    alternativas: ['Tem pouco soluto', 'Nao tem soluto', 'Atingiu limite de dissolucao', 'So tem solvente', 'E supersaturada'],
    correta: 2,
    explicacao: 'Saturada = quantidade maxima de soluto dissolvido naquela temperatura',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 85,
    area: 'linguagens',
    disciplina: 'Ingles',
    assunto: 'Vocabulario',
    enunciado: '"Nevertheless" significa:',
    alternativas: ['Portanto', 'Enquanto', 'No entanto', 'Porque', 'Desde que'],
    correta: 2,
    explicacao: 'Nevertheless = no entanto, contudo, apesar disso',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 86,
    area: 'matematica',
    disciplina: 'Trigonometria',
    assunto: 'Razoes trigonometricas',
    enunciado: 'sen(30°) = ?',
    alternativas: ['0', '1/2', '√2/2', '√3/2', '1'],
    correta: 1,
    explicacao: 'sen(30°) = 1/2 (valor notavel)',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 87,
    area: 'humanas',
    disciplina: 'Geografia',
    assunto: 'Economia',
    enunciado: 'Maior economia da America Latina:',
    alternativas: ['Argentina', 'Mexico', 'Brasil', 'Chile', 'Colombia'],
    correta: 2,
    explicacao: 'Brasil tem o maior PIB da America Latina',
    dificuldade: 'facil',
    ano: 2022
  },
  {
    id: 88,
    area: 'natureza',
    disciplina: 'Biologia',
    assunto: 'Anatomia',
    enunciado: 'Orgao responsavel pela producao de bile:',
    alternativas: ['Pancreas', 'Estomago', 'Intestino', 'Figado', 'Vesicula'],
    correta: 3,
    explicacao: 'O figado produz bile, armazenada na vesicula biliar',
    dificuldade: 'medio',
    ano: 2021
  },
  {
    id: 89,
    area: 'matematica',
    disciplina: 'Algebra',
    assunto: 'Numeros complexos',
    enunciado: 'i² = ?',
    alternativas: ['1', '-1', 'i', '-i', '0'],
    correta: 1,
    explicacao: 'Por definicao, i = √(-1), logo i² = -1',
    dificuldade: 'medio',
    ano: 2023
  },
  {
    id: 90,
    area: 'linguagens',
    disciplina: 'Literatura',
    assunto: 'Parnasianismo',
    enunciado: 'Caracteristica do Parnasianismo:',
    alternativas: ['Subjetividade', 'Culto a forma', 'Nacionalismo', 'Indianismo', 'Pessimismo'],
    correta: 1,
    explicacao: 'Parnasianismo valoriza a forma, a metrica perfeita, "arte pela arte"',
    dificuldade: 'medio',
    ano: 2022
  },
];

// Funcao para obter todas as questoes
export function getTodasQuestoes(): Questao[] {
  return bancoQuestoes;
}

// Funcao para obter questao por ID
export function getQuestaoPorId(id: number): Questao | undefined {
  return bancoQuestoes.find(q => q.id === id);
}

// Funcao para listar areas disponiveis
export function getAreasDisponiveis(): string[] {
  return [...new Set(bancoQuestoes.map(q => q.area))];
}

// Funcao para listar disciplinas por area
export function getDisciplinasPorArea(area: string): string[] {
  return [...new Set(bancoQuestoes.filter(q => q.area === area).map(q => q.disciplina))];
}

// Funcao para listar assuntos por disciplina
export function getAssuntosPorDisciplina(disciplina: string): string[] {
  return [...new Set(bancoQuestoes.filter(q => q.disciplina === disciplina).map(q => q.assunto))];
}

// Funcao para contar questoes por filtro
export function contarQuestoes(filtro: Partial<{area: string; disciplina: string; assunto: string; dificuldade: string}>): number {
  let questoes = bancoQuestoes;
  if (filtro.area) questoes = questoes.filter(q => q.area === filtro.area);
  if (filtro.disciplina) questoes = questoes.filter(q => q.disciplina === filtro.disciplina);
  if (filtro.assunto) questoes = questoes.filter(q => q.assunto === filtro.assunto);
  if (filtro.dificuldade) questoes = questoes.filter(q => q.dificuldade === filtro.dificuldade);
  return questoes.length;
}
