import { AlignLeft } from 'lucide-react'
import type { SimulationRecord } from '@/data/simulation'

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as InsightData
}

export const getChatResponse = async (
  simulation: SimulationRecord,
  history: { role: 'user' | 'model'; content: string }[],
) => {
  const formattedContents = history.map((message, index) => {
    if (index === 0 && message.role === 'user') {
      const systemContext = `
Você é o educador financeiro Planej.ai, um mentor de finanças inteligente e prestativo.
O usuário realizou uma simulação financeira com os seguintes dados:
- Renda mensal bruta: R$ ${simulation.income || simulation.goalName}
- Custos fixos de vida: R$ ${simulation.expenses}
- Dívidas ou parcelas: R$ ${simulation.debts}
- Nome da meta: ${simulation.goalName}
- Custo total da meta: R$ ${simulation.goalAmount}
- Prazo desejado: ${simulation.goalDeadline} meses
- Você já deu o diagnóstico inicial na tela. Agora, o usuário quer tirar dúvidas adicionais.
- REGRAS DE FORMATAÇÃO DA RESPOSTA:
  1. Responda de forma clara, amigável e direta.
  2. Organize sua resposta em parágrafos curtos.
  3. Se for listar dicas, sugestões ou passos, use listas organizadas com emojis temáticos (ex: 📌, 💡, 💰, 🚀) como marcadores, em vez de traços (-) ou asteriscos (*).
  4. Nãousar marcações complexas de Markdown (como hashtags # para títulos) para manter o visual do balão de chat limpo.
  5. Quando quiser destacar um termo importante, você pode usar letras maiúsculas discretas ou colocá-lo entre aspas.
- Dúvida inicial do usuário: ${message.content}
      `.trim()
      return {
        role: 'user',
        parts: [{ text: systemContext }],
      }
    }
    return {
      role: message.role,
      parts: [{ text: message.content }],
    }
  })
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: formattedContents,
    }),
  })
  if (!response.ok) {
    throw new Error(`Erro na requisição do chat: ${response.status}`)
  }
  const data = (await response.json()) as GeminiResponse

  return data.candidates[0].content.parts[0].text
}
