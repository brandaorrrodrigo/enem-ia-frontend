'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';

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
      // Simular resposta da IA
      await new Promise(resolve => setTimeout(resolve, 1500));

      const respostaIA = gerarRespostaIA(input, disciplinaSelecionada);

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
    } finally {
      setLoading(false);
    }
  };

  const gerarRespostaIA = (pergunta: string, disciplina: string): string => {
    const perguntaLower = pergunta.toLowerCase();

    // Respostas baseadas em palavras-chave
    if (perguntaLower.includes('bhaskara')) {
      return `A Formula de Bhaskara e usada para encontrar as raizes de uma equacao do 2o grau (ax² + bx + c = 0).

A formula e: x = (-b ± √(b² - 4ac)) / 2a

Passo a passo:
1. Identifique os coeficientes a, b e c
2. Calcule o discriminante: Δ = b² - 4ac
3. Se Δ > 0: duas raizes reais diferentes
4. Se Δ = 0: duas raizes reais iguais
5. Se Δ < 0: nao ha raizes reais

Exemplo: x² - 5x + 6 = 0
a = 1, b = -5, c = 6
Δ = 25 - 24 = 1
x = (5 ± 1) / 2
x₁ = 3 e x₂ = 2

Quer que eu resolva algum exercicio especifico?`;
    }

    if (perguntaLower.includes('redacao') || perguntaLower.includes('redação')) {
      return `Para conseguir nota 1000 na redacao do ENEM, siga estas dicas:

📝 ESTRUTURA:
- Introducao (1 paragrafo): Apresente o tema e sua tese
- Desenvolvimento (2 paragrafos): Argumentos com repertorio sociocultural
- Conclusao (1 paragrafo): Proposta de intervencao detalhada

✅ COMPETENCIAS AVALIADAS:
1. Dominio da norma culta
2. Compreensao do tema
3. Argumentacao
4. Coesao textual
5. Proposta de intervencao

💡 DICAS IMPORTANTES:
- Use conectivos para ligar ideias
- Cite filosofos, dados, leis (repertorio)
- Proposta deve ter: AGENTE + ACAO + MODO + EFEITO
- Respeite os direitos humanos
- Escreva entre 7 e 30 linhas

Quer que eu explique alguma competencia em detalhes?`;
    }

    if (perguntaLower.includes('grafico') || perguntaLower.includes('gráfico')) {
      return `Para interpretar graficos no ENEM, siga estes passos:

📊 ANALISE INICIAL:
1. Leia o titulo do grafico
2. Identifique as variaveis nos eixos (X e Y)
3. Observe as unidades de medida
4. Leia a legenda (se houver)

📈 TIPOS COMUNS:
- Grafico de linhas: mostra evolucao/tendencia
- Grafico de barras: compara quantidades
- Grafico de pizza: mostra proporcoes (%)
- Histograma: distribuicao de frequencias

⚠️ ATENCAO:
- Cuidado com escalas manipuladas
- Verifique se comeca do zero
- Observe intervalos no eixo X
- Relacione com o texto da questao

Quer que eu analise algum tipo especifico de grafico?`;
    }

    if (perguntaLower.includes('historia') || perguntaLower.includes('história') || perguntaLower.includes('brasil')) {
      return `Os principais temas de Historia do Brasil no ENEM:

🇧🇷 PERIODO COLONIAL (1500-1822):
- Ciclos economicos (pau-brasil, acucar, ouro)
- Escravidao e resistencia (quilombos)
- Invasoes estrangeiras

🏛️ IMPERIO (1822-1889):
- Independencia e Primeiro Reinado
- Periodo Regencial
- Segundo Reinado e abolicao

🗳️ REPUBLICA:
- Republica Velha (cafe com leite)
- Era Vargas (1930-1945)
- Ditadura Militar (1964-1985)
- Redemocratizacao

💡 DICA: O ENEM cobra muito a relacao entre passado e presente, especialmente em questoes de cidadania e direitos.

Quer que eu aprofunde em algum periodo?`;
    }

    if (perguntaLower.includes('regra de tres') || perguntaLower.includes('regra de três')) {
      return `A Regra de Tres e uma das ferramentas mais uteis no ENEM!

📐 REGRA DE TRES SIMPLES:
Usada quando temos duas grandezas proporcionais.

Exemplo: Se 3 canetas custam R$ 15, quanto custam 7 canetas?
3 canetas --- R$ 15
7 canetas --- x

Grandezas diretamente proporcionais (mais canetas = mais dinheiro)
3/7 = 15/x
x = (7 × 15) / 3 = R$ 35

📐 REGRA DE TRES COMPOSTA:
Quando temos 3 ou mais grandezas.

PASSOS:
1. Monte a tabela com as grandezas
2. Identifique se sao direta ou inversamente proporcionais
3. Multiplique as colunas corretamente

💡 MACETE: Setas na mesma direcao = multiplica reto
Setas em direcoes opostas = multiplica cruzado

Quer que eu resolva algum exercicio?`;
    }

    if (perguntaLower.includes('ohm') || perguntaLower.includes('eletricidade')) {
      return `A Lei de Ohm e fundamental em Fisica!

⚡ LEI DE OHM:
U = R × i

Onde:
- U = tensao (Volts - V)
- R = resistencia (Ohms - Ω)
- i = corrente (Amperes - A)

📊 OUTRAS FORMULAS IMPORTANTES:
- Potencia: P = U × i = R × i² = U²/R
- Energia: E = P × t
- Resistencia equivalente em serie: Req = R1 + R2 + R3...
- Resistencia equivalente em paralelo: 1/Req = 1/R1 + 1/R2...

💡 DICAS PARA O ENEM:
- Circuitos em serie: mesma corrente em todos
- Circuitos em paralelo: mesma tensao em todos
- Atencao as unidades (mA, kΩ, etc)

Quer que eu explique circuitos em serie ou paralelo?`;
    }

    // Resposta padrao
    return `Boa pergunta sobre "${pergunta}"!

Para te ajudar melhor, preciso de mais detalhes. Voce pode:

1. 📝 Especificar a materia ou tema
2. 📸 Descrever uma questao especifica
3. 🎯 Me dizer qual e sua maior dificuldade

Estou aqui para:
- Explicar conceitos
- Resolver exercicios passo a passo
- Dar dicas de estudo
- Tirar duvidas sobre o ENEM

Como posso te ajudar?`;
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
