import React from 'react'
import BlogDetailContainer from '../components/BlogDetailContainer'
import RelatedBlogDetail from '../components/RelatedBlogDetail'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const BlogDetail = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Blog Detail'}/>
    <BlogDetailContainer/>
    <RelatedBlogDetail/>
    </>
  )
}

export default BlogDetail