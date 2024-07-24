import { useQuery } from "react-query";
import Header from "../../components/Header/Header"
import NotFound from "../NotFound";
import BrowseContentPage from "./BrowseContentPage";
import BrowseLoadingPage from "./BrowseLoadingPage";
import { getFoods, getFoodTypes, getMeals } from "../../api/endpoints";

const Browse = () => {
  const { data: meals, isLoading: mealsIsLoading, refetch: refetchMeals } = useQuery("getMeals", getMeals, { refetchOnWindowFocus: false });
  const { data: types, isLoading: typesIsLoading, refetch: refetchTypes } = useQuery("getFoodTypes", getFoodTypes, { refetchOnWindowFocus: false });
  const { data: foods, isLoading: foodsIsLoading, refetch: refetchFoods } = useQuery("getFoods", getFoods, { refetchOnWindowFocus: false } )

  const refresh = () => {
    refetchMeals()
    refetchTypes()
    refetchFoods()
  }
  
  const renderPage = () => {
    if (meals && types && foods) {
      return <BrowseContentPage 
        meals={meals} 
        types={types} 
        foods={foods}
        onRefresh={refresh}
      />
    } else if (mealsIsLoading || typesIsLoading || foodsIsLoading) {
      return <BrowseLoadingPage />
    } else {
      return <NotFound />
    }
  }

  return (
    <>
      <Header />
      {renderPage()}
    </>
  )
}

export default Browse