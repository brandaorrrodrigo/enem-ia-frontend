'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface TecnicaTempo {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  duracao: string;
  passos: string[];
  beneficios: string[];
  indicado: string;
}

const TECNICAS_TEMPO: TecnicaTempo[] = [
  {
    id: 'pomodoro',
    nome: 'Tecnica Pomodoro',
    descricao: 'Divida seu estudo em blocos de 25 minutos com pausas de 5 minutos.',
    icone: '🍅',
    cor: 'from-red-500 to-orange-500',
    duracao: '25 min + 5 min pausa',
    passos: [
      'Escolha uma tarefa para estudar',
      'Configure o timer para 25 minutos',
      'Estude sem interrupcoes ate o alarme',
      'Faca uma pausa de 5 minutos',
      'A cada 4 pomodoros, pausa de 15-30 min'
    ],
    beneficios: ['Aumenta o foco', 'Combate a procrastinacao', 'Reduz a fadiga mental', 'Melhora a gestao do tempo'],
    indicado: 'Para quem tem dificuldade de manter o foco'
  },
  {
    id: 'bloco',
    nome: 'Estudo em Blocos',
    descricao: 'Divida materias em blocos de tempo especificos ao longo do dia.',
    icone: '📦',
    cor: 'from-blue-500 to-cyan-500',
    duracao: '1-2 horas por bloco',
    passos: [
      'Liste todas as materias a estudar',
      'Divida o dia em blocos de 1-2 horas',
      'Atribua uma materia por bloco',
      'Alterne entre materias diferentes',
      'Inclua intervalos entre blocos'
    ],
    beneficios: ['Organizacao clara', 'Estudo equilibrado', 'Evita sobrecarga', 'Facilita revisoes'],
    indicado: 'Para quem estuda varias materias'
  },
  {
    id: 'espaco',
    nome: 'Estudo Espacado',
    descricao: 'Distribua o estudo ao longo do tempo ao inves de concentrar.',
    icone: '📅',
    cor: 'from-green-500 to-emerald-500',
    duracao: 'Varios dias/semanas',
    passos: [
      'Revise o conteudo no mesmo dia',
      'Revise novamente apos 1 dia',
      'Revise apos 3 dias',
      'Revise apos 1 semana',
      'Revise apos 2 semanas'
    ],
    beneficios: ['Memoria de longo prazo', 'Retencao efetiva', 'Menos esquecimento', 'Estudo mais leve'],
    indicado: 'Para memorizar conteudo a longo prazo'
  },
  {
    id: 'intercalado',
    nome: 'Estudo Intercalado',
    descricao: 'Misture diferentes topicos na mesma sessao de estudo.',
    icone: '🔀',
    cor: 'from-purple-500 to-pink-500',
    duracao: '30-45 min por topico',
    passos: [
      'Selecione 2-3 topicos diferentes',
      'Estude o primeiro topico por 30 min',
      'Mude para o segundo topico',
      'Mude para o terceiro topico',
      'Repita o ciclo se necessario'
    ],
    beneficios: ['Maior retencao', 'Conexoes entre conteudos', 'Mais engajamento', 'Melhor aplicacao'],
    indicado: 'Para revisar conteudos ja estudados'
  },
  {
    id: 'matriz',
    nome: 'Matriz de Eisenhower',
    descricao: 'Priorize tarefas por urgencia e importancia.',
    icone: '📊',
    cor: 'from-yellow-500 to-orange-500',
    duracao: '15 min para planejar',
    passos: [
      'Liste todas as tarefas pendentes',
      'Classifique: urgente + importante = fazer ja',
      'Importante + nao urgente = agendar',
      'Urgente + nao importante = delegar/simplificar',
      'Nao urgente + nao importante = eliminar'
    ],
    beneficios: ['Prioridades claras', 'Menos estresse', 'Foco no essencial', 'Melhor produtividade'],
    indicado: 'Para quem tem muitas tarefas acumuladas'
  },
  {
    id: 'gtd',
    nome: 'Getting Things Done (GTD)',
    descricao: 'Capture tudo, processe e organize em acoes concretas.',
    icone: '✅',
    cor: 'from-indigo-500 to-violet-500',
    duracao: '30 min para organizar',
    passos: [
      'Capture: anote tudo que precisa fazer',
      'Esclareça: defina o proximo passo',
      'Organize: categorize por contexto',
      'Reflita: revise semanalmente',
      'Engaje: execute com foco'
    ],
    beneficios: ['Mente livre', 'Nada esquecido', 'Clareza total', 'Menos ansiedade'],
    indicado: 'Para quem se sente sobrecarregado'
  }
];

interface Cronograma {
  id: string;
  horario: string;
  atividade: string;
  duracao: number;
  tipo: 'estudo' | 'pausa' | 'refeicao' | 'exercicio' | 'sono';
}

const CRONOGRAMA_MODELO: Cronograma[] = [
  { id: '1', horario: '06:00', atividade: 'Acordar + Higiene', duracao: 30, tipo: 'pausa' },
  { id: '2', horario: '06:30', atividade: 'Exercicio leve', duracao: 30, tipo: 'exercicio' },
  { id: '3', horario: '07:00', atividade: 'Cafe da manha', duracao: 30, tipo: 'refeicao' },
  { id: '4', horario: '07:30', atividade: 'Bloco 1 - Matematica', duracao: 90, tipo: 'estudo' },
  { id: '5', horario: '09:00', atividade: 'Pausa + Lanche', duracao: 15, tipo: 'pausa' },
  { id: '6', horario: '09:15', atividade: 'Bloco 2 - Linguagens', duracao: 90, tipo: 'estudo' },
  { id: '7', horario: '10:45', atividade: 'Pausa', duracao: 15, tipo: 'pausa' },
  { id: '8', horario: '11:00', atividade: 'Bloco 3 - Humanas', duracao: 90, tipo: 'estudo' },
  { id: '9', horario: '12:30', atividade: 'Almoco + Descanso', duracao: 90, tipo: 'refeicao' },
  { id: '10', horario: '14:00', atividade: 'Bloco 4 - Natureza', duracao: 90, tipo: 'estudo' },
  { id: '11', horario: '15:30', atividade: 'Pausa + Lanche', duracao: 30, tipo: 'pausa' },
  { id: '12', horario: '16:00', atividade: 'Bloco 5 - Redacao', duracao: 90, tipo: 'estudo' },
  { id: '13', horario: '17:30', atividade: 'Revisao do dia', duracao: 30, tipo: 'estudo' },
  { id: '14', horario: '18:00', atividade: 'Tempo livre', duracao: 60, tipo: 'pausa' },
  { id: '15', horario: '19:00', atividade: 'Jantar', duracao: 60, tipo: 'refeicao' },
  { id: '16', horario: '20:00', atividade: 'Estudo leve / Questoes', duracao: 90, tipo: 'estudo' },
  { id: '17', horario: '21:30', atividade: 'Relaxamento', duracao: 60, tipo: 'pausa' },
  { id: '18', horario: '22:30', atividade: 'Sono', duracao: 450, tipo: 'sono' },
];

export default function GestaoTempoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'tecnicas' | 'cronograma' | 'dicas'>('tecnicas');
  const [tecnicaSelecionada, setTecnicaSelecionada] = useState<TecnicaTempo | null>(null);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'estudo': return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
      case 'pausa': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'refeicao': return 'bg-orange-500/20 border-orange-500/30 text-orange-300';
      case 'exercicio': return 'bg-pink-500/20 border-pink-500/30 text-pink-300';
      case 'sono': return 'bg-purple-500/20 border-purple-500/30 text-purple-300';
      default: return 'bg-white/10 text-white/70';
    }
  };

  const getTipoEmoji = (tipo: string) => {
    switch (tipo) {
      case 'estudo': return '📚';
      case 'pausa': return '☕';
      case 'refeicao': return '🍽️';
      case 'exercicio': return '🏃';
      case 'sono': return '😴';
      default: return '📌';
    }
  };

  const horasEstudo = CRONOGRAMA_MODELO.filter(c => c.tipo === 'estudo').reduce((acc, c) => acc + c.duracao, 0) / 60;

  return (
    <div className="min-h-screen" style={{
      background: 'var(--chalkboard-bg)',
      padding: '2rem 1rem',
      minHeight: '100vh'
    }}>
      <FloatingBackButton />
      <FloatingNav />

      {/* Container principal */}
      <div className="max-w-7xl mx-auto" style={{ paddingTop: '4rem' }}>

        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 mb-2" style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'var(--font-handwriting)',
            color: 'var(--chalk-white)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '0.5rem'
          }}>
            ⏰ Gestao de Tempo
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--chalk-dim)',
            fontFamily: 'var(--font-handwriting)'
          }}>
            Tecnicas e estrategias para otimizar seus estudos
          </p>
        </div>

        {/* Tabs de navegação */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('tecnicas')}
            className="px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all"
            style={{
              background: activeTab === 'tecnicas' ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'tecnicas' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)',
              fontFamily: 'var(--font-handwriting)',
              border: activeTab === 'tecnicas' ? '2px solid var(--accent-yellow)' : '2px solid transparent',
              transform: activeTab === 'tecnicas' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            📚 Tecnicas de Estudo
          </button>
          <button
            onClick={() => setActiveTab('cronograma')}
            className="px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all"
            style={{
              background: activeTab === 'cronograma' ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'cronograma' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)',
              fontFamily: 'var(--font-handwriting)',
              border: activeTab === 'cronograma' ? '2px solid var(--accent-yellow)' : '2px solid transparent',
              transform: activeTab === 'cronograma' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            📅 Cronograma Modelo
          </button>
          <button
            onClick={() => setActiveTab('dicas')}
            className="px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all"
            style={{
              background: activeTab === 'dicas' ? 'var(--accent-yellow)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'dicas' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)',
              fontFamily: 'var(--font-handwriting)',
              border: activeTab === 'dicas' ? '2px solid var(--accent-yellow)' : '2px solid transparent',
              transform: activeTab === 'dicas' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            💡 Dicas Praticas
          </button>
        </div>

        {/* Tab: Técnicas */}
        {activeTab === 'tecnicas' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECNICAS_TEMPO.map((tecnica) => (
              <div
                key={tecnica.id}
                onClick={() => setTecnicaSelecionada(tecnica)}
                className="chalkboard-card cursor-pointer group hover:scale-105 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '3px solid rgba(255,255,255,0.2)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${tecnica.cor} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                  {tecnica.icone}
                </div>
                <h3 style={{
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.25rem'
                }}>
                  {tecnica.nome}
                </h3>
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  {tecnica.descricao}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--chalk-dim)' }}>
                  <span>⏱️ {tecnica.duracao}</span>
                </div>
                <button
                  className="btn btn-yellow w-full mt-4"
                  style={{
                    background: 'var(--accent-yellow)',
                    color: 'var(--chalkboard-green)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-handwriting)',
                    border: '2px solid var(--accent-yellow)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Cronograma */}
        {activeTab === 'cronograma' && (
          <div>
            {/* Resumo */}
            <div className="card mb-6" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                📊 Resumo do Cronograma
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(59, 130, 246, 0.3)' }}>
                  <p className="text-2xl font-bold text-blue-300">{horasEstudo.toFixed(1)}h</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Estudo</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(34, 197, 94, 0.3)' }}>
                  <p className="text-2xl font-bold text-green-300">{(CRONOGRAMA_MODELO.filter(c => c.tipo === 'pausa').reduce((acc, c) => acc + c.duracao, 0) / 60).toFixed(1)}h</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Pausas</p>
                </div>
                <div className="bg-orange-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(249, 115, 22, 0.3)' }}>
                  <p className="text-2xl font-bold text-orange-300">{(CRONOGRAMA_MODELO.filter(c => c.tipo === 'refeicao').reduce((acc, c) => acc + c.duracao, 0) / 60).toFixed(1)}h</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Refeicoes</p>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}>
                  <p className="text-2xl font-bold text-purple-300">{(CRONOGRAMA_MODELO.filter(c => c.tipo === 'sono').reduce((acc, c) => acc + c.duracao, 0) / 60).toFixed(1)}h</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Sono</p>
                </div>
              </div>
            </div>

            {/* Cronograma detalhado */}
            <div className="card" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                📅 Cronograma Diario Modelo
              </h3>
              <div className="space-y-2">
                {CRONOGRAMA_MODELO.map((item) => (
                  <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl border ${getTipoColor(item.tipo)}`}>
                    <span className="text-2xl">{getTipoEmoji(item.tipo)}</span>
                    <span style={{
                      color: 'var(--chalk-white)',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      width: '4rem'
                    }}>
                      {item.horario}
                    </span>
                    <span style={{ color: 'var(--chalk-white)', flex: 1 }}>{item.atividade}</span>
                    <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>{item.duracao} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Dicas */}
        {activeTab === 'dicas' && (
          <div className="space-y-6">
            {/* Dicas de Foco */}
            <div className="card" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 className="flex items-center gap-2 mb-4" style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                🧠 Dicas para Maximizar o Foco
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { dica: 'Silencie notificacoes do celular', icone: '📱' },
                  { dica: 'Use fones com musica sem letra', icone: '🎧' },
                  { dica: 'Estude sempre no mesmo local', icone: '📍' },
                  { dica: 'Mantenha agua por perto', icone: '💧' },
                  { dica: 'Iluminacao adequada', icone: '💡' },
                  { dica: 'Mesa organizada', icone: '🗂️' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-2xl">{item.icone}</span>
                    <span style={{ color: 'var(--chalk-white)' }}>{item.dica}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Importância do Sono */}
            <div className="card" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 className="flex items-center gap-2 mb-4" style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                😴 Importancia do Sono
              </h3>
              <p style={{ color: 'var(--chalk-dim)', marginBottom: '1rem' }}>
                O sono e essencial para a consolidacao da memoria. Durante o sono, seu cerebro processa e armazena o que voce estudou.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-purple-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}>
                  <p className="text-3xl mb-2">7-8h</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Horas ideais de sono</p>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}>
                  <p className="text-3xl mb-2">22:30</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Horario ideal para dormir</p>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 text-center" style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}>
                  <p className="text-3xl mb-2">30min</p>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Sem telas antes de dormir</p>
                </div>
              </div>
            </div>

            {/* Exercício Físico */}
            <div className="card" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 className="flex items-center gap-2 mb-4" style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                🏃 Exercicio Fisico
              </h3>
              <p style={{ color: 'var(--chalk-dim)', marginBottom: '1rem' }}>
                Exercicio fisico melhora a oxigenacao do cerebro, reduz o estresse e aumenta a capacidade de concentracao.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Caminhada 30min', 'Alongamento', 'Yoga', 'Corrida leve', 'Bicicleta'].map((ex, idx) => (
                  <span
                    key={idx}
                    className="badge px-3 py-1 rounded-full text-sm"
                    style={{
                      background: 'rgba(236, 72, 153, 0.2)',
                      color: '#f9a8d4',
                      border: '2px solid rgba(236, 72, 153, 0.3)'
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Alimentação */}
            <div className="card" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '3px solid rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h3 className="flex items-center gap-2 mb-4" style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem'
              }}>
                🍎 Alimentacao e Estudo
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-400 font-bold mb-2">✓ Bons para o cerebro</h4>
                  <ul className="space-y-1" style={{ color: 'var(--chalk-dim)' }}>
                    <li>• Frutas (especialmente berries)</li>
                    <li>• Oleaginosas (nozes, castanhas)</li>
                    <li>• Peixes (omega 3)</li>
                    <li>• Vegetais verdes escuros</li>
                    <li>• Agua (hidratacao constante)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-red-400 font-bold mb-2">✕ Evitar</h4>
                  <ul className="space-y-1" style={{ color: 'var(--chalk-dim)' }}>
                    <li>• Excesso de acucar</li>
                    <li>• Alimentos muito gordurosos</li>
                    <li>• Excesso de cafeina</li>
                    <li>• Refrigerantes</li>
                    <li>• Pular refeicoes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes da Técnica */}
        {tecnicaSelecionada && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
            onClick={() => setTecnicaSelecionada(null)}
          >
            <div
              className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'var(--chalkboard-bg)',
                border: '3px solid rgba(255,255,255,0.3)',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${tecnicaSelecionada.cor} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                  {tecnicaSelecionada.icone}
                </div>
                <div className="flex-1">
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--chalk-white)',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-handwriting)'
                  }}>
                    {tecnicaSelecionada.nome}
                  </h2>
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                    {tecnicaSelecionada.descricao}
                  </p>
                </div>
                <button
                  onClick={() => setTecnicaSelecionada(null)}
                  className="text-2xl hover:scale-110 transition"
                  style={{ color: 'var(--chalk-dim)' }}
                >
                  ×
                </button>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Duracao recomendada
                </p>
                <p style={{
                  color: 'var(--accent-yellow)',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  ⏱️ {tecnicaSelecionada.duracao}
                </p>
              </div>

              <div className="mb-6">
                <h3 style={{
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.25rem'
                }}>
                  📋 Como aplicar
                </h3>
                <div className="space-y-2">
                  {tecnicaSelecionada.passos.map((passo, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{
                          background: 'var(--accent-yellow)',
                          color: 'var(--chalkboard-green)'
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ color: 'var(--chalk-white)' }}>{passo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 style={{
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.25rem'
                }}>
                  ✨ Beneficios
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tecnicaSelecionada.beneficios.map((beneficio, idx) => (
                    <span
                      key={idx}
                      className="badge px-3 py-1 rounded-full text-sm"
                      style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#86efac',
                        border: '2px solid rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      ✓ {beneficio}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{
                background: 'rgba(59, 130, 246, 0.2)',
                border: '2px solid rgba(59, 130, 246, 0.3)'
              }}>
                <p className="text-blue-300 font-bold mb-1">💡 Indicado para:</p>
                <p style={{ color: 'var(--chalk-white)' }}>{tecnicaSelecionada.indicado}</p>
              </div>

              <button
                onClick={() => router.push('/enem/pomodoro')}
                className="btn btn-yellow w-full"
                style={{
                  background: 'var(--accent-yellow)',
                  color: 'var(--chalkboard-green)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-handwriting)',
                  border: '2px solid var(--accent-yellow)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '1.125rem'
                }}
              >
                🍅 Usar Timer Pomodoro
              </button>
            </div>
          </div>
        )}

        {/* Footer com link de volta */}
        <div className="footer mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => router.push('/enem')}
            className="btn flex items-center gap-2 mx-auto"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--chalk-white)',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontFamily: 'var(--font-handwriting)',
              border: '2px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ← Voltar para ENEM IA
          </button>
        </div>
      </div>
    </div>
  );
}
