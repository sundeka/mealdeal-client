import logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { UserObject } from '../../schema';

interface HeaderProps {
  user: UserObject | null
  setUser: React.Dispatch<React.SetStateAction<UserObject | null>>
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();

  const onLogout = () => {
    props.setUser(null)
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