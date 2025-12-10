# 🚀 COMO TESTAR O SISTEMA ENEM PRO

**Versão:** 2.0.0
**Data:** 2025-12-10

---

## ⚡ INÍCIO RÁPIDO (3 passos)

### 1️⃣ Iniciar Backend (Terminal 1)

```bash
cd D:\enem-ia\backend
start-backend.bat
```

**Aguarde ver:**
```
🚀 ENEM-IA Backend Unificado
📦 Versão: 2.0.0
📚 Documentação: http://localhost:8000/docs
```

✅ Backend rodando em: http://localhost:8000

---

### 2️⃣ Iniciar Frontend (Terminal 2)

```bash
cd D:\enem-ia\enem-pro
npm run dev
```

**Aguarde ver:**
```
✓ Ready in 2.5s
➜  Local:   http://localhost:3000
```

✅ Frontend rodando em: http://localhost:3000

---

### 3️⃣ Abrir no Navegador

**Abra:** http://localhost:3000

---

## 🧪 ROTEIRO DE TESTES

### Teste #1: Ver Questões no Banco (30 segundos)

1. Abra um terminal
2. Execute:
```bash
cd D:\enem-ia\enem-pro
node verify-questions.js
```

**Resultado esperado:**
```
📊 Total de questões: 90

[Questão 1]
ID: 1
Enunciado: Resolva a equação: 2x + 5 = 17...
Alternativas: ["4","5","6","7","8"]
Correta (índice): 2

✅ Verificação concluída!
```

✅ **PASS** se mostrar 90 questões

---

### Teste #2: Fazer Simulado Rápido (2 minutos)

1. Acesse http://localhost:3000
2. Faça cadastro/login (qualquer email/senha)
3. Clique em **"Simulado Rápido"**
4. Responda as 10 questões
5. Clique em **"Finalizar"**

**Verificar:**
- ✅ Questões vêm do banco (não são mock)
- ✅ Enunciados fazem sentido
- ✅ 5 alternativas (A, B, C, D, E)
- ✅ Pode finalizar simulado

---

### Teste #3: Ver Resultado (1 minuto)

Após finalizar o simulado:

**Verificar:**
- ✅ Nota TRI é exibida (0-1000)
- ✅ Acertos/Erros/Porcentagem corretos
- ✅ FP ganhos exibidos
- ✅ Questões erradas listadas

---

### Teste #4: Tutor IA - Explicação (2 minutos)

Na página de resultado:

1. Clique em **"Ver Detalhes"**
2. Veja as questões erradas
3. Para cada questão errada, veja o **Tutor IA**
4. Clique em **"Explicar por que errei"**

**IMPORTANTE:** Backend precisa estar rodando!

**Verificar:**
- ✅ Componente TutorExplicacao aparece
- ✅ Botão "Explicar por que errei" presente
- ✅ Ao clicar, mostra loading (dots animados)
- ✅ Explicação aparece (se Ollama estiver instalado)

**Se der erro:**
- ❌ Verificar se backend está rodando
- ❌ Verificar console do navegador (F12)
- ❌ Se erro 500: Ollama não instalado (OK, é opcional)

---

### Teste #5: Re-explicação com Simplificação (3 minutos)

Após receber a primeira explicação:

1. Clique em **"Explicar de novo (mais simples)"**
2. Veja a nova explicação
3. Clique novamente (até 5 vezes total)

**Verificar:**
- ✅ Tentativa 1-2: Bolha **amarela** (Normal)
- ✅ Tentativa 3: Bolha **azul** (Simples)
- ✅ Tentativa 4: Bolha **verde** (Muito Simples)
- ✅ Tentativa 5: Bolha **rosa** (ELI5)
- ✅ Após 5 tentativas, botão desabilita

**Verificar Estilos:**
- ✅ Mensagens do tutor à esquerda
- ✅ Animação de entrada (slide in)
- ✅ Cores mudam conforme nível
- ✅ Badge do nível exibido
- ✅ Design com moldura de madeira

---

### Teste #6: Dashboard e Gamificação (1 minuto)

1. Vá para **Dashboard** (botão no resultado)
2. Veja suas estatísticas

**Verificar:**
- ✅ FP atualizado
- ✅ Simulados completados
- ✅ Streak (dias consecutivos)
- ✅ Badges desbloqueados

---

## 📋 CHECKLIST COMPLETO

```
□ 1. Backend rodando (http://localhost:8000)
□ 2. Frontend rodando (http://localhost:3000)
□ 3. Banco tem 90 questões
□ 4. Cadastro/Login funciona
□ 5. Simulado carrega 10 questões reais
□ 6. Pode responder e finalizar
□ 7. Resultado exibe nota TRI
□ 8. FP ganhos calculados corretamente
□ 9. Questões erradas listadas
□ 10. TutorExplicacao aparece em cada questão
□ 11. Botão "Explicar" funciona
□ 12. Re-explicações ficam mais simples
□ 13. Cores mudam (amarelo → azul → verde → rosa)
□ 14. Estilos CSS aplicados corretamente
□ 15. Animações funcionando
□ 16. Dashboard mostra estatísticas
```

---

## ⚠️ TROUBLESHOOTING

### Erro: "Backend não conecta"

**Solução:**
```bash
cd D:\enem-ia\backend
start-backend.bat
```

Aguarde ver: `Uvicorn running on http://0.0.0.0:8000`

---

### Erro: "Explicação retorna erro 500"

**Causa:** Ollama não instalado

**Opções:**
1. **Instalar Ollama:**
   - Baixe em: https://ollama.ai
   - Instale
   - Execute: `ollama pull llama3`
   - Execute: `ollama serve`

2. **Ignorar (é opcional):**
   - Sistema funciona sem Ollama
   - Explicações IA não funcionarão
   - Resto do sistema OK

---

### Erro: "Questões não aparecem"

**Verificar:**
```bash
cd D:\enem-ia\enem-pro
node verify-questions.js
```

Se retornar 0 questões:
```bash
npx prisma db seed
```

---

### Erro: "Página em branco"

**Verificar console (F12):**
- Erros de import?
- Componentes não encontrados?
- API calls falhando?

**Solução comum:**
```bash
cd D:\enem-ia\enem-pro
npm install
npm run dev
```

---

## 📊 MÉTRICAS DE SUCESSO

✅ **Sistema está PRONTO quando:**

- [ ] Todos os 16 itens do checklist ✅
- [ ] Zero erros no console
- [ ] Fluxo completo funciona (cadastro → simulado → resultado → explicação)
- [ ] Estilos CSS aplicados
- [ ] Animações suaves
- [ ] FP calculado corretamente

---

## 🎯 OBJETIVOS DOS TESTES

| Objetivo | Status | Prioridade |
|----------|--------|------------|
| Questões reais do banco | ⏳ Pendente | 🔴 Alta |
| Tutor IA integrado | ⏳ Pendente | 🔴 Alta |
| Estilos CSS aplicados | ⏳ Pendente | 🔴 Alta |
| Simplificações progressivas | ⏳ Pendente | 🟡 Média |
| Animações funcionando | ⏳ Pendente | 🟢 Baixa |
| Gamificação (FP) | ⏳ Pendente | 🟡 Média |

---

## 📸 SCREENSHOTS ESPERADOS

### 1. Página de Resultado
- Nota TRI grande (700-900)
- Cards de acertos/erros/porcentagem
- FP ganhos em roxo
- Botão "Ver Detalhes"

### 2. Questões Erradas
- Alternativas coloridas (verde = correta, vermelha = marcada)
- Tutor IA logo abaixo
- Moldura de madeira no container

### 3. Tutor IA Ativo
- Bolha do tutor à esquerda
- Cor da bolha muda conforme nível
- Botões de ação abaixo
- Contador de tentativas

---

## ✅ CONCLUSÃO

Após completar todos os testes:

1. ✅ Marcar itens como concluídos em `TESTES-COMPLETOS.md`
2. 📸 Tirar screenshots
3. 🐛 Documentar bugs encontrados
4. 🔧 Corrigir erros críticos
5. 🚀 Preparar para deploy

---

**Tempo estimado total:** ~15 minutos
**Última atualização:** 2025-12-10
