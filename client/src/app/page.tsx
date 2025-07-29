import React from "react";
import ContactForm from "./contact/contact";
import FAQPage from "./faq/faq";
import Hero from "./hero/hero";
import FeaturedProducts from "./product/FeaturedProducts";
import About from "./about/about";
import Review from "./review/review";

const page = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="products">
        <FeaturedProducts />
      </section>

      <section id="about">
        <About />
      </section>

      <Review />

      <section id="faq">
        <FAQPage />
      </section>

      <section id="contact">
        <ContactForm />
      </section>
    </>
  );
};

export default page;
