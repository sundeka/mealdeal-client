import { ChangeEvent, FormEvent, useState } from 'react';
import logo from '../assets/images/logo.png'
import '../assets/styles/login.css'
import { useNavigate } from 'react-router-dom';
import ButtonMajor from '../components/Buttons/ButtonMajor';


interface LoginProps {
  setLoggedIn: (value: boolean) => void;
}

const Login = (props: LoginProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.setLoggedIn(true)
    navigate('/home');
  }

  return (
    <div className='loginRoot'>
      <div className='loginLogoDiv'>
        <img className='loginLogoImage' src={logo} alt="MealDeal logo" />
      </div>
      <div className='loginBox'>
        <form className='loginForm' onSubmit={onLogin}>
          <label className="loginFormLabel" htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleUsernameChange} value={username} />
          <label className="loginFormLabel" htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password} />
          <ButtonMajor text="Login" action={() => onLogin} />
        </form>
      </div>
    </div>
  )
}

export default Login