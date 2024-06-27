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

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
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
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleUsernameChange} value={username} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password} />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default Login