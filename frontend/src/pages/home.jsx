import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Header from "../header";
import axios from "axios";
import Search from "./search";

const Home = () => {
    const [url, setUrl] = useState("");
    const [send, setRes] = useState({});
    const navigate = useNavigate();

    async function sendUrl(ev) {
        ev.preventDefault();
        try {
            await axios.post("/search/safe", {
                url: url
            }).then((res) => {
                console.log(res);
                setRes(res);
                Search.getData(res);
            });
            navigate("/search", {send});
        } catch (err) {
            alert("Error sending URL! Please try again.")
            console.error(err);
        }

    }

    return (
        <div className="home-container">
            <header>
                <h1>CHECK-THE-WEB</h1>
            </header>
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
        </div>
    );
};

export default Home;
