import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Collapse } from 'react-bootstrap';
import axios from 'axios';
import { BsCart3, BsInfoCircle } from 'react-icons/bs';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [visibleCount, setVisibleCount] = useState(12); // 👈 Neue State für Sichtbarkeit

  const toggleDescription = (productId) => {
    setExpanded({
      ...expanded,
      [productId]: !expanded[productId]
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://127.0.0.1:8000/api/products/';
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
      setVisibleCount(12); // 👈 Sichtbare Menge zurücksetzen bei Kategorie-Wechsel
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;

    const currentQuantity = existingItem ? existingItem.quantity : 0;

    // Stop, wenn max Menge erreicht ist
    if (currentQuantity >= product.stock) {
        alert(`Du hast bereits die maximale Menge von ${product.stock} im Warenkorb.`);
        return;
      }

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} wurde zum Warenkorb hinzugefügt.`);
  };

  return (
    <Container className="mt-4 mb-5">
      <h1 className="text-center mb-4 fw-bold">Unsere Produkte</h1>

      {/* Sticky Kategorie-Filter */}
      <div className="sticky-filter bg-white py-2 shadow-sm mb-4 z-3">
        <Container>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select-lg w-100"
          >
            <option value="">Alle Kategorien</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Container>
      </div>

      {/* Produktliste */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.slice(0, visibleCount).map(product => (
          <Col key={product.id}>
            <Card className={`h-100 shadow product-card ${product.stock === 0 ? 'sold-out-card' : ''}`}>
              <div className="product-image-container">
                <Card.Img 
                  variant="top" 
                  src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300?text=Produktbild';
                  }}
                />
                {product.stock === 0 ? (
                  <span className="stock-overlay sold-out">Ausverkauft</span>
                ) : product.stock <= 5 ? (
                  <span className="stock-overlay low-stock">Nur noch {product.stock} Stück</span>
                ) : null}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title">
                  {product.name}
                </Card.Title>

                <div className="mb-2">
                  <Badge
                    bg="secondary"
                    className="category-badge"
                    title={product.category_name}
                  >
                    {product.category_name}
                  </Badge>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="price-tag">{parseFloat(product.price).toFixed(2)} €</span>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary info-button"
                    onClick={() => toggleDescription(product.id)}
                    aria-expanded={expanded[product.id]}
                  >
                    <BsInfoCircle size={20} />
                  </Button>
                </div>

                <Collapse in={expanded[product.id]}>
                  <div className="mt-2 product-description">
                    <Card.Text>{product.description || "Keine Beschreibung verfügbar."}</Card.Text>
                  </div>
                </Collapse>

                <div className="mt-auto pt-3">
                  <Button 
                    variant="primary" 
                    className="w-100 add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0 || (cart.find(item => item.id === product.id)?.quantity || 0) >= product.stock
                    }
                  >
                    <BsCart3 className="me-2" />
                    {product.stock > 0 ? "In den Warenkorb" : "Nicht verfügbar"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mehr anzeigen */}
      {visibleCount < products.length && (
        <div className="text-center mt-4 fade-button-wrapper">
          <Button
            variant="outline-primary"
            onClick={() => setVisibleCount(visibleCount + 12)}
            style={{
                opacity: visibleCount < products.length ? 1 : 0,
                pointerEvents: visibleCount < products.length ? 'auto' : 'none',
                transition: 'opacity 0.6s ease-in-out',
            }}
          >
            Mehr Produkte anzeigen
          </Button>
        </div>
      )}

      {/* Kein Produkt gefunden */}
      {products.length === 0 && (
        <div className="text-center mt-5">
          <h3>Keine Produkte gefunden</h3>
          <p>Versuche eine andere Kategorie auszuwählen.</p>
        </div>
      )}
    </Container>
  );
}

export default ProductList;
