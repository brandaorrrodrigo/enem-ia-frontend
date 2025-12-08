'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  estadoUF: string;
  jaFezEnem: string;
  cursosDeInteresse: string[];
  aceitaTermos: boolean;
}

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const OPCOES_ENEM = [
  { value: 'nunca', label: 'Nunca fiz' },
  { value: '1vez', label: 'Ja fiz 1x' },
  { value: '2mais', label: 'Ja fiz 2x ou mais' }
];

const CURSOS_INTERESSE = [
  'Medicina',
  'Engenharias',
  'Direito',
  'Psicologia',
  'Odontologia',
  'TI',
  'Outros'
];

export default function CadastroPage() {
  const router = useRouter();
  const { register, isAuthenticated, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    estadoUF: '',
    jaFezEnem: '',
    cursosDeInteresse: [],
    aceitaTermos: false
  });

  // Redirecionar se ja estiver logado
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/enem/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

  const updateField = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCurso = (curso: string) => {
    setFormData(prev => {
      const cursos = prev.cursosDeInteresse.includes(curso)
        ? prev.cursosDeInteresse.filter(c => c !== curso)
        : [...prev.cursosDeInteresse, curso];
      return { ...prev, cursosDeInteresse: cursos };
    });
  };

  const validarStep1 = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro('Preencha todos os campos');
      return false;
    }
    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas nao coincidem');
      return false;
    }
    if (!formData.email.includes('@')) {
      setErro('Email invalido');
      return false;
    }
    setErro('');
    return true;
  };

  const validarStep2 = () => {
    if (!formData.estadoUF || !formData.jaFezEnem) {
      setErro('Preencha os campos obrigatorios');
      return false;
    }
    if (!formData.aceitaTermos) {
      setErro('Voce precisa aceitar os termos de uso');
      return false;
    }
    setErro('');
    return true;
  };

  const avancarStep = () => {
    if (step === 1 && validarStep1()) {
      setStep(2);
    }
  };

  const voltarStep = () => {
    setStep(1);
    setErro('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarStep2()) return;

    setLoading(true);

    try {
      const result = await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        estado: formData.estadoUF,
        jaFezEnem: formData.jaFezEnem,
        cursosDeInteresse: formData.cursosDeInteresse,
      });

      if (result.success) {
        router.push('/enem/dashboard');
      } else {
        setErro(result.error || 'Erro ao criar conta');
      }
    } catch (err) {
      setErro('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--chalk-white)',
    fontWeight: 'bold' as const,
    fontFamily: 'var(--font-kalam)'
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
            Crie sua conta gratuita
          </p>
        </div>

        {/* Progress Steps */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              backgroundColor: step >= 1 ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
              color: step >= 1 ? 'var(--chalkboard-green)' : 'var(--chalk-dim)',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            1
          </div>
          <div
            style={{
              width: '60px',
              height: '4px',
              backgroundColor: step >= 2 ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
              alignSelf: 'center',
              borderRadius: '2px'
            }}
          ></div>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              backgroundColor: step >= 2 ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
              color: step >= 2 ? 'var(--chalkboard-green)' : 'var(--chalk-dim)',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            2
          </div>
        </div>

        {/* Card de Cadastro */}
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
            {/* Step 1: Dados Basicos */}
            {step === 1 && (
              <>
                <h2
                  style={{
                    color: 'var(--chalk-white)',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  Dados da Conta
                </h2>

                {/* Nome */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="nome" style={labelStyle}>Nome completo ou apelido</label>
                  <input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => updateField('nome', e.target.value)}
                    placeholder="Seu nome"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="seu@email.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                {/* Senha */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="senha" style={labelStyle}>Senha</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="senha"
                      type={mostrarSenha ? 'text' : 'password'}
                      value={formData.senha}
                      onChange={(e) => updateField('senha', e.target.value)}
                      placeholder="Minimo 6 caracteres"
                      style={{ ...inputStyle, paddingRight: '3rem' }}
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

                {/* Confirmar Senha */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="confirmarSenha" style={labelStyle}>Confirmar senha</label>
                  <input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => updateField('confirmarSenha', e.target.value)}
                    placeholder="Repita a senha"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>
              </>
            )}

            {/* Step 2: Informacoes do ENEM */}
            {step === 2 && (
              <>
                <h2
                  style={{
                    color: 'var(--chalk-white)',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  Sobre voce e o ENEM
                </h2>

                {/* Estado */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="estadoUF" style={labelStyle}>Estado (UF) *</label>
                  <select
                    id="estadoUF"
                    value={formData.estadoUF}
                    onChange={(e) => updateField('estadoUF', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  >
                    <option value="">Selecione...</option>
                    {ESTADOS_BR.map(uf => (
                      <option key={uf} value={uf} style={{ backgroundColor: '#1e3a3a', color: 'white' }}>{uf}</option>
                    ))}
                  </select>
                </div>

                {/* Ja fez ENEM */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Ja fez o ENEM? *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {OPCOES_ENEM.map(opcao => (
                      <label
                        key={opcao.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          backgroundColor: formData.jaFezEnem === opcao.value ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          border: formData.jaFezEnem === opcao.value ? '2px solid var(--accent-yellow)' : '2px solid transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input
                          type="radio"
                          name="jaFezEnem"
                          value={opcao.value}
                          checked={formData.jaFezEnem === opcao.value}
                          onChange={(e) => updateField('jaFezEnem', e.target.value)}
                          style={{ accentColor: 'var(--accent-yellow)' }}
                        />
                        <span style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
                          {opcao.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cursos de Interesse */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Cursos de interesse (opcional)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {CURSOS_INTERESSE.map(curso => (
                      <button
                        key={curso}
                        type="button"
                        onClick={() => toggleCurso(curso)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: formData.cursosDeInteresse.includes(curso) ? '2px solid var(--accent-yellow)' : '2px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: formData.cursosDeInteresse.includes(curso) ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          color: formData.cursosDeInteresse.includes(curso) ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
                          fontFamily: 'var(--font-kalam)',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {formData.cursosDeInteresse.includes(curso) ? '✓ ' : ''}{curso}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Termos de Uso */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.aceitaTermos}
                      onChange={(e) => updateField('aceitaTermos', e.target.checked)}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginTop: '2px',
                        accentColor: 'var(--accent-yellow)'
                      }}
                    />
                    <span
                      style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-kalam)'
                      }}
                    >
                      Li e aceito os{' '}
                      <Link href="/termos" style={{ color: 'var(--accent-yellow)' }}>
                        Termos de Uso
                      </Link>{' '}
                      e a{' '}
                      <Link href="/privacidade" style={{ color: 'var(--accent-yellow)' }}>
                        Politica de Privacidade
                      </Link>
                    </span>
                  </label>
                </div>
              </>
            )}

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

            {/* Botoes */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {step === 2 && (
                <button
                  type="button"
                  onClick={voltarStep}
                  className="btn"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  Voltar
                </button>
              )}
              {step === 1 ? (
                <button
                  type="button"
                  onClick={avancarStep}
                  className="btn btn-yellow"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-yellow"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </button>
              )}
            </div>
          </form>

          {/* Bonus de Boas-vindas */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
            <p
              style={{
                color: '#86efac',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-kalam)',
                margin: '0.5rem 0 0 0'
              }}
            >
              Ganhe <strong>500 FP de bonus</strong> ao criar sua conta!
            </p>
          </div>

          {/* Link Login */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p
              style={{
                color: 'var(--chalk-dim)',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Ja tem uma conta?{' '}
              <Link
                href="/login"
                style={{
                  color: 'var(--accent-yellow)',
                  fontWeight: 'bold',
                  textDecoration: 'none'
                }}
              >
                Entrar
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
