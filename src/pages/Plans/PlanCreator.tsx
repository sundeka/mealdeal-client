import { useState } from "react"
import { PlanPage } from "./Plans"

interface PlanCreatorProps {
  setSelectedView: React.Dispatch<React.SetStateAction<PlanPage | null>>
}

const PlanCreator = (props: PlanCreatorProps) => {
  const [name, setName] = useState<string>('')
  const [length, setLength] = useState<string>("1")
  
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
            <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}></input>
            <textarea placeholder="Optional" id="description" />
            <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setLength(event.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
        <div id="actions">
          <button disabled={!name}>Create plan</button>
        </div>
      </div>

    </div>
  )
}

export default PlanCreator