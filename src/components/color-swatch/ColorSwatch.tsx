interface ColorSwatchProps {
  /** A CSS color. When missing, an empty dashed square is shown. */
  color?: string | null
  className?: string
}

function ColorSwatch({ color, className = 'size-5' }: ColorSwatchProps) {
  return (
    <span
      className={`inline-block shrink-0 rounded-md border ${
        color ? 'border-border' : 'border-dashed border-text/50'
      } ${className}`}
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden="true"
    />
  )
}

export default ColorSwatch
