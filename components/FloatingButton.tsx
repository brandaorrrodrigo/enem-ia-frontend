'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Play,
  Zap,
  Layers,
  Clock,
  Bot,
  X,
  BookOpen,
  Target,
  BarChart3,
  MessageSquare,
  Home,
  ChevronUp
} from 'lucide-react';

// ========================================
// FLOATING BUTTON - MENU RADIAL LOUSA
// ========================================

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  description: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'simulado',
    label: 'Simulado',
    icon: <Play className="w-5 h-5" />,
    path: '/enem/simulado',
    color: '#22c55e',
    description: 'Iniciar novo simulado'
  },
  {
    id: 'quiz',
    label: 'Quiz',
    icon: <Zap className="w-5 h-5" />,
    path: '/enem/quiz-diario',
    color: '#eab308',
    description: 'Quiz diário'
  },
  {
    id: 'flashcards',
    label: 'Flash',
    icon: <Layers className="w-5 h-5" />,
    path: '/enem/flashcards',
    color: '#3b82f6',
    description: 'Revisar flashcards'
  },
  {
    id: 'pomodoro',
    label: 'Timer',
    icon: <Clock className="w-5 h-5" />,
    path: '/enem/pomodoro',
    color: '#f97316',
    description: 'Pomodoro timer'
  },
  {
    id: 'ia',
    label: 'IA',
    icon: <Bot className="w-5 h-5" />,
    path: '/enem/chatbot',
    color: '#a855f7',
    description: 'Assistente IA'
  },
];

const secondaryActions: QuickAction[] = [
  {
    id: 'home',
    label: 'Início',
    icon: <Home className="w-4 h-4" />,
    path: '/enem',
    color: '#10b981',
    description: 'Voltar ao início'
  },
  {
    id: 'desafios',
    label: 'Desafios',
    icon: <Target className="w-4 h-4" />,
    path: '/enem/desafios',
    color: '#ef4444',
    description: 'Ver desafios'
  },
  {
    id: 'stats',
    label: 'Stats',
    icon: <BarChart3 className="w-4 h-4" />,
    path: '/enem/estatisticas',
    color: '#6366f1',
    description: 'Estatísticas'
  },
  {
    id: 'questoes',
    label: 'Questões',
    icon: <MessageSquare className="w-4 h-4" />,
    path: '/enem/questoes-comentadas',
    color: '#14b8a6',
    description: 'Questões comentadas'
  },
  {
    id: 'biblioteca',
    label: 'Cadernos',
    icon: <BookOpen className="w-4 h-4" />,
    path: '/enem/biblioteca',
    color: '#f59e0b',
    description: 'Cadernos de estudo'
  },
];

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Não mostrar na landing page
  if (pathname === '/' || pathname === '/planos' || pathname === '/preços') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSecondary(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: QuickAction) => {
    router.push(action.path);
    setIsOpen(false);
    setShowSecondary(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={menuRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      {/* Menu de ações rápidas - Radial */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 animate-fadeIn">
          {/* Ações principais - dispostas em arco */}
          <div className="relative">
            {quickActions.map((action, index) => {
              // Calcular posição em arco
              const angle = -90 + (index * 36) - 72; // Spread de 180 graus
              const radius = 80;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    transitionDelay: `${index * 50}ms`,
                    backgroundColor: action.color,
                  }}
                  className="absolute bottom-0 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-200 border-2 border-white/30 animate-scaleIn"
                  title={action.description}
                >
                  {action.icon}
                </button>
              );
            })}
          </div>

          {/* Toggle para ações secundárias */}
          <button
            onClick={() => setShowSecondary(!showSecondary)}
            className="absolute -top-12 right-6 w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ChevronUp className={`w-4 h-4 transition-transform ${showSecondary ? 'rotate-180' : ''}`} />
          </button>

          {/* Ações secundárias */}
          {showSecondary && (
            <div className="absolute bottom-32 right-0 flex flex-col gap-2 animate-slideUp">
              {secondaryActions.map((action, index) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  style={{ transitionDelay: `${index * 30}ms` }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800/95 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm whitespace-nowrap shadow-lg border border-green-500/30 animate-fadeIn"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: action.color }}
                  >
                    {action.icon}
                  </span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botão scroll to top - aparece quando menu fechado e página rolada */}
      {!isOpen && lastScrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-16 right-0 w-10 h-10 rounded-full bg-green-700/80 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg border border-green-500/50 animate-fadeIn"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Botão principal - Estilo Giz/Apagador */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setShowSecondary(false);
        }}
        className={`relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen
            ? 'bg-red-600 hover:bg-red-500 rotate-45'
            : 'bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 0 20px rgba(239, 68, 68, 0.5)'
            : '0 0 20px rgba(34, 197, 94, 0.5)',
        }}
      >
        {/* Efeito de giz */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Textura de giz */}
        <div className="absolute inset-0 rounded-full opacity-30" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
        }} />

        {/* Ícone */}
        {isOpen ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-0.5">
            <div className="w-4 h-0.5 bg-white rounded-full" />
            <div className="w-4 h-0.5 bg-white rounded-full" />
            <div className="w-4 h-0.5 bg-white rounded-full" />
          </div>
        )}

        {/* Indicador de pulse quando fechado */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse border border-white" />
        )}
      </button>

      {/* Tooltip do botão */}
      {!isOpen && (
        <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Menu Rápido
          </div>
        </div>
      )}

      {/* Estilos de animação */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(var(--x, 0), var(--y, 0)) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(var(--x, 0), var(--y, 0)) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
