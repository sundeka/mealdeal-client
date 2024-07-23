import { MoonLoader } from "react-spinners";
import { Food, Meal, MealItem, MealType, NutritionFact } from "../../schema"
import { getTypeNameForMealId } from "../../utils/getTypeNameForMealId";
import { useQuery } from "react-query";
import { getMealContents } from "../../api/endpoints";
import { useEffect, useState } from "react";
import MealTable from "../../components/MealTable/MealTable";
import NutritionalFacts from "../../components/NutritionalFacts/NutritionalFacts";
import { calculateNutrition } from "../../utils/calculateNutrition";

interface BrowserInfoPanelProps {
  meal: Meal | null
  types: MealType[]
  foods: Food[]
  setCurrentSelection: React.Dispatch<React.SetStateAction<Meal | null>>
}

const BrowserInfoPanel = (props: BrowserInfoPanelProps) => {
  const { data: mealContents, isLoading: mealContentsIsLoading, isError: mealContentsIsError
  } = useQuery(
    ["getMealContents", props.meal?.meal_id],  
    () => getMealContents(props.meal?.meal_id), 
    { refetchOnWindowFocus: false }
  );

  // 'initialMeal' is meant to be an immutable object used for comparing the initial settings with possible changes to the meal
  const initialMeal = mealContents

  // 'currentMeal' contains the current contents of the meal, which may have more or less foods in them
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealItem> | undefined>(initialMeal)
  const [nutritionalFacts, setNutritionalFacts] = useState<NutritionFact>(calculateNutrition(props.foods, currentMeal))

  // Refresh 'currentMeal' whenever a new meal is clicked in the browser
  useEffect(() => {
    setCurrentMeal(mealContents)
  }, [mealContents])

  // Update nutritional content whenever a) new foods are added/removed or b) whenever a new meal is selected in the browser
  useEffect(() => {
    setNutritionalFacts(calculateNutrition(props.foods, currentMeal))
  }, [currentMeal, mealContents])
  
  // Hide the info panel if no meal is selected
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
        <>
          <div className='content__table-wrapper'>
            <div id='header'>
              <h2>Meal contents</h2>
              <button>Add food</button>
            </div>
            <MealTable currentMeal={currentMeal} deleteFood={() => {}}/>
          </div>
          <div className='content__nutrition-wrapper'>
            <h2>Nutritional facts</h2>
            <NutritionalFacts nutrition={nutritionalFacts}/>
          </div>
        </>
        
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
        <button disabled={(initialMeal == currentMeal) || mealContentsIsLoading || mealContentsIsError} id='save'>Save changes</button>
      </div>
    </div>
  )
}

export default BrowserInfoPanel