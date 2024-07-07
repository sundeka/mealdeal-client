import '../../assets/styles/create.css'
import { useEffect, useState } from 'react'
import Header from "../../components/Header/Header"
import Insert from './Insert'
import { Food } from '../../schema'
import CurrentMeal from './CurrentMeal'

const Create = () => {
  const [currentMeal, setCurrentMeal] = useState<Food[]>([])
  //const [currentMeal, setCurrentMeal] = useState<Map<string, Food>>();

  useEffect(() => {
    console.log("updating meal contents...")
  }, [currentMeal])
  
  return (
    <>
      <Header />
      <div className="createRoot">
        <div className="insert-root">
          <Insert currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>
          <CurrentMeal currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>
        </div>
        <div className="createMetadata">
          <p>metadata</p>
        </div>
        <div className="createContent">
          <p>content</p>
        </div>
      </div>
    </>
  )
}

export default Create