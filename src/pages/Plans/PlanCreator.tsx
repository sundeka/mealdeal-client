import { useState } from "react"
import { PlanPage } from "./Plans"
import { Plan } from "../../schema"
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from "react-query";
import { postCreatePlan } from "../../api/endpoints";
import toast from "react-hot-toast";

interface PlanCreatorProps {
  setSelectedView: React.Dispatch<React.SetStateAction<PlanPage | null>>
}

const PlanCreator = (props: PlanCreatorProps) => {
  const createPlanEndpoint = useMutation(
    { 
      mutationFn: postCreatePlan,
      onMutate: () => {
        toast.loading("Creating a new plan...")
      },
      onError: (error: any) => {
        toast.dismiss()
        toast.error("Error creating a new plan: " + error)
      },
      onSuccess: (data: any) => {
        toast.dismiss()
        toast.success(`Plan "${data.data.name}" created!`)
        // redirect
      }
    }
  )
  
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [length, setLength] = useState<string>("1")
  
  const onCreate = () => {
    const now = new Date()
    const plan: Plan = {
      planId: uuidv4(),
      name: name,
      description: description,
      length: Number(length),
      createdAt: now.toISOString()
    }
    createPlanEndpoint.mutate(plan)
  }

  return (
    <div className="plan-root--create">
      <div className="plan-root--create__header"> 
        <h1>New plan</h1>
        <button onClick={() => props.setSelectedView(null)}>Go back</button>
      </div>
      <div className="plan-root--create__data-box">
        <div id="inputs">
          <div className="data-box__label-container">
            <label>Name:</label>
            <label id="description">Description*:</label>
            <label>Length (weeks):</label>
          </div>
          <div className="data-box__input-container">
            <input 
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            />
            <textarea 
              placeholder="Optional" 
              id="description" 
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
            />
            <select 
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setLength(event.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
        <div id="actions">
          <button 
            disabled={!name}
            onClick={onCreate}
          >
            Create plan
          </button>
        </div>
      </div>

    </div>
  )
}

export default PlanCreator