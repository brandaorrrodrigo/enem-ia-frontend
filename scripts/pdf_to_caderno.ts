#!/usr/bin/env npx tsx
/**
 * Script para converter PDF em JSON de caderno ENEM PRO
 *
 * Uso: npx tsx scripts/pdf_to_caderno.ts <caminho-pdf> <categoria> <slug>
 *
 * Exemplo: npx tsx scripts/pdf_to_caderno.ts ./pdfs/funcoes.pdf matematica funcoes
 *
 * Requisitos:
 * - poppler instalado (pdftotext)
 * - Node.js 18+
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface CadernoQuestao {
  id: string;
  enunciado: string;
  alternativas: { A: string; B: string; C: string; D: string; E: string };
  correta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  tags?: string[];
}

interface CadernoModulo {
  id: string;
  titulo: string;
  resumo: string;
  topicos: string[];
  exemplos?: string[];
  dicas?: string[];
  formula?: string;
  html?: string;
  questoes?: CadernoQuestao[];
}

interface CadernoData {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  nivel: 'Basico' | 'Intermediario' | 'Avancado';
  descricao: string;
  icone: string;
  cor: string;
  tempoEstimado: string;
  fpRecompensa: number;
  tags: string[];
  modulos: CadernoModulo[];
}

const CATEGORIA_CONFIG: Record<string, { icone: string; cor: string }> = {
  linguagens: { icone: '📖', cor: 'from-blue-500 to-cyan-500' },
  humanas: { icone: '🌍', cor: 'from-orange-500 to-red-500' },
  natureza: { icone: '🔬', cor: 'from-green-500 to-emerald-500' },
  matematica: { icone: '📐', cor: 'from-yellow-500 to-orange-500' },
  redacao: { icone: '✍️', cor: 'from-pink-500 to-rose-500' },
};

// Caminho do pdftotext (ajuste conforme seu sistema)
const PDFTOTEXT_PATH = process.env.PDFTOTEXT_PATH || 'D:/NutriFitcoach/poppler/poppler-25.07.0/Library/bin/pdftotext.exe';

function extractTextFromPDF(pdfPath: string): string {
  const outputPath = pdfPath.replace('.pdf', '.txt');

  try {
    execSync(`"${PDFTOTEXT_PATH}" -layout "${pdfPath}" "${outputPath}"`, { encoding: 'utf-8' });
    const text = fs.readFileSync(outputPath, 'utf-8');
    fs.unlinkSync(outputPath); // Remove arquivo temporario
    return text;
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);
    throw error;
  }
}

function parseTextToModulos(text: string): CadernoModulo[] {
  const modulos: CadernoModulo[] = [];

  // Divide por secoes (detecta padroes como "1.", "CAPITULO", "MODULO", etc.)
  const sections = text.split(/(?=^\s*(?:\d+\.|CAPITULO|MODULO|SECAO|TOPICO)\s+)/im);

  let moduloIndex = 1;

  for (const section of sections) {
    if (section.trim().length < 50) continue; // Ignora secoes muito curtas

    const lines = section.trim().split('\\n').filter(l => l.trim());
    if (lines.length < 2) continue;

    const titulo = lines[0].replace(/^\d+\.\s*/, '').replace(/^(CAPITULO|MODULO|SECAO|TOPICO)\s*\d*:?\s*/i, '').trim();
    const conteudo = lines.slice(1).join(' ');

    // Extrai topicos (linhas que comecam com -, •, *, ou numeros)
    const topicos: string[] = [];
    const topicoRegex = /^[\-•\*]\s*(.+)$|^\d+\)\s*(.+)$/gm;
    let match;
    while ((match = topicoRegex.exec(conteudo)) !== null) {
      topicos.push((match[1] || match[2]).trim());
    }

    // Se nao encontrou topicos formatados, cria do conteudo
    if (topicos.length === 0) {
      const sentences = conteudo.split(/[.!?]+/).filter(s => s.trim().length > 20);
      topicos.push(...sentences.slice(0, 5).map(s => s.trim()));
    }

    const modulo: CadernoModulo = {
      id: `m${moduloIndex}`,
      titulo: titulo || `Modulo ${moduloIndex}`,
      resumo: conteudo.substring(0, 200) + '...',
      topicos: topicos.slice(0, 6),
    };

    // Detecta formulas (texto entre $ ou com simbolos matematicos)
    const formulaMatch = conteudo.match(/\$([^$]+)\$|[a-z]\s*=\s*[^,.\n]+/i);
    if (formulaMatch) {
      modulo.formula = formulaMatch[0].replace(/\$/g, '');
    }

    // Detecta exemplos (linhas apos "Exemplo:", "Ex:", etc.)
    const exemploMatch = conteudo.match(/(?:exemplo|ex\.?):\s*(.+?)(?=(?:exemplo|ex\.?|$))/gi);
    if (exemploMatch) {
      modulo.exemplos = exemploMatch.map(e => e.replace(/^(?:exemplo|ex\.?):\s*/i, '').trim()).slice(0, 3);
    }

    modulos.push(modulo);
    moduloIndex++;

    if (modulos.length >= 10) break; // Limita a 10 modulos
  }

  return modulos.length > 0 ? modulos : [{
    id: 'm1',
    titulo: 'Conteudo Principal',
    resumo: text.substring(0, 200) + '...',
    topicos: text.split(/[.!?]+/).filter(s => s.trim().length > 20).slice(0, 5).map(s => s.trim()),
  }];
}

function createCadernoFromPDF(pdfPath: string, categoria: string, slug: string): CadernoData {
  console.log(`Processando PDF: ${pdfPath}`);

  const text = extractTextFromPDF(pdfPath);
  const modulos = parseTextToModulos(text);

  const config = CATEGORIA_CONFIG[categoria] || CATEGORIA_CONFIG.linguagens;

  // Extrai titulo do nome do arquivo ou primeira linha
  const fileName = path.basename(pdfPath, '.pdf');
  const primeiraLinha = text.split('\\n')[0]?.trim() || fileName;
  const titulo = primeiraLinha.length > 50 ? fileName : primeiraLinha;

  const caderno: CadernoData = {
    id: `${categoria.substring(0, 3)}-${Date.now() % 1000}`,
    slug,
    titulo: titulo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    categoria,
    nivel: 'Basico',
    descricao: `Conteudo sobre ${titulo} para o ENEM.`,
    icone: config.icone,
    cor: config.cor,
    tempoEstimado: `${Math.max(1, Math.round(modulos.length * 0.5))}h`,
    fpRecompensa: modulos.length * 50,
    tags: [categoria, slug, 'enem', 'estudo'],
    modulos,
  };

  return caderno;
}

function saveCaderno(caderno: CadernoData): string {
  const outputDir = path.join(process.cwd(), 'data', 'cadernos', caderno.categoria);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${caderno.slug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(caderno, null, 2), 'utf-8');

  console.log(`Caderno salvo em: ${outputPath}`);
  return outputPath;
}

// Main
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║           PDF to Caderno - ENEM PRO Converter                  ║
╠════════════════════════════════════════════════════════════════╣
║ Uso: npx tsx scripts/pdf_to_caderno.ts <pdf> <categoria> <slug>║
║                                                                ║
║ Categorias: linguagens, humanas, natureza, matematica, redacao ║
║                                                                ║
║ Exemplo:                                                       ║
║   npx tsx scripts/pdf_to_caderno.ts ./docs/calc.pdf mat calc1  ║
╚════════════════════════════════════════════════════════════════╝
  `);
  process.exit(1);
}

const [pdfPath, categoria, slug] = args;

if (!fs.existsSync(pdfPath)) {
  console.error(`Erro: Arquivo nao encontrado: ${pdfPath}`);
  process.exit(1);
}

if (!CATEGORIA_CONFIG[categoria]) {
  console.error(`Erro: Categoria invalida: ${categoria}`);
  console.log('Categorias validas:', Object.keys(CATEGORIA_CONFIG).join(', '));
  process.exit(1);
}

try {
  const caderno = createCadernoFromPDF(pdfPath, categoria, slug);
  const outputPath = saveCaderno(caderno);

  console.log(`
✅ Caderno criado com sucesso!
   - Titulo: ${caderno.titulo}
   - Modulos: ${caderno.modulos.length}
   - Arquivo: ${outputPath}

📝 Revise o arquivo JSON e adicione:
   - Questoes de pratica
   - Dicas para o ENEM
   - Exemplos adicionais
  `);
} catch (error) {
  console.error('Erro ao processar PDF:', error);
  process.exit(1);
}
