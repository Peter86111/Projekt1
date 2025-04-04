import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";
import logo from "../mr_q_mod.png";

const NavbarWithCart = ({ user, isAdmin, timeLeft }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="container-fluid">
      <Navbar.Brand href="/">
        <img src={logo} width="238" height="100" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/termekek">Termékek</Nav.Link>
          <Nav.Link href="/szolgaltatasok">Szolgáltatások</Nav.Link>
          <Nav.Link href="/rolunk">Rólunk</Nav.Link>
          {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
          <Nav.Link href="/registration">Regisztráció</Nav.Link>
          <Nav.Link href="/login">Bejelentkezés</Nav.Link>
          {user && <Nav.Link href="/logout">Kijelentkezés</Nav.Link>}
          {user && (
            <Nav.Link disabled className="text-light">
              Üdv, {jwtDecode(localStorage.getItem("jwt")).name}<br />
              {jwtDecode(localStorage.getItem("jwt")).role}!
            </Nav.Link>
          )}
          {user && (
            <Nav.Link disabled className="text-warning">
              Inaktivitási idő: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </Nav.Link>
          )}
          <Nav.Link className="topnav-basket d-flex align-items-center gap-2 text-light" href="/cart">
            <i className="bi bi-basket-fill fs-5"></i>
            Kosár ({cartItemCount})
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarWithCart;