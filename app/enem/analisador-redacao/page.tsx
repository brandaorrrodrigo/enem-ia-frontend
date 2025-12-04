'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface Competencia {
  id: number;
  nome: string;
  descricao: string;
  nota: number;
  feedback: string;
  sugestoes: string[];
  cor: string;
}

interface AnaliseRedacao {
  id: string;
  data: string;
  tema: string;
  texto: string;
  competencias: Competencia[];
  notaTotal: number;
  feedbackGeral: string;
  pontosFortes: string[];
  pontosMelhorar: string[];
  repertorios: string[];
}

interface HistoricoRedacao {
  id: string;
  data: string;
  tema: string;
  notaTotal: number;
}

const competenciasBase: Omit<Competencia, 'nota' | 'feedback' | 'sugestoes'>[] = [
  {
    id: 1,
    nome: 'Competência 1',
    descricao: 'Domínio da norma culta da língua escrita',
    cor: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    nome: 'Competência 2',
    descricao: 'Compreensão da proposta e aplicação de conceitos',
    cor: 'from-purple-500 to-purple-700'
  },
  {
    id: 3,
    nome: 'Competência 3',
    descricao: 'Seleção e organização das informações',
    cor: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 4,
    nome: 'Competência 4',
    descricao: 'Conhecimento dos mecanismos linguísticos',
    cor: 'from-orange-500 to-orange-700'
  },
  {
    id: 5,
    nome: 'Competência 5',
    descricao: 'Proposta de intervenção para o problema',
    cor: 'from-pink-500 to-pink-700'
  }
];

const temasExemplo = [
  'Os desafios da educação digital no Brasil',
  'A persistência da violência contra a mulher na sociedade brasileira',
  'O estigma associado às doenças mentais na sociedade brasileira',
  'Democratização do acesso ao cinema no Brasil',
  'Manipulação do comportamento do usuário pelo controle de dados na internet',
  'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
  'O problema do abandono de animais no Brasil',
  'Desafios para a valorização de comunidades e povos tradicionais no Brasil'
];

export default function AnalisadorRedacaoPage() {
  const [texto, setTexto] = useState('');
  const [tema, setTema] = useState('');
  const [analisando, setAnalisando] = useState(false);
  const [analise, setAnalise] = useState<AnaliseRedacao | null>(null);
  const [historico, setHistorico] = useState<HistoricoRedacao[]>([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState<'escrever' | 'resultado'>('escrever');

  useEffect(() => {
    const saved = localStorage.getItem('enem-redacao-historico');
    if (saved) {
      setHistorico(JSON.parse(saved));
    }
  }, []);

  const contarPalavras = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const contarLinhas = (text: string) => {
    return text.split('\n').length;
  };

  const analisarRedacao = async () => {
    if (!texto.trim() || !tema.trim()) {
      alert('Por favor, preencha o tema e o texto da redação.');
      return;
    }

    if (contarPalavras(texto) < 100) {
      alert('A redação deve ter pelo menos 100 palavras para análise.');
      return;
    }

    setAnalisando(true);

    // Simular análise (em produção, seria uma chamada à API de IA)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const palavras = contarPalavras(texto);
    const linhas = contarLinhas(texto);

    // Análise simulada baseada em características do texto
    const temIntroducao = texto.toLowerCase().includes('atualmente') ||
                          texto.toLowerCase().includes('no brasil') ||
                          texto.toLowerCase().includes('na sociedade');
    const temConclusao = texto.toLowerCase().includes('portanto') ||
                         texto.toLowerCase().includes('dessa forma') ||
                         texto.toLowerCase().includes('diante disso');
    const temConectivos = (texto.match(/além disso|porém|contudo|entretanto|todavia|assim|dessa forma|nesse sentido/gi) || []).length;
    const temRepertorios = (texto.match(/segundo|de acordo com|conforme|como afirma|como diz/gi) || []).length;
    const temProposta = texto.toLowerCase().includes('governo') ||
                        texto.toLowerCase().includes('medidas') ||
                        texto.toLowerCase().includes('políticas públicas') ||
                        texto.toLowerCase().includes('é necessário');

    // Calcular notas por competência
    const gerarNota = (base: number, bonus: number) => {
      const nota = Math.min(200, Math.max(40, base + bonus));
      return Math.round(nota / 40) * 40; // Arredondar para múltiplos de 40
    };

    const competencias: Competencia[] = [
      {
        ...competenciasBase[0],
        nota: gerarNota(120, palavras > 250 ? 40 : 0),
        feedback: palavras > 250
          ? 'Bom domínio da norma culta. Texto bem estruturado com poucos desvios.'
          : 'Texto curto pode limitar a demonstração do domínio da língua.',
        sugestoes: [
          'Revise a concordância verbal e nominal',
          'Atenção ao uso de vírgulas',
          'Evite repetição de palavras'
        ]
      },
      {
        ...competenciasBase[1],
        nota: gerarNota(120, temIntroducao ? 40 : 0),
        feedback: temIntroducao
          ? 'Boa compreensão do tema com contextualização adequada.'
          : 'Procure contextualizar melhor o tema na introdução.',
        sugestoes: [
          'Apresente uma tese clara na introdução',
          'Conecte seus argumentos ao tema proposto',
          'Use repertório sociocultural pertinente'
        ]
      },
      {
        ...competenciasBase[2],
        nota: gerarNota(120, temRepertorios > 0 ? 40 : 0),
        feedback: temRepertorios > 0
          ? 'Boa seleção de informações e argumentos.'
          : 'Inclua mais dados, citações ou exemplos para enriquecer o texto.',
        sugestoes: [
          'Use dados estatísticos quando possível',
          'Cite pensadores, autores ou obras',
          'Traga exemplos concretos do cotidiano'
        ]
      },
      {
        ...competenciasBase[3],
        nota: gerarNota(100, temConectivos * 20),
        feedback: temConectivos > 2
          ? 'Bom uso de conectivos e coesão textual.'
          : 'Utilize mais conectivos para melhorar a fluidez do texto.',
        sugestoes: [
          'Use conjunções: além disso, porém, contudo',
          'Evite começar frases da mesma forma',
          'Crie transições entre parágrafos'
        ]
      },
      {
        ...competenciasBase[4],
        nota: gerarNota(100, temProposta && temConclusao ? 60 : temProposta ? 20 : 0),
        feedback: temProposta && temConclusao
          ? 'Proposta de intervenção presente e detalhada.'
          : 'A proposta de intervenção precisa ser mais elaborada.',
        sugestoes: [
          'Indique QUEM vai agir (agente)',
          'Diga O QUE será feito (ação)',
          'Explique COMO será feito (meio)',
          'Mencione PARA QUE (finalidade)',
          'Cite um DETALHAMENTO adicional'
        ]
      }
    ];

    const notaTotal = competencias.reduce((acc, c) => acc + c.nota, 0);

    const novaAnalise: AnaliseRedacao = {
      id: Date.now().toString(),
      data: new Date().toISOString(),
      tema,
      texto,
      competencias,
      notaTotal,
      feedbackGeral: notaTotal >= 800
        ? 'Excelente redação! Você demonstra domínio das competências avaliadas.'
        : notaTotal >= 600
        ? 'Boa redação! Com alguns ajustes, você pode alcançar notas ainda maiores.'
        : notaTotal >= 400
        ? 'Redação satisfatória. Foque nos pontos de melhoria indicados.'
        : 'Redação precisa de melhorias. Revise as sugestões em cada competência.',
      pontosFortes: [
        temIntroducao ? 'Boa contextualização do tema' : '',
        temConectivos > 2 ? 'Uso adequado de conectivos' : '',
        temRepertorios > 0 ? 'Presença de repertório sociocultural' : '',
        temProposta ? 'Proposta de intervenção presente' : '',
        palavras > 250 ? 'Texto com desenvolvimento adequado' : ''
      ].filter(Boolean),
      pontosMelhorar: [
        !temIntroducao ? 'Melhorar a introdução e contextualização' : '',
        temConectivos <= 2 ? 'Usar mais conectivos e operadores argumentativos' : '',
        temRepertorios === 0 ? 'Incluir citações e repertório sociocultural' : '',
        !temProposta ? 'Elaborar melhor a proposta de intervenção' : '',
        !temConclusao ? 'Desenvolver a conclusão' : ''
      ].filter(Boolean),
      repertorios: [
        '"A educação é a arma mais poderosa que você pode usar para mudar o mundo" - Nelson Mandela',
        'Constituição Federal de 1988 - Artigo 5º: Todos são iguais perante a lei',
        'Zygmunt Bauman - Modernidade Líquida e relações sociais',
        'Michel Foucault - Relações de poder e disciplina',
        'Hannah Arendt - A banalidade do mal'
      ]
    };

    setAnalise(novaAnalise);
    setAbaSelecionada('resultado');
    setAnalisando(false);

    // Salvar no histórico
    const novoHistorico: HistoricoRedacao = {
      id: novaAnalise.id,
      data: novaAnalise.data,
      tema: novaAnalise.tema,
      notaTotal: novaAnalise.notaTotal
    };

    const historicoAtualizado = [novoHistorico, ...historico].slice(0, 20);
    setHistorico(historicoAtualizado);
    localStorage.setItem('enem-redacao-historico', JSON.stringify(historicoAtualizado));
  };

  const novaRedacao = () => {
    setTexto('');
    setTema('');
    setAnalise(null);
    setAbaSelecionada('escrever');
  };

  const estatisticas = {
    total: historico.length,
    media: historico.length > 0
      ? Math.round(historico.reduce((acc, h) => acc + h.notaTotal, 0) / historico.length)
      : 0,
    melhor: historico.length > 0 ? Math.max(...historico.map(h => h.notaTotal)) : 0,
    ultima: historico[0]?.notaTotal || 0
  };

  return (
    <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
      <FloatingNav />
      <ChalkBackToTop />

      <div className="container-ia py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="title-ia text-3xl md:text-4xl mb-4">
            ✍️ Analisador de Redação ENEM-IA
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escreva sua redação e receba uma análise detalhada das 5 competências do ENEM
            com sugestões de melhoria e repertórios sugeridos.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-emerald-400">{estatisticas.total}</div>
            <div className="text-gray-400 text-sm">Redações Analisadas</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-blue-400">{estatisticas.media}</div>
            <div className="text-gray-400 text-sm">Nota Média</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-yellow-400">{estatisticas.melhor}</div>
            <div className="text-gray-400 text-sm">Melhor Nota</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-purple-400">{estatisticas.ultima}</div>
            <div className="text-gray-400 text-sm">Última Nota</div>
          </div>
        </div>

        {/* Botão Histórico */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMostrarHistorico(!mostrarHistorico)}
            className="btn-ia flex items-center gap-2"
          >
            📜 {mostrarHistorico ? 'Ocultar Histórico' : 'Ver Histórico'}
          </button>
          {analise && (
            <button
              onClick={novaRedacao}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✨ Nova Redação
            </button>
          )}
        </div>

        {/* Histórico */}
        {mostrarHistorico && (
          <div className="card-ia p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">📜 Histórico de Redações</h2>
            {historico.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Você ainda não analisou nenhuma redação.
              </p>
            ) : (
              <div className="space-y-2">
                {historico.map((h, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{h.tema}</h3>
                      <p className="text-sm text-gray-400">
                        {new Date(h.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${
                      h.notaTotal >= 800 ? 'text-emerald-400' :
                      h.notaTotal >= 600 ? 'text-blue-400' :
                      h.notaTotal >= 400 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {h.notaTotal}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Abas */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setAbaSelecionada('escrever')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              abaSelecionada === 'escrever'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            ✏️ Escrever
          </button>
          <button
            onClick={() => setAbaSelecionada('resultado')}
            disabled={!analise}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              abaSelecionada === 'resultado'
                ? 'bg-emerald-600 text-white'
                : analise
                ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            📊 Resultado
          </button>
        </div>

        {abaSelecionada === 'escrever' ? (
          <div className="card-ia p-6">
            {/* Tema */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Tema da Redação</label>
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Digite o tema ou selecione um abaixo..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {temasExemplo.slice(0, 4).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTema(t)}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {t.substring(0, 40)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Área de texto */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sua Redação</label>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua redação aqui... (mínimo 100 palavras)"
                rows={20}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none resize-none font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Contadores */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
              <span>📝 {contarPalavras(texto)} palavras</span>
              <span>📄 {contarLinhas(texto)} linhas</span>
              <span>✏️ {texto.length} caracteres</span>
            </div>

            {/* Botão Analisar */}
            <button
              onClick={analisarRedacao}
              disabled={analisando || contarPalavras(texto) < 100}
              className={`w-full btn-ia py-4 text-lg ${
                analisando || contarPalavras(texto) < 100 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {analisando ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🔄</span> Analisando sua redação...
                </span>
              ) : (
                '🚀 Analisar Redação'
              )}
            </button>

            {contarPalavras(texto) < 100 && texto.length > 0 && (
              <p className="text-center text-yellow-400 text-sm mt-2">
                Escreva pelo menos 100 palavras para análise ({100 - contarPalavras(texto)} restantes)
              </p>
            )}
          </div>
        ) : analise && (
          <div className="space-y-6">
            {/* Nota Total */}
            <div className="card-ia p-6 text-center">
              <h2 className="text-xl font-bold mb-4">📊 Resultado da Análise</h2>
              <div className={`text-6xl font-bold mb-2 ${
                analise.notaTotal >= 800 ? 'text-emerald-400' :
                analise.notaTotal >= 600 ? 'text-blue-400' :
                analise.notaTotal >= 400 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {analise.notaTotal}
              </div>
              <p className="text-gray-400">de 1000 pontos</p>
              <p className="mt-4 text-gray-300">{analise.feedbackGeral}</p>
            </div>

            {/* Competências */}
            <div className="card-ia p-6">
              <h3 className="text-xl font-bold mb-4">📋 Análise por Competência</h3>
              <div className="space-y-4">
                {analise.competencias.map((comp) => (
                  <div key={comp.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold">{comp.nome}</h4>
                        <p className="text-sm text-gray-400">{comp.descricao}</p>
                      </div>
                      <div className={`text-2xl font-bold ${
                        comp.nota >= 160 ? 'text-emerald-400' :
                        comp.nota >= 120 ? 'text-blue-400' :
                        comp.nota >= 80 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {comp.nota}
                      </div>
                    </div>
                    <div className="progress-ia mb-2">
                      <div
                        className={`progress-bar-ia bg-gradient-to-r ${comp.cor}`}
                        style={{ width: `${(comp.nota / 200) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{comp.feedback}</p>
                    <div className="flex flex-wrap gap-2">
                      {comp.sugestoes.map((sug, idx) => (
                        <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded">
                          💡 {sug}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pontos Fortes e a Melhorar */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-ia p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-4">✅ Pontos Fortes</h3>
                {analise.pontosFortes.length > 0 ? (
                  <ul className="space-y-2">
                    {analise.pontosFortes.map((ponto, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-400">•</span>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">Continue praticando para identificar seus pontos fortes.</p>
                )}
              </div>

              <div className="card-ia p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">⚠️ Pontos a Melhorar</h3>
                {analise.pontosMelhorar.length > 0 ? (
                  <ul className="space-y-2">
                    {analise.pontosMelhorar.map((ponto, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-400">•</span>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">Parabéns! Sua redação está bem estruturada.</p>
                )}
              </div>
            </div>

            {/* Repertórios Sugeridos */}
            <div className="card-ia p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4">📚 Repertórios Sugeridos</h3>
              <p className="text-sm text-gray-400 mb-4">
                Use estas referências para enriquecer suas próximas redações:
              </p>
              <div className="space-y-2">
                {analise.repertorios.map((rep, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-3 text-sm">
                    {rep}
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-center gap-4">
              <button
                onClick={novaRedacao}
                className="btn-ia px-8 py-3"
              >
                ✨ Escrever Nova Redação
              </button>
            </div>
          </div>
        )}

        {/* Dicas */}
        {abaSelecionada === 'escrever' && (
          <div className="mt-8 card-ia p-6">
            <h2 className="text-xl font-bold mb-4">💡 Dicas para uma Redação Nota 1000</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-blue-400 mb-2">📝 Estrutura</h3>
                <p className="text-sm text-gray-400">
                  Introdução com tese clara, 2 parágrafos de desenvolvimento e conclusão com proposta.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-purple-400 mb-2">📚 Repertório</h3>
                <p className="text-sm text-gray-400">
                  Use citações de filósofos, dados estatísticos e referências culturais.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-emerald-400 mb-2">🔗 Conectivos</h3>
                <p className="text-sm text-gray-400">
                  Use além disso, portanto, contudo, dessa forma para conectar ideias.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-orange-400 mb-2">🎯 Proposta</h3>
                <p className="text-sm text-gray-400">
                  Inclua agente, ação, meio, finalidade e detalhamento na intervenção.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-pink-400 mb-2">✏️ Revisão</h3>
                <p className="text-sm text-gray-400">
                  Revise ortografia, concordância e coerência antes de enviar.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-yellow-400 mb-2">📏 Tamanho</h3>
                <p className="text-sm text-gray-400">
                  Escreva entre 25 e 30 linhas para um bom desenvolvimento.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
