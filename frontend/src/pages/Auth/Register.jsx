import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/authstyles.css"
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import axios from "axios";


const Register = () => {
   
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [answer,setAnswer] = useState("")
    // navigate hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
          e.preventDefault();
          try{
           
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth`,{
                name,email,password,phone,address,answer
            });


            if(res && res.data.success){
                
                setTimeout(()=>{  
                    toast.success(res.data.message)
                },800);
                
                navigate("/login");
            }else{
                toast.error(res.data.message)
            }

          } catch(err){
             console.log(err);
             toast.error("Something went wrong")
          }
       
    }

  return (
    <Layout title="Register Shopping Ninja">
        <div className="form-container" style={{ minHeight:"90vh" }}>

        <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="exampleInputEmail1"
              placeholder="What is Your favourite sport Name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
        </div>
    </Layout>
  )
}

export default Register