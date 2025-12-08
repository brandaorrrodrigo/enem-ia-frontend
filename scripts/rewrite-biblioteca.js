const fs = require('fs');

const content = `'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBackButton from '@/components/FloatingBackButton';
import FloatingNav from '@/components/FloatingNav';
import {
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  Lock,
  Play,
  Award
} from 'lucide-react';

interface Modulo {
  id: string;
  titulo: string;
  concluido: boolean;
}

interface Caderno {
  id: string;
  titulo: string;
  materia: string;
  categoria: string;
  nivel: 'Basico' | 'Intermediario' | 'Avancado';
  descricao: string;
  icone: string;
  cor: string;
  modulos: Modulo[];
  progresso: number;
  tempoEstimado: string;
  fpRecompensa: number;
}

const CATEGORIAS = [
  { id: 'todos', nome: 'Todos', emoji: '📚', cor: '#8b5cf6' },
  { id: 'linguagens', nome: 'Linguagens', emoji: '📖', cor: '#3b82f6' },
  { id: 'humanas', nome: 'Humanas', emoji: '🌍', cor: '#f59e0b' },
  { id: 'natureza', nome: 'Natureza', emoji: '🔬', cor: '#10b981' },
  { id: 'matematica', nome: 'Matematica', emoji: '📐', cor: '#ef4444' },
  { id: 'redacao', nome: 'Redacao', emoji: '✍️', cor: '#ec4899' },
];

// FPs corrigidos: 500->20, 600->25, 450->15, 400->10
const CADERNOS_DATA: Caderno[] = [
  // ==================== LINGUAGENS ====================
  {
    id: 'ling-1',
    titulo: 'Interpretacao de Texto',
    materia: 'Portugues',
    categoria: 'linguagens',
    nivel: 'Basico',
    descricao: 'Domine as tecnicas de leitura e interpretacao textual.',
    icone: '📝',
    cor: '#3b82f6',
    modulos: [
      { id: 'm1', titulo: 'Tipos de Texto', concluido: false },
      { id: 'm2', titulo: 'Inferencia e Deducao', concluido: false },
      { id: 'm3', titulo: 'Figuras de Linguagem', concluido: false },
      { id: 'm4', titulo: 'Contexto e Intertextualidade', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 20
  },
  {
    id: 'ling-2',
    titulo: 'Literatura Brasileira',
    materia: 'Literatura',
    categoria: 'linguagens',
    nivel: 'Intermediario',
    descricao: 'Explore os movimentos literarios e obras essenciais.',
    icone: '📚',
    cor: '#3b82f6',
    modulos: [
      { id: 'm1', titulo: 'Barroco e Arcadismo', concluido: false },
      { id: 'm2', titulo: 'Romantismo', concluido: false },
      { id: 'm3', titulo: 'Realismo e Naturalismo', concluido: false },
      { id: 'm4', titulo: 'Modernismo', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 25
  },
  {
    id: 'ling-3',
    titulo: 'Gramatica Aplicada',
    materia: 'Portugues',
    categoria: 'linguagens',
    nivel: 'Intermediario',
    descricao: 'Gramatica focada nas questoes do ENEM.',
    icone: '✏️',
    cor: '#3b82f6',
    modulos: [
      { id: 'm1', titulo: 'Concordancia Verbal e Nominal', concluido: false },
      { id: 'm2', titulo: 'Regencia e Crase', concluido: false },
      { id: 'm3', titulo: 'Pontuacao', concluido: false },
      { id: 'm4', titulo: 'Coesao e Coerencia', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'ling-4',
    titulo: 'Ingles para o ENEM',
    materia: 'Ingles',
    categoria: 'linguagens',
    nivel: 'Basico',
    descricao: 'Estrategias de leitura em ingles.',
    icone: '🇬🇧',
    cor: '#3b82f6',
    modulos: [
      { id: 'm1', titulo: 'Cognatos e Falsos Cognatos', concluido: false },
      { id: 'm2', titulo: 'Skimming e Scanning', concluido: false },
      { id: 'm3', titulo: 'Conectivos e Marcadores', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '3h',
    fpRecompensa: 15
  },

  // ==================== HUMANAS ====================
  {
    id: 'hum-1',
    titulo: 'Historia do Brasil',
    materia: 'Historia',
    categoria: 'humanas',
    nivel: 'Intermediario',
    descricao: 'Do Brasil Colonia a Republica.',
    icone: '🇧🇷',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Brasil Colonia', concluido: false },
      { id: 'm2', titulo: 'Imperio Brasileiro', concluido: false },
      { id: 'm3', titulo: 'Republica Velha', concluido: false },
      { id: 'm4', titulo: 'Era Vargas', concluido: false },
      { id: 'm5', titulo: 'Ditadura Militar', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '8h',
    fpRecompensa: 25
  },
  {
    id: 'hum-2',
    titulo: 'Historia Geral',
    materia: 'Historia',
    categoria: 'humanas',
    nivel: 'Avancado',
    descricao: 'Principais eventos da historia mundial.',
    icone: '🌐',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Revolucoes Burguesas', concluido: false },
      { id: 'm2', titulo: 'Imperialismo e Guerras', concluido: false },
      { id: 'm3', titulo: 'Guerra Fria', concluido: false },
      { id: 'm4', titulo: 'Mundo Contemporaneo', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 25
  },
  {
    id: 'hum-3',
    titulo: 'Geografia Fisica',
    materia: 'Geografia',
    categoria: 'humanas',
    nivel: 'Basico',
    descricao: 'Clima, relevo, vegetacao e hidrografia.',
    icone: '🏔️',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Clima e Tempo', concluido: false },
      { id: 'm2', titulo: 'Relevo Brasileiro', concluido: false },
      { id: 'm3', titulo: 'Biomas e Vegetacao', concluido: false },
      { id: 'm4', titulo: 'Hidrografia', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'hum-4',
    titulo: 'Geografia Humana',
    materia: 'Geografia',
    categoria: 'humanas',
    nivel: 'Intermediario',
    descricao: 'Populacao, urbanizacao e economia.',
    icone: '🏙️',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Demografia', concluido: false },
      { id: 'm2', titulo: 'Urbanizacao', concluido: false },
      { id: 'm3', titulo: 'Migracao', concluido: false },
      { id: 'm4', titulo: 'Globalizacao', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'hum-5',
    titulo: 'Filosofia Essencial',
    materia: 'Filosofia',
    categoria: 'humanas',
    nivel: 'Intermediario',
    descricao: 'Principais pensadores e correntes filosoficas.',
    icone: '🤔',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Filosofia Antiga', concluido: false },
      { id: 'm2', titulo: 'Filosofia Moderna', concluido: false },
      { id: 'm3', titulo: 'Etica e Politica', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 15
  },
  {
    id: 'hum-6',
    titulo: 'Sociologia',
    materia: 'Sociologia',
    categoria: 'humanas',
    nivel: 'Intermediario',
    descricao: 'Conceitos sociologicos fundamentais.',
    icone: '👥',
    cor: '#f59e0b',
    modulos: [
      { id: 'm1', titulo: 'Classicos da Sociologia', concluido: false },
      { id: 'm2', titulo: 'Cultura e Sociedade', concluido: false },
      { id: 'm3', titulo: 'Trabalho e Desigualdade', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 15
  },

  // ==================== NATUREZA ====================
  {
    id: 'nat-1',
    titulo: 'Biologia Celular',
    materia: 'Biologia',
    categoria: 'natureza',
    nivel: 'Basico',
    descricao: 'Estrutura e funcionamento das celulas.',
    icone: '🔬',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Celula Procarionte e Eucarionte', concluido: false },
      { id: 'm2', titulo: 'Organelas Celulares', concluido: false },
      { id: 'm3', titulo: 'Divisao Celular', concluido: false },
      { id: 'm4', titulo: 'Metabolismo Energetico', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'nat-2',
    titulo: 'Genetica',
    materia: 'Biologia',
    categoria: 'natureza',
    nivel: 'Intermediario',
    descricao: 'Hereditariedade e genetica molecular.',
    icone: '🧬',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Leis de Mendel', concluido: false },
      { id: 'm2', titulo: 'DNA e RNA', concluido: false },
      { id: 'm3', titulo: 'Sintese Proteica', concluido: false },
      { id: 'm4', titulo: 'Biotecnologia', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 25
  },
  {
    id: 'nat-3',
    titulo: 'Ecologia',
    materia: 'Biologia',
    categoria: 'natureza',
    nivel: 'Intermediario',
    descricao: 'Ecossistemas e questoes ambientais.',
    icone: '🌱',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Cadeias e Teias Alimentares', concluido: false },
      { id: 'm2', titulo: 'Ciclos Biogeoquimicos', concluido: false },
      { id: 'm3', titulo: 'Problemas Ambientais', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 15
  },
  {
    id: 'nat-4',
    titulo: 'Quimica Geral',
    materia: 'Quimica',
    categoria: 'natureza',
    nivel: 'Basico',
    descricao: 'Fundamentos da quimica.',
    icone: '⚗️',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Estrutura Atomica', concluido: false },
      { id: 'm2', titulo: 'Tabela Periodica', concluido: false },
      { id: 'm3', titulo: 'Ligacoes Quimicas', concluido: false },
      { id: 'm4', titulo: 'Funcoes Inorganicas', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'nat-5',
    titulo: 'Quimica Organica',
    materia: 'Quimica',
    categoria: 'natureza',
    nivel: 'Avancado',
    descricao: 'Compostos de carbono e suas reacoes.',
    icone: '🧪',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Hidrocarbonetos', concluido: false },
      { id: 'm2', titulo: 'Funcoes Organicas', concluido: false },
      { id: 'm3', titulo: 'Isomeria', concluido: false },
      { id: 'm4', titulo: 'Reacoes Organicas', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 25
  },
  {
    id: 'nat-6',
    titulo: 'Fisica: Mecanica',
    materia: 'Fisica',
    categoria: 'natureza',
    nivel: 'Basico',
    descricao: 'Movimento, forca e energia.',
    icone: '⚙️',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Cinematica', concluido: false },
      { id: 'm2', titulo: 'Leis de Newton', concluido: false },
      { id: 'm3', titulo: 'Trabalho e Energia', concluido: false },
      { id: 'm4', titulo: 'Gravitacao', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 20
  },
  {
    id: 'nat-7',
    titulo: 'Fisica: Eletricidade',
    materia: 'Fisica',
    categoria: 'natureza',
    nivel: 'Intermediario',
    descricao: 'Eletrostatica, corrente e circuitos.',
    icone: '⚡',
    cor: '#10b981',
    modulos: [
      { id: 'm1', titulo: 'Eletrostatica', concluido: false },
      { id: 'm2', titulo: 'Corrente Eletrica', concluido: false },
      { id: 'm3', titulo: 'Circuitos Eletricos', concluido: false },
      { id: 'm4', titulo: 'Eletromagnetismo', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },

  // ==================== MATEMATICA ====================
  {
    id: 'mat-1',
    titulo: 'Aritmetica e Algebra',
    materia: 'Matematica',
    categoria: 'matematica',
    nivel: 'Basico',
    descricao: 'Numeros, operacoes e equacoes.',
    icone: '🔢',
    cor: '#ef4444',
    modulos: [
      { id: 'm1', titulo: 'Conjuntos Numericos', concluido: false },
      { id: 'm2', titulo: 'Razao e Proporcao', concluido: false },
      { id: 'm3', titulo: 'Equacoes de 1o e 2o Grau', concluido: false },
      { id: 'm4', titulo: 'Sistemas de Equacoes', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'mat-2',
    titulo: 'Funcoes',
    materia: 'Matematica',
    categoria: 'matematica',
    nivel: 'Intermediario',
    descricao: 'Funcoes de 1o, 2o grau, exponencial e log.',
    icone: '📈',
    cor: '#ef4444',
    modulos: [
      { id: 'm1', titulo: 'Funcao Afim', concluido: false },
      { id: 'm2', titulo: 'Funcao Quadratica', concluido: false },
      { id: 'm3', titulo: 'Funcao Exponencial', concluido: false },
      { id: 'm4', titulo: 'Funcao Logaritmica', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '6h',
    fpRecompensa: 25
  },
  {
    id: 'mat-3',
    titulo: 'Geometria Plana',
    materia: 'Matematica',
    categoria: 'matematica',
    nivel: 'Intermediario',
    descricao: 'Areas, perimetros e teoremas.',
    icone: '📐',
    cor: '#ef4444',
    modulos: [
      { id: 'm1', titulo: 'Triangulos', concluido: false },
      { id: 'm2', titulo: 'Quadrilateros', concluido: false },
      { id: 'm3', titulo: 'Circunferencia', concluido: false },
      { id: 'm4', titulo: 'Teorema de Pitagoras', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },
  {
    id: 'mat-4',
    titulo: 'Geometria Espacial',
    materia: 'Matematica',
    categoria: 'matematica',
    nivel: 'Avancado',
    descricao: 'Volumes e areas de solidos.',
    icone: '🎲',
    cor: '#ef4444',
    modulos: [
      { id: 'm1', titulo: 'Prismas e Cilindros', concluido: false },
      { id: 'm2', titulo: 'Piramides e Cones', concluido: false },
      { id: 'm3', titulo: 'Esfera', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 15
  },
  {
    id: 'mat-5',
    titulo: 'Estatistica e Probabilidade',
    materia: 'Matematica',
    categoria: 'matematica',
    nivel: 'Intermediario',
    descricao: 'Media, moda, mediana e probabilidade.',
    icone: '📊',
    cor: '#ef4444',
    modulos: [
      { id: 'm1', titulo: 'Medidas de Tendencia Central', concluido: false },
      { id: 'm2', titulo: 'Graficos e Tabelas', concluido: false },
      { id: 'm3', titulo: 'Probabilidade', concluido: false },
      { id: 'm4', titulo: 'Analise Combinatoria', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 20
  },

  // ==================== REDACAO ====================
  {
    id: 'red-1',
    titulo: 'Estrutura da Redacao',
    materia: 'Redacao',
    categoria: 'redacao',
    nivel: 'Basico',
    descricao: 'Como estruturar uma dissertacao-argumentativa.',
    icone: '✍️',
    cor: '#ec4899',
    modulos: [
      { id: 'm1', titulo: 'Introducao', concluido: false },
      { id: 'm2', titulo: 'Desenvolvimento', concluido: false },
      { id: 'm3', titulo: 'Conclusao e Proposta', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '3h',
    fpRecompensa: 15
  },
  {
    id: 'red-2',
    titulo: 'Competencias do ENEM',
    materia: 'Redacao',
    categoria: 'redacao',
    nivel: 'Intermediario',
    descricao: 'Domine as 5 competencias avaliadas.',
    icone: '🎯',
    cor: '#ec4899',
    modulos: [
      { id: 'm1', titulo: 'Competencia 1: Norma Culta', concluido: false },
      { id: 'm2', titulo: 'Competencia 2: Tema e Genero', concluido: false },
      { id: 'm3', titulo: 'Competencia 3: Argumentacao', concluido: false },
      { id: 'm4', titulo: 'Competencia 4: Coesao', concluido: false },
      { id: 'm5', titulo: 'Competencia 5: Proposta', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '5h',
    fpRecompensa: 25
  },
  {
    id: 'red-3',
    titulo: 'Repertorio Sociocultural',
    materia: 'Redacao',
    categoria: 'redacao',
    nivel: 'Avancado',
    descricao: 'Citacoes, dados e referencias para usar.',
    icone: '💡',
    cor: '#ec4899',
    modulos: [
      { id: 'm1', titulo: 'Filosofos e Pensadores', concluido: false },
      { id: 'm2', titulo: 'Dados e Estatisticas', concluido: false },
      { id: 'm3', titulo: 'Referencias Culturais', concluido: false }
    ],
    progresso: 0,
    tempoEstimado: '4h',
    fpRecompensa: 20
  }
];

export default function BibliotecaPage() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [busca, setBusca] = useState('');
  const [cadernos, setCadernos] = useState<Caderno[]>(CADERNOS_DATA);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('biblioteca_progresso');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCadernos(prev => prev.map(c => ({
          ...c,
          progresso: progress[c.id] || 0
        })));
      } catch (e) {}
    }
  }, []);

  const cadernosFiltrados = cadernos.filter(c => {
    const matchCategoria = categoriaAtiva === 'todos' || c.categoria === categoriaAtiva;
    const matchBusca = !busca ||
      c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.materia.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const getNivelCor = (nivel: string) => {
    switch (nivel) {
      case 'Basico': return '#10b981';
      case 'Intermediario': return '#f59e0b';
      case 'Avancado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 50%, #1a2e1a 100%)',
      padding: '1rem',
    }}>
      <FloatingBackButton />
      <FloatingNav />

      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '1rem',
              background: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BookOpen size={28} color="#8b5cf6" />
            </div>
          </div>
          <h1 style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#ffd700',
            fontSize: '2.5rem',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
            marginBottom: '0.5rem',
          }}>
            Biblioteca de Cadernos
          </h1>
          <p style={{ color: '#a3a3a3', fontSize: '1rem' }}>
            Estude os conteudos mais cobrados no ENEM
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
          }}>
            <Search size={20} color="#6b7280" />
            <input
              type="text"
              placeholder="Buscar cadernos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f5f5dc',
                fontSize: '1rem',
              }}
            />
          </div>
        </motion.div>

        {/* Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {CATEGORIAS.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '0.75rem',
                border: categoriaAtiva === cat.id ? \`2px solid \${cat.cor}\` : '2px solid rgba(255,255,255,0.1)',
                background: categoriaAtiva === cat.id ? \`\${cat.cor}20\` : 'rgba(0,0,0,0.3)',
                color: '#f5f5dc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <span>{cat.emoji}</span>
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>{cat.nome}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de Cadernos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {cadernosFiltrados.map((caderno, index) => (
            <motion.div
              key={caderno.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 6) }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => router.push(\`/enem/biblioteca/\${caderno.id}\`)}
              style={{
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {/* Header do Card */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: \`\${caderno.cor}20\`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {caderno.icone}
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  background: \`\${getNivelCor(caderno.nivel)}20\`,
                  color: getNivelCor(caderno.nivel),
                  fontSize: '0.75rem',
                  fontWeight: '500',
                }}>
                  {caderno.nivel}
                </span>
              </div>

              {/* Materia */}
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#a3a3a3',
                fontSize: '0.7rem',
                marginBottom: '0.5rem',
                display: 'inline-block',
              }}>
                {caderno.materia}
              </span>

              {/* Titulo */}
              <h3 style={{
                color: '#f5f5dc',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontFamily: "'Poppins', sans-serif",
              }}>
                {caderno.titulo}
              </h3>

              {/* Descricao */}
              <p style={{
                color: '#a3a3a3',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                lineHeight: 1.5,
              }}>
                {caderno.descricao}
              </p>

              {/* Modulos */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}>
                {caderno.modulos.slice(0, 3).map((mod, i) => (
                  <span key={i} style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#6b7280',
                    fontSize: '0.7rem',
                  }}>
                    {mod.titulo}
                  </span>
                ))}
                {caderno.modulos.length > 3 && (
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#6b7280',
                    fontSize: '0.7rem',
                  }}>
                    +{caderno.modulos.length - 3}
                  </span>
                )}
              </div>

              {/* Barra de Progresso */}
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                marginBottom: '1rem',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: \`\${caderno.progresso}%\`,
                  height: '100%',
                  background: caderno.cor,
                  borderRadius: '2px',
                  transition: 'width 0.3s',
                }} />
              </div>

              {/* Footer do Card */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#6b7280',
                    fontSize: '0.8rem',
                  }}>
                    <Clock size={14} />
                    {caderno.tempoEstimado}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#fbbf24',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                  }}>
                    <Star size={14} fill="#fbbf24" />
                    {caderno.fpRecompensa} FP
                  </div>
                </div>
                <ChevronRight size={20} color="#6b7280" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {cadernosFiltrados.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280',
            }}
          >
            <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Nenhum caderno encontrado</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '3rem',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}>
            <div>
              <div style={{ color: '#8b5cf6', fontSize: '2rem', fontWeight: 'bold' }}>
                {cadernos.length}
              </div>
              <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>Cadernos</div>
            </div>
            <div>
              <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}>
                {cadernos.reduce((acc, c) => acc + c.modulos.length, 0)}
              </div>
              <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>Modulos</div>
            </div>
            <div>
              <div style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 'bold' }}>
                {cadernos.reduce((acc, c) => acc + c.fpRecompensa, 0)}
              </div>
              <div style={{ color: '#a3a3a3', fontSize: '0.85rem' }}>FP Disponiveis</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/enem/biblioteca/page.tsx', content);
console.log('Biblioteca reescrita com sucesso!');
