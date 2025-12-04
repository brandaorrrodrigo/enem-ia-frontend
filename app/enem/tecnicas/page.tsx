'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Tecnica {
  id: string;
  nome: string;
  emoji: string;
  descricao: string;
  comoFazer: string[];
  beneficios: string[];
  exemplo?: string;
  dificuldade: 'facil' | 'medio' | 'avancado';
  tempoSugerido: string;
  categoria: string;
}

export default function TecnicasPage() {
  const router = useRouter();
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [tecnicaExpandida, setTecnicaExpandida] = useState<string | null>(null);

  const categorias = [
    { value: 'todos', label: 'Todas', emoji: '📚' },
    { value: 'memorizacao', label: 'Memorizacao', emoji: '🧠' },
    { value: 'organizacao', label: 'Organizacao', emoji: '📋' },
    { value: 'leitura', label: 'Leitura', emoji: '📖' },
    { value: 'revisao', label: 'Revisao', emoji: '🔄' },
    { value: 'foco', label: 'Foco', emoji: '🎯' },
  ];

  const tecnicas: Tecnica[] = [
    {
      id: '1',
      nome: 'Tecnica Pomodoro',
      emoji: '🍅',
      descricao: 'Divida seu estudo em blocos de 25 minutos com pausas de 5 minutos. Apos 4 blocos, faca uma pausa maior de 15-30 minutos.',
      comoFazer: [
        'Escolha uma tarefa para estudar',
        'Configure um timer para 25 minutos',
        'Estude sem interrupcoes ate o alarme',
        'Faca uma pausa de 5 minutos',
        'Repita o ciclo 4 vezes',
        'Apos 4 ciclos, descanse 15-30 minutos',
      ],
      beneficios: [
        'Melhora o foco e concentracao',
        'Reduz a fadiga mental',
        'Aumenta a produtividade',
        'Ajuda a medir o tempo de estudo',
      ],
      dificuldade: 'facil',
      tempoSugerido: '2-4 horas',
      categoria: 'foco',
    },
    {
      id: '2',
      nome: 'Repeticao Espacada',
      emoji: '📆',
      descricao: 'Revise o conteudo em intervalos crescentes: 1 dia, 3 dias, 7 dias, 15 dias, 30 dias. Isso fortalece a memoria de longo prazo.',
      comoFazer: [
        'Estude o conteudo novo',
        'Revise no dia seguinte',
        'Revise novamente apos 3 dias',
        'Revise apos 1 semana',
        'Revise apos 2 semanas',
        'Revise apos 1 mes',
      ],
      beneficios: [
        'Memoria de longo prazo',
        'Retencao superior do conteudo',
        'Otimiza o tempo de estudo',
        'Ideal para grandes quantidades de informacao',
      ],
      exemplo: 'Estudou funcoes na segunda? Revise na terca, sexta, proxima segunda, e duas semanas depois.',
      dificuldade: 'medio',
      tempoSugerido: '30 min/dia',
      categoria: 'revisao',
    },
    {
      id: '3',
      nome: 'Mapa Mental',
      emoji: '🗺️',
      descricao: 'Organize informacoes de forma visual, partindo de um tema central e ramificando em subtopicos conectados.',
      comoFazer: [
        'Coloque o tema central no meio da pagina',
        'Crie ramos principais para subtopicos',
        'Adicione ramos secundarios com detalhes',
        'Use cores diferentes para cada ramo',
        'Inclua simbolos e imagens',
        'Conecte ideias relacionadas',
      ],
      beneficios: [
        'Visualizacao clara do conteudo',
        'Facilita conexoes entre conceitos',
        'Estimula a criatividade',
        'Otimo para revisao rapida',
      ],
      exemplo: 'Tema central: Segunda Guerra Mundial. Ramos: Causas, Paises envolvidos, Batalhas importantes, Consequencias.',
      dificuldade: 'facil',
      tempoSugerido: '30-60 min',
      categoria: 'organizacao',
    },
    {
      id: '4',
      nome: 'Flashcards',
      emoji: '🃏',
      descricao: 'Cartoes com pergunta de um lado e resposta do outro. Ideais para memorizar formulas, datas, conceitos e vocabulario.',
      comoFazer: [
        'Escreva a pergunta em um lado do cartao',
        'Escreva a resposta no outro lado',
        'Tente responder sem olhar',
        'Separe em pilhas: acertei/errei',
        'Revise mais os que errou',
        'Use apps como Anki para automatizar',
      ],
      beneficios: [
        'Aprendizado ativo',
        'Feedback imediato',
        'Portatil e pratico',
        'Combina bem com repeticao espacada',
      ],
      exemplo: 'Frente: "Qual a formula de Bhaskara?" | Verso: "x = (-b ± √Δ) / 2a"',
      dificuldade: 'facil',
      tempoSugerido: '15-30 min',
      categoria: 'memorizacao',
    },
    {
      id: '5',
      nome: 'Metodo Feynman',
      emoji: '🎓',
      descricao: 'Aprenda ensinando! Explique o conceito como se estivesse ensinando para uma crianca de 10 anos.',
      comoFazer: [
        'Escolha um conceito para estudar',
        'Explique com palavras simples (sem jargoes)',
        'Identifique lacunas no seu entendimento',
        'Volte ao material e preencha as lacunas',
        'Simplifique ainda mais sua explicacao',
        'Repita ate dominar o assunto',
      ],
      beneficios: [
        'Identifica falhas no conhecimento',
        'Aprofunda a compreensao',
        'Melhora a capacidade de explicar',
        'Torna o estudo mais ativo',
      ],
      exemplo: 'Explicando fotossintese: "As plantas pegam luz do sol, agua e ar para fazer sua propria comida e liberam o ar que respiramos."',
      dificuldade: 'medio',
      tempoSugerido: '45-60 min',
      categoria: 'memorizacao',
    },
    {
      id: '6',
      nome: 'Leitura Ativa',
      emoji: '📝',
      descricao: 'Nao apenas leia, mas interaja com o texto: faca perguntas, anote, sublinhe e resuma com suas palavras.',
      comoFazer: [
        'Faca uma leitura rapida inicial (skimming)',
        'Formule perguntas sobre o conteudo',
        'Leia com atencao buscando respostas',
        'Sublinhe pontos principais',
        'Faca anotacoes nas margens',
        'Resuma cada secao com suas palavras',
      ],
      beneficios: [
        'Maior compreensao do texto',
        'Retencao superior',
        'Engajamento ativo com o material',
        'Preparacao para questoes interpretativas',
      ],
      dificuldade: 'facil',
      tempoSugerido: '30-60 min',
      categoria: 'leitura',
    },
    {
      id: '7',
      nome: 'Estudo Intercalado',
      emoji: '🔀',
      descricao: 'Alterne entre diferentes materias ou topicos na mesma sessao de estudo, ao inves de focar em apenas um.',
      comoFazer: [
        'Divida seu tempo entre 2-3 materias',
        'Estude 30-45 min de cada',
        'Alterne para uma materia diferente',
        'Evite estudar topicos muito similares seguidos',
        'Mantenha um registro do que estudou',
      ],
      beneficios: [
        'Melhora a retencao a longo prazo',
        'Desenvolve flexibilidade mental',
        'Reduz o tedio',
        'Simula a realidade da prova (varias materias)',
      ],
      exemplo: '9h-10h Matematica | 10h-11h Historia | 11h-12h Biologia',
      dificuldade: 'medio',
      tempoSugerido: '2-3 horas',
      categoria: 'organizacao',
    },
    {
      id: '8',
      nome: 'Pratica de Recuperacao',
      emoji: '🧪',
      descricao: 'Teste-se constantemente! Tente lembrar o conteudo sem olhar o material, fazendo perguntas para si mesmo.',
      comoFazer: [
        'Apos estudar, feche o material',
        'Tente lembrar tudo que estudou',
        'Escreva ou fale em voz alta',
        'Verifique o que esqueceu',
        'Foque nos pontos que errou',
        'Repita o processo regularmente',
      ],
      beneficios: [
        'Fortalece a memoria',
        'Identifica pontos fracos',
        'Prepara para situacoes de prova',
        'Mais efetivo que reler passivamente',
      ],
      dificuldade: 'facil',
      tempoSugerido: '15-30 min',
      categoria: 'revisao',
    },
    {
      id: '9',
      nome: 'Palacio da Memoria',
      emoji: '🏰',
      descricao: 'Associe informacoes a locais de um ambiente conhecido (sua casa, por exemplo) para memorizar listas e sequencias.',
      comoFazer: [
        'Escolha um local que conhece bem',
        'Defina um caminho mental pelo local',
        'Associe cada informacao a um ponto do caminho',
        'Crie imagens vividas e absurdas',
        'Percorra mentalmente o caminho para lembrar',
        'Pratique a rota varias vezes',
      ],
      beneficios: [
        'Memoriza grandes quantidades de informacao',
        'Tecnica usada por campeoes de memoria',
        'Tornao estudo mais divertido',
        'Retencao duradoura',
      ],
      exemplo: 'Para memorizar presidentes: Imagine Deodoro na porta de casa, Floriano na sala, Prudente na cozinha...',
      dificuldade: 'avancado',
      tempoSugerido: '30-60 min',
      categoria: 'memorizacao',
    },
    {
      id: '10',
      nome: 'SQ3R',
      emoji: '📖',
      descricao: 'Survey, Question, Read, Recite, Review - um metodo sistematico para leitura e compreensao de textos academicos.',
      comoFazer: [
        'Survey: Faca uma visao geral do texto (titulos, subtitulos, imagens)',
        'Question: Formule perguntas sobre o conteudo',
        'Read: Leia atentamente buscando respostas',
        'Recite: Repita as principais ideias com suas palavras',
        'Review: Revise suas anotacoes e respostas',
      ],
      beneficios: [
        'Compreensao profunda do texto',
        'Organizacao mental do conteudo',
        'Preparacao para questoes dissertativas',
        'Metodo comprovado cientificamente',
      ],
      dificuldade: 'medio',
      tempoSugerido: '45-90 min',
      categoria: 'leitura',
    },
  ];

  const getDificuldadeColor = (dif: string): string => {
    switch (dif) {
      case 'facil': return 'bg-green-500/20 text-green-300 border-green-500';
      case 'medio': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'avancado': return 'bg-red-500/20 text-red-300 border-red-500';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const getDificuldadeLabel = (dif: string): string => {
    switch (dif) {
      case 'facil': return '🟢 Facil';
      case 'medio': return '🟡 Medio';
      case 'avancado': return '🔴 Avancado';
      default: return dif;
    }
  };

  const tecnicasFiltradas = tecnicas.filter(t =>
    filtroCategoria === 'todos' || t.categoria === filtroCategoria
  );

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Header */}


      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          🧠 Tecnicas e Metodos de Estudo
        </h1>
        <p className="subtitle-ia mb-0">
          Aprenda as melhores tecnicas para otimizar seus estudos
        </p>
      </div>

      {/* Filtros */}
      <div className="card-ia mb-8">
        <h2 className="text-white font-bold mb-4">📁 Filtrar por Categoria</h2>
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFiltroCategoria(cat.value)}
              className={`px-4 py-2 rounded-full transition ${
                filtroCategoria === cat.value
                  ? 'bg-yellow-300 text-slate-900 font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Estatisticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{tecnicas.length}</span>
          <span className="stat-ia-label">🧠 Tecnicas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{tecnicas.filter(t => t.dificuldade === 'facil').length}</span>
          <span className="stat-ia-label">🟢 Faceis</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{tecnicas.filter(t => t.dificuldade === 'medio').length}</span>
          <span className="stat-ia-label">🟡 Medias</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{tecnicas.filter(t => t.dificuldade === 'avancado').length}</span>
          <span className="stat-ia-label">🔴 Avancadas</span>
        </div>
      </div>

      {/* Lista de Tecnicas */}
      <div className="space-y-4">
        {tecnicasFiltradas.map((tecnica) => (
          <div key={tecnica.id} className="card-ia">
            {/* Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setTecnicaExpandida(tecnicaExpandida === tecnica.id ? null : tecnica.id)}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{tecnica.emoji}</div>
                <div>
                  <h3 className="text-white font-bold text-lg">{tecnica.nome}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs border ${getDificuldadeColor(tecnica.dificuldade)}`}>
                      {getDificuldadeLabel(tecnica.dificuldade)}
                    </span>
                    <span className="text-white/60 text-xs">⏱️ {tecnica.tempoSugerido}</span>
                  </div>
                </div>
              </div>

              <span className="text-2xl text-white/60">
                {tecnicaExpandida === tecnica.id ? '▲' : '▼'}
              </span>
            </div>

            {/* Descricao sempre visivel */}
            <p className="text-white/80 mt-4 leading-relaxed">{tecnica.descricao}</p>

            {/* Conteudo Expandido */}
            {tecnicaExpandida === tecnica.id && (
              <div className="mt-6 space-y-6">
                {/* Como Fazer */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-yellow-300 font-bold mb-3">📝 Como Fazer</h4>
                  <ol className="space-y-2">
                    {tecnica.comoFazer.map((passo, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-6 h-6 rounded-full bg-yellow-300/20 text-yellow-300 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{passo}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Beneficios */}
                <div className="bg-green-500/10 rounded-xl p-4">
                  <h4 className="text-green-300 font-bold mb-3">✅ Beneficios</h4>
                  <ul className="space-y-2">
                    {tecnica.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/90">
                        <span className="text-green-400">•</span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exemplo */}
                {tecnica.exemplo && (
                  <div className="bg-blue-500/10 rounded-xl p-4">
                    <h4 className="text-blue-300 font-bold mb-3">💡 Exemplo Pratico</h4>
                    <p className="text-white/90">{tecnica.exemplo}</p>
                  </div>
                )}

                {/* Botao Comecar */}
                <button
                  onClick={() => router.push('/enem/cronograma')}
                  className="btn-ia w-full"
                >
                  📅 Adicionar ao Cronograma
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dica Final */}
      <div className="card-ia mt-8" style={{ background: 'linear-gradient(135deg, rgba(255,217,102,0.2) 0%, rgba(255,217,102,0.05) 100%)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="title-ia-sm mb-2">Dica de Ouro</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Nao existe uma tecnica perfeita para todos. Experimente diferentes metodos e descubra quais funcionam melhor para voce.
            O mais importante e a consistencia: estudar um pouco todos os dias e melhor que estudar muito em um so dia!
          </p>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
