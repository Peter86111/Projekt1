import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ProductSinglePage from './components/ProductSinglePage';
import Production from './components/Production';
import Registration from './components/Registration';
import Cart from './components/Cart';
import NavbarWithCart from './components/NavbarWithCart'; // ÚJ!
import kando from './kando.jpg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';

function App() {
  const { user, isAdmin } = useAuth();
  const { timeLeft } = useAuth();

  return (
    <Router>
      <CartProvider>
        <NavbarWithCart user={user} isAdmin={isAdmin} timeLeft={timeLeft} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/termekek" element={<Production />} />
          <Route path="/product/:productId" element={<ProductSinglePage />} />
          <Route path="/szolgaltatasok" element={<Services />} />
          <Route path="/rolunk" element={<AboutUs />} />
          <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

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
                  <li><a href="https://github.com/Peter86111/Projekt1.git" target='blank'><i className="bi bi-github"></i> Github</a></li>
                  <li><a href="/">Papp Patrícia & Molnár Péter</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Kapcsolódó linkek</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/kandomiskolc/reels/" target='blank'>
                    <img className='img-social-kando' src={kando} width="50" height="50" alt="Kando Facebook" />
                  </a>
                </div>
              </div>
            </div>
            <div className='jog'>
              <p>© Minden jog fenntartva</p>
            </div>
          </div>
        </footer>
      </CartProvider>
    </Router>
  );
}

export default App;