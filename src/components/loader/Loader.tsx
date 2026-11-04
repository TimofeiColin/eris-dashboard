import progressIcon from '@material-symbols/svg-400/outlined/progress_activity.svg'
import { Icon } from '../icon'

interface LoaderProps {
  className?: string
  label?: string
}

function Loader({ className = 'size-6', label = 'Loading' }: LoaderProps) {
  return (
    <span role="status" className="inline-flex text-accent">
      <Icon src={progressIcon} className={`animate-spin ${className}`} />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default Loader
