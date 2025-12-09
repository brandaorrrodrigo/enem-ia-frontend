'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import MicroQuiz from '@/components/MicroQuiz';

const questions = [
  {
    pergunta: 'Uma receita para 4 pessoas usa 200g de farinha. Quanto será necessário para 10 pessoas?',
    opcoes: [
      '500g',
      '400g',
      '600g',
      '450g',
    ],
    respostaCorreta: 0,
    explicacao: 'Usando regra de três simples: 4 pessoas → 200g, então 10 pessoas → x. x = (10 × 200) / 4 = 500g.',
  },
  {
    pergunta: 'Um desconto de 20% sobre R$ 150,00 resulta em:',
    opcoes: [
      'R$ 120,00',
      'R$ 130,00',
      'R$ 140,00',
      'R$ 110,00',
    ],
    respostaCorreta: 0,
    explicacao: '20% de 150 = 0,20 × 150 = 30. Portanto, 150 - 30 = R$ 120,00. Ou diretamente: 150 × 0,80 = R$ 120,00.',
  },
  {
    pergunta: 'Se 3 operários constroem um muro em 12 dias, quantos operários serão necessários para construir o mesmo muro em 4 dias?',
    opcoes: [
      '9 operários',
      '6 operários',
      '12 operários',
      '15 operários',
    ],
    respostaCorreta: 0,
    explicacao: 'Grandezas inversamente proporcionais: quanto menos dias, mais operários. 3 × 12 = x × 4 → x = 36/4 = 9 operários.',
  },
];

export default function RazaoProportionPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      localStorage.setItem('biblioteca_matematica_razao-proporcao', Math.floor(progress).toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)',
        padding: '40px 20px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '20px' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(139, 90, 43, 0.4)',
            borderRadius: '12px',
            color: '#fff',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          ← Voltar
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '3px solid rgba(139, 90, 43, 0.6)',
          borderRadius: '24px',
          padding: '40px',
        }}
      >
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚖️</div>
          <h1
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            Razão e Proporção
          </h1>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'rgba(250, 204, 21, 0.15)',
            border: '2px solid rgba(250, 204, 21, 0.4)',
            borderRadius: '24px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '24px' }}>⚡</span>
          <span
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '18px',
              color: '#facc15',
              fontWeight: 'bold',
            }}
          >
            +40 FP ao completar
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.8',
          }}
        >
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
              }}
            >
              📊 O que é Razão?
            </h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>Razão</strong> é a comparação entre dois números através de uma divisão. É expressa como a/b ou a:b.
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '8px' }}>
                📝 Exemplo:
              </p>
              <p style={{ margin: 0 }}>
                Em uma turma com 20 meninos e 30 meninas, a razão entre meninos e meninas é:<br/>
                20/30 = 2/3 (simplificando)<br/>
                Lê-se: "2 para 3" ou "2:3"
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
              }}
            >
              ⚖️ O que é Proporção?
            </h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>Proporção</strong> é a igualdade entre duas razões. Se a/b = c/d, dizemos que a, b, c e d estão em proporção.
            </p>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: '24px', fontWeight: 'bold' }}>
                a/b = c/d
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '14px' }}>
                Propriedade fundamental: a × d = b × c (produto dos meios = produto dos extremos)
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
              }}
            >
              🔄 Regra de Três Simples
            </h2>
            <p style={{ marginBottom: '16px' }}>
              A regra de três é usada para resolver problemas que envolvem <strong>grandezas proporcionais</strong>.
            </p>

            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: '#8b5cf6',
                marginTop: '24px',
                marginBottom: '16px',
              }}
            >
              📈 Grandezas Diretamente Proporcionais
            </h3>
            <p style={{ marginBottom: '16px' }}>
              Quando uma grandeza aumenta, a outra também aumenta na mesma proporção.
            </p>
            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#22c55e' }}>
                📝 Exemplo: Velocidade e Distância
              </p>
              <p style={{ marginBottom: '8px' }}>
                Se um carro percorre 120 km em 2 horas, quanto percorrerá em 5 horas mantendo a mesma velocidade?
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
                <strong>Montando a regra de três:</strong><br/>
                2 horas → 120 km<br/>
                5 horas → x km<br/><br/>
                Como são grandezas diretamente proporcionais:<br/>
                2/5 = 120/x<br/>
                2x = 5 × 120<br/>
                2x = 600<br/>
                x = 300 km
              </p>
            </div>

            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: '#8b5cf6',
                marginTop: '24px',
                marginBottom: '16px',
              }}
            >
              📉 Grandezas Inversamente Proporcionais
            </h3>
            <p style={{ marginBottom: '16px' }}>
              Quando uma grandeza aumenta, a outra diminui na mesma proporção.
            </p>
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#ef4444' }}>
                📝 Exemplo: Operários e Tempo
              </p>
              <p style={{ marginBottom: '8px' }}>
                Se 6 operários fazem um serviço em 8 dias, quantos dias levarão 12 operários?
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
                <strong>Montando a regra de três:</strong><br/>
                6 operários → 8 dias<br/>
                12 operários → x dias<br/><br/>
                Como são grandezas inversamente proporcionais, invertemos uma:<br/>
                6/12 = x/8<br/>
                12x = 6 × 8<br/>
                12x = 48<br/>
                x = 4 dias
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#3b82f6',
                marginBottom: '20px',
              }}
            >
              💰 Porcentagem
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Porcentagem é uma razão cujo denominador é 100. O símbolo % significa "por cento" (÷100).
            </p>
            <div
              style={{
                background: 'rgba(250, 204, 21, 0.1)',
                border: '2px solid rgba(250, 204, 21, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#facc15' }}>
                💡 Dicas de Porcentagem:
              </p>
              <ul style={{ paddingLeft: '24px' }}>
                <li>10% = dividir por 10</li>
                <li>25% = dividir por 4</li>
                <li>50% = dividir por 2</li>
                <li>100% = o valor todo</li>
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#22c55e' }}>
                📝 Exemplo: Aumento de 15%
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
                Um produto custa R$ 200,00 e terá aumento de 15%. Qual o novo preço?<br/><br/>
                <strong>Método 1 (mais rápido):</strong><br/>
                Novo preço = 200 × 1,15 = R$ 230,00<br/><br/>
                <strong>Método 2:</strong><br/>
                15% de 200 = 0,15 × 200 = 30<br/>
                Novo preço = 200 + 30 = R$ 230,00
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '32px',
                color: '#22c55e',
                marginBottom: '20px',
              }}
            >
              🎯 Macetes para o ENEM
            </h2>
            <div
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <ol style={{ paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Identifique o tipo de proporção:</strong> Direta (↑↑) ou Inversa (↑↓)?
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Monte a regra de três corretamente:</strong> Coloque as grandezas na mesma ordem.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Para descontos:</strong> Multiplique por (1 - taxa). Ex: 20% de desconto = × 0,80
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Para aumentos:</strong> Multiplique por (1 + taxa). Ex: 15% de aumento = × 1,15
                </li>
                <li>
                  <strong>Simplifique antes de calcular:</strong> Reduza as frações para facilitar as contas.
                </li>
              </ol>
            </div>
          </section>

          <section
            style={{
              background: 'rgba(139, 90, 43, 0.2)',
              border: '3px solid rgba(139, 90, 43, 0.5)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '28px',
                color: '#a0714d',
                marginBottom: '16px',
              }}
            >
              📌 Resumo
            </h2>
            <ul style={{ paddingLeft: '24px' }}>
              <li>Razão = comparação entre dois números (a/b)</li>
              <li>Proporção = igualdade entre duas razões (a/b = c/d)</li>
              <li>Grandezas diretas: ↑↑ ou ↓↓</li>
              <li>Grandezas inversas: ↑↓ (inverta uma das razões)</li>
              <li>Porcentagem = fração com denominador 100</li>
            </ul>
          </section>
        </div>
      </motion.div>

      <MicroQuiz
        questions={questions}
        materia="matematica"
        capitulo="razao-proporcao"
        onComplete={(acertos) => console.log(`Acertos: ${acertos}`)}
      />
    </div>
  );
}
