import { ChangeEvent, useState } from 'react';
import logo from '../assets/images/logo.png'
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login } from '../api/endpoints';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const loginMutation = useMutation(
    {
      mutationFn: login,
      onSuccess: (data: AxiosResponse<any, any>) => {
        toast.dismiss()
        localStorage.setItem('token', data.data['token'])
        localStorage.setItem('user_id', data.data['user_id'])
        navigate('/home')
      },
      onMutate: () => {
        toast.loading("Logging in...")
      },
      onError: (error: any) => {
        toast.dismiss()
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error(`Unable to login: ${error}`)
        }        
      },
    }
  )
  
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" replace />
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
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
            <input
              type='name'
              onChange={handleUsernameChange}
            />
            <div style={{height: 10}}/>
            <label>Password:</label>
            <div style={{height: 5}}/>
            <input 
              type='password'
              onChange={handlePasswordChange}
            />
            <div style={{height: 30}}/>
            <button 
              className='login-box__form__login-button' 
              onClick={
                () => loginMutation.mutate({username: username, password: password})
              }
              disabled={!username || !password || loginMutation.isLoading}
              >
                Login
            </button>
          </div>
        </div>
        <div className='login-container__disclaimer'>
          <p>Credentials for testing:</p>
          <p>Username: testuser</p>
          <p>Password: testpass</p>
        </div>
      </div>
    </div>
  )
}

export default Login