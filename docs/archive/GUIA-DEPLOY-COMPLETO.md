# 🚀 ENEM PRO - GUIA COMPLETO DE DEPLOY

## 📋 CHECKLIST PRÉ-DEPLOY

### ✅ Arquivos Criados:
- [x] 31 páginas HTML
- [x] Backend API (main.py)
- [x] Gerador de questões (question_generator.py)
- [x] Sistema RAG (rag_system_pdf.py)
- [x] Scripts de processamento

### ⚠️ Configurações Necessárias:
- [ ] Supabase (banco de dados)
- [ ] Railway/Render (backend)
- [ ] Vercel (frontend - já feito)
- [ ] Mercado Pago (pagamentos)
- [ ] Variáveis de ambiente

---

## 1️⃣ SUPABASE - BANCO DE DADOS (15 min)

### Passo 1: Criar Conta
1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub

### Passo 2: Criar Projeto
1. Clique em "New Project"
2. Nome: `enem-pro`
3. Database Password: (anote! você vai precisar)
4. Region: South America (São Paulo)
5. Clique em "Create new project"
6. Aguarde ~2 minutos

### Passo 3: Criar Tabelas

Vá em "SQL Editor" e execute:

```sql
-- Tabela de usuários
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'mensal', 'anual')),
    subscription_active BOOLEAN DEFAULT false,
    subscription_end TIMESTAMP,
    stripe_customer_id VARCHAR,
    newsletter BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índice para busca rápida por email
CREATE INDEX idx_users_email ON users(email);

-- Tabela de uso diário (limites freemium)
CREATE TABLE daily_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    simulados INT DEFAULT 0,
    questoes INT DEFAULT 0,
    chat_messages INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Índice para busca por data
CREATE INDEX idx_daily_usage_date ON daily_usage(user_id, date);

-- Tabela de simulados salvos
CREATE TABLE simulados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    titulo VARCHAR NOT NULL,
    data_criacao TIMESTAMP DEFAULT NOW(),
    total_questoes INT NOT NULL,
    questoes_data JSONB NOT NULL,
    respostas_data JSONB,
    nota_final DECIMAL(5,2),
    tempo_total INT, -- em minutos
    concluido BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índice para listar simulados do usuário
CREATE INDEX idx_simulados_user ON simulados(user_id, created_at DESC);

-- Tabela de questões salvas/favoritas
CREATE TABLE saved_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_data JSONB NOT NULL,
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de redações
CREATE TABLE redacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tema VARCHAR NOT NULL,
    texto TEXT NOT NULL,
    nota_total DECIMAL(4,1),
    notas_competencias JSONB, -- {"c1": 200, "c2": 180, ...}
    feedback TEXT,
    corrigido_em TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de pagamentos
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan VARCHAR NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR,
    payment_id VARCHAR, -- ID do Stripe/Mercado Pago
    status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'failed', 'refunded')),
    created_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP
);

-- Tabela de atividades (para dashboard)
CREATE TABLE activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR NOT NULL, -- 'simulado', 'questao', 'redacao', 'chat'
    description VARCHAR NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_user ON activities(user_id, created_at DESC);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View para estatísticas do usuário
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    u.id as user_id,
    u.email,
    u.name,
    u.plan,
    COUNT(DISTINCT s.id) as total_simulados,
    COUNT(DISTINCT r.id) as total_redacoes,
    COALESCE(SUM(du.questoes), 0) as total_questoes,
    COALESCE(AVG(s.nota_final), 0) as media_simulados,
    COALESCE(AVG(r.nota_total), 0) as media_redacoes
FROM users u
LEFT JOIN simulados s ON u.id = s.user_id
LEFT JOIN redacoes r ON u.id = r.user_id
LEFT JOIN daily_usage du ON u.id = du.user_id
GROUP BY u.id, u.email, u.name, u.plan;

-- Inserir usuário admin de teste
INSERT INTO users (email, name, password_hash, plan)
VALUES ('admin@enempro.com', 'Admin', 'hash_temporario', 'anual');
```

### Passo 4: Pegar Credenciais

1. Vá em "Settings" > "API"
2. Copie:
   - `Project URL`: https://xxxxx.supabase.co
   - `anon public key`: eyJhbG...
   - `service_role key`: eyJhbG... (⚠️ secreta!)

---

## 2️⃣ RAILWAY - BACKEND API (20 min)

### Passo 1: Criar Conta
1. Acesse: https://railway.app
2. Login com GitHub

### Passo 2: Criar Projeto
1. Clique em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Conecte seu repositório (ou crie um novo)

### Passo 3: Configurar Variáveis de Ambiente

No Railway, vá em "Variables" e adicione:

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=sua_service_role_key_aqui

# Segurança
SECRET_KEY=gere-uma-chave-aleatoria-aqui-use-python-secrets
ALGORITHM=HS256

# Ollama (se usar local)
OLLAMA_HOST=http://localhost:11434

# OpenAI (opcional)
OPENAI_API_KEY=sk-xxxxx

# Mercado Pago
MP_ACCESS_TOKEN=seu_token_aqui

# CORS
FRONTEND_URL=https://enempro.vercel.app
```

### Passo 4: Deploy

1. Crie arquivo `requirements.txt` na raiz:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
supabase==2.0.3
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pydantic[email]==2.5.0
ollama==0.1.0
chromadb==0.4.18
sentence-transformers==2.2.2
mercadopago==2.2.1
stripe==7.8.0
```

2. Crie `Procfile`:

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

3. Push para GitHub
4. Railway faz deploy automático! 🚀

### URL da API:
```
https://seu-projeto.railway.app
```

---

## 3️⃣ VERCEL - FRONTEND (5 min)

### Já está publicado! ✅

Mas precisa atualizar:

1. Vá em todos os arquivos HTML
2. Substitua `API_URL`:

```javascript
// Antes:
const API_URL = 'https://sua-api-url.com';

// Depois:
const API_URL = 'https://seu-projeto.railway.app';
```

3. Arquivos a atualizar:
   - cadastro.html
   - login.html
   - dashboard.html
   - chatbot.html
   - simulados-online.html
   - questoes-comentadas.html

4. Fazer commit e push
5. Vercel atualiza automaticamente!

---

## 4️⃣ MERCADO PAGO - PAGAMENTOS (30 min)

### Passo 1: Criar Conta
1. Acesse: https://mercadopago.com.br
2. Crie conta empresarial

### Passo 2: Obter Credenciais
1. Vá em "Integrações"
2. Copie:
   - Access Token de Teste
   - Access Token de Produção

### Passo 3: Configurar Webhook

1. Em "Integrações" > "Notificações"
2. URL: `https://seu-projeto.railway.app/payment/webhook`
3. Eventos: `payment` e `subscription`

### Passo 4: Criar Produtos

```python
# Script para criar planos no Mercado Pago
import mercadopago

sdk = mercadopago.SDK("SEU_ACCESS_TOKEN")

# Plano Mensal
mensal = sdk.plan().create({
    "reason": "ENEM Pro - Plano Mensal",
    "auto_recurring": {
        "frequency": 1,
        "frequency_type": "months",
        "transaction_amount": 29.90,
        "currency_id": "BRL"
    }
})

print(f"ID Plano Mensal: {mensal['response']['id']}")

# Plano Anual
anual = sdk.plan().create({
    "reason": "ENEM Pro - Plano Anual",
    "auto_recurring": {
        "frequency": 1,
        "frequency_type": "years",
        "transaction_amount": 297.00,
        "currency_id": "BRL"
    }
})

print(f"ID Plano Anual: {anual['response']['id']}")
```

---

## 5️⃣ PROCESSAR PDFS (1-2 horas)

### Passo 1: Organizar Ebooks

```bash
ebooks_enem/
├── matematica/
│   ├── algebra.pdf
│   ├── geometria.pdf
├── fisica/
│   ├── mecanica.pdf
├── portugues/
└── ...
```

### Passo 2: Processar

```bash
cd backend/app
python process_pdfs_robust.py
```

Aguarde... pode demorar 1-2 horas!

### Passo 3: Fazer Backup

```bash
# Copiar banco vetorial
cp -r chroma_db/ backup_chroma_db/

# Ou fazer ZIP
zip -r chroma_db_backup.zip chroma_db/
```

---

## 6️⃣ TESTES FINAIS

### Checklist:

```bash
# 1. Testar API
curl https://seu-projeto.railway.app/

# 2. Testar cadastro
curl -X POST https://seu-projeto.railway.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@test.com","senha":"12345678"}'

# 3. Testar login
curl -X POST https://seu-projeto.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@test.com","senha":"12345678"}'

# 4. Testar geração de questão
curl -X POST https://seu-projeto.railway.app/questions/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"subject":"matematica","difficulty":"medio"}'
```

### Frontend:

1. Acesse: https://enempro.vercel.app
2. Criar conta
3. Fazer login
4. Gerar questão
5. Fazer simulado
6. Testar ChatBot
7. Tentar upgrade (sandbox)

---

## 🔧 CONFIGURAÇÃO FINAL

### Arquivo: config.py

```python
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = "HS256"
    
    # AI
    USE_OPENAI: bool = False
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OLLAMA_HOST: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    
    # Payment
    MP_ACCESS_TOKEN: str = os.getenv("MP_ACCESS_TOKEN", "")
    
    # Frontend
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # PDFs
    EBOOKS_PATH: str = os.getenv("EBOOKS_PATH", "D:/ebooks_enem")
    CHROMA_DB_PATH: str = "./chroma_db"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### Arquivo: .env (local)

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=sua_key
SECRET_KEY=gere_uma_chave_aleatoria
OPENAI_API_KEY=sk-xxxxx
MP_ACCESS_TOKEN=TEST-xxxxx
FRONTEND_URL=http://localhost:3000
EBOOKS_PATH=D:/ebooks_enem
```

---

## 📊 MONITORAMENTO

### Railway:
- Dashboard: Ver logs em tempo real
- Metrics: CPU, RAM, requests

### Supabase:
- Database > Logs: Ver queries
- API > Logs: Ver requisições

### Vercel:
- Analytics: Ver acessos
- Deployments: Ver builds

---

## 🚨 TROUBLESHOOTING

### Problema: API não conecta ao Supabase
**Solução:**
```python
# Testar conexão
from supabase import create_client
client = create_client(SUPABASE_URL, SUPABASE_KEY)
result = client.table('users').select("*").limit(1).execute()
print(result)
```

### Problema: CORS error no frontend
**Solução:**
```python
# No main.py, adicionar seu domínio:
allow_origins=[
    "https://enempro.vercel.app",
    "https://seu-dominio.com"
]
```

### Problema: Geração de questões muito lenta
**Solução:**
- Use OpenAI (mais rápido)
- Ou reduza top_k no RAG
- Ou pré-gere questões em batch

---

## ✅ PRONTO PARA LANÇAR!

Quando tudo estiver funcionando:

1. [ ] Mudar variáveis de teste para produção
2. [ ] Remover usuário admin de teste
3. [ ] Configurar domínio próprio (opcional)
4. [ ] Configurar email (SendGrid/Resend)
5. [ ] Adicionar analytics (Google Analytics)
6. [ ] Preparar materiais de divulgação
7. [ ] 🚀 LANÇAR!

---

## 📞 SUPORTE

**Documentação:**
- FastAPI: https://fastapi.tiangolo.com
- Supabase: https://supabase.com/docs
- Railway: https://docs.railway.app
- Mercado Pago: https://www.mercadopago.com.br/developers

**Comunidades:**
- Railway Discord: railway.app/discord
- Supabase Discord: discord.supabase.com

**Seu sistema:**
- Frontend: https://enempro.vercel.app
- API: https://seu-projeto.railway.app
- Docs API: https://seu-projeto.railway.app/docs

---

🎉 **PARABÉNS! Seu ENEM Pro está pronto para decolar!** 🚀
