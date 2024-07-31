import { useEffect, useState } from 'react'
import { MealItem, NutritionFact } from '../../schema'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import CurrentMeal from './CurrentMeal'
import Metadata from './Metadata'
import { getFoods, postCreateMeal } from './../../api/endpoints'
import { useMutation, useQuery } from "react-query";
import { calculateNutrition } from '../../utils/calculateNutrition'
import { MoonLoader } from 'react-spinners'
import NutritionalFacts from '../../components/NutritionalFacts/NutritionalFacts'
import { Navigate } from 'react-router-dom'

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
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealItem>>(new Map<string, MealItem>());
  const [currentNutrition, setCurrentNutrition] = useState<NutritionFact>(nutritionInit);
  const { data: foods, isError: foodsIsError, isLoading: foodsIsLoading } = useQuery("getFoods", getFoods, { refetchOnWindowFocus: false });
  const createMealEndpoint = useMutation(
    { 
      mutationFn: postCreateMeal 
    }
  )
  
  useEffect(() => {
    if (foods) {
      setCurrentNutrition(calculateNutrition(foods, currentMeal))
    }
    if (currentMeal.size == 0) {
      setCurrentNutrition(nutritionInit)
    }
  }, [currentMeal])
  
  const addFood = (foodId: string, name: string, amount: number) => {
    const payload: MealItem = { foodId, name, amount };
    if (currentMeal.has(foodId)) {
      alert('Adding the same food more than once is not allowed!')
    } else {
      setCurrentMeal((prevMeal: Map<string, MealItem>) => {
        const newMeal = new Map(prevMeal);
        newMeal.set(foodId, payload);
        return newMeal;
      });
    }
  }

  const deleteFood = (id: string) => {
    setCurrentMeal((prevMeal: Map<string, MealItem>) => {
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
              <MoonLoader />
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
          <h1 id='lane-title'>Nutritional facts</h1>
          <div className='meal-content__table-wrapper'>
            <span className='table-wrapper__disclaimer'>
              The following values are an approximation of the meal's entire dietary content.
            </span>
            <NutritionalFacts nutrition={currentNutrition} />
          </div>
        </div>
        <div id='lane' className='create-root__metadata'>
          <Metadata currentMeal={currentMeal} mutation={createMealEndpoint} />
        </div>
      </div>
      
    </>
  )
}

export default Create