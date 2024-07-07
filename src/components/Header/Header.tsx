import logo from '../../assets/images/logo.png'
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
    <header className='header'>
      <div className='header__container-logo'>
        <div className='container-logo__box'>
          <Link to="../home">
            <img className='container-logo__box__img' src={logo} />
          </Link>
        </div>
        <span className='container-logo__text'>MealDeal</span>
      </div>
      <div className='header__container-navigation'>
        <a href='../create'>Create meal</a>
        <div style={{width: 15}}/>
        <a href='../browse'>Browse meals</a>
        <div style={{width: 15}}/>
        <a href='../plans'>Meal plans</a>
        <div style={{width: 15}}/>
      </div>
      <div className='header__container-actions'>
        <div className='container-actions__settings'>
          {/** TODO */}
        </div>
        <button className='container-actions__logout' onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}

export default Header