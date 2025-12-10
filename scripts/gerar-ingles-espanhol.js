/**
 * Script para gerar páginas de Inglês e Espanhol para a Biblioteca ENEM PRO
 *
 * Gera 20 páginas completas: 10 de Inglês + 10 de Espanhol
 *
 * Uso: node scripts/gerar-ingles-espanhol.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONTEÚDO COMPLETO DOS MÓDULOS DE INGLÊS
// ============================================================================

const MODULOS_INGLES = {
  'verb-tenses-present': {
    titulo: 'Verb Tenses - Present',
    icon: '⏰',
    descricao: 'Present simple, continuous e perfect',
    resumo: 'Os tempos verbais no presente em inglês expressam ações que acontecem no momento da fala, rotinas ou verdades universais. Dominar esses tempos é essencial para a comunicação básica.',
    topicos: [
      {
        titulo: 'Present Simple',
        conteudo: 'Usado para rotinas, hábitos, verdades universais e fatos. Forma: sujeito + verbo (s na 3ª pessoa). Exemplo: "She works every day."'
      },
      {
        titulo: 'Present Continuous',
        conteudo: 'Ações acontecendo agora ou planos futuros. Forma: am/is/are + verb-ing. Exemplo: "I am studying English."'
      },
      {
        titulo: 'Present Perfect',
        conteudo: 'Ações que começaram no passado e continuam no presente ou acabaram de acontecer. Forma: have/has + past participle. Exemplo: "I have lived here for 5 years."'
      },
      {
        titulo: 'Present Perfect Continuous',
        conteudo: 'Ações que começaram no passado e ainda estão acontecendo. Forma: have/has been + verb-ing. Exemplo: "I have been studying for 3 hours."'
      }
    ],
    exemplos: [
      {
        titulo: 'Simple vs Continuous',
        problema: 'Diferencie: "I work" vs "I am working"',
        solucao: '"I work" = rotina/hábito. "I am working" = ação acontecendo agora.'
      },
      {
        titulo: 'Present Perfect',
        problema: 'Quando usar "since" ou "for"?',
        solucao: '"Since" indica ponto no tempo (since 2020). "For" indica duração (for 3 years).'
      }
    ],
    formulas: [
      'Present Simple: S + V(s)',
      'Present Continuous: am/is/are + V-ing',
      'Present Perfect: have/has + V-ed/V3',
      'Present Perfect Continuous: have/has been + V-ing'
    ],
    dicas: [
      'Present Simple para rotinas e verdades',
      'Present Continuous para ações NOW',
      'Present Perfect com for/since',
      'Verbos de estado (know, like, want) geralmente não usam continuous'
    ],
    erros: [
      'Usar continuous com verbos de estado: "I am knowing" ❌',
      'Esquecer o "s" na 3ª pessoa do simple: "She work" ❌',
      'Confundir since (desde) com for (durante)'
    ],
    quiz: [
      {
        pergunta: 'Complete: She ___ to school every day.',
        opcoes: ['go', 'goes', 'is going', 'has gone'],
        correta: 1
      },
      {
        pergunta: 'I ___ English for 5 years.',
        opcoes: ['study', 'am studying', 'have studied', 'studied'],
        correta: 2
      },
      {
        pergunta: 'What ___ you ___ right now?',
        opcoes: ['do/do', 'are/doing', 'have/done', 'did/do'],
        correta: 1
      }
    ]
  },

  'verb-tenses-past': {
    titulo: 'Verb Tenses - Past',
    icon: '📅',
    descricao: 'Past simple, continuous e perfect',
    resumo: 'Os tempos verbais no passado descrevem ações concluídas ou que estavam em progresso em momentos anteriores. São cruciais para narração e descrição de eventos.',
    topicos: [
      {
        titulo: 'Past Simple',
        conteudo: 'Ações concluídas no passado. Forma: V-ed (regulares) ou forma irregular. Exemplo: "I worked yesterday."'
      },
      {
        titulo: 'Past Continuous',
        conteudo: 'Ação em progresso em momento específico do passado. Forma: was/were + V-ing. Exemplo: "I was studying when you called."'
      },
      {
        titulo: 'Past Perfect',
        conteudo: 'Ação anterior a outra no passado. Forma: had + past participle. Exemplo: "I had finished before she arrived."'
      },
      {
        titulo: 'Past Perfect Continuous',
        conteudo: 'Ação contínua antes de outra no passado. Forma: had been + V-ing. Exemplo: "I had been waiting for an hour."'
      }
    ],
    exemplos: [
      {
        titulo: 'Narração',
        problema: 'I ___ TV when the phone ___.',
        solucao: 'I was watching TV when the phone rang. (continuous + simple para interrupção)'
      },
      {
        titulo: 'Sequência no passado',
        problema: 'When I arrived, they ___ already ___.',
        solucao: 'When I arrived, they had already left. (past perfect para ação anterior)'
      }
    ],
    formulas: [
      'Past Simple: V-ed / irregular verb',
      'Past Continuous: was/were + V-ing',
      'Past Perfect: had + V-ed/V3',
      'Past Perfect Continuous: had been + V-ing'
    ],
    dicas: [
      'Past Simple para ações específicas concluídas',
      'Past Continuous para ação em progresso no passado',
      'Past Perfect para "passado do passado"',
      'Verbos irregulares: estudar lista (go-went-gone)'
    ],
    erros: [
      'Confundir past simple com present perfect',
      'Esquecer "was/were" no past continuous',
      'Usar "did" com verbo no passado: "Did you went?" ❌'
    ],
    quiz: [
      {
        pergunta: 'I ___ my homework last night.',
        opcoes: ['do', 'did', 'was doing', 'have done'],
        correta: 1
      },
      {
        pergunta: 'They ___ TV when I arrived.',
        opcoes: ['watched', 'were watching', 'have watched', 'had watched'],
        correta: 1
      },
      {
        pergunta: 'She ___ already ___ when I got there.',
        opcoes: ['has/left', 'was/leaving', 'had/left', 'did/leave'],
        correta: 2
      }
    ]
  },

  'verb-tenses-future': {
    titulo: 'Verb Tenses - Future',
    icon: '🔮',
    descricao: 'Will, going to e present continuous',
    resumo: 'Há várias formas de expressar futuro em inglês, cada uma com nuances específicas. Will para decisões espontâneas, going to para planos e present continuous para agendamentos.',
    topicos: [
      {
        titulo: 'Will',
        conteudo: 'Previsões, promessas, decisões espontâneas. Forma: will + verbo. Exemplo: "I will help you."'
      },
      {
        titulo: 'Going to',
        conteudo: 'Intenções, planos, evidências. Forma: am/is/are going to + verbo. Exemplo: "I am going to travel next month."'
      },
      {
        titulo: 'Present Continuous (futuro)',
        conteudo: 'Agendamentos e compromissos. Forma: am/is/are + V-ing. Exemplo: "I am meeting John tomorrow."'
      },
      {
        titulo: 'Present Simple (futuro)',
        conteudo: 'Horários fixos e programações. Exemplo: "The train leaves at 8pm."'
      }
    ],
    exemplos: [
      {
        titulo: 'Will vs Going to',
        problema: 'Qual usar: "I will/am going to buy a car"?',
        solucao: '"Will" = decisão agora. "Going to" = já planejou antes.'
      },
      {
        titulo: 'Future com evidência',
        problema: 'Look at those clouds! It ___ rain.',
        solucao: 'It is going to rain. (evidência visual)'
      }
    ],
    formulas: [
      'Will: will + V',
      'Going to: am/is/are going to + V',
      'Present Continuous (futuro): am/is/are + V-ing',
      'Future Continuous: will be + V-ing'
    ],
    dicas: [
      'Will = decisão instantânea, previsão',
      'Going to = plano prévio, evidência',
      'Present Continuous = agendamento confirmado',
      'Negativa de will: won\'t (will not)'
    ],
    erros: [
      'Usar "will" para planos já feitos',
      'Confundir "I go" com "I am going"',
      '"I will to go" ❌ (correto: I will go)'
    ],
    quiz: [
      {
        pergunta: 'I ___ help you with that. (decisão agora)',
        opcoes: ['will', 'am going to', 'am', 'going'],
        correta: 0
      },
      {
        pergunta: 'We ___ Paris next summer. (plano)',
        opcoes: ['will visit', 'are going to visit', 'visit', 'visited'],
        correta: 1
      },
      {
        pergunta: 'The movie ___ at 7pm. (horário fixo)',
        opcoes: ['will start', 'is going to start', 'starts', 'is starting'],
        correta: 2
      }
    ]
  },

  'modal-verbs': {
    titulo: 'Modal Verbs',
    icon: '🎯',
    descricao: 'Can, must, should, may, might',
    resumo: 'Modal verbs são verbos auxiliares que expressam habilidade, permissão, obrigação, possibilidade e conselho. Não têm -s na 3ª pessoa e são seguidos de verbo no infinitivo sem "to".',
    topicos: [
      {
        titulo: 'Can / Could',
        conteudo: 'Habilidade, possibilidade, permissão. "Can" = presente. "Could" = passado/mais educado. Ex: "I can swim."'
      },
      {
        titulo: 'Must / Have to',
        conteudo: 'Obrigação. "Must" = forte, pessoal. "Have to" = obrigação externa. Ex: "You must study."'
      },
      {
        titulo: 'Should / Ought to',
        conteudo: 'Conselho, recomendação. Ex: "You should see a doctor."'
      },
      {
        titulo: 'May / Might',
        conteudo: 'Possibilidade, permissão formal. "May" = mais provável. "Might" = menos provável. Ex: "It may rain."'
      }
    ],
    exemplos: [
      {
        titulo: 'Habilidade',
        problema: 'I ___ speak three languages.',
        solucao: 'I can speak three languages. (habilidade atual)'
      },
      {
        titulo: 'Obrigação',
        problema: 'You ___ wear a seatbelt. (lei)',
        solucao: 'You must wear / have to wear a seatbelt.'
      }
    ],
    formulas: [
      'Modal + verbo (sem "to")',
      'Negativa: modal + not (can\'t, mustn\'t, shouldn\'t)',
      'Pergunta: modal + sujeito + verbo'
    ],
    dicas: [
      'Can = habilidade/permissão informal',
      'Could = passado de can OU pedido educado',
      'Must = obrigação forte / mustn\'t = proibição',
      'Should = conselho (você deveria)'
    ],
    erros: [
      '"He cans swim" ❌ (correto: He can swim)',
      '"I must to go" ❌ (correto: I must go)',
      'Confundir mustn\'t (proibido) com don\'t have to (não precisa)'
    ],
    quiz: [
      {
        pergunta: 'You ___ smoke here. (proibido)',
        opcoes: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'can\'t'],
        correta: 0
      },
      {
        pergunta: '___ I use your phone? (pedido educado)',
        opcoes: ['Can', 'Could', 'May', 'Might'],
        correta: 1
      },
      {
        pergunta: 'You ___ see a doctor. (conselho)',
        opcoes: ['must', 'have to', 'should', 'can'],
        correta: 2
      }
    ]
  },

  'reading-comprehension': {
    titulo: 'Reading Comprehension',
    icon: '📖',
    descricao: 'Estratégias de leitura e interpretação',
    resumo: 'A interpretação de textos em inglês no ENEM exige estratégias específicas: skimming (leitura rápida), scanning (busca de info específica), identificação de cognatos e falsos cognatos, e compreensão contextual.',
    topicos: [
      {
        titulo: 'Skimming',
        conteudo: 'Leitura rápida para captar ideia geral. Foque em: título, primeiro parágrafo, primeira frase de cada parágrafo, último parágrafo.'
      },
      {
        titulo: 'Scanning',
        conteudo: 'Busca de informação específica. Procure palavras-chave, datas, nomes, números sem ler todo o texto.'
      },
      {
        titulo: 'Cognatos',
        conteudo: 'Palavras similares ao português: important, problem, family. Ajudam na compreensão rápida.'
      },
      {
        titulo: 'Contexto',
        conteudo: 'Deduzir significado de palavras desconhecidas pelo contexto, sem precisar saber todas as palavras.'
      }
    ],
    exemplos: [
      {
        titulo: 'Identificar tema',
        problema: 'Qual o tema principal do texto?',
        solucao: 'Leia título + primeiro parágrafo. Tema geralmente está explícito ali.'
      },
      {
        titulo: 'Encontrar informação',
        problema: 'Em que ano aconteceu o evento?',
        solucao: 'Use scanning: procure números no texto sem ler tudo.'
      }
    ],
    formulas: [],
    dicas: [
      'Sempre leia o enunciado ANTES do texto',
      'Não traduza palavra por palavra',
      'Use cognatos a seu favor',
      'Releia apenas as partes relevantes para a questão',
      'Atenção a palavras negativas (not, never)'
    ],
    erros: [
      'Tentar entender cada palavra',
      'Ignorar o título e subtítulos',
      'Não voltar ao texto para verificar resposta',
      'Confiar apenas em cognatos (cuidado com falsos cognatos)'
    ],
    quiz: [
      {
        pergunta: 'Qual estratégia usar para identificar o tema geral?',
        opcoes: ['Scanning', 'Skimming', 'Tradução literal', 'Ignorar título'],
        correta: 1
      },
      {
        pergunta: 'Cognato verdadeiro:',
        opcoes: ['Actually (na verdade)', 'Pretend (fingir)', 'Library (biblioteca)', 'Parents (pais)'],
        correta: 2
      },
      {
        pergunta: 'Para encontrar data específica, use:',
        opcoes: ['Skimming', 'Scanning', 'Leitura completa', 'Tradução'],
        correta: 1
      }
    ]
  },

  'false-friends': {
    titulo: 'Vocabulary - False Friends',
    icon: '⚠️',
    descricao: 'Falsos cognatos mais comuns',
    resumo: 'Falsos cognatos (false friends) são palavras em inglês que parecem palavras em português mas têm significados diferentes. São pegadinhas comuns no ENEM e exigem memorização.',
    topicos: [
      {
        titulo: 'Actually',
        conteudo: 'Actually = na verdade, realmente (NOT "atualmente"). Currently = atualmente.'
      },
      {
        titulo: 'Pretend',
        conteudo: 'Pretend = fingir (NOT "pretender"). Intend = pretender, ter intenção.'
      },
      {
        titulo: 'Library',
        conteudo: 'Library = biblioteca (NOT "livraria"). Bookstore = livraria.'
      },
      {
        titulo: 'Parents',
        conteudo: 'Parents = pais (NOT "parentes"). Relatives = parentes.'
      }
    ],
    exemplos: [
      {
        titulo: 'Actually vs Atualmente',
        problema: 'Actually, I don\'t like coffee.',
        solucao: 'Na verdade, eu não gosto de café. (NOT "Atualmente")'
      },
      {
        titulo: 'Pretend vs Intend',
        problema: 'I intend to travel next year.',
        solucao: 'Eu pretendo viajar ano que vem. (intend = ter intenção)'
      }
    ],
    formulas: [],
    dicas: [
      'Memorize os principais falsos cognatos',
      'Não confie apenas na semelhança com português',
      'Context ajuda a identificar o significado correto',
      'Crie flashcards com os false friends'
    ],
    erros: [
      'Traduzir "actually" como "atualmente"',
      'Traduzir "pretend" como "pretender"',
      'Achar que "college" = "colégio" (college = faculdade)',
      'Confundir "push" (empurrar) com "puxar"'
    ],
    quiz: [
      {
        pergunta: 'I\'m ___ studying English. (atualmente)',
        opcoes: ['actually', 'currently', 'presently', 'lately'],
        correta: 1
      },
      {
        pergunta: '"Library" significa:',
        opcoes: ['Livraria', 'Biblioteca', 'Livro', 'Livreiro'],
        correta: 1
      },
      {
        pergunta: '"Parents" são:',
        opcoes: ['Parentes', 'Pais', 'Aparentes', 'Parte'],
        correta: 1
      }
    ]
  },

  'connectives': {
    titulo: 'Vocabulary - Connectives',
    icon: '🔗',
    descricao: 'Conectivos e linking words',
    resumo: 'Conectivos (linking words) ligam ideias no texto. Essenciais para compreensão de textos e para identificar relações lógicas entre frases e parágrafos.',
    topicos: [
      {
        titulo: 'Adição',
        conteudo: 'And, also, furthermore, moreover, in addition, besides. Ex: "I like tea. Moreover, I drink it every day."'
      },
      {
        titulo: 'Contraste',
        conteudo: 'But, however, although, though, despite, in spite of, yet, nevertheless. Ex: "I studied hard. However, I failed."'
      },
      {
        titulo: 'Causa e Efeito',
        conteudo: 'Because, since, as, so, therefore, thus, consequently, as a result. Ex: "It rained, so we stayed home."'
      },
      {
        titulo: 'Conclusão',
        conteudo: 'In conclusion, to sum up, finally, in short, therefore. Ex: "In conclusion, we need to act now."'
      }
    ],
    exemplos: [
      {
        titulo: 'Contraste',
        problema: '___ it was raining, we went out.',
        solucao: 'Although it was raining, we went out. (apesar de)'
      },
      {
        titulo: 'Causa',
        problema: 'I was tired ___ I had studied all night.',
        solucao: 'I was tired because I had studied all night.'
      }
    ],
    formulas: [],
    dicas: [
      'Identifique a relação lógica entre frases',
      'However, therefore = início de frase',
      'But, so = meio de frase',
      'Although, despite = contraste (mas tem diferença de estrutura)'
    ],
    erros: [
      'Usar "but" e "although" juntos ❌',
      'Confundir "so" (então) com "such" (tal)',
      'Estrutura errada após "despite" (despite + substantivo/ing)'
    ],
    quiz: [
      {
        pergunta: 'I was tired, ___ I kept working.',
        opcoes: ['so', 'but', 'because', 'since'],
        correta: 1
      },
      {
        pergunta: '___ it was late, he continued.',
        opcoes: ['Despite', 'However', 'Although', 'Because'],
        correta: 2
      },
      {
        pergunta: 'It rained. ___, the game was cancelled.',
        opcoes: ['Moreover', 'However', 'Therefore', 'Although'],
        correta: 2
      }
    ]
  },

  'conditionals': {
    titulo: 'Conditional Sentences',
    icon: '❓',
    descricao: 'Zero, first, second e third conditional',
    resumo: 'Orações condicionais expressam situações hipotéticas e suas consequências. Há quatro tipos, cada um com estrutura e uso específicos: zero (verdades), first (futuro provável), second (irreal presente), third (irreal passado).',
    topicos: [
      {
        titulo: 'Zero Conditional',
        conteudo: 'Verdades gerais, fatos. If + present, present. Ex: "If you heat water, it boils."'
      },
      {
        titulo: 'First Conditional',
        conteudo: 'Situação real/provável no futuro. If + present, will + verbo. Ex: "If it rains, I will stay home."'
      },
      {
        titulo: 'Second Conditional',
        conteudo: 'Situação irreal/improvável no presente. If + past, would + verbo. Ex: "If I were rich, I would travel."'
      },
      {
        titulo: 'Third Conditional',
        conteudo: 'Situação irreal no passado (arrependimento). If + past perfect, would have + participle. Ex: "If I had studied, I would have passed."'
      }
    ],
    exemplos: [
      {
        titulo: 'First vs Second',
        problema: 'Qual a diferença: "If I have time" vs "If I had time"?',
        solucao: '"If I have" = possível (1st). "If I had" = improvável agora (2nd).'
      },
      {
        titulo: 'Third Conditional',
        problema: 'If I ___ harder, I ___ the test.',
        solucao: 'If I had studied harder, I would have passed the test. (passado irreal)'
      }
    ],
    formulas: [
      'Zero: If + present, present',
      'First: If + present, will + V',
      'Second: If + past, would + V',
      'Third: If + past perfect, would have + V3'
    ],
    dicas: [
      'Zero = sempre verdade (água ferve a 100°C)',
      'First = futuro provável',
      'Second = presente/futuro irreal ("se eu fosse")',
      'Third = passado irreal ("se eu tivesse sido")',
      '"If I were you" (sempre "were", não "was")'
    ],
    erros: [
      'Usar "will" na cláusula if: "If it will rain" ❌',
      'Confundir second e third conditional',
      '"If I was" em second conditional ❌ (correto: If I were)'
    ],
    quiz: [
      {
        pergunta: 'If I ___ rich, I ___ a house.',
        opcoes: ['am/buy', 'were/would buy', 'had been/would have bought', 'will be/buy'],
        correta: 1
      },
      {
        pergunta: 'If it ___ tomorrow, we ___ home.',
        opcoes: ['rains/will stay', 'rained/would stay', 'will rain/stay', 'had rained/would stay'],
        correta: 0
      },
      {
        pergunta: 'If you heat water to 100°C, it ___.',
        opcoes: ['boils', 'will boil', 'would boil', 'boiled'],
        correta: 0
      }
    ]
  },

  'passive-voice': {
    titulo: 'Passive Voice',
    icon: '🔄',
    descricao: 'Voz passiva em todos os tempos',
    resumo: 'A voz passiva enfatiza a ação ou o objeto, não quem a realiza. Estrutura: be (conjugado) + past participle. Comum em textos formais, científicos e notícias.',
    topicos: [
      {
        titulo: 'Estrutura',
        conteudo: 'Ativa: Someone does something. Passiva: Something is done (by someone). O verbo "be" muda conforme o tempo verbal.'
      },
      {
        titulo: 'Present Simple Passive',
        conteudo: 'am/is/are + past participle. Ex: "The house is cleaned every day."'
      },
      {
        titulo: 'Past Simple Passive',
        conteudo: 'was/were + past participle. Ex: "The book was written in 1990."'
      },
      {
        titulo: 'Present Perfect Passive',
        conteudo: 'has/have been + past participle. Ex: "The work has been completed."'
      }
    ],
    exemplos: [
      {
        titulo: 'Ativa → Passiva',
        problema: 'Ativa: "Shakespeare wrote Hamlet." → Passiva?',
        solucao: 'Passive: "Hamlet was written by Shakespeare."'
      },
      {
        titulo: 'Sem agente',
        problema: 'Quando omitir "by someone"?',
        solucao: 'Omita quando o agente é óbvio, desconhecido ou irrelevante. Ex: "English is spoken here."'
      }
    ],
    formulas: [
      'Present: am/is/are + V3',
      'Past: was/were + V3',
      'Future: will be + V3',
      'Present Perfect: has/have been + V3',
      'Modal: modal + be + V3'
    ],
    dicas: [
      'Use passiva para enfatizar a ação, não o agente',
      'Comum em textos científicos e notícias',
      'Nem sempre precisa mencionar "by" + agente',
      'Tempo verbal do "be" define o tempo da passiva'
    ],
    erros: [
      'Esquecer "be": "The house cleaned" ❌',
      'Usar verbo errado: "The house is clean" (adjetivo) vs "is cleaned" (passiva)',
      'Confundir past participle com past simple'
    ],
    quiz: [
      {
        pergunta: 'Ativa: "They built this house in 1900." → Passiva:',
        opcoes: ['This house built in 1900', 'This house is built in 1900', 'This house was built in 1900', 'This house has built in 1900'],
        correta: 2
      },
      {
        pergunta: 'The window ___ by the boy.',
        opcoes: ['broke', 'was broken', 'has broken', 'is breaking'],
        correta: 1
      },
      {
        pergunta: 'English ___ all over the world.',
        opcoes: ['speaks', 'is spoken', 'has spoken', 'was spoken'],
        correta: 1
      }
    ]
  },

  'reported-speech': {
    titulo: 'Reported Speech',
    icon: '💬',
    descricao: 'Discurso indireto e transformações',
    resumo: 'Reported speech (discurso indireto) é usado para reportar o que alguém disse sem usar as palavras exatas. Requer mudanças em tempos verbais, pronomes e expressões de tempo.',
    topicos: [
      {
        titulo: 'Estrutura Básica',
        conteudo: 'Direct: "I like coffee." Reported: He said (that) he liked coffee. Remove aspas, muda tempo verbal e pronomes.'
      },
      {
        titulo: 'Mudanças de Tempo',
        conteudo: 'Present → Past, Past → Past Perfect, Will → Would, Can → Could. Ex: "I am" → He said he was.'
      },
      {
        titulo: 'Mudanças de Tempo/Lugar',
        conteudo: 'Today → that day, Tomorrow → the next day, Here → there, This → that.'
      },
      {
        titulo: 'Perguntas',
        conteudo: 'Yes/No: "Do you...?" → He asked if/whether I... Wh: "Where do you...?" → He asked where I...'
      }
    ],
    exemplos: [
      {
        titulo: 'Afirmação',
        problema: 'Direct: "I am tired." → Reported?',
        solucao: 'She said (that) she was tired.'
      },
      {
        titulo: 'Pergunta',
        problema: 'Direct: "Where do you live?" → Reported?',
        solucao: 'He asked where I lived. (sem "do" e ordem direta)'
      }
    ],
    formulas: [
      'Say → said (that)',
      'Tell → told + pessoa + (that)',
      'Ask → asked + if/whether (yes/no) ou wh-word',
      'Ordem direta após reporting verb'
    ],
    dicas: [
      'Sempre mude tempo verbal (backshift)',
      'Mude pronomes (I → he/she)',
      'Mude expressões de tempo e lugar',
      'Perguntas viram ordem direta (sem inversão)',
      'Say não leva objeto (say to someone), Tell leva (tell someone)'
    ],
    erros: [
      'Não fazer backshift: "He said he is tired" ❌',
      'Manter pergunta invertida: "He asked where do I live" ❌',
      'Usar "say me" ❌ (correto: tell me ou say to me)'
    ],
    quiz: [
      {
        pergunta: 'Direct: "I will help you." → Reported:',
        opcoes: ['He said he will help me', 'He said he would help me', 'He said he helps me', 'He said he helped me'],
        correta: 1
      },
      {
        pergunta: 'Direct: "Do you like pizza?" → Reported:',
        opcoes: ['He asked do I like pizza', 'He asked if I liked pizza', 'He asked if I like pizza', 'He asked I like pizza'],
        correta: 1
      },
      {
        pergunta: 'She ___ me she was happy.',
        opcoes: ['said', 'told', 'asked', 'spoke'],
        correta: 1
      }
    ]
  }
};

// ============================================================================
// CONTEÚDO COMPLETO DOS MÓDULOS DE ESPANHOL
// ============================================================================

const MODULOS_ESPANHOL = {
  'tiempos-presente': {
    titulo: 'Tiempos Verbales - Presente',
    icon: '⏰',
    descricao: 'Presente de indicativo y subjuntivo',
    resumo: 'O presente em espanhol tem dois modos: indicativo (fatos, rotinas) e subjuntivo (desejos, dúvidas). É fundamental para comunicação básica e aparece frequentemente no ENEM.',
    topicos: [
      {
        titulo: 'Presente de Indicativo',
        conteudo: 'Usado para rotinas, verdades, ações habituais. Verbos regulares: -AR (hablo), -ER (como), -IR (vivo).'
      },
      {
        titulo: 'Verbos Irregulares',
        conteudo: 'Ser, estar, tener, hacer, ir, venir, decir, poder. Ex: "Yo tengo" (eu tenho), "Tú tienes" (tu tens).'
      },
      {
        titulo: 'Presente de Subjuntivo',
        conteudo: 'Usado após verbos de desejo, dúvida, emoção. Formação: raiz + terminação oposta (-AR vira -E, -ER/-IR vira -A).'
      },
      {
        titulo: 'Usos do Subjuntivo',
        conteudo: 'Após: querer que, esperar que, dudar que, es necesario que. Ex: "Quiero que vengas" (quero que venhas).'
      }
    ],
    exemplos: [
      {
        titulo: 'Indicativo',
        problema: 'Yo ___ (hablar) español.',
        solucao: 'Yo hablo español. (presente indicativo regular)'
      },
      {
        titulo: 'Subjuntivo',
        problema: 'Espero que tú ___ (venir) mañana.',
        solucao: 'Espero que tú vengas mañana. (subjuntivo após "espero que")'
      }
    ],
    formulas: [
      '-AR: -o, -as, -a, -amos, -áis, -an',
      '-ER: -o, -es, -e, -emos, -éis, -en',
      '-IR: -o, -es, -e, -imos, -ís, -en',
      'Subjuntivo -AR: -e, -es, -e, -emos, -éis, -en'
    ],
    dicas: [
      'Memorize irregulares: ser, estar, tener, hacer',
      'Subjuntivo aparece após expressões de desejo/dúvida',
      '"Que" introduz o subjuntivo',
      'Acentos são importantes: hablo ≠ habló'
    ],
    erros: [
      'Confundir ser e estar',
      'Esquecer de usar subjuntivo após "que"',
      'Conjugar irregulares como regulares'
    ],
    quiz: [
      {
        pergunta: 'Yo ___ (ser) estudiante.',
        opcoes: ['soy', 'estoy', 'eres', 'es'],
        correta: 0
      },
      {
        pergunta: 'Quiero que tú ___ (estudiar).',
        opcoes: ['estudias', 'estudies', 'estudia', 'estudiar'],
        correta: 1
      },
      {
        pergunta: 'Nosotros ___ (tener) una casa.',
        opcoes: ['tenemos', 'tienen', 'teníamos', 'tendremos'],
        correta: 0
      }
    ]
  },

  'tiempos-pasado': {
    titulo: 'Tiempos Verbales - Pasado',
    icon: '📅',
    descricao: 'Pretérito perfecto, indefinido e imperfecto',
    resumo: 'O passado em espanhol tem múltiplas formas, cada uma com uso específico. Pretérito perfecto (ações recentes), indefinido (ações pontuais), imperfecto (ações habituais no passado).',
    topicos: [
      {
        titulo: 'Pretérito Perfecto',
        conteudo: 'Ações recentes/completas. he/has/ha/hemos/habéis/han + particípio. Ex: "He comido" (comi/tenho comido).'
      },
      {
        titulo: 'Pretérito Indefinido',
        conteudo: 'Ações pontuais concluídas. Verbos regulares: -AR (-é, -aste, -ó...), -ER/-IR (-í, -iste, -ió...). Ex: "Hablé" (falei).'
      },
      {
        titulo: 'Pretérito Imperfecto',
        conteudo: 'Ações habituais/descritivas no passado. -AR (-aba...), -ER/-IR (-ía...). Ex: "Hablaba" (falava).'
      },
      {
        titulo: 'Diferenças',
        conteudo: 'Indefinido = pontual. Imperfecto = habitual/descritivo. Ex: "Fui al cine" (indefinido) vs "Iba al cine" (imperfecto).'
      }
    ],
    exemplos: [
      {
        titulo: 'Indefinido vs Imperfecto',
        problema: 'Ayer ___ (ir) al cine.',
        solucao: 'Ayer fui al cine. (indefinido - ação pontual)'
      },
      {
        titulo: 'Habitual',
        problema: 'Cuando era niño, ___ (jugar) mucho.',
        solucao: 'Cuando era niño, jugaba mucho. (imperfecto - habitual)'
      }
    ],
    formulas: [
      'Perfecto: haber (presente) + participio',
      'Indefinido -AR: -é, -aste, -ó, -amos, -asteis, -aron',
      'Indefinido -ER/-IR: -í, -iste, -ió, -imos, -isteis, -ieron',
      'Imperfecto -AR: -aba, -abas, -aba, -ábamos, -abais, -aban',
      'Imperfecto -ER/-IR: -ía, -ías, -ía, -íamos, -íais, -ían'
    ],
    dicas: [
      'Perfecto = ações recentes ("hoy", "esta semana")',
      'Indefinido = ações pontuais ("ayer", "el año pasado")',
      'Imperfecto = ações habituais ("siempre", "todos los días")',
      'Narrativas: imperfecto (descrição) + indefinido (ação principal)'
    ],
    erros: [
      'Confundir indefinido com imperfecto',
      'Usar perfecto onde é indefinido',
      'Irregulares comuns: fui (ser/ir), hice (hacer), dije (decir)'
    ],
    quiz: [
      {
        pergunta: 'Ayer ___ al mercado.',
        opcoes: ['fui', 'iba', 'he ido', 'iré'],
        correta: 0
      },
      {
        pergunta: 'Cuando era joven, ___ en Madrid.',
        opcoes: ['viví', 'vivía', 'he vivido', 'vivo'],
        correta: 1
      },
      {
        pergunta: 'Esta semana ___ mucho.',
        opcoes: ['trabajé', 'trabajaba', 'he trabajado', 'trabajo'],
        correta: 2
      }
    ]
  },

  'tiempos-futuro': {
    titulo: 'Tiempos Verbales - Futuro',
    icon: '🔮',
    descricao: 'Futuro simple e ir + a + infinitivo',
    resumo: 'Há duas formas principais de expressar futuro em espanhol: futuro simple (formal, previsões) e ir + a + infinitivo (planos próximos, intenções).',
    topicos: [
      {
        titulo: 'Futuro Simple',
        conteudo: 'Adiciona terminações ao infinitivo: -é, -ás, -á, -emos, -éis, -án. Ex: "Hablaré" (falarei).'
      },
      {
        titulo: 'Ir + a + Infinitivo',
        conteudo: 'Planos próximos, intenções. voy/vas/va/vamos/vais/van + a + verbo. Ex: "Voy a estudiar" (vou estudar).'
      },
      {
        titulo: 'Irregulares',
        conteudo: 'Alguns verbos têm raiz irregular no futuro: tener → tendré, hacer → haré, poder → podré, salir → saldré.'
      },
      {
        titulo: 'Diferenças',
        conteudo: 'Futuro simple = mais formal, previsões. Ir + a = mais coloquial, planos certos.'
      }
    ],
    exemplos: [
      {
        titulo: 'Futuro Simple',
        problema: 'Mañana ___ (llover).',
        solucao: 'Mañana lloverá. (previsão do tempo)'
      },
      {
        titulo: 'Ir + a',
        problema: 'Yo ___ estudiar esta noche.',
        solucao: 'Yo voy a estudiar esta noche. (plano pessoal)'
      }
    ],
    formulas: [
      'Futuro simple: infinitivo + -é, -ás, -á, -emos, -éis, -án',
      'Ir + a: conjugar "ir" + a + infinitivo',
      'Irregulares: mudam a raiz mas mantêm terminações'
    ],
    dicas: [
      'Futuro simple = formal, escrito, previsões',
      'Ir + a = coloquial, planos pessoais',
      'Memorize irregulares: tener, hacer, poder, decir, salir',
      'Presente também pode expressar futuro próximo'
    ],
    erros: [
      'Conjugar irregular errado: "teneré" ❌ (correto: tendré)',
      'Esquecer acento nas terminações',
      'Usar "voy estudiar" ❌ (correto: voy A estudiar)'
    ],
    quiz: [
      {
        pergunta: 'Mañana yo ___ a la playa.',
        opcoes: ['iré', 'iría', 'iba', 'fui'],
        correta: 0
      },
      {
        pergunta: 'Nosotros ___ tiempo mañana.',
        opcoes: ['tenemos', 'teníamos', 'tendremos', 'tuvimos'],
        correta: 2
      },
      {
        pergunta: 'Ellos ___ a viajar pronto.',
        opcoes: ['irán', 'van', 'iban', 'fueron'],
        correta: 1
      }
    ]
  },

  'verbos-irregulares': {
    titulo: 'Verbos Irregulares',
    icon: '🎯',
    descricao: 'Principais verbos irregulares',
    resumo: 'Verbos irregulares são aqueles que não seguem o padrão de conjugação regular. Os mais comuns (ser, estar, tener, hacer, ir) aparecem frequentemente no ENEM e devem ser memorizados.',
    topicos: [
      {
        titulo: 'Ser vs Estar',
        conteudo: 'Ser = essência, origem, profissão. Estar = estado temporário, localização. Ex: "Soy brasileño" (ser) vs "Estoy cansado" (estar).'
      },
      {
        titulo: 'Tener',
        conteudo: 'Presente: tengo, tienes, tiene, tenemos, tenéis, tienen. Usos: posse, idade, expressões (tener hambre).'
      },
      {
        titulo: 'Hacer',
        conteudo: 'Presente: hago, haces, hace, hacemos, hacéis, hacen. "Hacer" = fazer. Também usado no tempo (hace frío).'
      },
      {
        titulo: 'Ir',
        conteudo: 'Presente: voy, vas, va, vamos, vais, van. Usado sozinho (ir a) ou para formar futuro próximo (voy a estudiar).'
      }
    ],
    exemplos: [
      {
        titulo: 'Ser vs Estar',
        problema: 'Yo ___ médico. Hoy ___ cansado.',
        solucao: 'Yo soy médico. (essência) Hoy estoy cansado. (estado temporário)'
      },
      {
        titulo: 'Tener',
        problema: 'Ella ___ 20 años.',
        solucao: 'Ella tiene 20 años. (idade sempre usa "tener")'
      }
    ],
    formulas: [],
    dicas: [
      'Ser = permanente, Estar = temporário',
      'Idade usa "tener": tengo 18 años',
      'Tempo atmosférico usa "hacer": hace calor',
      '"Ir" + a + infinitivo = futuro próximo',
      'Memorize os irregulares mais comuns'
    ],
    erros: [
      'Confundir ser e estar',
      'Usar "soy" para idade: "soy 18 años" ❌',
      'Conjugar como regular: "yo haco" ❌ (correto: hago)'
    ],
    quiz: [
      {
        pergunta: 'Yo ___ estudiante.',
        opcoes: ['soy', 'estoy', 'tengo', 'hago'],
        correta: 0
      },
      {
        pergunta: 'Ella ___ enferma hoy.',
        opcoes: ['es', 'está', 'tiene', 'hace'],
        correta: 1
      },
      {
        pergunta: 'Nosotros ___ una casa grande.',
        opcoes: ['somos', 'estamos', 'tenemos', 'hacemos'],
        correta: 2
      }
    ]
  },

  'comprension-lectora': {
    titulo: 'Comprensión Lectora',
    icon: '📖',
    descricao: 'Estrategias de lectura e interpretación',
    resumo: 'A interpretação de textos em espanhol no ENEM exige estratégias similares ao inglês: identificar cognatos (transparentes e heterosemánticos), usar contexto e aplicar técnicas de leitura rápida.',
    topicos: [
      {
        titulo: 'Cognatos/Transparentes',
        conteudo: 'Palavras parecidas com português: importante, problema, familia. Ajudam bastante mas cuidado com heterosemánticos.'
      },
      {
        titulo: 'Heterosemánticos',
        conteudo: 'Palavras parecidas mas com significado diferente: embarazada (grávida), largo (comprido), oficina (escritório).'
      },
      {
        titulo: 'Contexto',
        conteudo: 'Use o contexto para deduzir palavras desconhecidas. Leia a frase completa antes de responder.'
      },
      {
        titulo: 'Marcadores Textuais',
        conteudo: 'Identifique conectores: pero, sin embargo, por lo tanto, además. Eles mostram a relação entre ideias.'
      }
    ],
    exemplos: [
      {
        titulo: 'Heterosemántico',
        problema: '"Está embarazada" significa:',
        solucao: 'Está grávida (NOT "embaraçada"). Embarazada = grávida.'
      },
      {
        titulo: 'Contexto',
        problema: 'Como entender palavra desconhecida?',
        solucao: 'Leia frase inteira, veja palavras ao redor, identifique se é substantivo/verbo/adjetivo.'
      }
    ],
    formulas: [],
    dicas: [
      'Leia título e primeiro parágrafo primeiro',
      'Não traduza palavra por palavra',
      'Atenção a heterosemánticos (false friends)',
      'Identifique tema principal antes de detalhar',
      'Volte ao texto para confirmar resposta'
    ],
    erros: [
      'Confundir heterosemánticos',
      'Ignorar contexto',
      'Não ler enunciado antes do texto',
      'Tentar entender todas as palavras'
    ],
    quiz: [
      {
        pergunta: '"Largo" em espanhol significa:',
        opcoes: ['Largo', 'Comprido', 'Longo', 'Grande'],
        correta: 1
      },
      {
        pergunta: '"Oficina" significa:',
        opcoes: ['Oficina mecânica', 'Escritório', 'Loja', 'Fábrica'],
        correta: 1
      },
      {
        pergunta: 'Para encontrar ideia principal:',
        opcoes: ['Ler tudo devagar', 'Ler título + 1º parágrafo', 'Traduzir cada palavra', 'Ignorar o texto'],
        correta: 1
      }
    ]
  },

  'heterosemanticos': {
    titulo: 'Vocabulario - Heterosemánticos',
    icon: '⚠️',
    descricao: 'Palavras com significados diferentes',
    resumo: 'Heterosemánticos (ou falsos amigos) são palavras em espanhol que parecem palavras em português mas têm significados diferentes. São pegadinhas comuns no ENEM.',
    topicos: [
      {
        titulo: 'Embarazada',
        conteudo: 'Embarazada = grávida (NOT "embaraçada"). Avergonzada = embaraçada.'
      },
      {
        titulo: 'Largo',
        conteudo: 'Largo = comprido (NOT "largo"). Ancho = largo. Ex: "El río es largo" (o rio é comprido).'
      },
      {
        titulo: 'Oficina',
        conteudo: 'Oficina = escritório (NOT "oficina mecânica"). Taller = oficina mecânica.'
      },
      {
        titulo: 'Exquisito',
        conteudo: 'Exquisito = delicioso, refinado (NOT "esquisito"). Raro/extraño = esquisito.'
      }
    ],
    exemplos: [
      {
        titulo: 'Embarazada',
        problema: 'Mi hermana está embarazada.',
        solucao: 'Minha irmã está grávida. (NOT embaraçada)'
      },
      {
        titulo: 'Largo',
        problema: 'El camino es muy largo.',
        solucao: 'O caminho é muito comprido. (NOT largo)'
      }
    ],
    formulas: [],
    dicas: [
      'Memorize os heterosemánticos principais',
      'Não confie apenas na semelhança com português',
      'Contexto ajuda a identificar o significado',
      'Crie lista de heterosemánticos para revisar'
    ],
    erros: [
      'Traduzir "embarazada" como "embaraçada"',
      'Traduzir "largo" como "largo"',
      'Traduzir "oficina" como "oficina mecânica"',
      'Traduzir "exquisito" como "esquisito"'
    ],
    quiz: [
      {
        pergunta: '"Embarazada" significa:',
        opcoes: ['Embaraçada', 'Grávida', 'Envergonhada', 'Confusa'],
        correta: 1
      },
      {
        pergunta: '"Largo" significa:',
        opcoes: ['Largo', 'Comprido', 'Alto', 'Grosso'],
        correta: 1
      },
      {
        pergunta: '"Oficina" significa:',
        opcoes: ['Oficina mecânica', 'Escritório', 'Loja', 'Workshop'],
        correta: 1
      }
    ]
  },

  'conectores': {
    titulo: 'Vocabulario - Conectores',
    icon: '🔗',
    descricao: 'Conectores y marcadores discursivos',
    resumo: 'Conectores ligam ideias no texto e são essenciais para compreensão. Indicam relações de adição, contraste, causa, consequência e conclusão.',
    topicos: [
      {
        titulo: 'Adición',
        conteudo: 'Y, también, además, asimismo, igualmente. Ex: "Me gusta el café. Además, tomo té."'
      },
      {
        titulo: 'Contraste',
        conteudo: 'Pero, sin embargo, no obstante, aunque, a pesar de. Ex: "Estudié mucho, pero no aprobé."'
      },
      {
        titulo: 'Causa',
        conteudo: 'Porque, ya que, puesto que, debido a. Ex: "No fui porque estaba enfermo."'
      },
      {
        titulo: 'Consecuencia',
        conteudo: 'Por lo tanto, por eso, así que, entonces. Ex: "Llovió, por lo tanto nos quedamos en casa."'
      }
    ],
    exemplos: [
      {
        titulo: 'Contraste',
        problema: '___ hacía frío, salimos.',
        solucao: 'Aunque hacía frío, salimos. (apesar de)'
      },
      {
        titulo: 'Causa',
        problema: 'No vine ___ estaba enfermo.',
        solucao: 'No vine porque estaba enfermo. (porque = causa)'
      }
    ],
    formulas: [],
    dicas: [
      'Identifique relação lógica entre frases',
      'Sin embargo, por lo tanto = início de frase',
      'Pero, así que = meio de frase',
      'Aunque = apesar de (contraste)',
      'Porque vs por qué vs porqué'
    ],
    erros: [
      'Confundir "porque" (causa) com "¿por qué?" (pergunta)',
      'Usar múltiplos conectores de contraste juntos',
      'Estrutura errada após "a pesar de"'
    ],
    quiz: [
      {
        pergunta: 'Estudié mucho, ___ no aprobé.',
        opcoes: ['y', 'pero', 'porque', 'entonces'],
        correta: 1
      },
      {
        pergunta: '___ tenía sueño, seguí estudiando.',
        opcoes: ['Porque', 'Sin embargo', 'Aunque', 'Por lo tanto'],
        correta: 2
      },
      {
        pergunta: 'Llovió. ___, el partido fue cancelado.',
        opcoes: ['Además', 'Sin embargo', 'Por lo tanto', 'Aunque'],
        correta: 2
      }
    ]
  },

  'condicionales': {
    titulo: 'Oraciones Condicionales',
    icon: '❓',
    descricao: 'Primer, segundo e tercer tipo',
    resumo: 'Orações condicionais em espanhol expressam hipóteses e suas consequências. Há três tipos principais, cada um com estrutura e uso específicos.',
    topicos: [
      {
        titulo: 'Primer Tipo',
        conteudo: 'Situação real/provável. Si + presente, presente/futuro. Ex: "Si llueve, me quedo en casa."'
      },
      {
        titulo: 'Segundo Tipo',
        conteudo: 'Situação irreal/improvável no presente. Si + imperfecto subjuntivo, condicional. Ex: "Si tuviera dinero, viajaría."'
      },
      {
        titulo: 'Tercer Tipo',
        conteudo: 'Situação irreal no passado. Si + pluscuamperfecto subjuntivo, condicional perfecto. Ex: "Si hubiera estudiado, habría aprobado."'
      },
      {
        titulo: 'Diferenças',
        conteudo: '1° = possível. 2° = irreal agora. 3° = irreal passado (arrependimento).'
      }
    ],
    exemplos: [
      {
        titulo: 'Primeiro Tipo',
        problema: 'Si ___ (tener) tiempo, te llamo.',
        solucao: 'Si tengo tiempo, te llamo. (possível - futuro)'
      },
      {
        titulo: 'Segundo Tipo',
        problema: 'Si yo ___ (ser) rico, ___ (viajar) mucho.',
        solucao: 'Si yo fuera rico, viajaría mucho. (irreal agora)'
      }
    ],
    formulas: [
      '1°: Si + presente, presente/futuro',
      '2°: Si + imperfecto subjuntivo, condicional',
      '3°: Si + pluscuamperfecto subjuntivo, condicional perfecto'
    ],
    dicas: [
      '1° tipo = situação possível',
      '2° tipo = "se eu fosse" (irreal agora)',
      '3° tipo = "se eu tivesse sido" (arrependimento)',
      'Subjuntivo sempre após "si" nos tipos 2 e 3'
    ],
    erros: [
      'Usar futuro após "si": "Si tendrá" ❌',
      'Confundir segundo e terceiro tipo',
      'Esquecer subjuntivo nos tipos 2 e 3'
    ],
    quiz: [
      {
        pergunta: 'Si ___ rico, ___ un coche.',
        opcoes: ['soy/compro', 'fuera/compraría', 'hubiera sido/habría comprado', 'seré/compraré'],
        correta: 1
      },
      {
        pergunta: 'Si llueve mañana, no ___.',
        opcoes: ['iré', 'iría', 'voy', 'fuera'],
        correta: 0
      },
      {
        pergunta: 'Si ___ estudiado, ___ aprobado.',
        opcoes: ['he/he', 'había/había', 'hubiera/habría', 'haya/haya'],
        correta: 2
      }
    ]
  },

  'pronombres': {
    titulo: 'Pronombres',
    icon: '👤',
    descricao: 'Personales, posesivos, reflexivos',
    resumo: 'Pronomes substituem ou acompanham substantivos. Há vários tipos: pessoais (yo, tú), possessivos (mi, tu), reflexivos (me, te), demonstrativos (este, ese).',
    topicos: [
      {
        titulo: 'Personales',
        conteudo: 'Sujeito: yo, tú, él/ella, nosotros, vosotros, ellos. Objeto: me, te, lo/la, nos, os, los/las.'
      },
      {
        titulo: 'Posesivos',
        conteudo: 'Antes do substantivo: mi, tu, su, nuestro, vuestro, su. Após: mío, tuyo, suyo. Ex: "Mi casa" ou "La casa es mía".'
      },
      {
        titulo: 'Reflexivos',
        conteudo: 'Me, te, se, nos, os, se. Usados com verbos reflexivos. Ex: "Me levanto" (eu me levanto).'
      },
      {
        titulo: 'Demonstrativos',
        conteudo: 'Este/esta (perto), ese/esa (meio), aquel/aquella (longe). Ex: "Este libro" (este livro).'
      }
    ],
    exemplos: [
      {
        titulo: 'Possessivo',
        problema: '___ libro es interesante.',
        solucao: 'Mi libro es interesante. (meu livro)'
      },
      {
        titulo: 'Reflexivo',
        problema: 'Yo ___ lavo las manos.',
        solucao: 'Yo me lavo las manos. (eu me lavo)'
      }
    ],
    formulas: [],
    dicas: [
      'Pronomes pessoais podem ser omitidos (conjugação indica pessoa)',
      'Possessivos concordam em número: mi/mis, tu/tus',
      'Reflexivos vêm antes do verbo conjugado',
      '"Se" é 3ª pessoa singular E plural'
    ],
    erros: [
      'Esquecer reflexivo: "Yo levanto" ❌ (correto: Me levanto)',
      'Usar "su" sem clareza (pode ser dele, dela, deles)',
      'Confundir "este" (perto) com "ese" (meio)'
    ],
    quiz: [
      {
        pergunta: '___ hermano es médico.',
        opcoes: ['Mi', 'Mío', 'Me', 'Yo'],
        correta: 0
      },
      {
        pergunta: 'Ella ___ llama María.',
        opcoes: ['le', 'la', 'se', 'me'],
        correta: 2
      },
      {
        pergunta: '___ libro (aquí) es nuevo.',
        opcoes: ['Este', 'Ese', 'Aquel', 'Esto'],
        correta: 0
      }
    ]
  },

  'preposiciones': {
    titulo: 'Preposiciones',
    icon: '➡️',
    descricao: 'Por, para, a, de, en y otras',
    resumo: 'Preposições ligam palavras indicando relação espacial, temporal ou abstrata. As mais complexas são "por" e "para", que têm usos distintos.',
    topicos: [
      {
        titulo: 'Por',
        conteudo: 'Causa, motivo, troca, meio. Ex: "Por la mañana" (pela manhã), "Gracias por todo" (obrigado por tudo), "Viajar por avión" (viajar de avião).'
      },
      {
        titulo: 'Para',
        conteudo: 'Finalidade, destino, opinião. Ex: "Estudio para aprender" (estudo para aprender), "Voy para Madrid" (vou para Madrid), "Para mí es fácil" (para mim é fácil).'
      },
      {
        titulo: 'A, De, En',
        conteudo: 'A = movimento/tempo. De = origem/posse. En = localização. Ex: "Voy a casa", "Vengo de Brasil", "Estoy en la escuela".'
      },
      {
        titulo: 'Diferença Por/Para',
        conteudo: 'Por = causa/motivo ("por qué?"). Para = finalidade ("para qué?"). Ex: "Trabajo por dinero" vs "Trabajo para vivir".'
      }
    ],
    exemplos: [
      {
        titulo: 'Por vs Para',
        problema: 'Estudio ___ ser médico. Estudio ___ la mañana.',
        solucao: 'Estudio para ser médico. (finalidade) Estudio por la mañana. (tempo)'
      },
      {
        titulo: 'A, De, En',
        problema: 'Voy ___ la escuela. Vengo ___ casa. Estoy ___ el aula.',
        solucao: 'Voy a la escuela. Vengo de casa. Estoy en el aula.'
      }
    ],
    formulas: [],
    dicas: [
      'Por = causa/motivo (¿por qué?)',
      'Para = finalidade/destino (¿para qué?)',
      'A = movimento/direção',
      'De = origem/procedência/posse',
      'En = localização estática',
      'Expressões fixas: por favor, para siempre'
    ],
    erros: [
      'Confundir por e para',
      'Usar "a" para localização: "Estoy a casa" ❌ (correto: en casa)',
      'Esquecer "a" após verbos de movimento: "Voy casa" ❌'
    ],
    quiz: [
      {
        pergunta: 'Estudio ___ aprobar.',
        opcoes: ['por', 'para', 'a', 'en'],
        correta: 1
      },
      {
        pergunta: 'Trabajo ___ la noche.',
        opcoes: ['por', 'para', 'a', 'en'],
        correta: 0
      },
      {
        pergunta: 'Voy ___ la playa.',
        opcoes: ['por', 'para', 'a', 'en'],
        correta: 2
      }
    ]
  }
};

// ============================================================================
// FUNÇÃO PARA GERAR PÁGINA
// ============================================================================

function gerarPagina(materia, slug, modulo) {
  const cor = materia === 'ingles' ? '#6366f1' : '#dc2626';
  const corEscura = ajustarCor(cor, -30);
  const corClara = ajustarCor(cor, 30);

  return `'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MicroQuiz from '@/components/MicroQuiz';

export default function ${toPascalCase(slug)}Page() {
  const [progresso, setProgresso] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percent = (scrolled / documentHeight) * 100;
      setScrollPercent(Math.min(percent, 100));

      if (percent > progresso) {
        setProgresso(Math.floor(percent));
        localStorage.setItem('biblioteca_${materia}_${slug}', Math.floor(percent).toString());
      }
    };

    const savedProgress = localStorage.getItem('biblioteca_${materia}_${slug}');
    if (savedProgress) {
      setProgresso(parseInt(savedProgress));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progresso]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2818] to-[#1b3d29] text-white font-['Poppins'] relative overflow-hidden">
      {/* Barra de progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div
          className="h-full"
          style={{ background: \`linear-gradient(90deg, ${cor} 0%, ${corClara} 100%)\` }}
          initial={{ width: 0 }}
          animate={{ width: \`\${scrollPercent}%\` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative pt-32 pb-16 px-8"
        style={{ background: \`linear-gradient(135deg, ${corEscura} 0%, ${cor} 100%)\` }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/enem/biblioteca" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <span className="mr-2">←</span> Voltar para Biblioteca
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">${modulo.icon}</span>
            <div>
              <h1 className="text-5xl font-bold font-['Patrick_Hand']">${modulo.titulo}</h1>
              <p className="text-xl text-white/80 mt-2">${modulo.descricao}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">📚 ${materia === 'ingles' ? 'Inglês' : 'Espanhol'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">⏱️ Leitura: ~10 min</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">🎯 Progresso: {progresso}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Resumo */}
        <motion.div
          className="mb-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border-2"
          style={{ borderColor: '${cor}' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-4 flex items-center gap-2">
            <span>📖</span> Resumo
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">${modulo.resumo}</p>
        </motion.div>

        {/* Tópicos */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>📚</span> Tópicos Principais
          </h2>
          <div className="space-y-4">
            ${modulo.topicos.map((topico, index) => `
            <motion.div
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border-l-4 hover:bg-white/10 transition-all"
              style={{ borderLeftColor: '${cor}' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ${index * 0.1} }}
            >
              <h3 className="text-xl font-bold mb-2">${topico.titulo}</h3>
              <p className="text-white/80">${topico.conteudo}</p>
            </motion.div>
            `).join('')}
          </div>
        </motion.div>

        {/* Exemplos */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>💡</span> Exemplos
          </h2>
          <div className="space-y-6">
            ${modulo.exemplos.map((exemplo, index) => `
            <motion.div
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ${index * 0.1} }}
            >
              <h3 className="text-xl font-bold mb-3">${exemplo.titulo}</h3>
              <div className="mb-3">
                <strong className="text-white/90">Problema:</strong>
                <p className="text-white/70 mt-1">${exemplo.problema}</p>
              </div>
              <div>
                <strong className="text-white/90">Solução:</strong>
                <p className="text-white/70 mt-1">${exemplo.solucao}</p>
              </div>
            </motion.div>
            `).join('')}
          </div>
        </motion.div>

        ${modulo.formulas && modulo.formulas.length > 0 ? `
        {/* Fórmulas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>📐</span> Estruturas Importantes
          </h2>
          <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2" style={{ borderColor: '${cor}' }}>
            <div className="space-y-4">
              ${modulo.formulas.map((formula, index) => `
              <div className="p-4 bg-white/5 rounded-lg font-mono text-lg">
                ${formula}
              </div>
              `).join('')}
            </div>
          </div>
        </motion.div>
        ` : ''}

        {/* Dicas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>💡</span> Dicas para o ENEM
          </h2>
          <div className="grid gap-4">
            ${modulo.dicas.map((dica, index) => `
            <motion.div
              className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ${index * 0.05} }}
            >
              <span className="text-2xl">✓</span>
              <p className="text-white/90">${dica}</p>
            </motion.div>
            `).join('')}
          </div>
        </motion.div>

        {/* Erros Comuns */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-['Patrick_Hand'] mb-6 flex items-center gap-2">
            <span>⚠️</span> Erros Comuns
          </h2>
          <div className="grid gap-4">
            ${modulo.erros.map((erro, index) => `
            <motion.div
              className="flex items-start gap-3 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ${index * 0.05} }}
            >
              <span className="text-2xl">✗</span>
              <p className="text-white/90">${erro}</p>
            </motion.div>
            `).join('')}
          </div>
        </motion.div>

        {/* Quiz */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MicroQuiz questoes={${JSON.stringify(modulo.quiz)}} />
        </motion.div>

        {/* Mensagem final */}
        <motion.div
          className="text-center p-8 bg-gradient-to-r from-${cor}/20 to-${corClara}/20 backdrop-blur-sm rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-white/80">
            💡 Complete este módulo e ganhe até 10 FP no quiz final!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
`;
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function ajustarCor(cor, ajuste) {
  const hex = cor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, r + ajuste));
  g = Math.max(0, Math.min(255, g + ajuste));
  b = Math.max(0, Math.min(255, b + ajuste));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

console.log('🚀 Gerando páginas de Inglês e Espanhol...\n');

let totalGeradas = 0;
let totalErros = 0;

// Gerar páginas de Inglês
console.log('📚 Gerando páginas de INGLÊS...');
for (const [slug, modulo] of Object.entries(MODULOS_INGLES)) {
  try {
    const dirPath = path.join(__dirname, '..', 'app', 'enem', 'biblioteca', 'ingles', slug);
    const filePath = path.join(dirPath, 'page.tsx');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const conteudo = gerarPagina('ingles', slug, modulo);
    fs.writeFileSync(filePath, conteudo, 'utf8');

    console.log(`   ✅ ${modulo.titulo}`);
    totalGeradas++;
  } catch (error) {
    console.error(`   ❌ Erro ao gerar ${slug}:`, error.message);
    totalErros++;
  }
}

// Gerar páginas de Espanhol
console.log('\n📚 Gerando páginas de ESPANHOL...');
for (const [slug, modulo] of Object.entries(MODULOS_ESPANHOL)) {
  try {
    const dirPath = path.join(__dirname, '..', 'app', 'enem', 'biblioteca', 'espanhol', slug);
    const filePath = path.join(dirPath, 'page.tsx');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const conteudo = gerarPagina('espanhol', slug, modulo);
    fs.writeFileSync(filePath, conteudo, 'utf8');

    console.log(`   ✅ ${modulo.titulo}`);
    totalGeradas++;
  } catch (error) {
    console.error(`   ❌ Erro ao gerar ${slug}:`, error.message);
    totalErros++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`📊 RESUMO:`);
console.log(`   ✅ Páginas geradas: ${totalGeradas}`);
console.log(`   ❌ Erros: ${totalErros}`);
console.log('═══════════════════════════════════════════════════════════');
console.log('\n✨ Script concluído!\n');
console.log('📝 Próximos passos:');
console.log('   1. Testar as páginas geradas');
console.log('   2. Navegar para /enem/biblioteca');
console.log('   3. Verificar Inglês e Espanhol nos cards');
console.log('   4. Testar cada módulo individualmente');
console.log('');
