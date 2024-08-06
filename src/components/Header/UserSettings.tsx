interface UserSettingsProps {
  render: boolean
  setRender: React.Dispatch<React.SetStateAction<boolean>>
}

const UserSettings = (props: UserSettingsProps) => {
  if (!props.render) {
    return null
  }


  function formatFinnishDate(isoString: string | null): string | undefined {
    if (isoString) {
      const date = new Date(isoString)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    }
    return undefined
  }

  return (
    <div className='header__settings'>
      <div id='title'>
        <p>Username:</p>
        <p>Created meals:</p>
        <p>Created plans:</p>
        <p>Account created:</p>
      </div>
      <div id='data'>
        <p>{localStorage.getItem('username')}</p>
        <p>{localStorage.getItem('meals_created')}</p>
        <p>{localStorage.getItem('plans_created')}</p>
        <p>{formatFinnishDate(localStorage.getItem('account_created'))}</p>
      </div>
    </div>
  )
}

export default UserSettings