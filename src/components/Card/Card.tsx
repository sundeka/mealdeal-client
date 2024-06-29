import '../../assets/styles/card.css'

interface CardProps {
  className?: string
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={className ? "card".concat(" " + className) : "card"}>
      {children}
    </div>
  )
}

export default Card