import { MoonLoader } from "react-spinners"
import { MealItem, NutritionFact } from "../../schema"
import MealTable from "../../components/MealTable/MealTable"
import NutritionalFacts from "../../components/NutritionalFacts/NutritionalFacts"

interface InfoPanelContentProps {
  isLoading: boolean
  currentMeal: Map<string, MealItem> | undefined
  nutritionalFacts: NutritionFact
  onDelete: (id: string) => void
  onClickAddFood: () => void
}

const InfoPanelContent = (props: InfoPanelContentProps) => {
  if (props.isLoading) {
    return (
      <div id='loading'>
        <MoonLoader />
        <span>Loading...</span>
      </div>
    )
  }
  if (props.currentMeal) {
    return (
      <>
        <div className='content__table-wrapper'>
          <div id='header'>
            <h2>Meal contents</h2>
            <button onClick={props.onClickAddFood}>Add food</button>
          </div>
          <MealTable currentMeal={props.currentMeal} deleteFood={props.onDelete}/>
        </div>
        <div className='content__nutrition-wrapper'>
          <h2>Nutritional facts</h2>
          <NutritionalFacts nutrition={props.nutritionalFacts}/>
        </div>
      </>
    )
  }
  return <span>Error!</span>
}

export default InfoPanelContent