import { MoonLoader } from "react-spinners"

const BrowseLoadingPage = () => {
  return (
    <div className='browse-root-loading'>
      <h1>Loading meals...</h1>
      <MoonLoader />
    </div>
  )
}

export default BrowseLoadingPage