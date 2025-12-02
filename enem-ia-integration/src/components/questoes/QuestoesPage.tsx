'use client';

import { useState, useEffect } from 'react';
import { QuestoesService, Questao } from '@/lib/api';
import { useToast } from '@/hooks';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  Award,
  Lightbulb,
  Filter,
  X,
} from 'lucide-react';

export default function QuestoesPage() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Filtros
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    materia: '',
    dificuldade: '',
  });

  const { addToast } = useToast();

  const materias = [
    'Matemática',
    'Português',
    'Física',
    'Química',
    'Biologia',
    'História',
    'Geografia',
    'Inglês',
    'Filosofia',
    'Sociologia',
  ];

  const dificuldades = ['facil', 'media', 'dificil'];

  useEffect(() => {
    loadQuestoes();
  }, [filters]);

  const loadQuestoes = async () => {
    try {
      setLoading(true);
      const data = await QuestoesService.getQuestoes({
        materia: filters.materia || undefined,
        dificuldade: filters.dificuldade || undefined,
        limite: 20,
      });
      setQuestoes(data);
      setCurrentIndex(0);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setStartTime(Date.now());
    } catch (error) {
      addToast('Erro ao carregar questões', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async () => {
    if (!selectedAnswer || isAnswered) return;

    const questao = questoes[currentIndex];
    const tempoResposta = Math.floor((Date.now() - startTime) / 1000);

    try {
      const result = await QuestoesService.responderQuestao(
        questao.id,
        selectedAnswer
      );

      setResultado(result);
      setIsAnswered(true);
      setShowExplanation(true);

      if (result.correto) {
        setAcertos((prev) => prev + 1);
        setPontos((prev) => prev + result.pontos);
        addToast(
          `Correto! +${result.pontos} pontos (${tempoResposta}s)`,
          'success'
        );
      } else {
        setErros((prev) => prev + 1);
        addToast('Resposta incorreta. Veja a explicação!', 'error');
      }
    } catch (error) {
      addToast('Erro ao processar resposta', 'error');
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questoes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setResultado(null);
      setShowExplanation(false);
      setStartTime(Date.now());
    } else {
      // Fim das questões
      addToast('Você completou todas as questões!', 'success');
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setResultado(null);
      setShowExplanation(false);
      setStartTime(Date.now());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (questoes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nenhuma questão encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            Tente ajustar os filtros ou volte mais tarde
          </p>
          <button
            onClick={() => setFilters({ materia: '', dificuldade: '' })}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    );
  }

  const questao = questoes[currentIndex];
  const progresso = ((currentIndex + 1) / questoes.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Resolver Questões
                </h1>
                <p className="text-sm text-gray-600">
                  Questão {currentIndex + 1} de {questoes.length}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>
          </div>

          {/* Barra de Progresso */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filtrar Questões</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matéria
                </label>
                <select
                  value={filters.materia}
                  onChange={(e) =>
                    setFilters({ ...filters, materia: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas as matérias</option>
                  {materias.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificuldade
                </label>
                <select
                  value={filters.dificuldade}
                  onChange={(e) =>
                    setFilters({ ...filters, dificuldade: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas</option>
                  <option value="facil">Fácil</option>
                  <option value="media">Média</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{pontos}</p>
                <p className="text-xs text-gray-600">Pontos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{acertos}</p>
                <p className="text-xs text-gray-600">Acertos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{erros}</p>
                <p className="text-xs text-gray-600">Erros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card da Questão */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header da Questão */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {questao.materia}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    questao.dificuldade === 'facil'
                      ? 'bg-green-500/20'
                      : questao.dificuldade === 'media'
                      ? 'bg-yellow-500/20'
                      : 'bg-red-500/20'
                  }`}
                >
                  {questao.dificuldade === 'facil'
                    ? 'Fácil'
                    : questao.dificuldade === 'media'
                    ? 'Média'
                    : 'Difícil'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {Math.floor((Date.now() - startTime) / 1000)}s
                </span>
              </div>
            </div>
            {questao.assunto && (
              <p className="text-sm opacity-90">{questao.assunto}</p>
            )}
          </div>

          {/* Enunciado */}
          <div className="p-6">
            {questao.imagem_url && (
              <div className="mb-6 rounded-xl overflow-hidden">
                <img
                  src={questao.imagem_url}
                  alt="Imagem da questão"
                  className="w-full"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-900 leading-relaxed">
                {questao.enunciado}
              </p>
            </div>

            {/* Alternativas */}
            <div className="space-y-3">
              {Object.entries(questao.alternativas).map(([letra, texto]) => {
                const isSelected = selectedAnswer === letra;
                const isCorrect =
                  isAnswered && letra === questao.resposta_correta;
                const isWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={letra}
                    onClick={() => !isAnswered && setSelectedAnswer(letra)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isWrong
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          isCorrect
                            ? 'bg-green-500 text-white'
                            : isWrong
                            ? 'bg-red-500 text-white'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {letra}
                      </div>
                      <p className="flex-1 text-gray-900 pt-1">{texto}</p>
                      {isCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {isWrong && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Botão Responder */}
            {!isAnswered && (
              <button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirmar Resposta
              </button>
            )}

            {/* Explicação */}
            {showExplanation && resultado && (
              <div
                className={`mt-6 p-6 rounded-xl ${
                  resultado.correto ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      resultado.correto ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {resultado.correto
                        ? '🎉 Parabéns! Resposta Correta'
                        : '📚 Entenda o erro'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {questao.explicacao || resultado.explicacao}
                    </p>
                  </div>
                </div>

                {questao.tags && questao.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {questao.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white rounded-full text-sm text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - Navegação */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <button
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Questão {currentIndex + 1} de {questoes.length}
              </p>
            </div>

            <button
              onClick={nextQuestion}
              disabled={!isAnswered || currentIndex === questoes.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
