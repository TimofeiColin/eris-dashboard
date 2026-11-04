import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Icon } from '../icon'
import { Loader } from '../loader'

interface CardProps {
  icon: string
  label: string
  value: ReactNode
  description?: string
  loading?: boolean
  to?: string
}

function Card({ icon, label, value, description, loading = false, to }: CardProps) {
  const className =
    'group block h-full w-full rounded-2xl border border-border bg-sidebar p-6 text-left transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent-bg'

  const content = (
    <>
      <span className="flex items-center gap-3">
        <span className="flex rounded-xl bg-accent-bg p-2.5 text-accent">
          <Icon src={icon} className="size-6" />
        </span>
        <span className="font-medium text-text-h">{label}</span>
      </span>
      <span className="mt-5 flex h-12 items-center text-5xl font-bold text-text-h tabular-nums">
        {loading ? <Loader className="size-10" /> : value}
      </span>
      {description && <span className="mt-3 block text-sm">{description}</span>}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`${className} focus-visible:border-accent focus-visible:outline-none`}
      >
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}

export default Card
