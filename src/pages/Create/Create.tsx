import { useEffect, useState } from 'react'
import { Meal, NutritionFact } from '../../schema'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import CurrentMeal from './CurrentMeal'
import Metadata from './Metadata'
import MealContent from './MealContent'
import { getFoods } from './../../api/endpoints'
import { useQuery } from "react-query";
import { calculateNutrition } from '../../utils/calculateNutrition'

const nutritionInit: NutritionFact = {
  calories: 0,
  fat: 0,
  fat_saturated: 0,
  carbs: 0,
  carbs_sugar: 0,
  fibers: 0,
  protein: 0,
  salt: 0
}

const Create = () => {
  const [currentMeal, setCurrentMeal] = useState<Map<string, Meal>>(new Map<string, Meal>());
  const [currentNutrition, setCurrentNutrition] = useState<NutritionFact>(nutritionInit);
  const { data: foods, isError: foodsIsError, isLoading: foodsIsLoading } = useQuery("getFoods", getFoods);

  useEffect(() => {
    if (foods) {
      setCurrentNutrition(calculateNutrition(foods, currentMeal))
    }
    if (currentMeal.size == 0) {
      setCurrentNutrition(nutritionInit)
    }
  }, [currentMeal])
  
  const addFood = (food_id: string, name: string, amount: number) => {
    const payload: Meal = { food_id, name, amount };
    if (currentMeal.has(food_id)) {
      alert('Adding the same food more than once is not allowed!')
    } else {
      setCurrentMeal((prevMeal: Map<string, Meal>) => {
        const newMeal = new Map(prevMeal);
        newMeal.set(food_id, payload);
        return newMeal;
      });
    }
  }

  const deleteFood = (id: string) => {
    setCurrentMeal((prevMeal: Map<string, Meal>) => {
      const newMeal = new Map(prevMeal);
      newMeal.delete(id)
      return newMeal;
    });
  }

  const renderMealFrame = () => {
    if (foodsIsLoading) {
      return (
        <div id='lane' className='create-root__new'>
          <div className='lane-loading-container'>
            <div className='lane-loading-container__loading-icon'>
              {/** TODO: Loading icon */}
            </div>
            <span>Loading...</span>
          </div>
        </div>
      )
    } else if (foodsIsError) {
      return (
        <div id='lane' className='create-root__new'>
          <div className='lane-loading-container'>
            <span>Oh no! Something went wrong...</span>
          </div>
        </div>
      )
    } else {
      return (
        <div id='lane' className='create-root__new'>
          <Insert foods={foods} currentMeal={currentMeal} addFood={addFood}/>
          <CurrentMeal currentMeal={currentMeal} setCurrentMeal={setCurrentMeal} deleteFood={deleteFood}/>
        </div>      
      )
    }
  }

  return (
    <>
      <Header />
      <div className='create-root'>
        {renderMealFrame()}
        <div id='lane' className='create-root__meal-content'>
          <MealContent nutrition={currentNutrition} />
        </div>
        <div id='lane' className='create-root__metadata'>
          <Metadata currentMeal={currentMeal} />
        </div>
      </div>
      
    </>
  )
}

export default Create