'use client';

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition"
    >
      ↑ Topo
    </button>
  );
}
