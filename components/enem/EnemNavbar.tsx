// components/enem/EnemNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/enem", label: "Home" },
  { href: "/enem/simulado", label: "Simulado" },
  { href: "/enem/dashboard", label: "Dashboard" },
  { href: "/enem/loja", label: "Loja" },
  { href: "/enem/desafios", label: "Desafios" },
  { href: "/planos", label: "Planos" },
];

export function EnemNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-center bg-gradient-to-r from-emerald-950/95 via-emerald-900/95 to-emerald-950/95 border-b border-emerald-500/40 shadow-[0_0_25px_rgba(0,0,0,0.7)]">
      <div className="w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="text-sm sm:text-base font-semibold text-emerald-100 drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
          ENEM-IA <span className="text-xs sm:text-sm">📘</span>
        </div>

        <div className="flex gap-3 sm:gap-5 text-xs sm:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "transition-colors duration-150",
                "text-emerald-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.9)]",
                "hover:text-white hover:underline underline-offset-4",
                pathname === link.href &&
                  "text-white font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}