import logo from '../../assets/images/logo.png'
import '../../assets/styles/header.css'
import { Link } from 'react-router-dom';
import ButtonMajor from '../Buttons/ButtonMajor';
import SettingsDropdown from '../Settings/SettingsDropdown';

const Header = () => {
  return (
    <div className="headerRoot">
      <header>
        <div className="headerLeft">
          <div className="headerLogo">
            <Link to="../home">
              <img src={logo} />
            </Link>
          </div>
          <h1>MealDeal</h1>
        </div>
        <div className="headerRight">
          <Link to="../create">Create</Link>
          <Link to="../browse">Browse</Link>
          <Link to="../build">Build</Link>
          <SettingsDropdown />
          <ButtonMajor text={"Log out"} color="red" />
        </div>
      </header>
    </div>
  )
}

export default Header