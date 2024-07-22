import { MoonLoader } from "react-spinners";
import { Meal, MealType } from "../../schema"
import { getTypeNameForMealId } from "../../utils/getTypeNameForMealId";

interface BrowserInfoPanelProps {
  meal: Meal | null
  types: MealType[]
  setCurrentSelection: React.Dispatch<React.SetStateAction<Meal | null>>
}

const BrowserInfoPanel = (props: BrowserInfoPanelProps) => {
  if (!props.meal) {
    return (
      <div id='container-right--disabled' />
    )
  }
  const isLoading = true
  const isError = false
  const mealTypeName = getTypeNameForMealId(props.meal.type, props.types)
  
  const loadingScreen = () => {
    return (
      <div id='loading'>
        <MoonLoader />
        <span>Loading...</span>
      </div>
    )
  }
  
  return (
    <div id='container-right--active'>
      <div className='container-right__header'>
        <div id='summary'>
          <h2>{mealTypeName?.toUpperCase()} - {props.meal.name}</h2>
          <span id='description'>{props.meal.description ? props.meal.description : "No description."}</span>
        </div>
        <div id='actions'>
          <button id='close-button' onClick={() => props.setCurrentSelection(null)}>CLOSE</button>
        </div>
      </div>
      <div className='container-right__content'>
        {isLoading ? loadingScreen() : <p>done</p>}
      </div>
      <div className='container-right__actions'>
        <button disabled={isError || isLoading} id='delete' />
        <button disabled={isError || isLoading} id='save'>Save changes</button>
      </div>
    </div>
  )
}

export default BrowserInfoPanel