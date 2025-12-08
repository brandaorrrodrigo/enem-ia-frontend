const fs = require('fs');

const content = `'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'diario' | 'semanal' | 'mensal' | 'especial';
  meta: number;
  progresso: number;
  recompensaFP: number;
  icone: string;
  cor: string;
}

const DESAFIOS_BASE: Desafio[] = [
  { id: 'd1', titulo: 'Maratonista de Questões', descricao: 'Responda 20 questões hoje', tipo: 'diario', meta: 20, progresso: 0, recompensaFP: 50, icone: '🎯', cor: 'from-blue-500 to-cyan-500' },
  { id: 'd2', titulo: 'Simulado Express', descricao: 'Complete 1 simulado rápido', tipo: 'diario', meta: 1, progresso: 0, recompensaFP: 30, icone: '⚡', cor: 'from-yellow-500 to-orange-500' },
  { id: 'd3', titulo: 'Revisor Dedicado', descricao: 'Estude 3 flashcards', tipo: 'diario', meta: 3, progresso: 0, recompensaFP: 20, icone: '🃏', cor: 'from-purple-500 to-pink-500' },
  { id: 'd4', titulo: 'Acertador', descricao: 'Acerte 10 questões seguidas', tipo: 'diario', meta: 10, progresso: 0, recompensaFP: 75, icone: '🔥', cor: 'from-red-500 to-orange-500' },
  { id: 's1', titulo: 'Dominador de Matemática', descricao: 'Acerte 50 questões de matemática', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 200, icone: '📐', cor: 'from-emerald-500 to-green-500' },
  { id: 's2', titulo: 'Mestre das Linguagens', descricao: 'Acerte 50 questões de linguagens', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 200, icone: '📚', cor: 'from-blue-500 to-indigo-500' },
  { id: 's3', titulo: 'Cientista Humano', descricao: 'Acerte 50 questões de humanas', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 200, icone: '🌍', cor: 'from-orange-500 to-red-500' },
  { id: 's4', titulo: 'Expert da Natureza', descricao: 'Acerte 50 questões de natureza', tipo: 'semanal', meta: 50, progresso: 0, recompensaFP: 200, icone: '🔬', cor: 'from-green-500 to-teal-500' },
  { id: 's5', titulo: 'Simulador Dedicado', descricao: 'Complete 5 simulados na semana', tipo: 'semanal', meta: 5, progresso: 0, recompensaFP: 300, icone: '🏆', cor: 'from-yellow-500 to-amber-500' },
  { id: 'm1', titulo: 'Campeão do Mês', descricao: 'Acumule 1000 FP no mês', tipo: 'mensal', meta: 1000, progresso: 0, recompensaFP: 500, icone: '👑', cor: 'from-amber-500 to-yellow-500' },
  { id: 'm2', titulo: 'Maratonista ENEM', descricao: 'Complete 20 simulados no mês', tipo: 'mensal', meta: 20, progresso: 0, recompensaFP: 750, icone: '🎖️', cor: 'from-purple-500 to-violet-500' },
  { id: 'm3', titulo: 'Estudante Consistente', descricao: 'Estude 20 dias no mês', tipo: 'mensal', meta: 20, progresso: 0, recompensaFP: 400, icone: '📅', cor: 'from-cyan-500 to-blue-500' },
  { id: 'e1', titulo: 'Primeiro Passo', descricao: 'Complete seu primeiro simulado', tipo: 'especial', meta: 1, progresso: 0, recompensaFP: 100, icone: '🚀', cor: 'from-pink-500 to-rose-500' },
  { id: 'e2', titulo: 'Nota 1000', descricao: 'Tire nota máxima em um simulado', tipo: 'especial', meta: 1, progresso: 0, recompensaFP: 500, icone: '💯', cor: 'from-emerald-500 to-green-500' },
  { id: 'e3', titulo: 'Streak Master', descricao: 'Mantenha streak de 7 dias', tipo: 'especial', meta: 7, progresso: 0, recompensaFP: 350, icone: '🔥', cor: 'from-orange-500 to-red-500' },
];

export default function DesafiosPage() {
  const router = useRouter();
  const [desafios, setDesafios] = useState<Desafio[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [fpTotal, setFpTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDesafios();
  }, []);

  const carregarDesafios = () => {
    const progressoSalvo = JSON.parse(localStorage.getItem('desafios_progresso') || '{}');
    const historicoSimulados = JSON.parse(localStorage.getItem('historico_simulados') || '[]');
    const fpAtual = parseInt(localStorage.getItem('fp_total') || '0');
    setFpTotal(fpAtual);

    const desafiosAtualizados = DESAFIOS_BASE.map(desafio => {
      let progresso = progressoSalvo[desafio.id] || 0;
      if (desafio.id === 's5' || desafio.id === 'm2') progresso = historicoSimulados.length;
      if (desafio.id === 'e1') progresso = historicoSimulados.length > 0 ? 1 : 0;
      return { ...desafio, progresso: Math.min(progresso, desafio.meta) };
    });

    setDesafios(desafiosAtualizados);
    setLoading(false);
  };

  const coletarRecompensa = (desafioId: string) => {
    const desafio = desafios.find(d => d.id === desafioId);
    if (!desafio || desafio.progresso < desafio.meta) return;
    const coletados = JSON.parse(localStorage.getItem('desafios_coletados') || '[]');
    if (coletados.includes(desafioId)) return;
    const novoFP = fpTotal + desafio.recompensaFP;
    localStorage.setItem('fp_total', String(novoFP));
    setFpTotal(novoFP);
    coletados.push(desafioId);
    localStorage.setItem('desafios_coletados', JSON.stringify(coletados));
    alert(\`🎉 Parabéns! Você ganhou +\${desafio.recompensaFP} FP!\`);
    carregarDesafios();
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'diario': return { label: 'Diário', cor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'semanal': return { label: 'Semanal', cor: 'bg-green-500/20 text-green-300 border-green-500/30' };
      case 'mensal': return { label: 'Mensal', cor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'especial': return { label: 'Especial', cor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      default: return { label: tipo, cor: 'bg-white/10 text-white/70' };
    }
  };

  const desafiosFiltrados = desafios.filter(d => filtroTipo === 'todos' || d.tipo === filtroTipo);
  const coletados = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('desafios_coletados') || '[]') : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1F22] flex items-center justify-center">
        <div className="text-center"><div className="animate-spin text-4xl mb-4">🔄</div><p className="text-white">Carregando desafios...</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
      <FloatingNav />
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 pt-16">
          <h1 className="title-ia flex items-center gap-3 mb-2">🎯 Desafios ENEM-IA</h1>
          <p className="text-white/70 mb-4">Complete desafios e ganhe FP extras!</p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl px-4 py-2">
            <span className="text-2xl">✨</span>
            <div><p className="text-xs text-yellow-300/70">Seus FP</p><p className="text-xl font-bold text-yellow-300">{fpTotal} FP</p></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-ia"><span className="text-2xl font-bold text-emerald-400">{desafios.filter(d => d.progresso >= d.meta && !coletados.includes(d.id)).length}</span><span className="text-white/60 text-sm">Para Coletar</span></div>
          <div className="stat-ia"><span className="text-2xl font-bold text-blue-400">{coletados.length}</span><span className="text-white/60 text-sm">Completados</span></div>
          <div className="stat-ia"><span className="text-2xl font-bold text-purple-400">{desafios.length - coletados.length}</span><span className="text-white/60 text-sm">Em Andamento</span></div>
          <div className="stat-ia"><span className="text-2xl font-bold text-yellow-400">{desafios.reduce((acc, d) => acc + d.recompensaFP, 0)}</span><span className="text-white/60 text-sm">FP Disponíveis</span></div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['todos', 'diario', 'semanal', 'mensal', 'especial'].map(tipo => (
            <button key={tipo} onClick={() => setFiltroTipo(tipo)} className={\`px-4 py-2 rounded-xl font-medium transition \${filtroTipo === tipo ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}\`}>
              {tipo === 'todos' ? '📋 Todos' : tipo === 'diario' ? '☀️ Diários' : tipo === 'semanal' ? '📅 Semanais' : tipo === 'mensal' ? '🗓️ Mensais' : '⭐ Especiais'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {desafiosFiltrados.map(desafio => {
            const badge = getTipoBadge(desafio.tipo);
            const percentual = Math.round((desafio.progresso / desafio.meta) * 100);
            const completo = desafio.progresso >= desafio.meta;
            const jaColetou = coletados.includes(desafio.id);

            return (
              <div key={desafio.id} className={\`card-ia relative overflow-hidden \${jaColetou ? 'opacity-60' : ''}\`}>
                {jaColetou && <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✓ Coletado</div>}
                {completo && !jaColetou && <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">🎁 Coletar!</div>}

                <div className="flex items-start justify-between mb-4">
                  <div className={\`w-14 h-14 bg-gradient-to-br \${desafio.cor} rounded-xl flex items-center justify-center text-2xl\`}>{desafio.icone}</div>
                  <span className={\`px-2 py-1 rounded-full text-xs font-bold border \${badge.cor}\`}>{badge.label}</span>
                </div>

                <h3 className="text-white font-bold text-lg mb-1">{desafio.titulo}</h3>
                <p className="text-white/60 text-sm mb-4">{desafio.descricao}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{desafio.progresso}/{desafio.meta}</span>
                    <span className={\`font-bold \${completo ? 'text-emerald-400' : 'text-white/70'}\`}>{percentual}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className={\`h-full transition-all duration-500 rounded-full \${completo ? 'bg-emerald-500' : \`bg-gradient-to-r \${desafio.cor}\`}\`} style={{ width: \`\${Math.min(percentual, 100)}%\` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-300"><span>🏆</span><span className="font-bold">+{desafio.recompensaFP} FP</span></div>
                  {completo && !jaColetou ? (
                    <button onClick={() => coletarRecompensa(desafio.id)} className="btn-ia py-2 px-4 text-sm animate-pulse">Coletar! 🎁</button>
                  ) : !jaColetou ? (
                    <button onClick={() => router.push('/enem/simulado')} className="py-2 px-4 bg-white/10 rounded-lg text-sm text-white/70 hover:bg-white/20 transition">Continuar →</button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="card-ia inline-block p-8">
            <h3 className="text-xl font-bold text-white mb-2">🔥 Quer mais FP?</h3>
            <p className="text-white/70 mb-4">Complete simulados para avançar nos desafios!</p>
            <button onClick={() => router.push('/enem/simulado')} className="btn-ia py-3 px-8">🚀 Fazer Simulado Agora</button>
          </div>
        </div>
      </div>
      <ChalkBackToTop />
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/enem/desafios/page.tsx', content);
console.log('Desafios page fixed!');
