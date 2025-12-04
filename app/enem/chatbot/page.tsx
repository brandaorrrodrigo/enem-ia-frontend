'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
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
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      {/* Header */}
      <div className="mb-6 pt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="title-ia flex items-center gap-3 mb-2">
              🤖 Chatbot Assistente
            </h1>
            <p className="subtitle-ia mb-0">
              Seu tutor virtual para duvidas do ENEM
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={disciplinaSelecionada}
              onChange={(e) => setDisciplinaSelecionada(e.target.value)}
              className="input-ia"
            >
              {disciplinas.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>

            <button
              onClick={limparHistorico}
              className="btn-ia-secondary text-sm"
              title="Limpar historico"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card-ia flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '450px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-yellow-300/20 text-white rounded-br-sm'
                    : 'bg-white/10 text-white rounded-bl-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </span>
                  <div>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className="text-white/40 text-xs mt-2">
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
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl p-4 rounded-bl-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestoes */}
        {messages.length <= 1 && (
          <div className="px-4 pb-4">
            <p className="text-white/60 text-sm mb-3">💡 Sugestoes de perguntas:</p>
            <div className="flex flex-wrap gap-2">
              {sugestoes.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => usarSugestao(sug.texto)}
                  className="btn-ia-sm text-xs flex items-center gap-1 hover:scale-105 transition"
                >
                  <span>{sug.emoji}</span>
                  <span>{sug.texto}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua duvida sobre o ENEM..."
              className="input-ia flex-1"
              disabled={loading}
            />
            <button
              onClick={enviarMensagem}
              disabled={!input.trim() || loading}
              className="btn-ia px-6 disabled:opacity-50"
            >
              {loading ? '⏳' : '📤'} Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Dicas */}
      <div className="card-ia mt-6">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          💡 Dicas para usar o chatbot
        </h3>
        <ul className="text-white/70 text-sm space-y-2">
          <li>📝 Seja especifico nas perguntas para respostas mais precisas</li>
          <li>📸 Descreva questoes que voce quer resolver</li>
          <li>🎯 Selecione a disciplina para respostas mais focadas</li>
          <li>📚 Peca explicacoes passo a passo de conceitos</li>
        </ul>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
