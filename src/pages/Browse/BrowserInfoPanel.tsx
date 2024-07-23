import { MoonLoader } from "react-spinners";
import { Meal, MealItem, MealType } from "../../schema"
import { getTypeNameForMealId } from "../../utils/getTypeNameForMealId";
import { useQuery } from "react-query";
import { getMealContents } from "../../api/endpoints";
import { useEffect, useState } from "react";
import MealTable from "../../components/MealTable/MealTable";

interface BrowserInfoPanelProps {
  meal: Meal | null
  types: MealType[]
  setCurrentSelection: React.Dispatch<React.SetStateAction<Meal | null>>
}

const BrowserInfoPanel = (props: BrowserInfoPanelProps) => {
  const { 
    data: mealContents, 
    isLoading: mealContentsIsLoading,
    isError: mealContentsIsError
  } = useQuery(
    ["getMealContents", props.meal?.meal_id],  
    () => getMealContents(props.meal?.meal_id), 
    { refetchOnWindowFocus: false }
  );
  const initialMeal = mealContents
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealItem> | undefined>(initialMeal)
  
  useEffect(() => {
    setCurrentMeal(mealContents)
  }, [mealContents])
  
  if (!props.meal) {
    return (
      <div id='container-right--disabled' />
    )
  }

  const mealTypeName = getTypeNameForMealId(props.meal.type, props.types)

  const loadingScreen = () => {
    return (
      <div id='loading'>
        <MoonLoader />
        <span>Loading...</span>
      </div>
    )
  }

  const renderContent = () => {
    if (mealContentsIsError) {
      return (
        <span>Error!</span>
      )
    } else if (currentMeal) {
      return (
        <MealTable currentMeal={currentMeal} deleteFood={() => {}}/>
      )
    }
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
        {mealContentsIsLoading ? loadingScreen() : renderContent()}
      </div>
      <div className='container-right__actions'>
        <button disabled={mealContentsIsLoading || mealContentsIsError} id='delete' />
        <button disabled={mealContentsIsLoading || mealContentsIsError} id='save'>Save changes</button>
      </div>
    </div>
  )
}

export default BrowserInfoPanel