import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";
import logo from "../mr_q_mod.png";

const NavbarWithCart = ({ user, isAdmin, timeLeft }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="container-fluid shadow-sm py-3 px-4">
      <Navbar.Brand href="/">
        <img src={logo} width="238" height="100" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between w-100">

        {/* KÖZÉPRE IGAZÍTOTT MENÜPONTOK */}
        <Nav className="mx-auto gap-3 main-menu custom-nav">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/termekek">Termékek</Nav.Link>
          <Nav.Link href="/szolgaltatasok">Szolgáltatások</Nav.Link>
          <Nav.Link href="/rolunk">Rólunk</Nav.Link>
          {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
        </Nav>

        {/* JOBB OLDAL: Regisztráció/Login/Kijelentkezés/Kosár */}
        <Nav className="ms-auto gap-3 align-items-center">
        {!user && <Nav.Link href="/registration" className="auth-link">Regisztráció</Nav.Link>}
        {!user && <Nav.Link href="/login" className="auth-link">Bejelentkezés</Nav.Link>}
        {user && <Nav.Link href="/logout" className="auth-link">Kijelentkezés</Nav.Link>}

          {user && (
            <Nav.Link disabled className="text-light user-info">
              Üdv, {jwtDecode(localStorage.getItem("jwt")).name}<br />
              {jwtDecode(localStorage.getItem("jwt")).role}!
            </Nav.Link>
          )}

          {user && (
            <Nav.Link disabled className="text-warning small">
              ⏳ {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </Nav.Link>
          )}

          <Nav.Link className="topnav-basket position-relative text-light cart-link" href="/cart">
            <i className="bi bi-basket-fill fs-5"></i>
            <span className="ms-1">Kosár</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarWithCart;