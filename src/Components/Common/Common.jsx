import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Common = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Common;