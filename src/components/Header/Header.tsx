import { useState } from 'react';
import logo from '../../assets/images/logo.png'
import profile_pic from '../../assets/images/profile_pic.jpg'
import { Link, useNavigate } from 'react-router-dom';
import UserSettings from './UserSettings';


const Header = () => {
  const navigate = useNavigate();

  const [displaySettings, setDisplaySettings] = useState<boolean>(false)
  
  const onLogout = () => {
    localStorage.clear()
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
        <a href='../create'>New meal</a>
        <div style={{width: 15}}/>
        <a href='../browse'>Browse meals</a>
        <div style={{width: 15}}/>
        <a href='../plans'>Meal plans</a>
        <div style={{width: 15}}/>
      </div>
      <div className='header__container-actions'>
        <div 
          className='container-actions__settings'
          onClick={() => setDisplaySettings(!displaySettings)}
        >
          <img src={profile_pic} />
        </div>
        <button className='container-actions__logout' onClick={onLogout}>Log out</button>
      </div>
      <UserSettings render={displaySettings} setRender={setDisplaySettings} />
    </header>
  )
}

export default Header