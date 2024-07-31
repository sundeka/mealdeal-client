export type LoginProps = {
  username: string
  password: string
}

/**
 * Represents a single food received from the database table 'foods'
 */
export type Food = {
  id: number
  food_id: string
  name: string
  calories: number
  carbs: number
  protein: number
}

/**
 * 
 */
export type NutritionFact = {
  calories: number
  fat: number
  fat_saturated: number
  carbs: number
  carbs_sugar: number
  fibers: number
  protein: number
  salt: number
}

/**
 * Represents a single meal as received from the database table 'meals'
 */
export type Meal = {
  description: string | null
  meal_id: string
  name: string
  type: number
}


/**
 * Represents a single entry in the 'Current meal' table
 */
export type MealItem = {
  foodId: string
  name: string
  amount: number
}

/**
 * Meal types as received from the database
 */
export type MealType = {
  id: number
  name: string
}

/**
 * Represents the metadata of a new meal that is being added to the database
 */
export type MealMetadata = {
  mealId: string,
  name: string,
  description: string | null,
  type: number
  events: MealItem[]
}

/**
 * 
 */
export type UpdateMealPayload = {
  id: string,
  mealItems: MealItem[]
}