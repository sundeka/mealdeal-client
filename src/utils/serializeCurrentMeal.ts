/**
 * Converts the Map<string, Meal> structure into
 * a form that can be transferred via HTTP
 */

import { Meal } from "../schema";

export function serializeCurrentMeal(currentMeal: Map<string, Meal>) {
  var meals: Meal[] = []
  for (const meal of currentMeal.values()) {
    meals.push(meal)
  }
  return meals
}