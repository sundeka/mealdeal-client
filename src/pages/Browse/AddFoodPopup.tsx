import { useEffect, useState } from "react"
import { Food, MealItem } from "../../schema"

interface AddFoodPopupProps {
  foods: Food[]
  close: () => void
  currentMeal: Map<string, MealItem> | undefined
  setCurrentMeal: React.Dispatch<React.SetStateAction<Map<string, MealItem> | undefined>>
}

const AddFoodPopup = (props: AddFoodPopupProps) => {
  const [id, setId] = useState<string>("")
  const [food, setFood] = useState<string>("")
  const [grams, setGrams] = useState<number>(0)
  
  const onChangeFood = (event: any) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedFood = selectedOption.value;
    const selectedId = selectedOption.getAttribute('data-id')
    setFood(selectedFood)
    setId(selectedId)
  }

  const onChangeGrams = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(Number(event.target.value))
  }
  
  const updateCurrentMeal = () => {
    const mealItem: MealItem = {foodId: id, name: food, amount: grams}
    const newCurrentMeal = new Map(props.currentMeal)
    newCurrentMeal.set(id, mealItem)
    props.setCurrentMeal(newCurrentMeal)
    props.close()
  }

  return (
    <div className='info-panel-popup'>
      <div id='root'>
        <div id='add-food-content'>
          <select onChange={onChangeFood} id='food-name'>
            <option value="">Select a food</option>
            {
              props.foods.map((food: Food) => {
                return (
                  <option
                    key={food.id}
                    data-id={food.food_id}
                    value={food.name}
                  >
                    {food.name}
                  </option>
                )
              })
            }
          </select>
          <span>Amount (g)</span>
          <input onChange={onChangeGrams} id='food-amount' type='number'></input>
        </div>
        <div id='actions'>
          <button onClick={updateCurrentMeal} disabled={grams < 1 || !food}>Add</button>
          <button onClick={props.close}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddFoodPopup