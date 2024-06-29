import { Link } from 'react-router-dom'
import '../../assets/styles/buttonlink.css'

interface ButtonLinkProps {
  text: string
  to: string
}

const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <button className="button-link">
        <Link to={props.to}>{props.text}</Link>
    </button>
  )
}

export default ButtonLink