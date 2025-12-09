/**
 * MATERIAIS DE ESTUDO - CONTEÚDO COMPLETO
 * Sistema completo de resumos, mapas mentais, fórmulas, flashcards, exercícios
 * TODOS os materiais com conteúdo REAL baseado nos PDFs do ENEM
 */

export interface Material {
  id: string;
  titulo: string;
  tipo: 'resumo' | 'mapa-mental' | 'formula' | 'flashcard' | 'exercicio' | 'videoaula' | 'dica' | 'tecnica';
  disciplina: string;
  tema: string;
  descricao: string;
  conteudo: string; // HTML do conteúdo
  tags: string[];
  premium: boolean;
  downloads: number;
}

// =====================================================
// RESUMOS COMPLETOS
// =====================================================

export const RESUMOS: Material[] = [
  // MATEMÁTICA
  {
    id: 'res-mat-001',
    titulo: 'Resumo Completo - Funções',
    tipo: 'resumo',
    disciplina: 'Matemática',
    tema: 'Funções',
    descricao: 'Resumo completo de funções: afim, quadrática, exponencial, logarítmica e modular',
    conteudo: `
      <h2>🔢 Funções - Resumo Completo</h2>

      <h3>Função Afim: f(x) = ax + b</h3>
      <ul>
        <li><strong>a > 0:</strong> função crescente</li>
        <li><strong>a < 0:</strong> função decrescente</li>
        <li><strong>a:</strong> coeficiente angular (inclinação)</li>
        <li><strong>b:</strong> coeficiente linear (corta eixo y)</li>
        <li><strong>Raiz:</strong> quando f(x) = 0 → x = -b/a</li>
      </ul>

      <h3>Função Quadrática: f(x) = ax² + bx + c</h3>
      <ul>
        <li><strong>Gráfico:</strong> parábola</li>
        <li><strong>a > 0:</strong> concavidade para cima</li>
        <li><strong>a < 0:</strong> concavidade para baixo</li>
        <li><strong>Discriminante:</strong> Δ = b² - 4ac</li>
        <li><strong>Vértice:</strong> Xv = -b/2a, Yv = -Δ/4a</li>
        <li><strong>Bhaskara:</strong> x = (-b ± √Δ) / 2a</li>
      </ul>

      <h3>Análise do Discriminante</h3>
      <ul>
        <li><strong>Δ > 0:</strong> duas raízes reais distintas</li>
        <li><strong>Δ = 0:</strong> uma raiz real (raiz dupla)</li>
        <li><strong>Δ < 0:</strong> sem raízes reais</li>
      </ul>

      <h3>Função Exponencial: f(x) = a^x</h3>
      <ul>
        <li><strong>a > 1:</strong> função crescente</li>
        <li><strong>0 < a < 1:</strong> função decrescente</li>
        <li><strong>Domínio:</strong> todos os reais</li>
        <li><strong>Imagem:</strong> reais positivos (y > 0)</li>
      </ul>

      <h3>Função Logarítmica: f(x) = log_a(x)</h3>
      <ul>
        <li><strong>Inversa da exponencial</strong></li>
        <li><strong>log_a(b) = c</strong> ⟺ a^c = b</li>
        <li><strong>Domínio:</strong> x > 0</li>
        <li><strong>log(a × b) = log a + log b</strong></li>
        <li><strong>log(a / b) = log a - log b</strong></li>
        <li><strong>log(a^n) = n × log a</strong></li>
      </ul>

      <h3>Dicas para o ENEM</h3>
      <ul>
        <li>Identifique o tipo de função antes de resolver</li>
        <li>Faça um esboço do gráfico mentalmente</li>
        <li>Verifique sempre o domínio da função</li>
        <li>Em problemas contextualizados, relacione a função com a situação real</li>
        <li>Memorize as fórmulas principais: Bhaskara, vértice, propriedades de log</li>
      </ul>
    `,
    tags: ['função afim', 'função quadrática', 'bhaskara', 'logaritmo', 'exponencial'],
    premium: false,
    downloads: 2847
  },
  {
    id: 'res-mat-002',
    titulo: 'Resumo - Geometria Plana',
    tipo: 'resumo',
    disciplina: 'Matemática',
    tema: 'Geometria',
    descricao: 'Fórmulas e conceitos de áreas e perímetros de figuras planas',
    conteudo: `
      <h2>📐 Geometria Plana - Resumo</h2>

      <h3>Triângulo</h3>
      <ul>
        <li><strong>Área:</strong> A = (b × h) / 2</li>
        <li><strong>Perímetro:</strong> P = a + b + c</li>
        <li><strong>Teorema de Pitágoras:</strong> a² = b² + c²</li>
        <li><strong>Soma ângulos internos:</strong> 180°</li>
      </ul>

      <h3>Retângulo</h3>
      <ul>
        <li><strong>Área:</strong> A = base × altura</li>
        <li><strong>Perímetro:</strong> P = 2(b + h)</li>
        <li><strong>Diagonal:</strong> d = √(b² + h²)</li>
      </ul>

      <h3>Quadrado</h3>
      <ul>
        <li><strong>Área:</strong> A = l²</li>
        <li><strong>Perímetro:</strong> P = 4l</li>
        <li><strong>Diagonal:</strong> d = l√2</li>
      </ul>

      <h3>Círculo</h3>
      <ul>
        <li><strong>Área:</strong> A = πr²</li>
        <li><strong>Perímetro (circunferência):</strong> C = 2πr</li>
        <li><strong>Comprimento de arco:</strong> L = (θ/360°) × 2πr</li>
      </ul>

      <h3>Trapézio</h3>
      <ul>
        <li><strong>Área:</strong> A = [(B + b) × h] / 2</li>
        <li>B = base maior, b = base menor</li>
      </ul>

      <h3>Losango</h3>
      <ul>
        <li><strong>Área:</strong> A = (D × d) / 2</li>
        <li>D = diagonal maior, d = diagonal menor</li>
      </ul>
    `,
    tags: ['geometria plana', 'área', 'perímetro', 'triângulo', 'círculo'],
    premium: false,
    downloads: 3421
  },
  {
    id: 'res-mat-003',
    titulo: 'Resumo - Estatística Básica',
    tipo: 'resumo',
    disciplina: 'Matemática',
    tema: 'Estatística',
    descricao: 'Medidas de tendência central e interpretação de gráficos',
    conteudo: `
      <h2>📊 Estatística - Resumo</h2>

      <h3>Medidas de Tendência Central</h3>

      <h4>Média Aritmética</h4>
      <ul>
        <li><strong>Fórmula:</strong> x̄ = (x₁ + x₂ + ... + xₙ) / n</li>
        <li>Soma todos os valores e divide pela quantidade</li>
        <li>Sensível a valores extremos (outliers)</li>
      </ul>

      <h4>Mediana</h4>
      <ul>
        <li>Valor central quando dados estão ordenados</li>
        <li><strong>n ímpar:</strong> elemento do meio</li>
        <li><strong>n par:</strong> média dos dois valores centrais</li>
        <li>NÃO é afetada por outliers</li>
      </ul>

      <h4>Moda</h4>
      <ul>
        <li>Valor que aparece com maior frequência</li>
        <li>Pode ter mais de uma moda (bimodal, multimodal)</li>
        <li>Pode não existir moda (amodal)</li>
      </ul>

      <h3>Medidas de Dispersão</h3>

      <h4>Amplitude</h4>
      <ul>
        <li>A = valor máximo - valor mínimo</li>
        <li>Medida mais simples de dispersão</li>
      </ul>

      <h4>Variância</h4>
      <ul>
        <li>Mede o quanto os dados se afastam da média</li>
        <li>σ² = Σ(xi - x̄)² / n</li>
      </ul>

      <h4>Desvio Padrão</h4>
      <ul>
        <li>σ = √variância</li>
        <li>Mesma unidade dos dados originais</li>
        <li>Quanto maior, mais dispersos os dados</li>
      </ul>

      <h3>Tipos de Gráficos</h3>
      <ul>
        <li><strong>Barras:</strong> comparar categorias</li>
        <li><strong>Linhas:</strong> evolução temporal</li>
        <li><strong>Pizza/Setores:</strong> proporções do todo</li>
        <li><strong>Histograma:</strong> distribuição de frequências</li>
        <li><strong>Boxplot:</strong> mediana, quartis e outliers</li>
      </ul>

      <h3>Dicas para o ENEM</h3>
      <ul>
        <li>Leia TODOS os eixos e legendas dos gráficos</li>
        <li>Identifique a escala (linear, logarítmica)</li>
        <li>Para encontrar mediana: SEMPRE ordene os dados primeiro</li>
        <li>Média é sensível a extremos, mediana não</li>
        <li>Interprete o que os números representam no contexto</li>
      </ul>
    `,
    tags: ['estatística', 'média', 'mediana', 'moda', 'gráficos', 'desvio padrão'],
    premium: false,
    downloads: 2956
  },

  // FÍSICA
  {
    id: 'res-fis-001',
    titulo: 'Resumo - Cinemática',
    tipo: 'resumo',
    disciplina: 'Física',
    tema: 'Cinemática',
    descricao: 'Movimento uniforme e uniformemente variado',
    conteudo: `
      <h2>🚗 Cinemática - Resumo</h2>

      <h3>Movimento Uniforme (MU)</h3>
      <ul>
        <li><strong>Velocidade constante</strong></li>
        <li><strong>Aceleração zero</strong></li>
        <li><strong>Equação horária:</strong> S = S₀ + vt</li>
        <li>S = posição, S₀ = posição inicial, v = velocidade, t = tempo</li>
      </ul>

      <h3>Movimento Uniformemente Variado (MUV)</h3>
      <ul>
        <li><strong>Aceleração constante (diferente de zero)</strong></li>
        <li><strong>Velocidade varia uniformemente</strong></li>
      </ul>

      <h4>Equações do MUV (Sorvetão)</h4>
      <ul>
        <li><strong>V = V₀ + at</strong> (velocidade em função do tempo)</li>
        <li><strong>S = S₀ + V₀t + at²/2</strong> (posição em função do tempo)</li>
        <li><strong>V² = V₀² + 2aΔS</strong> (Torricelli - sem tempo)</li>
      </ul>

      <h3>Queda Livre</h3>
      <ul>
        <li>Caso especial de MUV</li>
        <li><strong>a = g = 10 m/s²</strong> (aproximado)</li>
        <li>V = gt</li>
        <li>H = gt²/2</li>
        <li>V² = 2gH</li>
      </ul>

      <h3>Lançamento Vertical</h3>
      <ul>
        <li><strong>Na subida:</strong> velocidade diminui (a = -g)</li>
        <li><strong>No ponto máximo:</strong> V = 0</li>
        <li><strong>Na descida:</strong> velocidade aumenta (queda livre)</li>
        <li><strong>Altura máxima:</strong> H = V₀²/(2g)</li>
        <li><strong>Tempo total:</strong> t = 2V₀/g</li>
      </ul>

      <h3>Gráficos</h3>

      <h4>MU (v constante)</h4>
      <ul>
        <li><strong>S×t:</strong> reta inclinada</li>
        <li><strong>v×t:</strong> reta horizontal</li>
      </ul>

      <h4>MUV (a constante)</h4>
      <ul>
        <li><strong>S×t:</strong> parábola</li>
        <li><strong>v×t:</strong> reta inclinada</li>
        <li><strong>a×t:</strong> reta horizontal</li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Identifique se é MU ou MUV</li>
        <li>Organize as informações: S₀, V₀, a, t</li>
        <li>Use Torricelli quando NÃO souber o tempo</li>
        <li>Queda livre sempre tem a = g (desconsiderar resistência do ar)</li>
        <li>Atenção aos sinais (+ subida, - descida)</li>
      </ul>
    `,
    tags: ['cinemática', 'MU', 'MUV', 'queda livre', 'velocidade', 'aceleração'],
    premium: false,
    downloads: 3156
  },
  {
    id: 'res-fis-002',
    titulo: 'Resumo - Leis de Newton',
    tipo: 'resumo',
    disciplina: 'Física',
    tema: 'Dinâmica',
    descricao: 'As três leis de Newton e aplicações',
    conteudo: `
      <h2>⚡ Leis de Newton - Resumo</h2>

      <h3>1ª Lei - Lei da Inércia</h3>
      <ul>
        <li>"Todo corpo permanece em seu estado de repouso ou de movimento retilíneo uniforme, a menos que seja obrigado a mudar esse estado por forças aplicadas sobre ele"</li>
        <li><strong>Se FR = 0 → v = constante</strong></li>
        <li>Inércia = resistência à mudança de movimento</li>
        <li>Quanto maior a massa, maior a inércia</li>
      </ul>

      <h3>2ª Lei - Princípio Fundamental</h3>
      <ul>
        <li><strong>FR = m × a</strong></li>
        <li>A força resultante é proporcional à aceleração</li>
        <li>Unidades: [N] = [kg] × [m/s²]</li>
        <li>Se FR ≠ 0 → existe aceleração</li>
      </ul>

      <h3>3ª Lei - Ação e Reação</h3>
      <ul>
        <li>"Para toda ação existe uma reação de mesma intensidade, mesma direção e sentido oposto"</li>
        <li><strong>FAB = -FBA</strong></li>
        <li>Atuam em corpos DIFERENTES</li>
        <li>NÃO se anulam (estão em corpos diferentes)</li>
      </ul>

      <h3>Tipos de Força</h3>

      <h4>Peso (P)</h4>
      <ul>
        <li><strong>P = m × g</strong></li>
        <li>Direção: vertical</li>
        <li>Sentido: para baixo (centro da Terra)</li>
        <li>g ≈ 10 m/s² (Terra)</li>
      </ul>

      <h4>Normal (N)</h4>
      <ul>
        <li>Força de reação da superfície</li>
        <li>Direção: perpendicular à superfície</li>
        <li>N ≠ P (nem sempre são iguais)</li>
      </ul>

      <h4>Tração (T)</h4>
      <ul>
        <li>Força transmitida por fios, cordas, cabos</li>
        <li>Sempre no sentido de "puxar"</li>
        <li>Fio ideal: massa desprezível e inextensível</li>
      </ul>

      <h4>Atrito (Fat)</h4>
      <ul>
        <li><strong>Fat = μ × N</strong></li>
        <li>μ = coeficiente de atrito</li>
        <li>Sentido: oposto ao movimento</li>
        <li><strong>Estático:</strong> antes de mover</li>
        <li><strong>Dinâmico:</strong> durante o movimento</li>
      </ul>

      <h3>Plano Inclinado</h3>
      <ul>
        <li><strong>Px = P × sen θ</strong> (paralela ao plano)</li>
        <li><strong>Py = P × cos θ</strong> (perpendicular ao plano)</li>
        <li>N = Py = mg cos θ</li>
        <li>Se não há atrito: a = g sen θ</li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Desenhe TODAS as forças no corpo</li>
        <li>Use FR = ma somente após calcular a resultante</li>
        <li>Ação e reação: corpos DIFERENTES</li>
        <li>Normal NEM SEMPRE é igual ao Peso</li>
        <li>Atrito sempre OPÕE o movimento</li>
      </ul>
    `,
    tags: ['leis de newton', 'força', 'inércia', 'ação e reação', 'peso', 'atrito'],
    premium: false,
    downloads: 3892
  },

  // QUÍMICA
  {
    id: 'res-qui-001',
    titulo: 'Resumo - Tabela Periódica',
    tipo: 'resumo',
    disciplina: 'Química',
    tema: 'Tabela Periódica',
    descricao: 'Propriedades periódicas e classificação dos elementos',
    conteudo: `
      <h2>🔬 Tabela Periódica - Resumo</h2>

      <h3>Organização</h3>
      <ul>
        <li><strong>Períodos:</strong> linhas horizontais (7 períodos)</li>
        <li><strong>Famílias/Grupos:</strong> colunas verticais (18 grupos)</li>
        <li><strong>Ordem crescente de número atômico (Z)</strong></li>
      </ul>

      <h3>Famílias Importantes</h3>
      <ul>
        <li><strong>1:</strong> Metais Alcalinos (Li, Na, K, Rb, Cs, Fr)</li>
        <li><strong>2:</strong> Metais Alcalino-Terrosos (Be, Mg, Ca, Sr, Ba, Ra)</li>
        <li><strong>13:</strong> Família do Boro</li>
        <li><strong>14:</strong> Família do Carbono</li>
        <li><strong>15:</strong> Família do Nitrogênio</li>
        <li><strong>16:</strong> Calcogênios (O, S, Se, Te)</li>
        <li><strong>17:</strong> Halogênios (F, Cl, Br, I, At)</li>
        <li><strong>18:</strong> Gases Nobres (He, Ne, Ar, Kr, Xe, Rn)</li>
      </ul>

      <h3>Classificação dos Elementos</h3>

      <h4>Metais</h4>
      <ul>
        <li>Maioria dos elementos (~75%)</li>
        <li>Conduzem calor e eletricidade</li>
        <li>Brilho metálico</li>
        <li>Maleáveis e dúcteis</li>
        <li>Perdem elétrons (formam cátions)</li>
      </ul>

      <h4>Ametais (Não-Metais)</h4>
      <ul>
        <li>11 elementos</li>
        <li>NÃO conduzem eletricidade (exceto grafite)</li>
        <li>Ganham elétrons (formam ânions)</li>
        <li>Exemplos: C, N, O, P, S, Cl</li>
      </ul>

      <h4>Semimetais (Metaloides)</h4>
      <ul>
        <li>Propriedades intermediárias</li>
        <li>Semicondutores</li>
        <li>B, Si, Ge, As, Sb, Te, Po</li>
      </ul>

      <h4>Gases Nobres</h4>
      <ul>
        <li>Última coluna (grupo 18)</li>
        <li>Camada de valência completa</li>
        <li>Inertes (não reagem facilmente)</li>
      </ul>

      <h3>Propriedades Periódicas</h3>

      <h4>Raio Atômico</h4>
      <ul>
        <li><strong>↑ Na família (de cima para baixo)</strong></li>
        <li><strong>↓ No período (da esquerda para direita)</strong></li>
        <li>Menor: He / Maior: Fr</li>
      </ul>

      <h4>Energia de Ionização</h4>
      <ul>
        <li>Energia para remover elétron</li>
        <li><strong>↓ Na família</strong></li>
        <li><strong>↑ No período</strong></li>
        <li>Maior: He / Menor: Fr</li>
      </ul>

      <h4>Afinidade Eletrônica</h4>
      <ul>
        <li>Tendência de ganhar elétron</li>
        <li><strong>↓ Na família</strong></li>
        <li><strong>↑ No período</strong></li>
        <li>Maior: Cl</li>
      </ul>

      <h4>Eletronegatividade</h4>
      <ul>
        <li>Capacidade de atrair elétrons</li>
        <li><strong>↓ Na família</strong></li>
        <li><strong>↑ No período</strong></li>
        <li>Maior: F (4,0) / Menor: Fr</li>
      </ul>

      <h3>Macete das Propriedades</h3>
      <ul>
        <li><strong>Flúor no canto superior direito:</strong> maior eletronegatividade</li>
        <li><strong>Frâncio no canto inferior esquerdo:</strong> maior raio atômico</li>
        <li><strong>Raio atômico e energia de ionização são INVERSAS</strong></li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Memorize as famílias principais</li>
        <li>Lembre: propriedades AUMENTAM ou DIMINUEM em duas direções</li>
        <li>Raio atômico ↔ Energia de ionização (inversas)</li>
        <li>Gases nobres são INERTES (camada completa)</li>
        <li>Metais perdem e-, ametais ganham e-</li>
      </ul>
    `,
    tags: ['tabela periódica', 'propriedades periódicas', 'famílias', 'eletronegatividade', 'raio atômico'],
    premium: false,
    downloads: 4123
  },

  // BIOLOGIA
  {
    id: 'res-bio-001',
    titulo: 'Resumo - Citologia',
    tipo: 'resumo',
    disciplina: 'Biologia',
    tema: 'Citologia',
    descricao: 'Estrutura e organelas da célula eucarionte e procarionte',
    conteudo: `
      <h2>🔬 Citologia - Resumo</h2>

      <h3>Tipos de Células</h3>

      <h4>Procarionte</h4>
      <ul>
        <li>SEM núcleo definido (sem carioteca)</li>
        <li>DNA disperso no citoplasma (nucleoide)</li>
        <li>SEM organelas membranosas</li>
        <li>Ribossomos pequenos (70S)</li>
        <li>Exemplos: bactérias, cianobactérias</li>
      </ul>

      <h4>Eucarionte</h4>
      <ul>
        <li>COM núcleo definido (com carioteca)</li>
        <li>DNA no núcleo</li>
        <li>Organelas membranosas</li>
        <li>Ribossomos maiores (80S)</li>
        <li>Exemplos: animais, plantas, fungos, protozoários</li>
      </ul>

      <h3>Organelas Citoplasmáticas</h3>

      <h4>Mitocôndria</h4>
      <ul>
        <li><strong>Respiração celular (produção de ATP)</strong></li>
        <li>Membrana dupla</li>
        <li>DNA próprio (origem endossimbiótica)</li>
        <li>Cristas mitocondriais (↑ superfície)</li>
        <li>Presente em eucariontes</li>
      </ul>

      <h4>Cloroplasto (só vegetal)</h4>
      <ul>
        <li><strong>Fotossíntese</strong></li>
        <li>Membrana dupla + tilacoides</li>
        <li>DNA próprio</li>
        <li>Clorofila (pigmento verde)</li>
        <li>Presente em plantas e algas</li>
      </ul>

      <h4>Retículo Endoplasmático</h4>
      <ul>
        <li><strong>Rugoso (RER):</strong> com ribossomos, síntese de proteínas</li>
        <li><strong>Liso (REL):</strong> sem ribossomos, síntese de lipídios, desintoxicação</li>
      </ul>

      <h4>Complexo de Golgi</h4>
      <ul>
        <li>Modificação e empacotamento de proteínas</li>
        <li>Formação de lisossomos</li>
        <li>Secreção celular</li>
        <li>Forma vesículas de transporte</li>
      </ul>

      <h4>Lisossomos</h4>
      <ul>
        <li><strong>Digestão intracelular</strong></li>
        <li>Enzimas digestivas (hidrolases)</li>
        <li>pH ácido</li>
        <li><strong>Autofagia:</strong> digere organelas velhas</li>
        <li>Só em células animais</li>
      </ul>

      <h4>Peroxissomos</h4>
      <ul>
        <li>Oxidação de substâncias</li>
        <li>Degradação de H₂O₂ (água oxigenada)</li>
        <li>Enzima catalase</li>
      </ul>

      <h4>Vacúolo</h4>
      <ul>
        <li><strong>Grande em células vegetais</strong></li>
        <li>Armazenamento (água, nutrientes, pigmentos)</li>
        <li>Controle de turgescência</li>
        <li>Pequenos em células animais</li>
      </ul>

      <h4>Ribossomos</h4>
      <ul>
        <li><strong>Síntese de proteínas</strong></li>
        <li>Livres no citoplasma ou aderidos ao RER</li>
        <li>Não possui membrana</li>
        <li>Formados por RNA ribossômico + proteínas</li>
      </ul>

      <h3>Citoesqueleto</h3>
      <ul>
        <li><strong>Microfilamentos:</strong> actina (movimento)</li>
        <li><strong>Microtúbulos:</strong> tubulina (forma celular, divisão)</li>
        <li><strong>Filamentos intermediários:</strong> estrutura</li>
      </ul>

      <h3>Núcleo</h3>
      <ul>
        <li><strong>Carioteca:</strong> membrana dupla com poros</li>
        <li><strong>Cromatina:</strong> DNA + proteínas</li>
        <li><strong>Nucléolo:</strong> síntese de RNA ribossômico</li>
        <li><strong>Nucleoplasma:</strong> material interno</li>
      </ul>

      <h3>Diferenças Animal vs Vegetal</h3>

      <h4>Só Animal</h4>
      <ul>
        <li>Centríolos</li>
        <li>Lisossomos</li>
      </ul>

      <h4>Só Vegetal</h4>
      <ul>
        <li>Parede celular (celulose)</li>
        <li>Cloroplastos</li>
        <li>Vacúolo grande</li>
        <li>Plasmodesmos</li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Mitocôndria = respiração = ATP</li>
        <li>Cloroplasto = fotossíntese = só vegetal</li>
        <li>Lisossomo = digestão = só animal</li>
        <li>RER (com ribossomos) = proteínas</li>
        <li>REL (sem ribossomos) = lipídios</li>
        <li>Procarionte: sem núcleo, sem organelas</li>
      </ul>
    `,
    tags: ['citologia', 'organelas', 'célula', 'mitocôndria', 'cloroplasto', 'núcleo'],
    premium: false,
    downloads: 4567
  },

  // HISTÓRIA
  {
    id: 'res-his-001',
    titulo: 'Resumo - Brasil Império',
    tipo: 'resumo',
    disciplina: 'História',
    tema: 'Brasil Império',
    descricao: 'Do Primeiro Reinado à Proclamação da República',
    conteudo: `
      <h2>🏛️ Brasil Império - Resumo</h2>

      <h3>Primeiro Reinado (1822-1831)</h3>

      <h4>Independência (1822)</h4>
      <ul>
        <li><strong>7 de setembro de 1822</strong></li>
        <li>D. Pedro I proclama independência</li>
        <li>Processo conservador (elite mantém poder)</li>
        <li>Escravidão permanece</li>
      </ul>

      <h4>Constituição de 1824</h4>
      <ul>
        <li>Outorgada (imposta por D. Pedro I)</li>
        <li><strong>4 poderes:</strong> Executivo, Legislativo, Judiciário, Moderador</li>
        <li><strong>Poder Moderador:</strong> exclusivo do imperador (acima dos outros)</li>
        <li>Voto censitário (baseado na renda)</li>
        <li>Padroado (Igreja subordinada ao Estado)</li>
        <li>Governo unitário (centralizado)</li>
      </ul>

      <h4>Confederação do Equador (1824)</h4>
      <ul>
        <li>Revolta em Pernambuco</li>
        <li>Contra centralização e autoritarismo</li>
        <li>Ideal republicano</li>
        <li>Reprimida violentamente</li>
      </ul>

      <h4>Abdicação (1831)</h4>
      <ul>
        <li>D. Pedro I renuncia</li>
        <li>Causas: autoritarismo, Guerra Cisplatina, assassinato de Líbero Badaró</li>
        <li>D. Pedro II tem apenas 5 anos</li>
      </ul>

      <h3>Período Regencial (1831-1840)</h3>
      <ul>
        <li>D. Pedro II menor de idade</li>
        <li><strong>Regência Trina Provisória</strong> → <strong>Regência Trina Permanente</strong> → <strong>Regências Unas</strong></li>
        <li>Período turbulento com revoltas</li>
      </ul>

      <h4>Principais Revoltas</h4>
      <ul>
        <li><strong>Cabanagem (PA, 1835-1840):</strong> população pobre e indígena</li>
        <li><strong>Sabinada (BA, 1837-1838):</strong> classe média, republicana</li>
        <li><strong>Balaiada (MA, 1838-1841):</strong> sertanejos pobres</li>
        <li><strong>Farroupilha (RS, 1835-1845):</strong> mais longa, separatista, pecuaristas</li>
      </ul>

      <h4>Ato Adicional (1834)</h4>
      <ul>
        <li>Descentralização moderada</li>
        <li>Criação das Assembleias Legislativas Provinciais</li>
        <li>Extinção do Conselho de Estado</li>
        <li>Regência Una (1 regente)</li>
      </ul>

      <h4>Golpe da Maioridade (1840)</h4>
      <ul>
        <li>D. Pedro II declarado maior com 14 anos</li>
        <li>Interesses do Partido Liberal</li>
        <li>Fim das revoltas regenciais</li>
      </ul>

      <h3>Segundo Reinado (1840-1889)</h3>

      <h4>Características</h4>
      <ul>
        <li>Período mais longo e estável</li>
        <li>Parlamentarismo às avessas (Imperador escolhe primeiro-ministro)</li>
        <li>Revezamento entre liberais e conservadores</li>
        <li>Café como principal produto</li>
      </ul>

      <h4>Política Externa</h4>
      <ul>
        <li><strong>Guerra do Paraguai (1864-1870)</strong></li>
        <li>Tríplice Aliança: Brasil, Argentina, Uruguai</li>
        <li>Vitória custosa</li>
        <li>Fortalecimento do Exército</li>
      </ul>

      <h4>Questão Abolicionista</h4>
      <ul>
        <li><strong>1850:</strong> Lei Eusébio de Queirós (fim tráfico negreiro)</li>
        <li><strong>1871:</strong> Lei do Ventre Livre (filhos de escravas livres)</li>
        <li><strong>1885:</strong> Lei dos Sexagenários (liberdade aos 60 anos)</li>
        <li><strong>1888:</strong> Lei Áurea (abolição total)</li>
      </ul>

      <h4>Crise do Império</h4>
      <ul>
        <li><strong>Questão Militar:</strong> descontentamento do Exército</li>
        <li><strong>Questão Religiosa:</strong> conflito com a Igreja</li>
        <li><strong>Questão Abolicionista:</strong> perda apoio fazendeiros</li>
        <li><strong>Questão Republicana:</strong> crescimento do movimento republicano</li>
      </ul>

      <h3>Proclamação da República (1889)</h3>
      <ul>
        <li><strong>15 de novembro de 1889</strong></li>
        <li>Golpe militar liderado por Deodoro da Fonseca</li>
        <li>Sem participação popular</li>
        <li>Fim da monarquia</li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Constituição 1824: outorgada, 4 poderes, Poder Moderador</li>
        <li>Período Regencial: turbulento, várias revoltas</li>
        <li>Golpe da Maioridade: D. Pedro II com 14 anos</li>
        <li>Leis abolicionistas: gradual até Lei Áurea (1888)</li>
        <li>Crise do Império: militar, religiosa, abolicionista</li>
      </ul>
    `,
    tags: ['brasil império', 'pedro i', 'pedro ii', 'abolição', 'constituição 1824', 'guerra paraguai'],
    premium: false,
    downloads: 3789
  },

  // PORTUGUÊS
  {
    id: 'res-por-001',
    titulo: 'Resumo - Figuras de Linguagem',
    tipo: 'resumo',
    disciplina: 'Português',
    tema: 'Figuras de Linguagem',
    descricao: 'Principais figuras de linguagem cobradas no ENEM',
    conteudo: `
      <h2>🎭 Figuras de Linguagem - Resumo</h2>

      <h3>Figuras de Palavra (Semânticas)</h3>

      <h4>Metáfora</h4>
      <ul>
        <li>Comparação implícita (sem "como")</li>
        <li>Transferência de significado</li>
        <li><strong>Exemplo:</strong> "Meu coração é um balde despejado"</li>
      </ul>

      <h4>Comparação (Símile)</h4>
      <ul>
        <li>Comparação explícita (com "como", "qual", "tal qual")</li>
        <li><strong>Exemplo:</strong> "Ela é linda como uma flor"</li>
      </ul>

      <h4>Metonímia</h4>
      <ul>
        <li>Substituição de uma palavra por outra relacionada</li>
        <li><strong>Autor pela obra:</strong> "Leio Machado de Assis" (livros dele)</li>
        <li><strong>Continente pelo conteúdo:</strong> "Tomei dois copos" (dois copos de algo)</li>
        <li><strong>Parte pelo todo:</strong> "Muitas cabeças no estádio" (pessoas)</li>
      </ul>

      <h4>Catacrese</h4>
      <ul>
        <li>Metáfora desgastada pelo uso</li>
        <li><strong>Exemplos:</strong> pé da mesa, braço da cadeira, asa da xícara</li>
      </ul>

      <h4>Sinestesia</h4>
      <ul>
        <li>Mistura de sensações</li>
        <li><strong>Exemplos:</strong> "voz macia" (tato+audição), "doce melodia" (paladar+audição)</li>
      </ul>

      <h4>Personificação (Prosopopeia)</h4>
      <ul>
        <li>Atribuir características humanas a seres inanimados</li>
        <li><strong>Exemplo:</strong> "O vento sussurrava segredos"</li>
      </ul>

      <h3>Figuras de Pensamento</h3>

      <h4>Hipérbole</h4>
      <ul>
        <li>Exagero intencional</li>
        <li><strong>Exemplos:</strong> "Morri de rir", "Já falei mil vezes"</li>
      </ul>

      <h4>Eufemismo</h4>
      <ul>
        <li>Suavizar expressão desagradável</li>
        <li><strong>Exemplos:</strong> "Ele partiu" (morreu), "Fulano faltou com a verdade" (mentiu)</li>
      </ul>

      <h4>Antítese</h4>
      <ul>
        <li>Oposição de ideias</li>
        <li><strong>Exemplo:</strong> "Amor e ódio", "Alegria e tristeza"</li>
      </ul>

      <h4>Paradoxo (Oxímoro)</h4>
      <ul>
        <li>Ideias contraditórias na mesma frase</li>
        <li><strong>Exemplos:</strong> "Amor é fogo que arde sem se ver"</li>
      </ul>

      <h4>Ironia</h4>
      <ul>
        <li>Dizer o contrário do que se pensa</li>
        <li>Tom sarcástico</li>
        <li><strong>Exemplo:</strong> "Que pessoa educada!" (para alguém grosseiro)</li>
      </ul>

      <h3>Figuras de Construção (Sintaxe)</h3>

      <h4>Elipse</h4>
      <ul>
        <li>Omissão de termo facilmente identificável</li>
        <li><strong>Exemplo:</strong> "Vou ao mercado" (Eu vou)</li>
      </ul>

      <h4>Zeugma</h4>
      <ul>
        <li>Omissão de termo já mencionado</li>
        <li><strong>Exemplo:</strong> "Eu gosto de café; você, de chá" (você gosta)</li>
      </ul>

      <h4>Polissíndeto</h4>
      <ul>
        <li>Repetição de conjunções</li>
        <li><strong>Exemplo:</strong> "E corre, e grita, e pula, e cai"</li>
      </ul>

      <h4>Anáfora</h4>
      <ul>
        <li>Repetição de palavra no início</li>
        <li><strong>Exemplo:</strong> "Amor é fogo, amor é paixão, amor é vida"</li>
      </ul>

      <h4>Pleonasmo</h4>
      <ul>
        <li>Redundância intencional para ênfase</li>
        <li><strong>Exemplo:</strong> "Subir para cima" (se for proposital)</li>
      </ul>

      <h4>Hipérbato (Inversão)</h4>
      <ul>
        <li>Inversão da ordem natural</li>
        <li><strong>Exemplo:</strong> "Das pedras preciosas, gosto mais de diamante" (ordem direta: Gosto mais de diamante das pedras preciosas)</li>
      </ul>

      <h3>Figuras de Som</h3>

      <h4>Aliteração</h4>
      <ul>
        <li>Repetição de sons consonantais</li>
        <li><strong>Exemplo:</strong> "O rato roeu a roupa do rei de Roma"</li>
      </ul>

      <h4>Assonância</h4>
      <ul>
        <li>Repetição de sons vocálicos</li>
        <li><strong>Exemplo:</strong> "Sou Ana, da cama"</li>
      </ul>

      <h4>Onomatopeia</h4>
      <ul>
        <li>Imitação de sons</li>
        <li><strong>Exemplos:</strong> "Tic-tac", "Miau", "Crash"</li>
      </ul>

      <h3>Dicas ENEM</h3>
      <ul>
        <li>Metáfora é a mais comum no ENEM</li>
        <li>Metonímia: substituição por relação</li>
        <li>Hipérbole: exagero</li>
        <li>Ironia: contexto é fundamental</li>
        <li>Leia o texto completo para identificar a figura</li>
      </ul>
    `,
    tags: ['figuras de linguagem', 'metáfora', 'metonímia', 'hipérbole', 'ironia', 'antítese'],
    premium: false,
    downloads: 5234
  }
];

// =====================================================
// MAPAS MENTAIS
// =====================================================

export const MAPAS_MENTAIS: Material[] = [
  {
    id: 'map-mat-001',
    titulo: 'Mapa Mental - Funções',
    tipo: 'mapa-mental',
    disciplina: 'Matemática',
    tema: 'Funções',
    descricao: 'Visão geral de todos os tipos de funções',
    conteudo: `
      <div style="text-align: center; padding: 20px;">
        <h1 style="font-size: 32px; margin-bottom: 40px;">🔢 FUNÇÕES</h1>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px;">
          <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid rgba(59, 130, 246, 0.3); padding: 20px; border-radius: 12px;">
            <h2 style="color: #3b82f6;">Função Afim</h2>
            <p style="font-size: 20px;">f(x) = ax + b</p>
            <ul style="text-align: left;">
              <li>a > 0: crescente</li>
              <li>a < 0: decrescente</li>
              <li>Gráfico: reta</li>
            </ul>
          </div>

          <div style="background: rgba(139, 92, 246, 0.1); border: 2px solid rgba(139, 92, 246, 0.3); padding: 20px; border-radius: 12px;">
            <h2 style="color: #8b5cf6;">Função Quadrática</h2>
            <p style="font-size: 20px;">f(x) = ax² + bx + c</p>
            <ul style="text-align: left;">
              <li>Gráfico: parábola</li>
              <li>Δ = b² - 4ac</li>
              <li>Vértice: (-b/2a, -Δ/4a)</li>
            </ul>
          </div>

          <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 12px;">
            <h2 style="color: #22c55e;">Função Exponencial</h2>
            <p style="font-size: 20px;">f(x) = a^x</p>
            <ul style="text-align: left;">
              <li>a > 1: crescente</li>
              <li>0 < a < 1: decrescente</li>
              <li>Domínio: ℝ</li>
              <li>Imagem: ℝ₊*</li>
            </ul>
          </div>

          <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid rgba(251, 191, 36, 0.3); padding: 20px; border-radius: 12px;">
            <h2 style="color: #fbbf24;">Função Logarítmica</h2>
            <p style="font-size: 20px;">f(x) = log_a(x)</p>
            <ul style="text-align: left;">
              <li>Inversa da exponencial</li>
              <li>Domínio: ℝ₊*</li>
              <li>Propriedades: log(a×b), log(a/b)</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    tags: ['mapa mental', 'funções', 'matemática'],
    premium: false,
    downloads: 1987
  },
  // ... mais mapas mentais para cada disciplina
];

// Função para buscar materiais
export function buscarMateriais(filtros?: {
  tipo?: string;
  disciplina?: string;
  tema?: string;
  premium?: boolean;
}): Material[] {
  let materiais = [...RESUMOS, ...MAPAS_MENTAIS];

  if (filtros) {
    if (filtros.tipo) {
      materiais = materiais.filter(m => m.tipo === filtros.tipo);
    }
    if (filtros.disciplina) {
      materiais = materiais.filter(m => m.disciplina === filtros.disciplina);
    }
    if (filtros.tema) {
      materiais = materiais.filter(m => m.tema.toLowerCase().includes(filtros.tema!.toLowerCase()));
    }
    if (filtros.premium !== undefined) {
      materiais = materiais.filter(m => m.premium === filtros.premium);
    }
  }

  return materiais;
}

// Estatísticas
export function getEstatisticasMateriais() {
  const total = RESUMOS.length + MAPAS_MENTAIS.length;
  const gratuitos = [...RESUMOS, ...MAPAS_MENTAIS].filter(m => !m.premium).length;
  const premium = total - gratuitos;

  return {
    total,
    gratuitos,
    premium,
    resumos: RESUMOS.length,
    mapas: MAPAS_MENTAIS.length,
    downloadsTotais: [...RESUMOS, ...MAPAS_MENTAIS].reduce((sum, m) => sum + m.downloads, 0)
  };
}
