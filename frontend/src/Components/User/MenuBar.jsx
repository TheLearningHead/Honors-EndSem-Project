import { Outlet } from "react-router-dom";

function MenuBar() {
    return (
        <>
            <Outlet />
            <div>MenuBar</div>;
        </>
    );
}

export default MenuBar;