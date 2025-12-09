'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Quantos parágrafos deve ter, no mínimo, uma redação do ENEM?',
    opcoes: ['4 parágrafos', '3 parágrafos', '5 parágrafos', '2 parágrafos'],
    respostaCorreta: 0,
    explicacao: 'A estrutura ideal é: 1 introdução + 2 desenvolvimentos + 1 conclusão = 4 parágrafos mínimos.',
  },
  {
    pergunta: 'A proposta de intervenção deve conter quais elementos?',
    opcoes: [
      'Agente, ação, meio, finalidade e detalhamento',
      'Apenas a ação e o agente',
      'Somente a ação proposta',
      'Agente e finalidade apenas',
    ],
    respostaCorreta: 0,
    explicacao: 'Para a nota máxima, a proposta deve ser completa: QUEM vai fazer (agente), O QUE (ação), COMO (meio), PARA QUE (finalidade) e detalhamento de pelo menos um elemento.',
  },
];

export default function EstruturaRedacaoPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_redacao_estrutura-redacao', Math.floor(progress).toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)', padding: '40px 20px' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 1000 }}>
        <motion.div style={{ height: '100%', background: 'linear-gradient(90deg, #f97316 0%, #ef4444 100%)', width: `${scrollProgress}%` }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
        <button onClick={() => router.back()} style={{ padding: '12px 24px', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(139, 90, 43, 0.4)', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>← Voltar</button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', border: '3px solid rgba(139, 90, 43, 0.6)', borderRadius: '24px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px' }}>📄</div>
          <h1 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '48px', color: '#fff', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)' }}>Estrutura da Redação ENEM</h1>
          <p style={{ color: '#f97316', fontSize: '20px', marginTop: '16px' }}>O caminho para os 1000 pontos!</p>
        </div>

        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f97316', marginBottom: '20px' }}>🏗️ Estrutura Padrão</h2>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '2px solid rgba(249, 115, 22, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#facc15', fontSize: '20px', marginBottom: '8px' }}>📍 Parágrafo 1: INTRODUÇÃO (4-5 linhas)</h3>
                <ul style={{ paddingLeft: '24px', fontSize: '14px' }}>
                  <li>Contextualização do tema</li>
                  <li>Apresentação da tese (seu posicionamento)</li>
                  <li>Menção dos argumentos que serão desenvolvidos</li>
                </ul>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#facc15', fontSize: '20px', marginBottom: '8px' }}>💡 Parágrafos 2 e 3: DESENVOLVIMENTO (7-8 linhas cada)</h3>
                <ul style={{ paddingLeft: '24px', fontSize: '14px' }}>
                  <li>Tópico frasal (ideia principal do parágrafo)</li>
                  <li>Argumentação fundamentada</li>
                  <li>Repertório sociocultural (dados, citações, referências)</li>
                  <li>Análise crítica e conexão com o tema</li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: '#facc15', fontSize: '20px', marginBottom: '8px' }}>🎯 Parágrafo 4: CONCLUSÃO (6-7 linhas)</h3>
                <ul style={{ paddingLeft: '24px', fontSize: '14px' }}>
                  <li>Retomada da tese</li>
                  <li>Proposta de intervenção COMPLETA</li>
                  <li>5 elementos obrigatórios da proposta</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f97316', marginBottom: '20px' }}>🎨 Como Fazer uma INTRODUÇÃO Nota 1000</h2>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#22c55e' }}>✅ Modelo eficaz:</p>
              <ol style={{ paddingLeft: '24px' }}>
                <li><strong>Frase de contexto:</strong> Cite um fato histórico, dados ou conceito relevante</li>
                <li><strong>Ponte para o tema:</strong> Conecte o contexto ao tema da redação</li>
                <li><strong>Tese:</strong> Apresente sua opinião sobre o problema</li>
                <li><strong>Encaminhamento:</strong> Mencione brevemente os argumentos dos desenvolvimentos</li>
              </ol>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#22c55e' }}>💡 Exemplo de Introdução:</p>
              <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                "A Constituição Federal de 1988 assegura o direito à saúde para todos os cidadãos brasileiros.
                Entretanto, na prática, observa-se uma crescente precarização do Sistema Único de Saúde (SUS),
                que compromete o acesso da população a tratamentos adequados. Tal problemática decorre tanto da
                falta de investimentos governamentais quanto da gestão ineficiente dos recursos públicos,
                o que exige medidas urgentes para sua resolução."
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f97316', marginBottom: '20px' }}>💪 Como Fazer um DESENVOLVIMENTO Nota 1000</h2>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6' }}>📝 Estrutura do Parágrafo:</p>
              <ol style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Tópico frasal:</strong> Apresente o argumento principal em 1 frase</li>
                <li style={{ marginBottom: '8px' }}><strong>Repertório:</strong> Use dados, citações, exemplos históricos ou conceitos</li>
                <li style={{ marginBottom: '8px' }}><strong>Análise:</strong> Explique como o repertório se relaciona com o tema</li>
                <li style={{ marginBottom: '8px' }}><strong>Fechamento:</strong> Conclua o raciocínio do parágrafo</li>
              </ol>
            </div>

            <div style={{ marginTop: '20px', background: 'rgba(139, 92, 246, 0.1)', border: '2px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#8b5cf6' }}>🌟 Tipos de Repertório:</p>
              <ul style={{ paddingLeft: '24px' }}>
                <li><strong>Histórico:</strong> Revolução Francesa, Ditadura Militar, etc.</li>
                <li><strong>Filosófico:</strong> Kant, Platão, Hannah Arendt</li>
                <li><strong>Literário:</strong> 1984 (Orwell), Vidas Secas (Graciliano Ramos)</li>
                <li><strong>Cinematográfico:</strong> Filmes relevantes ao tema</li>
                <li><strong>Estatístico:</strong> Dados de pesquisas e órgãos oficiais</li>
                <li><strong>Sociológico:</strong> Conceitos de Bauman, Bourdieu, etc.</li>
              </ul>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#f97316', marginBottom: '20px' }}>🎯 Como Fazer uma CONCLUSÃO Nota 1000</h2>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#ef4444' }}>⚠️ 5 ELEMENTOS OBRIGATÓRIOS da Proposta de Intervenção:</p>
              <ol style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}><strong>AGENTE:</strong> Quem vai executar a ação? (Governo, Ministério, ONG, escolas...)</li>
                <li style={{ marginBottom: '8px' }}><strong>AÇÃO:</strong> O que será feito? (criar campanhas, implementar políticas...)</li>
                <li style={{ marginBottom: '8px' }}><strong>MEIO/MODO:</strong> Como será feito? (por meio de, através de, mediante...)</li>
                <li style={{ marginBottom: '8px' }}><strong>FINALIDADE:</strong> Para que? Qual o objetivo? (a fim de, com o intuito de...)</li>
                <li style={{ marginBottom: '8px' }}><strong>DETALHAMENTO:</strong> Detalhar pelo menos 1 dos elementos acima</li>
              </ol>
            </div>

            <div style={{ marginTop: '20px', background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#ef4444' }}>💡 Exemplo de Conclusão Completa:</p>
              <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                "Portanto, é fundamental que medidas sejam tomadas para combater essa problemática.
                O <strong>Ministério da Saúde</strong> (AGENTE) deve <strong>ampliar os investimentos no SUS</strong> (AÇÃO),
                <strong>por meio da destinação de 15% do orçamento federal para a área</strong> (MEIO/DETALHAMENTO),
                <strong>a fim de garantir atendimento de qualidade à população</strong> (FINALIDADE).
                Assim, será possível efetivar o direito constitucional à saúde no Brasil."
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '32px', color: '#22c55e', marginBottom: '20px' }}>🔥 Dicas de OURO</h2>
            <div style={{ background: 'rgba(250, 204, 21, 0.1)', border: '2px solid rgba(250, 204, 21, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <ul style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}>✅ Use conectivos variados (ademais, outrossim, diante disso, portanto)</li>
                <li style={{ marginBottom: '12px' }}>✅ Mantenha o texto impessoal (evite "eu acho", "na minha opinião")</li>
                <li style={{ marginBottom: '12px' }}>✅ Respeite os direitos humanos (nunca proponha violência ou censura)</li>
                <li style={{ marginBottom: '12px' }}>✅ Cite repertórios LEGITIMADOS (não use fatos fictícios ou fake news)</li>
                <li style={{ marginBottom: '12px' }}>✅ Faça rascunho e conte as linhas de cada parágrafo</li>
                <li style={{ marginBottom: '12px' }}>✅ Mantenha letra legível e sem rasuras excessivas</li>
                <li>✅ Escreva entre 25 e 30 linhas (nunca menos de 7 linhas)</li>
              </ul>
            </div>
          </section>

          <section style={{ background: 'rgba(139, 90, 43, 0.2)', border: '3px solid rgba(139, 90, 43, 0.5)', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '28px', color: '#a0714d', marginBottom: '16px' }}>📌 Checklist Final</h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>✔️ Introdução com tese clara</li>
              <li>✔️ 2 desenvolvimentos com repertórios legitimados</li>
              <li>✔️ Conclusão com proposta de intervenção completa (5 elementos)</li>
              <li>✔️ Uso adequado de conectivos</li>
              <li>✔️ Texto dissertativo-argumentativo</li>
              <li>✔️ Respeito aos direitos humanos</li>
              <li>✔️ Entre 25-30 linhas</li>
            </ul>
          </section>
        </div>
      </motion.div>

      <MicroQuiz questions={questions} materia="redacao" capitulo="estrutura-redacao" onComplete={(a) => console.log(a)} />
    </div>
  );
}
