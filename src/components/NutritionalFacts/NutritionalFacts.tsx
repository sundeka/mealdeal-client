import { NutritionFact } from "../../schema"

interface NutritionalFactsProps {
  nutrition: NutritionFact
}

const NutritionalFacts = (props: NutritionalFactsProps) => {
  return (
    <div className='table-wrapper__table'>
      <div className='table__header' id='row'>
        <span className='table__cell--a'></span>
        <span className='table__cell--b'>Amount</span>
        <span className='table__cell--c'>%DV</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Calories</span>
        <span className='table__cell--b'>{props.nutrition.calories} kcal</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Fat</span>
        <span className='table__cell--b'>{props.nutrition.fat} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a' id='sub-row'>Saturated fat</span>
        <span className='table__cell--b'>{props.nutrition.fat_saturated} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Carbohydrates</span>
        <span className='table__cell--b'>{props.nutrition.carbs} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a' id='sub-row'>Carbohydrates, of which sugar</span>
        <span className='table__cell--b'>{props.nutrition.carbs_sugar} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Fibers</span>
        <span className='table__cell--b'>{props.nutrition.fibers} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Protein</span>
        <span className='table__cell--b'>{props.nutrition.protein} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
      <div id='row'>
        <span className='table__cell--a'>Salt</span>
        <span className='table__cell--b'>{props.nutrition.salt} g</span>
        <span className='table__cell--c'>0 %</span>
      </div>
    </div>
  )
}

export default NutritionalFacts