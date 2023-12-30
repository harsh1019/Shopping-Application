import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us-shopping ninja"} >
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{width:"75%"}}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <i style={{fontFamily:"sans-serif"}}>"Welcome to ShoppingNinja, where seamless online shopping meets cutting-edge technology! I'm Harshvardhan Choudhary, the visionary behind this platform. As a final-year computer science student at IIT ISM Dhanbad, my passion for innovation and e-commerce has driven me to create a unique and user-friendly shopping experience for our customers.
At ShoppingNinja, we believe in the power of simplicity and efficiency. Our platform is meticulously designed to provide you with a hassle-free journey through a vast array of products. Whether you're a tech enthusiast, a fashionista, or someone seeking everyday essentials, we've curated a diverse collection to cater to your needs".</i>

          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About