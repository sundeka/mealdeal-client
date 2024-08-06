import { PlanPage } from "./Plans"

interface PlanSelectorProps {
  setSelectedView: React.Dispatch<React.SetStateAction<PlanPage | null>>
}

const PlanSelector = (props: PlanSelectorProps) => {
  return (
    <>
      <p>planselector</p>
      <button onClick={() => props.setSelectedView(null)}>go back</button>
    </>
  )
}

export default PlanSelector