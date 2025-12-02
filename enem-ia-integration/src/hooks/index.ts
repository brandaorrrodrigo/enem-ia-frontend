// Custom Hooks para gerenciamento de estado e autenticação
'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  AuthService,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  handleApiError,
} from './api';

// Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carrega usuário do localStorage ao montar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
          // Valida token no servidor
          const profile = await AuthService.getProfile();
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const response: AuthResponse = await AuthService.login(credentials);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        router.push('/dashboard');
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        const response: AuthResponse = await AuthService.register(data);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        router.push('/dashboard');
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const updateUser = useCallback(async (data: Partial<User>) => {
    try {
      const updatedUser = await AuthService.updateProfile(data);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook para questões
export const useQuestoes = (params?: {
  materia?: string;
  dificuldade?: string;
  limite?: number;
}) => {
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestoes = async () => {
      try {
        setLoading(true);
        const { QuestoesService } = await import('./api');
        const data = await QuestoesService.getQuestoes(params);
        setQuestoes(data);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestoes();
  }, [params?.materia, params?.dificuldade, params?.limite]);

  return { questoes, loading, error };
};

// Hook para simulados
export const useSimulados = (tipo?: string) => {
  const [simulados, setSimulados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { SimuladosService } = await import('./api');
      const data = await SimuladosService.getSimulados(tipo);
      setSimulados(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [tipo]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { simulados, loading, error, refresh };
};

// Hook para estatísticas
export const useEstatisticas = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { EstatisticasService } = await import('./api');
      const data = await EstatisticasService.getEstatisticas();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { stats, loading, error, refresh };
};

// Hook para redações
export const useRedacoes = () => {
  const [redacoes, setRedacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { RedacoesService } = await import('./api');
      const data = await RedacoesService.getRedacoes();
      setRedacoes(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { redacoes, loading, error, refresh };
};

// Hook para plano de estudos
export const usePlanoEstudo = () => {
  const [plano, setPlano] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { PlanoEstudoService } = await import('./api');
      const data = await PlanoEstudoService.getPlanoAtual();
      setPlano(data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { plano, loading, error, refresh };
};

// Hook de notificações/toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<
    { id: string; message: string; type: 'success' | 'error' | 'info' }[]
  >([]);

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove após 5 segundos
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

// Hook para loading states
export const useAsyncAction = <T extends any[]>(
  action: (...args: T) => Promise<void>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: T) => {
      try {
        setLoading(true);
        setError(null);
        await action(...args);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [action]
  );

  return { execute, loading, error };
};

// Hook para debounce
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para local storage
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
