import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import History from "./pages/history";
import Topurl from "./pages/topurls";
import Signup from "./pages/signup";
import Search from "./pages/search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element=<Home /> />
            <Route path="/login" element=<User /> />
            <Route path="/search" element=<Search /> />
            <Route path="/history" element=<History /> />
            <Route path="/topurls" element=<Topurl /> />
            <Route path="/signup" element=<Signup /> />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
