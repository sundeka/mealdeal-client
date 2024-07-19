import { Meal, MealType } from "../../schema"

interface BrowserProps {
  meals: Map<MealType, Meal[]>
  selectedRow: string | null
  setSelectedRow: React.Dispatch<React.SetStateAction<string | null>>
}

const Browser = (props: BrowserProps) => {
  
  const onClickRow = (id: string) => {
    if (id == props.selectedRow) {
      props.setSelectedRow(null)
    } else {
      props.setSelectedRow(id)
    }
  }
  
  return (
    <div className='browser-content__browser-frame'>
      {
        Array.from(props.meals.entries()).map(([mealType, meal]) => (
          <div className='browser-frame__item_wrapper'>
            <div className='item_wrapper__title'>
              <h2 id='text'>{mealType.name} ({meal.length})</h2>
              <div id='expand' />
            </div>
            {
              meal.map((meal) => (
                <div 
                  className={`${props.selectedRow == meal.meal_id ? 'item_wrapper__row--selected' : 'item_wrapper__row'}`} 
                  id={meal.meal_id} 
                  onClick={() => onClickRow(meal.meal_id)}
                >
                  <span id='text' key={meal.meal_id}>{meal.name}</span>
                </div>     
              ))
            }
            <div id='end-padding'/>
          </div>
        ))
      }
    </div>
  )
}

export default Browser