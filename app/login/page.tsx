'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Redirecionar se ja estiver logado
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const next = searchParams.get('next') || '/enem/dashboard';
      router.push(next);
    }
  }, [authLoading, isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, senha);

      if (result.success) {
        const next = searchParams.get('next') || '/enem/dashboard';
        router.push(next);
      } else {
        setErro(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticacao
  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: 'var(--chalkboard-green)',
          backgroundImage: 'var(--chalkboard-texture)'
        }}
      >
        <div className="text-center">
          <div
            className="spinner-ia mx-auto mb-6"
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid var(--chalk-dim)',
              borderTop: '4px solid var(--accent-yellow)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          <p style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{
        backgroundColor: 'var(--chalkboard-green)',
        backgroundImage: 'var(--chalkboard-texture)'
      }}
    >
      <div className="max-w-md w-full">
        {/* Logo e Titulo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
          </Link>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '0.5rem'
            }}
          >
            ENEM Pro
          </h1>
          <p
            style={{
              color: 'var(--chalk-dim)',
              fontSize: '1.125rem',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            Entre na sua conta
          </p>
        </div>

        {/* Card de Login */}
        <div
          className="card"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '3px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '2rem'
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--chalk-white)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-kalam)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>

            {/* Campo Senha */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="senha"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="********"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    paddingRight: '3rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-kalam)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Link Esqueci Senha */}
            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <Link
                href="/recuperar-senha"
                style={{
                  color: 'var(--accent-yellow)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Mensagem de Erro */}
            {erro && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  color: '#fca5a5',
                  fontFamily: 'var(--font-kalam)'
                }}
              >
                {erro}
              </div>
            )}

            {/* Botao Login */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-yellow w-full"
              style={{
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)',
                marginBottom: '1.5rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {/* Divisor */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
              <span style={{ color: 'var(--chalk-dim)', fontFamily: 'var(--font-kalam)' }}>ou</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
            </div>

            {/* Botoes Social Login (placeholder para futuro) */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                className="btn"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
                disabled
                title="Em breve"
              >
                <span style={{ fontSize: '1.25rem' }}>G</span>
                Google
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
                disabled
                title="Em breve"
              >
                <span style={{ fontSize: '1.25rem' }}>f</span>
                Facebook
              </button>
            </div>
          </form>

          {/* Link Cadastro */}
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                color: 'var(--chalk-dim)',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Ainda nao tem uma conta?{' '}
              <Link
                href="/cadastro"
                style={{
                  color: 'var(--accent-yellow)',
                  fontWeight: 'bold',
                  textDecoration: 'none'
                }}
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            href="/"
            style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            ← Voltar ao inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--chalkboard-green)" }}><div style={{ color: "var(--chalk-white)" }}>Carregando...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}
