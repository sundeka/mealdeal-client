import { Food, Meal, MealItem, MealType, NutritionFact, UpdateMealPayload } from "../../schema"
import { getTypeNameForMealId } from "../../utils/getTypeNameForMealId";
import { useMutation, useQuery } from "react-query";
import { deleteMeal, getMealContents, getMetadata, putMeal } from "../../api/endpoints";
import { useEffect, useState } from "react";
import { calculateNutrition } from "../../utils/calculateNutrition";
import InfoPanelContent from "./InfoPanelContent";
import Modal from "../../components/Modal/Modal";
import DeleteMealDisclaimer from "./DeleteMealDisclaimer";
import toast from 'react-hot-toast'
import { parseMealItemsFromCurrentMeal } from "../../utils/parseMealItemsFromCurrentMeal";
import AddFoodPopup from "./AddFoodPopup";

interface BrowserInfoPanelProps {
  meal: Meal | null
  types: MealType[]
  foods: Food[]
  setCurrentSelection: React.Dispatch<React.SetStateAction<Meal | null>>
  refreshMealList: () => void
}

const BrowserInfoPanel = (props: BrowserInfoPanelProps) => {
  const [deletionModal, setDeletionModal] = useState<boolean>(false)
  const [additionModal, setAdditionModal] = useState<boolean>(false)
  const { data: mealContents, isLoading: mealContentsIsLoading, isError: mealContentsIsError
  } = useQuery(
    ["getMealContents", props.meal?.meal_id],  
    () => getMealContents(props.meal?.meal_id), 
    { refetchOnWindowFocus: false }
  );
  const { refetch: refetchMetadata } = useQuery("getMetadata", getMetadata, { refetchOnWindowFocus: false });
  const deleteMealEndpoint = useMutation({ 
    mutationFn: deleteMeal,
    onSuccess: () => {
      toast.success(`Meal "${props.meal?.name}" deleted successfully!`)
      setDeletionModal(false)
      props.setCurrentSelection(null)
      props.refreshMealList()
      refetchMetadata()
    }
  })
  const updateMealEndpoint = useMutation({
    mutationFn: putMeal,
    onSuccess: () => {
      toast.success(`Meal "${props.meal?.name}" updated successfully!`)
      props.refreshMealList()
    },
    onError: () => {
      toast.error(`Unknown error while updating meal "${props.meal?.name}"!`)
    }
  })

  // 'referenceMeal' is meant to be an immutable object used for comparing the initial settings with possible changes to the meal
  const referenceMeal = mealContents

  // 'currentMeal' contains the current contents of the meal, which may have more or less foods in them
  const [currentMeal, setCurrentMeal] = useState<Map<string, MealItem> | undefined>(referenceMeal)
  const [nutritionalFacts, setNutritionalFacts] = useState<NutritionFact>(calculateNutrition(props.foods, currentMeal))

  // Refresh 'currentMeal' whenever a new meal is clicked in the browser
  useEffect(() => {
    setDeletionModal(false)
    setAdditionModal(false)
    setCurrentMeal(mealContents)
    setNutritionalFacts(calculateNutrition(props.foods, currentMeal))
  }, [mealContents])

  // Update nutritional content whenever new foods are added/removed
  useEffect(() => {
    setNutritionalFacts(calculateNutrition(props.foods, currentMeal))
  }, [currentMeal])
  
  // Hide the info panel if no meal is selected
  if (!props.meal) {
    return (
      <div id='container-right--disabled' />
    )
  }

  const mealTypeName = getTypeNameForMealId(props.meal.type, props.types)
  
  const onDeleteMeal = () => {
    if (props.meal) {
      deleteMealEndpoint.mutate(props.meal.meal_id)
    }
  }

  const onDeleteFood = (id: string) => {
    const newCurrentMeal = new Map(currentMeal)
    newCurrentMeal.delete(id)
    setCurrentMeal(newCurrentMeal)
  }

  const onSaveChanges = () => {
    if (props.meal && currentMeal) {
      const payload = {id: props.meal.meal_id, mealItems: parseMealItemsFromCurrentMeal(currentMeal)}
      updateMealEndpoint.mutate(payload)
    }
  }

  return (
    <div id='container-right--active'>
      <Modal 
        active={deletionModal} 
        element={
          <DeleteMealDisclaimer 
            onCancel={() => setDeletionModal(false)}
            onDelete={onDeleteMeal}
            meal={props.meal}
            mutation={deleteMealEndpoint}
          />
        } 
      />
      <Modal 
        active={additionModal}
        element={
          <AddFoodPopup
            foods={props.foods}
            close={() => setAdditionModal(false)}
            currentMeal={currentMeal}
            setCurrentMeal={setCurrentMeal}
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
          isLoading={mealContentsIsLoading || updateMealEndpoint.isLoading} 
          currentMeal={currentMeal}
          nutritionalFacts={nutritionalFacts}
          onDelete={onDeleteFood}
          onClickAddFood={() => setAdditionModal(true)}
        />
      </div>
      <div className='container-right__actions'>
        <button 
          disabled={mealContentsIsLoading || updateMealEndpoint.isLoading || mealContentsIsError} 
          id='delete' 
          onClick={() => setDeletionModal(true)}
        />
        <button 
          disabled={
              (referenceMeal == currentMeal) ||
              mealContentsIsLoading ||
              updateMealEndpoint.isLoading || 
              mealContentsIsError ||
              currentMeal?.size == 0
            }
          onClick={onSaveChanges}
          id='save'>
            Save changes
        </button>
      </div>
    </div>
  )
}

export default BrowserInfoPanel