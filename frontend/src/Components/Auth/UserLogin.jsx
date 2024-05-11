import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        const response = await axios.post("http://localhost:8080/user/login", {
          username,
          password,
        });

        if (!response.data.token) {
          alert("Error, Please try Again");
          return;
        }

        // Save token to local storage
        localStorage.setItem("token", response.data.token);

        // Redirect to home route
        history("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      // Handle validation errors
      console.log("Please provide all required fields.");
    }
  };

  return (
    <div className="Loginform">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="off"
        />
        <label htmlFor="password">Password:</label>
        <div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
          />
          <i
            className={`fa-solid ${
              isPasswordVisible ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <button type="submit" className="button2">
          Submit
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="link" to="/user/signup">
          Sign Up
        </Link>
      </p>
      <p>
        Are You Admin?{" "}
        <Link className="link" to="/admin/login">
          AdminLogin
        </Link>
      </p>
    </div>
  );
}
export default UserLogin;
