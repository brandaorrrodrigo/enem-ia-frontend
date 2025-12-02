# 🚀 ENEM IA - Integração Frontend + Backend

Sistema completo de preparação para o ENEM com integração total entre Next.js e FastAPI.

## 📋 Estrutura do Projeto

```
enem-ia-integration/
├── src/
│   ├── lib/
│   │   └── api.ts              # Configuração da API e serviços
│   ├── hooks/
│   │   └── index.ts            # Hooks customizados (Auth, Questões, etc)
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx   # Formulário de login/registro
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx   # Dashboard principal
│   │   ├── questoes/
│   │   │   └── QuestoesPage.tsx # Resolução de questões
│   │   ├── ui/
│   │   │   └── ToastContainer.tsx # Sistema de notificações
│   │   └── Providers.tsx       # Provider principal
├── .env.example                # Variáveis de ambiente
└── README.md                   # Este arquivo
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

### Backend
- **FastAPI** - Framework Python
- **PostgreSQL** - Banco de dados
- **SQLAlchemy** - ORM
- **JWT** - Autenticação
- **Ollama** - IA Local para correção de redações

## 📦 Instalação

### 1. Clone o Repositório

```bash
git clone <seu-repo>
cd enem-ia-integration
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Login/Registro**
   - Usuário envia credenciais
   - Backend valida e retorna JWT tokens
   - Tokens são salvos no localStorage
   - Usuário é redirecionado ao dashboard

2. **Token Refresh**
   - Interceptor detecta token expirado (401)
   - Tenta renovar usando refresh_token
   - Se falhar, redireciona para login

3. **Proteção de Rotas**
   ```tsx
   // Exemplo de uso do hook useAuth
   const { user, isAuthenticated, login, logout } = useAuth();
   
   if (!isAuthenticated) {
     return <LoginForm />;
   }
   ```

## 📡 Comunicação com a API

### Estrutura de Serviços

Todos os serviços estão em `src/lib/api.ts`:

```typescript
// Exemplo de uso
import { QuestoesService, SimuladosService } from '@/lib/api';

// Buscar questões
const questoes = await QuestoesService.getQuestoes({
  materia: 'Matemática',
  dificuldade: 'media',
  limite: 20
});

// Responder questão
const resultado = await QuestoesService.responderQuestao(
  questaoId,
  'A'
);
```

### Tratamento de Erros

```typescript
import { handleApiError } from '@/lib/api';

try {
  await QuestoesService.getQuestoes();
} catch (error) {
  const message = handleApiError(error);
  addToast(message, 'error');
}
```

## 🎣 Hooks Customizados

### useAuth
```typescript
const { user, loading, login, register, logout, updateUser } = useAuth();
```

### useQuestoes
```typescript
const { questoes, loading, error } = useQuestoes({
  materia: 'Matemática',
  dificuldade: 'facil'
});
```

### useEstatisticas
```typescript
const { stats, loading, error, refresh } = useEstatisticas();
```

### useToast
```typescript
const { addToast } = useToast();
addToast('Operação realizada com sucesso!', 'success');
```

## 🎨 Componentes Principais

### Dashboard
- Exibe estatísticas do usuário
- Mostra plano de estudos
- Gráficos de evolução
- Ações rápidas

### QuestoesPage
- Resolução de questões
- Filtros por matéria e dificuldade
- Timer e contagem de pontos
- Explicação detalhada

### LoginForm
- Login e registro
- Validação de formulários
- Login social (Google, Facebook)
- Recuperação de senha

## 🚀 Deploy

### Vercel (Recomendado para Frontend)

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça o deploy:
```bash
vercel --prod
```

3. Configure as variáveis de ambiente no dashboard do Vercel

### Docker

Crie um `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build e execute:
```bash
docker build -t enem-ia-frontend .
docker run -p 3000:3000 enem-ia-frontend
```

## 🔄 Integração com Backend

### Endpoints Necessários

O backend deve implementar os seguintes endpoints:

#### Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `POST /auth/refresh` - Renovar token
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Obter perfil
- `PATCH /auth/profile` - Atualizar perfil

#### Questões
- `GET /questoes` - Listar questões (com filtros)
- `GET /questoes/{id}` - Obter questão específica
- `POST /questoes/{id}/responder` - Responder questão
- `GET /questoes/materias` - Listar matérias

#### Simulados
- `GET /simulados` - Listar simulados
- `GET /simulados/{id}` - Obter simulado
- `POST /simulados/criar` - Criar simulado personalizado
- `POST /simulados/{id}/iniciar` - Iniciar simulado
- `POST /simulados/sessao/{id}/finalizar` - Finalizar simulado
- `GET /simulados/resultados` - Listar resultados

#### Redações
- `POST /redacoes/enviar` - Enviar redação
- `GET /redacoes` - Listar redações
- `GET /redacoes/{id}` - Obter redação
- `GET /redacoes/temas` - Listar temas

#### Plano de Estudos
- `GET /plano-estudo` - Listar planos
- `POST /plano-estudo/criar` - Criar plano
- `GET /plano-estudo/atual` - Obter plano atual
- `POST /plano-estudo/atividades/{id}/concluir` - Marcar atividade

#### Estatísticas
- `GET /estatisticas` - Estatísticas gerais
- `GET /estatisticas/por-materia` - Por matéria
- `GET /estatisticas/evolucao` - Evolução temporal

## 📱 PWA (Progressive Web App)

Para transformar em PWA, adicione ao `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // ... suas configurações
});
```

Crie `public/manifest.json`:

```json
{
  "name": "ENEM IA",
  "short_name": "ENEM IA",
  "description": "Plataforma de preparação para o ENEM",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🧪 Testes

### Testes Unitários com Jest

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm test
```

### Testes E2E com Playwright

```bash
npm install -D @playwright/test
npx playwright test
```

## 📊 Monitoramento

### Sentry (Erro Tracking)

```typescript
// src/lib/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Analytics

```typescript
// src/lib/analytics.ts
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## 🔒 Segurança

### Headers de Segurança

Adicione ao `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

## 🎯 Roadmap

- [x] Sistema de autenticação JWT
- [x] Dashboard com estatísticas
- [x] Resolução de questões
- [ ] Simulados completos
- [ ] Correção de redações com IA
- [ ] Plano de estudos personalizado
- [ ] Gamificação (rankings, badges)
- [ ] App mobile (React Native)
- [ ] Sistema de assinatura
- [ ] Chat com IA para dúvidas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rodrigo** - ENEM IA Platform

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
