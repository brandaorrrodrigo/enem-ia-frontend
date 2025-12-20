'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('geral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const disciplinas = [
    { value: 'geral', label: 'Assistente Geral', emoji: '🤖' },
    { value: 'Matematica', label: 'Matematica', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', emoji: '📖' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', emoji: '🔬' },
    { value: 'Redacao', label: 'Redacao', emoji: '✍️' },
  ];

  const sugestoes = [
    { texto: 'Explique a formula de Bhaskara', emoji: '📐' },
    { texto: 'Como interpretar graficos no ENEM?', emoji: '📊' },
    { texto: 'Dicas para redacao nota 1000', emoji: '✍️' },
    { texto: 'O que cai de Historia do Brasil?', emoji: '🌍' },
    { texto: 'Como resolver questoes de regra de tres?', emoji: '🔢' },
    { texto: 'Explique a Lei de Ohm', emoji: '⚡' },
  ];

  useEffect(() => {
    // Mensagem inicial
    const mensagemInicial: Message = {
      id: '0',
      role: 'assistant',
      content: 'Ola! Sou seu assistente de estudos para o ENEM. Posso ajudar com duvidas sobre qualquer materia, explicar conceitos, resolver questoes e dar dicas de estudo. Como posso te ajudar hoje?',
      timestamp: new Date(),
    };
    setMessages([mensagemInicial]);

    // Carregar historico do localStorage
    const historicoLocal = localStorage.getItem('chatbot_historico');
    if (historicoLocal) {
      const historico = JSON.parse(historicoLocal);
      setMessages([mensagemInicial, ...historico]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    try {
      // Mapear disciplina para area da API
      const areaMap: Record<string, string> = {
        'Matematica': 'matematica',
        'Linguagens': 'linguagens',
        'Ciencias Humanas': 'humanas',
        'Ciencias da Natureza': 'natureza',
        'Redacao': 'redacao',
        'geral': ''
      };

      // Chamar API real de IA
      const response = await fetch('/api/enem/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          area: areaMap[disciplinaSelecionada] || '',
          history: messages.filter(m => m.id !== '0').map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao comunicar com a IA');
      }

      const data = await response.json();
      const respostaIA = data.response || 'Desculpe, nao consegui gerar uma resposta.';

      const mensagemAssistente: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: respostaIA,
        timestamp: new Date(),
      };

      setMessages(prev => {
        const novoHistorico = [...prev, mensagemAssistente];
        // Salvar historico (excluindo mensagem inicial)
        const historicoSalvar = novoHistorico.filter(m => m.id !== '0');
        localStorage.setItem('chatbot_historico', JSON.stringify(historicoSalvar.slice(-20)));
        return novoHistorico;
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);

      // Adicionar mensagem de erro
      const mensagemErro: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, houve um erro ao processar sua mensagem. Verifique sua conexao e tente novamente.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, mensagemErro]);
    } finally {
      setLoading(false);
    }
  };


  const limparHistorico = () => {
    localStorage.removeItem('chatbot_historico');
    const mensagemInicial: Message = {
      id: '0',
      role: 'assistant',
      content: 'Historico limpo! Como posso te ajudar agora?',
      timestamp: new Date(),
    };
    setMessages([mensagemInicial]);
  };

  const usarSugestao = (texto: string) => {
    setInput(texto);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <FloatingBackButton />
      <FloatingNav />

      {/* Header */}
      <div className="header" style={{ marginBottom: '2rem', paddingTop: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{
              color: 'var(--chalk-white)',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              🤖 Chatbot Assistente
            </h1>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '1.125rem',
              margin: 0
            }}>
              Seu tutor virtual para duvidas do ENEM
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            <select
              value={disciplinaSelecionada}
              onChange={(e) => setDisciplinaSelecionada(e.target.value)}
              className="input"
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '0.5rem',
                color: 'var(--chalk-white)',
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {disciplinas.map((d) => (
                <option key={d.value} value={d.value} style={{ backgroundColor: '#2d3748', color: 'white' }}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>

            <button
              onClick={limparHistorico}
              className="btn"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: 'var(--chalk-white)',
                border: '2px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              title="Limpar historico"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card" style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 280px)',
        minHeight: '450px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '3px solid var(--chalk-dim)',
        borderRadius: '1rem',
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  borderRadius: '1rem',
                  padding: '1rem',
                  backgroundColor: message.role === 'user'
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--chalk-white)',
                  borderBottomRightRadius: message.role === 'user' ? '0.25rem' : '1rem',
                  borderBottomLeftRadius: message.role === 'assistant' ? '0.25rem' : '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {message.role === 'user' ? '👤' : '🤖'}
                  </span>
                  <div>
                    <p style={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {message.content}
                    </p>
                    <p style={{
                      color: 'var(--chalk-dim)',
                      fontSize: '0.75rem',
                      marginTop: '0.5rem',
                      margin: 0
                    }}>
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                borderBottomLeftRadius: '0.25rem',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🤖</span>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <span style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: 'var(--accent-yellow)',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite',
                      animationDelay: '0ms'
                    }}></span>
                    <span style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: 'var(--accent-yellow)',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite',
                      animationDelay: '150ms'
                    }}></span>
                    <span style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: 'var(--accent-yellow)',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite',
                      animationDelay: '300ms'
                    }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestoes */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              marginBottom: '0.75rem'
            }}>
              💡 Sugestoes de perguntas:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {sugestoes.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => usarSugestao(sug.texto)}
                  className="btn"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--chalk-white)',
                    border: '2px solid var(--chalk-dim)',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'transform 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span>{sug.emoji}</span>
                  <span>{sug.texto}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{
          borderTop: '2px solid var(--chalk-dim)',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua duvida sobre o ENEM..."
              className="input"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '0.5rem',
                color: 'var(--chalk-white)',
                fontSize: '1rem',
                outline: 'none'
              }}
              disabled={loading}
            />
            <button
              onClick={enviarMensagem}
              disabled={!input.trim() || loading}
              className="btn btn-yellow"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent-yellow)',
                color: '#1a202c',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: (!input.trim() || loading) ? 0.5 : 1,
                transition: 'all 0.3s'
              }}
            >
              {loading ? '⏳' : '📤'} Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Dicas */}
      <div className="card" style={{
        marginTop: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '3px solid var(--chalk-dim)',
        borderRadius: '1rem',
        padding: '1.5rem'
      }}>
        <h3 style={{
          color: 'var(--chalk-white)',
          fontWeight: 'bold',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.25rem'
        }}>
          💡 Dicas para usar o chatbot
        </h3>
        <ul style={{
          color: 'var(--chalk-dim)',
          fontSize: '0.875rem',
          margin: 0,
          paddingLeft: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <li>📝 Seja especifico nas perguntas para respostas mais precisas</li>
          <li>📸 Descreva questoes que voce quer resolver</li>
          <li>🎯 Selecione a disciplina para respostas mais focadas</li>
          <li>📚 Peca explicacoes passo a passo de conceitos</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="footer" style={{
        marginTop: '2rem',
        textAlign: 'center',
        padding: '1.5rem'
      }}>
        <button
          onClick={() => router.push('/enem')}
          className="btn"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--chalk-white)',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          ← Voltar ao Menu ENEM
        </button>
      </div>
    </div>
  );
}
