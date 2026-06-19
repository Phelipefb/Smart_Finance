import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' 
  icon?: LucideIcon
}

const baseClasses =
  'flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

  const variantClasses = {
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-xl',
  secondary: 'bg-[var(--secondary-button)] border border-[var(--border)] rounded-3xl',
  ghost: 'rounded-lg text-[var(--foreground)]',
}
export function Button ({
  variant,
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps): import("react").JSX.Element {
  return (
    <button {...props} className={[baseClasses, variantClasses[variant], className].join(' ')}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  )
}
