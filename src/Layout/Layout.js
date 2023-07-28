import { Outlet } from "react-router-dom";

import TopNavigationBar from "../components/TopNavigationBar";


const style = {
    container: {
        maxWidth: "1140px",
        margin: "auto"
    }
};

const Layout = () => {
    return (
        <>
            <TopNavigationBar />
            <div style={style.container}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;