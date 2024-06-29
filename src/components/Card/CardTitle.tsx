import '../../assets/styles/card.css'

interface CardTitleProps {
  children: React.ReactNode;
  className?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h2 className={className ? "cardTitle".concat(" " + className) : "cardTitle"}>
      {children}
    </h2>
  )
}

export default CardTitle