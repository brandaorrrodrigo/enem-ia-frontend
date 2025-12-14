/**
 * Script para converter arquivos TXT em páginas da biblioteca
 * Padrão: Tailwind CSS (como Inglês/Espanhol)
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de disciplinas
const DISCIPLINAS = {
  'HISTÓRIA': 'historia',
  'GEOGRAFIA': 'geografia',
  'SOCIOLOGIA': 'sociologia',
  'FILOSOFIA': 'filosofia',
  'LÍNGUA INGLESA (ENEM)': 'ingles',
  'LÍNGUA ESPANHOLA (ENEM)': 'espanhol',
  'ARTES (ENEM)': 'artes'
};

// Cores por disciplina (gradientes)
const CORES = {
  'historia': { primary: '#dc2626', gradient: 'from-red-900 to-red-700' },
  'geografia': { primary: '#059669', gradient: 'from-green-900 to-green-700' },
  'sociologia': { primary: '#7c3aed', gradient: 'from-purple-900 to-purple-700' },
  'filosofia': { primary: '#0891b2', gradient: 'from-cyan-900 to-cyan-700' },
  'ingles': { primary: '#2563eb', gradient: 'from-blue-900 to-blue-700' },
  'espanhol': { primary: '#dc2626', gradient: 'from-red-900 to-red-700' },
  'artes': { primary: '#d946ef', gradient: 'from-fuchsia-900 to-fuchsia-700' }
};

// Função para criar slug a partir do título
function criarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

// Função para parsear um tema do arquivo TXT
function parsearTema(textoTema) {
  const linhas = textoTema.split('\n');

  // Extrair título (linha que começa com TEMA)
  const linhaTitulo = linhas.find(l => l.startsWith('TEMA'));
  if (!linhaTitulo) return null;

  const titulo = linhaTitulo.replace(/^TEMA \d+ — /, '').trim();
  const slug = criarSlug(titulo);

  // Extrair seções
  const tema = {
    titulo,
    slug,
    visaoGeral: '',
    topicosChave: [],
    explicacao: '',
    exemploEnem: '',
    questoes: [],
    mapaMental: '',
    resumo: ''
  };

  let secaoAtual = '';
  let bufferQuestao = '';

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (linha.startsWith('1. VISÃO GERAL')) {
      secaoAtual = 'visaoGeral';
      continue;
    } else if (linha.startsWith('2. TÓPICOS-CHAVE')) {
      secaoAtual = 'topicosChave';
      continue;
    } else if (linha.startsWith('3. EXPLICAÇÃO')) {
      secaoAtual = 'explicacao';
      continue;
    } else if (linha.startsWith('4. EXEMPLO ENEM')) {
      secaoAtual = 'exemploEnem';
      continue;
    } else if (linha.startsWith('5. QUESTÕES') || linha.startsWith('5. QUESTÃO')) {
      secaoAtual = 'questoes';
      continue;
    } else if (linha.startsWith('6. MINI MAPA MENTAL')) {
      secaoAtual = 'mapaMental';
      continue;
    } else if (linha.startsWith('7. RESUMO')) {
      secaoAtual = 'resumo';
      continue;
    } else if (linha.startsWith('────') || linha.startsWith('TEMA')) {
      continue;
    }

    // Processar conteúdo de cada seção
    if (secaoAtual === 'visaoGeral' && linha) {
      tema.visaoGeral += linha + ' ';
    } else if (secaoAtual === 'topicosChave' && linha.startsWith('-')) {
      tema.topicosChave.push(linha.replace(/^-\s*/, ''));
    } else if (secaoAtual === 'explicacao' && linha) {
      tema.explicacao += linha + ' ';
    } else if (secaoAtual === 'exemploEnem' && linha) {
      tema.exemploEnem += linha + ' ';
    } else if (secaoAtual === 'questoes' && linha) {
      if (linha.match(/^\d+\)/)) {
        if (bufferQuestao) {
          tema.questoes.push(bufferQuestao.trim());
        }
        bufferQuestao = linha + '\n';
      } else if (linha.startsWith('Gabarito:')) {
        bufferQuestao += linha + '\n';
        tema.questoes.push(bufferQuestao.trim());
        bufferQuestao = '';
      } else {
        bufferQuestao += linha + '\n';
      }
    } else if (secaoAtual === 'mapaMental' && linha) {
      tema.mapaMental += linha + '\n';
    } else if (secaoAtual === 'resumo' && linha) {
      tema.resumo += linha + ' ';
    }
  }

  return tema;
}

// Função para gerar o código TSX da página
function gerarPaginaTSX(tema, disciplina) {
  const cores = CORES[disciplina];

  // Processar questões
  const questoesFormatadas = tema.questoes.map(q => {
    const linhas = q.split('\n').filter(l => l.trim());
    const enunciado = linhas[0];
    const alternativas = linhas.filter(l => l.match(/^[A-D]\)/));
    const gabarito = linhas.find(l => l.startsWith('Gabarito:'));
    const respostaCorreta = gabarito ? gabarito.match(/[A-D]/)[0] : 'A';

    return {
      enunciado: enunciado.replace(/^\d+\)\s*/, ''),
      alternativas: alternativas.map(alt => alt.replace(/^[A-D]\)\s*/, '')),
      respostaCorreta: ['A', 'B', 'C', 'D'].indexOf(respostaCorreta)
    };
  });

  const template = `'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, CheckCircle2, Brain, Target } from 'lucide-react'
import MicroQuiz from '@/components/MicroQuiz'

export default function ${tema.slug.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')}Page() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(progress)

      // Mostrar quiz quando rolar 80% da página
      if (progress > 80 && !showQuiz) {
        setShowQuiz(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showQuiz])

  const questoes = ${JSON.stringify(questoesFormatadas, null, 2)}

  return (
    <div className="min-h-screen bg-gradient-to-br ${cores.gradient} text-white">
      {/* Barra de progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
          style={{ width: \`\${scrollProgress}%\` }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/enem/biblioteca"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar para Biblioteca</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <BookOpen className="w-4 h-4" />
              <span>{Math.round(scrollProgress)}% concluído</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            ${tema.titulo}
          </h1>
          <div className="flex items-center gap-2 text-white/60">
            <Target className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Biblioteca ENEM PRO</span>
          </div>
        </div>

        {/* Visão Geral */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-${cores.primary}/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-${cores.primary}" style={{ color: '${cores.primary}' }} />
              </div>
              <h2 className="text-2xl font-bold">Visão Geral</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-lg">
              ${tema.visaoGeral.trim()}
            </p>
          </div>
        </section>

        {/* Tópicos-Chave */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Tópicos-Chave</h2>
            </div>
            <ul className="space-y-3">
              ${tema.topicosChave.map(topico => `<li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-white/80 text-lg">${topico}</span>
              </li>`).join('\n              ')}
            </ul>
          </div>
        </section>

        {/* Explicação */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Explicação Detalhada</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              ${tema.explicacao.trim()}
            </p>
          </div>
        </section>

        {/* Exemplo ENEM */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold">Exemplo ENEM</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">
              ${tema.exemploEnem.trim()}
            </p>
          </div>
        </section>

        {/* Questões de Fixação */}
        {questoes.length > 0 && (
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Questões de Fixação</h2>
              </div>
              <div className="space-y-6">
                {questoes.map((q, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-6">
                    <p className="font-semibold mb-4 text-lg">{idx + 1}. {q.enunciado}</p>
                    <div className="space-y-2">
                      {q.alternativas.map((alt, altIdx) => (
                        <div key={altIdx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <span className="font-medium text-${cores.primary}" style={{ color: '${cores.primary}' }}>
                            {String.fromCharCode(65 + altIdx)})
                          </span>
                          <span className="text-white/80">{alt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mapa Mental */}
        ${tema.mapaMental ? `<section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Mapa Mental</h2>
            <pre className="text-white/80 font-mono text-sm leading-relaxed whitespace-pre-wrap">
${tema.mapaMental.trim()}
            </pre>
          </div>
        </section>` : ''}

        {/* Resumo */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Resumo</h2>
            <p className="text-white/90 leading-relaxed text-lg">
              ${tema.resumo.trim()}
            </p>
          </div>
        </section>

        {/* MicroQuiz */}
        {showQuiz && (
          <section className="mb-12">
            <MicroQuiz
              moduloSlug="${disciplina}_${tema.slug}"
              questoes={questoes}
            />
          </section>
        )}
      </main>
    </div>
  )
}
`;

  return template;
}

// Função principal
async function processar() {
  const pastaOrigem = 'C:\\\\Users\\\\NFC\\\\Documents\\\\materias para biblioteca';
  const pastaDestino = 'D:\\\\enem-ia\\\\enem-pro\\\\app\\\\enem\\\\biblioteca';

  console.log('🚀 Iniciando conversão de TXT para TSX...\n');

  // Ler todos os arquivos TXT
  const arquivos = fs.readdirSync(pastaOrigem).filter(f => f.endsWith('.txt'));

  let totalTemas = 0;
  let totalGerados = 0;

  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(pastaOrigem, arquivo);
    const conteudo = fs.readFileSync(caminhoCompleto, 'utf8');

    // Extrair disciplina
    const matchDisciplina = conteudo.match(/BLOCO \d+ — (.+)/);
    if (!matchDisciplina) {
      console.log(`⚠️  Pulando ${arquivo} - disciplina não encontrada`);
      continue;
    }

    const disciplinaNome = matchDisciplina[1].trim();
    const disciplinaSlug = DISCIPLINAS[disciplinaNome];

    if (!disciplinaSlug) {
      console.log(`⚠️  Disciplina "${disciplinaNome}" não mapeada`);
      continue;
    }

    console.log(`\n📚 Processando: ${disciplinaNome} (${arquivo})`);

    // Dividir em temas - procurar pelo separador
    const separador = '────────────────────────────────';
    const blocos = conteudo.split(separador).filter(b => b.trim());

    for (const textoTema of blocos) {
      if (!textoTema.includes('TEMA ')) continue;

      const tema = parsearTema(textoTema);
      if (!tema) continue;

      totalTemas++;

      // Gerar TSX
      const tsx = gerarPaginaTSX(tema, disciplinaSlug);

      // Criar pasta se não existir
      const pastaDisciplina = path.join(pastaDestino, disciplinaSlug);
      const pastaModulo = path.join(pastaDisciplina, tema.slug);

      if (!fs.existsSync(pastaDisciplina)) {
        fs.mkdirSync(pastaDisciplina, { recursive: true });
      }

      if (!fs.existsSync(pastaModulo)) {
        fs.mkdirSync(pastaModulo, { recursive: true });
      }

      // Salvar arquivo
      const caminhoPage = path.join(pastaModulo, 'page.tsx');
      fs.writeFileSync(caminhoPage, tsx, 'utf8');

      totalGerados++;
      console.log(`  ✅ ${tema.titulo} → ${disciplinaSlug}/${tema.slug}/page.tsx`);
    }
  }

  console.log(`\n\n🎉 Conversão concluída!`);
  console.log(`📊 Total de temas processados: ${totalTemas}`);
  console.log(`📄 Total de páginas geradas: ${totalGerados}`);
}

// Executar
processar().catch(console.error);
