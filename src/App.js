import logo from './mr_q_mod.png';
import basket from './cart.svg';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
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
                    <Nav.Link href="#loginIn">
                        Bejelentkezés
                    </Nav.Link>
                    <Nav.Link href="#shoppingBasket"> 
                        <img src={basket} width="40" height="40" alt="basket"/>
                        {/* Kosár */}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default App;