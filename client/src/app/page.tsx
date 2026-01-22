import React from "react";
import ContactForm from "./contact/contact";
import FAQPage from "./faq/faq";
import Hero from "./hero/hero";
import NumberedProducts from "./product/NumberedProducts";
import FeaturedProducts from "./product/FeaturedProducts";
import About from "./about/about";
import Review from "./review/review";
import Ritual from "./ritual/Ritual";

const page = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <div className="bg-[#f3f2ec] px-6">
        <div className="max-w-7xl mx-auto py-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2a2927]/25 to-transparent" />
        </div>
      </div>

      <Ritual />

      <NumberedProducts />

      <section id="products">
        <FeaturedProducts />
      </section>

      <section id="about">
        <About />
      </section>

      <Review />

      <div className="bg-[#f3f2ec] px-6">
        <div className="max-w-7xl mx-auto py-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2a2927]/25 to-transparent" />
        </div>
      </div>

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
