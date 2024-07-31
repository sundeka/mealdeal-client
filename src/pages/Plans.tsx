import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header"
import { UserObject } from "../schema";

interface PlansProps {
  user: UserObject | null
  setUser: React.Dispatch<React.SetStateAction<UserObject | null>>
}

const Plans = (props: PlansProps) => {
  if (!props.user) { return <Navigate to="/" replace />; }
  return (
    <>
      <Header user={props.user} setUser={props.setUser} />
      <p>Plans</p>
    </>
  )
}

export default Plans