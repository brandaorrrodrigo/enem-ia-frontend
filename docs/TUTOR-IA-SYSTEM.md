# 🎓 ENEM-IA - Painel Tutor com Explicações Inteligentes

## 📋 Visão Geral

Sistema de tutoria inteligente integrado ao simulado ENEM, que oferece explicações pedagógicas personalizadas usando IA (via Ollama/LLaMA). O tutor é capaz de reexplicar progressivamente com simplicidade crescente até que o aluno compreenda.

## 🗂️ Estrutura de Arquivos

### Arquivos Criados/Modificados

```
D:\enem-ia\frontend/
├── app/
│   ├── layout.tsx                              # [MODIFICADO] Importa globals.css
│   ├── globals.css                             # [NOVO] Estilos globais com Tailwind
│   │
│   ├── api/
│   │   ├── explicar/
│   │   │   └── route.ts                        # [RENOMEADO] Proxy para /api/explicar
│   │   └── reexplicar/
│   │       └── route.ts                        # [RENOMEADO] Proxy para /api/reexplicar
│   │
│   └── enem/
│       ├── components/
│       │   └── TutorExplicacao.tsx            # [NOVO] Componente principal do tutor
│       │
│       └── simulado/
│           ├── page.tsx                       # [NOVO] Página inicial do simulado
│           └── resultados/
│               └── page.tsx                   # [NOVO] Página de resultados com tutor
│
├── lib/
│   └── types/
│       └── enem.ts                            # [NOVO] Definições TypeScript
│
├── tailwind.config.ts                         # [NOVO] Configuração do Tailwind
├── package.json                               # [MODIFICADO] Dependências atualizadas
└── README-TUTOR.md                            # [NOVO] Esta documentação
```

## 🚀 Como Usar

### 1. Instalação

```bash
cd D:\enem-ia\frontend
npm install
```

### 2. Executar o Projeto

```bash
npm run dev
```

O frontend estará disponível em:
- **http://localhost:3000** (ou 3001 se 3000 estiver ocupado)

### 3. Acessar as Páginas

- **Página inicial do simulado**: http://localhost:3000/enem/simulado
- **Resultados (demo)**: http://localhost:3000/enem/simulado/resultados

## 📚 Fluxo de Uso

### Para o Aluno:

1. **Acessar a página de resultados**
   - Após fazer um simulado, o aluno vê suas questões com estatísticas

2. **Ver explicação de uma questão**
   - Clicar no botão "🧑‍🏫 Ver explicação"
   - O tutor gera uma explicação pedagógica detalhada

3. **Pedir reexplicação (se não entendeu)**
   - Opção 1: Clicar em "🔄 Não entendi, explicar de novo"
     - Gera automaticamente uma explicação mais simples

   - Opção 2: Digitar dúvida específica
     - Escrever na caixa de texto: "Não entendi a parte sobre..."
     - Clicar em "💬 Explicar essa parte"

4. **Reexplicações progressivas**
   - Tentativa 1 → Explicação simplificada
   - Tentativa 2 → Explicação muito simples
   - Tentativa 3+ → Modo ELI5 (Explain Like I'm 5)
   - Máximo: 5 tentativas por questão

## 🛠️ Componentes Principais

### 1. TutorExplicacao.tsx

Componente React client-side que gerencia a interação com o tutor.

**Props:**
```typescript
interface TutorExplicacaoProps {
  questaoId: number;
  respostaUsuario: 'A' | 'B' | 'C' | 'D' | 'E';
  respostaCorreta?: 'A' | 'B' | 'C' | 'D' | 'E';
  enunciado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
}
```

**Estados gerenciados:**
- `explicacoes`: Array de mensagens do chat
- `loadingExplicar`: Loading da primeira explicação
- `loadingReexplicar`: Loading das reexplicações
- `erro`: Mensagens de erro
- `tentativaAtual`: Número da tentativa (1-5)
- `limiteAtingido`: Se atingiu 5 tentativas

**Funções principais:**
- `chamarExplicar()`: Chama `/api/explicar` para primeira explicação
- `chamarReexplicar(duvidaEspecifica?)`: Chama `/api/reexplicar` para simplificação

### 2. Página de Resultados

Renderiza lista de questões, cada uma com o componente TutorExplicacao.

**Features:**
- Estatísticas de desempenho (total, acertos, erros, %)
- Filtros (todas / acertos / erros)
- Integração com TutorExplicacao para cada questão

## 🔌 Integração com Backend

### Endpoints Utilizados

#### POST /api/explicar

**Request:**
```typescript
{
  questao_id: number;
  resposta_usuario: string;
  resposta_correta?: string;
  enunciado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
  contexto_adicional?: string | null;
}
```

**Response:**
```typescript
{
  ok: boolean;
  explicacao: string;
  questao_id: number;
  cached?: boolean;
  tempo_processamento: number;
  modelo_usado: string;
  timestamp: string;
  resposta_era_correta?: boolean | null;
  nivel_confianca?: string | null;
}
```

#### POST /api/reexplicar

**Request:**
```typescript
{
  questao_id: number;
  resposta_usuario: string;
  resposta_correta?: string;
  explicacao_anterior?: string | null;
  duvida_especifica?: string | null;
  tentativa_numero?: number;  // 1-5
  nivel_escolar?: 'fundamental' | 'medio' | 'superior';
}
```

**Response:**
```typescript
{
  ok: boolean;
  explicacao: string;
  questao_id: number;
  nivel_simplificacao: 'normal' | 'simples' | 'muito_simples' | 'eli5';
  tentativa_numero: number;
  sugestoes_estudo: string[];
  recursos_adicionais: string[];
  tempo_processamento: number;
  modelo_usado: string;
  timestamp: string;
}
```

## ⚠️ Tratamento de Erros

O sistema trata os seguintes cenários:

### Erros HTTP
- **429 Too Many Requests**: "Muitas requisições. Aguarde alguns instantes."
- **504 Gateway Timeout**: "A requisição demorou muito. Tente novamente."
- **500 Internal Server Error**: Mensagem genérica de erro

### Erros de Rede
- **AbortError**: Requisição cancelada
- **Erro de conexão**: Verifica internet e tenta novamente

### Limites
- **Máximo 5 tentativas** de reexplicação por questão
- Ao atingir o limite, exibe aviso e desabilita botões

## 🎨 UI/UX

### Layout Estilo Chat

- **Mensagens do usuário**: Balão azul, alinhado à direita
- **Mensagens do tutor**: Balão cinza claro, alinhado à esquerda

### Indicadores Visuais

- **Badge de tentativa**: Mostra "Tentativa X/5"
- **Nível de simplificação**: Tag colorida (normal, simples, muito simples, ELI5)
- **Sugestões de estudo**: Lista com ícone 💡
- **Recursos adicionais**: Lista com ícone 📚

### Responsividade

- Grid responsivo (mobile-first)
- Botões adaptam para telas pequenas
- Chat scrollável com max-height de 96 (384px)

## 🧪 Dados de Demonstração

A página `/enem/simulado/resultados` usa dados mockados:

```typescript
const dadosMock: RespostaQuestao[] = [
  {
    questao_id: 1,
    resposta_usuario: 'B',
    resposta_correta: 'B',
    acertou: true,
    enunciado: 'Sobre a Guerra Fria...',
    disciplina: 'História',
    assunto: 'Guerra Fria',
    dificuldade: 'média',
  },
  // ... mais 4 questões
];
```

**Para integração real:**
- Substituir `useEffect` que carrega dados mock
- Fazer `fetch` para endpoint real de resultados
- Passar dados do simulado via props ou context

## 📝 Próximos Passos

### Funcionalidades Adicionais (Opcionais)

1. **Integração com banco de dados**
   - Salvar histórico de explicações
   - Tracking de quais explicações foram úteis

2. **Sistema de feedback**
   - Botões "👍 Entendi" / "👎 Ainda não entendi"
   - Analytics de qualidade das explicações

3. **Gamificação**
   - Conquistas ao entender questões difíceis
   - Badges por disciplinas

4. **Compartilhamento**
   - Exportar explicações em PDF
   - Compartilhar dúvidas com colegas

5. **Melhorias de UX**
   - Animações suaves
   - Toast notifications
   - Modo dark/light

## 🐛 Troubleshooting

### Erro: "Port 3000 is in use"
- Solução: Next.js automaticamente usa porta 3001
- Ou: Matar processo na porta 3000

### Erro: "Cannot find module '@/lib/types/enem'"
- Verificar se `tsconfig.json` tem path alias configurado:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Erro 502/504 nas chamadas de API
- Verificar se backend está rodando (porta 8000)
- Verificar se backend_proxy está rodando (porta 8001)
- Verificar se Ollama está ativo

### Tailwind não funciona
- Rodar: `npm run dev` (reiniciar servidor)
- Verificar `tailwind.config.ts`
- Verificar import do `globals.css` no `layout.tsx`

## 📖 Referências

- **Next.js 14 Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hooks**: https://react.dev/reference/react

## ✅ Checklist de Implementação

- [x] Estrutura de diretórios criada
- [x] Tailwind CSS configurado
- [x] Tipos TypeScript definidos
- [x] Componente TutorExplicacao implementado
- [x] Página de resultados com integração
- [x] Página inicial do simulado
- [x] APIs de proxy (/api/explicar, /api/reexplicar)
- [x] Tratamento de erros completo
- [x] UI responsiva e acessível
- [x] Documentação completa

## 👨‍💻 Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar produção
npm start
```

---

**Desenvolvido para ENEM-IA** 🚀
