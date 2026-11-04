import { Icon } from '../icon'

interface ErisLogoProps {
  className?: string
}

function ErisLogo({ className = '' }: ErisLogoProps) {
  return <Icon src="/icons/eris.svg" className={className} />
}

export default ErisLogo
