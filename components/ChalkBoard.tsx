'use client';

// Rabiscos de fundo simulando lousa escolar com equações e frases motivacionais

const scribbles = [
  // Matemática
  { text: 'E = mc²', top: '5%', left: '8%', rotation: '-3deg' },
  { text: 'f(x) = ax² + bx + c', top: '12%', right: '15%', rotation: '2deg' },
  { text: 'Δ = b² - 4ac', top: '85%', left: '5%', rotation: '-5deg' },
  { text: 'sen²x + cos²x = 1', top: '78%', right: '8%', rotation: '4deg' },
  { text: 'P(A ∩ B) = P(A) · P(B)', top: '25%', left: '3%', rotation: '-2deg' },
  { text: 'log a + log b = log(ab)', top: '45%', left: '6%', rotation: '3deg' },
  { text: 'π ≈ 3,14', top: '68%', left: '12%', rotation: '-4deg' },
  { text: '√(x² + y²)', top: '32%', right: '10%', rotation: '1deg' },
  { text: '1, 2, 3… foco!', top: '55%', left: '8%', rotation: '-1deg' },

  // Física
  { text: 'v = Δs / Δt', top: '18%', right: '5%', rotation: '2deg' },
  { text: 'F = m · a', top: '38%', right: '12%', rotation: '-3deg' },
  { text: 'U = m · g · h', top: '92%', right: '20%', rotation: '5deg' },
  { text: 'Q = m · c · ΔT', top: '62%', right: '7%', rotation: '-2deg' },
  { text: 'P = F / A', top: '75%', left: '20%', rotation: '3deg' },
  { text: 'Inércia ≠ preguiça 😴', top: '42%', left: '15%', rotation: '-4deg' },

  // Química
  { text: 'H₂O', top: '8%', left: '25%', rotation: '2deg' },
  { text: 'NaCl', top: '88%', left: '28%', rotation: '-3deg' },
  { text: 'pH < 7 → ácido', top: '28%', left: '22%', rotation: '4deg' },
  { text: 'C₆H₁₂O₆', top: '52%', right: '18%', rotation: '-1deg' },
  { text: 'ΔH < 0 → exotérmico', top: '95%', right: '12%', rotation: '2deg' },

  // Português / Redação
  { text: 'Tese + argumentos', top: '15%', left: '35%', rotation: '-2deg' },
  { text: 'coerência + coesão', top: '48%', left: '32%', rotation: '3deg' },
  { text: 'Concordância: sujeito 👯 verbo', top: '72%', right: '25%', rotation: '-4deg' },
  { text: '800+ é possível!', top: '35%', right: '22%', rotation: '2deg' },

  // Motivacionais ENEM
  { text: 'Você não está atrasado', top: '22%', left: '42%', rotation: '-3deg' },
  { text: '1 questão de cada vez', top: '58%', left: '38%', rotation: '2deg' },
  { text: 'Quem estuda hoje, escolhe amanhã', top: '82%', left: '35%', rotation: '-2deg' },
  { text: 'Sem drama, só gabarito', top: '65%', right: '30%', rotation: '4deg' },
  { text: 'Café + foco = 🔥', top: '12%', right: '28%', rotation: '-3deg' },

  // Identidade ENEM-IA
  { text: 'ENEM-IA 📚', top: '4%', right: '35%', rotation: '1deg' },
  { text: 'Simulado = treino', top: '90%', left: '42%', rotation: '3deg' },
  { text: 'TRI não é mistério', top: '38%', left: '48%', rotation: '-2deg' },
  { text: 'Melhor que ontem', top: '70%', left: '45%', rotation: '2deg' },
  { text: 'Transformando erro em estratégia', top: '50%', right: '35%', rotation: '-3deg' },

  // Extras espalhados
  { text: '∫ dx = x + C', top: '25%', right: '40%', rotation: '3deg' },
  { text: 'lim x→∞', top: '60%', left: '52%', rotation: '-4deg' },
  { text: 'Redação nota 1000', top: '15%', left: '48%', rotation: '2deg' },
  { text: 'Foco total!', top: '85%', right: '38%', rotation: '-2deg' },
];

export default function ChalkBoard() {
  return (
    <div id="chalk-board" aria-hidden="true">
      {scribbles.map((scribble, index) => (
        <span
          key={index}
          className="chalk-scribble"
          style={{
            top: scribble.top,
            left: scribble.left,
            right: scribble.right,
            '--rotation': scribble.rotation,
          } as React.CSSProperties}
        >
          {scribble.text}
        </span>
      ))}
    </div>
  );
}
