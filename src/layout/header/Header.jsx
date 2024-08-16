import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/modal";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const { toggleSidebarOrder, count } = useOrder();

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <header>
        <nav className="header-nav">
          <NavLink to="/" className="nav-link">Principal</NavLink>
          {!user ? (
            <NavLink className="nav-link" to="/login">Login</NavLink>
          ) : (
            <button className="nav-link logout-button" onClick={logout}>Logout</button>
          )}
          <NavLink to="/contact" className="nav-link">Contacto</NavLink>
          <NavLink to="/about-us" className="nav-link">Acerca de</NavLink>
          <NavLink to="/register" className="nav-link">Registro</NavLink>

          {user && user.role === "ADMIN_ROLE" && (
            <>
              <NavLink to="/admin-product" className="nav-link">Admin Product</NavLink>
              <NavLink to="/admin-user" className="nav-link">Admin User</NavLink>
            </>
          )}
        </nav>

        <div className="user-info">
          <div className={`user-cart-container ${count < 1 ? "" : 'show-circle'}`} data-count={count}>
            <FontAwesomeIcon className="user-cart" icon={faCartShopping} onClick={toggleSidebarOrder} />
          </div>
        </div>
      </header>

      <Modal title="Login" isOpen={isOpen} handleClose={handleClose}>
        <>
          <h3>Login</h3>
          <hr />
          <p>Contenido del modal de login.</p>
        </>
      </Modal>
    </>
  );
}
