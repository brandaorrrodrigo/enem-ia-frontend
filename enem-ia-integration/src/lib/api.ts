// Configuração da API e interceptors
import axios, { AxiosError, AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Criar instância do axios
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - adiciona token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - trata erros e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Se token expirou, tenta renovar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, redireciona para login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  email: string;
  nome: string;
  tipo_plano: 'free' | 'premium';
  estudos_concluidos: number;
  nivel_atual: number;
  pontos_totais: number;
  streak_dias: number;
  avatar_url?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nome: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface Questao {
  id: string;
  materia: string;
  assunto: string;
  dificuldade: 'facil' | 'media' | 'dificil';
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  resposta_correta: string;
  explicacao: string;
  tags: string[];
  ano_enem?: number;
  imagem_url?: string;
}

export interface Simulado {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'personalizado' | 'oficial';
  total_questoes: number;
  tempo_estimado: number;
  materias: string[];
  dificuldade: string;
  questoes: Questao[];
}

export interface ResultadoSimulado {
  id: string;
  simulado_id: string;
  pontuacao: number;
  acertos: number;
  erros: number;
  tempo_gasto: number;
  data_realizacao: string;
  desempenho_por_materia: {
    materia: string;
    acertos: number;
    total: number;
    percentual: number;
  }[];
}

export interface Redacao {
  id: string;
  tema: string;
  texto: string;
  nota_final?: number;
  competencias?: {
    c1: number;
    c2: number;
    c3: number;
    c4: number;
    c5: number;
  };
  feedback?: string;
  sugestoes?: string[];
  status: 'pendente' | 'corrigida';
  data_envio: string;
}

export interface PlanoEstudo {
  id: string;
  titulo: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  dias_semana: string[];
  materias_foco: string[];
  metas: {
    simulados_por_semana: number;
    questoes_por_dia: number;
    redacoes_por_mes: number;
  };
  progresso: number;
}

export interface Estatisticas {
  total_questoes_respondidas: number;
  taxa_acerto_geral: number;
  tempo_medio_questao: number;
  materias_fortes: string[];
  materias_fracas: string[];
  evolucao_semanal: {
    semana: string;
    acertos: number;
    total: number;
  }[];
  comparacao_media: {
    sua_nota: number;
    media_usuarios: number;
  };
}

// API Service Classes
export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  static async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  static async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch('/auth/profile', data);
    return response.data;
  }
}

export class QuestoesService {
  static async getQuestoes(params?: {
    materia?: string;
    dificuldade?: string;
    limite?: number;
  }): Promise<Questao[]> {
    const response = await api.get('/questoes', { params });
    return response.data;
  }

  static async getQuestao(id: string): Promise<Questao> {
    const response = await api.get(`/questoes/${id}`);
    return response.data;
  }

  static async responderQuestao(
    questaoId: string,
    resposta: string
  ): Promise<{ correto: boolean; explicacao: string; pontos: number }> {
    const response = await api.post(`/questoes/${questaoId}/responder`, {
      resposta,
    });
    return response.data;
  }

  static async getMaterias(): Promise<string[]> {
    const response = await api.get('/questoes/materias');
    return response.data;
  }
}

export class SimuladosService {
  static async getSimulados(tipo?: string): Promise<Simulado[]> {
    const response = await api.get('/simulados', { params: { tipo } });
    return response.data;
  }

  static async getSimulado(id: string): Promise<Simulado> {
    const response = await api.get(`/simulados/${id}`);
    return response.data;
  }

  static async criarSimulado(data: {
    materias: string[];
    quantidade_questoes: number;
    dificuldade: string;
  }): Promise<Simulado> {
    const response = await api.post('/simulados/criar', data);
    return response.data;
  }

  static async iniciarSimulado(id: string): Promise<{ sessao_id: string }> {
    const response = await api.post(`/simulados/${id}/iniciar`);
    return response.data;
  }

  static async finalizarSimulado(
    sessaoId: string,
    respostas: { questao_id: string; resposta: string }[]
  ): Promise<ResultadoSimulado> {
    const response = await api.post(`/simulados/sessao/${sessaoId}/finalizar`, {
      respostas,
    });
    return response.data;
  }

  static async getResultados(): Promise<ResultadoSimulado[]> {
    const response = await api.get('/simulados/resultados');
    return response.data;
  }
}

export class RedacoesService {
  static async enviarRedacao(data: {
    tema: string;
    texto: string;
  }): Promise<Redacao> {
    const response = await api.post('/redacoes/enviar', data);
    return response.data;
  }

  static async getRedacoes(): Promise<Redacao[]> {
    const response = await api.get('/redacoes');
    return response.data;
  }

  static async getRedacao(id: string): Promise<Redacao> {
    const response = await api.get(`/redacoes/${id}`);
    return response.data;
  }

  static async getTemasRedacao(): Promise<
    { id: string; tema: string; descricao: string }[]
  > {
    const response = await api.get('/redacoes/temas');
    return response.data;
  }
}

export class PlanoEstudoService {
  static async getPlanos(): Promise<PlanoEstudo[]> {
    const response = await api.get('/plano-estudo');
    return response.data;
  }

  static async criarPlano(data: {
    materias_foco: string[];
    dias_semana: string[];
    horas_disponiveis: number;
  }): Promise<PlanoEstudo> {
    const response = await api.post('/plano-estudo/criar', data);
    return response.data;
  }

  static async getPlanoAtual(): Promise<PlanoEstudo> {
    const response = await api.get('/plano-estudo/atual');
    return response.data;
  }

  static async marcarAtividadeConcluida(
    atividadeId: string
  ): Promise<{ progresso: number }> {
    const response = await api.post(
      `/plano-estudo/atividades/${atividadeId}/concluir`
    );
    return response.data;
  }
}

export class EstatisticasService {
  static async getEstatisticas(): Promise<Estatisticas> {
    const response = await api.get('/estatisticas');
    return response.data;
  }

  static async getDesempenhoPorMateria(): Promise<
    { materia: string; acertos: number; total: number; media: number }[]
  > {
    const response = await api.get('/estatisticas/por-materia');
    return response.data;
  }

  static async getEvolucao(
    periodo: 'semana' | 'mes' | 'ano'
  ): Promise<{ data: string; acertos: number; total: number }[]> {
    const response = await api.get('/estatisticas/evolucao', {
      params: { periodo },
    });
    return response.data;
  }
}

// Utility functions
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || 'Erro ao processar requisição';
    } else if (error.request) {
      return 'Erro de conexão. Verifique sua internet.';
    }
  }
  return 'Erro inesperado. Tente novamente.';
};
