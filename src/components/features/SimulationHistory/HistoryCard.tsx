import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import {
  SquareArrowOutUpRight,
  Trash2Icon,
  type LucideIcon,
} from 'lucide-react'

interface CardProps {
  icon: LucideIcon
  target: string
  date: Date | string
  targetValue: string
  time: string
  targetEconomy: string
  onDelete?: () => void
  onViewDetails?: () => void
  variant?: 'default' | 'primary'
}

const variantClasses = {
  default: {
    card: 'bg-[var(--card)]',
    accent: 'text-[var(--primary)] stroke-current',
    value: 'text-[var(--foreground)]',
    subtitle: 'text-[var(--muted-foreground)]',
  },
  primary: {
    card: 'bg-[var(--primary)]',
    accent: 'text-[var(--primary-foreground)] stroke-current',
    value: 'text-[var(--primary-foreground)]',
    subtitle: 'text-[var(--primary-foreground)]/70',
  },
  secondary: {
    card: 'bg-[var(--secondary)]',
    accent: 'text-[var(--secondary-foreground)] stroke-current',
    value: 'text-[var(--secondary-foreground)]',
    subtitle: 'text-[var(--secondary-foreground)]/70',
  },
}

export function HistoryCard({
  icon: Icon,
  target,
  date,
  targetValue,
  time,
  targetEconomy,
  onDelete,
  onViewDetails,
  variant = 'default',
}: CardProps) {
  const styles = variantClasses[variant]

  return (
    <div
      className={[
        'mb-4 flex flex-col  rounded-2xl p-6 shadow-[4px_4px_18px_0px_var(--card-shadow)] md:flex-row md:items-center md:justify-between md:gap-4',
        styles.card,
      ].join(' ')}
    >
      <Icon size={28} className={[styles.accent, 'mb-4'].join(' ')} />
      <div className="mb-2  flex flex-col items-start gap-2 ">
        <span
          className={[
            ' text-xs font-semibold uppercase tracking-widest',
            styles.value,
          ].join(' ')}
        >
          {target}
        </span>
        <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>
          {typeof date === 'string'
            ? date
            : date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
        </p>
      </div>

      <div className="mb-3 flex flex-col items-start gap-2">
        <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>
          Custo da meta
        </p>
        <span className={['text-2xl font-semibold', styles.value].join(' ')}>
          {targetValue}
        </span>
      </div>
      <div className="mb-3 flex flex-col items-start gap-2">
        <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>Prazo</p>
        <span className={['text-2xl font-semibold', styles.value].join(' ')}>
          {`
            ${time} meses
          `}
        </span>
      </div>
      <div className="mb-3 flex flex-col items-start gap-2">
        <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>
          Economia mensal
        </p>
        <span className={['text-2xl font-semibold', styles.value].join(' ')}>
          {targetEconomy}
        </span>
      </div>

      <Divider orientation="vertical" />

      <div className="flex ">
        <Button
          type="button"
          variant="ghost"
          icon={Trash2Icon}
          onClick={onDelete}
          className="order-1 flex-1  text-red-500 sm:order-2"
        ></Button>
        <Button
          type="button"
          variant={variant === 'default' ? 'primary' : 'ghost'}
          icon={SquareArrowOutUpRight}
          onClick={onViewDetails}
          className="order-1 w-[80px] flex-1  rounded-3xl sm:order-2 md:w-[300] lg:w-[300px]"
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}
