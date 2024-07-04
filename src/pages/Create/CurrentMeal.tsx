import '../../assets/styles/create.css'
import { useState } from 'react'
import { Food } from '../../schema'
import Card from '../../components/Card/Card'

interface CurrentMealProps {
    currentMeal: Food[]
    setCurrentMeal: React.Dispatch<Food[]>
  }

const onDelete = (id: string) => {
  console.log(id)
}

const CurrentMeal = (props: CurrentMealProps) => {
  return (
    <>
      <div className="mealdeal-common-label">
        <h3>Current meal</h3>
      </div>
      <Card className="current-meal">
        <div className="current-meal-title-container">
          <h3>Food name</h3>
          <h3>Amount</h3>
        </div>
        {props.currentMeal.map((food: Food) => {
          return (
            <div className="current-meal-row">
              <div className="current-meal-row-data">
                <div className="current-meal-row-data-content">
                  <p>{food.name}</p>
                </div>
                <div className="current-meal-row-data-content">
                  <p>{food.amount} g</p>
                </div>
                
              </div>
              <div className="current-meal-row-action">
                <button id={food.id} onClick={() => onDelete(food.id)}>delete</button>
              </div>
            </div>
          )
        })}
      </Card>
    </>
  )
}

export default CurrentMeal