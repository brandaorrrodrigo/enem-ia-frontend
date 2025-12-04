'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Modulo {
  id: string;
  titulo: string;
  concluido: boolean;
}

interface Caderno {
  id: string;
  titulo: string;
  categoria: string;
  nivel: 'Basico' | 'Intermediario' | 'Avancado';
  descricao: string;
  icone: string;
  cor: string;
  modulos: Modulo[];
  progresso: number;
  tempoEstimado: string;
  fpRecompensa: number;
  tags: string[];
}

const CATEGORIAS = [
  { id: 'todos', nome: 'Todos', emoji: '📚', cor: 'from-purple-500 to-pink-500' },
  { id: 'linguagens', nome: 'Linguagens', emoji: '📖', cor: 'from-blue-500 to-cyan-500' },
  { id: 'humanas', nome: 'Humanas', emoji: '🌍', cor: 'from-orange-500 to-red-500' },
  { id: 'natureza', nome: 'Natureza', emoji: '🔬', cor: 'from-green-500 to-emerald-500' },
  { id: 'matematica', nome: 'Matematica', emoji: '📐', cor: 'from-yellow-500 to-orange-500' },
  { id: 'redacao', nome: 'Redacao', emoji: '✍️', cor: 'from-pink-500 to-rose-500' },
  { id: 'interdisciplinar', nome: 'Interdisciplinar', emoji: '🎯', cor: 'from-violet-500 to-purple-500' },
];

const CADERNOS_DATA: Caderno[] = [
  { id: 'ling-1', titulo: 'Interpretacao de Texto', categoria: 'linguagens', nivel: 'Basico', descricao: 'Domine as tecnicas de leitura e interpretacao textual.', icone: '📝', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Tipos de Texto', concluido: false }, { id: 'm2', titulo: 'Inferencia e Deducao', concluido: false }, { id: 'm3', titulo: 'Figuras de Linguagem', concluido: false }, { id: 'm4', titulo: 'Contexto e Intertextualidade', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['texto', 'leitura'] },
  { id: 'ling-2', titulo: 'Literatura Brasileira', categoria: 'linguagens', nivel: 'Intermediario', descricao: 'Explore os movimentos literarios e obras essenciais.', icone: '📚', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Barroco e Arcadismo', concluido: false }, { id: 'm2', titulo: 'Romantismo', concluido: false }, { id: 'm3', titulo: 'Realismo e Naturalismo', concluido: false }, { id: 'm4', titulo: 'Modernismo', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['literatura', 'autores'] },
  { id: 'ling-3', titulo: 'Gramatica Essencial', categoria: 'linguagens', nivel: 'Basico', descricao: 'Topicos gramaticais mais cobrados no ENEM.', icone: '✏️', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Classes de Palavras', concluido: false }, { id: 'm2', titulo: 'Sintaxe', concluido: false }, { id: 'm3', titulo: 'Concordancia e Regencia', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['gramatica', 'portugues'] },
  { id: 'ling-4', titulo: 'Generos Textuais', categoria: 'linguagens', nivel: 'Intermediario', descricao: 'Conheca todos os generos textuais do ENEM.', icone: '📄', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Generos Jornalisticos', concluido: false }, { id: 'm2', titulo: 'Generos Literarios', concluido: false }, { id: 'm3', titulo: 'Generos Digitais', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['generos', 'texto'] },
  { id: 'ling-5', titulo: 'Lingua Estrangeira - Ingles', categoria: 'linguagens', nivel: 'Intermediario', descricao: 'Estrategias para interpretar textos em ingles.', icone: '🇺🇸', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Vocabulario Essencial', concluido: false }, { id: 'm2', titulo: 'Cognatos', concluido: false }, { id: 'm3', titulo: 'Interpretacao', concluido: false }], progresso: 0, tempoEstimado: '3h', fpRecompensa: 150, tags: ['ingles'] },
  { id: 'ling-6', titulo: 'Lingua Estrangeira - Espanhol', categoria: 'linguagens', nivel: 'Intermediario', descricao: 'Estrategias para textos em espanhol.', icone: '🇪🇸', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Vocabulario', concluido: false }, { id: 'm2', titulo: 'Heterosemanticos', concluido: false }, { id: 'm3', titulo: 'Interpretacao', concluido: false }], progresso: 0, tempoEstimado: '3h', fpRecompensa: 150, tags: ['espanhol'] },
  { id: 'ling-7', titulo: 'Artes e Movimentos', categoria: 'linguagens', nivel: 'Avancado', descricao: 'Historia da arte e movimentos artisticos.', icone: '🎨', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Arte Brasileira', concluido: false }, { id: 'm2', titulo: 'Movimentos Mundiais', concluido: false }, { id: 'm3', titulo: 'Arte Contemporanea', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['arte', 'cultura'] },
  { id: 'ling-8', titulo: 'Variacoes Linguisticas', categoria: 'linguagens', nivel: 'Basico', descricao: 'Variacoes da lingua portuguesa.', icone: '🗣️', cor: 'from-blue-500 to-cyan-500', modulos: [{ id: 'm1', titulo: 'Variacoes Regionais', concluido: false }, { id: 'm2', titulo: 'Variacoes Sociais', concluido: false }, { id: 'm3', titulo: 'Norma Culta', concluido: false }], progresso: 0, tempoEstimado: '2h', fpRecompensa: 100, tags: ['linguistica'] },
  { id: 'hum-1', titulo: 'Historia do Brasil', categoria: 'humanas', nivel: 'Intermediario', descricao: 'Da colonizacao a Republica.', icone: '🇧🇷', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Brasil Colonial', concluido: false }, { id: 'm2', titulo: 'Imperio', concluido: false }, { id: 'm3', titulo: 'Republica Velha', concluido: false }, { id: 'm4', titulo: 'Era Vargas', concluido: false }, { id: 'm5', titulo: 'Ditadura', concluido: false }], progresso: 0, tempoEstimado: '8h', fpRecompensa: 400, tags: ['historia', 'brasil'] },
  { id: 'hum-2', titulo: 'Historia Geral', categoria: 'humanas', nivel: 'Avancado', descricao: 'Eventos da historia mundial.', icone: '🌎', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Antiguidade', concluido: false }, { id: 'm2', titulo: 'Idade Media', concluido: false }, { id: 'm3', titulo: 'Idade Moderna', concluido: false }, { id: 'm4', titulo: 'Revolucoes', concluido: false }, { id: 'm5', titulo: 'Guerras Mundiais', concluido: false }], progresso: 0, tempoEstimado: '10h', fpRecompensa: 500, tags: ['historia', 'mundial'] },
  { id: 'hum-3', titulo: 'Geografia Fisica', categoria: 'humanas', nivel: 'Intermediario', descricao: 'Relevo, clima, hidrografia e biomas.', icone: '🏔️', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Relevo e Geologia', concluido: false }, { id: 'm2', titulo: 'Climatologia', concluido: false }, { id: 'm3', titulo: 'Hidrografia', concluido: false }, { id: 'm4', titulo: 'Biomas', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['geografia', 'clima'] },
  { id: 'hum-4', titulo: 'Geografia Humana', categoria: 'humanas', nivel: 'Intermediario', descricao: 'Populacao, urbanizacao, economia.', icone: '👥', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Demografia', concluido: false }, { id: 'm2', titulo: 'Urbanizacao', concluido: false }, { id: 'm3', titulo: 'Agraria', concluido: false }, { id: 'm4', titulo: 'Industria', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['geografia', 'populacao'] },
  { id: 'hum-5', titulo: 'Filosofia', categoria: 'humanas', nivel: 'Avancado', descricao: 'Filosofos e correntes filosoficas.', icone: '🤔', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Filosofia Antiga', concluido: false }, { id: 'm2', titulo: 'Medieval', concluido: false }, { id: 'm3', titulo: 'Moderna', concluido: false }, { id: 'm4', titulo: 'Contemporanea', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['filosofia'] },
  { id: 'hum-6', titulo: 'Sociologia', categoria: 'humanas', nivel: 'Intermediario', descricao: 'Conceitos sociologicos e pensadores.', icone: '👨‍👩‍👧‍👦', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Classicos', concluido: false }, { id: 'm2', titulo: 'Cultura', concluido: false }, { id: 'm3', titulo: 'Desigualdade', concluido: false }, { id: 'm4', titulo: 'Movimentos', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['sociologia'] },
  { id: 'hum-7', titulo: 'Atualidades', categoria: 'humanas', nivel: 'Avancado', descricao: 'Temas atuais importantes.', icone: '📰', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Geopolitica', concluido: false }, { id: 'm2', titulo: 'Meio Ambiente', concluido: false }, { id: 'm3', titulo: 'Conflitos', concluido: false }, { id: 'm4', titulo: 'Brasil', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['atualidades'] },
  { id: 'hum-8', titulo: 'Direitos Humanos', categoria: 'humanas', nivel: 'Basico', descricao: 'Constituicao e cidadania.', icone: '⚖️', cor: 'from-orange-500 to-red-500', modulos: [{ id: 'm1', titulo: 'Constituicao', concluido: false }, { id: 'm2', titulo: 'Direitos', concluido: false }, { id: 'm3', titulo: 'Cidadania', concluido: false }], progresso: 0, tempoEstimado: '3h', fpRecompensa: 150, tags: ['direitos'] },
  { id: 'nat-1', titulo: 'Mecanica', categoria: 'natureza', nivel: 'Intermediario', descricao: 'Cinematica e dinamica.', icone: '⚙️', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Cinematica', concluido: false }, { id: 'm2', titulo: 'Dinamica', concluido: false }, { id: 'm3', titulo: 'Energia', concluido: false }, { id: 'm4', titulo: 'Gravitacao', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['fisica', 'mecanica'] },
  { id: 'nat-2', titulo: 'Termodinamica e Ondas', categoria: 'natureza', nivel: 'Avancado', descricao: 'Calor, ondas e acustica.', icone: '🌡️', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Termometria', concluido: false }, { id: 'm2', titulo: 'Calorimetria', concluido: false }, { id: 'm3', titulo: 'Termodinamica', concluido: false }, { id: 'm4', titulo: 'Ondas', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['fisica', 'calor'] },
  { id: 'nat-3', titulo: 'Eletricidade', categoria: 'natureza', nivel: 'Avancado', descricao: 'Circuitos e eletromagnetismo.', icone: '⚡', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Eletrostatica', concluido: false }, { id: 'm2', titulo: 'Eletrodinamica', concluido: false }, { id: 'm3', titulo: 'Circuitos', concluido: false }, { id: 'm4', titulo: 'Eletromagnetismo', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['fisica', 'eletricidade'] },
  { id: 'nat-4', titulo: 'Quimica Geral', categoria: 'natureza', nivel: 'Basico', descricao: 'Atomos e tabela periodica.', icone: '⚗️', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Estrutura Atomica', concluido: false }, { id: 'm2', titulo: 'Tabela Periodica', concluido: false }, { id: 'm3', titulo: 'Ligacoes', concluido: false }, { id: 'm4', titulo: 'Funcoes Inorganicas', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['quimica', 'atomos'] },
  { id: 'nat-5', titulo: 'Quimica Organica', categoria: 'natureza', nivel: 'Avancado', descricao: 'Funcoes organicas e isomeria.', icone: '🧪', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Funcoes Organicas', concluido: false }, { id: 'm2', titulo: 'Isomeria', concluido: false }, { id: 'm3', titulo: 'Reacoes', concluido: false }, { id: 'm4', titulo: 'Polimeros', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['quimica', 'organica'] },
  { id: 'nat-6', titulo: 'Estequiometria', categoria: 'natureza', nivel: 'Intermediario', descricao: 'Calculos quimicos e solucoes.', icone: '🧮', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Mol e Massa', concluido: false }, { id: 'm2', titulo: 'Balanceamento', concluido: false }, { id: 'm3', titulo: 'Calculos', concluido: false }, { id: 'm4', titulo: 'Solucoes', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['quimica', 'calculos'] },
  { id: 'nat-7', titulo: 'Biologia Celular', categoria: 'natureza', nivel: 'Intermediario', descricao: 'Celulas e metabolismo.', icone: '🔬', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Citologia', concluido: false }, { id: 'm2', titulo: 'Metabolismo', concluido: false }, { id: 'm3', titulo: 'Divisao Celular', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['biologia', 'celula'] },
  { id: 'nat-8', titulo: 'Genetica', categoria: 'natureza', nivel: 'Avancado', descricao: 'DNA e hereditariedade.', icone: '🧬', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Leis de Mendel', concluido: false }, { id: 'm2', titulo: 'DNA e RNA', concluido: false }, { id: 'm3', titulo: 'Engenharia Genetica', concluido: false }, { id: 'm4', titulo: 'Evolucao', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['biologia', 'genetica'] },
  { id: 'nat-9', titulo: 'Ecologia', categoria: 'natureza', nivel: 'Intermediario', descricao: 'Ecossistemas e impactos.', icone: '🌿', cor: 'from-green-500 to-emerald-500', modulos: [{ id: 'm1', titulo: 'Ecossistemas', concluido: false }, { id: 'm2', titulo: 'Cadeias Alimentares', concluido: false }, { id: 'm3', titulo: 'Ciclos', concluido: false }, { id: 'm4', titulo: 'Impactos', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['biologia', 'ecologia'] },
  { id: 'mat-1', titulo: 'Algebra Basica', categoria: 'matematica', nivel: 'Basico', descricao: 'Equacoes e sistemas.', icone: '➕', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Equacoes 1o Grau', concluido: false }, { id: 'm2', titulo: 'Equacoes 2o Grau', concluido: false }, { id: 'm3', titulo: 'Inequacoes', concluido: false }, { id: 'm4', titulo: 'Sistemas', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['matematica', 'algebra'] },
  { id: 'mat-2', titulo: 'Funcoes', categoria: 'matematica', nivel: 'Intermediario', descricao: 'Funcoes e graficos.', icone: '📈', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Funcao Afim', concluido: false }, { id: 'm2', titulo: 'Funcao Quadratica', concluido: false }, { id: 'm3', titulo: 'Exponencial', concluido: false }, { id: 'm4', titulo: 'Logaritmica', concluido: false }], progresso: 0, tempoEstimado: '6h', fpRecompensa: 300, tags: ['matematica', 'funcoes'] },
  { id: 'mat-3', titulo: 'Geometria Plana', categoria: 'matematica', nivel: 'Intermediario', descricao: 'Areas e perimetros.', icone: '📐', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Triangulos', concluido: false }, { id: 'm2', titulo: 'Quadrilateros', concluido: false }, { id: 'm3', titulo: 'Circunferencia', concluido: false }, { id: 'm4', titulo: 'Poligonos', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['matematica', 'geometria'] },
  { id: 'mat-4', titulo: 'Geometria Espacial', categoria: 'matematica', nivel: 'Avancado', descricao: 'Volumes de solidos.', icone: '🔷', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Prismas', concluido: false }, { id: 'm2', titulo: 'Piramides', concluido: false }, { id: 'm3', titulo: 'Cilindros e Cones', concluido: false }, { id: 'm4', titulo: 'Esferas', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['matematica', 'volumes'] },
  { id: 'mat-5', titulo: 'Estatistica', categoria: 'matematica', nivel: 'Intermediario', descricao: 'Analise de dados.', icone: '📊', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Medidas Centrais', concluido: false }, { id: 'm2', titulo: 'Graficos', concluido: false }, { id: 'm3', titulo: 'Probabilidade', concluido: false }, { id: 'm4', titulo: 'Combinatoria', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['matematica', 'estatistica'] },
  { id: 'mat-6', titulo: 'Razao e Proporcao', categoria: 'matematica', nivel: 'Basico', descricao: 'Regra de tres e porcentagem.', icone: '⚖️', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Razao', concluido: false }, { id: 'm2', titulo: 'Regra de Tres', concluido: false }, { id: 'm3', titulo: 'Porcentagem', concluido: false }, { id: 'm4', titulo: 'Juros', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['matematica', 'proporcao'] },
  { id: 'mat-7', titulo: 'Trigonometria', categoria: 'matematica', nivel: 'Avancado', descricao: 'Relacoes trigonometricas.', icone: '📏', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Triangulo Retangulo', concluido: false }, { id: 'm2', titulo: 'Circulo Trigonometrico', concluido: false }, { id: 'm3', titulo: 'Funcoes Trigonometricas', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['matematica', 'trigonometria'] },
  { id: 'mat-8', titulo: 'Matematica Financeira', categoria: 'matematica', nivel: 'Intermediario', descricao: 'Juros e investimentos.', icone: '💰', cor: 'from-yellow-500 to-orange-500', modulos: [{ id: 'm1', titulo: 'Juros Simples', concluido: false }, { id: 'm2', titulo: 'Juros Compostos', concluido: false }, { id: 'm3', titulo: 'Descontos', concluido: false }], progresso: 0, tempoEstimado: '3h', fpRecompensa: 150, tags: ['matematica', 'financeira'] },
  { id: 'red-1', titulo: 'Estrutura da Redacao', categoria: 'redacao', nivel: 'Basico', descricao: 'Introducao, desenvolvimento e conclusao.', icone: '✍️', cor: 'from-pink-500 to-rose-500', modulos: [{ id: 'm1', titulo: 'Introducao', concluido: false }, { id: 'm2', titulo: 'Desenvolvimento', concluido: false }, { id: 'm3', titulo: 'Conclusao', concluido: false }, { id: 'm4', titulo: 'Proposta', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['redacao', 'estrutura'] },
  { id: 'red-2', titulo: 'Competencias ENEM', categoria: 'redacao', nivel: 'Intermediario', descricao: 'As 5 competencias avaliadas.', icone: '🎯', cor: 'from-pink-500 to-rose-500', modulos: [{ id: 'm1', titulo: 'Norma Culta', concluido: false }, { id: 'm2', titulo: 'Tema', concluido: false }, { id: 'm3', titulo: 'Argumentacao', concluido: false }, { id: 'm4', titulo: 'Coesao', concluido: false }, { id: 'm5', titulo: 'Proposta', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['redacao', 'competencias'] },
  { id: 'red-3', titulo: 'Repertorio Sociocultural', categoria: 'redacao', nivel: 'Avancado', descricao: 'Construa seu repertorio.', icone: '📚', cor: 'from-pink-500 to-rose-500', modulos: [{ id: 'm1', titulo: 'Citacoes', concluido: false }, { id: 'm2', titulo: 'Dados', concluido: false }, { id: 'm3', titulo: 'Filmes', concluido: false }, { id: 'm4', titulo: 'Fatos Historicos', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['redacao', 'repertorio'] },
  { id: 'red-4', titulo: 'Temas Frequentes', categoria: 'redacao', nivel: 'Intermediario', descricao: 'Temas que mais caem.', icone: '💡', cor: 'from-pink-500 to-rose-500', modulos: [{ id: 'm1', titulo: 'Meio Ambiente', concluido: false }, { id: 'm2', titulo: 'Tecnologia', concluido: false }, { id: 'm3', titulo: 'Saude', concluido: false }, { id: 'm4', titulo: 'Educacao', concluido: false }], progresso: 0, tempoEstimado: '5h', fpRecompensa: 250, tags: ['redacao', 'temas'] },
  { id: 'red-5', titulo: 'Conectivos e Coesao', categoria: 'redacao', nivel: 'Basico', descricao: 'Use conectivos corretamente.', icone: '🔗', cor: 'from-pink-500 to-rose-500', modulos: [{ id: 'm1', titulo: 'Adicao', concluido: false }, { id: 'm2', titulo: 'Oposicao', concluido: false }, { id: 'm3', titulo: 'Conclusao', concluido: false }, { id: 'm4', titulo: 'Coesao Referencial', concluido: false }], progresso: 0, tempoEstimado: '3h', fpRecompensa: 150, tags: ['redacao', 'conectivos'] },
  { id: 'inter-1', titulo: 'Energia e Sustentabilidade', categoria: 'interdisciplinar', nivel: 'Intermediario', descricao: 'Tema interdisciplinar.', icone: '🌱', cor: 'from-violet-500 to-purple-500', modulos: [{ id: 'm1', titulo: 'Fontes de Energia', concluido: false }, { id: 'm2', titulo: 'Impacto Ambiental', concluido: false }, { id: 'm3', titulo: 'Energia Renovavel', concluido: false }, { id: 'm4', titulo: 'Politicas', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['interdisciplinar', 'energia'] },
  { id: 'inter-2', titulo: 'Saude e Sociedade', categoria: 'interdisciplinar', nivel: 'Intermediario', descricao: 'Biologia e sociologia.', icone: '🏥', cor: 'from-violet-500 to-purple-500', modulos: [{ id: 'm1', titulo: 'Sistema de Saude', concluido: false }, { id: 'm2', titulo: 'Doencas', concluido: false }, { id: 'm3', titulo: 'Saude Mental', concluido: false }, { id: 'm4', titulo: 'Vacinacao', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['interdisciplinar', 'saude'] },
  { id: 'inter-3', titulo: 'Tecnologia e Etica', categoria: 'interdisciplinar', nivel: 'Avancado', descricao: 'Filosofia e tecnologia.', icone: '🤖', cor: 'from-violet-500 to-purple-500', modulos: [{ id: 'm1', titulo: 'Inteligencia Artificial', concluido: false }, { id: 'm2', titulo: 'Privacidade', concluido: false }, { id: 'm3', titulo: 'Redes Sociais', concluido: false }, { id: 'm4', titulo: 'Etica', concluido: false }], progresso: 0, tempoEstimado: '4h', fpRecompensa: 200, tags: ['interdisciplinar', 'tecnologia'] },
];

export default function BibliotecaPage() {
  const router = useRouter();
  const [cadernos, setCadernos] = useState<Caderno[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [nivelAtivo, setNivelAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [cadernoSelecionado, setCadernoSelecionado] = useState<Caderno | null>(null);

  useEffect(() => {
    carregarCadernos();
  }, []);

  const carregarCadernos = () => {
    const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
    const cadernosComProgresso = CADERNOS_DATA.map(caderno => {
      const progressoSalvo = progressoLocal[caderno.id];
      if (progressoSalvo) {
        const modulosAtualizados = caderno.modulos.map((mod, idx) => ({
          ...mod,
          concluido: progressoSalvo.modulos?.[idx] || false,
        }));
        const progresso = Math.round((modulosAtualizados.filter(m => m.concluido).length / modulosAtualizados.length) * 100);
        return { ...caderno, modulos: modulosAtualizados, progresso };
      }
      return caderno;
    });
    setCadernos(cadernosComProgresso);
    setLoading(false);
  };

  const toggleModulo = (cadernoId: string, moduloIdx: number) => {
    const novosCadernos = cadernos.map(caderno => {
      if (caderno.id === cadernoId) {
        const novosModulos = caderno.modulos.map((mod, idx) =>
          idx === moduloIdx ? { ...mod, concluido: !mod.concluido } : mod
        );
        const progresso = Math.round((novosModulos.filter(m => m.concluido).length / novosModulos.length) * 100);
        return { ...caderno, modulos: novosModulos, progresso };
      }
      return caderno;
    });
    setCadernos(novosCadernos);
    const progressoLocal = JSON.parse(localStorage.getItem('cadernos_progresso') || '{}');
    const cadernoAtualizado = novosCadernos.find(c => c.id === cadernoId);
    if (cadernoAtualizado) {
      progressoLocal[cadernoId] = { modulos: cadernoAtualizado.modulos.map(m => m.concluido) };
      localStorage.setItem('cadernos_progresso', JSON.stringify(progressoLocal));
    }
    if (cadernoSelecionado?.id === cadernoId) {
      setCadernoSelecionado(novosCadernos.find(c => c.id === cadernoId) || null);
    }
  };

  const cadernosFiltrados = cadernos.filter(caderno => {
    const matchCategoria = categoriaAtiva === 'todos' || caderno.categoria === categoriaAtiva;
    const matchNivel = nivelAtivo === 'todos' || caderno.nivel === nivelAtivo;
    const matchBusca = busca === '' || caderno.titulo.toLowerCase().includes(busca.toLowerCase()) || caderno.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    return matchCategoria && matchNivel && matchBusca;
  });

  const totalProgresso = cadernos.length > 0 ? Math.round(cadernos.reduce((acc, c) => acc + c.progresso, 0) / cadernos.length) : 0;

  const getNivelBadge = (nivel: string) => {
    switch (nivel) {
      case 'Basico': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediario': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Avancado': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-white/10 text-white/70';
    }
  };

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando cadernos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">📚 Cadernos Inteligentes ENEM-IA</h1>
        <p className="subtitle-ia mb-4">41 cadernos organizados por area com conteudo 100% original</p>
        <div className="card-ia-sm bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 inline-flex items-center gap-2">
          <span className="text-green-400">✓</span>
          <span className="text-white/90 text-sm">Todo conteudo e 100% original e exclusivo ENEM-IA</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia"><span className="stat-ia-value">{cadernos.length}</span><span className="stat-ia-label">Cadernos</span></div>
        <div className="stat-ia"><span className="stat-ia-value">{cadernos.reduce((acc, c) => acc + c.modulos.length, 0)}</span><span className="stat-ia-label">Modulos</span></div>
        <div className="stat-ia"><span className="stat-ia-value text-yellow-300">{totalProgresso}%</span><span className="stat-ia-label">Progresso</span></div>
        <div className="stat-ia"><span className="stat-ia-value text-green-400">{cadernos.filter(c => c.progresso === 100).length}</span><span className="stat-ia-label">Concluidos</span></div>
      </div>

      <div className="card-ia mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold">Progresso Geral</span>
          <span className="text-yellow-300 font-bold">{totalProgresso}%</span>
        </div>
        <div className="progress-ia"><div className="progress-ia-bar" style={{ width: `${totalProgresso}%` }}></div></div>
      </div>

      <div className="card-ia mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="🔍 Buscar caderno ou tema..." className="input-ia w-full" />
          </div>
          <div>
            <p className="text-white/60 text-sm mb-2">Categoria:</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} onClick={() => setCategoriaAtiva(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${categoriaAtiva === cat.id ? `bg-gradient-to-r ${cat.cor} text-white` : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                  <span>{cat.emoji}</span><span>{cat.nome}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-2">Nivel:</p>
            <div className="flex gap-2">
              {['todos', 'Basico', 'Intermediario', 'Avancado'].map((nivel) => (
                <button key={nivel} onClick={() => setNivelAtivo(nivel)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${nivelAtivo === nivel ? 'bg-yellow-400 text-slate-900' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                  {nivel === 'todos' ? 'Todos' : nivel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {cadernosFiltrados.length === 0 ? (
        <div className="card-ia text-center py-12">
          <div className="text-8xl mb-6">📚</div>
          <h3 className="text-white text-xl font-bold mb-3">Nenhum caderno encontrado</h3>
          <p className="text-white/70">Tente ajustar seus filtros de busca.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cadernosFiltrados.map((caderno) => (
            <div key={caderno.id} onClick={() => setCadernoSelecionado(caderno)} className="card-ia hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                <div className={`h-full bg-gradient-to-r ${caderno.cor} transition-all`} style={{ width: `${caderno.progresso}%` }}></div>
              </div>
              <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold border ${getNivelBadge(caderno.nivel)}`}>
                {caderno.nivel}
              </div>
              <div className="text-center mb-4 pt-2">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${caderno.cor} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition`}>
                  {caderno.icone}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-white font-bold mb-2 line-clamp-2">{caderno.titulo}</h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-3">{caderno.descricao}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                <span>{caderno.modulos.length} modulos</span>
                <span>{caderno.tempoEstimado}</span>
                <span className="text-yellow-300">+{caderno.fpRecompensa} FP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${caderno.cor}`} style={{ width: `${caderno.progresso}%` }}></div>
                </div>
                <span className="text-white/70 text-sm font-bold">{caderno.progresso}%</span>
              </div>
              <button className="btn-ia w-full mt-4">
                {caderno.progresso === 0 ? 'Comecar' : caderno.progresso === 100 ? 'Revisar' : 'Continuar'}
              </button>
            </div>
          ))}
        </div>
      )}

      {cadernoSelecionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setCadernoSelecionado(null)}>
          <div className="card-ia max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${cadernoSelecionado.cor} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                {cadernoSelecionado.icone}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{cadernoSelecionado.titulo}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getNivelBadge(cadernoSelecionado.nivel)}`}>
                    {cadernoSelecionado.nivel}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{cadernoSelecionado.descricao}</p>
              </div>
              <button onClick={() => setCadernoSelecionado(null)} className="text-white/50 hover:text-white text-2xl">×</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-white font-bold">{cadernoSelecionado.modulos.length}</p>
                <p className="text-white/50 text-xs">Modulos</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-white font-bold">{cadernoSelecionado.tempoEstimado}</p>
                <p className="text-white/50 text-xs">Tempo</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-yellow-300 font-bold">+{cadernoSelecionado.fpRecompensa}</p>
                <p className="text-white/50 text-xs">FP</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Progresso do Caderno</span>
                <span className="text-yellow-300 font-bold">{cadernoSelecionado.progresso}%</span>
              </div>
              <div className="progress-ia"><div className="progress-ia-bar" style={{ width: `${cadernoSelecionado.progresso}%` }}></div></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold mb-3">Indice de Modulos</h3>
              {cadernoSelecionado.modulos.map((modulo, idx) => (
                <div key={modulo.id} onClick={() => toggleModulo(cadernoSelecionado.id, idx)} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${modulo.concluido ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${modulo.concluido ? 'bg-green-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    {modulo.concluido ? '✓' : idx + 1}
                  </div>
                  <span className={modulo.concluido ? 'text-green-300' : 'text-white'}>{modulo.titulo}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {cadernoSelecionado.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60">#{tag}</span>
                ))}
              </div>
            </div>
            <button className="btn-ia w-full mt-6 py-4 text-lg">
              {cadernoSelecionado.progresso === 0 ? '🚀 Comecar a Estudar' : cadernoSelecionado.progresso === 100 ? '🔄 Revisar Caderno' : '▶️ Continuar Estudando'}
            </button>
          </div>
        </div>
      )}

      <ChalkBackToTop />
    </div>
  );
}
