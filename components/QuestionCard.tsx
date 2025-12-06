'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Lightbulb, ChevronRight } from 'lucide-react';
import { ChalkIcon } from './IconFix';

interface Questao {
  id?: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta?: number;
  explicacao?: string;
  area?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
}

interface QuestionCardProps {
  questao: Questao;
  index: number;
  onSelect: (index: number) => void;
  respostaSelecionada?: number | null;
  mostrarResposta?: boolean;
  disabled?: boolean;
}

export default function QuestionCard({
  questao,
  index,
  onSelect,
  respostaSelecionada = null,
  mostrarResposta = false,
  disabled = false,
}: QuestionCardProps) {
  const [showExplicacao, setShowExplicacao] = useState(false);

  const getAlternativaStyle = (altIndex: number) => {
    const baseStyle = `
      w-full text-left p-4 rounded-xl border-2 transition-all duration-200
      font-medium text-sm md:text-base
    `;

    if (!mostrarResposta) {
      // Modo selecao
      if (respostaSelecionada === altIndex) {
        return `${baseStyle} bg-yellow-400/20 border-yellow-400/50 text-white`;
      }
      return `${baseStyle} bg-black/30 border-white/15 text-white/90 hover:bg-black/40 hover:border-white/30`;
    }

    // Modo resultado
    const isCorreta = questao.respostaCorreta === altIndex;
    const isSelecionada = respostaSelecionada === altIndex;

    if (isCorreta) {
      return `${baseStyle} bg-green-500/20 border-green-400/50 text-green-300`;
    }
    if (isSelecionada && !isCorreta) {
      return `${baseStyle} bg-red-500/20 border-red-400/50 text-red-300`;
    }
    return `${baseStyle} bg-black/20 border-white/10 text-white/50`;
  };

  const getAlternativaIcon = (altIndex: number) => {
    if (!mostrarResposta) return null;

    const isCorreta = questao.respostaCorreta === altIndex;
    const isSelecionada = respostaSelecionada === altIndex;

    if (isCorreta) {
      return <Check className="w-5 h-5 text-green-400 flex-shrink-0" />;
    }
    if (isSelecionada && !isCorreta) {
      return <X className="w-5 h-5 text-red-400 flex-shrink-0" />;
    }
    return null;
  };

  const letras = ['A', 'B', 'C', 'D', 'E'];

  const dificuldadeColor = {
    facil: 'bg-green-500/20 text-green-400 border-green-500/30',
    medio: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    dificil: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-ia"
    >
      {/* Header da questao */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-lg"
            style={{ fontFamily: 'var(--font-kalam)' }}
          >
            {index + 1}
          </span>
          {questao.area && (
            <span className="text-white/50 text-sm">{questao.area}</span>
          )}
        </div>

        {questao.dificuldade && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              dificuldadeColor[questao.dificuldade]
            }`}
          >
            {questao.dificuldade.charAt(0).toUpperCase() + questao.dificuldade.slice(1)}
          </span>
        )}
      </div>

      {/* Enunciado */}
      <div className="mb-6">
        <p
          className="text-white text-base md:text-lg leading-relaxed"
          style={{ fontFamily: 'var(--font-kalam)' }}
        >
          {questao.enunciado}
        </p>
      </div>

      {/* Alternativas */}
      <div className="space-y-3">
        {questao.alternativas.map((alt, altIndex) => (
          <motion.button
            key={altIndex}
            onClick={() => !disabled && onSelect(altIndex)}
            disabled={disabled || mostrarResposta}
            whileHover={!disabled && !mostrarResposta ? { scale: 1.01 } : {}}
            whileTap={!disabled && !mostrarResposta ? { scale: 0.99 } : {}}
            className={getAlternativaStyle(altIndex)}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  respostaSelecionada === altIndex
                    ? 'bg-yellow-400/30 text-yellow-400'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {letras[altIndex]}
              </span>
              <span className="flex-1 pt-1">{alt}</span>
              {getAlternativaIcon(altIndex)}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explicacao (quando mostrar resposta) */}
      {mostrarResposta && questao.explicacao && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6"
        >
          <button
            onClick={() => setShowExplicacao(!showExplicacao)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
          >
            <ChalkIcon icon={Lightbulb} size={18} color="yellow" />
            <span style={{ fontFamily: 'var(--font-kalam)' }}>
              {showExplicacao ? 'Ocultar explicacao' : 'Ver explicacao'}
            </span>
            <motion.span
              animate={{ rotate: showExplicacao ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.span>
          </button>

          {showExplicacao && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
            >
              <p
                className="text-white/90 leading-relaxed"
                style={{ fontFamily: 'var(--font-kalam)' }}
              >
                {questao.explicacao}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
