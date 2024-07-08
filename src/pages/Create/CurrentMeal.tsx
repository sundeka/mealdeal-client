import '../../assets/styles/create.css'
import { useState } from 'react'
import { Food } from '../../schema'
import Card from '../../components/Card/Card'

interface CurrentMealProps {
    currentMeal: Food[]
    setCurrentMeal: React.Dispatch<Food[]>
  }

const CurrentMeal = (props: CurrentMealProps) => {

  const onDelete = (id: string) => {
    console.log(id)
  }

  const renderTable = () => {
    if (props.currentMeal.length < 1) {
      return (
        <div className='table__empty-table'>
            <h3>It's empty in here...</h3>
            <p>Start above by adding a new food to your meal.</p>
        </div>
      )
    }
    return (
      <table className='table__table-frame'>
        <tr>
          <th className='table-frame__column'>Name</th>
          <th className='table-frame__column'>Amount (g)</th>
          <th></th>
        </tr>
          {
            props.currentMeal.map((food: Food) => {
              return (
                <tr className='table-frame__row'>
                  <td>{food.name}</td>
                  <td>{food.amount}</td>
                  <td><button className='row__delete-button' /></td>
                </tr>
              )
            })
          }
      </table>
    )
  }

  return (
    <div className='new__current-meal-container'>
      <h2>Current meal</h2>
      <div className='current-meal-container__table'>
        {renderTable()}
      </div>
    </div>
  )
}

export default CurrentMeal