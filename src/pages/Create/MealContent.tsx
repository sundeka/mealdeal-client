const MealContent = () => {
  return (
    <>
      <h1 id='lane-title'>Nutrition facts</h1>
      <div className='meal-content__table-wrapper'>
        <span className='table-wrapper__disclaimer'>
          The following values are an approximation of the meal's entire dietary content.
        </span>
        <div className='table-wrapper__table'>
          <div className='table__header' id='row'>
            <span className='table__cell--a'></span>
            <span className='table__cell--b'>Amount</span>
            <span className='table__cell--c'>%DV</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Calories</span>
            <span className='table__cell--b'>0 kcal</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Fat</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a' id='sub-row'>Saturated fat</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Carbohydrates</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a' id='sub-row'>Carbohydrates, of which sugar</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Fibers</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Protein</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
          <div id='row'>
            <span className='table__cell--a'>Salt</span>
            <span className='table__cell--b'>0 g</span>
            <span className='table__cell--c'>0 %</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MealContent