import { useEffect, useState } from "react"
import { Meal, MealType } from "../../schema"
import { initBrowserButtonStates } from "../../utils/initBrowserButtonStates"

interface BrowserProps {
  meals: Map<MealType, Meal[]>
  selectedRow: Meal | null
  setSelectedRow: React.Dispatch<React.SetStateAction<Meal | null>>
}

const Browser = (props: BrowserProps) => {
  //const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [buttonStates, setButtonStates] = useState<Map<string, boolean>>(initBrowserButtonStates(props.meals.keys()))
  
  const onClickRow = (meal: Meal) => {
    if (meal.meal_id == props.selectedRow?.meal_id) {
      props.setSelectedRow(null)
    } else {
      props.setSelectedRow(meal)
    }
  }
  
  const onExpand = (name: string) => {
    const newStates = new Map(buttonStates)
    newStates.set(name, !buttonStates.get(name))
    setButtonStates(newStates)
  }

  const isExpanded = (name: string) => {
    if (buttonStates.has(name)) {
      return buttonStates.get(name)
    }
    return false
  }

  return (
    <div className='browser-content__browser-frame'>
      {
        Array.from(props.meals.entries()).map(([mealType, meal]) => (
          <div className='browser-frame__item_wrapper'>
            <div className='item_wrapper__title'>
              <h2 id='text'>{mealType.name} ({meal.length})</h2>
              <div id='expand' onClick={() => onExpand(mealType.name)}> 
                <span id='expand-icon'>{isExpanded(mealType.name) ? "-" : "+"}</span>
              </div>
            </div>
            <div 
              id={`${isExpanded(mealType.name) ? 'wrapper-expand' : 'wrapper-collapse'}`}
            >
              {
                meal.map((meal) => (
                  <div 
                    className={`${props.selectedRow?.meal_id == meal.meal_id ? 'item_wrapper__row--selected' : 'item_wrapper__row'}`} 
                    id={meal.meal_id} 
                    onClick={() => onClickRow(meal)}
                  >
                    <span id='text' key={meal.meal_id}>{meal.name}</span>
                  </div>     
                ))
              }
            </div>
            <div id='end-padding'/>
          </div>
        ))
      }
    </div>
  )
}

export default Browser