# Smart Finance (Planej.ai)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/package-manager-pnpm-%2300a9b5)](https://pnpm.io/)
[![vite](https://img.shields.io/badge/bundler-vite-orange)](https://vitejs.dev/)
[![react](https://img.shields.io/badge/framework-react-61dafb)](https://reactjs.org/)

Aplicação web de planejamento financeiro pessoal que gera um diagnóstico e sugestões usando IA generativa (Google Gemini). Os dados da simulação são salvos no `localStorage`, a interface é uma SPA em React + TypeScript e o projeto é estilizado com Tailwind CSS.

---

## O que o projeto faz

- Permite ao usuário preencher um formulário multi-step com renda, gastos, dívidas e meta financeira.
- Gera um diagnóstico financeiro personalizado com sugestões, ideias de renda extra e plano de ação via API generativa.
- Armazena simulações localmente no navegador (`localStorage`) e permite visualizar histórico de simulações.
- Oferece um chat para tirar dúvidas adicionais sobre o diagnóstico.

---

## Como executar a aplicação

Pré-requisitos:

- Node.js (>=18 recomendável)
- pnpm

1. Instale as dependências:

```bash
pnpm install
```

2. Defina a variável de ambiente da API (opcional, necessária para insights reais):

Crie um arquivo `.env.local` na raiz com:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

4. Build para produção e preview:

```bash
pnpm build
pnpm preview
```

Observação: sem a chave da API o recurso de geração de insights pode falhar ou retornar mock. Teste o chat sem chave para validar o fluxo de UI.

---

## Tecnologias usadas

| Camada       | Tecnologias                              |
| ------------ | ---------------------------------------- |
| Frontend     | `react`, `react-dom`, `react-router-dom` |
| Build / Dev  | `vite`, `pnpm`                           |
| Tipagem      | `typescript`                             |
| UI / Estilos | `tailwindcss`, `@fontsource/inter`       |
| Ícones       | `lucide-react`                           |
| Utilitários  | `react-loading-skeleton`                 |

Arquivos principais: `src/main.tsx`, `src/App.tsx`, `src/router.tsx`, `src/pages/*`, `src/components/*`, `src/services/aiService.ts`.

---

## Qual melhoria eu implementei

- Limpeza do código: removi linhas de comentários explicativos espalhadas pelo código para manter o codebase mais enxuto e facilitar leitura. Arquivos alterados:
  - `src/components/features/SimulationResults/AIInsightsCardProps.tsx`
  - `src/components/shared/Header.tsx`
  - `src/hooks/useInsight.tsx`
  - `src/services/aiService.ts`

Além disso, com base nos desafios propostos, o projeto contempla as seguintes melhorias funcionais já implementadas e integradas ao fluxo principal:

- Página de Histórico de Simulações (Desafio 1):
  - Exibe um resumo de cada simulação salva (valores da simulação e meta).
  - Layout responsivo seguindo o estilo do projeto (cards e ações adaptáveis).
  - Permite excluir uma simulação do histórico e navegar para o detalhe da simulação.
  - Ao clicar em "Ver detalhes", a aplicação navega para a página de resultados com os insights já gerados.

- Conversa com o Educador Financeiro (Desafio 2):
  - Campo de texto dentro do componente `AIInsightsCard` para enviar perguntas relacionadas à simulação.
  - A IA responde com mensagens claras; cada resposta é exibida no histórico de conversa.
  - Scroll automático para o final quando a IA retorna uma resposta, garantindo boa usabilidade.
  - Feedback visual de carregamento (estado de digitação/loader) e tratamento de erro visível ao usuário.
  - Usuário pode fazer múltiplas perguntas por simulação; todo o histórico de perguntas e respostas é exibido na tela.
  - Conversas são persistidas no `localStorage` para consulta posterior e aparecem no histórico da simulação.

Arquivos relevantes para essas melhorias (implementação e integração):

- `src/pages/SimulationHistoryPage.tsx` — lista e ações de histórico.
- `src/components/features/SimulationHistory/HistoryCard.tsx` — resumo visual de cada simulação.
- `src/components/features/SimulationResults/AIInsightsCardProps.tsx` — chat, envio de perguntas, scroll automático.
- `src/hooks/useSimulationStorage.tsx` — persistência e atualização das simulações no `localStorage`.
- `src/services/aiService.ts` — chamadas à API generativa e formatação das mensagens.
- `src/hooks/useInsight.tsx` — controle de carregamento/erro ao buscar insights.

Essas mudanças melhoram a experiência de consulta e interação com os insights, tornando a ferramenta mais útil para validar e evoluir planos financeiros.

---

## Como testar o fluxo principal

1. Abra o app em `http://localhost:5173` (ou porto indicado pelo Vite).
2. Na página principal escolha "Nova Simulação" e preencha os passos do formulário:
   - Renda mensal
   - Custos fixos
   - Dívidas / parcelas
   - Nome da meta
   - Custo da meta
   - Prazo desejado (meses)
3. Envie o formulário para gerar a simulação. Você será redirecionado para a página de resultados.
4. Na página de resultados:
   - Confira os cards com cálculo de economia mensal.
   - Aguarde o diagnóstico da IA aparecer (se a chave da API estiver configurada).
5. Teste o chat de perguntas sobre o diagnóstico: digite uma pergunta e envie — a resposta virá da função `getChatResponse` que usa o serviço de IA.
6. Confira o histórico de simulações em `Histórico` para ver registros salvos no `localStorage`.

Dica para testes sem chave da API: verifique se a interface mostra estados de carregamento e mensagens de erro amigáveis; valide também a persistência no `localStorage` (abra DevTools → Application → Local Storage).

---

## O que aprendi durante o desafio

- Integração com APIs generativas (construção de prompts e formatação de requisições para o Google Gemini).
- Boas práticas com React + TypeScript: tipagens explícitas para hooks e dados da simulação.
- Uso de `localStorage` para persistência simples de registros do usuário.
- Organização de uma UI com Tailwind CSS e criação de componentes reutilizáveis (botões, inputs, cards).
- Fluxos assíncronos e tratamento de estados de carregamento/erro em hooks personalizados (`useInsight`, `useSimulationStorage`).

---
