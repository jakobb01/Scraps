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

axios.defaults.baseURL = "http://localhost:5054";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route index element=<Home /> />
                <Route path="/login" element=<Login /> />
                <Route path="/search" element=<Search /> />
                <Route path="/history" element=<History /> />
                <Route path="/topurls" element=<Topurl /> />
                <Route path="/signup" element=<Signup /> />
            </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
