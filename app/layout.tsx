import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kalam } from "next/font/google";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import ChalkBoard from "@/components/ChalkBoard";

const inter = Inter({ subsets: ["latin"] });
const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-kalam'
});

export const metadata: Metadata = {
  title: "ENEM-IA | Estude com Inteligência Artificial",
  description: "Simulados inteligentes, explicações via IA, plano de estudos e dashboard completo para ENEM."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} ${kalam.variable}`}>
        {/* Camada de rabiscos de giz */}
        <ChalkBoard />

        {/* Wrapper principal */}
        <div className="min-h-screen relative z-10">
          {/* Navbar */}
          <nav className="w-full py-4 px-6 bg-black/30 backdrop-blur-sm border-b border-white/20 flex justify-between items-center relative z-20">
            <Link href="/" className="font-bold text-xl tracking-wide">
              ENEM<span className="text-yellow-300">-IA</span>
            </Link>

            <div className="flex gap-6">
              <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
              <Link href="/enem/simulado" className="hover:text-yellow-300 transition">Simulado</Link>
              <Link href="/enem/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
              <Link href="/enem/loja" className="hover:text-yellow-300 transition">Loja</Link>
              <Link href="/enem/desafios" className="hover:text-yellow-300 transition">Desafios</Link>
            </div>
          </nav>

          {/* Conteúdo principal */}
          <main className="p-6 relative z-10">
            {children}
          </main>

          {/* Botão flutuante — voltar ao topo */}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
