import { MealType } from "../schema";

export function initBrowserButtonStates(types: IterableIterator<MealType>) {
  const states = new Map<string, boolean>()
  for (const type of types) {
    states.set(type.name, false)
  }
  return states
}