"use client";
import React from "react";

interface Questao {
  enunciado: string;
  alternativas: string[];
}

interface QuestionCardProps {
  questao: Questao;
  index: number;
  onSelect: (index: number) => void;
}

export default function QuestionCard({ questao, index, onSelect }: QuestionCardProps) {
  return (
    <div className="nfc-card" style={{ marginBottom: 20 }}>
      <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{index + 1}. {questao.enunciado}</p>

      {questao.alternativas.map((alt, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 14px",
            marginTop: 10,
            borderRadius: 12,
            border: "1px solid #444",
            background: "#101c14",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {alt}
        </button>
      ))}
    </div>
  );
}
