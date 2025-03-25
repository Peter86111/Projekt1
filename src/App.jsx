import AdminButton from './components/AdminButton';
import AdminDashboard from './components/AdminDashboard'; 
import CategoryMenu from './components/Search';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import logo from './mr_q_mod.png';
import basket from './cart.svg';
import kando from './kando.jpg';
import { Navbar, Nav, } from 'react-bootstrap';
import "./App.css";
import Production from './components/Production';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; ;


function App() {
    return (
   
<Router>
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
        {/* Main Navigation Links */}
        <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/termekek">Termékek</Nav.Link>
                <Nav.Link href="/szolgaltatasok">Szolgáltatások</Nav.Link>
                <Nav.Link href="/rolunk">Rólunk</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
        <Nav.Link className='topnav-registration' href="#registration">
            Regisztráció
        </Nav.Link>
        <Nav.Link href="#login">
            <form>
                <div className="form-row align-items-center">
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-auto">
                                {/* <label className="sr-only" htmlFor="inlineFormInput">Felhasználónév</label> */}
                                <input type="text" className="form-control" id="inlineFormInput" placeholder="Felhasználónév" />
                            </div>
                            <div className="col-auto">
                                {/* <label className="sr-only" htmlFor="inlineFormInputGroup">Jelszó</label> */}
                                <div className="input-group-prepend">
                                </div>
                                <input type="password" className="form-control" id="inlineFormInputGroup" placeholder="Jelszó" />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-2">Bejelentkezés</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* Bejelentkezés */}
        </Nav.Link>
        <Nav.Link className='topnav-basket' href="#shoppingBasket">
            <img src={basket} width="35" height="35" alt="basket" />
            {/* Kosár */}
        </Nav.Link>
        </Nav>
    </Navbar.Collapse>
</Navbar> 
{/* Routes Setup */}
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/termekek" element={<Production />} />
        <Route path="/szolgaltatasok" element={<Services />} />
        <Route path="/rolunk" element={<AboutUs />} />
        <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    
{/* CategoryMenu */}
<Nav className="bg-dark">

<footer className="footer bg-dark">
<div className="footer-container">
    <div className="footer-row">
        <div className="footer-col">
            <h4>Cégünkről</h4>
            <ul>
                <li><a href="#">Rólunk</a></li>
                <li><a href="#">Szolgáltatásaink</a></li>
                <li><a href="#">Adatvédelem</a></li>
                <li><a href="#">Partnerprogram</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>Segítség</h4>
            <ul>
                <li><a href="#">Gyakori kérdések</a></li>
                <li><a href="#">Szállítás</a></li>
                <li><a href="#">Visszatérítés</a></li>
                <li><a href="#">Rendelés állapota</a></li>
                <li><a href="#">Fizetési lehetőségek</a></li>
            </ul>
        </div>
        <div className="footer-col">
            <h4>Kövess minket</h4>
            <div className="social-links">
                <a href="https://www.facebook.com/kandomiskolc/reels/" target='blank'>
                    <img className='img-social-kando' src={kando}
                        width="50" height="50" />
                    <i className="fab fa-facebook-f"></i></a>
                {/* <a href="#"><i className="fab fa-twitter"></i></a> */}
                {/* <a href="#"><i className="fab fa-instagram"></i></a> */}
                {/* <a href="#"><i className="fab fa-linkedin-in"></i></a> */}
            </div>
        </div>
    </div>
    <div className='jog'>
        <p>© Minden jog fenntartva</p>
    </div>
</div>
</footer>

</Nav>
</Router>
);
}

export default App;