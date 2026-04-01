import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            alert("All fields required");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, user);
            alert(res.data);

            if (res.data === "User Registered Successfully") {
                navigate("/login");
            }

        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>

                <form onSubmit={registerUser}>
                    <input
                        name="username"
                        placeholder="Enter Username"
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />

                    <select name="role" onChange={handleChange}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <button type="submit">Create Account</button>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;