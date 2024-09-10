import React from 'react'
import ContactSection from '../components/ContactSection'
import ContactMap from '../components/ContactMap'
import ContactForm from '../components/ContactForm'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'

const Contact = () => {
  return (
    <>
    <HeroSection/>
    <BreadcrumbSection pageName={'Contact'}/>
    <ContactSection/>
    <ContactMap/>
    <ContactForm/>
    </>
  )
}

export default Contact
