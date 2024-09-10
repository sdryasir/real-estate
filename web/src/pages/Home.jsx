import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import FeaturedProduct from '../components/FeaturedProduct'
import BlogSection from '../components/BlogSection'
import LatestProducts from '../components/LatestProducts'
import HeroBanner from '../components/HeroBanner'
const Home = () => {
  return (
    <>
      <HeroSection/>
      <div className="row mb-5">
            <div className="col-lg-9 container">
            <HeroBanner/>
            </div>
      </div>
      <Category/>
      <FeaturedProduct/>
      <LatestProducts/>
      <BlogSection/>
    </>
  )
}

export default Home
