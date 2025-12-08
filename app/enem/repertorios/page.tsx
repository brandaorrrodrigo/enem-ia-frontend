'use client';

import React, { useState } from 'react';
import FloatingBackButton from '@/components/FloatingBackButton';
import {motion, AnimatePresence } from 'framer-motion';
import {
  FaBook, FaFilm, FaLandmark, FaFlask, FaGlobeAmericas,
  FaUserTie, FaBalanceScale, FaHeart, FaLaptop, FaLeaf,
  FaSearch, FaStar, FaCopy, FaCheck
} from 'react-icons/fa';

// Dados dos repertorios
const repertorios = {
  filosofos: [
    {
      nome: 'Zygmunt Bauman',
      conceito: 'Modernidade Liquida',
      descricao: 'Relacoes frageis, sociedade do consumo, identidades fluidas, incertezas constantes.',
      citacao: '"Numa sociedade liquido-moderna, as realizacoes individuais nao podem solidificar-se em posses permanentes."',
      temas: ['redes sociais', 'relacoes humanas', 'consumismo', 'trabalho', 'saude mental'],
      uso: 'Ideal para temas sobre fragilidade das relacoes, isolamento social, consumismo excessivo.',
    },
    {
      nome: 'Hannah Arendt',
      conceito: 'Banalidade do Mal',
      descricao: 'Pessoas comuns podem cometer atrocidades por obediencia ou omissao, sem questionar.',
      citacao: '"O mal jamais e radical, e apenas extremo, e nao possui profundidade nem dimensao demoniaca."',
      temas: ['violencia', 'preconceito', 'negligencia', 'direitos humanos', 'democracia'],
      uso: 'Perfeito para temas sobre violencia institucional, preconceito naturalizado, omissao social.',
    },
    {
      nome: 'Immanuel Kant',
      conceito: 'Imperativo Categorico / Esclarecimento',
      descricao: 'O ser humano e aquilo que a educacao faz dele. Sapere aude - ouse saber.',
      citacao: '"O homem nao e nada alem daquilo que a educacao faz dele."',
      temas: ['educacao', 'etica', 'cidadania', 'autonomia', 'formacao'],
      uso: 'Versatil para qualquer tema sobre educacao, formacao cidada, desenvolvimento humano.',
    },
    {
      nome: 'Michel Foucault',
      conceito: 'Sociedade Disciplinar / Biopolitica',
      descricao: 'Controle social atraves de instituicoes, vigilancia, normalizacao de comportamentos.',
      citacao: '"Onde ha poder, ha resistencia."',
      temas: ['saude mental', 'sistema prisional', 'escola', 'tecnologia', 'controle social'],
      uso: 'Ideal para temas sobre instituicoes, vigilancia digital, controle de corpos.',
    },
    {
      nome: 'Jean-Paul Sartre',
      conceito: 'Existencialismo',
      descricao: 'O homem esta condenado a ser livre - somos responsaveis por nossas escolhas.',
      citacao: '"O homem esta condenado a ser livre."',
      temas: ['liberdade', 'responsabilidade', 'escolhas', 'identidade', 'existencia'],
      uso: 'Para temas sobre responsabilidade individual, liberdade de escolha, existencia.',
    },
    {
      nome: 'Pierre Bourdieu',
      conceito: 'Capital Cultural / Violencia Simbolica',
      descricao: 'Desigualdades se perpetuam atraves da cultura e educacao, nao so economicamente.',
      citacao: '"A escola transforma as desigualdades sociais em desigualdades escolares."',
      temas: ['educacao', 'desigualdade', 'cultura', 'acesso', 'meritocracia'],
      uso: 'Excelente para temas sobre desigualdade educacional, acesso a cultura.',
    },
    {
      nome: 'John Locke',
      conceito: 'Contrato Social / Direitos Naturais',
      descricao: 'O Estado deve proteger vida, liberdade e propriedade dos cidadaos.',
      citacao: '"Onde nao ha lei, nao ha liberdade."',
      temas: ['direitos', 'cidadania', 'Estado', 'liberdade', 'seguranca'],
      uso: 'Para cobrar atuacao do Estado na protecao de direitos fundamentais.',
    },
    {
      nome: 'Jean-Jacques Rousseau',
      conceito: 'Bom Selvagem / Contrato Social',
      descricao: 'O homem nasce bom, a sociedade o corrompe. Educacao forma o cidadao.',
      citacao: '"O homem nasce livre, e por toda a parte encontra-se a ferros."',
      temas: ['educacao', 'natureza humana', 'sociedade', 'corrupcao', 'infancia'],
      uso: 'Para temas sobre educacao, infancia, corrupcao da sociedade.',
    },
  ],
  obras_literarias: [
    {
      nome: '1984',
      autor: 'George Orwell',
      descricao: 'Distopia sobre vigilancia extrema, manipulacao da verdade, controle totalitario.',
      temas: ['tecnologia', 'vigilancia', 'fake news', 'liberdade', 'totalitarismo'],
      uso: 'Perfeito para temas sobre vigilancia digital, manipulacao de informacoes.',
    },
    {
      nome: 'Vidas Secas',
      autor: 'Graciliano Ramos',
      descricao: 'Familia sertaneja fugindo da seca, miseria, falta de oportunidades.',
      temas: ['desigualdade', 'seca', 'migracao', 'pobreza', 'nordeste'],
      uso: 'Ideal para temas sobre desigualdade regional, fome, migracao.',
    },
    {
      nome: 'O Cortico',
      autor: 'Aluisio Azevedo',
      descricao: 'Retrato das condicoes precarias de moradia no Brasil do seculo XIX.',
      temas: ['moradia', 'urbanizacao', 'pobreza', 'saneamento', 'classes sociais'],
      uso: 'Para temas sobre moradia, deficit habitacional, saneamento.',
    },
    {
      nome: 'Quarto de Despejo',
      autor: 'Carolina Maria de Jesus',
      descricao: 'Diario de uma catadora de lixo na favela, fome, exclusao social.',
      temas: ['fome', 'favela', 'exclusao', 'mulher negra', 'pobreza'],
      uso: 'Poderoso para temas sobre fome, exclusao social, mulheres.',
    },
    {
      nome: 'Capitaes da Areia',
      autor: 'Jorge Amado',
      descricao: 'Meninos de rua em Salvador, abandono, criminalidade juvenil.',
      temas: ['infancia', 'criminalidade', 'abandono', 'educacao', 'pobreza'],
      uso: 'Para temas sobre menores abandonados, criminalidade juvenil.',
    },
    {
      nome: 'A Hora da Estrela',
      autor: 'Clarice Lispector',
      descricao: 'Nordestina em Sao Paulo, invisibilidade social, falta de oportunidades.',
      temas: ['migracao', 'invisibilidade', 'mulher', 'pobreza', 'trabalho'],
      uso: 'Excelente para temas sobre invisibilidade social, migracao.',
    },
    {
      nome: 'Memorias Postumas de Bras Cubas',
      autor: 'Machado de Assis',
      descricao: 'Critica a elite brasileira, hipocrisia social, aparencias.',
      temas: ['elite', 'hipocrisia', 'sociedade', 'aparencias', 'escravidao'],
      uso: 'Para criticar a elite, aparencias sociais, desigualdade.',
    },
    {
      nome: 'Fahrenheit 451',
      autor: 'Ray Bradbury',
      descricao: 'Sociedade onde livros sao proibidos e queimados.',
      temas: ['censura', 'leitura', 'educacao', 'cultura', 'liberdade'],
      uso: 'Para temas sobre censura, importancia da leitura, cultura.',
    },
  ],
  filmes_series: [
    {
      nome: 'Que Horas Ela Volta?',
      ano: 2015,
      descricao: 'Relacao entre patroa e empregada domestica, desigualdade social brasileira.',
      temas: ['desigualdade', 'trabalho domestico', 'classes sociais', 'mobilidade'],
      uso: 'Perfeito para temas sobre desigualdade, trabalho domestico.',
    },
    {
      nome: 'Cidade de Deus',
      ano: 2002,
      descricao: 'Violencia e trafico de drogas em favela carioca.',
      temas: ['violencia', 'favela', 'trafico', 'juventude', 'pobreza'],
      uso: 'Para temas sobre violencia urbana, periferia, juventude.',
    },
    {
      nome: 'O Auto da Compadecida',
      ano: 2000,
      descricao: 'Nordeste brasileiro, religiosidade, esperteza popular.',
      temas: ['nordeste', 'religiao', 'cultura popular', 'desigualdade'],
      uso: 'Para temas sobre cultura nordestina, religiosidade.',
    },
    {
      nome: 'Bacurau',
      ano: 2019,
      descricao: 'Comunidade nordestina resiste a ameacas externas.',
      temas: ['resistencia', 'comunidade', 'nordeste', 'colonialismo', 'identidade'],
      uso: 'Para temas sobre resistencia cultural, comunidades tradicionais.',
    },
    {
      nome: 'Black Mirror',
      ano: '2011-atual',
      descricao: 'Serie sobre impactos negativos da tecnologia na sociedade.',
      temas: ['tecnologia', 'redes sociais', 'privacidade', 'futuro', 'dependencia'],
      uso: 'Ideal para qualquer tema sobre tecnologia e seus impactos.',
    },
    {
      nome: 'O Dilema das Redes',
      ano: 2020,
      descricao: 'Documentario sobre manipulacao por redes sociais e algoritmos.',
      temas: ['redes sociais', 'algoritmos', 'manipulacao', 'saude mental', 'privacidade'],
      uso: 'Perfeito para temas sobre redes sociais, fake news, saude mental.',
    },
    {
      nome: 'Nise: O Coracao da Loucura',
      ano: 2015,
      descricao: 'Dra. Nise da Silveira revoluciona tratamento psiquiatrico no Brasil.',
      temas: ['saude mental', 'humanizacao', 'arte', 'tratamento', 'direitos'],
      uso: 'Excelente para temas sobre saude mental, humanizacao.',
    },
    {
      nome: 'Central do Brasil',
      ano: 1998,
      descricao: 'Viagem pelo Brasil, busca por identidade, lacos humanos.',
      temas: ['identidade', 'familia', 'Brasil profundo', 'solidariedade'],
      uso: 'Para temas sobre identidade, familia, solidariedade.',
    },
  ],
  dados_fontes: [
    {
      fonte: 'IBGE',
      tipo: 'Instituto oficial de estatistica',
      dados: 'Censo, PNAD, indices de desemprego, moradia, educacao.',
      uso: 'Para qualquer tema que precise de dados sobre a populacao brasileira.',
    },
    {
      fonte: 'OMS (Organizacao Mundial da Saude)',
      tipo: 'Organizacao internacional',
      dados: 'Saude mental, pandemia, doencas, expectativa de vida.',
      uso: 'Para temas sobre saude publica, saude mental, epidemias.',
    },
    {
      fonte: 'ONU',
      tipo: 'Organizacao internacional',
      dados: 'Direitos humanos, desenvolvimento sustentavel, refugiados.',
      uso: 'Para temas sobre direitos humanos, meio ambiente, refugiados.',
    },
    {
      fonte: 'IPEA',
      tipo: 'Instituto de pesquisa',
      dados: 'Atlas da Violencia, desigualdade, politicas publicas.',
      uso: 'Para temas sobre violencia, desigualdade, politicas publicas.',
    },
    {
      fonte: 'UNESCO',
      tipo: 'Organizacao internacional',
      dados: 'Educacao, cultura, patrimonio historico.',
      uso: 'Para temas sobre educacao, cultura, patrimonio.',
    },
    {
      fonte: 'UNICEF',
      tipo: 'Organizacao internacional',
      dados: 'Infancia, direitos das criancas, educacao infantil.',
      uso: 'Para temas sobre infancia, direitos das criancas.',
    },
  ],
  leis_documentos: [
    {
      nome: 'Constituicao Federal de 1988',
      artigos: 'Art. 5 (direitos fundamentais), Art. 6 (direitos sociais), Art. 205 (educacao), Art. 225 (meio ambiente)',
      uso: 'CORINGA - serve para quase todos os temas!',
    },
    {
      nome: 'Declaracao Universal dos Direitos Humanos (1948)',
      artigos: 'Direito a vida, liberdade, seguranca, educacao, saude.',
      uso: 'CORINGA - para temas sobre direitos fundamentais.',
    },
    {
      nome: 'ECA (Estatuto da Crianca e do Adolescente)',
      artigos: 'Protecao integral a crianca e ao adolescente.',
      uso: 'Para temas sobre infancia, adolescencia, educacao.',
    },
    {
      nome: 'Estatuto do Idoso',
      artigos: 'Direitos e protecao aos maiores de 60 anos.',
      uso: 'Para temas sobre envelhecimento, etarismo, saude.',
    },
    {
      nome: 'Lei Maria da Penha',
      artigos: 'Combate a violencia domestica contra a mulher.',
      uso: 'Para temas sobre violencia contra mulher, genero.',
    },
    {
      nome: 'Marco Civil da Internet',
      artigos: 'Direitos e deveres no uso da internet no Brasil.',
      uso: 'Para temas sobre internet, privacidade, redes sociais.',
    },
  ],
  fatos_historicos: [
    {
      evento: 'Ditadura Militar no Brasil (1964-1985)',
      descricao: 'Periodo de censura, tortura, restricao de liberdades.',
      temas: ['democracia', 'liberdade de expressao', 'direitos humanos', 'censura'],
    },
    {
      evento: 'Abolicao da Escravidao (1888)',
      descricao: 'Fim formal da escravidao sem politicas de integracao.',
      temas: ['racismo', 'desigualdade', 'reparacao historica', 'trabalho'],
    },
    {
      evento: 'Revolucao Industrial',
      descricao: 'Mudancas no trabalho, urbanizacao, problemas sociais.',
      temas: ['trabalho', 'urbanizacao', 'tecnologia', 'exploracacao'],
    },
    {
      evento: 'Holocausto',
      descricao: 'Genocidio de judeus pelo nazismo durante a Segunda Guerra.',
      temas: ['intolerancia', 'preconceito', 'direitos humanos', 'genocidio'],
    },
    {
      evento: 'Movimento dos Direitos Civis (EUA)',
      descricao: 'Luta por igualdade racial liderada por Martin Luther King Jr.',
      temas: ['racismo', 'igualdade', 'luta social', 'resistencia'],
    },
  ],
};

const categorias = [
  { id: 'filosofos', nome: 'Filosofos', icon: FaUserTie, cor: '#ffd700' },
  { id: 'obras_literarias', nome: 'Literatura', icon: FaBook, cor: '#87ceeb' },
  { id: 'filmes_series', nome: 'Filmes e Series', icon: FaFilm, cor: '#98fb98' },
  { id: 'dados_fontes', nome: 'Dados e Fontes', icon: FaFlask, cor: '#ff6b6b' },
  { id: 'leis_documentos', nome: 'Leis e Documentos', icon: FaBalanceScale, cor: '#dda0dd' },
  { id: 'fatos_historicos', nome: 'Fatos Historicos', icon: FaLandmark, cor: '#ffa500' },
];

export default function RepertoriosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('filosofos');
  const [busca, setBusca] = useState('');
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiarTexto = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const filtrarItens = (itens: any[]) => {
    if (!busca) return itens;
    return itens.filter(item => {
      const textoCompleto = JSON.stringify(item).toLowerCase();
      return textoCompleto.includes(busca.toLowerCase());
    });
  };

  const renderConteudo = () => {
    const categoria = categoriaAtiva as keyof typeof repertorios;
    const itens = filtrarItens(repertorios[categoria] || []);

    if (categoria === 'filosofos') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.nome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 215, 0, 0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ color: '#ffd700', margin: 0, fontSize: '1.2rem' }}>{item.nome}</h3>
              <p style={{ color: '#87ceeb', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>{item.conceito}</p>
            </div>
            <button
              onClick={() => copiarTexto(item.citacao, item.nome)}
              style={{
                background: copiado === item.nome ? '#98fb98' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: copiado === item.nome ? '#000' : '#fff',
              }}
            >
              {copiado === item.nome ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.descricao}</p>
          <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <p style={{ color: '#ffd700', fontStyle: 'italic', margin: 0, fontSize: '0.9rem' }}>{item.citacao}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {item.temas.map((tema: string) => (
              <span key={tema} style={{
                background: 'rgba(135, 206, 235, 0.2)',
                color: '#87ceeb',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
              }}>
                {tema}
              </span>
            ))}
          </div>
          <p style={{ color: '#98fb98', fontSize: '0.85rem', margin: 0 }}>
            <strong>Como usar:</strong> {item.uso}
          </p>
        </motion.div>
      ));
    }

    if (categoria === 'obras_literarias') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.nome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(135, 206, 235, 0.2)',
          }}
        >
          <h3 style={{ color: '#87ceeb', margin: 0, fontSize: '1.2rem' }}>{item.nome}</h3>
          <p style={{ color: '#ffd700', margin: '0.25rem 0 1rem 0', fontSize: '0.9rem' }}>{item.autor}</p>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.descricao}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {item.temas.map((tema: string) => (
              <span key={tema} style={{
                background: 'rgba(152, 251, 152, 0.2)',
                color: '#98fb98',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
              }}>
                {tema}
              </span>
            ))}
          </div>
          <p style={{ color: '#dda0dd', fontSize: '0.85rem', margin: 0 }}>
            <strong>Como usar:</strong> {item.uso}
          </p>
        </motion.div>
      ));
    }

    if (categoria === 'filmes_series') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.nome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(152, 251, 152, 0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ color: '#98fb98', margin: 0, fontSize: '1.2rem' }}>{item.nome}</h3>
            <span style={{ color: '#ffd700', fontSize: '0.85rem' }}>{item.ano}</span>
          </div>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', margin: '1rem 0' }}>{item.descricao}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {item.temas.map((tema: string) => (
              <span key={tema} style={{
                background: 'rgba(255, 215, 0, 0.2)',
                color: '#ffd700',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
              }}>
                {tema}
              </span>
            ))}
          </div>
          <p style={{ color: '#87ceeb', fontSize: '0.85rem', margin: 0 }}>
            <strong>Como usar:</strong> {item.uso}
          </p>
        </motion.div>
      ));
    }

    if (categoria === 'dados_fontes') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.fonte}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 107, 107, 0.2)',
          }}
        >
          <h3 style={{ color: '#ff6b6b', margin: 0, fontSize: '1.2rem' }}>{item.fonte}</h3>
          <p style={{ color: '#87ceeb', margin: '0.25rem 0 1rem 0', fontSize: '0.9rem' }}>{item.tipo}</p>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginBottom: '1rem' }}><strong>Dados disponiveis:</strong> {item.dados}</p>
          <p style={{ color: '#98fb98', fontSize: '0.85rem', margin: 0 }}>
            <strong>Como usar:</strong> {item.uso}
          </p>
        </motion.div>
      ));
    }

    if (categoria === 'leis_documentos') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.nome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(221, 160, 221, 0.2)',
          }}
        >
          <h3 style={{ color: '#dda0dd', margin: 0, fontSize: '1.2rem' }}>{item.nome}</h3>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', margin: '1rem 0' }}><strong>Artigos importantes:</strong> {item.artigos}</p>
          <p style={{ color: '#ffd700', fontSize: '0.9rem', margin: 0 }}>
            <FaStar style={{ marginRight: '0.5rem' }} />
            {item.uso}
          </p>
        </motion.div>
      ));
    }

    if (categoria === 'fatos_historicos') {
      return itens.map((item: any, index: number) => (
        <motion.div
          key={item.evento}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 165, 0, 0.2)',
          }}
        >
          <h3 style={{ color: '#ffa500', margin: 0, fontSize: '1.2rem' }}>{item.evento}</h3>
          <p style={{ color: '#f5f5dc', fontSize: '0.9rem', margin: '1rem 0' }}>{item.descricao}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {item.temas.map((tema: string) => (
              <span key={tema} style={{
                background: 'rgba(255, 215, 0, 0.2)',
                color: '#ffd700',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
              }}>
                {tema}
              </span>
            ))}
          </div>
        </motion.div>
      ));
    }

    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '2rem',
    }}>
      <FloatingBackButton />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h1 style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#ffd700',
            fontSize: '2.5rem',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            marginBottom: '0.5rem',
          }}>
            Biblioteca de Repertorios
          </h1>
          <p style={{ color: '#f5f5dc', fontSize: '1rem' }}>
            Repertorios socioculturais organizados para sua redacao ENEM
          </p>
        </motion.div>

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#87ceeb',
            }} />
            <input
              type="text"
              placeholder="Buscar por tema, autor, obra..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '12px',
                border: '2px solid rgba(135, 206, 235, 0.3)',
                background: 'rgba(0, 0, 0, 0.4)',
                color: '#fff',
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
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                border: categoriaAtiva === cat.id ? `2px solid ${cat.cor}` : '2px solid transparent',
                background: categoriaAtiva === cat.id ? `${cat.cor}30` : 'rgba(0, 0, 0, 0.4)',
                color: categoriaAtiva === cat.id ? cat.cor : '#f5f5dc',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
              }}
            >
              <cat.icon />
              {cat.nome}
            </button>
          ))}
        </motion.div>

        {/* Conteudo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          <AnimatePresence mode="wait">
            {renderConteudo()}
          </AnimatePresence>
        </div>

        {/* Dica */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#ffd700', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Dica de Uso
          </p>
          <p style={{ color: '#f5f5dc', margin: 0 }}>
            Nao basta citar! <strong style={{ color: '#98fb98' }}>Articule o repertorio com seu argumento</strong>.
            Explique como a referencia se relaciona com o tema e fortalece seu ponto de vista.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
