import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserSignup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const history = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] =
    useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setIsConfirmedPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password !== "" &&
      name !== "" &&
      username !== "" &&
      password === confirmedPassword
    ) {
      try {
        const response = await axios.post("http://localhost:8080/user/signin", {
          name,
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
      // Handle validation errors or mismatched passwords
      alert("Please provide all required fields and ensure passwords match.");
    }
  };

  return (
    <div className="Loginform">
      <h1>SignUp Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
        />
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
        <label htmlFor="confirmedPassword">Confirm Password:</label>
        <div>
          <input
            type={isConfirmedPasswordVisible ? "text" : "password"}
            id="confirmedPassword"
            value={confirmedPassword}
            onChange={handleConfirmedPasswordChange}
            autoComplete="off"
          />
          <i
            className={`fa-solid ${
              isConfirmedPasswordVisible ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={toggleConfirmedPasswordVisibility}
          ></i>
        </div>
        <button type="submit" className="button2">
          Submit
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="link" to="/user/login">
          Login
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

export default UserSignup;
