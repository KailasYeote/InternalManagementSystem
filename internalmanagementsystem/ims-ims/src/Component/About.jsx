import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-card">
                <h1 className="about-title">About Inventory Management System</h1>

                <p className="about-description">
                    Inventory Management System (IMS) is a powerful and efficient web-based
                    application designed to simplify and automate inventory operations.
                    It helps businesses manage products, clients, brands, chains, and
                    subzones in an organized and structured manner.
                </p>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide a reliable and scalable inventory solution
                        that reduces manual errors, improves efficiency, and ensures
                        real-time tracking of inventory data.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Dashboard Overview</li>
                        <li>Client Management</li>
                        <li>Group & Chain Management</li>
                        <li>Brand Management</li>
                        <li>Subzone Tracking</li>
                        <li>Estimate Generation</li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2>Technology Stack</h2>
                    <ul>
                        <li>Frontend: React.js</li>
                        <li>Backend: Node.js</li>
                        <li>Database: MySQL</li>
                        <li>Routing: React Router</li>
                    </ul>
                </div>

                <div className="about-footer">
                    <p>© 2026 IMS Project | Developed for efficient inventory handling</p>
                </div>
            </div>
        </div>
    );
};

export default About;