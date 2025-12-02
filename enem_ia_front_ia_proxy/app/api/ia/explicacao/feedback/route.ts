import { NextResponse } from "next/server";
const BASE = process.env.BACKEND_IA_URL || "http://localhost:8001";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${BASE}/ia/explicacao/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    try { const json = JSON.parse(text); return NextResponse.json(json, { status: res.status }); }
    catch { return NextResponse.json({ error: text || "Erro no backend IA" }, { status: res.status }); }
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Falha interna" }, { status: 500 }); }
}
