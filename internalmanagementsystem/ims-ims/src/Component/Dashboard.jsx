import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFolder, FiMapPin, FiTrendingUp, FiFileText } from "react-icons/fi";
import apiClient from "../api/api";
import "./Dashboard.css";

const Dashboard = () => {
    const location = useLocation();
    const [invoiceCount, setInvoiceCount] = useState(0);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await apiClient.get("/api/invoice");

                // ✅ Save in localStorage
                localStorage.setItem("invoices", JSON.stringify(res.data));

                // ✅ Set count
                setInvoiceCount(res.data.length);

            } catch (err) {
                console.error("Error fetching invoices", err);

                // fallback from localStorage
                const stored = JSON.parse(localStorage.getItem("invoices") || "[]");
                setInvoiceCount(stored.length);
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div className="dashboard dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h3 className="dash-title">Main Menu</h3>
                </div>

                <ul className="dash-menu">
                    <li>
                        <Link to="/home" className={location.pathname === "/home" || location.pathname === "/" ? "active" : ""}>
                            <span className="dash-item-badge-wrap">
                                <FiHome className="dash-icon" />
                                <span>Home</span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/groups" className={location.pathname === "/groups" ? "active" : ""}>
                            <span className="dash-item-badge-wrap">
                                <FiFolder className="dash-icon" />
                                <span>Groups</span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/getsubid" className={location.pathname === "/getsubid" ? "active" : ""}>
                            <span className="dash-item-badge-wrap">
                                <FiMapPin className="dash-icon" />
                                <span>Subzones</span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/estimate" className={location.pathname === "/estimate" ? "active" : ""}>
                            <span className="dash-item-badge-wrap">
                                <FiTrendingUp className="dash-icon" />
                                <span>Estimates</span>
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/invoice"
                            className={location.pathname === "/invoice" ? "active" : ""}
                        >
                            <span className="dash-item-badge-wrap">
                                <FiFileText className="dash-icon" />
                                <span>Invoices</span>
                            </span>
                            {invoiceCount > 0 && (
                                <span className="dash-badge">{invoiceCount}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
//cd "g:\internalManagementSystemupdate\InternalManagementSystemBackend"
//.\mvnw spring-boot:run

//cd "g:\internalManagementSystemupdate\internalmanagementsystem\ims-ims"
//npm run dev

//https://github.com/KailasYeote/InternalManagementSystem.git

//postgresql://my_db_jc05_user:NzZOCCN0ItHYgkWZTOawQYBq1pIb2acA@dpg-d76lsg0ule4c73f1ouo0-a/my_db_jc05



export default Dashboard;