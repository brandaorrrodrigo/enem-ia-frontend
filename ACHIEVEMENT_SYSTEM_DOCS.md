# 🏆 Sistema de Conquistas Estilo Duolingo - ENEM-IA

## 📋 Visão Geral

Sistema de popups de conquista animados que aparecem quando o aluno alcança marcos importantes, similar ao Duolingo.

**Quando aparece:**
- ✅ Aluno alcança ou ultrapassa nota de corte do ENEM
- ✅ Aluno atinge meta pessoal configurada
- ✅ Aluno atinge nota perfeita (950+)
- ✅ Primeira vez acima de 700 pontos
- 🔜 Streak de simulados (futuro)

**Features:**
- 🎨 Animações suaves estilo Duolingo
- 🎉 Confetes animados
- 📱 Compartilhamento social (WhatsApp, Instagram, TikTok)
- ⚙️ Totalmente configurável
- 🎯 Alinhado com tema lousa/ENEM-IA

---

## 📂 Arquivos do Sistema

### Componentes

| Arquivo | Descrição |
|---------|-----------|
| `components/enem/AchievementPopup.tsx` | Componente principal do popup de conquista |
| `components/enem/ResultModal.tsx` | Modal de resultado (integrado com conquistas) |

### Configuração

| Arquivo | Descrição |
|---------|-----------|
| `config/achievements.ts` | Configurações e flags do sistema |

### Documentação

| Arquivo | Descrição |
|---------|-----------|
| `ACHIEVEMENT_SYSTEM_DOCS.md` | Este arquivo - documentação completa |

---

## 🎯 Quando o Popup Aparece

### Critério 1: Passou na Nota de Corte

```typescript
// Condição
comparacao.passou === true && comparacao.nota_corte !== null

// Exemplo
Usuário fez: 750 pontos
Nota de corte: 720 pontos
Resultado: ✅ POPUP APARECE
```

### Critério 2: Atingiu Meta Pessoal

```typescript
// Condição (futuro)
nota >= metaPessoalUsuario

// Exemplo
Usuário fez: 680 pontos
Meta pessoal: 650 pontos
Resultado: ✅ POPUP APARECE
```

### Critério 3: Nota Perfeita (950+)

```typescript
// Condição
nota >= 950

// Exemplo
Usuário fez: 965 pontos
Resultado: ✅ POPUP APARECE (com mensagem especial)
```

### Critério 4: Primeira Vez Acima de 700

```typescript
// Condição
nota >= 700 && primeiraVezAcimaDe700

// Exemplo
Usuário fez: 715 pontos (primeira vez acima de 700)
Resultado: ✅ POPUP APARECE
```

---

## 🔧 Como Funciona

### Fluxo Completo

```
┌─────────────────────────────────────────────┐
│ 1. Usuário finaliza simulado                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 2. Backend calcula nota e comparação        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 3. ResultModal recebe resultado + comparação│
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 4. ResultModal verifica se deve exibir popup│
│    - Checa config.enableAchievements        │
│    - Checa comparacao.passou                │
│    - Checa critérios adicionais             │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ✅ SIM            ❌ NÃO
         │                 │
         │                 └─→ Apenas ResultModal
         │
┌────────▼────────────────────────────────────┐
│ 5. AchievementPopup aparece após 500ms      │
│    - Animação de entrada                    │
│    - Confetes                               │
│    - Troféu animado                         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ 6. Usuário pode:                            │
│    - Compartilhar (WhatsApp/Insta/TikTok)   │
│    - Continuar estudando                    │
│    - Fechar                                 │
└─────────────────────────────────────────────┘
```

---

## 📱 Compartilhamento Social

### WhatsApp

**Como funciona:**
- Abre WhatsApp Web ou app
- Texto pré-formatado já incluído
- Usuário só precisa escolher contato e enviar

**Código:**
```typescript
const texto = getTextoCompartilhamento();
const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
window.open(url, '_blank');
```

**Exemplo de texto:**
```
🔥 Acabei de fazer um simulado ENEM e BATEU A META!

📊 Minha nota: 750/1000
🎯 Meta: 720 (Medicina - USP 2024)
✅ Acertos: 35/45 (78%)
💪 Diferença: +30 pontos!

Estude comigo no ENEM-IA! 🚀
```

---

### Instagram

**Como funciona:**
- Copia texto para clipboard
- Usuário abre Instagram e cola nos Stories/Feed
- Hashtags já incluídas

**Código:**
```typescript
const texto = getTextoCompartilhamento();
const hashtags = '\n\n#ENEMIA #SimuladoENEM #ENEM2025 #Estudos #Aprovacao';
const textoFinal = texto + hashtags;

navigator.clipboard.writeText(textoFinal)
  .then(() => alert('✅ Texto copiado! Cole no Instagram.'));
```

**Hashtags padrão:**
- #ENEMIA
- #SimuladoENEM
- #ENEM2025
- #Estudos
- #Aprovacao

---

### TikTok

**Como funciona:**
- Mesma lógica do Instagram
- Hashtags otimizadas para TikTok (inclui #FYP)

**Hashtags padrão:**
- #ENEMIA
- #SimuladoENEM
- #ENEM2025
- #FYP
- #Estudos

---

## ⚙️ Configuração

### Arquivo de Configuração

Todas as configurações estão em: `config/achievements.ts`

### Desabilitar Sistema Completamente

```typescript
// config/achievements.ts

export const defaultAchievementConfig: AchievementConfig = {
  enableAchievements: false,  // Mude para false
  // ...
};
```

**Efeito:**
- ❌ Nenhum popup aparece
- ✅ ResultModal normal continua funcionando
- ✅ Sem quebrar nada

---

### Customizar Critérios de Conquista

```typescript
// config/achievements.ts

achievementCriteria: {
  // Desabilitar popup de nota de corte
  exibirAoPassarNotaCorte: false,

  // Desabilitar popup de meta pessoal
  exibirAoAtingirMeta: false,

  // Mudar nota mínima para "primeira vez"
  exibirPrimeiraVezAcimaDe: {
    enabled: true,
    notaMinima: 800,  // Mudou de 700 para 800
  },

  // Mudar nota mínima para "nota perfeita"
  exibirNotaPerfeita: {
    enabled: true,
    notaMinima: 900,  // Mudou de 950 para 900
  },
}
```

---

### Customizar Compartilhamento

```typescript
// config/achievements.ts

sharing: {
  // Desabilitar botões individuais
  enableWhatsApp: true,
  enableInstagram: false,  // Desabilita Instagram
  enableTikTok: false,     // Desabilita TikTok

  // Customizar texto
  textTemplate: `Meu texto customizado!

Nota: {nota}/1000
Meta: {meta}
Acertos: {acertos}/{total}

#MeuApp`,

  // Customizar hashtags
  hashtags: {
    instagram: ['MeuApp', 'Estudos', 'ENEM'],
    tiktok: ['MeuApp', 'FYP', 'ENEM'],
  },
}
```

**Variáveis disponíveis no template:**
- `{nota}` - Nota do simulado (ex: 750)
- `{meta}` - Nota de referência + label (ex: "720 (Medicina - USP)")
- `{acertos}` - Número de acertos (ex: 35)
- `{total}` - Total de questões (ex: 45)
- `{porcentagem}` - Porcentagem de acertos (ex: 78)
- `{diferenca}` - Diferença da meta (ex: 30)

---

### Customizar Delay e Animações

```typescript
// config/achievements.ts

export const defaultAchievementConfig: AchievementConfig = {
  popupDelay: 1000,      // 1 segundo (padrão: 500ms)
  confettiDuration: 5000, // 5 segundos (padrão: 3000ms)
  // ...
};
```

---

## 🎨 Estilo Visual

### Cores Principais

| Elemento | Cor | Hex |
|----------|-----|-----|
| Borda principal | Dourado | `#FFD700` |
| Fundo | Preto escuro | `#1a1a1a` |
| Nota (verde) | Verde | `#4CAF50` |
| Background destaque | Verde escuro | `#0d1f14` |
| WhatsApp | Verde WhatsApp | `#25D366` |
| Instagram | Rosa Instagram | `#E1306C` |
| TikTok | Preto + Cyan | `#000` + `#00f2ea` |

### Animações

1. **Entrada do Modal:**
   - Fade in do overlay (300ms)
   - Scale in do conteúdo (500ms cubic-bezier)

2. **Troféu:**
   - Bounce infinito (1s ease-in-out)

3. **Confetes:**
   - 50 partículas coloridas
   - Caem de cima para baixo
   - Duração: 2-5s (randomizado)
   - Opacity fade out

4. **Botões:**
   - Hover: scale(1.05)
   - Transition: 0.2s

---

## 🧪 Como Testar

### Teste 1: Passar na Nota de Corte

```bash
# 1. Criar simulado
POST /api/enem/simulados/start
{
  "user_id": "teste@email.com",
  "quantidade": 10
}

# 2. Responder questões (acertar 80%)
# ...

# 3. Finalizar simulado
POST /api/enem/simulados/finish
{
  "user_id": "teste@email.com",
  "simulado_id": "clx123"
}

# 4. Comparar com nota de corte
POST /api/enem/simulados/compare-score
{
  "user_id": "teste@email.com",
  "simulado_id": "clx123",
  "curso": "Medicina",
  "universidade": "USP",
  "ano": 2024
}
```

**Resultado esperado:**
- Se `nota >= nota_corte`: ✅ POPUP APARECE
- Se `nota < nota_corte`: ❌ Apenas ResultModal normal

---

### Teste 2: Verificar Compartilhamento

1. Fazer simulado que passa na nota de corte
2. Popup aparece
3. Clicar em "WhatsApp"
   - ✅ Abre WhatsApp com texto formatado
4. Clicar em "Instagram"
   - ✅ Texto copiado para clipboard
   - ✅ Alert de confirmação
5. Clicar em "TikTok"
   - ✅ Texto copiado (com hashtags TikTok)
   - ✅ Alert de confirmação

---

### Teste 3: Desabilitar Sistema

```typescript
// config/achievements.ts
enableAchievements: false
```

**Resultado esperado:**
- ❌ Popup NUNCA aparece
- ✅ ResultModal normal funciona
- ✅ Sem erros no console

---

### Teste 4: Nota Perfeita (950+)

1. Criar simulado
2. Acertar TODAS as questões
3. Finalizar

**Resultado esperado:**
- ✅ Popup aparece (se nota >= 950)
- ✅ Mensagem especial de nota perfeita

---

## 🔍 Localização do Código

### Lógica de Exibição

**Arquivo:** `components/enem/ResultModal.tsx`

**Linhas 35-72:**
```typescript
// Determina se deve mostrar popup
const deveExibirConquista = React.useMemo(() => {
  if (!comparacao) return false;
  if (comparacao.passou && comparacao.nota_corte) {
    return true;
  }
  // ... outras condições
  return false;
}, [comparacao]);

// Mostra popup após delay
React.useEffect(() => {
  if (deveExibirConquista) {
    const timer = setTimeout(() => {
      setShowAchievement(true);
    }, 500);
    return () => clearTimeout(timer);
  }
}, [deveExibirConquista]);
```

---

### Componente do Popup

**Arquivo:** `components/enem/AchievementPopup.tsx`

**Props principais:**
```typescript
interface AchievementPopupProps {
  show: boolean;                    // Exibir ou não
  nota: number;                     // Nota do simulado
  notaReferencia: number;           // Nota de corte/meta
  tipoReferencia: 'nota_corte' | 'meta_pessoal';
  labelReferencia: string;          // "Medicina - USP 2024"
  acertos: number;                  // Questões acertadas
  total: number;                    // Total de questões
  porcentagem: number;              // % de acertos
  onClose: () => void;              // Callback fechar
  onContinuar: () => void;          // Callback continuar
}
```

---

### Compartilhamento

**WhatsApp (linha 93):**
```typescript
const handleCompartilharWhatsApp = () => {
  const texto = getTextoCompartilhamento();
  const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
};
```

**Instagram/TikTok (linha 104):**
```typescript
const handleCopiarTexto = (plataforma: 'instagram' | 'tiktok') => {
  const texto = getTextoCompartilhamento();
  const hashtags = plataforma === 'instagram'
    ? '\n\n#ENEMIA #SimuladoENEM #ENEM2025 #Estudos #Aprovacao'
    : '\n\n#ENEMIA #SimuladoENEM #ENEM2025 #FYP #Estudos';

  const textoFinal = texto + hashtags;
  navigator.clipboard.writeText(textoFinal);
};
```

---

## 📊 Estatísticas e Métricas (Futuro)

### Tracking Recomendado

Para melhorar o sistema, considere trackear:

1. **Conversão de compartilhamentos:**
   - Quantos clicam em WhatsApp?
   - Quantos copiam para Instagram/TikTok?

2. **Taxa de conquistas:**
   - % de usuários que desbloqueiam conquistas
   - Conquista mais comum

3. **Engajamento:**
   - Tempo médio até fechar popup
   - Taxa de clique em "Continuar Estudando"

### Implementação Futura

```typescript
// analytics.ts (criar)
export function trackAchievementShown(tipo: string, nota: number) {
  // Google Analytics, Mixpanel, etc.
  analytics.track('achievement_shown', {
    type: tipo,
    score: nota,
  });
}

export function trackSocialShare(platform: string) {
  analytics.track('achievement_shared', {
    platform: platform,
  });
}
```

---

## 🚀 Próximos Passos (Roadmap)

### Fase 2: Múltiplas Conquistas

- [ ] Sistema de badges/emblemas
- [ ] Conquistas desbloqueáveis (Bronze, Prata, Ouro)
- [ ] Streak de dias estudando
- [ ] Conquista por área (Mestre em Matemática)

### Fase 3: Gamificação Avançada

- [ ] XP e níveis
- [ ] Desafios semanais
- [ ] Conquistas secretas
- [ ] Ranking de conquistas

### Fase 4: Social

- [ ] Compartilhar conquista direto no feed da plataforma
- [ ] Ver conquistas de amigos
- [ ] Desafiar amigos
- [ ] Leaderboard de conquistas

---

## ❗ Troubleshooting

### Popup não aparece

**Checklist:**
1. ✅ `enableAchievements` está `true`?
2. ✅ `comparacao.passou` está `true`?
3. ✅ `comparacao.nota_corte` existe?
4. ✅ Console do navegador sem erros?

**Debug:**
```typescript
// Adicione no ResultModal
console.log('Debug Achievement:', {
  deveExibir: deveExibirConquista,
  comparacao,
  config: getAchievementConfig(),
});
```

---

### WhatsApp não abre

**Possíveis causas:**
1. Popup blocker do navegador
2. WhatsApp não instalado (mobile)

**Solução:**
```typescript
// Avisar usuário
try {
  window.open(url, '_blank');
} catch (error) {
  alert('Habilite popups para compartilhar no WhatsApp');
}
```

---

### Texto não copia (Instagram/TikTok)

**Possíveis causas:**
1. Navegador não suporta Clipboard API
2. HTTPS necessário

**Solução:**
```typescript
if (!navigator.clipboard) {
  // Fallback para navegadores antigos
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
```

---

### Animações travadas

**Possíveis causas:**
1. Dispositivo lento
2. Muitos confetes

**Solução:**
```typescript
// Reduzir confetes em dispositivos lentos
const numConfetti = window.innerWidth > 768 ? 50 : 25;
```

---

## 📝 Checklist de Implementação

- [x] ✅ Componente AchievementPopup criado
- [x] ✅ Integração com ResultModal
- [x] ✅ Compartilhamento WhatsApp
- [x] ✅ Compartilhamento Instagram
- [x] ✅ Compartilhamento TikTok
- [x] ✅ Arquivo de configuração
- [x] ✅ Animações de entrada/saída
- [x] ✅ Confetes animados
- [x] ✅ Lógica de critérios
- [x] ✅ Documentação completa

---

## 🎯 Resumo

**Sistema de conquistas totalmente funcional que:**

✅ Aparece quando aluno bate meta/nota de corte
✅ Animações suaves estilo Duolingo
✅ Compartilhamento social (WhatsApp, Instagram, TikTok)
✅ Totalmente configurável via `config/achievements.ts`
✅ Fácil de desabilitar (uma flag)
✅ Alinhado com tema lousa/ENEM-IA
✅ Sem quebrar rotas existentes
✅ Documentação completa

**Para customizar:**
- Critérios: `config/achievements.ts`
- Visual: `components/enem/AchievementPopup.tsx`
- Lógica: `components/enem/ResultModal.tsx`

**Para desabilitar:**
```typescript
enableAchievements: false
```

---

_Criado em: 2025-11-14_
_Sistema: ENEM-IA Achievements_
_Versão: 1.0_
