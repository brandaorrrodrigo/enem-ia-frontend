# 🧪 Como Testar o Dashboard Central do Aluno

## 🚀 Início Rápido (3 passos)

### 1. Iniciar o servidor de desenvolvimento

```bash
cd D:\enem-ia\enem-pro
npm run dev
```

### 2. Acessar a página de demonstração

Abra no navegador:
```
http://localhost:3000/dashboard-aluno
```

### 3. Explorar o dashboard

Você verá **5 seções completas** com dados mock realistas!

---

## 📋 O Que Você Vai Ver

### ✅ Seção 1: Visão Geral
- **4 cards principais:**
  - Nota Estimada: 720
  - Nota-Alvo: 850 (Medicina - USP)
  - Gap: 130 pontos
  - Progresso: 84.7%

- **5 barras de progresso por área:**
  - Matemática: 82.3% (abaixo da meta) - vermelho
  - Natureza: 85% (próximo) - amarelo
  - Humanas: 100% (atingiu) - azul
  - Linguagens: 102.8% (superou) - verde
  - Redação: 100% (atingiu) - azul

- **Card de Próxima Meta:**
  - "Atingir 750 pontos em Matemática"
  - Faltam 50 pontos
  - Prazo: 14 dias
  - Motivação: "Você está a 73% do caminho!"

---

### ✅ Seção 2: Evolução
- **Alerta de tendência:**
  - "Você melhorou 20 pontos esta semana! 🎉"
  - Direção: Subindo 📈
  - +20 pontos (+2.8%)

- **Gráfico de evolução:**
  - 5 simulados de 680 até 735
  - Placeholder (implementar com Recharts)

- **Melhores Performances:**
  - Humanas: +70 pontos
  - Matemática: +50 pontos
  - Linguagens: +45 pontos

- **Áreas de Atenção:**
  - Natureza: -10 pontos
  - Motivo: "Pouca prática recente"

---

### ✅ Seção 3: Mapa de Estudo Atual
- **Plano Personalizado IA:**
  - 28 de 50 tópicos dominados (56%)
  - Semana 8 de 20

- **Semana Atual:**
  - Tópicos: Funções, Porcentagem, Estatística
  - 15h cumpridas de 20h planejadas (75%)
  - Status: No prazo ✅

- **Distribuição de Tempo (gráfico pizza):**
  - Matemática: 35% (7h/semana)
  - Natureza: 30% (6h/semana)
  - Humanas: 15% (3h/semana)
  - Linguagens: 10% (2h/semana)
  - Redação: 10% (2h/semana)

- **10 Tópicos Prioritários com IA:**
  - 🔥 Funções (incidência 85%, probabilidade 90%)
  - 🔥 Eletromagnetismo (incidência 75%, probabilidade 80%)
  - 🔥 Estequiometria (incidência 80%, probabilidade 85%)
  - 🔥 Genética (incidência 90%, probabilidade 95%) - CRÍTICO!
  - ... e mais 6 tópicos

---

### ✅ Seção 4: Eficiência de Estudo
- **Métricas Gerais:**
  - 120 horas estudadas
  - 850 questões resolvidas
  - 15 simulados feitos
  - 7.08 questões/hora
  - 8.5min/questão

- **Retorno de Investimento (pontos/hora):**
  - Redação: 3.33 pts/h (excelente) 🏆
  - Humanas: 2.33 pts/h (excelente)
  - Linguagens: 2.25 pts/h (excelente)
  - Matemática: 1.25 pts/h (bom)
  - Natureza: 0.57 pts/h (regular) ⚠️

- **2 Alertas de Eficiência:**
  - "Você está gastando muito tempo em Natureza mas o retorno é baixo"
  - "Você não pratica redação há 5 dias"

- **Comparação com Meta:**
  - Ritmo necessário: 10 questões/dia, 20h/semana, 4 simulados/mês
  - Seu ritmo atual: 8 questões/dia, 15h/semana, 3 simulados/mês
  - Status: Abaixo ⚠️
  - Ajuste: "+2 questões/dia e +5h/semana"

---

### ✅ Seção 5: Previsão e Cenários
- **Probabilidade de Aprovação:**
  - 65% (Moderada)
  - Cor: Azul
  - "Você está no caminho certo! Com mais dedicação, a aprovação é sua!"
  - Faltam 180 dias para o ENEM

- **Status do Ritmo:**
  - Progresso ideal: 60%
  - Seu progresso: 56%
  - Diferença: -4%
  - Status: No prazo ✅

- **3 Cenários:**

  **Otimista (850 pontos, 85% de chance):**
  - Estudar 25h/semana
  - Taxa de acerto 85%+
  - Dominar Funções e Eletromagnetismo
  - Fazer 5 simulados/mês

  **Realista (750 pontos, 65% de chance):**
  - Manter 20h/semana
  - Taxa de acerto 80%
  - Focar em tópicos prioritários
  - Fazer 4 simulados/mês

  **Crítico (680 pontos, 30% de chance):**
  - Reduzir para menos de 15h/semana
  - Ignorar tópicos prioritários
  - Não fazer simulados regulares
  - Perder motivação

- **4 Recomendações da IA:**
  - 🚨 URGENTE: "Aumente 5h/semana de estudo" (+50 pontos)
  - ⚡ IMPORTANTE: "Foque em Funções e Eletromagnetismo" (+30 pontos)
  - 📝 IMPORTANTE: "Faça simulado de Mat + Nat em 3 dias"
  - 💡 SUGESTÃO: "Revise Humanas 30min/dia"

---

## 🎨 Elementos Visuais Para Observar

### Cores Dinâmicas
- ✅ Verde: Metas atingidas, retorno excelente
- 🔵 Azul: No caminho, bom desempenho
- 🟡 Amarelo: Atenção, próximo da meta
- 🔴 Vermelho: Crítico, abaixo da meta

### Gradientes
- Cards principais com gradientes suaves
- Card de probabilidade muda de cor conforme percentual
- Header com gradiente verde/azul

### Ícones e Badges
- 🔥 Tópicos de alta prioridade
- ⚠️ Tópicos de média prioridade
- 💤 Tópicos de baixa prioridade
- Badges: URGENTE, ATENÇÃO, REVISAR

### Estados
- Loading: Spinner animado
- Erro: Mensagem amigável
- Dados carregados: Dashboard completo

---

## 📱 Teste de Responsividade

### Desktop (>= 1024px)
```
Grid de 4 colunas nos cards principais
Visualização completa lado a lado
```

### Tablet (>= 768px)
```
Grid de 2 colunas
Reorganização automática
```

### Mobile (< 768px)
```
Grid de 1 coluna
Cards empilhados
Touch-friendly
```

**Como testar:**
1. Abra DevTools (F12)
2. Clique no ícone de mobile
3. Teste diferentes tamanhos (375px, 768px, 1024px, 1440px)

---

## 🔍 Inspecionar Dados da API

### Ver resposta da API

```bash
# No navegador ou terminal
curl http://localhost:3000/api/dashboard/demo | json_pp
```

### Ver no DevTools

1. Abra DevTools (F12)
2. Aba Network
3. Recarregue a página
4. Procure por `demo?`
5. Clique e veja a response JSON completa

---

## ✅ Checklist de Validação

Ao testar, verifique:

- [ ] Dashboard carrega sem erros
- [ ] Loading aparece inicialmente
- [ ] 5 seções são renderizadas
- [ ] Cards de métricas exibem valores corretos
- [ ] Barras de progresso têm cores dinâmicas
- [ ] Tópicos prioritários mostram IA
- [ ] Alertas de eficiência aparecem
- [ ] Cenários têm cores diferentes
- [ ] Responsividade funciona
- [ ] Console do navegador sem erros
- [ ] Gradientes renderizam corretamente

---

## 🐛 Troubleshooting

### Dashboard não carrega

**Causa:** Servidor não está rodando
**Solução:**
```bash
npm run dev
```

### Erro de tipos TypeScript

**Causa:** Tipos não foram reconhecidos
**Solução:**
```bash
npm run build
# Verificar erros de tipo
```

### Componentes não aparecem

**Causa:** Import incorreto
**Solução:** Verificar `components/dashboard/DashboardAluno.tsx` linha 10-27

### API retorna 500

**Causa:** Erro na geração de dados mock
**Solução:** Verificar `app/api/dashboard/[userId]/route.ts`

---

## 🎯 Próximos Passos Após Teste

### 1. Implementar Gráficos Reais

```bash
npm install recharts
```

Substituir placeholders em `DashboardComponents.tsx`:
- `GraficoEvolucao` (linha temporal)
- `GraficoPizza` (distribuição de tempo)

Ver exemplos em `DASHBOARD_CENTRAL_ALUNO.md` linhas 299-361

### 2. Conectar com Banco de Dados

Substituir mock em `app/api/dashboard/[userId]/route.ts`:
```typescript
// Linha 18-21: Descomentar e implementar
const aluno = await db.aluno.findUnique({ where: { id: userId } });
const simulados = await db.simulado.findMany({ where: { alunoId: userId } });
```

### 3. Integrar com IA

```typescript
// Linha 23-26: Descomentar e implementar
import { GeradorPlanos } from '@/lib/ai/gerador-planos';
import { AnalisadorEstatisticas } from '@/lib/ai/analisador-estatisticas';
const plano = gerador.gerarPlano(...);
```

### 4. Adicionar Autenticação

Em `app/dashboard-aluno/page.tsx`:
```typescript
// Linha 7-9: Implementar
import { auth } from '@/lib/auth';
const session = await auth();
const userId = session?.user?.id;
```

---

## 📊 Dados Mock Disponíveis

O mock inclui:
- ✅ Aluno: João Silva, Medicina - USP
- ✅ 5 simulados com notas crescentes (680-735)
- ✅ 50 tópicos no plano (28 dominados)
- ✅ 10 tópicos prioritários detalhados
- ✅ 5 matérias com retorno de investimento
- ✅ 2 alertas de eficiência
- ✅ 3 cenários (otimista/realista/crítico)
- ✅ 4 recomendações IA
- ✅ Projeção temporal de 4 meses

**Total:** Dados realistas e completos para demonstração!

---

## 🎉 Conclusão

Se tudo funcionou, você verá um dashboard profissional com:
- 📊 5 seções completas
- 🎨 Design moderno e responsivo
- 🤖 Insights da IA
- 📈 Visualização de dados
- 🏆 UX educacional motivacional

**Dashboard pronto para demonstração!** 🚀

---

*Guia criado em 14/12/2025*
