// app/api/reexplicar/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.ENEMIA_BACKEND_URL || "http://127.0.0.1:8000";
const TIMEOUT_MS = 30000; // 30 segundos

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Validação básica do payload
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Payload inválido." },
        { status: 400 }
      );
    }

    // Validação específica para /reexplicar
    if (!payload.questao_id) {
      return NextResponse.json(
        { error: "É necessário informar 'questao_id' para reexplicar." },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const resp = await fetch(`${BACKEND_URL}/reexplicar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      console.error("Erro do backend /reexplicar:", data);
      return NextResponse.json(
        {
          ok: false,
          error: data?.detail || "Erro ao chamar backend /reexplicar",
        },
        { status: resp.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Erro interno em /api/reexplicar:", err);

    // Tratamento de timeout
    if (err.name === "AbortError") {
      return NextResponse.json(
        { error: "Timeout: A requisição demorou muito para responder." },
        { status: 504 }
      );
    }

    // Tratamento de erro de parsing JSON
    if (err.name === "SyntaxError") {
      return NextResponse.json(
        { error: "Erro ao processar resposta do servidor." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Erro interno em /api/reexplicar",
        detail: process.env.NODE_ENV === "development" ? err?.message : undefined,
      },
      { status: 500 }
    );
  }
}
