/**
 * Converts the Map<string, Meal> structure into
 * a form that can be transferred via HTTP
 */

import { MealItem } from "../schema";

export function serializeCurrentMeal(currentMeal: Map<string, MealItem>) {
  var meals: MealItem[] = []
  for (const meal of currentMeal.values()) {
    meals.push(meal)
  }
  return meals
}