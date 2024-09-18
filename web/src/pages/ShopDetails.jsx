import React from 'react'
import DetailContainer from '../components/DetailContainer'
import RelatedProductDetailContainer from '../components/RelatedProductDetailContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'
import { useParams } from 'react-router'
import { useGetProductByIdQuery } from '../redux/api/productApi'


const ShopDetails = () => {
  const {id} =useParams();

  const {data} = useGetProductByIdQuery(id);
  
  
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Shop Details'}/>
    <DetailContainer product={data?.product}/>
    </>
  )
}

export default ShopDetails