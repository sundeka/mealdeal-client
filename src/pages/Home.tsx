import Header from "../components/Header/Header"

const Home = () => {
  return (
    <>
      <Header />
      <div className='home-root'>
        <h1 className='home-root__h1'>Welcome to MealDeal!</h1>
        <div className='home-root__intro-container'>
          <div className='intro-container__introduction'>
            <p className='introduction-text'>
            <strong>MealDeal</strong> is an application that allows x. 
            Cras pretium sapien tortor, ac rhoncus est viverra ac. 
            Sed vehicula vel arcu et elementum. 
            Sed finibus nisi eu lacus congue commodo.
            </p>
          </div>
          <div className='intro-container__statistics-container'>
            <p className='statistics-container__header'>Here are some statistics about you:</p>
            <div className='statistics-container__stat-row'>
              <p className='stat-row--name'>Name:</p>
              <p className='stat-row--stat'>username1234</p>
            </div>
            <div className='statistics-container__stat-row'>
              <p className='stat-row--name'>Account created:</p>
              <p className='stat-row--stat'>29.06.2024 12:03</p>
            </div>
            <div className='statistics-container__stat-row'>
              <p className='stat-row--name'>Created meals:</p>
              <p className='stat-row--stat'>22</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home