import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ENEM IA - Plataforma de Preparação para o ENEM',
  description: 'Prepare-se para o ENEM com inteligência artificial. Questões, simulados, redações e muito mais!',
  keywords: 'ENEM, vestibular, questões, simulados, redação, educação',
  authors: [{ name: 'ENEM IA Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  openGraph: {
    title: 'ENEM IA - Preparação Inteligente',
    description: 'Sua plataforma completa de estudos para o ENEM',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
