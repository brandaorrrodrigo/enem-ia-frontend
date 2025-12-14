# Sistema de KPIs do ENEM PRO

## Visão Geral

Este sistema define, calcula e agrega as métricas oficiais do ENEM PRO para medir o impacto real da plataforma na evolução dos estudantes.

## Arquivos

```
lib/kpis/
├── types.ts          # Tipos TypeScript para todas as métricas
├── definitions.ts    # Definições oficiais dos KPIs com fórmulas
├── calculator.ts     # Funções de cálculo dos KPIs
└── README.md         # Este arquivo

lib/relatorio/
└── template.ts       # Template do Relatório Anual de Impacto
```

## Como Usar

### 1. Calcular KPIs de um Aluno

```typescript
import { calcularEvolucaoAcademica, calcularEficienciaEstudo, calcularEngajamentoInteligente } from '@/lib/kpis/calculator'

// Dados do aluno (vindos do banco de dados)
const simulados = [
  {
    id: '1',
    data: new Date('2025-01-01'),
    notaPorArea: {
      linguagens: 500,
      matematica: 450,
      humanas: 520,
      natureza: 480,
      redacao: 600
    },
    notaTotal: 510,
    tempoDecorrido: 180
  },
  // ... mais simulados
]

const sessoes = [
  {
    id: '1',
    data: new Date('2025-01-02'),
    duracaoMinutos: 60,
    topicosEstudados: ['funcoes', 'geometria'],
    areaFoco: 'matematica'
  },
  // ... mais sessões
]

const atividades = [
  {
    data: new Date('2025-01-02'),
    tempoAtivo: 60,
    atividadesRealizadas: 5
  },
  // ... mais atividades
]

// Calcular métricas
const evolucao = calcularEvolucaoAcademica(simulados)
const eficiencia = calcularEficienciaEstudo(simulados, sessoes, topicosAltaIncidencia)
const engajamento = calcularEngajamentoInteligente(atividades, simulados)

console.log('Evolução total:', evolucao.evolucaoTotal.evolucaoAbsoluta, 'pontos')
console.log('Pontos/hora:', eficiencia.pontosGanhosPorHora.mediaGeral)
console.log('Streak atual:', engajamento.consistencia.streakAtual, 'dias')
```

### 2. Agregar KPIs de Múltiplos Alunos (Anonimizado)

```typescript
import { agregarKPIsAnonimos } from '@/lib/kpis/calculator'
import { KPICompleto } from '@/lib/kpis/types'

const kpisTodosAlunos: KPICompleto[] = [
  // ... KPIs de cada aluno
]

const metricasAgregadas = agregarKPIsAnonimos(kpisTodosAlunos)

console.log('Total de alunos ativos:', metricasAgregadas.totalUsuariosAtivos)
console.log('Evolução média:', metricasAgregadas.medias.evolucaoAcademica.evolucaoMediaPontos)
```

### 3. Gerar Relatório Anual

```typescript
import { gerarRelatorioAnual, formatarRelatorioParaMarkdown } from '@/lib/relatorio/template'

const relatorio = gerarRelatorioAnual(2025, metricasAgregadas, {
  perfilEstudantes: {
    distribuicaoPorTentativas: {
      primeiraVez: 450,
      segundaTentativa: 320,
      terceiraTentativaOuMais: 180
    },
    cursosPretendidos: {
      'Medicina': 120,
      'Engenharia': 95,
      'Direito': 85
    },
    tempoMedioEstudoSemanal: 12.5,
    distribuicaoPorNivel: {
      iniciante: 300,
      intermediario: 450,
      avancado: 200
    }
  }
})

const markdown = formatarRelatorioParaMarkdown(relatorio)
console.log(markdown)
```

## Categorias de KPIs

### 1. Evolução Acadêmica
- ✅ Evolução média de nota por área
- ✅ Evolução total estimada
- ✅ Tempo médio para evolução significativa

### 2. Eficiência de Estudo
- ✅ Pontos ganhos por hora de estudo
- ✅ % de tempo em tópicos de alta incidência
- ✅ Redução de estudo em tópicos de baixo retorno

### 3. Engajamento Inteligente
- ✅ Frequência semanal de uso
- ✅ Simulados concluídos
- ✅ Consistência (streak real)
- ✅ Retenção mensal

### 4. Resultado Final
- ✅ % de alunos que atingiram nota-alvo
- ✅ % de aprovados por curso
- ✅ % de aprovados por universidade
- ✅ Evolução entre tentativas do ENEM

## Princípios do Sistema

### Transparência
- Todos os dados são agregados e anonimizados
- Fórmulas de cálculo são públicas e auditáveis
- Limitações são claramente documentadas

### Honestidade
- Não prometemos aprovação individual
- Reconhecemos margem de erro nas estimativas (±50 pontos)
- Admitimos onde o sistema ainda precisa melhorar

### Privacidade
- Conformidade com LGPD
- Apenas IDs internos, sem nomes ou CPFs
- Dados agregados para relatórios públicos

## Frequência de Atualização

| Métrica | Frequência |
|---------|-----------|
| Evolução por área | Tempo real após simulado |
| Pontos/hora | Semanal |
| Frequência semanal | Tempo real |
| Streak | Diário (meia-noite) |
| Retenção mensal | Fim do mês |
| Aprovações | Após SISU/PROUNI |

## Integração com Banco de Dados

```typescript
// Exemplo de query para buscar dados de um aluno
async function buscarDadosKPI(usuarioId: string) {
  const simulados = await prisma.simulado.findMany({
    where: { usuarioId },
    orderBy: { data: 'asc' }
  })

  const sessoes = await prisma.sessaoEstudo.findMany({
    where: { usuarioId },
    include: { topicos: true }
  })

  const atividades = await prisma.atividadeDiaria.findMany({
    where: { usuarioId },
    orderBy: { data: 'asc' }
  })

  return { simulados, sessoes, atividades }
}
```

## Exportação de Relatórios

```typescript
import fs from 'fs'

// Exportar para Markdown
const markdown = formatarRelatorioParaMarkdown(relatorio)
fs.writeFileSync(`relatorio-${relatorio.metadados.ano}.md`, markdown)

// Exportar para JSON (dados técnicos)
const json = JSON.stringify(relatorio, null, 2)
fs.writeFileSync(`relatorio-${relatorio.metadados.ano}.json`, json)
```

## Limitações Conhecidas

1. **Notas Estimadas**: Margem de erro de ±50 pontos
2. **Resultado Final**: Depende de autorreporte de aprovação
3. **TRI Simulado**: Não é o TRI oficial do INEP
4. **Fatores Externos**: Aprovação depende de concorrência e políticas públicas

## Próximos Passos

- [ ] Dashboard visual de KPIs para administradores
- [ ] API REST para consulta de métricas agregadas
- [ ] Integração com SISU/PROUNI para tracking automático
- [ ] Sistema de alertas para métricas críticas
- [ ] Comparação ano a ano (histórico)

## Contato

Para dúvidas sobre metodologia ou implementação, consulte a documentação técnica ou entre em contato com a equipe de desenvolvimento.
