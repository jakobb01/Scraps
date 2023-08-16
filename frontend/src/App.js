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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element=<Home /> />
            <Route path="/login" element=<User /> />
            <Route path="/history" element=<History /> />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
