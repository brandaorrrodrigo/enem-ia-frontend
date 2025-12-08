'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  nome: string;
  email: string;
  pontosFP: number;
  nivel: string;
  streak: number;
  streakMax?: number;
  cursoAlvo?: {
    id: string;
    nome: string;
    ies: string;
    notaCorte: number;
  } | null;
  plano: 'lite' | 'pro' | 'premium';
  score?: {
    totalPoints: number;
    level: number;
    fp: number;
  } | null;
  badges?: Array<{
    id: string;
    nome: string;
    icone: string;
    unlockedAt: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserLocal: (updates: Partial<User>) => void;
}

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  estado?: string;
  jaFezEnem?: string;
  cursosDeInteresse?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rotas publicas que nao precisam de autenticacao
const PUBLIC_ROUTES = ['/', '/login', '/cadastro', '/recuperar-senha', '/planos', '/preços'];

// Rotas que precisam de autenticacao
const PROTECTED_PREFIXES = ['/enem'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Verificar autenticacao ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  // Proteger rotas
  useEffect(() => {
    if (loading) return;

    const isProtectedRoute = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (isProtectedRoute && !user) {
      // Redirecionar para login com next param
      const next = encodeURIComponent(pathname);
      router.push(`/login?next=${next}`);
    }
  }, [loading, user, pathname, router]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
        // Sincronizar com localStorage para componentes legados
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_nome', data.user.nome);
        localStorage.setItem('user_logado', 'true');
        localStorage.setItem('fp_total', String(data.user.pontosFP));
        localStorage.setItem('streak_dias', String(data.user.streak));
        localStorage.setItem('plano_usuario', data.user.plano);
      } else {
        setUser(null);
        // Limpar localStorage
        localStorage.removeItem('user_logado');
      }
    } catch (error) {
      console.error('Erro ao verificar autenticacao:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, senha: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        // Sincronizar com localStorage
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_nome', data.user.nome);
        localStorage.setItem('user_logado', 'true');
        localStorage.setItem('fp_total', String(data.user.pontosFP));
        localStorage.setItem('streak_dias', String(data.user.streak));
        localStorage.setItem('plano_usuario', data.user.plano);
        return { success: true };
      }

      return { success: false, error: data.error || 'Erro ao fazer login' };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexao' };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success && result.user) {
        setUser(result.user);
        // Sincronizar com localStorage
        localStorage.setItem('user_email', result.user.email);
        localStorage.setItem('user_nome', result.user.nome);
        localStorage.setItem('user_logado', 'true');
        localStorage.setItem('fp_total', String(result.user.pontosFP));
        localStorage.setItem('streak_dias', String(result.user.streak));
        localStorage.setItem('plano_usuario', 'lite');
        return { success: true };
      }

      return { success: false, error: result.error || 'Erro ao criar conta' };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro de conexao' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setUser(null);
      // Limpar localStorage
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_nome');
      localStorage.removeItem('user_logado');
      localStorage.removeItem('fp_total');
      localStorage.removeItem('streak_dias');
      localStorage.removeItem('plano_usuario');
      router.push('/');
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  const updateUserLocal = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      // Sincronizar atualizacoes com localStorage
      if (updates.pontosFP !== undefined) {
        localStorage.setItem('fp_total', String(updates.pontosFP));
      }
      if (updates.streak !== undefined) {
        localStorage.setItem('streak_dias', String(updates.streak));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateUserLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
