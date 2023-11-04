import React, { useContext, useEffect } from 'react'
import SignInUpForm from '../../components/SignInUp/SignInUpForm'
import './LoginPage.css'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../components/AuthContext/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated)
      navigate("/profile");
  }, [isAuthenticated])

  return (
    <div className='grid grid-cols-1 place-items-center h-[85%] logIn h-screen'>
        <SignInUpForm/>
    </div>
  )
}

export default LoginPage