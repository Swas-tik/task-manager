import React, { useState } from "react";
import "./auth.css";
import { userSignup } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setUser([...user, {username, email, password}])

    setUsername("");
    setEmail("");
    setPassword("");

    const usersData = { id: crypto.randomUUID(), username, email, password };
    // Get existing users
    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.username === usersData.username
    );

    if (userExists) {
      alert("Username already exists! Please choose a different one.");
    } else {
      dispatch(userSignup(usersData));
      alert("Signup successful! Please log in.");
      navigate("/"); // Redirect to login page
    }
  };

  return (
    <div className="signup-container">
      <h1>Register</h1>

      <form className="signup-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
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
        <button type="Signup" onClick={handleSubmit}>
          Sign In
        </button>
        <p>Already Registered ? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
