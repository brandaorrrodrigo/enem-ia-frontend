import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Critérios de avaliação das 5 competências ENEM
interface Competencia {
  nota: number;
  nivel: string;
  feedback: string;
  pontosFortes: string[];
  pontosMelhorar: string[];
}

interface AvaliacaoCompleta {
  competencia1: Competencia;
  competencia2: Competencia;
  competencia3: Competencia;
  competencia4: Competencia;
  competencia5: Competencia;
  notaFinal: number;
  feedbackGeral: string;
  tempoCorrecao: string;
}

// Função para analisar Competência 1: Domínio da norma culta
function avaliarCompetencia1(texto: string): Competencia {
  const linhas = texto.split('\n').length;
  const palavras = texto.trim().split(/\s+/).length;

  // Análise simplificada de erros comuns
  const errosGraves = [
    { regex: /\b(mais|mas)\b/gi, tipo: 'mas/mais' },
    { regex: /\b(a|há)\s+(muito|pouco)/gi, tipo: 'a/há' },
    { regex: /\b(onde|aonde)\b/gi, tipo: 'onde/aonde' }
  ];

  let desvios = 0;
  errosGraves.forEach(erro => {
    const matches = texto.match(erro.regex);
    if (matches) desvios += matches.length;
  });

  // Pontuação baseada em desvios
  let nota = 200;
  if (desvios > 0 && desvios <= 2) nota = 160;
  else if (desvios > 2 && desvios <= 5) nota = 120;
  else if (desvios > 5 && desvios <= 8) nota = 80;
  else if (desvios > 8) nota = 40;

  const niveis: { [key: number]: string } = {
    200: 'Excelente',
    160: 'Bom',
    120: 'Mediano',
    80: 'Insuficiente',
    40: 'Precário'
  };

  return {
    nota,
    nivel: niveis[nota],
    feedback: nota === 200
      ? 'Demonstra excelente domínio da norma culta da língua portuguesa, com poucos ou nenhum desvio gramatical.'
      : `Apresenta ${desvios} possível(is) desvio(s) gramatical(is). Revise concordância, regência e ortografia.`,
    pontosFortes: nota >= 160
      ? ['Boa estruturação frasal', 'Uso adequado de conectivos', 'Pontuação correta']
      : ['Compreensão básica da norma culta'],
    pontosMelhorar: nota < 160
      ? ['Revisar concordância verbal e nominal', 'Atenção à ortografia', 'Pontuação adequada']
      : ['Pequenos ajustes em regência verbal']
  };
}

// Função para analisar Competência 2: Compreender o tema
function avaliarCompetencia2(texto: string, tema: string): Competencia {
  const palavrasTema = tema.toLowerCase().split(' ');
  const textoLower = texto.toLowerCase();

  // Verificar menção ao tema
  let mencoesTema = 0;
  palavrasTema.forEach(palavra => {
    if (palavra.length > 4 && textoLower.includes(palavra)) {
      mencoesTema++;
    }
  });

  const paragrafos = texto.split('\n\n').filter(p => p.trim().length > 0);
  const temIntroducao = paragrafos.length > 0 && paragrafos[0].length > 100;
  const temDesenvolvimento = paragrafos.length >= 3;
  const temConclusao = paragrafos.length > 0 && paragrafos[paragrafos.length - 1].length > 50;

  let nota = 80; // Base
  if (mencoesTema >= 3) nota += 40;
  if (temIntroducao) nota += 20;
  if (temDesenvolvimento) nota += 40;
  if (temConclusao) nota += 20;

  nota = Math.min(nota, 200);

  return {
    nota,
    nivel: nota >= 160 ? 'Excelente' : nota >= 120 ? 'Bom' : 'Mediano',
    feedback: nota >= 160
      ? 'Desenvolve muito bem o tema, apresentando argumentação consistente e repertório sociocultural produtivo.'
      : 'O tema foi abordado, mas é possível aprofundar a argumentação e trazer mais exemplos concretos.',
    pontosFortes: [
      mencoesTema >= 3 ? 'Abordagem direta do tema' : 'Tema mencionado',
      temDesenvolvimento ? 'Boa estruturação em parágrafos' : 'Organização básica'
    ],
    pontosMelhorar: [
      nota < 160 ? 'Aprofundar argumentos sobre o tema' : 'Expandir repertório',
      'Trazer dados, citações ou exemplos históricos',
      'Relacionar melhor as ideias com o tema central'
    ]
  };
}

// Função para analisar Competência 3: Seleção e organização de argumentos
function avaliarCompetencia3(texto: string): Competencia {
  const paragrafos = texto.split('\n\n').filter(p => p.trim().length > 50);
  const temEstrutura = paragrafos.length >= 4;

  // Verificar conectivos argumentativos
  const conectivos = [
    'portanto', 'assim', 'dessa forma', 'por isso', 'consequentemente',
    'além disso', 'ademais', 'outrossim', 'também',
    'entretanto', 'porém', 'todavia', 'contudo', 'no entanto'
  ];

  let usosConectivos = 0;
  conectivos.forEach(conec => {
    if (texto.toLowerCase().includes(conec)) usosConectivos++;
  });

  let nota = 100;
  if (temEstrutura) nota += 50;
  if (usosConectivos >= 3) nota += 30;
  if (usosConectivos >= 5) nota += 20;

  nota = Math.min(nota, 200);

  return {
    nota,
    nivel: nota >= 160 ? 'Excelente' : nota >= 120 ? 'Bom' : 'Mediano',
    feedback: nota >= 160
      ? 'Excelente seleção e organização de argumentos, com relação clara entre as partes do texto.'
      : 'Os argumentos estão presentes, mas podem ser mais bem organizados e interligados.',
    pontosFortes: [
      usosConectivos >= 3 ? 'Bom uso de conectivos' : 'Presença de conectivos',
      temEstrutura ? 'Estrutura bem definida' : 'Tentativa de organização'
    ],
    pontosMelhorar: [
      'Usar mais conectivos argumentativos',
      'Desenvolver melhor a progressão de ideias',
      'Relacionar argumentos de forma mais coesa'
    ]
  };
}

// Função para analisar Competência 4: Coesão textual
function avaliarCompetencia4(texto: string): Competencia {
  const paragrafos = texto.split('\n\n').filter(p => p.trim().length > 0);
  const linhas = texto.split('\n');

  // Verificar uso de pronomes e referências
  const pronomes = texto.match(/\b(ele|ela|este|esse|aquele|isso|isto|o qual|a qual)\b/gi);
  const numeroPronomes = pronomes ? pronomes.length : 0;

  // Verificar repetições excessivas
  const palavras = texto.toLowerCase().split(/\s+/);
  const frequencia: { [key: string]: number } = {};
  palavras.forEach(palavra => {
    if (palavra.length > 4) {
      frequencia[palavra] = (frequencia[palavra] || 0) + 1;
    }
  });

  const repeticoesExcessivas = Object.values(frequencia).filter(f => f > 5).length;

  let nota = 120;
  if (numeroPronomes >= 5) nota += 40;
  if (repeticoesExcessivas === 0) nota += 40;
  else if (repeticoesExcessivas <= 2) nota += 20;

  nota = Math.min(nota, 200);

  return {
    nota,
    nivel: nota >= 160 ? 'Excelente' : nota >= 120 ? 'Bom' : 'Mediano',
    feedback: nota >= 160
      ? 'Excelente articulação entre parágrafos e períodos. Texto coeso e fluido.'
      : 'O texto apresenta coesão, mas há espaço para melhorar as conexões entre ideias.',
    pontosFortes: [
      numeroPronomes >= 5 ? 'Bom uso de mecanismos coesivos' : 'Uso básico de coesão',
      'Progressão textual adequada'
    ],
    pontosMelhorar: [
      repeticoesExcessivas > 2 ? 'Evitar repetições de palavras' : 'Variar vocabulário',
      'Usar mais pronomes e sinônimos',
      'Conectar melhor os parágrafos'
    ]
  };
}

// Função para analisar Competência 5: Proposta de intervenção
function avaliarCompetencia5(texto: string): Competencia {
  const textoLower = texto.toLowerCase();

  // Elementos da proposta de intervenção
  const temAgente = /\b(governo|estado|sociedade|escola|família|mídia|ong)\b/gi.test(textoLower);
  const temAcao = /\b(deve|precisa|necessário|criar|implementar|promover|realizar)\b/gi.test(textoLower);
  const temMeio = /\b(através|por meio|mediante|com|utilizando)\b/gi.test(textoLower);
  const temFinalidade = /\b(para|a fim de|com o objetivo|visando)\b/gi.test(textoLower);
  const temDetalhamento = /\b(como|quando|onde|porque)\b/gi.test(textoLower);

  let elementos = 0;
  if (temAgente) elementos++;
  if (temAcao) elementos++;
  if (temMeio) elementos++;
  if (temFinalidade) elementos++;
  if (temDetalhamento) elementos++;

  const notas = [0, 40, 80, 120, 160, 200];
  const nota = notas[elementos] || 0;

  return {
    nota,
    nivel: nota >= 160 ? 'Excelente' : nota >= 120 ? 'Bom' : nota >= 80 ? 'Mediano' : 'Insuficiente',
    feedback: nota >= 160
      ? 'Proposta de intervenção completa e detalhada, respeitando os direitos humanos.'
      : nota >= 120
      ? 'Proposta de intervenção presente com bom detalhamento. Pode adicionar mais elementos.'
      : 'Proposta de intervenção incompleta. É necessário detalhar agente, ação, meio, finalidade e detalhamento.',
    pontosFortes: [
      temAgente ? 'Agente identificado' : '',
      temAcao ? 'Ação proposta clara' : '',
      temFinalidade ? 'Finalidade bem definida' : ''
    ].filter(Boolean),
    pontosMelhorar: [
      !temAgente ? 'Identificar quem deve agir (governo, sociedade, etc.)' : '',
      !temAcao ? 'Propor uma ação concreta' : '',
      !temMeio ? 'Explicar como a ação será realizada' : '',
      !temFinalidade ? 'Definir o objetivo da intervenção' : '',
      !temDetalhamento ? 'Detalhar quando/onde/como a ação ocorrerá' : ''
    ].filter(Boolean)
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { redacaoId } = body;

    if (!redacaoId) {
      return NextResponse.json(
        { success: false, error: 'redacaoId é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar redação
    const redacao = await prisma.redacaoUsuario.findUnique({
      where: { id: redacaoId },
      include: {
        proposta: true
      }
    });

    if (!redacao) {
      return NextResponse.json(
        { success: false, error: 'Redação não encontrada' },
        { status: 404 }
      );
    }

    // Avaliar cada competência
    const comp1 = avaliarCompetencia1(redacao.texto);
    const comp2 = avaliarCompetencia2(redacao.texto, redacao.proposta.tema);
    const comp3 = avaliarCompetencia3(redacao.texto);
    const comp4 = avaliarCompetencia4(redacao.texto);
    const comp5 = avaliarCompetencia5(redacao.texto);

    const notaFinal = comp1.nota + comp2.nota + comp3.nota + comp4.nota + comp5.nota;

    // Feedback geral
    let feedbackGeral = '';
    if (notaFinal >= 900) {
      feedbackGeral = '🌟 Excelente redação! Você domina muito bem a escrita dissertativo-argumentativa e está preparado para o ENEM.';
    } else if (notaFinal >= 700) {
      feedbackGeral = '👏 Boa redação! Com alguns ajustes pontuais, você pode alcançar nota máxima.';
    } else if (notaFinal >= 500) {
      feedbackGeral = '📚 Redação satisfatória. Continue praticando, especialmente nas competências com notas mais baixas.';
    } else {
      feedbackGeral = '💪 Continue estudando! Foque em melhorar a estrutura do texto e o domínio da norma culta.';
    }

    // Montar feedback completo
    const feedback = `
📊 AVALIAÇÃO COMPLETA

${feedbackGeral}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 COMPETÊNCIA 1: Domínio da Norma Culta
Nota: ${comp1.nota}/200 (${comp1.nivel})
${comp1.feedback}

✅ Pontos Fortes:
${comp1.pontosFortes.map(p => `• ${p}`).join('\n')}

⚠️ Pontos a Melhorar:
${comp1.pontosMelhorar.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 COMPETÊNCIA 2: Compreender o Tema
Nota: ${comp2.nota}/200 (${comp2.nivel})
${comp2.feedback}

✅ Pontos Fortes:
${comp2.pontosFortes.map(p => `• ${p}`).join('\n')}

⚠️ Pontos a Melhorar:
${comp2.pontosMelhorar.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 COMPETÊNCIA 3: Seleção e Organização de Argumentos
Nota: ${comp3.nota}/200 (${comp3.nivel})
${comp3.feedback}

✅ Pontos Fortes:
${comp3.pontosFortes.map(p => `• ${p}`).join('\n')}

⚠️ Pontos a Melhorar:
${comp3.pontosMelhorar.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 COMPETÊNCIA 4: Coesão Textual
Nota: ${comp4.nota}/200 (${comp4.nivel})
${comp4.feedback}

✅ Pontos Fortes:
${comp4.pontosFortes.map(p => `• ${p}`).join('\n')}

⚠️ Pontos a Melhorar:
${comp4.pontosMelhorar.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️ COMPETÊNCIA 5: Proposta de Intervenção
Nota: ${comp5.nota}/200 (${comp5.nivel})
${comp5.feedback}

✅ Pontos Fortes:
${comp5.pontosFortes.map(p => `• ${p}`).join('\n')}

⚠️ Pontos a Melhorar:
${comp5.pontosMelhorar.map(p => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎖️ NOTA FINAL: ${notaFinal}/1000

Continue praticando! Cada redação te aproxima da nota 1000! ✍️
    `.trim();

    // Atualizar redação no banco
    const redacaoAtualizada = await prisma.redacaoUsuario.update({
      where: { id: redacaoId },
      data: {
        nota1: comp1.nota,
        nota2: comp2.nota,
        nota3: comp3.nota,
        nota4: comp4.nota,
        nota5: comp5.nota,
        notaFinal,
        feedback,
        status: 'avaliada',
        avaliadoEm: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      avaliacao: {
        competencia1: comp1,
        competencia2: comp2,
        competencia3: comp3,
        competencia4: comp4,
        competencia5: comp5,
        notaFinal,
        feedbackGeral,
        tempoCorrecao: '2-3 minutos'
      },
      redacao: redacaoAtualizada
    });

  } catch (error) {
    console.error('Erro ao corrigir redação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar correção' },
      { status: 500 }
    );
  }
}
