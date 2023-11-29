import { useEffect, useState } from "react";
import { Button } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // #pre filled for dev purpose

  const [email,setEmail] = useState("sanket@example.com")
  const [password,setPassword] = useState("qwerty")
  const {login,isAuthenticated} = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    if(email && password){
      login(email,password)
    }
  }

  useEffect(()=>{
    if(isAuthenticated) navigate("/app",{
      replace:true
    })
  },[isAuthenticated , navigate])
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Button type="primary">Login</Button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
