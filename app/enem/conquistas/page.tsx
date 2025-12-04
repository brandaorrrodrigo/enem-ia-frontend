'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  categoria: 'estudo' | 'social' | 'ranking' | 'especial';
  requisito: string;
  fpReward: number;
  progresso: number; // 0-100
  desbloqueada: boolean;
  dataDesbloqueio?: string;
  raras?: boolean;
}

interface Milestone {
  id: string;
  titulo: string;
  descricao: string;
  emoji: string;
  meta: number;
  atual: number;
  unidade: string;
  fpBonus: number;
  completo: boolean;
}

const conquistas: Conquista[] = [
  // Estudo
  { id: '1', nome: 'Primeiro Passo', descricao: 'Complete seu primeiro simulado', emoji: '🎯', categoria: 'estudo', requisito: '1 simulado', fpReward: 50, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-01' },
  { id: '2', nome: 'Estudante Dedicado', descricao: 'Complete 10 simulados', emoji: '📚', categoria: 'estudo', requisito: '10 simulados', fpReward: 100, progresso: 70, desbloqueada: false },
  { id: '3', nome: 'Mestre dos Simulados', descricao: 'Complete 50 simulados', emoji: '🏆', categoria: 'estudo', requisito: '50 simulados', fpReward: 500, progresso: 14, desbloqueada: false, raras: true },
  { id: '4', nome: 'Streak de 7 Dias', descricao: 'Estude 7 dias consecutivos', emoji: '🔥', categoria: 'estudo', requisito: '7 dias seguidos', fpReward: 100, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-08' },
  { id: '5', nome: 'Streak de 30 Dias', descricao: 'Estude 30 dias consecutivos', emoji: '💪', categoria: 'estudo', requisito: '30 dias seguidos', fpReward: 300, progresso: 23, desbloqueada: false, raras: true },
  { id: '6', nome: 'Streak de 100 Dias', descricao: 'Estude 100 dias consecutivos', emoji: '👑', categoria: 'estudo', requisito: '100 dias seguidos', fpReward: 1000, progresso: 7, desbloqueada: false, raras: true },
  { id: '7', nome: 'Pomodoro Master', descricao: 'Complete 100 sessoes Pomodoro', emoji: '🍅', categoria: 'estudo', requisito: '100 pomodoros', fpReward: 200, progresso: 12, desbloqueada: false },
  { id: '8', nome: 'Quiz Champion', descricao: 'Acerte 50 quizzes diarios seguidos', emoji: '🎯', categoria: 'estudo', requisito: '50 quizzes', fpReward: 250, progresso: 40, desbloqueada: false },

  // Social
  { id: '9', nome: 'Sociavel', descricao: 'Siga 10 estudantes', emoji: '👥', categoria: 'social', requisito: '10 seguindo', fpReward: 50, progresso: 60, desbloqueada: false },
  { id: '10', nome: 'Influencer', descricao: 'Tenha 50 seguidores', emoji: '⭐', categoria: 'social', requisito: '50 seguidores', fpReward: 200, progresso: 28, desbloqueada: false, raras: true },
  { id: '11', nome: 'Viral', descricao: 'Compartilhe 10 conquistas', emoji: '📱', categoria: 'social', requisito: '10 compartilhamentos', fpReward: 75, progresso: 30, desbloqueada: false },
  { id: '12', nome: 'Recrutador', descricao: 'Convide 5 amigos que se cadastraram', emoji: '🤝', categoria: 'social', requisito: '5 convites', fpReward: 250, progresso: 20, desbloqueada: false },

  // Ranking
  { id: '13', nome: 'Liga Prata', descricao: 'Alcance a Liga Prata', emoji: '🥈', categoria: 'ranking', requisito: '500 FP', fpReward: 50, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-05' },
  { id: '14', nome: 'Liga Ouro', descricao: 'Alcance a Liga Ouro', emoji: '🥇', categoria: 'ranking', requisito: '1500 FP', fpReward: 100, progresso: 83, desbloqueada: false },
  { id: '15', nome: 'Liga Platina', descricao: 'Alcance a Liga Platina', emoji: '💎', categoria: 'ranking', requisito: '3000 FP', fpReward: 200, progresso: 42, desbloqueada: false, raras: true },
  { id: '16', nome: 'Liga Diamante', descricao: 'Alcance a Liga Diamante', emoji: '💠', categoria: 'ranking', requisito: '5000 FP', fpReward: 500, progresso: 25, desbloqueada: false, raras: true },
  { id: '17', nome: 'Top 100', descricao: 'Entre no Top 100 do ranking geral', emoji: '🏅', categoria: 'ranking', requisito: 'Top 100', fpReward: 300, progresso: 0, desbloqueada: false, raras: true },
  { id: '18', nome: 'Campeao Semanal', descricao: 'Fique em 1º lugar no ranking semanal', emoji: '🏆', categoria: 'ranking', requisito: '1º lugar', fpReward: 500, progresso: 0, desbloqueada: false, raras: true },

  // Especial
  { id: '19', nome: 'Nota 900+', descricao: 'Tire 900+ em um simulado', emoji: '🌟', categoria: 'especial', requisito: 'Nota >= 900', fpReward: 500, progresso: 0, desbloqueada: false, raras: true },
  { id: '20', nome: 'Perfeito!', descricao: 'Acerte 100% de um simulado', emoji: '💯', categoria: 'especial', requisito: '100% acertos', fpReward: 300, progresso: 0, desbloqueada: false, raras: true },
  { id: '21', nome: 'Early Bird', descricao: 'Seja um dos primeiros 1000 usuarios', emoji: '🐦', categoria: 'especial', requisito: 'Cadastro antigo', fpReward: 100, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-10-15', raras: true },
  { id: '22', nome: 'Vencedor de Batalha', descricao: 'Venca sua primeira batalha 1v1', emoji: '⚔️', categoria: 'especial', requisito: '1 vitoria', fpReward: 75, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-10' },
  { id: '23', nome: 'Guerreiro', descricao: 'Venca 50 batalhas 1v1', emoji: '🗡️', categoria: 'especial', requisito: '50 vitorias', fpReward: 400, progresso: 10, desbloqueada: false, raras: true },
];

const milestones: Milestone[] = [
  { id: '1', titulo: 'Questoes Respondidas', descricao: 'Responda questoes em simulados', emoji: '📝', meta: 1000, atual: 347, unidade: 'questoes', fpBonus: 200, completo: false },
  { id: '2', titulo: 'Horas de Estudo', descricao: 'Tempo total em Pomodoro', emoji: '⏱️', meta: 100, atual: 12, unidade: 'horas', fpBonus: 300, completo: false },
  { id: '3', titulo: 'Acertos Consecutivos', descricao: 'Maior sequencia de acertos', emoji: '🎯', meta: 50, atual: 18, unidade: 'acertos', fpBonus: 150, completo: false },
  { id: '4', titulo: 'Amigos Convidados', descricao: 'Amigos que se cadastraram', emoji: '👥', meta: 10, atual: 1, unidade: 'amigos', fpBonus: 500, completo: false },
  { id: '5', titulo: 'Batalhas Vencidas', descricao: 'Vitorias no modo batalha', emoji: '⚔️', meta: 100, atual: 5, unidade: 'vitorias', fpBonus: 400, completo: false },
];

export default function ConquistasPage() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todas' | 'estudo' | 'social' | 'ranking' | 'especial'>('todas');
  const [showDesbloqueadas, setShowDesbloqueadas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [conquistaCelebrando, setConquistaCelebrando] = useState<Conquista | null>(null);

  const categorias = [
    { id: 'todas', label: 'Todas', emoji: '🏆' },
    { id: 'estudo', label: 'Estudo', emoji: '📚' },
    { id: 'social', label: 'Social', emoji: '👥' },
    { id: 'ranking', label: 'Ranking', emoji: '🏅' },
    { id: 'especial', label: 'Especial', emoji: '⭐' },
  ];

  const conquistasFiltradas = conquistas.filter((c) => {
    if (showDesbloqueadas && !c.desbloqueada) return false;
    if (categoriaAtiva === 'todas') return true;
    return c.categoria === categoriaAtiva;
  });

  const totalDesbloqueadas = conquistas.filter((c) => c.desbloqueada).length;
  const fpTotalGanho = conquistas.filter((c) => c.desbloqueada).reduce((acc, c) => acc + c.fpReward, 0);

  const celebrarConquista = (conquista: Conquista) => {
    if (!conquista.desbloqueada) return;
    setConquistaCelebrando(conquista);
    setShowCelebration(true);
  };

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      {/* Celebracao */}
      {showCelebration && conquistaCelebrando && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setShowCelebration(false)}
        >
          <div className="card-ia p-8 text-center max-w-md mx-4 animate-bounce" onClick={(e) => e.stopPropagation()}>
            <div className="text-9xl mb-4">{conquistaCelebrando.emoji}</div>
            <h2 className="title-ia-sm text-yellow-300 mb-2">Conquista Desbloqueada!</h2>
            <p className="text-white text-xl font-bold mb-2">{conquistaCelebrando.nome}</p>
            <p className="text-white/70 mb-4">{conquistaCelebrando.descricao}</p>
            <div className="bg-yellow-500/20 rounded-xl p-3 border border-yellow-400/30 mb-4">
              <p className="text-yellow-300 font-bold text-2xl">+{conquistaCelebrando.fpReward} FP</p>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Desbloqueada em {conquistaCelebrando.dataDesbloqueio}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCelebration(false)}
                className="btn-ia flex-1"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // Compartilhar
                  const text = `🎉 Desbloqueei "${conquistaCelebrando.nome}" no ENEM-IA! ${conquistaCelebrando.emoji}\n\n+${conquistaCelebrando.fpReward} FP\n\nVem estudar comigo!`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="btn-ia-secondary flex-1"
              >
                📱 Compartilhar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slogan */}
      <div className="card-ia p-4 mb-6 mt-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
        <p className="text-yellow-300 font-bold italic">
          "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
        </p>
      </div>

      <div className="mb-8">
        <h1 className="title-ia mb-2">🏆 Conquistas & Milestones</h1>
        <p className="subtitle-ia mb-0">Desbloqueie conquistas e ganhe FP bonus!</p>
      </div>

      {/* Stats Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{totalDesbloqueadas}/{conquistas.length}</span>
          <span className="stat-ia-label">Conquistas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value text-yellow-300">+{fpTotalGanho}</span>
          <span className="stat-ia-label">FP de Conquistas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{conquistas.filter(c => c.raras && c.desbloqueada).length}</span>
          <span className="stat-ia-label">Raras</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{Math.round((totalDesbloqueadas / conquistas.length) * 100)}%</span>
          <span className="stat-ia-label">Progresso</span>
        </div>
      </div>

      {/* Milestones */}
      <div className="card-ia p-6 mb-8">
        <h2 className="title-ia-sm mb-4">📊 Milestones de Progresso</h2>
        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{m.emoji}</span>
                  <div>
                    <p className="text-white font-bold">{m.titulo}</p>
                    <p className="text-white/60 text-sm">{m.descricao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{m.atual.toLocaleString()}/{m.meta.toLocaleString()}</p>
                  <p className="text-yellow-300 text-sm">+{m.fpBonus} FP</p>
                </div>
              </div>
              <div className="progress-ia">
                <div
                  className="progress-ia-bar"
                  style={{ width: `${Math.min((m.atual / m.meta) * 100, 100)}%` }}
                />
              </div>
              <p className="text-white/50 text-xs mt-1">
                Faltam {(m.meta - m.atual).toLocaleString()} {m.unidade}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaAtiva(cat.id as any)}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              categoriaAtiva === cat.id
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}

        <button
          onClick={() => setShowDesbloqueadas(!showDesbloqueadas)}
          className={`px-4 py-2 rounded-xl font-semibold transition ml-auto ${
            showDesbloqueadas
              ? 'bg-green-500 text-white'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          ✓ Desbloqueadas
        </button>
      </div>

      {/* Grid de Conquistas */}
      <div className="grid md:grid-cols-2 gap-4">
        {conquistasFiltradas.map((conquista) => (
          <div
            key={conquista.id}
            onClick={() => celebrarConquista(conquista)}
            className={`card-ia p-5 transition cursor-pointer hover:scale-[1.02] ${
              conquista.desbloqueada
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30'
                : 'opacity-70'
            } ${conquista.raras ? 'ring-2 ring-purple-400/50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-5xl ${conquista.desbloqueada ? '' : 'grayscale opacity-50'}`}>
                {conquista.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold">{conquista.nome}</h3>
                  {conquista.raras && <span className="text-purple-400 text-xs">RARA</span>}
                  {conquista.desbloqueada && <span className="text-green-400">✓</span>}
                </div>
                <p className="text-white/60 text-sm mb-2">{conquista.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">{conquista.requisito}</span>
                  <span className="text-yellow-300 font-bold text-sm">+{conquista.fpReward} FP</span>
                </div>

                {!conquista.desbloqueada && conquista.progresso > 0 && (
                  <div className="mt-2">
                    <div className="progress-ia h-2">
                      <div
                        className="progress-ia-bar"
                        style={{ width: `${conquista.progresso}%` }}
                      />
                    </div>
                    <p className="text-white/50 text-xs mt-1">{conquista.progresso}% completo</p>
                  </div>
                )}

                {conquista.desbloqueada && conquista.dataDesbloqueio && (
                  <p className="text-white/40 text-xs mt-2">
                    Desbloqueada em {conquista.dataDesbloqueio}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {conquistasFiltradas.length === 0 && (
        <div className="card-ia p-8 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <p className="text-white/70">Nenhuma conquista encontrada nesta categoria</p>
        </div>
      )}

      {/* Dica */}
      <div className="card-ia p-6 mt-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="text-white font-bold mb-2">Dica para Desbloquear Mais</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Faca simulados diariamente para manter sua streak</li>
              <li>• Use o Pomodoro para ganhar FP enquanto estuda</li>
              <li>• Desafie amigos no modo Batalha</li>
              <li>• Convide amigos para ganhar conquistas sociais</li>
            </ul>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
