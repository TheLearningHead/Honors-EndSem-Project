import { Link, Outlet, useLocation } from "react-router-dom";

function MenuBar() {
    const loc = useLocation();
    return (
        <>
            <Outlet />
            <div id="menubar">
                <Link to={``} className={loc.pathname === "/" ? "active" : ""}>
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link
                    to={`postblog`}
                    className={loc.pathname === "/postblog" ? "active" : ""}
                >
                    <i className="fa-solid fa-circle-plus"></i>
                </Link>
                <Link
                    to={`profile`}
                    className={loc.pathname === "/profile" ? "active" : ""}
                >
                    <i className="fa-solid fa-user"></i>
                </Link>
            </div>
        </>
    );
}

export default MenuBar;