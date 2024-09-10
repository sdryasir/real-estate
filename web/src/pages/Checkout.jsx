import React from 'react'
import CheckoutContainer from '../components/CheckoutContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const Checkout = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Checkout'}/>
    <CheckoutContainer/>
    </>
  )
}

export default Checkout