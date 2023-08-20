import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import History from "./pages/history";
import Topurl from "./pages/topurls";
import Signup from "./pages/signup";
import Search from "./pages/search";
import Layout from "./layout";
import axios from "axios";
import Short from "./pages/short";
import {useState} from "react";

axios.defaults.baseURL = "http://88.200.63.148:5053";

function App() {
    const [token, setToken] = useState(null);
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element=<Home /> />
                    <Route path="/login" element=<Login token={token} setToken={setToken} /> />
                    <Route path="/search" element=<Search token={token} setToken={setToken} /> />
                    <Route path="/history" element=<History token={token} /> />
                    <Route path="/topurls" element=<Topurl /> />
                    <Route path="/signup" element=<Signup /> />
                    <Route path="/short" element=<Short token={token} /> />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
