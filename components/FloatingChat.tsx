'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: 'Ola! Sou seu assistente ENEM-IA. Posso tirar duvidas sobre qualquer materia. Como posso ajudar?',
        timestamp: new Date(),
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const gerarRespostaIA = (pergunta: string): string => {
    const p = pergunta.toLowerCase();

    if (p.includes('bhaskara')) {
      return `Formula de Bhaskara: x = (-b ± √(b²-4ac)) / 2a\n\nUsada para equacoes do 2º grau. Quer um exemplo?`;
    }
    if (p.includes('redacao') || p.includes('redação')) {
      return `Estrutura nota 1000:\n1. Intro: tema + tese\n2. Desenvolvimento: 2 paragrafos com argumentos\n3. Conclusao: proposta de intervencao\n\nDica: Use conectivos!`;
    }
    if (p.includes('regra de tres') || p.includes('regra de três')) {
      return `Regra de Tres Simples:\n- Monte a proporcao\n- Identifique se e direta ou inversa\n- Multiplique cruzado\n\nQuer que eu resolva um exemplo?`;
    }
    if (p.includes('ohm')) {
      return `Lei de Ohm: U = R × i\n\nOnde:\n- U = tensao (Volts)\n- R = resistencia (Ohms)\n- i = corrente (Amperes)`;
    }

    return `Boa pergunta! Para te ajudar melhor:\n1. Especifique a materia\n2. Descreva sua duvida\n\nEstou aqui para explicar conceitos e resolver exercicios!`;
  };

  const enviarMensagem = async () => {
    if (!input.trim() || loading) return;

    const novaMensagem: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, novaMensagem]);
    setInput('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const resposta: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: gerarRespostaIA(input),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, resposta]);
    setLoading(false);
  };

  return (
    <>
      {/* Botao flutuante em formato de GIZ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9998] group"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
        title="Chat com IA"
      >
        {/* Giz 3D */}
        <div
          className={`relative transition-all duration-300 ${isOpen ? 'rotate-45' : 'hover:rotate-[-8deg] hover:scale-110'}`}
          style={{
            width: '80px',
            height: '24px',
          }}
        >
          {/* Corpo do giz - cilindrico */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #fff9e6 0%, #f5e6c8 30%, #e8d4a8 70%, #d4c090 100%)',
              boxShadow: `
                inset 0 -3px 6px rgba(0,0,0,0.15),
                inset 0 3px 6px rgba(255,255,255,0.8),
                0 2px 8px rgba(0,0,0,0.3)
              `,
              border: '1px solid rgba(180,160,120,0.4)',
            }}
          />

          {/* Ponta do giz (lado direito) */}
          <div
            className="absolute right-0 top-0 bottom-0"
            style={{
              width: '16px',
              background: 'linear-gradient(90deg, #e8d4a8 0%, #f0e4cc 50%, #fff 100%)',
              borderRadius: '0 50% 50% 0',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />

          {/* Textura de giz usado */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(255,255,255,0.3) 1px,
                  transparent 2px,
                  transparent 8px
                )
              `,
            }}
          />

          {/* Marca/texto no giz */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#8b7355',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              letterSpacing: '1px',
            }}
          >
            {isOpen ? '✕' : 'IA'}
          </div>

          {/* Brilho superior */}
          <div
            className="absolute top-1 left-4 right-8 h-1 rounded-full opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            }}
          />
        </div>

        {/* Particulas de giz quando hover */}
        {!isOpen && (
          <div className="absolute -bottom-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-0.5 h-0.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></span>
              <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
            </div>
          </div>
        )}

        {/* Pulse effect */}
        {!isOpen && (
          <div
            className="absolute inset-0 animate-ping opacity-20"
            style={{
              background: 'linear-gradient(90deg, #fff9e6, #f5e6c8)',
              borderRadius: '9999px',
            }}
          />
        )}
      </button>

      {/* Label flutuante */}
      {!isOpen && (
        <div
          className="fixed bottom-16 right-8 z-[9997] bg-black/70 text-white text-xs px-3 py-1 rounded-lg opacity-0 hover:opacity-100 pointer-events-none transition-opacity"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-2deg)',
          }}
        >
          Tire suas duvidas!
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-8 z-[9997] w-96 max-w-[calc(100vw-64px)] rounded-2xl shadow-2xl overflow-hidden"
          style={{
            maxHeight: 'calc(100vh - 160px)',
            background: 'linear-gradient(135deg, #0d5f3a 0%, #0b4a30 100%)',
            border: '3px solid #8B4513',
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.1),
              0 0 0 1px rgba(139,69,19,0.5)
            `,
          }}
        >
          {/* Header estilo lousa */}
          <div
            className="px-4 py-3 border-b border-white/10"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Mini giz como icone */}
              <div
                className="w-8 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #fff9e6 0%, #e8d4a8 100%)',
                  boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.2)',
                }}
              />
              <div>
                <h3
                  className="text-white font-bold"
                  style={{ fontFamily: 'var(--font-kalam), cursive' }}
                >
                  Assistente ENEM-IA
                </h3>
                <p className="text-emerald-300 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages area - estilo quadro negro */}
          <div
            className="h-80 overflow-y-auto p-4 space-y-3"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.3) transparent',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-yellow-500/25 border border-yellow-500/30 text-yellow-50 rounded-br-sm'
                      : 'bg-white/10 border border-white/20 text-white rounded-bl-sm'
                  }`}
                  style={{ fontFamily: 'var(--font-kalam), cursive' }}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 rounded-bl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="border-t border-white/10 p-3"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                placeholder="Escreva sua duvida..."
                className="flex-1 bg-white/10 border-2 border-white/20 rounded-xl px-4 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ fontFamily: 'var(--font-kalam), cursive' }}
                disabled={loading}
              />
              <button
                onClick={enviarMensagem}
                disabled={!input.trim() || loading}
                className="px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(180deg, #fff9e6 0%, #e8d4a8 100%)',
                  color: '#5a4a32',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {loading ? '...' : '→'}
              </button>
            </div>

            {/* Sugestoes rapidas */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {['Bhaskara', 'Redacao', 'Lei de Ohm'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setInput(sug)}
                    className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-kalam), cursive' }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
