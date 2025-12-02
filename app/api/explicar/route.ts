// app/api/explicar/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.ENEMIA_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await fetch(`${BACKEND_URL}/explicar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      console.error("Erro do backend /explicar:", data);
      return NextResponse.json(
        {
          ok: false,
          error: data?.detail || "Erro ao chamar backend /explicar",
        },
        { status: resp.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Erro interno em /api/explicar:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Erro interno em /api/explicar",
        detail: err?.message,
      },
      { status: 500 }
    );
  }
}
