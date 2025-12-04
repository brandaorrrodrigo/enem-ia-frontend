'use client';

import { useState } from 'react';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Evento {
  id: string;
  titulo: string;
  data: string;
  tipo: 'prova' | 'inscricao' | 'resultado' | 'importante';
  descricao: string;
  link?: string;
}

const EVENTOS_2025: Evento[] = [
  { id: '1', titulo: 'Inscricoes ENEM 2025 - Inicio', data: '2025-05-26', tipo: 'inscricao', descricao: 'Inicio do periodo de inscricoes para o ENEM 2025.', link: 'https://enem.inep.gov.br' },
  { id: '2', titulo: 'Inscricoes ENEM 2025 - Fim', data: '2025-06-06', tipo: 'inscricao', descricao: 'Ultimo dia para realizar a inscricao no ENEM 2025.' },
  { id: '3', titulo: 'Pagamento Taxa - Prazo', data: '2025-06-11', tipo: 'importante', descricao: 'Ultimo dia para pagamento da taxa de inscricao.' },
  { id: '4', titulo: 'Cartao de Confirmacao', data: '2025-10-28', tipo: 'importante', descricao: 'Divulgacao do cartao de confirmacao com local de prova.' },
  { id: '5', titulo: 'ENEM 2025 - 1o Dia', data: '2025-11-02', tipo: 'prova', descricao: 'Linguagens, Ciencias Humanas e Redacao. Duracao: 5h30.' },
  { id: '6', titulo: 'ENEM 2025 - 2o Dia', data: '2025-11-09', tipo: 'prova', descricao: 'Matematica e Ciencias da Natureza. Duracao: 5h.' },
  { id: '7', titulo: 'Gabarito Oficial', data: '2025-11-13', tipo: 'resultado', descricao: 'Divulgacao dos gabaritos oficiais das provas.' },
  { id: '8', titulo: 'Resultado ENEM 2025', data: '2026-01-13', tipo: 'resultado', descricao: 'Divulgacao das notas individuais do ENEM 2025.' },
  { id: '9', titulo: 'Sisu 2026 - Inscricoes', data: '2026-01-17', tipo: 'inscricao', descricao: 'Inicio das inscricoes do SISU 2026.' },
  { id: '10', titulo: 'ProUni 2026 - Inscricoes', data: '2026-01-28', tipo: 'inscricao', descricao: 'Inicio das inscricoes do ProUni 2026.' },
  { id: '11', titulo: 'FIES 2026 - Inscricoes', data: '2026-02-04', tipo: 'inscricao', descricao: 'Inicio das inscricoes do FIES 2026.' },
];

const CRONOGRAMA_PROVA = [
  { horario: '12:00', evento: 'Abertura dos portoes' },
  { horario: '13:00', evento: 'Fechamento dos portoes' },
  { horario: '13:30', evento: 'Inicio das provas' },
  { horario: '15:30', evento: 'Liberacao para ir embora (1o dia)', desc: 'Nao pode levar caderno de questoes' },
  { horario: '18:00', evento: 'Pode levar caderno de questoes (1o dia)' },
  { horario: '19:00', evento: 'Fim da prova (1o dia - 5h30)' },
  { horario: '18:30', evento: 'Fim da prova (2o dia - 5h)' },
];

const CONTEUDOS_DIA1 = [
  { area: 'Linguagens', questoes: 45, temas: ['Interpretacao de texto', 'Literatura', 'Gramatica', 'Lingua estrangeira', 'Artes'] },
  { area: 'Ciencias Humanas', questoes: 45, temas: ['Historia do Brasil', 'Historia Geral', 'Geografia', 'Filosofia', 'Sociologia'] },
  { area: 'Redacao', questoes: 1, temas: ['Dissertacao-argumentativa', 'Proposta de intervencao', 'Tema social'] },
];

const CONTEUDOS_DIA2 = [
  { area: 'Matematica', questoes: 45, temas: ['Algebra', 'Geometria', 'Estatistica', 'Funcoes', 'Probabilidade'] },
  { area: 'Ciencias da Natureza', questoes: 45, temas: ['Fisica', 'Quimica', 'Biologia', 'Meio ambiente'] },
];

export default function CalendarioPage() {
  const [mesSelecionado, setMesSelecionado] = useState(11);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'prova': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'inscricao': return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
      case 'resultado': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'importante': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      default: return 'bg-white/10 text-white/70';
    }
  };

  const getTipoEmoji = (tipo: string) => {
    switch (tipo) {
      case 'prova': return '📝';
      case 'inscricao': return '📋';
      case 'resultado': return '📊';
      case 'importante': return '⚠️';
      default: return '📌';
    }
  };

  const formatarData = (data: string) => {
    const d = new Date(data + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDiasRestantes = (data: string) => {
    const hoje = new Date();
    const dataEvento = new Date(data + 'T12:00:00');
    const diff = dataEvento.getTime() - hoje.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  };

  const proximosEventos = EVENTOS_2025.filter(e => getDiasRestantes(e.data) >= 0).slice(0, 5);
  const diasParaProva = getDiasRestantes('2025-11-02');

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">📅 Calendario ENEM 2025</h1>
        <p className="subtitle-ia mb-4">Todas as datas importantes para sua preparacao</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card-ia text-center bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30">
          <p className="text-6xl font-bold text-white mb-2">{diasParaProva > 0 ? diasParaProva : 'Ja foi!'}</p>
          <p className="text-white/70">dias para o ENEM</p>
          <p className="text-yellow-300 text-sm mt-2">1o dia: 02/11/2025</p>
        </div>
        <div className="card-ia text-center">
          <p className="text-4xl mb-2">📝</p>
          <p className="text-2xl font-bold text-white">180</p>
          <p className="text-white/70">questoes no total</p>
          <p className="text-white/50 text-sm mt-2">90 por dia</p>
        </div>
        <div className="card-ia text-center">
          <p className="text-4xl mb-2">⏱️</p>
          <p className="text-2xl font-bold text-white">10h30</p>
          <p className="text-white/70">tempo total de prova</p>
          <p className="text-white/50 text-sm mt-2">5h30 + 5h</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card-ia">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">🔔 Proximos Eventos</h3>
          <div className="space-y-3">
            {proximosEventos.map((evento) => {
              const dias = getDiasRestantes(evento.data);
              return (
                <div key={evento.id} className={`p-3 rounded-xl border ${getTipoColor(evento.tipo)}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTipoEmoji(evento.tipo)}</span>
                    <div className="flex-1">
                      <p className="text-white font-bold">{evento.titulo}</p>
                      <p className="text-white/60 text-sm">{formatarData(evento.data)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{dias}</p>
                      <p className="text-xs text-white/50">dias</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-ia">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">⏰ Cronograma do Dia da Prova</h3>
          <div className="space-y-2">
            {CRONOGRAMA_PROVA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-2 bg-white/5 rounded-lg">
                <span className="text-yellow-300 font-mono font-bold w-14">{item.horario}</span>
                <div className="flex-1">
                  <p className="text-white">{item.evento}</p>
                  {item.desc && <p className="text-white/50 text-xs">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card-ia">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">📝 1o Dia - Domingo 02/11</h3>
          <p className="text-white/60 text-sm mb-4">5h30 de prova + Redacao</p>
          {CONTEUDOS_DIA1.map((area, idx) => (
            <div key={idx} className="mb-4 p-3 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">{area.area}</span>
                <span className="text-yellow-300">{area.questoes} questoes</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {area.temas.map((tema, i) => (
                  <span key={i} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">{tema}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-ia">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">📝 2o Dia - Domingo 09/11</h3>
          <p className="text-white/60 text-sm mb-4">5h de prova</p>
          {CONTEUDOS_DIA2.map((area, idx) => (
            <div key={idx} className="mb-4 p-3 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">{area.area}</span>
                <span className="text-yellow-300">{area.questoes} questoes</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {area.temas.map((tema, i) => (
                  <span key={i} className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs">{tema}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-ia mb-8">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">📋 Todas as Datas Importantes</h3>
        <div className="space-y-2">
          {EVENTOS_2025.map((evento) => (
            <div key={evento.id} className={`flex items-center gap-4 p-3 rounded-xl border ${getTipoColor(evento.tipo)}`}>
              <span className="text-2xl">{getTipoEmoji(evento.tipo)}</span>
              <span className="text-white font-mono w-24">{formatarData(evento.data)}</span>
              <div className="flex-1">
                <p className="text-white font-bold">{evento.titulo}</p>
                <p className="text-white/60 text-sm">{evento.descricao}</p>
              </div>
              {evento.link && (
                <a href={evento.link} target="_blank" rel="noopener noreferrer" className="btn-ia-secondary text-sm">
                  Acessar
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card-ia bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">🎒 O que levar no dia da prova</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-green-400 font-bold mb-2">✓ Obrigatorio</h4>
            <ul className="space-y-1 text-white/80">
              <li>• Documento de identidade original com foto</li>
              <li>• Caneta esferografica preta em tubo transparente</li>
              <li>• Cartao de confirmacao (recomendado)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-yellow-400 font-bold mb-2">💡 Recomendado</h4>
            <ul className="space-y-1 text-white/80">
              <li>• Lanche leve e agua em garrafa transparente</li>
              <li>• Relogio analogico (sem funcoes)</li>
              <li>• Casaco (ar-condicionado)</li>
            </ul>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
