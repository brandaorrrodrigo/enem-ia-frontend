import "./globals.css";
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3328',
};

export const metadata: Metadata = {
  title: "ENEM Pro - Sistema Completo de Preparação",
  description: "Plataforma de estudos gamificada para o ENEM com simulados inteligentes, explicações via IA e plano de estudos personalizado.",
  keywords: ["ENEM", "simulado", "inteligência artificial", "estudos", "vestibular", "questões ENEM", "gamificação"],
  authors: [{ name: "ENEM Pro" }],
  creator: "ENEM Pro",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "ENEM Pro - Sistema Completo de Preparação",
    description: "Plataforma de estudos gamificada para o ENEM com simulados inteligentes e IA.",
    siteName: "ENEM Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "ENEM Pro - Sistema Completo de Preparação",
    description: "Plataforma de estudos gamificada para o ENEM com simulados inteligentes e IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://enem-pro.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {/* Vinheta escura nas bordas */}
          <div className="vignette"></div>

          {/* Conteudo principal */}
          <div className="min-h-screen relative">
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
