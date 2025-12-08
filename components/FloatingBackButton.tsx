'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function FloatingBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-6 left-6 z-[9990] flex items-center justify-center w-14 h-14 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-amber-400/50"
      aria-label="Voltar"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}
