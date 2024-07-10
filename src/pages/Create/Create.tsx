import { useState } from 'react'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import { Food } from '../../schema'
import CurrentMeal from './CurrentMeal'
import Metadata from './Metadata'
import MealContent from './MealContent'

const Create = () => {
  const [currentMeal, setCurrentMeal] = useState<Map<string, Food>>(new Map<string, Food>());

  const addFood = (id: string, name: string, amount: number) => {
    const payload: Food = { id, name, amount };
    setCurrentMeal((prevMeal: Map<string, Food>) => {
        const newMeal = new Map(prevMeal);
        newMeal.set(id, payload);
        return newMeal;
    });
  }

  return (
    <>
      <Header />
      <div className='create-root'>
        <div id='lane' className='create-root__new'>
          <Insert currentMeal={currentMeal} addFood={addFood}/>
          <CurrentMeal currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>
        </div>
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