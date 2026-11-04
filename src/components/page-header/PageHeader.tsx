import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

function PageHeader({ title, description, actions, children }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-text-h">{title}</h1>
      {description && <p className="mt-2">{description}</p>}
      {actions && <div className="mt-12 flex justify-end gap-3">{actions}</div>}
      {children && <div className="mt-8">{children}</div>}
    </header>
  )
}

export default PageHeader
