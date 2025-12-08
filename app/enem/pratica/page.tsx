'use client';

import FloatingBackButton from '@/components/FloatingBackButton';
import {useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import {
  BookOpen,
  Calculator,
  Globe,
  Atom,
  MessageSquare,
  ChevronRight,
  Target,
  Zap,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Filter,
  Lightbulb
} from 'lucide-react';

interface Questao {
  id: string;
  ano: number;
  area: string;
  disciplina: string;
  tema: string;
  dificuldade: number;
  enunciado: string;
  alternativas: string[];
  correta: string;
  explicacao: string;
  tags: string[];
}

const areas = [
  { id: 'Ciências da Natureza', label: 'Natureza', icon: Atom, color: '#10b981', emoji: '🔬' },
  { id: 'Ciências Humanas', label: 'Humanas', icon: Globe, color: '#f59e0b', emoji: '🌍' },
  { id: 'Linguagens', label: 'Linguagens', icon: MessageSquare, color: '#8b5cf6', emoji: '📚' },
  { id: 'Matemática', label: 'Matematica', icon: Calculator, color: '#3b82f6', emoji: '📐' },
];

const disciplinas: Record<string, string[]> = {
  'Ciências da Natureza': ['Química', 'Física', 'Biologia'],
  'Ciências Humanas': ['História', 'Geografia', 'Filosofia', 'Sociologia'],
  'Linguagens': ['Português', 'Literatura', 'Inglês'],
  'Matemática': ['Matemática'],
};

export default function PraticaPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [loading, setLoading] = useState(false);
  const [praticaIniciada, setPraticaIniciada] = useState(false);

  const carregarQuestoes = async () => {
    setLoading(true);
    try {
      let url = '/api/questions?op=random&count=20';

      if (selectedDisciplina) {
        url = `/api/questions?op=byDisciplina&disciplina=${encodeURIComponent(selectedDisciplina)}`;
      } else if (selectedArea) {
        url = `/api/questions?op=byArea&area=${encodeURIComponent(selectedArea)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        const qs = Array.isArray(data.data) ? data.data : data.data.questions || [];
        const shuffled = qs.sort(() => Math.random() - 0.5).slice(0, 20);
        setQuestoes(shuffled);
        setQuestaoAtual(0);
        setRespostaSelecionada(null);
        setMostrarResposta(false);
        setAcertos(0);
        setErros(0);
        setPraticaIniciada(true);
      }
    } catch (error) {
      console.error('Erro ao carregar questoes:', error);
    }
    setLoading(false);
  };

  const verificarResposta = () => {
    if (!respostaSelecionada) return;

    const questao = questoes[questaoAtual];
    const alternativaIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(respostaSelecionada);
    const correta = questao.correta;

    if (respostaSelecionada === correta) {
      setAcertos(prev => prev + 1);
    } else {
      setErros(prev => prev + 1);
    }
    setMostrarResposta(true);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
      setRespostaSelecionada(null);
      setMostrarResposta(false);
    }
  };

  const reiniciar = () => {
    setPraticaIniciada(false);
    setQuestoes([]);
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
    setAcertos(0);
    setErros(0);
    setSelectedArea(null);
    setSelectedDisciplina(null);
  };

  const questao = questoes[questaoAtual];

  if (!praticaIniciada) {
    return (
      <div style={{
        minHeight: '100vh',
        padding: '2rem 1rem',
        background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 50%, #1a2e1a 100%)',
      }}>
      <FloatingBackButton />
        <FloatingNav />

        <div style={{ maxWidth: '56rem', margin: '0 auto', paddingTop: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '1rem',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Target size={28} color="#10b981" />
              </div>
            </div>
            <h1 style={{
              fontFamily: "'Patrick Hand', cursive",
              color: '#ffd700',
              fontSize: '2.5rem',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
              marginBottom: '0.5rem',
            }}>
              Pratica por Disciplina
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: '1rem' }}>
              Selecione uma area ou disciplina para praticar
            </p>
          </motion.div>

          {/* Seletor de Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <h3 style={{ color: '#f5f5dc', marginBottom: '1rem', fontFamily: "'Patrick Hand', cursive" }}>
              <Filter size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Escolha a Area
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {areas.map((area) => (
                <motion.button
                  key={area.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedArea(area.id);
                    setSelectedDisciplina(null);
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: selectedArea === area.id ? `2px solid ${area.color}` : '2px solid rgba(255,255,255,0.1)',
                    background: selectedArea === area.id ? `${area.color}20` : 'rgba(0,0,0,0.3)',
                    color: '#f5f5dc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{area.emoji}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>{area.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Seletor de Disciplina */}
          {selectedArea && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <h3 style={{ color: '#f5f5dc', marginBottom: '1rem', fontFamily: "'Patrick Hand', cursive" }}>
                <BookOpen size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Escolha a Disciplina (opcional)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDisciplina(null)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.5rem',
                    border: !selectedDisciplina ? '2px solid #ffd700' : '2px solid rgba(255,255,255,0.1)',
                    background: !selectedDisciplina ? 'rgba(255,215,0,0.2)' : 'rgba(0,0,0,0.3)',
                    color: '#f5f5dc',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Todas
                </motion.button>
                {disciplinas[selectedArea]?.map((disc) => (
                  <motion.button
                    key={disc}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDisciplina(disc)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.5rem',
                      border: selectedDisciplina === disc ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.1)',
                      background: selectedDisciplina === disc ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.3)',
                      color: '#f5f5dc',
                      cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {disc}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botao Iniciar */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={carregarQuestoes}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '1rem',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RotateCcw size={24} />
                </motion.div>
                Carregando...
              </>
            ) : (
              <>
                <Zap size={24} />
                Iniciar Pratica
                <ChevronRight size={24} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Interface de pratica
  return (
    <div style={{
      minHeight: '100vh',
      padding: '1rem',
      background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 50%, #1a2e1a 100%)',
    }}>
      <FloatingNav />

      <div style={{ maxWidth: '56rem', margin: '0 auto', paddingTop: '1rem' }}>
        {/* Header com progresso */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>{acertos}</div>
              <div style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>Acertos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 'bold' }}>{erros}</div>
              <div style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>Erros</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ffd700', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {Math.round((acertos / (acertos + erros || 1)) * 100)}%
              </div>
              <div style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>Taxa</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#f5f5dc' }}>
              {questaoAtual + 1} / {questoes.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reiniciar}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.3)',
                color: '#f5f5dc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <RotateCcw size={16} />
              Reiniciar
            </motion.button>
          </div>
        </motion.div>

        {/* Questao */}
        {questao && (
          <motion.div
            key={questao.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Meta da questao */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(16,185,129,0.2)',
                color: '#10b981',
                fontSize: '0.75rem',
              }}>
                {questao.disciplina}
              </span>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(245,158,11,0.2)',
                color: '#f59e0b',
                fontSize: '0.75rem',
              }}>
                {questao.tema}
              </span>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(99,102,241,0.2)',
                color: '#818cf8',
                fontSize: '0.75rem',
              }}>
                {questao.ano}
              </span>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: questao.dificuldade <= 2 ? 'rgba(16,185,129,0.2)' :
                           questao.dificuldade <= 3 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                color: questao.dificuldade <= 2 ? '#10b981' :
                       questao.dificuldade <= 3 ? '#f59e0b' : '#ef4444',
                fontSize: '0.75rem',
              }}>
                Dif. {questao.dificuldade}
              </span>
            </div>

            {/* Enunciado */}
            <div style={{
              color: '#f5f5dc',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontFamily: "'Poppins', sans-serif",
            }}>
              {questao.enunciado}
            </div>

            {/* Alternativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {questao.alternativas.map((alt, idx) => {
                const letra = ['A', 'B', 'C', 'D', 'E'][idx];
                const isSelected = respostaSelecionada === letra;
                const isCorreta = letra === questao.correta;
                const showCorrect = mostrarResposta && isCorreta;
                const showWrong = mostrarResposta && isSelected && !isCorreta;

                return (
                  <motion.button
                    key={letra}
                    whileHover={!mostrarResposta ? { scale: 1.01 } : {}}
                    whileTap={!mostrarResposta ? { scale: 0.99 } : {}}
                    onClick={() => !mostrarResposta && setRespostaSelecionada(letra)}
                    disabled={mostrarResposta}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: showCorrect ? '2px solid #10b981' :
                              showWrong ? '2px solid #ef4444' :
                              isSelected ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.1)',
                      background: showCorrect ? 'rgba(16,185,129,0.2)' :
                                  showWrong ? 'rgba(239,68,68,0.2)' :
                                  isSelected ? 'rgba(59,130,246,0.2)' : 'rgba(0,0,0,0.3)',
                      color: '#f5f5dc',
                      cursor: mostrarResposta ? 'default' : 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <span style={{
                      minWidth: '1.75rem',
                      height: '1.75rem',
                      borderRadius: '50%',
                      background: showCorrect ? '#10b981' :
                                  showWrong ? '#ef4444' :
                                  isSelected ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                    }}>
                      {showCorrect ? <CheckCircle size={16} /> :
                       showWrong ? <XCircle size={16} /> : letra}
                    </span>
                    <span style={{ flex: 1 }}>{alt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explicacao */}
            <AnimatePresence>
              {mostrarResposta && questao.explicacao && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    color: '#10b981',
                    fontWeight: 'bold',
                  }}>
                    <Lightbulb size={18} />
                    Explicacao
                  </div>
                  <p style={{ color: '#f5f5dc', lineHeight: 1.6 }}>
                    {questao.explicacao}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botoes de acao */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
            }}>
              {!mostrarResposta ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={verificarResposta}
                  disabled={!respostaSelecionada}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: respostaSelecionada
                      ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                      : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: respostaSelecionada ? 'pointer' : 'not-allowed',
                    opacity: respostaSelecionada ? 1 : 0.5,
                  }}
                >
                  Verificar Resposta
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={proximaQuestao}
                  disabled={questaoAtual >= questoes.length - 1}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: questaoAtual < questoes.length - 1
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: questaoAtual < questoes.length - 1 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {questaoAtual < questoes.length - 1 ? (
                    <>
                      Proxima Questao
                      <ChevronRight size={20} />
                    </>
                  ) : (
                    <>
                      <Trophy size={20} />
                      Pratica Concluida!
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Resultado final */}
        {questaoAtual >= questoes.length - 1 && mostrarResposta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '1.5rem',
              padding: '2rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.2) 100%)',
              border: '1px solid rgba(16,185,129,0.3)',
              textAlign: 'center',
            }}
          >
            <Trophy size={48} color="#ffd700" style={{ marginBottom: '1rem' }} />
            <h2 style={{
              fontFamily: "'Patrick Hand', cursive",
              color: '#ffd700',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}>
              Pratica Concluida!
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '1.5rem',
            }}>
              <div>
                <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}>{acertos}</div>
                <div style={{ color: '#a3a3a3' }}>Acertos</div>
              </div>
              <div>
                <div style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 'bold' }}>{erros}</div>
                <div style={{ color: '#a3a3a3' }}>Erros</div>
              </div>
              <div>
                <div style={{ color: '#ffd700', fontSize: '2rem', fontWeight: 'bold' }}>
                  {Math.round((acertos / questoes.length) * 100)}%
                </div>
                <div style={{ color: '#a3a3a3' }}>Aproveitamento</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reiniciar}
              style={{
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <RotateCcw size={20} />
              Nova Pratica
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
