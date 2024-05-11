import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const history = useNavigate();

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
                const response = await axios.post("http://localhost:8080/admin/login", {
                    username,
                    password,
                });

                if (!response.data.token) {
                    alert("Error, Please try Again");
                    return;
                }

                // Save token to local storage
                localStorage.setItem("Admintoken", response.data.token);

                // Redirect to home route
                history("/adminpanel");
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