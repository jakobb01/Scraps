import Header from "./header";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className="layout-div">
            <Header />
            <Outlet />
        </div>
    );
}