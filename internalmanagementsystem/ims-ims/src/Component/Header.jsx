import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiPieChart, FiCalendar, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [attendanceCount, setAttendanceCount] = useState(0);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("active_attendance");
        setAttendanceCount(0);
        navigate("/login");
    };

    // ✅ ALWAYS refresh attendance when route changes
    useEffect(() => {
        const attendance = parseInt(localStorage.getItem("active_attendance")) || 0;
        setAttendanceCount(attendance);
    }, [location]);

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo-section">
                    <FiPieChart className="logo-icon" />
                    <h1 className="logo-title">IMS</h1>
                </div>

                <nav className="nav-links">
                    <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
                    <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
                    <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
                    
                    {/* ✅ Attendance Badge */}
                    <div className="attendance-indicator">
                        <FiCalendar className="icon-subtle" />
                        <span>Attendance</span>
                        {attendanceCount > 0 && (
                            <span className="attendance-badge">{attendanceCount}</span>
                        )}
                    </div>
                </nav>

                <div className="auth-section">
                    {isLoggedIn ? (
                        <div className="user-profile">
                            <div className="user-badge">
                                <FiUser />
                                <span className="username">{username}</span>
                            </div>
                            <button className="btn-logout" onClick={handleLogout}>
                                <FiLogOut />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button className="btn-login" onClick={handleLogin}>
                            <FiLogIn />
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;