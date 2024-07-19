import { useQuery } from "react-query";
import Header from "../../components/Header/Header"
import NotFound from "../NotFound";
import BrowseContentPage from "./BrowseContentPage";
import BrowseLoadingPage from "./BrowseLoadingPage";
import { getFoodTypes, getMeals } from "../../api/endpoints";

const Browse = () => {
  const isSuccess = true;
  const isLoading = false;

  const { data: meals, isLoading: mealsIsLoading } = useQuery("getMeals", getMeals, { refetchOnWindowFocus: false });
  const { data: types, isLoading: typesIsLoading } = useQuery("getFoodTypes", getFoodTypes, { refetchOnWindowFocus: false });

  const renderPage = () => {
    if (meals && types) {
      return <BrowseContentPage meals={meals} types={types} />
    } else if (mealsIsLoading || typesIsLoading) {
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