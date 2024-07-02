import '../../assets/styles/create.css'
import Header from "../../components/Header/Header"
import Insert from './Insert'

const Create = () => {
  return (
    <>
      <Header />
      <div className="createRoot">
        <Insert />
        <div className="createMetadata">
          <p>metadata</p>
        </div>
        <div className="createContent">
          <p>content</p>
        </div>
      </div>
    </>
  )
}

export default Create