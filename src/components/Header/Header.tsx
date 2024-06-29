import logo from '../../assets/images/logo.png'
import '../../assets/styles/header.css'
import { Link, useNavigate } from 'react-router-dom';
import ButtonMajor from '../Buttons/ButtonMajor';
import SettingsDropdown from '../Settings/SettingsDropdown';
import ButtonLink from '../Buttons/ButtonLink';

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate('/')
  }
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
        <div className="headerNav">
          <ButtonLink text="Create meal" to="../create"></ButtonLink>
          <ButtonLink text="Browse meals" to="../browse"></ButtonLink>
          <ButtonLink text="Meal plans" to="../plans"></ButtonLink> 
        </div>
        <div className="headerActions">
          <SettingsDropdown />
          <ButtonMajor action={onLogout} text={"Log out"} color="red" />
        </div>
      </header>
    </div>
  )
}

export default Header