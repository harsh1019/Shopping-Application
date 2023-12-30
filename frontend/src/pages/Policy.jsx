import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={'Privacy-Policy'}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
    

Privacy Policy for <b>Shoppingninja</b>
<br/>

We appreciate your visit to <b>Shoppingninja</b>. This Privacy Policy aims to clarify how we handle your information. By using our website, you agree to the terms outlined below.
We collect personal data like your name and email when you register or make a purchase. Additionally, we gather device information and usage patterns through cookies and similar technologies.
We use your data to provide services, communicate important updates, and enhance our website through analytics.
Your data may be shared with trusted third-party service providers to assist us. We may also disclose information for legal compliance.
We take reasonable steps to protect your data, but no method is 100% secure.
You can update or delete your account information and opt-out of communications.
For questions, contact us at <b>Shoppingninjawork@gmail.com</b>

          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy