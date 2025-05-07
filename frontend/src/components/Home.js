import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // 👈 zentrale URL-Variable

function Home() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/800x600?text=Angebot';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/offers/`) // 👈 neue dynamische API-URL
      .then(res => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Angebote:', err);
        setError('Angebote konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid className="p-0">
      <div className="text-white text-center py-2" style={{ 
        background: 'linear-gradient(to right, #f8bbd0, #f48fb1)',
        borderBottom: '2px solid #b71c1c'
      }}>
        <h2 className="mb-0 fs-4">Herzlich Willkommen! <span className="ms-2">خوش آمدید</span></h2>
      </div>

      <Container className="my-4">
        <h2 className="text-center mb-4 fw-bold">Aktuelle Angebote</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <p className="text-center">Angebote werden geladen...</p>
        ) : offers.length === 0 ? (
          <Alert variant="info" className="text-center">Momentan sind keine Angebote verfügbar.</Alert>
        ) : (
          <Row className="g-4 justify-content-center">
            {offers.map((offer, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="h-100 shadow offer-card">
                  <div className="offer-image-container">
                    <Card.Img
                      variant="top"
                      src={getImageUrl(offer.image)}
                      alt={offer.title}
                      className="offer-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x800?text=Angebot';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold fs-4">{offer.title}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Home;
