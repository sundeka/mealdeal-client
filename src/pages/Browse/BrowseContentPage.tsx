import { useState } from "react";
import { Meal, MealType } from "../../schema";
import { sortMeals } from "../../utils/sortMeals";
import Browser from "./Browser";
import BrowserInfoPanel from "./BrowserInfoPanel";

interface BrowseContentPageProps {
  meals: Meal[]
  types: MealType[]
}

const BrowseContentPage = (props: BrowseContentPageProps) => {
  const [currentSelection, setCurrentSelection] = useState<Meal | null>(null);
  const [sortedMeals, setSortedMeals] = useState<Map<MealType, Meal[]>>(sortMeals(props.types, props.meals));
  
  return (
    <div className='browse-root--success'>
      <div id='container-left'>
        <div className='browser-container'>
          <div className='browser-header'>
            <h1>Browse meals</h1>
            <span>Found {props.meals.length} meals for *username*</span>
          </div>
          <div className='browser-content'>
            <Browser meals={sortedMeals} selectedRow={currentSelection} setSelectedRow={setCurrentSelection}/>
          </div>
        </div>
      </div>
      <BrowserInfoPanel meal={currentSelection} types={props.types} setCurrentSelection={setCurrentSelection}/>
    </div>
  )
}

export default BrowseContentPage