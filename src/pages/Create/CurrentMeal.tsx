import MealTable from '../../components/MealTable/MealTable'
import { MealItem } from '../../schema'

interface CurrentMealProps {
  currentMeal: Map<string, MealItem>
  setCurrentMeal: React.Dispatch<React.SetStateAction<Map<string, MealItem>>>
  deleteFood: (id: string) => void
}

const CurrentMeal = (props: CurrentMealProps) => {
  
  const onReset = () => {
    props.setCurrentMeal(new Map<string, MealItem>())
  }

  return (
    <div className='new__current-meal-container'>
      <div className='current-meal-container__header'>
        <h2>Current meal</h2>
        <button 
          className='header__reset-button' 
          disabled={props.currentMeal.size < 1}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      <div className='current-meal-container__table'>
        <MealTable currentMeal={props.currentMeal} deleteFood={props.deleteFood}/>
      </div>
    </div>
  )
}

export default CurrentMeal