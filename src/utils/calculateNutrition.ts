import { Food, MealItem, NutritionFact } from "../schema";

export function calculateNutrition(foods: Food[], meal: Map<string, MealItem>): NutritionFact {
  var fact: NutritionFact = {
    calories: 0,
    fat: 0,
    fat_saturated: 0,
    carbs: 0,
    carbs_sugar: 0,
    fibers: 0,
    protein: 0,
    salt: 0
  }

  for (const mealItem of meal.values()) {
    const foodProperties = foods.find(item => mealItem.foodId === item.food_id)
    if (foodProperties) {
      fact.calories += foodProperties.calories * (mealItem.amount/100);
      ////fact.fat += mealItem.fat;
      ////fact.fat_saturated += mealItem.fat_saturated;
      fact.carbs += foodProperties.carbs * (mealItem.amount/100);
      ////fact.carbs_sugar += mealItem.carbs_sugar;
      ////fact.fibers += mealItem.fibers;
      fact.protein += foodProperties.protein * (mealItem.amount/100);
      ////fact.salt += mealItem.salt;
    }
  }

  return fact
}