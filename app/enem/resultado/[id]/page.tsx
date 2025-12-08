'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AchievementPopup from '@/components/enem/AchievementPopup';
import FloatingBackButton from '@/components/FloatingBackButton';

interface ErroDetalhado {
  questao_id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
  marcada: number | null;
}

interface Course {
  id: string;
  nome: string;
  ies: string;
  campus?: string;
  turno?: string;
  notaCorte: number;
  anoReferencia: number;
}

interface ResultadoData {
  ok: boolean;
  usuario_simulado_id: string;
  acertos: number;
  erros: number;
  total: number;
  porcentagem: number;
  nota: number;
  desempenho: string;
  erros_detalhados: ErroDetalhado[];
  fp_ganhos?: number;
  curso_alvo?: Course | null; // Curso alvo do usuário
  atingiu_nota_corte?: boolean; // Se atingiu nota de corte
  diferenca_nota?: number | null; // Diferença para nota de corte
}

export default function ResultadoPage() {
  const router = useRouter();
  const params = useParams();
  const resultadoId = params.id as string;

  const [resultado, setResultado] = useState<ResultadoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarErros, setMostrarErros] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    // Tenta carregar do localStorage primeiro
    const resultadoSalvo = localStorage.getItem('ultimo_resultado');

    if (resultadoSalvo) {
      const data: ResultadoData = JSON.parse(resultadoSalvo);
      setResultado(data);
      setLoading(false);

      // Verifica se deve exibir conquista
      checkAchievement(data);
    } else {
      setLoading(false);
    }
  }, [resultadoId]);

  // Verifica se usuário desbloqueou conquista
  const checkAchievement = (resultado: ResultadoData) => {
    // Critério PRIORITÁRIO: Atingiu nota de corte do curso alvo
    if (resultado.atingiu_nota_corte && resultado.curso_alvo) {
      setTimeout(() => setShowAchievement(true), 800);
      return;
    }

    // Critério 1: Nota >= 700 (primeira barreira importante)
    if (resultado.nota >= 700) {
      setTimeout(() => setShowAchievement(true), 800);
      return;
    }

    // Critério 2: Nota >= 950 (nota perfeita)
    if (resultado.nota >= 950) {
      setTimeout(() => setShowAchievement(true), 800);
      return;
    }

    // Critério 3: Porcentagem >= 90%
    if (resultado.porcentagem >= 90) {
      setTimeout(() => setShowAchievement(true), 800);
      return;
    }
  };

  // Calcula FP ganhos (se não vier do backend)
  const calcularFP = (resultado: ResultadoData): number => {
    if (resultado.fp_ganhos) return resultado.fp_ganhos;

    // Fórmula simples: 10 FP por acerto + bônus por desempenho
    let fp = resultado.acertos * 10;

    // Bônus por desempenho
    if (resultado.porcentagem >= 90) fp += 100; // Excelente
    else if (resultado.porcentagem >= 75) fp += 50; // Muito bom
    else if (resultado.porcentagem >= 60) fp += 25; // Bom

    // Bônus por nota alta
    if (resultado.nota >= 900) fp += 150;
    else if (resultado.nota >= 800) fp += 100;
    else if (resultado.nota >= 700) fp += 50;

    return fp;
  };

  const fpGanhos = resultado ? calcularFP(resultado) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-md text-center">
          <h2 className="font-bold text-xl mb-2">Resultado não encontrado</h2>
          <p className="mb-4">Não foi possível carregar o resultado do simulado.</p>
          <button
            onClick={() => router.push('/enem/simulado')}
            className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Fazer Novo Simulado
          </button>
        </div>
      </div>
    );
  }

  // Cores baseadas na porcentagem
  const getCorProgresso = (porcentagem: number) => {
    if (porcentagem >= 90) return 'bg-green-500';
    if (porcentagem >= 75) return 'bg-green-400';
    if (porcentagem >= 60) return 'bg-yellow-400';
    if (porcentagem >= 50) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const getCorNota = (nota: number) => {
    if (nota >= 900) return 'text-green-400';
    if (nota >= 750) return 'text-green-300';
    if (nota >= 600) return 'text-yellow-400';
    if (nota >= 450) return 'text-orange-400';
    return 'text-red-400';
  };

  const getEmojiDesempenho = (nota: number) => {
    if (nota >= 900) return '🌟';
    if (nota >= 750) return '🎯';
    if (nota >= 600) return '👍';
    if (nota >= 450) return '📚';
    return '💪';
  };

  return (
    <>
      {/* Achievement Popup */}
      {showAchievement && (
        <AchievementPopup
          show={showAchievement}
          nota={resultado.nota}
          notaReferencia={700} // Meta padrão (pode ser configurável)
          tipoReferencia="meta_pessoal"
          labelReferencia="Meta de Excelência ENEM"
          acertos={resultado.acertos}
          total={resultado.total}
          porcentagem={resultado.porcentagem}
          onClose={() => setShowAchievement(false)}
          onContinuar={() => {
            setShowAchievement(false);
            router.push('/enem/simulado');
          }}
        />
      )}

      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              {getEmojiDesempenho(resultado.nota)} Resultado do Simulado
            </h1>
            <p className="text-white/70 text-lg">{resultado.desempenho}</p>
          </div>

          {/* Card Principal - Nota TRI */}
          <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-400/50 shadow-2xl text-center">
            <p className="text-white/80 text-sm uppercase tracking-wide mb-2">Sua Nota TRI</p>
            <p className={`text-7xl md:text-9xl font-extrabold ${getCorNota(resultado.nota)} drop-shadow-lg`}>
              {resultado.nota}
            </p>
            <p className="text-white/60 text-lg mt-2">de 1000 pontos</p>

            {/* FP Ganhos */}
            {fpGanhos > 0 && (
              <div className="mt-6 bg-purple-500/20 border-2 border-purple-400 rounded-xl p-4">
                <p className="text-purple-300 text-sm mb-1">FP Ganhos</p>
                <p className="text-purple-200 text-3xl font-bold">+{fpGanhos} FP</p>
              </div>
            )}
          </div>

          {/* Estatísticas em Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Acertos */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center transform hover:scale-105 transition">
              <p className="text-green-400 text-5xl font-bold mb-2">{resultado.acertos}</p>
              <p className="text-white/70 text-sm">Acertos</p>
              <p className="text-white/50 text-xs mt-1">de {resultado.total} questões</p>
            </div>

            {/* Erros */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center transform hover:scale-105 transition">
              <p className="text-red-400 text-5xl font-bold mb-2">{resultado.erros}</p>
              <p className="text-white/70 text-sm">Erros</p>
              <p className="text-white/50 text-xs mt-1">para revisar</p>
            </div>

            {/* Porcentagem */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center transform hover:scale-105 transition">
              <p className="text-yellow-400 text-5xl font-bold mb-2">{Math.round(resultado.porcentagem)}%</p>
              <p className="text-white/70 text-sm">Aproveitamento</p>
              <p className="text-white/50 text-xs mt-1">taxa de acerto</p>
            </div>
          </div>

          {/* Comparação com Nota de Corte */}
          {resultado.curso_alvo && (
            <div className={`backdrop-blur-md rounded-2xl p-6 border-2 transition-all ${
              resultado.atingiu_nota_corte
                ? 'bg-green-500/20 border-green-400 shadow-green-500/20 shadow-lg'
                : 'bg-orange-500/20 border-orange-400'
            }`}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3 text-white flex items-center justify-center gap-2">
                  🎯 Comparação com Curso Alvo
                </h3>

                <div className="bg-black/20 rounded-xl p-4 mb-4">
                  <p className="font-bold text-xl text-white">{resultado.curso_alvo.nome}</p>
                  <p className="text-white/80 text-sm">{resultado.curso_alvo.ies}</p>
                  {resultado.curso_alvo.campus && (
                    <p className="text-white/60 text-xs">📍 {resultado.curso_alvo.campus}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/20 rounded-xl p-4">
                    <p className="text-white/70 text-sm mb-1">Nota de Corte</p>
                    <p className="text-yellow-300 text-3xl font-bold">
                      {resultado.curso_alvo.notaCorte.toFixed(1)}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <p className="text-white/70 text-sm mb-1">Sua Nota</p>
                    <p className="text-yellow-300 text-3xl font-bold">
                      {resultado.nota.toFixed(1)}
                    </p>
                  </div>
                </div>

                {resultado.atingiu_nota_corte ? (
                  <div className="bg-green-500/30 rounded-xl p-5 border border-green-400/50">
                    <p className="text-green-300 text-2xl font-bold mb-2">
                      🎉 Parabéns! Você atingiu a nota de corte!
                    </p>
                    <p className="text-green-200 text-lg">
                      Você ficou <span className="font-bold">+{resultado.diferenca_nota?.toFixed(1)}</span> pontos acima da nota mínima!
                    </p>
                    <p className="text-green-300/80 text-sm mt-3">
                      Continue estudando para manter esse desempenho incrível! 🚀
                    </p>
                  </div>
                ) : (
                  <div className="bg-orange-500/30 rounded-xl p-5 border border-orange-400/50">
                    <p className="text-orange-300 text-xl font-bold mb-2">
                      📊 Você está chegando lá!
                    </p>
                    <p className="text-orange-200 text-lg">
                      Faltam apenas <span className="font-bold">{Math.abs(resultado.diferenca_nota || 0).toFixed(1)}</span> pontos para atingir a nota de corte
                    </p>
                    <p className="text-orange-300/80 text-sm mt-3">
                      Continue praticando! Você está no caminho certo! 💪
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Barra de Progresso Visual */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <p className="text-white font-semibold">Desempenho Geral</p>
              <p className="text-white/60 text-sm">{Math.round(resultado.porcentagem)}%</p>
            </div>
            <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-1000 ${getCorProgresso(resultado.porcentagem)} flex items-center justify-end pr-3`}
                style={{ width: `${resultado.porcentagem}%` }}
              >
                <span className="text-white font-bold text-sm drop-shadow-md">
                  {Math.round(resultado.porcentagem)}%
                </span>
              </div>
            </div>
          </div>

          {/* Questões Erradas */}
          {resultado.erros_detalhados && resultado.erros_detalhados.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  📚 Questões para Revisar ({resultado.erros_detalhados.length})
                </h2>
                <button
                  onClick={() => setMostrarErros(!mostrarErros)}
                  className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
                >
                  {mostrarErros ? 'Ocultar' : 'Ver Detalhes'}
                </button>
              </div>

              {mostrarErros && (
                <div className="space-y-4 mt-6">
                  {resultado.erros_detalhados.map((erro, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition"
                    >
                      {/* Enunciado resumido */}
                      <div className="mb-4">
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs font-semibold mr-2">
                          Questão {idx + 1}
                        </span>
                        <p className="text-white/80 mt-2 leading-relaxed">
                          {erro.enunciado.substring(0, 200)}
                          {erro.enunciado.length > 200 ? '...' : ''}
                        </p>
                      </div>

                      {/* Alternativas */}
                      <div className="space-y-2">
                        {erro.alternativas.map((alt, altIdx) => {
                          const letra = String.fromCharCode(65 + altIdx);
                          const ehCorreta = altIdx === erro.correta;
                          const foiMarcada = altIdx === erro.marcada;

                          return (
                            <div
                              key={altIdx}
                              className={`p-3 rounded-lg border ${
                                ehCorreta
                                  ? 'bg-green-500/20 border-green-500'
                                  : foiMarcada
                                  ? 'bg-red-500/20 border-red-500'
                                  : 'bg-white/5 border-white/10'
                              }`}
                            >
      <FloatingBackButton />
                              <div className="flex items-start gap-3">
                                <span
                                  className={`font-bold text-lg ${
                                    ehCorreta
                                      ? 'text-green-300'
                                      : foiMarcada
                                      ? 'text-red-300'
                                      : 'text-white/60'
                                  }`}
                                >
                                  {letra})
                                </span>
                                <span
                                  className={`flex-1 ${
                                    ehCorreta
                                      ? 'text-green-200'
                                      : foiMarcada
                                      ? 'text-red-200'
                                      : 'text-white/60'
                                  }`}
                                >
                                  {alt}
                                </span>
                                {ehCorreta && (
                                  <span className="text-green-400 font-bold text-sm">✓ Correta</span>
                                )}
                                {foiMarcada && !ehCorreta && (
                                  <span className="text-red-400 font-bold text-sm">✗ Sua resposta</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dicas Personalizadas */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-6 backdrop-blur-md">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              💡 Dicas para Continuar Evoluindo
            </h3>
            <ul className="text-white/80 space-y-2 text-sm">
              {resultado.porcentagem < 50 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Revise os conceitos básicos das disciplinas onde teve mais dificuldade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Faça simulados menores (10-20 questões) para praticar mais frequentemente</span>
                  </li>
                </>
              )}
              {resultado.porcentagem >= 50 && resultado.porcentagem < 75 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Você está no caminho certo! Revise as questões erradas com atenção</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Foque nas áreas onde errou mais para equilibrar seu desempenho</span>
                  </li>
                </>
              )}
              {resultado.porcentagem >= 75 && resultado.porcentagem < 90 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Excelente! Continue praticando para chegar aos 90%+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Analise os erros para evitar armadilhas nas questões</span>
                  </li>
                </>
              )}
              {resultado.porcentagem >= 90 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>🎉 Parabéns! Você domina o conteúdo! Mantenha a consistência</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Desafie-se com simulados completos (90 questões) e cronometre o tempo</span>
                  </li>
                </>
              )}
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Use as explicações da IA para entender o raciocínio de cada questão</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Mantenha uma rotina de estudos constante para ganhar mais FP</span>
              </li>
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/enem/simulado')}
              className="bg-yellow-400 text-slate-900 font-bold px-6 py-4 rounded-xl hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
            >
              🚀 Fazer Novo Simulado
            </button>
            <button
              onClick={() => router.push('/enem/dashboard')}
              className="bg-white/20 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/30 transition border border-white/30"
            >
              📊 Ver Dashboard
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-white/10 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/20 transition"
            >
              🏠 Voltar para Home
            </button>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <p className="text-white/60 text-sm">
              💪 Continue estudando para desbloquear mais conquistas e ganhar FP!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
