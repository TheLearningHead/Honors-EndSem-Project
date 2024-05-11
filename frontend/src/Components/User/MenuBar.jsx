import { Link, Outlet, useLocation } from "react-router-dom";

function MenuBar() {
    const loc = useLocation();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        // Refresh the page
        window.location.reload();
    };

    return (
        <>
            <nav>
                Movie Reviews
                {token ? (
                    <Link onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to={"/user/login"}>Login</Link>
                )}
            </nav>

            <Outlet />
            <div id="menubar">
                <Link to={``} className={loc.pathname === "/" ? "active" : ""}>
                    <i className="fa-solid fa-house"></i>
                </Link>
                <Link
                    to={token ? `postreview` : `/user/login`}
                    className={loc.pathname === "/postblog" ? "active" : ""}
                >
                    <i className="fa-solid fa-circle-plus"></i>
                </Link>
                <Link
                    to={token ? `profile` : `/user/login`}
                    className={loc.pathname === "/profile" ? "active" : ""}
                >
                    <i className="fa-solid fa-user"></i>
                </Link>
            </div>
        </>
    );
}

export default MenuBar;