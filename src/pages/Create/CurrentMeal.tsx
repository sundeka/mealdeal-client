import { Food } from '../../schema'

interface CurrentMealProps {
  currentMeal: Map<string, Food>
  setCurrentMeal: React.Dispatch<React.SetStateAction<Map<string, Food>>>
  deleteFood: (id: string) => void
}

const CurrentMeal = (props: CurrentMealProps) => {
  
  const onReset = () => {
    props.setCurrentMeal(new Map<string, Food>())
  }

  const renderTable = () => {
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

  return (
    <div className='new__current-meal-container'>
      <div className='current-meal-container__header'>
        <h2>Current meal</h2>
        <button 
          className='header__reset-button' 
          disabled={props.currentMeal.size < 1}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      <div className='current-meal-container__table'>
        {renderTable()}
      </div>
    </div>
  )
}

export default CurrentMeal