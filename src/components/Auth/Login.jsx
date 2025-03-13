import React, { useEffect, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.auth.user)

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  }, [user, navigate])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = { id: crypto.randomUUID(), email, password };
    dispatch(userLogin(userdata));

    setEmail("");
    setPassword("");
  };
  

  return (
    <div className="login-container">
      
      <h1>Login</h1>
      <form className="login-form">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <p>
          Don't have an Account? <Link to="/signup">Register Now!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
