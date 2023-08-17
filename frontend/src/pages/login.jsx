import "./login.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/login", {
                email: email,
                password: password
            })
            alert("Login successful!");
        } catch (err) {
            alert("Login failed!");
            console.log(err);
        }
    }


    return (
        <div className="login-div">
            <h1 className="login-h1">Login</h1>
            <form className="login-form" onSubmit={loginUser}>
                <input type="email" placeholder="your@email.com" className="login-bar"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" className="login-bar"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="login-bar login-submit">Login</button>
            </form>
            <div className="login-text">Don't have an account yet? <Link to={"/signup"}>Register now</Link></div>
        </div>
    );
}