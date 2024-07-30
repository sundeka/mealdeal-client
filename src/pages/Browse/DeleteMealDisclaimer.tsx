import { MoonLoader } from "react-spinners"
import { Meal } from "../../schema"
import { AxiosResponse } from "axios"
import { UseMutationResult } from "react-query"

interface DeleteMealDisclaimerProps {
  onCancel: () => void
  onDelete: () => void
  meal: Meal
  mutation: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>
}

const DeleteMealDisclaimer = (props: DeleteMealDisclaimerProps) => {
  const render = () => {
    if (props.mutation.isLoading) {
      return (
        <>
          <h2>Deleting...</h2>
          <MoonLoader />
        </>
      )
    }
    if (props.mutation.isError) {
      return (
        <>
          <h2>Error!</h2>
          <span>Unable to delete meal '{props.meal.name}'.</span>
          <button onClick={props.onCancel}>OK</button>
        </>
      )
    }
    return (
      <>
        <h2>Deleting meal</h2>
        <span>{props.meal.name}</span>
        <h2>Proceed?</h2>
        <div id='actions'>
          <button onClick={props.onDelete}>Yes</button>
          <button onClick={props.onCancel}>No</button>
        </div>
      </>
    )
  }
  return (
    <div className='info-panel-popup'>
      <div id='root'>
        {render()}
      </div>
    </div>
    
  )
}

export default DeleteMealDisclaimer