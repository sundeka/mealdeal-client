import '../../assets/styles/create.css'
import ButtonMajor from '../../components/Buttons/ButtonMajor'
import Card from '../../components/Card/Card'

const Insert = () => {
  return (
    <div className="insert-root">
      <div className="mealdeal-common-label">
        <h3>Select food</h3>
      </div>
      <Card className="insert-food">
        <div className="insert-wrapper-panel">
          <p className="create-card-label">Food name</p>
          <select className="insert-dropdown">
            <option value="jauhe">Jauheliha</option>
          </select>
        </div>
        <div className="insert-wrapper-panel">
          <p className="create-card-label">Amount (grams)</p>
          <input className="create-input" type="number"></input>
        </div>
        <div className="insert-button-add">
          <ButtonMajor text="Add" color="green" />
        </div>
      </Card>
      <div className="mealdeal-common-label">
        <h3>Current meal</h3>
      </div>
      <Card className="current-meal">
        <p></p>
      </Card>
    </div>
  )
}

export default Insert