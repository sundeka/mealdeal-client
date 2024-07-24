import './modal.css'

interface ModalProps {
  active: boolean
  element: JSX.Element
}

const Modal = (props: ModalProps) => {
  if (!props.active) {
    return null
  } else {
    return (
      <div className='modal-background'>
        {props.element}
      </div>
    )
  }
}

export default Modal