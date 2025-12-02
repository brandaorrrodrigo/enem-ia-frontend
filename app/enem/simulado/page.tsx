'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SimuladoInicioPage() {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(10);
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const handleIniciarSimulado = async () => {
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';

      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          area: area || null,
          quantidade: quantidade,
        }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível iniciar o simulado. Por favor, tente novamente.');
      }

      const data = await response.json();

      localStorage.setItem('simulado_atual', JSON.stringify({
        simulado_id: data.simulado_id,
        usuario_simulado_id: data.usuario_simulado_id,
        quantidade: data.quantidade,
        questoes: data.questoes,
        disciplina: data.disciplina,
        questao_atual: 0,
        respostas: {},
      }));

      router.push(`/enem/simulado/${data.usuario_simulado_id}`);
    } catch (err: any) {
      setError('Não foi possível iniciar o simulado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-ia min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-3xl">
        {/* Card Principal */}
        <div className="card-ia">
          {/* Cabeçalho */}
          <div className="text-center mb-10">
            <h1 className="title-ia-sm mb-3">
              🎯 Configurar Simulado
            </h1>
            <p className="subtitle-ia mb-0">
              Personalize seu simulado e teste seus conhecimentos
            </p>
          </div>

          {/* Formulário */}
          <div className="space-y-8">
            {/* Quantidade de Questões */}
            <div>
              <label className="block text-white font-bold text-lg mb-4">
                📝 Quantidade de Questões: <span className="text-yellow-300">{quantidade}</span>
              </label>

              {/* Presets Rápidos */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setQuantidade(10)}
                  className={`btn-ia-secondary py-3 ${
                    quantidade === 10 ? 'border-yellow-300 bg-yellow-300/10' : ''
                  }`}
                >
                  10 questões
                </button>
                <button
                  onClick={() => setQuantidade(25)}
                  className={`btn-ia-secondary py-3 ${
                    quantidade === 25 ? 'border-yellow-300 bg-yellow-300/10' : ''
                  }`}
                >
                  25 questões
                </button>
                <button
                  onClick={() => setQuantidade(45)}
                  className={`btn-ia-secondary py-3 ${
                    quantidade === 45 ? 'border-yellow-300 bg-yellow-300/10' : ''
                  }`}
                >
                  45 questões
                </button>
              </div>

              {/* Slider */}
              <div className="px-2">
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-300"
                  style={{
                    background: `linear-gradient(to right, #ffd966 0%, #ffd966 ${((quantidade - 5) / 85) * 100}%, rgba(255,255,255,0.1) ${((quantidade - 5) / 85) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>5 questões</span>
                  <span>90 questões</span>
                </div>
              </div>

              {/* Tempo estimado */}
              <div className="card-ia-sm bg-blue-500/10 border-blue-300/30 mt-4 text-center">
                <span className="text-blue-300 text-lg">⏱️</span>
                <span className="text-white/90 ml-2">
                  Tempo estimado: <span className="font-bold text-white">
                    {quantidade <= 10 ? '~15 min' : quantidade <= 25 ? '~40 min' : quantidade <= 45 ? '~1h' : '~2h'}
                  </span>
                </span>
              </div>
            </div>

            <div className="divider-ia"></div>

            {/* Área/Disciplina */}
            <div>
              <label className="block text-white font-bold text-lg mb-4">
                📚 Área de Conhecimento
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="input-ia w-full text-lg"
              >
                <option value="" className="text-slate-900 bg-white">
                  🌐 Todas as Áreas (Recomendado)
                </option>
                <option value="matematica" className="text-slate-900 bg-white">
                  ➗ Matemática e suas Tecnologias
                </option>
                <option value="linguagens" className="text-slate-900 bg-white">
                  📖 Linguagens, Códigos e suas Tecnologias
                </option>
                <option value="ciencias_humanas" className="text-slate-900 bg-white">
                  🌍 Ciências Humanas e suas Tecnologias
                </option>
                <option value="ciencias_natureza" className="text-slate-900 bg-white">
                  🔬 Ciências da Natureza e suas Tecnologias
                </option>
              </select>
              <p className="text-white/60 text-sm mt-3">
                💡 Dica: Selecione "Todas as Áreas" para uma experiência mais realista
              </p>
            </div>

            <div className="divider-ia"></div>

            {/* Dica Visual */}
            <div className="card-ia-sm bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-300/40">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h4 className="text-yellow-300 font-bold text-lg mb-2">Dica ENEM-IA</h4>
                  <p className="text-white/90 leading-relaxed">
                    Para uma experiência mais realista do ENEM, selecione <span className="font-bold text-yellow-300">45 questões</span> de <span className="font-bold text-yellow-300">todas as áreas</span>. Isso simula uma prova completa de uma das áreas do conhecimento!
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="card-ia-sm bg-blue-500/10 border-blue-300/30">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="text-blue-300">ℹ️</span>
                Sobre este Simulado
              </h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Questões reais de provas anteriores do ENEM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Nota calculada usando TRI (Teoria de Resposta ao Item)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Questões nunca se repetem para você</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Explicações detalhadas pela IA após finalizar</span>
                </li>
              </ul>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="card-ia-sm bg-red-500/20 border-red-400/50">
                <div className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">⚠️</span>
                  <div>
                    <h4 className="text-red-200 font-bold mb-2">Ops! Algo deu errado</h4>
                    <p className="text-red-200/90">{error}</p>
                    <p className="text-red-200/70 text-sm mt-2">
                      Verifique sua conexão e tente novamente. Se o problema persistir, aguarde alguns minutos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleIniciarSimulado}
                disabled={loading}
                className="btn-ia flex-1 py-5 text-lg flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="spinner-ia w-5 h-5 border-2"></div>
                    <span>Carregando questões...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Iniciar Simulado</span>
                  </>
                )}
              </button>

              <button
                onClick={() => router.push('/enem')}
                className="btn-ia-secondary py-5 text-lg sm:w-auto"
              >
                ← Voltar
              </button>
            </div>
          </div>
        </div>

        {/* Card de Estatísticas Rápidas (opcional) */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="stat-ia">
            <span className="stat-ia-value">10.3k+</span>
            <span className="stat-ia-label">Questões</span>
          </div>
          <div className="stat-ia">
            <span className="stat-ia-value">100%</span>
            <span className="stat-ia-label">ENEM Real</span>
          </div>
          <div className="stat-ia">
            <span className="stat-ia-value">TRI</span>
            <span className="stat-ia-label">Nota Oficial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
