// lib/ai/prompts.ts
// Utilitario para carregar prompts de sistema do ENEM PRO

import * as fs from "fs/promises";
import * as path from "path";

// Cache de prompts em memoria (evita leitura de disco a cada requisicao)
const promptCache: Map<string, string> = new Map();
let systemMessagesCache: Array<{ role: "system"; content: string }> | null = null;

/**
 * Carrega um arquivo de prompt pelo nome (sem extensão .txt)
 * Usa cache em memoria para evitar leituras repetidas de disco
 * @param name Nome do prompt (ex: "NFC_ENEM_MEMORY_CORE_V1")
 * @returns Conteúdo do arquivo de prompt
 */
export async function loadPrompt(name: string): Promise<string> {
  // Verifica cache primeiro
  if (promptCache.has(name)) {
    return promptCache.get(name)!;
  }

  const promptPath = path.resolve(process.cwd(), "prompts", `${name}.txt`);
  const content = await fs.readFile(promptPath, "utf-8");

  // Armazena em cache
  promptCache.set(name, content);
  return content;
}

/**
 * Limpa o cache de prompts (util para desenvolvimento/hot reload)
 */
export function clearPromptCache(): void {
  promptCache.clear();
  systemMessagesCache = null;
}

/**
 * Carrega todos os prompts de sistema do ENEM PRO na ordem correta
 * Ordem: GLOBAL (se existir) → MASTER (se existir) → MEMORY (obrigatório)
 * Resultado e cacheado para performance
 * @returns Array de mensagens de sistema para o modelo
 */
export async function getEnemSystemMessages(): Promise<
  Array<{ role: "system"; content: string }>
> {
  // Retorna cache se disponivel
  if (systemMessagesCache) {
    return systemMessagesCache;
  }

  const messages: Array<{ role: "system"; content: string }> = [];

  // 1. GLOBAL_SYSTEM_CORE (opcional)
  try {
    const globalPrompt = await loadPrompt("GLOBAL_SYSTEM_CORE");
    if (globalPrompt) {
      messages.push({ role: "system", content: globalPrompt });
    }
  } catch {
    // Arquivo não existe, ignorar
  }

  // 2. NFC_ENEM_MASTER_CORE_V1 (opcional)
  try {
    const masterPrompt = await loadPrompt("NFC_ENEM_MASTER_CORE_V1");
    if (masterPrompt) {
      messages.push({ role: "system", content: masterPrompt });
    }
  } catch {
    // Arquivo não existe, ignorar
  }

  // 3. NFC_ENEM_MEMORY_CORE_V1 (OBRIGATÓRIO)
  const memoryPrompt = await loadPrompt("NFC_ENEM_MEMORY_CORE_V1");
  messages.push({ role: "system", content: memoryPrompt });

  // Armazena em cache
  systemMessagesCache = messages;

  return messages;
}

/**
 * Lista todos os prompts disponiveis na pasta /prompts
 * Util para debug e administracao
 */
export async function listAvailablePrompts(): Promise<string[]> {
  const promptsDir = path.resolve(process.cwd(), "prompts");
  try {
    const files = await fs.readdir(promptsDir);
    return files
      .filter((f) => f.endsWith(".txt"))
      .map((f) => f.replace(".txt", ""));
  } catch {
    return [];
  }
}

/**
 * Verifica se um prompt especifico existe
 */
export async function promptExists(name: string): Promise<boolean> {
  const promptPath = path.resolve(process.cwd(), "prompts", `${name}.txt`);
  try {
    await fs.access(promptPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Retorna estatisticas dos prompts carregados
 */
export async function getPromptStats(): Promise<{
  totalPrompts: number;
  loadedPrompts: string[];
  totalCharacters: number;
  cacheStatus: "cold" | "warm";
}> {
  const available = await listAvailablePrompts();
  const loaded = Array.from(promptCache.keys());
  let totalChars = 0;

  for (const content of promptCache.values()) {
    totalChars += content.length;
  }

  return {
    totalPrompts: available.length,
    loadedPrompts: loaded,
    totalCharacters: totalChars,
    cacheStatus: systemMessagesCache ? "warm" : "cold",
  };
}
