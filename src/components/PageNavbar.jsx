import React from 'react';
import basket from './mr_q_mod.png';
import logo from './cart.svg';
import { Navbar, Nav } from 'react-bootstrap';

function PageNavbar() {
  return (
    <div>
    <Navbar bg="dark" expand="lg"
      variant="dark"
      className="container-fluid">
      <Navbar.Brand href="#home">
        <img src={logo}
          width="238" height="100"
          alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#registration">
            Regisztráció
          </Nav.Link>
          <Nav.Link href="#login">
            <form>
              <div className="form-row align-items-center">
                <div className="col-auto">
                  <label className="sr-only" htmlFor="inlineFormInput">Felhasználónév</label>
                  <input type="text" className="form-control" id="inlineFormInput" placeholder="Username" />
                </div>
                <div className="col-auto">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">Jelszó</label>
                  <div className="input-group sm-1">
                    <div className="input-group-prepend">
                    </div>
                    <input type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" />
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check sm-1">
                    <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                    <label className="form-check-label" htmlFor="autoSizingCheck">
                      Emlékezz rá
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-2">Bejelentkezés</button>
                </div>
              </div>
            </form>
            {/* Bejelentkezés */}
          </Nav.Link>
          <Nav.Link href="#shoppingBasket">
            <img src={basket} width="40" height="40" alt="basket" />
            {/* Kosár */}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default PageNavbar;