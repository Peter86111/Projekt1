import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";
import logo from "../mr_q_mod.png";

const NavbarWithCart = ({ user, isAdmin, timeLeft }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="container-fluid shadow-sm py-3 px-3">
      <Navbar.Brand href="/">
        <img src={logo} width="200" height="80" alt="Logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">

        {/* CENTER MENU – Centered on large screens */}
        <Nav className="w-100 justify-content-center flex-wrap gap-3 custom-nav my-3 my-lg-0">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/termekek">Termékek</Nav.Link>
          <Nav.Link href="/szolgaltatasok">Szolgáltatások</Nav.Link>
          <Nav.Link href="/rolunk">Rólunk</Nav.Link>
          {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
        </Nav>

        {/* RIGHT SIDE */}
        <Nav className="d-flex flex-column flex-lg-row align-items-center text-center gap-3">
          {!user && <Nav.Link href="/registration" className="auth-link">Regisztráció</Nav.Link>}
          {!user && <Nav.Link href="/login" className="auth-link">Bejelentkezés</Nav.Link>}
          {user && <Nav.Link href="/logout" className="auth-link">Kijelentkezés</Nav.Link>}

          {/* User welcome and role display */}
          {user && (
            <Nav.Link disabled className="text-light user-info">
              Üdv, {jwtDecode(localStorage.getItem("jwt")).name}<br />
              {jwtDecode(localStorage.getItem("jwt")).role}!
            </Nav.Link>
          )}

          {/* Token expiration countdown */}
          {user && (
            <Nav.Link disabled className="text-warning small">
              ⏳ {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </Nav.Link>
          )}

          {/* Cart icon with item count badge */}
          <Nav.Link className="topnav-basket position-relative text-light cart-link" href="/cart">
            <i className="bi bi-basket-fill fs-5"></i>
            <span className="ms-1">Kosár</span>
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
              </span>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarWithCart;