import { MoonLoader } from "react-spinners"
import { Plan } from "../../schema"

interface PlanListProps {
  plans: any
  isLoading: boolean
  setSelectedPlan: React.Dispatch<React.SetStateAction<Plan | null>>
  setActionView: React.Dispatch<React.SetStateAction<boolean>>
}

const PlanList = (props: PlanListProps) => {

  const onClickPlan = (plan: Plan) => {
    props.setSelectedPlan(plan)
    props.setActionView(false)
  }
  
  if (props.plans && props.plans.length > 0) {
    return (
      <div className="actions__plan-list">
        {
          props.plans.map((plan: Plan) => {
            return (
              <div className="plan-list__row">
                <span>{plan.name}</span>
                <button onClick={() => onClickPlan(plan)}>Select</button>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  if (props.isLoading) {
    return (
      <div className="actions__plan-list" id="loading">
        <h2>Loading plans</h2>
        <MoonLoader />
        <span>Please wait...</span>
      </div>
    )
  }

  return (
    <div className="actions__plan-list" id="empty">
      <h2>Oh no!</h2>
      <span>It appears you have no plans.</span>
      <span>Start by creating a new plan.</span>
    </div>
  )
}

export default PlanList