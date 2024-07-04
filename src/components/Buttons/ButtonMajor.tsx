import '../../assets/styles/buttonmajor.css'

interface ButtonMajorProps {
  text: string
  disabled?: boolean
  action?: () => void
  color?: string
}

const ButtonMajor = (props: ButtonMajorProps) => {
  return (
    <button 
      style={{'backgroundColor': props.color}} 
      onClick={props.action} 
      className="button-major"
      disabled={props.disabled}
    >
    {props.text} 
    </button>
  )
}

export default ButtonMajor