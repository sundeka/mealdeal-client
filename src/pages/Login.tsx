import { ChangeEvent, FormEvent, useState } from 'react';
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';


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

  const onLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    props.setLoggedIn(true)
    navigate('/home');
  }

  return (
    <div className='login-root'>
      <div className='login-root__login-container'>
        <div style={{height: 100}}/>
        <div className='login-container__logo-box'>
          <img className='login-container__logo-box__img' src={logo} alt="MealDeal logo" />
        </div>
        <div style={{height: 60}}/>
        <div className='login-container__login-box'>
          <div className='login-box__form'>
            <label>Username:</label>
            <div style={{height: 5}}/>
            <input/>
            <div style={{height: 10}}/>
            <label>Password:</label>
            <div style={{height: 5}}/>
            <input/>
            <div style={{height: 30}}/>
            <button className='login-box__form__login-button' onClick={onLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login