import logo from './mr_q_mod.png';
import basket from './cart.svg';
import { Navbar, Nav } from 'react-bootstrap';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Production from './components/Production'

function App() {
    return (
        <>
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
                        <Nav.Link className='topnav-centered' href="#registration">
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
                        <Nav.Link className='topnav-centered' href="#shoppingBasket">
                            <img src={basket} width="40" height="40" alt="basket" />
                            {/* Kosár */}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="album py-5 bg-body-tertiary bg-dark">
                <div className="container-fluid bg-dark shadow-sm">
                    <Production />
                </div>
            </div>

            <footer className="text-body-secondary py-5 bg-dark shadow-sm">
                <div className="container">
                    <p className="float-end mb-1">
                        <a href="#end">Back to top</a>
                    </p>
                    <p className="mb-1">Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                    <p className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.</p>
                </div>
            </footer>
        </>

    );
}

export default App;