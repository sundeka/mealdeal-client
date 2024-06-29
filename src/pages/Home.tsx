import '../assets/styles/home.css'
import Header from "../components/Header/Header"

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeRoot">
        <div className="homeIntro">
          <h2>Welcome to MealDeal, *user*!</h2>
          <br/>
          <p>MealDeal is an application that allows x. Cras pretium sapien tortor, ac rhoncus est viverra ac. Sed vehicula vel arcu et elementum. Sed finibus nisi eu lacus congue commodo.</p>
          <br/>
          <p>screenshot1|screenshot2|screenshot3</p>
          <br/>
          <p>Maecenas condimentum eros odio, et tincidunt felis commodo eget. Aliquam scelerisque congue leo, sed malesuada ante vehicula eget. Cras purus libero, porttitor id dolor vel, elementum euismod nisl. Morbi non finibus augue, sed feugiat arcu. Quisque euismod venenatis laoreet. Donec vel dignissim magna, a lobortis quam. Quisque in pellentesque purus. Nunc sed egestas lorem.</p>
        </div>
        <div className="homeStatistics">
          <h2>Statistics about you:</h2>
          <p>Name: username1234</p>
          <p>Account created: 29.06.2024 12:03</p>
          <p>Created meals: 22</p>
        </div>
      </div>
    </>
  )
}

export default Home