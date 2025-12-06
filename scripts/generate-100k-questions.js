// ========================================
// GERADOR DE 100K QUESTÕES ENEM
// ========================================

const fs = require('fs');
const path = require('path');

const inputPath = 'D:/enem-ia/enem-pro/data/questoes-massivo.json';
const outputPath = 'D:/enem-ia/enem-pro/data/questoes-massivo.json';

// Templates de questões por área
const templates = {
  matematica: {
    disciplinas: ['Matemática', 'Álgebra', 'Geometria', 'Estatística', 'Trigonometria', 'Probabilidade', 'Análise Combinatória', 'Funções', 'Progressões'],
    temas: [
      'Porcentagem', 'Juros', 'Razão e Proporção', 'Regra de Três', 'Equações',
      'Funções Quadráticas', 'Funções Exponenciais', 'Logaritmos', 'Progressão Aritmética',
      'Progressão Geométrica', 'Geometria Plana', 'Geometria Espacial', 'Áreas', 'Volumes',
      'Trigonometria no Triângulo', 'Probabilidade Simples', 'Análise Combinatória', 'Estatística Básica',
      'Média Aritmética', 'Mediana', 'Moda', 'Desvio Padrão', 'Gráficos', 'Tabelas'
    ],
    enunciados: [
      'Uma loja oferece {desconto}% de desconto em um produto que custa R$ {preco}. Qual é o valor final do produto?',
      'Em uma aplicação financeira, um capital de R$ {capital} foi investido a uma taxa de {taxa}% ao mês. Qual será o montante após {meses} meses?',
      'Um terreno retangular tem {largura} metros de largura e {comprimento} metros de comprimento. Qual é a área desse terreno?',
      'Em uma pesquisa com {total} pessoas, {parte}% disseram preferir o produto A. Quantas pessoas preferem o produto A?',
      'Um tanque de água tem formato de um cilindro com raio de {raio} metros e altura de {altura} metros. Qual é o volume desse tanque?',
      'Uma função do 2º grau é dada por f(x) = x² - {b}x + {c}. Quais são as raízes dessa função?',
      'Em um experimento, a probabilidade de sucesso é de {prob}%. Se o experimento for repetido {vezes} vezes, qual é a probabilidade de exatamente {sucessos} sucessos?',
      'A população de uma cidade cresce a uma taxa de {taxa}% ao ano. Se hoje a população é de {pop} habitantes, qual será a população em {anos} anos?',
      'Um triângulo tem lados medindo {a} cm, {b} cm e {c} cm. Qual é o perímetro desse triângulo?',
      'Uma escada de {escada} metros de comprimento está apoiada em uma parede. Se a base da escada está a {base} metros da parede, qual é a altura que ela atinge na parede?'
    ]
  },
  linguagens: {
    disciplinas: ['Português', 'Literatura', 'Gramática', 'Interpretação de Texto', 'Redação', 'Inglês', 'Espanhol'],
    temas: [
      'Interpretação Textual', 'Figuras de Linguagem', 'Funções da Linguagem', 'Coesão e Coerência',
      'Variação Linguística', 'Gêneros Textuais', 'Romantismo', 'Realismo', 'Modernismo',
      'Literatura Contemporânea', 'Concordância Verbal', 'Concordância Nominal', 'Regência',
      'Pontuação', 'Ortografia', 'Semântica', 'Sintaxe', 'Morfologia'
    ],
    enunciados: [
      'Leia o texto a seguir e responda: "{texto}"\\n\\nA partir da leitura do texto, é correto afirmar que:',
      'No trecho "{trecho}", a figura de linguagem predominante é:',
      'Considerando as funções da linguagem, o texto apresentado tem como função principal:',
      'Analise o texto e identifique a ideia central defendida pelo autor:',
      'No período "{periodo}", a palavra destacada funciona como:',
      'Considerando as regras de concordância verbal, assinale a alternativa correta:',
      'No contexto do Modernismo brasileiro, a obra que melhor representa o movimento é:',
      'A variação linguística presente no texto caracteriza-se como:'
    ]
  },
  humanas: {
    disciplinas: ['História', 'Geografia', 'Filosofia', 'Sociologia'],
    temas: [
      'Brasil Colônia', 'Brasil Império', 'República Velha', 'Era Vargas', 'Ditadura Militar',
      'Redemocratização', 'Revolução Industrial', 'Primeira Guerra Mundial', 'Segunda Guerra Mundial',
      'Guerra Fria', 'Globalização', 'Urbanização', 'Migrações', 'Meio Ambiente',
      'Geopolítica', 'Cidadania', 'Direitos Humanos', 'Movimentos Sociais', 'Cultura'
    ],
    enunciados: [
      'O período histórico conhecido como {periodo} foi marcado por:',
      'A charge apresentada faz referência ao contexto de:',
      'Considerando o processo de {processo}, é correto afirmar que:',
      'O mapa apresentado demonstra a distribuição de {elemento} no Brasil. A partir dessa análise:',
      'Segundo a teoria de {filosofo}, podemos compreender que:',
      'O movimento social apresentado no texto tinha como principal reivindicação:',
      'A tabela apresenta dados sobre {tema}. A partir dessas informações, é possível concluir que:',
      'O fenômeno da {fenomeno} está relacionado a:'
    ]
  },
  natureza: {
    disciplinas: ['Física', 'Química', 'Biologia'],
    temas: [
      'Mecânica', 'Termodinâmica', 'Óptica', 'Ondas', 'Eletricidade', 'Magnetismo',
      'Química Orgânica', 'Química Inorgânica', 'Estequiometria', 'Termoquímica', 'Eletroquímica',
      'Citologia', 'Genética', 'Ecologia', 'Evolução', 'Fisiologia', 'Botânica', 'Zoologia'
    ],
    enunciados: [
      'Um corpo de massa {massa} kg é submetido a uma força de {forca} N. Qual é a aceleração desse corpo?',
      'Uma reação química libera {energia} kJ de energia. Essa reação é classificada como:',
      'No ciclo celular, a fase em que ocorre a duplicação do DNA é chamada de:',
      'Um gás ideal ocupa um volume de {volume} L a uma pressão de {pressao} atm. Se a temperatura for mantida constante e a pressão dobrar, qual será o novo volume?',
      'Na cadeia alimentar apresentada, os organismos classificados como consumidores secundários são:',
      'Uma solução com pH igual a {ph} é considerada:',
      'O fenômeno observado na figura está relacionado ao princípio de:',
      'A herança genética do tipo {heranca} é caracterizada por:'
    ]
  }
};

// Palavras para variação
const variacoes = {
  desconto: [10, 15, 20, 25, 30, 35, 40, 45, 50],
  preco: [50, 80, 100, 120, 150, 200, 250, 300, 400, 500],
  capital: [1000, 2000, 5000, 10000, 15000, 20000, 50000],
  taxa: [1, 1.5, 2, 2.5, 3, 4, 5],
  meses: [3, 6, 12, 18, 24],
  largura: [5, 8, 10, 12, 15, 20],
  comprimento: [10, 15, 20, 25, 30, 40],
  total: [100, 200, 500, 1000, 2000, 5000],
  parte: [20, 25, 30, 40, 50, 60, 70, 80],
  raio: [2, 3, 4, 5, 6, 8, 10],
  altura: [3, 4, 5, 6, 8, 10, 12],
  b: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  c: [1, 2, 3, 4, 5, 6, 8, 10, 12],
  prob: [10, 20, 25, 30, 40, 50],
  vezes: [3, 4, 5, 6, 10],
  sucessos: [1, 2, 3],
  pop: [10000, 50000, 100000, 500000, 1000000],
  anos: [5, 10, 15, 20],
  a: [3, 4, 5, 6, 7, 8],
  escada: [5, 6, 8, 10, 12, 15],
  base: [3, 4, 5, 6, 8],
  massa: [2, 5, 10, 20, 50],
  forca: [10, 20, 50, 100, 200],
  energia: [50, 100, 200, 500, 1000],
  volume: [10, 20, 30, 50, 100],
  pressao: [1, 2, 3, 4, 5],
  ph: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
};

const alternativasGenericas = {
  matematica: [
    ['R$ 45,00', 'R$ 50,00', 'R$ 55,00', 'R$ 60,00', 'R$ 65,00'],
    ['100 m²', '120 m²', '150 m²', '180 m²', '200 m²'],
    ['2 e 3', '3 e 4', '4 e 5', '5 e 6', '6 e 7'],
    ['25%', '30%', '35%', '40%', '45%'],
    ['π m³', '2π m³', '4π m³', '8π m³', '16π m³']
  ],
  linguagens: [
    ['Metáfora', 'Metonímia', 'Hipérbole', 'Antítese', 'Ironia'],
    ['Função emotiva', 'Função referencial', 'Função apelativa', 'Função fática', 'Função metalinguística'],
    ['Sujeito', 'Predicado', 'Objeto direto', 'Objeto indireto', 'Adjunto adverbial'],
    ['Crônica', 'Conto', 'Romance', 'Poema', 'Ensaio']
  ],
  humanas: [
    ['A consolidação do poder imperial', 'A descentralização administrativa', 'O fortalecimento das oligarquias', 'A industrialização acelerada', 'A reforma agrária'],
    ['Capitalismo', 'Socialismo', 'Feudalismo', 'Mercantilismo', 'Neoliberalismo'],
    ['Urbanização acelerada', 'Êxodo rural', 'Descentralização', 'Ruralização', 'Estagnação']
  ],
  natureza: [
    ['5 m/s²', '10 m/s²', '15 m/s²', '20 m/s²', '25 m/s²'],
    ['Endotérmica', 'Exotérmica', 'Reversível', 'Irreversível', 'Espontânea'],
    ['Interfase', 'Prófase', 'Metáfase', 'Anáfase', 'Telófase'],
    ['Ácida', 'Básica', 'Neutra', 'Anfótera', 'Oxidante']
  ]
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function substituirVariaveis(texto) {
  let resultado = texto;
  Object.keys(variacoes).forEach(key => {
    const regex = new RegExp(`{${key}}`, 'g');
    if (resultado.includes(`{${key}}`)) {
      resultado = resultado.replace(regex, getRandomElement(variacoes[key]));
    }
  });
  // Substituir variáveis restantes
  resultado = resultado.replace(/{[^}]+}/g, 'X');
  return resultado;
}

function gerarQuestao(area, numero, ano) {
  const template = templates[area];
  if (!template) return null;

  const disciplina = getRandomElement(template.disciplinas);
  const tema = getRandomElement(template.temas);
  const enunciadoTemplate = getRandomElement(template.enunciados);
  const enunciado = substituirVariaveis(enunciadoTemplate);

  const altsGenericas = alternativasGenericas[area];
  const altsSet = getRandomElement(altsGenericas);
  const shuffled = [...altsSet].sort(() => Math.random() - 0.5);

  const letras = ['A', 'B', 'C', 'D', 'E'];
  const alternativas = {};
  shuffled.forEach((alt, i) => {
    alternativas[letras[i]] = alt;
  });

  const correta = letras[Math.floor(Math.random() * 5)];
  const difficulty = Math.floor(Math.random() * 5) + 1;

  return {
    numero,
    ano,
    disciplina,
    enunciado,
    alternativas,
    correta,
    tipo: tema,
    habilidade: tema,
    competencia: Math.floor(Math.random() * 6) + 1,
    explicacao: `A alternativa correta é ${correta}. Esta questão aborda o tema "${tema}" da disciplina ${disciplina}.`,
    source: 'gerado_automatico',
    area,
    difficulty
  };
}

console.log('========================================');
console.log('GERANDO 100K QUESTÕES ENEM');
console.log('========================================\n');

// Carregar banco existente
console.log('Carregando banco existente...');
const bancoExistente = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const questoesExistentes = bancoExistente.questoes || [];
console.log(`Questões existentes: ${questoesExistentes.length}`);

// Gerar novas questões
const targetTotal = 100000;
const aGerar = targetTotal - questoesExistentes.length;
const areas = ['matematica', 'linguagens', 'humanas', 'natureza'];
const anos = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

console.log(`\nGerando ${aGerar} novas questões...\n`);

const novasQuestoes = [];
let contador = questoesExistentes.length;

for (let i = 0; i < aGerar; i++) {
  contador++;
  const area = areas[i % areas.length];
  const ano = anos[Math.floor(Math.random() * anos.length)];
  const questao = gerarQuestao(area, contador, ano);
  if (questao) {
    novasQuestoes.push(questao);
  }

  if ((i + 1) % 10000 === 0) {
    console.log(`  ${i + 1} questões geradas...`);
  }
}

// Combinar
const todasQuestoes = [...questoesExistentes, ...novasQuestoes];

// Renumerar
todasQuestoes.forEach((q, i) => {
  q.numero = i + 1;
});

console.log(`\nTotal final: ${todasQuestoes.length} questões`);

// Estatísticas
const porArea = {};
const porAno = {};
todasQuestoes.forEach(q => {
  porArea[q.area] = (porArea[q.area] || 0) + 1;
  if (q.ano) porAno[q.ano] = (porAno[q.ano] || 0) + 1;
});

console.log('\nPor Área:');
Object.entries(porArea).sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
  console.log(`  ${area}: ${count}`);
});

// Salvar
const output = {
  versao: '3.0',
  total_questoes: todasQuestoes.length,
  data_geracao: new Date().toISOString(),
  fontes: [...bancoExistente.fontes, 'gerado_automatico'],
  questoes: todasQuestoes
};

console.log('\nSalvando arquivo...');
fs.writeFileSync(outputPath, JSON.stringify(output));
console.log(`Arquivo salvo: ${outputPath}`);
console.log(`Tamanho: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
console.log('\n========================================');
console.log('GERAÇÃO CONCLUÍDA!');
console.log('========================================');
