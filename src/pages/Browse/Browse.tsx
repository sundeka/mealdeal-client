import { useQuery } from "react-query";
import Header from "../../components/Header/Header"
import NotFound from "../NotFound";
import BrowseContentPage from "./BrowseContentPage";
import BrowseLoadingPage from "./BrowseLoadingPage";
import { getFoods, getFoodTypes, getMeals } from "../../api/endpoints";
import { UserObject } from "../../schema";
import { Navigate } from "react-router-dom";

interface BrowseProps {
  user: UserObject | null
  setUser: React.Dispatch<React.SetStateAction<UserObject | null>>
}

const Browse = (props: BrowseProps) => {
  const { data: meals, isLoading: mealsIsLoading, refetch: refetchMeals } = useQuery("getMeals", getMeals, { refetchOnWindowFocus: false });
  const { data: types, isLoading: typesIsLoading, refetch: refetchTypes } = useQuery("getFoodTypes", getFoodTypes, { refetchOnWindowFocus: false });
  const { data: foods, isLoading: foodsIsLoading, refetch: refetchFoods } = useQuery("getFoods", getFoods, { refetchOnWindowFocus: false } )

  if (!props.user) { return <Navigate to="/" replace />; }

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
      <Header user={props.user} setUser={props.setUser} />
      {renderPage()}
    </>
  )
}

export default Browse