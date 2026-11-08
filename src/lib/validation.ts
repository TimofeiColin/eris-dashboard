const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Returns the color as `#RRGGBB`, or null if it isn't a valid 3- or 6-digit hex code. */
export function normalizeHex(input: string): string | null {
  const match = HEX_PATTERN.exec(input.trim())
  if (!match) return null

  const digits = match[1].length === 3 ? [...match[1]].map((d) => d + d).join('') : match[1]
  return `#${digits.toUpperCase()}`
}

export const countLetters = (text: string) => text.match(/\p{L}/gu)?.length ?? 0

export const MIN_COLOR_NAME_LETTERS = 3
export const MIN_COMMAND_LETTERS = 2
