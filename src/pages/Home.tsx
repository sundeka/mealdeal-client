import { Navigate } from "react-router-dom"
import Header from "../components/Header/Header"
import { tokenIsInvalid } from "../utils/tokenIsInvalid"
import { useQuery } from "react-query";
import { getMetadata } from "../api/endpoints";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";

const Home = () => {
  const { isLoading: metadataIsLoading, isError: metadataIsError } = useQuery("getMetadata", getMetadata, { refetchOnWindowFocus: false });
  
  if (tokenIsInvalid()) {
    localStorage.clear()
    return <Navigate to="/" replace />
  }

  if (metadataIsLoading) {
    return (
      <div className="home-root--loading-metadata">
        <MoonLoader />
        <span>Please wait...</span>
      </div>
    )
  }

  if (metadataIsError) {
    toast.error("Unable to load user metadata. Some of the features might appear buggy.")
  }

  return (
    <>
      <Header />
      <div className='home-root'>
        <h1 className='home-root__h1'>Welcome to MealDeal, {localStorage.getItem('username')}!</h1>
        <div className='home-root__intro-container'>
          <p>
          Aimed for fitness enthusiasts, <strong>MealDeal</strong> is a nutrition planning application 
          that allows its users to monitor their calorie & micronutrient intake for each meal they consume. 
          MealDeal can be used for a variety of use cases: weight loss, weight gain or just general nutrient intake management.
          </p>
        </div>
        <div className="home-root__quick-menu">
          <div className="quick-menu__item">
            <h1>
              &#127858;
              <a href="./create"> New meal</a>
            </h1>
            <div className="item-title-divider" />
          </div>
          <div className="quick-menu__item">
            <h1>
              &#128269;
              <a href="./browse"> Browse meals</a>
            </h1>
            <div className="item-title-divider" />
          </div>
          <div className="quick-menu__item">
            <h1>
              &#128221;
              <a href="./plans"> Meal plans</a>
            </h1>
            <div className="item-title-divider" />
            <p>
              A competition coming up? Gearing up for your next training block?
            </p>
            <br />
            <p>
              Worry not. With MealDeal, you can design your weekly calorie intake conveniently in advance.
            </p>
            <br />
            <p>
              With MealDeal's meal planner, you can make use of the meals you have created in advance
              to design a weekly meal plan that is tailored just for your calorie needs.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home