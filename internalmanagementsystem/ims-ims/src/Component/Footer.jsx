import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-left">
                    <h3>IMS Dashboard</h3>
                    <p>Internal Management System ....</p>
                </div>

                <div className="footer-center">
                    <p>© 2026 IMS - Internal Management System</p>
                    <p>All Rights Reserved.</p>
                </div>

                <div className="footer-right">
                    <p>Version 1.0.0</p>
                    <p>Developed by Kailas</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;