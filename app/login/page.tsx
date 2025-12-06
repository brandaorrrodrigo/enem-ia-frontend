'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      // Simulacao de login (substituir por API real)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar dados no localStorage (demo)
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_logado', 'true');
      localStorage.setItem('user_nome', email.split('@')[0]);

      // Redirecionar para dashboard
      router.push('/enem');
    } catch (err) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
                marginBottom: '1.5rem'
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

            {/* Botoes Social Login */}
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
                  padding: '0.75rem'
                }}
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
                  padding: '0.75rem'
                }}
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
