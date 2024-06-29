import '../assets/styles/home.css'
import Card from '../components/Card/Card'
import CardText from '../components/Card/CardText'
import CardTitle from '../components/Card/CardTitle'
import Header from "../components/Header/Header"

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeRoot">
        <Card className="homeIntro">
          <CardTitle className="homeIntro-h2">Welcome to MealDeal, *user*!</CardTitle>
          <CardText>MealDeal is an application that allows x. Cras pretium sapien tortor, ac rhoncus est viverra ac. Sed vehicula vel arcu et elementum. Sed finibus nisi eu lacus congue commodo.</CardText>
          <CardText>screenshot1|screenshot2|screenshot3</CardText>
          <CardText>Maecenas condimentum eros odio, et tincidunt felis commodo eget. Aliquam scelerisque congue leo, sed malesuada ante vehicula eget. Cras purus libero, porttitor id dolor vel, elementum euismod nisl. Morbi non finibus augue, sed feugiat arcu. Quisque euismod venenatis laoreet. Donec vel dignissim magna, a lobortis quam. Quisque in pellentesque purus. Nunc sed egestas lorem.</CardText>
        </Card>
        <Card className="homeStatistics">
          <CardTitle className="homeStatistics-h2">Statistics about you:</CardTitle>
          <CardText className="homeStatistics-p">Name: username1234</CardText>
          <CardText className="homeStatistics-p">Account created: 29.06.2024 12:03</CardText>
          <CardText className="homeStatistics-p">Created meals: 22</CardText>
        </Card>
      </div>
    </>
  )
}

export default Home