import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/authstyles.css"
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth } from '../../context/Auth.js';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`,{
            email,password
            });


            if(res && res.data.success){
                
                setTimeout(()=>{  
                    toast.success(res.data.message)
                },800);

                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                })

                // now save this info in local storage, when you do referesh than also data 
                // remain in localstorage so we can fetch from there
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message)
            }

          } catch(err){
             console.log(err);
             toast.error("Something went wrong")
          }
    }

  return (
    <Layout title="Login Shopping Ninja">
        <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login