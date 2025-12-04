const fs = require('fs');

const content = `'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface Questao {
  id: number;
  area: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
}

interface SimuladoData {
  id: string;
  questoes: Questao[];
  respostas: { [key: number]: number };
  questaoAtual: number;
  inicio: string;
  area: string;
  quantidade: number;
}

export default function SimuladoPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const simuladoId = params.id as string;

  const [simulado, setSimulado] = useState<SimuladoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  useEffect(() => {
    const simuladoSalvo = localStorage.getItem('simulado_em_andamento');

    if (!simuladoSalvo) {
      setError('Simulado não encontrado. Inicie um novo simulado.');
      setLoading(false);
      return;
    }

    try {
      const data: SimuladoData = JSON.parse(simuladoSalvo);

      if (data.id !== simuladoId) {
        setError('ID do simulado não corresponde.');
        setLoading(false);
        return;
      }

      setSimulado(data);
    } catch (e) {
      setError('Erro ao carregar simulado.');
    }
    setLoading(false);
  }, [simuladoId]);

  const questaoAtual = simulado?.questoes[simulado.questaoAtual];
  const indiceAtual = simulado?.questaoAtual ?? 0;
  const totalQuestoes = simulado?.questoes.length ?? 0;
  const respostaMarcada = questaoAtual ? simulado?.respostas[questaoAtual.id] : undefined;

  const marcarAlternativa = (alternativaIndex: number) => {
    if (!simulado || !questaoAtual) return;

    const novasRespostas = { ...simulado.respostas, [questaoAtual.id]: alternativaIndex };
    const simuladoAtualizado = { ...simulado, respostas: novasRespostas };

    setSimulado(simuladoAtualizado);
    localStorage.setItem('simulado_em_andamento', JSON.stringify(simuladoAtualizado));
  };

  const irParaQuestao = (indice: number) => {
    if (!simulado || indice < 0 || indice >= totalQuestoes) return;

    const simuladoAtualizado = { ...simulado, questaoAtual: indice };
    setSimulado(simuladoAtualizado);
    localStorage.setItem('simulado_em_andamento', JSON.stringify(simuladoAtualizado));
  };

  const finalizarSimulado = () => {
    if (!simulado) return;

    const respondidas = Object.keys(simulado.respostas).length;
    const confirmacao = confirm(
      \`Você respondeu \${respondidas} de \${totalQuestoes} questões.\\n\\nDeseja realmente finalizar o simulado?\`
    );

    if (!confirmacao) return;

    let acertos = 0;
    const detalhes: any[] = [];

    simulado.questoes.forEach(q => {
      const resposta = simulado.respostas[q.id];
      const acertou = resposta === q.correta;
      if (acertou) acertos++;

      detalhes.push({
        id: q.id,
        area: q.area,
        enunciado: q.enunciado,
        alternativas: q.alternativas,
        correta: q.correta,
        respostaUsuario: resposta,
        acertou,
        explicacao: q.explicacao
      });
    });

    const nota = Math.round((acertos / totalQuestoes) * 1000);
    const tempoGasto = Math.round((Date.now() - new Date(simulado.inicio).getTime()) / 60000);

    const resultado = {
      id: simulado.id,
      acertos,
      total: totalQuestoes,
      nota,
      tempoMinutos: tempoGasto,
      area: simulado.area,
      detalhes,
      data: new Date().toISOString()
    };

    localStorage.setItem('ultimo_resultado_simulado', JSON.stringify(resultado));

    const historicoStr = localStorage.getItem('historico_simulados') || '[]';
    const historico = JSON.parse(historicoStr);
    historico.unshift({
      id: resultado.id,
      data: resultado.data,
      nota: resultado.nota,
      acertos: resultado.acertos,
      total: resultado.total,
      area: resultado.area
    });
    localStorage.setItem('historico_simulados', JSON.stringify(historico.slice(0, 20)));

    const fpAtual = parseInt(localStorage.getItem('fp_total') || '0');
    const fpGanho = acertos * 5 + (nota >= 700 ? 50 : nota >= 500 ? 25 : 10);
    localStorage.setItem('fp_total', String(fpAtual + fpGanho));

    localStorage.removeItem('simulado_em_andamento');

    setMostrarResultado(true);
  };

  if (mostrarResultado) {
    const resultadoStr = localStorage.getItem('ultimo_resultado_simulado');
    if (!resultadoStr) return null;
    const resultado = JSON.parse(resultadoStr);
    const porcentagem = Math.round((resultado.acertos / resultado.total) * 100);

    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-12 pt-20 px-4">
        <FloatingNav />
        <div className="max-w-4xl mx-auto">
          <div className="card-ia p-8 text-center mb-8">
            <h1 className="title-ia text-3xl mb-4">🎉 Simulado Finalizado!</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <div className="stat-ia">
                <div className="text-3xl font-bold text-emerald-400">{resultado.acertos}/{resultado.total}</div>
                <div className="text-gray-400 text-sm">Acertos</div>
              </div>
              <div className="stat-ia">
                <div className="text-3xl font-bold text-blue-400">{porcentagem}%</div>
                <div className="text-gray-400 text-sm">Aproveitamento</div>
              </div>
              <div className="stat-ia">
                <div className="text-3xl font-bold text-yellow-400">{resultado.nota}</div>
                <div className="text-gray-400 text-sm">Nota TRI</div>
              </div>
              <div className="stat-ia">
                <div className="text-3xl font-bold text-purple-400">{resultado.tempoMinutos}min</div>
                <div className="text-gray-400 text-sm">Tempo</div>
              </div>
            </div>

            <div className={\`p-4 rounded-lg mb-6 \${porcentagem >= 70 ? 'bg-emerald-500/20 border border-emerald-500/50' : porcentagem >= 50 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-red-500/20 border border-red-500/50'}\`}>
              <p className="text-lg font-medium">
                {porcentagem >= 70 ? '🌟 Excelente! Continue assim!' : porcentagem >= 50 ? '💪 Bom trabalho! Pode melhorar!' : '📚 Continue estudando! Você consegue!'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => router.push('/enem/simulado')} className="btn-ia px-8">
                🔄 Novo Simulado
              </button>
              <button onClick={() => router.push('/enem')} className="py-3 px-8 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                ← Voltar ao Menu
              </button>
            </div>
          </div>

          <div className="card-ia p-6">
            <h2 className="title-ia text-xl mb-6">📋 Revisão das Questões</h2>
            <div className="space-y-6">
              {resultado.detalhes.map((d: any, idx: number) => (
                <div key={d.id} className={\`p-4 rounded-lg border-2 \${d.acertou ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}\`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={\`px-3 py-1 rounded-full text-sm font-bold \${d.acertou ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}\`}>
                      {d.acertou ? '✓' : '✗'} Q{idx + 1}
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">{d.area}</span>
                  </div>
                  <p className="text-white/90 mb-3">{d.enunciado}</p>
                  <div className="space-y-2 mb-3">
                    {d.alternativas.map((alt: string, i: number) => (
                      <div key={i} className={\`p-2 rounded text-sm \${i === d.correta ? 'bg-emerald-500/30 text-emerald-200' : i === d.respostaUsuario && !d.acertou ? 'bg-red-500/30 text-red-200' : 'text-white/60'}\`}>
                        {String.fromCharCode(65 + i)}) {alt}
                        {i === d.correta && ' ✓'}
                        {i === d.respostaUsuario && i !== d.correta && ' (sua resposta)'}
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-300 text-sm"><strong>💡 Explicação:</strong> {d.explicacao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ChalkBackToTop />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1F22] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🔄</div>
          <p className="text-white">Carregando simulado...</p>
        </div>
      </div>
    );
  }

  if (error && !simulado) {
    return (
      <div className="min-h-screen bg-[#0D1F22] flex items-center justify-center px-4">
        <FloatingNav />
        <div className="card-ia max-w-md p-6 text-center">
          <h2 className="text-red-400 text-xl font-bold mb-4">⚠️ Erro</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button onClick={() => router.push('/enem/simulado')} className="btn-ia">
            Voltar para Início
          </button>
        </div>
      </div>
    );
  }

  if (!simulado || !questaoAtual) return null;

  const progresso = Math.round((Object.keys(simulado.respostas).length / totalQuestoes) * 100);

  return (
    <div className="min-h-screen bg-[#0D1F22] text-white py-6 pt-20 px-4">
      <FloatingNav />

      <div className="max-w-4xl mx-auto mb-6">
        <div className="card-ia p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-bold text-lg">
              📝 Questão {indiceAtual + 1} de {totalQuestoes}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
              {Object.keys(simulado.respostas).length} respondidas
            </span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-300"
              style={{ width: \`\${progresso}%\` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-white/60">{progresso}% completo</span>
            <span className="text-yellow-400 font-medium">
              {totalQuestoes - Object.keys(simulado.respostas).length} restantes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card-ia p-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold">
              Q{indiceAtual + 1}
            </span>
            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm">
              {questaoAtual.area}
            </span>
          </div>

          <div className="mb-8">
            <p className="text-white text-lg leading-relaxed">
              {questaoAtual.enunciado}
            </p>
          </div>

          <div className="border-t border-white/10 my-6"></div>

          <div className="space-y-3 mb-8">
            {questaoAtual.alternativas.map((alternativa, index) => {
              const letra = String.fromCharCode(65 + index);
              const estaMarcada = respostaMarcada === index;

              return (
                <button
                  key={index}
                  onClick={() => marcarAlternativa(index)}
                  className={\`w-full text-left p-4 rounded-xl border-2 transition-all \${
                    estaMarcada
                      ? 'bg-emerald-500/20 border-emerald-400 transform scale-[1.01]'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                  }\`}
                >
                  <div className="flex items-start gap-4">
                    <span className={\`font-bold text-lg flex-shrink-0 \${
                      estaMarcada ? 'text-emerald-400' : 'text-white/60'
                    }\`}>
                      {letra})
                    </span>
                    <span className="flex-1 text-white/90 leading-relaxed">
                      {alternativa}
                    </span>
                    {estaMarcada && (
                      <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => irParaQuestao(indiceAtual - 1)}
              disabled={indiceAtual === 0}
              className={\`flex-1 py-3 px-6 rounded-lg font-medium transition-all \${
                indiceAtual === 0
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }\`}
            >
              ← Anterior
            </button>

            <button
              onClick={finalizarSimulado}
              className="py-3 px-6 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
            >
              🏁 Finalizar
            </button>

            <button
              onClick={() => irParaQuestao(indiceAtual + 1)}
              disabled={indiceAtual === totalQuestoes - 1}
              className={\`flex-1 py-3 px-6 rounded-lg font-medium transition-all \${
                indiceAtual === totalQuestoes - 1
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'btn-ia'
              }\`}
            >
              Próxima →
            </button>
          </div>

          <div className="border-t border-white/10 my-6"></div>

          <div>
            <p className="text-white/70 text-sm mb-4 font-semibold">
              🧭 Navegação Rápida
            </p>
            <div className="flex flex-wrap gap-2">
              {simulado.questoes.map((q, idx) => {
                const respondida = simulado.respostas[q.id] !== undefined;
                const atual = idx === indiceAtual;

                return (
                  <button
                    key={q.id}
                    onClick={() => irParaQuestao(idx)}
                    className={\`w-10 h-10 rounded-lg font-bold transition-all \${
                      atual
                        ? 'bg-emerald-500 text-white transform scale-110'
                        : respondida
                        ? 'bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500/50'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }\`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ChalkBackToTop />
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/enem/simulado/[id]/page.tsx', content);
console.log('Simulado player page fixed!');
