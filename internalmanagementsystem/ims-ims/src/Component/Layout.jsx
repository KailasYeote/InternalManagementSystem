import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import "./Layout.css";

const Layout = () => {
    return (
        <>
            <Header />

            <div className="main-container">
                <Dashboard />
                
                <div className="content">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Layout;