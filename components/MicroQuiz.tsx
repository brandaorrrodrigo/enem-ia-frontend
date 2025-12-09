'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

interface MicroQuizProps {
  questions: Question[];
  materia: string;
  capitulo: string;
  onComplete?: (acertos: number) => void;
}

export default function MicroQuiz({ questions, materia, capitulo, onComplete }: MicroQuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Verificar se já fez o quiz
    const quizKey = `microquiz_${materia}_${capitulo}`;
    const quizFeito = localStorage.getItem(quizKey);
    if (quizFeito) {
      setHasTriggered(true);
      return;
    }

    const handleScroll = () => {
      if (hasTriggered) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 80) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, materia, capitulo]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].respostaCorreta;
    if (isCorrect) {
      setAcertos(acertos + 1);
    }
    setShowExplanation(true);
  };

  const calculateFP = (totalAcertos: number, totalQuestoes: number): number => {
    if (totalQuestoes === 3) {
      // Sistema para 3 questões
      if (totalAcertos === 3) return 10;
      if (totalAcertos === 2) return 5;
      if (totalAcertos === 1) return 1;
      return 0;
    }
    // Sistema para 2 questões
    if (totalQuestoes === 2) {
      if (totalAcertos === 2) return 6;
      if (totalAcertos === 1) return 2;
      return 0;
    }
    // Fallback para outras quantidades
    return Math.floor((totalAcertos / totalQuestoes) * 10);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const quizKey = `microquiz_${materia}_${capitulo}`;
      localStorage.setItem(quizKey, 'true');

      // Calcular e salvar FP
      const fp = calculateFP(acertos, questions.length);
      // Aqui você pode adicionar a lógica para atualizar o FP do usuário no backend

      if (onComplete) {
        onComplete(acertos);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReview = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          style={{
            background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 100%)',
            border: '4px solid rgba(139, 90, 43, 0.8)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            position: 'relative',
          }}
        >
          {/* Botão Fechar */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px 8px',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
          >
            ×
          </button>

          {!quizCompleted ? (
            <>
              {/* Cabeçalho */}
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2
                  style={{
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: '28px',
                    color: '#fff',
                    marginBottom: '8px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  🎯 Teste Rápido
                </h2>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                  }}
                >
                  Você aprendeu este capítulo?
                </p>
                <div
                  style={{
                    marginTop: '12px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  Questão {currentQuestion + 1} de {questions.length}
                </div>
              </div>

              {/* Pergunta */}
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '16px',
                    color: '#fff',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {questions[currentQuestion].pergunta}
                </p>

                {/* Opções */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {questions[currentQuestion].opcoes.map((opcao, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === questions[currentQuestion].respostaCorreta;
                    const showCorrectAnswer = showExplanation && isCorrect;
                    const showWrongAnswer = showExplanation && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        whileHover={!showExplanation ? { scale: 1.02 } : {}}
                        whileTap={!showExplanation ? { scale: 0.98 } : {}}
                        style={{
                          padding: '16px',
                          background: showCorrectAnswer
                            ? 'rgba(34, 197, 94, 0.2)'
                            : showWrongAnswer
                            ? 'rgba(239, 68, 68, 0.2)'
                            : isSelected
                            ? 'rgba(139, 90, 43, 0.3)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: showCorrectAnswer
                            ? '2px solid #22c55e'
                            : showWrongAnswer
                            ? '2px solid #ef4444'
                            : isSelected
                            ? '2px solid rgba(139, 90, 43, 0.8)'
                            : '2px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          color: '#fff',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '14px',
                          textAlign: 'left',
                          cursor: showExplanation ? 'default' : 'pointer',
                          transition: 'all 0.3s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: showCorrectAnswer
                                ? '#22c55e'
                                : showWrongAnswer
                                ? '#ef4444'
                                : isSelected
                                ? 'rgba(139, 90, 43, 0.8)'
                                : 'rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              flexShrink: 0,
                            }}
                          >
                            {showCorrectAnswer ? '✓' : showWrongAnswer ? '✗' : String.fromCharCode(65 + index)}
                          </span>
                          <span>{opcao}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Explicação */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '16px',
                    background:
                      selectedAnswer === questions[currentQuestion].respostaCorreta
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                    border:
                      selectedAnswer === questions[currentQuestion].respostaCorreta
                        ? '2px solid rgba(34, 197, 94, 0.4)'
                        : '2px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '12px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      {selectedAnswer === questions[currentQuestion].respostaCorreta ? '✅' : '❌'}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Patrick Hand', cursive",
                        fontSize: '18px',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      {selectedAnswer === questions[currentQuestion].respostaCorreta ? 'Muito bem!' : 'Ops!'}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    {questions[currentQuestion].explicacao}
                  </p>
                </motion.div>
              )}

              {/* Botões */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {!showExplanation ? (
                  <button
                    onClick={handleConfirm}
                    disabled={selectedAnswer === null}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background:
                        selectedAnswer === null
                          ? 'rgba(139, 90, 43, 0.3)'
                          : 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)',
                      border: '2px solid rgba(139, 90, 43, 0.8)',
                      borderRadius: '12px',
                      color: selectedAnswer === null ? 'rgba(255, 255, 255, 0.4)' : '#fff',
                      fontFamily: "'Patrick Hand', cursive",
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)',
                      border: '2px solid rgba(139, 90, 43, 0.8)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontFamily: "'Patrick Hand', cursive",
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    {currentQuestion < questions.length - 1 ? 'Próxima →' : 'Finalizar'}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Resultado Final */}
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  style={{ fontSize: '64px', marginBottom: '16px' }}
                >
                  {acertos === questions.length ? '🎉' : acertos >= questions.length / 2 ? '👏' : '📚'}
                </motion.div>
                <h2
                  style={{
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: '32px',
                    color: '#fff',
                    marginBottom: '12px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {acertos === questions.length
                    ? 'Perfeito!'
                    : acertos >= questions.length / 2
                    ? 'Bom trabalho!'
                    : 'Continue estudando!'}
                </h2>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '18px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '16px',
                  }}
                >
                  Você acertou {acertos} de {questions.length} questões
                </p>

                {/* Badge de FP Ganho */}
                {calculateFP(acertos, questions.length) > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(251, 191, 36, 0.3) 100%)',
                      border: '2px solid rgba(250, 204, 21, 0.5)',
                      borderRadius: '24px',
                      marginBottom: '24px',
                      boxShadow: '0 0 20px rgba(250, 204, 21, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>⚡</span>
                    <span
                      style={{
                        fontFamily: "'Patrick Hand', cursive",
                        fontSize: '24px',
                        color: '#facc15',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
                      }}
                    >
                      +{calculateFP(acertos, questions.length)} FP
                    </span>
                  </motion.div>
                )}

                {calculateFP(acertos, questions.length) === 0 && (
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '24px',
                    }}
                  >
                    Continue estudando para ganhar FP! 💪
                  </p>
                )}

                {acertos < questions.length && (
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '24px',
                      fontStyle: 'italic',
                    }}
                  >
                    💡 Sugestão: Revise o conteúdo para reforçar o aprendizado!
                  </p>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  {acertos < questions.length && (
                    <button
                      onClick={handleReview}
                      style={{
                        flex: 1,
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontFamily: "'Patrick Hand', cursive",
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    >
                      📖 Revisar conteúdo
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)',
                      border: '2px solid rgba(139, 90, 43, 0.8)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontFamily: "'Patrick Hand', cursive",
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
