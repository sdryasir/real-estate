import React from 'react'
import DetailContainer from '../components/DetailContainer'
import RelatedProductDetailContainer from '../components/RelatedProductDetailContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const ShopDetails = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Shop Details'}/>
    <DetailContainer/>
    <RelatedProductDetailContainer/>
    </>
  )
}

export default ShopDetails