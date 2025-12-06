// ========================================
// VALIDADOR DE LINKS - ENEM PRO
// ========================================

export interface LinkInfo {
  path: string;
  label: string;
  icon?: string;
  active: boolean;
  section: string;
}

export interface ValidationResult {
  valid: LinkInfo[];
  invalid: LinkInfo[];
  total: number;
}

// Todas as rotas válidas do sistema
export const VALID_ROUTES: Record<string, LinkInfo> = {
  // Dashboard Principal
  '/enem': {
    path: '/enem',
    label: 'Dashboard',
    icon: 'home',
    active: true,
    section: 'principal'
  },
  '/enem/dashboard': {
    path: '/enem/dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard',
    active: true,
    section: 'principal'
  },

  // Estudos
  '/enem/simulado': {
    path: '/enem/simulado',
    label: 'Simulado',
    icon: 'file-text',
    active: true,
    section: 'estudos'
  },
  '/enem/simulados-hub': {
    path: '/enem/simulados-hub',
    label: 'Hub de Simulados',
    icon: 'folder',
    active: true,
    section: 'estudos'
  },
  '/enem/questoes-comentadas': {
    path: '/enem/questoes-comentadas',
    label: 'Questões Comentadas',
    icon: 'message-square',
    active: true,
    section: 'estudos'
  },
  '/enem/gerador-questoes': {
    path: '/enem/gerador-questoes',
    label: 'Gerador de Questões',
    icon: 'plus-circle',
    active: true,
    section: 'estudos'
  },
  '/enem/biblioteca': {
    path: '/enem/biblioteca',
    label: 'Biblioteca',
    icon: 'book-open',
    active: true,
    section: 'estudos'
  },
  '/enem/flashcards': {
    path: '/enem/flashcards',
    label: 'Flashcards',
    icon: 'layers',
    active: true,
    section: 'estudos'
  },
  '/enem/videoaulas': {
    path: '/enem/videoaulas',
    label: 'Videoaulas',
    icon: 'video',
    active: true,
    section: 'estudos'
  },

  // Ferramentas
  '/enem/cronograma': {
    path: '/enem/cronograma',
    label: 'Cronograma',
    icon: 'calendar',
    active: true,
    section: 'ferramentas'
  },
  '/enem/plano-estudos': {
    path: '/enem/plano-estudos',
    label: 'Plano de Estudos',
    icon: 'clipboard',
    active: true,
    section: 'ferramentas'
  },
  '/enem/pomodoro': {
    path: '/enem/pomodoro',
    label: 'Pomodoro',
    icon: 'clock',
    active: true,
    section: 'ferramentas'
  },
  '/enem/gestao-tempo': {
    path: '/enem/gestao-tempo',
    label: 'Gestão de Tempo',
    icon: 'timer',
    active: true,
    section: 'ferramentas'
  },
  '/enem/organizacao': {
    path: '/enem/organizacao',
    label: 'Organização',
    icon: 'folder-open',
    active: true,
    section: 'ferramentas'
  },
  '/enem/tecnicas': {
    path: '/enem/tecnicas',
    label: 'Técnicas de Estudo',
    icon: 'lightbulb',
    active: true,
    section: 'ferramentas'
  },
  '/enem/ferramentas': {
    path: '/enem/ferramentas',
    label: 'Todas Ferramentas',
    icon: 'wrench',
    active: true,
    section: 'ferramentas'
  },

  // Redação
  '/enem/analisador-redacao': {
    path: '/enem/analisador-redacao',
    label: 'Analisador de Redação',
    icon: 'edit',
    active: true,
    section: 'redacao'
  },

  // Gamificação
  '/enem/desafios': {
    path: '/enem/desafios',
    label: 'Desafios',
    icon: 'target',
    active: true,
    section: 'gamificacao'
  },
  '/enem/ranking': {
    path: '/enem/ranking',
    label: 'Ranking',
    icon: 'trophy',
    active: true,
    section: 'gamificacao'
  },
  '/enem/conquistas': {
    path: '/enem/conquistas',
    label: 'Conquistas',
    icon: 'award',
    active: true,
    section: 'gamificacao'
  },
  '/enem/quiz-diario': {
    path: '/enem/quiz-diario',
    label: 'Quiz Diário',
    icon: 'zap',
    active: true,
    section: 'gamificacao'
  },
  '/enem/arena': {
    path: '/enem/arena',
    label: 'Arena',
    icon: 'swords',
    active: true,
    section: 'gamificacao'
  },
  '/enem/batalha': {
    path: '/enem/batalha',
    label: 'Batalha',
    icon: 'shield',
    active: true,
    section: 'gamificacao'
  },
  '/enem/loja': {
    path: '/enem/loja',
    label: 'Loja',
    icon: 'shopping-cart',
    active: true,
    section: 'gamificacao'
  },

  // Social
  '/enem/perfil': {
    path: '/enem/perfil',
    label: 'Perfil',
    icon: 'user',
    active: true,
    section: 'social'
  },
  '/enem/amigos': {
    path: '/enem/amigos',
    label: 'Amigos',
    icon: 'users',
    active: true,
    section: 'social'
  },
  '/enem/feed': {
    path: '/enem/feed',
    label: 'Feed',
    icon: 'rss',
    active: true,
    section: 'social'
  },

  // Estatísticas
  '/enem/estatisticas': {
    path: '/enem/estatisticas',
    label: 'Estatísticas',
    icon: 'bar-chart',
    active: true,
    section: 'estatisticas'
  },

  // IA
  '/enem/chatbot': {
    path: '/enem/chatbot',
    label: 'Chatbot IA',
    icon: 'bot',
    active: true,
    section: 'ia'
  },

  // Outros
  '/enem/calendario': {
    path: '/enem/calendario',
    label: 'Calendário',
    icon: 'calendar-days',
    active: true,
    section: 'outros'
  },
  '/enem/materiais': {
    path: '/enem/materiais',
    label: 'Materiais',
    icon: 'file',
    active: true,
    section: 'outros'
  },
};

// Links do menu principal
export const MAIN_MENU_LINKS: LinkInfo[] = [
  VALID_ROUTES['/enem'],
  VALID_ROUTES['/enem/simulado'],
  VALID_ROUTES['/enem/questoes-comentadas'],
  VALID_ROUTES['/enem/desafios'],
  VALID_ROUTES['/enem/ranking'],
  VALID_ROUTES['/enem/cronograma'],
  VALID_ROUTES['/enem/biblioteca'],
  VALID_ROUTES['/enem/perfil'],
];

// Links do FloatingNav
export const FLOATING_NAV_LINKS: LinkInfo[] = [
  VALID_ROUTES['/enem'],
  VALID_ROUTES['/enem/simulado'],
  VALID_ROUTES['/enem/desafios'],
  VALID_ROUTES['/enem/ranking'],
  VALID_ROUTES['/enem/perfil'],
];

// Links do FloatingButton (menu radial)
export const FLOATING_BUTTON_LINKS: LinkInfo[] = [
  { path: '/enem/simulado', label: 'Novo Simulado', icon: 'play', active: true, section: 'quick' },
  { path: '/enem/quiz-diario', label: 'Quiz Diário', icon: 'zap', active: true, section: 'quick' },
  { path: '/enem/flashcards', label: 'Flashcards', icon: 'layers', active: true, section: 'quick' },
  { path: '/enem/pomodoro', label: 'Pomodoro', icon: 'clock', active: true, section: 'quick' },
  { path: '/enem/chatbot', label: 'IA Helper', icon: 'bot', active: true, section: 'quick' },
];

// Seções para navegação
export const SECTIONS = {
  principal: {
    label: 'Principal',
    links: ['/enem', '/enem/dashboard']
  },
  estudos: {
    label: 'Estudos',
    links: ['/enem/simulado', '/enem/simulados-hub', '/enem/questoes-comentadas', '/enem/gerador-questoes', '/enem/biblioteca', '/enem/flashcards', '/enem/videoaulas']
  },
  ferramentas: {
    label: 'Ferramentas',
    links: ['/enem/cronograma', '/enem/plano-estudos', '/enem/pomodoro', '/enem/gestao-tempo', '/enem/organizacao', '/enem/tecnicas']
  },
  gamificacao: {
    label: 'Gamificação',
    links: ['/enem/desafios', '/enem/ranking', '/enem/conquistas', '/enem/quiz-diario', '/enem/arena', '/enem/batalha', '/enem/loja']
  },
  social: {
    label: 'Social',
    links: ['/enem/perfil', '/enem/amigos', '/enem/feed']
  }
};

/**
 * Valida se um link é válido
 */
export function isValidLink(path: string): boolean {
  // Remover query params e hash
  const cleanPath = path.split('?')[0].split('#')[0];

  // Verificar rota exata
  if (VALID_ROUTES[cleanPath]) {
    return VALID_ROUTES[cleanPath].active;
  }

  // Verificar rotas dinâmicas
  if (cleanPath.startsWith('/enem/simulado/')) return true;
  if (cleanPath.startsWith('/enem/resultado/')) return true;

  return false;
}

/**
 * Retorna informações de um link
 */
export function getLinkInfo(path: string): LinkInfo | null {
  const cleanPath = path.split('?')[0].split('#')[0];
  return VALID_ROUTES[cleanPath] || null;
}

/**
 * Valida todos os links de um array
 */
export function validateLinks(links: string[]): ValidationResult {
  const valid: LinkInfo[] = [];
  const invalid: LinkInfo[] = [];

  links.forEach(path => {
    const info = getLinkInfo(path);
    if (info && info.active) {
      valid.push(info);
    } else {
      invalid.push({
        path,
        label: 'Desconhecido',
        active: false,
        section: 'unknown'
      });
    }
  });

  return { valid, invalid, total: links.length };
}

/**
 * Retorna links por seção
 */
export function getLinksBySection(section: keyof typeof SECTIONS): LinkInfo[] {
  const sectionData = SECTIONS[section];
  if (!sectionData) return [];

  return sectionData.links
    .map(path => VALID_ROUTES[path])
    .filter((link): link is LinkInfo => !!link && link.active);
}

/**
 * Retorna todos os links ativos
 */
export function getAllActiveLinks(): LinkInfo[] {
  return Object.values(VALID_ROUTES).filter(link => link.active);
}

/**
 * Gera breadcrumb para uma rota
 */
export function getBreadcrumb(path: string): LinkInfo[] {
  const parts = path.split('/').filter(Boolean);
  const breadcrumb: LinkInfo[] = [];

  let currentPath = '';
  parts.forEach(part => {
    currentPath += '/' + part;
    const info = VALID_ROUTES[currentPath];
    if (info) {
      breadcrumb.push(info);
    }
  });

  return breadcrumb;
}
