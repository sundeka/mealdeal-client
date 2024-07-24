import { Food, Meal, MealItem, MealType, NutritionFact } from "../../schema"
import { getTypeNameForMealId } from "../../utils/getTypeNameForMealId";
import { useMutation, useQuery } from "react-query";
import { deleteMeal, getMealContents } from "../../api/endpoints";
import { useEffect, useState } from "react";
import { calculateNutrition } from "../../utils/calculateNutrition";
import InfoPanelContent from "./InfoPanelContent";
import Modal from "../../components/Modal/Modal";
import DeleteMealDisclaimer from "./DeleteMealDisclaimer";

interface BrowserInfoPanelProps {
  meal: Meal | null
  types: MealType[]
  foods: Food[]
  setCurrentSelection: React.Dispatch<React.SetStateAction<Meal | null>>
  refreshMealList: () => void
}

const BrowserInfoPanel = (props: BrowserInfoPanelProps) => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false)
  const { data: mealContents, isLoading: mealContentsIsLoading, isError: mealContentsIsError
  } = useQuery(
    ["getMealContents", props.meal?.meal_id],  
    () => getMealContents(props.meal?.meal_id), 
    { refetchOnWindowFocus: false }
  );
  const deleteMealEndpoint = useMutation({ 
    mutationFn: deleteMeal,
    onSuccess: () => {
      setModalIsActive(false)
      props.refreshMealList()
    }
  })

  // 'initialMeal' is meant to be an immutable object used for comparing the initial settings with possible changes to the meal
  const initialMeal = mealContents

  // 'currentMeal' contains the current contents of the meal, which may have more or less foods in them
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealItem> | undefined>(initialMeal)
  const [nutritionalFacts, setNutritionalFacts] = useState<NutritionFact>(calculateNutrition(props.foods, currentMeal))

  // Refresh 'currentMeal' whenever a new meal is clicked in the browser
  useEffect(() => {
    setModalIsActive(false)
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
  
  const onDelete = () => {
    if (props.meal) {
      deleteMealEndpoint.mutate(props.meal.meal_id)
    }
  }

  const onCancel = () => {
    setModalIsActive(false)
  }

  return (
    <div id='container-right--active'>
      <Modal 
        active={modalIsActive} 
        element={
          <DeleteMealDisclaimer 
            onCancel={onCancel}
            onDelete={onDelete}
            meal={props.meal}
            mutation={deleteMealEndpoint}
          />
        } 
      />
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
        <InfoPanelContent 
          isLoading={mealContentsIsLoading} 
          currentMeal={currentMeal}
          nutritionalFacts={nutritionalFacts}
        />
      </div>
      <div className='container-right__actions'>
        <button 
          disabled={mealContentsIsLoading || mealContentsIsError} 
          id='delete' 
          onClick={() => setModalIsActive(true)}
        />
        <button 
          disabled={
              (initialMeal == currentMeal) ||
              mealContentsIsLoading || 
              mealContentsIsError ||
              currentMeal?.size == 0
            }
          id='save'>
            Save changes
        </button>
      </div>
    </div>
  )
}

export default BrowserInfoPanel