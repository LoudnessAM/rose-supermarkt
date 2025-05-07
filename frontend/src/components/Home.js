import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/final_logo_rose.jpg';

function Home() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/offers/')
      .then(res => setOffers(res.data))
      .catch(err => console.error('Fehler beim Laden der Angebote:', err));
  }, []);

  return (
    <Container className="text-center mt-4">
      <img
        src={logo}
        alt="Supermarkt Rose Logo"
        style={{ maxWidth: '300px', marginBottom: '30px' }}
      />

      <h2 className="mb-4 fw-bold">Aktuelle Angebote</h2>

      <Row className="g-4 justify-content-center">
        {offers.length === 0 ? (
          <p className="text-muted">Momentan sind keine Angebote verfügbar.</p>
        ) : (
          offers.map((offer, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`http://127.0.0.1:8000${offer.image.startsWith('/media') ? offer.image : '/media/' + offer.image}`}
                  alt={offer.title}
                  style={{ objectFit: 'cover', height: '250px' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x250?text=Kein+Bild';
                  }}
                />
                <Card.Body>
                  <Card.Title>{offer.title}</Card.Title>
                  <Card.Text>{offer.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Home;

