/**
 * Página Principal de Simulado ENEM
 *
 * Permite ao usuário:
 * - Escolher área do conhecimento (Matemática, Linguagens, Humanas, Natureza)
 * - Definir quantidade de questões (5, 10, 20, 45)
 * - Iniciar simulado
 *
 * Fluxo de API:
 * 1. POST /api/enem/simulados/start
 * 2. Redireciona para /simulado/[id] com as questões
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AREAS_ENEM,
  BACKEND_URL,
  type StartSimuladoRequest,
  type StartSimuladoResponse,
} from '@/types/simulado';

export default function SimuladoPage() {
  const router = useRouter();

  // Estados
  const [area, setArea] = useState<string>('matematica');
  const [quantidade, setQuantidade] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email do usuário (por enquanto mockado, depois virá de autenticação)
  const userId = 'aluno@example.com';

  /**
   * PASSO 1: Iniciar Simulado
   *
   * Chama: POST /api/enem/simulados/start
   * Resposta: { simulado_id, usuario_simulado_id, questoes }
   * Ação: Redireciona para /simulado/[usuario_simulado_id]
   */
  async function iniciarSimulado() {
    try {
      setLoading(true);
      setError(null);

      console.log('📝 Iniciando simulado:', { area, quantidade, userId });

      // Monta request
      const requestBody: StartSimuladoRequest = {
        user_id: userId,
        area: area,
        quantidade: quantidade,
      };

      // Chama API
      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      // Verifica erro
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `Erro ${response.status}: ${response.statusText}`
        );
      }

      // Parse resposta
      const data: StartSimuladoResponse = await response.json();

      console.log('✅ Simulado criado:', data);

      // Salva dados no localStorage para usar na página de execução
      localStorage.setItem('simulado_atual', JSON.stringify({
        usuario_simulado_id: data.usuario_simulado_id,
        simulado_id: data.simulado_id,
        questoes: data.questoes,
        quantidade: data.quantidade,
        disciplina: data.disciplina,
      }));

      // Redireciona para página de execução
      router.push(`/simulado/${data.usuario_simulado_id}`);

    } catch (err: any) {
      console.error('❌ Erro ao iniciar simulado:', err);
      setError(err.message || 'Erro ao iniciar simulado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a1a0a',
        padding: 24,
      }}
    >
      {/* Container Principal */}
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          paddingTop: 40,
        }}
      >
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#4CAF50',
              marginBottom: 8,
              textShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
            }}
          >
            🎓 Simulado ENEM
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#aaa',
              margin: 0,
            }}
          >
            Escolha a área e quantidade de questões para iniciar
          </p>
        </div>

        {/* Card de Configuração */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #4CAF50',
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
          }}
        >
          {/* Escolha de Área */}
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#4CAF50',
                marginBottom: 12,
              }}
            >
              📚 Área do Conhecimento
            </label>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '1rem',
                backgroundColor: '#0d1f14',
                color: '#fff',
                border: '1px solid #4CAF50',
                borderRadius: 8,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="">Todas as Áreas (Geral)</option>
              {AREAS_ENEM.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>

            <div
              style={{
                fontSize: '0.85rem',
                color: '#888',
                marginTop: 8,
              }}
            >
              💡 Escolha uma área específica ou deixe "Geral" para questões mistas
            </div>
          </div>

          {/* Escolha de Quantidade */}
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#4CAF50',
                marginBottom: 12,
              }}
            >
              🔢 Quantidade de Questões
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 12,
              }}
            >
              {[5, 10, 20, 45].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantidade(q)}
                  disabled={loading}
                  style={{
                    padding: '16px 20px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    backgroundColor: quantidade === q ? '#4CAF50' : '#0d1f14',
                    color: '#fff',
                    border: quantidade === q ? '2px solid #4CAF50' : '1px solid #444',
                    borderRadius: 8,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && quantidade !== q) {
                      e.currentTarget.style.backgroundColor = '#1a3a1a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (quantidade !== q) {
                      e.currentTarget.style.backgroundColor = '#0d1f14';
                    }
                  }}
                >
                  {q} questões
                </button>
              ))}
            </div>

            <div
              style={{
                fontSize: '0.85rem',
                color: '#888',
                marginTop: 8,
              }}
            >
              💡 ENEM completo tem 45 questões por área (180 no total)
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              backgroundColor: '#0d1f14',
              border: '1px solid #4CAF50',
              borderRadius: 8,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: 8 }}>
              📊 Resumo do Simulado
            </div>
            <div style={{ fontSize: '1rem', color: '#fff' }}>
              <strong>{quantidade} questões</strong> de{' '}
              <strong>
                {area
                  ? AREAS_ENEM.find((a) => a.value === area)?.label
                  : 'Todas as Áreas'}
              </strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 4 }}>
              ⏱️ Tempo estimado: ~{quantidade * 3} minutos
            </div>
          </div>

          {/* Botão Iniciar */}
          <button
            onClick={iniciarSimulado}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              backgroundColor: loading ? '#666' : '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: loading
                ? 'none'
                : '0 4px 12px rgba(76, 175, 80, 0.4)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#45a049';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = loading ? '#666' : '#4CAF50';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? '⏳ Criando Simulado...' : '🚀 Iniciar Simulado'}
          </button>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div
            style={{
              backgroundColor: '#1f0d0d',
              border: '2px solid #F44336',
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '1rem', color: '#F44336', marginBottom: 8 }}>
              ❌ Erro
            </div>
            <div style={{ fontSize: '0.9rem', color: '#fff' }}>
              {error}
            </div>
            <button
              onClick={() => setError(null)}
              style={{
                marginTop: 12,
                padding: '8px 16px',
                backgroundColor: '#F44336',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Fechar
            </button>
          </div>
        )}

        {/* Informações Adicionais */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ fontSize: '1.2rem', color: '#4CAF50', marginBottom: 16 }}>
            💡 Dicas para o Simulado
          </h3>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              color: '#ccc',
              lineHeight: 1.8,
            }}
          >
            <li>✅ Responda com calma, uma questão por vez</li>
            <li>✅ Você pode mudar sua resposta antes de finalizar</li>
            <li>✅ Ao final, você receberá sua nota e verá os erros</li>
            <li>✅ Compare sua nota com cursos e universidades</li>
            <li>✅ Compartilhe seu resultado nas redes sociais</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
