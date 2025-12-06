'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
          <div className="header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--chalk-white)', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
              🏟️ Arena de Desafios
            </h1>
            <p style={{ color: 'var(--chalk-dim)', fontSize: '1.125rem' }}>
              Dispute batalhas de conhecimento com amigos!
            </p>
          </div>

          <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div
              className="chalkboard-card"
              onClick={() => setTela('criar')}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', textAlign: 'center', padding: '2rem' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
              <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Criar Sala</h2>
              <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                Crie uma arena e convide amigos para disputar!
              </p>
            </div>

            <div
              className="chalkboard-card"
              onClick={() => setTela('entrar')}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', textAlign: 'center', padding: '2rem' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚪</div>
              <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>Entrar em Sala</h2>
              <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                Use um codigo para entrar em uma arena existente!
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎮 Modos de Jogo
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💎</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>Show do Milhao</span>
                </div>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                  12 perguntas com dificuldade crescente. Use ajudas estrategicamente!
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>⚡</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>Modo Rapido</span>
                </div>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                  5 questoes em ritmo acelerado. Ideal para desafios rapidos!
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏃</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>Maratona</span>
                </div>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                  20 questoes para testar sua resistencia intelectual!
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💀</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>Eliminatorio</span>
                </div>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                  Errou? Esta fora! Sobreviva o maximo possivel!
                </p>
              </div>
            </div>
          </div>

          <div className="footer" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a
              href="/enem"
              style={{
                color: 'var(--accent-yellow)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              ← Voltar ao Dashboard ENEM
            </a>
          </div>
        </div>
      </div>
    );
  }

  // TELA CRIAR SALA
  if (tela === 'criar') {
    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '4rem' }}>
          <button
            onClick={() => setTela('menu')}
            className="btn"
            style={{ marginBottom: '1.5rem' }}
          >
            ← Voltar ao menu
          </button>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              🎯 Criar Nova Arena
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={nomeJogador}
                  onChange={(e) => setNomeJogador(e.target.value)}
                  placeholder="Digite seu nome..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Escolha seu Avatar
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      onClick={() => setAvatarJogador(av)}
                      style={{
                        fontSize: '1.875rem',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        background: avatarJogador === av ? 'rgba(255, 193, 7, 0.3)' : 'rgba(255,255,255,0.1)',
                        border: avatarJogador === av ? '2px solid var(--accent-yellow)' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Nome da Sala (opcional)
                </label>
                <input
                  type="text"
                  value={nomeSala}
                  onChange={(e) => setNomeSala(e.target.value)}
                  placeholder="Ex: Desafio da Turma 3B"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Tipo de Sala
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
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
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        background: tipoSala === opt.tipo ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)',
                        border: '2px solid ' + (tipoSala === opt.tipo ? 'var(--accent-green)' : 'transparent'),
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        color: 'var(--chalk-white)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)' }}>{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Modo de Jogo
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {[
                    { modo: 'show-milhao' as const, label: '💎 Show do Milhao', rounds: 12 },
                    { modo: 'rapido' as const, label: '⚡ Rapido', rounds: 5 },
                    { modo: 'maratona' as const, label: '🏃 Maratona', rounds: 20 },
                    { modo: 'eliminatorio' as const, label: '💀 Eliminatorio', rounds: '∞' },
                  ].map(opt => (
                    <button
                      key={opt.modo}
                      onClick={() => setModoJogo(opt.modo)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        background: modoJogo === opt.modo ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)',
                        border: '2px solid ' + (modoJogo === opt.modo ? 'var(--accent-green)' : 'transparent'),
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        color: 'var(--chalk-white)'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)' }}>{opt.rounds} rounds</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={criarSala}
                className="btn btn-yellow"
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
              >
                🚀 Criar Arena
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA ENTRAR NA SALA
  if (tela === 'entrar') {
    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        <div style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '4rem' }}>
          <button
            onClick={() => setTela('menu')}
            className="btn"
            style={{ marginBottom: '1.5rem' }}
          >
            ← Voltar ao menu
          </button>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              🚪 Entrar em Arena
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={nomeJogador}
                  onChange={(e) => setNomeJogador(e.target.value)}
                  placeholder="Digite seu nome..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Escolha seu Avatar
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      onClick={() => setAvatarJogador(av)}
                      style={{
                        fontSize: '1.875rem',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        background: avatarJogador === av ? 'rgba(255, 193, 7, 0.3)' : 'rgba(255,255,255,0.1)',
                        border: avatarJogador === av ? '2px solid var(--accent-yellow)' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                  Codigo da Sala
                </label>
                <input
                  type="text"
                  value={codigoEntrada}
                  onChange={(e) => setCodigoEntrada(e.target.value.toUpperCase())}
                  placeholder="Ex: ENEM-X7D4"
                  maxLength={9}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem',
                    color: 'var(--chalk-white)',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    letterSpacing: '0.1em'
                  }}
                />
              </div>

              <button
                onClick={entrarSala}
                className="btn btn-yellow"
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
              >
                🎯 Entrar na Arena
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA SALA (LOBBY)
  if (tela === 'sala' && sala) {
    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Info da Sala */}
            <div style={{ gridColumn: 'span 2' }}>
              <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h2 className="card-title">{sala.nome}</h2>
                  <span className="badge" style={{
                    background: sala.status === 'aguardando' ? 'rgba(255, 193, 7, 0.2)' :
                               sala.status === 'em_andamento' ? 'rgba(76, 175, 80, 0.2)' :
                               'rgba(158, 158, 158, 0.2)',
                    color: sala.status === 'aguardando' ? 'var(--accent-yellow)' :
                          sala.status === 'em_andamento' ? 'var(--accent-green)' :
                          'var(--chalk-dim)'
                  }}>
                    {sala.status === 'aguardando' ? '⏳ Aguardando' :
                     sala.status === 'em_andamento' ? '🎮 Em Jogo' : '🏁 Finalizado'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>
                      {sala.codigo}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)' }}>Codigo da Sala</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
                      {sala.participantes.length}/{sala.maxParticipantes}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)' }}>Participantes</div>
                  </div>
                </div>

                <button
                  onClick={copiarConvite}
                  className="btn"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  📋 Copiar Convite
                </button>
              </div>

              {/* Chat */}
              <div className="card" style={{ padding: '1rem', height: '300px', display: 'flex', flexDirection: 'column' }}>
                <h3 className="card-title" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💬 Chat da Arena
                </h3>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '0.5rem' }}>
                  {mensagens.map(msg => (
                    <div
                      key={msg.id}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                        background: msg.tipo === 'host' ? 'rgba(255, 193, 7, 0.2)' :
                                   msg.tipo === 'narrador' ? 'rgba(156, 39, 176, 0.2)' :
                                   msg.tipo === 'rival' ? 'rgba(244, 67, 54, 0.2)' :
                                   msg.tipo === 'sistema' ? 'rgba(33, 150, 243, 0.2)' :
                                   'rgba(255,255,255,0.1)',
                        borderLeft: `4px solid ${
                          msg.tipo === 'host' ? 'var(--accent-yellow)' :
                          msg.tipo === 'narrador' ? '#9C27B0' :
                          msg.tipo === 'rival' ? '#F44336' :
                          msg.tipo === 'sistema' ? '#2196F3' :
                          'transparent'
                        }`,
                        fontStyle: msg.tipo === 'narrador' ? 'italic' : 'normal'
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>{msg.autor}:</span> {msg.conteudo}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Participantes e Acoes */}
            <div>
              <div className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                <h3 className="card-title" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  👥 Participantes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {sala.participantes.map((p, i) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{p.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>{p.nome}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-yellow)' }}>{p.fp} FP</div>
                      </div>
                      {i === 0 && (
                        <span className="badge" style={{ fontSize: '0.75rem' }}>
                          👑 Host
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {sala.status === 'aguardando' && (
                <button
                  onClick={iniciarJogo}
                  className="btn btn-yellow"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginBottom: '1rem' }}
                >
                  🚀 Iniciar Jogo!
                </button>
              )}

              {sala.status === 'finalizado' && (
                <div className="card" style={{ padding: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-yellow)', marginBottom: '0.25rem' }}>
                    {fpGanho} FP
                  </div>
                  <div style={{ color: 'var(--chalk-dim)' }}>conquistados!</div>
                  <button
                    onClick={() => setTela('menu')}
                    className="btn btn-yellow"
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    Voltar ao Menu
                  </button>
                </div>
              )}

              <button
                onClick={() => setTela('menu')}
                className="btn"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                ← Sair da Sala
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA JOGO
  if (tela === 'jogo' && questaoAtual && sala) {
    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header do Jogo */}
          <div className="stats-bar" style={{ marginBottom: '1.5rem' }}>
            <div className="stat-item">
              <div className="stat-label">Round</div>
              <div className="stat-number">{questaoIndex + 1}/{questoesJogo.length}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">FP</div>
              <div className="stat-number" style={{ color: 'var(--accent-yellow)' }}>{fpGanho}</div>
            </div>
            {streak >= 2 && (
              <div className="stat-item">
                <div className="stat-label">Streak</div>
                <div className="stat-number" style={{ color: '#FF9800' }}>🔥{streak}</div>
              </div>
            )}
            <div className="stat-item">
              <div className="stat-label">Tempo</div>
              <div
                className="stat-number"
                style={{
                  fontSize: '2rem',
                  color: tempoRestante <= 10 ? '#F44336' : 'var(--chalk-white)',
                  animation: tempoRestante <= 10 ? 'pulse 1s infinite' : 'none'
                }}
              >
                ⏱️ {tempoRestante}s
              </div>
            </div>
          </div>

          {/* Questao */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge" style={{
                background: questaoAtual.dificuldade === 'facil' ? 'rgba(76, 175, 80, 0.3)' :
                           questaoAtual.dificuldade === 'media' ? 'rgba(255, 193, 7, 0.3)' :
                           questaoAtual.dificuldade === 'dificil' ? 'rgba(255, 152, 0, 0.3)' :
                           'rgba(244, 67, 54, 0.3)',
                color: questaoAtual.dificuldade === 'facil' ? '#4CAF50' :
                      questaoAtual.dificuldade === 'media' ? 'var(--accent-yellow)' :
                      questaoAtual.dificuldade === 'dificil' ? '#FF9800' :
                      '#F44336'
              }}>
                {questaoAtual.dificuldade.toUpperCase()}
              </span>
              <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
                +{questaoAtual.fpValor} FP
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--chalk-white)' }}>
              {questaoAtual.enunciado}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {questaoAtual.alternativas.map((alt, i) => {
                const eliminada = alternativasEliminadas.includes(i);
                const selecionada = respostaSelecionada === i;
                const correta = questaoAtual.correta === i;

                return (
                  <button
                    key={i}
                    onClick={() => !mostrarResultado && !eliminada && verificarResposta(i)}
                    disabled={mostrarResultado || eliminada}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: mostrarResultado || eliminada ? 'default' : 'pointer',
                      opacity: eliminada ? 0.3 : 1,
                      textDecoration: eliminada ? 'line-through' : 'none',
                      background: eliminada ? 'rgba(255,255,255,0.05)' :
                                 mostrarResultado && correta ? 'rgba(76, 175, 80, 0.3)' :
                                 mostrarResultado && selecionada && !correta ? 'rgba(244, 67, 54, 0.3)' :
                                 selecionada ? 'rgba(255, 193, 7, 0.3)' :
                                 'rgba(255,255,255,0.1)',
                      border: '2px solid ' + (
                        mostrarResultado && correta ? '#4CAF50' :
                        mostrarResultado && selecionada && !correta ? '#F44336' :
                        selecionada ? 'var(--accent-yellow)' :
                        'transparent'
                      ),
                      transition: 'all 0.2s',
                      color: 'var(--chalk-white)'
                    }}
                  >
                    <span style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ flex: 1 }}>{alt}</span>
                    {mostrarResultado && correta && <span>✓</span>}
                    {mostrarResultado && selecionada && !correta && <span>✗</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ajudas */}
          {!mostrarResultado && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={usarAjudaPular}
                disabled={ajudasDisponiveis.pular <= 0}
                className="btn"
                style={{
                  background: ajudasDisponiveis.pular > 0 ? 'rgba(33, 150, 243, 0.3)' : 'rgba(255,255,255,0.1)',
                  opacity: ajudasDisponiveis.pular > 0 ? 1 : 0.5,
                  cursor: ajudasDisponiveis.pular > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                ⏭️ Pular ({ajudasDisponiveis.pular})
              </button>
              <button
                onClick={usarAjudaDica}
                disabled={ajudasDisponiveis.dica <= 0 || dicaAtiva}
                className="btn"
                style={{
                  background: ajudasDisponiveis.dica > 0 && !dicaAtiva ? 'rgba(156, 39, 176, 0.3)' : 'rgba(255,255,255,0.1)',
                  opacity: ajudasDisponiveis.dica > 0 && !dicaAtiva ? 1 : 0.5,
                  cursor: ajudasDisponiveis.dica > 0 && !dicaAtiva ? 'pointer' : 'not-allowed'
                }}
              >
                💡 Dica ({ajudasDisponiveis.dica})
              </button>
              <button
                onClick={usarAjudaEliminar}
                disabled={ajudasDisponiveis.eliminar <= 0 || alternativasEliminadas.length > 0}
                className="btn"
                style={{
                  background: ajudasDisponiveis.eliminar > 0 && alternativasEliminadas.length === 0 ? 'rgba(244, 67, 54, 0.3)' : 'rgba(255,255,255,0.1)',
                  opacity: ajudasDisponiveis.eliminar > 0 && alternativasEliminadas.length === 0 ? 1 : 0.5,
                  cursor: ajudasDisponiveis.eliminar > 0 && alternativasEliminadas.length === 0 ? 'pointer' : 'not-allowed'
                }}
              >
                ❌ Eliminar 2 ({ajudasDisponiveis.eliminar})
              </button>
            </div>
          )}

          {/* Botao Proxima */}
          {mostrarResultado && (
            <button
              onClick={proximaQuestao}
              className="btn btn-yellow"
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
            >
              {questaoIndex >= questoesJogo.length - 1 ? '🏁 Ver Resultado' : '➡️ Proxima Questao'}
            </button>
          )}

          {/* Mini Chat */}
          <div className="card" style={{ padding: '0.75rem', marginTop: '1.5rem', maxHeight: '160px', overflowY: 'auto' }}>
            {mensagens.slice(-5).map(msg => (
              <div
                key={msg.id}
                style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.25rem',
                  color: msg.tipo === 'host' ? 'var(--accent-yellow)' :
                        msg.tipo === 'rival' ? '#F44336' :
                        'var(--chalk-dim)'
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{msg.autor}:</span> {msg.conteudo}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
