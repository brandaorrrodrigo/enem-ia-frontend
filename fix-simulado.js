const fs = require('fs');

const content = `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

const bancodeQuestoes = [
  { id: 1, area: 'matematica', enunciado: 'Uma pesquisa com 1000 pessoas mostrou que 60% preferem A, 30% preferem B. Quantas preferem C?', alternativas: ['50 pessoas', '100 pessoas', '150 pessoas', '200 pessoas', '300 pessoas'], correta: 1, explicacao: '100 - 90 = 10%. 10% de 1000 = 100 pessoas.' },
  { id: 2, area: 'matematica', enunciado: 'Terreno retangular com perimetro 80m. Comprimento = dobro da largura. Qual a area?', alternativas: ['177 m2', '266 m2', '355 m2', '400 m2', '533 m2'], correta: 2, explicacao: '6L=80, L=13.33, C=26.67. Area aproximada de 355 m2.' },
  { id: 3, area: 'matematica', enunciado: 'PA com a1=3 e razao=4. Qual o decimo termo?', alternativas: ['35', '37', '39', '41', '43'], correta: 2, explicacao: 'a10 = 3 + 9*4 = 39' },
  { id: 4, area: 'matematica', enunciado: '20% de desconto em R$ 150. Valor final?', alternativas: ['R$ 100', 'R$ 110', 'R$ 120', 'R$ 130', 'R$ 140'], correta: 2, explicacao: '150 - 30 = R$ 120' },
  { id: 5, area: 'matematica', enunciado: '2x + 5 = 17. Qual o valor de x?', alternativas: ['4', '5', '6', '7', '8'], correta: 2, explicacao: '2x = 12, x = 6' },
  { id: 6, area: 'linguagens', enunciado: 'Figura de linguagem em: "Aquele politico e uma raposa"', alternativas: ['Hiperbole', 'Metafora', 'Metonimia', 'Ironia', 'Eufemismo'], correta: 1, explicacao: 'Metafora - comparacao implicita' },
  { id: 7, area: 'linguagens', enunciado: '"Ele comeu o bolo todo" - tipo de sujeito?', alternativas: ['Composto', 'Oculto', 'Simples', 'Indeterminado', 'Inexistente'], correta: 2, explicacao: 'Sujeito simples: Ele' },
  { id: 8, area: 'linguagens', enunciado: 'Semana de Arte Moderna 1922 - marco do:', alternativas: ['Romantismo', 'Realismo', 'Modernismo', 'Barroco', 'Arcadismo'], correta: 2, explicacao: 'Modernismo brasileiro' },
  { id: 9, area: 'linguagens', enunciado: 'Autor de "Dom Casmurro":', alternativas: ['Jose de Alencar', 'Machado de Assis', 'Graciliano Ramos', 'Jorge Amado', 'Clarice Lispector'], correta: 1, explicacao: 'Machado de Assis, 1899' },
  { id: 10, area: 'linguagens', enunciado: 'Qual e linguagem coloquial?', alternativas: ['Vossa Excelencia', 'A presente missiva', 'To chegando ai mano!', 'Solicito gentileza', 'Conforme exposto'], correta: 2, explicacao: 'Girias e informalidade' },
  { id: 11, area: 'humanas', enunciado: 'Proclamacao da Republica no Brasil:', alternativas: ['1822', '1889', '1891', '1930', '1964'], correta: 1, explicacao: '15 de novembro de 1889' },
  { id: 12, area: 'humanas', enunciado: '"Penso logo existo" - filosofo:', alternativas: ['Platao', 'Aristoteles', 'Descartes', 'Kant', 'Nietzsche'], correta: 2, explicacao: 'Rene Descartes' },
  { id: 13, area: 'humanas', enunciado: 'Maior bioma brasileiro em extensao:', alternativas: ['Cerrado', 'Mata Atlantica', 'Amazonia', 'Caatinga', 'Pantanal'], correta: 2, explicacao: 'Amazonia - 49% do territorio' },
  { id: 14, area: 'humanas', enunciado: 'Conceito de "fato social" - autor:', alternativas: ['Weber', 'Marx', 'Durkheim', 'Comte', 'Foucault'], correta: 2, explicacao: 'Emile Durkheim' },
  { id: 15, area: 'humanas', enunciado: 'Revolucao Francesa - ano:', alternativas: ['1776', '1789', '1799', '1804', '1815'], correta: 1, explicacao: '1789 - Queda da Bastilha' },
  { id: 16, area: 'natureza', enunciado: 'Organela da respiracao celular:', alternativas: ['Ribossomo', 'Golgi', 'Mitocondria', 'Lisossomo', 'RE'], correta: 2, explicacao: 'Mitocondria' },
  { id: 17, area: 'natureza', enunciado: 'Formula da agua:', alternativas: ['H2O', 'CO2', 'NaCl', 'H2SO4', 'HCl'], correta: 0, explicacao: 'H2O - dois hidrogenios e um oxigenio' },
  { id: 18, area: 'natureza', enunciado: 'Segunda Lei de Newton - F = ?', alternativas: ['m/a', 'm*v', 'm*a', 'v/t', 'a/m'], correta: 2, explicacao: 'F = m * a (massa vezes aceleracao)' },
  { id: 19, area: 'natureza', enunciado: 'Plantas produzem alimento por:', alternativas: ['Respiracao', 'Fermentacao', 'Fotossintese', 'Digestao', 'Transpiracao'], correta: 2, explicacao: 'Fotossintese' },
  { id: 20, area: 'natureza', enunciado: 'pH neutro e igual a:', alternativas: ['0', '5', '7', '10', '14'], correta: 2, explicacao: 'pH 7 e neutro' },
  { id: 21, area: 'matematica', enunciado: 'f(x) = 2x^2 - 3x + 1. Quanto e f(2)?', alternativas: ['1', '2', '3', '4', '5'], correta: 2, explicacao: 'f(2) = 8 - 6 + 1 = 3' },
  { id: 22, area: 'matematica', enunciado: 'Area de triangulo com base 10cm e altura 6cm:', alternativas: ['20 cm2', '25 cm2', '30 cm2', '35 cm2', '60 cm2'], correta: 2, explicacao: 'Area = (10*6)/2 = 30 cm2' },
  { id: 23, area: 'matematica', enunciado: 'Probabilidade de numero par em um dado:', alternativas: ['1/6', '1/3', '1/2', '2/3', '5/6'], correta: 2, explicacao: '3 pares de 6 faces = 1/2' },
  { id: 24, area: 'matematica', enunciado: 'Quanto e 25% de 80?', alternativas: ['15', '18', '20', '22', '25'], correta: 2, explicacao: '0.25 * 80 = 20' },
  { id: 25, area: 'matematica', enunciado: 'Raiz quadrada de 144:', alternativas: ['10', '11', '12', '13', '14'], correta: 2, explicacao: '12 * 12 = 144' },
  { id: 26, area: 'humanas', enunciado: 'Era Vargas no Brasil:', alternativas: ['1922-1945', '1930-1945', '1930-1954', '1937-1945', '1937-1954'], correta: 1, explicacao: '1930 a 1945' },
  { id: 27, area: 'natureza', enunciado: 'Unidade de corrente eletrica no SI:', alternativas: ['Volt', 'Watt', 'Ohm', 'Ampere', 'Coulomb'], correta: 3, explicacao: 'Ampere (A)' },
  { id: 28, area: 'humanas', enunciado: 'Teoria da mais-valia - autor:', alternativas: ['Adam Smith', 'Locke', 'Marx', 'Weber', 'Hobbes'], correta: 2, explicacao: 'Karl Marx em O Capital' },
  { id: 29, area: 'natureza', enunciado: 'Pareamento de bases do DNA:', alternativas: ['A-C e G-T', 'A-T e C-G', 'A-G e C-T', 'A-U e C-G', 'G-T e A-C'], correta: 1, explicacao: 'Adenina-Timina e Citosina-Guanina' },
  { id: 30, area: 'linguagens', enunciado: 'Movimento com pessimismo e analise psicologica:', alternativas: ['Romantismo', 'Realismo', 'Barroco', 'Arcadismo', 'Trovadorismo'], correta: 1, explicacao: 'Realismo' }
];

export default function SimuladoInicioPage() {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(10);
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIniciarSimulado = () => {
    setLoading(true);
    let questoesFiltradas = area ? bancodeQuestoes.filter(q => q.area === area) : bancodeQuestoes;
    questoesFiltradas = questoesFiltradas.sort(() => Math.random() - 0.5);
    const questoesSelecionadas = questoesFiltradas.slice(0, Math.min(quantidade, questoesFiltradas.length));
    const simuladoId = 'sim_' + Date.now();
    const simuladoData = { id: simuladoId, questoes: questoesSelecionadas, respostas: {}, questaoAtual: 0, inicio: new Date().toISOString(), area: area || 'todas', quantidade: questoesSelecionadas.length };
    localStorage.setItem('simulado_em_andamento', JSON.stringify(simuladoData));
    router.push('/enem/simulado/' + simuladoId);
  };

  return (
    <div className="min-h-screen bg-[#0D1F22] text-white flex items-center justify-center py-12 pt-20 px-4">
      <FloatingNav />
      <div className="w-full max-w-3xl">
        <div className="card-ia p-6">
          <div className="text-center mb-8">
            <h1 className="title-ia text-2xl md:text-3xl mb-3">🎯 Configurar Simulado</h1>
            <p className="text-gray-400">Personalize seu simulado e teste seus conhecimentos</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-white font-bold text-lg mb-4">📝 Questoes: <span className="text-emerald-400">{quantidade}</span></label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[10, 15, 20].map(qtd => (
                  <button key={qtd} onClick={() => setQuantidade(qtd)} className={\`py-3 rounded-lg font-medium transition-all \${quantidade === qtd ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}\`}>{qtd} questoes</button>
                ))}
              </div>
              <input type="range" min="5" max="30" step="5" value={quantidade} onChange={(e) => setQuantidade(parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-4 text-center"><span className="text-blue-400">⏱️</span> Tempo estimado: ~{Math.round(quantidade * 2)} min</div>
            </div>
            <div className="border-t border-white/10"></div>
            <div>
              <label className="block text-white font-bold text-lg mb-4">📚 Area de Conhecimento</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[{ id: '', label: '🌐 Todas' }, { id: 'matematica', label: '📐 Matematica' }, { id: 'linguagens', label: '📚 Linguagens' }, { id: 'humanas', label: '🌍 Humanas' }, { id: 'natureza', label: '🔬 Natureza' }].map(opt => (
                  <button key={opt.id} onClick={() => setArea(opt.id)} className={\`p-3 rounded-lg transition-all \${area === opt.id ? 'bg-emerald-600 border-2 border-emerald-400' : 'bg-white/10 border-2 border-transparent hover:bg-white/20'}\`}>{opt.label}</button>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10"></div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h4 className="text-white font-bold mb-3">ℹ️ Sobre este Simulado</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ Questoes no estilo ENEM</li>
                <li>✓ Explicacoes detalhadas ao finalizar</li>
                <li>✓ Salva progresso automaticamente</li>
                <li>✓ Ganhe FP ao concluir</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleIniciarSimulado} disabled={loading} className="btn-ia flex-1 py-4 text-lg flex items-center justify-center gap-2">{loading ? (<><span className="animate-spin">🔄</span> Preparando...</>) : (<><span>🚀</span> Iniciar Simulado</>)}</button>
              <button onClick={() => router.push('/enem')} className="py-4 px-6 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">← Voltar</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="stat-ia text-center"><div className="text-2xl font-bold text-emerald-400">30+</div><div className="text-gray-400 text-sm">Questoes</div></div>
          <div className="stat-ia text-center"><div className="text-2xl font-bold text-blue-400">100%</div><div className="text-gray-400 text-sm">Estilo ENEM</div></div>
          <div className="stat-ia text-center"><div className="text-2xl font-bold text-purple-400">+FP</div><div className="text-gray-400 text-sm">Recompensas</div></div>
        </div>
      </div>
      <ChalkBackToTop />
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/enem/simulado/page.tsx', content);
console.log('Simulado page fixed!');
