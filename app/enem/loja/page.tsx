'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import { ChalkIcon } from '@/components/IconFix';
import {
  ShoppingBag,
  Sparkles,
  Trophy,
  Zap,
  Gift,
  Check,
  Star,
  Crown,
  Flame,
  Heart,
  Palette,
  Rocket,
  Shield,
  ArrowLeft
} from 'lucide-react';

interface Reward {
  id: string;
  nome: string;
  descricao: string;
  custoFP: number;
  icone: string;
  categoria: 'item' | 'boost' | 'cosmetic' | 'premium';
  ativo: boolean;
  unico: boolean;
}

interface UserData {
  id: string;
  nome: string;
  email: string;
  pontosFP: number;
  nivel: string;
}

const iconMap: Record<string, any> = {
  Trophy,
  Zap,
  Gift,
  Star,
  Crown,
  Flame,
  Heart,
  Sparkles,
  Palette,
  Rocket,
  Shield
};

const categoriaStyles: Record<string, { bg: string; border: string; text: string }> = {
  item: { bg: 'bg-blue-400/20', border: 'border-blue-400/30', text: 'text-blue-300' },
  boost: { bg: 'bg-purple-400/20', border: 'border-purple-400/30', text: 'text-purple-300' },
  cosmetic: { bg: 'bg-pink-400/20', border: 'border-pink-400/30', text: 'text-pink-300' },
  premium: { bg: 'bg-yellow-400/20', border: 'border-yellow-400/30', text: 'text-yellow-300' },
};

export default function LojaPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [resgatando, setResgatando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');

  useEffect(() => {
    carregarDados();
  }, []);

  function carregarDados() {
    try {
      setLoading(true);
      const fpTotal = parseInt(localStorage.getItem("fp_total") || "0");
      setUser({
        id: "1",
        nome: "Estudante",
        email: "estudante@enem-ia.com",
        pontosFP: fpTotal,
        nivel: fpTotal >= 1000 ? "Gold" : "Bronze"
      });

      setRewards([
        {
          id: "r1",
          nome: "Tema Escuro Premium",
          descricao: "Desbloqueie o tema escuro exclusivo para estudar a noite",
          custoFP: 500,
          icone: "Palette",
          categoria: "cosmetic",
          ativo: true,
          unico: true
        },
        {
          id: "r2",
          nome: "Boost de XP 2x",
          descricao: "Ganhe o dobro de XP nos proximos 5 simulados",
          custoFP: 300,
          icone: "Zap",
          categoria: "boost",
          ativo: true,
          unico: false
        },
        {
          id: "r3",
          nome: "Avatar Coruja",
          descricao: "Avatar especial de coruja sabida para seu perfil",
          custoFP: 200,
          icone: "Star",
          categoria: "cosmetic",
          ativo: true,
          unico: true
        },
        {
          id: "r4",
          nome: "Distintivo ENEM Master",
          descricao: "Mostre que voce e um mestre do ENEM com este distintivo raro",
          custoFP: 1000,
          icone: "Trophy",
          categoria: "premium",
          ativo: true,
          unico: true
        },
        {
          id: "r5",
          nome: "Dicas Extra IA",
          descricao: "Receba 10 dicas extras da IA nas questoes dificeis",
          custoFP: 150,
          icone: "Sparkles",
          categoria: "item",
          ativo: true,
          unico: false
        },
        {
          id: "r6",
          nome: "Escudo Anti-Streak",
          descricao: "Proteja sua streak por 1 dia caso esqueca de estudar",
          custoFP: 250,
          icone: "Shield",
          categoria: "item",
          ativo: true,
          unico: false
        },
        {
          id: "r7",
          nome: "Boost Ranking",
          descricao: "Ganhe 50% mais pontos no ranking por 3 dias",
          custoFP: 400,
          icone: "Rocket",
          categoria: "boost",
          ativo: true,
          unico: false
        },
        {
          id: "r8",
          nome: "Coroa Dourada",
          descricao: "Coroa exclusiva que aparece no seu perfil e ranking",
          custoFP: 800,
          icone: "Crown",
          categoria: "premium",
          ativo: true,
          unico: true
        }
      ]);
    } catch (err) {
      setError("Erro ao carregar dados da loja");
    } finally {
      setLoading(false);
    }
  }

  function resgatar(reward: Reward) {
    if (!user) {
      setError("Voce precisa estar logado");
      return;
    }
    if (user.pontosFP < reward.custoFP) {
      setError("FP insuficientes para resgatar esta recompensa");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setResgatando(reward.id);

    // Simular delay
    setTimeout(() => {
      const novoFP = user.pontosFP - reward.custoFP;
      localStorage.setItem("fp_total", String(novoFP));

      const resgatadas = JSON.parse(localStorage.getItem("recompensas_resgatadas") || "[]");
      resgatadas.push(reward.id);
      localStorage.setItem("recompensas_resgatadas", JSON.stringify(resgatadas));

      setUser({ ...user, pontosFP: novoFP });
      setSuccessMessage(`${reward.nome} resgatado com sucesso!`);
      setTimeout(() => setSuccessMessage(null), 3000);

      if (reward.unico) {
        setRewards(rewards.filter(r => r.id !== reward.id));
      }

      setResgatando(null);
    }, 800);
  }

  const rewardsFiltradas = categoriaAtiva === 'todas'
    ? rewards
    : rewards.filter(r => r.categoria === categoriaAtiva);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: 'var(--chalkboard-green)',
          backgroundImage: 'var(--chalkboard-texture)'
        }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-6"
            style={{
              borderColor: 'var(--chalk-dim)',
              borderTopColor: 'var(--accent-yellow)'
            }}
          />
          <p
            className="text-2xl"
            style={{
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            Carregando loja...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundColor: 'var(--chalkboard-green)',
        backgroundImage: 'var(--chalkboard-texture)'
      }}
    >
      <FloatingNav />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="header mb-8 pt-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3"
                style={{
                  color: 'var(--chalk-white)',
                  fontFamily: 'var(--font-kalam)',
                  textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                }}
              >
                <ChalkIcon icon={ShoppingBag} size={40} color="yellow" />
                Loja de Recompensas
              </h1>
              <p
                className="text-lg md:text-xl"
                style={{
                  color: 'var(--chalk-dim)',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                Troque seus Focus Points por recompensas incriveis
              </p>
            </div>

            {/* Saldo de FP */}
            <div className="stats-bar">
              <div className="stat-item">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    border: '2px solid rgba(251, 191, 36, 0.3)'
                  }}
                >
                  <Sparkles
                    className="w-7 h-7"
                    style={{ color: 'var(--accent-yellow)' }}
                  />
                </div>
                <div>
                  <p
                    className="stat-label"
                    style={{ color: 'var(--chalk-dim)' }}
                  >
                    Seus FP
                  </p>
                  <p
                    className="stat-number"
                    style={{
                      color: 'var(--accent-yellow)',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    {user?.pontosFP?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens de erro/sucesso */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5'
              }}
            >
              <span>⚠️</span>
              {error}
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                border: '2px solid rgba(34, 197, 94, 0.4)',
                color: '#86efac'
              }}
            >
              <Check className="w-5 h-5" />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtros de categoria */}
        <div className="category mb-8">
          <h2
            className="category-title mb-4"
            style={{
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            Categorias
          </h2>
          <div className="flex flex-wrap gap-3">
            {['todas', 'item', 'boost', 'cosmetic', 'premium'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  categoriaAtiva === cat ? 'btn-yellow' : ''
                }`}
                style={
                  categoriaAtiva === cat
                    ? {
                        backgroundColor: 'var(--accent-yellow)',
                        color: 'var(--chalkboard-green)',
                        fontFamily: 'var(--font-kalam)',
                        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                      }
                    : {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--chalk-dim)',
                        fontFamily: 'var(--font-kalam)',
                        border: '2px solid rgba(255, 255, 255, 0.1)'
                      }
                }
                onMouseEnter={(e) => {
                  if (categoriaAtiva !== cat) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (categoriaAtiva !== cat) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Recompensas */}
        {rewardsFiltradas.length === 0 ? (
          <div
            className="card p-12 text-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px'
            }}
          >
            <ShoppingBag
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: 'var(--chalk-dim)', opacity: 0.3 }}
            />
            <p
              className="text-lg"
              style={{
                color: 'var(--chalk-dim)',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Nenhuma recompensa disponivel nesta categoria
            </p>
          </div>
        ) : (
          <div className="cards-grid">
            {rewardsFiltradas.map((reward, index) => {
              const Icon = iconMap[reward.icone] || Gift;
              const temFP = (user?.pontosFP || 0) >= reward.custoFP;
              const catStyle = categoriaStyles[reward.categoria];

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="chalkboard-card flex flex-col"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '1.5rem'
                  }}
                >
                  {/* Header do card */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`badge px-3 py-1 rounded-full text-xs font-semibold border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}
                      style={{ fontFamily: 'var(--font-kalam)' }}
                    >
                      {reward.categoria}
                    </span>
                    {reward.unico && (
                      <span
                        className="badge px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(251, 191, 36, 0.2)',
                          border: '1px solid rgba(251, 191, 36, 0.3)',
                          color: 'var(--accent-yellow)',
                          fontFamily: 'var(--font-kalam)'
                        }}
                      >
                        Unico
                      </span>
                    )}
                  </div>

                  {/* Icone */}
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <Icon
                        className="w-10 h-10"
                        style={{ color: 'var(--accent-yellow)' }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-4 flex-1">
                    <h3
                      className="card-title mb-2"
                      style={{
                        color: 'var(--chalk-white)',
                        fontFamily: 'var(--font-kalam)',
                        fontSize: '1.25rem'
                      }}
                    >
                      {reward.nome}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'var(--chalk-dim)',
                        fontFamily: 'var(--font-kalam)'
                      }}
                    >
                      {reward.descricao}
                    </p>
                  </div>

                  {/* Preco e botao */}
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles
                        className="w-5 h-5"
                        style={{ color: 'var(--accent-yellow)' }}
                      />
                      <span
                        className="text-2xl font-bold"
                        style={{
                          color: 'var(--accent-yellow)',
                          fontFamily: 'var(--font-kalam)'
                        }}
                      >
                        {reward.custoFP} FP
                      </span>
                    </div>

                    <button
                      onClick={() => resgatar(reward)}
                      disabled={!temFP || resgatando === reward.id}
                      className={`btn w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        temFP ? 'btn-yellow' : ''
                      }`}
                      style={
                        temFP
                          ? {
                              backgroundColor: 'var(--accent-yellow)',
                              color: 'var(--chalkboard-green)',
                              fontFamily: 'var(--font-kalam)',
                              border: 'none',
                              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                            }
                          : {
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              color: 'var(--chalk-dim)',
                              fontFamily: 'var(--font-kalam)',
                              border: '2px solid rgba(255, 255, 255, 0.1)',
                              cursor: 'not-allowed',
                              opacity: 0.5
                            }
                      }
                    >
                      {resgatando === reward.id ? (
                        <>
                          <div
                            className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                            style={{ borderColor: 'currentColor' }}
                          />
                          Resgatando...
                        </>
                      ) : (
                        <>
                          <Gift className="w-5 h-5" />
                          {temFP ? 'Resgatar' : 'FP Insuficientes'}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Dica de como ganhar FP */}
        <div
          className="card p-6 mt-8"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))',
            border: '3px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '16px'
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(251, 191, 36, 0.2)',
                border: '2px solid rgba(251, 191, 36, 0.3)'
              }}
            >
              <Zap
                className="w-6 h-6"
                style={{ color: 'var(--accent-yellow)' }}
              />
            </div>
            <div>
              <h3
                className="font-bold mb-3 text-xl"
                style={{
                  color: 'var(--chalk-white)',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                Como ganhar mais FP?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4"
                    style={{ color: '#86efac' }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: 'var(--chalk-dim)',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Complete simulados e ganhe ate 100 FP por prova
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4"
                    style={{ color: '#86efac' }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: 'var(--chalk-dim)',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Mantenha sua streak e ganhe bonus diarios
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4"
                    style={{ color: '#86efac' }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: 'var(--chalk-dim)',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Participe de desafios semanais
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4"
                    style={{ color: '#86efac' }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: 'var(--chalk-dim)',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Convide amigos e ganhe 50 FP por cada um
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer mt-8">
          <button
            onClick={() => router.push('/enem')}
            className="btn btn-yellow inline-flex items-center gap-2"
            style={{
              backgroundColor: 'var(--accent-yellow)',
              color: 'var(--chalkboard-green)',
              fontFamily: 'var(--font-kalam)',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
