import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login'
import Logout from './components/Logout';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import logo from './mr_q_mod.png';
import basket from './cart.svg';
import kando from './kando.jpg';
import { Navbar, Nav } from 'react-bootstrap';
import "./App.css";
import Production from './components/Production';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './components/Registration';
import { useAuth } from "./context/AuthContext";
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const { user, isAdmin } = useAuth();
  const { timeLeft } = useAuth();

  return (
    <Router>
      <CartProvider>
      {/* Felső navbar */}
      <Navbar bg="dark" expand="lg" variant="dark" className="container-fluid">
        <Navbar.Brand href="/">
          <img src={logo} width="238" height="100" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* Fő navigációs linkek */}
            <Nav.Link href="/">Home</Nav.Link>            
            <Nav.Link href="/termekek">Termékek</Nav.Link>
            <Nav.Link href="/szolgaltatasok">Szolgáltatások</Nav.Link>
            <Nav.Link href="/rolunk">Rólunk</Nav.Link>
            {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
            <Nav.Link href="/registration">Regisztráció</Nav.Link>
            <Nav.Link href="/login">Bejelentkezés</Nav.Link>
            {user && <Nav.Link href="/logout">Kijelentkezés</Nav.Link>}
            {user && <Nav.Link disabled className="text-light">Üdv {user.user}!</Nav.Link>}
            {user && (
              <Nav.Link disabled className="text-warning">
                Inaktivitási idő: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </Nav.Link>
            )}
            <Nav.Link className='topnav-basket' href="/cart">
              <i className="bi bi-cart3 fs-2"></i> 
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Útvonalak (oldalak) */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />  {/* Kosár oldal */}
        <Route path="/termekek" element={<Production />} />
        <Route path="/szolgaltatasok" element={<Services />} />
        <Route path="/rolunk" element={<AboutUs />} />
        <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* Lábléc */}
      <Nav className="bg-dark">
          <footer className="footer bg-dark">
            <div className="footer-container">
              <div className="footer-row">
                <div className="footer-col">
                  <h4>Rólunk</h4>
                  <ul>
                    <li><a href="/rolunk">Rólunk</a></li>
                    <li><a href="/szolgaltatasok">Szolgáltatásaink</a></li>
                  
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Készítők</h4>
                  <ul>
                  <li><a href="https://github.com/Peter86111/Projekt1.git"> <i class="bi bi-github"></i> Github</a></li>
                  <li><a href="/">Molnár Péter és Papp Patrícia</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>Kapcsolódó linkek</h4>
                  <div className="social-links">
                    <a href="https://www.facebook.com/kandomiskolc/reels/" target='blank'>
                      <img className='img-social-kando' src={kando} width="50" height="50" />
                    </a>
                  </div>
                </div>
              </div>
              <div className='jog'>
                <p>© Minden jog fenntartva</p>
              </div>
            </div>
          </footer>
        </Nav>
      </CartProvider>
    </Router>
  );
}

export default App;