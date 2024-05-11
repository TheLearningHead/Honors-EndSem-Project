import { Link, Outlet, useLocation } from "react-router-dom";

function AdminPanel() {
    const loc = useLocation();
    const token = localStorage.getItem("Admintoken");

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("Admintoken");
        // Refresh the page
        window.location.reload();
    };

    return (
        <>
            <nav>
                Blogs
                {token ? (
                    <Link onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to={"/user/login"}>Login</Link>
                )}
            </nav>

            <Outlet />
            <div id="adminpanel">
                <Link
                    to={`/adminpanel`}
                    className={loc.pathname === "/adminpanel" ? "active" : ""}
                >
                    <i className="fa-solid fa-users"></i> User Management
                </Link>
                <Link
                    to={`post-management`}
                    className={
                        loc.pathname === "/adminpanel/post-management" ? "active" : ""
                    }
                >
                    <i className="fa-solid fa-photo-film"></i> Post Management
                </Link>
            </div>
        </>
    );
}

export default AdminPanel;