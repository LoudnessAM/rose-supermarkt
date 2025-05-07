import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Card, Row, Col } from 'react-bootstrap';
import { BsTrash, BsArrowLeft, BsCheck2Circle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    setTotal(sum);
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cart.find(p => p.id === id);
    if (item && newQuantity > item.stock) {
      alert(`Maximale verfügbare Menge: ${item.stock}`);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const completeOrder = () => {
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-5 shadow">
          <BsCheck2Circle size={80} className="text-success mx-auto mb-4" />
          <h2>Vielen Dank für Ihre Bestellung!</h2>
          <p className="mb-4">Die Bestellung wurde erfolgreich aufgenommen.</p>
          <Button as={Link} to="/" variant="primary" className="mt-3 mx-auto" style={{ maxWidth: '200px' }}>
            <BsArrowLeft className="me-2" />
            Zurück zum Shop
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Warenkorb</h1>

      {cart.length === 0 ? (
        <Card className="p-5 text-center shadow-sm">
          <h4>Dein Warenkorb ist leer</h4>
          <p className="text-muted">Füge Produkte hinzu, um sie hier zu sehen.</p>
          <Button as={Link} to="/" variant="primary" className="mt-3 mx-auto" style={{ maxWidth: '200px' }}>
            <BsArrowLeft className="me-2" />
            Zurück zum Shop
          </Button>
        </Card>
      ) : (
        <>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Table responsive borderless className="mb-0">
                <thead>
                  <tr className="bg-light">
                    <th>Produkt</th>
                    <th className="text-center">Preis</th>
                    <th className="text-center">Menge</th>
                    <th className="text-center">Summe</th>
                    <th className="text-end">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50?text=Bild';
                            }}
                          />
                          <div>
                            <div className="fw-bold">{item.name}</div>
                            <small className="text-muted">{item.category_name}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center align-middle">{parseFloat(item.price).toFixed(2)} €</td>
                      <td className="align-middle">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-circle p-1"
                            style={{ width: '30px', height: '30px' }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="mx-2 text-center"
                            style={{ width: '50px' }}
                            min="1"
                            max={item.stock}
                          />
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-circle p-1"
                            style={{ width: '30px', height: '30px' }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="text-center align-middle fw-bold">{(item.price * item.quantity).toFixed(2)} €</td>
                      <td className="text-end align-middle">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="rounded-circle p-1"
                          style={{ width: '32px', height: '32px' }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col md={6} className="mb-3">
              <Button variant="outline-secondary" onClick={clearCart} className="px-4">
                Warenkorb leeren
              </Button>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Zwischensumme:</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>MwSt. (19%):</span>
                    <span>{(total * 0.19).toFixed(2)} €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Gesamtsumme:</span>
                    <span className="fs-5">{(total * 1.19).toFixed(2)} €</span>
                  </div>
                  <Button variant="success" size="lg" className="w-100 mt-2" onClick={completeOrder}>
                    Bestellung abschließen
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Cart;
