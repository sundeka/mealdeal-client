import { MealItem } from "../schema";

export function parseMealItemsFromCurrentMeal(currentMeal: Map<string, MealItem>) {
  var mealItems: MealItem[] = []
  for (const food of currentMeal.values()) {
    mealItems.push(food)
  }
  return mealItems
}