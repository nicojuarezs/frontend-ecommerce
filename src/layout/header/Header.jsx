import { NavLink } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/modal";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleShow() {
    setIsOpen(true);
  }

  const isAdmin = true;

  const { toggleSidebarOrder, count } = useOrder();

  return (
    <>
      <header>
        <nav className="header-nav">
          <NavLink to="/" className="nav-link">
            Principal
          </NavLink>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contacto
          </NavLink>
          <NavLink to="/about-us" className="nav-link">
            Acerca de
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Registro
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin-product" className="nav-link">
                Admin Product
              </NavLink>
              <NavLink to="/admin-user" className="nav-link">
                Admin User
              </NavLink>
            </>
          )}
        </nav>

        <div className="user-info">
          <div className={`user-cart-container ${count < 1 ? "" : 'show-circle'}`} data-count={count}>
            <FontAwesomeIcon className="user-cart" icon={faCartShopping}
            onClick={() => toggleSidebarOrder()}
            />

          <button className="nav-link" onClick={handleShow}>
          DIALOG
          </button>

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
