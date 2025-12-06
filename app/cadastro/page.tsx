'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  dataNascimento: string;
  escolaridade: string;
  estadoUF: string;
  cursoDesejado: string;
  aceitaTermos: boolean;
}

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const ESCOLARIDADES = [
  'Ensino Fundamental Incompleto',
  'Ensino Fundamental Completo',
  'Ensino Medio Incompleto',
  'Ensino Medio Completo (cursando 3o ano)',
  'Ensino Medio Completo',
  'Ensino Superior Incompleto',
  'Ensino Superior Completo'
];

const CURSOS_POPULARES = [
  'Medicina',
  'Direito',
  'Engenharia',
  'Administracao',
  'Psicologia',
  'Enfermagem',
  'Ciencia da Computacao',
  'Arquitetura',
  'Odontologia',
  'Outro'
];

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
    escolaridade: '',
    estadoUF: '',
    cursoDesejado: '',
    aceitaTermos: false
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    if (!formData.dataNascimento || !formData.escolaridade || !formData.estadoUF) {
      setErro('Preencha todos os campos');
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
      // Simulacao de cadastro (substituir por API real)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Salvar dados no localStorage (demo)
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_nome', formData.nome);
      localStorage.setItem('user_logado', 'true');
      localStorage.setItem('user_escolaridade', formData.escolaridade);
      localStorage.setItem('user_estado', formData.estadoUF);
      localStorage.setItem('user_curso_desejado', formData.cursoDesejado);
      localStorage.setItem('fp_total', '100'); // Bonus de boas-vindas
      localStorage.setItem('streak_dias', '1');

      // Redirecionar para onboarding ou dashboard
      router.push('/enem');
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
                  <label htmlFor="nome" style={labelStyle}>Nome completo</label>
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

            {/* Step 2: Informacoes Adicionais */}
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
                  Informacoes Adicionais
                </h2>

                {/* Data de Nascimento */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="dataNascimento" style={labelStyle}>Data de nascimento</label>
                  <input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => updateField('dataNascimento', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                {/* Escolaridade */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="escolaridade" style={labelStyle}>Escolaridade</label>
                  <select
                    id="escolaridade"
                    value={formData.escolaridade}
                    onChange={(e) => updateField('escolaridade', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  >
                    <option value="">Selecione...</option>
                    {ESCOLARIDADES.map(esc => (
                      <option key={esc} value={esc} style={{ backgroundColor: '#1e3a3a', color: 'white' }}>{esc}</option>
                    ))}
                  </select>
                </div>

                {/* Estado */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="estadoUF" style={labelStyle}>Estado (UF)</label>
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

                {/* Curso Desejado */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="cursoDesejado" style={labelStyle}>Curso desejado (opcional)</label>
                  <select
                    id="cursoDesejado"
                    value={formData.cursoDesejado}
                    onChange={(e) => updateField('cursoDesejado', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-yellow)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  >
                    <option value="">Selecione...</option>
                    {CURSOS_POPULARES.map(curso => (
                      <option key={curso} value={curso} style={{ backgroundColor: '#1e3a3a', color: 'white' }}>{curso}</option>
                    ))}
                  </select>
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
                    fontFamily: 'var(--font-kalam)'
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
              Ganhe <strong>100 FP de bonus</strong> ao criar sua conta!
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
