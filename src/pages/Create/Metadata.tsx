import { useState } from 'react'
import { Food } from '../../schema'

interface MetadataProps {
  currentMeal: Food[]
}

const Metadata = (props: MetadataProps) => {
  const [name, setName] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value)
  }

  return (
    <>
      <div id='info'>
        <h1 id='lane-title'>Meal metadata</h1>
        <div className='metadata__input-area'>
          <div id='labels'>
            <label>Meal name</label>
            <label>Meal type</label>
            <label id='label--description'>Meal description</label>
            <span id='label--optional'>(Optional)</span>
          </div>
          <div id='inputs'>
            <input required onChange={onChangeName} id='name' />
            <select required onChange={onChangeType}id='type'>
              <option>A</option>
              <option>B</option>
            </select>
            <textarea id='description' />
          </div>
        </div>
      </div>
      <div id='actions'>
        <button disabled={!(name && type && (props.currentMeal.length > 0))}>Add food</button>
      </div>
      
    </>
  )
}

export default Metadata