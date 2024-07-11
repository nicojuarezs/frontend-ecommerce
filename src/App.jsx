import "./App.css";
import Footer from "./layout/footer/Footer";
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import AdminProduct from "./pages/admin-product/AdminProduct";

import ProductDetail from "./pages/product-detail/ProductDetail";

import { Route, Routes } from "react-router-dom";
import AdminGuard from "./services/guard/AdminGuard";
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import AboutUs from "./pages/about-us/AboutUs";
import AdminUser from "./pages/admin-user/AdminUser";
import NotFound from "./pages/not-found/NotFound";
import OrderSidebar from "./layout/order-sidebar/OrderSidebar";

function App() {
  return (
    <>
      <Header />
      <OrderSidebar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Ruta con params */}
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          {/* Rutas protegidas */}
          <Route
            path="/admin-product"
            element={
              <AdminGuard>
                {/* Componente hijo: children */}
                <AdminProduct />
              </AdminGuard>
            }
          />
          <Route
            path="/admin-user"
            element={
              <AdminGuard>
                <AdminUser />
              </AdminGuard>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
