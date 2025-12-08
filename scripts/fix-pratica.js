const fs = require('fs');

const content = `'use client';

import FloatingBackButton from '@/components/FloatingBackButton';
import {useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import { calcularFPSimulado, carregarGamification, salvarGamification } from '@/lib/gamification';
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
  Lightbulb,
  Star
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
  { id: 'Ciencias da Natureza', label: 'Natureza', icon: Atom, color: '#10b981', emoji: '🔬' },
  { id: 'Ciencias Humanas', label: 'Humanas', icon: Globe, color: '#f59e0b', emoji: '🌍' },
  { id: 'Linguagens', label: 'Linguagens', icon: MessageSquare, color: '#8b5cf6', emoji: '📚' },
  { id: 'Matematica', label: 'Matematica', icon: Calculator, color: '#3b82f6', emoji: '📐' },
];

const disciplinas: Record<string, string[]> = {
  'Ciencias da Natureza': ['Quimica', 'Fisica', 'Biologia'],
  'Ciencias Humanas': ['Historia', 'Geografia', 'Filosofia', 'Sociologia'],
  'Linguagens': ['Portugues', 'Literatura', 'Ingles'],
  'Matematica': ['Matematica'],
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
  const [fpGanhos, setFpGanhos] = useState(0);
  const [praticaFinalizada, setPraticaFinalizada] = useState(false);

  const carregarQuestoes = async () => {
    setLoading(true);
    try {
      let url = '/api/questions?op=random&count=20';

      if (selectedDisciplina) {
        url = \`/api/questions?op=byDisciplina&disciplina=\${encodeURIComponent(selectedDisciplina)}\`;
      } else if (selectedArea) {
        url = \`/api/questions?op=byArea&area=\${encodeURIComponent(selectedArea)}\`;
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
        setFpGanhos(0);
        setPraticaFinalizada(false);
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
    const correta = questao.correta;

    if (respostaSelecionada === correta) {
      setAcertos(prev => prev + 1);
    } else {
      setErros(prev => prev + 1);
    }
    setMostrarResposta(true);
  };

  const finalizarPratica = () => {
    // Calcular FP ganhos
    const fp = calcularFPSimulado({ acertos, total: questoes.length });
    setFpGanhos(fp);
    setPraticaFinalizada(true);

    // Salvar no localStorage
    try {
      const gamification = carregarGamification();
      gamification.fp = (gamification.fp || 0) + fp;
      gamification.xp = gamification.fp;
      salvarGamification(gamification);

      // Atualizar usuario no localStorage
      const userData = localStorage.getItem('usuario');
      if (userData) {
        const user = JSON.parse(userData);
        user.pontosFP = (user.pontosFP || 0) + fp;
        localStorage.setItem('usuario', JSON.stringify(user));
      }
    } catch (e) {
      console.error('Erro ao salvar FP:', e);
    }
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
      setRespostaSelecionada(null);
      setMostrarResposta(false);
    } else {
      // Ultima questao - finalizar
      finalizarPratica();
    }
  };

  const reiniciar = () => {
    setPraticaIniciada(false);
    setPraticaFinalizada(false);
    setQuestoes([]);
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setMostrarResposta(false);
    setAcertos(0);
    setErros(0);
    setFpGanhos(0);
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
                    border: selectedArea === area.id ? \`2px solid \${area.color}\` : '2px solid rgba(255,255,255,0.1)',
                    background: selectedArea === area.id ? \`\${area.color}20\` : 'rgba(0,0,0,0.3)',
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
            flexWrap: 'wrap',
            gap: '1rem',
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
        {questao && !praticaFinalizada && (
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
                  style={{
                    flex: 1,
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
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
                      Finalizar Pratica
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Resultado final com FP */}
        {praticaFinalizada && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: '1.5rem',
              padding: '2.5rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.2) 100%)',
              border: '2px solid rgba(16,185,129,0.4)',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Trophy size={64} color="#ffd700" style={{ marginBottom: '1rem' }} />
            </motion.div>

            <h2 style={{
              fontFamily: "'Patrick Hand', cursive",
              color: '#ffd700',
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
            }}>
              Pratica Concluida!
            </h2>

            {/* Estatisticas */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              marginTop: '1.5rem',
            }}>
              <div>
                <div style={{ color: '#10b981', fontSize: '2.5rem', fontWeight: 'bold' }}>{acertos}</div>
                <div style={{ color: '#a3a3a3' }}>Acertos</div>
              </div>
              <div>
                <div style={{ color: '#ef4444', fontSize: '2.5rem', fontWeight: 'bold' }}>{erros}</div>
                <div style={{ color: '#a3a3a3' }}>Erros</div>
              </div>
              <div>
                <div style={{ color: '#ffd700', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {Math.round((acertos / questoes.length) * 100)}%
                </div>
                <div style={{ color: '#a3a3a3' }}>Aproveitamento</div>
              </div>
            </div>

            {/* FP Ganhos - Destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                border: '2px solid rgba(251, 191, 36, 0.5)',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
              }}>
                <Star size={32} color="#fbbf24" fill="#fbbf24" />
                <span style={{
                  color: '#fbbf24',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  fontFamily: "'Patrick Hand', cursive",
                }}>
                  +{fpGanhos} FP
                </span>
                <Star size={32} color="#fbbf24" fill="#fbbf24" />
              </div>
              <p style={{ color: '#f5f5dc', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Adicionados a sua conta!
              </p>
            </motion.div>

            {/* Detalhamento do calculo */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'left',
            }}>
              <p style={{ color: '#a3a3a3', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Calculo de FP:
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                • {acertos} acertos x 5 FP = {acertos * 5} FP
              </p>
              {(acertos / questoes.length) >= 0.9 && (
                <p style={{ color: '#10b981', fontSize: '0.9rem' }}>
                  • Bonus 90%+ acertos: +40 FP
                </p>
              )}
              {(acertos / questoes.length) >= 0.7 && (acertos / questoes.length) < 0.9 && (
                <p style={{ color: '#10b981', fontSize: '0.9rem' }}>
                  • Bonus 70%+ acertos: +20 FP
                </p>
              )}
              {(acertos / questoes.length) >= 0.5 && (acertos / questoes.length) < 0.7 && (
                <p style={{ color: '#10b981', fontSize: '0.9rem' }}>
                  • Bonus 50%+ acertos: +10 FP
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reiniciar}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontSize: '1.1rem',
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
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/enem/pratica/page.tsx', content);
console.log('Fixed pratica page with FP display');
