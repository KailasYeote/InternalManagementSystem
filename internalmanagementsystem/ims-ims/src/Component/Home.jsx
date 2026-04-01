import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const [attendanceCount, setAttendanceCount] = useState(0);
    const [invoiceCount, setInvoiceCount] = useState(0);
    const [currentTime, setCurrentTime] = useState("");

    const username = localStorage.getItem("username") || "User";
    const groupName = localStorage.getItem("groupName") || "No Group";

    // ✅ Navigate to group page
    const handleCreateGroup = () => {
        navigate("/groups");
    };

    // ✅ Avatar initials
    const initials = username
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    useEffect(() => {
        const attendance = parseInt(localStorage.getItem("active_attendance")) || 0;
        setAttendanceCount(attendance);

        const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
        setInvoiceCount(invoices.length);

        // ✅ Live clock
        const tick = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            );
        };

        tick();
        const id = setInterval(tick, 30000);

        return () => clearInterval(id);
    }, []);

    // ✅ Greeting logic
    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="home-container">
            <div className="home-card">

                {/* Header */}
                <div className="home-header">
                    <div>
                        <p className="welcome-label">{greeting()}</p>
                        <h2 className="welcome-name">{username}</h2>
                    </div>
                    <div className="avatar">{initials}</div>
                </div>

                {/* Group Section */}
                <div className="group-row">
                    <div className="group-info">
                        <div className="group-icon">📁</div>
                        <div>
                            <p className="group-label">Active Group</p>
                            <p className="group-name">{groupName}</p>
                        </div>
                    </div>

                    <button className="create-btn" onClick={handleCreateGroup}>
                        ➕ Create Group
                    </button>
                </div>

                {/* Stats */}
                <div className="stats">

                    <div className="stat-card blue">
                        <div className="stat-icon">📅</div>
                        <h3>{attendanceCount}</h3>
                        <p>Total Attendance</p>
                    </div>

                    <div 
                        className="stat-card purple" 
                        onClick={() => navigate("/invoice")} 
                        style={{ cursor: "pointer" }}
                    >
                        <div className="stat-icon">📄</div>
                        <h3>{invoiceCount}</h3>
                        <p>Total Invoices</p>
                    </div>

                </div>

                {/* Footer */}
                <div className="home-footer">
                    <span>🟢 System Active</span>
                    <span>{currentTime}</span>
                </div>

            </div>
        </div>
    );
};

export default Home;