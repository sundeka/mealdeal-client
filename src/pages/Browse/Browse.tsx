import Header from "../../components/Header/Header"
import NotFound from "../NotFound";
import BrowseContentPage from "./BrowseContentPage";
import BrowseLoadingPage from "./BrowseLoadingPage";

const Browse = () => {
  const isSuccess = false;
  const isLoading = true;

  const renderPage = () => {
    if (isSuccess) {
      return <BrowseContentPage meals={null} />
    } else if (isLoading) {
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