import { HistoryCard } from '@/components/features/SimulationHistory/HistoryCard'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'
import { Goal } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SimulationHistoryPage() {
  const { getAllFormData, deleteSimulation } = useSimulationStorage()
  const [data, setData] = useState(() => getAllFormData())
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setData(getAllFormData())
  }

  const handleDetail = (id: string) => {
    navigate(`/resultado/${id}`)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10  sm:py-14 ">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      <ul>
        {data.map((record) => (
          <HistoryCard
            key={record.id}
            icon={Goal}
            target={record.goalName}
            date={new Date()}
            targetValue={record.goalAmount}
            time={record.goalDeadline}
            targetEconomy={`R$ ${calcMonthlySavings(record).toLocaleString(
              'pt-BR',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}`}
            onDelete={() => handleDelete(record.id)}
            onViewDetails={() => handleDetail(record.id)}
          />
        ))}
      </ul>
    </main>
  )
}
