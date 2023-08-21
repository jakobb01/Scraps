import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages-css/home.css";
import axios from "axios";

const Home = (params) => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const { token, setUurl, setUurlData } = params;

    const handleNavigation = (path) => {
        navigate(path);
    };

    async function sendUrl(ev) {
        ev.preventDefault();
	setIsLoading(true);
        try {
            await axios.post("/search/safe", {
                uid: token,
                url: url
            }).then((res) => {
                setUurlData(res.data);
            });
            setUurl(url);
            handleNavigation("/search")
        } catch (err) {
            alert("Error sending URL! Please try again.")
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="home-container">
            <header>
                <h1>CHECK-THE-WEB</h1>
            </header>
	    {!isLoading &&
            <main>
                <div className="url-input-container">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="url-input"
                    />
                </div>
                <button onClick={sendUrl} className="go-button">
                GO
            </button>
            </main>
	    }
	    {isLoading && 
			    <main>
			    <h2>Loading...</h2>
			    </main>
	    }
        </div>
    );
};

export default Home;
