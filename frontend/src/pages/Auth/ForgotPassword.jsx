import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react';
import toast from 'react-hot-toast';
import "../../styles/authstyles.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/forgot-password`,{
                email,newPassword,answer,
            });

            if(res && res.data.success){
                setTimeout(()=>{  
                    toast.success(res.data && res.data.message)
                },800);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }

        }catch(err){
            console.log(err);
            toast.error("Something went wrong");
        }
   };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword