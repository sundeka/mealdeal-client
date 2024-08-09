import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import { tokenIsInvalid } from "../../utils/tokenIsInvalid"
import { useState } from "react";
import PlanCreator from "./PlanCreator";
import { useQuery } from "react-query";
import { getPlans } from "../../api/endpoints";
import PlanList from "./PlanList";
import { Plan } from "../../schema";
import CalendarView from "./Calendar";

const Plans = () => {
  const { 
    data: plans, isLoading: plansIsLoading, refetch: refetchPlans 
  } = useQuery("getPlans", getPlans, { refetchOnWindowFocus: false });
  
  const [actionView, setActionView] = useState<boolean>(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  
  if (tokenIsInvalid()) {
    localStorage.clear()
    return <Navigate to="/" replace />
  }

  const render = () => {
    if (!actionView) {
      if (!selectedPlan) {
        return <PlanCreator setActionView={setActionView} />
      }
      return (
        <CalendarView 
          plan={selectedPlan}
          setActionView={setActionView}
        />
      )
    }
    return (
      <div className="plan-root--selection">
        <h1>Meal plans</h1>
        <div className="plan-root--selection__actions">
          <h2 id="new" onClick={() => setActionView(false)}>Create a plan</h2>
          <PlanList 
            plans={plans} 
            isLoading={plansIsLoading} 
            setSelectedPlan={setSelectedPlan} 
            setActionView={setActionView}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      {render()}
    </>
  )
}

export default Plans