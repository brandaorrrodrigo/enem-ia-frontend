'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';

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
      <main className="min-h-screen pt-16 pb-24" style={{ backgroundColor: 'var(--chalkboard-bg)' }}>
        <FloatingNav />

        <div className="container max-w-2xl mx-auto px-4 py-8">
          {/* Header do Estudo */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={finalizarEstudo}
              className="transition-colors"
              style={{ color: 'var(--chalk-dim)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--chalk-dim)'}
            >
              ← Voltar
            </button>
            <div className="text-center">
              <span className="text-sm" style={{ color: 'var(--chalk-dim)' }}>{deckAtual?.nome}</span>
              <div className="font-bold" style={{ color: 'var(--chalk-white)' }}>{cardAtual + 1} / {cardsParaRevisar.length}</div>
            </div>
            <div className="text-right text-sm">
              <span style={{ color: 'var(--accent-green)' }}>✓ {estatisticasSessao.acertos}</span>
              <span className="mx-2" style={{ color: 'var(--chalk-dim)' }}>|</span>
              <span style={{ color: 'var(--accent-red)' }}>✗ {estatisticasSessao.erros}</span>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="h-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progresso}%`, backgroundColor: 'var(--accent-green)' }}
            />
          </div>

          {/* Card */}
          <div
            className={`chalkboard-card p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              mostrarVerso ? 'border-green-500/50' : ''
            }`}
            onClick={() => setMostrarVerso(!mostrarVerso)}
            style={mostrarVerso ? { backgroundColor: 'rgba(34, 197, 94, 0.1)' } : {}}
          >
            <div className="text-xs mb-4" style={{ color: 'var(--chalk-dim)' }}>
              {card.subcategoria} • Nível {card.nivel}/7
            </div>

            {!mostrarVerso ? (
              <>
                <div className="text-4xl mb-4">❓</div>
                <p className="text-xl text-center font-medium" style={{ color: 'var(--chalk-white)' }}>{card.frente}</p>
                <p className="text-sm mt-6" style={{ color: 'var(--chalk-dim)' }}>Toque para ver a resposta</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">💡</div>
                <p className="text-xl text-center font-medium" style={{ color: 'var(--accent-green)' }}>{card.verso}</p>
              </>
            )}
          </div>

          {/* Botões de Resposta */}
          {mostrarVerso && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => responderCard(false)}
                className="flex-1 py-4 rounded-xl font-medium transition-colors"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: 'var(--accent-red)'
                }}
              >
                😕 Errei
              </button>
              <button
                onClick={() => responderCard(true)}
                className="flex-1 py-4 rounded-xl font-medium transition-colors"
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '1px solid rgba(34, 197, 94, 0.5)',
                  color: 'var(--accent-green)'
                }}
              >
                😊 Acertei
              </button>
            </div>
          )}

          {/* Dica */}
          <div className="mt-8 text-center text-sm" style={{ color: 'var(--chalk-dim)' }}>
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
      <main className="min-h-screen pt-16 pb-24" style={{ backgroundColor: 'var(--chalkboard-bg)' }}>
        <FloatingNav />

        <div className="container max-w-lg mx-auto px-4 py-8">
          <div className="chalkboard-card p-8 text-center">
            <div className="text-6xl mb-4">
              {taxa >= 80 ? '🎉' : taxa >= 50 ? '👍' : '💪'}
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--chalk-white)' }}>Sessão Concluída!</h2>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--accent-green)' }}>{estatisticasSessao.acertos}</div>
                <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>Acertos</div>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--accent-red)' }}>{estatisticasSessao.erros}</div>
                <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>Erros</div>
              </div>
            </div>

            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-yellow)' }}>{taxa}%</div>
            <p className="mb-6" style={{ color: 'var(--chalk-dim)' }}>Taxa de acerto</p>

            <p className="text-sm mb-6" style={{ color: 'var(--chalk-white)' }}>
              {taxa >= 80
                ? 'Excelente! Você está dominando o conteúdo!'
                : taxa >= 50
                ? 'Bom trabalho! Continue praticando para melhorar.'
                : 'Não desanime! A prática leva à perfeição.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={finalizarEstudo}
                className="flex-1 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                Ver Decks
              </button>
              <button
                onClick={() => deckSelecionado && iniciarEstudo(deckSelecionado)}
                className="btn btn-yellow flex-1 py-3"
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
    <main className="min-h-screen pt-16 pb-24" style={{ backgroundColor: 'var(--chalkboard-bg)' }}>
      <FloatingNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="header text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--chalk-white)' }}>
            🃏 Flashcards - Revisão Espaçada
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--chalk-dim)' }}>
            Sistema de memorização baseado em repetição espaçada.
            Quanto mais você acerta, maior o intervalo até a próxima revisão!
          </p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="stats-bar mb-8">
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-green)' }}>{estatisticasGerais.totalCards}</div>
            <div className="stat-label">Total de Cards</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-yellow)' }}>{estatisticasGerais.paraRevisar}</div>
            <div className="stat-label">Para Revisar Hoje</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-purple)' }}>{estatisticasGerais.dominados}</div>
            <div className="stat-label">Cards Dominados</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-blue)' }}>{estatisticasGerais.taxaAcerto}%</div>
            <div className="stat-label">Taxa de Acerto</div>
          </div>
        </div>

        {/* Revisão do Dia */}
        {estatisticasGerais.paraRevisar > 0 && (
          <div className="chalkboard-card p-6 mb-8 border-green-500/50" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--accent-green)' }}>📅 Revisão do Dia</h2>
                <p style={{ color: 'var(--chalk-dim)' }}>
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
                className="btn btn-yellow"
              >
                🚀 Revisar Agora
              </button>
            </div>
          </div>
        )}

        {/* Grid de Decks */}
        <div className="category mb-8">
          <div className="category-title">📚 Seus Decks</div>
          <div className="cards-grid">
            {decks.map(deck => (
              <div
                key={deck.id}
                className="chalkboard-card overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <div className={`bg-gradient-to-r ${deck.cor} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{deck.icone}</span>
                    {deck.cardsParaRevisar > 0 && (
                      <span className="badge px-3 py-1 text-xs">
                        {deck.cardsParaRevisar} para revisar
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mt-2" style={{ color: 'var(--chalk-white)' }}>{deck.nome}</h3>
                </div>

                <div className="p-4">
                  <div className="flex justify-between text-sm mb-4" style={{ color: 'var(--chalk-dim)' }}>
                    <span>📝 {deck.totalCards} cards</span>
                    <span>✅ {cards.filter(c => c.categoria === deck.id && c.nivel >= 5).length} dominados</span>
                  </div>

                  <div className="h-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${deck.cor}`}
                      style={{
                        width: `${deck.totalCards > 0
                          ? (cards.filter(c => c.categoria === deck.id && c.nivel >= 5).length / deck.totalCards) * 100
                          : 0}%`
                      }}
                    />
                  </div>

                  <button
                    onClick={() => iniciarEstudo(deck.id)}
                    className="btn btn-yellow w-full py-2"
                  >
                    {deck.cardsParaRevisar > 0 ? '📖 Revisar' : '🎯 Estudar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Como Funciona */}
        <div className="category">
          <div className="category-title">🧠 Como Funciona a Revisão Espaçada</div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--accent-green)' }}>Estude o Card</h3>
              <p className="text-sm" style={{ color: 'var(--chalk-dim)' }}>
                Veja a pergunta e tente lembrar a resposta antes de revelar.
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--accent-blue)' }}>Avalie-se</h3>
              <p className="text-sm" style={{ color: 'var(--chalk-dim)' }}>
                Indique se acertou ou errou. Seja honesto para melhor resultado!
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--accent-purple)' }}>Revisão Inteligente</h3>
              <p className="text-sm" style={{ color: 'var(--chalk-dim)' }}>
                O sistema agenda a próxima revisão. Acertos = intervalos maiores.
              </p>
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <h4 className="font-bold mb-3" style={{ color: 'var(--chalk-white)' }}>📊 Intervalos de Revisão</h4>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--accent-red)' }}>Nível 0: 1 dia</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(251, 146, 60, 0.2)', color: '#fb923c' }}>Nível 1: 2 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: 'var(--accent-yellow)' }}>Nível 2: 4 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: 'var(--accent-green)' }}>Nível 3: 7 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)', color: '#14b8a6' }}>Nível 4: 15 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)' }}>Nível 5: 30 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: 'var(--accent-purple)' }}>Nível 6: 60 dias</span>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: 'var(--accent-green)' }}>Nível 7: 120 dias</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <a href="/enem" className="hover:underline">
            ← Voltar ao Painel ENEM
          </a>
        </div>
      </div>
    </main>
  );
}
