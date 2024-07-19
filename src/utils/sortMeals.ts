import { Meal, MealType } from "../schema";

/**
 * Uses meal type as a key, under which each meal that is of such type is inserted
 * 
 * e.g.
 * 
 * Breakfast
 * ---My bulk breakfast
 * ---Test 123
 * Lunch
 * ---super bulk lunch 123
 * ---spaghetti and meatballs
 * Dinner
 * <null>
 * Snack
 * ---evening snack 666
 */

export function sortMeals(types: MealType[], meals: Meal[]) {
  const sortedMeals: Map<MealType, Meal[]> = new Map();
  for (const type of types) {
    var mealsForType = getMealsForType(type, meals)
    sortedMeals.set(type, mealsForType)
  }
  return sortedMeals
}

function getMealsForType(type: MealType, meals: Meal[]) {
  var mealsForType: Meal[] = []
  for (const meal of meals) {
    if (meal.type == type.id) {
      mealsForType.push(meal)
    }
  }
  return mealsForType
}