# 🤖 Guia de Integração: Ebooks + IA para Geração de Questões

## 📋 Visão Geral

Este guia explica como conectar seus ebooks processados com o sistema de geração de questões por IA.

---

## 🎯 Arquitetura do Sistema

```
┌─────────────────┐
│  Ebooks (PDFs)  │
└────────┬────────┘
         │
         ├─── 1. Processamento (Python)
         │    └── process_pdfs_robust.py
         │
         ▼
┌─────────────────────┐
│   ChromaDB          │  ← Banco Vetorial
│  (Embeddings)       │     com conteúdo indexado
└────────┬────────────┘
         │
         ├─── 2. Sistema RAG
         │    └── rag_system_pdf.py
         │
         ▼
┌─────────────────────┐
│   API Backend       │  ← Servidor (FastAPI/Node.js)
│   (Gerador IA)      │
└────────┬────────────┘
         │
         ├─── 3. Frontend
         │    └── gerador-questoes-ia.html
         │
         ▼
┌─────────────────────┐
│   Usuário Final     │
└─────────────────────┘
```

---

## 🚀 Opções de Implementação

### **Opção 1: Sistema Completo (Recomendado para Produção)**

#### Backend com FastAPI:

```python
# api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from rag_system_pdf import rag_pdf
import ollama

app = FastAPI(title="ENEM IA API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique seu domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    disciplina: str = "todas"
    dificuldade: str = "medio"
    quantidade: int = 5
    topico: Optional[str] = None
    
class Question(BaseModel):
    numero: int
    disciplina: str
    dificuldade: str
    pergunta: str
    alternativas: List[str]
    correta: int
    explicacao: str

@app.post("/gerar-questoes", response_model=List[Question])
async def gerar_questoes(request: QuestionRequest):
    """Gera questões baseadas nos ebooks usando IA"""
    
    try:
        # 1. Buscar contexto relevante dos ebooks
        query = f"{request.topico or ''} {request.disciplina}".strip()
        context = rag_pdf.search(
            query=query,
            top_k=10,
            subject=request.disciplina if request.disciplina != "todas" else None
        )
        
        if not context:
            raise HTTPException(status_code=404, detail="Nenhum conteúdo encontrado")
        
        # 2. Montar contexto para a IA
        context_text = "\n\n".join([
            f"[{c['metadata']['filename']}]\n{c['content']}"
            for c in context[:5]  # Top 5 resultados
        ])
        
        # 3. Gerar questões com IA
        questoes = []
        
        for i in range(request.quantidade):
            prompt = f"""Você é um especialista em criar questões de vestibular no estilo ENEM.

CONTEXTO DOS EBOOKS:
{context_text}

INSTRUÇÕES:
- Crie 1 questão de {request.disciplina} com nível de dificuldade {request.dificuldade}
- Base a questão EXCLUSIVAMENTE no contexto fornecido
- Formato: pergunta + 5 alternativas (A-E)
- Marque a alternativa correta
- Forneça explicação detalhada
{f'- Foque no tópico: {request.topico}' if request.topico else ''}

FORMATO DE RESPOSTA (JSON):
{{
    "pergunta": "texto da questão",
    "alternativas": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
    "correta": 0,
    "explicacao": "explicação detalhada"
}}

Gere apenas o JSON, sem texto adicional."""

            # Chamar Ollama
            response = ollama.chat(
                model='llama3.2:latest',
                messages=[{'role': 'user', 'content': prompt}],
                format='json'  # Força resposta em JSON
            )
            
            import json
            questao_data = json.loads(response['message']['content'])
            
            questoes.append(Question(
                numero=i + 1,
                disciplina=request.disciplina,
                dificuldade=request.dificuldade,
                pergunta=questao_data['pergunta'],
                alternativas=questao_data['alternativas'],
                correta=questao_data['correta'],
                explicacao=questao_data['explicacao']
            ))
        
        return questoes
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def get_stats():
    """Retorna estatísticas do sistema"""
    return rag_pdf.get_stats()

@app.get("/disciplinas")
async def get_disciplinas():
    """Lista disciplinas disponíveis"""
    all_docs = rag_pdf.collection.get()
    subjects = set([meta.get('subject', 'geral') for meta in all_docs['metadatas']])
    return {"disciplinas": sorted(list(subjects))}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### Como Executar:

```bash
# 1. Instalar FastAPI
pip install fastapi uvicorn

# 2. Rodar servidor
python api.py

# 3. Acessar: http://localhost:8000
# Documentação automática: http://localhost:8000/docs
```

#### Atualizar Frontend:

```javascript
// No arquivo gerador-questoes-ia.html
// Substituir a função gerarQuestoes():

async function gerarQuestoes() {
    const quantidade = parseInt(slider.value);
    const disciplina = document.getElementById('disciplina').value;
    const dificuldade = document.getElementById('dificuldade').value;
    const topico = document.getElementById('topico').value;

    document.getElementById('loading').classList.add('show');
    document.getElementById('btnGenerate').disabled = true;

    try {
        const response = await fetch('http://localhost:8000/gerar-questoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                disciplina,
                dificuldade,
                quantidade,
                topico
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar questões');
        }

        const questoes = await response.json();
        exibirQuestoes(questoes);
        
        // Atualizar contadores
        questoesGeradasHoje += quantidade;
        localStorage.setItem('questoesHoje', questoesGeradasHoje.toString());
        
    } catch (error) {
        alert('Erro ao gerar questões: ' + error.message);
    } finally {
        document.getElementById('loading').classList.remove('show');
        document.getElementById('btnGenerate').disabled = false;
    }
}
```

---

### **Opção 2: Serverless com Vercel Functions**

#### Criar API Route na Vercel:

```javascript
// api/gerar-questoes.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { disciplina, dificuldade, quantidade, topico } = req.body;

    try {
        // Chamar script Python
        const command = `python generate_questions.py "${disciplina}" "${dificuldade}" ${quantidade} "${topico || ''}"`;
        const { stdout } = await execPromise(command);
        
        const questoes = JSON.parse(stdout);
        res.status(200).json(questoes);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
```

---

### **Opção 3: Cliente-Side com Ollama Local**

Para protótipos ou uso pessoal:

```javascript
// Requer Ollama rodando localmente
async function gerarQuestoesLocal(disciplina, dificuldade, quantidade) {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama3.2:latest',
            prompt: `Crie ${quantidade} questões de ${disciplina} nível ${dificuldade}...`,
            stream: false
        })
    });

    const data = await response.json();
    return parseQuestoes(data.response);
}
```

---

## 🔐 Sistema Freemium

### Implementar Controle de Acesso:

```javascript
// auth.js - Sistema de autenticação simples

class AuthSystem {
    constructor() {
        this.plans = {
            'free': {
                questoesdia: 5,
                chatbotdia: 10,
                simulados: false,
                download: false
            },
            'premium': {
                questoesdia: Infinity,
                chatbotdia: Infinity,
                simulados: true,
                download: true
            },
            'vip': {
                questoesdia: Infinity,
                chatbotdia: Infinity,
                simulados: true,
                download: true,
                mentoria: true,
                correcaoredacao: 4
            }
        };
    }

    getUserPlan() {
        return localStorage.getItem('plano') || 'free';
    }

    isPremium() {
        const plan = this.getUserPlan();
        return plan === 'premium' || plan === 'vip';
    }

    checkLimit(feature) {
        const plan = this.getUserPlan();
        const limits = this.plans[plan];
        
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem('lastReset');
        
        // Reset diário
        if (lastReset !== today) {
            localStorage.setItem('questoesHoje', '0');
            localStorage.setItem('chatbotHoje', '0');
            localStorage.setItem('lastReset', today);
        }

        // Verificar limite
        if (feature === 'questoes') {
            const usado = parseInt(localStorage.getItem('questoesHoje') || '0');
            return usado < limits.questoesdia;
        }
        
        if (feature === 'chatbot') {
            const usado = parseInt(localStorage.getItem('chatbotHoje') || '0');
            return usado < limits.chatbotdia;
        }

        return limits[feature] || false;
    }

    incrementUsage(feature) {
        if (feature === 'questoes') {
            const atual = parseInt(localStorage.getItem('questoesHoje') || '0');
            localStorage.setItem('questoesHoje', (atual + 1).toString());
        }
        if (feature === 'chatbot') {
            const atual = parseInt(localStorage.getItem('chatbotHoje') || '0');
            localStorage.setItem('chatbotHoje', (atual + 1).toString());
        }
    }

    showUpgradeModal() {
        if (confirm('Limite atingido! Faça upgrade para Premium e tenha acesso ilimitado.\n\nDeseja ver os planos?')) {
            window.location.href = 'assinatura.html';
        }
    }
}

// Uso
const auth = new AuthSystem();

if (!auth.checkLimit('questoes')) {
    auth.showUpgradeModal();
    return;
}

// Gerar questões...
auth.incrementUsage('questoes');
```

---

## 💳 Integração de Pagamentos

### Opção 1: Stripe

```javascript
// Criar checkout session
const stripe = Stripe('sua_chave_publica');

async function criarCheckout(plano) {
    const prices = {
        'premium': 'price_xxx', // ID do preço no Stripe
        'vip': 'price_yyy'
    };

    const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: prices[plano] })
    });

    const session = await response.json();
    
    // Redirecionar para Stripe Checkout
    stripe.redirectToCheckout({ sessionId: session.id });
}
```

### Opção 2: Mercado Pago

```javascript
const mp = new MercadoPago('sua_chave_publica');

async function criarPreferencia(plano) {
    const items = {
        'premium': {
            title: 'Plano Premium',
            unit_price: 29.90,
            quantity: 1
        },
        'vip': {
            title: 'Plano VIP',
            unit_price: 79.90,
            quantity: 1
        }
    };

    const preference = {
        items: [items[plano]],
        back_urls: {
            success: 'https://seusite.com/success',
            failure: 'https://seusite.com/failure',
            pending: 'https://seusite.com/pending'
        },
        auto_return: 'approved'
    };

    const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preference)
    });

    const data = await response.json();
    window.location.href = data.init_point;
}
```

---

## 📊 Fluxo Completo

```
1. Usuário abre gerador-questoes-ia.html
   ↓
2. Configura: disciplina, dificuldade, quantidade
   ↓
3. Clica "Gerar Questões"
   ↓
4. Frontend verifica limite (freemium)
   ├─ Limite OK → Continua
   └─ Limite excedido → Mostra modal upgrade
   ↓
5. Frontend faz POST para /api/gerar-questoes
   {
     "disciplina": "fisica",
     "dificuldade": "medio",
     "quantidade": 5
   }
   ↓
6. Backend (FastAPI):
   a) Busca contexto no ChromaDB (RAG)
   b) Monta prompt com contexto dos ebooks
   c) Chama Ollama para gerar questões
   d) Retorna JSON com questões
   ↓
7. Frontend recebe questões
   ↓
8. Exibe questões formatadas
   ↓
9. Usuário responde
   ↓
10. Sistema mostra feedback e explicação
```

---

## ✅ Checklist de Implementação

### Backend:
- [ ] Criar API com FastAPI
- [ ] Conectar com ChromaDB
- [ ] Implementar geração com Ollama
- [ ] Adicionar CORS
- [ ] Deploy (Heroku/Railway/Render)

### Frontend:
- [ ] Atualizar gerador-questoes-ia.html
- [ ] Substituir simulação por chamadas API reais
- [ ] Implementar sistema de autenticação
- [ ] Adicionar loader durante geração

### Freemium:
- [ ] Implementar controle de limites
- [ ] Sistema de reset diário
- [ ] Modal de upgrade
- [ ] Badges Premium/VIP

### Pagamentos:
- [ ] Escolher gateway (Stripe/Mercado Pago)
- [ ] Criar produtos e preços
- [ ] Implementar checkout
- [ ] Webhook para confirmar pagamento
- [ ] Sistema de assinaturas

---

## 🚀 Deploy Rápido

### Para testar localmente:

```bash
# 1. Processar ebooks
python process_pdfs_robust.py

# 2. Rodar API
python api.py

# 3. Abrir frontend
# Editar gerador-questoes-ia.html
# Mudar URL da API para: http://localhost:8000

# 4. Testar
open gerador-questoes-ia.html
```

### Para produção:

```bash
# Deploy Backend (Railway/Render)
# 1. Criar conta
# 2. Conectar repositório GitHub
# 3. Configurar variáveis de ambiente
# 4. Deploy automático

# Deploy Frontend (Vercel)
# Já está feito! Só atualizar arquivos
```

---

## 💡 Dicas Importantes

1. **Use cache:** Armazene questões já geradas
2. **Otimize prompts:** Teste diferentes prompts para melhor qualidade
3. **Monitore uso:** Track quantas questões são geradas
4. **Feedback do usuário:** Permita avaliar qualidade das questões
5. **Diversifique:** Use diferentes partes dos ebooks para variedade

---

## 📞 Precisa de Ajuda?

- Backend não inicia? Verifique dependências
- IA não responde? Confira se Ollama está rodando
- Questões ruins? Ajuste os prompts
- Erro CORS? Configure allow_origins no FastAPI

---

**🎉 Com isso, você terá um sistema completo de geração de questões usando seus ebooks!**
