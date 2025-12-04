'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface Flashcard {
  id: string;
  frente: string;
  verso: string;
  categoria: string;
  subcategoria: string;
  nivel: number;
  ultimaRevisao: string | null;
  proximaRevisao: string;
  acertos: number;
  erros: number;
}

interface Deck {
  id: string;
  nome: string;
  categoria: string;
  icone: string;
  cor: string;
  cards: Flashcard[];
  totalCards: number;
  cardsParaRevisar: number;
}

const flashcardsIniciais: Omit<Flashcard, 'nivel' | 'ultimaRevisao' | 'proximaRevisao' | 'acertos' | 'erros'>[] = [
  // Matemática
  { id: 'mat-1', frente: 'Qual é a fórmula de Bhaskara?', verso: 'x = (-b ± √(b² - 4ac)) / 2a', categoria: 'matematica', subcategoria: 'Álgebra' },
  { id: 'mat-2', frente: 'Área do círculo', verso: 'A = π × r²', categoria: 'matematica', subcategoria: 'Geometria' },
  { id: 'mat-3', frente: 'Teorema de Pitágoras', verso: 'a² = b² + c² (hipotenusa² = cateto² + cateto²)', categoria: 'matematica', subcategoria: 'Geometria' },
  { id: 'mat-4', frente: 'Volume da esfera', verso: 'V = (4/3) × π × r³', categoria: 'matematica', subcategoria: 'Geometria Espacial' },
  { id: 'mat-5', frente: 'Fórmula da progressão aritmética (termo geral)', verso: 'an = a1 + (n-1) × r', categoria: 'matematica', subcategoria: 'Sequências' },
  { id: 'mat-6', frente: 'Soma dos ângulos internos de um polígono', verso: 'S = (n-2) × 180°', categoria: 'matematica', subcategoria: 'Geometria' },
  { id: 'mat-7', frente: 'Probabilidade de um evento', verso: 'P(E) = casos favoráveis / casos possíveis', categoria: 'matematica', subcategoria: 'Probabilidade' },
  { id: 'mat-8', frente: 'Média aritmética', verso: 'M = (x1 + x2 + ... + xn) / n', categoria: 'matematica', subcategoria: 'Estatística' },

  // Física
  { id: 'fis-1', frente: 'Segunda Lei de Newton', verso: 'F = m × a (Força = massa × aceleração)', categoria: 'natureza', subcategoria: 'Física' },
  { id: 'fis-2', frente: 'Velocidade média', verso: 'Vm = ΔS / Δt (deslocamento / tempo)', categoria: 'natureza', subcategoria: 'Física' },
  { id: 'fis-3', frente: 'Energia cinética', verso: 'Ec = (m × v²) / 2', categoria: 'natureza', subcategoria: 'Física' },
  { id: 'fis-4', frente: 'Lei de Ohm', verso: 'U = R × i (tensão = resistência × corrente)', categoria: 'natureza', subcategoria: 'Física' },
  { id: 'fis-5', frente: 'Potência elétrica', verso: 'P = U × i = R × i²', categoria: 'natureza', subcategoria: 'Física' },

  // Química
  { id: 'qui-1', frente: 'Número de Avogadro', verso: '6,02 × 10²³ mol⁻¹', categoria: 'natureza', subcategoria: 'Química' },
  { id: 'qui-2', frente: 'Fórmula da densidade', verso: 'd = m / V (massa / volume)', categoria: 'natureza', subcategoria: 'Química' },
  { id: 'qui-3', frente: 'pH neutro', verso: 'pH = 7 (a 25°C)', categoria: 'natureza', subcategoria: 'Química' },
  { id: 'qui-4', frente: 'Ligação iônica ocorre entre...', verso: 'Metal e não-metal (transferência de elétrons)', categoria: 'natureza', subcategoria: 'Química' },

  // Biologia
  { id: 'bio-1', frente: 'Organela responsável pela respiração celular', verso: 'Mitocôndria', categoria: 'natureza', subcategoria: 'Biologia' },
  { id: 'bio-2', frente: 'Processo de divisão celular que gera células idênticas', verso: 'Mitose', categoria: 'natureza', subcategoria: 'Biologia' },
  { id: 'bio-3', frente: 'Fórmula da fotossíntese', verso: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', categoria: 'natureza', subcategoria: 'Biologia' },
  { id: 'bio-4', frente: 'Estrutura do DNA', verso: 'Dupla hélice com bases nitrogenadas (A-T, C-G)', categoria: 'natureza', subcategoria: 'Biologia' },

  // História
  { id: 'his-1', frente: 'Ano da Independência do Brasil', verso: '1822 (7 de setembro)', categoria: 'humanas', subcategoria: 'História' },
  { id: 'his-2', frente: 'Ano da Proclamação da República', verso: '1889 (15 de novembro)', categoria: 'humanas', subcategoria: 'História' },
  { id: 'his-3', frente: 'Revolução Francesa - ano', verso: '1789', categoria: 'humanas', subcategoria: 'História' },
  { id: 'his-4', frente: 'Período do Estado Novo no Brasil', verso: '1937 a 1945 (Era Vargas)', categoria: 'humanas', subcategoria: 'História' },
  { id: 'his-5', frente: 'Golpe Militar no Brasil', verso: '1964 (31 de março)', categoria: 'humanas', subcategoria: 'História' },

  // Geografia
  { id: 'geo-1', frente: 'Maior bioma brasileiro', verso: 'Amazônia (cerca de 49% do território)', categoria: 'humanas', subcategoria: 'Geografia' },
  { id: 'geo-2', frente: 'Camadas da atmosfera (da superfície para cima)', verso: 'Troposfera, Estratosfera, Mesosfera, Termosfera, Exosfera', categoria: 'humanas', subcategoria: 'Geografia' },
  { id: 'geo-3', frente: 'BRICS - países membros', verso: 'Brasil, Rússia, Índia, China, África do Sul', categoria: 'humanas', subcategoria: 'Geografia' },

  // Filosofia
  { id: 'fil-1', frente: '"Penso, logo existo" - autor', verso: 'René Descartes', categoria: 'humanas', subcategoria: 'Filosofia' },
  { id: 'fil-2', frente: 'Alegoria da Caverna - autor', verso: 'Platão', categoria: 'humanas', subcategoria: 'Filosofia' },
  { id: 'fil-3', frente: 'Conceito de "Vontade de Poder"', verso: 'Friedrich Nietzsche', categoria: 'humanas', subcategoria: 'Filosofia' },

  // Sociologia
  { id: 'soc-1', frente: 'Pai da Sociologia', verso: 'Auguste Comte', categoria: 'humanas', subcategoria: 'Sociologia' },
  { id: 'soc-2', frente: 'Conceito de "Fato Social" - autor', verso: 'Émile Durkheim', categoria: 'humanas', subcategoria: 'Sociologia' },
  { id: 'soc-3', frente: '"Modernidade Líquida" - autor', verso: 'Zygmunt Bauman', categoria: 'humanas', subcategoria: 'Sociologia' },

  // Português
  { id: 'por-1', frente: 'Figuras de linguagem: comparação implícita', verso: 'Metáfora', categoria: 'linguagens', subcategoria: 'Português' },
  { id: 'por-2', frente: 'Figura de linguagem: exagero', verso: 'Hipérbole', categoria: 'linguagens', subcategoria: 'Português' },
  { id: 'por-3', frente: 'Função da linguagem centrada no emissor', verso: 'Função Emotiva', categoria: 'linguagens', subcategoria: 'Português' },
  { id: 'por-4', frente: 'Tipos de sujeito', verso: 'Simples, Composto, Oculto, Indeterminado, Inexistente', categoria: 'linguagens', subcategoria: 'Português' },

  // Literatura
  { id: 'lit-1', frente: 'Autor de "Dom Casmurro"', verso: 'Machado de Assis', categoria: 'linguagens', subcategoria: 'Literatura' },
  { id: 'lit-2', frente: 'Principal obra do Romantismo brasileiro', verso: '"Iracema" ou "O Guarani" - José de Alencar', categoria: 'linguagens', subcategoria: 'Literatura' },
  { id: 'lit-3', frente: 'Semana de Arte Moderna - ano', verso: '1922', categoria: 'linguagens', subcategoria: 'Literatura' },

  // Redação
  { id: 'red-1', frente: 'Competência 1 da Redação ENEM', verso: 'Domínio da norma culta da língua escrita', categoria: 'redacao', subcategoria: 'Redação' },
  { id: 'red-2', frente: 'Competência 5 da Redação ENEM', verso: 'Proposta de intervenção para o problema', categoria: 'redacao', subcategoria: 'Redação' },
  { id: 'red-3', frente: 'Elementos da proposta de intervenção (5)', verso: 'Agente, Ação, Meio, Finalidade, Detalhamento', categoria: 'redacao', subcategoria: 'Redação' }
];

const decksConfig = [
  { id: 'matematica', nome: 'Matemática', icone: '📐', cor: 'from-cyan-500 to-cyan-700' },
  { id: 'natureza', nome: 'Ciências da Natureza', icone: '🔬', cor: 'from-green-500 to-green-700' },
  { id: 'humanas', nome: 'Ciências Humanas', icone: '🌍', cor: 'from-yellow-500 to-yellow-700' },
  { id: 'linguagens', nome: 'Linguagens', icone: '📚', cor: 'from-purple-500 to-purple-700' },
  { id: 'redacao', nome: 'Redação', icone: '✍️', cor: 'from-pink-500 to-pink-700' }
];

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [deckSelecionado, setDeckSelecionado] = useState<string | null>(null);
  const [cardAtual, setCardAtual] = useState<number>(0);
  const [mostrarVerso, setMostrarVerso] = useState(false);
  const [modoEstudo, setModoEstudo] = useState(false);
  const [cardsParaRevisar, setCardsParaRevisar] = useState<Flashcard[]>([]);
  const [estatisticasSessao, setEstatisticasSessao] = useState({ acertos: 0, erros: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('enem-flashcards');
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      // Inicializar cards
      const cardsInicializados: Flashcard[] = flashcardsIniciais.map(card => ({
        ...card,
        nivel: 0,
        ultimaRevisao: null,
        proximaRevisao: new Date().toISOString(),
        acertos: 0,
        erros: 0
      }));
      setCards(cardsInicializados);
      localStorage.setItem('enem-flashcards', JSON.stringify(cardsInicializados));
    }
  }, []);

  const calcularProximaRevisao = (nivel: number): string => {
    const intervalos = [1, 2, 4, 7, 15, 30, 60, 120]; // dias
    const dias = intervalos[Math.min(nivel, intervalos.length - 1)];
    const proxima = new Date();
    proxima.setDate(proxima.getDate() + dias);
    return proxima.toISOString();
  };

  const getDecks = (): Deck[] => {
    const hoje = new Date().toISOString();
    return decksConfig.map(config => {
      const deckCards = cards.filter(c => c.categoria === config.id);
      const paraRevisar = deckCards.filter(c => c.proximaRevisao <= hoje);
      return {
        ...config,
        categoria: config.id,
        cards: deckCards,
        totalCards: deckCards.length,
        cardsParaRevisar: paraRevisar.length
      };
    });
  };

  const iniciarEstudo = (deckId: string) => {
    const hoje = new Date().toISOString();
    const deckCards = cards.filter(c => c.categoria === deckId && c.proximaRevisao <= hoje);

    if (deckCards.length === 0) {
      // Se não há cards para revisar, pegar todos do deck
      const todosCards = cards.filter(c => c.categoria === deckId);
      setCardsParaRevisar(todosCards.slice(0, 10));
    } else {
      setCardsParaRevisar(deckCards.slice(0, 10));
    }

    setDeckSelecionado(deckId);
    setModoEstudo(true);
    setCardAtual(0);
    setMostrarVerso(false);
    setEstatisticasSessao({ acertos: 0, erros: 0 });
  };

  const responderCard = (acertou: boolean) => {
    const card = cardsParaRevisar[cardAtual];
    const novoNivel = acertou ? Math.min(card.nivel + 1, 7) : Math.max(card.nivel - 1, 0);

    const cardAtualizado: Flashcard = {
      ...card,
      nivel: novoNivel,
      ultimaRevisao: new Date().toISOString(),
      proximaRevisao: calcularProximaRevisao(novoNivel),
      acertos: acertou ? card.acertos + 1 : card.acertos,
      erros: acertou ? card.erros : card.erros + 1
    };

    const novosCards = cards.map(c => c.id === card.id ? cardAtualizado : c);
    setCards(novosCards);
    localStorage.setItem('enem-flashcards', JSON.stringify(novosCards));

    setEstatisticasSessao(prev => ({
      acertos: acertou ? prev.acertos + 1 : prev.acertos,
      erros: acertou ? prev.erros : prev.erros + 1
    }));

    // Próximo card
    if (cardAtual < cardsParaRevisar.length - 1) {
      setCardAtual(prev => prev + 1);
      setMostrarVerso(false);
    } else {
      // Fim da sessão
      setModoEstudo(false);
    }
  };

  const finalizarEstudo = () => {
    setModoEstudo(false);
    setDeckSelecionado(null);
    setCardsParaRevisar([]);
    setEstatisticasSessao({ acertos: 0, erros: 0 });
  };

  const estatisticasGerais = {
    totalCards: cards.length,
    dominados: cards.filter(c => c.nivel >= 5).length,
    paraRevisar: cards.filter(c => c.proximaRevisao <= new Date().toISOString()).length,
    taxaAcerto: cards.reduce((acc, c) => acc + c.acertos, 0) > 0
      ? Math.round((cards.reduce((acc, c) => acc + c.acertos, 0) /
          (cards.reduce((acc, c) => acc + c.acertos + c.erros, 0))) * 100)
      : 0
  };

  const decks = getDecks();

  if (modoEstudo && cardsParaRevisar.length > 0) {
    const card = cardsParaRevisar[cardAtual];
    const progresso = ((cardAtual + 1) / cardsParaRevisar.length) * 100;
    const deckAtual = decksConfig.find(d => d.id === deckSelecionado);

    return (
      <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
        <FloatingNav />

        <div className="container-ia py-8 max-w-2xl mx-auto">
          {/* Header do Estudo */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={finalizarEstudo}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Voltar
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-400">{deckAtual?.nome}</span>
              <div className="font-bold">{cardAtual + 1} / {cardsParaRevisar.length}</div>
            </div>
            <div className="text-right text-sm">
              <span className="text-emerald-400">✓ {estatisticasSessao.acertos}</span>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-red-400">✗ {estatisticasSessao.erros}</span>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="progress-ia mb-8">
            <div
              className="progress-bar-ia bg-gradient-to-r from-emerald-500 to-emerald-700"
              style={{ width: `${progresso}%` }}
            />
          </div>

          {/* Card */}
          <div
            className={`card-ia p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              mostrarVerso ? 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/30' : ''
            }`}
            onClick={() => setMostrarVerso(!mostrarVerso)}
          >
            <div className="text-xs text-gray-400 mb-4">
              {card.subcategoria} • Nível {card.nivel}/7
            </div>

            {!mostrarVerso ? (
              <>
                <div className="text-4xl mb-4">❓</div>
                <p className="text-xl text-center font-medium">{card.frente}</p>
                <p className="text-sm text-gray-400 mt-6">Toque para ver a resposta</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">💡</div>
                <p className="text-xl text-center font-medium text-emerald-400">{card.verso}</p>
              </>
            )}
          </div>

          {/* Botões de Resposta */}
          {mostrarVerso && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => responderCard(false)}
                className="flex-1 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-400 font-medium transition-colors"
              >
                😕 Errei
              </button>
              <button
                onClick={() => responderCard(true)}
                className="flex-1 py-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-xl text-emerald-400 font-medium transition-colors"
              >
                😊 Acertei
              </button>
            </div>
          )}

          {/* Dica */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>💡 A revisão espaçada ajusta o intervalo baseado no seu desempenho.</p>
            <p>Quanto mais você acerta, maior o intervalo até a próxima revisão!</p>
          </div>
        </div>
      </main>
    );
  }

  // Tela de resultado da sessão
  if (!modoEstudo && estatisticasSessao.acertos + estatisticasSessao.erros > 0) {
    const total = estatisticasSessao.acertos + estatisticasSessao.erros;
    const taxa = Math.round((estatisticasSessao.acertos / total) * 100);

    return (
      <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
        <FloatingNav />
        <ChalkBackToTop />

        <div className="container-ia py-8 max-w-lg mx-auto">
          <div className="card-ia p-8 text-center">
            <div className="text-6xl mb-4">
              {taxa >= 80 ? '🎉' : taxa >= 50 ? '👍' : '💪'}
            </div>
            <h2 className="text-2xl font-bold mb-2">Sessão Concluída!</h2>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-emerald-500/20 rounded-lg p-4">
                <div className="text-3xl font-bold text-emerald-400">{estatisticasSessao.acertos}</div>
                <div className="text-sm text-gray-400">Acertos</div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-400">{estatisticasSessao.erros}</div>
                <div className="text-sm text-gray-400">Erros</div>
              </div>
            </div>

            <div className="text-4xl font-bold mb-2">{taxa}%</div>
            <p className="text-gray-400 mb-6">Taxa de acerto</p>

            <p className="text-sm text-gray-300 mb-6">
              {taxa >= 80
                ? 'Excelente! Você está dominando o conteúdo!'
                : taxa >= 50
                ? 'Bom trabalho! Continue praticando para melhorar.'
                : 'Não desanime! A prática leva à perfeição.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={finalizarEstudo}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Ver Decks
              </button>
              <button
                onClick={() => deckSelecionado && iniciarEstudo(deckSelecionado)}
                className="flex-1 btn-ia py-3"
              >
                Estudar Mais
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
      <FloatingNav />
      <ChalkBackToTop />

      <div className="container-ia py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="title-ia text-3xl md:text-4xl mb-4">
            🃏 Flashcards - Revisão Espaçada
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sistema de memorização baseado em repetição espaçada.
            Quanto mais você acerta, maior o intervalo até a próxima revisão!
          </p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-emerald-400">{estatisticasGerais.totalCards}</div>
            <div className="text-gray-400 text-sm">Total de Cards</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-yellow-400">{estatisticasGerais.paraRevisar}</div>
            <div className="text-gray-400 text-sm">Para Revisar Hoje</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-purple-400">{estatisticasGerais.dominados}</div>
            <div className="text-gray-400 text-sm">Cards Dominados</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-blue-400">{estatisticasGerais.taxaAcerto}%</div>
            <div className="text-gray-400 text-sm">Taxa de Acerto</div>
          </div>
        </div>

        {/* Revisão do Dia */}
        {estatisticasGerais.paraRevisar > 0 && (
          <div className="card-ia p-6 mb-8 bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-400">📅 Revisão do Dia</h2>
                <p className="text-gray-400">
                  Você tem {estatisticasGerais.paraRevisar} cards para revisar hoje
                </p>
              </div>
              <button
                onClick={() => {
                  const hoje = new Date().toISOString();
                  const todosParaRevisar = cards.filter(c => c.proximaRevisao <= hoje);
                  setCardsParaRevisar(todosParaRevisar.slice(0, 20));
                  setModoEstudo(true);
                  setCardAtual(0);
                  setMostrarVerso(false);
                  setEstatisticasSessao({ acertos: 0, erros: 0 });
                  setDeckSelecionado('todos');
                }}
                className="btn-ia"
              >
                🚀 Revisar Agora
              </button>
            </div>
          </div>
        )}

        {/* Grid de Decks */}
        <h2 className="text-xl font-bold mb-4">📚 Seus Decks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map(deck => (
            <div
              key={deck.id}
              className="card-ia overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <div className={`bg-gradient-to-r ${deck.cor} p-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{deck.icone}</span>
                  {deck.cardsParaRevisar > 0 && (
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                      {deck.cardsParaRevisar} para revisar
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mt-2">{deck.nome}</h3>
              </div>

              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>📝 {deck.totalCards} cards</span>
                  <span>✅ {cards.filter(c => c.categoria === deck.id && c.nivel >= 5).length} dominados</span>
                </div>

                <div className="progress-ia mb-4">
                  <div
                    className={`progress-bar-ia bg-gradient-to-r ${deck.cor}`}
                    style={{
                      width: `${deck.totalCards > 0
                        ? (cards.filter(c => c.categoria === deck.id && c.nivel >= 5).length / deck.totalCards) * 100
                        : 0}%`
                    }}
                  />
                </div>

                <button
                  onClick={() => iniciarEstudo(deck.id)}
                  className="w-full btn-ia py-2"
                >
                  {deck.cardsParaRevisar > 0 ? '📖 Revisar' : '🎯 Estudar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Como Funciona */}
        <div className="mt-12 card-ia p-6">
          <h2 className="text-xl font-bold mb-4">🧠 Como Funciona a Revisão Espaçada</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-bold text-emerald-400 mb-2">Estude o Card</h3>
              <p className="text-sm text-gray-400">
                Veja a pergunta e tente lembrar a resposta antes de revelar.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Avalie-se</h3>
              <p className="text-sm text-gray-400">
                Indique se acertou ou errou. Seja honesto para melhor resultado!
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Revisão Inteligente</h3>
              <p className="text-sm text-gray-400">
                O sistema agenda a próxima revisão. Acertos = intervalos maiores.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white/5 rounded-lg p-4">
            <h4 className="font-bold mb-2">📊 Intervalos de Revisão</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Nível 0: 1 dia</span>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Nível 1: 2 dias</span>
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Nível 2: 4 dias</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Nível 3: 7 dias</span>
              <span className="bg-teal-500/20 text-teal-400 px-2 py-1 rounded">Nível 4: 15 dias</span>
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Nível 5: 30 dias</span>
              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Nível 6: 60 dias</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Nível 7: 120 dias</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
