import React from 'react'
import BlogContainer from '../components/BlogContainer'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const Blog = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Blog'}/>
    <BlogContainer/>
    </>
  )
}

export default Blog