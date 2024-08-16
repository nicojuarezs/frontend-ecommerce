import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header"
import OrderSidebar from "./order-sidebar/OrderSidebar"

export default function Layout() {
    return (
        <>
        <Header />
        <OrderSidebar />
            <main className="main-container">
                <Outlet />
            </main>
        <Footer />
        </>
    );
}