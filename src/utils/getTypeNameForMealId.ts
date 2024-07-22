import { MealType } from "../schema";

export function getTypeNameForMealId(id: number, types: MealType[]) {
  const type = types.find((type) => type.id == id)
  if (!type) {
    return null
  }
  return type.name
}