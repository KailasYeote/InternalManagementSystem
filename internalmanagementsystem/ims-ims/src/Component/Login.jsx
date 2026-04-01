import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        e.preventDefault();

        if (!user.username || !user.password) {
            alert("All fields required");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, user);

            if (res.data === "Login Success") {

                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("username", user.username);

                // ✅ ATTENDANCE LOGIC (FINAL) - Persistent User Integer Counter
                const userAttKey = `attendance_${user.username}`;
                let currentAttendance = parseInt(localStorage.getItem(userAttKey)) || 0;
                currentAttendance += 1;

                // Save it persistently for the user, and also save a quick-read key for the active session
                localStorage.setItem(userAttKey, currentAttendance);
                localStorage.setItem("active_attendance", currentAttendance);

                navigate("/home");
            } else {
                alert(res.data);
            }

        } catch (err) {
            alert("Server error");
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <form onSubmit={loginUser}>
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

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;