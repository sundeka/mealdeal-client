import { useEffect, useState } from 'react'
import { MealItem, MealMetadata, MealType } from '../../schema'
import { UseMutationResult, useQuery } from 'react-query'
import { getFoodTypes, getMetadata } from '../../api/endpoints'
import { AxiosResponse } from 'axios'
import { serializeCurrentMeal } from '../../utils/serializeCurrentMeal'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'

interface MetadataProps {
  currentMeal: Map<string, MealItem>
  mutation: UseMutationResult<AxiosResponse<any, any>, unknown, any, unknown>
}

const Metadata = (props: MetadataProps) => {
  const [name, setName] = useState<string | null>(null)
  const [type, setType] = useState<number | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const { data: types, isError: typesIsError, isLoading: typesIsLoading } = useQuery("getFoodTypes", getFoodTypes, { refetchOnWindowFocus: false });
  const { refetch: refetchMetadata } = useQuery("getMetadata", getMetadata, { refetchOnWindowFocus: false });

  useEffect(() => {
    toast.dismiss()
    if (props.mutation.isError) {
      toast.error("Error creating a new meal!")
    } else if (props.mutation.isLoading) {
      toast.loading("Creating a new meal...")
    } else if (props.mutation.isSuccess) {
      refetchMetadata()
      toast.success("New meal created!")
    }
  }, [props.mutation.isError, props.mutation.isLoading, props.mutation.isSuccess])
  
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedType = selectedOption.getAttribute('data-id')
    setType(Number(selectedType))
  }

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const onCreateMeal = () => {
    if (props.currentMeal.size > 0 && name && type) {
      const mealEvents = serializeCurrentMeal(props.currentMeal)
      const meal: MealMetadata = {
        mealId: uuidv4(),
        userId: localStorage.getItem('user_id'),
        name: name,
        description: description,
        type: type,
        events: mealEvents
      }
      props.mutation.mutate(meal) 
    }
  }

  const renderMetadata = () => {
    if (typesIsLoading) {
      return (
        <div id='unsuccessful'>
          <div className='lane-loading-container'>
            <div className='lane-loading-container__loading-icon'>
              <MoonLoader />
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
                          data-id={mealType.id}
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
              disabled={
                !(name && type && (props.currentMeal.size > 0))  || props.mutation.isLoading
              }
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