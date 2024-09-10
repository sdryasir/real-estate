import React from 'react'
import HeroSection from './HeroSection'
import BreadcrumbSection from './Breadcrumb'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Login'}/>
    <LoginForm/>
    </>
  )
}

export default Login