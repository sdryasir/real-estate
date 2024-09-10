import React from 'react'
import ShopContainer from '../components/ShopContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const ShopCart = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Shop Cart'}/>
    <ShopContainer/>
    </>
  )
}

export default ShopCart