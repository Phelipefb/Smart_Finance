import 'react-loading-skeleton/dist/skeleton.css'

import { useState, useRef, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Goal } from 'lucide-react'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import type { ChatMessage } from '@/data/simulation'
import { useInsight } from '@/hooks/useInsight'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'
import { getChatResponse } from '@/services/aiService'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const [chatError, setChatError] = useState<string | null>(null)
  const { getFormData, updateSimulation } = useSimulationStorage()
  const simulation = getFormData(simulationId)

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(
    () => simulation?.chatHistory || [],
  )
  const [inputValue, setInputValue] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chatHistory, isChatLoading])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || !simulation) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
    }

    const updatedHistory = [...chatHistory, userMessage]
    setChatHistory(updatedHistory)
    setInputValue('')
    setIsChatLoading(true)

    try {
      const responseText = await getChatResponse(simulation, updatedHistory)
      const modelMessage: ChatMessage = {
        role: 'model',
        content: responseText,
      }

      const finalHistory = [...updatedHistory, modelMessage]
      setChatHistory(finalHistory)
      updateSimulation(simulationId, {
        ...simulation,
        chatHistory: finalHistory,
      } as any)
    } catch (err) {
      console.error(err)
      setChatError(
        'O educador financeiro está temporariamente sobrecarregado. Tente enviar sua pergunta novamente em instantes.',
      )
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="order-2 rounded-2xl bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}

      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}

      {!isLoading && insight && !error && (
        <>
          <Content insight={insight} />

          <Divider className="my-6" />

          <div
            ref={chatContainerRef}
            className="lg:scrollbar-thin mb-4 flex max-h-80 flex-col gap-4 p-2 lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:var(--border)_transparent]"
          >
            {chatHistory.length === 0 && (
              <p className="my-4 text-center text-xs text-muted-foreground">
                Tire suas dúvidas sobre o planejamento acima enviando uma
                mensagem!
              </p>
            )}

            {chatHistory.map((message, index) => {
              const isUser = message.role === 'user'

              return (
                <div
                  key={index}
                  className={[
                    'flex max-w-[80%] flex-col',
                    isUser ? 'items-end self-end' : 'items-start self-start',
                  ].join(' ')}
                >
                  <span className="mb-1 px-1 text-[10px] font-semibold text-muted-foreground">
                    {isUser ? '👤 Você' : '✨ Planej.ai'}
                  </span>

                  <div
                    className={[
                      'rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm',
                      isUser
                        ? 'rounded-tr-none bg-primary text-primary-foreground'
                        : 'whitespace-pre-line rounded-tl-none bg-secondary-button text-foreground',
                    ].join(' ')}
                  >
                    {message.content}
                  </div>
                </div>
              )
            })}

            {isChatLoading && (
              <div className="max-w-[80%] animate-pulse self-start rounded-2xl rounded-tl-none bg-secondary-button px-4 py-2 text-sm text-foreground">
                Digitando...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Faça uma pergunta sobre o diagnóstico..."
              className="border-(--border) flex-1 rounded-xl border bg-input px-4 py-2 text-sm text-foreground outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isChatLoading}
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-xl px-4 py-2"
              disabled={isChatLoading || !inputValue.trim()}
            >
              Enviar
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
