import React from 'react'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'
import RegisterForm from '../components/RegisterForm'
const Register = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Register'}/>
    <RegisterForm/>
    </>
  )
}

export default Register