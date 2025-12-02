# 🔗 Guia de Integração Frontend + Backend

## 📋 Visão Geral

Este guia detalha como conectar o frontend Next.js ao backend FastAPI do ENEM IA.

## 🏗️ Arquitetura

```
┌─────────────────┐        HTTP/REST        ┌─────────────────┐
│                 │  ◄────────────────────►  │                 │
│  Next.js (3000) │    JSON + JWT Tokens     │ FastAPI (8000)  │
│                 │                          │                 │
└─────────────────┘                          └─────────────────┘
        │                                            │
        │ localStorage                               │
        │ - access_token                            │ PostgreSQL
        │ - refresh_token                           │ (5432)
        │ - user                                     │
        └────────────────────────────────────────────┘
```

## 🔐 Fluxo de Autenticação Detalhado

### 1. Registro de Usuário

**Frontend (LoginForm.tsx):**
```typescript
const register = async (data: RegisterRequest) => {
  const response = await AuthService.register(data);
  // response = { access_token, refresh_token, user }
  
  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
  localStorage.setItem('user', JSON.stringify(response.user));
};
```

**Backend (FastAPI):**
```python
@router.post("/auth/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # 1. Validar dados
    if await get_user_by_email(db, user.email):
        raise HTTPException(400, "Email já cadastrado")
    
    # 2. Hash da senha
    hashed = hash_password(user.password)
    
    # 3. Criar usuário
    db_user = User(
        email=user.email,
        nome=user.nome,
        senha_hash=hashed,
        tipo_plano="free"
    )
    db.add(db_user)
    db.commit()
    
    # 4. Gerar tokens
    access_token = create_access_token({"sub": str(db_user.id)})
    refresh_token = create_refresh_token({"sub": str(db_user.id)})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": UserResponse.from_orm(db_user)
    }
```

### 2. Login

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "nome": "João Silva",
    "tipo_plano": "premium",
    "pontos_totais": 1500,
    "nivel_atual": 5,
    "streak_dias": 7
  }
}
```

### 3. Renovação de Token (Auto)

**O que acontece:**
1. Frontend faz requisição com token expirado
2. Backend retorna 401 Unauthorized
3. Interceptor detecta e tenta renovar
4. Se sucesso, refaz requisição original
5. Se falha, redireciona para login

**Interceptor (api.ts):**
```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('/auth/refresh', { refresh_token: refreshToken });
      
      localStorage.setItem('access_token', response.data.access_token);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

## 📡 Endpoints da API

### Questões

#### Listar Questões
```
GET /questoes?materia=Matemática&dificuldade=media&limite=20
```

**Response:**
```json
[
  {
    "id": "uuid",
    "materia": "Matemática",
    "assunto": "Funções Quadráticas",
    "dificuldade": "media",
    "enunciado": "Determine o valor máximo da função f(x) = -x² + 4x + 5",
    "alternativas": {
      "A": "9",
      "B": "8",
      "C": "7",
      "D": "6",
      "E": "5"
    },
    "resposta_correta": "A",
    "explicacao": "O valor máximo ocorre no vértice...",
    "tags": ["função-quadratica", "vertice"],
    "ano_enem": 2023
  }
]
```

#### Responder Questão
```
POST /questoes/{id}/responder
Body: { "resposta": "A" }
```

**Response:**
```json
{
  "correto": true,
  "explicacao": "Correto! O valor máximo é 9...",
  "pontos": 15,
  "tempo_resposta": 45
}
```

**Backend (FastAPI):**
```python
@router.post("/questoes/{questao_id}/responder")
async def responder_questao(
    questao_id: str,
    resposta: RespostaQuestao,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Buscar questão
    questao = db.query(Questao).filter(Questao.id == questao_id).first()
    if not questao:
        raise HTTPException(404, "Questão não encontrada")
    
    # 2. Verificar resposta
    correto = resposta.resposta == questao.resposta_correta
    
    # 3. Calcular pontos
    pontos = calcular_pontos(questao.dificuldade, resposta.tempo_resposta) if correto else 0
    
    # 4. Registrar resposta
    resposta_usuario = RespostaUsuario(
        usuario_id=user.id,
        questao_id=questao_id,
        resposta=resposta.resposta,
        correto=correto,
        pontos=pontos,
        tempo_resposta=resposta.tempo_resposta
    )
    db.add(resposta_usuario)
    
    # 5. Atualizar pontos do usuário
    user.pontos_totais += pontos
    db.commit()
    
    return {
        "correto": correto,
        "explicacao": questao.explicacao,
        "pontos": pontos
    }
```

### Simulados

#### Criar Simulado Personalizado
```
POST /simulados/criar
```

**Request:**
```json
{
  "materias": ["Matemática", "Física"],
  "quantidade_questoes": 45,
  "dificuldade": "media"
}
```

**Response:**
```json
{
  "id": "uuid",
  "titulo": "Simulado Personalizado - Matemática e Física",
  "total_questoes": 45,
  "tempo_estimado": 135,
  "questoes": [...]
}
```

#### Iniciar Simulado
```
POST /simulados/{id}/iniciar
```

**Response:**
```json
{
  "sessao_id": "uuid",
  "iniciado_em": "2024-01-15T10:00:00Z"
}
```

#### Finalizar Simulado
```
POST /simulados/sessao/{sessao_id}/finalizar
```

**Request:**
```json
{
  "respostas": [
    { "questao_id": "uuid1", "resposta": "A" },
    { "questao_id": "uuid2", "resposta": "C" }
  ]
}
```

**Response:**
```json
{
  "id": "uuid",
  "pontuacao": 750,
  "acertos": 35,
  "erros": 10,
  "tempo_gasto": 7200,
  "desempenho_por_materia": [
    {
      "materia": "Matemática",
      "acertos": 18,
      "total": 23,
      "percentual": 78.3
    }
  ]
}
```

### Redações

#### Enviar Redação
```
POST /redacoes/enviar
```

**Request:**
```json
{
  "tema": "Desafios da educação no Brasil",
  "texto": "A educação brasileira enfrenta diversos desafios..."
}
```

**Response:**
```json
{
  "id": "uuid",
  "tema": "Desafios da educação no Brasil",
  "status": "pendente",
  "data_envio": "2024-01-15T10:00:00Z"
}
```

**Backend - Correção com IA:**
```python
@router.post("/redacoes/enviar")
async def enviar_redacao(
    redacao: RedacaoCreate,
    background_tasks: BackgroundTasks,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Criar redação
    db_redacao = Redacao(
        usuario_id=user.id,
        tema=redacao.tema,
        texto=redacao.texto,
        status="pendente"
    )
    db.add(db_redacao)
    db.commit()
    
    # 2. Agendar correção assíncrona
    background_tasks.add_task(corrigir_redacao_ia, db_redacao.id)
    
    return RedacaoResponse.from_orm(db_redacao)


async def corrigir_redacao_ia(redacao_id: str):
    """Corrige redação usando Ollama/Llama"""
    import ollama
    
    redacao = db.query(Redacao).filter(Redacao.id == redacao_id).first()
    
    prompt = f"""
    Corrija a redação abaixo seguindo os critérios do ENEM:
    
    Tema: {redacao.tema}
    Texto: {redacao.texto}
    
    Avalie as 5 competências (0-200 cada):
    1. Domínio da norma culta
    2. Compreensão da proposta
    3. Argumentação
    4. Coesão
    5. Proposta de intervenção
    
    Retorne em JSON:
    {{
      "competencias": {{"c1": 160, "c2": 180, ...}},
      "nota_final": 900,
      "feedback": "Análise detalhada...",
      "sugestoes": ["Sugestão 1", ...]
    }}
    """
    
    response = ollama.chat(
        model="llama3.1:8b",
        messages=[{"role": "user", "content": prompt}]
    )
    
    resultado = json.loads(response['message']['content'])
    
    # Atualizar redação
    redacao.competencias = resultado['competencias']
    redacao.nota_final = resultado['nota_final']
    redacao.feedback = resultado['feedback']
    redacao.sugestoes = resultado['sugestoes']
    redacao.status = "corrigida"
    db.commit()
```

### Estatísticas

#### Obter Estatísticas Gerais
```
GET /estatisticas
```

**Response:**
```json
{
  "total_questoes_respondidas": 450,
  "taxa_acerto_geral": 0.72,
  "tempo_medio_questao": 180,
  "materias_fortes": ["Matemática", "Física"],
  "materias_fracas": ["História", "Geografia"],
  "evolucao_semanal": [
    { "semana": "2024-W01", "acertos": 85, "total": 120 }
  ],
  "comparacao_media": {
    "sua_nota": 750,
    "media_usuarios": 680
  }
}
```

## 🔧 Configuração do Backend

### requirements.txt
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.2
pydantic-settings==2.1.0
ollama==0.1.4
```

### database.py
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:pass@localhost/enemiadb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### models.py
```python
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "usuarios"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    nome = Column(String)
    senha_hash = Column(String)
    tipo_plano = Column(String, default="free")
    pontos_totais = Column(Integer, default=0)
    nivel_atual = Column(Integer, default=1)
    streak_dias = Column(Integer, default=0)
    criado_em = Column(DateTime, default=datetime.utcnow)

class Questao(Base):
    __tablename__ = "questoes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    materia = Column(String, index=True)
    assunto = Column(String)
    dificuldade = Column(String)
    enunciado = Column(String)
    alternativas = Column(JSON)
    resposta_correta = Column(String)
    explicacao = Column(String)
    tags = Column(JSON)
    ano_enem = Column(Integer)
    imagem_url = Column(String, nullable=True)
```

### auth.py
```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "your-secret-key-here"  # Usar variável de ambiente
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

## 🚀 Iniciando o Sistema

### 1. Backend (FastAPI)

```bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Criar banco de dados
python create_db.py

# Iniciar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend (Next.js)

```bash
# Instalar dependências
npm install

# Configurar .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Iniciar servidor
npm run dev
```

### 3. Verificar Integração

Acesse `http://localhost:3000` e:

1. Crie uma conta
2. Faça login
3. Acesse o dashboard
4. Resolva algumas questões
5. Verifique as estatísticas

## 🧪 Testando a API

### Com cURL

```bash
# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"senha123"}'

# Questões (com token)
curl -X GET "http://localhost:8000/questoes?limite=5" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Com Postman/Insomnia

Importe a collection do repositório para testes completos.

## 🔍 Debugging

### Frontend

```typescript
// Adicionar logs detalhados
api.interceptors.request.use(config => {
  console.log('Request:', config.url, config.data);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('Error:', error.response?.data);
    return Promise.reject(error);
  }
);
```

### Backend

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"{request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Status: {response.status_code}")
    return response
```

## ❗ Troubleshooting

### Erro: CORS

**Backend:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Erro: Token Expirado

Verifique se o interceptor está funcionando:
```typescript
// Adicionar timeout maior se necessário
const api = axios.create({
  timeout: 30000,  // 30 segundos
});
```

### Erro: Conexão Recusada

1. Verifique se o backend está rodando
2. Confirme a URL no .env.local
3. Teste com cURL primeiro

## 📚 Recursos Adicionais

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [JWT.io](https://jwt.io/) - Decodificar tokens
- [Ollama Docs](https://ollama.ai/docs) - IA Local

## 🤝 Suporte

Problemas? Abra uma issue no repositório ou entre em contato!

---

✅ **Sistema totalmente integrado e pronto para produção!**
