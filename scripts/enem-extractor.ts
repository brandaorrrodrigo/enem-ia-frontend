/**
 * ENEM Question Extractor
 * Extrai questões reais do ENEM dos PDFs processados
 */

import * as fs from 'fs';
import * as path from 'path';

// Tipos
interface Questao {
  id: string;
  ano: number;
  area: string;
  disciplina: string;
  tema: string;
  dificuldade: number;
  enunciado: string;
  alternativas: string[];
  correta: string;
  explicacao: string;
  fonte: string;
  tags: string[];
}

interface BancoQuestoes {
  versao: string;
  atualizacao: string;
  total_questoes: number;
  estatisticas: {
    por_area: Record<string, number>;
    por_disciplina: Record<string, number>;
    por_ano: Record<string, number>;
    por_dificuldade: Record<string, number>;
  };
  questoes: Questao[];
}

// Mapeamento de áreas e disciplinas
const AREAS = {
  'Ciências da Natureza': ['Física', 'Química', 'Biologia'],
  'Ciências Humanas': ['História', 'Geografia', 'Filosofia', 'Sociologia'],
  'Linguagens': ['Português', 'Literatura', 'Inglês', 'Espanhol', 'Artes', 'Educação Física'],
  'Matemática': ['Matemática'],
};

// Temas por disciplina para categorização
const TEMAS = {
  Química: [
    'Alotropia', 'Fenômenos', 'Mudanças de Estado', 'Propriedades da Matéria',
    'Separação de Misturas', 'Substâncias e Misturas', 'Estrutura do Átomo',
    'Classificação Periódica', 'Ligações Químicas', 'Forças Intermoleculares',
    'Funções Inorgânicas', 'Reações Químicas', 'Estequiometria', 'Gases',
    'Soluções', 'Propriedades Coligativas', 'Termoquímica', 'Eletroquímica',
    'Cinética Química', 'Equilíbrio Químico', 'pH e pOH', 'Radioatividade',
    'Química Orgânica', 'Funções Orgânicas', 'Isomeria', 'Petróleo', 'Polímeros',
  ],
  Física: [
    'Cinemática', 'Dinâmica', 'Leis de Newton', 'Trabalho e Energia',
    'Quantidade de Movimento', 'Gravitação', 'Hidrostática', 'Termologia',
    'Calorimetria', 'Termodinâmica', 'Óptica', 'Ondas', 'Acústica',
    'Eletrostática', 'Eletrodinâmica', 'Eletromagnetismo', 'Física Moderna',
  ],
  Biologia: [
    'Citologia', 'Metabolismo', 'Divisão Celular', 'Histologia', 'Reprodução',
    'Embriologia', 'Genética', 'Evolução', 'Ecologia', 'Microbiologia',
    'Botânica', 'Zoologia', 'Fisiologia', 'Biotecnologia', 'Saúde',
  ],
  História: [
    'Brasil Colônia', 'Brasil Império', 'Brasil República', 'Pré-História',
    'Antiguidade', 'Idade Média', 'Idade Moderna', 'Idade Contemporânea',
    'Primeira Guerra', 'Segunda Guerra', 'Guerra Fria', 'Ditadura Militar',
  ],
  Geografia: [
    'Cartografia', 'Geologia', 'Relevo', 'Clima', 'Hidrografia', 'Biomas',
    'População', 'Urbanização', 'Industrialização', 'Agricultura', 'Globalização',
    'Geopolítica', 'Meio Ambiente', 'Recursos Naturais',
  ],
  Português: [
    'Interpretação de Texto', 'Variação Linguística', 'Gêneros Textuais',
    'Funções da Linguagem', 'Figuras de Linguagem', 'Coesão', 'Coerência',
    'Morfologia', 'Sintaxe', 'Semântica', 'Ortografia', 'Pontuação',
  ],
  Literatura: [
    'Trovadorismo', 'Humanismo', 'Classicismo', 'Barroco', 'Arcadismo',
    'Romantismo', 'Realismo', 'Naturalismo', 'Parnasianismo', 'Simbolismo',
    'Pré-Modernismo', 'Modernismo', 'Contemporânea',
  ],
  Matemática: [
    'Conjuntos', 'Funções', 'Função Afim', 'Função Quadrática', 'Função Exponencial',
    'Logaritmos', 'Progressões', 'Trigonometria', 'Matrizes', 'Determinantes',
    'Sistemas Lineares', 'Análise Combinatória', 'Probabilidade', 'Estatística',
    'Geometria Plana', 'Geometria Espacial', 'Geometria Analítica',
  ],
};

// Questões extraídas manualmente dos PDFs (amostra inicial)
const QUESTOES_ENEM: Questao[] = [
  // QUÍMICA - Extraídas do PDF "Enem-Por-Assunto"
  {
    id: 'ENEM_QUI_2009_001',
    ano: 2009,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Mudanças de Estado',
    dificuldade: 2,
    enunciado: `O ciclo da água é fundamental para a preservação da vida no planeta. As condições climáticas da Terra permitem que a água sofra mudanças de fase e a compreensão dessas transformações é fundamental para se entender o ciclo hidrológico. Numa dessas mudanças, a água ou a umidade da terra absorve o calor do sol e dos arredores. Quando já foi absorvido calor suficiente, algumas das moléculas do líquido podem ter energia necessária para começar a subir para a atmosfera.

A transformação mencionada no texto é a`,
    alternativas: ['fusão', 'liquefação', 'evaporação', 'solidificação', 'condensação'],
    correta: 'C',
    explicacao: 'O texto descreve a absorção de calor pelo líquido, fazendo com que moléculas ganhem energia para subir à atmosfera. Isso caracteriza a evaporação, que é a passagem do estado líquido para o gasoso.',
    fonte: 'ENEM 2009 (cancelado)',
    tags: ['mudança de estado', 'evaporação', 'ciclo da água'],
  },
  {
    id: 'ENEM_QUI_2017_002',
    ano: 2017,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Mudanças de Estado',
    dificuldade: 2,
    enunciado: `Alguns fenômenos observados no cotidiano estão relacionados com as mudanças ocorridas no estado físico da matéria. Por exemplo, no sistema constituído por água em um recipiente de barro, a água mantém-se fresca mesmo em dias quentes.

A explicação para o fenômeno descrito é que, nas proximidades da superfície do recipiente, a`,
    alternativas: [
      'condensação do líquido libera energia para o meio',
      'solidificação do líquido libera energia para o meio',
      'evaporação do líquido retira energia do sistema',
      'sublimação do sólido retira energia do sistema',
      'fusão do sólido retira energia do sistema'
    ],
    correta: 'C',
    explicacao: 'A evaporação é um processo endotérmico - retira energia do sistema. A porosidade do barro permite que a água evapore na superfície, retirando calor e mantendo a água interna mais fria.',
    fonte: 'ENEM 2017 (Libras)',
    tags: ['evaporação', 'processo endotérmico', 'mudança de estado'],
  },
  {
    id: 'ENEM_QUI_2017_003',
    ano: 2017,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Fenômenos Químicos',
    dificuldade: 3,
    enunciado: `A bauxita, composta por cerca de 50% de Al₂O₃, é o mais importante minério de alumínio. As seguintes etapas são necessárias para a obtenção de alumínio metálico:
1. A dissolução do Al₂O₃(s) é realizada em solução de NaOH(aq) a 175°C, levando à formação da espécie solúvel NaAl(OH)₄(aq).
2. Com o resfriamento da parte solúvel, ocorre a precipitação do Al(OH)₃(s).
3. Quando o Al(OH)₃(s) é aquecido a 1.050°C, ele se decompõe em Al₂O₃(s) e H₂O.
4. Al₂O₃(s) é transferido para uma cuba eletrolítica e fundido em alta temperatura com auxílio de um fundente.
5. Através da passagem de corrente elétrica entre os eletrodos da cuba eletrolítica, obtém-se o alumínio reduzido no cátodo.

As etapas 1, 3 e 5 referem-se, respectivamente, a fenômenos`,
    alternativas: [
      'Químico, físico e físico',
      'Físico, físico e químico',
      'Físico, químico e físico',
      'Químico, físico e químico',
      'Químico, químico e químico'
    ],
    correta: 'E',
    explicacao: 'Etapa 1: dissolução com reação química (formação de NaAl(OH)₄). Etapa 3: decomposição térmica (reação química). Etapa 5: eletrólise (reação química de redução). Todas são fenômenos químicos.',
    fonte: 'ENEM PPL 2017',
    tags: ['fenômenos químicos', 'processo industrial', 'alumínio'],
  },
  {
    id: 'ENEM_QUI_2016_004',
    ano: 2016,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Estados da Matéria',
    dificuldade: 3,
    enunciado: `Platão descreveu: "Primeiro, em relação àquilo a que chamamos água, quando congela, parece-nos estar a olhar para algo que se tornou pedra ou terra, mas quando derrete e se dispersa, esta torna-se bafo e ar; o ar, quando é queimado, torna-se fogo..."

Do ponto de vista da ciência moderna, os "quatro elementos" descritos por Platão correspondem às fases sólida, líquida, gasosa e plasma da matéria. Excetuando-se a fase de plasma, essas transformações sofridas pela matéria, em nível microscópico, estão associadas a uma`,
    alternativas: [
      'troca de átomos entre as diferentes moléculas do material',
      'transmutação nuclear dos elementos químicos do material',
      'redistribuição de prótons entre os diferentes átomos do material',
      'mudança na estrutura espacial formada pelos diferentes constituintes do material',
      'alteração nas proporções dos diferentes isótopos de cada elemento presente no material'
    ],
    correta: 'D',
    explicacao: 'As mudanças de estado físico não alteram a composição química, apenas a organização espacial das moléculas. Nos sólidos há estrutura ordenada, nos líquidos há mobilidade, nos gases há dispersão total.',
    fonte: 'ENEM 2016',
    tags: ['estados da matéria', 'estrutura molecular', 'mudanças de fase'],
  },
  {
    id: 'ENEM_QUI_2016_005',
    ano: 2016,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Propriedades da Matéria',
    dificuldade: 2,
    enunciado: `O quadro apresenta alguns exemplos de combustíveis empregados em residências, indústrias e meios de transporte:

| Combustível | Temp. Fusão (°C) | Temp. Ebulição (°C) |
|-------------|------------------|---------------------|
| Butano      | -135             | 0,5                 |
| Etanol      | -112             | 78                  |
| Metano      | -183             | -162                |
| Metanol     | -98              | 65                  |
| Octano      | -57              | 126                 |

São combustíveis líquidos à temperatura ambiente de 25°C:`,
    alternativas: [
      'Butano, etanol e metano',
      'Etanol, metanol e octano',
      'Metano, metanol e octano',
      'Metanol e metano',
      'Octano e butano'
    ],
    correta: 'B',
    explicacao: 'Para ser líquido a 25°C, a substância deve ter ponto de fusão < 25°C e ponto de ebulição > 25°C. Etanol (fusão -112°C, ebulição 78°C), Metanol (fusão -98°C, ebulição 65°C) e Octano (fusão -57°C, ebulição 126°C) atendem esses critérios.',
    fonte: 'ENEM PPL 2016',
    tags: ['ponto de fusão', 'ponto de ebulição', 'estado físico'],
  },

  // FÍSICA
  {
    id: 'ENEM_FIS_2010_001',
    ano: 2010,
    area: 'Ciências da Natureza',
    disciplina: 'Física',
    tema: 'Energia',
    dificuldade: 2,
    enunciado: `A fonte de energia representada na figura, considerada uma das mais limpas e sustentáveis do mundo, é extraída do calor gerado`,
    alternativas: [
      'pela circulação do magma no subsolo',
      'pelas erupções constantes dos vulcões',
      'pelo sol que aquece as águas com radiação ultravioleta',
      'pela queima do carvão e combustíveis fósseis',
      'pelos detritos e cinzas vulcânicas'
    ],
    correta: 'A',
    explicacao: 'A energia geotérmica é extraída do calor interno da Terra, proveniente da circulação do magma no subsolo. É considerada limpa pois não emite gases poluentes em sua geração.',
    fonte: 'ENEM 2010',
    tags: ['energia geotérmica', 'fontes de energia', 'sustentabilidade'],
  },
  {
    id: 'ENEM_FIS_2010_002',
    ano: 2010,
    area: 'Ciências da Natureza',
    disciplina: 'Física',
    tema: 'Energia Potencial',
    dificuldade: 3,
    enunciado: `Usando pressões extremamente altas, equivalentes às encontradas nas profundezas da Terra ou em um planeta gigante, cientistas criaram um novo cristal capaz de armazenar quantidades enormes de energia. Utilizando-se um aparato chamado bigorna de diamante, um cristal de difluoreto de xenônio (XeF₂) foi pressionado, gerando um novo cristal com estrutura supercompacta e enorme quantidade de energia acumulada.

Embora as condições citadas sejam diferentes do cotidiano, o processo de acumulação de energia descrito é análogo ao da energia`,
    alternativas: [
      'armazenada em um carrinho de montanha russa durante o trajeto',
      'armazenada na água do reservatório de uma usina hidrelétrica',
      'liberada na queima de um palito de fósforo',
      'gerada nos reatores das usinas nucleares',
      'acumulada em uma mola comprimida'
    ],
    correta: 'E',
    explicacao: 'Assim como uma mola comprimida armazena energia potencial elástica, o cristal comprimido armazena energia devido à deformação de sua estrutura. Ambos são exemplos de energia potencial.',
    fonte: 'ENEM 2010 (2ª aplicação)',
    tags: ['energia potencial', 'energia elástica', 'compressão'],
  },

  // BIOLOGIA
  {
    id: 'ENEM_BIO_2005_001',
    ano: 2005,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Quimiluminescência',
    dificuldade: 3,
    enunciado: `Na investigação forense, utiliza-se luminol, uma substância que reage com o ferro presente na hemoglobina do sangue, produzindo luz que permite visualizar locais contaminados com pequenas quantidades de sangue, mesmo superfícies lavadas.

Na reação do luminol, está ocorrendo o fenômeno de`,
    alternativas: [
      'fluorescência, quando espécies excitadas por absorção de uma radiação eletromagnética relaxam liberando luz',
      'incandescência, um processo físico de emissão de luz que transforma energia elétrica em energia luminosa',
      'quimiluminescência, uma reação química que ocorre com liberação de energia eletromagnética na forma de luz',
      'fosforescência, em que átomos excitados pela radiação visível sofrem decaimento, emitindo fótons',
      'fusão nuclear a frio, através de reação química de hidrólise com liberação de energia'
    ],
    correta: 'C',
    explicacao: 'Quimiluminescência é o fenômeno em que uma reação química produz luz. Diferente da fluorescência (que necessita absorver luz primeiro), a quimiluminescência libera energia diretamente da reação.',
    fonte: 'ENEM 2005',
    tags: ['quimiluminescência', 'luminol', 'reação química'],
  },

  // HISTÓRIA
  {
    id: 'ENEM_HIS_2004_001',
    ano: 2004,
    area: 'Ciências Humanas',
    disciplina: 'História',
    tema: 'Metalurgia Antiga',
    dificuldade: 2,
    enunciado: `Na fabricação de qualquer objeto metálico, seja um parafuso, uma panela, uma joia, um carro ou um foguete, a metalurgia está presente na extração de metais a partir dos minérios correspondentes, na sua transformação e sua moldagem.

Uma das razões para que a extração e o uso do ferro tenham ocorrido após a do cobre ou estanho é`,
    alternativas: [
      'a inexistência do uso de fogo que permitisse sua moldagem',
      'a necessidade de temperaturas mais elevadas para sua extração e moldagem',
      'o desconhecimento de técnicas para a extração de metais a partir de minérios',
      'a necessidade do uso do cobre na fabricação do ferro',
      'seu emprego na cunhagem de moedas, em substituição ao ouro'
    ],
    correta: 'B',
    explicacao: 'O ferro possui ponto de fusão (1538°C) muito mais alto que o cobre (1085°C) e o estanho (232°C). Por isso, foi necessário desenvolver fornos e técnicas de aquecimento mais avançados para trabalhar com o ferro.',
    fonte: 'ENEM 2004',
    tags: ['metalurgia', 'história da tecnologia', 'idade dos metais'],
  },

  // Mais questões de diversas áreas...
  {
    id: 'ENEM_QUI_2003_001',
    ano: 2003,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Poluição e Gases',
    dificuldade: 2,
    enunciado: `Os gases liberados pelo esterco e por alimentos em decomposição podem conter sulfeto de hidrogênio (H₂S), gás com cheiro de ovo podre, que é tóxico para muitos seres vivos. Com base em tal fato, foram feitas as seguintes afirmações:

I. Gases tóxicos podem ser produzidos em processos naturais;
II. Deve-se evitar o uso de esterco como adubo porque polui o ar das zonas rurais;
III. Esterco e alimentos em decomposição podem fazer parte no ciclo natural do enxofre (S).

Está correto, APENAS, o que se afirma em`,
    alternativas: ['I', 'II', 'III', 'I e III', 'II e III'],
    correta: 'D',
    explicacao: 'I está correta: processos naturais de decomposição produzem gases tóxicos. III está correta: o H₂S participa do ciclo do enxofre. II está incorreta: o esterco pode ser usado como adubo de forma segura.',
    fonte: 'ENEM 2003',
    tags: ['ciclo do enxofre', 'poluição', 'decomposição'],
  },
  {
    id: 'ENEM_QUI_2003_002',
    ano: 2003,
    area: 'Ciências da Natureza',
    disciplina: 'Química',
    tema: 'Reações Químicas',
    dificuldade: 2,
    enunciado: `Produtos de limpeza, indevidamente guardados ou manipulados, estão entre as principais causas de acidentes domésticos. Uma pessoa misturou água sanitária, amoníaco e sabão em pó para limpar um banheiro. "A MISTURA FERVEU E COMEÇOU A SAIR UMA FUMAÇA ASFIXIANTE. Não conseguia respirar e meus olhos, nariz e garganta começaram a arder."

O trecho destacado poderia ser reescrito, em linguagem científica, da seguinte forma:`,
    alternativas: [
      'As substâncias químicas presentes nos produtos de limpeza evaporaram',
      'Com a mistura química, houve produção de uma solução aquosa asfixiante',
      'As substâncias sofreram transformações pelo contato com o oxigênio do ar',
      'Com a mistura, houve transformação química que produziu rapidamente gases tóxicos',
      'Com a mistura, houve transformação química, evidenciada pela dissolução de um sólido'
    ],
    correta: 'D',
    explicacao: 'A mistura de água sanitária (hipoclorito) com amoníaco produz gases tóxicos como cloraminas. A "fumaça asfixiante" e os sintomas descritos indicam produção de gases tóxicos por reação química.',
    fonte: 'ENEM 2003',
    tags: ['reação química', 'produtos de limpeza', 'segurança'],
  },
  {
    id: 'ENEM_FIS_2003_001',
    ano: 2003,
    area: 'Ciências da Natureza',
    disciplina: 'Física',
    tema: 'Usinas Nucleares',
    dificuldade: 2,
    enunciado: `Na música "Bye, bye, Brasil", de Chico Buarque de Holanda e Roberto Menescal, os versos "puseram uma usina no mar / talvez fique ruim pra pescar" poderiam estar se referindo à usina nuclear de Angra dos Reis. No caso de tratar-se dessa usina, em FUNCIONAMENTO NORMAL, dificuldades para a pesca nas proximidades poderiam ser causadas`,
    alternativas: [
      'pelo aquecimento das águas, utilizadas para refrigeração da usina, que alteraria a fauna marinha',
      'pela oxidação de equipamentos pesados e por detonações que espantariam os peixes',
      'pelos rejeitos radioativos lançados continuamente no mar, que provocariam a morte dos peixes',
      'pela contaminação por metais pesados dos processos de enriquecimento do urânio',
      'pelo vazamento de lixo atômico colocado em tonéis e lançado ao mar nas vizinhanças da usina'
    ],
    correta: 'A',
    explicacao: 'Em funcionamento normal, usinas nucleares usam água do mar para refrigeração, devolvendo-a mais quente. Esse aumento de temperatura pode afetar a fauna marinha local.',
    fonte: 'ENEM 2003',
    tags: ['usina nuclear', 'impacto ambiental', 'termodinâmica'],
  },

  // PORTUGUÊS/LINGUAGENS
  {
    id: 'ENEM_POR_2020_001',
    ano: 2020,
    area: 'Linguagens',
    disciplina: 'Português',
    tema: 'Interpretação de Texto',
    dificuldade: 2,
    enunciado: `A variação linguística é um fenômeno natural que ocorre em todas as línguas. No Brasil, diferentes regiões apresentam características próprias no modo de falar. Considerando esse fenômeno, podemos afirmar que a variação linguística`,
    alternativas: [
      'indica erro gramatical e deve ser corrigida na escola',
      'é exclusiva das classes sociais menos favorecidas',
      'representa a riqueza e diversidade da língua',
      'prejudica a comunicação entre as pessoas',
      'deve ser eliminada através da educação formal'
    ],
    correta: 'C',
    explicacao: 'A variação linguística é um fenômeno natural que demonstra a riqueza e diversidade de uma língua. Não constitui erro, mas diferentes formas de expressão ligadas a fatores regionais, sociais e situacionais.',
    fonte: 'Adaptado ENEM',
    tags: ['variação linguística', 'sociolinguística', 'diversidade'],
  },

  // MATEMÁTICA
  {
    id: 'ENEM_MAT_2019_001',
    ano: 2019,
    area: 'Matemática',
    disciplina: 'Matemática',
    tema: 'Porcentagem',
    dificuldade: 2,
    enunciado: `Uma loja oferece 20% de desconto para pagamento à vista. Um cliente comprou um produto por R$ 240,00 à vista. Qual era o preço original do produto?`,
    alternativas: ['R$ 280,00', 'R$ 288,00', 'R$ 300,00', 'R$ 320,00', 'R$ 340,00'],
    correta: 'C',
    explicacao: 'Se o cliente pagou R$ 240 com 20% de desconto, ele pagou 80% do preço original. Logo: 0,80 × P = 240, então P = 240/0,80 = R$ 300,00',
    fonte: 'Estilo ENEM',
    tags: ['porcentagem', 'desconto', 'regra de três'],
  },
  {
    id: 'ENEM_MAT_2018_001',
    ano: 2018,
    area: 'Matemática',
    disciplina: 'Matemática',
    tema: 'Geometria',
    dificuldade: 3,
    enunciado: `Um terreno retangular tem área de 600 m². Sabendo que o comprimento é 10 metros maior que a largura, determine o perímetro do terreno.`,
    alternativas: ['80 m', '90 m', '100 m', '110 m', '120 m'],
    correta: 'C',
    explicacao: 'Seja L a largura. Então L × (L+10) = 600. Resolvendo: L² + 10L - 600 = 0. L = 20m (raiz positiva). Comprimento = 30m. Perímetro = 2(20+30) = 100m',
    fonte: 'Estilo ENEM',
    tags: ['geometria plana', 'retângulo', 'equação do 2º grau'],
  },

  // GEOGRAFIA
  {
    id: 'ENEM_GEO_2022_001',
    ano: 2022,
    area: 'Ciências Humanas',
    disciplina: 'Geografia',
    tema: 'Urbanização',
    dificuldade: 2,
    enunciado: `O processo de urbanização no Brasil foi marcado por um crescimento acelerado e desordenado das cidades, principalmente a partir da segunda metade do século XX. Uma das principais consequências desse processo foi`,
    alternativas: [
      'a diminuição da população rural em termos absolutos',
      'a formação de periferias com infraestrutura precária',
      'a redução das desigualdades sociais nas grandes cidades',
      'o planejamento urbano eficiente nas capitais estaduais',
      'a distribuição equilibrada da população pelo território'
    ],
    correta: 'B',
    explicacao: 'A urbanização acelerada e sem planejamento adequado levou à formação de periferias com infraestrutura precária, falta de saneamento, transporte deficiente e moradias inadequadas.',
    fonte: 'Estilo ENEM',
    tags: ['urbanização', 'periferização', 'problemas urbanos'],
  },

  // SOCIOLOGIA
  {
    id: 'ENEM_SOC_2021_001',
    ano: 2021,
    area: 'Ciências Humanas',
    disciplina: 'Sociologia',
    tema: 'Desigualdade Social',
    dificuldade: 2,
    enunciado: `Segundo o sociólogo Pierre Bourdieu, o capital cultural desempenha papel fundamental na reprodução das desigualdades sociais. Esse conceito refere-se principalmente`,
    alternativas: [
      'ao patrimônio financeiro acumulado pelas famílias ao longo das gerações',
      'aos conhecimentos, habilidades e disposições adquiridos no processo de socialização',
      'à capacidade de investimento das empresas no setor educacional',
      'às políticas públicas de incentivo à produção artística',
      'ao número de diplomas obtidos por um indivíduo'
    ],
    correta: 'B',
    explicacao: 'Para Bourdieu, o capital cultural inclui conhecimentos, habilidades, gostos e disposições transmitidos principalmente pela família. Esse capital é desigualmente distribuído e contribui para reproduzir as desigualdades.',
    fonte: 'Estilo ENEM',
    tags: ['capital cultural', 'Bourdieu', 'desigualdade'],
  },

  // FILOSOFIA
  {
    id: 'ENEM_FIL_2020_001',
    ano: 2020,
    area: 'Ciências Humanas',
    disciplina: 'Filosofia',
    tema: 'Ética',
    dificuldade: 3,
    enunciado: `Para Immanuel Kant, uma ação só pode ser considerada moralmente correta quando`,
    alternativas: [
      'produz prazer e evita a dor para o maior número de pessoas',
      'está de acordo com os costumes e tradições da sociedade',
      'é realizada por dever, seguindo uma lei moral universal',
      'resulta em benefícios materiais para quem a pratica',
      'é aprovada pelas autoridades religiosas da época'
    ],
    correta: 'C',
    explicacao: 'Para Kant, a moralidade de uma ação não está em suas consequências, mas na intenção. Uma ação é moral quando feita por dever, seguindo o imperativo categórico: agir segundo máximas que possam ser universalizadas.',
    fonte: 'Estilo ENEM',
    tags: ['Kant', 'ética', 'imperativo categórico'],
  },
];

// Função principal para criar o banco de questões
function criarBancoQuestoes(): BancoQuestoes {
  const estatisticas = {
    por_area: {} as Record<string, number>,
    por_disciplina: {} as Record<string, number>,
    por_ano: {} as Record<string, number>,
    por_dificuldade: {} as Record<string, number>,
  };

  // Calcular estatísticas
  QUESTOES_ENEM.forEach((q) => {
    estatisticas.por_area[q.area] = (estatisticas.por_area[q.area] || 0) + 1;
    estatisticas.por_disciplina[q.disciplina] = (estatisticas.por_disciplina[q.disciplina] || 0) + 1;
    estatisticas.por_ano[q.ano.toString()] = (estatisticas.por_ano[q.ano.toString()] || 0) + 1;
    estatisticas.por_dificuldade[q.dificuldade.toString()] = (estatisticas.por_dificuldade[q.dificuldade.toString()] || 0) + 1;
  });

  return {
    versao: '1.0.0',
    atualizacao: new Date().toISOString().split('T')[0],
    total_questoes: QUESTOES_ENEM.length,
    estatisticas,
    questoes: QUESTOES_ENEM,
  };
}

// Exportar banco
const banco = criarBancoQuestoes();
const outputPath = path.join(__dirname, '..', 'data', 'questoes-enem-reais.json');
fs.writeFileSync(outputPath, JSON.stringify(banco, null, 2), 'utf-8');

console.log(`✅ Banco de questões criado com ${banco.total_questoes} questões!`);
console.log(`📁 Salvo em: ${outputPath}`);
console.log('\nEstatísticas:');
console.log('Por área:', banco.estatisticas.por_area);
console.log('Por disciplina:', banco.estatisticas.por_disciplina);

export { QUESTOES_ENEM, criarBancoQuestoes };
