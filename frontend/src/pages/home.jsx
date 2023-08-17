import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const [url, setUrl] = useState("");
    const history = useNavigate();

    const handleInputChange = (event) => {
        setUrl(event.target.value);
    };

    const handleGoClick = () => {
        // Handle the URL submission logic here
        handleNavigation("/search")
    };

    const handleNavigation = (path) => {
        history(path);
    };

    return (
        <div className="home-container">
            <nav>
                <button onClick={() => handleNavigation("/topurls")} className="nav-button">Top URL's</button>
                <button onClick={() => handleNavigation("/history")} className="nav-button">History</button>
                <button onClick={() => handleNavigation("/login")} className="nav-button">Login/Logout</button>
            </nav>
            <header>
                <h1>CHECK-THE-WEB</h1>
            </header>
            <main>
                <div className="url-input-container">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={handleInputChange}
                        className="url-input"
                    />
                </div>
                <button onClick={handleGoClick} className="go-button">
                GO
            </button>
            </main>
        </div>
    );
};

export default Home;
