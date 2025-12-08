/**
 * NFC_ENEM_ENGINE - Base de Módulos (M01-M70)
 *
 * Array completo com todos os módulos do motor de IA
 * Convertidos dos blocos 1-7 do NFC_ENEM_ENGINE original
 */

import { EngineModule, ModuleType } from './types';

// ============================================================
// MÓDULOS 01-05: PRODUTIVIDADE E HIGH PERFORMANCE
// ============================================================

const M01: EngineModule = {
  id: 'M01',
  nome: 'Fricção Cognitiva Zero',
  tipo: 'PRODUCTIVITY',
  objetivo: 'Eliminar barreiras iniciais que impedem o aluno de começar a estudar.',
  gatilhos: ['inicio_sessao', 'procrastinação', 'inatividade_longa', 'travamento'],
  algoritmo: [
    'Identificar 3 obstáculos físicos no ambiente (celular, bagunça, barulho)',
    'Dar 60s para remover obstáculos',
    'Ativar micro-rotina: abrir material, pegar água, fechar notificações',
    'Iniciar timer de foco'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina'],
  fonte: 'Os 10 Passos para Produtividade Máxima',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['início', 'foco', 'preparação', 'ambiente']
};

const M02: EngineModule = {
  id: 'M02',
  nome: 'Unidade de Estudo de 25 Minutos',
  tipo: 'PRODUCTIVITY',
  objetivo: 'Maximizar foco e minimizar fadiga cognitiva.',
  gatilhos: ['inicio_sessao', 'bloco_completo'],
  algoritmo: [
    'Criar bloco de 25min com pausa de 5min',
    'Monitorar atenção (frequência de mensagens, taxa de erro, tempo de resposta)',
    'Se atenção cair, recomendar pausa antecipada',
    'Registrar performance do bloco'
  ],
  acoesRetorno: ['mostrar_mensagem', 'sugerir_pausa'],
  fonte: 'Produtividade Máxima',
  prioridade: 8,
  areasAlvo: ['all'],
  tags: ['pomodoro', 'foco', 'blocos', 'pausa']
};

const M03: EngineModule = {
  id: 'M03',
  nome: 'Regra 2×1 (Teoria → Prática)',
  tipo: 'PRODUCTIVITY',
  objetivo: 'Evitar estudo passivo e aumentar retenção.',
  gatilhos: ['bloco_completo', 'inicio_sessao'],
  algoritmo: [
    'Rastrear tempo de teoria automaticamente',
    'Calcular proporção: 2x prática para cada 1x teoria',
    'Recomendar prática após 10min de teoria',
    'Registrar erros para revisão espaçada'
  ],
  acoesRetorno: ['gerar_drill', 'sugerir_revisao'],
  fonte: 'Os 10 Passos',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['teoria', 'prática', 'questões', 'equilíbrio']
};

const M04: EngineModule = {
  id: 'M04',
  nome: 'Energia e Ritmo Biológico',
  tipo: 'HIGH_PERFORMANCE',
  objetivo: 'Operar o estudante no melhor horário cognitivo.',
  gatilhos: ['inicio_sessao', 'queda_de_rendimento'],
  algoritmo: [
    'Perguntar horário de melhor funcionamento mental',
    'Criar janelas de energia baseadas na preferência',
    'Detectar fadiga por indicadores de performance',
    'Reorganizar blocos se fadiga detectada',
    'Alertar para micro-recuperação'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina', 'sugerir_pausa'],
  fonte: 'Os 8 Passos para Alta Performance',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['energia', 'ritmo', 'horário', 'performance']
};

const M05: EngineModule = {
  id: 'M05',
  nome: 'Aluno Antifrágil',
  tipo: 'HIGH_PERFORMANCE',
  objetivo: 'Transformar erro em força cognitiva.',
  gatilhos: ['erro_repetido', 'erro', 'queda_de_rendimento'],
  algoritmo: [
    'Detectar erro repetido (3x mesmo padrão em 7 dias)',
    'Criar explicação personalizada com analogias',
    'Gerar quiz corretivo de 5 questões',
    'Agendar drill de reforço em 24h',
    'Agendar reavaliação em 7 dias'
  ],
  acoesRetorno: ['gerar_drill', 'mostrar_mensagem', 'agendar_revisao'],
  fonte: 'Alta Performance — Capítulo de Resiliência',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['erro', 'resiliência', 'melhoria', 'antifrágil']
};

// ============================================================
// MÓDULOS 06-07: LINGUAGENS
// ============================================================

const M06: EngineModule = {
  id: 'M06',
  nome: 'Leitura Orientada pelo Comando',
  tipo: 'LINGUAGENS',
  objetivo: 'Aumentar velocidade e precisão na interpretação.',
  gatilhos: ['conteudo_dificil', 'tempo_excessivo', 'pedido_ajuda'],
  algoritmo: [
    'Instruir a ler o comando ANTES do texto',
    'Identificar verbo central (analise, compare, identifique)',
    'Destacar áreas relevantes do texto baseado no comando',
    'Filtrar alternativas fora de escopo'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens 2023',
  prioridade: 6,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['leitura', 'comando', 'interpretação', 'verbo']
};

const M07: EngineModule = {
  id: 'M07',
  nome: 'Tese → Argumento → Conclusão',
  tipo: 'LINGUAGENS',
  objetivo: 'Ensinar o aluno a destrinchar textos longos rapidamente.',
  gatilhos: ['conteudo_dificil', 'tempo_excessivo', 'pedido_ajuda'],
  algoritmo: [
    'Resumir texto em 3 linhas: tese, argumento, conclusão',
    'Identificar conectores lógicos',
    'Mostrar inconsistências nas alternativas',
    'Treinar predição do raciocínio do autor'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens',
  prioridade: 6,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['tese', 'argumento', 'conclusão', 'conectores']
};

// ============================================================
// MÓDULOS 08-09, 19, 29, 37-38: EMOCIONAL
// ============================================================

const M08: EngineModule = {
  id: 'M08',
  nome: 'Regulação Emocional em 90 Segundos',
  tipo: 'EMOTIONAL',
  objetivo: 'Reduzir ansiedade, frustração e bloqueio mental.',
  gatilhos: ['ansiedade', 'frustração', 'travamento'],
  algoritmo: [
    'Detectar sinais de ansiedade (mensagens rápidas, erros repetidos)',
    'Ativar protocolo de respiração 4-2-6',
    'Perguntar: O que você pode controlar agora?',
    'Redirecionar para tarefa simples'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ativar_respiracao', 'apresentar_questao_facil'],
  fonte: 'Inteligência Emocional (E-book)',
  prioridade: 10,
  areasAlvo: ['all'],
  tags: ['ansiedade', 'respiração', 'calma', 'emocional']
};

const M09: EngineModule = {
  id: 'M09',
  nome: 'Identidade de Estudante de Alta Performance',
  tipo: 'EMOTIONAL',
  objetivo: 'Criar mentalidade constante de aprovação.',
  gatilhos: ['baixa_confiança', 'pedido_ajuda', 'inicio_sessao'],
  algoritmo: [
    'Perguntar: Por que você quer passar no ENEM?',
    'Gerar frase de identidade: Eu sou o tipo de pessoa que...',
    'Reforçar identidade quando confiança baixa',
    'Rastrear consistência psicológica semanal'
  ],
  acoesRetorno: ['mostrar_mensagem', 'reforçar_identidade'],
  fonte: '8 Passos para Alta Performance + Inteligência Emocional',
  prioridade: 8,
  areasAlvo: ['all'],
  tags: ['identidade', 'motivação', 'propósito', 'mentalidade']
};

const M19: EngineModule = {
  id: 'M19',
  nome: 'Controle Emocional para Provas',
  tipo: 'EMOTIONAL',
  objetivo: 'Evitar pânico, procrastinação e congelamento mental.',
  gatilhos: ['ansiedade', 'travamento', 'procrastinação'],
  algoritmo: [
    'Detectar tensão de prova',
    'Ativar respiração e frase âncora',
    'Oferecer micro-vitória (questão fácil)',
    'Retornar ao plano original gradualmente'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ativar_respiracao', 'apresentar_questao_facil'],
  fonte: 'Inteligência Emocional + Produtividade',
  prioridade: 10,
  areasAlvo: ['all'],
  tags: ['prova', 'pânico', 'controle', 'confiança']
};

const M29: EngineModule = {
  id: 'M29',
  nome: 'Autoeficácia Progressiva',
  tipo: 'EMOTIONAL',
  objetivo: 'Aumentar confiança e reduzir autossabotagem.',
  gatilhos: ['baixa_confiança', 'erro_repetido', 'acerto'],
  algoritmo: [
    'Registrar micro-vitórias',
    'Criar histórico visual de evolução',
    'Reforçar progresso comparado ao passado',
    'Reduzir impacto emocional do erro'
  ],
  acoesRetorno: ['mostrar_mensagem', 'mostrar_progresso'],
  fonte: 'Inteligência Emocional',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['confiança', 'evolução', 'progresso', 'autoeficácia']
};

const M37: EngineModule = {
  id: 'M37',
  nome: 'Protocolo Antiprocrastinação',
  tipo: 'EMOTIONAL',
  objetivo: 'Reduzir adiamentos, travamentos e sensação de incapacidade.',
  gatilhos: ['procrastinação', 'inatividade_longa', 'travamento'],
  algoritmo: [
    'Dividir em microblocos de 2 minutos',
    'Perguntar: O que você consegue fazer agora?',
    'Completar microbloco e celebrar',
    'Aumentar progressivamente até 25 minutos'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina'],
  fonte: 'Inteligência Emocional + Produtividade',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['procrastinação', 'início', 'microblocos', 'momentum']
};

const M38: EngineModule = {
  id: 'M38',
  nome: 'Desidentificação do Erro',
  tipo: 'EMOTIONAL',
  objetivo: 'Evitar que o aluno associe fracasso a identidade pessoal.',
  gatilhos: ['frustração', 'baixa_confiança', 'erro_repetido'],
  algoritmo: [
    'Detectar auto-crítica negativa (sou burro, não consigo)',
    'Reenquadrar erro como ponto de treino',
    'Substituir rótulos negativos por descritivos',
    'Mostrar evolução semanal'
  ],
  acoesRetorno: ['mostrar_mensagem', 'mostrar_progresso'],
  fonte: '8 Passos para Alta Performance',
  prioridade: 10,
  areasAlvo: ['all'],
  tags: ['erro', 'identidade', 'mentalidade', 'crescimento']
};

// ============================================================
// MÓDULOS 10, 20, 30, 39-40: ORGANIZAÇÃO
// ============================================================

const M10: EngineModule = {
  id: 'M10',
  nome: 'Sistema de Planejamento em 3 Níveis',
  tipo: 'ORGANIZATION',
  objetivo: 'Criar um sistema automático de organização.',
  gatilhos: ['inicio_sessao', 'fim_sessao'],
  algoritmo: [
    'Executar nível diário: 1 conteúdo + 1 bloco questões + 1 revisão',
    'Executar nível semanal: análise erros + ajuste metas + mini-simulado',
    'Executar nível mensal: avaliação progresso + redistribuir matérias',
    'Auto-ajustar baseado em performance'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina'],
  fonte: 'Manual de Organização Acadêmica',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['planejamento', 'organização', 'níveis', 'sistemático']
};

const M20: EngineModule = {
  id: 'M20',
  nome: 'Kanban de Estudo ENEM PRO',
  tipo: 'ORGANIZATION',
  objetivo: 'Organizar visualmente tudo que o aluno precisa fazer.',
  gatilhos: ['inicio_sessao', 'bloco_completo', 'revisao_devida'],
  algoritmo: [
    'Criar quadro: A FAZER, FAZENDO, FEITO',
    'Mover cards automaticamente baseado em progresso',
    'Atualizar baseado em performance',
    'Mostrar progresso visual'
  ],
  acoesRetorno: ['mostrar_mensagem', 'mostrar_progresso'],
  fonte: 'Manual de Organização Acadêmica',
  prioridade: 5,
  areasAlvo: ['all'],
  tags: ['kanban', 'visual', 'organização', 'quadro']
};

const M30: EngineModule = {
  id: 'M30',
  nome: 'Planejamento Reverso',
  tipo: 'ORGANIZATION',
  objetivo: 'Criar rotina de estudos partindo da data da prova.',
  gatilhos: ['inicio_sessao'],
  algoritmo: [
    'Calcular dias até o ENEM',
    'Dividir matérias proporcionalmente',
    'Ajustar para fraquezas do aluno',
    'Reorganizar semanalmente baseado em performance'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina'],
  fonte: 'Organização Acadêmica + Alta Performance',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['planejamento', 'reverso', 'ENEM', 'cronograma']
};

const M39: EngineModule = {
  id: 'M39',
  nome: 'Rotina de Reforço Matinal',
  tipo: 'ORGANIZATION',
  objetivo: 'Começar o dia com foco e clareza.',
  gatilhos: ['inicio_sessao'],
  algoritmo: [
    'Mostrar 3 prioridades do dia',
    'Exibir mapa mental curto do tópico prioritário',
    'Questões de aquecimento fáceis',
    'Comparar com últimos 7 dias'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_mapa_mental', 'gerar_drill'],
  fonte: 'Produtividade + Alta Performance',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['manhã', 'rotina', 'aquecimento', 'prioridades']
};

const M40: EngineModule = {
  id: 'M40',
  nome: 'Rotina de Consolidação Noturna',
  tipo: 'ORGANIZATION',
  objetivo: 'Fechar o dia solidificando o aprendizado.',
  gatilhos: ['fim_sessao'],
  algoritmo: [
    'Revisar 5 itens do dia com quiz rápido',
    'Gerar 3 flashcards automáticos dos erros',
    'Identificar 1 erro estrutural e sugerir correção',
    'Planejar ajustes para amanhã'
  ],
  acoesRetorno: ['gerar_drill', 'criar_flashcards', 'ajustar_rotina'],
  fonte: 'Produtividade + Como Memorizar Tudo',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['noite', 'rotina', 'consolidação', 'flashcards']
};

// ============================================================
// MÓDULOS 11-15, 21-22, 25-26, 31-33: MEMÓRIA
// ============================================================

const M11: EngineModule = {
  id: 'M11',
  nome: 'Ciclo 1–24–7 (Revisão Perfeita)',
  tipo: 'MEMORY',
  objetivo: 'Fixar conteúdos com máxima retenção usando a curva de esquecimento.',
  gatilhos: ['bloco_completo', 'revisao_devida'],
  algoritmo: [
    'Ciclo 1: revisão imediata de 1 minuto (2 questões)',
    'Agendar Ciclo 24h: quiz curto de 5 questões',
    'Agendar Ciclo 7d: mini-simulado de 10 questões',
    'Se erro, reiniciar do ponto fraco',
    'Rastrear com timestamp e ajustar intervalos'
  ],
  acoesRetorno: ['gerar_drill', 'agendar_revisao', 'criar_flashcards'],
  fonte: 'Como Memorizar e Aprender Tudo — Eduardo Novaes',
  prioridade: 8,
  areasAlvo: ['all'],
  tags: ['revisão', 'memória', 'ciclo', 'espaçada']
};

const M12: EngineModule = {
  id: 'M12',
  nome: 'Ancoragem Mnemônica com Histórias',
  tipo: 'MEMORY',
  objetivo: 'Transformar dados abstratos em imagens mentais fortes.',
  gatilhos: ['conteudo_dificil', 'pedido_ajuda', 'erro_repetido'],
  algoritmo: [
    'Detectar conteúdo decorativo (tabelas, leis, fórmulas)',
    'Criar micro-história com 3 imagens exageradas',
    'Conectar personagens aos elementos',
    'Testar retenção em 30 segundos',
    'Agendar reforço em 48h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Mnemônica — Miguel Ángel Pérez Correa',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['mnemônica', 'história', 'imagem', 'memorização']
};

const M13: EngineModule = {
  id: 'M13',
  nome: 'Palácio da Memória Simplificado',
  tipo: 'MEMORY',
  objetivo: 'Ajudar o aluno a memorizar listas, etapas, sequências.',
  gatilhos: ['conteudo_dificil', 'pedido_ajuda'],
  algoritmo: [
    'Selecionar espaço mental familiar (casa, escola)',
    'Criar 10 posições loci estáveis',
    'Atribuir itens às posições com imagens vívidas',
    'Revisar percorrendo mentalmente o caminho',
    'Aplicar a matérias específicas'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Mnemônica — Capítulo sobre loci',
  prioridade: 5,
  areasAlvo: ['biologia', 'quimica', 'historia'],
  tags: ['palácio', 'loci', 'memória', 'sequência']
};

const M14: EngineModule = {
  id: 'M14',
  nome: 'Reescrita Inteligente',
  tipo: 'MEMORY',
  objetivo: 'Forçar o aluno a transformar teoria em linguagem própria.',
  gatilhos: ['bloco_completo', 'pedido_ajuda'],
  algoritmo: [
    'Pedir explicação em próprias palavras (2 linhas)',
    'Analisar completude da resposta',
    'Apontar lacunas específicas',
    'Gerar versão simplificada para comparação',
    'Fazer pergunta inversa: O que aconteceria se...?'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Como Estudar e Aprender Melhor — Ismar Souza',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['reescrita', 'próprias palavras', 'compreensão']
};

const M15: EngineModule = {
  id: 'M15',
  nome: 'Compressão de Conteúdo em 30 Segundos',
  tipo: 'MEMORY',
  objetivo: 'Ensinar o aluno a transformar páginas inteiras em micro-sínteses.',
  gatilhos: ['bloco_completo', 'conteudo_dificil'],
  algoritmo: [
    'Pedir resumo em 30s ou 3 linhas',
    'Avaliar: ideia central, relação, exemplo',
    'Detectar ruído e marcar',
    'Treinar extração progressiva'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Produtividade + Mnemônica',
  prioridade: 5,
  areasAlvo: ['all'],
  tags: ['resumo', 'compressão', 'síntese', 'essência']
};

const M21: EngineModule = {
  id: 'M21',
  nome: 'Recuperação Ativa Direcionada',
  tipo: 'MEMORY',
  objetivo: 'Ensinar o aluno a lembrar sem depender do texto.',
  gatilhos: ['revisao_devida', 'bloco_completo'],
  algoritmo: [
    'Pedir recall sem material',
    'Comparar com correto lado a lado',
    'Marcar lacunas como frágeis',
    'Gerar micro-questões focadas nas lacunas',
    'Agendar repetição em 24h'
  ],
  acoesRetorno: ['gerar_drill', 'agendar_revisao'],
  fonte: 'Como Estudar e Aprender Melhor',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['recuperação', 'ativa', 'recall', 'sem material']
};

const M22: EngineModule = {
  id: 'M22',
  nome: 'Associação Cruzada Multidisciplinar',
  tipo: 'MEMORY',
  objetivo: 'Criar ligações entre conteúdos de áreas diferentes.',
  gatilhos: ['bloco_completo', 'conteudo_dificil'],
  algoritmo: [
    'Identificar conceito central (energia, equilíbrio, texto)',
    'Relacionar com outras áreas',
    'Criar exemplos comparativos',
    'Aprofundar retenção por conexão',
    'Revisar cruzado em 72h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Mnemônica + Alta Performance',
  prioridade: 5,
  areasAlvo: ['all'],
  tags: ['associação', 'cruzada', 'multidisciplinar', 'conexões']
};

const M25: EngineModule = {
  id: 'M25',
  nome: 'Regra do Exagero (Hipermemória)',
  tipo: 'MEMORY',
  objetivo: 'Facilitar memorização de ideias difíceis usando exagero visual.',
  gatilhos: ['conteudo_dificil', 'erro_repetido'],
  algoritmo: [
    'Converter em imagem absurda',
    'Perguntar: Qual imagem veio à sua cabeça?',
    'Se não lembrar, intensificar exagero',
    'Adicionar movimento e som se necessário',
    'Revisar no dia seguinte'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Mnemônica — Técnicas de Imaginação',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['exagero', 'imagem', 'visual', 'absurdo']
};

const M26: EngineModule = {
  id: 'M26',
  nome: 'Encadeamento Lógico (Efeito Dominó)',
  tipo: 'MEMORY',
  objetivo: 'Transformar listas em sequências de causa e efeito.',
  gatilhos: ['conteudo_dificil', 'pedido_ajuda'],
  algoritmo: [
    'Transformar lista em cadeia: A causa B → B causa C',
    'Pedir recontar a cadeia',
    'Identificar erros de link',
    'Revisar em 48h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Como Memorizar e Aprender Tudo',
  prioridade: 5,
  areasAlvo: ['all'],
  tags: ['encadeamento', 'causa', 'efeito', 'sequência']
};

const M31: EngineModule = {
  id: 'M31',
  nome: 'Técnica Feynman ENEM',
  tipo: 'MEMORY',
  objetivo: 'Garantir que o aluno realmente entenda, não apenas memorize.',
  gatilhos: ['bloco_completo', 'conteudo_dificil', 'erro_repetido'],
  algoritmo: [
    'Pedir: Ensine como se fosse para uma criança de 10 anos',
    'Identificar lacunas na explicação',
    'Gerar explicação alternativa mais simples',
    'Revisar com analogia em 24h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Como Estudar e Aprender Melhor',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['Feynman', 'ensinar', 'compreensão', 'simplificar']
};

const M32: EngineModule = {
  id: 'M32',
  nome: 'Flashcards Inteligentes Automáticos',
  tipo: 'MEMORY',
  objetivo: 'Criar flashcards personalizados com base nos erros do aluno.',
  gatilhos: ['erro_repetido', 'fim_sessao', 'revisao_devida'],
  algoritmo: [
    'Transformar erros repetidos em flashcards',
    'Agrupar por matéria e dificuldade',
    'Aplicar ciclo 1-24-7',
    'Remover quando domínio atingido'
  ],
  acoesRetorno: ['criar_flashcards', 'agendar_revisao'],
  fonte: 'Como Memorizar Tudo + Produtividade',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['flashcards', 'automático', 'erros', 'revisão']
};

const M33: EngineModule = {
  id: 'M33',
  nome: 'Analogias Estruturadas',
  tipo: 'MEMORY',
  objetivo: 'Substituir memorização difícil por compreensão rápida.',
  gatilhos: ['conteudo_dificil', 'erro_repetido', 'pedido_ajuda'],
  algoritmo: [
    'Relacionar abstrato com familiar (corrente elétrica → fluxo de água)',
    'Verificar entendimento',
    'Se erro, fornecer analogia mais simples',
    'Revisar em 48-72h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Alta Performance + Mnemônica',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['analogia', 'comparação', 'compreensão', 'familiar']
};

// ============================================================
// MÓDULOS 16-18, 23-24, 27-28, 34-36: ESTRATÉGIA
// ============================================================

const M16: EngineModule = {
  id: 'M16',
  nome: 'Ataque Tático às Alternativas',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar o aluno a resolver questões pelas alternativas.',
  gatilhos: ['tempo_excessivo', 'pedido_ajuda', 'conteudo_dificil'],
  algoritmo: [
    'Escanear alternativas ANTES do texto',
    'Eliminar 2 incoerentes',
    'Verificar coerência com comando',
    'Identificar palavras-armadilha (sempre, nunca, exclusivamente)',
    'Treinar justificativa de eliminação'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens + Jogo Estratégico',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['alternativas', 'eliminação', 'tática', 'estratégia']
};

const M17: EngineModule = {
  id: 'M17',
  nome: 'Leitura Diagonal Inteligente',
  tipo: 'STRATEGY',
  objetivo: 'Aumentar velocidade sem perder compreensão.',
  gatilhos: ['tempo_excessivo', 'conteudo_dificil'],
  algoritmo: [
    'Destacar elementos-chave (tese, palavras-chave, conectores)',
    'Extrair início, meio, fim em textos longos',
    'Ensinar onde a resposta costuma estar',
    'Treinar progressivamente com textos maiores'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens',
  prioridade: 6,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['leitura', 'diagonal', 'velocidade', 'eficiência']
};

const M18: EngineModule = {
  id: 'M18',
  nome: 'Engenharia Reversa do ENEM',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar a estrutura por trás de cada questão do ENEM.',
  gatilhos: ['erro_repetido', 'pedido_ajuda', 'conteudo_dificil'],
  algoritmo: [
    'Identificar tipo de questão (conceitual, interpretativa, aplicada)',
    'Reconstruir pensamento do elaborador',
    'Mostrar atalho cognitivo',
    'Ensinar padrões recorrentes'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Jogo Estratégico ENEM',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['engenharia', 'reversa', 'padrões', 'elaborador']
};

const M23: EngineModule = {
  id: 'M23',
  nome: 'Protocolo 3-1 das Alternativas',
  tipo: 'STRATEGY',
  objetivo: 'Aumentar taxa de acerto em questões interpretativas.',
  gatilhos: ['erro_repetido', 'pedido_ajuda'],
  algoritmo: [
    'Identificar alternativa mais coerente (principal)',
    'Identificar similar mas fraca (quase correta)',
    'Identificar claramente incompatível',
    'Treinar distinção sutil entre principal e quase'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens + Provas do ENEM',
  prioridade: 7,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['alternativas', 'protocolo', 'interpretação', 'precisão']
};

const M24: EngineModule = {
  id: 'M24',
  nome: 'Padrões Ocultos do ENEM',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar o aluno a identificar estruturas que aparecem todo ano.',
  gatilhos: ['erro_repetido', 'bloco_completo'],
  algoritmo: [
    'Detectar padrões: ênfase em competências, interpretação > memória, gráficos com armadilhas',
    'Treinar com questões reais anotadas',
    'Praticar reconhecimento de padrões'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Jogo Estratégico ENEM',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['padrões', 'ocultos', 'ENEM', 'reconhecimento']
};

const M27: EngineModule = {
  id: 'M27',
  nome: 'Leitura Cirúrgica (Foco no Essencial)',
  tipo: 'STRATEGY',
  objetivo: 'Remover leitura excessiva e focar apenas no que resolve a questão.',
  gatilhos: ['tempo_excessivo', 'conteudo_dificil'],
  algoritmo: [
    'Auto-destacar essenciais: tese, conectores, oposição, conclusão',
    'Treinar pular irrelevante',
    'Localizar resposta diretamente'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens',
  prioridade: 6,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['leitura', 'cirúrgica', 'essencial', 'foco']
};

const M28: EngineModule = {
  id: 'M28',
  nome: 'Modelo de Decisão em 2 Minutos',
  tipo: 'STRATEGY',
  objetivo: 'Reduzir travamento na hora de decidir alternativa.',
  gatilhos: ['tempo_excessivo'],
  algoritmo: [
    'Detectar bloqueio de decisão (>2min)',
    'Passo 1: Eliminar inválidas (30s)',
    'Passo 2: Comparar coerência (30s)',
    'Passo 3: Justificar mentalmente (20s)',
    'Treinar redução gradual do tempo'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Produtividade Máxima',
  prioridade: 8,
  areasAlvo: ['all'],
  tags: ['decisão', 'tempo', 'travamento', 'rapidez']
};

const M34: EngineModule = {
  id: 'M34',
  nome: 'Técnica do Duplo Blind',
  tipo: 'STRATEGY',
  objetivo: 'Aumentar acertos removendo viés emocional.',
  gatilhos: ['erro_repetido', 'conteudo_dificil'],
  algoritmo: [
    'Esconder alternativas por 60s',
    'Responder baseado só no texto',
    'Revelar e comparar com própria resposta',
    'Treinar pensar como elaborador'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Jogo Estratégico ENEM',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['blind', 'viés', 'objetivo', 'técnica']
};

const M35: EngineModule = {
  id: 'M35',
  nome: 'Detector de Pegadinhas',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar o aluno a identificar e neutralizar pegadinhas clássicas.',
  gatilhos: ['erro_repetido', 'pedido_ajuda'],
  algoritmo: [
    'Auto-destacar armadilhas: absolutismos, coerência aparente, apelo emocional, generalizações',
    'Explicar cada tipo de armadilha',
    'Treinar com exemplos e contra-exemplos'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens + Provas do ENEM',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['pegadinhas', 'armadilhas', 'detecção', 'cuidado']
};

const M36: EngineModule = {
  id: 'M36',
  nome: 'Reconhecimento de Padrões de Gráficos e Tabelas',
  tipo: 'STRATEGY',
  objetivo: 'Aumentar acertos em matemática, geografia e ciências.',
  gatilhos: ['conteudo_dificil', 'erro_repetido', 'pedido_ajuda'],
  algoritmo: [
    'Identificar tipo de gráfico (barra, linha, pizza)',
    'Extrair tendências rápidas',
    'Identificar armadilhas (escalas distorcidas, médias mal interpretadas)',
    'Resolver sem cálculo desnecessário'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Jogo Estratégico ENEM + Provas Oficiais',
  prioridade: 6,
  areasAlvo: ['matematica', 'geografia', 'natureza'],
  tags: ['gráficos', 'tabelas', 'dados', 'interpretação']
};

// ============================================================
// MÓDULOS 51-60: BLOCO 6 (AVANÇADOS)
// ============================================================

const M51: EngineModule = {
  id: 'M51',
  nome: 'Engenharia Reversa por Alternativas',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar o aluno a resolver a questão sem ler todo o enunciado.',
  gatilhos: ['tempo_excessivo', 'erro_repetido', 'pedido_ajuda'],
  algoritmo: [
    'Apresentar alternativas primeiro (esconder enunciado)',
    'Identificar padrões de resposta',
    'Eliminar 2-3 antes de ler texto',
    'Explicar alternativas erradas típicas do ENEM',
    'Criar drill focado em alternativas'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Jogo Estratégico de Revisão',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['engenharia reversa', 'alternativas', 'padrões', 'eliminação']
};

const M52: EngineModule = {
  id: 'M52',
  nome: 'Memória Condensada em 3 Linhas',
  tipo: 'MEMORY',
  objetivo: 'Reduzir conteúdos densos para uma versão ultracurta.',
  gatilhos: ['conteudo_dificil', 'bloco_completo', 'revisao_devida'],
  algoritmo: [
    'Extrair 3 ideias essenciais: conceito, aplicação, exemplo',
    'Formatar: {conceito} → {aplicação} → {exemplo}',
    'Pedir que aluno repita com próprias palavras',
    'Corrigir e agendar revisão semanal'
  ],
  acoesRetorno: ['mostrar_mensagem', 'criar_flashcards'],
  fonte: 'Como Memorizar e Aprender Tudo',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['condensação', '3 linhas', 'síntese', 'memória']
};

const M53: EngineModule = {
  id: 'M53',
  nome: 'Blindagem Antiestresse para Prova',
  tipo: 'EMOTIONAL',
  objetivo: 'Evitar queda de desempenho em dias de simulado/prova.',
  gatilhos: ['ansiedade', 'queda_de_rendimento', 'travamento'],
  algoritmo: [
    'Avaliar padrão emocional (respostas lentas, sequência de erros)',
    'Ativar grounding 5-4-3-2-1 por 30s',
    'Simplificar explicação do conteúdo',
    'Apresentar questão fácil para estabilização',
    'Retomar rotina normal gradualmente'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ativar_respiracao', 'apresentar_questao_facil', 'simplificar_conteudo'],
  fonte: 'Inteligência Emocional',
  prioridade: 10,
  areasAlvo: ['all'],
  tags: ['antiestresse', 'grounding', 'prova', 'simulado', 'blindagem']
};

const M54: EngineModule = {
  id: 'M54',
  nome: 'Análise de Distratores',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar a identificar alternativas falsas sedutoras.',
  gatilhos: ['erro_repetido', 'pedido_ajuda', 'conteudo_dificil'],
  algoritmo: [
    'Identificar palavras sedutoras nas alternativas',
    'Comparar lado a lado com correta',
    'Explicar armadilhas típicas: generalização, exagero, inferência abusiva',
    'Treinar detecção de distratores por 7 dias'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens',
  prioridade: 7,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['distratores', 'armadilhas', 'alternativas', 'sedução']
};

const M55: EngineModule = {
  id: 'M55',
  nome: 'Revisão Ultrarrápida 1-1-1',
  tipo: 'MEMORY',
  objetivo: 'Sistema de revisão expressa para dias corridos.',
  gatilhos: ['inicio_sessao', 'revisao_devida'],
  algoritmo: [
    'Resumir em 1 frase (20 palavras)',
    'Criar 1 questão essencial',
    'Criar 1 aplicação prática',
    'Se falhar, reforçar e agendar em 24h'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill', 'agendar_revisao'],
  fonte: 'Alta Performance',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['revisão', 'ultrarrápida', '1-1-1', 'expressa']
};

const M56: EngineModule = {
  id: 'M56',
  nome: 'Leitura Vertical',
  tipo: 'LINGUAGENS',
  objetivo: 'Dominar interpretação sem ler linha por linha.',
  gatilhos: ['tempo_excessivo', 'conteudo_dificil', 'pedido_ajuda'],
  algoritmo: [
    'Ensinar captura vertical: tese (1º parágrafo), oposição (conectores), conclusão (último parágrafo)',
    'Marcar blocos de texto com cores',
    'Responder usando apenas blocos marcados',
    'Mostrar ganho de tempo e precisão'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Linguagens',
  prioridade: 6,
  areasAlvo: ['linguagens', 'humanas'],
  tags: ['leitura vertical', 'blocos', 'tese', 'conclusão']
};

const M57: EngineModule = {
  id: 'M57',
  nome: 'Sessão Inteligente de 25 Minutos (Foco Real)',
  tipo: 'ORGANIZATION',
  objetivo: 'Criar foco profundo sem dispersão.',
  gatilhos: ['inicio_sessao', 'bloco_completo'],
  algoritmo: [
    'Iniciar ciclo de 25min sem multitarefa',
    'Detectar e registrar distrações',
    'Verificar retenção a cada 25min com 2 questões',
    'Ajustar dificuldade baseado no foco'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill', 'ajustar_rotina'],
  fonte: 'Produtividade Máxima',
  prioridade: 8,
  areasAlvo: ['all'],
  tags: ['foco', '25 minutos', 'deep work', 'sem distração']
};

const M58: EngineModule = {
  id: 'M58',
  nome: 'Recuperação Rápida Pós-Erro',
  tipo: 'EMOTIONAL',
  objetivo: 'Evitar que um erro leve a sequência de erros.',
  gatilhos: ['erro_repetido', 'frustração', 'baixa_confiança'],
  algoritmo: [
    'Detectar reação negativa (resposta rápida, frustração)',
    'Explicar erro sem julgamento',
    'Gerar questão similar mais fácil',
    'Reforçar sucesso e retornar ao nível original'
  ],
  acoesRetorno: ['mostrar_mensagem', 'apresentar_questao_facil'],
  fonte: 'Inteligência Emocional',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['recuperação', 'erro', 'emocional', 'resiliência']
};

const M59: EngineModule = {
  id: 'M59',
  nome: 'Aprendizado por Histórias',
  tipo: 'MEMORY',
  objetivo: 'Melhorar retenção através de narrativa.',
  gatilhos: ['conteudo_dificil', 'pedido_ajuda', 'erro_repetido'],
  algoritmo: [
    'Transformar conteúdo em história (30-50 palavras)',
    'Mapear conceitos em personagens',
    'Pedir que aluno reconte a história',
    'Agendar revisão em 24h e 7d'
  ],
  acoesRetorno: ['mostrar_mensagem', 'agendar_revisao'],
  fonte: 'Como Estudar e Aprender Melhor',
  prioridade: 6,
  areasAlvo: ['all'],
  tags: ['histórias', 'narrativa', 'personagens', 'memória']
};

const M60: EngineModule = {
  id: 'M60',
  nome: 'Reduzir Ao Núcleo da Questão',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar a desconsiderar ruídos e focar só no que importa.',
  gatilhos: ['tempo_excessivo', 'conteudo_dificil', 'erro_repetido'],
  algoritmo: [
    'Identificar pergunta real (ignorar exemplos e histórias)',
    'Remover elementos irrelevantes',
    'Apresentar versão destilada (<30 palavras)',
    'Resolver usando apenas o núcleo',
    'Reforçar com variações'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: '8 Passos para Alta Performance',
  prioridade: 7,
  areasAlvo: ['all'],
  tags: ['núcleo', 'essência', 'ruído', 'simplificação']
};

// ============================================================
// MÓDULOS 61-70: BLOCO 7 (REDAÇÃO, EXATAS, PROVA)
// ============================================================

const M61: EngineModule = {
  id: 'M61',
  nome: 'Estrutura Dissertativo-Argumentativa',
  tipo: 'REDACAO',
  objetivo: 'Ensinar a estrutura obrigatória da redação ENEM.',
  gatilhos: ['pedido_ajuda', 'inicio_sessao', 'conteudo_dificil'],
  algoritmo: [
    'Ensinar estrutura: Introdução (5-7 linhas), D1 (7-9), D2 (7-9), Conclusão (5-7)',
    'Praticar introdução: contexto + tese + roteiro',
    'Praticar desenvolvimento: tópico frasal + argumento + repertório',
    'Praticar conclusão: retomada + proposta de intervenção completa'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Manual de Redação ENEM + Competências',
  prioridade: 8,
  areasAlvo: ['redacao'],
  tags: ['redação', 'estrutura', 'dissertação', 'ENEM']
};

const M62: EngineModule = {
  id: 'M62',
  nome: 'As 5 Competências da Redação ENEM',
  tipo: 'REDACAO',
  objetivo: 'Dominar as 5 competências avaliadas e maximizar a nota.',
  gatilhos: ['pedido_ajuda', 'erro_repetido', 'bloco_completo'],
  algoritmo: [
    'Explicar C1: Norma culta (ortografia, concordância, regência)',
    'Explicar C2: Compreensão do tema (não fugir, não tangenciar)',
    'Explicar C3: Argumentação (repertório, autoria, análise)',
    'Explicar C4: Coesão (conectivos, progressão, referenciação)',
    'Explicar C5: Proposta de intervenção (agente, ação, meio, finalidade, detalhamento)'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Matriz de Referência ENEM - Redação',
  prioridade: 8,
  areasAlvo: ['redacao'],
  tags: ['competências', 'redação', 'avaliação', 'nota']
};

const M63: EngineModule = {
  id: 'M63',
  nome: 'Banco de Repertório Sociocultural',
  tipo: 'MEMORY',
  objetivo: 'Construir e memorizar repertório legitimado para usar na redação.',
  gatilhos: ['inicio_sessao', 'revisao_devida', 'pedido_ajuda'],
  algoritmo: [
    'Categorizar: Filósofos, Sociólogos, Dados, Leis, Obras, Filmes, Fatos históricos',
    'Criar cards: frente = autor, verso = ideia + como usar',
    'Ensinar integração: não apenas citar, mas analisar',
    'Drill semanal de novos repertórios'
  ],
  acoesRetorno: ['criar_flashcards', 'gerar_drill'],
  fonte: 'Competência 3 ENEM + Alta Performance',
  prioridade: 7,
  areasAlvo: ['redacao'],
  tags: ['repertório', 'citações', 'cultura', 'argumentação']
};

const M64: EngineModule = {
  id: 'M64',
  nome: 'Proposta de Intervenção Perfeita',
  tipo: 'STRATEGY',
  objetivo: 'Garantir 200 pontos na Competência 5 com proposta completa.',
  gatilhos: ['pedido_ajuda', 'erro_repetido', 'conteudo_dificil'],
  algoritmo: [
    'Ensinar 5 elementos: Agente, Ação, Meio, Finalidade, Detalhamento (A-A-M-F-D)',
    'Mostrar template de conclusão',
    'Explicar erros comuns (vaga, fere direitos humanos, falta detalhamento)',
    'Praticar com 5 temas diferentes'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Competência 5 ENEM',
  prioridade: 9,
  areasAlvo: ['redacao'],
  tags: ['proposta', 'intervenção', 'competência 5', 'conclusão']
};

const M65: EngineModule = {
  id: 'M65',
  nome: 'Resolução de Problemas por Etapas',
  tipo: 'STRATEGY',
  objetivo: 'Ensinar método sistemático para resolver problemas de matemática.',
  gatilhos: ['erro_repetido', 'tempo_excessivo', 'pedido_ajuda'],
  algoritmo: [
    'Ensinar método C-P-E-V: Compreender, Planejar, Executar, Verificar',
    'Identificar tipo de problema (porcentagem, regra de 3, geometria)',
    'Praticar com anotação dos passos',
    'Drill de velocidade com foco no método'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Metodologia de Resolução de Problemas',
  prioridade: 7,
  areasAlvo: ['matematica'],
  tags: ['matemática', 'etapas', 'método', 'resolução']
};

const M66: EngineModule = {
  id: 'M66',
  nome: 'Formulário de Fórmulas Essenciais',
  tipo: 'MEMORY',
  objetivo: 'Memorizar as fórmulas mais cobradas no ENEM.',
  gatilhos: ['inicio_sessao', 'revisao_devida', 'erro_repetido'],
  algoritmo: [
    'Apresentar top fórmulas: Mat (%, regra 3, Pitágoras, Bhaskara), Física (v, F, E), Química (C, n, d)',
    'Criar mnemônicos para cada fórmula',
    'Drill: mostrar fórmula e perguntar quando usar',
    'Praticar com questões ENEM reais'
  ],
  acoesRetorno: ['criar_flashcards', 'gerar_drill'],
  fonte: 'Análise de Provas ENEM 2015-2023',
  prioridade: 7,
  areasAlvo: ['matematica', 'natureza'],
  tags: ['fórmulas', 'matemática', 'física', 'química', 'memória']
};

const M67: EngineModule = {
  id: 'M67',
  nome: 'Interpretação de Gráficos Avançados',
  tipo: 'STRATEGY',
  objetivo: 'Dominar leitura e interpretação de gráficos complexos do ENEM.',
  gatilhos: ['erro_repetido', 'conteudo_dificil', 'pedido_ajuda'],
  algoritmo: [
    'Ensinar ordem de leitura: título → eixos → escalas → tendências → legenda → pergunta',
    'Identificar armadilhas: escala manipulada, dados irrelevantes, confusão de unidades',
    'Praticar por tipo: barra, linha, pizza, dispersão, histograma',
    'Drill de interpretação rápida (60s por gráfico)'
  ],
  acoesRetorno: ['mostrar_mensagem', 'gerar_drill'],
  fonte: 'Análise de Questões ENEM + Jogo Estratégico',
  prioridade: 7,
  areasAlvo: ['matematica', 'humanas', 'natureza'],
  tags: ['gráficos', 'interpretação', 'dados', 'estatística']
};

const M68: EngineModule = {
  id: 'M68',
  nome: 'Gestão de Tempo na Prova Real',
  tipo: 'ORGANIZATION',
  objetivo: 'Distribuir o tempo de forma otimizada durante os dias de prova.',
  gatilhos: ['inicio_sessao', 'pedido_ajuda'],
  algoritmo: [
    'Ensinar distribuição: Dia 1 (redação 1h, linguagens 2h15, humanas 2h15), Dia 2 (mat 2h30, natureza 2h30)',
    'Ensinar ordem por waves: fáceis → médias → difíceis → revisão',
    'Ensinar quando pular (>4min, não entendeu após 2 leituras)',
    'Simular com timer real'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ajustar_rotina'],
  fonte: 'Estratégias de Prova + Alta Performance',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['tempo', 'prova', 'gestão', 'estratégia']
};

const M69: EngineModule = {
  id: 'M69',
  nome: 'Protocolo Pré-Prova (Dia Anterior)',
  tipo: 'ORGANIZATION',
  objetivo: 'Preparar mente e corpo para o dia da prova.',
  gatilhos: ['inicio_sessao', 'pedido_ajuda'],
  algoritmo: [
    'Checklist: local, documentos, kit (caneta, água, lanche), roupa, horários',
    'Preparação mental: visualização positiva, respiração 4-7-8',
    'O que evitar: conteúdo novo, dormir tarde, cafeína, estresse',
    'Protocolo de sono: 6-8h, sem telas 1h antes'
  ],
  acoesRetorno: ['mostrar_mensagem'],
  fonte: 'Alta Performance + Psicologia de Provas',
  prioridade: 9,
  areasAlvo: ['all'],
  tags: ['pré-prova', 'preparação', 'dia anterior', 'checklist']
};

const M70: EngineModule = {
  id: 'M70',
  nome: 'Protocolo do Dia da Prova',
  tipo: 'EMOTIONAL',
  objetivo: 'Maximizar desempenho durante as 5h30 de prova.',
  gatilhos: ['inicio_sessao', 'ansiedade', 'pedido_ajuda'],
  algoritmo: [
    'Rotina matinal: respiração, café da manhã carb+proteína, conferir documentos',
    'Durante prova: folhear antes, começar pelas fáceis, lanche às 15h, alongar',
    'Protocolo de crise: parar, respirar, lembrar que se preparou, pular e voltar depois',
    'Gestão de energia: água 1h/1h, não pensar no tempo constantemente'
  ],
  acoesRetorno: ['mostrar_mensagem', 'ativar_respiracao'],
  fonte: 'Inteligência Emocional + Gestão de Performance',
  prioridade: 10,
  areasAlvo: ['all'],
  tags: ['dia da prova', 'ENEM', 'performance', 'protocolo']
};

// ============================================================
// EXPORT ARRAY COMPLETO
// ============================================================

export const ENGINE_MODULES: EngineModule[] = [
  // Blocos 1-5: Produtividade e High Performance
  M01, M02, M03, M04, M05,
  // Blocos 6-7: Linguagens
  M06, M07,
  // Blocos 8-9, 19, 29, 37-38: Emocional
  M08, M09, M19, M29, M37, M38,
  // Blocos 10, 20, 30, 39-40: Organização
  M10, M20, M30, M39, M40,
  // Blocos 11-15, 21-22, 25-26, 31-33: Memória
  M11, M12, M13, M14, M15, M21, M22, M25, M26, M31, M32, M33,
  // Blocos 16-18, 23-24, 27-28, 34-36: Estratégia
  M16, M17, M18, M23, M24, M27, M28, M34, M35, M36,
  // Bloco 6: Avançados (51-60)
  M51, M52, M53, M54, M55, M56, M57, M58, M59, M60,
  // Bloco 7: Redação, Exatas, Prova (61-70)
  M61, M62, M63, M64, M65, M66, M67, M68, M69, M70,
];

/**
 * Buscar módulo por ID
 */
export function getModuleById(id: string): EngineModule | undefined {
  return ENGINE_MODULES.find(m => m.id === id);
}

/**
 * Buscar módulos por tipo
 */
export function getModulesByType(tipo: ModuleType): EngineModule[] {
  return ENGINE_MODULES.filter(m => m.tipo === tipo);
}

/**
 * Buscar módulos por gatilho
 */
export function getModulesByTrigger(gatilho: string): EngineModule[] {
  return ENGINE_MODULES.filter(m => m.gatilhos.includes(gatilho));
}

/**
 * Buscar módulos por área alvo
 */
export function getModulesByArea(area: string): EngineModule[] {
  return ENGINE_MODULES.filter(m =>
    m.areasAlvo.includes('all') || m.areasAlvo.includes(area)
  );
}
