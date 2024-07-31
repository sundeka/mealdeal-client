import axios from "axios";
import { LoginProps, MealItem, MealMetadata, UpdateMealPayload } from "../schema";
import { Base64 } from 'base64-string';

const DEV_BACKEND = "http://127.0.0.1:5000"

export const login = async (credentials: LoginProps) => {
  const enc = new Base64();
  const credsBase64 = enc.encode(`${credentials.username}:${credentials.password}`)
  return await axios.post(
    DEV_BACKEND + "/login", {
      headers: {
        'Authorization': `Basic ${credsBase64}`
      }
    }
  )
}

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

export const getMealContents = async (mealId: string | undefined) => {
  if (mealId) {
    const response = await axios.get(
      DEV_BACKEND + "/events/meals/" + mealId
    )
    if (response.data) {
      const contents = new Map<string, MealItem>()
      for (const food in response.data) {
        const mealItem: MealItem = response.data[food]
        contents.set(mealItem.foodId, mealItem)
      }
      return contents
    }
  }
}

export const deleteMeal = async (mealId: string) => {
  return await axios.delete(
    DEV_BACKEND + "/meals/" + mealId
  )
}

export const putMeal = async (payload: UpdateMealPayload) => {
  return await axios.put(
    DEV_BACKEND + "/meals/" + payload.id,
    payload.mealItems
  )
}