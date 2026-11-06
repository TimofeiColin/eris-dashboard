import type { Entity } from '../contracts'
import { seedColorGroups, seedColors, seedSayings, type MockColor, type MockColorGroup } from './data.ts'

interface MockStore {
  colorGroups: MockColorGroup[]
  colors: MockColor[]
  sayings: string[]
}

let state: MockStore | null = null

// In-memory "collections", created on first use so builds that don't use the mock can drop them.
// Reset on page reload.
export function getStore(): MockStore {
  if (!state) {
    state = {
      colorGroups: seedColorGroups.map((group) => ({ ...group })),
      colors: seedColors.map((color) => ({ ...color })),
      sayings: [...seedSayings],
    }
  }
  return state
}

export const nextId = (items: Entity[]) =>
  items.reduce((max, item) => Math.max(max, item._id), 0) + 1
