interface SettingsDropdownContentProps {
  text: string
  href?: string
}

const SettingsDropdownContent = (props: SettingsDropdownContentProps) => {
  return (
    <a className="settingsDropdownText" href={props.href}>{props.text}</a>
  )
}

export default SettingsDropdownContent