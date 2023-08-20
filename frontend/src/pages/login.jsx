import "./login.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import '../config';
import App from "../App";

export default function Login(params) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { token, setToken } = params;

    async function loginUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/login", {
                email: email,
                password: password
            }).then((res) => {
                try {
                    if (res) {
                        if (token === res.data) {
                            alert("You are already logged in!");
                        } else {
                            setToken(res.data);
                            alert("Login successful!");
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
	    setToken(null);
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
