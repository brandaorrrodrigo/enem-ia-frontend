'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface QuestaoComentada {
  id: string;
  ano: number;
  disciplina: string;
  tema: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  comentario: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  visualizado: boolean;
}

export default function QuestoesComentadasPage() {
  const router = useRouter();
  const [questoes, setQuestoes] = useState<QuestaoComentada[]>([]);
  const [filtroAno, setFiltroAno] = useState('todos');
  const [filtroDisciplina, setFiltroDisciplina] = useState('todos');
  const [filtroDificuldade, setFiltroDificuldade] = useState('todos');
  const [questaoExpandida, setQuestaoExpandida] = useState<string | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const anos = ['todos', '2024', '2023', '2022', '2021', '2020', '2019'];
  const disciplinas = [
    { value: 'todos', label: 'Todas as Disciplinas', emoji: '📚' },
    { value: 'Matematica', label: 'Matematica', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', emoji: '📖' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', emoji: '🔬' },
  ];
  const dificuldades = [
    { value: 'todos', label: 'Todas', emoji: '📊' },
    { value: 'facil', label: 'Facil', emoji: '🟢' },
    { value: 'medio', label: 'Medio', emoji: '🟡' },
    { value: 'dificil', label: 'Dificil', emoji: '🔴' },
  ];

  useEffect(() => {
    carregarQuestoes();
  }, []);

  const carregarQuestoes = () => {
    const visualizados = JSON.parse(localStorage.getItem('questoes_visualizadas') || '[]');

    const questoesData: QuestaoComentada[] = [
      {
        id: '1',
        ano: 2023,
        disciplina: 'Matematica',
        tema: 'Funcoes',
        enunciado: 'Uma empresa de telefonia cobra R$ 0,50 por minuto de ligacao local. Alem disso, ha uma tarifa fixa mensal de R$ 25,00. Qual funcao representa o custo mensal C em funcao dos minutos m utilizados?',
        alternativas: [
          'C(m) = 25m + 0,50',
          'C(m) = 0,50m + 25',
          'C(m) = 25,50m',
          'C(m) = 0,50m - 25',
          'C(m) = 25 - 0,50m',
        ],
        respostaCorreta: 1,
        comentario: 'A funcao que representa o custo total e do tipo afim (1o grau), onde temos um valor fixo (R$ 25,00) somado a um valor variavel que depende dos minutos (R$ 0,50 por minuto). Assim, C(m) = 0,50m + 25, onde 0,50 e o coeficiente angular (custo por minuto) e 25 e o coeficiente linear (tarifa fixa).',
        dificuldade: 'facil',
        visualizado: visualizados.includes('1'),
      },
      {
        id: '2',
        ano: 2023,
        disciplina: 'Linguagens',
        tema: 'Interpretacao de Texto',
        enunciado: '"A leitura do mundo precede a leitura da palavra." (Paulo Freire). Neste trecho, o autor defende que:',
        alternativas: [
          'A alfabetizacao deve vir antes da vivencia social.',
          'As experiencias de vida sao base para a compreensao dos textos.',
          'A palavra escrita e mais importante que a experiencia pratica.',
          'O mundo so pode ser compreendido atraves da leitura formal.',
          'A educacao deve priorizar a leitura de livros didaticos.',
        ],
        respostaCorreta: 1,
        comentario: 'Paulo Freire, em sua pedagogia, defende que o conhecimento de mundo, as vivencias e experiencias do individuo sao fundamentais para a construcao do significado na leitura. Antes de decodificar palavras, a pessoa ja "le" o mundo atraves de suas experiencias, e essa leitura previa e essencial para dar sentido aos textos escritos.',
        dificuldade: 'medio',
        visualizado: visualizados.includes('2'),
      },
      {
        id: '3',
        ano: 2022,
        disciplina: 'Ciencias da Natureza',
        tema: 'Ecologia',
        enunciado: 'Em um ecossistema, os decompositores sao fundamentais porque:',
        alternativas: [
          'Produzem oxigenio para os demais seres vivos.',
          'Sao a base da cadeia alimentar como produtores.',
          'Transformam materia organica em inorganica, reciclando nutrientes.',
          'Consomem apenas seres vivos mortos de grande porte.',
          'Eliminam todos os residuos toxicos do ambiente.',
        ],
        respostaCorreta: 2,
        comentario: 'Os decompositores (fungos e bacterias) realizam a decomposicao da materia organica morta, transformando-a em materia inorganica. Este processo e essencial para a ciclagem de nutrientes no ecossistema, devolvendo ao solo elementos como nitrogenio, fosforo e carbono que serao reutilizados pelos produtores.',
        dificuldade: 'facil',
        visualizado: visualizados.includes('3'),
      },
      {
        id: '4',
        ano: 2022,
        disciplina: 'Ciencias Humanas',
        tema: 'Historia do Brasil',
        enunciado: 'O Quilombo dos Palmares, liderado por Zumbi, representou:',
        alternativas: [
          'Uma alianca entre escravizados e senhores de engenho.',
          'A principal forma de resistencia escrava no periodo colonial.',
          'Um movimento apoiado pela Coroa Portuguesa.',
          'Uma revolta que teve apoio da Igreja Catolica.',
          'Um acordo pacifico entre africanos e europeus.',
        ],
        respostaCorreta: 1,
        comentario: 'O Quilombo dos Palmares (atual Alagoas) foi a maior e mais duradoura comunidade de resistencia escrava no Brasil colonial, existindo por quase um seculo (1597-1694). Representou a luta dos africanos escravizados por liberdade e dignidade, sendo um simbolo de resistencia contra o sistema escravista. Zumbi tornou-se lider em 1678 e resistiu ate 1695.',
        dificuldade: 'medio',
        visualizado: visualizados.includes('4'),
      },
      {
        id: '5',
        ano: 2021,
        disciplina: 'Matematica',
        tema: 'Geometria',
        enunciado: 'Um terreno retangular tem perimetro de 100 metros. Se o comprimento e o dobro da largura, qual e a area desse terreno?',
        alternativas: [
          '400 m2',
          '500 m2',
          '555,56 m2',
          '600 m2',
          '625 m2',
        ],
        respostaCorreta: 2,
        comentario: 'Sendo L a largura e C o comprimento, temos: C = 2L (comprimento e dobro da largura). O perimetro e: 2L + 2C = 100. Substituindo: 2L + 2(2L) = 100 => 2L + 4L = 100 => 6L = 100 => L = 16,67m. Logo, C = 2 x 16,67 = 33,33m. A area e: A = L x C = 16,67 x 33,33 = 555,56 m2.',
        dificuldade: 'dificil',
        visualizado: visualizados.includes('5'),
      },
      {
        id: '6',
        ano: 2021,
        disciplina: 'Ciencias da Natureza',
        tema: 'Fisica',
        enunciado: 'Um carro percorre 120 km em 2 horas. Sua velocidade media e:',
        alternativas: [
          '40 km/h',
          '50 km/h',
          '60 km/h',
          '70 km/h',
          '80 km/h',
        ],
        respostaCorreta: 2,
        comentario: 'A velocidade media e calculada pela razao entre a distancia percorrida e o tempo gasto. Vm = d/t = 120 km / 2 h = 60 km/h. E importante lembrar que a velocidade media nao considera variacoes de velocidade durante o percurso, apenas a relacao total distancia/tempo.',
        dificuldade: 'facil',
        visualizado: visualizados.includes('6'),
      },
    ];

    setQuestoes(questoesData);
    setLoading(false);
  };

  const marcarVisualizado = (id: string) => {
    const visualizados = JSON.parse(localStorage.getItem('questoes_visualizadas') || '[]');
    if (!visualizados.includes(id)) {
      visualizados.push(id);
      localStorage.setItem('questoes_visualizadas', JSON.stringify(visualizados));
    }

    const novasQuestoes = questoes.map(q =>
      q.id === id ? { ...q, visualizado: true } : q
    );
    setQuestoes(novasQuestoes);
  };

  const toggleQuestao = (id: string) => {
    if (questaoExpandida === id) {
      setQuestaoExpandida(null);
      setMostrarResposta(null);
    } else {
      setQuestaoExpandida(id);
      setMostrarResposta(null);
      marcarVisualizado(id);
    }
  };

  const getDificuldadeColor = (dif: string): string => {
    switch (dif) {
      case 'facil': return 'bg-green-500/20 text-green-300 border-green-500';
      case 'medio': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'dificil': return 'bg-red-500/20 text-red-300 border-red-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const getDificuldadeEmoji = (dif: string): string => {
    switch (dif) {
      case 'facil': return '🟢';
      case 'medio': return '🟡';
      case 'dificil': return '🔴';
      default: return '⚪';
    }
  };

  const questoesFiltradas = questoes.filter(q => {
    const matchAno = filtroAno === 'todos' || q.ano.toString() === filtroAno;
    const matchDisciplina = filtroDisciplina === 'todos' || q.disciplina === filtroDisciplina;
    const matchDificuldade = filtroDificuldade === 'todos' || q.dificuldade === filtroDificuldade;
    return matchAno && matchDisciplina && matchDificuldade;
  });

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando questoes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Header */}


      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          💬 Questoes Comentadas
        </h1>
        <p className="subtitle-ia mb-0">
          Questoes do ENEM com resolucao detalhada e comentarios
        </p>
      </div>

      {/* Filtros */}
      <div className="card-ia mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">📅 Ano</label>
            <select
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              className="input-ia w-full"
            >
              {anos.map((ano) => (
                <option key={ano} value={ano}>
                  {ano === 'todos' ? 'Todos os Anos' : `ENEM ${ano}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">📚 Disciplina</label>
            <select
              value={filtroDisciplina}
              onChange={(e) => setFiltroDisciplina(e.target.value)}
              className="input-ia w-full"
            >
              {disciplinas.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">📊 Dificuldade</label>
            <select
              value={filtroDificuldade}
              onChange={(e) => setFiltroDificuldade(e.target.value)}
              className="input-ia w-full"
            >
              {dificuldades.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Estatisticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{questoes.length}</span>
          <span className="stat-ia-label">💬 Questoes</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{questoes.filter(q => q.visualizado).length}</span>
          <span className="stat-ia-label">✅ Estudadas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{questoes.filter(q => q.dificuldade === 'dificil').length}</span>
          <span className="stat-ia-label">🔴 Dificeis</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{new Set(questoes.map(q => q.ano)).size}</span>
          <span className="stat-ia-label">📅 Anos</span>
        </div>
      </div>

      {/* Lista de Questoes */}
      {questoesFiltradas.length === 0 ? (
        <div className="card-ia text-center py-12">
          <div className="text-8xl mb-6">💬</div>
          <h3 className="text-white text-xl font-bold mb-3">Nenhuma questao encontrada</h3>
          <p className="text-white/70">Tente ajustar seus filtros.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questoesFiltradas.map((questao) => (
            <div
              key={questao.id}
              className={`card-ia transition-all ${questao.visualizado ? 'border-l-4 border-l-green-500' : ''}`}
            >
              {/* Header da Questao */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleQuestao(questao.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getDificuldadeColor(questao.dificuldade)}`}>
                    {getDificuldadeEmoji(questao.dificuldade)} {questao.dificuldade.toUpperCase()}
                  </div>
                  <span className="badge-ia">{questao.disciplina}</span>
                  <span className="text-white/60 text-sm">ENEM {questao.ano}</span>
                </div>

                <div className="flex items-center gap-3">
                  {questao.visualizado && (
                    <span className="text-green-400 text-sm">✅ Estudada</span>
                  )}
                  <span className="text-2xl text-white/60">
                    {questaoExpandida === questao.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {/* Tema */}
              <p className="text-yellow-300 text-sm mt-3 font-semibold">📌 {questao.tema}</p>

              {/* Conteudo Expandido */}
              {questaoExpandida === questao.id && (
                <div className="mt-6 space-y-6">
                  {/* Enunciado */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white leading-relaxed">{questao.enunciado}</p>
                  </div>

                  {/* Alternativas */}
                  <div className="space-y-2">
                    {questao.alternativas.map((alt, idx) => {
                      const letra = String.fromCharCode(65 + idx);
                      const isCorreta = idx === questao.respostaCorreta;
                      const mostrar = mostrarResposta === questao.id;

                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border-2 transition ${
                            mostrar && isCorreta
                              ? 'bg-green-500/20 border-green-500'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <span className="font-bold text-yellow-300 mr-3">{letra})</span>
                          <span className="text-white">{alt}</span>
                          {mostrar && isCorreta && (
                            <span className="ml-2 text-green-400">✓ Correta</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Botao Ver Resposta */}
                  {mostrarResposta !== questao.id ? (
                    <button
                      onClick={() => setMostrarResposta(questao.id)}
                      className="btn-ia w-full"
                    >
                      👁️ Ver Resposta e Comentario
                    </button>
                  ) : (
                    /* Comentario */
                    <div className="bg-yellow-300/10 border-2 border-yellow-300/30 rounded-xl p-6">
                      <h4 className="text-yellow-300 font-bold mb-3 flex items-center gap-2">
                        💡 Comentario do Professor
                      </h4>
                      <p className="text-white leading-relaxed">{questao.comentario}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ChalkBackToTop />
    </div>
  );
}
