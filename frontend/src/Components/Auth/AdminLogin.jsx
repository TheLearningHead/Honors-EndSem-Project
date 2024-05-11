import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            // Handle form submission logic here
            console.log("Form submitted:", { username, password });
        } else {
            // Handle validation errors
            console.log("Please provide all required fields.");
        }
    };

    return (
        <div className="Loginform">
            <h1>Admin Login</h1>
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
                        className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                            }`}
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                <button type="submit" className="button2">
                    Submit
                </button>
            </form>
            <p>
                Are You User?{" "}
                <Link className="link" to="/user/login">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default AdminLogin;