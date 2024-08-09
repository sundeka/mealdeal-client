import { Plan } from "../../../schema"

interface CalendarViewProps {
  plan: Plan
  setActionView: React.Dispatch<React.SetStateAction<boolean>>
}

const CalendarView = (props: CalendarViewProps) => {
  return (
    <div className="calendar-view-root">
      
    </div>
  )
}

export default CalendarView