import { PlanPage } from "./Plans"

interface SelectionProps {
  setSelectedView: React.Dispatch<React.SetStateAction<PlanPage | null>>
}

const Selection = (props: SelectionProps) => {
  return (
    <div className="plan-root--selection">
      <h1>Choose action</h1>
      <div className="plan-root--selection__actions">
        <h2 onClick={() => props.setSelectedView(PlanPage.PlanCreator)}>Create a new plan</h2>
        <p>|</p>
        <h2 onClick={() => props.setSelectedView(PlanPage.PlanSelector)}>Choose an existing plan</h2>
      </div>
    </div>
  )
}

export default Selection