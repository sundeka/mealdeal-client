import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import { tokenIsInvalid } from "../../utils/tokenIsInvalid"
import { useState } from "react";
import Selection from "./Selection";
import PlanSelector from "./PlanSelector";
import PlanCreator from "./PlanCreator";

export enum PlanPage {
  PlanCreator = 1,
  PlanSelector = 2
}

const Plans = () => {
  const [selectedView, setSelectedView] = useState<PlanPage | null>(null);
  
  if (tokenIsInvalid()) {
    localStorage.clear()
    return <Navigate to="/" replace />
  }

  const render = () => {
    if (selectedView) {
      if (selectedView == PlanPage.PlanSelector) {
        return <PlanSelector setSelectedView={setSelectedView} />
      }
      return <PlanCreator setSelectedView={setSelectedView} />
    }
    return <Selection setSelectedView={setSelectedView} />
  }

  return (
    <>
      <Header />
      {render()}
    </>
  )
}

export default Plans