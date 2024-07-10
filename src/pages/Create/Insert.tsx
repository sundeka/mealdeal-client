import { useState } from 'react';
import { Food } from '../../schema';

interface InsertProps {
  currentMeal: Map<string, Food>
  addFood: any
}

const Insert = (props: InsertProps) => {
  const [id, setId] = useState<string>("")
  const [food, setFood] = useState<string>("")
  const [grams, setGrams] = useState<number>(0)
  
  const addIsDisabled = () => {
    return  !id || !food || grams === 0
  }

  const onClickAdd = () => {
    if (food) {
      props.addFood(id, food, grams)
    }
  }

  const onChangeFood = (event: any) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedFood = selectedOption.value;
    const selectedId = selectedOption.getAttribute('data-id')
    setFood(selectedFood)
    setId(selectedId)
  }
  
  const onChangeGrams = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(Number(event.target.value))
  }

  return (
    <>
      <div className='new__add-food-label-row'>
        <label id='food-name'>Food name</label>
        <label id='food-amount'>Amount (grams)</label>
      </div>
      <div className='new__add-food'>
        <select onChange={onChangeFood} id='food-name'>
          <option value="">Select a food</option>
          <option 
            data-id="59effe0f-865b-4718-b373-c6b697d3a9cd"
            value="Jauheliha"
          >
            Jauheliha
          </option>
          <option 
            data-id="d72e9f29-b64d-4be5-9712-688d599d731d"
            value="Riisi (Täysjyvä)"
          >
            Riisi (Täysjyvä)
          </option>
        </select>
        <input onChange={onChangeGrams} id='food-amount' type='number'></input>
        <button 
          className='add-food__button' 
          onClick={onClickAdd}
          disabled={addIsDisabled()}
        >
          Add
        </button>
      </div>
    </>
  )
}

export default Insert