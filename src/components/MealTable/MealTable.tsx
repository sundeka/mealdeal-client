import { MealItem } from "../../schema"

interface MealTableProps {
  currentMeal: Map<string, MealItem>
  deleteFood: (id: string) => void
}

const MealTable = (props: MealTableProps) => {
  if (props.currentMeal.size < 1) {
    return (
      <div className='table__empty-table'>
        <h3>It's empty in here...</h3>
        <p>Start above by adding a new food to your meal.</p>
      </div>
    )
  }
  return (
    <div className='table__table-frame'>
      <div className='table__header' id='row'>
        <span className='table__cell--a'>Food name</span>
        <span className='table__cell--b'>Amount</span>
        <span className='table__cell--c'></span>
      </div>
        {Array.from(props.currentMeal.entries()).map(([id, food]) => (
          <div id='row' key={id}>
            <span className='table__cell--a'>{food.name}</span>
            <span className='table__cell--b'>{food.amount} g</span>
            <button className='row__delete-button' onClick={() => props.deleteFood(id)}>
              {/*img*/}
            </button>
          </div>
        ))}
    </div>
  )
}

export default MealTable