import { useEffect, useState } from "react"
import { Plan } from "../../schema"
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from "react-query";
import { getMetadata, postCreatePlan } from "../../api/endpoints";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PlanCreatorProps {
  setActionView: React.Dispatch<React.SetStateAction<boolean>>
}

const PlanCreator = (props: PlanCreatorProps) => {
  const { refetch: refetchMetadata } = useQuery("getMetadata", getMetadata, { refetchOnWindowFocus: false });
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
        refetchMetadata()
        // redirect
      }
    }
  )
  
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [length, setLength] = useState<number | undefined>(1)
  const [startingFrom, setStartingFrom] = useState<Date | null>(new Date())
  
  useEffect(() => {
    if (!length) {
      setStartingFrom(null)
    } else {
      setStartingFrom(new Date())
    }
  }, [length])
  
  const onCreate = () => {
    const now = new Date()
    const plan: Plan = {
      planId: uuidv4(),
      name: name,
      description: description,
      length: length,
      createdAt: now.toISOString(),
      startingFrom: startingFrom ? startingFrom.toISOString() : null
    }
    createPlanEndpoint.mutate(plan)
  }

  const onChangeLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value 
    if (!selection) { // selection = "continuous" {}
      setLength(undefined)
    } else {
      setLength(Number(selection))
    }
  }

  return (
    <div className="plan-root--create">
      <div className="plan-root--create__header"> 
        <h1>New plan</h1>
        <button onClick={() => props.setActionView(true)}>Go back</button>
      </div>
      <div className="plan-root--create__data-box">
        <div id="inputs">
          <div className="data-box__row" id="name">
            <label>Name:</label>
            <input 
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            />
          </div>
          <div className="data-box__row" id="description">
            <label>Description*:</label>
            <textarea 
              placeholder="Optional" 
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
            />
          </div>
          <div className="data-box__row" id="length">
            <label>Length (weeks):</label>
            <select 
              onChange={onChangeLength}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option>Continous</option>
            </select>
          </div>
          {
            startingFrom ?
            <div hidden={startingFrom == null} className="data-box__row" id="starting-from">
              <label>Starting from:</label>
              <DatePicker selected={startingFrom} onChange={(date) => setStartingFrom(date)} />
            </div>
            :
            <></>
          }
          
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