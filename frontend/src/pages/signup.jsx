import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const {navigate} = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/signup", {
                username: username,
                email: email,
                password: password
            });
            alert("User registered successfully! Now you can login.");
            navigate("/login");
        } catch (err) {
            alert("Error registering user! Please try again.")
            console.error(err);
        }

    }

    return (
        <div className="login-div">
            <h1 className="login-h1">Sign Up</h1>
            <form className="login-form" onSubmit={registerUser}>
                <input type="username" placeholder="username" className="login-bar"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="your@email.com" className="login-bar"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" className="login-bar"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="login-bar login-submit">Sign Up</button>
            </form>
            <div className="login-text">Already have an account? <Link to={"/login"}>Login</Link></div>
        </div>
    );
}

export default Signup;