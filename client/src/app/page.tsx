import React from 'react'
import ContactForm from './contact/contact'
import FAQPage from './faq/faq'
import Hero from './hero/hero'
import Product from './components/products/product'

const page = () => {
  return (
    <>
    <Hero />
    <Product />
    <FAQPage />
    <ContactForm />
    </>

  )
}

export default page