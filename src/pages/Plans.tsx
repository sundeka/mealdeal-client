import { Navigate } from "react-router-dom"
import Header from "../components/Header/Header"
import { tokenIsInvalid } from "../utils/tokenIsInvalid"

const Plans = () => {
  if (tokenIsInvalid()) {
    localStorage.clear()
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