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
 * Represents a single entry in the 'Current meal' table
 */
export type MealPiece = {
  food_id: string
  name: string
  amount: number
}

/**
 * 
 */
export type Meal = {

}