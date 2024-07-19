import axios from "axios";
import { MealMetadata } from "../schema";

const DEV_BACKEND = "http://127.0.0.1:5000"

export const getFoods = async () => {
  const response = await axios.get(
    DEV_BACKEND + "/foods"
  );
  return response.data;
};

export const getFoodTypes = async () => {
  const response = await axios.get(
    DEV_BACKEND + "/types"
  );
  return response.data;
}

export const getMeals = async () => {
  const response = await axios.get(
    DEV_BACKEND + "/meals"
  );
  return response.data;
}

export const postCreateMeal = async (mealData: MealMetadata) => {
  return await axios.post(
    DEV_BACKEND + "/create",
    mealData
  )
}