import '../../assets/styles/buttonmajor.css'

interface ButtonMajorProps {
  text: string
  action?: () => void
  color?: string
}

const ButtonMajor = (props: ButtonMajorProps) => {
  return (
    <button style={{'backgroundColor': props.color}} onClick={props.action} className="button-major">{props.text}</button>
  )
}

export default ButtonMajor