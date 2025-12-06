// ========================================
// SISTEMA DE CACHE E OTIMIZAÇÃO
// ========================================

import { Questao, Area, Dificuldade } from './schema';

// ========================================
// TIPOS
// ========================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
}

interface CacheStats {
  totalEntries: number;
  hits: number;
  misses: number;
  hitRate: number;
  memoryUsage: number;
}

// ========================================
// CLASSE DE CACHE EM MEMÓRIA
// ========================================

class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private hits = 0;
  private misses = 0;
  private maxEntries: number;
  private defaultTTL: number;

  constructor(maxEntries: number = 500, defaultTTL: number = 5 * 60 * 1000) {
    this.maxEntries = maxEntries;
    this.defaultTTL = defaultTTL;
  }

  /**
   * Obtém valor do cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.misses++;
      return null;
    }

    // Verificar TTL
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    entry.hits++;
    this.hits++;
    return entry.data;
  }

  /**
   * Armazena valor no cache
   */
  set(key: string, value: T, ttl?: number): void {
    // Limpar entradas antigas se exceder limite
    if (this.cache.size >= this.maxEntries) {
      this.evictOldest();
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      hits: 0,
    });
  }

  /**
   * Remove entrada do cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Verifica se chave existe
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  /**
   * Retorna estatísticas do cache
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      totalEntries: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0,
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  /**
   * Remove entradas mais antigas (LRU simplificado)
   */
  private evictOldest(): void {
    let oldest: { key: string; timestamp: number } | null = null;

    for (const [key, entry] of this.cache) {
      if (!oldest || entry.timestamp < oldest.timestamp) {
        oldest = { key, timestamp: entry.timestamp };
      }
    }

    if (oldest) {
      this.cache.delete(oldest.key);
    }
  }

  /**
   * Estima uso de memória
   */
  private estimateMemoryUsage(): number {
    let size = 0;
    for (const [key, entry] of this.cache) {
      size += key.length * 2;
      size += JSON.stringify(entry.data).length * 2;
    }
    return size;
  }
}

// ========================================
// INSTÂNCIAS DE CACHE
// ========================================

/** Cache de questões individuais */
export const cacheQuestoes = new MemoryCache<Questao>(500, 10 * 60 * 1000);

/** Cache de listas de questões */
export const cacheListas = new MemoryCache<Questao[]>(100, 5 * 60 * 1000);

/** Cache de resultados de filtros */
export const cacheFiltros = new MemoryCache<string[]>(200, 2 * 60 * 1000);

/** Cache de estatísticas */
export const cacheStats = new MemoryCache<Record<string, unknown>>(50, 1 * 60 * 1000);

// ========================================
// FUNÇÕES AUXILIARES DE CACHE
// ========================================

/**
 * Gera chave de cache para filtro
 */
export function gerarChaveFiltro(filtro: Record<string, unknown>): string {
  return `filter_${JSON.stringify(filtro)}`;
}

/**
 * Gera chave de cache para questão
 */
export function gerarChaveQuestao(id: string): string {
  return `questao_${id}`;
}

/**
 * Gera chave de cache para simulado
 */
export function gerarChaveSimulado(tipo: string, area?: string, quantidade?: number): string {
  return `simulado_${tipo}_${area || 'all'}_${quantidade || 'all'}`;
}

/**
 * Wrapper para função com cache
 */
export function withCache<T>(
  cache: MemoryCache<T>,
  key: string,
  fn: () => T,
  ttl?: number
): T {
  const cached = cache.get(key);
  if (cached !== null) {
    return cached;
  }

  const result = fn();
  cache.set(key, result, ttl);
  return result;
}

/**
 * Wrapper async para função com cache
 */
export async function withCacheAsync<T>(
  cache: MemoryCache<T>,
  key: string,
  fn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = cache.get(key);
  if (cached !== null) {
    return cached;
  }

  const result = await fn();
  cache.set(key, result, ttl);
  return result;
}

// ========================================
// CACHE NO LOCALSTORAGE
// ========================================

interface LocalStorageCache<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * Salva no localStorage com TTL
 */
export function saveToLocalStorage<T>(
  key: string,
  data: T,
  ttl: number = 24 * 60 * 60 * 1000
): void {
  if (typeof window === 'undefined') return;

  const entry: LocalStorageCache<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (e) {
    console.warn('[Cache] Erro ao salvar no localStorage:', e);
    limparCacheAntigo();
  }
}

/**
 * Carrega do localStorage
 */
export function loadFromLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const entry: LocalStorageCache<T> = JSON.parse(stored);

    // Verificar TTL
    if (Date.now() > entry.timestamp + entry.ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch (e) {
    console.warn('[Cache] Erro ao carregar do localStorage:', e);
    return null;
  }
}

/**
 * Remove do localStorage
 */
export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

/**
 * Limpa cache antigo do localStorage
 */
export function limparCacheAntigo(): void {
  if (typeof window === 'undefined') return;

  const prefixosCache = ['cache_', 'questao_', 'simulado_', 'filtro_', 'enem_pro_'];

  Object.keys(localStorage).forEach((key) => {
    if (prefixosCache.some((p) => key.startsWith(p))) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const entry = JSON.parse(stored);
          if (entry.timestamp && Date.now() > entry.timestamp + (entry.ttl || 0)) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  });
}

// ========================================
// INDEXAÇÃO E BUSCA OTIMIZADA
// ========================================

class IndiceTexto {
  private indice = new Map<string, Set<string>>();
  private stopWords = new Set([
    'a', 'o', 'e', 'de', 'da', 'do', 'em', 'um', 'uma', 'para',
    'com', 'que', 'os', 'as', 'no', 'na', 'se', 'por', 'mais',
  ]);

  /**
   * Adiciona documento ao índice
   */
  indexar(id: string, texto: string): void {
    const termos = this.tokenizar(texto);

    termos.forEach((termo) => {
      if (!this.indice.has(termo)) {
        this.indice.set(termo, new Set());
      }
      this.indice.get(termo)!.add(id);
    });
  }

  /**
   * Busca documentos por termos
   */
  buscar(query: string): string[] {
    const termos = this.tokenizar(query);
    if (termos.length === 0) return [];

    let resultados: Set<string> | null = null;

    termos.forEach((termo) => {
      const ids = this.indice.get(termo);
      if (!ids) {
        resultados = new Set();
        return;
      }

      if (resultados === null) {
        resultados = new Set(ids);
      } else {
        resultados = new Set([...resultados].filter((id) => ids.has(id)));
      }
    });

    return resultados ? Array.from(resultados) : [];
  }

  /**
   * Tokeniza texto
   */
  private tokenizar(texto: string): string[] {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/\W+/)
      .filter((t) => t.length > 2 && !this.stopWords.has(t));
  }

  /**
   * Limpa índice
   */
  clear(): void {
    this.indice.clear();
  }

  /**
   * Retorna tamanho do índice
   */
  size(): number {
    return this.indice.size;
  }
}

/** Índice global de questões */
export const indiceQuestoes = new IndiceTexto();

// ========================================
// PREFETCHING
// ========================================

const prefetchQueue: string[] = [];
let isPrefetching = false;

/**
 * Adiciona IDs para prefetch
 */
export function adicionarPrefetch(ids: string[]): void {
  ids.forEach((id) => {
    if (!prefetchQueue.includes(id)) {
      prefetchQueue.push(id);
    }
  });

  if (!isPrefetching) {
    executarPrefetch();
  }
}

/**
 * Executa prefetch em background
 */
async function executarPrefetch(): Promise<void> {
  if (prefetchQueue.length === 0) {
    isPrefetching = false;
    return;
  }

  isPrefetching = true;

  // Processar em lotes de 10
  const lote = prefetchQueue.splice(0, 10);

  // Simular carregamento
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Continuar com próximo lote
  setTimeout(executarPrefetch, 500);
}

// ========================================
// ESTATÍSTICAS E MONITORAMENTO
// ========================================

/**
 * Retorna estatísticas de todos os caches
 */
export function getTodasEstatisticasCache(): {
  questoes: CacheStats;
  listas: CacheStats;
  filtros: CacheStats;
  stats: CacheStats;
  indice: { termos: number };
} {
  return {
    questoes: cacheQuestoes.getStats(),
    listas: cacheListas.getStats(),
    filtros: cacheFiltros.getStats(),
    stats: cacheStats.getStats(),
    indice: { termos: indiceQuestoes.size() },
  };
}

/**
 * Limpa todos os caches
 */
export function limparTodosOsCaches(): void {
  cacheQuestoes.clear();
  cacheListas.clear();
  cacheFiltros.clear();
  cacheStats.clear();
  indiceQuestoes.clear();
  limparCacheAntigo();
}
