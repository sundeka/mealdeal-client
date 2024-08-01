import { Navigate } from "react-router-dom"
import Header from "../components/Header/Header"

const Plans = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace />
  }
  return (
    <>
      <Header />
      <p>Plans</p>
    </>
  )
}

export default Plans