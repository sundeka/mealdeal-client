import { useState } from "react";
import { Meal, MealType } from "../../schema";
import { sortMeals } from "../../utils/sortMeals";
import Browser from "./Browser";

interface BrowseContentPageProps {
  meals: Meal[]
  types: MealType[]
}

const BrowseContentPage = (props: BrowseContentPageProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
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
            <Browser meals={sortedMeals} selectedRow={selectedRow} setSelectedRow={setSelectedRow}/>
          </div>
        </div>
      </div>
      <div id={`${selectedRow ? 'container-right--active' : 'container-right--disabled'}`}>
          
      </div>
    </div>
  )
}

export default BrowseContentPage