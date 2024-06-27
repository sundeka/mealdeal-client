import '../../assets/styles/buttonmajor.css'

interface ButtonMajorProps {
    text: string
    color?: string
}

const ButtonMajor = (props: ButtonMajorProps) => {
  return (
    <button style={{'backgroundColor': props.color}} className="button-major">{props.text}</button>
  )
}

export default ButtonMajor