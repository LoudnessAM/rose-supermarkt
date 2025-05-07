import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BsCart3, BsGrid } from 'react-icons/bs';
import logo from '../assets/final_logo_rose.jpg';
import '../App.css';
import { API_BASE_URL } from '../config'; // 👈 eingebunden für spätere API-Nutzung

function Navigation() {
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItems(itemCount);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, [location]);

  return (
    <Navbar expand="lg" className="navbar shadow-sm py-3" sticky="top">
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Rose Supermarkt Logo"
            height="60"
            className="me-3 rounded"
            style={{
              backgroundColor: '#fff',
              padding: '6px',
              borderRadius: '12px',
              border: '2px solid #b71c1c'
            }}
          />
          <div>
            <div className="rose-brand-text">Herzlich Willkommen!</div>
            <div className="rose-brand-subtext">خوش آمدید</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/produkte" className="d-flex align-items-center mx-3">
              <BsGrid className="me-2" />
              Produkte
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center mx-3 position-relative">
              <BsCart3 className="me-2" />
              Warenkorb
              {cartItems > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute cart-badge"
                  style={{ top: '-5px', right: '-10px', fontSize: '0.65rem' }}
                >
                  {cartItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
