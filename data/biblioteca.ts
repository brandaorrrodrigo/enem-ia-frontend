/**
 * BIBLIOTECA ENEM PRO - Dados Centralizados
 * Estrutura completa de todos os módulos de todas as disciplinas
 * SEM FP (apenas o quiz após estudo gera FP)
 */

export interface Modulo {
  title: string;
  slug: string;
  descricao: string;
  icon: string;
}

export interface Materia {
  id: string;
  nome: string;
  nomeCompleto: string;
  icon: string;
  color: string;
  modulos: Modulo[];
}

export const MATERIAS: Materia[] = [
  {
    id: 'matematica',
    nome: 'Matemática',
    nomeCompleto: 'Matemática e suas Tecnologias',
    icon: '🔢',
    color: '#3b82f6',
    modulos: [
      {
        title: 'Aritmética Básica',
        slug: 'aritmetica-basica',
        descricao: 'Operações fundamentais, frações e números decimais',
        icon: '🔢',
      },
      {
        title: 'Porcentagem',
        slug: 'porcentagem',
        descricao: 'Cálculos percentuais e aplicações práticas',
        icon: '%',
      },
      {
        title: 'Razão e Proporção',
        slug: 'razao-proporcao',
        descricao: 'Regra de três simples e composta',
        icon: '⚖️',
      },
      {
        title: 'Funções',
        slug: 'funcoes',
        descricao: 'Tipos de funções, domínio, imagem e gráficos',
        icon: '📊',
      },
      {
        title: 'Função Afim',
        slug: 'funcao-afim',
        descricao: 'Função do 1º grau e aplicações',
        icon: '📈',
      },
      {
        title: 'Função Quadrática',
        slug: 'funcao-quadratica',
        descricao: 'Função do 2º grau, parábola e vértice',
        icon: '🎢',
      },
      {
        title: 'Progressões',
        slug: 'progressoes',
        descricao: 'Progressão aritmética e geométrica',
        icon: '🔢',
      },
      {
        title: 'Geometria Plana',
        slug: 'geometria-plana',
        descricao: 'Áreas, perímetros e teoremas',
        icon: '📏',
      },
      {
        title: 'Geometria Espacial',
        slug: 'geometria-espacial',
        descricao: 'Volumes e áreas de sólidos geométricos',
        icon: '🎲',
      },
      {
        title: 'Trigonometria',
        slug: 'trigonometria',
        descricao: 'Seno, cosseno, tangente e aplicações',
        icon: '📐',
      },
      {
        title: 'Estatística',
        slug: 'estatistica',
        descricao: 'Média, mediana, moda e gráficos',
        icon: '📊',
      },
      {
        title: 'Probabilidade',
        slug: 'probabilidade',
        descricao: 'Cálculo de probabilidades e eventos',
        icon: '🎲',
      },
      {
        title: 'Análise Combinatória',
        slug: 'analise-combinatoria',
        descricao: 'Permutações, arranjos e combinações',
        icon: '🎯',
      },
      {
        title: 'Matrizes e Determinantes',
        slug: 'matrizes-determinantes',
        descricao: 'Operações com matrizes e cálculo de determinantes',
        icon: '🔲',
      },
    ],
  },
  {
    id: 'fisica',
    nome: 'Física',
    nomeCompleto: 'Ciências da Natureza - Física',
    icon: '⚛️',
    color: '#10b981',
    modulos: [
      {
        title: 'Cinemática',
        slug: 'cinematica',
        descricao: 'Movimento uniforme e variado',
        icon: '🚗',
      },
      {
        title: 'Dinâmica',
        slug: 'dinamica',
        descricao: 'Leis de Newton e aplicações',
        icon: '⚡',
      },
      {
        title: 'Energia Mecânica',
        slug: 'energia-mecanica',
        descricao: 'Trabalho, potência e conservação de energia',
        icon: '⚡',
      },
      {
        title: 'Hidrostática',
        slug: 'hidrostatica',
        descricao: 'Pressão, empuxo e princípios fundamentais',
        icon: '💧',
      },
      {
        title: 'Termologia',
        slug: 'termologia',
        descricao: 'Calor, temperatura e dilatação térmica',
        icon: '🌡️',
      },
      {
        title: 'Termodinâmica',
        slug: 'termodinamica',
        descricao: 'Leis da termodinâmica e máquinas térmicas',
        icon: '♨️',
      },
      {
        title: 'Ondulatória',
        slug: 'ondulatoria',
        descricao: 'Ondas mecânicas e fenômenos ondulatórios',
        icon: '🌊',
      },
      {
        title: 'Óptica',
        slug: 'optica',
        descricao: 'Reflexão, refração e lentes',
        icon: '🔦',
      },
      {
        title: 'Eletrostática',
        slug: 'eletrostatica',
        descricao: 'Cargas elétricas e campo elétrico',
        icon: '⚡',
      },
      {
        title: 'Eletrodinâmica',
        slug: 'eletrodinamica',
        descricao: 'Corrente elétrica e circuitos',
        icon: '💡',
      },
      {
        title: 'Eletromagnetismo',
        slug: 'eletromagnetismo',
        descricao: 'Campo magnético e indução eletromagnética',
        icon: '🧲',
      },
      {
        title: 'Física Moderna',
        slug: 'fisica-moderna',
        descricao: 'Relatividade, quântica e física nuclear',
        icon: '⚛️',
      },
    ],
  },
  {
    id: 'quimica',
    nome: 'Química',
    nomeCompleto: 'Ciências da Natureza - Química',
    icon: '🧪',
    color: '#f59e0b',
    modulos: [
      {
        title: 'Atomística',
        slug: 'atomistica',
        descricao: 'Estrutura atômica e modelos atômicos',
        icon: '⚛️',
      },
      {
        title: 'Tabela Periódica',
        slug: 'tabela-periodica',
        descricao: 'Propriedades periódicas e classificação',
        icon: '🔬',
      },
      {
        title: 'Ligações Químicas',
        slug: 'ligacoes-quimicas',
        descricao: 'Iônica, covalente e metálica',
        icon: '🔗',
      },
      {
        title: 'Funções Inorgânicas',
        slug: 'funcoes-inorganicas',
        descricao: 'Ácidos, bases, sais e óxidos',
        icon: '⚗️',
      },
      {
        title: 'Reações Químicas',
        slug: 'reacoes-quimicas',
        descricao: 'Tipos de reações e balanceamento',
        icon: '🧪',
      },
      {
        title: 'Estequiometria',
        slug: 'estequiometria',
        descricao: 'Cálculos químicos e mol',
        icon: '⚖️',
      },
      {
        title: 'Soluções',
        slug: 'solucoes',
        descricao: 'Concentrações e diluições',
        icon: '🧫',
      },
      {
        title: 'Termoquímica',
        slug: 'termoquimica',
        descricao: 'Entalpia e reações exotérmicas',
        icon: '🔥',
      },
      {
        title: 'Cinética Química',
        slug: 'cinetica-quimica',
        descricao: 'Velocidade das reações e fatores',
        icon: '⏱️',
      },
      {
        title: 'Equilíbrio Químico',
        slug: 'equilibrio-quimico',
        descricao: 'Constantes de equilíbrio e Le Chatelier',
        icon: '⚖️',
      },
      {
        title: 'Eletroquímica',
        slug: 'eletroquimica',
        descricao: 'Pilhas e eletrólise',
        icon: '🔋',
      },
      {
        title: 'Química Orgânica',
        slug: 'quimica-organica',
        descricao: 'Funções orgânicas e nomenclatura',
        icon: '🧪',
      },
      {
        title: 'Radioatividade',
        slug: 'radioatividade',
        descricao: 'Decaimento radioativo e aplicações',
        icon: '☢️',
      },
    ],
  },
  {
    id: 'biologia',
    nome: 'Biologia',
    nomeCompleto: 'Ciências da Natureza - Biologia',
    icon: '🧬',
    color: '#22c55e',
    modulos: [
      {
        title: 'Citologia',
        slug: 'citologia',
        descricao: 'Estrutura e função celular',
        icon: '🔬',
      },
      {
        title: 'Membrana e Transporte',
        slug: 'membrana-transporte',
        descricao: 'Transporte através da membrana celular',
        icon: '🚪',
      },
      {
        title: 'Metabolismo Energético',
        slug: 'metabolismo-energetico',
        descricao: 'Fotossíntese e respiração celular',
        icon: '⚡',
      },
      {
        title: 'Divisão Celular',
        slug: 'divisao-celular',
        descricao: 'Mitose e meiose',
        icon: '🔄',
      },
      {
        title: 'Genética Clássica',
        slug: 'genetica-classica',
        descricao: 'Leis de Mendel e hereditariedade',
        icon: '🧬',
      },
      {
        title: 'Genética Molecular',
        slug: 'genetica-molecular',
        descricao: 'DNA, RNA e síntese proteica',
        icon: '🧬',
      },
      {
        title: 'Biotecnologia',
        slug: 'biotecnologia',
        descricao: 'Engenharia genética e aplicações',
        icon: '🔬',
      },
      {
        title: 'Evolução',
        slug: 'evolucao',
        descricao: 'Teorias evolutivas e seleção natural',
        icon: '🦎',
      },
      {
        title: 'Ecologia',
        slug: 'ecologia',
        descricao: 'Ecossistemas e relações ecológicas',
        icon: '🌿',
      },
      {
        title: 'Ciclos Biogeoquímicos',
        slug: 'ciclos-biogeoquimicos',
        descricao: 'Ciclo da água, carbono e nitrogênio',
        icon: '♻️',
      },
      {
        title: 'Fisiologia Humana',
        slug: 'fisiologia-humana',
        descricao: 'Sistemas do corpo humano',
        icon: '🫀',
      },
      {
        title: 'Botânica',
        slug: 'botanica',
        descricao: 'Morfologia e fisiologia vegetal',
        icon: '🌱',
      },
      {
        title: 'Zoologia',
        slug: 'zoologia',
        descricao: 'Classificação e características dos animais',
        icon: '🦋',
      },
    ],
  },
  {
    id: 'portugues',
    nome: 'Português',
    nomeCompleto: 'Linguagens e Códigos - Português',
    icon: '📖',
    color: '#8b5cf6',
    modulos: [
      {
        title: 'Interpretação de Texto',
        slug: 'interpretacao-texto',
        descricao: 'Técnicas de leitura e compreensão textual',
        icon: '🔍',
      },
      {
        title: 'Gêneros Textuais',
        slug: 'generos-textuais',
        descricao: 'Narrativo, dissertativo, descritivo e outros',
        icon: '📝',
      },
      {
        title: 'Gramática - Morfologia',
        slug: 'gramatica-morfologia',
        descricao: 'Classes de palavras e estrutura',
        icon: '📚',
      },
      {
        title: 'Gramática - Sintaxe',
        slug: 'gramatica-sintaxe',
        descricao: 'Análise sintática e orações',
        icon: '🔤',
      },
      {
        title: 'Concordância',
        slug: 'concordancia',
        descricao: 'Concordância verbal e nominal',
        icon: '✓',
      },
      {
        title: 'Regência',
        slug: 'regencia',
        descricao: 'Regência verbal e nominal',
        icon: '➡️',
      },
      {
        title: 'Crase',
        slug: 'crase',
        descricao: 'Uso da crase e casos especiais',
        icon: 'à',
      },
      {
        title: 'Figuras de Linguagem',
        slug: 'figuras-linguagem',
        descricao: 'Metáfora, metonímia e outras figuras',
        icon: '🎭',
      },
      {
        title: 'Literatura - Trovadorismo ao Barroco',
        slug: 'literatura-classica',
        descricao: 'Movimentos literários clássicos',
        icon: '📜',
      },
      {
        title: 'Literatura - Arcadismo ao Realismo',
        slug: 'literatura-moderna',
        descricao: 'Literatura dos séculos XVIII e XIX',
        icon: '📚',
      },
      {
        title: 'Literatura - Modernismo',
        slug: 'literatura-modernismo',
        descricao: 'Semanas de arte e autores modernistas',
        icon: '🎨',
      },
      {
        title: 'Literatura Contemporânea',
        slug: 'literatura-contemporanea',
        descricao: 'Autores e obras atuais',
        icon: '📖',
      },
    ],
  },
  {
    id: 'historia',
    nome: 'História',
    nomeCompleto: 'Ciências Humanas - História',
    icon: '🏛️',
    color: '#ef4444',
    modulos: [
      {
        title: 'Antiguidade Clássica',
        slug: 'antiguidade-classica',
        descricao: 'Grécia e Roma antigas',
        icon: '🏛️',
      },
      {
        title: 'Idade Média',
        slug: 'idade-media',
        descricao: 'Feudalismo e sociedade medieval',
        icon: '🏰',
      },
      {
        title: 'Grandes Navegações',
        slug: 'grandes-navegacoes',
        descricao: 'Descobrimentos e expansão marítima',
        icon: '⛵',
      },
      {
        title: 'Brasil Colônia',
        slug: 'brasil-colonia',
        descricao: 'Descobrimento e colonização',
        icon: '🇧🇷',
      },
      {
        title: 'Independências na América',
        slug: 'independencias-america',
        descricao: 'Processos de independência',
        icon: '🗽',
      },
      {
        title: 'Revolução Industrial',
        slug: 'revolucao-industrial',
        descricao: 'Transformações econômicas e sociais',
        icon: '🏭',
      },
      {
        title: 'Imperialismo',
        slug: 'imperialismo',
        descricao: 'Neocolonialismo e partilha da África',
        icon: '🌍',
      },
      {
        title: 'Primeira Guerra Mundial',
        slug: 'primeira-guerra',
        descricao: 'Causas, desenvolvimento e consequências',
        icon: '⚔️',
      },
      {
        title: 'Segunda Guerra Mundial',
        slug: 'segunda-guerra',
        descricao: 'Nazifascismo e conflito global',
        icon: '✈️',
      },
      {
        title: 'Guerra Fria',
        slug: 'guerra-fria',
        descricao: 'Bipolarização mundial',
        icon: '🧊',
      },
      {
        title: 'Era Vargas',
        slug: 'era-vargas',
        descricao: 'República Velha a Estado Novo',
        icon: '🎩',
      },
      {
        title: 'Ditadura Militar',
        slug: 'ditadura-militar',
        descricao: 'Brasil no período militar',
        icon: '🪖',
      },
      {
        title: 'Redemocratização',
        slug: 'redemocratizacao',
        descricao: 'Nova República brasileira',
        icon: '🗳️',
      },
    ],
  },
  {
    id: 'geografia',
    nome: 'Geografia',
    nomeCompleto: 'Ciências Humanas - Geografia',
    icon: '🌍',
    color: '#06b6d4',
    modulos: [
      {
        title: 'Cartografia',
        slug: 'cartografia',
        descricao: 'Mapas, escalas e projeções',
        icon: '🗺️',
      },
      {
        title: 'Geologia',
        slug: 'geologia',
        descricao: 'Estrutura da Terra e relevo',
        icon: '🏔️',
      },
      {
        title: 'Climatologia',
        slug: 'climatologia',
        descricao: 'Climas e fenômenos atmosféricos',
        icon: '🌤️',
      },
      {
        title: 'Hidrografia',
        slug: 'hidrografia',
        descricao: 'Bacias hidrográficas e recursos hídricos',
        icon: '💧',
      },
      {
        title: 'Biomas Brasileiros',
        slug: 'biomas-brasileiros',
        descricao: 'Amazônia, Cerrado, Caatinga e outros',
        icon: '🌳',
      },
      {
        title: 'Demografia',
        slug: 'demografia',
        descricao: 'População e crescimento demográfico',
        icon: '👥',
      },
      {
        title: 'Urbanização',
        slug: 'urbanizacao',
        descricao: 'Crescimento das cidades',
        icon: '🏙️',
      },
      {
        title: 'Industrialização',
        slug: 'industrializacao',
        descricao: 'Processos industriais no Brasil e mundo',
        icon: '🏭',
      },
      {
        title: 'Agropecuária',
        slug: 'agropecuaria',
        descricao: 'Agricultura e pecuária no Brasil',
        icon: '🌾',
      },
      {
        title: 'Energia',
        slug: 'energia',
        descricao: 'Fontes de energia e matriz energética',
        icon: '⚡',
      },
      {
        title: 'Geopolítica',
        slug: 'geopolitica',
        descricao: 'Conflitos e relações internacionais',
        icon: '🌐',
      },
      {
        title: 'Globalização',
        slug: 'globalizacao',
        descricao: 'Integração mundial e blocos econômicos',
        icon: '🌍',
      },
    ],
  },
  {
    id: 'filosofia',
    nome: 'Filosofia',
    nomeCompleto: 'Ciências Humanas - Filosofia',
    icon: '🤔',
    color: '#a855f7',
    modulos: [
      {
        title: 'Filosofia Antiga',
        slug: 'filosofia-antiga',
        descricao: 'Pré-socráticos, Sócrates, Platão e Aristóteles',
        icon: '🏛️',
      },
      {
        title: 'Filosofia Medieval',
        slug: 'filosofia-medieval',
        descricao: 'Patrística e Escolástica',
        icon: '⛪',
      },
      {
        title: 'Filosofia Moderna - Racionalismo',
        slug: 'racionalismo',
        descricao: 'Descartes, Spinoza e Leibniz',
        icon: '🧠',
      },
      {
        title: 'Filosofia Moderna - Empirismo',
        slug: 'empirismo',
        descricao: 'Locke, Hume e Berkeley',
        icon: '👁️',
      },
      {
        title: 'Iluminismo',
        slug: 'iluminismo',
        descricao: 'Kant, Voltaire e Rousseau',
        icon: '💡',
      },
      {
        title: 'Filosofia Contemporânea',
        slug: 'filosofia-contemporanea',
        descricao: 'Nietzsche, Sartre e outros',
        icon: '🎭',
      },
      {
        title: 'Ética',
        slug: 'etica',
        descricao: 'Teorias éticas e moral',
        icon: '⚖️',
      },
      {
        title: 'Política',
        slug: 'politica',
        descricao: 'Teorias políticas e Estado',
        icon: '🏛️',
      },
      {
        title: 'Epistemologia',
        slug: 'epistemologia',
        descricao: 'Teoria do conhecimento',
        icon: '🔍',
      },
      {
        title: 'Lógica',
        slug: 'logica',
        descricao: 'Argumentação e falácias',
        icon: '🧩',
      },
    ],
  },
  {
    id: 'sociologia',
    nome: 'Sociologia',
    nomeCompleto: 'Ciências Humanas - Sociologia',
    icon: '👥',
    color: '#ec4899',
    modulos: [
      {
        title: 'Introdução à Sociologia',
        slug: 'introducao-sociologia',
        descricao: 'Conceitos fundamentais e origem',
        icon: '📚',
      },
      {
        title: 'Clássicos da Sociologia',
        slug: 'classicos-sociologia',
        descricao: 'Marx, Durkheim e Weber',
        icon: '👴',
      },
      {
        title: 'Cultura',
        slug: 'cultura',
        descricao: 'Identidade cultural e diversidade',
        icon: '🎭',
      },
      {
        title: 'Estratificação Social',
        slug: 'estratificacao-social',
        descricao: 'Classes sociais e desigualdade',
        icon: '📊',
      },
      {
        title: 'Movimentos Sociais',
        slug: 'movimentos-sociais',
        descricao: 'Manifestações e transformações sociais',
        icon: '✊',
      },
      {
        title: 'Trabalho e Sociedade',
        slug: 'trabalho-sociedade',
        descricao: 'Relações de trabalho e capitalismo',
        icon: '👷',
      },
      {
        title: 'Política e Poder',
        slug: 'politica-poder',
        descricao: 'Estado, democracia e cidadania',
        icon: '🗳️',
      },
      {
        title: 'Violência',
        slug: 'violencia',
        descricao: 'Tipos de violência e impactos sociais',
        icon: '⚠️',
      },
      {
        title: 'Globalização',
        slug: 'globalizacao-social',
        descricao: 'Impactos sociais da globalização',
        icon: '🌐',
      },
      {
        title: 'Meio Ambiente e Sociedade',
        slug: 'meio-ambiente-sociedade',
        descricao: 'Sustentabilidade e consciência ambiental',
        icon: '🌱',
      },
    ],
  },
  {
    id: 'redacao',
    nome: 'Redação',
    nomeCompleto: 'Linguagens - Redação ENEM',
    icon: '✍️',
    color: '#f97316',
    modulos: [
      {
        title: 'Estrutura da Redação',
        slug: 'estrutura-redacao',
        descricao: 'Introdução, desenvolvimento e conclusão',
        icon: '📄',
      },
      {
        title: 'Competência 1 - Norma Culta',
        slug: 'competencia-1',
        descricao: 'Domínio da língua portuguesa',
        icon: '✓',
      },
      {
        title: 'Competência 2 - Tema',
        slug: 'competencia-2',
        descricao: 'Compreender e desenvolver o tema',
        icon: '🎯',
      },
      {
        title: 'Competência 3 - Argumentação',
        slug: 'competencia-3',
        descricao: 'Tipos de argumentos e persuasão',
        icon: '💬',
      },
      {
        title: 'Competência 4 - Coesão',
        slug: 'competencia-4',
        descricao: 'Conectivos e articulação textual',
        icon: '🔗',
      },
      {
        title: 'Competência 5 - Proposta',
        slug: 'competencia-5',
        descricao: 'Proposta de intervenção completa',
        icon: '💡',
      },
      {
        title: 'Repertório Sociocultural',
        slug: 'repertorio-sociocultural',
        descricao: 'Como usar referências na redação',
        icon: '📚',
      },
      {
        title: 'Temas de Redação',
        slug: 'temas-redacao',
        descricao: 'Temas mais cobrados e como abordá-los',
        icon: '📝',
      },
      {
        title: 'Erros Comuns',
        slug: 'erros-comuns',
        descricao: 'O que evitar na redação',
        icon: '❌',
      },
      {
        title: 'Banco de Argumentos',
        slug: 'banco-argumentos',
        descricao: 'Argumentos prontos para diversos temas',
        icon: '🗃️',
      },
    ],
  },
];

export function getMateriaById(id: string): Materia | undefined {
  return MATERIAS.find((m) => m.id === id);
}

export function getModuloBySlug(
  materiaId: string,
  slug: string
): Modulo | undefined {
  const materia = getMateriaById(materiaId);
  return materia?.modulos.find((m) => m.slug === slug);
}
