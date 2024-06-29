import '../../assets/styles/card.css'

interface CardTextProps {
  children: React.ReactNode;
  className?: string

}

const CardText: React.FC<CardTextProps> = ({ className, children }) => {
  return (
    <p className={className ? "cardText".concat(" " + className) : "cardText"}>
      {children}
    </p>
  )
}

export default CardText