import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="homeRoot">
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
          <button>settings</button>
          <button>logout</button>
        </div>
      </header>
    </div>
  )
}

export default Header