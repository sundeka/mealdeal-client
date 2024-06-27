import { useState } from 'react';
import '../../assets/styles/settings.css'
import { FaList } from "react-icons/fa6";
import SettingsDropdownContent from './SettingsDropdownElement';

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const displayMenu = (open: boolean) => {
    if (open) {
      return (
        <div className="settingsDropdownContent">
          <SettingsDropdownContent href="#" text="Dark/light mode" />
          <SettingsDropdownContent href="#" text="Account settings" />
        </div>
      )
      }
    return <></>
  }

  return (
    <div className="settingsDropdown">
      <button onClick={onClick} className="settingsDropdownButton">
        <FaList className="settingsDropdownIcon" />
      </button>
      {displayMenu(isOpen)}
    </div>
  )
}

export default SettingsDropdown