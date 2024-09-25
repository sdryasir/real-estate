import React, { useEffect } from 'react'
import CheckoutContainer from '../components/CheckoutContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Checkout = () => {
  const {isAuthenticated} = useSelector(state=>state.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuthenticated){
      return navigate('/login')
    }
  }, [isAuthenticated])
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Checkout'}/>
    <CheckoutContainer/>
    </>
  )
}

export default Checkout