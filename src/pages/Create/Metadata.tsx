import { useState } from 'react'
import { Meal, MealType } from '../../schema'
import { useQuery } from 'react-query'
import { getFoodTypes } from '../../api/endpoints'

interface MetadataProps {
  currentMeal: Map<string, Meal>
}

const Metadata = (props: MetadataProps) => {
  const [name, setName] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [descripion, setDescription] = useState<string | null>(null)
  const { data: types, isError: typesIsError, isLoading: typesIsLoading } = useQuery("getFoodTypes", getFoodTypes);
  
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value)
  }

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const onCreateMeal = () => {
    
  }

  const renderMetadata = () => {
    if (typesIsLoading) {
      return (
        <div id='unsuccessful'>
          <div className='lane-loading-container'>
            <div className='lane-loading-container__loading-icon'>
              {/** TODO: Loading icon */}
            </div>
            <span>Loading...</span>
          </div>
        </div>
      )
    }
    else if (typesIsError) {
      return (
        <div id='unsuccessful'>
          <div className='lane-loading-container'>
            <span>Oh no! Something went wrong...</span>
          </div>
        </div>
      )
    } else {
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
                  <option value="">Select type</option>
                  {
                    types.map((mealType: MealType) => {
                      return (
                        <option
                          key={mealType.id}
                          value={mealType.name}
                        >
                          {mealType.name}
                        </option>
                      )
                    })
                  }
                </select>
                <textarea id='description' onChange={onChangeDescription} />
              </div>
            </div>
          </div>
          <div id='actions'>
            <button 
              disabled={!(name && type && (props.currentMeal.size > 0))}
              onClick={onCreateMeal}
            >
              Create meal
            </button>
          </div>
        </>
      )
    }
  }

  return renderMetadata()
  
}

export default Metadata