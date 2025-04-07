// Component imports
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
import NavbarWithCart from './components/NavbarWithCart'; // Navigation bar with cart icon

// Static assets and styles
import kando from './kando.jpg';
import './App.css';

// React and routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { useAuth } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';

function App() {
  // Get user authentication info and role
  const { user, isAdmin } = useAuth();
  const { timeLeft } = useAuth();

  return (
    <Router>
      {/* Provide global cart state to the app */}
      <CartProvider>
        {/* Navigation bar component, receives user state and role */}
        <NavbarWithCart user={user} isAdmin={isAdmin} timeLeft={timeLeft} />

        {/* Route configuration */}
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

        {/* Footer section */}
        <footer className="footer bg-dark">
          <div className="footer-container">
            <div className="footer-row">
              {/* About Us links */}
              <div className="footer-col">
                <h4>Rólunk</h4>
                <ul>
                  <li><a href="/rolunk">Rólunk</a></li>
                  <li><a href="/szolgaltatasok">Szolgáltatásaink</a></li>
                </ul>
              </div>

              {/* Developer info */}
              <div className="footer-col">
                <h4>Fejlesztők</h4>
                <ul>
                  <li>
                    <a href="https://github.com/Peter86111/Projekt1.git" target='blank'>
                      <i className="bi bi-github"></i> Github
                    </a>
                  </li>
                  <li><a href="/">Papp Patrícia - Nagy Dávid - Molnár Péter</a></li>
                </ul>
              </div>

              {/* External link with logo */}
              <div className="footer-col">
                <h4>Hasznos linkek</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/kandomiskolc/reels/" target='blank'>
                    <img
                      className='img-social-kando'
                      src={kando}
                      width="50"
                      height="50"
                      alt="Kando Facebook"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer legal notice */}
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
