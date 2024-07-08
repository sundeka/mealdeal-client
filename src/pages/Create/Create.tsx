import '../../assets/styles/create.css'
import { useEffect, useState } from 'react'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import { Food } from '../../schema'
import CurrentMeal from './CurrentMeal'
import Metadata from './Metadata'
import MealContent from './MealContent'

const Create = () => {
  const [currentMeal, setCurrentMeal] = useState<Food[]>([])
  //const [currentMeal, setCurrentMeal] = useState<Map<string, Food>>();

  useEffect(() => {
    console.log("updating meal contents...")
  }, [currentMeal])


  return (
    <>
      <Header />
      <div className='create-root'>
        <div id='lane' className='create-root__new'>
          <Insert currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>
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