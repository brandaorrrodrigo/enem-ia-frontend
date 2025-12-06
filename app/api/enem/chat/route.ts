// app/api/enem/chat/route.ts
// Rota de chat de estudos ENEM PRO com system prompts integrados

import { NextRequest, NextResponse } from "next/server";
import { getEnemSystemMessages } from "@/lib/ai/prompts";

// System prompts ENEM-PRO (conteudo, memoria, gamificacao)
// Os prompts sao carregados dinamicamente de /prompts/*.txt

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  userId?: string;
  sessionId?: string;
  stream?: boolean;
  area?: string; // matematica, linguagens, humanas, natureza, redacao
}

// URL do backend de IA (Ollama, OpenAI, etc.)
const AI_BACKEND_URL = process.env.AI_BACKEND_URL || process.env.OLLAMA_URL || "http://127.0.0.1:11434";
const AI_MODEL = process.env.AI_MODEL || "llama3.2";

/**
 * Monta o contexto adicional baseado na area de estudo
 */
function getAreaContext(area?: string): string {
  if (!area) return "";

  const contexts: Record<string, string> = {
    matematica: "O aluno esta estudando Matematica. Foque em explicacoes com passos claros, formulas e exemplos numericos.",
    linguagens: "O aluno esta estudando Linguagens. Foque em interpretacao de texto, gramatica contextualizada e literatura.",
    humanas: "O aluno esta estudando Ciencias Humanas. Foque em contexto historico, relacoes causa-efeito e comparacoes.",
    natureza: "O aluno esta estudando Ciencias da Natureza. Foque em conceitos, formulas e aplicacoes praticas.",
    redacao: "O aluno esta treinando Redacao. Foque em estrutura, tese, argumentacao e proposta de intervencao.",
  };

  return contexts[area] || "";
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, history = [], stream = false, area } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { ok: false, error: "Mensagem e obrigatoria" },
        { status: 400 }
      );
    }

    // Carrega os system prompts do ENEM PRO
    const systemMessages = await getEnemSystemMessages();

    // Adiciona contexto da area se especificado
    const areaContext = getAreaContext(area);
    if (areaContext) {
      systemMessages.push({ role: "system", content: areaContext });
    }

    // Monta o array de mensagens para o modelo
    // Ordem: system prompts → historico do usuario → mensagem atual
    const messages: ChatMessage[] = [
      ...systemMessages,
      ...history.filter((m) => m.role !== "system"),
      { role: "user", content: message },
    ];

    // Modo streaming: retorna resposta em tempo real
    if (stream) {
      const response = await fetch(`${AI_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: AI_MODEL,
          messages,
          stream: true,
          options: { temperature: 0.7, top_p: 0.9 },
        }),
      });

      if (!response.ok || !response.body) {
        return NextResponse.json(
          { ok: false, error: "Erro ao iniciar streaming" },
          { status: response.status }
        );
      }

      // Retorna stream diretamente
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Modo normal: aguarda resposta completa
    const response = await fetch(`${AI_BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        stream: false,
        options: { temperature: 0.7, top_p: 0.9 },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do backend de IA:", errorText);
      return NextResponse.json(
        { ok: false, error: "Erro ao processar mensagem com IA", detail: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.message?.content || data.response || data.choices?.[0]?.message?.content || "";

    return NextResponse.json(
      {
        ok: true,
        response: assistantMessage,
        model: AI_MODEL,
        area: area || null,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro interno em /api/enem/chat:", errorMessage);
    return NextResponse.json(
      { ok: false, error: "Erro interno no chat", detail: errorMessage },
      { status: 500 }
    );
  }
}
