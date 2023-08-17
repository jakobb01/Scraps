import React from "react";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="home-container">
            <nav>
                <button onClick={() => handleNavigation("/")} className="nav-button">Search</button>
                <button onClick={() => handleNavigation("/topurls")} className="nav-button">Top URL's</button>
                <button onClick={() => handleNavigation("/history")} className="nav-button">History</button>
                <button onClick={() => handleNavigation("/login")} className="nav-button">Login/Logout</button>
            </nav>
        </div>

    );
}