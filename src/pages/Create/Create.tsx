import { useState } from 'react'
import { MealPiece } from '../../schema'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import CurrentMeal from './CurrentMeal'
import Metadata from './Metadata'
import MealContent from './MealContent'
import { getFoods } from './../../api/endpoints'
import { useQuery } from "react-query";

const Create = () => {
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealPiece>>(new Map<string, MealPiece>());

  const {
    data: foods,
    isError: foodsIsError,
    isLoading: foodsIsLoading,
  } = useQuery("getFoods", getFoods);

  const addFood = (food_id: string, name: string, amount: number) => {
    const payload: MealPiece = { food_id, name, amount };
    if (currentMeal.has(food_id)) {
      alert('Adding the same food more than once is not allowed!')
    } else {
      setCurrentMeal((prevMeal: Map<string, MealPiece>) => {
        const newMeal = new Map(prevMeal);
        newMeal.set(food_id, payload);
        return newMeal;
      });
    }
  }

  const deleteFood = (id: string) => {
    setCurrentMeal((prevMeal: Map<string, MealPiece>) => {
      const newMeal = new Map(prevMeal);
      newMeal.delete(id)
      return newMeal;
    });
  }

  const renderMealFrame = () => {
    if (foodsIsLoading) {
      return (
        <div id='lane' className='create-root__new'>
          <div className='new__api-wrapper'>
            <div className='api-wrapper__loading-icon'>
              {/** TODO: Loading icon */}
            </div>
            <span>Loading...</span>
          </div>
        </div>
      )
    } else if (foodsIsError) {
      return (
        <div id='lane' className='create-root__new'>
          <div className='new__api-wrapper'>
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
          <MealContent />
        </div>
        <div id='lane' className='create-root__metadata'>
          <Metadata currentMeal={currentMeal}/>
        </div>
      </div>
      
    </>
  )
}

export default Create