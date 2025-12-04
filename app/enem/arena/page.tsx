'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Sala {
  id: string;
  codigo: string;
  nome: string;
  tipo: '1x1' | 'dupla' | 'grupo' | 'turma' | 'publica';
  participantes: Participante[];
  maxParticipantes: number;
  modo: 'show-milhao' | 'rapido' | 'maratona' | 'eliminatorio';
  status: 'aguardando' | 'em_andamento' | 'finalizado';
  roundAtual: number;
  totalRounds: number;
  criador: string;
  dataCriacao: Date;
}

interface Participante {
  id: string;
  nome: string;
  avatar: string;
  fp: number;
  acertos: number;
  erros: number;
  posicao: number;
  streak: number;
}

interface Questao {
  id: number;
  enunciado: string;
  alternativas: string[];
  correta: number;
  dificuldade: 'facil' | 'media' | 'dificil' | 'expert';
  fpValor: number;
  area: string;
}

interface Mensagem {
  id: string;
  tipo: 'sistema' | 'jogador' | 'host' | 'narrador' | 'rival';
  autor: string;
  conteudo: string;
  timestamp: Date;
}

const QUESTOES_ARENA: Questao[] = [
  { id: 1, enunciado: 'Qual e a formula de Bhaskara?', alternativas: ['x = -b/2a', 'x = (-b ± √Δ) / 2a', 'x = b² - 4ac', 'x = a + b + c', 'x = 2a / b'], correta: 1, dificuldade: 'facil', fpValor: 10, area: 'matematica' },
  { id: 2, enunciado: 'Quem escreveu "Dom Casmurro"?', alternativas: ['Jose de Alencar', 'Machado de Assis', 'Guimaraes Rosa', 'Clarice Lispector', 'Carlos Drummond'], correta: 1, dificuldade: 'facil', fpValor: 10, area: 'linguagens' },
  { id: 3, enunciado: 'Qual a capital do Brasil antes de Brasilia?', alternativas: ['Sao Paulo', 'Salvador', 'Rio de Janeiro', 'Belo Horizonte', 'Recife'], correta: 2, dificuldade: 'facil', fpValor: 10, area: 'humanas' },
  { id: 4, enunciado: 'Qual e a formula da agua?', alternativas: ['CO2', 'H2O', 'NaCl', 'O2', 'H2SO4'], correta: 1, dificuldade: 'facil', fpValor: 10, area: 'natureza' },
  { id: 5, enunciado: 'Quanto e a raiz quadrada de 144?', alternativas: ['10', '11', '12', '13', '14'], correta: 2, dificuldade: 'facil', fpValor: 10, area: 'matematica' },
  { id: 6, enunciado: 'Qual o discriminante de x² - 5x + 6 = 0?', alternativas: ['-1', '0', '1', '25', '49'], correta: 2, dificuldade: 'media', fpValor: 14, area: 'matematica' },
  { id: 7, enunciado: 'A Revolucao Francesa ocorreu em qual ano?', alternativas: ['1776', '1789', '1799', '1804', '1815'], correta: 1, dificuldade: 'media', fpValor: 14, area: 'humanas' },
  { id: 8, enunciado: 'Qual figura de linguagem: "A vida e uma viagem"?', alternativas: ['Hiperbole', 'Metafora', 'Metonimia', 'Ironia', 'Antitese'], correta: 1, dificuldade: 'media', fpValor: 14, area: 'linguagens' },
  { id: 9, enunciado: 'Qual organela e responsavel pela respiracao celular?', alternativas: ['Ribossomo', 'Golgi', 'Mitocondria', 'Lisossomo', 'RE'], correta: 2, dificuldade: 'media', fpValor: 14, area: 'natureza' },
  { id: 10, enunciado: 'Na PA (3, 7, 11, ...), qual o 10o termo?', alternativas: ['35', '37', '39', '41', '43'], correta: 2, dificuldade: 'media', fpValor: 14, area: 'matematica' },
  { id: 11, enunciado: 'Quem formulou a teoria da relatividade?', alternativas: ['Newton', 'Einstein', 'Bohr', 'Planck', 'Heisenberg'], correta: 1, dificuldade: 'media', fpValor: 14, area: 'natureza' },
  { id: 12, enunciado: 'Qual movimento artistico de 1922 no Brasil?', alternativas: ['Romantismo', 'Realismo', 'Modernismo', 'Barroco', 'Parnasianismo'], correta: 2, dificuldade: 'media', fpValor: 14, area: 'linguagens' },
  { id: 13, enunciado: 'Derivada de f(x) = x³ + 2x?', alternativas: ['3x² + 2', 'x² + 2', '3x + 2', 'x³', '3x²'], correta: 0, dificuldade: 'dificil', fpValor: 20, area: 'matematica' },
  { id: 14, enunciado: 'Qual filosofo disse "Penso, logo existo"?', alternativas: ['Platao', 'Aristoteles', 'Descartes', 'Kant', 'Nietzsche'], correta: 2, dificuldade: 'dificil', fpValor: 20, area: 'humanas' },
  { id: 15, enunciado: 'Qual a constante de Planck aproximada?', alternativas: ['6.63 x 10⁻³⁴ J.s', '3 x 10⁸ m/s', '9.8 m/s²', '1.6 x 10⁻¹⁹ C', '6.02 x 10²³'], correta: 0, dificuldade: 'dificil', fpValor: 20, area: 'natureza' },
  { id: 16, enunciado: 'Heteronimo de Fernando Pessoa mais filosofico?', alternativas: ['Alberto Caeiro', 'Ricardo Reis', 'Alvaro de Campos', 'Bernardo Soares', 'Antonio Mora'], correta: 1, dificuldade: 'dificil', fpValor: 20, area: 'linguagens' },
  { id: 17, enunciado: 'Integral de sen(x)?', alternativas: ['cos(x) + C', '-cos(x) + C', 'sen(x) + C', '-sen(x) + C', 'tan(x) + C'], correta: 1, dificuldade: 'expert', fpValor: 30, area: 'matematica' },
  { id: 18, enunciado: 'Teoria da mais-valia e de qual pensador?', alternativas: ['Adam Smith', 'John Locke', 'Karl Marx', 'Max Weber', 'Thomas Hobbes'], correta: 2, dificuldade: 'expert', fpValor: 30, area: 'humanas' },
  { id: 19, enunciado: 'Qual particula mediadora da forca forte?', alternativas: ['Foton', 'Gluon', 'Boson W', 'Boson Z', 'Graviton'], correta: 1, dificuldade: 'expert', fpValor: 30, area: 'natureza' },
  { id: 20, enunciado: 'O que e a "morte do autor" em teoria literaria?', alternativas: ['Fim do romantismo', 'Teoria de Barthes', 'Escola de Frankfurt', 'Formalismo russo', 'New Criticism'], correta: 1, dificuldade: 'expert', fpValor: 30, area: 'linguagens' },
];

const gerarCodigoSala = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = 'ENEM-';
  for (let i = 0; i < 4; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
};

const AVATARS = ['🧑‍🎓', '👨‍🎓', '👩‍🎓', '🦸', '🦹', '🧙', '🥷', '👻', '🤖', '🎯'];

export default function ArenaPage() {
  const router = useRouter();
  const [tela, setTela] = useState<'menu' | 'criar' | 'entrar' | 'sala' | 'jogo'>('menu');
  const [sala, setSala] = useState<Sala | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState<Questao | null>(null);
  const [questaoIndex, setQuestaoIndex] = useState(0);
  const [questoesJogo, setQuestoesJogo] = useState<Questao[]>([]);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [fpGanho, setFpGanho] = useState(0);
  const [streak, setStreak] = useState(0);
  const [ajudasDisponiveis, setAjudasDisponiveis] = useState({ pular: 2, dica: 2, eliminar: 1 });
  const [alternativasEliminadas, setAlternativasEliminadas] = useState<number[]>([]);
  const [dicaAtiva, setDicaAtiva] = useState(false);
  const [codigoEntrada, setCodigoEntrada] = useState('');
  const [nomeSala, setNomeSala] = useState('');
  const [tipoSala, setTipoSala] = useState<Sala['tipo']>('1x1');
  const [modoJogo, setModoJogo] = useState<Sala['modo']>('show-milhao');
  const [nomeJogador, setNomeJogador] = useState('');
  const [avatarJogador, setAvatarJogador] = useState('🧑‍🎓');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nome = localStorage.getItem('arena_nome') || '';
    const avatar = localStorage.getItem('arena_avatar') || '🧑‍🎓';
    setNomeJogador(nome);
    setAvatarJogador(avatar);
  }, []);

  useEffect(() => {
    if (tela === 'jogo' && questaoAtual && !mostrarResultado) {
      const timer = setInterval(() => {
        setTempoRestante(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            verificarResposta(-1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tela, questaoAtual, mostrarResultado]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const adicionarMensagem = (tipo: Mensagem['tipo'], autor: string, conteudo: string) => {
    setMensagens(prev => [...prev, {
      id: Date.now().toString(),
      tipo,
      autor,
      conteudo,
      timestamp: new Date()
    }]);
  };

  const criarSala = () => {
    if (!nomeJogador.trim()) {
      alert('Digite seu nome para criar uma sala!');
      return;
    }

    localStorage.setItem('arena_nome', nomeJogador);
    localStorage.setItem('arena_avatar', avatarJogador);

    const novaSala: Sala = {
      id: Date.now().toString(),
      codigo: gerarCodigoSala(),
      nome: nomeSala || `Arena de ${nomeJogador}`,
      tipo: tipoSala,
      participantes: [{
        id: '1',
        nome: nomeJogador,
        avatar: avatarJogador,
        fp: 0,
        acertos: 0,
        erros: 0,
        posicao: 1,
        streak: 0
      }],
      maxParticipantes: tipoSala === '1x1' ? 2 : tipoSala === 'dupla' ? 4 : tipoSala === 'grupo' ? 8 : 30,
      modo: modoJogo,
      status: 'aguardando',
      roundAtual: 0,
      totalRounds: modoJogo === 'show-milhao' ? 12 : modoJogo === 'rapido' ? 5 : 20,
      criador: nomeJogador,
      dataCriacao: new Date()
    };

    setSala(novaSala);
    setMensagens([]);
    adicionarMensagem('host', 'HOST', `🔥 A ARENA ${novaSala.codigo} ACABA DE NASCER! Preparem-se para a batalha intelectual!`);
    adicionarMensagem('sistema', 'Sistema', `📋 Convide amigos com o codigo: ${novaSala.codigo}`);
    adicionarMensagem('narrador', 'Narrador', `O silencio paira sobre a arena... quem sera corajoso o suficiente para entrar?`);
    setTela('sala');
  };

  const entrarSala = () => {
    if (!nomeJogador.trim()) {
      alert('Digite seu nome!');
      return;
    }
    if (!codigoEntrada.trim()) {
      alert('Digite o codigo da sala!');
      return;
    }

    localStorage.setItem('arena_nome', nomeJogador);
    localStorage.setItem('arena_avatar', avatarJogador);

    // Simular entrada na sala
    const novaSala: Sala = {
      id: Date.now().toString(),
      codigo: codigoEntrada.toUpperCase(),
      nome: `Arena ${codigoEntrada.toUpperCase()}`,
      tipo: '1x1',
      participantes: [
        { id: '1', nome: 'Adversario', avatar: '🤖', fp: 0, acertos: 0, erros: 0, posicao: 1, streak: 0 },
        { id: '2', nome: nomeJogador, avatar: avatarJogador, fp: 0, acertos: 0, erros: 0, posicao: 2, streak: 0 }
      ],
      maxParticipantes: 2,
      modo: 'show-milhao',
      status: 'aguardando',
      roundAtual: 0,
      totalRounds: 12,
      criador: 'Adversario',
      dataCriacao: new Date()
    };

    setSala(novaSala);
    setMensagens([]);
    adicionarMensagem('host', 'HOST', `🎯 ${nomeJogador} ENTROU NA ARENA! A disputa esquenta!`);
    adicionarMensagem('rival', 'Rival', `Eita, chegou competicao! 😎 Bora ver se aguenta o ritmo, ${nomeJogador}!`);
    setTela('sala');
  };

  const iniciarJogo = () => {
    if (!sala) return;

    const questoesEmbaralhadas = [...QUESTOES_ARENA].sort(() => Math.random() - 0.5).slice(0, sala.totalRounds);
    setQuestoesJogo(questoesEmbaralhadas);
    setQuestaoAtual(questoesEmbaralhadas[0]);
    setQuestaoIndex(0);
    setTempoRestante(30);
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    setFpGanho(0);
    setStreak(0);
    setAjudasDisponiveis({ pular: 2, dica: 2, eliminar: 1 });
    setAlternativasEliminadas([]);
    setDicaAtiva(false);

    setSala(prev => prev ? { ...prev, status: 'em_andamento', roundAtual: 1 } : null);
    adicionarMensagem('host', 'HOST', `⚡ ROUND 1 COMECOU! Valendo ${questoesEmbaralhadas[0].fpValor} FP!`);
    adicionarMensagem('narrador', 'Narrador', `O relogio corre... a tensao sobe... quem vai dominar esta questao?`);
    setTela('jogo');
  };

  const verificarResposta = (index: number) => {
    if (!questaoAtual || mostrarResultado) return;

    setRespostaSelecionada(index);
    setMostrarResultado(true);

    const acertou = index === questaoAtual.correta;

    if (acertou) {
      const bonus = streak >= 3 ? Math.floor(questaoAtual.fpValor * 0.5) : 0;
      const fpTotal = questaoAtual.fpValor + bonus;
      setFpGanho(prev => prev + fpTotal);
      setStreak(prev => prev + 1);

      adicionarMensagem('host', 'HOST', `🎯 ACERTOU! +${fpTotal} FP ${bonus > 0 ? `(+${bonus} bonus streak!)` : ''}`);
      if (streak >= 2) {
        adicionarMensagem('rival', 'Rival', `Opa, ta pegando fogo! 🔥 ${streak + 1} seguidas!`);
      }
    } else {
      setStreak(0);
      if (index === -1) {
        adicionarMensagem('host', 'HOST', `⏰ TEMPO ESGOTADO! A resposta era: ${questaoAtual.alternativas[questaoAtual.correta]}`);
      } else {
        adicionarMensagem('host', 'HOST', `❌ ERROU! A resposta era: ${questaoAtual.alternativas[questaoAtual.correta]}`);
      }
      adicionarMensagem('rival', 'Rival', `Eita, escorregou feio nessa! 😅 Bora recuperar!`);
    }

    // Salvar progresso
    const fpAtual = parseInt(localStorage.getItem('fp_total') || '0');
    if (acertou) {
      localStorage.setItem('fp_total', String(fpAtual + questaoAtual.fpValor));
    }
  };

  const proximaQuestao = () => {
    if (questaoIndex >= questoesJogo.length - 1) {
      finalizarJogo();
      return;
    }

    const novoIndex = questaoIndex + 1;
    setQuestaoIndex(novoIndex);
    setQuestaoAtual(questoesJogo[novoIndex]);
    setTempoRestante(30);
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    setAlternativasEliminadas([]);
    setDicaAtiva(false);

    setSala(prev => prev ? { ...prev, roundAtual: novoIndex + 1 } : null);
    adicionarMensagem('host', 'HOST', `⚡ ROUND ${novoIndex + 1}! Valendo ${questoesJogo[novoIndex].fpValor} FP!`);
  };

  const finalizarJogo = () => {
    setSala(prev => prev ? { ...prev, status: 'finalizado' } : null);
    adicionarMensagem('host', 'HOST', `🏆 FIM DE JOGO! Voce conquistou ${fpGanho} FP!`);
    adicionarMensagem('narrador', 'Narrador', `A arena esfria... mas a gloria e eterna! Parabens, guerreiro do conhecimento!`);

    // Salvar historico
    const historico = JSON.parse(localStorage.getItem('arena_historico') || '[]');
    historico.push({
      data: new Date().toISOString(),
      fp: fpGanho,
      questoes: questoesJogo.length,
      sala: sala?.codigo
    });
    localStorage.setItem('arena_historico', JSON.stringify(historico.slice(-20)));

    setTela('sala');
  };

  const usarAjudaPular = () => {
    if (ajudasDisponiveis.pular <= 0 || mostrarResultado) return;
    setAjudasDisponiveis(prev => ({ ...prev, pular: prev.pular - 1 }));
    adicionarMensagem('sistema', 'Sistema', `⏭️ Questao pulada! Restam ${ajudasDisponiveis.pular - 1} pulos.`);
    proximaQuestao();
  };

  const usarAjudaDica = () => {
    if (ajudasDisponiveis.dica <= 0 || mostrarResultado || dicaAtiva) return;
    setAjudasDisponiveis(prev => ({ ...prev, dica: prev.dica - 1 }));
    setDicaAtiva(true);
    adicionarMensagem('sistema', 'Sistema', `💡 DICA: A resposta esta entre as alternativas que comecam com vogal ou contem numeros!`);
  };

  const usarAjudaEliminar = () => {
    if (ajudasDisponiveis.eliminar <= 0 || mostrarResultado || !questaoAtual) return;
    setAjudasDisponiveis(prev => ({ ...prev, eliminar: prev.eliminar - 1 }));

    const incorretas = questaoAtual.alternativas
      .map((_, i) => i)
      .filter(i => i !== questaoAtual.correta);
    const paraEliminar = incorretas.sort(() => Math.random() - 0.5).slice(0, 2);
    setAlternativasEliminadas(paraEliminar);
    adicionarMensagem('sistema', 'Sistema', `🎯 Duas alternativas eliminadas!`);
  };

  const copiarConvite = () => {
    if (!sala) return;
    const texto = `🔥 Entre na Arena ENEM-IA!\n\n🎯 Sala: ${sala.nome}\n🔑 Codigo: ${sala.codigo}\n🏆 Modo: ${sala.modo.replace('-', ' ')}\n\nBora disputar quem manda no conhecimento? 💪`;
    navigator.clipboard.writeText(texto);
    adicionarMensagem('sistema', 'Sistema', `📋 Convite copiado! Compartilhe com seus amigos!`);
  };

  // TELA MENU
  if (tela === 'menu') {
    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
        <FloatingNav />
        <div className="max-w-4xl mx-auto pt-16">
          <div className="text-center mb-12">
            <h1 className="title-ia text-4xl mb-4">🏟️ Arena de Desafios</h1>
            <p className="text-white/70 text-lg">Dispute batalhas de conhecimento com amigos!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card-ia p-8 hover:scale-105 transition cursor-pointer" onClick={() => setTela('criar')}>
              <div className="text-6xl mb-4 text-center">🎯</div>
              <h2 className="text-2xl font-bold text-center mb-2">Criar Sala</h2>
              <p className="text-white/60 text-center">Crie uma arena e convide amigos para disputar!</p>
            </div>

            <div className="card-ia p-8 hover:scale-105 transition cursor-pointer" onClick={() => setTela('entrar')}>
              <div className="text-6xl mb-4 text-center">🚪</div>
              <h2 className="text-2xl font-bold text-center mb-2">Entrar em Sala</h2>
              <p className="text-white/60 text-center">Use um codigo para entrar em uma arena existente!</p>
            </div>
          </div>

          <div className="card-ia p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🎮 Modos de Jogo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💎</span>
                  <span className="font-bold">Show do Milhao</span>
                </div>
                <p className="text-white/60 text-sm">12 perguntas com dificuldade crescente. Use ajudas estrategicamente!</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">⚡</span>
                  <span className="font-bold">Modo Rapido</span>
                </div>
                <p className="text-white/60 text-sm">5 questoes em ritmo acelerado. Ideal para desafios rapidos!</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏃</span>
                  <span className="font-bold">Maratona</span>
                </div>
                <p className="text-white/60 text-sm">20 questoes para testar sua resistencia intelectual!</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💀</span>
                  <span className="font-bold">Eliminatorio</span>
                </div>
                <p className="text-white/60 text-sm">Errou? Esta fora! Sobreviva o maximo possivel!</p>
              </div>
            </div>
          </div>
        </div>
        <ChalkBackToTop />
      </div>
    );
  }

  // TELA CRIAR SALA
  if (tela === 'criar') {
    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
        <FloatingNav />
        <div className="max-w-2xl mx-auto pt-16">
          <button onClick={() => setTela('menu')} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
            ← Voltar ao menu
          </button>

          <div className="card-ia p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">🎯 Criar Nova Arena</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Seu Nome</label>
                <input
                  type="text"
                  value={nomeJogador}
                  onChange={(e) => setNomeJogador(e.target.value)}
                  placeholder="Digite seu nome..."
                  className="input-ia w-full"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Escolha seu Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      onClick={() => setAvatarJogador(av)}
                      className={`text-3xl p-2 rounded-lg transition ${avatarJogador === av ? 'bg-yellow-500/30 ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Nome da Sala (opcional)</label>
                <input
                  type="text"
                  value={nomeSala}
                  onChange={(e) => setNomeSala(e.target.value)}
                  placeholder="Ex: Desafio da Turma 3B"
                  className="input-ia w-full"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Tipo de Sala</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { tipo: '1x1' as const, label: '1x1', desc: '2 jogadores' },
                    { tipo: 'dupla' as const, label: 'Duplas', desc: '4 jogadores' },
                    { tipo: 'grupo' as const, label: 'Grupo', desc: '8 jogadores' },
                    { tipo: 'turma' as const, label: 'Turma', desc: '30 jogadores' },
                    { tipo: 'publica' as const, label: 'Publica', desc: 'Qualquer um' },
                  ].map(opt => (
                    <button
                      key={opt.tipo}
                      onClick={() => setTipoSala(opt.tipo)}
                      className={`p-3 rounded-xl transition ${tipoSala === opt.tipo ? 'bg-emerald-500 border-emerald-400' : 'bg-white/10 hover:bg-white/20'} border-2 border-transparent`}
                    >
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-xs text-white/60">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Modo de Jogo</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { modo: 'show-milhao' as const, label: '💎 Show do Milhao', rounds: 12 },
                    { modo: 'rapido' as const, label: '⚡ Rapido', rounds: 5 },
                    { modo: 'maratona' as const, label: '🏃 Maratona', rounds: 20 },
                    { modo: 'eliminatorio' as const, label: '💀 Eliminatorio', rounds: '∞' },
                  ].map(opt => (
                    <button
                      key={opt.modo}
                      onClick={() => setModoJogo(opt.modo)}
                      className={`p-3 rounded-xl transition ${modoJogo === opt.modo ? 'bg-emerald-500 border-emerald-400' : 'bg-white/10 hover:bg-white/20'} border-2 border-transparent`}
                    >
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-xs text-white/60">{opt.rounds} rounds</div>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={criarSala} className="btn-ia w-full py-4 text-lg">
                🚀 Criar Arena
              </button>
            </div>
          </div>
        </div>
        <ChalkBackToTop />
      </div>
    );
  }

  // TELA ENTRAR NA SALA
  if (tela === 'entrar') {
    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
        <FloatingNav />
        <div className="max-w-md mx-auto pt-16">
          <button onClick={() => setTela('menu')} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
            ← Voltar ao menu
          </button>

          <div className="card-ia p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">🚪 Entrar em Arena</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Seu Nome</label>
                <input
                  type="text"
                  value={nomeJogador}
                  onChange={(e) => setNomeJogador(e.target.value)}
                  placeholder="Digite seu nome..."
                  className="input-ia w-full"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Escolha seu Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      onClick={() => setAvatarJogador(av)}
                      className={`text-3xl p-2 rounded-lg transition ${avatarJogador === av ? 'bg-yellow-500/30 ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">Codigo da Sala</label>
                <input
                  type="text"
                  value={codigoEntrada}
                  onChange={(e) => setCodigoEntrada(e.target.value.toUpperCase())}
                  placeholder="Ex: ENEM-X7D4"
                  className="input-ia w-full text-center text-2xl tracking-widest"
                  maxLength={9}
                />
              </div>

              <button onClick={entrarSala} className="btn-ia w-full py-4 text-lg">
                🎯 Entrar na Arena
              </button>
            </div>
          </div>
        </div>
        <ChalkBackToTop />
      </div>
    );
  }

  // TELA SALA (LOBBY)
  if (tela === 'sala' && sala) {
    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
        <FloatingNav />
        <div className="max-w-4xl mx-auto pt-16">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Info da Sala */}
            <div className="md:col-span-2 space-y-4">
              <div className="card-ia p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{sala.nome}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    sala.status === 'aguardando' ? 'bg-yellow-500/20 text-yellow-300' :
                    sala.status === 'em_andamento' ? 'bg-green-500/20 text-green-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {sala.status === 'aguardando' ? '⏳ Aguardando' :
                     sala.status === 'em_andamento' ? '🎮 Em Jogo' : '🏁 Finalizado'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-300">{sala.codigo}</div>
                    <div className="text-xs text-white/60">Codigo da Sala</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-emerald-400">{sala.participantes.length}/{sala.maxParticipantes}</div>
                    <div className="text-xs text-white/60">Participantes</div>
                  </div>
                </div>

                <button onClick={copiarConvite} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition flex items-center justify-center gap-2">
                  📋 Copiar Convite
                </button>
              </div>

              {/* Chat */}
              <div className="card-ia p-4" style={{ height: '300px' }}>
                <div className="h-full flex flex-col">
                  <h3 className="font-bold mb-2 flex items-center gap-2">💬 Chat da Arena</h3>
                  <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                    {mensagens.map(msg => (
                      <div key={msg.id} className={`p-2 rounded-lg text-sm ${
                        msg.tipo === 'host' ? 'bg-yellow-500/20 border-l-4 border-yellow-500' :
                        msg.tipo === 'narrador' ? 'bg-purple-500/20 border-l-4 border-purple-500 italic' :
                        msg.tipo === 'rival' ? 'bg-red-500/20 border-l-4 border-red-500' :
                        msg.tipo === 'sistema' ? 'bg-blue-500/20 border-l-4 border-blue-500' :
                        'bg-white/10'
                      }`}>
                        <span className="font-bold">{msg.autor}:</span> {msg.conteudo}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            </div>

            {/* Participantes e Acoes */}
            <div className="space-y-4">
              <div className="card-ia p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">👥 Participantes</h3>
                <div className="space-y-2">
                  {sala.participantes.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <span className="text-2xl">{p.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium">{p.nome}</div>
                        <div className="text-xs text-yellow-300">{p.fp} FP</div>
                      </div>
                      {i === 0 && <span className="text-xs bg-yellow-500/30 px-2 py-1 rounded">👑 Host</span>}
                    </div>
                  ))}
                </div>
              </div>

              {sala.status === 'aguardando' && (
                <button onClick={iniciarJogo} className="btn-ia w-full py-4 text-lg">
                  🚀 Iniciar Jogo!
                </button>
              )}

              {sala.status === 'finalizado' && (
                <div className="card-ia p-4 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-yellow-300">{fpGanho} FP</div>
                  <div className="text-white/60">conquistados!</div>
                  <button onClick={() => setTela('menu')} className="btn-ia w-full mt-4">
                    Voltar ao Menu
                  </button>
                </div>
              )}

              <button onClick={() => setTela('menu')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition">
                ← Sair da Sala
              </button>
            </div>
          </div>
        </div>
        <ChalkBackToTop />
      </div>
    );
  }

  // TELA JOGO
  if (tela === 'jogo' && questaoAtual && sala) {
    return (
      <div className="min-h-screen bg-[#0D1F22] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header do Jogo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs text-white/60">Round</div>
                <div className="text-2xl font-bold">{questaoIndex + 1}/{questoesJogo.length}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60">FP</div>
                <div className="text-2xl font-bold text-yellow-300">{fpGanho}</div>
              </div>
              {streak >= 2 && (
                <div className="text-center">
                  <div className="text-xs text-white/60">Streak</div>
                  <div className="text-2xl font-bold text-orange-400">🔥{streak}</div>
                </div>
              )}
            </div>

            <div className={`text-4xl font-bold ${tempoRestante <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              ⏱️ {tempoRestante}s
            </div>
          </div>

          {/* Questao */}
          <div className="card-ia p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                questaoAtual.dificuldade === 'facil' ? 'bg-green-500/30 text-green-300' :
                questaoAtual.dificuldade === 'media' ? 'bg-yellow-500/30 text-yellow-300' :
                questaoAtual.dificuldade === 'dificil' ? 'bg-orange-500/30 text-orange-300' :
                'bg-red-500/30 text-red-300'
              }`}>
                {questaoAtual.dificuldade.toUpperCase()}
              </span>
              <span className="text-yellow-300 font-bold">+{questaoAtual.fpValor} FP</span>
            </div>

            <h3 className="text-xl font-bold mb-6">{questaoAtual.enunciado}</h3>

            <div className="space-y-3">
              {questaoAtual.alternativas.map((alt, i) => {
                const eliminada = alternativasEliminadas.includes(i);
                const selecionada = respostaSelecionada === i;
                const correta = questaoAtual.correta === i;

                return (
                  <button
                    key={i}
                    onClick={() => !mostrarResultado && !eliminada && verificarResposta(i)}
                    disabled={mostrarResultado || eliminada}
                    className={`w-full p-4 rounded-xl text-left transition flex items-center gap-3 ${
                      eliminada ? 'opacity-30 line-through bg-white/5' :
                      mostrarResultado && correta ? 'bg-green-500/30 border-2 border-green-400' :
                      mostrarResultado && selecionada && !correta ? 'bg-red-500/30 border-2 border-red-400' :
                      selecionada ? 'bg-yellow-500/30 border-2 border-yellow-400' :
                      'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{alt}</span>
                    {mostrarResultado && correta && <span className="ml-auto">✓</span>}
                    {mostrarResultado && selecionada && !correta && <span className="ml-auto">✗</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ajudas */}
          {!mostrarResultado && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={usarAjudaPular}
                disabled={ajudasDisponiveis.pular <= 0}
                className={`px-4 py-2 rounded-xl transition ${ajudasDisponiveis.pular > 0 ? 'bg-blue-500/30 hover:bg-blue-500/50' : 'bg-white/10 opacity-50'}`}
              >
                ⏭️ Pular ({ajudasDisponiveis.pular})
              </button>
              <button
                onClick={usarAjudaDica}
                disabled={ajudasDisponiveis.dica <= 0 || dicaAtiva}
                className={`px-4 py-2 rounded-xl transition ${ajudasDisponiveis.dica > 0 && !dicaAtiva ? 'bg-purple-500/30 hover:bg-purple-500/50' : 'bg-white/10 opacity-50'}`}
              >
                💡 Dica ({ajudasDisponiveis.dica})
              </button>
              <button
                onClick={usarAjudaEliminar}
                disabled={ajudasDisponiveis.eliminar <= 0 || alternativasEliminadas.length > 0}
                className={`px-4 py-2 rounded-xl transition ${ajudasDisponiveis.eliminar > 0 && alternativasEliminadas.length === 0 ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-white/10 opacity-50'}`}
              >
                ❌ Eliminar 2 ({ajudasDisponiveis.eliminar})
              </button>
            </div>
          )}

          {/* Botao Proxima */}
          {mostrarResultado && (
            <button onClick={proximaQuestao} className="btn-ia w-full py-4 text-lg">
              {questaoIndex >= questoesJogo.length - 1 ? '🏁 Ver Resultado' : '➡️ Proxima Questao'}
            </button>
          )}

          {/* Mini Chat */}
          <div className="card-ia p-3 mt-6 max-h-40 overflow-y-auto">
            {mensagens.slice(-5).map(msg => (
              <div key={msg.id} className={`text-sm mb-1 ${
                msg.tipo === 'host' ? 'text-yellow-300' :
                msg.tipo === 'rival' ? 'text-red-300' :
                'text-white/60'
              }`}>
                <span className="font-bold">{msg.autor}:</span> {msg.conteudo}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
