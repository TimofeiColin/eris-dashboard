interface IconProps {
  src: string
  className?: string
}

function Icon({ src, className = '' }: IconProps) {
  return (
    <span
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ mask: `url("${src}") center / contain no-repeat` }}
      aria-hidden="true"
    />
  )
}

export default Icon
