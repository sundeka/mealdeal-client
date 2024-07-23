import { useQuery } from "react-query";
import Header from "../../components/Header/Header"
import NotFound from "../NotFound";
import BrowseContentPage from "./BrowseContentPage";
import BrowseLoadingPage from "./BrowseLoadingPage";
import { getFoods, getFoodTypes, getMeals } from "../../api/endpoints";

const Browse = () => {
  const isSuccess = true;
  const isLoading = false;

  const { data: meals, isLoading: mealsIsLoading } = useQuery("getMeals", getMeals, { refetchOnWindowFocus: false });
  const { data: types, isLoading: typesIsLoading } = useQuery("getFoodTypes", getFoodTypes, { refetchOnWindowFocus: false });
  const { data: foods, isLoading: foodsIsLoading } = useQuery("getFoods", getFoods, { refetchOnWindowFocus: false } )

  const renderPage = () => {
    if (meals && types && foods) {
      return <BrowseContentPage meals={meals} types={types} foods={foods}/>
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