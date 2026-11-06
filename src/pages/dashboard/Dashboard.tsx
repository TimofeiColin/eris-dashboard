import { Icon } from '../../components/icon'
import { Card } from '../../components/card'
import { dashboardApi } from '../../api'
import { useFetch } from '../../hooks'
import { ErrorMessage } from '../../components/feedback'
import { cards } from './cards.ts'

function Dashboard() {
  const { data: stats, error, loading } = useFetch(dashboardApi.getStats)

  return (
    <section className="relative flex flex-col items-center pt-8 text-center sm:pt-14">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-accent-bg blur-3xl"
        aria-hidden="true"
      />

      <div className="mb-8 flex rounded-full bg-accent-bg p-5 text-accent shadow-[0_0_48px_var(--color-accent-bg)]">
        <Icon src="/icons/eris.svg" className="size-16" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        <span className="bg-linear-to-r from-text-h to-accent bg-clip-text text-transparent">
          Hey there! I'm Eris
        </span>{' '}
        ✨
      </h1>
      <p className="mt-4 text-lg sm:text-xl">
        your friendly neighborhood discord bot
      </p>

      <h2 className="mt-14 mb-5 text-sm font-semibold tracking-widest text-accent uppercase">
        At a glance
      </h2>
      <ul className="grid w-full max-w-4xl gap-4 text-left sm:grid-cols-3">
        {cards.map((card) => (
          <li key={card.key}>
            <Card
              icon={card.icon}
              label={card.label}
              description={card.description}
              value={stats?.[card.key] ?? '—'}
              loading={loading}
              to={card.path}
            />
          </li>
        ))}
      </ul>
      {!!error && (
        <ErrorMessage className="mt-4">
          Couldn't load stats right now. Please try again later.
        </ErrorMessage>
      )}
    </section>
  )
}

export default Dashboard
