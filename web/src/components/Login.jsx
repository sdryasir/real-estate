import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import BreadcrumbSection from './Breadcrumb'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {isAuthenticated, user} = useSelector(state=>state.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated ){
      return navigate('/')
    }
  }, [isAuthenticated])
    

  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Login'}/>
    <LoginForm/>
    </>
  )
}

export default Login